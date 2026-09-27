#!/usr/bin/env python3
"""Write the Welsh Level 3 reuse map from verified English lesson routes.

A "reuse" criterion does not get a written page; it gets a signpost to the
lesson in the English Level 2 / Level 3 courses that already teaches it. This
script is the only sanctioned way to add one, because a hand-written route is
how a learner ends up on a blank page.

Input  : a JSON file of { "unit/lo/crit": ["<route>", ...] }
Checks : every route is declared in a route file, resolves to a real page file,
         is not one of the lowercase-component routes that render nothing, and
         carries a page title we can use as the link label.
Output : the COVERAGE table inside src/data/study-centre/welshLevel3Coverage.ts

Labels are never taken from the input. They are read from the target page's own
TITLE, so a link cannot claim to be something the page is not.

Usage:  python3 scripts/build-welsh-coverage.py mapping.json [--check]
"""

import json
import os
import re
import sys

ROUTE_FILES = [
    'src/routes/Level3Routes.tsx',
    'src/routes/Level2Routes.tsx',
    'src/routes/ApprenticeCourseRoutes.tsx',
]
COVERAGE_TS = 'src/data/study-centre/welshLevel3Coverage.ts'
COURSE_TREE = 'src/data/study-centre/welshLevel3.ts'


def build_index():
    """route -> {'file': path, 'title': str|None, 'course': 'Level 2'|'Level 3'}"""
    index, dead = {}, set()
    for rf in ROUTE_FILES:
        src = open(rf).read()
        imports = {}
        for m in re.finditer(r'const\s+(\w+)\s*=\s*lazy(?:WithRetry)?\(', src):
            tail = src[m.end():m.end() + 400]
            im = re.search(r"import\('([^']+)'\)", tail)
            if im:
                imports[m.group(1)] = im.group(1)
        for m in re.finditer(r'<Route\s+path="([^"]+)"\s+element=\{<(\w+)\s*/>\}', src):
            route, comp = m.group(1), m.group(2)
            if comp[0].islower():
                # React reads a lowercase element as an intrinsic tag, so these
                # routes render nothing at all. Never link one.
                dead.add(route)
                continue
            path = imports.get(comp)
            if not path:
                continue
            disk = path.replace('@/', 'src/')
            for ext in ('.tsx', '.ts'):
                if os.path.exists(disk + ext):
                    disk += ext
                    break
            else:
                continue
            title = re.search(r"const TITLE\s*=\s*'([^']+)'", open(disk).read())
            course = 'Level 2' if '/level2/' in path else 'Level 3' if '/level3/' in path else None
            index[route] = {
                'file': path,
                'title': title.group(1) if title else None,
                'course': course,
            }
    return index, dead


def label_from_title(title):
    """'JIB grading deep dive | Level 3 Module 7.1.2 | Elec-Mate' -> the first part."""
    head = title.split('|')[0].strip()
    return re.sub(r'\s+', ' ', head)


def valid_keys():
    """Every unit/lo/crit the course tree actually declares."""
    src = open(COURSE_TREE).read()
    keys = set()
    units = [(m.start(), m.group(1)) for m in re.finditer(r'code: "([0-9]{3}E?)"', src)]
    units.append((len(src), None))
    for (start, code), (end, _) in zip(units, units[1:]):
        seg = src[start:end]
        for sm in re.finditer(r'slug: "(lo\d+)"', seg):
            lo = sm.group(1)
            nxt = seg.find('slug: "lo', sm.end())
            body = seg[sm.end():nxt if nxt > 0 else len(seg)]
            for cm in re.finditer(r'slug: "(\d+-\d+)"', body):
                keys.add(f'{code.lower()}/{lo}/{cm.group(1)}')
    return keys


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    mapping = json.load(open(sys.argv[1]))
    check_only = '--check' in sys.argv

    index, dead = build_index()
    keys = valid_keys()
    errors, rows = [], {}

    for key, routes in sorted(mapping.items()):
        if key not in keys:
            errors.append(f'{key}: not a criterion in the course tree')
            continue
        refs = []
        for route in routes:
            route = route.lstrip('/')
            if route in dead:
                errors.append(f'{key}: {route} renders nothing (lowercase component)')
                continue
            hit = index.get(route)
            if not hit:
                errors.append(f'{key}: {route} is not a declared route')
                continue
            if not hit['title']:
                errors.append(f'{key}: {route} has no TITLE to label the link with')
                continue
            if not hit['course']:
                errors.append(f'{key}: {route} is not a Level 2 or Level 3 lesson')
                continue
            # The route files declare Level 2 paths bare, but ApprenticeCourseRoutes
            # mounts them at `level2/*`, so the URL a learner needs carries that
            # prefix. Level 3 routes are spread in directly and take none. Getting
            # this wrong sends every Level 2 link to a blank page.
            href = f'level2/{route}' if hit['course'] == 'Level 2' else route
            refs.append({'route': href, 'label': label_from_title(hit['title']), 'course': hit['course']})
        if refs:
            rows[key] = refs

    for e in errors:
        print('ERROR', e)
    n = sum(len(v) for v in rows.values())
    print(f'\n{len(rows)} criteria mapped to {n} lessons; {len(errors)} error(s)')
    if errors:
        return 1
    if check_only:
        return 0

    body = []
    for key in sorted(rows):
        body.append(f"  '{key}': [")
        for r in rows[key]:
            lab = r['label'].replace('\\', '\\\\').replace("'", "\\'")
            body.append(f"    {{ route: '{r['route']}', label: '{lab}', course: '{r['course']}' }},")
        body.append('  ],')
    table = 'const COVERAGE: Record<string, CoverRef[]> = {\n' + '\n'.join(body) + '\n};'

    src = open(COVERAGE_TS).read()
    # Matches both the empty `= {};` seed and a previously generated table.
    pattern = r'const COVERAGE: Record<string, CoverRef\[\]> = \{(?:\};|.*?\n\};)'
    if not re.search(pattern, src, flags=re.S):
        print('ERROR could not find the COVERAGE table to replace')
        return 1
    src = re.sub(pattern, lambda _: table, src, count=1, flags=re.S)
    open(COVERAGE_TS, 'w').write(src)
    print(f'wrote {COVERAGE_TS}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
