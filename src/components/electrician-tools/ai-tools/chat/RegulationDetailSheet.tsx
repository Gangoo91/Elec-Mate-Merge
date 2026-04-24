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

        if (!regRow) {
          setReg(null);
          setIsLoading(false);
          return;
        }

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
          'bg-[hsl(0_0%_8%)] border-white/[0.06] text-white p-0 flex flex-col',
          isDesktop ? 'sm:max-w-md w-full' : 'h-[85vh] rounded-t-2xl'
        )}
      >
        {/* Header */}
        <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/[0.06]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                Regulation · {regulationNumber ?? '—'}
              </div>
              {sectionLabel && (
                <div className="mt-1.5 text-[15px] font-semibold text-white tracking-tight leading-snug">
                  {sectionLabel}
                </div>
              )}
              {amendmentLabel && (
                <div className="mt-2 inline-flex items-center gap-1.5">
                  <span
                    className={cn(
                      'text-[10px] font-medium uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border',
                      isA4
                        ? 'bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow'
                        : 'bg-white/[0.04] border-white/[0.08] text-white/70'
                    )}
                  >
                    {amendmentLabel}
                  </span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 h-8 px-3 rounded-full text-[12px] font-medium text-white/70 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors touch-manipulation"
              aria-label="Close regulation detail"
            >
              Close ×
            </button>
          </div>
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

          {!isLoading && !reg && (
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-6 text-center">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                Not found
              </div>
              <p className="mt-2 text-[13px] text-white/70 leading-relaxed">
                We could not find full text for this regulation in the A4:2026 database.
                Ask Elec-AI directly and it will cite whatever matches it can find.
              </p>
            </div>
          )}

          {!isLoading && reg && (
            <>
              {/* Full text */}
              <section>
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 mb-2">
                  Full text
                </div>
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] px-4 py-3">
                  <p className="text-[14px] leading-relaxed text-white whitespace-pre-wrap">
                    {reg.full_text?.trim() || 'No text recorded for this regulation.'}
                  </p>
                </div>
              </section>

              {/* Meta */}
              {(reg.part || reg.chapter) && (
                <section className="space-y-1.5">
                  <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                    Where it lives
                  </div>
                  {reg.part && (
                    <div className="text-[13px] text-white/70">{reg.part}</div>
                  )}
                  {reg.chapter && (
                    <div className="text-[13px] text-white/70">{reg.chapter}</div>
                  )}
                </section>
              )}

              {/* Related */}
              <section>
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 mb-2">
                  Related regulations
                </div>
                {related.length === 0 ? (
                  <p className="text-[13px] text-white/55">None recorded.</p>
                ) : (
                  <ul className="space-y-2">
                    {related.map((ref) => (
                      <li
                        key={ref.id}
                        className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] px-4 py-3"
                      >
                        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                          {ref.target_document_type === 'external'
                            ? ref.target_reg_number
                            : `Reg ${ref.target_reg_number}`}
                        </div>
                        {ref.ref_context && (
                          <p className="mt-1 text-[13px] text-white/70 leading-relaxed">
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
          <div className="shrink-0 border-t border-white/[0.06] px-5 py-3 bg-[hsl(0_0%_8%)]">
            <button
              type="button"
              onClick={handleAskFollowUp}
              className="w-full h-11 rounded-full text-[13px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 active:scale-[0.99] transition-all touch-manipulation"
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
