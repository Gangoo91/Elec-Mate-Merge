"""Reed Courses Scraper.

Scrapes reed.co.uk/courses — biggest UK training aggregator (1000+ courses).
Reed allows AI crawlers — no stealth needed.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any

import structlog
from bs4 import BeautifulSoup

from src.scrapers.browser import fetch_page_html

log = structlog.get_logger()

BASE_URL = "https://www.reed.co.uk"

SEARCH_TERMS = [
    "electrician",
    "electrical-engineering",
    "18th-edition",
    "inspection-and-testing",
    "ev-charging",
    "solar-pv",
    "fire-alarm",
    "pat-testing",
    "health-and-safety",
    "ipaf",
    "pasma",
    "first-aid",
    "smsts",
    "prince2",
    "project-management",
    "hnc-electrical",
    "compex",
]

PAGES_PER_TERM = 3
WAIT_BETWEEN_PAGES = 2.0


def _build_url(term: str, page: int) -> str:
    """Build a Reed courses search URL."""
    url = f"{BASE_URL}/courses/{term}"
    if page > 1:
        url += f"?pageno={page}"
    return url


def _parse_price(text: str | None) -> tuple[str | None, int | None]:
    """Extract price string and numeric pence value."""
    if not text:
        return None, None
    match = re.search(r"[£$]([\d,]+(?:\.\d+)?)", text)
    if match:
        try:
            val = float(match.group(1).replace(",", ""))
            return f"\u00a3{val:,.2f}", int(val * 100)
        except ValueError:
            pass
    if "free" in text.lower():
        return "Free", 0
    return text.strip(), None


def _infer_format(text: str) -> tuple[str, bool]:
    """Infer course format and is_online from text."""
    t = text.lower()
    if "online" in t or "distance" in t or "e-learning" in t:
        return "Online", True
    if "classroom" in t or "in-person" in t or "venue" in t:
        return "Classroom", False
    if "blended" in t:
        return "Blended", False
    return "Classroom", False


async def scrape_reed_courses() -> list[dict[str, Any]]:
    """Scrape Reed.co.uk course listings."""
    all_courses: list[dict] = []
    seen: set[str] = set()  # title+provider dedup

    for term in SEARCH_TERMS:
        for page in range(1, PAGES_PER_TERM + 1):
            try:
                url = _build_url(term, page)
                html = await fetch_page_html(url, wait_time=1.5)
                courses = _parse_courses_page(html, seen)
                all_courses.extend(courses)
                log.info(
                    "reed_courses_page",
                    term=term,
                    page=page,
                    found=len(courses),
                )
                if not courses:
                    break
            except Exception as e:
                log.error(
                    "reed_courses_page_error",
                    term=term,
                    page=page,
                    error=str(e),
                )
                break
            await asyncio.sleep(WAIT_BETWEEN_PAGES)

    log.info("reed_courses_total", count=len(all_courses))
    return all_courses


def _parse_courses_page(
    html: str, seen: set[str]
) -> list[dict[str, Any]]:
    """Parse a Reed courses search results page."""
    soup = BeautifulSoup(html, "lxml")
    courses: list[dict] = []

    # Reed course cards — <article data-qa="searchCards" class="course-card">
    cards = soup.find_all("article", attrs={"data-qa": "searchCards"})
    if not cards:
        cards = soup.find_all("article", class_=re.compile(r"course[-_]?card", re.I))

    for card in cards:
        try:
            # Title — <h2 class="course-card-title"> or <h2 class="h3 course-card-title">
            title_elem = card.find("h2", class_=re.compile(r"course-card-title"))
            if not title_elem:
                title_elem = card.find("h2") or card.find("h3")
            if not title_elem:
                continue
            title = title_elem.get_text(strip=True)
            if not title or len(title) < 3:
                continue

            # URL — <a class="ga4-select-item"> inside h2
            link = title_elem.find("a") or card.find("a", href=re.compile(r"/courses/"))
            external_url = None
            if link and link.get("href"):
                href = link["href"]
                external_url = href if href.startswith("http") else BASE_URL + href

            # Provider — <div class="provider-name">
            provider_elem = card.find("div", class_="provider-name")
            if not provider_elem:
                provider_elem = card.find(
                    class_=re.compile(r"provider|organisation", re.I)
                )
            provider = provider_elem.get_text(strip=True) if provider_elem else None

            # Price — <span class="price">
            price_elem = card.find("span", class_="price")
            if not price_elem:
                price_elem = card.find(class_=re.compile(r"course-price|price", re.I))
            price_text = price_elem.get_text(strip=True) if price_elem else None
            price_str, price_numeric = _parse_price(price_text)

            # Key info bubbles — <li class="key-info-bubble"> → <span class="bubble-text">
            bubbles = card.find_all("li", class_="key-info-bubble")
            duration = None
            fmt = "Classroom"
            is_online = False
            for bubble in bubbles:
                text_elem = bubble.find("span", class_="bubble-text")
                if not text_elem:
                    continue
                text = text_elem.get_text(strip=True)
                # Duration: "27 days", "5 hours", "12 weeks"
                if re.search(r"\d+\s*(day|hour|week|month)", text, re.I):
                    duration = text
                # Format: "Classroom", "Online", "Distance learning"
                elif text.lower() in ("classroom", "online", "distance learning", "blended"):
                    fmt, is_online = _infer_format(text)

            # Location
            location_elem = card.find(class_=re.compile(r"location|venue", re.I))
            location = location_elem.get_text(strip=True) if location_elem else None

            # Dedup
            dedup_key = f"{title.lower()}|{(provider or '').lower()}"
            if dedup_key in seen:
                continue
            seen.add(dedup_key)

            courses.append(
                {
                    "title": title,
                    "provider": provider,
                    "price": price_str,
                    "price_numeric": price_numeric,
                    "duration": duration,
                    "format": fmt,
                    "is_online": is_online,
                    "location": location,
                    "url": external_url,
                    "source": "reed_courses_scrape",
                }
            )
        except Exception as e:
            log.warning("reed_course_parse_error", error=str(e))
            continue

    return courses
