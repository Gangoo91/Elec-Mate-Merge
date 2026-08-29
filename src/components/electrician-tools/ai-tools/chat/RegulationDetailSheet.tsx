import { memo, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const A4_2026_EDITION_ID = '41c1f30d-4f1a-432f-9e2d-61b91290149f';

interface Regulation {
  id: string;
  reg_number: string;
  title: string | null;
  part: string | null;
  chapter: string | null;
  section: string | null;
  introduced_in: string | null;
  updated_in: string | null;
  full_text: string | null;
}

/**
 * The stored regulation text is a rough PDF extraction, wrong in three ways
 * that all reached the screen as one wall of text:
 *
 *   1. Arbitrary line breaks and glued tokens ("Ina TN system",
 *      "exceeding5 s", "NOTE4").
 *   2. A row frequently RUNS ON past its own regulation into the next ones —
 *      411.4.4's stored text continues into 411.3.2.3, .4, .5 and 411.3.3,
 *      so most of what renders isn't the regulation the user tapped.
 *   3. Lettered enumerations and NOTEs are buried mid-paragraph.
 *
 * The parser below fixes all three at display time: clean the tokens, split
 * the blob into per-regulation chunks at embedded reg-number boundaries
 * (skipping numbers that are mere references — "see Regulation 411.3.2.2"),
 * and mark list items and NOTEs so they can render as structure.
 */
function cleanExtractedText(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .replace(/\bNOTE(\d)/g, 'NOTE $1')
    // Only un-glue digits from known connective words — a blanket
    // letter/digit rule would damage genuine tokens like "mm2".
    .replace(/\b(exceeding|than|of|to|within|least|and|by)(\d)/g, '$1 $2')
    .replace(/\bIna\b/g, 'In a')
    .trim();
}

interface RegPara {
  kind: 'text' | 'note' | 'item';
  /** Enumeration marker for items — "a", "b", "ii"… */
  marker?: string;
  text: string;
}

interface RegChunk {
  /** null for the requested regulation's own text (the opening chunk). */
  reg: string | null;
  paras: RegPara[];
}

function parseBody(body: string): RegPara[] {
  const marked = body
    // NOTEs become their own paragraphs.
    .replace(/\s*\bNOTE(\s*\d+)?\s*:\s*/g, (_m, d) => `\n§NOTE${(d || '').trim()}: `)
    // Enumeration items — only after list-introducing punctuation, so inline
    // references ("an exception to (b) but not (a)") stay in their sentence.
    .replace(
      /([:;.])\s*(?:and\s+|or\s+)?\(([a-z]|i{1,3}|iv|v|vi{1,3}|ix|x)\)\s+/g,
      (_m, p, marker) => `${p}\n§ITEM(${marker}) `
    );

  return marked
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line): RegPara => {
      const note = line.match(/^§NOTE(\d*):\s*(.*)$/);
      if (note) {
        return { kind: 'note', text: `NOTE${note[1] ? ` ${note[1]}` : ''}: ${note[2]}` };
      }
      const item = line.match(/^§ITEM\(([a-z]+)\)\s*(.*)$/);
      if (item) return { kind: 'item', marker: item[1], text: item[2] };
      return { kind: 'text', text: line };
    });
}

function segmentRegText(raw: string, requestedNumber: string | null): RegChunk[] {
  let t = cleanExtractedText(raw);
  if (requestedNumber) {
    t = t.replace(new RegExp(`^${requestedNumber.replace(/\./g, '\\.')}\\.?\\s*`), '');
  }

  // A reg number starts a NEW regulation's text when a capital (or an
  // enumeration bracket) follows AND it is not preceded by words that make it
  // a reference to one.
  const boundaries: Array<{ index: number; reg: string }> = [];
  const re = /\b(\d{3}(?:\.\d{1,3}){1,3})(?=\s+[A-Z(])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t)) !== null) {
    const lookback = t.slice(Math.max(0, m.index - 26), m.index);
    if (/(regulations?|section|chapter|table|part|indent|see|to|and|or|by|of|in|with|,|\()\s*$/i.test(lookback)) {
      continue;
    }
    boundaries.push({ index: m.index, reg: m[1] });
  }

  const chunks: RegChunk[] = [];
  const firstEnd = boundaries.length > 0 ? boundaries[0].index : t.length;
  const own = t.slice(0, firstEnd).trim();
  if (own) chunks.push({ reg: null, paras: parseBody(own) });
  boundaries.forEach((b, i) => {
    const end = i + 1 < boundaries.length ? boundaries[i + 1].index : t.length;
    const body = t
      .slice(b.index, end)
      .replace(new RegExp(`^${b.reg.replace(/\./g, '\\.')}\\.?\\s*`), '')
      .trim();
    if (body) chunks.push({ reg: b.reg, paras: parseBody(body) });
  });
  return chunks;
}

