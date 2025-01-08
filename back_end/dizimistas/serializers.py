from rest_framework import serializers
from .models import Dizimista

class DizimistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dizimista
        fields = '__all__'
        
    def validate_email(self, value):
        if not '@'