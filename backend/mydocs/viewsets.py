from rest_framework import viewsets 


from . serializers import TagSerializer, EntrySerializer
from . models import Tag, Entry



class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer