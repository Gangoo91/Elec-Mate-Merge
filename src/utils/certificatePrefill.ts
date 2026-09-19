/**
 * Who and where a certificate is for, when it was started from a job.
 *
 * The job page and the diary's event sheet both send
 * `/electrician/inspection-testing/new?projectId=…&clientName=…&address=…`.
 * Until ELE-1755 nothing read those three parameters — the type picker
 * dropped them on the way to the form, and no form looked for them — so
 * "customer and address prefilled" was a URL and nothing more.
 *
 * Read from the live URL at the moment a form builds its defaults, never
 * cached at module load: the same form component serves a resumed draft
 * later in the session, and a stale prefill would land on the wrong cert.
 */
export interface CertificatePrefill {
  projectId: string | null;
  clientName: string;
  address: string;
}

const KEYS = ['projectId', 'clientName', 'address'] as const;

export function readCertificatePrefill(): CertificatePrefill | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const clientName = (params.get('clientName') ?? '').trim();
  const address = (params.get('address') ?? '').trim();
  const projectId = (params.get('projectId') ?? '').trim() || null;
  if (!clientName && !address && !projectId) return null;
  return { projectId, clientName, address };
}

/**
 * The same three parameters as a query string (no leading `?` or `&`), so
 * the type picker can carry them on to whichever form it opens.
 */
export function certificatePrefillQuery(): string {
  if (typeof window === 'undefined') return '';
  const from = new URLSearchParams(window.location.search);
  const out = new URLSearchParams();
  for (const k of KEYS) {
    const v = from.get(k);
    if (v) out.set(k, v);
  }
  return out.toString();
}
