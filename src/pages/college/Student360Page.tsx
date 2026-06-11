import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageFrame, LoadingState, itemVariants } from '@/components/college/primitives';
import {
  useStudent360,
  type AcCoverageRow,
  type AttendanceRow,
  type GradeRow,
  type PastoralNote,
  type RiskSnapshot,
  type StudentCore,
} from '@/hooks/useStudent360';
import {
  AddPastoralNoteDialog,
  type NoteKind,
} from '@/components/college/dialogs/AddPastoralNoteDialog';
import { StudentMessageSheet } from '@/components/college/sheets/StudentMessageSheet';
import { RecordObservationSheet } from '@/components/college/sheets/RecordObservationSheet';
import { LogCollegeOtjSheet } from '@/components/college/sheets/LogCollegeOtjSheet';
import { SectionObservations } from '@/components/college/student360/SectionObservations';
import { SectionApprenticeOtj } from '@/components/college/student360/SectionApprenticeOtj';
import { SectionCourseProgress } from '@/components/college/student360/SectionCourseProgress';
import { SectionPortfolio } from '@/components/college/student360/SectionPortfolio';
import { SectionAcMatrix } from '@/components/college/student360/SectionAcMatrix';
import { StudentAssessmentConfidence } from '@/components/college/student360/StudentAssessmentConfidence';
import { SectionQuizzes } from '@/components/college/student360/SectionQuizzes';
import { SectionEpaReadiness } from '@/components/college/student360/SectionEpaReadiness';
import { SectionIlp } from '@/components/college/student360/SectionIlp';
import { SectionSupportNeeds } from '@/components/college/student360/SectionSupportNeeds';
import { SectionNextBestAction } from '@/components/college/student360/SectionNextBestAction';
import { useSyncAcCoverage, useRecomputeRisk } from '@/hooks/useStudentRisk';
import type { NextAction } from '@/hooks/useAiNextBestAction';
import { useCohortNeighbors } from '@/hooks/useCohortNeighbors';
import { useStaffRole } from '@/hooks/useStaffRole';
import { MarkAttendanceSheet } from '@/components/college/sheets/MarkAttendanceSheet';
import { LogGradeSheet } from '@/components/college/sheets/LogGradeSheet';
import { CreateQuizSheet } from '@/components/college/sheets/CreateQuizSheet';
import { UploadAssessmentDocSheet } from '@/components/college/sheets/UploadAssessmentDocSheet';
import { CurriculumStatusBadge } from '@/components/college/ui/CurriculumStatusBadge';
import { StudentInclusionSheet } from '@/components/college/sheets/StudentInclusionSheet';
import { OtjForecastBadge } from '@/components/college/widgets/OtjForecastBadge';
import { TripartiteReviewSheet } from '@/components/college/sheets/TripartiteReviewSheet';
import { ParentContactsSheet } from '@/components/college/sheets/ParentContactsSheet';
import { useStudentGdprExport } from '@/hooks/useStudentGdprExport';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   Student360Page — /college/students/:id
   ========================================================================== */

