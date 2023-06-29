from django.urls import path
from . import views

urlpatterns = [
    path('perfil/', views.perfil,name='perfilCli'),
    path('logout/', views.logOutCli,name='logOutCli'),
]
