import re

from django.db.models import Q
from django.utils import timezone
from django.utils.html import strip_tags

from admin_role.models import Notice
from community.models import Comment


VALID_SCOPES = {'all', 'notices', 'community'}
MAX_CANDIDATES_PER_SOURCE = 100
FIELD_WEIGHTS = {
    'title': 8,
    'subtitle': 4,
    'content': 2,
    'author': 3,
}


def _normalise_text(value):
    return re.sub(r'\s+', ' ', strip_tags(value or '')).strip()


def _parse_query(query):
    phrase = _normalise_text(query)
    if not phrase:
        raise ValueError('搜索关键词不能为空')
    if len(phrase) > 80:
        raise ValueError('搜索关键词不能超过80个字符')

    tokens = []
    for token in re.findall(r'[\w\u4e00-\u9fff]+', phrase.casefold()):
        if token not in tokens:
            tokens.append(token)
    if not tokens:
        raise ValueError('搜索关键词必须包含文字或数字')
    return phrase, tokens


def _weighted_score(fields, tokens, phrase):
    score = 0
    folded_phrase = phrase.casefold()
    for field_name, field_value in fields.items():
        folded_value = _normalise_text(field_value).casefold()
        weight = FIELD_WEIGHTS[field_name]
        score += sum(folded_value.count(token) * weight for token in tokens)
        if folded_phrase in folded_value:
            score += weight * 2
    return score


def _build_snippet(text, tokens, length=170):
    plain_text = _normalise_text(text)
    if len(plain_text) <= length:
        return plain_text

    folded = plain_text.casefold()
    positions = [folded.find(token) for token in tokens]
    positions = [position for position in positions if position >= 0]
    match_position = min(positions) if positions else 0
    start = max(0, match_position - length // 3)
    end = min(len(plain_text), start + length)
    prefix = '...' if start else ''
    suffix = '...' if end < len(plain_text) else ''
    return f'{prefix}{plain_text[start:end]}{suffix}'


def _iso_datetime(value):
    if not value:
        return None
    if timezone.is_naive(value):
        value = timezone.make_aware(value, timezone.get_current_timezone())
    return timezone.localtime(value).isoformat()


def _timestamp(value):
    return value.timestamp() if value else 0


def _notice_candidates(tokens, phrase):
    query_filter = Q()
    for token in tokens:
        query_filter |= (
            Q(title__icontains=token)
            | Q(subtitle__icontains=token)
            | Q(content__icontains=token)
        )

    notices = (
        Notice.objects.filter(status=Notice.STATUS_PUBLISHED)
        .filter(query_filter)
        .order_by('-publish_time', '-id')[:MAX_CANDIDATES_PER_SOURCE]
    )
    results = []
    for notice in notices:
        fields = {
            'title': notice.title,
            'subtitle': notice.subtitle,
            'content': notice.content,
        }
        results.append(
            {
                'id': f'notice-{notice.id}',
                'record_id': notice.id,
                'source': 'notice',
                'title': notice.title,
                'subtitle': notice.subtitle,
                'snippet': _build_snippet(notice.content, tokens),
                'author': notice.publisher,
                'timestamp': _iso_datetime(notice.publish_time),
                'score': _weighted_score(fields, tokens, phrase),
                'article': {
                    'id': notice.id,
                    'title': notice.title,
                    'subtitle': notice.subtitle,
                    'content': notice.content,
                    'publisher': notice.publisher,
                    'publish_time': _iso_datetime(notice.publish_time),
                    'cover': notice.cover,
                },
                '_sort_time': _timestamp(notice.publish_time),
            }
        )
    return results


def _comment_candidates(tokens, phrase):
    query_filter = Q()
    for token in tokens:
        query_filter |= Q(content__icontains=token) | Q(author__icontains=token)

    comments = Comment.objects.filter(query_filter).order_by('-created_at')[
        :MAX_CANDIDATES_PER_SOURCE
    ]
    results = []
    for comment in comments:
        fields = {'content': comment.content, 'author': comment.author}
        results.append(
            {
                'id': f'community-{comment.id}',
                'record_id': comment.id,
                'source': 'community',
                'title': f'Community post by {comment.author}',
                'subtitle': '',
                'snippet': _build_snippet(comment.content, tokens),
                'author': comment.author,
                'timestamp': _iso_datetime(comment.created_at),
                'score': _weighted_score(fields, tokens, phrase),
                '_sort_time': _timestamp(comment.created_at),
            }
        )
    return results


def search(query, scope='all', limit=12):
    phrase, tokens = _parse_query(query)
    if scope not in VALID_SCOPES:
        raise ValueError('搜索范围必须为 all、notices 或 community')
    try:
        limit = int(limit)
    except (TypeError, ValueError) as exc:
        raise ValueError('结果数量必须为数字') from exc
    limit = min(max(limit, 1), 20)

    candidates = []
    if scope in {'all', 'notices'}:
        candidates.extend(_notice_candidates(tokens, phrase))
    if scope in {'all', 'community'}:
        candidates.extend(_comment_candidates(tokens, phrase))

    candidates.sort(
        key=lambda item: (-item['score'], -item['_sort_time'], item['source'])
    )
    total = len(candidates)
    results = candidates[:limit]
    for result in results:
        result.pop('_sort_time', None)

    return {
        'query': phrase,
        'scope': scope,
        'total': total,
        'results': results,
    }
