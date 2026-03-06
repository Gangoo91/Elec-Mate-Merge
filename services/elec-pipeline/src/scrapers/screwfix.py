"""Screwfix scraper — uses Crawl4AI stealth browser to bypass Cloudflare.

Screwfix is Cloudflare-protected, so we use a headless Chromium browser
to render pages and extract product data from search results.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any

import structlog
from bs4 import BeautifulSoup

from src.scrapers.browser import fetch_page_html
from src.utils.validation import clean_price, classify_product_type

log = structlog.get_logger()

BASE_URL = "https://www.screwfix.com"

# Search terms grouped by category slug (matching marketplace-search edge function)
SEARCH_QUERIES: list[dict[str, str]] = [
    # Materials
    {"query": "twin and earth cable", "category": "cables", "type": "material"},
    {"query": "armoured cable swa", "category": "cables", "type": "material"},
    {"query": "flex cable", "category": "cables", "type": "material"},
    {"query": "singles cable 6491x", "category": "cables", "type": "material"},
    {"query": "consumer unit", "category": "consumer-units", "type": "material"},
    {"query": "distribution board", "category": "consumer-units", "type": "material"},
    {"query": "mcb circuit breaker", "category": "circuit-protection", "type": "material"},
    {"query": "rcd rcbo", "category": "circuit-protection", "type": "material"},
    {"query": "surge protection device", "category": "circuit-protection", "type": "material"},
    {"query": "socket outlet", "category": "wiring-accessories", "type": "material"},
    {"query": "light switch", "category": "wiring-accessories", "type": "material"},
    {"query": "back box pattress", "category": "wiring-accessories", "type": "material"},
    {"query": "led downlight", "category": "lighting", "type": "material"},
    {"query": "led bulb lamp", "category": "lighting", "type": "material"},
    {"query": "emergency lighting", "category": "lighting", "type": "material"},
    {"query": "batten light fitting", "category": "lighting", "type": "material"},
    {"query": "cable trunking", "category": "containment", "type": "material"},
    {"query": "conduit fitting", "category": "containment", "type": "material"},
    {"query": "cable tray", "category": "containment", "type": "material"},
    {"query": "earth rod clamp", "category": "earthing", "type": "material"},
    {"query": "earth tape bonding", "category": "earthing", "type": "material"},
    {"query": "smoke alarm detector", "category": "fire-security", "type": "material"},
    {"query": "fire alarm system", "category": "fire-security", "type": "material"},
    {"query": "ev charger electric vehicle", "category": "ev-charging", "type": "material"},
    {"query": "cat6 ethernet cable", "category": "data-networking", "type": "material"},
    {"query": "cable clip", "category": "fixings", "type": "material"},
    {"query": "cable gland", "category": "fixings", "type": "material"},
    {"query": "cable tie", "category": "fixings", "type": "material"},
    # Tools
    {"query": "electricians screwdriver vde", "category": "hand-tools", "type": "tool"},
    {"query": "pliers cutters electrician", "category": "hand-tools", "type": "tool"},
    {"query": "cable stripper crimper", "category": "hand-tools", "type": "tool"},
    {"query": "combi drill cordless", "category": "power-tools", "type": "tool"},
    {"query": "sds drill", "category": "power-tools", "type": "tool"},
    {"query": "impact driver", "category": "power-tools", "type": "tool"},
    {"query": "multifunction tester electrical", "category": "test-equipment", "type": "tool"},
    {"query": "voltage indicator tester", "category": "test-equipment", "type": "tool"},
    {"query": "socket tester", "category": "test-equipment", "type": "tool"},
    {"query": "insulation resistance tester megger", "category": "test-equipment", "type": "tool"},
    # PPE
    {"query": "safety boots electrical", "category": "ppe", "type": "ppe"},
    {"query": "hi vis vest jacket", "category": "ppe", "type": "ppe"},
    {"query": "safety glasses goggles", "category": "ppe", "type": "ppe"},
]

BRANDS = [
    "Schneider", "Hager", "MK", "Click", "Chint", "Legrand",
    "BG", "Crabtree", "Wylex", "Fusebox", "Scolmore",
    "Deta", "Knightsbridge", "Megger", "Fluke", "Kewtech",
    "Martindale", "Di-Log", "Makita", "DeWalt", "Bosch", "Milwaukee",
    "LAP", "British General", "Philips", "Osram", "Aurora",
]


async def scrape_screwfix(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape Screwfix via search pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for sq in SEARCH_QUERIES:
        try:
            products = await _scrape_search(supplier_id, sq, seen_skus)
            all_products.extend(products)
            log.info(
                "screwfix_search_done",
                query=sq["query"],
                category=sq["category"],
                count=len(products),
            )
        except Exception as e:
            log.error(
                "screwfix_search_error",
                query=sq["query"],
                error=str(e),
            )
        await asyncio.sleep(5)

    log.info("screwfix_total", count=len(all_products))
    return all_products


async def _scrape_search(
    supplier_id: str,
    sq: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape a single search results page."""
    url = f"{BASE_URL}/search?search={sq['query']}"
    html = await fetch_page_html(url, wait_time=5.0)
    soup = BeautifulSoup(html, "lxml")
    products: list[dict] = []

    # Screwfix product links: /p/product-slug/SKU (e.g. /p/some-product-name/453vf)
    product_links = soup.find_all("a", href=re.compile(r"/p/[^/]+/[a-zA-Z0-9]+"))
    processed: set[str] = set()

    for link in product_links:
        href = link.get("href", "")
        if href in processed:
            continue
        processed.add(href)

        # Extract SKU from URL: /p/slug/453vf
        sku_match = re.search(r"/p/[^/]+/([a-zA-Z0-9]+)$", href)
        if not sku_match:
            continue
        sku = sku_match.group(1)
        if sku in seen_skus:
            continue

        # Get product name from link text
        name = link.get_text(strip=True)
        if not name or len(name) < 5:
            # Try span inside link
            span = link.find("span")
            if span:
                name = span.get_text(strip=True)
        # Skip review-count links like "(99)"
        if not name or len(name) < 5 or re.match(r"^\(\d+\)$", name):
            continue

        # Find the product card container for price/image
        card = link.find_parent("div", recursive=True)
        if not card:
            card = link.parent
        if not card:
            continue

        # Try to get wider container for price info
        for _ in range(5):
            parent = card.parent
            if parent and parent.name == "div":
                text = parent.get_text()
                if "£" in text:
                    card = parent
                    break
                card = parent

        # Find price
        card_text = card.get_text()
        price = None
        price_matches = re.findall(r"£(\d+\.?\d*)", card_text)
        if price_matches:
            # First price is usually inc. VAT price
            price = clean_price(price_matches[0])

        # Find image
        img = card.find("img")
        image_url = None
        if img:
            src = img.get("src") or img.get("data-src") or ""
            if src and not src.startswith("data:"):
                image_url = src if src.startswith("http") else BASE_URL + src

        product_url = BASE_URL + href if href.startswith("/") else href
        brand = _detect_brand(name)

        seen_skus.add(sku)
        products.append({
            "supplier_id": supplier_id,
            "sku": sku,
            "name": name,
            "brand": brand,
            "category": sq["category"],
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
