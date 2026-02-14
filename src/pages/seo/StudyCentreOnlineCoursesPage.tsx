import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  GraduationCap,
  BookOpen,
  PlayCircle,
  Brain,
  Trophy,
  Download,
  FileCheck2,
  Camera,
  WifiOff,
  Calculator,
  Smartphone,
  Building,
  ClipboardCheck,
  BarChart3,
  Layers,
} from 'lucide-react';

export default function StudyCentreOnlineCoursesPage() {
  return (
    <ToolTemplate
      title="Online Electrical Courses | Study Centre UK"
      description="Elec-Mate Study Centre — 46+ online electrical courses for UK electricians and apprentices. Video lessons, interactive quizzes, flashcards, mock exams, progress tracking, and offline study. Covers Level 2, Level 3, 18th Edition, 2391 Inspection and Testing, AM2 preparation, and CPD for qualified electricians."
      datePublished="2026-01-14"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Study Centre Online Courses', href: '/tools/study-centre-online-courses' },
      ]}
      tocItems={[
        { id: 'overview', label: 'Study Centre Overview' },
        { id: 'apprentice-courses', label: 'Apprentice Courses' },
        { id: 'qualified-electrician-cpd', label: 'Qualified Electrician CPD' },
        { id: 'video-lessons', label: 'Video Lessons' },
        { id: 'quizzes-assessments', label: 'Quizzes and Assessments' },
        { id: 'flashcards-revision', label: 'Flashcards and Revision' },
        { id: 'mock-exams', label: 'Mock Exams' },
        { id: 'progress-tracking', label: 'Progress Tracking' },
        { id: 'how-to', label: 'How to Get Started' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="46+ Courses"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          <span className="text-yellow-400">Online Electrical Courses</span> — Study Centre UK
        </>
      }
      heroSubtitle="46+ courses covering Level 2, Level 3, 18th Edition, 2391 Inspection and Testing, AM2 preparation, and CPD for qualified electricians. Video lessons, interactive quizzes, flashcards, mock exams, and progress tracking. Download courses for offline study. Your employer can track your progress from their dashboard."
      heroFeaturePills={[
        { icon: GraduationCap, label: '46+ Courses' },
        { icon: PlayCircle, label: 'Video Lessons' },
        { icon: Brain, label: 'Interactive Quizzes' },
        { icon: Download, label: 'Offline Study' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'The Study Centre contains 46+ courses covering apprentice training (Level 2 and Level 3), qualified electrician CPD, 18th Edition, 2391 Inspection and Testing, and AM2 preparation.',
        'Each course includes video lessons, text explanations, interactive quizzes, flashcards for revision, and mock exams that mirror real assessment formats.',
        'Courses can be downloaded for offline study — video lessons, quizzes, and flashcards all work without an internet connection.',
        'Progress tracking shows completion percentages, quiz scores, and time spent. Employer dashboards can monitor apprentice progress remotely.',
        'The Study Centre covers both the knowledge requirements and practical preparation needed for electrical qualifications, including EPA readiness for apprentices.',
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'The Complete Electrical Study Centre',
          content: (
            <>
              <p>
                The Elec-Mate Study Centre is a comprehensive learning platform for UK electricians
                at every career stage. Whether you are starting your Level 2 apprenticeship,
                preparing for your AM2 practical assessment, studying for the 2391 Inspection and
                Testing qualification, or completing CPD as a qualified electrician — the Study
                Centre has courses designed for you.
              </p>
              <p>
                The content is written and reviewed by experienced electricians and training
                providers. It covers the City and Guilds syllabus for electrical qualifications, the
                BS 7671 18th Edition wiring regulations, and the practical skills needed for
                real-world electrical work. Theory is supported by practical examples, diagrams, and
                worked calculations.
              </p>
              <p>
                All 46+ courses are included in the standard Elec-Mate subscription from
                £4.99/month. There are no per-course charges. You have unlimited access to every
                course, quiz, flashcard set, and mock exam. For employers, see the{' '}
                <SEOInternalLink href="/tools/employer-electrical-platform">
                  employer platform
                </SEOInternalLink>{' '}
                for team progress tracking.
              </p>
            </>
          ),
          appBridge: {
            title: '46+ Courses, Unlimited Access',
            description:
              'Level 2, Level 3, 18th Edition, 2391, AM2 preparation, and CPD. Video lessons, quizzes, flashcards, and mock exams. From £4.99/month with 7-day free trial.',
            icon: GraduationCap,
          },
        },
        {
          id: 'apprentice-courses',
          heading: 'Apprentice Courses — Level 2 and Level 3',
          content: (
            <>
              <p>
                The apprentice hub provides structured courses aligned to the City and Guilds Level
                2 and Level 3 Electrotechnical qualifications. Content is organised into modules
                that follow the programme structure, making it easy to study alongside college
                attendance.
              </p>
              <p>Level 2 courses cover:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Health and safety in electrical installations</li>
                <li>Electrical science fundamentals — Ohm's law, power calculations, magnetism</li>
                <li>Wiring systems and enclosures</li>
                <li>Electrical installation technology</li>
                <li>
                  <SEOInternalLink href="/guides/safe-isolation-procedure">
                    Safe isolation procedures
                  </SEOInternalLink>
                </li>
                <li>Basic circuit design principles</li>
              </ul>
              <p>Level 3 courses build on this foundation:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <SEOInternalLink href="/guides/bs7671-eighteenth-edition">
                    BS 7671 18th Edition
                  </SEOInternalLink>{' '}
                  wiring regulations
                </li>
                <li>Inspection and testing principles</li>
                <li>
                  <SEOInternalLink href="/guides/cable-sizing-guide">Cable sizing</SEOInternalLink>{' '}
                  and selection
                </li>
                <li>Fault finding and diagnosis</li>
                <li>
                  <SEOInternalLink href="/guides/earthing-arrangements">
                    Earthing arrangements
                  </SEOInternalLink>{' '}
                  (TN-S, TN-C-S, TT)
                </li>
                <li>Three-phase systems</li>
              </ul>
              <p>
                Each module includes knowledge checks, practical scenario questions, and worked
                examples. Apprentices can track their progress and see which areas need more
                revision before assessments.
              </p>
            </>
          ),
        },
        {
          id: 'qualified-electrician-cpd',
          heading: 'Qualified Electrician CPD and Upskilling',
          content: (
            <>
              <p>
                Qualified electricians need continuing professional development to maintain scheme
                registrations and stay current with regulation changes. The Study Centre provides
                CPD courses covering:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  BS 7671:2018+A3:2024 — what changed in Amendment 3, including Regulation 530.3.201
                  for bidirectional and unidirectional devices
                </li>
                <li>
                  <SEOInternalLink href="/guides/ev-charger-installation">
                    EV charger installation
                  </SEOInternalLink>{' '}
                  — circuit design, cable sizing, and certification
                </li>
                <li>
                  <SEOInternalLink href="/guides/solar-panel-installation">
                    Solar PV installation
                  </SEOInternalLink>{' '}
                  — DC circuits, inverters, and AC connection
                </li>
                <li>Battery storage systems</li>
                <li>
                  <SEOInternalLink href="/guides/spd-surge-protection">
                    Surge protection devices (SPDs)
                  </SEOInternalLink>{' '}
                  — selection, installation, and testing
                </li>
                <li>
                  <SEOInternalLink href="/guides/afdd-guide">AFDDs</SEOInternalLink> — arc fault
                  detection devices
                </li>
                <li>Commercial electrical installations</li>
                <li>BMS and building controls</li>
              </ul>
              <p>
                CPD courses are logged automatically. If your employer uses the{' '}
                <SEOInternalLink href="/tools/employer-electrical-platform">
                  employer platform
                </SEOInternalLink>
                , your completed CPD activities appear on their compliance dashboard, helping
                demonstrate that training obligations are being met.
              </p>
            </>
          ),
        },
        {
          id: 'video-lessons',
          heading: 'Video Lessons',
          content: (
            <>
              <p>
                Each course includes video lessons that explain concepts visually. Video is
                particularly effective for topics like circuit diagrams, testing procedures, wiring
                methods, and fault finding — where seeing the process is more instructive than
                reading about it.
              </p>
              <p>
                Videos are concise and focused — typically 5-15 minutes each. They are designed to
                be watched during lunch breaks, commutes, or quiet periods on site. You can pause,
                rewind, and re-watch any section. Playback speed controls let you speed through
                familiar content or slow down on new material.
              </p>
              <p>
                All video content can be downloaded for offline viewing. Once downloaded, videos
                play from local storage with no buffering and no data usage. This is ideal for
                apprentices studying on the train or electricians reviewing procedures before a job
                without relying on site Wi-Fi.
              </p>
            </>
          ),
        },
        {
          id: 'quizzes-assessments',
          heading: 'Interactive Quizzes and Assessments',
          content: (
            <>
              <p>
                Every module includes interactive quizzes that test understanding. Questions are
                varied in format:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Multiple choice — select the correct answer from 4 options</li>
                <li>True or false — quick-fire knowledge checks</li>
                <li>
                  Calculation questions — work out cable sizes, voltage drops, or fault currents
                </li>
                <li>Scenario-based questions — apply knowledge to real-world situations</li>
                <li>Drag and drop — arrange steps in the correct order (e.g. testing sequence)</li>
              </ul>
              <p>
                Quizzes provide instant feedback. Correct answers are confirmed, and incorrect
                answers include an explanation of why the right answer is correct — with a reference
                to the relevant BS 7671 regulation or course section. This feedback loop reinforces
                learning and highlights knowledge gaps.
              </p>
              <p>
                Quiz scores are tracked over time. You can see your improvement, identify topics
                where you consistently score well, and focus revision on areas where scores are
                lower. For apprentices, quiz performance feeds into the{' '}
                <SEOInternalLink href="/tools/employer-electrical-platform">
                  employer dashboard
                </SEOInternalLink>{' '}
                so training managers can monitor progress.
              </p>
            </>
          ),
          appBridge: {
            title: 'Test Your Knowledge with Interactive Quizzes',
            description:
              'Multiple choice, calculations, scenario-based questions, and drag-and-drop exercises. Instant feedback with BS 7671 references. Track your scores over time.',
            icon: ClipboardCheck,
          },
        },
        {
          id: 'flashcards-revision',
          heading: 'Flashcards for Revision',
          content: (
            <>
              <p>
                Flashcards are a proven revision technique for memorising key facts, regulation
                numbers, and technical values. The Study Centre includes flashcard sets for every
                major topic:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>BS 7671 regulation references — key regulation numbers and what they cover</li>
                <li>Maximum Zs values for common protective device types and ratings</li>
                <li>
                  Cable current-carrying capacities for common cable sizes and reference methods
                </li>
                <li>
                  Correction factors for grouping, ambient temperature, and thermal insulation
                </li>
                <li>Testing sequence steps and acceptable values</li>
                <li>Colour codes, abbreviations, and standard symbols</li>
              </ul>
              <p>
                Flashcards use a spaced repetition algorithm. Cards you get right appear less
                frequently. Cards you get wrong appear more often. This optimises revision time by
                focusing on the material you find most difficult. You can swipe through flashcards
                on your phone — the interface is designed for quick, thumb-driven interaction.
              </p>
              <p>
                Flashcard sets work fully offline, making them ideal for revision during commutes or
                waiting time on site.
              </p>
            </>
          ),
        },
        {
          id: 'mock-exams',
          heading: 'Mock Exams',
          content: (
            <>
              <p>
                The Study Centre includes mock exams that mirror real assessment formats. These are
                timed, structured, and scored to give you an accurate picture of your readiness:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold text-white">AM2 mock exam</span> — practical
                  assessment preparation with scenario-based questions covering installation,
                  inspection, testing, and fault finding. See our{' '}
                  <SEOInternalLink href="/guides/am2-exam-preparation">
                    AM2 exam preparation guide
                  </SEOInternalLink>
                  .
                </li>
                <li>
                  <span className="font-semibold text-white">18th Edition mock exam</span> — timed
                  online exam mirroring the City and Guilds 2382 format. BS 7671 open-book style
                  with regulation look-up questions.
                </li>
                <li>
                  <span className="font-semibold text-white">2391 mock exam</span> — inspection and
                  testing knowledge assessment with calculation questions, test procedure
                  sequencing, and report-writing scenarios.
                </li>
                <li>
                  <span className="font-semibold text-white">Level 2 and Level 3 mock exams</span> —
                  module-specific and end-of-programme assessments aligned to the City and Guilds
                  syllabus.
                </li>
              </ul>
              <p>
                Mock exam results include a detailed breakdown by topic, showing exactly where you
                scored well and where you need more revision. Recommended revision topics are
                suggested based on your weakest areas. You can retake mock exams as many times as
                needed — each attempt generates a different question set.
              </p>
            </>
          ),
        },
        {
          id: 'progress-tracking',
          heading: 'Progress Tracking and Reporting',
          content: (
            <>
              <p>
                Every course, quiz, flashcard session, and mock exam is tracked automatically. Your
                personal dashboard shows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Course completion percentages for each module</li>
                <li>Overall programme progress (Level 2, Level 3, or CPD pathway)</li>
                <li>Quiz score trends over time — see your improvement</li>
                <li>Flashcard mastery levels — which topics you know well and which need work</li>
                <li>Mock exam scores with topic-level breakdowns</li>
                <li>Total study time logged</li>
              </ul>
              <p>
                For apprentices, progress data syncs to the{' '}
                <SEOInternalLink href="/tools/employer-electrical-platform">
                  employer platform
                </SEOInternalLink>
                . Training managers and employers can see apprentice progress without needing to ask
                for updates. This is particularly valuable for meeting off-the-job training
                requirements and demonstrating EPA readiness.
              </p>
              <p>
                Progress data also works with Elec-Mate's{' '}
                <SEOInternalLink href="/tools/offline-electrical-app">offline mode</SEOInternalLink>
                . Study sessions completed offline are tracked locally and synced to the cloud when
                connectivity returns.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Open the Study Centre',
          text: 'Navigate to the Study Centre from the Elec-Mate main menu. Browse courses by category — apprentice, upskilling, or CPD.',
        },
        {
          name: 'Choose your course',
          text: 'Select a course from the catalogue. Each course page shows the contents, duration, and learning objectives before you start.',
        },
        {
          name: 'Study at your pace',
          text: 'Work through video lessons, text content, and interactive quizzes. Your progress saves automatically. Download content for offline study.',
        },
        {
          name: 'Revise with flashcards',
          text: 'Use flashcard sets to reinforce key facts and regulation references. Spaced repetition optimises your revision time.',
        },
        {
          name: 'Take mock exams',
          text: 'Test your readiness with timed mock exams. Review your results and focus revision on your weakest topics.',
        },
      ]}
      howToHeading="How to Use the Study Centre"
      howToDescription="Five steps from course selection to exam-ready confidence."
      features={[
        {
          icon: PlayCircle,
          title: 'Video Lessons',
          description:
            'Concise, focused video content for every topic. Downloadable for offline viewing. Adjustable playback speed.',
        },
        {
          icon: Brain,
          title: 'Interactive Quizzes',
          description:
            'Multiple choice, calculations, scenarios, and drag-and-drop. Instant feedback with BS 7671 references. Score tracking.',
        },
        {
          icon: Layers,
          title: 'Flashcards',
          description:
            'Spaced repetition flashcards for key facts, regulation numbers, and technical values. Swipeable, mobile-optimised, offline-capable.',
        },
        {
          icon: Trophy,
          title: 'Mock Exams',
          description:
            'Timed assessments mirroring real exam formats. AM2, 18th Edition, 2391, Level 2, and Level 3. Topic-level score breakdowns.',
        },
        {
          icon: BarChart3,
          title: 'Progress Tracking',
          description:
            'Course completion, quiz scores, study time, and readiness indicators. Syncs to employer dashboards for apprentices.',
        },
        {
          icon: Download,
          title: 'Offline Study',
          description:
            'Download courses for offline access. Video lessons, quizzes, and flashcards all work without an internet connection.',
        },
      ]}
      featuresHeading="Study Centre Features"
      featuresSubheading="Everything you need to learn, revise, and prepare for electrical qualifications."
      faqs={[
        {
          question: 'How many courses does the Study Centre include?',
          answer:
            'The Study Centre currently includes 46+ courses covering Level 2 and Level 3 apprentice training, 18th Edition BS 7671, 2391 Inspection and Testing, AM2 preparation, and CPD for qualified electricians. New courses are added regularly as regulations change and new topics emerge. All courses are included in the standard Elec-Mate subscription with no per-course charges.',
        },
        {
          question: 'Can I study courses offline?',
          answer:
            'Yes. All courses can be downloaded for offline study. Once downloaded, video lessons, text content, interactive quizzes, and flashcards all work without an internet connection. Your progress is tracked locally and syncs to the cloud when connectivity returns. This is ideal for studying during commutes, lunch breaks, or on site without Wi-Fi.',
        },
        {
          question: 'Do courses cover the AM2 practical assessment?',
          answer:
            'Yes. The Study Centre includes dedicated AM2 preparation courses covering installation, inspection, testing, and fault finding. Mock exams mirror the AM2 assessment format with scenario-based questions and timed exercises. See our AM2 exam preparation guide for more details on what to expect and how to prepare.',
        },
        {
          question: 'Can my employer see my progress?',
          answer:
            'Yes, if your employer uses the Elec-Mate employer platform. Your course progress, quiz scores, and study time are visible on the employer dashboard. This helps training managers monitor apprentice progress, ensure off-the-job training requirements are being met, and assess EPA readiness. You retain full control of your personal account and can also track your own progress independently.',
        },
        {
          question: 'Are the quizzes aligned to City and Guilds syllabuses?',
          answer:
            'Yes. Quiz and assessment questions are aligned to the City and Guilds syllabuses for Level 2 (2365), Level 3 (2365), 18th Edition (2382), and 2391 Inspection and Testing qualifications. Questions cover the same knowledge domains and use similar formats to the real assessments. However, the Study Centre is a supplementary learning resource — it does not replace formal City and Guilds registered centre assessments.',
        },
        {
          question: 'How do flashcards work?',
          answer:
            'Flashcards use a spaced repetition algorithm. Each card has a question on one side and the answer on the other. Cards you answer correctly appear less frequently. Cards you get wrong appear more often. This optimises revision by focusing your time on material you find most difficult. Flashcard sets cover BS 7671 regulation references, maximum Zs values, cable data, testing procedures, and more. They work fully offline.',
        },
        {
          question: 'Is there a CPD section for qualified electricians?',
          answer:
            'Yes. The upskilling hub provides CPD courses for qualified electricians covering topics like BS 7671 Amendment 3 changes, EV charger installation, solar PV, battery storage, surge protection, AFDDs, commercial installations, and building management systems. Completed CPD courses are logged automatically and appear on the employer compliance dashboard if your company uses the employer platform.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/digital-certificates-app',
          title: 'Digital Certificates App',
          description:
            'Put your training into practice with 8 certificate types and AI-powered tools.',
          icon: FileCheck2,
          category: 'Certificates',
        },
        {
          href: '/tools/employer-electrical-platform',
          title: 'Employer Platform',
          description:
            'Employers can track apprentice progress, course completion, and CPD from one dashboard.',
          icon: Building,
          category: 'Platform',
        },
        {
          href: '/tools/board-scanner',
          title: 'AI Board Scanner',
          description:
            'Learn how the board scanner works and try it yourself with a 7-day free trial.',
          icon: Camera,
          category: 'AI Tools',
        },
        {
          href: '/tools/offline-electrical-app',
          title: 'Offline Electrical App',
          description:
            'Download courses and study offline. Quizzes, flashcards, and mock exams all work without signal.',
          icon: WifiOff,
          category: 'Tools',
        },
        {
          href: '/tools/electrician-app-iphone',
          title: 'Electrician App for iPhone',
          description:
            'Study courses on your iPhone with native performance. Download for offline access.',
          icon: Smartphone,
          category: 'Tools',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'Electrical Calculators',
          description:
            '70+ calculators to apply what you learn — cable sizing, voltage drop, Zs verification, and more.',
          icon: Calculator,
          category: 'Tools',
        },
      ]}
      ctaHeading="Start studying free for 7 days"
      ctaSubheading="46+ courses, video lessons, interactive quizzes, flashcards, and mock exams. All included in your Elec-Mate subscription. Download for offline study."
      toolPath="/tools/study-centre-online-courses"
    />
  );
}
