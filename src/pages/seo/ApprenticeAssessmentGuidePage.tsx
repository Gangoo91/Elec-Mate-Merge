import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Brain,
  Target,
  Award,
  ClipboardCheck,
  FileCheck2,
  Users,
  BarChart3,
  MessageSquare,
  Sparkles,
  FolderOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Assessment Guide', href: '/guides/apprentice-assessment-guide' },
];

const tocItems = [
  { id: 'assessment-overview', label: 'Assessment Overview' },
  { id: 'on-programme-assessment', label: 'On-Programme Assessment' },
  { id: 'gateway-requirements', label: 'Gateway Requirements' },
  { id: 'epa-synoptic-project', label: 'EPA Synoptic Project' },
  { id: 'professional-discussion', label: 'Professional Discussion' },
  { id: 'grading-criteria', label: 'Grading: Pass, Merit, Distinction' },
  { id: 'how-elecmate-helps', label: 'How Elec-Mate Helps' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The electrical apprenticeship assessment has three phases: on-programme assessment, gateway, and End Point Assessment (EPA) carried out by an independent EPAO.',
  'You must pass all gateway requirements before you can attempt the EPA, including functional skills, portfolio completion, and employer sign-off.',
  'The EPA synoptic project tests your practical installation, inspection, and testing skills in a controlled environment over a set number of hours.',
  'The professional discussion is a structured interview where the assessor examines your portfolio evidence and asks questions about your knowledge, skills, and behaviours.',
  'Elec-Mate provides EPA simulators, mock exams, flashcards, and an AI tutor to help you prepare for every stage of the assessment process.',
];

const faqs = [
  {
    question: 'What is on-programme assessment and how is it different from the EPA?',
    answer:
      'On-programme assessment happens throughout your apprenticeship and is managed by your training provider (college or independent training provider). It includes regular progress reviews, skills assessments, knowledge tests, and portfolio building. The purpose is to develop your competence over time and ensure you are on track to meet the apprenticeship standard. The End Point Assessment (EPA) is different: it is a final, independent assessment carried out by an approved End Point Assessment Organisation (EPAO) at the end of the apprenticeship. The EPA confirms that you have met the full apprenticeship standard. Think of on-programme assessment as the training and development phase, and the EPA as the final exam that proves you are occupationally competent.',
  },
  {
    question: 'What happens at the gateway and who decides if I am ready?',
    answer:
      'The gateway is the checkpoint between on-programme learning and the EPA. To pass through the gateway, you must have completed all on-programme requirements, including achieving your Level 3 qualification, functional skills in maths and English (Level 2), your 18th Edition qualification (C&G 2382), and your inspection and testing qualification (C&G 2391 or equivalent). Your portfolio must be complete and mapped to the apprenticeship standard criteria. Your employer must confirm that you are occupationally competent and ready for the EPA. The gateway decision is made jointly by you, your employer, and your training provider. If any party has concerns about readiness, the gateway can be delayed. It is better to wait and be fully prepared than to rush into the EPA before you are ready.',
  },
  {
    question: 'How long does the EPA synoptic project take?',
    answer:
      'The EPA synoptic project for the Installation Electrician / Maintenance Electrician standard (ST0215) is a practical assessment carried out in a controlled environment, typically at the EPAO assessment centre. The project involves a practical installation task that tests your ability to install, inspect, and test an electrical installation to BS 7671 standards. The practical element typically takes around 6 hours, though the exact duration is set by the EPAO and specified in the assessment plan. You will be assessed on the quality of your installation, compliance with BS 7671, safe working practices, inspection and testing accuracy, and your ability to complete certification. The assessor observes your work throughout and marks against a structured criteria grid.',
  },
  {
    question: 'What questions are asked in the professional discussion?',
    answer:
      'The professional discussion is a structured interview lasting around 60 minutes, conducted by an EPAO assessor. The assessor uses your portfolio as the basis for questioning. Questions cover the knowledge, skills, and behaviours defined in the apprenticeship standard. Expect questions about: electrical science and principles you have applied on site, BS 7671 regulations relevant to your portfolio evidence, health and safety practices and how you manage risk, specific installations you have completed and the decisions you made, inspection and testing procedures and how you interpreted results, fault diagnosis and how you identified and resolved problems, communication with customers, colleagues, and supervisors, and your approach to continuing professional development. The assessor is looking for evidence of understanding, not just recall. Use real examples from your portfolio to support your answers.',
  },
  {
    question: 'What grades are available and how do I achieve a distinction?',
    answer:
      'The EPA for the Installation Electrician / Maintenance Electrician standard uses a three-tier grading system: Pass, Merit, and Distinction. To achieve a Pass, you must meet all the requirements in the assessment plan across both the synoptic project and the professional discussion. To achieve a Merit, you must demonstrate a higher level of competence, including more detailed explanations, stronger technical understanding, and better application of knowledge to practical situations. To achieve a Distinction, you must demonstrate exceptional competence across all assessment criteria. This includes explaining the rationale behind your decisions, demonstrating deep understanding of BS 7671 and its application, showing strong reflective practice, and presenting portfolio evidence that goes beyond the minimum requirements. The grade is determined by the EPAO based on the combined performance across all EPA components.',
  },
  {
    question: 'Can I retake the EPA if I fail?',
    answer:
      'Yes, you can retake the EPA if you do not pass. The EPAO will provide feedback on the areas where you did not meet the standard. You and your employer can then arrange additional training or practice in those areas before attempting the assessment again. There is typically a minimum waiting period before a retake (usually 4 to 6 weeks), and your employer and training provider must agree that you are ready for a second attempt. The retake will cover only the component or components you failed. If you passed the synoptic project but failed the professional discussion, you only need to retake the professional discussion. There is no limit on the number of retake attempts, but each attempt has a cost that is usually borne by the employer.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/epa-preparation',
    title: 'EPA Preparation Guide',
    description: 'Detailed preparation strategies for every component of the End Point Assessment.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Portfolio Building Guide',
    description: 'How to build a comprehensive portfolio that impresses the EPAO assessor.',
    icon: FolderOpen,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description: 'Practical advice for passing the AM2 practical assessment first time.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete overview of the electrical apprenticeship from start to finish.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/on-the-job-training-guide',
    title: 'On-the-Job Training Guide',
    description: 'What counts as OJT, evidence types, and how to track your progress.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/site-diary-for-apprentices',
    title: 'Site Diary Guide',
    description: 'Daily diary keeping that builds your portfolio and EPA evidence.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'assessment-overview',
    heading: 'How Apprentice Assessment Works in the UK',
    content: (
      <>
        <p>
          If you are on an electrical apprenticeship in England, your assessment follows a clear
          three-stage structure defined by the Institute for Apprenticeships and Technical Education
          (IfATE). Understanding this structure early gives you a significant advantage: you know
          exactly what you are working towards at every stage.
        </p>
        <p>The three stages are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On-programme assessment</strong> — continuous assessment throughout your
                apprenticeship, managed by your training provider. This includes skills
                observations, knowledge tests, progress reviews, and building your portfolio.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gateway</strong> — the checkpoint where you, your employer, and your
                training provider agree you are ready for the final assessment. You must have
                completed all qualifications and your portfolio before passing through the gateway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>End Point Assessment (EPA)</strong> — the final, independent assessment
                carried out by an approved EPAO. This includes a synoptic project (practical
                assessment) and a professional discussion with portfolio review.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each stage builds on the previous one. The on-programme phase develops your competence,
          the gateway confirms you are ready, and the EPA proves you have met the full{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            apprenticeship standard
          </SEOInternalLink>
          . The entire process is designed to produce electricians who are genuinely occupationally
          competent, not just able to pass a written exam.
        </p>
      </>
    ),
  },
  {
    id: 'on-programme-assessment',
    heading: 'On-Programme Assessment: Building Your Competence',
    content: (
      <>
        <p>
          On-programme assessment runs from the first day of your apprenticeship to the gateway. It
          is managed by your training provider (usually a college or independent training provider)
          in partnership with your employer. The purpose is to develop your knowledge, skills, and
          behaviours progressively over the duration of the apprenticeship.
        </p>
        <p>Key components of on-programme assessment include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Knowledge assessments</strong> — regular tests and assignments covering
                electrical science, BS 7671, health and safety, and installation design. These feed
                into your Level 3 qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skills observations</strong> — your assessor or employer watches you carry
                out practical tasks on site or in the workshop and records your competence against
                the apprenticeship standard criteria.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portfolio building</strong> — collecting evidence of your work throughout
                the apprenticeship. This includes{' '}
                <SEOInternalLink href="/guides/apprentice-portfolio-guide">
                  photos, work logs, witness testimonies, and reflective accounts
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Progress reviews</strong> — regular meetings (usually every 8 to 12 weeks)
                with your training provider and employer to review your progress, set targets, and
                address any gaps.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The on-programme phase is not just preparation for the EPA. It is assessment in its own
          right. Your training provider tracks your progress against the apprenticeship standard and
          must be satisfied that you are developing at the expected rate. If you fall behind, they
          will put additional support in place. If you are ahead, they may introduce more advanced
          work to stretch your capabilities.
        </p>
        <SEOAppBridge
          title="Track your on-programme progress with Elec-Mate"
          description="The apprentice hub includes an OJT tracker, site diary, and portfolio builder that maps your evidence to the apprenticeship standard criteria. See exactly where you stand and what you need to complete."
          icon={BarChart3}
        />
      </>
    ),
  },
  {
    id: 'gateway-requirements',
    heading: 'Gateway Requirements: What You Need Before EPA',
    content: (
      <>
        <p>
          The gateway is the formal checkpoint between on-programme learning and the End Point
          Assessment. You cannot attempt the EPA until you have passed through the gateway. This is
          not a formality; it is a genuine check that you are ready.
        </p>
        <p>
          To pass through the gateway for the Installation Electrician / Maintenance Electrician
          standard (ST0215), you must have:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 3 Electrotechnical qualification</strong> — C&G 5357 or equivalent,
                demonstrating the technical knowledge required by the standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>18th Edition qualification</strong> — C&G 2382 (IET Wiring Regulations, BS
                7671:2018+A2:2022). This is a mandatory gateway requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and testing qualification</strong> — C&G 2391 or equivalent. You
                must be able to inspect and test electrical installations to BS 7671 standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Functional skills</strong> — Level 2 in English and maths, unless you
                already hold GCSEs at grade 4 (C) or above.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completed portfolio</strong> — your portfolio must contain sufficient
                evidence mapped to the knowledge, skills, and behaviours in the apprenticeship
                standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer confirmation</strong> — your employer must sign off that you are
                occupationally competent and ready for the EPA.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The gateway meeting is attended by you, your employer (or workplace mentor), and your
          training provider. All three parties must agree that you are ready. If there is any doubt,
          the gateway is deferred until the gaps are addressed. There is no penalty for deferring
          the gateway; it is far better to be fully prepared than to attempt the EPA before you are
          ready.
        </p>
      </>
    ),
  },
  {
    id: 'epa-synoptic-project',
    heading: 'EPA Synoptic Project: The Practical Assessment',
    content: (
      <>
        <p>
          The synoptic project is the practical component of the EPA. It takes place in a controlled
          environment, usually at the EPAO's assessment centre, and tests your ability to carry out
          a realistic electrical installation task from start to finish.
        </p>
        <p>The synoptic project for ST0215 typically involves:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation work</strong> — wiring a small installation to a given
                specification, including containment, cabling, accessories, and a consumer unit or
                distribution board. The installation must comply with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and testing</strong> — carrying out the full sequence of dead and
                live tests on your installation, recording results accurately, and producing the
                correct certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — completing an Electrical Installation Certificate
                (EIC) for the work you have installed, with accurate schedule of test results and
                circuit details.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The assessor observes your work throughout the synoptic project. They are marking against
          a structured criteria grid that covers the quality of installation, compliance with
          regulations, safe working practices, accuracy of test results, and completeness of
          documentation. You are not expected to rush; you are expected to work to a professional
          standard.
        </p>
        <p>
          The synoptic project is similar to the{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">AM2 assessment</SEOInternalLink> in format,
          but it is assessed by the EPAO rather than the JIB. If you have prepared well for the AM2,
          much of the preparation carries over to the synoptic project.
        </p>
        <SEOAppBridge
          title="Practise with the EPA simulator"
          description="Elec-Mate's EPA simulator walks you through realistic synoptic project scenarios with timed tasks, marking criteria, and AI-powered feedback on your approach. Build confidence before the real assessment."
          icon={Target}
        />
      </>
    ),
  },
  {
    id: 'professional-discussion',
    heading: 'Professional Discussion: Proving Your Understanding',
    content: (
      <>
        <p>
          The professional discussion is a structured interview lasting approximately 60 minutes,
          conducted by an EPAO assessor. It is not a casual chat. The assessor uses your portfolio
          as the starting point and asks questions that probe your understanding of the knowledge,
          skills, and behaviours defined in the apprenticeship standard.
        </p>
        <p>The discussion typically covers:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Knowledge application</strong> — how you have applied electrical science, BS
                7671 regulations, and health and safety legislation in real work situations
                described in your portfolio.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skills demonstration</strong> — specific installations, inspection and
                testing work, fault finding, and safe isolation procedures you have carried out and
                documented.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Behaviours</strong> — how you have demonstrated professionalism,
                communication, teamwork, and commitment to continuing professional development
                throughout your apprenticeship.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reflective practice</strong> — what you have learned from specific
                experiences, what you would do differently, and how you plan to develop further
                after completing the apprenticeship.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key to a strong professional discussion is preparation. Review your portfolio
          thoroughly before the assessment. For every piece of evidence, be able to explain what you
          did, why you did it, what regulations applied, and what you learned. Use specific
          technical language and refer to BS 7671 regulation numbers where relevant. The assessor
          wants to see that you understand the work you documented, not just that you can describe
          it.
        </p>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio-guide">
            portfolio builder
          </SEOInternalLink>{' '}
          maps every entry to the apprenticeship standard criteria, so you know exactly which areas
          of the standard each piece of evidence covers. The{' '}
          <SEOInternalLink href="/guides/site-diary-for-apprentices">site diary</SEOInternalLink>{' '}
          captures daily records that become rich discussion points in the professional discussion.
        </p>
      </>
    ),
  },
  {
    id: 'grading-criteria',
    heading: 'Grading: Pass, Merit, and Distinction',
    content: (
      <>
        <p>
          The EPA is graded on a three-tier scale: Pass, Merit, and Distinction. The grade is
          determined by the EPAO based on your combined performance across all EPA components.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Pass</h3>
            <p className="text-white text-sm leading-relaxed">
              You have met all the requirements of the apprenticeship standard. Your practical work
              is compliant with BS 7671, your test results are accurate, your certification is
              complete, and your professional discussion demonstrates adequate understanding of the
              knowledge, skills, and behaviours.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Merit</h3>
            <p className="text-white text-sm leading-relaxed">
              You have exceeded the minimum requirements. Your practical work is of a high standard,
              your explanations in the professional discussion show deeper understanding, and your
              portfolio demonstrates breadth and depth of experience beyond the minimum.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Distinction</h3>
            <p className="text-white text-sm leading-relaxed">
              You have demonstrated exceptional competence. You can explain the rationale behind
              decisions, demonstrate deep understanding of BS 7671 and its practical application,
              show strong reflective practice, and present portfolio evidence that significantly
              exceeds the minimum requirements.
            </p>
          </div>
        </div>
        <p>
          The grade matters. A Distinction signals to employers that you are an exceptional
          apprentice. It can influence starting salaries, job offers, and career progression. While
          a Pass is perfectly valid and means you are occupationally competent, aiming for Merit or
          Distinction is worth the extra preparation effort.
        </p>
        <p>
          The difference between grades often comes down to depth of understanding. A Pass-level
          answer might state the correct regulation. A Distinction-level answer explains why that
          regulation exists, how it applies to the specific situation, and what the consequences of
          non-compliance would be.
        </p>
      </>
    ),
  },
  {
    id: 'how-elecmate-helps',
    heading: 'How Elec-Mate Prepares You for Every Assessment Stage',
    content: (
      <>
        <p>
          Elec-Mate is built specifically for electrical apprentices preparing for assessment. The
          platform covers every stage of the assessment journey, from on-programme learning to EPA
          preparation.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">46+ Structured Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cover every knowledge area in the apprenticeship standard. Electrical science, BS
                  7671, health and safety, installation design, inspection and testing, and fault
                  diagnosis. Each course is mapped to the standard criteria so you know exactly what
                  you are studying and why.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Flashcards and Mock Exams</h4>
                <p className="text-white text-sm leading-relaxed">
                  Thousands of flashcards covering BS 7671, electrical science, and the
                  apprenticeship standard. Mock exams simulate the real knowledge test format with
                  timed conditions and instant feedback on incorrect answers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EPA and AM2 Simulators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Walk through realistic synoptic project scenarios with timed tasks, marking
                  criteria, and AI-powered feedback. The{' '}
                  <SEOInternalLink href="/guides/am2-exam-tips">AM2 simulator</SEOInternalLink>{' '}
                  covers the practical assessment format used by the JIB.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FolderOpen className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Portfolio Builder and Site Diary</h4>
                <p className="text-white text-sm leading-relaxed">
                  Build your portfolio directly in the app with photo evidence, work logs, witness
                  testimonies, and reflective accounts. Every entry maps to the apprenticeship
                  standard criteria. The{' '}
                  <SEOInternalLink href="/guides/site-diary-for-apprentices">
                    site diary
                  </SEOInternalLink>{' '}
                  captures daily records that feed into your portfolio automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Tutor</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ask the AI tutor any question about electrical science, BS 7671, or the
                  apprenticeship standard. Get instant, accurate answers with regulation references.
                  Use it to prepare for the professional discussion by practising your explanations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeAssessmentGuidePage() {
  return (
    <GuideTemplate
      title="Apprentice Assessment Guide | What to Expect UK"
      description="Complete guide to electrical apprentice assessment in the UK. On-programme assessment, gateway requirements, EPA synoptic project, professional discussion, grading criteria, and how to prepare for every stage."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Apprentice Assessment Guide:{' '}
          <span className="text-yellow-400">What to Expect at Every Stage</span>
        </>
      }
      heroSubtitle="Your electrical apprenticeship assessment has three stages: on-programme assessment, gateway, and End Point Assessment. This guide explains what happens at each stage, what you need to prepare, how grading works, and how Elec-Mate helps you achieve the best possible result."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Apprentice Assessment"
      relatedPages={relatedPages}
      ctaHeading="Prepare for Every Assessment Stage"
      ctaSubheading="Join thousands of electrical apprentices using Elec-Mate to prepare for on-programme assessments, gateway, and EPA. 46+ courses, flashcards, mock exams, EPA simulator, portfolio builder, and AI tutor. 7-day free trial."
    />
  );
}
