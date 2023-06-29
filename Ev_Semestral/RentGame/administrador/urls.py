from django.urls import path
from . import views

urlpatterns = [
    path('Add/Juegos', views.gameAdd,name='gameAddAdm'),
    path('Editar/Juegos', views.gameEdit,name='gameEditAdm'),
    path('Editar/DML', views.dml_U_D_Juego,name='dml_UD_JuegoAdm'),
    path('Verificar', views.verificar_entidad,name='verifEntiAdm'),
]
