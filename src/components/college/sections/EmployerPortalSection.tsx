/**
 * EmployerPortalSection — Employer-facing dashboard for managing apprentices.
 * card-surface-interactive cards, KPI strip, framer-motion, mobile-first.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import {
  SectionHeader,
  ListCard,
  ListRow,
  Pill,
  EmptyState,
  LoadingState,
  type Tone,
} from '@/components/college/primitives';

/* ------------------------------------------------------------------ */
/*  Framer motion variants                                            */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

/* ------------------------------------------------------------------ */
/*  Derived types                                                     */
/* ------------------------------------------------------------------ */

interface ApprenticeRow {
  id: string;
  name: string;
  initials: string;
  courseId: string | null;
  courseName: string;
  attendancePercent: number;
  progressPercent: number;
  epaStatus: string;
  otjCompleted: number;
  otjTarget: number;
  otjOnTrack: boolean;
  startDate: string | null;
  lastReviewDate: string | null;
  daysSinceReview: number | null;
}

interface EmployerGroup {
  id: string;
  label: string;
  apprentices: ApprenticeRow[];
  avgAttendance: number;
  avgProgress: number;
  totalOtjRequired: number;
  totalOtjCompleted: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor(Math.abs(b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}


/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function EmployerPortalSection() {
  const { students, courses, attendance, epaRecords, ilps, isLoading } = useCollegeSupabase();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEmployer, setExpandedEmployer] = useState<string | null>(null);

  const now = useMemo(() => new Date(), []);

  /* ---------- build employer groups from student data ---------- */

  const employers = useMemo((): EmployerGroup[] => {
    const map = new Map<string, ApprenticeRow[]>();

    students.forEach((s) => {
      if (s.status !== 'Active' || !s.employer_id) return;

      // Attendance: count records for this student
      const studentAtt = attendance.filter((a) => a.student_id === s.id);
      const presentCount = studentAtt.filter(
        (a) => a.status === 'Present' || a.status === 'Late'
      ).length;
      const attendancePercent =
        studentAtt.length > 0 ? Math.round((presentCount / studentAtt.length) * 100) : 0;

      // EPA
      const epa = epaRecords.find((e) => e.student_id === s.id);
      const epaStatus = epa?.status ?? 'Not Started';

      // Progress
      const progress = s.progress_percent ?? 0;

      // OTJ: 20% of programme duration (assume 370h target, scaled by progress for completed)
      const otjTarget = 370;
      const otjCompleted = Math.round(progress * 3.7);
      const expectedOtjAtThisPoint =
        s.start_date && s.expected_end_date
          ? (() => {
              const start = new Date(s.start_date);
              const end = new Date(s.expected_end_date);
              const totalDays = daysBetween(start, end);
              const elapsed = daysBetween(start, now);
              if (totalDays <= 0) return otjTarget;
              return Math.round((elapsed / totalDays) * otjTarget);
            })()
          : Math.round(otjTarget * 0.5);
      const otjOnTrack = otjCompleted >= expectedOtjAtThisPoint * 0.9;

      // Last ILP review as proxy for tri-partite review
      const studentIlp = ilps.find((i) => i.student_id === s.id);
      const lastReviewDate = studentIlp?.last_reviewed ?? null;
      const daysSinceReview = lastReviewDate
        ? daysBetween(new Date(lastReviewDate), now)
        : null;

      const course = courses.find((c) => c.id === s.course_id);

      const row: ApprenticeRow = {
        id: s.id,
        name: s.name,
        initials: getInitials(s.name),
        courseId: s.course_id,
        courseName: course?.name ?? 'Unknown Course',
        attendancePercent,
        progressPercent: progress,
        epaStatus,
        otjCompleted,
        otjTarget,
        otjOnTrack,
        startDate: s.start_date,
        lastReviewDate,
        daysSinceReview,
      };

      const existing = map.get(s.employer_id) ?? [];
      existing.push(row);
      map.set(s.employer_id, existing);
    });

    const groups: EmployerGroup[] = [];
    map.forEach((apprentices, id) => {
      const avgAttendance =
        apprentices.length > 0
          ? Math.round(
              apprentices.reduce((s, a) => s + a.attendancePercent, 0) / apprentices.length
            )
          : 0;
      const avgProgress =
        apprentices.length > 0
          ? Math.round(
              apprentices.reduce((s, a) => s + a.progressPercent, 0) / apprentices.length
            )
          : 0;
      const totalOtjRequired = apprentices.reduce((s, a) => s + a.otjTarget, 0);
      const totalOtjCompleted = apprentices.reduce((s, a) => s + a.otjCompleted, 0);
      const label = id.length > 8 ? `Employer ${id.slice(0, 8)}` : `Employer ${id}`;

      groups.push({
        id,
        label,
        apprentices,
        avgAttendance,
        avgProgress,
        totalOtjRequired,
        totalOtjCompleted,
      });
    });

    return groups.sort((a, b) => b.apprentices.length - a.apprentices.length);
  }, [students, courses, attendance, epaRecords, ilps, now]);

  /* ---------- KPI calculations ---------- */

  const totalEmployers = employers.length;
  const totalPlaced = employers.reduce((s, e) => s + e.apprentices.length, 0);

  const allApprentices = employers.flatMap((e) => e.apprentices);
  const otjCompliantCount = allApprentices.filter((a) => a.otjOnTrack).length;
  const otjCompliancePercent =
    allApprentices.length > 0 ? Math.round((otjCompliantCount / allApprentices.length) * 100) : 0;

  // Reviews due: no review ever, or 84+ days (12 weeks) since last review
  const reviewsDue = allApprentices.filter(
    (a) => a.daysSinceReview === null || a.daysSinceReview >= 84
  );

  /* ---------- search filter ---------- */

  const filteredEmployers = useMemo(() => {
    if (!searchQuery.trim()) return employers;
    const q = searchQuery.toLowerCase();
    return employers.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.apprentices.some(
          (a) => a.name.toLowerCase().includes(q) || a.courseName.toLowerCase().includes(q)
        )
    );
  }, [employers, searchQuery]);

