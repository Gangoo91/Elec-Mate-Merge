/**
 * RAMS document — built to the certificate standard.
 *
 * The results view used to be two scrolling columns of bespoke blocks, each
 * inventing its own layout. The specialist certificates (src/components/
 * inspection/ev-charging) are the reference implementation, and this follows
 * them exactly:
 *
 *   - tabbed steps with per-tab completion, not one endless scroll
 *   - every section is `cardCn` + a plain typographic <SectionHeader>
 *   - fields sit in `grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4`
 *   - a sticky footer with Back / Continue that slides away while typing
 *   - scrollToTopForStepChange() on every step change (ELE-1464)
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Download, Loader2, Plus } from 'lucide-react';
import { cardCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { scrollToTopForStepChange } from '@/utils/scroll';
import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';

import { SummaryStatsCard } from './results/SummaryStatsCard';
import { EnhancedRiskCard } from './results/EnhancedRiskCard';
import { PPEGridView } from './results/PPEGridView';
import { ProjectInfoHeader } from './results/ProjectInfoHeader';
import { EnhancedStepCard } from './results/EnhancedStepCard';
import { ProgressSummary } from './results/ProgressSummary';
import { EmergencyContactsCard } from './results/EmergencyContactsCard';
import { ScopeOfWorkCard } from './results/ScopeOfWorkCard';
import { ComplianceReferencesCard } from './results/ComplianceReferencesCard';
import { SiteLogisticsCard } from './results/SiteLogisticsCard';
import { CompetencyMatrixCard } from './results/CompetencyMatrixCard';
import { RiskAssessmentSummary } from './results/RiskAssessmentSummary';

/** Plain typographic section heading — mirrors EVSectionHeader exactly. */
export const SectionHeader: React.FC<{ title: string; action?: React.ReactNode }> = ({
  title,
  action,
}) => (
  <div className="mb-3 flex items-baseline justify-between gap-3">
    <h2 className="min-w-0 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
    {action}
  </div>
);

