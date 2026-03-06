"""FFX scraper — uses Crawl4AI stealth browser to bypass Cloudflare.

FFX has category pages for tools with standard HTML product cards.
We parse the HTML using BeautifulSoup to extract product data.
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

BASE_URL = "https://www.ffx.co.uk"

# Category pages and search queries (primarily tools)
PAGES: list[dict[str, str]] = [
    # Category pages
    {"path": "/tools/hand-tools/electricians-tools", "category": "hand-tools", "type": "tool"},
    {"path": "/tools/power-tools/", "category": "power-tools", "type": "tool"},
    {"path": "/tools/hand-tools/pliers/", "category": "hand-tools", "type": "tool"},
    {"path": "/tools/measuring-tools/", "category": "test-equipment", "type": "tool"},
    {"path": "/tools/hand-tools/screwdrivers/", "category": "hand-tools", "type": "tool"},
    # Search queries
    {"path": "/search?w=electrician+screwdriver", "category": "hand-tools", "type": "tool"},
    {"path": "/search?w=pliers+cutters", "category": "hand-tools", "type": "tool"},
    {"path": "/search?w=cordless+drill", "category": "power-tools", "type": "tool"},
    {"path": "/search?w=voltage+tester", "category": "test-equipment", "type": "tool"},
    {"path": "/search?w=cable+stripper", "category": "hand-tools", "type": "tool"},
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


async def scrape_ffx(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape FFX category and search pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for page_info in PAGES:
        try:
            products = await _scrape_page(supplier_id, page_info, seen_skus)
            all_products.extend(products)
            log.info(
                "ffx_page_done",
                path=page_info["path"][:50],
                category=page_info["category"],
                count=len(products),
            )
        except Exception as e:
            log.error(
                "ffx_page_error",
                path=page_info["path"][:50],
                error=str(e),
            )
        await asyncio.sleep(3)

    log.info("ffx_total", count=len(all_products))
    return all_products


async def _scrape_page(
    supplier_id: str,
    page_info: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape a single category or search page."""
    url = BASE_URL + page_info["path"]
    html = await fetch_page_html(url, wait_time=5.0)
    soup = BeautifulSoup(html, "lxml")
    products: list[dict] = []

    # Try multiple strategies to find products
    # Strategy 1: Find product links (FFX might use various URL patterns)
    product_links = soup.find_all("a", href=re.compile(r"/(product|p|item)/", re.I))

    # Strategy 2: Look for product cards/tiles
    if not product_links:
        product_cards = soup.find_all(class_=re.compile(r"product[-_]?(card|tile|item)", re.I))
        for card in product_cards:
            link = card.find("a", href=True)
            if link:
                product_links.append(link)

    # Strategy 3: Find any divs with product-related classes
    if not product_links:
        product_containers = soup.find_all("div", class_=re.compile(r"product", re.I))
        for container in product_containers:
            link = container.find("a", href=True)
            if link:
                product_links.append(link)

    processed: set[str] = set()

    for link in product_links:
        href = link.get("href", "")
        if not href or href in processed:
            continue
        processed.add(href)

        # Extract SKU from URL - try different patterns
        sku = None

        # Pattern 1: /product/SKU or /p/SKU
        sku_match = re.search(r"/(product|p|item)/([^/\?]+)", href, re.I)
        if sku_match:
            sku = sku_match.group(2)
        # Pattern 2: Query param like ?id=SKU or ?code=SKU
        elif "?" in href:
            query_match = re.search(r"[?&](id|code|sku|product)=([^&]+)", href, re.I)
            if query_match:
                sku = query_match.group(2)
        # Pattern 3: Last segment of URL path
        else:
            segments = href.rstrip("/").split("/")
            if segments:
                sku = segments[-1]

        if not sku or sku in seen_skus:
            continue

        # Get product name
        name = link.get_text(strip=True)

        # If link text is empty, look for title or nearby heading
        if not name or len(name) < 5:
            # Try title attribute
            name = link.get("title", "")

            # Try nearby heading
            if not name or len(name) < 5:
                container = link.parent
                for _ in range(3):
                    if not container:
                        break
                    heading = container.find(["h1", "h2", "h3", "h4", "h5", "h6"])
                    if heading:
                        name = heading.get_text(strip=True)
                        if len(name) >= 5:
                            break
                    container = container.parent

        if not name or len(name) < 5:
            continue

        # Find price by walking up the DOM tree
        container = link.parent
        price = None
        for _ in range(5):
            if not container:
                break
            text = container.get_text()
            if "£" in text:
                price_matches = re.findall(r"£(\d+\.?\d*)", text)
                if price_matches:
                    # Take first price (usually inc. VAT or main price)
                    price = clean_price(price_matches[0])
                break
            container = container.parent

        # Find image
        image_url = None
        img_container = link.parent
        for _ in range(3):
            if not img_container:
                break
            img = img_container.find("img")
            if img:
                src = img.get("src") or img.get("data-src") or img.get("data-lazy") or ""
                if src and not src.startswith("data:"):
                    image_url = src if src.startswith("http") else BASE_URL + src
                break
            img_container = img_container.parent

        product_url = BASE_URL + href if href.startswith("/") else href
        brand = _detect_brand(name)

        seen_skus.add(sku)
        products.append({
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
        })

    return products


def _detect_brand(name: str) -> str | None:
    name_lower = name.lower()
    for brand in BRANDS:
        if brand.lower() in name_lower:
            return brand
    return None
