/**
 * Module 5 · Section 3 · Subsection 4 — Variations and Claims
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Valuing variations, establishing entitlement, serving notices and substantiating claims — the contract management discipline that protects margin.
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

const TITLE = 'Variations and Claims - HNC Module 5 Section 3.4';
const DESCRIPTION =
  'Master variation valuation methods, entitlement assessment, notice requirements and claims substantiation for building services contracts: instruction process, daywork, loss and expense, contemporaneous records.';

const quickCheckQuestions = [
  {
    id: 'variation-definition',
    question: 'What constitutes a valid variation under most standard form contracts?',
    options: [
      'A written instruction from the contract administrator',
      'Enter premises, examine, investigate, issue notices, prosecute',
      'Interactive trend charts showing data over time',
      'Site transformers and motor starters (autostart)',
    ],
    correctIndex: 0,
    explanation:
      "A valid variation requires a written instruction from the contract administrator (architect, engineer, or employer's representative). This ensures proper authorisation and creates a clear record for valuation.",
  },
  {
    id: 'valuation-hierarchy',
    question: 'What is the preferred order for valuing variations under JCT contracts?',
    options: [
      'Diversity factors based on simultaneous use probability',
      'Look for patterns — time, temperature, weather, specific loads',
      'Contract rates, then pro-rata rates, then fair valuation',
      'The temperature swing inside is 30% of that outside',
    ],
    correctIndex: 2,
    explanation:
      'JCT contracts establish a hierarchy: first use contract rates where applicable, then pro-rata adjustment of contract rates for similar work, and finally fair valuation where no comparable rates exist.',
  },
  {
    id: 'notice-requirements',
    question: 'Why are contractual notice requirements critically important for claims?',
    options: [
      'Failure to comply may bar the claim entirely',
      'They are just administrative formalities',
      'They only apply to large claims',
      'The employer can waive them retrospectively',
    ],
    correctIndex: 0,
    explanation:
      'Contractual notice requirements are conditions precedent to entitlement. Failure to give proper notice within the specified timeframe may completely bar a claim, regardless of its merit. Courts and adjudicators generally enforce these strictly.',
  },
  {
    id: 'contemporaneous-records',
    question: 'Contemporaneous records are essential for claims because they:',
    options: [
      'Provide objective evidence created at the time of events',
      'Manual Handling Operations Regulations 1992 (as amended)',
      'Current readings are always zero or \\\\\\\\\\\\\\\'OL\\\\\\\\\\\\\\\'',
      'Standard 1.5mm² mains cable or dedicated 5-core DALI cable',
    ],
    correctIndex: 0,
    explanation:
      'Contemporaneous records are created at or near the time of events and provide objective, credible evidence. Records created later from memory are less reliable and carry less weight in dispute resolution.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Under JCT DB 2016, who has authority to issue variation instructions?',
    options: [
      "Hydrogen and oxygen (potentially explosive mixture)",
      "The employer or employer's representative",
      "To avoid forgetting or mixing up readings",
      "One switch position won't work",
    ],
    correctAnswer: 1,
    explanation:
      'Under JCT Design and Build contracts, only the employer (or their authorised representative named in the contract) can issue variation instructions. The contractor cannot self-authorise variations.',
  },
  {
    id: 2,
    question: 'What is the primary purpose of a Confirmation of Verbal Instruction (CVI)?',
    options: [
      'To allow the contractor to refuse work',
      'To avoid the need for written instructions',
      'To convert an oral instruction into a written record',
      'To delay the project programme',
    ],
    correctAnswer: 2,
    explanation:
      'A CVI confirms verbal instructions in writing, creating a formal record. If the contract administrator does not dissent within a specified period, the verbal instruction is deemed confirmed as a valid variation.',
  },
  {
    id: 3,
    question: 'When valuing variations using contract rates, which principle applies?',
    options: [
      'Acceptable only when events are so intertwined they cannot be separated',
      'To present claims and responses in a structured tabular format',
      'Labour, materials, plant, with times and signatures',
      'Rates apply only if work is identical in character and conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Contract rates apply where the varied work is of similar character, executed under similar conditions, and does not significantly change the quantity. If conditions differ materially, rates must be adjusted or fair rates used.',
  },
  {
    id: 4,
    question: 'A daywork sheet must typically include:',
    options: [
      'Labour, materials, plant, with times and signatures',
      'Rates apply only if work is identical in character and conditions',
      'To convert an oral instruction into a written record',
      'Affects productivity without necessarily extending time',
    ],
    correctAnswer: 0,
    explanation:
      "Daywork sheets must record labour (names, trades, hours), materials used, and plant employed. They should be signed by both parties' site representatives contemporaneously to provide verified evidence.",
  },
  {
    id: 5,
    question: 'Under NEC4, the contractor must notify a compensation event within:',
    options: [
      '7 days of becoming aware',
      '8 weeks of becoming aware',
      'No time limit applies',
      '14 days of the event occurring',
    ],
    correctAnswer: 1,
    explanation:
      "NEC4 requires the contractor to notify compensation events within 8 weeks of becoming aware of the event. Failure to notify in time is a bar to recovering additional cost or time (subject to the Project Manager's discretion).",
  },
  {
    id: 6,
    question: 'Loss and expense claims under JCT require proof of:',
    options: [
      'Acceptable only when events are so intertwined they cannot be separated',
      'Rates apply only if work is identical in character and conditions',
      'Direct loss and/or expense for which the contractor would not otherwise be reimbursed',
      'To present claims and responses in a structured tabular format',
    ],
    correctAnswer: 2,
    explanation:
      'Loss and expense claims must demonstrate actual direct loss or expense suffered, with clear causation linking it to a relevant matter. Contractors cannot claim for losses already covered elsewhere or for speculative damages.',
  },
  {
    id: 7,
    question: "The 'global claim' approach is generally:",
    options: [
      'Rates apply only if work is identical in character and conditions',
      'To convert an oral instruction into a written record',
      'At contract rates, but the contractor may claim for changed conditions',
      'Acceptable only when events are so intertwined they cannot be separated',
    ],
    correctAnswer: 3,
    explanation:
      'Global claims (where multiple causes produce a single financial effect) are disfavoured by tribunals. They are only accepted where it is genuinely impossible to separate the effects of individual events. Itemised claims with clear causation are preferred.',
  },
  {
    id: 8,
    question: "What is the purpose of the 'Scott Schedule' in claims?",
    options: [
      'To present claims and responses in a structured tabular format',
      'Unabsorbed head office overheads during delay',
      'Rates apply only if work is identical in character and conditions',
      'To convert an oral instruction into a written record',
    ],
    correctAnswer: 0,
    explanation:
      "A Scott Schedule presents claims in columns showing the claim item, contractor's position, employer's response, and tribunal's decision. It provides a structured format for adjudication or arbitration.",
  },
  {
    id: 9,
    question: 'Disruption differs from prolongation in that disruption:',
    options: [
      'Acceptable only when events are so intertwined they cannot be separated',
      'Affects productivity without necessarily extending time',
      'Rates apply only if work is identical in character and conditions',
      'At contract rates, but the contractor may claim for changed conditions',
    ],
    correctAnswer: 1,
    explanation:
      'Disruption affects productivity and efficiency (doing work less efficiently than planned) without necessarily extending the project duration. Prolongation refers to an extension of the project period. Both may be claimable but require different evidence.',
  },
  {
    id: 10,
    question:
      'When installing mechanical services, a variation adding 20% more pipework would typically be valued:',
    options: [
      'Direct loss and/or expense for which the contractor would not otherwise be reimbursed',
      'To present claims and responses in a structured tabular format',
      'At contract rates, but the contractor may claim for changed conditions',
      'To convert an oral instruction into a written record',
    ],
    correctAnswer: 2,
    explanation:
      "A 20% increase in quantity would typically be valued at contract rates, but the contractor may argue that such a significant increase changes conditions (productivity, logistics, supervision) warranting rate adjustment under the 'fair valuation' provisions.",
  },
  {
    id: 11,
    question:
      'Which of the following is NOT typically a relevant matter for loss and expense under JCT?',
    options: [
      'Late information from the architect',
      'Variations instructed by the employer',
      'Opening up work that proves compliant',
      'General market price increases',
    ],
    correctAnswer: 3,
    explanation:
      "General market price increases are a contractor's risk under fixed-price contracts and are not relevant matters for loss and expense claims. The contractor bears inflation risk unless specific fluctuation provisions apply.",
  },
  {
    id: 12,
    question: "The 'Emden formula' is used to calculate:",
    options: [
      'Unabsorbed head office overheads during delay',
      'Affects productivity without necessarily extending time',
      'To convert an oral instruction into a written record',
      'Labour, materials, plant, with times and signatures',
    ],
    correctAnswer: 0,
    explanation:
      'The Emden formula (and similar Hudson/Eichleay formulae) calculates the unabsorbed head office overheads a contractor suffers when a project is delayed. It applies a percentage of the contract sum over the delay period.',
  },
];

const faqs = [
  {
    question: "What's the difference between a variation and a claim?",
    answer:
      "A variation is an authorised change to the scope of work, instructed by the contract administrator and valued under the contract's variation provisions. A claim is a request for additional payment or time based on the contractor's entitlement under the contract (e.g., for delay, disruption, or breach). Variations are generally non-contentious; claims often require negotiation or dispute resolution.",
  },
  {
    question: 'Can a contractor refuse to carry out a variation?',
    answer:
      "Generally no, unless the variation is outside the contract's scope (e.g., work fundamentally different in nature) or the employer has failed to meet payment obligations. Most standard forms require the contractor to proceed with validly instructed variations and value them afterwards. Refusal without justification may constitute breach of contract.",
  },
  {
    question: 'How detailed should contemporaneous records be?',
    answer:
      'Records should capture sufficient detail to enable later valuation: dates, times, personnel (names and trades), equipment used, materials consumed, weather conditions, instructions received, and progress achieved. Photographs, signed sheets, and diary entries are valuable. The test is whether someone unfamiliar with the project could reconstruct events from the records.',
  },
  {
    question: 'What happens if the employer disputes a variation valuation?',
    answer:
      "Typically the employer or QS provides their own valuation. If parties cannot agree, most contracts provide for interim certification at the QS's assessment with final resolution through the contract's dispute mechanism (adjudication, arbitration, or litigation). The contractor should submit their valuation with supporting evidence promptly.",
  },
  {
    question: 'Are verbal variation instructions binding?',
    answer:
      'Under most standard forms, verbal instructions are not immediately binding but can become so if confirmed in writing (by either party) and not dissented from. Best practice is to issue a Confirmation of Verbal Instruction (CVI) immediately. Some contracts (e.g., NEC) require written acceptance before work proceeds on variations.',
  },
  {
    question: 'How do I calculate disruption costs for building services installation?',
    answer:
      "Disruption claims compare actual productivity against planned productivity (often using a 'measured mile' comparison of similar work in undisrupted conditions). For M&E work, this might involve comparing installation rates (metres of cable per day, number of luminaires per shift) between disrupted and undisrupted periods. Contemporaneous records of daily outputs are essential.",
  },
];

const HNCModule5Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 4"
            title="Variations and Claims"
            description="Valuation methods, entitlement assessment, notice requirements and claims substantiation in building services contracts."
            tone="purple"
          />

          <TLDR
            points={[
              "Variation = change to scope after contract; valued under the contract’s variation clause (JCT Section 5, NEC CE under Clause 60).",
              "Establish entitlement first (is it a variation? on what basis?) before valuing — un-instructed work is a gift to the client.",
              "Notices are mandatory and time-sensitive — JCT 2.27, NEC 15.1 — late notices weaken or defeat claims.",
              "Substantiation: contemporaneous records (drawings, instructions, programme impact, cost data) are the evidence base.",
              "Disputed variations escalate through the contract’s dispute resolution: adjudication (statutory), then arbitration or litigation.",
            ]}
          />

          <RegsCallout
            source="Housing Grants, Construction and Regeneration Act 1996 (as amended) — Section 108"
            clause={'A party to a construction contract has the right to refer a dispute arising under the contract for adjudication under a procedure complying with this section. For this purpose "dispute" includes any difference. The contract shall include provision in writing so as to enable a party to give notice at any time of his intention to refer a dispute to adjudication.'}
            meaning={
              <>
                Statutory adjudication under the Construction Act gives both parties a 28-day route to a binding decision on disputed variations and claims. It is fast, relatively cheap, and the decision is binding pending final determination. Contemporaneous records and clear notices are what win adjudications — not retrospective narrative.
              </>
            }
            cite="Source: Housing Grants, Construction and Regeneration Act 1996 (as amended) — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Understand the variation instruction process and authorisation requirements',
              'Apply the valuation hierarchy: contract rates, pro-rata, fair valuation, daywork',
              'Identify notice requirements and their importance as conditions precedent',
              'Prepare and substantiate loss and expense claims',
              'Maintain contemporaneous records to support claims',
              'Distinguish between prolongation, disruption, and acceleration claims',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Variation Instruction Process">
            <p>
              Variations are changes to the contracted scope of work, whether additions, omissions,
              or alterations. Proper administration of variations protects both parties and ensures
              fair payment for changed work.
            </p>
            <p>
              <strong>What constitutes a variation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Addition:</strong> New work not in original scope (e.g., additional
                containment routes)
              </li>
              <li>
                <strong>Omission:</strong> Removal of work from scope (e.g., deleting a distribution
                board)
              </li>
              <li>
                <strong>Substitution:</strong> Replacement with different specification (e.g., LED
                for fluorescent)
              </li>
              <li>
                <strong>Alteration:</strong> Change to design or sequence (e.g., relocating a
                submain route)
              </li>
              <li>
                <strong>Obligation change:</strong> Modification to access, working hours, or
                constraints
              </li>
            </ul>
            <p>
              <strong>Variation Instruction Requirements (Contract — Who Can Instruct — Form):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>JCT SBC:</strong> Architect/Contract Administrator — Written (AI form)
              </li>
              <li>
                <strong>JCT DB:</strong> Employer/Employer's Agent — Change to Employer's
                Requirements
              </li>
              <li>
                <strong>NEC4:</strong> Project Manager — Project Manager's instruction
              </li>
              <li>
                <strong>FIDIC:</strong> Engineer — Written instruction
              </li>
            </ul>
            <p>
              <strong>Confirmation of Verbal Instruction (CVI) —</strong> When a verbal instruction
              is given on site, the contractor should issue a CVI confirming:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Date and time of verbal instruction</li>
              <li>Person who gave the instruction</li>
              <li>Description of the instructed work</li>
              <li>Request for written confirmation or deemed acceptance</li>
            </ul>
            <p>
              Under JCT, if the CA does not dissent within 7 days, the CVI is deemed a valid
              instruction.
            </p>
            <p>
              <strong>M&E reality:</strong> On complex building services projects, verbal
              instructions are common due to coordination pressures. Robust CVI procedures protect
              the subcontractor's entitlement to payment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Valuation Methods">
            <p>
              Standard form contracts establish a hierarchy of valuation methods, moving from the
              most objective (contract rates) to the most subjective (fair valuation) as the work
              diverges from the original scope.
            </p>
            <p>
              <strong>1. Contract Rates:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Applied where work is of similar character</li>
              <li>Executed under similar conditions</li>
              <li>Quantity not significantly changed</li>
              <li>Most objective, least contentious</li>
            </ul>
            <p>
              <strong>2. Pro-rata Rates:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Adjusted contract rates for similar work</li>
              <li>Allowance for different conditions</li>
              <li>Quantity variations accounted for</li>
              <li>Based on proportional adjustment</li>
            </ul>
            <p>
              <strong>3. Fair Valuation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Used when no comparable rates exist</li>
              <li>Based on cost plus reasonable margin</li>
              <li>Requires detailed cost breakdown</li>
              <li>Often subject to negotiation</li>
            </ul>
            <p>
              <strong>4. Daywork:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Labour, materials, plant at recorded cost</li>
              <li>Plus percentage additions for overheads/profit</li>
              <li>Requires signed daywork sheets</li>
              <li>Used for small, unpredictable works</li>
            </ul>
            <p>
              <strong>Daywork Valuation Detail (Component — Basis — Typical Addition):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Labour:</strong> Actual hours at hourly rate — +130-150% (RICS definition)
              </li>
              <li>
                <strong>Materials:</strong> Invoice cost — +10-15%
              </li>
              <li>
                <strong>Plant:</strong> Hire rates or depreciation — +10-15%
              </li>
              <li>
                <strong>Subcontractors:</strong> Invoiced amounts — +2.5-5%
              </li>
            </ul>
            <p>
              <strong>Building Services Example — Cable Tray Rerouting:</strong> An architect
              instructs rerouting of 50m of cable tray due to a clash with structural steelwork.
              The original contract rate for cable tray was priced for straight runs at low level.
              The variation involves working at 4m height around obstructions.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contract rate basis:</strong> Original rate was for different conditions
              </li>
              <li>
                <strong>Pro-rata adjustment:</strong> Add allowance for height, access equipment,
                reduced productivity
              </li>
              <li>
                <strong>Submission:</strong> Build-up showing base rate plus adjustments for
                changed conditions
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> The contractor must substantiate why contract rates
              are inapplicable before moving to fair valuation. Simply asserting rates are too low
              is insufficient.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Notice Requirements and Conditions Precedent">
            <p>
              Modern standard form contracts contain strict notice requirements. These are not mere
              formalities; failure to give proper notice may completely bar a claim, regardless of
              its substantive merit.
            </p>
            <p>
              <strong>Critical Warning:</strong> Courts and adjudicators generally enforce notice
              requirements strictly. The 2021 Technology and Construction Court decision in{' '}
              <em>Bexheat v Essex Services</em> confirmed that failure to give timely notice can
              bar an otherwise valid claim. "Time is of the essence" in notification.
            </p>
            <p>
              <strong>Typical Notice Periods (Contract — Event — Period):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>JCT SBC 2016:</strong> Loss and expense — "As soon as it becomes reasonably
                apparent"
              </li>
              <li>
                <strong>JCT SBC 2016:</strong> Extension of time — "Forthwith" upon delay becoming
                apparent
              </li>
              <li>
                <strong>NEC4:</strong> Compensation event — 8 weeks of becoming aware
              </li>
              <li>
                <strong>FIDIC 2017:</strong> Contractor's claim — 28 days of awareness
              </li>
            </ul>
            <p>
              <strong>Notice Content Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identification:</strong> Clearly identify the event or instruction giving
                rise to the claim
              </li>
              <li>
                <strong>Contractual basis:</strong> Reference the relevant contract clause(s)
              </li>
              <li>
                <strong>Impact statement:</strong> Describe the likely effect on time and/or cost
              </li>
              <li>
                <strong>Reservation:</strong> Reserve the right to submit detailed particulars
              </li>
              <li>
                <strong>Records intention:</strong> State that contemporaneous records are being
                kept
              </li>
            </ul>
            <p>
              <strong>Sample Early Warning Notice (NEC4 Style) —</strong> To: Project Manager.
              Date: 15 March 2024. Re: Early Warning Notice - Main Plant Room Access. We hereby
              give notice under clause 15.1 of a matter which could:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Delay completion (access restriction until 30 April)</li>
              <li>Increase total cost (out-of-sequence working)</li>
              <li>
                The structural contractor has advised that the main plant room will not be handed
                over until 30 April 2024, 6 weeks later than the construction programme.
              </li>
              <li>
                We request this matter be added to the Risk Register and discussed at the next
                risk reduction meeting.
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Notify early and often. An early notification that
              proves unnecessary is far better than a late notification that bars a valid claim.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Loss and Expense Claims and Substantiation">
            <p>
              Loss and expense claims compensate the contractor for direct loss or expense beyond
              the contract sum, caused by matters for which the employer bears contractual risk.
              Substantiation requires demonstrating causation, entitlement, and quantum.
            </p>
            <p>
              <strong>Relevant Matters (JCT) — Employer Events:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Variations and instructions</li>
              <li>Late information/drawings</li>
              <li>Discrepancies in documents</li>
              <li>Failure to give access</li>
              <li>Work by employer's contractors</li>
            </ul>
            <p>
              <strong>Opening Up/Testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Inspection revealing compliant work</li>
              <li>Testing beyond contract requirements</li>
              <li>Suspension for non-payment</li>
              <li>Impediment by statutory undertaker</li>
              <li>Exercise of CDM powers</li>
            </ul>
            <p>
              <strong>Types of Recoverable Loss:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prolongation costs:</strong> Site overheads for extended duration
                (supervision, welfare, plant)
              </li>
              <li>
                <strong>Disruption costs:</strong> Loss of productivity due to working
                inefficiently
              </li>
              <li>
                <strong>Acceleration costs:</strong> Premium time/additional resources to recover
                delay (if instructed)
              </li>
              <li>
                <strong>Head office overheads:</strong> Unabsorbed central costs during delay
                (formula-based)
              </li>
              <li>
                <strong>Loss of profit:</strong> On the delayed project or on other work foregone
              </li>
              <li>
                <strong>Finance charges:</strong> Interest on delayed payments or additional
                capital employed
              </li>
            </ul>
            <p>
              <strong>Contemporaneous Records — Daily:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Labour allocation sheets (names, trades, areas)</li>
              <li>Plant on site register</li>
              <li>Weather records</li>
              <li>Instructions received log</li>
              <li>Progress photographs</li>
            </ul>
            <p>
              <strong>Weekly/Monthly Records:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Progress reports with productivity data</li>
              <li>Meeting minutes</li>
              <li>Programme updates</li>
              <li>Correspondence register</li>
              <li>Cost tracking against budget</li>
            </ul>
            <p>
              <strong>Claim Preparation Methodology (Step — Description — Evidence):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Event:</strong> Identify the cause/relevant matter — Instructions,
                minutes, correspondence
              </li>
              <li>
                <strong>2. Entitlement:</strong> Link to contract clause — Contract analysis, legal
                opinion
              </li>
              <li>
                <strong>3. Causation:</strong> Show event caused the loss — Programme analysis,
                delay expert
              </li>
              <li>
                <strong>4. Quantum:</strong> Calculate recoverable loss — Cost records, invoices,
                calculations
              </li>
              <li>
                <strong>5. Submission:</strong> Package claim professionally — Scott Schedule,
                executive summary
              </li>
            </ul>
            <p>
              <strong>M&E Disruption Claim Example:</strong> An electrical subcontractor is forced
              to work in areas out of sequence due to late structural completion. Instead of
              installing containment floor-by-floor (planned productivity: 40m/day), work is
              scattered across multiple floors (actual productivity: 25m/day).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Measured mile:</strong> Compare productivity on unaffected areas (40m/day
                baseline)
              </li>
              <li>
                <strong>Lost productivity:</strong> (40-25)/40 = 37.5% efficiency loss
              </li>
              <li>
                <strong>Cost impact:</strong> Additional labour hours × rate = claim quantum
              </li>
              <li>
                <strong>Records needed:</strong> Daily allocation sheets showing hours per area
              </li>
            </ul>
            <p>
              <strong>Tribunal reality:</strong> Claims with poor records are heavily discounted or
              rejected entirely. The burden of proof is on the claimant to demonstrate both
              liability and quantum on the balance of probabilities.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Variation Valuation Hierarchy:</strong> Architect instructs
              substitution of standard LED panels for emergency-rated versions in a corridor.
              Original contract rate: £85/luminaire. Emergency version requires different wiring
              and testing.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contract rate applies to standard LED panel: £85</li>
              <li>Emergency luminaire cost difference: +£45</li>
              <li>Additional wiring (self-contained batteries): +£20</li>
              <li>Emergency circuit testing: +£8</li>
              <li>
                Adjusted rate: £85 + £45 + £20 + £8 = <strong>£158/luminaire</strong>
              </li>
              <li>This is a pro-rata adjustment of contract rates, not fair valuation.</li>
            </ul>
            <p>
              <strong>Example 2 — Prolongation Cost Calculation:</strong> M&E subcontractor is
              granted 4 weeks extension of time due to late access. Calculate prolongation costs.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site manager: £1,200/week</li>
              <li>Site supervisor: £950/week</li>
              <li>Welfare/office costs: £180/week</li>
              <li>Small plant/tools: £220/week</li>
              <li>Preliminaries total: £2,550/week</li>
              <li>
                4 weeks prolongation: 4 × £2,550 = <strong>£10,200</strong>
              </li>
              <li>Plus head office overheads (Emden formula):</li>
              <li>Contract sum: £850,000; Head office percentage: 6%; Delay 4 weeks</li>
              <li>
                HO overheads: (£850,000 × 0.06 × 4) ÷ 52 = <strong>£3,923</strong>
              </li>
              <li>
                <strong>Total claim: £10,200 + £3,923 = £14,123</strong>
              </li>
            </ul>
            <p>
              <strong>Example 3 — Daywork Calculation:</strong> Emergency modification to
              distribution board following discovery of existing asbestos. 2 electricians for 6
              hours plus materials.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2 electricians × 6 hours × £22/hour = £264</li>
              <li>Labour addition (+145%): £264 × 1.45 = £383</li>
              <li>Materials: MCBs, cable, sundries: £185</li>
              <li>Materials addition (+12.5%): £185 × 1.125 = £208</li>
              <li>
                <strong>Total daywork value: £383 + £208 = £591</strong>
              </li>
              <li>Note: Must be supported by signed daywork sheets.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Variation administration checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Receive written instruction (or issue CVI for verbal)</li>
              <li>Acknowledge receipt and note any impact on programme</li>
              <li>Prepare costed submission within contract timeframe</li>
              <li>Submit with build-up showing valuation method used</li>
              <li>Maintain records of actual cost if daywork applies</li>
              <li>Include in interim application with supporting documents</li>
            </ul>
            <p>
              <strong>Claims best practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Notify early - within contractual timeframes</li>
              <li>Keep contemporaneous records from day one</li>
              <li>Identify each claim event separately</li>
              <li>Link cause to effect with clear causation narrative</li>
              <li>Quantify using actual costs where possible</li>
              <li>Present professionally with executive summary</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Late notification</strong> — may bar the entire claim
                </li>
                <li>
                  <strong>Global claims</strong> — tribunals prefer itemised claims
                </li>
                <li>
                  <strong>Poor records</strong> — claims are discounted or rejected
                </li>
                <li>
                  <strong>Ignoring concurrent delay</strong> — reduces entitlement
                </li>
                <li>
                  <strong>Excessive claims</strong> — damages credibility for valid items
                </li>
              </ul>
            }
            doInstead="Notify within the contract time bar, itemise each cause and effect, keep contemporaneous daily records, account for any concurrent delay analytically, and submit only realistic, well-substantiated claims."
          />

          <SectionRule />

          <Scenario
            title="Verbal instruction unsupported by written record"
            situation={
              <>
                The contract administrator verbally tells you to redesign the lighting layout at high level to suit a new ceiling grid. You crack on, complete the work, and submit a £45k variation. The CA rejects it: "I never said that, and you have no instruction." You have no email confirmation, no written instruction, no contemporaneous record of the conversation.
              </>
            }
            whatToDo={
              <>
                Never act on verbal instructions without written confirmation. JCT Clause 5.1 requires variations to be in writing; the contractor should refuse verbal instructions or follow up the same day with a "confirmation of verbal instruction" (CVI) email asking the CA to confirm. NEC4 has equivalent provisions. From now on, no verbal instruction is acted on without same-day written confirmation. Brief site staff on this discipline.
              </>
            }
            whyItMatters={
              <>
                Variations and claims live or die on contemporaneous records. Verbal instructions, ambiguous emails and missing notices are how contractors lose money on otherwise valid work. The discipline of "if it isn't written, it didn't happen" is the cheapest commercial protection on any project.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Variation = scope change after contract; valued under contract’s variation clause.",
              "Establish entitlement (is it a variation? on what basis?) before valuing.",
              "Notices mandatory and time-sensitive — late notices weaken or defeat claims.",
              "Contemporaneous records: drawings, instructions, programme impact, cost data.",
              "Loss and expense (JCT) / compensation events (NEC) cover both cost and time impacts.",
              "Disputed variations escalate via adjudication (28 days, statutory under HGCRA), then arbitration/litigation.",
              "Verbal instructions need same-day written confirmation (CVI) — refuse to act otherwise.",
              "Final account negotiation: compile all variations into a single closing position, supported by audit trail.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cost control
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Final account
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section3_4;
