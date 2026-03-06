"""Gov.uk Find an Apprenticeship API.

Free API: https://www.findapprenticeship.service.gov.uk/api/
No API key required.
"""

from __future__ import annotations

from typing import Any

import httpx
import structlog

log = structlog.get_logger()

BASE_URL = "https://www.findapprenticeship.service.gov.uk/api/apprenticeships"

KEYWORDS = [
    "electrician",
    "electrical installation",
    "electrical maintenance",
    "electrical engineering",
]


async def fetch_apprenticeships() -> list[dict[str, Any]]:
    """Fetch electrical apprenticeships from Gov.uk API."""
    all_jobs: list[dict] = []

    async with httpx.AsyncClient(timeout=30) as client:
        for keyword in KEYWORDS:
            page = 1
            while page <= 5:
                try:
                    resp = await client.get(
                        BASE_URL,
                        params={
                            "keyword": keyword,
                            "pageNumber": page,
                            "pageSize": 50,
                        },
                    )
                    resp.raise_for_status()
                    data = resp.json()

                    results = data.get("results", [])
                    if not results:
                        break

                    for r in results:
                        wage = r.get("wage", {})
                        all_jobs.append(
                            {
                                "title": r.get("title", ""),
                                "company": r.get("employerName"),
                                "location": r.get("location", {}).get("name"),
                                "salary": wage.get("wageAdditionalInformation")
                                or wage.get("wageType"),
                                "employment_type": "Apprenticeship",
                                "description": r.get("description"),
                                "apply_url": r.get("vacancyUrl"),
                                "date_posted": r.get("postedDate"),
                                "source": "gov_apprenticeships",
                                "external_id": str(r.get("vacancyReference", "")),
                                "region": r.get("location", {}).get("name", "UK"),
                            }
                        )

                    page += 1
                    log.info(
                        "gov_apprenticeships_fetched",
                        keyword=keyword,
                        page=page - 1,
                        count=len(results),
                    )
                except httpx.HTTPError as e:
                    log.error(
                        "gov_apprenticeships_error",
                        keyword=keyword,
                        error=str(e),
                    )
                    break

    log.info("gov_apprenticeships_total", count=len(all_jobs))
    return all_jobs
