"""Outreach pipeline — BUSINESSES / ltd companies / electrical contractors.

Separate from the colleges pipeline. Feeds `business_leads`, which auto-promotes
to `outreach_contacts` for business-outreach campaigns.

Sources:
  1. Companies House API — every active UK ltd filed under SIC 43210 / 43220.
     Biggest single lever (~20–40k records).
  2. Google Maps Places API — supplements with smaller electrical firms not on
     Companies House (sole traders, unregistered businesses with Google listings).
  3. Hunter.io enrichment — for leads with a website but no email.
"""

from __future__ import annotations

import structlog

from src.db.supabase_client import (
    finish_scrape_run,
    start_scrape_run,
    upsert_business_leads,
)
from src.scrapers.outreach.bing_places import scrape_bing_places
from src.scrapers.outreach.checkatrade import scrape_checkatrade
from src.scrapers.outreach.companies_house import scrape_companies_house
from src.scrapers.outreach.companies_house_web import scrape_companies_house_web
from src.scrapers.outreach.google_places import scrape_google_places
from src.scrapers.outreach.hunter_enrichment import enrich_by_company_name, enrich_domains
from src.scrapers.outreach.linkedin_via_google import (
    discover_business_linkedin,
    discover_people_linkedin,
)
from src.scrapers.outreach.shared import normalise_domain
from src.scrapers.outreach.smtp_verify import verify_batch
from src.scrapers.outreach.uk_directories import (
    scrape_192,
    scrape_freeindex,
    scrape_thomson,
    scrape_trustpilot,
)
from src.scrapers.outreach.google_search import scrape_google_cse
from src.scrapers.outreach.companies_house_detail import enrich_batch as ch_detail_enrich_batch
from src.scrapers.outreach.domain_guesser import find_domains_batch
from src.scrapers.outreach.apollo import (
    TIER_CONFIGS,
    scrape_apollo,
    scrape_apollo_bulk_orgs,
    scrape_apollo_tier,
)
from src.scrapers.outreach.contracts_finder import scrape_contracts_finder
from src.scrapers.outreach.member_sitemaps import scrape_eca, scrape_napit, scrape_niceic
from src.scrapers.outreach.website_email_crawler import crawl_batch as website_crawl_batch
from src.scrapers.outreach.website_finder import find_websites_batch
from src.scrapers.outreach.yell import scrape_yell
from src.scrapers.outreach.yell_httpx import (
    scrape_bing_httpx,
    scrape_checkatrade_httpx,
    scrape_yell_httpx,
)
from src.utils.alerting import alert_pipeline_failure

log = structlog.get_logger()


async def run_outreach_companies_house_pipeline(
    sic_codes: list[str] | None = None,
    max_records: int | None = None,
    filter_by_name: bool = False,
) -> None:
    """Just the Companies House import — fastest way to populate the business pool."""
    run_id = start_scrape_run(
        source="companies_house",
        target_table="business_leads",
        metadata={"sic_codes": sic_codes, "max_records": max_records, "filter_by_name": filter_by_name},
    )
    try:
        leads = await scrape_companies_house(
            sic_codes=sic_codes, max_records=max_records, filter_by_name=filter_by_name
        )
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info(
            "companies_house_pipeline_done",
            discovered=len(leads),
            inserted=totals["inserted"],
            updated=totals["updated"],
            skipped=totals["skipped"],
        )
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_companies_house", str(e))
        raise


async def run_outreach_google_places_pipeline(
    areas: list[str] | None = None,
    queries: list[str] | None = None,
    max_per_query: int = 60,
) -> None:
    """Supplements Companies House with Google Maps discovery."""
    run_id = start_scrape_run(
        source="google_places",
        target_table="business_leads",
        metadata={"max_per_query": max_per_query},
    )
    try:
        leads = await scrape_google_places(
            areas=areas, queries=queries, max_per_query=max_per_query
        )
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info(
            "google_places_pipeline_done",
            discovered=len(leads),
            inserted=totals["inserted"],
            updated=totals["updated"],
        )
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_google_places", str(e))
        raise


async def run_outreach_yell_pipeline(max_pages_per_combo: int = 5) -> None:
    run_id = start_scrape_run(
        source="yell",
        target_table="business_leads",
        metadata={"max_pages_per_combo": max_pages_per_combo},
    )
    try:
        leads = await scrape_yell(max_pages_per_combo=max_pages_per_combo)
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info("yell_pipeline_done", discovered=len(leads), **totals)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_yell", str(e))
        raise


