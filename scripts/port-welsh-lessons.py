#!/usr/bin/env python3
"""Port the English lessons into the Welsh course, into the new module tree.

Reads the assignment produced earlier — each Welsh criterion paired with the
one or two English lessons that teach it, with no English lesson used twice —
and writes a Welsh content component for each.

Where a criterion takes two source lessons their bodies are concatenated with a
rule between them. That means two sets of top-level declarations land in one
file, and both will be called `quizQuestions`, so every declaration from the
second source is suffixed and its references rewritten. Without that the file
has two consts of the same name and will not compile.

Nothing is reworded anywhere. The page shell is removed and the teaching is
moved across intact.

Usage:  python3 scripts/port-welsh-lessons.py [--dry-run]
"""

import importlib.util
import json
import os
import re
import sys

spec = importlib.util.spec_from_file_location('p', 'scripts/port-english-lesson.py')
P = importlib.util.module_from_spec(spec)
spec.loader.exec_module(P)

CONTENT = 'src/pages/apprentice-courses/welsh-level3/content'


def resolve(route, idx):
    return idx.get(route) or (idx.get(route[len('level2/'):]) if route.startswith('level2/') else None)


def top_level_names(head):
    """Names declared at the top level of a source file's const block."""
    return re.findall(r'^(?:const|let|function)\s+([A-Za-z_$][\w$]*)', head, re.M)


def suffix_names(head, body, names, suffix):
    for n in names:
        head = re.sub(rf'\b{re.escape(n)}\b', f'{n}{suffix}', head)
        body = re.sub(rf'\b{re.escape(n)}\b', f'{n}{suffix}', body)
    return head, body


def merge_imports(all_imports):
    """Union of named imports per module, preserving first-seen order."""
    order, named, plain = [], {}, []
    for stmt in all_imports:
        mod = re.search(r"from\s+'([^']+)'", stmt)
        if not mod:
            continue
        m = mod.group(1)
        nm = re.search(r'import\s*\{([^}]*)\}\s*from', stmt, re.S)
        if nm:
            if m not in named:
                named[m] = []
                order.append(m)
            for n in (x.strip() for x in nm.group(1).split(',')):
                if n and n not in named[m]:
                    named[m].append(n)
        elif stmt not in plain:
            plain.append(stmt)
    out = list(plain)
    for m in order:
        names = named[m]
        one = f"import {{ {', '.join(names)} }} from '{m}';"
        out.append(one if len(one) <= 100 else
                   'import {\n  ' + ',\n  '.join(names) + f",\n}} from '{m}';")
    return out


def build(dest, component, sources, idx):
    heads, bodies, imports, origins = [], [], [], []
    for n, route in enumerate(sources):
        f = resolve(route, idx)
        if not f:
            return f'unresolved route {route}'
        src = open(f).read()
        _, imps, rest = P.split_imports(src)
        body = P.extract_body(rest)
        if body is None:
            return f'no body in {f}'
        head = P.consts(rest)
        if n > 0:
            names = top_level_names(head)
            head, body = suffix_names(head, body, names, str(n + 1))
        imports += [k for k in (P.keep_import(i) for i in imps) if k]
        heads.append(head)
        bodies.append(P.dedent(body, 2).rstrip())
        origins.append(f.replace('src/pages/apprentice-courses/', ''))

    note = ['/**']
    if len(origins) == 1:
        note.append(f' * Ported from the English course: {origins[0]}')
    else:
        note.append(' * Ported from the English course, combining:')
        note += [f' *   {o}' for o in origins]
    note += [
        ' *',
        ' * The Welsh Level 3 qualification covers this material, so the teaching is',
        ' * carried into this course rather than sending a learner out to read it in',
        ' * another one. The text is unchanged; only the page shell was removed.',
        ' *',
        ' * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.',
        ' */',
    ]

    out = ['\n'.join(note), '', '\n'.join(merge_imports(imports))]
    head = '\n\n'.join(h for h in heads if h)
    if head:
        out += ['', head]
    joined = '\n\n      <SectionRule />\n\n'.join(bodies)
    out += ['', f'export default function {component}() {{', '  return (',
            '    <div className="space-y-8">', joined, '    </div>', '  );', '}', '']
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    open(dest, 'w').write('\n'.join(out))
    return None


def main():
    dry = '--dry-run' in sys.argv
    plan = json.load(open('/tmp/port_plan.json'))
    idx = json.load(open('/tmp/route_to_file.json'))
    tree = json.load(open('/tmp/welsh_module_map.json'))

    # criterion key -> (module, section, slug)
    home = {}
    for m in tree['modules']:
        for s in m['sections']:
            for k in s['lessons']:
                unit, _, crit = k.split('/')
                home[k] = (m['number'], s['number'], f'{unit}-{crit}')

    done, errs = 0, []
    for key, sources in sorted(plan['assign'].items()):
        if key not in home:
            errs.append(f'{key}: not in the module tree')
            continue
        mod, sec, slug = home[key]
        dest = f'{CONTENT}/module{mod}/section{sec}/{slug}.tsx'
        comp = 'Lesson' + slug.replace('-', '_').replace('e', 'E', 1) if slug[3] == 'e' \
            else 'Lesson' + slug.replace('-', '_')
        if dry:
            done += 1
            continue
        err = build(dest, comp, sources, idx)
        if err:
            errs.append(f'{key}: {err}')
        else:
            done += 1
    print(f'{"would port" if dry else "ported"} {done}; {len(errs)} error(s)')
    for e in errs[:10]:
        print('  ', e)
    return 1 if errs else 0


if __name__ == '__main__':
    sys.exit(main())
