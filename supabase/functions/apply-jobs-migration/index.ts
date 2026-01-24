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
      JSON.stringify({
        success: false,
        error: "Database URL not available",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }

  const sql = postgres(databaseUrl, { ssl: "require" });

  try {
    // Check if user_id column already exists
    const existingColumns = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'jobs'
      AND column_name = 'user_id'
    `;

    const results: string[] = [];

    if (existingColumns.length === 0) {
      // Add user_id column
      await sql`ALTER TABLE jobs ADD COLUMN user_id UUID REFERENCES auth.users(id)`;
      results.push("Added user_id column to jobs table");

      // Create index
      await sql`CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id)`;
      results.push("Created index idx_jobs_user_id");
    } else {
      results.push("user_id column already exists");
    }

    await sql.end();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Jobs table migration completed",
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
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