async def run_outreach_checkatrade_pipeline(max_pages_per_postcode: int = 3) -> None:
    run_id = start_scrape_run(
        source="checkatrade",
        target_table="business_leads",
        metadata={"max_pages_per_postcode": max_pages_per_postcode},
    )
    try:
        leads = await scrape_checkatrade(max_pages_per_postcode=max_pages_per_postcode)
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info("checkatrade_pipeline_done", discovered=len(leads), **totals)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_checkatrade", str(e))
        raise


async def run_outreach_bing_pipeline() -> None:
    run_id = start_scrape_run(source="bing_places", target_table="business_leads")
    try:
        leads = await scrape_bing_places()
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info("bing_places_pipeline_done", discovered=len(leads), **totals)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_bing_places", str(e))
        raise


async def run_outreach_linkedin_business_pipeline(pages_per_query: int = 5) -> None:
    run_id = start_scrape_run(source="linkedin_company", target_table="business_leads")
    try:
        leads = await discover_business_linkedin(pages_per_query=pages_per_query)
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info("linkedin_business_pipeline_done", discovered=len(leads), **totals)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_linkedin_business", str(e))
        raise


async def run_outreach_linkedin_people_pipeline(pages_per_query: int = 5) -> None:
    run_id = start_scrape_run(source="linkedin_person", target_table="business_leads")
    try:
        leads = await discover_people_linkedin(pages_per_query=pages_per_query)
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info("linkedin_people_pipeline_done", discovered=len(leads), **totals)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_linkedin_people", str(e))
        raise


async def _wrap_pipeline(source: str, target_table: str, scraper):
    """Generic pipeline wrapper: start run, scrape, upsert, finish run."""
    run_id = start_scrape_run(source=source, target_table=target_table)
    try:
        leads = await scraper()
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info(f"{source}_pipeline_done", discovered=len(leads), **totals)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure(f"outreach_{source}", str(e))
        raise


async def run_outreach_companies_house_web_pipeline() -> None:
    await _wrap_pipeline("companies_house_web", "business_leads", scrape_companies_house_web)


async def run_outreach_192_pipeline() -> None:
    await _wrap_pipeline("192", "business_leads", scrape_192)


async def run_outreach_trustpilot_pipeline() -> None:
    await _wrap_pipeline("trustpilot", "business_leads", scrape_trustpilot)


async def run_outreach_freeindex_pipeline() -> None:
    await _wrap_pipeline("freeindex", "business_leads", scrape_freeindex)


async def run_outreach_thomson_pipeline() -> None:
    await _wrap_pipeline("thomson_local", "business_leads", scrape_thomson)


async def run_outreach_yell_httpx_pipeline() -> None:
    await _wrap_pipeline("yell_httpx", "business_leads", scrape_yell_httpx)


async def run_outreach_checkatrade_httpx_pipeline() -> None:
    await _wrap_pipeline("checkatrade_httpx", "business_leads", scrape_checkatrade_httpx)


async def run_outreach_bing_httpx_pipeline() -> None:
    await _wrap_pipeline("bing_httpx", "business_leads", scrape_bing_httpx)


async def run_outreach_google_cse_pipeline() -> None:
    await _wrap_pipeline("google_cse", "business_leads", scrape_google_cse)


async def run_outreach_contracts_finder_pipeline() -> None:
    await _wrap_pipeline("contracts_finder", "business_leads", scrape_contracts_finder)


async def run_outreach_apollo_supervisors_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_supervisors", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("supervisors")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_supervisors_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_supervisors", str(e))
        raise


async def run_outreach_apollo_electricians_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_electricians", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("electricians")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_electricians_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_electricians", str(e))
        raise


async def run_outreach_apollo_apprentices_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_apprentices", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("apprentices")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_apprentices_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_apprentices", str(e))
        raise


async def run_outreach_apollo_electrical_engineers_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_electrical_engineers", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("electrical_engineers")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_electrical_engineers_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_electrical_engineers", str(e))
        raise


async def run_outreach_apollo_building_services_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_building_services", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("building_services")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_building_services_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_building_services", str(e))
        raise


