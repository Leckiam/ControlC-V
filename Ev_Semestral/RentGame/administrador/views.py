from django.views.decorators.http import require_GET
from django.shortcuts import render,redirect
from django.http import JsonResponse
from .models import Juego,Consola

# Create your views here.

def gameAdd(request):
    if request.user.is_superuser:
        if request.method != "POST":
            consolas=Consola.objects.all().order_by('idConsola')
            context={'consolas':consolas}
            return render(request,'administrador/juegosAdd.html',context)
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
            obj=Juego.objects.create(idGame = idGame,
                                    idConsola = objConsola,
                                    nombre = nombre,
                                    imagen_url = urlImage,
                                    stock = stock,
                                    precio = precio)
            obj.save()
            return redirect(to='gameAddAdm')
    else:
        return redirect('indexGue')
    
def gameEdit(request):
    if request.user.is_superuser:
        consolas=Consola.objects.all().order_by('idConsola')
        context={'consolas':consolas}
        return render(request,'administrador/juegosEditar.html',context)
    else:
        return redirect('indexGue')

def dml_U_D_Juego(request):
    if request.user.is_superuser:
        if request.method == "POST":
            submit_button = request.POST.get('submitInput')
            
            idGame=int(request.POST["idGame"])
            idConsola=request.POST["idConsola"]
            
            if (existeGameAndCons(idGame,idConsola)==False):
                mensaje= 'Este juego no esta guardado en la base de datos'
                context={'mensaje': mensaje}
                return redirect(to='gameEditAdm')
            objConsola=Consola.objects.get(idConsola=idConsola)
            obj=Juego.objects.get(idGame = idGame,idConsola = objConsola)
            if submit_button == 'Modificar':
                nombre=request.POST["nombre"]
                urlImage=request.POST["urlImage"]
                stock=int(request.POST["stock"])
                precio=int(request.POST["precio"])
                obj.nombre = nombre
                obj.imagen_url = urlImage
                obj.stock = stock
                obj.precio = precio
                obj.save()
                return redirect(to='gameEditAdm')
            elif submit_button == 'Eliminar':
                obj.delete()
                return redirect(to='gameEditAdm')
            else:
                return redirect(to='gameEditAdm')
        else:
            return redirect(to='gameEditAdm')
    else:
        return redirect('indexGue')

def existeGameAndCons(idGame,idCons):
    objConsola = Consola.objects.get(idConsola=idCons)
    existe = Juego.objects.filter(idGame=idGame,idConsola=objConsola).exists()
    return existe

def agruparJuegos(catalogo,filtro):
    listaConsola=[]
    listaStock = []
    listaPrecio = []
    objs= []
    obj = {}
    context={}
    for item in catalogo:
        if len(obj)==0:
            id=item.idGame
        if id!=item.idGame:
            id=item.idGame
            if filtro != 0:
                for consola in listaConsola:
                    if consola[0]==filtro:
                        objs.append(obj)
                        break
            else:
                objs.append(obj)
                    
            listaConsola=[]
            listaStock = []
            listaPrecio = []
                
        
        listaConsola.append([item.idConsola.idConsola,item.idConsola.nombre])
        listaStock.append([item.stock,item.idConsola.idConsola])
        listaPrecio.append([item.precio,item.idConsola.idConsola])
        obj = {
                'idGame': item.idGame,
                'idConsola': listaConsola,
                'firstConsole':listaConsola[0][0],
                'nombre': item.nombre,
                'imagen': item.imagen.url,
                'stock': listaStock,
                'firstStock':listaStock[0][0],
                'precio': listaPrecio,
                'firstPrecio':listaPrecio[0][0],
            }
    if len(obj)!=0:
        if filtro != 0:
            for consola in obj['idConsola']:
                if consola[0]==filtro:
                    objs.append(obj)
                    break
        else:
            objs.append(obj)
    if len(objs[0])!=0:
        context={'catalogo':objs}
    return context

@require_GET
def llamarGameConsole(request):
    if request.user.is_superuser:
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
    else:
        return redirect('indexGue')

@require_GET
def llamarAllGames(request):
    if request.user.is_superuser:
        filtro = request.GET.get('filtro')
        catalogoTmp = Juego.objects.all().order_by('idGame','idConsola')
        context = agruparJuegos(catalogoTmp,int(filtro))
        return JsonResponse(context)
    else:
        return redirect('indexGue')