from django.urls import path
from.import views


urlpatterns = [
    path('',views.home,name='home'),
    path('modeA/',views.modeA,name='modeA'),
    path('modeB/',views.modeB,name='modeB')
]