import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { SectionQuizzes } from '@/components/college/student360/SectionQuizzes';
import { SectionEpaReadiness } from '@/components/college/student360/SectionEpaReadiness';
import { SectionIlp } from '@/components/college/student360/SectionIlp';
import { useSyncAcCoverage, useRecomputeRisk } from '@/hooks/useStudentRisk';

/* ==========================================================================
   Student360Page — /college/students/:id
   ========================================================================== */

export default function Student360Page() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = useStudent360(id ?? null);

  const [noteOpen, setNoteOpen] = useState(false);
  const [noteKind, setNoteKind] = useState<NoteKind>('note');
  const [messageOpen, setMessageOpen] = useState(false);
  const [observationOpen, setObservationOpen] = useState(false);
  const [otjOpen, setOtjOpen] = useState(false);

  const { sync: syncCoverage, running: syncingCoverage } = useSyncAcCoverage();
  const { recompute, running: recomputingRisk } = useRecomputeRisk();

  const openNote = (k: NoteKind) => {
    setNoteKind(k);
    setNoteOpen(true);
  };

  if (!id) {
    return (
      <PageFrame>
        <div className="text-white">No student id.</div>
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
    refresh,
    prependOptimisticNote,
    confirmOptimisticNote,
    rollbackOptimisticNote,
  } = data;

  const initialLoading = loading.core && !core;

  return (
    <PageFrame className="max-w-[1280px] pb-28 lg:pb-8">
      {/* Back link */}
      <motion.div variants={itemVariants} className="no-print">
        <button
          onClick={() => navigate(-1)}
          className="text-[12px] font-medium text-white/65 hover:text-white transition-colors"
        >
          ← Back
        </button>
      </motion.div>

      {initialLoading && <LoadingState />}

      {!initialLoading && !core && (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-red-300 mb-2">
            Not found
          </div>
          <p className="text-[13.5px] text-white">This learner couldn't be loaded.</p>
        </div>
      )}

      {core && (
        <>
          {/* Desktop action rail — sticky under the back link */}
          <motion.div variants={itemVariants} className="no-print hidden lg:block">
            <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 mb-4 bg-[hsl(0_0%_8%)]/90 backdrop-blur-md border-b border-white/[0.06]">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
                <div className="mr-auto text-[11.5px] text-white truncate">
                  <span className="uppercase tracking-[0.18em] font-medium text-white">
                    Actions
                  </span>
                  <span className="mx-2 text-white/25">·</span>
                  <span className="text-white">{core.name}</span>
                </div>
                <DesktopActionBtn
                  label="Observation"
                  onClick={() => setObservationOpen(true)}
                  tone="emerald"
                />
                <DesktopActionBtn label="Message" onClick={() => setMessageOpen(true)} />
                <DesktopActionBtn label="Note" onClick={() => openNote('note')} />
                <DesktopActionBtn label="1-2-1" onClick={() => openNote('one_to_one')} />
                <DesktopActionBtn
                  label="Praise"
                  onClick={() => openNote('praise')}
                  tone="emerald"
                />
                <DesktopActionBtn label="Flag" onClick={() => openNote('flag')} tone="amber" />
                <DesktopActionBtn
                  label="Concern"
                  onClick={() => openNote('concern')}
                  tone="amber"
                />
                <DesktopActionBtn
                  label="Safeguarding"
                  onClick={() => openNote('safeguarding')}
                  tone="red"
                />
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
              <SectionCoverage
                id="coverage"
                rows={acCoverage}
                loading={loading.acCoverage}
                onSeed={async () => {
                  if (!core) return;
                  await syncCoverage({ student_ids: [core.id] });
                  await refresh();
                }}
                seeding={syncingCoverage}
              />
              <SectionIlp
                id="ilp"
                studentName={core.name}
                collegeStudentId={core.id}
              />
              <SectionCourseProgress
                id="progress"
                studentName={core.name}
                userId={core.user_id}
              />
              <SectionApprenticeOtj
                id="otj"
                studentName={core.name}
                userId={core.user_id}
                onAdd={() => setOtjOpen(true)}
              />
              <SectionPortfolio
                id="portfolio"
                studentName={core.name}
                userId={core.user_id}
              />
              <SectionObservations
                id="observations"
                studentId={core.id}
                onAdd={() => setObservationOpen(true)}
              />
              <SectionQuizzes
                id="quizzes"
                studentName={core.name}
                userId={core.user_id}
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
        </>
      )}
    </PageFrame>
  );
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
              : 'text-white border-white/[0.12] hover:bg-white/[0.06] hover:text-white'
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
      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
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
              <span className="text-[18px] sm:text-[22px] font-semibold text-white tabular-nums">
                {initials}
              </span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-[26px] sm:text-4xl lg:text-[40px] font-semibold text-white tracking-tight leading-[1.05] break-words">
            {core.name}
          </h1>
          <div className="mt-2 flex items-center flex-wrap gap-x-2.5 gap-y-1 text-[12.5px] text-white">
            {core.cohort_name && (
              <span>
                <span className="text-white font-medium">{core.cohort_name}</span>
              </span>
            )}
            {core.course_name && (
              <>
                <span className="text-white/25">·</span>
                <span>{core.course_name}</span>
              </>
            )}
            {core.uln && (
              <>
                <span className="text-white/25">·</span>
                <span className="font-mono tabular-nums text-white">ULN {core.uln}</span>
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
                <span className="uppercase tracking-wide font-medium text-white">
                  {core.status}
                </span>
              </>
            )}
          </div>
          <InclusionChips core={core} />
        </div>
      </div>
    </div>
  );
}

