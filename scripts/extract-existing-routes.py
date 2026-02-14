#!/usr/bin/env python3
"""Extract existing route mappings from AppRouter.tsx."""
import re

content = open('src/AppRouter.tsx').read()

# Find all lazy imports for SEO pages: const Name = lazy(() => import('@/pages/seo/FileName'))
pattern = r"const (\w+)\s*=\s*lazy(?:WithRetry)?\(\s*(?:\(\)\s*=>)?\s*import\(['\"]@/pages/seo/(\w+)['\"]\)"
imports = re.findall(pattern, content)

# Find all route path + element pairs
# Pattern: path="/some/path" ... <ComponentName
route_blocks = re.findall(r'path="([^"]+)"[^<]*<LazyRoute>\s*<(\w+)', content, re.DOTALL)

# Build component->route mapping
route_map = {}
for path, comp_name in route_blocks:
    route_map[comp_name] = path

# Print file->route for SEO pages
for comp, filen in imports:
    if comp in route_map:
        print(f"{filen}|{route_map[comp]}")
    else:
        print(f"{filen}|ROUTE_NOT_FOUND")
