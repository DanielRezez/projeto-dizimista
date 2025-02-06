from django.contrib.auth import get_user_model
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'username', 'id_paroquia', 'is_active', 'password']
        extra_kwars = {'write_only': True}          
    
    def create(self, validate_data):
        email = validate_data["email"]
        username = validate_data["username"]
        password = validate_data["password"]
        paroquia = validate_data["id_paroquia"]
        
        user = get_user_model()
        new_user = user.objects.create(email=email, username=username, id_paroquia=paroquia)
        new_user.set_password(password)
        new_user.save()
        
        return new_user