/** Flat single-paragraph fallback for the line-clamped sibling excerpts. */
function normaliseRegText(raw: string): string {
  return cleanExtractedText(raw);
}

/** Renders one parsed chunk — paragraphs, enumeration rows, quieter NOTEs. */
function RegChunkBlock({ chunk }: { chunk: RegChunk }) {
  return (
    <div className="min-w-0">
      {chunk.reg && (
        <div className="mb-1.5 text-[12.5px] font-semibold text-elec-yellow">
          Reg {chunk.reg}
        </div>
      )}
      {chunk.paras.map((p, i) => {
        if (p.kind === 'item') {
          return (
            <div key={i} className="mt-1.5 flex gap-2.5 pl-1">
              <span className="shrink-0 font-mono text-[13px] font-semibold text-elec-yellow">
                ({p.marker})
              </span>
              <span className="min-w-0 flex-1 text-[14px] leading-relaxed text-white">
                {p.text}
              </span>
            </div>
          );
        }
        if (p.kind === 'note') {
          return (
            <p
              key={i}
              className="mt-2.5 border-l-2 border-white/[0.2] pl-3 text-[12.5px] italic leading-relaxed text-white"
            >
              {p.text}
            </p>
          );
        }
        return (
          <p key={i} className="mt-2 text-[14px] leading-relaxed text-white first:mt-0">
            {p.text}
          </p>
        );
      })}
    </div>
  );
}

interface CrossRef {
  id: string;
  target_reg_number: string;
  target_document_type: string | null;
  ref_context: string | null;
}

interface RegulationDetailSheetProps {
  /** Controls visibility. */
  isOpen: boolean;
  /** Reg number to fetch (e.g. "411.4.1"). `null` keeps the sheet hidden. */
  regulationNumber: string | null;
  /** Fires when the user closes the sheet. */
  onClose: () => void;
  /**
   * Fires when the user taps "Ask a follow-up". Passes a pre-written
   * question string for the parent to shove into the chat input.
   */
  onAskFollowUp?: (seedQuestion: string) => void;
  /** Override edition — defaults to A4:2026. */
  editionId?: string;
}

/**
 * RegulationDetailSheet — Side sheet (sm+) / bottom sheet (mobile) showing
 * the full text of a single BS 7671 regulation plus its cross-references.
 *
 * Fetches on demand from the `bs7671_regulations` + `bs7671_cross_refs`
 * tables. No lucide icons — all actions are text-led.
 */
