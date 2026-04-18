"""LinkedIn profile/company discovery via Google search.

We don't log into LinkedIn (ToS risk + aggressive anti-bot). Instead we ask
Google to find us public LinkedIn pages with `site:linkedin.com` queries, then
extract the business/person details directly from Google's result snippets
(which are already public).

This yields company LinkedIn URLs + public names/titles/locations we can feed
into Hunter.io for email discovery.

Two flavours:
  discover_business_linkedin() — finds companies
  discover_people_linkedin()   — finds named directors / electricians
"""

from __future__ import annotations

import asyncio
import re
from typing import Any
from urllib.parse import quote_plus

import structlog
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CacheMode, CrawlerRunConfig

from src.scrapers.outreach.shared import extract_postcode

log = structlog.get_logger()


BUSINESS_QUERIES = [
    "site:linkedin.com/company electrical contractor UK",
    "site:linkedin.com/company electrical installation UK",
    "site:linkedin.com/company commercial electrician UK",
    "site:linkedin.com/company domestic electrician UK",
    "site:linkedin.com/company electrical services Ltd UK",
    "site:linkedin.com/company solar installers UK",
    "site:linkedin.com/company EV charging installer UK",
]

PEOPLE_QUERIES = [
    "site:linkedin.com/in electrical contractor director UK",
    "site:linkedin.com/in electrician owner UK",
    "site:linkedin.com/in electrical manager UK",
    "site:linkedin.com/in head of electrical UK",
    "site:linkedin.com/in electrical tutor college",
    "site:linkedin.com/in electrical apprenticeship tutor UK",
    "site:linkedin.com/in NICEIC electrician director",
]


async def _google_search(
    crawler: AsyncWebCrawler, query: str, start: int = 0
) -> str | None:
    """Fetch a Google results page. Returns HTML or None."""
    url = f"https://www.google.com/search?q={quote_plus(query)}&num=10&start={start}&hl=en-GB&gl=uk"
    try:
        res = await crawler.arun(
            url=url,
            config=CrawlerRunConfig(
                cache_mode=CacheMode.BYPASS,
                magic=True,
                simulate_user=True,
                wait_for="css:a[href*='linkedin.com']",
                page_timeout=30000,
            ),
        )
        if res.success and res.html:
            return res.html
    except Exception as e:
        log.warning("google_search_failed", query=query[:60], error=str(e))
    return None


LINKEDIN_URL_RE = re.compile(
    r"https?://(?:[a-z]{2,3}\.)?linkedin\.com/(company|in)/[A-Za-z0-9\-_%/\.]+",
    re.IGNORECASE,
)


def _extract_linkedin_hits(html: str) -> list[dict[str, str]]:
    """Pull LinkedIn URLs + snippets from a Google results page."""
    soup = BeautifulSoup(html, "lxml")
    hits: list[dict[str, str]] = []
    seen: set[str] = set()

    # Google result blocks — mixture of selectors to survive DOM changes
    for block in soup.select("div.g, div.tF2Cxc, div[data-sokoban-container]"):
        link_el = block.select_one("a[href*='linkedin.com']")
        if not link_el:
            continue
        href = link_el.get("href") or ""
        m = LINKEDIN_URL_RE.search(href)
        if not m:
            continue
        linkedin_url = m.group(0).rstrip("/")
        if linkedin_url in seen:
            continue
        seen.add(linkedin_url)

        title_el = block.select_one("h3, .LC20lb")
        title = title_el.get_text(" ", strip=True) if title_el else ""
        snippet_el = block.select_one(".VwiC3b, span.aCOpRe, .IsZvec")
        snippet = snippet_el.get_text(" ", strip=True) if snippet_el else ""
        hits.append({"url": linkedin_url, "title": title, "snippet": snippet})

    # Fallback: any <a> containing linkedin.com in raw HTML
    if not hits:
        for m in LINKEDIN_URL_RE.finditer(html):
            url = m.group(0).rstrip("/")
            if url not in seen:
                seen.add(url)
                hits.append({"url": url, "title": "", "snippet": ""})
    return hits


