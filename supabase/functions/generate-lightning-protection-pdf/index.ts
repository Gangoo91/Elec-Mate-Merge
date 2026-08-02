import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';
import { lightningProtectionPayloadSchema } from '../_shared/lightning-protection-payload-schema.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '0A5C3791-496D-45F9-BCA2-EAE36A55D99E';

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

async function createPDFMonkeyDocument(payload: Record<string, unknown>, templateId?: string): Promise<PDFMonkeyDocument> {
  const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: { Authorization: `Bearer ${PDFMONKEY_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ document: { document_template_id: templateId || TEMPLATE_ID, payload, status: 'pending' } }),
  });
  if (!response.ok) { const t = await response.text(); throw new Error(`Failed: ${response.status} - ${t}`); }
  return (await response.json()).document;
}

async function waitForPDF(docId: string, max = 30): Promise<PDFMonkeyDocument> {
  for (let i = 0; i < max; i++) {
    const r = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${docId}`, {
      headers: { Authorization: `Bearer ${PDFMONKEY_API_KEY}`, 'Content-Type': 'application/json' },
    });
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
    console.log('[generate-lightning-protection-pdf] Ref:', formData.certificateNumber);
    console.log('[generate-lightning-protection-pdf] Class:', formData.lpsClass);
    console.log('[generate-lightning-protection-pdf] Site:', formData.siteName || formData.siteAddress);
    console.log('[generate-lightning-protection-pdf] Earth tests:', formData.earthElectrodeTests?.length || 0);
    // Soft-fail schema check: log and report drift, never block the PDF. The
    // payload sent below is the RAW formData, so validation only observes —
    // it must not become the source of what PDFMonkey renders.
    const validation = lightningProtectionPayloadSchema.safeParse(formData);
    if (!validation.success) {
      console.error('[generate-lightning-protection-pdf] Schema validation failed:', JSON.stringify(validation.error.issues.slice(0, 10)));
      await captureException(new Error('Lightning protection payload schema drift detected'), {
        functionName: 'generate-lightning-protection-pdf',
        extra: { issues: validation.error.issues.slice(0, 20) },
        tags: { schema_drift: 'true' },
      });
    }

    const doc = await createPDFMonkeyDocument(formData, templateId);
    const completed = await waitForPDF(doc.id);
    return new Response(JSON.stringify({ success: true, document_id: completed.id, pdfUrl: completed.download_url, download_url: completed.download_url, preview_url: completed.preview_url }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    await captureException(error, { functionName: 'generate-lightning-protection-pdf', requestUrl: req.url, requestMethod: req.method });
    console.error('[generate-lightning-protection-pdf] Error:', error);
    return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
