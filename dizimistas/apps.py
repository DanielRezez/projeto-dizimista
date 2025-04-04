#Configurações automáticas e específicas do app dentro do projeto Django

from django.apps import AppConfig


class DizimistasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dizimistas'
