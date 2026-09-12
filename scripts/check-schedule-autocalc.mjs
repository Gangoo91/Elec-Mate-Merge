#!/usr/bin/env node
/**
 * Runs src/utils/__checks__/scheduleAutoCalc.check.ts.
 *
 * The schedule auto-calc is pure arithmetic over four fields, and it was wrong
 * in production for months because nothing ran it: the ring (R1+R2) derivation
 * was gated on `circuitType` containing "ring", which 73% of real circuits do
 * not set. tsc and eslint were both clean throughout.
 *
 *   npm run check:schedule-calc
 */

import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ENTRY = 'src/utils/__checks__/scheduleAutoCalc.check.ts';

const dir = await mkdtemp(join(tmpdir(), 'cert-cover-check-'));
const outfile = join(dir, 'check.mjs');

try {
  await build({
    entryPoints: [ENTRY],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile,
    alias: { '@': './src' },
    logLevel: 'error',
    // The app modules read Vite's import.meta.env; give them inert values so
    // the Supabase client can be constructed without touching the network.
    define: {
      'import.meta.env': JSON.stringify({
        DEV: false,
        VITE_SUPABASE_URL: 'https://check.invalid',
        VITE_SUPABASE_PUBLISHABLE_KEY: 'check',
      }),
    },
  });
  await import(pathToFileURL(outfile).href);
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  await rm(dir, { recursive: true, force: true });
}
