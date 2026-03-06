"""News pipeline — RSS feeds from UK electrical industry sources."""

from __future__ import annotations

import structlog

from src.db.supabase_client import log_pipeline_end, log_pipeline_start, upsert_news
from src.feeds.news_aggregator import fetch_all_news
from src.utils.alerting import alert_pipeline_failure

log = structlog.get_logger()


async def run_news_pipeline() -> None:
    """Fetch and store industry news from RSS feeds."""
    run_id = log_pipeline_start("news_rss")
    try:
        articles = await fetch_all_news()
        inserted = upsert_news(articles)

        log_pipeline_end(
            run_id,
            status="completed",
            records_found=len(articles),
            records_inserted=inserted,
        )
        log.info("news_pipeline_done", articles=len(articles), inserted=inserted)
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("news_rss", str(e))
        raise
