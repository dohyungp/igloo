# Generated by Django 3.0.6 on 2020-06-06 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('igloo', '0011_auto_20200531_1349'),
    ]

    operations = [
        migrations.AddField(
            model_name='experimentstatus',
            name='tag_color',
            field=models.CharField(max_length=35, null=True),
        ),
    ]
