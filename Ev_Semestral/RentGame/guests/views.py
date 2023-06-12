from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,get_user_model
from django.contrib.auth.models import User
from .models import Cliente,Genero

# Create your views here.

def index(request):
    return render(request,'guests/index.html')

def loginGue(request):
    if request.method != "POST":
        context={}
        return render(request,'guests/login.html', context)
    else:
        #es un POST, por lo tanto se recuperan los datos del formulario
        #y se graban
        username=request.POST["usernameLog"]
        password=request.POST["passwordLog"]
        user=authenticate(username=username,password=password)
        if (user):
            print('Tengo al cliente ',user)
            login(request,user)
            return redirect(to='indexGue')
        else:
            print('No tengo al guest')
            return render(request, 'guests/login.html')

def registerGue(request):
    #si no es POST, se muestra formulario para agregar nuevos alumnos
    if request.method != "POST":
        generos=Genero.objects.all()
        context={'generos':generos}
        return render(request,'guests/register.html', context)
    else:
        #es un POST, por lo tanto se recuperan los datos del formulario
        #y se graban
        nombre=request.POST["nombre"]
        password=request.POST["password"]
        fecha_nacimiento=request.POST["dateNac"]
        genero=request.POST["genero"]
        telefono=request.POST["telefono"]
        email=request.POST["correo"]
        direccion=request.POST["direccion"]
        
        usernameTmp=''
        for i in email:
            if i=='@':
                break
            else:
                usernameTmp+=i
        try:
            objTmp=Cliente.objects.get(email = email)
            return redirect(to='indexGue')
        except:
            user = User.objects.create_user(username=usernameTmp, password=password)
            user.email = email
            user.save()
        
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
        print('Exito',obj)
        return redirect(to='loginGue')

def playStation(request):
    return render(request, 'guests/playStation.html')

def xbox(request):
    return render(request, 'guests/xbox.html')

def nintendo(request):
    return render(request, 'guests/nintendo.html')