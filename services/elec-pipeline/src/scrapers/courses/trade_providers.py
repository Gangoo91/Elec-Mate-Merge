"""Direct Training Provider Scrapers.

Scrapes course listings from specialist electrical training providers,
further education providers, and professional development sites.
Each site is simple (WordPress/Shopify/WooCommerce) — no stealth needed.
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
# Provider site definitions
# -----------------------------------------------------------------------

_PROVIDERS = [
    {
        "name": "Trade Skills 4U",
        "url": "https://www.tradeskills4u.co.uk/pages/courses",
        "parse": "_parse_tradeskills4u",
    },
    {
        "name": "Able Skills",
        "url": "https://www.ableskills.co.uk/electrician-training-courses/",
        "parse": "_parse_ableskills",
    },
    {
        "name": "EC4U",
        "url": "https://electriciancourses4u.co.uk/courses/",
        "parse": "_parse_ec4u",
    },
    {
        "name": "Total Skills",
        "url": "https://www.totalskills.co.uk/courses",
        "parse": "_parse_totalskills",
    },
    {
        "name": "Learn Trade Skills",
        "url": "https://www.learntradeskills.co.uk/courses",
        "parse": "_parse_learntradeskills",
    },
    {
        "name": "NICEIC Shop",
        "url": "https://shop.niceic.com/pages/electrical-training",
        "parse": "_parse_niceic",
    },
    {
        "name": "Logic4training",
        "url": "https://www.logic4training.co.uk/courses/electrical/",
        "parse": "_parse_logic4training",
    },
    # --- Further Education / Professional Dev / Renewables ---
    {
        "name": "Logic4training Renewables",
        "url": "https://www.logic4training.co.uk/courses/renewables/",
        "parse": "_parse_logic4training",
    },
    {
        "name": "The Knowledge Academy",
        "url": "https://www.theknowledgeacademy.com/gb/courses/prince2-training/",
        "parse": "_parse_knowledge_academy",
    },
    {
        "name": "The Knowledge Academy",
        "url": "https://www.theknowledgeacademy.com/gb/courses/project-management-training/",
        "parse": "_parse_knowledge_academy",
    },
    {
        "name": "CP Training Services",
        "url": "https://www.cptrainingservices.co.uk/",
        "parse": "_parse_cp_training",
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


def _extract_duration(text: str | None) -> str | None:
    """Extract duration from text."""
    if not text:
        return None
    # Match "5 days", "3 weeks", "12 hours", "2 day", etc.
    match = re.search(r"(\d+)\s*(day|week|hour|month)s?", text, re.I)
    if match:
        return f"{match.group(1)} {match.group(2).lower()}s"
    return text.strip() if text.strip() else None


# -----------------------------------------------------------------------
# Generic card parser (works for most WordPress/Shopify sites)
# -----------------------------------------------------------------------


def _parse_generic_cards(
    html: str, provider_name: str, base_url: str
) -> list[dict[str, Any]]:
    """Generic parser that extracts course cards from provider pages."""
    soup = BeautifulSoup(html, "lxml")
    courses: list[dict] = []

    # Try various card selectors
    cards = (
        soup.find_all("div", class_=re.compile(r"course|product|card", re.I))
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

            # Skip nav/non-course elements
            if title.lower() in (
                "home",
                "about",
                "contact",
                "courses",
                "blog",
                "news",
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
            price_elem = card.find(
                class_=re.compile(r"price|cost|amount", re.I)
            ) or card.find(string=re.compile(r"[£$]\d"))
            price_text = None
            if price_elem:
                price_text = (
                    price_elem.get_text(strip=True)
                    if hasattr(price_elem, "get_text")
                    else str(price_elem).strip()
                )
            price = _extract_price(price_text or card.get_text())

            # Duration
            duration_elem = card.find(class_=re.compile(r"duration|length|days", re.I))
            duration = _extract_duration(
                duration_elem.get_text(strip=True) if duration_elem else card.get_text()
            )

            # Location
            venue_elem = card.find(class_=re.compile(r"venue|location|city", re.I))
            venue = venue_elem.get_text(strip=True) if venue_elem else None

            # Next dates
            date_elem = card.find(class_=re.compile(r"date|next|schedule|start", re.I))
            next_dates = None
            if date_elem:
                date_text = date_elem.get_text(strip=True)
                if date_text and len(date_text) > 3:
                    next_dates = [date_text]

            courses.append(
                {
                    "title": title,
                    "provider": provider_name,
                    "price": price,
                    "duration": duration,
                    "location": venue,
                    "dates": next_dates,
                    "url": url,
                    "source": "provider_scrape",
                }
            )
        except Exception as e:
            log.warning(
                "provider_card_error", provider=provider_name, error=str(e)
            )
            continue

    return courses


# -----------------------------------------------------------------------
# Site-specific parsers (override generic where needed)
# -----------------------------------------------------------------------


def _parse_tradeskills4u(html: str) -> list[dict[str, Any]]:
    """Parse Trade Skills 4U courses page."""
    return _parse_generic_cards(
        html, "Trade Skills 4U", "https://www.tradeskills4u.co.uk"
    )


def _parse_ableskills(html: str) -> list[dict[str, Any]]:
    """Parse Able Skills courses page."""
    return _parse_generic_cards(
        html, "Able Skills", "https://www.ableskills.co.uk"
    )


def _parse_ec4u(html: str) -> list[dict[str, Any]]:
    """Parse EC4U courses page. May have JSON-LD data."""
    soup = BeautifulSoup(html, "lxml")
    courses: list[dict] = []

    # Try JSON-LD first
    import json

    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string)
            items = data if isinstance(data, list) else [data]
            for item in items:
                if item.get("@type") in ("Course", "Product"):
                    price = None
                    offers = item.get("offers", {})
                    if isinstance(offers, dict):
                        price = offers.get("price")
                    elif isinstance(offers, list) and offers:
                        price = offers[0].get("price")

                    courses.append(
                        {
                            "title": item.get("name", ""),
                            "provider": "EC4U",
                            "price": float(price) if price else None,
                            "duration": item.get("timeRequired") or item.get("duration"),
                            "url": item.get("url"),
                            "source": "provider_scrape",
                        }
                    )
        except (json.JSONDecodeError, TypeError):
            continue

    if courses:
        return courses

    # Fallback to card parsing
    return _parse_generic_cards(
        html, "EC4U", "https://electriciancourses4u.co.uk"
    )


def _parse_totalskills(html: str) -> list[dict[str, Any]]:
    """Parse Total Skills courses page."""
    return _parse_generic_cards(
        html, "Total Skills", "https://www.totalskills.co.uk"
    )


def _parse_learntradeskills(html: str) -> list[dict[str, Any]]:
    """Parse Learn Trade Skills courses page."""
    return _parse_generic_cards(
        html, "Learn Trade Skills", "https://www.learntradeskills.co.uk"
    )


def _parse_niceic(html: str) -> list[dict[str, Any]]:
    """Parse NICEIC Shop training page (Shopify)."""
    return _parse_generic_cards(
        html, "NICEIC", "https://shop.niceic.com"
    )


def _parse_logic4training(html: str) -> list[dict[str, Any]]:
    """Parse Logic4training courses page (electrical + renewables)."""
    return _parse_generic_cards(
        html, "Logic4training", "https://www.logic4training.co.uk"
    )


def _parse_knowledge_academy(html: str) -> list[dict[str, Any]]:
    """Parse The Knowledge Academy — JS-heavy, extract from course links."""
    soup = BeautifulSoup(html, "lxml")
    courses: list[dict] = []

    # TKA renders course lists as <a> links to /courses/ paths
    skip_texts = {
        "home", "about", "contact", "courses", "blog", "view all",
        "see full course catalogue", "training", "discover",
    }

    links = soup.find_all("a", href=re.compile(r"/courses/[a-z]"))
    for link in links:
        try:
            title = link.get_text(strip=True)
            if not title or len(title) < 4:
                continue
            if title.lower() in skip_texts:
                continue

            href = link.get("href", "")
            url = href if href.startswith("http") else "https://www.theknowledgeacademy.com" + href

            courses.append(
                {
                    "title": title,
                    "provider": "The Knowledge Academy",
                    "price": None,
                    "duration": None,
                    "url": url,
                    "source": "provider_scrape",
                }
            )
        except Exception as e:
            log.warning("knowledge_academy_link_error", error=str(e))
            continue

    return courses


def _parse_cp_training(html: str) -> list[dict[str, Any]]:
    """Parse CP Training Services — CompEx specialist (links in nav/content)."""
    soup = BeautifulSoup(html, "lxml")
    courses: list[dict] = []

    skip_texts = {
        "home", "about", "contact", "courses", "blog", "training and assessment",
        "cookie settings", "manage cookies",
    }

    links = soup.find_all("a", href=re.compile(r"/course|/training|compex", re.I))
    for link in links:
        try:
            title = link.get_text(strip=True)
            if not title or len(title) < 5:
                continue
            if title.lower() in skip_texts:
                continue

            href = link.get("href", "")
            url = href if href.startswith("http") else "https://www.cptrainingservices.co.uk" + href

            courses.append(
                {
                    "title": title,
                    "provider": "CP Training Services",
                    "price": None,
                    "duration": None,
                    "url": url,
                    "source": "provider_scrape",
                }
            )
        except Exception as e:
            log.warning("cp_training_link_error", error=str(e))
            continue

    return courses


def _parse_generic_provider(html: str) -> list[dict[str, Any]]:
    """Generic parser for specialist provider sites."""
    return _parse_generic_cards(html, "Provider", "")


# -----------------------------------------------------------------------
# Map parser name to function
# -----------------------------------------------------------------------

_PARSERS = {
    "_parse_tradeskills4u": _parse_tradeskills4u,
    "_parse_ableskills": _parse_ableskills,
    "_parse_ec4u": _parse_ec4u,
    "_parse_totalskills": _parse_totalskills,
    "_parse_learntradeskills": _parse_learntradeskills,
    "_parse_niceic": _parse_niceic,
    "_parse_logic4training": _parse_logic4training,
    "_parse_knowledge_academy": _parse_knowledge_academy,
    "_parse_cp_training": _parse_cp_training,
    "_parse_generic_provider": _parse_generic_provider,
}


# -----------------------------------------------------------------------
# Main entry point
# -----------------------------------------------------------------------


async def scrape_trade_providers() -> list[dict[str, Any]]:
    """Scrape all direct training provider sites."""
    all_courses: list[dict] = []
    seen: set[str] = set()

    for provider in _PROVIDERS:
        try:
            html = await fetch_page_html(provider["url"], wait_time=2.0)
            parser = _PARSERS[provider["parse"]]
            courses = parser(html)
            # Override provider name from config (generic parsers use placeholder)
            for c in courses:
                if c.get("provider") == "Provider" or not c.get("provider"):
                    c["provider"] = provider["name"]

            # Dedup across providers
            unique = []
            for c in courses:
                key = f"{c['title'].lower()}|{(c.get('provider') or '').lower()}"
                if key not in seen:
                    seen.add(key)
                    unique.append(c)

            all_courses.extend(unique)
            log.info(
                "trade_provider_done",
                provider=provider["name"],
                url=provider["url"],
                count=len(unique),
            )
        except Exception as e:
            log.error(
                "trade_provider_error",
                provider=provider["name"],
                error=str(e),
            )
        await asyncio.sleep(WAIT_BETWEEN_SITES)

    log.info("trade_providers_total", count=len(all_courses))
    return all_courses
