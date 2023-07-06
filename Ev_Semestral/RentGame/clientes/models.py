from django.db import models
from datetime import datetime, timedelta

# Create your models here.

class Carrito(models.Model):
    idCarro = models.AutoField(db_column='idCarro',primary_key=True)
    nombreCli = models.CharField(max_length=50,verbose_name='Nombre del cliente')
    cadenaJuegos = models.CharField(max_length=100,verbose_name='Cadena de Ids de Juegos', default='')
    fecha_emicion = models.DateField(blank=False, null=False,default=datetime.now().date())
    dias_renta = models.IntegerField(verbose_name='Dias que dura la renta',null=False,default=3)
    fecha_fin = models.DateField(blank=False, null=False,default=datetime.now().date()+timedelta(days=3))
    precio = models.IntegerField(blank=False, null=False, default=0)

    def __str__(self):
        return str(self.nombreCli)+' '+str(self.fecha_emicion)
