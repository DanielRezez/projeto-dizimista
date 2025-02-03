from django.db import models
from django.contrib.auth.models import AbstractUser
from paroquia.models import Paroquia

# Create your models here.

class User(AbstractUser):
    id_paroquia = models.ForeignKey(Paroquia, null=True, on_delete=models.CASCADE, db_column='id_paroquia')
    
    def __str__(self):
        return self.username
    