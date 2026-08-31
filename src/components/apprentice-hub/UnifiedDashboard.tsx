/**
 * UnifiedDashboard — Apprentice Portfolio Home
 *
 * Pure portfolio dashboard: AC coverage, evidence quality, EPA gateway
 * readiness. OJT/hours moved out — own surface in the apprentice hub.
 *
 * Layout:
 *   • Mobile  → single editorial flow
 *   • Desktop → 2-column (sticky left rail + scrollable right rail)
 *
 * Compliance focus (UK ST0152 / ESFA / EPA gateway):
 *   • Every AC visible with status
 *   • Recent evidence + audit trail surfaced
 *   • Quality grade and tutor sync visible
 *   • Smart "Today's focus" ranks ACs to capture next
 */

import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileCheck, ChevronRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import type { PortfolioEntry } from '@/types/portfolio';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { parseEvidencedACs } from '@/utils/parseEvidencedACs';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useHaptic } from '@/hooks/useHaptic';
import { HubAlertLine, HubKpi, HubKpiRow } from '@/components/hub/HubPrimitives';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
import { usePortfolioFocus } from '@/hooks/portfolio/usePortfolioFocus';
import { useACSignoffs } from '@/hooks/portfolio/useACSignoffs';
import { SubmissionReadiness } from './portfolio/SubmissionReadiness';
import { FromCollegeCallout } from './portfolio/FromCollegeCallout';
import { PortfolioStatementCard } from './portfolio/PortfolioStatementCard';
import { ApprenticeHubTab } from './ApprenticeHubNav';
import { PortfolioNeedsYou } from './portfolio/PortfolioNeedsYou';
import QualificationSelector from '@/components/apprentice/qualification/QualificationSelector';
import { SharePortfolioSheet } from './SharePortfolioSheet';
import {
  Eyebrow,
  PrimaryAction,
  SecondaryAction,
  SectionHeader,
} from './portfolio/PortfolioPrimitives';
import { ACHeatmap } from './portfolio/ACHeatmap';
import { EPAGatewayPulse } from './portfolio/EPAGatewayPulse';
import { CourseRequirementsList } from './portfolio/CourseRequirementsList';
import { ACAuditTimeline } from './portfolio/ACAuditTimeline';

interface UnifiedDashboardProps {
  onNavigate: (tab: ApprenticeHubTab) => void;
  onCapture: () => void;
}

