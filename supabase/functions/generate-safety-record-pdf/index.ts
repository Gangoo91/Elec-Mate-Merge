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
import { buildSafetyPayload } from '../_shared/safety-pdf/index.ts';
import { companyFor, renderSafetyRecord } from '../_shared/safety-pdf/render.ts';

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
  | 'safe-isolation'
  | 'rams'
  | 'briefing'
  | 'photo-project';

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
    writesPdfUrl: false, // no pdf_url column (checked 7 Oct 2026)
    label: 'Equipment record',
  },
  'fire-watch': {
    table: 'fire_watch_records',
    template: fireWatchTemplate,
    filePrefix: 'fire-watch',
    writesPdfUrl: false, // no pdf_url column (checked 7 Oct 2026)
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
    writesPdfUrl: false, // no pdf_url column (checked 7 Oct 2026)
    label: 'Near miss report',
  },
  observation: {
    table: 'safety_observations',
    template: observationTemplate,
    filePrefix: 'observation',
    writesPdfUrl: false, // no pdf_url column (checked 7 Oct 2026)
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
    writesPdfUrl: false, // no pdf_url column (checked 7 Oct 2026)
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
    writesPdfUrl: false, // no pdf_url column (checked 7 Oct 2026)
    label: 'Site diary entry',
  },
  // Team briefings (team_briefings). PDFMonkey only; the client falls back to
  // generate-pdf-monkey if this fails. Writes our own stored URL to pdf_url —
  // the old path saved PDFMonkey's download link, which expires in 7 days.
  briefing: {
    table: 'team_briefings',
    template: () => {
      throw new Error('Briefing has no HTML fallback in this function');
    },
    filePrefix: 'briefing',
    writesPdfUrl: true,
    label: 'Team briefing',
  },
  // Generated RAMS (rams_generation_jobs, as saved after review). PDFMonkey
  // only — there is no HTML fallback here; if this fails the client falls
  // back to generate-combined-rams-pdf, the previous renderer.
  rams: {
    table: 'rams_generation_jobs',
    template: () => {
      throw new Error('RAMS has no HTML fallback in this function');
    },
    filePrefix: 'rams',
    writesPdfUrl: false,
    label: 'RAMS',
  },
  // Photo report for a photo project (photo_projects + safety_photos).
  // PDFMonkey only; the client keeps its in-app report as the fallback.
  'photo-project': {
    table: 'photo_projects',
    template: () => {
      throw new Error('Photo report has no HTML fallback in this function');
    },
    filePrefix: 'photo-report',
    writesPdfUrl: false,
    label: 'Photo project',
  },
  'safe-isolation': {
    table: 'safe_isolation_records',
    template: safeIsolationTemplate,
    filePrefix: 'safe-isolation',
    writesPdfUrl: false, // no pdf_url column (checked 7 Oct 2026)
    label: 'Safe isolation record',
  },
};

/**
 * safety-photos is going private (the app signs its links; the bucket flips
 * after that release). Every photo link in the payload that points at it,
 * public or print-size render URL, is re-signed here with the service role,
 * keeping the print-size transform. Works the same while the bucket is public.
 */
