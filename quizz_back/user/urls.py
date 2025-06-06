from . import views
from django.urls import path,include
from rest_framework import routers
from .views import UserViewSet,MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
user_router = routers.DefaultRouter()
user_router.register(r'users', UserViewSet)
urlpatterns = [  
    path('', include(user_router.urls)),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls'))
]