from django.http import Http404

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters

from django_filters.rest_framework import DjangoFilterBackend

from igloo.models import Experiment
from igloo.serializers import ExperimentSerializer
from igloo.filters import ExperimentFilter


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
    serializer_class = ExperimentSerializer