export default function Student360Page() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const data = useStudent360(id ?? null);

  const [noteOpen, setNoteOpen] = useState(false);
  const [noteKind, setNoteKind] = useState<NoteKind>('note');
  const [messageOpen, setMessageOpen] = useState(false);
  const [observationOpen, setObservationOpen] = useState(false);
  const [otjOpen, setOtjOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [gradeOpen, setGradeOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState<{ acCodes?: string[] } | null>(null);
  const [uploadDocOpen, setUploadDocOpen] = useState(false);
  const [inclusionOpen, setInclusionOpen] = useState(false);
  const [tripartiteOpen, setTripartiteOpen] = useState(false);
  const [parentsOpen, setParentsOpen] = useState(false);
  const { exportPack, exporting: gdprExporting, progress: gdprProgress } = useStudentGdprExport();
  const { toast } = useToast();
  const { profile } = useAuth();

  // Hash-scroll: when arriving at /college/students/:id#section (e.g. from
  // the unified inbox or notification bell), scroll to the named section
  // once the data has loaded and the section's DOM node exists. Retries a
  // few times so we don't miss it if data lands later than the first paint.
  // Special-case `#messages` — there's no inline messages section, so open
  // the StudentMessageSheet instead of fruitlessly searching for a node.
  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    if (hash === 'messages') {
      setMessageOpen(true);
      return;
    }
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 12) timer = setTimeout(tryScroll, 250);
    };
    tryScroll();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [location.hash, data.loading.core]);

  // Listen for "quiz:suggest-from-ac" events from AC chips (shift-click) or
  // weak-AC bulk action — opens CreateQuizSheet pre-filled with the AC codes.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ ac_code?: string; ac_codes?: string[] }>).detail;
      const codes = detail?.ac_codes ?? (detail?.ac_code ? [detail.ac_code] : []);
      if (codes.length === 0) return;
      setQuizOpen({ acCodes: codes });
    };
    window.addEventListener('quiz:suggest-from-ac', handler);
    return () => window.removeEventListener('quiz:suggest-from-ac', handler);
  }, []);

  const neighbors = useCohortNeighbors(id ?? null);
  const staffRole = useStaffRole();

  // Cmd/Ctrl + arrow keys cycle through learners in the same cohort
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === 'ArrowLeft' && neighbors.prev) {
        e.preventDefault();
        navigate(`/college/students/${neighbors.prev.id}`);
      } else if (e.key === 'ArrowRight' && neighbors.next) {
        e.preventDefault();
        navigate(`/college/students/${neighbors.next.id}`);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [neighbors.prev, neighbors.next, navigate]);

  const { sync: syncCoverage, running: syncingCoverage } = useSyncAcCoverage();
  const { recompute, running: recomputingRisk } = useRecomputeRisk();

  const openNote = (k: NoteKind) => {
    setNoteKind(k);
    setNoteOpen(true);
  };

  // Dispatcher for AI Next Best Action — maps action.kind to the right
  // existing dialog/sheet. One tap from AI suggestion → action surface.
  const handleNextAction = (action: NextAction) => {
    switch (action.kind) {
      case 'schedule_one_to_one':
        openNote('one_to_one');
        break;
      case 'log_observation':
        setObservationOpen(true);
        break;
      case 'send_message':
        setMessageOpen(true);
        break;
      case 'add_pastoral_note':
        openNote('note');
        break;
      case 'log_otj':
        setOtjOpen(true);
        break;
      case 'review_portfolio':
        document
          .getElementById('portfolio')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'edit_ilp':
      case 'add_ilp_goal':
        document.getElementById('ilp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'log_attendance':
        document
          .getElementById('attendance')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'add_evidence':
        document
          .getElementById('portfolio')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'escalate_safeguarding':
        openNote('safeguarding');
        break;
      case 'praise':
        openNote('praise');
        break;
      default:
        // Fallback — open generic note
        openNote('note');
    }
  };

  if (!id) {
    return (
      <PageFrame>
        <div className="text-white/70">No student id.</div>
      </PageFrame>
    );
  }

  const {
    core,
    attendance,
    grades,
    acCoverage,
    notes,
    risk,
    riskHistory,
    loading,
    errors,
    refresh,
    prependOptimisticNote,
    confirmOptimisticNote,
    rollbackOptimisticNote,
  } = data;

  const initialLoading = loading.core && !core;

  return (
    <PageFrame className="max-w-[1280px] pb-28 lg:pb-8">
      {/* Back link + cohort switcher */}
      <motion.div variants={itemVariants} className="no-print flex items-center gap-3 flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="text-[12px] font-medium text-white hover:text-white/85 transition-colors"
        >
          ← Back
        </button>
        {neighbors.position && (
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => neighbors.prev && navigate(`/college/students/${neighbors.prev.id}`)}
              disabled={!neighbors.prev}
              title={
                neighbors.prev ? `Previous: ${neighbors.prev.name} (⌘←)` : 'No previous learner'
              }
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/[0.04] border border-white/[0.10] text-white hover:bg-white/[0.10] disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[11px] text-white tabular-nums whitespace-nowrap">
              {neighbors.position.index} / {neighbors.position.total}
            </span>
            <button
              type="button"
              onClick={() => neighbors.next && navigate(`/college/students/${neighbors.next.id}`)}
              disabled={!neighbors.next}
              title={neighbors.next ? `Next: ${neighbors.next.name} (⌘→)` : 'No next learner'}
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/[0.04] border border-white/[0.10] text-white hover:bg-white/[0.10] disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-manipulation"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </motion.div>

      {initialLoading && <LoadingState />}

      {!initialLoading && !core && (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-red-300 mb-2">
            Not found
          </div>
          <p className="text-[13.5px] text-white/85">This learner couldn't be loaded.</p>
        </div>
      )}

      {core && (
        <>
          {/* Desktop action rail — sticky under the back link */}
          <motion.div variants={itemVariants} className="no-print hidden lg:block">
            <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 mb-4 bg-[hsl(0_0%_8%)]/95 backdrop-blur-md border-b border-white/[0.06]">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="text-[12px] font-semibold text-white truncate min-w-0">
                    {core.name}
                  </div>
                  <div className="ml-auto -mr-1 sm:mr-0 overflow-x-auto scrollbar-none">
                    <ActionPillGroups
                      groups={groupedActionsForRole(staffRole, {
                        observation: () => setObservationOpen(true),
                        attendance: () => setAttendanceOpen(true),
                        grade: () => setGradeOpen(true),
                        quiz: () => setQuizOpen({}),
                        uploadDoc: () => setUploadDocOpen(true),
                        message: () => setMessageOpen(true),
                        note: () => openNote('note'),
                        oneToOne: () => openNote('one_to_one'),
                        praise: () => openNote('praise'),
                        flag: () => openNote('flag'),
                        concern: () => openNote('concern'),
                        safeguarding: () => openNote('safeguarding'),
                        print: () => navigate(`/college/students/${core.id}/print`),
                        evidence: () => navigate(`/college/students/${core.id}/evidence`),
                        inclusion: () => setInclusionOpen(true),
                        tripartite: () => setTripartiteOpen(true),
                        parents: () => setParentsOpen(true),
                        gdpr: async () => {
                          try {
                            await exportPack({
                              collegeStudentId: core.id,
                              studentUserId: core.user_id ?? null,
                              studentName: core.name,
                            });
                            toast({
                              title: 'GDPR pack downloaded',
                              description: 'ZIP saved to your downloads folder.',
                            });
                          } catch (e) {
                            toast({
                              title: 'GDPR export failed',
                              description: (e as Error).message,
                              variant: 'destructive',
                            });
                          }
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero + identity */}
          <motion.div variants={itemVariants}>
            <IdentityHero core={core} risk={risk} />
          </motion.div>

          {/* Stat strip */}
          <motion.div variants={itemVariants}>
            <StatStrip
              core={core}
              attendance={attendance}
              grades={grades}
              acCoverage={acCoverage}
              risk={risk}
              loading={loading}
            />
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10">
            {/* Section nav — sticky on desktop, hidden on mobile */}
            <aside className="hidden lg:block no-print">
              <div className="sticky top-6 space-y-1 pr-4 border-r border-white/[0.06]">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-3">
                  On this learner
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/college/ai-notebook?student=${core.id}`)}
                  className="w-full text-left h-9 px-2 rounded-md text-[12px] font-semibold text-amber-300 hover:text-amber-200 hover:bg-white/[0.03] transition-colors touch-manipulation"
                >
                  Ask AI about {core.name.split(' ')[0]} →
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/college/students/${core.id}/evidence`)}
                  className="w-full text-left h-9 px-2 rounded-md text-[12px] font-semibold text-purple-300 hover:text-purple-200 hover:bg-white/[0.03] transition-colors touch-manipulation mb-2"
                  title="Inspector-ready evidence chain — Ofsted 'prove it' view"
                >
                  View evidence chain →
                </button>
                <NavLink href="#next-best">Next best</NavLink>
                <NavLink href="#risk">Risk</NavLink>
                <NavLink href="#ilp">ILP</NavLink>
                <NavLink href="#progress">Course progress</NavLink>
                <NavLink href="#coverage">AC coverage</NavLink>
                <NavLink href="#otj">OTJ activity</NavLink>
                <NavLink href="#portfolio">Portfolio</NavLink>
                <NavLink href="#observations">Observations</NavLink>
                <NavLink href="#quizzes">Quizzes</NavLink>
                <NavLink href="#epa">EPA readiness</NavLink>
                <NavLink href="#attendance">Attendance</NavLink>
                <NavLink href="#grades">Assessments</NavLink>
                <NavLink href="#notes">Pastoral notes</NavLink>
              </div>
            </aside>

            {/* Content */}
            <div className="space-y-14 sm:space-y-16 min-w-0">
              <SectionNextBestAction
                id="next-best"
                studentId={core.id}
                studentName={core.name}
                onAction={handleNextAction}
              />
              <SectionRiskPanel
                id="risk"
                risk={risk}
                history={riskHistory}
                loading={loading.risk}
                onCompute={async () => {
                  if (!core) return;
                  await recompute({ student_ids: [core.id] });
                  await refresh();
                }}
                computing={recomputingRisk}
              />
              <SectionIlp id="ilp" studentName={core.name} collegeStudentId={core.id} />
              <SectionSupportNeeds
                id="support"
                collegeStudentId={core.id}
                sendFlags={core.send_flags}
                eal={core.eal}
                ehcpRef={core.ehcp_ref}
                accessibilityNotes={core.accessibility_notes}
                firstLanguage={core.first_language}
                pronouns={core.pronouns}
                onSaved={refresh}
              />
              <SectionCourseProgress id="progress" studentName={core.name} userId={core.user_id} />
              <StudentAssessmentConfidence studentId={core.id} />
              <SectionCoverage
                id="coverage"
                rows={acCoverage}
                loading={loading.acCoverage}
                error={errors.acCoverage}
                onSeed={async () => {
                  if (!core) return;
                  await syncCoverage({ student_ids: [core.id] });
                  await refresh();
                }}
                seeding={syncingCoverage}
              />
              <div id="matrix">
                <SectionAcMatrix
                  studentId={core.id}
                  studentUserId={core.user_id}
                  studentName={core.name}
                />
              </div>
              <div id="otj" className="space-y-4">
                <OtjForecastBadge studentId={core.id} />
                <SectionApprenticeOtj
                  id="otj-list"
                  studentName={core.name}
                  userId={core.user_id}
                  collegeStudentId={core.id}
                  onAdd={() => setOtjOpen(true)}
                />
              </div>
              <SectionPortfolio id="portfolio" studentName={core.name} userId={core.user_id} />
              <SectionObservations
                id="observations"
                studentId={core.id}
                onAdd={() => setObservationOpen(true)}
              />
              <SectionQuizzes
                id="quizzes"
                studentName={core.name}
                userId={core.user_id}
                collegeStudentId={core.id}
              />
              <SectionEpaReadiness
                id="epa"
                studentName={core.name}
                userId={core.user_id}
                collegeStudentId={core.id}
              />
              <SectionAttendance id="attendance" rows={attendance} loading={loading.attendance} />
              <SectionGrades id="grades" rows={grades} loading={loading.grades} />
              <SectionNotes id="notes" notes={notes} loading={loading.notes} />
            </div>
          </div>
        </>
      )}

      {/* Sticky mobile action bar */}
      {core && (
        <div className="lg:hidden no-print fixed bottom-0 left-0 right-0 z-30 bg-[hsl(0_0%_8%)]/95 backdrop-blur-md border-t border-white/[0.08] px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-4 gap-2">
            <MobileAction label="Message" onClick={() => setMessageOpen(true)} />
            <MobileAction label="Note" onClick={() => openNote('note')} />
            <MobileAction label="Observe" onClick={() => setObservationOpen(true)} />
            <MobileAction label="1-2-1" onClick={() => openNote('one_to_one')} primary />
          </div>
        </div>
      )}

      {/* Dialogs / sheets */}
      {core && (
        <>
          <AddPastoralNoteDialog
            open={noteOpen}
            onOpenChange={setNoteOpen}
            studentId={core.id}
            studentName={core.name}
            defaultKind={noteKind}
            onOptimisticStart={(draft) =>
              prependOptimisticNote({
                ...draft,
                action_completed_at: null,
              } as PastoralNote)
            }
            onOptimisticConfirm={(token, serverRow) =>
              confirmOptimisticNote(token, serverRow as PastoralNote)
            }
            onOptimisticRollback={rollbackOptimisticNote}
          />
          <StudentMessageSheet
            open={messageOpen}
            onOpenChange={setMessageOpen}
            studentId={core.id}
            studentName={core.name}
          />
          <RecordObservationSheet
            open={observationOpen}
            onOpenChange={setObservationOpen}
            studentId={core.id}
            studentName={core.name}
          />
          {core.user_id && (
            <LogCollegeOtjSheet
              open={otjOpen}
              onOpenChange={setOtjOpen}
              studentUserId={core.user_id}
              studentName={core.name}
            />
          )}
          <MarkAttendanceSheet
            open={attendanceOpen}
            onOpenChange={setAttendanceOpen}
            studentId={core.id}
            studentName={core.name}
            onSaved={refresh}
          />
          <LogGradeSheet
            open={gradeOpen}
            onOpenChange={setGradeOpen}
            studentId={core.id}
            studentName={core.name}
            courseId={core.course_id}
            onSaved={refresh}
          />
          <CreateQuizSheet
            open={quizOpen !== null}
            onOpenChange={(o) => {
              if (!o) setQuizOpen(null);
            }}
            collegeStudentId={core.id}
            studentName={core.name}
            initialAcCodes={quizOpen?.acCodes}
            onSaved={() => refresh()}
          />
          <UploadAssessmentDocSheet
            open={uploadDocOpen}
            onOpenChange={setUploadDocOpen}
            collegeStudentId={core.id}
            studentName={core.name}
            onSaved={() => refresh()}
          />
          <StudentInclusionSheet
            open={inclusionOpen}
            onOpenChange={setInclusionOpen}
            studentId={core.id}
            studentName={core.name}
          />
          {profile?.college_id && (
            <TripartiteReviewSheet
              open={tripartiteOpen}
              onOpenChange={setTripartiteOpen}
              studentId={core.id}
              studentName={core.name}
              collegeId={profile.college_id}
            />
          )}
          <ParentContactsSheet
            open={parentsOpen}
            onOpenChange={setParentsOpen}
            studentId={core.id}
            studentName={core.name}
          />
        </>
      )}
    </PageFrame>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Role-aware ordering for the desktop action rail. Same set of actions; the
   role flips priority. Don't hide actions — just reorder.
   ────────────────────────────────────────────────────────────────────────── */

interface ActionItem {
  label: string;
  onClick: () => void;
  tone?: 'emerald' | 'amber' | 'red';
}

type ActionHandlers = {
  observation: () => void;
  attendance: () => void;
  grade: () => void;
  quiz: () => void;
  uploadDoc: () => void;
  message: () => void;
  note: () => void;
  oneToOne: () => void;
  praise: () => void;
  flag: () => void;
  concern: () => void;
  safeguarding: () => void;
  print: () => void;
  evidence: () => void;
  inclusion: () => void;
  tripartite: () => void;
  parents: () => void;
  gdpr: () => void;
};

interface ActionGroup {
  label: string;
  items: ActionItem[];
}

/* Group actions semantically — "Record" / "Communicate" / "Flag" / "Print".
   Visually grouped pills are easier to scan than 11 in a row. */
function groupedActionsForRole(
  staffRole: ReturnType<typeof useStaffRole>,
  handlers: ActionHandlers
): ActionGroup[] {
  const items: Record<string, ActionItem> = {
    observation: { label: 'Observation', onClick: handlers.observation, tone: 'emerald' },
    attendance: { label: 'Attendance', onClick: handlers.attendance },
    grade: { label: 'Grade', onClick: handlers.grade },
    quiz: { label: 'Quiz', onClick: handlers.quiz, tone: 'emerald' },
    uploadDoc: { label: 'From doc', onClick: handlers.uploadDoc, tone: 'emerald' },
    message: { label: 'Message', onClick: handlers.message },
    note: { label: 'Note', onClick: handlers.note },
    oneToOne: { label: '1-2-1', onClick: handlers.oneToOne },
    praise: { label: 'Praise', onClick: handlers.praise, tone: 'emerald' },
    flag: { label: 'Flag', onClick: handlers.flag, tone: 'amber' },
    concern: { label: 'Concern', onClick: handlers.concern, tone: 'amber' },
    safeguarding: { label: 'Safeguarding', onClick: handlers.safeguarding, tone: 'red' },
    print: { label: 'Print', onClick: handlers.print },
    evidence: { label: 'Evidence', onClick: handlers.evidence },
    inclusion: { label: 'Inclusion', onClick: handlers.inclusion },
    tripartite: { label: 'Tripartite', onClick: handlers.tripartite, tone: 'emerald' },
    parents: { label: 'Parents', onClick: handlers.parents },
    gdpr: { label: 'GDPR pack', onClick: handlers.gdpr },
  };

  // Group orders flex by role; the FIRST group is what the role most often uses.
  const recordGroup = ['observation', 'attendance', 'grade', 'quiz', 'uploadDoc', 'tripartite'];
  const commGroup = ['oneToOne', 'note', 'message', 'parents'];
  const flagGroup = ['praise', 'flag', 'concern', 'safeguarding'];
  const utilGroup = ['inclusion', 'evidence', 'print', 'gdpr'];

  // EQA is a READ-ONLY external role — expose only view/export actions, never
  // record / communicate / flag (those also can't write at the DB layer).
  if (staffRole.isEqa) {
    return [{ label: 'Review', items: ['evidence', 'print', 'gdpr'].map((k) => items[k]) }];
  }

  // For DSL: safeguarding pulls into its own first-position single-pill group
  if (staffRole.isDsl) {
    return [
      { label: 'Safeguarding', items: [items.safeguarding] },
      { label: 'Record', items: recordGroup.map((k) => items[k]) },
      { label: 'Communicate', items: commGroup.map((k) => items[k]) },
      { label: 'Flag', items: flagGroup.filter((k) => k !== 'safeguarding').map((k) => items[k]) },
      { label: 'Utility', items: utilGroup.map((k) => items[k]) },
    ];
  }

  // Tutor-leaning vs assessor-leaning vs IQA: same groups, different first
  if (staffRole.isAssessor || staffRole.isIqa) {
    return [
      { label: 'Record', items: recordGroup.map((k) => items[k]) },
      { label: 'Communicate', items: commGroup.map((k) => items[k]) },
      { label: 'Flag', items: flagGroup.map((k) => items[k]) },
      { label: 'Utility', items: utilGroup.map((k) => items[k]) },
    ];
  }
  // Tutor / head_of_dept default — communicate first
  return [
    { label: 'Communicate', items: commGroup.map((k) => items[k]) },
    { label: 'Record', items: recordGroup.map((k) => items[k]) },
    { label: 'Flag', items: flagGroup.map((k) => items[k]) },
    { label: 'Utility', items: utilGroup.map((k) => items[k]) },
  ];
}

function ActionPillGroups({ groups }: { groups: ActionGroup[] }) {
  return (
    <div className="inline-flex items-center gap-2 whitespace-nowrap">
      {groups.map((group, i) => (
        <div key={group.label} className="inline-flex items-center gap-1">
          {i > 0 && <span aria-hidden className="mx-1 inline-block h-4 w-px bg-white/[0.10]" />}
          {group.items.map((a) => (
            <PillBtn key={a.label} label={a.label} onClick={a.onClick} tone={a.tone} />
          ))}
        </div>
      ))}
    </div>
  );
}

function PillBtn({
  label,
  onClick,
  tone,
}: {
  label: string;
  onClick: () => void;
  tone?: 'emerald' | 'amber' | 'red';
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-8 px-2.5 rounded-full text-[11.5px] font-medium tracking-tight transition-colors touch-manipulation border whitespace-nowrap',
        tone === 'emerald'
          ? 'text-emerald-200 border-emerald-500/[0.30] bg-emerald-500/[0.04] hover:bg-emerald-500/[0.10]'
          : tone === 'amber'
            ? 'text-amber-200 border-amber-500/[0.30] bg-amber-500/[0.04] hover:bg-amber-500/[0.10]'
            : tone === 'red'
              ? 'text-red-200 border-red-500/[0.30] bg-red-500/[0.04] hover:bg-red-500/[0.10]'
              : 'text-white border-white/[0.14] bg-white/[0.03] hover:bg-white/[0.08]'
      )}
    >
      {label}
    </button>
  );
}

function orderedActionsForRole(
  staffRole: ReturnType<typeof useStaffRole>,
  handlers: {
    observation: () => void;
    attendance: () => void;
    grade: () => void;
    message: () => void;
    note: () => void;
    oneToOne: () => void;
    praise: () => void;
    flag: () => void;
    concern: () => void;
    safeguarding: () => void;
    print: () => void;
  }
): ActionItem[] {
  const items: Record<string, ActionItem> = {
    observation: { label: 'Observation', onClick: handlers.observation, tone: 'emerald' },
    attendance: { label: 'Attendance', onClick: handlers.attendance },
    grade: { label: 'Grade', onClick: handlers.grade },
    message: { label: 'Message', onClick: handlers.message },
    note: { label: 'Note', onClick: handlers.note },
    oneToOne: { label: '1-2-1', onClick: handlers.oneToOne },
    praise: { label: 'Praise', onClick: handlers.praise, tone: 'emerald' },
    flag: { label: 'Flag', onClick: handlers.flag, tone: 'amber' },
    concern: { label: 'Concern', onClick: handlers.concern, tone: 'amber' },
    safeguarding: { label: 'Safeguarding', onClick: handlers.safeguarding, tone: 'red' },
    print: { label: 'Print PDF', onClick: handlers.print },
  };

  // Build order based on role
  let order: string[];
  if (staffRole.isAssessor) {
    order = [
      'observation',
      'grade',
      'attendance',
      'message',
      'note',
      'oneToOne',
      'praise',
      'flag',
      'concern',
      'safeguarding',
      'print',
    ];
  } else if (staffRole.isIqa) {
    order = [
      'observation',
      'grade',
      'attendance',
      'note',
      'message',
      'oneToOne',
      'flag',
      'concern',
      'praise',
      'safeguarding',
      'print',
    ];
  } else {
    // Tutors / head_of_dept / unknown — pastoral-leaning order
    order = [
      'oneToOne',
      'note',
      'message',
      'attendance',
      'grade',
      'observation',
      'praise',
      'flag',
      'concern',
      'safeguarding',
      'print',
    ];
  }

  // Promote safeguarding to position 1 for DSL
  if (staffRole.isDsl) {
    order = ['safeguarding', ...order.filter((k) => k !== 'safeguarding')];
  }

  return order.map((k) => items[k]).filter(Boolean);
}

function DesktopActionBtn({
  label,
  onClick,
  tone,
}: {
  label: string;
  onClick: () => void;
  tone?: 'emerald' | 'amber' | 'red';
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-9 px-3.5 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation border',
        tone === 'emerald'
          ? 'text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/[0.08] hover:text-emerald-200'
          : tone === 'amber'
            ? 'text-amber-300 border-amber-500/25 hover:bg-amber-500/[0.08] hover:text-amber-200'
            : tone === 'red'
              ? 'text-red-300 border-red-500/25 hover:bg-red-500/[0.08] hover:text-red-200'
              : 'text-white/85 border-white/[0.12] hover:bg-white/[0.06] hover:text-white'
      )}
    >
      {label}
    </button>
  );
}

