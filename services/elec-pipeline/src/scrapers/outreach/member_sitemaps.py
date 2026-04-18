"""Trade-body member sitemap scrapers — ECA, NICEIC, NAPIT.

These sites block their /find-a-contractor listing pages with Cloudflare
JS-challenge, but their sitemap.xml is always public (SEO forces this).

Strategy:
  1. Pull sitemap.xml → every URL
  2. Filter to member/contractor profile pages
  3. Crawl each profile → extract name, email, phone, website, postcode
  4. Upsert into business_leads with accreditation tag

Sites covered:
  ECA     — https://www.eca.co.uk/sitemap.xml        (bigger electrical firms, 3k+ members)
  NICEIC  — https://www.niceic.com/sitemap.xml       (~26k approved contractors)
  NAPIT   — https://www.napit.org.uk/sitemap_index.xml (~13k members)
"""

from __future__ import annotations

import asyncio
import re
from typing import Any
from urllib.parse import urlparse

import httpx
import structlog
from bs4 import BeautifulSoup

from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_emails,
    extract_postcode,
    normalise_domain,
    prefer_generic_email,
)

log = structlog.get_logger()

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

URL_RE = re.compile(r"<loc>([^<]+)</loc>")


async def _fetch(client: httpx.AsyncClient, url: str) -> str | None:
    try:
        r = await client.get(url, timeout=20, follow_redirects=True)
        if r.status_code == 200:
            return r.text
    except Exception as e:
        log.debug("sitemap_fetch_failed", url=url, error=str(e))
    return None


async def _all_urls_from_sitemap(
    client: httpx.AsyncClient, root_url: str, depth: int = 0
) -> list[str]:
    """Recursively fetch a sitemap or sitemap index, return every <loc>."""
    if depth > 2:
        return []
    text = await _fetch(client, root_url)
    if not text:
        return []
    urls: list[str] = []
    # If it's a sitemap index, recurse into each
    if "<sitemapindex" in text or "sitemap_index" in root_url.lower():
        for m in URL_RE.finditer(text):
            sub = m.group(1).strip()
            urls.extend(await _all_urls_from_sitemap(client, sub, depth + 1))
        return urls
    # Otherwise it's a urlset
    urls.extend(m.group(1).strip() for m in URL_RE.finditer(text))
    return urls


def _is_member_url(site_slug: str, url: str) -> bool:
    u = url.lower()
    if site_slug == "eca":
        # ECA uses /members/<slug> or /contractors/<slug>
        return any(x in u for x in ("/members/", "/contractors/", "/member/", "/company/"))
    if site_slug == "niceic":
        # NICEIC usually /contractor/ or /directory/
        return any(x in u for x in ("/contractor/", "/directory/", "/member/", "/find-a-contractor/"))
    if site_slug == "napit":
        return any(x in u for x in ("/member/", "/members/", "/directory/", "/contractor/", "/tradesperson/"))
    return False


async def _crawl_member_profile(
    client: httpx.AsyncClient, url: str, accreditation: str
) -> dict[str, Any] | None:
    html = await _fetch(client, url)
    if not html:
        return None
    soup = BeautifulSoup(html, "lxml")

    # Name — first h1/h2
    name_el = soup.select_one("h1, h2.company-name, .business-name, [itemprop='name']")
    if not name_el:
        return None
    name = name_el.get_text(strip=True)
    if not name or len(name) < 3:
        return None

    text_blob = soup.get_text(" ", strip=True)
    emails = extract_emails(html)  # HTML source catches mailto: too
    postcode = extract_postcode(text_blob)
    phone = None
    tel = soup.select_one("a[href^='tel:']")
    if tel:
        phone = tel.get("href", "").replace("tel:", "").strip()

    website = None
    for a in soup.select("a[href^='http']"):
        href = a.get("href", "")
        host = urlparse(href).netloc.lower().replace("www.", "")
        skip_hosts = ("eca.co.uk", "niceic.com", "napit.org.uk", "facebook.com", "linkedin.com", "twitter.com", "youtube.com")
        if any(h in host for h in skip_hosts):
            continue
        website = href
        break

    domain = normalise_domain(website)
    email = prefer_generic_email(emails, domain)

    return {
        "source": f"{accreditation}_sitemap",
        "source_url": url,
        "source_id": url,
        "company_name": name,
        "email": email,
        "phone": phone,
        "website": website,
        "postcode": postcode,
        "country": classify_uk_country(postcode),
        "accreditations": [f"{accreditation}_member"],
        "raw_data": {"all_emails_found": emails, "sitemap_url": url},
        "confidence_score": 85 if email else (75 if website else 65),
    }


async def scrape_sitemap(
    site_slug: str, sitemap_url: str, max_members: int | None = None, concurrency: int = 10
) -> list[dict[str, Any]]:
    """Scrape a trade-body sitemap → list of business_leads payloads."""
    out: list[dict[str, Any]] = []
    async with httpx.AsyncClient(headers=HEADERS, http2=False) as client:
        all_urls = await _all_urls_from_sitemap(client, sitemap_url)
        log.info(f"{site_slug}_sitemap_urls_total", count=len(all_urls))
        member_urls = [u for u in all_urls if _is_member_url(site_slug, u)]
        log.info(f"{site_slug}_sitemap_member_urls", count=len(member_urls))

        if max_members:
            member_urls = member_urls[:max_members]

        sem = asyncio.Semaphore(concurrency)
        total = len(member_urls)

        async def worker(url: str, idx: int) -> None:
            async with sem:
                result = await _crawl_member_profile(client, url, site_slug)
                if result:
                    out.append(result)
                if idx % 50 == 0:
                    log.info(
                        f"{site_slug}_sitemap_progress",
                        done=idx,
                        total=total,
                        collected=len(out),
                    )

        await asyncio.gather(*(worker(u, i) for i, u in enumerate(member_urls, 1)))

    log.info(f"{site_slug}_sitemap_collected", total=len(out))
    return out


async def scrape_eca(max_members: int | None = None) -> list[dict[str, Any]]:
    return await scrape_sitemap("eca", "https://www.eca.co.uk/sitemap.xml", max_members)


async def scrape_niceic(max_members: int | None = None) -> list[dict[str, Any]]:
    return await scrape_sitemap("niceic", "https://www.niceic.com/sitemap.xml", max_members)


async def scrape_napit(max_members: int | None = None) -> list[dict[str, Any]]:
    return await scrape_sitemap(
        "napit", "https://www.napit.org.uk/sitemap_index.xml", max_members
    )
