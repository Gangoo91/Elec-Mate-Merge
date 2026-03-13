"""Jobs pipeline — aggregates from API sources and scrapers."""

from __future__ import annotations

import structlog

from src.apis.gov_apprenticeships import fetch_apprenticeships
from src.db.supabase_client import (
    log_pipeline_end,
    log_pipeline_start,
    upsert_job_listings,
    upsert_jobs,
)
from src.utils.alerting import alert_pipeline_failure
from src.utils.dedup import deduplicate_jobs

log = structlog.get_logger()


async def run_jobs_api_pipeline() -> None:
    """Fetch jobs from free API sources (Gov.uk apprenticeships only).

    Reed API and Adzuna API removed — replaced by scrape pipeline.
    """
    run_id = log_pipeline_start("jobs_api")
    try:
        all_jobs: list[dict] = []
        for name, fetcher in [
            ("gov_apprenticeships", fetch_apprenticeships),
        ]:
            try:
                results = await fetcher()
                all_jobs.extend(results)
            except Exception as e:
                log.error("jobs_source_failed", source=name, error=str(e))
        unique_jobs = deduplicate_jobs(all_jobs)

        # Upsert individual rows to job_listings for the frontend
        listings_count = upsert_job_listings(unique_jobs)

        # Group by region and cache (pops "region" key from dicts)
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
            records_updated=listings_count,
        )
        log.info(
            "jobs_api_pipeline_done",
            total=len(all_jobs),
            unique=len(unique_jobs),
            cached=total_cached,
            listings=listings_count,
            regions=len(by_region),
        )
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("jobs_api", str(e))
        raise


async def run_jobs_scrape_pipeline() -> None:
    """Fetch jobs from scraped sources (Reed website + Gumtree)."""
    run_id = log_pipeline_start("jobs_scrape")
    try:
        from src.scrapers.jobs.gumtree import scrape_gumtree_jobs
        from src.scrapers.jobs.reed import scrape_reed_jobs

        all_jobs: list[dict] = []
        for name, fetcher in [
            ("reed_scrape", scrape_reed_jobs),
            ("gumtree", scrape_gumtree_jobs),
        ]:
            try:
                results = await fetcher()
                all_jobs.extend(results)
                log.info("jobs_scraper_done", source=name, count=len(results))
            except Exception as e:
                log.error("jobs_scraper_failed", source=name, error=str(e))

        unique_jobs = deduplicate_jobs(all_jobs)

        # Upsert individual rows to job_listings for the frontend
        listings_count = upsert_job_listings(unique_jobs)

        # Group by region and cache
        by_region: dict[str, list[dict]] = {}
        for job in unique_jobs:
            region = job.pop("region", "UK")
            by_region.setdefault(region, []).append(job)

        total_cached = 0
        for region, jobs in by_region.items():
            cached = upsert_jobs(jobs, source="scrape_aggregate", region=region)
            total_cached += cached

        log_pipeline_end(
            run_id,
            status="completed",
            records_found=len(all_jobs),
            records_inserted=total_cached,
            records_updated=listings_count,
        )
        log.info(
            "jobs_scrape_pipeline_done",
            total=len(all_jobs),
            unique=len(unique_jobs),
            cached=total_cached,
            listings=listings_count,
            regions=len(by_region),
        )
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("jobs_scrape", str(e))
        raise
