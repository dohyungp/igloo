# Generated by Django 3.0.6 on 2020-05-31 02:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('igloo', '0007_schedule'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Schedule',
            new_name='ExperimentSchedule',
        ),
    ]
