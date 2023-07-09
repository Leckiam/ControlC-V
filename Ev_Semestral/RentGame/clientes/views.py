from django.contrib.auth import logout
from django.shortcuts import render,redirect
from django.views.decorators.http import require_GET
from django.http import JsonResponse
from datetime import datetime, timedelta
from .models import Carrito
from guests.models import Cliente,Genero
from administrador.models import Juego,Consola

# Create your views here.
def perfil(request):
    if request.method != "POST":
        if request.user.is_authenticated:
            url='clientes/perfil.html'
            context=obtContext(request)
            return render(request,url,context)
        else:
            return redirect('indexGue')
    else:
        email=request.POST["correo"]
        nombre=request.POST["nombre"]
        apPaterno=request.POST["apPaterno"]
        apMaterno=request.POST["apMaterno"]
        fecha_nacimiento=request.POST["dateNac"]
        genero=request.POST["genero"]
        telefono=request.POST["telefono"]
        direccion=request.POST["direccion"]
        imagen=request.FILES.get("imagen")
        clearImg=request.POST.get('clearImg')
        
        try:
            objGenero=Genero.objects.get(id_genero=genero)
            objTmp=Cliente.objects.get(email = email)
            objTmp.nombre=nombre
            objTmp.ap_paterno=apPaterno
            objTmp.ap_materno=apMaterno
            objTmp.fecha_nacimiento=fecha_nacimiento
            objTmp.id_genero=objGenero
            objTmp.telefono=telefono
            objTmp.direccion=direccion
            if clearImg:
                objTmp.imagen=None
                print('Borrado de imagen')
            elif not clearImg and imagen:
                objTmp.imagen=imagen
                print('Modificacion de imagen')
            else:
                print('Sin modificacion')
            objTmp.save()
        except:
            existe = Cliente.objects.filter(email=request.user.email).exists()
            if not existe:
                objGenero=Genero.objects.get(id_genero=genero)
                obj=Cliente.objects.create(email = request.user.email,
                                        nombre = nombre,
                                        ap_paterno = apPaterno,
                                        ap_materno = apMaterno,
                                        fecha_nacimiento = fecha_nacimiento,
                                        id_genero = objGenero,
                                        telefono = telefono,
                                        direccion = direccion)
                obj.save()
            else:
                print('si existe xd')
    return redirect(to='perfilCli')

def carritoHistorial(request):
    url='clientes/carritoHistorial.html'
    if request.method != "POST":
        if request.user.is_authenticated:
            return render(request,url)
        else:
            return redirect('indexGue')

def logOutCli(request):
    logout(request)
    url='indexGue'
    return redirect(to=url)

def obtContext(req):
    context={}
    clienteTmp=Cliente()
    generos=Genero.objects.all()
    try:
        clienteTmp=Cliente.objects.get(email=req.user.email)
    except Cliente.DoesNotExist:
        print('No tengo al Cliente')
    context={'cliente': clienteTmp,'generos':generos}
    return context

def uploadCarrito(request):
    if request.method == "POST":
        listaGames=request.POST["cadenaJuegos"]
        nombre=request.POST["nombre"]
        precio=request.POST["precio"]
        dias_renta=int(request.POST["dias"])
        fecha_actual = datetime.now().date()
        fecha_fin = fecha_actual + timedelta(days=dias_renta)
        objCarrito = Carrito.objects.create(nombreCli = nombre,
                                            cadenaJuegos = listaGames,
                                            fecha_emicion = fecha_actual,
                                            dias_renta = dias_renta,
                                            fecha_fin = fecha_fin,
                                            precio = precio)
        objCarrito.save()
        print(objCarrito)
    return redirect(to='carritoCli')

def formatearDate(carritos):
    objs=[]
    for carrito in carritos:
        date_start = str(carrito.fecha_emicion)
        date_end = str(carrito.fecha_fin)
        obj = {
            'idCarro': carrito.idCarro,
            'nombreCli': carrito.nombreCli,
            'cadenaJuegos': carrito.cadenaJuegos,
            'fecha_emicion': date_start,
            'dias_renta': carrito.dias_renta,
            'fecha_fin': date_end,
            'precio': carrito.precio
        }
        objs.append(obj)
    return objs

def formatearGame(game):
    listaConsola=[game.idConsola.idConsola,game.idConsola.nombre]
    obj = {
        'idGame': game.idGame,
        'idConsola': listaConsola,
        'nombre': game.nombre,
        'imagen': game.imagen.url,
        'stock': game.stock,
        'precio': game.precio
    }
    return obj

@require_GET
def jsonObjCarrito(request):
    username = request.user.username
    
    carritos = Carrito.objects.all().filter(nombreCli=username).order_by('fecha_emicion')
    newCarritos = formatearDate(carritos)
    context={'carritos':newCarritos}
    return JsonResponse(context)

@require_GET
def jsonObjGame(request):
    idGame = request.GET.get('idGame')
    idConsola = request.GET.get('idConsola')
    objConsola = Consola.objects.get(idConsola=idConsola)
    juego = Juego.objects.get(idGame=idGame,idConsola=objConsola)
    newjuego = formatearGame(juego)
    context={'juego':newjuego}
    return JsonResponse(context)