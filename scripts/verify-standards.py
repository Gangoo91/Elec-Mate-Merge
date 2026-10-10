#!/usr/bin/env python3
"""
Check standard and regulation numbers against the RAG and the source texts.

Andrew, 10 Oct 2026: "use the RAG to check against too for BS numbers and the
info we find from the internet". Every BS / EN / ISO / IEC number and every
BS 7671 regulation number a page cites goes through this before the page is
installed.

    python3 scripts/verify-standards.py <page.tsx | dir | terms.txt> [--sources <dir of .txt>]

For each term it reports:
  - BS 7671 reg numbers: whether the number exists (bs7671_known_reg_numbers)
    and the A4:2026 wording that mentions it (bs7671_facets, active editions only;
    never bs7671_regulations, which is the stale A3 table)
  - standards: how many rows mention it in the BS 7671 chunks/facets and the
    trade knowledge tables, with one snippet
  - whether it appears in the downloaded source extracts (--sources)

Verdict per term:
  RAG       found in the RAG — read the snippet, then cite
  SOURCE    only in the downloaded sources — fine to cite if the source is the
            publisher's own document (check INDEX.md)
  NOT FOUND neither — confirm on the publisher's site (e.g. BSI) or remove it

It is read-only. One query for the whole batch, through the Supabase CLI.
"""
import argparse
import csv
import io
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

STD = re.compile(
    r'\b(?:BS\s?EN(?:\s?ISO|\s?IEC)?|BS\s?ISO|BS\s?IEC|ISO(?:/IEC)?|IEC|EN|ASHRAE|BS)\s?\d{2,5}(?:[-–]\d+)*(?::\d{4})?'
)
REG = re.compile(r'\b(?:Regulation|Reg\.?)\s+(\d{3}(?:\.\d+)*)|\b(\d{3}\.\d+(?:\.\d+)+)\b')


def terms_from(path: pathlib.Path):
    files = sorted(path.glob('*.tsx')) if path.is_dir() else [path]
    stds, regs = set(), set()
    for f in files:
        text = f.read_text(errors='ignore')
        if f.suffix == '.txt':
            for line in text.splitlines():
                line = line.strip()
                if not line:
                    continue
                (regs if re.fullmatch(r'\d{3}(?:\.\d+)*', line) else stds).add(line)
            continue
        text = re.sub(r'className="[^"]*"', '', text)
        stds |= {re.sub(r'\s+', ' ', m.group(0)).replace('–', '-').strip() for m in STD.finditer(text)}
        for m in REG.finditer(text):
            regs.add(m.group(1) or m.group(2))
    stds = {s for s in stds if not re.fullmatch(r'BS 7671(?::\d{4})?', s)}
    return sorted(stds), sorted(regs)


def sql_literal(s):
    return "'" + s.replace("'", "''") + "'"


def pattern(term):
    # "BS EN 60204-1" matches "BS EN 60204-1", "BS EN60204-1", "EN 60204-1:2018" …
    core = re.sub(r'^(BS\s?EN(\s?ISO|\s?IEC)?|BS\s?ISO|BS\s?IEC|ISO(/IEC)?|IEC|EN|ASHRAE|BS)\s?', '', term)
    core = re.sub(r':\d{4}$', '', core)
    return r'\m' + re.escape(core).replace(r'\-', '[-–]') + r'(\M|[:-])'