async def run_outreach_apollo_field_maintenance_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_field_maintenance", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("field_maintenance")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_field_maintenance_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_field_maintenance", str(e))
        raise


async def run_outreach_apollo_estimators_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_estimators_contracts", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("estimators_contracts")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_estimators_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_estimators", str(e))
        raise


async def run_outreach_apollo_round_2_chain_pipeline() -> None:
    """Chain-run the 4 new extended-audience tiers back-to-back. Budget ≈ 12,000."""
    run_id = start_scrape_run(source="apollo_round_2", target_table="business_leads")
    saved_total = 0
    try:
        for tier in ["electrical_engineers", "building_services", "field_maintenance", "estimators_contracts"]:
            try:
                saved = await scrape_apollo_tier(tier)
                saved_total += saved
                log.info("apollo_round_2_tier_complete", tier=tier, saved=saved, cumulative=saved_total)
            except Exception as inner:
                log.error("apollo_round_2_tier_error", tier=tier, error=str(inner))
        finish_scrape_run(run_id, status="completed", records_discovered=saved_total, records_inserted=saved_total)
        log.info("apollo_round_2_chain_done", total_saved=saved_total)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        raise


async def run_outreach_apollo_electricians_accredited_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_electricians_accredited", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("electricians_accredited")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_electricians_accredited_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_electricians_accredited", str(e))
        raise


async def run_outreach_apollo_accredited_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_accredited", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("accredited")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_accredited_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_accredited", str(e))
        raise


async def run_outreach_apollo_geo_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_geo", target_table="business_leads")
    try:
        saved = await scrape_apollo_tier("geo_drill")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_geo_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_geo", str(e))
        raise


async def run_outreach_apollo_college_heads_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_college_heads", target_table="education_leads")
    try:
        saved = await scrape_apollo_tier("college_heads")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_college_heads_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_college_heads", str(e))
        raise


async def run_outreach_apollo_electrical_tutors_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_electrical_tutors", target_table="education_leads")
    try:
        saved = await scrape_apollo_tier("electrical_tutors")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_electrical_tutors_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_electrical_tutors", str(e))
        raise


async def run_outreach_apollo_apprenticeship_coords_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_apprenticeship_coords", target_table="education_leads")
    try:
        saved = await scrape_apollo_tier("apprenticeship_coords")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_apprenticeship_coords_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_apprenticeship_coords", str(e))
        raise


async def run_outreach_apollo_assessors_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_assessors", target_table="education_leads")
    try:
        saved = await scrape_apollo_tier("assessors")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_assessors_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_assessors", str(e))
        raise


async def run_outreach_apollo_training_providers_pipeline() -> None:
    run_id = start_scrape_run(source="apollo_training_provider_directors", target_table="education_leads")
    try:
        saved = await scrape_apollo_tier("training_provider_directors")
        finish_scrape_run(run_id, status="completed", records_discovered=saved, records_inserted=saved)
        log.info("apollo_training_providers_pipeline_done", saved=saved)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_training_providers", str(e))
        raise


async def run_outreach_apollo_education_all_pipeline() -> None:
    """Chain-run every Apollo EDUCATION tier back-to-back. Budget ≈ 8,000 credits."""
    run_id = start_scrape_run(source="apollo_education_all", target_table="education_leads")
    saved_total = 0
    try:
        # Priority order: tutors (biggest education value) → coords → heads → rest
        for tier in [
            "electrical_tutors", "apprenticeship_coords", "college_heads",
            "assessors", "training_provider_directors",
        ]:
            try:
                saved = await scrape_apollo_tier(tier)
                saved_total += saved
                log.info("apollo_edu_tier_complete", tier=tier, saved=saved, cumulative=saved_total)
            except Exception as inner:
                log.error("apollo_edu_tier_error", tier=tier, error=str(inner))
        finish_scrape_run(run_id, status="completed", records_discovered=saved_total, records_inserted=saved_total)
        log.info("apollo_education_all_done", total_saved=saved_total)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        raise


