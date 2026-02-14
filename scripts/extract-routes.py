#!/usr/bin/env python3
"""Extract route paths from SEO page files."""
import os, re

pages_dir = 'src/pages/seo'
results = []

for fname in sorted(os.listdir(pages_dir)):
    if not fname.endswith('.tsx'):
        continue
    fpath = os.path.join(pages_dir, fname)
    if os.path.isdir(fpath):
        continue

    content = open(fpath).read()
    basename = fname.replace('.tsx', '')

    # Try PAGE_PATH const first
    m = re.search(r"const PAGE_PATH\s*=\s*[\"']([^\"']+)[\"']", content)
    if m:
        results.append(f'{basename}|{m.group(1)}')
        continue

    # Try toolPath prop (ToolTemplate pages)
    m = re.search(r'toolPath[=]\s*["\']([^"\']+)["\']', content)
    if m:
        results.append(f'{basename}|{m.group(1)}')
        continue

    # Try breadcrumbs const - find the array and get last href
    breadcrumb_match = re.search(r'const breadcrumbs\s*[=:].*?\];', content, re.DOTALL)
    if breadcrumb_match:
        hrefs = re.findall(r'href:\s*["\']([^"\']+)["\']', breadcrumb_match.group())
        if hrefs:
            results.append(f'{basename}|{hrefs[-1]}')
            continue

    # Try breadcrumbs prop inline
    breadcrumb_match = re.search(r'breadcrumbs=\{\[.*?\]\}', content[:5000], re.DOTALL)
    if breadcrumb_match:
        hrefs = re.findall(r'href:\s*["\']([^"\']+)["\']', breadcrumb_match.group())
        if hrefs:
            results.append(f'{basename}|{hrefs[-1]}')
            continue

    results.append(f'{basename}|UNKNOWN')

for r in results:
    print(r)
