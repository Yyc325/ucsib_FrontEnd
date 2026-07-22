import json
import time

from django.db import connection
from django.test import TestCase
from django.test.utils import CaptureQueriesContext
from django.utils import timezone

from admin_role import service
from admin_role.models import Admin, Notice
from community.models import Comment


class CommunityAndSearchTests(TestCase):
    def setUp(self):
        self.user = Admin.objects.create(
            user_name='student',
            real_name='Miles',
            phone='13800000008',
            password=service.md5_hash('Secure123'),
            identity=Admin.ROLE_STUDENT,
        )
        self.token = service.generate_token(
            {
                'id': self.user.id,
                'user_name': self.user.user_name,
                'real_name': self.user.real_name,
                'phone': self.user.phone,
                'identity': self.user.identity,
            }
        )

    def _post_comment(self, data, authenticated=True):
        headers = (
            {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
            if authenticated
            else {}
        )
        return self.client.post(
            '/api/comments/',
            data=json.dumps(data),
            content_type='application/json',
            **headers,
        )

    def _create_notice(self, title, status):
        return Notice.objects.create(
            user=self.user,
            publisher='Miles',
            status=status,
            title=title,
            subtitle='Sports update',
            content='<p>Basketball practice and match details.</p>',
            publish_time=timezone.now(),
            cover='',
            position_index='',
            publish_location='News',
        )

    def test_comment_author_comes_from_token_and_invalid_input_is_rejected(self):
        unauthenticated = self._post_comment({'content': 'Hello'}, False)
        self.assertEqual(unauthenticated.status_code, 401)

        invalid = self._post_comment({'content': ' '})
        self.assertEqual(invalid.status_code, 400)

        valid = self._post_comment(
            {'content': 'Is basketball practice running today?', 'author': 'Fake'}
        )
        self.assertEqual(valid.status_code, 201)
        self.assertEqual(valid.json()['data']['author'], 'Miles')

    def test_search_combines_sources_and_excludes_unpublished_notices(self):
        published = self._create_notice(
            'Basketball Championship', Notice.STATUS_PUBLISHED
        )
        pending = self._create_notice(
            'Basketball Secret Draft', Notice.STATUS_PENDING
        )
        comment = Comment.objects.create(
            author='Student Council',
            content='Basketball club registration is open.',
        )

        response = self.client.get('/api/search/', {'q': 'Basketball'})
        self.assertEqual(response.status_code, 200)
        results = response.json()['data']['results']
        result_ids = {result['id'] for result in results}
        self.assertIn(f'notice-{published.id}', result_ids)
        self.assertIn(f'community-{comment.id}', result_ids)
        self.assertNotIn(f'notice-{pending.id}', result_ids)
        self.assertEqual(results[0]['source'], 'notice')

    def test_search_rejects_empty_query(self):
        response = self.client.get('/api/search/', {'q': '   '})
        self.assertEqual(response.status_code, 400)

    def test_search_is_bounded_for_five_hundred_records(self):
        Comment.objects.bulk_create(
            [
                Comment(author=f'User {index}', content=f'Basketball update {index}')
                for index in range(500)
            ]
        )

        started = time.perf_counter()
        with CaptureQueriesContext(connection) as query_context:
            response = self.client.get(
                '/api/search/', {'q': 'Basketball', 'limit': 20}
            )
        elapsed_ms = (time.perf_counter() - started) * 1000

        self.assertEqual(response.status_code, 200)
        self.assertLessEqual(len(response.json()['data']['results']), 20)
        self.assertLessEqual(len(query_context), 2)
        self.assertLess(elapsed_ms, 2000)
        print(
            f'SEARCH_BENCHMARK records=500 queries={len(query_context)} '
            f'elapsed_ms={elapsed_ms:.2f}'
        )
