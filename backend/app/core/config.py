from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "National Weather Intelligence Platform"
    APP_VERSION: str = "1.0.0"

    DATABASE_URL: str

    ALLOWED_ORIGINS: str = "http://localhost:5173"

    WEATHER_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()