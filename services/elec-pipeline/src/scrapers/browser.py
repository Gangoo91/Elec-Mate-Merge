"""Shared stealth browser for Crawl4AI-based scrapers."""

from __future__ import annotations

import structlog
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

log = structlog.get_logger()

_browser_config = BrowserConfig(
    headless=True,
    browser_type="chromium",
    text_mode=True,  # Skip images/CSS for speed
)


async def fetch_page_html(url: str, wait_time: int = 3) -> str:
    """Fetch a page using stealth browser, return raw HTML."""
    config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        wait_time=wait_time,
    )
    async with AsyncWebCrawler(config=_browser_config) as crawler:
        result = await crawler.arun(url=url, config=config)
        if not result.success:
            raise RuntimeError(f"Crawl failed for {url}: {result.error_message}")
        log.debug("browser_fetch_ok", url=url, html_len=len(result.html))
        return result.html
