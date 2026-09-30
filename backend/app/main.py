from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.connection import engine

from app.models.report import Report
from app.database.base import Base

from app.api.routes import (
    reports,
    analytics,
    health
)


Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "Backend API for the National Weather "
        "Intelligence Platform"
    )
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    health.router
)

app.include_router(
    reports.router
)

app.include_router(
    analytics.router
)


@app.get("/")
def root():

    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running"
    }