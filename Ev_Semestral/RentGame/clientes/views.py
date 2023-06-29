from django.shortcuts import render,redirect
from guests.models import Cliente,Genero
from django.contrib.auth import logout

# Create your views here.
def perfil(request):
    if request.method != "POST":
        url='clientes/perfil.html'
        context=obtContext(request)
        return render(request,url,context)
    else:
        email=request.POST["correo"]
        nombre=request.POST["nombre"]
        fecha_nacimiento=request.POST["dateNac"]
        genero=request.POST["genero"]
        telefono=request.POST["telefono"]
        direccion=request.POST["direccion"]
        
        try:
            objGenero=Genero.objects.get(id_genero=genero)
            objTmp=Cliente.objects.get(email = email)
            objTmp.nombre=nombre
            objTmp.ap_paterno=''
            objTmp.ap_materno=''
            objTmp.fecha_nacimiento=fecha_nacimiento
            objTmp.id_genero=objGenero
            objTmp.telefono=telefono
            objTmp.direccion=direccion
            objTmp.save()
        except:
            objGenero=Genero.objects.get(id_genero=genero)
            obj=Cliente.objects.create(email = email,
                                       nombre = nombre,
                                       ap_paterno = '',
                                       ap_materno = '',
                                       fecha_nacimiento = fecha_nacimiento,
                                       id_genero = objGenero,
                                       telefono = telefono,
                                       direccion = direccion)
            obj.save()
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
    