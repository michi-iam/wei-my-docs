from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from . models import Tag, Entry
from . serializers import TagSerializer, EntrySerializer


class BaseContext():
    tags = Tag.objects.all()
    entries = Entry.objects.all()
    keys = { # all keys returned to frontend
        "allEntries": "allEntries",
        "allTags": "allTags",
        "entriesToShow": "entriesToShow", # entries to show (by tag)
        "entry":"entry", # single entry
    }
    msg = {
        "noEntryFound": "nichts gefunden", # no entry for tag(s) found
    }



class DocsGetData(BaseContext):

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def get_all_tags(request):
        self = DocsGetData()
        tags = TagSerializer(self.tags, context={"request": request}, many=True).data
        return Response({
            self.keys["allTags"]: tags,
            })


    """ 
    get_entries_by_tags
    select tags -> return all entries with those tags
    """
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def get_entries_by_tags(request):
        self = DocsGetData()
        selectedTags = request.data["selectedTags"]
        entries = self.entries
        for tag in selectedTags:
            entries = entries.filter(tag=tag["id"])
        if not entries:
            entriesToShow = [{"title":self.msg["noEntryFound"]}] # nothing found -> error in title
        else:
            entriesToShow = EntrySerializer(entries, context={"request": request}, many=True).data
        return Response({self.keys["entriesToShow"]:entriesToShow})
    


class DocsEntry(BaseContext):

    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def add_new_tag(request): # tag doesnt exist yet 
        self = DocsEntry()
        name = request.data["name"]
        tag = Tag.objects.create(name=name)
        tags = Tag.objects.all()
        tags = TagSerializer(tags, context={"request": request}, many=True).data
        return Response({ self.keys["allTags"]: tags })


    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def add_new_entry(request):
        self=DocsEntry()
        entry = Entry();
        tags = request.data["tags"]
        entry.title = request.data["title"]
        entry.desc = request.data["desc"]
        entry.save()
        for i in tags:
            tag = Tag.objects.get(pk=i)
            entry.tag.add(tag)
        entry.save()
        return Response({self.keys["entry"]: EntrySerializer(entry).data })


    # edit existing entry 
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def update_entry(request):
        self = DocsEntry()
        entry = Entry.objects.get(pk=request.data["id"])
        entry.title = request.data["title"]
        entry.desc = request.data["desc"]
        entry.data = request.data["data"]
        entry.save()
        return Response({self.keys["entry"]: EntrySerializer(entry).data})


    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def delete_datafield(request):
        entryId = request.data["id"]
        keyName = request.data["keyName"]
        if keyName:
            entry = Entry.objects.get(pk=entryId)
            entry.data.pop(keyName)
            entry.save()
        return Response(200)
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def add_or_remove_tag(request):
        print(request.data)
        entry = Entry.objects.get(pk=request.data["entryId"])
        tag = Tag.objects.get(pk=request.data["tagId"])
        removeFrom = request.data["removeFrom"]
        print(entry.tag.all())
        if removeFrom == 1:
            entry.tag.remove(tag)
        else:
            entry.tag.add(tag)
        entry.save()
        print(entry.tag.all())
        return Response({"entry": EntrySerializer(entry).data})

