"""Courses pipeline — aggregates from API sources (Phase 1) and scrapers (Phase 3)."""

from __future__ import annotations

import structlog

from src.apis.gov_courses import fetch_courses as fetch_gov
from src.apis.reed_courses import fetch_courses as fetch_reed
from src.db.supabase_client import (
    log_pipeline_end,
    log_pipeline_start,
    upsert_courses,
)
from src.utils.alerting import alert_pipeline_failure

log = structlog.get_logger()


async def run_courses_api_pipeline() -> None:
    """Fetch courses from Gov.uk Find a Course and Reed Courses APIs."""
    run_id = log_pipeline_start("courses_api")
    try:
        gov_courses = await fetch_gov()
        reed_courses = await fetch_reed()

        total_cached = 0

        # Cache Gov.uk courses by search term groups
        if gov_courses:
            cached = upsert_courses(
                gov_courses, source="gov_find_course", search_query="electrical"
            )
            total_cached += cached

        # Cache Reed courses
        if reed_courses:
            cached = upsert_courses(
                reed_courses, source="reed_courses", search_query="electrical"
            )
            total_cached += cached

        total = len(gov_courses) + len(reed_courses)
        log_pipeline_end(
            run_id,
            status="completed",
            records_found=total,
            records_inserted=total_cached,
        )
        log.info(
            "courses_api_pipeline_done",
            gov=len(gov_courses),
            reed=len(reed_courses),
            cached=total_cached,
        )
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("courses_api", str(e))
        raise


async def run_courses_scrape_pipeline() -> None:
    """Fetch courses from scraped providers (Phase 3)."""
    run_id = log_pipeline_start("courses_scrape")
    try:
        # Phase 3: Import and run scraped course providers here
        log_pipeline_end(run_id, status="completed", records_found=0)
        log.info("courses_scrape_pipeline_skipped", reason="phase_3")
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("courses_scrape", str(e))
        raise
