#!/usr/bin/env python3
"""Generate SEORoutes.tsx from the route registry, excluding already-registered routes."""
import os

# Read route registry
registry = []
with open('/tmp/seo-route-registry.txt') as f:
    for line in f:
        parts = line.strip().split('|')
        if len(parts) == 2:
            registry.append((parts[0], parts[1]))

# Read existing routes from AppRouter
existing = set()
with open('/tmp/existing-routes.txt') as f:
    for line in f:
        existing.add(line.strip())

# Filter to only routes not yet in AppRouter
new_routes = [(comp, route) for comp, route in registry if route not in existing]

# Sort by route for readability
new_routes.sort(key=lambda x: x[1])

# Generate TSX
lines = []
lines.append("import { lazy } from 'react';")
lines.append("import { Route } from 'react-router-dom';")
lines.append("import { LazyRoute } from '@/components/LazyRoute';")
lines.append("")
lines.append("// Auto-generated SEO routes — do not edit manually")
lines.append(f"// {len(new_routes)} routes")
lines.append("")

# Lazy imports
for comp, route in new_routes:
    lines.append(f"const {comp} = lazy(() => import('@/pages/seo/{comp}'));")

lines.append("")
lines.append("/**")
lines.append(" * Returns all SEO page routes as JSX elements.")
lines.append(" * Usage in AppRouter: {getSEORoutes()}")
lines.append(" */")
lines.append("export function getSEORoutes() {")
lines.append("  return (")
lines.append("    <>")

for comp, route in new_routes:
    lines.append(f'      <Route path="{route}" element={{<LazyRoute><{comp} /></LazyRoute>}} />')

lines.append("    </>")
lines.append("  );")
lines.append("}")
lines.append("")

output = '\n'.join(lines)
outpath = 'src/routes/SEORoutes.tsx'
os.makedirs(os.path.dirname(outpath), exist_ok=True)
with open(outpath, 'w') as f:
    f.write(output)

print(f"Generated {outpath} with {len(new_routes)} routes")
