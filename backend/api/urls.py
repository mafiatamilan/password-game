# from django.urls import path
# from .views import UserList,UserDetail,UpdateScore


# urlpatterns = [
#     path("auth/", UserList.as_view(), name="user_list"),
#     path("users/", UserDetail.as_view(), name="user_detail"),
#     path('update/<str:roll_no>/', UpdateScore.as_view(), name='update-score'),
# ]   


from django.urls import path
from .views import UserList, UserDetail, UpdateScore

urlpatterns = [
    path("auth/", UserList.as_view(), name="user_list"),
    path("users/", UserDetail.as_view(), name="user_detail"),
    path('update/<str:roll_no>/', UpdateScore.as_view(), name='update-score'),
]