from django.contrib import admin


from .models import Entry, Tag



class EntryAdmin(admin.ModelAdmin):
    list_display = ( 'title', 'desc', 'data')
    readonly_fields = ('created_at', 'updated_at')
    search_fields = ['tag__name']
admin.site.register(Tag)
admin.site.register(Entry, EntryAdmin)