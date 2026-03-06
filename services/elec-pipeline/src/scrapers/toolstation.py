"""Toolstation scraper — uses Crawl4AI stealth browser to bypass Cloudflare.

Toolstation uses data-testid attributes which makes parsing easier once
we get past the Cloudflare challenge with the stealth browser.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any

import structlog
from bs4 import BeautifulSoup

from src.scrapers.browser import fetch_page_html
from src.utils.validation import clean_price

log = structlog.get_logger()

BASE_URL = "https://www.toolstation.com"

# Category URLs and search terms grouped by edge-function category slug
PAGES: list[dict[str, str]] = [
    # Tools — direct category pages
    {"path": "/hand-tools/screwdrivers/c675", "category": "hand-tools", "type": "tool"},
    {"path": "/hand-tools/pliers-cutters/c670", "category": "hand-tools", "type": "tool"},
    {"path": "/hand-tools/electrical-tools/c39", "category": "hand-tools", "type": "tool"},
    {"path": "/power-tools/drills/c719", "category": "power-tools", "type": "tool"},
    {"path": "/power-tools/saws/c722", "category": "power-tools", "type": "tool"},
    {"path": "/power-tools/angle-grinders/c378", "category": "power-tools", "type": "tool"},
    {"path": "/electrical-supplies-accessories/electrical-test-equipment/c1024", "category": "test-equipment", "type": "tool"},
    {"path": "/workwear-safety/ppe/c735", "category": "ppe", "type": "ppe"},
    {"path": "/site-equipment/tool-storage/c742", "category": "tool-storage", "type": "tool"},
    # Materials — search queries
    {"path": "/search?q=twin+earth+cable", "category": "cables", "type": "material"},
    {"path": "/search?q=armoured+cable", "category": "cables", "type": "material"},
    {"path": "/search?q=flex+cable", "category": "cables", "type": "material"},
    {"path": "/search?q=consumer+unit", "category": "consumer-units", "type": "material"},
    {"path": "/search?q=mcb+breaker", "category": "circuit-protection", "type": "material"},
    {"path": "/search?q=rcbo+rcd", "category": "circuit-protection", "type": "material"},
    {"path": "/search?q=socket+outlet", "category": "wiring-accessories", "type": "material"},
    {"path": "/search?q=light+switch", "category": "wiring-accessories", "type": "material"},
    {"path": "/search?q=led+downlight", "category": "lighting", "type": "material"},
    {"path": "/search?q=emergency+light", "category": "lighting", "type": "material"},
    {"path": "/search?q=cable+trunking", "category": "containment", "type": "material"},
    {"path": "/search?q=conduit+fitting", "category": "containment", "type": "material"},
    {"path": "/search?q=earth+rod+clamp", "category": "earthing", "type": "material"},
    {"path": "/search?q=smoke+alarm+detector", "category": "fire-security", "type": "material"},
    {"path": "/search?q=ev+charger", "category": "ev-charging", "type": "material"},
    {"path": "/search?q=cable+clip+tie", "category": "fixings", "type": "material"},
    {"path": "/search?q=cable+gland", "category": "fixings", "type": "material"},
]

BRANDS = [
    "Schneider", "Hager", "MK", "Click", "Chint", "Legrand",
    "BG", "Crabtree", "Wylex", "Fusebox", "Scolmore",
    "Knightsbridge", "Megger", "Fluke", "Kewtech",
    "Makita", "DeWalt", "Bosch", "Milwaukee", "Ryobi",
    "Stanley", "Wera", "Knipex", "Wiha", "CK",
]


MAX_PAGES = 3  # Scrape up to 3 pages per category/search


async def scrape_toolstation(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape Toolstation category and search pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for page_info in PAGES:
        try:
            products = await _scrape_paginated(supplier_id, page_info, seen_skus)
            all_products.extend(products)
            log.info(
                "toolstation_page_done",
                path=page_info["path"][:50],
                category=page_info["category"],
                count=len(products),
            )
        except Exception as e:
            log.error(
                "toolstation_page_error",
                path=page_info["path"][:50],
                error=str(e),
            )
        await asyncio.sleep(2)

    log.info("toolstation_total", count=len(all_products))
    return all_products


async def _scrape_paginated(
    supplier_id: str,
    page_info: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape multiple pages of a category or search result."""
    all_products: list[dict] = []

    for page_num in range(1, MAX_PAGES + 1):
        products = await _scrape_page(supplier_id, page_info, seen_skus, page_num)
        all_products.extend(products)
        if len(products) < 20:
            # Fewer than a full page — no more pages to fetch
            break
        await asyncio.sleep(3)

    return all_products


