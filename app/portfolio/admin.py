from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "updated_at")

    def has_add_permission(self, request):
        # 싱글톤 모델이므로 오직 하나의 인스턴스만 허용
        return not Profile.objects.exists()
