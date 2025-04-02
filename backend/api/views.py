
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import User


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Create your views here.
class UserDetail(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateScore(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'roll_no'
    def perform_update(self, serializer):
        user = self.get_object()
        user.score += 100
        user.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
