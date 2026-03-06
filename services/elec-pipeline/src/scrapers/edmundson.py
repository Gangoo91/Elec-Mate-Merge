"""Edmundson Electrical scraper — uses Crawl4AI stealth browser.

Edmundson is a major UK electrical wholesaler. Their site uses
JS-rendered search pages, so we need a headless browser.
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

BASE_URL = "https://www.edmundson-electrical.co.uk"

# Search queries mapped to edge-function category slugs
SEARCHES: list[dict[str, str]] = [
    # Materials
    {"query": "twin earth cable", "category": "cables", "type": "material"},
    {"query": "armoured cable swa", "category": "cables", "type": "material"},
    {"query": "flex cable", "category": "cables", "type": "material"},
    {"query": "data cable cat6", "category": "data-networking", "type": "material"},
    {"query": "consumer unit", "category": "consumer-units", "type": "material"},
    {"query": "distribution board", "category": "consumer-units", "type": "material"},
    {"query": "mcb", "category": "circuit-protection", "type": "material"},
    {"query": "rcbo", "category": "circuit-protection", "type": "material"},
    {"query": "rcd", "category": "circuit-protection", "type": "material"},
    {"query": "surge protection", "category": "circuit-protection", "type": "material"},
    {"query": "socket outlet", "category": "wiring-accessories", "type": "material"},
    {"query": "light switch", "category": "wiring-accessories", "type": "material"},
    {"query": "back box", "category": "wiring-accessories", "type": "material"},
    {"query": "led downlight", "category": "lighting", "type": "material"},
    {"query": "led panel", "category": "lighting", "type": "material"},
    {"query": "emergency lighting", "category": "lighting", "type": "material"},
    {"query": "batten light", "category": "lighting", "type": "material"},
    {"query": "cable trunking", "category": "containment", "type": "material"},
    {"query": "conduit", "category": "containment", "type": "material"},
    {"query": "cable tray", "category": "containment", "type": "material"},
    {"query": "earth rod", "category": "earthing", "type": "material"},
    {"query": "earth clamp", "category": "earthing", "type": "material"},
    {"query": "smoke alarm", "category": "fire-security", "type": "material"},
    {"query": "fire alarm", "category": "fire-security", "type": "material"},
    {"query": "ev charger", "category": "ev-charging", "type": "material"},
    {"query": "cable clip", "category": "fixings", "type": "material"},
    {"query": "cable gland", "category": "fixings", "type": "material"},
    {"query": "cable tie", "category": "fixings", "type": "material"},
    # Tools
    {"query": "multimeter", "category": "test-equipment", "type": "tool"},
    {"query": "insulation tester", "category": "test-equipment", "type": "tool"},
    {"query": "fluke", "category": "test-equipment", "type": "tool"},
    {"query": "electricians tools", "category": "hand-tools", "type": "tool"},
    {"query": "cable cutter", "category": "hand-tools", "type": "tool"},
]

BRANDS = [
    "Schneider", "Hager", "MK", "Click", "Chint", "Legrand",
    "BG", "Crabtree", "Wylex", "Fusebox", "Scolmore",
    "Megger", "Fluke", "Kewtech", "Martindale",
    "Makita", "DeWalt", "Bosch", "Milwaukee",
]


async def scrape_edmundson(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape Edmundson search pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for search in SEARCHES:
        try:
            products = await _scrape_search(supplier_id, search, seen_skus)
            all_products.extend(products)
            log.info(
                "edmundson_search_done",
                query=search["query"],
                count=len(products),
            )
        except Exception as e:
            log.error(
                "edmundson_search_error",
                query=search["query"],
                error=str(e),
            )
        await asyncio.sleep(3)

    log.info("edmundson_total", count=len(all_products))
    return all_products


async def _scrape_search(
    supplier_id: str,
    search: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape search results from Edmundson."""
    url = f"{BASE_URL}/search?q={search['query']}"
    html = await fetch_page_html(url)
    soup = BeautifulSoup(html, "lxml")
    products: list[dict] = []

    # Try Magento-style product cards
    cards = soup.find_all("div", class_=re.compile(r"product-card|product-item"))
    if not cards:
        cards = soup.find_all("article")
    if not cards:
        cards = soup.find_all("li", class_=re.compile(r"product"))

    for card in cards:
        product = _parse_card(card, supplier_id, search, seen_skus)
        if product:
            products.append(product)

    # Fallback: any product links
    if not products:
        links = soup.find_all("a", href=re.compile(r"/product/"))
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
            if sku in seen_skus:
                continue
            seen_skus.add(sku)
            product_url = href if href.startswith("http") else BASE_URL + href
            products.append({
                "supplier_id": supplier_id,
                "sku": sku,
                "name": name,
                "brand": _detect_brand(name),
                "category": search["category"],
                "product_type": search["type"],
                "current_price": None,
                "regular_price": None,
                "is_on_sale": False,
                "image_url": None,
                "product_url": product_url,
                "stock_status": "unknown",
            })

    return products


def _parse_card(
    card, supplier_id: str, search: dict[str, str], seen_skus: set[str]
) -> dict[str, Any] | None:
    """Parse a product card element."""
    name_el = card.find(["h2", "h3", "h4"]) or card.find(class_=re.compile(r"name|title"))
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
    price_el = card.find(class_=re.compile(r"price"))
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
        "category": search["category"],
        "product_type": search["type"],
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
