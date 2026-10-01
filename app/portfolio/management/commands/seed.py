"""
초기 시드 데이터 적재 (data/seed → 컨테이너 /seed)
- Profile: 비어 있는 필드만 채운다. admin에서 수정한 값은 덮어쓰지 않는다.
- Project: 테이블이 비어 있을 때만 추가한다.
- --force: 시드 내용으로 Profile을 덮어쓰고 Project를 모두 교체한다.
사용법: python manage.py seed [--force]
"""
import json
import os
from pathlib import Path

from django.core.files import File
from django.core.files.storage import default_storage
from django.core.management.base import BaseCommand

from portfolio.models import Profile
from projects.models import Project

IMAGE_FIELDS = ("profile_image", "hero_background")


class Command(BaseCommand):
    help = "data/seed의 초기 데이터를 비어 있는 항목에만 넣는다."

    def add_arguments(self, parser):
        parser.add_argument("--force", action="store_true", help="기존 데이터를 시드 내용으로 덮어쓴다.")

    def handle(self, *args, **options):
        self.seed_dir = Path(os.getenv("SEED_DIR", "/seed"))
        self.force = options["force"]
        if not self.seed_dir.is_dir():
            self.stdout.write(f"[seed] {self.seed_dir} 없음, 건너뜀")
            return
        self.seed_profile()
        self.seed_projects()

    def save_image(self, field_file, rel_path):
        if field_file:
            field_file.delete(save=False)
        with open(self.seed_dir / rel_path, "rb") as f:
            field_file.save(Path(rel_path).name, File(f), save=False)

    def store_icon(self, rel_path):
        """기술스택 아이콘을 media/tech/에 복사하고 URL을 반환한다."""
        name = f"tech/{Path(rel_path).name}"
        if default_storage.exists(name):
            default_storage.delete(name)
        with open(self.seed_dir / rel_path, "rb") as f:
            default_storage.save(name, File(f))
        return default_storage.url(name)

    def seed_profile(self):
        path = self.seed_dir / "profile.json"
        if not path.exists():
            return
        data = json.loads(path.read_text(encoding="utf-8"))
        profile, _ = Profile.objects.get_or_create(pk=1)
        filled = []
        for field, value in data.items():
            if getattr(profile, field) and not self.force:
                continue
            if field in IMAGE_FIELDS:
                self.save_image(getattr(profile, field), value)
            elif field == "tech_stack":
                value = [
                    {**item, "icon": self.store_icon(item["icon"])} if item.get("icon") else item
                    for item in value
                ]
                setattr(profile, field, value)
            else:
                setattr(profile, field, value)
            filled.append(field)
        if filled:
            profile.save()
        self.stdout.write(f"[seed] Profile: {', '.join(filled) or '변경 없음'}")

    def seed_projects(self):
        path = self.seed_dir / "projects.json"
        if not path.exists() or (Project.objects.exists() and not self.force):
            self.stdout.write("[seed] Project: 변경 없음")
            return
        for project in Project.objects.all():
            if project.thumbnail:
                project.thumbnail.delete(save=False)
            project.delete()
        items = json.loads(path.read_text(encoding="utf-8"))
        # ordering이 -created_at이므로, 파일 순서대로 보이도록 역순으로 생성
        for item in reversed(items):
            thumbnail = item.pop("thumbnail", None)
            project = Project(**item)
            if thumbnail:
                self.save_image(project.thumbnail, thumbnail)
            project.save()
        self.stdout.write(f"[seed] Project: {len(items)}건 추가")
