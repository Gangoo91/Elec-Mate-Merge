"""B&Q scraper — uses Crawl4AI stealth browser to bypass Cloudflare.

B&Q puts structured JSON-LD (schema.org ItemList) in script tags.
We parse the JSON and extract product data from the ItemList structure.
"""

from __future__ import annotations

import asyncio
import json
import re
from typing import Any

import structlog
from bs4 import BeautifulSoup

from src.scrapers.browser import fetch_page_html
from src.utils.validation import clean_price

log = structlog.get_logger()

BASE_URL = "https://www.diy.com"

# Search queries grouped by category and product type
# Same as Wickes (same parent company Kingfisher)
SEARCH_QUERIES: list[dict[str, str]] = [
    # Materials
    {"query": "twin earth cable", "category": "cables", "type": "material"},
    {"query": "armoured cable", "category": "cables", "type": "material"},
    {"query": "consumer unit", "category": "consumer-units", "type": "material"},
    {"query": "mcb circuit breaker", "category": "circuit-protection", "type": "material"},
    {"query": "rcd rcbo", "category": "circuit-protection", "type": "material"},
    {"query": "socket outlet", "category": "wiring-accessories", "type": "material"},
    {"query": "light switch", "category": "wiring-accessories", "type": "material"},
    {"query": "led downlight", "category": "lighting", "type": "material"},
    {"query": "emergency lighting", "category": "lighting", "type": "material"},
    {"query": "cable trunking", "category": "containment", "type": "material"},
    {"query": "conduit fitting", "category": "containment", "type": "material"},
    {"query": "earth rod bonding", "category": "earthing", "type": "material"},
    {"query": "smoke alarm", "category": "fire-security", "type": "material"},
    {"query": "ev charger", "category": "ev-charging", "type": "material"},
    {"query": "cable clip tie", "category": "fixings", "type": "material"},
    # Tools
    {"query": "electrician screwdriver vde", "category": "hand-tools", "type": "tool"},
    {"query": "pliers cutters", "category": "hand-tools", "type": "tool"},
    {"query": "combi drill cordless", "category": "power-tools", "type": "tool"},
    {"query": "impact driver", "category": "power-tools", "type": "tool"},
    {"query": "multifunction tester", "category": "test-equipment", "type": "tool"},
    {"query": "voltage tester", "category": "test-equipment", "type": "tool"},
    # PPE
    {"query": "safety boots", "category": "ppe", "type": "ppe"},
    {"query": "hi vis vest", "category": "ppe", "type": "ppe"},
    {"query": "safety glasses", "category": "ppe", "type": "ppe"},
]

BRANDS = [
    "Schneider", "Hager", "MK", "Click", "Chint", "Legrand",
    "BG", "Crabtree", "Wylex", "Fusebox", "Scolmore",
    "Megger", "Fluke", "Kewtech", "Martindale", "Di-Log",
    "Makita", "DeWalt", "Bosch", "Milwaukee", "Ryobi",
    "Stanley", "Wera", "Knipex", "Wiha", "CK",
    "Draper", "Bahco", "Irwin", "Faithfull",
    "Wickes", "Pitacs", "LAP", "British General",
    "Clarke", "SIP", "Record",
]

MAX_PAGES = 2  # Scrape up to 2 pages per search


async def scrape_bandq(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape B&Q via search pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for sq in SEARCH_QUERIES:
        try:
            products = await _scrape_search_paginated(supplier_id, sq, seen_skus)
            all_products.extend(products)
            log.info(
                "bandq_search_done",
                query=sq["query"],
                category=sq["category"],
                count=len(products),
            )
        except Exception as e:
            log.error(
                "bandq_search_error",
                query=sq["query"],
                error=str(e),
            )
        await asyncio.sleep(3)

    log.info("bandq_total", count=len(all_products))
    return all_products


async def _scrape_search_paginated(
    supplier_id: str,
    sq: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape multiple pages of a search query."""
    all_products: list[dict] = []

    for page_num in range(1, MAX_PAGES + 1):
        products = await _scrape_search_page(supplier_id, sq, seen_skus, page_num)
        all_products.extend(products)
        if len(products) < 20:
            # Fewer than expected — no more pages
            break
        await asyncio.sleep(3)

    return all_products


async def _scrape_search_page(
    supplier_id: str,
    sq: dict[str, str],
    seen_skus: set[str],
    page_num: int = 1,
) -> list[dict[str, Any]]:
    """Scrape a single search results page."""
    url = f"{BASE_URL}/search?term={sq['query']}&page={page_num}"
    html = await fetch_page_html(url, wait_time=5.0)
    soup = BeautifulSoup(html, "lxml")
    products: list[dict] = []

    # Find JSON-LD script tags with structured data
    script_tags = soup.find_all("script", type="application/ld+json")

    for script in script_tags:
        try:
            data = json.loads(script.string)

            # Look for ItemList schema
            if isinstance(data, dict) and data.get("@type") == "ItemList":
                items = data.get("itemListElement", [])
                for item in items:
                    product = _parse_item(item, supplier_id, sq, seen_skus)
                    if product:
                        products.append(product)

            # Also check for array of objects
            elif isinstance(data, list):
                for obj in data:
                    if isinstance(obj, dict) and obj.get("@type") == "ItemList":
                        items = obj.get("itemListElement", [])
                        for item in items:
                            product = _parse_item(item, supplier_id, sq, seen_skus)
                            if product:
                                products.append(product)

        except (json.JSONDecodeError, AttributeError) as e:
            log.debug("bandq_json_parse_error", error=str(e))
            continue

    return products


def _parse_item(
    item: dict,
    supplier_id: str,
    sq: dict[str, str],
    seen_skus: set[str],
) -> dict[str, Any] | None:
    """Parse a product from ItemList element."""
    try:
        # ItemList elements can have different structures
        # Try to extract from "item" field or direct properties
        product_data = item.get("item", item)

        name = product_data.get("name")
        sku = product_data.get("sku") or product_data.get("productID")

        if not name or not sku:
            return None

        if sku in seen_skus:
            return None

        # Extract price from offers
        price = None
        offers = product_data.get("offers")
        if offers:
            if isinstance(offers, dict):
                price_raw = offers.get("price")
                if price_raw:
                    price = clean_price(str(price_raw))
            elif isinstance(offers, list) and len(offers) > 0:
                price_raw = offers[0].get("price")
                if price_raw:
                    price = clean_price(str(price_raw))

        # Get URL and image
        product_url = product_data.get("url", "")
        if product_url and not product_url.startswith("http"):
            product_url = BASE_URL + product_url

        image_url = product_data.get("image", "")
        if image_url and not image_url.startswith("http"):
            image_url = None

        # Detect brand
        brand = _detect_brand(name)

        seen_skus.add(sku)

        return {
            "supplier_id": supplier_id,
            "sku": sku,
            "name": name,
            "brand": brand,
            "category": sq["category"],
            "product_type": sq["type"],
            "current_price": price,
            "regular_price": price,
            "is_on_sale": False,
            "image_url": image_url if image_url else None,
            "product_url": product_url if product_url else None,
            "stock_status": "unknown",
        }

    except Exception as e:
        log.debug("bandq_item_parse_error", error=str(e))
        return None


def _detect_brand(name: str) -> str | None:
    name_lower = name.lower()
    for brand in BRANDS:
        if brand.lower() in name_lower:
            return brand
    return None
