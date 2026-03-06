"""Supabase client singleton and common DB operations."""

from __future__ import annotations

import hashlib
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

import structlog
from supabase import Client, create_client

from src.config import settings

log = structlog.get_logger()

_client: Client | None = None


def get_client() -> Client:
    global _client
    if _client is None:
        _client = create_client(
            settings.supabase_url,
            settings.supabase_service_role_key,
        )
    return _client


# ---------------------------------------------------------------------------
# Supplier helpers
# ---------------------------------------------------------------------------

_supplier_cache: dict[str, str] = {}


async def get_supplier_id(slug: str) -> str | None:
    """Return UUID for a supplier slug, with in-memory cache."""
    if slug in _supplier_cache:
        return _supplier_cache[slug]
    resp = (
        get_client()
        .table("marketplace_suppliers")
        .select("id")
        .eq("slug", slug)
        .limit(1)
        .execute()
    )
    if resp.data:
        _supplier_cache[slug] = resp.data[0]["id"]
        return _supplier_cache[slug]
    return None


# ---------------------------------------------------------------------------
# Product upsert (materials + tools)
# ---------------------------------------------------------------------------


def upsert_products(products: list[dict[str, Any]]) -> int:
    """Batch upsert products, deduplicating by SKU (keep lowest price).

    Returns count of rows upserted.
    """
    if not products:
        return 0

    # Deduplicate: keep lowest price per (supplier_id, sku)
    seen: dict[tuple, dict] = {}
    for p in products:
        key = (p["supplier_id"], p["sku"])
        existing = seen.get(key)
        if existing is None or (p.get("current_price") or 999999) < (
            existing.get("current_price") or 999999
        ):
            seen[key] = p
    unique = list(seen.values())

    now = datetime.now(timezone.utc).isoformat()
    expires = (datetime.now(timezone.utc) + timedelta(days=7)).isoformat()

    rows = []
    for p in unique:
        rows.append(
            {
                "supplier_id": p["supplier_id"],
                "sku": p["sku"],
                "name": p["name"],
                "brand": p.get("brand"),
                "category": p.get("category"),
                "subcategory": p.get("subcategory"),
                "product_type": p.get("product_type", "material"),
                "current_price": p.get("current_price"),
                "regular_price": p.get("regular_price"),
                "is_on_sale": p.get("is_on_sale", False),
                "discount_percentage": p.get("discount_percentage"),
                "description": p.get("description"),
                "highlights": p.get("highlights"),
                "image_url": p.get("image_url"),
                "product_url": p["product_url"],
                "stock_status": p.get("stock_status", "unknown"),
                "scraped_at": now,
                "expires_at": expires,
            }
        )

    total = 0
    client = get_client()
    for i in range(0, len(rows), settings.batch_size):
        batch = rows[i : i + settings.batch_size]
        client.table("marketplace_products").upsert(
            batch, on_conflict="supplier_id,sku"
        ).execute()
        total += len(batch)

    log.info("products_upserted", count=total)
    return total


# ---------------------------------------------------------------------------
# Jobs cache
# ---------------------------------------------------------------------------


def upsert_jobs(jobs: list[dict], source: str, region: str) -> int:
    """Insert a batch of jobs into jobs_weekly_cache."""
    if not jobs:
        return 0

    client = get_client()
    batch_number = int(datetime.now(timezone.utc).strftime("%Y%m%d"))
    expires = (datetime.now(timezone.utc) + timedelta(days=7)).isoformat()

    row = {
        "batch_number": batch_number,
        "region": region,
        "jobs_data": jobs,
        "source": source,
        "expires_at": expires,
    }
    client.table("jobs_weekly_cache").insert(row).execute()
    log.info("jobs_cached", source=source, region=region, count=len(jobs))
    return len(jobs)


# ---------------------------------------------------------------------------
# Courses cache
# ---------------------------------------------------------------------------


def upsert_courses(courses: list[dict], source: str, search_query: str) -> int:
    """Insert a batch of courses into live_course_cache."""
    if not courses:
        return 0

    client = get_client()
    expires = (datetime.now(timezone.utc) + timedelta(hours=24)).isoformat()

    row = {
        "source": source,
        "search_query": search_query,
        "course_data": courses,
        "expires_at": expires,
    }
    client.table("live_course_cache").insert(row).execute()
    log.info("courses_cached", source=source, query=search_query, count=len(courses))
    return len(courses)


# ---------------------------------------------------------------------------
# Industry news
# ---------------------------------------------------------------------------