  /* ---------- render ---------- */

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl space-y-10 sm:space-y-14 pb-12"
    >
      {/* Hero */}
      <motion.div variants={itemVariants}>
        <div className="pt-6 sm:pt-8 lg:pt-10 pb-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            People · Employer Portal
          </div>
          <h1 className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
            Employer engagement
          </h1>
          <p className="mt-3 text-[13px] sm:text-sm text-white/55 max-w-2xl leading-relaxed">
            {totalEmployers} employer{totalEmployers !== 1 ? 's' : ''} with {totalPlaced} active apprentice
            {totalPlaced !== 1 ? 's' : ''}. Workplace engagement, reviews and OTJ compliance.
          </p>
        </div>
      </motion.div>

      {/* KPI Strip */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {[
            { value: totalEmployers, label: 'Employers', sub: 'Active partners', colour: 'text-blue-400' },
            { value: totalPlaced, label: 'Placed', sub: 'Active apprentices', colour: 'text-emerald-400' },
            {
              value: `${otjCompliancePercent}%`,
              label: 'OTJ Compliance',
              sub: 'On target',
              colour:
                otjCompliancePercent >= 80
                  ? 'text-emerald-400'
                  : otjCompliancePercent >= 50
                    ? 'text-amber-400'
                    : 'text-red-400',
            },
            {
              value: reviewsDue.length,
              label: 'Reviews Due',
              sub: 'Awaiting employer',
              colour: reviewsDue.length > 0 ? 'text-amber-400' : 'text-emerald-400',
            },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className="bg-[hsl(0_0%_12%)] px-5 py-6 sm:px-6 sm:py-8 lg:px-7 lg:py-9"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {String(i + 1).padStart(2, '0')} · {kpi.label}
              </div>
              <div
                className={cn(
                  'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                  'text-4xl sm:text-5xl lg:text-6xl',
                  kpi.colour
                )}
              >
                {kpi.value}
              </div>
              <div className="mt-3 text-[11px] text-white/75">{kpi.sub}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants}>
        <input
          type="text"
          placeholder="Search employers or apprentices…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 px-4 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
        />
      </motion.div>

      {/* Employer Directory */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Employer Directory" title="Active employers" />

        {filteredEmployers.length === 0 ? (
          <EmptyState
            title={searchQuery ? 'No employers match your search' : 'No employers with active apprentices'}
          />
        ) : (
          <div className="space-y-3">
            {filteredEmployers.map((employer) => {
              const isExpanded = expandedEmployer === employer.id;
              const progressTone: Tone =
                employer.avgProgress >= 70 ? 'green' : employer.avgProgress >= 40 ? 'amber' : 'red';

              return (
                <div key={employer.id}>
                  <button
                    onClick={() => setExpandedEmployer(isExpanded ? null : employer.id)}
                    className="group w-full bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] border border-white/[0.06] rounded-2xl overflow-hidden text-left touch-manipulation transition-colors"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-400/60 via-cyan-400/60 to-blue-400/60 opacity-70" />
                    <div className="relative z-10 p-5 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                          Employer
                        </div>
                        <h3 className="mt-1 text-[15px] font-semibold text-white truncate">
                          {employer.label}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[11.5px] text-white/75 tabular-nums">
                          <span>
                            {employer.apprentices.length} apprentice
                            {employer.apprentices.length !== 1 ? 's' : ''}
                          </span>
                          <span>{employer.avgAttendance}% attendance</span>
                          <span>{employer.avgProgress}% progress</span>
                        </div>
                      </div>
                      <Pill tone={progressTone}>{employer.avgProgress}%</Pill>
                      <span
                        aria-hidden
                        className={cn(
                          'text-[18px] leading-none text-white/75 transition-transform',
                          isExpanded && 'rotate-90'
                        )}
                      >
                        ›
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 ml-4 sm:ml-6">
                          <ListCard>
                            {employer.apprentices.map((a) => {
                              const epaTone: Tone = a.epaStatus === 'Complete'
                                ? 'green'
                                : a.epaStatus === 'Gateway Ready'
                                  ? 'yellow'
                                  : a.epaStatus === 'Pre-Gateway'
                                    ? 'blue'
                                    : a.epaStatus === 'In Progress'
                                      ? 'amber'
                                      : 'yellow';
                              return (
                                <div
                                  key={a.id}
                                  className="flex items-start gap-4 px-5 sm:px-6 py-4"
                                >
                                  <div className="h-9 w-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                    <span className="text-[11px] font-semibold text-blue-400">
                                      {a.initials}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between gap-2">
                                      <div className="min-w-0">
                                        <div className="text-[14px] font-medium text-white truncate">
                                          {a.name}
                                        </div>
                                        <div className="mt-0.5 text-[11.5px] text-white/75 truncate">
                                          {a.courseName}
                                        </div>
                                      </div>
                                      <Pill tone={epaTone}>{a.epaStatus}</Pill>
                                    </div>
                                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/75 tabular-nums">
                                      <span>Attendance {a.attendancePercent}%</span>
                                      <span>Progress {a.progressPercent}%</span>
                                      <span className={a.otjOnTrack ? 'text-emerald-400' : 'text-amber-400'}>
                                        OTJ {a.otjCompleted}/{a.otjTarget}h
                                        {a.otjOnTrack ? '' : ' · behind'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </ListCard>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </motion.section>

      {/* Tri-Partite Reviews */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Compliance" title="Tri-partite reviews" />
        {reviewsDue.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex items-center gap-4">
            <span aria-hidden className="w-[3px] h-10 rounded-full bg-emerald-400 shrink-0" />
            <div>
              <div className="text-[15px] font-medium text-white">All reviews up to date</div>
              <div className="mt-0.5 text-[12px] text-white/75">
                No apprentices are overdue for a tri-partite review.
              </div>
            </div>
          </div>
        ) : (
          <ListCard>
            {reviewsDue.slice(0, 10).map((a) => {
              const employer = employers.find((e) =>
                e.apprentices.some((ap) => ap.id === a.id)
              );
              const overdueDays = a.daysSinceReview !== null ? a.daysSinceReview - 84 : null;
              const tone: Tone = overdueDays !== null && overdueDays > 0 ? 'red' : 'amber';
              return (
                <ListRow
                  key={a.id}
                  accent={tone}
                  title={a.name}
                  subtitle={`${employer?.label ?? 'Unknown employer'} · Last: ${a.lastReviewDate ?? 'Never'}`}
                  trailing={
                    <Pill tone={tone}>
                      {overdueDays !== null && overdueDays > 0
                        ? `${overdueDays}d overdue`
                        : 'Due now'}
                    </Pill>
                  }
                />
              );
            })}
            {reviewsDue.length > 10 && (
              <div className="px-5 sm:px-6 py-3 text-center text-[11px] text-white/70">
                + {reviewsDue.length - 10} more reviews due
              </div>
            )}
          </ListCard>
        )}
      </motion.section>

      {/* Workplace Visit Log */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Workplace Visits"
          title="Employer site visits"
          action="Log visit"
          onAction={() =>
            toast({
              title: 'Log Visit',
              description: 'Workplace visit logging is coming soon.',
            })
          }
        />
        <EmptyState
          title="No visits recorded"
          description="Log employer site visits to keep a record of workplace assessments, health & safety checks and apprentice progress discussions."
        />
      </motion.section>

      {/* OTJ Summary */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Off-the-Job Training" title="OTJ hours by employer" />
        {employers.length === 0 ? (
          <EmptyState title="No employer data available" />
        ) : (
          <div className="space-y-3">
            {employers.map((employer) => {
              const pct =
                employer.totalOtjRequired > 0
                  ? Math.round((employer.totalOtjCompleted / employer.totalOtjRequired) * 100)
                  : 0;
              const tone: Tone = pct >= 80 ? 'green' : pct >= 50 ? 'amber' : 'red';
              return (
                <div
                  key={employer.id}
                  className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                        Employer
                      </div>
                      <div className="mt-1 text-[14px] font-medium text-white truncate">
                        {employer.label}
                      </div>
                    </div>
                    <Pill tone={tone}>{pct}%</Pill>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-between text-[11px]">
                      <span className="text-white/75 uppercase tracking-[0.12em]">Hours</span>
                      <span className="font-medium text-white tabular-nums">
                        {employer.totalOtjCompleted}h / {employer.totalOtjRequired}h
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          tone === 'green'
                            ? 'bg-emerald-400/80'
                            : tone === 'amber'
                              ? 'bg-amber-400/80'
                              : 'bg-red-400/80'
                        )}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-white/75 tabular-nums">
                    {employer.apprentices.length} apprentice
                    {employer.apprentices.length !== 1 ? 's' : ''}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.section>
    </motion.div>
  );
}

export default EmployerPortalSection;
