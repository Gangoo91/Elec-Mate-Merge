import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
const URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const ANON = fs.readFileSync('scripts/college-demo/shoot.mjs','utf8').match(/'(eyJ[^']+)'/)[1];
const fx = JSON.parse(fs.readFileSync('e2e/.auth/college-demo-learner.json','utf8'));
const sb = createClient(URL, ANON, { auth: { persistSession: false } });
await sb.auth.signInWithPassword({ email: fx.email, password: fx.password });
const { data, error } = await sb.functions.invoke('portfolio-export-pack', { body: { action: 'create', kind: 'evidence_pack' } });
console.log('create', error?.message, JSON.stringify(data));
const id = data?.id;
for (let i = 0; i < 40; i++) {
  await new Promise((r) => setTimeout(r, 4000));
  const { data: row } = await sb.from('portfolio_exports').select('id,status,progress,zip_path,pdf_path,error').eq('id', id).single();
  if (row.status !== 'building' && row.status !== 'queued') { console.log('done', JSON.stringify(row)); break; }
}
const { data: link } = await sb.functions.invoke('portfolio-export-pack', { body: { action: 'link', exportId: id, file: 'zip' } });
const buf = Buffer.from(await (await fetch(link.url)).arrayBuffer());
fs.writeFileSync('/private/tmp/claude-501/-Users-andrewmoore/2a8fc97f-638e-4e91-b71d-ff88ac2d4793/scratchpad/w1869/pack.zip', buf);
console.log('zip bytes', buf.length, 'EXPORT', id);
