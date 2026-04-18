"""Hunter.io domain email discovery + verification.

Given a list of domains (from business_leads or education_leads without emails),
calls Hunter's domain-search endpoint to retrieve any emails Hunter has seen on
that domain, with confidence and optional person name. Updates the lead in-place.

Hunter.io endpoints used:
  GET /v2/domain-search?domain=X&api_key=Y   — all emails on a domain
  GET /v2/email-verifier?email=X&api_key=Y   — deliverability check

Free tier: 25 searches / month. Paid tier recommended for any real volume.
"""

from __future__ import annotations

import asyncio
from typing import Any

import httpx
import structlog

from src.config import settings

log = structlog.get_logger()

HUNTER_DOMAIN = "https://api.hunter.io/v2/domain-search"
HUNTER_VERIFY = "https://api.hunter.io/v2/email-verifier"
RATE_GAP = 1.0  # seconds between requests — stay polite


async def hunter_domain_search(
    domain: str, client: httpx.AsyncClient
) -> dict[str, Any] | None:
    if not settings.hunter_io_api_key:
        return None
    try:
        r = await client.get(
            HUNTER_DOMAIN,
            params={"domain": domain, "api_key": settings.hunter_io_api_key, "limit": 10},
            timeout=30,
        )
        if r.status_code == 429:
            log.warning("hunter_rate_limited", domain=domain)
            await asyncio.sleep(30)
            return None
        r.raise_for_status()
        return (r.json() or {}).get("data")
    except httpx.HTTPStatusError as e:
        log.warning("hunter_domain_http_error", domain=domain, status=e.response.status_code)
        return None
    except httpx.RequestError as e:
        log.warning("hunter_domain_request_error", domain=domain, error=str(e))
        return None


async def hunter_company_search(
    company: str, client: httpx.AsyncClient
) -> dict[str, Any] | None:
    """Same endpoint but queried by company name — Hunter resolves the domain
    server-side. 1 credit per call. Used when we don't know the domain.
    Returns the full `data` payload (domain, organization, emails[])."""
    if not settings.hunter_io_api_key:
        return None
    try:
        r = await client.get(
            HUNTER_DOMAIN,
            params={
                "company": company,
                "api_key": settings.hunter_io_api_key,
                "limit": 10,
            },
            timeout=30,
        )
        if r.status_code == 429:
            log.warning("hunter_rate_limited", company=company)
            await asyncio.sleep(30)
            return None
        if r.status_code == 404:
            # Hunter doesn't know this company — no domain resolved
            return None
        r.raise_for_status()
        return (r.json() or {}).get("data")
    except httpx.HTTPStatusError as e:
        log.warning("hunter_company_http_error", company=company, status=e.response.status_code)
        return None
    except httpx.RequestError as e:
        log.warning("hunter_company_request_error", company=company, error=str(e))
        return None


async def enrich_by_company_name(
    leads: list[dict[str, Any]],
    credit_budget: int,
) -> list[dict[str, Any]]:
    """For each lead, call Hunter with the company name. Stops when budget hit.
    Returns list of update dicts: {id, domain, website, email, director_emails, raw_merge}.
    Each successful OR unsuccessful call consumes 1 credit."""
    if not settings.hunter_io_api_key:
        log.warning("hunter_skipped_no_key")
        return []

    updates: list[dict[str, Any]] = []
    credits_used = 0

    async with httpx.AsyncClient(timeout=30) as client:
        for lead in leads:
            if credits_used >= credit_budget:
                log.info("hunter_company_budget_reached", used=credits_used)
                break
            name = (lead.get("company_name") or "").strip()
            if not name:
                continue

            data = await hunter_company_search(name, client)
            credits_used += 1

            if not data:
                await asyncio.sleep(RATE_GAP)
                continue

            domain = (data.get("domain") or "").strip().lower()
            emails = data.get("emails") or []
            if not domain and not emails:
                await asyncio.sleep(RATE_GAP)
                continue

            best = _pick_best_email(data)
            director_emails = [
                e.get("value") for e in emails
                if e.get("type") == "personal" and e.get("value")
            ][:5]

            update: dict[str, Any] = {"id": lead["id"]}
            if domain:
                update["domain"] = domain
                update["website"] = f"https://{domain}"
            if best and best.get("value"):
                update["email"] = best["value"]
                update["email_type"] = best.get("type") or "unknown"
            if director_emails:
                update["director_emails"] = director_emails
            update["raw_merge"] = {
                "hunter": {
                    "domain": domain,
                    "organization": data.get("organization"),
                    "pattern": data.get("pattern"),
                    "best_email": best,
                    "total_emails": len(emails),
                }
            }
            updates.append(update)
            if len(updates) % 25 == 0:
                log.info(
                    "hunter_company_progress",
                    credits=credits_used,
                    hits=len(updates),
                    rate=round(len(updates) / max(credits_used, 1), 3),
                )
            await asyncio.sleep(RATE_GAP)

    log.info(
        "hunter_company_done",
        credits_used=credits_used,
        hits=len(updates),
        hit_rate=round(len(updates) / max(credits_used, 1), 3),
    )
    return updates


def _pick_best_email(hunter_data: dict[str, Any]) -> dict[str, Any] | None:
    emails = (hunter_data or {}).get("emails") or []
    if not emails:
        return None
    # Prefer generic + highest confidence
    priority_types = ("generic", "personal")
    best: dict[str, Any] | None = None
    for t in priority_types:
        candidates = [e for e in emails if e.get("type") == t]
        if candidates:
            best = max(candidates, key=lambda e: e.get("confidence") or 0)
            break
    if not best:
        best = max(emails, key=lambda e: e.get("confidence") or 0)
    return best


async def enrich_domains(
    domains: list[str], max_domains: int | None = None
) -> dict[str, dict[str, Any]]:
    """Return {domain: {email, confidence, first_name, last_name, position, type}}."""
    if not settings.hunter_io_api_key:
        log.warning("hunter_skipped_no_key")
        return {}

    results: dict[str, dict[str, Any]] = {}
    unique = list(dict.fromkeys(d for d in domains if d))
    if max_domains:
        unique = unique[:max_domains]

    async with httpx.AsyncClient(timeout=30) as client:
        for d in unique:
            data = await hunter_domain_search(d, client)
            if not data:
                await asyncio.sleep(RATE_GAP)
                continue
            best = _pick_best_email(data)
            if best:
                results[d] = {
                    "email": best.get("value"),
                    "confidence": best.get("confidence"),
                    "first_name": best.get("first_name"),
                    "last_name": best.get("last_name"),
                    "position": best.get("position"),
                    "type": best.get("type"),
                    "pattern": (data or {}).get("pattern"),
                    "organization": (data or {}).get("organization"),
                }
            await asyncio.sleep(RATE_GAP)

    log.info("hunter_enrichment_done", input=len(unique), emails_found=len(results))
    return results


async def verify_email(email: str) -> dict[str, Any] | None:
    if not settings.hunter_io_api_key:
        return None
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.get(
                HUNTER_VERIFY,
                params={"email": email, "api_key": settings.hunter_io_api_key},
            )
            if r.status_code == 429:
                return None
            r.raise_for_status()
            return (r.json() or {}).get("data")
    except httpx.HTTPError:
        return None
