import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

/**
 * SPENT. Do not re-enable.
 *
 * This was a one-shot provisioner that created the PDFMonkey template for the
 * Routine Inspection Report (ELE-1110) using the server-side PDFMONKEY_API_KEY,
 * so the key never had to leave Supabase. It has done its job:
 *
 *   Template id: 11506cfb-61a6-4b53-88fc-511399fa8c53
 *   Settings:    A4 portrait, margins 10/10/12/10 mm, Chrome footer for the
 *                real "Page X of Y" (the 12mm bottom is the footer band).
 *
 * That id is recorded in `generate-routine-inspection-pdf`. Calling this again
 * would create a SECOND, duplicate template and leave two diverging copies of
 * the same document — which is exactly the failure the PDFMonkey notes warn
 * about. It is stubbed rather than deleted so the id and the settings stay
 * discoverable next to the thing that created them.
 *
 * The live template is the source of truth from here. Fetch and patch it —
 * never paste the repo seed (`../generate-routine-inspection-pdf/template.html`)
 * over it.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve((req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  return new Response(
    JSON.stringify({
      success: false,
      error:
        'Spent one-shot provisioner. The template already exists: 11506cfb-61a6-4b53-88fc-511399fa8c53',
    }),
    { status: 410, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
