#!/usr/bin/env bash
set -euo pipefail

# Install dependencies if Django not importable (e.g. volume replaced after build)
REQ_FILE="/app/requirements.txt"
FALLBACK_REQ="/tmp/requirements.txt"

if ! python - <<'PY'
try:
    import django  # noqa
except Exception:
    raise SystemExit(1)
PY
then
  echo "[entrypoint] Installing Python dependencies..."
  if [ -f "$REQ_FILE" ]; then
    pip install --no-cache-dir -r "$REQ_FILE"
  elif [ -f "$FALLBACK_REQ" ]; then
    pip install --no-cache-dir -r "$FALLBACK_REQ"
  else
    echo "[entrypoint] ERROR: requirements file not found at $REQ_FILE or $FALLBACK_REQ" >&2
  fi
fi

# Wait for DB (depends_on is ignored when Docker restarts containers, e.g. after DB crash recovery)
DB_WAIT_RETRIES="${DB_WAIT_RETRIES:-60}"
echo "[entrypoint] Waiting for database..."
for i in $(seq 1 "$DB_WAIT_RETRIES"); do
  if python - <<'PY' 2>/dev/null
import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()
from django.db import connection
connection.ensure_connection()
PY
  then
    echo "[entrypoint] Database is ready."
    break
  fi
  if [ "$i" -eq "$DB_WAIT_RETRIES" ]; then
    echo "[entrypoint] ERROR: database not ready after ${DB_WAIT_RETRIES} attempts" >&2
    exit 1
  fi
  sleep 2
done

# Apply migrations (optional safe guard)
python manage.py migrate --noinput || echo "[entrypoint] Migrate failed (may be initial build)."

# Load initial seed data into empty fields/tables only (see data/seed)
python manage.py seed || echo "[entrypoint] seed failed"

# Collect static files to ensure nginx can serve them (both debug and production)
echo "[entrypoint] Collecting static files..."
python manage.py collectstatic --noinput || echo "[entrypoint] collectstatic failed"

exec "$@"
