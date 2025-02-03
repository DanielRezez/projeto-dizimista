#O app models.py define a estrutura das tabelas do banco de dados.

from django.db import models
from django.core.exceptions import ValidationError
from phonenumber_field.modelfields import PhoneNumberField
from paroquia.models import Paroquia

# Create your models here.
class Dizimista(models.Model):
    id_paroquia = models.ForeignKey(Paroquia, null=True, blank=False, on_delete=models.CASCADE, db_column='id_paroquia')
    sistema = models.IntegerField(null=True)
    ficha = models.IntegerField()
    nome = models.CharField(max_length=255)
    data_nascimento = models.DateField()
    email = models.EmailField(null=True, blank=True)
    telefone = PhoneNumberField(null=True, blank=True)
    phone_permission = models.BooleanField(default=True)
    email_permission = models.BooleanField(default=True)
    situacao = models.CharField(max_length=1, choices=[('A', 'Ativo'), ('I', 'Inativo')], default='A')
    
    
    #Especifica como cada instância de um modelo é exibida no Django Admin ou mesmo em prints de shell interativo
    def __str__(self):
        return self.nome
    
    #Define metadados, restrições e modos de funcionamento
    class Meta:
        db_table = 'tb_dizimistas'
        
    def clean(self):
        #Validação customizada para garantir que não existam dizimistas com ficha duplicadas
        if Dizimista.objects.filter(id_paroquia=self.id_paroquia, ficha=self.ficha, situacao='A').exclude(pk=self.pk).exists():
            raise ValidationError('Já existe um dizimista com esse número nesta paróquia!')
        
        if self.email and Dizimista.objects.filter(email=self.email, situacao='A').exclude(pk=self.pk).exists():
            raise ValidationError('Esse e-mail já está em uso!')

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)