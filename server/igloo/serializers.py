from rest_framework import serializers
from igloo.models import Experiment


class ExperimentSerializer(serializers.ModelSerializer):
    status = serializers.StringRelatedField()

    class Meta:
        model = Experiment
        fields = ['id', 'code', 'title', 'description', 'status',
                  'impact', 'confidence', 'ease', 'created_at', 'updated_at']
