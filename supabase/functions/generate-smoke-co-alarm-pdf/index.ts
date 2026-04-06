import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = ''; // Set once template is created in PDF Monkey

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
    console.log('[generate-smoke-co-alarm-pdf] Ref:', formData.referenceNumber, 'Grade:', formData.gradeAchieved, 'Cat:', formData.categoryAchieved, 'Alarms:', formData.alarms?.length);
    const doc = await createDoc(formData, templateId);
    const completed = await waitForPDF(doc.id);
    return new Response(JSON.stringify({ success: true, document_id: completed.id, download_url: completed.download_url, preview_url: completed.preview_url }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('[generate-smoke-co-alarm-pdf] Error:', error);
    return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
