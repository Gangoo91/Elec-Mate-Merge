/**
 * Module 5 · Section 6 · Subsection 5 — Environmental Management
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Waste management, noise, dust, permits and environmental compliance — the obligations that sit alongside CDM and BS 7671 on every site.
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

const TITLE = 'Environmental Management - HNC Module 5 Section 6.5';
const DESCRIPTION =
  'Master environmental management for building services sites: Site Waste Management Plans (SWMP), waste hierarchy, noise monitoring, dust control, environmental permits, pollution prevention, and ISO 14001 principles.';

const quickCheckQuestions = [
  {
    id: 'swmp-purpose',
    question: 'What is the primary purpose of a Site Waste Management Plan (SWMP)?',
    options: [
      'To record the noise levels measured at the site boundary',
      'To plan and monitor waste management throughout a project',
      'To list the environmental permits held by the principal contractor',
      'To set out the dust suppression methods for masonry cutting',
    ],
    correctIndex: 1,
    explanation:
      'A Site Waste Management Plan is a document that plans, records, and monitors how waste is managed on a construction site throughout the project lifecycle, promoting resource efficiency and legal compliance.',
  },
  {
    id: 'waste-hierarchy',
    question: 'What is the correct order of the waste hierarchy from most to least preferred?',
    options: [
      'Recycle, Reduce, Reuse, Dispose',
      'Dispose, Recover, Recycle, Reduce',
      'Recovery, Recycle, Prevention, Disposal',
      'Prevention, Reuse, Recycle, Recovery, Disposal',
    ],
    correctIndex: 3,
    explanation:
      'The waste hierarchy prioritises: Prevention (most preferred), then Reuse, Recycle, Recovery (energy), and finally Disposal (least preferred). This maximises resource efficiency and minimises environmental impact.',
  },
  {
    id: 'noise-limit',
    question:
      'Under the Control of Pollution Act 1974, local authorities can impose noise limits through which mechanism?',
    options: [
      'Environmental Permit',
      'RIDDOR notification',
      'Building Regulations Part E',
      'Section 61 consent',
    ],
    correctIndex: 3,
    explanation:
      'Section 61 of the Control of Pollution Act 1974 allows contractors to apply for prior consent for construction works. Local authorities can specify noise limits, permitted hours, and required control measures.',
  },
  {
    id: 'environmental-permit',
    question: 'When is an environmental permit typically required for building services work?',
    options: [
      'Whenever any electrical installation work is carried out',
      'When working near watercourses or installing certain equipment',
      'Only for projects lasting longer than 30 working days',
      'Whenever waste is removed from site by a licensed carrier',
    ],
    correctIndex: 1,
    explanation:
      'Environmental permits may be required when working near watercourses (discharge consents), installing standby generators (air quality), or for activities that could cause pollution. The Environment Agency regulates these permits.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which legislation introduced the duty of care for waste management in England?',
    options: [
      'Health and Safety at Work Act 1974',
      'Environmental Protection Act 1990',
      'Building Regulations 2010',
      'CDM Regulations 2015',
    ],
    correctAnswer: 1,
    explanation:
      'The Environmental Protection Act 1990 introduced the statutory duty of care for waste. Section 34 requires anyone who produces, imports, keeps, stores, transports, treats or disposes of waste to take all reasonable steps to prevent environmental harm.',
  },
  {
    id: 2,
    question: 'What documentation must accompany hazardous waste when removed from site?',
    options: [
      'Method statement',
      'Risk assessment only',
      'Consignment note',
      'Site diary entry',
    ],
    correctAnswer: 2,
    explanation:
      'Hazardous waste must be accompanied by a consignment note containing details of the waste type, quantity, carrier details, and destination. These records must be kept for a minimum of 3 years.',
  },
  {
    id: 3,
    question:
      'At what noise level (LAeq) should hearing protection zones be established on construction sites?',
    options: [
      '80 dB(A)',
      '70 dB(A)',
      '90 dB(A)',
      '85 dB(A)',
    ],
    correctAnswer: 3,
    explanation:
      'Under the Control of Noise at Work Regulations 2005, when daily exposure reaches 85 dB(A), hearing protection zones must be established, PPE is mandatory, and health surveillance is required.',
  },
  {
    id: 4,
    question: 'Which document forms the basis of ISO 14001 environmental management?',
    options: [
      'Environmental Policy',
      'Site induction form',
      'Health and Safety Plan',
      'Quality Control Plan',
    ],
    correctAnswer: 0,
    explanation:
      'ISO 14001 requires a documented Environmental Policy as the foundation of the Environmental Management System (EMS). This policy commits the organisation to compliance, pollution prevention, and continual improvement.',
  },
  {
    id: 5,
    question:
      'What is the maximum permitted working time for noisy construction activities under typical Section 61 consent?',
    options: [
      '24 hours a day, seven days a week without restriction',
      '07:30-18:00 weekdays, 08:00-13:00 Saturdays',
      '09:00-17:00 every day including Sundays and Bank Holidays',
      '06:00-22:00 weekdays with no weekend working at all',
    ],
    correctAnswer: 1,
    explanation:
      'Typical Section 61 consents permit noisy works 07:30-18:00 Monday to Friday and 08:00-13:00 on Saturdays. No noisy works on Sundays or Bank Holidays. Times may vary by local authority.',
  },
  {
    id: 6,
    question:
      "Under the waste hierarchy, what does 'recovery' typically mean in building services?",
    options: [
      'Finding lost materials',
      'Returning materials to suppliers',
      'Using waste to generate energy',
      'Documenting waste quantities',
    ],
    correctAnswer: 2,
    explanation:
      'Recovery in the waste hierarchy refers to extracting value from waste, typically through energy recovery (incineration with energy capture). This is preferred over landfill disposal but is below recycling in the hierarchy.',
  },
  {
    id: 7,
    question:
      'What is the primary purpose of dust suppression using water misting on construction sites?',
    options: [
      'To cool cutting tools and extend the life of the blades',
      'To wash spilled fuel and oil away from drainage channels',
      'To soften masonry so it can be cut more quickly',
      'To capture airborne particles and prevent them spreading',
    ],
    correctAnswer: 3,
    explanation:
      'Water misting captures airborne dust particles, causing them to settle rather than spread across the site or beyond site boundaries. This protects workers, neighbours, and the environment from harmful particulates.',
  },
  {
    id: 8,
    question: 'Which waste streams require segregation on a building services site?',
    options: [
      'Metals, wood, plastics, hazardous, and general waste',
      'Only hazardous waste needs to be kept separate from the rest',
      'Only copper cable, because of its high scrap value',
      'No segregation is required if a licensed carrier is used',
    ],
    correctAnswer: 0,
    explanation:
      'Effective waste management requires segregating multiple streams: metals (copper, steel, aluminium), wood, plastics, hazardous waste (fluorescent tubes, batteries, oils), and general waste. This maximises recycling and reduces disposal costs.',
  },
  {
    id: 9,
    question: 'What does COSHH require regarding substances that could cause environmental harm?',
    options: [
      'That all substances are disposed of to landfill within 24 hours',
      'Assessment and appropriate storage, handling and disposal',
      'That a Section 61 consent is obtained before use on site',
      'That substances are only used outside permitted working hours',
    ],
    correctAnswer: 1,
    explanation:
      'COSHH requires assessment of all hazardous substances including their environmental impact. Substances must be stored to prevent environmental release, with appropriate containment (bunding) and disposal through licensed routes.',
  },
  {
    id: 10,
    question: 'What is the purpose of an Environmental Aspects Register in ISO 14001?',
    options: [
      'To record the noise complaints received from local residents',
      'To list every employee trained in environmental procedures',
      'To identify activities that interact with the environment and assess their significance',
      'To schedule the calibration of dust and noise monitoring equipment',
    ],
    correctAnswer: 2,
    explanation:
      'An Environmental Aspects Register identifies all activities, products and services that can interact with the environment (aspects), evaluates their potential impacts, and determines their significance. This drives the setting of objectives and targets.',
  },
  {
    id: 11,
    question: 'When must a waste transfer note be provided?',
    options: [
      'Only when hazardous waste leaves the site',
      'Only when waste is sent directly to landfill',
      'Only when the waste has a positive scrap value',
      'When waste is transferred from one party to another',
    ],
    correctAnswer: 3,
    explanation:
      'A waste transfer note must accompany all controlled waste when transferred between parties. It must describe the waste, state SIC codes, and be signed by both parties. Notes must be retained for 2 years (3 years for hazardous waste consignment notes).',
  },
  {
    id: 12,
    question: 'What action should be taken if a pollution incident occurs on site?',
    options: [
      'Stop the source, contain the spill, report to the Environment Agency',
      'Hose the spill into the nearest surface water drain to disperse it',
      'Wait until the end of the shift before reporting it to the supervisor',
      'Continue working and note the incident in the site diary only',
    ],
    correctAnswer: 0,
    explanation:
      'For pollution incidents: immediately stop the source, contain the spill using spill kits/absorbents, prevent entry to drains/watercourses, and report to the Environment Agency incident hotline (0800 807060). Document all actions taken.',
  },
];

const faqs = [
  {
    question: 'Do I still need a Site Waste Management Plan after the regulations were revoked?',
    answer:
      'While the Site Waste Management Plans Regulations 2008 were revoked in 2013, SWMPs remain best practice and are often required contractually. Many clients, particularly public sector, require SWMPs. They demonstrate duty of care compliance under the Environmental Protection Act 1990 and help achieve BREEAM/LEED credits. The principles remain essential for legal compliance and efficient project delivery.',
  },
  {
    question: 'What are the key noise control measures for building services installation?',
    answer:
      'Key measures include: selecting quieter equipment (silenced generators, low-noise tools), scheduling noisy works during permitted hours, using acoustic barriers/screens around noisy operations, maintaining equipment to prevent increased noise, briefing operatives on noise minimisation, monitoring noise levels at site boundaries, and communicating with neighbours about planned noisy activities.',
  },
  {
    question: 'How do I segregate electrical waste on site?',
    answer:
      'Segregate into: copper cable (high value, specialist recycler), ferrous metals (cable tray, trunking), non-ferrous metals (aluminium), WEEE (waste electrical equipment - luminaires, controls), hazardous waste (fluorescent tubes containing mercury, batteries, capacitors), packaging (cardboard, plastic), and general waste. Label all containers clearly and prevent contamination between streams.',
  },
  {
    question: 'What environmental permits might affect building services work?',
    answer:
      'Potentially required permits include: discharge consents (surface water drainage to watercourses), abstraction licences (using water for dust suppression), waste carrier licences (transporting waste), environmental permits for standby generators over certain thresholds, and permits for work affecting protected species or habitats. Always check with the Environment Agency early in the project.',
  },
  {
    question: 'What are the penalties for environmental non-compliance?',
    answer:
      "Penalties can be severe: unlimited fines for waste duty of care breaches, up to 5 years imprisonment for illegal waste disposal, fixed penalty notices up to 400 pounds for minor offences, remediation orders requiring cleanup at polluter's expense, prohibition notices stopping work, and director liability for corporate offences. Reputational damage and loss of contracts often exceed the direct penalties.",
  },
  {
    question: 'How does ISO 14001 certification benefit an electrical contractor?',
    answer:
      'Benefits include: competitive advantage in tender processes (many clients require certified contractors), framework for legal compliance reducing risk of prosecution, cost savings through improved resource efficiency, reduced waste disposal costs, improved reputation with clients and communities, staff engagement through environmental awareness, and alignment with sustainability requirements of major projects.',
  },
];

const HNCModule5Section6_5 = () => {
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
            eyebrow="Module 5 · Section 6 · Subsection 5"
            title="Environmental Management"
            description="Waste management, noise control, dust suppression, permit requirements and environmental compliance for building services sites."
            tone="purple"
          />

          <TLDR
            points={[
              "Environmental management = waste hierarchy, noise control, dust suppression, water/air quality, permits — regulated under EPA 1990 and supporting regulations.",
              "Waste hierarchy (Waste Regulations 2011): prevent → prepare for re-use → recycle → recover → dispose. Site Waste Management Plan recommended even where no longer mandatory.",
              "Hazardous waste (asbestos, fluorescent tubes, batteries, certain WEEE) requires consignment notes and licensed carriers.",
              "Noise: Control of Noise at Work Regulations 2005 (worker exposure) + s.61 Control of Pollution Act 1974 (community impact, often agreed with LA).",
              "Dust: RPE for workers (HASAWA + COSHH), suppression measures (water, screening, sequencing) for community.",
            ]}
          />

          <RegsCallout
            source="Environmental Protection Act 1990 — Section 34 (Duty of care as respects waste)"
            clause="It shall be the duty of any person who imports, produces, carries, keeps, treats or disposes of controlled waste or, as a broker, has control of such waste, to take all such measures applicable to him in that capacity as are reasonable in the circumstances — to prevent any contravention by any other person of section 33 above, to prevent the escape of the waste from his control or that of any other person, and on the transfer of the waste, to secure that the transfer is only to an authorised person."
            meaning={
              <>
                The duty of care under EPA s.34 makes every party in the waste chain responsible. Producer (you), carrier (skip company), receiver (waste site) — all accountable. Waste transfer notes (WTN) and consignment notes (hazardous) are the audit trail. Penalties for breach include unlimited fines and corporate prosecution. The PM's environmental discipline starts at skip-hire.
              </>
            }
            cite="Source: Environmental Protection Act 1990 — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Develop and implement Site Waste Management Plans',
              'Apply the waste hierarchy to minimise environmental impact',
              'Implement noise monitoring and control measures',
              'Apply dust suppression techniques for worker and environmental protection',
              'Understand environmental permit requirements',
              'Implement pollution prevention measures aligned with ISO 14001',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Site Waste Management Plans and Waste Hierarchy">
            <p>
              Effective waste management is both a legal duty and a commercial necessity in building
              services. The Environmental Protection Act 1990 imposes a duty of care on all those
              who handle waste, from production through to final disposal.
            </p>
            <p>
              <strong>The waste hierarchy (most to least preferred):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prevention:</strong> Avoid generating waste through better design and
                ordering
              </li>
              <li>
                <strong>Reuse:</strong> Use materials again for same or different purpose
              </li>
              <li>
                <strong>Recycle:</strong> Process waste into new materials or products
              </li>
              <li>
                <strong>Recovery:</strong> Extract value through energy recovery
              </li>
              <li>
                <strong>Disposal:</strong> Landfill or incineration without energy recovery
              </li>
            </ul>
            <p>
              <strong>Site Waste Management Plan contents:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Project details:</strong> Client, location, value, description — Start of
                project
              </li>
              <li>
                <strong>Waste forecast:</strong> Expected types, quantities, disposal routes —
                Pre-construction
              </li>
              <li>
                <strong>Waste carriers:</strong> Licensed carriers, registration numbers — As
                appointed
              </li>
              <li>
                <strong>Destination sites:</strong> Licensed facilities, permit numbers — As
                identified
              </li>
              <li>
                <strong>Actual waste data:</strong> Quantities removed, transfer notes — Ongoing
              </li>
              <li>
                <strong>Final reconciliation:</strong> Comparison of forecast vs actual — Project
                completion
              </li>
            </ul>
            <p>
              <strong>Recyclable materials (building services):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Copper cable offcuts (high value)</li>
              <li>Steel cable tray and trunking</li>
              <li>Aluminium conduit and fittings</li>
              <li>Cardboard packaging</li>
              <li>Plastic drum packaging</li>
              <li>Clean wood from cable drums</li>
            </ul>
            <p>
              <strong>Hazardous waste:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fluorescent tubes (mercury)</li>
              <li>Batteries (various chemistries)</li>
              <li>Capacitors (may contain PCBs)</li>
              <li>Oils and lubricants</li>
              <li>Solvents and cleaning agents</li>
              <li>Asbestos (legacy installations)</li>
            </ul>
            <p>
              <strong>Legal requirement:</strong> Waste transfer notes must be retained for 2 years;
              hazardous waste consignment notes for 3 years.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Noise Monitoring and Control">
            <p>
              Construction noise is regulated under multiple legislative frameworks including the
              Control of Pollution Act 1974, the Environmental Protection Act 1990 (statutory
              nuisance), and the Control of Noise at Work Regulations 2005 (worker protection).
            </p>
            <p>
              <strong>Control of Noise at Work Regulations 2005:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lower action level (80 dB):</strong> Information, training, hearing
                protection available
              </li>
              <li>
                <strong>Upper action level (85 dB):</strong> Hearing protection mandatory, zones
                marked
              </li>
              <li>
                <strong>Exposure limit (87 dB):</strong> Must not be exceeded (with PPE)
              </li>
              <li>Health surveillance required above 85 dB daily exposure</li>
            </ul>
            <p>
              <strong>Section 61 prior consent:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Apply before starting noisy works</li>
              <li>Specify methods and equipment</li>
              <li>Propose noise limits and hours</li>
              <li>Provides defence against prosecution</li>
              <li>28 days for LA to respond</li>
            </ul>
            <p>
              <strong>Section 60 notice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Issued by local authority</li>
              <li>Specifies permitted hours</li>
              <li>May limit equipment types</li>
              <li>Requires specific methods</li>
              <li>Breach is criminal offence</li>
            </ul>
            <p>
              <strong>Typical noise levels — building services activities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chasing walls:</strong> 95-105 dB(A) — Hearing protection, dust suppression
              </li>
              <li>
                <strong>Core drilling:</strong> 85-95 dB(A) — Water suppression, hearing protection
              </li>
              <li>
                <strong>Angle grinder:</strong> 90-100 dB(A) — Hearing protection, local screens
              </li>
              <li>
                <strong>Mobile generator:</strong> 75-85 dB(A) — Silenced unit, acoustic enclosure
              </li>
              <li>
                <strong>Hand tools (general):</strong> 70-80 dB(A) — Low-noise alternatives where
                available
              </li>
            </ul>
            <p>
              <strong>Noise control hierarchy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Elimination:</strong> Prefabricate off-site, use quieter methods
              </li>
              <li>
                <strong>Substitution:</strong> Select quieter equipment (e.g., hydraulic vs
                pneumatic)
              </li>
              <li>
                <strong>Engineering controls:</strong> Acoustic barriers, enclosures, silencers
              </li>
              <li>
                <strong>Administrative controls:</strong> Restrict hours, rotate workers, limit
                duration
              </li>
              <li>
                <strong>PPE:</strong> Hearing protection (last resort)
              </li>
            </ul>
            <p>
              <strong>Good neighbour practice:</strong> Notify affected parties before noisy works,
              provide contact details for complaints, monitor and respond promptly to concerns.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Dust Control and Suppression">
            <p>
              Dust from construction activities poses both occupational health risks (particularly
              respirable crystalline silica from concrete and masonry) and environmental nuisance
              issues. Effective control protects workers, neighbours, and the wider environment.
            </p>
            <p>
              <strong>Silica dust hazard — building services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chasing into concrete, brick, and block releases silica dust</li>
              <li>Respirable crystalline silica (RCS) causes silicosis and lung cancer</li>
              <li>Workplace Exposure Limit: 0.1 mg/m3 (8-hour TWA)</li>
              <li>Water suppression or extraction required for all masonry work</li>
            </ul>
            <p>
              <strong>Water suppression methods:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>On-tool water feed systems</li>
              <li>Misting sprays at point of work</li>
              <li>Damping down access routes</li>
              <li>Boundary misting systems</li>
              <li>Wet cutting methods</li>
            </ul>
            <p>
              <strong>Extraction and capture:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>On-tool extraction (M/H class vacuum)</li>
              <li>Local exhaust ventilation (LEV)</li>
              <li>Enclosed cutting stations</li>
              <li>Dust screens and barriers</li>
              <li>Covered skips and containers</li>
            </ul>
            <p>
              <strong>Dust control by activity:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chasing masonry:</strong> On-tool extraction + water — RPE: FFP3 minimum
              </li>
              <li>
                <strong>Core drilling:</strong> Water feed to core bit — RPE: FFP3 if water fails
              </li>
              <li>
                <strong>Cutting cable tray:</strong> Cold cut where possible — RPE: P2 for metal
                fume
              </li>
              <li>
                <strong>Sweeping/cleaning:</strong> Vacuum, damp methods — RPE: FFP2/P2
              </li>
              <li>
                <strong>Demolition work:</strong> Enclosure, misting — RPE: FFP3 + face fit test
              </li>
            </ul>
            <p>
              <strong>Environmental dust nuisance prevention:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cover stockpiles of dusty materials</li>
              <li>Sheet vehicles carrying dusty loads</li>
              <li>Install wheel wash for site exits</li>
              <li>Damp down haul routes in dry weather</li>
              <li>Position dust-generating activities away from boundaries</li>
              <li>Monitor dust levels at sensitive receptors</li>
            </ul>
            <p>
              <strong>HSE enforcement:</strong> Silica dust exposure is a priority area for HSE
              inspectors. Expect scrutiny of control measures during site inspections.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Environmental Permits and ISO 14001 Principles">
            <p>
              Building services work may require various environmental permits depending on the
              activities undertaken and site location. ISO 14001 provides a framework for systematic
              environmental management that helps ensure compliance and drive continuous
              improvement.
            </p>
            <p>
              <strong>Environmental permits that may apply:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Discharge consent:</strong> Surface water discharge to watercourse —
                Environment Agency
              </li>
              <li>
                <strong>Abstraction licence:</strong> Taking water from surface/ground (&gt;20m³/day)
                — Environment Agency
              </li>
              <li>
                <strong>Waste carrier registration:</strong> Transporting controlled waste —
                Environment Agency
              </li>
              <li>
                <strong>Part B permit:</strong> Standby generators &gt;1MW (air quality) — Local
                Authority
              </li>
              <li>
                <strong>Protected species licence:</strong> Work affecting bats, newts, etc. —
                Natural England
              </li>
            </ul>
            <p>
              <strong>ISO 14001 environmental management system structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Context:</strong> Understand organisation and stakeholder needs
              </li>
              <li>
                <strong>Leadership:</strong> Environmental policy and top management commitment
              </li>
              <li>
                <strong>Planning:</strong> Aspects/impacts register, objectives and targets
              </li>
              <li>
                <strong>Support:</strong> Resources, competence, awareness, communication
              </li>
              <li>
                <strong>Operation:</strong> Operational controls, emergency preparedness
              </li>
              <li>
                <strong>Performance evaluation:</strong> Monitoring, audit, management review
              </li>
              <li>
                <strong>Improvement:</strong> Nonconformity, corrective action, continual
                improvement
              </li>
            </ul>
            <p>
              <strong>Pollution prevention measures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Bunded storage for oils and chemicals</li>
              <li>Spill kits at high-risk locations</li>
              <li>Drip trays under plant and equipment</li>
              <li>Drain covers and interceptors</li>
              <li>Designated refuelling areas</li>
            </ul>
            <p>
              <strong>Emergency response:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Environmental emergency plan</li>
              <li>Spill response procedures</li>
              <li>EA incident hotline: 0800 807060</li>
              <li>Incident investigation and reporting</li>
              <li>Corrective action to prevent recurrence</li>
            </ul>
            <p>
              <strong>Environmental aspects for building services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Energy consumption:</strong> Site power, vehicles, equipment
              </li>
              <li>
                <strong>Waste generation:</strong> Cable offcuts, packaging, hazardous waste
              </li>
              <li>
                <strong>Emissions to air:</strong> Vehicle exhaust, generator fumes, dust
              </li>
              <li>
                <strong>Emissions to water:</strong> Washdown, spills, contaminated drainage
              </li>
              <li>
                <strong>Noise:</strong> Power tools, plant, generators
              </li>
              <li>
                <strong>Resource use:</strong> Water, materials, consumables
              </li>
            </ul>
            <p>
              <strong>Compliance obligation:</strong> Environmental permits are legal requirements.
              Operating without necessary permits is a criminal offence with potentially unlimited
              fines.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Real-World Examples">
            <p>
              <strong>Example 1 — Hospital electrical upgrade:</strong> Installing new distribution
              boards in an occupied hospital wing. Works include chasing, core drilling, and
              temporary generator use.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Noise: Section 61 consent for restricted hours</li>
              <li>2. Dust: Full extraction with HEPA filtration (infection control)</li>
              <li>3. Waste: Segregate fluorescent tubes as hazardous waste</li>
              <li>4. Generator: Acoustic enclosure, position away from air intakes</li>
              <li>Result: Works completed without complaints or regulatory action</li>
            </ul>
            <p>
              <strong>Example 2 — Commercial development near river:</strong> New build commercial
              premises adjacent to a watercourse. Electrical installation includes external lighting
              and buried cables.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Discharge consent for surface water drainage</li>
              <li>2. Pollution prevention plan for construction phase</li>
              <li>3. Silt fencing to protect watercourse</li>
              <li>4. Emergency spill response procedures</li>
              <li>Key: Early engagement with Environment Agency avoided delays</li>
            </ul>
            <p>
              <strong>Example 3 — Waste segregation success:</strong> Major refit project generating
              significant cable waste and packaging materials.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Copper cable recovered: 2.3 tonnes @ 5,200/tonne = 11,960</li>
              <li>Steel tray recycled: 4.1 tonnes (free collection)</li>
              <li>Cardboard recycled: 1.8 tonnes (rebate 45/tonne = 81)</li>
              <li>General waste: 0.9 tonnes @ 180/tonne = 162</li>
              <li>Net position: 11,879 recovered vs 1,638 disposal if mixed</li>
              <li>Diversion rate: 91% from landfill</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Environmental compliance checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Prepare Site Waste Management Plan before works commence</li>
              <li>Check if Section 61 consent required for noisy works</li>
              <li>Verify waste carrier registration of all contractors</li>
              <li>Confirm destination sites are appropriately licensed</li>
              <li>Identify any environmental permits required</li>
              <li>Brief all operatives on environmental responsibilities</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Noise upper action level: <strong>85 dB(A)</strong>
              </li>
              <li>
                Silica WEL: <strong>0.1 mg/m3</strong>
              </li>
              <li>
                Waste transfer note retention: <strong>2 years</strong>
              </li>
              <li>
                Hazardous waste consignment note retention: <strong>3 years</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Mixing hazardous with general waste</strong> - Contaminates entire load
                </li>
                <li>
                  <strong>No Section 61 consent</strong> - Vulnerable to Section 60 restrictions
                </li>
                <li>
                  <strong>Dry sweeping</strong> - Spreads silica dust rather than controlling it
                </li>
                <li>
                  <strong>Unlicensed waste carriers</strong> - Duty of care breach
                </li>
              </ul>
            }
            doInstead="Segregate every hazardous stream from general waste, secure Section 61 consent before noisy works, use water suppression or extraction for all masonry cutting, and verify waste carrier licences before any collection."
          />

          <SectionRule />

          <Scenario
            title="Fly-tipped waste traced back to project"
            situation={
              <>
                Construction waste from your project is fly-tipped on a country road 15 miles from site. The Environment Agency tracks the waste back via paperwork found in the load. You as principal contractor used an uninsured "man-with-van" skip operator at £80/load instead of the licensed contractor at £180/load. Investigation reveals the operator dumps loads to save tipping fees.
              </>
            }
            whatToDo={
              <>
                Cooperate fully with the EA investigation. Engage waste lawyers. Audit every load taken from site for the past 6 months. Switch immediately to a licensed waste carrier with verifiable WTNs and weighbridge tickets. The EPA s.34 duty of care means you can be prosecuted even though you did not personally fly-tip — failing to verify the carrier's licence is the breach. Update procurement procedure: licensed carriers only, WTN check at every collection.
              </>
            }
            whyItMatters={
              <>
                Waste duty of care is one of the highest-risk environmental obligations on construction. Cheap skip operators are cheap because they cut corners on disposal — the cost saving becomes prosecution and reputational damage. Discipline at procurement protects the company.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Environmental: waste, noise, dust, water/air, permits — under EPA 1990 and supporting regs.",
              "Waste hierarchy: prevent → re-use → recycle → recover → dispose.",
              "Hazardous waste: consignment notes, licensed carriers — penalties severe.",
              "Noise: Control of Noise at Work 2005 (workers) + Control of Pollution Act 1974 s.61 (community).",
              "Dust: RPE + suppression — HASAWA, COSHH for workers; community impact for neighbours.",
              "EPA s.34 duty of care: producer, carrier, receiver — all accountable.",
              "WTN audit trail at every collection — never use uninsured operators.",
              "Site Waste Management Plan recommended even where no longer mandatory.",
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
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Practical completion
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section6_5;
