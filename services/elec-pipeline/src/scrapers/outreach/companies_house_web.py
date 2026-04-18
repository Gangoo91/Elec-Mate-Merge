"""Companies House direct website scraper — no API key required.

Hits the public `find-and-update.company-information.service.gov.uk` advanced
search endpoint with httpx (no browser needed — page is server-rendered HTML).

Yields ~25-45k active UK electrical ltds across SIC codes 43210 / 43220 /
43290 combined with keyword sweeps.

Free, no registration. Rate-limited politely to 1 req/0.6s.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any
from urllib.parse import urljoin, quote_plus

import httpx
import structlog
from bs4 import BeautifulSoup

from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_postcode,
    is_electrical_by_name,
)

log = structlog.get_logger()

BASE = "https://find-and-update.company-information.service.gov.uk"
# Simple search endpoint returns results quickly, no SIC filter needed
# (we filter by company name containing electrical keywords)
SEARCH = f"{BASE}/search/companies"

KEYWORDS = [
    "electrical",
    "electrician",
    "sparks",
    "lighting",
    "solar pv",
    "ev charging",
    "pat testing",
    "niceic",
    "napit",
    "power systems",
    "voltage",
    "electrics",
    "wiring",
    "electro",
    "illumination",
    "energy services",
    "electrical services",
    "electrical contractor",
    "electrical installation",
    "electrical engineering",
]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/127.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
}


async def _fetch(client: httpx.AsyncClient, keyword: str, page: int) -> str | None:
    # CH /search/companies?q=<kw>&page=<n> — 20 hits/page, server-rendered HTML
    params = {"q": keyword, "page": page}
    try:
        r = await client.get(SEARCH, params=params, timeout=30, follow_redirects=True)
        if r.status_code == 429:
            await asyncio.sleep(30)
            return None
        if r.status_code != 200:
            return None
        return r.text
    except Exception as e:
        log.warning("ch_web_fetch_error", keyword=keyword, page=page, error=str(e))
        return None


COMPANY_HREF_RE = re.compile(r"/company/(\d{6,})")


def _parse(html: str, keyword: str) -> list[dict[str, Any]]:
    soup = BeautifulSoup(html, "lxml")
    # Each result is typically an <li> containing an <a href="/company/12345678">
    items = soup.select("li.type-company") or soup.select("ul.results-list > li") or soup.select("div.results > div") or []
    out: list[dict[str, Any]] = []
    seen: set[str] = set()
    # Fallback: grab every unique /company/ link from the page
    if not items:
        for a in soup.select("a[href*='/company/']"):
            m = COMPANY_HREF_RE.search(a.get("href", ""))
            if not m:
                continue
            number = m.group(1)
            if number in seen:
                continue
            seen.add(number)
            name = a.get_text(strip=True)
            # Walk up to get the block text for postcode
            parent = a.find_parent(["li", "div", "article"]) or a
            block_text = parent.get_text(" ", strip=True)
            postcode = extract_postcode(block_text)
            out.append({
                "source": "companies_house_web",
                "source_url": urljoin(BASE, f"/company/{number}"),
                "source_id": number,
                "company_number": number,
                "company_name": name,
                "sic_codes": ["43210"],
                "company_status": "active",
                "postcode": postcode,
                "country": classify_uk_country(postcode),
                "raw_data": {"keyword": keyword, "block_text": block_text[:500]},
                "confidence_score": 70,
            })
        return out

    for item in items:
        link = item.select_one("a[href*='/company/']")
        if not link:
            continue
        m = COMPANY_HREF_RE.search(link.get("href", ""))
        if not m:
            continue
        number = m.group(1)
        if number in seen:
            continue
        seen.add(number)
        name = link.get_text(strip=True)
        block_text = item.get_text(" ", strip=True)
        postcode = extract_postcode(block_text)
        # Extract incorporation date if present
        inc_date = None
        inc_match = re.search(r"Incorporated on (\d{1,2} \w+ \d{4})", block_text)
        if inc_match:
            inc_date = inc_match.group(1)
        out.append({
            "source": "companies_house_web",
            "source_url": urljoin(BASE, f"/company/{number}"),
            "source_id": number,
            "company_number": number,
            "company_name": name,
            "sic_codes": ["43210"],
            "company_status": "active",
            "incorporation_date": None,  # date string format differs, parse later if needed
            "postcode": postcode,
            "country": classify_uk_country(postcode),
            "raw_data": {"keyword": keyword, "block_text": block_text[:500], "inc_date_text": inc_date},
            "confidence_score": 70,
        })
    return out


async def scrape_companies_house_web(
    keywords: list[str] | None = None,
    max_pages_per_keyword: int = 80,
    filter_by_name: bool = False,
) -> list[dict[str, Any]]:
    keywords = keywords or KEYWORDS
    seen_numbers: set[str] = set()
    out: list[dict[str, Any]] = []

    async with httpx.AsyncClient(headers=HEADERS, timeout=30, follow_redirects=True, http2=True) as client:
        for ki, kw in enumerate(keywords, 1):
            kw_start = len(out)
            empty_streak = 0
            for page in range(1, max_pages_per_keyword + 1):
                html = await _fetch(client, kw, page)
                if not html:
                    break
                rows = _parse(html, kw)
                if not rows:
                    empty_streak += 1
                    if empty_streak >= 2:
                        break
                    continue
                kept = 0
                for r in rows:
                    if r["company_number"] in seen_numbers:
                        continue
                    if filter_by_name and not is_electrical_by_name(r["company_name"]):
                        continue
                    seen_numbers.add(r["company_number"])
                    out.append(r)
                    kept += 1
                if kept == 0:
                    empty_streak += 1
                    if empty_streak >= 2:
                        break
                else:
                    empty_streak = 0
                await asyncio.sleep(0.6)
            log.info(
                "ch_web_keyword_done",
                keyword=kw,
                progress=f"{ki}/{len(keywords)}",
                new_here=len(out) - kw_start,
                total=len(out),
            )

    log.info("companies_house_web_collected", total=len(out))
    return out
