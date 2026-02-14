import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  Timer,
  Wrench,
  Zap,
  Search,
  CheckCircle2,
  ClipboardCheck,
  BookOpen,
  Brain,
  Cable,
  ShieldCheck,
  AlertTriangle,
  Target,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/study-centre/apprentice' },
  { label: 'AM2 Simulator', href: '/guides/am2-simulator-guide' },
];

const tocItems = [
  { id: 'what-is-am2', label: 'What Is the AM2?' },
  { id: 'am2-structure', label: 'AM2 Assessment Structure' },
  { id: 'cable-termination', label: 'Cable Termination Practice' },
  { id: 'testing-procedures', label: 'Testing Procedures' },
  { id: 'fault-diagnosis', label: 'Fault Diagnosis' },
  { id: 'timed-practice', label: 'Timed Practice Scenarios' },
  { id: 'common-fails', label: 'Common Reasons Candidates Fail' },
  { id: 'how-elecmate-helps', label: 'How Elec-Mate Helps' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The AM2 is the final practical assessment for electrical apprentices in England and Wales, administered by NET (National Electrotechnical Training) at dedicated assessment centres.',
  'Candidates must demonstrate competence in installation, inspection and testing, and fault diagnosis — all under timed conditions with no second chances on safety-critical errors.',
  'Cable termination accuracy, correct testing sequences, and methodical fault-finding are the three areas where most marks are won or lost.',
  'Practising under realistic timed conditions is the single most effective way to prepare — candidates who only practise untimed consistently underperform.',
  'Elec-Mate provides a dedicated AM2 simulator with timed scenarios, step-by-step walkthroughs, and instant feedback on testing sequences and fault diagnosis logic.',
];

const faqs = [
  {
    question: 'How long is the AM2 assessment?',
    answer:
      'The duration depends on which version you take. The standard AM2 involves approximately 8.5 hours of practical work and is typically completed in a single extended session. AM2S (for apprentices on the Installation and Maintenance standard) takes approximately 16.5 hours over 2.5 days, as it includes additional containment tasks such as steel and PVC conduit installation. AM2E (for apprentices on the Electrotechnical standard from September 2023) has a similar extended structure. All versions cover installation, inspection and testing, and fault diagnosis. Time management is critical — the assessors will not extend the clock if you fall behind. Candidates who finish early should use the remaining time to double-check their work, verify connections, and review their test results before submitting.',
  },
  {
    question: 'What happens if I fail the AM2?',
    answer:
      'If you fail the AM2, you can rebook and retake it. There is no limit on the number of attempts, but each attempt requires the full fee (£885 for the standard AM2, or £965 for AM2S/AM2E — fees from April 2026) and you will need to wait for an available slot. Your assessor will provide feedback on the areas where you did not meet the standard, and you should focus your revision on those specific areas before rebooking. Many training providers offer AM2 preparation courses that include mock assessments on realistic rigs — these are well worth the investment if you have failed previously. Common reasons for failure include poor cable termination quality, incorrect testing sequences, failure to identify all faults in the fault diagnosis exercise, and running out of time.',
  },
  {
    question: 'What tools do I need to bring to the AM2?',
    answer:
      'You must bring your own hand tools and test instruments. The minimum toolkit includes: side cutters, long-nose pliers, cable strippers, a range of screwdrivers (flat and Phillips, insulated to VDE standard), a junior hacksaw, a tape measure, a spirit level, a multi-function tester (calibrated and in date), a low-resistance ohmmeter (or combined instrument), an approved voltage indicator (GS38 compliant), a proving unit, and appropriate PPE including safety boots and safety glasses. The assessment centre provides the materials (cables, accessories, distribution boards, and the fault diagnosis rig) but not the tools. Check your test instruments are calibrated and that you have fresh batteries. Turning up with a flat battery in your multi-function tester is an avoidable disaster.',
  },
  {
    question: 'Can I use Elec-Mate during the AM2 assessment?',
    answer:
      'No. The AM2 is a practical assessment conducted under controlled conditions at a NET assessment centre. You cannot use mobile phones, apps, or reference materials during the assessment. The purpose of Elec-Mate AM2 simulator is to help you prepare before the assessment — practising timed scenarios, learning the correct testing sequences, and developing your fault diagnosis methodology so that the knowledge is in your head on the day. Think of it like a driving test: you cannot use a satnav during the test, but practising routes beforehand makes you a better driver.',
  },
  {
    question: 'Is the AM2 the same as the EPA?',
    answer:
      'No, they are different assessments, though both are required to complete an electrical apprenticeship. The AM2 (Assessment of Competence) is the practical skills assessment — it tests your ability to install, inspect, test, and fault-find on a real electrical installation. The EPA (End-Point Assessment) covers the broader apprenticeship standard including knowledge, skills, and behaviours — it typically includes a knowledge test, a practical observation, and a professional discussion. You need to pass both to achieve your apprenticeship. The AM2 focuses purely on hands-on competence; the EPA is wider in scope. Elec-Mate has separate preparation tools for both the AM2 and the EPA.',
  },
  {
    question: 'How should I revise for the fault diagnosis section?',
    answer:
      'Fault diagnosis is the section that catches most candidates off guard because it requires a systematic approach rather than memorised answers. The key is to develop a consistent methodology: start by gathering information (what is the reported fault, what circuit is affected), then carry out safe isolation, then use logical half-split testing to narrow down the fault location. Common AM2 faults include open circuits (broken conductors), short circuits (line to neutral or line to earth), reversed polarity, incorrect connections at accessories, and missing earth continuity. Practise on as many different fault scenarios as possible so that your diagnostic process becomes second nature. Elec-Mate AM2 simulator includes a dedicated fault diagnosis module with 30+ realistic scenarios that teach you to work through the half-split method systematically.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description:
      'Practical tips and strategies from candidates who have passed the AM2 assessment first time.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/epa-preparation',
    title: 'EPA Preparation Guide',
    description: 'Complete guide to the End-Point Assessment for electrical apprentices.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-flashcards-tool',
    title: 'Apprentice Flashcards Tool',
    description:
      'Active recall flashcards covering every key topic area for apprentice electricians.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Step-by-step safe isolation procedure following GS38 and best practice.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order of electrical tests as required by BS 7671 and the AM2.',
    icon: CheckCircle2,
    category: 'Guide',
  },
  {
    href: '/guides/level-3-electrical',
    title: 'Level 3 Electrical Course',
    description: 'Study for Level 3 NVQ with structured course content on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-am2',
    heading: 'What Is the AM2 Assessment?',
    content: (
      <>
        <p>
          The AM2 (Assessment of Competence) is the final practical assessment that electrical
          apprentices in England and Wales must pass to demonstrate occupational competence. It is
          administered by <strong>NET (National Electrotechnical Training)</strong> and takes place
          at dedicated assessment centres across the UK.
        </p>
        <p>
          The AM2 tests your ability to carry out real electrical work — installing circuits,
          terminating cables, inspecting and testing a completed installation, and diagnosing faults
          — all under timed, assessed conditions. It is not a written exam. It is a hands-on,
          practical demonstration that you can do the job safely and competently.
        </p>
        <p>
          Passing the AM2 is a requirement for completing the{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            Level 3 Electrotechnical Apprenticeship
          </SEOInternalLink>{' '}
          and is a prerequisite for applying to a competent person scheme such as NICEIC, NAPIT, or
          ELECSA. Without it, you cannot self-certify notifiable work under Part P of the Building
          Regulations.
        </p>
        <p>
          The assessment is rigorous. Pass rates vary, but a significant number of candidates fail
          on their first attempt — most commonly due to poor time management, incorrect testing
          sequences, or incomplete fault diagnosis. This is why structured preparation using
          realistic practice scenarios is so important.
        </p>
      </>
    ),
  },
  {
    id: 'am2-structure',
    heading: 'AM2 Assessment Structure: What to Expect',
    content: (
      <>
        <p>
          The AM2 is split into three assessed components. The standard AM2 involves approximately
          8.5 hours of practical work. AM2S (for apprentices on the Installation and Maintenance
          standard) takes approximately 16.5 hours over 2.5 days, as it includes additional
          containment tasks such as steel and PVC conduit installation. The components are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation</strong> — You are given a specification and must build a
                working electrical installation from scratch. This includes mounting a consumer
                unit, running cables to specified routes, terminating at accessories (sockets,
                switches, light fittings), and ensuring the installation is mechanically sound and
                electrically correct. The installation must comply with BS 7671 and the given design
                specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and Testing</strong> — You inspect and test the installation you
                built. This includes visual inspection, dead testing (continuity of protective
                conductors, continuity of ring final circuit conductors, insulation resistance), and
                live testing (polarity, earth fault loop impedance, prospective fault current, RCD
                operation). You must record all results on the correct test forms and determine
                whether the installation is satisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault Diagnosis</strong> — You are presented with a pre-wired rig that has
                deliberate faults introduced. You must use a systematic approach to identify each
                fault, diagnose the cause, and state the required remedial action. The faults are
                realistic: open circuits, short circuits, reversed polarity, missing earths,
                incorrect connections. You are assessed on your method as much as your answers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each component is separately assessed, and you must demonstrate competence in all three to
          pass. A serious safety error — such as working on a live circuit, failing to prove dead
          before working, or leaving a dangerous installation — is an automatic fail regardless of
          your performance in the other areas.
        </p>
      </>
    ),
  },
  {
    id: 'cable-termination',
    heading: 'Cable Termination: Where Marks Are Won and Lost',
    content: (
      <>
        <p>
          Cable termination quality is one of the most heavily assessed aspects of the AM2
          installation task. Assessors look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct conductor length</strong> — enough slack for a neat termination, but
                not so much that conductors are bunched or stressed. Strip the insulation to the
                correct length for the terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clean stripping</strong> — no nicked conductors, no damaged insulation. Use
                proper cable strippers, not side cutters or a knife.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tight terminations</strong> — conductors fully inserted into terminals,
                terminal screws tightened firmly (but not over-torqued). No exposed copper visible
                outside the terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct colour identification</strong> — brown (line), blue (neutral), green
                and yellow (earth). Sleeving applied to earth conductors in twin-and-earth cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection</strong> — cable secured with clips at correct
                intervals, grommets fitted where cables enter metal enclosures, no sharp bends.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Poor termination is one of the top reasons candidates fail the installation component. The
          fix is simple: practise repeatedly until it is second nature. Set up a practice board at
          home or in college and terminate 50 cables before the assessment. Speed and quality will
          come with repetition.
        </p>
      </>
    ),
  },
  {
    id: 'testing-procedures',
    heading: 'Testing Procedures: The Correct Sequence',
    content: (
      <>
        <p>
          The inspection and testing component requires you to carry out tests in the correct
          sequence as specified by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> and{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            Guidance Note 3 (GN3)
          </SEOInternalLink>
          . The sequence matters — carrying out tests in the wrong order can give misleading results
          and will lose you marks.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Visual inspection</strong> — before any testing, inspect the installation for
              obvious defects: correct cable sizes, secure fixings, proper labelling, no damage.
            </li>
            <li>
              <strong>Continuity of protective conductors</strong> — test earth continuity on every
              circuit using a low-resistance ohmmeter. Record R1+R2 values.
            </li>
            <li>
              <strong>Continuity of ring final circuit conductors</strong> — for ring circuits,
              carry out the three-step ring continuity test (end-to-end readings for L, N, and CPC,
              then cross-connect and test at each socket).
            </li>
            <li>
              <strong>Insulation resistance</strong> — test between live conductors and earth at
              500V DC. The minimum acceptable value is 1 M-ohm, but you should expect readings of
              200 M-ohm or higher on a new installation.
            </li>
            <li>
              <strong>Polarity</strong> — confirm correct polarity at every point, including the
              consumer unit, switches, and socket outlets.
            </li>
            <li>
              <strong>Earth fault loop impedance (Zs)</strong> — measure at the furthest point of
              each circuit and confirm the value is within the maximum permitted by BS 7671 for the
              protective device fitted.
            </li>
            <li>
              <strong>Prospective fault current (PFC)</strong> — measure at the origin of the
              installation. Confirm the PFC does not exceed the rated breaking capacity of the
              protective devices.
            </li>
            <li>
              <strong>RCD operation</strong> — test all RCDs at 1x and 5x rated residual current.
              Record trip times.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Practise the testing sequence until it is automatic"
          description="The Elec-Mate AM2 simulator walks you through every test in the correct BS 7671 sequence. Enter your readings, get instant feedback on whether each result passes, and learn why the order matters."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'fault-diagnosis',
    heading: 'Fault Diagnosis: Systematic Method Wins',
    content: (
      <>
        <p>
          The fault diagnosis exercise is where many candidates come unstuck. Unlike the
          installation and testing components, fault diagnosis cannot be memorised — you must apply
          a systematic method to an unfamiliar scenario under time pressure.
        </p>
        <p>The recommended approach follows the half-split method:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Gather information</strong> — read the fault report. What symptoms are
              described? Which circuit is affected? What works and what does not?
            </li>
            <li>
              <strong>Safe isolation</strong> — isolate the circuit using the{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation procedure
              </SEOInternalLink>
              . Lock off, prove dead, prove the voltage indicator.
            </li>
            <li>
              <strong>Visual inspection</strong> — look for obvious faults before reaching for test
              instruments. Loose connections, damaged cables, signs of overheating.
            </li>
            <li>
              <strong>Systematic testing</strong> — use continuity, insulation resistance, and
              polarity tests to narrow down the fault location. Start at the midpoint of the circuit
              (half-split) to determine which half contains the fault, then repeat to narrow
              further.
            </li>
            <li>
              <strong>Identify and record</strong> — state the fault, its location, the cause, and
              the remedial action required. Be specific: "Open circuit on CPC between JB3 and socket
              4 — broken conductor at terminal — re-terminate."
            </li>
          </ol>
        </div>
        <p>
          The assessors are watching your process as much as your results. A candidate who follows a
          logical, safe method but does not identify every fault will score better than a candidate
          who guesses correctly but cannot explain their reasoning.
        </p>
        <p>
          Common AM2 fault types include: open circuit on line, neutral, or CPC; short circuit
          between line and neutral or line and earth; reversed polarity at accessories;
          cross-polarity in a two-way switching circuit; missing earth sleeving causing an earth
          fault; and incorrect connections at junction boxes.
        </p>
      </>
    ),
  },
  {
    id: 'timed-practice',
    heading: 'Timed Practice Scenarios: Why They Matter',
    content: (
      <>
        <p>
          Time management is a leading cause of AM2 failure. Candidates who practise only in untimed
          conditions consistently underperform in the assessment because they have never experienced
          the pressure of the clock.
        </p>
        <p>
          The AM2 is deliberately time-pressured. The installation task gives you enough time to
          complete the work if you are efficient, but no spare time to recover from significant
          mistakes. The testing and fault diagnosis tasks are similarly tight. If you spend too long
          on one area, you will run out of time on another.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <Timer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Effective timed practice strategy</h4>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>Start by doing each task untimed to build accuracy and confidence.</li>
                <li>
                  Once you can do it correctly, add time pressure: set a timer 20% longer than the
                  AM2 allocation and work to beat it.
                </li>
                <li>
                  Gradually reduce the timer until you can complete the task within the AM2 time
                  with 10-15% to spare for checking.
                </li>
                <li>
                  Practise with distractions — the assessment centre is not silent, and working
                  under pressure with others around you is a skill in itself.
                </li>
                <li>Record your times for each practice session to track your improvement.</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          The Elec-Mate AM2 simulator includes built-in timers that match the actual assessment
          allocations. You can practise individual components (installation, testing, fault
          diagnosis) or run a full mock assessment with realistic time pressure.
        </p>
      </>
    ),
  },
  {
    id: 'common-fails',
    heading: 'Common Reasons Candidates Fail the AM2',
    content: (
      <>
        <p>
          Understanding why candidates fail helps you avoid the same mistakes. The most common
          reasons for AM2 failure are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety-critical errors</strong> — failing to prove dead before working,
                working on a live circuit, leaving an unsafe installation. These are automatic fails
                regardless of your score in other areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Running out of time</strong> — spending too long on cable runs and not
                finishing the terminations, or spending too long on fault diagnosis and rushing
                through the testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect testing sequence</strong> — carrying out tests in the wrong order,
                which produces unreliable results and shows the assessor that you do not understand
                the rationale behind the sequence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor cable termination</strong> — loose connections, damaged insulation,
                missing earth sleeving, exposed copper. These lose marks and can also cause test
                failures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incomplete fault diagnosis</strong> — finding one fault but missing others,
                or correctly identifying a fault but failing to state the remedial action.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Every one of these failure points is avoidable with sufficient practice. The candidates
          who pass first time are not necessarily the most talented — they are the ones who
          practised the most and developed reliable, repeatable methods for each component.
        </p>
      </>
    ),
  },
  {
    id: 'how-elecmate-helps',
    heading: 'How Elec-Mate AM2 Simulator Prepares You',
    content: (
      <>
        <p>
          Elec-Mate includes a dedicated AM2 preparation module designed to simulate the assessment
          experience as closely as possible on your phone. Here is what it covers:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Timer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Timed Practice Scenarios</h4>
                <p className="text-white text-sm leading-relaxed">
                  Realistic timed exercises for installation planning, testing sequences, and fault
                  diagnosis. The timer matches the actual AM2 allocations so you build the right
                  pace from the start.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fault Diagnosis Trainer</h4>
                <p className="text-white text-sm leading-relaxed">
                  30+ fault scenarios with guided half-split methodology. Each scenario presents a
                  fault report, and you work through the diagnostic process step by step. Instant
                  feedback shows you where your logic was correct and where you went wrong.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Testing Sequence Walkthrough</h4>
                <p className="text-white text-sm leading-relaxed">
                  Interactive walkthrough of the complete BS 7671 testing sequence. Enter your
                  readings and get immediate validation — pass, fail, or borderline — with
                  explanations of the maximum permitted values and the regulations behind them.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Revision Assistant</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ask the AI any question about the AM2, BS 7671 testing requirements, or fault
                  diagnosis methods. Get clear, regulation-referenced answers that help you
                  understand the why, not just the what.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start practising for the AM2 today"
          description="Join hundreds of apprentices using Elec-Mate to prepare for the AM2 assessment. Timed scenarios, fault diagnosis trainer, testing sequence walkthroughs, and AI revision support. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AM2SimulatorGuidePage() {
  return (
    <GuideTemplate
      title="AM2 Simulator | Practice Assessment Tool"
      description="Prepare for the AM2 practical assessment with timed practice scenarios, cable termination guides, testing procedure walkthroughs, and fault diagnosis training. Free 7-day trial on Elec-Mate."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Tool"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          AM2 Simulator:{' '}
          <span className="text-yellow-400">
            Practice Assessment Tool for Apprentice Electricians
          </span>
        </>
      }
      heroSubtitle="The AM2 is the final practical hurdle of your electrical apprenticeship. It tests installation, inspection and testing, and fault diagnosis — all under timed conditions. This guide covers what the AM2 involves and how to practise effectively using Elec-Mate's simulator."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the AM2 Assessment"
      relatedPages={relatedPages}
      ctaHeading="Prepare for the AM2 on Your Phone"
      ctaSubheading="Timed practice scenarios, fault diagnosis trainer, testing sequence walkthroughs, and AI revision support. Join hundreds of apprentices preparing smarter with Elec-Mate. 7-day free trial."
    />
  );
}
