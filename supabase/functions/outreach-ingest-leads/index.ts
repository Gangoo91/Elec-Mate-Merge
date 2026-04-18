// Outreach lead ingestion endpoint.
// Called by crawl4AI pipelines on the VPS (authenticated via X-VPS-API-Key).
//
// Actions:
//   start_run      — begin a scrape run, returns run_id
//   ingest_batch   — upsert a batch of leads into education_leads OR business_leads
//   finish_run     — mark a run as completed/failed with stats
//   stats          — quick counts for admin UI

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-vps-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface EducationLead {
  source: string;
  source_url?: string;
  source_id?: string;
  email?: string;
  email_type?: string;
  name?: string;
  role?: string;
  phone?: string;
  organisation: string;
  organisation_type?: string;
  website?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  postcode?: string;
  region?: string;
  country?: string;
  offers_electrical_level_2?: boolean;
  offers_electrical_level_3?: boolean;
  offers_am2?: boolean;
  offers_epa?: boolean;
  specialisms?: string[];
  raw_data?: Record<string, unknown>;
  confidence_score?: number;
}

interface BusinessLead {
  source: string;
  source_url?: string;
  source_id?: string;
  company_name: string;
  trading_name?: string;
  company_number?: string;
  sic_codes?: string[];
  company_status?: string;
  incorporation_date?: string;
  email?: string;
  email_type?: string;
  website?: string;
  phone?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  postcode?: string;
  region?: string;
  country?: string;
  director_names?: string[];
  director_emails?: string[];
  employee_estimate?: string;
  turnover_estimate?: string;
  offers_apprenticeships?: boolean;
  accreditations?: string[];
  raw_data?: Record<string, unknown>;
  confidence_score?: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ─── Auth — VPS API key OR admin user ────────────────────────
    const vpsApiKey = Deno.env.get('VPS_API_KEY');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const xVpsKey = req.headers.get('x-vps-api-key');
    const authHeader = req.headers.get('authorization');

    let isAuthorised = false;
    let callerId = 'unknown';

