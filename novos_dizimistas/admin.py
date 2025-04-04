from .models import NovoDizimista
from django.contrib import admin

# Register your models here.

@admin.register(NovoDizimista)

class NovoDizimistaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'data_nascimento', 'email', 'telefone', 'situacao')
    search_fields = ('nome', 'situacao', 'id_paroquia')
    list_filter = ('situacao', 'id_paroquia')
