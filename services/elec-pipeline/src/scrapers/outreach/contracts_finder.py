"""Gov.uk Contracts Finder — UK electrical contractors who won public tenders.

Uses the public OCDS JSON search API. No key, no rate limit (within reason),
no anti-bot. Every supplier in a won award contract is a real trading
electrical firm — often bigger companies (£100k+ contracts).

Endpoint: https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search
"""

from __future__ import annotations

import asyncio
from typing import Any

import httpx
import structlog

from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_postcode,
    normalise_domain,
)

log = structlog.get_logger()

ENDPOINT = "https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; Elec-Mate-Outreach/1.0)",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

# Search terms — each pulls a fresh set of suppliers
KEYWORDS = [
    "electrical contractor",
    "electrical installation",
    "electrical engineering",
    "electrical maintenance",
    "electrical services",
    "mechanical and electrical",
    "M&E contractor",
    "lighting installation",
    "EV charging installation",
    "solar PV installation",
    "fire alarm installation",
    "EICR inspection",
]


async def _fetch_page(
    client: httpx.AsyncClient, keyword: str, page: int, size: int = 100
) -> dict[str, Any] | None:
    try:
        r = await client.post(
            ENDPOINT,
            json={
                "searchCriteria": {
                    "keyword": keyword,
                    "stages": ["Award"],
                },
                "size": size,
                "from": (page - 1) * size,
            },
            timeout=30,
        )
        if r.status_code != 200:
            return None
        return r.json()
    except Exception as e:
        log.warning("contracts_finder_fetch_failed", keyword=keyword, page=page, error=str(e))
        return None


def _party_to_lead(party: dict[str, Any], keyword: str, release: dict[str, Any]) -> dict[str, Any] | None:
    if "supplier" not in (party.get("roles") or []):
        return None
    name = (party.get("name") or "").strip()
    if not name or len(name) < 3:
        return None

    party_id = party.get("id") or ""
    # CH numbers look like "GB-COH-12345678"
    company_number = None
    if party_id.startswith("GB-COH-"):
        company_number = party_id.replace("GB-COH-", "").lstrip("0") or party_id.replace("GB-COH-", "")
        company_number = company_number.zfill(8)  # CH numbers are 8 digits

    cp = party.get("contactPoint") or {}
    email = (cp.get("email") or "").strip().lower() or None
    website = (cp.get("url") or "").strip() or None

    addr = party.get("address") or {}
    postal = addr.get("postalCode")
    region = addr.get("region")
    locality = addr.get("locality")

    award_date = None
    awards = release.get("awards") or []
    if awards:
        award_date = awards[0].get("date")

    return {
        "source": "contracts_finder",
        "source_url": f"https://www.contractsfinder.service.gov.uk/Notice/{release.get('ocid', '')}",
        "source_id": party_id or name,
        "company_name": name,
        "company_number": company_number,
        "email": email,
        "website": website,
        "phone": cp.get("telephone"),
        "address_line_1": (addr.get("streetAddress") or "").strip() or None,
        "city": locality,
        "postcode": postal,
        "region": region,
        "country": classify_uk_country(postal, locality, region),
        "accreditations": ["public_sector_supplier"],
        "raw_data": {
            "keyword": keyword,
            "ocid": release.get("ocid"),
            "award_date": award_date,
            "cpvs": [c.get("id") for c in (release.get("tender") or {}).get("classificationsByScheme") or []],
        },
        "confidence_score": 88 if email else (78 if website else 68),
    }


async def scrape_contracts_finder(
    keywords: list[str] | None = None,
    max_pages_per_keyword: int = 10,
    page_size: int = 100,
) -> list[dict[str, Any]]:
    keywords = keywords or KEYWORDS
    seen_ids: set[str] = set()
    out: list[dict[str, Any]] = []

    async with httpx.AsyncClient(headers=HEADERS, http2=False) as client:
        for ki, kw in enumerate(keywords, 1):
            kw_start = len(out)
            for page in range(1, max_pages_per_keyword + 1):
                data = await _fetch_page(client, kw, page, size=page_size)
                if not data:
                    break
                releases = data.get("releases") or []
                if not releases:
                    break
                for release in releases:
                    for party in release.get("parties") or []:
                        lead = _party_to_lead(party, kw, release)
                        if not lead:
                            continue
                        key = lead["source_id"]
                        if key in seen_ids:
                            continue
                        seen_ids.add(key)
                        out.append(lead)
                await asyncio.sleep(0.4)
            log.info(
                "contracts_finder_keyword_done",
                keyword=kw,
                progress=f"{ki}/{len(keywords)}",
                new_here=len(out) - kw_start,
                total=len(out),
            )

    log.info("contracts_finder_collected", total=len(out))
    return out
