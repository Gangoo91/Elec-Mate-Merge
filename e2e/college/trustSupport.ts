/**
 * Helpers for the trust specs (47 staff MFA, 48 support view-as,
 * 49 Microsoft sign-in, 50 minimum-version gate).
 *
 * rolledBack(): runs a DO block through the Supabase CLI that ends in
 * `raise exception 'RESULT %', r` so EVERYTHING it did is rolled back, and
 * returns the RESULT text. Nothing it creates survives.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { PROJECT_REF, SUPABASE_URL } from './support';

export const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

export function rolledBack(doBlock: string): string {
  const file = path.join(process.cwd(), `.trust-${process.pid}-${Date.now()}.sql`);
  fs.writeFileSync(file, doBlock);
  let out = '';
  try {
    out = execFileSync(
      'npx',
      [
        '--yes',
        'supabase',
        'db',
        'query',
        '--linked',
        '--project-ref',
        PROJECT_REF,
        '-o',
        'json',
        '-f',
        file,
      ],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        maxBuffer: 8 * 1024 * 1024,
      }
    );
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string };
    out = `${err.stdout ?? ''}\n${err.stderr ?? ''}`;
  } finally {
    fs.rmSync(file, { force: true });
  }
  const m = out.match(/RESULT ([^"\n]*?)(\\n|"|$)/);
  if (!m) throw new Error(`No RESULT from the rolled-back check:\n${out.slice(0, 1500)}`);
  return m[1];
}

export type FixtureRole = 'learner' | 'tutor' | 'iqa' | 'assessor';

export function creds(role: FixtureRole): { email: string; password: string } | null {
  const up = role.toUpperCase();
  const email = process.env[`COLLEGE_E2E_${up}_EMAIL`];
  const password = process.env[`COLLEGE_E2E_${up}_PASSWORD`];
  if (email && password) return { email, password };
  try {
    const j = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), `e2e/.auth/college-demo-${role}.json`), 'utf8')
    ) as { email?: string; password?: string };
    if (j.email && j.password) return { email: j.email, password: j.password };
  } catch {
    /* none */
  }
  return null;
}

/** A supabase-js client signed in as the fixture, with its real JWT. */
export async function clientAs(role: FixtureRole): Promise<{ db: SupabaseClient; userId: string }> {
  const c = creds(role);
  if (!c) throw new Error(`No credentials for the fixture ${role}`);
  const db = createClient(SUPABASE_URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await db.auth.signInWithPassword(c);
  if (error || !data.session)
    throw new Error(`Fixture ${role} could not sign in: ${error?.message}`);
  return { db, userId: data.session.user.id };
}
