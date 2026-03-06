"""Reed.co.uk Jobs API client.

Free API: https://www.reed.co.uk/developers/jobseeker
Auth: Basic auth with API key as username, empty password.
"""

from __future__ import annotations

import base64
from typing import Any

import httpx
import structlog

from src.config import settings

log = structlog.get_logger()

BASE_URL = "https://www.reed.co.uk/api/1.0/search"

KEYWORDS = [
    "electrician",
    "electrical engineer",
    "electrical technician",
    "approved contractor",
    "domestic installer",
    "industrial electrician",
    "commercial electrician",
    "EV installer",
    "solar installer",
    "fire alarm engineer",
    "emergency lighting",
    "maintenance electrician",
    "site electrician",
]

REGIONS = [
    "London",
    "South East England",
    "South West England",
    "West Midlands",
    "East Midlands",
    "North West England",
    "North East England",
    "Scotland",
    "Wales",
    "East Anglia",
    "Yorkshire",
]


def _auth_header() -> dict[str, str]:
    token = base64.b64encode(f"{settings.reed_api_key}:".encode()).decode()
    return {"Authorization": f"Basic {token}"}


async def fetch_jobs(
    keywords: list[str] | None = None,
    regions: list[str] | None = None,
    results_per_search: int = 100,
) -> list[dict[str, Any]]:
    """Fetch jobs from Reed API across keywords and regions.

    Returns a flat list of job dicts ready for dedup + caching.
    """
    if not settings.reed_api_key:
        log.warning("reed_api_key_missing")
        return []

    keywords = keywords or KEYWORDS
    regions = regions or REGIONS
    all_jobs: list[dict] = []

    async with httpx.AsyncClient(timeout=30) as client:
        for keyword in keywords:
            for region in regions:
                try:
                    resp = await client.get(
                        BASE_URL,
                        params={
                            "keywords": keyword,
                            "locationName": region,
                            "distanceFromLocation": 25,
                            "resultsToTake": results_per_search,
                        },
                        headers=_auth_header(),
                    )
                    resp.raise_for_status()
                    data = resp.json()

                    results = data.get("results", [])
                    for r in results:
                        all_jobs.append(
                            {
                                "title": r.get("jobTitle", ""),
                                "company": r.get("employerName"),
                                "location": r.get("locationName"),
                                "salary": _format_salary(
                                    r.get("minimumSalary"),
                                    r.get("maximumSalary"),
                                ),
                                "salary_min": r.get("minimumSalary"),
                                "salary_max": r.get("maximumSalary"),
                                "employment_type": _employment_type(r),
                                "description": r.get("jobDescription"),
                                "apply_url": r.get("jobUrl"),
                                "date_posted": r.get("date"),
                                "source": "reed",
                                "external_id": str(r.get("jobId", "")),
                                "region": region,
                            }
                        )

                    log.info(
                        "reed_jobs_fetched",
                        keyword=keyword,
                        region=region,
                        count=len(results),
                    )
                except httpx.HTTPError as e:
                    log.error(
                        "reed_jobs_error",
                        keyword=keyword,
                        region=region,
                        error=str(e),
                    )

    log.info("reed_jobs_total", count=len(all_jobs))
    return all_jobs


def _format_salary(min_sal: float | None, max_sal: float | None) -> str | None:
    if min_sal and max_sal:
        return f"£{min_sal:,.0f} - £{max_sal:,.0f}"
    if min_sal:
        return f"From £{min_sal:,.0f}"
    if max_sal:
        return f"Up to £{max_sal:,.0f}"
    return None


def _employment_type(job: dict) -> str | None:
    parts = []
    if job.get("fullTime"):
        parts.append("Full-time")
    if job.get("partTime"):
        parts.append("Part-time")
    if job.get("contractType"):
        parts.append(job["contractType"])
    return ", ".join(parts) if parts else None
