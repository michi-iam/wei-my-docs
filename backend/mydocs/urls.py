from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import apiviews

#DocsGetData
urlpatterns = [
    path('get_all_tags/', apiviews.DocsGetData.get_all_tags),
    path('get_entries_by_tags/', apiviews.DocsGetData.get_entries_by_tags),
]

#DocsEntry
urlpatterns += [
    path('add_new_entry/', apiviews.DocsEntry.add_new_entry),
    path('update_entry/', apiviews.DocsEntry.update_entry),
]

#Tags 
urlpatterns += [
    path('add_new_tag/', apiviews.DocsEntry.add_new_tag),
    path('add_or_remove_tag/', apiviews.DocsEntry.add_or_remove_tag),

]

#Datafiels
urlpatterns += [
    path('delete_datafield/', apiviews.DocsEntry.delete_datafield),

]

urlpatterns = format_suffix_patterns(urlpatterns)