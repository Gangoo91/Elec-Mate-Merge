"""Bing Local / Places — supplementary electrical contractor discovery.

Bing's public Local search: https://www.bing.com/maps?q=<query>
Results page embeds business cards (JSON-LD or rendered) we can parse.

Less rate-limited than Google Places API and doesn't require paid quota.
"""

from __future__ import annotations

import asyncio
from typing import Any
from urllib.parse import quote_plus

import structlog
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CacheMode, CrawlerRunConfig

from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_emails,
    extract_postcode,
)

log = structlog.get_logger()

BING_MAPS = "https://www.bing.com/maps"


async def _fetch_bing(crawler: AsyncWebCrawler, query: str) -> str | None:
    url = f"{BING_MAPS}?q={quote_plus(query)}&FORM=HDRSC6"
    try:
        res = await crawler.arun(
            url=url,
            config=CrawlerRunConfig(
                cache_mode=CacheMode.BYPASS,
                magic=True,
                simulate_user=True,
                wait_for="css:.listings-item, .b_entity, [role='article']",
                page_timeout=30000,
            ),
        )
        if res.success and res.html:
            return res.html
    except Exception as e:
        log.warning("bing_fetch_failed", query=query[:60], error=str(e))
    return None


def _parse_bing(html: str, area: str) -> list[dict[str, Any]]:
    soup = BeautifulSoup(html, "lxml")
    cards = (
        soup.select(".listings-item")
        or soup.select("[data-entity-id]")
        or soup.select(".b_entity")
        or soup.select("[role='article']")
    )
    out: list[dict[str, Any]] = []
    for card in cards:
        name_el = card.select_one("h2, h3, .business-name, .title")
        name = name_el.get_text(strip=True) if name_el else ""
        if not name:
            continue

        text_blob = card.get_text(" ", strip=True)
        postcode = extract_postcode(text_blob)

        phone = None
        tel = card.select_one("a[href^='tel:']")
        if tel:
            phone = tel.get("href", "").replace("tel:", "").strip()

        website = None
        for a in card.select("a[href^='http']"):
            href = a.get("href", "")
            if "bing.com" not in href and "microsoft" not in href:
                website = href
                break

        emails = extract_emails(text_blob)
        email = emails[0] if emails else None

        out.append({
            "source": "bing_places",
            "source_id": f"bing:{name}:{postcode or area}".lower(),
            "source_url": website,
            "company_name": name,
            "email": email,
            "phone": phone,
            "website": website,
            "city": area,
            "postcode": postcode,
            "country": classify_uk_country(postcode, area),
            "raw_data": {"listing_text": text_blob[:400]},
            "confidence_score": 65 if email else (60 if website else 50),
        })
    return out


async def scrape_bing_places(
    areas: list[str] | None = None,
    queries: list[str] | None = None,
) -> list[dict[str, Any]]:
    areas = areas or [
        "London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Glasgow",
        "Edinburgh", "Bristol", "Cardiff", "Sheffield", "Newcastle", "Belfast",
        "Nottingham", "Leicester", "Southampton", "Portsmouth", "Reading",
        "Norwich", "Oxford", "Cambridge", "Brighton", "Plymouth", "Exeter",
        "Preston", "Blackpool", "Hull", "York", "Stoke-on-Trent",
    ]
    queries = queries or [
        "electrician",
        "electrical contractor",
        "electrical installation company",
    ]

    browser = BrowserConfig(
        headless=True,
        user_agent_mode="random",
        viewport_width=1366,
        viewport_height=800,
    )

    seen: set[str] = set()
    out: list[dict[str, Any]] = []

    async with AsyncWebCrawler(config=browser) as crawler:
        for ai, area in enumerate(areas, 1):
            area_start = len(out)
            for q in queries:
                html = await _fetch_bing(crawler, f"{q} {area} UK")
                if not html:
                    continue
                rows = _parse_bing(html, area)
                for r in rows:
                    if r["source_id"] in seen:
                        continue
                    seen.add(r["source_id"])
                    out.append(r)
                await asyncio.sleep(1.0)
            log.info(
                "bing_area_done",
                area=area,
                progress=f"{ai}/{len(areas)}",
                new_here=len(out) - area_start,
                total=len(out),
            )

    log.info("bing_places_collected", total=len(out))
    return out
