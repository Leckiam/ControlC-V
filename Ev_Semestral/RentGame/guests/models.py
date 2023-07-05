from django.db import models
from django.contrib.auth.models import User
from django.core.files import File
from . import defModels as metodo

# Create your models here.
class Cliente(models.Model):
    email = models.EmailField(unique=True, max_length=100,primary_key=True,verbose_name='E-mail')
    nombre = models.CharField(max_length=30,blank=False, null=False,verbose_name='Nombre')
    ap_paterno = models.CharField(max_length=30,blank=False, null=False,verbose_name='Apellido paterno')
    ap_materno = models.CharField(max_length=30,blank=True, null=True,verbose_name='Apellido materno')
    fecha_nacimiento = models.DateField(blank=False, null=False,verbose_name='Fecha nacimiento')
    id_genero = models.ForeignKey('Genero',on_delete=models.CASCADE, db_column='idGenero',verbose_name='Genero')
    telefono = models.IntegerField(blank=False, null=False,verbose_name='Telefono')
    direccion = models.CharField(max_length=50, blank=True, null=True,verbose_name='Direccion')
    imagen = models.ImageField(upload_to="clientes", null=True)
    
    def save(self, *args, **kwargs):
        if not self.imagen:
            print('Sin imagen')
            ruta=metodo.llamarRuta('UserStrange.jpg')
            file_name= metodo.generarNombre(self,'_')+'.jpg'
            metodo.deleteUrlImagen(file_name)
            file = File(open(ruta, 'rb'))
            self.imagen.save(file_name, file, save=False)
        elif self.imagen:
            print('Con imagen')
            file_name=metodo.generarNombre(self,'_')+self.imagen.name[-4:]
            if file_name==self.imagen.name.split("/")[-1]:
                ruta = metodo.llamarRuta(file_name)
                rutaCopy = metodo.copiarFileLocal(ruta,file_name)
                file = File(open(rutaCopy, 'rb'))
                file_name='TempoTMP'+file_name
                self.imagen.save(file_name, file, save=False)
                estado=metodo.deleteUrlImagen(file_name)
                if estado==True:
                    self.imagen.name=self.imagen.name.replace('TempoTMP','')
            else:
                print('else xd')
                metodo.deleteUrlImagen(file_name)
                self.imagen.name=file_name
        super().save(*args, **kwargs)
    
    def __str__(self):
        return  str(User.objects.get(email=self.email))+ ' ' + str(self.nombre) + ' ' + str(self.ap_paterno)

class Genero(models.Model):
    id_genero = models.AutoField(db_column='idGenero', primary_key=True)
    genero = models.CharField(max_length=20, blank=False, null=False)
    
    def __str__(self):
        return str(self.genero)