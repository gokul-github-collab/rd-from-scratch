# Generated by Django 5.0.6 on 2024-05-19 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_referencebook_name_alter_textbook_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='t_or_p',
            field=models.CharField(choices=[('Theory', 'Theory'), ('Practical', 'Practical')], default='Theory', max_length=50),
        ),
    ]
