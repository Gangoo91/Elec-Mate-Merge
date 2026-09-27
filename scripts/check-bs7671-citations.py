#!/usr/bin/env python3
"""Find BS 7671 regulation numbers that cannot be verified against our own data.

🔴 WHAT THIS IS AND IS NOT. A number missing from the allow-list has NOT been
proved invented — the list is exported from `bs7671_known_reg_numbers` and
`bs7671_regulations`, which come from OCR'd source and are not guaranteed
complete. This produces LEADS. Each one needs checking against the standard
before anything is rewritten.

Two leads from the first run WERE confirmed wrong, which is why it exists:
  · "Regulation 311.2" — no such regulation at any level. The real anchor for
    load curtailment in maximum demand is 722.311.201, and it says curtailment
    "may be taken into account" — permissive, where the courses taught it as a
    duty to assess the failure mode.
  · "Regulation 514.16" for single-pole switching — 514.16.1 exists but is the
    SPD-presence label. Single-pole in the line conductor is 132.14.1:
    "A single-pole fuse, switch or circuit-breaker shall be inserted in the
    line conductor only." Note this one passes a number-existence check,
    because 514.16 is a valid parent of 514.16.1 — only reading the text
    catches it. A clean run here does not mean the citations are right.

Usage:
    python3 scripts/check-bs7671-citations.py [path ...]      # default: src
    python3 scripts/check-bs7671-citations.py --files         # list files too

Refresh the allow-list from the project database with the query in the header
of scripts/data/bs7671-known-regs.txt. Export it in chunks — a single
string_agg over all 1,848 rows is silently truncated by the client, which cost
three real regulation numbers the first time.
"""

import glob
import os
import re
import sys

KNOWN = 'scripts/data/bs7671-known-regs.txt'
# A bare three-digit number is a group or section heading, not a leaf.
HEADING = re.compile(r'^\d{3}$')
CITE = re.compile(r'\bReg(?:ulation)?s?\.?\s+([1-8]\d{2}(?:\.\d+)*)\b')


def load_known(path):
    """The allow-list, plus every parent of an entry in it.

    "Regulation 644.1" is a real group reference where 644.1.1 and 644.1.2
    exist; the export holds only leaves. Accepting parents keeps the output
    pointed at numbers with no children either — the shape 311.2 has.
    """
    known = {l.strip() for l in open(path) if l.strip() and not l.startswith('#')}
    parents = set()
    for r in known:
        parts = r.split('.')
        for i in range(1, len(parts)):
            parents.add('.'.join(parts[:i]))
    return known | parents


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    show_files = '--files' in sys.argv
    roots = args or ['src']

    if not os.path.exists(KNOWN):
        print(f'{KNOWN} not found — cannot check.')
        return 2
    known = load_known(KNOWN)

    hits = {}
    scanned = 0
    for root in roots:
        pattern = root if os.path.isfile(root) else os.path.join(root, '**', '*.tsx')
        for f in glob.glob(pattern, recursive=True):
            scanned += 1
            try:
                src = open(f).read()
            except OSError:
                continue
            for i, line in enumerate(src.split('\n'), 1):
                s = line.strip()
                if s.startswith('*') or s.startswith('//'):
                    continue
                for n in CITE.findall(line):
                    if n not in known and not HEADING.match(n):
                        hits.setdefault(n, []).append(f'{f}:{i}')

    print(f'Scanned {scanned} files against {len(known):,} verified numbers '
          f'(including parents).\n')
    if not hits:
        print('  No unverifiable regulation numbers found.')
        return 0

    total = sum(len(v) for v in hits.values())
    files = {h.rsplit(':', 1)[0] for v in hits.values() for h in v}
    print(f'  {len(hits)} number(s) not in the source data, '
          f'{total} occurrence(s) across {len(files)} file(s).')
    print('  These are LEADS. Check each against the standard before rewriting.\n')
    for n, v in sorted(hits.items(), key=lambda x: -len(x[1])):
        print(f'  Reg {n:<18} {len(v):>3} occurrence(s)')
        if show_files:
            for loc in sorted(set(v))[:6]:
                print(f'        {loc}')
    return 1


if __name__ == '__main__':
    sys.exit(main())
