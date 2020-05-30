from django.contrib import admin
from igloo.models import Experiment, ExperimentStatus

admin.site.register(Experiment)
admin.site.register(ExperimentStatus)