def run(sql):
    out = subprocess.run(
        ['npx', 'supabase', 'db', 'query', '--linked', '-o', 'csv', sql],
        cwd=ROOT, capture_output=True, text=True,
    )
    if out.returncode != 0:
        sys.exit('query failed:\n' + out.stderr[-2000:])
    body = out.stdout[out.stdout.find('\n') - 0 :] if out.stdout.startswith('npm') else out.stdout
    lines = [l for l in body.splitlines() if not l.startswith('npm ')]
    return list(csv.DictReader(io.StringIO('\n'.join(lines))))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('target')
    ap.add_argument('--sources')
    a = ap.parse_args()
    stds, regs = terms_from(pathlib.Path(a.target))
    if not stds and not regs:
        print('No standard or regulation numbers found.')
        return

    src_text = ''
    if a.sources:
        src_text = '\n'.join(p.read_text(errors='ignore') for p in pathlib.Path(a.sources).glob('*.txt'))

    rows = []
    if regs:
        vals = ','.join(f'({sql_literal(r)})' for r in regs)
        rows += run(f"""
with t(term) as (values {vals}),
active as (select id from public.bs7671_editions where is_active)
select t.term, 'reg' as kind,
  exists(select 1 from public.bs7671_known_reg_numbers k where k.reg_number = t.term) as known,
  (select count(*) from public.bs7671_facets f where f.edition_id in (select id from active)
     and f.content ~ ('\\m' || replace(t.term, '.', '\\.') || '\\M')) as facets,
  (select left(regexp_replace(f.content, '\\s+', ' ', 'g'), 220) from public.bs7671_facets f
     where f.edition_id in (select id from active)
       and f.content ~ ('\\m' || replace(t.term, '.', '\\.') || '\\M') limit 1) as snippet,
  -- The printed regulation text (page OCR). The register and the facets both
  -- carry OCR slips ("444.410" for 444.4.10), so a number only counts as real
  -- if it appears in the BS 7671 page text itself.
  (select count(*) from public.bs7671_embeddings b
     where b.content ~ ('(^|[^0-9.])' || replace(t.term, '.', '\\.') || '([^0-9]|$)')) as other
from t order by 1""")
    if stds:
        vals = ','.join(f'({sql_literal(s)}, {sql_literal(pattern(s))})' for s in stds)
        rows += run(f"""
with t(term, pat) as (values {vals}),
active as (select id from public.bs7671_editions where is_active)
select t.term, 'std' as kind, null as known,
  (select count(*) from public.bs7671_facets f where f.edition_id in (select id from active) and f.content ~* t.pat)
  + (select count(*) from public.bs7671_chunks c where c.edition_id in (select id from active) and c.content ~* t.pat) as facets,
  coalesce(
    (select left(regexp_replace(f.content, '\\s+', ' ', 'g'), 220) from public.bs7671_facets f
       where f.edition_id in (select id from active) and f.content ~* t.pat limit 1),
    (select left(regexp_replace(k.content, '\\s+', ' ', 'g'), 220) from (
       select content from public.safety_facets union all select content from public.maintenance_knowledge
       union all select content from public.design_knowledge union all select content from public.installation_knowledge
       union all select content from public.inspection_testing_knowledge union all select content from public.health_safety_knowledge
     ) k where k.content ~* t.pat limit 1)) as snippet,
  (select count(*) from public.safety_facets x where x.content ~* t.pat)
  + (select count(*) from public.maintenance_knowledge x where x.content ~* t.pat)
  + (select count(*) from public.design_knowledge x where x.content ~* t.pat)
  + (select count(*) from public.installation_knowledge x where x.content ~* t.pat)
  + (select count(*) from public.inspection_testing_knowledge x where x.content ~* t.pat)
  + (select count(*) from public.health_safety_knowledge x where x.content ~* t.pat) as other
from t order by 1""")

    worst = 0
    for r in rows:
        term = r['term']
        in_src = bool(src_text) and re.search(
            pattern(term).replace(r'\m', r'\b').replace(r'\M', r'\b'), src_text, re.I
        ) is not None if r['kind'] == 'std' else (term in src_text if src_text else False)
        rag = int(r['facets'] or 0) + int(r['other'] or 0)
        if r['kind'] == 'reg':
            printed = int(r['other'] or 0) > 0
            verdict = 'RAG' if printed else ('NOT IN PRINTED TEXT' if int(r['facets'] or 0) else 'NOT FOUND')
        else:
            verdict = 'RAG' if rag else ('SOURCE' if in_src else 'NOT FOUND')
        worst = max(worst, 2 if verdict.startswith('NOT') else 0)
        print(f"{verdict:18} {term:28} rag={rag:<4} src={'y' if in_src else '-'}  {r['snippet'] or ''}")
    sys.exit(1 if worst else 0)


if __name__ == '__main__':
    main()
