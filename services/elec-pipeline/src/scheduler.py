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
    from src.pipelines.outreach_colleges import run_outreach_colleges_pipeline
    from src.pipelines.outreach_businesses import (
        run_outreach_companies_house_pipeline,
        run_outreach_companies_house_web_pipeline,
        run_outreach_google_places_pipeline,
        run_outreach_businesses_hunter_enrichment,
        run_outreach_yell_pipeline,
        run_outreach_checkatrade_pipeline,
        run_outreach_bing_pipeline,
        run_outreach_linkedin_business_pipeline,
        run_outreach_linkedin_people_pipeline,
        run_outreach_192_pipeline,
        run_outreach_trustpilot_pipeline,
        run_outreach_freeindex_pipeline,
        run_outreach_thomson_pipeline,
        run_outreach_smtp_verify_pipeline,
        run_outreach_website_crawl_pipeline,
    )
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

    # Courses — APIs — daily 05:00
    scheduler.add_job(
        run_courses_api_pipeline,
        CronTrigger(hour=5, minute=0),
        id="courses_api",
        name="Courses API aggregate",
        misfire_grace_time=3600,
    )

    # Courses — Scrape — daily 05:45 (after courses_api at 05:00)
    scheduler.add_job(
        run_courses_scrape_pipeline,
        CronTrigger(hour=5, minute=45),
        id="courses_scrape",
        name="Courses scrape (Reed, FindCourses, providers, safety)",
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
    # Outreach — colleges (weekly) and businesses (daily)
    # Two fully separate pipelines writing to education_leads + business_leads
    # respectively. Each auto-promotes to outreach_contacts for campaigns.
    # -----------------------------------------------------------------------

    # Colleges — Sunday 03:30 weekly (provider list doesn't change often)
    scheduler.add_job(
        run_outreach_colleges_pipeline,
        CronTrigger(day_of_week="sun", hour=3, minute=30),
        id="outreach_colleges",
        name="Outreach — colleges & training providers (gov.uk + crawl4ai)",
        misfire_grace_time=7200,
    )

    # Companies House — daily 02:30 (covers new incorporations / status changes)
    scheduler.add_job(
        run_outreach_companies_house_pipeline,
        CronTrigger(hour=2, minute=30),
        id="outreach_companies_house",
        name="Outreach — Companies House SIC 43210/43220 import",
        misfire_grace_time=7200,
    )

    # Google Places — weekly Monday 04:00 (supplements CH with sole traders)
    scheduler.add_job(
        run_outreach_google_places_pipeline,
        CronTrigger(day_of_week="mon", hour=4, minute=0),
        id="outreach_google_places",
        name="Outreach — Google Places UK sweep",
        misfire_grace_time=7200,
    )

    # Yell.com — Sunday 05:00 (full UK sweep weekly)
    scheduler.add_job(
        run_outreach_yell_pipeline,
        CronTrigger(day_of_week="sun", hour=5, minute=0),
        id="outreach_yell",
        name="Outreach — Yell.com UK sweep",
        misfire_grace_time=14400,
    )

    # Checkatrade — Sunday 06:00
    scheduler.add_job(
        run_outreach_checkatrade_pipeline,
        CronTrigger(day_of_week="sun", hour=6, minute=0),
        id="outreach_checkatrade",
        name="Outreach — Checkatrade postcode sweep",
        misfire_grace_time=14400,
    )

    # Bing Places — weekly Tuesday 04:00
    scheduler.add_job(
        run_outreach_bing_pipeline,
        CronTrigger(day_of_week="tue", hour=4, minute=0),
        id="outreach_bing_places",
        name="Outreach — Bing Places UK sweep",
        misfire_grace_time=7200,
    )

    # LinkedIn companies via Google — Wednesday 04:00
    scheduler.add_job(
        run_outreach_linkedin_business_pipeline,
        CronTrigger(day_of_week="wed", hour=4, minute=0),
        id="outreach_linkedin_business",
        name="Outreach — LinkedIn company pages via Google",
        misfire_grace_time=7200,
    )

    # LinkedIn people via Google — Thursday 04:00
    scheduler.add_job(
        run_outreach_linkedin_people_pipeline,
        CronTrigger(day_of_week="thu", hour=4, minute=0),
        id="outreach_linkedin_people",
        name="Outreach — LinkedIn people (directors/tutors) via Google",
        misfire_grace_time=7200,
    )

    # Companies House direct web — Sunday 02:00 (big bulk sweep)
    scheduler.add_job(
        run_outreach_companies_house_web_pipeline,
        CronTrigger(day_of_week="sun", hour=2, minute=0),
        id="outreach_companies_house_web",
        name="Outreach — Companies House website scrape (no API)",
        misfire_grace_time=14400,
    )

    # 192.com — Sunday 07:00
    scheduler.add_job(
        run_outreach_192_pipeline,
        CronTrigger(day_of_week="sun", hour=7, minute=0),
        id="outreach_192",
        name="Outreach — 192.com directory",
        misfire_grace_time=7200,
    )

    # Trustpilot — Sunday 08:00
    scheduler.add_job(
        run_outreach_trustpilot_pipeline,
        CronTrigger(day_of_week="sun", hour=8, minute=0),
        id="outreach_trustpilot",
        name="Outreach — Trustpilot UK electricians",
        misfire_grace_time=7200,
    )

    # FreeIndex — Sunday 09:00
    scheduler.add_job(
        run_outreach_freeindex_pipeline,
        CronTrigger(day_of_week="sun", hour=9, minute=0),
        id="outreach_freeindex",
        name="Outreach — FreeIndex UK directory",
        misfire_grace_time=7200,
    )

    # Thomson Local — Sunday 10:00
    scheduler.add_job(
        run_outreach_thomson_pipeline,
        CronTrigger(day_of_week="sun", hour=10, minute=0),
        id="outreach_thomson",
        name="Outreach — Thomson Local",
        misfire_grace_time=7200,
    )

    # Website email crawl — runs every 2 hours (free, no credits)
    # This processes 300 leads per run → ~3,600 domains/day
    scheduler.add_job(
        run_outreach_website_crawl_pipeline,
        CronTrigger(hour="*/2", minute=15),
        id="outreach_website_crawl",
        name="Outreach — Website email crawl (free)",
        misfire_grace_time=1800,
    )

    # Website finder (DuckDuckGo) — every 2 hours at :05
    # For leads with company name but no website → finds + saves → website_crawl next run
    from src.pipelines.outreach_businesses import run_outreach_website_finder_pipeline
    scheduler.add_job(
        run_outreach_website_finder_pipeline,
        CronTrigger(hour="*/2", minute=5),
        id="outreach_website_finder",
        name="Outreach — Website finder (DuckDuckGo) for nameless leads",
        misfire_grace_time=1800,
    )

    # Companies House detail page scraper — every 2 hours at :35
    # Adds director names so SMTP verifier can work
    from src.pipelines.outreach_businesses import run_outreach_ch_detail_pipeline
    scheduler.add_job(
        run_outreach_ch_detail_pipeline,
        CronTrigger(hour="*/2", minute=35),
        id="outreach_ch_detail",
        name="Outreach — CH company-page scraper (director names)",
        misfire_grace_time=1800,
    )

    # SMTP pattern verifier — every 3 hours (free, uses director names)
    scheduler.add_job(
        run_outreach_smtp_verify_pipeline,
        CronTrigger(hour="1,4,7,10,13,16,19,22", minute=45),
        id="outreach_smtp_verify",
        name="Outreach — SMTP email pattern verifier",
        misfire_grace_time=1800,
    )

    # Hunter.io enrichment — LAST RESORT, daily 04:30, small batch (50) to conserve 2k credits/mo
    scheduler.add_job(
        run_outreach_businesses_hunter_enrichment,
        CronTrigger(hour=4, minute=30),
        id="outreach_businesses_hunter",
        name="Outreach — Hunter.io (last resort, 50/day ≈ 1500/month)",
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
