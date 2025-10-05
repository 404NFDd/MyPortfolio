# Myportfolio (Django + Postgres + nginx + Redis)

## Stack
- web: python:3.12-slim (Django, gunicorn)
- db: postgres:16
- cache/queue: redis:alpine
- reverse proxy: nginx:alpine

## Why
- 재현 가능한 개발/배포 환경, 서비스 분리, 최소 이미지(slim/alpine)로 경량화.

## Next Steps
1) 컨테이너 내부에서 Django 프로젝트 생성
2) Postgres 연결 및 마이그레이션
3) 정적/미디어 수집 + nginx 경로 연결
