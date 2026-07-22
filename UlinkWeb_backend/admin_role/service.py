import datetime
import hashlib
import hmac
import re

import jwt
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.forms import model_to_dict
from django.utils import timezone

from admin_role.models import Admin, Notice


SECRET_KEY = 'abcdasdfasd1243'
EXPIRATION_HOURS = 72
VALID_IDENTITIES = {Admin.ROLE_ADMIN, Admin.ROLE_TEACHER, Admin.ROLE_STUDENT}
NOTICE_MANAGER_ROLES = {Admin.ROLE_ADMIN, Admin.ROLE_TEACHER}
PHONE_PATTERN = re.compile(r'^1\d{10}$')


def md5_hash(password):
    """Return the MD5 digest required by the project's success criterion."""
    return hashlib.md5(password.encode('utf-8')).hexdigest()


def create_admin(user_name, real_name, phone, password):
    user_name = (user_name or '').strip()
    real_name = (real_name or '').strip()
    phone = (phone or '').strip()
    password = password or ''

    if not user_name or not real_name:
        raise Exception('用户名和真实姓名不能为空')
    if not PHONE_PATTERN.fullmatch(phone):
        raise Exception('请输入有效的11位手机号')
    if len(password) < 6:
        raise Exception('密码长度不能少于6位')
    if Admin.objects.filter(phone=phone).exists():
        raise Exception('手机号已注册')

    return Admin.objects.create(
        user_name=user_name,
        real_name=real_name,
        identity=Admin.ROLE_STUDENT,
        phone=phone,
        password=md5_hash(password),
    )


def identity_verification(phone, password, request=None):
    try:
        admin = Admin.objects.only(
            'id', 'user_name', 'real_name', 'phone', 'password', 'identity'
        ).get(phone=(phone or '').strip())
    except Admin.DoesNotExist as exc:
        raise Exception('手机号或密码错误') from exc

    if not hmac.compare_digest(admin.password, md5_hash(password or '')):
        raise Exception('手机号或密码错误')

    return generate_token(_serialize_admin(admin))


def getIdentity(phone):
    try:
        return Admin.objects.values_list('identity', flat=True).get(phone=phone)
    except Admin.DoesNotExist:
        return None


def _serialize_admin(admin):
    return {
        'id': admin.id,
        'user_name': admin.user_name,
        'real_name': admin.real_name,
        'phone': admin.phone,
        'identity': admin.identity,
    }


def get_account_by_phone(phone):
    try:
        admin = Admin.objects.only(
            'id', 'user_name', 'real_name', 'phone', 'identity'
        ).get(phone=phone)
        return _serialize_admin(admin)
    except ObjectDoesNotExist:
        return None


def account_all(name, phone):
    query_conditions = {}
    if name:
        query_conditions['user_name__icontains'] = name.strip()
    if phone:
        query_conditions['phone__icontains'] = phone.strip()

    return list(
        Admin.objects.filter(**query_conditions)
        .order_by('id')
        .values('id', 'user_name', 'real_name', 'phone', 'identity')
    )


