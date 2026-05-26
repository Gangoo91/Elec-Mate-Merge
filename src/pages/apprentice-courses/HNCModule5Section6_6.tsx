/**
 * Module 5 · Section 6 · Subsection 6 — Practical Completion
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Achieving Practical Completion — the contractual gateway that triggers DLP, half retention release, end of LADs and start of the operational phase.
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

const TITLE = 'Practical Completion - HNC Module 5 Section 6.6';
const DESCRIPTION =
  'Master practical completion requirements for building services: pre-completion inspections, sectional completion, partial possession, defects liability period, making good defects, and final handover procedures.';

const quickCheckQuestions = [
  {
    id: 'practical-completion-def',
    question: 'What does practical completion mean in building contracts?',
    options: [
      'Ballast bypass - direct mains connection to lamp holders',
      'Showing electrical connections and circuit operation',
      'Ensuring all team members lift and lower on a coordinated signal',
      'Works substantially complete and fit for occupation',
    ],
    correctIndex: 3,
    explanation:
      'Practical completion means works are substantially complete and the building is fit for occupation/use, even if minor defects remain. It triggers key contractual events including the start of the defects liability period.',
  },
  {
    id: 'defects-liability-typical',
    question: 'What is the typical defects liability period for building services installations?',
    options: [
      '36 months',
      '6 months',
      '12 months',
      '24 months',
    ],
    correctIndex: 2,
    explanation:
      'The defects liability period (also called rectification period) is typically 12 months for building services, allowing one full seasonal cycle to identify any operational defects.',
  },
  {
    id: 'sectional-completion',
    question: 'Sectional completion provisions allow:',
    options: [
      'To provide legal proof of compliance and protect professional reputation',
      'Using batteries to reduce maximum demand by discharging during peak consumption periods',
      'Client to take possession of defined sections before overall completion',
      'Switching transients and earth leakage during starting',
    ],
    correctIndex: 2,
    explanation:
      'Sectional completion allows the client to take possession of defined sections of the works before overall completion, each section having its own completion date and defects liability period.',
  },
  {
    id: 'o-and-m-manuals',
    question: 'Operation and maintenance manuals should be provided:',
    options: [
      'After the defects liability period',
      'Only if requested by the client',
      'At or before practical completion',
      'Within 6 months of completion',
    ],
    correctIndex: 2,
    explanation:
      'O&M manuals must be provided at or before practical completion to enable the client/end user to operate and maintain the building services systems safely and effectively.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which document formally certifies that practical completion has been achieved?',
    options: [
      'Rate of heat transfer through a building element (thermal transmittance)',
      'Practical completion certificate issued by contract administrator',
      'To ensure all team members understand hazards and safety procedures',
      'To normalise energy consumption for weather variations',
    ],
    correctAnswer: 1,
    explanation:
      'The contract administrator (architect or project manager) issues the practical completion certificate, which triggers contractual consequences including release of retention and start of the defects liability period.',
  },
  {
    id: 2,
    question: 'What percentage of retention is typically released at practical completion?',
    options: [
      '75%',
      '25%',
      '50%',
      '100%',
    ],
    correctAnswer: 2,
    explanation:
      "Half (50%) of the retention is typically released at practical completion, with the remaining 50% held until the end of the defects liability period (often called 'making good defects' certificate).",
  },
  {
    id: 3,
    question:
      'Which of the following is NOT typically required for practical completion of building services?',
    options: [
      'O&M manuals',
      'Commissioning completion certificates',
      'As-built drawings',
      'Final account agreement',
    ],
    correctAnswer: 3,
    explanation:
      'Final account agreement is typically completed after practical completion. Commissioning certificates, O&M manuals, and as-built drawings are required before or at practical completion.',
  },
  {
    id: 4,
    question: 'Partial possession differs from sectional completion because:',
    options: [
      'Partial possession is not planned from contract start',
      'Investigate and rectify the cause before energising',
      'Either the Project Manager or Contractor',
      'Disconnected clamp or broken conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Sectional completion is planned from contract commencement with defined sections and dates. Partial possession occurs when the client takes early possession of part of the works not originally planned as a section.',
  },
  {
    id: 5,
    question: 'During the defects liability period, the contractor must:',
    options: [
      'Only repair defects if paid extra',
      'Make good all defects free of charge',
      'Replace any failed equipment with upgrades',
      'Provide 24/7 maintenance cover',
    ],
    correctAnswer: 1,
    explanation:
      'The contractor must make good any defects that appear during the defects liability period at their own cost, provided the defects arise from materials or workmanship not in accordance with the contract.',
  },
  {
    id: 6,
    question: "A 'snagging list' is prepared:",
    options: [
      'At contract commencement',
      'After practical completion is certified',
      'Before practical completion inspection',
      'Only if the client requests it',
    ],
    correctAnswer: 2,
    explanation:
      'The snagging list (schedule of defects) is prepared during the pre-completion inspection, listing minor defects that must be rectified but do not prevent practical completion being certified.',
  },
  {
    id: 7,
    question: 'Which building services documentation forms part of the health and safety file?',
    options: [
      'Comfort from radiant heating/cooling surfaces',
      'Insulation breakdown or poor earth connections',
      'Distributed throughout the day between scheduled blocks',
      'As-built drawings and maintenance requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Under CDM 2015, the health and safety file must contain as-built drawings, maintenance requirements, and information needed for future construction work - essential for building services.',
  },
  {
    id: 8,
    question: 'If defects are discovered after the defects liability period ends:',
    options: [
      'Contractor may still be liable under the Limitation Act',
      'The client must claim on their insurance only',
      'The contractor has no further liability',
      'Building control must be notified',
    ],
    correctAnswer: 0,
    explanation:
      'Contractors remain liable for latent defects under the Limitation Act (6 years for simple contracts, 12 years for deeds) even after the defects liability period ends.',
  },
  {
    id: 9,
    question: 'For building services, seasonal commissioning may require:',
    options: [
      'To confirm the supply has correct phase and neutral identification',
      'Return visits to commission heating in winter and cooling in summer',
      'Both emotional consequences (how you feel) and behavioural consequences (what you do)',
      'A competent person with appropriate knowledge and experience',
    ],
    correctAnswer: 1,
    explanation:
      'Building services systems may require seasonal commissioning - returning to commission heating systems in winter conditions and cooling systems in summer conditions - which may extend beyond practical completion.',
  },
  {
    id: 10,
    question: 'The certificate of making good defects:',
    options: [
      'Is issued at practical completion',
      'Is optional under JCT contracts',
      'Triggers release of remaining retention',
      'Can only be issued after 24 months',
    ],
    correctAnswer: 2,
    explanation:
      'The certificate of making good defects is issued at the end of the defects liability period when all defects have been rectified, triggering release of the remaining retention money.',
  },
];

const faqs = [
  {
    question:
      'What happens if the contractor disputes that practical completion should be certified?',
    answer:
      'If the contractor believes works are complete but the contract administrator refuses to certify, the contractor may request inspection or refer the dispute to adjudication. The contract administrator must act fairly and cannot unreasonably withhold the certificate - minor defects that can be included on a snagging list should not prevent certification.',
  },
  {
    question: 'Can the client use the building before practical completion?',
    answer:
      "Yes, through partial possession provisions. However, this triggers partial release of retention, starts a proportionate defects liability period for that part, and may complicate insurance arrangements. The contractor's site control is reduced, and the client takes responsibility for the occupied area.",
  },
  {
    question:
      'How should building services defects be recorded during the defects liability period?',
    answer:
      'Maintain a formal defects register with date reported, description, location, trade responsible, date notified to contractor, agreed rectification date, completion date, and sign-off. Notify defects promptly in writing to ensure they are addressed within the contractual period.',
  },
  {
    question: 'What if seasonal commissioning cannot be completed before practical completion?',
    answer:
      'The contract should allow for seasonal commissioning visits during the defects liability period. A provisional commissioning certificate is issued at practical completion with full commissioning completed when seasonal conditions allow. This is common for HVAC systems in the UK where heating cannot be fully commissioned in summer.',
  },
  {
    question:
      'Who is responsible for maintaining building services during the defects liability period?',
    answer:
      'Generally, the client takes responsibility for maintenance from practical completion (routine servicing, consumables, wear and tear). The contractor remains responsible for making good defects arising from poor workmanship or defective materials, not normal wear and tear or user damage.',
  },
  {
    question: 'What documentation should an electrical contractor provide at handover?',
    answer:
      'Electrical installation certificates (EIC), test results, BS 7671 periodic inspection schedules, as-built drawings, equipment data sheets, O&M manuals, warranty certificates, spare parts lists, emergency contact details, and training records for client staff. All should be compiled in the building manual and referenced in the health and safety file.',
  },
];

const HNCModule5Section6_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6 · Subsection 6"
            title="Practical Completion"
            description="Completion requirements, defects liability period, sectional completion and handover procedures."
            tone="purple"
          />

          <TLDR
            points={[
              "Practical Completion (PC) = the works are sufficiently complete that the client can take possession and use the building, with only minor defects to rectify.",
              "PC triggers: DLP starts, half retention released, LADs end, insurance transfers, occupancy can begin.",
              "Sectional completion: phased PC where parts of the building hand over at different times — each section follows full PC procedure.",
              "PC certificate issued by contract administrator (JCT) or stated in NEC by Project Manager — formal contractual milestone.",
              "Common PC pitfall: \"PC with snags\" — most contracts allow only minor outstanding items; substantial defects defer PC.",
            ]}
          />

          <RegsCallout
            source="JCT Standard Building Contract 2024 — Clause 2.30 (Practical Completion)"
            clause="When in the opinion of the Architect/Contract Administrator practical completion of the Works or a Section is achieved and, where applicable, the Contractor has complied sufficiently with clause 2.40 (information for the health and safety file) and clause 3.18.4 (as-built drawings), the Architect/Contract Administrator shall forthwith issue a certificate to that effect, and practical completion of the Works or Section shall be deemed to have taken place on the date stated in that certificate."
            meaning={
              <>
                JCT 2.30 makes PC a function of the CA's opinion AND compliance with information delivery (H&S file content, as-built drawings). Many contractors fail to deliver these in time, so even if the works are physically complete, the certificate is delayed. Treat the H&S file and as-builts as PC deliverables, not post-PC tidy-up.
              </>
            }
            cite="Source: JCT Standard Building Contract 2024 (refer to JCT published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Define practical completion and its contractual significance',
              'Understand defects liability period obligations',
              'Distinguish between sectional completion and partial possession',
              'Apply pre-completion inspection procedures',
              'Identify handover documentation requirements',
              'Manage the making good of defects process',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Practical Completion Fundamentals">
            <p>
              Practical completion is a pivotal milestone in construction contracts, marking when
              the works are substantially complete and the building is fit for occupation or use.
              For building services contractors, this moment triggers significant contractual and
              commercial consequences.
            </p>
            <p>
              <strong>Key characteristics of practical completion:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Substantial completion:</strong> Works complete except minor defects
              </li>
              <li>
                <strong>Fit for purpose:</strong> Building can be safely occupied and used
              </li>
              <li>
                <strong>Not perfection:</strong> Minor snagging items do not prevent certification
              </li>
              <li>
                <strong>Contractually defined:</strong> Certificate issued by contract administrator
              </li>
            </ul>
            <p>
              <strong>Contractual effects of practical completion:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Possession transfers:</strong> Client takes control of building — Access for
                defects only
              </li>
              <li>
                <strong>Half retention released:</strong> Typically 50% of retention fund — Improves
                cash flow
              </li>
              <li>
                <strong>DLP commences:</strong> Defects liability period starts — 12-month defects
                obligation
              </li>
              <li>
                <strong>LADs cease:</strong> Liquidated damages no longer apply — Financial risk
                reduces
              </li>
              <li>
                <strong>Insurance responsibility:</strong> Client insures the works — Contractor
                liability changes
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> Practical completion is a matter of fact, not opinion.
              The contract administrator must certify when works objectively meet the criteria, not
              when it is convenient.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Pre-Completion Inspections and Snagging">
            <p>
              Before practical completion can be certified, systematic inspections identify any
              outstanding defects or incomplete works. For building services, these inspections
              cover installation quality, commissioning status, and documentation completeness.
            </p>
            <p>
              <strong>Contractor self-inspection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Internal quality check before handover</li>
              <li>Verify all systems commissioned</li>
              <li>Confirm documentation complete</li>
              <li>Rectify defects before formal inspection</li>
            </ul>
            <p>
              <strong>Formal pre-completion inspection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contract administrator leads walkthrough</li>
              <li>Client representative attends</li>
              <li>Building services engineer inspects systems</li>
              <li>Snagging list produced</li>
            </ul>
            <p>
              <strong>Building services inspection checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical:</strong> Distribution boards, accessories, containment — EIC,
                test results, as-builts
              </li>
              <li>
                <strong>HVAC:</strong> Plant operation, controls, air balancing — Commissioning
                certs, BMS log
              </li>
              <li>
                <strong>Fire alarm:</strong> Detection coverage, sounders, cause and effect — BS
                5839 certificate, zone plan
              </li>
              <li>
                <strong>Emergency lighting:</strong> Luminaire positions, duration test — BS 5266
                certificate, test log
              </li>
              <li>
                <strong>Data/comms:</strong> Outlet installation, patch panels — Test results,
                schedule
              </li>
            </ul>
            <p>
              <strong>Snagging vs prevention of practical completion:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Snagging items:</strong> Minor defects that do not prevent occupation - can
                be listed for rectification
              </li>
              <li>
                <strong>Preventing items:</strong> Significant defects affecting safety, compliance,
                or usability - must be completed first
              </li>
              <li>
                <strong>Example:</strong> Missing socket outlet cover = snagging; non-functional
                fire alarm = preventing
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Conduct internal snagging 2-3 weeks before target
              completion to allow time for rectification before formal inspection.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Sectional Completion and Partial Possession">
            <p>
              Large building projects are often completed in phases, allowing clients to occupy and
              use parts of the building before overall completion. Understanding the distinction
              between sectional completion and partial possession is essential for managing
              contractual obligations.
            </p>
            <p>
              <strong>Sectional completion vs partial possession:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Planning — Sectional:</strong> Defined in contract from start. Partial:
                Arises during construction
              </li>
              <li>
                <strong>Completion dates — Sectional:</strong> Each section has defined date.
                Partial: No pre-defined dates
              </li>
              <li>
                <strong>LADs — Sectional:</strong> Apply to each section separately. Partial:
                Reduced proportionally
              </li>
              <li>
                <strong>DLP — Sectional:</strong> Starts for each section separately. Partial:
                Proportionate period for possessed part
              </li>
              <li>
                <strong>Consent — Sectional:</strong> Part of contract. Partial: Requires
                contractor consent
              </li>
            </ul>
            <p>
              <strong>Building services considerations for phased handover:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>System isolation:</strong> Sections must be independently operable -
                separate distribution boards, controls
              </li>
              <li>
                <strong>Commissioning:</strong> Each section requires full commissioning before
                handover
              </li>
              <li>
                <strong>Fire systems:</strong> Fire alarm zones may need temporary modifications for
                phased occupation
              </li>
              <li>
                <strong>Shared plant:</strong> Central plant serving multiple sections creates
                interface complexity
              </li>
            </ul>
            <p>
              <strong>Example — hospital wing sectional completion. A new hospital building with
              three wings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 1 (Outpatients):</strong> Completion 1st March - Must have
                independent power, lighting, fire alarm, HVAC
              </li>
              <li>
                <strong>Section 2 (Diagnostics):</strong> Completion 1st June - Medical gas,
                specialist ventilation, UPS systems
              </li>
              <li>
                <strong>Section 3 (Wards):</strong> Completion 1st September - Nurse call, bed-head
                services, final plantroom handover
              </li>
              <li>Each section has its own 12-month DLP running from its completion date.</li>
            </ul>
            <p>
              <strong>Planning tip:</strong> Sectional completion requires careful coordination of
              building services - ensure contract documents clearly define what systems and
              documentation are required for each section.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Defects Liability Period and Making Good">
            <p>
              The defects liability period (DLP), also called the rectification period, runs from
              practical completion and provides the client with protection against defects in
              materials or workmanship. For building services, this period is critical for
              identifying operational defects that only become apparent during normal use.
            </p>
            <p>
              <strong>Typical duration:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Building services: <strong>12 months</strong>
              </li>
              <li>General building: 12 months</li>
              <li>Infrastructure: Up to 24 months</li>
              <li>Some specialist: 6 months</li>
            </ul>
            <p>
              <strong>Contractor obligations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Make good notified defects</li>
              <li>At own cost</li>
              <li>Within reasonable time</li>
              <li>Defects from workmanship/materials</li>
            </ul>
            <p>
              <strong>Client responsibilities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Routine maintenance</li>
              <li>Prompt notification of defects</li>
              <li>Allow reasonable access</li>
              <li>Not cause damage</li>
            </ul>
            <p>
              <strong>Contractor liability — what constitutes a defect:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Poor workmanship (loose connections, incorrect installation)</li>
              <li>Defective materials (faulty component, sub-standard cable)</li>
              <li>Non-compliance with specification</li>
              <li>Incomplete commissioning</li>
            </ul>
            <p>
              <strong>Not contractor liability:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Normal wear and tear</li>
              <li>User damage or misuse</li>
              <li>Consumables (lamps, filters, fuses)</li>
              <li>Lack of routine maintenance</li>
            </ul>
            <p>
              <strong>Building services — common DLP defects:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical:</strong> Nuisance tripping, loose connections — Poor
                terminations, incorrect protection
              </li>
              <li>
                <strong>Lighting controls:</strong> Sensor failures, incorrect zoning —
                Commissioning issues, component quality
              </li>
              <li>
                <strong>HVAC:</strong> Temperature control problems, noise — Balancing, control
                strategy, vibration
              </li>
              <li>
                <strong>Fire alarm:</strong> False alarms, non-detection — Detector selection, cause
                and effect
              </li>
              <li>
                <strong>BMS:</strong> Control failures, communication errors — Programming,
                integration, sensors
              </li>
            </ul>
            <p>
              <strong>Certificate of making good defects:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Issued by contract administrator at end of DLP</li>
              <li>Confirms all notified defects have been rectified</li>
              <li>Triggers release of remaining retention (typically 50%)</li>
              <li>Does not end liability - Limitation Act still applies</li>
            </ul>
            <p>
              <strong>Commercial tip:</strong> Maintain detailed records of all defect
              notifications, responses, and rectification work. Disputes often arise about whether
              defects were notified within the DLP.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Practical completion documentation:</strong> Electrical
              subcontractor preparing for practical completion of a 10,000m² office building.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Electrical Installation Certificate (BS 7671)</li>
              <li>2. Schedule of test results - all circuits</li>
              <li>3. As-built drawings - distribution, small power, lighting</li>
              <li>4. O&M manuals - all equipment with data sheets</li>
              <li>5. Fire alarm BS 5839 certificate and zone plan</li>
              <li>6. Emergency lighting BS 5266 certificate</li>
              <li>7. Commissioning certificates - lighting controls, BMS points</li>
              <li>8. Warranty certificates and spare parts lists</li>
              <li>All documentation must be compiled and submitted before formal inspection.</li>
            </ul>
            <p>
              <strong>Example 2 — Defects liability calculation:</strong> Building with sectional
              completion - when does each section's DLP end?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Section A practical completion: 15th January 2024</li>
              <li>Section B practical completion: 1st April 2024</li>
              <li>Section C practical completion: 1st July 2024</li>
              <li>
                <strong>Section A DLP ends:</strong> 15th January 2025
              </li>
              <li>
                <strong>Section B DLP ends:</strong> 1st April 2025
              </li>
              <li>
                <strong>Section C DLP ends:</strong> 1st July 2025
              </li>
              <li>Each section has independent retention release dates.</li>
            </ul>
            <p>
              <strong>Example 3 — Partial possession effect:</strong> Client takes early possession
              of ground floor (25% of building value) 8 weeks before planned completion.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contract value: £4,000,000</li>
              <li>Retention: 3% = £120,000</li>
              <li>Liquidated damages: £10,000 per week</li>
              <li>1. Retention released proportionally: 25% × £120,000 = £30,000</li>
              <li>2. LADs reduced: 25% × £10,000 = £7,500 per week applies to remaining works</li>
              <li>3. Ground floor DLP starts from possession date</li>
              <li>4. Insurance responsibility transfers for ground floor</li>
              <li>Ground floor requires fully commissioned, independent building services.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Pre-completion checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete internal snagging 2-3 weeks before target date</li>
              <li>Compile all documentation in building manual format</li>
              <li>Verify all systems commissioned with certificates</li>
              <li>Arrange staff training sessions</li>
              <li>Prepare health and safety file contribution</li>
              <li>Confirm all statutory compliance certificates obtained</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Typical DLP: <strong>12 months</strong> for building services
              </li>
              <li>
                Retention at PC: <strong>50%</strong> released
              </li>
              <li>
                Limitation period: <strong>6 years</strong> (simple contract) /{' '}
                <strong>12 years</strong> (deed)
              </li>
              <li>
                Certificate issuer: <strong>Contract administrator</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Incomplete documentation</strong> - Delays certification and retention
                  release
                </li>
                <li>
                  <strong>Late snagging</strong> - Insufficient time to rectify before handover
                </li>
                <li>
                  <strong>Poor defects records</strong> - Disputes about liability and timing
                </li>
                <li>
                  <strong>Ignoring seasonal commissioning</strong> - Systems fail when conditions
                  change
                </li>
              </ul>
            }
            doInstead="Compile all certificates, O&M, as-builts and training records before the formal inspection, snag internally 2-3 weeks early, log every DLP defect with dates, and book seasonal commissioning visits into the DLP calendar."
          />

          <SectionRule />

          <Scenario
            title="PC declined for missing H&S file content"
            situation={
              <>
                The works are physically complete. You request PC. The CA inspects, finds 23 minor snags (acceptable), but declines PC on the basis that the H&S file lacks: as-built electrical drawings, commissioning records for the BMS, manufacturer's O&M for the AHUs, asbestos register update, residual risk register from the design team. PC slips by three weeks while the documentation is gathered. LADs accrue at £15k/week.
              </>
            }
            whatToDo={
              <>
                Treat PC as a deliverable with a checklist: physical completion, H&S file content, as-built drawings, commissioning records, training, O&Ms, certificates. Run the checklist 4 weeks before target PC; chase missing items aggressively. Engage the principal designer early on H&S file requirements — they often own deliverables you need to compile. PC is not when the work stops; it is when the deliverables stop.
              </>
            }
            whyItMatters={
              <>
                PC is the project's major commercial milestone. Late PC means continuing LADs, delayed retention release, extended preliminaries cost, and a soured client relationship. Disciplined PC preparation — including the documentation as a deliverable — protects the project's margin and reputation.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "PC = works sufficiently complete that client can take possession; minor defects only.",
              "PC triggers DLP start, half retention release, end of LADs, insurance transfer.",
              "Sectional completion: phased PC for parts of the building — full procedure for each section.",
              "PC certificate issued by CA (JCT) or stated by PM (NEC) — formal milestone.",
              "\"PC with snags\" only for minor items — substantial defects defer PC.",
              "JCT 2.30 makes PC contingent on H&S file content and as-built delivery.",
              "Documentation is a PC deliverable — start production at Stage 4, not after PC.",
              "Pre-PC checklist 4 weeks out; missing items become the critical path to handover.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Site management and CDM
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                HNC Module 6
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section6_6;
