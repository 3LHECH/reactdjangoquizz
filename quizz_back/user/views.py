from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import AllowAny
from .serializers import UserSerializer,MyTokenObtainPairSerializer
from .models import User
from rest_framework import  viewsets
from rest_framework_simplejwt.views import TokenObtainPairView

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        data = request.data.copy()  
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        password = request.data.get('password')
        hashed_password = make_password(password)
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({'password': e.messages}, status=400)
        if(User.objects.filter(email=data["email"])):
            return Response({'detail': data['email']+' do have an account'}, status=status.HTTP_400_BAD_REQUEST)
        serializer.validated_data['password'] = hashed_password
        serializer.validated_data['is_active'] = True 
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED )
    
    
    def perform_create(self, serializer):
        serializer.save()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer