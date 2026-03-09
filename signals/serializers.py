from rest_framework import serializers
from .models import Topic
from news.models import Article


class ArticleMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "url", "published_at", "image_url"]


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"


class TopicDetailSerializer(serializers.ModelSerializer):
    articles = serializers.SerializerMethodField()

    class Meta:
        model = Topic
        fields = [
            "id",
            "name",
            "trend_score",
            "article_count",
            "last_updated",
            "articles",
        ]

    def get_articles(self, obj):
        articles = Article.objects.filter(topics=obj).order_by("-published_at")[:10]
        return ArticleMiniSerializer(articles, many=True).data