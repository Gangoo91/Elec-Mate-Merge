"""Apollo.io scraper — UK electrical industry coverage across all audience tiers.

Design:
  - Tiered scraping (directors, supervisors, electricians, apprentices, accredited)
  - Incremental DB saves every 50 enrichments (no data loss on crash)
  - Tag routing per tier so the admin page segments cleanly
  - Budget-aware: each tier has its own max_credits cap
"""

from __future__ import annotations

import asyncio
import os
from typing import Any

import httpx
import structlog

from src.scrapers.outreach.shared import (
    classify_uk_country,
    extract_postcode,
    normalise_domain,
)

log = structlog.get_logger()

APOLLO_BASE = "https://api.apollo.io/api/v1"
# Save every N enrichments so a crash loses ≤ N
INCREMENTAL_SAVE_BATCH = 50


def _auth_headers() -> dict[str, str]:
    key = os.environ.get("APOLLO_API_KEY") or "r_YtiMxZYfdAainZpYSDfw"
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Api-Key": key,
    }


# ═══════════════════════════════════════════════════════════════
# TIER CONFIGURATIONS
# ═══════════════════════════════════════════════════════════════

ELECTRICAL_KEYWORDS = [
    "electrical contractor", "electrician", "electrical installation",
    "electrical services", "electrical engineering", "solar PV",
    "EV charging", "commercial electrician", "M&E contractor",
    "industrial electrician", "fire alarm", "data cabling",
    "electrical testing", "electrical maintenance", "lighting design",
    "domestic electrician", "emergency electrician", "rewire",
    "EICR testing", "PAT testing", "electrical compliance",
    "electrical apprenticeship", "solar panel installer",
    "smart home installer", "security systems",
    "electrical subcontractor", "building services electrical",
]

SUPERVISOR_TITLES = [
    "Electrical Supervisor", "Site Supervisor", "Electrical Foreman",
    "Site Foreman", "Works Supervisor", "Installation Supervisor",
    "Maintenance Supervisor", "Project Supervisor", "Shift Supervisor",
    "Technical Supervisor", "Works Manager", "Project Manager",
    "Contracts Manager", "Operations Manager", "Estimating Manager",
    "Qualifying Supervisor", "Principal Electrician",
    "Charge Hand", "Team Leader", "Lead Electrician",
]

ELECTRICIAN_TITLES = [
    "Electrician", "Senior Electrician", "Approved Electrician",
    "Technician Electrician", "Test and Inspection Engineer",
    "Commercial Electrician", "Industrial Electrician",
    "Maintenance Electrician", "Site Electrician",
    "Installation Electrician", "Domestic Electrician",
    "Service Electrician", "Electrical Technician",
    "Control Panel Builder", "Electrical Installer",
    "Field Service Electrician",
]

ELECTRICAL_ENGINEER_TITLES = [
    "Electrical Engineer", "Senior Electrical Engineer",
    "Principal Electrical Engineer", "Lead Electrical Engineer",
    "Chartered Electrical Engineer", "Electrical Design Engineer",
    "Electrical Project Engineer", "Electrical Systems Engineer",
    "Junior Electrical Engineer", "Graduate Electrical Engineer",
    "Electrical Engineering Manager", "Head of Electrical Engineering",
    "HV Electrical Engineer", "LV Electrical Engineer",
    "Power Engineer", "Power Systems Engineer",
]

BUILDING_SERVICES_TITLES = [
    "Building Services Engineer", "Senior Building Services Engineer",
    "Building Services Design Engineer", "M&E Engineer", "MEP Engineer",
    "Mechanical and Electrical Engineer", "M&E Design Engineer",
    "Building Services Manager", "MEP Project Manager",
    "Building Services Project Manager", "Mechanical Electrical Consultant",
    "Building Services Consultant", "MEP Consultant",
]

