"""Health and metrics endpoints."""

from __future__ import annotations

from datetime import datetime, timezone

import structlog
from fastapi import APIRouter

from src.db.supabase_client import get_client

log = structlog.get_logger()
router = APIRouter()

_start_time: datetime | None = None


def set_start_time() -> None:
    global _start_time
    _start_time = datetime.now(timezone.utc)


@router.get("/health")
async def health():
    """Basic health check."""
    uptime = None
    if _start_time:
        uptime = str(datetime.now(timezone.utc) - _start_time)

    # Quick DB connectivity check
    db_ok = False
    try:
        resp = (
            get_client()
            .table("marketplace_suppliers")
            .select("id", count="exact")
            .limit(1)
            .execute()
        )
        db_ok = True
    except Exception as e:
        log.error("health_db_check_failed", error=str(e))

    return {
        "status": "healthy" if db_ok else "degraded",
        "uptime": uptime,
        "database": "connected" if db_ok else "disconnected",
    }


@router.get("/metrics")
async def metrics():
    """Pipeline run metrics from pipeline_run_log."""
    client = get_client()

    # Last 24h runs
    recent = (
        client.table("pipeline_run_log")
        .select("pipeline_name,status,started_at,completed_at,records_found,records_inserted,errors")
        .order("started_at", desc=True)
        .limit(50)
        .execute()
    )

    # Table counts
    counts = {}
    for table in [
        "marketplace_products",
        "marketplace_deals",
        "marketplace_coupon_codes",
        "jobs_weekly_cache",
        "live_course_cache",
        "industry_news",
    ]:
        try:
            resp = (
                client.table(table)
                .select("id", count="exact")
                .limit(0)
                .execute()
            )
            counts[table] = resp.count
        except Exception:
            counts[table] = -1

    return {
        "recent_runs": recent.data,
        "table_counts": counts,
    }
