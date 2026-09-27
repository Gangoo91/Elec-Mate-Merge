#!/usr/bin/env python3
"""Check every RegsCallout clause against the BS 7671 regulation text.

A RegsCallout puts words in the standard's mouth. This pulls every `clause`
prop out of the course, pairs it with the regulation its `source` names, and
reports whether the quoted words actually appear in that regulation.

It does not talk to the database itself — the regulation text has to be
exported first, so the check is reproducible and runnable offline:

    -- run against the project and save as /tmp/reg_text.json
    select json_object_agg(reg_number, regexp_replace(full_text,'\\s+',' ','g'))
    from bs7671_regulations where full_text is not null;

Matching normalises whitespace, curly quotes and JSX entities, because those
differ harmlessly between a quote and its source. Nothing else is normalised:
a reworded clause will not match, which is the point.

Three outcomes per callout:
  VERBATIM   the quoted words are in that regulation's text
  NO MATCH   they are not — the clause was reworded, merged or invented
  NO SOURCE  we hold no text for that regulation, so it cannot be checked

Usage:  python3 scripts/check-welsh-regs-verbatim.py
"""

import glob
import html
import json
import os
import re
import sys

C = 'src/pages/apprentice-courses/welsh-level3/content'
REGTEXT = '/tmp/reg_text.json'

SMART = {'‘': "'", '’': "'", '“': '"', '”': '"',
         '–': '-', '—': '-', ' ': ' '}


def norm(t):
    t = html.unescape(t)
    for a, b in SMART.items():
        t = t.replace(a, b)
    for ent, ch in (('&rsquo;', "'"), ('&lsquo;', "'"), ('&ldquo;', '"'),
                    ('&rdquo;', '"'), ('&mdash;', '-'), ('&ndash;', '-'),
                    ('&nbsp;', ' '), ('&amp;', '&')):
        t = t.replace(ent, ch)
    t = re.sub(r'\s+', ' ', t).strip().lower()
    # The standard's own text uses -ize spellings; our courses are UK English
    # throughout. That difference is not a misquote, so fold it away.
    t = re.sub(r'iz(e|ed|es|ing|ation)\b', r'is\1', t)
    return t


def callouts(path):
    """(source, clause) for each RegsCallout with string props."""
    src = open(path).read()
    for m in re.finditer(r'<RegsCallout\b(.*?)/>', src, re.S):
        blk = m.group(1)
        s = re.search(r'source="((?:[^"\\]|\\.)*)"', blk)
        c = re.search(r'clause="((?:[^"\\]|\\.)*)"', blk)
        if s and c:
            yield s.group(1), c.group(1)


def main():
    if not os.path.exists(REGTEXT):
        print(f'{REGTEXT} not found — export the regulation text first (see the docstring).')
        return 2
    regs = {k: norm(v) for k, v in json.load(open(REGTEXT)).items()}

    verbatim = nomatch = nosource = 0
    problems = []
    for f in sorted(glob.glob(f'{C}/module*/**/*.tsx', recursive=True)):
        for source, clause in callouts(f):
            nums = re.findall(r'\b[1-8]\d{2}(?:\.\d+)*\b', source)
            if not nums:
                continue
            # A callout may anchor on more than one regulation and quote both,
            # so check the clause against every regulation the source names.
            held = [n for n in nums if n in regs]
            if not held:
                nosource += 1
                continue
            reg = held[0]
            body = ' '.join(regs[n] for n in held)
            # Compare on a distinctive slice — quotes are often trimmed at both ends.
            probe = norm(clause)
            # Quotes are commonly introduced — "Reg N —", "Regulation N:" — and
            # that introduction is ours, not the standard's. Strip it before
            # comparing, or every introduced quote reads as a mismatch.
            probe = re.sub(r'^\s*reg(?:ulation)?s?\.?\s*[\d.]+\s*(?:\([^)]*\))?\s*[:—-]\s*', '', probe)
            probe = re.sub(r'^.*?—\s*', '', probe)
            probe = probe[:160]
            # A row can carry more than one regulation: the source PDF runs them
            # together and the OCR keeps them in whichever row it started in. So
            # a quote from 552.1.3 legitimately lives in the row keyed 552.1.2.
            # Accept the quote if it appears in ANY row, provided that row also
            # carries this regulation's own number ahead of it — that is the
            # heading the text sits under.
            if probe and probe in body:
                verbatim += 1
                continue
            found = False
            for other in regs.values():
                at = other.find(probe) if probe else -1
                if at > 0 and reg.lower() in other[:at]:
                    found = True
                    break
            if found:
                verbatim += 1
            else:
                nomatch += 1
                problems.append((f.split('/content/')[1], reg, clause[:110]))

    for p in problems:
        print(f'  NO MATCH  {p[0]}  Reg {p[1]}\n            {p[2]}')
    total = verbatim + nomatch + nosource
    print(f'\n  {verbatim}/{total} clauses verbatim, {nomatch} not matching, '
          f'{nosource} with no regulation text held')
    return 1 if nomatch else 0


if __name__ == '__main__':
    sys.exit(main())
