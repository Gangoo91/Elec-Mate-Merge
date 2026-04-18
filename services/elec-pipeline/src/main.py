"""Elec-Pipeline — Autonomous data pipeline for Elec-Mate.

FastAPI app with APScheduler for autonomous cron jobs.
Feeds materials, tools, jobs, courses, news, and deals into Supabase.
"""

from __future__ import annotations

from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI

from src.health import router as health_router, set_start_time
from src.scheduler import create_scheduler

structlog.configure(
    processors=[
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ],
)

log = structlog.get_logger()

scheduler = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global scheduler
    set_start_time()
    scheduler = create_scheduler()
    scheduler.start()
    log.info("pipeline_started", jobs=len(scheduler.get_jobs()))
    yield
    if scheduler:
        scheduler.shutdown(wait=False)
    log.info("pipeline_stopped")


app = FastAPI(
    title="Elec-Pipeline",
    description="Autonomous data pipeline for Elec-Mate",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(health_router, prefix="/pipeline")


@app.get("/")
async def root():
    return {"service": "elec-pipeline", "status": "running"}


@app.post("/pipeline/run/{pipeline_name}")
async def trigger_pipeline(pipeline_name: str):
    """Manually trigger a pipeline (for testing / on-demand)."""
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
        run_outreach_hunter_company_search_pipeline,
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
        run_outreach_yell_httpx_pipeline,
        run_outreach_checkatrade_httpx_pipeline,
        run_outreach_bing_httpx_pipeline,
        run_outreach_google_cse_pipeline,
        run_outreach_website_finder_pipeline,
        run_outreach_ch_detail_pipeline,
        run_outreach_domain_guesser_pipeline,
        run_outreach_eca_sitemap_pipeline,
        run_outreach_niceic_sitemap_pipeline,
        run_outreach_napit_sitemap_pipeline,
        run_outreach_contracts_finder_pipeline,
        run_outreach_apollo_pipeline,
        run_outreach_apollo_bulk_pipeline,
        run_outreach_apollo_supervisors_pipeline,
        run_outreach_apollo_electricians_pipeline,
        run_outreach_apollo_apprentices_pipeline,
        run_outreach_apollo_accredited_pipeline,
        run_outreach_apollo_electricians_accredited_pipeline,
        run_outreach_apollo_electrical_engineers_pipeline,
        run_outreach_apollo_building_services_pipeline,
        run_outreach_apollo_field_maintenance_pipeline,
        run_outreach_apollo_estimators_pipeline,
        run_outreach_apollo_round_2_chain_pipeline,
        run_outreach_apollo_geo_pipeline,
        run_outreach_apollo_all_tiers_pipeline,
        run_outreach_apollo_college_heads_pipeline,
        run_outreach_apollo_electrical_tutors_pipeline,
        run_outreach_apollo_apprenticeship_coords_pipeline,
        run_outreach_apollo_assessors_pipeline,
        run_outreach_apollo_training_providers_pipeline,
        run_outreach_apollo_education_all_pipeline,
    )

    pipelines = {
        "news": run_news_pipeline,
        "jobs_api": run_jobs_api_pipeline,
        "jobs_scrape": run_jobs_scrape_pipeline,
        "rs_components": run_rs_components_pipeline,
        "materials_scrape": run_full_materials_scrape,
        "price_history": run_price_history_snapshot,
        "courses_api": run_courses_api_pipeline,
        "courses_scrape": run_courses_scrape_pipeline,
        "deals": run_deals_pipeline,
        "coupons": run_coupons_pipeline,
        # Outreach — two separate pipelines
        "outreach_colleges": run_outreach_colleges_pipeline,
        "outreach_companies_house": run_outreach_companies_house_pipeline,
        "outreach_companies_house_web": run_outreach_companies_house_web_pipeline,
        "outreach_google_places": run_outreach_google_places_pipeline,
        "outreach_yell": run_outreach_yell_pipeline,
        "outreach_checkatrade": run_outreach_checkatrade_pipeline,
        "outreach_bing": run_outreach_bing_pipeline,
        "outreach_linkedin_business": run_outreach_linkedin_business_pipeline,
        "outreach_linkedin_people": run_outreach_linkedin_people_pipeline,
        "outreach_192": run_outreach_192_pipeline,
        "outreach_trustpilot": run_outreach_trustpilot_pipeline,
        "outreach_freeindex": run_outreach_freeindex_pipeline,
        "outreach_thomson": run_outreach_thomson_pipeline,
        "outreach_smtp_verify": run_outreach_smtp_verify_pipeline,
        "outreach_website_crawl": run_outreach_website_crawl_pipeline,
        "outreach_yell_httpx": run_outreach_yell_httpx_pipeline,
        "outreach_checkatrade_httpx": run_outreach_checkatrade_httpx_pipeline,
        "outreach_bing_httpx": run_outreach_bing_httpx_pipeline,
        "outreach_google_cse": run_outreach_google_cse_pipeline,
        "outreach_website_finder": run_outreach_website_finder_pipeline,
        "outreach_domain_guesser": run_outreach_domain_guesser_pipeline,
        "outreach_eca_sitemap": run_outreach_eca_sitemap_pipeline,
        "outreach_niceic_sitemap": run_outreach_niceic_sitemap_pipeline,
        "outreach_napit_sitemap": run_outreach_napit_sitemap_pipeline,
        "outreach_contracts_finder": run_outreach_contracts_finder_pipeline,
        "outreach_apollo": run_outreach_apollo_pipeline,
        "outreach_apollo_bulk": run_outreach_apollo_bulk_pipeline,
        "outreach_apollo_supervisors": run_outreach_apollo_supervisors_pipeline,
        "outreach_apollo_electricians": run_outreach_apollo_electricians_pipeline,
        "outreach_apollo_apprentices": run_outreach_apollo_apprentices_pipeline,
        "outreach_apollo_accredited": run_outreach_apollo_accredited_pipeline,
        "outreach_apollo_electricians_accredited": run_outreach_apollo_electricians_accredited_pipeline,
        "outreach_apollo_electrical_engineers": run_outreach_apollo_electrical_engineers_pipeline,
        "outreach_apollo_building_services": run_outreach_apollo_building_services_pipeline,
        "outreach_apollo_field_maintenance": run_outreach_apollo_field_maintenance_pipeline,
        "outreach_apollo_estimators": run_outreach_apollo_estimators_pipeline,
        "outreach_apollo_round_2": run_outreach_apollo_round_2_chain_pipeline,
        "outreach_apollo_geo": run_outreach_apollo_geo_pipeline,
        "outreach_apollo_all_tiers": run_outreach_apollo_all_tiers_pipeline,
        "outreach_apollo_college_heads": run_outreach_apollo_college_heads_pipeline,
        "outreach_apollo_electrical_tutors": run_outreach_apollo_electrical_tutors_pipeline,
        "outreach_apollo_apprenticeship_coords": run_outreach_apollo_apprenticeship_coords_pipeline,
        "outreach_apollo_assessors": run_outreach_apollo_assessors_pipeline,
        "outreach_apollo_training_providers": run_outreach_apollo_training_providers_pipeline,
        "outreach_apollo_education_all": run_outreach_apollo_education_all_pipeline,
        "outreach_ch_detail": run_outreach_ch_detail_pipeline,
        "outreach_businesses_hunter": run_outreach_businesses_hunter_enrichment,
        "outreach_hunter_company_search": run_outreach_hunter_company_search_pipeline,
    }

    if pipeline_name not in pipelines:
        return {"error": f"Unknown pipeline: {pipeline_name}", "available": list(pipelines.keys())}

    import asyncio

    asyncio.create_task(pipelines[pipeline_name]())
    return {"status": "triggered", "pipeline": pipeline_name}
