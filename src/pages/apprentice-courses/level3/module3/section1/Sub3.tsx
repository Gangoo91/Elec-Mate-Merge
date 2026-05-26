/**
 * Module 3 · Section 1 · Subsection 3 — Mechanics: force, work, energy, power (AC 1.1)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.1
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 3.1, 3.2, 3.3
 *   AC 3.1 — "specify what is meant by mass and weight"
 *   AC 3.2 — "principles of basic mechanics as they apply to levers, gears and pulleys"
 *   AC 3.3 — "force, work, energy (kinetic and potential), power, efficiency"
 *
 * Mechanics underpins motor work. Force in newtons, work in joules, power in watts.
 * Energy is conserved — it just changes form. Efficiency tells you how much of it
 * survives the conversion.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import { LeverDiagram, PulleySystem, GearTrain, EnergyTransfer } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Mechanics: force, work, energy, power | Level 3 Module 3.1.3 (AC 1.1) | Elec-Mate';
const DESCRIPTION =
  'Mass vs weight, force in newtons, work in joules, power in watts, energy conservation and efficiency. The mechanics that motor and lifting work depend on.';

const checks = [
  {
    id: 'l3-m3-1-3-mass',
    question: 'A 50 kg motor is mounted on a wall bracket. What weight (force) does the bracket support? (g ≈ 9.81 m/s²)',
    options: [
      '490.5 N',
      '50 N',
      '5.1 N',
      '981 N',
    ],
    correctIndex: 0,
    explanation:
      'Weight = mass × g = 50 × 9.81 = 490.5 N. The bracket has to take that downward force, plus any vibration. Mass (kg) is constant; weight (N) depends on gravity.',
  },
  {
    id: 'l3-m3-1-3-work',
    question:
      'A motor lifts a 200 kg load 5 m vertically. How much work is done? (Take g = 10 m/s² for simplicity.)',
    options: [
      '100 J',
      '10 000 J',
      '1000 J',
      '100 000 J',
    ],
    correctIndex: 1,
    explanation:
      'Work = force × distance = (mg) × h = (200 × 10) × 5 = 2000 × 5 = 10 000 J = 10 kJ. The energy gained is now stored as gravitational potential energy in the load.',
  },
  {
    id: 'l3-m3-1-3-power',
    question:
      'The same lift takes 25 seconds. What average mechanical power output is needed?',
    options: [
      '100 W',
      '400 W',
      '40 kW',
      '4 kW',
    ],
    correctIndex: 1,
    explanation:
      'Power = work / time = 10 000 J / 25 s = 400 W. That is the mechanical (output) power. The electrical input power will be higher because of motor inefficiency.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The SI unit of force is:',
    options: [
      'kilogram',
      'newton',
      'joule',
      'watt',
    ],
    correctAnswer: 1,
    explanation: 'Newton (N). 1 N = 1 kg accelerated at 1 m/s².',
  },
  {
    id: 2,
    question: 'Mass and weight are:',
    options: [
      'Electronic switching via Hall sensors or sensorless control',
      'To provide fault current path and stabilise phase voltages',
      'Mass is in kilograms (constant), weight is the force in newtons due to gravity',
      'Assessing operational performance of existing buildings',
    ],
    correctAnswer: 2,
    explanation:
      'Mass = how much matter (kg, constant anywhere). Weight = the gravitational force on that mass (N). On the moon a 70 kg person still has 70 kg mass but weighs only ~115 N instead of ~687 N.',
  },
  {
    id: 3,
    question: 'Work done = ?',
    options: [
      'Mass × distance',
      'Force × time',
      'Power × force',
      'Force × distance moved',
    ],
    correctAnswer: 3,
    explanation:
      'W = F × d, where the distance is in the direction of the force. If you push a load horizontally and it doesn\'t move, no work is done.',
  },
  {
    id: 4,
    question: 'Power = ?',
    options: [
      'Energy ÷ time',
      'Energy × time',
      'Force × distance',
      'Force × time',
    ],
    correctAnswer: 0,
    explanation:
      'Power = energy / time, in watts (J/s). A 1 kW heater dissipates 1000 joules every second.',
  },
  {
    id: 5,
    question: 'A motor draws 2 kW electrical and delivers 1.6 kW mechanical. Efficiency = ?',
    options: [
      '60 %',
      '80 %',
      '160 %',
      '125 %',
    ],
    correctAnswer: 1,
    explanation:
      'η = output / input × 100 = 1600 / 2000 × 100 = 80 %. The other 20 % becomes heat in the windings, friction in the bearings, and noise.',
  },
  {
    id: 6,
    question:
      "A 5 kg block is lifted onto a shelf 2 m high. Gravitational potential energy gained (g ≈ 9.81)?",
    options: [
      '10 J',
      '49 J',
      '98 J',
      '196 J',
    ],
    correctAnswer: 2,
    explanation: 'PE = mgh = 5 × 9.81 × 2 = 98.1 J ≈ 98 J.',
  },
  {
    id: 7,
    question: 'A pulley with mechanical advantage 4 means:',
    options: [
      'Inflammation of the skin caused or made worse by substances encountered at work',
      'Reduced insulation test voltage and driver protection',
      'The tower must not be used until the defect is rectified by a competent person',
      'The effort needs to be only ¼ of the load force, but moves 4× the distance',
    ],
    correctAnswer: 3,
    explanation:
      'MA = load / effort. With MA = 4, you need ¼ of the load force, but you have to pull 4× as much rope to lift the load. Energy in = energy out (ignoring friction).',
  },
  {
    id: 8,
    question: 'Kinetic energy is the energy a body has because of:',
    options: [
      'Its motion',
      'Its temperature',
      'Its position',
      'Its mass alone',
    ],
    correctAnswer: 0,
    explanation: 'KE = ½mv². Energy due to motion. A flywheel stores kinetic energy.',
  },
];

const faqs = [
  {
    question: 'Why use kg for mass and N for weight — they feel the same?',
    answer:
      "Bathroom scales feel like they read in kg, but technically they measure the force you push down with (newtons) and convert to kg by dividing by g. The two only match because g is roughly constant on Earth's surface. On a different planet — or in orbit — your mass is unchanged but your weight is different.",
  },
  {
    question: 'How is electrical work different from mechanical work?',
    answer:
      "It isn't — they're the same physics, the same units. Electrical energy in joules is exactly the same as mechanical energy in joules. A 1 kW motor running for 1 second draws 1000 J of electricity and (if 100 % efficient) does 1000 J of mechanical work. The wires don't care how the energy is used.",
  },
  {
    question: "Why don't electricians use horsepower any more?",
    answer:
      "Old motor plates often show HP — 1 HP = 746 W. SI standardised on watts. Most new plates show kW for the output. If you see HP, multiply by 746 to get watts. A 5 HP motor is roughly 3.7 kW mechanical output.",
  },
  {
    question: 'Where do mechanical principles apply on a domestic install?',
    answer:
      "Lifting consumer units, mounting heavy luminaires, working on motorised garage doors, sizing the cable for an electric hoist or lift. Anything that moves things uses force, work and power calculations to size the motor and supply.",
  },
  {
    question: 'How do levers, gears and pulleys help with electrical work?',
    answer:
      "Each one gives mechanical advantage — letting a small force do a big job, at the cost of moving the small force a longer distance. A motor with a gearbox can lift heavy loads slowly, even if the motor itself is rated for a tiny torque. The output power is the same; the gearbox just trades speed for force.",
  },
  {
    question: 'Why does efficiency matter for an electrician sizing a circuit?',
    answer:
      "Because you size the supply to the input power, not the output. A 5 kW mechanical-output motor at 80 % efficiency draws 6.25 kW electrical (P_input = P_output / η). Get that wrong and the protective device trips at start-up.",
  },
];

export default function Sub3() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 3"
            title="Mechanics — force, work, energy, power"
            description="Mass vs weight. Force, work and the energy ladder. The maths that lets you size a hoist motor, an electric gate or a lift cable."
            tone="yellow"
          />

          <TLDR
            points={[
              'Mass (kg) is constant. Weight (N) is the gravitational force on that mass: W = mg, with g ≈ 9.81 m/s².',
              'Force × distance = work (joules). Work / time = power (watts).',
              'Energy is conserved. It changes form (electrical → mechanical → heat) but the total stays constant.',
              'Efficiency η = (output / input) × 100 %. Always less than 100 % in real machines.',
              'Levers, pulleys and gears give mechanical advantage — trade force for distance, never get something for nothing.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish between mass (kg) and weight (N) and calculate one from the other.',
              'Calculate work done from force and distance, and recognise when no work is done.',
              'Calculate power from work and time, and convert between mechanical (W) and electrical (W).',
              'Calculate kinetic and gravitational potential energy.',
              'Calculate efficiency for an electrical-to-mechanical energy conversion.',
              'Explain mechanical advantage in levers, pulleys and gears.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Mass and weight</ContentEyebrow>

          <ConceptBlock
            title="Two different quantities, even though we use them interchangeably in shops"
            plainEnglish="Mass is how much stuff is in something. Weight is the pull of gravity on that stuff. Mass is in kilograms, weight is in newtons."
            onSite="A 25 kg drum of cable has 25 kg of mass anywhere in the universe. On Earth it weighs 25 × 9.81 = 245 N. On the Moon, mass is still 25 kg but it weighs only 41 N because gravity is weaker there. The bracket holding the cable drum has to take the weight (N), not the mass."
          >
            <p>
              <strong>Mass (m):</strong> SI unit kilogram (kg). The amount of matter in a body.
              Constant whatever the gravity.
            </p>
            <p>
              <strong>Weight (W or F<sub>g</sub>):</strong> SI unit newton (N). The gravitational
              force on a body. Depends on local gravity g (about 9.81 m/s² on Earth's surface).
            </p>
            <p>
              W = m × g. So a 70 kg person weighs about 70 × 9.81 = 687 N on Earth. On Mars
              (g ≈ 3.7) the same 70 kg person would weigh 259 N — feels light, same mass.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Force, work and power</ContentEyebrow>

          <ConceptBlock
            title="Force is what changes a body's motion"
            plainEnglish={"A force is a push or a pull. SI unit: newton (N). 1 newton accelerates 1 kilogram at 1 m/s². Pushing a 1 kg drill harder doesn't make it heavier; it accelerates faster."}
          >
            <p>
              The everyday forces you'll meet at L3:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gravity</strong> — pulls everything down at g ≈ 9.81 m/s². W = mg.
              </li>
              <li>
                <strong>Tension</strong> — the pull along a rope, cable or strap.
              </li>
              <li>
                <strong>Friction</strong> — opposes motion between surfaces. Wastes energy as
                heat.
              </li>
              <li>
                <strong>Electromagnetic force</strong> — what makes a motor turn (Sub 4.x).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Work — force applied over a distance"
            plainEnglish={"Work is done when a force moves something through a distance. No movement = no work, even if you're holding a heavy weight up. SI unit of work: joule (J)."}
          >
            <p>
              <strong>W = F × d</strong> (force × distance, both in the same direction).
            </p>
            <p>
              Example: lifting a 20 kg consumer unit 1.5 m onto its mounting position.
              Force = mg = 20 × 9.81 = 196.2 N. Work = F × d = 196.2 × 1.5 = 294.3 J.
              That is the energy you put into the lift.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Power — work done per unit time"
            plainEnglish="Power is the rate at which energy is transferred. The same lift done in 1 second needs more power than the same lift done in 10 seconds. SI unit of power: watt (W) = joule per second."
            onSite={"Motor plates rate output power in kW (or HP on older plates). The motor's electrical input is always more — efficiency × input = output."}
          >
            <p>
              <strong>P = W / t = F × d / t = F × v</strong>
            </p>
            <p>
              Example continued: that 294.3 J consumer-unit lift, done in 3 seconds, needs
              average power = 294.3 / 3 = 98.1 W. That's mechanical power. The motor (or your
              biceps) had to deliver at least that much, plus losses.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE — Manual Handling Operations Regulations 1992"
            clause="Employers must avoid the need for hazardous manual handling so far as is reasonably practicable; assess the risk of injury from any manual handling that cannot be avoided; reduce the risk of injury so far as is reasonably practicable."
            meaning={
              <>
                A 50 kg motor is roughly 490 N of weight. Lifting that solo above shoulder height
                is a Manual Handling assessment failure. Plan the lift, use a hoist, share the
                load — the maths in this Sub is exactly what risk assessments rely on.
              </>
            }
            cite="Source: Manual Handling Operations Regulations 1992 (as amended)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1"
            clause="The electrical installation shall be designed by one or more skilled persons to provide for: (a) the protection of persons, livestock and property in accordance with Section 131; and (b) the proper functioning of the electrical installation for the intended use."
            meaning={
              <>
                Designing a motor circuit needs the mechanics in this Sub: torque (Nm) sets the
                motor rating, motor rating sets the current, current sets the cable and the
                breaker. A miscalculated torque feeds straight into an undersized supply. Reg
                132.1 places the duty on a skilled person; the mechanics is part of the
                skill-set you bring to the design.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.1 — design of electrical installations."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.1 (Coordination between conductor and overload protective device)"
            clause={`Regulation 433.1.1 sets three conditions, all of which must be satisfied:
(a) The rated current or current setting of the protective device (Iₙ) is not less than the design current (Iᵦ) of the circuit. For adjustable protective devices, Iₙ is the current setting selected.
(b) The rated current or current setting (Iₙ) shall not exceed the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit.
(c) The current (Iop) causing effective operation of the protective device shall not exceed 1.45 times the lowest current-carrying capacity (Iz) of any of the conductors.`}
            meaning={
              <>
                Reg 433.1.1 ties motor mechanics to overload protection. The design current
                I<sub>B</sub> for a motor circuit is derived from the mechanical power output,
                divided by motor efficiency, then by power factor — three of the quantities
                explored in this Sub. Get the mechanics wrong and I<sub>B</sub> is wrong; the
                MCB sized to that wrong I<sub>B</sub> either nuisance-trips or fails to protect
                the cable.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 433.1.1 — coordination of conductor and protective device."
          />

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Energy and conservation</ContentEyebrow>

          <ConceptBlock
            title="Energy can change form, but the total is constant"
            plainEnglish="Electrical energy from the supply turns into mechanical energy at the motor shaft, gravitational potential energy in a lifted load, kinetic energy in a moving conveyor, and unavoidable heat in the wires and bearings. Add it all up — total energy in = total energy out."
          >
            <p>
              Two energy types you'll calculate:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gravitational PE</strong> = mgh (mass × g × height). Energy stored by
                lifting something up against gravity.
              </li>
              <li>
                <strong>Kinetic energy</strong> = ½ mv² (half × mass × velocity squared). Energy
                stored in a moving body.
              </li>
            </ul>
            <p>
              A 100 kg lift cab raised 10 m gains PE = 100 × 9.81 × 10 = 9810 J = 9.81 kJ.
              When it descends, that PE turns back into kinetic energy (and into electrical
              energy if the lift has regenerative braking — common on modern lifts).
            </p>
          </ConceptBlock>

          <EnergyTransfer />

          <ConceptBlock
            title="Efficiency — the energy that survives the conversion"
            plainEnglish="No real machine is 100 % efficient. Some energy always escapes as heat, sound or vibration. Efficiency tells you what fraction of input becomes useful output."
            onSite="A typical 4 kW industrial motor is around 90 % efficient. A 4 kW electric kettle is essentially 100 % efficient (all the input becomes heat — and heat is what you wanted)."
          >
            <p>
              <strong>η = (P<sub>output</sub> / P<sub>input</sub>) × 100 %</strong>
            </p>
            <p>
              For a motor delivering 4 kW mechanical with 90 % efficiency:
            </p>
            <p>
              P<sub>input</sub> = P<sub>output</sub> / η = 4000 / 0.9 = 4444 W ≈ 4.45 kW
              electrical.
            </p>
            <p>
              The 0.45 kW difference (450 W) becomes heat — which is why motors get warm and need
              ventilation. Always size the supply cable for input current, not for the output
              rating on the plate.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Levers, pulleys and gears</ContentEyebrow>

          <ConceptBlock
            title="Mechanical advantage — small force, long distance"
            plainEnglish="A simple machine lets you lift a heavy load with a smaller effort, but you have to move the effort through a longer distance. Energy in = energy out (ignoring friction)."
          >
            <p>
              <strong>Mechanical advantage (MA) = load / effort.</strong>
            </p>
            <p>
              <strong>Velocity ratio (VR) = effort distance / load distance.</strong>
            </p>
            <p>
              For an ideal (frictionless) machine, MA = VR. A pulley block with VR = 4 lifts a
              200 N load with 50 N of effort — but you pull 4 m of rope to lift the load 1 m.
              Same energy: 200 × 1 = 200 J in, 50 × 4 = 200 J out.
            </p>
            <p>
              Real pulleys, levers and gears have friction, so MA &lt; VR. Efficiency =
              (MA / VR) × 100 %.
            </p>
          </ConceptBlock>

          <LeverDiagram />
          <PulleySystem />
          <GearTrain />

          <ConceptBlock
            title="Where this turns up on electrical jobs"
            plainEnglish="Anywhere a motor turns gears, drives a pulley, or pulls a cable through a winch — the mechanical advantage maths sets the motor torque rating you need."
            onSite="A cable-pulling winch with a 10:1 gearbox lets a small motor pull a heavy cable through a long duct, slowly. The motor sees 1/10 of the cable tension, but turns 10 times as fast as the drum."
          >
            <p>
              Lifts, hoists, conveyors, automatic gates, industrial gearboxes, cable pulling
              winches — every motorised lifting or pulling job uses gears or pulleys to match the
              motor's torque-speed curve to the load. The electrician sizes the supply for the
              electrical input; the mechanical engineer sizes the gearbox for the load.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Sizing the cable for the output rating, not the input"
            whatHappens={
              <>
                Spec sheet says: 7.5 kW industrial pump motor, 400 V 3-phase. Apprentice plugs
                into the calc: P = √3 × V × I × pf, transposes for I, gets I = 7500 / (1.732 × 400
                × 0.85) = 12.7 A. Sizes for 16 A breaker. Trips on every start.
              </>
            }
            doInstead={
              <>
                The 7.5 kW is the OUTPUT mechanical rating. Motor efficiency at full load is
                typically 88-92 %. P<sub>input</sub> = 7500 / 0.9 = 8.33 kW. I = 8333 / (1.732 ×
                400 × 0.85) = 14.1 A — and that's only steady-state. Starting current can be
                6-8× higher. Size the supply for the actual input current and pick a Type C or D
                MCB that survives motor inrush.
              </>
            }
          />

          <Scenario
            title="Sizing a hoist motor for a workshop chain block"
            situation={
              <>
                Workshop wants a 500 kg hoist that lifts at 0.1 m/s. The gearbox has efficiency
                75 %. What mechanical motor power output do you need? What electrical input if the
                motor is 88 % efficient?

              </>
            }
            whatToDo={
              <>
                Force = mg = 500 × 9.81 = 4905 N.
                <br />
                Mechanical lifting power = F × v = 4905 × 0.1 = 490.5 W (at the load).
                <br />
                Power needed at the motor shaft = 490.5 / 0.75 (gearbox efficiency) = 654 W.
                <br />
                Electrical input = 654 / 0.88 (motor efficiency) = 743 W ≈ 0.75 kW.
                <br />
                Pick a 0.75 kW (1 HP) motor as the next standard size up — but if the duty cycle
                includes acceleration, allow ~50 % headroom (1.1 kW).
              </>
            }
            whyItMatters={
              <>
                Two efficiencies stacked (gearbox × motor) means a 500 W mechanical lifting job
                needs 750 W electrical input. Forget either efficiency and you undersize the
                motor and the supply, the breaker trips, and the customer rings you on day one.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Mass (kg) is constant; weight (N) = mg depends on gravity.',
              'Work = force × distance, in joules. No movement = no work.',
              'Power = work / time = F × v, in watts.',
              'Energy is conserved — it changes form but the total stays constant.',
              'Efficiency η = output / input × 100 %. Always less than 100 % in real machines.',
              'Mechanical advantage in levers, pulleys and gears trades force for distance — energy in = energy out.',
              'Always size the electrical supply for input power, not the motor plate output.',
            ]}
          />

          <Quiz title="Mechanics knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 SI units and prefixes
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Electrical energy and efficiency
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
