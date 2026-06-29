/**
 * Module 2 · Section 2 · Subsection 5 — Pump Characteristics
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Pump types, performance curves, efficiency, the affinity laws, NPSH. Engineer-in-training
 *   perspective: how an HNC designer selects, sizes and protects a pump on a building services
 *   water system.
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

const TITLE = 'Pump Characteristics - HNC Module 2 Section 2.5';
const DESCRIPTION =
  'Master pump performance curves, types, efficiency calculations and NPSH requirements for building services applications including HVAC and plumbing systems.';

const quickCheckQuestions = [
  {
    id: 'pump-curve',
    question: 'What does a centrifugal pump H-Q curve show?',
    options: [
      'Efficiency vs time',
      'Head vs flow rate',
      'Pressure vs temperature',
      'Power vs speed',
    ],
    correctIndex: 1,
    explanation:
      'The H-Q curve (head-flow curve) shows the relationship between the total head developed by the pump and the volumetric flow rate. Head decreases as flow increases for centrifugal pumps.',
  },
  {
    id: 'pump-bep',
    question: 'What is the Best Efficiency Point (BEP) of a pump?',
    options: [
      'The point of maximum head at zero flow',
      'Optimal operating point for efficiency',
      'The maximum flow the pump can deliver',
      'The speed at which the pump first primes',
    ],
    correctIndex: 1,
    explanation:
      'The BEP is where the pump operates at maximum efficiency. Operating significantly away from BEP wastes energy and can cause premature wear and vibration problems.',
  },
  {
    id: 'centrifugal-start',
    question:
      'Why should centrifugal pumps be started with the discharge valve closed or throttled?',
    options: [
      'To reduce starting current and power',
      'To prime the pump faster',
      'To prevent cavitation',
      'To avoid reverse flow',
    ],
    correctIndex: 0,
    explanation:
      'Starting with a closed discharge valve minimises the starting torque and current because the pump operates at shutoff head. The motor reaches full speed before the valve is opened to establish flow.',
  },
  {
    id: 'npsh-meaning',
    question: 'What does NPSH stand for in pump terminology?',
    options: [
      'Net Pressure System Head',
      'Normal Pump Suction Height',
      'Net Positive Suction Head',
      'Net Power Supply Horsepower',
    ],
    correctIndex: 2,
    explanation:
      'NPSH (Net Positive Suction Head) is the absolute pressure at the pump suction above the vapour pressure. It determines whether the pump will cavitate or operate satisfactorily.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What type of pump is most commonly used for HVAC heating and chilled water systems?',
    options: [
      'Gear (positive displacement)',
      'Centrifugal (end-suction or inline)',
      'Diaphragm dosing pump',
      'Axial flow propeller pump',
    ],
    correctAnswer: 1,
    explanation:
      'Centrifugal pumps (end-suction, inline, or split-case) are standard for HVAC water systems because they provide smooth, pulsation-free flow at moderate heads and are well-suited to variable speed control.',
  },
  {
    id: 2,
    question:
      'As flow rate increases through a centrifugal pump, what happens to the developed head?',
    options: [
      'Head fluctuates randomly',
      'Head increases proportionally',
      'Head decreases',
      'Head remains constant',
    ],
    correctAnswer: 2,
    explanation:
      'Centrifugal pump H-Q curves slope downward from left to right. At zero flow (shutoff), head is maximum. As flow increases, head decreases due to internal losses and velocity changes.',
  },
  {
    id: 3,
    question: 'A pump manufacturer states NPSHr = 3.5m. What does this mean?',
    options: [
      'The pump develops a maximum head of 3.5m at shutoff',
      'The pump must be installed at least 3.5m above the liquid level',
      'The suction pipe should be 3.5m long for correct priming',
      'The pump requires minimum 3.5m pressure at suction to avoid cavitation',
    ],
    correctAnswer: 3,
    explanation:
      'NPSHr (required) is the minimum suction head the pump needs to operate without cavitation. The system must provide NPSHa (available) greater than NPSHr, typically with a safety margin of 0.5-1.0m.',
  },
  {
    id: 4,
    question:
      'What happens when pump speed is reduced to 80% of design speed (using affinity laws)?',
    options: [
      'Flow reduces to 80%, head to 64%, power to 51%',
      'Flow reduces to 64%, head to 80%, power to 51%',
      'Flow, head, and power all reduce to 80%',
      'Only flow reduces; head and power stay the same',
    ],
    correctAnswer: 0,
    explanation:
      'The affinity laws state: Q ∝ N, H ∝ N², P ∝ N³. At 80% speed: Q = 0.8, H = 0.64 (0.8²), P = 0.512 (0.8³). This is why variable speed drives save significant energy.',
  },
  {
    id: 5,
    question: 'A pump has a duty point of 12 l/s at 25m head. Calculate the hydraulic power.',
    options: [
      '3.0 kW',
      '2.94 kW',
      '29.4 kW',
      '0.3 kW',
    ],
    correctAnswer: 1,
    explanation:
      'Hydraulic power Ph = ρgQH = 1000 × 9.81 × 0.012 × 25 = 2943W = 2.94 kW. This is the useful power delivered to the water; shaft power will be higher due to pump efficiency.',
  },
  {
    id: 6,
    question:
      'If the hydraulic power is 2.94 kW and pump efficiency is 72%, what shaft power is required?',
    options: [
      '2.12 kW',
      '3.83 kW',
      '4.08 kW',
      '2.94 kW',
    ],
    correctAnswer: 2,
    explanation:
      'Shaft power = Hydraulic power / Efficiency = 2.94 / 0.72 = 4.08 kW. The motor must deliver at least this power to the pump shaft.',
  },
  {
    id: 7,
    question:
      'Which pump type delivers a fixed volume per revolution regardless of discharge pressure?',
    options: [
      'Single-stage centrifugal',
      'Multi-stage centrifugal',
      'Axial flow',
      'Positive displacement',
    ],
    correctAnswer: 3,
    explanation:
      'Positive displacement pumps (gear, vane, piston, diaphragm) trap and move a fixed volume each cycle. Flow is nearly independent of pressure, making them suitable for dosing and high-pressure applications.',
  },
  {
    id: 8,
    question: 'What is the primary purpose of a multi-stage centrifugal pump?',
    options: [
      'Increase total head',
      'Reduce cavitation',
      'Increase flow rate',
      'Improve priming',
    ],
    correctAnswer: 0,
    explanation:
      'Multi-stage pumps stack impellers in series, each adding to the total head. Flow rate remains the same through all stages, but heads add together. Used for high-rise buildings, booster sets, and pressure boosting.',
  },
  {
    id: 9,
    question: 'At what point on the pump curve is vibration typically lowest?',
    options: [
      'At shutoff head with zero flow',
      'At the Best Efficiency Point (BEP)',
      'At maximum flow (runout)',
      'During start-up before full speed',
    ],
    correctAnswer: 1,
    explanation:
      'At the BEP, hydraulic forces are balanced and flow patterns are optimal. Operating far from BEP causes recirculation, turbulence, and increased vibration that can damage bearings and seals.',
  },
  {
    id: 10,
    question: 'What is specific speed (Ns) used to determine?',
    options: [
      'The motor speed needed to prime the pump',
      'The maximum safe operating temperature of the pump',
      'The type of impeller design suited to the duty',
      'The electrical supply frequency for the drive',
    ],
    correctAnswer: 2,
    explanation:
      'Specific speed is a dimensionless number characterising pump design. Low Ns (500-2000) suits radial impellers for high head/low flow; high Ns (8000+) suits axial flow for low head/high flow.',
  },
  {
    id: 11,
    question:
      'A HVAC system requires 8 l/s at 18m head. The pump selected has efficiency 68% at this duty. What is the absorbed power?',
    options: [
      '1.41 kW',
      '3.5 kW',
      '1.0 kW',
      '2.07 kW',
    ],
    correctAnswer: 3,
    explanation:
      'Hydraulic power = ρgQH = 1000 × 9.81 × 0.008 × 18 = 1412W = 1.41 kW. Absorbed power = 1.41 / 0.68 = 2.07 kW.',
  },
  {
    id: 12,
    question: 'Why is it important to maintain NPSHa > NPSHr + margin in pump installations?',
    options: [
      'To prevent cavitation damage and noise',
      'To increase the total head the pump develops',
      'To allow the pump to run at higher speed',
      'To reduce the motor starting current',
    ],
    correctAnswer: 0,
    explanation:
      'If NPSHa drops below NPSHr, the liquid boils at the impeller inlet creating vapour bubbles (cavitation). These collapse violently, causing noise, vibration, erosion damage, and reduced performance.',
  },
];

const faqs = [
  {
    question: 'What is the difference between NPSHa and NPSHr?',
    answer:
      'NPSHa (available) is what the system provides: atmospheric pressure + static head - friction losses - vapour pressure. NPSHr (required) is what the pump needs, specified by the manufacturer. The system must provide NPSHa > NPSHr (typically by 0.5-1.0m margin) to prevent cavitation.',
  },
  {
    question: 'Why do pump curves show multiple impeller diameters?',
    answer:
      'Manufacturers offer pumps with trimmed impellers to match different duties without changing pump size. A smaller impeller reduces head and power proportionally (H ∝ D², P ∝ D³). This allows one pump model to cover a range of applications and fine-tune performance to the exact system requirement.',
  },
  {
    question: 'When should I use a positive displacement pump instead of centrifugal?',
    answer:
      'Use positive displacement for: precise metering/dosing, high viscosity fluids, high pressure with low flow, self-priming applications, or when flow must be independent of discharge pressure. Centrifugal pumps are better for moderate heads, high flows, variable speed control, and when pulsation-free flow is needed.',
  },
  {
    question: 'How do I calculate pump power consumption?',
    answer:
      'Three power levels exist: Hydraulic power Ph = ρgQH (useful power to water), Shaft power Ps = Ph/ηpump (power to pump shaft), Electrical power Pe = Ps/ηmotor (power from supply). For quick estimates, use Pe ≈ (Q × H × 10) / (ηpump × ηmotor) where Q is in l/s and H in metres.',
  },
  {
    question: 'What are the affinity laws and why are they important?',
    answer:
      'The affinity laws relate speed changes to performance: Q₂/Q₁ = N₂/N₁, H₂/H₁ = (N₂/N₁)², P₂/P₁ = (N₂/N₁)³. The cubic relationship for power means small speed reductions yield large energy savings. Reducing speed by 20% cuts power by nearly 50%, making variable speed drives highly cost-effective.',
  },
  {
    question: 'How do I select the right pump for an HVAC system?',
    answer:
      'Calculate system flow rate from heating/cooling loads (Q = P/(ρ × cp × ΔT)) and determine total head from pipe friction plus fittings plus equipment losses plus static height. Select a pump with BEP near the duty point. Check NPSH is adequate, verify motor power includes margin, and consider VSD for variable flow systems.',
  },
];

const HNCModule2Section2_5 = () => {
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
            eyebrow="Module 2 · Section 2 · Subsection 5"
            title="Pump Characteristics"
            description="Pump types, performance curves, efficiency, the affinity laws, and NPSH for building services design."
            tone="purple"
          />

          <TLDR
            points={[
              'You will read a pump curve (head vs flow), efficiency curve and power curve and pick the duty point that sits in the high-efficiency region (BEP, best efficiency point).',
              'You apply the affinity laws (Q ∝ N, H ∝ N², P ∝ N³) when changing speed via VSD — and you understand why VSD operation saves so much energy at part load.',
              'You calculate Net Positive Suction Head Available (NPSHa) and check it exceeds NPSHr from the pump curve, with margin, to prevent cavitation.',
              'You select between centrifugal (head-flow trade-off, smooth curve), positive-displacement (constant flow, variable head) and turbine (high efficiency at fixed duty) for the application.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide H — Building Control Systems; CIBSE Guide B1 — Heating; ErP Directive — pump efficiency"
            clause="Centrifugal circulator pumps for building services water systems must meet the minimum efficiency index (MEI) and energy efficiency index (EEI) requirements of the EU Ecodesign / UK ErP framework. Variable-speed control is recommended on systems with significant load variation, with operating point selection based on the system curve and the pump performance curve at the design speed."
            meaning={
              <>
                The ErP framework sets minimum efficiency for circulator pumps. As an HNC
                designer your pump selection must be both technically correct (BEP, NPSH) and
                regulatorily compliant (MEI, EEI ≤ 0.23 for glandless circulators).
              </>
            }
            cite="Source: CIBSE Guide H; CIBSE Guide B1; UK Ecodesign for Energy-Related Products Regulations 2010; EU 641/2009 (glandless circulators)"
          />

          <LearningOutcomes
            outcomes={[
              'Identify common pump types and select appropriately for an application',
              'Read pump H-Q, efficiency, and power curves',
              'Calculate hydraulic, shaft and electrical power',
              'Apply the affinity laws for variable speed operation',
              'Calculate NPSHa and verify against pump NPSHr',
              'Recognise multi-stage and parallel pump arrangements',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Pump types"
            plainEnglish="Most HVAC pumps are centrifugal — they spin water round and fling it outwards. Positive displacement pumps trap fixed volumes — used for dosing or high pressure."
          >
            <p>
              <strong>Centrifugal (rotodynamic):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>End-suction, inline, split-case, multi-stage variants</li>
              <li>Smooth, pulsation-free flow</li>
              <li>Moderate head, good with variable speed</li>
              <li>Standard for HVAC heating, chilled water, condenser water</li>
            </ul>
            <p>
              <strong>Positive displacement:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Gear, vane, piston, diaphragm types</li>
              <li>Fixed volume per revolution — flow nearly independent of pressure</li>
              <li>Good for dosing, viscous fluids, high pressure / low flow</li>
              <li>Pulsating flow — needs damping</li>
            </ul>
            <p>
              <strong>Multi-stage centrifugal:</strong> Multiple impellers in series. Flow stays
              the same, heads add together. Used for high-rise buildings, booster sets, pressure
              boosting.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Pump performance curves"
            plainEnglish="Manufacturers publish curves showing how head, efficiency and power vary with flow. Find the BEP — that's where you want to operate."
          >
            <p>
              A pump performance chart usually shows three curves overlaid: head (H) versus flow
              (Q), efficiency (η) versus Q, and power (P) versus Q.
            </p>
            <p>
              <strong>H-Q curve (head-flow):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Slopes downward — high head at low flow, low head at high flow</li>
              <li>Maximum (shutoff) head at Q = 0</li>
              <li>The curve intersects the system curve at the operating point</li>
            </ul>
            <p>
              <strong>Efficiency curve:</strong> Bell-shaped, with the peak at the Best Efficiency
              Point (BEP). Operating far from BEP wastes energy and shortens pump life.
            </p>
            <p>
              <strong>Power curve:</strong> Power increases with flow. Useful for sizing the motor
              and checking it isn't overloaded across the full operating range.
            </p>
            <p>
              <strong>Trimmed impellers:</strong> Most curves show several impeller diameters.
              Trimming reduces head and power without changing the pump body — used to fine-tune
              to the duty point.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Power, efficiency and the affinity laws"
            plainEnglish="Three power numbers: hydraulic (useful), shaft (after pump losses), electrical (after motor losses). Pump speed cubed = power — that's why VSDs save so much energy."
          >
            <p>
              <strong>Hydraulic (water) power:</strong> Ph = ρgQH. The useful power delivered to
              the fluid.
            </p>
            <p>
              <strong>Shaft power:</strong> Ps = Ph / ηpump. Power required at the pump shaft.
            </p>
            <p>
              <strong>Electrical power:</strong> Pe = Ps / ηmotor. Power drawn from the supply.
            </p>
            <p>
              <strong>Affinity laws (centrifugal pumps):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q ∝ N (flow proportional to speed)</li>
              <li>H ∝ N² (head proportional to speed squared)</li>
              <li>P ∝ N³ (power proportional to speed cubed)</li>
              <li>Same relationships hold for impeller diameter D</li>
            </ul>
            <p>
              <strong>Why VSDs save energy:</strong> Reducing pump speed by 20% drops power to
              0.8³ = 0.51 — nearly half. This is why variable speed drives are standard on
              variable-volume HVAC systems.
            </p>
            <p>
              <strong>BEP (Best Efficiency Point):</strong> The flow at which the pump runs most
              efficiently. Aim to operate within ±20% of BEP. Outside that band, vibration and
              wear increase.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="NPSH and cavitation"
            plainEnglish="If the suction pressure drops below the water's boiling point at that temperature, water turns to vapour at the impeller. Bubbles collapse, metal erodes, pump dies. NPSH stops that."
          >
            <p>
              Cavitation occurs when local pressure inside the pump falls below the fluid's vapour
              pressure. Vapour bubbles form, then collapse violently, causing noise, vibration,
              and erosion of impeller metal.
            </p>
            <p>
              <strong>NPSH available (NPSHa):</strong> What the system delivers to the pump
              suction. NPSHa = (Patm + ρgHs - Pvap) / ρg - Hf. Where Hs = static head above pump
              suction, Pvap = vapour pressure at fluid temperature, Hf = suction friction losses.
            </p>
            <p>
              <strong>NPSH required (NPSHr):</strong> Specified by pump manufacturer for each
              duty. Increases with flow rate.
            </p>
            <p>
              <strong>Rule:</strong> NPSHa &gt; NPSHr + safety margin (typically 0.5-1.0 m).
            </p>
            <p>
              <strong>To improve NPSHa:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reduce suction pipe friction (larger pipe, fewer fittings)</li>
              <li>Lower the pump (more static head above)</li>
              <li>Reduce fluid temperature (lower vapour pressure)</li>
              <li>Pressurise the suction tank</li>
            </ul>
            <p>
              <strong>Starting centrifugal pumps:</strong> Start against a closed (or throttled)
              discharge valve. This minimises starting current — pump runs at shutoff head, low
              power. Open the valve once the motor is at full speed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />
          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three classic pump calcs: hydraulic power, shaft power from efficiency, and the affinity laws applied to speed reduction."
          >
            <p>
              <strong>Example 1 - hydraulic power:</strong> Pump duty 12 l/s at 25 m head.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ph = ρgQH = 1000 × 9.81 × 0.012 × 25 = <strong>2.94 kW</strong></li>
            </ul>
            <p>
              <strong>Example 2 - shaft power from efficiency:</strong> Same duty, pump efficiency
              72%.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ps = 2.94 / 0.72 = <strong>4.08 kW</strong></li>
              <li>Motor must deliver at least this much, with margin</li>
            </ul>
            <p>
              <strong>Example 3 - affinity laws (speed reduction):</strong> Duty point 15 l/s at
              20 m head. Reduce speed to 80%.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q₂ = 0.8 × 15 = <strong>12 l/s</strong></li>
              <li>H₂ = 0.8² × 20 = <strong>12.8 m</strong></li>
              <li>P₂ / P₁ = 0.8³ = <strong>0.512</strong> (49% energy saving)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Five formulas, the affinity laws, and the BEP / NPSH rules to keep pumps alive and efficient."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ph = ρgQH</strong> — Hydraulic power (W)
              </li>
              <li>
                <strong>Ps = Ph / ηpump</strong> — Shaft power
              </li>
              <li>
                <strong>Pe = Ps / ηmotor</strong> — Electrical power
              </li>
              <li>
                <strong>Q ∝ N, H ∝ N², P ∝ N³</strong> — Affinity laws
              </li>
              <li>
                <strong>NPSHa &gt; NPSHr + margin</strong> — Cavitation rule
              </li>
            </ul>
            <p>
              <strong>Key design values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Operating range: <strong>±20% of BEP flow</strong></li>
              <li>NPSH safety margin: <strong>0.5-1.0 m</strong></li>
              <li>Min VSD speed: <strong>30-40%</strong></li>
              <li>Pump efficiency: <strong>typically 60-80%</strong></li>
              <li>Motor efficiency: <strong>typically 85-95%</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Oversizing</strong> — Operating far left of BEP wastes energy and shortens life
                </li>
                <li>
                  <strong>Ignoring NPSH</strong> — Hot or high-up suctions cavitate without warning
                </li>
                <li>
                  <strong>Wrong control method</strong> — Throttling wastes energy; use VSD where flow varies
                </li>
                <li>
                  <strong>Misreading affinity laws</strong> — Power is cubed, not linear, with speed
                </li>
              </ul>
            }
            doInstead="Pick a pump with BEP at or near the duty point, calculate NPSHa and check against NPSHr, fit a VSD where flow varies, and remember power scales with the cube of speed."
          />

          <SectionRule />

          <Scenario
            title="Pump cavitation on a chilled-water riser pump"
            situation={
              <>
                A chilled-water riser pump has been replaced. After commissioning the pump
                makes a rattling noise and head drops 25% intermittently. Suction is from a
                10 m vertical rise off a buffer vessel at 5 °C; pump is at the top of the rise.
              </>
            }
            whatToDo={
              <>
                Diagnose as cavitation. Calculate NPSHa = (P_atm + P_static - P_vapour)/ρg -
                friction loss in suction. With 10 m suction lift, only ~0 m static head is
                left after the lift; NPSHa likely below NPSHr. Reposition pump below the
                vessel to gain suction head, increase suction pipe size to reduce friction
                loss, or add a small booster on the suction. Recheck NPSHa &gt; NPSHr + 0.5 m
                margin. Document the change in the as-built.
              </>
            }
            whyItMatters={
              <>
                Cavitation pits the impeller, drops efficiency and shortens pump life from
                15 years to 18 months. NPSH is the single most-overlooked pump-selection
                check on a building services design.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Pump curve: head H vs volumetric flow Q at fixed impeller speed.',
              'Operating point = intersection of pump curve and system curve. Aim for the BEP (best efficiency point).',
              'Affinity laws: Q ∝ N, H ∝ N², P ∝ N³ — halving the speed cuts power to one-eighth.',
              'NPSHa &gt; NPSHr + margin (typically 0.5 m) — otherwise cavitation, noise, impeller damage, head loss.',
              'NPSHa = (P_atm + P_static_suction - P_vapour)/ρg - friction loss in suction line.',
              'Centrifugal: smooth Q-H curve, common in building services (LTHW, CHW, DCWS booster).',
              'Positive displacement: constant flow regardless of head, used for chemical dosing and high-pressure cleaning.',
              'ErP: glandless circulators must meet EEI ≤ 0.23 (UK Ecodesign Regulations); part-load VSD operation usually required to comply.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Pipe sizing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                System curves and operating points
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section2_5;
