from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ["name", "email", "headline", "bio", "git_url", "linkedin_url",
                  "tech_stack", "profile_image", "updated_at"]

    def get_profile_image(self, obj):
        return obj.profile_image.url if obj.profile_image else None