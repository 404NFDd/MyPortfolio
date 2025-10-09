from django.urls import path
from .views import index, ProfileApiView

urlpatterns = [
    path("", index, name="index"),
    path("api/profile/", ProfileApiView.as_view(), name="api_profile"),  # 프로필 API 엔드포인트
]
