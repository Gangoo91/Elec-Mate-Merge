/**
 * Module 5 · Section 2 · Subsection 4 — Subcontract Management
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   DOM/1, DOM/2, NEC subcontracts and ECS — back-to-back provisions, flow-down, and managing the specialist supply chain on building services.
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

const TITLE = 'Subcontract Management - HNC Module 5 Section 2.4';
const DESCRIPTION =
  'Master subcontract management in building services: DOM/1 and DOM/2 subcontracts, back-to-back provisions, flow-down clauses, payment terms, programme obligations and subcontractor coordination.';

const quickCheckQuestions = [
  {
    id: 'named-subcontractor',
    question: "What is a 'named' subcontractor in construction contracts?",
    options: [
      'A subcontractor chosen by the main contractor',
      'A subcontractor specified in the main contract by the client/designer',
      'An emergency replacement subcontractor',
      'A subcontractor with a registered company name',
    ],
    correctIndex: 1,
    explanation:
      'A named subcontractor is one specifically identified in the main contract documents by the client or designer. The main contractor is expected to use them but retains responsibility for their performance.',
  },
  {
    id: 'back-to-back',
    question: "What does a 'back-to-back' subcontract clause achieve?",
    options: [
      'Allows the subcontractor to contract directly with the client',
      'Passes identical obligations and risks from main contract to subcontract',
      'Requires physical proximity of workers',
      'Links two separate projects together',
    ],
    correctIndex: 1,
    explanation:
      'Back-to-back clauses mirror the main contract terms into the subcontract, passing down obligations, risks, and conditions so the subcontractor is bound by the same requirements as the main contractor.',
  },
  {
    id: 'pay-when-paid',
    question:
      'Under the Housing Grants, Construction and Regeneration Act 1996, pay-when-paid clauses are:',
    options: [
      'Always enforceable',
      'Unenforceable except where the payer is insolvent',
      'Only valid for contracts under £50,000',
      'Required in all subcontracts',
    ],
    correctIndex: 1,
    explanation:
      'The Construction Act 1996 (as amended 2011) makes pay-when-paid clauses unenforceable except where the paying party is insolvent. Subcontractors have the right to regular staged payments regardless of main contract payment status.',
  },
  {
    id: 'flow-down',
    question: 'Flow-down clauses in subcontracts are used to:',
    options: [
      'Specify water management responsibilities',
      'Transfer obligations from the main contract to subcontractors',
      'Define groundwater drainage requirements',
      'Establish payment flow timing',
    ],
    correctIndex: 1,
    explanation:
      'Flow-down clauses transfer specific obligations from the main contract to subcontractors, ensuring compliance with client requirements, specifications, health and safety standards, and quality procedures throughout the supply chain.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the main difference between DOM/1 and DOM/2 subcontracts?',
    options: [
      'DOM/1 is for electrical work, DOM/2 for mechanical',
      'DOM/1 is for works subcontracts, DOM/2 for labour-only',
      'DOM/1 is newer than DOM/2',
      'DOM/1 is for domestic work, DOM/2 for commercial',
    ],
    correctAnswer: 1,
    explanation:
      'DOM/1 is designed for subcontracts where the subcontractor supplies materials and labour (works subcontracts), while DOM/2 is for labour-only subcontracts where the main contractor provides materials.',
  },
  {
    id: 2,
    question:
      'A main contractor on a hospital M&E project must ensure their electrical subcontractor complies with NHS-specific requirements. Which mechanism achieves this?',
    options: [
      'Verbal instruction',
      'Flow-down clauses in the subcontract',
      'Separate client contract',
      'Insurance policy',
    ],
    correctAnswer: 1,
    explanation:
      "Flow-down clauses incorporate the client's specific requirements from the main contract into the subcontract, ensuring the subcontractor is bound by NHS standards, infection control procedures, and commissioning protocols.",
  },
  {
    id: 3,
    question:
      'An electrical subcontractor completes work on 15th March. Under the Construction Act, by when must they submit an application for payment?',
    options: [
      'Immediately upon completion',
      'By the date specified in the contract or a reasonable time before the due date',
      'Within 30 days of project completion',
      'Only when the main contractor receives payment',
    ],
    correctAnswer: 1,
    explanation:
      'The Construction Act requires payment application by the date specified in the contract. If not specified, applications should be submitted a reasonable time before the due date to allow the paying party to process the claim.',
  },
  {
    id: 4,
    question: 'What is the purpose of retention in subcontracts?',
    options: [
      'To delay payment indefinitely',
      'To provide security for remedying defects discovered after completion',
      "To fund the main contractor's overheads",
      'To penalise slow progress',
    ],
    correctAnswer: 1,
    explanation:
      'Retention (typically 3-5%) is held to provide the main contractor with funds to remedy any defects that become apparent during the defects liability period. Half is usually released at practical completion, half after the defects period.',
  },
  {
    id: 5,
    question:
      'A building services subcontractor is instructed to work weekends to recover programme delay. Who is responsible for the additional costs if the delay was caused by late information from the main contractor?',
    options: [
      'The subcontractor bears their own costs',
      'The main contractor should compensate the subcontractor',
      'The client pays directly',
      'Costs are always shared equally',
    ],
    correctAnswer: 1,
    explanation:
      "When acceleration or additional working is required due to the main contractor's default (late information, access denial), the main contractor should compensate the subcontractor for additional costs incurred. Back-to-back provisions should allow the main contractor to recover from the client if applicable.",
  },
  {
    id: 6,
    question: "What does 'contra-charging' mean in subcontract management?",
    options: [
      'Charging for work done by others',
      "Deducting costs from a subcontractor's payment for work they should have done or damage they caused",
      'Adding VAT to invoices',
      'Changing the contract sum',
    ],
    correctAnswer: 1,
    explanation:
      "Contra-charging is when the main contractor deducts costs from a subcontractor's payment, typically for remedial work the main contractor had to arrange because the subcontractor failed to complete or correct defective work. Proper notice and evidence is required.",
  },
  {
    id: 7,
    question: 'Which statement about subcontractor coordination meetings is correct?',
    options: [
      'They are optional social gatherings',
      'They should occur before work begins and regularly throughout the project',
      'Only the main contractor and client attend',
      'They are only required when problems occur',
    ],
    correctAnswer: 1,
    explanation:
      'Coordination meetings should begin in the pre-construction phase to resolve interface issues and continue regularly throughout the project. Attendance by all relevant trades ensures clash detection, sequencing agreement, and timely resolution of issues.',
  },
  {
    id: 8,
    question:
      "An M&E subcontractor's work is delayed because the structural frame is 4 weeks late. What should the subcontractor do first?",
    options: [
      'Stop work and wait',
      'Submit a formal notice of delay and extension of time claim',
      'Leave the site permanently',
      'Complete unrelated work on another project',
    ],
    correctAnswer: 1,
    explanation:
      'The subcontractor should immediately submit formal written notice of the delay event and its impact on their programme. Timely notification is essential—most contracts require notice within a specified period (often 14-28 days) or claims may be barred.',
  },
  {
    id: 9,
    question: "What information should a subcontractor's programme contain?",
    options: [
      'Only the start and finish dates',
      'Detailed activities, durations, dependencies, resource allocation and key milestones',
      'Just the contract sum breakdown',
      'Only the materials schedule',
    ],
    correctAnswer: 1,
    explanation:
      "A subcontractor's programme should show detailed work activities, durations, logic links/dependencies, resources, key milestones (access, testing, handover), and float. It must integrate with the main contractor's master programme.",
  },
  {
    id: 10,
    question:
      'Under JCT subcontract terms, what is the typical notice period required before suspending work for non-payment?',
    options: [
      'Immediate suspension allowed',
      '7 days written notice after the final date for payment',
      '30 days notice',
      'No suspension right exists',
    ],
    correctAnswer: 1,
    explanation:
      'Under JCT and the Construction Act, if payment is not made by the final date, the subcontractor may suspend work after giving 7 days written notice. The right to suspend provides a powerful remedy whilst not being as drastic as termination.',
  },
  {
    id: 11,
    question: 'Which of the following is NOT typically included in a flow-down clause?',
    options: [
      'Health and safety requirements',
      'Quality management systems',
      "The main contractor's profit margin",
      'Programme obligations',
    ],
    correctAnswer: 2,
    explanation:
      "Flow-down clauses pass on technical requirements, programme obligations, H&S standards, quality systems, and client-specific requirements. The main contractor's profit margin is a commercial matter not passed to subcontractors.",
  },
  {
    id: 12,
    question: 'What is the primary purpose of subcontractor design submission reviews?',
    options: [
      'To delay the project',
      'To ensure designs comply with specifications and coordinate with other trades',
      'To transfer design liability entirely to the main contractor',
      'To increase paperwork',
    ],
    correctAnswer: 1,
    explanation:
      'Design submission reviews ensure subcontractor designs meet specification requirements, coordinate with architectural and other M&E elements, and identify clashes or issues before installation. This process is critical for building services coordination.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a nominated and named subcontractor?',
    answer:
      'Nominated subcontractors (now rarely used in modern contracts) were selected by the client with the main contractor having limited control and special payment provisions applying. Named subcontractors are identified in tender documents but the main contractor enters into a direct subcontract and retains full responsibility for their performance. JCT 2016 no longer uses nomination; naming is the preferred approach where client input into subcontractor selection is desired.',
  },
  {
    question:
      'Can a main contractor impose stricter terms on a subcontractor than exist in the main contract?',
    answer:
      'Yes, main contractors often seek to impose stricter terms, shorter notice periods, or additional obligations beyond the main contract. However, this creates risk—if the main contract only allows 28 days for claims but the subcontract requires 14 days, and the subcontractor gives 21 days notice, the main contractor may be left exposed. Best practice is true back-to-back provisions with identical timeframes.',
  },
  {
    question: 'How should subcontractor payment applications be processed?',
    answer:
      'Subcontractors should submit valuations by the agreed date, clearly showing work completed, materials on site, and variations. The main contractor reviews and issues a payment notice stating the sum due. If intending to pay less, a pay less notice with detailed breakdown is required. Payment must be made by the final date for payment. Under the Construction Act, the subcontractor can suspend work (after 7 days notice) if the final date passes without payment.',
  },
  {
    question: 'What coordination documents should building services subcontractors provide?',
    answer:
      "Building services subcontractors should provide: detailed installation programmes linked to the master programme; builders' work drawings showing holes, fixings, supports required; combined services drawings (now typically 3D BIM models) showing routing and clashes; testing and commissioning schedules; O&M manual contents; as-built drawing schedules. These should be submitted to agreed timescales for coordination review.",
  },
  {
    question: 'How are disputes between main contractors and subcontractors typically resolved?',
    answer:
      'Most subcontracts provide a dispute resolution hierarchy: first, project-level discussion between site teams; then senior management negotiation; followed by mediation or adjudication (which provides a binding interim decision within 28 days under the Construction Act); finally arbitration or litigation for final resolution. Adjudication is widely used as it is fast and relatively inexpensive, though parties can proceed to arbitration/litigation afterwards.',
  },
  {
    question: 'What insurance requirements apply to building services subcontractors?',
    answer:
      "Subcontractors typically require: Employers' Liability (minimum £5-10m, often £10m for major projects); Public Liability (£5-10m typical); Professional Indemnity if providing design services (£2-5m typical); and sometimes Contractors' All Risks or coverage under the main contractor's project policy. Insurance certificates should be verified before the subcontractor starts on site and maintained throughout the project and any warranty period.",
  },
];

const HNCModule5Section2_4 = () => {
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
            eyebrow="Module 5 · Section 2 · Subsection 4"
            title="Subcontract Management"
            description="DOM/1, DOM/2 subcontracts, back-to-back provisions, flow-down clauses and subcontractor coordination in building services."
            tone="purple"
          />

          <TLDR
            points={[
              "MEP work is typically 60–80% subcontracted — managing the supply chain is the project manager’s daily reality.",
              "Use back-to-back subcontracts that flow down obligations, payment terms, programme requirements and dispute mechanisms from the main contract.",
              "Standard forms: JCT SBCSub for SBC, ECC subcontract for NEC, DOM/1 (with main contract), DOM/2 (with DB).",
              "Pay-when-paid was banned by the Construction Act 1996 — but pay-when-certified is allowed; ensure subcontract payment dates align with main contract certification.",
              "Subcontract performance management: regular site meetings, KPIs, formal warning procedures — never let issues accumulate to termination as the only option.",
            ]}
          />

          <RegsCallout
            source="Housing Grants, Construction and Regeneration Act 1996 (as amended by LDEDC Act 2009) — Section 113"
            clause="A provision making payment under a construction contract conditional on the payer receiving payment from a third person is ineffective, unless that third person, or any other person payment by whom is under the contract (directly or indirectly) a condition of payment by that third person, is insolvent."
            meaning={
              <>
                Pay-when-paid is illegal in the UK construction industry except where the upstream party is genuinely insolvent. Subcontractors must be paid in line with the contract's payment provisions — you cannot make payment to your subcontractor conditional on receipt from the client. Every subcontract must be Construction Act compliant or it is void on payment terms.
              </>
            }
            cite="Source: Housing Grants, Construction and Regeneration Act 1996 (as amended) — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Distinguish between DOM/1 and DOM/2 subcontract forms',
              'Understand back-to-back and flow-down clause mechanisms',
              'Apply Construction Act payment provisions to subcontracts',
              'Manage subcontractor coordination and programme integration',
              'Handle disputes, delay claims and contra-charges',
              'Ensure compliance with health, safety and quality flow-downs',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Subcontract Types and Selection">
            <p>
              Building services work is almost always carried out by specialist subcontractors. The
              main contractor must select appropriate subcontract forms that protect their position
              whilst maintaining fair and workable relationships with the supply chain.
            </p>
            <p>
              <strong>Named vs Domestic Subcontractors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Named subcontractor:</strong> Specified in tender documents by
                client/designer; main contractor must use unless reasonable objection
              </li>
              <li>
                <strong>Domestic subcontractor:</strong> Selected entirely by main contractor with
                no client involvement
              </li>
              <li>
                <strong>Nominated (historic):</strong> Formal client selection with special payment
                provisions—now rarely used
              </li>
              <li>
                <strong>Key difference:</strong> Main contractor retains full responsibility for
                named subcontractors' performance
              </li>
            </ul>
            <p>
              <strong>Standard Subcontract Forms (Form — Use — Key Features):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>JCT DOM/1:</strong> Works subcontracts (labour + materials) — Full
                subcontract with design provisions option
              </li>
              <li>
                <strong>JCT DOM/2:</strong> Labour-only subcontracts — Main contractor supplies
                materials
              </li>
              <li>
                <strong>JCT SBCSub:</strong> For use with SBC main contract — Standard Building
                Sub-Contract
              </li>
              <li>
                <strong>NEC4 ECS:</strong> Engineering and Construction Subcontract — Collaborative,
                back-to-back with NEC4 ECC
              </li>
              <li>
                <strong>Bespoke forms:</strong> Main contractor's own terms — Often heavily amended
                in contractor's favour
              </li>
            </ul>
            <p>
              <strong>Building Services Scenario — Hospital M&E Package:</strong> A main contractor
              on a £45M hospital project subcontracts the M&E installation (£18M value) using DOM/1
              with design portion supplement. The electrical subcontractor provides detailed
              design, procurement, installation, testing and commissioning. Flow-down clauses ensure
              compliance with HTM (Health Technical Memoranda) requirements, NHS infection control
              procedures, and commissioning to CIBSE Code M standards.
            </p>
            <p>
              <strong>Selection principle:</strong> Choose subcontract forms that provide
              appropriate risk allocation whilst remaining fair — overly onerous terms may deter
              quality subcontractors or lead to disputes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Back-to-Back and Flow-Down Clauses">
            <p>
              Back-to-back provisions ensure the subcontractor is bound by equivalent terms to those
              binding the main contractor. Flow-down clauses specifically transfer particular
              obligations from the main contract to subcontractors throughout the supply chain.
            </p>
            <p>
              <strong>Back-to-Back Provisions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mirror main contract programme obligations</li>
              <li>Equivalent notice periods for claims</li>
              <li>Same defects liability period</li>
              <li>Matching insurance requirements</li>
              <li>Aligned extension of time provisions</li>
            </ul>
            <p>
              <strong>Flow-Down Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Health and safety requirements</li>
              <li>Quality management systems (ISO 9001)</li>
              <li>Environmental obligations</li>
              <li>Client-specific procedures</li>
              <li>BIM requirements and protocols</li>
            </ul>
            <p>
              <strong>Common Flow-Down Areas for Building Services (Category — Typical Requirements):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Health & Safety:</strong> CDM compliance, site inductions, method
                statements, permit systems
              </li>
              <li>
                <strong>Quality:</strong> Inspection and test plans, witness points, non-conformance
                procedures
              </li>
              <li>
                <strong>Programme:</strong> Progress reporting, look-ahead schedules, delay
                notification
              </li>
              <li>
                <strong>Design:</strong> Submission schedules, coordination requirements, approval
                processes
              </li>
              <li>
                <strong>Documentation:</strong> O&M manuals, as-built drawings, warranties, training
                records
              </li>
              <li>
                <strong>Commissioning:</strong> CIBSE Code M compliance, witnessed tests, balancing
                reports
              </li>
            </ul>
            <p>
              <strong>Risk — Incomplete Back-to-Back:</strong> If the main contract requires 14
              days notice for delay claims but the subcontract allows 28 days, the main contractor
              may receive late notice from the subcontractor but be time-barred from claiming
              against the client. Always ensure notice periods, limitation periods, and procedural
              requirements are truly back-to-back.
            </p>
            <p>
              <strong>Best practice:</strong> Attach the relevant main contract sections as an
              appendix to the subcontract so requirements are clearly visible, not just referenced.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Payment Terms and Construction Act Compliance">
            <p>
              The Housing Grants, Construction and Regeneration Act 1996 (as amended 2011) provides
              statutory payment rights for construction contracts including subcontracts.
              Understanding these provisions is essential for effective subcontract management.
            </p>
            <p>
              <strong>Construction Act 1996 Key Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Staged payments:</strong> Right to interim payments if contract exceeds 45
                days
              </li>
              <li>
                <strong>Due date:</strong> Payment becomes due on a specified date
              </li>
              <li>
                <strong>Payment notice:</strong> Payer must issue notice stating sum due within 5
                days of due date
              </li>
              <li>
                <strong>Pay less notice:</strong> If paying less than notified, must give notice
                with reasons
              </li>
              <li>
                <strong>Final date:</strong> Payment must be made by final date for payment
              </li>
              <li>
                <strong>Suspension:</strong> Right to suspend work for non-payment after 7 days
                notice
              </li>
            </ul>
            <p>
              <strong>Pay-When-Paid and Pay-When-Certified:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pay-when-paid:</strong> Unenforceable except where the payer is insolvent
              </li>
              <li>
                <strong>Pay-when-certified:</strong> Also generally unenforceable — certification is
                not a precondition
              </li>
              <li>
                <strong>Practical effect:</strong> Subcontractors cannot be denied payment solely
                because main contractor hasn't been paid
              </li>
              <li>
                <strong>Exception:</strong> If the paying party (main contractor) becomes insolvent,
                pay-when-paid may apply
              </li>
            </ul>
            <p>
              <strong>Typical Payment Timeline (Event — Typical Timing):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Valuation date:</strong> Monthly (e.g., 25th of each month)
              </li>
              <li>
                <strong>Application submission:</strong> By valuation date or 5 days before due date
              </li>
              <li>
                <strong>Due date:</strong> 7 days after valuation date
              </li>
              <li>
                <strong>Payment notice required:</strong> Within 5 days of due date
              </li>
              <li>
                <strong>Pay less notice deadline:</strong> Minimum 7 days before final date
              </li>
              <li>
                <strong>Final date for payment:</strong> 28-35 days after due date typically
              </li>
            </ul>
            <p>
              <strong>Retention Provisions —</strong> Retention provides security for defect
              correction. Typical arrangements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Retention percentage: 3-5% of certified value</li>
              <li>First moiety (half) released at practical completion</li>
              <li>Second moiety released after defects liability period (typically 12 months)</li>
              <li>Retention bond may substitute for cash retention on larger projects</li>
            </ul>
            <p>
              <strong>Practical tip:</strong> Ensure payment applications are detailed, accurate and
              submitted on time. Poor applications delay payment and damage commercial
              relationships.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Coordination and Programme Integration">
            <p>
              Building services coordination is critical to project success. Multiple M&E trades
              must work in confined spaces, often with complex sequencing requirements. Effective
              coordination prevents clashes, rework and delays.
            </p>
            <p>
              <strong>Coordination Mechanisms:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-start meeting:</strong> Establish interfaces, access requirements,
                coordination procedures
              </li>
              <li>
                <strong>Design coordination:</strong> Combined services drawings or BIM model
                coordination
              </li>
              <li>
                <strong>Weekly progress meetings:</strong> Monitor progress, resolve issues, plan
                ahead
              </li>
              <li>
                <strong>Look-ahead programmes:</strong> 3-4 week rolling programmes for detailed
                planning
              </li>
              <li>
                <strong>Clash detection:</strong> BIM-based or drawing overlay clash identification
              </li>
            </ul>
            <p>
              <strong>Programme Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Subcontractor programme must link to master programme</li>
              <li>Show all activities, durations, dependencies</li>
              <li>Include procurement lead times</li>
              <li>Identify critical path activities</li>
              <li>Show testing and commissioning periods</li>
            </ul>
            <p>
              <strong>Interface Management:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define work boundaries clearly</li>
              <li>Establish witness and hold points</li>
              <li>Coordinate builders work requirements</li>
              <li>Agree access and scaffold sharing</li>
              <li>Coordinate isolation and testing</li>
            </ul>
            <p>
              <strong>Building Services Coordination Example (Trade — Issue — Resolution):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical vs Ductwork:</strong> Cable tray and duct routing clash in
                ceiling void — Combined services drawing review, agree levels
              </li>
              <li>
                <strong>Fire Alarm vs Sprinklers:</strong> Detector and sprinkler head spacing
                conflicts — Joint layout with fire engineer approval
              </li>
              <li>
                <strong>Pipework vs Structure:</strong> Penetration locations clash with
                reinforcement — Early builders work drawing submission
              </li>
              <li>
                <strong>All M&E vs Ceiling:</strong> Services depth exceeds ceiling void — Section
                studies, potential ceiling drop
              </li>
            </ul>
            <p>
              <strong>Delay and Claims Management —</strong> When delays occur, subcontractors must
              follow contractual procedures:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Notice:</strong> Submit written notice within contractual timeframe (often
                14-28 days)
              </li>
              <li>
                <strong>Particulars:</strong> Provide detailed impact assessment with programme
                analysis
              </li>
              <li>
                <strong>Records:</strong> Maintain contemporaneous records (daily diaries, photos,
                correspondence)
              </li>
              <li>
                <strong>Mitigation:</strong> Demonstrate efforts to reduce delay impact
              </li>
              <li>
                <strong>Claim:</strong> Submit detailed claim with supporting evidence
              </li>
            </ul>
            <p>
              <strong>Coordination tip:</strong> Invest time in pre-construction coordination —
              resolving clashes on drawings costs a fraction of fixing them on site. Modern BIM
              tools can identify clashes automatically if models are properly maintained.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Back-to-Back Payment Provisions:</strong> Main contract has
              28-day payment terms from due date. How should the subcontract be structured?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main Contract: Due date = valuation date + 7 days</li>
              <li>Main Contract: Final date = due date + 28 days</li>
              <li>Subcontract due date = main contract valuation date + 7 days</li>
              <li>Subcontract final date = due date + 28 days</li>
              <li>
                This ensures payment obligations flow through without the main contractor being
                "out of pocket"
              </li>
              <li>
                <strong>Key:</strong> Payment notice and pay less notice deadlines must also align.
              </li>
            </ul>
            <p>
              <strong>Example 2 — Contra-Charge Procedure:</strong> Electrical subcontractor fails
              to complete cable glanding, main contractor instructs another subcontractor to
              complete at a cost of £2,400.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Issue formal notice requiring completion by date</li>
              <li>Step 2: If not completed, issue notice of intent to contra-charge</li>
              <li>Step 3: Arrange completion by others, documenting costs</li>
              <li>Step 4: Issue contra-charge notice with evidence: copy of instruction, photos showing incomplete work, invoice from completing subcontractor, deduction from next payment £2,400</li>
              <li>
                <strong>Warning:</strong> Failing to follow procedure may make contra-charge
                unenforceable.
              </li>
            </ul>
            <p>
              <strong>Example 3 — Delay Claim Flow-Through:</strong> M&E subcontractor delayed 6
              weeks due to late steelwork. How do costs flow through the contractual chain?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Prelims extension: 6 weeks × £3,500/week = £21,000</li>
              <li>Labour disruption: £8,500</li>
              <li>Plant standing time: £4,200</li>
              <li>
                <strong>Total claim:</strong> £33,700
              </li>
              <li>Subcontractor claims from main contractor under subcontract</li>
              <li>Main contractor includes in claim against client under main contract</li>
              <li>
                <strong>Back-to-back principle:</strong> Main contractor recovers from client and
                passes to subcontractor.
              </li>
              <li>
                Note: Subcontractor must comply with notice requirements in subcontract.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Subcontract review checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Scope clearly defined with exclusions listed</li>
              <li>Programme requirements and key dates specified</li>
              <li>Payment terms compliant with Construction Act</li>
              <li>Notice periods for claims and variations aligned with main contract</li>
              <li>Insurance requirements specified and adequate</li>
              <li>Design responsibility clearly allocated</li>
              <li>Flow-down requirements attached or referenced</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Retention: <strong>3-5%</strong> typical
              </li>
              <li>
                Suspension notice: <strong>7 days</strong> under Construction Act
              </li>
              <li>
                Pay less notice: minimum <strong>7 days</strong> before final date
              </li>
              <li>
                Adjudication decision: <strong>28 days</strong> from referral
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Relying on pay-when-paid</strong> — Unenforceable except insolvency
                </li>
                <li>
                  <strong>Late delay notices</strong> — May bar entitlement entirely
                </li>
                <li>
                  <strong>Incomplete back-to-back</strong> — Creates gaps in risk transfer
                </li>
                <li>
                  <strong>Poor coordination records</strong> — Difficult to prove delay causes
                </li>
                <li>
                  <strong>Ignoring flow-downs</strong> — Non-compliance can have serious
                  consequences
                </li>
              </ul>
            }
            doInstead="Treat pay-when-paid as unenforceable, submit delay notices within contractual time bars, build truly back-to-back terms with matching periods, keep contemporaneous coordination records, and embed flow-downs in subcontracts and procedures."
          />

          <SectionRule />

          <Scenario
            title="Subcontractor insolvency mid-programme"
            situation={
              <>
                Your fire alarm subcontractor goes into administration at week 20 of a 32-week programme. They have completed 60% of installation but have not been paid for their last application of £85,000 (you certified, the client paid). Their administrator demands payment; the replacement subcontractor needs three weeks to mobilise and quotes 40% more for completion.
              </>
            }
            whatToDo={
              <>
                Engage your insolvency clause immediately — most subcontracts allow termination on insolvency. Audit the work installed and tested against payment certified — pay only for verifiable work. Engage administrators properly; do not unilaterally withhold without legal advice. Mobilise the replacement under a separate subcontract; recover the cost difference and programme impact under your subcontract's damages provision and your project's risk allowance. Update the risk register and early warning under the main contract.
              </>
            }
            whyItMatters={
              <>
                Subcontractor insolvency is one of the highest-impact risks in MEP delivery. Watertight subcontracts with insolvency clauses, performance bonds (where commercial) and parent company guarantees are not paranoia — they are the basis of recovery. Plus, treat the supply chain financially fairly: prompt payment is the best insolvency prevention.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "MEP is 60–80% subcontracted — supply chain management is the day job.",
              "Back-to-back subcontracts flow down obligations, payment, programme, dispute provisions.",
              "Standard forms: JCT SBCSub, ECC subcontract, DOM/1, DOM/2 — match to main contract form.",
              "Construction Act 1996 bans pay-when-paid (except genuine insolvency); use pay-when-certified.",
              "Manage performance through regular meetings, KPIs, formal warnings — never let it drift to termination.",
              "Insolvency clauses, performance bonds, PCGs are the recovery mechanisms when things go wrong.",
              "Subcontractor design responsibilities (CDP under JCT) need explicit allocation in the subcontract.",
              "Prompt payment to the supply chain is both legal duty and best insolvency prevention.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                NEC contracts
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Tendering process
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section2_4;
