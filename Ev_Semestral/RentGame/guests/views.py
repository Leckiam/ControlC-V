from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,get_user_model
from django.views.decorators.http import require_GET
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Cliente,Genero
from administrador.models import Juego,Consola

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
    if request.method != "POST":
        return render(request, 'guests/playStation.html')
    else:
        return redirect(to='playStationGue')

def xbox(request):
    if request.method != "POST":
        return render(request, 'guests/xbox.html')
    else:
        
        return redirect(to='xboxGue')

def nintendo(request):
    if request.method != "POST":
        return render(request, 'guests/nintendo.html')
    else:
        return redirect(to='nintendoGue')

def agruparJuegos(catalogo):
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
        objs.append(obj)
    if len(objs[0])!=0:
        context={'catalogo':objs}
    return context

@require_GET
def jsonObjJuegos(request):
    init = request.GET.get('initC')
    if (init=='PS'):
        ids=[15,16,18]
    elif (init=='NT'):
        ids=[8,9,11]
    elif (init=='XB'):
        ids=[1,14]
        
    context={}
    catalogo = Juego.objects.filter(idConsola__idConsola__in=ids).order_by('idGame','idConsola')
    context=agruparJuegos(catalogo)
    return JsonResponse(context)
