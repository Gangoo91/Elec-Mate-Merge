/**
 * Module 5 · Section 2 · Subsection 2 — JCT Contracts
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   The JCT suite — standard, intermediate, design and build, minor works — and the clauses you live with day-to-day on building services projects.
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

const TITLE = 'JCT Contracts - HNC Module 5 Section 2.2';
const DESCRIPTION =
  'Master JCT contract forms for building services: SBC, DB, and ICD contracts, key subcontractor clauses, extensions of time, loss and expense claims, practical completion, and defects liability periods.';

const quickCheckQuestions = [
  {
    id: 'jct-sbc-purpose',
    question: 'What is the primary purpose of the JCT Standard Building Contract (SBC)?',
    options: [
      'Leakage currents from damp conditions or equipment filters',
      'Resident on-site support and fine-tuning of building systems',
      'For traditionally procured projects with full design by the employer',
      'True — CDM 2015 applies to every construction project',
    ],
    correctIndex: 2,
    explanation:
      'The JCT SBC is used for traditionally procured projects where the employer provides full design information through an architect or contract administrator. The contractor builds to the design provided.',
  },
  {
    id: 'eot-requirement',
    question: 'What must a contractor do to claim an extension of time under JCT contracts?',
    options: [
      'Compliance with design, construction, inspection, and testing standards',
      'Give written notice to the contract administrator as soon as delay becomes apparent',
      'At least three: emergency fund, tax provision, and general savings',
      'Yes — agonal gasps are not effective breathing and CPR must continue',
    ],
    correctIndex: 1,
    explanation:
      'Under JCT contracts, the contractor must give written notice to the contract administrator as soon as delay becomes apparent, specifying the relevant event causing the delay.',
  },
  {
    id: 'practical-completion',
    question: 'What does practical completion mean under JCT contracts?',
    options: [
      'Investigate the connection and clean/retighten as necessary',
      'Work substantially complete and fit for occupation',
      'Because they happen far more frequently and complacency is common',
      'Isolated system with no intentional connection to earth',
    ],
    correctIndex: 1,
    explanation:
      "Practical completion means the works are substantially complete and fit for the employer's intended use, even if minor defects remain. It triggers release of half the retention and starts the defects liability period.",
  },
  {
    id: 'defects-period',
    question: 'What is the typical defects liability period under JCT contracts?',
    options: [
      '3 months',
      '12 months',
      '6 months',
      '24 months',
    ],
    correctIndex: 1,
    explanation:
      'The standard defects liability period (now called rectification period) under JCT contracts is 12 months from practical completion, during which the contractor must rectify defects at their own cost.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which JCT contract form is most appropriate for a project where the contractor takes on design responsibility?',
    options: [
      'JCT Standard Building Contract (SBC)',
      'JCT Design and Build Contract (DB)',
      'JCT Intermediate Building Contract (ICD)',
      'JCT Minor Works Contract (MW)',
    ],
    correctAnswer: 1,
    explanation:
      'The JCT Design and Build Contract (DB) is specifically designed for projects where the contractor is responsible for both design and construction, taking on design liability.',
  },
  {
    id: 2,
    question: 'Under JCT contracts, who is responsible for issuing the extension of time decision?',
    options: [
      'A relevant event entitling extension of time',
      'Direct loss and expense caused by relevant matters',
      'The contract administrator or architect',
      'The contractor\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s own poor planning',
    ],
    correctAnswer: 2,
    explanation:
      'The contract administrator (or architect under SBC) is responsible for granting or refusing extensions of time, acting fairly between the parties.',
  },
  {
    id: 3,
    question: 'A relevant event under JCT contracts does NOT include:',
    options: [
      'Late design information from the employer',
      'Exceptionally adverse weather conditions',
      'Changes instructed by the contract administrator',
      "The contractor's own poor planning",
    ],
    correctAnswer: 3,
    explanation:
      "The contractor's own failures, delays, or poor planning are not relevant events. Only events beyond the contractor's control listed in the contract qualify for extension of time.",
  },
  {
    id: 4,
    question:
      'What percentage of retention is typically released at practical completion under JCT contracts?',
    options: [
      '50%',
      '25%',
      '75%',
      '100%',
    ],
    correctAnswer: 0,
    explanation:
      'At practical completion, 50% of the retention fund is released to the contractor. The remaining 50% is held until the end of the defects liability period and issue of the final certificate.',
  },
  {
    id: 5,
    question: 'Loss and expense claims under JCT contracts are intended to compensate for:',
    options: [
      'The contract administrator or architect',
      'Direct loss and expense caused by relevant matters',
      'A relevant event entitling extension of time',
      'Medium complexity projects with nominated subcontractors',
    ],
    correctAnswer: 1,
    explanation:
      'Loss and expense claims compensate for direct loss and/or expense caused by specific relevant matters listed in the contract, such as late information or variations. Claims must be substantiated.',
  },
  {
    id: 6,
    question: 'The JCT Intermediate Building Contract (ICD) is most suitable for:',
    options: [
      'Large complex projects over 50 million pounds',
      'Simple straightforward building works',
      'Medium complexity projects with nominated subcontractors',
      'Projects involving specialist engineering works',
    ],
    correctAnswer: 2,
    explanation:
      'The ICD is designed for medium-sized projects of moderate complexity, where the full administrative procedures of SBC are not required but more structure than Minor Works is needed.',
  },
  {
    id: 7,
    question: 'Under JCT subcontracts, when must a domestic subcontractor be paid?',
    options: [
      "To allow current flow in the rotor by relative motion between field and rotor",
      "Referencing a specification rather than listing items creates ambiguity if the specification is later disputed or modified",
      "Use collective protection measures (e.g., guard rails) before personal protection (e.g., harnesses)",
      "Within the period stated in the subcontract following the main contractor's receipt of payment",
    ],
    correctAnswer: 3,
    explanation:
      'Payment timing follows the subcontract terms, typically within a specified period after the main contractor receives payment from the employer (pay-when-paid clauses are generally prohibited under the Construction Act).',
  },
  {
    id: 8,
    question: 'What is the effect of issuing a non-completion certificate under JCT contracts?',
    options: [
      'Liquidated damages become payable by the contractor',
      'The employer must pay additional fees',
      'The contract is terminated immediately',
      'The defects period is extended',
    ],
    correctAnswer: 0,
    explanation:
      'A non-completion certificate confirms the contractor has failed to complete by the completion date. This enables the employer to deduct liquidated damages at the agreed rate until completion.',
  },
  {
    id: 9,
    question:
      'An electrical subcontractor installing distribution boards finds asbestos not identified in the tender documents. This is likely to be:',
    options: [
      "The subcontractor's risk to manage",
      'A relevant event entitling extension of time',
      'Grounds for contract termination',
      'Not covered by JCT contracts',
    ],
    correctAnswer: 1,
    explanation:
      'Discovery of unforeseen physical conditions or materials like asbestos is typically a relevant event under JCT contracts, entitling the contractor to claim extension of time and potentially loss and expense.',
  },
  {
    id: 10,
    question: 'The final certificate under JCT contracts is issued:',
    options: [
      'Liquidated damages become payable by the contractor',
      'The contract administrator or architect',
      'When all defects are remedied and final account agreed',
      'Direct loss and expense caused by relevant matters',
    ],
    correctAnswer: 2,
    explanation:
      'The final certificate is issued after the defects liability period ends, all defects have been remedied, and the final account has been agreed. It releases remaining retention and concludes the contract.',
  },
  {
    id: 11,
    question: 'Under JCT contracts, variations must be instructed by:',
    options: [
      'The employer directly to the contractor',
      'Any professional team member',
      'The quantity surveyor',
      'The contract administrator in writing',
    ],
    correctAnswer: 3,
    explanation:
      'Variations must be instructed by the contract administrator (or architect) in writing. Verbal instructions should be confirmed in writing to be valid and to ensure proper valuation.',
  },
  {
    id: 12,
    question: 'What is the purpose of liquidated damages in JCT contracts?',
    options: [
      "To provide a pre-agreed genuine estimate of the employer's loss from late completion",
      "Rate of heat transfer through a building element (thermal transmittance)",
      "The sensor is faulty, misadjusted, or detecting a metallic object that should not be in range",
      "High currents require more effective heat dissipation and connections",
    ],
    correctAnswer: 0,
    explanation:
      "Liquidated damages are a pre-agreed genuine estimate of the employer's likely loss from late completion. They provide certainty and avoid the need to prove actual loss, but must be a reasonable estimate, not a penalty.",
  },
];

const faqs = [
  {
    question: 'What is the difference between JCT SBC, DB, and ICD contracts?',
    answer:
      'JCT SBC (Standard Building Contract) is for traditional procurement where the employer provides full design. JCT DB (Design and Build) is used when the contractor takes on design responsibility. JCT ICD (Intermediate Building Contract) sits between SBC and Minor Works, suitable for medium-complexity projects. For electrical subcontractors, understanding which contract the main contractor operates under is crucial as it affects design liability, variation procedures, and payment mechanisms.',
  },
  {
    question: 'How do I claim an extension of time as an electrical subcontractor?',
    answer:
      'You must notify the main contractor in writing as soon as you become aware of any delay, specifying the cause and likely impact on completion. The main contractor then claims against the employer if the delay is caused by a relevant event. Keep detailed records including programmes, correspondence, photographs, and resource allocation. Time is critical - late notification can prejudice your entitlement even if the delay was genuinely caused by others.',
  },
  {
    question: 'What happens if the main contractor delays my M&E installation?',
    answer:
      "If the main contractor's failure to provide access, coordinate trades, or supply information delays your work, you may be entitled to extension of time and loss and expense under your subcontract. Document every instance of delay with dates, affected areas, and resources stood down. Submit regular delay notices referencing specific subcontract clauses. This protects your position for both time extension and financial compensation.",
  },
  {
    question: 'Can the employer deduct liquidated damages from my subcontract payment?',
    answer:
      'Not directly. Liquidated damages are between the employer and main contractor. However, your subcontract may contain provisions allowing the main contractor to pass down liability for delays you cause. Check your subcontract carefully for any liquidated damages provisions, delay damages clauses, or pass-through mechanisms. Always ensure your completion dates align with the main contract programme.',
  },
  {
    question: 'What are my obligations during the defects liability period?',
    answer:
      'During the defects liability period (typically 12 months from practical completion), you must return to site and rectify any defects in your work at your own cost when notified by the main contractor. This includes defective materials, poor workmanship, or systems not meeting specification. Maintain insurance cover throughout this period. Defects due to employer misuse or third-party damage are not your responsibility.',
  },
  {
    question: 'How do I value variations to electrical work under JCT contracts?',
    answer:
      'Variations should be valued using contract rates where applicable, or fair rates and prices where no direct comparison exists. Keep detailed records of labour hours, materials used, plant hire, and any disruption to other work. Submit quotations before carrying out variation work where possible. If the variation is instructed urgently, confirm the instruction in writing and submit your valuation promptly with supporting documentation.',
  },
];

const HNCModule5Section2_2 = () => {
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
            eyebrow="Module 5 · Section 2 · Subsection 2"
            title="JCT Contracts"
            description="Standard building contracts, intermediate forms, amendments, extensions of time and practical completion provisions."
            tone="purple"
          />

          <TLDR
            points={[
              "JCT publishes a suite (SBC, IC, MW, DB, MP, CM, CE) — pick the form to fit project size, complexity and procurement route.",
              "JCT SBC 2024 is the default for traditional procurement above ~£500k; IC for medium; MW for small; DB for design-build.",
              "Key JCT clauses for MEP project managers: payment (Section 4), variations (Section 5), extensions of time (Section 2.27–2.32), loss and expense (Section 4.20–4.26), practical completion (2.30).",
              "JCT distinguishes Relevant Events (entitle EOT) from Relevant Matters (entitle loss and expense) — these are separate tests, run separately.",
              "Schedule of Amendments is where bespoke risk allocation lives — read it before you bid, never after award.",
            ]}
          />

          <RegsCallout
            source="JCT Standard Building Contract 2024 — Clause 2.27 (Notice of delay)"
            clause="If and whenever it becomes reasonably apparent that the progress of the Works or any Section is being or is likely to be delayed the Contractor shall forthwith give written notice to the Architect/Contract Administrator of the material circumstances, including the cause or causes of the delay, and identify in the notice any event which in his opinion is a Relevant Event."
            meaning={
              <>
                JCT 2.27 is the Relevant Event notice — the gateway to an Extension of Time. "Forthwith" means immediately on it becoming apparent, not at the end of the period of delay. A late notice does not necessarily defeat the claim, but it weakens it and can lead to forfeiture of loss and expense (where time-bar applies). Embed notice discipline as routine, not as crisis response.
              </>
            }
            cite="Source: JCT Standard Building Contract 2024 (refer to JCT published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Identify appropriate JCT contract forms for different project types',
              'Understand key clauses affecting electrical subcontractors',
              'Apply extension of time procedures correctly',
              'Prepare and substantiate loss and expense claims',
              'Recognise practical completion requirements and implications',
              'Manage obligations during the defects liability period',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="JCT Contract Forms Overview">
            <p>
              The Joint Contracts Tribunal (JCT) produces the most widely used standard form
              building contracts in the UK. Understanding which contract form applies to your
              project is essential for managing risk, understanding your obligations, and protecting
              your commercial position as an electrical contractor or subcontractor.
            </p>
            <p>
              <strong>Key JCT Contract Forms:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>JCT SBC (Standard Building Contract):</strong> For large, complex
                traditionally procured projects
              </li>
              <li>
                <strong>JCT DB (Design and Build):</strong> Contractor takes design responsibility
                from employer's requirements
              </li>
              <li>
                <strong>JCT ICD (Intermediate Building Contract):</strong> Medium-complexity
                projects, simpler procedures than SBC
              </li>
              <li>
                <strong>JCT MW (Minor Works):</strong> Small, straightforward projects
              </li>
              <li>
                <strong>JCT MWD (Minor Works with Design):</strong> Small projects with contractor
                design portion
              </li>
            </ul>
            <p>
              <strong>Contract Selection Guide (Form — Typical Value — Design Responsibility — Complexity):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>JCT SBC:</strong> Over 1 million pounds — Employer (via architect) — High
                complexity
              </li>
              <li>
                <strong>JCT DB:</strong> Any value — Contractor — Any complexity
              </li>
              <li>
                <strong>JCT ICD:</strong> Up to 1 million pounds — Employer or partial contractor —
                Medium complexity
              </li>
              <li>
                <strong>JCT MW:</strong> Up to 250,000 pounds — Employer — Simple works
              </li>
            </ul>
            <p>
              <strong>Building Services Example — Hospital Extension:</strong> A 15 million pounds
              hospital extension uses JCT SBC with quantities. The M&E package (approximately 5
              million pounds) is let as a domestic subcontract to an M&E contractor. Electrical
              design is provided by the employer's consulting engineers (Contractor's Design Portion
              excluded). The electrical subcontractor works under the main contractor's domestic
              subcontract, which incorporates JCT SBC terms by reference.
            </p>
            <p>
              <strong>Key principle:</strong> Always obtain and read your subcontract terms — they
              may differ significantly from the main contract.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Key Clauses for Electrical Subcontractors">
            <p>
              Whether working under a JCT subcontract or a bespoke form, certain clauses critically
              affect your commercial position. Understanding these provisions helps protect against
              common pitfalls in building services contracts.
            </p>
            <p>
              <strong>Payment Provisions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Payment notice requirements</li>
              <li>Pay less notice deadlines</li>
              <li>Final date for payment</li>
              <li>Retention percentage and release dates</li>
              <li>Valuation rules for variations</li>
            </ul>
            <p>
              <strong>Programme and Time:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Commencement and completion dates</li>
              <li>Sectional completion provisions</li>
              <li>Extension of time procedures</li>
              <li>Liquidated damages exposure</li>
              <li>Acceleration requirements</li>
            </ul>
            <p>
              <strong>Critical Subcontract Clauses (Clause Area — Risk — What to Check):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design liability:</strong> High - fitness for purpose vs reasonable skill —
                Standard of care, PI insurance limits
              </li>
              <li>
                <strong>Set-off rights:</strong> Medium - cash flow impact — Conditions for
                withholding, notice periods
              </li>
              <li>
                <strong>Indemnities:</strong> High - unlimited liability — Scope, caps, insurance
                coverage
              </li>
              <li>
                <strong>Termination:</strong> High - payment for work done — Grounds, notice,
                consequences
              </li>
              <li>
                <strong>Retention:</strong> Medium - cash flow and insolvency risk — Percentage,
                trust account, release dates
              </li>
            </ul>
            <p>
              <strong>Warning — Pay-When-Paid Clauses:</strong> Pay-when-paid clauses are largely
              prohibited under the Construction Act 1996 (except in insolvency). If your subcontract
              contains such a clause, it may be unenforceable. However, pay-when-certified clauses
              linking your payment to main contract certification may still be valid. Always seek
              legal advice on unusual payment terms.
            </p>
            <p>
              <strong>Best practice:</strong> Review subcontract terms before tender, price risk
              items, and negotiate unfair clauses before signing.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Extensions of Time and Loss and Expense">
            <p>
              Managing time and cost claims is critical for project success. JCT contracts provide
              structured mechanisms for claiming extensions of time (EOT) and compensation for loss
              and expense caused by matters beyond the contractor's control.
            </p>
            <p>
              <strong>Relevant Events (Grounds for EOT):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Variations:</strong> Changes to scope instructed by contract administrator
              </li>
              <li>
                <strong>Late information:</strong> Drawings, details, or instructions not provided
                on time
              </li>
              <li>
                <strong>Employer's other contractors:</strong> Delays caused by direct contractors
                or statutory undertakers
              </li>
              <li>
                <strong>Exceptionally adverse weather:</strong> Must be genuinely exceptional, not
                merely bad weather
              </li>
              <li>
                <strong>Civil commotion or terrorism:</strong> Events beyond reasonable contractor
                control
              </li>
              <li>
                <strong>Force majeure:</strong> Unforeseeable events making performance impossible
              </li>
              <li>
                <strong>Statutory changes:</strong> New legislation affecting the works
              </li>
              <li>
                <strong>Employer default:</strong> Failure to give access, impediment, or prevention
              </li>
            </ul>
            <p>
              <strong>EOT Procedure Under JCT SBC:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contractor gives written notice as soon as delay becomes apparent</li>
              <li>Notice identifies the relevant event and expected effect on completion</li>
              <li>Contractor provides particulars and estimate of delay when reasonably possible</li>
              <li>Contract administrator assesses and grants fair and reasonable extension</li>
              <li>If refused or inadequate, contractor may refer to adjudication</li>
            </ul>
            <p>
              <strong>Loss and Expense — Relevant Matters (Matter — Typical Loss Items):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Late information:</strong> Standing time, programme revision costs,
                acceleration
              </li>
              <li>
                <strong>Variations and disruption:</strong> Additional supervision, extended
                preliminaries, loss of productivity
              </li>
              <li>
                <strong>Employer's failure to give access:</strong> Plant standing, labour
                redeployment, site welfare costs
              </li>
              <li>
                <strong>Suspension by contractor:</strong> Demobilisation and remobilisation costs
              </li>
              <li>
                <strong>Approximate quantities adjustment:</strong> Rate adjustment, extended
                duration costs
              </li>
            </ul>
            <p>
              <strong>Building Services Example — Distribution Board Delay:</strong> An electrical
              subcontractor is delayed 4 weeks because the consulting engineer issues revised
              distribution board schedules late. The subcontractor must: (1) notify the main
              contractor in writing immediately, (2) provide programme impact analysis, (3) record
              all affected resources and costs, (4) claim both EOT and loss and expense. Recoverable
              costs may include electrician standing time, extended site welfare, delayed material
              deliveries, and reprogramming specialist commissioning engineers.
            </p>
            <p>
              <strong>Documentation is key:</strong> Keep contemporaneous records of delays, cause
              and effect, resources affected, and costs incurred.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Practical Completion and Defects Liability">
            <p>
              Practical completion is a pivotal contractual milestone that triggers several
              important consequences. Understanding what it means and managing the defects liability
              period effectively is essential for completing projects successfully.
            </p>
            <p>
              <strong>Practical Completion Criteria:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Works substantially complete and fit for occupation/use</li>
              <li>All testing and commissioning satisfactorily completed</li>
              <li>O&M manuals and as-built drawings provided</li>
              <li>Training delivered to client's staff where required</li>
              <li>
                Minor outstanding items (snagging) acceptable to contract administrator
              </li>
              <li>All statutory approvals and certificates obtained</li>
            </ul>
            <p>
              <strong>Consequences of Practical Completion — For the Contractor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>50% retention released</li>
              <li>Liquidated damages liability ends</li>
              <li>Insurance responsibilities may transfer</li>
              <li>Defects liability period begins</li>
              <li>Right to final account preparation</li>
            </ul>
            <p>
              <strong>For the Employer:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Takes possession of the works</li>
              <li>Assumes responsibility for security</li>
              <li>Insurance responsibility may transfer</li>
              <li>Can occupy and use the building</li>
              <li>Final account process commences</li>
            </ul>
            <p>
              <strong>Defects Liability Period (Rectification Period) — (Aspect — Standard — Subcontractor Implication):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Duration:</strong> 12 months from practical completion — Must maintain
                resources to respond
              </li>
              <li>
                <strong>Notification:</strong> Employer/CA notifies of defects — Main contractor
                passes down to trades
              </li>
              <li>
                <strong>Rectification:</strong> Contractor rectifies at own cost — Subcontractor
                liable for own defects
              </li>
              <li>
                <strong>Exclusions:</strong> Fair wear and tear, third-party damage — Document
                handover condition
              </li>
              <li>
                <strong>Certificate:</strong> Making good certificate issued at end — Triggers
                remaining retention release
              </li>
            </ul>
            <p>
              <strong>Building Services Example — Electrical Defects:</strong> Six months after
              practical completion, the building manager reports emergency lighting failures. The
              electrical subcontractor must: (1) attend site promptly to diagnose, (2) determine if
              the failure is a genuine defect (faulty component, poor workmanship) or
              misuse/external cause, (3) rectify defects at their own cost, (4) document the repair
              and root cause. If the failure was due to the client disconnecting the lighting
              circuit for their own alterations, this is not a defect for the subcontractor to
              remedy free of charge.
            </p>
            <p>
              <strong>Practical tip:</strong> Maintain good relationships with building managers
              during the defects period. Prompt response to genuine issues builds reputation and
              often leads to future work.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Extension of Time Claim:</strong> Revised containment drawings
              issued 3 weeks late. Electrical first fix delayed.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Original programme: First fix weeks 10-16</li>
              <li>Information due: Week 8</li>
              <li>Information received: Week 11 (3 weeks late)</li>
              <li>First fix start delayed to week 14</li>
              <li>Critical path delay: 3 weeks minimum</li>
              <li>Second fix pushed back accordingly</li>
              <li>
                <strong>EOT entitlement:</strong> 3 weeks (minimum)
              </li>
              <li>
                <strong>Loss and expense:</strong> Extended preliminaries, possible acceleration
                costs
              </li>
            </ul>
            <p>
              <strong>Example 2 — Loss and Expense Calculation:</strong> Calculate loss and expense
              for 3-week delay caused by late information.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site supervision: 3 weeks x 1,200 pounds = 3,600 pounds</li>
              <li>Welfare facilities: 3 weeks x 400 pounds = 1,200 pounds</li>
              <li>Small plant and tools: 3 weeks x 300 pounds = 900 pounds</li>
              <li>Standing time: 2 electricians x 3 days waiting = 6 days x 280 pounds = 1,680 pounds</li>
              <li>Programme revision: contracts manager time 4 hours x 65 pounds = 260 pounds</li>
              <li>
                <strong>Total claim:</strong> 7,640 pounds
              </li>
            </ul>
            <p>
              <strong>Example 3 — Retention Release Timeline:</strong> Subcontract value 500,000
              pounds, retention 3%, defects period 12 months.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Total retention held: 500,000 x 3% = <strong>15,000 pounds</strong>
              </li>
              <li>Practical completion (1st March 2024): first moiety released 7,500 pounds</li>
              <li>End of defects period (1st March 2025): making good certificate issued</li>
              <li>Second moiety released: 7,500 pounds</li>
              <li>Final release subject to final account agreement</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>EOT claim checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify the relevant event from the contract list</li>
              <li>Give written notice immediately delay becomes apparent</li>
              <li>State the cause, expected duration, and effect on completion</li>
              <li>Provide programme showing critical path impact</li>
              <li>Submit particulars and supporting documentation</li>
              <li>Follow up and respond to queries promptly</li>
            </ul>
            <p>
              <strong>Key dates and periods to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Retention moieties: <strong>50%</strong> at PC, <strong>50%</strong> at final
                certificate
              </li>
              <li>
                Defects liability period: <strong>12 months</strong> standard
              </li>
              <li>
                Final certificate: <strong>2 months</strong> after end of defects period (JCT SBC)
              </li>
              <li>
                Adjudication: <strong>28 days</strong> from referral to decision
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Late notification</strong> — Always notify delays immediately in writing
                </li>
                <li>
                  <strong>Poor records</strong> — Keep daily diaries, photos, and correspondence
                </li>
                <li>
                  <strong>Ignoring subcontract terms</strong> — Read and understand your specific
                  contract
                </li>
                <li>
                  <strong>Verbal instructions</strong> — Insist on written confirmation of variations
                </li>
                <li>
                  <strong>Missing defects response</strong> — Maintain capability to respond during
                  defects period
                </li>
              </ul>
            }
            doInstead="Notify delays in writing immediately, keep daily diaries with photos and correspondence, read and understand the specific subcontract terms, insist every variation is confirmed in writing, and maintain capability to respond throughout the defects period."
          />

          <SectionRule />

          <Scenario
            title="Late JCT notice loses an EOT claim"
            situation={
              <>
                A client design change in week 12 delays the LV switchroom layout by six weeks. You absorb the work, do not issue a formal Clause 2.27 notice, and recover most of the time through acceleration. At month nine, the project completes four weeks late. You submit an EOT claim of six weeks. The contract administrator rejects it: no contemporaneous notice, no progress impact records, no contemporaneous programme update.
              </>
            }
            whatToDo={
              <>
                Issue Clause 2.27 notices the moment any delay event becomes apparent — even if you intend to mitigate. Maintain progress records (daily site diary, programme baselines, photographs). At each interim valuation, support the EOT with a programme update showing impact. Loss and expense follows the EOT under Clauses 4.20–4.26 — same notice discipline applies. Never rely on goodwill at the end of a project.
              </>
            }
            whyItMatters={
              <>
                JCT EOT and loss-and-expense entitlement is procedural as much as factual. Late notices, missing records and absent programme updates lose claims that would otherwise be valid. Notice discipline is the cheapest insurance on any JCT project.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "JCT suite: SBC (large traditional), IC (medium), MW (small), DB (design-build), MP (major project), CM (construction management).",
              "Section 2 = obligations, completion, EOT. Section 4 = payment, loss and expense. Section 5 = variations.",
              "Relevant Events (Clause 2.29) entitle EOT; Relevant Matters (Clause 4.21) entitle loss and expense — separate tests.",
              "Notices under Clause 2.27 must be issued \"forthwith\" — late notices weaken or defeat claims.",
              "Schedule of Amendments houses bespoke risk allocation — always read before bidding.",
              "Practical Completion (2.30) triggers DLP, half retention release, end of LADs.",
              "Defects Liability Period typically 12 months from PC — defects must be made good.",
              "JCT 2024 brings updated payment, dispute resolution and economic conditions provisions over JCT 2016.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Procurement routes
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                NEC contracts
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section2_2;
