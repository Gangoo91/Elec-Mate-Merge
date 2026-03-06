"""ElectricalDirect scraper — uses Crawl4AI stealth browser.

ElectricalDirect (electricaldirect.co.uk) is a smaller online retailer.
Uses stealth browser to bypass 403 blocks.
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

BASE_URL = "https://www.electricaldirect.co.uk"

# Category and search pages mapped to edge-function slugs
PAGES: list[dict[str, str]] = [
    # Materials
    {"path": "/cable", "category": "cables", "type": "material"},
    {"path": "/cable-accessories", "category": "cables", "type": "material"},
    {"path": "/consumer-units", "category": "consumer-units", "type": "material"},
    {"path": "/circuit-protection", "category": "circuit-protection", "type": "material"},
    {"path": "/wiring-accessories", "category": "wiring-accessories", "type": "material"},
    {"path": "/switches-sockets", "category": "wiring-accessories", "type": "material"},
    {"path": "/lighting", "category": "lighting", "type": "material"},
    {"path": "/led-lighting", "category": "lighting", "type": "material"},
    {"path": "/emergency-lighting", "category": "lighting", "type": "material"},
    {"path": "/cable-management", "category": "containment", "type": "material"},
    {"path": "/trunking", "category": "containment", "type": "material"},
    {"path": "/conduit", "category": "containment", "type": "material"},
    {"path": "/earthing-bonding", "category": "earthing", "type": "material"},
    {"path": "/fire-alarm", "category": "fire-security", "type": "material"},
    {"path": "/ev-charging", "category": "ev-charging", "type": "material"},
    {"path": "/data-networking", "category": "data-networking", "type": "material"},
    {"path": "/fixings", "category": "fixings", "type": "material"},
    # Tools
    {"path": "/test-equipment", "category": "test-equipment", "type": "tool"},
    {"path": "/hand-tools", "category": "hand-tools", "type": "tool"},
    {"path": "/power-tools", "category": "power-tools", "type": "tool"},
    # PPE
    {"path": "/workwear-safety", "category": "ppe", "type": "ppe"},
]

BRANDS = [
    "Schneider", "Hager", "MK", "Click", "Chint", "Legrand",
    "BG", "Crabtree", "Wylex", "Fusebox", "Scolmore",
    "Megger", "Fluke", "Kewtech",
    "Makita", "DeWalt", "Bosch", "Milwaukee",
]


async def scrape_electrical_direct(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape ElectricalDirect category pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for page_info in PAGES:
        try:
            products = await _scrape_page(supplier_id, page_info, seen_skus)
            all_products.extend(products)
            log.info(
                "electricaldirect_page_done",
                path=page_info["path"],
                count=len(products),
            )
        except Exception as e:
            log.error(
                "electricaldirect_page_error",
                path=page_info["path"],
                error=str(e),
            )
        await asyncio.sleep(2)

    log.info("electricaldirect_total", count=len(all_products))
    return all_products


async def _scrape_page(
    supplier_id: str,
    page_info: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape a single category page."""
    url = BASE_URL + page_info["path"]
    html = await fetch_page_html(url)
    soup = BeautifulSoup(html, "lxml")
    products: list[dict] = []

    # Try standard product card patterns
    cards = soup.find_all("div", class_=re.compile(r"product-item|product-card"))
    if not cards:
        cards = soup.find_all("li", class_=re.compile(r"product-item"))
    if not cards:
        cards = soup.find_all("article", class_=re.compile(r"product"))

    for card in cards:
        product = _parse_card(card, supplier_id, page_info, seen_skus)
        if product:
            products.append(product)

    # Fallback: product links
    if not products:
        links = soup.find_all("a", href=re.compile(r"/p/|/product"))
        processed: set[str] = set()
        for link in links:
            href = link.get("href", "")
            if href in processed:
                continue
            processed.add(href)
            name = link.get_text(strip=True)
            if not name or len(name) < 3:
                continue
            sku = re.sub(r"[^a-zA-Z0-9]", "", href.split("/")[-1][:30])
            if not sku or sku in seen_skus:
                continue
            seen_skus.add(sku)
            product_url = href if href.startswith("http") else BASE_URL + href
            products.append({
                "supplier_id": supplier_id,
                "sku": sku,
                "name": name,
                "brand": _detect_brand(name),
                "category": page_info["category"],
                "product_type": page_info["type"],
                "current_price": None,
                "regular_price": None,
                "is_on_sale": False,
                "image_url": None,
                "product_url": product_url,
                "stock_status": "unknown",
            })

    return products


def _parse_card(
    card, supplier_id: str, page_info: dict[str, str], seen_skus: set[str]
) -> dict[str, Any] | None:
    """Parse a product card."""
    name_el = card.find(class_=re.compile(r"product-item-name|product-name|product-title"))
    if not name_el:
        name_el = card.find(["h2", "h3", "h4"])
    if not name_el:
        return None
    name = name_el.get_text(strip=True)
    if not name or len(name) < 3:
        return None

    link = card.find("a", href=True)
    href = link.get("href", "") if link else ""
    product_url = href if href.startswith("http") else BASE_URL + href

    sku = card.get("data-sku") or card.get("data-product-id") or ""
    if not sku:
        sku_match = re.search(r"/([^/]+?)(?:\.html)?$", href)
        sku = sku_match.group(1) if sku_match else re.sub(r"[^a-zA-Z0-9]", "", name[:30])
    if sku in seen_skus:
        return None

    price = None
    price_el = card.find(class_=re.compile(r"price$|price-now"))
    if price_el:
        price = clean_price(price_el.get_text())
    if price is None:
        pm = re.search(r"£(\d+\.?\d*)", card.get_text())
        if pm:
            price = clean_price(pm.group())

    img = card.find("img")
    image_url = None
    if img:
        src = img.get("src") or img.get("data-src") or ""
        if src and not src.startswith("data:"):
            image_url = src if src.startswith("http") else BASE_URL + src

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
        "image_url": image_url,
        "product_url": product_url,
        "stock_status": "unknown",
    }


def _detect_brand(name: str) -> str | None:
    name_lower = name.lower()
    for brand in BRANDS:
        if brand.lower() in name_lower:
            return brand
    return None
