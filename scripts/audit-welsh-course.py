#!/usr/bin/env python3
"""One audit for the whole Welsh Level 3 course.

Everything that has gone wrong on this course at least once, checked in one
place so it can be re-run after any change instead of remembered.

  STRUCTURE    the tree, the registry and the files on disk agree
  COMPLETE     every criterion has a lesson, every lesson has a registry slot
  ONE COURSE   no language that belongs to the English course leaks through
  CORRECTNESS  regulation citations trace to the RAG extract; no invented codes
  HOUSE STYLE  the rhythm the rest of the Study Centre uses
  RENDERING    nothing that would display wrongly to a learner

Exit code is non-zero if any check fails, so it can gate a commit.

Usage:  python3 scripts/audit-welsh-course.py [--verbose]
"""

import glob
import json
import os
import re
import sys

C = 'src/pages/apprentice-courses/welsh-level3/content'
TREE = 'src/data/study-centre/welshLevel3Tree.ts'
REG = f'{C}/registry.ts'
KNOWN_REGS = 'scripts/data/bs7671-known-regs.txt'
# A bare three-digit number is a group or section heading ("Section 443",
# "Regulation 642"), not a leaf regulation, so it is not in the allow-list.
HEADING = re.compile(r'^\d{3}$')
VERBOSE = '--verbose' in sys.argv

fails, warns = [], []


def check(ok, label, detail=''):
    print(f'  {"PASS" if ok else "FAIL"}  {label}{"  — " + detail if detail and not ok else ""}')
    if not ok:
        fails.append(f'{label}: {detail}')


def warn(ok, label, detail=''):
    print(f'  {"ok  " if ok else "WARN"}  {label}{"  — " + detail if detail and not ok else ""}')
    if not ok:
        warns.append(f'{label}: {detail}')


def load_known_regs(path):
    """The allow-list, plus every parent of an entry in it.

    "Regulation 644.1" is a legitimate group reference where 644.1.1 and
    644.1.2 exist — BS 7671 numbers groups as well as leaves, and the source
    export only holds the leaves. Accepting a parent whose children exist
    keeps the check pointed at genuinely invented numbers such as 311.2,
    which has no children either.
    """
    known = {l.strip() for l in open(path) if l.strip() and not l.startswith('#')}
    parents = set()
    for r in known:
        parts = r.split('.')
        for i in range(1, len(parts)):
            parents.add('.'.join(parts[:i]))
    return known | parents

def lesson_files():
    return sorted(glob.glob(f'{C}/module*/**/*.tsx', recursive=True))


def learner_lines(path):
    """Lines a learner can see — excludes the provenance doc comment."""
    for i, l in enumerate(open(path).read().split('\n'), 1):
        s = l.strip()
        if s.startswith('*') or s.startswith('/*') or s.startswith('//'):
            continue
        yield i, l


def scan(pattern, files=None):
    hits = []
    for f in files or lesson_files():
        for i, l in learner_lines(f):
            if re.search(pattern, l):
                hits.append(f'{f.split("/content/")[1]}:{i}')
    return hits


