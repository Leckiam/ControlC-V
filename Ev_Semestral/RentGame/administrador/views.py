from django.shortcuts import render,redirect
from django.http import JsonResponse
from .models import Juego,Consola

# Create your views here.

def gameList(request):
    if request.method != "POST":
        return render(request,'administrador/juegosLista.html')
    else:
        idGame=int(request.POST["idGame"])
        idConsola=request.POST["idConsola"]
        nombre=request.POST["nombre"]
        urlImage=request.POST["urlImage"]
        stock=int(request.POST["stock"])
        precio=int(request.POST["precio"])
        print('Comienzo')
        if (existeGameAndCons(idConsola,idGame)):
            print('fallo1')
            context={'mensaje': 'Este juego ya esta guardado en la base de datos'}
            return render(request,'administrador/juegosLista.html',context)
        objetos = Juego.objects.all()
        for objeto in objetos:
            print(objeto)
        objConsola=Consola.objects.get(nombre=idConsola)
        print(objConsola)
        print('exito.0')
        obj=Juego.objects.create(idGame = idGame,
                                    idConsola = objConsola,
                                    nombre = nombre,
                                    imagen_url = urlImage,
                                    stock = stock,
                                    precio = precio)
        obj.save()
        print('exito.1')
        return redirect(to='gameListAdm')

def existeGameAndCons(idCons,idGame):
    existe = False
    existe1 = Juego.objects.filter(idConsola__nombre=idCons,idGame=idGame).exists()
    print(existe1)
    if (existe1==False and existe1 == existe1):
        existe=False
    return existe