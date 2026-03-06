"""Reed Courses API client.

Same API key as Reed Jobs. Endpoint: /api/1.0/courses
"""

from __future__ import annotations

import base64
from typing import Any

import httpx
import structlog

from src.config import settings

log = structlog.get_logger()

BASE_URL = "https://www.reed.co.uk/api/1.0/courses"

SEARCH_TERMS = [
    "18th edition wiring regulations",
    "electrical installation",
    "inspection and testing",
    "C&G 2391",
    "C&G 2365",
    "EV charging installation",
    "solar PV",
    "fire alarm",
    "PAT testing",
    "Part P",
    "AM2",
    "JIB gold card",
]


def _auth_header() -> dict[str, str]:
    token = base64.b64encode(f"{settings.reed_api_key}:".encode()).decode()
    return {"Authorization": f"Basic {token}"}


async def fetch_courses() -> list[dict[str, Any]]:
    """Fetch courses from Reed Courses API."""
    if not settings.reed_api_key:
        log.warning("reed_api_key_missing")
        return []

    all_courses: list[dict] = []

    async with httpx.AsyncClient(timeout=30) as client:
        for term in SEARCH_TERMS:
            try:
                resp = await client.get(
                    BASE_URL,
                    params={
                        "keywords": term,
                        "resultsToTake": 100,
                    },
                    headers=_auth_header(),
                )
                resp.raise_for_status()
                data = resp.json()

                results = data.get("courses", data) if isinstance(data, dict) else data
                if not isinstance(results, list):
                    results = []

                for r in results:
                    all_courses.append(
                        {
                            "title": r.get("title") or r.get("courseTitle", ""),
                            "provider": r.get("providerName"),
                            "qualification": r.get("qualificationLevel"),
                            "location": r.get("locationName"),
                            "dates": r.get("startDate"),
                            "price": r.get("price"),
                            "duration": r.get("duration"),
                            "url": r.get("courseUrl"),
                            "source": "reed_courses",
                        }
                    )

                log.info("reed_courses_fetched", term=term, count=len(results))
            except httpx.HTTPError as e:
                log.error("reed_courses_error", term=term, error=str(e))

    log.info("reed_courses_total", count=len(all_courses))
    return all_courses