function EvidenceThumbnail({ entry }: { entry: PortfolioEntry }) {
  const imageFile = entry.evidenceFiles?.find(
    (f) => f.type?.startsWith('image/') || f.url?.match(/\.(jpg|jpeg|png|webp|gif)$/i)
  );
  if (imageFile?.url) {
    return (
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/[0.06] flex-shrink-0">
        <EvidenceImage
          src={imageFile.url}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div className="p-2 rounded-lg bg-white/[0.06] flex-shrink-0">
      <FileCheck className="h-4 w-4 text-white" />
    </div>
  );
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function UnifiedDashboard({ onNavigate, onCapture }: UnifiedDashboardProps) {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const haptic = useHaptic();
  const { entries: portfolioEntries } = usePortfolioData();
  const { actionRequiredCount, comments } = usePortfolioComments();
  const { userSelection, loading: qualLoading } = useQualifications();
  // Enrolment is authoritative — track the college's course (resolved to its
  // canonical requirement code, matching coverage-sync) over a divergent
  // self-selection. Falls back to the learner's own selection when no college.
  const {
    qualificationCode: authoritativeCode,
    divergesFromCollege,
    collegeCourseCode,
  } = useStudentQualification();
  const selectionCode = userSelection?.qualification?.code ?? null;
  const courseCode = authoritativeCode ?? selectionCode;
  const courseId = userSelection?.qualification_id ?? null;
  const { tree, isLoading: acLoading } = useQualificationACs(courseCode);
  const {
    getByAC: getSignoff,
    records: signoffRecords,
    totals: signoffTotals,
  } = useACSignoffs(courseCode);

  // Assessor-confirmed progress — the honest EPA-gateway number, distinct from
  // "I attached a file". signed_off + iqa_confirmed are the ACs an assessor
  // has actually passed.
  const signedOffCount = signoffTotals.signedOff + signoffTotals.iqaConfirmed;
  const referredCount = signoffTotals.referred;

  const [showCourseSelector, setShowCourseSelector] = useState(false);
  const [selectedAC, setSelectedAC] = useState<{
    code: string;
    text: string;
    unitCode?: string;
  } | null>(null);
  const [showACEvidence, setShowACEvidence] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);

  /* ─── Build AC → evidence map (normalised refs) ────────────────────── */
  const acEvidenceMap = useMemo(() => {
    const map = new Map<string, PortfolioEntry[]>();
    if (!portfolioEntries) return map;
    for (const entry of portfolioEntries) {
      if (entry.assessmentCriteria && entry.assessmentCriteria.length > 0) {
        const normalisedRefs = parseEvidencedACs([entry]);
        for (const ref of normalisedRefs) {
          if (!map.has(ref)) map.set(ref, []);
          map.get(ref)!.push(entry);
        }
      }
    }
    return map;
  }, [portfolioEntries]);

  /* ─── Build claimed-only set (refs claimed but no real backing) ────── */
  const claimedOnlyRefs = useMemo(() => {
    const claimed = new Set<string>();
    portfolioEntries?.forEach((e) => {
      const hasFiles = (e.evidenceFiles?.length ?? 0) > 0;
      const hasBacking = hasFiles; // could add supervisor sign-off / AI validation later
      (e.assessmentCriteria || []).forEach((ref) => {
        if (!hasBacking) claimed.add(ref);
      });
    });
    // Subtract anything already evidenced
    for (const ref of acEvidenceMap.keys()) claimed.delete(ref);
    return claimed;
  }, [portfolioEntries, acEvidenceMap]);

  /* ─── Aggregates ──────────────────────────────────────────────────── */
  const { evidencedCount, overallPercent, strandedRefCount } = useMemo(() => {
    const allACs = tree.units.flatMap((u) =>
      u.learningOutcomes.flatMap((lo) => lo.assessmentCriteria)
    );
    const count = allACs.filter(
      (ac) => acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef)
    ).length;
    const pct = tree.totalACs > 0 ? Math.round((count / tree.totalACs) * 100) : 0;

    /*
     * 🔴 STRANDED EVIDENCE.
     *
     * College enrolment is authoritative (see useStudentQualification), so a
     * learner whose college put them on 5357 is scored against 5357's 340
     * criteria — even though every criterion they have ever tagged was picked
     * from 2357's catalogue. Nothing matches, so the page reads
     * "0% · Nothing evidenced yet · 0 of 340" while the My work tab
     * simultaneously reports "23 criteria covered" off the same rows.
     *
     * That is not a rounding disagreement, it is the learner's whole record
     * silently not counting, and the old divergence banner only mentioned that
     * two course CODES differed — never the consequence. From the outside it
     * looks like the app lost their work.
     *
     * Count the refs that resolve to nothing in the active tree so the UI can
     * say so plainly.
     */
    const inTree = new Set<string>();
    for (const ac of allACs) {
      inTree.add(ac.acRef);
      inTree.add(ac.acFullRef);
    }

    /*
     * Count CRITERIA, not normalised refs. parseEvidencedACs deliberately
     * emits two refs for the parenthetical format — "ELTP06 (Unit 317) AC 2.2"
     * yields both ELTP06.2.2 and 317.2.2 so either catalogue shape matches —
     * so counting refs double-counts a single tagged criterion. A criterion is
     * stranded only when NONE of the refs it produces exist in the tree.
     */
    const strandedCriteria = new Set<string>();
    for (const entry of portfolioEntries ?? []) {
      for (const raw of entry.assessmentCriteria ?? []) {
        const refs = parseEvidencedACs([{ assessmentCriteria: [raw] }]);
        // Free text with no parseable AC code yields nothing — that is a
        // tagging problem of a different kind, not a wrong-course problem.
        if (refs.size === 0) continue;
        let matched = false;
        for (const r of refs) {
          if (inTree.has(r)) {
            matched = true;
            break;
          }
        }
        if (!matched) strandedCriteria.add(raw);
      }
    }

    return {
      evidencedCount: count,
      overallPercent: pct,
      strandedRefCount: strandedCriteria.size,
    };
  }, [tree, acEvidenceMap, portfolioEntries]);

  const portfolioTotal = portfolioEntries?.length || 0;

  /* ─── Smart focus ranking ─────────────────────────────────────────── */
  const { focus, recentActivityCount } = usePortfolioFocus(
    tree,
    portfolioEntries,
    acEvidenceMap,
    signoffRecords
  );

  /* ─── Greeting / identity ─────────────────────────────────────────── */
  const fullName = profile?.full_name || user?.email?.split('@')[0] || 'Apprentice';
  const rawFirst = fullName.split(' ')[0];
  const firstName = rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1).toLowerCase();
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  /* ─── No-course state ─────────────────────────────────────────────── */
  if (!userSelection && !qualLoading) {
    return (
      <div className="py-6 space-y-5">
        <div className={cn('rounded-2xl border border-elec-yellow/35 p-5 space-y-2', CARD_SURFACE)}>
          <Eyebrow>{greeting}</Eyebrow>
          <h2 className="text-[24px] font-semibold tracking-tight text-white">{firstName}</h2>
          <p className="text-[13px] text-white leading-relaxed">
            Pick your qualification to start your portfolio.
          </p>
        </div>
        <QualificationSelector />
      </div>
    );
  }

  /* ─── Header / Hero (used in both layouts) ────────────────────────── */
  /*
   * The course, not a greeting.
   *
   * This was an eyebrow reading "Apprentice · Portfolio · Good afternoon" over
   * the learner's first name at 32px. The tab bar directly above already says
   * Portfolio, they know their own name, and the greeting changes nothing they
   * do — so roughly 120px of the first screen said nothing. What is actually
   * load-bearing is which course they are on and how far through it they are.
   */
  const Hero = (
    <div className="space-y-3">
      <div className="space-y-2">
        {userSelection && (
          <button
            onClick={() => setShowCourseSelector(true)}
            className="inline-flex items-center gap-1 text-[12px] text-elec-yellow font-medium touch-manipulation hover:text-elec-yellow/85 active:opacity-70"
          >
            {userSelection.qualification?.title}
            <ChevronRight className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Course progress — the one "where am I" signal, up top */}
      {tree.totalACs > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-elec-yellow">
              Course progress
            </span>
            <span className="text-[12px] font-mono font-semibold text-white tabular-nums">
              {evidencedCount}/{tree.totalACs}
              <span className="text-elec-yellow ml-1.5">{overallPercent}%</span>
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.07] overflow-hidden">
            <div
              className="h-full rounded-full bg-elec-yellow transition-all duration-700"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          {referredCount > 0 && (
            <p className="text-[11px] text-red-300 leading-snug">
              {referredCount} criterion{referredCount === 1 ? '' : 'a'} sent back — fix and resubmit
            </p>
          )}
        </div>
      )}
    </div>
  );

  /* ─── KPI strip — pure portfolio metrics ──────────────────────────── */
  /*
   * The shared HubKpi row, not this file's own `KpiCell`.
   *
   * Portfolio had grown its own KPI component with its own label/value/sub
   * shape — a third dialect alongside the hub primitives and the one OJT used
   * to have. HubKpi carries a verdict and a context line, which is what turns
   * "12/340" from a fact into something you can act on, and it makes the whole
   * row tappable.
   */
  const KpiStrip = (
    <HubKpiRow>
      <HubKpi
        accent
        label="Course progress"
        value={tree.totalACs > 0 ? `${overallPercent}%` : '—'}
        verdict={
          tree.totalACs === 0
            ? 'No course data'
            : overallPercent >= 70
              ? 'Well on the way'
              : overallPercent > 0
                ? 'Building'
                : // "Nothing evidenced yet" is a lie when they HAVE tagged
                  // criteria and those criteria simply belong to a different
                  // course. Name the real reason.
                  strandedRefCount > 0
                  ? 'Tagged to another course'
                  : 'Nothing evidenced yet'
        }
        context={
          tree.totalACs === 0
            ? 'Pick your course to start tracking'
            : strandedRefCount > 0 && evidencedCount === 0
              ? `${strandedRefCount} tagged criteria don't count toward this course`
              : `${evidencedCount} of ${tree.totalACs} criteria evidenced`
        }
        onClick={() => onNavigate('work')}
      />
      <HubKpi
        label="Signed off"
        value={tree.totalACs > 0 ? `${signedOffCount}` : '—'}
        verdict={
          referredCount > 0 ? `${referredCount} sent back` : signedOffCount > 0 ? 'Confirmed by your tutor' : 'None yet'
        }
        sentiment={referredCount > 0 ? 'bad' : 'neutral'}
        direction={referredCount > 0 ? 'down' : 'flat'}
        context={
          tree.totalACs > 0 ? `Of ${tree.totalACs} criteria on your course` : undefined
        }
        onClick={() => onNavigate('work')}
      />
      <HubKpi
        label="Evidence"
        value={String(portfolioTotal)}
        verdict={portfolioTotal > 0 ? 'Items in your portfolio' : 'Nothing captured yet'}
        context={
          actionRequiredCount > 0
            ? `${actionRequiredCount} need something from you`
            : 'All up to date'
        }
        onClick={() => onNavigate('work')}
      />
      <HubKpi
        label="Needs you"
        value={String(actionRequiredCount)}
        verdict={actionRequiredCount > 0 ? 'Waiting on your reply' : 'Nothing pending'}
        sentiment={actionRequiredCount > 0 ? 'bad' : 'good'}
        direction={actionRequiredCount > 0 ? 'down' : 'flat'}
        context={
          actionRequiredCount > 0
            ? 'Your tutor has commented or referred work back'
            : 'Your tutor has nothing outstanding with you'
        }
        onClick={() => onNavigate('work')}
      />
    </HubKpiRow>
  );

  /* ─── Primary actions ─────────────────────────────────────────────── */
  const PrimaryActions = (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
      <PrimaryAction
        onClick={() => {
          haptic.light();
          onCapture();
        }}
        label={
          <>
            <Plus className="h-4 w-4" />
            Add evidence
          </>
        }
      />
      <SecondaryAction
        onClick={() => {
          haptic.light();
          setShowShareSheet(true);
        }}
        label={
          <>
            <Share2 className="h-3.5 w-3.5" />
            Share
          </>
        }
        className="px-4"
      />
    </div>
  );

  /* ─── Recent evidence ─────────────────────────────────────────────── */
  const RecentEvidence =
    portfolioEntries && portfolioEntries.length > 0 ? (
      <div className="space-y-3">
        <SectionHeader
          eyebrow="Recent evidence"
          title="Latest in your portfolio"
          action={
            <button
              onClick={() => onNavigate('work')}
              className="text-[12px] text-elec-yellow font-medium touch-manipulation flex items-center gap-0.5"
            >
              View all {portfolioTotal} →
            </button>
          }
        />
        <ul className="space-y-2">
          {portfolioEntries.slice(0, 5).map((entry) => {
            const entryACs = entry.assessmentCriteria || [];
            return (
              <li key={entry.id}>
                <button
                  onClick={() => onNavigate('work')}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-2xl border border-elec-yellow/35 p-3.5 text-left transition-colors touch-manipulation hover:border-elec-yellow/60 active:scale-[0.99]',
                    CARD_SURFACE
                  )}
                >
                  <EvidenceThumbnail entry={entry} />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-[13px] font-medium text-white truncate">{entry.title}</p>
                    {entryACs.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entryACs.slice(0, 3).map((ac, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-1.5 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-white text-[10px] font-mono"
                          >
                            {ac.length > 18 ? ac.slice(0, 16) + '…' : ac}
                          </span>
                        ))}
                        {entryACs.length > 3 && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-white text-[10px]">
                            +{entryACs.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] uppercase tracking-[0.14em] text-white">
                        {String(entry.status || 'draft')}
                      </span>
                      <span className="text-[10px] text-white font-mono">
                        {formatRelativeDate(new Date(entry.dateCreated))}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;

  const handleACClick = (acRef: string, acText: string, unitCode?: string) => {
    haptic.light();
    setSelectedAC({ code: acRef, text: acText, unitCode });
    setShowACEvidence(true);
  };

  const handleFocusCapture = () => {
    haptic.light();
    onCapture();
  };

  /* ─── Render ─────────────────────────────────────────────────────── */
  return (
    <div className="py-5 sm:py-6 lg:py-8 space-y-7 lg:space-y-10">
      {/* No-data guard */}
      {userSelection && !acLoading && !qualLoading && tree.totalACs === 0 && (
        <div className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-1.5', CARD_SURFACE)}>
          <Eyebrow>Course data missing</Eyebrow>
          <p className="text-[13px] text-white leading-relaxed">
            We don't have curriculum data for this course yet.
          </p>
          <button
            onClick={() => setShowCourseSelector(true)}
            className="text-[12px] text-elec-yellow font-medium mt-1 touch-manipulation"
          >
            Switch to a supported course →
          </button>
        </div>
      )}

      {(acLoading || qualLoading) && userSelection && (
        <div className="flex items-center gap-3 py-6">
          <div className="h-4 w-4 border-2 border-elec-yellow border-t-transparent rounded-full animate-spin" />
          <Eyebrow>Loading qualification structure…</Eyebrow>
        </div>
      )}

      {/* Selection ≠ enrolment: we now track the college's course (authoritative);
          nudge the learner to align their own selection. */}
      {/*
        One row, not a card.
        This was ~200px of the first screen — an eyebrow, a paragraph and a
        full-width button — to say the college enrolled you on a different
        course code. Real, but not worth the top of the page every visit.
        HubAlertLine is the shared shape for exactly this.
      */}
      {divergesFromCollege && (
        <HubAlertLine
          text={
            strandedRefCount > 0
              ? // The consequence, not the codes. "Your selection says X, your
                // college says Y" is true and useless — it never told the
                // learner that their evidence had stopped counting, which is
                // the only part of this they can feel.
                `You're being marked against ${collegeCourseCode}, the course your college enrolled you on. ${strandedRefCount} criteria you've tagged come from ${selectionCode} and don't count toward it — retag those entries to get the credit.`
              : `Your college enrolled you on ${collegeCourseCode} — your own selection still says ${selectionCode}`
          }
          action={strandedRefCount > 0 ? 'Review' : 'Switch'}
          onClick={() => (strandedRefCount > 0 ? onNavigate('work') : setShowCourseSelector(true))}
        />
      )}

      {/* College → apprentice loop: supportive "focus areas" derived from the
          tutor-side risk signals (pastoral/safeguarding stripped server-side). */}
      {/*
        Where you are, before what is wrong with it.
        The two banners above used to fill the entire first screen, so the
        course, the progress bar and every figure sat below the fold — you had
        to scroll past two nags to find out how you were doing. The KPI row is
        the answer to "how am I doing", so it goes first, full width, where a
        dashboard's numbers belong.
      */}
      {KpiStrip}

      {/*
        ONE ranked list — see PortfolioNeedsYou.
        This page used to ask "what do I do next?" three times: tutor risk
        signals here, stuck signatures and expiring evidence in the right
        column, and criteria-to-capture below them. Three lists, three visual
        treatments, two columns, one question.
      */}
      <PortfolioNeedsYou
        entries={portfolioEntries || []}
        acFocus={focus}
        referredCount={referredCount}
        onNavigate={onNavigate}
        onCapture={handleFocusCapture}
        onGoTo={(route) =>
          route === 'capture'
            ? window.dispatchEvent(new CustomEvent('elecmate:open-capture'))
            : navigate(route)
        }
      />

      {/* 2-column on lg: course + EPA pulse on the left, activity panels on
          the right. Stays narrow for readability. */}
      <div className="lg:grid lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-8 space-y-5 lg:space-y-0">
        <div className="space-y-5 lg:sticky lg:top-4 lg:self-start">
          {Hero}
          {courseCode && (
            <EPAGatewayPulse qualificationCode={courseCode} qualificationId={courseId} />
          )}
          {PrimaryActions}
        </div>

        <div className="space-y-6 lg:space-y-7 mt-5 lg:mt-0">
          {tree.totalACs > 0 && (
            <FromCollegeCallout
              signoffRecords={signoffRecords}
              comments={comments}
              onACClick={handleACClick}
            />
          )}
        </div>
      </div>

      {/* Below fold — full-width sections so they get the whole canvas
          on a wide desktop. Heatmap especially benefits from the room. */}
      {tree.totalACs > 0 && (
        <section id="ac-heatmap" className="scroll-mt-6">
          <ACHeatmap
            tree={tree}
            acEvidenceMap={acEvidenceMap}
            claimedOnlyRefs={claimedOnlyRefs}
            getSignoff={getSignoff}
            onACClick={handleACClick}
          />
        </section>
      )}

      {tree.totalACs > 0 && (
        <SubmissionReadiness
          qualificationCode={courseCode}
          totalACs={tree.totalACs}
          evidencedCount={evidencedCount}
          portfolioEntries={portfolioEntries || []}
          signoffRecords={signoffRecords}
        />
      )}

      {tree.totalACs > 0 && (
        <CourseRequirementsList
          tree={tree}
          acEvidenceMap={acEvidenceMap}
          claimedOnlyRefs={claimedOnlyRefs}
          onACClick={handleACClick}
        />
      )}

      <PortfolioStatementCard />

      {RecentEvidence}

      {/* AC Evidence bottom sheet */}
      <Sheet
        open={showACEvidence}
        onOpenChange={(v) => {
          setShowACEvidence(v);
          if (!v) setSelectedAC(null);
        }}
      >
        <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl p-0">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />
          <div className="flex flex-col h-full">
            <SheetHeader className="px-4 pb-3">
              <SheetTitle className="text-left flex items-center gap-2">
                <span className="text-[11px] font-mono text-elec-yellow bg-elec-yellow/[0.06] border border-elec-yellow/30 px-2 py-0.5 rounded-md">
                  {selectedAC?.code}
                </span>
                {selectedAC?.unitCode && (
                  <span className="text-[10px] uppercase tracking-[0.14em] text-white">
                    Unit {selectedAC.unitCode}
                  </span>
                )}
              </SheetTitle>
              <SheetDescription className="text-left text-white text-[13px] leading-snug">
                {selectedAC?.text}
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-20 sm:pb-8">
              <AnimatePresence mode="wait">
                {selectedAC && (
                  <motion.div
                    key={selectedAC.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {(() => {
                      const entries = acEvidenceMap.get(selectedAC.code) || [];
                      const signoff = getSignoff(selectedAC.code, selectedAC.unitCode);
                      const lastEvidenceAt =
                        entries.length > 0
                          ? entries
                              .map((e) => e.dateCreated)
                              .filter(Boolean)
                              .sort()
                              .reverse()[0] || null
                          : signoff?.lastEvidenceAt || null;

                      return (
                        <div className="space-y-5">
                          {/* Audit timeline — always visible, builds the compliance picture */}
                          <ACAuditTimeline
                            signoff={signoff}
                            evidenceCount={entries.length}
                            lastEvidenceAt={lastEvidenceAt}
                          />

                          {/* Evidence list */}
                          {entries.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] px-5 py-8 flex flex-col items-center justify-center text-center space-y-3">
                              <p className="text-[13px] text-white leading-relaxed max-w-[260px]">
                                Nothing linked yet — start with a quick capture on site.
                              </p>
                              <Button
                                onClick={() => {
                                  haptic.light();
                                  setShowACEvidence(false);
                                  setSelectedAC(null);
                                  onCapture();
                                }}
                                className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Capture for {selectedAC.code}
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Eyebrow>Evidence linked</Eyebrow>
                              {entries.map((entry) => (
                                <div
                                  key={entry.id}
                                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                                >
                                  <EvidenceThumbnail entry={entry} />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-medium text-white truncate">
                                      {entry.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] text-white font-mono">
                                        {formatRelativeDate(new Date(entry.dateCreated))}
                                      </span>
                                      {entry.evidenceFiles && entry.evidenceFiles.length > 0 && (
                                        <span className="text-[10px] text-white">
                                          {entry.evidenceFiles.length} file
                                          {entry.evidenceFiles.length !== 1 ? 's' : ''}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-[10px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] uppercase tracking-[0.14em]">
                                    {String(entry.status || 'draft')}
                                  </span>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                onClick={() => {
                                  haptic.light();
                                  setShowACEvidence(false);
                                  setSelectedAC(null);
                                  onCapture();
                                }}
                                className="w-full h-11 mt-3 touch-manipulation border-white/[0.08] bg-white/[0.02] text-white hover:bg-white/[0.04]"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add more evidence
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Course selector */}
      <Sheet open={showCourseSelector} onOpenChange={setShowCourseSelector}>
        {/* Full content-column width (house rule: no centred trays) and a
            REAL scroll region — overflow-y-auto only works with the flex
            column + min-h-0 constraint; without it the list just clipped. */}
        <SheetContent
          side="bottom"
          className="h-[85vh] w-full sm:max-w-none rounded-t-3xl p-0 flex flex-col overflow-hidden"
        >
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2 shrink-0" />
          <SheetHeader className="px-4 sm:px-6 pb-3 shrink-0 text-left">
            <SheetTitle>{collegeCourseCode ? 'Your course' : 'Change qualification'}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 pb-[max(env(safe-area-inset-bottom),24px)]">
            <QualificationSelector lockedToCode={collegeCourseCode} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Share */}
      <SharePortfolioSheet open={showShareSheet} onOpenChange={setShowShareSheet} />
    </div>
  );
}

export default UnifiedDashboard;