FIELD_MAINTENANCE_TITLES = [
    "Maintenance Engineer", "Senior Maintenance Engineer",
    "Maintenance Electrician", "Field Service Engineer",
    "Field Engineer", "Control Systems Engineer",
    "Instrumentation and Controls Engineer", "Industrial Electrician",
    "Maintenance Technician", "Electrical Maintenance Technician",
    "Plant Electrician", "Site Service Engineer",
    "Building Engineer", "Facilities Engineer", "Facilities Electrician",
]

ESTIMATOR_CONTRACTS_TITLES = [
    "Electrical Estimator", "Senior Estimator", "Estimating Manager",
    "Contracts Manager", "Electrical Contracts Manager",
    "Senior Contracts Manager", "Project Engineer Electrical",
    "Construction Manager Electrical", "Electrical Project Coordinator",
    "Bid Manager Electrical", "Commercial Manager Electrical",
    "Pre-Construction Manager", "Quantity Surveyor Electrical",
]

APPRENTICE_TITLES = [
    "Apprentice Electrician", "Electrical Apprentice",
    "Trainee Electrician", "Electrical Improver",
    "Electrician's Mate", "Graduate Electrical Engineer",
    "Junior Electrician", "Apprentice Installer",
    "Electrical Trainee",
]

ACCREDITATION_KEYWORDS = [
    "NICEIC Approved", "NAPIT Registered", "ECA Member",
    "JIB Approved", "18th Edition Qualified", "Part P",
    "SELECT Member", "Competent Person", "Trustmark",
    "BS 7671", "NICEIC Contractor", "NAPIT Electrician",
]

# ─── Education tier title lists ─────────────────────────────────
HEAD_OF_ELECTRICAL_TITLES = [
    "Head of Electrical", "Head of Electrical Engineering",
    "Head of Department Electrical", "Curriculum Lead Electrical",
    "Electrical Curriculum Manager", "Dean of Engineering",
    "Head of Engineering and Construction", "Head of Construction",
    "Deputy Head of Engineering", "Director of Engineering",
    "Faculty Head Engineering", "Programme Manager Electrical",
]

ELECTRICAL_TUTOR_TITLES = [
    "Electrical Tutor", "Electrical Lecturer", "Lecturer Electrical",
    "Electrical Trainer", "Electrical Instructor", "Electrical Teacher",
    "Lecturer in Electrical Installation", "Senior Electrical Lecturer",
    "Electrical Skills Tutor", "Lecturer Electrical Installation",
    "Electrical Installations Lecturer", "Electrotechnical Tutor",
    "Electrotechnical Lecturer", "Electrical Lecturer Technical",
]

APPRENTICESHIP_TITLES = [
    "Apprenticeship Coordinator", "Apprenticeship Manager",
    "Apprenticeship Development Manager", "Apprenticeship Tutor",
    "Work Based Learning Tutor", "Work Based Learning Coordinator",
    "Training Coordinator", "Training Manager Electrical",
    "Skills Coach", "Learning Mentor Electrical",
]

ASSESSOR_TITLES = [
    "Electrical Assessor", "Internal Quality Assurer",
    "IQA Electrical", "EPA Assessor", "End Point Assessor",
    "EPA Lead Electrical", "Quality Assurer Electrical",
    "Verifier Electrical", "Electrical Verifier",
    "Assessor Electrical Installation",
]

# Organisations we consider education (for q_organization_keyword_tags)
EDUCATION_ORG_KEYWORDS = [
    "college", "further education", "apprenticeship training provider",
    "training academy", "training centre", "electrical training",
    "skills academy", "vocational training", "trade academy",
    "technical college", "electrical apprenticeship training",
]


