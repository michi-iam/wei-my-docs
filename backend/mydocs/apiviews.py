from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



from . models import Tag, Entry
from . serializers import TagSerializer, EntrySerializer



@api_view(['GET'])
def main_context(request):
    entries = Entry.objects.all()
    entries = EntrySerializer(entries, context={"request": request}, many=True).data
    tags = Tag.objects.all()
    tags = TagSerializer(tags, context={"request": request}, many=True).data
    
    return Response({
        "allEntries": entries,
        "allTags": tags,
        })


# frontend: select tags -> all entries with those tags
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_entries_by_tags(request):
    print(request)
    selectedTags = request.data["selectedTags"]
    entries = Entry.objects.all()
    for tag in selectedTags:
        entries = entries.filter(tag=tag["id"])
    if len(entries) == 0:
        entriesToShow = [{"title":"nichts gefunden"}]
    else:
        entriesToShow = EntrySerializer(entries, context={"request": request}, many=True).data
    return Response({"entriesToShow":entriesToShow})
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_entry(request):
    print(request.data)
   
    entry = Entry.objects.get(pk=request.data["id"])
    entry.title = request.data["title"]
    entry.desc = request.data["desc"]
    entry.data = request.data["data"]
    
    entry.save()
    
    return Response({"entry": EntrySerializer(entry).data})


def entries_detail(request):
    pass