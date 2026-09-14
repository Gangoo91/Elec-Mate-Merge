/**
 * OnJobAssessment — pre-job site assessment.
 *
 * 🔴 Two things were wrong here, and the layout was the smaller one.
 *
 * 1. THE PAGE WAS EMPTY. The three cards set an `activeTool` that rendered the
 *    content *below* them, starting at `null`. You landed on a progress bar, a
 *    row of buttons and half a screen of nothing; tapping a card put the tool
 *    below the fold with only a border colour as feedback, and tapping it again
 *    silently emptied the page. They are now tabs over content that is always
 *    on screen.
 *
 * 2. IT COUNTED THE WRONG THING. A site assessment is per JOB — you arrive,
 *    you work the relevant checks, you note the hazards, you start. The page
 *    instead showed "0 / 112 checks · 0%" against a lifetime tally in
 *    localStorage, so it read as a course to complete once. Finish it and every
 *    later job opens at 100% showing last month's ticks; and no single job needs
 *    all 112 (weather and seasonal factors do not apply to a rewire in a flat).
 *    The strip now says which job it belongs to and starting the next one is a
 *    first-class action rather than a `clearProgress` buried in a sub-component.
 *
 * Export and share already existed inside the wizard's summary — that is the
 * payoff (evidence for a portfolio, or something to send a supervisor) and it
 * was three taps deep. It is now on the strip.
 */

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  Share2,
  Shield,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { useAssessmentProgress } from '@/components/apprentice/assessment/hooks/useAssessmentProgress';
import {
  getTotalItemCount,
  siteAssessmentChecklist,
} from '@/components/apprentice/assessment/data/siteAssessmentChecklist';
import SiteAssessmentWizard from '@/components/apprentice/assessment/SiteAssessmentWizard';
import RiskAssessmentFlow from '@/components/apprentice/assessment/RiskAssessmentFlow';
import QuickReferenceCards from '@/components/apprentice/assessment/QuickReferenceCards';
import { copyToClipboard } from '@/utils/clipboard';
import { shareContent } from '@/utils/share';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

type ActiveTool = 'checklist' | 'risk' | 'reference';

