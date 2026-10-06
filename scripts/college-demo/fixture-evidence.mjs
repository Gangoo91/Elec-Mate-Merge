/**
 * Upload (or remove) a tiny fixture photo for the fictional demo learner, so
 * share / assessor pages can be checked with a real file in portfolio-evidence.
 *   node scripts/college-demo/fixture-evidence.mjs up    -> prints the public URL
 *   node scripts/college-demo/fixture-evidence.mjs down  -> deletes it
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
const src = fs.readFileSync('scripts/college-demo/shoot.mjs', 'utf8');
const ANON = src.match(/'(eyJ[^']+)'/)[1];
const fx = JSON.parse(fs.readFileSync('e2e/.auth/college-demo-learner.json', 'utf8'));
const sb = createClient('https://jtwygbeceundfgnkirof.supabase.co', ANON, { auth: { persistSession: false } });
await sb.auth.signInWithPassword({ email: fx.email, password: fx.password });
const path = `${fx.user_id}/fixture-ring-final.png`;
if (process.argv[2] === 'down') {
  const { error } = await sb.storage.from('portfolio-evidence').remove([path]);
  console.log(error ? 'remove failed: ' + error.message : 'removed');
} else {
  // 64x64 yellow PNG
  const png = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAT0lEQVR42u3PMQ0AAAgDIN8/tFvTwwcSkDFrfE0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBUcG4QABzhP7RwAAAABJRU5ErkJggg==',
    'base64'
  );
  const { error } = await sb.storage.from('portfolio-evidence').upload(path, png, { contentType: 'image/png', upsert: true });
  if (error) { console.log('upload failed: ' + error.message); process.exit(1); }
  console.log(sb.storage.from('portfolio-evidence').getPublicUrl(path).data.publicUrl);
}
