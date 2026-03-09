import feedparser
from datetime import datetime
from django.utils import timezone
from news.models import Article, Source


def fetch_rss(source_id):
    source = Source.objects.get(id=source_id)
    feed = feedparser.parse(source.url)

    for entry in feed.entries:
        url = entry.get("link")

        if Article.objects.filter(url=url).exists():
            continue

        title = entry.get("title", "")
        published = entry.get("published_parsed")

        if published:
            published = datetime(*published[:6])
            published = timezone.make_aware(published, timezone.get_current_timezone())
        else:
            published = timezone.now()

        image_url = ""

        media_content = entry.get("media_content")
        media_thumbnail = entry.get("media_thumbnail")

        if media_content and len(media_content) > 0:
            image_url = media_content[0].get("url", "")
        elif media_thumbnail and len(media_thumbnail) > 0:
            image_url = media_thumbnail[0].get("url", "")

        Article.objects.create(
            source=source,
            title=title,
            url=url,
            published_at=published,
            image_url=image_url,
        )