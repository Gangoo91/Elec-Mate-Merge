/**
 * Module 6 · Section 1 · Subsection 6 — Documentation and Handover
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   EPCs, commissioning certificates, building log books, as-built documentation, Part L evidence, and handover procedures
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

const TITLE = 'Documentation and Handover - HNC Module 6 Section 1.6';
const DESCRIPTION =
  'Master documentation and handover requirements for building services projects: EPCs, commissioning certificates, building log books, as-built documentation, Part L evidence, and Building Control sign-off procedures.';

const quickCheckQuestions = [
  {
    id: 'epc-definition',
    question: 'What does an Energy Performance Certificate (EPC) demonstrate?',
    options: [
      "The building's structural integrity",
      "The building's energy efficiency rating from A to G",
      "The building's accessibility compliance",
      "The building's fire safety compliance",
    ],
    correctIndex: 1,
    explanation:
      "An EPC rates a building's energy efficiency on a scale from A (most efficient) to G (least efficient). It is a legal requirement when buildings are constructed, sold, or let, and provides recommendations for improving energy performance.",
  },
  {
    id: 'building-log-book',
    question: 'What is the primary purpose of a building log book?',
    options: [
      "To document the building's energy systems and provide operational guidance",
      "Operators become overwhelmed and may miss critical safety issues",
      "Dead testing is done with power off, live testing with power on",
      "Essential requirements of relevant EU/UK product supply legislation (e.g., UKCA/CE marking)",
    ],
    correctIndex: 0,
    explanation:
      'A building log book documents the energy-consuming systems, their design parameters, and operational guidance to enable efficient building operation. It is a requirement under Part L of the Building Regulations.',
  },
  {
    id: 'as-built-documentation',
    question: 'As-built drawings differ from construction drawings because they:',
    options: [
      'They can fall and strike people below, causing injury or death',
      'Lower than individual readings due to parallel paths',
      'It represents the conductor material and insulation type constant',
      'Show the installation as actually constructed, including all variations',
    ],
    correctIndex: 3,
    explanation:
      'As-built drawings record the installation as actually constructed, incorporating all variations, changes, and RFIs that occurred during construction. They are essential for future maintenance and modifications.',
  },
  {
    id: 'part-l-evidence',
    question: 'Part L evidence must demonstrate compliance with:',
    options: [
      'The rate of change of phase angle in radians per second',
      'Energy efficiency and carbon emission targets',
      'Prevent access to hazards while the machine is running',
      'Your name, date, and reason for isolation',
    ],
    correctIndex: 1,
    explanation:
      'Part L of the Building Regulations covers the conservation of fuel and power. Evidence must demonstrate that the building meets energy efficiency requirements and carbon emission targets through design calculations and as-built verification.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Who is legally responsible for commissioning a valid EPC for a new building?',
    options: [
      'To convert AC mains to DC for charging batteries and supplying inverter',
      'The person carrying out the building work (typically the developer)',
      'An appointed person and a suitably stocked first aid kit',
      'Only when dead working is unreasonable and suitable precautions are taken',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Building Regulations, the person carrying out the building work is responsible for ensuring a valid EPC is produced. For new builds, this is typically the developer or principal contractor.',
  },
  {
    id: 2,
    question: 'A commissioning certificate for an HVAC system should include:',
    options: [
      'Operating procedures, maintenance schedules, and equipment data',
      'There is no minimum; buildings must meet Part L requirements',
      'Test results demonstrating the system meets design intent',
      'Total useful floor area greater than 500m²',
    ],
    correctAnswer: 2,
    explanation:
      'Commissioning certificates must include test results and data demonstrating that installed systems meet their design intent, including flow rates, temperatures, pressures, and control responses as appropriate.',
  },
  {
    id: 3,
    question: 'The building log book requirement under Part L applies to buildings with:',
    options: [
      'Building work complies with the Building Regulations',
      'At practical completion, before final handover',
      'Notice of commissioning (Regulation 44)',
      'Total useful floor area greater than 500m²',
    ],
    correctAnswer: 3,
    explanation:
      "Part L requires a building log book for buildings with a total useful floor area greater than 500m². The log book provides information about the building's energy systems to enable efficient operation.",
  },
  {
    id: 4,
    question:
      'Which document provides evidence that fixed building services have been commissioned in accordance with approved procedures?',
    options: [
      'Notice of commissioning (Regulation 44)',
      'Total useful floor area greater than 500m²',
      'At practical completion, before final handover',
      'The BER does not exceed the TER',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 44 of the Building Regulations requires that a notice of commissioning be given to Building Control, confirming that fixed building services have been commissioned in accordance with an approved procedure.',
  },
  {
    id: 5,
    question: 'As-built documentation should be submitted:',
    options: [
      'Test results demonstrating the system meets design intent',
      'At practical completion, before final handover',
      'Building work complies with the Building Regulations',
      'Notice of commissioning (Regulation 44)',
    ],
    correctAnswer: 1,
    explanation:
      'As-built documentation should be completed and submitted at practical completion, before final handover. This enables the client to operate and maintain the building effectively from day one.',
  },
  {
    id: 6,
    question:
      'What is the minimum EPC rating required for new non-domestic buildings under current regulations?',
    options: [
      'Total useful floor area greater than 500m²',
      'Building work complies with the Building Regulations',
      'There is no minimum; buildings must meet Part L requirements',
      'Test results demonstrating the system meets design intent',
    ],
    correctAnswer: 2,
    explanation:
      'New buildings must demonstrate compliance with Part L through the SBEM or DSM methodology, which determines the calculated emission rate. The EPC rating follows from this compliance rather than being a standalone minimum requirement.',
  },
  {
    id: 7,
    question: 'O&M manuals for building services should include:',
    options: [
      'Ensure smooth transition from construction to operation',
      'At practical completion, before final handover',
      'Test results demonstrating the system meets design intent',
      'Operating procedures, maintenance schedules, and equipment data',
    ],
    correctAnswer: 3,
    explanation:
      'O&M manuals provide essential information for operating and maintaining building services, including operating procedures, maintenance schedules, equipment specifications, spare parts lists, and manufacturer documentation.',
  },
  {
    id: 8,
    question: 'Part L evidence for a new building must demonstrate that:',
    options: [
      'The BER does not exceed the TER',
      'All materials are locally sourced',
      'The building looks attractive',
      'The building can accommodate future expansion',
    ],
    correctAnswer: 0,
    explanation:
      'Part L evidence must demonstrate that the Building Emission Rate (BER) does not exceed the Target Emission Rate (TER). This is calculated using approved software (SBEM for non-domestic buildings) and verified through as-built assessments.',
  },
  {
    id: 9,
    question: 'Which of these is NOT typically included in handover documentation?',
    options: [
      'Test certificates and commissioning data',
      'Tender pricing breakdowns',
      'As-built drawings',
      'Warranty information',
    ],
    correctAnswer: 1,
    explanation:
      'Tender pricing breakdowns are commercial documents that remain confidential and are not part of handover documentation. Handover focuses on technical information needed to operate and maintain the building.',
  },
  {
    id: 10,
    question: 'A Building Control completion certificate confirms:',
    options: [
      'The building meets all planning conditions',
      'All contractor warranties are in place',
      'Building work complies with the Building Regulations',
      'The building is ready for occupation',
    ],
    correctAnswer: 2,
    explanation:
      'A completion certificate from Building Control confirms that the building work, as inspected, complies with the applicable Building Regulations. It is a legal requirement before occupation of new buildings.',
  },
  {
    id: 11,
    question: 'Soft landings procedures are designed to:',
    options: [
      'Total useful floor area greater than 500m²',
      'Test results demonstrating the system meets design intent',
      'Notice of commissioning (Regulation 44)',
      'Ensure smooth transition from construction to operation',
    ],
    correctAnswer: 3,
    explanation:
      'Soft landings is an approach that ensures smooth transition from construction to operation, with extended aftercare, user training, and post-occupancy evaluation to close the performance gap between design intent and actual operation.',
  },
  {
    id: 12,
    question: 'The defects liability period typically begins:',
    options: [
      'At practical completion',
      '12 months after occupation',
      'At contract award',
      'At final certificate',
    ],
    correctAnswer: 0,
    explanation:
      'The defects liability period (typically 12 months) begins at practical completion. During this period, the contractor must return to rectify any defects that emerge, at no additional cost to the client.',
  },
];

const faqs = [
  {
    question: 'What happens if Part L evidence is incomplete at handover?',
    answer:
      'Incomplete Part L evidence prevents Building Control from issuing a completion certificate, which can delay occupation and trigger contractual penalties. The contractor must provide all required calculations, commissioning data, and as-built verification before sign-off. In some cases, provisional certificates may be issued with conditions, but full compliance must be achieved within a specified timeframe.',
  },
  {
    question: 'How long must building documentation be retained?',
    answer:
      "Building documentation should be retained for the life of the building for maintenance and future works. EPCs are valid for 10 years. Under CDM Regulations, the Health and Safety File must be retained and updated throughout the building's life. For contractual purposes, documentation should be retained for at least 12 years (limitation period for contracts under deed) or 6 years for simple contracts.",
  },
  {
    question: 'Who produces the EPC for a new building?',
    answer:
      'An EPC for a new building must be produced by an accredited On Construction Domestic Energy Assessor (OCDEA) for dwellings, or a Non-Domestic Energy Assessor (NDEA) for other buildings. They use approved calculation methodologies (SAP for dwellings, SBEM for non-domestic) and must be registered with an approved accreditation scheme.',
  },
  {
    question: 'What is the difference between practical completion and final completion?',
    answer:
      'Practical completion occurs when the works are substantially complete and the building can be used for its intended purpose, even if minor defects remain. Final completion occurs after the defects liability period when all defects have been rectified and the final account agreed. Handover documentation is required at practical completion, with any outstanding items on a snagging list.',
  },
  {
    question: 'Can Building Control reject commissioning certificates?',
    answer:
      'Yes, Building Control can reject commissioning certificates if they are incomplete, lack sufficient detail, or do not demonstrate compliance with design intent. Certificates must include actual test results, comparison with design parameters, and confirmation that systems meet Building Regulations requirements. Generic or template certificates without project-specific data are likely to be rejected.',
  },
  {
    question: 'What training should be provided at handover?',
    answer:
      'Training should cover all building systems relevant to the user, including HVAC operation, lighting controls, BMS interfaces, fire alarm procedures, and emergency systems. Training should be documented with attendance records and provided at appropriate levels for different user groups (facilities managers, operators, general users). Video recordings and written guides enhance the training package.',
  },
];

const HNCModule6Section1_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1 · Subsection 6"
            title="Documentation and Handover"
            description="EPCs, commissioning certificates, building log books, as-built documentation, Part L evidence, and handover procedures"
            tone="purple"
          />

          <TLDR
            points={[
              "Part L compliance is judged on the as-built evidence pack, not the design intent — Building Control require the as-built SAP/SBEM, EPC, commissioning certificates, air permeability test result and (for non-dom) the building log book before completion.",
              "Soft Landings Framework (BSRIA BG 54) extends the handover into a 12-month aftercare period — monitoring actual performance against design and closing the performance gap.",
              "Building log book content for non-domestic buildings is mandated by Part L and must include design intent, control strategy, operating instructions, metering provisions and seasonal commissioning records.",
            ]}
          />

          <RegsCallout
            source="Approved Document L Volume 2 — Information for building owners"
            clause="On completion, the building owner should be provided with sufficient information about the building, the fixed building services, and their maintenance requirements to enable the building to be operated and maintained in such a manner as to use no more fuel and power than is reasonable in the circumstances. For non-dwellings, this information shall be provided in the form of a building log book in accordance with CIBSE TM31."
            meaning={
              <>
                Handover is a regulatory event, not just a project milestone. The building log book (CIBSE TM31 format) is mandatory for non-domestic buildings — without it, the building has not legally completed. The principal contractor and M&E designer share responsibility for assembling the evidence pack; the principal designer signs off the H&S file.
              </>
            }
            cite="Source: Approved Document L Volume 2: 2021 — gov.uk; CIBSE TM31 Building Log Book template"
          />

          <LearningOutcomes
            outcomes={[
              "Understand EPC requirements and energy rating methodology",
              "Prepare commissioning certificates meeting Building Regulations",
              "Develop building log books compliant with Part L requirements",
              "Compile as-built documentation packages for handover",
              "Assemble Part L evidence for Building Control approval",
              "Execute structured handover procedures including training",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Energy Performance Certificates (EPCs)">
            <p>Energy Performance Certificates are a legal requirement for buildings when constructed, sold, or let. They provide a standardised rating of energy efficiency and recommendations for improvement, enabling comparison between properties and informing decisions about energy use.</p>
            <p><strong>EPC Rating Scale</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Rating A (1-25):</strong> Most efficient - typical of new builds with excellent insulation and renewables</li>
              <li><strong>Rating B (26-50):</strong> Very efficient - well-designed new buildings with good controls</li>
              <li><strong>Rating C (51-75):</strong> Efficient - meets current Building Regulations minimum standards</li>
              <li><strong>Rating D (76-100):</strong> Average efficiency - typical of 1990s-2000s construction</li>
              <li><strong>Rating E-G (101+):</strong> Below average to poor - older buildings requiring improvement</li>
            </ul>
            <p><strong>EPC Requirements for New Buildings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>When required:</strong> Before occupation — Before occupation</li>
              <li><strong>Assessor type:</strong> OCDEA accredited — NDEA accredited</li>
              <li><strong>Calculation method:</strong> SAP 10.2 — SBEM/DSM</li>
              <li><strong>Validity period:</strong> 10 years — 10 years</li>
              <li><strong>Registration:</strong> EPC Register — Non-Domestic EPC Register</li>
            </ul>
            <p><strong>EPC Documentation Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design stage SAP/SBEM calculations (predicted rating)</li>
              <li>As-built calculations reflecting actual construction</li>
              <li>U-value calculations for building fabric elements</li>
              <li>Air permeability test results</li>
              <li>Heating/cooling system specifications</li>
              <li>Lighting specifications and controls</li>
              <li>Renewable energy system details (if applicable)</li>
              <li>Registered EPC certificate with unique reference number</li>
            </ul>
            <p><strong>Key point:</strong> Building services installations directly impact EPC ratings through heating/cooling efficiency, lighting efficacy, and controls effectiveness.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Commissioning Certificates and Part L Evidence">
            <p>Commissioning certificates provide documented evidence that building services systems have been installed correctly and operate as designed. Under Part L, commissioning is mandatory and must be notified to Building Control through Regulation 44.</p>
            <p><strong>Regulation 44 Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Notice that commissioning has been carried out</li>
              <li>Confirmation of approved procedures followed</li>
              <li>Results demonstrate design intent achieved</li>
              <li>Submit within 30 days of work completion</li>
            </ul>
            <p><strong>Systems Requiring Commissioning</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heating and hot water systems</li>
              <li>Cooling and air conditioning</li>
              <li>Mechanical ventilation</li>
              <li>Lighting systems and controls</li>
            </ul>
            <p><strong>Part L Evidence Package</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BRUKL/SBEM output:</strong> Demonstrates BER ≤ TER compliance — Design and as-built stages</li>
              <li><strong>U-value calculations:</strong> Confirms fabric performance — Design stage, verified as-built</li>
              <li><strong>Air test certificate:</strong> Confirms air permeability target met — As-built only</li>
              <li><strong>Commissioning certificates:</strong> Systems meet design intent — Completion stage</li>
              <li><strong>EPC certificate:</strong> Official energy rating — Before occupation</li>
            </ul>
            <p><strong>Commissioning Certificate Content</strong></p>
            <p><strong>Project details:</strong> Name, address, Building Control reference</p>
            <p><strong>System identification:</strong> Description, location, design parameters</p>
            <p><strong>Test results:</strong> Measured values vs design values</p>
            <p><strong>Compliance statement:</strong> Confirmation system meets design intent</p>
            <p><strong>Certification:</strong> Signed by competent commissioning engineer</p>
            <p><strong>Date and reference:</strong> Unique certificate number</p>
            <p><strong>Best practice:</strong> Use CIBSE Commissioning Code M templates to ensure certificates contain all required information and are accepted by Building Control.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Building Log Book and As-Built Documentation">
            <p>The building log book is a statutory requirement under Part L for buildings with a useful floor area exceeding 500m². It documents the energy-consuming systems and provides guidance for efficient operation. As-built documentation records the installation as actually constructed for future reference.</p>
            <p><strong>Building Log Book Contents (CIBSE TM31)</strong></p>
            <p><strong>Part A: General Information</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building description and use</li>
              <li>Contact details for services</li>
              <li>Design conditions and occupancy</li>
              <li>Floor areas and zones</li>
              <li>Energy targets and metering</li>
            </ul>
            <p><strong>Part B: System Information</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HVAC system descriptions</li>
              <li>Heating/cooling plant details</li>
              <li>Ventilation system data</li>
              <li>Lighting specifications</li>
              <li>Controls and BMS information</li>
            </ul>
            <p><strong>As-Built Documentation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>As-built drawings:</strong> Show installation as actually constructed — CAD/PDF, marked-up originals</li>
              <li><strong>Equipment schedules:</strong> Final specifications of installed equipment — Spreadsheet/PDF</li>
              <li><strong>Schematics:</strong> System flow diagrams as installed — CAD/PDF</li>
              <li><strong>Control diagrams:</strong> Wiring and control logic as installed — CAD/PDF</li>
              <li><strong>Test certificates:</strong> Electrical test, pressure test results — Standardised forms</li>
            </ul>
            <p><strong>As-Built Drawing Requirements Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All RFIs and variations incorporated</li>
              <li>Final equipment locations verified on site</li>
              <li>Cable/pipework routes as installed</li>
              <li>Final circuit/valve references matching labels</li>
              <li>Plant room layouts with clearances</li>
              <li>Access panel and isolation point locations</li>
              <li>Revision cloud removed, final issue status</li>
              <li>Approved for construction stamp removed</li>
            </ul>
            <p><strong>Quality standard:</strong> As-built drawings should enable someone unfamiliar with the project to locate, identify, and maintain any installed system or component.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Handover Procedures and Building Control Sign-Off">
            <p>Effective handover ensures the client receives a building that performs as designed, with all documentation needed for operation and maintenance. Building Control sign-off confirms regulatory compliance and enables lawful occupation.</p>
            <p><strong>Building Control Sign-Off Process</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Submit:</strong> All Part L evidence and commissioning notices</li>
              <li><strong>2. Inspect:</strong> Final inspection of completed works</li>
              <li><strong>3. Review:</strong> Documentation check against requirements</li>
              <li><strong>4. Issue:</strong> Completion certificate (Building Regulations compliance)</li>
              <li><strong>5. Register:</strong> EPC lodged on public register</li>
            </ul>
            <p><strong>Handover Documentation Package</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>O&M manuals:</strong> Operating procedures, maintenance schedules, equipment data</li>
              <li><strong>As-built drawings:</strong> Complete set showing final installation</li>
              <li><strong>Test certificates:</strong> Electrical, pressure, commissioning results</li>
              <li><strong>Warranties:</strong> Equipment and workmanship warranties</li>
              <li><strong>Spare parts:</strong> Recommended spares list and initial provision</li>
              <li><strong>Building log book:</strong> Energy systems documentation (if over 500m²)</li>
              <li><strong>Health & Safety File:</strong> CDM information for future works</li>
              <li><strong>EPC certificate:</strong> Registered energy performance certificate</li>
            </ul>
            <p><strong>Structured Handover Activities</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pre-handover:</strong> Snagging, documentation review, training planning — Contractor + Client</li>
              <li><strong>Handover meeting:</strong> Formal transfer, documentation acceptance — All parties</li>
              <li><strong>Training:</strong> System demonstrations, operating procedures — Contractor/specialists</li>
              <li><strong>Soft landings:</strong> Extended aftercare, fine-tuning, POE — Design team + Contractor</li>
              <li><strong>Defects period:</strong> Rectification of emerging defects — Contractor</li>
            </ul>
            <p><strong>Soft Landings Framework (GSL)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stage 1:</strong> Inception and briefing - embed soft landings from start</li>
              <li><strong>Stage 2:</strong> Design development - focus on usability and operability</li>
              <li><strong>Stage 3:</strong> Pre-handover - prepare client, training programmes</li>
              <li><strong>Stage 4:</strong> Initial aftercare - resident on site, reactive support</li>
              <li><strong>Stage 5:</strong> Extended aftercare - fine-tuning, seasonal commissioning</li>
              <li><strong>Stage 6:</strong> Post-occupancy evaluation - review actual vs predicted performance</li>
            </ul>
            <p><strong>Performance gap:</strong> Soft landings addresses the common gap between design predictions and actual building performance, which can be 2-5 times greater energy use than predicted.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Part L Compliance Package for Office Building</strong>
            </p>
            <p><strong>Scenario:</strong> Compile Part L evidence package for a 2,500m² office building.</p>
            <p>Part L Evidence Checklist:</p>
            <p>Design Stage Documents:</p>
            <p>BRUKL output showing TER = 28.5 kgCO₂/m²</p>
            <p>Design BER = 25.2 kgCO₂/m² (meets target)</p>
            <p>U-value calculations for all elements</p>
            <p>Design air permeability: 5.0 m³/hr/m²</p>
            <p>As-Built Documents:</p>
            <p>Updated BRUKL with as-built specifications</p>
            <p>Air test certificate: 4.8 m³/hr/m² achieved</p>
            <p>Commissioning certificates: HVAC, lighting</p>
            <p>EPC rating: B (42)</p>
            <p>Regulation 44 Notice submitted to BCO</p>
            <p>
              <strong>Example 2: HVAC Commissioning Certificate</strong>
            </p>
            <p><strong>Scenario:</strong> Complete commissioning certificate for AHU serving office floors.</p>
            <p>AHU-01 Commissioning Certificate</p>
            <p>Project: City Centre Office Building</p>
            <p>System: AHU-01 serving Floors 1-3</p>
            <p>Parameter | Design | Measured | Status</p>
            <p>------------------|---------|----------|-------</p>
            <p>Supply air flow | 5000l/s | 5050l/s | Pass</p>
            <p>Return air flow | 4500l/s | 4480l/s | Pass</p>
            <p>Fresh air % | 20% | 21% | Pass</p>
            <p>Supply temp (C) | 13°C | 13.2°C | Pass</p>
            <p>Heating coil ΔT | 15°C | 14.8°C | Pass</p>
            <p>Fan pressure (Pa) | 400Pa | 395Pa | Pass</p>
            <p>Certificate confirms system meets design intent</p>
            <p>Signed: J. Smith, Commissioning Manager</p>
            <p>
              <strong>Example 3: Handover Documentation Checklist</strong>
            </p>
            <p><strong>Scenario:</strong> Verify handover documentation completeness for building services.</p>
            <p>Handover Documentation Status:</p>
            <p>Document | Status | Notes</p>
            <p>----------------------------|-----------|----------------</p>
            <p>O&M Manuals (3 volumes) | Complete | Approved by FM</p>
            <p>As-built drawings (dwg/pdf) | Complete | Rev P01</p>
            <p>Electrical test certs | Complete | 15 schedules</p>
            <p>HVAC commissioning certs | Complete | 8 systems</p>
            <p>BMS graphics and points | Complete | USB provided</p>
            <p>Warranties register | Pending | Chase suppliers</p>
            <p>Building log book | Complete | CIBSE TM31</p>
            <p>EPC certificate | Complete | Rating B</p>
            <p>H&S File | Complete | 2 copies</p>
            <p>Action: Chase 3 outstanding warranties</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Complete Documentation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify all Part L calculations reflect as-built installation</li>
              <li>Ensure commissioning certificates include measured vs design values</li>
              <li>Confirm EPC is registered before applying for completion certificate</li>
              <li>Check building log book covers all energy-consuming systems</li>
              <li>Validate as-built drawings show actual installed routes and locations</li>
              <li>Obtain signed training attendance records from client staff</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building log book threshold: <strong>500m² useful floor area</strong></li>
              <li>EPC validity: <strong>10 years</strong></li>
              <li>Regulation 44 notice: <strong>within 30 days of completion</strong></li>
              <li>Documentation retention:  <strong>life of building (min 12 years contractual)</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Design vs as-built mismatch</strong> - Ensure calculations reflect actual installation</li>
                <li><strong>Generic certificates</strong> - Commissioning data must be project-specific</li>
                <li><strong>Missing air test</strong> - Required evidence, cannot be calculated</li>
                <li><strong>Late EPC registration</strong> - Must be registered before occupation</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Defects period reveals BMS schedules that never matched design"
            situation={
              <>
                A fully-let office building handed over six months ago. The Soft Landings aftercare team are monitoring half-hourly metering and discover the AHUs are running 0700–2000 seven days a week, not the 0700–1900 weekday schedule the SBEM model assumed. The actual energy use is 35% above design.
              </>
            }
            whatToDo={
              <>
                Convene a performance review with the BMS commissioning engineer, FM team and tenant. Verify: (1) what the BMS is actually doing vs. the commissioned strategy; (2) whether the tenant has overridden time schedules; (3) whether weekend usage is genuine occupancy. Re-commission to design intent or, if the tenant has legitimately extended occupancy, re-baseline the SBEM operational model. Use the defect liability period to fix this — performance gap interventions are far cheaper before the liability period ends.
              </>
            }
            whyItMatters={
              <>
                The performance gap (predicted vs actual energy use) is typically 30–80% in commercial buildings — and most of it is operational, not design. Soft Landings aftercare catches it; conventional handover walks away. CIBSE TM61–63 set out the seasonal commissioning and aftercare obligations that close the gap.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "As-built Part L evidence pack: SAP/SBEM, EPC, commissioning certs, air permeability test, log book.",
              "Building log book per CIBSE TM31 is mandatory for non-dom — no log book = no completion.",
              "Soft Landings (BSRIA BG 54) extends commissioning into a 12-month aftercare period.",
              "Seasonal commissioning per CIBSE Commissioning Codes (A–W) closes the performance gap.",
              "Performance gap typically 30–80% — most of it is operational schedule and controls drift.",
              "Defect liability period (typically 12 months under JCT) is your last cheap chance to close the gap.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Building services compliance
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-1")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Solar photovoltaic systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section1_6;
