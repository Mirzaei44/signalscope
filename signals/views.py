from django.core.cache import cache
from rest_framework import generics
from rest_framework.response import Response
from news.models import Article
from .models import Topic
from .serializers import TopicSerializer, TopicDetailSerializer


class TrendingTopicsView(generics.ListAPIView):
    queryset = Topic.objects.all().order_by("-trend_score", "-article_count")
    serializer_class = TopicSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        cache_key = f"trending_topics_page_{request.query_params.get('page', 1)}"
        cached_data = cache.get(cache_key)

        if cached_data:
            return Response(cached_data)

        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=300)
        return response


class TopicDetailView(generics.RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicDetailSerializer
    lookup_field = "name"

    def get(self, request, *args, **kwargs):
        topic_name = kwargs["name"]
        cache_key = f"topic_detail_{topic_name}"
        cached_data = cache.get(cache_key)

        if cached_data:
            return Response(cached_data)

        topic = self.get_object()
        data = self.get_serializer(topic).data

        cache.set(cache_key, data, timeout=300)
        return Response(data)
    
class AnalyticsSummaryView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        cache_key = "analytics_summary"
        cached_data = cache.get(cache_key)

        if cached_data:
            return Response(cached_data)

        data = {
            "total_topics": Topic.objects.count(),
            "total_articles": Article.objects.count(),
            "top_topics": TopicSerializer(
                Topic.objects.all().order_by("-trend_score", "-article_count")[:5],
                many=True
            ).data,
        }

        cache.set(cache_key, data, timeout=300)
        return Response(data)