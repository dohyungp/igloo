from django.db.models import Q

import django_filters
from django_filters.rest_framework import FilterSet
from igloo.models import Experiment


class ExperimentFilter(FilterSet):
    code = django_filters.CharFilter(
        field_name='code', lookup_expr='icontains')
    status_name = django_filters.CharFilter(
        field_name='status__name', lookup_expr='icontains')
    is_prioritized = django_filters.BooleanFilter(
        method='scored_ice_list_filter')

    class Meta:
        model = Experiment
        fields = ['code', 'status', 'status_name', 'is_prioritized']

    def scored_ice_list_filter(self, queryset, name, value):
        """Filter ICE scoring is completed or not
        """
        return queryset.filter(~Q(impact__isnull=value) &
                               ~Q(confidence__isnull=value) &
                               ~Q(ease__isnull=value))