def main():
    tree = open(TREE).read()
    reg = open(REG).read()
    files = lesson_files()

    print('\n═══ STRUCTURE ═══')
    declared = re.findall(r'slug: "([0-9]{3}e?-\d+-\d+)", unit: "([^"]+)"', tree)
    mods = len(re.findall(r'slug: "module\d+"', tree))
    secs = len(re.findall(r'slug: "section\d+"', tree))
    check(mods == 8, 'module count is 8', str(mods))
    check(secs == 41, 'section count is 41', str(secs))
    check(len(declared) == 202, 'criteria declared is 202', str(len(declared)))
    check(len(declared) == len({d[0] for d in declared}), 'every lesson slug unique')

    # section sizes
    sizes = [len(re.findall(r'criterion: "', b))
             for b in re.split(r'slug: "section\d+"', tree)[1:]]
    check(all(4 <= n <= 7 for n in sizes),
          'every section holds 4-7 lessons',
          f'min {min(sizes)} max {max(sizes)}')

    print('\n═══ COMPLETENESS ═══')
    slots = set(re.findall(r"'(module\d+/section\d+/[0-9a-z\-]+)'", reg))
    on_disk = {f.replace(f'{C}/', '').replace('.tsx', '') for f in files}
    check(slots == on_disk, 'registry slots match files on disk',
          f'{len(slots - on_disk)} slots without a file, {len(on_disk - slots)} files without a slot')
    missing = len(declared) - len(slots)
    warn(missing == 0, 'every criterion has a lesson', f'{missing} still to write')

    print('\n═══ ONE COURSE ═══')
    for label, pat in [
        ("no 'Sub N' references", r'\bSubs? ?\d'),
        ("no 'Module N' pointers", r'\bModule \d'),
        ("no 'at/in/for Level 2' framing", r'\b(at|in|for) Level 2\b'),
        ("no English qualification codes", r'\bUnit [12]\d\d\b|2365-0\d|\bAC \d\.\d\b|ELTK|\b2357\b'),
        ("no links out to another course", r'navigate\([\'"]/study-centre'),
    ]:
        h = scan(pat)
        check(not h, label, f'{len(h)} found: ' + ', '.join(h[:3]))

    print('\n═══ RENDERING ═══')
    h = scan(r"\\'")
    check(not h, 'no escaped-apostrophe artifacts', f'{len(h)} found: ' + ', '.join(h[:3]))
    h = scan(r'outcomes=\{\[\d+\]\}|points=\{\[[\d\s,\-]+\]\}|\bTODO\b')
    check(not h, 'no placeholder literals left in arrays', ', '.join(h[:3]))

    print('\n═══ HOUSE STYLE ═══')
    bad_order_a = bad_order_b = thin_eyebrow = uniform = 0
    for f in files:
        t = open(f).read()
        seq = [m.group(1) for m in re.finditer(r'<(TLDR|LearningOutcomes|FAQ|KeyTakeaways)\b', t)]
        if 'TLDR' in seq and 'LearningOutcomes' in seq and seq.index('TLDR') > seq.index('LearningOutcomes'):
            bad_order_a += 1
        if 'FAQ' in seq and 'KeyTakeaways' in seq and seq.index('FAQ') > seq.index('KeyTakeaways'):
            bad_order_b += 1
        if len(re.findall(r'<ContentEyebrow\b', t)) < 4:
            thin_eyebrow += 1
        ci = re.findall(r'correctIndex=\{(\d)\}', t)
        if len(ci) >= 3 and len(set(ci)) == 1:
            uniform += 1
    check(bad_order_a == 0, 'TLDR before LearningOutcomes everywhere', f'{bad_order_a} pages wrong')
    check(bad_order_b == 0, 'FAQ before KeyTakeaways everywhere', f'{bad_order_b} pages wrong')
    check(thin_eyebrow == 0, 'every page has 4+ section labels', f'{thin_eyebrow} pages thin')
    check(uniform == 0, 'no page has all inline-check answers in one position',
          f'{uniform} pages uniform')

    # answer spread across the course
    spread = {}
    for f in files:
        for i in re.findall(r'correctIndex=\{(\d)\}', open(f).read()):
            spread[i] = spread.get(i, 0) + 1
    if spread:
        lo, hi = min(spread.values()), max(spread.values())
        warn(hi <= lo * 2, 'inline-check answers evenly spread',
             ' '.join(f'{k}:{v}' for k, v in sorted(spread.items())))

    print('\n═══ CORRECTNESS ═══')
    unverified = set()
    path = '/tmp/unverified_regs.json'
    if os.path.exists(path):
        unverified = set(json.load(open(path)))
    cited = set()
    for f in files:
        for i, l in learner_lines(f):
            cited |= set(re.findall(r'\bReg(?:ulation)?s?\.?\s+([1-7]\d{2}(?:\.\d+)*)', l))
    print(f'  info  {len(cited)} distinct BS 7671 regulations cited')
    if unverified:
        still = sorted(cited & unverified)
        warn(not still, 'all cited regulations trace to the RAG extract',
             f'{len(still)} unverified: {", ".join(still)}')
    else:
        print('  info  no /tmp/unverified_regs.json — regulation trace not re-run')

    # 🔴 A regulation number that is not in the source data has been invented,
    # however plausible it reads. This check exists because the course shipped
    # "Reg 311.2" (no such regulation — load curtailment is 722.311.201) and a
    # bare "Reg 514.16" for single-pole switching (514.16.1 is the SPD label;
    # the real one is 132.14.1).
    if os.path.exists(KNOWN_REGS):
        known = load_known_regs(KNOWN_REGS)
        invented = {}
        for f in files:
            for i, l in learner_lines(f):
                for n in re.findall(r'\bReg(?:ulation)?s?\.?\s+([1-8]\d{2}(?:\.\d+)*)\b', l):
                    if n not in known and not HEADING.match(n):
                        invented.setdefault(n, []).append(f'{f.split("/content/")[1]}:{i}')
        check(not invented, 'every cited regulation number exists in the source data',
              '; '.join(f'{n} x{len(v)}' for n, v in sorted(invented.items())))
    else:
        print(f'  info  {KNOWN_REGS} not found — citation check skipped')

    print('\n═══ RESULT ═══')
    print(f'  {len(files)} lesson files, '
          f'{sum(len(open(f).readlines()) for f in files):,} lines')
    print(f'  {len(fails)} failure(s), {len(warns)} warning(s)')
    for x in fails:
        print('   FAIL', x)
    for x in warns:
        print('   WARN', x)
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
