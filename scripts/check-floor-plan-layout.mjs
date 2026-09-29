#!/usr/bin/env node
/**
 * Runs src/components/electrician-tools/diagram-builder/__checks__/floorPlanLayout.check.ts.
 *
 * Real reader output plus 300 generated, badly-read plans must all come out
 * with no overlapping rooms, one line per wall, fittings inside their rooms,
 * names inside their rooms, and every mains item on a circuit.
 *
 *   npm run check:floor-plan-layout
 */

import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ENTRY = 'src/components/electrician-tools/diagram-builder/__checks__/floorPlanLayout.check.ts';

const dir = await mkdtemp(join(tmpdir(), 'floor-plan-layout-check-'));
const outfile = join(dir, 'check.mjs');

try {
  await build({
    entryPoints: [ENTRY],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile,
    alias: { '@': './src' },
    loader: { '.svg': 'text' },
    logLevel: 'error',
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
