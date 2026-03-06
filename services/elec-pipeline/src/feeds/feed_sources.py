"""RSS feed source definitions for industry news."""

FEEDS: list[dict[str, str]] = [
    {
        "name": "Electrical Times",
        "url": "https://www.electricaltimes.co.uk/feed/",
        "source": "electrical_times",
        "category": "industry",
    },
    {
        "name": "Professional Electrician",
        "url": "https://professional-electrician.com/feed/",
        "source": "professional_electrician",
        "category": "technical",
    },
    {
        "name": "Electrical Contracting News",
        "url": "https://electricalcontractingnews.com/feed/",
        "source": "ecn",
        "category": "contracting",
    },
    {
        "name": "Voltimum UK",
        "url": "https://www.voltimum.co.uk/rss.xml",
        "source": "voltimum",
        "category": "technical",
    },
    {
        "name": "IET Wiring Matters",
        "url": "https://electrical.theiet.org/wiring-matters/feed/",
        "source": "iet",
        "category": "regulations",
    },
    {
        "name": "HSE Electrical Safety",
        "url": "https://www.hse.gov.uk/news/rss/hse-news.xml",
        "source": "hse",
        "category": "safety",
    },
]
