"""APScheduler job registry.

All times in Europe/London. Pipelines run autonomously 24/7.
"""

from __future__ import annotations

import asyncio

import structlog
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

log = structlog.get_logger()


def _wrap(coro_func):
    """Wrap an async pipeline function for APScheduler."""

    def wrapper():
        loop = asyncio.get_event_loop()
        loop.create_task(coro_func())

    return wrapper


def create_scheduler() -> AsyncIOScheduler:
    """Create and configure the scheduler with all pipeline jobs."""
    scheduler = AsyncIOScheduler(timezone="Europe/London")

    # Lazy imports to avoid circular deps
    from src.pipelines.courses import run_courses_api_pipeline, run_courses_scrape_pipeline
    from src.pipelines.deals import run_coupons_pipeline, run_deals_pipeline
    from src.pipelines.jobs import run_jobs_api_pipeline, run_jobs_scrape_pipeline
    from src.pipelines.materials import (
        run_full_materials_scrape,
        run_price_history_snapshot,
        run_rs_components_pipeline,
    )
    from src.pipelines.news import run_news_pipeline
    from src.db.supabase_client import cleanup_expired

    # -----------------------------------------------------------------------
    # Daily pipelines
    # -----------------------------------------------------------------------

    # News (RSS) — daily 05:30
    scheduler.add_job(
        run_news_pipeline,
        CronTrigger(hour=5, minute=30),
        id="news_rss",
        name="News RSS feeds",
        misfire_grace_time=3600,
    )

    # Jobs — APIs (Reed + Adzuna + Gov.uk) — daily 06:00
    scheduler.add_job(
        run_jobs_api_pipeline,
        CronTrigger(hour=6, minute=0),
        id="jobs_api",
        name="Jobs API aggregate",
        misfire_grace_time=3600,
    )

    # Jobs — Scrape (Phase 2) — daily 06:30
    scheduler.add_job(
        run_jobs_scrape_pipeline,
        CronTrigger(hour=6, minute=30),
        id="jobs_scrape",
        name="Jobs scrape (Phase 2)",
        misfire_grace_time=3600,
    )

    # RS Components (API) — daily 07:00
    scheduler.add_job(
        run_rs_components_pipeline,
        CronTrigger(hour=7, minute=0),
        id="rs_components",
        name="RS Components API",
        misfire_grace_time=3600,
    )

    # -----------------------------------------------------------------------
    # Every 6 hours
    # -----------------------------------------------------------------------

    # Deals — every 6 hours at :00
    scheduler.add_job(
        run_deals_pipeline,
        CronTrigger(hour="0,6,12,18", minute=0),
        id="deals",
        name="Deals scrape (Phase 2)",
        misfire_grace_time=3600,
    )

    # Coupons — every 6 hours at :30
    scheduler.add_job(
        run_coupons_pipeline,
        CronTrigger(hour="0,6,12,18", minute=30),
        id="coupons",
        name="Coupons scrape (Phase 3)",
        misfire_grace_time=3600,
    )

    # -----------------------------------------------------------------------
    # Weekly pipelines
    # -----------------------------------------------------------------------

    # Full materials + tools scrape — Sunday 02:00
    scheduler.add_job(
        run_full_materials_scrape,
        CronTrigger(day_of_week="sun", hour=2, minute=0),
        id="materials_scrape",
        name="Full materials scrape (Phase 2/3)",
        misfire_grace_time=7200,
    )

    # Price history snapshot — Sunday 04:00
    scheduler.add_job(
        run_price_history_snapshot,
        CronTrigger(day_of_week="sun", hour=4, minute=0),
        id="price_history",
        name="Price history snapshot",
        misfire_grace_time=7200,
    )

    # Courses — APIs — Monday 05:00
    scheduler.add_job(
        run_courses_api_pipeline,
        CronTrigger(day_of_week="mon", hour=5, minute=0),
        id="courses_api",
        name="Courses API aggregate",
        misfire_grace_time=3600,
    )

    # Courses — Scrape (Phase 3) — Monday 06:00
    scheduler.add_job(
        run_courses_scrape_pipeline,
        CronTrigger(day_of_week="mon", hour=6, minute=0),
        id="courses_scrape",
        name="Courses scrape (Phase 3)",
        misfire_grace_time=3600,
    )

    # -----------------------------------------------------------------------
    # Maintenance
    # -----------------------------------------------------------------------

    # Cleanup expired cache rows — daily 04:00
    scheduler.add_job(
        cleanup_expired,
        CronTrigger(hour=4, minute=0),
        id="cleanup",
        name="Expired cache cleanup",
        misfire_grace_time=3600,
    )

    return scheduler
