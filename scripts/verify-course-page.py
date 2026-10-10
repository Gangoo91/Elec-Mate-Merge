#!/usr/bin/env python3
"""
Mechanical gate for rewritten Study Centre lesson pages (CPD course rebuilds).

Run on drafts BEFORE reading them, and again on the repo after installing:

    python3 scripts/verify-course-page.py <file-or-dir> [--sources <dir-of-txt>] [--allow <file>]

It does not judge teaching quality or technical truth — that is the main
session's job. It catches the things writers reliably get wrong:

  - wrong import shapes (default imports of named components)
  - invented prop shapes on the learning primitives
  - placeholder literals left in from a brief (e.g. `{[5]}`)
  - quiz shape: exactly 10 questions, 4 options each, a valid correctIndex,
    an explanation, and correct answers not bunched in one position
  - InlineChecks passed `answer=` (renders unanswerable) or missing options
  - grey text, hardcoded old backgrounds, US spellings
  - every standard / regulation number and every percentage, listed for
    checking against sources (writers invent these)
  - optional: 9-word shingle overlap with source text (lifting check)

Exit code is non-zero when any page FAILS. WARN lines are for review.
"""
import re
import sys
import pathlib
import argparse

REQUIRED = {
    'TLDR': 1,
    'LearningOutcomes': 1,
    'ConceptBlock': 4,
    'InlineCheck': 3,
    'KeyTakeaways': 1,
    'FAQ': 1,
    'Quiz': 1,
}
NAMED_FROM = {
    'InlineCheck': '@/components/apprentice-courses/InlineCheck',
    'Quiz': '@/components/apprentice-courses/Quiz',
}
PROPS = {
    'RegsCallout': (['source', 'clause'], []),
    'CommonMistake': (['title', 'whatHappens', 'doInstead'], []),
    'Scenario': (['title', 'situation', 'whatToDo'], []),
    'ConceptBlock': (['title'], []),
    'VideoCard': (['url', 'title'], []),
}
US = [
    r'\bcolor', r'\bcenter(s|ed)?\b', r'\borganiz', r'\banalyz', r'\bbehavior', r'\bcatalog\b',
    r'\bgray\b', r'\blabor\b', r'\bfavor', r'\bmodeling\b', r'\btraveled\b', r'\blicense\b(?! plate)',
    r'\bdefense\b', r'\bfulfill\b', r'\bprogram(?!m)(?:s|me)?\b(?=[^a-z]*(?:of|for) (?:work|training))',
    r'\boptimiz', r'\bminimiz', r'\bmaximiz', r'\butiliz', r'\bstandardiz', r'\bprioritiz',
    r'\bsynchroniz', r'\bcategoriz', r'\bcustomiz', r'\bauthoriz', r'\brecogniz', r'\bspecializ',
]
STD = re.compile(
    r'\b(?:BS\s?EN(?:\s?ISO|\s?IEC)?|BS\s?ISO|BS\s?IEC|ISO(?:/IEC)?|IEC|EN|ASHRAE|ANSI|NFPA|BS)\s?\d{2,5}(?:[-–]\d+)*(?::\d{4})?',
)
REG = re.compile(r'\b(?:Regulation|Reg\.?|Regs\.?)\s+\d{3}(?:\.\d+)*|\b(?:Section|Chapter|Part)\s+\d{3}\b|\b\d{3}\.\d+(?:\.\d+)+\b')
PCT = re.compile(r'\b\d+(?:\.\d+)?\s?(?:%|per ?cent)')


def strip_comments(src: str) -> str:
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    return re.sub(r'(?m)^\s*//.*$', '', src)


def tags(src, name):
    """Every <Name ...> opening tag with its attributes (handles nested braces)."""
    out = []
    for m in re.finditer(r'<' + name + r'\b', src):
        i, depth, j = m.end(), 0, m.end()
        while j < len(src):
            c = src[j]
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
            elif c == '>' and depth == 0:
                break
            j += 1
        out.append(src[i:j])
    return out


def quiz_questions(src):
    m = re.search(r'const\s+quizQuestions\s*(?::[^=]+)?=\s*\[', src)
    if not m:
        return None
    i, depth = m.end() - 1, 0
    for j in range(i, len(src)):
        if src[j] == '[':
            depth += 1
        elif src[j] == ']':
            depth -= 1
            if depth == 0:
                body = src[i + 1 : j]
                break
    else:
        return None
    qs, depth, start = [], 0, None
    for k, c in enumerate(body):
        if c == '{':
            if depth == 0:
                start = k
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0 and start is not None:
                qs.append(body[start : k + 1])
    return qs


def shingles(text, n=9):
    words = re.findall(r"[a-z0-9']+", text.lower())
    return {' '.join(words[i : i + n]) for i in range(len(words) - n + 1)}


