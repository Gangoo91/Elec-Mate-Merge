/**
 * Module 6 · Section 1 · Subsection 4 — Air Permeability
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Air tightness testing, design air permeability, testing procedures, and achieving targets during construction
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

const TITLE = 'Air Permeability - HNC Module 6 Section 1.4';
const DESCRIPTION =
  'Master air permeability testing for building services: air tightness standards, blower door testing, ATTMA procedures, common leakage paths, and achieving design targets during construction.';

const quickCheckQuestions = [
  {
    id: 'air-permeability-definition',
    question: 'What is air permeability measured in according to UK Building Regulations?',
    options: [
      'Pascals per hour',
      'Cubic metres per hour per square metre at 50 Pascals (m³/h.m² @ 50Pa)',
      'Air changes per hour (ACH)',
      'Litres per second per square metre',
    ],
    correctIndex: 1,
    explanation:
      'Air permeability in the UK is measured in m³/h.m² @ 50Pa - the volume of air passing through each square metre of envelope area per hour when a 50 Pascal pressure difference is applied across the building envelope.',
  },
  {
    id: 'blower-door-purpose',
    question: 'What is the primary purpose of a blower door test?',
    options: [
      'To measure ventilation rates during normal operation',
      'To pressurise the building to identify air leakage paths and measure overall airtightness',
      'To test the mechanical ventilation system performance',
      'To calculate heating load requirements',
    ],
    correctIndex: 1,
    explanation:
      'A blower door test pressurises (or depressurises) the building to a standard pressure difference (typically 50Pa) to measure the overall air leakage rate and identify leakage paths in the building envelope.',
  },
  {
    id: 'attma-certification',
    question: 'What does ATTMA certification ensure?',
    options: [
      'The building meets Part L requirements',
      'The tester is qualified and uses calibrated equipment to recognised standards',
      'The ventilation system is correctly installed',
      'The insulation meets required U-values',
    ],
    correctIndex: 1,
    explanation:
      'ATTMA (Air Tightness Testing & Measurement Association) certification ensures testers are trained, competent, and use calibrated equipment. ATTMA-certified tests are required for Building Regulations compliance evidence.',
  },
  {
    id: 'common-leakage-path',
    question:
      'Which of these is typically the most significant source of air leakage in new buildings?',
    options: [
      'Window frames',
      'Service penetrations through the air barrier',
      'Roof junctions',
      'Door seals',
    ],
    correctIndex: 1,
    explanation:
      'Service penetrations (electrical, plumbing, mechanical, data) through the air barrier are typically the most significant and numerous sources of air leakage. Proper sealing coordination with MEP trades is essential.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The Building Regulations Part L limiting air permeability for new dwellings is:',
    options: ['3 m³/h.m² @ 50Pa', '5 m³/h.m² @ 50Pa', '8 m³/h.m² @ 50Pa', '10 m³/h.m² @ 50Pa'],
    correctAnswer: 2,
    explanation:
      'Part L 2021 sets a limiting air permeability of 8 m³/h.m² @ 50Pa for new dwellings. However, notional dwelling specifications and many designs target much lower values (typically 3-5 m³/h.m²) to achieve energy performance requirements.',
  },
  {
    id: 2,
    question: 'When should the first air permeability test ideally be conducted?',
    options: [
      'After practical completion',
      'After the air barrier is complete but before internal finishes',
      'After all MEP second fix is complete',
      'During the warranty period',
    ],
    correctAnswer: 1,
    explanation:
      'The ideal timing is after the air barrier is complete but before internal finishes conceal it. This allows remedial work to be undertaken without costly disruption. A pre-test at this stage is best practice.',
  },
  {
    id: 3,
    question: "In a blower door test, what does the 'n50' value represent?",
    options: [
      'The number of tests required at 50Pa',
      'Air changes per hour at 50 Pascals pressure difference',
      'The air permeability in m³/h.m²',
      'The percentage of leakage through services',
    ],
    correctAnswer: 1,
    explanation:
      'The n50 value represents air changes per hour (ACH) at 50 Pascals pressure difference. It is calculated by dividing the air leakage rate (m³/h) by the internal volume of the building.',
  },
  {
    id: 4,
    question:
      'What is the minimum test pressure required for a valid air permeability test under ATTMA TSL1?',
    options: ['25 Pa', '50 Pa', '75 Pa', '100 Pa'],
    correctAnswer: 1,
    explanation:
      'ATTMA TSL1 (Technical Standard L1) requires a minimum induced pressure of 50 Pa for the test to be valid. Tests are conducted at multiple pressure stages (typically 10-60 Pa) to establish the flow/pressure relationship.',
  },
  {
    id: 5,
    question:
      'Which sealing method is most appropriate for electrical back boxes penetrating the air barrier?',
    options: [
      "Standard decorator's caulk",
      'Proprietary airtight back boxes or membrane seals',
      'Expanding foam only',
      'No sealing required as they are internal',
    ],
    correctAnswer: 1,
    explanation:
      'Proprietary airtight back boxes or membrane seals should be used. These products are designed for the purpose, maintain the air barrier continuity, and accommodate cable entries. Standard sealants and expanding foam alone are insufficient.',
  },
  {
    id: 6,
    question:
      'For large non-domestic buildings, what is an acceptable approach when testing air permeability?',
    options: [
      'Test the entire building as a single zone',
      'Use representative sample testing of similar construction zones',
      'Only test after three years of occupation',
      'Testing is not required for buildings over 5000m²',
    ],
    correctAnswer: 1,
    explanation:
      "For large buildings, representative sample testing of similar construction zones is acceptable under ATTMA TSL2. The samples must be representative of the building's construction types and the results applied to similar zones.",
  },
  {
    id: 7,
    question: 'What effect does poor airtightness have on mechanical ventilation systems?',
    options: [
      'No effect - they are separate systems',
      'Improves ventilation by supplementing airflow',
      'Compromises system balance, reduces efficiency, and can cause draughts',
      'Only affects heating, not ventilation',
    ],
    correctAnswer: 2,
    explanation:
      "Poor airtightness compromises MVHR system performance by allowing uncontrolled infiltration that bypasses heat recovery, creates pressure imbalances, causes draughts, and reduces the system's energy efficiency and effectiveness.",
  },
  {
    id: 8,
    question:
      "The 'pulse method' for air permeability testing differs from blower door testing in that it:",
    options: [
      'Uses higher pressures for more accurate results',
      'Uses a rapid pressure pulse to minimise the effect of wind and temperature',
      'Can only be used on small buildings',
      'Does not require calibrated equipment',
    ],
    correctAnswer: 1,
    explanation:
      'The pulse method uses a rapid air compression/release to create a momentary pressure difference. This short duration (approximately 1.5 seconds) minimises the influence of wind and stack effects, making it suitable for testing in variable weather conditions.',
  },
  {
    id: 9,
    question: 'Which MEP coordination issue most commonly causes air permeability test failures?',
    options: [
      'Ductwork joints being too loose',
      'Late installation of services after air barrier sealing is complete',
      'Electrical cables being too large',
      'Plumbing pipes being incorrectly sized',
    ],
    correctAnswer: 1,
    explanation:
      'Late installation of services after the air barrier is sealed - or worse, sealed around - creates new penetrations that breach the air barrier. Proper MEP coordination ensures all penetrations are made and sealed before finishes conceal them.',
  },
  {
    id: 10,
    question:
      'When using smoke pencils or theatrical smoke during a blower door test, what are you identifying?',
    options: [
      'Fire stopping adequacy',
      'Specific locations of air leakage paths',
      'Ventilation system commissioning data',
      'Thermal bridging locations',
    ],
    correctAnswer: 1,
    explanation:
      'Smoke testing during pressurisation/depressurisation visually identifies specific air leakage paths. Smoke is drawn towards (depressurised) or pushed away from (pressurised) leakage points, enabling targeted remediation.',
  },
  {
    id: 11,
    question: "The 'design air permeability' value used for energy calculations should be:",
    options: [
      'The Part L limiting value',
      'The tested value from a similar completed building or a reasonable target for the construction type',
      'Always 3 m³/h.m² @ 50Pa',
      'Not specified until the building is complete',
    ],
    correctAnswer: 1,
    explanation:
      'The design air permeability should be a realistic target based on the construction type and evidence from similar buildings. Overly optimistic values will require re-calculation if testing shows higher actual leakage.',
  },
  {
    id: 12,
    question:
      'What is the consequence if a completed building fails to meet its design air permeability target?',
    options: [
      'The building cannot be occupied',
      'The energy calculation must be revised, potentially requiring compensating measures',
      'A fine is automatically issued',
      'The test can simply be repeated until it passes',
    ],
    correctAnswer: 1,
    explanation:
      'If the tested air permeability exceeds the design value, the SAP/SBEM energy calculation must be revised. This may result in non-compliance, requiring compensating measures such as improved insulation, more efficient heating systems, or remedial airtightness work.',
  },
];

const faqs = [
  {
    question: 'What happens if we fail the air permeability test?',
    answer:
      "If the test result exceeds the design target, you have options: (1) Identify and seal leakage paths, then retest - this is often possible with smoke testing to locate issues. (2) Revise the energy calculation with the actual tested value - this may still achieve compliance if there's headroom in other aspects. (3) Implement compensating measures such as improved insulation or more efficient plant to offset the higher air leakage. The key is to identify potential issues early through pre-testing before finishes conceal the air barrier.",
  },
  {
    question: 'How do MEP installations affect air permeability?',
    answer:
      'MEP services are typically the largest source of air leakage in modern well-constructed buildings. Every penetration through the air barrier - cables, pipes, ducts, flues - creates a potential leakage path. Coordination is essential: penetrations should be made before the air barrier is completed, appropriately sized grommets or seals specified, and sealing should be inspected before concealment. Late MEP installation after air barrier completion is a primary cause of test failures.',
  },
  {
    question: 'What is the difference between air permeability and air leakage index?',
    answer:
      'Air permeability (q50) divides the air leakage rate by the total envelope area (floor, walls, roof) and is used for dwellings under Part L1A. Air leakage index (q50) divides by the internal floor area and is used for non-domestic buildings under Part L2A. The same building tested to the same standard will have different numerical results depending on which metric is used. Always check which metric applies to your building type.',
  },
  {
    question: 'Can we test the building in sections rather than all at once?',
    answer:
      'Yes, for large or complex buildings, zonal testing is common and acceptable under ATTMA TSL2. Each zone should be a discrete, sealable section with its own air barrier. For representative sample testing, zones must be selected to represent all construction types in the building. Results from samples are applied to similar construction zones. The testing strategy should be agreed with the BCO early in the project.',
  },
  {
    question: 'What weather conditions affect air permeability testing?',
    answer:
      'High winds (typically >6 m/s) and large temperature differences between inside and outside can affect results by creating natural pressure differences that compete with the test fan. ATTMA standards require recording weather conditions and may require test postponement in extreme conditions. Pre-test zero-flow pressure difference measurements help identify when natural conditions are problematic.',
  },
  {
    question: 'Who is responsible for achieving the air permeability target?',
    answer:
      'Achieving airtightness is a whole-team responsibility. The designer must specify a realistic target and appropriate details. The main contractor typically takes contractual responsibility. Specialist trades (particularly MEP) must follow sealing details for their penetrations. An airtightness champion or coordinator should be appointed to oversee implementation, conduct inspections, and coordinate pre-testing. Without clear responsibility, airtightness often falls between trades.',
  },
];

const HNCModule6Section1_4 = () => {
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
            eyebrow="Module 6 · Section 1 · Subsection 4"
            title="Air Permeability"
            description="Air tightness testing, design air permeability, testing procedures, and achieving targets during construction"
            tone="purple"
          />

          <TLDR
            points={[
              "Air permeability is measured by blower-door test per ATTMA TSL1 (dwellings) or TSL2 (non-dom) at a 50 Pa pressure differential, expressed as m³/(h·m²) of envelope area.",
              "Part L 2021 sets the legal maximum at 8 m³/h·m² for new dwellings; the notional building assumes 5 to drive ambitious design. Below 3 you must demonstrate adequate ventilation under Part F.",
              "As buildings get tighter, ventilation strategy becomes critical — MVHR (mechanical ventilation with heat recovery) is now the default for dwellings achieving <5.",
            ]}
          />

          <RegsCallout
            source="Approved Document L Volume 1 — Air permeability testing requirements"
            clause="A pressure test should be carried out on every dwelling, except where Building Control accepts a representative sample test for development of multiple identical dwellings. The test shall be carried out by a person registered under a scheme approved by the Secretary of State (e.g. ATTMA) using the methodology in ATTMA TSL1."
            meaning={
              <>
                Every-plot testing is now the default — the old representative-sample concession is rare. Use an ATTMA-registered tester, retain the certificate for Building Control, and feed the as-tested figure into the as-built SAP. A failed test halts the completion process until remediation and re-test is done.
              </>
            }
            cite="Source: Approved Document L Volume 1: 2021 — gov.uk; ATTMA TSL1 testing standard"
          />

          <LearningOutcomes
            outcomes={[
              "Understand air permeability standards and Part L requirements",
              "Explain blower door testing methodology and equipment",
              "Apply ATTMA testing procedures and certification requirements",
              "Identify common air leakage paths in building envelopes",
              "Coordinate MEP installations to maintain air barrier integrity",
              "Implement strategies to achieve design air permeability targets",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Air Permeability Fundamentals">
            <p>Air permeability measures the rate at which air passes through the building envelope when a pressure difference is applied. It is a key indicator of building envelope quality and directly impacts energy performance, thermal comfort, and indoor air quality.</p>
            <p><strong>Key terminology:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Air permeability (q50):</strong> Air leakage rate per m² of envelope area at 50Pa (m³/h.m²)</li>
              <li><strong>Air leakage index:</strong> Air leakage rate per m² of floor area at 50Pa (used for non-domestic)</li>
              <li><strong>n50 (air changes):</strong> Volume air changes per hour at 50Pa (ACH)</li>
              <li><strong>Air barrier:</strong> The continuous layer that prevents air movement through the envelope</li>
            </ul>
            <p><strong>Building Regulations Air Permeability Limits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>New dwellings (Part L1A):</strong> 8 m³/h.m² @ 50Pa — 3-5 m³/h.m² @ 50Pa — ~0.6 ACH (n50)</li>
              <li><strong>New non-domestic (Part L2A):</strong> 8 m³/h.m² @ 50Pa — 3-5 m³/h.m² @ 50Pa — ~0.6 ACH (n50)</li>
              <li><strong>Existing dwellings (Part L1B):</strong> Not mandatory — Varies by scope — N/A</li>
              <li><strong>Extensions &gt;50m²:</strong> 8 m³/h.m² @ 50Pa — Match existing or better — N/A</li>
            </ul>
            <p><strong>Why Airtightness Matters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy efficiency:</strong> Uncontrolled air leakage can account for 30-50% of heat loss</li>
              <li><strong>Thermal comfort:</strong> Draughts cause cold spots and discomfort</li>
              <li><strong>Moisture control:</strong> Air leakage can transport moisture into building fabric causing condensation</li>
              <li><strong>MVHR performance:</strong> Mechanical ventilation requires airtight envelope to function correctly</li>
              <li><strong>Acoustic performance:</strong> Air paths also transmit sound</li>
            </ul>
            <p><strong>Design principle:</strong> The design air permeability used in SAP/SBEM calculations must be achieved on site - unrealistic targets lead to compliance issues at completion.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Blower Door Testing Methodology">
            <p>Blower door testing is the standard method for measuring building air permeability. A calibrated fan is temporarily installed in an external door opening to pressurise or depressurise the building, and the airflow required to maintain the pressure difference is measured.</p>
            <p><strong>Equipment</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calibrated fan unit</li>
              <li>Adjustable door panel/frame</li>
              <li>Digital manometer</li>
              <li>Flow measurement rings</li>
              <li>Data logging software</li>
            </ul>
            <p><strong>Building Preparation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Close all windows/doors</li>
              <li>Seal intended openings</li>
              <li>Close trickle vents</li>
              <li>Seal drainage traps</li>
              <li>Turn off combustion appliances</li>
            </ul>
            <p><strong>Test Procedure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measure zero-flow baseline</li>
              <li>Pressurise/depressurise</li>
              <li>Multiple pressure stages</li>
              <li>Record flow at each stage</li>
              <li>Calculate q50 result</li>
            </ul>
            <p><strong>Test Procedure Steps</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Preparation:</strong> Building survey, seal openings, record conditions — Ensure test validity and repeatability</li>
              <li><strong>2. Equipment setup:</strong> Install fan in door, connect manometer — Create controlled pressure boundary</li>
              <li><strong>3. Baseline reading:</strong> Measure natural pressure difference (fan off) — Account for wind/stack effects</li>
              <li><strong>4. Pressurisation:</strong> Fan blows air in, readings at 10-60Pa increments — Establish flow/pressure relationship</li>
              <li><strong>5. Depressurisation:</strong> Fan extracts air, readings at same increments — Verify results, identify one-way leaks</li>
              <li><strong>6. Calculation:</strong> Average pressurisation and depressurisation — Determine q50 air permeability result</li>
            </ul>
            <p><strong>Leak Detection During Testing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Smoke pencils:</strong> Handheld smoke generators show air movement at leakage points</li>
              <li><strong>Theatrical smoke:</strong> Fill depressurised building, watch where smoke exits</li>
              <li><strong>Thermal imaging:</strong> Cold air infiltration shows as temperature differences</li>
              <li><strong>Anemometer:</strong> Measure air velocity at suspected leakage points</li>
            </ul>
            <p><strong>Best practice:</strong> Conduct both pressurisation and depressurisation tests - the average provides the most representative result and differences can indicate one-way leakage paths.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="ATTMA Testing Procedures and Certification">
            <p>The Air Tightness Testing & Measurement Association (ATTMA) sets the technical standards for air permeability testing in the UK. ATTMA certification ensures testers are competent, use calibrated equipment, and follow standardised procedures acceptable to Building Control.</p>
            <p><strong>ATTMA Technical Standards</strong></p>
            <p><strong>TSL1 - Dwellings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Whole dwelling testing</li>
              <li>Minimum 50Pa test pressure</li>
              <li>Results in m³/h.m² @ 50Pa</li>
              <li>Envelope area calculation</li>
            </ul>
            <p><strong>TSL2 - Non-Domestic</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Whole building or zone testing</li>
              <li>Representative sample options</li>
              <li>Results in m³/h.m² @ 50Pa</li>
              <li>Floor area index option</li>
            </ul>
            <p><strong>ATTMA Certification Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Tester certification:</strong> Individual testers must pass ATTMA examination and maintain competence</li>
              <li><strong>Equipment calibration:</strong> Fan units and manometers must have current calibration certificates</li>
              <li><strong>Lodgement:</strong> Test results must be lodged on ATTMA register within 5 working days</li>
              <li><strong>Quality assurance:</strong> Random audits of tests by ATTMA technical committee</li>
              <li><strong>Insurance:</strong> Testers must hold appropriate professional indemnity insurance</li>
            </ul>
            <p><strong>Test Certificate Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Property identification:</strong> Full address, UPRN, plot number (if applicable)</li>
              <li><strong>Test details:</strong> Date, time, weather conditions, internal/external temperatures</li>
              <li><strong>Building data:</strong> Envelope area, internal volume, floor area</li>
              <li><strong>Equipment:</strong> Fan serial number, calibration certificate reference</li>
              <li><strong>Results:</strong> q50 value, n50 value, uncertainty, pass/fail against target</li>
              <li><strong>Certification:</strong> Tester name, ATTMA number, signature, lodgement reference</li>
            </ul>
            <p><strong>Sample Testing for Large Developments</strong></p>
            <p>For developments of multiple similar dwellings, sample testing may be acceptable:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum 3 units or 50% of units (whichever is greater) for small developments</li>
              <li>Representative sample of each dwelling type and construction method</li>
              <li>Include end-terrace, mid-terrace, and different floor levels</li>
              <li>First test must pass before sample approach is accepted</li>
              <li>If any sample fails, 100% testing may be required</li>
            </ul>
            <p><strong>Compliance note:</strong> Building Control will only accept test certificates from ATTMA-registered testers lodged on the ATTMA register - informal tests have no regulatory standing.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Achieving Targets and MEP Coordination">
            <p>Achieving design air permeability targets requires coordinated effort across all trades throughout construction. For building services engineers, understanding common leakage paths and sealing requirements for MEP penetrations is essential for maintaining air barrier integrity.</p>
            <p><strong>Common Air Leakage Paths</strong></p>
            <p><strong>Structural Junctions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wall to floor junctions</li>
              <li>Wall to ceiling junctions</li>
              <li>Wall to roof connections</li>
              <li>Foundation/slab perimeters</li>
              <li>Party wall junctions</li>
              <li>Window and door frames</li>
            </ul>
            <p><strong>Service Penetrations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Electrical cables and back boxes</li>
              <li>Plumbing pipes (water, waste, gas)</li>
              <li>HVAC ductwork and pipework</li>
              <li>Flues and chimneys</li>
              <li>Data and communications cables</li>
              <li>Extract fan penetrations</li>
            </ul>
            <p><strong>MEP Sealing Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Electrical back boxes:</strong> Airtight back boxes or membrane seals — Multiple cable entries need individual sealing</li>
              <li><strong>Cable penetrations:</strong> Proprietary grommets or mastic sealant — Size grommets to match cable diameter</li>
              <li><strong>Pipe penetrations:</strong> Pipe collars, sleeves with internal seal — Allow for thermal movement on hot pipes</li>
              <li><strong>Ductwork penetrations:</strong> Airtight grilles, sealed sleeves — Coordinate fire damper requirements</li>
              <li><strong>Service risers:</strong> Fire-rated sealant with airtight properties — Combine fire stopping and air sealing</li>
              <li><strong>Recessed lighting:</strong> Airtight downlight covers or IC-rated fittings — Maintain ventilation for non-IC fittings</li>
            </ul>
            <p><strong>Construction Stage Coordination</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design:</strong> Define air barrier line, specify sealing details — Coordinate penetration locations, specify airtight products</li>
              <li><strong>First fix:</strong> Install air barrier, make penetrations — Complete all penetrations before air barrier closes</li>
              <li><strong>Air barrier complete:</strong> Pre-test before finishes, identify issues — Seal all service penetrations, inspect work</li>
              <li><strong>Second fix:</strong> Maintain air barrier during fitting out — No new penetrations through air barrier</li>
              <li><strong>Completion:</strong> Final ATTMA test for compliance — Support leak detection, remedial sealing if needed</li>
            </ul>
            <p><strong>Best Practice: Airtightness Champion</strong></p>
            <p>Appoint an airtightness champion or coordinator with responsibility to:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Brief all trades on airtightness requirements and their role</li>
              <li>Conduct regular inspections of air barrier installation and sealing</li>
              <li>Coordinate MEP penetrations with air barrier installation timing</li>
              <li>Organise pre-testing at appropriate construction stages</li>
              <li>Document issues and ensure remedial action is taken</li>
              <li>Liaise with ATTMA tester for final compliance testing</li>
            </ul>
            <p><strong>Critical coordination:</strong> MEP services that penetrate the air barrier after it is sealed - or that are installed without proper sealing - are the leading cause of air permeability test failures on otherwise well-constructed buildings.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Calculating Air Permeability Result</strong>
            </p>
            <p><strong>Scenario:</strong> A detached dwelling with envelope area 320 m² tested at 50Pa shows air leakage rate of 1,280 m³/h.</p>
            <p>Given:</p>
            <p>Air leakage rate (Q50) = 1,280 m³/h</p>
            <p>Envelope area = 320 m²</p>
            <p>Air permeability calculation:</p>
            <p>q50 = Q50 / Envelope area</p>
            <p>q50 = 1,280 / 320</p>
            <p>q50 = 4.0 m³/h.m² @ 50Pa</p>
            <p>Assessment:</p>
            <p>Part L limit: 8.0 m³/h.m² @ 50Pa</p>
            <p>Result: PASS (4.0 &lt; 8.0)</p>
            <p>This is a good result for standard construction</p>
            <p>
              <strong>Example 2: Air Changes Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Same dwelling with internal volume 480 m³. Calculate n50 air changes.</p>
            <p>Given:</p>
            <p>Air leakage rate (Q50) = 1,280 m³/h</p>
            <p>Internal volume = 480 m³</p>
            <p>Air changes calculation:</p>
            <p>n50 = Q50 / Internal volume</p>
            <p>n50 = 1,280 / 480</p>
            <p>n50 = 2.67 ACH @ 50Pa</p>
            <p>Comparison:</p>
            <p>Passivhaus standard: ~0.6 ACH @ 50Pa</p>
            <p>Good UK new build: 2-4 ACH @ 50Pa</p>
            <p>Average existing: 10-15 ACH @ 50Pa</p>
            <p>
              <strong>Example 3: Failed Test Response</strong>
            </p>
            <p><strong>Scenario:</strong> Pre-test shows 6.5 m³/h.m² @ 50Pa against design target of 5.0 m³/h.m². Identify remediation approach.</p>
            <p>Assessment:</p>
            <p>Result: 6.5 m³/h.m² @ 50Pa</p>
            <p>Target: 5.0 m³/h.m² @ 50Pa</p>
            <p>Shortfall: 1.5 m³/h.m² (30% above target)</p>
            <p>Leak detection process:</p>
            <p>1. Depressurise building to -50Pa</p>
            <p>2. Systematic smoke pencil survey</p>
            <p>3. Check all service penetrations</p>
            <p>4. Inspect window/door seals</p>
            <p>5. Examine wall/floor junctions</p>
            <p>Findings:</p>
            <p>- 12 unsealed electrical back boxes</p>
            <p>- Plumbing penetrations to bathroom</p>
            <p>- Kitchen extract duct not sealed</p>
            <p>Remediation:</p>
            <p>1. Install airtight back box seals</p>
            <p>2. Seal pipe penetrations with mastic</p>
            <p>3. Seal duct penetration with collar</p>
            <p>Re-test result: 4.2 m³/h.m² @ 50Pa - PASS</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Air Permeability Testing Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm design air permeability target from SAP/SBEM calculations</li>
              <li>Identify air barrier line on drawings - understand what is inside/outside</li>
              <li>Schedule pre-test after air barrier complete, before finishes</li>
              <li>Ensure all MEP penetrations are complete before pre-test</li>
              <li>Arrange ATTMA-certified tester with adequate notice</li>
              <li>Prepare building - close openings, seal traps, weather conditions suitable</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Part L limit (dwellings): <strong>8 m³/h.m² @ 50Pa</strong></li>
              <li>Typical design target: <strong>3-5 m³/h.m² @ 50Pa</strong></li>
              <li>Passivhaus standard: <strong>~0.6 ACH (n50)</strong></li>
              <li>Test pressure: <strong>50 Pascals</strong></li>
              <li>ATTMA lodgement: <strong>Within 5 working days</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Late MEP installation</strong> - penetrating sealed air barrier causes failures</li>
                <li><strong>No pre-testing</strong> - discovering issues after finishes is costly</li>
                <li><strong>Incorrect sealing products</strong> - decorator's caulk is not an air sealant</li>
                <li><strong>Unrealistic design targets</strong> - over-optimistic values cause compliance issues</li>
                <li><strong>Unclear responsibility</strong> - airtightness falls between trades without coordination</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="MVHR commissioning at 4.2 m³/h·m² — high CO₂ in bedrooms"
            situation={
              <>
                A four-bed detached achieves an air permeability of 4.2 m³/h·m² — excellent for SAP. MVHR is installed but CO₂ monitoring during the first six weeks of occupation shows bedroom CO₂ peaking at 1,800 ppm overnight (target ≤1,000 ppm). The homeowner reports stuffiness and condensation on bedroom windows.
              </>
            }
            whatToDo={
              <>
                Commissioning issue, not fabric failure. Verify: (1) MVHR commissioned to BPEC standards with measured air-flow rates per terminal matching the design schedule; (2) duct routes are not crushed or kinked; (3) supply terminals in bedrooms are not blocked by furniture; (4) boost mode is functional and used appropriately. If commissioned correctly and still failing, increase the design supply rate or step up to an MVHR with higher-capacity boost mode. Part F compliance is the responsibility of the M&E designer regardless of fabric performance.
              </>
            }
            whyItMatters={
              <>
                Tight fabric without working ventilation is a health hazard. Indoor air pollutants, moisture and CO₂ accumulate, leading to mould, occupant complaints and warranty claims. Part L and Part F must be designed and commissioned together — neither stands alone.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Test method: blower door at 50 Pa, ATTMA TSL1 (dwellings) or TSL2 (non-dom).",
              "Limiting value: 8 m³/h·m² for new dwellings — anything above fails Part L.",
              "Notional value: 5 m³/h·m² (design target with safety margin).",
              "Below 5: MVHR is essentially mandatory to meet Part F.",
              "Below 3: enhanced ventilation strategy + indoor air quality monitoring strongly recommended.",
              "Commission MVHR per BPEC standards — measured flow per terminal, not just system fan speed.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fabric performance
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Building services compliance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section1_4;
