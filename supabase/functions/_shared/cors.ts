/*
  Shared CORS headers.

  🔴 `x-request-id` and `x-supabase-timeout` are NOT optional.

  The browser client sets `x-request-id` on every single request for end-to-end
  tracing (see the `global.fetch` wrapper in src/integrations/supabase/client.ts).
  A header the preflight does not allow makes the browser refuse to send the
  actual request — it issues the OPTIONS, reads this list, and then gives up
  with a bare "TypeError: Failed to fetch". The function is never reached and
  its logs show a stream of OPTIONS with no POSTs behind them.

  That is how admin-stripe-stats came to be unreachable from the dashboard: the
  panel sat on "Loading Stripe…" forever and the figure read £0, while the
  function itself was healthy and answered a hand-rolled fetch in 600ms.
  It bit us once before on ai-apprentice-today, 2026-06-12.

  Adding to this list is safe — it only ever permits more. Removing from it
  breaks callers silently, in the browser only, with no server-side error.
*/
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};
