/**
 * Module 6 · Section 6 · Subsection 2 — Fabric First Approach
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Building envelope optimisation, insulation strategies, thermal bridging reduction, and airtightness for low-energy buildings
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

const TITLE = 'Fabric First Approach - HNC Module 6 Section 6.2';
const DESCRIPTION =
  'Master the fabric first approach for building services: building envelope optimisation, insulation strategies, thermal bridging reduction, airtightness, and impact on HVAC system sizing.';

const quickCheckQuestions = [
  {
    id: 'fabric-first-definition',
    question: "What is the 'fabric first' approach to building design?",
    options: [
      'Specifying the largest possible heating system to guarantee comfort',
      'Choosing renewable generation before considering any other measure',
      'Selecting the cheapest building materials to reduce capital cost',
      'Prioritising building envelope performance before considering active systems',
    ],
    correctIndex: 3,
    explanation:
      'The fabric first approach prioritises optimising the building envelope (walls, roof, floor, windows) to minimise heating and cooling demand before specifying active mechanical and electrical systems.',
  },
  {
    id: 'thermal-bridging',
    question: 'What is a thermal bridge in building construction?',
    options: [
      'A structural beam that carries the load across a window opening',
      'An area where heat transfers more readily through the building envelope',
      'A duct that connects the supply and extract sides of an MVHR unit',
      'A membrane that prevents moisture passing through the insulation layer',
    ],
    correctIndex: 1,
    explanation:
      'A thermal bridge is an area of the building envelope where heat transfers more readily than through adjacent areas, typically at junctions, around windows, or where structural elements penetrate insulation.',
  },
  {
    id: 'airtightness-target',
    question: 'What is a typical enhanced airtightness target for a fabric first dwelling?',
    options: [
      '3 m³/h/m² @ 50Pa or less',
      '5 m³/h/m² @ 50Pa',
      '10 m³/h/m² @ 50Pa',
      '15 m³/h/m² @ 50Pa',
    ],
    correctIndex: 0,
    explanation:
      'Enhanced airtightness targets for fabric first dwellings are typically 3 m³/h/m² @ 50Pa or less, compared to Building Regulations minimum of 10 m³/h/m² @ 50Pa. Passivhaus requires 0.6 ACH @ 50Pa.',
  },
  {
    id: 'system-sizing-impact',
    question: 'How does a fabric first approach affect HVAC system sizing?',
    options: [
      'Systems must be much larger to overcome the increased insulation',
      'System size is unaffected because loads stay the same',
      'Systems can be significantly smaller due to reduced loads',
      'Heating systems are no longer required at all in any climate',
    ],
    correctIndex: 2,
    explanation:
      'A fabric first approach significantly reduces heating and cooling loads, allowing HVAC systems to be much smaller. This reduces capital costs, running costs, and carbon emissions from building services.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the recommended U-value target for walls in a fabric first new-build dwelling?',
    options: [
      '0.30 W/m²K (Building Regulations minimum)',
      '0.18 W/m²K or better',
      '0.15 W/m²K (Passivhaus standard)',
      '0.10 W/m²K',
    ],
    correctAnswer: 1,
    explanation:
      'Enhanced fabric first designs typically target wall U-values of 0.18 W/m²K or better, significantly exceeding the Building Regulations Part L minimum of 0.26-0.30 W/m²K. Passivhaus standard requires 0.10-0.15 W/m²K.',
  },
  {
    id: 2,
    question: 'Which insulation strategy provides the most consistent thermal performance?',
    options: [
      'Internal wall insulation (IWI)',
      'Cavity wall insulation only',
      'External wall insulation (EWI)',
      'Partial fill cavity batts',
    ],
    correctAnswer: 2,
    explanation:
      'External wall insulation (EWI) provides the most consistent thermal performance as it wraps the building in a continuous insulation layer, eliminating thermal bridges at floor/wall junctions and protecting the structure from thermal stress.',
  },
  {
    id: 3,
    question: 'What is the psi value (ψ) used to measure in building design?',
    options: [
      'The whole-window U-value including the frame',
      'The air permeability of the building envelope',
      'The solar gain through a glazed opening',
      'Linear thermal transmittance at junctions',
    ],
    correctAnswer: 3,
    explanation:
      'Psi values (ψ) measure linear thermal transmittance at junctions and thermal bridges, expressed in W/mK. Lower psi values indicate better thermal bridge detailing. Accredited construction details (ACDs) provide standardised psi values.',
  },
  {
    id: 4,
    question: 'What air permeability does Passivhaus certification require?',
    options: [
      '0.6 air changes per hour @ 50Pa',
      '3 air changes per hour @ 50Pa',
      '5 air changes per hour @ 50Pa',
      '10 air changes per hour @ 50Pa',
    ],
    correctAnswer: 0,
    explanation:
      'Passivhaus requires airtightness of 0.6 air changes per hour (ACH) at 50Pa pressure, which is significantly more stringent than UK Building Regulations. This typically equates to around 0.3-0.5 m³/h/m² depending on building geometry.',
  },
  {
    id: 5,
    question:
      'Why is MVHR (Mechanical Ventilation with Heat Recovery) essential in airtight buildings?',
    options: [
      'It generates electricity from the warm exhaust air leaving the building',
      'Airtight buildings cannot rely on infiltration for ventilation',
      'It increases the air leakage so the building can breathe naturally',
      'It removes the need for any insulation in the building envelope',
    ],
    correctAnswer: 1,
    explanation:
      'In airtight buildings, natural infiltration is insufficient for adequate ventilation. MVHR provides controlled ventilation while recovering 85-95% of heat from exhaust air, maintaining indoor air quality without significant heat loss.',
  },
  {
    id: 6,
    question: 'What is the typical U-value requirement for windows in a fabric first approach?',
    options: [
      '2.0 W/m²K (Building Regulations minimum)',
      '1.4 W/m²K (standard double glazing)',
      '1.0 W/m²K or better (triple glazing)',
      '0.5 W/m²K',
    ],
    correctAnswer: 2,
    explanation:
      'Fabric first designs typically specify triple-glazed windows with U-values of 1.0 W/m²K or better. This compares to Building Regulations minimum of 1.4 W/m²K for replacement windows and 1.6 W/m²K for new-build.',
  },
  {
    id: 7,
    question: 'How does thermal mass interact with the fabric first approach?',
    options: [
      'Thermal mass increases air leakage and so must be avoided',
      'Thermal mass replaces the need for insulation in the walls',
      'Thermal mass only matters when placed outside the insulation layer',
      'Internal thermal mass moderates temperature swings and reduces peak loads',
    ],
    correctAnswer: 3,
    explanation:
      'Internal thermal mass (concrete floors, masonry walls) moderates temperature fluctuations by absorbing and releasing heat slowly. This reduces peak heating and cooling loads and improves comfort, but must be inside the insulation layer to be effective.',
  },
  {
    id: 8,
    question: "What is the 'performance gap' in building energy use?",
    options: [
      'The difference between design predictions and actual measured performance',
      'The difference in U-value between the walls and the roof',
      'The gap left in the cavity to allow the insulation to breathe',
      'The time delay between switching on the heating and reaching comfort',
    ],
    correctAnswer: 0,
    explanation:
      'The performance gap refers to the often significant difference between predicted (designed) energy performance and actual measured consumption. Fabric first approaches with careful detailing and quality control help close this gap.',
  },
  {
    id: 9,
    question:
      'What heating system capacity might be appropriate for a well-designed 100m² fabric first dwelling?',
    options: [
      '15-20 kW (standard sizing)',
      '2-4 kW',
      '6-8 kW',
      '10-12 kW',
    ],
    correctAnswer: 1,
    explanation:
      'A well-designed fabric first dwelling of 100m² might only require 2-4 kW of heating capacity, compared to 10-15 kW for a standard build. This enables use of smaller, more efficient heat pumps and lower distribution temperatures.',
  },
  {
    id: 10,
    question: 'What is the primary purpose of a continuous air barrier in construction?',
    options: [
      'To provide the main structural support for the building',
      'To act as the principal layer of thermal insulation',
      'To prevent uncontrolled air leakage through the building envelope',
      'To carry rainwater away from the external wall surface',
    ],
    correctAnswer: 2,
    explanation:
      'The primary purpose of a continuous air barrier is to prevent uncontrolled air leakage. While some membranes combine air and vapour control functions, the air barrier specifically controls convective heat loss and prevents draughts.',
  },
  {
    id: 11,
    question: 'Which construction detail typically has the highest risk of thermal bridging?',
    options: [
      'Centre of external wall',
      'Centre of floor slab',
      'Middle of roof insulation',
      'Window sill and jamb junctions',
    ],
    correctAnswer: 3,
    explanation:
      'Window sill and jamb junctions are high-risk thermal bridging areas due to the complexity of joining different materials and the need to support window frames. Careful detailing with insulated frames and thermal breaks is essential.',
  },
  {
    id: 12,
    question: 'What is the typical space heating demand target for a Passivhaus building?',
    options: [
      '15 kWh/m²/year or less',
      '100 kWh/m²/year',
      '50 kWh/m²/year',
      '25 kWh/m²/year',
    ],
    correctAnswer: 0,
    explanation:
      'Passivhaus certification requires space heating demand of 15 kWh/m²/year or less. This is achieved through excellent fabric performance (low U-values, minimal thermal bridging, exceptional airtightness) combined with MVHR.',
  },
];

const faqs = [
  {
    question: 'How does fabric first affect the choice of heating system?',
    answer:
      'Fabric first dramatically reduces heating loads, making low-temperature systems like air source heat pumps (ASHPs) more viable. With peak loads of 2-4 kW instead of 10-15 kW, smaller heat pumps operate more efficiently, underfloor heating works at lower temperatures (35-40°C vs 45-55°C), and even direct electric heating becomes cost-effective in very low-energy buildings. The reduced demand also means renewable generation can cover a larger proportion of needs.',
  },
  {
    question: 'What are the cost implications of fabric first versus standard construction?',
    answer:
      "While fabric first increases envelope costs (typically 5-15% more for insulation, windows, and airtightness detailing), this is offset by reduced mechanical system sizes. A Passivhaus dwelling might need only a 3 kW heat source versus 12 kW, saving thousands on equipment. Running costs are 60-80% lower, and there's reduced maintenance with simpler systems. The whole-life cost is typically lower, with payback within 10-15 years even before considering comfort and health benefits.",
  },
  {
    question: 'How do you achieve good airtightness on site?',
    answer:
      'Airtightness requires a continuous air barrier strategy: (1) Designate one layer as the air barrier (often the internal plasterboard or a dedicated membrane), (2) Plan all penetrations and junctions at design stage, (3) Use appropriate tapes, gaskets, and sealants at all joints, (4) Conduct interim airtightness tests during construction, (5) Train all trades on the importance of maintaining the air barrier. Common failure points include service penetrations, window/door frames, and junctions between different construction elements.',
  },
  {
    question: 'Can fabric first principles be applied to existing buildings?',
    answer:
      'Yes, through deep retrofit approaches. External wall insulation (EWI) is often the most effective as it maintains internal floor area and reduces thermal bridging. Internal insulation, floor insulation, loft insulation improvements, and window upgrades all contribute. Achieving very low airtightness in existing buildings is challenging due to hidden junctions, but significant improvements are possible. The EnerPHit standard provides Passivhaus-level targets specifically for retrofit projects.',
  },
  {
    question: 'What ventilation strategy is required for fabric first buildings?',
    answer:
      'Highly airtight buildings require mechanical ventilation - relying on infiltration would cause poor indoor air quality. MVHR (Mechanical Ventilation with Heat Recovery) is the standard choice, providing fresh filtered air while recovering 85-95% of heat from exhaust air. The ventilation system becomes a critical component, requiring proper commissioning, maintenance, and user education. Summer bypass functions prevent overheating by allowing cool night air to enter directly.',
  },
];

const HNCModule6Section6_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 2"
            title="Fabric First Approach"
            description="Building envelope optimisation, insulation strategies, thermal bridging reduction, and airtightness for low-energy buildings"
            tone="purple"
          />

          <TLDR
            points={[
              "Fabric first prioritises the building envelope (insulation, airtightness, glazing, thermal bridging) before sizing M&E systems — minimising the load to be served, not maximising the kit to serve it.",
              "Higher-spec fabric reduces peak heating and cooling loads, allowing smaller plant, smaller distribution, smaller risers and lower lifetime energy use — capital saved on M&E offsets fabric cost.",
              "Passivhaus (Passive House) is the gold-standard fabric-first methodology — annual heating demand ≤15 kWh/m²/year, primary energy ≤120 kWh/m²/year, air permeability ≤0.6 ACH at 50 Pa.",
            ]}
          />

          <RegsCallout
            source="Passivhaus Institut Standard + LETI Climate Emergency Design Guide"
            clause="A Passivhaus-certified building shall achieve a maximum specific heat demand of 15 kWh/m²/year (or maximum heating load of 10 W/m²), a maximum primary energy renewable demand of 60 kWh/m²/year (PHI 2015 standard) or 75 kWh/m²/year (PHPP 2021), and an air permeability of no greater than 0.6 air changes per hour at 50 Pa pressure differential. Compliance shall be demonstrated through PHPP calculation supported by certificate from a PHI-accredited certifier."
            meaning={
              <>
                Passivhaus is the most rigorous mainstream fabric-first standard. The 0.6 ACH airtightness target is roughly 8× tighter than Part L's 5 m³/h·m². The capital premium (typically 5–15% on construction cost) is offset by operational savings, smaller M&E systems, and increasing market valuation premium for certified Passivhaus dwellings.
              </>
            }
            cite="Source: Passivhaus Institut Standard (current edition) — passivehouse.com; LETI Climate Emergency Design Guide (2020) — leti.london"
          />

          <LearningOutcomes
            outcomes={[
              "Apply fabric first principles and the energy hierarchy",
              "Specify enhanced insulation levels and U-value targets",
              "Design thermal bridge-free construction details",
              "Implement airtightness strategies and testing protocols",
              "Select appropriate window specifications for low-energy buildings",
              "Calculate reduced system sizing based on fabric performance",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Fabric First Hierarchy">
            <p>The fabric first approach follows a clear hierarchy: reduce energy demand through building fabric before considering active systems and renewable generation. This fundamentally changes how we approach building services design, as a well-designed envelope dramatically reduces system requirements.</p>
            <p><strong>Energy Hierarchy (in order of priority):</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Be lean:</strong> Reduce demand through excellent fabric and passive design</li>
              <li><strong>2. Be clean:</strong> Use efficient systems with low-carbon energy sources</li>
              <li><strong>3. Be green:</strong> Generate renewable energy on-site</li>
              <li><strong>4. Be seen:</strong> Monitor, display, and optimise performance</li>
            </ul>
            <p><strong>Fabric First Design Principles</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Compact form:</strong> Minimise surface area to volume ratio — Reduces heat loss area</li>
              <li><strong>Superinsulation:</strong> U-values 2-3x better than regulations — Minimises transmission losses</li>
              <li><strong>Thermal bridge-free:</strong> Continuous insulation envelope — Eliminates cold spots and condensation</li>
              <li><strong>Airtightness:</strong> Sealed envelope with controlled ventilation — Prevents infiltration losses</li>
              <li><strong>Solar optimisation:</strong> South-facing glazing, appropriate shading — Free heating gains, overheating control</li>
            </ul>
            <p><strong>Key principle:</strong> Every kilowatt-hour of demand avoided is worth more than a kilowatt-hour generated - savings are guaranteed for the building's lifetime.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Enhanced Insulation and U-Value Targets">
            <p>Fabric first designs significantly exceed Building Regulations minimum U-values. The additional insulation cost is offset by smaller mechanical systems and dramatically reduced running costs over the building's lifetime.</p>
            <p><strong>U-Value Comparison (W/m²K)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>External walls:</strong> 0.26 — 0.15-0.18 — 0.10-0.15</li>
              <li><strong>Roof:</strong> 0.16 — 0.10-0.13 — 0.08-0.12</li>
              <li><strong>Ground floor:</strong> 0.18 — 0.10-0.15 — 0.08-0.12</li>
              <li><strong>Windows:</strong> 1.6 (whole window) — 0.8-1.2 — 0.8 or better</li>
              <li><strong>Doors:</strong> 1.6 — 1.0-1.2 — 0.8</li>
            </ul>
            <p><strong>Insulation Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mineral wool (λ = 0.032-0.044)</li>
              <li>PIR/PUR boards (λ = 0.022-0.028)</li>
              <li>Phenolic foam (λ = 0.018-0.022)</li>
              <li>Wood fibre (λ = 0.038-0.043)</li>
            </ul>
            <p><strong>Wall Build-Up Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full-fill cavity (300mm+)</li>
              <li>External insulation (EWI)</li>
              <li>Internal insulation (IWI)</li>
              <li>SIPs / ICF systems</li>
            </ul>
            <p><strong>Thickness Required</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Walls: 200-300mm</li>
              <li>Roof: 300-400mm</li>
              <li>Floor: 150-250mm</li>
              <li>Varies by λ value</li>
            </ul>
            <p><strong>Design consideration:</strong> Thicker insulation affects internal dimensions, foundation depths, and eaves details - coordinate with architect early in design.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Thermal Bridging and Airtightness">
            <p>Even with excellent insulation, thermal bridges and air leakage can account for 30-50% of heat loss in a building. Addressing these requires careful design detailing and rigorous site quality control.</p>
            <p><strong>Common Thermal Bridge Locations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Wall-to-floor junctions</li>
              <li>• Wall-to-roof junctions</li>
              <li>• Window and door reveals</li>
              <li>• Lintels and sills</li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Balcony connections</li>
              <li>• Steel beam penetrations</li>
              <li>• Corner junctions</li>
              <li>• Service penetrations</li>
            </ul>
            <p><strong>Thermal Bridge Solutions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Window reveals:</strong> Frame in contact with masonry — Insulated frames, return insulation</li>
              <li><strong>Lintels:</strong> Steel conducts heat — Insulated lintels, thermally broken</li>
              <li><strong>Floor junction:</strong> Concrete slab bridges cavity — Perimeter insulation, thermal breaks</li>
              <li><strong>Balconies:</strong> Slab extends through envelope — Thermal break connectors (Isokorb)</li>
            </ul>
            <p><strong>Airtightness Targets and Testing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Building Regulations:</strong> 10 m³/h/m² @ 50Pa (minimum backstop)</li>
              <li><strong>Part L 2021 notional:</strong> 5 m³/h/m² @ 50Pa</li>
              <li><strong>Enhanced fabric first:</strong> 3 m³/h/m² @ 50Pa or better</li>
              <li><strong>Passivhaus:</strong> 0.6 ACH @ 50Pa (approx. 0.3-0.5 m³/h/m²)</li>
            </ul>
            <p><strong>Air Barrier Strategy</strong></p>
            <p>The air barrier must be continuous, robust, and durable:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Identify one layer as the designated air barrier (membrane or wet plaster)</li>
              <li>• Tape all joints and laps with appropriate airtightness tape</li>
              <li>• Use grommets or proprietary seals for service penetrations</li>
              <li>• Seal around window and door frames with expanding foam and tape</li>
              <li>• Conduct interim air pressure tests before finishes conceal problems</li>
            </ul>
            <p><strong>Critical point:</strong> Airtightness must be achieved during construction - retrofitting a continuous air barrier after completion is extremely difficult.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Impact on Building Services Design">
            <p>A fabric first approach fundamentally changes building services requirements. With heat losses reduced by 60-80%, system sizing, selection, and distribution strategies are transformed. This creates opportunities for simpler, smaller, and more efficient installations.</p>
            <p><strong>Heating System Sizing Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard build:</strong> 80-100 W/m² — 10-15 kW — 80-120 kWh/m²/yr</li>
              <li><strong>Part L 2021 compliant:</strong> 50-70 W/m² — 6-8 kW — 50-70 kWh/m²/yr</li>
              <li><strong>Enhanced fabric first:</strong> 25-35 W/m² — 3-4 kW — 25-40 kWh/m²/yr</li>
              <li><strong>Passivhaus:</strong> 10-15 W/m² — 1-2 kW — ≤15 kWh/m²/yr</li>
            </ul>
            <p><strong>Heating System Implications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Smaller heat pumps operate more efficiently</li>
              <li>Lower flow temperatures (35-45°C) viable</li>
              <li>Radiators can be smaller or replaced by UFH</li>
              <li>Post-heater on MVHR may suffice</li>
              <li>No boiler room required in some cases</li>
            </ul>
            <p><strong>Ventilation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MVHR essential (85-95% heat recovery)</li>
              <li>Duct routing needs early coordination</li>
              <li>Summer bypass for free cooling</li>
              <li>Acoustic treatment at air terminals</li>
              <li>Accessible for filter maintenance</li>
            </ul>
            <p><strong>Passivhaus Window Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• <strong>U-value:</strong> 0.80 W/m²K or better (whole window including frame)</li>
              <li>• <strong>Glazing:</strong> Triple glazing with low-e coatings, argon or krypton fill</li>
              <li>• <strong>Frame:</strong> Thermally broken or insulated composite frames</li>
              <li>• <strong>Installation:</strong> Positioned in insulation zone, not on masonry</li>
              <li>• <strong>Solar gain (g-value):</strong> 0.5 or higher for passive solar heating</li>
            </ul>
            <p><strong>Design integration:</strong> Building services engineers must collaborate with architects from concept stage - fabric performance directly determines system requirements and vice versa.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: U-Value and Heat Loss Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate wall heat loss for standard vs enhanced fabric first for 50m² wall area at ΔT = 25K.</p>
            <p>Standard wall (U = 0.26 W/m²K):</p>
            <p>Q = U × A × ΔT</p>
            <p>Q = 0.26 × 50 × 25 = 325 W</p>
            <p>Enhanced fabric first (U = 0.15 W/m²K):</p>
            <p>Q = 0.15 × 50 × 25 = 187.5 W</p>
            <p>Saving: 137.5 W (42% reduction)</p>
            <p>Over heating season (2000 hours):</p>
            <p>Annual saving = 137.5 × 2000 / 1000 = 275 kWh</p>
            <p>
              <strong>Example 2: Airtightness Impact on Infiltration Heat Loss</strong>
            </p>
            <p><strong>Scenario:</strong> Compare infiltration losses for a 250m³ dwelling at different airtightness levels.</p>
            <p>Heat loss from infiltration:</p>
            <p>Q = 0.33 × n × V × ΔT (where n = air changes/hour)</p>
            <p>At 10 m³/h/m² @ 50Pa (≈0.5 ACH natural):</p>
            <p>Q = 0.33 × 0.5 × 250 × 25 = 1031 W</p>
            <p>At 3 m³/h/m² @ 50Pa (≈0.15 ACH natural):</p>
            <p>Q = 0.33 × 0.15 × 250 × 25 = 309 W</p>
            <p>Saving: 722 W (70% reduction in infiltration loss)</p>
            <p>Note: MVHR required to maintain air quality</p>
            <p>
              <strong>Example 3: System Sizing for Fabric First Dwelling</strong>
            </p>
            <p><strong>Scenario:</strong> Size heating system for 120m² fabric first dwelling.</p>
            <p>Fabric performance:</p>
            <p>Walls: 80m² @ U=0.15 = 12 W/K</p>
            <p>Roof: 60m² @ U=0.12 = 7.2 W/K</p>
            <p>Floor: 60m² @ U=0.12 = 7.2 W/K</p>
            <p>Windows: 20m² @ U=0.85 = 17 W/K</p>
            <p>Thermal bridges (y-value 0.02): 280m² × 0.02 = 5.6 W/K</p>
            <p>Ventilation (MVHR 90%): 300m³ × 0.33 × 0.4 × 0.1 = 4 W/K</p>
            <p>Total heat loss coefficient: 53 W/K</p>
            <p>At design condition (ΔT = 25K):</p>
            <p>Peak load = 53 × 25 = 1325 W</p>
            <p>Heat pump sizing: 2-3 kW (with margin)</p>
            <p>Compare standard build: 8-12 kW required</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Fabric First Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Set U-value targets at project outset (consider Passivhaus or near-Passivhaus)</li>
              <li>Model thermal bridges using psi values - include in heat loss calculations</li>
              <li>Design continuous insulation and air barrier strategies</li>
              <li>Specify airtightness target and interim testing requirements</li>
              <li>Coordinate MVHR duct routing with structural and architectural design</li>
              <li>Size heating systems based on actual calculated loads, not rules of thumb</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Enhanced wall U-value: <strong>0.15-0.18 W/m²K</strong></li>
              <li>Passivhaus space heating: <strong>≤15 kWh/m²/year</strong></li>
              <li>Passivhaus airtightness: <strong>0.6 ACH @ 50Pa</strong></li>
              <li>MVHR heat recovery: <strong>85-95%</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Oversizing heating systems</strong> - use actual calculated loads, not standard ratios</li>
                <li><strong>Ignoring thermal bridges</strong> - can account for 30% of heat loss in well-insulated buildings</li>
                <li><strong>Late airtightness consideration</strong> - must be designed from concept stage</li>
                <li><strong>Forgetting summer overheating</strong> - excellent insulation works both ways</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Passivhaus heating system over-specified by M&E designer"
            situation={
              <>
                A 4-bed Passivhaus-certified detached house. The architect-led PHPP calculation shows peak heat load 8 W/m² = 1,600 W total. The M&E designer, used to conventional dwellings, specifies a 6 kW air-source heat pump and full radiator distribution. The system is grossly oversized, will short-cycle, and SCOP will be poor.
              </>
            }
            whatToDo={
              <>
                Re-design M&E to match Passivhaus heat load. Options: (1) tiny output ASHP (2.5–3 kW, the smallest commercially available) feeding a single underfloor zone or low-temperature radiators; (2) electric direct (small underfloor mat or panel heaters) — simpler but loses the heat-pump SCOP advantage; (3) MVHR with post-heater (heat pump heats supply air) — elegant for super-low-load Passivhaus but uncommon in UK practice. Specify a buffer to manage the heat-pump cycling. Verify with detailed simulation.
              </>
            }
            whyItMatters={
              <>
                Conventional M&E sizing assumes conventional fabric. Apply it to Passivhaus and you over-size by 3–5×, with terrible operational efficiency. Fabric-first design demands M&E-first re-thinking. The smallest commercial heat pumps in the UK are still too large for many true Passivhaus dwellings — the supply chain is catching up.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Fabric first = minimise the load before sizing the system.",
              "Passivhaus: ≤15 kWh/m²/year heating, ≤0.6 ACH airtightness, certified via PHPP.",
              "EnerPHit is the Passivhaus retrofit standard (≤25 kWh/m²/year).",
              "LETI Climate Emergency Design Guide sets net-zero-aligned targets.",
              "Capital premium 5–15% offset by smaller M&E + lower lifetime energy.",
              "M&E sizing must follow fabric — conventional rules over-size by 3–5× for Passivhaus.",
              "Continuous insulation + thermal bridge calculation + airtightness + MVHR = the four pillars.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Passive design principles
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Integrated design process
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section6_2;
