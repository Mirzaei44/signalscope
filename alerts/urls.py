from django.urls import path
from .views import AlertListView, AlertMarkReadView

urlpatterns = [
    path("", AlertListView.as_view()),
    path("<int:pk>/read/", AlertMarkReadView.as_view()),
]