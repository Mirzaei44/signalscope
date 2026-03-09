from rest_framework import generics
from .models import User
from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
from rest_framework import generics, permissions
from .models import SavedTopic
from .serializers import SavedTopicSerializer


class SavedTopicListCreateView(generics.ListCreateAPIView):
    serializer_class = SavedTopicSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedTopic.objects.filter(user=self.request.user).select_related("topic")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SavedTopicDeleteView(generics.DestroyAPIView):
    serializer_class = SavedTopicSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedTopic.objects.filter(user=self.request.user)