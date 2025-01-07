from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Dizimista(models.Model):
    id_paroquia = models.IntegerField()
    ficha = models.IntegerField()
    nome = models.CharField(max_length=255)
    data_nascimento = models.DateField()
    email = models.EmailField(blank=True, null=True)
    telefone = PhoneNumberField(blank=True, null=True),
    situacao = models.CharField(max_length=1, choices=[('A', 'Ativo'), ('I', 'Inativo')], default='A')
    
    def __str__(self):
        return self.nome
    
    class Meta:
        unique_together = ('id_paroquia', 'ficha')
        db_table='tb_dizimistas'
        permissions=[
            ('can_view_dizimista', 'Can view dizimista'),
            ('can_edit_dizimista', 'Can edit dizimista'),
        ]
