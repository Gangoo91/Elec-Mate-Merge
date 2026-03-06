"""Configuration loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Supabase
    supabase_url: str = ""
    supabase_service_role_key: str = ""

    # Reed API (jobs + courses)
    reed_api_key: str = ""

    # Adzuna API (jobs)
    adzuna_app_id: str = ""
    adzuna_api_key: str = ""

    # RS Components API (products)
    rs_api_key: str = ""

    # Pipeline settings
    max_concurrent_browsers: int = 2
    batch_size: int = 50
    request_timeout: int = 30

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
