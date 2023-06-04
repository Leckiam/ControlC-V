from django.shortcuts import render
from .models import Guest,Genero

# Create your views here.

def index(request):
    return render(request,'guests/index.html')

def login(request):
    guests= Guest.objects.all()
    contexto={
        'guests': guests
    }
    #agrego el contexto al retorno para que se vea en el template
    return render(request, 'guests/login.html', contexto)

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
        obj=Guest.objects.create( username=username,
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
    context={}
    return render(request, 'guests/playStation.html', context)

def xbox(request):
    context={}
    return render(request, 'guests/xbox.html', context)

def nintendo(request):
    context={}
    return render(request, 'guests/nintendo.html', context)