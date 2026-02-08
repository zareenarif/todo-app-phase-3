#!/bin/bash
echo "PORT env var is: $PORT"
echo "Running Alembic migrations..."
alembic upgrade head || echo "Migration skipped"
ACTUAL_PORT="${PORT:-8000}"
echo "Starting uvicorn on port $ACTUAL_PORT..."
exec uvicorn src.main:app --host 0.0.0.0 --port "$ACTUAL_PORT"
