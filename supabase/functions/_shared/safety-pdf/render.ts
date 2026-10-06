/**
 * Render a Safety Record payload through PDFMonkey and return the PDF bytes.
 *
 * The caller stores the bytes in our own bucket (PDFMonkey download URLs are
 * presigned and expire), so the remote document is deleted once fetched.
 * Throws on any failure — generate-safety-record-pdf catches that and falls
 * back to the Browserless HTML template, so a PDFMonkey outage costs the
 * branded layout, never the document.
 */
const PDFMONKEY_API = 'https://api.pdfmonkey.io/api/v1';

export const SAFETY_RECORD_TEMPLATE_ID =
  Deno.env.get('SAFETY_RECORD_TEMPLATE_ID') || 'fc5d23a0-fa61-44c4-8cd6-fb7e23a61df1';

export async function renderSafetyRecord(payload: unknown, filename: string): Promise<Uint8Array> {
  const apiKey = Deno.env.get('PDFMONKEY_API_KEY');
  if (!apiKey) throw new Error('PDFMONKEY_API_KEY is not set');
  const headers = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };

  const createRes = await fetch(`${PDFMONKEY_API}/documents`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      document: {
        document_template_id: SAFETY_RECORD_TEMPLATE_ID,
        payload,
        status: 'pending',
        meta: JSON.stringify({ _filename: filename }),
      },
    }),
  });
  if (!createRes.ok) throw new Error(`PDFMonkey create failed (${createRes.status})`);
  const documentId = (await createRes.json())?.document?.id as string | undefined;
  if (!documentId) throw new Error('PDFMonkey returned no document id');

  try {
    // Photos make some records slower than a calculation report; 40s ceiling.
    let status = 'pending';
    let downloadUrl = '';
    let failure = '';
    for (let i = 0; i < 20 && status !== 'success' && status !== 'failure'; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const poll = await fetch(`${PDFMONKEY_API}/documents/${documentId}`, { headers });
      if (!poll.ok) continue;
      const doc = (await poll.json())?.document ?? {};
      status = doc.status ?? status;
      downloadUrl = doc.download_url ?? '';
      failure = doc.failure_cause ?? '';
    }
    if (status !== 'success' || !downloadUrl) throw new Error(failure || `PDFMonkey ${status}`);
    const res = await fetch(downloadUrl);
    if (!res.ok) throw new Error(`PDFMonkey download failed (${res.status})`);
    return new Uint8Array(await res.arrayBuffer());
  } finally {
    // Best effort — our copy is the record.
    fetch(`${PDFMONKEY_API}/documents/${documentId}`, { method: 'DELETE', headers }).catch(() => {});
  }
}

// deno-lint-ignore no-explicit-any
type BrandingRow = Record<string, any>;

/**
 * The masthead follows the LOGO, as the certificates and calculation reports
 * do (`mastheadFor` in src/utils/logoTone.ts): a light logo gets a dark band,
 * a dark logo a white one. The logo itself gets no box behind it.
 *
 * No "Company Name" placeholder: an electrician who has not filled in their
 * company profile gets their own name, and failing that nothing at all.
 */
export function companyFor(b: BrandingRow, fallbackName: string): Record<string, string> {
  const light = b.cert_logo_tone === 'light';
  const address = [b.company_address, b.company_postcode].filter(Boolean).join(', ');
  return {
    name: b.company_name || fallbackName || '',
    phone: b.company_phone || '',
    email: b.company_email || '',
    website: b.company_website || '',
    registration: b.company_registration || b.registration_scheme || '',
    address,
    logo: b.logo_data_url || b.logo_url || '',
    scheme_logo: b.scheme_logo_data_url || '',
    mast_bg: light ? '#0a1628' : '#ffffff',
    mast_fg: light ? '#ffffff' : '#0a1628',
    mast_sub: light ? '#c9d4e3' : '#334155',
    mast_rule: light ? 'rgba(255,255,255,0.16)' : '#e5e9f0',
  };
}
