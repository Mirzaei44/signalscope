from django.urls import path
from .views import TrendingTopicsView,TopicDetailView,AnalyticsSummaryView


urlpatterns = [
    path("topics/", TrendingTopicsView.as_view()),
    path("topics/<str:name>/", TopicDetailView.as_view()),
    path("analytics/summary/", AnalyticsSummaryView.as_view()),
]