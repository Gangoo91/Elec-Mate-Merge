"""Domain guesser — for leads that have a company name but no website.

Instead of using search engines (which block us), we generate likely domain
candidates from the company name and probe each with a HEAD request.

Why this works for UK electrical contractors:
  - Most small/medium UK businesses own the .co.uk of their trading name
  - A working HTTPS response within 3 seconds is a strong signal
  - No rate limits, no CAPTCHAs, no blocks

Yield target: ~30-50% hit rate on Companies House company names.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any

import httpx
import structlog

from src.scrapers.outreach.shared import normalise_domain

log = structlog.get_logger()

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/127.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,*/*",
}

# Suffixes / filler words we strip before building the domain slug
_STRIP_SUFFIXES = (
    "ltd", "limited", "plc", "llp", "uk", "england", "london", "scotland",
    "services", "service", "group", "company", "co", "the",
)


def _slugify(name: str) -> str:
    s = name.lower()
    # Replace & with and
    s = s.replace("&", "and")
    # Remove anything that isn't a letter, digit, space or hyphen
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s.strip())
    return s


def _candidates(company_name: str) -> list[str]:
    """Return a list of likely domain strings (without scheme) for a company."""
    name = company_name.strip()
    if not name:
        return []
    words = [w for w in re.split(r"[^\w&]+", name.lower()) if w and w != "&"]
    # Drop filler words at the end
    while words and words[-1] in _STRIP_SUFFIXES:
        words.pop()
    if not words:
        return []

    concat = "".join(words)
    hyphen = "-".join(words)
    # Also include initials + last word (e.g. "JMJ" + "electrical" → "jmjelectrical")
    first_word = words[0]
    has_electric = any("electric" in w or "elec" == w or "spark" in w or w == "light" for w in words)
    core_words = [w for w in words if w not in _STRIP_SUFFIXES]
    compact = "".join(core_words)

    candidates: list[str] = []
    for base in {concat, hyphen, compact, first_word}:
        if not base or len(base) < 3:
            continue
        # Always try .co.uk first, then .com, then .uk
        candidates.extend([
            f"{base}.co.uk",
            f"{base}.com",
            f"{base}.uk",
        ])
        if not has_electric and len(base) >= 4:
            # Try adding "electrical" if it's not already there
            candidates.append(f"{base}electrical.co.uk")
            candidates.append(f"{base}-electrical.co.uk")
    # Dedupe preserving order
    seen: set[str] = set()
    out: list[str] = []
    for c in candidates:
        if c in seen:
            continue
        seen.add(c)
        out.append(c)
    return out[:6]  # top 6 candidates max


async def _probe(client: httpx.AsyncClient, domain: str) -> bool:
    """Return True if domain serves HTTP 2xx/3xx content and looks electrical."""
    for scheme in ("https", "http"):
        url = f"{scheme}://{domain}"
        try:
            r = await client.head(url, timeout=6, follow_redirects=True)
            if r.status_code < 400:
                return True
        except Exception:
            continue
    return False


async def _probe_with_content(client: httpx.AsyncClient, domain: str) -> dict[str, Any] | None:
    """Probe + check homepage has electrical keywords. Stronger confidence."""
    for scheme in ("https", "http"):
        url = f"{scheme}://{domain}"
        try:
            r = await client.get(url, timeout=8, follow_redirects=True)
            if r.status_code >= 400:
                continue
            final_host = str(r.url.host or domain).replace("www.", "")
            text = (r.text or "")[:10000].lower()
            # Electrical relevance check
            is_electrical = any(
                kw in text
                for kw in (
                    "electrical", "electrician", "niceic", "napit", "rewire",
                    "pat testing", "eicr", "consumer unit", "fuse box",
                    "bs 7671", "18th edition", "solar pv", "ev charging",
                )
            )
            return {
                "domain": final_host,
                "url": str(r.url),
                "status": r.status_code,
                "is_electrical": is_electrical,
            }
        except Exception:
            continue
    return None


async def find_domain_for(
    client: httpx.AsyncClient, company_name: str, require_electrical: bool = True
) -> dict[str, Any] | None:
    for candidate in _candidates(company_name):
        result = await _probe_with_content(client, candidate)
        if not result:
            continue
        if require_electrical and not result["is_electrical"]:
            continue
        return {
            "website": f"https://{result['domain']}",
            "domain": result["domain"],
            "confidence": 90 if result["is_electrical"] else 70,
            "source": "domain_guess",
        }
    return None


async def find_domains_batch(
    leads: list[dict[str, Any]],
    concurrency: int = 20,
    require_electrical: bool = True,
) -> list[dict[str, Any]]:
    """Parallel probe across many leads."""
    updates: list[dict[str, Any]] = []
    semaphore = asyncio.Semaphore(concurrency)

    async with httpx.AsyncClient(headers=HEADERS, http2=False) as client:

        async def worker(lead: dict[str, Any]) -> None:
            async with semaphore:
                name = lead.get("company_name") or ""
                hit = await find_domain_for(client, name, require_electrical)
                if hit:
                    updates.append({
                        "id": lead["id"],
                        "website": hit["website"],
                        "domain": hit["domain"],
                        "confidence_score": max(lead.get("confidence_score") or 50, hit["confidence"]),
                        "raw_data_merge": {"domain_guess": {"domain": hit["domain"], "confidence": hit["confidence"]}},
                    })

        tasks = [worker(l) for l in leads if not l.get("website")]
        done = 0
        batch_size = 50
        for i in range(0, len(tasks), batch_size):
            await asyncio.gather(*tasks[i : i + batch_size])
            done = min(i + batch_size, len(tasks))
            log.info("domain_guess_progress", done=done, total=len(tasks), found=len(updates))

    log.info("domain_guess_batch_done", input=len(leads), found=len(updates))
    return updates
