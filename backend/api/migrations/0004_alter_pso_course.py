# Generated by Django 5.0.5 on 2024-05-13 05:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_po_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pso',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='psos', to='api.course'),
        ),
    ]
