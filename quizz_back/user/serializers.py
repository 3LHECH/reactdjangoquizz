

from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    
    class Meta:
        model=User
        fields='__all__'

        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user): 

        token = super().get_token(user)
        token['id'] = user.id
        token['first_name'] = user.first_name
        token['email'] = user.email
        if user.profile_picture.url is not None :
            token['profile_picture'] = user.profile_picture.url
        else:
            token['profile_picture'] = None
        return token

