from django.db import models
from django.core.files import File
import urllib.request
from . import defModels as metodo

# Create your models here.

class Juego(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    idGame = models.IntegerField(verbose_name='idGame')
    idConsola = models.ForeignKey('Consola',on_delete=models.CASCADE,db_column='idConsola',verbose_name='Consola')
    nombre = models.CharField(unique=False,max_length=50)
    imagen = models.ImageField(upload_to="juegos", null=True, blank=True)
    imagen_url = models.CharField(max_length=200,blank=True)
    stock = models.IntegerField(default=0)
    precio = models.IntegerField(default=100)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['idGame','idConsola'], name='pk_idg_idc')
        ]
    
    def save(self, *args, **kwargs):
        if self.imagen:
            print('Con imagen')
            file_name=metodo.generarNombre(self,'_')+self.imagen.name[-4:]
            if len(file_name)==len(self.imagen.name.split("/")[-1]):
                ruta = metodo.llamarRuta(file_name)
                rutaCopy = metodo.copiarFileLocal(ruta,file_name)
                file = File(open(rutaCopy, 'rb'))
                file_name='TempoTMP'+file_name
                self.imagen.save(file_name, file, save=False)
                estado=metodo.deleteUrlImagen(file_name)
                if estado==True:
                    self.imagen.name=self.imagen.name.replace('TempoTMP','')
            else:
                metodo.deleteUrlImagen(file_name)
                self.imagen.name=file_name
        elif self.imagen_url and not self.imagen:
            print('Sin imagen')
            result = urllib.request.urlretrieve(self.imagen_url)
            typeFile = self.imagen_url.split("/")[-1][-4:]
            file_name= metodo.generarNombre(self,'_')+typeFile
            metodo.deleteUrlImagen(file_name)
            file = File(open(result[0], 'rb'))
            self.imagen.save(file_name, file, save=False)
        super().save(*args, **kwargs)
    def __str__(self):
        return metodo.generarNombre(self,' ')

class Consola(models.Model):
    idConsola = models.IntegerField(db_column='idConsola',primary_key=True)
    nombre = models.CharField(unique=True,max_length=50)

    def __str__(self):
        return str(self.nombre)