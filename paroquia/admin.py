from django.contrib import admin
from .models import Paroquia

# Register your models here.

@admin.register(Paroquia)

class ParoquiaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'situacao')