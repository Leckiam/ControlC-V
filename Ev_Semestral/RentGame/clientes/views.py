from django.shortcuts import render
from guests.models import Cliente,Genero

# Create your views here.
def index(request,pk):
    url='clientes/index.html'
    clienteTmp=Cliente()
    if Cliente.objects.get(username=pk):
        clienteTmp=Cliente.objects.get(username=pk)
        context = {'cliente': clienteTmp}
        return render(request,url,context)
    else:
        print('No tengo al Cliente')
        return render(request,'guests/index.html')

def perfil(request,pk):
    url='clientes/perfil.html'
    clienteTmp=Cliente()
    if Cliente.objects.get(username=pk):
        clienteTmp=Cliente.objects.get(username=pk)
        context = {'cliente': clienteTmp}
        return render(request,url,context)
    else:
        print('No tengo al Cliente')
        return render(request,'guests/index.html')

def nintendo(request,pk):
    url='clientes/nintendo.html'
    clienteTmp=Cliente()
    if Cliente.objects.get(username=pk):
        clienteTmp=Cliente.objects.get(username=pk)
        context = {'cliente': clienteTmp}
        return render(request,url,context)
    else:
        print('No tengo al Cliente')
        return render(request,'guests/index.html')

def playStation(request,pk):
    url='clientes/playStation.html'
    clienteTmp=Cliente()
    if Cliente.objects.get(username=pk):
        clienteTmp=Cliente.objects.get(username=pk)
        context = {'cliente': clienteTmp}
        return render(request,url,context)
    else:
        print('No tengo al Cliente')
        return render(request,'guests/index.html')

def xbox(request,pk):
    url='clientes/xbox.html'
    clienteTmp=Cliente()
    if Cliente.objects.get(username=pk):
        clienteTmp=Cliente.objects.get(username=pk)
        context = {'cliente': clienteTmp}
        return render(request,url,context)
    else:
        print('No tengo al Cliente')
        return render(request,'guests/index.html')
