# Generated by Django 5.0.6 on 2024-05-21 03:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_rename_co_mappping_labcomponent_co_mapping'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='courseobjectives',
            name='sno',
        ),
    ]