async def run_outreach_apollo_all_tiers_pipeline() -> None:
    """Chain-run every Apollo tier back-to-back. Total budget ≈ 17,500 credits."""
    run_id = start_scrape_run(source="apollo_all_tiers", target_table="business_leads")
    saved_total = 0
    try:
        # Priority order: electricians (main audience) → apprentices → supervisors → rest
        for tier in ["electricians", "apprentices", "supervisors", "accredited", "geo_drill"]:
            try:
                saved = await scrape_apollo_tier(tier)
                saved_total += saved
                log.info("apollo_tier_complete", tier=tier, saved=saved, cumulative=saved_total)
            except Exception as inner:
                log.error("apollo_tier_error", tier=tier, error=str(inner))
        finish_scrape_run(
            run_id, status="completed",
            records_discovered=saved_total, records_inserted=saved_total,
        )
        log.info("apollo_all_tiers_done", total_saved=saved_total)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        raise


async def run_outreach_apollo_bulk_pipeline(max_credits: int = 4000) -> None:
    """Apollo bulk: find every UK electrical org, then decision-makers at each.
    Spends up to max_credits on /people/match. Broader than keyword search alone."""
    run_id = start_scrape_run(
        source="apollo_bulk",
        target_table="business_leads",
        metadata={"max_credits": max_credits},
    )
    try:
        leads = await scrape_apollo_bulk_orgs(max_credits=max_credits)
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info("apollo_bulk_pipeline_done", discovered=len(leads), **totals)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo_bulk", str(e))
        raise


async def run_outreach_apollo_pipeline(max_credits: int = 3500) -> None:
    """Spend Apollo credits to unlock verified UK electrical director emails.
    Caps at max_credits (default 3500 of 4000 monthly budget — leaves 500 for later)."""
    run_id = start_scrape_run(
        source="apollo",
        target_table="business_leads",
        metadata={"max_credits": max_credits},
    )
    try:
        leads = await scrape_apollo(max_credits=max_credits)
        totals = upsert_business_leads(leads)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info("apollo_pipeline_done", discovered=len(leads), **totals)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_apollo", str(e))
        raise


async def run_outreach_eca_sitemap_pipeline() -> None:
    await _wrap_pipeline("eca_sitemap", "business_leads", scrape_eca)


async def run_outreach_niceic_sitemap_pipeline() -> None:
    await _wrap_pipeline("niceic_sitemap", "business_leads", scrape_niceic)


async def run_outreach_napit_sitemap_pipeline() -> None:
    await _wrap_pipeline("napit_sitemap", "business_leads", scrape_napit)


async def run_outreach_domain_guesser_pipeline(batch_size: int = 2000) -> None:
    """For every lead with company name but no website, guess likely domains
    and HEAD-probe each. Massively faster than search engines and nothing blocks us.
    """
    from src.db.supabase_client import get_client

    run_id = start_scrape_run(source="domain_guesser", target_table="business_leads")
    try:
        client = get_client()
        resp = (
            client.table("business_leads")
            .select("id, company_name, postcode, confidence_score, raw_data")
            .is_("website", "null")
            .is_("email", "null")
            .eq("status", "new")
            .order("created_at", desc=True)
            .limit(batch_size)
            .execute()
        )
        leads = resp.data or []
        if not leads:
            log.info("domain_guesser_empty_batch")
            finish_scrape_run(run_id, status="completed")
            return

        updates = await find_domains_batch(leads, concurrency=25, require_electrical=True)
        written = 0
        for upd in updates:
            try:
                existing_raw = next(
                    (l.get("raw_data") or {}) for l in leads if l["id"] == upd["id"]
                )
                merged_raw = {**existing_raw, **(upd.pop("raw_data_merge", {}) or {})}
                row_update = {
                    "website": upd["website"],
                    "domain": upd["domain"],
                    "confidence_score": upd["confidence_score"],
                    "raw_data": merged_raw,
                }
                client.table("business_leads").update(row_update).eq("id", upd["id"]).execute()
                written += 1
            except Exception as e:
                log.warning("domain_guesser_write_failed", id=upd.get("id"), error=str(e))

        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_updated=written,
        )
        log.info("domain_guesser_pipeline_done", input=len(leads), found=written)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_domain_guesser", str(e))
        raise


