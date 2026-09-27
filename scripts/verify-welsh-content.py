import re, os, sys, glob
import sys
D = sys.argv[1] if len(sys.argv) > 1 else 'src/pages/apprentice-courses/welsh-level3/content/'
# statutes / bodies / schemes an agent might invent. Allowed: BS 7671, CDM 2015, HSE L153.
FORBIDDEN = [
 r'Consumer Rights Act', r'Building Safety Act', r'Regulatory Reform', r'Fire Safety Order',
 r'Approved Document', r'Building Regulations Part [A-Z]', r'Electricity at Work Regulations',
 r'Health and Safety at Work', r'Environmental Protection Act', r'Data Protection Act', r'\bGDPR\b',
 r'Sale of Goods', r'Supply of Goods', r'Consumer Contracts', r'Welsh Government',
 r'Net Zero Wales', r'Well-?being of Future Generations', r'\bNICEIC\b', r'\bNAPIT\b', r'\bELECSA\b',
 r'EAL-approved', r'EAL-mapped', r'EAL approved', r'endorsed by EAL',
]
STATS = r'\b\d{1,3}(?:\.\d+)?\s?%|\b(?:19|20)\d{2}\b(?=\s*(?:target|by|deadline))'
# (filename, issue prefix) pairs that are correct as written.
#   304/lo1/Criterion1_5    — "15%" is an over-ordering allowance in a worked example.
#   304/lo2/Criterion2_2    — "15%/16%" are take-off allowances in a worked example.
#   304/lo2/Criterion2_5    — "10% contingency" is a wrong answer in a quiz option.
#   314/lo2/Criterion2_1    — two RegsCallouts, both grounded; deliberate on this page.
ACCEPTED = {
    ('304-1-5.tsx', 'possible statistic'),
    ('304-2-2.tsx', 'possible statistic'),
    ('304-2-5.tsx', 'possible statistic'),
    ('314-2-1.tsx', 'RegsCallout=2 want 1'),
}


# A page in the second writing phase is derived from an existing, already
# published English lesson. Naming a statute is still banned when it is recall
# — but not when the source lesson we wrote the page from names it, because
# then the claim is exactly as sound as the content we already ship. The
# manifest records which sources each criterion was written from.
_MANIFEST_PATH = '/tmp/welsh_write_manifest.json'
_MANIFEST = {}
if os.path.exists(_MANIFEST_PATH):
    import json as _json
    _MANIFEST = _json.load(open(_MANIFEST_PATH))
_SRC_CACHE = {}

def in_source(rel, pattern):
    """True if this lesson's source lessons contain the pattern themselves."""
    entry = _MANIFEST.get(os.path.basename(rel).replace('.tsx', ''))
    if not entry:
        return False
    for sp in entry.get('sources', []):
        if sp not in _SRC_CACHE:
            _SRC_CACHE[sp] = open(sp).read() if os.path.exists(sp) else ''
        if re.search(pattern, _SRC_CACHE[sp], re.I):
            return True
    return False

