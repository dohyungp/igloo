from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class ExperimentStatus(models.Model):
    """Experiment Status List (e.g. Waiting, Preparing, Running, Stopped etc)
    """
    name = models.CharField(max_length=15)
    description = models.TextField(max_length=250, null=True)
    tag_color = models.CharField(max_length=35, null=True)

    class Meta:
        ordering = ['pk']
        verbose_name_plural = 'Experiment statuses'

    def __str__(self):
        return str(self.name)


# class Category(models.Model):
#     pass


class Experiment(models.Model):
    """A/B Test Experiment idea
    """
    code = models.CharField(
        max_length=20, help_text='Enter Experiment code(e.g. EX123b)', unique=True)
    title = models.CharField(
        max_length=200, help_text='Enter Experiment full title(e.g. Full funnel test)')
    description = models.TextField(
        max_length=2000, help_text='Enter Experiment short description', null=True)
    status = models.ForeignKey(
        ExperimentStatus, on_delete=models.SET_NULL, null=True)
    impact = models.PositiveSmallIntegerField(null=True, validators=[
        MinValueValidator(0), MaxValueValidator(10)])
    confidence = models.PositiveSmallIntegerField(
        null=True, validators=[MinValueValidator(0), MaxValueValidator(10)])
    ease = models.PositiveSmallIntegerField(null=True, validators=[
        MinValueValidator(0), MaxValueValidator(10)])
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['created_at', 'updated_at', 'impact', 'confidence', 'ease']

    def __str__(self):
        return f'{self.code} {self.title}'


class ExperimentSchedule(models.Model):
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True)
    estimate_days = models.IntegerField(
        help_text='Planned experiment duration(days)', default=0)

    class Meta:
        ordering = ['-pk', '-start_date', '-end_date']

    def __str__(self):
        return f'Schedule of {self.experiment}'
