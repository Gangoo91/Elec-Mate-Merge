/**
 * AIILPGeneratorSection — Generates SMART targets and ILP review comments
 * based on student attendance, grades, EPA status and current ILP data.
 */

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard } from '@/utils/clipboard';
import { cn } from '@/lib/utils';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  ListCard,
  Pill,
  EmptyState,
  LoadingState,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';

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

  if (isLoading) return <LoadingState />;

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Tools · AI ILP Generator"
          title="AI ILP generator"
          description="Auto-generate SMART targets and ILP review comments from student attendance, progress and assessment data."
          tone="yellow"
          actions={<Pill tone="yellow">AI</Pill>}
        />
      </motion.div>

      {/* Student Picker */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Step 01" title="Select a student" />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or ULN…"
            className="w-full h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-[13px] text-white placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
          />

          {filteredStudents.length === 0 ? (
            <p className="text-[12px] text-white/70 py-4 text-center">No students found.</p>
          ) : (
            <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl max-h-[280px] overflow-y-auto divide-y divide-white/[0.04]">
              {filteredStudents.map((s) => {
                const sCourse = s.course_id ? courses.find((c) => c.id === s.course_id) : null;
                const sCohort = s.cohort_id ? cohorts.find((c) => c.id === s.cohort_id) : null;
                const isSelected = s.id === selectedStudentId;
                const rTone: Tone =
                  s.risk_level?.toLowerCase() === 'high'
                    ? 'red'
                    : s.risk_level?.toLowerCase() === 'medium'
                      ? 'amber'
                      : 'green';
                return (
                  <button
                    key={s.id}
                    onClick={() => selectStudent(s.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors text-left touch-manipulation',
                      isSelected && 'bg-elec-yellow/[0.06]'
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'w-[3px] self-stretch rounded-full shrink-0',
                        isSelected ? 'bg-elec-yellow' : 'bg-transparent'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] font-medium text-white truncate">
                        {s.name}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-white/75 truncate">
                        {sCourse?.name ?? 'No course'}
                        {sCohort ? ` · ${sCohort.name}` : ''}
                      </div>
                    </div>
                    <Pill tone={rTone}>
                      {rTone === 'red'
                        ? 'High risk'
                        : rTone === 'amber'
                          ? 'Medium risk'
                          : 'Low risk'}
                    </Pill>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* No student selected */}
      {!student && (
        <motion.div variants={itemVariants}>
          <EmptyState
            title="No student selected"
            description="Choose a student above to view their summary and generate an AI-powered ILP review."
          />
        </motion.div>
      )}

      {/* Student Summary + Generate */}
      {student && (
        <motion.section variants={itemVariants} className="space-y-5">
          <SectionHeader eyebrow="Step 02" title="Review the snapshot" />

          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                  Student
                </div>
                <div className="mt-1 text-lg sm:text-xl font-semibold text-white tracking-tight truncate">
                  {student.name}
                </div>
                <div className="mt-0.5 text-[12px] text-white/75 truncate">
                  {course?.name ?? 'No course assigned'}
                  {cohort ? ` · ${cohort.name}` : ''}
                </div>
              </div>
              <Pill
                tone={
                  student.risk_level?.toLowerCase() === 'high'
                    ? 'red'
                    : student.risk_level?.toLowerCase() === 'medium'
                      ? 'amber'
                      : 'green'
                }
              >
                {student.risk_level?.toLowerCase() === 'high'
                  ? 'High risk'
                  : student.risk_level?.toLowerCase() === 'medium'
                    ? 'Medium risk'
                    : 'Low risk'}
              </Pill>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="bg-[hsl(0_0%_10%)] px-4 py-4">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                  Attendance
                </div>
                <div className="mt-2 text-2xl font-semibold tabular-nums text-white leading-none">
                  {attendanceRate !== null ? `${attendanceRate}%` : '—'}
                </div>
                <div className="mt-2 text-[11px] text-white/75 tabular-nums">
                  {studentAttendance.length} sessions
                </div>
              </div>
              <div className="bg-[hsl(0_0%_10%)] px-4 py-4">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                  Grades
                </div>
                <div className="mt-2 text-2xl font-semibold tabular-nums text-white leading-none">
                  {studentGrades.length > 0
                    ? `${studentGrades.filter((g) => g.score !== null && g.score >= 50).length}/${studentGrades.length}`
                    : '—'}
                </div>
                <div className="mt-2 text-[11px] text-white/75">units passed</div>
              </div>
              <div className="bg-[hsl(0_0%_10%)] px-4 py-4">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                  EPA
                </div>
                <div className="mt-2 text-base font-semibold text-white leading-tight">
                  {studentEPA?.status ?? 'Not Started'}
                </div>
                {studentEPA?.result && (
                  <div className="mt-2 text-[11px] text-white/75">{studentEPA.result}</div>
                )}
              </div>
              <div className="bg-[hsl(0_0%_10%)] px-4 py-4">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                  ILP Targets
                </div>
                <div className="mt-2 text-2xl font-semibold tabular-nums text-white leading-none">
                  {ilpTargets.total > 0
                    ? `${ilpTargets.achieved}/${ilpTargets.total}`
                    : '—'}
                </div>
                <div className="mt-2 text-[11px] text-white/75">achieved</div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full h-12 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {generating ? 'Generating review…' : 'Generate ILP review with AI →'}
            </button>
          </div>
        </motion.section>
      )}

      {/* Generated review */}
      <AnimatePresence>
        {review && student && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <SectionHeader
              eyebrow="Step 03"
              title="Generated review"
              action="Save to ILP"
              onAction={() => onNavigate('ilpmanagement')}
            />

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70" />
              <div className="p-5 sm:p-6 space-y-5">
                <div className="flex items-baseline justify-between">
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                    Review
                  </div>
                  <div className="text-[11px] text-white/75 tabular-nums">
                    {fmtDate(new Date(review.reviewDate))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 mb-2">
                    Overall Progress
                  </div>
                  <p className="text-[13.5px] text-white leading-relaxed">{review.overallComment}</p>
                </div>

                <div className="pt-5 border-t border-white/[0.06]">
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 mb-2">
                    Strengths
                  </div>
                  <ul className="space-y-1.5">
                    {review.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          aria-hidden
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"
                        />
                        <span className="text-[13px] text-white/80 leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-white/[0.06]">
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 mb-2">
                    Areas for development
                  </div>
                  <ul className="space-y-1.5">
                    {review.areasForDevelopment.map((a, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          aria-hidden
                          className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"
                        />
                        <span className="text-[13px] text-white/80 leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* SMART Targets */}
            <div className="space-y-3">
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                SMART targets
              </div>
              <ListCard>
                {review.targets.map((t, i) => {
                  const col = categoryColour(t.category);
                  const tTone: Tone =
                    col === 'blue' ? 'blue' : col === 'amber' ? 'amber' : 'emerald';
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 px-5 sm:px-6 py-5"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'w-[3px] self-stretch rounded-full shrink-0',
                          tTone === 'blue'
                            ? 'bg-blue-400'
                            : tTone === 'amber'
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3 flex-wrap">
                          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                            Target {i + 1}
                          </div>
                          <div className="flex items-center gap-2">
                            <Pill tone={tTone}>
                              {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                            </Pill>
                            <span className="text-[11px] text-white/75 tabular-nums">
                              {fmtDate(new Date(t.targetDate))}
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-[13.5px] text-white leading-relaxed">
                          {t.description}
                        </p>
                        <div className="mt-3 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
                          <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
                            Success criteria
                          </div>
                          <p className="mt-1 text-[12px] text-white/70 leading-relaxed">
                            {t.successCriteria}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ListCard>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={handleRegenerate}
                disabled={generating}
                className="h-11 px-5 bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white rounded-full text-[12.5px] font-medium hover:bg-[hsl(0_0%_15%)] disabled:opacity-40 transition-colors touch-manipulation"
              >
                {generating ? 'Regenerating…' : 'Regenerate'}
              </button>
              <button
                onClick={handleCopy}
                className="h-11 px-5 bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white rounded-full text-[12.5px] font-medium hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
              >
                {copied ? 'Copied ✓' : 'Copy review'}
              </button>
              <button
                onClick={() => onNavigate('ilpmanagement')}
                className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity touch-manipulation"
              >
                Save to ILP →
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </PageFrame>
  );
}
