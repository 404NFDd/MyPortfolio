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

# Apply migrations (optional safe guard)
python manage.py migrate --noinput || echo "[entrypoint] Migrate failed (may be initial build)."

# Collect static files in non-debug mode to ensure nginx can serve them.
if [ "${DJANGO_DEBUG:-0}" != "1" ]; then
  echo "[entrypoint] Collecting static files..."
  python manage.py collectstatic --noinput || echo "[entrypoint] collectstatic failed"
fi

exec "$@"
