from rest_framework import serializers
from django.db.models import fields


from .models import Tag, Entry


class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ("id","name")

class EntrySerializer(serializers.HyperlinkedModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Entry
        fields = ("id", "tags", "title", "desc","data")