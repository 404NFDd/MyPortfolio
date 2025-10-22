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
# Copy root requirements (build layer) and duplicate into /workspace for dev commands
COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt \
    && mkdir -p /workspace \
    && cp /tmp/requirements.txt /workspace/requirements.txt

COPY ./app /workspace/app

# Entrypoint script
COPY app/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["bash", "-lc", "gunicorn config.wsgi:application --chdir /workspace/app --bind 0.0.0.0:8000 config.wsgi:application"]
