#!/usr/bin/env python3
"""Port an English lesson page into the Welsh course as a content component.

The Welsh Level 3 qualification covers material our English Level 2 and Level 3
courses already teach. Rather than sending a learner out of their own course to
read it — 134 of 202 criteria did exactly that, across 170 different English
pages — this copies the teaching in, so the Welsh course stands on its own.

An English lesson is a whole page: it brings its own HubPage shell, masthead,
SEO title and prev/next footer, all of which belong to the English course's
navigation. A Welsh lesson is a content component rendered inside the Welsh
shell. So the port keeps the teaching and drops the chrome:

  kept     the doc comment, the data consts (quiz banks, check arrays), every
           component import that is really content, and the whole body from the
           first element after <HubBody> to the last before the nav block
  dropped  HubPage / HubMasthead / HubBody, useNavigate, useSEO, the Chevron
           icons, TITLE / DESCRIPTION, and the prev/next footer

Nothing is reworded. This is a move, not a rewrite — the content arrives as
already-published, already-verified teaching.

Usage:
    python3 scripts/port-english-lesson.py <source.tsx> <dest.tsx> <ComponentName>
"""

import os
import re
import sys

# Imports that exist only to build the English page shell.
DROP_MODULES = {
    '@/components/hub/HubPrimitives',
    '@/hooks/useSEO',
    'react-router-dom',
}
DROP_NAMES = {
    'HubPage', 'HubBody', 'HubMasthead', 'HubSectionHeading',
    'ChevronLeft', 'ChevronRight', 'useNavigate', 'useSEO', 'Link',
}


def split_imports(src):
    """Return (doc comment, [import statements], rest)."""
    doc = ''
    m = re.match(r'\s*/\*\*.*?\*/\s*', src, re.S)
    if m:
        doc = m.group(0).strip()
        src = src[m.end():]
    imports = []
    while True:
        m = re.match(r'\s*import\s[^;]*;\s*', src, re.S)
        if not m:
            break
        imports.append(m.group(0).strip())
        src = src[m.end():]
    return doc, imports, src


def keep_import(stmt):
    """Drop shell imports; trim shell names out of mixed named imports."""
    mod = re.search(r"from\s+'([^']+)'", stmt)
    if not mod:
        return None
    if mod.group(1) in DROP_MODULES:
        return None
    named = re.search(r'import\s*\{([^}]*)\}\s*from', stmt, re.S)
    if named:
        names = [n.strip() for n in named.group(1).split(',') if n.strip()]
        names = [n for n in names if n.split(' as ')[0].strip() not in DROP_NAMES]
        if not names:
            return None
        inner = ',\n  '.join(names)
        if len(', '.join(names)) <= 70:
            return f"import {{ {', '.join(names)} }} from '{mod.group(1)}';"
        return f"import {{\n  {inner},\n}} from '{mod.group(1)}';"
    # default or namespace import for a module we keep
    return stmt


def extract_body(src):
    """The teaching between <HubBody> and the prev/next footer."""
    i = src.find('<HubBody>')
    j = src.rfind('</HubBody>')
    if i == -1 or j == -1:
        return None
    body = src[i + len('<HubBody>'):j]
    # The footer is the grid of two nav buttons at the end of the body.
    nav = re.search(r'\n\s*\{?\s*<div className="grid grid-cols-2[^>]*>.*$', body, re.S)
    if nav:
        body = body[:nav.start()]
    # Some pages wrap the footer in a fragment or conditional instead.
    nav2 = re.search(r'\n\s*\{\s*\(?\s*(prev|next)\b.*$', body, re.S)
    if nav2:
        body = body[:nav2.start()]
    return body.rstrip()


def dedent(body, spaces=2):
    out = []
    for line in body.split('\n'):
        out.append(line[spaces:] if line.startswith(' ' * spaces) else line)
    return '\n'.join(out)


def component_start(rest):
    """Where the page component begins.

    Three forms are live in the courses: `export default function Sub1()`,
    a `const Sub5 = () => {` arrow later exported by name, and a bare
    `export default Sub5`. Falling through all of them used to return -1 and
    slice the whole file into the const block, which dragged the English page
    shell into the ported output.
    """
    for pat in (r'export default function\s', r'^const\s+\w+\s*=\s*\(\s*\)\s*=>',
                r'^function\s+\w+\s*\(\s*\)\s*\{', r'export default\s'):
        m = re.search(pat, rest, re.M)
        if m:
            return m.start()
    raise ValueError('cannot find where the component starts')


def consts(rest):
    """Top-level declarations before the component, minus SEO strings."""
    head = rest[:component_start(rest)]
    head = re.sub(r"const\s+(TITLE|DESCRIPTION)\s*=\s*'(?:[^'\\]|\\.)*';\s*", '', head)
    head = re.sub(r'const\s+(TITLE|DESCRIPTION)\s*=\s*`[^`]*`;\s*', '', head)
    return head.strip()


def port(src_path, dest_path, component):
    src = open(src_path).read()
    doc, imports, rest = split_imports(src)
    body = extract_body(rest)
    if body is None:
        return f'no <HubBody> found in {src_path}'

    kept = [k for k in (keep_import(i) for i in imports) if k]
    head = consts(rest)

    origin = src_path.replace('src/pages/apprentice-courses/', '')
    note = (
        '/**\n'
        f' * Ported from the English course: {origin}\n'
        ' *\n'
        ' * The Welsh Level 3 qualification covers this material, so the teaching is\n'
        ' * carried into this course rather than sending a learner out to read it in\n'
        ' * another one. The text is unchanged; only the page shell was removed.\n'
        ' *\n'
        ' * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.\n'
        ' */'
    )

    out = [note, '', '\n'.join(kept)]
    if head:
        out += ['', head]
    out += [
        '',
        f'export default function {component}() {{',
        '  return (',
        '    <div className="space-y-8">',
        dedent(body, 2).rstrip(),
        '    </div>',
        '  );',
        '}',
        '',
    ]
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    open(dest_path, 'w').write('\n'.join(out))
    return None


def main():
    if len(sys.argv) != 4:
        print(__doc__)
        return 2
    err = port(sys.argv[1], sys.argv[2], sys.argv[3])
    if err:
        print(err)
        return 1
    print(f'ported -> {sys.argv[2]}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
