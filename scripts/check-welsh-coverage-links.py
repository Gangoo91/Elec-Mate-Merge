#!/usr/bin/env python3
"""Resolve every Welsh L3 coverage link the way the router will.

The coverage map stores a path relative to `/study-centre/apprentice/`, and the
lesson page navigates to exactly that. But the apprentice route tree does not
declare every path at the same level: Level 3 lesson routes are spread straight
into ApprenticeCourseRoutes, while Level 2 routes are mounted behind a
`level2/*` child route and therefore need that prefix in the URL.

Validating that a route string appears *somewhere* in a route file — which is
all the build script originally did — does not catch that. This walks the mount
chain instead and rebuilds the full set of reachable paths, then checks each
stored link against it.

Usage:  python3 scripts/check-welsh-coverage-links.py
"""

import re
import sys

COVERAGE = 'src/data/study-centre/welshLevel3Coverage.ts'


def routes_in(path):
    """Every <Route path="..."> declared in a file, with its element name."""
    src = open(path).read()
    out = []
    for m in re.finditer(r'<Route\s+path="([^"]+)"\s+element=\{<(\w+)\s*/>\}', src):
        out.append((m.group(1), m.group(2)))
    return out


def reachable():
    """Paths reachable under /study-centre/apprentice/, as the router sees them."""
    paths = set()

    # Level 3 lesson routes are spread directly into the apprentice tree.
    for p, comp in routes_in('src/routes/Level3Routes.tsx'):
        if comp[0].isupper():
            paths.add(p)

    # Everything declared inline in ApprenticeCourseRoutes, minus the lowercase
    # components that render nothing.
    for p, comp in routes_in('src/routes/ApprenticeCourseRoutes.tsx'):
        if comp[0].isupper() and not p.endswith('/*'):
            paths.add(p)

    # Level 2 is mounted behind `level2/*`, so its declared paths gain that prefix.
    src = open('src/routes/ApprenticeCourseRoutes.tsx').read()
    prefixes = re.findall(r'<Route\s+path="([^"]+)/\*"\s+element=\{<(\w+)\s*/>\}', src)
    mounts = {comp: pre for pre, comp in prefixes}
    if 'Level2Routes' in mounts:
        pre = mounts['Level2Routes']
        for p, comp in routes_in('src/routes/Level2Routes.tsx'):
            if comp[0].isupper():
                paths.add(f'{pre}/{p}')
    else:
        print('WARNING: Level2Routes mount point not found — Level 2 links unchecked')
    return paths


def main():
    src = open(COVERAGE).read()
    links = re.findall(r"\{ route: '([^']+)', label: '(?:[^'\\]|\\.)*', course: '([^']+)' \}", src)
    if not links:
        print('no links found in the coverage map — has its shape changed?')
        return 2

    ok_paths = reachable()
    bad = [(r, c) for r, c in links if r not in ok_paths]

    for r, c in bad:
        print(f'UNREACHABLE  {c:8} /study-centre/apprentice/{r}')

    n2 = sum(1 for _, c in links if c == 'Level 2')
    n3 = len(links) - n2
    print(f'\n{len(links) - len(bad)}/{len(links)} coverage links resolve '
          f'({n2} Level 2, {n3} Level 3); {len(bad)} unreachable')
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
