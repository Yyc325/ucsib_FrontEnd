import json
from datetime import timedelta

from django.test import TestCase
from django.utils import timezone

from admin_role import service
from admin_role.models import Admin, Notice


class AdminRoleApiTests(TestCase):
    def setUp(self):
        self.admin = self._create_user('Admin', '13800000001', Admin.ROLE_ADMIN)
        self.teacher = self._create_user(
            'Teacher', '13800000002', Admin.ROLE_TEACHER
        )
        self.student = self._create_user(
            'Student', '13800000003', Admin.ROLE_STUDENT
        )

    def _create_user(self, name, phone, identity):
        return Admin.objects.create(
            user_name=name.lower(),
            real_name=name,
            phone=phone,
            password=service.md5_hash('Secure123'),
            identity=identity,
        )

    def _token(self, user):
        return service.generate_token(
            {
                'id': user.id,
                'user_name': user.user_name,
                'real_name': user.real_name,
                'phone': user.phone,
                'identity': user.identity,
            }
        )

    def _post(self, path, data, user=None):
        headers = {}
        if user:
            headers['HTTP_AUTHORIZATION'] = f'Bearer {self._token(user)}'
        return self.client.post(
            path,
            data=json.dumps(data),
            content_type='application/json',
            **headers,
        )

    def _notice_payload(self, **overrides):
        data = {
            'title': 'Basketball Final',
            'subtitle': 'Friday event',
            'content': '<p>The final begins at 16:00.</p>',
            'cover_url': 'https://example.com/cover.jpg',
            'publish_location': 'News',
            'position_index': '',
            'publish_time': None,
        }
        data.update(overrides)
        return data

    def test_login_uses_phone_and_password_but_returns_database_role(self):
        response = self._post(
            '/api/admin_role/login',
            {'phone': self.teacher.phone, 'password': 'Secure123'},
        )

        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body['status'], 'success')
        self.assertEqual(body['user_info']['identity'], Admin.ROLE_TEACHER)

    def test_role_management_is_admin_only(self):
        denied = self._post(
            '/api/admin_role/identity_authorization',
            {'phone': self.student.phone, 'identity': Admin.ROLE_TEACHER},
            self.teacher,
        )
        self.assertEqual(denied.status_code, 403)

        allowed = self._post(
            '/api/admin_role/identity_authorization',
            {'phone': self.student.phone, 'identity': Admin.ROLE_TEACHER},
            self.admin,
        )
        self.assertEqual(allowed.status_code, 200)
        self.student.refresh_from_db()
        self.assertEqual(self.student.identity, Admin.ROLE_TEACHER)

    def test_last_admin_cannot_demote_self(self):
        response = self._post(
            '/api/admin_role/identity_authorization',
            {'phone': self.admin.phone, 'identity': Admin.ROLE_STUDENT},
            self.admin,
        )

        self.assertEqual(response.status_code, 400)
        self.admin.refresh_from_db()
        self.assertEqual(self.admin.identity, Admin.ROLE_ADMIN)

    def test_teacher_can_manage_notice_but_only_admin_can_delete(self):
        created = self._post(
            '/api/admin_role/notices/add', self._notice_payload(), self.teacher
        )
        self.assertEqual(created.status_code, 201)
        notice_id = created.json()['data']['id']

        published = self._post(
            '/api/admin_role/notices/publish', {'id': notice_id}, self.teacher
        )
        self.assertEqual(published.status_code, 200)
        self.assertEqual(published.json()['data']['status'], Notice.STATUS_PUBLISHED)

        withdrawn = self._post(
            '/api/admin_role/notices/withdraw', {'id': notice_id}, self.teacher
        )
        self.assertEqual(withdrawn.status_code, 200)
        self.assertEqual(withdrawn.json()['data']['status'], Notice.STATUS_WITHDRAWN)

        teacher_delete = self._post(
            '/api/admin_role/notices/delete', {'id': notice_id}, self.teacher
        )
        self.assertEqual(teacher_delete.status_code, 403)

        admin_delete = self._post(
            '/api/admin_role/notices/delete', {'id': notice_id}, self.admin
        )
        self.assertEqual(admin_delete.status_code, 200)
        self.assertFalse(Notice.objects.filter(id=notice_id).exists())

    def test_student_cannot_open_notice_management_api(self):
        response = self._post(
            '/api/admin_role/notices/query',
            {'phone': '', 'publisher': ''},
            self.student,
        )
        self.assertEqual(response.status_code, 403)

    def test_invalid_batch_transition_rolls_back_every_notice(self):
        published = Notice.objects.create(
            user=self.admin,
            publisher=self.admin.real_name,
            status=Notice.STATUS_PUBLISHED,
            title='Published',
            subtitle='Already live',
            content='Content',
            publish_time=timezone.now(),
            cover='',
            position_index='',
            publish_location='News',
        )
        pending = Notice.objects.create(
            user=self.admin,
            publisher=self.admin.real_name,
            status=Notice.STATUS_PENDING,
            title='Pending',
            subtitle='Not live',
            content='Content',
            cover='',
            position_index='',
            publish_location='News',
        )

        response = self._post(
            '/api/admin_role/notices/withdraw',
            {'id': [published.id, pending.id]},
            self.admin,
        )
        self.assertEqual(response.status_code, 400)
        published.refresh_from_db()
        pending.refresh_from_db()
        self.assertEqual(published.status, Notice.STATUS_PUBLISHED)
        self.assertEqual(pending.status, Notice.STATUS_PENDING)

    def test_auto_publish_updates_only_due_pending_notices(self):
        due = Notice.objects.create(
            user=self.teacher,
            publisher=self.teacher.real_name,
            status=Notice.STATUS_PENDING,
            title='Due',
            subtitle='Due now',
            content='Content',
            publish_time=timezone.now() - timedelta(minutes=1),
            cover='',
            position_index='',
            publish_location='News',
        )
        future = Notice.objects.create(
            user=self.teacher,
            publisher=self.teacher.real_name,
            status=Notice.STATUS_PENDING,
            title='Future',
            subtitle='Later',
            content='Content',
            publish_time=timezone.now() + timedelta(hours=1),
            cover='',
            position_index='',
            publish_location='News',
        )

        self.assertEqual(service.publish_due_notices(), 1)
        due.refresh_from_db()
        future.refresh_from_db()
        self.assertEqual(due.status, Notice.STATUS_PUBLISHED)
        self.assertEqual(future.status, Notice.STATUS_PENDING)
