"""
API v1 router - combines all v1 API routers.
"""
import logging
from fastapi import APIRouter
from src.api.v1.tasks import router as tasks_router
from src.api.v1.auth import router as auth_router
from src.api.v1.agents import router as agents_router

logger = logging.getLogger(__name__)

# Create main API v1 router
api_router = APIRouter()

# Include all sub-routers
api_router.include_router(auth_router)
api_router.include_router(tasks_router)
api_router.include_router(agents_router)

try:
    from src.api.v1.chat import router as chat_router
    api_router.include_router(chat_router)
    logger.info("Chat router loaded successfully")
except Exception as e:
    logger.warning(f"Chat router failed to load: {e}")
