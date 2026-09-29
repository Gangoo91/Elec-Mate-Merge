#!/usr/bin/env node
/**
 * Every named import between edge-function files must exist on the module it
 * names.
 *
 * On 20 Sep 2026 a "recover unversioned functions" commit overwrote
 * `_shared/ai-providers.ts` with a copy that had no `generateLargeEmbedding`.
 * Two shared RAG modules and, through them, designer-agent-v3,
 * enhance-eicr-observation and tasks-ai-assistant still imported it. Nothing
 * failed: the live functions had been deployed the day before with the old
 * module, `deno check` is only run by hand, and a deploy type-checks nothing.
 * The next deploy of any of those functions would have broken it in
 * production. This is the check that would have said so.
 *
 * It parses `import { a, b } from './x.ts'` / `'../_shared/x.ts'` across
 * `supabase/functions` and verifies each name against the target's exports
 * (`export function|const|class|interface|type|enum NAME` and
 * `export { a, b }`). Default and namespace imports are not checked.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, resolve } from 'path';

const ROOT = 'supabase/functions';
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.deno') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(name)) files.push(p);
  }
})(ROOT);

const exportsOf = new Map();
function exportedNames(file) {
  if (exportsOf.has(file)) return exportsOf.get(file);
  const src = readFileSync(file, 'utf8');
  const names = new Set();
  for (const m of src.matchAll(
    /^export\s+(?:async\s+)?(?:function\*?|const|let|var|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/gm
  ))
    names.add(m[1]);
  for (const m of src.matchAll(/^export\s*\{([^}]*)\}/gm))
    for (const part of m[1].split(','))
      names.add(
        part
          .trim()
          .split(/\s+as\s+/)
          .pop()
          .trim()
      );
  for (const m of src.matchAll(/^export\s+\*\s+from\s+'([^']+)'/gm)) {
    const t = resolve(dirname(file), m[1]);
    try {
      for (const n of exportedNames(t)) names.add(n);
    } catch {
      /* external */
    }
  }
  exportsOf.set(file, names);
  return names;
}

const problems = [];
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+'(\.[^']+)'/g)) {
    const target = resolve(dirname(file), m[2]);
    let names;
    try {
      names = exportedNames(target);
    } catch {
      problems.push(`${file}: imports from ${m[2]} which does not exist`);
      continue;
    }
    for (const part of m[1].split(',')) {
      const raw = part.trim().replace(/^type\s+/, '');
      if (!raw) continue;
      const name = raw.split(/\s+as\s+/)[0].trim();
      if (!names.has(name))
        problems.push(`${file}: imports { ${name} } from ${m[2]} — not exported there`);
    }
  }
}

if (problems.length) {
  console.error('✗ shared exports:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(
  `✓ shared exports: every named relative import across ${files.length} edge-function files resolves to a real export`
);