def _hit_to_business_lead(hit: dict[str, str]) -> dict[str, Any] | None:
    url = hit["url"]
    if "linkedin.com/company/" not in url:
        return None
    # Company name is usually in the <title> before " | LinkedIn"
    title = (hit.get("title") or "").replace("| LinkedIn", "").replace("- LinkedIn", "").strip()
    # Sometimes title ends with "| LinkedIn" already stripped, get first part
    name = title.split("|")[0].split(" - LinkedIn")[0].strip()
    # LinkedIn company slug as fallback name
    if not name:
        slug = url.rstrip("/").split("/")[-1]
        name = slug.replace("-", " ").title()
    postcode = extract_postcode(hit.get("snippet", ""))
    return {
        "source": "linkedin_company",
        "source_url": url,
        "source_id": url,
        "company_name": name,
        "website": None,  # LinkedIn page itself; real website via profile enrichment later
        "postcode": postcode,
        "raw_data": {
            "linkedin_url": url,
            "linkedin_title": title,
            "snippet": hit.get("snippet"),
        },
        "confidence_score": 60,
    }


def _hit_to_person_payload(hit: dict[str, str]) -> dict[str, Any] | None:
    url = hit["url"]
    if "linkedin.com/in/" not in url:
        return None
    title = (hit.get("title") or "").replace("| LinkedIn", "").replace("- LinkedIn", "").strip()
    # Title format is usually: "Full Name - Role at Company | LinkedIn"
    full_name = title.split(" - ")[0].strip() if " - " in title else title.split("|")[0].strip()
    role_company = ""
    if " - " in title:
        role_company = title.split(" - ", 1)[1].split("|")[0].strip()
    # Role @ Company
    role = role_company
    company = ""
    for sep in (" at ", " @ "):
        if sep in role_company:
            role, company = role_company.split(sep, 1)
            break
    return {
        "source": "linkedin_person",
        "source_url": url,
        "source_id": url,
        "company_name": company.strip() or full_name,
        "director_names": [full_name] if full_name else [],
        "raw_data": {
            "linkedin_profile": url,
            "full_name": full_name,
            "role": role.strip(),
            "company_from_title": company.strip(),
            "snippet": hit.get("snippet"),
        },
        "confidence_score": 55,
    }


async def discover_business_linkedin(
    queries: list[str] | None = None,
    pages_per_query: int = 5,
) -> list[dict[str, Any]]:
    """Use Google to find public LinkedIn company pages for UK electrical businesses."""
    queries = queries or BUSINESS_QUERIES
    out: list[dict[str, Any]] = []
    seen_urls: set[str] = set()

    browser = BrowserConfig(
        headless=True,
        user_agent_mode="random",
        viewport_width=1366,
        viewport_height=800,
    )
    async with AsyncWebCrawler(config=browser) as crawler:
        for qi, q in enumerate(queries, 1):
            for p in range(pages_per_query):
                html = await _google_search(crawler, q, start=p * 10)
                if not html:
                    break
                hits = _extract_linkedin_hits(html)
                if not hits:
                    break
                new_here = 0
                for hit in hits:
                    if hit["url"] in seen_urls:
                        continue
                    seen_urls.add(hit["url"])
                    lead = _hit_to_business_lead(hit)
                    if lead:
                        out.append(lead)
                        new_here += 1
                log.info(
                    "linkedin_google_biz_page",
                    query_progress=f"{qi}/{len(queries)}",
                    page=p + 1,
                    new=new_here,
                    total=len(out),
                )
                if new_here == 0:
                    break
                await asyncio.sleep(2.5)
    log.info("linkedin_business_discovery_done", total=len(out))
    return out


async def discover_people_linkedin(
    queries: list[str] | None = None,
    pages_per_query: int = 5,
) -> list[dict[str, Any]]:
    """Find named people (business owners/tutors) via Google → LinkedIn profile snippets."""
    queries = queries or PEOPLE_QUERIES
    out: list[dict[str, Any]] = []
    seen_urls: set[str] = set()

    browser = BrowserConfig(
        headless=True,
        user_agent_mode="random",
        viewport_width=1366,
        viewport_height=800,
    )
    async with AsyncWebCrawler(config=browser) as crawler:
        for qi, q in enumerate(queries, 1):
            for p in range(pages_per_query):
                html = await _google_search(crawler, q, start=p * 10)
                if not html:
                    break
                hits = _extract_linkedin_hits(html)
                if not hits:
                    break
                new_here = 0
                for hit in hits:
                    if hit["url"] in seen_urls:
                        continue
                    seen_urls.add(hit["url"])
                    payload = _hit_to_person_payload(hit)
                    if payload:
                        out.append(payload)
                        new_here += 1
                log.info(
                    "linkedin_google_people_page",
                    query_progress=f"{qi}/{len(queries)}",
                    page=p + 1,
                    new=new_here,
                    total=len(out),
                )
                if new_here == 0:
                    break
                await asyncio.sleep(2.5)
    log.info("linkedin_people_discovery_done", total=len(out))
    return out
