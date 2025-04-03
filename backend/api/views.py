
# from rest_framework import generics
# from .serializers import UserSerializer,Score
# from rest_framework.response import Response
# from rest_framework import status
# from .models import User


# class UserList(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserDetail(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class UpdateScore(generics.RetrieveUpdateAPIView):
#     queryset = User.objects.all()
#     serializer_class = Score
#     lookup_field = 'roll_no'
#     def perform_update(self, serializer):
#         user = self.get_object()
#         user.score += 100
#         user.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer, ScoreSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UserDetail(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class UpdateScore(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ScoreSerializer  # Use the simpler serializer
    lookup_field = 'roll_no'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.score += 100
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)