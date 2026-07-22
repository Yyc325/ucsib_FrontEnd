from functools import wraps

import jwt
from django.http import JsonResponse

from admin_role import service
from admin_role.models import Admin


class RequestAuthenticationError(Exception):
    def __init__(self, message, status_code=401):
        super().__init__(message)
        self.status_code = status_code


def _extract_token(request):
    authorization = request.headers.get("Authorization", "").strip()
    if authorization.lower().startswith("bearer "):
        authorization = authorization[7:].strip()
    if not authorization:
        raise RequestAuthenticationError("缺少 token")
    return authorization


def authenticate_request(request):
    """Validate the JWT and reload the user so role changes take effect immediately."""
    token = _extract_token(request)
    try:
        payload = jwt.decode(token, service.SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError as exc:
        raise RequestAuthenticationError("token 已过期") from exc
    except jwt.InvalidTokenError as exc:
        raise RequestAuthenticationError("无效的 token") from exc

    user_info = payload.get("user_info") or {}
    user_id = user_info.get("id")
    phone = user_info.get("phone")
    if not user_id or not phone:
        raise RequestAuthenticationError("token 缺少用户信息")

    try:
        admin = Admin.objects.only(
            "id", "user_name", "real_name", "phone", "identity"
        ).get(id=user_id, phone=phone)
    except Admin.DoesNotExist as exc:
        raise RequestAuthenticationError("用户不存在") from exc

    request.current_admin = admin
    return admin


def authentication_error_response(error):
    return JsonResponse(
        {"status": "error", "message": str(error)},
        status=error.status_code,
    )


def require_roles(*allowed_roles):
    """Authenticate a request and optionally enforce a database-backed role policy."""
    allowed = set(allowed_roles)

    def decorator(view_func):
        @wraps(view_func)
        def wrapped(request, *args, **kwargs):
            try:
                admin = authenticate_request(request)
            except RequestAuthenticationError as exc:
                return authentication_error_response(exc)

            if allowed and admin.identity not in allowed:
                return JsonResponse(
                    {"status": "error", "message": "没有执行此操作的权限"},
                    status=403,
                )
            return view_func(request, *args, **kwargs)

        return wrapped

    return decorator
