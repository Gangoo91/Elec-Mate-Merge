#!/usr/bin/env node
/**
 * Runs src/lib/__checks__/haptics.check.ts.
 *
 * The vibration switch (ELE-1805): the gate blocks when off, and every
 * haptic path in src goes through it.
 *
 *   npm run check:haptics
 */

import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ENTRY = 'src/lib/__checks__/haptics.check.ts';

const dir = await mkdtemp(join(tmpdir(), 'haptics-check-'));
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
