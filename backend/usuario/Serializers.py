from dj_rest_auth.serializers import LoginSerializer, RegisterSerializer
from rest_framework import serializers
from .models import User
from paroquia.models import Paroquia

class UserSerializer(serializers.ModelSerializer):
    id_paroquia = serializers.PrimaryKeyRelatedField(queryset=Paroquia.objects.all(), required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'id_paroquia', 'is_active']

class CustomRegisterSerializer(RegisterSerializer):
    id_paroquia = serializers.PrimaryKeyRelatedField(queryset=Paroquia.objects.all(), required=True)

    def save(self, request):
        user = super().save(request)
        user.id_paroquia = self.validated_data.get('id_paroquia')
        user.save()
        
        return user
                
class CustomLoginSerializer(LoginSerializer):
    def validate(self, attrs):
        email = attrs.get('username')
        password = attrs.get('password')
        
        user = User.objects.filter(email=email).first()
        
        if not user:
            raise serializers.ValidationError("Usuário não encontrado")
        
        else:
            if not user.check_password(password):
                raise serializers.ValidationError("Senha incorreta")
            
            if not user.is_active:
                raise serializers.ValidationError("Usuário inativo")
            
        attrs['user'] = user
        
        return attrs   