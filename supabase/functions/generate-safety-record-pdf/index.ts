import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { htmlToPdf } from '../_shared/safety-pdf-renderer.ts';
import type { Branding } from '../_shared/safety-html-base.ts';
import { captureException } from '../_shared/sentry.ts';

import { accidentTemplate } from '../_shared/safety-templates/accident.ts';
import { coshhTemplate } from '../_shared/safety-templates/coshh.ts';
import { equipmentTemplate } from '../_shared/safety-templates/equipment.ts';
import { fireWatchTemplate } from '../_shared/safety-templates/fire-watch.ts';
import { inspectionTemplate } from '../_shared/safety-templates/inspection.ts';
import { nearMissTemplate } from '../_shared/safety-templates/near-miss.ts';
import { observationTemplate } from '../_shared/safety-templates/observation.ts';
import { permitTemplate } from '../_shared/safety-templates/permit.ts';
import { preUseCheckTemplate } from '../_shared/safety-templates/pre-use-check.ts';
import { riddorTemplate } from '../_shared/safety-templates/riddor.ts';
import { siteDiaryTemplate } from '../_shared/safety-templates/site-diary.ts';
import { safeIsolationTemplate } from '../_shared/safety-templates/safe-isolation.ts';

/**
 * Unified safety-record PDF generator.
 *
 * Replaces 12 near-identical functions: generate-{accident, coshh, equipment,
 * fire-watch, inspection, near-miss, observation, permit, pre-use-check,
 * riddor-report, site-diary, safe-isolation}-pdf. Those differed only in the
 * source table, the HTML template, and the filename prefix — everything else
 * (auth, branding lookup, Browserless render, storage upload, base64 fallback)
 * was copy-pasted identically.
 *
 * Two behaviours here are NOT uniform and must not be "tidied" away:
 *
 *  1. riddor-report reads accident_records but must NOT write pdf_url back —
 *     that column belongs to the accident PDF. Writing it here would silently
 *     replace the accident document's link with the RIDDOR one.
 *  2. coshh and permit accept legacy id aliases (assessmentId / permitId) as
 *     well as recordId. Callers in the wild still send the old key.
 */

type DocType =
  | 'accident'
  | 'coshh'
  | 'equipment'
  | 'fire-watch'
  | 'inspection'
  | 'near-miss'
  | 'observation'
  | 'permit'
  | 'pre-use-check'
  | 'riddor-report'
  | 'site-diary'
  | 'safe-isolation';

interface DocSpec {
  /** Source table the record is read from */
  table: string;
  /** HTML template builder */
  template: (record: Record<string, unknown>, branding: Branding) => string;
  /** Storage filename prefix — preserved per-type so existing objects stay recognisable */
  filePrefix: string;
  /** Whether to write the public URL back to <table>.pdf_url */
  writesPdfUrl: boolean;
  /** Extra request-body keys accepted as the record id, for backwards compatibility */
  idAliases?: string[];
  /** Human label used in the not-found error */
  label: string;
}

