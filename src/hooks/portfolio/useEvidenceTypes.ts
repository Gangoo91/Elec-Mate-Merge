/**
 * Evidence types — the rules the capture sheet was ignoring.
 *
 * `evidence_types` has held ten types since January, each with its own MIME
 * allowlist, its own size cap and a `requires_witness` flag. The capture sheet
 * used none of it: one flat `accept="image/*,video/*,.pdf,.doc,.docx"` and a
 * hard-coded 10MB limit for everything.
 *
 * Two things followed from that.
 *
 *   • VIDEO WAS UNUSABLE. The type is defined at 50MB; the sheet rejected
 *     anything over 10MB. A 30-second phone clip of a termination is 15–40MB,
 *     so a whole evidence category could not be uploaded at all.
 *   • NOTHING WAS TYPED, so `requires_witness` was never enforced and only 4
 *     of 19 existing portfolio items carry a file_type. An assessor cannot
 *     tell a witness statement from a snapshot of a consumer unit.
 *
 * This reads the table and answers the two questions the sheet actually has:
 * "what can I accept?" and "what is this file?".
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { EvidenceType, EvidenceTypeCode } from '@/types/evidence';

/**
 * Used until the table loads, and if it ever fails.
 *
 * Deliberately permissive on size — a learner on site should never lose a
 * capture because a lookup was slow. The server-side bucket limit is the real
 * ceiling; this is guidance, not security.
 */
const FALLBACK_MAX_MB = 50;

/** Extension → MIME, for the cases where the browser reports nothing. */
const EXT_MIME: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  heic: 'image/heic',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  txt: 'text/plain',
};

export function mimeOf(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  return EXT_MIME[ext] ?? '';
}

export function useEvidenceTypes() {
  const [types, setTypes] = useState<EvidenceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('evidence_types')
        .select('*')
        .order('sort_order');
      if (cancelled) return;
      if (error) {
        // Non-fatal: capture still works, it just falls back to the ceiling.
        console.error('Evidence types failed to load:', error);
      } else {
        setTypes((data || []) as EvidenceType[]);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /** Every MIME any type accepts — what the file picker should allow. */
  const acceptAttr = useMemo(() => {
    if (types.length === 0) return 'image/*,video/*,.pdf,.doc,.docx,.txt';
    const mimes = new Set<string>();
    for (const t of types) for (const m of t.allowed_file_types) mimes.add(m);
    // Keep the wildcards: `image/*` catches HEIC off an iPhone, which no
    // explicit list in the table mentions.
    return ['image/*', 'video/*', ...Array.from(mimes)].join(',');
  }, [types]);

  /**
   * The largest cap of any type that would accept this file.
   *
   * Per-file rather than global: an mp4 gets video's 50MB, a PDF gets the
   * 10MB that documents and certificates allow. Taking the MAX is deliberate —
   * a PDF is a valid certificate (10MB) or a valid work log (5MB), and
   * refusing a 7MB certificate because work logs cap at 5 would be nonsense.
   */
  const maxBytesFor = useCallback(
    (file: File): number => {
      const mime = mimeOf(file);
      if (types.length === 0) return FALLBACK_MAX_MB * 1024 * 1024;
      const caps = types
        .filter((t) => t.allowed_file_types.some((m) => m === mime || mime.startsWith(m.split('/')[0] + '/')))
        .map((t) => t.max_file_size_mb);
      const mb = caps.length > 0 ? Math.max(...caps) : FALLBACK_MAX_MB;
      return mb * 1024 * 1024;
    },
    [types]
  );

  /**
   * Best guess at what a file IS, so the apprentice starts from something
   * sensible rather than an empty picker. They can always correct it — and the
   * guess is deliberately conservative: anything that is not obviously a photo
   * or a video becomes a generic document rather than claiming to be a
   * certificate it may not be.
   */
  const inferCode = useCallback((file: File): EvidenceTypeCode => {
    const mime = mimeOf(file);
    const name = file.name.toLowerCase();
    if (mime.startsWith('video/')) return 'video';
    if (/eicr|eic[-_ ]|minor.?works|certificate|cert[-_ ]/.test(name)) return 'certificate';
    if (/witness|testimony|statement/.test(name)) return 'witness';
    if (/schedule.?of.?test|test.?result|insulation|continuity/.test(name)) return 'test_result';
    if (/rams|risk.?assess|method.?statement|job.?sheet/.test(name)) return 'document';
    if (/drawing|schematic|layout|as.?built/.test(name)) return 'drawing';
    if (/calc|cable.?siz|volt.?drop/.test(name)) return 'calculation';
    if (mime.startsWith('image/')) return 'photo';
    return 'document';
  }, []);

  const byCode = useCallback(
    (code: EvidenceTypeCode) => types.find((t) => t.code === code) ?? null,
    [types]
  );

  return { types, loading, acceptAttr, maxBytesFor, inferCode, byCode };
}
