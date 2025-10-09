from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer

def index(request):
    projects = [
        {"name": "MINIST 데모", "url_name": "project_minist:index"},
    ]
    return render(request, "portfolio/index.html", {"projects": projects})

class ProfileApiView(APIView):
    def get(self, request):
        # 싱글톤 보장: 없으면 기본 레코드 생성
        obj, _ = Profile.objects.get_or_create(pk=1)
        data = ProfileSerializer(obj, context={"request": request}).data
        return Response(data)