from django.db import models


class Source(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Article(models.Model):
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    url = models.URLField(unique=True)

    content = models.TextField(blank=True)
    author = models.CharField(max_length=200, blank=True)

    published_at = models.DateTimeField()
    fetched_at = models.DateTimeField(auto_now_add=True)

    sentiment = models.FloatField(null=True, blank=True)
    image_url = models.URLField(blank=True)

    topics = models.ManyToManyField("signals.Topic", blank=True)

    def __str__(self):
        return self.title