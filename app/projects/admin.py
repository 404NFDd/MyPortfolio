from django.contrib import admin
from django.utils.html import format_html
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "thumb_preview", "created_at")
    search_fields = ("title", "description", "tags")
    list_filter = ("created_at",)
    def thumb_preview(self, obj):
        url = obj.thumbnail.url if obj.thumbnail else ""
        if url:
            return format_html('<img src="{}" style="height:40px;border-radius:6px;" />', url)
        return "-"
    thumb_preview.short_description = "Preview"
