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
from src.scrapers.tlc_direct import scrape_tlc
from src.scrapers.screwfix import scrape_screwfix
from src.scrapers.toolstation import scrape_toolstation
from src.scrapers.cef import scrape_cef
from src.scrapers.edmundson import scrape_edmundson
from src.scrapers.electrical_direct import scrape_electrical_direct
from src.utils.alerting import alert_pipeline_failure

log = structlog.get_logger()

# Supplier slug → scraper function mapping
SCRAPERS = [
    ("tlc-electrical", scrape_tlc),
    ("screwfix", scrape_screwfix),
    ("toolstation", scrape_toolstation),
    ("cef", scrape_cef),
    ("edmundson", scrape_edmundson),
    ("electrical-direct", scrape_electrical_direct),
]


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
    """Scrape all supplier websites for materials + tools."""
    run_id = log_pipeline_start("materials_full_scrape")
    total_found = 0
    total_inserted = 0
    errors: list[str] = []

    try:
        for slug, scraper_fn in SCRAPERS:
            try:
                supplier_id = await get_supplier_id(slug)
                if not supplier_id:
                    log.warning("supplier_not_found", slug=slug)
                    errors.append(f"Supplier '{slug}' not in DB")
                    continue

                log.info("scraper_starting", supplier=slug)
                products = await scraper_fn(supplier_id)
                total_found += len(products)

                if products:
                    inserted = upsert_products(products)
                    total_inserted += inserted
                    log.info(
                        "scraper_done",
                        supplier=slug,
                        found=len(products),
                        inserted=inserted,
                    )
                else:
                    log.warning("scraper_empty", supplier=slug)

            except Exception as e:
                log.error("scraper_failed", supplier=slug, error=str(e))
                errors.append(f"{slug}: {e}")

        status = "completed" if total_found > 0 else "completed_empty"
        if errors and total_found == 0:
            status = "failed"

        log_pipeline_end(
            run_id,
            status=status,
            records_found=total_found,
            records_inserted=total_inserted,
            errors=errors if errors else None,
        )
        log.info(
            "materials_scrape_done",
            total_found=total_found,
            total_inserted=total_inserted,
            errors=len(errors),
        )
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