const SEND_LABELS: Record<string, string> = {
  dyslexia: 'Dyslexia',
  dyscalculia: 'Dyscalculia',
  dyspraxia: 'Dyspraxia',
  autism: 'Autism',
  adhd: 'ADHD',
  hearing: 'Hearing',
  visual: 'Visual',
  physical: 'Physical',
  mental_health: 'Mental health',
  other: 'Other SEND',
};

function InclusionChips({ core }: { core: StudentCore }) {
  const hasSend = Array.isArray(core.send_flags) && core.send_flags.length > 0;
  const hasAny =
    hasSend || core.eal || !!core.ehcp_ref || !!core.pronouns || !!core.accessibility_notes;

  if (!hasAny) return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {hasSend &&
          core.send_flags.map((key) => (
            <InclusionPill key={key} tone="amber">
              {SEND_LABELS[key] ?? key}
            </InclusionPill>
          ))}
        {core.eal && (
          <InclusionPill tone="emerald">
            EAL
            {core.first_language ? ` · ${core.first_language}` : ''}
          </InclusionPill>
        )}
        {core.ehcp_ref && <InclusionPill tone="red">EHCP · {core.ehcp_ref}</InclusionPill>}
        {core.pronouns && <InclusionPill tone="neutral">{core.pronouns}</InclusionPill>}
      </div>
      {core.accessibility_notes && (
        <div className="text-[11.5px] text-white leading-relaxed max-w-2xl">
          <span className="uppercase tracking-[0.18em] text-[10px] font-medium text-white mr-2">
            Adjustments
          </span>
          {core.accessibility_notes}
        </div>
      )}
    </div>
  );
}

