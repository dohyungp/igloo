from django.core.exceptions import ValidationError, EmptyResultSet
from rest_framework import serializers
from igloo.models import Experiment, ExperimentStatus


class ExperimentStatusSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='experimentstatus-detail')

    class Meta:
        model = ExperimentStatus
        fields = ['id', 'name', 'url']


class ExperimentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='experiment-detail')

    class Meta:
        model = Experiment
        fields = ['id', 'code', 'title', 'status', 'url', 'impact',
                  'confidence', 'ease', 'created_at', 'updated_at']

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
