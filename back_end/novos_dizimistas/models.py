from django.db import models
from django.core.exceptions import ValidationError
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class NovoDizimista(models.Model):
    id_paroquia = models.IntegerField()
    ficha = models.IntegerField()
    nome = models.CharField(max_length=255)
    data_nascimento = models.DateField()
    email = models.EmailField(null=True, blank=True)
    telefone = PhoneNumberField(null=True, blank=True)
    phone_permission = models.BooleanField(default=True)
    email_permission = models.BooleanField(default=True)
    situacao = models.CharField(max_length=1, choices=[('A', 'Ativo'), ('I', 'Inativo')], default='A')
    
    def __str__(self):
        return self.nome
    
    class Meta:
        unique_together = ('id_paroquia', 'ficha')
        db_table = 'tb_novos_dizimistas'
        permissions = [
            ('can_view_novoDizimista', 'Can view novo dizimista'),
            ('can_edit_novoDizimista', 'Can edit novo dizimista'),
        ]
    
    def clean(self):
        if NovoDizimista.objects.filter(id_paroquia=self.id_paroquia, ficha=self.ficha).exclude(pk=self.pk).exists():
            raise ValidationError('Já existe um dizimista com esse número nesta paróquia')
        
        if NovoDizimista.objects.filter(email=self.email).exclude(pk=self.pk).exists():
            raise ValidationError('Esse e-mail já está em uso!')

    def save(self):
        self.full_clean()
        super().save()