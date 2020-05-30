from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from igloo import views

urlpatterns = [
    path('experiments/', views.ExperimentList.as_view()),
    path('experiments/<int:pk>/', views.ExperimentDetail.as_view(),
         name='experiment-detail'),
    path('experiment_statuses/', views.ExperimentStatusList.as_view()),
    path('experiment_statuses/<int:pk>/', views.ExperimentStatusDetail.as_view(),
         name='experimentstatus-detail'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
