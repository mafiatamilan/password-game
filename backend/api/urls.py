
from django.urls import path
from .views import UserList,UserDetail


urlpatterns = [
    path("auth/", UserList.as_view(), name="user_list"),
    path("users/", UserDetail.as_view(), name="user_detail"),
]
