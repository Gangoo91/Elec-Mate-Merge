"""Base scraper class for Crawl4AI integration (Phase 2).

Provides common patterns for all website scrapers:
- Rate limiting
- Error handling with retries
- Product classification (material vs tool)
- Standard output format
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any

import structlog

from src.utils.rate_limiter import rate_limiter
from src.utils.validation import classify_product_type

log = structlog.get_logger()


class BaseScraper(ABC):
    """Base class for all supplier/site scrapers."""

    name: str = "unknown"
    domain: str = ""
    rate_limit_gap: float = 2.0  # seconds between requests

    @abstractmethod
    async def scrape(self, supplier_id: str) -> list[dict[str, Any]]:
        """Scrape products/data from the supplier. Returns list of dicts."""
        ...

    async def wait(self) -> None:
        """Respect rate limit for this domain."""
        await rate_limiter.wait(self.domain, self.rate_limit_gap)

    def classify(self, category: str | None, name: str | None) -> str:
        """Classify product as material/tool/ppe/accessory."""
        return classify_product_type(category, name)
