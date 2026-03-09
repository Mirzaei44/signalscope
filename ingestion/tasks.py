from celery import shared_task
from .services import fetch_rss
from news.models import Source


@shared_task
def ingest_all_sources():

    sources = Source.objects.filter(active=True)

    for source in sources:
        fetch_rss(source.id)
        
from celery import shared_task
from .services import fetch_rss
from news.models import Source


@shared_task
def ingest_all_sources():

    sources = Source.objects.filter(active=True)

    for source in sources:
        fetch_rss(source.id)