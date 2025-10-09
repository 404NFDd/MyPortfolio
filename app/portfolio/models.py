from django.db import models
class Profile(models.Model):
    """사이트 주인의 기본 프로필 (싱글톤)"""
    name = models.CharField(max_length=100, default="Minseok Kim")
    email = models.EmailField(blank=True)
    headline = models.CharField(max_length=200, blank=True)  # 한 줄 소개
    bio = models.TextField(blank=True)                       # 자기소개 문단
    tech_stack = models.JSONField(default=list, blank=True)  # 기술스택 리스트
    profile_image = models.ImageField(upload_to="profile/", blank=True, null=True)  # 프로필 이미지
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Site Owner Profile"

    class Meta:
        verbose_name = "Profile (Singleton)"
        verbose_name_plural = "Profile (Singleton)"