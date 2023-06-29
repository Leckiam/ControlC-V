from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Juego,Consola

# Create your views here.

def gameAdd(request):
    if request.method != "POST":
        return render(request,'administrador/juegosAdd.html')
    else:
        idGame=int(request.POST["idGame"])
        idConsola=request.POST["idConsola"]
        nombre=request.POST["nombre"]
        urlImage=request.POST["urlImage"]
        stock=int(request.POST["stock"])
        precio=int(request.POST["precio"])
        if (existeGameAndCons(idGame,idConsola)==True):
            context={'mensaje': 'Este juego ya esta guardado en la base de datos'}
            return render(request,'administrador/juegosAdd.html',context)
        objConsola=Consola.objects.get(idConsola=idConsola)
        print(objConsola)
        obj=Juego.objects.create(idGame = idGame,
                                 idConsola = objConsola,
                                 nombre = nombre,
                                 imagen_url = urlImage,
                                 stock = stock,
                                 precio = precio)
        obj.save()
        return redirect(to='gameAddAdm')
    
def gameEdit(request):
    juegos = Juego.objects.all().order_by('idGame','idConsola')
    consolas = Consola.objects.all()
    objs = []
    obj = {}
    listaConsola = []
    listaStock = []
    listaPrecio = []
    id = -1
    for item in juegos:
        if len(obj)==0:
            id=item.idGame
        if id!=item.idGame:
            id=item.idGame
            objs.append(obj)
            listaConsola=[]
            listaStock = []
            listaPrecio = []
        listaConsola.append(item.idConsola)
        listaStock.append([item.stock,item.idConsola.idConsola])
        listaPrecio.append([item.precio,item.idConsola.idConsola])
        obj = {
                'idGame': item.idGame,
                'idConsola': listaConsola,
                'firstConsole':listaConsola[0].idConsola,
                'nombre': item.nombre,
                'imagen': item.imagen,
                'stock': listaStock,
                'firstStock':listaStock[0][0],
                'precio': listaPrecio,
                'firstPrecio':listaPrecio[0][0],
            }
    objs.append(obj)
    if len(objs[0])!=0:
        context={'juegos':objs,'consolas':consolas}
        return render(request,'administrador/juegosEditar.html',context)
    else:
        return render(request,'administrador/juegosEditar.html')

def dml_U_D_Juego(request):
    if request.method == "POST":
        submit_button = request.POST.get('submitInput')
        
        idGame=int(request.POST["idGame"])
        idConsola=request.POST["idConsola"]
        print(idGame,idConsola)
        if (existeGameAndCons(idGame,idConsola)==False):
            mensaje= 'Este juego no esta guardado en la base de datos'
            print(mensaje)
            context={'mensaje': mensaje}
            return redirect(to='gameEditAdm')
        objConsola=Consola.objects.get(idConsola=idConsola)
        obj=Juego.objects.get(idGame = idGame,idConsola = objConsola)
        if submit_button == 'Modificar':
            nombre=request.POST["nombre"]
            urlImage=request.POST["urlImage"]
            stock=int(request.POST["stock"])
            precio=int(request.POST["precio"])
            print('Modificar')
            obj.nombre = nombre
            obj.imagen_url = urlImage
            obj.stock = stock
            obj.precio = precio
            obj.save()
            return redirect(to='gameEditAdm')
        elif submit_button == 'Eliminar':
            obj.delete()
            print(obj)
            return redirect(to='gameEditAdm')
        else:
            return redirect(to='gameEditAdm')
    else:
        return redirect(to='gameEditAdm')

def existeGameAndCons(idGame,idCons):
    objConsola = Consola.objects.get(idConsola=idCons)
    existe = Juego.objects.filter(idGame=idGame,idConsola=objConsola).exists()
    print(existe)
    return existe

@require_GET
def verificar_entidad(request):
    getIdGame = request.GET.get('idGame')
    consolas = Consola.objects.all()
    listaReg=[]
    for regConsole in consolas:
        listaTmp=[regConsole.idConsola,regConsole.nombre]
        existeTmp = Juego.objects.filter(idConsola__nombre=listaTmp[1],idGame=getIdGame).exists()
        listaTmp.append(existeTmp)
        listaReg.append(listaTmp)
    existe = Juego.objects.filter(idGame=getIdGame).exists()
    context={'existe': existe,'consolas':listaReg}
    return JsonResponse(context)