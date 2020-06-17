from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from igloo import views

urlpatterns = [
    path('', views.api_root),
    path('experiments/', views.ExperimentList.as_view(), name='experiment-list'),
    path('experiments/<int:pk>/', views.ExperimentDetail.as_view(),
         name='experiment-detail'),
    path('experiment_status/', views.ExperimentStatusList.as_view(),
         name='experiment-statuses'),
    path('experiment_status/<int:pk>/', views.ExperimentStatusDetail.as_view(),
         name='experimentstatus-detail'),
    path('experiment_schedules/', views.ExperimentScheduleList.as_view(),
         name='experiment-schedules'),
    path('experiment_schedules/<int:pk>/',
         views.ExperimentScheduleDetail.as_view(), name='experimentschedule-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
