# Generated by Django 3.0.6 on 2020-05-29 14:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('igloo', '0004_auto_20200528_1237'),
    ]

    operations = [
        migrations.RenameField(
            model_name='experimentstatus',
            old_name='status',
            new_name='name',
        ),
    ]
