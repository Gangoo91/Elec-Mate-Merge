/**
 * Module 6 · Section 1 · Subsection 1 — Introduction to Part L
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Part L structure, 2021 amendments, conservation of fuel and power, compliance routes, and building types
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

const TITLE = 'Introduction to Part L - HNC Module 6 Section 1.1';
const DESCRIPTION =
  'Master Part L of the Building Regulations: 2021 amendments, conservation of fuel and power, compliance routes (SBEM, SAP), building types, fabric and services standards for building services engineers.';

const quickCheckQuestions = [
  {
    id: 'part-l-purpose',
    question: 'What is the primary purpose of Part L of the Building Regulations?',
    options: [
      'Fire safety in buildings',
      'Structural stability',
      'Conservation of fuel and power',
      'Ventilation requirements',
    ],
    correctIndex: 2,
    explanation:
      'Part L of the Building Regulations specifically addresses the conservation of fuel and power, setting requirements to limit heat gains and losses through building fabric and services to reduce carbon emissions.',
  },
  {
    id: 'part-l-2021-uplift',
    question:
      'By approximately how much did the 2021 Part L amendments reduce CO₂ targets for new dwellings compared to Part L 2013?',
    options: [
      '75%',
      '15%',
      '31%',
      '50%',
    ],
    correctIndex: 2,
    explanation:
      'The Part L 2021 amendments introduced a 31% reduction in CO₂ emissions for new dwellings compared to Part L 2013, representing a significant step towards the Future Homes Standard.',
  },
  {
    id: 'compliance-method',
    question:
      'Which compliance calculation method is used for new domestic buildings under Part L?',
    options: [
      'SAP',
      'SBEM',
      'CIBSE TM54',
      'BREEAM',
    ],
    correctIndex: 0,
    explanation:
      "SAP (Standard Assessment Procedure) is the government's methodology for assessing the energy performance of dwellings. SBEM is used for non-domestic buildings.",
  },
  {
    id: 'building-types',
    question: 'Part L is divided into different volumes. Part L1 applies to:',
    options: [
      'Non-domestic buildings only',
      'Dwellings',
      'Extensions only',
      'Historic buildings only',
    ],
    correctIndex: 1,
    explanation:
      'Part L is split into Part L1 (dwellings) and Part L2 (buildings other than dwellings). Each has separate compliance requirements and calculation methodologies.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the notional building approach in Part L compliance?',
    options: [
      'A simplified single-zone model that ignores the building shape',
      'A reference building with the same geometry but compliant specifications',
      'An identical existing building used as a real-world benchmark',
      'A theoretical building with no services, used to test the fabric alone',
    ],
    correctAnswer: 1,
    explanation:
      "The notional building is a reference building with the same size, shape, and usage as the actual building but with specifications that just meet the regulations. The actual building's performance is compared against this notional building.",
  },
  {
    id: 2,
    question: "What does the term 'primary energy' mean in Part L context?",
    options: [
      'Energy from renewable sources only',
      'Energy used only for heating',
      'Energy content of fuel before conversion losses',
      'Energy measured at the meter',
    ],
    correctAnswer: 2,
    explanation:
      'Primary energy accounts for the full energy cost of fuel, including extraction, processing, and distribution losses. It gives a more complete picture of environmental impact than delivered energy alone.',
  },
  {
    id: 3,
    question: 'Which of the following is a key metric introduced in Part L 2021?',
    options: [
      'Building Performance Index',
      'Energy Use Intensity (EUI)',
      'Thermal Efficiency Rating',
      'Primary Energy Rate',
    ],
    correctAnswer: 3,
    explanation:
      'Part L 2021 introduced the Primary Energy Rate alongside CO₂ emission rate (TER/DER or BER) as key compliance metrics, providing a more comprehensive view of building energy performance.',
  },
  {
    id: 4,
    question: 'For existing buildings, Part L applies when:',
    options: [
      'Controlled fittings or services are replaced or work exceeds defined thresholds',
      'The building changes ownership, regardless of any building work',
      'Any redecoration or like-for-like repair is carried out',
      'Only when the entire building is demolished and rebuilt',
    ],
    correctAnswer: 0,
    explanation:
      'Part L applies to existing buildings when controlled fittings (windows, boilers) are replaced, when extensions are built, or when renovation work affects more than 25% of the thermal envelope.',
  },
  {
    id: 5,
    question: 'What is the maximum U-value for walls in new dwellings under Part L 2021?',
    options: [
      '0.18 W/m²K',
      '0.26 W/m²K',
      '0.45 W/m²K',
      '0.35 W/m²K',
    ],
    correctAnswer: 1,
    explanation:
      'Part L 2021 sets a limiting U-value of 0.26 W/m²K for external walls in new dwellings. The notional dwelling uses 0.18 W/m²K, but the actual design can trade off between elements.',
  },
  {
    id: 6,
    question: 'SBEM stands for:',
    options: [
      'Standard Building Energy Model',
      'Sustainable Building Efficiency Measure',
      'Simplified Building Energy Model',
      'System-Based Energy Methodology',
    ],
    correctAnswer: 2,
    explanation:
      "SBEM (Simplified Building Energy Model) is the government's tool for demonstrating Part L compliance in non-domestic buildings. It calculates energy use and CO₂ emissions.",
  },
  {
    id: 7,
    question:
      'What is the air permeability target for a dwelling in the notional building under Part L 2021?',
    options: [
      '10 m³/(h·m²) at 50 Pa',
      '8 m³/(h·m²) at 50 Pa',
      '3 m³/(h·m²) at 50 Pa',
      '5 m³/(h·m²) at 50 Pa',
    ],
    correctAnswer: 3,
    explanation:
      'The Part L 2021 notional dwelling assumes an air permeability of 5 m³/(h·m²) at 50 Pa. Lower air permeability improves energy performance but requires adequate ventilation provision.',
  },
  {
    id: 8,
    question:
      'Which Part of the Building Regulations works closely with Part L to address ventilation?',
    options: [
      'Part F',
      'Part M',
      'Part A',
      'Part B',
    ],
    correctAnswer: 0,
    explanation:
      'Part F (Ventilation) works in conjunction with Part L. As buildings become more airtight for energy efficiency, adequate ventilation becomes critical for indoor air quality and moisture control.',
  },
  {
    id: 9,
    question: "The 'fabric first' approach in Part L means:",
    options: [
      'Installing renewable technologies before improving the building fabric',
      'Prioritising building envelope performance before adding complex systems',
      'Using only natural fabric materials such as timber and wool insulation',
      'Completing the internal finishes before the structure is weather-tight',
    ],
    correctAnswer: 1,
    explanation:
      'Fabric first prioritises excellent insulation, airtightness, and thermal bridging performance before relying on mechanical systems or renewables. This approach delivers long-term, reliable energy savings.',
  },
  {
    id: 10,
    question: 'What is a thermal bridge in building construction?',
    options: [
      'A connection between heating systems',
      'A gap in insulation that allows ventilation',
      'An area of higher heat transfer through the building envelope',
      'A method of transferring heat to adjacent buildings',
    ],
    correctAnswer: 2,
    explanation:
      'A thermal bridge (or cold bridge) is a localised area of the building envelope with higher heat flow, typically at junctions, around openings, or where insulation is penetrated. Part L requires thermal bridging to be minimised.',
  },
  {
    id: 11,
    question:
      'For a non-domestic building extension over 50m², Part L compliance is demonstrated by:',
    options: [
      'Meeting only the elemental U-value limits with no calculation required',
      'Matching the U-values of the existing building it is attached to',
      'A simple visual inspection by the building owner at completion',
      'Following the guidance for new buildings or consequential improvements',
    ],
    correctAnswer: 3,
    explanation:
      "Extensions over 50m² to non-domestic buildings must follow Part L2 guidance. Larger extensions may trigger consequential improvements to the existing building's energy systems.",
  },
  {
    id: 12,
    question: 'What is the significance of the Future Homes Standard in relation to Part L?',
    options: [
      'It sets targets for 2025 requiring homes to be zero-carbon ready',
      'It relaxes the 2021 fabric standards to reduce construction costs',
      'It replaces Part L entirely with a voluntary best-practice guide',
      'It applies only to historic and listed buildings being renovated',
    ],
    correctAnswer: 0,
    explanation:
      "The Future Homes Standard (planned for 2025) will require new homes to produce 75-80% less CO₂ than Part L 2013 standards. Part L 2021 is an interim step towards this, often called the 'Future Homes uplift'.",
  },
];

const faqs = [
  {
    question: "What's the difference between SAP and SBEM?",
    answer:
      'SAP (Standard Assessment Procedure) is used for domestic buildings and produces an energy rating (1-100+) and EPC. SBEM (Simplified Building Energy Model) is used for non-domestic buildings. Both calculate CO₂ emissions and primary energy but use different methodologies suited to their building types. SAP uses standardised occupancy patterns while SBEM allows more flexibility for varied non-domestic uses.',
  },
  {
    question: 'When do Part L requirements apply to existing buildings?',
    answer:
      "Part L applies to existing buildings when: (1) Controlled services/fittings are replaced (e.g., boilers, windows, lighting); (2) An extension is built; (3) A material change of use occurs; (4) Renovation affects more than 25% of the thermal envelope; (5) Consequential improvements are triggered by work over certain thresholds. Simple like-for-like repairs don't trigger Part L requirements.",
  },
  {
    question: 'How do I demonstrate Part L compliance for electrical installations?',
    answer:
      'Electrical installations contribute to Part L compliance through: (1) Lighting efficacy - minimum 45 luminaire-lumens per circuit-watt in non-domestic buildings; (2) Lighting controls - daylight dimming, presence detection, time scheduling; (3) Electric heating system efficiency; (4) Building automation and controls; (5) Metering provisions for sub-metering in larger buildings. These are assessed within the SBEM or SAP calculation.',
  },
  {
    question: 'What are consequential improvements under Part L?',
    answer:
      'Consequential improvements are energy efficiency upgrades required when certain works are carried out on existing buildings over 1000m². If works exceed defined thresholds (adding floor area, increasing installed capacity, replacing thermal elements), the building owner must improve other building services or fabric to achieve a reasonable payback. This typically affects lighting, HVAC controls, and insulation.',
  },
  {
    question: 'Can I trade off between fabric and services under Part L?',
    answer:
      'Yes, within limits. The actual building is compared against a notional building, allowing flexibility. For example, better-than-notional glazing U-values could compensate for slightly less efficient heating. However, there are absolute limiting values (backstops) that cannot be exceeded regardless of trade-offs. The fabric first approach is still recommended for long-term performance.',
  },
  {
    question: 'What documentation is required for Part L compliance?',
    answer:
      'Required documentation includes: (1) Design stage calculations (SAP/SBEM) showing predicted performance; (2) As-built calculations confirming actual construction; (3) Commissioning certificates for heating, ventilation, lighting controls; (4) Air permeability test results; (5) EPC (Energy Performance Certificate); (6) Building log book for non-domestic buildings; (7) Evidence of products meeting specifications (U-values, efficiency ratings).',
  },
];

const HNCModule6Section1_1 = () => {
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
            eyebrow="Module 6 · Section 1 · Subsection 1"
            title="Introduction to Part L"
            description="Part L structure, 2021 amendments, conservation of fuel and power, compliance routes, and building types"
            tone="purple"
          />

          <TLDR
            points={[
              "Part L of the Building Regulations governs the conservation of fuel and power; the 2021 amendments cut new-dwelling CO₂ targets by 31% as the stepping-stone to the 2025 Future Homes Standard.",
              "Compliance is demonstrated against a notional building using SAP (dwellings) or SBEM (non-domestic) — the actual building must beat the target emission and primary energy rates while staying within limiting U-values.",
              "Part L is fabric-first by design: services efficiency cannot offset poor envelope performance, and Part L works in lock-step with Part F (ventilation), Part O (overheating) and Part S (EV charging).",
            ]}
          />

          <RegsCallout
            source="The Building Regulations 2010 — Part L (Conservation of fuel and power)"
            clause="Reasonable provision shall be made for the conservation of fuel and power in buildings by limiting heat gains and losses through thermal elements and other parts of the building fabric, and from pipes, ducts and vessels used for space heating, space cooling and hot water; by providing fixed building services which are energy efficient, have effective controls, and are commissioned to meet the requirements of the Approved Document."
            meaning={
              <>
                Part L is a reasonable-provision regulation enforced through the Approved Documents (ADL Volumes 1 and 2). Building Control will not issue completion until SAP/SBEM as-built calculations, commissioning certificates, the air-permeability test result and the EPC are all on file. Get the design SAP wrong at planning and the whole project sequence is at risk.
              </>
            }
            cite="Source: Schedule 1, The Building Regulations 2010 (as amended) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the structure and purpose of Part L of the Building Regulations",
              "Describe the 2021 amendments and their impact on building design",
              "Compare compliance routes: SAP, SBEM, and notional building method",
              "Apply Part L requirements to different building types and situations",
              "Understand fabric standards, U-values, and thermal bridging",
              "Integrate Part L with other regulations (Part F, Part O)",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Part L Overview and Structure">
            <p>Part L of the Building Regulations sets the requirements for the conservation of fuel and power in buildings. It establishes minimum standards for thermal performance, building services efficiency, and overall energy consumption to reduce CO₂ emissions and combat climate change.</p>
            <p><strong>Part L Document Structure:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Approved Document L Volume 1:</strong> Dwellings (new and existing)</li>
              <li><strong>Approved Document L Volume 2:</strong> Buildings other than dwellings (non-domestic)</li>
              <li><strong>Conservation of Fuel and Power:</strong> Common guidance applicable to all buildings</li>
            </ul>
            <p><strong>Part L Applies To</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>New dwellings:</strong> New construction — Volume 1</li>
              <li><strong>Existing dwellings:</strong> Extensions, replacements, renovations — Volume 1</li>
              <li><strong>New non-domestic:</strong> New construction — Volume 2</li>
              <li><strong>Existing non-domestic:</strong> Extensions, fit-out, system replacement — Volume 2</li>
              <li><strong>Mixed-use buildings:</strong> Relevant sections apply to each part — Both volumes</li>
            </ul>
            <p><strong>Key principle:</strong> Part L aims to reduce carbon emissions through fabric performance (insulation, airtightness) and efficient building services (heating, cooling, lighting, ventilation).</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Part L 2021 Amendments">
            <p>The Part L 2021 amendments (effective June 2022) represent a significant uplift in energy efficiency requirements, forming a stepping stone towards the Future Homes Standard (2025) and Future Buildings Standard. These changes substantially increase carbon reduction targets.</p>
            <p><strong>Dwellings (Part L1)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>31%</strong> CO₂ reduction vs 2013</li>
              <li>Primary Energy metric added</li>
              <li>Improved fabric standards</li>
              <li>Low carbon heating emphasis</li>
            </ul>
            <p><strong>Non-Domestic (Part L2)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>27%</strong> CO₂ reduction vs 2013</li>
              <li>Enhanced lighting requirements</li>
              <li>HVAC efficiency improvements</li>
              <li>Building automation standards</li>
            </ul>
            <p><strong>Key New Metrics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Primary Energy Rate (PER)</li>
              <li>Target Primary Energy Rate (TPER)</li>
              <li>Fabric Energy Efficiency (FEE)</li>
              <li>Target Fabric Energy Efficiency (TFEE)</li>
            </ul>
            <p><strong>Notional Building Fabric Standards (Part L 2021)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>External walls:</strong> 0.18 W/m²K — 0.26 W/m²K — 0.30 W/m²K</li>
              <li><strong>Roof:</strong> 0.11 W/m²K — 0.16 W/m²K — 0.20 W/m²K</li>
              <li><strong>Floor:</strong> 0.13 W/m²K — 0.18 W/m²K — 0.25 W/m²K</li>
              <li><strong>Windows:</strong> 1.2 W/m²K — 1.6 W/m²K — 2.0 W/m²K</li>
              <li><strong>Air permeability:</strong> 5 m³/(h·m²) — 8 m³/(h·m²) — 10 m³/(h·m²)</li>
            </ul>
            <p><strong>Future Homes Standard Pathway</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Part L 2013:</strong> Baseline standard</li>
              <li><strong>Part L 2021:</strong> 31% improvement (current)</li>
              <li><strong>Future Homes 2025:</strong> 75-80% improvement target</li>
              <li><strong>Net Zero 2050:</strong> All homes zero carbon ready</li>
            </ul>
            <p><strong>Industry impact:</strong> The 2021 changes drive adoption of heat pumps, improved insulation, and low carbon technologies as gas boilers can no longer meet the notional specification.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Compliance Routes and Calculation Methods">
            <p>Part L compliance is demonstrated through energy calculations that compare the proposed building against a notional building with compliant specifications. Different calculation methodologies apply to domestic and non-domestic buildings.</p>
            <p><strong>Compliance Calculation Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>SAP (Standard Assessment Procedure):</strong> Government methodology for dwellings - calculates DER (Dwelling Emission Rate) and DPER (Dwelling Primary Energy Rate)</li>
              <li><strong>SBEM (Simplified Building Energy Model):</strong> For non-domestic buildings - calculates BER (Building Emission Rate) and BPER (Building Primary Energy Rate)</li>
              <li><strong>DSM (Dynamic Simulation Modelling):</strong> Advanced modelling tools (IES, TAS) approved as alternatives to SBEM for complex buildings</li>
            </ul>
            <p><strong>Notional Building Approach</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Create notional building:</strong> Same geometry, size, orientation as actual — Like-for-like comparison</li>
              <li><strong>2. Apply notional specifications:</strong> Standard U-values, systems, efficiencies — Establishes target performance</li>
              <li><strong>3. Calculate target rates:</strong> TER/TPER (dwellings) or TER/TPER (non-dom) — Compliance threshold</li>
              <li><strong>4. Model actual building:</strong> With specified fabric and services — Predicted performance</li>
              <li><strong>5. Compare results:</strong> DER ≤ TER and DPER ≤ TPER — Pass/fail determination</li>
            </ul>
            <p><strong>Key Compliance Metrics</strong></p>
            <p><strong>Dwellings (SAP)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DER ≤ TER (CO₂ emissions)</li>
              <li>DPER ≤ TPER (Primary energy)</li>
              <li>DFEE ≤ TFEE (Fabric efficiency)</li>
              <li>Limiting U-values not exceeded</li>
            </ul>
            <p><strong>Non-Domestic (SBEM)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BER ≤ TER (CO₂ emissions)</li>
              <li>BPER ≤ TPER (Primary energy)</li>
              <li>Lighting efficacy ≥ 45 lm/cW</li>
              <li>HVAC efficiency standards met</li>
            </ul>
            <p><strong>Design flexibility:</strong> The notional building approach allows trade-offs between elements, enabling design innovation while ensuring overall performance targets are met.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Types and Part L Applications">
            <p>Part L requirements vary significantly depending on whether the building is new, existing, an extension, or undergoing renovation. Understanding which requirements apply is essential for compliance.</p>
            <p><strong>Requirements by Building Situation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>New build:</strong> Full compliance: fabric, services, renewables — Full SAP/SBEM</li>
              <li><strong>Extension ≤50m² (domestic):</strong> Meet limiting U-values, opening areas — Elemental approach</li>
              <li><strong>Extension &gt;50m² (domestic):</strong> As new build standards — SAP for extension</li>
              <li><strong>Replacement windows:</strong> Meet window U-value standards — Product certification</li>
              <li><strong>Boiler replacement:</strong> Meet efficiency requirements, controls — Product certification</li>
              <li><strong>Renovation (&gt;25% envelope):</strong> Upgrade thermal elements affected — Elemental U-values</li>
              <li><strong>Change of use:</strong> Upgrade to current standards where practical — Depends on situation</li>
            </ul>
            <p><strong>New Build Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full SAP/SBEM calculation</li>
              <li>Air permeability testing</li>
              <li>Commissioning certificates</li>
              <li>As-built SAP/EPC</li>
              <li>Photo evidence of insulation</li>
              <li>Building log book (non-domestic)</li>
            </ul>
            <p><strong>Existing Building Triggers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Controlled fittings replacement</li>
              <li>Controlled services installation</li>
              <li>Extensions and conservatories</li>
              <li>Material change of use</li>
              <li>Major renovation (&gt;25% envelope)</li>
              <li>Consequential improvements</li>
            </ul>
            <p><strong>Consequential Improvements (Non-Domestic &gt;1000m²)</strong></p>
            <p><strong>Trigger threshold:</strong> Work to existing buildings exceeding £50,000 or providing new/additional fixed services</p>
            <p><strong>Improvement requirement:</strong> Energy efficiency measures with simple payback ≤15 years</p>
            <p><strong>Value cap:</strong> Improvements up to 10% of principal works value</p>
            <p><strong>Typical measures:</strong> Lighting upgrades, HVAC controls, insulation improvements, BMS optimisation</p>
            <p><strong>Integration with Other Building Regulations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Part F (Ventilation):</strong> Airtight buildings require adequate ventilation - MVHR often needed</li>
              <li><strong>Part O (Overheating):</strong> New 2022 regulation limiting overheating risk in residential buildings</li>
              <li><strong>Part S (EV Charging):</strong> Infrastructure requirements link to electrical design</li>
              <li><strong>Part P (Electrical):</strong> Electrical work must comply alongside Part L lighting requirements</li>
            </ul>
            <p><strong>MEP coordination:</strong> Building services engineers must coordinate Part L compliance with architectural fabric design, ensuring systems are sized for the reduced heating loads of well-insulated buildings.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: New Dwelling SAP Compliance Check</strong>
            </p>
            <p><strong>Scenario:</strong> Verify Part L compliance for a new 3-bedroom semi-detached house.</p>
            <p>Given specifications:</p>
            <p>Walls: U-value = 0.18 W/m²K</p>
            <p>Roof: U-value = 0.12 W/m²K</p>
            <p>Floor: U-value = 0.13 W/m²K</p>
            <p>Windows: U-value = 1.2 W/m²K (triple glazed)</p>
            <p>Air permeability: 4 m³/(h·m²) at 50 Pa</p>
            <p>Heating: Air source heat pump (SCOP 3.5)</p>
            <p>Ventilation: MVHR (85% efficiency)</p>
            <p>SAP calculation results:</p>
            <p>TER (Target Emission Rate) = 12.5 kg CO₂/m²/year</p>
            <p>DER (Dwelling Emission Rate) = 9.8 kg CO₂/m²/year</p>
            <p>TPER (Target Primary Energy Rate) = 95 kWh/m²/year</p>
            <p>DPER (Dwelling Primary Energy Rate) = 78 kWh/m²/year</p>
            <p>Compliance check:</p>
            <p>DER (9.8) ≤ TER (12.5) ✓ PASS</p>
            <p>DPER (78) ≤ TPER (95) ✓ PASS</p>
            <p>All U-values within limiting values ✓</p>
            <p>Result: Part L COMPLIANT</p>
            <p>
              <strong>Example 2: Non-Domestic Lighting Compliance</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate lighting efficacy for an office building to meet Part L2.</p>
            <p>Office lighting design:</p>
            <p>Total floor area: 500 m²</p>
            <p>Target illuminance: 500 lux (general office)</p>
            <p>Luminaire type: LED panels 40W each</p>
            <p>Luminaire output: 4,000 lumens each</p>
            <p>Quantity required: 60 luminaires</p>
            <p>Efficacy calculation:</p>
            <p>Total luminaire lumens = 60 × 4,000 = 240,000 lm</p>
            <p>Total circuit watts = 60 × 40W = 2,400 W</p>
            <p>Lighting efficacy = 240,000 ÷ 2,400</p>
            <p>= 100 luminaire-lumens per circuit-watt</p>
            <p>Part L2 requirement:</p>
            <p>Minimum efficacy = 45 lm/cW</p>
            <p>100 lm/cW &gt; 45 lm/cW ✓ PASS</p>
            <p>Additional controls required:</p>
            <p>- Daylight dimming (perimeter zones)</p>
            <p>- Presence/absence detection</p>
            <p>- Time scheduling capability</p>
            <p>
              <strong>Example 3: Extension Compliance Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Determine Part L requirements for a domestic kitchen extension.</p>
            <p>Extension details:</p>
            <p>Type: Single-storey rear extension</p>
            <p>Floor area: 35 m² (less than 50m² threshold)</p>
            <p>Use: Kitchen extension to existing dwelling</p>
            <p>Assessment:</p>
            <p>Extension &lt; 50m² → Simplified compliance route</p>
            <p>Requirements (elemental approach):</p>
            <p>Walls: U ≤ 0.28 W/m²K</p>
            <p>Roof: U ≤ 0.16 W/m²K</p>
            <p>Floor: U ≤ 0.22 W/m²K</p>
            <p>Windows: U ≤ 1.6 W/m²K</p>
            <p>Rooflights: U ≤ 2.2 W/m²K</p>
            <p>Glazed area ≤ 25% of floor area</p>
            <p>Opening area calculation:</p>
            <p>25% of 35m² = 8.75 m² max glazing</p>
            <p>Proposed: 2× bi-fold doors = 6m²</p>
            <p>6m² &lt; 8.75m² ✓ WITHIN LIMIT</p>
            <p>No SAP calculation required for extension</p>
            <p>Heating from existing system - check capacity</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Part L Compliance Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify building type and applicable Part L volume</li>
              <li>Determine if full calculation or elemental approach applies</li>
              <li>Commission SAP/SBEM calculations at design stage</li>
              <li>Verify all fabric U-values within limiting standards</li>
              <li>Specify compliant heating, ventilation, and lighting systems</li>
              <li>Arrange air permeability testing (new builds)</li>
              <li>Complete commissioning and obtain certificates</li>
              <li>Submit as-built calculations and EPC</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wall U-value limiting: <strong>0.26 W/m²K</strong> (dwellings)</li>
              <li>Air permeability target: <strong>5 m³/(h·m²)</strong> at 50 Pa</li>
              <li>Lighting efficacy: <strong>≥45 lm/cW</strong> (non-domestic)</li>
              <li>CO₂ reduction 2021 vs 2013: <strong>31%</strong> (dwellings)</li>
              <li>Extension threshold: <strong>50m²</strong> (simplified compliance)</li>
              <li>Renovation threshold: <strong>25%</strong> of thermal envelope</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring thermal bridging</strong> - Linear thermal bridges can significantly impact performance</li>
                <li><strong>Undersizing heating</strong> - Improved fabric reduces heat loss but systems must still meet peak demand</li>
                <li><strong>Missing commissioning</strong> - Systems must be commissioned and certificates provided</li>
                <li><strong>Design vs as-built gap</strong> - Construction quality must match design specifications</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Tenant fit-out trips Part L compliance late"
            situation={
              <>
                A Cat A office shell achieved Part L compliance under SBEM with notional lighting at 45 luminaire-lumens per circuit-watt and a heat-pump heating allowance. The incoming tenant takes the Cat B fit-out and installs a smaller, more decorative LED scheme that drops the average to 38 lm/cW, plus electric panel heaters for tea-points. Building Control flag the variation at handover.
              </>
            }
            whatToDo={
              <>
                Re-run the SBEM model with the as-installed lighting power density and heating mix. If BER now exceeds TER, propose offsets within the same envelope: enhanced lighting controls (presence + daylight dimming), HVAC scheduling improvements, or an upgrade of one tea-point to instantaneous low-load. Issue an updated EPC and as-built calculation pack before the building is occupied — Part L compliance is judged at handover, not at design.
              </>
            }
            whyItMatters={
              <>
                Part L non-compliance at completion is a Building Regulations breach that can delay occupation, void warranties and fall back on the M&E designer under CDM Reg 9. Tenant fit-outs are the single most common trigger — every variation to the lighting or HVAC specification needs an SBEM check, not just a coordination drawing.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Part L = conservation of fuel and power. Volume 1 = dwellings (SAP). Volume 2 = non-domestic (SBEM).",
              "Part L 2021 = 31% CO₂ uplift on dwellings, 27% on non-dom — Future Homes Standard 2025 will push to 75–80%.",
              "Notional building approach: model your design against a like-for-like building with notional specifications; DER ≤ TER and DPER ≤ TPER must both pass.",
              "Limiting U-values are absolute backstops — fabric/services trade-offs cannot exceed them.",
              "Existing buildings: Part L triggers on controlled fittings, extensions, change of use, >25% envelope renovation, and consequential improvements (>1000m², >£50k).",
              "Coordinate Part L with Parts F (ventilation), O (overheating), S (EV charging) and P (electrical) — they are designed as one regulatory package.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Building Regulations Part L
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                SBEM calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section1_1;
