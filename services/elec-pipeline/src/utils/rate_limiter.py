"""Simple async rate limiter."""

from __future__ import annotations

import asyncio
import time
from collections import defaultdict


class RateLimiter:
    """Per-domain rate limiter. Enforces minimum gap between requests."""

    def __init__(self, default_gap: float = 2.0):
        self._last_request: dict[str, float] = defaultdict(float)
        self._default_gap = default_gap
        self._lock = asyncio.Lock()

    async def wait(self, domain: str, gap: float | None = None) -> None:
        gap = gap or self._default_gap
        async with self._lock:
            elapsed = time.monotonic() - self._last_request[domain]
            if elapsed < gap:
                await asyncio.sleep(gap - elapsed)
            self._last_request[domain] = time.monotonic()


rate_limiter = RateLimiter()
