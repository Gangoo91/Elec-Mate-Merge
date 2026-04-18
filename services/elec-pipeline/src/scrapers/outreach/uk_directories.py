"""UK business directory scrapers — 192.com, Trustpilot, FreeIndex, ThomsonLocal, Scoot.

All output business_leads-shaped dicts. These sites are less aggressive than
Yell/Checkatrade/Bing so the default crawl4AI config usually gets through.
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


# ═══════════════════════════════════════════════════════════════
# 192.com — UK people + business directory
# ═══════════════════════════════════════════════════════════════
ONE92_BASE = "https://www.192.com"


async def scrape_192(max_pages: int = 30) -> list[dict[str, Any]]:
    """192.com Business Directory — Electrical Contractors."""
    browser = BrowserConfig(
        headless=True, user_agent_mode="random", viewport_width=1366, viewport_height=800
    )
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    categories = [
        "Electrical Contractors",
        "Electricians",
        "Electrical Installation",
    ]
    async with AsyncWebCrawler(config=browser) as crawler:
        for cat in categories:
            cat_start = len(out)
            for page in range(1, max_pages + 1):
                url = f"{ONE92_BASE}/business/search?searchText={quote_plus(cat)}&page={page}"
                try:
                    res = await crawler.arun(
                        url=url,
                        config=CrawlerRunConfig(
                            cache_mode=CacheMode.BYPASS,
                            wait_for="css:.company-list, article, .result",
                            page_timeout=30000,
                        ),
                    )
                except Exception as e:
                    log.warning("192_fetch_failed", category=cat, page=page, error=str(e))
                    break
                if not res.success or not res.html:
                    break
                soup = BeautifulSoup(res.html, "lxml")
                cards = soup.select(".company-list li, article, .result") or soup.select("a[href*='/business/']")
                if not cards:
                    break
                kept = 0
                for card in cards:
                    name_el = card.select_one("h2, h3, .company-name, a")
                    name = name_el.get_text(strip=True) if name_el else ""
                    if not name:
                        continue
                    text_blob = card.get_text(" ", strip=True)
                    postcode = extract_postcode(text_blob)
                    phone = None
                    tel = card.select_one("a[href^='tel:']")
                    if tel:
                        phone = tel.get("href", "").replace("tel:", "").strip()
                    link_el = card.select_one("a[href*='/business/']") if card.name != "a" else card
                    detail_url = urljoin(ONE92_BASE, link_el.get("href", "")) if link_el else None
                    sid = f"192:{detail_url or name}:{postcode or ''}".lower()
                    if sid in seen:
                        continue
                    seen.add(sid)
                    emails = extract_emails(text_blob)
                    out.append({
                        "source": "192",
                        "source_url": detail_url,
                        "source_id": sid,
                        "company_name": name,
                        "email": emails[0] if emails else None,
                        "phone": phone,
                        "postcode": postcode,
                        "country": classify_uk_country(postcode),
                        "raw_data": {"category": cat, "text": text_blob[:400]},
                        "confidence_score": 70 if emails else 55,
                    })
                    kept += 1
                if kept == 0:
                    break
                await asyncio.sleep(0.8)
            log.info("192_category_done", cat=cat, new=len(out) - cat_start, total=len(out))
    log.info("192_collected", total=len(out))
    return out


# ═══════════════════════════════════════════════════════════════
# Trustpilot — reviewed UK electricians
# ═══════════════════════════════════════════════════════════════
TRUSTPILOT_BASE = "https://uk.trustpilot.com"


async def scrape_trustpilot(max_pages: int = 30) -> list[dict[str, Any]]:
    browser = BrowserConfig(
        headless=True, user_agent_mode="random", viewport_width=1366, viewport_height=800
    )
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    cats = ["electrician", "electrical_contractor", "electrical_installation_service"]
    async with AsyncWebCrawler(config=browser) as crawler:
        for cat in cats:
            cat_start = len(out)
            for page in range(1, max_pages + 1):
                url = f"{TRUSTPILOT_BASE}/categories/{cat}?page={page}&country=GB"
                try:
                    res = await crawler.arun(
                        url=url,
                        config=CrawlerRunConfig(
                            cache_mode=CacheMode.BYPASS,
                            wait_for="css:a[href*='/review/']",
                            page_timeout=30000,
                        ),
                    )
                except Exception as e:
                    log.warning("trustpilot_fetch_failed", cat=cat, page=page, error=str(e))
                    break
                if not res.success or not res.html:
                    break
                soup = BeautifulSoup(res.html, "lxml")
                links = soup.select("a[href*='/review/']")
                if not links:
                    break
                kept = 0
                for a in links:
                    href = a.get("href", "")
                    if "/review/" not in href:
                        continue
                    domain_slug = href.split("/review/")[-1].split("?")[0].rstrip("/")
                    if not domain_slug or domain_slug in seen:
                        continue
                    seen.add(domain_slug)
                    block = a.find_parent(["article", "div", "section"]) or a
                    block_text = block.get_text(" ", strip=True)
                    name = a.get_text(strip=True) or domain_slug
                    website = f"https://{domain_slug}" if "." in domain_slug else None
                    postcode = extract_postcode(block_text)
                    out.append({
                        "source": "trustpilot",
                        "source_url": urljoin(TRUSTPILOT_BASE, href),
                        "source_id": f"trustpilot:{domain_slug}",
                        "company_name": name,
                        "website": website,
                        "postcode": postcode,
                        "country": classify_uk_country(postcode),
                        "accreditations": ["trustpilot_listed"],
                        "raw_data": {"category": cat, "snippet": block_text[:400]},
                        "confidence_score": 75 if website else 60,
                    })
                    kept += 1
                if kept == 0:
                    break
                await asyncio.sleep(0.8)
            log.info("trustpilot_cat_done", cat=cat, new=len(out) - cat_start, total=len(out))
    log.info("trustpilot_collected", total=len(out))
    return out


# ═══════════════════════════════════════════════════════════════
# FreeIndex — UK small business directory
# ═══════════════════════════════════════════════════════════════
FREEINDEX_BASE = "https://www.freeindex.co.uk"


async def scrape_freeindex(max_pages: int = 40) -> list[dict[str, Any]]:
    browser = BrowserConfig(
        headless=True, user_agent_mode="random", viewport_width=1366, viewport_height=800
    )
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    async with AsyncWebCrawler(config=browser) as crawler:
        for page in range(1, max_pages + 1):
            url = f"{FREEINDEX_BASE}/profiles/uk/electricians/?page={page}"
            try:
                res = await crawler.arun(
                    url=url,
                    config=CrawlerRunConfig(
                        cache_mode=CacheMode.BYPASS,
                        wait_for="css:article, .profile, .listing, a[href*='/profile/']",
                        page_timeout=30000,
                    ),
                )
            except Exception as e:
                log.warning("freeindex_fetch_failed", page=page, error=str(e))
                break
            if not res.success or not res.html:
                break
            soup = BeautifulSoup(res.html, "lxml")
            cards = soup.select("article, .profile, .listing, a[href*='/profile/']")
            if not cards:
                break
            kept = 0
            for card in cards:
                name_el = card.select_one("h2, h3, .name, a")
                name = name_el.get_text(strip=True) if name_el else ""
                if not name:
                    continue
                text_blob = card.get_text(" ", strip=True)
                postcode = extract_postcode(text_blob)
                link_el = card.select_one("a[href*='/profile/']") or (card if card.name == "a" else None)
                detail_url = urljoin(FREEINDEX_BASE, link_el.get("href", "")) if link_el else None
                sid = f"freeindex:{detail_url or name}".lower()
                if sid in seen:
                    continue
                seen.add(sid)
                phone = None
                tel = card.select_one("a[href^='tel:']")
                if tel:
                    phone = tel.get("href", "").replace("tel:", "").strip()
                out.append({
                    "source": "freeindex",
                    "source_url": detail_url,
                    "source_id": sid,
                    "company_name": name,
                    "phone": phone,
                    "postcode": postcode,
                    "country": classify_uk_country(postcode),
                    "raw_data": {"snippet": text_blob[:400]},
                    "confidence_score": 65,
                })
                kept += 1
            if kept == 0:
                break
            await asyncio.sleep(0.8)
            if page % 5 == 0:
                log.info("freeindex_progress", page=page, total=len(out))
    log.info("freeindex_collected", total=len(out))
    return out


# ═══════════════════════════════════════════════════════════════
# Thomson Local — UK phone directory
# ═══════════════════════════════════════════════════════════════
THOMSON_BASE = "https://www.thomsonlocal.com"


async def scrape_thomson(max_pages: int = 30) -> list[dict[str, Any]]:
    browser = BrowserConfig(
        headless=True, user_agent_mode="random", viewport_width=1366, viewport_height=800
    )
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    async with AsyncWebCrawler(config=browser) as crawler:
        for page in range(1, max_pages + 1):
            url = f"{THOMSON_BASE}/search/uk/electrical-contractors?page={page}"
            try:
                res = await crawler.arun(
                    url=url,
                    config=CrawlerRunConfig(
                        cache_mode=CacheMode.BYPASS,
                        wait_for="css:article, .listing, .business",
                        page_timeout=30000,
                    ),
                )
            except Exception as e:
                log.warning("thomson_fetch_failed", page=page, error=str(e))
                break
            if not res.success or not res.html:
                break
            soup = BeautifulSoup(res.html, "lxml")
            cards = soup.select("article, .listing, .business")
            if not cards:
                break
            kept = 0
            for card in cards:
                name_el = card.select_one("h2, h3, .name")
                name = name_el.get_text(strip=True) if name_el else ""
                if not name:
                    continue
                text_blob = card.get_text(" ", strip=True)
                postcode = extract_postcode(text_blob)
                sid = f"thomson:{name}:{postcode or ''}".lower()
                if sid in seen:
                    continue
                seen.add(sid)
                phone = None
                tel = card.select_one("a[href^='tel:']")
                if tel:
                    phone = tel.get("href", "").replace("tel:", "").strip()
                website = None
                for a in card.select("a[href^='http']"):
                    href = a.get("href", "")
                    if "thomsonlocal" not in href:
                        website = href
                        break
                out.append({
                    "source": "thomson_local",
                    "source_id": sid,
                    "company_name": name,
                    "phone": phone,
                    "website": website,
                    "postcode": postcode,
                    "country": classify_uk_country(postcode),
                    "raw_data": {"snippet": text_blob[:300]},
                    "confidence_score": 65 if website else 55,
                })
                kept += 1
            if kept == 0:
                break
            await asyncio.sleep(0.8)
    log.info("thomson_collected", total=len(out))
    return out
