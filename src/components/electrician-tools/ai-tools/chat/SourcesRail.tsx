/**
 * SourcesRail — persistent desktop evidence panel for Elec-AI.
 *
 * Shows the regulations cited by the latest assistant answer as a quiet,
 * readable column beside the chat (xl+ only; mobile keeps the sheet).
 * A spark writing a quote or report keeps the evidence in view instead of
 * tapping in and out of a bottom sheet.
 *
 * Design intent: typographic, not chrome. Reg number in yellow, title in
 * white, a two-line excerpt in low-emphasis text, hairline dividers.
 * Success is quiet — no badges; only the citation-check line at the foot.
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const A4_2026_EDITION_ID = '41c1f30d-4f1a-432f-9e2d-61b91290149f';

interface RailSource {
  reg_number: string;
  title: string | null;
  excerpt: string;
}

/**
 * Turn a stored `full_text` blob into an excerpt that is actually about the
 * regulation it is filed under.
 *
 * The source rows are PDF extractions and they are rough in two ways that both
 * reached the screen:
 *
 * 1. Words are broken onto their own lines ("Ferrous\nmetal,\nfor\nexample,"),
 *    so the old `.slice(0, 180)` produced a ragged fragment.
 * 2. A row frequently runs on past its own regulation into the next one. The
 *    stored text for 710.560.11 continues into 710.560.9 and 710.560.9.101, so
 *    the rail was attributing two other regulations' words to the one cited —
 *    directly under a line claiming every citation is machine-checked.
 *
 * So: collapse the whitespace, drop the leading reg number, and cut at the
 * first reg number that is NOT the one requested. If what remains opens
 * mid-sentence — a lower-case first letter means the chunk began part-way
 * through a clause — show nothing rather than a fragment that misleads.
 */
function buildExcerpt(
  fullText: string | null | undefined,
  regNumber: string,
  title: string | null
): string {
  if (!fullText) return '';

  let t = fullText.replace(/\s+/g, ' ').trim();

  // Leading reg number, with or without a trailing dot, plus table pipes.
  t = t.replace(new RegExp(`^${regNumber.replace(/\./g, '\\.')}\\.?\\s*`), '');
  t = t.replace(/^[|\s.]+/, '');

  if (title && t.toLowerCase().startsWith(title.toLowerCase())) {
    t = t.slice(title.length).replace(/^[\s—:-]+/, '');
  }

  // Stop at the next regulation number so the excerpt cannot borrow from a
  // neighbour. Requires a following capital or digit to avoid cutting on a
  // decimal inside a sentence.
  const next = t.search(/\b\d{3}(?:\.\d+){1,3}\b(?=\s+[A-Z0-9])/);
  if (next > 0) t = t.slice(0, next).trim();

  t = t.replace(/^[|\s.]+/, '').trim();
  if (!t) return '';

  // A lower-case opening means the stored chunk started mid-clause.
  if (/^[a-z]/.test(t)) return '';

  return t.length > 180 ? `${t.slice(0, 180).trimEnd()}…` : t;
}

interface SourcesRailProps {
  /** Cited reg numbers from the latest assistant answer. */
  regNumbers: string[];
  /** Opens the full regulation sheet. */
  onOpenReg: (regNumber: string) => void;
  /** True while an answer is still streaming (citations not final yet). */
  isStreaming?: boolean;
}

export function SourcesRail({ regNumbers, onOpenReg, isStreaming }: SourcesRailProps) {
  const [sources, setSources] = useState<RailSource[]>([]);

  useEffect(() => {
    let cancelled = false;
    if (regNumbers.length === 0) {
      setSources([]);
      return;
    }
    (async () => {
      try {
        const { data } = await supabase
          .from('bs7671_regulations')
          .select('reg_number, title, full_text')
          .in('reg_number', regNumbers.slice(0, 8))
          .eq('edition_id', A4_2026_EDITION_ID);
        if (cancelled) return;
        const byNumber = new Map(
          (data || []).map((r: any) => [r.reg_number as string, r])
        );
        // Preserve citation order; fall back to number-only rows for regs the
        // structured table doesn't carry (the answer text is still the source).
        setSources(
          regNumbers.slice(0, 8).map((n) => {
            const row = byNumber.get(n);
            const title = (row?.title || '').trim() || null;
            return { reg_number: n, title, excerpt: buildExcerpt(row?.full_text, n, title) };
          })
        );
      } catch {
        if (!cancelled) {
          setSources(regNumbers.slice(0, 8).map((n) => ({ reg_number: n, title: null, excerpt: '' })));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [regNumbers.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  if (regNumbers.length === 0) return null;

  return (
    // Shown from lg, not xl. At xl-only, every 1024–1279px laptop — a big share
    // of desktop use — got no rail at all despite having room for one; it just
    // starts narrower there and widens at xl.
    <aside className="hidden lg:block w-[248px] xl:w-[300px] flex-shrink-0">
      {/* Sticky wrapper owns its OWN scroll — a sticky element can't ride the
          page scroll past the viewport, so without this the tail sources were
          simply unreachable. */}
      <div className="sticky top-2 flex max-h-[calc(100vh-140px)] supports-[height:100dvh]:max-h-[calc(100dvh-140px)] flex-col pl-4 xl:pl-6 border-l border-white/[0.14]">
        <div className="flex items-baseline justify-between pb-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
            Sources
          </span>
          <span className="text-[10px] tabular-nums text-white">
            {isStreaming ? 'updating…' : sources.length}
          </span>
        </div>

        <div
          className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1
            [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent]"
        >
          {sources.map((s) => (
            <button
              key={s.reg_number}
              type="button"
              onClick={() => onOpenReg(s.reg_number)}
              className="group block w-full rounded-lg border border-white/[0.10] bg-white/[0.05] px-3 py-2.5 text-left touch-manipulation transition-colors hover:border-elec-yellow/40 hover:bg-white/[0.09]"
            >
              <div className="text-[12.5px] leading-snug">
                <span className="font-semibold text-elec-yellow">Reg {s.reg_number}</span>
                {s.title && (
                  <span className="font-medium text-white"> — {s.title}</span>
                )}
              </div>
              {s.excerpt && (
                <p className="mt-1 text-[11.5px] leading-relaxed text-white line-clamp-2">
                  {s.excerpt}
                </p>
              )}
            </button>
          ))}
        </div>

        <div className="pt-3 mt-1 border-t border-white/[0.14] text-[10.5px] leading-relaxed text-white">
          BS 7671:2018+A4:2026 · every citation machine-checked
        </div>
      </div>
    </aside>
  );
}

export default SourcesRail;
