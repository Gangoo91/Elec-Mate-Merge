"""Coupon code scraper — VoucherCodes.co.uk + MyVoucherCodes.co.uk.

Scrapes voucher/coupon aggregator sites for electrical supplier codes.
Uses Crawl4AI stealth browser since these sites are JS-heavy.
"""

from __future__ import annotations

import re
from datetime import datetime, timedelta, timezone
from typing import Any

import structlog
from bs4 import BeautifulSoup

from src.scrapers.browser import fetch_page_html

log = structlog.get_logger()

# Supplier slug → coupon site slugs mapping
SUPPLIER_SLUGS: dict[str, list[dict[str, str]]] = {
    "screwfix": [
        {"site": "vouchercodes", "url": "https://www.vouchercodes.co.uk/screwfix.com"},
        {"site": "myvouchercodes", "url": "https://www.myvouchercodes.co.uk/screwfix"},
    ],
    "toolstation": [
        {"site": "vouchercodes", "url": "https://www.vouchercodes.co.uk/toolstation.com"},
        {"site": "myvouchercodes", "url": "https://www.myvouchercodes.co.uk/toolstation"},
    ],
    "cef": [
        {"site": "vouchercodes", "url": "https://www.vouchercodes.co.uk/cef.co.uk"},
        {"site": "myvouchercodes", "url": "https://www.myvouchercodes.co.uk/cef"},
    ],
    "tlc-electrical": [
        {"site": "vouchercodes", "url": "https://www.vouchercodes.co.uk/tlc-direct.co.uk"},
        {"site": "myvouchercodes", "url": "https://www.myvouchercodes.co.uk/tlc-direct"},
    ],
    "electrical-direct": [
        {"site": "vouchercodes", "url": "https://www.vouchercodes.co.uk/electricaldirect.co.uk"},
        {"site": "myvouchercodes", "url": "https://www.myvouchercodes.co.uk/electrical-direct"},
    ],
    "rs-components": [
        {"site": "vouchercodes", "url": "https://www.vouchercodes.co.uk/uk.rs-online.com"},
        {"site": "myvouchercodes", "url": "https://www.myvouchercodes.co.uk/rs-components"},
    ],
}


async def scrape_coupons() -> list[dict[str, Any]]:
    """Scrape coupons from VoucherCodes + MyVoucherCodes for all suppliers.

    Returns list of coupon dicts ready for upsert. supplier_id is set
    to the slug here — the pipeline resolves it to UUID before upserting.
    """
    all_coupons: list[dict] = []

    for supplier_slug, sites in SUPPLIER_SLUGS.items():
        for site_info in sites:
            try:
                coupons = await _scrape_coupon_page(
                    site_info["url"], site_info["site"], supplier_slug
                )
                all_coupons.extend(coupons)
                log.info(
                    "coupons_scraped",
                    supplier=supplier_slug,
                    site=site_info["site"],
                    count=len(coupons),
                )
            except Exception as e:
                log.error(
                    "coupon_scrape_error",
                    supplier=supplier_slug,
                    site=site_info["site"],
                    error=str(e),
                )

    # Deduplicate by (supplier_slug, code)
    seen: set[tuple[str, str]] = set()
    unique: list[dict] = []
    for c in all_coupons:
        key = (c["supplier_slug"], c["code"].upper())
        if key not in seen:
            seen.add(key)
            unique.append(c)

    log.info("coupons_total", count=len(unique))
    return unique


async def _scrape_coupon_page(
    url: str, site: str, supplier_slug: str
) -> list[dict[str, Any]]:
    """Scrape a single coupon page and extract codes."""
    html = await fetch_page_html(url, wait_time=4)
    soup = BeautifulSoup(html, "lxml")
    coupons: list[dict] = []

    if site == "vouchercodes":
        coupons = _parse_vouchercodes(soup, url, supplier_slug)
    elif site == "myvouchercodes":
        coupons = _parse_myvouchercodes(soup, url, supplier_slug)

    return coupons


def _parse_vouchercodes(
    soup: BeautifulSoup, source_url: str, supplier_slug: str
) -> list[dict[str, Any]]:
    """Parse VoucherCodes.co.uk coupon cards."""
    coupons: list[dict] = []
    now = datetime.now(timezone.utc)
    default_expiry = (now + timedelta(days=30)).isoformat()

    # VoucherCodes uses offer cards with class patterns
    cards = soup.find_all("div", class_=re.compile(r"offer-card|voucher-card|code-card"))
    if not cards:
        cards = soup.find_all("li", class_=re.compile(r"offer|voucher|code"))
    if not cards:
        # Broader fallback: any element with data-offer or data-voucher
        cards = soup.find_all(attrs={"data-offer-id": True})
    if not cards:
        cards = soup.find_all("article")

    for card in cards:
        coupon = _extract_coupon_from_card(card, source_url, supplier_slug, default_expiry)
        if coupon:
            coupons.append(coupon)

    return coupons


