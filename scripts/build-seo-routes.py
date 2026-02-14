#!/usr/bin/env python3
"""Build the complete SEO route registry from page files and AppRouter."""
import re, os

# 1) Extract routes from page files (new pages with breadcrumbs/toolPath/PAGE_PATH)
pages_dir = 'src/pages/seo'
file_routes = {}

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
        file_routes[basename] = m.group(1)
        continue

    # Try toolPath prop
    m = re.search(r'toolPath[=]\s*["\']([^"\']+)["\']', content)
    if m:
        file_routes[basename] = m.group(1)
        continue

    # Try breadcrumbs const
    breadcrumb_match = re.search(r'const breadcrumbs\s*[=:].*?\];', content, re.DOTALL)
    if breadcrumb_match:
        hrefs = re.findall(r'href:\s*["\']([^"\']+)["\']', breadcrumb_match.group())
        if hrefs:
            file_routes[basename] = hrefs[-1]
            continue

# 2) Extract existing routes from AppRouter
content = open('src/AppRouter.tsx').read()
pattern = r"const (\w+)\s*=\s*lazy(?:WithRetry)?\(\s*(?:\(\)\s*=>)?\s*import\(['\"]@/pages/seo/(\w+)['\"]\)"
imports = re.findall(pattern, content)
route_blocks = re.findall(r'path="([^"]+)"[^<]*<LazyRoute>\s*<(\w+)', content, re.DOTALL)
route_map = {}
for path, comp_name in route_blocks:
    route_map[comp_name] = path
for comp, filen in imports:
    if comp in route_map and filen not in file_routes:
        file_routes[filen] = route_map[comp]

# 3) Handle duplicates - keep the file with more lines
duplicates_to_remove = set()
route_to_files = {}
for f, r in file_routes.items():
    if r not in route_to_files:
        route_to_files[r] = []
    route_to_files[r].append(f)

for route, files in route_to_files.items():
    if len(files) > 1:
        # Keep the file with more content
        sizes = []
        for f in files:
            fpath = os.path.join(pages_dir, f + '.tsx')
            sizes.append((os.path.getsize(fpath), f))
        sizes.sort(reverse=True)
        # Keep the biggest, remove the rest
        for _, f in sizes[1:]:
            duplicates_to_remove.add(f)
            print(f"DUPLICATE: {f} -> {route} (keeping {sizes[0][1]})")

# 4) Build final route list
final_routes = {}
for f, r in sorted(file_routes.items()):
    if f in duplicates_to_remove:
        continue
    final_routes[f] = r

# 5) Print the route registry
print(f"\nTotal unique routes: {len(final_routes)}")
print(f"Duplicates removed: {len(duplicates_to_remove)}")

# 6) Write the route data file
with open('/tmp/seo-route-registry.txt', 'w') as out:
    for f, r in sorted(final_routes.items(), key=lambda x: x[1]):
        out.write(f"{f}|{r}\n")

print(f"\nRoute registry written to /tmp/seo-route-registry.txt")
