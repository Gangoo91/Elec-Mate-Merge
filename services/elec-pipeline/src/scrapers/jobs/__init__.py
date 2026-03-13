"""Job scrapers — Reed and Gumtree."""

from src.scrapers.jobs.gumtree import scrape_gumtree_jobs
from src.scrapers.jobs.reed import scrape_reed_jobs

__all__ = ["scrape_reed_jobs", "scrape_gumtree_jobs"]
