#!/usr/bin/env node
/**
 * Runs src/utils/__checks__/partPVerdict.check.ts.
 *
 * The Part P tracker opens a row only when the CERTIFICATE says the work is
 * notifiable (ELE-1715). That rule lives twice — here in TypeScript and in
 * SQL as part_p_certificate_verdict — and the cases below were run through
 * both on 29 Sep 2026. This keeps the TypeScript side honest.
 *
 *   npm run check:part-p-verdict
 */

import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ENTRY = 'src/utils/__checks__/partPVerdict.check.ts';

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
