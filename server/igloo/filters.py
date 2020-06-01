from django.db.models import Q
from django.utils import timezone

import django_filters

from django_filters.rest_framework import FilterSet
from igloo.models import Experiment, ExperimentSchedule


class ExperimentFilter(FilterSet):
    code = django_filters.CharFilter(
        field_name='code', lookup_expr='icontains')
    status_name = django_filters.CharFilter(
        field_name='status__name', lookup_expr='icontains')
    is_prioritized = django_filters.BooleanFilter(
        method='scored_ice_list_filter', label='Is prioritized')

    class Meta:
        model = Experiment
        fields = ['code', 'status', 'status_name', 'is_prioritized']

    def scored_ice_list_filter(self, queryset, name, value):
        """Filter ICE scoring is completed or not
        """
        return queryset.filter(~Q(impact__isnull=value) &
                               ~Q(confidence__isnull=value) &
                               ~Q(ease__isnull=value))


class ExperimentScheduleFilter(FilterSet):
    start_date = django_filters.DateFromToRangeFilter()
    end_date = django_filters.DateFromToRangeFilter()
    progressing = django_filters.BooleanFilter(
        method='progressing_experiment_filter', label='Progressing')

    class Meta:
        model = ExperimentSchedule
        fields = ['start_date', 'end_date', 'progressing']

    def progressing_experiment_filter(self, queryset, name, value):
        cond = Q(start_date__lte=timezone.now()) & (
            Q(end_date__gte=timezone.now()) | Q(end_date__isnull=True))
        if value:
            result = queryset.filter(cond)
        else:
            result = queryset.exclude(cond)
        return result
