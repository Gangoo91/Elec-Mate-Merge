#!/usr/bin/env python3
"""Spread the correct answer across all four positions in Welsh L3 inline checks.

The pages were authored with the correct option written first and
`correctIndex={0}`, which is the convention the Quiz component wants — Quiz
shuffles its options at render time, so the authored order never reaches a
learner.

InlineCheck does NOT shuffle. It renders `options` in the given order. So every
inline check in the course was showing its correct answer as option A, and the
English Level 2 and Level 3 courses spread theirs evenly across 0-3. A learner
spots that pattern quickly and the checks stop testing anything.

This moves the first option to a new position and updates `correctIndex` to
match. The target position is derived from a stable hash of the check's `id`,
so the result is deterministic, reproducible, and evenly spread — and re-running
the script is a no-op because it only acts on blocks still sitting at index 0.

Usage:  python3 scripts/spread-welsh-inlinecheck-answers.py [--dry-run]
"""

import glob
import hashlib
import re
import sys

ROOT = 'src/pages/apprentice-courses/welsh-level3/content'


def split_top_level(body):
    """Split a JS array body on commas that are not inside a string or bracket."""
    parts, depth, quote, buf, esc = [], 0, None, [], False
    for ch in body:
        if esc:
            buf.append(ch)
            esc = False
            continue
        if ch == '\\':
            buf.append(ch)
            esc = True
            continue
        if quote:
            buf.append(ch)
            if ch == quote:
                quote = None
            continue
        if ch in '\'"`':
            quote = ch
            buf.append(ch)
            continue
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
        if ch == ',' and depth == 0:
            parts.append(''.join(buf))
            buf = []
            continue
        buf.append(ch)
    tail = ''.join(buf)
    if tail.strip():
        parts.append(tail)
    return parts


def target_index(check_id, n):
    """Stable, evenly spread destination for the correct option."""
    digest = hashlib.sha256(check_id.encode()).digest()
    return digest[0] % n


def process(path, dry):
    src = open(path).read()
    out, pos, moved = [], 0, 0

    for m in re.finditer(r'<InlineCheck\b', src):
        start = m.start()
        if start < pos:
            continue
        # Find the end of this element — the first '/>' at bracket depth 0.
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
        block = src[start:i]

        cid = re.search(r'id="([^"]+)"', block)
        ci = re.search(r'correctIndex=\{(\d+)\}', block)
        om = re.search(r'options=\{\[', block)
        if not (cid and ci and om) or ci.group(1) != '0':
            continue

        # Locate the options array body by matching its brackets.
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
        body = block[b_start:j]

        items = [p for p in split_top_level(body) if p.strip()]
        if len(items) < 2:
            continue

        k = target_index(cid.group(1), len(items))
        if k == 0:
            continue

        stripped = [p.strip() for p in items]
        correct = stripped.pop(0)
        stripped.insert(k, correct)

        indent = '          '
        new_body = '\n' + ''.join(f'{indent}{p},\n' for p in stripped) + '        '
        new_block = block[:b_start] + new_body + block[j:]
        new_block = re.sub(r'correctIndex=\{0\}', f'correctIndex={{{k}}}', new_block, count=1)

        out.append(src[pos:start])
        out.append(new_block)
        pos = i
        moved += 1

    if not moved:
        return 0
    out.append(src[pos:])
    if not dry:
        open(path, 'w').write(''.join(out))
    return moved


def main():
    dry = '--dry-run' in sys.argv
    files = sorted(glob.glob(f'{ROOT}/**/Criterion*.tsx', recursive=True))
    total = 0
    for f in files:
        n = process(f, dry)
        total += n
    print(f'{"would move" if dry else "moved"} {total} inline-check answers '
          f'off index 0, across {len(files)} files')
    return 0


if __name__ == '__main__':
    sys.exit(main())
