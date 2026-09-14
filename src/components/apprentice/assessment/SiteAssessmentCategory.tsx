import { useState } from 'react';
import { Check, Clock, Info } from 'lucide-react';
import { MobileInput } from '@/components/ui/mobile-input';
import { cn } from '@/lib/utils';
import type { ChecklistCategory, ChecklistItem } from './data/siteAssessmentChecklist';

interface SiteAssessmentCategoryProps {
  category: ChecklistCategory;
  isChecked: (id: string) => boolean;
  getNote: (id: string) => string;
  onToggle: (id: string) => void;
  onNote: (id: string, note: string) => void;
  progress: { checked: number; total: number };
  /** When true, only `critical` items are rendered. */
  criticalOnly?: boolean;
}

/**
 * 🔴 `riskLevel` is on every one of the 113 items and was rendered NOWHERE.
 *
 * 49 are `critical` — hard hat, insulated gloves, proving the tester — and they
 * looked exactly like the 15 `advisory` ones. On a safety checklist, which
 * checks actually matter is the entire point, and the data already knew.
 *
 * Critical gets the amber bar and a label; important is quiet; advisory is
 * quieter still. Nothing is hidden — an apprentice can still work the lot — but
 * the eye lands on the ones that hurt you.
 */
const RISK: Record<ChecklistItem['riskLevel'], { label: string; bar: string; chip: string }> = {
  critical: {
    label: 'Critical',
    bar: 'border-l-elec-yellow',
    chip: 'border-elec-yellow/45 bg-elec-yellow/10 text-elec-yellow',
  },
  important: {
    label: 'Important',
    bar: 'border-l-white/30',
    chip: 'border-white/15 bg-white/[0.05] text-white',
  },
  advisory: {
    label: 'Advisory',
    bar: 'border-l-white/10',
    chip: 'border-white/10 bg-white/[0.03] text-white',
  },
};

const SiteAssessmentCategory = ({
  category,
  isChecked,
  getNote,
  onToggle,
  onNote,
  progress,
  criticalOnly = false,
}: SiteAssessmentCategoryProps) => {
  const [openInfo, setOpenInfo] = useState<Set<string>>(new Set());

  const toggleInfo = (id: string) =>
    setOpenInfo((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const items = criticalOnly
    ? category.items.filter((i) => i.riskLevel === 'critical')
    : category.items;

  if (items.length === 0) return null;

  const done = progress.checked === progress.total && progress.total > 0;

  return (
    <section className="space-y-2.5">
      {/* A heading, not a disclosure. The category used to be a third
          accordion layer — closed by default — so reaching one check meant
          opening the page, then the tool, then the category. */}
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <h3 className="text-[14.5px] font-semibold tracking-tight text-white">{category.name}</h3>
        <span
          className={cn(
            'rounded-md border px-2 py-0.5 font-mono text-[11px] tabular-nums',
            done
              ? 'border-elec-yellow/45 bg-elec-yellow/10 text-elec-yellow'
              : 'border-white/12 bg-white/[0.04] text-white'
          )}
        >
          {progress.checked}/{progress.total}
        </span>
        {category.estimatedMinutes > 0 && (
          <span className="inline-flex items-center gap-1 text-[11.5px] text-white">
            <Clock aria-hidden className="h-3 w-3" />
            {category.estimatedMinutes} min
          </span>
        )}
      </div>

      {/* Two-up from `sm:`. A single column ran one line of text across the
          full width of a desktop, which is both an unreadable measure and a
          mile of scrolling across 113 checks. */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const checked = isChecked(item.id);
          const note = getNote(item.id);
          const showInfo = openInfo.has(item.id);
          const risk = RISK[item.riskLevel];

          return (
            <div
              key={item.id}
              className={cn(
                'rounded-xl border border-y-white/[0.10] border-r-white/[0.10] border-l-[3px]',
                risk.bar,
                checked ? 'bg-white/[0.02]' : 'bg-white/[0.05]'
              )}
            >
              {/* One row. The info button used to sit in its own 44px box
                  outside the row, so it read as a separate control floating
                  beside the check rather than part of it. */}
              <div className="flex items-start gap-2 p-2.5">
                <button
                  type="button"
                  onClick={() => onToggle(item.id)}
                  aria-pressed={checked}
                  className="flex min-h-[44px] flex-1 items-start gap-2.5 rounded-lg text-left transition-opacity touch-manipulation focus:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow active:opacity-80"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors',
                      checked
                        ? 'border-elec-yellow bg-elec-yellow'
                        : 'border-white/35 bg-transparent'
                    )}
                  >
                    {checked && <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />}
                  </span>
                  <span
                    className={cn(
                      'text-[13.5px] leading-snug text-white',
                      checked && 'line-through opacity-60'
                    )}
                  >
                    {item.text}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleInfo(item.id)}
                  aria-expanded={showInfo}
                  aria-label={`Why ${item.text} matters`}
                  className={cn(
                    'flex h-11 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors touch-manipulation',
                    'focus:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow',
                    showInfo ? 'text-elec-yellow' : 'text-white hover:bg-white/[0.06]'
                  )}
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>

              {item.riskLevel === 'critical' && !checked && (
                <div className="px-2.5 pb-2.5">
                  <span
                    className={cn(
                      'rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]',
                      risk.chip
                    )}
                  >
                    {risk.label}
                  </span>
                </div>
              )}

              {showInfo && (
                <div className="space-y-1.5 border-t border-white/[0.08] px-2.5 py-2.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                    Why this matters
                  </span>
                  <p className="text-[13px] leading-relaxed text-white">{item.whyItMatters}</p>
                  {item.regulation && (
                    <p className="font-mono text-[11px] text-white">{item.regulation}</p>
                  )}
                </div>
              )}

              {checked && (
                <div className="border-t border-white/[0.08] px-2.5 py-2">
                  <MobileInput
                    label=""
                    placeholder="Note what you found (optional)…"
                    value={note}
                    onChange={(e) => onNote(item.id, e.target.value)}
                    className="text-sm"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SiteAssessmentCategory;
