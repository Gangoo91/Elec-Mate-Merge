/**
 * Module 6 · Section 3 · Subsection 3 — BREEAM Energy Category
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Energy performance (Ene 01), sub-metering (Ene 02), external lighting (Ene 03), and low carbon technologies (Ene 04)
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

const TITLE = 'BREEAM Energy Category - HNC Module 6 Section 3.3';
const DESCRIPTION =
  'Master BREEAM Energy category requirements: Ene 01 energy performance, EPR calculation, sub-metering (Ene 02), external lighting (Ene 03), low carbon technologies (Ene 04), energy modelling, and BRUKL compliance.';

const quickCheckQuestions = [
  {
    id: 'ene01-purpose',
    question: 'What is the primary purpose of BREEAM Ene 01?',
    options: [
      'They override normal operation to prevent life-threatening situations or equipment damage',
      'To reduce building CO2 emissions through improved energy performance beyond Building Regulations',
      'Holding the nozzle of a Class H vacuum close to the point of work to capture fibres as they are released',
      'Acting honestly, fairly, and transparently in professional relationships',
    ],
    correctIndex: 1,
    explanation:
      'Ene 01 rewards buildings that demonstrate improved energy performance beyond the minimum Building Regulations requirements, reducing operational CO2 emissions through the Energy Performance Ratio (EPR).',
  },
  {
    id: 'sub-metering',
    question: 'What does BREEAM Ene 02 require for sub-metering?',
    options: [
      'Patch panel arrangement allowing flexible connections between systems',
      'Following the guidance for new buildings or consequential improvements',
      'Analysing chemical composition of process streams',
      'Sub-metering of major energy-consuming systems and tenancy areas',
    ],
    correctIndex: 3,
    explanation:
      'Ene 02 requires sub-metering of major energy-consuming systems (HVAC, lighting, small power) and tenant/occupancy areas to enable energy monitoring, management, and identification of wasteful consumption.',
  },
  {
    id: 'external-lighting',
    question: 'What is the average lamp efficacy requirement for external lighting under Ene 03?',
    options: [
      '50 luminous lm/W',
      '70 luminous lm/W',
      '60 luminous lm/W',
      '80 luminous lm/W',
    ],
    correctIndex: 1,
    explanation:
      'Ene 03 requires external lighting to achieve an average initial luminous efficacy of at least 70 luminous lm/W across all external luminaires, promoting energy-efficient external lighting design.',
  },
  {
    id: 'low-carbon-tech',
    question:
      'Under Ene 04, what is the minimum percentage of building energy demand that must be met by low or zero carbon technologies to achieve credits?',
    options: [
      '10%',
      '15%',
      '20%',
      '5%',
    ],
    correctIndex: 0,
    explanation:
      'Ene 04 awards credits where low or zero carbon (LZC) technologies contribute at least 10% of the total energy demand or carbon emissions reduction, encouraging renewable and low carbon energy sources.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does EPR stand for in BREEAM energy assessment?',
    options: [
      'Energy Performance Rating',
      'Energy Performance Ratio',
      'Environmental Performance Requirement',
      'Electrical Power Reduction',
    ],
    correctAnswer: 1,
    explanation:
      'EPR stands for Energy Performance Ratio - a metric comparing actual building performance against a notional building, used in Ene 01 to assess and reward energy efficiency improvements.',
  },
  {
    id: 2,
    question: 'Which document provides the regulatory baseline for BREEAM energy calculations?',
    options: [
      'Design stage BRUKL output and energy model report',
      'Automatic daylight sensing and time scheduling',
      'BRUKL (Building Regulations UK Part L)',
      'SBEM (Simplified Building Energy Model)',
    ],
    correctAnswer: 2,
    explanation:
      'BRUKL (Building Regulations UK Part L) compliance calculations provide the regulatory baseline. BREEAM Ene 01 rewards performance improvements beyond this minimum requirement.',
  },
  {
    id: 3,
    question:
      'What is the minimum credit threshold in Ene 01 that must be achieved for a BREEAM Excellent rating?',
    options: [
      '8 credits',
      '4 credits',
      '10 credits',
      '6 credits',
    ],
    correctAnswer: 3,
    explanation:
      'For BREEAM Excellent rating, a minimum of 6 credits must be achieved in Ene 01. This ensures buildings targeting higher ratings demonstrate genuine energy performance improvements.',
  },
  {
    id: 4,
    question:
      'Sub-metering under Ene 02 must enable monitoring of energy consumption at intervals of:',
    options: [
      'Hourly or better',
      'Daily',
      'Weekly',
      'Monthly',
    ],
    correctAnswer: 0,
    explanation:
      'Ene 02 requires sub-metering systems capable of recording consumption data at hourly intervals or better, enabling detailed analysis of energy use patterns and identification of anomalies.',
  },
  {
    id: 5,
    question:
      'For external lighting (Ene 03), what additional control requirement supports the efficacy standard?',
    options: [
      'BRUKL (Building Regulations UK Part L)',
      'Automatic daylight sensing and time scheduling',
      'SBEM (Simplified Building Energy Model)',
      'Design stage BRUKL output and energy model report',
    ],
    correctAnswer: 1,
    explanation:
      'Ene 03 requires external lighting to incorporate automatic controls including daylight sensing (switching off/dimming in adequate daylight) and time scheduling to prevent unnecessary operation.',
  },
  {
    id: 6,
    question:
      'Which of the following is NOT typically classified as a low or zero carbon technology under Ene 04?',
    options: [
      'Air source heat pumps',
      'Solar PV panels',
      'High-efficiency gas boilers',
      'Combined heat and power (CHP)',
    ],
    correctAnswer: 2,
    explanation:
      'High-efficiency gas boilers, while efficient, are not classified as LZC technologies as they rely on fossil fuels. LZC technologies include heat pumps, solar PV, wind, biomass, and CHP systems.',
  },
  {
    id: 7,
    question:
      'What software tool is commonly used to produce BRUKL calculations for non-domestic buildings?',
    options: [
      'Design stage BRUKL output and energy model report',
      'Automatic daylight sensing and time scheduling',
      'BRUKL (Building Regulations UK Part L)',
      'SBEM (Simplified Building Energy Model)',
    ],
    correctAnswer: 3,
    explanation:
      'SBEM (Simplified Building Energy Model) is the National Calculation Methodology (NCM) tool for non-domestic buildings, producing BRUKL outputs that demonstrate Part L compliance.',
  },
  {
    id: 8,
    question: 'Under Ene 02, which building type has specific enhanced sub-metering requirements?',
    options: [
      'Multi-tenanted buildings',
      'Single-occupancy offices',
      'Residential developments',
      'Industrial warehouses',
    ],
    correctAnswer: 0,
    explanation:
      'Multi-tenanted buildings have enhanced Ene 02 requirements, needing sub-metering for each tenancy to enable individual tenant energy monitoring and encourage responsible consumption.',
  },
  {
    id: 9,
    question:
      'What is the maximum luminaire power density typically required for car park lighting under Ene 03?',
    options: [
      '1.5 W/m²',
      '2.5 W/m²',
      '2.0 W/m²',
      '3.0 W/m²',
    ],
    correctAnswer: 1,
    explanation:
      'BREEAM guidance indicates car park lighting should achieve approximately 2.5 W/m² or less, depending on maintained illuminance requirements and luminaire efficacy.',
  },
  {
    id: 10,
    question: 'Evidence for Ene 01 credits must include:',
    options: [
      'Manufacturer product data only',
      'Building user satisfaction surveys',
      'Design stage BRUKL output and energy model report',
      'Post-occupancy energy bills',
    ],
    correctAnswer: 2,
    explanation:
      'Ene 01 requires design stage evidence including BRUKL calculations, dynamic simulation model outputs (where applicable), and specification of energy efficiency measures achieving the claimed EPR.',
  },
  {
    id: 11,
    question: "The 'energy model' used for BREEAM assessment must account for:",
    options: [
      'Resistance at mid-point approximately equal to end-to-end values',
      'By providing rapid response to balance supply and demand',
      'Temperature rise should not cause degradation of insulation or surrounding materials',
      'All regulated energy uses (heating, cooling, lighting, hot water, auxiliary)',
    ],
    correctAnswer: 3,
    explanation:
      'The energy model must account for all regulated energy uses as defined by Part L: space heating, space cooling, domestic hot water, lighting, and auxiliary energy (pumps, fans, controls).',
  },
  {
    id: 12,
    question: 'What is the relationship between BREEAM energy credits and EPC ratings?',
    options: [
      'BREEAM uses EPR which correlates with but is distinct from EPC ratings',
      'Avoiding work at height altogether if it is reasonably practicable to do so',
      'Find an alternative specification and get client approval before starting',
      'Without slip there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no relative motion → no induced EMF in the rotor → no torque',
    ],
    correctAnswer: 0,
    explanation:
      'BREEAM uses the Energy Performance Ratio (EPR) which builds upon Part L/EPC methodology but applies additional performance thresholds. A good EPC typically supports higher BREEAM energy credits.',
  },
];

const faqs = [
  {
    question: 'How does BREEAM Ene 01 differ from Building Regulations Part L compliance?',
    answer:
      'Part L sets minimum legal requirements for energy performance; all new buildings must achieve Part L compliance. BREEAM Ene 01 rewards buildings that exceed Part L requirements through the Energy Performance Ratio (EPR). The better a building performs beyond the Part L baseline, the more credits awarded. Part L compliance alone typically achieves minimal or no Ene 01 credits - meaningful credits require genuine improvement through enhanced fabric, efficient systems, and low carbon technologies.',
  },
  {
    question: 'What sub-metering strategy satisfies BREEAM Ene 02 requirements?',
    answer:
      'A compliant strategy requires: (1) Main incoming meter with pulsed output for BMS integration, (2) Sub-meters on major energy end uses - HVAC systems, lighting circuits, small power distribution, and specialist equipment, (3) Tenant/occupancy area sub-metering in multi-let buildings, (4) Meters capable of hourly data recording, (5) System enabling data display to building operators. The strategy should enable at least 90% of estimated annual energy consumption to be monitored through accessible sub-meters.',
  },
  {
    question: 'What evidence is required for Ene 04 low/zero carbon technology credits?',
    answer:
      'Evidence requirements include: (1) Feasibility study demonstrating consideration of LZC options, (2) Calculations showing percentage of energy demand/carbon reduction from LZC, (3) Specification and drawings of proposed LZC systems, (4) Manufacturer performance data, (5) Confirmation that installed capacity meets the minimum 10% contribution threshold. For heat pumps, evidence must include seasonal performance factor (SPF) calculations demonstrating low carbon operation.',
  },
  {
    question:
      'How should external lighting design balance Ene 03 efficacy requirements with other BREEAM criteria?',
    answer:
      'External lighting design must achieve 70 lm/W average efficacy whilst also considering: Hea 05 (light pollution) requiring upward light ratio limits and appropriate luminaire cut-off angles, Pol 04 potentially requiring dark sky compliance in sensitive areas, and security/safety requirements. LED technology typically achieves 100+ lm/W, comfortably meeting efficacy requirements whilst enabling directional control for light pollution compliance. Integrated controls (daylight, time, motion) maximise credits across multiple issues.',
  },
  {
    question: 'What is the role of dynamic simulation modelling in BREEAM energy assessment?',
    answer:
      'Dynamic simulation modelling (DSM) using tools like IES-VE or TAS is required for complex buildings or where SBEM cannot adequately represent building systems. DSM provides hourly energy calculations accounting for thermal mass, solar gains, and system interactions. For BREEAM, DSM enables more accurate EPR calculation for buildings with advanced features (mixed-mode ventilation, thermal storage, complex glazing). DSM reports must follow CIBSE AM11 methodology and be prepared by competent energy modellers.',
  },
];

const HNCModule6Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Subsection 3"
            title="BREEAM Energy Category"
            description="Energy performance (Ene 01), sub-metering (Ene 02), external lighting (Ene 03), and low carbon technologies (Ene 04)"
            tone="purple"
          />

          <TLDR
            points={[
              "BREEAM Ene 01–08 covers energy performance (the headline credit, scored on % improvement over Part L notional), sub-metering, external lighting, low- and zero-carbon technologies, building services controls, and energy-efficient transportation.",
              "Ene 01 awards up to 15 credits scaled by % improvement on Part L 2021 notional — a 35–40% improvement typically achieves the Excellent threshold; Outstanding usually requires 50%+ plus on-site renewables.",
              "Sub-metering (Ene 02) is mandatory for Very Good on non-residential — all energy end-uses >250 m² or >10% of total demand must be sub-metered with BMS connection.",
            ]}
          />

          <RegsCallout
            source="BREEAM UK New Construction 2018 — Ene 01: Reduction of Energy Use and Carbon Emissions"
            clause="The number of credits awarded shall be scaled by reference to the SBEM/SAP Energy Performance Ratio for new construction (EPRNC), being the percentage improvement of the actual building Building Emission Rate (or Dwelling Emission Rate for housing) and Primary Energy Rate (BPER/DPER) over the notional building TER and TPER as calculated under the National Calculation Methodology."
            meaning={
              <>
                Ene 01 is directly tied to the NCM output. Improvements come from (in order of typical cost-effectiveness): better fabric, low-carbon heating (heat pumps), high-efficacy lighting + controls, on-site PV. There is no other route to credits — you must run SBEM/SAP and demonstrate the % improvement; design intent statements alone earn nothing.
              </>
            }
            cite="Source: BREEAM UK NC 2018 Technical Manual, Issue 4.0 — breeam.com"
          />

          <LearningOutcomes
            outcomes={[
              "Apply BREEAM Ene 01 Energy Performance Ratio methodology",
              "Design sub-metering strategies compliant with Ene 02",
              "Specify external lighting achieving Ene 03 efficacy standards",
              "Evaluate low/zero carbon technologies for Ene 04 credits",
              "Understand BRUKL calculations and energy modelling requirements",
              "Prepare evidence documentation for BREEAM energy credits",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Ene 01 - Energy Performance and EPR">
            <p>BREEAM Ene 01 is typically the highest-weighted energy credit issue, rewarding buildings that achieve operational CO2 emissions reductions beyond Building Regulations Part L minimum requirements. Credits are awarded based on the Energy Performance Ratio (EPR), which compares the actual building's calculated performance against a notional baseline building.</p>
            <p><strong>Energy Performance Ratio (EPR) Explained:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EPR calculation:</strong> Compares actual vs notional building energy/carbon performance</li>
              <li><strong>Baseline:</strong> Part L 2021 compliant notional building (BRUKL output)</li>
              <li><strong>Improvement required:</strong> Higher EPR = better performance = more credits</li>
              <li><strong>Credit scaling:</strong> Minimum 4 credits for BREEAM Very Good, 6 for Excellent</li>
            </ul>
            <p><strong>Ene 01 Credit Thresholds (Indicative)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1-3:</strong> Marginal improvement over Part L — Enhanced fabric, efficient lighting</li>
              <li><strong>4-6:</strong> Good performance (Very Good/Excellent) — Heat recovery, LED throughout, controls</li>
              <li><strong>7-9:</strong> Excellent performance — LZC technologies, optimised systems</li>
              <li><strong>10+:</strong> Outstanding/Net zero — Passive design, significant renewables</li>
            </ul>
            <p><strong>BRUKL Output Requirements</strong></p>
            <p>The Building Regulations UK Part L (BRUKL) output document provides:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building Emission Rate (BER) - actual building CO2 emissions</li>
              <li>Target Emission Rate (TER) - notional building threshold</li>
              <li>Primary energy consumption comparison</li>
              <li>Building fabric and services specifications used</li>
            </ul>
            <p>BRUKL must demonstrate BER ≤ TER for Part L compliance; BREEAM rewards BER significantly below TER.</p>
            <p><strong>Design principle:</strong> Early-stage decisions on building form, orientation, and fabric have the greatest impact on Ene 01 performance - optimise these before relying on efficient services or renewables.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Ene 02 - Sub-Metering of Substantial Energy Uses">
            <p>Effective energy management requires visibility of consumption patterns. Ene 02 mandates sub-metering infrastructure enabling building operators and occupants to monitor energy use by major end-use category and, in multi-tenanted buildings, by occupancy area.</p>
            <p><strong>Mandatory Sub-Metering</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Space heating systems</li>
              <li>Domestic hot water</li>
              <li>Humidification plant</li>
              <li>Cooling systems</li>
              <li>Fans (ventilation/air handling)</li>
              <li>Lighting (general and external)</li>
              <li>Small power distribution</li>
            </ul>
            <p><strong>Additional Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hourly data recording capability</li>
              <li>Pulsed output for BMS integration</li>
              <li>Tenant area sub-metering (multi-let)</li>
              <li>High energy loads (lifts, server rooms)</li>
              <li>Renewable generation monitoring</li>
              <li>Data accessible to building operators</li>
            </ul>
            <p><strong>Sub-Metering Strategy Example - Office Building</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Main incomer:</strong> Main LV switchboard — CT metering, MID Class B</li>
              <li><strong>HVAC:</strong> Mechanical services DB — kWh meter, pulsed output</li>
              <li><strong>Lighting:</strong> Lighting distribution boards — kWh meter per floor</li>
              <li><strong>Small power:</strong> Floor distribution boards — kWh meter per tenant area</li>
              <li><strong>Lifts:</strong> Lift motor room DB — Dedicated kWh meter</li>
              <li><strong>Server room:</strong> IT distribution board — Dedicated kWh meter</li>
            </ul>
            <p><strong>Best practice:</strong> Design metering strategy at RIBA Stage 2-3 to ensure switchboard and distribution layouts accommodate required meters and communication infrastructure.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Ene 03 - External Lighting">
            <p>External lighting represents a significant energy consumption category that often operates outside occupied hours. Ene 03 encourages energy-efficient external lighting design through efficacy requirements and mandatory automatic controls, whilst considering interface with light pollution criteria (Pol 04).</p>
            <p><strong>Core Requirements - Ene 03</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Minimum efficacy:</strong> Average initial luminous efficacy ≥70 luminous lm/W across all external luminaires</li>
              <li><strong>Daylight control:</strong> Automatic switching/dimming based on daylight levels</li>
              <li><strong>Time scheduling:</strong> Time-based controls preventing unnecessary operation</li>
              <li><strong>Zoning:</strong> Separate control of different external areas</li>
            </ul>
            <p><strong>External Lighting Design Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Car parks:</strong> 20-75 lux (BS 5489) — Photocell + time clock, presence dimming</li>
              <li><strong>Pedestrian routes:</strong> 5-20 lux — Photocell control, reduced overnight</li>
              <li><strong>Building entrance:</strong> 100-200 lux — Photocell, occupancy-linked dimming</li>
              <li><strong>Security/perimeter:</strong> Variable — PIR activation, CCTV integration</li>
              <li><strong>Decorative/facade:</strong> Design dependent — Time scheduling, curfew hours</li>
            </ul>
            <p><strong>Efficacy Calculation Example:</strong></p>
            <p>External lighting schedule:</p>
            <p>Car park: 20 × LED luminaires @ 80W, 120 lm/W = 1,600W</p>
            <p>Pathways: 15 × LED luminaires @ 40W, 110 lm/W = 600W</p>
            <p>Entrance: 6 × LED luminaires @ 60W, 95 lm/W = 360W</p>
            <p>Weighted average efficacy calculation:</p>
            <p>= (20×120 + 15×110 + 6×95) / (20+15+6)</p>
            <p>= (2400 + 1650 + 570) / 41</p>
            <p>= 4620 / 41</p>
            <p>= 112.7 lm/W (exceeds 70 lm/W requirement)</p>
            <p><strong>Integration note:</strong> Coordinate external lighting design with Pol 04 (light pollution) requirements - use luminaires with appropriate upward light ratio (0% for E1/E2 zones) and consider impact on neighbouring properties.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Ene 04 - Low and Zero Carbon Technologies">
            <p>Ene 04 encourages incorporation of low and zero carbon (LZC) technologies to reduce reliance on grid electricity and fossil fuels. Credits are awarded where feasibility assessment demonstrates appropriate technology selection and installed capacity meets minimum contribution thresholds.</p>
            <p><strong>Recognised LZC Technologies</strong></p>
            <p><strong>Electricity Generation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Solar photovoltaic (PV) systems</li>
              <li>Wind turbines (building-mounted/standalone)</li>
              <li>Combined heat and power (CHP)</li>
              <li>Fuel cells (hydrogen/natural gas)</li>
              <li>Micro-hydro (site specific)</li>
            </ul>
            <p><strong>Heat Generation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Air source heat pumps (ASHP)</li>
              <li>Ground source heat pumps (GSHP)</li>
              <li>Water source heat pumps</li>
              <li>Biomass boilers</li>
              <li>Solar thermal collectors</li>
              <li>District heating (low carbon networks)</li>
            </ul>
            <p><strong>LZC Feasibility Study Requirements</strong></p>
            <p>The feasibility study must consider:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site characteristics (solar access, wind exposure, ground conditions)</li>
              <li>Building energy demand profile (baseload, peak, seasonal variation)</li>
              <li>Technical feasibility of each technology option</li>
              <li>Capital cost, operational cost, and lifecycle assessment</li>
              <li>Carbon reduction potential of each option</li>
              <li>Recommended technology selection with justification</li>
            </ul>
            <p><strong>Credit Requirements and Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Feasibility study:</strong> Prerequisite — LZC options assessment report</li>
              <li><strong>Energy contribution:</strong> ≥10% of building demand — Energy model showing LZC output</li>
              <li><strong>Carbon contribution:</strong> OR ≥10% CO2 reduction — Carbon calculation methodology</li>
              <li><strong>System specification:</strong> Detailed design — Drawings, specifications, datasheets</li>
            </ul>
            <p><strong>Heat Pump Carbon Assessment Example</strong></p>
            <p><strong>System:</strong> Air source heat pump (ASHP) for space heating</p>
            <p><strong>Seasonal Performance Factor (SPF):</strong> 3.2</p>
            <p><strong>Annual heating demand:</strong> 150,000 kWh</p>
            <p><strong>Calculation:</strong></p>
            <p>Electricity consumed = 150,000 / 3.2 = 46,875 kWh</p>
            <p>Grid electricity factor = 0.136 kgCO2/kWh (SAP 10.2)</p>
            <p>ASHP emissions = 46,875 × 0.136 = 6,375 kgCO2</p>
            <p>Comparison with gas boiler (90% efficiency):</p>
            <p>Gas consumed = 150,000 / 0.9 = 166,667 kWh</p>
            <p>Gas factor = 0.210 kgCO2/kWh</p>
            <p>Gas boiler emissions = 166,667 × 0.210 = 35,000 kgCO2</p>
            <p>Carbon saving = 35,000 - 6,375 = 28,625 kgCO2 (82% reduction)</p>
            <p><strong>Technology selection:</strong> Heat pumps typically offer highest carbon savings due to grid decarbonisation trajectory. Solar PV provides excellent returns where roof area permits and complements electrified heating.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Energy Model Specification</strong>
            </p>
            <p><strong>Scenario:</strong> Specify energy modelling approach for a 5,000m² office building targeting BREEAM Excellent.</p>
            <p>Energy Modelling Approach:</p>
            <p>Building type: Naturally ventilated office with local cooling</p>
            <p>Modelling tool: SBEM (IES-VE DSM backup for specific areas)</p>
            <p>Model inputs:</p>
            <p>- Fabric U-values from specification</p>
            <p>- Air permeability target: 3.0 m³/h/m² @ 50Pa</p>
            <p>- Lighting: 8 W/m² installed, automatic controls</p>
            <p>- HVAC: VRF system, SCOP 4.5</p>
            <p>- Ventilation: MVHR, 85% heat recovery</p>
            <p>- Renewables: 100 kWp rooftop PV</p>
            <p>Outputs required:</p>
            <p>- BRUKL document showing BER vs TER</p>
            <p>- EPR calculation for Ene 01 credits</p>
            <p>- LZC contribution percentage</p>
            <p>
              <strong>Example 2: Sub-Metering Schedule</strong>
            </p>
            <p><strong>Scenario:</strong> Develop sub-metering schedule for multi-tenanted retail development.</p>
            <p>Meter Ref | Description | Location | Output</p>
            <p>----------|-------------|----------|--------</p>
            <p>M-01 | Main incomer | MSB | Modbus RTU</p>
            <p>M-02 | Landlord HVAC | MSB | Pulsed (BMS)</p>
            <p>M-03 | Landlord lighting | LDB-LL | Pulsed (BMS)</p>
            <p>M-04 | Common area SP | DB-CA | Pulsed (BMS)</p>
            <p>M-05 | External lighting | DB-EXT | Pulsed (BMS)</p>
            <p>M-06 | Lifts/escalators | DB-VERT | Pulsed (BMS)</p>
            <p>M-T01 | Unit 1 supply | DB-T01 | Tenant meter</p>
            <p>M-T02 | Unit 2 supply | DB-T02 | Tenant meter</p>
            <p>... | ... | ... | ...</p>
            <p>Coverage: 95% of total consumption sub-metered</p>
            <p>Data: BMS trending at 15-minute intervals</p>
            <p>
              <strong>Example 3: LZC Technology Comparison</strong>
            </p>
            <p><strong>Scenario:</strong> Compare LZC options for school building (1,500m², 200,000 kWh annual demand).</p>
            <p>Technology Assessment Summary:</p>
            <p>Option A: Rooftop Solar PV (50 kWp)</p>
            <p>- Annual yield: 42,500 kWh (21% of demand)</p>
            <p>- Capital cost: £50,000</p>
            <p>- Carbon saving: 5,780 kgCO2/year</p>
            <p>Option B: Air Source Heat Pump</p>
            <p>- Heating demand covered: 80,000 kWh</p>
            <p>- Electricity consumption: 22,850 kWh (SPF 3.5)</p>
            <p>- Capital cost: £85,000</p>
            <p>- Carbon saving: 13,720 kgCO2/year</p>
            <p>Option C: Combined PV + ASHP</p>
            <p>- Total carbon saving: 19,500 kgCO2/year</p>
            <p>- Capital cost: £125,000</p>
            <p>- LZC contribution: 35%+ (exceeds Ene 04 threshold)</p>
            <p>Recommendation: Option C for maximum credits</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Evidence Preparation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BRUKL output document from approved NCM software (SBEM/DSM)</li>
              <li>Energy model report detailing inputs, assumptions, and results</li>
              <li>Sub-metering schedule with meter types and communication protocols</li>
              <li>External lighting schedule showing all luminaires and controls</li>
              <li>LZC feasibility study with technology options assessment</li>
              <li>Specifications and drawings for energy-related systems</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External lighting efficacy: <strong>≥70 lm/W</strong> average</li>
              <li>LZC contribution threshold: <strong>≥10%</strong> of energy or carbon</li>
              <li>Sub-metering intervals: <strong>Hourly</strong> or better</li>
              <li>Ene 01 minimum for Excellent: <strong>6 credits</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Late energy modelling:</strong> Model early to inform design decisions</li>
                <li><strong>Inadequate sub-metering:</strong> Missing systems results in non-compliance</li>
                <li><strong>Decorative lighting excluded:</strong> All external lighting counts towards efficacy</li>
                <li><strong>LZC oversizing:</strong> Match capacity to demand profile, not maximum possible</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Outstanding target requires PV but roof is unavailable"
            situation={
              <>
                A school project is targeting BREEAM Outstanding. The Ene 01 target is 50% improvement on Part L. Design SBEM achieves 38% (heat pumps + good fabric); the gap of 12% would normally be closed with rooftop PV. The roof is reserved for solar thermal and a green-roof biodiversity strategy — PV is precluded.
              </>
            }
            whatToDo={
              <>
                Three routes to close the gap: (1) external PV on a canopy / car-port structure (often planning-acceptable, sometimes adds shading benefit); (2) battery storage + smart charging optimised against half-hourly grid carbon (Ene 04 LZC + smart controls — modest contribution); (3) abandon Outstanding and target Excellent (45–55%, achievable). Discuss with the BREEAM Assessor early — often a combination of LZC technologies plus enhanced fabric (better airtightness, improved Ψ-values) can claw back the gap.
              </>
            }
            whyItMatters={
              <>
                BREEAM Outstanding is the rating that almost always needs on-site renewables. The roof real-estate conflict (PV vs solar thermal vs green roof vs biodiversity) is the most common Outstanding-vs-Excellent decision. Lock the roof strategy at RIBA Stage 2, not Stage 4.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Ene 01 = up to 15 credits, scaled by % improvement on Part L notional (SBEM/SAP).",
              "Excellent typically needs 35–40% improvement; Outstanding typically needs 50%+ with on-site renewables.",
              "Sub-metering (Ene 02) mandatory for Very Good non-residential.",
              "Low- and zero-carbon (Ene 04) credit drives heat pumps, PV, district heat connection.",
              "Energy controls (Ene 06) — daylight harvesting, presence detection, BMS optimisation.",
              "Roof real estate conflict (PV vs green vs solar thermal) needs Stage 2 resolution.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Water category
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Materials and waste
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section3_3;
