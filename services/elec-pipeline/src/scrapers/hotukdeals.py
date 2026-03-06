"""HotUKDeals scraper — community-verified electrical deals + coupon codes.

Scrapes HotUKDeals search results for electrical tool/material deals.
Extracts products for marketplace_products and coupon codes for
marketplace_coupon_codes.
"""

from __future__ import annotations

import re
from datetime import datetime, timedelta, timezone
from typing import Any

import structlog
from bs4 import BeautifulSoup

from src.scrapers.browser import fetch_page_html

log = structlog.get_logger()

BASE_URL = "https://www.hotukdeals.com"

# Search queries for electrical deals
SEARCH_QUERIES = [
    "screwfix",
    "toolstation",
    "electrician tools",
    "milwaukee makita dewalt",
    "megger fluke kewtech",
    "consumer unit",
    "led lighting electrical",
    "cable wire electrical",
]

# Supplier name → slug mapping for coupon association
SUPPLIER_MAP: dict[str, str] = {
    "screwfix": "screwfix",
    "toolstation": "toolstation",
    "cef": "cef",
    "city electrical factors": "cef",
    "tlc direct": "tlc-electrical",
    "tlc electrical": "tlc-electrical",
    "electricaldirect": "electrical-direct",
    "electrical direct": "electrical-direct",
    "rs components": "rs-components",
    "rs online": "rs-components",
    "edmundson": "edmundson",
    "amazon": "amazon",
    "ebay": "ebay",
}


async def scrape_hotukdeals() -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    """Scrape HotUKDeals for electrical deals.

    Returns (products, coupons) — products go to marketplace_products,
    coupons go to marketplace_coupon_codes.
    """
    all_products: list[dict] = []
    all_coupons: list[dict] = []
    seen_urls: set[str] = set()

    for query in SEARCH_QUERIES:
        try:
            products, coupons = await _scrape_search(query, seen_urls)
            all_products.extend(products)
            all_coupons.extend(coupons)
            log.info(
                "hotukdeals_search_done",
                query=query,
                products=len(products),
                coupons=len(coupons),
            )
        except Exception as e:
            log.error("hotukdeals_search_error", query=query, error=str(e))

    log.info(
        "hotukdeals_total",
        products=len(all_products),
        coupons=len(all_coupons),
    )
    return all_products, all_coupons


