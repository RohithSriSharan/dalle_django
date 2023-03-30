from django.urls import path
from . import views

#URL config module
urlpatterns = [
    path('', views.dalle_generation)
]