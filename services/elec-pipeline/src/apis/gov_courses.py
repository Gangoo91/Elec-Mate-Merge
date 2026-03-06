"""Gov.uk Find a Course (National Careers Service) API.

Free API: https://findcoursesapi.service.gov.uk/
No API key required.
"""

from __future__ import annotations

from typing import Any

import httpx
import structlog

log = structlog.get_logger()

BASE_URL = "https://findcoursesapi.service.gov.uk/coursesearch"

SEARCH_TERMS = [
    "18th edition",
    "C&G 2365",
    "C&G 2391",
    "C&G 2357",
    "AM2 exam",
    "inspection and testing",
    "EV charging",
    "solar PV installation",
    "fire alarm BS 5839",
    "emergency lighting",
    "PAT testing",
    "Part P building regulations",
    "initial verification",
    "periodic inspection",
    "design and verification",
    "smart home installation",
    "battery storage",
    "heat pump installation",
    "electrical installation",
]


async def fetch_courses() -> list[dict[str, Any]]:
    """Fetch courses from Gov.uk Find a Course API."""
    all_courses: list[dict] = []

    async with httpx.AsyncClient(timeout=30) as client:
        for term in SEARCH_TERMS:
            try:
                resp = await client.get(
                    BASE_URL,
                    params={
                        "subjectKeyword": term,
                        "limit": 50,
                        "start": 0,
                    },
                )
                resp.raise_for_status()
                data = resp.json()

                results = data.get("results", [])
                for r in results:
                    course = r.get("course", {})
                    provider = r.get("provider", {})
                    venue = r.get("venue", {})

                    all_courses.append(
                        {
                            "title": course.get("courseTitle", ""),
                            "provider": provider.get("providerName"),
                            "qualification": course.get("qualificationLevel"),
                            "location": venue.get("venueName")
                            or venue.get("town"),
                            "dates": r.get("startDate"),
                            "price": _parse_cost(r.get("cost")),
                            "duration": r.get("durationValue"),
                            "entry_requirements": course.get("entryRequirements"),
                            "url": course.get("courseURL") or r.get("courseRunURL"),
                            "source": "gov_find_course",
                        }
                    )

                log.info(
                    "gov_courses_fetched",
                    term=term,
                    count=len(results),
                )
            except httpx.HTTPError as e:
                log.error("gov_courses_error", term=term, error=str(e))

    log.info("gov_courses_total", count=len(all_courses))
    return all_courses


def _parse_cost(cost: str | None) -> float | None:
    if not cost:
        return None
    import re

    match = re.search(r"[\d,.]+", cost.replace(",", ""))
    if match:
        try:
            return float(match.group())
        except ValueError:
            pass
    return None
