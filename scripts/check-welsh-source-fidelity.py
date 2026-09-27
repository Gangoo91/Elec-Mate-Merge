#!/usr/bin/env python3
"""Check that every figure on a generated Welsh page came from its source lesson.

The second writing phase re-expresses existing English Level 2/3 lessons as
pages written to the Welsh criterion. The factual content is therefore supposed
to be *derived*, not recalled — and the failure mode that matters is an agent
supplying a plausible number from its own knowledge instead of copying the one
in front of it. Insulation resistance values, test voltages, disconnection
times, cable sizes and regulation numbers are where that happens.

This extracts every hard token from a generated page — regulation numbers,
BS/EN standard numbers, and numeric values carrying an electrical unit — and
checks each appears somewhere in the source files that page was written from.
Anything unmatched is a number the agent produced rather than copied, and has
to be checked by hand before the page is placed.

Reads the manifest written by the write-phase setup:
    /tmp/welsh_write_manifest.json   {"unit/lo/crit": {..., "sources": [paths]}}

Usage:
    python3 scripts/check-welsh-source-fidelity.py <generated.tsx> [more.tsx ...]

The criterion key is taken from each file's name, e.g. `306e-4-1.tsx`.
"""

import json
import os
import re
import sys

MANIFEST = '/tmp/welsh_write_manifest.json'

# Tokens worth policing. Prose numbers ("three classes of lever") are ignored
# deliberately — only figures that carry technical weight are checked.
PATTERNS = [
    (r'\bRegulation\s+(\d+(?:\.\d+)+(?:\([a-z]\))?)', 'Regulation'),
    (r'\bBS\s+EN\s+(?:IEC\s+)?(\d+(?:-\d+)?)', 'BS EN'),
    (r'\bBS\s+(\d{3,5})', 'BS'),
    (r'(\d+(?:\.\d+)?)\s*(?:MΩ|Mohm|megohm)', 'MΩ'),
    (r'(\d+(?:\.\d+)?)\s*(?:mm²|mm2)', 'mm²'),
    (r'(\d+(?:\.\d+)?)\s*(?:V\b|volts)', 'V'),
    (r'(\d+(?:\.\d+)?)\s*(?:A\b|amps|amperes)', 'A'),
    (r'(\d+(?:\.\d+)?)\s*(?:ms\b|milliseconds)', 'ms'),
    (r'\bTable\s+(\d+[A-Za-z0-9.]*)', 'Table'),
]


def tokens(text):
    found = set()
    for pat, kind in PATTERNS:
        for m in re.finditer(pat, text, re.I):
            found.add((kind, m.group(1)))
    return found


def key_from(path):
    base = os.path.basename(path).replace('.tsx', '')
    parts = base.split('-')
    if len(parts) < 3:
        return None
    return f'{parts[0]}/lo{parts[1]}/{parts[1]}-{parts[2]}'


def main():
    files = sys.argv[1:]
    if not files:
        print(__doc__)
        return 2
    if not os.path.exists(MANIFEST):
        print(f'manifest not found: {MANIFEST}')
        return 2
    man = json.load(open(MANIFEST))

    cache, bad_total, checked_total = {}, 0, 0
    for f in files:
        k = key_from(f)
        entry = man.get(k)
        if not entry:
            print(f'{os.path.basename(f):18} NO MANIFEST ENTRY for key {k}')
            bad_total += 1
            continue
        sources = entry['sources']
        blob = []
        for s in sources:
            if s not in cache:
                cache[s] = open(s).read() if os.path.exists(s) else ''
            blob.append(cache[s])
        blob = '\n'.join(blob)
        src_tokens = tokens(blob)
        # Compare on the value alone as well as the typed pair: a source that
        # writes "1.0 MΩ" and a page that writes "1 MΩ" is the same figure.
        src_values = {v.rstrip('0').rstrip('.') if '.' in v else v for _, v in src_tokens}

        page = open(f).read()
        unmatched = []
        for kind, val in sorted(tokens(page)):
            norm = val.rstrip('0').rstrip('.') if '.' in val else val
            if (kind, val) in src_tokens or norm in src_values:
                continue
            unmatched.append(f'{kind} {val}')
        checked_total += 1
        if unmatched:
            bad_total += 1
            print(f'{os.path.basename(f):18} NOT IN SOURCE: ' + ', '.join(unmatched))
            print(f'{"":18} sources: ' + ', '.join(os.path.basename(s) for s in sources))
        else:
            print(f'{os.path.basename(f):18} OK — every figure traced to source')

    print(f'\n{checked_total - bad_total}/{checked_total} pages fully traced; '
          f'{bad_total} need a hand check')
    return 1 if bad_total else 0


if __name__ == '__main__':
    sys.exit(main())
