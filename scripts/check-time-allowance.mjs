#!/usr/bin/env node
/**
 * Runs src/utils/__checks__/timeAllowance.check.ts.
 *
 * Time allowance on any quote line (ELE-1780). Holds three lines that would be
 * expensive to cross: labour must never be counted twice (464 live labour
 * lines already get their money from quantity × unitPrice), a grade with no
 * rate must emit NO line rather than £0 labour on a customer's quote, and
 * deleting a line must take its derived labour with it.
 *
 *   npm run check:time-allowance
 */

import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ENTRY = 'src/utils/__checks__/timeAllowance.check.ts';

const dir = await mkdtemp(join(tmpdir(), 'time-allowance-check-'));
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
