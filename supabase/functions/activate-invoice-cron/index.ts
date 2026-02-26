/**
 * One-shot: registers the daily-invoice-reminders pg_cron job.
 * Uses SUPABASE_DB_URL (auto-injected) to connect directly and run cron SQL.
 * Call once, then this function can be deleted.
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import postgres from 'https://deno.land/x/postgresjs@v3.4.4/mod.js';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  const dbUrl = Deno.env.get('SUPABASE_DB_URL');
  const projectUrl = Deno.env.get('SUPABASE_URL') as string;
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

  if (!dbUrl) {
    return new Response(JSON.stringify({ error: 'SUPABASE_DB_URL not available' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const sql = postgres(dbUrl, { ssl: 'require' });

  try {
    // Remove existing job if present
    await sql`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'daily-invoice-reminders') THEN
          PERFORM cron.unschedule('daily-invoice-reminders');
        END IF;
      END $$
    `;

    // Schedule daily at 9am UTC
    await sql`
      SELECT cron.schedule(
        'daily-invoice-reminders',
        '0 9 * * *',
        ${`select net.http_post(url:='${projectUrl}/functions/v1/automated-invoice-reminders',headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${serviceRoleKey}"}'::jsonb,body:='{}'::jsonb);`}
      )
    `;

    // Verify it was registered
    const jobs = await sql`
      SELECT jobid, jobname, schedule, active FROM cron.job WHERE jobname = 'daily-invoice-reminders'
    `;

    await sql.end();

    return new Response(
      JSON.stringify({ success: true, message: 'daily-invoice-reminders cron job scheduled at 0 9 * * * (9am UTC)', job: jobs[0] }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    await sql.end().catch(() => {});
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
