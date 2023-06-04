from django.shortcuts import render
from .models import Cliente,Genero

# Create your views here.

def index(request):
    return render(request,'guests/index.html')

def login(request):
    if request.method != "POST":
        context={}
        return render(request,'guests/login.html', context)
    else:
        #es un POST, por lo tanto se recuperan los datos del formulario
        #y se graban
        username=request.POST["usernameLog"]
        password=request.POST["passwordLog"]
        try:
            clienteTmp=Cliente.objects.get(username=username)
        except Cliente.DoesNotExist:
            print('No tengo al Cliente')
            return render(request, 'guests/login.html')
        
        if (clienteTmp.password==password):
            print('Tengo al guest')
            context = {'cliente': clienteTmp}
            print(context)
            return render(request,'clientes/index.html',context)
        else:
            print('No tengo al guest')
            context={}
            return render(request, 'guests/login.html', context)

def register(request):
    #si no es POST, se muestra formulario para agregar nuevos alumnos
    if request.method != "POST":
        generos=Genero.objects.all()
        context={'generos':generos}
        return render(request,'guests/register.html', context)
    else:
        #es un POST, por lo tanto se recuperan los datos del formulario
        #y se graban
        username=request.POST["username"]
        password=request.POST["password"]
        fecha_nacimiento=request.POST["dateNac"]
        genero=request.POST["genero"]
        telefono=request.POST["telefono"]
        email=request.POST["correo"]
        direccion=request.POST["direccion"]
        
        objGenero=Genero.objects.get(id_genero=genero)
        obj=Cliente.objects.create( username=username,
                                  password=password,
                                  fecha_nacimiento=fecha_nacimiento,
                                  id_genero=objGenero,
                                  telefono=telefono,
                                  email=email,
                                  direccion=direccion)
        obj.save()
        context={'mensaje':"OK, datos grabados..."}
        return render(request, 'guests/register.html', context)


def playStation(request):
    return render(request, 'guests/playStation.html')

def xbox(request):
    return render(request, 'guests/xbox.html')

def nintendo(request):
    return render(request, 'guests/nintendo.html')