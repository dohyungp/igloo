import django_filters
from django_filters.rest_framework import FilterSet
from igloo.models import Experiment


class ExperimentFilter(FilterSet):

    class Meta:
        model = Experiment
        fields = ['code', 'status']
