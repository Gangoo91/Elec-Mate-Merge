"""Gov.uk Find an Apprenticeship — Training Provider crawler.

Crawls the public training-provider search for the "Installation & maintenance
electrician" standard (course id 400) and enriches each provider by pulling
their website's contact page for a real contact email.

All crawling uses crawl4ai (already installed in the container).
"""

from __future__ import annotations

from typing import Any
from urllib.parse import urljoin, urlparse

import structlog
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CacheMode, CrawlerRunConfig

from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_emails,
    extract_postcode,
    normalise_domain,
    prefer_generic_email,
)

log = structlog.get_logger()

BASE = "https://www.find-apprenticeship-training.service.gov.uk"
COURSE_URL = f"{BASE}/courses/400/providers"

CONTACT_HINTS = (
    "contact", "contact-us", "about", "about-us", "staff",
    "electrical", "apprenticeships", "get-in-touch", "enquiries",
)


def _classify_org_type(name: str, website: str | None) -> str:
    n = (name or "").lower()
    w = (website or "").lower()
    if ".ac.uk" in w or "college" in n:
        return "fe_college"
    if "university" in n:
        return "university_fe"
    if "training" in n or "academy" in n or "apprenticeship" in n:
        return "private_training_provider"
    return "apprenticeship_provider"


async def _fetch_provider_list(
    crawler: AsyncWebCrawler, max_pages: int
) -> list[dict[str, Any]]:
    providers: list[dict[str, Any]] = []
    for page in range(1, max_pages + 1):
        url = f"{COURSE_URL}?page={page}"
        log.info("gov_providers_page", page=page, url=url)
        res = await crawler.arun(
            url=url,
            config=CrawlerRunConfig(
                cache_mode=CacheMode.BYPASS,
                magic=True,
                simulate_user=True,
                wait_for="css:article, ul.das-search-results__list li, .das-provider-list-item",
                page_timeout=45000,
            ),
        )
        if not res.success or not res.html:
            break
        soup = BeautifulSoup(res.html, "lxml")
        cards = soup.select(
            "ul.govuk-list.das-search-results__list > li, "
            "article.das-search-results__result, "
            ".govuk-grid-column-two-thirds article, "
            ".das-provider-list-item, "
            "article"
        )
        found = 0
        for card in cards:
            title = card.select_one("a")
            if not title:
                continue
            name = title.get_text(strip=True)
            href = title.get("href") or ""
            if not name or "provider" not in href.lower():
                continue
            detail_url = urljoin(BASE, href)
            addr = ""
            addr_el = card.select_one("address, .das-provider-address, p.govuk-body")
            if addr_el:
                addr = addr_el.get_text(" ", strip=True)
            providers.append({
                "name": name,
                "detail_url": detail_url,
                "address_hint": addr,
            })
            found += 1
        if found == 0:
            break
    seen: set[str] = set()
    deduped: list[dict[str, Any]] = []
    for p in providers:
        if p["detail_url"] in seen:
            continue
        seen.add(p["detail_url"])
        deduped.append(p)
    log.info("gov_providers_total_unique", count=len(deduped))
    return deduped


async def _enrich_detail(
    crawler: AsyncWebCrawler, provider: dict[str, Any]
) -> dict[str, Any]:
    try:
        res = await crawler.arun(
            url=provider["detail_url"],
            config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS),
        )
    except Exception as e:
        log.warning("gov_detail_fetch_failed", url=provider["detail_url"], error=str(e))
        return {}
    if not res.success or not res.html:
        return {}
    soup = BeautifulSoup(res.html, "lxml")
    # External website link
    website = None
    for a in soup.select("a.govuk-link, a[href^='http']"):
        href = a.get("href") or ""
        if href.startswith("http") and "gov.uk" not in href and "service.gov.uk" not in href:
            website = href
            break
    text_blob = soup.get_text(" ", strip=True)
    return {
        "website": website,
        "inline_emails": extract_emails(text_blob),
        "postcode": extract_postcode(text_blob)
        or extract_postcode(provider.get("address_hint") or ""),
        "detail_text": text_blob[:2000],
    }


