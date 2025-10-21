FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VIRTUALENVS_CREATE=false

# Base tools + image processing libs (Pillow dependencies) + git for devcontainer
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl netcat-openbsd git \
    libjpeg62-turbo-dev zlib1g-dev libpng-dev libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace/app
# Copy root requirements for build layer; keep a copy at /workspace/requirements.txt
COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt && mkdir -p /workspace && cp /tmp/requirements.txt /workspace/requirements.txt

COPY ./app /workspace/app

# Add entrypoint script for dev/runtime convenience
COPY app/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Default command (can be overridden by docker-compose.override.yml for runserver)
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["bash", "-lc", "gunicorn config.wsgi:application --chdir /workspace/app --bind 0.0.0.0:8000 config.wsgi:application"]
