from django.shortcuts import render,redirect
from guests.models import Cliente,Genero
from django.contrib.auth import logout

# Create your views here.
def perfil(request):
    url='clientes/perfil.html'
    context=obtContext(request)
    return render(request,url,context)

def logOutCli(request):
    logout(request)
    url='indexGue'
    return redirect(to=url)

def obtContext(req):
    context={}
    generos=Genero.objects.all()
    try:
        clienteTmp=Cliente.objects.get(email=req.user.email)
        print(clienteTmp.imagen.url)
        context={'cliente': clienteTmp,'generos':generos}
    except Cliente.DoesNotExist:
        print('No tengo al Cliente')
    return context
    