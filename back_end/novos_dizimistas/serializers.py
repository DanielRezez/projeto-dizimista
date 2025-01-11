from rest_framework import serializers
from .models import NovoDizimista

class NovoDizimistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NovoDizimista
        fields = '__all__'
        
