"""RS Components API client.

Free API: https://developer.rs-online.com/
Auth: API key in header.
"""

from __future__ import annotations

from typing import Any

import httpx
import structlog

from src.config import settings
from src.utils.validation import classify_product_type

log = structlog.get_logger()

BASE_URL = "https://api.rs-online.com/product/v1"

# RS product categories relevant to electricians
SEARCH_TERMS = [
    # Materials
    "cable twin and earth",
    "SWA cable",
    "consumer unit",
    "MCB",
    "RCBO",
    "RCD",
    "socket outlet",
    "light switch",
    "junction box",
    "conduit",
    "trunking",
    "earth rod",
    "cable clips",
    "cable gland",
    "din rail",
    "terminal block",
    "contactor",
    "isolator",
    # Tools
    "multimeter",
    "insulation tester",
    "multifunction tester",
    "voltage indicator",
    "socket tester",
    "cable stripper",
    "crimping tool",
    "VDE screwdriver",
    "cable cutter",
    "SDS drill",
]

# Map RS categories to our product_type
CATEGORY_MAP: dict[str, str] = {
    "cables": "material",
    "connectors": "material",
    "circuit protection": "material",
    "switches": "material",
    "lighting": "material",
    "test & measurement": "tool",
    "tools": "tool",
    "power tools": "tool",
    "safety": "ppe",
}


async def fetch_products(supplier_id: str) -> list[dict[str, Any]]:
    """Fetch products from RS Components API."""
    if not settings.rs_api_key:
        log.warning("rs_api_key_missing")
        return []

    all_products: list[dict] = []

    async with httpx.AsyncClient(timeout=30) as client:
        for term in SEARCH_TERMS:
            try:
                resp = await client.get(
                    f"{BASE_URL}/search",
                    params={
                        "searchTerm": term,
                        "limit": 50,
                        "offset": 0,
                        "country": "GB",
                    },
                    headers={
                        "Authorization": f"Bearer {settings.rs_api_key}",
                        "Accept": "application/json",
                    },
                )
                resp.raise_for_status()
                data = resp.json()

                products = data.get("products", [])
                for p in products:
                    price_data = p.get("price", {})
                    current_price = _extract_price(price_data)
                    category = p.get("category", "")

                    product_type = CATEGORY_MAP.get(
                        category.lower(),
                        classify_product_type(category, p.get("name")),
                    )

                    all_products.append(
                        {
                            "supplier_id": supplier_id,
                            "sku": p.get("stockNumber") or p.get("sku", ""),
                            "name": p.get("name", ""),
                            "brand": p.get("brand"),
                            "category": category,
                            "subcategory": p.get("subCategory"),
                            "product_type": product_type,
                            "current_price": current_price,
                            "regular_price": current_price,
                            "is_on_sale": False,
                            "description": p.get("description"),
                            "image_url": p.get("imageUrl"),
                            "product_url": p.get("url")
                            or f"https://uk.rs-online.com/web/p/{p.get('stockNumber', '')}",
                            "stock_status": "in_stock"
                            if p.get("inStock")
                            else "unknown",
                        }
                    )

                log.info("rs_products_fetched", term=term, count=len(products))
            except httpx.HTTPError as e:
                log.error("rs_products_error", term=term, error=str(e))

    log.info("rs_products_total", count=len(all_products))
    return all_products


def _extract_price(price_data: dict) -> float | None:
    """Extract GBP price from RS price object."""
    if not price_data:
        return None

    # Try different price formats RS API might return
    for key in ["unitPrice", "price", "priceGBP"]:
        val = price_data.get(key)
        if val is not None:
            try:
                return float(val)
            except (ValueError, TypeError):
                continue

    # Try price breaks (take lowest quantity price)
    breaks = price_data.get("priceBreaks", [])
    if breaks:
        try:
            return float(breaks[0].get("price", 0))
        except (ValueError, TypeError, IndexError):
            pass

    return None
