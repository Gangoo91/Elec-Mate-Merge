import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';
import { g98PayloadSchema } from '../_shared/g98-payload-schema.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '3C669DC3-FFCB-4A22-A8BA-A30989BFCC10';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface PDFMonkeyDocument { id: string; status: string; download_url?: string; preview_url?: string; errors?: string[]; }

async function createDoc(payload: Record<string, unknown>, templateId?: string): Promise<PDFMonkeyDocument> {
  const r = await fetch('https://api.pdfmonkey.io/api/v1/documents', { method: 'POST', headers: { Authorization: `Bearer ${PDFMONKEY_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ document: { document_template_id: templateId || TEMPLATE_ID, payload, status: 'pending' } }) });
  if (!r.ok) { const t = await r.text(); throw new Error(`Failed: ${r.status} - ${t}`); }
  return (await r.json()).document;
}

async function waitForPDF(docId: string, max = 30): Promise<PDFMonkeyDocument> {
  for (let i = 0; i < max; i++) {
    const r = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${docId}`, { headers: { Authorization: `Bearer ${PDFMONKEY_API_KEY}`, 'Content-Type': 'application/json' } });
    const doc = (await r.json()).document;
    if (doc.status === 'success') return doc;
    if (doc.status === 'failure') throw new Error(`Failed: ${doc.errors?.join(', ')}`);
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('Timed out');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    if (!PDFMONKEY_API_KEY) throw new Error('PDFMONKEY_API_KEY not set');
    const { formData, templateId } = await req.json();
    if (!formData) throw new Error('No form data');
    console.log('[generate-g98-commissioning-pdf] Ref:', formData.referenceNumber, 'DNO:', formData.dnoName);
    // Soft-fail schema check: log and report drift, never block the PDF. The
    // payload sent below is the RAW formData, so validation only observes —
    // it must not become the source of what PDFMonkey renders.
    const validation = g98PayloadSchema.safeParse(formData);
    if (!validation.success) {
      console.error('[generate-g98-commissioning-pdf] Schema validation failed:', JSON.stringify(validation.error.issues.slice(0, 10)));
      await captureException(new Error('G98 payload schema drift detected'), {
        functionName: 'generate-g98-commissioning-pdf',
        extra: { issues: validation.error.issues.slice(0, 20) },
        tags: { schema_drift: 'true' },
      });
    }

    const doc = await createDoc(formData, templateId);
    const completed = await waitForPDF(doc.id);
    return new Response(JSON.stringify({ success: true, document_id: completed.id, pdfUrl: completed.download_url, download_url: completed.download_url, preview_url: completed.preview_url }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    await captureException(error, { functionName: 'generate-g98-commissioning-pdf', requestUrl: req.url, requestMethod: req.method });
    console.error('[generate-g98-commissioning-pdf] Error:', error);
    return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
