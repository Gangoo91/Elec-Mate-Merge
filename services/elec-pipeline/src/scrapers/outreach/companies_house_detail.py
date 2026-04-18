"""Companies House company-detail page scraper.

For each business_lead sourced from Companies House, fetch the
/company/<number> page and extract:
  - Full registered address (address_line_1, city, postcode)
  - Incorporation date
  - Accounts / confirmation-statement status
  - Directors' names (via /company/<number>/officers)

Director names are critical — they feed the SMTP pattern verifier to turn
"company + domain" into "verified first.last@domain".
"""

from __future__ import annotations

import asyncio
import re
from typing import Any

import httpx
import structlog
from bs4 import BeautifulSoup

from src.scrapers.outreach.shared import classify_uk_country, extract_postcode

log = structlog.get_logger()

BASE = "https://find-and-update.company-information.service.gov.uk"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/127.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,*/*",
}


async def _fetch(client: httpx.AsyncClient, path: str) -> str | None:
    url = f"{BASE}{path}"
    try:
        r = await client.get(url, timeout=30, follow_redirects=True)
        if r.status_code == 200:
            return r.text
    except Exception as e:
        log.debug("ch_detail_fetch_failed", path=path, error=str(e))
    return None


def _parse_company_page(html: str) -> dict[str, Any]:
    soup = BeautifulSoup(html, "lxml")
    out: dict[str, Any] = {}
    # Registered office address
    addr_dt = soup.find("dt", string=lambda x: x and "Registered office" in x)
    if addr_dt:
        dd = addr_dt.find_next_sibling("dd")
        if dd:
            out["registered_address"] = dd.get_text(" ", strip=True)
    # Incorporation date
    inc_dt = soup.find("dt", string=lambda x: x and "Incorporated on" in x)
    if inc_dt:
        dd = inc_dt.find_next_sibling("dd")
        if dd:
            out["incorporation_date_text"] = dd.get_text(strip=True)
    # Company status
    status_el = soup.select_one("#company-status")
    if status_el:
        out["company_status"] = status_el.get_text(strip=True).lower()
    # SIC codes
    sic_codes: list[str] = []
    for li in soup.select("#sic0, #sic1, #sic2, #sic3, #sic4"):
        t = li.get_text(strip=True)
        m = re.match(r"(\d{4,5})\s*-", t)
        if m:
            sic_codes.append(m.group(1))
    if sic_codes:
        out["sic_codes"] = sic_codes
    return out


def _parse_officers_page(html: str) -> list[str]:
    soup = BeautifulSoup(html, "lxml")
    names: list[str] = []
    # Officers appear as <h2> or <h3> with the person's name
    for heading in soup.select("h2 a, h3 a, [id^='officer-name']"):
        name = heading.get_text(strip=True)
        if not name:
            continue
        # CH officer names are uppercase: "SMITH, John David"
        # Reformat to title case for storage
        if "," in name:
            surname, rest = name.split(",", 1)
            name = f"{rest.strip()} {surname.strip()}"
        name = name.title()
        # Skip resigned officers (text usually on same card)
        parent = heading.find_parent(["div", "article", "section"]) or heading
        parent_text = parent.get_text(" ", strip=True).lower() if parent else ""
        if "resigned on" in parent_text:
            continue
        if name not in names:
            names.append(name)
    return names[:5]  # Keep up to 5 active officers


async def enrich_company(
    client: httpx.AsyncClient, number: str
) -> dict[str, Any] | None:
    company_html = await _fetch(client, f"/company/{number}")
    if not company_html:
        return None
    data = _parse_company_page(company_html)
    officers_html = await _fetch(client, f"/company/{number}/officers")
    if officers_html:
        names = _parse_officers_page(officers_html)
        if names:
            data["director_names"] = names
    # Derive city + postcode from registered address
    addr = data.get("registered_address") or ""
    postcode = extract_postcode(addr)
    if postcode:
        data["postcode"] = postcode
        data["country"] = classify_uk_country(postcode)
    return data


async def enrich_batch(
    leads: list[dict[str, Any]], delay: float = 0.6
) -> list[dict[str, Any]]:
    """For each lead with company_number, enrich via CH detail pages."""
    out: list[dict[str, Any]] = []
    async with httpx.AsyncClient(headers=HEADERS) as client:
        for i, lead in enumerate(leads, 1):
            number = lead.get("company_number")
            if not number:
                continue
            try:
                data = await enrich_company(client, number)
            except Exception as e:
                log.debug("ch_detail_error", number=number, error=str(e))
                continue
            if not data:
                continue
            out.append({"id": lead["id"], **data})
            if i % 20 == 0:
                log.info("ch_detail_progress", done=i, total=len(leads), enriched=len(out))
            await asyncio.sleep(delay)
    log.info("ch_detail_batch_done", input=len(leads), enriched=len(out))
    return out
