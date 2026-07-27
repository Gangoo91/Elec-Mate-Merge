// GDPR Art. 17 purge worker — permanently erases accounts whose 30-day
// grace period (set by delete-own-account) has expired.
// Invoked daily by pg_cron with the service-role key. Supports ?dryRun=1.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface StorageObject {
  bucket_id: string;
  object_name: string;
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const authHeader = req.headers.get('Authorization') ?? '';
    if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: 'Not authorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const dryRun = new URL(req.url).searchParams.get('dryRun') === '1';

    const supabaseAdmin = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: eligible, error: eligibleError } = await supabaseAdmin
      .from('profiles')
      .select('id, deletion_requested_at')
      .not('deletion_requested_at', 'is', null)
      .lt('deletion_requested_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .limit(25);

    if (eligibleError) {
      throw new Error(`Failed to list eligible accounts: ${eligibleError.message}`);
    }

    const results: Array<Record<string, unknown>> = [];

    for (const account of eligible ?? []) {
      const userId = account.id as string;
      const summary: Record<string, unknown> = {
        userId,
        deletionRequestedAt: account.deletion_requested_at,
      };

      try {
        // --- 1. Storage objects (real S3 deletion via the storage API) ---
        const { data: objects, error: listError } = await supabaseAdmin.rpc(
          'gdpr_list_user_storage',
          { p_user_id: userId }
        );
        if (listError) {
          throw new Error(`storage listing failed: ${listError.message}`);
        }

        const byBucket = new Map<string, string[]>();
        for (const obj of (objects ?? []) as StorageObject[]) {
          const list = byBucket.get(obj.bucket_id) ?? [];
          list.push(obj.object_name);
          byBucket.set(obj.bucket_id, list);
        }
        summary.storageObjects = (objects ?? []).length;

        if (!dryRun) {
          for (const [bucket, names] of byBucket) {
            for (let i = 0; i < names.length; i += 100) {
              const chunk = names.slice(i, i + 100);
              const { error: removeError } = await supabaseAdmin.storage
                .from(bucket)
                .remove(chunk);
              if (removeError) {
                throw new Error(`storage removal failed in ${bucket}: ${removeError.message}`);
              }
            }
          }

          // --- 2. Clear every blocking row in public schema ---
          const { error: purgeError } = await supabaseAdmin.rpc('gdpr_purge_user_rows', {
            p_user_id: userId,
          });
          if (purgeError) {
            throw new Error(`row purge failed: ${purgeError.message}`);
          }

          // --- 3. Delete the auth user (cascades profiles and remaining data) ---
          const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
          if (deleteError) {
            throw new Error(`auth deletion failed: ${deleteError.message}`);
          }

          // --- 4. Audit record with no personal data (user_id must be null: user is gone) ---
          await supabaseAdmin.from('security_audit_log').insert({
            user_id: null,
            action: 'gdpr_account_purged',
            table_name: 'profiles',
            record_id: userId,
            metadata: {
              deletionRequestedAt: account.deletion_requested_at,
              storageObjectsRemoved: summary.storageObjects,
            },
          });
        }

        summary.status = dryRun ? 'dry_run' : 'purged';
        console.log(`✅ ${dryRun ? '[dry run] ' : ''}Purged account ${userId}`);
      } catch (err) {
        summary.status = 'failed';
        summary.error = err instanceof Error ? err.message : String(err);
        console.error(`❌ Purge failed for ${userId}:`, summary.error);
        await captureException(err, {
          functionName: 'purge-deleted-accounts',
          requestUrl: req.url,
          requestMethod: req.method,
        });
      }

      results.push(summary);
    }

    const failed = results.filter((r) => r.status === 'failed').length;
    return new Response(
      JSON.stringify({ dryRun, eligible: results.length, failed, results }),
      { status: failed > 0 ? 500 : 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'purge-deleted-accounts',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('Purge worker error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Purge failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
