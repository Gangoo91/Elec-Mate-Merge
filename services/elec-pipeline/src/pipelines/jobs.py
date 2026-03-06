"""Jobs pipeline — aggregates from API sources (Phase 1) and scrapers (Phase 2)."""

from __future__ import annotations

import structlog

from src.apis.adzuna_jobs import fetch_jobs as fetch_adzuna
from src.apis.gov_apprenticeships import fetch_apprenticeships
from src.apis.reed_jobs import fetch_jobs as fetch_reed
from src.db.supabase_client import (
    log_pipeline_end,
    log_pipeline_start,
    upsert_jobs,
)
from src.utils.alerting import alert_pipeline_failure
from src.utils.dedup import deduplicate_jobs

log = structlog.get_logger()


async def run_jobs_api_pipeline() -> None:
    """Fetch jobs from all API sources (Reed, Adzuna, Gov.uk apprenticeships)."""
    run_id = log_pipeline_start("jobs_api")
    try:
        # Fetch from all API sources
        reed_jobs = await fetch_reed()
        adzuna_jobs = await fetch_adzuna()
        apprenticeships = await fetch_apprenticeships()

        all_jobs = reed_jobs + adzuna_jobs + apprenticeships
        unique_jobs = deduplicate_jobs(all_jobs)

        # Group by region and cache
        by_region: dict[str, list[dict]] = {}
        for job in unique_jobs:
            region = job.pop("region", "UK")
            by_region.setdefault(region, []).append(job)

        total_cached = 0
        for region, jobs in by_region.items():
            cached = upsert_jobs(jobs, source="api_aggregate", region=region)
            total_cached += cached

        log_pipeline_end(
            run_id,
            status="completed",
            records_found=len(all_jobs),
            records_inserted=total_cached,
        )
        log.info(
            "jobs_api_pipeline_done",
            total=len(all_jobs),
            unique=len(unique_jobs),
            cached=total_cached,
            regions=len(by_region),
        )
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("jobs_api", str(e))
        raise


async def run_jobs_scrape_pipeline() -> None:
    """Fetch jobs from scraped sources (Phase 2 — Indeed, Totaljobs, etc.)."""
    run_id = log_pipeline_start("jobs_scrape")
    try:
        # Phase 2: Import and run scraped job sources here
        # from src.scrapers.jobs.indeed import fetch_indeed_jobs
        # from src.scrapers.jobs.totaljobs import fetch_totaljobs
        # etc.

        log_pipeline_end(run_id, status="completed", records_found=0)
        log.info("jobs_scrape_pipeline_skipped", reason="phase_2")
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("jobs_scrape", str(e))
        raise
