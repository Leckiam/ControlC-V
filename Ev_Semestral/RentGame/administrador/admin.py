from django.contrib import admin

# Register your models here.

from .models import Consola,Juego

admin.site.register(Consola)
admin.site.register(Juego)