const REGISTRY: Record<DocType, DocSpec> = {
  accident: {
    table: 'accident_records',
    template: accidentTemplate,
    filePrefix: 'accident',
    writesPdfUrl: true,
    label: 'Accident record',
  },
  coshh: {
    table: 'coshh_assessments',
    template: coshhTemplate,
    filePrefix: 'coshh',
    writesPdfUrl: true,
    idAliases: ['assessmentId'],
    label: 'COSHH assessment',
  },
  equipment: {
    table: 'safety_equipment',
    template: equipmentTemplate,
    filePrefix: 'equipment',
    writesPdfUrl: true,
    label: 'Equipment record',
  },
  'fire-watch': {
    table: 'fire_watch_records',
    template: fireWatchTemplate,
    filePrefix: 'fire-watch',
    writesPdfUrl: true,
    label: 'Fire watch record',
  },
  inspection: {
    table: 'inspection_records',
    template: inspectionTemplate,
    filePrefix: 'inspection',
    writesPdfUrl: true,
    label: 'Inspection record',
  },
  'near-miss': {
    table: 'near_miss_reports',
    template: nearMissTemplate,
    filePrefix: 'near-miss',
    writesPdfUrl: true,
    label: 'Near miss report',
  },
  observation: {
    table: 'safety_observations',
    template: observationTemplate,
    filePrefix: 'observation',
    writesPdfUrl: true,
    label: 'Safety observation',
  },
  permit: {
    table: 'permits_to_work',
    template: permitTemplate,
    filePrefix: 'permit',
    writesPdfUrl: true,
    idAliases: ['permitId'],
    label: 'Permit to work',
  },
  'pre-use-check': {
    table: 'pre_use_checks',
    template: preUseCheckTemplate,
    filePrefix: 'pre-use-check',
    writesPdfUrl: true,
    label: 'Pre-use check',
  },
  'riddor-report': {
    table: 'accident_records',
    template: riddorTemplate,
    filePrefix: 'riddor-report',
    // Deliberate: shares accident_records with the accident PDF. See header note 1.
    writesPdfUrl: false,
    label: 'Accident record',
  },
  'site-diary': {
    table: 'electrician_site_diary',
    template: siteDiaryTemplate,
    filePrefix: 'site-diary',
    writesPdfUrl: true,
    label: 'Site diary entry',
  },
  'safe-isolation': {
    table: 'safe_isolation_records',
    template: safeIsolationTemplate,
    filePrefix: 'safe-isolation',
    writesPdfUrl: true,
    label: 'Safe isolation record',
  },
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  let docType: string | undefined;

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization header');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');

    const body = (await req.json()) as Record<string, unknown>;
    docType = body.docType as string | undefined;

    if (!docType) throw new Error('Missing docType');
    const spec = REGISTRY[docType as DocType];
    if (!spec) throw new Error(`Unknown docType: ${docType}`);

    // recordId, or one of the legacy aliases this doc type still accepts
    const idKeys = ['recordId', ...(spec.idAliases ?? [])];
    const recordId = idKeys.map((k) => body[k]).find((v) => typeof v === 'string' && v) as
      | string
      | undefined;
    if (!recordId) throw new Error('Missing recordId');

    // Fetch company branding
    const { data: profileRows } = await supabase
      .from('company_profiles')
      .select(
        'company_name, company_address, company_postcode, company_phone, company_email, company_website, company_registration, vat_number, logo_data_url, logo_url, primary_color, secondary_color, scheme_logo_data_url, registration_scheme'
      )
      .eq('user_id', user.id)
      .limit(1);
    const branding: Branding = profileRows?.[0] ?? {};

    // Read through the USER client so RLS still decides what they may export
    const { data: record, error: fetchError } = await userSupabase
      .from(spec.table)
      .select('*')
      .eq('id', recordId)
      .single();

    if (fetchError || !record) throw new Error(`${spec.label} not found`);

    // ── Build PDF via HTML template + Browserless ────────────────────
    const html = spec.template(record, branding);
    const pdfBytes = await htmlToPdf(html);

    // ── Upload PDF ─────────────────────────────────────────────────────
    const fileName = `${spec.filePrefix}-${recordId}-${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('safety-documents')
      .upload(`${user.id}/${fileName}`, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      // Fallback: return base64-encoded PDF as JSON (chunked to avoid stack overflow)
      const bytes = new Uint8Array(pdfBytes);
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
      }
      const base64 = btoa(binary);
      return new Response(JSON.stringify({ success: true, pdf_base64: base64 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: urlData } = supabase.storage
      .from('safety-documents')
      .getPublicUrl(`${user.id}/${fileName}`);

    if (spec.writesPdfUrl) {
      await supabase
        .from(spec.table)
        .update({ pdf_url: urlData.publicUrl })
        .eq('id', recordId);
    }

    return new Response(JSON.stringify({ success: true, url: urlData.publicUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'generate-safety-record-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
      // Tag rather than bury in `extra`: now that 12 functions are one, doc
      // type is how you filter and group these in Sentry.
      tags: { docType: docType ?? 'unknown' },
    });
    console.error(`[generate-safety-record-pdf] ${docType ?? 'unknown'}:`, error);
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
