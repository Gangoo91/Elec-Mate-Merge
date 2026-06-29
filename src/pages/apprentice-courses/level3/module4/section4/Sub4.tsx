/**
 * Module 4 · Section 4 · Subsection 4 — 5-Whys root cause + engineering decision
 * Maps to C&G 2365-03 / Unit 303 / LO6 / AC 6.2 + 6.3
 *   AC 6.2 — "evaluate and apply appropriate fault diagnosis methods and techniques"
 *   AC 6.3 — "diagnose electrical faults using engineering decision and evaluation of symptoms and findings"
 *
 * Frame: the 5-Whys discipline applied to electrical faults — finding the
 * ROOT cause (the design / installation / maintenance failure) rather than
 * just the visible symptom. Engineering decision-making — when to repair vs
 * replace, when to recommend redesign, when to escalate.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  '5-Whys root cause + engineering decision (4.4) | Level 3 Module 4.4.4 | Elec-Mate';
const DESCRIPTION =
  'The 5-Whys discipline applied to electrical faults — finding the ROOT cause (design / installation / maintenance failure) rather than just the visible symptom. Engineering decision-making for repair vs replace, redesign, escalation.';

const checks = [
  {
    id: 'mod4-s4-sub4-5whys',
    question:
      "What's the 5-Whys discipline and how does it apply to electrical fault diagnosis?",
    options: [
      "5-Whys means testing the circuit five times to be sure of the reading. You repeat each MFT measurement five times and average them, because a single reading can be wrong; the 'why' refers to questioning whether each reading is reliable. It is a calibration discipline, not a diagnostic one.",
      "5-Whys is a root-cause technique from manufacturing — ask 'why?' repeatedly to drill from the symptom to the underlying cause. Breaker trips → earth leakage → water in a JB → a ceiling-void leak → a wrong-rated valve at install. Fix the JB alone and the leak returns; the 5-Whys exposes the valve as the root.",
      "5-Whys is the five mandatory questions you ask the customer at the start of a job — name, address, what happened, when, and how much they want to spend. It is a booking checklist that captures the job details before you arrive, and has nothing to do with finding the cause of a fault.",
      "5-Whys is the rule that you must check five possible fault locations before condemning a circuit — the CU, the sockets, the switches, the junction boxes and the cable. You inspect all five in turn and whichever is faulty is the answer; it is a fixed inspection route, not a way of reasoning about causes.",
    ],
    correctIndex: 1,
    explanation:
      "5-Whys is a root-cause technique from the Toyota Production System: asking 'why?' five times drills past the immediate cause (level 1) to the design / installation / maintenance failure (level 5). A worked chain: breaker trips → earth leakage → water in a JB → ceiling-void leak → failed valve seal → wrong-rated valve at install. Without it you fix the JB and the leak returns; with it you fix the valve too. Each level has its own corrective action, and the customer needs both fixes specified in the quote. For electrical work the typical chain runs symptom → fault → mechanism → installation choice → design / specification.",
  },
  {
    id: 'mod4-s4-sub4-decision',
    question:
      "What's the engineering decision framework for 'repair vs replace' on a faulty component?",
    options: [
      "Weigh four factors — cost (lean to replace if repair exceeds 60–70% of replacement), reliability (refurbished parts rarely match new), compliance (replacement may be needed to meet current standards), and schedule (including parts lead time). When the choice isn't obvious, quote both options to the customer.",
      "Always repair, never replace. Replacing a working component wastes the customer's money, so the rule is to repair whatever is faulty regardless of cost or reliability; replacement is only ever justified when the part is physically missing.",
      "Always replace, never repair. Electrical components can never be safely repaired, so any faulty item must be swapped for new every time; cost, reliability and schedule do not enter into it because repair is not permitted under BS 7671.",
      "Decide purely on which the customer prefers on the day. Repair-vs-replace is entirely a matter of taste, so you simply ask the customer which they want and do that; there are no engineering factors to weigh because both outcomes are equivalent.",
    ],
    correctIndex: 0,
    explanation:
      "Repair-vs-replace is one of the L3 engineering judgment calls. Sub 5.1 covers the factors in detail; the engineering principle is — match the fix to the root cause AND the long-term reliability needs. Replacing the visible component when the root cause is upstream just creates the next failure.",
  },
  {
    id: 'mod4-s4-sub4-engineering',
    question:
      "What's the difference between a 'symptom-level fix' and a 'root-cause fix'?",
    options: [
      "A symptom-level fix is the dead-test stage and a root-cause fix is the live-test stage. You first fix what the dead tests reveal, then re-energise and fix what the live tests reveal; the two terms simply mark which testing phase the repair came from.",
      "A symptom-level fix is one done under supervision and a root-cause fix is one done unsupervised. The terms describe who signs off the work, not what the work addresses; an apprentice does symptom-level fixes and an Approved Electrician does root-cause fixes.",
      "A symptom-level fix addresses the visible problem (replace the burnt socket, reset the breaker) — quick and cheap but recurs if the root persists. A root-cause fix addresses the design / installation / maintenance failure behind it (upsize the undersized cable, redesign the ring) — slower and dearer but lasting. Do both where possible and quote both.",
      "A symptom-level fix is a temporary repair and a root-cause fix is a permanent one, but both address the same thing. The difference is only how long the repair lasts — a symptom-level fix uses temporary connectors and a root-cause fix uses soldered joints; neither looks beyond the visible fault.",
    ],
    correctIndex: 2,
    explanation:
      "The two-level fix is the L3 engineering approach. Symptom-level fix gets the customer back in service quickly; root-cause fix prevents the comeback. Both are needed for true diagnostic completion. The customer makes the commercial call on whether to authorise both; the firm has a duty to recommend both.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Apply the 5-Whys to a customer reporting 'breaker keeps tripping when I plug in the kettle' and identify each level.",
    options: [
      "(1) Why does the breaker trip? — the kettle is faulty. (2) Why is the kettle faulty? — the customer bought a cheap one. (3) Why did they buy a cheap one? — to save money. (4) Why save money? — they are on a budget. (5) Why a budget? — household income. Root cause: low household income. Fix: advise the customer to buy a more expensive kettle and the tripping will stop.",
      "(1) Why does the breaker trip? — overload current exceeds B-rating magnetic threshold (kettle 12 A inrush + existing load). (2) Why does the existing load + kettle exceed threshold? — too many loads on the same circuit. (3) Why too many loads? — kitchen ring designed in 1995 for fewer high-current appliances; modern kitchen has more. (4) Why the design is inadequate? — original installer specified to current consumption at the time, no margin for future appliance growth. (5) Why no margin? — no design standard for future-proofing kitchen circuits in 1995; standard practice was to size to immediate need. Root cause: undersized circuit for modern usage. Fix: upgrade to 32 A circuit with appropriate protection, OR redistribute appliances across multiple circuits, OR add additional kitchen circuit.",
      "(1) Why does the breaker trip? — it is worn out. (2) Why is it worn? — it is 30 years old. (3) Why is it still fitted? — never replaced. (4) Why never replaced? — no EICR done. (5) Why no EICR? — owner unaware. Root cause: the breaker itself is at end of life. Fix: replace the single breaker and the kettle will run normally on the existing circuit.",
      "(1) Why does the breaker trip? — the supply voltage is too high. (2) Why is it high? — DNO network. (3) Why does that trip the breaker? — over-voltage. (4) Why not fix it? — DNO responsibility. (5) Why involve the DNO? — supply fault. Root cause: high incoming supply voltage. Fix: ask the DNO to lower the supply and the kettle circuit will stop tripping.",
    ],
    correctAnswer: 1,
    explanation:
      "The 5-Whys reveals the root cause is design-era vs current-usage mismatch — common in older properties. The visible symptom (breaker trip) is just the surface; the root is the circuit design. Customer fixes range from cheap (redistribute loads) to expensive (rewire the kitchen).",
  },
  {
    id: 2,
    question: "What questions should you ask when assessing whether to repair or replace a faulty 25-year-old MCB?",
    options: [
      "Only one question matters — how much does a new MCB cost? If the replacement is cheaper than an hour's labour, fit it; if not, repair the old one. Age, parts availability and the condition of the consumer unit are irrelevant to the decision.",
      "None — a 25-year-old MCB must always be repaired in place to preserve the original installation. Replacing it would invalidate the existing certificate, so the only acceptable action is to open the device, clean the contacts and refit it.",
      "Ask whether the part is still available, whether repair is even possible (most MCBs are sealed), whether the existing MCB-only design is still appropriate or now wants an RCBO, whether a modern device will fit the busbar, and what the overall CU age and condition is. It's rarely just 'repair vs replace one device'.",
      "Just ask whether the MCB still trips on its test button. If it trips, it is fine and needs no action; if it does not, replace it. The age of the device, the type of protection and the state of the board never enter the decision.",
    ],
    correctAnswer: 2,
    explanation:
      "The five questions are: is the part available (older MCBs may be obsolete); is repair possible (most are sealed units, so 'repair' usually means swap); is the existing MCB-only design still appropriate or does it now want an RCBO; will a modern device fit the busbar (some old CUs need full replacement); and what is the overall CU age and condition (a 25–30-year-old board may itself be at end of life). Replacing one MCB just prolongs the inevitable; the L3 engineering decision considers the system, not just the component.",
  },
  {
    id: 3,
    question: "When is the right answer to 'recommend rewire' rather than 'repair'?",
    options: [
      "Whenever a single circuit fails a test. Any failed Zs, IR or RCD result on one circuit means the whole installation is unsafe, so the correct recommendation is always a full rewire rather than repairing the affected circuit.",
      "Whenever the consumer unit is plastic rather than metal. A plastic CU is obsolete, so the only compliant fix is to rewire the property; repairing a circuit on a plastic-board installation is not permitted under current standards.",
      "Whenever the customer asks for one. Rewiring is a customer-choice matter, so you recommend it only if they request it; there are no technical conditions that would lead an electrician to suggest a rewire of their own accord.",
      "When cable is at end of life (rubber, VIR, pre-1970s lead-sheathed with declining IR), when multiple C1/C2 findings aren't economically repairable individually, when repair would destroy significant building fabric, when a renovation makes rewiring while building, or on a change of use needing a different spec. The L3 recognises these and escalates the call.",
    ],
    correctAnswer: 3,
    explanation:
      "Rewire recommendation is an engineering judgment call, not a default. The triggering conditions are: cable type at end of life with declining IR and regular faults; multiple Code 1 / Code 2 findings not economically repairable one by one; repair that would require chasing whole rooms; a planned renovation where rewiring while building work happens is economical; and a change of use (e.g. residential to HMO) needing a different specification. The L3 apprentice doesn't normally make this call — it's improver / Approved Electrician / consultant level — but should recognise the indicators and escalate. Rewire is a major capital decision and the recommendation needs to be defensible.",
  },
  {
    id: 4,
    question: "What's an 'engineering compromise' and when is it appropriate in fault diagnosis?",
    options: [
      "A solution that's less than the textbook ideal but acceptable given constraints (cost, time, fabric, budget) — e.g. a dedicated circuit instead of a full kitchen rewire. It's legitimate only if it stays BS 7671 compliant, the limitations are documented and accepted in writing, and the firm's indemnity covers it. Compromise is engineering, not corner-cutting.",
      "Engineering compromise means cutting a corner the customer won't notice. When the budget is tight you quietly skip a test or re-use a damaged accessory, because the customer is happy and the saving keeps the job profitable; it is a normal part of fixed-price work.",
      "Engineering compromise means meeting the customer halfway on price by doing half the work now and half later. You complete the cheap part of the fix on this visit and leave the rest unfinished until they can afford it, even if the installation is left non-compliant in the meantime.",
      "Engineering compromise is the agreement between the electrician and the building inspector to overlook a minor regulation breach. When a fix can't quite meet BS 7671, you agree with Building Control to sign it off anyway on the understanding it will be corrected at the next EICR.",
    ],
    correctAnswer: 0,
    explanation:
      "Real engineering involves compromise. The customer's budget, the building fabric, the time available, the firm's competence — all constrain the ideal solution. The L3 apprentice's role is recognising when a compromise is appropriate (within compliance) vs a corner-cut (below compliance). The supervisor / senior makes the call on borderline cases.",
  },
  {
    id: 5,
    question: "How do you communicate engineering decisions to a customer who isn't technical?",
    options: [
      "Use the full technical detail so they understand exactly what is wrong. Quote the measured Zs, the Table 41.3 limit, the R1+R2 figure and the BS 7671 regulation numbers; a customer who hears the precise readings will trust your diagnosis and pick the right option on their own.",
      "Plain English plus cost — explain the fault simply and offer two or three priced options (e.g. manage the load yourself, add a dedicated circuit, or rewire the kitchen), each marked safe and differing only on cost and convenience. The customer makes the commercial call from a clear technical position.",
      "Decide for them and present a single instruction. The customer isn't qualified to choose between options, so you tell them exactly what work you are going to do and how much it costs; offering choices only confuses a non-technical person and slows the job down.",
      "Avoid mentioning cost until the work is finished. Discussing money up front makes the customer anxious, so you explain the fault in general terms, complete whichever repair you judge best, and present the bill at the end once the problem is solved.",
    ],
    correctAnswer: 1,
    explanation:
      "Customer communication is part of the L3 engineering competence. Plain English + cost + safety implication. Customers can make sensible decisions if you explain the trade-offs clearly. The 'just tell them' approach (or jargon-heavy explanation) loses the customer and creates dispute risk.",
  },
  {
    id: 6,
    question: "What's the engineering response when you find a fault that suggests broader problems with the installation?",
    options: [
      "Fix only the immediate fault and say nothing about the broader concerns. You were called for one problem, so anything else you notice is outside your remit; mentioning it would only worry the customer and risk losing the job to a competitor.",
      "Fix everything you find on the spot, within the day, without separate authorisation. A duty of care means you must rectify every defect you observe immediately, so you extend the work to cover the broader issues and add them to the invoice afterwards.",
      "Fix the immediate fault within the authorised scope, document the broader concerns on the job sheet, and inform the customer in writing with an offer to quote for further investigation. The customer decides whether to authorise more; without the record the firm has no defensible evidence it identified the issues.",
      "Stop all work and refuse to complete even the immediate fault until the customer authorises a full investigation of the broader issues. Leaving any concern unaddressed would make you liable, so you down tools until they agree to the whole package.",
    ],
    correctAnswer: 2,
    explanation:
      "Broader-issue identification is the L3 engineering judgment that adds value beyond fixing one fault. The customer's right to choose what to authorise is preserved; the firm's duty to inform is satisfied; the documentation provides the audit trail.",
  },
  {
    id: 7,
    question: "When should an L3 apprentice escalate a diagnosis decision to the supervisor rather than make it themselves?",
    options: [
      "Never — an L3 apprentice is expected to make every decision alone. Escalating to the supervisor is a sign of weakness that will hold back your progression, so you should always resolve the situation yourself, whatever the cost or complexity.",
      "Only when you have caused damage. The supervisor is there to deal with mistakes, so you escalate a diagnosis decision solely if something has gone wrong; routine judgement calls about scope, cost or coding are always yours to make alone.",
      "Only at the end of the job. You complete all the work first and then report your decisions to the supervisor for review; escalating mid-job interrupts the work and is discouraged, so any uncertainty is held back until the visit is finished.",
      "On clear triggers — a cost decision over the firm's threshold (typically £500), a C1/C2 coding judgment, a borderline engineering compromise, a customer dispute, specialist work outside L3 competence (HV, three-phase plant, BMS, fire alarm), and anything you're unsure about. Escalation is competence, not weakness; the supervisor is paid to make the harder calls.",
    ],
    correctAnswer: 3,
    explanation:
      "Escalation triggers are part of the L3 apprentice's professional discipline: a cost decision over the firm's budget threshold (typically £500); a Code 1/2 finding needing a coding judgment; an engineering compromise that may not be straightforward compliance; a customer dispute over scope or quality; specialist work outside L3 competence; and anything you're not sure about. Knowing where your competence stops is the EAWR Reg 16 'competent person' duty, and the habit of escalating early is a sign of competence, not weakness.",
  },
  {
    id: 8,
    question: "What's the role of customer education in fault diagnosis outcomes?",
    options: [
      "Significant — many faults recur because the customer's behaviour caused them (overloaded extensions, heaters on lighting circuits, simultaneous high loads). A brief verbal explanation of the cause plus a written summary on the job sheet prevents most behaviour-related comebacks. Their informed cooperation is a large part of the fix.",
      "None — customer education has no place in fault diagnosis. Your job is to fix the wiring and leave; explaining the cause to a non-technical person is a waste of time because they will not understand and it makes no difference to whether the fault returns.",
      "It is counter-productive. Telling the customer what caused the fault encourages them to attempt their own repairs next time, which is dangerous, so the safest approach is to say as little as possible and simply complete the work.",
      "It only matters on commercial sites. Domestic customers cannot affect their installation through behaviour, so education is reserved for facilities managers; on a house you fix the fault and there is nothing the occupier could do differently to prevent it recurring.",
    ],
    correctAnswer: 0,
    explanation:
      "Customer education is one of the highest-leverage things an electrician does. A 5-minute brief on what caused the fault and how to avoid it can prevent the next comeback. The L3 apprentice builds the habit through deliberate practice — every job ends with a brief explanation to the customer.",
  },
];

const faqs = [
  {
    question: "Doesn't 5-Whys take too long for normal jobs?",
    answer:
      "It takes seconds when the answer is obvious. 'Why did the bulb fail?' — 'It reached end of life'. Done — 1 why is enough. The full 5-Whys is for non-obvious faults where the immediate cause might just be a symptom of something deeper. The discipline scales: trivial faults need 1–2 whys; complex / recurring faults need 4–5. The L3 apprentice's judgment is when to drill deeper.",
  },
  {
    question: "How do I learn to think in root causes when I'm trained to fix symptoms?",
    answer:
      "Practice. Every job, ask 'why?' once more after you've identified the immediate cause. Why did this socket burn out? Loose terminal. Why was it loose? Wasn't tightened properly OR thermal cycling loosened it. If wasn't tightened — installer error (root cause). If thermal cycling — chronic overload (root cause). Each step deeper takes practice. Senior electricians do it automatically; apprentices do it deliberately. The discipline becomes muscle memory over months.",
  },
  {
    question: "What if the root cause is something I can't fix (e.g. customer behaviour or original design)?",
    answer:
      "Document and communicate. The fix doesn't have to be your action — it can be the customer's behaviour change, an additional circuit installed by someone else, a redesign by a consultant. Your role is identifying the root cause, recommending the fix, documenting both. The customer decides whether and how to act. The DCN form and the job sheet capture your recommendation and the customer's response.",
  },
  {
    question: "Is it safe to make engineering compromises if BS 7671 has a clear answer?",
    answer:
      "Compromise must be WITHIN compliance, not below it. BS 7671 is the floor. Any solution must meet BS 7671 even if it's not the textbook ideal. Example compromise: instead of full kitchen rewire (textbook ideal), add a dedicated 32 A radial for the high-load appliances (compliant alternative that costs less). Both meet BS 7671; the cheaper option is acceptable engineering. Below BS 7671 is not engineering compromise — it's non-compliance.",
  },
  {
    question: "How do I justify recommending a more expensive fix when the customer wants the cheap option?",
    answer:
      "Honestly. Explain what each option does and doesn't address. 'The cheap fix gets you working today but doesn't address the underlying issue, so you may have the same problem in 6–12 months. The expensive fix addresses the underlying issue, so the problem doesn't return. Both are safe; they differ on long-term value. Which fits your situation?'. Customer makes the call with full information. Firm has a defensible record. The L3 apprentice's job is information delivery, not decision-making for the customer.",
  },
  {
    question: "What if the customer always picks the cheapest option and it always comes back?",
    answer:
      "Document, document, document. Every time the customer picks the cheap option, document the recommendation and the customer's choice. After 2–3 rounds of recurring faults, the firm has a defensible position to either (a) require the customer to accept the recommended fix as a condition of further work, (b) decline future work on the basis that the customer's choice is creating unsafe conditions, (c) escalate to the customer's insurance / property owner if applicable. The documentation supports each path.",
  },
];

export default function Sub4() {
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
            eyebrow="Module 4 · Section 4 · Subsection 4"
            title="5-Whys root cause + engineering decision"
            description="The 5-Whys discipline applied to electrical faults — finding the ROOT cause (design / installation / maintenance failure) rather than just the visible symptom. Engineering decision-making for repair vs replace, redesign, escalation. Customer communication of engineering trade-offs."
            tone="emerald"
          />

          <TLDR
            points={[
              "5-Whys drives diagnosis past the symptom (level 1) to the root cause (level 5). Each level has its own corrective action; root-cause fixes prevent recurrence.",
              "Engineering decision: repair vs replace vs redesign — multi-factor (cost, reliability, compliance, schedule). Quote multiple options when not obvious.",
              "Engineering compromise is acceptable IF within BS 7671 compliance, documented, communicated, and customer-accepted. Below BS 7671 is non-compliance, not compromise.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the 5-Whys root-cause technique to electrical faults — drill from symptom to design / installation / maintenance failure.",
              "Distinguish symptom-level fix (immediate) from root-cause fix (preventative); recommend both where possible.",
              "Make engineering decisions on repair vs replace based on cost, reliability, compliance, schedule.",
              "Recognise when to recommend rewire rather than repair (cable end-of-life, multiple EICR codes, building fabric, change of use).",
              "Apply engineering compromise within BS 7671 compliance — never below.",
              "Communicate engineering trade-offs to non-technical customers using plain English + cost + safety implication.",
              "Escalate to supervisor on cost / coding / scope / specialist / uncertain decisions.",
              "Educate the customer on fault causes and prevention — significant share of recurrent faults are behaviour-related.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The 5-Whys root cause discipline</ContentEyebrow>

          <ConceptBlock
            title="From symptom to root in five questions"
            plainEnglish="The visible problem is rarely the cause. 5-Whys drills past the symptom to the design / installation / maintenance failure underneath. Each level has its own corrective action; the root-cause fix prevents recurrence."
            onSite="Senior electricians do this automatically. Apprentices do it deliberately. The discipline becomes muscle memory over months of practice. Every job, ask 'why?' once more after you've identified the immediate cause."
          >
            <p>Worked example: 'breaker keeps tripping when I plug in the kettle'</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Why 1:</strong> Why does the breaker trip? — Overload current exceeds magnetic threshold.</li>
              <li><strong>Why 2:</strong> Why is current that high? — Existing load + kettle inrush exceeds breaker rating.</li>
              <li><strong>Why 3:</strong> Why too much load? — Too many high-current appliances on the same circuit.</li>
              <li><strong>Why 4:</strong> Why is the circuit inadequate? — Designed in 1995 for fewer / lower-rated appliances; modern kitchen has more.</li>
              <li><strong>Why 5:</strong> Why no future-proofing? — No design margin standard at the time; original installer sized to immediate need.</li>
            </ul>
            <p>
              Root cause: undersized circuit for modern usage. Symptom-level fix (reset breaker, adjust load timing) doesn't address the root. Root-cause fix (upgrade circuit / add dedicated radial / rewire kitchen) prevents recurrence.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 134.1.1 (Workmanship and equipment)"
            clause={<>"Good workmanship by competent persons or persons under their supervision and proper materials shall be used in the erection of the electrical installation. The installation of equipment shall take account of manufacturers' instructions."</>}
            meaning={<>Reg 134.1.1 captures the installer\'s professional duty — the work must reflect competent decision-making, not just box-ticking. Engineering decisions about repair vs replace, design vs patch, are part of the 134.1.1 workmanship standard. The L3 apprentice\'s diagnostic decisions contribute to the firm\'s compliance with this regulation.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 134.1.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>The engineering decision framework</ContentEyebrow>

          <ConceptBlock
            title="Repair vs replace vs redesign vs escalate"
            plainEnglish="Once you know the root cause, the engineering decision is what to do about it. Multi-factor — cost, reliability, compliance, schedule, customer constraints. Rarely a single 'right' answer; usually a set of options with trade-offs."
          >
            <p>The four-factor framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>COST</strong> — repair (parts + labour) vs replacement vs redesign. If repair &gt;60–70% of replacement, lean to replace.</li>
              <li><strong>RELIABILITY</strong> — repaired vs new. New components rarely matched by repaired ones for long-term reliability.</li>
              <li><strong>COMPLIANCE</strong> — replacement may be required to meet current standards (older accessories may not satisfy A4:2026).</li>
              <li><strong>SCHEDULE</strong> — repair time + parts lead time vs replacement time + parts lead time.</li>
            </ul>
            <p>
              For non-obvious decisions, quote multiple options to the customer. Plain English + cost + safety implication of each. Customer makes the commercial call.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Engineering compromise vs corner-cutting</ContentEyebrow>

          <ConceptBlock
            title="The line between acceptable and below-spec"
            onSite="Engineering compromise is acceptable IF the solution remains BS 7671 compliant. Below compliance is corner-cutting, not compromise. The L3 apprentice learns to recognise the line."
          >
            <p>Acceptable compromise (within BS 7671):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Add a dedicated circuit for high-load appliance instead of full kitchen rewire (compliant; cheaper).</li>
              <li>Replace one tripping RCBO instead of full all-RCBO CU upgrade (compliant; cheaper, but addresses only the immediate device).</li>
              <li>Patch a damaged cable section instead of replacing the full run (compliant if patch meets jointing requirements; cheaper).</li>
              <li>Use a Type A RCD where Type B is preferable but not required for the specific load (compliant; cheaper).</li>
            </ul>
            <p>Corner-cutting (below BS 7671):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Re-using a damaged cable / accessory because the customer doesn't want to pay for new.</li>
              <li>Skipping the EFLI test because 'it\'ll be fine\'.</li>
              <li>Bypassing an RCD that nuisance-trips, instead of finding the cause.</li>
              <li>Using a Type AC RCD on a circuit that needs Type A or B — undetected non-protection.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.4"
            clause={
              <>
                "Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
              </>
            }
            meaning={
              <>
                Root cause is exactly the kind of underlying defect Reg 651.4 puts on you to record. When the 5-Whys turns up an undersized circuit, an unsuitable RCD type or a missing CPC, the report has to capture it &mdash; even if the customer hasn&apos;t authorised the fix yet. The record is what makes the firm&apos;s recommendation defensible later.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.4, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 641.5"
            clause={
              <>
                "For an addition or alteration to an existing installation, it shall be verified that the addition or alteration complies with BS 7671 and does not impair the safety of the existing installation."
              </>
            }
            meaning={
              <>
                Engineering decisions on a fault repair are nearly always &ldquo;additions or alterations&rdquo; under Reg 641.5. The dual test is: the new bit complies AND the existing bit isn&apos;t made worse. A budget compromise that papers over a root-cause fault would arguably impair the existing installation&apos;s safety case &mdash; that&apos;s the regulation that says the &ldquo;just bung a Wago in&rdquo; option isn&apos;t available.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 641.5, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Fixing the symptom and walking away from the root cause"
            whatHappens={<>Apprentice replaces a melted socket. Doesn't ask why it melted. Six months later same socket melts again — the upstream cable has an HRJ that's progressively damaging the downstream socket. They replace the socket again. Cycle continues for years until the upstream HRJ ignites the cable inside the wall — fire damage, customer complaint, insurance dispute. The 5-Whys would have identified the root cause on visit 1 and the firm could have quoted the upstream rectification.</>}
            doInstead={<>Always ask 'why?' once more after identifying the immediate cause. A burnt socket is the symptom; the cause is upstream. Inspect the upstream side; thermal-image under load; identify and rectify the actual heat source. Customer\'s choice to authorise both fixes — but the firm\'s duty is to identify and recommend both.</>}
          />

          <CommonMistake
            title="Engineering compromise that drifts into corner-cutting"
            whatHappens={<>Customer can't afford the recommended kitchen rewire. Apprentice (under pressure to keep customer happy) suggests 'we\'ll just add a Wago in-line connector at the suspect HRJ, that\'ll fix it\'. The Wago doesn't address the root cause (undersized cable for the load); the new connection becomes the next failure point in 6 months; customer comes back with the same problem. Worse — if the Wago is rated below the load, the connector itself becomes a fire risk. The 'compromise' was actually below BS 7671 (Reg 526.1 demands suitable mechanical strength for the load).</>}
            doInstead={<>Engineering compromise must satisfy BS 7671. If the customer can't afford the right fix, the firm has options: (1) Decline the work (better than installing something unsafe). (2) Quote a smaller scope that still meets BS 7671 (e.g. dedicated radial for the high-load appliance, deferring the wider kitchen). (3) Escalate to senior to make the call. Below-spec compromise is not an option.</>}
          />

          <Scenario
            title="Recurring kitchen breaker trip — the engineering decision"
            situation={<>You diagnose a recurring kitchen RCBO trip on a 1995-built domestic. Root cause: undersized circuit for modern kitchen load. Customer is older, on a fixed income, and has been managing by 'not running the kettle while the dishwasher is on\'.</>}
            whatToDo={<>(1) Document the root cause: undersized circuit for current load; symptoms will continue until addressed. (2) Quote three options to customer: (A) £0 — continue managing load timing; safe, no convenience improvement. (B) £550 — install dedicated 32 A radial for the high-load appliances (kettle, microwave, toaster); safe, full convenience, modest cost. (C) £2,200 — rewire kitchen with all-RCBO CU upgrade and additional circuits; safe, future-proofed, higher cost. (3) Explain trade-offs in plain English: 'A is fine if you\'re happy managing the timing; B fixes the immediate convenience issue; C addresses the root cause and prepares for future appliance additions\'. (4) Customer chooses option B. Document choice and reasoning. (5) Issue advisory note recommending option C as long-term plan. (6) Complete option B work; retest; restore. The customer\'s commercial decision is fully-informed; the firm has documented its recommendation; the work is fully BS 7671 compliant.</>}
            whyItMatters={<>The L3 engineering decision matches the fix to the customer\'s actual constraints (cost) while staying BS 7671 compliant AND documenting the recommended longer-term solution. The customer is treated as a partner in the engineering decision, not the decision-maker on safety. The firm\'s reputation, insurance position, and ongoing customer relationship are all served by the structured approach.</>}
          />

          <SectionRule />

          <ContentEyebrow>The 5-Whys discipline in practice</ContentEyebrow>

          <ConceptBlock
            title="5-Whys — drilling from symptom to root cause"
            plainEnglish="The 5-Whys technique iteratively asks 'why' until you reach a root cause. Symptom: RCD trips. Why? Cumulative leakage above 30 mA. Why? Multiple electronic loads on one circuit. Why? Original install had two circuits but renovation merged them. Why? Cost-cutting decision by previous installer. Why? No design review on the renovation works. The fifth 'why' identifies the systemic root cause."
            onSite="The L3 apprentice uses 5-Whys to distinguish symptom-fixing (replace the RCD) from root-cause-fixing (split the circuit). Document each 'why' on the job sheet; the chain of reasoning becomes the diagnostic record. Customer briefing then explains the root cause, not just the symptom — much more credible and educational."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>First why</strong> — immediate cause. Often a single faulty component (loose terminal, blown lamp).</li>
              <li><strong>Second why</strong> — cause of the cause. Why did the terminal loosen? (Vibration, over-tightening, undersized conductor).</li>
              <li><strong>Third why</strong> — design or installation issue. Why was the conductor undersized? (Calculation error, cost-cutting, change of use).</li>
              <li><strong>Fourth why</strong> — process or system issue. Why was there a calculation error? (No design review, rushed work, untrained installer).</li>
              <li><strong>Fifth why</strong> — root organisational issue. Why was there no design review? (Firm's process gap, training shortfall, customer pressure).</li>
              <li><strong>Stop when</strong> — you reach an organisational, training or process root cause that requires action beyond the immediate fix.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Repair vs replace decision</ContentEyebrow>

          <ConceptBlock
            title="The repair-vs-replace decision matrix"
            plainEnglish="When a fault is found, you can repair the failed component or replace it. The decision depends on: cost (parts + labour), reliability (how long will repair last), accessibility (can you reach it for future maintenance), compliance (is the existing item still BS 7671 compliant), and customer preference."
            onSite="The L3 apprentice gathers the factors and presents the recommendation to the customer with reasoning. Examples: a single failed RCBO in a 10-year-old Hager CU is typically replaced (RCBO ~£25, 30 minutes labour, restores full reliability); a faulty light switch in an MK Logic Plus accessory is typically replaced (switch insert ~£15); a damaged section of T+E cable in a wall is typically rewired (cable from accessory to accessory rather than splice in the wall); a failed motor on a domestic extractor is typically replaced as a complete unit."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Repair</strong> — typically chosen when the component is high-value (motor windings, switchgear), the fault is well-understood, and the repair brings as-new reliability.</li>
              <li><strong>Replace</strong> — typically chosen when component cost is low (RCBO, accessory), labour cost dominates, and replacement gives compliance + reliability.</li>
              <li><strong>Rewire local</strong> — for cable damage in inaccessible locations, often easier and more reliable to install a new cable parallel and disconnect the old.</li>
              <li><strong>Compliance considerations</strong> — older accessories may not meet current BS 7671. A repair preserves the non-compliant item; replacement upgrades to current standard.</li>
              <li><strong>Customer preference</strong> — some customers want minimum cost (repair), some want maximum reliability (replace), some want minimum disruption (whatever is fastest).</li>
              <li><strong>Document the decision</strong> — record the recommendation, the rationale, the customer's choice, on the job sheet.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Customer communication of engineering trade-offs</ContentEyebrow>

          <ConceptBlock
            title="Explaining engineering decisions in customer language"
            plainEnglish="The customer isn't an electrician. Engineering decisions need to be translated into language the customer can use to make their own commercial decision. Three options at three price points, with plain-English benefits and risks for each, lets the customer choose."
            onSite="Standard format: write three options as bullets, one line each, with cost. 'Option A — £0, manage load timing yourself, safe but inconvenient. Option B — £550, install dedicated kitchen circuit for high-load appliances, safe and convenient. Option C — £2,200, rewire kitchen with full circuit upgrade, safe, convenient and future-proofed.' Customer picks. Document. Quote and proceed."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Three options minimum</strong> — gives the customer a choice. Single option = take-it-or-leave-it.</li>
              <li><strong>Cost transparency</strong> — quote inclusive of parts, labour, certificates, restoration of building fabric.</li>
              <li><strong>Plain-English benefits</strong> — what each option does for the customer in their language.</li>
              <li><strong>Plain-English risks</strong> — what each option doesn't address, what might happen if not done.</li>
              <li><strong>Recommendation</strong> — which option do you recommend and why. Customer doesn't have to follow but appreciates the guidance.</li>
              <li><strong>Document the conversation</strong> — written summary on the job sheet. Customer's choice recorded. Protects firm if customer later disputes.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>When to escalate — the L3 authority limits</ContentEyebrow>

          <ConceptBlock
            title="When the engineering decision exceeds L3 apprentice authority"
            plainEnglish="Some decisions sit above L3 apprentice authority. Knowing where to escalate is part of the EAWR Reg 16 competence test. Standard escalation triggers: design changes (new circuits, CU upgrades, three-phase work), DNO interactions, certificate work requiring authorising signatory, complex commercial coordination."
            onSite="The L3 apprentice does fault diagnosis and repair under supervision. Major design changes (e.g. CU upgrade with new circuits) need an Approved Electrician or Qualified Supervisor to design, sign off and certify. Customer-facing decisions about scope and cost beyond the immediate fix go through the supervisor. Escalation is a phone call or text to the supervisor; usually resolved within minutes."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design changes</strong> — new circuits, CU upgrades, three-phase work. Approved Electrician design.</li>
              <li><strong>DNO interactions</strong> — open PEN, supply-side faults, service capacity changes. DNO directly, not apprentice.</li>
              <li><strong>Certificate work</strong> — Minor Works Cert, EICR, EIC. Requires authorising signatory; apprentice can complete the test work but not sign the certificate.</li>
              <li><strong>Customer disputes</strong> — when customer challenges the diagnosis or refuses safety advice. Escalate; don't argue on site.</li>
              <li><strong>Out-of-scope discoveries</strong> — finding work that wasn't on the brief (e.g. unsafe installation discovered while diagnosing another fault). Escalate to discuss scope with customer.</li>
              <li><strong>Commercial decisions</strong> — significant additional work, refunds, write-offs. Through supervisor and firm management.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Design failures vs installation failures vs maintenance failures</ContentEyebrow>

          <ConceptBlock
            title="Three categories of root cause — and what each implies"
            plainEnglish="Faults trace to one of three root-cause categories: design failure (the system was specified wrong), installation failure (the system was installed wrong), or maintenance failure (the system was specified and installed correctly but degraded over time). Each category implies a different scope of fix and a different responsibility chain."
            onSite="Design failure example: undersized cable for current load; fix requires upsize or load split; responsibility was original designer. Installation failure example: terminal under-torqued; fix requires re-termination; responsibility was original installer. Maintenance failure example: insulation aged due to thermal cycling; fix requires replacement; responsibility was scheduled maintenance regime. The L3 apprentice identifies which category and documents accordingly."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design failure</strong> — system specified wrong from the start. Fix is upsize / re-spec / split. Often discovered during fault analysis showing chronic overload, cumulative leakage, repeated nuisance trips.</li>
              <li><strong>Installation failure</strong> — system installed wrong. Fix is re-termination, re-route, re-strap. Often discovered as HRJs, broken CPCs, misidentified circuits.</li>
              <li><strong>Maintenance failure</strong> — system specified and installed correctly, degraded over time. Fix is replace component or update inspection regime. Often discovered as IR degradation, RCD slowing, accessory wear.</li>
              <li><strong>Mixed root cause</strong> — many faults have multiple contributing causes. Document each; address as needed.</li>
              <li><strong>Customer briefing</strong> — explain which category. Helps customer understand future risk and inspection priorities.</li>
              <li><strong>Firm learning</strong> — design failures may need firm-wide review; installation failures may need training updates; maintenance failures may need contract reviews.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "5-Whys drills from symptom to root cause. Each level has its own corrective action; root-cause fixes prevent recurrence.",
              "Symptom-level fix (immediate) + root-cause fix (preventative). Recommend both where possible; customer makes commercial decision.",
              "Engineering decision factors: cost, reliability, compliance, schedule. Quote multiple options for non-obvious decisions.",
              "Recommend rewire when cable type at end of life, multiple EICR codes, change of use, building work happening.",
              "Engineering compromise must satisfy BS 7671. Below-spec compromise is corner-cutting, not engineering.",
              "Customer communication: plain English + cost + safety implication. Three options with trade-offs lets customer choose.",
              "Escalate to supervisor on cost &gt; £500, Code 1/2 EICR coding, engineering compromise borderline, customer dispute, specialist work.",
              "Customer education prevents 60–80% of behaviour-related recurrent faults. Brief verbal + written summary at every job completion.",
            ]}
          />

          <Quiz title="5-Whys + engineering decision — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.3 Analysing test results</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next section <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">§5 Rectification + retesting</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
