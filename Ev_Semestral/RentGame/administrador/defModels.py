from django.conf import settings
import shutil
import psutil
import os
import re

def obtener_nombre_disco():
    particiones = psutil.disk_partitions()
    ruta_end = 'Users\Public\Downloads'
    
    for particion in particiones:
        if 'fixed' in particion.opts and os.path.exists(particion.device+ruta_end):
            nombre_disco = particion.device
            break
    else:
        nombre_disco = "Desconocido"

    return nombre_disco

def generarNombre(instance,space):
    nameConsole = str(instance.idConsola)
    if (nameConsole[0]=='P'):
        nameConsole='PS'+' '+nameConsole[-1:]
    elif (nameConsole[0]=='X'):
        nameConsole='XB'+' '+nameConsole[-3:]
    else:
        nameConsole='NT'+' '+nameConsole[-3:]
    if space=='_':
        newName = eliminarSimbolo(str(instance.nombre))
        return newName.replace(' ',space)
    else:
        return str(instance.nombre).replace(' ',space)+' '+nameConsole.replace(' ','_').upper()

def eliminarSimbolo(texto):
    patron = r"[^\w\s]"
    texto_sin_simbolos = re.sub(patron, "", texto)
    return texto_sin_simbolos

def llamarRuta(fileName):
    url='juegos'+'\\'+fileName
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
    print('Ruta_Destino'+ruta_destino)
    shutil.copy2(ruta, ruta_destino)
    return ruta_destino