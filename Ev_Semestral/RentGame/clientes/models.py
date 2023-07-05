from django.db import models

# Create your models here.

class Carrito(models.Model):
    idCarro = models.AutoField(db_column='idCarro',primary_key=True)
    nombreCli = models.CharField(max_length=50,verbose_name='Nombre del cliente')
    cadenaJuegos = models.CharField(max_length=100,verbose_name='Cadena de Ids de Juegos', default='')
    fecha_emicion = models.DateField(blank=False, null=False)
    precio = models.IntegerField(blank=False, null=False, default=0)

    def __str__(self):
        return str(self.nombreCli)+' '+str(self.fecha_emicion)
