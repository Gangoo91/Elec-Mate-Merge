/**
 * EmployerPortalSection — Employer-facing dashboard for managing apprentices.
 * card-surface-interactive cards, KPI strip, framer-motion, mobile-first.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  ClipboardCheck,
  Award,
  Search,
  MapPin,
  FileText,
  BarChart3,
  Loader2,
  Percent,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

function epaStatusColour(status: string): string {
  switch (status) {
    case 'Complete':
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25';
    case 'Gateway Ready':
    case 'Pre-Gateway':
      return 'bg-blue-500/15 text-blue-400 border-blue-500/25';
    case 'In Progress':
      return 'bg-amber-500/15 text-amber-400 border-amber-500/25';
    default:
      return 'bg-white/[0.06] text-white border-white/10';
  }
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
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Header */}
      <CollegeSectionHeader
        title="Employer Portal"
        description={`${totalEmployers} employer${totalEmployers !== 1 ? 's' : ''} with ${totalPlaced} active apprentice${totalPlaced !== 1 ? 's' : ''}`}
      />

      {/* ── KPI Strip ─────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          {
            value: totalEmployers,
            label: 'Employers',
            icon: Building2,
            colour: 'blue',
          },
          {
            value: totalPlaced,
            label: 'Placed',
            icon: Users,
            colour: 'emerald',
          },
          {
            value: `${otjCompliancePercent}%`,
            label: 'OTJ Compliance',
            icon: Percent,
            colour: otjCompliancePercent >= 80 ? 'emerald' : otjCompliancePercent >= 50 ? 'amber' : 'red',
          },
          {
            value: reviewsDue.length,
            label: 'Reviews Due',
            icon: ClipboardCheck,
            colour: reviewsDue.length > 0 ? 'amber' : 'emerald',
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="card-surface p-3 flex flex-col items-center touch-manipulation"
          >
            <div
              className={cn(
                'p-2 rounded-xl mb-1.5',
                `bg-${kpi.colour}-500/10 border border-${kpi.colour}-500/20`
              )}
            >
              <kpi.icon className={cn('h-4 w-4', `text-${kpi.colour}-400`)} />
            </div>
            <span className={cn('text-lg font-bold', `text-${kpi.colour}-400`)}>
              {kpi.value}
            </span>
            <span className="text-[10px] text-white uppercase tracking-wider">{kpi.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Search ─────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          )}
          <Input
            placeholder="Search employers or apprentices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500',
              !searchQuery && 'pl-9'
            )}
          />
        </div>
      </motion.div>

      {/* ── Employer Directory ─────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Employer Directory
        </h2>

        {filteredEmployers.length === 0 && (
          <div className="card-surface p-8 text-center">
            <Building2 className="h-10 w-10 mx-auto mb-3 text-white" />
            <p className="text-sm text-white">
              {searchQuery ? 'No employers match your search.' : 'No employers with active apprentices.'}
            </p>
          </div>
        )}

        <div className="space-y-3">
          {filteredEmployers.map((employer) => {
            const isExpanded = expandedEmployer === employer.id;
            return (
              <div key={employer.id} className="space-y-0">
                {/* Employer card */}
                <button
                  onClick={() =>
                    setExpandedEmployer(isExpanded ? null : employer.id)
                  }
                  className="w-full text-left touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="group card-surface-interactive overflow-hidden">
                    {/* Gradient accent line */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-30 group-hover:opacity-80 transition-opacity" />

                    <div className="relative z-10 p-4 flex items-center gap-3">
                      {/* Icon circle */}
                      <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <Building2 className="h-5 w-5 text-blue-400" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {employer.label}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5">
                          <span className="text-[11px] text-white">
                            {employer.apprentices.length} apprentice{employer.apprentices.length !== 1 ? 's' : ''}
                          </span>
                          <span className="text-[11px] text-white">
                            Att: {employer.avgAttendance}%
                          </span>
                          <span className="text-[11px] text-white">
                            Prog: {employer.avgProgress}%
                          </span>
                        </div>
                      </div>

                      {/* Badge + chevron */}
                      <Badge
                        className={cn(
                          'shrink-0 text-[10px] font-medium border',
                          employer.avgProgress >= 70
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                            : employer.avgProgress >= 40
                              ? 'bg-amber-500/15 text-amber-400 border-amber-500/25'
                              : 'bg-red-500/15 text-red-400 border-red-500/25'
                        )}
                      >
                        {employer.avgProgress}%
                      </Badge>
                      <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all shrink-0">
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded apprentice cards */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1.5 space-y-1.5 pl-4">
                        {employer.apprentices.map((a) => (
                          <div
                            key={a.id}
                            className="card-surface p-3 flex items-start gap-3 touch-manipulation active:scale-[0.98] transition-all"
                          >
                            {/* Avatar circle */}
                            <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                              <span className="text-[11px] font-semibold text-blue-400">
                                {a.initials}
                              </span>
                            </div>

                            <div className="flex-1 min-w-0 space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-medium text-white truncate">
                                  {a.name}
                                </p>
                                <Badge
                                  className={cn(
                                    'shrink-0 text-[10px] font-medium border',
                                    epaStatusColour(a.epaStatus)
                                  )}
                                >
                                  {a.epaStatus}
                                </Badge>
                              </div>
                              <p className="text-[11px] text-white truncate">{a.courseName}</p>

                              {/* Stats row */}
                              <div className="flex flex-wrap gap-x-3 gap-y-1">
                                <span className="inline-flex items-center gap-1 text-[11px] text-white">
                                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                  Att {a.attendancePercent}%
                                </span>
                                <span className="inline-flex items-center gap-1 text-[11px] text-white">
                                  <TrendingUp className="h-3 w-3 text-blue-400" />
                                  Prog {a.progressPercent}%
                                </span>
                                <span
                                  className={cn(
                                    'inline-flex items-center gap-1 text-[11px]',
                                    a.otjOnTrack ? 'text-emerald-400' : 'text-amber-400'
                                  )}
                                >
                                  <Clock className="h-3 w-3" />
                                  OTJ {a.otjCompleted}/{a.otjTarget}h
                                  {a.otjOnTrack ? '' : ' (behind)'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* ── Tri-Partite Reviews ────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Tri-Partite Reviews
        </h2>

        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 opacity-40" />

          {reviewsDue.length === 0 ? (
            <div className="relative z-10 p-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
              <p className="text-sm font-medium text-white">All reviews up to date</p>
              <p className="text-[11px] text-white mt-1">
                No apprentices are overdue for a tri-partite review.
              </p>
            </div>
          ) : (
            <div className="relative z-10 divide-y divide-white/[0.06]">
              {reviewsDue.slice(0, 10).map((a) => {
                const employer = employers.find((e) =>
                  e.apprentices.some((ap) => ap.id === a.id)
                );
                const overdueDays =
                  a.daysSinceReview !== null ? a.daysSinceReview - 84 : null;
                return (
                  <div
                    key={a.id}
                    className="p-3 flex items-center gap-3 touch-manipulation active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{a.name}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                        <span className="text-[11px] text-white">
                          {employer?.label ?? 'Unknown employer'}
                        </span>
                        <span className="text-[11px] text-white">
                          Last: {a.lastReviewDate ?? 'Never'}
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        'shrink-0 text-[10px] font-medium border',
                        overdueDays !== null && overdueDays > 0
                          ? 'bg-red-500/15 text-red-400 border-red-500/25'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/25'
                      )}
                    >
                      {overdueDays !== null && overdueDays > 0
                        ? `${overdueDays}d overdue`
                        : 'Due now'}
                    </Badge>
                    <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center shrink-0">
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                );
              })}
              {reviewsDue.length > 10 && (
                <div className="p-3 text-center">
                  <span className="text-[11px] text-white">
                    + {reviewsDue.length - 10} more reviews due
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.section>

      {/* ── Workplace Visit Log ────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Workplace Visit Log
        </h2>

        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 opacity-30" />

          <div className="relative z-10 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <p className="text-sm font-semibold text-white">Employer Visits</p>
              </div>
              <Button
                size="sm"
                className="h-11 gap-1.5 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation active:scale-[0.98]"
                onClick={() =>
                  toast({
                    title: 'Log Visit',
                    description: 'Workplace visit logging is coming soon.',
                  })
                }
              >
                <Calendar className="h-3.5 w-3.5" />
                Log Visit
              </Button>
            </div>

            {/* Empty state */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-white" />
              <p className="text-sm font-medium text-white">No visits recorded</p>
              <p className="text-[11px] text-white mt-1 max-w-xs mx-auto">
                Log employer site visits to keep a record of workplace assessments, health and
                safety checks, and apprentice progress discussions.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── OTJ Summary by Employer ────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          OTJ Hours by Employer
        </h2>

        {employers.length === 0 ? (
          <div className="card-surface p-8 text-center">
            <BarChart3 className="h-10 w-10 mx-auto mb-3 text-white" />
            <p className="text-sm text-white">No employer data available.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {employers.map((employer) => {
              const pct =
                employer.totalOtjRequired > 0
                  ? Math.round(
                      (employer.totalOtjCompleted / employer.totalOtjRequired) * 100
                    )
                  : 0;
              return (
                <div
                  key={employer.id}
                  className="card-surface overflow-hidden touch-manipulation"
                >
                  <div
                    className={cn(
                      'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30',
                      pct >= 80
                        ? 'from-emerald-500 to-green-400'
                        : pct >= 50
                          ? 'from-amber-500 to-yellow-400'
                          : 'from-red-500 to-orange-400'
                    )}
                  />
                  <div className="relative z-10 p-3.5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={cn(
                            'p-1.5 rounded-lg shrink-0',
                            pct >= 80
                              ? 'bg-emerald-500/10 border border-emerald-500/20'
                              : pct >= 50
                                ? 'bg-amber-500/10 border border-amber-500/20'
                                : 'bg-red-500/10 border border-red-500/20'
                          )}
                        >
                          <Clock
                            className={cn(
                              'h-3.5 w-3.5',
                              pct >= 80
                                ? 'text-emerald-400'
                                : pct >= 50
                                  ? 'text-amber-400'
                                  : 'text-red-400'
                            )}
                          />
                        </div>
                        <p className="text-sm font-medium text-white truncate">
                          {employer.label}
                        </p>
                      </div>
                      <span className="text-[11px] text-white shrink-0">
                        {employer.totalOtjCompleted}h / {employer.totalOtjRequired}h
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          pct >= 80
                            ? 'bg-emerald-500'
                            : pct >= 50
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                        )}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white uppercase tracking-wider">
                        {employer.apprentices.length} apprentice{employer.apprentices.length !== 1 ? 's' : ''}
                      </span>
                      <span
                        className={cn(
                          'text-xs font-semibold',
                          pct >= 80
                            ? 'text-emerald-400'
                            : pct >= 50
                              ? 'text-amber-400'
                              : 'text-red-400'
                        )}
                      >
                        {pct}%
                      </span>
                    </div>
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
