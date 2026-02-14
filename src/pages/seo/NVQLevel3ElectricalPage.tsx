import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  BookOpen,
  Brain,
  GraduationCap,
  Clock,
  Target,
  Lightbulb,
  Award,
  ClipboardCheck,
  Camera,
  Users,
  CheckCircle2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'NVQ Level 3', href: '/guides/nvq-level-3-electrical' },
];

const tocItems = [
  { id: 'what-is-nvq', label: 'What Is the NVQ Level 3?' },
  { id: 'assessment-methods', label: 'Assessment Methods' },
  { id: 'portfolio-evidence', label: 'Portfolio Evidence' },
  { id: 'practical-observations', label: 'Practical Observations' },
  { id: 'knowledge-tests', label: 'Knowledge Tests' },
  { id: 'completion-timeline', label: 'Completion Timeline' },
  { id: 'tips-for-success', label: 'Tips for Success' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The NVQ Level 3 in Electrotechnical Services is a work-based qualification — you complete it on the job, not in a classroom.',
  'Assessment is through portfolio evidence, practical observations by an assessor, professional discussions, and knowledge tests.',
  'Your portfolio needs evidence of real work you have carried out: photographs, test results, certificates, risk assessments, and reflective accounts.',
  'Most apprentices complete the NVQ in 12 to 18 months alongside their college studies, but it can take longer if evidence gathering is slow.',
  'Elec-Mate helps you prepare for NVQ knowledge tests with flashcards and mock exams, and the portfolio guide shows you exactly what evidence you need for each unit.',
];

const faqs = [
  {
    question: 'What is the difference between the NVQ Level 3 and the Diploma?',
    answer:
      'The Diploma (such as the C&G 2365 or 2357) is an academic qualification that you study for at college. It covers the theory and practical skills of electrical installation through classroom learning, workshop exercises, and written exams. The NVQ Level 3 is a work-based qualification that you complete on the job — it assesses your ability to carry out real electrical installation work in a real working environment. You need both: the Diploma provides the theoretical knowledge, and the NVQ proves you can apply that knowledge in practice. Together with the AM2 assessment, these qualifications make you eligible for the gold ECS card (Installation Electrician). The NVQ cannot be completed in a college workshop alone — it requires evidence from genuine work situations.',
  },
  {
    question: 'Can I do the NVQ Level 3 without an employer?',
    answer:
      'The NVQ Level 3 is designed as a work-based qualification, so you need to be carrying out real electrical installation work to generate the evidence. This typically means you need to be employed (or self-employed) in the electrical trade. If you are not currently employed, some training providers offer "assessment only" routes where they assess experienced workers who can demonstrate competence through their existing work. However, you cannot complete the NVQ purely through college workshop exercises — the evidence must come from real job sites. If you are an apprentice, your employer provides the work-based learning environment, and your training provider manages the NVQ assessment. If you are self-employed, you can still register with an NVQ assessment centre and submit evidence from your own jobs.',
  },
  {
    question: 'How many pieces of evidence do I need for the NVQ portfolio?',
    answer:
      'The exact number depends on the units you are being assessed against, but as a rough guide, expect to compile evidence from 10 to 20 different jobs or projects. Each unit of the NVQ requires evidence of competence in specific areas — for example, Unit 302 (Install wiring systems and associated equipment) might need evidence from 3 to 5 different installation jobs showing different wiring systems (conduit, trunking, cable tray, etc.). Quality matters more than quantity: one well-documented job that clearly demonstrates your competence is worth more than five poorly documented ones. Your assessor will tell you exactly what evidence is needed for each unit. Types of evidence include: photographs (before, during, and after), completed test results, risk assessments and method statements, reflective accounts (written descriptions of what you did and why), witness testimonies from supervisors, and copies of certificates you issued.',
  },
  {
    question: 'What happens during a practical observation?',
    answer:
      'During a practical observation, your NVQ assessor visits you on a job site and watches you carry out electrical work. The assessor is checking that you work safely, follow correct procedures, demonstrate technical competence, and meet the performance criteria for the relevant NVQ unit. A typical observation might cover: safe isolation procedure, installation of a new circuit, testing and inspection of completed work, completion of certification, and housekeeping/tidying up. The assessor will take notes and may ask you questions during or after the observation to check your understanding of what you are doing and why. Observations are not exams — the assessor is there to confirm that you can do the work competently in a real environment. If you make a minor mistake, the assessor will note it and may ask you to correct it. If you demonstrate unsafe practice, the assessor will stop the observation.',
  },
  {
    question: 'Is the NVQ Level 3 hard?',
    answer:
      'The NVQ Level 3 is not academically difficult in the way that a written exam is — it does not require you to memorise regulations or solve complex calculations under time pressure. The challenge is organisational: gathering, documenting, and organising the evidence over a period of months. Many apprentices and experienced workers find the portfolio process tedious rather than difficult. The common frustrations are: forgetting to take photographs on site, not keeping copies of test results, and procrastinating on writing reflective accounts. The knowledge tests within the NVQ are straightforward if you have already passed the 18th Edition and have a reasonable understanding of BS 7671. The practical observations are similarly straightforward if you are already competent at your job. The key to making the NVQ easy is staying organised from day one: take photos on every job, keep copies of everything, and write up your reflective accounts while the work is fresh in your mind.',
  },
  {
    question: 'Can I fail the NVQ Level 3?',
    answer:
      'The NVQ is competence-based, so technically you do not "fail" in the traditional sense. If your evidence is insufficient or your practical observation does not meet the required standard, your assessor will give you feedback and ask you to provide additional evidence or be re-observed. You keep working and gathering evidence until you meet the standard. However, there are time limits — most NVQ registrations have a maximum completion period (typically 3 to 5 years), and if you do not complete within that period, you may need to re-register and start again. In practice, the main reason people do not complete the NVQ is not failure but abandonment — they stop gathering evidence and let the registration lapse. Staying in regular contact with your assessor and submitting evidence consistently is the best way to avoid this.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ecs-card-types',
    title: 'ECS Card Types',
    description:
      'Which ECS card you can apply for at each stage, including the gold Installation Electrician card.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description:
      'Preparation guide for the AM2 practical assessment — the other requirement for the gold card.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete guide to the electrical apprenticeship pathway from start to finish.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Apprentice Portfolio Guide',
    description:
      'Detailed guidance on building your NVQ portfolio with the right types of evidence.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/18th-edition-exam-tips',
    title: '18th Edition Exam Tips',
    description: 'How to pass the C&G 2382 exam — needed alongside the NVQ for the gold card.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-study-tips',
    title: 'Study Tips for Electricians',
    description: 'Evidence-based study techniques for the knowledge tests within the NVQ.',
    icon: Brain,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-nvq',
    heading: 'What Is the NVQ Level 3 in Electrotechnical Services?',
    content: (
      <>
        <p>
          The NVQ (National Vocational Qualification) Level 3 in Electrotechnical Services is a
          work-based qualification that proves you can carry out electrical installation work
          competently in a real working environment. Unlike college-based qualifications like the
          Diploma, the NVQ is assessed entirely on the job — through evidence of real work you have
          completed.
        </p>
        <p>
          The full title is usually "NVQ Level 3 Diploma in Installing Electrotechnical Systems and
          Equipment (Buildings, Structures and the Environment)" — or the newer "NVQ Level 3 Diploma
          in Electrotechnical Services." The exact title depends on the awarding body and the
          version of the qualification, but they all serve the same purpose.
        </p>
        <p>
          The NVQ Level 3 is one of the key requirements for the{' '}
          <SEOInternalLink href="/guides/ecs-card-types">
            gold ECS card (Installation Electrician)
          </SEOInternalLink>
          . Together with the{' '}
          <SEOInternalLink href="/guides/18th-edition-exam-tips">
            18th Edition (C&G 2382)
          </SEOInternalLink>
          , the{' '}
          <SEOInternalLink href="/guides/2391-exam-tips">
            2391 (Inspection and Testing)
          </SEOInternalLink>
          , and the AM2 practical assessment, it forms the full set of qualifications that makes you
          a qualified Installation Electrician.
        </p>
        <p>
          For apprentices, the NVQ is completed alongside the college-based Diploma as part of the
          apprenticeship framework. For experienced workers without formal qualifications, the NVQ
          can be achieved through an "assessment only" route that recognises existing competence.
        </p>
      </>
    ),
  },
  {
    id: 'assessment-methods',
    heading: 'How the NVQ Is Assessed',
    content: (
      <>
        <p>
          The NVQ Level 3 uses a range of assessment methods to confirm your competence. Unlike a
          traditional exam, there is no single pass/fail test — instead, your assessor gathers
          evidence over time to build a picture of your ability.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Portfolio of Evidence</h4>
                <p className="text-white text-sm leading-relaxed">
                  A collection of documents, photographs, test results, and written accounts that
                  demonstrate your competence across the NVQ units. This is the backbone of the NVQ
                  assessment. More detail below.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Practical Observations</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your assessor visits you on site and watches you carry out electrical work. They
                  check that you work safely, follow correct procedures, and demonstrate technical
                  competence. Typically 3 to 6 observations are required across the qualification.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Discussions</h4>
                <p className="text-white text-sm leading-relaxed">
                  A structured conversation between you and your assessor about your work. The
                  assessor asks questions to check your understanding of what you do and why — not
                  just how. These are recorded and used as evidence of your knowledge and
                  understanding.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Knowledge Tests</h4>
                <p className="text-white text-sm leading-relaxed">
                  Short written tests or online assessments that check your theoretical knowledge.
                  These cover topics like{' '}
                  <SEOInternalLink href="/guides/bs-7671-run-through">
                    BS 7671 regulations
                  </SEOInternalLink>
                  , health and safety, and electrical science. The questions are typically
                  multiple-choice or short-answer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'portfolio-evidence',
    heading: 'Building Your Portfolio of Evidence',
    content: (
      <>
        <p>
          The portfolio is the single biggest task in the NVQ. It requires you to collect and
          organise evidence from your day-to-day work that proves you meet the competence standards
          for each unit. Here is what good portfolio evidence looks like:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photographs.</strong> Take photos at every stage of your work: before you
                start (the existing installation), during the work (showing your installation
                methods), and after completion (the finished job). Include photos of the consumer
                unit, cable runs, containment systems, and testing in progress. Each photo should be
                labelled with the date, location, and what it shows.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test results.</strong> Keep copies of every Schedule of Test Results, EIC,
                EICR, and Minor Works Certificate you complete or contribute to. These demonstrate
                your inspection and testing competence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk assessments and method statements.</strong> Include copies of the risk
                assessments and method statements for jobs you have worked on. If you helped prepare
                them, even better — this shows understanding of health and safety requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reflective accounts.</strong> Written descriptions of work you have carried
                out, explaining what you did, why you did it that way, what regulations applied, and
                what you would do differently next time. These show your assessor that you
                understand the work, not just that you can do it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Witness testimonies.</strong> Written statements from your supervisor,
                employer, or colleagues confirming that you carried out specific work to a competent
                standard. These provide third-party verification of your competence.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Keep your NVQ evidence organised with Elec-Mate"
          description="Elec-Mate's certificate and testing tools create a digital record of every job — test results, certificates, photographs, and observations. Export evidence directly into your NVQ portfolio. No more losing paperwork."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'practical-observations',
    heading: 'What Happens During Practical Observations',
    content: (
      <>
        <p>
          Practical observations are when your NVQ assessor comes to your workplace and watches you
          carry out electrical work. This is the most direct form of evidence — the assessor sees
          your competence first-hand.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan ahead.</strong> Coordinate with your assessor to arrange observations
                on suitable jobs. Choose jobs that demonstrate a range of skills — installation,
                testing, fault finding, different wiring systems. Avoid observations on jobs where
                you will only be doing one simple task.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work normally.</strong> The assessor wants to see how you work in real life,
                not a rehearsed performance. Work at your normal pace, follow your normal
                procedures, and demonstrate the standards you apply every day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Explain what you are doing.</strong> Talk the assessor through your work as
                you go: "I am carrying out a{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>{' '}
                before starting the dead tests." This shows understanding as well as competence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Be prepared for questions.</strong> The assessor will ask you questions
                during or after the observation — "Why did you choose that cable size?" "What
                regulation covers this requirement?" These are not trick questions — they verify
                that you understand what you are doing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'knowledge-tests',
    heading: 'NVQ Knowledge Tests',
    content: (
      <>
        <p>
          The NVQ includes knowledge tests that assess your theoretical understanding of electrical
          installation work. These are typically shorter and less formal than the C&G 2382 or 2391
          exams, but they still require preparation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Topics covered:</strong> BS 7671 regulations, health and safety legislation,
                electrical science (Ohm's law, power calculations, circuit theory), installation
                methods, inspection and testing procedures, and fault diagnosis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Format:</strong> Usually multiple-choice or short-answer questions, taken
                online or on paper at your training centre. Some centres use oral questioning as
                part of the knowledge assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preparation:</strong> If you have already passed the{' '}
                <SEOInternalLink href="/guides/18th-edition-exam-tips">
                  18th Edition exam
                </SEOInternalLink>
                , you will find the NVQ knowledge tests straightforward. Use{' '}
                <SEOInternalLink href="/guides/electrician-study-tips">
                  flashcards and practice questions
                </SEOInternalLink>{' '}
                to refresh your knowledge before each test.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The knowledge tests are not the hardest part of the NVQ — the portfolio evidence gathering
          is usually the bigger challenge. But do not take them lightly. A bit of revision before
          each test ensures you pass first time and do not need to retake.
        </p>
      </>
    ),
  },
  {
    id: 'completion-timeline',
    heading: 'How Long Does the NVQ Level 3 Take?',
    content: (
      <>
        <p>
          The NVQ Level 3 completion time varies depending on your route and how quickly you can
          gather evidence.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprentices:</strong> The NVQ is typically completed alongside the college
                Diploma over the course of the{' '}
                <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
                  apprenticeship
                </SEOInternalLink>{' '}
                (3 to 4 years total). The NVQ element itself usually takes 12 to 18 months of active
                evidence gathering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experienced workers (assessment only):</strong> If you are already a
                competent electrician and just need the formal qualification, the assessment-only
                route can be completed in 6 to 12 months. You still need to gather evidence and be
                observed, but the process is faster because you already have the competence — you
                just need to demonstrate it formally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum registration period:</strong> Most NVQ registrations have a maximum
                completion period of 3 to 5 years. If you do not complete within this period, you
                may need to re-register (and pay again). Do not let the registration lapse.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The biggest factor in completion time is how consistently you gather and submit evidence.
          Electricians who take photos and notes on every job and submit evidence to their assessor
          monthly will complete far faster than those who let it pile up and try to submit
          everything at the end. Stay on top of it from day one.
        </p>
      </>
    ),
  },
  {
    id: 'tips-for-success',
    heading: 'Tips for Completing the NVQ Successfully',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Take photos on every job.</strong> Make it a habit. Before, during, and
                after. Your phone camera is your best evidence-gathering tool. Label photos with the
                date and a brief description of what they show.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep copies of all paperwork.</strong> Every test result, certificate, risk
                assessment, and method statement. If you use Elec-Mate to produce certificates and
                test results, you already have a digital record.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Write reflective accounts while the work is fresh.</strong> Do not wait 3
                months and try to remember what you did. Write a short account within a day or two
                of completing each job — 200 to 300 words explaining what you did, which regulations
                applied, and what you learned.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stay in regular contact with your assessor.</strong> Submit evidence
                monthly, not annually. Ask for feedback early and often. Your assessor can tell you
                exactly what is missing and what is sufficient — use them as a guide.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Seek out varied work.</strong> The NVQ requires evidence of competence
                across different wiring systems, installation types, and scenarios. If your day job
                only involves one type of work (for example, new-build domestic), ask your employer
                if you can gain experience on different types of projects.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Prepare for NVQ knowledge tests with Elec-Mate"
          description="Elec-Mate's flashcards and mock exams cover the knowledge areas tested in the NVQ Level 3 — BS 7671 regulations, electrical science, health and safety, and inspection and testing. Track your progress and identify weak areas before each test."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NVQLevel3ElectricalPage() {
  return (
    <GuideTemplate
      title="NVQ Level 3 Electrical | What's Involved & How to Pass"
      description="Complete guide to the NVQ Level 3 in Electrotechnical Services. Covers assessment methods, portfolio evidence, practical observations, knowledge tests, completion timeline, and tips for success."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Qualification Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          NVQ Level 3 Electrical:{' '}
          <span className="text-yellow-400">What's Involved and How to Pass</span>
        </>
      }
      heroSubtitle="The NVQ Level 3 in Electrotechnical Services is a work-based qualification assessed through portfolio evidence, practical observations, and knowledge tests. It is one of the key requirements for the gold ECS card. This guide explains exactly what is involved and how to complete it efficiently."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the NVQ Level 3"
      relatedPages={relatedPages}
      ctaHeading="Prepare for the NVQ with Elec-Mate"
      ctaSubheading="Flashcards, mock exams, AI tutor, and structured training courses for every NVQ knowledge area. 46+ courses, progress tracking, and study planning. 7-day free trial, cancel anytime."
    />
  );
}
