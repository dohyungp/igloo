from django.contrib import admin
from .models import Experiment, ExperimentStatus

admin.site.register(Experiment)
admin.site.register(ExperimentStatus)
