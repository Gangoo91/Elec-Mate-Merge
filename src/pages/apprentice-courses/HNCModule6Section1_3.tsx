/**
 * Module 6 · Section 1 · Subsection 3 — Fabric Performance
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   U-value calculations, thermal bridging, limiting fabric parameters, and construction specifications for energy-efficient buildings
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

const TITLE = 'Fabric Performance - HNC Module 6 Section 1.3';
const DESCRIPTION =
  'Master fabric performance for building services: U-value calculations, thermal bridging, limiting fabric parameters, psi values, Part L compliance, and construction specifications for energy-efficient buildings.';

const quickCheckQuestions = [
  {
    id: 'u-value-definition',
    question: 'What does the U-value of a building element measure?',
    options: [
      'To bind strands together and ensure reliable connection',
      'The Principal Contractor (who co-ordinates all trades)',
      'The rate of heat transfer per unit area per degree temperature difference',
      'Constant power delivery and more efficient power transmission',
    ],
    correctIndex: 2,
    explanation:
      'The U-value (thermal transmittance) measures the rate of heat transfer through a building element per unit area for every degree of temperature difference between inside and outside. Lower U-values indicate better insulation.',
  },
  {
    id: 'thermal-bridge',
    question: 'What is a thermal bridge in building construction?',
    options: [
      'Provide contact details, role, company information and relevant accreditations',
      'Adequate illumination, duration, and reliability during emergencies',
      'An area where heat transfer is significantly higher than surrounding elements',
      'Fabricated or falsified documents claiming work that was not performed',
    ],
    correctIndex: 2,
    explanation:
      'A thermal bridge is an area of the building envelope where heat transfer is significantly greater than the surrounding construction, typically occurring at junctions, penetrations, or where insulation is interrupted.',
  },
  {
    id: 'part-l-compliance',
    question:
      'For Part L compliance, which approach considers both fabric elements and thermal bridges?',
    options: [
      '5 to 8 times full-load current',
      'At the origin (closest to supply)',
      'Near exits and at changes of direction',
      'Target Fabric Energy Efficiency (TFEE)',
    ],
    correctIndex: 3,
    explanation:
      'The Target Fabric Energy Efficiency (TFEE) standard in Part L considers the combined performance of all fabric elements plus thermal bridging effects to assess overall building envelope performance.',
  },
  {
    id: 'psi-value',
    question: 'What does the psi (ψ) value represent in thermal bridging calculations?',
    options: [
      'The solar heat gain coefficient',
      'The air leakage rate at joints',
      'The U-value of an insulation material',
      'The linear thermal transmittance at junctions',
    ],
    correctIndex: 3,
    explanation:
      'The psi (ψ) value represents the linear thermal transmittance of a thermal bridge, measured in W/mK. It quantifies the additional heat loss per metre length of a junction or linear feature.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the units for U-value?',
    options: [
      'W/K',
      'W/m²K',
      'W/mK',
      'J/m²K',
    ],
    correctAnswer: 1,
    explanation:
      'U-value is measured in W/m²K (watts per square metre per kelvin). This represents the rate of heat transfer through one square metre of the element for each degree of temperature difference.',
  },
  {
    id: 2,
    question:
      'According to Part L 2021 for new dwellings, what is the limiting U-value for external walls?',
    options: [
      '0.18 W/m²K',
      '0.35 W/m²K',
      '0.26 W/m²K',
      '0.30 W/m²K',
    ],
    correctAnswer: 2,
    explanation:
      'Part L 2021 sets the limiting U-value for external walls in new dwellings at 0.26 W/m²K. This is a backstop value - actual designs typically achieve lower values to meet overall energy targets.',
  },
  {
    id: 3,
    question:
      'When calculating the U-value of a wall, which resistance must be included for the external surface?',
    options: [
      'Rse = 0.13 m²K/W',
      'Rsi = 0.13 m²K/W',
      'Rsi = 0.04 m²K/W',
      'Rse = 0.04 m²K/W',
    ],
    correctAnswer: 3,
    explanation:
      'The external surface resistance (Rse) is 0.04 m²K/W for exposed surfaces. The internal surface resistance (Rsi) is 0.13 m²K/W for horizontal heat flow (walls).',
  },
  {
    id: 4,
    question:
      'A 100mm thick insulation material has a thermal conductivity of 0.035 W/mK. What is its thermal resistance?',
    options: [
      '2.86 m²K/W',
      '0.35 m²K/W',
      '3.50 m²K/W',
      '0.29 m²K/W',
    ],
    correctAnswer: 0,
    explanation:
      'Thermal resistance R = thickness / conductivity = 0.100 / 0.035 = 2.86 m²K/W. Higher thermal resistance means better insulation performance.',
  },
  {
    id: 5,
    question:
      'What is the limiting U-value for roofs in new non-domestic buildings under Part L 2021?',
    options: [
      '0.18 W/m²K',
      '0.16 W/m²K',
      '0.20 W/m²K',
      '0.25 W/m²K',
    ],
    correctAnswer: 1,
    explanation:
      'Part L 2021 sets the limiting U-value for roofs in new non-domestic buildings at 0.16 W/m²K. Roofs typically have lower limiting values as they experience greatest heat loss.',
  },
  {
    id: 6,
    question:
      'Which term describes the total thermal transmittance including linear thermal bridges?',
    options: [
      'Elemental U-value',
      'Adjusted U-value',
      'Effective U-value',
      'Composite U-value',
    ],
    correctAnswer: 2,
    explanation:
      'The effective U-value accounts for both the basic elemental U-value and the additional heat loss through thermal bridges (using psi values). This gives a more accurate representation of real-world performance.',
  },
  {
    id: 7,
    question:
      'What is the default y-value used for thermal bridging when no detailed calculations are provided?',
    options: [
      '0.05 W/m²K',
      '0.08 W/m²K',
      '0.10 W/m²K',
      '0.15 W/m²K',
    ],
    correctAnswer: 3,
    explanation:
      'When detailed psi value calculations are not available, a default y-value of 0.15 W/m²K is used. This penalises buildings without proper thermal bridge detailing and typically adds significantly to heat loss.',
  },
  {
    id: 8,
    question:
      'For a window, what does the frame factor affect in thermal performance calculations?',
    options: [
      'The proportion of glazed area to total window area',
      'The structural integrity of the installation',
      'The air leakage around the frame',
      'The solar gain through the glass',
    ],
    correctAnswer: 0,
    explanation:
      'The frame factor represents the ratio of glazed area to total window area. Since frames typically have higher U-values than glazing, a higher frame factor (more frame) generally increases overall window U-value.',
  },
  {
    id: 9,
    question: 'What is the formula for calculating the U-value from total thermal resistance?',
    options: [
      'U = Rtotal × Area',
      'U = 1 / Rtotal',
      'U = Rtotal / thickness',
      'U = conductivity × Rtotal',
    ],
    correctAnswer: 1,
    explanation:
      'U-value is the reciprocal of total thermal resistance: U = 1/Rtotal. After calculating Rtotal by summing all layer resistances plus surface resistances, divide 1 by this total to get the U-value.',
  },
  {
    id: 10,
    question: 'Which insulation material typically has the lowest thermal conductivity?',
    options: [
      'Mineral wool (0.035-0.040 W/mK)',
      'PIR/PUR foam (0.022-0.028 W/mK)',
      'Phenolic foam (0.018-0.022 W/mK)',
      'Expanded polystyrene (0.032-0.038 W/mK)',
    ],
    correctAnswer: 2,
    explanation:
      'Phenolic foam has the lowest thermal conductivity of common insulation materials (0.018-0.022 W/mK), making it highly efficient where space is limited. However, it requires careful detailing due to potential moisture sensitivity.',
  },
  {
    id: 11,
    question:
      'When calculating the U-value of a ground floor, what additional factor must be considered?',
    options: [
      'The building height',
      'The roof insulation level',
      'The external air temperature only',
      'The perimeter-to-area ratio',
    ],
    correctAnswer: 3,
    explanation:
      'Ground floor U-value calculations must consider the perimeter-to-area ratio (P/A). Heat loss occurs predominantly around the floor perimeter, so buildings with high P/A ratios (small footprints) have higher effective floor U-values.',
  },
  {
    id: 12,
    question:
      'What is the typical psi value for an insulated wall/roof junction with good detailing?',
    options: [
      '0.06 W/mK',
      '0.35 W/mK',
      '0.25 W/mK',
      '0.16 W/mK',
    ],
    correctAnswer: 0,
    explanation:
      'A well-detailed insulated wall/roof junction typically achieves a psi value around 0.06 W/mK. Poor detailing can result in values of 0.20 W/mK or higher, significantly increasing heat loss at junctions.',
  },
];

const faqs = [
  {
    question: 'How do U-value calculations affect building services design?',
    answer:
      "U-values directly determine the building's heat loss, which sizes the heating system. Lower U-values mean smaller boilers, reduced radiator sizes, and lower distribution pipe capacities. For cooling, fabric performance affects peak gains and chiller sizing. Services engineers must understand fabric assumptions to correctly size plant and distribution systems.",
  },
  {
    question: 'Why is thermal bridging so important in modern construction?',
    answer:
      'As insulation standards improve and basic U-values decrease, thermal bridges become proportionally more significant. In a well-insulated building, thermal bridges can account for 30-50% of total heat loss. Poor thermal bridge detailing can completely undermine expensive insulation strategies, creating cold spots, condensation risks, and higher than expected energy bills.',
  },
  {
    question:
      'What is the relationship between Part L limiting values and notional building values?',
    answer:
      'Limiting U-values are absolute backstop values that no element should exceed. Notional building values are the reference values used in the comparison calculation. A compliant building can have individual elements worse than notional values provided it compensates elsewhere, but cannot exceed limiting values. Services design must account for actual values, not notional ones.',
  },
  {
    question:
      'How should I account for thermal bridging when detailed psi values are not available?',
    answer:
      'Use the default y-value method where thermal bridge heat loss = y × total envelope area. The default y-value is 0.15 W/m²K, which is deliberately conservative to encourage proper detailing. Alternatively, use Accredited Construction Details (ACDs) which provide pre-calculated psi values for standard junctions.',
  },
  {
    question: 'What causes discrepancies between calculated and actual fabric performance?',
    answer:
      'Common causes include: poor workmanship leaving gaps in insulation, thermal bridging not accounted for in calculations, moisture ingress reducing insulation effectiveness, air leakage bypassing insulation layers, and specification changes during construction. Thermographic surveys can identify problem areas after completion.',
  },
  {
    question: 'How do windows affect overall fabric performance calculations?',
    answer:
      'Windows have much higher U-values than walls (1.2-1.6 W/m²K vs 0.18-0.26 W/m²K) so window area significantly affects total heat loss. The area-weighted average U-value calculation shows that increasing window area raises average wall zone U-value. Services designers must account for actual glazing ratios, not assumptions.',
  },
];

const HNCModule6Section1_3 = () => {
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
            eyebrow="Module 6 · Section 1 · Subsection 3"
            title="Fabric Performance"
            description="U-value calculations, thermal bridging, limiting fabric parameters, and construction specifications for energy-efficient buildings"
            tone="purple"
          />

          <TLDR
            points={[
              "Fabric performance is set by U-values (W/m²K), Ψ-values (linear thermal bridges in W/mK) and air permeability (m³/h·m² at 50 Pa) — together they govern winter heat loss and Part L compliance.",
              "Limiting U-values in ADL 2021 are 0.26 (walls), 0.16 (roof), 0.18 (floor), 1.6 (windows) for dwellings; the notional values are tighter and define the target you must beat.",
              "Thermal bridging (junctions, lintels, openings) is calculated using Accredited Construction Details (ACDs) or numerically per BR 497 / ISO 10211 — defaults are penalised in SAP.",
            ]}
          />

          <RegsCallout
            source="Approved Document L Volume 1 (Dwellings) — Limiting fabric parameters"
            clause="Reasonable provision is to limit the area-weighted average U-value of each thermal element to no greater than the limiting value, to limit thermal bridging at junctions to a calculated transmission heat loss coefficient, and to limit air permeability to no greater than 8 m³/(h·m²) at 50 Pa for new dwellings tested in accordance with the approved methodology."
            meaning={
              <>
                Limiting values are absolute backstops — they cannot be traded off against better services performance. Air permeability of 8 m³/h·m² is the legal maximum; the notional dwelling assumes 5 to drive design ambition. Thermal bridging defaults add a penalty to TER; using ACDs or calculated Ψ-values almost always pays back in SAP score.
              </>
            }
            cite="Source: Approved Document L Volume 1: 2021 edition — gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate U-values for walls, roofs, floors, and windows",
              "Apply Part L limiting fabric parameters correctly",
              "Quantify thermal bridging using psi values and y-values",
              "Specify insulation materials for target U-values",
              "Understand how fabric performance affects services design",
              "Evaluate construction details for thermal bridge mitigation",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="U-Value Fundamentals">
            <p>The U-value (thermal transmittance) quantifies how effectively a building element prevents heat transfer. It represents the rate of heat flow through one square metre of the element for each degree of temperature difference between inside and outside air.</p>
            <p><strong>U-Value Formula</strong></p>
            <p><span> U = 1 / R<sub>total</sub> </span></p>
            <p><span>Where:</span></p>
            <p><span> R<sub>total</sub> = R<sub>si</sub> + R<sub>1</sub> + R<sub>2</sub> + ... + R <sub>n</sub> + R<sub>se</sub> </span></p>
            <p><span>R = d / λ</span> (for each layer)</p>
            <p>d = thickness (m), λ = thermal conductivity (W/mK)</p>
            <p><strong>Surface Resistances (BS EN ISO 6946):</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Walls:</strong> Horizontal — 0.13 — 0.04</li>
              <li><strong>Roof (ceiling):</strong> Upward — 0.10 — 0.04</li>
              <li><strong>Floor:</strong> Downward — 0.17 — 0.04</li>
            </ul>
            <p><strong>Common Insulation Materials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Phenolic foam:</strong> 0.018-0.022 — Where space is limited</li>
              <li><strong>PIR/PUR rigid foam:</strong> 0.022-0.028 — Flat roofs, wall cavities</li>
              <li><strong>Expanded polystyrene (EPS):</strong> 0.032-0.038 — Floor insulation, EIFS</li>
              <li><strong>Mineral wool:</strong> 0.035-0.040 — Cavity walls, loft spaces</li>
            </ul>
            <p><strong>Key principle:</strong> Lower thermal conductivity (λ) means better insulation - less thickness required to achieve target U-value.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Part L Limiting Parameters">
            <p>Building Regulations Part L sets both limiting U-values (absolute backstop values) and notional building values (reference for comparison calculations). Understanding both is essential for compliant building services design.</p>
            <p><strong>Part L 2021 - Limiting U-Values (New Buildings)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>External walls:</strong> 0.26 — 0.26</li>
              <li><strong>Roof:</strong> 0.16 — 0.16</li>
              <li><strong>Ground floor:</strong> 0.18 — 0.18</li>
              <li><strong>Windows/roof windows:</strong> 1.6 — 1.6</li>
              <li><strong>Doors:</strong> 1.6 — 1.6</li>
              <li><strong>Curtain walling:</strong> - — 1.6</li>
            </ul>
            <p><strong>Limiting Values</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Absolute maximum - cannot be exceeded</li>
              <li>Apply to every individual element</li>
              <li>No trade-off permitted</li>
              <li>Backstop for worst-case performance</li>
            </ul>
            <p><strong>Notional Values</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reference for comparison calculation</li>
              <li>Typically more onerous than limiting</li>
              <li>Trade-off between elements allowed</li>
              <li>Must meet TFEE/TER targets overall</li>
            </ul>
            <p><strong>Target Fabric Energy Efficiency (TFEE)</strong></p>
            <p>Part L 2021 introduces TFEE for dwellings - a metric measuring fabric performance independent of services. The building's Fabric Energy Efficiency (FEE) must not exceed the TFEE calculated for the notional building, ensuring fabric performance is not traded off against efficient services.</p>
            <p><strong>Services impact:</strong> Better fabric performance reduces heating/cooling loads, allowing smaller plant sizes but must be correctly input to SAP/SBEM for accurate compliance demonstration.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Thermal Bridging and Psi Values">
            <p>Thermal bridges occur where the insulation layer is interrupted or where materials with higher thermal conductivity penetrate the building envelope. Quantifying and minimising thermal bridging is critical for achieving designed energy performance.</p>
            <p><strong>Types of thermal bridges:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Linear (2D):</strong> Junctions between elements - wall/floor, wall/roof, around openings</li>
              <li><strong>Point (3D):</strong> Penetrations through the envelope - fixings, brackets, services</li>
              <li><strong>Geometric:</strong> Corners where heat flow concentrates</li>
              <li><strong>Structural:</strong> Steel or concrete elements bridging insulation</li>
            </ul>
            <p><strong>Psi Value (ψ) - Linear Thermal Transmittance</strong></p>
            <p><span>Heat loss at junction = ψ × L × ΔT</span></p>
            <p>Where:</p>
            <p>ψ = psi value (W/mK)</p>
            <p>L = length of junction (m)</p>
            <p>ΔT = temperature difference (K)</p>
            <p><strong>Typical Psi Values</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wall/floor (ground):</strong> 0.05 - 0.10 — 0.30 - 0.50</li>
              <li><strong>Wall/roof (eaves):</strong> 0.04 - 0.08 — 0.20 - 0.35</li>
              <li><strong>Window jamb:</strong> 0.02 - 0.05 — 0.10 - 0.15</li>
              <li><strong>Corner (external):</strong> 0.02 - 0.05 — 0.08 - 0.15</li>
              <li><strong>Lintel:</strong> 0.05 - 0.12 — 0.25 - 0.50</li>
            </ul>
            <p><strong>Total Heat Loss from Thermal Bridges</strong></p>
            <p>H<sub>TB</sub> = Σ(ψ × L) + Σ(χ × n)</p>
            <p>Or using y-value method:</p>
            <p>H<sub>TB</sub> = y × A<sub>exp</sub></p>
            <p>Where:</p>
            <p>χ = chi value for point thermal bridges (W/K)</p>
            <p>n = number of point thermal bridges</p>
            <p>y = aggregate y-value (W/m²K)</p>
            <p>A<sub>exp</sub> = total exposed envelope area (m²)</p>
            <p><strong>Default y-value:</strong> If detailed psi calculations are not available, SAP/SBEM uses y = 0.15 W/m²K - a significant penalty that can add 15-20% to fabric heat loss.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Construction Specifications and Services Impact">
            <p>Specifying fabric performance requires understanding construction build-ups, material properties, and their interaction with building services. Services engineers must interpret fabric specifications to correctly size systems and detail penetrations.</p>
            <p><strong>External Wall Build-Up</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>13mm plasterboard (0.21 W/mK)</li>
              <li>100mm insulated timber frame (0.035 W/mK)</li>
              <li>12mm sheathing board (0.13 W/mK)</li>
              <li>50mm cavity (vented)</li>
              <li>102.5mm facing brick (0.77 W/mK)</li>
              <li>Target U-value: 0.18 W/m²K</li>
            </ul>
            <p><strong>Flat Roof Build-Up</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-ply membrane</li>
              <li>150mm PIR insulation (0.022 W/mK)</li>
              <li>Vapour control layer</li>
              <li>18mm plywood deck</li>
              <li>Timber joists/steel structure</li>
              <li>Target U-value: 0.14 W/m²K</li>
            </ul>
            <p><strong>Impact on Building Services Design</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wall U-value:</strong> Heating/cooling load — Lower U = smaller radiators/FCUs</li>
              <li><strong>Roof U-value:</strong> Peak summer gains — Solar gain through roof affects cooling</li>
              <li><strong>Window U-value:</strong> Perimeter heating, cold spots — Higher glazing = more perimeter capacity</li>
              <li><strong>Thermal mass:</strong> Control strategy, peak shifting — Heavy buildings suit night cooling</li>
              <li><strong>Air permeability:</strong> Ventilation strategy — Tight buildings need MVHR</li>
            </ul>
            <p><strong>Services Penetrations - Thermal Bridge Mitigation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ductwork:</strong> Insulate ducts through envelope, seal around penetrations</li>
              <li><strong>Pipework:</strong> Use proprietary thermal break sleeves where passing through insulation</li>
              <li><strong>Cables:</strong> Seal with intumescent mastic, maintain insulation continuity</li>
              <li><strong>Flue penetrations:</strong> Purpose-made insulated flashings, maintain clearances</li>
            </ul>
            <p><strong>Coordination critical:</strong> Services routes should be planned to minimise envelope penetrations - each penetration creates a potential thermal bridge and air leakage path.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Wall U-Value Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate the U-value for a cavity wall construction.</p>
            <p>Construction (inside to outside):</p>
            <p>- 13mm plasterboard (λ = 0.21 W/mK)</p>
            <p>- 100mm blockwork (λ = 0.15 W/mK)</p>
            <p>- 100mm mineral wool insulation (λ = 0.035 W/mK)</p>
            <p>- 102.5mm facing brick (λ = 0.77 W/mK)</p>
            <p>Calculate thermal resistances:</p>
            <p>R<sub>si</sub> = 0.13 m²K/W</p>
            <p>R<sub>plaster</sub> = 0.013 / 0.21 = 0.062 m²K/W</p>
            <p>R<sub>block</sub> = 0.100 / 0.15 = 0.667 m²K/W</p>
            <p>R<sub>insulation</sub> = 0.100 / 0.035 = 2.857 m²K/W</p>
            <p>R<sub>brick</sub> = 0.1025 / 0.77 = 0.133 m²K/W</p>
            <p>R<sub>se</sub> = 0.04 m²K/W</p>
            <p>R<sub>total</sub> = 0.13 + 0.062 + 0.667 + 2.857 + 0.133 + 0.04</p>
            <p>R<sub>total</sub> = 3.889 m²K/W</p>
            <p>U = 1 / 3.889 = 0.257 W/m²K</p>
            <p>Result: Just exceeds 0.26 limiting value - needs improvement</p>
            <p>
              <strong>Example 2: Thermal Bridging Impact</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate total heat loss including thermal bridges for a small dwelling.</p>
            <p>Building data:</p>
            <p>- Total exposed envelope area: 250 m²</p>
            <p>- Wall area: 120 m² (U = 0.20 W/m²K)</p>
            <p>- Roof area: 80 m² (U = 0.14 W/m²K)</p>
            <p>- Floor area: 50 m² (U = 0.15 W/m²K)</p>
            <p>Junction lengths and psi values:</p>
            <p>- Wall/floor: 40m × 0.08 W/mK = 3.2 W/K</p>
            <p>- Wall/roof: 40m × 0.06 W/mK = 2.4 W/K</p>
            <p>- Corners: 24m × 0.04 W/mK = 0.96 W/K</p>
            <p>- Window reveals: 48m × 0.05 W/mK = 2.4 W/K</p>
            <p>Fabric heat loss:</p>
            <p>H<sub>fabric</sub> = (120×0.20) + (80×0.14) + (50×0.15)</p>
            <p>H<sub>fabric</sub> = 24 + 11.2 + 7.5 = 42.7 W/K</p>
            <p>Thermal bridge heat loss:</p>
            <p>H<sub>TB</sub> = 3.2 + 2.4 + 0.96 + 2.4 = 8.96 W/K</p>
            <p>Total H = 42.7 + 8.96 = 51.66 W/K</p>
            <p>Thermal bridges add 21% to fabric heat loss!</p>
            <p>
              <strong>Example 3: Insulation Thickness Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Determine insulation thickness required to achieve U = 0.14 W/m²K for a flat roof.</p>
            <p>Target U-value: 0.14 W/m²K</p>
            <p>Required R<sub>total</sub> = 1 / 0.14 = 7.14 m²K/W</p>
            <p>Known resistances:</p>
            <p>R<sub>si</sub> = 0.10 m²K/W</p>
            <p>R<sub>deck</sub> (18mm plywood) = 0.018/0.13 = 0.138 m²K/W</p>
            <p>R<sub>membrane</sub> = negligible</p>
            <p>R<sub>se</sub> = 0.04 m²K/W</p>
            <p>Resistance required from insulation:</p>
            <p>R<sub>ins</sub> = 7.14 - 0.10 - 0.138 - 0.04 = 6.86 m²K/W</p>
            <p>Using PIR insulation (λ = 0.022 W/mK):</p>
            <p>Thickness = R × λ = 6.86 × 0.022 = 0.151m</p>
            <p>Required: 160mm PIR insulation (rounded up)</p>
            <p>Alternatively, 200mm mineral wool (λ=0.035) would give similar R-value</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>U-Value Calculation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify all layers from inside to outside</li>
              <li>Obtain thermal conductivity (λ) for each material</li>
              <li>Calculate resistance of each layer (R = d/λ)</li>
              <li>Add appropriate surface resistances (Rsi, Rse)</li>
              <li>Sum all resistances for Rtotal</li>
              <li>Calculate U = 1/Rtotal and compare to limiting values</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wall Rsi: <strong>0.13 m²K/W</strong>, Rse: <strong>0.04 m²K/W</strong></li>
              <li>Limiting U-value walls: <strong>0.26 W/m²K</strong></li>
              <li>Limiting U-value roofs: <strong>0.16 W/m²K</strong></li>
              <li>Default y-value: <strong>0.15 W/m²K</strong></li>
              <li>PIR conductivity: <strong>0.022-0.028 W/mK</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Forgetting surface resistances</strong> - Always include Rsi and Rse</li>
                <li><strong>Using wrong λ values</strong> - Check actual product data, not generic values</li>
                <li><strong>Ignoring thermal bridges</strong> - Can add 20%+ to heat loss</li>
                <li><strong>Confusing limiting and notional values</strong> - Know the difference</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Air permeability test fails at 9.2 — what now"
            situation={
              <>
                The designer specified an air permeability of 5 m³/h·m² (notional value) and the SAP design-stage calculation is built on it. The site test on plot 14 returns 9.2 — above the 8 limit. Without remediation, the dwelling fails Part L and cannot complete.
              </>
            }
            whatToDo={
              <>
                Re-test after smoke-pencil identification of the leakage paths (typically penetrations at services, eaves and lintel junctions). If the second test still fails, two routes are open: (1) physical remediation (intumescent sealing, taping, membrane repair) and re-test, or (2) re-run SAP with the as-tested 9.2 value and demonstrate compliance via offsetting measures (better SCOP for the heat pump, additional PV, enhanced lighting). Both must be evidenced before Building Control sign-off.
              </>
            }
            whyItMatters={
              <>
                Air permeability is the headline number Building Control look at — and it cannot be wished away. Designing to 5 with no contingency means every plot becomes a gamble. Best practice is to design to 4 on paper, allow 1 for site execution drift, and target ≤5 measured.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "U-values measured in W/m²K — lower is better. Limiting values are absolute, not negotiable.",
              "Ψ-values (linear thermal bridges) calculated to BR 497 / ISO 10211 or taken from Accredited Construction Details.",
              "Air permeability tested per ATTMA TSL1 (dwellings) or TSL2 (non-dom) — 50 Pa pressure differential.",
              "Notional dwelling = 5 m³/h·m² air permeability; legal limit = 8.",
              "Service penetrations are the largest single leakage source — coordinate sealing details with M&E containment.",
              "Always design with a margin: target U-values 10-15% better than limiting, air permeability 1-2 m³/h·m² better.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                SBEM calculations
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Air permeability
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section1_3;
