"""TLC Direct scraper — simple HTML, no browser needed.

Site uses table-based layout. Products in <tr> rows.
URL pattern: /Main_Index/{Category}_Index/index.html
Product pages: /Products/{CODE}.html
"""

from __future__ import annotations

import re
from typing import Any
from urllib.parse import urljoin

import httpx
import structlog
from bs4 import BeautifulSoup

from src.utils.validation import clean_price, classify_product_type

log = structlog.get_logger()

BASE_URL = "https://www.tlc-direct.co.uk"

# Categories with VERIFIED URL paths from actual TLC Direct site (2026-03-06)
# Slugs match the marketplace-search edge function category lists
CATEGORIES: list[dict[str, str]] = [
    # Materials
    {"path": "/Main_Index/Cable_Index/index.html", "category": "cables", "type": "material"},
    {"path": "/Main_Index/Consumer_Units_Index/index.html", "category": "consumer-units", "type": "material"},
    {"path": "/Main_Index/Wiring_Accessories_Menu_Index/index.html", "category": "wiring-accessories", "type": "material"},
    {"path": "/Main_Index/Lighting_Menu_Index/index.html", "category": "lighting", "type": "material"},
    {"path": "/Main_Index/Lighting_External_Index/index.html", "category": "lighting", "type": "material"},
    {"path": "/Main_Index/Conduit_Pvc_Index/index.html", "category": "containment", "type": "material"},
    {"path": "/Main_Index/Conduit_Steel_Index/index.html", "category": "containment", "type": "material"},
    {"path": "/Main_Index/Trunking_Pvc_Index/index.html", "category": "containment", "type": "material"},
    {"path": "/Main_Index/Trunking_Galv_Index/index.html", "category": "containment", "type": "material"},
    {"path": "/Main_Index/Cable_Tray_Index/index.html", "category": "containment", "type": "material"},
    {"path": "/Main_Index/Cable_Accessories_Index/index.html", "category": "containment", "type": "material"},
    {"path": "/Main_Index/Earthing_Index/index.html", "category": "earthing", "type": "material"},
    {"path": "/Main_Index/Boxes_and_Enclosures_Index/index.html", "category": "consumer-units", "type": "material"},
    {"path": "/Main_Index/Fixings_Index/index.html", "category": "fixings", "type": "material"},
    {"path": "/Main_Index/Fire_and_Smoke/index.html", "category": "fire-security", "type": "material"},
    {"path": "/Main_Index/Alarm_Index/index.html", "category": "fire-security", "type": "material"},
    {"path": "/Main_Index/SyncEV/index.html", "category": "ev-charging", "type": "material"},
    {"path": "/Main_Index/Distribution_and_Switchgear_Index/index.html", "category": "circuit-protection", "type": "material"},
    {"path": "/Main_Index/Computer_Accessories_Index/index.html", "category": "data-networking", "type": "material"},
    {"path": "/Main_Index/Plugs_and_Sockets_Industrial_Index/index.html", "category": "wiring-accessories", "type": "material"},
    {"path": "/Main_Index/Heating_Index/index.html", "category": "hvac", "type": "material"},
    {"path": "/Main_Index/Ventilation_Index/index.html", "category": "hvac", "type": "material"},
    {"path": "/Main_Index/Water_Heating_Index/index.html", "category": "hvac", "type": "material"},
    {"path": "/Main_Index/CCTV_New_Index/index.html", "category": "fire-security", "type": "material"},
    {"path": "/Main_Index/Security_Menu_Index/index.html", "category": "fire-security", "type": "material"},
    # Tools
    {"path": "/Main_Index/Tools_Index/index.html", "category": "hand-tools", "type": "tool"},
    {"path": "/Main_Index/Tools_Power_Index/index.html", "category": "power-tools", "type": "tool"},
    {"path": "/Main_Index/Test_Meters_Index/index.html", "category": "test-equipment", "type": "tool"},
    {"path": "/Main_Index/Site_Equipment_Index/index.html", "category": "hand-tools", "type": "tool"},
    {"path": "/Main_Index/Batts_and_Torches_Index/index.html", "category": "hand-tools", "type": "tool"},
    # PPE
    {"path": "/Main_Index/Safety_Footwear_Index/index.html", "category": "ppe", "type": "ppe"},
    {"path": "/Main_Index/Hand_Driers_Index/index.html", "category": "ppe", "type": "ppe"},
]

# Known brands for extraction from product names
BRANDS = [
    "Schneider", "Hager", "MK", "Click", "Chint", "Legrand",
    "Hamilton", "BG", "Crabtree", "Wylex", "Fusebox", "Scolmore",
    "Deta", "Knightsbridge", "Saxby", "Megger", "Fluke", "Kewtech",
    "Martindale", "Di-Log", "Makita", "DeWalt", "Bosch", "Milwaukee",
]


async def scrape_tlc(supplier_id: str) -> list[dict[str, Any]]:
    """Scrape all TLC Direct categories."""
    all_products: list[dict] = []
    seen_skus: set[str] = set()

    async with httpx.AsyncClient(
        timeout=30,
        follow_redirects=True,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"},
    ) as client:
        for cat in CATEGORIES:
            try:
                products = await _scrape_category(
                    client, supplier_id, cat, seen_skus
                )
                all_products.extend(products)
                log.info(
                    "tlc_category_scraped",
                    category=cat["category"],
                    count=len(products),
                )
            except Exception as e:
                log.error(
                    "tlc_category_error",
                    category=cat["category"],
                    path=cat["path"],
                    error=str(e),
                )

            # Rate limit: 2 seconds between categories
            import asyncio
            await asyncio.sleep(2)

    log.info("tlc_total", count=len(all_products))
    return all_products


