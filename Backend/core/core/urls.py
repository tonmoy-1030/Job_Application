"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from api.routers import router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import LogoutView, LoginView, RefreshView, meView, ChangePassword


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/token/login/", LoginView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", RefreshView.as_view(), name="token_refresh"),
    path("api/token/logout/", LogoutView.as_view(), name="token_logout"),
    path("api/me/", meView.as_view(), name="user"),
    path("api/change-password/", ChangePassword.as_view(), name="change_password"),
]
