# Generated by Django 4.1.2 on 2023-06-12 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guests', '0002_carrito_consola_juego_cliente_imagen_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='imagen',
            field=models.ImageField(default='clientes/UserStrange.jpg', null=True, upload_to='clientes'),
        ),
    ]
