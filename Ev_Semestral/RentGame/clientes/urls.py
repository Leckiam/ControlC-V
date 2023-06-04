from django.urls import path
from . import views

urlpatterns = [
    path('index/<str:pk>', views.index,name='indexCli'),
    path('perfil/<str:pk>', views.perfil,name='perfilCli'),
    path('playStation/<str:pk>', views.playStation,name='playStationCli'),
    path('xbox/<str:pk>', views.xbox,name='xboxCli'),
    path('nintendo/<str:pk>', views.nintendo,name='nintendoCli'),
]
