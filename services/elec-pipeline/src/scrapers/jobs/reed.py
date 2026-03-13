"""Reed.co.uk Jobs Scraper.

Scrapes job listings from reed.co.uk search results pages.
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

KEYWORDS = [
    "electrician",
    "electrical engineer",
    "electrical installer",
    "EV installer",
    "solar installer",
    "fire alarm engineer",
    "electrical maintenance",
    "site electrician",
    "electrical testing",
    "cable jointer",
    "electrical project manager",
]

LOCATIONS = [
    "",  # nationwide (no location filter)
    "london",
    "manchester",
    "birmingham",
    "leeds",
    "glasgow",
    "bristol",
    "cardiff",
    "newcastle",
    "edinburgh",
    "sheffield",
]

PAGES_PER_COMBO = 3
WAIT_BETWEEN_PAGES = 3.0


def _build_url(keyword: str, location: str, page: int) -> str:
    """Build a Reed search URL."""
    slug = keyword.lower().replace(" ", "-")
    if location:
        url = f"{BASE_URL}/jobs/{slug}-jobs-in-{location}"
    else:
        url = f"{BASE_URL}/jobs/{slug}-jobs"
    if page > 1:
        url += f"?pageno={page}"
    return url


def _parse_salary(text: str | None) -> tuple[str | None, float | None, float | None]:
    """Extract salary string, min and max from raw text."""
    if not text:
        return None, None, None

    text = text.strip()

    # Match patterns like "£30,000 - £40,000" or "£25,000 - £35,000 per annum"
    range_match = re.search(
        r"[£$]?([\d,]+(?:\.\d+)?)\s*[-–]\s*[£$]?([\d,]+(?:\.\d+)?)", text
    )
    if range_match:
        try:
            low = float(range_match.group(1).replace(",", ""))
            high = float(range_match.group(2).replace(",", ""))
            return text, low, high
        except ValueError:
            pass

    # Single value like "£35,000"
    single_match = re.search(r"[£$]([\d,]+(?:\.\d+)?)", text)
    if single_match:
        try:
            val = float(single_match.group(1).replace(",", ""))
            return text, val, val
        except ValueError:
            pass

    return text, None, None


def _parse_employment_type(text: str | None) -> str:
    """Infer employment type from job card text."""
    if not text:
        return "Full-time"
    t = text.lower()
    if "contract" in t:
        return "Contract"
    if "temporary" in t or "temp" in t:
        return "Temporary"
    if "part-time" in t or "part time" in t:
        return "Part-time"
    return "Full-time"


def _location_to_region(location: str, search_location: str) -> str:
    """Map a location string to a region for caching."""
    loc = (location or search_location or "UK").lower()
    region_map = {
        "london": "London",
        "south east": "South East England",
        "south west": "South West England",
        "manchester": "North West England",
        "liverpool": "North West England",
        "birmingham": "West Midlands",
        "west midlands": "West Midlands",
        "east midlands": "East Midlands",
        "leeds": "Yorkshire",
        "sheffield": "Yorkshire",
        "yorkshire": "Yorkshire",
        "newcastle": "North East England",
        "north east": "North East England",
        "glasgow": "Scotland",
        "edinburgh": "Scotland",
        "scotland": "Scotland",
        "cardiff": "Wales",
        "wales": "Wales",
        "bristol": "South West England",
        "east anglia": "East Anglia",
        "norwich": "East Anglia",
        "cambridge": "East Anglia",
    }
    for key, region in region_map.items():
        if key in loc:
            return region
    return "UK"


async def scrape_reed_jobs() -> list[dict[str, Any]]:
    """Scrape Reed.co.uk job search results."""
    all_jobs: list[dict] = []
    seen: set[str] = set()  # title+company dedup

    for keyword in KEYWORDS:
        for location in LOCATIONS:
            for page in range(1, PAGES_PER_COMBO + 1):
                try:
                    url = _build_url(keyword, location, page)
                    html = await fetch_page_html(url, wait_time=2.0)
                    jobs = _parse_search_page(html, location, seen)
                    all_jobs.extend(jobs)
                    log.info(
                        "reed_jobs_page",
                        keyword=keyword,
                        location=location or "nationwide",
                        page=page,
                        found=len(jobs),
                    )
                    if not jobs:
                        break  # No results on this page, stop paginating
                except Exception as e:
                    log.error(
                        "reed_jobs_page_error",
                        keyword=keyword,
                        location=location or "nationwide",
                        page=page,
                        error=str(e),
                    )
                    break  # Stop paginating on error
                await asyncio.sleep(WAIT_BETWEEN_PAGES)

    log.info("reed_jobs_total", count=len(all_jobs))
    return all_jobs


def _parse_search_page(
    html: str, search_location: str, seen: set[str]
) -> list[dict[str, Any]]:
    """Parse a Reed search results page and extract job cards."""
    soup = BeautifulSoup(html, "lxml")
    jobs: list[dict] = []

    # Reed job cards are <article> elements with data-qa="job-card"
    # or divs with class containing "job-card"
    cards = soup.find_all("article", attrs={"data-qa": "job-card"})
    if not cards:
        # Fallback: look for common job card patterns
        cards = soup.find_all("article", class_=re.compile(r"job[-_]?card", re.I))
    if not cards:
        # Another fallback: div-based cards
        cards = soup.find_all("div", class_=re.compile(r"job[-_]?card", re.I))

    for card in cards:
        try:
            # Title — <a data-qa="job-card-title">
            title_link = card.find("a", attrs={"data-qa": "job-card-title"})
            if not title_link:
                # Fallback
                title_elem = card.find("h2") or card.find("h3")
                if not title_elem:
                    continue
                title_link = title_elem.find("a")
                title = title_elem.get_text(strip=True)
            else:
                title = title_link.get_text(strip=True)
            if not title or len(title) < 3:
                continue

            apply_url = None
            link = title_link or card.find("a", href=re.compile(r"/jobs/"))
            if link and link.get("href"):
                href = link["href"]
                apply_url = href if href.startswith("http") else BASE_URL + href

            # Company — <div data-qa="job-posted-by"> contains <a> with company name
            posted_by = card.find(attrs={"data-qa": "job-posted-by"})
            company = None
            if posted_by:
                company_link = posted_by.find("a")
                if company_link:
                    company = company_link.get_text(strip=True)

            # Location — <li data-qa="job-metadata-location">
            location_elem = card.find(
                attrs={"data-qa": "job-metadata-location"}
            )
            location = (
                location_elem.get_text(strip=True)
                if location_elem
                else search_location
            )

            # Salary — <li data-qa="job-metadata-salary">
            salary_elem = card.find(
                attrs={"data-qa": "job-metadata-salary"}
            )
            salary_text = salary_elem.get_text(strip=True) if salary_elem else None
            salary, salary_min, salary_max = _parse_salary(salary_text)

            # Type — third <li> in job-metadata, or parse from card text
            metadata = card.find(attrs={"data-qa": "job-metadata"})
            emp_type = "Full-time"
            if metadata:
                items = metadata.find_all("li")
                for item in items:
                    text = item.get_text(strip=True).lower()
                    if any(kw in text for kw in ("permanent", "contract", "temporary", "part-time", "full-time")):
                        emp_type = _parse_employment_type(text)
                        break

            # Description snippet — <div data-qa="toggleDescriptionBtn"> sibling or excerpt
            description = None
            desc_elem = card.find(class_=re.compile(r"excerpt|description", re.I))
            if desc_elem:
                description = desc_elem.get_text(strip=True)

            # Posted date — from posted-by text before "by" (e.g. "3 March")
            posted_date = None
            if posted_by:
                # Get raw text, split on "by" to get date portion
                raw = posted_by.get_text(" ", strip=True)
                by_match = re.split(r"\bby\b", raw, maxsplit=1)
                if by_match and by_match[0].strip():
                    date_part = by_match[0].strip()
                    # Validate it looks like a date (e.g. "3 March", "Yesterday")
                    if re.match(r"^\d{1,2}\s+\w+$", date_part):
                        posted_date = date_part
                    elif date_part.lower() in ("today", "yesterday"):
                        posted_date = date_part

            # Dedup by title+company
            dedup_key = f"{title.lower()}|{(company or '').lower()}"
            if dedup_key in seen:
                continue
            seen.add(dedup_key)

            region = _location_to_region(location or "", search_location)

            jobs.append(
                {
                    "title": title,
                    "company": company,
                    "location": location,
                    "salary": salary,
                    "salary_min": salary_min,
                    "salary_max": salary_max,
                    "employment_type": emp_type,
                    "description": description,
                    "apply_url": apply_url,
                    "date_posted": posted_date,
                    "source": "reed",
                    "external_id": apply_url,
                    "region": region,
                }
            )
        except Exception as e:
            log.warning("reed_card_parse_error", error=str(e))
            continue

    return jobs