async def _scrape_page(
    supplier_id: str,
    page_info: dict[str, str],
    seen_skus: set[str],
    page_num: int = 1,
) -> list[dict[str, Any]]:
    """Scrape a single page (category or search results)."""
    base_path = page_info["path"]

    # Add pagination params: 72 products per page
    sep = "&" if "?" in base_path else "?"
    url = f"{BASE_URL}{base_path}{sep}productsperpage=72&page={page_num}"

    html = await fetch_page_html(url)
    soup = BeautifulSoup(html, "lxml")
    products: list[dict] = []

    # Toolstation uses data-testid="product-card" for product cards
    cards = soup.find_all(attrs={"data-testid": "product-card"})

    # Fallback: look for product links
    if not cards:
        cards = soup.find_all("a", href=re.compile(r"/p/\d+|/products/"))

    for card in cards:
        product = _parse_card(card, supplier_id, page_info, seen_skus)
        if product:
            products.append(product)

    # Also try parsing from any product links in the page
    if not products:
        product_links = soup.find_all("a", href=re.compile(r"/p\w+$"))
        processed: set[str] = set()
        for link in product_links:
            href = link.get("href", "")
            if href in processed:
                continue
            processed.add(href)
            product = _parse_link(link, supplier_id, page_info, seen_skus)
            if product:
                products.append(product)

    return products


def _parse_card(
    card, supplier_id: str, page_info: dict[str, str], seen_skus: set[str]
) -> dict[str, Any] | None:
    """Parse a Toolstation product card element."""
    # Find product link — Toolstation uses /product-name/p12345 format
    link = card.find("a", href=True)
    if not link:
        return None

    href = link.get("href", "")
    # Match /p12345 or /pABC123 at end of URL
    sku_match = re.search(r"/p(\w+)$", href)
    if not sku_match:
        return None
    sku = sku_match.group(1)
    if sku in seen_skus:
        return None

    # Name — link text is often empty, extract from card text
    # Card text format: "★★★★★ (96) Product code: 10589 Product Name Here £48.30..."
    card_text = card.get_text(" ", strip=True)
    name = ""

    # Try data-testid name element first
    name_el = card.find(attrs={"data-testid": re.compile(r"product.*name|product.*title")})
    if name_el:
        name = name_el.get_text(strip=True)

    # Try link text
    if not name:
        name = link.get_text(strip=True)

    # Extract name from card text: after "Product code: XXXXX" up to the price
    if not name or len(name) < 5:
        name_match = re.search(
            r"Product\s+code:\s*\w+\s+(.+?)(?:\s+£|\s+From\s+£|\s+each\s+quantity)",
            card_text, re.IGNORECASE
        )
        if name_match:
            name = name_match.group(1).strip()

    if not name or len(name) < 5:
        return None

    # Price — first £ value is inc. VAT
    price = None
    price_matches = re.findall(r"£(\d+\.?\d*)", card_text)
    if price_matches:
        price = clean_price(price_matches[0])

    # Image
    img = card.find("img")
    image_url = None
    if img:
        src = img.get("src") or img.get("data-src") or ""
        if src and not src.startswith("data:"):
            image_url = src if src.startswith("http") else BASE_URL + src

    product_url = BASE_URL + href if href.startswith("/") else href
    brand = _detect_brand(name)

    seen_skus.add(sku)
    return {
        "supplier_id": supplier_id,
        "sku": sku,
        "name": name,
        "brand": brand,
        "category": page_info["category"],
        "product_type": page_info["type"],
        "current_price": price,
        "regular_price": price,
        "is_on_sale": False,
        "image_url": image_url,
        "product_url": product_url,
        "stock_status": "unknown",
    }


def _parse_link(
    link, supplier_id: str, page_info: dict[str, str], seen_skus: set[str]
) -> dict[str, Any] | None:
    """Parse a product from a link element and its parent context."""
    href = link.get("href", "")
    sku_match = re.search(r"/p(\w+)$", href)
    if not sku_match:
        return None
    sku = sku_match.group(1)
    if sku in seen_skus:
        return None

    name = link.get_text(strip=True)
    if not name or len(name) < 3:
        return None

    # Walk up to find price context
    container = link.parent
    price = None
    for _ in range(5):
        if container is None:
            break
        text = container.get_text()
        if "£" in text:
            price_matches = re.findall(r"£(\d+\.?\d*)", text)
            if price_matches:
                price = clean_price(price_matches[0])
            break
        container = container.parent

    product_url = BASE_URL + href if href.startswith("/") else href

    seen_skus.add(sku)
    return {
        "supplier_id": supplier_id,
        "sku": sku,
        "name": name,
        "brand": _detect_brand(name),
        "category": page_info["category"],
        "product_type": page_info["type"],
        "current_price": price,
        "regular_price": price,
        "is_on_sale": False,
        "image_url": None,
        "product_url": product_url,
        "stock_status": "unknown",
    }


def _detect_brand(name: str) -> str | None:
    name_lower = name.lower()
    for brand in BRANDS:
        if brand.lower() in name_lower:
            return brand
    return None
