import json
import logging

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from admin_role import service
from admin_role.auth import require_roles
from admin_role.file_upload_util import FileUploadUtil
from admin_role.models import Admin


logger = logging.getLogger(__name__)
NOTICE_MANAGER_ROLES = (Admin.ROLE_ADMIN, Admin.ROLE_TEACHER)


def _json_body(request):
    try:
        return json.loads(request.body or b'{}')
    except (json.JSONDecodeError, UnicodeDecodeError) as exc:
        raise ValueError('请求正文必须是有效的 JSON') from exc


def _invalid_method():
    return JsonResponse({'status': 'invalid method'}, status=405)


def _error_response(action, exc, status=400):
    if status >= 500:
        logger.exception('%s failed: %s', action, exc)
    else:
        logger.warning('%s rejected: %s', action, exc)
    return JsonResponse({'status': 'error', 'message': str(exc)}, status=status)


@csrf_exempt
def add(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        data = _json_body(request)
        service.create_admin(
            data.get('user_name', ''),
            data.get('real_name', ''),
            data.get('phone', ''),
            data.get('password', ''),
        )
        return JsonResponse({'status': 'success'}, status=201)
    except Exception as exc:
        return _error_response('Create account', exc)


@csrf_exempt
def login(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        data = _json_body(request)
        token = service.identity_verification(
            data.get('phone', ''), data.get('password', '')
        )
        import jwt

        payload = jwt.decode(token, service.SECRET_KEY, algorithms=['HS256'])
        return JsonResponse(
            {
                'status': 'success',
                'token': token,
                'user_info': payload['user_info'],
            }
        )
    except Exception as exc:
        return _error_response('Login', exc, status=401)


@require_roles()
def account_me(request):
    if request.method != 'GET':
        return _invalid_method()
    return JsonResponse(
        {
            'status': 'success',
            'data': service.get_account_by_phone(request.current_admin.phone),
        }
    )


@csrf_exempt
@require_roles(Admin.ROLE_ADMIN)
def account_all(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        data = _json_body(request)
        accounts = service.account_all(
            data.get('userName', ''), data.get('phone', '')
        )
        return JsonResponse({'status': 'success', 'data': accounts})
    except Exception as exc:
        return _error_response('Query accounts', exc)


@csrf_exempt
@require_roles(Admin.ROLE_ADMIN)
def identity_authorization(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        data = _json_body(request)
        updated = service.identity_authorization(
            request.current_admin.id,
            data.get('phone', ''),
            data.get('identity', ''),
        )
        if not updated:
            return JsonResponse(
                {'status': 'error', 'message': '用户不存在'}, status=404
            )
        return JsonResponse({'status': 'success', 'data': True})
    except Exception as exc:
        return _error_response('Update role', exc)


@csrf_exempt
@require_roles(*NOTICE_MANAGER_ROLES)
def upload_file(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        upload = request.FILES.get('file')
        if not upload:
            return JsonResponse(
                {'status': 'error', 'message': '未提供文件'}, status=400
            )

        valid_extensions = {'png', 'jpg', 'jpeg'}
        file_extension = upload.name.rsplit('.', 1)[-1].lower()
        if file_extension not in valid_extensions:
            return JsonResponse(
                {
                    'status': 'error',
                    'message': '文件类型不支持，仅支持 png、jpg、jpeg',
                },
                status=400,
            )
        if upload.content_type not in {'image/png', 'image/jpeg'}:
            return JsonResponse(
                {'status': 'error', 'message': '文件内容不是有效图片格式'},
                status=400,
            )
        if upload.size > 5 * 1024 * 1024:
            return JsonResponse(
                {'status': 'error', 'message': '文件大小不能超过5MB'},
                status=400,
            )

        result = FileUploadUtil.upload(upload)
        return JsonResponse({'status': 'success', 'data': result})
    except Exception as exc:
        return _error_response('Upload file', exc, status=500)


@csrf_exempt
@require_roles(*NOTICE_MANAGER_ROLES)
def add_notice(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        data = _json_body(request)
        current_user = request.current_admin
        notice = service.noticeCreate(
            data.get('title'),
            data.get('subtitle'),
            data.get('content'),
            current_user.real_name,
            None,
            data.get('publish_time'),
            data.get('cover_url'),
            current_user.id,
            data.get('position_index'),
            data.get('publish_location', 'About'),
        )
        return JsonResponse({'status': 'success', 'data': notice}, status=201)
    except Exception as exc:
        return _error_response('Create notice', exc)


@csrf_exempt
@require_roles(*NOTICE_MANAGER_ROLES)
def query_notice(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        data = _json_body(request)
        notices = service.noticeQuery(
            data.get('publisher', ''), data.get('phone', '')
        )
        return JsonResponse({'status': 'success', 'data': notices})
    except Exception as exc:
        return _error_response('Query notices', exc)


@csrf_exempt
@require_roles(*NOTICE_MANAGER_ROLES)
def notice_list(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        data = _json_body(request)
        notices = service.get_all_notices(
            data.get('title', ''), data.get('status', '')
        )
        return JsonResponse({'status': 'success', 'data': notices})
    except Exception as exc:
        return _error_response('List notices', exc)


@csrf_exempt
@require_roles(*NOTICE_MANAGER_ROLES)
def notice_update(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        data = _json_body(request)
        notice = service.update_notice(
            data.get('id'),
            actor=request.current_admin,
            title=data.get('title'),
            subtitle=data.get('subtitle'),
            content=data.get('content'),
            status=data.get('status'),
            publish_time=data.get('publish_time'),
            cover=data.get('cover_url') or data.get('cover'),
            position_index=data.get('position_index'),
            publish_location=data.get('publish_location'),
        )
        return JsonResponse({'status': 'success', 'data': notice})
    except Exception as exc:
        return _error_response('Update notice', exc)


@csrf_exempt
@require_roles(Admin.ROLE_ADMIN)
def notice_delete(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        service.delete_notice(_json_body(request).get('id'))
        return JsonResponse({'status': 'success'})
    except Exception as exc:
        return _error_response('Delete notice', exc)


@csrf_exempt
@require_roles(*NOTICE_MANAGER_ROLES)
def notice_withdraw(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        notice = service.withdraw_notice(
            _json_body(request).get('id'), request.current_admin
        )
        return JsonResponse({'status': 'success', 'data': notice})
    except Exception as exc:
        return _error_response('Withdraw notice', exc)


@csrf_exempt
@require_roles(*NOTICE_MANAGER_ROLES)
def publish_notice(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        notice = service.publish_notice(
            _json_body(request).get('id'), request.current_admin
        )
        return JsonResponse({'status': 'success', 'data': notice})
    except Exception as exc:
        return _error_response('Publish notice', exc)


@csrf_exempt
def published_notices_by_location(request):
    if request.method != 'POST':
        return _invalid_method()
    try:
        publish_location = _json_body(request).get('publish_location')
        if not publish_location:
            return JsonResponse(
                {'status': 'error', 'message': '缺少发布位置参数'}, status=400
            )
        notices = service.get_published_notices_by_location(publish_location)
        return JsonResponse({'status': 'success', 'data': notices})
    except Exception as exc:
        return _error_response('Fetch published notices', exc)
