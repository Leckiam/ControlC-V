from django.urls import path
from . import views

urlpatterns = [
    path('perfil/', views.perfil,name='perfilCli'),
    path('logout/', views.logOutCli,name='logOutCli'),
    path('upload/carrito', views.uploadCarrito,name='uploadCarrito'),
]
