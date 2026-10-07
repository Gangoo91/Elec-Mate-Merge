import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
const URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const ANON = fs.readFileSync('scripts/college-demo/shoot.mjs','utf8').match(/'(eyJ[^']+)'/)[1];
const fx = JSON.parse(fs.readFileSync('e2e/.auth/college-demo-learner.json','utf8'));
const sb = createClient(URL, ANON, { auth: { persistSession: false } });
const { data: s, error: se } = await sb.auth.signInWithPassword({ email: fx.email, password: fx.password });
if (se) throw se;
const uid = s.user.id;
const { data: crit } = await sb.from('portfolio_item_criteria').select('portfolio_item_id, unit_code, ac_code, source').eq('learner_id', uid).neq('source','ai_suggested');
const byItem = {};
for (const c of crit) (byItem[c.portfolio_item_id] ??= []).push(`${c.unit_code} AC ${c.ac_code}`);
const itemId = 'f9c27167-356b-4c02-b2bd-8295d26e271b';
const claimed = byItem[itemId] ?? [];
console.log('claimed on item', claimed);
const pick = [claimed[0], '999 AC 9.9'];
const { data: row, error: ie } = await sb.from('portfolio_witness_statements').insert({
  learner_id: uid, portfolio_item_id: itemId, witness_email: 'founder+collegedemo-witness@elec-mate.com', witness_phone: '07700 900123', criteria: pick,
}).select('id, token, criteria, witness_phone, email_count, evidence_snapshot').single();
if (ie) throw ie;
console.log('stored criteria (expect only first, bogus dropped):', row.criteria, 'phone', row.witness_phone, 'files in snapshot', row.evidence_snapshot.files?.length);
const anon = createClient(URL, ANON, { auth: { persistSession: false } });
const { data: pub } = await anon.rpc('get_witness_request', { p_token: row.token });
console.log('public criteria_detail', JSON.stringify(pub.criteria_detail), 'media', JSON.stringify(pub.media).slice(0,200), 'evidence has files key?', 'files' in (pub.evidence||{}));
const { data: dry, error: de } = await sb.functions.invoke('witness-request-mail', { body: { witness_id: row.id, dry_run: true } });
console.log('dry run', de?.message, dry?.success, dry?.dry_run, dry?.to, dry?.subject, (dry?.html||'').includes(`/witness/${row.token}`));
// someone else's id / anon caller
const { data: dAnon } = await anon.functions.invoke('witness-request-mail', { body: { witness_id: row.id, dry_run: true } });
console.log('anon caller result', JSON.stringify(dAnon));
const { data: other } = await sb.functions.invoke('witness-request-mail', { body: { witness_id: '00000000-0000-0000-0000-000000000000', dry_run: true } });
console.log('unknown id', JSON.stringify(other));
// learner cannot set email_count
const { error: ue } = await sb.from('portfolio_witness_statements').update({ email_count: 0, emailed_at: null }).eq('id', row.id);
console.log('learner edit of counters refused:', !!ue, ue?.code);
console.log('ROW', row.id, row.token);
fs.writeFileSync('/private/tmp/claude-501/-Users-andrewmoore/2a8fc97f-638e-4e91-b71d-ff88ac2d4793/scratchpad/w1869/testrow.json', JSON.stringify(row));
