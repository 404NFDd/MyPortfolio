from rest_framework import serializers
"""
ProjectSerializer 클래스는 Project 모델 인스턴스를 직렬화 하는 데 사용함
칼럼: id, title, description, tags, github_url, live_url, thumbnail, created_at, updated_at.
"""
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "title", "description", "tags",
            "github_url", "live_url", "thumbnail",
            "created_at", "updated_at",
        ]
    # thumbnail 칼럼에 대해 커스텀 메서드 필드 정의
    # 파일이 있으면 상대경로(/media/...) 반환, 없으면 None
    def get_thumbnail(self, obj):
        return obj.thumbnail.url if obj.thumbnail else None