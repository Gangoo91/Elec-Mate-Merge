"""CEF (City Electrical Factors) scraper — uses Crawl4AI stealth browser.

CEF is a major UK electrical wholesaler. Their website uses a
catalogue structure at /catalogue/products/.
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

BASE_URL = "https://www.cef.co.uk"

# Category pages mapped to edge-function slugs
CATEGORIES: list[dict[str, str]] = [
    # Materials
    {"path": "/catalogue/products/cables-accessories", "category": "cables", "type": "material"},
    {"path": "/catalogue/products/consumer-units", "category": "consumer-units", "type": "material"},
    {"path": "/catalogue/products/distribution-boards", "category": "consumer-units", "type": "material"},
    {"path": "/catalogue/products/circuit-protection", "category": "circuit-protection", "type": "material"},
    {"path": "/catalogue/products/mcbs", "category": "circuit-protection", "type": "material"},
    {"path": "/catalogue/products/rcds", "category": "circuit-protection", "type": "material"},
    {"path": "/catalogue/products/rcbos", "category": "circuit-protection", "type": "material"},
    {"path": "/catalogue/products/wiring-accessories", "category": "wiring-accessories", "type": "material"},
    {"path": "/catalogue/products/switches-sockets", "category": "wiring-accessories", "type": "material"},
    {"path": "/catalogue/products/lighting", "category": "lighting", "type": "material"},
    {"path": "/catalogue/products/led-lighting", "category": "lighting", "type": "material"},
    {"path": "/catalogue/products/emergency-lighting", "category": "lighting", "type": "material"},
    {"path": "/catalogue/products/cable-management", "category": "containment", "type": "material"},
    {"path": "/catalogue/products/trunking", "category": "containment", "type": "material"},
    {"path": "/catalogue/products/conduit", "category": "containment", "type": "material"},
    {"path": "/catalogue/products/earthing-bonding", "category": "earthing", "type": "material"},
    {"path": "/catalogue/products/fire-alarms", "category": "fire-security", "type": "material"},
    {"path": "/catalogue/products/ev-charging", "category": "ev-charging", "type": "material"},
    {"path": "/catalogue/products/data-communications", "category": "data-networking", "type": "material"},
    {"path": "/catalogue/products/fixings-fasteners", "category": "fixings", "type": "material"},
    # Tools
    {"path": "/catalogue/products/hand-tools", "category": "hand-tools", "type": "tool"},
    {"path": "/catalogue/products/power-tools", "category": "power-tools", "type": "tool"},
    {"path": "/catalogue/products/test-measurement", "category": "test-equipment", "type": "tool"},
]

BRANDS = [
    "Schneider", "Hager", "MK", "Click", "Chint", "Legrand",
    "BG", "Crabtree", "Wylex", "Fusebox", "Scolmore",
    "Megger", "Fluke", "Kewtech", "Martindale", "Di-Log",
    "Makita", "DeWalt", "Bosch", "Milwaukee",
]


async def scrape_cef(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape CEF catalogue pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for cat in CATEGORIES:
        try:
            products = await _scrape_category(supplier_id, cat, seen_skus)
            all_products.extend(products)
            log.info(
                "cef_category_done",
                category=cat["category"],
                path=cat["path"],
                count=len(products),
            )
        except Exception as e:
            log.error(
                "cef_category_error",
                category=cat["category"],
                error=str(e),
            )
        await asyncio.sleep(3)

    log.info("cef_total", count=len(all_products))
    return all_products


async def _scrape_category(
    supplier_id: str,
    cat: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape a single CEF category page."""
    url = BASE_URL + cat["path"]
    html = await fetch_page_html(url, wait_time=15.0)
    soup = BeautifulSoup(html, "lxml")
    products: list[dict] = []

    # CEF Magento-style product cards
    cards = soup.find_all("div", class_=re.compile(r"product-item|product-card"))
    if not cards:
        cards = soup.find_all("li", class_=re.compile(r"product-item"))

    for card in cards:
        product = _parse_product_card(card, supplier_id, cat, seen_skus)
        if product:
            products.append(product)

    # Fallback: find product links with /catalogue/ pattern
    if not products:
        links = soup.find_all("a", href=re.compile(r"/catalogue/products?/[^/]+/[^/]+"))
        processed: set[str] = set()
        for link in links:
            href = link.get("href", "")
            if href in processed:
                continue
            processed.add(href)
            product = _parse_link(link, supplier_id, cat, seen_skus)
            if product:
                products.append(product)

    # Also try paginated results (page 2+)
    next_page = soup.find("a", class_=re.compile(r"next"))
    if next_page and next_page.get("href") and len(products) > 10:
        try:
            await asyncio.sleep(2)
            next_url = next_page["href"]
            if not next_url.startswith("http"):
                next_url = BASE_URL + next_url
            html2 = await fetch_page_html(next_url)
            soup2 = BeautifulSoup(html2, "lxml")
            cards2 = soup2.find_all("div", class_=re.compile(r"product-item|product-card"))
            if not cards2:
                cards2 = soup2.find_all("li", class_=re.compile(r"product-item"))
            for card in cards2:
                product = _parse_product_card(card, supplier_id, cat, seen_skus)
                if product:
                    products.append(product)
        except Exception:
            pass

    return products


