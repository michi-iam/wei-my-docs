from django.db import models


class Tag(models.Model):
    class Meta:
        ordering = ('name', )
    name = models.CharField(max_length=40)
    def __str__(self):
        return self.name


class Entry(models.Model):
    tag = models.ManyToManyField(Tag, blank=True)
    title = models.CharField(max_length=160, null=True, blank=True)
    desc = models.TextField(null=True, blank=True)
    data = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def setup():
    x = 1
    while x < 5:
        name = "Tag " + str(x)
        tag = Tag.objects.create(name=name)
        x+=1
    
    x=0
    while x < 20:
        title = "Entry-Titel " + str(x)
        entry = Entry.objects.create(title=title)
        y=0
        while y < 3:
            tag = Tag.objects.order_by('?')[0]
            entry.tag.add(tag)
            y+=1
        entry.save()
        x+=1