async def run_outreach_website_finder_pipeline(batch_size: int = 400) -> None:
    """DuckDuckGo search every lead missing a website. Save the first non-directory hit."""
    from src.db.supabase_client import get_client

    run_id = start_scrape_run(source="website_finder", target_table="business_leads")
    try:
        client = get_client()
        resp = (
            client.table("business_leads")
            .select("id, company_name, postcode, confidence_score, raw_data, website")
            .is_("website", "null")
            .not_.eq("status", "rejected")
            .order("created_at", desc=True)
            .limit(batch_size)
            .execute()
        )
        leads = resp.data or []
        if not leads:
            log.info("website_finder_empty_batch")
            finish_scrape_run(run_id, status="completed")
            return

        updates = await find_websites_batch(leads)
        written = 0
        for upd in updates:
            try:
                existing_raw = next(
                    (l.get("raw_data") or {}) for l in leads if l["id"] == upd["id"]
                )
                merged_raw = {**existing_raw, **(upd.pop("raw_data_merge", {}) or {})}
                row_update = {
                    "website": upd["website"],
                    "domain": upd["domain"],
                    "confidence_score": upd["confidence_score"],
                    "raw_data": merged_raw,
                }
                client.table("business_leads").update(row_update).eq("id", upd["id"]).execute()
                written += 1
            except Exception as e:
                log.warning("website_finder_write_failed", id=upd.get("id"), error=str(e))

        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_updated=written,
        )
        log.info("website_finder_pipeline_done", input=len(leads), found=written)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_website_finder", str(e))
        raise


async def run_outreach_ch_detail_pipeline(batch_size: int = 2000) -> None:
    """Scrape CH company pages for director names + full address."""
    from src.db.supabase_client import get_client

    run_id = start_scrape_run(source="ch_detail", target_table="business_leads")
    try:
        client = get_client()
        resp = (
            client.table("business_leads")
            .select("id, company_number, director_names, postcode, sic_codes")
            .not_.is_("company_number", "null")
            .or_("director_names.eq.{},director_names.is.null")
            .order("created_at", desc=True)
            .limit(batch_size)
            .execute()
        )
        leads = resp.data or []
        if not leads:
            log.info("ch_detail_empty_batch")
            finish_scrape_run(run_id, status="completed")
            return

        updates = await ch_detail_enrich_batch(leads)
        written = 0
        for upd in updates:
            try:
                fields = {k: v for k, v in upd.items() if k != "id" and v}
                # registered_address → address_line_1
                if "registered_address" in fields:
                    fields["address_line_1"] = fields.pop("registered_address")
                if "incorporation_date_text" in fields:
                    fields.pop("incorporation_date_text", None)
                client.table("business_leads").update(fields).eq("id", upd["id"]).execute()
                written += 1
            except Exception as e:
                log.warning("ch_detail_write_failed", id=upd.get("id"), error=str(e))

        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_updated=written,
        )
        log.info("ch_detail_pipeline_done", input=len(leads), enriched=written)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_ch_detail", str(e))
        raise


async def run_outreach_website_crawl_pipeline(batch_size: int = 1500) -> None:
    """For business_leads with website but no email, crawl the site for emails.

    FREE — no Hunter credits used. Should capture ~50-70% of domains before we
    fall back to Hunter. Runs in batches so one slow domain doesn't stall.
    """
    from src.db.supabase_client import get_client

    run_id = start_scrape_run(source="website_email_crawl", target_table="business_leads")
    try:
        client = get_client()
        resp = (
            client.table("business_leads")
            .select("id, website, domain, company_name, director_names, email, phone, confidence_score, raw_data")
            .is_("email", "null")
            .not_.is_("website", "null")
            .neq("status", "rejected")
            .limit(batch_size)
            .execute()
        )
        leads = resp.data or []
        if not leads:
            log.info("website_crawl_empty_batch")
            finish_scrape_run(run_id, status="completed")
            return

        updated_leads = await website_crawl_batch(leads)

        written = 0
        for lead in updated_leads:
            try:
                update_fields: dict[str, Any] = {
                    "email": lead.get("email"),
                    "email_type": lead.get("email_type"),
                    "phone": lead.get("phone"),
                    "director_names": lead.get("director_names") or [],
                    "confidence_score": lead.get("confidence_score"),
                    "raw_data": lead.get("raw_data"),
                }
                # Drop None values so we don't overwrite existing data
                update_fields = {k: v for k, v in update_fields.items() if v is not None}
                client.table("business_leads").update(update_fields).eq("id", lead["id"]).execute()
                written += 1

                # Auto-promote to outreach_contacts if now has email
                if lead.get("email"):
                    from src.db.supabase_client import _auto_promote_to_contact
                    tags = ["business_pool", f"source:website_scrape"]
                    if lead.get("director_names"):
                        pass
                    _auto_promote_to_contact(
                        email=lead["email"],
                        name=(lead.get("director_names") or [None])[0],
                        organisation=lead["company_name"],
                        role="Director" if lead.get("director_names") else None,
                        contact_type="employer",
                        tags=tags,
                        source_label="lead_business_website_crawl",
                    )
            except Exception as e:
                log.warning("website_crawl_write_failed", id=lead.get("id"), error=str(e))

        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_updated=written,
        )
        log.info("website_crawl_pipeline_done", input=len(leads), updated=written)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_website_crawl", str(e))
        raise


