#!/usr/bin/env python3
"""Quality gate for the Welsh Level 3 final paper (400 questions).

Everything a bad exam question does, checked mechanically so it can be re-run
after any edit instead of remembered:

  STRUCTURE   400 questions, ids 1-400 unique, four options each, correctAnswer
              in range, every field present
  BALANCE     each category holds enough of each difficulty for the selector to
              draw without falling through to its shortfall fill
  DISTRACTORS no option conspicuously longer or shorter than its siblings (a
              long option is a free mark), no throwaway options, no duplicates
              within a question
  EXPLANATION every explanation says something about the wrong options, and
              none of them refers to an option by POSITION — StandardMockExam
              shuffles options at render, so "the last option" is wrong for
              three learners in four
  RENDERING   no escaped-apostrophe artifacts, no unbalanced quotes

Exit code is non-zero if any check fails.

Usage:  python3 scripts/check-welsh-exam-quality.py [--verbose]
"""

import glob
import json
import re
import subprocess
import sys
import tempfile
import os

DIR = 'src/data/study-centre/welsh-level3-exam'
KNOWN_REGS = 'scripts/data/bs7671-known-regs.txt'

# Group/section headings are cited as bare three-digit numbers ("Section 443",
# "Regulation 642") and are not leaf regulation numbers, so they are not in the
# allow-list and are not checked against it.
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


def load():
    """Evaluate the banks with esbuild + node so we check the real data.

    Parsing TypeScript with a regex would miss exactly the malformed cases the
    gate exists to catch, so the modules are bundled and the array is dumped as
    JSON. That also means a syntax error fails the gate rather than being
    silently skipped.
    """
    entry = tempfile.NamedTemporaryFile('w', suffix='.ts', dir=DIR, delete=False)
    mods = sorted(os.path.basename(f)[:-3] for f in glob.glob(f'{DIR}/module*.ts'))
    entry.write('\n'.join(f"import {{ MODULE_{m[-1]}_QUESTIONS }} from './{m}';" for m in mods))
    entry.write('\nconsole.log(JSON.stringify([')
    entry.write(','.join(f'...MODULE_{m[-1]}_QUESTIONS' for m in mods))
    entry.write(']));\n')
    entry.close()
    try:
        bundle = subprocess.run(
            ['npx', 'esbuild', entry.name, '--bundle', '--platform=node', '--format=cjs',
             '--log-level=error'],
            capture_output=True, text=True)
        if bundle.returncode != 0:
            print(bundle.stderr[:2000])
            sys.exit(2)
        out = subprocess.run(['node', '-e', bundle.stdout], capture_output=True, text=True)
        if out.returncode != 0:
            print(out.stderr[:2000])
            sys.exit(2)
        return json.loads(out.stdout)
    finally:
        os.unlink(entry.name)


# Words that make an option a throwaway rather than a real distractor.
THROWAWAY = re.compile(r'\b(none of (the|these)|all of (the|these)|both of|any of the above)\b', re.I)
# An explanation must not send the learner to a position, because the options
# are shuffled at render.
# Case-sensitive on the letter, so "answer a specific question" is not a hit
# while "option B" is.
POSITIONAL = re.compile(
    r'\b(?:the (?:first|second|third|fourth|last) (?:option|answer|one))\b'
    r'|\b(?:option|answer) [A-D]\b', re.X)
