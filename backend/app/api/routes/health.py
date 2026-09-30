from fastapi import APIRouter
from datetime import datetime


router = APIRouter(
    prefix="/health",
    tags=["Health"]
)


@router.get("")
def health():

    return {
        "status": "healthy",
        "service": "weather-backend",
        "timestamp": datetime.utcnow()
    }