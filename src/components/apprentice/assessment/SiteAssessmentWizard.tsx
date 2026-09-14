import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  getCategoriesBySection,
  sectionLabels,
  siteAssessmentChecklist,
} from './data/siteAssessmentChecklist';
import SiteAssessmentCategory from './SiteAssessmentCategory';
import SiteAssessmentSummary from './SiteAssessmentSummary';
import type { useAssessmentProgress } from './hooks/useAssessmentProgress';

interface SiteAssessmentWizardProps {
  progress: ReturnType<typeof useAssessmentProgress>;
}

const SECTIONS = ['pre-job', 'site-condition', 'electrical'] as const;

const SiteAssessmentWizard = ({ progress }: SiteAssessmentWizardProps) => {
  /**
   * 🔴 The filter that matters on site.
   *
   * 113 checks is the right depth for a reference and the wrong depth for
   * "I'm standing in a loft and the van's on a meter". 49 of them are tagged
   * `critical` in the data — the ones that injure you — so this narrows to
   * those and leaves the rest for when there is time.
   *
   * Off by default: the full list is the honest default for a safety
   * checklist, and an apprentice choosing to shorten it is doing so knowingly.
   */
  const [criticalOnly, setCriticalOnly] = useState(false);

  const criticalCount = useMemo(
    () =>
      siteAssessmentChecklist.reduce(
        (n, cat) => n + cat.items.filter((i) => i.riskLevel === 'critical').length,
        0
      ),
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCriticalOnly(false)}
          aria-pressed={!criticalOnly}
          className={cn(
            'h-11 rounded-xl border px-3.5 text-[13px] transition-colors touch-manipulation',
            !criticalOnly
              ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
              : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/25'
          )}
        >
          All checks
        </button>
        <button
          type="button"
          onClick={() => setCriticalOnly(true)}
          aria-pressed={criticalOnly}
          className={cn(
            'h-11 rounded-xl border px-3.5 text-[13px] transition-colors touch-manipulation',
            criticalOnly
              ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
              : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/25'
          )}
        >
          Critical only · {criticalCount}
        </button>
        {criticalOnly && (
          <span className="text-[12px] leading-snug text-white">
            Showing the checks that injure people. Work the rest when you have time.
          </span>
        )}
      </div>

      {SECTIONS.map((section) => {
        const categories = getCategoriesBySection(section);
        const sectionConfig = sectionLabels[section];

        const sectionTotal = categories.reduce(
          (n, c) =>
            n +
            (criticalOnly
              ? c.items.filter((i) => i.riskLevel === 'critical').length
              : c.items.length),
          0
        );
        if (sectionTotal === 0) return null;

        return (
          <section key={section} className="space-y-4">
            <div className="flex items-baseline gap-2.5 border-b border-white/[0.08] pb-2">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                {sectionConfig.label}
              </h2>
              <span className="font-mono text-[11px] tabular-nums text-white">{sectionTotal}</span>
            </div>

            {categories.map((category) => (
              <SiteAssessmentCategory
                key={category.id}
                category={category}
                isChecked={progress.isChecked}
                getNote={progress.getNote}
                onToggle={progress.toggleCheckItem}
                onNote={progress.addNote}
                progress={progress.getCategoryProgress(category.items.map((i) => i.id))}
                criticalOnly={criticalOnly}
              />
            ))}
          </section>
        );
      })}

      <SiteAssessmentSummary progress={progress} />
    </div>
  );
};

export default SiteAssessmentWizard;
