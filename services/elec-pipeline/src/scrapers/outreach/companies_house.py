"""Companies House UK electrical contractor importer.

Free API: 600 req/5min. Register at developer.company-information.service.gov.uk
Uses the Advanced Company Search endpoint filtered by SIC code.

SIC codes covered (default):
  43210 — Electrical installation
  43220 — Plumbing, heat and air-conditioning installation (electrical overlap)
  43290 — Other construction installation (filtered by name for electrical-only)
"""

from __future__ import annotations

import asyncio
import base64
from typing import Any, AsyncIterator

import httpx
import structlog

from src.config import settings
from src.scrapers.outreach.shared import (
    classify_uk_country,
    is_electrical_by_name,
)

log = structlog.get_logger()

CH_BASE = "https://api.company-information.service.gov.uk"
DEFAULT_SIC = ["43210", "43220"]
PAGE_SIZE = 100


def _auth_header(api_key: str) -> dict[str, str]:
    token = base64.b64encode(f"{api_key}:".encode()).decode()
    return {
        "Authorization": f"Basic {token}",
        "Accept": "application/json",
        "User-Agent": "Elec-Mate-Outreach/1.0 (+https://elec-mate.com)",
    }


async def _search_page(
    client: httpx.AsyncClient,
    api_key: str,
    sic_codes: list[str],
    start_index: int,
) -> dict[str, Any]:
    r = await client.get(
        f"{CH_BASE}/advanced-search/companies",
        params={
            "sic_codes": ",".join(sic_codes),
            "company_status": "active",
            "size": PAGE_SIZE,
            "start_index": start_index,
        },
        headers=_auth_header(api_key),
        timeout=60,
    )
    r.raise_for_status()
    return r.json()


async def iter_companies(
    sic_codes: list[str],
    max_records: int | None = None,
) -> AsyncIterator[dict[str, Any]]:
    api_key = settings.companies_house_api_key
    if not api_key:
        log.warning("companies_house_skipped_no_key")
        return

    async with httpx.AsyncClient(timeout=60) as client:
        start = 0
        yielded = 0
        while True:
            try:
                payload = await _search_page(client, api_key, sic_codes, start)
            except httpx.HTTPStatusError as e:
                if e.response.status_code == 429:
                    log.warning("companies_house_rate_limited_sleep")
                    await asyncio.sleep(30)
                    continue
                log.error("companies_house_http_error", status=e.response.status_code)
                return

            items = payload.get("items") or []
            if not items:
                break
            for item in items:
                yield item
                yielded += 1
                if max_records and yielded >= max_records:
                    return

            start += PAGE_SIZE
            total = payload.get("hits") or payload.get("total_results") or 0
            if start >= total:
                break
            # Pace: stay under 600/5min. 0.6s/req = ~100/min = safe
            await asyncio.sleep(0.6)


def _map_company(item: dict[str, Any]) -> dict[str, Any]:
    addr = item.get("registered_office_address") or {}
    sic = [str(s) for s in (item.get("sic_codes") or [])]
    name = (item.get("company_name") or "").strip()
    city = addr.get("locality") or addr.get("region")
    postcode = addr.get("postal_code")
    region = addr.get("region")
    country = classify_uk_country(postcode, city, region)

    return {
        "source": "companies_house",
        "source_url": (
            f"https://find-and-update.company-information.service.gov.uk/company/"
            f"{item.get('company_number', '')}"
        ),
        "source_id": item.get("company_number"),
        "company_name": name,
        "company_number": item.get("company_number"),
        "sic_codes": sic,
        "company_status": item.get("company_status"),
        "incorporation_date": item.get("date_of_creation"),
        "address_line_1": addr.get("address_line_1"),
        "address_line_2": addr.get("address_line_2"),
        "city": city,
        "postcode": postcode,
        "region": region,
        "country": country,
        "raw_data": item,
        "confidence_score": 70 if name and postcode else 55,
    }


async def scrape_companies_house(
    sic_codes: list[str] | None = None,
    max_records: int | None = None,
    filter_by_name: bool = False,
) -> list[dict[str, Any]]:
    """Run the import and return a list of business_leads-shaped dicts."""
    sic_codes = sic_codes or DEFAULT_SIC
    out: list[dict[str, Any]] = []
    async for item in iter_companies(sic_codes, max_records):
        lead = _map_company(item)
        if filter_by_name and not is_electrical_by_name(lead["company_name"]):
            continue
        out.append(lead)
    log.info("companies_house_collected", count=len(out), sic_codes=sic_codes)
    return out
