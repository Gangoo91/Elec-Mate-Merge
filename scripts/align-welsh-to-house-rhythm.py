#!/usr/bin/env python3
"""Bring the Welsh L3 pages into the same rhythm as the rest of the Study Centre.

Measured against all 214 English Level 3 lesson pages, the Welsh pages diverged
in three ways that make them read as a different product:

  1. Opening order. Every English page opens TLDR then LearningOutcomes.
     All 64 Welsh pages did the reverse.
  2. Closing order. Every English page closes FAQ then KeyTakeaways then Quiz.
     All 64 Welsh pages had KeyTakeaways before FAQ.
  3. Section labelling. English pages carry a median of 6 ContentEyebrow
     labels breaking the lesson into named parts; the Welsh pages carried one,
     at the very end. "Where it goes wrong" is the house label before a
     CommonMistake — it appears 92 times across the English course — and the
     CommonMistake/Scenario pair sits under it.

This fixes all three. It moves whole elements rather than rewriting them, so no
teaching text changes; only the order and the section labels do.

Usage:  python3 scripts/align-welsh-to-house-rhythm.py [--dry-run]
"""

import glob
import re
import sys

ROOT = 'src/pages/apprentice-courses/welsh-level3/content'
EYEBROW = '      <ContentEyebrow>Where it goes wrong</ContentEyebrow>\n'


def element(src, name, start=0):
    """(start, end) of the first <Name ... /> or <Name ...>...</Name> element."""
    m = re.search(rf'<{name}\b', src[start:])
    if not m:
        return None
    a = start + m.start()
    i, depth, quote, esc = start + m.end(), 0, None, False
    while i < len(src):
        ch = src[i]
        if esc:
            esc = False
        elif ch == '\\':
            esc = True
        elif quote:
            if ch == quote:
                quote = None
        elif ch in '\'"`':
            quote = ch
        elif ch in '{[(':
            depth += 1
        elif ch in '}])':
            depth -= 1
        elif ch == '/' and depth == 0 and src[i:i + 2] == '/>':
            return a, i + 2
        elif ch == '>' and depth == 0:
            close = src.find(f'</{name}>', i)
            if close == -1:
                return a, i + 1
            return a, close + len(name) + 3
        i += 1
    return None


def line_span(src, a, b):
    """Widen a span to whole lines so moves keep the indentation intact."""
    s = src.rfind('\n', 0, a) + 1
    e = src.find('\n', b)
    return s, (len(src) if e == -1 else e + 1)


def swap(src, first_name, second_name):
    """Ensure first_name appears before second_name; move if it does not."""
    f, s = element(src, first_name), element(src, second_name)
    if not f or not s or f[0] < s[0]:
        return src, False
    fa, fb = line_span(src, *f)
    sa, sb = line_span(src, *s)
    if not (sb <= fa):
        return src, False
    later, earlier = src[fa:fb], src[sa:sb]
    return src[:sa] + later + src[sb:fa] + earlier + src[fb:], True


def process(path, dry):
    src = open(path).read()
    orig = src
    notes = []

    src, did = swap(src, 'TLDR', 'LearningOutcomes')
    if did:
        notes.append('TLDR first')
    src, did = swap(src, 'FAQ', 'KeyTakeaways')
    if did:
        notes.append('FAQ before KeyTakeaways')

    if '<ContentEyebrow>Where it goes wrong</ContentEyebrow>' not in src:
        cm = element(src, 'CommonMistake')
        if cm:
            a, _ = line_span(src, *cm)
            src = src[:a] + EYEBROW + '\n' + src[a:]
            notes.append('+ eyebrow')

    if src != orig and not dry:
        open(path, 'w').write(src)
    return notes


def main():
    dry = '--dry-run' in sys.argv
    changed = 0
    for f in sorted(glob.glob(f'{ROOT}/**/Criterion*.tsx', recursive=True)):
        n = process(f, dry)
        if n:
            changed += 1
            print(f'{f.split("/content/")[1]:34} {", ".join(n)}')
    print(f'\n{"would change" if dry else "changed"} {changed} pages')
    return 0


if __name__ == '__main__':
    sys.exit(main())
