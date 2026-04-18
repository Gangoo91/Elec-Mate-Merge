"""Outreach pipeline — COLLEGES / training centres / tutors.

Separate from the business pipeline. Feeds `education_leads`, which auto-promotes
to `outreach_contacts` for college-outreach campaigns.

Sources:
  1. gov.uk Find an Apprenticeship Training Provider (course 400 — Installation
     and maintenance electrician)
  2. Website enrichment via crawl4ai
  3. Hunter.io enrichment for domains that didn't yield an email on the site
"""

from __future__ import annotations

import structlog

from src.db.supabase_client import (
    finish_scrape_run,
    start_scrape_run,
    upsert_education_leads,
)
from src.scrapers.outreach.gov_apprenticeship import scrape_gov_apprenticeship_providers
from src.scrapers.outreach.hunter_enrichment import enrich_domains
from src.scrapers.outreach.shared import normalise_domain
from src.utils.alerting import alert_pipeline_failure

log = structlog.get_logger()


async def run_outreach_colleges_pipeline(
    max_providers: int | None = None,
    max_pages: int = 40,
    hunter_top_n: int = 50,
) -> None:
    """Crawl gov.uk apprenticeship providers + enrich missing emails with Hunter."""
    run_id = start_scrape_run(
        source="gov_uk_apprenticeships",
        target_table="education_leads",
        metadata={"max_providers": max_providers, "max_pages": max_pages},
    )
    try:
        # 1. Scrape gov.uk + each provider website
        leads = await scrape_gov_apprenticeship_providers(
            max_providers=max_providers, max_pages=max_pages
        )
        log.info("colleges_pipeline_scraped", total=len(leads))

        # 2. Hunter enrichment for leads without an email but with a website
        missing_email_with_site = [
            l for l in leads
            if not l.get("email") and normalise_domain(l.get("website"))
        ][:hunter_top_n]

        if missing_email_with_site:
            domains = [normalise_domain(l["website"]) for l in missing_email_with_site]
            hunter_map = await enrich_domains(domains)
            for l in missing_email_with_site:
                d = normalise_domain(l.get("website"))
                if d and d in hunter_map:
                    hit = hunter_map[d]
                    l["email"] = hit.get("email")
                    l["email_type"] = hit.get("type") or "generic"
                    if hit.get("first_name") or hit.get("last_name"):
                        l["name"] = " ".join(
                            p for p in (hit.get("first_name"), hit.get("last_name")) if p
                        )
                    l["role"] = hit.get("position") or l.get("role")
                    l["confidence_score"] = max(l.get("confidence_score", 50), 80)
                    l["raw_data"] = {**(l.get("raw_data") or {}), "hunter": hit}
            log.info("colleges_hunter_enriched", enriched=len(
                [l for l in missing_email_with_site if l.get("email")]
            ))

        # 3. Upsert — auto-promotes leads with emails into outreach_contacts
        totals = upsert_education_leads(leads)

        finish_scrape_run(
            run_id,
            status="completed",
            records_discovered=len(leads),
            records_inserted=totals["inserted"],
            records_updated=totals["updated"],
            records_skipped=totals["skipped"],
        )
        log.info(
            "colleges_pipeline_done",
            discovered=len(leads),
            inserted=totals["inserted"],
            updated=totals["updated"],
            auto_promoted=totals["auto_promoted"],
            skipped=totals["skipped"],
        )
    except Exception as e:
        finish_scrape_run(run_id, status="failed", error_sample=str(e))
        alert_pipeline_failure("outreach_colleges", str(e))
        raise
