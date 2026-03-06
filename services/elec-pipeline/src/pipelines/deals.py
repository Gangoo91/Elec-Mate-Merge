"""Deals + coupons pipeline (Phase 2 — scraper-based)."""

from __future__ import annotations

import structlog

from src.db.supabase_client import log_pipeline_end, log_pipeline_start
from src.utils.alerting import alert_pipeline_failure

log = structlog.get_logger()


async def run_deals_pipeline() -> None:
    """Scrape deals from supplier pages + HotUKDeals (Phase 2)."""
    run_id = log_pipeline_start("deals")
    try:
        # Phase 2: Import and run deal scrapers here
        # from src.scrapers.hotukdeals import fetch_deals
        # etc.

        log_pipeline_end(run_id, status="completed", records_found=0)
        log.info("deals_pipeline_skipped", reason="phase_2")
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("deals", str(e))
        raise


async def run_coupons_pipeline() -> None:
    """Scrape coupons from supplier pages (Phase 3)."""
    run_id = log_pipeline_start("coupons")
    try:
        # Phase 3: Import and run coupon scrapers here

        log_pipeline_end(run_id, status="completed", records_found=0)
        log.info("coupons_pipeline_skipped", reason="phase_3")
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("coupons", str(e))
        raise