    if (vpsApiKey && xVpsKey === vpsApiKey) {
      isAuthorised = true;
      callerId = 'vps_cron';
    } else if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (token === serviceRoleKey) {
        isAuthorised = true;
        callerId = 'service_role';
      } else {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          { global: { headers: { Authorization: authHeader } } }
        );
        const {
          data: { user },
        } = await supabaseClient.auth.getUser();
        if (user) {
          const { data: profile } = await supabaseClient
            .from('profiles')
            .select('admin_role')
            .eq('id', user.id)
            .single();
          if (profile?.admin_role) {
            isAuthorised = true;
            callerId = user.id;
          }
        }
      }
    }

    if (!isAuthorised) throw new Error('Unauthorised');

    const body = await req.json();
    const { action } = body;

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;

    switch (action) {
      // ─── start_run ──────────────────────────────────────────────
      case 'start_run': {
        const { source, targetTable, metadata } = body;
        if (!source || !targetTable) throw new Error('source and targetTable required');
        if (!['education_leads', 'business_leads'].includes(targetTable)) {
          throw new Error('Invalid targetTable');
        }

        const { data, error } = await supabaseAdmin
          .from('outreach_scrape_runs')
          .insert({
            source,
            target_table: targetTable,
            metadata: metadata || {},
            initiated_by: callerId === 'vps_cron' ? 'vps_cron' : 'admin_manual',
          })
          .select()
          .single();
        if (error) throw error;
        result = { run_id: data.id };
        break;
      }

      // ─── ingest_batch ───────────────────────────────────────────
      // Auto-promote: every lead with an email is also upserted into
      // outreach_contacts so it directly feeds the College/Business outreach
      // campaigns. The lead row stays as the source-of-truth for metadata.
      case 'ingest_batch': {
        const { runId, targetTable, leads } = body;
        if (!targetTable || !Array.isArray(leads)) {
          throw new Error('targetTable and leads[] required');
        }
        if (!['education_leads', 'business_leads'].includes(targetTable)) {
          throw new Error('Invalid targetTable');
        }

        let inserted = 0;
        let updated = 0;
        let skipped = 0;
        let autoPromoted = 0;
        const errors: string[] = [];

        async function autoPromoteToContact(params: {
          email: string;
          name: string | null;
          organisation: string;
          role: string | null;
          contact_type: string;
          tags: string[];
          source: string;
        }): Promise<string | null> {
          const tags = Array.from(new Set(params.tags.filter(Boolean)));
          const { data, error } = await supabaseAdmin
            .from('outreach_contacts')
            .upsert(
              {
                email: params.email.trim().toLowerCase(),
                name: params.name,
                organisation: params.organisation,
                role: params.role,
                contact_type: params.contact_type,
                tags,
                source: params.source,
              },
              { onConflict: 'email', ignoreDuplicates: false }
            )
            .select('id')
            .single();
          if (error) return null;
          return data?.id ?? null;
        }

        if (targetTable === 'education_leads') {
          for (const raw of leads as EducationLead[]) {
            if (!raw.organisation || !raw.source) {
              skipped++;
              continue;
            }
            const row = {
              source: raw.source,
              source_url: raw.source_url || null,
              source_id: raw.source_id || null,
              scraped_at: new Date().toISOString(),
              email: raw.email?.trim().toLowerCase() || null,
              email_type: raw.email_type || null,
              name: raw.name || null,
              role: raw.role || null,
              phone: raw.phone || null,
              organisation: raw.organisation,
              organisation_type: raw.organisation_type || null,
              website: raw.website || null,
              address_line_1: raw.address_line_1 || null,
              address_line_2: raw.address_line_2 || null,
              city: raw.city || null,
              postcode: raw.postcode?.toUpperCase().replace(/\s+/g, ' ').trim() || null,
              region: raw.region || null,
              country: raw.country || 'england',
              offers_electrical_level_2: raw.offers_electrical_level_2 ?? null,
              offers_electrical_level_3: raw.offers_electrical_level_3 ?? null,
              offers_am2: raw.offers_am2 ?? null,
              offers_epa: raw.offers_epa ?? null,
              specialisms: raw.specialisms || [],
              raw_data: raw.raw_data || {},
              confidence_score: raw.confidence_score ?? 50,
            };

            const { error, data } = await supabaseAdmin
              .from('education_leads')
              .upsert(row, {
                onConflict: 'source,source_id',
                ignoreDuplicates: false,
              })
              .select('id, created_at, updated_at, status, promoted_to_contact_id')
              .single();

            if (error) {
              errors.push(`${row.organisation}: ${error.message}`);
              skipped++;
              continue;
            }

            const isNew = data && Math.abs(
              new Date(data.updated_at).getTime() - new Date(data.created_at).getTime()
            ) < 1000;
            if (isNew) inserted++;
            else updated++;

            // Auto-promote if we have an email and haven't already promoted
            if (row.email && data && !data.promoted_to_contact_id) {
              const contactType =
                row.organisation_type === 'private_training_provider' ||
                row.organisation_type === 'apprenticeship_provider'
                  ? 'training_provider'
                  : row.organisation_type === 'trade_body'
                    ? 'trade_body'
                    : 'college';
              const tags: string[] = ['education_pool', `source:${row.source}`];
              if (row.country) tags.push(row.country);
              if (row.region) tags.push(row.region.toLowerCase().replace(/\s+/g, '_'));
              if (row.organisation_type) tags.push(row.organisation_type);
              const contactId = await autoPromoteToContact({
                email: row.email,
                name: row.name,
                organisation: row.organisation,
                role: row.role,
                contact_type: contactType,
                tags,
                source: `lead_education_${row.source}`,
              });
              if (contactId) {
                await supabaseAdmin
                  .from('education_leads')
                  .update({
                    status: 'promoted',
                    promoted_to_contact_id: contactId,
                  })
                  .eq('id', data.id);
                autoPromoted++;
              }
            }
          }
        } else {
          for (const raw of leads as BusinessLead[]) {
            if (!raw.company_name || !raw.source) {
              skipped++;
              continue;
            }
            const row = {
              source: raw.source,
              source_url: raw.source_url || null,
              source_id: raw.source_id || null,
              scraped_at: new Date().toISOString(),
              company_name: raw.company_name,
              trading_name: raw.trading_name || null,
              company_number: raw.company_number || null,
              sic_codes: raw.sic_codes || [],
              company_status: raw.company_status || null,
              incorporation_date: raw.incorporation_date || null,
              email: raw.email?.trim().toLowerCase() || null,
              email_type: raw.email_type || null,
              website: raw.website || null,
              phone: raw.phone || null,
              address_line_1: raw.address_line_1 || null,
              address_line_2: raw.address_line_2 || null,
              city: raw.city || null,
              postcode: raw.postcode?.toUpperCase().replace(/\s+/g, ' ').trim() || null,
              region: raw.region || null,
              country: raw.country || 'england',
              director_names: raw.director_names || [],
              director_emails: raw.director_emails || [],
              employee_estimate: raw.employee_estimate || null,
              turnover_estimate: raw.turnover_estimate || null,
              offers_apprenticeships: raw.offers_apprenticeships ?? null,
              accreditations: raw.accreditations || [],
              raw_data: raw.raw_data || {},
              confidence_score: raw.confidence_score ?? 50,
            };

            // Prefer company_number for dedupe, fall back to source+source_id
            const conflictTarget = row.company_number
              ? 'company_number'
              : 'source,source_id';

            const { error, data } = await supabaseAdmin
              .from('business_leads')
              .upsert(row, {
                onConflict: conflictTarget,
                ignoreDuplicates: false,
              })
              .select('id, created_at, updated_at, status, promoted_to_contact_id')
              .single();

            if (error) {
              errors.push(`${row.company_name}: ${error.message}`);
              skipped++;
              continue;
            }

            const isNew = data && Math.abs(
              new Date(data.updated_at).getTime() - new Date(data.created_at).getTime()
            ) < 1000;
            if (isNew) inserted++;
            else updated++;

            if (row.email && data && !data.promoted_to_contact_id) {
              const tags: string[] = ['business_pool', `source:${row.source}`];
              if (row.country) tags.push(row.country);
              if (row.region) tags.push(row.region.toLowerCase().replace(/\s+/g, '_'));
              if (Array.isArray(row.accreditations)) {
                for (const a of row.accreditations) if (a) tags.push(a);
              }
              if (Array.isArray(row.sic_codes)) {
                for (const s of row.sic_codes) if (s) tags.push(`sic_${s}`);
              }
              const contactId = await autoPromoteToContact({
                email: row.email,
                name: (row.director_names && row.director_names[0]) || null,
                organisation: row.company_name,
                role: 'Director',
                contact_type: 'employer',
                tags,
                source: `lead_business_${row.source}`,
              });
              if (contactId) {
                await supabaseAdmin
                  .from('business_leads')
                  .update({
                    status: 'promoted',
                    promoted_to_contact_id: contactId,
                  })
                  .eq('id', data.id);
                autoPromoted++;
              }
            }
          }
        }

        // Roll stats up into the scrape run if provided
        if (runId) {
          const { data: current } = await supabaseAdmin
            .from('outreach_scrape_runs')
            .select('records_inserted, records_updated, records_skipped, errors_count')
            .eq('id', runId)
            .single();
          if (current) {
            await supabaseAdmin
              .from('outreach_scrape_runs')
              .update({
                records_inserted: (current.records_inserted || 0) + inserted,
                records_updated: (current.records_updated || 0) + updated,
                records_skipped: (current.records_skipped || 0) + skipped,
                errors_count: (current.errors_count || 0) + errors.length,
                error_sample: errors.slice(0, 3).join(' | ') || undefined,
              })
              .eq('id', runId);
          }
        }

        result = {
          inserted,
          updated,
          skipped,
          auto_promoted: autoPromoted,
          errors: errors.slice(0, 10),
        };
        break;
      }

      // ─── finish_run ─────────────────────────────────────────────
      case 'finish_run': {
        const { runId, status = 'completed' } = body;
        if (!runId) throw new Error('runId required');
        const { error } = await supabaseAdmin
          .from('outreach_scrape_runs')
          .update({ status, completed_at: new Date().toISOString() })
          .eq('id', runId);
        if (error) throw error;
        result = { finished: true };
        break;
      }

      // ─── stats ──────────────────────────────────────────────────
      case 'stats': {
        const { data: overview } = await supabaseAdmin
          .from('outreach_leads_overview')
          .select('*');
        const { data: recentRuns } = await supabaseAdmin
          .from('outreach_scrape_runs')
          .select('*')
          .order('started_at', { ascending: false })
          .limit(10);
        result = { overview, recentRuns };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error in outreach-ingest-leads:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
