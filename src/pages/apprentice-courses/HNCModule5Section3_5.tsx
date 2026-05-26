/**
 * Module 5 · Section 3 · Subsection 5 — Final Account
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   The closing commercial settlement — final measurement, agreement of variations, retention release and DLP — the discipline that books the project’s actual margin.
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

const TITLE = 'Final Account - HNC Module 5 Section 3.5';
const DESCRIPTION =
  'Master final account procedures in building services projects: final measurement, account agreement, retention release, defects liability period, and financial close-out processes.';

const quickCheckQuestions = [
  {
    id: 'final-measurement-purpose',
    question: 'What is the primary purpose of final measurement in a building services contract?',
    options: [
      'To determine liquidated damages',
      'To establish the true extent of work executed',
      'To calculate profit margins',
      'To assess quality standards',
    ],
    correctIndex: 1,
    explanation:
      'Final measurement establishes the actual extent of work executed on site, allowing accurate valuation of the completed works against the contract sum and any variations.',
  },
  {
    id: 'retention-release',
    question: 'When is the second half of retention typically released?',
    options: [
      'All workers to provide essential H&S awareness',
      'At the end of the defects liability period',
      'To prevent fingers slipping onto live conductors',
      'Maximum winding temperature of 155 degrees C',
    ],
    correctIndex: 1,
    explanation:
      'Half of retention is released at practical completion, and the remaining half is released at the end of the defects liability period once all defects have been satisfactorily rectified.',
  },
  {
    id: 'defects-liability',
    question:
      'What is the typical duration of a defects liability period in UK building contracts?',
    options: [
      '3 months',
      '6 months',
      '24 months',
      '12 months',
    ],
    correctIndex: 3,
    explanation:
      'The defects liability period (also called rectification period) is typically 12 months from practical completion under most UK standard form contracts, though this can vary by contract.',
  },
  {
    id: 'final-certificate',
    question: 'What does the issue of a Final Certificate signify?',
    options: [
      'To provide protection against electric shock',
      'Final settlement of all financial matters',
      'Temperature and voltage drop effects vary with load',
      'Test date, next test date, and tester ID',
    ],
    correctIndex: 1,
    explanation:
      'The Final Certificate represents the conclusive settlement of financial matters between the parties, confirming the final contract sum and releasing any remaining retention.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In a re-measurement contract, how is the final account determined?',
    options: [
      'By the original tender sum only',
      'By measuring actual work executed against bill rates',
      "By the contractor's submitted costs",
      'By averaging tender and final costs',
    ],
    correctAnswer: 1,
    explanation:
      'In re-measurement contracts, the final account is determined by measuring the actual quantities of work executed on site and valuing them against the rates in the bills of quantities.',
  },
  {
    id: 2,
    question: 'What percentage is typically held as retention in building services contracts?',
    options: [
      '8-10%',
      '1-2%',
      '3-5%',
      '15-20%',
    ],
    correctAnswer: 2,
    explanation:
      'Retention is typically 3-5% of the contract sum in UK building contracts, with 5% being common. Half is released at practical completion and half at the end of the defects liability period.',
  },
  {
    id: 3,
    question:
      "A contractor's final account includes provisional sum expenditure of £45,000. The provisional sum allowed was £50,000. What adjustment is made?",
    options: [
      'Certificate of Making Good Defects',
      'Preliminary costs already paid',
      'Depends on the contract terms',
      'Deduct £50,000 and add £45,000',
    ],
    correctAnswer: 3,
    explanation:
      'The original provisional sum (£50,000) is omitted from the contract sum, and the actual expenditure (£45,000) is added. This results in a net credit of £5,000 to the employer.',
  },
  {
    id: 4,
    question:
      'Under JCT contracts, within what period must the contractor submit their final account documentation?',
    options: [
      '6 months of practical completion',
      '3 months of practical completion',
      '1 month of practical completion',
      '12 months of practical completion',
    ],
    correctAnswer: 0,
    explanation:
      'Under JCT contracts, the contractor must submit all documentation required for computing the final statement within 6 months of practical completion.',
  },
  {
    id: 5,
    question: 'Which document must be issued before the Final Certificate can be released?',
    options: [
      'Certificate of Practical Completion',
      'Certificate of Making Good Defects',
      'Performance Bond',
      'Building Regulations Completion Certificate',
    ],
    correctAnswer: 1,
    explanation:
      'The Certificate of Making Good Defects (or Making Good certificate) must be issued confirming all defects have been remedied before the Final Certificate can be released.',
  },
  {
    id: 6,
    question: 'In lump sum contracts, variations are valued using:',
    options: [
      'Identifying the specific unhelpful thought',
      'Single insulation providing equivalent protection to double',
      'Contract rates where applicable, or fair rates where not',
      'Clear coordination between team members and other trades',
    ],
    correctAnswer: 2,
    explanation:
      'Variations are valued using contract rates where the work is similar to bill items, or fair rates and prices where the work differs significantly and contract rates do not apply.',
  },
  {
    id: 7,
    question: 'What is the purpose of a retention bond?',
    options: [
      "To guarantee the contractor's performance",
      'To guarantee completion dates',
      'To secure payment from the employer',
      'To replace cash retention with a bank guarantee',
    ],
    correctAnswer: 3,
    explanation:
      'A retention bond allows the contractor to receive payment in full without cash retention being held, replacing it with a bank or insurance company guarantee for the same amount.',
  },
  {
    id: 8,
    question:
      'A £2.5m electrical installation contract has 5% retention. What is released at practical completion?',
    options: [
      '£62,500',
      '£250,000',
      '£25,000',
      '£125,000',
    ],
    correctAnswer: 0,
    explanation:
      'Total retention is £2,500,000 x 5% = £125,000. Half is released at practical completion = £62,500. The remaining £62,500 is held until the end of the defects liability period.',
  },
  {
    id: 9,
    question: 'Claims for loss and expense in the final account must typically be:',
    options: [
      'Submitted within 14 days of the event',
      'Supported by records and evidence',
      'Agreed before practical completion',
      'Limited to 10% of contract value',
    ],
    correctAnswer: 1,
    explanation:
      'Claims for loss and expense must be supported by contemporaneous records, cost breakdowns, and evidence demonstrating the cause and effect relationship between the event and the loss.',
  },
  {
    id: 10,
    question:
      'The Final Certificate under JCT becomes conclusive evidence of certain matters after:',
    options: [
      '14 days',
      '12 months',
      '28 days',
      '6 months',
    ],
    correctAnswer: 2,
    explanation:
      'Under JCT contracts, the Final Certificate becomes conclusive evidence of certain matters (including that the contractor has fulfilled obligations regarding materials and workmanship) after 28 days if neither party has raised disputes.',
  },
  {
    id: 11,
    question: 'Which of the following is NOT typically included in final account adjustments?',
    options: [
      'Measured variations',
      'Fluctuations (if applicable)',
      'Provisional sum adjustments',
      'Preliminary costs already paid',
    ],
    correctAnswer: 3,
    explanation:
      'Preliminary costs that have already been paid through interim valuations are not adjusted again in the final account - they form part of the certified sums already paid.',
  },
  {
    id: 12,
    question: 'During the defects liability period, who is responsible for insuring the works?',
    options: [
      'Depends on the contract terms',
      'The contract administrator',
      'Always the contractor',
      'Always the employer',
    ],
    correctAnswer: 0,
    explanation:
      'Responsibility for insurance during the defects liability period depends on the contract terms. Under JCT, it typically transfers to the employer at practical completion for new works.',
  },
];

const faqs = [
  {
    question:
      'What is the difference between re-measurement and lump sum contracts for final accounts?',
    answer:
      'In a lump sum contract, the contract sum is fixed and only adjusted for variations, provisional sums, and claims. The final account reconciles these adjustments. In a re-measurement contract, the final account is calculated by measuring all work actually executed and valuing it against bill rates - there is no fixed price and the final sum emerges from the measurement process.',
  },
  {
    question: 'How long does the employer have to settle the final account?',
    answer:
      'Under JCT contracts, once the final statement is agreed or determined, the Final Certificate must be issued within 2 months. Payment is then due within 14 days of issue. However, final account agreement itself can take several months depending on complexity and the quality of records maintained during the project.',
  },
  {
    question: 'Can the employer deduct liquidated damages from the final account?',
    answer:
      'Yes, if the contractor failed to complete on time and no extension of time was granted, the employer can deduct liquidated damages at the rate stated in the contract. These should have been notified and deducted during the project, but any outstanding amounts can be reconciled in the final account. The contractor may dispute this if they believe extensions were due.',
  },
  {
    question: 'What happens if defects are not rectified during the defects liability period?',
    answer:
      'If the contractor fails to rectify notified defects, the employer can employ others to carry out the work and deduct the cost from the retention or final account. The Making Good certificate cannot be issued until defects are resolved, which delays the Final Certificate and release of remaining retention.',
  },
  {
    question: 'How should daywork be valued in the final account?',
    answer:
      'Daywork is valued using the daywork rates stated in the contract (often based on RICS/ECA schedules plus percentage additions for overheads and profit). Detailed records signed by the clerk of works or contract administrator are essential - these should be submitted within the timescales stated in the contract, typically within 7 days of execution.',
  },
  {
    question:
      'What records should a building services contractor maintain for final account purposes?',
    answer:
      'Essential records include: daily site diaries, signed daywork sheets, variation instructions and responses, measurement records, delivery tickets, labour allocation records, plant hire records, photographic evidence, correspondence regarding delays or disruption, and as-built drawings. Good record-keeping significantly reduces final account disputes.',
  },
];

const HNCModule5Section3_5 = () => {
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
            eyebrow="Module 5 · Section 3 · Subsection 5"
            title="Final Account"
            description="Final measurement, account agreement, retention release, defects liability period and financial close-out."
            tone="purple"
          />

          <TLDR
            points={[
              "Final account = agreed total of all measured work + agreed variations + agreed loss and expense / CEs + release of retention.",
              "Aim to close within 3–6 months of practical completion — drift past 12 months and recovery becomes harder.",
              "Compile a final account file: contract sum, all variations (instructed, valued, disputed), loss and expense, day-works, retention, contra-charges.",
              "Retention release: half at PC, half at end of DLP (typically 12 months) — track defects rectification to avoid retention erosion.",
              "Defects Liability Period: rectify all defects notified within DLP; client may withhold retention to cover unresolved defects.",
            ]}
          />

          <RegsCallout
            source="JCT Standard Building Contract 2024 — Clause 4.26 (Final Statement)"
            clause="The Architect/Contract Administrator shall, not later than 3 months after the date of issue of the Notice of Completion of Making Good, issue the Final Certificate. The Final Certificate is conclusive evidence (subject to any proceedings commenced) that the Contractor has properly completed the Works."
            meaning={
              <>
                The Final Certificate under JCT closes the financial settlement and is conclusive evidence (subject to contestation periods). Get the final account agreed in good time before the FC is issued, otherwise disputed amounts can become un-recoverable. The 3-month window after Making Good is the active settlement period.
              </>
            }
            cite="Source: JCT Standard Building Contract 2024 (refer to JCT published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Understand final measurement processes for re-measurement and lump sum contracts',
              'Prepare and negotiate final account submissions',
              'Manage retention release procedures and requirements',
              'Administer the defects liability period effectively',
              'Process financial close-out and Final Certificate',
              'Maintain records to support final account claims',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Final Measurement Process">
            <p>
              Final measurement is the process of establishing the true extent of work executed on
              site, forming the basis for calculating the final contract sum. The approach differs
              significantly between re-measurement and lump sum contracts.
            </p>
            <p>
              <strong>Re-measurement vs Lump Sum Contracts (Aspect — Re-measurement — Lump Sum):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contract sum:</strong> Provisional, based on estimated quantities — Fixed,
                unless varied
              </li>
              <li>
                <strong>Final account basis:</strong> Full measurement of all work executed —
                Contract sum plus/minus adjustments
              </li>
              <li>
                <strong>Quantity risk:</strong> Employer bears quantity risk — Contractor bears
                quantity risk
              </li>
              <li>
                <strong>Common use:</strong> Refurbishment, incomplete design — New build, complete
                design
              </li>
              <li>
                <strong>Valuation method:</strong> Measured quantities x bill rates — Contract rates
                for similar work
              </li>
            </ul>
            <p>
              <strong>Building Services Final Measurement Considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable runs:</strong> Actual installed lengths often differ from tender
                allowances due to routing changes
              </li>
              <li>
                <strong>Containment:</strong> Re-measure cable tray, trunking and conduit against
                as-built drawings
              </li>
              <li>
                <strong>Distribution boards:</strong> Verify final circuit configurations against
                specification
              </li>
              <li>
                <strong>Luminaires:</strong> Count against lighting layouts, noting any
                substitutions
              </li>
              <li>
                <strong>Control wiring:</strong> Often requires detailed measurement due to late
                coordination
              </li>
            </ul>
            <p>
              <strong>Practical tip:</strong> Take photographs during installation to support
              measurements, particularly for concealed services that cannot be verified once
              covered.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Variations Settlement and Account Agreement">
            <p>
              The final account must reconcile all variations issued during the contract. Proper
              valuation and agreement of variations is often the most contentious aspect of final
              account negotiation.
            </p>
            <p>
              <strong>Variation Valuation Hierarchy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contract rates where work is of similar character</li>
              <li>Pro-rata contract rates where similar but different conditions</li>
              <li>Fair rates and prices where contract rates not applicable</li>
              <li>Daywork as last resort (with proper records)</li>
            </ul>
            <p>
              <strong>Final Account Adjustments:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measured variations (additions/omissions)</li>
              <li>Provisional sum expenditure reconciliation</li>
              <li>Prime cost sum adjustments</li>
              <li>Fluctuations (if contract allows)</li>
              <li>Loss and expense claims</li>
            </ul>
            <p>
              <strong>Final Account Statement Structure (Item — Amount):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Original contract sum:</strong> £2,500,000
              </li>
              <li>
                <strong>Add: Measured variations (net):</strong> £185,000
              </li>
              <li>
                <strong>Omit: Provisional sums allowed:</strong> (£150,000)
              </li>
              <li>
                <strong>Add: Provisional sum expenditure:</strong> £142,000
              </li>
              <li>
                <strong>Add: Loss and expense (agreed):</strong> £45,000
              </li>
              <li>
                <strong>Final Contract Sum:</strong> £2,722,000
              </li>
            </ul>
            <p>
              <strong>Common Dispute Areas in M&E Final Accounts:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Coordination changes:</strong> Who instructed the change and was it a
                variation?
              </li>
              <li>
                <strong>Specification interpretation:</strong> Was the specified product or
                equivalent installed?
              </li>
              <li>
                <strong>Daywork rates:</strong> Application of percentage additions for overheads
              </li>
              <li>
                <strong>Prolongation costs:</strong> Linking delays to specific variations
              </li>
              <li>
                <strong>Design development:</strong> Distinguishing design changes from detail
                development
              </li>
            </ul>
            <p>
              <strong>Negotiation approach:</strong> Agree undisputed items first to establish
              momentum, then focus on disputed items with supporting evidence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Retention Release and Defects Liability Period">
            <p>
              Retention is money held back from interim payments as security for proper completion
              of the works and rectification of defects. Understanding the release mechanism and
              defects liability obligations is essential for financial planning.
            </p>
            <p>
              <strong>Retention Release Schedule (Stage — Held — Released):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>During construction:</strong> Full retention (typically 5%) — None
              </li>
              <li>
                <strong>Practical completion:</strong> 2.5% — 2.5% (first moiety)
              </li>
              <li>
                <strong>During DLP:</strong> 2.5% — None
              </li>
              <li>
                <strong>End of DLP / Making Good:</strong> None — 2.5% (second moiety)
              </li>
            </ul>
            <p>
              <strong>Defects Liability Obligations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rectify defects notified by contract administrator</li>
              <li>Attend site within reasonable time</li>
              <li>Complete remedial work at own cost</li>
              <li>Maintain adequate insurance cover</li>
              <li>Provide access for employer's operations</li>
            </ul>
            <p>
              <strong>Retention Bond Alternative:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Bank or surety guarantee replaces cash retention</li>
              <li>Contractor receives full payment</li>
              <li>Improves contractor cash flow significantly</li>
              <li>Employer has same security level</li>
              <li>Bond cost typically 1-2% of retention value</li>
            </ul>
            <p>
              <strong>Retention Calculation Example:</strong> Contract sum £1,800,000; Retention 5%;
              Total retention £90,000. Released at PC: £45,000. Released at end of DLP: £45,000.
              Cash flow impact: £90,000 held for 12+ months post-PC.
            </p>
            <p>
              <strong>Common Building Services Defects:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical:</strong> Earth fault loop impedance failures, RCD nuisance
                tripping, labelling errors
              </li>
              <li>
                <strong>Lighting:</strong> Incorrect colour temperature, control system programming
                issues
              </li>
              <li>
                <strong>Fire alarm:</strong> False alarm patterns, detector positioning issues
              </li>
              <li>
                <strong>Data:</strong> Network testing failures, fibre attenuation issues
              </li>
              <li>
                <strong>BMS:</strong> Control strategy deficiencies, sensor calibration drift
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Conduct a pre-DLP walkthrough before the defects
              period expires to identify any outstanding issues before Making Good certificate is
              due.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Final Certificate and Financial Close-out">
            <p>
              The Final Certificate represents the conclusive financial settlement of the contract,
              releasing remaining retention and confirming the adjusted contract sum. Understanding
              the certification process and its legal implications is crucial.
            </p>
            <p>
              <strong>Pre-conditions for Final Certificate:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Practical Completion certificate issued</li>
              <li>Defects liability period completed</li>
              <li>Making Good certificate issued (all defects rectified)</li>
              <li>Final account documentation submitted by contractor</li>
              <li>Final account agreed or determined by contract administrator</li>
              <li>As-built drawings and O&M manuals provided</li>
            </ul>
            <p>
              <strong>JCT Final Certificate Timeline:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Practical Completion:</strong> Day 0
              </li>
              <li>
                <strong>Contractor submits final account docs:</strong> Within 6 months of PC
              </li>
              <li>
                <strong>End of Defects Liability Period:</strong> 12 months from PC
              </li>
              <li>
                <strong>Making Good Certificate issued:</strong> When all defects rectified
              </li>
              <li>
                <strong>Final Certificate issued:</strong> Within 2 months of final account
                agreement
              </li>
              <li>
                <strong>Final payment due:</strong> 14 days from Final Certificate
              </li>
            </ul>
            <p>
              <strong>Final Certificate Content (Element — Description):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Final contract sum:</strong> Agreed adjusted contract sum
              </li>
              <li>
                <strong>Total previously certified:</strong> Sum of all interim certificates
              </li>
              <li>
                <strong>Balance due:</strong> Final sum minus previously certified
              </li>
              <li>
                <strong>Retention release:</strong> Remaining retention held
              </li>
              <li>
                <strong>Net payment due:</strong> Final payment to contractor
              </li>
            </ul>
            <p>
              <strong>Legal Effect of Final Certificate:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Becomes conclusive evidence after 28 days (unless disputed)</li>
              <li>Confirms contractor fulfilled material/workmanship obligations</li>
              <li>Settles all financial claims under the contract</li>
              <li>Does not affect common law rights for latent defects</li>
              <li>Limitation periods for claims continue to run separately</li>
            </ul>
            <p>
              <strong>Financial Close-out Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All variations agreed and valued</li>
              <li>Provisional and prime cost sums reconciled</li>
              <li>Daywork accounts agreed</li>
              <li>Loss and expense claims settled</li>
              <li>Contra charges reconciled</li>
              <li>Subcontractor final accounts closed</li>
              <li>Retention bonds returned (if applicable)</li>
              <li>Performance bond released</li>
            </ul>
            <p>
              <strong>Commercial reality:</strong> Final accounts often take 12-24 months to agree
              on complex projects. Maintaining good records and professional relationships speeds
              this process considerably.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Retention Calculation and Release:</strong> An electrical
              subcontract has a final account value of £850,000 with 5% retention. Calculate the
              retention release amounts.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Final account value: £850,000</li>
              <li>
                Total retention: £850,000 x 5% = <strong>£42,500</strong>
              </li>
              <li>
                First moiety released: £42,500 ÷ 2 = <strong>£21,250</strong>
              </li>
              <li>
                Second moiety released: <strong>£21,250</strong>
              </li>
              <li>
                <strong>Cash flow impact:</strong> £42,500 held during construction.
              </li>
            </ul>
            <p>
              <strong>Example 2 — Provisional Sum Adjustment:</strong> A contract allowed £75,000
              provisional sum for BMS. Actual expenditure was £82,500. Calculate the adjustment.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Provisional sum allowed: £75,000</li>
              <li>Actual BMS expenditure: £82,500</li>
              <li>Omit provisional sum: (£75,000)</li>
              <li>Add actual expenditure: £82,500</li>
              <li>
                Net adjustment: £82,500 - £75,000 = <strong>+£7,500</strong>
              </li>
              <li>This £7,500 addition is included in the final account.</li>
            </ul>
            <p>
              <strong>Example 3 — Final Account Summary:</strong> Prepare a final account summary
              for an electrical installation contract.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Original contract sum: £1,250,000</li>
              <li>Variation instructions (16 no.) +£127,450</li>
              <li>Provisional sum expenditure (net of allowance) +£8,200</li>
              <li>Agreed loss and expense +£34,000</li>
              <li>Omitted works (VI-003, VI-008) -£18,750</li>
              <li>Liquidated damages (2 weeks) -£14,000</li>
              <li>
                <strong>Final contract sum: £1,386,900</strong>
              </li>
              <li>Previously certified: £1,315,555</li>
              <li>
                <strong>Balance due (including retention): £71,345</strong>
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Final account preparation checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Collate all variation instructions chronologically</li>
              <li>Prepare detailed measurement of each variation</li>
              <li>Assemble supporting records (daywork sheets, delivery notes)</li>
              <li>Calculate provisional sum expenditure against allowances</li>
              <li>Document any claims with evidence and calculations</li>
              <li>Cross-reference interim valuations for consistency</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Standard retention: <strong>5%</strong> (3% on some contracts)
              </li>
              <li>
                Defects liability period: <strong>12 months</strong> (typically)
              </li>
              <li>
                Final account submission: <strong>6 months from PC</strong> (JCT)
              </li>
              <li>
                Final Certificate becomes conclusive: <strong>28 days</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Poor records</strong> — Cannot substantiate claims without contemporaneous
                  evidence
                </li>
                <li>
                  <strong>Late submission</strong> — Missing contractual deadlines weakens position
                </li>
                <li>
                  <strong>Underclaiming</strong> — Failing to identify all entitled variations
                </li>
                <li>
                  <strong>Ignoring preliminaries</strong> — Prolongation affects time-related costs
                </li>
                <li>
                  <strong>Subcontractor oversights</strong> — Ensure sub-final accounts are captured
                </li>
              </ul>
            }
            doInstead="Maintain contemporaneous records throughout, submit the final account within the contractual window, audit every variation entitlement, value prolongation against time-related preliminaries, and close out subcontractor final accounts in parallel."
          />

          <SectionRule />

          <Scenario
            title="Final account drifts past 18 months — retention at risk"
            situation={
              <>
                Your project achieved PC 18 months ago. The end of DLP was six months ago. The final account remains unagreed: £140k of disputed variations, £50k retention outstanding. The client claims defects worth £80k against retention. Your QS resigned after PC; nobody picked up the closure.
              </>
            }
            whatToDo={
              <>
                Audit the open account immediately. Compile contemporaneous records for the £140k variations — adjudicate any that are well-supported, settle the rest at best commercial outcome. Inspect alleged defects with the client; rectify legitimate ones, dispute illegitimate ones with photographs and as-built records. Aim to close within three months. Lessons learned: appoint a final account QS at PC, track to closure as a project deliverable, never rely on individual continuity for commercial close.
              </>
            }
            whyItMatters={
              <>
                Final accounts left to drift become losses — retention is eroded by alleged defects, memories fade, records are misplaced, key people leave. The project margin you booked at PC is not real until the FA is settled and retention is paid. Treat closure as a programme deliverable, not an afterthought.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Final account = measured work + variations + L&E/CEs + retention release.",
              "Close within 3–6 months of PC — drift past 12 months means lost recovery.",
              "Compile FA file: contract sum, variations, L&E, day-works, retention, contra-charges.",
              "Half retention at PC, half at end of DLP — typically 12 months.",
              "DLP: rectify all notified defects; unresolved defects justify retention withholding.",
              "JCT Final Certificate is conclusive evidence — settle disputes before issue.",
              "Treat closure as a programme deliverable — appoint a closure QS, track to completion.",
              "Lessons learned and project closeout report inform future tenders and benchmarks.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Variations and claims
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Value engineering
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section3_5;
