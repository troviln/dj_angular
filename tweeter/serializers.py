from rest_framework import serializers
from django.contrib.auth.models import User

from tweeter.models import Tweet


class TweetSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Tweet
        fields = ('id', 'text', 'user', 'timestamp')


class UserSerializer(serializers.ModelSerializer):
    tweets = TweetSerializer(many=True, source="tweet_set")

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'last_login', 'tweets')
