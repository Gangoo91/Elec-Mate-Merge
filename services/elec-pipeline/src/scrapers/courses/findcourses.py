"""FindCourses.co.uk Scraper.

Scrapes findcourses.co.uk — UK course aggregator with good data quality.
Cards use <div class="serp-list_inner"> with serp-list_* child classes.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any

import structlog
from bs4 import BeautifulSoup

from src.scrapers.browser import fetch_page_html

log = structlog.get_logger()

BASE_URL = "https://www.findcourses.co.uk"

SEARCH_TERMS = [
    "electrician-courses",
    "electrical-training-courses",
    "18th-edition-courses",
    "health-and-safety-training",
    "ipaf-training",
    "pasma-training",
    "first-aid-courses",
    "project-management-courses",
    "hnc-electrical-engineering",
    "electrical-apprenticeship",
    "ev-charging-courses",
    "solar-pv-training",
    "fire-alarm-courses",
]

PAGES_PER_TERM = 2
WAIT_BETWEEN_PAGES = 3.0


def _build_url(term: str, page: int) -> str:
    """Build a FindCourses search URL."""
    url = f"{BASE_URL}/search/{term}"
    if page > 1:
        url += f"?page={page}"
    return url


async def scrape_findcourses() -> list[dict[str, Any]]:
    """Scrape FindCourses.co.uk course listings."""
    all_courses: list[dict] = []
    seen: set[str] = set()

    for term in SEARCH_TERMS:
        for page in range(1, PAGES_PER_TERM + 1):
            try:
                url = _build_url(term, page)
                html = await fetch_page_html(url, wait_time=3.0)
                courses = _parse_page(html, seen)
                all_courses.extend(courses)
                log.info(
                    "findcourses_page",
                    term=term,
                    page=page,
                    found=len(courses),
                )
                if not courses:
                    break
            except Exception as e:
                log.error(
                    "findcourses_page_error",
                    term=term,
                    page=page,
                    error=str(e),
                )
                break
            await asyncio.sleep(WAIT_BETWEEN_PAGES)

    log.info("findcourses_total", count=len(all_courses))
    return all_courses


def _parse_page(html: str, seen: set[str]) -> list[dict[str, Any]]:
    """Parse a FindCourses results page."""
    soup = BeautifulSoup(html, "lxml")
    courses: list[dict] = []

    # FindCourses cards: <div class="serp-list_inner"> or find via h2.serp-list_title
    cards = soup.find_all("div", class_="serp-list_inner")
    if not cards:
        # Fallback: find title h2s and walk up to card container
        titles = soup.find_all("h2", class_="serp-list_title")
        for t in titles:
            parent = t.find_parent("div", class_=re.compile(r"serp-list"))
            if parent and parent not in cards:
                cards.append(parent)

    for card in cards:
        try:
            # Title — <h2 class="serp-list_title">
            title_elem = card.find("h2", class_="serp-list_title")
            if not title_elem:
                title_elem = card.find("h2") or card.find("h3")
            if not title_elem:
                continue
            title = title_elem.get_text(strip=True)
            if not title or len(title) < 3:
                continue

            # URL — <a> wrapping or near the title, linking to /training/
            link = card.find("a", href=re.compile(r"/training/"))
            external_url = None
            if link and link.get("href"):
                href = link["href"]
                external_url = href if href.startswith("http") else BASE_URL + href

            # Provider — <div class="serp-list_subtitle"> e.g. "Trades Education|Vocational"
            subtitle = card.find("div", class_="serp-list_subtitle")
            provider = None
            if subtitle:
                # Provider is the first part before "|"
                text = subtitle.get_text(strip=True)
                provider = text.split("|")[0].strip() if "|" in text else text

            # Location — <li class="serp-list__flag-place">
            location_elem = card.find("li", class_=re.compile(r"flag-place"))
            venue_city = None
            if location_elem:
                venue_city = location_elem.get_text(strip=True)

            # Format — <li class="serp-list__flag-deliverymethod">
            format_elem = card.find("li", class_=re.compile(r"flag-deliverymethod"))
            fmt = format_elem.get_text(strip=True) if format_elem else None

            # Price — look for price text in flags or card
            price_val = None
            price_elems = card.find_all(
                "li", class_=re.compile(r"flag-price")
            )
            if price_elems:
                price_text = price_elems[0].get_text(strip=True)
                match = re.search(r"[\d,]+(?:\.\d+)?", price_text.replace(",", ""))
                if match:
                    try:
                        price_val = float(match.group())
                    except ValueError:
                        pass
            # Also check for "Free" in flags
            if not price_val:
                flags_text = card.get_text().lower()
                if "free" in flags_text and "free" in (
                    card.find("li", class_=re.compile(r"flag")) or card
                ).get_text().lower():
                    price_val = 0.0

            # Duration — look in flags
            duration = None
            for flag in card.find_all("li", class_=re.compile(r"flag")):
                flag_text = flag.get_text(strip=True)
                if re.search(r"\d+\s*(day|week|month|hour|year)s?", flag_text, re.I):
                    duration = flag_text
                    break

            # Dedup
            dedup_key = f"{title.lower()}|{(provider or '').lower()}"
            if dedup_key in seen:
                continue
            seen.add(dedup_key)

            courses.append(
                {
                    "title": title,
                    "provider": provider,
                    "price": price_val,
                    "duration": duration,
                    "format": fmt,
                    "location": venue_city,
                    "url": external_url,
                    "source": "findcourses_scrape",
                }
            )
        except Exception as e:
            log.warning("findcourses_card_error", error=str(e))
            continue

    return courses
