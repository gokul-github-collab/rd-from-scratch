# Generated by Django 5.0.6 on 2024-05-21 09:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_alter_courseoutcome_uap'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='tuition_fee',
        ),
    ]