import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Target,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  Wrench,
  Timer,
  Brain,
  ListOrdered,
  Award,
  Zap,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'AM2 Exam Tips', href: '/guides/am2-exam-tips' },
];

const tocItems = [
  { id: 'what-is-am2', label: 'What Is the AM2?' },
  { id: 'am2-format', label: 'AM2 Format and Tasks' },
  { id: 'what-to-bring', label: 'What to Bring' },
  { id: 'common-fails', label: 'Common Failures' },
  { id: 'how-to-prepare', label: 'How to Prepare' },
  { id: 'day-of-tips', label: 'Day-of Tips' },
  { id: 'elecmate-am2-simulator', label: 'AM2 Simulator in Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The AM2 (Achievement Measurement 2) is a full-day practical assessment covering safe isolation, consumer unit build, ring final circuit, lighting circuit wiring, fault finding, and testing. It is the final practical hurdle before you qualify.',
  'Time management is the single biggest cause of failure. Practise every task under timed conditions until you can finish with time to spare. Rushing causes mistakes; preparation creates speed.',
  'Safe isolation is an automatic fail if done incorrectly. The prove-test-prove procedure must be second nature — every single time, no shortcuts. Assessors watch this step closely.',
  'Bring your own complete toolkit and calibrated test instruments. Check everything the day before — flat batteries, blown fuses in test leads, or a missing proving unit will cost you on the day.',
  'Elec-Mate has an AM2 Simulator that replicates every practical task with timed exercises and AI feedback. Candidates who practise 3 to 4 full mock assessments before the real AM2 report significantly higher confidence and pass rates.',
];

const faqs = [
  {
    question: 'What exactly does the AM2 assessment test?',
    answer:
      'The AM2 tests your practical competence across four main areas: consumer unit installation (selecting and installing the correct protective devices, busbar configuration, and cable termination), ring final circuit wiring (complete ring with spur, correct connections at every socket outlet), lighting circuit wiring (one-way and two-way switching with correct terminal connections, brown sleeving on switch wires, and proper cable management), and fault finding (safe isolation followed by systematic testing to identify faults on a pre-built circuit). After completing the wiring tasks, you must also inspect and test your own work — continuity, insulation resistance, polarity, and functional testing — and record the results accurately on a test schedule. The assessment evaluates workmanship quality, safety practices, compliance with BS 7671, time management, and the accuracy of your test results and documentation.',
  },
  {
    question: 'How long does the AM2 take and how is the time split?',
    answer:
      'The AM2 assessment is a full-day practical test lasting approximately 6 hours of working time, plus briefings and breaks. The time is allocated across the four tasks, with each task having its own time limit. The consumer unit installation and ring final circuit typically take the longest, with fault finding and testing allocated shorter but still demanding time slots. The exact time allocation can vary slightly between assessment centres, but you should expect approximately 90 minutes for the consumer unit, 90 minutes for the ring final, 60 minutes for the lighting circuit, and 60 minutes for fault finding and testing. These times are tight — most candidates use every available minute. Practising under timed conditions is essential because the time pressure on the day is real.',
  },
  {
    question: 'What are the most common reasons people fail the AM2?',
    answer:
      'The most common AM2 failures fall into five categories. First, time management — running out of time on one or more tasks because you spent too long on an earlier task. Second, safe isolation errors — skipping steps in the prove-test-prove procedure, not using a proving unit, or not locking off the isolation point. Any safe isolation shortcut is typically an automatic fail. Third, poor terminations — loose connections, exposed copper at terminals, insufficient conductor inserted into terminals, or not tightening to the correct torque. Fourth, two-way switching errors — wiring the strappers to the wrong terminals, confusing the common terminal with L1 or L2, or forgetting to identify switch wires with brown sleeving. Fifth, inaccurate test results — recording wrong values on the test schedule, using the wrong test procedure, or failing to identify your own wiring errors during inspection and testing.',
  },
  {
    question: 'Can I practise the AM2 tasks at home?',
    answer:
      'You can practise some aspects at home, but you cannot fully replicate the AM2 environment. What you can do at home includes: practising cable stripping and termination technique using offcuts of twin-and-earth cable and spare accessories, practising the safe isolation procedure using your voltage indicator and proving unit, drawing out the two-way switching circuit diagram from memory until it is automatic, and timing yourself on cable preparation tasks to build speed. What you cannot easily replicate at home is the full consumer unit build with busbar and RCBO installation, the ring final circuit across multiple socket outlets, and the fault finding on a pre-built faulty circuit. For these tasks, Elec-Mate AM2 Simulator provides the closest digital equivalent — timed exercises with AI feedback that mirror each AM2 task. Some training providers also offer AM2 practice workshops where you work on physical rigs similar to the real assessment.',
  },
  {
    question: 'Do I need to bring my own test instruments to the AM2?',
    answer:
      'Yes, you must bring your own complete set of test instruments. You need a multifunction tester (MFT) that is calibrated and has a valid, in-date calibration certificate — the assessor will check this before the assessment begins. If your calibration certificate has expired, you may not be allowed to take the assessment. You also need a voltage indicator (two-pole tester) that complies with HSE Guidance Note GS38, a proving unit for the safe isolation procedure, and GS38-compliant test leads with fused probes. Bring spare batteries for your MFT and spare fuses for your test leads. A dead battery or blown fuse during the assessment will cost you precious time. Some candidates also bring a second voltage indicator as a backup. The assessment centre provides all materials, cables, accessories, and the pre-built circuits for fault finding — you provide the tools and instruments.',
  },
  {
    question: 'What JIB card do I get after passing the AM2?',
    answer:
      'After passing the AM2, you can apply for a JIB ECS (Electrotechnical Certification Scheme) card. The specific card grade depends on your full set of qualifications. If you hold the Level 3 NVQ/SVQ in Electrical Installation, the AM2, and a current 18th Edition qualification (C&G 2382), you are eligible for the Installation Electrician card — the Gold Card. This is the standard industry card that proves you are a fully qualified electrician, recognised by employers, contractors, and site managers across the UK. Some electricians later work towards the Approved Electrician grade, which requires additional experience, an inspection and testing qualification (such as C&G 2391), and evidence of competence beyond the basic Gold Card level. The JIB ECS card is valid for 5 years and requires renewal, including evidence of continuing professional development.',
  },
  {
    question: 'How much does the AM2 assessment cost?',
    answer:
      'The AM2 assessment fee is typically between 500 and 700 pounds, depending on the assessment centre and whether any additional services (such as a pre-assessment workshop) are included. If you fail and need to retake, you must pay the full fee again — there is no reduced rate for retakes. This is why thorough preparation is so important: a first-time pass saves you both the cost of a retake and the delay in qualifying. Some employers cover the AM2 fee for their apprentices as part of the apprenticeship programme. If you are self-funding, check whether your training provider offers any financial support or payment plans. The assessment must be booked through an approved centre — you can find your nearest centre on the NET (National Electrotechnical Training) website.',
  },
];

const relatedPages = [
  {
    href: '/training/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description: 'Timed mock exercises for every AM2 task with AI-powered feedback.',
    icon: Target,
    category: 'Training',
  },
  {
    href: '/training/apprentice-training',
    title: 'Apprentice Training Hub',
    description: 'Level 2 and Level 3 courses, flashcards, and 2,000+ practice questions.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/how-to-do-safe-isolation',
    title: 'Safe Isolation Procedure',
    description: 'Step-by-step prove-test-prove method following HSE GS38 guidance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct GN3 testing order explained — continuity to RCD testing.',
    icon: ListOrdered,
    category: 'Guide',
  },
  {
    href: '/guides/level-3-electrical',
    title: 'Level 3 Electrical',
    description: 'Level 3 diploma content, circuit design, and inspection and testing.',
    icon: BookOpen,
    category: 'Training',
  },
  {
    href: '/guides/epa-preparation',
    title: 'EPA Preparation',
    description: 'End Point Assessment simulator for all three EPA components.',
    icon: Award,
    category: 'Training',
  },
];

const sections = [
  {
    id: 'what-is-am2',
    heading: 'What Is the AM2 Assessment?',
    content: (
      <>
        <p>
          The AM2 — Achievement Measurement 2 — is the practical assessment that demonstrates you
          can safely and competently carry out electrical installation work to the standard required
          of a qualified electrician. It is administered by National Electrotechnical Training (NET)
          on behalf of the Joint Industry Board (JIB) and is carried out at approved assessment
          centres across the UK.
        </p>
        <p>
          Passing the AM2 is the final practical hurdle in becoming a fully qualified Installation
          Electrician. It is required for the JIB ECS Gold Card and is a gateway requirement for the
          End Point Assessment (EPA) on the electrical apprenticeship standard (ST0215). Without the
          AM2, you cannot complete your{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprenticeship
          </SEOInternalLink>{' '}
          or obtain the industry-standard qualification card.
        </p>
        <p>
          The AM2 is not a classroom exam. It is a hands-on, timed practical assessment in a real
          workshop environment. You are given a set of tasks that replicate everyday electrical
          installation work, and you must complete them all within strict time limits to the
          required standard of workmanship, safety, and accuracy. The assessment covers the core
          skills every electrician needs: installing consumer units, wiring power and lighting
          circuits, testing and inspecting completed work, and finding faults on existing circuits.
        </p>
        <p>
          The pass rate for the AM2 is estimated at around 60 to 70 percent on first attempt. The
          majority of failures are preventable with the right preparation — which is exactly what
          this guide and Elec-Mate AM2 Simulator are designed to deliver.
        </p>
      </>
    ),
  },
  {
    id: 'am2-format',
    heading: 'AM2 Format: The Four Tasks',
    content: (
      <>
        <p>
          The AM2 assessment consists of four main practical tasks, plus inspection and testing of
          your completed work. The total assessment time is approximately 6 hours. Each task tests
          different skills, and you must demonstrate competence in all of them to pass.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Consumer Unit Installation</h3>
                <p className="text-white text-sm leading-relaxed">
                  You are provided with a consumer unit and a circuit schedule. You must install the
                  correct protective devices (MCBs, RCBOs, or RCDs), connect busbars correctly, and
                  terminate circuit cables neatly. Assessors check device selection, torque on
                  terminals, cable dressing, and circuit labelling. This task rewards methodical,
                  careful work and a professional finish.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Ring Final Circuit</h3>
                <p className="text-white text-sm leading-relaxed">
                  Wire a ring final circuit serving multiple socket outlets, including at least one
                  spur. The ring must be continuous, connections correct at every socket, the spur
                  taken from the correct point, and all earth connections properly made. Sleeving of
                  earth conductors with green-and-yellow sleeving is required. A common fail here is
                  incorrect spur connections or a break in the ring.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">
                  Lighting Circuit (One-Way and Two-Way)
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Wire a lighting circuit with both one-way and two-way switching. This is where
                  many candidates make mistakes — particularly with the strappers between the
                  two-way switches and the common terminal connections. You must use the correct
                  wiring method (plate or loop-in as specified), identify switch wires with brown
                  sleeving, and produce neat cable management at the ceiling rose or light fitting.
                  Draw the circuit diagram from memory before you start wiring.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Fault Finding</h3>
                <p className="text-white text-sm leading-relaxed">
                  You are presented with a pre-built circuit containing one or more faults. You must
                  perform{' '}
                  <SEOInternalLink href="/guides/how-to-do-safe-isolation">
                    safe isolation
                  </SEOInternalLink>{' '}
                  following the correct GS 38 procedure, then systematically test the circuit to
                  identify the fault. Common faults include open circuits, reversed polarity,
                  incorrect connections, and earth faults. Assessors watch your safe isolation
                  procedure closely — any shortcut or missed step typically results in a fail.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          After completing the wiring tasks, you must carry out inspection and testing of your own
          work following the correct{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">testing sequence</SEOInternalLink>:
          continuity of protective conductors, insulation resistance, polarity, and functional
          testing. Record your results on a test schedule and sign off the work. Inaccurate test
          results or failure to identify your own wiring errors during testing will count against
          you.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-bring',
    heading: 'What to Bring on AM2 Day',
    content: (
      <>
        <p>
          You must bring your own complete set of hand tools and calibrated test instruments. The
          assessment centre provides all materials, cables, accessories, and pre-built circuits for
          fault finding.
        </p>
        <p>
          <strong>Hand tools:</strong> Side cutters, long-nose pliers, cable strippers, a selection
          of screwdrivers (including VDE insulated electricians screwdrivers), a junior hacksaw, a
          sharp knife or cable sheath stripper, a tape measure, a spirit level, and a torque
          screwdriver. Some candidates also bring wire strippers, a deburring tool, and a small
          file.
        </p>
        <p>
          <strong>Test instruments:</strong> A multifunction tester (MFT) that is calibrated and has
          a valid, in-date calibration certificate. The assessor will check this before the
          assessment begins. A voltage indicator that complies with HSE Guidance Note GS38. A
          proving unit (such as a Martindale VI-13700). GS38-compliant test leads with fused probes.
        </p>
        <p>
          <strong>Spares and extras:</strong> Spare batteries for your MFT. Spare fuses for your
          test leads. Green-and-yellow earth sleeving. Brown sleeving for switch wires. A cable
          marker pen. A small notepad for recording measurements during testing. Your photo ID and
          your booking confirmation.
        </p>
        <p>
          <strong>The day before checklist:</strong> Check your MFT is working on all functions.
          Check the calibration certificate date. Check all test leads for damage. Check your
          proving unit battery. Lay out all tools and check nothing is missing. Pack everything the
          night before so you are not rushing in the morning.
        </p>
      </>
    ),
  },
  {
    id: 'common-fails',
    heading: 'Common AM2 Failures and How to Avoid Them',
    content: (
      <>
        <p>
          Understanding why candidates fail is just as important as knowing what the assessment
          covers. The most common failures are entirely preventable with the right preparation.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-white">Time Management</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The single biggest cause of failure. Candidates spend too long on one task and run out
              of time on others. The only cure is timed practice — do each task repeatedly under
              realistic time limits until you can finish comfortably. Speed comes from repetition,
              not from rushing.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-white">Safe Isolation Errors</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Skipping steps in the prove-test-prove procedure. Not using the proving unit. Not
              testing between all conductor combinations. Not locking off the isolation point. Any
              shortcut to the safe isolation procedure is typically an automatic fail. Practise
              until it is automatic.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-white">Loose Terminations</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Connections not tightened to the correct torque. Exposed copper at terminals.
              Insufficient conductor inserted into the terminal. Over-stripped insulation. Use a
              torque screwdriver and visually check every single connection before moving on.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-white">Two-Way Switching Errors</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Wiring the strappers to the wrong terminals. Confusing the common terminal with L1 or
              L2. Forgetting to use brown sleeving on switch wires. The fix is simple: draw the
              circuit diagram from memory before you start wiring, and check every terminal against
              your diagram as you go.
            </p>
          </div>
        </div>
        <p>
          Other common issues include forgetting to sleeve earth conductors, poor cable management
          at the consumer unit or accessory plates, and inaccurate test results. The AM2 rewards
          methodical, careful work. Rushing leads to mistakes, and mistakes lead to fails.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-prepare',
    heading: 'How to Prepare for the AM2',
    content: (
      <>
        <p>
          Effective AM2 preparation combines practical repetition, theoretical revision, and mental
          preparation. Here is a structured approach that covers all three.
        </p>
        <p>
          <strong>Step 1 — Assess your readiness honestly:</strong> Before booking the AM2, ask
          yourself: Can I wire a consumer unit neatly and accurately from a circuit schedule? Can I
          complete a ring final circuit with correct connections at every socket? Can I wire one-way
          and two-way lighting circuits from memory? Can I perform safe isolation and systematic
          fault finding? If any of these feel uncertain, you are not ready to book.
        </p>
        <p>
          <strong>Step 2 — Practise each task individually:</strong> Work through each AM2 task
          separately, focusing on accuracy first and speed second. Use the Elec-Mate AM2 Simulator
          to practise each task with timed exercises and AI feedback. For practical skills, ask your
          employer if you can practise on spare materials at the workshop, or attend an AM2
          preparation workshop at your training provider.
        </p>
        <p>
          <strong>Step 3 — Drill safe isolation until automatic:</strong> The{' '}
          <SEOInternalLink href="/guides/how-to-do-safe-isolation">
            safe isolation procedure
          </SEOInternalLink>{' '}
          must be completely automatic. Prove the voltage indicator on a known source. Test between
          all conductor combinations at the point of work. Prove the indicator again. Lock off.
          Every single time. If you have to think about the steps, you have not practised enough.
        </p>
        <p>
          <strong>Step 4 — Revise the testing sequence:</strong> Know the correct{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            testing sequence from GN3
          </SEOInternalLink>{' '}
          — continuity, ring circuit continuity, insulation resistance, polarity, earth fault loop
          impedance, PFC, and RCD. You must be able to test your own completed work accurately and
          record results on a test schedule.
        </p>
        <p>
          <strong>Step 5 — Run full timed mock assessments:</strong> Once confident with each
          individual task, run a full timed AM2 mock covering all four tasks with realistic time
          limits. Aim to complete at least 3 full mock assessments before your real AM2 date. The
          Elec-Mate AM2 Simulator tracks your time per task, scores your approach, and provides
          detailed feedback.
        </p>
        <SEOAppBridge
          title="AM2 Simulator — Practise Every Task"
          description="Timed exercises replicating every AM2 task: consumer unit build, ring final circuit, lighting circuit, and fault finding. AI feedback identifies your weak areas. Run full mock assessments and track your improvement over time."
          icon={Target}
        />
      </>
    ),
  },
  {
    id: 'day-of-tips',
    heading: 'Tips for AM2 Day',
    content: (
      <>
        <p>
          The following tips come from electricians who have passed the AM2 and from the common
          patterns observed in pass/fail outcomes. Follow them and you significantly increase your
          chances of a first-time pass.
        </p>
        <p>
          <strong>Read the brief twice, then read it again.</strong> The brief tells you exactly
          what to do. If it says to use a specific wiring method or cable type, use it. Do not do
          what you normally do on site — do what the brief asks. Candidates fail because they assume
          what the task requires rather than reading the actual specification.
        </p>
        <p>
          <strong>Do not try to be fast — try to be right.</strong> Speed comes from practice, not
          from rushing. If you rush, you make mistakes. If you make mistakes, you waste time going
          back to fix them — or worse, you do not catch them and they cost you marks. Work
          methodically, check each connection before moving on, and the speed will come naturally.
        </p>
        <p>
          <strong>Draw the two-way switching diagram before you start wiring.</strong> Spend 30
          seconds drawing the circuit on a scrap of paper. Mark the common terminal, L1, L2, and the
          strappers. Then wire it from your diagram. This eliminates the most common wiring errors
          on this task.
        </p>
        <p>
          <strong>Check your safe isolation every time, without exception.</strong> The assessor is
          watching. Prove-test-prove. Lock off. Warning label. Do not skip a single step. This is
          the one area where assessors have zero tolerance for shortcuts.
        </p>
        <p>
          <strong>Sleep well the night before.</strong> The AM2 is a mentally and physically
          demanding day. Being well-rested improves your concentration, reduces mistakes, and helps
          you manage time better. Arrive early, give yourself time to set up your tools calmly, and
          start the assessment with a clear head.
        </p>
        <p>
          <strong>Keep your workspace tidy.</strong> Assessors notice a tidy workspace. It also
          prevents you from losing tools, standing on cables, or wasting time searching for
          something you put down somewhere. Organisation is a professional habit that the assessment
          rewards.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-am2-simulator',
    heading: 'The Elec-Mate AM2 Simulator',
    content: (
      <>
        <p>
          Elec-Mate was built by electricians who have been through the AM2 process. We know the
          pressure, the time constraints, and the common traps that catch candidates out. The AM2
          Simulator is designed to replicate the real assessment as closely as possible in a digital
          format, so you arrive on the day with confidence.
        </p>
        <p>
          <strong>Timed task exercises:</strong> Each exercise mirrors a real AM2 task. The consumer
          unit build presents you with a circuit schedule and walks through the installation
          sequence. The ring final circuit exercise covers correct wiring, spur connections, and
          testing procedures. The lighting circuit exercise drills one-way and two-way switching
          until the terminal connections are automatic. The fault finding exercise teaches
          systematic testing rather than guesswork.
        </p>
        <p>
          <strong>AI-powered feedback:</strong> The AI analyses your approach to each exercise and
          identifies areas for improvement. It tracks your speed, accuracy, and consistency across
          multiple attempts, showing you exactly where you need more practice.
        </p>
        <p>
          <strong>Safe isolation simulations:</strong> Practise the full prove-test-prove procedure
          in a simulated environment. The simulator flags any skipped steps or incorrect procedures,
          building the muscle memory you need for the real assessment.
        </p>
        <p>
          <strong>Full mock assessments:</strong> Run a complete timed AM2 covering all four tasks.
          The simulator tracks your time per task and provides a detailed breakdown of your
          performance. Many candidates who complete 3 to 4 full mocks before their real AM2 date
          report significantly higher confidence and pass rates.
        </p>
        <p>
          Beyond the AM2 Simulator, Elec-Mate also provides flashcards, 2,000+ practice questions,
          BS 7671 run-through content, and an AI study assistant that answers regulation questions
          in plain English. It is the complete preparation toolkit for your AM2 and beyond.
        </p>
        <SEOAppBridge
          title="Practise the AM2 Before the Real Thing"
          description="Timed exercises, AI feedback, safe isolation simulations, and full mock assessments — all replicating the real AM2 format. Join 430+ UK apprentices preparing with Elec-Mate. 7-day free trial."
          icon={Target}
        />
      </>
    ),
  },
];

export default function AM2ExamTipsPage() {
  return (
    <GuideTemplate
      title="AM2 Exam Tips 2026 | What to Expect & How to Pass"
      description="Complete guide to the AM2 practical assessment for UK electricians in 2026. What the AM2 tests, common failures, how to prepare, what to bring, day-of tips, and Elec-Mate AM2 Simulator."
      datePublished="2025-06-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Exam Guide"
      badgeIcon={Target}
      heroTitle={
        <>
          AM2 Exam Tips 2026 —{' '}
          <span className="text-yellow-400">What to Expect and How to Pass</span>
        </>
      }
      heroSubtitle="The AM2 practical assessment is the final hurdle before you qualify as an electrician. This guide covers what the AM2 tests, the format and tasks, what to bring, the most common failures, how to prepare effectively, and tips for the day itself."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the AM2 Assessment"
      relatedPages={relatedPages}
      ctaHeading="Pass the AM2 first time"
      ctaSubheading="Join 430+ UK apprentices and electricians preparing for the AM2 with timed mock exercises and AI feedback. 7-day free trial, cancel anytime."
    />
  );
}
