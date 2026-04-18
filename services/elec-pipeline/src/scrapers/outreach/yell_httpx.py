"""Yell + Checkatrade + Bing — httpx-based scrapers.

Playwright/crawl4AI triggered Cloudflare JS challenges on these sites. Plain
httpx with a real browser User-Agent often sails through because it looks like
a curl/RSS reader rather than a headless Chrome fingerprint.

If Cloudflare still blocks, we fall back to Google CSE for the same coverage.
"""

from __future__ import annotations

import asyncio
from typing import Any
from urllib.parse import quote_plus, urljoin

import httpx
import structlog
from bs4 import BeautifulSoup

from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_emails,
    extract_postcode,
)

log = structlog.get_logger()

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/127.0.0.0 Safari/537.36"
    ),
    "Accept": (
        "text/html,application/xhtml+xml,application/xml;q=0.9,"
        "image/avif,image/webp,*/*;q=0.8"
    ),
    "Accept-Language": "en-GB,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "DNT": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
}


UK_AREAS = [
    "London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Sheffield",
    "Bristol", "Newcastle", "Nottingham", "Leicester", "Cardiff", "Edinburgh",
    "Glasgow", "Coventry", "Bradford", "Belfast", "Aberdeen", "Portsmouth",
    "Southampton", "Plymouth", "Reading", "Derby", "Brighton", "Hull",
    "Milton Keynes", "Norwich", "Oxford", "Cambridge", "Exeter",
]

POSTCODES = [
    "E1", "EC1", "N1", "NW1", "SE1", "SW1", "W1", "WC1",
    "B1", "M1", "LS1", "S1", "L1", "NE1", "G1", "EH1", "CF1", "BT1",
    "BA1", "BH1", "BS1", "PL1", "EX1", "NR1", "IP1", "CB1", "SN1",
    "RG1", "OX1", "LU1", "AL1", "WA1", "TS1", "NG1", "DE1", "LE1",
    "WS1", "WV1", "ST1", "SK1", "CH1", "YO1", "HU1", "HD1",
]


# ═══════════════════════════════════════════════════════════════
# YELL
# ═══════════════════════════════════════════════════════════════
async def scrape_yell_httpx(max_pages_per_area: int = 3) -> list[dict[str, Any]]:
    """Yell.com electrical contractors via httpx."""
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    async with httpx.AsyncClient(headers=HEADERS, timeout=30, follow_redirects=True, http2=True) as client:
        for ai, area in enumerate(UK_AREAS, 1):
            area_start = len(out)
            for page in range(1, max_pages_per_area + 1):
                url = (
                    f"https://www.yell.com/ucs/UcsSearchAction.do"
                    f"?keywords=Electrical+Contractors&location={quote_plus(area)}&pageNum={page}"
                )
                try:
                    r = await client.get(url)
                except Exception as e:
                    log.warning("yell_httpx_error", area=area, page=page, error=str(e))
                    break
                if r.status_code != 200:
                    if r.status_code in (403, 429, 503):
                        log.warning("yell_httpx_blocked", area=area, status=r.status_code)
                        break
                    continue
                soup = BeautifulSoup(r.text, "lxml")
                cards = (
                    soup.select("article.businessCapsule")
                    or soup.select(".srp-search-result")
                    or soup.select("article")
                )
                if not cards:
                    break
                kept = 0
                for card in cards:
                    name_el = card.select_one("h2 a, h2, .businessCapsule--name a")
                    name = name_el.get_text(strip=True) if name_el else ""
                    if not name:
                        continue
                    text_blob = card.get_text(" ", strip=True)
                    postcode = extract_postcode(text_blob)
                    phone = None
                    tel = card.select_one("a[href^='tel:']")
                    if tel:
                        phone = tel.get("href", "").replace("tel:", "").strip()
                    website = None
                    for a in card.select("a[href^='http']"):
                        href = a["href"]
                        if "yell.com" not in href and "facebook.com" not in href:
                            website = href
                            break
                    emails = extract_emails(text_blob)
                    detail = name_el.get("href") if hasattr(name_el, "get") else None
                    detail_url = urljoin("https://www.yell.com", detail) if detail else None
                    sid = f"yell:{detail_url or name}:{postcode or ''}".lower()
                    if sid in seen:
                        continue
                    seen.add(sid)
                    out.append({
                        "source": "yell",
                        "source_url": detail_url,
                        "source_id": sid,
                        "company_name": name,
                        "email": emails[0] if emails else None,
                        "phone": phone,
                        "website": website,
                        "city": area,
                        "postcode": postcode,
                        "country": classify_uk_country(postcode, area),
                        "raw_data": {"listing_text": text_blob[:400]},
                        "confidence_score": 75 if emails else (70 if website else 55),
                    })
                    kept += 1
                if kept == 0:
                    break
                await asyncio.sleep(1.0)
            log.info("yell_httpx_area", area=area, progress=f"{ai}/{len(UK_AREAS)}",
                     new_here=len(out) - area_start, total=len(out))
    log.info("yell_httpx_collected", total=len(out))
    return out


