/**
 * Module 8 · Section 6 · Subsection 5 — Documentation
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   O&amp;M manuals, as-built drawings, testing records and building log book requirements for successful project handover
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Documentation - HNC Module 8 Section 6.5';
const DESCRIPTION =
  'Comprehensive coverage of O&M manuals, as-built drawings, testing records, building log book requirements, health and safety files, BSRIA guidance and digital handover (COBie).';

const quickCheckQuestions = [
  {
    id: 'om-manual-purpose',
    question: 'What is the primary purpose of an O&M manual?',
    options: [
      'To record construction costs',
      'To provide information for safe operation, maintenance and future modification of building systems',
      'To satisfy planning requirements',
      'To document site safety incidents',
    ],
    correctIndex: 1,
    explanation:
      'O&M manuals provide comprehensive information enabling building operators to safely operate, maintain and modify building systems throughout their operational life. This includes equipment schedules, maintenance procedures, safety information and emergency protocols.',
  },
  {
    id: 'as-built-purpose',
    question: 'When should as-built drawings be prepared?',
    options: [
      'Before construction begins',
      'During the design development stage',
      'Progressively during construction, finalised at practical completion',
      'Only if requested by the client',
    ],
    correctIndex: 2,
    explanation:
      'As-built drawings should be prepared progressively during construction and finalised at practical completion. This ensures they accurately reflect the installed works, including any variations from the original design drawings.',
  },
  {
    id: 'building-log-book',
    question:
      'Under which regulation is a building log book required for new non-domestic buildings?',
    options: [
      'Part P of the Building Regulations',
      'Part L of the Building Regulations',
      'CDM Regulations 2015',
      'Health and Safety at Work Act',
    ],
    correctIndex: 1,
    explanation:
      'Part L (Conservation of Fuel and Power) of the Building Regulations requires a building log book for new non-domestic buildings. It must contain information about installed systems, their operation and maintenance to achieve energy efficiency.',
  },
  {
    id: 'cobie-definition',
    question: 'What does COBie stand for?',
    options: [
      'Construction Operations Building information exchange',
      'Certified Operations Building information exchange',
      'Construction Operational Building Interface Equipment',
      'Consolidated Operations Building Information Environment',
    ],
    correctIndex: 0,
    explanation:
      'COBie (Construction Operations Building information exchange) is a structured data format for exchanging building information from design through construction to operation. It enables digital handover of asset data without relying on proprietary software formats.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which BSRIA guide provides comprehensive guidance on O&M manuals?',
    options: [
      'BG 6 - The Design Framework',
      'BG 49 - Soft Landings',
      'BG 8 - Model O&M Manual',
      'BG 26 - Service Coordination',
    ],
    correctAnswer: 2,
    explanation:
      'BSRIA BG 8 provides model templates and comprehensive guidance for producing O&M manuals for building services installations.',
  },
  {
    id: 2,
    question: 'What information must be included in the Health and Safety File under CDM 2015?',
    options: [
      'Only electrical installation certificates',
      'Information about risks to health and safety during future construction, maintenance or demolition work',
      'Daily site inspection records',
      'Employee training records',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety File must contain information about risks to health and safety during any future construction, maintenance, repair, renovation or demolition work on the building.',
  },
  {
    id: 3,
    question: 'What is the minimum retention period for electrical test certificates?',
    options: ['5 years', '10 years', 'Life of the installation', 'Until next inspection'],
    correctAnswer: 2,
    explanation:
      'Electrical test certificates should be retained for the life of the installation. They form an essential part of the electrical installation records and are needed for comparison at subsequent periodic inspections.',
  },
  {
    id: 4,
    question: 'Which document provides the format specification for digital asset data handover?',
    options: ['BS 7671', 'BS 1192', 'BS 8536 (now incorporated into BS EN ISO 19650)', 'BS 5839'],
    correctAnswer: 2,
    explanation:
      'BS 8536 (now incorporated into BS EN ISO 19650) provides guidance on information management during the operational phase of assets, including requirements for digital handover using formats such as COBie.',
  },
  {
    id: 5,
    question: 'What must be recorded in the building log book regarding HVAC systems?',
    options: [
      "Only the manufacturer's contact details",
      'Design parameters, installed capacities, control strategies and target energy consumption',
      'Staff training attendance records',
      'Construction programme dates',
    ],
    correctAnswer: 1,
    explanation:
      'The building log book must include design parameters (temperatures, flow rates), installed capacities, control strategies, maintenance requirements and target energy consumption figures for HVAC systems.',
  },
  {
    id: 6,
    question: 'Who is responsible for preparing and maintaining the Health and Safety File?',
    options: [
      'The contractor',
      'The architect',
      'The Principal Designer during construction, then the client',
      'The building control officer',
    ],
    correctAnswer: 2,
    explanation:
      'Under CDM 2015, the Principal Designer is responsible for preparing the Health and Safety File during the construction phase. Upon handover, responsibility transfers to the client who must maintain it for future works.',
  },
  {
    id: 7,
    question:
      'What type of drawings should show cable routes, containment systems and equipment locations?',
    options: [
      'Schematic diagrams only',
      'Block diagrams',
      'Installation or layout drawings',
      'Single line diagrams',
    ],
    correctAnswer: 2,
    explanation:
      'Installation or layout drawings show physical cable routes, containment systems, equipment locations and spatial coordination. These are essential for maintenance access and future modifications.',
  },
  {
    id: 8,
    question: 'What is the purpose of commissioning records in handover documentation?',
    options: [
      'To demonstrate design intent only',
      'To evidence that systems have been tested and perform to specification',
      'To record construction costs',
      'To satisfy planning requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Commissioning records provide evidence that all systems have been installed, tested and adjusted to perform to their design specification. They form a baseline for future performance monitoring.',
  },
  {
    id: 9,
    question: 'According to BSRIA Soft Landings, when should O&M manual content be reviewed?',
    options: [
      'Only at practical completion',
      'Progressively throughout construction with staged reviews',
      'After 12 months occupation',
      'Only when requested by the client',
    ],
    correctAnswer: 1,
    explanation:
      'BSRIA Soft Landings advocates progressive review of O&M content throughout construction, with staged submissions and reviews to ensure quality and completeness before practical completion.',
  },
  {
    id: 10,
    question: 'What information should as-built drawings show that differs from design drawings?',
    options: [
      'Original design intent only',
      'Variations, actual cable routes, final equipment positions and any deviations from design',
      'Only the building outline',
      'Manufacturer catalogue information',
    ],
    correctAnswer: 1,
    explanation:
      'As-built drawings must show the actual installed works including all variations from design, actual cable routes, final equipment positions, revised containment layouts and any site-initiated changes.',
  },
  {
    id: 11,
    question: 'What does the building log book requirement under Part L help achieve?',
    options: [
      'Fire safety compliance',
      'Structural safety verification',
      "Energy efficient operation throughout the building's life",
      'Acoustic performance standards',
    ],
    correctAnswer: 2,
    explanation:
      'The building log book requirement under Part L aims to enable energy efficient operation by providing building managers with information about design assumptions, installed systems and their intended operation.',
  },
  {
    id: 12,
    question: 'Which testing records must be included for fire alarm systems?',
    options: [
      'Only the initial commissioning certificate',
      'Commissioning certificate, cause and effect matrix, zone plans and detector schedule',
      "Manufacturer's test data only",
      'Training attendance records',
    ],
    correctAnswer: 1,
    explanation:
      'Fire alarm testing records must include the commissioning certificate, cause and effect matrix showing all input/output relationships, zone plans, detector schedules and results of all function and integration tests.',
  },
];

const faqs = [
  {
    question: 'What is the difference between O&M manuals and the building log book?',
    answer:
      'O&M manuals provide comprehensive technical information for operating and maintaining all building systems - they include equipment specifications, maintenance procedures, spare parts lists and safety information. The building log book, required under Part L, focuses specifically on energy-related information including design assumptions, installed capacities, control strategies and target energy consumption. The log book is intended as a concise reference for building managers to achieve energy efficient operation, while O&M manuals are detailed technical documents for maintenance teams.',
  },
  {
    question: 'How should digital handover documentation be structured?',
    answer:
      "Digital handover should follow a structured approach using COBie (Construction Operations Building information exchange) or similar open formats. Documentation should be organised hierarchically: facility level (site information), floor level (spatial data), space level (room data), then component level (equipment and systems). Each asset should have linked documentation including specifications, test certificates, O&M instructions and warranties. The structure should align with the building owner's existing asset management systems where possible.",
  },
  {
    question: 'What happens if O&M documentation is incomplete at practical completion?',
    answer:
      'Incomplete O&M documentation typically prevents the issue of a practical completion certificate under most standard forms of contract. The employer may retain a portion of the contract sum (often 2-5%) until documentation is complete and accepted. Under BSRIA Soft Landings, documentation quality reviews should occur progressively to avoid last-minute problems. Where certificates are issued with documentation deficiencies, these should be clearly listed as snagging items with agreed completion dates.',
  },
  {
    question: 'How long should project documentation be retained?',
    answer:
      'Retention periods vary by document type: electrical certificates should be retained for the life of the installation; Health and Safety Files must be retained for the life of the building; test records typically 6-12 years for liability purposes; O&M manuals for the life of the systems they cover. Under limitation legislation, records relating to potential personal injury claims should be retained indefinitely. Digital storage with appropriate backup and version control is recommended for long-term retention.',
  },
  {
    question: 'What training documentation should be provided at handover?',
    answer:
      'Training documentation should include: training plans showing content and duration for each system; attendance registers signed by trainees; competency assessments where applicable; video recordings of training sessions (increasingly common); quick reference guides for day-to-day operation; emergency procedures and contact information. BSRIA Soft Landings recommends follow-up training sessions at 3 and 12 months post-handover to address issues arising during actual operation.',
  },
  {
    question: 'How does BIM affect handover documentation requirements?',
    answer:
      "BIM (Building Information Modelling) enables rich digital handover where the model becomes an asset information model containing or linking to all O&M documentation. The model should include accurate as-built geometry, equipment data (manufacturer, model, serial numbers), maintenance requirements and linked documents (certificates, manuals). BS EN ISO 19650 provides the framework for information management, with COBie or native model formats used for data exchange. The client's Employer's Information Requirements (EIR) should specify required level of detail and formats.",
  },
];

const HNCModule8Section6_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 6 · Subsection 5"
            title="Documentation"
            description="O&amp;M manuals, as-built drawings, testing records and building log book requirements for successful project handover"
            tone="purple"
          />

          <ConceptBlock title="Operation and Maintenance Manuals">
            <p>Operation and Maintenance (O&amp;M) manuals are comprehensive documents that provide building owners, managers and maintenance personnel with all information required to safely and efficiently operate, maintain and modify building systems throughout their operational life.</p>
            <p><strong>O&amp;M Manual Structure (BSRIA BG 8)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Volume 1:</strong> System descriptions, operating procedures, emergency procedures — Day-to-day operational reference</li>
              <li><strong>Volume 2:</strong> Equipment schedules, maintenance procedures, spare parts — Planned maintenance guidance</li>
              <li><strong>Volume 3:</strong> Manufacturer data, product literature, certificates — Technical reference information</li>
              <li><strong>Volume 4:</strong> Record drawings, schematics, as-built information — Spatial and schematic reference</li>
            </ul>
            <p><strong>Essential Content Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>System descriptions and design parameters</li>
              <li>Operating procedures for normal and emergency conditions</li>
              <li>Maintenance schedules with frequencies</li>
              <li>Equipment schedules with specifications</li>
              <li>Spare parts lists with supplier information</li>
              <li>Health and safety information</li>
            </ul>
            <p><strong>Quality Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Project-specific content (not generic)</li>
              <li>Clear, consistent formatting</li>
              <li>Indexed and cross-referenced</li>
              <li>Digital format with searchable text</li>
              <li>Regular review and updates</li>
              <li>Version control procedures</li>
            </ul>
            <p><strong>Electrical Installation O&amp;M Content</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Distribution systems:</strong> Schematic diagrams, distribution schedules, protective device settings</li>
              <li><strong>Lighting:</strong> Luminaire schedules, control system programming, lamp replacement procedures</li>
              <li><strong>Fire alarm:</strong> Cause and effect matrix, zone plans, test procedures</li>
              <li><strong>Emergency lighting:</strong> Luminaire locations, test log templates, battery replacement schedule</li>
              <li><strong>Access control:</strong> System architecture, user management procedures, credential protocols</li>
            </ul>
            <p><strong>Practical tip:</strong> Review O&amp;M manual submissions progressively during construction. BSRIA Soft Landings recommends staged reviews at 25%, 50%, 75% and 100% completion to ensure quality and avoid last-minute problems.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="As-Built Drawings">
            <p>As-built drawings (also called record drawings or as-installed drawings) provide an accurate graphical record of the installed works. They are essential for future maintenance, modifications, fault finding and compliance verification.</p>
            <p><strong>Types of As-Built Drawings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Layout drawings:</strong> Equipment positions, cable routes, containment — Locating equipment, planning modifications</li>
              <li><strong>Schematic diagrams:</strong> System topology, interconnections, control sequences — Understanding system operation, fault finding</li>
              <li><strong>Single line diagrams:</strong> Distribution hierarchy, protective devices, circuit references — Electrical distribution overview, isolation planning</li>
              <li><strong>Wiring diagrams:</strong> Terminal connections, cable cores, control circuits — Detailed fault finding, modifications</li>
              <li><strong>Coordination drawings:</strong> Combined services layouts, spatial coordination — Access planning, clash avoidance</li>
            </ul>
            <p><strong>As-Built Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Show actual installed positions and routes</li>
              <li>Record all variations from design drawings</li>
              <li>Include cable sizes and types</li>
              <li>Show protective device ratings and settings</li>
              <li>Include circuit references and labelling</li>
              <li>Record depths for buried services</li>
            </ul>
            <p><strong>Drawing Standards</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS EN ISO 7200 - Title blocks</li>
              <li>BS EN ISO 5457 - Drawing sheet sizes</li>
              <li>BS EN 61082 - Electrical documentation</li>
              <li>BS 1192 (now BS EN ISO 19650) - CAD management</li>
              <li>Project-specific CAD standards</li>
              <li>Consistent symbol libraries</li>
            </ul>
            <p><strong>Revision and Version Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Revision numbering:</strong> Clear, sequential revision system (P01, P02 for preliminary; C01, C02 for construction; A01, A02 for as-built)</li>
              <li><strong>Cloud markings:</strong> Identify areas of change on each revision</li>
              <li><strong>Revision history:</strong> Document all changes with dates and reasons</li>
              <li><strong>Superseded drawings:</strong> Clear marking and controlled disposal of superseded versions</li>
              <li><strong>Digital storage:</strong> Secure repository with backup and access control</li>
            </ul>
            <p><strong>BIM integration:</strong> Where BIM is used, as-built models should be updated to reflect installed conditions. The model becomes the primary record with 2D drawings extracted as required.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Testing and Commissioning Records">
            <p>Testing and commissioning records provide evidence that all systems have been installed correctly, tested to verify performance and adjusted to meet design specifications. They establish a baseline for future performance monitoring and maintenance.</p>
            <p><strong>Electrical Testing Records (BS 7671)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EIC:</strong> Electrical Installation Certificate for new installations — Mandatory for new work</li>
              <li><strong>MEIWC:</strong> Minor Electrical Installation Works Certificate — Additions to existing circuits</li>
              <li><strong>Schedule of Inspections:</strong> Visual inspection checklist results — Accompanies EIC</li>
              <li><strong>Schedule of Test Results:</strong> Measured test values for each circuit — Accompanies EIC</li>
            </ul>
            <p><strong>System-Specific Commissioning Records</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fire alarm:</strong> Commissioning certificate (BS 5839-1), zone test results, cause and effect verification, integration tests</li>
              <li><strong>Emergency lighting:</strong> Commissioning certificate (BS 5266-1), duration test results, luminaire schedule verification</li>
              <li><strong>BMS/controls:</strong> Point-to-point test sheets, control loop verification, trend logs, integration test results</li>
              <li><strong>HVAC electrical:</strong> Motor rotation checks, VSD parameter records, interlock verification, safety device tests</li>
              <li><strong>Lighting controls:</strong> DALI addressing records, scene programming verification, sensor commissioning</li>
            </ul>
            <p><strong>Witness Testing Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pre-agreed witness points</li>
              <li>Advance notification period</li>
              <li>Signed attendance records</li>
              <li>Defect reporting procedures</li>
              <li>Re-test arrangements</li>
            </ul>
            <p><strong>Record Retention</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Electrical certificates: life of installation</li>
              <li>Fire system records: minimum 6 years</li>
              <li>Commissioning data: life of systems</li>
              <li>Trend logs: per client requirements</li>
              <li>Digital backup essential</li>
            </ul>
            <p><strong>CIBSE Code M:</strong> Provides comprehensive guidance on commissioning management including record keeping, witness testing protocols and handover procedures for building services.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Log Book and Health &amp; Safety File">
            <p>The building log book (required under Part L of the Building Regulations) and the Health and Safety File (required under CDM 2015) are distinct legal requirements that ensure buildings can be operated safely and efficiently throughout their life.</p>
            <p><strong>Building Log Book Requirements (Part L)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design criteria:</strong> Internal temperatures, fresh air rates, illuminance levels, occupancy assumptions</li>
              <li><strong>HVAC systems:</strong> System descriptions, installed capacities, control strategies, operating schedules</li>
              <li><strong>Lighting systems:</strong> Lighting strategy, control types, installed load, lux levels achieved</li>
              <li><strong>Metering:</strong> Meter locations, sub-metering arrangements, energy monitoring provisions</li>
              <li><strong>Energy targets:</strong> Predicted energy consumption, benchmarks, carbon emissions targets</li>
              <li><strong>Maintenance:</strong> Recommended maintenance schedules to maintain efficiency</li>
            </ul>
            <p><strong>Part L Compliance Note</strong></p>
            <p>The building log book is a legal requirement for new non-domestic buildings under Part L of the Building Regulations. It must be provided to the building owner before the building is occupied or, where applicable, before the building control body issues a final certificate. The log book format should follow CIBSE TM31 guidance.</p>
            <p><strong>Health and Safety File (CDM 2015)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Structure:</strong> Key structural elements, safe working loads, access provisions</li>
              <li><strong>Hazardous materials:</strong> Location of any hazardous materials (e.g., asbestos in existing buildings)</li>
              <li><strong>Services:</strong> Location of services, isolation points, safety systems</li>
              <li><strong>Safe access:</strong> Equipment requiring access for maintenance, roof access provisions</li>
              <li><strong>Residual risks:</strong> Risks that could not be designed out, required precautions</li>
            </ul>
            <p><strong>Electrical H&amp;S File Content</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Location of distribution boards</li>
              <li>Main isolation points</li>
              <li>High voltage equipment locations</li>
              <li>Battery room hazards</li>
              <li>Cable routes in concealed locations</li>
              <li>Access requirements for maintenance</li>
            </ul>
            <p><strong>File Maintenance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Client responsibility after handover</li>
              <li>Update after any significant works</li>
              <li>Make available to future contractors</li>
              <li>Retain for life of building</li>
              <li>Transfer with building ownership</li>
            </ul>
            <p><strong>Legal requirement:</strong> Under CDM 2015, the client must ensure the Health and Safety File is prepared and maintained. Failure to do so is a criminal offence that can result in enforcement action by the HSE.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Digital Handover and COBie">
            <p>Digital handover increasingly replaces or supplements traditional paper-based documentation. COBie (Construction Operations Building information exchange) provides a standardised format for exchanging building asset data from design through construction to operation.</p>
            <p><strong>COBie Data Structure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Facility:</strong> Site and building information — Building name, address, project details</li>
              <li><strong>Floor:</strong> Level information — Floor names, elevations, areas</li>
              <li><strong>Space:</strong> Room and zone data — Room numbers, names, areas, usable heights</li>
              <li><strong>Type:</strong> Asset type specifications — Manufacturer, model, specifications</li>
              <li><strong>Component:</strong> Individual asset instances — Serial numbers, installation dates, locations</li>
              <li><strong>System:</strong> System groupings — Electrical distribution, fire alarm, HVAC</li>
              <li><strong>Document:</strong> Linked documentation — O&amp;M manuals, certificates, warranties</li>
            </ul>
            <p><strong>BS EN ISO 19650 Information Management</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EIR:</strong> Employer's Information Requirements define what information is required at handover</li>
              <li><strong>BEP:</strong> BIM Execution Plan describes how information will be delivered</li>
              <li><strong>AIR:</strong> Asset Information Requirements define operational phase needs</li>
              <li><strong>AIM:</strong> Asset Information Model is the delivered operational database</li>
              <li><strong>Level of Information Need:</strong> Specifies detail required for each asset type</li>
            </ul>
            <p><strong>Benefits of Digital Handover</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Searchable, accessible information</li>
              <li>Direct import to CAFM systems</li>
              <li>Consistent data structure</li>
              <li>Reduced duplication of effort</li>
              <li>Version control and audit trail</li>
              <li>Cloud-based access</li>
            </ul>
            <p><strong>Implementation Challenges</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Supply chain capability varies</li>
              <li>Data quality assurance required</li>
              <li>Software interoperability issues</li>
              <li>Training requirements</li>
              <li>Legacy system integration</li>
              <li>Ongoing maintenance of data</li>
            </ul>
            <p><strong>Government mandate:</strong> UK government projects require BIM Level 2 (now defined by BS EN ISO 19650) including COBie data drops at key project stages. Many private sector clients are adopting similar requirements.</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Documentation Submission Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>O&amp;M manual complete with all volumes and appendices</li>
              <li>As-built drawings in agreed format (PDF and native CAD/BIM)</li>
              <li>All test certificates signed and dated</li>
              <li>Commissioning records with witness signatures</li>
              <li>Building log book (Part L compliance)</li>
              <li>Health and Safety File contribution</li>
              <li>Training records and attendance registers</li>
              <li>Warranty documentation and contact details</li>
              <li>Spare parts lists with supplier information</li>
              <li>Software licences and access credentials</li>
            </ul>
            <p>
              <strong>Common Documentation Deficiencies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Generic content:</strong> Manufacturer literature without project-specific information</li>
              <li><strong>Missing test results:</strong> Certificates without supporting test schedules</li>
              <li><strong>Outdated drawings:</strong> Design drawings not updated to as-built status</li>
              <li><strong>Incomplete schedules:</strong> Equipment lists missing serial numbers or locations</li>
              <li><strong>Poor indexing:</strong> Difficult to navigate without clear contents and cross-references</li>
              <li><strong>No maintenance procedures:</strong> Manufacturer data without maintenance instructions</li>
            </ul>
            <p>
              <strong>BSRIA Soft Landings Documentation Review:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stage 1 (25%):</strong> Review structure, format and content headings</li>
              <li><strong>Stage 2 (50%):</strong> Review system descriptions and operating procedures</li>
              <li><strong>Stage 3 (75%):</strong> Review maintenance procedures and equipment schedules</li>
              <li><strong>Stage 4 (100%):</strong> Final review of complete documentation package</li>
            </ul>
          </ConceptBlock>

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Commissioning procedures
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Handover and training
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section6_5;
