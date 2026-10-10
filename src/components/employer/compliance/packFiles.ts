/**
 * Links to files in the private compliance-documents bucket for the firm's
 * packs (ELE-2076 "Send our pack", ELE-2069 assessment pack zip).
 *
 * The bucket is own-folder read only, so the browser can only sign files the
 * signed-in person uploaded. The firm-pack-files edge function signs any of
 * the firm's documents the caller manages, and a share's documents by its
 * token, for 10 minutes. Until that function is deployed we fall back to
 * signing in the browser, which works for your own uploads only; callers
 * must say which files could not be reached rather than send them empty.
 */
import { supabase } from '@/integrations/supabase/client';

const FN = 'firm-pack-files';

let probe: Promise<boolean> | null = null;

/** Is the firm-pack-files function deployed? Checked once per page load. */
export function packFilesServerReady(): Promise<boolean> {
  if (!probe)
    probe = supabase.functions
      .invoke(FN, { body: { mode: 'probe' } })
      .then(({ data, error }) => !error && !!(data as { ok?: boolean } | null)?.ok)
      .catch(() => false);
  return probe;
}

export interface FirmFile {
  id: string;
  file_url?: string | null;
}

/** Short-lived links for the firm's documents, keyed by document id. A
 *  document missing from the result could not be reached. */
export async function signFirmDocuments(
  docs: FirmFile[],
  browserSeconds = 600
): Promise<Record<string, string>> {
  const withFile = docs.filter((d) => d.file_url);
  if (!withFile.length) return {};
  if (await packFilesServerReady()) {
    const { data, error } = await supabase.functions.invoke(FN, {
      body: { mode: 'firm', document_ids: withFile.map((d) => d.id) },
    });
    if (!error && data && typeof data === 'object')
      return ((data as { links?: Record<string, string> }).links ?? {}) as Record<string, string>;
  }
  // Fallback: the browser can sign only the signed-in person's own uploads.
  const out: Record<string, string> = {};
  for (const d of withFile) {
    const f = d.file_url!;
    if (/^https:\/\//i.test(f)) {
      out[d.id] = f;
      continue;
    }
    if (/^[a-z]+:/i.test(f)) continue;
    const { data } = await supabase.storage
      .from('compliance-documents')
      .createSignedUrl(f, browserSeconds);
    if (data?.signedUrl) out[d.id] = data.signedUrl;
  }
  return out;
}

/** Links for a share's documents, opened signed out. Empty if the share is
 *  stopped, expired or the function is not deployed yet. */
export async function shareDocumentLinks(token: string): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase.functions.invoke(FN, {
      body: { mode: 'share', token },
    });
    if (error || !data || typeof data !== 'object') return {};
    return ((data as { links?: Record<string, string> }).links ?? {}) as Record<string, string>;
  } catch {
    return {};
  }
}

/** Only https links are ever shown or opened. */
export const isHttpsUrl = (u: unknown): u is string =>
  typeof u === 'string' && /^https:\/\/[^\s]+$/i.test(u.trim());