def _parse_myvouchercodes(
    soup: BeautifulSoup, source_url: str, supplier_slug: str
) -> list[dict[str, Any]]:
    """Parse MyVoucherCodes.co.uk coupon cards."""
    coupons: list[dict] = []
    now = datetime.now(timezone.utc)
    default_expiry = (now + timedelta(days=30)).isoformat()

    # MyVoucherCodes uses similar card patterns
    cards = soup.find_all("div", class_=re.compile(r"voucher|offer|deal-card|code-box"))
    if not cards:
        cards = soup.find_all("li", class_=re.compile(r"voucher|offer"))
    if not cards:
        cards = soup.find_all("article")

    for card in cards:
        coupon = _extract_coupon_from_card(card, source_url, supplier_slug, default_expiry)
        if coupon:
            coupons.append(coupon)

    return coupons


def _extract_coupon_from_card(
    card, source_url: str, supplier_slug: str, default_expiry: str
) -> dict[str, Any] | None:
    """Extract coupon data from a card element (works for both sites)."""
    card_text = card.get_text(" ", strip=True)

    # Skip "deal" or "no code needed" entries
    lower_text = card_text.lower()
    if "no code" in lower_text or "no voucher" in lower_text:
        return None

    # Find the actual code — look for code elements or buttons
    code = None
    code_el = card.find(class_=re.compile(r"code-text|voucher-code|coupon-code|code$"))
    if code_el:
        code = code_el.get_text(strip=True)
    if not code:
        code_el = card.find("span", class_=re.compile(r"code"))
        if code_el:
            code = code_el.get_text(strip=True)
    if not code:
        # Look for button with "get code" or "reveal" text
        btn = card.find("button", string=re.compile(r"code|reveal", re.I))
        if btn:
            code_span = btn.find("span")
            if code_span:
                code = code_span.get_text(strip=True)
    if not code:
        # Try data attributes
        code = card.get("data-code") or card.get("data-voucher-code") or ""
    if not code:
        # Regex: look for ALL-CAPS alphanumeric codes (3-20 chars)
        code_match = re.search(r"\b([A-Z0-9]{3,20})\b", card_text)
        if code_match and not code_match.group(1).isdigit():
            code = code_match.group(1)

    if not code or len(code) < 3 or len(code) > 30:
        return None

    # Skip if it looks like a generic word, not a code
    skip_words = {"THE", "AND", "FOR", "OFF", "GET", "FREE", "CODE", "DEAL", "SALE", "NEW", "ALL", "NOW"}
    if code.upper() in skip_words:
        return None

    # Description
    desc_el = card.find(class_=re.compile(r"title|description|offer-text|heading"))
    if not desc_el:
        desc_el = card.find(["h2", "h3", "h4", "p"])
    description = desc_el.get_text(strip=True) if desc_el else card_text[:200]

    # Discount type + value
    discount_type, discount_value = _parse_discount(card_text)

    # Minimum spend
    minimum_spend = None
    spend_match = re.search(r"(?:spend|orders?\s+over|min(?:imum)?)\s*(?:of\s*)?£(\d+\.?\d*)", lower_text)
    if spend_match:
        minimum_spend = float(spend_match.group(1))

    # Expiry date
    valid_until = default_expiry
    expiry_match = re.search(
        r"(?:expires?|ends?|valid\s+until)\s*:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})", lower_text
    )
    if expiry_match:
        try:
            from dateutil.parser import parse as dateparse
            valid_until = dateparse(expiry_match.group(1), dayfirst=True).isoformat()
        except Exception:
            pass

    # Is verified
    is_verified = bool(re.search(r"verified|tested|working", lower_text))

    return {
        "supplier_slug": supplier_slug,
        "code": code.strip(),
        "description": description[:500],
        "discount_type": discount_type,
        "discount_value": discount_value,
        "minimum_spend": minimum_spend,
        "valid_until": valid_until,
        "is_verified": is_verified,
        "source_url": source_url,
    }


def _parse_discount(text: str) -> tuple[str | None, float | None]:
    """Parse discount type and value from text."""
    lower = text.lower()

    # Free delivery
    if "free delivery" in lower or "free shipping" in lower or "free postage" in lower:
        return "free_delivery", None

    # Percentage off
    pct_match = re.search(r"(\d+)\s*%\s*(?:off|discount|saving)", lower)
    if pct_match:
        return "percentage", float(pct_match.group(1))

    # Fixed amount off
    fixed_match = re.search(r"£(\d+\.?\d*)\s*(?:off|discount|saving)", lower)
    if fixed_match:
        return "fixed", float(fixed_match.group(1))

    # "Save X%"
    save_pct = re.search(r"save\s+(\d+)\s*%", lower)
    if save_pct:
        return "percentage", float(save_pct.group(1))

    # "Save £X"
    save_fixed = re.search(r"save\s+£(\d+\.?\d*)", lower)
    if save_fixed:
        return "fixed", float(save_fixed.group(1))

    return None, None
