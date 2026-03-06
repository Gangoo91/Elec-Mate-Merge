"""Materials + tools pipeline — API sources (Phase 1) and scrapers (Phase 2/3)."""

from __future__ import annotations

import structlog

from src.apis.rs_components import fetch_products as fetch_rs
from src.db.supabase_client import (
    get_supplier_id,
    log_pipeline_end,
    log_pipeline_start,
    record_price_history,
    upsert_products,
)
from src.utils.alerting import alert_pipeline_failure

log = structlog.get_logger()


async def run_rs_components_pipeline() -> None:
    """Fetch products from RS Components API (materials + tools)."""
    run_id = log_pipeline_start("rs_components_api")
    try:
        supplier_id = await get_supplier_id("rs-components")
        if not supplier_id:
            log.error("rs_supplier_not_found")
            log_pipeline_end(
                run_id, status="failed", errors=["Supplier 'rs-components' not found"]
            )
            return

        products = await fetch_rs(supplier_id)
        inserted = upsert_products(products)

        log_pipeline_end(
            run_id,
            status="completed",
            records_found=len(products),
            records_inserted=inserted,
        )
        log.info(
            "rs_pipeline_done",
            products=len(products),
            inserted=inserted,
        )
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("rs_components_api", str(e))
        raise


async def run_full_materials_scrape() -> None:
    """Scrape all 9 supplier websites for materials + tools (Phase 2/3)."""
    run_id = log_pipeline_start("materials_full_scrape")
    try:
        # Phase 2: Screwfix, Toolstation, TLC
        # Phase 3: CEF, Edmundson, Yesss, Electric Center, Rexel, ElectricalDirect

        log_pipeline_end(run_id, status="completed", records_found=0)
        log.info("materials_scrape_skipped", reason="phase_2_3")
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("materials_full_scrape", str(e))
        raise


async def run_price_history_snapshot() -> None:
    """Snapshot current product prices into historical_prices."""
    run_id = log_pipeline_start("price_history")
    try:
        from src.db.supabase_client import get_client

        client = get_client()

        # Fetch all current products with prices
        offset = 0
        limit = 1000
        all_products: list[dict] = []

        while True:
            resp = (
                client.table("marketplace_products")
                .select(
                    "name,current_price,product_url,category,"
                    "marketplace_suppliers!inner(name)"
                )
                .not_.is_("current_price", "null")
                .range(offset, offset + limit - 1)
                .execute()
            )
            if not resp.data:
                break
            for row in resp.data:
                row["supplier_name"] = (
                    row.get("marketplace_suppliers", {}).get("name", "unknown")
                )
            all_products.extend(resp.data)
            if len(resp.data) < limit:
                break
            offset += limit

        recorded = record_price_history(all_products)

        log_pipeline_end(
            run_id,
            status="completed",
            records_found=len(all_products),
            records_inserted=recorded,
        )
        log.info("price_history_done", products=len(all_products), recorded=recorded)
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("price_history", str(e))
        raise
