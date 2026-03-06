"""Simple alerting — logs errors with structured logging.

Phase 3 will add webhook/email alerting.
"""

from __future__ import annotations

import structlog

log = structlog.get_logger()


def alert_pipeline_failure(pipeline_name: str, error: str) -> None:
    """Log a pipeline failure. Phase 3 adds webhook notification."""
    log.error(
        "pipeline_failed",
        pipeline=pipeline_name,
        error=error,
    )
