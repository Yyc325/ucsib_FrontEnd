from django.urls import path
from . import views

urlpatterns = [
    path("comments/", views.comment_list),
    path("search/", views.global_search),
]
