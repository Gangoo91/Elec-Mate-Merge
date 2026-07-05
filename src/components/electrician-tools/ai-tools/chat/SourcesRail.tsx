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
            // full_text usually opens with the flattened reg number ("3141
            // Every installation…") and often repeats the title — strip both
            // so the excerpt adds information instead of echoing.
            let excerpt = (row?.full_text || '').trim().replace(/^[\d.\s]+/, '');
            if (title && excerpt.toLowerCase().startsWith(title.toLowerCase())) {
              excerpt = excerpt.slice(title.length).replace(/^[\s—:-]+/, '');
            }
            return { reg_number: n, title, excerpt: excerpt.slice(0, 180) };
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
    <aside className="hidden xl:block w-[300px] flex-shrink-0">
      {/* Sticky wrapper owns its OWN scroll — a sticky element can't ride the
          page scroll past the viewport, so without this the tail sources were
          simply unreachable. */}
      <div className="sticky top-2 flex max-h-[calc(100vh-140px)] flex-col pl-6 border-l border-white/[0.06]">
        <div className="flex items-baseline justify-between pb-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
            Sources
          </span>
          <span className="text-[10px] tabular-nums text-white/30">
            {isStreaming ? 'updating…' : sources.length}
          </span>
        </div>

        <div
          className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain pr-1
            [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.12)_transparent]
            [mask-image:linear-gradient(to_bottom,black_calc(100%-24px),transparent)]"
        >
          {sources.map((s) => (
            <button
              key={s.reg_number}
              type="button"
              onClick={() => onOpenReg(s.reg_number)}
              className="group block w-full rounded-lg px-2 py-2.5 -ml-2 text-left touch-manipulation transition-colors hover:bg-white/[0.04]"
            >
              <div className="text-[12.5px] leading-snug">
                <span className="font-semibold text-elec-yellow">Reg {s.reg_number}</span>
                {s.title && (
                  <span className="font-medium text-white/85"> — {s.title}</span>
                )}
              </div>
              {s.excerpt && (
                <p className="mt-1 text-[11.5px] leading-relaxed text-white/40 line-clamp-2">
                  {s.excerpt}
                </p>
              )}
            </button>
          ))}
        </div>

        <div className="pt-3 mt-1 border-t border-white/[0.06] text-[10.5px] leading-relaxed text-white/30">
          BS 7671:2018+A4:2026 · every citation machine-checked
        </div>
      </div>
    </aside>
  );
}

export default SourcesRail;
