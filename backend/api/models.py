from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=30)
    roll_no = models.CharField(max_length=9,unique=True)
    department = models.CharField(max_length=100)
    score = models.IntegerField(default=False)
