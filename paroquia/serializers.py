from rest_framework import serializers
from .models import Paroquia

class ParoquiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paroquia
        fields = '__all__'    