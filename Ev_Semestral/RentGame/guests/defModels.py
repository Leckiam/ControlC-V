from django.conf import settings
from django.contrib.auth.models import User
import shutil
import os
import re

def generarNombre(instance,space):
    if space=='_':
        file_name=str(User.objects.get(email=instance.email))
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
    ruta_destino = 'C:\\Windows\\Temp\\'+file_name
    shutil.copy2(ruta, ruta_destino)
    return ruta_destino