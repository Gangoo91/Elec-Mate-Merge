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
      "Just guessing.",
      "5-Whys is a root-cause analysis technique from manufacturing (Toyota Production System). Ask 'why?' five times to drill from symptom to root cause. Example: (1) Why did the breaker trip? — earth leakage. (2) Why was there earth leakage? — water in junction box. (3) Why was there water? — ceiling void leak. (4) Why was there a leak? — failed valve seal. (5) Why did the valve fail? — installed wrong rating for the pressure. Root cause: wrong-rated valve at install. Without the 5-Whys, you'd fix the JB (level 2 cause) but the leak returns. With it, you fix the valve too (root cause). Customer needs both fixes; firm needs to specify both in quotes.",
      "Just one why.",
      "Random.",
    ],
    correctIndex: 1,
    explanation:
      "5-Whys forces you past the immediate cause (level 1) to the design / installation / maintenance failure (level 5). For electrical work, the typical chain runs: symptom → fault → mechanism → installation choice → design / specification. Each level has its own corrective action; root-cause fixes prevent recurrence.",
  },
  {
    id: 'mod4-s4-sub4-decision',
    question:
      "What's the engineering decision framework for 'repair vs replace' on a faulty component?",
    options: [
      "Always replace.",
      "Four factors. (1) COST — cost of repair (parts + labour) vs cost of replacement; if repair is more than 60–70% of replacement cost, lean to replacement. (2) RELIABILITY — repaired component vs new component reliability; refurbished electrical components rarely match new for long-term reliability. (3) COMPLIANCE — replacement may be required to meet current standards (older accessories may not meet A4:2026 specifications). (4) SCHEDULE — repair time vs replacement time + lead time for parts. The decision is multi-factor; quote both options to the customer when the choice isn't obvious.",
      "Always repair.",
      "Random.",
    ],
    correctIndex: 1,
    explanation:
      "Repair-vs-replace is one of the L3 engineering judgment calls. Sub 5.1 covers the factors in detail; the engineering principle is — match the fix to the root cause AND the long-term reliability needs. Replacing the visible component when the root cause is upstream just creates the next failure.",
  },
  {
    id: 'mod4-s4-sub4-engineering',
    question:
      "What's the difference between a 'symptom-level fix' and a 'root-cause fix'?",
    options: [
      "Same thing.",
      "SYMPTOM-LEVEL — addresses the visible / immediate problem (replace the burnt socket, reset the tripped breaker, replace the failed bulb). Quick, low-cost, but doesn't prevent recurrence if the root cause persists. ROOT-CAUSE — addresses the design / installation / maintenance failure that produced the symptom (redesign the ring final to handle the actual load, re-train the customer to avoid overload, replace the undersized cable to current spec). Slower, higher-cost, but prevents recurrence. Engineering decision: do BOTH where possible; fix the symptom AND the root cause; quote both in the customer brief.",
      "Symptom is enough.",
      "Root is unnecessary.",
    ],
    correctIndex: 1,
    explanation:
      "The two-level fix is the L3 engineering approach. Symptom-level fix gets the customer back in service quickly; root-cause fix prevents the comeback. Both are needed for true diagnostic completion. The customer makes the commercial call on whether to authorise both; the firm has a duty to recommend both.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Apply the 5-Whys to a customer reporting 'breaker keeps tripping when I plug in the kettle' and identify each level.",
    options: [
      "Just one cause.",
      "(1) Why does the breaker trip? — overload current exceeds B-rating magnetic threshold (kettle 12 A inrush + existing load). (2) Why does the existing load + kettle exceed threshold? — too many loads on the same circuit. (3) Why too many loads? — kitchen ring designed in 1995 for fewer high-current appliances; modern kitchen has more. (4) Why the design is inadequate? — original installer specified to current consumption at the time, no margin for future appliance growth. (5) Why no margin? — no design standard for future-proofing kitchen circuits in 1995; standard practice was to size to immediate need. Root cause: undersized circuit for modern usage. Fix: upgrade to 32 A circuit with appropriate protection, OR redistribute appliances across multiple circuits, OR add additional kitchen circuit.",
      "Random.",
      "Buy new kettle.",
    ],
    correctAnswer: 1,
    explanation:
      "The 5-Whys reveals the root cause is design-era vs current-usage mismatch — common in older properties. The visible symptom (breaker trip) is just the surface; the root is the circuit design. Customer fixes range from cheap (redistribute loads) to expensive (rewire the kitchen).",
  },
  {
    id: 2,
    question: "What questions should you ask when assessing whether to repair or replace a faulty 25-year-old MCB?",
    options: [
      "Always replace.",
      "Five questions. (1) IS PARTS AVAILABLE? Older MCBs may be obsolete; replacement requires new model. (2) IS REPAIR EVEN POSSIBLE? Most MCBs are sealed units; 'repair' usually means swap. (3) IS THE EXISTING DESIGN STILL APPROPRIATE? Modern installations may need RCBO (RCD + MCB combined) instead of MCB-only. (4) WILL THE NEW COMPONENT FIT THE BUSBAR? Some old CUs need full CU replacement to fit modern devices. (5) WHAT'S THE OVERALL CU AGE / CONDITION? If the CU itself is approaching end of life (typical 25–30 years), full CU replacement may be the right call. Engineering decision is rarely just 'repair vs replace one device'.",
      "Random.",
      "Just replace.",
    ],
    correctAnswer: 1,
    explanation:
      "MCB / RCBO replacement decisions usually involve broader CU considerations. A 25-year-old CU with one failed MCB may be approaching the point where full replacement makes sense; replacing one MCB just prolongs the inevitable. The L3 engineering decision considers the system, not just the component.",
  },
  {
    id: 3,
    question: "When is the right answer to 'recommend rewire' rather than 'repair'?",
    options: [
      "Never.",
      "Five conditions. (1) Cable type at end of life (rubber-insulated, VIR, lead-sheathed pre-1970s) — IR readings declining year-on-year, regular faults. (2) Multiple Code 1 / Code 2 EICR findings on the same installation that aren't economically repairable individually. (3) Repair would require destruction of significant building fabric (chasing whole rooms). (4) Customer planning a renovation — economical to rewire while building work is happening. (5) Property change-of-use (e.g. residential to HMO) requiring different specification. The L3 apprentice doesn't normally make this call — it's improver / Approved Electrician / consultant level — but should recognise the conditions and escalate.",
      "Always.",
      "Just bigger jobs.",
    ],
    correctAnswer: 1,
    explanation:
      "Rewire recommendation is an engineering judgment call, not a default. The L3 apprentice's role is recognising the indicators (cable age, multiple EICR codes, future plans) and escalating to senior for the decision. Rewire is a major capital decision for the customer; the recommendation needs to be defensible.",
  },
  {
    id: 4,
    question: "What's an 'engineering compromise' and when is it appropriate in fault diagnosis?",
    options: [
      "Just lazy.",
      "Engineering compromise = solution that's less than ideal but acceptable given constraints (cost, time, building fabric, customer budget). Examples: (1) Add a dedicated circuit for high-load appliance instead of full kitchen rewire. (2) Replace one tripping RCBO instead of upgrading to all-RCBO CU. (3) Patch a damaged cable section instead of replacing the full run. Each compromise is acceptable IF: (a) it brings the installation to BS 7671 compliance, (b) the limitations are documented and communicated to the customer, (c) the customer has accepted the compromise in writing, (d) the firm's professional indemnity covers the chosen approach. Compromise is engineering, not corner-cutting.",
      "Always wrong.",
      "Always right.",
    ],
    correctAnswer: 1,
    explanation:
      "Real engineering involves compromise. The customer's budget, the building fabric, the time available, the firm's competence — all constrain the ideal solution. The L3 apprentice's role is recognising when a compromise is appropriate (within compliance) vs a corner-cut (below compliance). The supervisor / senior makes the call on borderline cases.",
  },
  {
    id: 5,
    question: "How do you communicate engineering decisions to a customer who isn't technical?",
    options: [
      "Just tell them.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
      "Use jargon.",
      "Make decision for them.",
    ],
    correctAnswer: 1,
    explanation:
      "Customer communication is part of the L3 engineering competence. Plain English + cost + safety implication. Customers can make sensible decisions if you explain the trade-offs clearly. The 'just tell them' approach (or jargon-heavy explanation) loses the customer and creates dispute risk.",
  },
  {
    id: 6,
    question: "What's the engineering response when you find a fault that suggests broader problems with the installation?",
    options: [
      "Fix only the immediate.",
      "Three-step. (1) Fix the immediate fault (within original call-out scope and customer authorisation). (2) Document the broader concerns on the job sheet — 'During the visit I observed [list]; recommend further investigation under [scope]'. (3) Inform the customer in writing — 'In addition to the work completed today, we recommend you consider [list]; happy to provide a quote for further investigation'. The customer makes the commercial call on whether to authorise broader investigation. Without the documentation + customer brief, broader concerns become invisible — and the firm has no defensible record of having identified them.",
      "Walk away.",
      "Fix everything.",
    ],
    correctAnswer: 1,
    explanation:
      "Broader-issue identification is the L3 engineering judgment that adds value beyond fixing one fault. The customer's right to choose what to authorise is preserved; the firm's duty to inform is satisfied; the documentation provides the audit trail.",
  },
  {
    id: 7,
    question: "When should an L3 apprentice escalate a diagnosis decision to the supervisor rather than make it themselves?",
    options: [
      "Never.",
      "Six triggers. (1) Cost decision &gt; £500 (budget threshold typically defined by firm policy). (2) Code 1 / Code 2 EICR finding requiring engineering judgment on coding. (3) Engineering compromise that may not be straightforward compliance. (4) Customer dispute about scope or quality. (5) Specialist work outside L3 competence (HV, three-phase plant, BMS, fire alarm signal-only work). (6) Anything you're not sure about. Escalation is competence, not weakness — the EAWR Reg 16 'competent person' duty includes knowing where your competence stops. The supervisor is paid to make the harder calls.",
      "Always.",
      "Just buy time.",
    ],
    correctAnswer: 1,
    explanation:
      "Escalation triggers are part of the L3 apprentice's professional discipline. Knowing what's within your scope and what isn't — and acting accordingly — is the EAWR Reg 16 duty. The firm's policy will define specific thresholds; the apprentice's habit of escalating early is a sign of competence, not a sign of weakness.",
  },
  {
    id: 8,
    question: "What's the role of customer education in fault diagnosis outcomes?",
    options: [
      "Not your job.",
      "Significant. Many faults recur because the customer's behaviour caused or contributed to them — overloaded extensions, plug-in heaters on lighting circuits, kettle + microwave + toaster simultaneously. Educating the customer on the actual cause AND how to avoid recurrence is part of preventing the comeback. Format: brief verbal explanation during the work + written summary in the job sheet that the customer signs at completion. 'Your circuit is rated for X amps; running these appliances together exceeds that; consider running them sequentially OR add a dedicated circuit'. The customer's informed cooperation prevents 60–80% of behaviour-related comebacks.",
      "Just bill them.",
      "Never explain.",
    ],
    correctAnswer: 1,
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