async def _scrape_search(
    query: str, seen_urls: set[str]
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    """Scrape a single search query from HotUKDeals."""
    url = f"{BASE_URL}/search?q={query}"
    html = await fetch_page_html(url, wait_time=4)
    soup = BeautifulSoup(html, "lxml")

    products: list[dict] = []
    coupons: list[dict] = []
    now = datetime.now(timezone.utc)

    # HotUKDeals uses article elements or thread cards
    cards = soup.find_all("article", class_=re.compile(r"thread"))
    if not cards:
        cards = soup.find_all("div", class_=re.compile(r"threadGrid|thread-card|deal-card"))
    if not cards:
        cards = soup.find_all("article")

    for card in cards:
        result = _parse_deal_card(card, seen_urls, now)
        if result:
            product, coupon = result
            if product:
                products.append(product)
            if coupon:
                coupons.append(coupon)

    return products, coupons


def _parse_deal_card(
    card, seen_urls: set[str], now: datetime
) -> tuple[dict[str, Any] | None, dict[str, Any] | None] | None:
    """Parse a HotUKDeals thread/deal card."""
    # Title
    title_el = card.find(class_=re.compile(r"thread-title|threadGrid-title"))
    if not title_el:
        title_el = card.find(["h2", "h3"])
    if not title_el:
        title_el = card.find("a", class_=re.compile(r"thread"))
    if not title_el:
        return None
    title = title_el.get_text(strip=True)
    if not title or len(title) < 5:
        return None

    # Deal link
    link = title_el.find("a", href=True) if title_el.name != "a" else title_el
    if not link:
        link = card.find("a", href=True)
    if not link:
        return None
    deal_url = link.get("href", "")
    if not deal_url.startswith("http"):
        deal_url = BASE_URL + deal_url

    if deal_url in seen_urls:
        return None
    seen_urls.add(deal_url)

    card_text = card.get_text(" ", strip=True)
    lower_text = card_text.lower()

    # Price
    price = None
    price_el = card.find(class_=re.compile(r"thread-price|threadGrid-price"))
    if price_el:
        pm = re.search(r"£(\d+\.?\d*)", price_el.get_text())
        if pm:
            price = float(pm.group(1))
    if price is None:
        pm = re.search(r"£(\d+\.?\d*)", card_text)
        if pm:
            price = float(pm.group(1))

    # Original price / discount
    original_price = None
    discount_pct = None
    orig_match = re.search(r"(?:was|rrp|from)\s*£(\d+\.?\d*)", lower_text)
    if orig_match:
        original_price = float(orig_match.group(1))
    if price and original_price and original_price > price:
        discount_pct = round((1 - price / original_price) * 100)

    # Temperature score (community voting)
    temperature = 0
    temp_el = card.find(class_=re.compile(r"vote-temp|temperature|cept-vote"))
    if temp_el:
        temp_text = temp_el.get_text(strip=True).replace("°", "")
        temp_match = re.search(r"(-?\d+)", temp_text)
        if temp_match:
            temperature = int(temp_match.group(1))

    # Image
    img = card.find("img")
    image_url = None
    if img:
        src = img.get("src") or img.get("data-src") or ""
        if src and not src.startswith("data:") and "pixel" not in src:
            image_url = src

    # Merchant/supplier
    merchant = None
    merchant_el = card.find(class_=re.compile(r"merchant|thread-merchant|cept-merchant"))
    if merchant_el:
        merchant = merchant_el.get_text(strip=True)
    supplier_slug = _detect_supplier(title, merchant)

    # Coupon code (if present)
    coupon_code = None
    code_el = card.find(class_=re.compile(r"voucher|code|coupon"))
    if code_el:
        code_text = code_el.get_text(strip=True)
        # Extract code pattern (uppercase alphanumeric)
        code_match = re.search(r"\b([A-Z0-9]{3,20})\b", code_text)
        if code_match and not code_match.group(1).isdigit():
            coupon_code = code_match.group(1)
    if not coupon_code:
        # Look for "code: XXX" or "voucher: XXX" in text
        code_match = re.search(r"(?:code|voucher|coupon)\s*:?\s*([A-Z0-9]{3,20})", card_text, re.I)
        if code_match:
            coupon_code = code_match.group(1).upper()

    # Build product dict (for marketplace_products, expires in 2 days)
    expires_at = (now + timedelta(days=2)).isoformat()
    product = None
    if supplier_slug:
        product = {
            "supplier_slug": supplier_slug,
            "sku": f"hukd-{hash(deal_url) & 0xFFFFFFFF:08x}",
            "name": title[:300],
            "brand": _detect_brand(title),
            "category": _guess_category(title),
            "product_type": _guess_type(title),
            "current_price": price,
            "regular_price": original_price,
            "is_on_sale": True,
            "discount_percentage": discount_pct,
            "image_url": image_url,
            "product_url": deal_url,
            "stock_status": "in_stock",
            "expires_at": expires_at,
        }

    # Build coupon dict (if code found, expires in 14 days)
    coupon = None
    if coupon_code and supplier_slug:
        coupon = {
            "supplier_slug": supplier_slug,
            "code": coupon_code,
            "description": title[:500],
            "discount_type": "percentage" if discount_pct else "fixed" if price else None,
            "discount_value": discount_pct or (original_price - price if original_price and price else None),
            "minimum_spend": None,
            "valid_until": (now + timedelta(days=14)).isoformat(),
            "is_verified": temperature > 50,
            "source_url": deal_url,
        }

    return product, coupon


def _detect_supplier(title: str, merchant: str | None) -> str | None:
    """Detect supplier slug from title and merchant name."""
    text = f"{title} {merchant or ''}".lower()
    for keyword, slug in SUPPLIER_MAP.items():
        if keyword in text:
            return slug
    return None


BRANDS = [
    "Milwaukee", "Makita", "DeWalt", "Bosch", "Ryobi",
    "Megger", "Fluke", "Kewtech", "Martindale", "Di-Log",
    "Schneider", "Hager", "Click", "Chint",
    "Wera", "Knipex", "Stanley", "Wiha",
]


def _detect_brand(title: str) -> str | None:
    lower = title.lower()
    for brand in BRANDS:
        if brand.lower() in lower:
            return brand
    return None


CATEGORY_KEYWORDS: dict[str, list[str]] = {
    "power-tools": ["drill", "saw", "grinder", "impact driver", "sds"],
    "hand-tools": ["screwdriver", "pliers", "cutter", "wrench", "spanner"],
    "test-equipment": ["tester", "multimeter", "megger", "fluke", "kewtech", "clamp meter"],
    "cables": ["cable", "wire", "flex", "twin earth"],
    "lighting": ["led", "light", "bulb", "downlight", "lamp", "floodlight"],
    "circuit-protection": ["consumer unit", "mcb", "rcbo", "rcd", "breaker"],
    "wiring-accessories": ["socket", "switch", "faceplate"],
    "ppe": ["safety boot", "hi vis", "gloves", "helmet", "goggles"],
}


def _guess_category(title: str) -> str:
    lower = title.lower()
    for cat, keywords in CATEGORY_KEYWORDS.items():
        for kw in keywords:
            if kw in lower:
                return cat
    return "general"


def _guess_type(title: str) -> str:
    lower = title.lower()
    tool_words = ["drill", "saw", "tester", "multimeter", "screwdriver", "pliers",
                  "driver", "grinder", "wrench", "tool"]
    for w in tool_words:
        if w in lower:
            return "tool"
    return "material"