TIER_CONFIGS: dict[str, dict[str, Any]] = {
    "directors": {
        "source": "apollo_directors",
        "filter_type": "seniority",
        "seniorities": ["owner", "founder", "c_suite", "director", "vp", "partner", "head"],
        "keywords": ELECTRICAL_KEYWORDS,
        "extra_tags": ["decision_maker", "director"],
        "pool": "business_pool",
        "max_credits": 2500,
    },
    "supervisors": {
        "source": "apollo_supervisors",
        "filter_type": "title",
        "titles": SUPERVISOR_TITLES,
        "keywords": ["electrical", "electrician"],
        "extra_tags": ["supervisor"],
        "pool": "business_pool",
        "max_credits": 2500,
    },
    "electricians": {
        "source": "apollo_electricians",
        "filter_type": "title",
        "titles": ELECTRICIAN_TITLES,
        "keywords": [],  # titles alone are specific enough
        "extra_tags": ["electrician"],
        "pool": "business_pool",
        "max_credits": 4000,
    },
    "apprentices": {
        "source": "apollo_apprentices",
        "filter_type": "title",
        "titles": APPRENTICE_TITLES,
        "keywords": [],
        "extra_tags": ["apprentice", "electrician_apprentice"],
        "pool": "apprentice_pool",
        "max_credits": 2000,
    },
    "electrical_engineers": {
        "source": "apollo_electrical_engineers",
        "filter_type": "title",
        "titles": ELECTRICAL_ENGINEER_TITLES,
        "keywords": [],
        "extra_tags": ["electrical_engineer"],
        "pool": "business_pool",
        "max_credits": 4000,
    },
    "building_services": {
        "source": "apollo_building_services",
        "filter_type": "title",
        "titles": BUILDING_SERVICES_TITLES,
        "keywords": [],
        "extra_tags": ["building_services", "m_and_e"],
        "pool": "business_pool",
        "max_credits": 3000,
    },
    "field_maintenance": {
        "source": "apollo_field_maintenance",
        "filter_type": "title",
        "titles": FIELD_MAINTENANCE_TITLES,
        "keywords": [],
        "extra_tags": ["maintenance_engineer", "field_engineer"],
        "pool": "business_pool",
        "max_credits": 3000,
    },
    "estimators_contracts": {
        "source": "apollo_estimators_contracts",
        "filter_type": "title",
        "titles": ESTIMATOR_CONTRACTS_TITLES,
        "keywords": ["electrical"],
        "extra_tags": ["estimator", "contracts_manager"],
        "pool": "business_pool",
        "max_credits": 2000,
    },
    "electricians_accredited": {
        "source": "apollo_electricians_accredited",
        "filter_type": "title",
        "titles": ELECTRICIAN_TITLES + SUPERVISOR_TITLES,
        "keywords": [
            "NICEIC", "NAPIT", "ECA", "JIB Approved", "18th Edition",
            "Part P", "SELECT", "Trustmark", "Approved Contractor",
            "Competent Person", "BS 7671", "EICR",
        ],
        "extra_tags": ["electrician", "accredited_electrician"],
        "pool": "business_pool",
        "max_credits": 8000,
    },
    "accredited": {
        "source": "apollo_accredited",
        "filter_type": "keyword",
        "keywords": ACCREDITATION_KEYWORDS,
        "seniorities": ["owner", "founder", "director", "c_suite", "manager", "head"],
        "extra_tags": ["accredited_electrician"],
        "pool": "business_pool",
        "max_credits": 2500,
    },
    "geo_drill": {
        "source": "apollo_geo",
        "filter_type": "location",
        "keywords": ["electrician", "electrical contractor"],
        "locations_to_drill": [
            "London", "Manchester", "Birmingham", "Leeds", "Liverpool",
            "Glasgow", "Edinburgh", "Bristol", "Cardiff", "Belfast",
            "Newcastle", "Sheffield", "Nottingham", "Southampton",
        ],
        "extra_tags": ["geo_drill"],
        "pool": "business_pool",
        "max_credits": 2500,
    },

    # ─── EDUCATION TIERS ───────────────────────────────────
    "college_heads": {
        "source": "apollo_college_heads",
        "filter_type": "title",
        "titles": HEAD_OF_ELECTRICAL_TITLES,
        "keywords": EDUCATION_ORG_KEYWORDS,
        "extra_tags": ["college_head", "decision_maker", "education"],
        "pool": "education_pool",
        "target_table": "education_leads",
        "organisation_type": "fe_college",
        "max_credits": 1200,
    },
    "electrical_tutors": {
        "source": "apollo_electrical_tutors",
        "filter_type": "title",
        "titles": ELECTRICAL_TUTOR_TITLES,
        "keywords": [],  # titles are specific enough
        "extra_tags": ["tutor", "education"],
        "pool": "education_pool",
        "target_table": "education_leads",
        "organisation_type": "fe_college",
        "max_credits": 2000,
    },
    "apprenticeship_coords": {
        "source": "apollo_apprenticeship_coords",
        "filter_type": "title",
        "titles": APPRENTICESHIP_TITLES,
        "keywords": ["electrical", "electrician", "construction"],
        "extra_tags": ["apprenticeship_coordinator", "education"],
        "pool": "education_pool",
        "target_table": "education_leads",
        "organisation_type": "fe_college",
        "max_credits": 1200,
    },
    "assessors": {
        "source": "apollo_assessors",
        "filter_type": "title",
        "titles": ASSESSOR_TITLES,
        "keywords": [],
        "extra_tags": ["assessor", "iqa", "education"],
        "pool": "education_pool",
        "target_table": "education_leads",
        "organisation_type": "fe_college",
        "max_credits": 600,
    },
    "training_provider_directors": {
        "source": "apollo_training_provider_directors",
        "filter_type": "seniority",
        "seniorities": ["owner", "founder", "director", "c_suite", "head"],
        "keywords": [
            "apprenticeship training provider", "electrical training provider",
            "training academy", "training centre", "skills academy",
            "vocational training", "JTL", "NET training",
        ],
        "extra_tags": ["training_provider", "education", "decision_maker"],
        "pool": "education_pool",
        "target_table": "education_leads",
        "organisation_type": "private_training_provider",
        "max_credits": 1000,
    },
}


