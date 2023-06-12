from django.contrib import admin

# Register your models here.
from .models import Genero, Cliente,Consola,Juego,Carrito
# Register your models here.
admin.site.register(Genero)
admin.site.register(Cliente)
admin.site.register(Consola)
admin.site.register(Juego)
admin.site.register(Carrito)