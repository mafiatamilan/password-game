# Generated by Django 5.1.7 on 2025-04-02 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_user_rollno'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='rollno',
        ),
        migrations.AddField(
            model_name='user',
            name='roll_no',
            field=models.CharField(default=None, max_length=9, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='score',
            field=models.IntegerField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(max_length=30),
        ),
    ]