const TABS = [
  { id: 'overview', label: 'Overview', short: 'Overview' },
  { id: 'hazards', label: 'Risk Assessment', short: 'Hazards' },
  { id: 'method', label: 'Method Statement', short: 'Method' },
  { id: 'export', label: 'Issue', short: 'Issue' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const NEXT_LABELS: Record<TabId, string> = {
  overview: 'Continue to hazards',
  hazards: 'Continue to method',
  method: 'Continue to issue',
  export: '',
};

/** Slide the footer away while typing so it never covers a field (cert pattern). */
const useTypingFocus = () => {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const isTextEntry = (el: EventTarget | null): boolean =>
      el instanceof HTMLElement &&
      (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
    const onFocusIn = (e: FocusEvent) => {
      if (isTextEntry(e.target)) setTyping(true);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!isTextEntry(e.relatedTarget)) setTyping(false);
    };
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);
  return typing;
};

interface RAMSDocumentTabsProps {
  ramsData?: RAMSData;
  methodData?: Partial<MethodStatementData>;
  editable?: boolean;
  isExporting?: boolean;
  onUpdateRisk?: (riskId: string, updates: Record<string, unknown>) => void;
  onRemoveRisk?: (riskId: string) => void;
  onAddRisk?: () => void;
  onUpdateStep?: (stepId: string, updates: Record<string, unknown>) => void;
  onRemoveStep?: (stepId: string) => void;
  onAddStep?: () => void;
  onExportCombined?: () => void;
  onExportRams?: () => void;
  onExportMethod?: () => void;
}

export const RAMSDocumentTabs: React.FC<RAMSDocumentTabsProps> = ({
  ramsData,
  methodData,
  editable = true,
  isExporting = false,
  onUpdateRisk,
  onRemoveRisk,
  onAddRisk,
  onUpdateStep,
  onRemoveStep,
  onAddStep,
  onExportCombined,
  onExportRams,
  onExportMethod,
}) => {
  const [tab, setTab] = useState<TabId>('overview');
  const typing = useTypingFocus();

  const index = TABS.findIndex((t) => t.id === tab);
  const risks = ramsData?.risks ?? [];
  const steps = methodData?.steps ?? [];

  const complete: Record<TabId, boolean> = {
    overview: !!methodData?.jobTitle,
    hazards: risks.length > 0,
    method: steps.length > 0,
    export: false,
  };

  const go = (next: TabId) => {
    setTab(next);
    scrollToTopForStepChange();
  };

  const md = (methodData ?? {}) as MethodStatementData;

  return (
    <div className="pb-[calc(7rem+env(safe-area-inset-bottom,0px))] sm:pb-24">
      {/* Step rail — one row, completion ticks, same weight as the cert tabs */}
      <div className="mb-5 grid grid-cols-4 gap-0 border-b border-white/[0.1]">
        {TABS.map((t, i) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => go(t.id)}
              className={cn(
                // Tighter tracking and a smaller size below sm: four tracked
                // uppercase labels at 375px ran into each other and the
                // completion tick sat hard against the text.
                'flex h-12 items-center justify-center gap-2 border-b-2 px-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] transition-colors touch-manipulation sm:text-[11.5px] sm:tracking-[0.14em]',
                active
                  ? 'border-elec-yellow text-elec-yellow'
                  : 'border-transparent text-white hover:text-elec-yellow'
              )}
            >
              {complete[t.id] && !active && (
                <Check className="h-3 w-3 shrink-0 text-emerald-400" strokeWidth={3} />
              )}
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.short}</span>
              <span className="sr-only">step {i + 1} of {TABS.length}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="space-y-4 sm:space-y-5"
      >
        {tab === 'overview' && (
          <>
            <div className={cardCn}>
              <SectionHeader title="Project" />
              <ProjectInfoHeader methodData={md} projectName={ramsData?.projectName} />
            </div>
            <div className={cardCn}>
              <SectionHeader title="At a glance" />
              <SummaryStatsCard risks={risks} />
            </div>
            <div className={cardCn}>
              <SectionHeader title="Scope of work" />
              <ScopeOfWorkCard methodData={md} />
            </div>
            <div className={cardCn}>
              <SectionHeader title="Emergency contacts" />
              <EmergencyContactsCard methodData={md} />
            </div>
            <div className={cardCn}>
              <SectionHeader title="Site logistics" />
              <SiteLogisticsCard methodData={md} />
            </div>
          </>
        )}

        {tab === 'hazards' && (
          <>
            <div className={cardCn}>
              <SectionHeader
                title={`Hazards and controls · ${risks.length}`}
                action={
                  editable && onAddRisk ? (
                    <button
                      type="button"
                      onClick={onAddRisk}
                      className="inline-flex h-11 sm:h-9 items-center gap-1.5 rounded-xl bg-elec-yellow px-3 text-[12.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add hazard
                    </button>
                  ) : undefined
                }
              />
              {/* Two-up from xl. One column ran text to ~1400px, which is well
                  past a comfortable measure and left the page half empty. */}
              <div className="grid gap-3 xl:grid-cols-2 xl:items-stretch">
                {risks.map((risk, i) => (
                  <EnhancedRiskCard
                    key={risk.id}
                    risk={risk}
                    index={i}
                    editable={editable}
                    onUpdate={onUpdateRisk as never}
                    onRemove={onRemoveRisk}
                  />
                ))}
                {risks.length === 0 && (
                  <p className="text-[13px] text-white">No hazards recorded yet.</p>
                )}
              </div>
            </div>

            <div className={cardCn}>
              <SectionHeader title="PPE required" />
              <PPEGridView
                ppeDetails={ramsData?.ppeDetails}
                requiredPPE={ramsData?.requiredPPE}
                editable={false}
              />
            </div>

            <div className={cardCn}>
              <SectionHeader title="Assessment summary" />
              <RiskAssessmentSummary ramsData={ramsData} />
            </div>
          </>
        )}

        {tab === 'method' && (
          <>
            <div className={cardCn}>
              <SectionHeader title="Sequence" />
              <ProgressSummary steps={steps} totalEstimatedTime={md.totalEstimatedTime} />
            </div>

            <div className={cardCn}>
              <SectionHeader
                title={`Installation steps · ${steps.length}`}
                action={
                  editable && onAddStep ? (
                    <button
                      type="button"
                      onClick={onAddStep}
                      className="inline-flex h-11 sm:h-9 items-center gap-1.5 rounded-xl bg-elec-yellow px-3 text-[12.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add step
                    </button>
                  ) : undefined
                }
              />
              <div className="grid gap-3 xl:grid-cols-2 xl:items-stretch">
                {steps.map((step, i) => (
                  <EnhancedStepCard
                    key={step.id}
                    step={step}
                    index={i}
                    editable={editable}
                    onUpdate={onUpdateStep as never}
                    onRemove={onRemoveStep}
                  />
                ))}
                {steps.length === 0 && (
                  <p className="text-[13px] text-white">No steps recorded yet.</p>
                )}
              </div>
            </div>

            <div className={cardCn}>
              <SectionHeader title="Competency" />
              <CompetencyMatrixCard methodData={md} />
            </div>

            <div className={cardCn}>
              <SectionHeader title="References" />
              <ComplianceReferencesCard methodData={md} />
            </div>
          </>
        )}

        {tab === 'export' && (
          <div className={cardCn}>
            <SectionHeader title="Issue the document" />
            <p className="text-[13px] leading-relaxed text-white">
              {risks.length} hazards and {steps.length} steps. Export the pair as one document, or
              each half on its own.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onExportCombined}
                disabled={isExporting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[13.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation sm:col-span-2"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download full RAMS
              </button>
              <button
                type="button"
                onClick={onExportRams}
                disabled={isExporting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] disabled:opacity-50 touch-manipulation"
              >
                Risk assessment only
              </button>
              <button
                type="button"
                onClick={onExportMethod}
                disabled={isExporting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] disabled:opacity-50 touch-manipulation"
              >
                Method statement only
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Sticky footer nav — cert pattern, slides away while typing */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.1] bg-elec-dark/95 px-4 pt-3 backdrop-blur-sm transition-transform duration-200 sm:px-6 md:px-10 lg:px-16',
          // Clear the home indicator on iOS — a fixed bar pinned to
          // bottom-0 puts the primary action under it otherwise.
          'pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]',
          typing && 'translate-y-full'
        )}
      >
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <button
            type="button"
            onClick={() => index > 0 && go(TABS[index - 1].id)}
            disabled={index === 0}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] disabled:opacity-40 touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {index < TABS.length - 1 ? (
            <button
              type="button"
              onClick={() => go(TABS[index + 1].id)}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[13.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation"
            >
              {NEXT_LABELS[tab]}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onExportCombined}
              disabled={isExporting}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[13.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download full RAMS
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RAMSDocumentTabs;
