"""Data validation helpers."""

from __future__ import annotations

import re
from typing import Any


def clean_price(raw: str | float | None) -> float | None:
    """Extract numeric price from string like '£12.99' or '12.99'."""
    if raw is None:
        return None
    if isinstance(raw, (int, float)):
        return float(raw) if raw > 0 else None
    cleaned = re.sub(r"[^\d.]", "", str(raw))
    if not cleaned:
        return None
    try:
        val = float(cleaned)
        return val if val > 0 else None
    except ValueError:
        return None


def clean_text(text: str | None, max_length: int = 5000) -> str | None:
    """Strip whitespace and truncate."""
    if not text:
        return None
    cleaned = " ".join(text.split())
    return cleaned[:max_length] if cleaned else None


def classify_product_type(category: str | None, name: str | None) -> str:
    """Classify a product as material, tool, ppe, or accessory.

    Uses category first, then falls back to keyword matching on name.
    """
    cat_lower = (category or "").lower()
    name_lower = (name or "").lower()

    # Category-based classification
    tool_categories = {
        "power tools", "hand tools", "test equipment", "testing",
        "tool storage", "access equipment", "cable tools",
        "power-tools", "hand-tools", "test-equipment",
        "tools", "testers", "meters",
    }
    ppe_categories = {
        "ppe", "safety", "workwear", "safety & workwear",
        "protective equipment",
    }

    for tc in tool_categories:
        if tc in cat_lower:
            return "tool"
    for pc in ppe_categories:
        if pc in cat_lower:
            return "ppe"

    # Name-based fallback
    tool_keywords = [
        "drill", "driver", "tester", "meter", "multimeter",
        "megger", "fluke", "kewtech", "plier", "cutter",
        "screwdriver", "saw", "grinder", "crimper", "stripper",
        "ladder", "torch", "level", "tape measure", "jigsaw",
    ]
    ppe_keywords = [
        "hard hat", "helmet", "hi-vis", "hi vis", "safety boot",
        "glove", "goggle", "ear defender", "knee pad",
    ]

    for kw in tool_keywords:
        if kw in name_lower:
            return "tool"
    for kw in ppe_keywords:
        if kw in name_lower:
            return "ppe"

    return "material"
