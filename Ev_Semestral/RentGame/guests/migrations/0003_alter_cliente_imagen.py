# Generated by Django 4.1.2 on 2023-07-03 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guests', '0002_cliente_imagen_alter_cliente_ap_materno_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='imagen',
            field=models.ImageField(null=True, upload_to='clientes'),
        ),
    ]
