import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  Brain,
  BookOpen,
  FileText,
  CheckCircle2,
  Users,
  BarChart3,
  ClipboardCheck,
  Target,
  Settings,
  Video,
  FolderOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/training/apprentice' },
  { label: 'College Tutor Dashboard', href: '/tools/college-tutor-dashboard' },
];

const tocItems = [
  { id: 'what-is-tutor-dashboard', label: 'What Is the College Tutor Dashboard?' },
  { id: 'student-progress', label: 'Student Progress Tracking' },
  { id: 'course-assignment', label: 'Course Assignment & Content' },
  { id: 'assessment-tools', label: 'Assessment Tools' },
  { id: 'reporting-analytics', label: 'Reporting & Analytics' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Track every student's progress across all modules, assessments, and on-the-job training hours from a single dashboard — no more spreadsheets.",
  'Assign courses, modules, and deadlines to individual students or entire groups with a few taps.',
  'Built-in assessment tools generate mock exams, track results over time, and identify which topics each student needs to focus on.',
  'Automated reporting produces progress reports for Ofsted evidence, employer updates, and EPA gateway readiness checks.',
  'Group management lets you organise students by cohort, employer, qualification level, or custom tags for efficient administration.',
];

const faqs = [
  {
    question: 'How does the dashboard track student progress?',
    answer:
      'The dashboard aggregates data from every interaction a student has with the Elec-Mate platform. This includes flashcard study sessions (cards reviewed, accuracy rates, spaced repetition progress), mock exam results (scores by topic area, improvement trends over time), site diary entries (logged OJT hours, KSB coverage), portfolio progress (evidence uploaded, KSBs evidenced, gaps remaining), and course module completion. All of this data is presented in a clear overview for each student, with colour-coded indicators showing whether they are on track, falling behind, or ahead of schedule. You can drill down into any area to see the detail — for example, viewing exactly which BS 7671 topics a student is scoring poorly on in mock exams.',
  },
  {
    question: 'Can I set different courses for different student groups?',
    answer:
      'Yes. The group management feature lets you create groups based on any criteria — cohort year, employer, qualification level, specialism, or custom tags. You can then assign courses, modules, or specific learning activities to an entire group at once. For example, you might assign the Level 2 Electrical Science module to your first-year group and the C&G 2391 revision module to your final-year group. You can also set group-wide deadlines, so all students in a group receive the same target dates for completing modules or submitting portfolio evidence. Individual students can also receive personalised assignments that override or supplement the group assignments.',
  },
  {
    question: 'What assessment tools are available for tutors?',
    answer:
      "The assessment tools include mock exam generation, formative assessment quizzes, and practical task checklists. You can generate a mock exam for any qualification (2382, 2391, 2365, or the EPA knowledge test) and assign it to individual students or groups with a deadline. Results are automatically marked and added to the student's progress record. You can also create custom quizzes on specific topics — for example, a 20-question quiz on Chapter 41 (Protection Against Electric Shock) for students who need extra practice in that area. Practical task checklists let you record observations of students completing installation and testing tasks, with marking criteria aligned to the qualification specification.",
  },
  {
    question: 'Does the dashboard produce reports for Ofsted evidence?',
    answer:
      'Yes. The reporting module generates several report types designed for different audiences. The Ofsted evidence report summarises student progress, achievement rates, and the quality of teaching and learning interventions. The employer update report shows individual student progress in a format suitable for sharing with the employer, including OJT hours logged, KSBs evidenced, and upcoming milestones. The EPA gateway report checks whether a student has met all the requirements for EPA gateway — minimum OJT hours, functional skills, portfolio completeness, and KSB coverage — and flags any gaps. All reports can be exported as PDF or CSV for inclusion in your quality assurance documentation.',
  },
  {
    question: 'Can multiple tutors access the same student groups?',
    answer:
      'Yes. The college tutor dashboard supports multiple tutor accounts with configurable access permissions. You can set up a lead tutor who has full access to all students and groups, plus additional tutors who can view and manage specific groups assigned to them. This is useful for colleges where different tutors teach different modules or manage different cohorts. All tutors can see the same student data, add notes and observations, and contribute to progress tracking. An audit trail records which tutor made each entry, maintaining accountability and transparency.',
  },
  {
    question: 'How does the dashboard integrate with existing college systems?',
    answer:
      "The Elec-Mate tutor dashboard is designed to complement existing college systems rather than replace them. Student data can be exported in standard CSV format for import into college MIS (Management Information Systems) and ILR (Individualised Learner Record) reporting. Progress data can be exported for inclusion in ProMonitor, Markbook, or similar tracking systems. The platform does not require any integration or data sharing with existing systems — it works as a standalone tool that tutors can use alongside their college's existing infrastructure. Many tutors use it as their primary day-to-day tracking tool and export summary data to the college system at key reporting points.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/apprentice-training-app',
    title: 'Apprentice Training App',
    description:
      'The student-facing app that feeds data into the tutor dashboard. Flashcards, mock exams, site diary, and portfolio builder.',
    icon: GraduationCap,
    category: 'Tool',
  },
  {
    href: '/tools/ai-tutor',
    title: 'AI Tutor',
    description:
      'AI study assistant that explains BS 7671 in plain English and generates unlimited practice questions for all major exams.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/training/epa-preparation',
    title: 'EPA Preparation',
    description:
      'Complete guide to the end-point assessment for electrical apprenticeships including knowledge test, practical, and discussion.',
    icon: Target,
    category: 'Training',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Apprentice Portfolio Guide',
    description:
      'Guidance on building a strong apprenticeship portfolio that meets KSB requirements for the EPA gateway.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/tools/learning-videos-electrician',
    title: 'Learning Videos',
    description:
      'Over 46 course videos for electrical training. Assign specific videos to students as part of their learning pathway.',
    icon: Video,
    category: 'Tool',
  },
  {
    href: '/tools/elecid-professional-card',
    title: 'ElecID Professional Card',
    description:
      'Digital ID cards for qualified electricians. Students can work towards their card as they complete qualifications.',
    icon: FileText,
    category: 'Tool',
  },
];

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Progress Tracking',
    description:
      "See every student's progress across flashcards, mock exams, OJT hours, and portfolio evidence in one dashboard. Colour-coded indicators flag students who need attention.",
  },
  {
    icon: FolderOpen,
    title: 'Course & Module Assignment',
    description:
      'Assign courses, modules, and learning activities to individual students or groups. Set deadlines and track completion rates across your entire cohort.',
  },
  {
    icon: ClipboardCheck,
    title: 'Built-In Assessment Tools',
    description:
      'Generate and assign mock exams for any qualification. Create custom quizzes on specific topics. Record practical observation marks against qualification criteria.',
  },
  {
    icon: FileText,
    title: 'Automated Reporting',
    description:
      'Generate Ofsted evidence reports, employer progress updates, and EPA gateway readiness checks. Export as PDF or CSV for integration with college systems.',
  },
  {
    icon: Users,
    title: 'Group Management',
    description:
      'Organise students by cohort, employer, qualification level, or custom tags. Assign activities and deadlines to entire groups with one action.',
  },
  {
    icon: Settings,
    title: 'Multi-Tutor Access',
    description:
      'Multiple tutor accounts with configurable permissions. Lead tutors see everything; additional tutors manage their assigned groups. Full audit trail on all entries.',
  },
];

