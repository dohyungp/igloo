from django.core.exceptions import ValidationError, EmptyResultSet
from rest_framework import serializers
from igloo.models import Experiment, ExperimentStatus, ExperimentSchedule


class ExperimentStatusSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='experimentstatus-detail', read_only=True)

    class Meta:
        model = ExperimentStatus
        fields = ['id', 'name', 'url']


class ExperimentSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='experiment-detail', read_only=True)
    description = serializers.CharField(write_only=True, required=False, style={
                                        'base_template': 'textarea.html'})

    class Meta:
        model = Experiment
        fields = ['id', 'code', 'title', 'status', 'url', 'impact',
                  'description', 'confidence', 'ease', 'created_at', 'updated_at']

    def to_representation(self, obj):
        if self.fields.get('status'):
            self.fields['status'] = ExperimentStatusSerializer()
        return super().to_representation(obj)


class ExperimentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiment
        fields = '__all__'

    def to_representation(self, obj):
        if self.fields.get('status'):
            self.fields['status'] = ExperimentStatusSerializer()
        return super().to_representation(obj)


class ExperimentTitleSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='experiment-detail', read_only=True)

    class Meta:
        model = Experiment
        fields = ['id', 'code', 'title', 'url']


class ExperimentScheduleSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='experimentschedule-detail', read_only=True)

    class Meta:
        model = ExperimentSchedule
        fields = '__all__'

    def to_representation(self, obj):
        if self.fields.get('experiment'):
            self.fields['experiment'] = ExperimentTitleSerializer()
        return super().to_representation(obj)