const OnJobAssessment = () => {
  // Defaults to the checklist: there is no state in which showing nothing is
  // the most useful thing this page can do.
  const [activeTool, setActiveTool] = useState<ActiveTool>('checklist');
  const [confirmReset, setConfirmReset] = useState(false);
  const progress = useAssessmentProgress();
  const totalCount = getTotalItemCount();
  const { toast } = useToast();

  const tabs: { id: ActiveTool; label: string; icon: LucideIcon; meta: string }[] = [
    {
      id: 'checklist',
      label: 'Site checklist',
      icon: ClipboardCheck,
      meta: `${progress.completedCount}/${totalCount}`,
    },
    {
      id: 'risk',
      label: 'Risk assessment',
      icon: AlertTriangle,
      meta: `${progress.riskAssessments.length} logged`,
    },
    { id: 'reference', label: 'Quick reference', icon: BookOpen, meta: '9 cards' },
  ];

  const pct = totalCount > 0 ? (progress.completedCount / totalCount) * 100 : 0;
  const started = progress.completedCount > 0 || progress.riskAssessments.length > 0;

  // "Last touched" beats a percentage for telling you whether this assessment
  // belongs to the job you are standing on.
  const lastTouched = useMemo(() => {
    if (!started || !progress.lastUpdated) return null;
    const d = new Date(progress.lastUpdated);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }, [started, progress.lastUpdated]);

  const buildReport = () => {
    const categories = siteAssessmentChecklist.map((cat) => ({
      name: cat.name,
      items: cat.items.map((item) => ({ id: item.id, text: item.text })),
    }));
    return progress.exportAsText(totalCount, categories);
  };

  const handleShare = async () => {
    const text = buildReport();
    await shareContent({
      title: 'Site assessment',
      text,
      onFallback: async () => {
        const ok = await copyToClipboard(text);
        toast(
          ok
            ? { title: 'Copied', description: 'Assessment copied — paste it anywhere.' }
            : { title: 'Could not copy', variant: 'destructive' }
        );
      },
    });
  };

  const handleReset = () => {
    progress.clearProgress();
    setConfirmReset(false);
    toast({ title: 'New assessment started', description: 'Checks and hazards cleared.' });
  };

  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Site assessment"
        title="Pre-job site assessment"
        backTo="/apprentice/on-job-tools"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Work the checks before you touch anything — the things you would otherwise notice halfway
          up the ladder. One assessment per job: start a new one when you move site.
        </p>

        {/* ── This assessment ───────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div
            className={cn(
              'space-y-3 rounded-2xl border border-elec-yellow/35 p-4 sm:p-5',
              CARD_SURFACE
            )}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5">
              <div className="flex items-center gap-2">
                {started ? (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-elec-yellow" />
                ) : (
                  <ClipboardCheck className="h-4 w-4 flex-shrink-0 text-white" />
                )}
                <span className="text-[13px] font-semibold tracking-tight text-white">
                  {started ? 'This assessment' : 'No checks yet'}
                </span>
                {lastTouched && (
                  <span className="text-[12px] text-white">· last updated {lastTouched}</span>
                )}
              </div>
              <span className="font-mono text-[12px] tabular-nums text-white">
                {progress.completedCount} checked · {progress.riskAssessments.length} hazard
                {progress.riskAssessments.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="h-full rounded-full bg-elec-yellow"
              />
            </div>

            {/* 🔴 No "% complete". Not every check applies to every job — a
                rewire in a flat has no weather or seasonal factors — so a
                completion score would mark a correct assessment as a failure. */}
            <p className="text-[12px] leading-snug text-white">
              Tick what applies to this job. {totalCount} checks are available across the three
              sections; you are not expected to use them all.
            </p>

            {started && (
              <div className="flex flex-wrap gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3.5 text-[13px] font-medium text-white transition-colors hover:border-white/25 touch-manipulation"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share or save
                </button>
                <button
                  type="button"
                  onClick={() => (confirmReset ? handleReset() : setConfirmReset(true))}
                  onBlur={() => setConfirmReset(false)}
                  className={cn(
                    'inline-flex h-11 items-center gap-1.5 rounded-xl border px-3.5 text-[13px] font-medium transition-colors touch-manipulation',
                    confirmReset
                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                      : 'border-white/[0.12] bg-white/[0.06] text-white hover:border-white/25'
                  )}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {confirmReset ? 'Clear and start new?' : 'New assessment'}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Tabs ──────────────────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div
            role="tablist"
            aria-label="Assessment tools"
            className="grid grid-cols-3 gap-2 sm:gap-3"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTool === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTool(tab.id)}
                  className={cn(
                    'min-h-[44px] space-y-1.5 rounded-xl border p-3 text-left transition-colors sm:p-4 touch-manipulation',
                    isActive
                      ? 'border-elec-yellow bg-elec-yellow/[0.08]'
                      : 'border-white/[0.12] bg-white/[0.04] hover:border-white/25'
                  )}
                >
                  <Icon
                    className={cn('h-4 w-4', isActive ? 'text-elec-yellow' : 'text-white')}
                    aria-hidden
                  />
                  <div
                    className={cn(
                      'text-[13px] font-semibold leading-tight tracking-tight',
                      isActive ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {tab.label}
                  </div>
                  <div className="font-mono text-[11px] tabular-nums text-white">{tab.meta}</div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── The tool itself — always rendered ─────────────────────── */}
        <motion.div variants={itemVariants} role="tabpanel">
          {activeTool === 'checklist' && <SiteAssessmentWizard progress={progress} />}
          {activeTool === 'risk' && <RiskAssessmentFlow progress={progress} />}
          {activeTool === 'reference' && <QuickReferenceCards />}
        </motion.div>

        {/* ── Safety footnote ───────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div className={cn('rounded-xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}>
            <div className="flex items-start gap-2.5">
              <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-elec-yellow" />
              <p className="text-[13px] leading-relaxed text-white">
                Always complete a thorough site assessment before beginning any electrical work.
                When in doubt,{' '}
                <span className="font-semibold text-elec-yellow">
                  stop work and consult your supervisor
                </span>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </HubBody>
    </HubPage>
  );
};

export default OnJobAssessment;