const howToSteps = [
  {
    name: 'Add your students and create groups',
    text: "Import or manually add your students, then organise them into groups by cohort, employer, or qualification level. Set each student's target qualification and expected EPA date.",
  },
  {
    name: 'Assign courses and set deadlines',
    text: 'Select the courses and modules for each group or individual student. Set milestone deadlines for module completion, mock exam targets, and portfolio evidence submission.',
  },
  {
    name: 'Monitor progress and intervene early',
    text: 'Use the dashboard to identify students who are falling behind on study activity, mock exam scores, OJT hours, or portfolio evidence. Reach out early with targeted support.',
  },
  {
    name: 'Generate reports and evidence',
    text: "Pull automated reports for Ofsted evidence, employer updates, and EPA gateway readiness. Export data for inclusion in your college's MIS and quality assurance processes.",
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-tutor-dashboard',
    heading: 'What Is the College Tutor Dashboard?',
    content: (
      <>
        <p>
          The College Tutor Dashboard is a management platform designed for electrical training
          tutors and assessors. It gives you a complete view of every student's progress across
          their apprenticeship — study activity, mock exam results, on-the-job training hours,
          portfolio evidence, and EPA readiness — all in one place.
        </p>
        <p>
          Managing apprentice progress is traditionally fragmented across multiple systems: college
          VLEs for online learning, paper logbooks for OJT hours, separate tracking spreadsheets for
          assessment results, and manual portfolio reviews. The Elec-Mate tutor dashboard
          consolidates all of this into a single interface that updates in real time as students use
          the{' '}
          <SEOInternalLink href="/tools/apprentice-training-app">
            apprentice training app
          </SEOInternalLink>
          .
        </p>
        <p>
          The dashboard is built for the specific needs of electrical training — it understands the
          structure of Level 2 and Level 3 electrical apprenticeships, the KSBs in the
          apprenticeship standard, the module structure of City & Guilds qualifications, and the
          requirements for{' '}
          <SEOInternalLink href="/training/epa-preparation">EPA gateway</SEOInternalLink>. This
          means the progress tracking and reporting are meaningful and specific, not generic
          learning management system metrics.
        </p>
        <p>
          Whether you manage five apprentices at a small independent provider or fifty at a large FE
          college, the dashboard scales to your needs with group management, multi-tutor access, and
          automated reporting.
        </p>
      </>
    ),
  },
  {
    id: 'student-progress',
    heading: 'Student Progress Tracking',
    content: (
      <>
        <p>
          The progress tracking system aggregates every data point from the student's activity on
          the platform. When a student completes a flashcard session, sits a mock exam, logs a site
          diary entry, or uploads portfolio evidence, the data flows into the dashboard in real
          time.
        </p>
        <p>
          For each student, you can see at a glance: their overall progress percentage towards EPA
          gateway, their mock exam scores over time (with trends showing improvement or decline),
          their total OJT hours logged against the required minimum, their portfolio completion
          status showing which KSBs are evidenced and which have gaps, and their study activity
          patterns showing how often and how effectively they are revising.
        </p>
        <p>
          The dashboard uses colour-coded indicators — green for on track, amber for attention
          needed, red for at risk — so you can quickly scan your entire cohort and identify students
          who need intervention. You can drill down into any area to see the detail. For example,
          clicking on a student's mock exam results shows you their score breakdown by topic,
          revealing specific areas of weakness.
        </p>
        <p>
          This early warning system is invaluable for preventing students from falling behind. By
          the time a student fails a formal assessment, it is often too late for effective
          intervention. The dashboard lets you spot declining engagement or declining scores weeks
          in advance, giving you time to provide targeted support through the{' '}
          <SEOInternalLink href="/tools/ai-tutor">AI Tutor</SEOInternalLink> or additional
          college-based sessions.
        </p>
        <SEOAppBridge
          title="See every student's progress in real time"
          description="The tutor dashboard updates automatically as students use the app. Spot students at risk early and intervene before they fall behind."
          icon={BarChart3}
        />
      </>
    ),
  },
  {
    id: 'course-assignment',
    heading: 'Course Assignment and Content Management',
    content: (
      <>
        <p>
          The course assignment feature lets you control what each student studies and when. You can
          assign entire courses (such as the Level 3 Electrical Installation course), individual
          modules (such as Module 5: Inspection and Testing), or specific learning activities (such
          as a set of flashcards on BS 7671 Chapter 41).
        </p>
        <p>
          Assignments can be made to individual students or to entire groups. For a typical college
          setting, you might assign the same course modules to a whole cohort group, then add
          individual supplementary assignments for students who need extra support in specific
          areas.
        </p>
        <p>
          Each assignment can include a deadline, and the dashboard tracks completion against these
          deadlines. You can see which students have completed their assigned work, which are in
          progress, and which have not started. Overdue assignments are flagged automatically,
          giving you a clear action list for follow-up.
        </p>
        <p>
          The content library includes all Elec-Mate training materials —{' '}
          <SEOInternalLink href="/tools/learning-videos-electrician">
            learning videos
          </SEOInternalLink>
          , interactive modules, flashcard sets, and mock exam papers. You can also create custom
          learning activities and add them to the assignment system, tailoring the learning pathway
          to your college's specific teaching approach and timetable.
        </p>
      </>
    ),
  },
  {
    id: 'assessment-tools',
    heading: 'Assessment Tools for Electrical Training',
    content: (
      <>
        <p>
          The built-in assessment tools save tutors significant time while providing students with
          consistent, high-quality formative assessment. You can generate mock exams for any
          qualification covered by the platform — C&G 2382, 2391, 2365, and the EPA knowledge test —
          and assign them to students with a deadline and time limit.
        </p>
        <p>
          Mock exams are automatically marked when the student submits, with results immediately
          available in the dashboard. You can see the overall score, the score by topic area, the
          specific questions answered incorrectly, and the time taken. Over multiple mock exams, the
          dashboard builds a trend showing whether each student is improving, plateauing, or
          declining.
        </p>
        <p>
          Custom quizzes let you create shorter, topic-specific assessments. For example, after
          teaching a session on{' '}
          <SEOInternalLink href="/guides/earthing-arrangements">
            earthing arrangements
          </SEOInternalLink>
          , you might assign a 15-question quiz on TN-S, TN-C-S, and TT systems to check
          understanding before moving on. Results feed into the same progress tracking system.
        </p>
        <p>
          For practical assessments, the observation checklist tool lets you record marks and
          comments against the qualification criteria while watching a student work. This is
          particularly useful for the{' '}
          <SEOInternalLink href="/training/am2-exam-preparation">AM2 preparation</SEOInternalLink>{' '}
          sessions where students practise timed installation and testing tasks under supervised
          conditions.
        </p>
      </>
    ),
  },
  {
    id: 'reporting-analytics',
    heading: 'Reporting and Analytics',
    content: (
      <>
        <p>
          The reporting module produces automated reports designed for the specific audiences that
          electrical training providers need to communicate with: Ofsted inspectors, employers, EPA
          organisations, and college management.
        </p>
        <p>
          The Ofsted evidence report summarises achievement rates, student progress, the quality of
          formative assessment, and the interventions made for at-risk students. It provides the
          kind of data-driven evidence that inspectors look for when evaluating the quality of
          apprenticeship provision.
        </p>
        <p>
          Employer update reports can be generated for individual students or groups. They show the
          student's progress in a clear, non-technical format: modules completed, mock exam scores,
          OJT hours logged, and upcoming milestones. Many employers appreciate receiving regular
          updates on their apprentice's progress, and automated reports make this easy to maintain.
        </p>
        <p>
          The EPA gateway readiness report is particularly valuable. It checks whether each student
          meets all the requirements for entering EPA gateway — minimum OJT hours completed,
          functional skills achieved, portfolio evidence covering all required KSBs, mock exam
          scores above the target threshold — and produces a clear pass/not-yet-ready status for
          each requirement. This prevents students from being put forward for EPA before they are
          genuinely prepared.
        </p>
        <SEOAppBridge
          title="Generate automated progress reports"
          description="Pull Ofsted evidence reports, employer updates, and EPA gateway readiness checks with a single click. Export as PDF or CSV for your college systems."
          icon={FileText}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CollegeTutorDashboardPage() {
  return (
    <ToolTemplate
      title="College Tutor Dashboard | Electrical Training Platform"
      description="College tutor dashboard for managing electrical apprentice progress. Student tracking, course assignment, assessment tools, automated reporting, and EPA gateway readiness. Built for UK electrical training providers."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tutor Management Platform"
      badgeIcon={Users}
      heroTitle={
        <>
          College Tutor Dashboard:{' '}
          <span className="text-yellow-400">Manage Apprentice Progress</span>
        </>
      }
      heroSubtitle="Track every student's progress, assign courses, run assessments, and generate Ofsted-ready reports — all from one dashboard. Built for UK electrical training providers and FE colleges."
      heroFeaturePills={[
        { icon: BarChart3, label: 'Progress Tracking' },
        { icon: FolderOpen, label: 'Course Assignment' },
        { icon: ClipboardCheck, label: 'Assessment Tools' },
        { icon: FileText, label: 'Automated Reports' },
      ]}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="Tutor Dashboard Features"
      featuresSubheading="Everything a college tutor needs to manage electrical apprentice training. Track progress, assign work, assess students, and report to stakeholders."
      howToSteps={howToSteps}
      howToHeading="How to Use the Tutor Dashboard"
      howToDescription="Four steps from setup to automated reporting. Add students, assign work, monitor progress, and generate reports."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the Tutor Dashboard"
      relatedPages={relatedPages}
      ctaHeading="Start Managing Your Apprentices Today"
      ctaSubheading="Join UK electrical training providers using Elec-Mate to track student progress and streamline EPA preparation. 7-day free trial, cancel anytime."
      toolPath="/tools/college-tutor-dashboard"
    />
  );
}
