/**
 * Run a certificate formatter and report the payload it really produces.
 *
 * ## Why this exists
 *
 * `check-cert-mapping` derived the payload by regexing the formatter source for
 * `key:` lines. That counts every object literal in the file — intermediate
 * objects, lookup maps, local shapes — as though it were a payload key. On the
 * EICR that inflated 605 real leaves into 531 "emitted" names carrying both
 * `installationAddress` and `installation_address` for a field the payload only
 * ever spells one way, and then reported both as never printed because the
 * template refers to `installation_details.address`.
 *
 * The result was a tool that reported 117 dropped fields on the EICR when the
 * true number was zero — and it is wired into CI, so it was manufacturing
 * confidence rather than checking anything.
 *
 * Running the formatter removes the guesswork: whatever comes back IS the
 * payload. There is nothing left to infer.
 *
 * ## What it costs
 *
 * A fixture per certificate. That is the honest price of a real answer, and it
 * is why `probePayload` is opt-in: a cert without a fixture keeps the old static
 * numbers and is labelled as unverified rather than quietly trusted.
 */
import { build } from 'esbuild';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * A Supabase client that answers every call with an empty result.
 *
 * Formatters reach out for photos and branding. None of that bears on whether a
 * field survives the journey, and a check that needs the network is a check
 * that gets disabled the first time CI is offline.
 */
const SUPABASE_STUB = `const make = () => new Proxy(function () {}, {
  get(_t, p) {
    if (p === 'then') return (r) => Promise.resolve({ data: [], error: null }).then(r);
    if (p === 'data') return [];
    if (p === 'error') return null;
    return () => make();
  },
  apply: () => make(),
});
export const supabase = make();
export default supabase;`;

/*
 * React is NOT stubbed.
 *
 * It was, to cover formatters written as components. Enumerating React's export
 * surface turned into whack-a-mole — Sentry imports `version`, sonner imports
 * `isValidElement`, and each miss failed the whole bundle and silently dropped a
 * certificate to 'static' with no obvious cause. The real module works: nothing
 * here renders, the formatters only import it transitively, and Minor Works —
 * the one formatter that was a component — now lives in its own module.
 */

/**
 * Every leaf path in an object, arrays collapsed to `[]`.
 *
 * An array contributes its first element's shape rather than one entry per row:
 * a 23-way schedule would otherwise report the same 34 fields 23 times and
 * drown everything else.
 */
export const leafPaths = (value, prefix = '', out = []) => {
  if (value === null || typeof value !== 'object') {
    if (prefix) out.push(prefix);
    return out;
  }
  if (Array.isArray(value)) {
    // An EMPTY array is marked distinctly. A populated array of primitives
    // (`combustionAppliances: string[]`) also yields a path ending in `[]`, and
    // conflating the two made the hollow-array check report seeded arrays as
    // unseeded — flagging a fixture as incomplete when it was fine.
    if (value.length) leafPaths(value[0], `${prefix}[]`, out);
    else out.push(`${prefix}[empty]`);
    return out;
  }
  for (const [k, v] of Object.entries(value)) leafPaths(v, prefix ? `${prefix}.${k}` : k, out);
  return out;
};

/**
 * Build and run a formatter against a fixture.
 *
 * @returns {Promise<{payload: object, paths: string[]}>}
 */
export const probePayload = async ({ formatter, exportName, fixture, reportId = 'PROBE' }) => {
  const tmp = mkdtempSync(join(tmpdir(), 'payload-probe-'));
  try {
    const supabaseStub = join(tmp, 'supabase.ts');

    writeFileSync(supabaseStub, SUPABASE_STUB);

    const entry = join(tmp, 'entry.ts');
    writeFileSync(entry, `export { ${exportName} } from '${formatter.replace(/^src/, '@')}';`);

    const outfile = join(tmp, 'bundle.mjs');
    await build({
      entryPoints: [entry],
      bundle: true,
      platform: 'node',
      format: 'esm',
      outfile,
      logLevel: 'silent',
      // Vite injects these; under node they are undefined and any module that
      // reads `import.meta.env.DEV` at load time takes the whole bundle down.
      define: {
        'import.meta.env': JSON.stringify({ DEV: false, PROD: true, MODE: 'production' }),
        'process.env.NODE_ENV': '"production"',
      },
      alias: {
        '@/integrations/supabase/client': supabaseStub,
        '@': './src',
      },
    });

    const mod = await import(pathToFileURL(outfile).href);
    const fn = mod[exportName];
    if (typeof fn !== 'function') throw new Error(`${exportName} is not a function`);

    // Formatters log liberally; a probe that floods the report is a probe people
    // stop running.
    const saved = { log: console.log, warn: console.warn, error: console.error };
    console.log = console.warn = console.error = () => {};
    let payload;
    try {
      payload = await fn(fixture, reportId);
    } finally {
      Object.assign(console, saved);
    }

    return { payload, paths: leafPaths(payload) };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
};

/**
 * Every path a Liquid template can reach, including through loop aliases.
 *
 * `{% for circuit in board.circuits %}{{ circuit.zs }}` has to mark
 * `...circuits[].zs` as rendered, or every field inside every loop reads as
 * dropped. Each dotted reference contributes its full path and every suffix of
 * it, so a payload path matches if the template names it at any depth.
 */
export const templatePaths = (src) => {
  const refs = new Set();
  const add = (chain) => {
    const parts = chain.split('.');
    for (let i = 0; i < parts.length; i++) refs.add(parts.slice(i).join('.'));
  };
  for (const m of src.matchAll(/\{[{%]-?([^}%]*)[%}]\}/g))
    for (const chain of m[1].matchAll(/[A-Za-z_][A-Za-z0-9_.]*/g)) add(chain[0]);
  return refs;
};

/** True when the template reaches this payload path by any route. */
export const isRendered = (path, refs) => {
  const clean = path.replace(/\[empty\]|\[\]/g, '');
  const parts = clean.split('.');
  for (let i = 0; i < parts.length; i++) if (refs.has(parts.slice(i).join('.'))) return true;
  return false;
};
