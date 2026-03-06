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


async def scrape_toolstation(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape Toolstation category and search pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for page_info in PAGES:
        try:
            products = await _scrape_page(supplier_id, page_info, seen_skus)
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


async def _scrape_page(
    supplier_id: str,
    page_info: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape a single page (category or search results)."""
    url = BASE_URL + page_info["path"]
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
        product_links = soup.find_all("a", href=re.compile(r"/p\d+|/products?/"))
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
    # Find product link
    link = card.find("a", href=True)
    if not link:
        return None

    href = link.get("href", "")
    sku_match = re.search(r"/p(?:roducts?/)?(\w+)", href)
    if not sku_match:
        return None
    sku = sku_match.group(1)
    if sku in seen_skus:
        return None

    # Name
    name = ""
    name_el = card.find(attrs={"data-testid": re.compile(r"product.*name|product.*title")})
    if name_el:
        name = name_el.get_text(strip=True)
    if not name:
        name = link.get_text(strip=True)
    if not name or len(name) < 3:
        return None

    # Price
    card_text = card.get_text()
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
    sku_match = re.search(r"/p(?:roducts?/)?(\w+)", href)
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