def upsert_news(articles: list[dict[str, Any]]) -> int:
    """Upsert news articles, deduplicating on (source, external_id)."""
    if not articles:
        return 0

    client = get_client()
    total = 0
    for i in range(0, len(articles), settings.batch_size):
        batch = articles[i : i + settings.batch_size]
        rows = []
        for a in batch:
            external_id = a.get("external_id") or hashlib.md5(
                (a.get("source_url") or a["title"]).encode()
            ).hexdigest()
            rows.append(
                {
                    "title": a["title"],
                    "summary": a.get("summary"),
                    "content": a.get("content"),
                    "category": a.get("category", "general"),
                    "source": a["source"],
                    "source_url": a.get("source_url"),
                    "external_id": external_id,
                    "date_published": a.get(
                        "date_published",
                        datetime.now(timezone.utc).isoformat(),
                    ),
                    "tags": a.get("tags"),
                }
            )
        client.table("industry_news").upsert(
            rows, on_conflict="source,external_id"
        ).execute()
        total += len(rows)

    log.info("news_upserted", count=total)
    return total


# ---------------------------------------------------------------------------
# Deals
# ---------------------------------------------------------------------------


def insert_deals(deals: list[dict[str, Any]]) -> int:
    """Insert deals (no upsert — each scrape creates fresh deals)."""
    if not deals:
        return 0

    client = get_client()
    total = 0
    for i in range(0, len(deals), settings.batch_size):
        batch = deals[i : i + settings.batch_size]
        client.table("marketplace_deals").insert(batch).execute()
        total += len(batch)

    log.info("deals_inserted", count=total)
    return total


def insert_coupons(coupons: list[dict[str, Any]]) -> int:
    """Upsert coupons, deduplicating on (supplier_id, code)."""
    if not coupons:
        return 0

    client = get_client()
    now = datetime.now(timezone.utc).isoformat()
    rows = []
    for c in coupons:
        rows.append(
            {
                "supplier_id": c["supplier_id"],
                "code": c["code"],
                "description": c.get("description"),
                "discount_type": c.get("discount_type"),
                "discount_value": c.get("discount_value"),
                "minimum_spend": c.get("minimum_spend"),
                "valid_until": c.get("valid_until"),
                "source_url": c.get("source_url"),
                "scraped_at": now,
            }
        )

    total = 0
    for i in range(0, len(rows), settings.batch_size):
        batch = rows[i : i + settings.batch_size]
        client.table("marketplace_coupon_codes").upsert(
            batch, on_conflict="supplier_id,code"
        ).execute()
        total += len(batch)

    log.info("coupons_upserted", count=total)
    return total


# ---------------------------------------------------------------------------
# Historical prices
# ---------------------------------------------------------------------------


def record_price_history(products: list[dict[str, Any]]) -> int:
    """Snapshot current prices into historical_prices table."""
    if not products:
        return 0

    client = get_client()
    now = datetime.now(timezone.utc).isoformat()
    rows = []
    for p in products:
        if not p.get("current_price"):
            continue
        rows.append(
            {
                "product_name": p["name"],
                "supplier": p.get("supplier_name", "unknown"),
                "price": p["current_price"],
                "currency": "GBP",
                "date_scraped": now,
                "source_url": p.get("product_url"),
                "product_url": p.get("product_url"),
                "category": p.get("category"),
            }
        )

    total = 0
    for i in range(0, len(rows), settings.batch_size):
        batch = rows[i : i + settings.batch_size]
        client.table("historical_prices").insert(batch).execute()
        total += len(batch)

    log.info("price_history_recorded", count=total)
    return total


# ---------------------------------------------------------------------------
# Pipeline run log
# ---------------------------------------------------------------------------


def log_pipeline_start(name: str) -> str:
    """Create a pipeline_run_log entry. Returns the row ID."""
    client = get_client()
    row_id = str(uuid.uuid4())
    client.table("pipeline_run_log").insert(
        {
            "id": row_id,
            "pipeline_name": name,
            "status": "running",
            "started_at": datetime.now(timezone.utc).isoformat(),
        }
    ).execute()
    return row_id


def log_pipeline_end(
    row_id: str,
    *,
    status: str = "completed",
    records_found: int = 0,
    records_inserted: int = 0,
    records_updated: int = 0,
    errors: list[str] | None = None,
) -> None:
    """Update a pipeline_run_log entry on completion."""
    now = datetime.now(timezone.utc).isoformat()
    client = get_client()
    client.table("pipeline_run_log").update(
        {
            "status": status,
            "completed_at": now,
            "records_found": records_found,
            "records_inserted": records_inserted,
            "records_updated": records_updated,
            "errors": errors,
        }
    ).eq("id", row_id).execute()


# ---------------------------------------------------------------------------
# Cleanup
# ---------------------------------------------------------------------------


def cleanup_expired() -> None:
    """Remove expired rows from cache tables."""
    client = get_client()
    now = datetime.now(timezone.utc).isoformat()

    client.table("jobs_weekly_cache").delete().lt("expires_at", now).execute()
    client.table("live_course_cache").delete().lt("expires_at", now).execute()
    client.table("marketplace_deals").update({"is_active": False}).lt(
        "expires_at", now
    ).eq("is_active", True).execute()

    log.info("cleanup_expired_done")
