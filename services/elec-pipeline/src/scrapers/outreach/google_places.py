"""Google Maps Places API — electrical contractor discovery.

Uses the Places API Text Search to find electrical contractors across the UK by
postcode sweep. Returns business_leads-shaped dicts.

Pricing: ~£25/1000 Place Details requests. Pace to taste.
"""

from __future__ import annotations

import asyncio
from typing import Any

import httpx
import structlog

from src.config import settings
from src.scrapers.outreach.shared import classify_uk_country, extract_postcode
from src.scrapers.outreach.uk_towns import unique_towns

log = structlog.get_logger()

PLACES_TEXTSEARCH = "https://maps.googleapis.com/maps/api/place/textsearch/json"
PLACES_DETAILS = "https://maps.googleapis.com/maps/api/place/details/json"

# Default to the full UK town list (~500 locations). Callers can pass a subset.
UK_SEARCH_AREAS = unique_towns()

SEARCH_VARIANTS = [
    "electrical contractor",
    "electrician",
    "electrical installation company",
    "commercial electrician",
]


async def _places_textsearch(
    client: httpx.AsyncClient, query: str, page_token: str | None = None
) -> dict[str, Any]:
    params: dict[str, Any] = {"key": settings.google_maps_api_key, "region": "gb"}
    if page_token:
        params["pagetoken"] = page_token
    else:
        params["query"] = query
    r = await client.get(PLACES_TEXTSEARCH, params=params, timeout=30)
    r.raise_for_status()
    return r.json()


async def _places_details(client: httpx.AsyncClient, place_id: str) -> dict[str, Any]:
    r = await client.get(
        PLACES_DETAILS,
        params={
            "place_id": place_id,
            "fields": (
                "name,formatted_address,formatted_phone_number,"
                "international_phone_number,website,address_component,"
                "business_status,types"
            ),
            "key": settings.google_maps_api_key,
        },
        timeout=30,
    )
    r.raise_for_status()
    return r.json().get("result") or {}


def _extract_city_region(address_components: list[dict[str, Any]]) -> tuple[str | None, str | None]:
    city = None
    region = None
    for c in address_components or []:
        types = c.get("types") or []
        if "postal_town" in types and not city:
            city = c.get("long_name")
        elif "administrative_area_level_2" in types and not region:
            region = c.get("long_name")
        elif "administrative_area_level_1" in types and not region:
            region = c.get("long_name")
    return city, region


async def scrape_google_places(
    areas: list[str] | None = None,
    queries: list[str] | None = None,
    max_per_query: int = 60,
    fetch_details: bool = False,
) -> list[dict[str, Any]]:
    """Sweep UK towns × electrical queries. Returns business_leads payloads.

    fetch_details=False (default): Text Search only — no website/phone, but far
    cheaper. Website finder backfills the website field later.
    """
    if not settings.google_maps_api_key:
        log.warning("google_places_skipped_no_key")
        return []

    areas = areas or UK_SEARCH_AREAS
    queries = queries or SEARCH_VARIANTS
    seen_place_ids: set[str] = set()
    out: list[dict[str, Any]] = []

    async with httpx.AsyncClient(timeout=30) as client:
        for area_i, area in enumerate(areas, 1):
            area_count_start = len(out)
            for qbase in queries:
                query = f"{qbase} {area} UK"
                page_token: str | None = None
                results_this_query = 0
                for _ in range(3):  # up to 3 pages (~60 results)
                    try:
                        data = await _places_textsearch(client, query, page_token)
                    except httpx.HTTPStatusError as e:
                        log.warning("places_search_http_error", query=query, status=e.response.status_code)
                        break

                    for place in data.get("results") or []:
                        place_id = place.get("place_id")
                        if not place_id or place_id in seen_place_ids:
                            continue
                        seen_place_ids.add(place_id)

                        detail: dict[str, Any] = {}
                        if fetch_details:
                            try:
                                detail = await _places_details(client, place_id)
                            except httpx.HTTPStatusError:
                                detail = {}

                        address = detail.get("formatted_address") or place.get("formatted_address") or ""
                        postcode = extract_postcode(address)
                        city, region = _extract_city_region(detail.get("address_components") or [])
                        country = classify_uk_country(postcode, city, region)

                        out.append({
                            "source": "google_places",
                            "source_id": place_id,
                            "source_url": detail.get("website") or f"https://www.google.com/maps/place/?q=place_id:{place_id}",
                            "company_name": (detail.get("name") or place.get("name") or "").strip(),
                            "website": detail.get("website"),
                            "phone": detail.get("international_phone_number") or detail.get("formatted_phone_number"),
                            "address_line_1": address,
                            "city": city or area,
                            "postcode": postcode,
                            "region": region,
                            "country": country,
                            "company_status": detail.get("business_status") or place.get("business_status"),
                            "raw_data": {**place, "detail": detail} if fetch_details else place,
                            "confidence_score": 75 if detail.get("website") else 62,
                        })
                        results_this_query += 1
                        if results_this_query >= max_per_query:
                            break

                    page_token = data.get("next_page_token")
                    if not page_token or results_this_query >= max_per_query:
                        break
                    # Google requires a short delay before a next_page_token becomes valid
                    await asyncio.sleep(2)

                await asyncio.sleep(0.3)
            log.info(
                "google_places_area_done",
                area=area,
                progress=f"{area_i}/{len(areas)}",
                new_this_area=len(out) - area_count_start,
                total_so_far=len(out),
            )

    log.info("google_places_collected", count=len(out), areas=len(areas), queries=len(queries))
    return out
