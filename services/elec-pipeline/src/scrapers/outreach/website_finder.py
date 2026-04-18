"""Website finder — for leads that have a company name but no website.

Uses Bing web search (HTML endpoint) as the primary engine.
Falls back to DuckDuckGo if Bing rate-limits.

Both are:
  - No API key
  - Server-rendered HTML (no JS)
  - Generally scrape-friendly

Strategy:
  For each lead missing a website:
    1. Query Bing for "<Company Name> electrical UK"
    2. Extract the first result that isn't a directory
    3. Save domain to business_leads.website
    4. Website crawler picks it up on next pass

Yield target: 50-70% of company names yield a discoverable business website.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any
from urllib.parse import quote_plus, urlparse

import httpx
import structlog
from bs4 import BeautifulSoup

from src.scrapers.outreach.shared import normalise_domain

log = structlog.get_logger()

BING_URL = "https://www.bing.com/search"
DDG_URL = "https://html.duckduckgo.com/html/"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/127.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,*/*",
    "Accept-Language": "en-GB,en;q=0.9",
}

# Hosts we never treat as a business's own website
DIRECTORY_HOSTS = {
    "yell.com", "checkatrade.com", "trustpilot.com", "trustatrader.com",
    "ratedpeople.com", "mybuilder.com", "bark.com", "gumtree.com",
    "facebook.com", "linkedin.com", "yelp.com", "google.com", "bing.com",
    "duckduckgo.com", "youtube.com", "instagram.com", "twitter.com",
    "tiktok.com", "find-and-update.company-information.service.gov.uk",
    "companieshouse.gov.uk", "192.com", "thomsonlocal.com",
    "freeindex.co.uk", "scoot.co.uk", "wikipedia.org",
    "indeed.com", "reed.co.uk", "totaljobs.com", "gov.uk",
    "endole.co.uk", "duedil.com", "companiesintheuk.co.uk",
    "bizdb.co.uk", "suggest4.co.uk", "b2bhint.com",
}

# DDG wraps result URLs in /l/?uddg=<encoded> sometimes
DDG_REDIRECT_RE = re.compile(r"uddg=([^&]+)")


def _unwrap_ddg(href: str) -> str:
    if "uddg=" in href:
        m = DDG_REDIRECT_RE.search(href)
        if m:
            from urllib.parse import unquote
            return unquote(m.group(1))
    return href


def _is_directory(host: str) -> bool:
    host = host.lower().replace("www.", "")
    if host in DIRECTORY_HOSTS:
        return True
    return any(host.endswith("." + d) for d in DIRECTORY_HOSTS)


async def _ddg_query(
    client: httpx.AsyncClient, query: str
) -> list[tuple[str, str, str]]:
    """Return list of (url, title, snippet) from DDG HTML results."""
    try:
        r = await client.post(
            DDG_URL,
            data={"q": query, "kl": "uk-en"},
            timeout=20,
            follow_redirects=True,
        )
        if r.status_code != 200:
            return []
        soup = BeautifulSoup(r.text, "lxml")
        hits: list[tuple[str, str, str]] = []
        for res in soup.select(".result, .web-result"):
            a = res.select_one("a.result__a, a[href]")
            if not a:
                continue
            href = _unwrap_ddg(a.get("href") or "")
            if not href.startswith("http"):
                continue
            title = a.get_text(strip=True)
            snippet_el = res.select_one(".result__snippet, .snippet")
            snippet = snippet_el.get_text(" ", strip=True) if snippet_el else ""
            hits.append((href, title, snippet))
        return hits
    except Exception as e:
        log.warning("ddg_query_failed", query=query[:80], error=str(e))
        return []


async def _bing_query(
    client: httpx.AsyncClient, query: str
) -> list[tuple[str, str, str]]:
    """Return list of (url, title, snippet) from Bing HTML results."""
    try:
        r = await client.get(
            BING_URL,
            params={"q": query, "cc": "GB", "setlang": "en-GB"},
            timeout=20,
            follow_redirects=True,
        )
        if r.status_code != 200:
            return []
        soup = BeautifulSoup(r.text, "lxml")
        hits: list[tuple[str, str, str]] = []
        for li in soup.select("li.b_algo"):
            a = li.select_one("h2 a")
            if not a:
                continue
            href = a.get("href") or ""
            if not href.startswith("http"):
                continue
            title = a.get_text(strip=True)
            snippet_el = li.select_one("p, .b_caption")
            snippet = snippet_el.get_text(" ", strip=True) if snippet_el else ""
            hits.append((href, title, snippet))
        return hits
    except Exception as e:
        log.warning("bing_query_failed", query=query[:80], error=str(e))
        return []


async def find_website_for(
    client: httpx.AsyncClient, company_name: str, postcode: str | None = None
) -> dict[str, Any] | None:
    """Return dict with website/confidence or None."""
    if not company_name:
        return None
    # Strip obvious LTD suffix for cleaner search
    trimmed = re.sub(
        r"\s+(ltd|limited|plc|llp)\.?$",
        "",
        company_name.strip(),
        flags=re.IGNORECASE,
    ).strip()
    queries = [
        f'"{trimmed}" electrical UK',
        f'"{trimmed}" electrician',
    ]
    if postcode:
        queries.insert(0, f'"{trimmed}" {postcode}')

    for q in queries:
        # Try Bing first (more reliable), fall back to DDG
        hits = await _bing_query(client, q)
        if not hits:
            await asyncio.sleep(0.3)
            hits = await _ddg_query(client, q)
        for url, title, snippet in hits:
            try:
                host = urlparse(url).netloc.lower().replace("www.", "")
            except Exception:
                continue
            if not host or _is_directory(host):
                continue
            # Confidence: if company name appears in title or host, score higher
            name_lc = trimmed.lower()
            name_tokens = [t for t in name_lc.split() if len(t) > 3]
            title_lc = title.lower()
            match_score = sum(1 for t in name_tokens if t in title_lc or t in host)
            if match_score == 0 and len(name_tokens) > 1:
                continue
            return {
                "website": f"https://{host}",
                "domain": host,
                "raw_hit": {"url": url, "title": title, "snippet": snippet},
                "confidence": min(95, 70 + match_score * 8),
            }
        await asyncio.sleep(0.6)
    return None


async def find_websites_batch(
    leads: list[dict[str, Any]],
    delay: float = 1.0,
) -> list[dict[str, Any]]:
    """Iterate leads, try to find a website for each. Return updates."""
    updates: list[dict[str, Any]] = []
    async with httpx.AsyncClient(headers=HEADERS) as client:
        for i, lead in enumerate(leads, 1):
            if lead.get("website"):
                continue
            name = lead.get("company_name") or ""
            pc = lead.get("postcode") or None
            hit = await find_website_for(client, name, pc)
            if hit:
                updates.append({
                    "id": lead["id"],
                    "website": hit["website"],
                    "domain": hit["domain"],
                    "confidence_score": max(lead.get("confidence_score") or 50, hit["confidence"]),
                    "raw_data_merge": {"website_finder": hit["raw_hit"]},
                })
            if i % 25 == 0:
                log.info("website_finder_progress", done=i, total=len(leads), found=len(updates))
            await asyncio.sleep(delay)
    log.info("website_finder_batch_done", input=len(leads), found=len(updates))
    return updates
