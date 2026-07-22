from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from admin_role.auth import RequestAuthenticationError, authenticate_request
from community.models import Comment
from community.search_service import search
from community.serializers import CommentSerializer


@api_view(['GET', 'POST'])
def comment_list(request):
    if request.method == 'GET':
        try:
            limit = min(max(int(request.query_params.get('limit', 30)), 1), 50)
        except (TypeError, ValueError):
            return Response(
                {'status': 'error', 'message': 'limit 必须为数字'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        comments = Comment.objects.order_by('-created_at')[:limit]
        return Response(
            {
                'status': 'success',
                'data': CommentSerializer(comments, many=True).data,
            }
        )

    try:
        current_user = authenticate_request(request)
    except RequestAuthenticationError as exc:
        return Response(
            {'status': 'error', 'message': str(exc)},
            status=exc.status_code,
        )

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=current_user.real_name or current_user.user_name)
        return Response(
            {'status': 'success', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
        )
    return Response(
        {'status': 'error', 'message': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(['GET'])
def global_search(request):
    try:
        data = search(
            request.query_params.get('q', ''),
            request.query_params.get('scope', 'all'),
            request.query_params.get('limit', 12),
        )
        return Response({'status': 'success', 'data': data})
    except ValueError as exc:
        return Response(
            {'status': 'error', 'message': str(exc)},
            status=status.HTTP_400_BAD_REQUEST,
        )
