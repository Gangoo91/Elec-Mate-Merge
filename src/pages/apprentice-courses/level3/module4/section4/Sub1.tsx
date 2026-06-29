/**
 * Module 4 · Section 4 · Subsection 1 — Logical stages of fault diagnosis
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.2
 *   AC 4.2 — "explain the logical stages of fault diagnosis"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.2 — interpret and apply the
 * logical stages of fault diagnosis and correction work that should be
 * followed.
 *
 * Frame: the seven-stage fault diagnostic procedure — collect symptoms,
 * formulate hypothesis, plan tests, execute tests, analyse results,
 * formulate fix, execute fix. The discipline that makes diagnosis a
 * process rather than guesswork.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Logical stages of fault diagnosis (4.1) | Level 3 Module 4.4.1 | Elec-Mate';
const DESCRIPTION =
  'The seven-stage fault diagnostic procedure — collect symptoms, formulate hypothesis, plan tests, execute, analyse, formulate fix, execute fix. The discipline that turns diagnosis into a process rather than guesswork.';

const checks = [
  {
    id: 'mod4-s4-sub1-stages',
    question:
      "What are the seven logical stages of fault diagnosis used in industry?",
    options: [
      "Two stages only: find the broken part by looking, then replace it. Fault diagnosis is fundamentally a visual task — walk the installation, spot the obvious damage, swap the component. The formal multi-stage models are academic and have no place in real on-site work.",
      "Collect symptoms, formulate hypothesis, plan tests, execute tests, analyse results, formulate fix, execute fix — a structured progression from symptom to verified repair, with explicit hypothesis testing at each step.",
      "Three stages: isolate the whole installation, IR-test every circuit at 500 V, then re-energise. Whichever circuit reads below 1 MΩ is the fault; rectify it and the job is done. There is no need to collect symptoms or form a hypothesis because the IR test always finds the fault on its own.",
      "Start at the consumer unit and work outwards circuit by circuit until the fault appears. The logical sequence is always to test the board first, then each final circuit in MCB order, regardless of what the customer reports. The symptoms and any hypothesis are a distraction from this fixed order.",
    ],
    correctIndex: 1,
    explanation:
      "The seven stages are: (1) collect symptoms — customer interview plus visual inspection; (2) formulate hypothesis — narrow to 2–3 fault candidates that match; (3) plan tests — which tests distinguish the candidates, ordered safely dead-before-live; (4) execute tests with the right instruments; (5) analyse results — confirm or refute each hypothesis and update on the findings; (6) formulate fix — repair vs replace; (7) execute fix — make safe, repair/replace, retest, document. Variants exist (some use 5, 6 or 8 stages) but the principle is the same; skipping a stage almost always returns to bite you. The L3 expectation is to follow the discipline; the senior electrician does it without thinking about it.",
  },
  {
    id: 'mod4-s4-sub1-hypothesis',
    question:
      "Why is FORMULATE HYPOTHESIS (stage 2) the most important stage and what happens when you skip it?",
    options: [
      "Because the hypothesis drives the test plan — with one (or two competing ones), each test is designed to confirm or refute a specific candidate. Skip it and you run every test on every circuit, turning 30 minutes of targeted work into four hours.",
      "It isn't important — the hypothesis stage is optional padding. The tests find the fault whatever you expected, so forming a hypothesis first just wastes time. Skipping it makes no difference to the outcome and gets you to the fix faster.",
      "Because BS 7671 requires a written hypothesis on the certificate before any testing can begin. Skipping it makes the resulting Minor Works Certificate invalid, so the only consequence of omitting the hypothesis is a paperwork failure, not a diagnostic one.",
      "Because the hypothesis sets the order in which you isolate circuits. Without it you cannot decide which MCB to switch off first, so the whole installation must be isolated at once — the only downside of skipping it is the inconvenience of a full power-down.",
    ],
    correctIndex: 0,
    explanation:
      "The hypothesis stage is what turns electrical fault-finding into engineering. Without a working hypothesis the apprentice is doing data collection without a purpose; with one, each test answers a specific question. The 'just test everything' approach also misses faults that don't show on standard tests (an HRJ needs a voltage-drop-on-load test, not just continuity). The shift from 'I'll just test things' to 'I think it's X — let me test that' is the L3 mental model and is faster and more accurate.",
  },
  {
    id: 'mod4-s4-sub1-iterate',
    question:
      "What happens at stage 5 (ANALYSE RESULTS) if your test results don't match the hypothesis?",
    options: [
      "You commit to the original hypothesis anyway and keep testing the same area until a result eventually supports it. A first hypothesis is rarely wrong, so mismatched readings usually mean the fault is intermittent; persist with the same tests until it shows.",
      "You stop the structured process and revert to swapping components one at a time. Once the test results contradict the hypothesis, diagnosis has failed, so the practical move is to replace likely parts in turn until the symptom clears.",
      "You loop back to stage 2 and update the hypothesis — the results have eliminated one candidate and may have suggested another. Re-plan, re-test and re-analyse, iterating between stages 2–5 until one hypothesis explains all the results.",
      "You record the readings as a 'no fault found' result and hand back to the customer. If the tests do not match the hypothesis, the fault cannot be confirmed, so the correct outcome is to document that nothing was wrong and close the job.",
    ],
    correctIndex: 2,
    explanation:
      "Real diagnoses iterate. The first hypothesis is usually wrong or incomplete; the test results refine it. When results contradict the hypothesis you re-plan tests (stage 3), execute (stage 4) and re-analyse (stage 5), looping until a hypothesis explains all the evidence rather than abandoning the process to guess. The L3 apprentice's competence is partly recognising 'the results don't match — what's the new hypothesis?' rather than forcing the data to fit; senior electricians may iterate several times on a complex fault.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "How does the structured 7-stage approach differ from 'just looking around until something obvious shows up'?",
    options: [
      "There is no real difference — both find the fault, so the structured approach is just slower bureaucracy. Looking around is always quicker because you skip the paperwork, and the result is identical, so experienced electricians abandon the formal stages entirely.",
      "The structured approach is hypothesis-driven, targeted and documented, so it scales to complex / intermittent / multi-symptom faults and stays consistent across operatives. The look-around catches the obvious but misses the subtle and depends on intuition.",
      "The structured approach is for new installations and the look-around approach is for fault-finding. On a fault call you never form a hypothesis; hypotheses belong to design work, so the look-around is the correct and only method for diagnosis.",
      "The look-around approach is more thorough because you inspect everything, while the structured approach deliberately ignores most of the installation to save time. The structured method therefore misses faults the look-around would catch, which is why it is reserved for trivial jobs.",
    ],
    correctAnswer: 1,
    explanation:
      "The look-around approach works for the easy 50% of faults — broken switch, blown bulb, tripped breaker — which is why apprentices learn it first. It is opportunistic, undocumented and inconsistent across visits, and breaks down on the harder 50%: intermittent, multi-symptom, complex root cause. The structured approach is hypothesis-driven with targeted tests and a documented progression that scales to any fault complexity. L3 fault diagnosis at the qualification level requires the structured approach because the assessor needs to see the discipline.",
  },
  {
    id: 2,
    question: "What documentation should accompany each stage of the diagnostic process?",
    options: [
      "Only the final test readings on the Minor Works Certificate. The earlier stages — symptoms, hypothesis, test plan, analysis — are working notes that don't need recording; once the fix is done, the certificate readings are the only document that matters.",
      "Nothing during the diagnosis — documentation is written up afterwards from memory. Recording each stage as you go slows the work, so the professional habit is to do the whole diagnosis first and then reconstruct the narrative for the job sheet at the end of the day.",
      "Each stage records its own evidence — symptoms in the customer's words, the hypothesis and reasoning, the test plan, the readings with instrument IDs, the analysis, the fix plan, and the post-fix retest. Together they form the defensible diagnostic narrative on the job sheet.",
      "Just a photograph of the faulty component before and after replacement. A pair of photos proves the work was done, which is all the documentation a fault job needs; written symptoms, hypotheses and readings add nothing a picture doesn't show.",
    ],
    correctAnswer: 2,
    explanation:
      "Each stage carries its own record: symptoms (customer's words, timeline, conditions, what they've tried); hypothesis (what you think and why); test plan (which tests, in what order, what each distinguishes); results (readings with timestamps and instrument IDs); analysis (confirm/refute, updated hypothesis); fix plan (repair vs replace, materials, duration); fix execution (what was done, post-fix retest, hand-back). This is the audit trail that makes the diagnosis defensible. Modern firms use job-sheet apps (simPRO, BigChange, Joblogic) that prompt for each stage; the discipline is the same on paper or app.",
  },
  {
    id: 3,
    question: "When is it acceptable to skip the formal stages and just do the obvious fix?",
    options: [
      "Whenever the customer is in a hurry. Time pressure is a legitimate reason to drop the formal stages and go straight to the most likely fix, because the customer is paying and the quickest result is what they want.",
      "On any domestic job. The stages are designed for commercial and industrial work; in a house the installation is simple enough that you can always skip straight to the obvious fix without inspection or testing.",
      "Once you have more than two years' experience. Experienced electricians have earned the right to skip the stages because their intuition replaces the process, so the discipline is only for apprentices still learning.",
      "When the fault is obvious, the obvious fix is risk-free, and the customer has been informed — e.g. a blown bulb: replace, verify, document. Even then a 5-second mental check (does the report fit the fix, is the bulb the right rating, is the lampholder undamaged) catches the cases where 'obvious' wasn't right.",
    ],
    correctAnswer: 3,
    explanation:
      "Even simple jobs benefit from a quick mental run-through of the stages. The full formal documentation isn't needed for trivial fixes; the mental discipline is. The 5-second check confirms the customer's report is consistent with the fix, the part is correctly rated, and nothing else is damaged. Apprentices who 'just do the obvious' on every job miss the cases where 'obvious' is wrong; the structured-thinking discipline catches them.",
  },
  {
    id: 4,
    question: "What's the difference between a 'symptom' and a 'fault' in diagnostic vocabulary?",
    options: [
      "A symptom is what the customer or observer notices (lights flicker, breaker trips, smell of burning); a fault is the underlying engineering condition that causes it (HRJ at a terminal, earth leakage from an appliance, broken conductor). Diagnosis is the process of mapping symptoms to the actual fault.",
      "They are the same thing described at different times. A symptom is the fault before you isolate, and a fault is the same symptom after you isolate; the words are interchangeable, so an electrician can use either to describe what the customer reported.",
      "A symptom is a minor defect and a fault is a major defect. The distinction is purely about severity — a flicker is a symptom because it is harmless, while a short circuit is a fault because it is dangerous; both are conditions of the wiring.",
      "A fault is what the customer reports and a symptom is what you find on test. The customer describes the fault in their own words, and your instrument readings reveal the symptoms behind it, so diagnosis runs from fault to symptom.",
    ],
    correctAnswer: 0,
    explanation:
      "Symptom vs fault is foundational vocabulary. The customer reports symptoms; the engineer identifies faults. The mapping is many-to-many: one fault can produce several symptoms (an HRJ on the incoming tail flickers every circuit when high-current loads cycle) and one symptom can come from several faults (an RCD trip can be earth leakage, smooth DC residual, or device failure) — which is what makes diagnosis hard.",
  },
  {
    id: 5,
    question: "How do you decide which test to run first when you have multiple competing hypotheses?",
    options: [
      "Always run the live tests first. Zs and RCD trip-time give the most information, so doing them before any dead test gets you to the answer quickest; the dead tests are just confirmation afterwards.",
      "By three criteria in order — safety (dead before live, low-energy before high), then discrimination (the test that most narrows the candidate hypotheses), then cost (quick/free before slow/expensive). The aim is the shortest sequence of tests that separates the surviving hypotheses.",
      "Run them in the order they appear on the certificate. The Minor Works form lists continuity, then insulation resistance, then polarity, then Zs, so following the form top to bottom is the correct test order regardless of which hypothesis you are trying to confirm.",
      "Run the cheapest test first every time, ignoring what it tells you. Cost is the only consideration that matters, so a free visual always comes before any instrument test even if the visual cannot distinguish between your competing hypotheses.",
    ],
    correctAnswer: 1,
    explanation:
      "Test ordering is part of the diagnostic plan. Discrimination means choosing the test whose result most narrows the candidates — an IR test that separates 'short' from 'open' beats a continuity test that only resolves one; cost means visual inspection before opening the CU. Information-theory framing: each result should ideally halve the remaining hypothesis space, so the most-discriminating test goes first and weak tests go last or get cut. Safety constraints overlay this — never run a high-energy live test before establishing the basics with dead tests.",
  },
  {
    id: 6,
    question: "What's the role of the 'visual inspection' in the logical stages, and what should you look for?",
    options: [
      "Visual inspection is the final stage, done after the fix to prove the work looks tidy. It plays no part in diagnosis because the eye cannot detect electrical faults; you only look at the installation once the testing and repair are complete.",
      "Visual inspection means checking the instrument readings on the MFT display. The 'visual' refers to reading the meter rather than looking at the installation, so there is nothing to inspect at the consumer unit or accessories themselves.",
      "It happens at stage 1 (collect symptoms) and is structured — look for signs of past faults (scorch, soot, melted plastic), workmanship issues, environmental factors (water, vermin, damaged runs) and system integrity. The visual catches the easy 30% of faults before any instrument is used.",
      "Visual inspection is optional and only worthwhile on commercial sites. In a domestic property there is nothing to see, so you skip the visual and go straight to instrument testing; looking around a house never reveals a fault.",
    ],
    correctAnswer: 2,
    explanation:
      "Structured visual inspection is the cheapest diagnostic test you have — it costs nothing, catches obvious faults and informs the hypothesis. The structured look covers: signs of past faults (scorched terminals, blackened insulation, soot, melted plastic, replaced fuses, taped joints); workmanship (over-stripped or exposed conductors, unfinished connections); environment (water marks, condensation, dust, vermin, damaged runs); and system integrity (covers in place, accessories secured, signage current). Experienced electricians develop a 'walking inspection' habit; the L3 apprentice builds the same through deliberate practice.",
  },
  {
    id: 7,
    question: "What if the diagnosis takes longer than the time the customer is willing to pay for?",
    options: [
      "Skip the slower stages to bring the job inside the budget. Drop the documentation and the retest, go straight to the most likely fix, and the customer gets a cheaper bill; the corners cut rarely cause a problem.",
      "Stop work and walk away the moment the time runs out, leaving the fault as found. The customer set the budget, so once it is reached your obligation ends; no make-safe or follow-up is needed because they declined to pay for more.",
      "Guess the most probable fault and replace that component without further testing. If the customer won't pay for a full diagnosis, a best-guess parts swap is the fair compromise, and if it doesn't work they can pay for more later.",
      "Time-box the investigation with the customer, stage the work (make-safe now, return visit for full diagnosis), or escalate if the fault is beyond your competence — but never skip stages to fit a budget, because the comeback costs more than honest extra time. Document the time-box and the customer's acceptance.",
    ],
    correctAnswer: 3,
    explanation:
      "Time pressure is a real constraint and the structured approach helps you manage it. Time-boxing means agreeing a ceiling upfront ('up to 90 minutes on initial diagnosis, then we review and decide'); staging means completing the make-safe at the agreed time and booking a return visit; escalation hands a beyond-competence fault to a senior or specialist. Agreeing the time-box protects everyone — the customer knows the cost ceiling, the apprentice has a clear scope, the firm has a defensible billing position. Skipping stages to save time is the worst trade.",
  },
  {
    id: 8,
    question: "What's the purpose of the post-fix RETEST stage and why is it non-negotiable?",
    options: [
      "It verifies the fix actually worked, confirms the repair introduced no new fault, and generates the documented compliance evidence — the post-fix readings on the job sheet that prove BS 7671 643 is met. Skip it and there is no evidence of a correct repair.",
      "It isn't really non-negotiable — the retest is a formality you do only if the customer asks for a certificate. If they don't want paperwork, switching the circuit back on and seeing it work is proof enough that the fix is sound.",
      "The retest exists to recalibrate your test instrument after the repair. Working on a circuit knocks the MFT out of calibration, so the post-fix readings are taken to reset the meter, not to verify the fix itself.",
      "It is only needed when you replace a protective device. If the fix was a re-termination or a cable repair, no retest applies because nothing that affects the test readings has changed; the retest is reserved for swapped breakers.",
    ],
    correctAnswer: 0,
    explanation:
      "The retest closes the diagnostic loop. It does three things: confirms the fix worked (a repair that looks good can fail under live conditions); confirms it introduced no new fault (an over-tightened terminal can crack, a repositioned cable can chafe, a new component can be DOA); and produces the documented compliance evidence. Without it you have a confirmed hypothesis and a fix but no proof the fix actually worked. Standard L3 practice includes the relevant BS 7671 643 tests on the affected circuit after rectification.",
  },
];

const faqs = [
  {
    question: "How do I know when my diagnosis is 'good enough' to act on?",
    answer:
      "When the hypothesis explains ALL the symptoms AND test results, AND the proposed fix has a clear logical link to the diagnosed fault. If you have unexplained symptoms or test results that don't fit your hypothesis, the diagnosis is incomplete — keep iterating. If the proposed fix doesn't directly address the diagnosed fault (e.g. 'replace the socket because we found an HRJ at the upstream junction box' — wrong fix), reconsider. The 'good enough' bar is not 'I think this might be it' — it's 'this hypothesis explains everything I've observed AND the fix logically corrects it'.",
  },
  {
    question: "What if there's no clear single hypothesis at the end of testing?",
    answer:
      "Then you have either incomplete information OR a multi-fault scenario OR a fault that's outside your competence to diagnose. Options: (1) Run additional tests if there are more questions to answer (PQ analyser for intermittents, motor analyser for motor issues, oscilloscope for waveform issues). (2) Escalate to senior or specialist. (3) Time-box and stage — agree make-safe and return-visit with the customer. Pretending a vague hypothesis is enough leads to wrong fixes and comebacks.",
  },
  {
    question: "Do I need to write down the hypothesis or can I just hold it in my head?",
    answer:
      "Write it down. Two reasons: (1) The act of writing forces you to articulate it precisely — vague mental hypotheses become clear when you have to write them as one sentence. (2) Documentation supports the diagnostic narrative on the job sheet — the customer / supervisor can see the reasoning chain. Mental hypotheses are fine for trivial obvious faults; written hypotheses are needed for any non-trivial diagnosis.",
  },
  {
    question: "How do experienced electricians do this so quickly — they don't seem to follow stages?",
    answer:
      "They do follow them — they just compress them into seconds because the patterns are familiar. The senior who 'just knows' it's a HRJ at the consumer-unit busbar is running the seven stages mentally in 30 seconds because they've seen the symptom pattern dozens of times. The L3 apprentice runs the stages explicitly and slowly because the patterns aren't yet familiar. Over years the stages become internalised; until they are, follow them deliberately.",
  },
  {
    question: "What if the customer thinks they know what's wrong and pressures me to just fix that?",
    answer:
      "Acknowledge their input but don't be bound by it. Customer suggestions are usually based on partial information — they may have heard a friend describe a similar symptom, or read something online. Run the structured diagnosis; if their suggestion turns out to match the diagnosis, fine. If it doesn't, the structured diagnosis gives you the evidence to explain why their suggestion isn't the right fix. 'I appreciate the suggestion; I've tested and the actual fault is X — let me explain' is a defensible, professional response.",
  },
  {
    question: "Is there a textbook on this seven-stage approach?",
    answer:
      "Several. The IET 'On-Site Guide' covers the basics; IET 'Guidance Note 3 — Inspection and Testing' covers the testing side in depth; the City & Guilds 2391/2394 syllabus materials cover the full diagnostic discipline at higher level. Online: TLC-Direct, Trade-Skills 4 U, and various YouTube channels (Joe Robinson Electrical, Gary Does Stuff, Eficheck) demonstrate the approach in real fault scenarios. Building the seven-stage habit comes from doing the diagnosis with the discipline, not from reading about it.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 1"
            title="Logical stages of fault diagnosis"
            description="The seven-stage fault diagnostic procedure — collect symptoms, formulate hypothesis, plan tests, execute tests, analyse results, formulate fix, execute fix. The discipline that turns diagnosis into a structured process rather than guesswork."
            tone="emerald"
          />

          <TLDR
            points={[
              "Seven stages: collect symptoms, formulate hypothesis, plan tests, execute tests, analyse results, formulate fix, execute fix. Iterative loop between stages 2–5 until hypothesis explains all evidence.",
              "Hypothesis stage (2) is the most important — drives the test plan. Without a hypothesis, you're randomly testing and hoping. Skipping it = 4 hours instead of 30 minutes.",
              "Even 'obvious' fixes benefit from a quick mental run-through of the stages. Apprentices who 'just do the obvious' miss the cases where obvious is wrong.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the seven-stage logical fault diagnostic procedure: collect symptoms, formulate hypothesis, plan tests, execute, analyse, formulate fix, execute fix.",
              "Distinguish symptoms from faults — symptoms are what the customer notices, faults are the underlying engineering conditions.",
              "Iterate the hypothesis–test–analyse loop (stages 2–5) until findings explain all observed evidence.",
              "Order tests by safety (dead before live), discrimination (most-narrowing first), and cost (free / quick before slow / expensive).",
              "Apply structured visual inspection to catch the easy 30% of faults before any instrument is used.",
              "Document each stage on the job sheet to create a defensible diagnostic narrative.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The seven stages</ContentEyebrow>

          <ConceptBlock
            title="Diagnosis as a structured process, not a guess"
            plainEnglish="Apprentices first learn fault-finding as 'look around until you see what's wrong'. That works for simple faults. For anything complex, intermittent, or multi-symptom, you need a structured approach. The seven stages are the standard discipline."
            onSite="The L3 expectation is to follow the stages explicitly. The senior electrician compresses them into seconds because the patterns are familiar; the apprentice runs them slowly and deliberately because the patterns aren't yet built. Over years it becomes muscle memory."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. COLLECT SYMPTOMS</strong> — customer interview (Sub 3.2 six-question framework) + structured visual inspection.</li>
              <li><strong>2. FORMULATE HYPOTHESIS</strong> — what fault types match the symptoms? Narrow to 2–3 candidates with reasons.</li>
              <li><strong>3. PLAN TESTS</strong> — which tests will distinguish the candidates? Order by safety (dead before live), discrimination (most-narrowing first), cost.</li>
              <li><strong>4. EXECUTE TESTS</strong> — using the right instruments per Sub 2.x.</li>
              <li><strong>5. ANALYSE RESULTS</strong> — do the readings confirm or refute each hypothesis? Update hypothesis if needed; loop back to stage 2.</li>
              <li><strong>6. FORMULATE FIX</strong> — what action corrects the confirmed fault? Repair vs replace decision (Sub 5.1).</li>
              <li><strong>7. EXECUTE FIX</strong> — make safe, repair / replace, verify with retest, document.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 (Inspection and Testing) — fault diagnosis framework (paraphrased)"
            clause={<>Paraphrased framework summary: diagnosis of faults takes a systematic approach — start from the reported symptoms, work through inspection of the system, instrument verification, and only then formulate an action plan. Premature action without diagnosis risks harm to operative, customer and equipment.</>}
            meaning={<>The framework endorses the systematic approach. The 'symptom → inspection → test → action' chain is the structural backbone of the seven-stage model. Premature action (skipping stages 2–5) is explicitly identified as a risk source.</>}
            cite="Source: IET Guidance Note 3 (Inspection and Testing) — fault diagnosis framework, paraphrased."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Why hypothesis-driven testing wins</ContentEyebrow>

          <ConceptBlock
            title="The single biggest L3 step-up from L2 fault-finding"
            plainEnglish="Without a hypothesis, you\'re running tests randomly and hoping a result jumps out. With a hypothesis, each test is designed to confirm or refute a specific candidate. The difference between 4 hours of testing and 30 minutes of testing."
          >
            <p>
              The hypothesis stage is the reasoning step. You take the symptoms and ask 'what fault types could produce this pattern?'. Narrow to 2–3 candidates with reasons. Each candidate predicts what the test results should look like. The next stage (plan tests) chooses tests that will distinguish the predictions.
            </p>
            <p>Example for a 'lights flicker when fridge cycles' symptom:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hypothesis A:</strong> HRJ on the supply path to the lighting circuit. Predicted reading: voltage drop &gt;5% on lighting during fridge inrush; thermal hotspot at the HRJ location.</li>
              <li><strong>Hypothesis B:</strong> Undersized supply tail. Predicted reading: voltage drop on entire installation during fridge inrush, not just lighting; no localised hotspot.</li>
              <li><strong>Hypothesis C:</strong> Cheap LED lamps incompatible with circuit. Predicted reading: no voltage drop on multimeter; substituting a known-good lamp eliminates flicker.</li>
            </ul>
            <p>Each hypothesis predicts different test results; the tests that distinguish them go first.</p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>The iterative loop — stages 2 to 5</ContentEyebrow>

          <ConceptBlock
            title="Real diagnoses iterate"
            onSite="First hypotheses are usually wrong or incomplete. The test results refine them. Loop back to stage 2 with updated hypothesis based on what the tests revealed. Keep iterating until hypothesis explains all the evidence."
          >
            <p>
              The iterative loop is normal and expected. The L3 apprentice\'s competence is partly recognising \'the results don\'t match — what\'s the new hypothesis?' rather than forcing the data to fit. Senior electricians may iterate several times on a complex fault.
            </p>
            <p>What stops the loop:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hypothesis explains all the symptoms AND all the test results.</li>
              <li>Proposed fix has a direct logical link to the diagnosed fault.</li>
              <li>No unexplained anomalies left in the data.</li>
            </ul>
            <p>What signals you should keep iterating:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Some symptoms not explained by current hypothesis.</li>
              <li>Test results that don't fit the prediction.</li>
              <li>Proposed fix that doesn\'t logically address what\'s been found.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 642.1"
            clause={
              <>
                "Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply."
              </>
            }
            meaning={
              <>
                Stage 1 (symptom collection) and stage 2 (hypothesis) are inspection work. Reg 642.1 fixes the order: inspection comes first, normally with the part under inspection dead. Most failed diagnoses skip the inspection stage and dive into testing &mdash; the Regulation explicitly tells you not to.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 642.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 642.2"
            clause={
              <>
                "The inspection shall be made to verify that the installed electrical equipment is: (a) in compliance with the requirements of Section 511; (b) correctly selected and erected in accordance with BS 7671, taking into account manufacturers&apos; instructions; and (c) not visibly damaged or defective so as to impair safety."
              </>
            }
            meaning={
              <>
                The inspection in stage 1 is a structured three-part check &mdash; product standard compliance, correct selection / erection, and visible damage. That&apos;s the framework you carry into the customer&apos;s house. Skipping any of the three is how a fault gets missed at the inspection stage and only shows up when somebody comes back to a bigger fault later.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 642.2."
          />

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic={videos.faultFinding.topic}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Running every test without a hypothesis"
            whatHappens={<>Apprentice arrives at a \'something\'s wrong with the wiring' job. Without forming a hypothesis, they isolate the whole installation and run every BS 7671 643 test on every circuit. Three hours later they have a stack of readings, all within tolerance, and no diagnosis. Customer is impatient; supervisor is on the phone. Real fault was a single failing LED driver on one circuit — would have been identified in 10 minutes with a customer interview + targeted clamp meter test on that circuit.</>}
            doInstead={<>Always form a hypothesis before testing. Even a wrong first hypothesis is better than no hypothesis — it gives the testing direction. The discipline of asking 'what fault types could cause this symptom?' before opening any enclosure is the L3 step-up.</>}
          />

          <CommonMistake
            title="Forcing the data to fit the first hypothesis"
            whatHappens={<>Apprentice\'s first hypothesis is HRJ at the consumer unit. They run continuity tests; readings are all normal. Instead of updating the hypothesis, they conclude \'it must be intermittent HRJ' and start torque-testing every busbar terminal anyway. Two hours later, no fault found at the busbar. Real fault was an earth leakage from a degraded outdoor socket gasket — visible on the clamp meter but never tested because the apprentice was committed to the busbar hypothesis.</>}
            doInstead={<>Treat hypotheses as falsifiable. If the test results don't match the prediction, the hypothesis is wrong (or incomplete) — update it, don\'t force it. The professional discipline is to follow the evidence, not your initial guess.</>}
          />

          <Scenario
            title="Diagnosing \'the kitchen lights flicker but only sometimes'"
            situation={<>Customer reports kitchen LED downlights flicker intermittently. They can't predict when. They've tried replacing one of the bulbs without effect.</>}
            whatToDo={<>Stage 1 — collect symptoms. Customer interview reveals: flicker started 3 months ago, no building work, but they did add a smart hub for their lights about then. Visual: kitchen has 8 LED downlights on a Lutron dimmer connected to a smart hub. Stage 2 — hypothesis. Three candidates: (A) dimmer / smart hub incompatibility with the LED drivers, (B) cumulative leakage from smart hub causing brief RCD-edge events, (C) marginal HRJ at one of the downlight terminations. Stage 3 — plan tests. Most discriminating test: substitute known-good non-dimmable LED on a non-dimmed circuit; if flicker stops, it\'s the dimmer/hub. If flicker persists with substituted lamp, escalate to clamp meter for cumulative leakage check; thermal imaging for HRJ. Stage 4 — execute. Substitute test eliminates flicker. Stage 5 — analyse. Hypothesis A confirmed; the smart hub\'s PWM signal isn't compatible with the cheap LED drivers used. Stage 6 — formulate fix. Replace LED downlight drivers with units rated for smart-hub compatibility (Lutron-certified or similar). Stage 7 — execute. Customer agrees, drivers replaced, smart-hub control restored, flicker eliminated. Document on job sheet.</>}
            whyItMatters={<>The structured approach finds the root cause (driver-hub incompatibility) rather than the symptom (one bulb flicker). The fix is a one-time replacement; the customer's smart-hub investment is preserved. Without the structured approach, the apprentice might have replaced bulbs (no fix), replaced the hub (expensive, didn't fix), or replaced wiring (massive cost, didn't fix). The seven stages prevent the wrong fix.</>}
          />

          <SectionRule />

          <ContentEyebrow>Stage 1 — symptom collection in depth</ContentEyebrow>

          <ConceptBlock
            title="The six-question customer interview that drives the diagnosis"
            plainEnglish="The customer interview is the most data-rich stage. Six questions reliably extract the diagnostic information: WHAT exactly happens; WHEN did it start; WHERE in the property does it happen; WHY do you think it's happening; WHAT'S CHANGED recently; WHAT'S WORKED in the past."
            onSite="Document each answer in the job sheet — verbatim quotes are valuable. Use prompts to draw out detail: 'When you say it flickers, what does it look like — slow pulsing, fast strobing, or just dimming briefly?' Customer language is often vague; the apprentice's job is to translate vague-words into engineering-words."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>WHAT exactly happens</strong> — translates customer-language to engineering-categories. 'Lights go funny' becomes 'flicker', 'dim brief', 'flash off-on', 'colour shift' — each maps to different fault hypotheses.</li>
              <li><strong>WHEN did it start</strong> — gradual onset (HRJ developing, water ingress progressing) vs sudden (component failure, vermin damage, lightning event).</li>
              <li><strong>WHERE in the property</strong> — single circuit (focus there), multiple circuits but one phase (phase issue), all circuits (supply issue), correlated with specific room (load issue).</li>
              <li><strong>WHY do you think</strong> — customer's hypothesis. Often wrong but contains useful clues ('it started after the storm' = consider transient damage; 'it only happens when the kettle boils' = voltage drop / cumulative load).</li>
              <li><strong>WHAT'S CHANGED</strong> — recent building work, new appliances, recent EICR / repair work, new neighbours' equipment. The change is often the cause.</li>
              <li><strong>WHAT'S WORKED</strong> — previous fixes attempted, by whom, when. Avoids repeating dead-ends.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 2 — hypothesis formulation</ContentEyebrow>

          <ConceptBlock
            title="The candidate-hypothesis approach — three to five competing explanations"
            plainEnglish="Don't lock onto one hypothesis too early. List three to five candidates that could explain the symptoms; design tests to discriminate between them. The right answer often isn't the most obvious one."
            onSite="The L3 apprentice's discipline: write out the candidates explicitly (on the job sheet, in the head, in a notebook) before testing. Each candidate gets ranked for prior probability (based on customer info, visual inspection, symptom pattern). Then design the most-discriminating test — the one whose result eliminates the most candidates."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>List candidates</strong> — minimum 3, maximum 5. Each must be a plausible cause of the observed symptoms.</li>
              <li><strong>Rank by prior</strong> — based on age of installation, customer info, recent changes, visual signs. Highest-prior candidate gets first test.</li>
              <li><strong>Most-discriminating test</strong> — pick the test whose result divides the candidates fastest. Avoid tests where every candidate gives the same result.</li>
              <li><strong>Update on result</strong> — Bayesian update: a positive result strongly supporting candidate A reduces probability of B, C, D. Re-rank after each test.</li>
              <li><strong>Confirmation bias trap</strong> — don't only test what would CONFIRM your favourite candidate. Always include at least one test that would FALSIFY it.</li>
              <li><strong>Document the reasoning</strong> — write down hypotheses and test plan before testing. Forces the discipline.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 3 — test planning and instrument selection</ContentEyebrow>

          <ConceptBlock
            title="Choosing tests by speed, cost and discrimination"
            plainEnglish="Tests have different costs (time, customer impact, equipment cost) and different discriminating power. Cheap tests first, expensive tests later, but only if needed."
            onSite="Standard test ladder for fault diagnosis: (1) visual + customer interview (free, takes minutes); (2) live tests with multimeter / clamp meter (low cost, no isolation, low risk); (3) thermal imaging (low cost if firm has the camera, no isolation, non-invasive); (4) targeted live MFT tests like EFLI Hi-Z (low risk, no isolation needed); (5) dead tests requiring isolation (continuity, R1+R2, IR — modest customer impact); (6) PQ analyser deployment (significant equipment, multi-day); (7) specialist tests (motor analyser, low-resistance ohmmeter)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Test ranking</strong> — speed × discriminating-power. Fast and discriminating wins (e.g. clamp meter for cumulative leakage).</li>
              <li><strong>Customer-impact factor</strong> — tests requiring isolation have customer impact; weigh against discriminating power.</li>
              <li><strong>Equipment availability</strong> — thermal camera, PQ analyser, motor analyser may need booking from firm's tool store.</li>
              <li><strong>Stop-criteria</strong> — define before testing what result means 'fault confirmed' vs 'continue investigation'. Prevents over-testing.</li>
              <li><strong>Documentation plan</strong> — what readings to record, in what units, on what form. Job sheets / certificates.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 4 — execute tests safely under Reg 643</ContentEyebrow>

          <ConceptBlock
            title="The dead-then-live test sequence and what it tells you"
            plainEnglish="Stage 4 is the test execution. BS 7671 Reg 643.7.1 (TN systems verification of automatic disconnection) sets the principle: confirm fault protection by measuring earth fault loop impedance and verifying the protective device characteristics. The dead-then-live order is non-negotiable — visual, continuity, IR at 500 V (or 250 V with electronics connected per the A4:2026 redraft of Reg 643.3), polarity, then live for Zs and RCD operation. Skipping a step or running them out of order leaves gaps in the diagnostic evidence."
            onSite="On a fault job the test sequence is targeted by the hypothesis from stage 2. If your hypothesis is 'HRJ at the consumer unit', the test ladder runs: visual at the CU, continuity of the suspect circuit, IR at 500 V with the load disconnected, polarity, then a load test with a clamp meter to find the voltage drop under high current. If your hypothesis is 'failed RCD on the EV charger circuit', the ladder runs: A4:2026 single AC test at 1×IΔn on the RCBO, leakage clamp at L+N to find the steady-state residual, then circuit-by-circuit isolation to localise."
          >
            <p>
              The Reg 643 test ladder applied to fault diagnosis:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection (Reg 642.2)</strong> — three-part check: BS / EN
                product compliance, correct selection and erection per manufacturer's
                instructions, no visible damage that impairs safety. Free, fast,
                discriminating.
              </li>
              <li>
                <strong>Continuity tests</strong> — CPC continuity end-to-end with a
                low-resistance ohmmeter; ring final continuity if the circuit is a ring.
                Catches broken CPCs and incomplete rings before any energisation.
              </li>
              <li>
                <strong>Insulation resistance (Reg 643.3)</strong> — 500 V on isolated
                wiring (electronics disconnected), 250 V on the same circuit with
                electronics reconnected. Two-stage test catches both wiring degradation
                and as-installed equipment leakage.
              </li>
              <li>
                <strong>Polarity</strong> — line and neutral correct at every point.
                Polarity errors are typically C2 on EICR.
              </li>
              <li>
                <strong>Earth fault loop impedance (Zs)</strong> — measured with a loop
                tester at the furthest point of each final circuit. Compared to Table 41.3
                / 41.4 maximum for the protective device. The B32 max is 1.37 Ω in A4:2026.
              </li>
              <li>
                <strong>RCD operating time (Reg 643.7.3)</strong> — single AC test at
                1×IΔn per the A4:2026 redraft. Operating time recorded against BS EN 61008
                / 61009 limits. Drifted RCDs replaced regardless of other findings.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stages 5-7 — analysis, fix design, execution</ContentEyebrow>

          <ConceptBlock
            title="From test results to corrective action — the analysis-design-execute loop"
            plainEnglish="Test results tell you what's wrong. Designing the fix means weighing repair vs replace, considering compliance impact, planning customer communication, scheduling parts and time. Execution is the physical work — but it's the design step that determines whether the fix lasts."
            onSite="The L3 apprentice's analysis stage looks at: what does this reading tell me about the system? Does it match my hypothesis? Are there any results that contradict? Can I confirm the root cause with one more test? The fix-design stage looks at: what's the minimum scope of work to fix this? What's compliant under BS 7671? What's economic? What does the customer expect? What documentation will the firm need?"
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Result interpretation</strong> — read against expected (BS 7671 limits, design values, manufacturer specs). Document any out-of-range readings.</li>
              <li><strong>Root cause vs symptom</strong> — confirm you've found the cause, not just an effect. Test by predicting what fixing the root cause will do.</li>
              <li><strong>Repair vs replace</strong> — Sub 5.1 covers this in depth. Repair is usually cheaper; replace is usually more reliable; depends on age, accessibility, compliance.</li>
              <li><strong>Compliance check</strong> — does the fix bring the installation up to current BS 7671? Or just restore to prior state? A4:2026 may force upgrades (AFDD, SPD, Type A/B RCD).</li>
              <li><strong>Customer brief</strong> — explain the fault, the fix, the cost, the timeline. Get customer agreement before starting.</li>
              <li><strong>Execution</strong> — isolation, work, retest, restore, document. Then the certification (Minor Works Cert for single-circuit, EICR if multi-circuit work was done).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Seven stages: collect symptoms, formulate hypothesis, plan tests, execute tests, analyse results, formulate fix, execute fix.",
              "Hypothesis stage (2) is the most important — drives the test plan; targeted tests vs random testing is 30 minutes vs 4 hours.",
              "Iterative loop between stages 2–5: update hypothesis when test results don't match; keep iterating until hypothesis explains all evidence.",
              "Symptoms are what customer notices; faults are underlying engineering conditions. Diagnosis is the mapping process.",
              "Test ordering: safety (dead before live), discrimination (most-narrowing first), cost (quick / free before slow / expensive).",
              "Visual inspection at stage 1 catches the easy 30% of faults — scorched terminals, water marks, signs of past faults — before any instrument used.",
              "Document each stage on the job sheet — symptoms, hypothesis, test plan, results, analysis, fix plan, fix execution. Defensible diagnostic narrative.",
              "Even 'obvious' fixes benefit from a mental run-through of the stages. Apprentices who skip find the cases where obvious was wrong.",
            ]}
          />

          <Quiz title="Logical stages of diagnosis — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-5')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.5 Special precautions</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.2 Identifying supply + tests</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