# ═══════════════════════════════════════════════════════════════
# Apollo HTTP calls
# ═══════════════════════════════════════════════════════════════

async def _search_people(
    client: httpx.AsyncClient,
    *,
    keyword: str | None = None,
    titles: list[str] | None = None,
    seniorities: list[str] | None = None,
    person_location: str | None = None,
    page: int = 1,
    per_page: int = 100,
) -> list[dict[str, Any]]:
    payload: dict[str, Any] = {
        "organization_locations": ["United Kingdom"],
        "contact_email_status": ["verified"],
        "page": page,
        "per_page": per_page,
    }
    if keyword:
        payload["q_keywords"] = keyword
    if titles:
        payload["person_titles"] = titles
    if seniorities:
        payload["person_seniorities"] = seniorities
    if person_location:
        # override UK-wide with specific UK city/region
        payload["organization_locations"] = [f"{person_location}, United Kingdom"]

    try:
        r = await client.post(
            f"{APOLLO_BASE}/mixed_people/api_search",
            json=payload,
            headers=_auth_headers(),
            timeout=30,
        )
        if r.status_code != 200:
            log.warning("apollo_search_http_error", status=r.status_code, body=r.text[:160])
            return []
        d = r.json() or {}
        return d.get("people") or []
    except Exception as e:
        log.warning("apollo_search_failed", error=str(e))
        return []


async def _enrich_person(
    client: httpx.AsyncClient, person_id: str
) -> dict[str, Any] | None:
    try:
        r = await client.post(
            f"{APOLLO_BASE}/people/match",
            json={"id": person_id, "reveal_personal_emails": True},
            headers=_auth_headers(),
            timeout=30,
        )
        if r.status_code != 200:
            return None
        return (r.json() or {}).get("person")
    except Exception as e:
        log.warning("apollo_enrich_failed", id=person_id, error=str(e))
        return None


