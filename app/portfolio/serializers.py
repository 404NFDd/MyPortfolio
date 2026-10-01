from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    hero_background = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ["name", "email", "headline", "bio", "git_url", "linkedin_url",
                  "tech_stack", "profile_image", "hero_background", "updated_at"]

    def get_profile_image(self, obj):
        return obj.profile_image.url if obj.profile_image else None

    def get_hero_background(self, obj):
        return obj.hero_background.url if obj.hero_background else None