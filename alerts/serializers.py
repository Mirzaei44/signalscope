from rest_framework import serializers
from .models import Alert


class AlertSerializer(serializers.ModelSerializer):
    topic_name = serializers.CharField(source="topic.name", read_only=True)

    class Meta:
        model = Alert
        fields = ["id", "topic", "topic_name", "message", "is_read", "created_at"]