#Converte o modelo Django em JSON, ou seja, texto gerenciável, para que ele possa ser enviado e recebido via API.

from rest_framework import serializers
from .models import Dizimista
from paroquia.models import Paroquia

class DizimistaSerializer(serializers.ModelSerializer):
    id_paroquia = serializers.PrimaryKeyRelatedField(queryset=Paroquia.objects.all())
    
    class Meta:
        model = Dizimista
        fields = '__all__'
        