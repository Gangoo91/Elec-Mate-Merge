import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { pageContainerCn, pageHeaderBandCn } from './pageStyles';

/**
 * The header every Notices & Labels document shares.
 *
 * ⚠️ Ten pages carried their own near-identical copy of this markup and had
 * drifted in three ways that all mattered:
 *   • Every strapline was `text-white/50`, which renders as grey — CLAUDE.md
 *     bans low-opacity white outright, including helper text.
 *   • "Back" was a bare word with no chevron and no affordance, and was set in
 *     `text-white/90` — grey again.
 *   • The reference number was `font-mono text-white/50`, so the one piece of
 *     identifying data on the page was the least readable thing on it.
 *
 * Fixing that in ten files would have left ten places for it to come back.
 */

/** Tone of the lead phrase. The phrase carries the page's meaning at a glance. */
export type LeadTone = 'accent' | 'danger' | 'success' | 'warning';

const LEAD_TONE: Record<LeadTone, string> = {
  accent: 'text-elec-yellow',
  danger: 'text-red-400',
  success: 'text-green-400',
  warning: 'text-orange-300',
};

export interface PageHeaderProps {
  /**
   * Small caps line above the title. Carries the STANDARD the document is
   * written to — "BS 7671", "GS 38", "BS 5839" — which is what an electrician
   * actually wants to know about a notice, and matches the badges on the cards
   * these pages are reached from. Falls back to the section name.
   */
  eyebrow?: string;
  title: string;
  /**
   * Short phrase set in the tone colour, e.g. "C1 — Danger present."
   * ReactNode rather than string because some straplines interpolate live
   * values ("{handouts.length} branded PDF templates").
   */
  lead?: React.ReactNode;
  leadTone?: LeadTone;
  /** The rest of the strapline. Full white — never a low-opacity grey. */
  description?: React.ReactNode;
  /** Reference or certificate number, shown monospaced. */
  reference?: string;
  /** Right-hand slot: status chip, save-draft, import, etc. */
  actions?: React.ReactNode;
  /** Override the back behaviour; defaults to browser back. */
  onBack?: () => void;
  className?: string;
}

export function PageHeader({
  eyebrow = 'Inspection & Testing',
  title,
  lead,
  leadTone = 'accent',
  description,
  reference,
  actions,
  onBack,
  className,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={cn(pageHeaderBandCn, className)}>
      <div className="px-4 pt-3 pb-3 lg:px-8">
        <div className={pageContainerCn}>
          <button
            onClick={onBack ?? (() => navigate(-1))}
            className="-ml-1 flex h-11 items-center gap-1 pr-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-80 touch-manipulation"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
            Back
          </button>

          {/*
            Stacks on a phone, one line from sm: up. The title block is capped
            at max-w-2xl so a long strapline does not stretch into a single
            unreadable line on a wide monitor.
          */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="min-w-0">
              {eyebrow && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                  {eyebrow}
                </p>
              )}
              <h1 className="mt-1 text-[26px] font-bold leading-none tracking-tight text-white sm:text-[32px]">
                {title}
              </h1>
              {(lead || description) && (
                <p className="mt-2 max-w-2xl text-[13px] leading-snug text-white">
                  {lead && <span className={cn('font-semibold', LEAD_TONE[leadTone])}>{lead}</span>}
                  {lead && description ? ' ' : null}
                  {description}
                </p>
              )}
              {reference && (
                <p className="mt-1.5 font-mono text-[12px] text-white">{reference}</p>
              )}
            </div>

            {actions && (
              <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