def check(path: pathlib.Path, src_shingles, allow):
    raw = path.read_text()
    src = strip_comments(raw)
    fails, warns, notes = [], [], []
    lines = raw.count('\n') + 1
    if not 550 <= lines <= 1200:
        warns.append(f'length {lines} lines (expected roughly 700–1000)')

    for name, n in REQUIRED.items():
        c = len(re.findall(r'<' + name + r'\b', src))
        if c < n:
            fails.append(f'needs at least {n} <{name}>, found {c}')
    if not re.search(r'<(Scenario|CommonMistake)\b', src):
        fails.append('needs at least one <Scenario> or <CommonMistake>')

    for comp, mod in NAMED_FROM.items():
        if re.search(r'import\s+' + comp + r'\s+from', src):
            fails.append(f'default import of {comp}; use `import {{ {comp} }} from \'{mod}\'`')
    if re.search(r"import\s+\w+\s+from\s+'@/components/study-centre/learning'", src):
        fails.append('default import from study-centre/learning; named imports only')

    for comp, (req, _) in PROPS.items():
        for attrs in tags(src, comp):
            if re.search(r'\{\s*\.\.\.', attrs):
                continue  # props spread from a library entry (e.g. {...videos.key})
            for p in req:
                if not re.search(r'\b' + p + r'\s*=', attrs):
                    fails.append(f'<{comp}> missing prop `{p}`')
    for attrs in tags(src, 'InlineCheck'):
        if re.search(r'\banswer\s*=', attrs):
            fails.append('<InlineCheck answer=…> does not exist; use options + correctIndex')
        if not re.search(r'\boptions\s*=', attrs) or not re.search(r'\bcorrectIndex\s*=', attrs):
            fails.append('<InlineCheck> needs options and correctIndex')
        if not re.search(r'\bid\s*=', attrs):
            fails.append('<InlineCheck> needs a unique id')
        if not re.search(r'\bexplanation\s*=', attrs):
            warns.append('<InlineCheck> has no explanation')

    for bad, why in [
        (r'\{\s*\[\s*\d+\s*\]\s*\}', 'placeholder literal like {[5]}'),
        (r'\bTODO\b|\bTBC\b|\bTBD\b|lorem ipsum|\bXX+\b', 'placeholder text'),
        (r'text-white/\d|text-gray-|text-muted|text-neutral-[34]', 'grey text (all text is text-white)'),
        (r'bg-\[#1a1a1a\]|bg-\[#121212\]', 'hardcoded old page background'),
        (r'bg-elec-yellow/\[?0?\.?\d', 'translucent yellow fill (renders brown)'),
    ]:
        for m in re.finditer(bad, src, re.I):
            fails.append(f'{why}: "{m.group(0)}" (line {src[: m.start()].count(chr(10)) + 1})')

    qs = quiz_questions(src)
    if qs is None:
        fails.append('no `const quizQuestions = [...]` found')
    else:
        if len(qs) != 10:
            fails.append(f'quiz has {len(qs)} questions; must be exactly 10')
        positions = []
        for q in qs:
            opts = re.search(r'options\s*:\s*\[(.*?)\]\s*,', q, re.S)
            n_opts = len(re.findall(r"(?:'(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\"|`[^`]*`)\s*,?", opts.group(1))) if opts else 0
            ci = re.search(r'correctIndex\s*:\s*(\d+)', q)
            qid = re.search(r'id\s*:\s*(\d+)', q)
            label = f'quiz q{qid.group(1) if qid else "?"}'
            if n_opts != 4:
                fails.append(f'{label}: {n_opts} options (need 4)')
            if not ci:
                fails.append(f'{label}: no numeric correctIndex')
            else:
                positions.append(int(ci.group(1)))
                if n_opts and int(ci.group(1)) >= n_opts:
                    fails.append(f'{label}: correctIndex out of range')
            if not re.search(r'explanation\s*:', q):
                fails.append(f'{label}: no explanation')
        if positions:
            dist = {i: positions.count(i) for i in range(4)}
            if max(dist.values()) > 4:
                warns.append(f'correct answers bunched: {dist}')
            notes.append(f'quiz answer positions {dist}')

    text_only = re.sub(r'className="[^"]*"', '', src)
    for pat in US:
        for m in re.finditer(pat, text_only, re.I):
            warns.append(f'US spelling? "{m.group(0)}" (line {text_only[: m.start()].count(chr(10)) + 1})')

    found_std = sorted({m.group(0).strip() for m in STD.finditer(text_only)})
    found_reg = sorted({m.group(0).strip() for m in REG.finditer(text_only)})
    unlisted = [s for s in found_std + found_reg if s not in allow]
    if unlisted:
        warns.append('standards/regs to verify: ' + '; '.join(unlisted))
    pcts = sorted({m.group(0) for m in PCT.finditer(text_only)})
    if pcts:
        warns.append('percentages to verify: ' + ', '.join(pcts))

    if src_shingles:
        page = shingles(re.sub(r'<[^>]+>|\{|\}|className="[^"]*"', ' ', text_only))
        hits = page & src_shingles
        if len(hits) > 5:
            fails.append(f'{len(hits)} nine-word runs match the source text (lifting); e.g. "{next(iter(hits))}"')
        elif hits:
            warns.append(f'{len(hits)} nine-word runs match the source text: ' + ' | '.join(list(hits)[:3]))

    return fails, warns, notes


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('target')
    ap.add_argument('--sources', help='dir of .txt source extracts for the lifting check')
    ap.add_argument('--allow', help='file of verified standard/reg strings, one per line')
    a = ap.parse_args()
    t = pathlib.Path(a.target)
    files = sorted(t.glob('*.tsx')) if t.is_dir() else [t]
    src_sh = set()
    if a.sources:
        for f in pathlib.Path(a.sources).glob('*.txt'):
            src_sh |= shingles(f.read_text(errors='ignore'))
    allow = set()
    if a.allow:
        allow = {l.strip() for l in pathlib.Path(a.allow).read_text().splitlines() if l.strip()}
    bad = 0
    for f in files:
        fails, warns, notes = check(f, src_sh, allow)
        status = 'FAIL' if fails else 'PASS'
        bad += bool(fails)
        print(f'\n{status}  {f.name}')
        for x in fails:
            print(f'   FAIL  {x}')
        for x in warns:
            print(f'   WARN  {x}')
        for x in notes:
            print(f'   note  {x}')
    print(f'\n{len(files) - bad}/{len(files)} pass')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