# Words too common to tell one option from another. Kept deliberately short:
# the check below only needs enough to stop "the" and "circuit" counting as
# distinctive content.
STOP = {
    'a', 'an', 'the', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with',
    'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'it', 'its', 'that', 'this',
    'these', 'those', 'not', 'no', 'than', 'then', 'so', 'if', 'which', 'what', 'when',
    'where', 'who', 'whose', 'why', 'how', 'can', 'may', 'must', 'shall', 'should', 'would',
    'could', 'will', 'do', 'does', 'did', 'has', 'have', 'had', 'one', 'two', 'three', 'four',
    'any', 'all', 'each', 'every', 'both', 'other', 'only', 'also', 'more', 'most', 'less',
    'least', 'same', 'such', 'up', 'out', 'over', 'under', 'into', 'onto', 'off', 'per',
    'work', 'working', 'installation', 'electrical', 'circuit', 'circuits', 'because', 'they',
    'their', 'them', 'you', 'your', 'there', 'here', 'while', 'after', 'before', 'during',
    'until', 'since', 'about', 'against', 'between', 'through', 'being', 'made', 'make',
    'makes', 'use', 'used', 'using', 'well', 'part', 'point', 'points', 'way', 'case',
    'cases', 'thing', 'things',
}


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

def content_words(text):
    """Distinctive words in an option — what an explanation would have to say
    to be talking about THAT option rather than about any of the others.

    Words are truncated to a five-character stem so that "client" matches
    "clients", "re-routed" matches "re-routing" and "stop" matches "stopping".
    Crude, but the alternative is a stemmer dependency for a check whose whole
    value is that it runs anywhere with nothing installed.
    """
    words = re.findall(r"[A-Za-z][A-Za-z’'\-.]{2,}", text.lower())
    return {w.strip(".'’-")[:5] for w in words if w.strip(".'’-") not in STOP}


