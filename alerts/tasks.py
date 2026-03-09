from celery import shared_task
from accounts.models import SavedTopic
from .models import Alert


@shared_task
def generate_topic_alerts():
    saved_topics = SavedTopic.objects.select_related("user", "topic").all()

    for saved in saved_topics:
        topic = saved.topic

        if topic.trend_score >= 0.5:
            exists = Alert.objects.filter(
                user=saved.user,
                topic=topic,
                is_read=False
            ).exists()

            if not exists:
                Alert.objects.create(
                    user=saved.user,
                    topic=topic,
                    message=f"{topic.name} is trending now."
                )