def _person_to_lead(p: dict[str, Any], tier_config: dict[str, Any]) -> dict[str, Any] | None:
    email = p.get("email")
    if not email or email == "email_not_unlocked@domain.com":
        return None
    if p.get("email_status") == "unavailable":
        return None

    org = p.get("organization") or {}
    org_name = org.get("name") or "Unknown"
    full_name = p.get("name") or " ".join(
        filter(None, [p.get("first_name"), p.get("last_name")])
    ).strip() or None

    postcode = extract_postcode(
        " ".join(filter(None, [
            p.get("street_address") or "",
            p.get("city") or "",
            str(p.get("postal_code") or ""),
        ]))
    )
    city = p.get("city") or org.get("city")

    website = org.get("website_url") or org.get("primary_domain")
    if website and not website.startswith("http"):
        website = f"https://{website}"

    title_lc = (p.get("title") or "").lower()
    accreditations_detected: list[str] = list(tier_config.get("extra_tags") or [])

    if "niceic" in title_lc or "niceic" in org_name.lower():
        accreditations_detected.append("niceic")
    if "napit" in title_lc or "napit" in org_name.lower():
        accreditations_detected.append("napit")
    if "eca" in title_lc:
        accreditations_detected.append("eca")
    if "jib" in title_lc:
        accreditations_detected.append("jib_approved")
    if "18th edition" in title_lc:
        accreditations_detected.append("18th_edition")
    if "part p" in title_lc:
        accreditations_detected.append("part_p")

    target_table = tier_config.get("target_table", "business_leads")

    # Education leads have a different schema — shape accordingly
    if target_table == "education_leads":
        return {
            "__target_table__": "education_leads",
            "source": tier_config["source"],
            "source_url": p.get("linkedin_url"),
            "source_id": f"apollo:{p.get('id')}",
            "organisation": org_name,
            "organisation_type": tier_config.get("organisation_type", "fe_college"),
            "name": full_name,
            "role": p.get("title"),
            "email": email.lower().strip(),
            "email_type": "tutor" if "tutor" in title_lc or "lecturer" in title_lc else "staff",
            "website": website,
            "phone": p.get("sanitized_phone") or p.get("phone_number"),
            "city": city,
            "postcode": postcode,
            "country": classify_uk_country(postcode, city),
            "offers_electrical_level_3": True,
            "specialisms": list(dict.fromkeys(accreditations_detected)),
            "raw_data": {
                "tier": tier_config["source"],
                "pool": tier_config["pool"],
                "apollo_id": p.get("id"),
                "title": p.get("title"),
                "linkedin_url": p.get("linkedin_url"),
                "org_id": org.get("id"),
                "org_industry": org.get("industry"),
            },
            "confidence_score": 95 if p.get("email_status") == "verified" else 80,
        }

    # Default: business_leads shape
    return {
        "__target_table__": "business_leads",
        "source": tier_config["source"],
        "source_url": p.get("linkedin_url"),
        "source_id": f"apollo:{p.get('id')}",
        "company_name": org_name,
        "email": email.lower().strip(),
        "email_type": tier_config["source"].replace("apollo_", ""),
        "website": website,
        "phone": p.get("sanitized_phone") or p.get("phone_number"),
        "city": city,
        "postcode": postcode,
        "country": classify_uk_country(postcode, city),
        "director_names": [full_name] if full_name else [],
        "employee_estimate": str(org.get("estimated_num_employees") or "") or None,
        "accreditations": list(dict.fromkeys(accreditations_detected)),
        "raw_data": {
            "tier": tier_config["source"],
            "pool": tier_config["pool"],
            "apollo_id": p.get("id"),
            "title": p.get("title"),
            "linkedin_url": p.get("linkedin_url"),
            "org_id": org.get("id"),
            "org_industry": org.get("industry"),
            "org_employees": org.get("estimated_num_employees"),
            "org_revenue": org.get("organization_revenue_printed"),
        },
        "confidence_score": 95 if p.get("email_status") == "verified" else 80,
    }


