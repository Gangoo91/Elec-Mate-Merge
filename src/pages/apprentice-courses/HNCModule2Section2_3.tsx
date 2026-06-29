/**
 * Module 2 · Section 2 · Subsection 3 — Bernoulli&rsquo;s Equation
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Energy conservation along a streamline — pressure head + velocity head + elevation head
 *   = constant. The equation behind every venturi, every flow meter, every pipe-sizing
 *   pressure-loss budget.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  SectionRule,
  FAQ,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = "Bernoulli's Equation - HNC Module 2 Section 2.3";
const DESCRIPTION =
  "Master Bernoulli's equation for fluid energy conservation. Learn pressure-velocity-elevation relationships and practical applications including venturi meters and pitot tubes.";

const quickCheckQuestions = [
  {
    id: 'bernoulli-terms',
    question:
      "Bernoulli's equation states that the sum of which three energy terms remains constant along a streamline?",
    options: [
      'Temperature, density and viscosity',
      'Pressure, velocity (kinetic), elevation (potential)',
      'Mass, momentum and turbulence',
      'Flow rate, friction and surface tension',
    ],
    correctIndex: 1,
    explanation:
      "Bernoulli's equation: P + ½ρv² + ρgh = constant. The three terms represent pressure energy, kinetic energy (velocity), and potential energy (elevation).",
  },
  {
    id: 'velocity-pressure',
    question:
      "According to Bernoulli's principle, when fluid velocity increases through a constriction, what happens to static pressure?",
    options: [
      'Pressure becomes zero',
      'Pressure increases',
      'Pressure decreases',
      'Pressure stays the same',
    ],
    correctIndex: 2,
    explanation:
      'As velocity increases, kinetic energy increases. Since total energy is constant, static pressure must decrease. This principle explains how venturi meters and aircraft wings work.',
  },
  {
    id: 'venturi-application',
    question: "A venturi meter uses Bernoulli's principle to measure:",
    options: [
      'Pressure only',
      'Pipe diameter',
      'Temperature',
      'Flow rate',
    ],
    correctIndex: 3,
    explanation:
      "A venturi meter measures flow rate by creating a constriction. The pressure difference between the wide and narrow sections can be related to velocity, and hence flow rate, using Bernoulli's equation.",
  },
  {
    id: 'pitot-tube',
    question: 'A pitot tube measures:',
    options: [
      'Dynamic (velocity) pressure only',
      'Atmospheric pressure',
      'Stagnation (total) pressure',
      'Static pressure only',
    ],
    correctIndex: 2,
    explanation:
      'A pitot tube measures stagnation (total) pressure - the pressure when flow is brought to rest. Combined with static pressure measurement, this allows velocity calculation using P_total = P_static + ½ρv².',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What assumption is NOT required for the ideal form of Bernoulli's equation?",
    options: [
      'Steady flow conditions',
      'Turbulent flow',
      'Incompressible fluid',
      'No friction losses',
    ],
    correctAnswer: 1,
    explanation:
      "The ideal Bernoulli equation requires steady, incompressible flow with no friction (inviscid). It doesn't require laminar flow - it applies along a streamline regardless of whether overall flow is laminar or turbulent.",
  },
  {
    id: 2,
    question:
      "In Bernoulli's equation P + ½ρv² + ρgh = constant, what does the term ½ρv² represent?",
    options: [
      'Static pressure at the wall',
      'Potential energy due to elevation',
      'Dynamic (velocity) pressure',
      'Total head loss to friction',
    ],
    correctAnswer: 2,
    explanation:
      '½ρv² is the dynamic or velocity pressure - the kinetic energy per unit volume of the moving fluid. It represents the pressure increase that would occur if the fluid were brought to rest.',
  },
  {
    id: 3,
    question:
      'Water flows through a horizontal pipe that narrows from 100mm to 50mm diameter. If the velocity in the larger section is 1 m/s, what is the velocity in the smaller section?',
    options: [
      '8 m/s',
      '2 m/s',
      '16 m/s',
      '4 m/s',
    ],
    correctAnswer: 3,
    explanation:
      'Using continuity: A₁v₁ = A₂v₂. Since A ∝ D², and diameter halves (ratio 2:1), area reduces by factor 4. Therefore v₂ = v₁ × (A₁/A₂) = 1 × 4 = 4 m/s.',
  },
  {
    id: 4,
    question:
      'The pressure difference measured across a venturi meter throat is 20 kPa. If the approach velocity is negligible, what is the throat velocity? (ρ = 1000 kg/m³)',
    options: [
      '6.3 m/s',
      '4.5 m/s',
      '10 m/s',
      '20 m/s',
    ],
    correctAnswer: 0,
    explanation:
      'Using Bernoulli: ΔP = ½ρv². Rearranging: v = √(2ΔP/ρ) = √(2 × 20000/1000) = √40 = 6.32 m/s',
  },
  {
    id: 5,
    question: "Which device uses Bernoulli's principle to measure air velocity in ductwork?",
    options: [
      'Thermometer',
      'Pitot-static tube',
      'Flow switch',
      'Pressure gauge',
    ],
    correctAnswer: 1,
    explanation:
      'A pitot-static tube measures both total (stagnation) pressure and static pressure. The difference gives dynamic pressure, from which velocity can be calculated: v = √(2×ΔP/ρ).',
  },
  {
    id: 6,
    question:
      'In a horizontal pipe, if flow velocity doubles, by what factor does the dynamic pressure change?',
    options: [
      'Doubles (×2)',
      'Triples (×3)',
      'Quadruples (×4)',
      'Halves (÷2)',
    ],
    correctAnswer: 2,
    explanation:
      'Dynamic pressure = ½ρv². Since it depends on v², doubling velocity quadruples dynamic pressure. This is why high velocities create significant pressure drops.',
  },
  {
    id: 7,
    question:
      'A water jet rises 5m vertically from a nozzle. Ignoring air resistance, what was the jet velocity at the nozzle exit? (g = 10 m/s²)',
    options: [
      '5 m/s',
      '50 m/s',
      '25 m/s',
      '10 m/s',
    ],
    correctAnswer: 3,
    explanation:
      'Using energy conservation (Bernoulli): ½v² = gh. Therefore v = √(2gh) = √(2 × 10 × 5) = √100 = 10 m/s.',
  },
  {
    id: 8,
    question:
      "The Bernoulli equation can be expressed in terms of 'head'. What are the units of head?",
    options: [
      'Metres',
      'kg/m³',
      'Pascals',
      'Watts',
    ],
    correctAnswer: 0,
    explanation:
      "When Bernoulli's equation is divided by ρg, all terms have units of metres (length). Pressure head = P/ρg, velocity head = v²/2g, elevation head = h. This 'head' form is common in pump specifications.",
  },
  {
    id: 9,
    question: "Why do real pipe systems require modification of Bernoulli's equation?",
    options: [
      'Fluids are always compressible',
      'Friction losses occur in real systems',
      "Gravity doesn't affect fluids",
      'Pressure is not conserved',
    ],
    correctAnswer: 1,
    explanation:
      'Real systems have friction losses in pipes and fittings. The extended Bernoulli equation adds a head loss term: P₁/ρg + v₁²/2g + z₁ = P₂/ρg + v₂²/2g + z₂ + h_loss',
  },
  {
    id: 10,
    question: 'In building services, the Bernoulli principle explains why:',
    options: [
      'Larger pipe diameters always reduce flow rate',
      'Pump head is independent of flow velocity',
      'Partially closed valves cause large pressure drops',
      'Friction losses fall as velocity increases',
    ],
    correctAnswer: 2,
    explanation:
      "Partially closed valves create constrictions that accelerate flow. By Bernoulli's principle, this converts pressure energy to kinetic energy, causing pressure drop. The energy is then dissipated as turbulence and heat.",
  },
  {
    id: 11,
    question:
      'A pump adds energy to a fluid system. In the extended Bernoulli equation, this appears as:',
    options: [
      'A friction loss term on the upstream side',
      'A reduction in the elevation head',
      'A negative term subtracted from total head',
      'Added head (positive pump term)',
    ],
    correctAnswer: 3,
    explanation:
      'The extended Bernoulli equation includes pump head: P₁/ρg + v₁²/2g + z₁ + H_pump = P₂/ρg + v₂²/2g + z₂ + h_loss. Pump head H_pump is positive, representing energy added to the system.',
  },
  {
    id: 12,
    question:
      'At a stagnation point in fluid flow, the velocity is zero. What happens to the pressure?',
    options: [
      'Pressure reaches its maximum (stagnation pressure)',
      'Pressure drops to its minimum value',
      'Pressure falls below atmospheric pressure',
      'Pressure becomes equal to the dynamic pressure',
    ],
    correctAnswer: 0,
    explanation:
      'At a stagnation point, all kinetic energy converts to pressure energy. The stagnation pressure is the maximum pressure in the flow: P_stag = P_static + ½ρv². This is measured by a pitot tube.',
  },
];

const faqs = [
  {
    question: 'When can I use the simple Bernoulli equation in building services?',
    answer:
      'The simple form works well for short sections of pipe between two points, especially where elevation changes or velocity changes are dominant (like venturis or orifice plates). For full system analysis with significant pipe lengths, you must add friction losses using the extended equation.',
  },
  {
    question: 'What is the difference between static, dynamic, and total pressure?',
    answer:
      'Static pressure is the pressure measured perpendicular to flow (what a normal gauge reads). Dynamic pressure is ½ρv², representing kinetic energy. Total (stagnation) pressure is their sum. In a pitot-static measurement, total minus static equals dynamic, giving velocity.',
  },
  {
    question:
      'Why does pressure drop at restrictions even though Bernoulli says energy is conserved?',
    answer:
      'Bernoulli shows static pressure drops at restrictions because kinetic energy increases. However, downstream the velocity slows but not all pressure is recovered - some energy is lost to turbulence and friction (not accounted for in ideal Bernoulli). The extended equation includes these losses.',
  },
  {
    question: 'How do venturi meters differ from orifice plates?',
    answer:
      "Both use Bernoulli's principle to measure flow. Venturi meters have gradual converging and diverging sections, recovering most pressure (low permanent loss, ~10%). Orifice plates are cheaper but have abrupt restrictions causing higher permanent losses (~60-70%). Venturis are preferred for large flows and permanent installations.",
  },
  {
    question: 'What is velocity head and why is it useful?',
    answer:
      'Velocity head is v²/2g (in metres). It represents kinetic energy in units of fluid height. This form is useful because pump heads, friction losses, and elevation changes can all be expressed in metres and directly compared. A flow at 2 m/s has velocity head of 2²/(2×9.81) = 0.2 m.',
  },
  {
    question: "How does Bernoulli's equation apply to air handling systems?",
    answer:
      'The same principles apply to air, but density is much lower (~1.2 kg/m³). Pitot-static tubes measure duct velocities, and pressure drops through filters, coils, and dampers follow Bernoulli relationships. Air systems typically operate at much higher velocities (5-15 m/s) than water systems due to the lower density.',
  },
];

const HNCModule2Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 3"
            title="Bernoulli's Equation"
            description="Energy conservation for flowing fluids — pressure, velocity, and elevation in balance."
            tone="purple"
          />

          <TLDR
            points={[
              'You will apply Bernoulli (P/ρg + v²/2g + z = constant) along a streamline to predict pressure changes between two points in a building services system.',
              'You can extend the simple form to the engineering form — adding pump head (h_p) and friction loss (h_f) for real-world systems.',
              'You distinguish static, dynamic and total pressure and recognise where each shows up in instrumentation (Pitot tube, venturi, orifice plate).',
              'You apply continuity (Q = vA) alongside Bernoulli — the two equations together solve nearly every steady-flow problem on the rig.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide C — Reference Data; ISO 5167 (flow measurement)"
            clause="Differential pressure flow meters (orifice plate, venturi, nozzle) operate on the Bernoulli principle: the pressure differential between an upstream tap and a throat tap is related to the volumetric flow rate by an equation derived from energy conservation, with discharge coefficient and expansibility factor accounting for real-fluid effects."
            meaning={
              <>
                Bernoulli is the legal-quality basis for every differential-pressure flow
                measurement in building services. Heat-meter installations on LTHW and CHW
                circuits, regulated under the Heat Network (Metering and Billing)
                Regulations 2014, rely directly on this physics.
              </>
            }
            cite="Source: CIBSE Guide C — Reference Data; ISO 5167-1 to -4 — Measurement of fluid flow by means of pressure differential devices"
          />

          <LearningOutcomes
            outcomes={[
              "State Bernoulli's equation in pressure and head forms",
              'Identify the assumptions required for ideal Bernoulli',
              'Apply Bernoulli to constrictions, jets and elevation changes',
              'Use pitot tubes and venturi meters for flow measurement',
              'Extend Bernoulli to include pump head and friction losses',
              'Solve building-services flow problems using energy conservation',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="The Bernoulli Equation"
            plainEnglish="Energy in a moving fluid splits three ways: pressure, motion, and height. Add them up along a streamline and the total stays constant — assuming no friction."
          >
            <p>
              Bernoulli's equation is conservation of energy applied to a flowing fluid. Between any
              two points along a streamline, the sum of pressure, kinetic and potential energy per
              unit volume is constant.
            </p>
            <p>
              <strong>Pressure form:</strong> P + ½ρv² + ρgh = constant.
            </p>
            <p>
              <strong>Head form (divide by ρg, all terms in metres):</strong> P/ρg + v²/2g + z =
              constant. Pressure head + velocity head + elevation head.
            </p>
            <p>
              <strong>Required assumptions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Steady flow (conditions don't change over time at any point)</li>
              <li>Incompressible fluid (density constant — fine for water and low-speed air)</li>
              <li>Inviscid (no friction) — the big assumption</li>
              <li>Along a single streamline</li>
            </ul>
            <p>
              <strong>Three pressure types:</strong> Static (what a gauge reads perpendicular to
              flow), Dynamic (½ρv², the kinetic energy per unit volume), Total or stagnation
              (static + dynamic, what a pitot tube reads when flow is brought to rest).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Pressure-velocity trade-off"
            plainEnglish="Squeeze the pipe smaller, fluid speeds up, static pressure drops. That's the venturi effect — and the reason aircraft wings lift."
          >
            <p>
              The most useful consequence of Bernoulli is the inverse relationship between velocity
              and static pressure: speed up, pressure falls; slow down, pressure recovers.
            </p>
            <p>
              <strong>Why it matters in building services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Partially closed valves create local constrictions and large pressure drops</li>
              <li>Reducers accelerate flow (lower static pressure downstream of throat)</li>
              <li>Sudden expansions decelerate flow (some pressure recovery, plus loss to turbulence)</li>
              <li>Pump suctions: high local velocity can drop pressure below vapour pressure → cavitation</li>
            </ul>
            <p>
              <strong>Dynamic pressure scales with v²:</strong> Doubling velocity quadruples dynamic
              pressure. That's why high-velocity systems lose pressure rapidly.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Flow measurement — venturi, orifice, pitot"
            plainEnglish="Restrict the flow, measure the pressure difference, work backwards to velocity. That's how venturis, orifice plates and pitot tubes all work."
          >
            <p>
              <strong>Venturi meter:</strong> Gradual converging and diverging sections. Pressure
              drop at the throat relates to velocity via Bernoulli. Permanent loss only ~10% — the
              meter recovers most of the pressure downstream.
            </p>
            <p>
              <strong>Orifice plate:</strong> A simple flat plate with a hole. Cheap and easy, but
              the abrupt restriction loses 60-70% permanently. Common for steam and gas
              measurement.
            </p>
            <p>
              <strong>Pitot tube / pitot-static tube:</strong> Faces upstream so flow stagnates at
              the tip → measures total (stagnation) pressure. Combined with a static-pressure tap
              (or a coaxial static port on a pitot-static tube), the difference gives dynamic
              pressure: v = √(2 × ΔP / ρ). Standard for measuring duct air velocity.
            </p>
            <p>
              <strong>Flow rate from venturi:</strong> Q = Cd × A₂ × √(2(P₁ - P₂) / ρ(1 - (A₂/A₁)²)).
              Cd is the discharge coefficient (~0.95-0.98 for venturis).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Extended Bernoulli — real systems with pumps and friction"
            plainEnglish="Real pipework loses energy to friction, and pumps add it back. The extended Bernoulli equation just bolts those terms onto each side."
          >
            <p>
              The ideal Bernoulli equation assumes no friction. Real pipework systems lose energy
              continuously to friction, and pumps add energy. The extended form handles both.
            </p>
            <p>
              <strong>Extended Bernoulli (head form):</strong> P₁/ρg + v₁²/2g + z₁ + Hpump = P₂/ρg
              + v₂²/2g + z₂ + hloss.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hpump:</strong> Pump head — energy added to the fluid (positive)
              </li>
              <li>
                <strong>hloss:</strong> Friction head loss — energy dissipated (positive on the right)
              </li>
              <li>Friction losses calculated by Darcy-Weisbach (next subsection)</li>
              <li>Fitting losses calculated by K-factors or equivalent length</li>
            </ul>
            <p>
              <strong>Why this matters:</strong> Pump selection means matching Hpump to the
              required system head — which equals friction loss + elevation change + any
              destination pressure requirement.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three classic Bernoulli sums: a venturi, a pitot, and a water jet rising from a nozzle."
          >
            <p>
              <strong>Example 1 - venturi velocity:</strong> Pressure drop across a venturi throat
              is 20 kPa. Approach velocity negligible. Throat velocity?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ΔP = ½ρv² → v = √(2ΔP/ρ)</li>
              <li>v = √(2 × 20,000 / 1000) = √40 = <strong>6.32 m/s</strong></li>
            </ul>
            <p>
              <strong>Example 2 - pitot tube air velocity:</strong> Pitot-static tube reads dynamic
              pressure 90 Pa in air (ρ = 1.2 kg/m³). Air velocity?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>v = √(2 × 90 / 1.2) = √150 = <strong>12.2 m/s</strong></li>
              <li>Typical for a supply air duct</li>
            </ul>
            <p>
              <strong>Example 3 - jet rising from a nozzle:</strong> A water jet rises 5m
              vertically from a nozzle. Exit velocity? (g = 10 m/s²)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energy conservation: ½v² = gh → v = √(2gh)</li>
              <li>v = √(2 × 10 × 5) = √100 = <strong>10 m/s</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Two forms, three pressures, and the small handful of formulas you'll keep coming back to."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P + ½ρv² + ρgh = constant</strong> — Pressure form
              </li>
              <li>
                <strong>P/ρg + v²/2g + z = constant</strong> — Head form (metres)
              </li>
              <li>
                <strong>v = √(2ΔP/ρ)</strong> — Velocity from dynamic pressure
              </li>
              <li>
                <strong>Pdynamic = ½ρv²</strong> — Velocity pressure
              </li>
              <li>
                <strong>v²/2g</strong> — Velocity head (m)
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Water: ρ = 1000 kg/m³</li>
              <li>Air at 20°C: ρ = 1.2 kg/m³</li>
              <li>g = 9.81 m/s² (10 for quick calcs)</li>
              <li>10 m head ≈ 1 bar ≈ 100 kPa</li>
              <li>Velocity head at 2 m/s ≈ 0.2 m</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Forgetting friction</strong> — Ideal Bernoulli ignores real-world losses
                </li>
                <li>
                  <strong>Mixing units</strong> — Stick to SI: m, s, Pa, kg
                </li>
                <li>
                  <strong>Confusing static and total pressure</strong> — A pitot reads total, a flush gauge reads static
                </li>
                <li>
                  <strong>Applying across pumps</strong> — Use extended form when energy is added or removed
                </li>
              </ul>
            }
            doInstead="Use ideal Bernoulli only for short sections without major losses. Add a friction term for full pipework analysis. Note whether your gauge reads static or total. And use the extended form whenever a pump or significant friction is involved."
          />

          <SectionRule />

          <Scenario
            title="Sizing the cold-water break tank fill rate"
            situation={
              <>
                A high-rise building has a 10 m³ cold-water break tank fed via a 50 mm DN
                feed off the incoming main. The pressure at the main is 4 bar. The fill
                requirement is 1 L/s (3.6 m³/h). Distance from main to tank inlet is 12 m
                with negligible elevation rise.
              </>
            }
            whatToDo={
              <>
                Apply Bernoulli with friction. Available head = 40 m at the main. Static
                head loss = 0 (level). Friction loss along 12 m of 50 mm pipe at 1 L/s
                ≈ 0.5 m. Velocity head at tank inlet (v = Q/A ≈ 0.5 m/s) ≈ 0.013 m. Required
                pressure at tank inlet ≈ 0.5 m. Available - required = 39 m surplus, well
                above what the float-operated valve needs. Sized correctly. If the surplus
                were &lt; 5 m you would consider a booster set or larger feed pipe.
              </>
            }
            whyItMatters={
              <>
                Bernoulli + continuity applied as a five-line calculation gives a defendable
                answer to &ldquo;will it fill fast enough?&rdquo; — and protects the building
                from low-pressure incidents on the cold-water service.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Bernoulli (ideal): P/ρg + v²/2g + z = constant along a streamline.',
              'Engineering Bernoulli: P₁/ρg + v₁²/2g + z₁ + h_p = P₂/ρg + v₂²/2g + z₂ + h_f.',
              'Three energy heads: pressure (P/ρg), velocity (v²/2g), elevation (z) — all in metres of fluid.',
              'Continuity (incompressible): Q = vA, so v₁A₁ = v₂A₂ — flow speeds up where pipe narrows.',
              'Static pressure (wall tap), dynamic pressure (½ρv²), total/stagnation pressure (Pitot tube).',
              'Differential-pressure flow meters (orifice, venturi, nozzle) read Δp and back-calculate Q via Bernoulli + ISO 5167.',
              'Heat meters on LTHW/CHW use the same principle for flow measurement (regulated under Heat Network MBR 2014).',
              'Pump head h_p adds energy; friction h_f and minor losses subtract it — full energy balance gives system head curve.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Flow characteristics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Pipe sizing and pressure drop
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section2_3;
