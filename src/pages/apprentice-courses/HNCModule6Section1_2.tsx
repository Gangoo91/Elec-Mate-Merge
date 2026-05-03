/**
 * Module 6 · Section 1 · Subsection 2 — SBEM Calculations
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Simplified Building Energy Model, NCM methodology, inputs and outputs, and Part L compliance demonstration
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

const TITLE = 'SBEM Calculations - HNC Module 6 Section 1.2';
const DESCRIPTION =
  'Master SBEM calculations for building energy compliance: Simplified Building Energy Model, NCM methodology, inputs and outputs, BER vs TER comparison, and Part L compliance demonstration.';

const quickCheckQuestions = [
  {
    id: 'sbem-purpose',
    question: 'What is the primary purpose of SBEM software?',
    options: [
      'To design HVAC systems',
      'To calculate building energy performance and demonstrate Part L compliance',
      'To specify lighting levels',
      'To calculate electrical loads',
    ],
    correctIndex: 1,
    explanation:
      'SBEM (Simplified Building Energy Model) is the government-approved software tool used to calculate building energy performance and demonstrate compliance with Part L of the Building Regulations for non-domestic buildings.',
  },
  {
    id: 'ber-ter-definition',
    question: 'What does BER stand for in SBEM calculations?',
    options: [
      'Building Energy Requirement',
      'Building Emission Rate',
      'Basic Energy Rating',
      'Building Efficiency Ratio',
    ],
    correctIndex: 1,
    explanation:
      'BER stands for Building Emission Rate - the calculated CO₂ emission rate (kgCO₂/m²/year) for the actual proposed building design. This must be equal to or less than the TER (Target Emission Rate) to achieve compliance.',
  },
  {
    id: 'ncm-methodology',
    question: 'What does NCM stand for in building energy assessment?',
    options: [
      'National Calculation Methodology',
      'Non-domestic Carbon Model',
      'Numerical Compliance Method',
      'National Certification Model',
    ],
    correctIndex: 0,
    explanation:
      'NCM stands for National Calculation Methodology - the government-approved method for calculating the energy performance of non-domestic buildings. SBEM implements the NCM to produce compliance calculations.',
  },
  {
    id: 'compliance-demonstration',
    question: 'To demonstrate Part L compliance, the BER must be:',
    options: [
      'Greater than the TER',
      'Equal to or less than the TER',
      'Within 10% of the TER',
      'Exactly equal to the TER',
    ],
    correctIndex: 1,
    explanation:
      "For Part L compliance, the Building Emission Rate (BER) must be equal to or less than the Target Emission Rate (TER). The lower the BER compared to TER, the better the building's energy performance.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which type of building is SBEM primarily designed to assess?',
    options: [
      'Domestic dwellings',
      'Non-domestic buildings',
      'Industrial warehouses only',
      'Listed buildings',
    ],
    correctAnswer: 1,
    explanation:
      'SBEM is specifically designed for non-domestic buildings. Domestic dwellings use SAP (Standard Assessment Procedure) for energy calculations. SBEM can assess offices, schools, retail, healthcare and other non-residential buildings.',
  },
  {
    id: 2,
    question: 'What is the notional building used for in SBEM calculations?',
    options: [
      'To represent the actual design proposal',
      'To establish the Target Emission Rate (TER) as a compliance benchmark',
      'To calculate heating loads only',
      'To determine construction costs',
    ],
    correctAnswer: 1,
    explanation:
      "The notional building is a hypothetical reference building with the same size, shape and use as the proposed building, but with standardised specifications. It establishes the TER that the actual building's BER must meet or beat.",
  },
  {
    id: 3,
    question: 'Which of these is NOT a required geometric input for SBEM?',
    options: [
      'Zone floor areas',
      'External wall areas',
      'Window areas and orientation',
      'Furniture layouts',
    ],
    correctAnswer: 3,
    explanation:
      "SBEM requires building geometry data including zone areas, wall/roof/floor areas, glazing percentages and orientations. Furniture layouts are not relevant to the energy calculation as they don't affect building fabric or services performance.",
  },
  {
    id: 4,
    question: 'What unit is used to express U-values in SBEM inputs?',
    options: ['kW/m²K', 'W/m²K', 'W/mK', 'kJ/m²K'],
    correctAnswer: 1,
    explanation:
      'U-values are expressed in W/m²K (Watts per square metre per Kelvin). This measures the rate of heat transfer through a building element per unit area for a given temperature difference. Lower U-values indicate better insulation.',
  },
  {
    id: 5,
    question: 'In SBEM, what does Lighting Power Density (LPD) measure?',
    options: [
      'Total lighting energy consumption per year',
      'Installed lighting power per unit floor area (W/m²)',
      'Luminaire efficiency in lumens per watt',
      'Emergency lighting battery capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Lighting Power Density measures the installed lighting power per unit floor area, expressed in W/m². Lower LPD values indicate more efficient lighting design. Modern LED installations typically achieve 8-12 W/m² in offices.',
  },
  {
    id: 6,
    question:
      'What is the typical maximum acceptable air permeability for a new non-domestic building under Part L?',
    options: ['15 m³/h/m² @ 50Pa', '10 m³/h/m² @ 50Pa', '5 m³/h/m² @ 50Pa', '3 m³/h/m² @ 50Pa'],
    correctAnswer: 1,
    explanation:
      'Part L 2021 sets a maximum air permeability of 10 m³/h/m² at 50Pa for new non-domestic buildings. Better performing buildings often achieve 3-5 m³/h/m². Lower permeability reduces uncontrolled heat loss but requires adequate ventilation design.',
  },
  {
    id: 7,
    question: 'How does SBEM account for renewable energy contributions?',
    options: [
      'Renewables cannot be included in SBEM',
      'By reducing the calculated BER through on-site generation offset',
      'By increasing the TER to allow easier compliance',
      'Only solar thermal is permitted',
    ],
    correctAnswer: 1,
    explanation:
      "SBEM reduces the BER by accounting for on-site renewable energy generation such as PV, solar thermal, wind or biomass. The renewable contribution is subtracted from the building's calculated emissions to give the final BER.",
  },
  {
    id: 8,
    question: 'What information does SBEM require about HVAC systems?',
    options: [
      'Manufacturer brochures only',
      'System type, efficiency/COP, fuel type, and control strategy',
      'Just the heating capacity in kW',
      'Only the refrigerant type',
    ],
    correctAnswer: 1,
    explanation:
      'SBEM requires comprehensive HVAC data including system type (e.g., VRF, chiller, gas boiler), seasonal efficiencies or COPs, fuel type, distribution losses, and control strategies. This enables accurate calculation of heating and cooling energy use.',
  },
  {
    id: 9,
    question:
      'What is the purpose of the EPC (Energy Performance Certificate) generated from SBEM?',
    options: [
      'To prove electrical installation compliance',
      'To provide an energy rating and recommendations for the building',
      'To certify the structural design',
      'To approve the planning application',
    ],
    correctAnswer: 1,
    explanation:
      'The EPC provides a standardised energy rating (A-G scale) and recommendations for improving energy performance. It is a legal requirement for buildings when constructed, sold or let, and helps occupants understand running costs.',
  },
  {
    id: 10,
    question: 'When must SBEM calculations be submitted to Building Control?',
    options: [
      'Only at completion',
      'At design stage and as-built stage',
      'Only if the building fails compliance',
      'Every five years',
    ],
    correctAnswer: 1,
    explanation:
      'SBEM calculations are required at two stages: design stage (with Building Regulations application) to demonstrate intended compliance, and as-built stage (at completion) to confirm the constructed building meets the design performance.',
  },
  {
    id: 11,
    question: 'Which factor has the greatest impact on reducing BER in a typical office building?',
    options: [
      'Increasing wall thickness',
      'Improving HVAC efficiency and lighting power density',
      'Adding more windows',
      'Using heavier construction materials',
    ],
    correctAnswer: 1,
    explanation:
      'In offices, HVAC and lighting typically account for 60-70% of regulated energy use. Improving system efficiencies (higher COP chillers, efficient boilers) and reducing lighting power density through LED technology have the greatest impact on BER.',
  },
  {
    id: 12,
    question: 'What is the compliance margin in SBEM terminology?',
    options: [
      'The error tolerance in measurements',
      'The percentage by which BER is below TER',
      'The maximum building size that can be modelled',
      'The acceptable window-to-wall ratio',
    ],
    correctAnswer: 1,
    explanation:
      'Compliance margin is the percentage difference between BER and TER, expressed as (TER-BER)/TER × 100. A positive margin indicates the building exceeds minimum requirements. Larger margins provide contingency for as-built variations.',
  },
];

const faqs = [
  {
    question: "What's the difference between SBEM and DSM (Dynamic Simulation Model)?",
    answer:
      "SBEM is a simplified steady-state monthly calculation suitable for most non-domestic buildings and is free to use. DSM software (like IES-VE, TAS, or EnergyPlus) performs dynamic hourly simulations providing greater accuracy for complex buildings with unusual geometry, mixed-mode ventilation, or advanced control strategies. DSM is typically used for larger or more complex projects where SBEM's simplifications may not adequately represent building behaviour.",
  },
  {
    question: 'Can SBEM model all building types?',
    answer:
      'SBEM can model most standard non-domestic building types including offices, schools, retail, hotels, hospitals, and industrial buildings. However, some specialist buildings may require DSM, including those with swimming pools, data centres with high heat loads, buildings with complex atria, or those using innovative low-energy design strategies that SBEM cannot adequately represent.',
  },
  {
    question: "How do I improve a building's compliance margin?",
    answer:
      'Key strategies include: (1) Reduce fabric U-values below notional values, (2) Improve air tightness to 3-5 m³/h/m², (3) Specify high-efficiency HVAC with COPs above minimum standards, (4) Reduce lighting power density using LED technology, (5) Install building-mounted renewables like PV, (6) Optimise glazing ratios and solar control. The most cost-effective measures depend on building type and baseline design.',
  },
  {
    question: 'What happens if the as-built SBEM fails to match design stage?',
    answer:
      'If as-built performance differs significantly from design stage calculations, the building may fail to achieve compliance. Common causes include specification changes during construction, poor workmanship affecting air tightness, or equipment substitution. Remedial measures may be required, potentially including additional insulation, equipment upgrades, or renewable installations to achieve the required BER.',
  },
  {
    question: 'Who can submit SBEM calculations?',
    answer:
      'SBEM calculations for Building Regulations compliance must be produced by a competent person - typically an accredited energy assessor registered with an approved accreditation scheme. For Part L compliance, Non-Domestic Energy Assessors (NDEAs) certified by schemes like CIBSE, Elmhurst, or Stroma can produce and lodge the calculations on the national register.',
  },
  {
    question: 'How often is SBEM software updated?',
    answer:
      'SBEM is updated when Building Regulations change. The current version (SBEM v6.1) supports Part L 2021. Updates reflect changes to notional building specifications, emission factors, and calculation methodologies. Energy assessors must use the current approved version, and projects submitted under previous regulations may need recalculation if designs change significantly.',
  },
];

const HNCModule6Section1_2 = () => {
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
            eyebrow="Module 6 · Section 1 · Subsection 2"
            title="SBEM Calculations"
            description="Simplified Building Energy Model, NCM methodology, inputs and outputs, and Part L compliance demonstration"
            tone="purple"
          />

          <TLDR
            points={[
              "SBEM (Simplified Building Energy Model) is the National Calculation Methodology tool used to demonstrate Part L compliance for non-domestic buildings — comparing your actual BER and BPER against the notional TER and TPER.",
              "Inputs cover geometry, fabric U-values, HVAC efficiencies, lighting LENI, controls and renewables; outputs feed the EPC, the as-built compliance pack and the building log book.",
              "Dynamic Simulation Modelling (DSM) such as IES VE or TAS is an approved alternative for complex or naturally ventilated buildings where SBEM zoning rules become limiting.",
            ]}
          />

          <RegsCallout
            source="Approved Document L Volume 2 (Non-domestic buildings) — National Calculation Methodology"
            clause="The Building Emission Rate (BER) and Building Primary Energy Rate (BPER) of the actual building must be calculated using approved software implementing the National Calculation Methodology (SBEM or an approved Dynamic Simulation Model), and must be no greater than the Target Emission Rate (TER) and Target Primary Energy Rate (TPER) for the notional building of the same geometry, orientation and activity."
            meaning={
              <>
                The NCM is the sole approved route. Hand calculations or spreadsheet shortcuts are not accepted by Building Control. The accredited assessor must use approved software (iSBEM, EDSL TAS, IES VE etc.) and submit the design-stage and as-built outputs as part of the Part L evidence pack.
              </>
            }
            cite="Source: Approved Document L Volume 2: 2021 edition incorporating 2023 amendments — gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the purpose of SBEM and NCM methodology",
              "Identify required inputs for SBEM calculations",
              "Understand BER, TER and compliance margin concepts",
              "Describe building geometry and fabric inputs",
              "Specify HVAC and lighting inputs correctly",
              "Calculate renewable energy contributions to BER",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="SBEM Fundamentals and NCM Methodology">
            <p>The Simplified Building Energy Model (SBEM) is the government-approved software tool for calculating the energy performance of non-domestic buildings and demonstrating compliance with Part L of the Building Regulations. It implements the National Calculation Methodology (NCM) to produce standardised energy assessments.</p>
            <p><strong>Key SBEM concepts:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>NCM:</strong> National Calculation Methodology - the approved calculation framework</li>
              <li><strong>BER:</strong> Building Emission Rate - calculated CO₂ emissions for the actual building</li>
              <li><strong>TER:</strong> Target Emission Rate - benchmark from the notional building</li>
              <li><strong>Notional building:</strong> Reference building with standardised specifications</li>
            </ul>
            <p><strong>SBEM Calculation Process</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Geometry Input:</strong> Define zones, areas, orientations — Building thermal model</li>
              <li><strong>2. Fabric Specification:</strong> Enter U-values, thermal mass, air tightness — Heat loss calculations</li>
              <li><strong>3. Services Input:</strong> Define HVAC, lighting, hot water systems — System energy demands</li>
              <li><strong>4. Renewables:</strong> Add PV, solar thermal, other renewables — Energy offset calculation</li>
              <li><strong>5. Compliance Check:</strong> Compare BER against TER — Pass/fail and EPC rating</li>
            </ul>
            <p><strong>Compliance requirement:</strong> BER ≤ TER - the actual building's emissions must equal or be less than the notional building target.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Building Geometry and Fabric Inputs">
            <p>Accurate geometric and fabric data forms the foundation of SBEM calculations. The building is divided into thermal zones, each with defined areas, construction types, and environmental control requirements.</p>
            <p><strong>Geometric Inputs</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zone floor areas (m²)</li>
              <li>Zone heights</li>
              <li>External wall areas</li>
              <li>Window areas and orientation</li>
              <li>Roof and floor exposures</li>
            </ul>
            <p><strong>Fabric U-values</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External walls (W/m²K)</li>
              <li>Roof construction</li>
              <li>Ground floor</li>
              <li>Windows and doors</li>
              <li>Thermal bridging (psi values)</li>
            </ul>
            <p><strong>Air Tightness</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design air permeability</li>
              <li>Measured @ 50Pa</li>
              <li>Units: m³/h/m²</li>
              <li>Maximum: 10 m³/h/m²</li>
              <li>Best practice: 3-5 m³/h/m²</li>
            </ul>
            <p><strong>Part L 2021 Fabric Standards</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>External wall:</strong> 0.35 W/m²K — 0.26 W/m²K — 0.15-0.20 W/m²K</li>
              <li><strong>Flat roof:</strong> 0.25 W/m²K — 0.18 W/m²K — 0.10-0.15 W/m²K</li>
              <li><strong>Ground floor:</strong> 0.25 W/m²K — 0.18 W/m²K — 0.10-0.15 W/m²K</li>
              <li><strong>Windows:</strong> 1.60 W/m²K — 1.40 W/m²K — 0.80-1.20 W/m²K</li>
              <li><strong>Air permeability:</strong> 10 m³/h/m² — 5 m³/h/m² — 3 m³/h/m²</li>
            </ul>
            <p><strong>Zoning principle:</strong> Divide the building into zones with similar activity type, HVAC system, and solar exposure for accurate modelling.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Building Services Inputs">
            <p>Building services typically account for 60-80% of regulated energy use in non-domestic buildings. Accurate specification of HVAC, lighting, and hot water systems is critical to achieving realistic BER calculations and optimising compliance strategies.</p>
            <p><strong>HVAC System Inputs</strong></p>
            <p><span>System type:</span> Boiler, heat pump, VRF, chiller, etc.</p>
            <p><span>Heating efficiency:</span> Seasonal efficiency (%) or SCOP</p>
            <p><span>Cooling efficiency:</span> Seasonal EER or SEER</p>
            <p><span>Fuel type:</span> Natural gas, electricity, oil, biomass</p>
            <p><span>Distribution:</span> Pipework/ductwork losses, pump/fan powers</p>
            <p><span>Controls:</span> Weather compensation, optimum start, zoning</p>
            <p><strong>Lighting Inputs</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting Power Density (LPD):</strong> Installed watts per m² floor area</li>
              <li><strong>Lamp type:</strong> LED, T5 fluorescent, metal halide, etc.</li>
              <li><strong>Luminaire efficacy:</strong> Lumens per watt output</li>
              <li><strong>Controls:</strong> Manual, occupancy sensing, daylight dimming, time scheduling</li>
              <li><strong>Display lighting:</strong> Separate category for retail/exhibition</li>
            </ul>
            <p><strong>Typical Lighting Power Densities</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Office - general:</strong> 12 W/m² — 8-10 W/m² — 6-8 W/m²</li>
              <li><strong>Classroom:</strong> 14 W/m² — 10-12 W/m² — 8-10 W/m²</li>
              <li><strong>Retail - general:</strong> 18 W/m² — 12-15 W/m² — 10-12 W/m²</li>
              <li><strong>Circulation:</strong> 8 W/m² — 5-6 W/m² — 3-5 W/m²</li>
              <li><strong>Warehouse:</strong> 6 W/m² — 4-5 W/m² — 2-4 W/m²</li>
            </ul>
            <p><strong>HVAC Efficiency Standards</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Gas boiler:</strong> 91% gross — 95%+ condensing</li>
              <li><strong>Air source heat pump:</strong> SCOP 2.8 — SCOP 3.5-4.0</li>
              <li><strong>Ground source heat pump:</strong> SCOP 3.5 — SCOP 4.0-4.5</li>
              <li><strong>Air-cooled chiller:</strong> SEER 3.0 — SEER 4.0+</li>
              <li><strong>VRF system:</strong> SCOP 3.2 / SEER 4.5 — SCOP 4.0 / SEER 6.0</li>
            </ul>
            <p><strong>Services impact:</strong> In offices, HVAC and lighting typically account for 60-70% of regulated emissions - these are priority areas for BER reduction.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="BER, TER and Compliance Demonstration">
            <p>Part L compliance is demonstrated by comparing the Building Emission Rate (BER) against the Target Emission Rate (TER). The TER is derived from a notional building - a reference design with the same geometry but standardised fabric and services specifications.</p>
            <p><strong>Compliance Calculation</strong></p>
            <p><strong>Target Emission Rate (TER)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Same geometry as actual building</li>
              <li>Standardised U-values (notional)</li>
              <li>Standardised services efficiencies</li>
              <li>No renewables contribution</li>
              <li>Sets the compliance benchmark</li>
            </ul>
            <p><strong>Building Emission Rate (BER)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Actual proposed building design</li>
              <li>Specified U-values</li>
              <li>Specified services efficiencies</li>
              <li>Includes renewable contribution</li>
              <li>Must be ≤ TER for compliance</li>
            </ul>
            <p><strong>Compliance Margin Calculation</strong></p>
            <p>Compliance Margin (%) = (TER - BER) / TER × 100</p>
            <p>Example:</p>
            <p>TER = 25.5 kgCO₂/m²/year</p>
            <p>BER = 22.3 kgCO₂/m²/year</p>
            <p>Margin = (25.5 - 22.3) / 25.5 × 100 =  <span>12.5% improvement</span></p>
            <p><strong>Renewable Energy Contributions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Roof-mounted PV:</strong> kWp, orientation, tilt, shading — 5-15% BER reduction</li>
              <li><strong>Solar thermal (DHW):</strong> Collector area, storage volume — 2-5% BER reduction</li>
              <li><strong>Biomass boiler:</strong> Low carbon factor for fuel — 30-50% BER reduction</li>
              <li><strong>Wind turbine:</strong> Rated output, hub height — Variable by location</li>
              <li><strong>CHP (Combined Heat and Power):</strong> Electrical/thermal efficiency — 10-25% BER reduction</li>
            </ul>
            <p><strong>SBEM Output Documents</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BRUKL document:</strong> Building Regulations UK Part L - detailed compliance report</li>
              <li><strong>EPC:</strong> Energy Performance Certificate with A-G rating</li>
              <li><strong>Recommendations report:</strong> Improvement measures for building occupants</li>
              <li><strong>Input summary:</strong> Complete record of all calculation inputs</li>
            </ul>
            <p><strong>Design stage vs as-built:</strong> Initial calculations use design specifications; as-built calculations must reflect actual installed equipment and measured air tightness test results.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Office Building SBEM Input Summary</strong>
            </p>
            <p><strong>Scenario:</strong> 2,500m² open plan office, 3 storeys, gas heating with VRF cooling.</p>
            <p>Building Geometry:</p>
            <p>Total floor area: 2,500 m²</p>
            <p>External wall area: 1,200 m²</p>
            <p>Glazing ratio: 40% (480 m² windows)</p>
            <p>Roof area: 833 m² (flat)</p>
            <p>Fabric U-values:</p>
            <p>Walls: 0.22 W/m²K (below notional 0.26)</p>
            <p>Roof: 0.15 W/m²K (below notional 0.18)</p>
            <p>Windows: 1.2 W/m²K (below notional 1.4)</p>
            <p>Air permeability: 4 m³/h/m² @ 50Pa</p>
            <p>Services:</p>
            <p>Heating: Condensing gas boilers, 95% efficiency</p>
            <p>Cooling: VRF system, SEER 5.5</p>
            <p>Lighting: LED throughout, 8 W/m² average LPD</p>
            <p>Controls: BEMS with weather compensation</p>
            <p>Result: TER 28.2, BER 23.5 = 16.7% compliance margin</p>
            <p>
              <strong>Example 2: PV Contribution Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate PV system size needed to achieve 10% BER reduction.</p>
            <p>Given data:</p>
            <p>Building floor area: 2,500 m²</p>
            <p>Baseline BER: 26.0 kgCO₂/m²/year</p>
            <p>Target BER reduction: 10%</p>
            <p>Grid electricity factor: 0.136 kgCO₂/kWh</p>
            <p>PV yield (south, 30° tilt): 950 kWh/kWp/year</p>
            <p>Calculation:</p>
            <p>Required CO₂ offset = 26.0 × 0.10 = 2.6 kgCO₂/m²/year</p>
            <p>Total offset = 2.6 × 2,500 = 6,500 kgCO₂/year</p>
            <p>Electricity equivalent = 6,500 / 0.136 = 47,794 kWh/year</p>
            <p>PV capacity = 47,794 / 950 =  <span>50.3 kWp required</span></p>
            <p>Roof check:</p>
            <p>Approx. 6 m²/kWp → 302 m² roof area needed</p>
            <p>833 m² available - feasible installation</p>
            <p>
              <strong>Example 3: Lighting Impact Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Compare BER impact of fluorescent vs LED lighting in retail unit.</p>
            <p>Retail unit: 1,000 m², 3,000 operating hours/year</p>
            <p>Option A - T5 Fluorescent:</p>
            <p>LPD: 16 W/m²</p>
            <p>Annual energy: 16 × 1,000 × 3,000 = 48,000 kWh</p>
            <p>CO₂: 48,000 × 0.136 = 6,528 kgCO₂</p>
            <p>Per m²: 6.53 kgCO₂/m²/year</p>
            <p>Option B - LED with Controls:</p>
            <p>LPD: 10 W/m²</p>
            <p>Daylight dimming saving: 15%</p>
            <p>Effective hours: 3,000 × 0.85 = 2,550 hours</p>
            <p>Annual energy: 10 × 1,000 × 2,550 = 25,500 kWh</p>
            <p>CO₂: 25,500 × 0.136 = 3,468 kgCO₂</p>
            <p>Per m²: 3.47 kgCO₂/m²/year</p>
            <p>LED saving: 3.06 kgCO₂/m²/year (47% reduction)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>SBEM Submission Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete floor plans with zone boundaries marked</li>
              <li>U-value calculations or manufacturer data for all elements</li>
              <li>HVAC schematic with equipment specifications</li>
              <li>Lighting layout with luminaire schedule and LPD calculation</li>
              <li>Renewable system specifications and layouts</li>
              <li>Air tightness test results (as-built stage)</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Air permeability maximum: <strong>10 m³/h/m² @ 50Pa</strong></li>
              <li>Office lighting LPD benchmark: <strong>8-12 W/m²</strong></li>
              <li>Good heat pump SCOP: <strong>3.5-4.0</strong></li>
              <li>Grid electricity CO₂ factor: <strong>0.136 kgCO₂/kWh</strong> (2024)</li>
            </ul>
            <p>
              <strong>Common SBEM Errors to Avoid:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Incorrect zoning</strong> - zones must match activity type and HVAC systems</li>
              <li><strong>Missing thermal bridges</strong> - psi values significantly affect heat loss</li>
              <li><strong>Wrong activity database</strong> - use correct NCM activity for each zone</li>
              <li><strong>Optimistic air tightness</strong> - specify achievable values, not aspirational</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="SBEM zoning fails on an open-plan retail unit"
            situation={
              <>
                You are running the design-stage SBEM for a 4,800 m² retail unit. The architect is using one large open-plan zone but SBEM activity templates require separate zones for sales, back-of-house, and refrigerated areas. Your first pass shows BER comfortably under TER — but when you re-zone correctly, the refrigerated zone pulls the actual building into non-compliance.
              </>
            }
            whatToDo={
              <>
                Re-run with correct zoning per the NCM activity template (e.g. retail sales floor + cold storage + ancillary). If non-compliant, the design team must respond with reduced cooling demand (better envelope at the cold zone, door curtains, automatic closers) or upgraded refrigeration controls. Where SBEM zoning is genuinely too coarse for the design, switch to DSM (IES VE) which models air movement between zones rather than treating each as isolated.
              </>
            }
            whyItMatters={
              <>
                Wrong zoning is the most common SBEM error — and it nearly always makes the building look more compliant than it is. The design-stage SBEM goes to Building Control with the planning submission; getting it wrong means re-design, re-tender and programme slip when as-built reveals the gap.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "SBEM = simplified non-domestic energy model under the National Calculation Methodology (NCM).",
              "Outputs: BER, BPER, EPC band, building log book content, lighting LENI, HVAC SFP performance.",
              "Activity templates drive zoning — get them wrong and the result is meaningless.",
              "Approved software only: iSBEM (free), EDSL TAS, IES VE (DSM alternative).",
              "Design-stage SBEM goes with planning; as-built SBEM and EPC needed for Building Control completion.",
              "DSM is required for atria, naturally ventilated spaces, mixed-mode HVAC and complex geometry.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Introduction to Part L
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fabric performance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section1_2;
