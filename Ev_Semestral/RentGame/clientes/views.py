from django.contrib.auth import logout
from django.shortcuts import render,redirect
from datetime import datetime
from .models import Carrito
from guests.models import Cliente,Genero

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
        print(clienteTmp.imagen.url)
    except Cliente.DoesNotExist:
        print('No tengo al Cliente')
    context={'cliente': clienteTmp,'generos':generos}
    return context

def uploadCarrito(request):
    if request.method == "POST":
        listaGames=request.POST["cadenaJuegos"]
        nombre=request.POST["nombre"]
        precio=request.POST["precio"]
        fecha_actual = datetime.now().date()
        objCarrito = Carrito.objects.create(nombreCli = nombre,
                                            cadenaJuegos = listaGames,
                                            fecha_emicion = fecha_actual,
                                            precio = precio)
        objCarrito.save()
    return redirect(to='perfilCli')