# ═══════════════════════════════════════════════════════════════
# Tier runner
# ═══════════════════════════════════════════════════════════════

async def _collect_candidates_for_tier(
    client: httpx.AsyncClient, tier_name: str, max_needed: int
) -> list[dict[str, Any]]:
    """Phase 1 — search Apollo per-tier strategy to gather unique candidates."""
    cfg = TIER_CONFIGS[tier_name]
    seen: set[str] = set()
    candidates: list[dict[str, Any]] = []

    filter_type = cfg["filter_type"]
    pages_per_query = 5  # Apollo caps search at ~500 per query

    if filter_type == "seniority":
        # Each (keyword × seniority-group) combo
        keywords = cfg["keywords"]
        seniorities = cfg["seniorities"]
        # Split seniorities into groups of 3 for variation
        groups = [seniorities[i : i + 3] for i in range(0, len(seniorities), 3)]
        combos = [(kw, g) for kw in keywords for g in groups]
        for kw, group in combos:
            for page in range(1, pages_per_query + 1):
                people = await _search_people(
                    client, keyword=kw, seniorities=group, page=page
                )
                if not people:
                    break
                for p in people:
                    pid = p.get("id")
                    if pid and pid not in seen:
                        seen.add(pid)
                        candidates.append(p)
                await asyncio.sleep(0.25)
            if len(candidates) >= max_needed:
                break
            if len(candidates) >= max_needed:
                break

    elif filter_type == "title":
        # Chunk titles into groups of 5 (Apollo's person_titles accepts arrays)
        titles = cfg["titles"]
        keyword_opts = cfg.get("keywords") or [None]
        title_groups = [titles[i : i + 5] for i in range(0, len(titles), 5)]
        for kw in keyword_opts:
            for tg in title_groups:
                for page in range(1, pages_per_query + 1):
                    people = await _search_people(
                        client,
                        keyword=kw,
                        titles=tg,
                        page=page,
                    )
                    if not people:
                        break
                    for p in people:
                        pid = p.get("id")
                        if pid and pid not in seen:
                            seen.add(pid)
                            candidates.append(p)
                    await asyncio.sleep(0.25)
                if len(candidates) >= max_needed:
                    break
            if len(candidates) >= max_needed:
                break

    elif filter_type == "keyword":
        # Accreditation keywords — combine with loose seniority
        keywords = cfg["keywords"]
        seniorities = cfg.get("seniorities") or ["owner", "director", "c_suite"]
        for kw in keywords:
            for page in range(1, pages_per_query + 1):
                people = await _search_people(
                    client, keyword=kw, seniorities=seniorities, page=page
                )
                if not people:
                    break
                for p in people:
                    pid = p.get("id")
                    if pid and pid not in seen:
                        seen.add(pid)
                        candidates.append(p)
                await asyncio.sleep(0.25)
            if len(candidates) >= max_needed:
                break

    elif filter_type == "location":
        # Iterate UK cities × core keywords
        locations = cfg["locations_to_drill"]
        keywords = cfg.get("keywords") or ["electrician"]
        for city in locations:
            for kw in keywords:
                for page in range(1, pages_per_query + 1):
                    people = await _search_people(
                        client, keyword=kw, person_location=city, page=page
                    )
                    if not people:
                        break
                    for p in people:
                        pid = p.get("id")
                        if pid and pid not in seen:
                            seen.add(pid)
                            candidates.append(p)
                    await asyncio.sleep(0.25)
                if len(candidates) >= max_needed:
                    break
            if len(candidates) >= max_needed:
                break

    log.info(
        f"apollo_tier_{tier_name}_search_done",
        candidates=len(candidates),
        target=max_needed,
    )
    return candidates


