from django.core.cache import cache
from celery import shared_task
from .services import detect_topics, compute_trend_scores
from .models import Topic
from alerts.tasks import generate_topic_alerts


@shared_task
def run_topic_pipeline():
    detect_topics()
    compute_trend_scores()
    generate_topic_alerts.delay()

    cache.delete("analytics_summary")

    for page in range(1, 6):
        cache.delete(f"trending_topics_page_{page}")

    for topic_name in Topic.objects.values_list("name", flat=True):
        cache.delete(f"topic_detail_{topic_name}")