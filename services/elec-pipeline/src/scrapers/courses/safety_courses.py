"""Health & Safety / Access Training Scrapers.

Scrapes IPAF, PASMA, First Aid, SMSTS/SSSTS, and general H&S courses.
All sites are simple — no stealth needed.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any

import structlog
from bs4 import BeautifulSoup

from src.scrapers.browser import fetch_page_html

log = structlog.get_logger()

WAIT_BETWEEN_SITES = 3.0

# -----------------------------------------------------------------------
# Site definitions
# -----------------------------------------------------------------------

_SITES = [
    {
        "name": "Nationwide Platforms",
        "url": "https://training.nationwideplatforms.co.uk/en-gb/ipaf-training-courses",
        "category": "IPAF / PASMA",
    },
    {
        "name": "PASMA Training",
        "url": "https://pasmatraining.uk/",
        "category": "IPAF / PASMA",
    },
    {
        "name": "Red Cross First Aid",
        "url": "https://www.redcrossfirstaidtraining.co.uk/courses/first-aid-training/",
        "category": "Health & Safety",
    },
    {
        "name": "Target Zero",
        "url": "https://targetzerotraining.co.uk/smsts/",
        "category": "Health & Safety",
    },
    {
        "name": "HCS Safety",
        "url": "https://hcssafety.co.uk/health-and-safety-courses/",
        "category": "Health & Safety",
    },
]


def _extract_price(text: str | None) -> float | None:
    """Extract numeric price from text."""
    if not text:
        return None
    match = re.search(r"[£$]([\d,]+(?:\.\d+)?)", text)
    if match:
        try:
            return float(match.group(1).replace(",", ""))
        except ValueError:
            pass
    return None


def _extract_duration(text: str) -> str | None:
    """Extract duration from text."""
    match = re.search(r"(\d+)\s*(day|week|hour|month)s?", text, re.I)
    if match:
        return f"{match.group(1)} {match.group(2).lower()}s"
    return None


def _parse_safety_page(
    html: str, provider_name: str, category: str, base_url: str
) -> list[dict[str, Any]]:
    """Generic parser for safety/access training provider pages."""
    soup = BeautifulSoup(html, "lxml")
    courses: list[dict] = []

    # Try various selectors
    cards = (
        soup.find_all("div", class_=re.compile(r"course|training|product|card", re.I))
        or soup.find_all("article")
        or soup.find_all("li", class_=re.compile(r"course|product", re.I))
    )

    for card in cards:
        try:
            # Title
            title_elem = (
                card.find("h2")
                or card.find("h3")
                or card.find("h4")
                or card.find("a", class_=re.compile(r"title|name", re.I))
            )
            if not title_elem:
                continue
            title = title_elem.get_text(strip=True)
            if not title or len(title) < 5:
                continue

            # Skip nav elements
            if title.lower() in (
                "home",
                "about",
                "contact",
                "courses",
                "blog",
                "news",
                "menu",
            ):
                continue

            # URL
            link = card.find("a", href=True)
            url = None
            if link and link.get("href"):
                href = link["href"]
                if href.startswith("http"):
                    url = href
                elif href.startswith("/"):
                    url = base_url.rstrip("/") + href

            # Price
            card_text = card.get_text()
            price = _extract_price(card_text)

            # Duration
            duration = _extract_duration(card_text)

            # Format
            fmt = "Classroom"
            if "online" in card_text.lower():
                fmt = "Online"
            elif "blended" in card_text.lower():
                fmt = "Blended"

            # Venue
            venue_elem = card.find(class_=re.compile(r"venue|location|city", re.I))
            venue = venue_elem.get_text(strip=True) if venue_elem else None

            courses.append(
                {
                    "title": title,
                    "provider": provider_name,
                    "category_override": category,
                    "price": price,
                    "duration": duration,
                    "format": fmt,
                    "location": venue,
                    "url": url,
                    "source": "safety_scrape",
                }
            )
        except Exception as e:
            log.warning(
                "safety_card_error", provider=provider_name, error=str(e)
            )
            continue

    return courses


async def scrape_safety_courses() -> list[dict[str, Any]]:
    """Scrape all health & safety / access training provider sites."""
    all_courses: list[dict] = []

    for site in _SITES:
        try:
            # Extract base URL for relative link resolution
            from urllib.parse import urlparse

            parsed = urlparse(site["url"])
            base_url = f"{parsed.scheme}://{parsed.netloc}"

            html = await fetch_page_html(site["url"], wait_time=2.0)
            courses = _parse_safety_page(
                html, site["name"], site["category"], base_url
            )
            all_courses.extend(courses)
            log.info(
                "safety_provider_done",
                provider=site["name"],
                count=len(courses),
            )
        except Exception as e:
            log.error(
                "safety_provider_error",
                provider=site["name"],
                error=str(e),
            )
        await asyncio.sleep(WAIT_BETWEEN_SITES)

    log.info("safety_courses_total", count=len(all_courses))
    return all_courses
