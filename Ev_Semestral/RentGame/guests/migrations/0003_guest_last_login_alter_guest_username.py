# Generated by Django 4.1.2 on 2023-06-03 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guests', '0002_alter_guest_telefono'),
    ]

    operations = [
        migrations.AddField(
            model_name='guest',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AlterField(
            model_name='guest',
            name='username',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
