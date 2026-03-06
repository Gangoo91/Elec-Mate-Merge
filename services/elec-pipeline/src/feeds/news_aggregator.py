"""RSS news feed aggregator.

Fetches articles from multiple UK electrical industry RSS feeds.
"""

from __future__ import annotations

import hashlib
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from typing import Any

import feedparser
import httpx
import structlog

from src.feeds.feed_sources import FEEDS

log = structlog.get_logger()


async def fetch_all_news() -> list[dict[str, Any]]:
    """Fetch articles from all configured RSS feeds."""
    all_articles: list[dict] = []

    async with httpx.AsyncClient(timeout=20, follow_redirects=True) as client:
        for feed_config in FEEDS:
            try:
                articles = await _fetch_feed(client, feed_config)
                all_articles.extend(articles)
                log.info(
                    "feed_fetched",
                    source=feed_config["source"],
                    count=len(articles),
                )
            except Exception as e:
                log.error(
                    "feed_error",
                    source=feed_config["source"],
                    error=str(e),
                )

    log.info("news_total", count=len(all_articles))
    return all_articles


async def _fetch_feed(
    client: httpx.AsyncClient,
    feed_config: dict[str, str],
) -> list[dict[str, Any]]:
    """Fetch and parse a single RSS feed."""
    resp = await client.get(feed_config["url"])
    resp.raise_for_status()

    feed = feedparser.parse(resp.text)
    articles: list[dict] = []

    for entry in feed.entries:
        published = _parse_date(entry)
        link = entry.get("link", "")

        # Generate stable external_id from URL or title
        external_id = hashlib.md5(
            (link or entry.get("title", "")).encode()
        ).hexdigest()

        # Extract summary, preferring content over summary
        content = None
        if hasattr(entry, "content") and entry.content:
            content = entry.content[0].get("value", "")
        summary = entry.get("summary") or entry.get("description")

        # Extract tags from feed categories
        tags = []
        if hasattr(entry, "tags"):
            tags = [t.get("term", "") for t in entry.tags if t.get("term")]

        articles.append(
            {
                "title": entry.get("title", "Untitled"),
                "summary": _clean_html(summary) if summary else None,
                "content": _clean_html(content) if content else None,
                "category": feed_config.get("category", "general"),
                "source": feed_config["source"],
                "source_url": link,
                "external_id": external_id,
                "date_published": published,
                "tags": tags if tags else None,
            }
        )

    return articles


def _parse_date(entry: Any) -> str:
    """Parse published date from RSS entry."""
    for field in ("published", "updated", "created"):
        raw = entry.get(field)
        if raw:
            try:
                dt = parsedate_to_datetime(raw)
                return dt.isoformat()
            except Exception:
                pass

    # Fallback to feedparser's parsed date tuple
    for field in ("published_parsed", "updated_parsed"):
        parsed = entry.get(field)
        if parsed:
            try:
                from time import mktime

                dt = datetime.fromtimestamp(mktime(parsed), tz=timezone.utc)
                return dt.isoformat()
            except Exception:
                pass

    return datetime.now(timezone.utc).isoformat()


def _clean_html(html: str | None) -> str | None:
    """Strip HTML tags for plain text summary."""
    if not html:
        return None
    import re

    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:2000] if text else None
