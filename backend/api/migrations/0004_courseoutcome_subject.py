# Generated by Django 5.0.5 on 2024-05-16 10:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_courseoutcome'),
    ]

    operations = [
        migrations.AddField(
            model_name='courseoutcome',
            name='subject',
            field=models.ForeignKey(default=2019, on_delete=django.db.models.deletion.CASCADE, related_name='co', to='api.subject'),
            preserve_default=False,
        ),
    ]
