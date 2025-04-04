from django.contrib import admin
from .models import User  # Importe o modelo User
from django.contrib.auth.admin import UserAdmin  # Usado para customizar o modelo de usuário

class CustomUserAdmin(UserAdmin):
    # Customize os campos que serão exibidos na interface de administração
    list_display = ('id', 'username', 'email', 'id_paroquia', 'is_active', 'is_staff')
    list_filter = ('is_active', 'is_staff', 'id_paroquia')
    search_fields = ('username', 'email')
    ordering = ('id',)

    # Defina quais campos devem ser exibidos no formulário de edição do usuário
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Informações Pessoais', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Importante', {'fields': ('id_paroquia',)}),
    )

    # Campos que serão exibidos na tela de criação do usuário
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email', 'id_paroquia', 'is_active', 'is_staff')}
        ),
    )

# Registre o modelo User e a classe personalizada UserAdmin
admin.site.register(User, CustomUserAdmin)
