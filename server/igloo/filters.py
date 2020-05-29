import django_filters
from django_filters.rest_framework import FilterSet
from igloo.models import Experiment


class ExperimentFilter(FilterSet):
    code = django_filters.CharFilter(
        field_name='code', lookup_expr='icontains')
    status_name = django_filters.CharFilter(
        field_name='status__name', lookup_expr='icontains')

    class Meta:
        model = Experiment
        fields = ['code', 'status', 'status_name']
