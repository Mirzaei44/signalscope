from rest_framework import generics, permissions
from .models import Alert
from .serializers import AlertSerializer


class AlertListView(generics.ListAPIView):
    serializer_class = AlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Alert.objects.filter(user=self.request.user).select_related("topic").order_by("-created_at")


class AlertMarkReadView(generics.UpdateAPIView):
    serializer_class = AlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Alert.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(is_read=True)