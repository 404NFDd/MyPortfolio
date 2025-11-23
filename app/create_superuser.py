#!/usr/bin/env python
"""
Django superuser 생성 스크립트
사용법: python create_superuser.py
또는 환경변수로 설정:
DJANGO_SUPERUSER_USERNAME=admin DJANGO_SUPERUSER_EMAIL=admin@example.com DJANGO_SUPERUSER_PASSWORD=yourpassword python create_superuser.py
"""
import os
import sys
import django

# Django 설정 로드
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# 환경변수에서 정보 가져오기
username = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
password = os.getenv('DJANGO_SUPERUSER_PASSWORD')

# 비밀번호가 없으면 명령줄 인자에서 가져오기
if not password:
    if len(sys.argv) > 1:
        password = sys.argv[1]
    else:
        print("오류: 비밀번호가 필요합니다.")
        print("사용법: python create_superuser.py <비밀번호>")
        print("또는: DJANGO_SUPERUSER_PASSWORD=<비밀번호> python create_superuser.py")
        sys.exit(1)

# 기존 사용자 확인
if User.objects.filter(username=username).exists():
    user = User.objects.get(username=username)
    user.set_password(password)
    user.is_superuser = True
    user.is_staff = True
    user.save()
    print(f"기존 사용자 '{username}'의 비밀번호가 변경되었습니다.")
else:
    # 새 사용자 생성
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"새로운 superuser '{username}'가 생성되었습니다.")

print(f"\nAdmin 페이지 접속 정보:")
print(f"URL: http://localhost:8080/admin/")
print(f"사용자명: {username}")
print(f"비밀번호: {password if password else '(입력하신 비밀번호)'}")

