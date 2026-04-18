"""Checkatrade electrician members scraper.

Public search: checkatrade.com/trade/electrician
Sweep by postcode outward region — Checkatrade's postcode filter returns a
local radius.

Each listing has:
  - Business name
  - Rating + review count
  - Postcode / locality
  - Phone
  - Website (link is masked via Checkatrade referrer but usually extractable)
"""

from __future__ import annotations

import asyncio
import re
from typing import Any
from urllib.parse import urljoin, quote_plus, urlparse, parse_qs

import structlog
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CacheMode, CrawlerRunConfig

from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_emails,
    extract_postcode,
)

log = structlog.get_logger()

BASE = "https://www.checkatrade.com"

# Broad UK postcode outward sweep — Checkatrade's radius fills in local results
UK_POSTCODE_SEEDS = [
    "E1", "E14", "EC1", "N1", "NW1", "SE1", "SW1", "W1", "W2", "WC1",
    "AL1", "BR1", "CM1", "CR0", "DA1", "EN1", "HA1", "IG1", "KT1", "ME1",
    "RG1", "RH1", "SG1", "SL1", "SM1", "SS1", "TN1", "TW1", "UB1",
    "B1", "CV1", "DE1", "DY1", "LE1", "NG1", "NN1", "OX1", "PE1", "ST1", "WV1",
    "BL1", "CH1", "DL1", "DN1", "HD1", "HG1", "HU1", "L1", "LA1", "LS1",
    "M1", "NE1", "OL1", "PR1", "SK1", "TS1", "WA1", "WF1", "YO1",
    "BA1", "BH1", "BS1", "EX1", "GL1", "PL1", "SN1", "SP1", "TA1", "TQ1", "TR1",
    "CB1", "CO1", "IP1", "NR1",
    "CF1", "LL1", "NP1", "SA1",
    "AB1", "DD1", "EH1", "G1", "IV1", "KY1", "PA1", "PH1",
    "BT1",
]


def _unwrap_checkatrade_website(link: str | None) -> str | None:
    if not link:
        return None
    parsed = urlparse(link)
    # Checkatrade sometimes masks as /redirect?url=<target>
    if "redirect" in parsed.path.lower():
        qs = parse_qs(parsed.query)
        url = qs.get("url") or qs.get("u") or qs.get("target")
        if url:
            return url[0]
    return link


async def _fetch_search(
    crawler: AsyncWebCrawler, postcode: str, page: int
) -> str | None:
    url = f"{BASE}/search/electricians/{quote_plus(postcode.lower())}/?page={page}"
    try:
        res = await crawler.arun(
            url=url,
            config=CrawlerRunConfig(
                cache_mode=CacheMode.BYPASS,
                magic=True,
                simulate_user=True,
                wait_for="css:article, .trade-card, .listing-card, [data-testid*='trade']",
                page_timeout=45000,
            ),
        )
        if res.success and res.html:
            return res.html
    except Exception as e:
        log.warning("checkatrade_fetch_failed", postcode=postcode, page=page, error=str(e))
    return None


def _parse_results(html: str, postcode: str) -> list[dict[str, Any]]:
    soup = BeautifulSoup(html, "lxml")
    cards = (
        soup.select("article.trade-card")
        or soup.select(".listing-card")
        or soup.select("[data-testid*='trade']")
        or soup.select("article")
    )
    out: list[dict[str, Any]] = []
    for card in cards:
        name_el = card.select_one("h2, h3, [data-testid='name'], .trade-card__name")
        name = name_el.get_text(strip=True) if name_el else ""
        if not name or len(name) < 2:
            continue
        text_blob = card.get_text(" ", strip=True)

        phone = None
        tel = card.select_one("a[href^='tel:']")
        if tel:
            phone = tel.get("href", "").replace("tel:", "").strip()

        website = None
        for a in card.select("a[href]"):
            href = a.get("href", "")
            if href.startswith("http") and "checkatrade.com" not in href:
                website = _unwrap_checkatrade_website(href)
                break

        pc = extract_postcode(text_blob) or postcode.upper()
        rating = None
        rating_el = card.select_one("[data-testid='rating'], .rating")
        if rating_el:
            m = re.search(r"(\d+\.\d+)", rating_el.get_text(" ", strip=True))
            if m:
                rating = m.group(1)

        detail_href = None
        link_el = card.select_one("a[href*='/trade/'], a[href*='/profile/']")
        if link_el:
            detail_href = urljoin(BASE, link_el["href"])

        emails = extract_emails(text_blob)
        email = emails[0] if emails else None

        accreditations = ["checkatrade_member"]
        if "verified" in text_blob.lower():
            accreditations.append("checkatrade_verified")

        out.append({
            "source": "checkatrade",
            "source_url": detail_href,
            "source_id": f"checkatrade:{detail_href or name}:{pc}".lower(),
            "company_name": name,
            "email": email,
            "phone": phone,
            "website": website,
            "postcode": pc,
            "country": classify_uk_country(pc),
            "accreditations": accreditations,
            "raw_data": {
                "rating": rating,
                "listing_text": text_blob[:500],
            },
            "confidence_score": 78 if email else (70 if website else 60),
        })
    return out


async def scrape_checkatrade(
    postcodes: list[str] | None = None,
    max_pages_per_postcode: int = 3,
) -> list[dict[str, Any]]:
    postcodes = postcodes or UK_POSTCODE_SEEDS

    browser = BrowserConfig(
        headless=True,
        user_agent_mode="random",
        viewport_width=1366,
        viewport_height=800,
    )

    seen: set[str] = set()
    out: list[dict[str, Any]] = []

    async with AsyncWebCrawler(config=browser) as crawler:
        for pi, pc in enumerate(postcodes, 1):
            pc_start = len(out)
            for page in range(1, max_pages_per_postcode + 1):
                html = await _fetch_search(crawler, pc, page)
                if not html:
                    break
                rows = _parse_results(html, pc)
                if not rows:
                    break
                kept = 0
                for r in rows:
                    sid = r["source_id"]
                    if sid in seen:
                        continue
                    seen.add(sid)
                    out.append(r)
                    kept += 1
                if kept == 0:
                    break
                await asyncio.sleep(1.2)
            log.info(
                "checkatrade_postcode_done",
                postcode=pc,
                progress=f"{pi}/{len(postcodes)}",
                new_here=len(out) - pc_start,
                total_so_far=len(out),
            )

    log.info("checkatrade_collected", total=len(out))
    return out
