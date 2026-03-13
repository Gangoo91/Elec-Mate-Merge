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
    }

    if pipeline_name not in pipelines:
        return {"error": f"Unknown pipeline: {pipeline_name}", "available": list(pipelines.keys())}

    import asyncio

    asyncio.create_task(pipelines[pipeline_name]())
    return {"status": "triggered", "pipeline": pipeline_name}
