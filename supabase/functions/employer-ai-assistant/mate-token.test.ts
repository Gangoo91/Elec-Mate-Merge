/**
 * Employer Mate confirmation tokens: a write runs only for the user it was
 * shown to, the firm, the action and the exact arguments on the card, within
 * 10 minutes. Everything else is refused.
 */
import { assert, assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { canonical, CONFIRM_TTL_MS, signAction, UNDO_TTL_MS, verifyAction } from './mate-token.ts';

const SECRET = 'test-secret';
const USER = '11111111-1111-4111-8111-111111111111';
const OTHER = '22222222-2222-4222-8222-222222222222';
const FIRM = '33333333-3333-4333-8333-333333333333';
const ARGS = { ids: ['a', 'b'], note: 'x' };
const T0 = 1_760_000_000_000;

const mint = (over: Partial<Parameters<typeof signAction>[1]> = {}) =>
  signAction(SECRET, { k: 'confirm', t: 'approve_timesheets', a: ARGS, u: USER, f: FIRM, now: T0, ...over });

Deno.test('a fresh token verifies for the same user, firm, action and args', async () => {
  const { token } = await mint();
  const v = await verifyAction(SECRET, token, { kind: 'confirm', userId: USER, firmId: FIRM, action: 'approve_timesheets', args: ARGS, now: T0 + 1000 });
  assert(v.ok);
  if (v.ok) assertEquals(v.payload.a, ARGS);
});

Deno.test('arg key order does not matter, values do', async () => {
  const { token } = await mint();
  const same = await verifyAction(SECRET, token, { kind: 'confirm', userId: USER, firmId: FIRM, args: { note: 'x', ids: ['a', 'b'] }, now: T0 });
  assert(same.ok);
  const diff = await verifyAction(SECRET, token, { kind: 'confirm', userId: USER, firmId: FIRM, args: { ids: ['a', 'c'], note: 'x' }, now: T0 });
  assertEquals(diff.ok ? 'ok' : diff.error, 'args_mismatch');
});

Deno.test('another user is refused', async () => {
  const { token } = await mint();
  const v = await verifyAction(SECRET, token, { kind: 'confirm', userId: OTHER, firmId: FIRM, now: T0 });
  assertEquals(v.ok ? 'ok' : v.error, 'wrong_user');
});

Deno.test('another firm is refused', async () => {
  const { token } = await mint();
  const v = await verifyAction(SECRET, token, { kind: 'confirm', userId: USER, firmId: OTHER, now: T0 });
  assertEquals(v.ok ? 'ok' : v.error, 'wrong_firm');
});

Deno.test('another action is refused', async () => {
  const { token } = await mint();
  const v = await verifyAction(SECRET, token, { kind: 'confirm', userId: USER, firmId: FIRM, action: 'mark_expenses_paid', now: T0 });
  assertEquals(v.ok ? 'ok' : v.error, 'wrong_action');
});

Deno.test('expires after 10 minutes, valid just before', async () => {
  const { token } = await mint();
  const before = await verifyAction(SECRET, token, { kind: 'confirm', userId: USER, firmId: FIRM, now: T0 + CONFIRM_TTL_MS - 1 });
  assert(before.ok);
  const after = await verifyAction(SECRET, token, { kind: 'confirm', userId: USER, firmId: FIRM, now: T0 + CONFIRM_TTL_MS });
  assertEquals(after.ok ? 'ok' : after.error, 'expired');
});

Deno.test('undo tokens last 15 minutes and are not confirm tokens', async () => {
  const { token } = await mint({ k: 'undo' });
  const asConfirm = await verifyAction(SECRET, token, { kind: 'confirm', userId: USER, firmId: FIRM, now: T0 });
  assertEquals(asConfirm.ok ? 'ok' : asConfirm.error, 'wrong_kind');
  assert((await verifyAction(SECRET, token, { kind: 'undo', userId: USER, firmId: FIRM, now: T0 + UNDO_TTL_MS - 1 })).ok);
  const late = await verifyAction(SECRET, token, { kind: 'undo', userId: USER, firmId: FIRM, now: T0 + UNDO_TTL_MS });
  assertEquals(late.ok ? 'ok' : late.error, 'expired');
});

Deno.test('tampered args (re-encoded body) fail the signature', async () => {
  const { token } = await mint();
  const [body, sig] = token.split('.');
  const json = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (body.length % 4)) % 4)));
  json.a = { ids: ['a', 'b', 'EVIL'], note: 'x' };
  const forged = btoa(canonical(json)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') + '.' + sig;
  const v = await verifyAction(SECRET, forged, { kind: 'confirm', userId: USER, firmId: FIRM, now: T0 });
  assertEquals(v.ok ? 'ok' : v.error, 'bad_signature');
});

Deno.test('tampered user id fails the signature', async () => {
  const { token } = await mint();
  const [body, sig] = token.split('.');
  const json = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (body.length % 4)) % 4)));
  json.u = OTHER;
  const forged = btoa(canonical(json)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') + '.' + sig;
  const v = await verifyAction(SECRET, forged, { kind: 'confirm', userId: OTHER, firmId: FIRM, now: T0 });
  assertEquals(v.ok ? 'ok' : v.error, 'bad_signature');
});

Deno.test('a different secret, garbage and non-strings are refused', async () => {
  const { token } = await mint();
  const wrongKey = await verifyAction('other-secret', token, { kind: 'confirm', userId: USER, firmId: FIRM, now: T0 });
  assertEquals(wrongKey.ok ? 'ok' : wrongKey.error, 'bad_signature');
  for (const bad of ['', 'abc', 'a.b.c', '!!!.###', null, 42, undefined]) {
    const v = await verifyAction(SECRET, bad, { kind: 'confirm', userId: USER, firmId: FIRM, now: T0 });
    assert(!v.ok, `accepted ${String(bad)}`);
  }
});

Deno.test('two mints of the same action carry different nonces', async () => {
  const a = await mint();
  const b = await mint();
  assert(a.payload.n !== b.payload.n);
  assert(a.token !== b.token);
});
