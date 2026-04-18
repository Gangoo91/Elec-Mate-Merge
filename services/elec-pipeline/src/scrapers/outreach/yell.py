"""Yell.com UK business directory scraper.

Public search: yell.com/ucs/UcsSearchAction.do
Category: Electricians & Electrical Contractors
Sweep: list of major UK cities + category → paginated results.

Each result page lists businesses with:
  - Business name
  - Phone (tel: link)
  - Address + postcode
  - Website (if available)
  - Verified/Yell-Plus status

Rate-limit: polite 1-2s between pages. Anti-bot: crawl4AI magic mode handles.
"""

from __future__ import annotations

import asyncio
from typing import Any
from urllib.parse import urljoin, quote_plus

import structlog
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CacheMode, CrawlerRunConfig

from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_emails,
    extract_postcode,
    normalise_domain,
)

log = structlog.get_logger()

BASE = "https://www.yell.com"
CATEGORIES = [
    "Electricians",
    "Electrical Contractors",
    "Electrical Engineers",
]

# Targeted areas cover >85% of UK population
UK_AREAS = [
    "London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Sheffield",
    "Bristol", "Newcastle", "Nottingham", "Leicester", "Coventry", "Bradford",
    "Cardiff", "Belfast", "Edinburgh", "Glasgow", "Aberdeen", "Dundee",
    "Plymouth", "Southampton", "Portsmouth", "Reading", "Derby", "Wolverhampton",
    "Brighton", "Hull", "Swansea", "Milton Keynes", "Norwich", "Ipswich",
    "Exeter", "Bath", "York", "Preston", "Middlesbrough", "Oxford", "Cambridge",
    "Bournemouth", "Blackpool", "Peterborough", "Lincoln", "Chester", "Salisbury",
    "Gloucester", "Worcester", "Carlisle", "Inverness", "Stirling", "Lancaster",
    "Durham", "Warwick", "Canterbury", "Dover", "Hastings", "Maidstone",
    "Luton", "Watford", "Slough", "Guildford", "Croydon", "Harrow",
    "Crawley", "Chelmsford", "Basildon", "Colchester", "Bedford",
]


async def _fetch_results_page(
    crawler: AsyncWebCrawler, category: str, location: str, page: int
) -> str | None:
    url = f"{BASE}/ucs/UcsSearchAction.do?keywords={quote_plus(category)}&location={quote_plus(location)}&pageNum={page}"
    try:
        res = await crawler.arun(
            url=url,
            config=CrawlerRunConfig(
                cache_mode=CacheMode.BYPASS,
                magic=True,
                simulate_user=True,
                wait_for="css:.businessCapsule, article, .srp-search-result",
                page_timeout=45000,
            ),
        )
        if res.success and res.html:
            return res.html
    except Exception as e:
        log.warning("yell_fetch_failed", category=category, location=location, page=page, error=str(e))
    return None


def _parse_yell_results(html: str, category: str, location: str) -> list[dict[str, Any]]:
    soup = BeautifulSoup(html, "lxml")
    # Yell uses multiple selectors over time
    cards = (
        soup.select("article.businessCapsule")
        or soup.select(".srp-search-result")
        or soup.select("div[itemtype*='LocalBusiness']")
    )
    out: list[dict[str, Any]] = []
    for card in cards:
        name_el = card.select_one("h2 a, h2, .businessCapsule--name a, [itemprop='name']")
        name = name_el.get_text(strip=True) if name_el else ""
        if not name:
            continue

        text_blob = card.get_text(" ", strip=True)
        postcode = extract_postcode(text_blob)

        phone = None
        tel = card.select_one("a[href^='tel:'], [itemprop='telephone']")
        if tel:
            phone_text = tel.get("href", "") or tel.get_text(strip=True)
            phone = phone_text.replace("tel:", "").strip()

        website = None
        for a in card.select("a[href^='http']"):
            href = a.get("href", "")
            if "yell.com" not in href and "facebook.com" not in href and "googlesyndication" not in href:
                website = href
                break
        if not website:
            website_el = card.select_one("a[data-testid='website-link'], a[data-tracking='website']")
            if website_el:
                website = website_el.get("href")

        address_el = card.select_one("[itemprop='address'], address, .businessCapsule--address")
        address = address_el.get_text(" ", strip=True) if address_el else None

        emails = extract_emails(text_blob)
        email = emails[0] if emails else None

        detail_href = name_el.get("href") if hasattr(name_el, "get") else None
        detail_url = urljoin(BASE, detail_href) if detail_href else None

        out.append({
            "source": "yell",
            "source_url": detail_url,
            "source_id": f"yell:{detail_url or name}:{postcode or ''}".lower(),
            "company_name": name,
            "email": email,
            "phone": phone,
            "website": website,
            "address_line_1": address,
            "city": location,
            "postcode": postcode,
            "country": classify_uk_country(postcode, location),
            "raw_data": {
                "category": category,
                "listing_text": text_blob[:500],
                "yell_detail_url": detail_url,
            },
            "confidence_score": 75 if email else (70 if website else 55),
        })
    return out


async def scrape_yell(
    areas: list[str] | None = None,
    categories: list[str] | None = None,
    max_pages_per_combo: int = 5,
) -> list[dict[str, Any]]:
    """Returns business_leads-shaped dicts scraped from Yell."""
    areas = areas or UK_AREAS
    categories = categories or CATEGORIES

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
            for category in categories:
                for page in range(1, max_pages_per_combo + 1):
                    html = await _fetch_results_page(crawler, category, area, page)
                    if not html:
                        break
                    rows = _parse_yell_results(html, category, area)
                    if not rows:
                        break
                    kept_on_page = 0
                    for r in rows:
                        sid = r["source_id"]
                        if sid in seen:
                            continue
                        seen.add(sid)
                        out.append(r)
                        kept_on_page += 1
                    if kept_on_page == 0:
                        break
                    await asyncio.sleep(1.2)
            log.info(
                "yell_area_done",
                area=area,
                progress=f"{ai}/{len(areas)}",
                new_this_area=len(out) - area_start,
                total_so_far=len(out),
            )

    log.info("yell_collected", total=len(out))
    return out
