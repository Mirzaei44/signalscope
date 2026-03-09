import re
from collections import Counter

STOPWORDS = {
    "the","a","an","and","is","to","of","for","on","in"
}


def extract_keywords(text):

    words = re.findall(r"\b[a-zA-Z]{4,}\b", text.lower())

    words = [w for w in words if w not in STOPWORDS]

    counts = Counter(words)

    return [w for w,_ in counts.most_common(3)]


from news.models import Article
from .models import Topic


def detect_topics():

    articles = Article.objects.filter(topics=None)

    for article in articles:

        keywords = extract_keywords(article.title)

        for word in keywords:

            topic, _ = Topic.objects.get_or_create(name=word)

            article.topics.add(topic)

            topic.article_count += 1
            topic.save()
            
            
from datetime import timedelta
from django.utils import timezone
from news.models import Article
from .models import Topic


def compute_trend_scores():
    now = timezone.now()
    last_day = now - timedelta(hours=24)

    topics = Topic.objects.all()

    for topic in topics:
        recent = Article.objects.filter(
            topics=topic,
            published_at__gte=last_day
        ).count()

        total = topic.article_count

        if total == 0:
            score = 0
        else:
            score = recent / total

        topic.trend_score = score
        topic.save()