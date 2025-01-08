from django.contrib import admin
from .models import Dizimista

# Register your models here.

@admin.register(Dizimista)

class DizimistaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'data_nascimento', 'email', 'telefone', 'situacao')
    search_fields = ('nome', 'email', 'id_paroquia')
    list_filter = ('situacao', 'id_paroquia')