const SAFETY_PHOTO_PATH = /\/storage\/v1\/(?:object|render\/image)\/(?:public|sign)\/safety-photos\/([^?]+)/;
async function signSafetyPhotos(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  payload: Record<string, unknown>,
  width: number
) {
  const slots: { holder: Record<string, unknown>; path: string }[] = [];
  const visit = (v: unknown) => {
    if (Array.isArray(v)) return v.forEach(visit);
    if (!v || typeof v !== 'object') return;
    const o = v as Record<string, unknown>;
    if (typeof o.url === 'string') {
      const m = o.url.match(SAFETY_PHOTO_PATH);
      if (m) slots.push({ holder: o, path: decodeURIComponent(m[1]) });
    }
    Object.values(o).forEach(visit);
  };
  visit(payload.photos);
  visit(payload.sections);
  await Promise.all(
    slots.map(async (s) => {
      const { data } = await supabase.storage.from('safety-photos').createSignedUrl(s.path, 3600, {
        transform: { width, quality: 72, resize: 'contain', format: 'origin' },
      });
      if (data?.signedUrl) s.holder.url = data.signedUrl;
    })
  );
}

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
        'company_name, company_address, company_postcode, company_phone, company_email, company_website, company_registration, vat_number, logo_data_url, logo_url, primary_color, secondary_color, scheme_logo_data_url, registration_scheme, cert_logo_tone'
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

    // ── Build PDF ────────────────────────────────────────────────────
    // Branded PDFMonkey "Safety Record" template first (cover sheet, company
    // masthead, job, photos, signatures that say how they were made). Any
    // failure — no mapper yet, PDFMonkey down, a slow render — falls back to
    // the Browserless HTML template so the user always gets their document.
    let pdfBytes: Uint8Array | null = null;
    try {
      const rec = record as Record<string, unknown>;
      const { data: me } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();
      const preparedBy = (me?.full_name as string | undefined)?.trim() || '';

      // The job this record is filed against, if any (spark_projects).
      let job: { number?: string; title?: string; client?: string; site?: string } = {};
      // Safety records link a job as job_id; generated RAMS as project_id.
      const jobRef = (typeof rec.job_id === 'string' && rec.job_id) || (typeof rec.project_id === 'string' && rec.project_id) || '';
      if (jobRef) {
        const { data: p } = await userSupabase
          .from('spark_projects')
          .select('title, job_number, location, customer_id')
          .eq('id', jobRef)
          .maybeSingle();
        if (p) {
          let client = '';
          if (p.customer_id) {
            const { data: c } = await userSupabase
              .from('customers')
              .select('name')
              .eq('id', p.customer_id)
              .maybeSingle();
            client = (c?.name as string) || '';
          }
          job = { number: p.job_number || '', title: p.title || '', client, site: p.location || '' };
        }
      }

      // Sign-offs made by remote link, so the document can say so.
      const remote: Record<string, { name: string; signedAt: string; image: string }> = {};
      const { data: signed } = await supabase
        .from('safety_signing_tokens')
        .select('role, signed_name, signed_at, signed_signature')
        .eq('document_type', docType)
        .eq('record_id', recordId)
        .eq('user_id', user.id)
        .not('signed_signature', 'is', null);
      for (const t of signed ?? []) {
        remote[t.role as string] = {
          name: (t.signed_name as string) || '',
          signedAt: (t.signed_at as string) || '',
          image: (t.signed_signature as string) || '',
        };
      }

      // RAMS: which half to print, the version this export will be filed as,
      // and the earlier issues.
      if (docType === 'rams') {
        (rec as Record<string, unknown>).__variant = body.variant === 'rams' || body.variant === 'method' ? body.variant : 'combined';
        const { data: filed } = await userSupabase
          .from('rams_documents')
          .select('version, ai_generation_metadata, updated_at')
          .eq('ai_generation_metadata->>generation_job_id', recordId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        const metaPrev = ((filed?.ai_generation_metadata as Record<string, unknown> | null)?.previous_issues ?? []) as {
          version?: number;
          superseded_at?: string;
        }[];
        (rec as Record<string, unknown>).__filing = {
          version: filed ? (Number(filed.version) || 1) + 1 : 1,
          previous: [
            ...metaPrev.map((p) => ({ version: Number(p.version) || 0, at: p.superseded_at ?? '' })),
            ...(filed ? [{ version: Number(filed.version) || 1, at: (filed.updated_at as string) || '' }] : []),
          ],
        };
      }

      // Photo report: the project's photos (RLS via the user client), in
      // time order, narrowed to the category picked in the export sheet.
      if (docType === 'photo-project') {
        const category = typeof body.category === 'string' ? body.category : 'all';
        const { data: pics } = await userSupabase
          .from('safety_photos')
          .select('file_url, description, notes, location, photo_type, category, annotations, created_at')
          .eq('project_id', recordId)
          .order('created_at', { ascending: true })
          .limit(200);
        rec.__photos = (pics ?? []).filter(
          (p) => category === 'all' || ((p.photo_type as string) || (p.category as string) || 'general') === category
        );
        rec.__options = { category, includeMetadata: body.includeMetadata !== false };
        if (rec.customer_id) {
          const { data: c } = await userSupabase.from('customers').select('name').eq('id', rec.customer_id).maybeSingle();
          if (c?.name) job = { ...job, client: c.name as string };
        }
      }

      // Briefing photos live in the PRIVATE briefing-photos bucket as bare
      // paths; sign them for the render (an hour is ample).
      if (docType === 'briefing' && Array.isArray(rec.photos)) {
        rec.photos = await Promise.all(
          (rec.photos as unknown[]).map(async (p) => {
            const o = (typeof p === 'string' ? { url: p } : (p as Record<string, unknown>)) ?? {};
            const ref = String(o.url ?? '');
            if (!ref || /^(https?:|data:)/.test(ref)) return o;
            const { data: signedUrl } = await supabase.storage.from('briefing-photos').createSignedUrl(ref, 3600);
            return { ...o, url: signedUrl?.signedUrl ?? '' };
          })
        );
      }

      const publicBase = `${supabaseUrl}/storage/v1/object/public/safety-photos/`;
      // Print-size photos: a phone original is 3-5 MB and a PDF of eight of
      // them is unusable by email. Resized by Supabase at ~1400px; format=origin
      // because the default transform serves WebP, which PDFMonkey's Chrome
      // rasterises losslessly (the 40 MB EICR, Sept 2026).
      const printSize = (url: string) =>
        url.includes('/storage/v1/object/public/')
          ? url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') +
            (url.includes('?') ? '&' : '?') +
            // A photo report prints ~90 mm wide, two to a row: 1100 px is
            // still ~300 dpi and keeps a 40-photo report emailable.
            `width=${docType === 'photo-project' ? 1100 : 1400}&quality=72&resize=contain&format=origin`
          : url;
      const payload = buildSafetyPayload(
        docType,
        rec,
        {
          job,
          preparedBy,
          photoUrl: (ref: string) =>
            /^data:/.test(ref)
              ? ref
              : printSize(/^https?:/.test(ref) ? ref : publicBase + ref.replace(/^\/+/, '')),
          remote,
        },
        companyFor(branding as Record<string, unknown>, preparedBy)
      );
      if (payload) {
        await signSafetyPhotos(supabase, payload as unknown as Record<string, unknown>, docType === 'photo-project' ? 1100 : 1400);
        pdfBytes = await renderSafetyRecord(payload, `${spec.filePrefix}-${recordId}.pdf`);
      }
    } catch (e) {
      console.warn(`[generate-safety-record-pdf] ${docType}: PDFMonkey render failed, using HTML fallback`, e);
      await captureException(e, {
        functionName: 'generate-safety-record-pdf',
        tags: { docType: docType ?? 'unknown', stage: 'pdfmonkey' },
      });
    }
    if (!pdfBytes) {
      const html = spec.template(record, branding);
      pdfBytes = await htmlToPdf(html);
    }

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

    // Private bucket (accident and injury records): the record keeps the
    // object PATH; the caller gets a short-lived signed URL for this download.
    const objectPath = `${user.id}/${fileName}`;
    const { data: signed } = await supabase.storage
      .from('safety-documents')
      .createSignedUrl(objectPath, 3600);

    if (spec.writesPdfUrl) {
      await supabase.from(spec.table).update({ pdf_url: objectPath }).eq('id', recordId);
    }

    return new Response(JSON.stringify({ success: true, url: signed?.signedUrl, path: objectPath }), {
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
