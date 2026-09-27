"""Repair the prop-shape faults agents reliably produce in Welsh Level 3 content pages.

Agents writing these pages consistently get four things wrong (2026-09-26 batch: 12/12):
  1. default imports for InlineCheck / Quiz instead of named
  2. <RegsCallout title=..>children</RegsCallout>  instead of source/clause/meaning/cite
  3. <CommonMistake wrong= right=> or children      instead of whatHappens/doInstead
  4. <Scenario title=..>children</Scenario>         instead of situation/whatToDo/whyItMatters
Everything here is mechanical. Content is never invented — paragraphs are moved, not written.
"""
import re, sys

def paras(seg):
    out = re.findall(r'<p[^>]*>(.*?)</p>', seg, re.S)
    return [re.sub(r'\s+', ' ', x).strip() for x in out if x.strip()]

def attr(seg, name):
    m = re.search(name + r'="([^"]*)"', seg, re.S)
    return m.group(1) if m else None

def span(t, tag, i):
    return i, t.index(f'</{tag}>', i) + len(f'</{tag}>')

def repair(t):
    t = re.sub(r"import InlineCheck from '@/components/apprentice-courses/InlineCheck';",
               "import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';", t)
    t = re.sub(r"import Quiz from '@/components/apprentice-courses/Quiz';",
               "import { Quiz } from '@/components/apprentice-courses/Quiz';", t)

    # RegsCallout in children form
    while True:
        m = re.search(r'\n(\s*)<RegsCallout(?![^>]*meaning=)([^>]*)>', t)
        if not m: break
        ind = m.group(1); i = m.start() + 1
        a, b = span(t, 'RegsCallout', i)
        seg = t[a:b]; ps = paras(seg)
        src = attr(seg, 'source') or 'BS 7671:2018+A4:2026'
        cite = attr(seg, 'cite') or 'BS 7671'
        title = attr(seg, 'title') or ''
        reg = re.search(r'Regulations? [\d.]+(?: and [\d.]+)?', ' '.join(ps) + ' ' + title)
        clause = attr(seg, 'clause') or (reg.group(0) if reg else title)
        meaning = ' '.join(ps).replace('"', '&quot;')
        t = t[:a] + (f'{ind}<RegsCallout\n{ind}  source="{src}"\n{ind}  clause="{clause}"\n'
                     f'{ind}  meaning="{meaning}"\n{ind}  cite="{cite}"\n{ind}/>') + t[b:]

    # CommonMistake
    while True:
        m = re.search(r'\n(\s*)<CommonMistake(?![^>]*whatHappens=)([^>]*)>', t)
        if not m: break
        ind = m.group(1); i = m.start() + 1
        a, b = span(t, 'CommonMistake', i)
        seg = t[a:b]
        title = attr(seg, 'title') or 'Common mistake'
        w = attr(seg, 'wrong'); r = attr(seg, 'right')
        if not (w and r):
            ps = paras(seg)
            w = ps[0] if ps else ''
            r = ' '.join(ps[1:]) if len(ps) > 1 else ''
        t = t[:a] + (f'{ind}<CommonMistake\n{ind}  title="{title}"\n'
                     f'{ind}  whatHappens={{<>{w}</>}}\n{ind}  doInstead={{<>{r}</>}}\n{ind}/>') + t[b:]

    # Scenario
    while True:
        m = re.search(r'\n(\s*)<Scenario(?![^>]*situation=)([^>]*)>', t)
        if not m: break
        ind = m.group(1); i = m.start() + 1
        a, b = span(t, 'Scenario', i)
        seg = t[a:b]
        title = attr(seg, 'title') or 'Scenario'
        ps = paras(seg)
        sit = ps[0] if ps else ''
        wtd = ' '.join(ps[1:-1]) if len(ps) > 2 else (ps[1] if len(ps) > 1 else '')
        why = ps[-1] if len(ps) > 1 else ''
        t = t[:a] + (f'{ind}<Scenario\n{ind}  title="{title}"\n{ind}  situation={{<>{sit}</>}}\n'
                     f'{ind}  whatToDo={{<>{wtd}</>}}\n{ind}  whyItMatters={{<>{why}</>}}\n{ind}/>') + t[b:]
    return t

for path in sys.argv[1:]:
    src = open(path).read()
    out = repair(src)
    if out != src:
        open(path, 'w').write(out)
        print('repaired', path.split('/')[-1])
    else:
        print('no change', path.split('/')[-1])
