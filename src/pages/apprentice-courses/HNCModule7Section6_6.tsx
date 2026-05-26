/**
 * Module 7 · Section 6 · Subsection 6 — Documentation Requirements
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Single line diagrams, distribution schedules, test certificates, O&M manuals, and as-built drawings for electrical installations
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

const TITLE = 'Documentation Requirements - HNC Module 7 Section 6.6';
const DESCRIPTION =
  'Master electrical installation documentation requirements: single line diagrams, distribution schedules, test certificates (EIC, EICR), O&M manuals, as-built drawings, and handover packages for building services projects.';

const quickCheckQuestions = [
  {
    id: 'single-line-purpose',
    question: 'What is the primary purpose of a single line diagram?',
    options: [
      'Your employer (line manager or office contact), with your training provider as a secondary route',
      'To provide a simplified representation of the electrical distribution system',
      'It is dust-tight and protected against water jets from any direction',
      'To measure the level of a substance or its metabolite in a worker\\\\\\\'s body (e.g., blood, urine)',
    ],
    correctIndex: 1,
    explanation:
      'A single line diagram provides a simplified schematic representation of the electrical distribution system, showing the relationship between supply sources, switchgear, distribution boards, and major loads without depicting every conductor.',
  },
  {
    id: 'eic-requirement',
    question: 'When must an Electrical Installation Certificate (EIC) be issued?',
    options: [
      'By scheduling operation based on occupancy and weather conditions',
      'To verify you are on pace — e.g., 20 questions done by the 30-minute mark',
      'For any new installation or addition to an existing installation',
      'Periodic synchronization signals from coordinators',
    ],
    correctIndex: 2,
    explanation:
      'An EIC must be issued for all new electrical installations and additions or alterations to existing installations. It certifies that the installation complies with BS 7671 at the time of completion.',
  },
  {
    id: 'om-manual-content',
    question: 'What is the minimum retention period for O&M manuals under CDM Regulations?',
    options: [
      '5 years',
      '25 years',
      'Life of the building',
      '10 years',
    ],
    correctIndex: 2,
    explanation:
      'O&M manuals form part of the Health and Safety File under CDM Regulations 2015 and must be retained for the life of the building. They provide essential information for safe operation, maintenance, and future modifications.',
  },
  {
    id: 'as-built-drawings',
    question: 'As-built drawings differ from construction drawings because they:',
    options: [
      'Show the installation exactly as constructed including all variations',
      'Phase-shift the start winding current to create a temporary 2-phase field for starting',
      'The test current passes through earth causing imbalance',
      'When investigating supply problems or intermittent faults',
    ],
    correctIndex: 0,
    explanation:
      'As-built drawings record the installation exactly as constructed, incorporating all variations, site instructions, and changes made during installation. They provide an accurate record for future maintenance and modifications.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which document provides a simplified schematic showing the electrical distribution hierarchy?',
    options: [
      'Distribution schedule',
      'Single line diagram',
      'Cable schedule',
      'Test certificate',
    ],
    correctAnswer: 1,
    explanation:
      'A single line diagram (also called a one-line diagram) provides a simplified schematic representation showing the electrical distribution hierarchy from incoming supply through switchgear to final distribution boards.',
  },
  {
    id: 2,
    question: 'What information must a distribution schedule contain for each circuit?',
    options: [
      'Operating instructions, maintenance schedules, as-built drawings, and test certificates',
      'For additions or alterations that do not extend to new circuits',
      'Circuit number, description, protective device rating, cable size, and design current',
      'As-built drawings incorporate all variations and changes made during construction',
    ],
    correctAnswer: 2,
    explanation:
      'A distribution schedule must contain comprehensive circuit information including circuit number, description, protective device type and rating, cable type and size, design current, and circuit reference. This enables future maintenance and modifications.',
  },
  {
    id: 3,
    question: 'Who is responsible for signing Section 1 (Declaration by Designer) of an EIC?',
    options: [
      'Potentially dangerous - urgent remedial action required',
      'Cable type, size, length, route, origin, and destination',
      'For the working life of the installation',
      'The person responsible for the design of the installation',
    ],
    correctAnswer: 3,
    explanation:
      'Section 1 of the EIC (Declaration by Designer) must be signed by the person responsible for the design of the electrical installation. This may be different from the installer if design and installation are carried out by different parties.',
  },
  {
    id: 4,
    question: 'What is the purpose of a Minor Electrical Installation Works Certificate (MEIWC)?',
    options: [
      'For additions or alterations that do not extend to new circuits',
      'Cable type, size, length, route, origin, and destination',
      'Potentially dangerous - urgent remedial action required',
      'The person responsible for the design of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'A MEIWC is used for additions or alterations to an existing installation that do not include the provision of a new circuit. Examples include adding a socket outlet to an existing circuit or replacing a consumer unit.',
  },
  {
    id: 5,
    question: 'An EICR classification code C2 indicates:',
    options: [
      'Cable type, size, length, route, origin, and destination',
      'Potentially dangerous - urgent remedial action required',
      'The person responsible for the design of the installation',
      'For additions or alterations that do not extend to new circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Code C2 indicates a potentially dangerous condition where urgent remedial action is required. While not presenting immediate danger (C1), the defect could become dangerous under certain conditions and requires prompt attention.',
  },
  {
    id: 6,
    question: 'O&M manuals for electrical installations should include:',
    options: [
      'For additions or alterations that do not extend to new circuits',
      'Circuit number, description, protective device rating, cable size, and design current',
      'Operating instructions, maintenance schedules, as-built drawings, and test certificates',
      'Continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation',
    ],
    correctAnswer: 2,
    explanation:
      'O&M manuals must be comprehensive, including operating instructions, maintenance schedules, as-built drawings, test certificates, equipment data sheets, spare parts lists, and emergency procedures for all installed systems.',
  },
  {
    id: 7,
    question: 'According to BS 7671, how long must EICs and associated test results be retained?',
    options: [
      '6× cable overall diameter (factory minimum).',
      'Section 8 — Exposure controls/personal protection',
      'Regular inspection for corrosion and weathering',
      'For the working life of the installation',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Regulation 132.13 requires that EICs and associated test results be retained for the working life of the electrical installation. They provide essential safety records and evidence of compliance.',
  },
  {
    id: 8,
    question: 'What distinguishes as-built drawings from construction issue drawings?',
    options: [
      'As-built drawings incorporate all variations and changes made during construction',
      'Operating instructions, maintenance schedules, as-built drawings, and test certificates',
      'Circuit number, description, protective device rating, cable size, and design current',
      'The person responsible for the design of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'As-built drawings are updated versions of construction drawings that incorporate all variations, site instructions, and changes made during the installation process. They provide an accurate record of the installation as actually constructed.',
  },
  {
    id: 9,
    question: 'Under CDM 2015, electrical documentation forms part of the:',
    options: [
      'Pre-construction information',
      'Health and Safety File',
      'Construction phase plan',
      'F10 notification',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical documentation including O&M manuals, as-built drawings, and test certificates forms part of the Health and Safety File under CDM 2015. This file must be handed to the client on project completion and retained for the life of the building.',
  },
  {
    id: 10,
    question: 'A cable schedule should record which of the following?',
    options: [
      'For additions or alterations that do not extend to new circuits',
      'The person responsible for the design of the installation',
      'Cable type, size, length, route, origin, and destination',
      'For the working life of the installation',
    ],
    correctAnswer: 2,
    explanation:
      'A cable schedule should record comprehensive information including cable type and specification, size, length, route reference, origin (supply point), destination, containment type, and any relevant notes about installation conditions.',
  },
  {
    id: 11,
    question:
      'What is the recommended interval for periodic inspection of a commercial installation?',
    options: [
      '1 year',
      '3 years',
      '10 years',
      '5 years',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Guidance Note 3 recommends a maximum interval of 5 years between periodic inspections for commercial premises. However, more frequent inspection may be appropriate depending on the installation type, use, and external influences.',
  },
  {
    id: 12,
    question: 'Which test results must be recorded on Schedule of Test Results?',
    options: [
      'Continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation',
      'Circuit number, description, protective device rating, cable size, and design current',
      'As-built drawings incorporate all variations and changes made during construction',
      'Operating instructions, maintenance schedules, as-built drawings, and test certificates',
    ],
    correctAnswer: 0,
    explanation:
      'The Schedule of Test Results must record all verification tests including continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance (Zs), prospective fault current (Ipf), and RCD operation times where applicable.',
  },
];

const faqs = [
  {
    question: 'What is the difference between an EIC and an EICR?',
    answer:
      'An Electrical Installation Certificate (EIC) is issued for new installations or additions/alterations to existing installations, certifying compliance with BS 7671 at completion. An Electrical Installation Condition Report (EICR) is for periodic inspection of existing installations, assessing the condition against current standards and identifying any deterioration, defects, or non-compliances. An EIC declares compliance; an EICR reports condition.',
  },
  {
    question: 'Who is responsible for producing as-built drawings?',
    answer:
      'The installing contractor is typically responsible for producing as-built drawings, as they have first-hand knowledge of any variations made during construction. However, on larger projects, this may be coordinated through the principal designer or M&E consultant. The contract should clearly define responsibility for as-built documentation and specify the required format (often BIM models for larger projects).',
  },
  {
    question: 'How detailed should O&M manuals be for electrical installations?',
    answer:
      'O&M manuals should be sufficiently detailed to enable competent persons to safely operate, maintain, and modify the installation throughout its life. This includes system descriptions, operating procedures, maintenance schedules with frequencies, manufacturer data sheets, spare parts lists, emergency procedures, and all relevant test certificates and as-built drawings. The level of detail should be proportionate to system complexity.',
  },
  {
    question: 'Can digital/electronic copies replace paper documentation?',
    answer:
      'Yes, BS 7671 and CDM 2015 permit electronic documentation provided it remains accessible and legible for the required retention period. Many clients now require BIM models and digital O&M portals. However, ensure backup systems are in place, formats remain readable as technology evolves, and appropriate access controls protect sensitive information. Some clients may still require paper originals of test certificates.',
  },
  {
    question: 'What happens if documentation is lost or incomplete?',
    answer:
      'Lost or incomplete documentation creates significant problems for future maintenance and modifications. If original documents cannot be recovered, a comprehensive periodic inspection (EICR) should be carried out to establish the current condition. As-built drawings may need to be recreated through site survey. Missing documentation may indicate poor project management and could have contractual implications regarding practical completion.',
  },
  {
    question: 'How should documentation be organised for handover?',
    answer:
      'Documentation should be organised logically, typically by system then sub-system. Use a structured index and consistent numbering. Include a document register listing all items with revision status. Separate operational documents (needed for day-to-day running) from archive documents (certificates, warranties). Electronic documentation should use consistent file naming and folder structures. Allow time for client review before handover.',
  },
];

const HNCModule7Section6_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 6 · Subsection 6"
            title="Documentation Requirements"
            description="Single line diagrams, distribution schedules, test certificates, O&M manuals, and as-built drawings for electrical installations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Interpret and create single line diagrams for electrical distribution systems",
              "Produce comprehensive distribution schedules with required circuit data",
              "Understand EIC, EICR, and MEIWC certification requirements",
              "Compile O&M manuals meeting CDM and client specifications",
              "Develop as-built drawings accurately recording installed works",
              "Assemble complete handover documentation packages",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Single Line Diagrams and Distribution Schedules">
            <p>Single line diagrams and distribution schedules are fundamental documents for understanding and managing electrical installations. They provide essential information for operation, maintenance, fault finding, and future modifications.</p>
            <p><strong>Single Line Diagram Requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply details:</strong> DNO supply characteristics, CT ratios, maximum demand</li>
              <li><strong>Main switchgear:</strong> Main switch rating, type, fault level rating</li>
              <li><strong>Distribution hierarchy:</strong> MSB &gt; sub-mains &gt; DBs &gt; final circuits</li>
              <li><strong>Protective devices:</strong> Type, rating, breaking capacity at each level</li>
              <li><strong>Cable references:</strong> Size and type of main feeders and sub-mains</li>
              <li><strong>Metering points:</strong> Location of revenue and sub-meters</li>
            </ul>
            <p><strong>Distribution Schedule Content</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Circuit No.:</strong> Unique circuit reference — 1, 2, 3... or L1, L2, P1...</li>
              <li><strong>Description:</strong> Circuit use/location — Lighting - Ground Floor East</li>
              <li><strong>Protective Device:</strong> Type and rating — MCB Type B 16A</li>
              <li><strong>Cable:</strong> Type and size — 6242Y 1.5mm²</li>
              <li><strong>Design Current (Ib):</strong> Calculated load current — 8.5A</li>
              <li><strong>RCD:</strong> RCD protection if applicable — 30mA Type A</li>
              <li><strong>Points:</strong> Number of outlets — 12 luminaires</li>
            </ul>
            <p><strong>Single Line Diagram Symbols</strong></p>
            <p>Common symbols include:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Transformer (two circles)</li>
              <li>• Isolator (gap with contacts)</li>
              <li>• Circuit breaker (square with X)</li>
              <li>• Fuse (rectangle)</li>
            </ul>
            <p>Must also show:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Earth connections</li>
              <li>• Neutral arrangements</li>
              <li>• Generator connections</li>
              <li>• UPS systems</li>
            </ul>
            <p><strong>Best practice:</strong> Single line diagrams should be displayed in main switch rooms. Distribution schedules should be fixed inside each distribution board cover.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Test Certificates (EIC, EICR, MEIWC)">
            <p>Electrical test certificates provide formal documentation of compliance and condition. BS 7671 requires specific certificates for different types of work, each serving distinct purposes in the certification regime.</p>
            <p><strong>EIC - Electrical Installation Certificate</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>New installations</li>
              <li>Additions with new circuits</li>
              <li>Alterations with new circuits</li>
              <li>Three declarations required</li>
              <li>Schedule of test results</li>
            </ul>
            <p><strong>EICR - Condition Report</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Periodic inspection</li>
              <li>Change of occupancy</li>
              <li>Change of use</li>
              <li>Classification codes (C1-C3, FI)</li>
              <li>Recommendations for next inspection</li>
            </ul>
            <p><strong>MEIWC - Minor Works</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No new circuits</li>
              <li>Additions to existing circuits</li>
              <li>Like-for-like replacements</li>
              <li>Single page format</li>
              <li>Simplified test results</li>
            </ul>
            <p><strong>EIC Declaration Sections</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Section 1:</strong> Designer — Design complies with BS 7671</li>
              <li><strong>Section 2:</strong> Constructor/Installer — Installation constructed to design</li>
              <li><strong>Section 3:</strong> Inspector/Tester — Inspection and testing completed</li>
            </ul>
            <p><strong>EICR Classification Codes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>C1:</strong> Danger present — Immediate remedial action</li>
              <li><strong>C2:</strong> Potentially dangerous — Urgent remedial action</li>
              <li><strong>C3:</strong> Improvement recommended — Action at discretion</li>
              <li><strong>FI:</strong> Further investigation — Investigation required</li>
            </ul>
            <p><strong>Retention requirement:</strong> BS 7671 Regulation 132.13 requires certificates and test results to be retained for the working life of the installation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Operation and Maintenance Manuals">
            <p>Operation and Maintenance (O&M) manuals provide comprehensive information for the safe operation, maintenance, and modification of electrical installations throughout their service life. They form a key part of the CDM Health and Safety File.</p>
            <p><strong>O&M Manual Structure</strong></p>
            <p><strong>Volume 1 - Operating Information</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• System descriptions and schematics</li>
              <li>• Operating procedures</li>
              <li>• Start-up/shutdown sequences</li>
              <li>• Emergency procedures</li>
              <li>• Contact details for support</li>
            </ul>
            <p><strong>Volume 2 - Maintenance Information</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Maintenance schedules and frequencies</li>
              <li>• Equipment data sheets</li>
              <li>• Spare parts lists and suppliers</li>
              <li>• Test certificates and records</li>
              <li>• As-built drawings</li>
            </ul>
            <p><strong>O&M Manual Contents Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Introduction:</strong> Project details, installation summary, document register</li>
              <li><strong>System descriptions:</strong> Written description of each system with operating parameters</li>
              <li><strong>Schematics:</strong> Single line diagrams, control schematics, wiring diagrams</li>
              <li><strong>Equipment schedules:</strong> All installed equipment with make, model, ratings</li>
              <li><strong>Manufacturer literature:</strong> Data sheets, installation instructions, warranty details</li>
              <li><strong>Maintenance schedules:</strong> PPM requirements with frequencies and procedures</li>
              <li><strong>Spare parts:</strong> Recommended spares with part numbers and suppliers</li>
              <li><strong>Test certificates:</strong> EIC, commissioning records, witness test reports</li>
              <li><strong>As-built drawings:</strong> Final installation drawings including all variations</li>
              <li><strong>Training records:</strong> Evidence of handover training provided</li>
            </ul>
            <p><strong>Maintenance Schedule Example - Distribution Boards</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Visual inspection:</strong> Monthly — Skilled person</li>
              <li><strong>Thermal imaging survey:</strong> Annually — Competent person</li>
              <li><strong>Termination tightness check:</strong> Annually — Competent person</li>
              <li><strong>RCD functional test:</strong> Quarterly — Instructed person</li>
              <li><strong>Full periodic inspection:</strong> 5 years — Competent person</li>
            </ul>
            <p><strong>CDM requirement:</strong> O&M manuals form part of the Health and Safety File and must be retained for the life of the building. They should be updated whenever significant modifications are made.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="As-Built Drawings and Handover Documentation">
            <p>As-built drawings record the installation exactly as constructed, incorporating all variations from the original design. Combined with other documentation, they form a comprehensive handover package essential for building operation and future works.</p>
            <p><strong>As-Built Drawing Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Accuracy:</strong> Must reflect actual installed positions, routes, and equipment</li>
              <li><strong>Variations:</strong> All site instructions, RFIs, and changes incorporated</li>
              <li><strong>Cable routes:</strong> Actual containment routes with measurements from datums</li>
              <li><strong>Equipment locations:</strong> Precise positions of all distribution boards, switches, accessories</li>
              <li><strong>Hidden services:</strong> Accurate recording of concealed cables and equipment</li>
              <li><strong>Revision status:</strong> Clearly marked as "As-Built" with final revision number</li>
            </ul>
            <p><strong>Drawing Types Required</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>General arrangement:</strong> Equipment positions, containment routes — 1:50 or 1:100</li>
              <li><strong>Single line diagrams:</strong> Distribution schematic — NTS</li>
              <li><strong>Lighting layouts:</strong> Luminaire positions, switching zones — 1:50 or 1:100</li>
              <li><strong>Small power layouts:</strong> Socket and FCU positions — 1:50 or 1:100</li>
              <li><strong>Containment layouts:</strong> Cable tray, trunking, conduit routes — 1:50 or 1:100</li>
              <li><strong>Wiring diagrams:</strong> Panel internal wiring, control circuits — NTS</li>
              <li><strong>External works:</strong> Underground routes, depths, marker posts — 1:100 or 1:200</li>
            </ul>
            <p><strong>Handover Documentation Package Checklist</strong></p>
            <p><strong>Certificates and Records</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>☐ Electrical Installation Certificate(s)</li>
              <li>☐ Schedule of Test Results</li>
              <li>☐ Commissioning records</li>
              <li>☐ Witness test records</li>
              <li>☐ Fire alarm certificate</li>
              <li>☐ Emergency lighting certificate</li>
              <li>☐ PAT test records (if applicable)</li>
            </ul>
            <p><strong>Documentation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>☐ O&M manuals (operation)</li>
              <li>☐ O&M manuals (maintenance)</li>
              <li>☐ As-built drawings (full set)</li>
              <li>☐ Equipment warranties</li>
              <li>☐ Spare parts and keys</li>
              <li>☐ Training sign-off sheets</li>
              <li>☐ Snagging completion records</li>
            </ul>
            <p><strong>Document Retention Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EIC and test results:</strong> Life of installation — BS 7671 Reg. 132.13</li>
              <li><strong>Health and Safety File:</strong> Life of building — CDM 2015 Reg. 12</li>
              <li><strong>O&M manuals:</strong> Life of building — CDM 2015 / Contract</li>
              <li><strong>As-built drawings:</strong> Life of building — Good practice</li>
              <li><strong>EICR reports:</strong> Until superseded + archive — BS 7671</li>
            </ul>
            <p><strong>BIM requirement:</strong> On larger projects, as-built information is increasingly required as updated BIM models (COBie data) rather than traditional 2D drawings. The model becomes the authoritative record of the installation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Distribution Schedule Preparation</strong>
            </p>
            <p><strong>Scenario:</strong> Complete a distribution schedule for a 12-way TP+N board serving office lighting and power.</p>
            <p>Distribution Board: DB-L1-01 | Location: First Floor Riser</p>
            <p>Supply: 100A TP+N from MSB via 25mm² 4c SWA</p>
            <p>Circuit Schedule:</p>
            <p>Cct | Description | Device | Cable | Ib | RCD</p>
            <p>----|---------------------|-------------|------------|------|--------</p>
            <p>1 | Lighting Zone A | B10 SP | 1.5mm² 3c | 6.2A | 30mA A</p>
            <p>2 | Lighting Zone B | B10 SP | 1.5mm² 3c | 5.8A | 30mA A</p>
            <p>3 | Emergency Lighting | B6 SP | 1.5mm² 3c | 2.1A | 30mA A</p>
            <p>4 | Small Power Ring 1 | B32 SP | 2.5mm² 3c | 20A | 30mA A</p>
            <p>5 | Small Power Ring 2 | B32 SP | 2.5mm² 3c | 20A | 30mA A</p>
            <p>6 | Server Room AC | B20 DP | 4.0mm² 3c | 16A | -</p>
            <p>Note: All circuits comply with BS 7671 requirements</p>
            <p>
              <strong>Example 2: EICR Observation Recording</strong>
            </p>
            <p><strong>Scenario:</strong> Record observations from a periodic inspection with appropriate classification codes.</p>
            <p>Schedule of Observations:</p>
            <p>Obs | Location | Observation | Code</p>
            <p>----|-----------------|----------------------------------|------</p>
            <p>1 | DB-G01 | Missing circuit chart | C3</p>
            <p>2 | Kitchen | Unprotected cable at cooker |  <span>C1</span></p>
            <p>3 | WC | No supplementary bonding | <span>C2</span></p>
            <p>4 | External | IP rating inadequate for location|  <span>C2</span></p>
            <p>5 | Throughout | No RCD protection to socket outlets|  <span>C2</span></p>
            <p>6 | Intake | Meter tails undersized for load | FI</p>
            <p>Overall condition: Unsatisfactory</p>
            <p>C1 requires immediate attention - client notified</p>
            <p>
              <strong>Example 3: O&M Manual Index Structure</strong>
            </p>
            <p><strong>Scenario:</strong> Develop an index structure for electrical O&M manuals for a commercial building.</p>
            <p>Volume E - Electrical Installation O&M Manual</p>
            <p>Section | Content</p>
            <p>--------|------------------------------------------</p>
            <p>E.1 | Introduction and System Overview</p>
            <p>E.2 | Single Line Diagrams</p>
            <p>E.3 | Distribution Schedules</p>
            <p>E.4 | LV Switchgear - Operation & Maintenance</p>
            <p>E.5 | Distribution Boards - Schedules & Data</p>
            <p>E.6 | Lighting Systems - Control & Operation</p>
            <p>E.7 | Emergency Lighting - Test Procedures</p>
            <p>E.8 | Fire Alarm System - Operation & Test</p>
            <p>E.9 | UPS System - Operation & Maintenance</p>
            <p>E.10 | Generator - Operation & Maintenance</p>
            <p>E.11 | Manufacturer Data Sheets</p>
            <p>E.12 | Spare Parts Lists</p>
            <p>E.13 | Test Certificates (EIC, Schedules)</p>
            <p>E.14 | Commissioning Records</p>
            <p>E.15 | As-Built Drawing Register</p>
            <p>Format: PDF with searchable index, also BIM COBie data</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Documentation Production Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Start documentation early - don't leave until project end</li>
              <li>Record variations and changes as they occur on site</li>
              <li>Use standardised templates for consistency</li>
              <li>Ensure all signatories have appropriate competence</li>
              <li>Cross-reference between documents (drawings to schedules)</li>
              <li>Allow time for client review before formal handover</li>
            </ul>
            <p>
              <strong>Key Documentation Standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 7671: Certification requirements and test schedules</li>
              <li>BS 8536: Briefing for design and construction (soft landings)</li>
              <li>PAS 1192-2: BIM Level 2 requirements</li>
              <li>BSRIA BG 6: Guide to design information</li>
              <li>SFG 20: Maintenance specifications</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Missing signatures:</strong> All EIC sections must be signed by appropriate persons</li>
                <li><strong>Incomplete test results:</strong> Every circuit must have recorded values</li>
                <li><strong>Outdated drawings:</strong> As-built must include all final variations</li>
                <li><strong>Generic O&M content:</strong> Must be project-specific, not manufacturer templates</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-5")}
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 8
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section6_6;
