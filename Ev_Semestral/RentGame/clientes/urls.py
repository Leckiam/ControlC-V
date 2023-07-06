from django.urls import path
from . import views

urlpatterns = [
    path('perfil/', views.perfil,name='perfilCli'),
    path('carrito/', views.carritoHistorial,name='carritoCli'),
    path('logout/', views.logOutCli,name='logOutCli'),
    path('carrito/upload/', views.uploadCarrito,name='uploadCarritoCli'),
    path('get/carrito/data', views.jsonObjCarrito,name='getCarritoCli'),
    path('get/juego/data', views.jsonObjGame,name='getJuegoCli'),
]
