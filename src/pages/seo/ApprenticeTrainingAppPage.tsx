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
  ClipboardCheck,
  Target,
  Smartphone,
  Briefcase,
  Video,
  NotebookPen,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/training/apprentice' },
  { label: 'Apprentice Training App', href: '/tools/apprentice-training-app' },
];

const tocItems = [
  { id: 'what-is-apprentice-app', label: 'What Is the Apprentice Training App?' },
  { id: 'flashcards-mock-exams', label: 'Flashcards & Mock Exams' },
  { id: 'epa-am2-simulator', label: 'EPA & AM2 Simulator' },
  { id: 'site-diary-ojt', label: 'Site Diary & OJT Tracker' },
  { id: 'portfolio-builder', label: 'Portfolio Builder' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Hundreds of flashcards covering BS 7671:2018+A3:2024, science principles, and installation practice — with spaced repetition to lock in knowledge.',
  'Full mock exams for Level 2, Level 3, 2382 (18th Edition), and 2391 (Inspection and Testing) with timed conditions and detailed mark schemes.',
  'EPA simulator that mirrors the real end-point assessment format, including synoptic projects, practical observations, and professional discussions.',
  'Site diary and on-the-job training (OJT) tracker to log hours, tasks, and evidence directly from your phone — even offline on site.',
  'Portfolio builder that organises your evidence, photographs, and reflective accounts into a submission-ready format for your training provider.',
];

const faqs = [
  {
    question: 'Which apprenticeship standards does the app support?',
    answer:
      'The Elec-Mate apprentice training app supports the Level 3 Installation Electrician and Maintenance Electrician apprenticeship standards. These are the current standards used by all training providers in England for electrical apprenticeships. The app covers the full knowledge, skills, and behaviours (KSBs) specified in the standard, mapped to the relevant City & Guilds qualifications including the 2365 (Electrical Installation), 2357 (Electrotechnical Technology), and the 2382 (18th Edition). It also covers Level 2 content for those in the early stages of their apprenticeship or studying the Level 2 Diploma in Electrical Installations.',
  },
  {
    question: 'How do the flashcards use spaced repetition?',
    answer:
      'The flashcard system uses a spaced repetition algorithm based on how well you know each card. When you answer a card correctly, it is shown to you at increasing intervals — first after one day, then three days, then a week, then a month. If you get a card wrong, it resets to the shortest interval so you see it again soon. This scientifically proven method moves knowledge from short-term to long-term memory far more effectively than simply rereading notes. The cards cover BS 7671 regulation references, cable colour codes, maximum Zs values, IP ratings, safe isolation steps, and hundreds of other essential facts that apprentices need to know for both exams and site work.',
  },
  {
    question: 'Does the mock exam feature match real City & Guilds exam conditions?',
    answer:
      'Yes. The mock exams replicate the format, timing, and difficulty of real City & Guilds examinations. For the 2382 exam (18th Edition), you get 60 multiple-choice questions in 120 minutes, matching the actual exam structure. For the 2391 (Inspection and Testing), the mock includes both the online theory test and the practical scenario questions. Each mock exam is randomly generated from a large question bank, so you get a different paper each time. After completing the mock, you receive a detailed breakdown showing your score by topic area, the correct answers with explanations, and the specific BS 7671 regulations that support each answer.',
  },
  {
    question: 'What does the EPA simulator include?',
    answer:
      'The EPA (End-Point Assessment) simulator covers all three components of the electrical apprenticeship EPA: the knowledge test, the practical observation, and the professional discussion with portfolio. For the knowledge test, it generates questions in the same format used by the EPA organisation, covering all knowledge KSBs. For the practical observation, it provides scenario walkthroughs with marking criteria so you understand exactly what the assessor is looking for. For the professional discussion, it simulates the interview format with sample questions linked to specific KSBs and guidance on structuring your answers with evidence from your portfolio. The simulator helps you understand the distinction between pass and distinction grade criteria.',
  },
  {
    question: 'Can I use the site diary offline on construction sites?',
    answer:
      'Yes. The site diary and OJT tracker work fully offline, which is essential for construction sites where mobile signal is often poor or non-existent. You can log your daily tasks, hours, materials used, tools operated, and any observations. You can attach photographs directly from your phone camera as evidence. When you return to an area with connectivity, everything syncs automatically to the cloud. Your training provider or employer can then review your logged hours and evidence without you needing to hand over a physical logbook. The app also calculates your total OJT hours towards the required minimum for your apprenticeship standard.',
  },
  {
    question: 'How does the portfolio builder help with apprenticeship evidence?',
    answer:
      'The portfolio builder organises all your apprenticeship evidence into a structured format that maps directly to the knowledge, skills, and behaviours (KSBs) in your apprenticeship standard. You can add photographs of work you have completed, written reflective accounts, copies of certificates and training records, site diary entries, and supervisor witness testimonies. The builder automatically flags any KSBs that do not yet have sufficient evidence, so you know what gaps to fill before your EPA gateway meeting. You can export the entire portfolio as a PDF or share a digital link with your training provider and EPA organisation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-tutor',
    title: 'AI Tutor',
    description:
      'Ask any BS 7671 question and get a plain-English explanation. Generate unlimited practice questions for all major exams.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/training/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description:
      'Structured preparation for the AM2 practical assessment. Installation tasks, testing procedures, and time management.',
    icon: Target,
    category: 'Training',
  },
  {
    href: '/training/epa-preparation',
    title: 'EPA Preparation',
    description:
      'Complete guide to the end-point assessment for electrical apprenticeships including knowledge test, practical, and professional discussion.',
    icon: ClipboardCheck,
    category: 'Training',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Apprentice Portfolio Guide',
    description:
      'Step-by-step guide to building an apprenticeship portfolio that meets the KSB requirements for your EPA gateway.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/tools/learning-videos-electrician',
    title: 'Learning Videos',
    description:
      'Over 46 course videos covering practical demonstrations, theory explanations, and exam preparation for apprentices.',
    icon: Video,
    category: 'Tool',
  },
  {
    href: '/tools/mental-health-hub',
    title: 'Mental Health Hub',
    description:
      'Wellbeing resources designed for tradespeople. Self-assessment tools, mindfulness exercises, and industry support contacts.',
    icon: Brain,
    category: 'Tool',
  },
];

const features = [
  {
    icon: BookOpen,
    title: 'Spaced Repetition Flashcards',
    description:
      'Hundreds of flashcards covering BS 7671 regulations, cable data, IP ratings, and essential apprentice knowledge. The algorithm schedules reviews at optimal intervals for long-term retention.',
  },
  {
    icon: ClipboardCheck,
    title: 'Timed Mock Exams',
    description:
      'Full-length mock exams for Level 2, Level 3, C&G 2382, and C&G 2391. Randomly generated from a large question bank with detailed mark schemes and regulation references.',
  },
  {
    icon: Target,
    title: 'EPA & AM2 Simulator',
    description:
      'Simulates the complete end-point assessment and AM2 format. Knowledge tests, practical scenario walkthroughs, and professional discussion preparation with sample questions.',
  },
  {
    icon: NotebookPen,
    title: 'Site Diary & OJT Tracker',
    description:
      'Log daily tasks, hours, photographs, and evidence from site. Works offline and syncs when connectivity returns. Calculates total OJT hours towards your apprenticeship target.',
  },
  {
    icon: Briefcase,
    title: 'Portfolio Builder',
    description:
      'Organise evidence against each KSB in your apprenticeship standard. Add photos, reflective accounts, certificates, and witness testimonies. Export as a submission-ready PDF.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Study flashcards, log site diary entries, and capture evidence even without mobile signal. Everything syncs automatically when you are back online.',
  },
];

const howToSteps = [
  {
    name: 'Choose your study mode',
    text: 'Select flashcards for quick revision, mock exams for timed practice, or the EPA simulator for assessment preparation. The app recommends a mode based on your upcoming milestones.',
  },
  {
    name: 'Study and track progress',
    text: 'Work through flashcards with spaced repetition, complete mock exams under timed conditions, or practise EPA questions. Your progress is tracked across all modes with topic-level breakdowns.',
  },
  {
    name: 'Log site evidence daily',
    text: 'Use the site diary to record tasks, hours, and photographs each day. The OJT tracker counts your hours and maps activities to your apprenticeship KSBs.',
  },
  {
    name: 'Build your portfolio',
    text: 'Organise your evidence into the portfolio builder. The app highlights any KSBs that need more evidence and exports everything in a format ready for your EPA gateway meeting.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-apprentice-app',
    heading: 'What Is the Apprentice Training App?',
    content: (
      <>
        <p>
          The Elec-Mate apprentice training app is a complete study and evidence management platform
          designed specifically for UK electrical apprentices. It brings together everything an
          apprentice needs — flashcards, mock exams, EPA preparation, site diary, OJT tracking, and
          portfolio building — into a single mobile app that works on site, at college, and at home.
        </p>
        <p>
          Electrical apprenticeships require a combination of classroom learning, on-the-job
          training, and formal assessment. Managing all of these elements across different systems
          (paper logbooks, college portals, separate revision apps) is time-consuming and
          disjointed. Elec-Mate consolidates everything into one platform, so your study progress,
          site evidence, and portfolio are always up to date and accessible from your phone.
        </p>
        <p>
          The app covers the full scope of the Level 3{' '}
          <SEOInternalLink href="/training/apprentice">electrical apprenticeship</SEOInternalLink>{' '}
          standard, including all knowledge, skills, and behaviours (KSBs). Content is aligned with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , the IET On-Site Guide, and the relevant City & Guilds qualification specifications.
        </p>
        <p>
          Whether you are in your first year revising basic science principles or in your final year
          preparing for your EPA gateway, the app adapts to where you are in your apprenticeship
          journey. It also connects with the{' '}
          <SEOInternalLink href="/tools/ai-tutor">AI Tutor</SEOInternalLink> for personalised
          explanations of any concept you find difficult.
        </p>
      </>
    ),
  },
  {
    id: 'flashcards-mock-exams',
    heading: 'Flashcards and Mock Exams',
    content: (
      <>
        <p>
          The flashcard system contains hundreds of cards covering every topic an electrical
          apprentice needs to know. Cards are organised by subject area — BS 7671 regulations,
          electrical science, installation practice, inspection and testing, health and safety, and
          more. Each card uses a question-and-answer format designed for active recall, which
          research shows is far more effective for retention than passive reading.
        </p>
        <p>
          The spaced repetition algorithm tracks how well you know each card and schedules reviews
          at the optimal time. Cards you find difficult appear more frequently; cards you know well
          appear at longer intervals. Over weeks and months, this builds deep, lasting knowledge of
          the essential facts you need for both exams and site work.
        </p>
        <p>
          Mock exams replicate the exact format and conditions of real{' '}
          <SEOInternalLink href="/training/18th-edition-course">
            City & Guilds examinations
          </SEOInternalLink>
          . You sit the exam under timed conditions with the same number of questions, the same
          question types, and the same difficulty level. After completing the exam, you receive a
          detailed breakdown by topic area showing where your strengths and weaknesses lie, so you
          can focus your revision on the areas that need the most work.
        </p>
        <SEOAppBridge
          title="Start revising with flashcards and mock exams"
          description="Hundreds of flashcards with spaced repetition and full-length mock exams for Level 2, Level 3, C&G 2382, and C&G 2391. Track your progress and focus on weak areas."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'epa-am2-simulator',
    heading: 'EPA and AM2 Simulator',
    content: (
      <>
        <p>
          The end-point assessment is the final hurdle of your apprenticeship, and thorough
          preparation is essential. The EPA simulator in Elec-Mate covers all three components of
          the Level 3 electrical apprenticeship EPA: the knowledge test, the practical observation,
          and the professional discussion with portfolio.
        </p>
        <p>
          For the knowledge test component, the simulator generates questions in the exact format
          used by EPA organisations. Questions are mapped to specific KSBs, so you can practise by
          topic area or take a full simulated paper. The simulator distinguishes between pass-level
          and distinction-level questions, helping you understand what is required to achieve the
          highest grade.
        </p>
        <p>
          The <SEOInternalLink href="/training/am2-exam-preparation">AM2 simulator</SEOInternalLink>{' '}
          focuses on the practical assessment, providing detailed task breakdowns, marking criteria,
          and time management guidance. While you need to physically practise installation and
          testing tasks, the simulator ensures you understand exactly what is expected before
          assessment day.
        </p>
        <p>
          For the professional discussion, the simulator provides sample questions linked to
          specific KSBs and coaching on how to structure your answers using evidence from your
          portfolio. This component is where many apprentices underperform simply because they have
          not practised articulating their knowledge and experience — the simulator gives you that
          practice.
        </p>
      </>
    ),
  },
  {
    id: 'site-diary-ojt',
    heading: 'Site Diary and On-the-Job Training Tracker',
    content: (
      <>
        <p>
          Every electrical apprentice must complete a minimum number of on-the-job training hours as
          part of their apprenticeship. Tracking these hours accurately — and linking them to the
          relevant KSBs — is a requirement for your EPA gateway meeting. The Elec-Mate site diary
          makes this simple.
        </p>
        <p>
          Each day on site, you log your tasks, the hours spent, the tools and equipment used, and
          any observations or learning points. You can attach photographs directly from your phone
          camera as evidence of the work you have carried out. The app automatically maps your
          logged activities to the relevant KSBs in your apprenticeship standard, building your
          evidence base as you work.
        </p>
        <p>
          The OJT tracker calculates your total logged hours and shows your progress towards the
          required minimum. It also highlights which KSBs have strong evidence coverage and which
          need more attention, giving you and your employer a clear picture of where you stand in
          your apprenticeship journey.
        </p>
        <p>
          Critically, the site diary works fully offline. Construction sites are notorious for poor
          mobile signal, especially in basements, plant rooms, and concrete-frame buildings. With
          Elec-Mate, you can log entries and capture photographs regardless of connectivity. When
          you return to an area with signal, everything syncs automatically.
        </p>
        <SEOAppBridge
          title="Log your site evidence today"
          description="Open the site diary, record your daily tasks and hours, and attach photographs as evidence. Everything maps to your apprenticeship KSBs and syncs to the cloud."
          icon={NotebookPen}
        />
      </>
    ),
  },
  {
    id: 'portfolio-builder',
    heading: 'Portfolio Builder for EPA Evidence',
    content: (
      <>
        <p>
          The portfolio builder is one of the most valuable features for apprentices approaching
          their EPA gateway. It takes all the evidence you have collected — site diary entries,
          photographs, reflective accounts, training certificates, supervisor witness testimonies —
          and organises it into a structured format mapped directly to your apprenticeship KSBs.
        </p>
        <p>
          The builder provides a clear dashboard showing each KSB, the evidence assigned to it, and
          a status indicator showing whether you have sufficient evidence, need more, or have a gap.
          This makes it easy to see at a glance where you need to focus your evidence collection
          before your gateway meeting.
        </p>
        <p>
          You can write reflective accounts directly in the app, guided by prompts that help you
          describe what you did, why you did it that way, what you learned, and how it relates to
          the apprenticeship standard. These reflective accounts are essential for the professional
          discussion component of your EPA, where you need to demonstrate not just what you have
          done but what you have learned from the experience.
        </p>
        <p>
          When your portfolio is complete, you can export it as a professional PDF or share a
          digital link with your training provider and EPA organisation. The{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio-guide">
            apprentice portfolio guide
          </SEOInternalLink>{' '}
          provides detailed advice on what makes strong evidence for each KSB.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeTrainingAppPage() {
  return (
    <ToolTemplate
      title="Apprentice Training App | Electrical Study Tools"
      description="Complete training app for UK electrical apprentices. Flashcards with spaced repetition, mock exams, EPA simulator, AM2 preparation, site diary, OJT tracker, and portfolio builder. Works offline on site."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Training Platform"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Apprentice Training App:{' '}
          <span className="text-yellow-400">Everything You Need to Qualify</span>
        </>
      }
      heroSubtitle="Flashcards, mock exams, EPA simulator, AM2 preparation, site diary, OJT tracker, and portfolio builder — all in one app that works offline on site. Built for UK electrical apprentices."
      heroFeaturePills={[
        { icon: BookOpen, label: 'Flashcards & Mock Exams' },
        { icon: Target, label: 'EPA & AM2 Simulator' },
        { icon: NotebookPen, label: 'Site Diary & OJT' },
        { icon: Briefcase, label: 'Portfolio Builder' },
      ]}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="Apprentice Training Features"
      featuresSubheading="Everything an electrical apprentice needs to study, track progress, and build an evidence portfolio. Aligned with BS 7671:2018+A3:2024 and current apprenticeship standards."
      howToSteps={howToSteps}
      howToHeading="How to Use the Apprentice Training App"
      howToDescription="Four steps from study to submission-ready portfolio. Study, track, evidence, and qualify."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the Apprentice Training App"
      relatedPages={relatedPages}
      ctaHeading="Start Your Apprentice Training Today"
      ctaSubheading="Join hundreds of UK electrical apprentices using Elec-Mate to revise, track OJT hours, and build their portfolio. 7-day free trial, cancel anytime."
      toolPath="/tools/apprentice-training-app"
    />
  );
}
