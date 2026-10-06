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
import type { RamsBriefingRow } from '@/hooks/useRamsBriefings';
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
  /**
   * Review before issue. A named person confirms they checked the draft
   * against this site; any later edit clears the confirmation (the parent
   * owns that rule). Issue buttons stay disabled until both are given.
   */
  review?: { name: string; confirmedAt: string | null };
  onReviewChange?: (review: { name: string; confirmedAt: string | null }) => void;
  /** Next step after issuing: a short briefing built from this RAMS. */
  onBriefTeam?: () => void;
  /** Version last filed in Site Safety, if any. */
  filedVersion?: number | null;
  /** Briefings given on this RAMS (see useRamsBriefings). */
  briefings?: RamsBriefingRow[];
  /** Edit the document's site and emergency details in place. */
  onUpdateDetails?: (patch: Partial<RAMSData>) => void;
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
  review,
  onReviewChange,
  onBriefTeam,
  filedVersion,
  briefings = [],
  onUpdateDetails,
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
  // Issuing needs a named, ticked review when the parent asks for one.
  const reviewMissing = !!onReviewChange && (!review?.name?.trim() || !review?.confirmedAt);
  const issueDisabled = isExporting || reviewMissing;

  /*
   * What a reviewer would send back. Read from the document itself — nothing
   * here is a score or a compliance verdict, just gaps that would print blank
   * or leave a hazard without a control.
   */
  const gaps: string[] = [];
  if (!ramsData?.location?.trim()) gaps.push('No site address');
  if (!ramsData?.assessor?.trim()) gaps.push('No assessor named');
  if (!ramsData?.siteManagerName?.trim() && !ramsData?.supervisor?.trim())
    gaps.push('No supervisor or site manager named');
  if (!ramsData?.firstAiderName?.trim()) gaps.push('No first aider named');
  if (!ramsData?.assemblyPoint?.trim()) gaps.push('No assembly point');
  const blankHazards = risks.filter((r) => !String(r.hazard ?? '').trim()).length;
  const noControls = risks.filter(
    (r) => String(r.hazard ?? '').trim() && !String(r.controls ?? '').trim()
  ).length;
  if (blankHazards) gaps.push(`${blankHazards} hazard${blankHazards === 1 ? '' : 's'} left blank`);
  if (noControls)
    gaps.push(`${noControls} hazard${noControls === 1 ? '' : 's'} with no control measures`);
  const blankSteps = steps.filter((st) => !String(st.title ?? '').trim()).length;
  if (blankSteps) gaps.push(`${blankSteps} method step${blankSteps === 1 ? '' : 's'} untitled`);

  return (
    // Full-height flex column so the action bar can sit at the BOTTOM.
    // `sticky bottom-0` alone only pins to the viewport when the content is
    // taller than the screen; on a short tab (the Issue tab is three buttons)
    // it just lands wherever the content ends, stranded mid-page. The column
    // plus `mt-auto` on the bar gives both behaviours: pinned to the bottom
    // when content is short, sticky while scrolling when it is long.
    <div className="flex min-h-[calc(100svh-var(--header-height,56px)-2rem)] flex-col">
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
              <span className="sr-only">
                step {i + 1} of {TABS.length}
              </span>
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
            <SectionHeader title="Review, then issue" />
            {/* Generation drafts the paperwork; it does not make the work safe
                or approve it. Said once, here, where the decision is made. */}
            <p className="text-[13px] leading-relaxed text-white">
              This is an AI-drafted starting point. Before you issue it, a competent person should
              check every hazard and control against this site and this job, and edit anything that
              does not fit.
            </p>
            {onUpdateDetails && (
              <div className="space-y-3 border-t border-white/[0.1] pt-4">
                <h3 className="text-sm font-semibold text-white">Site and emergency details</h3>
                <p className="text-[12.5px] leading-snug text-white">
                  These print on the document. Fill them in here rather than leaving them blank.
                </p>
                {(
                  [
                    ['location', 'Site address', 'Full address of the site'],
                    ['assessor', 'Assessor', 'Who assessed the risks'],
                    ['siteManagerName', 'Site manager or supervisor', 'Name'],
                    ['siteManagerPhone', 'Their phone', 'Mobile number'],
                    ['firstAiderName', 'First aider', 'Name'],
                    ['firstAiderPhone', 'First aider phone', 'Mobile number'],
                    ['assemblyPoint', 'Assembly point', 'e.g. Front car park'],
                  ] as const
                ).map(([key, label, ph]) => (
                  <div key={key}>
                    <label className="mb-1 block text-[12px] font-medium text-white" htmlFor={`rams-${key}`}>
                      {label}
                    </label>
                    <input
                      id={`rams-${key}`}
                      value={String((ramsData as unknown as Record<string, unknown> | undefined)?.[key] ?? '')}
                      onChange={(e) => onUpdateDetails({ [key]: e.target.value } as Partial<RAMSData>)}
                      placeholder={ph}
                      inputMode={key.endsWith('Phone') ? 'tel' : undefined}
                      className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation"
                    />
                  </div>
                ))}
              </div>
            )}
            {gaps.length > 0 ? (
              <div className="rounded-xl border border-white/[0.12] border-l-[3px] border-l-orange-400 bg-white/[0.04] p-3">
                <p className="text-[12.5px] font-semibold text-orange-300">
                  {gaps.length === 1 ? '1 thing to check' : `${gaps.length} things to check`}
                </p>
                <ul className="mt-1.5 space-y-1">
                  {gaps.map((g) => (
                    <li key={g} className="text-[12.5px] leading-snug text-white">
                      {g}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[12px] leading-snug text-white">
                  Fill site details above; fix hazards and steps in their tabs.
                </p>
              </div>
            ) : (
              <p className="text-[12.5px] text-white">
                No blank details found. That is not a substitute for reading it through.
              </p>
            )}
            {onReviewChange && (
              <div className="space-y-3 border-t border-white/[0.1] pt-4">
                <h3 className="text-sm font-semibold text-white">Reviewed by</h3>
                <input
                  value={review?.name ?? ''}
                  onChange={(e) =>
                    onReviewChange({
                      name: e.target.value,
                      confirmedAt: review?.confirmedAt ?? null,
                    })
                  }
                  placeholder="Name of the person who checked it"
                  aria-label="Reviewed by"
                  className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation"
                />
                {/* Never pre-ticked: the point is that someone read it. */}
                <label className="flex min-h-11 cursor-pointer items-start gap-3 touch-manipulation">
                  <input
                    type="checkbox"
                    checked={!!review?.confirmedAt}
                    onChange={(e) =>
                      onReviewChange({
                        name: review?.name ?? '',
                        confirmedAt: e.target.checked ? new Date().toISOString() : null,
                      })
                    }
                    className="mt-0.5 h-5 w-5 shrink-0 accent-elec-yellow"
                  />
                  <span className="text-[13px] leading-snug text-white">
                    I have checked these hazards, controls and steps against this site and this job.
                  </span>
                </label>
                {review?.confirmedAt && (
                  <p className="text-[12px] text-white">
                    Checked{' '}
                    {new Date(review.confirmedAt).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    . Editing anything clears this, so the check always matches what is issued.
                  </p>
                )}
              </div>
            )}
            <p className="text-[13px] leading-relaxed text-white">
              {risks.length} hazards and {steps.length} steps. Export the pair as one document, or
              each half on its own. Exporting files the PDF in Site Safety; exporting again files a
              new version and keeps the earlier one.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onExportCombined}
                disabled={issueDisabled}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[13.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation sm:col-span-2"
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
                disabled={issueDisabled}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] disabled:opacity-50 touch-manipulation"
              >
                Risk assessment only
              </button>
              <button
                type="button"
                onClick={onExportMethod}
                disabled={issueDisabled}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] disabled:opacity-50 touch-manipulation"
              >
                Method statement only
              </button>
            </div>
            {reviewMissing && (
              <p className="text-[12px] text-white">
                Add who reviewed it and tick the check to issue.
              </p>
            )}
            {onBriefTeam && (
              <div className="space-y-2 border-t border-white/[0.1] pt-4">
                <h3 className="text-sm font-semibold text-white">Next: brief the team</h3>
                <p className="text-[12.5px] leading-snug text-white">
                  {filedVersion ? `Version ${filedVersion} is filed. ` : ''}
                  Turn this RAMS into a one-page briefing (top hazards, controls, PPE and emergency
                  details) and share a link so each person can sign on their phone.
                </p>
                {briefings.length > 0 && (
                  <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                    {briefings.map((b) => (
                      <li key={b.id} className="flex items-start justify-between gap-3 py-2.5">
                        <span className="min-w-0">
                          <span className="block truncate text-[13px] font-medium text-white">
                            {b.name}
                          </span>
                          <span
                            className={cn(
                              'block text-[12px]',
                              b.outdated ? 'text-orange-300' : 'text-white'
                            )}
                          >
                            {b.outdated
                              ? b.version
                                ? `Given on version ${b.version} — version ${filedVersion} is now on file. Brief again.`
                                : `Given before this version was issued. Brief again on version ${filedVersion}.`
                              : b.version
                                ? `Version ${b.version}`
                                : 'Not tied to an issued version'}
                          </span>
                        </span>
                        <span className="shrink-0 text-[12px] font-semibold tabular-nums text-white">
                          {b.signed} of {b.total} signed
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={onBriefTeam}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-elec-yellow/50 bg-white/[0.06] px-5 text-[13.5px] font-semibold text-elec-yellow transition-colors hover:bg-white/[0.1] touch-manipulation"
                >
                  Brief the team on this RAMS
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Sticky footer nav — cert pattern, slides away while typing */}
      <div
        className={cn(
          // 🔴 STICKY, NOT FIXED. `fixed inset-x-0` is positioned against the
          // viewport, so it escaped the content column and ran straight under
          // the w-64 sidebar. A left offset would not fix it either: the
          // sidebar collapses (`desktopCollapsed` lives up in Layout), so any
          // hard-coded inset is wrong half the time.
          // Sticky keeps the bar inside the flex column, which is what every
          // other action bar in the app does — including this feature's own
          // input screen (`AIRAMSInput`).
          'mt-auto sticky bottom-0 z-40 border-t border-white/[0.1] bg-elec-dark/95 pt-3 backdrop-blur-sm transition-transform duration-200',
          // Cancel Layout's page padding so the bar still spans the column
          // edge-to-edge, then re-apply its own.
          '-mx-3 px-3 sm:-mx-4 sm:px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8',
          // Clear the home indicator on iOS — a bar pinned to the bottom puts
          // the primary action under it otherwise.
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
              // Same gate as the Issue tab's own buttons — this footer copy used
              // to issue the RAMS with no named review at all.
              disabled={issueDisabled}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[13.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white touch-manipulation"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {reviewMissing ? 'Review to issue' : 'Download full RAMS'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RAMSDocumentTabs;
