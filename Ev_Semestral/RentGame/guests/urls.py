from django.urls import path
from . import views

urlpatterns = [
    path('index', views.index,name='index'),
    path('login', views.login,name='login'),
    path('register', views.register,name='register'),
    path('playStation', views.playStation,name='playStation'),
    path('xbox', views.xbox,name='xbox'),
    path('nintendo', views.nintendo,name='nintendo'),
]
