#!/usr/bin/env node
/**
 * Runs src/utils/__checks__/certCoverChain.check.ts — ELE-1671.
 *
 * Why this exists rather than a unit test: the repo's only test runner is
 * Playwright, and the thing that needs guarding is not a rendered page. It is a
 * four-hop data chain that TYPE-CHECKS PERFECTLY WHILE BEING BROKEN:
 *
 *   company_profiles -> brandingFromCompanyProfile -> coverPayloadKeys
 *     -> spread into the branding object -> coverKeysFromFormData
 *
 * Hop 4 was silently dropping every key, because the certificate pages merged
 * branding with an explicit field list instead of a spread. `tsc` was clean,
 * eslint was clean, and the cover branding did nothing on five certificate
 * types. Only running it catches that, so this runs it.
 *
 *   npm run check:cert-cover
 *
 * Uses esbuild (already a dependency) to bundle the TypeScript, so it adds no
 * new packages and no test framework.
 */
import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ENTRY = 'src/utils/__checks__/certCoverChain.check.ts';

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
