# Generated by Django 4.1.2 on 2023-07-06 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Carrito',
            fields=[
                ('idCarro', models.AutoField(db_column='idCarro', primary_key=True, serialize=False)),
                ('nombreCli', models.CharField(max_length=50, verbose_name='Nombre del cliente')),
                ('cadenaJuegos', models.CharField(default='', max_length=100, verbose_name='Cadena de Ids de Juegos')),
                ('fecha_emicion', models.DateField()),
                ('precio', models.IntegerField(default=0)),
            ],
        ),
    ]
