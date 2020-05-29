from django.core.exceptions import ValidationError, EmptyResultSet
from rest_framework import serializers
from igloo.models import Experiment, ExperimentStatus


class ExperimentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperimentStatus
        fields = ['id', 'status']


class ExperimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiment
        fields = ['id', 'code', 'title', 'description', 'status',
                  'impact', 'confidence', 'ease', 'created_at', 'updated_at']

    def to_representation(self, obj):
        if self.fields.get('status'):
            self.fields['status'] = ExperimentStatusSerializer()
        return super().to_representation(obj)
