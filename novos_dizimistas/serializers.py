from rest_framework import serializers
from .models import NovoDizimista
from paroquia.models import Paroquia

class NovoDizimistaSerializer(serializers.ModelSerializer):
    id_paroquia = serializers.PrimaryKeyRelatedField(queryset=Paroquia.objects.all())
    
    class Meta:
        model = NovoDizimista
        fields = '__all__'
        
