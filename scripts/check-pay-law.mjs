#!/usr/bin/env node
/**
 * Runs src/lib/__checks__/payLaw.check.ts (ELE-2062 / ELE-2063): holiday
 * accrual, rolled-up pay, SSP, NMW bands, young-worker limits and apprentice
 * funding, against gov.uk worked examples and the tickets' own example.
 *
 *   node scripts/check-pay-law.mjs
 */
import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = await mkdtemp(join(tmpdir(), 'pay-law-check-'));
const outfile = join(dir, 'check.mjs');
try {
  await build({
    entryPoints: ['src/lib/__checks__/payLaw.check.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile,
    alias: { '@': './src' },
    logLevel: 'error',
  });
  await import(pathToFileURL(outfile).href);
} finally {
  await rm(dir, { recursive: true, force: true });
}
