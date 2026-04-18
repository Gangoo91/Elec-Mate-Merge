"""Shared helpers used across outreach scrapers."""

from __future__ import annotations

import re
from typing import Iterable

EMAIL_RE = re.compile(
    r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+",
    re.IGNORECASE,
)

POSTCODE_RE = re.compile(
    r"\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b",
    re.IGNORECASE,
)

EMAIL_NOISE = (
    "example.com", "sentry.io", "wixpress", "godaddy", ".png", ".jpg",
    ".gif", ".webp", ".svg", "cloudflare", "mailer-daemon", "noreply",
    "webador.com", "wordpress.com", "squarespace.com", "sentry-next.io",
    "u003e", "u002f",
)

# Email local-parts that are JavaScript/CSS library names (not real addresses)
EMAIL_FAKE_LOCAL_PARTS = {
    "bootstrap", "bootstrap-icons", "intl-segmenter", "aos", "ui", "jquery",
    "lodash", "ajv", "icon", "fontawesome", "select2", "material",
    "react", "vue", "angular", "moment", "axios", "webpack", "babel",
    "postcss", "tailwind", "eslint", "prettier", "swiper", "popper",
}

# Domains that are actually version strings (e.g. "5.3.3")
import re as _re
_VERSION_DOMAIN_RE = _re.compile(r"^\d+(\.\d+)+$")

PREFERRED_PREFIXES = (
    "enquiries@", "info@", "contact@", "hello@", "admin@",
    "courses@", "apprenticeships@", "training@", "reception@",
)

ELECTRICAL_KEYWORDS = (
    "electric", "electrical", "electrician", "sparks", "lighting",
    "pv", "solar", "ev ", "ev-", "charger", "niceic", "napit",
    "power", "voltage",
)


def extract_emails(text: str | None) -> list[str]:
    if not text:
        return []
    out, seen = [], set()
    for m in EMAIL_RE.findall(text):
        lower = m.lower().strip()
        if lower in seen:
            continue
        if any(n in lower for n in EMAIL_NOISE):
            continue
        # Split local-part and domain
        parts = lower.rsplit("@", 1)
        if len(parts) != 2:
            continue
        local, domain = parts
        # Reject version-string domains (e.g. "5.3.3" or "1.11.3")
        if _VERSION_DOMAIN_RE.match(domain):
            continue
        # Reject known library local-parts
        if local in EMAIL_FAKE_LOCAL_PARTS:
            continue
        # Domain must have at least one letter (not pure version string without dots)
        if not any(c.isalpha() for c in domain):
            continue
        # Require a proper TLD
        if "." not in domain:
            continue
        seen.add(lower)
        out.append(lower)
    return out


def prefer_generic_email(emails: list[str], domain: str | None = None) -> str | None:
    if not emails:
        return None
    pool = emails
    if domain:
        on_domain = [e for e in emails if e.endswith("@" + domain.lower())]
        if on_domain:
            pool = on_domain
    for prefix in PREFERRED_PREFIXES:
        for e in pool:
            if e.startswith(prefix):
                return e
    return pool[0]


def extract_postcode(text: str | None) -> str | None:
    if not text:
        return None
    m = POSTCODE_RE.search(text)
    if not m:
        return None
    return m.group(1).upper().replace("  ", " ")


def normalise_domain(url: str | None) -> str | None:
    if not url:
        return None
    d = re.sub(r"^https?://(www\.)?", "", url.lower())
    d = d.split("/")[0]
    return d or None


def classify_uk_country(
    postcode: str | None, city: str | None = None, region: str | None = None
) -> str:
    if not postcode:
        if city:
            c = city.lower()
            if any(x in c for x in (
                "edinburgh", "glasgow", "aberdeen", "dundee", "stirling",
                "inverness", "perth"
            )):
                return "scotland"
            if any(x in c for x in ("cardiff", "swansea", "newport", "wrexham", "llandudno")):
                return "wales"
            if any(x in c for x in ("belfast", "derry", "antrim", "lisburn", "bangor")):
                return "northern_ireland"
        return "england"
    p = postcode.upper().strip()
    scotland_prefixes = (
        "AB", "DD", "DG", "EH", "FK", "G", "HS", "IV", "KA", "KW", "KY",
        "ML", "PA", "PH", "TD", "ZE",
    )
    wales_prefixes = ("CF", "LD", "LL", "NP", "SA", "SY")
    ni_prefixes = ("BT",)
    for pref in sorted(scotland_prefixes, key=len, reverse=True):
        if p.startswith(pref) and (len(pref) == len(p) or not p[len(pref)].isalpha()):
            return "scotland"
    for pref in wales_prefixes:
        if p.startswith(pref):
            return "wales"
    for pref in ni_prefixes:
        if p.startswith(pref):
            return "northern_ireland"
    return "england"


def is_electrical_by_name(name: str) -> bool:
    n = (name or "").lower()
    return any(k in n for k in ELECTRICAL_KEYWORDS)


def chunked(seq: Iterable, size: int):
    buf: list = []
    for item in seq:
        buf.append(item)
        if len(buf) >= size:
            yield buf
            buf = []
    if buf:
        yield buf
