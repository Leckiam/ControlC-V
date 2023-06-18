import os
from django.db import models
from django.core.files import File
import urllib.request

# Create your models here.

def generarNombre(instance,space):
    nameConsole = str(instance.idConsola)
    if space=='_':
        space2=space
    else:
        space2='.'
    if (nameConsole[0]=='P'):
        nameConsole='PS'+space2+nameConsole[-1:]
    elif (nameConsole[0]=='X'):
        nameConsole='XB'+space2+nameConsole[-3:]
    else:
        nameConsole='NT'+space2+nameConsole[-3:]
    return str(instance.nombre)+space+nameConsole.upper()

class Juego(models.Model):
    idGame = models.IntegerField(verbose_name='ID')
    idConsola = models.ForeignKey('Consola',on_delete=models.CASCADE,db_column='idConsola',verbose_name='Consola')
    nombre = models.CharField(unique=False,max_length=50)
    imagen = models.ImageField(upload_to="juegos", null=True, blank=True)
    imagen_url = models.CharField(max_length=200,blank=True)
    stock = models.IntegerField(default=1)
    precio = models.IntegerField(default=100)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['idGame'], name='pk_idg_idc')
        ]
    
    def save(self, *args, **kwargs):
        if self.imagen_url and not self.imagen:
            result = urllib.request.urlretrieve(self.imagen_url)
            typeFile = self.imagen_url.split("/")[-1][-4:]
            file_name= generarNombre(self,'_')+typeFile
            file = File(open(result[0], 'rb'))
            self.imagen.save(file_name, file, save=False)

        super().save(*args, **kwargs)
    def __str__(self):
        return generarNombre(self,' ')

class Consola(models.Model):
    idConsola = models.IntegerField(db_column='idConsola',primary_key=True)
    nombre = models.CharField(unique=True,max_length=50)

    def __str__(self):
        return str(self.nombre)