async def run_outreach_smtp_verify_pipeline(batch_size: int = 1000) -> None:
    """Verify email patterns for business_leads that have a name + website but no email."""
    from src.db.supabase_client import get_client

    run_id = start_scrape_run(source="smtp_verify", target_table="business_leads")
    try:
        client = get_client()
        resp = (
            client.table("business_leads")
            .select("id, website, domain, company_name, director_names")
            .is_("email", "null")
            .not_.is_("website", "null")
            .limit(batch_size)
            .execute()
        )
        leads = [r for r in (resp.data or []) if (r.get("director_names") or [])]
        if not leads:
            log.info("smtp_verify_empty_batch")
            finish_scrape_run(run_id, status="completed")
            return

        verified = await verify_batch(leads)

        # Write verified emails back
        updated = 0
        for v in verified:
            try:
                client.table("business_leads").update({
                    "email": v["verified_email"],
                    "email_type": "smtp_verified",
                    "confidence_score": v.get("confidence", 75),
                }).eq("id", v["id"]).execute()
                updated += 1
            except Exception as e:
                log.warning("smtp_verify_update_failed", id=v.get("id"), error=str(e))

        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_updated=updated,
        )
        log.info("smtp_verify_pipeline_done", input=len(leads), verified=updated)
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_smtp_verify", str(e))
        raise


async def run_outreach_businesses_hunter_enrichment(batch_size: int = 400) -> None:
    """Hunter.io enrichment — dedupe by domain, highest-confidence first.

    Budget-aware: user's Hunter plan is 2000 credits/month. We dedupe so we
    never hit the same domain twice. A first sweep over ~1,200 unique UK
    electrical business domains should yield ~500-700 named emails and leave
    enough quota for daily top-ups.
    """
    """Pull business_leads with a website but no email, enrich via Hunter, persist."""
    from src.db.supabase_client import get_client

    run_id = start_scrape_run(
        source="hunter_business_enrichment",
        target_table="business_leads",
        metadata={"batch_size": batch_size},
    )
    try:
        client = get_client()
        # Pull leads with a website and no email yet. Dedupe by domain below
        # so we don't burn credits hitting the same site twice.
        resp = (
            client.table("business_leads")
            .select("id, website, domain, company_name, country, region, postcode, accreditations, sic_codes")
            .is_("email", "null")
            .not_.is_("website", "null")
            .order("confidence_score", desc=True)
            .limit(batch_size * 2)  # pull 2x; dedupe will shrink
            .execute()
        )
        all_rows = resp.data or []
        # Dedupe by domain — one lead per domain
        seen_domains: set[str] = set()
        rows = []
        for r in all_rows:
            d = (r.get("domain") or normalise_domain(r.get("website")) or "").lower()
            if not d or d in seen_domains:
                continue
            seen_domains.add(d)
            rows.append(r)
            if len(rows) >= batch_size:
                break
        # `rows` is already the deduped list
        if not rows:
            log.info("hunter_business_enrichment_empty")
            finish_scrape_run(run_id, status="completed")
            return

        domains = [normalise_domain(r["website"]) for r in rows]
        hunter_map = await enrich_domains(domains)

        updates = []
        for r in rows:
            d = normalise_domain(r.get("website"))
            if d and d in hunter_map:
                hit = hunter_map[d]
                r["email"] = hit.get("email")
                r["director_names"] = (
                    [" ".join(p for p in (hit.get("first_name"), hit.get("last_name")) if p)]
                    if hit.get("first_name") or hit.get("last_name")
                    else []
                )
                r["confidence_score"] = 85
                r["raw_data"] = {"hunter": hit}
                r["source"] = "hunter_enrichment"
                r["source_id"] = f"hunter:{d}"
                updates.append(r)

        totals = upsert_business_leads(updates)
        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(updates),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info(
            "hunter_business_enrichment_done",
            input=len(rows),
            enriched=len(updates),
            auto_promoted=totals["auto_promoted"],
        )
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_businesses_hunter", str(e))
        raise


