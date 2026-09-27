#!/usr/bin/env python3
"""Check that a coverage mapping's evidence is real.

Each mapping claims a lesson teaches a criterion, and backs it with a fragment
quoted from that lesson's page file. This greps every fragment back into the
file it names. A quote that is not in the file it cites was not read — it was
recalled or invented, and the mapping behind it cannot be trusted.

Evidence format expected (as produced by the mapping agents):

    ### 303/lo1/1-1 — Sources of information
    - `module1/section1/1-1` — src/pages/apprentice-courses/level2/.../Sub1.tsx
      > "verbatim fragment copied exactly from that file"

Whitespace, curly vs straight quotes and JSX entity escapes are normalised
before matching, because those differ harmlessly between a file and a quote of
it. Nothing else is.

Usage:  python3 scripts/check-welsh-coverage-evidence.py /tmp/map_*_evidence.md
"""

import glob
import html
import os
import re
import sys

SMART = {
    '‘': "'", '’': "'", '“': '"', '”': '"',
    '–': '-', '—': '-', ' ': ' ',
}


def normalise(text):
    text = html.unescape(text)
    for a, b in SMART.items():
        text = text.replace(a, b)
    # JSX entities the unescape above will not have caught in raw source
    for ent, ch in (('&rsquo;', "'"), ('&lsquo;', "'"), ('&ldquo;', '"'),
                    ('&rdquo;', '"'), ('&mdash;', '-'), ('&ndash;', '-'),
                    ('&nbsp;', ' '), ('&amp;', '&')):
        text = text.replace(ent, ch)
    return re.sub(r'\s+', ' ', text).strip().lower()


def main():
    paths = []
    for arg in sys.argv[1:]:
        paths.extend(sorted(glob.glob(arg)))
    if not paths:
        print(__doc__)
        return 2

    cache = {}
    total = bad = missing_file = 0
    failures = []

    for path in paths:
        if not os.path.exists(path):
            print(f'MISSING evidence file: {path}')
            bad += 1
            continue
        key = None
        for line in open(path):
            h = re.match(r'^###\s+(\S+)', line)
            if h:
                key = h.group(1)
                continue
            m = re.match(r'^\s*-\s+`([^`]+)`\s+[—-]\s+(\S+)', line)
            if m:
                pending_route, pending_file = m.group(1), m.group(2)
                continue
            q = re.match(r'^\s*>\s*"?(.+?)"?\s*$', line)
            if q and key:
                total += 1
                frag = q.group(1)
                src_path = pending_file
                if not os.path.exists(src_path):
                    missing_file += 1
                    failures.append(f'{key}: file not found — {src_path}')
                    continue
                if src_path not in cache:
                    cache[src_path] = normalise(open(src_path).read())
                if normalise(frag) not in cache[src_path]:
                    bad += 1
                    failures.append(
                        f'{key}: quote NOT FOUND in {src_path}\n      > {frag[:100]}'
                    )

    for f in failures:
        print('FAIL', f)
    ok = total - bad - missing_file
    print(f'\n{ok}/{total} quotes verified in the file they cite; '
          f'{bad} not found, {missing_file} file missing')
    return 1 if (bad or missing_file) else 0


if __name__ == '__main__':
    sys.exit(main())