/* ==========================================================================
   Identity hero — photo + name + meta + contact
   ========================================================================== */

function IdentityHero({ core, risk }: { core: StudentCore; risk: RiskSnapshot | null }) {
  const initials = (core.name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const riskTone = riskToneClasses(risk?.level ?? core.risk_level);

  return (
    <div className="relative pt-4 sm:pt-6">
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70',
          riskTone.gradient
        )}
      />
      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
        Learner · Student 360
      </div>
      <div className="mt-2 flex items-start gap-5 flex-wrap">
        <div className="shrink-0">
          {core.photo_url ? (
            <img
              src={core.photo_url}
              alt={core.name}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border border-white/[0.1]"
            />
          ) : (
            <div
              className={cn(
                'h-16 w-16 sm:h-20 sm:w-20 rounded-full border flex items-center justify-center',
                'bg-[hsl(0_0%_13%)]',
                riskTone.ringBorder
              )}
            >
              <span className="text-[18px] sm:text-[22px] font-semibold text-white/90 tabular-nums">
                {initials}
              </span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-[26px] sm:text-4xl lg:text-[40px] font-semibold text-white tracking-tight leading-[1.05] break-words">
            {core.name}
          </h1>
          <div className="mt-2 flex items-center flex-wrap gap-x-2.5 gap-y-1 text-[12.5px] text-white/70">
            {core.cohort_name && (
              <span>
                <span className="text-white/90 font-medium">{core.cohort_name}</span>
              </span>
            )}
            {core.course_name && (
              <>
                <span className="text-white/25">·</span>
                <span>{core.course_name}</span>
                <CurriculumStatusBadge courseId={core.course_id} variant="compact" />
              </>
            )}
            {core.uln && (
              <>
                <span className="text-white/25">·</span>
                <span className="font-mono tabular-nums text-white/85">ULN {core.uln}</span>
              </>
            )}
          </div>
          <div className="mt-1.5 flex items-center flex-wrap gap-x-2.5 gap-y-1 text-[11.5px] text-white/65">
            {core.email && <span className="truncate">{core.email}</span>}
            {core.phone && (
              <>
                <span className="text-white/25">·</span>
                <span className="font-mono tabular-nums">{core.phone}</span>
              </>
            )}
            {core.status && (
              <>
                <span className="text-white/25">·</span>
                <span className="uppercase tracking-wide font-medium text-white/75">
                  {core.status}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Stat strip — 4 cells, clickable jumps to section
   ========================================================================== */

function StatStrip({
  core,
  attendance,
  acCoverage,
  risk,
}: {
  core: StudentCore;
  attendance: AttendanceRow[];
  grades: GradeRow[];
  acCoverage: AcCoverageRow[];
  risk: RiskSnapshot | null;
  loading: ReturnType<typeof useStudent360>['loading'];
}) {
  const attRate = useMemo(() => {
    const window = attendance.slice(0, 28);
    if (window.length === 0) return null;
    const presentCount = window.filter((a) => a.status === 'present' || a.status === 'late').length;
    return Math.round((presentCount / window.length) * 100);
  }, [attendance]);

  const coveragePct = useMemo(() => {
    if (acCoverage.length === 0) return null;
    const done = acCoverage.filter(
      (r) => r.status === 'evidenced' || r.status === 'assessed' || r.status === 'confirmed'
    ).length;
    return Math.round((done / acCoverage.length) * 100);
  }, [acCoverage]);

  const riskTone = riskToneClasses(risk?.level ?? core.risk_level);

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
      <StatCell
        label="Progress"
        value={typeof core.progress_percent === 'number' ? `${core.progress_percent}%` : '—'}
        href="#coverage"
      />
      <StatCell
        label="AC coverage"
        value={coveragePct === null ? '—' : `${coveragePct}%`}
        href="#coverage"
        sub={`${acCoverage.length} ACs tracked`}
      />
      <StatCell
        label="Attendance · 28d"
        value={attRate === null ? '—' : `${attRate}%`}
        href="#attendance"
      />
      <StatCell
        label="Risk"
        value={risk ? risk.level.toUpperCase() : (core.risk_level ?? 'Low').toUpperCase()}
        href="#risk"
        accent={riskTone.valueClass}
      />
    </div>
  );
}

function StatCell({
  label,
  value,
  sub,
  href,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  href?: string;
  accent?: string;
}) {
  const content = (
    <>
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {label}
      </div>
      <div
        className={cn(
          'mt-3 sm:mt-4 text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight leading-none',
          accent ?? 'text-white'
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-3 text-[11px] text-white/70">{sub}</div>}
    </>
  );
  const base =
    'bg-[hsl(0_0%_12%)] px-5 py-5 sm:px-6 sm:py-6 text-left hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation';
  if (href) {
    return (
      <a href={href} className={base}>
        {content}
      </a>
    );
  }
  return <div className={base}>{content}</div>;
}

/* ==========================================================================
   Risk panel
   ========================================================================== */

// Maps a risk-factor key to the Student 360 section it relates to, so a tutor
// can jump straight from "why" to "where" (factor → action).
const FACTOR_ANCHOR: Record<string, string> = {
  attendance_low: 'attendance',
  attendance_dropping: 'attendance',
  attendance_unknown: 'attendance',
  ac_velocity_zero: 'coverage',
  behind_pace: 'coverage',
  portfolio_stale: 'portfolio',
  portfolio_empty: 'portfolio',
  grade_drop: 'grades',
  ilp_overdue: 'ilp',
  open_flags: 'notes',
  no_observations: 'observations',
  observation_stale: 'observations',
  observation_followup: 'observations',
  otj_none: 'otj',
  otj_gap: 'otj',
  epa_gateway_risk: 'epa',
};
function scrollToStudentSection(anchor: string) {
  document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionRiskPanel({
  id,
  risk,
  history,
  loading,
  onCompute,
  computing,
}: {
  id: string;
  risk: RiskSnapshot | null;
  history: { computed_at: string; score: number; level: string }[];
  loading: boolean;
  onCompute?: () => Promise<void> | void;
  computing?: boolean;
}) {
  return (
    <Section
      id={id}
      eyebrow="Signal"
      title="Risk"
      action={
        onCompute ? (
          <button
            onClick={onCompute}
            disabled={computing}
            className="text-[12px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors disabled:opacity-40"
          >
            {computing ? 'Computing…' : 'Recompute →'}
          </button>
        ) : undefined
      }
    >
      {loading && !risk ? (
        <SectionSkeleton variant="risk" />
      ) : !risk ? (
        <EmptyCard
          text="No risk score yet. Compute one now, or wait for the nightly run."
          action={
            onCompute
              ? {
                  label: computing ? 'Computing…' : 'Compute now',
                  onClick: onCompute,
                  disabled: computing,
                }
              : undefined
          }
        />
      ) : (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 sm:px-6 py-5 flex items-start gap-5 flex-wrap">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Current
              </div>
              <div
                className={cn(
                  'mt-2 text-4xl sm:text-5xl font-semibold tabular-nums leading-none',
                  riskToneClasses(risk.level).valueClass
                )}
              >
                {risk.level.toUpperCase()}
              </div>
              <div className="mt-2 text-[11.5px] text-white/55 tabular-nums">
                Score {risk.score.toFixed(1)} · updated{' '}
                {new Date(risk.computed_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
                Trend · last {history.length} checks
              </div>
              <TrendSparkline history={history} />
            </div>
          </div>
          {risk.factors.length > 0 && (
            <div className="border-t border-white/[0.06] divide-y divide-white/[0.06]">
              {risk.factors.slice(0, 5).map((f, i) => {
                const fk = (f as { key?: string }).key;
                const anchor = fk ? FACTOR_ANCHOR[fk] : undefined;
                const dot = (
                  <span
                    className={cn(
                      'mt-1 inline-block h-2 w-2 rounded-full shrink-0',
                      f.severity >= 0.7
                        ? 'bg-red-400'
                        : f.severity >= 0.4
                          ? 'bg-amber-400'
                          : 'bg-white/35'
                    )}
                    aria-hidden
                  />
                );
                const inner = (
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-white leading-relaxed">{f.label}</div>
                    {f.detail && (
                      <div className="mt-0.5 text-[11.5px] text-white/60 leading-relaxed">
                        {f.detail}
                      </div>
                    )}
                  </div>
                );
                if (!anchor) {
                  return (
                    <div key={i} className="px-5 sm:px-6 py-4 flex items-start gap-4">
                      {dot}
                      {inner}
                    </div>
                  );
                }
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToStudentSection(anchor)}
                    className="w-full text-left px-5 sm:px-6 py-4 flex items-start gap-4 hover:bg-white/[0.03] transition-colors touch-manipulation"
                  >
                    {dot}
                    {inner}
                    <span className="mt-0.5 text-white/30 text-[13px] shrink-0" aria-hidden>
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </Section>
  );
}

function TrendSparkline({ history }: { history: { computed_at: string; score: number }[] }) {
  if (history.length < 2) {
    return <div className="text-[11.5px] text-white/45">Not enough history yet.</div>;
  }
  const w = 240;
  const h = 48;
  const maxScore = Math.max(100, ...history.map((p) => p.score));
  const stepX = w / (history.length - 1);
  const points = history
    .map((p, i) => {
      const x = i * stepX;
      const y = h - (p.score / maxScore) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[48px] overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-elec-yellow/80"
      />
      {history.map((p, i) => {
        const x = i * stepX;
        const y = h - (p.score / maxScore) * h;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === history.length - 1 ? 2.5 : 1.5}
            className={cn(i === history.length - 1 ? 'fill-elec-yellow' : 'fill-elec-yellow/60')}
          />
        );
      })}
    </svg>
  );
}

/* ==========================================================================
   AC coverage
   ========================================================================== */

function SectionCoverage({
  id,
  rows,
  loading,
  error,
  onSeed,
  seeding,
}: {
  id: string;
  rows: AcCoverageRow[];
  loading: boolean;
  error?: string | null;
  onSeed?: () => Promise<void> | void;
  seeding?: boolean;
}) {
  const byUnit = useMemo(() => {
    const map = new Map<string, AcCoverageRow[]>();
    for (const r of rows) {
      const key = `${r.qualification_code}::${r.unit_code}`;
      const list = map.get(key) ?? [];
      list.push(r);
      map.set(key, list);
    }
    return Array.from(map.entries()).sort();
  }, [rows]);

  return (
    <Section
      id={id}
      eyebrow="Curriculum"
      title="AC coverage"
      action={
        onSeed && rows.length > 0 ? (
          <button
            onClick={onSeed}
            disabled={seeding}
            className="text-[12px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors disabled:opacity-40"
          >
            {seeding ? 'Syncing…' : 'Sync AC list →'}
          </button>
        ) : undefined
      }
    >
      {loading && rows.length === 0 ? (
        <SectionSkeleton variant="coverage" />
      ) : error ? (
        <div className="bg-red-500/[0.06] border border-red-500/[0.25] rounded-2xl px-5 py-4">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300 mb-1.5">
            Couldn't load AC coverage
          </div>
          <p className="text-[12.5px] text-white leading-snug">
            The query failed: <span className="text-red-200 font-mono break-all">{error}</span>
          </p>
          <p className="mt-2 text-[11.5px] text-white/85 leading-snug">
            Most likely cause: your account isn't a college_staff member of this learner's college,
            so RLS is blocking the read. Check the browser console for the full error.
          </p>
          {onSeed && (
            <button
              type="button"
              onClick={onSeed}
              disabled={seeding}
              className="mt-3 inline-flex items-center justify-center h-9 px-3 rounded-full bg-white/[0.06] border border-white/[0.12] text-[12px] font-semibold text-white hover:bg-white/[0.10] transition-colors touch-manipulation disabled:opacity-50"
            >
              {seeding ? 'Retrying…' : 'Retry sync'}
            </button>
          )}
        </div>
      ) : rows.length === 0 ? (
        <EmptyCard
          text="No AC coverage tracked yet. Seed the AC list from this learner's course qualification to start tracking."
          action={
            onSeed
              ? { label: seeding ? 'Seeding…' : 'Seed AC list', onClick: onSeed, disabled: seeding }
              : undefined
          }
        />
      ) : (
        <div className="space-y-4">
          {byUnit.map(([key, items]) => {
            const [qual, unit] = key.split('::');
            const done = items.filter((r) =>
              ['evidenced', 'assessed', 'confirmed'].includes(r.status)
            ).length;
            return (
              <div
                key={key}
                className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden"
              >
                <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      {qual} · Unit {unit}
                    </div>
                  </div>
                  <div className="text-[12px] text-white/75 tabular-nums">
                    <span className="text-white font-medium">{done}</span>
                    <span className="text-white/40"> / {items.length}</span>
                  </div>
                </div>
                <div className="px-4 sm:px-5 py-4 flex flex-wrap gap-1.5">
                  {items.map((r) => (
                    <AcCell key={r.ac_code} row={r} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

function AcCell({ row }: { row: AcCoverageRow }) {
  const tone = statusTone(row.status);
  const interactive = row.status === 'not_started' || row.status === 'in_progress';

  if (!interactive) {
    return (
      <div
        title={`AC ${row.ac_code} · ${row.status.replace('_', ' ')} · ${row.evidence_count} evidence items`}
        className={cn(
          'h-9 px-2.5 rounded-md border inline-flex items-center gap-1.5 transition-colors',
          tone.bg,
          tone.border
        )}
      >
        <span className={cn('inline-block h-1.5 w-1.5 rounded-full', tone.dot)} />
        <span className={cn('font-mono tabular-nums text-[11.5px]', tone.text)}>{row.ac_code}</span>
        {row.evidence_count > 0 && (
          <span className="text-[10px] font-mono text-white/45 tabular-nums">
            ×{row.evidence_count}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      title={`AC ${row.ac_code} · ${row.status.replace('_', ' ')} — click for AI-suggested ILP goal · shift-click for AI quiz`}
      onClick={(e) => {
        if (e.shiftKey) {
          window.dispatchEvent(
            new CustomEvent('quiz:suggest-from-ac', {
              detail: { unit_code: row.unit_code, ac_code: row.ac_code },
            })
          );
          document
            .getElementById('quizzes')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        window.dispatchEvent(
          new CustomEvent('ilp:suggest-from-ac', {
            detail: { unit_code: row.unit_code, ac_code: row.ac_code },
          })
        );
        document.getElementById('ilp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      className={cn(
        'h-9 px-2.5 rounded-md border inline-flex items-center gap-1.5 transition-colors hover:ring-1 hover:ring-elec-yellow/40 cursor-pointer touch-manipulation',
        tone.bg,
        tone.border
      )}
    >
      <span className={cn('inline-block h-1.5 w-1.5 rounded-full', tone.dot)} />
      <span className={cn('font-mono tabular-nums text-[11.5px]', tone.text)}>{row.ac_code}</span>
      {row.evidence_count > 0 && (
        <span className="text-[10px] font-mono text-white/45 tabular-nums">
          ×{row.evidence_count}
        </span>
      )}
    </button>
  );
}

function statusTone(status: AcCoverageRow['status']) {
  switch (status) {
    case 'confirmed':
    case 'assessed':
      return {
        bg: 'bg-emerald-500/[0.08]',
        border: 'border-emerald-500/25',
        dot: 'bg-emerald-400',
        text: 'text-emerald-200',
      };
    case 'evidenced':
      return {
        bg: 'bg-elec-yellow/[0.05]',
        border: 'border-elec-yellow/25',
        dot: 'bg-elec-yellow',
        text: 'text-elec-yellow',
      };
    case 'in_progress':
      return {
        bg: 'bg-amber-500/[0.05]',
        border: 'border-amber-500/20',
        dot: 'bg-amber-400',
        text: 'text-amber-200',
      };
    default:
      return {
        bg: 'bg-white/[0.03]',
        border: 'border-white/[0.08]',
        dot: 'bg-white/30',
        text: 'text-white/65',
      };
  }
}

/* ==========================================================================
   Attendance — ring + 28-day grid
   ========================================================================== */

function SectionAttendance({
  id,
  rows,
  loading,
}: {
  id: string;
  rows: AttendanceRow[];
  loading: boolean;
}) {
  const norm = (s: string) => (s ?? '').toLowerCase();
  const last28 = rows.slice(0, 28);
  const presentish = last28.filter((a) => ['present', 'late'].includes(norm(a.status))).length;
  const rate = last28.length > 0 ? Math.round((presentish / last28.length) * 100) : null;

  // Pattern detection — auto-callouts that surface insight, not just data.
  const patterns = useMemo(() => detectAttendancePatterns(rows.slice(0, 60)), [rows]);

  // This week — anchor on Monday of the current week
  const today = new Date();
  const monday = new Date(today);
  const dayUtc = today.getUTCDay();
  const diffToMonday = (dayUtc + 6) % 7;
  monday.setUTCDate(today.getUTCDate() - diffToMonday);
  const thisWeek = [0, 1, 2, 3, 4].map((offset) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + offset);
    const iso = d.toISOString().slice(0, 10);
    const row = rows.find((r) => r.date === iso);
    return {
      date: iso,
      dayName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][offset],
      status: row?.status ?? null,
    };
  });

  return (
    <Section id={id} eyebrow="Engagement" title="Attendance">
      {loading && rows.length === 0 ? (
        <SectionSkeleton variant="attendance" />
      ) : rows.length === 0 ? (
        <EmptyCard text="No attendance yet. Take your first register to begin the trend." />
      ) : (
        <div className="space-y-3">
          {/* Hero: ring + this-week pills + heatmap */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 sm:px-6 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-[120px_minmax(0,1fr)] gap-5 lg:gap-6 items-start">
              <RingStat value={rate} label="28-day rate" size={96} />
              <div className="space-y-4">
                {/* This week strip */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
                    This week
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {thisWeek.map((d) => {
                      const tone = attendanceTone(d.status);
                      return (
                        <div
                          key={d.date}
                          className={cn(
                            'h-12 min-w-[58px] px-2 rounded-xl flex flex-col items-center justify-center border',
                            tone.bg,
                            tone.border
                          )}
                          title={`${d.date} · ${d.status ?? 'no record'}`}
                        >
                          <div className="text-[10px] font-semibold tracking-wider text-white/65">
                            {d.dayName}
                          </div>
                          <div
                            className={cn(
                              'text-[11px] font-medium capitalize tabular-nums leading-none mt-0.5',
                              tone.text
                            )}
                          >
                            {d.status ?? '—'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 28-day heatmap */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
                    Last 28 sessions (newest right)
                  </div>
                  <div className="flex flex-wrap gap-[3px]">
                    {last28
                      .slice()
                      .reverse()
                      .map((a) => (
                        <span
                          key={a.id}
                          title={`${a.date} · ${a.status}`}
                          className={cn('h-5 w-5 rounded-[3px]', attendanceTone(a.status).chip)}
                        />
                      ))}
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-[10.5px] text-white/55">
                    <Legend colour="bg-emerald-400/80" label="Present" />
                    <Legend colour="bg-amber-400/80" label="Late" />
                    <Legend colour="bg-red-400/70" label="Absent" />
                    <Legend colour="bg-blue-400/60" label="Authorised" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pattern callouts — only render when something useful was detected */}
          {patterns.length > 0 && (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/[0.06]">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Patterns
                </div>
              </div>
              <ul className="divide-y divide-white/[0.04]">
                {patterns.map((p, i) => (
                  <li key={i} className="px-5 py-3 flex items-start gap-3">
                    <span
                      aria-hidden
                      className={cn(
                        'mt-1.5 inline-block h-1.5 w-1.5 rounded-full flex-shrink-0',
                        p.severity === 'high'
                          ? 'bg-red-400/90'
                          : p.severity === 'medium'
                            ? 'bg-amber-400/85'
                            : 'bg-white/45'
                      )}
                    />
                    <p className="text-[12.5px] text-white/85 leading-snug">{p.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Attendance pattern detection — pure function, returns rationale strings.
   Looks at: weekday-specific absence runs, late-bias, recent dip vs prior.
   ────────────────────────────────────────────────────────────────────────── */

function detectAttendancePatterns(
  rows: AttendanceRow[]
): Array<{ label: string; severity: 'low' | 'medium' | 'high' }> {
  if (rows.length < 5) return [];
  const norm = (s: string) => (s ?? '').toLowerCase();
  const out: Array<{ label: string; severity: 'low' | 'medium' | 'high' }> = [];

  // Recent 7 vs prior 7 trend
  const last7 = rows.slice(0, 7);
  const prior7 = rows.slice(7, 14);
  const presentRate = (list: AttendanceRow[]) =>
    list.length > 0
      ? list.filter((r) => ['present', 'late'].includes(norm(r.status))).length / list.length
      : null;
  const lastRate = presentRate(last7);
  const priorRate = presentRate(prior7);
  if (lastRate != null && priorRate != null && priorRate - lastRate >= 0.2) {
    out.push({
      label: `Attendance dropped this week (${Math.round(lastRate * 100)}%) compared to last (${Math.round(priorRate * 100)}%).`,
      severity: priorRate - lastRate >= 0.4 ? 'high' : 'medium',
    });
  }

  // Weekday-specific absence pattern (e.g. Mondays missed in a row)
  const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const byDay = new Map<number, { absent: number; total: number }>();
  for (const r of rows.slice(0, 28)) {
    const d = new Date(r.date).getUTCDay();
    const m = byDay.get(d) ?? { absent: 0, total: 0 };
    m.total += 1;
    if (norm(r.status) === 'absent') m.absent += 1;
    byDay.set(d, m);
  }
  for (const [day, stats] of byDay) {
    if (stats.total >= 3 && stats.absent >= Math.ceil(stats.total * 0.6)) {
      out.push({
        label: `${dayLabels[day]}s have been absent on ${stats.absent}/${stats.total} sessions in the last 4 weeks — worth a conversation.`,
        severity: stats.absent === stats.total ? 'high' : 'medium',
      });
    }
  }

  // Lateness bias
  const lateCount = rows.slice(0, 28).filter((r) => norm(r.status) === 'late').length;
  if (lateCount >= 4) {
    out.push({
      label: `${lateCount} late marks in the last 28 sessions — punctuality is the main pattern, not absence.`,
      severity: lateCount >= 8 ? 'medium' : 'low',
    });
  }

  // Streak: consecutive absences
  let streak = 0;
  for (const r of rows) {
    if (norm(r.status) === 'absent') streak += 1;
    else break;
  }
  if (streak >= 2) {
    out.push({
      label: `${streak} consecutive absences — most recent on ${rows[0]?.date.slice(5)}. Follow up today.`,
      severity: streak >= 3 ? 'high' : 'medium',
    });
  }

  return out.slice(0, 4);
}

function attendanceTone(status: string | null) {
  const s = (status ?? '').toLowerCase();
  if (s === 'present')
    return {
      chip: 'bg-emerald-400/80',
      bg: 'bg-emerald-500/[0.08]',
      border: 'border-emerald-500/25',
      text: 'text-emerald-200',
    };
  if (s === 'late')
    return {
      chip: 'bg-amber-400/80',
      bg: 'bg-amber-500/[0.08]',
      border: 'border-amber-500/25',
      text: 'text-amber-200',
    };
  if (s === 'absent')
    return {
      chip: 'bg-red-400/70',
      bg: 'bg-red-500/[0.05]',
      border: 'border-red-500/25',
      text: 'text-red-200',
    };
  if (s === 'authorised')
    return {
      chip: 'bg-blue-400/60',
      bg: 'bg-blue-500/[0.05]',
      border: 'border-blue-500/25',
      text: 'text-blue-200',
    };
  return {
    chip: 'bg-white/[0.08]',
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.10]',
    text: 'text-white/45',
  };
}

function Legend({ colour, label }: { colour: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('inline-block h-2 w-2 rounded-sm', colour)} />
      {label}
    </span>
  );
}

function RingStat({
  value,
  label,
  size = 80,
}: {
  value: number | null;
  label: string;
  size?: number;
}) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const pct = value === null ? 0 : Math.max(0, Math.min(1, value / 100));
  const off = c * (1 - pct);
  const valTone =
    value === null
      ? 'text-white/50'
      : value >= 90
        ? 'text-emerald-300'
        : value >= 75
          ? 'text-elec-yellow'
          : 'text-red-300';
  return (
    <div className="shrink-0 flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            className="stroke-white/[0.08] fill-none"
            strokeWidth="6"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            className={cn('fill-none', valTone.replace('text-', 'stroke-'))}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={off}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn('text-[18px] font-semibold tabular-nums', valTone)}>
            {value === null ? '—' : `${value}%`}
          </div>
        </div>
      </div>
      <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 text-center">
        {label}
      </div>
    </div>
  );
}

/* ==========================================================================
   Grades
   ========================================================================== */

function SectionGrades({ id, rows, loading }: { id: string; rows: GradeRow[]; loading: boolean }) {
  // Grade analysis — distribution + predicted band + best per unit
  const analysis = useMemo(() => analyseGrades(rows), [rows]);

  return (
    <Section id={id} eyebrow="Outcomes" title="Assessments & grades">
      {loading && rows.length === 0 ? (
        <SectionSkeleton variant="list" />
      ) : rows.length === 0 ? (
        <EmptyCard text="No assessment grades recorded yet." />
      ) : (
        <div className="space-y-3">
          {/* Hero: predicted band + distribution donut + averages */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 sm:px-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)_180px] gap-5 items-center">
              {/* Distribution donut */}
              <DistributionDonut
                distinction={analysis.distinction}
                merit={analysis.merit}
                pass={analysis.pass}
                fail={analysis.fail}
              />
              {/* Predicted band + counts */}
              <div className="space-y-2">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Predicted EPA band
                </div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className={cn(
                      'text-[28px] font-semibold tabular-nums leading-none',
                      predictedBandColour(analysis.predicted)
                    )}
                  >
                    {analysis.predicted ?? '—'}
                  </span>
                  {analysis.predicted && (
                    <span className="text-[11px] text-white/55 leading-none">
                      based on {analysis.total} grades
                    </span>
                  )}
                </div>
                {analysis.rationale && (
                  <p className="text-[12px] text-white/65 leading-snug">{analysis.rationale}</p>
                )}
              </div>
              {/* Average + trend */}
              <div className="text-right space-y-1">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Average score
                </div>
                <div className="text-[28px] font-semibold tabular-nums text-white leading-none">
                  {analysis.avgScore != null ? `${analysis.avgScore}%` : '—'}
                </div>
                <div className="text-[10.5px] text-white/55 inline-flex items-center gap-1">
                  {analysis.trend === 'up'
                    ? '▲ Trend up'
                    : analysis.trend === 'down'
                      ? '▼ Trend down'
                      : '— Steady'}
                </div>
              </div>
            </div>
          </div>

          {/* Best grade per unit */}
          {analysis.byUnit.length > 0 && (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/[0.06]">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  By unit · best grade per unit
                </div>
              </div>
              <ul className="divide-y divide-white/[0.04]">
                {analysis.byUnit.map((u) => (
                  <li key={u.unit_name} className="px-5 py-3 flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] text-white truncate">{u.unit_name}</div>
                      <div className="mt-0.5 text-[10.5px] text-white/55 tabular-nums">
                        {u.attempts} attempt{u.attempts === 1 ? '' : 's'}
                        {u.avg_score != null && (
                          <>
                            <span className="mx-1.5 text-white/25">·</span>
                            <span>avg {u.avg_score}%</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center h-6 px-2 rounded-full border text-[10.5px] font-semibold tracking-[0.06em] uppercase tabular-nums',
                        gradeBadge(u.best_grade)
                      )}
                    >
                      {u.best_grade ?? '—'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recent attempts */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Recent attempts
              </div>
              <div className="text-[10.5px] text-white/55 tabular-nums">{rows.length} total</div>
            </div>
            <ul className="divide-y divide-white/[0.04]">
              {rows.slice(0, 8).map((g) => (
                <li key={g.id} className="px-5 py-3 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-white truncate">{g.unit_name ?? '—'}</div>
                    <div className="mt-0.5 text-[10.5px] text-white/55 tabular-nums uppercase tracking-[0.06em]">
                      {g.assessment_type?.replace(/_/g, ' ') ?? 'Assessment'}
                      {g.assessed_at && (
                        <>
                          <span className="mx-1.5 text-white/25">·</span>
                          <span className="normal-case tracking-normal">
                            {new Date(g.assessed_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: '2-digit',
                            })}
                          </span>
                        </>
                      )}
                    </div>
                    {g.feedback && (
                      <p className="mt-1.5 text-[11.5px] text-white/65 leading-snug line-clamp-2">
                        {g.feedback}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span
                      className={cn(
                        'inline-flex items-center h-6 px-2 rounded-full border text-[10.5px] font-semibold tracking-[0.06em] uppercase',
                        gradeBadge(g.grade ?? null)
                      )}
                    >
                      {g.grade ?? '—'}
                    </span>
                    {g.score != null && (
                      <span className="text-[11px] text-white tabular-nums">{g.score}%</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Grade analysis helpers
   ────────────────────────────────────────────────────────────────────────── */

const GRADE_RANK: Record<string, number> = { distinction: 4, merit: 3, pass: 2, fail: 1 };

function analyseGrades(rows: GradeRow[]): {
  total: number;
  distinction: number;
  merit: number;
  pass: number;
  fail: number;
  predicted: 'Distinction' | 'Merit' | 'Pass' | 'Fail' | null;
  rationale: string | null;
  avgScore: number | null;
  trend: 'up' | 'down' | 'flat' | null;
  byUnit: Array<{
    unit_name: string;
    best_grade: string | null;
    attempts: number;
    avg_score: number | null;
  }>;
} {
  if (rows.length === 0) {
    return {
      total: 0,
      distinction: 0,
      merit: 0,
      pass: 0,
      fail: 0,
      predicted: null,
      rationale: null,
      avgScore: null,
      trend: null,
      byUnit: [],
    };
  }
  const norm = (g: string | null) => (g ?? '').toLowerCase();
  const distinction = rows.filter((r) => norm(r.grade) === 'distinction').length;
  const merit = rows.filter((r) => norm(r.grade) === 'merit').length;
  const pass = rows.filter((r) => norm(r.grade) === 'pass').length;
  const fail = rows.filter((r) => norm(r.grade) === 'fail').length;
  const total = distinction + merit + pass + fail;
  const ranked = rows
    .map((r) => GRADE_RANK[norm(r.grade)] ?? null)
    .filter((n): n is number => n != null);
  const avgRank = ranked.length > 0 ? ranked.reduce((s, n) => s + n, 0) / ranked.length : null;
  let predicted: 'Distinction' | 'Merit' | 'Pass' | 'Fail' | null = null;
  if (avgRank != null) {
    if (avgRank >= 3.5) predicted = 'Distinction';
    else if (avgRank >= 2.5) predicted = 'Merit';
    else if (avgRank >= 1.5) predicted = 'Pass';
    else predicted = 'Fail';
  }
  const rationale = (() => {
    if (predicted == null) return null;
    const parts: string[] = [];
    if (distinction) parts.push(`${distinction} distinction`);
    if (merit) parts.push(`${merit} merit`);
    if (pass) parts.push(`${pass} pass`);
    if (fail) parts.push(`${fail} fail`);
    return `Pattern: ${parts.join(', ')} — averaging into ${predicted} band.`;
  })();

  const scored = rows.filter((r) => r.score != null);
  const avgScore =
    scored.length > 0
      ? Math.round(scored.reduce((s, r) => s + (r.score ?? 0), 0) / scored.length)
      : null;

  // Trend — split last half vs first half by date
  const sorted = [...rows]
    .filter((r) => r.assessed_at && r.score != null)
    .sort((a, b) => (a.assessed_at ?? '').localeCompare(b.assessed_at ?? ''));
  let trend: 'up' | 'down' | 'flat' | null = null;
  if (sorted.length >= 4) {
    const mid = Math.floor(sorted.length / 2);
    const firstAvg = sorted.slice(0, mid).reduce((s, r) => s + (r.score ?? 0), 0) / mid;
    const lastAvg =
      sorted.slice(mid).reduce((s, r) => s + (r.score ?? 0), 0) / (sorted.length - mid);
    const delta = lastAvg - firstAvg;
    trend = delta > 5 ? 'up' : delta < -5 ? 'down' : 'flat';
  }

  // By unit — best grade per unit_name
  const unitMap = new Map<string, GradeRow[]>();
  for (const r of rows) {
    const key = r.unit_name?.trim() || '—';
    const list = unitMap.get(key) ?? [];
    list.push(r);
    unitMap.set(key, list);
  }
  const byUnit = Array.from(unitMap.entries())
    .map(([unit_name, list]) => {
      const ranks = list.map((r) => GRADE_RANK[norm(r.grade)] ?? 0);
      const bestRank = Math.max(...ranks);
      const bestEntry = list.find((r) => (GRADE_RANK[norm(r.grade)] ?? 0) === bestRank);
      const scores = list.filter((r) => r.score != null);
      return {
        unit_name,
        best_grade: bestEntry?.grade ?? null,
        attempts: list.length,
        avg_score:
          scores.length > 0
            ? Math.round(scores.reduce((s, r) => s + (r.score ?? 0), 0) / scores.length)
            : null,
      };
    })
    .sort((a, b) => (GRADE_RANK[norm(b.best_grade)] ?? 0) - (GRADE_RANK[norm(a.best_grade)] ?? 0))
    .slice(0, 8);

  return { total, distinction, merit, pass, fail, predicted, rationale, avgScore, trend, byUnit };
}

function predictedBandColour(band: string | null): string {
  if (band === 'Distinction') return 'text-emerald-300';
  if (band === 'Merit') return 'text-amber-300';
  if (band === 'Pass') return 'text-blue-300';
  if (band === 'Fail') return 'text-red-300';
  return 'text-white';
}

function gradeBadge(grade: string | null): string {
  const g = (grade ?? '').toLowerCase();
  if (g === 'distinction') return 'bg-emerald-500/[0.12] border-emerald-400/40 text-emerald-200';
  if (g === 'merit') return 'bg-amber-500/[0.10] border-amber-400/35 text-amber-200';
  if (g === 'pass') return 'bg-blue-500/[0.10] border-blue-400/30 text-blue-200';
  if (g === 'fail') return 'bg-red-500/[0.10] border-red-400/30 text-red-200';
  return 'bg-white/[0.04] border-white/[0.10] text-white/55';
}

function DistributionDonut({
  distinction,
  merit,
  pass,
  fail,
}: {
  distinction: number;
  merit: number;
  pass: number;
  fail: number;
}) {
  const total = distinction + merit + pass + fail;
  const segs = [
    { value: distinction, colour: 'rgb(110, 231, 183)' },
    { value: merit, colour: 'rgb(252, 211, 77)' },
    { value: pass, colour: 'rgb(147, 197, 253)' },
    { value: fail, colour: 'rgb(252, 165, 165)' },
  ];
  if (total === 0) {
    return (
      <div className="h-[110px] w-[110px] rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-[10px] text-white/45 uppercase tracking-[0.16em]">
        No grades
      </div>
    );
  }
  let acc = 0;
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[110px] w-[110px] flex-shrink-0 mx-auto">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="hsl(0 0% 14%)" strokeWidth="10" />
        {segs.map((s, i) => {
          if (s.value === 0) return null;
          const dash = (s.value / total) * c;
          const offset = -((acc / total) * c);
          acc += s.value;
          return (
            <circle
              key={i}
              cx="32"
              cy="32"
              r={r}
              fill="none"
              stroke={s.colour}
              strokeWidth="10"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[20px] font-semibold text-white tabular-nums leading-none">
          {total}
        </div>
        <div className="text-[9px] uppercase tracking-[0.16em] text-white/55 mt-1">grades</div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Pastoral notes
   ========================================================================== */

function SectionNotes({
  id,
  notes,
  loading,
}: {
  id: string;
  notes: PastoralNote[];
  loading: boolean;
}) {
  const [filter, setFilter] = useState<'all' | 'flags' | 'actions'>('all');
  const filtered = useMemo(() => {
    if (filter === 'flags')
      return notes.filter(
        (n) => n.kind === 'flag' || n.kind === 'concern' || n.kind === 'safeguarding'
      );
    if (filter === 'actions')
      return notes.filter((n) => n.action_required && !n.action_completed_at);
    return notes;
  }, [notes, filter]);

  return (
    <Section
      id={id}
      eyebrow="Pastoral"
      title="Notes & interventions"
      action={
        <div className="flex items-center gap-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full p-0.5">
          {(['all', 'flags', 'actions'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1 rounded-full text-[11.5px] font-medium transition-colors capitalize',
                filter === f ? 'bg-elec-yellow text-black' : 'text-white/70 hover:text-white'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      }
    >
      {loading && notes.length === 0 ? (
        <SectionSkeleton variant="notes" />
      ) : filtered.length === 0 ? (
        <EmptyCard
          text={
            filter === 'actions'
              ? 'No outstanding actions.'
              : filter === 'flags'
                ? 'No flags.'
                : 'No notes yet.'
          }
        />
      ) : (
        <div className="space-y-2.5">
          {filtered.map((n) => (
            <NoteRow key={n.id} note={n} />
          ))}
        </div>
      )}
    </Section>
  );
}

function NoteRow({ note }: { note: PastoralNote }) {
  const kindTone =
    note.kind === 'safeguarding'
      ? 'text-red-300 border-red-500/25 bg-red-500/[0.05]'
      : note.kind === 'flag' || note.kind === 'concern'
        ? 'text-amber-300 border-amber-500/25 bg-amber-500/[0.04]'
        : note.kind === 'praise'
          ? 'text-emerald-300 border-emerald-500/25 bg-emerald-500/[0.04]'
          : 'text-white/80 border-white/[0.08] bg-[hsl(0_0%_12%)]';
  return (
    <div className={cn('border rounded-xl px-5 py-4', kindTone)}>
      <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] mb-2">
        <span>{note.kind.replace('_', ' ')}</span>
        <span className="text-white/25">·</span>
        <span>
          {new Date(note.created_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
        {note.author_name && (
          <>
            <span className="text-white/25">·</span>
            <span className="normal-case tracking-normal text-white/60">{note.author_name}</span>
          </>
        )}
        {note.visibility === 'safeguarding' && (
          <>
            <span className="text-white/25">·</span>
            <span className="text-red-300">Restricted</span>
          </>
        )}
      </div>
      {note.title && <div className="text-[14px] font-semibold text-white">{note.title}</div>}
      <p className="mt-1 text-[13px] text-white/85 leading-relaxed whitespace-pre-line">
        {note.body}
      </p>
      {note.action_required && (
        <div className="mt-3 pt-3 border-t border-white/[0.06] text-[12px] text-white/80 leading-relaxed">
          <span className="text-elec-yellow/90 font-medium mr-2">Action</span>
          {note.action_required}
          {note.action_by_date && (
            <span className="text-white/55 ml-2">
              · by{' '}
              {new Date(note.action_by_date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          )}
          {note.action_completed_at && <span className="text-emerald-300 ml-2">· done</span>}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   Shared bits
   ========================================================================== */

function Section({
  id,
  eyebrow,
  title,
  action,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {eyebrow}
          </div>
          <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
            {title}
          </h2>
        </div>
        {action && <div className="shrink-0 no-print">{action}</div>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block text-[12.5px] text-white hover:text-elec-yellow py-1.5 transition-colors"
    >
      {children}
    </a>
  );
}

/**
 * Section skeletons — shape-matched per variant so the page doesn't "jump"
 * when real data arrives. All use the same base surface + border and a
 * subtle shimmer via `animate-pulse`.
 */
function SectionSkeleton({
  variant = 'default',
}: {
  variant?: 'default' | 'risk' | 'coverage' | 'attendance' | 'list' | 'notes';
}) {
  const surface = 'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl';

  if (variant === 'risk') {
    return (
      <div className={cn(surface, 'overflow-hidden')}>
        <div className="px-5 sm:px-6 py-5 flex items-start gap-5 flex-wrap animate-pulse">
          <div>
            <SkelBar w="w-12" h="h-2" />
            <div className="mt-2 h-9 w-28 bg-white/[0.06] rounded" />
            <SkelBar w="w-36" h="h-2.5" className="mt-3" />
          </div>
          <div className="flex-1 min-w-[220px]">
            <SkelBar w="w-28" h="h-2" className="mb-3" />
            <div className="h-[48px] w-full bg-white/[0.04] rounded" />
          </div>
        </div>
        <div className="border-t border-white/[0.06]">
          {[0.85, 0.7, 0.55].map((s, i) => (
            <div key={i} className="px-5 sm:px-6 py-4 flex items-start gap-4 animate-pulse">
              <div className="mt-1 h-2 w-2 rounded-full bg-white/15 shrink-0" />
              <div className="flex-1">
                <SkelBar w="w-full" h="h-3" style={{ maxWidth: `${s * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'coverage') {
    return (
      <div className="space-y-4">
        {[0, 1].map((u) => (
          <div key={u} className={cn(surface, 'overflow-hidden animate-pulse')}>
            <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <SkelBar w="w-40" h="h-2.5" />
              <SkelBar w="w-14" h="h-2.5" />
            </div>
            <div className="px-4 sm:px-5 py-4 flex flex-wrap gap-1.5">
              {Array.from({ length: u === 0 ? 12 : 18 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-14 rounded-md bg-white/[0.04] border border-white/[0.06]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'attendance') {
    return (
      <div
        className={cn(surface, 'px-5 sm:px-6 py-5 flex items-start gap-6 flex-wrap animate-pulse')}
      >
        <div className="shrink-0 flex flex-col items-center">
          <div className="h-[88px] w-[88px] rounded-full border-4 border-white/[0.08]" />
          <SkelBar w="w-20" h="h-2" className="mt-2" />
        </div>
        <div className="flex-1 min-w-[240px]">
          <SkelBar w="w-28" h="h-2" className="mb-3" />
          <div className="flex flex-wrap gap-[3px]">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="h-6 w-6 rounded-[3px] bg-white/[0.06]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn(surface, 'overflow-hidden divide-y divide-white/[0.06]')}>
        {[1, 0.9, 0.75, 0.8].map((w, i) => (
          <div key={i} className="px-5 sm:px-6 py-4 flex items-start gap-4 animate-pulse">
            <div className="flex-1">
              <SkelBar w="w-20" h="h-2" />
              <SkelBar w="w-full" h="h-3" className="mt-2" style={{ maxWidth: `${w * 100}%` }} />
              <SkelBar w="w-2/3" h="h-2" className="mt-2 opacity-60" />
            </div>
            <div className="h-8 w-12 rounded bg-white/[0.06] shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'notes') {
    return (
      <div className="space-y-2.5">
        {[0.9, 0.7, 0.85].map((w, i) => (
          <div
            key={i}
            className="border border-white/[0.08] bg-[hsl(0_0%_12%)] rounded-xl px-5 py-4 animate-pulse"
          >
            <div className="flex items-center gap-2 mb-2">
              <SkelBar w="w-12" h="h-2" />
              <SkelBar w="w-20" h="h-2" className="opacity-60" />
            </div>
            <SkelBar w="w-1/2" h="h-3" />
            <SkelBar w="w-full" h="h-2.5" className="mt-2" style={{ maxWidth: `${w * 100}%` }} />
            <SkelBar w="w-3/4" h="h-2.5" className="mt-2 opacity-60" />
          </div>
        ))}
      </div>
    );
  }

  // default
  return (
    <div className={cn(surface, 'px-6 py-8 animate-pulse')}>
      <SkelBar w="w-28" h="h-2" />
      <SkelBar w="w-full" h="h-3" className="mt-3" />
      <SkelBar w="w-5/6" h="h-3" className="mt-2" />
      <SkelBar w="w-2/3" h="h-3" className="mt-2" />
    </div>
  );
}

function SkelBar({
  w,
  h = 'h-3',
  className,
  style,
}: {
  w: string;
  h?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div className={cn('bg-white/[0.06] rounded-sm', w, h, className)} style={style} />;
}

function EmptyCard({
  text,
  action,
}: {
  text: string;
  action?: { label: string; onClick: () => void | Promise<void>; disabled?: boolean };
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
      <p className="text-[12.5px] text-white/60 max-w-md mx-auto leading-relaxed">{text}</p>
      {action && (
        <button
          onClick={action.onClick}
          disabled={action.disabled}
          className="mt-4 h-10 px-5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[12.5px] font-medium transition-colors disabled:opacity-40"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

function MobileAction({
  label,
  onClick,
  primary,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-11 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
        primary
          ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
          : 'bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08]'
      )}
    >
      {label}
    </button>
  );
}

function riskToneClasses(level: string | null | undefined) {
  const lvl = (level ?? 'low').toLowerCase();
  if (lvl === 'critical')
    return {
      gradient: 'from-red-500/70 via-red-400/70 to-orange-400/70',
      ringBorder: 'border-red-500/40',
      valueClass: 'text-red-300',
    };
  if (lvl === 'high')
    return {
      gradient: 'from-red-500/60 via-amber-400/70 to-orange-400/70',
      ringBorder: 'border-red-500/30',
      valueClass: 'text-red-300',
    };
  if (lvl === 'medium')
    return {
      gradient: 'from-amber-500/70 via-amber-400/70 to-yellow-400/70',
      ringBorder: 'border-amber-500/30',
      valueClass: 'text-amber-300',
    };
  return {
    gradient: 'from-elec-yellow/70 via-amber-400/70 to-orange-400/70',
    ringBorder: 'border-white/[0.12]',
    valueClass: 'text-emerald-300',
  };
}