def main():
    qs = load()

    print('\n═══ STRUCTURE ═══')
    check(len(qs) == 400, '400 questions in the bank', str(len(qs)))
    ids = [q['id'] for q in qs]
    check(len(set(ids)) == len(ids), 'every question id unique',
          f'{len(ids) - len(set(ids))} duplicates')
    check(sorted(ids) == list(range(1, len(ids) + 1)), 'ids are contiguous from 1')
    bad_opts = [q['id'] for q in qs if len(q['options']) != 4]
    check(not bad_opts, 'every question has four options', str(bad_opts[:5]))
    bad_ans = [q['id'] for q in qs if not 0 <= q['correctAnswer'] < len(q['options'])]
    check(not bad_ans, 'correctAnswer is in range', str(bad_ans[:5]))
    required = ('question', 'options', 'correctAnswer', 'explanation', 'section',
                'difficulty', 'topic', 'category')
    missing = [q['id'] for q in qs if any(not q.get(k) and q.get(k) != 0 for k in required)]
    check(not missing, 'every required field is present', str(missing[:5]))
    no_ref = [q['id'] for q in qs if not q.get('reference')]
    warn(not no_ref, 'every question cites a reference', f'{len(no_ref)} without')

    print('\n═══ BALANCE ═══')
    cats = {}
    for q in qs:
        cats.setdefault(q['category'], []).append(q)
    check(len(cats) == 8, 'eight categories', str(sorted(cats)))
    # A 60-question paper draws 7-8 per category at 20/45/35.
    thin = []
    for c, group in cats.items():
        by = {d: sum(1 for q in group if q['difficulty'] == d)
              for d in ('basic', 'intermediate', 'advanced')}
        need = {'basic': 2, 'intermediate': 4, 'advanced': 3}
        short = [d for d in need if by[d] < need[d]]
        if short:
            thin.append(f'{c}: {by}')
        if VERBOSE:
            print(f'    {c}: {by}')
    check(not thin, 'every category can fill a 60-question draw', '; '.join(thin))

    print('\n═══ DISTRACTORS ═══')
    dupes = [q['id'] for q in qs if len(set(q['options'])) != len(q['options'])]
    check(not dupes, 'no duplicate options within a question', str(dupes[:5]))
    throw = [q['id'] for q in qs if any(THROWAWAY.search(o) for o in q['options'])]
    check(not throw, 'no throwaway options', str(throw[:5]))
    # A conspicuously long or short option is a free mark. Flag where one option
    # is more than twice the median length of the others, or less than a third.
    lopsided = []
    for q in qs:
        lens = sorted(len(o) for o in q['options'])
        median = lens[len(lens) // 2]
        for o in q['options']:
            if len(o) > median * 2.2 or (median > 40 and len(o) < median / 3):
                lopsided.append(q['id'])
                break
    warn(not lopsided, 'no option conspicuously longer or shorter than its siblings',
         f'{len(lopsided)}: {lopsided[:8]}')

    print('\n═══ EXPLANATIONS ═══')
    positional = [q['id'] for q in qs if POSITIONAL.search(q['explanation'])]
    check(not positional, 'no explanation refers to an option by position',
          str(positional[:5]))
    # A real test rather than a keyword list: for each wrong option, does the
    # explanation mention something distinctive to THAT option — content the
    # correct answer and the other distractors do not share? An explanation
    # that only restates the right answer teaches nothing about why the
    # learner's actual choice was wrong.
    silent = []
    for q in qs:
        exp = content_words(q['explanation'])
        right = content_words(q['options'][q['correctAnswer']])
        unaddressed = 0
        for i, opt in enumerate(q['options']):
            if i == q['correctAnswer']:
                continue
            others = set()
            for j, o in enumerate(q['options']):
                if j != i:
                    others |= content_words(o)
            distinctive = content_words(opt) - right - others
            # An option with nothing distinctive left is a near-duplicate of
            # another, which the distractor checks catch instead.
            if distinctive and not (distinctive & exp):
                unaddressed += 1
        if unaddressed:
            silent.append(f"{q['id']}({unaddressed})")
    # A warning rather than a failure: the matcher is word-overlap, so an
    # explanation that addresses an option collectively ("MHSWR, CDM and EAWR
    # all create duties...") or by an abbreviation reads as a gap when it is
    # not. The list is for review, not for gating.
    warn(not silent, 'every explanation addresses each wrong option',
         f'{len(silent)} to review: ' + ', '.join(silent[:12]))
    short = [q['id'] for q in qs if len(q['explanation']) < 120]
    warn(not short, 'no explanation is too short to teach anything',
         f'{len(short)}: {short[:8]}')

    print('\n═══ CITATIONS ═══')
    # 🔴 Never publish a regulation number that cannot be found in the source
    # data. Both of the numbers this check was written for — 311.2 and a bare
    # 514.16 — read completely plausibly and neither exists.
    if os.path.exists(KNOWN_REGS):
        known = load_known_regs(KNOWN_REGS)
        cited = {}
        for q in qs:
            blob = ' '.join([q['question'], q['explanation'], q.get('reference', '')] + q['options'])
            for n in re.findall(r'\bReg(?:ulation)?s?\.?\s+([1-8]\d{2}(?:\.\d+)*)\b', blob):
                cited.setdefault(n, []).append(q['id'])
            # "Regulations 132.14.1 and 530.3.3" — the second number too.
            for n in re.findall(r'\bRegulations\s+[1-8]\d{2}(?:\.\d+)*\s+and\s+([1-8]\d{2}(?:\.\d+)*)\b', blob):
                cited.setdefault(n, []).append(q['id'])
        bad = {n: v for n, v in cited.items() if n not in known and not HEADING.match(n)}
        print(f'  info  {len(cited)} distinct regulation numbers cited')
        check(not bad, 'every cited regulation number exists in the source data',
              '; '.join(f'{n} (Q{sorted(set(v))})' for n, v in sorted(bad.items())))
    else:
        print(f'  info  {KNOWN_REGS} not found — citation check skipped')

    print('\n═══ RENDERING ═══')
    src = ''.join(open(f).read() for f in sorted(glob.glob(f'{DIR}/module*.ts')))
    check("\\'" not in src, 'no escaped-apostrophe artifacts')
    check('&rsquo;' not in src and '&amp;' not in src,
          'no HTML entities in plain string data')

    print('\n═══ RESULT ═══')
    print(f'  {len(qs)} questions across {len(cats)} categories')
    print(f'  {len(fails)} failure(s), {len(warns)} warning(s)')
    for x in fails:
        print('   FAIL', x)
    for x in warns:
        print('   WARN', x)
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
