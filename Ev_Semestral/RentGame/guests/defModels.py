from django.conf import settings
from django.contrib.auth.models import User
import shutil
import psutil
import os
import re

def obtener_nombre_disco():
    particiones = psutil.disk_partitions()

    for particion in particiones:
        if 'fixed' in particion.opts:
            nombre_disco = particion.device
            break
    else:
        nombre_disco = "Desconocido"

    return nombre_disco

def generarNombre(instance,space):
    if space=='_':
        userTmp=User.objects.get(email=instance.email)
        file_name=userTmp.username
        newName = file_name.replace('.','_')
        return newName.replace(' ',space)
    else:
        file_name=str(User.objects.get(email=instance.email))+ ' ' + str(instance.nombre) + ' ' + str(instance.ap_paterno)
        return file_name

def eliminarSimbolo(texto):
    patron = r"[^\w\s]"
    texto_sin_simbolos = re.sub(patron, "", texto)
    return texto_sin_simbolos

def llamarRuta(fileName):
    url='clientes'+'\\'+fileName
    ruta_completa = os.path.join(settings.MEDIA_ROOT, url.lstrip('/'))
    return ruta_completa

def deleteUrlImagen(fileName):
    ruta = llamarRuta(fileName)
    if os.path.exists(ruta):
        try:
            os.remove(ruta)
            return True
        except:
            return False
    else:
        return False

def copiarFileLocal(ruta,file_name):
    diskName = obtener_nombre_disco()
    ruta_destino = diskName+'Users\\Public\\Downloads\\'+file_name
    shutil.copy2(ruta, ruta_destino)
    return ruta_destino