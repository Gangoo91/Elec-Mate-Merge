/**
 * AIILPGeneratorSection — Generates SMART targets and ILP review comments
 * based on student attendance, grades, EPA status and current ILP data.
 */

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard } from '@/utils/clipboard';
import {
  Search,
  Sparkles,
  User,
  ChevronRight,
  Loader2,
  Calendar,
  Target,
  Award,
  ClipboardList,
  CheckCircle2,
  BarChart3,
  Copy,
  RefreshCw,
  Save,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface AIILPGeneratorSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

/* ------------------------------------------------------------------ */
/*  Framer motion variants                                             */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

/* ------------------------------------------------------------------ */
/*  Types for generated review                                         */
/* ------------------------------------------------------------------ */

interface SMARTTarget {
  description: string;
  successCriteria: string;
  targetDate: string;
  category: 'attendance' | 'academic' | 'professional';
}

interface GeneratedReview {
  reviewDate: string;
  overallComment: string;
  strengths: string[];
  areasForDevelopment: string[];
  targets: SMARTTarget[];
}

/* ------------------------------------------------------------------ */
/*  Helper: format date                                                */
/* ------------------------------------------------------------------ */

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ */
/*  Helper: category colour                                            */
/* ------------------------------------------------------------------ */

function categoryColour(cat: SMARTTarget['category']) {
  switch (cat) {
    case 'attendance':
      return 'blue';
    case 'academic':
      return 'amber';
    case 'professional':
      return 'emerald';
  }
}

/* ------------------------------------------------------------------ */
/*  Helper: risk badge                                                 */
/* ------------------------------------------------------------------ */

function riskBadge(level: string | null) {
  const base = 'text-xs font-semibold px-2 py-0.5 rounded-full';
  switch (level?.toLowerCase()) {
    case 'high':
      return <span className={cn(base, 'bg-red-500/20 text-red-400')}>High Risk</span>;
    case 'medium':
      return <span className={cn(base, 'bg-amber-500/20 text-amber-400')}>Medium Risk</span>;
    default:
      return <span className={cn(base, 'bg-emerald-500/20 text-emerald-400')}>Low Risk</span>;
  }
}

/* ------------------------------------------------------------------ */
/*  Generation logic (client-side, template-based)                     */
/* ------------------------------------------------------------------ */

interface StudentSnapshot {
  name: string;
  attendanceRate: number | null;
  totalSessions: number;
  grades: { unit: string; grade: string; score: number | null }[];
  epaStatus: string | null;
  epaResult: string | null;
  ilpTargetsTotal: number;
  ilpTargetsAchieved: number;
  courseName: string | null;
  riskLevel: string | null;
}

function generateReview(snap: StudentSnapshot, seed: number): GeneratedReview {
  const today = new Date();
  const twoWeeks = new Date(today);
  twoWeeks.setDate(twoWeeks.getDate() + 14);

  // Attendance comment
  const att = snap.attendanceRate;
  let attComment: string;
  let attStrength: string | null = null;
  let attDev: string | null = null;

  if (att === null || snap.totalSessions === 0) {
    attComment = 'No attendance data is currently available for analysis.';
    attDev = 'Ensure attendance records are kept up to date to support accurate ILP reviews.';
  } else if (att >= 90) {
    attComment = `Excellent attendance at ${att}%, demonstrating strong commitment to the programme.`;
    attStrength = `Consistently high attendance (${att}%), reflecting professionalism and dedication to completing the apprenticeship.`;
  } else if (att >= 80) {
    attComment = `Good attendance at ${att}%, though there is room for improvement to meet the expected 90%+ threshold.`;
    attDev = `Attendance currently at ${att}% — aim to reach 90%+ to meet college and ESFA funding requirements.`;
  } else {
    attComment = `Attendance at ${att}% is a concern and falls below the required threshold. Immediate improvement is needed to remain compliant with funding body expectations.`;
    attDev = `Attendance at ${att}% is significantly below target. A structured attendance improvement plan should be put in place with employer and tutor support.`;
  }

  // Grades analysis
  const scoredGrades = snap.grades.filter((g) => g.score !== null);
  let gradesComment: string;
  let gradesStrength: string | null = null;
  let gradesDev: string | null = null;
  let weakestUnit: string | null = null;

  if (scoredGrades.length === 0) {
    gradesComment = 'No graded assessments are available yet.';
    gradesDev = 'Submit outstanding assessments to enable progress tracking across units.';
  } else {
    const sorted = [...scoredGrades].sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
    const avg = Math.round(sorted.reduce((s, g) => s + (g.score ?? 0), 0) / sorted.length);
    weakestUnit = sorted[0].unit ?? 'an unspecified unit';
    const strongestUnit = sorted[sorted.length - 1].unit ?? 'an unspecified unit';

    if (avg >= 70) {
      gradesComment = `Performing well across units with an average score of ${avg}%. Strongest performance in ${strongestUnit}.`;
      gradesStrength = `Strong academic performance (avg ${avg}%) across ${scoredGrades.length} assessed units, particularly in ${strongestUnit}.`;
    } else if (avg >= 50) {
      gradesComment = `Average performance at ${avg}% across assessed units. Additional support may be needed in ${weakestUnit}.`;
      gradesDev = `Performance in ${weakestUnit} (${sorted[0].score}%) requires focused revision. Consider additional workshop sessions on relevant BS 7671 regulations.`;
    } else {
      gradesComment = `Academic performance is below expectations (avg ${avg}%). Needs targeted support, especially in ${weakestUnit}.`;
      gradesDev = `Significant improvement needed in ${weakestUnit} (${sorted[0].score}%). Arrange one-to-one support sessions covering the relevant City & Guilds / EAL unit content and BS 7671 amendment references.`;
    }
    if (!gradesStrength && avg >= 50) {
      gradesStrength = `Demonstrated competence in ${strongestUnit}, achieving ${sorted[sorted.length - 1].score}%.`;
    }
  }

  // EPA comment
  let epaComment: string;
  let epaStrength: string | null = null;
  let epaDev: string | null = null;

  const epaLower = (snap.epaStatus ?? '').toLowerCase();
  if (!snap.epaStatus || epaLower === 'not started') {
    epaComment = 'End-point assessment has not yet commenced.';
    epaDev = 'Begin EPA gateway preparation: ensure practical logbook evidence is complete and employer sign-off is obtained.';
  } else if (epaLower === 'gateway' || epaLower === 'in progress') {
    epaComment = 'The learner is progressing through the EPA gateway stage.';
    epaStrength = 'Progressing towards EPA gateway — evidence portfolio and practical assessments are underway.';
    epaDev = 'Complete all outstanding gateway requirements including employer endorsement and professional discussion preparation.';
  } else if (epaLower === 'completed' || epaLower === 'passed') {
    epaComment = `EPA has been completed${snap.epaResult ? ` with a result of ${snap.epaResult}` : ''}. Well done.`;
    epaStrength = `Successfully completed End-Point Assessment${snap.epaResult ? ` (${snap.epaResult})` : ''}, demonstrating occupational competence.`;
  } else {
    epaComment = `EPA status: ${snap.epaStatus}.`;
  }

  // ILP targets comment
  let ilpComment = '';
  if (snap.ilpTargetsTotal > 0) {
    ilpComment = ` Currently ${snap.ilpTargetsAchieved} of ${snap.ilpTargetsTotal} ILP targets have been achieved.`;
  }

  // Overall comment
  const overallComment = `${attComment} ${gradesComment} ${epaComment}${ilpComment}`;

  // Strengths
  const strengths: string[] = [];
  if (attStrength) strengths.push(attStrength);
  if (gradesStrength) strengths.push(gradesStrength);
  if (epaStrength) strengths.push(epaStrength);
  if (strengths.length === 0) {
    strengths.push(
      'Enrolled on the programme and engaging with the learning journey.',
      'Demonstrating willingness to develop electrical installation skills.'
    );
  }

  // Areas for development
  const areasForDevelopment: string[] = [];
  if (attDev) areasForDevelopment.push(attDev);
  if (gradesDev) areasForDevelopment.push(gradesDev);
  if (epaDev) areasForDevelopment.push(epaDev);
  if (areasForDevelopment.length === 0) {
    areasForDevelopment.push(
      'Continue building depth of knowledge in BS 7671 amendment 2 requirements.',
      'Seek additional site experience to strengthen practical verification and inspection skills.'
    );
  }

  // SMART targets
  const targets: SMARTTarget[] = [];

  // Target 1: Attendance
  if (att !== null && att < 90) {
    targets.push({
      description: `Improve attendance from ${att}% to at least 90% over the next review period by attending all scheduled sessions and communicating absences in advance to the tutor and employer.`,
      successCriteria: `Attendance rate recorded at 90% or above at next ILP review. No unexplained absences.`,
      targetDate: isoDate(twoWeeks),
      category: 'attendance',
    });
  } else {
    targets.push({
      description: `Maintain current attendance level at or above 90% and continue to demonstrate punctuality and professional conduct in all sessions.`,
      successCriteria: `Attendance remains at 90%+ at next review. Positive feedback from tutor on engagement.`,
      targetDate: isoDate(twoWeeks),
      category: 'attendance',
    });
  }

  // Target 2: Academic / weakest area
  if (weakestUnit) {
    const variations = [
      `Complete targeted revision on ${weakestUnit}, focusing on the relevant BS 7671 regulations and practical application. Attempt at least one mock assessment before the target date.`,
      `Improve understanding of ${weakestUnit} by attending additional workshop sessions and completing supplementary practice questions. Submit a revised assignment demonstrating improved comprehension.`,
      `Work with the tutor to identify specific knowledge gaps in ${weakestUnit}. Use recommended study materials and online resources from the IET to consolidate understanding.`,
    ];
    targets.push({
      description: variations[seed % variations.length],
      successCriteria: `Achieve a minimum score of 70% on a reassessment or mock test for ${weakestUnit}.`,
      targetDate: isoDate(twoWeeks),
      category: 'academic',
    });
  } else {
    targets.push({
      description: `Complete and submit all outstanding unit assessments by the target date. Ensure all written work references current BS 7671 amendment 2 and relevant guidance notes.`,
      successCriteria: `All due assessments submitted and graded. No outstanding submissions.`,
      targetDate: isoDate(twoWeeks),
      category: 'academic',
    });
  }

  // Target 3: EPA / professional development
  if (!snap.epaStatus || epaLower === 'not started') {
    targets.push({
      description: `Begin EPA gateway preparation by compiling a portfolio of practical evidence. Obtain employer feedback on workplace competence and ensure the practical logbook is up to date.`,
      successCriteria: `Practical logbook reviewed and signed by employer. At least 3 pieces of workplace evidence added to the portfolio.`,
      targetDate: isoDate(twoWeeks),
      category: 'professional',
    });
  } else if (epaLower === 'gateway' || epaLower === 'in progress') {
    targets.push({
      description: `Complete all EPA gateway requirements including professional discussion preparation. Practise answering scenario-based questions covering safe isolation, circuit design, and testing procedures per BS 7671.`,
      successCriteria: `Gateway checklist fully signed off. Mock professional discussion completed with tutor feedback.`,
      targetDate: isoDate(twoWeeks),
      category: 'professional',
    });
  } else {
    targets.push({
      description: `Engage in continuous professional development by researching upcoming changes to wiring regulations and attending at least one industry CPD event or webinar. Discuss findings with employer.`,
      successCriteria: `Evidence of CPD activity logged. Written reflection submitted to tutor.`,
      targetDate: isoDate(twoWeeks),
      category: 'professional',
    });
  }

  return {
    reviewDate: isoDate(today),
    overallComment,
    strengths,
    areasForDevelopment,
    targets,
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AIILPGeneratorSection({ onNavigate }: AIILPGeneratorSectionProps) {
  const { students, courses, cohorts, attendance, grades, ilps, epaRecords, isLoading } =
    useCollegeSupabase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [review, setReview] = useState<GeneratedReview | null>(null);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  // Filtered student list
  const filteredStudents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.uln?.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  // Selected student
  const student = useMemo(
    () => students.find((s) => s.id === selectedStudentId) ?? null,
    [students, selectedStudentId]
  );

  // Student course / cohort
  const course = useMemo(
    () => (student?.course_id ? courses.find((c) => c.id === student.course_id) ?? null : null),
    [courses, student]
  );
  const cohort = useMemo(
    () => (student?.cohort_id ? cohorts.find((c) => c.id === student.cohort_id) ?? null : null),
    [cohorts, student]
  );

  // Student attendance
  const studentAttendance = useMemo(
    () => (student ? attendance.filter((a) => a.student_id === student.id) : []),
    [attendance, student]
  );
  const attendanceRate = useMemo(() => {
    if (studentAttendance.length === 0) return null;
    const present = studentAttendance.filter(
      (a) => a.status === 'Present' || a.status === 'Late'
    ).length;
    return Math.round((present / studentAttendance.length) * 100);
  }, [studentAttendance]);

  // Student grades
  const studentGrades = useMemo(
    () => (student ? grades.filter((g) => g.student_id === student.id) : []),
    [grades, student]
  );

  // Student ILPs
  const studentILPs = useMemo(
    () => (student ? ilps.filter((i) => i.student_id === student.id) : []),
    [ilps, student]
  );
  const ilpTargets = useMemo(() => {
    const all = studentILPs.flatMap((i) => i.targets ?? []);
    return { total: all.length, achieved: all.filter((t) => t.status === 'Achieved').length };
  }, [studentILPs]);

  // Student EPA
  const studentEPA = useMemo(
    () => (student ? epaRecords.find((e) => e.student_id === student.id) ?? null : null),
    [epaRecords, student]
  );

  // Build snapshot for generation
  const buildSnapshot = useCallback((): StudentSnapshot | null => {
    if (!student) return null;
    return {
      name: student.name,
      attendanceRate,
      totalSessions: studentAttendance.length,
      grades: studentGrades.map((g) => ({
        unit: g.unit_name ?? 'Unknown Unit',
        grade: g.grade ?? '-',
        score: g.score,
      })),
      epaStatus: studentEPA?.status ?? null,
      epaResult: studentEPA?.result ?? null,
      ilpTargetsTotal: ilpTargets.total,
      ilpTargetsAchieved: ilpTargets.achieved,
      courseName: course?.name ?? null,
      riskLevel: student.risk_level,
    };
  }, [student, attendanceRate, studentAttendance, studentGrades, studentEPA, ilpTargets, course]);

  // Generate handler
  const handleGenerate = useCallback(() => {
    const snap = buildSnapshot();
    if (!snap) return;
    setGenerating(true);
    setReview(null);
    // Simulate slight delay for UX feedback
    setTimeout(() => {
      const nextSeed = seed + 1;
      setSeed(nextSeed);
      setReview(generateReview(snap, nextSeed));
      setGenerating(false);
    }, 800);
  }, [buildSnapshot, seed]);

  // Regenerate with new seed
  const handleRegenerate = useCallback(() => {
    const snap = buildSnapshot();
    if (!snap) return;
    setGenerating(true);
    setTimeout(() => {
      const nextSeed = seed + 1;
      setSeed(nextSeed);
      setReview(generateReview(snap, nextSeed));
      setGenerating(false);
    }, 600);
  }, [buildSnapshot, seed]);

  // Copy to clipboard
  const handleCopy = useCallback(() => {
    if (!review || !student) return;
    const lines: string[] = [
      `ILP Review — ${student.name}`,
      `Date: ${fmtDate(new Date(review.reviewDate))}`,
      '',
      'Overall Progress:',
      review.overallComment,
      '',
      'Strengths:',
      ...review.strengths.map((s) => `  - ${s}`),
      '',
      'Areas for Development:',
      ...review.areasForDevelopment.map((a) => `  - ${a}`),
      '',
      'SMART Targets:',
      ...review.targets.map(
        (t, i) =>
          `  ${i + 1}. [${t.category.toUpperCase()}] ${t.description}\n     Success criteria: ${t.successCriteria}\n     Target date: ${fmtDate(new Date(t.targetDate))}`
      ),
    ];
    copyToClipboard(lines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [review, student]);

  // Select student
  const selectStudent = useCallback((id: string) => {
    setSelectedStudentId(id);
    setReview(null);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Loading state                                                    */
  /* ---------------------------------------------------------------- */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-yellow-400" />
        <span className="ml-2 text-sm text-white">Loading student data...</span>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 pb-24"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Sparkles className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">AI ILP Generator</h2>
            <p className="text-xs text-white mt-0.5">
              Auto-generate SMART targets and ILP review comments from student data
            </p>
          </div>
        </div>
      </motion.div>

      {/* Student Picker */}
      <motion.div variants={itemVariants} className="card-surface rounded-2xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500" />
        <div className="p-4 space-y-3">
          <p className="text-xs font-medium text-white uppercase tracking-wider">Select Student</p>

          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or ULN..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 touch-manipulation"
            />
          </div>

          {/* Student rows */}
          <div className="max-h-56 overflow-y-auto space-y-1.5 -mx-1 px-1">
            {filteredStudents.length === 0 && (
              <p className="text-sm text-white py-4 text-center">No students found.</p>
            )}
            {filteredStudents.map((s) => {
              const sCourse = s.course_id ? courses.find((c) => c.id === s.course_id) : null;
              const sCohort = s.cohort_id ? cohorts.find((c) => c.id === s.cohort_id) : null;
              const isSelected = s.id === selectedStudentId;
              return (
                <button
                  key={s.id}
                  onClick={() => selectStudent(s.id)}
                  className={cn(
                    'card-surface-interactive w-full flex items-center gap-3 p-3 rounded-xl text-left touch-manipulation active:scale-[0.98] transition-all',
                    isSelected && 'ring-2 ring-yellow-500/60 bg-yellow-500/5'
                  )}
                >
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 shrink-0">
                    <User className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{s.name}</p>
                    <p className="text-xs text-white truncate">
                      {sCourse?.name ?? 'No course'} {sCohort ? `- ${sCohort.name}` : ''}
                    </p>
                  </div>
                  {riskBadge(s.risk_level)}
                  <div className="p-1.5 rounded-full bg-yellow-500/10 shrink-0">
                    <ChevronRight className="h-3.5 w-3.5 text-yellow-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Empty state */}
      {!student && (
        <motion.div variants={itemVariants} className="card-surface rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-white/5 to-white/10" />
          <div className="p-8 flex flex-col items-center text-center space-y-3">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Target className="h-6 w-6 text-purple-400" />
            </div>
            <p className="text-sm font-medium text-white">No student selected</p>
            <p className="text-xs text-white max-w-xs">
              Choose a student above to view their summary and generate an AI-powered ILP review
              with SMART targets.
            </p>
          </div>
        </motion.div>
      )}

      {/* Student Summary Card */}
      {student && (
        <motion.div
          variants={itemVariants}
          className="card-surface rounded-2xl overflow-hidden"
        >
          <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500" />
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-white uppercase tracking-wider">
                Student Summary
              </p>
              {riskBadge(student.risk_level)}
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{student.name}</p>
                <p className="text-xs text-white">
                  {course?.name ?? 'No course assigned'}
                  {cohort ? ` - ${cohort.name}` : ''}
                </p>
              </div>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 gap-2">
              {/* Attendance */}
              <div className="card-surface rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs text-white">Attendance</span>
                </div>
                <p className="text-lg font-bold text-white">
                  {attendanceRate !== null ? `${attendanceRate}%` : '--'}
                </p>
                <p className="text-xs text-white">{studentAttendance.length} sessions</p>
              </div>

              {/* Grades */}
              <div className="card-surface rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-xs text-white">Grades</span>
                </div>
                <p className="text-lg font-bold text-white">
                  {studentGrades.length > 0
                    ? `${studentGrades.filter((g) => g.score !== null && g.score >= 50).length}/${studentGrades.length}`
                    : '--'}
                </p>
                <p className="text-xs text-white">units passed</p>
              </div>

              {/* EPA */}
              <div className="card-surface rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs text-white">EPA</span>
                </div>
                <p className="text-sm font-bold text-white">
                  {studentEPA?.status ?? 'Not Started'}
                </p>
                {studentEPA?.result && (
                  <p className="text-xs text-white">{studentEPA.result}</p>
                )}
              </div>

              {/* ILP Targets */}
              <div className="card-surface rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5">
                  <ClipboardList className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-xs text-white">ILP Targets</span>
                </div>
                <p className="text-lg font-bold text-white">
                  {ilpTargets.total > 0
                    ? `${ilpTargets.achieved}/${ilpTargets.total}`
                    : '--'}
                </p>
                <p className="text-xs text-white">achieved</p>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full h-12 rounded-xl bg-yellow-500 text-black font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Review...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate ILP Review with AI
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Generated Review Card */}
      <AnimatePresence>
        {review && student && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Review header */}
            <div className="card-surface rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-white uppercase tracking-wider">
                    Generated ILP Review
                  </p>
                  <span className="text-xs text-white">
                    {fmtDate(new Date(review.reviewDate))}
                  </span>
                </div>

                {/* Overall progress */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <p className="text-xs font-medium text-white uppercase tracking-wider">
                      Overall Progress
                    </p>
                  </div>
                  <p className="text-sm text-white leading-relaxed">{review.overallComment}</p>
                </div>

                {/* Strengths */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-medium text-white uppercase tracking-wider">
                      Strengths
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {review.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="text-sm text-white">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Development */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                    <p className="text-xs font-medium text-white uppercase tracking-wider">
                      Areas for Development
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {review.areasForDevelopment.map((a, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                        <span className="text-sm text-white">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* SMART Targets */}
            <div className="card-surface rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
              <div className="p-4 space-y-3">
                <p className="text-xs font-medium text-white uppercase tracking-wider">
                  SMART Targets
                </p>

                <div className="space-y-3">
                  {review.targets.map((t, i) => {
                    const col = categoryColour(t.category);
                    const IconComp =
                      t.category === 'attendance'
                        ? Calendar
                        : t.category === 'academic'
                          ? BookOpen
                          : Briefcase;
                    return (
                      <div
                        key={i}
                        className="card-surface-interactive rounded-xl overflow-hidden"
                      >
                        <div
                          className={cn(
                            'h-0.5',
                            col === 'blue' && 'bg-blue-500',
                            col === 'amber' && 'bg-amber-500',
                            col === 'emerald' && 'bg-emerald-500'
                          )}
                        />
                        <div className="p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'p-1.5 rounded-lg border',
                                col === 'blue' && 'bg-blue-500/10 border-blue-500/20',
                                col === 'amber' && 'bg-amber-500/10 border-amber-500/20',
                                col === 'emerald' && 'bg-emerald-500/10 border-emerald-500/20'
                              )}
                            >
                              <IconComp
                                className={cn(
                                  'h-3.5 w-3.5',
                                  col === 'blue' && 'text-blue-400',
                                  col === 'amber' && 'text-amber-400',
                                  col === 'emerald' && 'text-emerald-400'
                                )}
                              />
                            </div>
                            <span
                              className={cn(
                                'text-xs font-semibold px-2 py-0.5 rounded-full',
                                col === 'blue' && 'bg-blue-500/20 text-blue-400',
                                col === 'amber' && 'bg-amber-500/20 text-amber-400',
                                col === 'emerald' && 'bg-emerald-500/20 text-emerald-400'
                              )}
                            >
                              {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                            </span>
                            <span className="ml-auto text-xs text-white">
                              {fmtDate(new Date(t.targetDate))}
                            </span>
                          </div>
                          <p className="text-sm text-white leading-relaxed">{t.description}</p>
                          <div className="flex items-start gap-2 bg-white/5 rounded-lg p-2">
                            <Target className="h-3.5 w-3.5 text-yellow-400 mt-0.5 shrink-0" />
                            <p className="text-xs text-white">{t.successCriteria}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('ilpmanagement')}
                className="w-full h-12 rounded-xl bg-yellow-500 text-black font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-transform"
              >
                <Save className="h-4 w-4" />
                Save to ILP
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleRegenerate}
                  disabled={generating}
                  className="h-11 rounded-xl border border-white/20 text-white text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-60"
                >
                  <RefreshCw className={cn('h-4 w-4', generating && 'animate-spin')} />
                  Regenerate
                </button>
                <button
                  onClick={handleCopy}
                  className="h-11 rounded-xl border border-white/20 text-white text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-transform"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
