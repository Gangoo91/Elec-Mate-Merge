import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

/**
 * SPENT test probe — do not re-enable.
 *
 * Used once (29 Aug 2026) to prove the ELE-1368 verification pass rejects wrong
 * values rather than rubber-stamping them. Fed 3 true and 4 planted values
 * against a photographed page: the true ones came back "confirmed", every
 * planted one came back "wrong" WITH the correct value suggested, and a field
 * printed on a different page came back "not_found" rather than guessed.
 *
 * Stubbed rather than deleted so the result stays discoverable. It called
 * Gemini with an arbitrary caller-supplied payload, so leaving it live would be
 * an open proxy onto the account's key.
 */
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' };
Deno.serve((req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  return new Response(
    JSON.stringify({ error: 'Spent one-shot test probe. See the comment in this file.' }),
    { status: 410, headers: { ...cors, 'Content-Type': 'application/json' } }
  );
});
