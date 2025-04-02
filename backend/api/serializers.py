from rest_framework import serializers
from .models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'roll_no', 'department','score']
        
class Score(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'roll_no', 'department', 'score']
        extra_kwargs = {
            'name': {'required': False},
            'roll_no': {'required': False},
            'department': {'required': False},
        }