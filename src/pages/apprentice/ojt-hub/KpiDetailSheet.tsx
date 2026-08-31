/**
 * KpiDetailSheet — what's behind the number, and what to do about it.
 *
 * The KPI row reported four figures and stopped. "22% verified · Lots still
 * pending" is a fact; it does not tell an apprentice which hours are pending,
 * why, or what the next move is — and off-the-job hours are the single thing
 * most apprentices are behind on. A figure without a breakdown and a next step
 * is a dashboard that judges you without helping.
 *
 * So each card opens this: the figure, where it came from, and ONE piece of
 * advice computed from their actual position — never generic encouragement.
 *
 * Deliberately read-only apart from a single action button. This is a "what
 * does that mean" surface; editing lives in the log sheet.
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

export interface KpiBreakdownRow {
  label: string;
  value: string;
  /** 0–1. Draws the proportion bar. Omit for a plain key/value row. */
  share?: number;
  /** volt = counts towards gateway, warn = at risk, plain = neutral. */
  tone?: 'volt' | 'warn' | 'plain';
}

export interface KpiDetail {
  label: string;
  value: string;
  verdict: string;
  /** Where the figure comes from. Rendered in order given. */
  rows: KpiBreakdownRow[];
  /**
   * The coaching line. Must be computed from this apprentice's position —
   * "log 4.4h a week to catch up", not "keep going!".
   */
  advice: string;
  /** Optional supporting sentence under the advice. */
  adviceDetail?: string;
  action?: { label: string; onClick: () => void };
}

const toneBar: Record<NonNullable<KpiBreakdownRow['tone']>, string> = {
  volt: 'bg-elec-yellow',
  warn: 'bg-amber-400/70',
  plain: 'bg-white/[0.35]',
};

export function KpiDetailSheet({
  detail,
  onOpenChange,
}: {
  /** null closes the sheet — one bit of state in the parent instead of two. */
  detail: KpiDetail | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={!!detail} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        {/* One column, handle included — the mistake the programme sheet made
            was putting the grab handle outside it, which pushed the footer off
            the bottom of the screen. */}
        <div className="flex h-full flex-col">
          <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15" />

          {detail && (
            <>
              <div className="shrink-0 px-4 sm:px-6">
                <div className="mx-auto w-full max-w-2xl">
                  <SheetHeader className="pb-4 pt-2">
                    <SheetTitle className="text-left">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                        {detail.label}
                      </span>
                      <div className="mt-1 flex items-baseline gap-2.5">
                        <span className="text-[34px] font-semibold leading-none tabular-nums tracking-tight text-white">
                          {detail.value}
                        </span>
                        <span className="text-[13px] font-medium text-white">{detail.verdict}</span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
                <div className="mx-auto w-full max-w-2xl space-y-5">
                  {detail.rows.length > 0 && (
                    <div
                      className={cn(
                        'space-y-3 rounded-2xl border border-elec-yellow/35 p-4 sm:p-5',
                        CARD_SURFACE
                      )}
                    >
                      {detail.rows.map((r) => (
                        <div key={r.label} className="space-y-1.5">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="min-w-0 truncate text-[13px] text-white">
                              {r.label}
                            </span>
                            <span className="shrink-0 text-[14px] font-semibold tabular-nums text-white">
                              {r.value}
                            </span>
                          </div>
                          {r.share !== undefined && (
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                              <div
                                className={cn(
                                  'h-full rounded-full transition-[width] duration-300',
                                  toneBar[r.tone ?? 'plain']
                                )}
                                style={{ width: `${Math.max(0, Math.min(100, r.share * 100))}%` }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* The point of the sheet. Volt edge because this is the bit
                      that should change what they do next. */}
                  <div
                    className={cn(
                      'space-y-1.5 rounded-2xl border border-elec-yellow/70 p-4 sm:p-5',
                      CARD_SURFACE
                    )}
                  >
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                      What to do
                    </span>
                    <p className="text-[14px] font-semibold leading-snug text-white">
                      {detail.advice}
                    </p>
                    {detail.adviceDetail && (
                      <p className="text-[12.5px] leading-snug text-white">{detail.adviceDetail}</p>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="shrink-0 border-t border-white/[0.08] bg-[hsl(0_0%_8%)] px-4 py-3 sm:px-6"
                style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
              >
                <div className="mx-auto flex w-full max-w-2xl gap-2.5">
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-white hover:bg-white/[0.08]"
                  >
                    Close
                  </Button>
                  {detail.action && (
                    <Button
                      onClick={() => {
                        onOpenChange(false);
                        detail.action?.onClick();
                      }}
                      className="h-12 flex-[1.6] rounded-xl bg-elec-yellow text-[14px] font-semibold text-black hover:bg-elec-yellow/90"
                    >
                      {detail.action.label}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default KpiDetailSheet;
