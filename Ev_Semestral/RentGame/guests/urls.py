from django.urls import path
from . import views

urlpatterns = [
    path('', views.index,name='indexGue'),
    path('login/', views.loginGue,name='loginGue'),
    path('register/', views.registerGue,name='registerGue'),
    path('playStation/', views.playStation,name='playStationGue'),
    path('xbox/', views.xbox,name='xboxGue'),
    path('nintendo/', views.nintendo,name='nintendoGue'),
]
