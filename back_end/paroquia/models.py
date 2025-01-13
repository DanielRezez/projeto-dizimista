from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.

class Paroquia(models.Model):
    nome = models.CharField(max_length=255)
    situacao = models.CharField(max_length=1, choices=[('A', 'Ativo'), ('I', 'Inativo')], default='A')
    
    def __str__(self):
        return self.nome
    
    class Meta:
        db_table = 'tb_paroquia'
        
    def save(self):
        self.nome = self.nome.title()
        super().save()