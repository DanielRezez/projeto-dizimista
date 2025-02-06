#Mapeia as URLs do app para as views correspondentes

"""
URL configuration for back_end project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
# Para criar a listagem de paths
from django.contrib import admin
from django.urls import path, include

# para tokens JWT
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from usuario.views import register_user
from dizimistas.views import DizimistaAPIView, AniversariantesAPIView
from novos_dizimistas.views import NovoDizimistaAPIView, TransferirDizimistaAPIView, NovosAniversariantesAPIView
from paroquia.views import ParoquiaAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # JWT Authentication
    path('api/auth/', include('dj_rest_auth.urls')),  # Login, Logout, Password Reset
    path('register_user/', register_user, name='register_user') ,
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login (obtenção de tokens)
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Refresh token
    
    # API endpoints
    path('api/dizimistas/', DizimistaAPIView.as_view(), name='dizimistas'),
    path('api/dizimistas/<int:pk>/', DizimistaAPIView.as_view(), name='dizimista-detail'),
    path('api/aniversariantes/', AniversariantesAPIView.as_view(), name='aniversariantes-dizimistas'),
    path('api/novos-dizimistas/', NovoDizimistaAPIView.as_view(), name='novos-dizimistas'),
    path('api/novos-dizimistas/<int:pk>/', NovoDizimistaAPIView.as_view(), name='novo_dizimista-detail'),
    path('api/novos-dizimistas/transferir-novo-dizimista/<int:pk>/', TransferirDizimistaAPIView.as_view(), name='transformar-dizimista'),
    path('api/novos-aniversariantes/', NovosAniversariantesAPIView.as_view(), name='aniversariantes-novos-dizimistas'),
    path('api/paroquias/', ParoquiaAPIView.as_view(), name='paroquias'),
    path('api/paroquias/<int:pk>/', ParoquiaAPIView.as_view(), name='paroquias-detail'),
]
