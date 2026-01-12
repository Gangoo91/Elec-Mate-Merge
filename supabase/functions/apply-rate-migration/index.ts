import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Get database URL from environment (available in edge functions)
  const databaseUrl = Deno.env.get("SUPABASE_DB_URL");

  if (!databaseUrl) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Database URL not available",
        note: "Run this SQL in Supabase Dashboard: ALTER TABLE employer_elec_id_profiles ADD COLUMN rate_type TEXT DEFAULT 'daily', ADD COLUMN rate_amount NUMERIC DEFAULT NULL;"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }

  const sql = postgres(databaseUrl, { ssl: "require" });

  try {
    // Check if columns already exist
    const existingColumns = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'employer_elec_id_profiles'
      AND column_name IN ('rate_type', 'rate_amount')
    `;

    const existingColumnNames = existingColumns.map((c: any) => c.column_name);
    const results: string[] = [];

    // Add rate_type if it doesn't exist
    if (!existingColumnNames.includes('rate_type')) {
      await sql`ALTER TABLE employer_elec_id_profiles ADD COLUMN rate_type TEXT DEFAULT 'daily'`;
      results.push("Added rate_type column");
    } else {
      results.push("rate_type column already exists");
    }

    // Add rate_amount if it doesn't exist
    if (!existingColumnNames.includes('rate_amount')) {
      await sql`ALTER TABLE employer_elec_id_profiles ADD COLUMN rate_amount NUMERIC DEFAULT NULL`;
      results.push("Added rate_amount column");
    } else {
      results.push("rate_amount column already exists");
    }

    // Try to add check constraint (ignore if already exists)
    try {
      await sql`
        ALTER TABLE employer_elec_id_profiles
        ADD CONSTRAINT valid_rate_type
        CHECK (rate_type IS NULL OR rate_type IN ('hourly', 'daily', 'weekly', 'yearly'))
      `;
      results.push("Added valid_rate_type constraint");
    } catch (constraintErr: any) {
      if (constraintErr.message?.includes('already exists')) {
        results.push("valid_rate_type constraint already exists");
      } else {
        results.push(`Constraint warning: ${constraintErr.message}`);
      }
    }

    await sql.end();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Migration completed",
        results
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (err: any) {
    await sql.end();
    console.error("Migration error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
        note: "Run this SQL in Supabase Dashboard: ALTER TABLE employer_elec_id_profiles ADD COLUMN rate_type TEXT DEFAULT 'daily', ADD COLUMN rate_amount NUMERIC DEFAULT NULL;"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
