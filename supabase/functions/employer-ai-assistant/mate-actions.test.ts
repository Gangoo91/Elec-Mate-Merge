/**
 * Role rule in the tool layer: anyone who cannot see the firm's money (an
 * office manager) is refused money actions before anything is read or written,
 * both at preview and again at execute. The clients here throw if touched.
 */
import { assert, assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { executeAction, previewAction, MONEY_ACTIONS, ACTION_NAMES, type ActionCtx } from './mate-actions.ts';
import { signAction } from './mate-token.ts';

const explode = new Proxy({}, { get: () => { throw new Error('client touched'); } });
const ctx = (canSeeMoney: boolean): ActionCtx => ({
  caller: explode, admin: explode, firmId: 'f', userId: 'u', userEmail: null, role: canSeeMoney ? 'admin' : 'office',
  canSeeMoney, authHeader: '', secret: 's', supabaseUrl: 'http://x', anonKey: 'k',
});

Deno.test('mark_expenses_paid is a money action and is refused at preview for the office', async () => {
  assert(MONEY_ACTIONS.has('mark_expenses_paid'));
  const out = await previewAction(ctx(false), 'mark_expenses_paid', {});
  assertEquals(out.card, undefined);
  assert(out.note.startsWith('Not offered:'));
  assert(out.note.includes('owner or an admin'));
});

Deno.test('mark_expenses_paid is refused at execute for the office even with a valid token', async () => {
  const { payload } = await signAction('s', { k: 'confirm', t: 'mark_expenses_paid', a: { ids: [] }, u: 'u', f: 'f' });
  const r = await executeAction(ctx(false), payload);
  assertEquals(r.ok, false);
});

Deno.test('every money action is also a known action', () => {
  for (const m of MONEY_ACTIONS) assert(ACTION_NAMES.has(m));
});