issues_total=0
for p in sorted((glob.glob(D+'**/*.tsx', recursive=True) or glob.glob(D+'*.tsx'))):
    t=open(p).read(); n=os.path.basename(p); iss=[]
    # Ported pages are published English lessons moved across intact. They
    # follow their own course's conventions, which are valid but different
    # from the brief these checks encode, so the checks do not apply to them.
    if 'Ported from the English course' in t:
        continue
    rel='/'.join(p.replace(os.sep,'/').split('/')[-3:])  # module/section/file
    def c(pat): return len(re.findall(pat,t))
    counts={'ConceptBlock':c('<ConceptBlock'),'InlineCheck':c('<InlineCheck'),
            'RegsCallout':c('<RegsCallout'),'CommonMistake':c('<CommonMistake'),
            'Scenario':c('<Scenario'),'KeyTakeaways':c('<KeyTakeaways'),'FAQ':c('<FAQ'),'Quiz':c('<Quiz')}
    want={'ConceptBlock':8,'InlineCheck':3,'RegsCallout':1,'CommonMistake':1,'Scenario':1,'KeyTakeaways':1,'FAQ':1,'Quiz':1}
    for k,v in want.items():
        if k=='ConceptBlock':
            if not (8 <= counts[k] <= 10): iss.append(f"ConceptBlock={counts[k]} want 8-10")
        elif counts[k]!=v: iss.append(f"{k}={counts[k]} want {v}")
    m=re.search(r'const quizQuestions[^=]*=\s*\[', t)
    if not m: iss.append('NO quizQuestions')
    else:
        i=m.end()-1; d=0
        for j in range(i,len(t)):
            if t[j]=='[': d+=1
            elif t[j]==']':
                d-=1
                if d==0: break
        body=t[i:j]
        nq=len(re.findall(r'^\s*question:\s', body, re.M))  # line-initial only; 'question:' also occurs in prose
        if nq!=8: iss.append(f'quiz={nq} want 8')
        bad=len(re.findall(r'correctAnswer:\s*(?!0\b)\d+',body))
        if bad: iss.append(f'{bad} quiz answers not index 0')
    # the options-array close trap
    if re.search(r'options=\{\[[^\]]*\n\s*\],', t): iss.append('OPTIONS ARRAY CLOSES WITH ], NOT ]}')
    # strip the mandated 'never say EAL-approved' warning line before scanning
    scan = re.sub(r'.*Never describe this content as EAL.*', '', t)
    for f in FORBIDDEN:
        if re.search(f, scan, re.I) and not in_source(rel, f):
            iss.append(f'FORBIDDEN: {f}')
    st=re.findall(STATS,t)
    if st: iss.append(f'possible statistic: {st[:3]}')
    if 'text-white' not in t and '<ul' in t: iss.append('ul without text-white')
    # 🔴 placeholder literals copied straight out of the brief — two agents shipped these
    for ph in [r'outcomes=\{\[\d+\]\}', r'points=\{\[[\d\- ]+\]\}', r'\{question,\s*answer\}',
               r'exactly \d+', r'\bTODO\b', r'\.\.\.\s*\]']:
        if re.search(ph, t): iss.append(f'PLACEHOLDER LEFT IN: {ph}')
    # component prop shapes agents invent
    if re.search(r'<RegsCallout(?![^>]*meaning=)[^/>]*>', t): iss.append('RegsCallout missing meaning= (children form?)')
    if re.search(r'<CommonMistake(?![^/>]*whatHappens=)[^/>]*>', t): iss.append('CommonMistake missing whatHappens=')
    if re.search(r'<Scenario(?![^/>]*situation=)[^/>]*>', t): iss.append('Scenario missing situation=')
    if re.search(r"import (InlineCheck|Quiz) from", t): iss.append('default import — must be named { }')
    # InlineCheck does NOT shuffle its options — it renders them in the order
    # given. A page whose checks all sit at index 0 teaches the learner that
    # the first answer is always right. Quiz is exempt: it shuffles at render,
    # so `correctAnswer: 0` is the correct authoring convention there.
    # House rhythm, measured against all 214 English Level 3 pages: every one
    # opens TLDR then LearningOutcomes, and closes FAQ then KeyTakeaways then
    # Quiz. The Welsh pages were built the other way round on both counts,
    # which is what made them read as a different product.
    # Section labels. English Level 3 pages carry a median of six ContentEyebrow
    # headings breaking the lesson into named parts; without them the body reads
    # as an unbroken run of ConceptBlocks, which is what made these pages feel
    # like a different product.
    if len(re.findall(r'<ContentEyebrow\b', t)) < 4:
        iss.append('fewer than 4 ContentEyebrow section labels')

    seq = [m.group(1) for m in re.finditer(r'<(TLDR|LearningOutcomes|FAQ|KeyTakeaways)\b', t)]
    if 'TLDR' in seq and 'LearningOutcomes' in seq and seq.index('TLDR') > seq.index('LearningOutcomes'):
        iss.append('TLDR must come before LearningOutcomes')
    if 'FAQ' in seq and 'KeyTakeaways' in seq and seq.index('FAQ') > seq.index('KeyTakeaways'):
        iss.append('FAQ must come before KeyTakeaways')

    ci = re.findall(r'correctIndex=\{(\d)\}', t)
    if len(ci) >= 3 and len(set(ci)) == 1:
        iss.append(f'all {len(ci)} InlineCheck answers at index {ci[0]} — vary them')
    # Reviewed exceptions. Each was checked by hand and is correct as written;
    # they sit here so the gate reports zero and a real regression is visible,
    # rather than being lost in a permanent tail of known noise.
    iss = [i for i in iss if (os.path.basename(rel), i.split(':')[0]) not in ACCEPTED]
    print(f"{n:16} {len(t.splitlines()):>4} lines  " + ('OK' if not iss else ' | '.join(iss)))
    issues_total += len(iss)
print(f"\n{issues_total} issue(s) across {len((glob.glob(D+'**/*.tsx', recursive=True) or glob.glob(D+'*.tsx')))} file(s)")
