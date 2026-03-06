"""Deals + coupons pipeline — scrapes HotUKDeals + coupon aggregators."""

from __future__ import annotations

import structlog

from src.db.supabase_client import (
    get_supplier_id,
    insert_coupons,
    log_pipeline_end,
    log_pipeline_start,
    upsert_products,
)
from src.scrapers.coupons import scrape_coupons
from src.scrapers.hotukdeals import scrape_hotukdeals
from src.utils.alerting import alert_pipeline_failure

log = structlog.get_logger()


async def run_deals_pipeline() -> None:
    """Scrape deals from HotUKDeals."""
    run_id = log_pipeline_start("deals")
    try:
        products, coupons = await scrape_hotukdeals()

        # Resolve supplier slugs to UUIDs for products
        resolved_products: list[dict] = []
        for p in products:
            slug = p.pop("supplier_slug", None)
            if not slug:
                continue
            supplier_id = await get_supplier_id(slug)
            if not supplier_id:
                log.warning("deals_supplier_not_found", slug=slug)
                continue
            p["supplier_id"] = supplier_id
            resolved_products.append(p)

        inserted_products = upsert_products(resolved_products) if resolved_products else 0

        # Resolve supplier slugs to UUIDs for coupons
        resolved_coupons: list[dict] = []
        for c in coupons:
            slug = c.pop("supplier_slug", None)
            if not slug:
                continue
            supplier_id = await get_supplier_id(slug)
            if not supplier_id:
                continue
            c["supplier_id"] = supplier_id
            resolved_coupons.append(c)

        inserted_coupons = insert_coupons(resolved_coupons) if resolved_coupons else 0

        log_pipeline_end(
            run_id,
            status="completed",
            records_found=len(products) + len(coupons),
            records_inserted=inserted_products + inserted_coupons,
        )
        log.info(
            "deals_pipeline_done",
            products=inserted_products,
            coupons=inserted_coupons,
        )
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("deals", str(e))
        raise


async def run_coupons_pipeline() -> None:
    """Scrape coupons from VoucherCodes + MyVoucherCodes."""
    run_id = log_pipeline_start("coupons")
    try:
        coupons = await scrape_coupons()

        # Resolve supplier slugs to UUIDs
        resolved: list[dict] = []
        for c in coupons:
            slug = c.pop("supplier_slug", None)
            if not slug:
                continue
            supplier_id = await get_supplier_id(slug)
            if not supplier_id:
                log.warning("coupons_supplier_not_found", slug=slug)
                continue
            c["supplier_id"] = supplier_id
            resolved.append(c)

        inserted = insert_coupons(resolved) if resolved else 0

        log_pipeline_end(
            run_id,
            status="completed",
            records_found=len(coupons),
            records_inserted=inserted,
        )
        log.info("coupons_pipeline_done", found=len(coupons), inserted=inserted)
    except Exception as e:
        log_pipeline_end(run_id, status="failed", errors=[str(e)])
        alert_pipeline_failure("coupons", str(e))
        raise
