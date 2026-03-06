"""Machine Mart scraper — uses Crawl4AI stealth browser to bypass Cloudflare.

Machine Mart has category pages with product cards and search functionality.
We parse HTML product cards using BeautifulSoup to extract product data.
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

BASE_URL = "https://www.machinemart.co.uk"

# Category pages and search queries
PAGES: list[dict[str, str]] = [
    # Category pages (tools and workwear)
    {"path": "/c/power-tools/", "category": "power-tools", "type": "tool"},
    {"path": "/c/hand-tools/", "category": "hand-tools", "type": "tool"},
    {"path": "/c/testing-measuring/", "category": "test-equipment", "type": "tool"},
    {"path": "/c/site-equipment/", "category": "site-equipment", "type": "tool"},
    {"path": "/c/workwear/", "category": "ppe", "type": "ppe"},
    # Search queries for specific items
    {"path": "/search/?searchterm=electrician+screwdriver", "category": "hand-tools", "type": "tool"},
    {"path": "/search/?searchterm=pliers+cutters", "category": "hand-tools", "type": "tool"},
    {"path": "/search/?searchterm=drill", "category": "power-tools", "type": "tool"},
    {"path": "/search/?searchterm=voltage+tester", "category": "test-equipment", "type": "tool"},
    {"path": "/search/?searchterm=safety+boots", "category": "ppe", "type": "ppe"},
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


async def scrape_machinemart(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape Machine Mart category and search pages using stealth browser."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    for page_info in PAGES:
        try:
            products = await _scrape_page(supplier_id, page_info, seen_skus)
            all_products.extend(products)
            log.info(
                "machinemart_page_done",
                path=page_info["path"][:50],
                category=page_info["category"],
                count=len(products),
            )
        except Exception as e:
            log.error(
                "machinemart_page_error",
                path=page_info["path"][:50],
                error=str(e),
            )
        await asyncio.sleep(3)

    log.info("machinemart_total", count=len(all_products))
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

    # Try multiple strategies to find product links
    # Strategy 1: Find all links with /p/ pattern (product detail pages)
    product_links = soup.find_all("a", href=re.compile(r"/p/"))

    # Strategy 2: Find product tiles/cards (common class names)
    if not product_links:
        product_links = soup.find_all("div", class_=re.compile(r"product[-_]?(tile|item|card)", re.I))

    # Strategy 3: Find any elements with "product" in class name that contain links
    if not product_links:
        product_containers = soup.find_all(class_=re.compile(r"product", re.I))
        for container in product_containers:
            link = container.find("a", href=re.compile(r"/p/"))
            if link:
                product_links.append(link)

    processed: set[str] = set()

    for element in product_links:
        # If element is not a link, find the link within it
        if element.name != "a":
            link = element.find("a", href=re.compile(r"/p/"))
            if not link:
                continue
        else:
            link = element

        href = link.get("href", "")
        if not href or href in processed:
            continue
        processed.add(href)

        # Extract SKU from URL pattern /p/{sku} or /p/{sku}/
        sku_match = re.search(r"/p/([^/]+)", href)
        if not sku_match:
            continue

        sku = sku_match.group(1)
        if sku in seen_skus:
            continue

        # Get product name from link text or nearby heading
        name = link.get_text(strip=True)

        # If link text is empty or too short, look for nearby heading or title
        if not name or len(name) < 5:
            # Try parent container
            container = link.parent
            for _ in range(3):
                if not container:
                    break
                # Look for heading tags
                heading = container.find(["h1", "h2", "h3", "h4", "h5", "h6"])
                if heading:
                    name = heading.get_text(strip=True)
                    if len(name) >= 5:
                        break
                # Look for title attribute
                title = container.get("title", "")
                if title and len(title) >= 5:
                    name = title
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
                    # Take first price (usually inc. VAT)
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
                src = img.get("src") or img.get("data-src") or ""
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
