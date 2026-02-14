#!/usr/bin/env python3
"""Generate split sitemaps for elec-mate.com."""
from datetime import date

BASE_URL = "https://elec-mate.com"
TODAY = date.today().isoformat()

# Read all routes
routes = []
with open('/tmp/seo-route-registry.txt') as f:
    for line in f:
        parts = line.strip().split('|')
        if len(parts) == 2:
            routes.append(parts[1])

# Static pages
static = ['/', '/auth/signin', '/auth/signup', '/privacy-policy', '/terms-of-service', '/cookie-policy']

# Categorize
pages = sorted(set(static))
tools = sorted(set(r for r in routes if r.startswith('/tools/')))
guides = sorted(set(r for r in routes if r.startswith('/guides/')))
training = sorted(set(r for r in routes if r.startswith('/training/')))
compare = sorted(set(r for r in routes if r.startswith('/compare/')))


def make_sitemap(urls, priorities=None):
    """Generate a sitemap XML string."""
    default_priority = "0.7"
    lines = ['<?xml version="1.0" encoding="UTF-8"?>']
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for url in urls:
        p = priorities.get(url, default_priority) if priorities else default_priority
        freq = "weekly" if p == "1.0" else "weekly"
        lines.append(f"  <url>")
        lines.append(f"    <loc>{BASE_URL}{url}</loc>")
        lines.append(f"    <lastmod>{TODAY}</lastmod>")
        lines.append(f"    <changefreq>{freq}</changefreq>")
        lines.append(f"    <priority>{p}</priority>")
        lines.append(f"  </url>")
    lines.append('</urlset>')
    return '\n'.join(lines) + '\n'


def make_index(sitemaps):
    """Generate sitemap index XML."""
    lines = ['<?xml version="1.0" encoding="UTF-8"?>']
    lines.append('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for name in sitemaps:
        lines.append(f"  <sitemap>")
        lines.append(f"    <loc>{BASE_URL}/{name}</loc>")
        lines.append(f"    <lastmod>{TODAY}</lastmod>")
        lines.append(f"  </sitemap>")
    lines.append('</sitemapindex>')
    return '\n'.join(lines) + '\n'


# Generate sitemaps
page_priorities = {'/': '1.0', '/auth/signin': '0.8', '/auth/signup': '0.8'}
outdir = 'public'

with open(f'{outdir}/sitemap-pages.xml', 'w') as f:
    f.write(make_sitemap(pages, page_priorities))

with open(f'{outdir}/sitemap-tools.xml', 'w') as f:
    f.write(make_sitemap(tools))

with open(f'{outdir}/sitemap-guides.xml', 'w') as f:
    f.write(make_sitemap(guides))

with open(f'{outdir}/sitemap-training.xml', 'w') as f:
    f.write(make_sitemap(training))

with open(f'{outdir}/sitemap-compare.xml', 'w') as f:
    f.write(make_sitemap(compare))

# Generate index
with open(f'{outdir}/sitemap.xml', 'w') as f:
    f.write(make_index([
        'sitemap-pages.xml',
        'sitemap-tools.xml',
        'sitemap-guides.xml',
        'sitemap-training.xml',
        'sitemap-compare.xml',
    ]))

print(f"Generated sitemaps:")
print(f"  sitemap-pages.xml: {len(pages)} URLs")
print(f"  sitemap-tools.xml: {len(tools)} URLs")
print(f"  sitemap-guides.xml: {len(guides)} URLs")
print(f"  sitemap-training.xml: {len(training)} URLs")
print(f"  sitemap-compare.xml: {len(compare)} URLs")
print(f"  sitemap.xml: index with 5 sitemaps")
print(f"  Total: {len(pages) + len(tools) + len(guides) + len(training) + len(compare)} URLs")
