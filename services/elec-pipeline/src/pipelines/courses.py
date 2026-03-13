"""Courses pipeline — aggregates from API sources and scrapers."""

from __future__ import annotations

import structlog

from src.apis.gov_courses import fetch_courses as fetch_gov
from src.apis.reed_courses import fetch_courses as fetch_reed
from src.db.supabase_client import (
    log_pipeline_end,
    log_pipeline_start,
    upsert_courses,
    upsert_training_courses,
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

        # Tag each course with its source and write to training_courses
        for c in gov_courses:
            c.setdefault("source", "gov_find_course")
        for c in reed_courses:
            c.setdefault("source", "reed_courses")

        combined = gov_courses + reed_courses
        tc_count = upsert_training_courses(combined)

        total = len(gov_courses) + len(reed_courses)
        log_pipeline_end(
            run_id,
            status="completed",
            records_found=total,
            records_inserted=total_cached,
            records_updated=tc_count,
        )
        log.info(
            "courses_api_pipeline_done",
            gov=len(gov_courses),
            reed=len(reed_courses),
            cached=total_cached,
            training_courses=tc_count,
        )
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("courses_api", str(e))
        raise


async def run_courses_scrape_pipeline() -> None:
    """Fetch courses from scraped sources (Reed website, FindCourses, providers, safety)."""
    run_id = log_pipeline_start("courses_scrape")
    try:
        from src.scrapers.courses.findcourses import scrape_findcourses
        from src.scrapers.courses.reed_courses import scrape_reed_courses
        from src.scrapers.courses.safety_courses import scrape_safety_courses
        from src.scrapers.courses.trade_providers import scrape_trade_providers

        all_courses: list[dict] = []
        for name, fetcher in [
            ("reed_courses_scrape", scrape_reed_courses),
            ("findcourses_scrape", scrape_findcourses),
            ("provider_scrape", scrape_trade_providers),
            ("safety_scrape", scrape_safety_courses),
        ]:
            try:
                results = await fetcher()
                all_courses.extend(results)
                log.info("courses_scraper_done", source=name, count=len(results))
            except Exception as e:
                log.error("courses_scraper_failed", source=name, error=str(e))

        # Tag each course with source (already set by scrapers)
        # Handle category_override from safety courses
        for c in all_courses:
            if "category_override" in c:
                c["category"] = c.pop("category_override")

        tc_count = upsert_training_courses(all_courses)

        # Also cache for AI search
        total_cached = 0
        if all_courses:
            cached = upsert_courses(
                all_courses, source="scrape_aggregate", search_query="electrical"
            )
            total_cached += cached

        log_pipeline_end(
            run_id,
            status="completed",
            records_found=len(all_courses),
            records_inserted=total_cached,
            records_updated=tc_count,
        )
        log.info(
            "courses_scrape_pipeline_done",
            total=len(all_courses),
            cached=total_cached,
            training_courses=tc_count,
        )
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("courses_scrape", str(e))
        raise
