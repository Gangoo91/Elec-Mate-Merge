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
        "name": "IET E&T Magazine",
        "url": "https://eandt.theiet.org/rss.xml/4404",
        "source": "iet",
        "category": "regulations",
    },
    {
        "name": "HSE News",
        "url": "https://press.hse.gov.uk/feed/",
        "source": "hse",
        "category": "safety",
    },
]