export const RegulationDetailSheet = memo(function RegulationDetailSheet({
  isOpen,
  regulationNumber,
  onClose,
  onAskFollowUp,
  editionId = A4_2026_EDITION_ID,
}: RegulationDetailSheetProps) {
  const [reg, setReg] = useState<Regulation | null>(null);
  const [related, setRelated] = useState<CrossRef[]>([]);
  const [siblings, setSiblings] = useState<Regulation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 640px)').matches
      : true
  );

  // Watch viewport for side vs bottom placement.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 640px)');
    const update = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    update(mq);
    const listener = (e: MediaQueryListEvent) => update(e);
    if (mq.addEventListener) {
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
    // Safari < 14
    mq.addListener(listener);
    return () => mq.removeListener(listener);
  }, []);

  useEffect(() => {
    if (!isOpen || !regulationNumber) return;

    let cancelled = false;
    setIsLoading(true);
    setReg(null);
    setRelated([]);
    setSiblings([]);

    (async () => {
      try {
        // NB: Older schema doc referenced `regulation_number`; actual column
        // is `reg_number`. We look up by reg_number within the edition.
        const { data: regRow, error: regErr } = await supabase
          .from('bs7671_regulations')
          .select(
            'id, reg_number, title, part, chapter, section, introduced_in, updated_in, full_text'
          )
          .eq('reg_number', regulationNumber)
          .eq('edition_id', editionId)
          .maybeSingle();

        if (regErr) throw regErr;
        if (cancelled) return;

        if (regRow) {
          setReg(regRow as unknown as Regulation);

          const { data: refs, error: refErr } = await supabase
            .from('bs7671_cross_refs')
            .select('id, target_reg_number, target_document_type, ref_context')
            .eq('source_reg_number', regulationNumber)
            .limit(5);
          if (refErr) {
            console.warn('[RegulationDetailSheet] cross-refs failed', refErr);
          } else if (!cancelled) {
            setRelated((refs ?? []) as unknown as CrossRef[]);
          }
          return;
        }

        // Exact match miss — the AI quoted a section heading (e.g. "525.2")
        // that doesn't have its own row, only sub-regs (525.201, 525.202…).
        // Fall back to a prefix LIKE search and return the matching sub-regs
        // as a sibling list. Two flavours:
        //   - "525.2"   → match "525.2%" (e.g. 525.201, 525.202)
        //   - "411"     → match "411.%" or "411%"
        const prefixA = `${regulationNumber}.%`; // 525.2.X
        const prefixB = `${regulationNumber}%`;  // 525.2X (no dot)
        const { data: siblingRows, error: sibErr } = await supabase
          .from('bs7671_regulations')
          .select(
            'id, reg_number, title, part, chapter, section, introduced_in, updated_in, full_text'
          )
          .eq('edition_id', editionId)
          .or(`reg_number.like.${prefixA},reg_number.like.${prefixB}`)
          .order('reg_number', { ascending: true })
          .limit(20);

        if (sibErr) {
          console.warn('[RegulationDetailSheet] sibling lookup failed', sibErr);
        }
        if (!cancelled) {
          setSiblings((siblingRows ?? []) as unknown as Regulation[]);
        }
      } catch (err) {
        console.error('[RegulationDetailSheet] fetch failed', err);
        if (!cancelled) {
          toast.error('Could not load regulation');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, regulationNumber, editionId]);

  const amendmentLabel = reg?.updated_in || reg?.introduced_in || null;
  const isA4 = amendmentLabel?.toLowerCase().includes('a4');
  const sectionLabel =
    reg?.section?.trim() ||
    reg?.chapter?.trim() ||
    reg?.part?.trim() ||
    reg?.title?.trim() ||
    null;

  const handleAskFollowUp = () => {
    if (!regulationNumber || !onAskFollowUp) return;
    const seed = sectionLabel
      ? `Regarding Regulation ${regulationNumber} (${sectionLabel}) — can you explain how this applies in practice?`
      : `Can you explain Regulation ${regulationNumber} in more detail, with a practical jobsite example?`;
    onAskFollowUp(seed);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(next) => !next && onClose()}>
      <SheetContent
        side={isDesktop ? 'right' : 'bottom'}
        hideCloseButton
        className={cn(
          'bg-elec-dark border-white/[0.08] text-white p-0 flex flex-col',
          isDesktop ? 'sm:max-w-md w-full' : 'h-[85vh] rounded-t-2xl'
        )}
      >
        {/* Header — the reg number IS the identity, so it carries the volt,
            same as the sources rail. Closed by the shared volt hairline. */}
        <div className="relative shrink-0 px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[17px] font-semibold tracking-tight text-elec-yellow">
                  Reg {regulationNumber ?? '—'}
                </h2>
                {amendmentLabel && (
                  <span
                    className={cn(
                      'text-[10px] font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border',
                      isA4
                        ? 'border-elec-yellow/40 text-elec-yellow'
                        : 'border-white/[0.14] text-white'
                    )}
                  >
                    {amendmentLabel}
                  </span>
                )}
              </div>
              {sectionLabel && (
                <div className="mt-1 text-[14px] font-semibold text-white tracking-tight leading-snug">
                  {sectionLabel}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 h-9 px-3.5 rounded-full text-[12px] font-medium text-white bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.10] hover:border-white/[0.22] active:scale-[0.97] transition-all touch-manipulation [-webkit-tap-highlight-color:transparent]"
              aria-label="Close regulation detail"
            >
              Close
            </button>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0"
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {isLoading && (
            <div className="space-y-3">
              <div className="h-3 w-1/2 rounded-full bg-white/[0.06] animate-pulse" />
              <div className="h-3 w-full rounded-full bg-white/[0.06] animate-pulse" />
              <div className="h-3 w-5/6 rounded-full bg-white/[0.06] animate-pulse" />
              <div className="h-3 w-3/4 rounded-full bg-white/[0.06] animate-pulse" />
            </div>
          )}

          {!isLoading && !reg && siblings.length === 0 && (
            <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] px-4 py-6 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                Not found
              </div>
              <p className="mt-2 text-[13px] text-white leading-relaxed">
                We couldn't find this regulation in the A4:2026 database.
                Ask Elec-AI directly and it will cite whatever matches it can find.
              </p>
            </div>
          )}

          {/* Section-heading fallback: AI quoted "525.2" which isn't its own
              row — only the sub-regs (525.201, 525.202…) are stored. Show
              those as a navigable list. */}
          {!isLoading && !reg && siblings.length > 0 && (
            <section>
              <h3 className="text-[13px] font-semibold tracking-tight text-elec-yellow mb-2">Section {regulationNumber} — sub-regulations</h3>
              <p className="text-[12px] text-white leading-relaxed mb-3">
                {regulationNumber} is a section heading. The actual regulations live
                under it — listed below.
              </p>
              <ul className="space-y-2">
                {siblings.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                  >
                    <div className="text-[12.5px] font-semibold text-elec-yellow">Reg {s.reg_number}</div>
                    {s.title && (
                      <div className="mt-1 text-[14px] font-semibold text-white leading-snug">
                        {s.title}
                      </div>
                    )}
                    {s.full_text && (
                      <p className="mt-1.5 text-[13px] text-white leading-relaxed line-clamp-4">
                        {normaliseRegText(s.full_text)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {!isLoading && reg && (
            <>
              {/* Full text — parsed into per-regulation chunks with labelled
                  enumerations and NOTEs, not one undivided blob. */}
              <section>
                <h3 className="text-[13px] font-semibold tracking-tight text-elec-yellow mb-2">Full text</h3>
                {(() => {
                  if (!reg.full_text) {
                    return (
                      <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                        <p className="text-[14px] leading-relaxed text-white">
                          No text recorded for this regulation.
                        </p>
                      </div>
                    );
                  }
                  const chunks = segmentRegText(reg.full_text, reg.reg_number);
                  return (
                    <div className="space-y-2.5">
                      {chunks.map((chunk, i) => (
                        <div
                          key={`${chunk.reg ?? 'own'}-${i}`}
                          className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                        >
                          <RegChunkBlock chunk={chunk} />
                        </div>
                      ))}
                      {chunks.length > 1 && (
                        <p className="px-1 text-[11.5px] leading-relaxed text-white">
                          This extract runs on into the neighbouring regulations shown —
                          each block is labelled with the regulation it belongs to.
                        </p>
                      )}
                    </div>
                  );
                })()}
              </section>

              {/* Meta */}
              {(reg.part || reg.chapter) && (
                <section className="space-y-1.5">
                  <h3 className="text-[13px] font-semibold tracking-tight text-elec-yellow">Where it lives</h3>
                  {reg.part && (
                    <div className="text-[13px] text-white">{reg.part}</div>
                  )}
                  {reg.chapter && (
                    <div className="text-[13px] text-white">{reg.chapter}</div>
                  )}
                </section>
              )}

              {/* Related */}
              <section>
                <h3 className="text-[13px] font-semibold tracking-tight text-elec-yellow mb-2">Related regulations</h3>
                {related.length === 0 ? (
                  <p className="text-[13px] text-white">None recorded.</p>
                ) : (
                  <ul className="space-y-2">
                    {related.map((ref) => (
                      <li
                        key={ref.id}
                        className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                      >
                        <div className="text-[12.5px] font-semibold text-elec-yellow">
                          {ref.target_document_type === 'external'
                            ? ref.target_reg_number
                            : `Reg ${ref.target_reg_number}`}
                        </div>
                        {ref.ref_context && (
                          <p className="mt-1 text-[13px] text-white leading-relaxed">
                            {ref.ref_context}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </>
          )}
        </div>

        {/* Footer actions */}
        {onAskFollowUp && reg && (
          <div className="shrink-0 border-t border-white/[0.08] px-5 py-3 bg-elec-dark pb-safe">
            <button
              type="button"
              onClick={handleAskFollowUp}
              className="w-full h-11 rounded-full text-[13px] font-semibold text-black bg-gradient-to-b from-[hsl(47_100%_57%)] to-[hsl(47_100%_47%)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] hover:from-[hsl(47_100%_61%)] hover:to-[hsl(47_100%_50%)] active:from-[hsl(47_100%_52%)] active:to-[hsl(47_100%_44%)] active:scale-[0.99] transition-all touch-manipulation [-webkit-tap-highlight-color:transparent]"
            >
              Ask a follow-up about this reg
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
});

export default RegulationDetailSheet;
