from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer


class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all().order_by("-published_at")

        q = self.request.query_params.get("q")
        source = self.request.query_params.get("source")

        if q:
            queryset = queryset.filter(title__icontains=q)

        if source:
            queryset = queryset.filter(source__name__icontains=source)

        return queryset