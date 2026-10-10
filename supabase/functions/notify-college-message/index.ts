/**
 * notify-college-message — RETIRED (ELE-1918, 10 Oct 2026).
 *
 * It was fired by the trigger on college_messages INSERT and read
 * college_conversations to find who to push. That chat is retired: the table
 * is labelled [LEGACY — DO NOT USE], has never held a row, and no screen can
 * create a thread there. Learner and tutor messages live in
 * student_message_threads / student_messages and are pushed by
 * notify-student-message.
 *
 * The function stays deployed as a no-op so the old trigger still gets a 200
 * until the table and trigger are dropped
 * (supabase/release-held/20261010169000_drop_retired_schemas_ele1918_DO_NOT_APPLY.sql).
 * After that, delete it: `npx supabase functions delete notify-college-message`.
 */

import { identifyCaller, deny } from '../_shared/caller.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  // Internal only, as before: the anon key passes verify_jwt.
  const caller = await identifyCaller(req);
  if (caller?.kind !== 'service') return deny(corsHeaders);

  return new Response(JSON.stringify({ ok: true, skipped: 'retired (ELE-1918)' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
