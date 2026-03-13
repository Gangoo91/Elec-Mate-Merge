"""Gumtree Jobs Scraper.

Scrapes job listings from gumtree.com — supplement only (limited data).
No salary data on search pages, but provides additional coverage.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any

import structlog
from bs4 import BeautifulSoup

from src.scrapers.browser import fetch_page_html

log = structlog.get_logger()

BASE_URL = "https://www.gumtree.com"

KEYWORDS = [
    "electrician",
    "electrical",
    "solar installer",
    "EV charger",
]

PAGES_PER_KEYWORD = 2
WAIT_BETWEEN_PAGES = 3.0


def _build_url(keyword: str, page: int) -> str:
    """Build a Gumtree job search URL."""
    slug = keyword.lower().replace(" ", "+")
    url = f"{BASE_URL}/search?search_category=jobs&q={slug}"
    if page > 1:
        url += f"&page={page}"
    return url


async def scrape_gumtree_jobs() -> list[dict[str, Any]]:
    """Scrape Gumtree job listings for electrical roles."""
    all_jobs: list[dict] = []
    seen: set[str] = set()

    for keyword in KEYWORDS:
        for page in range(1, PAGES_PER_KEYWORD + 1):
            try:
                url = _build_url(keyword, page)
                html = await fetch_page_html(url, wait_time=2.0)
                jobs = _parse_search_page(html, seen)
                all_jobs.extend(jobs)
                log.info(
                    "gumtree_jobs_page",
                    keyword=keyword,
                    page=page,
                    found=len(jobs),
                )
                if not jobs:
                    break
            except Exception as e:
                log.error(
                    "gumtree_jobs_page_error",
                    keyword=keyword,
                    page=page,
                    error=str(e),
                )
                break
            await asyncio.sleep(WAIT_BETWEEN_PAGES)

    log.info("gumtree_jobs_total", count=len(all_jobs))
    return all_jobs


def _parse_search_page(
    html: str, seen: set[str]
) -> list[dict[str, Any]]:
    """Parse a Gumtree search results page."""
    soup = BeautifulSoup(html, "lxml")
    jobs: list[dict] = []

    # Gumtree listing cards — <article> with listing class
    cards = soup.find_all("article", class_=re.compile(r"listing", re.I))

    for card in cards:
        try:
            # Title — <div data-q="tile-title">
            title_elem = card.find(attrs={"data-q": "tile-title"})
            if not title_elem:
                continue
            title = title_elem.get_text(strip=True)
            if not title or len(title) < 3:
                continue

            # Skip non-job results
            if any(
                kw in title.lower()
                for kw in ["wanted", "looking for", "seeking", "buy", "sale"]
            ):
                continue

            # URL — <a data-q="search-result-anchor">
            link = card.find("a", attrs={"data-q": "search-result-anchor"})
            if not link:
                link = card.find("a", href=re.compile(r"/p/"))
            apply_url = None
            if link and link.get("href"):
                href = link["href"]
                apply_url = href if href.startswith("http") else BASE_URL + href

            # Location — <div data-q="tile-location">
            location_elem = card.find(attrs={"data-q": "tile-location"})
            location = location_elem.get_text(strip=True) if location_elem else "UK"

            # Salary — look for GBP text in card
            salary = None
            card_text = card.get_text()
            salary_match = re.search(
                r"([\d,.]+)\s*-\s*([\d,.]+)\s*GBP\s*(Annual|Hourly|Daily)?",
                card_text, re.I,
            )
            if salary_match:
                low = salary_match.group(1)
                high = salary_match.group(2)
                period = salary_match.group(3) or "Annual"
                salary = f"\u00a3{low} - \u00a3{high} {period}"

            # Posted date — <div data-q="tile-posted-date">
            date_elem = card.find(attrs={"data-q": "tile-posted-date"})
            posted_date = date_elem.get_text(strip=True) if date_elem else None

            # Dedup
            dedup_key = f"{title.lower()}|{location.lower()}"
            if dedup_key in seen:
                continue
            seen.add(dedup_key)

            jobs.append(
                {
                    "title": title,
                    "company": None,
                    "location": location,
                    "salary": None,
                    "employment_type": "Full-time",
                    "description": None,
                    "apply_url": apply_url,
                    "date_posted": posted_date,
                    "source": "gumtree",
                    "external_id": apply_url,
                    "region": "UK",
                }
            )
        except Exception as e:
            log.warning("gumtree_card_parse_error", error=str(e))
            continue

    return jobs
