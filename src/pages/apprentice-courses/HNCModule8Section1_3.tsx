/**
 * Module 8 · Section 1 · Subsection 3 — Underfloor Heating
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Wet UFH system design, manifold configuration, pipe layouts and commissioning for building services
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

const TITLE = 'Underfloor Heating - HNC Module 8 Section 1.3';
const DESCRIPTION =
  'Master underfloor heating systems for building services: UFH design principles, manifold systems, pipe layouts, zone control, screed requirements and commissioning procedures.';

const quickCheckQuestions = [
  {
    id: 'ufh-flow-temp',
    question: 'What is the typical maximum flow temperature for wet underfloor heating systems?',
    options: ['35°C', '45°C', '55°C', '65°C'],
    correctIndex: 2,
    explanation:
      'Wet UFH systems typically operate at a maximum flow temperature of 55°C to prevent thermal discomfort and floor covering damage. Heat pumps may use lower temperatures (35-45°C) for improved efficiency.',
  },
  {
    id: 'pipe-spacing',
    question: 'What is the standard pipe spacing for UFH in a well-insulated living area?',
    options: ['100mm', '150mm', '200mm', '300mm'],
    correctIndex: 2,
    explanation:
      '200mm pipe spacing is standard for well-insulated living areas. Higher heat loss areas like bathrooms may use 150mm spacing, whilst lower output areas might use 250-300mm.',
  },
  {
    id: 'manifold-purpose',
    question: 'What is the primary purpose of the UFH manifold?',
    options: [
      'Heat generation',
      'Water storage',
      'Flow distribution and zone control',
      'Pressure boosting',
    ],
    correctIndex: 2,
    explanation:
      'The manifold distributes heated water to individual UFH circuits and provides zone control through flow meters, actuators and isolation valves. It is the central control point for multi-zone systems.',
  },
  {
    id: 'screed-depth',
    question:
      'What is the minimum screed depth over UFH pipes in a traditional sand/cement screed?',
    options: ['25mm', '50mm', '65mm', '75mm'],
    correctIndex: 2,
    explanation:
      'A minimum of 65mm screed depth over UFH pipes is required for traditional sand/cement screeds to provide adequate thermal mass and structural integrity. The total screed depth is typically 65-75mm.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What heat output (W/m²) can a wet UFH system typically achieve with 55°C flow temperature?',
    options: ['50-70 W/m²', '80-100 W/m²', '120-150 W/m²', '180-200 W/m²'],
    correctAnswer: 1,
    explanation:
      'Wet UFH systems with 55°C flow temperature can typically achieve 80-100 W/m². This is sufficient for most well-insulated buildings where heat loss is typically 40-60 W/m².',
  },
  {
    id: 2,
    question: 'What is the maximum recommended circuit length for 16mm PE-X pipe in UFH?',
    options: ['60m', '80m', '100m', '120m'],
    correctAnswer: 2,
    explanation:
      'Maximum circuit length for 16mm PE-X pipe is typically 100m to maintain adequate flow rates and minimise pressure drop. Longer circuits require larger diameter pipes or must be split into multiple circuits.',
  },
  {
    id: 3,
    question: 'Which pipe layout pattern provides the most uniform heat distribution?',
    options: [
      'Serpentine (single)',
      'Bi-directional serpentine',
      'Spiral (snail)',
      'Random pattern',
    ],
    correctAnswer: 2,
    explanation:
      'The spiral (snail) pattern alternates flow and return pipes, providing the most uniform floor surface temperature. Serpentine patterns create temperature gradients across the floor.',
  },
  {
    id: 4,
    question: 'What is the tog value limit for floor coverings over UFH?',
    options: ['0.5 tog', '1.0 tog', '1.5 tog', '2.5 tog'],
    correctAnswer: 2,
    explanation:
      'Floor coverings should have a combined tog value of no more than 1.5 tog (thermal resistance of 0.15 m²K/W) to ensure adequate heat transfer. Higher tog values significantly reduce heat output.',
  },
  {
    id: 5,
    question: 'What type of actuator is typically used for UFH zone control?',
    options: [
      'Pneumatic actuator',
      'Thermal wax actuator',
      'Electric motor actuator',
      'Solenoid valve',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal wax actuators (thermostatic heads) are most common for UFH zone valves. They operate on 24V or 230V AC, slowly opening/closing over 3-5 minutes to prevent water hammer.',
  },
  {
    id: 6,
    question: 'What is the purpose of a mixing valve in a UFH system fed from a boiler?',
    options: [
      'To increase water pressure',
      'To reduce flow temperature from boiler temperature to UFH temperature',
      'To filter the water',
      'To measure flow rate',
    ],
    correctAnswer: 1,
    explanation:
      'The mixing valve (thermostatic or 3-port) blends boiler return water with flow water to reduce the typical 70-80°C boiler temperature to the required 35-55°C for UFH.',
  },
  {
    id: 7,
    question: 'How should UFH circuits be balanced during commissioning?',
    options: [
      'By trial and error',
      'Using flow meters to achieve design flow rates',
      'By adjusting room thermostats',
      'Balancing is not required for UFH',
    ],
    correctAnswer: 1,
    explanation:
      'UFH circuits are balanced using the integral flow meters on the manifold to achieve design flow rates. Each circuit requires a specific flow rate based on heat output and temperature differential.',
  },
  {
    id: 8,
    question:
      'What is the minimum drying/commissioning period for a traditional sand/cement screed before full UFH operation?',
    options: ['7 days', '14 days', '21 days', '28 days'],
    correctAnswer: 2,
    explanation:
      'Traditional sand/cement screed requires a minimum 21-day curing period before commissioning. The initial heating cycle then takes 7-14 days, starting at 20°C and increasing by 5°C daily.',
  },
  {
    id: 9,
    question: 'What is the maximum floor surface temperature recommended for occupied spaces?',
    options: ['24°C', '27°C', '29°C', '32°C'],
    correctAnswer: 2,
    explanation:
      'Maximum floor surface temperature should not exceed 29°C in occupied spaces for comfort and safety. Peripheral zones (under windows) may operate at up to 35°C.',
  },
  {
    id: 10,
    question: 'What pipe material is most commonly used for wet UFH systems?',
    options: ['Copper', 'PVC', 'PE-X (cross-linked polyethylene)', 'Stainless steel'],
    correctAnswer: 2,
    explanation:
      'PE-X (cross-linked polyethylene) is the most common UFH pipe material due to its flexibility, oxygen barrier properties, long service life, and resistance to scaling and corrosion.',
  },
  {
    id: 11,
    question: 'What is the typical operating temperature differential (delta T) for UFH systems?',
    options: ['5°C', '10°C', '15°C', '20°C'],
    correctAnswer: 1,
    explanation:
      'UFH systems typically operate with a 10°C temperature differential (e.g., 45°C flow, 35°C return). This is lower than radiator systems and requires higher flow rates for the same heat output.',
  },
  {
    id: 12,
    question: 'How should insulation be installed below UFH pipes?',
    options: [
      'Insulation is optional',
      '25mm minimum insulation with foil facing upward',
      '50mm minimum insulation with perimeter strip',
      '100mm minimum without edge insulation',
    ],
    correctAnswer: 2,
    explanation:
      'A minimum of 50mm rigid insulation should be installed below UFH pipes with perimeter edge insulation strips. This minimises downward heat loss and ensures heat is directed upward into the room.',
  },
];

const faqs = [
  {
    question: 'Can underfloor heating work with heat pumps?',
    answer:
      'Yes, UFH is ideal for heat pumps due to its low operating temperatures. Air source heat pumps achieve optimal efficiency (COP 3-4) at 35-45°C flow temperatures, which is well within UFH operating range. The large floor area acts as a low-temperature radiator, maximising heat pump performance.',
  },
  {
    question: 'How do I calculate the number of UFH circuits required?',
    answer:
      'Divide the total floor area by the area covered by one circuit (typically 15-20m² for residential). Consider maximum circuit lengths (100m for 16mm pipe), zone requirements, and manifold capacity. Each zone requiring individual temperature control needs a separate circuit and actuator.',
  },
  {
    question: 'What happens if UFH pipes are damaged during construction?',
    answer:
      'PE-X pipes can be repaired using manufacturer-approved couplings, but joints should be avoided where possible. Damage should be identified during pressure testing (6 bar for 2 hours minimum) before screed is laid. Document any repairs in the system records.',
  },
  {
    question: 'How does UFH affect floor covering choices?',
    answer:
      'Floor coverings must have a combined tog value below 1.5 tog. Solid hardwood may require engineered alternatives due to expansion/contraction. Carpet and underlay must be UFH-rated. Vinyl and tiles work well but adhesives must be rated for higher temperatures.',
  },
  {
    question: 'What are the electrical requirements for UFH controls?',
    answer:
      'Zone actuators typically require 230V AC or 24V AC from a wiring centre. Room thermostats may be wired (230V or low voltage) or wireless. The wiring centre coordinates pump, boiler and zone valve operation. Always follow manufacturer wiring diagrams.',
  },
  {
    question: 'How long does underfloor heating take to respond to temperature changes?',
    answer:
      'Due to the thermal mass of the screed, UFH has a slow response time of 2-4 hours. This requires anticipating heating needs through programmable thermostats or weather compensation controls. Quick-response screeds (anhydrite) can reduce this to 1-2 hours.',
  },
];

const HNCModule8Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 1 · Subsection 3"
            title="Underfloor Heating"
            description="Wet UFH system design, manifold configuration, pipe layouts and commissioning for building services"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Understand wet UFH system design principles and heat output calculations",
              "Specify manifold components and understand flow distribution",
              "Design pipe layouts using spiral and serpentine patterns",
              "Configure zone control systems with actuators and thermostats",
              "Specify screed requirements for thermal mass and floor finishes",
              "Commission UFH systems following correct curing and heat-up procedures",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="UFH Design Principles">
            <p>Wet underfloor heating uses warm water circulating through pipes embedded in the floor structure to provide radiant heat. The large surface area allows operation at low temperatures, making UFH highly efficient and compatible with heat pumps and condensing boilers.</p>
            <p><strong>Key design parameters:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Flow temperature:</strong> 35-55°C (lower with heat pumps)</li>
              <li><strong>Return temperature:</strong> Typically 10°C below flow (delta T = 10K)</li>
              <li><strong>Floor surface temperature:</strong> Maximum 29°C occupied areas, 35°C perimeter zones</li>
              <li><strong>Heat output:</strong> 80-100 W/m² at 55°C flow, reducing at lower temperatures</li>
            </ul>
            <p><strong>Heat Output Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>35°C:</strong> 40-50 W/m² — Heat pump, Passivhaus</li>
              <li><strong>45°C:</strong> 60-75 W/m² — Heat pump, well-insulated</li>
              <li><strong>55°C:</strong> 80-100 W/m² — Boiler, standard insulation</li>
              <li><strong>60°C:</strong> 100-120 W/m² — High heat loss areas</li>
            </ul>
            <p><strong>Pipe Spacing and Heat Output</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100mm:</strong> +20% — High heat loss, bathrooms</li>
              <li><strong>150mm:</strong> +10% — Perimeter zones, conservatories</li>
              <li><strong>200mm:</strong> Standard — Living areas, bedrooms</li>
              <li><strong>250-300mm:</strong> -10 to -15% — Low heat loss areas, corridors</li>
            </ul>
            <p><strong>Design principle:</strong> Heat output must exceed room heat loss. Calculate using Q = U × A × ΔT where Q is heat loss (W), U is U-value, A is area, and ΔT is inside-outside temperature difference.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Manifold Systems">
            <p>The manifold is the heart of a wet UFH system, distributing heated water to individual circuits and enabling zone control. Proper manifold specification and installation is critical for balanced, efficient operation.</p>
            <p><strong>Manifold Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Flow bar:</strong> Distributes heated water with flow meters for balancing</li>
              <li><strong>Return bar:</strong> Collects return water with isolation valves</li>
              <li><strong>Actuator connections:</strong> Accepts thermal or electric actuators for zone control</li>
              <li><strong>Isolation valves:</strong> Allow individual circuit shutdown</li>
              <li><strong>Fill/drain valves:</strong> For system commissioning and maintenance</li>
              <li><strong>Air vents:</strong> Automatic air release for de-aeration</li>
              <li><strong>Temperature gauges:</strong> Flow and return temperature indication</li>
            </ul>
            <p><strong>Manifold Sizing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Residential:</strong> 2-12 port manifolds typical</li>
              <li><strong>Commercial:</strong> Multiple manifolds may be required</li>
              <li><strong>Flow capacity:</strong> Check maximum flow rate per port</li>
              <li><strong>Mounting:</strong> Wall-mounted cabinet or surface mounted</li>
            </ul>
            <p><strong>Mixing Valve Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Thermostatic mixing:</strong> Fixed temperature, simple</li>
              <li><strong>3-port motorised:</strong> Weather compensation capable</li>
              <li><strong>Pump and mixing unit:</strong> Integrated solution</li>
              <li><strong>Direct connection:</strong> Heat pump at UFH temperature</li>
            </ul>
            <p><strong>Flow Meter Reading and Balancing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Small (10-15m²):</strong> 1.0-1.5 l/min — 0.5-2.0 l/min</li>
              <li><strong>Medium (15-20m²):</strong> 1.5-2.5 l/min — 1.0-3.0 l/min</li>
              <li><strong>Large (20-25m²):</strong> 2.5-3.5 l/min — 2.0-4.0 l/min</li>
            </ul>
            <p><strong>Flow rate formula:</strong> Q (l/min) = Heat output (W) ÷ (ΔT × 70). For a 1500W circuit with 10K ΔT: Q = 1500 ÷ (10 × 70) = 2.1 l/min</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Pipe Layouts and Zone Control">
            <p>Pipe layout pattern affects heat distribution uniformity and installation complexity. Zone control enables individual room temperature regulation through actuators controlled by room thermostats.</p>
            <p><strong>Pipe Layout Patterns</strong></p>
            <p><strong>Spiral (Snail) Pattern</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Flow and return pipes alternate</li>
              <li>Most uniform floor temperature</li>
              <li>Preferred for occupied spaces</li>
              <li>More complex to install</li>
            </ul>
            <p><strong>Serpentine Pattern</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simpler installation</li>
              <li>Temperature gradient across floor</li>
              <li>Suitable for smaller areas</li>
              <li>Bi-directional reduces gradient</li>
            </ul>
            <p><strong>Zone Control Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Thermal actuators:</strong> 230V or 24V, normally closed, 3-5 minute operation time</li>
              <li><strong>Room thermostats:</strong> Digital, programmable, or smart thermostats with setback</li>
              <li><strong>Wiring centre:</strong> Coordinates actuators, pump, and boiler demand</li>
              <li><strong>Pump logic:</strong> Pump runs when any zone calls for heat</li>
              <li><strong>Boiler interlock:</strong> Boiler fires only when pump running and zone demanding</li>
            </ul>
            <p><strong>Actuator Wiring Configurations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Thermal wax:</strong> 230V AC — NC, slow open — Most common, simple wiring</li>
              <li><strong>Thermal wax:</strong> 24V AC — NC, slow open — Safer, requires transformer</li>
              <li><strong>Electric motor:</strong> 230V AC — Fast, end switches — Position feedback available</li>
            </ul>
            <p><strong>Wiring Centre Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Receives demand signals from room thermostats</li>
              <li>Powers corresponding zone actuators</li>
              <li>Provides pump switched live when any zone is calling</li>
              <li>Provides boiler enable signal for interlock</li>
              <li>May include time clock for overall system scheduling</li>
            </ul>
            <p><strong>Important:</strong> Zone valve actuators require adequate open time before the pump starts. Use a 2-minute pump delay or end-switch actuators to prevent pumping against closed valves.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Screed Requirements and Commissioning">
            <p>The floor screed provides thermal mass for even heat distribution and structural support for floor finishes. Proper screed specification and curing is essential before UFH commissioning can begin.</p>
            <p><strong>Screed Types and Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sand/cement:</strong> 65-75mm — 21 days minimum — Traditional, high thermal mass</li>
              <li><strong>Anhydrite (calcium sulphate):</strong> 30-35mm — 7-14 days — Self-levelling, faster response</li>
              <li><strong>Thin screed/tile adhesive:</strong> 15-20mm — 24-48 hours — Fast response, low thermal mass</li>
            </ul>
            <p><strong>Floor Covering Thermal Resistance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ceramic/porcelain tiles:</strong> 0.05-0.1 tog — Excellent</li>
              <li><strong>Natural stone:</strong> 0.1-0.2 tog — Excellent</li>
              <li><strong>Engineered wood:</strong> 0.5-0.7 tog — Good (check max temp)</li>
              <li><strong>Laminate:</strong> 0.5-1.0 tog — Good (UFH rated)</li>
              <li><strong>Carpet + underlay:</strong> 1.0-2.5 tog — Limited (&lt;1.5 tog total)</li>
            </ul>
            <p><strong>Commissioning Procedure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pre-screed pressure test:</strong> 6 bar for 2 hours minimum, record any pressure drop</li>
              <li><strong>Maintain pressure during screeding:</strong> 2-3 bar whilst screed is laid</li>
              <li><strong>Screed curing period:</strong> 21 days for sand/cement, 7-14 days for anhydrite</li>
              <li><strong>System flush:</strong> Flush with mains water until clear, check for debris</li>
              <li><strong>Fill and pressurise:</strong> Fill with inhibited water, pressurise to 2.5 bar</li>
              <li><strong>Initial heat-up:</strong> Start at 20°C, increase 5°C per day until design temperature</li>
              <li><strong>Flow balancing:</strong> Adjust flow meters to achieve design rates</li>
              <li><strong>Zone commissioning:</strong> Test each thermostat and actuator operation</li>
              <li><strong>Documentation:</strong> Record flow rates, temperatures, and test results</li>
            </ul>
            <p><strong>Critical Installation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Insulation:</strong> Minimum 50mm PIR/EPS below pipes with edge insulation strips</li>
              <li><strong>Pipe clips:</strong> Secure at maximum 500mm centres, closer on bends</li>
              <li><strong>Movement joints:</strong> Pipes must pass through movement joints in protective sleeves</li>
              <li><strong>No joints:</strong> Continuous pipe runs with no underground joints</li>
              <li><strong>Oxygen barrier:</strong> PE-X pipe must have integral oxygen barrier layer</li>
            </ul>
            <p><strong>Important:</strong> Never exceed 5°C temperature increase per day during commissioning. Rapid heating can cause screed cracking and permanent damage to the floor structure.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: UFH Circuit Sizing</strong>
            </p>
            <p><strong>Question:</strong> A living room measures 5m × 4m with a heat loss of 50 W/m². Calculate the required UFH circuits.</p>
            <p>Floor area = 5m × 4m = 20m²</p>
            <p>Heat requirement = 20m² × 50 W/m² = <strong>1000W</strong></p>
            <p>Pipe length at 200mm spacing:</p>
            <p>Length = (Area / Spacing) + Manifold run</p>
            <p>Length = (20 / 0.2) + 10m = 110m</p>
            <p>&gt; 100m maximum for 16mm pipe</p>
            <p>Solution: Split into 2 circuits of ~55m each</p>
            <p>
              <strong>Example 2: Flow Rate Calculation</strong>
            </p>
            <p><strong>Question:</strong> Calculate the required flow rate for a UFH circuit delivering 1500W with 10K temperature differential.</p>
            <p>Using Q = P ÷ (ΔT × c × ρ)</p>
            <p>Where c × ρ ≈ 70 for water</p>
            <p>Q = 1500 ÷ (10 × 70)</p>
            <p>Q = 1500 ÷ 700 = <strong>2.14 l/min</strong></p>
            <p>Set flow meter to 2.1-2.2 l/min during commissioning</p>
            <p>
              <strong>Example 3: Heat Pump Temperature Selection</strong>
            </p>
            <p><strong>Question:</strong> A room requires 60 W/m² output. What flow temperature is needed and is it suitable for a heat pump?</p>
            <p>From heat output tables at 200mm spacing:</p>
            <p>45°C flow gives ~60-70 W/m²</p>
            <p>Heat pump COP at 45°C: typically 2.8-3.2</p>
            <p>✓ Suitable for heat pump operation</p>
            <p>At 55°C: COP drops to 2.2-2.6</p>
            <p>At 35°C: COP improves to 3.5-4.0 but output only 40-50 W/m²</p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heat pump integration
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Radiator systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section1_3;
