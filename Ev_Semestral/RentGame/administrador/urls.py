from django.urls import path
from . import views

urlpatterns = [
    path('ListaJuegos', views.gameList,name='gameListAdm'),
]
