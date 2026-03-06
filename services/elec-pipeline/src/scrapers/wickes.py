"""Wickes scraper — uses Crawl4AI stealth browser to bypass Cloudflare.

Wickes embeds product data in JavaScript dataLayer on search pages.
We extract product info using regex to parse the JS object literals.
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

BASE_URL = "https://www.wickes.co.uk"

# Search queries grouped by category and product type
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


async def scrape_wickes(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape Wickes via search pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for sq in SEARCH_QUERIES:
        try:
            products = await _scrape_search(supplier_id, sq, seen_skus)
            all_products.extend(products)
            log.info(
                "wickes_search_done",
                query=sq["query"],
                category=sq["category"],
                count=len(products),
            )
        except Exception as e:
            log.error(
                "wickes_search_error",
                query=sq["query"],
                error=str(e),
            )
        await asyncio.sleep(3)

    log.info("wickes_total", count=len(all_products))
    return all_products


async def _scrape_search(
    supplier_id: str,
    sq: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape a single search results page."""
    url = f"{BASE_URL}/search?text={sq['query']}&pageSize=48"
    html = await fetch_page_html(url, wait_time=5.0)
    products: list[dict] = []

    # Extract product data from JavaScript dataLayer
    # Pattern: var product = { name: "...", id: "...", price: "...", brand: "...", category: "..." }
    product_pattern = r'var product = \{\s*name:\s*"([^"]+)",\s*id:\s*"(\d+)",\s*price:\s*"([\d.]+)",\s*brand:\s*"([^"]*)",\s*category:\s*"([^"]*)"'
    matches = re.finditer(product_pattern, html)

    # Parse soup once for URL/image extraction
    soup = BeautifulSoup(html, "lxml")

    for match in matches:
        name, product_id, price_str, brand_raw, category_raw = match.groups()

        if product_id in seen_skus:
            continue

        price = clean_price(price_str) if price_str else None
        brand = brand_raw.strip() if brand_raw else _detect_brand(name)
        category = sq["category"]

        seen_skus.add(product_id)

        # Find product URL from page links
        link = soup.find("a", href=re.compile(rf"/p/{product_id}$"))
        if link:
            href = link.get("href", "")
            product_url = BASE_URL + href if href.startswith("/") else href
        else:
            product_slug = name.lower().replace(" ", "-").replace("/", "-")
            product_url = f"{BASE_URL}/{product_slug}/p/{product_id}"

        # Find image near the link
        image_url = None
        if link:
            img = link.find("img")
            if img:
                src = img.get("src") or img.get("data-src") or ""
                if src and not src.startswith("data:"):
                    image_url = src if src.startswith("http") else BASE_URL + src

        products.append({
            "supplier_id": supplier_id,
            "sku": product_id,
            "name": name,
            "brand": brand,
            "category": category,
            "product_type": sq["type"],
            "current_price": price,
            "regular_price": price,
            "is_on_sale": False,
            "image_url": image_url,
            "product_url": product_url,
            "stock_status": "unknown",
        })

    return products


def _detect_brand(name: str) -> str | None:
    name_lower = name.lower()
    for brand in BRANDS:
        if brand.lower() in name_lower:
            return brand
    return None
