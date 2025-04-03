# from rest_framework import serializers
# from .models import User
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['name', 'roll_no', 'department','score']
        
# class Score(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['name', 'roll_no', 'department', 'score']
#         extra_kwargs = {
#             'name': {'required': False},
#             'roll_no': {'required': False},
#             'department': {'required': False},
#         }

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'roll_no', 'department', 'score']
        extra_kwargs = {
            'score': {'required': False, 'default': 0}  # Make score optional with default 0
        }

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['score']  # Only need score for update    