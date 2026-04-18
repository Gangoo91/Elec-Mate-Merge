"""Google Custom Search JSON API — UK electrical business discovery.

Uses the Google Custom Search API with a search-the-web CSE to find UK
electrical businesses directly. No Playwright needed. Free tier: 100 queries/day
(can set up a paid key for more).

Queries sweep variants × UK areas to cover as much ground as possible. Each
result gives us business name, URL and snippet — feed those into business_leads.

The API needs:
  GOOGLE_MAPS_API_KEY (reused — same Google project)
  GOOGLE_CSE_ID (user creates at programmablesearchengine.google.com — free)

If GOOGLE_CSE_ID is missing, this scraper skips cleanly.
"""

from __future__ import annotations

import asyncio
import os
from typing import Any
from urllib.parse import urlparse

import httpx
import structlog

from src.config import settings
from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_postcode,
    normalise_domain,
)

log = structlog.get_logger()

CSE_ENDPOINT = "https://www.googleapis.com/customsearch/v1"

QUERY_VARIANTS = [
    "electrician {area} UK",
    "electrical contractor {area}",
    "commercial electrician {area} UK",
    "niceic electrician {area}",
    "emergency electrician {area} UK",
    "electrical installation {area} UK",
    "solar pv installer {area} UK",
    "ev charging installer {area} UK",
]

UK_AREAS = [
    "London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Sheffield",
    "Bristol", "Newcastle", "Nottingham", "Leicester", "Coventry", "Bradford",
    "Cardiff", "Belfast", "Edinburgh", "Glasgow", "Aberdeen", "Dundee",
    "Plymouth", "Southampton", "Portsmouth", "Reading", "Derby", "Wolverhampton",
    "Brighton", "Hull", "Swansea", "Milton Keynes", "Norwich", "Ipswich",
    "Exeter", "Bath", "York", "Preston", "Middlesbrough", "Oxford", "Cambridge",
    "Bournemouth", "Blackpool", "Peterborough", "Lincoln", "Chester",
    "Gloucester", "Worcester", "Carlisle", "Inverness",
]

# Domains we definitely don't want as "business leads" (review/listing sites)
DIRECTORY_HOSTS = {
    "yell.com", "checkatrade.com", "trustpilot.com", "trustatrader.com",
    "ratedpeople.com", "mybuilder.com", "bark.com", "gumtree.com",
    "facebook.com", "linkedin.com", "yelp.com", "google.com", "bing.com",
    "youtube.com", "instagram.com", "twitter.com", "tiktok.com",
    "find-and-update.company-information.service.gov.uk", "companieshouse.gov.uk",
    "192.com", "thomsonlocal.com", "freeindex.co.uk", "scoot.co.uk",
    "wikipedia.org", "indeed.com", "reed.co.uk", "totaljobs.com",
}


def _hostname(url: str) -> str | None:
    try:
        h = urlparse(url).netloc.lower()
        return h.removeprefix("www.")
    except Exception:
        return None


async def _cse_query(
    client: httpx.AsyncClient, api_key: str, cse_id: str, query: str, start: int = 1
) -> dict[str, Any] | None:
    try:
        r = await client.get(
            CSE_ENDPOINT,
            params={
                "key": api_key,
                "cx": cse_id,
                "q": query,
                "num": 10,
                "start": start,
                "gl": "uk",
                "lr": "lang_en",
            },
            timeout=30,
        )
        if r.status_code == 429:
            log.warning("google_cse_rate_limited")
            await asyncio.sleep(60)
            return None
        r.raise_for_status()
        return r.json()
    except Exception as e:
        log.warning("google_cse_failed", query=query[:80], error=str(e))
        return None


def _item_to_lead(item: dict[str, Any], area: str) -> dict[str, Any] | None:
    link = item.get("link") or ""
    host = _hostname(link)
    if not host or host in DIRECTORY_HOSTS:
        return None
    if any(host.endswith("." + d) for d in DIRECTORY_HOSTS):
        return None
    title = item.get("title") or ""
    snippet = item.get("snippet") or ""
    name = title.split(" | ")[0].split(" - ")[0].strip()
    if not name:
        name = host
    postcode = extract_postcode(snippet)
    return {
        "source": "google_cse",
        "source_id": f"google_cse:{host}",
        "source_url": link,
        "company_name": name,
        "website": f"https://{host}",
        "city": area,
        "postcode": postcode,
        "country": classify_uk_country(postcode, area),
        "raw_data": {
            "google_title": title,
            "google_snippet": snippet,
            "google_link": link,
        },
        "confidence_score": 75,
    }


async def scrape_google_cse(
    areas: list[str] | None = None,
    queries: list[str] | None = None,
    pages_per_query: int = 3,
) -> list[dict[str, Any]]:
    api_key = settings.google_maps_api_key
    cse_id = os.environ.get("GOOGLE_CSE_ID", "")
    if not api_key or not cse_id:
        log.warning(
            "google_cse_skipped_no_key",
            has_api_key=bool(api_key),
            has_cse_id=bool(cse_id),
        )
        return []

    areas = areas or UK_AREAS
    queries = queries or QUERY_VARIANTS

    seen: set[str] = set()
    out: list[dict[str, Any]] = []

    async with httpx.AsyncClient(timeout=30) as client:
        for ai, area in enumerate(areas, 1):
            area_start = len(out)
            for q_template in queries:
                query = q_template.format(area=area)
                for page in range(pages_per_query):
                    start = page * 10 + 1  # CSE uses 1-based paging
                    data = await _cse_query(client, api_key, cse_id, query, start)
                    if not data:
                        break
                    items = data.get("items") or []
                    if not items:
                        break
                    for item in items:
                        lead = _item_to_lead(item, area)
                        if not lead:
                            continue
                        sid = lead["source_id"]
                        if sid in seen:
                            continue
                        seen.add(sid)
                        out.append(lead)
                    await asyncio.sleep(0.2)
            log.info(
                "google_cse_area_done",
                area=area,
                progress=f"{ai}/{len(areas)}",
                new_here=len(out) - area_start,
                total=len(out),
            )

    log.info("google_cse_collected", total=len(out))
    return out
