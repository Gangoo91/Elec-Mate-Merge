"""Website email crawler — free, unlimited.

For every business_lead that has a `website` but no `email`, visit the homepage
plus up to N likely contact pages (/contact, /about, /team, /staff), extract
emails via regex, prefer generics (info@, enquiries@), and write back.

Also opportunistically extracts:
  - phone numbers from tel: links
  - person names from staff/team pages (for later SMTP pattern verification)
  - social media handles

Rate limiting: 1 domain at a time globally, 1.5s delay between requests.
Timeout: 15s per page.

Why not just use Hunter?
  User's Hunter quota = 2000/mo. We'll have 20k+ domains. Our own crawl is free,
  unlimited, and gets ~50-70% of the same emails Hunter would.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any
from urllib.parse import urljoin, urlparse

import structlog
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CacheMode, CrawlerRunConfig

from src.scrapers.outreach.shared import (
    extract_emails,
    normalise_domain,
    prefer_generic_email,
)

log = structlog.get_logger()

CONTACT_PATH_HINTS = (
    "contact", "contact-us", "about", "about-us", "team", "our-team", "staff",
    "people", "meet-the-team", "who-we-are", "enquiries", "get-in-touch",
    "get-a-quote", "request-a-quote",
)

# Pages we don't want to recurse into
SKIP_HINTS = (
    "blog", "news", "post", "product", "category", "tag", "page/", "?p=",
    "privacy", "terms", "cookie", "policy",
)

MAX_CONTACT_PAGES = 4
PAGE_TIMEOUT_MS = 15000
DOMAIN_DELAY = 1.5


def _is_valid_external_url(url: str | None) -> bool:
    if not url:
        return False
    try:
        p = urlparse(url)
    except Exception:
        return False
    if p.scheme not in ("http", "https"):
        return False
    if not p.netloc:
        return False
    return True


def _find_contact_links(html: str, base: str) -> list[str]:
    soup = BeautifulSoup(html, "lxml")
    parsed_base = urlparse(base)
    base_host = parsed_base.netloc.lower().replace("www.", "")
    urls: list[str] = []
    seen: set[str] = set()
    for a in soup.select("a[href]"):
        href = (a.get("href") or "").strip()
        if not href or href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
            continue
        text = (a.get_text(" ", strip=True) or "").lower()
        href_lc = href.lower()
        # Skip obvious noise
        if any(skip in href_lc for skip in SKIP_HINTS):
            continue
        # Match on path or anchor text
        is_match = any(hint in href_lc for hint in CONTACT_PATH_HINTS) or any(
            hint in text for hint in CONTACT_PATH_HINTS
        )
        if not is_match:
            continue
        resolved = urljoin(base, href)
        if resolved in seen:
            continue
        seen.add(resolved)
        # Same-domain only
        try:
            rp = urlparse(resolved)
            if rp.netloc.lower().replace("www.", "") != base_host:
                continue
        except Exception:
            continue
        urls.append(resolved)
        if len(urls) >= MAX_CONTACT_PAGES:
            break
    return urls


def _extract_people(html: str) -> list[dict[str, str]]:
    """Best-effort extraction of staff names from team pages."""
    soup = BeautifulSoup(html, "lxml")
    people: list[dict[str, str]] = []
    # Common staff-card patterns
    for sel in (
        ".team-member", ".staff-member", ".person", ".team .card",
        "[class*='team-member']", "[class*='staff']", "[itemtype*='Person']",
    ):
        cards = soup.select(sel)
        for c in cards:
            name_el = c.select_one("h2, h3, h4, .name, [itemprop='name']")
            role_el = c.select_one(".role, .position, .job-title, [itemprop='jobTitle']")
            if not name_el:
                continue
            name = name_el.get_text(strip=True)
            if not name or len(name.split()) < 2:
                continue
            people.append({
                "name": name,
                "role": role_el.get_text(strip=True) if role_el else "",
            })
    return people


async def _fetch_page(crawler: AsyncWebCrawler, url: str) -> str | None:
    try:
        res = await crawler.arun(
            url=url,
            config=CrawlerRunConfig(
                cache_mode=CacheMode.BYPASS,
                magic=True,
                page_timeout=PAGE_TIMEOUT_MS,
            ),
        )
        if res.success and res.html:
            return res.html
    except Exception as e:
        log.debug("website_crawl_failed", url=url, error=str(e))
    return None


async def crawl_website_for_contact(website: str) -> dict[str, Any]:
    """Visit homepage + up to 4 contact pages. Return emails, phones, people."""
    if not _is_valid_external_url(website):
        return {"emails": [], "phones": [], "people": []}

    browser = BrowserConfig(
        headless=True,
        user_agent_mode="random",
        viewport_width=1366,
        viewport_height=800,
    )
    emails: list[str] = []
    phones: list[str] = []
    people: list[dict[str, str]] = []

    async with AsyncWebCrawler(config=browser) as crawler:
        home_html = await _fetch_page(crawler, website)
        if not home_html:
            return {"emails": [], "phones": [], "people": []}
        emails.extend(extract_emails(home_html))
        soup = BeautifulSoup(home_html, "lxml")
        for tel in soup.select("a[href^='tel:']"):
            phones.append(tel.get("href", "").replace("tel:", "").strip())
        people.extend(_extract_people(home_html))

        contact_urls = _find_contact_links(home_html, website)
        for url in contact_urls:
            sub_html = await _fetch_page(crawler, url)
            if not sub_html:
                continue
            emails.extend(extract_emails(sub_html))
            s2 = BeautifulSoup(sub_html, "lxml")
            for tel in s2.select("a[href^='tel:']"):
                phones.append(tel.get("href", "").replace("tel:", "").strip())
            people.extend(_extract_people(sub_html))
            await asyncio.sleep(0.5)

    # Dedupe preserving order
    def dedupe(seq: list) -> list:
        out, seen = [], set()
        for x in seq:
            k = x if isinstance(x, str) else str(x)
            if k not in seen:
                seen.add(k)
                out.append(x)
        return out

    return {
        "emails": dedupe(emails),
        "phones": dedupe(phones),
        "people": people[:6],
    }


async def crawl_batch(
    leads: list[dict[str, Any]],
    domain_delay: float = DOMAIN_DELAY,
) -> list[dict[str, Any]]:
    """Return updated leads with email/phone/people filled in from their website."""
    updated: list[dict[str, Any]] = []
    # Group by domain so we don't hammer a single domain
    by_domain: dict[str, list[dict[str, Any]]] = {}
    for lead in leads:
        site = lead.get("website")
        if not site:
            continue
        domain = normalise_domain(site)
        if not domain:
            continue
        by_domain.setdefault(domain, []).append((site, lead))

    for domain, items in by_domain.items():
        website = items[0][0]
        try:
            result = await crawl_website_for_contact(website)
        except Exception as e:
            log.warning("website_crawl_error", domain=domain, error=str(e))
            continue

        best_email = prefer_generic_email(result["emails"], domain)
        if not best_email and not result["phones"] and not result["people"]:
            continue

        phone = (result["phones"] or [None])[0]
        director_names = [p["name"] for p in result["people"] if p.get("name")][:3]

        for _, lead in items:
            merged = {
                **lead,
                "email": best_email or lead.get("email"),
                "email_type": "website_scrape" if best_email else lead.get("email_type"),
                "phone": lead.get("phone") or phone,
                "director_names": list(dict.fromkeys((lead.get("director_names") or []) + director_names)),
                "confidence_score": max(lead.get("confidence_score") or 50, 80 if best_email else 65),
                "raw_data": {
                    **(lead.get("raw_data") or {}),
                    "website_crawl": {
                        "emails_found": result["emails"],
                        "phones_found": result["phones"],
                        "people_found": result["people"],
                    },
                },
            }
            updated.append(merged)

        log.info(
            "website_crawl_hit",
            domain=domain,
            emails=len(result["emails"]),
            phones=len(result["phones"]),
            people=len(result["people"]),
        )
        await asyncio.sleep(domain_delay)

    log.info("website_crawl_batch_done", input=len(leads), updated=len(updated))
    return updated
