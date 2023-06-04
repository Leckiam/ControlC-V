from django.db import models

# Create your models here.
class Guest(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    fecha_nacimiento = models.DateField(blank=False, null=False)
    id_genero = models.ForeignKey('Genero',on_delete=models.CASCADE, db_column='idGenero')
    telefono = models.CharField(max_length=45)
    email = models.EmailField(unique=True, max_length=100)
    direccion = models.CharField(max_length=50, blank=True, null=True)
    def __str__(self):
        return str(self.username)
   
class Genero(models.Model):
    id_genero = models.AutoField(db_column='idGenero', primary_key=True)
    genero = models.CharField(max_length=20, blank=False, null=False)
    def __str__(self):
        return str(self.genero)