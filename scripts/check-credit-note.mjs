#!/usr/bin/env node
/**
 * Runs src/utils/__checks__/creditNote.check.ts.
 *
 * Credit notes (ELE-1704). Holds the rules that end up on a document an
 * accountant files: a credit can never exceed what is left to credit,
 * partial credits accumulate, the VAT treatment is inherited from the
 * invoice rather than chosen again, and the note names the invoice it
 * corrects.
 *
 *   npm run check:credit-note
 */

import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ENTRY = 'src/utils/__checks__/creditNote.check.ts';

const dir = await mkdtemp(join(tmpdir(), 'credit-note-check-'));
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
