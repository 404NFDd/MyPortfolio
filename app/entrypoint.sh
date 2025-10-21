#!/usr/bin/env bash
set -euo pipefail

# Install dependencies if Django not importable (e.g. volume replaced after build)
REQ_FILE="/workspace/requirements.txt"
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
cd /workspace/app || { echo "[entrypoint] ERROR: /workspace/app not found" >&2; exit 1; }
python manage.py migrate --noinput || echo "[entrypoint] Migrate failed (may be initial build)."

exec "$@"