async def run_outreach_hunter_company_search_pipeline(
    credit_budget: int = 1500,
) -> None:
    """Hunter by COMPANY NAME — for Ltds where we have a name but no website.
    1 credit per company (hit or miss). Budget-capped so we can't overrun
    the Hunter quota. Priority: Companies House Ltds first (higher credibility),
    then any remaining status='new' leads with no email.

    Skips any Ltd whose company_name already matches an existing
    outreach_contacts.organisation — avoids burning credits re-discovering
    emails we already have in the campaign pool.
    """
    from src.db.supabase_client import get_client

    run_id = start_scrape_run(
        source="hunter_company_search",
        target_table="business_leads",
        metadata={"credit_budget": credit_budget},
    )
    try:
        client = get_client()

        # Load every existing contact organisation so we can skip duplicates.
        # Paginated because Supabase caps at 1000 rows per query.
        existing_orgs: set[str] = set()
        offset = 0
        page_size = 1000
        while True:
            page = (
                client.table("outreach_contacts")
                .select("organisation")
                .not_.is_("organisation", "null")
                .range(offset, offset + page_size - 1)
                .execute()
            )
            rows = page.data or []
            if not rows:
                break
            for r in rows:
                org = (r.get("organisation") or "").strip().lower()
                if org:
                    existing_orgs.add(org)
            if len(rows) < page_size:
                break
            offset += page_size
        log.info("hunter_company_existing_orgs_loaded", count=len(existing_orgs))

        # Pull a bigger pool than we need, then filter locally so we end up with
        # budget-worth of ACTUALLY new CH Ltds to query.
        target_pool = credit_budget * 3  # expect ~66% to be duplicates by name
        resp = (
            client.table("business_leads")
            .select("id, company_name, company_number, accreditations")
            .eq("status", "new")
            .is_("email", "null")
            .is_("website", "null")
            .not_.is_("company_name", "null")
            .not_.is_("company_number", "null")
            .order("created_at", desc=True)
            .limit(min(target_pool, 1000))
            .execute()
        )
        raw_leads = resp.data or []

        # Filter out any lead whose name is already in outreach_contacts
        leads = [
            l for l in raw_leads
            if (l.get("company_name") or "").strip().lower() not in existing_orgs
        ]
        skipped = len(raw_leads) - len(leads)
        log.info(
            "hunter_company_filter_applied",
            fetched=len(raw_leads),
            skipped_existing=skipped,
            remaining=len(leads),
        )

        if not leads:
            log.info("hunter_company_search_empty_after_filter")
            finish_scrape_run(run_id, status="completed")
            return

        # Cap to credit_budget — each call is 1 credit
        if len(leads) > credit_budget:
            leads = leads[:credit_budget]

        log.info(
            "hunter_company_search_start",
            pool=len(leads),
            budget=credit_budget,
        )

        updates = await enrich_by_company_name(leads, credit_budget=credit_budget)

        written = 0
        for upd in updates:
            try:
                lead_id = upd.pop("id")
                raw_merge = upd.pop("raw_merge", None)
                # Merge raw_data
                if raw_merge:
                    existing = (
                        client.table("business_leads")
                        .select("raw_data")
                        .eq("id", lead_id)
                        .single()
                        .execute()
                    )
                    existing_raw = (existing.data or {}).get("raw_data") or {}
                    upd["raw_data"] = {**existing_raw, **raw_merge}
                upd["confidence_score"] = 85  # Hunter hit = high confidence
                client.table("business_leads").update(upd).eq("id", lead_id).execute()
                written += 1
            except Exception as e:
                log.warning(
                    "hunter_company_write_failed",
                    id=upd.get("id"),
                    error=str(e),
                )

        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_updated=written,
        )
        log.info(
            "hunter_company_search_pipeline_done",
            pool=len(leads),
            hits=len(updates),
            written=written,
        )
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_hunter_company_search", str(e))
        raise
