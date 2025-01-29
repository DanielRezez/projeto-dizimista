from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Usuario(AbstractUser):
    id_paroquia = models.ForeignKey(Paroquia, null=True, blank=False, on_delete=models.CASCADE, db_column='id_paroquia')
    
    def __str__(self):
        return self.username
    
    