from django.urls import path
from igloo import views

urlpatterns = [
    path('experiments/', views.experiment_list),
]
