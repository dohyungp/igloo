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


class ExperimentDetail(APIView):

    def get_object(self, pk):
        try:
            return Experiment.objects.get(pk=pk)
        except Experiment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        experiment = self.get_object(pk)
        serializer = ExperimentSerializer(experiment)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        experiment = self.get_object(pk)
        serializer = ExperimentSerializer(experiment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        experiment = self.get_object(pk)
        serializer = ExperimentSerializer(
            experiment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        experiment = self.get_object(pk)
        experiment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