def generate_token(user_info):
    now = datetime.datetime.now(datetime.timezone.utc)
    payload = {
        'user_info': user_info,
        'iat': now,
        'exp': now + datetime.timedelta(hours=EXPIRATION_HOURS),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')


def identity_authorization(actor_id, phone, identity):
    if identity not in VALID_IDENTITIES:
        raise Exception('身份值必须为 admin、teacher 或 student')

    with transaction.atomic():
        try:
            user = Admin.objects.select_for_update().get(phone=phone)
        except Admin.DoesNotExist:
            return False

        if (
            user.id == actor_id
            and user.identity == Admin.ROLE_ADMIN
            and identity != Admin.ROLE_ADMIN
            and Admin.objects.select_for_update().filter(
                identity=Admin.ROLE_ADMIN
            ).count() == 1
        ):
            raise Exception('不能移除系统中最后一名管理员')

        user.identity = identity
        user.save(update_fields=['identity', 'update_time'])
        return True


def _parse_publish_time(value):
    if not value:
        return None
    if isinstance(value, datetime.datetime):
        parsed = value
    else:
        try:
            parsed = datetime.datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
        except (TypeError, ValueError) as exc:
            raise Exception('发布时间格式错误，应为 %Y-%m-%d %H:%M:%S') from exc
    if timezone.is_naive(parsed):
        parsed = timezone.make_aware(parsed, timezone.get_current_timezone())
    return parsed


def _format_datetime(value):
    if not value:
        return None
    if timezone.is_naive(value):
        value = timezone.make_aware(value, timezone.get_current_timezone())
    return timezone.localtime(value).strftime('%Y-%m-%d %H:%M:%S')


def _serialize_notice(notice):
    data = model_to_dict(notice)
    data['create_time'] = _format_datetime(notice.create_time)
    data['publish_time'] = _format_datetime(notice.publish_time)
    return data


def _validate_notice_fields(title, subtitle, content, publish_location, position_index):
    if not (title or '').strip():
        raise Exception('通知标题不能为空')
    if len(title.strip()) > 255:
        raise Exception('通知标题不能超过255个字符')
    if not (subtitle or '').strip():
        raise Exception('通知副标题不能为空')
    if not (content or '').strip():
        raise Exception('通知内容不能为空')
    if publish_location not in {'About', 'News'}:
        raise Exception("发布位置必须为 'About' 或 'News'")
    if publish_location == 'About' and not position_index:
        raise Exception('About 页面通知必须指定发布位置序号')


def noticeCreate(
    title,
    subtitle,
    content,
    publisher,
    status,
    publish_time,
    cover_url,
    user_id,
    position_index,
    publish_location='About',
):
    _validate_notice_fields(
        title, subtitle, content, publish_location, position_index
    )
    if status and status != Notice.STATUS_PENDING:
        raise Exception('新通知必须先保存为待发布状态')

    notice = Notice.objects.create(
        title=title.strip(),
        subtitle=subtitle.strip(),
        content=content,
        publisher=publisher,
        status=Notice.STATUS_PENDING,
        publish_time=_parse_publish_time(publish_time),
        cover=cover_url or '',
        user_id=user_id,
        position_index=position_index or '',
        publish_location=publish_location,
    )
    return _serialize_notice(notice)


def get_user_id_by_publisher(publisher):
    try:
        return Admin.objects.get(real_name=publisher).id
    except Admin.DoesNotExist as exc:
        raise Exception(f"Admin with real_name '{publisher}' does not exist") from exc


def noticeQuery(publisher, phone):
    query_conditions = {}
    if publisher:
        query_conditions['publisher__icontains'] = publisher.strip()
    if phone:
        try:
            query_conditions['user_id'] = Admin.objects.only('id').get(
                phone=phone
            ).id
        except ObjectDoesNotExist:
            return []

    notices = Notice.objects.filter(**query_conditions).order_by(
        '-create_time', '-id'
    )
    return [_serialize_notice(notice) for notice in notices]


def get_all_notices(title=None, status=None):
    query_conditions = {}
    if title:
        query_conditions['title__icontains'] = title.strip()
    if status:
        query_conditions['status'] = status
    notices = Notice.objects.filter(**query_conditions).order_by(
        '-create_time', '-id'
    )
    return [_serialize_notice(notice) for notice in notices]


def get_admin_by_phone(phone):
    try:
        return Admin.objects.get(phone=phone)
    except Admin.DoesNotExist as exc:
        raise Exception(f"Admin with phone '{phone}' does not exist") from exc


def update_notice(notice_id, actor=None, **kwargs):
    try:
        notice_id = int(notice_id)
    except (TypeError, ValueError) as exc:
        raise Exception('无效通知 ID') from exc

    with transaction.atomic():
        try:
            notice = Notice.objects.select_for_update().get(id=notice_id)
        except Notice.DoesNotExist as exc:
            raise Exception('通知不存在') from exc

        requested_status = kwargs.pop('status', None)
        if requested_status and requested_status != notice.status:
            raise Exception('请使用发布或撤回操作更改通知状态')

        editable_fields = {
            'title',
            'subtitle',
            'content',
            'cover',
            'publish_time',
            'position_index',
            'publish_location',
        }
        changes = {
            key: value
            for key, value in kwargs.items()
            if key in editable_fields and value is not None
        }

        title = changes.get('title', notice.title)
        subtitle = changes.get('subtitle', notice.subtitle)
        content = changes.get('content', notice.content)
        publish_location = changes.get('publish_location', notice.publish_location)
        position_index = changes.get('position_index', notice.position_index)
        _validate_notice_fields(
            title, subtitle, content, publish_location, position_index
        )

        if notice.status == Notice.STATUS_PUBLISHED:
            changes.pop('publish_time', None)
            changes.pop('publish_location', None)
            changes.pop('position_index', None)
        elif 'publish_time' in changes:
            changes['publish_time'] = _parse_publish_time(changes['publish_time'])

        for key, value in changes.items():
            setattr(notice, key, value)
        if actor and notice.status == Notice.STATUS_PUBLISHED:
            notice.publisher = actor.real_name
            notice.user = actor

        notice.save()
        return _serialize_notice(notice)


def _normalise_notice_ids(notice_id):
    raw_ids = notice_id if isinstance(notice_id, (list, tuple, set)) else [notice_id]
    try:
        notice_ids = sorted({int(item) for item in raw_ids})
    except (TypeError, ValueError) as exc:
        raise Exception('通知 ID 必须为数字') from exc
    if not notice_ids:
        raise Exception('无有效通知 ID')
    return notice_ids


def _transition_notices(notice_id, target_status, actor):
    transitions = {
        Notice.STATUS_PENDING: {Notice.STATUS_PUBLISHED},
        Notice.STATUS_PUBLISHED: {Notice.STATUS_WITHDRAWN},
        Notice.STATUS_WITHDRAWN: {Notice.STATUS_PUBLISHED},
    }
    notice_ids = _normalise_notice_ids(notice_id)

    with transaction.atomic():
        notices = list(
            Notice.objects.select_for_update()
            .filter(id__in=notice_ids)
            .order_by('id')
        )
        found_ids = {notice.id for notice in notices}
        missing_ids = sorted(set(notice_ids) - found_ids)
        if missing_ids:
            raise Exception(f"通知不存在: {', '.join(map(str, missing_ids))}")

        invalid = [
            notice.id
            for notice in notices
            if target_status not in transitions.get(notice.status, set())
        ]
        if invalid:
            raise Exception(
                f"通知状态不允许此操作: {', '.join(map(str, invalid))}"
            )

        current_time = timezone.now()
        for notice in notices:
            notice.status = target_status
            if target_status == Notice.STATUS_PUBLISHED:
                notice.publisher = actor.real_name
                notice.user = actor
                notice.publish_time = current_time

        Notice.objects.bulk_update(
            notices, ['status', 'publisher', 'user', 'publish_time']
        )

    serialized = [_serialize_notice(notice) for notice in notices]
    return serialized if len(serialized) > 1 else serialized[0]


def delete_notice(notice_id):
    notice_ids = _normalise_notice_ids(notice_id)
    with transaction.atomic():
        existing_ids = set(
            Notice.objects.select_for_update()
            .filter(id__in=notice_ids)
            .values_list('id', flat=True)
        )
        missing_ids = sorted(set(notice_ids) - existing_ids)
        if missing_ids:
            raise Exception(f"通知不存在: {', '.join(map(str, missing_ids))}")
        Notice.objects.filter(id__in=notice_ids).delete()
    return True


def withdraw_notice(notice_id, actor):
    return _transition_notices(notice_id, Notice.STATUS_WITHDRAWN, actor)


def publish_notice(notice_id, actor):
    return _transition_notices(notice_id, Notice.STATUS_PUBLISHED, actor)


def publish_due_notices(now=None):
    """Publish all due notices in one indexed, atomic database update."""
    current_time = now or timezone.now()
    with transaction.atomic():
        return Notice.objects.filter(
            status=Notice.STATUS_PENDING,
            publish_time__isnull=False,
            publish_time__lte=current_time,
        ).update(status=Notice.STATUS_PUBLISHED)


def get_published_notices_by_location(publish_location):
    if publish_location not in {'About', 'News'}:
        raise Exception("发布位置必须为 'About' 或 'News'")

    notices = Notice.objects.filter(
        status=Notice.STATUS_PUBLISHED,
        publish_location=publish_location,
    ).order_by('-publish_time', '-create_time', '-id')
    return [_serialize_notice(notice) for notice in notices]
