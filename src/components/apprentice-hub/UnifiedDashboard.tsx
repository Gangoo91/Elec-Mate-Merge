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
import { parseEvidencedACs } from '@/utils/parseEvidencedACs';
import { useHaptic } from '@/hooks/useHaptic';
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
import { PortfolioAttentionPanel } from './portfolio/PortfolioAttentionPanel';
import { PortfolioStatementCard } from './portfolio/PortfolioStatementCard';
import { ApprenticeHubTab } from './ApprenticeHubNav';
import { MyProgressCheckCard } from '@/components/apprentice/MyProgressCheckCard';
import QualificationSelector from '@/components/apprentice/qualification/QualificationSelector';
import { SharePortfolioSheet } from './SharePortfolioSheet';
import {
  Eyebrow,
  KpiCell,
  PrimaryAction,
  SecondaryAction,
  SectionHeader,
} from './portfolio/PortfolioPrimitives';
import { TodaysFocusPanel } from './portfolio/TodaysFocusPanel';
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
        <img src={imageFile.url} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
    );
  }
  return (
    <div className="p-2 rounded-lg bg-white/[0.06] flex-shrink-0">
      <FileCheck className="h-4 w-4 text-white/85" />
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
  const { evidencedCount, overallPercent } = useMemo(() => {
    const allACs = tree.units.flatMap((u) =>
      u.learningOutcomes.flatMap((lo) => lo.assessmentCriteria)
    );
    const count = allACs.filter(
      (ac) => acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef)
    ).length;
    const pct = tree.totalACs > 0 ? Math.round((count / tree.totalACs) * 100) : 0;
    return { evidencedCount: count, overallPercent: pct };
  }, [tree, acEvidenceMap]);

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
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 space-y-2">
          <Eyebrow>{greeting}</Eyebrow>
          <h2 className="text-[24px] font-semibold tracking-tight text-white">{firstName}</h2>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Pick your qualification to start your portfolio.
          </p>
        </div>
        <QualificationSelector />
      </div>
    );
  }

  /* ─── Header / Hero (used in both layouts) ────────────────────────── */
  const Hero = (
    <div className="space-y-3">
      <div className="space-y-2">
        <Eyebrow>Apprentice · Portfolio · {greeting}</Eyebrow>
        <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-white leading-none">
          {firstName}
        </h2>
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
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
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
  const KpiStrip = (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
      <KpiCell
        label="ACs signed off"
        value={tree.totalACs > 0 ? `${signedOffCount}/${tree.totalACs}` : '—'}
        sub={
          tree.totalACs > 0
            ? referredCount > 0
              ? `${referredCount} sent back · ${evidencedCount} evidenced`
              : `${evidencedCount} evidenced · ${overallPercent}% of course`
            : 'No course data'
        }
        highlight={tree.totalACs > 0 && signedOffCount >= tree.totalACs * 0.7}
        onClick={() => onNavigate('work')}
      />
      <KpiCell
        label="Evidence items"
        value={portfolioTotal}
        sub={actionRequiredCount > 0 ? `${actionRequiredCount} need attention` : 'All up to date'}
        onClick={() => onNavigate('work')}
      />
      <KpiCell
        label="Course units"
        value={tree.units.length || '—'}
        sub={tree.units.length > 0 ? `${tree.totalACs} ACs total` : ''}
      />
      <KpiCell
        label="Tutor inbox"
        value={actionRequiredCount}
        sub={actionRequiredCount > 0 ? 'Awaiting your reply' : 'Nothing pending'}
        highlight={actionRequiredCount > 0}
      />
    </div>
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
                  className="w-full flex items-start gap-3 p-3.5 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] text-left touch-manipulation hover:bg-white/[0.04] transition-colors"
                >
                  <EvidenceThumbnail entry={entry} />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-[13px] font-medium text-white truncate">{entry.title}</p>
                    {entryACs.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entryACs.slice(0, 3).map((ac, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-1.5 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-white/85 text-[10px] font-mono"
                          >
                            {ac.length > 18 ? ac.slice(0, 16) + '…' : ac}
                          </span>
                        ))}
                        {entryACs.length > 3 && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-white/55 text-[10px]">
                            +{entryACs.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] uppercase tracking-[0.14em] text-white/55">
                        {String(entry.status || 'draft')}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">
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
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1.5">
          <Eyebrow>Course data missing</Eyebrow>
          <p className="text-[13px] text-white/85 leading-relaxed">
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
      {divergesFromCollege && (
        <div className="rounded-xl border border-orange-400/40 bg-orange-400/[0.08] p-4 space-y-1.5">
          <p className="text-[13px] font-semibold text-orange-200">
            Your saved course doesn't match your college
          </p>
          <p className="text-[12px] text-orange-100/80 leading-relaxed">
            You selected <span className="font-mono text-orange-100">{selectionCode}</span>, but
            your college enrolled you on{' '}
            <span className="font-mono text-orange-100">{collegeCourseCode}</span>. We're tracking
            your college's course — update your selection to match.
          </p>
          <button
            onClick={() => setShowCourseSelector(true)}
            className="text-[12px] font-semibold text-orange-200 underline underline-offset-2 touch-manipulation"
          >
            Update selection →
          </button>
        </div>
      )}

      {/* College → apprentice loop: supportive "focus areas" derived from the
          tutor-side risk signals (pastoral/safeguarding stripped server-side). */}
      <MyProgressCheckCard />

      {/* Top fold — 2-column on lg: hero/KPIs/EPA pulse on the left,
          activity panels on the right. Stays narrow for readability. */}
      <div className="lg:grid lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-8 space-y-5 lg:space-y-0">
        <div className="space-y-5 lg:sticky lg:top-4 lg:self-start">
          {Hero}
          {KpiStrip}
          {courseCode && (
            <EPAGatewayPulse qualificationCode={courseCode} qualificationId={courseId} />
          )}
          {PrimaryActions}
        </div>

        <div className="space-y-6 lg:space-y-7 mt-5 lg:mt-0">
          <PortfolioAttentionPanel entries={portfolioEntries || []} onNavigate={onNavigate} />
          {tree.totalACs > 0 && (
            <FromCollegeCallout
              signoffRecords={signoffRecords}
              comments={comments}
              onACClick={handleACClick}
            />
          )}
          {tree.totalACs > 0 && (
            <TodaysFocusPanel
              focus={focus}
              recentActivityCount={recentActivityCount}
              onCapture={handleFocusCapture}
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
                  <span className="text-[10px] uppercase tracking-[0.14em] text-white/55">
                    Unit {selectedAC.unitCode}
                  </span>
                )}
              </SheetTitle>
              <SheetDescription className="text-left text-white/85 text-[13px] leading-snug">
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
                              <p className="text-[13px] text-white/85 leading-relaxed max-w-[260px]">
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
                                      <span className="text-[10px] text-white/40 font-mono">
                                        {formatRelativeDate(new Date(entry.dateCreated))}
                                      </span>
                                      {entry.evidenceFiles && entry.evidenceFiles.length > 0 && (
                                        <span className="text-[10px] text-white/55">
                                          {entry.evidenceFiles.length} file
                                          {entry.evidenceFiles.length !== 1 ? 's' : ''}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-[10px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] uppercase tracking-[0.14em]">
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
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader className="pb-4">
            <SheetTitle>Change qualification</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto pb-20 sm:pb-8">
            <QualificationSelector />
          </div>
        </SheetContent>
      </Sheet>

      {/* Share */}
      <SharePortfolioSheet open={showShareSheet} onOpenChange={setShowShareSheet} />
    </div>
  );
}

export default UnifiedDashboard;
