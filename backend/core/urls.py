
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static



from .views import home

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
     # Swagger UI for API documentation

    path('api/', include('api.urls' )),
]