async def _enrich_and_save(
    client: httpx.AsyncClient,
    candidates: list[dict[str, Any]],
    tier_config: dict[str, Any],
    max_credits: int,
    already_enriched_ids: set[str],
) -> int:
    """Phase 2 — enrich each person (1 credit), flush to DB every N hits."""
    from src.db.supabase_client import upsert_business_leads, upsert_education_leads

    buffer: list[dict[str, Any]] = []
    spent = 0
    saved = 0
    target_table = tier_config.get("target_table", "business_leads")

    def _flush(rows: list[dict[str, Any]]) -> int:
        # Strip the internal routing marker before DB write
        clean = [{k: v for k, v in r.items() if not k.startswith("__")} for r in rows]
        if target_table == "education_leads":
            totals = upsert_education_leads(clean)
        else:
            totals = upsert_business_leads(clean)
        return totals.get("inserted", 0) + totals.get("updated", 0)

    for i, cand in enumerate(candidates, 1):
        if spent >= max_credits:
            break
        pid = cand.get("id")
        if pid and pid in already_enriched_ids:
            continue
        full = await _enrich_person(client, pid)
        spent += 1
        if pid:
            already_enriched_ids.add(pid)
        if full:
            lead = _person_to_lead(full, tier_config)
            if lead:
                buffer.append(lead)
        if len(buffer) >= INCREMENTAL_SAVE_BATCH:
            saved += _flush(buffer)
            log.info(
                f"apollo_tier_{tier_config['source']}_flush",
                flushed=len(buffer),
                saved=saved,
                spent=spent,
                table=target_table,
            )
            buffer = []
        if i % 100 == 0:
            log.info(
                f"apollo_tier_{tier_config['source']}_enrich_progress",
                done=i,
                spent=spent,
                saved=saved,
                budget=max_credits,
            )
        await asyncio.sleep(0.15)

    if buffer:
        saved += _flush(buffer)

    log.info(
        f"apollo_tier_{tier_config['source']}_done",
        credits_spent=spent,
        saved=saved,
        hit_rate=f"{(saved / spent * 100):.1f}%" if spent else "0%",
    )
    return saved


# ═══════════════════════════════════════════════════════════════
# Public entry points
# ═══════════════════════════════════════════════════════════════

# Shared across runs within a single process so we don't waste credits
# re-enriching the same person-id if they appeared in multiple tiers.
_SESSION_ENRICHED_IDS: set[str] = set()


async def scrape_apollo_tier(tier_name: str, max_credits: int | None = None) -> int:
    """Run a single tier. Returns count saved. Incremental DB writes — crash-safe."""
    if tier_name not in TIER_CONFIGS:
        raise ValueError(f"Unknown tier: {tier_name}")
    cfg = TIER_CONFIGS[tier_name]
    budget = max_credits if max_credits is not None else cfg["max_credits"]

    log.info(f"apollo_tier_{tier_name}_start", budget=budget)
    async with httpx.AsyncClient(http2=False) as client:
        candidates = await _collect_candidates_for_tier(client, tier_name, budget * 2)
        saved = await _enrich_and_save(
            client, candidates, cfg, budget, _SESSION_ENRICHED_IDS
        )
    return saved


# ─── Back-compat: keep the old `scrape_apollo` name ────────────
async def scrape_apollo(max_credits: int = 3500, **_: Any) -> list[dict[str, Any]]:
    """Back-compat shim — runs the 'directors' tier with incremental saves.
    Returns an empty list because saves are incremental inside the tier runner."""
    await scrape_apollo_tier("directors", max_credits=max_credits)
    return []


async def scrape_apollo_bulk_orgs(max_credits: int = 4000, **_: Any) -> list[dict[str, Any]]:
    """Deprecated shim — now runs the 'geo_drill' tier instead."""
    await scrape_apollo_tier("geo_drill", max_credits=max_credits)
    return []
