from django.urls import path
from .views import RegisterView, SavedTopicListCreateView, SavedTopicDeleteView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("saved-topics/", SavedTopicListCreateView.as_view()),
    path("saved-topics/<int:pk>/", SavedTopicDeleteView.as_view()),
]