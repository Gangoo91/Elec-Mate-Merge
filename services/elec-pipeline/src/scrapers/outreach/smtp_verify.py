"""SMTP-based email pattern verifier.

Given a business_lead with a named director + domain but no email, generate
common email patterns and verify them via SMTP handshake (RCPT TO probe).
Saves any verified email back to the lead.

Pattern list (in priority order):
  firstname.lastname@domain
  firstname@domain
  f.lastname@domain
  firstname_lastname@domain
  lastname@domain
  firstnamelastname@domain
  f.l@domain
  info@domain
  enquiries@domain

Technique:
  1. MX lookup via dnspython
  2. Connect to MX host on port 25
  3. HELO / EHLO
  4. MAIL FROM:<verify@elec-mate.com>
  5. RCPT TO:<candidate@domain> → 250 = valid, 550 = invalid

Catch:
  - Many mail servers accept all and reject later (catch-all). We mark these as
    "ambiguous" and store the most-likely pattern anyway.
  - Throttle per domain to avoid blacklisting.
"""

from __future__ import annotations

import asyncio
import re
import socket
from typing import Any

import dns.resolver  # type: ignore
import structlog

from src.scrapers.outreach.shared import normalise_domain

log = structlog.get_logger()

FROM_ADDR = "verify@elec-mate.com"
HELO_HOST = "elec-mate.com"
SMTP_TIMEOUT = 10


def _normalise_name(name: str) -> tuple[str, str]:
    parts = [p for p in re.split(r"\s+", (name or "").strip()) if p]
    if not parts:
        return "", ""
    first = re.sub(r"[^a-z]", "", parts[0].lower())
    last = re.sub(r"[^a-z]", "", parts[-1].lower()) if len(parts) > 1 else ""
    return first, last


def generate_patterns(full_name: str, domain: str) -> list[str]:
    first, last = _normalise_name(full_name)
    if not first:
        return [f"info@{domain}", f"enquiries@{domain}"]
    out: list[str] = []
    if last:
        out += [
            f"{first}.{last}@{domain}",
            f"{first}@{domain}",
            f"{first[0]}.{last}@{domain}",
            f"{first}_{last}@{domain}",
            f"{last}@{domain}",
            f"{first}{last}@{domain}",
            f"{first[0]}{last}@{domain}",
        ]
    else:
        out.append(f"{first}@{domain}")
    out += [f"info@{domain}", f"enquiries@{domain}"]
    # Dedupe preserving order
    seen: set[str] = set()
    deduped = []
    for e in out:
        if e not in seen:
            seen.add(e)
            deduped.append(e)
    return deduped


async def _mx_lookup(domain: str) -> list[str]:
    try:
        answers = await asyncio.get_event_loop().run_in_executor(
            None, lambda: dns.resolver.resolve(domain, "MX")
        )
        return [str(r.exchange).rstrip(".") for r in sorted(answers, key=lambda r: r.preference)]
    except Exception:
        return []


async def _smtp_probe(mx: str, addr: str) -> str:
    """Return 'valid' | 'invalid' | 'ambiguous' | 'error'."""
    def sync_probe() -> str:
        try:
            with socket.create_connection((mx, 25), timeout=SMTP_TIMEOUT) as sock:
                sock.settimeout(SMTP_TIMEOUT)
                def recv() -> str:
                    buf = b""
                    while True:
                        chunk = sock.recv(4096)
                        if not chunk:
                            break
                        buf += chunk
                        if b"\r\n" in buf and (b" " in buf[-10:] or len(buf) > 1024):
                            break
                    return buf.decode(errors="ignore")
                banner = recv()
                if not banner.startswith("2"):
                    return "error"
                sock.sendall(f"EHLO {HELO_HOST}\r\n".encode())
                if not recv().startswith("2"):
                    return "error"
                sock.sendall(f"MAIL FROM:<{FROM_ADDR}>\r\n".encode())
                if not recv().startswith("2"):
                    return "error"
                sock.sendall(f"RCPT TO:<{addr}>\r\n".encode())
                resp = recv()
                if resp.startswith("2"):
                    # Many catch-alls say yes to anything — flag ambiguous if we can
                    return "valid"
                if resp.startswith("5"):
                    return "invalid"
                return "ambiguous"
        except Exception:
            return "error"

    return await asyncio.get_event_loop().run_in_executor(None, sync_probe)


async def _is_catch_all(mx: str, domain: str) -> bool:
    bogus = f"definitely-not-real-{abs(hash(domain)) & 0xffff}@{domain}"
    r = await _smtp_probe(mx, bogus)
    return r == "valid"


async def verify_best_pattern(full_name: str, domain: str) -> dict[str, Any] | None:
    """Return the first pattern that verifies, or None."""
    domain = normalise_domain(domain) or domain
    if not domain or "." not in domain:
        return None
    mxs = await _mx_lookup(domain)
    if not mxs:
        return None
    mx = mxs[0]
    try:
        catch_all = await _is_catch_all(mx, domain)
    except Exception:
        catch_all = False

    patterns = generate_patterns(full_name, domain)
    for pattern in patterns:
        status = await _smtp_probe(mx, pattern)
        if status == "valid":
            return {
                "email": pattern,
                "pattern": pattern.split("@")[0],
                "mx": mx,
                "ambiguous": catch_all,
                "confidence": 60 if catch_all else 90,
            }
        if status == "error":
            # Server rejected us; stop trying more to avoid blacklist
            break
        await asyncio.sleep(0.3)
    return None


async def verify_batch(
    leads: list[dict[str, Any]], domain_throttle: float = 2.0
) -> list[dict[str, Any]]:
    """For each lead (must have director_names[0] + domain/website), try to find an email."""
    results: list[dict[str, Any]] = []
    by_domain: dict[str, list[dict[str, Any]]] = {}
    for lead in leads:
        domain = normalise_domain(lead.get("website") or lead.get("domain"))
        if not domain:
            continue
        by_domain.setdefault(domain, []).append(lead)

    for domain, items in by_domain.items():
        for lead in items:
            names: list[str] = lead.get("director_names") or []
            if not names:
                continue
            full_name = names[0]
            hit = await verify_best_pattern(full_name, domain)
            if hit:
                results.append({**lead, **hit, "verified_email": hit["email"]})
            await asyncio.sleep(domain_throttle)

    log.info("smtp_verify_done", domains=len(by_domain), verified=len(results))
    return results
