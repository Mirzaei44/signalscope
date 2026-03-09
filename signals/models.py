from django.db import models


class Topic(models.Model):

    name = models.CharField(max_length=200, unique=True)

    trend_score = models.FloatField(default=0)

    article_count = models.IntegerField(default=0)

    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name