async def _scrape_provider_website(
    crawler: AsyncWebCrawler, website: str
) -> dict[str, Any]:
    parsed = urlparse(website)
    if not parsed.scheme.startswith("http"):
        return {}
    emails: list[str] = []
    phones: list[str] = []
    try:
        home = await crawler.arun(
            url=website, config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
        )
        if home.success and home.html:
            emails.extend(extract_emails(home.html + " " + (home.markdown or "")))
            soup = BeautifulSoup(home.html, "lxml")
            for tel in soup.select("a[href^='tel:']"):
                phones.append(tel.get("href", "").replace("tel:", "").strip())
            # Follow up to 3 contact-ish links on same domain
            contact_urls: list[str] = []
            for a in soup.select("a[href]"):
                href = (a.get("href") or "").lower()
                if any(h in href for h in CONTACT_HINTS):
                    resolved = urljoin(website, a["href"])
                    if parsed.netloc in resolved and resolved not in contact_urls:
                        contact_urls.append(resolved)
                        if len(contact_urls) >= 3:
                            break
            for u in contact_urls:
                try:
                    sub = await crawler.arun(
                        url=u, config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
                    )
                    if sub.success and sub.html:
                        emails.extend(extract_emails(sub.html + " " + (sub.markdown or "")))
                        s2 = BeautifulSoup(sub.html, "lxml")
                        for tel in s2.select("a[href^='tel:']"):
                            phones.append(tel.get("href", "").replace("tel:", "").strip())
                except Exception:
                    continue
    except Exception as e:
        log.warning("gov_provider_site_failed", website=website, error=str(e))
    return {"emails": list(dict.fromkeys(emails)), "phones": list(dict.fromkeys(phones))}


async def scrape_gov_apprenticeship_providers(
    max_providers: int | None = None,
    max_pages: int = 40,
) -> list[dict[str, Any]]:
    """Run the full gov.uk → website enrichment flow. Returns education_leads payloads."""
    browser = BrowserConfig(
        headless=True,
        user_agent_mode="random",
        viewport_width=1366,
        viewport_height=800,
    )
    out: list[dict[str, Any]] = []
    async with AsyncWebCrawler(config=browser) as crawler:
        providers = await _fetch_provider_list(crawler, max_pages=max_pages)
        if max_providers:
            providers = providers[:max_providers]

        for i, prov in enumerate(providers, 1):
            detail = await _enrich_detail(crawler, prov)
            website = detail.get("website")
            domain = normalise_domain(website)
            web_data: dict[str, Any] = {}
            if website:
                web_data = await _scrape_provider_website(crawler, website)

            all_emails = list(dict.fromkeys(
                (detail.get("inline_emails") or []) + (web_data.get("emails") or [])
            ))
            best_email = prefer_generic_email(all_emails, domain)
            phone = (web_data.get("phones") or [None])[0] or None
            postcode = detail.get("postcode")

            out.append({
                "source": "gov_uk_apprenticeships",
                "source_url": prov["detail_url"],
                "source_id": prov["detail_url"],
                "email": best_email,
                "email_type": (
                    "generic"
                    if best_email
                    and any(best_email.startswith(p) for p in (
                        "info@", "enquiries@", "hello@", "contact@"
                    ))
                    else "department"
                    if best_email
                    else None
                ),
                "phone": phone,
                "organisation": prov["name"],
                "organisation_type": _classify_org_type(prov["name"], website),
                "website": website,
                "postcode": postcode,
                "country": classify_uk_country(postcode),
                "offers_electrical_level_3": True,
                "raw_data": {
                    "detail_url": prov["detail_url"],
                    "address_hint": prov.get("address_hint"),
                    "all_emails_found": all_emails,
                    "phones_found": web_data.get("phones") or [],
                },
                "confidence_score": 85 if best_email else 60,
            })
            if i % 10 == 0:
                log.info(
                    "gov_providers_progress",
                    done=i,
                    total=len(providers),
                    with_email=sum(1 for o in out if o["email"]),
                )

    log.info("gov_providers_final", total=len(out))
    return out
