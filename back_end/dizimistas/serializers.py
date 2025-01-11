#Converte o modelo Django em JSON, ou seja, texto gerenciável, para que ele possa ser enviado e recebido via API.

from rest_framework import serializers
from .models import Dizimista

class DizimistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dizimista
        fields = '__all__'
        
    def validate_email(self, value):
        if not '@' in value:
            raise serializers.ValidationError("Insira um e-mail válido.")
        
        return value