async def _scrape_category(
    client: httpx.AsyncClient,
    supplier_id: str,
    cat: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Scrape a single category page. Follows subcategory links too."""
    url = BASE_URL + cat["path"]
    resp = await client.get(url)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "lxml")
    products: list[dict] = []

    # Try direct product rows first (table rows with product links)
    products.extend(
        _extract_products_from_page(soup, supplier_id, cat, seen_skus)
    )

    # Also follow subcategory links (pages that list sub-categories)
    subcategory_links = _find_subcategory_links(soup, url)
    for sub_url in subcategory_links[:30]:  # Cap at 30 subcategories
        try:
            import asyncio
            await asyncio.sleep(1)
            sub_resp = await client.get(sub_url)
            sub_resp.raise_for_status()
            sub_soup = BeautifulSoup(sub_resp.text, "lxml")
            sub_products = _extract_products_from_page(sub_soup, supplier_id, cat, seen_skus)
            products.extend(sub_products)
            if sub_products:
                log.debug("tlc_subcategory_products", url=sub_url, count=len(sub_products))
        except Exception as e:
            log.warning("tlc_subcategory_error", url=sub_url, error=str(e))

    return products


def _extract_products_from_page(
    soup: BeautifulSoup,
    supplier_id: str,
    cat: dict[str, str],
    seen_skus: set[str],
) -> list[dict[str, Any]]:
    """Extract products from a page's table rows."""
    products: list[dict] = []

    # Find all links to /Products/*.html — these are product links
    product_links = soup.find_all("a", href=re.compile(r"/Products/[^/]+\.html"))

    # Group by row: walk up to find containing <tr>
    processed_rows: set[int] = set()
    for link in product_links:
        row = link.find_parent("tr")
        if row is None:
            continue
        row_id = id(row)
        if row_id in processed_rows:
            continue
        processed_rows.add(row_id)

        product = _parse_product_row(row, supplier_id, cat)
        if product and product["sku"] not in seen_skus:
            seen_skus.add(product["sku"])
            products.append(product)

    return products


def _parse_product_row(
    row, supplier_id: str, cat: dict[str, str]
) -> dict[str, Any] | None:
    """Parse a single <tr> into a product dict."""
    cells = row.find_all("td")
    if len(cells) < 3:
        return None

    # Find all product links in the row
    links = row.find_all("a", href=re.compile(r"/Products/[^/]+\.html"))
    if not links:
        return None

    # Extract product URL and SKU from the link
    product_link = links[0]
    href = product_link.get("href", "")
    sku_match = re.search(r"/Products/([^/]+?)\.html", href)
    if not sku_match:
        return None
    sku = sku_match.group(1)

    # Product URL
    product_url = BASE_URL + href if href.startswith("/") else href

    # Find product name — usually the longest link text
    name = ""
    for link in links:
        text = link.get_text(strip=True)
        if len(text) > len(name) and text != sku:
            name = text
    if not name:
        name = sku

    # Find price — look for £ in cell text
    price = None
    for cell in cells:
        text = cell.get_text(strip=True)
        # Prefer ex VAT price
        if "ex VAT" in text or "ex. VAT" in text:
            price = clean_price(text)
            if price:
                break
        elif "£" in text and price is None:
            price = clean_price(text)

    # Find image
    img = row.find("img")
    image_url = None
    if img:
        src = img.get("src") or img.get("data-src", "")
        if src:
            image_url = BASE_URL + src if src.startswith("/") else src

    # Detect brand from name
    brand = _detect_brand(name)

    return {
        "supplier_id": supplier_id,
        "sku": sku,
        "name": name,
        "brand": brand,
        "category": cat["category"],
        "product_type": cat["type"],
        "current_price": price,
        "regular_price": price,
        "is_on_sale": False,
        "image_url": image_url,
        "product_url": product_url,
        "stock_status": "unknown",
    }


def _find_subcategory_links(soup: BeautifulSoup, page_url: str) -> list[str]:
    """Find links to subcategory pages (deeper index.html pages).

    Resolves relative URLs against the current page URL.
    TLC Direct uses relative links like '/Twin_and_Earth/index.html'
    which resolve relative to the current page directory.
    """
    links: set[str] = set()

    for a in soup.find_all("a", href=True):
        href = a["href"]
        # Skip product pages, external links, and anchors
        if "/Products/" in href or href.startswith("#") or href.startswith("mailto:"):
            continue
        # Look for links ending in index.html (subcategory pages)
        if not href.endswith("/index.html") and not href.endswith("/"):
            continue

        # Resolve relative URL against the current page
        resolved = urljoin(page_url, href)

        # Must be on TLC Direct domain and not the same page
        if BASE_URL in resolved and resolved != page_url:
            links.add(resolved)

    return list(links)


def _detect_brand(name: str) -> str | None:
    """Detect known brand from product name."""
    name_lower = name.lower()
    for brand in BRANDS:
        if brand.lower() in name_lower:
            return brand
    return None
