from rest_framework.serializers import ModelSerializer
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from .models import User
from paroquia.models import Paroquia

class UserSerializer(ModelSerializer):
    id_paroquia = serializers.PrimaryKeyRelatedField(queryset=Paroquia.objects.all())
        
    class Meta:
        model = User
        fields = 'username, email, id_paroquia'
        
class CustomLoginSerializer(LoginSerializer):
    def validate(self, attrs):
        email = attrs.get('username')
        password = attrs.get('password')
        
        user = User.objects.filter(email=email).first()
        
        if not user:
            raise serializers.ValidationError("Usuário não encontrado")
        
        else:
            if not user_check_password(password):
                raise serializers.ValidationError("Senha incorreta")
            
            if not user.is_active:
                raise serializers.ValidationError("Usuário inativo")
            
        attrs['user'] = user
        
        return attrs   