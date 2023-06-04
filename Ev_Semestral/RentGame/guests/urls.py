from django.urls import path
from . import views

urlpatterns = [
    path('index', views.index,name='indexGue'),
    path('login', views.login,name='loginGue'),
    path('register', views.register,name='registerGue'),
    path('playStation', views.playStation,name='playStationGue'),
    path('xbox', views.xbox,name='xboxGue'),
    path('nintendo', views.nintendo,name='nintendoGue'),
]