# ═══════════════════════════════════════════════════════════════
# CHECKATRADE
# ═══════════════════════════════════════════════════════════════
async def scrape_checkatrade_httpx(max_pages: int = 3) -> list[dict[str, Any]]:
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    async with httpx.AsyncClient(headers=HEADERS, timeout=30, follow_redirects=True, http2=True) as client:
        for pi, pc in enumerate(POSTCODES, 1):
            pc_start = len(out)
            for page in range(1, max_pages + 1):
                url = f"https://www.checkatrade.com/search/electricians/{quote_plus(pc.lower())}/?page={page}"
                try:
                    r = await client.get(url)
                except Exception as e:
                    log.warning("checkatrade_httpx_error", postcode=pc, error=str(e))
                    break
                if r.status_code != 200:
                    break
                soup = BeautifulSoup(r.text, "lxml")
                cards = (
                    soup.select("article.trade-card")
                    or soup.select(".listing-card")
                    or soup.select("article")
                )
                if not cards:
                    break
                kept = 0
                for card in cards:
                    name_el = card.select_one("h2, h3, .trade-card__name")
                    name = name_el.get_text(strip=True) if name_el else ""
                    if not name or len(name) < 2:
                        continue
                    text_blob = card.get_text(" ", strip=True)
                    phone = None
                    tel = card.select_one("a[href^='tel:']")
                    if tel:
                        phone = tel.get("href", "").replace("tel:", "").strip()
                    website = None
                    for a in card.select("a[href^='http']"):
                        href = a["href"]
                        if "checkatrade.com" not in href:
                            website = href
                            break
                    pc_found = extract_postcode(text_blob) or pc.upper()
                    sid = f"checkatrade:{name}:{pc_found}".lower()
                    if sid in seen:
                        continue
                    seen.add(sid)
                    out.append({
                        "source": "checkatrade",
                        "source_id": sid,
                        "company_name": name,
                        "phone": phone,
                        "website": website,
                        "postcode": pc_found,
                        "country": classify_uk_country(pc_found),
                        "accreditations": ["checkatrade_member"],
                        "raw_data": {"snippet": text_blob[:400]},
                        "confidence_score": 72 if website else 60,
                    })
                    kept += 1
                if kept == 0:
                    break
                await asyncio.sleep(1.0)
            log.info("checkatrade_httpx_postcode", postcode=pc, progress=f"{pi}/{len(POSTCODES)}",
                     new_here=len(out) - pc_start, total=len(out))
    log.info("checkatrade_httpx_collected", total=len(out))
    return out


# ═══════════════════════════════════════════════════════════════
# BING
# ═══════════════════════════════════════════════════════════════
async def scrape_bing_httpx() -> list[dict[str, Any]]:
    """Bing web search for UK electrical businesses — extracts result URLs."""
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    queries = [
        "electrician {area} UK",
        "electrical contractor {area} UK",
        "commercial electrician {area} UK",
    ]
    async with httpx.AsyncClient(headers=HEADERS, timeout=30, follow_redirects=True, http2=True) as client:
        for ai, area in enumerate(UK_AREAS, 1):
            area_start = len(out)
            for q_template in queries:
                q = q_template.format(area=area)
                url = f"https://www.bing.com/search?q={quote_plus(q)}&cc=GB&setlang=en-GB"
                try:
                    r = await client.get(url)
                except Exception as e:
                    log.warning("bing_httpx_error", area=area, error=str(e))
                    continue
                if r.status_code != 200:
                    continue
                soup = BeautifulSoup(r.text, "lxml")
                for li in soup.select("li.b_algo"):
                    a = li.select_one("h2 a")
                    if not a:
                        continue
                    href = a.get("href") or ""
                    if not href.startswith("http"):
                        continue
                    host = href.split("//")[-1].split("/")[0].lower().replace("www.", "")
                    skip_hosts = {
                        "yell.com", "checkatrade.com", "trustpilot.com", "facebook.com",
                        "linkedin.com", "google.com", "bing.com", "youtube.com", "yelp.com",
                        "mybuilder.com", "bark.com", "192.com", "wikipedia.org",
                    }
                    if host in skip_hosts or any(host.endswith("." + d) for d in skip_hosts):
                        continue
                    sid = f"bing:{host}"
                    if sid in seen:
                        continue
                    seen.add(sid)
                    title = a.get_text(strip=True)
                    snippet_el = li.select_one("p, .b_caption")
                    snippet = snippet_el.get_text(" ", strip=True) if snippet_el else ""
                    postcode = extract_postcode(snippet)
                    out.append({
                        "source": "bing_search",
                        "source_id": sid,
                        "source_url": href,
                        "company_name": title.split(" - ")[0].strip() or host,
                        "website": f"https://{host}",
                        "city": area,
                        "postcode": postcode,
                        "country": classify_uk_country(postcode, area),
                        "raw_data": {"bing_title": title, "bing_snippet": snippet},
                        "confidence_score": 70,
                    })
                await asyncio.sleep(0.6)
            log.info("bing_httpx_area", area=area, progress=f"{ai}/{len(UK_AREAS)}",
                     new_here=len(out) - area_start, total=len(out))
    log.info("bing_httpx_collected", total=len(out))
    return out
