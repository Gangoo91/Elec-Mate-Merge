"""Configuration loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Supabase
    supabase_url: str = ""
    supabase_service_role_key: str = ""

    # Reed API (jobs + courses) — optional, scrapers replace API usage
    reed_api_key: str = ""

    # Adzuna API (jobs) — optional, scrapers replace API usage
    adzuna_app_id: str = ""
    adzuna_api_key: str = ""

    # RS Components API (products)
    rs_api_key: str = ""

    # ─── Outreach crawler credentials ────────────────────────────
    # Companies House — register free at developer.company-information.service.gov.uk
    companies_house_api_key: str = ""
    # Hunter.io — domain email discovery + verification
    hunter_io_api_key: str = ""
    # Google Maps Places API — already used elsewhere in the project
    google_maps_api_key: str = ""

    # Pipeline settings
    max_concurrent_browsers: int = 2
    batch_size: int = 50
    request_timeout: int = 30

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
