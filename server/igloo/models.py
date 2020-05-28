from django.db import models


class ExperimentStatus(models.Model):
    """Experiment Status List (e.g. Waiting, Preparing, Running, Stopped etc)
    """
    status = models.CharField(max_length=15)

    class Meta:
        verbose_name_plural = 'Experiment statuses'

    def __str__(self):
        return self.status


# class Category(models.Model):
#     pass


# class Schedule(models.Model):
#     pass


class Experiment(models.Model):
    """A/B Test Experiment idea
    """
    objects = models.Manager()
    code = models.CharField(
        max_length=20, help_text='Enter Experiment code(e.g. EX123b)', unique=True)
    title = models.CharField(
        max_length=200, help_text='Enter Experiment full title(e.g. Full funnel test)')
    description = models.TextField(
        max_length=1000, help_text='Enter Experiment short description', null=True)
    status = models.ForeignKey(
        ExperimentStatus, on_delete=models.SET_NULL, null=True)
    impact = models.IntegerField(null=True)
    confidence = models.IntegerField(null=True)
    ease = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['created_at', 'updated_at', 'impact', 'confidence', 'ease']

    def __str__(self):
        return f'{self.code} {self.title}'
