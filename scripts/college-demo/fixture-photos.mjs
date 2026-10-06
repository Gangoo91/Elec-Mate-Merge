/**
 * Upload / remove realistic fixture evidence photos for the fictional demo
 * learner (prospectus and walkthrough screenshots).
 *   node scripts/college-demo/fixture-photos.mjs up    -> prints JSON {name: publicUrl}
 *   node scripts/college-demo/fixture-photos.mjs down
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
const src = fs.readFileSync('scripts/college-demo/shoot.mjs', 'utf8');
const ANON = src.match(/'(eyJ[^']+)'/)[1];
const fx = JSON.parse(fs.readFileSync('e2e/.auth/college-demo-learner.json', 'utf8'));
const sb = createClient('https://jtwygbeceundfgnkirof.supabase.co', ANON, { auth: { persistSession: false } });
await sb.auth.signInWithPassword({ email: fx.email, password: fx.password });
const files = {
  'fixture-consumer-unit.jpg': 'public/images/site-photos/consumer-unit-eic.jpg',
  'fixture-site-testing.jpg': 'public/images/site-photos/site-testing.jpg',
  'fixture-mft-testing.jpg': 'public/images/site-photos/ipad-mft-testing.jpg',
};
const bucket = sb.storage.from('portfolio-evidence');
if (process.argv[2] === 'down') {
  const { error } = await bucket.remove(Object.keys(files).map((k) => `${fx.user_id}/${k}`));
  console.log(error ? 'remove failed: ' + error.message : 'removed');
} else {
  const out = {};
  for (const [name, local] of Object.entries(files)) {
    const path = `${fx.user_id}/${name}`;
    const { error } = await bucket.upload(path, fs.readFileSync(local), { contentType: 'image/jpeg', upsert: true });
    if (error) { console.error(name, error.message); process.exit(1); }
    out[name] = bucket.getPublicUrl(path).data.publicUrl;
  }
  console.log(JSON.stringify(out));
}
