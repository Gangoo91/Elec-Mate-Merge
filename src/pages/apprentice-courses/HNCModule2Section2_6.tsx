/**
 * Module 2 · Section 2 · Subsection 6 — System Curves and Operating Points
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Matching pumps to systems, parallel/series operation, VSD energy savings. Where the
 *   pump curve and system curve cross is the duty point — and shifting either curve
 *   shifts the answer.
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

const TITLE = 'System Curves and Operating Points - HNC Module 2 Section 2.6';
const DESCRIPTION =
  'Master system resistance curves, pump-system matching, parallel and series pump operation, and variable speed drive applications for building services HVAC systems.';

const quickCheckQuestions = [
  {
    id: 'system-curve-shape',
    question: 'What is the general shape of a system resistance curve?',
    options: ['Straight line', 'Parabolic (H ∝ Q²)', 'Exponential', 'Inverse'],
    correctIndex: 1,
    explanation:
      'System resistance curves are parabolic because friction head loss is proportional to velocity squared (and therefore flow squared). The equation is H = H_static + KQ², creating a characteristic parabolic shape.',
  },
  {
    id: 'operating-point',
    question: 'Where is the operating point on a pump-system diagram?',
    options: [
      'At maximum pump head',
      'Where pump curve intersects system curve',
      'At maximum pump flow',
      'At the pump BEP',
    ],
    correctIndex: 1,
    explanation:
      'The operating point is where the pump curve intersects the system curve. At this point, the pump delivers exactly the head required by the system at that flow rate - the system is in equilibrium.',
  },
  {
    id: 'pumps-parallel',
    question: 'What is the effect of running two identical pumps in parallel?',
    options: [
      'Head doubles, flow unchanged',
      'Flow doubles at any head',
      'Flow increases but less than doubles at the operating point',
      'No change in performance',
    ],
    correctIndex: 2,
    explanation:
      'In parallel, flows add at the same head. However, because the system curve is parabolic, the actual flow increase at the operating point is less than double - typically 40-60% more flow, not 100%.',
  },
  {
    id: 'vsd-benefits',
    question: 'Why are variable speed drives (VSDs) energy efficient for pumps?',
    options: [
      'They increase pump efficiency',
      'Power reduces with cube of speed (P ∝ N³)',
      'They eliminate friction losses',
      'They increase system head',
    ],
    correctIndex: 1,
    explanation:
      'The affinity laws show P ∝ N³. Reducing pump speed by 20% reduces power by nearly 50%. VSDs match pump output to actual demand, avoiding wasteful throttling or bypass control methods.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A system has 5m static head and requires 15m total head at 10 l/s design flow. What is the system constant K?',
    options: ['0.1', '1.0', '1.5', '10'],
    correctAnswer: 0,
    explanation:
      'Using H = H_static + KQ²: 15 = 5 + K(10)². Therefore K = (15-5)/100 = 0.1. The friction component is 10m at 10 l/s.',
  },
  {
    id: 2,
    question:
      'If flow through a system doubles, by what factor does the friction head loss increase?',
    options: ['2 times', '4 times', '8 times', 'Stays the same'],
    correctAnswer: 1,
    explanation:
      'Friction head is proportional to Q². If Q doubles, friction head increases by 2² = 4 times. This is why system curves are parabolic - doubling flow quadruples the friction loss.',
  },
  {
    id: 3,
    question:
      'Two identical pumps are connected in series. What happens to the combined performance?',
    options: [
      'Flow doubles, head unchanged',
      'Head doubles, flow unchanged',
      'Both flow and head double',
      'Head approximately doubles at any given flow',
    ],
    correctAnswer: 3,
    explanation:
      'In series, heads add at the same flow rate. Two identical pumps in series approximately double the available head at any given flow rate, useful for high-rise buildings requiring high lift.',
  },
  {
    id: 4,
    question:
      'A variable volume HVAC system uses 2-port control valves. As valves close, what happens to the system curve?',
    options: [
      'It shifts left (steeper)',
      'It shifts right (flatter)',
      'It stays the same',
      'It becomes a straight line',
    ],
    correctAnswer: 0,
    explanation:
      'Closing control valves increases system resistance. The system curve becomes steeper (shifts left), reducing flow. Without VSD control, the pump would ride up its curve, increasing head and wasting energy.',
  },
  {
    id: 5,
    question: 'What is the main advantage of differential pressure control on a VSD pump?',
    options: [
      'Maintains constant flow rate',
      'Maintains constant head across the system, matching pump speed to demand',
      'Maximises pump efficiency',
      'Prevents cavitation',
    ],
    correctAnswer: 1,
    explanation:
      'Differential pressure control maintains constant head across the hydraulic circuit (e.g., across the index circuit). As control valves modulate, the VSD adjusts pump speed to maintain the setpoint, saving energy.',
  },
  {
    id: 6,
    question:
      'A pump operates at duty point 15 l/s, 20m head. Using a VSD, speed is reduced until the pump delivers 12 l/s. What is the approximate new head?',
    options: ['12.8m', '16m', '20m', '25m'],
    correctAnswer: 0,
    explanation:
      'Using affinity laws: speed ratio = 12/15 = 0.8, H₂ = H₁ × (N₂/N₁)² = 20 × 0.64 = 12.8m. The pump moves along an affinity law line, not the system curve.',
  },
  {
    id: 7,
    question: 'What problem can occur if a pump operates at very low flow (far left of its curve)?',
    options: [
      'Cavitation only',
      'Motor overheating due to reduced cooling flow through pump',
      'Excessive flow noise',
      'Low discharge pressure',
    ],
    correctAnswer: 1,
    explanation:
      'At low flows, less water passes through the pump to cool the motor (especially for wet-rotor designs). Additionally, recirculation within the pump generates heat. Minimum flow valves or VSDs with minimum speed settings prevent this.',
  },
  {
    id: 8,
    question:
      'In a primary-secondary pumping system, what is the purpose of the bypass (common) pipe?',
    options: [
      'To increase total system flow',
      'To hydraulically decouple primary and secondary circuits',
      'To reduce pump head requirement',
      'To eliminate the need for control valves',
    ],
    correctAnswer: 1,
    explanation:
      'The bypass pipe hydraulically decouples the circuits. Primary pumps maintain constant boiler/chiller flow regardless of secondary demand. Secondary pumps independently control building distribution, enabling variable flow without affecting plant equipment.',
  },
  {
    id: 9,
    question: 'When should you consider parallel pumps rather than a single larger pump?',
    options: [
      'When space is limited',
      'For variable demand systems, redundancy, and better part-load efficiency',
      'When NPSH is critical',
      'For constant flow systems only',
    ],
    correctAnswer: 1,
    explanation:
      'Parallel pumps provide: redundancy (N+1 design), better part-load efficiency (one pump at high efficiency vs. oversized pump at low efficiency), staged capacity, and flexibility. Common in HVAC where loads vary significantly.',
  },
  {
    id: 10,
    question: 'A system curve passes through the origin. What does this indicate?',
    options: [
      'The system has no friction losses',
      'The system has no static head - friction losses only',
      'The pump cannot operate in this system',
      'The system has maximum efficiency',
    ],
    correctAnswer: 1,
    explanation:
      'A system curve through the origin (H = KQ²) indicates zero static head - only friction losses. This is typical of closed-loop heating/cooling systems where supply and return are at the same level (pressurised circuits).',
  },
  {
    id: 11,
    question:
      'What happens to the pump operating point if the system develops an air lock or blockage?',
    options: [
      'Moves to higher flow, lower head',
      'Moves to lower flow, higher head (towards shutoff)',
      'Stays at the same point',
      'Moves along the system curve',
    ],
    correctAnswer: 1,
    explanation:
      'A blockage or air lock increases system resistance dramatically. The system curve shifts left, causing the operating point to move up the pump curve towards shutoff - low flow, high head, potential pump damage.',
  },
  {
    id: 12,
    question: 'In a VSD-controlled pump system, what is the typical minimum speed limit and why?',
    options: [
      '10% - to save maximum energy',
      '30-40% - to ensure adequate motor cooling and prevent recirculation',
      '50% - for constant pressure',
      '80% - to maintain efficiency',
    ],
    correctAnswer: 1,
    explanation:
      'Minimum speed is typically 30-40% of full speed. Below this: motor cooling may be inadequate, pump efficiency drops significantly, recirculation causes heating, and bearings may not be properly lubricated. Some systems use minimum flow valves.',
  },
];

const faqs = [
  {
    question: 'What is the difference between static head and friction head?',
    answer:
      "Static head is the elevation difference between suction and discharge levels - it's constant regardless of flow. Friction head is the energy lost to pipe friction, fittings, and equipment - it increases with the square of flow rate. Total system head = static head + friction head. Closed loops have minimal static head; open systems (cooling towers, boosters) have significant static head.",
  },
  {
    question: 'How do I determine if my pump is oversized?',
    answer:
      'Signs of an oversized pump: operating point far left of BEP, control valves frequently nearly closed, high differential pressure across balancing valves, excessive noise and vibration, motor running cool (underloaded). Solutions: trim the impeller, install a VSD, or replace with a correctly sized pump. Check commissioning records against actual operating conditions.',
  },
  {
    question: 'When should I use pumps in series vs. parallel?',
    answer:
      'Use series for high head requirements (high-rise buildings, long distribution runs) where one pump cannot achieve the required lift. Use parallel for variable demand (HVAC), redundancy requirements (N+1), staged capacity, and when floor space suits multiple smaller pumps. Most HVAC systems use parallel pumps for flexibility and efficiency.',
  },
  {
    question: 'What is the minimum flow requirement for a pump?',
    answer:
      "Pumps require minimum flow (typically 10-25% of BEP flow) to prevent overheating, recirculation damage, and bearing wear. Methods to ensure minimum flow: bypass valve (wastes energy), VSD with minimum speed setting, proper system design with adequate base load. Check manufacturer's data for specific requirements.",
  },
  {
    question: 'How do variable speed drives save energy compared to throttling valves?',
    answer:
      'Throttling valves increase system resistance, moving the operating point up the pump curve - the pump still consumes significant power while flow reduces. VSDs reduce pump speed, moving down affinity law lines - power reduces with the cube of speed. A 20% flow reduction by throttling might save 10% power; with VSD, it saves nearly 50%.',
  },
  {
    question: 'What control strategy should I use for a VSD pump?',
    answer:
      'Common strategies: Constant pressure (setpoint at pump discharge) - simple but wastes energy at low loads. Differential pressure (setpoint across index circuit) - better efficiency, maintains control valve authority. Sensorless (estimates differential pressure) - good efficiency, simpler installation. Proportional pressure (setpoint reduces with flow) - best efficiency for variable volume systems.',
  },
];

const HNCModule2Section2_6 = () => {
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
            eyebrow="Module 2 · Section 2 · Subsection 6"
            title="System Curves and Operating Points"
            description="Match pumps to systems, understand parallel/series operation, and use VSDs to save energy."
            tone="purple"
          />

          <TLDR
            points={[
              'You will plot a system curve (parabolic — H_static + k·Q²) on the same axes as the pump curve and identify the operating point at the intersection.',
              'You can manipulate the system curve (open/close valves, vary load) and the pump curve (change speed via VSD) to land the duty point at the BEP.',
              'You evaluate parallel pump operation (Q doubles at fixed H, then both curves change) and series operation (H doubles at fixed Q).',
              'You quantify VSD energy savings using the affinity laws — and show why a constant-speed pump throttled by valves wastes most of the saved energy as heat.',
            ]}
          />

          <RegsCallout
            source="CIBSE TM 22 — Energy Assessment and Reporting Methodology; CIBSE Guide H — BMS"
            clause="Variable-speed pumping with sensor-controlled feedback (differential pressure or proportional pressure setpoint) is the recognised design solution for variable-flow water systems in commercial buildings, delivering energy savings of typically 50-80% over constant-speed pumping with throttle valves on equivalent loads."
            meaning={
              <>
                CIBSE TM 22 and Guide H position VSD pumping as the default for variable-load
                building services water systems. As an HNC designer the case for VSD is rarely
                technical — it is regulatory (Part L), economic (lifecycle cost) and practical
                (acoustic comfort).
              </>
            }
            cite="Source: CIBSE TM 22 — Energy Assessment and Reporting Methodology; CIBSE Guide H — Building Control Systems; CIBSE Guide B1 — Heating"
          />

          <LearningOutcomes
            outcomes={[
              'Construct a system resistance curve from static and friction components',
              'Find the operating point where pump and system curves cross',
              'Predict how changes in resistance shift the operating point',
              'Understand parallel and series pump combinations',
              'Apply primary-secondary pumping for hydraulic decoupling',
              'Choose VSD control strategies for energy efficiency',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="The system resistance curve"
            plainEnglish="Plot how much head your pipework needs to push water through, at every flow rate. It's a parabola: H = static head + K × Q². Friction loss scales with the square of flow."
          >
            <p>
              The system curve shows how much head the pipework demands at each flow rate. Two
              components add up:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Static head (Hstatic):</strong> Elevation difference between suction and
                discharge — independent of flow
              </li>
              <li>
                <strong>Friction head (KQ²):</strong> Pipe and fitting losses — scales with the
                square of flow
              </li>
              <li>
                <strong>Total:</strong> H = Hstatic + KQ²
              </li>
            </ul>
            <p>
              <strong>Closed-loop systems (heating, chilled water):</strong> Static head ≈ 0
              because the loop is balanced. System curve passes through the origin: H = KQ².
            </p>
            <p>
              <strong>Open systems (booster sets, cooling towers):</strong> Significant static
              head. Curve starts at Hstatic at zero flow.
            </p>
            <p>
              <strong>Doubling flow quadruples friction loss.</strong> That's why oversized
              pumps with control valves throttled down waste so much energy — they're operating
              against an inflated resistance curve.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="The operating point"
            plainEnglish="The pump and the system meet at one flow rate — that's the operating point. Change either curve and the operating point moves."
          >
            <p>
              The operating point is where the pump curve crosses the system curve. At that
              point, head produced equals head needed. The system reaches equilibrium and runs
              steady-state.
            </p>
            <p>
              <strong>How the operating point shifts:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Throttle valves (close): system curve steepens → operating point shifts left (lower flow, higher head)</li>
              <li>Open valves: system curve flattens → operating point shifts right (higher flow, lower head)</li>
              <li>Reduce pump speed (VSD): pump curve drops → operating point follows down an affinity law line</li>
              <li>Air lock or blockage: dramatic system steepening → pump heads towards shutoff (low flow, high head, motor heat)</li>
            </ul>
            <p>
              <strong>Aim:</strong> Operating point should sit close to the pump's BEP. Too far
              left = recirculation, vibration, motor heat. Too far right = cavitation risk,
              motor overload.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Pumps in parallel and in series"
            plainEnglish="Two pumps in parallel = double the flow at the same head (in theory). Two in series = double the head at the same flow. In practice the parabolic system curve eats into both."
          >
            <p>
              <strong>Parallel pumps:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Flows add at the same head</li>
              <li>Used for variable demand, redundancy (N+1), staged capacity</li>
              <li>Combined curve doubles flow only if the system curve is flat — usually you get 40-60% more flow</li>
              <li>Standard for HVAC primary distribution</li>
            </ul>
            <p>
              <strong>Series pumps:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heads add at the same flow</li>
              <li>Used for high-rise lift, long distribution mains, booster sets</li>
              <li>Two identical pumps in series ≈ double head, same flow</li>
              <li>Multi-stage centrifugal pumps internally do this</li>
            </ul>
            <p>
              <strong>Primary-secondary arrangement:</strong> Common in modern HVAC. Primary
              pumps run at constant flow through the boiler/chiller. Secondary pumps handle
              building distribution, often with VSDs. A bypass pipe hydraulically decouples the
              two circuits, so secondary flow can vary without disturbing plant flow.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="VSDs and control strategies"
            plainEnglish="VSDs slow the pump down to match demand. Power drops with the cube of speed. The trick is picking the right setpoint — flat pressure wastes some energy; proportional pressure follows demand exactly."
          >
            <p>
              Variable speed drives change pump speed by adjusting the motor frequency. Combined
              with the affinity laws (P ∝ N³), they cut energy dramatically when system demand
              varies.
            </p>
            <p>
              <strong>Throttling vs VSD:</strong> Throttling closes a valve, raising system
              resistance, pushing the pump up its curve — same power, less flow. VSD slows the
              pump, moving down affinity law lines — much less power for the same flow. A 20%
              flow cut by throttling saves ~10%; the same cut via VSD saves ~50%.
            </p>
            <p>
              <strong>VSD control strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Constant discharge pressure:</strong> Simple, but wastes energy at low loads (pump still maintains full pressure)
              </li>
              <li>
                <strong>Constant differential pressure (across index circuit):</strong> Better
                efficiency, maintains valve authority
              </li>
              <li>
                <strong>Proportional pressure:</strong> Setpoint reduces with flow — best
                efficiency for variable-volume systems
              </li>
              <li>
                <strong>Sensorless:</strong> Estimates ΔP from speed/power — simpler install,
                slightly less precise
              </li>
            </ul>
            <p>
              <strong>Minimum speed:</strong> Typically 30-40% of full speed. Below that,
              motor cooling fails, pump efficiency collapses, and bearings suffer.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three calcs: system constant K, the affinity law applied to a duty change, and a friction-head check."
          >
            <p>
              <strong>Example 1 - finding the system constant K:</strong> A system has 5 m static
              head and needs 15 m total head at 10 l/s.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>15 = 5 + K × 10² → K = 10/100 = <strong>0.1</strong></li>
              <li>System curve: H = 5 + 0.1Q²</li>
            </ul>
            <p>
              <strong>Example 2 - VSD speed reduction:</strong> Pump at 15 l/s, 20 m head. Reduce
              speed via VSD until flow = 12 l/s.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Speed ratio = 12/15 = 0.8</li>
              <li>H₂ = 20 × 0.8² = <strong>12.8 m</strong></li>
              <li>P₂/P₁ = 0.8³ = 0.512 → 49% energy saving</li>
            </ul>
            <p>
              <strong>Example 3 - friction loss doubling effect:</strong> A circuit at 1 m/s
              loses 5 kPa/m friction. At 2 m/s flow, what does it lose?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Friction ∝ v² → ratio (2/1)² = 4</li>
              <li>New loss = 5 × 4 = <strong>20 kPa/m</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="A handful of formulas, parallel/series rules, and the VSD habit that turns 20% less flow into 50% less energy."
          >
            <p>
              <strong>Essential formulas and rules:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>H = Hstatic + KQ²</strong> — System curve
              </li>
              <li>
                <strong>Operating point</strong> — pump curve ∩ system curve
              </li>
              <li>
                <strong>Parallel:</strong> Q adds at the same H
              </li>
              <li>
                <strong>Series:</strong> H adds at the same Q
              </li>
              <li>
                <strong>VSD:</strong> P ∝ N³ (huge energy savings at part load)
              </li>
            </ul>
            <p>
              <strong>Design targets:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Operate within <strong>±20% of BEP</strong>
              </li>
              <li>
                VSD min speed: <strong>30-40%</strong>
              </li>
              <li>
                Maintain min flow: typically <strong>10-25% of BEP</strong>
              </li>
              <li>
                Closed loop static head: <strong>~0</strong>
              </li>
              <li>
                Differential-pressure setpoint: across <strong>index circuit</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Sizing the pump in isolation</strong> — Always plot the system curve too
                </li>
                <li>
                  <strong>Throttling instead of slowing</strong> — Wastes energy compared with VSD
                </li>
                <li>
                  <strong>No bypass in primary-secondary</strong> — Disturbs plant flow when secondary varies
                </li>
                <li>
                  <strong>Ignoring minimum flow</strong> — Bearings and motor cooling suffer at very low flow
                </li>
              </ul>
            }
            doInstead="Plot pump and system curves together. Use VSDs whenever flow varies. Decouple primary and secondary loops with a bypass. Keep flow above the pump's minimum, with a min-flow valve or VSD floor."
          />

          <SectionRule />

          <Scenario
            title="Energy retrofit: replacing a 5.5 kW constant-speed CHW pump"
            situation={
              <>
                A 5.5 kW constant-speed CHW pump runs 8,760 hours per year on an office
                chilled-water system. Average load is 50% of design. The client asks for an
                energy retrofit option.
              </>
            }
            whatToDo={
              <>
                Specify VSD pump matched to the system curve. Apply affinity laws — at 50%
                load (50% flow), the system curve gives ~25% head, requiring ~12.5% input
                power. Annual energy: original 5.5 × 8,760 × 0.5 (load factor) = 24,090 kWh.
                Retrofit: ~3,000 kWh. Saving: ~21,000 kWh/year, payback typically 18-30
                months. Specify two-port valves at terminals (not three-port mixers) to
                preserve variable-flow logic and DP setpoint at the index leg.
              </>
            }
            whyItMatters={
              <>
                Pumping accounts for 5-15% of building energy use in commercial buildings.
                VSD retrofit on existing systems is one of the highest-return energy
                interventions available — and Part L now drives it on new builds.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'System curve: H = H_static + k·Q² (parabolic) — friction loss rises with the square of flow.',
              'Operating point = intersection of pump curve and system curve.',
              'Move system curve right (lower k, open valves) → operating point moves to higher Q, lower H.',
              'Move pump curve down (lower N via VSD) → operating point moves to lower Q, lower H.',
              'Parallel operation: at fixed H, Q doubles; in practice friction shifts the operating point toward higher H.',
              'Series operation: at fixed Q, H doubles; useful for high-static systems (tall buildings, long pipework).',
              'Affinity laws + VSD = step-change energy savings on variable-load systems.',
              'CIBSE TM 22 and Guide H position VSD as the default for variable-flow water systems in commercial buildings.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Pump characteristics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Applications in water and ducts
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section2_6;
