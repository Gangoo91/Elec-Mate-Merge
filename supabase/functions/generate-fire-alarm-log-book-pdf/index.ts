import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';
import { fireAlarmLogBookPayloadSchema } from '../_shared/fire-alarm-log-book-payload-schema.ts';

/**
 * Fire Alarm Log Book — BS 5839-1:2025 Annex H export (ELE-1483).
 *
 * Replaces the client-side jsPDF export so the log book renders through the
 * same pipeline as every other certificate: one branding path, one place to
 * edit layout, and coverage by `npm run check:cert-mapping`.
 *
 * Authoritative template HTML: docs/templates/fire-alarm-log-book-template.html
 */

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = 'A89B34B4-018F-45AE-A6C0-3AFCA4A595A6';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface PDFMonkeyDocument {
  id: string;
  status: string;
  download_url?: string;
  preview_url?: string;
  errors?: string[];
}

async function createDoc(
  payload: Record<string, unknown>,
  templateId?: string
): Promise<PDFMonkeyDocument> {
  const r = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        document_template_id: templateId || TEMPLATE_ID,
        payload,
        status: 'pending',
      },
    }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Failed: ${r.status} - ${t}`);
  }
  return (await r.json()).document;
}

async function waitForPDF(docId: string, max = 30): Promise<PDFMonkeyDocument> {
  for (let i = 0; i < max; i++) {
    const r = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${docId}`, {
      headers: {
        Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const doc = (await r.json()).document;
    if (doc.status === 'success') return doc;
    if (doc.status === 'failure') throw new Error(`Failed: ${doc.errors?.join(', ')}`);
    await new Promise((res) => setTimeout(res, 1000));
  }
  throw new Error('Timed out');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    if (!PDFMONKEY_API_KEY) throw new Error('PDFMONKEY_API_KEY not set');
    const { formData, templateId } = await req.json();
    if (!formData) throw new Error('No form data');

    console.log(
      '[generate-fire-alarm-log-book-pdf] Premises:',
      formData.premises_name,
      'Period:',
      formData.period_label,
      'Entries:',
      formData.entries_total,
      'Open defects:',
      formData.open_defect_count
    );

    // Soft-fail schema check: log and report drift, never block the PDF. The
    // payload sent below is what the caller supplied, so validation only
    // observes — it must not become the source of what PDFMonkey renders.
    // Blocking here would mean no log book at all for someone stood in front
    // of a fire officer, over a field that may not even be printed.
    const validation = fireAlarmLogBookPayloadSchema.safeParse(formData);
    if (!validation.success) {
      console.error(
        '[generate-fire-alarm-log-book-pdf] Schema validation failed:',
        JSON.stringify(validation.error.issues.slice(0, 10))
      );
      await captureException(new Error('Fire alarm log book payload schema drift detected'), {
        functionName: 'generate-fire-alarm-log-book-pdf',
        extra: { issues: validation.error.issues.slice(0, 20) },
        tags: { schema_drift: 'true' },
      });
    }

    const doc = await createDoc(formData, templateId);
    const completed = await waitForPDF(doc.id);

    return new Response(
      JSON.stringify({
        success: true,
        document_id: completed.id,
        pdfUrl: completed.download_url,
        download_url: completed.download_url,
        preview_url: completed.preview_url,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[generate-fire-alarm-log-book-pdf]', message);
    await captureException(error instanceof Error ? error : new Error(message), {
      functionName: 'generate-fire-alarm-log-book-pdf',
    });
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
