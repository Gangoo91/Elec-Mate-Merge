import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Video,
  Brain,
  BookOpen,
  FileText,
  CheckCircle2,
  Play,
  GraduationCap,
  Target,
  ClipboardCheck,
  Wrench,
  Monitor,
  Download,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/training/apprentice' },
  { label: 'Learning Videos', href: '/tools/learning-videos-electrician' },
];

const tocItems = [
  { id: 'what-are-learning-videos', label: 'What Are the Learning Videos?' },
  { id: 'practical-demonstrations', label: 'Practical Demonstrations' },
  { id: 'theory-explanations', label: 'Theory Explanations' },
  { id: 'exam-preparation-videos', label: 'Exam Preparation Videos' },
  { id: 'course-structure', label: 'Course Structure & Progress' },
  { id: 'how-to', label: 'How to Use Them' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Over 46 structured course videos covering practical demonstrations, theory explanations, and exam preparation for electrical apprentices and qualified electricians.',
  'Practical demonstration videos show real installation, testing, and fault-finding procedures step by step — exactly as you would carry them out on site.',
  'Theory videos explain BS 7671 regulations, electrical science principles, and complex concepts like cable sizing and earth fault loop impedance in clear, visual formats.',
  'Exam preparation videos walk through past paper questions, marking schemes, and revision strategies for C&G 2382, 2391, and AM2.',
  'Organised into structured courses with progress tracking, so you work through content in a logical order and know exactly where you are in each module.',
];

const faqs = [
  {
    question: 'How many videos are included and what topics do they cover?',
    answer:
      'The library currently contains over 46 structured course videos covering the full range of electrical installation topics. These include practical demonstrations (safe isolation procedures, consumer unit installation, cable termination techniques, testing sequences, containment installation, and fault-finding methods), theory explanations (BS 7671 regulation chapters, electrical science principles, cable sizing calculations, earth fault loop impedance, discrimination, and adiabatic equations), and exam preparation (question walkthroughs for C&G 2382, 2391, and AM2, with worked answers and marking scheme explanations). The library is regularly expanded with new content covering emerging topics such as EV charger installation, solar PV, and battery storage systems.',
  },
  {
    question: 'Are the practical demonstration videos filmed on real installations?',
    answer:
      'Yes. The practical demonstration videos are filmed during real installation and testing work, showing the exact tools, techniques, and procedures used on site. This distinguishes them from animations or talking-head explanations — you see real hands on real cables, real test instruments displaying real readings, and real installations being completed from start to finish. Each video includes clear commentary explaining what is being done at each stage, why it is being done that way, and what to look out for. Close-up camera angles show critical details such as cable stripping depths, terminal connections, and instrument settings that would be difficult to see in a classroom demonstration.',
  },
  {
    question: 'Can I use the videos for C&G 2391 exam preparation?',
    answer:
      'Yes. The exam preparation section includes videos specifically designed for C&G 2391 (Inspection and Testing) revision. These videos cover the testing sequence in detail (continuity of protective conductors, continuity of ring final circuits, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD operation), the correct use of each test instrument, how to interpret results and determine pass/fail criteria, and common mistakes that lead to exam failure. Question walkthrough videos take actual past paper questions and work through the answers step by step, explaining the reasoning and the specific BS 7671 references that support each answer. This format is particularly effective because it teaches you how to approach exam questions, not just what the answers are.',
  },
  {
    question: 'Can college tutors assign videos to their students?',
    answer:
      'Yes. If your college uses the Elec-Mate College Tutor Dashboard, tutors can assign specific videos or entire video courses to individual students or groups. The dashboard tracks which students have watched each assigned video and for how long, providing engagement data alongside assessment results. This is particularly useful for flipped classroom approaches where students watch the theory video before the college session, so classroom time can be used for practical work and discussion rather than lecturing. Tutors can also use the videos as supplementary resources for students who need extra support on specific topics.',
  },
  {
    question: 'Do the videos work offline for watching on site?',
    answer:
      'Videos can be downloaded for offline viewing through the Elec-Mate mobile app. This means you can download videos while connected to Wi-Fi at home or college, then watch them on site during quiet moments — even in areas with no mobile signal. This is particularly useful for apprentices who want to revise during breaks on site, or for qualified electricians who want to refresh their knowledge on a specific procedure before carrying it out. Downloaded videos are stored securely on your device and can be managed through the app to control storage usage.',
  },
  {
    question: 'Are new videos added regularly?',
    answer:
      'Yes. New videos are added to the library regularly, with a focus on emerging topics and areas where users request additional content. Recent additions have included videos on EV charger installation procedures, solar PV system installation and testing, battery energy storage systems, and the changes introduced by BS 7671 Amendment 3:2024 (A3:2024), including the new Regulation 530.3.201 on bidirectional protective devices. The video team also responds to user feedback — if multiple users request a video on a specific topic or procedure, it is prioritised for production. All new videos are available immediately to existing subscribers at no additional cost.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/apprentice-training-app',
    title: 'Apprentice Training App',
    description:
      'Complete training platform with flashcards, mock exams, site diary, and portfolio builder. Videos integrate with your study plan.',
    icon: GraduationCap,
    category: 'Tool',
  },
  {
    href: '/tools/ai-tutor',
    title: 'AI Tutor',
    description:
      'Ask follow-up questions about anything you see in the videos. The AI Tutor explains any concept in plain English.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Structured C&G 2391 course with modules and assessments. Videos complement the written course materials.',
    icon: ClipboardCheck,
    category: 'Training',
  },
  {
    href: '/training/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description:
      'Structured AM2 preparation covering all practical tasks. Videos show the installation and testing techniques required.',
    icon: Target,
    category: 'Training',
  },
  {
    href: '/tools/college-tutor-dashboard',
    title: 'College Tutor Dashboard',
    description:
      'Assign videos to students and track viewing engagement. Perfect for flipped classroom teaching approaches.',
    icon: Monitor,
    category: 'Tool',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the 18th Edition including Amendment 3:2024. Read alongside the regulation explanation videos.',
    icon: BookOpen,
    category: 'Guide',
  },
];

const features = [
  {
    icon: Play,
    title: '46+ Structured Course Videos',
    description:
      'Over 46 professionally produced videos covering practical demonstrations, theory explanations, and exam preparation. Organised into logical courses with clear progression.',
  },
  {
    icon: Wrench,
    title: 'Practical Demonstrations',
    description:
      'Real installation and testing procedures filmed on real jobs. See actual tools, techniques, and readings — not animations or talking heads.',
  },
  {
    icon: BookOpen,
    title: 'Theory Explanations',
    description:
      'BS 7671 regulations, electrical science principles, and complex calculations explained visually. Diagrams, worked examples, and step-by-step breakdowns.',
  },
  {
    icon: Target,
    title: 'Exam Preparation',
    description:
      'Question walkthroughs for C&G 2382, 2391, and AM2. Past paper questions worked through step by step with marking scheme explanations.',
  },
  {
    icon: Download,
    title: 'Download for Offline Viewing',
    description:
      'Download videos to your device for watching on site without signal. Study during breaks in basements, plant rooms, and new builds with no Wi-Fi.',
  },
  {
    icon: Monitor,
    title: 'Progress Tracking',
    description:
      'Track which videos you have watched, your position in each course, and your overall completion. Resume from where you left off on any device.',
  },
];

const howToSteps = [
  {
    name: 'Browse or search the video library',
    text: 'Explore videos by category (practical, theory, or exam preparation), by topic (cable sizing, testing, fault-finding), or by qualification (2382, 2391, AM2). Use search to find specific procedures.',
  },
  {
    name: 'Watch and learn at your own pace',
    text: 'Play videos at your own speed. Pause, rewind, and rewatch as many times as you need. Add bookmarks to key moments you want to return to later.',
  },
  {
    name: 'Download for offline viewing',
    text: 'Download videos while connected to Wi-Fi, then watch on site without signal. Manage your downloads to control device storage.',
  },
  {
    name: 'Test your understanding',
    text: 'After watching a video, test your knowledge with linked flashcards and quiz questions. The AI Tutor can answer any follow-up questions about the content.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-are-learning-videos',
    heading: 'What Are the Learning Videos?',
    content: (
      <>
        <p>
          The Elec-Mate learning videos are a library of over 46 structured course videos covering
          the full range of electrical installation, testing, and theory topics. They are designed
          for electrical apprentices studying for their qualifications and for qualified
          electricians refreshing their knowledge or learning new skills.
        </p>
        <p>
          The videos fall into three main categories: practical demonstrations showing real
          installation and testing procedures, theory explanations covering{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 regulations
          </SEOInternalLink>{' '}
          and electrical science, and exam preparation walkthroughs for City & Guilds examinations.
          Each video is professionally produced with clear audio, multiple camera angles, and
          on-screen annotations that highlight key details.
        </p>
        <p>
          Unlike random YouTube videos of varying quality and relevance, the Elec-Mate video library
          is curated, structured, and aligned with current UK standards. Every video references{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , the IET On-Site Guide, and the relevant City & Guilds qualification specifications.
          Content is produced by qualified electricians and trainers who understand both the
          practical and academic sides of the trade.
        </p>
        <p>
          The videos integrate with other Elec-Mate tools. After watching a video on a topic, you
          can test your understanding with linked flashcards, ask the{' '}
          <SEOInternalLink href="/tools/ai-tutor">AI Tutor</SEOInternalLink> follow-up questions, or
          sit a mock exam on the same topic. This multi-modal learning approach — watching, reading,
          questioning, and testing — produces deeper understanding than any single method alone.
        </p>
      </>
    ),
  },
  {
    id: 'practical-demonstrations',
    heading: 'Practical Demonstration Videos',
    content: (
      <>
        <p>
          The practical demonstration videos are filmed during real installation and testing work,
          showing the exact procedures, tools, and techniques used on site. This is not animation or
          simulated content — you see real electricians carrying out real work with real tools on
          real installations.
        </p>
        <p>Topics covered in the practical demonstration videos include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation procedures</strong> — the complete GS38-compliant safe
                isolation sequence, including proving the voltage indicator, isolating the circuit,
                locking off, and proving dead. Filmed from the first-person perspective so you can
                see exactly what the electrician sees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit installation</strong> — from removing the old board through to
                completing the new installation, testing, and certification. Includes cable
                identification, terminal connections, labelling, and final inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing sequences</strong> — each test in the BS 7671 initial verification
                sequence demonstrated with the correct instrument, settings, connections, and result
                interpretation. Includes{' '}
                <SEOInternalLink href="/guides/how-to-test-insulation-resistance">
                  insulation resistance testing
                </SEOInternalLink>
                , earth fault loop impedance, and RCD testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable termination techniques</strong> — stripping, preparing, and
                terminating different cable types in various accessories. Close-up camera angles
                show the critical details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault-finding procedures</strong> — systematic approaches to diagnosing
                common faults including dead circuits, tripping RCDs, earth faults, and intermittent
                connections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each practical video includes clear voice-over commentary explaining what is being done,
          why it is being done that way, and what common mistakes to avoid. Multiple camera angles
          show both the overall work area and close-up details of connections, instrument readings,
          and techniques.
        </p>
        <SEOAppBridge
          title="Watch real procedures filmed on real installations"
          description="Over 46 practical demonstration videos showing installation, testing, and fault-finding procedures. Multiple camera angles and expert commentary."
          icon={Play}
        />
      </>
    ),
  },
  {
    id: 'theory-explanations',
    heading: 'Theory Explanation Videos',
    content: (
      <>
        <p>
          The theory explanation videos cover the academic knowledge that underpins practical
          electrical work. They transform complex regulations and scientific concepts into clear,
          visual explanations that are easier to understand than reading a textbook or regulation
          book.
        </p>
        <p>
          Topics include the structure and key requirements of each chapter of BS 7671, electrical
          science principles (Ohm's Law, power, energy, magnetic fields, AC theory),{' '}
          <SEOInternalLink href="/calculators/cable-sizing">
            cable sizing calculations
          </SEOInternalLink>{' '}
          using the tabulated method and the step-by-step process for selecting the correct cable,
          earth fault loop impedance and its relationship to disconnection times,{' '}
          <SEOInternalLink href="/calculators/adiabatic-equation">
            adiabatic equation
          </SEOInternalLink>{' '}
          verification of protective conductor sizing, and discrimination between protective
          devices.
        </p>
        <p>
          Each theory video uses animated diagrams, worked numerical examples, and real-world
          scenarios to make abstract concepts concrete. For example, the earth fault loop impedance
          video traces the complete fault current path through an animated circuit diagram, then
          works through a numerical example using real values from BS 7671 tables, and finally shows
          the concept being verified on a real installation using a loop impedance tester.
        </p>
        <p>
          This visual approach is particularly effective for topics that many electricians find
          difficult to grasp from text alone. Concepts like voltage drop across cable runs, the
          relationship between fault current and disconnection time, and the principles of RCD
          operation become much clearer when you can see them visualised alongside the mathematical
          relationships.
        </p>
      </>
    ),
  },
  {
    id: 'exam-preparation-videos',
    heading: 'Exam Preparation Videos',
    content: (
      <>
        <p>
          The exam preparation videos are designed for electricians preparing for City & Guilds
          examinations, particularly the{' '}
          <SEOInternalLink href="/training/18th-edition-course">C&G 2382</SEOInternalLink> (18th
          Edition),{' '}
          <SEOInternalLink href="/training/inspection-and-testing">C&G 2391</SEOInternalLink>{' '}
          (Inspection and Testing), and the{' '}
          <SEOInternalLink href="/training/am2-exam-preparation">AM2</SEOInternalLink> practical
          assessment.
        </p>
        <p>
          Question walkthrough videos take real exam-style questions and work through the answer
          step by step. For each question, the video explains how to read and interpret the
          question, which area of BS 7671 or electrical science it relates to, the logical process
          for arriving at the correct answer, the specific regulation or table reference that
          supports the answer, and why the other options (in multiple-choice questions) are
          incorrect.
        </p>
        <p>
          This is more valuable than simply memorising answers, because it teaches you how to
          approach exam questions. The 2382 exam, for example, requires you to navigate BS 7671
          quickly and accurately under time pressure. The exam preparation videos teach you the
          strategies for finding the right regulation or table efficiently, rather than searching
          randomly through the book.
        </p>
        <p>
          For the AM2 practical assessment, the videos show each task being completed within the
          allowed time, with commentary on time management strategies, marking criteria, and common
          reasons for failure. While these videos cannot replace physical practice, they ensure you
          understand exactly what is required before assessment day.
        </p>
      </>
    ),
  },
  {
    id: 'course-structure',
    heading: 'Course Structure and Progress Tracking',
    content: (
      <>
        <p>
          The videos are organised into structured courses rather than presented as a random
          library. Each course follows a logical sequence that builds knowledge progressively — you
          watch foundational videos first and advance to more complex topics as your understanding
          develops.
        </p>
        <p>
          Progress tracking shows you which videos you have watched, which courses you are currently
          working through, and how far along each course you are. You can resume from exactly where
          you left off, whether you are switching between your phone and tablet or returning after a
          break of several days.
        </p>
        <p>
          Each video has linked resources: flashcards on the same topic for reinforcement, quiz
          questions to test your understanding, and related videos that explore connected topics.
          This creates a web of learning resources around each concept, so you can approach the same
          material from multiple angles until you truly understand it.
        </p>
        <p>
          For apprentices using the{' '}
          <SEOInternalLink href="/tools/apprentice-training-app">
            apprentice training app
          </SEOInternalLink>
          , video progress feeds into the overall training dashboard. Your tutor can see which
          videos you have watched and assign specific videos as part of your learning pathway
          through the{' '}
          <SEOInternalLink href="/tools/college-tutor-dashboard">
            college tutor dashboard
          </SEOInternalLink>
          .
        </p>
        <SEOAppBridge
          title="Start watching structured video courses today"
          description="Over 46 course videos with progress tracking, linked resources, and offline downloads. Work through courses at your own pace from any device."
          icon={Video}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LearningVideosElectricianPage() {
  return (
    <ToolTemplate
      title="Learning Videos for Electricians | Video Training"
      description="Over 46 structured course videos for UK electricians. Practical demonstrations, theory explanations, and exam preparation for C&G 2382, 2391, and AM2. Download for offline viewing on site."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Video Training Library"
      badgeIcon={Video}
      heroTitle={
        <>
          Learning Videos for Electricians:{' '}
          <span className="text-yellow-400">Watch, Learn, Qualify</span>
        </>
      }
      heroSubtitle="Over 46 structured course videos covering practical demonstrations, theory explanations, and exam preparation. Real installations, real tools, real procedures. Download for offline viewing on site."
      heroFeaturePills={[
        { icon: Play, label: '46+ Course Videos' },
        { icon: Wrench, label: 'Practical Demos' },
        { icon: BookOpen, label: 'Theory Explained' },
        { icon: Target, label: 'Exam Preparation' },
      ]}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="Learning Video Features"
      featuresSubheading="Professionally produced video training for UK electricians. Practical, theory, and exam preparation — all structured into courses with progress tracking."
      howToSteps={howToSteps}
      howToHeading="How to Use the Learning Videos"
      howToDescription="Four steps from browsing to mastery. Find videos, watch at your pace, download for offline, and test your understanding."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the Learning Videos"
      relatedPages={relatedPages}
      ctaHeading="Start Learning with Video Today"
      ctaSubheading="Join hundreds of UK electricians and apprentices using Elec-Mate's video library for practical and theory training. 7-day free trial, cancel anytime."
      toolPath="/tools/learning-videos-electrician"
    />
  );
}
