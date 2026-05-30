/**
 * TodaysFocusPanel
 *
 * Top 3 ACs the apprentice should target NEXT — each with a one-line
 * rationale (quick-win / recent activity match / foundational / next-up).
 * Replaces the old "Next AC to Target" linear-pick card.
 */

import { cn } from '@/lib/utils';
import { Eyebrow, SectionHeader } from './PortfolioPrimitives';
import type { FocusAC } from '@/hooks/portfolio/usePortfolioFocus';

const KIND_LABEL: Record<FocusAC['reasonKind'], string> = {
  referred: 'Action needed',
  'quick-win': 'Quick win',
  'recent-match': 'Recent activity',
  foundational: 'Foundational',
  'next-up': 'Next up',
};

const KIND_TONE: Record<FocusAC['reasonKind'], string> = {
  referred: 'border-red-400/30 text-red-300 bg-red-500/[0.08]',
  'quick-win': 'border-elec-yellow/30 text-elec-yellow bg-elec-yellow/[0.05]',
  'recent-match': 'border-elec-yellow/20 text-elec-yellow/85 bg-elec-yellow/[0.03]',
  foundational: 'border-white/[0.10] text-white/85 bg-white/[0.04]',
  'next-up': 'border-white/[0.08] text-white/55 bg-white/[0.02]',
};

interface TodaysFocusPanelProps {
  focus: FocusAC[];
  recentActivityCount: number;
  loading?: boolean;
  onCapture: (ac: FocusAC) => void;
}

export function TodaysFocusPanel({
  focus,
  recentActivityCount,
  loading,
  onCapture,
}: TodaysFocusPanelProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        <SectionHeader
          eyebrow="Today's focus"
          title="Top 3 to capture next"
          meta="Picking your highest-impact ACs…"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5">
          <div className="h-3 w-2/3 bg-white/[0.05] rounded animate-pulse" />
          <div className="h-3 w-3/4 bg-white/[0.05] rounded animate-pulse mt-3" />
          <div className="h-3 w-1/2 bg-white/[0.05] rounded animate-pulse mt-3" />
        </div>
      </div>
    );
  }

  if (!focus.length) {
    return (
      <div className="space-y-3">
        <SectionHeader eyebrow="Today's focus" title="All caught up" />
        <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.04] p-5 space-y-1.5">
          <Eyebrow className="text-elec-yellow">Strong coverage</Eyebrow>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Every assessment criterion already has at least one piece of evidence. Focus on
            depth and quality next — the EPA gateway looks at both.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <SectionHeader
        eyebrow="Today's focus"
        title="Top 3 to capture next"
        meta={
          recentActivityCount > 0
            ? `Ranked using your last 14 days of site activity (${recentActivityCount} entries)`
            : 'Ranked by claim status, foundational weight and unit order'
        }
      />
      <ul className="space-y-2">
        {focus.map((f, i) => (
          <li
            key={f.acFullRef}
            className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors px-4 py-3 sm:px-5 sm:py-4"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] font-mono text-elec-yellow/85 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[11px] font-mono text-elec-yellow">
                    {f.acRef}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                    Unit {f.unitCode}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-medium uppercase tracking-[0.14em] px-1.5 py-0 rounded-md border',
                      KIND_TONE[f.reasonKind]
                    )}
                  >
                    {KIND_LABEL[f.reasonKind]}
                  </span>
                </div>
                <p className="text-[14px] text-white leading-snug">{f.acText}</p>
                <p className="text-[12px] text-white/70 leading-snug italic">{f.reason}</p>
              </div>
            </div>
            <div className="pl-7 mt-3">
              <button
                type="button"
                onClick={() => onCapture(f)}
                className="inline-flex items-center h-9 px-3 rounded-md bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
              >
                Capture for {f.acRef} →
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
