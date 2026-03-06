"""Adzuna Jobs API client.

Free API: https://developer.adzuna.com/
Auth: app_id + app_key query params.
"""

from __future__ import annotations

from typing import Any

import httpx
import structlog

from src.config import settings

log = structlog.get_logger()

BASE_URL = "https://api.adzuna.com/v1/api/jobs/gb/search"

KEYWORDS = [
    "electrician",
    "electrical engineer",
    "electrical technician",
    "EV installer",
    "fire alarm engineer",
    "solar installer",
    "maintenance electrician",
]

# Adzuna uses location area codes
REGIONS = {
    "London": "UK-London",
    "South East": "UK-South East England",
    "South West": "UK-South West England",
    "Midlands": "UK-West Midlands",
    "North West": "UK-North West England",
    "North East": "UK-North East England",
    "Scotland": "UK-Scotland",
    "Wales": "UK-Wales",
    "East Anglia": "UK-Eastern England",
    "Yorkshire": "UK-Yorkshire and The Humber",
}


async def fetch_jobs(
    results_per_page: int = 50,
    max_pages: int = 3,
) -> list[dict[str, Any]]:
    """Fetch jobs from Adzuna API across keywords and regions."""
    if not settings.adzuna_app_id or not settings.adzuna_api_key:
        log.warning("adzuna_api_keys_missing")
        return []

    all_jobs: list[dict] = []

    async with httpx.AsyncClient(timeout=30) as client:
        for keyword in KEYWORDS:
            for region_name, region_code in REGIONS.items():
                for page in range(1, max_pages + 1):
                    try:
                        resp = await client.get(
                            f"{BASE_URL}/{page}",
                            params={
                                "app_id": settings.adzuna_app_id,
                                "app_key": settings.adzuna_api_key,
                                "what": keyword,
                                "where": region_name,
                                "results_per_page": results_per_page,
                                "content-type": "application/json",
                            },
                        )
                        resp.raise_for_status()
                        data = resp.json()

                        results = data.get("results", [])
                        if not results:
                            break

                        for r in results:
                            salary_min = r.get("salary_min")
                            salary_max = r.get("salary_max")
                            all_jobs.append(
                                {
                                    "title": r.get("title", ""),
                                    "company": (r.get("company") or {}).get(
                                        "display_name"
                                    ),
                                    "location": (r.get("location") or {}).get(
                                        "display_name"
                                    ),
                                    "salary": _format_salary(salary_min, salary_max),
                                    "salary_min": salary_min,
                                    "salary_max": salary_max,
                                    "employment_type": r.get("contract_type"),
                                    "description": r.get("description"),
                                    "apply_url": r.get("redirect_url"),
                                    "date_posted": r.get("created"),
                                    "source": "adzuna",
                                    "external_id": r.get("id"),
                                    "region": region_name,
                                }
                            )

                        log.info(
                            "adzuna_jobs_fetched",
                            keyword=keyword,
                            region=region_name,
                            page=page,
                            count=len(results),
                        )
                    except httpx.HTTPError as e:
                        log.error(
                            "adzuna_jobs_error",
                            keyword=keyword,
                            region=region_name,
                            error=str(e),
                        )
                        break

    log.info("adzuna_jobs_total", count=len(all_jobs))
    return all_jobs


def _format_salary(min_sal: float | None, max_sal: float | None) -> str | None:
    if min_sal and max_sal:
        return f"£{min_sal:,.0f} - £{max_sal:,.0f}"
    if min_sal:
        return f"From £{min_sal:,.0f}"
    if max_sal:
        return f"Up to £{max_sal:,.0f}"
    return None
