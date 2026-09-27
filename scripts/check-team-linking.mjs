#!/usr/bin/env node
/**
 * An invited team member must be linked to their account AT SIGN-IN.
 *
 * ── WHY ───────────────────────────────────────────────────────────────────
 *
 * An employer adds someone by email before that person has an account. The row
 * sits in `employer_employees` with a null `user_id`, and `claim_employee_records()`
 * is what attaches it once the real account appears, matching on a confirmed
 * email. Until that runs the member is invisible to every employer-scoped query
 * and RPC: no assigned jobs, no clock-in, no timesheets, and no QS review —
 * `submit_report_for_qs_review` requires `auth.uid()` to match an active row,
 * so an unclaimed member cannot submit a certificate for sign-off at all.
 *
 * The claim used to be called from `useQsTeamContext` (which only runs on the
 * EICR / EIC / Minor Works forms and the QS screens) and from location
 * resolution. A member who signed up and used the Study Centre, a calculator or
 * any specialist certificate was therefore never linked. One confirmed account
 * sat unclaimed against an employer's roster for 83 days waiting for its owner
 * to happen to open an EICR.
 *
 * Signing in is when we know who someone is. That is where the claim belongs,
 * and this check exists so it cannot drift back out to a feature surface.
 */
import { readFileSync } from 'fs';

const AUTH = 'src/hooks/auth/useAuthSession.ts';
const JOIN = 'src/components/worker-tools/JoinTeamCard.tsx';
const RPC = 'claim_employee_records';
/*
 * Must match an actual CALL, not the name appearing in prose. A first cut of
 * this check tested `auth.includes(RPC)` and passed against a file where the
 * call had been replaced by a stub — the header comment above still contained
 * the word.
 */
const CALLS_RPC = new RegExp(String.raw`\brpc\(\s*['"\`]${RPC}['"\`]`);

const problems = [];
const auth = readFileSync(AUTH, 'utf8');
const callsRpc = CALLS_RPC.test(auth);

if (!callsRpc)
  problems.push(
    `${AUTH} no longer calls ${RPC}() — invited team members will sit unlinked until they happen to open a QS surface. See the header of this file.`
  );

/*
 * The RPC only matches a CONFIRMED email and returns 0 otherwise, so the
 * once-per-session guard must not be spent on a user who has not confirmed yet
 * — they would stay unlinked for the rest of the session after confirming.
 */
if (callsRpc && !auth.includes('email_confirmed_at'))
  problems.push(
    `${AUTH} calls ${RPC}() without checking email_confirmed_at first — an unconfirmed user burns their one attempt on a call that can only return 0.`
  );

/*
 * Both routes onto a team — the invite code and the email claim — must
 * invalidate the same caches, or one of them leaves a stale "you are not on a
 * team" answer behind. `qs-team-context` caches for ten minutes.
 */
const join = readFileSync(JOIN, 'utf8');
const keysIn = (src) =>
  new Set([...src.matchAll(/invalidateQueries\(\{\s*queryKey:\s*\['([^']+)'\]/g)].map((m) => m[1]));
const joinKeys = keysIn(join);
const authKeys = keysIn(auth);
for (const k of joinKeys) {
  if (!authKeys.has(k))
    problems.push(
      `${AUTH} does not invalidate '${k}' after claiming, but ${JOIN} does after the invite-code route — the two ways of joining a team must leave the same caches fresh.`
    );
}

if (problems.length) {
  console.error('✗ team linking:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(
  `✓ team linking: roster claim runs at sign-in, gated on a confirmed email, and refreshes the same ${joinKeys.size} caches as the invite-code route`
);
