from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics
from rest_framework import filters

from django_filters.rest_framework import DjangoFilterBackend

from igloo.models import Experiment, ExperimentStatus, ExperimentSchedule
from igloo.serializers import ExperimentSerializer, ExperimentStatusSerializer, ExperimentDetailSerializer, ExperimentScheduleSerializer
from igloo.filters import ExperimentFilter, ExperimentScheduleFilter


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'experiments': reverse('experiment-list', request=request, format=format),
        'experiment_statuses': reverse('experiment-statuses', request=request, format=format),
        'experiment_schedules': reverse('experiment-schedules', request=request, format=format)
    })


class ExperimentList(generics.ListCreateAPIView):
    queryset = Experiment.objects.all()
    serializer_class = ExperimentSerializer
    filter_backends = [filters.OrderingFilter,
                       filters.SearchFilter,
                       DjangoFilterBackend]
    filterset_class = ExperimentFilter
    filterset_fields = ['code', 'status']
    search_fields = ['title']
    ordering_fields = ['impact', 'confidence',
                       'ease', 'created_at', 'updated_at']


class ExperimentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Experiment.objects.all()
    serializer_class = ExperimentDetailSerializer


class ExperimentStatusList(generics.ListCreateAPIView):
    queryset = ExperimentStatus.objects.all()
    serializer_class = ExperimentStatusSerializer


class ExperimentStatusDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExperimentStatus.objects.all()
    serializer_class = ExperimentStatusSerializer


class ExperimentScheduleList(generics.ListCreateAPIView):
    queryset = ExperimentSchedule.objects.all()
    serializer_class = ExperimentScheduleSerializer
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = ExperimentScheduleFilter
    filterset_fields = ['start_date', 'end_date', 'progressing']
    ordering_fields = ['start_date', 'end_date']


class ExperimentScheduleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExperimentSchedule.objects.all()
    serializer_class = ExperimentScheduleSerializer