def _parse_product_card(
    card, supplier_id: str, cat: dict[str, str], seen_skus: set[str]
) -> dict[str, Any] | None:
    """Parse a Magento-style product card."""
    # Name
    name_el = card.find(class_=re.compile(r"product-item-name|product-name|product-title"))
    if not name_el:
        name_el = card.find(["h2", "h3", "h4"])
    if not name_el:
        return None
    name = name_el.get_text(strip=True)
    if not name or len(name) < 3:
        return None

    # Link + SKU
    link = card.find("a", href=True)
    if not link:
        return None
    href = link.get("href", "")
    product_url = href if href.startswith("http") else BASE_URL + href

    # Try to extract SKU from data attributes or URL
    sku = card.get("data-product-sku") or card.get("data-sku") or ""
    if not sku:
        sku_match = re.search(r"/([A-Z0-9][\w-]{3,}?)(?:\.html)?$", href)
        if sku_match:
            sku = sku_match.group(1)
    if not sku:
        sku = re.sub(r"[^a-zA-Z0-9]", "", name[:30])
    if sku in seen_skus:
        return None

    # Price
    price_el = card.find(class_=re.compile(r"price-box|price$|price-now"))
    price = None
    if price_el:
        price = clean_price(price_el.get_text())
    if price is None:
        # Fallback: any £ in card
        card_text = card.get_text()
        pm = re.search(r"£(\d+\.?\d*)", card_text)
        if pm:
            price = clean_price(pm.group())

    # Image
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
        "category": cat["category"],
        "product_type": cat["type"],
        "current_price": price,
        "regular_price": price,
        "is_on_sale": False,
        "image_url": image_url,
        "product_url": product_url,
        "stock_status": "unknown",
    }


def _parse_link(
    link, supplier_id: str, cat: dict[str, str], seen_skus: set[str]
) -> dict[str, Any] | None:
    """Parse a product from a link and context."""
    href = link.get("href", "")
    name = link.get_text(strip=True)
    if not name or len(name) < 3:
        return None

    sku = re.sub(r"[^a-zA-Z0-9]", "", name[:30])
    if sku in seen_skus:
        return None

    product_url = href if href.startswith("http") else BASE_URL + href

    seen_skus.add(sku)
    return {
        "supplier_id": supplier_id,
        "sku": sku,
        "name": name,
        "brand": _detect_brand(name),
        "category": cat["category"],
        "product_type": cat["type"],
        "current_price": None,
        "regular_price": None,
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
