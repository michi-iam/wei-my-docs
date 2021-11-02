from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import apiviews

urlpatterns = [
    path('main_context/', apiviews.main_context),
    path('get_entries_by_tags/', apiviews.get_entries_by_tags),
    path('entries/<int:pk>', apiviews.entries_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)