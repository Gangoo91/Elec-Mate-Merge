/**
 * Role rule in the tool layer: anyone who cannot see the firm's money (an
 * office manager) is refused money actions before anything is read or written,
 * both at preview and again at execute. The clients here throw if touched.
 */
import { assert, assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { executeAction, previewAction, MONEY_ACTIONS, MANAGER_ACTIONS, ACTION_NAMES, type ActionCtx } from './mate-actions.ts';
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

// ELE-2085: sending a RAMS / job pack is for managers; crew are refused before
// anything is read or written, at preview and again at execute.
const crewCtx = (role: string): ActionCtx => ({ ...ctx(false), role });

Deno.test('send_pack_to_worker is a known manager action', () => {
  assert(ACTION_NAMES.has('send_pack_to_worker'));
  for (const m of MANAGER_ACTIONS) assert(ACTION_NAMES.has(m));
});

for (const role of ['engineer', 'apprentice', 'supervisor', 'subcontractor', 'team member']) {
  Deno.test(`send_pack_to_worker is refused at preview for ${role}`, async () => {
    const out = await previewAction(crewCtx(role), 'send_pack_to_worker', { employee: 'Dan', job: 'Orchard Close' });
    assertEquals(out.card, undefined);
    assert(out.note.startsWith('Not offered:'));
  });
  Deno.test(`send_pack_to_worker is refused at execute for ${role} even with a valid token`, async () => {
    const { payload } = await signAction('s', { k: 'confirm', t: 'send_pack_to_worker', a: { mode: 'send', pack_id: 'p', employee_id: 'e' }, u: 'u', f: 'f' });
    const r = await executeAction(crewCtx(role), payload);
    assertEquals(r.ok, false);
  });
}
