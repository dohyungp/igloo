from django.contrib import admin
from igloo.models import Experiment, ExperimentStatus, ExperimentSchedule

admin.site.register(Experiment)
admin.site.register(ExperimentStatus)
admin.site.register(ExperimentSchedule)
