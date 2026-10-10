/**
 * Render a Learner Record payload through PDFMonkey (ELE-2017) and return the
 * PDF bytes. One template, `Learner Record`, carries every apprentice and
 * college document (portfolio evidence pack summary, EPAO gateway pack, and
 * the rest of ELE-2017 as they move over); each caller maps its record into
 * the payload described at the top of pdf-templates/learner-record.src.html.
 *
 * The caller stores the bytes in our own private bucket — PDFMonkey's
 * download URL is presigned and expires — so the remote document is deleted
 * once fetched.
 */
const PDFMONKEY_API = 'https://api.pdfmonkey.io/api/v1';

export const LEARNER_RECORD_TEMPLATE_ID =
  Deno.env.get('LEARNER_RECORD_TEMPLATE_ID') || '04f4df81-8716-447f-87ae-e20526da0269';

export async function renderLearnerRecord(
  payload: unknown,
  filename: string,
  opts: { timeoutMs?: number; templateId?: string } = {}
): Promise<Uint8Array> {
  const apiKey = Deno.env.get('PDFMONKEY_API_KEY');
  if (!apiKey) throw new Error('PDFMONKEY_API_KEY is not set');
  const headers = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };

  const createRes = await fetch(`${PDFMONKEY_API}/documents`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      document: {
        document_template_id: opts.templateId || LEARNER_RECORD_TEMPLATE_ID,
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
    // A portfolio with many photos takes longer than a certificate.
    const deadline = Date.now() + (opts.timeoutMs ?? 120_000);
    let status = 'pending';
    let downloadUrl = '';
    let failure = '';
    while (Date.now() < deadline && status !== 'success' && status !== 'failure') {
      await new Promise((r) => setTimeout(r, 2000));
      const poll = await fetch(`${PDFMONKEY_API}/documents/${documentId}`, { headers });
      if (!poll.ok) continue;
      const doc = JSON.parse((await poll.text()).replace(/[\u0000-\u001f]+/g, ' '))?.document ?? {};
      status = doc.status ?? status;
      downloadUrl = doc.download_url ?? '';
      failure = doc.failure_cause ?? '';
    }
    if (status !== 'success' || !downloadUrl) throw new Error(failure || `PDFMonkey ${status}`);
    const res = await fetch(downloadUrl);
    if (!res.ok) throw new Error(`PDFMonkey download failed (${res.status})`);
    return new Uint8Array(await res.arrayBuffer());
  } finally {
    fetch(`${PDFMONKEY_API}/documents/${documentId}`, { method: 'DELETE', headers }).catch(
      () => {}
    );
  }
}

/** Count pages in a PDF without a parser: one /Type /Page per page object. */
export function pdfPageCount(bytes: Uint8Array): number | null {
  try {
    const text = new TextDecoder('latin1').decode(bytes);
    const n = (text.match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
    return n || null;
  } catch {
    return null;
  }
}
