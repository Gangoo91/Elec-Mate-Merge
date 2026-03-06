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

_stealth_browser_config = BrowserConfig(
    headless=True,
    browser_type="chromium",
    text_mode=False,  # Need full rendering for Turnstile
    enable_stealth=True,
    viewport_width=1920,
    viewport_height=1080,
)


async def fetch_page_html(
    url: str,
    wait_time: float = 3.0,
    stealth: bool = False,
) -> str:
    """Fetch a page using stealth browser, return raw HTML.

    Args:
        url: Page URL to fetch.
        wait_time: Seconds to wait before extracting HTML.
        stealth: Use full stealth mode (magic + simulate_user) for
                 sites with Cloudflare Turnstile or similar challenges.
    """
    config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        delay_before_return_html=wait_time,
        page_timeout=90000 if stealth else 60000,
        magic=stealth,
        simulate_user=stealth,
        scan_full_page=stealth,
        remove_overlay_elements=stealth,
    )
    browser = _stealth_browser_config if stealth else _browser_config
    async with AsyncWebCrawler(config=browser) as crawler:
        result = await crawler.arun(url=url, config=config)
        if not result.success:
            raise RuntimeError(f"Crawl failed for {url}: {result.error_message}")
        log.debug("browser_fetch_ok", url=url, html_len=len(result.html), stealth=stealth)
        return result.html
