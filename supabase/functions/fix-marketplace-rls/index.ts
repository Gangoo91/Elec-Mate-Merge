import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const databaseUrl = Deno.env.get("SUPABASE_DB_URL");

  if (!databaseUrl) {
    return new Response(
      JSON.stringify({ success: false, error: "Database URL not available" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }

  const sql = postgres(databaseUrl, { ssl: "require" });
  const results: string[] = [];

  try {
    // Drop and recreate RLS policies with correct syntax
    const tables = ['marketplace_suppliers', 'marketplace_products', 'marketplace_coupon_codes', 'marketplace_deals', 'marketplace_scrape_jobs'];

    for (const table of tables) {
      // Drop existing policies if any
      try {
        await sql.unsafe(`DROP POLICY IF EXISTS "Public read access for ${table.replace('marketplace_', '')}" ON public.${table}`);
        await sql.unsafe(`DROP POLICY IF EXISTS "Service role full access ${table.replace('marketplace_', '')}" ON public.${table}`);
      } catch (e) {
        // Ignore errors
      }

      // Create public read policy
      await sql.unsafe(`
        CREATE POLICY "anon_read_${table}" ON public.${table}
        FOR SELECT
        TO anon
        USING (true)
      `);
      results.push(`Created anon read policy for ${table}`);

      // Create authenticated read policy
      await sql.unsafe(`
        CREATE POLICY "authenticated_read_${table}" ON public.${table}
        FOR SELECT
        TO authenticated
        USING (true)
      `);
      results.push(`Created authenticated read policy for ${table}`);

      // Create service role full access policy
      await sql.unsafe(`
        CREATE POLICY "service_role_all_${table}" ON public.${table}
        FOR ALL
        TO service_role
        USING (true)
        WITH CHECK (true)
      `);
      results.push(`Created service role policy for ${table}`);
    }

    await sql.end();

    return new Response(
      JSON.stringify({
        success: true,
        message: "RLS policies fixed",
        results
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (err: any) {
    await sql.end();
    console.error("RLS fix error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
        results
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
