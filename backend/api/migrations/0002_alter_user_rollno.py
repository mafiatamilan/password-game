# Generated by Django 5.1.7 on 2025-04-01 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='rollno',
            field=models.PositiveIntegerField(max_length=9),
        ),
    ]
