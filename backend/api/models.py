from django.db import models

# Create your models here.
class User(models.Model):   
    
    name = models.CharField(max_length=100)
    rollno = models.PositiveIntegerField(max_length=9)
    department = models.CharField(max_length=50)
