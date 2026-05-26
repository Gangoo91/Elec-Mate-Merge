/**
 * Module 5 · Section 2 · Subsection 3 — NEC Contracts
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   NEC4 ECC main options, early warning, compensation events and programme management — the contract suite favoured for complex public-sector and infrastructure MEP.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'NEC Contracts - HNC Module 5 Section 2.3';
const DESCRIPTION =
  'Master NEC4 Engineering and Construction Contract: ECC main options A-F, early warning procedures, compensation events, programme management, X clauses, and collaborative working in building services projects.';

const quickCheckQuestions = [
  {
    id: 'nec-option-a',
    question: 'What type of contract is NEC4 ECC Option A?',
    options: [
      'Increased equipment purchase costs',
      'Protection against indirect contact',
      'False sensor readings and system malfunction',
      'Priced contract with activity schedule',
    ],
    correctIndex: 3,
    explanation:
      'Option A is a priced contract with activity schedule. The Contractor is paid the lump sum prices for completed activities, bearing the risk of their price estimates.',
  },
  {
    id: 'early-warning',
    question: 'What is the purpose of an early warning under NEC4?',
    options: [
      'Statement of intent, organisation, and arrangements',
      'To notify potential problems before they occur',
      'Static friction preventing smooth valve movement',
      'Resistance increases as temperature rises',
    ],
    correctIndex: 1,
    explanation:
      'Early warnings are proactive notifications of matters that could affect cost, time, or quality. They enable collaborative problem-solving before issues escalate.',
  },
  {
    id: 'compensation-event',
    question: 'A compensation event under NEC4 typically results in:',
    options: [
      'Panels, inverter, isolators',
      'All environmental factors',
      'Assessment of time and cost impact',
      'Technical, customer, and business challenges',
    ],
    correctIndex: 2,
    explanation:
      'Compensation events are assessed to determine their impact on Defined Cost and time. The Prices and Completion Date are adjusted accordingly.',
  },
  {
    id: 'programme-acceptance',
    question: 'Under NEC4, the Project Manager must accept or reject a programme within:',
    options: [
      '1 week',
      '6 weeks',
      '4 weeks',
      '2 weeks',
    ],
    correctIndex: 3,
    explanation:
      'The Project Manager has two weeks to accept or notify reasons for non-acceptance of a submitted programme. Silence does not constitute acceptance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which NEC4 ECC option places most cost risk on the Employer?',
    options: [
      'Option A - Priced contract with activity schedule',
      'Option E - Cost reimbursable contract',
      'Option B - Priced contract with bill of quantities',
      'Option F - Management contract',
    ],
    correctAnswer: 1,
    explanation:
      'Option E (cost reimbursable) places most risk on the Employer as they pay all Defined Costs plus the Fee. The Contractor has limited incentive to control costs.',
  },
  {
    id: 2,
    question: 'Under NEC4, who may raise an early warning?',
    options: [
      'Savings are shared between Employer and Contractor',
      'Maintained and reviewed at risk reduction meetings',
      'Either the Project Manager or Contractor',
      'Option C - Target cost with activity schedule',
    ],
    correctAnswer: 2,
    explanation:
      'Both the Project Manager and Contractor have a duty to notify early warnings. This mutual obligation promotes collaborative risk management.',
  },
  {
    id: 3,
    question: 'What happens if the Contractor does not notify a compensation event within 8 weeks?',
    options: [
      'The cost of components of work as defined in the contract',
      'Savings are shared between Employer and Contractor',
      'Option C - Target cost with activity schedule',
      'The Contractor loses their right to additional time and money',
    ],
    correctAnswer: 3,
    explanation:
      'The Contractor must notify compensation events within 8 weeks of becoming aware. Failure to do so is a time bar - they lose entitlement to additional time and money.',
  },
  {
    id: 4,
    question: 'In NEC4, what is the Accepted Programme used for?',
    options: [
      'Assessing compensation events, monitoring progress, and managing float',
      'Maintained and reviewed at risk reduction meetings',
      'The Contractor loses their right to additional time and money',
      'Enter the matter on the early warning register and call a risk reduction meeting',
    ],
    correctAnswer: 0,
    explanation:
      'The Accepted Programme is a key contract document used for assessing compensation events, monitoring progress, identifying float, and managing time risk.',
  },
  {
    id: 5,
    question: 'Which X clause deals with limitation of liability?',
    options: [
      'X13',
      'X18',
      'X20',
      'X2',
    ],
    correctAnswer: 1,
    explanation:
      "X18 (Limitation of liability) allows parties to cap the Contractor's total liability and exclude liability for indirect/consequential losses.",
  },
  {
    id: 6,
    question: 'Under Option C (target cost), what happens if outturn cost is below the target?',
    options: [
      'Option C - Target cost with activity schedule',
      'The Contractor loses their right to additional time and money',
      'Savings are shared between Employer and Contractor',
      'Either the Project Manager or Contractor',
    ],
    correctAnswer: 2,
    explanation:
      'Option C shares cost savings (and overruns) between the parties using the share percentages stated in Contract Data. This incentivises efficient delivery.',
  },
  {
    id: 7,
    question:
      'A building services subcontractor on an NEC4 project receives an instruction to install additional lighting. This is likely a:',
    options: [
      'Defect',
      'Early warning matter',
      'Termination event',
      'Compensation event',
    ],
    correctAnswer: 3,
    explanation:
      'An instruction to change the Works Information (Scope under NEC4) is a compensation event under clause 60.1(1). The subcontractor is entitled to time and cost assessment.',
  },
  {
    id: 8,
    question: "What is 'Defined Cost' under NEC4?",
    options: [
      'The cost of components of work as defined in the contract',
      'Option C - Target cost with activity schedule',
      'Maintained and reviewed at risk reduction meetings',
      'Either the Project Manager or Contractor',
    ],
    correctAnswer: 0,
    explanation:
      'Defined Cost is the cost of the components of work calculated using the Shorter Schedule of Cost Components (Options A/B) or full Schedule (Options C/D/E).',
  },
  {
    id: 9,
    question: 'The early warning register under NEC4 should be:',
    options: [
      'The Contractor loses their right to additional time and money',
      'Maintained and reviewed at risk reduction meetings',
      'Either the Project Manager or Contractor',
      'Option C - Target cost with activity schedule',
    ],
    correctAnswer: 1,
    explanation:
      'The early warning register is a living document maintained jointly and reviewed at regular risk reduction meetings to track and mitigate project risks.',
  },
  {
    id: 10,
    question: 'Under NEC4, terminal float belongs to:',
    options: [
      'The Employer',
      'The Project Manager to allocate',
      'The Contractor',
      'Neither - it is shared equally',
    ],
    correctAnswer: 2,
    explanation:
      "Terminal float (time between planned Completion and the Completion Date) belongs to the Contractor. Compensation events do not consume Contractor's float.",
  },
  {
    id: 11,
    question:
      'Which NEC4 option is most suitable for a complex building services project where design development continues during construction?',
    options: [
      'Option A - Activity schedule',
      'Option B - Bill of quantities',
      'Option F - Management contract',
      'Option C - Target cost with activity schedule',
    ],
    correctAnswer: 3,
    explanation:
      'Option C is ideal for complex projects with evolving design. The target provides cost certainty while allowing flexibility, and the pain/gain share incentivises collaboration.',
  },
  {
    id: 12,
    question:
      'A mechanical contractor gives early warning that a chiller delivery will be delayed by the manufacturer. The Project Manager should:',
    options: [
      'Enter the matter on the early warning register and call a risk reduction meeting',
      'The cost of components of work as defined in the contract',
      'Assessing compensation events, monitoring progress, and managing float',
      'The Contractor loses their right to additional time and money',
    ],
    correctAnswer: 0,
    explanation:
      'Early warnings require collaborative action. The matter should be registered and discussed at a risk reduction meeting to identify mitigation measures.',
  },
];

const faqs = [
  {
    question: 'What is the difference between NEC3 and NEC4?',
    answer:
      'NEC4 (published 2017) introduced several improvements over NEC3: clearer language and structure, enhanced programme requirements, explicit treatment of the Scope (formerly Works Information), improved compensation event procedures, and new secondary options. The core collaborative philosophy remains unchanged, but NEC4 addresses ambiguities identified in NEC3 usage.',
  },
  {
    question: 'When should I use Option A vs Option C for building services?',
    answer:
      'Use Option A (activity schedule) when the scope is well-defined and unlikely to change significantly - the Contractor takes price risk. Use Option C (target cost) when scope may evolve, design is developing, or collaboration on cost efficiency is desired - risk is shared through the pain/gain mechanism. Option C is increasingly popular for complex M&E packages.',
  },
  {
    question: 'How does the compensation event process work in practice?',
    answer:
      'The process follows defined steps: (1) Event occurs or instruction given, (2) Notification within 8 weeks, (3) Project Manager instructs quotation or states event not valid, (4) Contractor submits quotation within 3 weeks, (5) Project Manager responds within 2 weeks - accepting, requesting revision, or making own assessment. Quotations use Defined Cost plus Fee, based on programme impact.',
  },
  {
    question: 'What happens if the Project Manager fails to respond to a compensation event?',
    answer:
      'NEC4 includes deemed acceptance provisions. If the Project Manager fails to respond to a quotation within the reply period (2 weeks unless extended), and the Contractor notifies this failure, the quotation is treated as accepted. This prevents Employer delay tactics and ensures timely contract administration.',
  },
  {
    question: 'How important is the programme under NEC4?',
    answer:
      "The programme is fundamental to NEC4 operation. It's used to assess compensation events, monitor progress, identify float ownership, and manage risk. The Contractor must submit programmes showing method, sequence, timing, float, and resources. A current Accepted Programme is essential - without one, assessing time impacts becomes extremely difficult.",
  },
  {
    question: 'Can X clauses be mixed and matched?',
    answer:
      'Yes, X clauses (secondary options) can be selected as needed to tailor the contract. Common selections include X2 (changes in law), X5 (sectional completion), X7 (delay damages), X13 (performance bond), and X18 (limitation of liability). Care is needed to ensure selected clauses work together coherently and suit project requirements.',
  },
];

const HNCModule5Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 3"
            title="NEC Contracts"
            description="NEC4 ECC main options, early warning procedures, compensation events, and programme management for building services projects."
            tone="purple"
          />

          <TLDR
            points={[
              "NEC4 ECC has six main options (A–F) — A and B are price-based, C and D are target cost (pain/gain), E is cost-reimbursable, F is management.",
              "Early Warning (Clause 15) is the cornerstone — notify any matter that could affect cost, time or quality. No early warning = risk of reduced compensation.",
              "Compensation Events (Clause 60) cover scope, programme and risk events — assessed under Clause 63 (cost) and 63 (time).",
              "Programme management (Clause 31, 32) is contractually rigorous — accepted programme + monthly revisions are the basis of CE assessment.",
              "NEC philosophy is collaboration through process — early warning meetings, risk register, mutual trust and cooperation (Clause 10.1).",
            ]}
          />

          <RegsCallout
            source="NEC4 ECC — Clause 15.1 (Early Warning)"
            clause="The Contractor and the Project Manager give an early warning by notifying the other as soon as either becomes aware of any matter which could increase the total of the Prices, delay Completion, delay meeting a Key Date, or impair the performance of the works in use."
            meaning={
              <>
                Early warning is mutual — both Contractor and PM have the duty. Failure to give an early warning when it would have helped the other party can lead to reduced compensation under Clause 63.7. Embed early warning as a weekly meeting agenda item; treat the early warning register as the live risk register.
              </>
            }
            cite="Source: NEC4 Engineering and Construction Contract — Clause 15 (refer to NEC4 published text for verbatim use)."
          />


          <LearningOutcomes
            outcomes={[
              'Understand NEC4 ECC structure and philosophy',
              'Compare and select appropriate main options (A-F)',
              'Apply early warning procedures effectively',
              'Navigate the compensation event process',
              'Manage programme requirements under NEC4',
              'Select and apply relevant X clauses',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="NEC4 ECC Structure and Main Options">
            <p>
              The NEC4 Engineering and Construction Contract (ECC) is a collaborative contract form
              widely used in UK construction, including major building services projects. Its
              structure differs fundamentally from traditional forms like JCT, emphasising proactive
              management and clear risk allocation.
            </p>
            <p>
              <strong>Core NEC4 Principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mutual trust and cooperation:</strong> Parties must act in a spirit of
                collaboration
              </li>
              <li>
                <strong>Proactive management:</strong> Early warning system prevents disputes
              </li>
              <li>
                <strong>Clear procedures:</strong> Defined timescales for all actions
              </li>
              <li>
                <strong>Flexibility:</strong> Main options allocate risk differently
              </li>
            </ul>
            <p>
              <strong>Main Options A-F (Option — Type — Risk Allocation — Best For):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A:</strong> Priced - Activity Schedule — Contractor bears price risk —
                Well-defined scope, competitive market
              </li>
              <li>
                <strong>B:</strong> Priced - Bill of Quantities — Quantity risk with Employer —
                Scope defined but quantities uncertain
              </li>
              <li>
                <strong>C:</strong> Target - Activity Schedule — Shared via pain/gain mechanism —
                Complex projects, evolving design
              </li>
              <li>
                <strong>D:</strong> Target - Bill of Quantities — Shared, with remeasurement —
                Variable quantities, collaborative delivery
              </li>
              <li>
                <strong>E:</strong> Cost Reimbursable — Employer bears cost risk — Highly uncertain
                scope, emergency works
              </li>
              <li>
                <strong>F:</strong> Management Contract — Via subcontracts — Multiple specialist
                packages
              </li>
            </ul>
            <p>
              <strong>Building Services Example — Option A:</strong> A straightforward lighting
              installation package with clear specification and quantities would suit Option A. The
              M&E subcontractor prices activities (supply luminaires, first fix, second fix,
              commissioning) and is paid on completion of each activity.
            </p>
            <p>
              <strong>Building Services Example — Option C:</strong> A complex HVAC installation
              where design will develop during construction suits Option C. The target is agreed,
              but as design evolves, the pain/gain share incentivises the contractor to deliver
              efficiently whilst the employer shares some risk.
            </p>
            <p>
              <strong>Selection principle:</strong> Match the option to project risk profile.
              Greater uncertainty warrants more risk sharing (Options C/D/E).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Early Warning Procedures">
            <p>
              The early warning system is a cornerstone of NEC's collaborative approach. Unlike
              traditional contracts where parties often conceal problems until claiming, NEC
              requires proactive disclosure of potential issues.
            </p>
            <p>
              <strong>Early Warning Definition (Clause 15):</strong> Either Party must give an early
              warning by notifying the other as soon as they become aware of any matter which could:{' '}
              <strong>increase the total of the Prices</strong>,{' '}
              <strong>delay Completion</strong>, <strong>delay meeting a Key Date</strong>, or{' '}
              <strong>impair the performance of the works in use</strong>.
            </p>
            <p>
              <strong>Early Warning Process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Party becomes aware of potential issue
              </li>
              <li>
                <strong>Step 2:</strong> Notification given immediately to other party
              </li>
              <li>
                <strong>Step 3:</strong> Matter entered on Early Warning Register
              </li>
              <li>
                <strong>Step 4:</strong> Risk reduction meeting called (either party may request)
              </li>
              <li>
                <strong>Step 5:</strong> Collaborative discussion of solutions and mitigations
              </li>
              <li>
                <strong>Step 6:</strong> Actions agreed and implemented
              </li>
            </ul>
            <p>
              <strong>Risk Reduction Meeting Actions (Discussion Item — Example M&E Context):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ways to avoid or reduce risk:</strong> Alternative chiller manufacturer if
                lead time issue
              </li>
              <li>
                <strong>Actions to take:</strong> Re-sequence installation to suit material delivery
              </li>
              <li>
                <strong>Who takes action:</strong> Contractor to expedite procurement
              </li>
              <li>
                <strong>Changes to Scope required:</strong> Modify AHU specification if preferred
                unit unavailable
              </li>
              <li>
                <strong>Other effects:</strong> Impact on commissioning programme
              </li>
            </ul>
            <p>
              <strong>Failure to Give Early Warning:</strong> If the Contractor fails to give an
              early warning they were aware of, and the matter becomes a compensation event, the
              event is assessed as if they had given early warning. This reduces any additional cost
              entitlement — a significant financial penalty for withholding information.
            </p>
            <p>
              <strong>Building Services Scenario:</strong> An electrical subcontractor notices the
              architect's ceiling grid layout conflicts with the containment routes shown in the
              M&E coordination drawings. Rather than waiting for installation and claiming delay,
              they raise an early warning. A risk reduction meeting identifies the clash early,
              allowing the design team to resolve it without site disruption. This is NEC working as
              intended.
            </p>
            <p>
              <strong>Best practice:</strong> Raise early warnings liberally. It is better to raise
              an early warning that proves unnecessary than to withhold one that was needed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Compensation Events">
            <p>
              Compensation events are NEC4's mechanism for adjusting the contract in response to
              events that entitle the Contractor to changes in time and/or cost. They replace the
              variation and claim processes found in traditional contracts.
            </p>
            <p>
              <strong>Key Compensation Events (Clause 60.1):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>60.1(1):</strong> Project Manager gives instruction changing the Scope
              </li>
              <li>
                <strong>60.1(2):</strong> Employer does not allow access by access date
              </li>
              <li>
                <strong>60.1(3):</strong> Employer does not provide something by date shown in
                Accepted Programme
              </li>
              <li>
                <strong>60.1(5):</strong> Project Manager or Supervisor does not reply within
                timescales
              </li>
              <li>
                <strong>60.1(12):</strong> Physical conditions more adverse than experienced
                Contractor would have allowed for
              </li>
              <li>
                <strong>60.1(18):</strong> Breach of contract by Employer
              </li>
            </ul>
            <p>
              <strong>Compensation Event Process (Step — Action — Timescale):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1.</strong> Event occurs or instruction issued — -
              </li>
              <li>
                <strong>2.</strong> Contractor notifies compensation event — Within 8 weeks (time
                bar)
              </li>
              <li>
                <strong>3.</strong> PM responds - valid or not valid — Within 1 week
              </li>
              <li>
                <strong>4.</strong> PM instructs quotation (if valid) — Within 1 week
              </li>
              <li>
                <strong>5.</strong> Contractor submits quotation — Within 3 weeks
              </li>
              <li>
                <strong>6.</strong> PM accepts, requests revision, or makes own assessment — Within
                2 weeks
              </li>
              <li>
                <strong>7.</strong> Prices and Completion Date adjusted — Implementation
              </li>
            </ul>
            <p>
              <strong>Quotation Assessment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cost element:</strong> Change in Defined Cost (actual/forecast) plus Fee
                percentage
              </li>
              <li>
                <strong>Time element:</strong> Delay to planned Completion shown on Accepted
                Programme
              </li>
              <li>
                <strong>Method:</strong> Based on effect on programme, not arbitrary allocation
              </li>
              <li>
                <strong>Forecast basis:</strong> Assessed at date of assessment, not retrospectively
              </li>
            </ul>
            <p>
              <strong>M&E Example — Scope Change:</strong> The architect instructs additional power
              outlets in the meeting rooms. The electrical contractor notifies this as CE 60.1(1).
              They submit a quotation showing additional cable, containment, outlets, labour hours
              (Defined Cost) plus Fee, and demonstrate 3-day delay to the lighting commissioning
              milestone on their programme.
            </p>
            <p>
              <strong>M&E Example — Access:</strong> The mechanical contractor cannot access the
              plant room on the stated date because builder's work is incomplete. This is CE
              60.1(2). The quotation includes standing time for the ductwork installation team,
              re-mobilisation costs, and demonstrates critical path delay using the Accepted
              Programme.
            </p>
            <p>
              <strong>Critical rule:</strong> The 8-week notification time bar is absolute.
              Contractors who miss it lose entitlement regardless of merit.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Programme Management and Secondary Options">
            <p>
              The programme is central to NEC4 operation, far more than a scheduling tool. It serves
              as the baseline for assessing compensation events, managing float, and demonstrating
              the effect of changes on completion.
            </p>
            <p>
              <strong>Programme Requirements (Clause 31):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Starting date and Completion Date:</strong> Contract milestones
              </li>
              <li>
                <strong>Planned Completion:</strong> When Contractor plans to finish (may include
                float)
              </li>
              <li>
                <strong>Order and timing:</strong> Sequence of operations
              </li>
              <li>
                <strong>Dates for work by Others:</strong> Interfaces with other contractors
              </li>
              <li>
                <strong>Float and time risk allowances:</strong> Contingency shown explicitly
              </li>
              <li>
                <strong>Health and safety requirements:</strong> Safe sequencing
              </li>
              <li>
                <strong>Method statements:</strong> How work will be executed
              </li>
            </ul>
            <p>
              <strong>Float Ownership:</strong> Under NEC4, <strong>terminal float</strong> (time
              between planned Completion and the Completion Date) belongs to the Contractor. When
              assessing compensation events, the effect is measured against planned Completion — the
              Contractor keeps their float protection. Example: If planned Completion is Week 48 and
              Completion Date is Week 52, a CE causing 3 weeks delay moves planned Completion to
              Week 51 and Completion Date to Week 55 — the 4-week float is preserved.
            </p>
            <p>
              <strong>Programme Acceptance (Reason for Non-Acceptance — Example):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Does not comply with contract:</strong> Completion shown after Completion
                Date
              </li>
              <li>
                <strong>Does not show required information:</strong> Missing resource allocation
              </li>
              <li>
                <strong>Does not represent Contractor's plans:</strong> Unrealistic durations
              </li>
              <li>
                <strong>Does not show effect of compensation events:</strong> Accepted CEs not
                incorporated
              </li>
            </ul>
            <p>
              <strong>Key Secondary Options (X Clauses) — (Clause — Purpose — Building Services Relevance):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>X2:</strong> Changes in law — Building Regulations amendments
              </li>
              <li>
                <strong>X5:</strong> Sectional completion — Phased handover of floors/zones
              </li>
              <li>
                <strong>X7:</strong> Delay damages — Liquidated damages for late completion
              </li>
              <li>
                <strong>X10:</strong> Information modelling — BIM requirements for M&E models
              </li>
              <li>
                <strong>X13:</strong> Performance bond — Security for major packages
              </li>
              <li>
                <strong>X15:</strong> Contractor's design — Design and build M&E elements
              </li>
              <li>
                <strong>X18:</strong> Limitation of liability — Caps total and consequential losses
              </li>
              <li>
                <strong>X20:</strong> Key performance indicators — Quality and performance targets
              </li>
            </ul>
            <p>
              <strong>Collaborative Working in Practice:</strong> NEC4's strength lies in its
              collaborative mechanisms. On a hospital M&E project, the electrical contractor raises
              an early warning about switchgear lead times. At the risk reduction meeting, the team
              agrees to resequence the installation, starting in a different zone. The programme is
              updated, showing the mitigation. When a later scope change occurs, the compensation
              event quotation reflects the current (mitigated) programme — everyone benefits from
              the proactive approach.
            </p>
            <p>
              <strong>Programme tip:</strong> Update and resubmit the programme regularly. An
              outdated programme makes compensation event assessment extremely difficult and often
              disadvantages the Contractor.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Option Selection:</strong> A 10-storey office building requires
              full M&E fit-out. Design is 70% complete with some elements still developing. Budget
              is tight but firm.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design not fully complete → scope may change</li>
              <li>Budget sensitivity → need cost control incentive</li>
              <li>Complexity → benefits from collaboration</li>
              <li>
                <strong>Recommendation: Option C (Target Cost).</strong> Pain/gain share motivates
                Contractor to control costs while target adjusts for scope changes via CEs.
              </li>
            </ul>
            <p>
              <strong>Example 2 — Compensation Event Quotation:</strong> PM instructs additional fan
              coil units in meeting rooms. Contractor to assess.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Materials: 6 × FCU @ £850 = £5,100</li>
              <li>Pipework and valves = £1,200</li>
              <li>Labour: 48 hours @ £45/hr = £2,160</li>
              <li>Subcontract commissioning = £400</li>
              <li>
                <strong>Total Defined Cost = £8,860</strong>
              </li>
              <li>Fee (stated in Contract Data 12%) = £1,063</li>
              <li>
                <strong>Total CE quotation = £9,923</strong>
              </li>
              <li>Time: 5 days on critical path (demonstrated on programme)</li>
            </ul>
            <p>
              <strong>Example 3 — Early Warning Response:</strong> Electrical subcontractor
              identifies that cable delivery from overseas will be 4 weeks late due to shipping
              delays.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Early Warning issued immediately</li>
              <li>Contractor to source alternative UK supplier</li>
              <li>Accept alternative cable type (equivalent spec)</li>
              <li>Resequence installation - start West wing</li>
              <li>Update programme to reflect new sequence</li>
              <li>
                <strong>Result:</strong> Completion date protected through collaboration. No
                compensation event required — risk mitigated.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>NEC4 administration checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maintain Early Warning Register and review at regular meetings</li>
              <li>Track all notification timescales rigorously (8 weeks CE, 2 weeks PM response)</li>
              <li>Keep programme current - submit revisions when circumstances change</li>
              <li>Document all instructions and communications in writing</li>
              <li>Use contract terminology (Scope, Prices, Completion Date)</li>
              <li>Attend risk reduction meetings proactively</li>
            </ul>
            <p>
              <strong>Key timescales to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                CE notification: <strong>8 weeks</strong> (absolute time bar)
              </li>
              <li>
                PM validity response: <strong>1 week</strong>
              </li>
              <li>
                Contractor quotation: <strong>3 weeks</strong>
              </li>
              <li>
                PM quotation response: <strong>2 weeks</strong>
              </li>
              <li>
                Programme acceptance: <strong>2 weeks</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Missing the 8-week bar</strong> — Set calendar reminders for all potential
                  CEs
                </li>
                <li>
                  <strong>Treating NEC like JCT</strong> — Different philosophy requires different
                  approach
                </li>
                <li>
                  <strong>Letting programme lapse</strong> — Outdated programme damages CE
                  assessments
                </li>
                <li>
                  <strong>Withholding early warnings</strong> — Damages trust and reduces
                  entitlement
                </li>
                <li>
                  <strong>Poor record keeping</strong> — NEC requires documented communications
                </li>
              </ul>
            }
            doInstead="Set calendar reminders against the 8-week CE bar, treat NEC4 as a collaborative regime not an adversarial one, keep the Accepted Programme current with regular submissions, raise early warnings liberally, and document every instruction and exchange in writing."
          />

          <SectionRule />

          <Scenario
            title="Failure to give early warning under NEC4 reduces compensation"
            situation={
              <>
                You discover at week 14 that a critical valve manufacturer has gone into administration, threatening a 10-week impact on commissioning. You internally consider alternatives but do not issue an early warning notice for three weeks while you investigate. By the time you notify, the cheaper alternative supplier's lead time has expired. You raise a CE for the additional cost and time of the more expensive supplier.
              </>
            }
            whatToDo={
              <>
                Under Clause 63.7, the PM is entitled to assess the CE as if early warning had been given on day one — meaning the cheaper supplier was still available. The award is reduced to the difference between the day-one alternative and the original supplier — not the reality of what you actually paid. Issue early warnings reflexively the moment any risk emerges. The cost of issuing too many early warnings is zero; the cost of missing one is significant.
              </>
            }
            whyItMatters={
              <>
                NEC4 enforces collaborative behaviour through commercial sanctions. Clause 63.7 means the contractor that hoards problems gets penalised — the contractor that shares them gets fairly compensated. Operating NEC honestly is the cheapest commercial posture.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "NEC4 ECC main options: A (priced contract with activity schedule), B (priced with bill), C/D (target cost pain/gain), E (cost-reimbursable), F (management).",
              "Early Warning (Clause 15) is mandatory and mutual — failure reduces compensation under Clause 63.7.",
              "Compensation Events (Clause 60) cover defined scope, programme, risk events — listed exhaustively in 60.1.",
              "Time and cost of CEs assessed using shorter schedule of cost components or full schedule.",
              "Programme management (Clauses 31, 32) — first programme + monthly revisions are contractual.",
              "Mutual trust and cooperation (Clause 10.1) is the operating principle, not just a slogan.",
              "Risk register and early warning meetings drive collaborative risk management.",
              "Option C target cost balances pain/gain — typically 50/50 sharing on overrun and savings within bands.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                JCT contracts
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Subcontract management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section2_3;
