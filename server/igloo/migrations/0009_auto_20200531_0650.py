# Generated by Django 3.0.6 on 2020-05-31 06:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('igloo', '0008_auto_20200531_0237'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='experimentschedule',
            options={'ordering': ['-pk', '-start_date', '-end_date']},
        ),
        migrations.RenameField(
            model_name='experimentschedule',
            old_name='experiment_id',
            new_name='experiment',
        ),
    ]
