FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VIRTUALENVS_CREATE=false

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /app

# 헬스체크용 간단 스크립트(나중에 교체 가능)
CMD ["bash", "-lc", "gunicorn config.wsgi:application --bind 0.0.0.0:8000"]
