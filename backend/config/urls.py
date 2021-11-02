from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


from django.contrib import admin
from django.urls import path, include


from mydocs.viewsets import TagViewSet, EntryViewSet






router = routers.DefaultRouter()
router.register(r'tags', TagViewSet)
router.register(r'entries', EntryViewSet)


urlpatterns = [
    path("", include("mydocs.urls")),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]