function InclusionPill({
  tone,
  children,
}: {
  tone: 'amber' | 'emerald' | 'red' | 'neutral';
  children: React.ReactNode;
}) {
  const toneClass =
    tone === 'amber'
      ? 'bg-amber-500/[0.08] border-amber-500/25 text-amber-200'
      : tone === 'emerald'
        ? 'bg-emerald-500/[0.08] border-emerald-500/25 text-emerald-200'
        : tone === 'red'
          ? 'bg-red-500/[0.08] border-red-500/30 text-red-200'
          : 'bg-white/[0.04] border-white/[0.1] text-white';
  return (
    <span
      className={cn(
        'inline-flex items-center h-6 px-2.5 rounded-full border text-[11px] font-medium tracking-tight',
        toneClass
      )}
    >
      {children}
    </span>
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
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">{label}</div>
      <div
        className={cn(
          'mt-3 sm:mt-4 text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight leading-none',
          accent ?? 'text-white'
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-3 text-[11px] text-white">{sub}</div>}
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
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
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
              <div className="mt-2 text-[11.5px] text-white tabular-nums">
                Score {risk.score.toFixed(1)} · updated{' '}
                {new Date(risk.computed_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
                Trend · last {history.length} checks
              </div>
              <TrendSparkline history={history} />
            </div>
          </div>
          {risk.factors.length > 0 && (
            <div className="border-t border-white/[0.06] divide-y divide-white/[0.06]">
              {risk.factors.slice(0, 5).map((f, i) => (
                <div key={i} className="px-5 sm:px-6 py-4 flex items-start gap-4">
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
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-white leading-relaxed">{f.label}</div>
                    {f.detail && (
                      <div className="mt-0.5 text-[11.5px] text-white leading-relaxed">
                        {f.detail}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Section>
  );
}

function TrendSparkline({ history }: { history: { computed_at: string; score: number }[] }) {
  if (history.length < 2) {
    return <div className="text-[11.5px] text-white">Not enough history yet.</div>;
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
  onSeed,
  seeding,
}: {
  id: string;
  rows: AcCoverageRow[];
  loading: boolean;
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
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                      {qual} · Unit {unit}
                    </div>
                  </div>
                  <div className="text-[12px] text-white tabular-nums">
                    <span className="text-white font-medium">{done}</span>
                    <span className="text-white"> / {items.length}</span>
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
        <span className="text-[10px] font-mono text-white tabular-nums">×{row.evidence_count}</span>
      )}
    </div>
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
  const last28 = rows.slice(0, 28);
  const present = last28.filter((a) => a.status === 'present' || a.status === 'late').length;
  const rate = last28.length > 0 ? Math.round((present / last28.length) * 100) : null;

  return (
    <Section id={id} eyebrow="Engagement" title="Attendance">
      {loading && rows.length === 0 ? (
        <SectionSkeleton variant="attendance" />
      ) : rows.length === 0 ? (
        <EmptyCard text="No attendance yet. Take your first register to begin the trend." />
      ) : (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 sm:px-6 py-5 sm:py-6 flex items-start gap-6 flex-wrap">
          <RingStat value={rate} label="28-day rate" size={88} />
          <div className="flex-1 min-w-[240px]">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
              Last {last28.length} sessions
            </div>
            <div className="flex flex-wrap gap-[3px]">
              {last28
                .slice()
                .reverse()
                .map((a) => (
                  <span
                    key={a.id}
                    title={`${a.date} · ${a.status}`}
                    className={cn(
                      'h-6 w-6 rounded-[3px]',
                      a.status === 'present' && 'bg-emerald-400/80',
                      a.status === 'late' && 'bg-amber-400/80',
                      a.status === 'absent' && 'bg-red-400/70',
                      a.status === 'authorised' && 'bg-blue-400/60',
                      !['present', 'late', 'absent', 'authorised'].includes(a.status) &&
                        'bg-white/[0.08]'
                    )}
                  />
                ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[10.5px] text-white">
              <Legend colour="bg-emerald-400/80" label="Present" />
              <Legend colour="bg-amber-400/80" label="Late" />
              <Legend colour="bg-red-400/70" label="Absent" />
              <Legend colour="bg-blue-400/60" label="Authorised" />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
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
      <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white text-center">
        {label}
      </div>
    </div>
  );
}

/* ==========================================================================
   Grades
   ========================================================================== */

function SectionGrades({ id, rows, loading }: { id: string; rows: GradeRow[]; loading: boolean }) {
  return (
    <Section id={id} eyebrow="Outcomes" title="Assessments & grades">
      {loading && rows.length === 0 ? (
        <SectionSkeleton variant="list" />
      ) : rows.length === 0 ? (
        <EmptyCard text="No assessment grades recorded yet." />
      ) : (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
          {rows.map((g) => (
            <div key={g.id} className="px-5 sm:px-6 py-4 flex items-start gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                  {g.assessment_type ?? 'Assessment'}
                  {g.assessed_at && (
                    <>
                      <span className="mx-2 text-white/25">·</span>
                      <span className="tabular-nums normal-case tracking-normal">
                        {new Date(g.assessed_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </>
                  )}
                </div>
                <div className="mt-1 text-[14px] text-white">{g.unit_name ?? '—'}</div>
                {g.feedback && (
                  <div className="mt-2 text-[12px] text-white leading-relaxed line-clamp-2">
                    {g.feedback}
                  </div>
                )}
              </div>
              <div className="text-right shrink-0">
                <div className="text-[18px] sm:text-[20px] font-semibold tabular-nums text-elec-yellow">
                  {g.grade ?? (g.score != null ? g.score.toString() : '—')}
                </div>
                {g.score != null && g.grade != null && (
                  <div className="mt-0.5 text-[10.5px] text-white/50 tabular-nums">{g.score}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
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
                filter === f ? 'bg-elec-yellow text-black' : 'text-white hover:text-white'
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
          : 'text-white border-white/[0.08] bg-[hsl(0_0%_12%)]';
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
            <span className="normal-case tracking-normal text-white">{note.author_name}</span>
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
      <p className="mt-1 text-[13px] text-white leading-relaxed whitespace-pre-line">{note.body}</p>
      {note.action_required && (
        <div className="mt-3 pt-3 border-t border-white/[0.06] text-[12px] text-white leading-relaxed">
          <span className="text-elec-yellow/90 font-medium mr-2">Action</span>
          {note.action_required}
          {note.action_by_date && (
            <span className="text-white ml-2">
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
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
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
      className="block text-[12.5px] text-white hover:text-white py-1.5 transition-colors"
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
      <p className="text-[12.5px] text-white max-w-md mx-auto leading-relaxed">{text}</p>
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
