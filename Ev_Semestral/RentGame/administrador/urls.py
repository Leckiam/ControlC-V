from django.urls import path
from . import views

urlpatterns = [
    path('Add/Juegos', views.gameAdd,name='gameAddAdm'),
    path('Editar/Juegos', views.gameEdit,name='gameEditAdm'),
    path('Carritos', views.verCarrito,name='verCarritoAdm'),
    path('Delete/Carrito/<str:pk>', views.deleteCarrito,name='deleteCarritoAdm'),
    path('Editar/DML', views.dml_U_D_Juego,name='dml_UD_JuegoAdm'),
    path('Validar/GameConsola/data', views.llamarGameConsole,name='verifEntiAdm'),
    path('Validar/Games/data', views.llamarAllGames,name='verifGamesAdm'),
    path('get/carritos/all', views.jsonObjsCarritos,name='getCarritoAdm'),
]
