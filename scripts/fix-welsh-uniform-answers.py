#!/usr/bin/env python3
"""Break up pages whose inline checks all landed on the same answer position.

`spread-welsh-inlinecheck-answers.py` distributes answers evenly across the
course, but it picks each destination independently from a hash of the check's
id. On a handful of pages all three checks come up the same by chance, which is
exactly the pattern a learner notices — so this walks any page whose checks are
uniform and moves the second and third onto different positions.

Reuses the same move-and-reindex logic, so the result stays consistent with the
rest of the course and the whole thing remains reproducible.

Usage:  python3 scripts/fix-welsh-uniform-answers.py [--dry-run]
"""

import glob
import importlib.util
import re
import sys

ROOT = 'src/pages/apprentice-courses/welsh-level3/content'

spec = importlib.util.spec_from_file_location(
    'spread', 'scripts/spread-welsh-inlinecheck-answers.py')
spread = importlib.util.module_from_spec(spec)
spec.loader.exec_module(spread)


def blocks(src):
    """Yield (start, end) for each <InlineCheck ... /> element."""
    for m in re.finditer(r'<InlineCheck\b', src):
        i, depth, quote, esc = m.end(), 0, None, False
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
                i += 2
                break
            i += 1
        yield m.start(), i


def move_answer(block, frm, to):
    """Move the option at `frm` to `to` and rewrite correctIndex."""
    om = re.search(r'options=\{\[', block)
    b_start = om.end()
    depth, j, quote, esc = 1, b_start, None, False
    while j < len(block) and depth:
        ch = block[j]
        if esc:
            esc = False
        elif ch == '\\':
            esc = True
        elif quote:
            if ch == quote:
                quote = None
        elif ch in '\'"`':
            quote = ch
        elif ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                break
        j += 1
    items = [p.strip() for p in spread.split_top_level(block[b_start:j]) if p.strip()]
    if not (0 <= frm < len(items)) or not (0 <= to < len(items)):
        return block
    items.insert(to, items.pop(frm))
    indent = '          '
    body = '\n' + ''.join(f'{indent}{p},\n' for p in items) + '        '
    out = block[:b_start] + body + block[j:]
    return re.sub(r'correctIndex=\{\d+\}', f'correctIndex={{{to}}}', out, count=1)


def process(path, dry):
    src = open(path).read()
    spans = list(blocks(src))
    idxs = []
    for a, b in spans:
        m = re.search(r'correctIndex=\{(\d)\}', src[a:b])
        idxs.append(int(m.group(1)) if m else None)
    live = [i for i in idxs if i is not None]
    if len(live) < 3 or len(set(live)) > 1:
        return 0

    current = live[0]
    # Give the 2nd and 3rd checks distinct positions away from the shared one.
    wanted = [p for p in (0, 1, 2, 3) if p != current]
    plan = {1: wanted[0], 2: wanted[1]}

    out, pos, n = [], 0, 0
    for nth, (a, b) in enumerate(spans):
        if nth not in plan or idxs[nth] is None:
            continue
        target = plan[nth]
        new = move_answer(src[a:b], current, target)
        if new != src[a:b]:
            out.append(src[pos:a])
            out.append(new)
            pos = b
            n += 1
    if n and not dry:
        out.append(src[pos:])
        open(path, 'w').write(''.join(out))
    return n


def main():
    dry = '--dry-run' in sys.argv
    total = files = 0
    for f in sorted(glob.glob(f'{ROOT}/**/Criterion*.tsx', recursive=True)):
        n = process(f, dry)
        if n:
            files += 1
            total += n
            print(f'{"would fix" if dry else "fixed"} {f.split("/content/")[1]} ({n} checks moved)')
    print(f'\n{"would move" if dry else "moved"} {total} checks across {files} uniform pages')
    return 0


if __name__ == '__main__':
    sys.exit(main())
