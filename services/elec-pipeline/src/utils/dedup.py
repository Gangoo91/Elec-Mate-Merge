"""Deduplication utilities for jobs and other data."""

from __future__ import annotations

import hashlib
from typing import Any


def job_dedup_key(job: dict[str, Any]) -> str:
    """Generate a dedup key from title + company + location."""
    parts = [
        (job.get("title") or "").strip().lower(),
        (job.get("company") or "").strip().lower(),
        (job.get("location") or "").strip().lower(),
    ]
    raw = "|".join(parts)
    return hashlib.md5(raw.encode()).hexdigest()


def deduplicate_jobs(jobs: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Remove duplicate jobs by (title + company + location) hash."""
    seen: set[str] = set()
    unique: list[dict] = []
    for job in jobs:
        key = job_dedup_key(job)
        if key not in seen:
            seen.add(key)
            unique.append(job)
    return unique
