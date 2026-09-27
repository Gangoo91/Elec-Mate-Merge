/**
 * Ported from the English course, combining:
 *   level2/module2/section2/Sub4.tsx
 *   level2/module2/section2/Sub5.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
import { EnergyTransfer } from '@/components/study-centre/diagrams';

/* ── Inline check questions ──────────────────────────────────────── */

const checks = [
  {
    id: 'work-formula-check',
    question: 'You push a 50 N load 4 m across a flat floor. How much work have you done?',
    options: ['54 J', '12.5 J', '200 J', '200 N'],
    correctIndex: 2,
    explanation:
      'Work = Force × distance = 50 × 4 = 200 J. Work is measured in joules (J), not in newtons. If your answer comes out in N, you’ve mixed units up.',
  },
  {
    id: 'pe-formula-check',
    question:
      'You lift a 20 kg consumer unit 2 m up onto a wall. How much PE has it gained (g = 9.81)?',
    options: ['392.4 J', '196.2 J', '40 J', '981 J'],
    correctIndex: 0,
    explanation:
      'PE = m × g × h = 20 × 9.81 × 2 = 392.4 J. That’s also exactly the work you did against gravity to get it up there.',
  },
  {
    id: 'ke-pe-conversion-check',
    question:
      'A 1 kg spanner sits on a 3 m scaffold. You drop it. How fast is it travelling when it hits the ground (ignoring air resistance, g = 9.81)?',
    options: ['About 9.8 m/s', 'About 30 m/s', 'About 3 m/s', 'About 7.7 m/s'],
    correctIndex: 3,
    explanation:
      'PE → KE. mgh = ½mv². v = √(2gh) = √(2 × 9.81 × 3) = √58.86 ≈ 7.67 m/s. That’s why dropped tools at height are so dangerous — they hit hard.',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What is "work" in mechanics?',
    options: [
      'The total force applied to an object, whether it moves or not',
      'Force × distance moved in the direction of the force',
      'The energy an object stores by being lifted up high',
      'How long a force is applied for, measured in seconds',
    ],
    correctAnswer: 1,
    explanation:
      'Work = force × distance moved in the direction of the force. Unit: joule (J). 1 J = 1 N moved through 1 m.',
  },
  {
    id: 2,
    question: 'What is the SI unit of energy?',
    options: ['Kilogram (kg)', 'Newton (N)', 'Joule (J)', 'Watt (W)'],
    correctAnswer: 2,
    explanation:
      'Joule (J). Work and energy use the same unit because they’re really the same thing — energy is the capacity to do work.',
  },
  {
    id: 3,
    question: 'Which formula gives kinetic energy?',
    options: ['KE = F × d', 'KE = m × g × h', 'KE = m × v', 'KE = ½ × m × v²'],
    correctAnswer: 3,
    explanation:
      'KE = ½ × m × v². Note the v is squared — double the speed and you quadruple the kinetic energy. That’s why a fast falling object hits SO much harder than a slow one.',
  },
  {
    id: 4,
    question: 'Which formula gives gravitational potential energy?',
    options: ['PE = m × g × h', 'PE = ½ × m × v²', 'PE = F × d × t', 'PE = m × a'],
    correctAnswer: 0,
    explanation:
      'PE = m × g × h. Mass times gravity times height above your reference level. Lift something up and you’re storing energy in the gravitational field.',
  },
  {
    id: 5,
    question: 'You lift a 10 kg load 3 m. How much work have you done against gravity (g = 9.81)?',
    options: ['98.1 J', '294.3 J', '30 J', '147 J'],
    correctAnswer: 1,
    explanation:
      'Work = F × d = mg × h = 10 × 9.81 × 3 = 294.3 J. That’s also the gain in PE. Same number, two ways to think about it.',
  },
  {
    id: 6,
    question: 'What does the "law of conservation of energy" say?',
    options: [
      'Energy always flows from a hot object to a cold one until they match',
      'Energy is gradually used up and lost whenever work is done',
      'Energy cannot be created or destroyed — only transferred or converted from one form to another',
      'Energy can be created by a machine but never destroyed once made',
    ],
    correctAnswer: 2,
    explanation:
      'You don’t use energy up — you change it from one form into another. KE into heat (brakes), chemical into KE (you eating then climbing a ladder), electrical into light (LED). Total energy stays the same.',
  },
  {
    id: 7,
    question: 'A 2 kg object moves at 4 m/s. What is its kinetic energy?',
    options: ['4 J', '8 J', '32 J', '16 J'],
    correctAnswer: 3,
    explanation: 'KE = ½ × 2 × 4² = ½ × 2 × 16 = 16 J. Don’t forget to square the velocity FIRST.',
  },
  {
    id: 8,
    question:
      'A 0.5 kg drill is dropped from 4 m. Just before it hits the floor, what is its KE (ignoring air resistance, g = 9.81)?',
    options: ['About 19.6 J', 'About 39.2 J', 'About 2 J', 'About 9.8 J'],
    correctAnswer: 0,
    explanation:
      'PE at top = mgh = 0.5 × 9.81 × 4 = 19.62 J. All of it converts to KE at the bottom. KE just before impact ≈ 19.6 J.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'What does "work" really mean in physics terms?',
    answer:
      'Work is force times distance moved IN the direction of the force. Pushing a heavy crate that doesn’t move = no work done (in the physics sense), even if you’re sweating buckets. Lifting a 10 kg unit 1 m = 98 J of work. Pushing the same unit 1 m sideways across a floor = whatever the friction force was, times 1 m.',
  },
  {
    question: 'Why is it ½ m v² and not just m v²?',
    answer:
      'Comes from the maths of accelerating from rest. The average speed during acceleration is half the final speed (assuming constant acceleration), so the work done averages out to half mv². Don’t worry about the derivation — just remember the ½ is there.',
  },
  {
    question: 'What counts as "height" for PE?',
    answer:
      'Always measured from a reference level — usually the floor, or wherever the object will end up. Lifting a 5 kg unit from the floor up onto a 1.2 m bench: h = 1.2 m, PE gain = 5 × 9.81 × 1.2 ≈ 59 J. Lifting the same unit from the bench up to a 2 m wall fixing: h = 0.8 m (the extra above the bench), PE gain ≈ 39 J.',
  },
  {
    question:
      'A spanner falls off scaffold and hits the floor. Where does the energy go after impact?',
    answer:
      'Mostly into heat, sound and a little bit of permanent deformation (a chip out of the floor, or a dent in the spanner). The KE just before impact got "spent" on bending atoms, vibrating air molecules and warming things up. Conservation of energy: total in = total out, just in a less useful form afterwards.',
  },
  {
    question: 'How does this apply to the electrical work I’ll be doing?',
    answer:
      'The same energy unit (joule) carries through to electrical theory. 1 watt = 1 joule per second. The 100 J you used lifting a 10 kg cable is exactly the same kind of joule that flows through your meter when you draw 100 W for one second. Mechanical and electrical energy are interchangeable — that’s why motors and generators work.',
  },
  {
    question: 'Why do dropped tools at height cause so much damage?',
    answer:
      'KE = ½mv² and v depends on √(2gh). Drop a 0.5 kg spanner from 1 m and it hits at about 4.4 m/s with about 5 J. Drop the same spanner from 10 m and it hits at about 14 m/s with about 49 J — ten times the energy in the same spanner. That’s why working at height needs lanyards, exclusion zones below, and "no loose tools at the edge" rules.',
  },
];

/* ── Inline check questions ──────────────────────────────────────── */

const checks2 = [
  {
    id: 'power-formula-check',
    question: 'You do 600 J of work in 10 seconds. What power did you produce?',
    options: ['60 W', '6000 W', '6 W', '600 W'],
    correctIndex: 0,
    explanation: 'P = W ÷ t = 600 ÷ 10 = 60 W. Power is work per unit time. Unit: watt (W).',
  },
  {
    id: 'power-vs-energy-check',
    question:
      'Two electricians both lift a 30 m drum of T+E (~25 kg) up to a 5 m platform. Sam takes 30 seconds. Pat takes 60 seconds. Who did more WORK, and who produced more POWER?',
    options: [
      'Same work; Sam produced more power',
      'Sam did more work; Pat produced more power',
      'Same work; Pat produced more power',
      'Pat did more work; Sam produced more power',
    ],
    correctIndex: 0,
    explanation:
      'Same load, same height = same work (mgh ≈ 1226 J). Sam did it in half the time, so produced double the power. Power is the time half of the equation.',
  },
  {
    id: 'mech-vs-electrical-check',
    question: 'A motor is rated 500 W mechanical output. What does that mean in plain terms?',
    options: [
      'It does 500 J of mechanical work every second',
      'It draws exactly 500 W of electrical power from the supply',
      'It can lift a 500 N load to any height you need',
      'It uses 500 J of energy in total before it stops',
    ],
    correctIndex: 0,
    explanation:
      '1 W = 1 J/s. A 500 W motor delivers 500 J of useful mechanical work per second at the shaft. The electrical input will be more than 500 W (because no motor is 100% efficient).',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question: 'What is power?',
    options: [
      'The total amount of work an object can do',
      'The rate at which work is done (or energy is transferred)',
      'The force needed to move a load a fixed distance',
      'The energy stored in an object when it is lifted up',
    ],
    correctAnswer: 1,
    explanation:
      'Power = work ÷ time. It’s how fast the work happens. Bigger power = same job done in less time, OR a bigger job done in the same time.',
  },
  {
    id: 2,
    question: 'What is the SI unit of power?',
    options: ['Newton (N)', 'Joule (J)', 'Watt (W)', 'Newton-metre (N·m)'],
    correctAnswer: 2,
    explanation:
      'Watt (W). 1 W = 1 J/s — one joule of work done per second. Named after James Watt, the steam-engine engineer.',
  },
  {
    id: 3,
    question: 'Which formula gives mechanical power?',
    options: ['P = F × t', 'P = W × t', 'P = m × g', 'P = W ÷ t'],
    correctAnswer: 3,
    explanation: 'P = work done ÷ time taken. Watts = joules per second.',
  },
  {
    id: 4,
    question: 'Lifting a 20 kg load 2 m in 4 seconds requires roughly what power (g = 9.81)?',
    options: ['98 W', '49 W', '10 W', '392 W'],
    correctAnswer: 0,
    explanation:
      'Work = mgh = 20 × 9.81 × 2 = 392.4 J. Power = work ÷ time = 392.4 ÷ 4 ≈ 98 W. Same job in 2 seconds would need 196 W.',
  },
  {
    id: 5,
    question: 'How is mechanical power related to electrical power?',
    options: [
      'They’re different — mechanical uses watts, electrical uses joules',
      'Both are measured in watts; 1 W = 1 J/s in both cases',
      'They can’t be compared',
      'Electrical is always 10× bigger than mechanical',
    ],
    correctAnswer: 1,
    explanation:
      'Same SI unit, same definition. That’s why a 1 kW motor draws roughly 1 kW of electrical power (a bit more, because it’s not 100% efficient — but the units are exactly the same).',
  },
  {
    id: 6,
    question: 'Why might you choose a higher-power tool for a job?',
    options: [
      'To use less total energy to finish the same job',
      'Because higher-power tools are always more efficient',
      'To do the job faster — same energy, less time',
      'Because it will run cooler than a lower-power tool',
    ],
    correctAnswer: 2,
    explanation:
      'A higher-power tool gets the same work done in less time. The total energy needed for the job is roughly the same — power just controls how fast you can do it.',
  },
  {
    id: 7,
    question:
      'A motor delivers 750 J of mechanical work in 5 seconds. What is its mechanical power output?',
    options: ['75 W', '3750 W', '375 W', '150 W'],
    correctAnswer: 3,
    explanation: 'P = W ÷ t = 750 ÷ 5 = 150 W. Quick check: 150 J/s × 5 s = 750 J. Tallies up.',
  },
  {
    id: 8,
    question: 'A horsepower is roughly equal to…',
    options: ['750 W', '75,000 W', '10 W', '100 W'],
    correctAnswer: 0,
    explanation:
      '1 horsepower ≈ 746 W (rounded to 750 W in the trade). It’s an old imperial unit — stick to watts in any UK exam, but it’s useful for estimating motor sizes from US spec sheets.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────── */

const faqs2 = [
  {
    question: 'Why does power matter on site?',
    answer:
      'Sizing kit. A 600 W jigsaw will eventually do the same cut a 1200 W jigsaw will do — but it’ll take twice as long and run hotter. Battery sizing is the same: a 18V 5Ah battery has the same total energy as another 18V 5Ah battery, but a higher current rating means more peak power. Knowing P = W ÷ t lets you make sensible choices.',
  },
  {
    question: 'What’s the link between watts and amps?',
    answer:
      'For DC and resistive AC loads, P = V × I (volts times amps). For an electric drill on 230 V drawing 4 A, that’s roughly 920 W of input power. The mechanical output at the chuck will be less — the difference is the motor’s losses. You’ll properly meet P = V × I in the lesson on electrical power.',
  },
  {
    question: 'Why is the watt named after James Watt?',
    answer:
      'James Watt was the Scottish engineer who massively improved the steam engine in the 1760s. He was the first to systematically measure the rate at which engines did work — comparing them to teams of horses (hence "horsepower"). The SI unit was named after him in 1960. He’d have approved.',
  },
  {
    question: 'Is "kilowatt-hour" (kWh) a unit of power or energy?',
    answer:
      'Energy. The little trap on every exam paper. A kWh is a power (1 kW) sustained for a time (1 hour) — multiply them together and you get energy. 1 kWh = 1000 J/s × 3600 s = 3,600,000 J = 3.6 MJ. Your electricity bill is in kWh because the joule is too small a unit for household amounts.',
  },
  {
    question: 'Can power be negative?',
    answer:
      'In a sense — yes, when work is being done ON a system rather than BY it. A motor running normally produces positive mechanical power. The same motor acting as a generator (e.g. when an EV regenerates braking energy) does work on the electrical side and absorbs mechanical work on the shaft. Same sign convention principle, just flipped.',
  },
  {
    question: 'How does power link to efficiency?',
    answer:
      'Efficiency compares useful POWER out to total POWER in. A 1500 W kettle puts almost all of that into heating water (efficiency ~98%). A 1500 W petrol engine wastes about 3/4 of the input as heat (efficiency ~25%). Same input power, very different useful output.',
  },
];

export default function Lesson307E_3_4() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Work = force × distance. Energy = the capacity to do work. The two flavours that dominate
        basic mechanics are KE (motion) and PE (height) — and they convert into each other every
        time something falls.
      </p>

      <TLDR
        points={[
          'Work = Force × distance (in the direction of the force). Unit: joule (J).',
          'Energy is the ability to do work. Same unit (J). Comes in many forms — KE, PE, heat, electrical, chemical.',
          'KE = ½mv² (the energy of motion). PE = mgh (the energy stored by being up high).',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Define mechanical work and give its SI unit (joule).',
          'Calculate work done from W = F × d.',
          'Define kinetic and gravitational potential energy and apply the formulas.',
          'Explain the conservation of energy principle in plain English.',
          'Trace energy as it converts between PE, KE, heat and other forms.',
          'Use these ideas to assess real on-site risks (dropped tools, lifted loads).',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Work — what physics actually means</ContentEyebrow>

      <ConceptBlock
        title="Work = force × distance moved"
        plainEnglish="If a force makes something move, you’ve done work. No movement = no work, however tired you feel."
        onSite="Pushing a 25 kg drum across a 5 m corridor (with friction force of, say, 50 N) means you’ve done 50 × 5 = 250 J of work against friction. That energy goes into heat in the floor and the drum bearings."
      >
        <p>The formula:</p>
        <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          W = F × d
        </p>
        <p>
          Where W is work in <strong>joules (J)</strong>, F is force in newtons, and d is the
          distance moved in metres. 1 J of work is what you do when you push 1 N through 1 m.
          That’s a small unit — lifting a litre of milk (about 10 N) by 1 m takes 10 J.
        </p>
        <p>
          Important catch: the distance has to be in the direction of the force. Holding a 20 kg
          consumer unit dead still in your arms = no work, in the physics sense, even though your
          muscles are screaming. Walk 5 m carrying it horizontally = still no work against gravity
          (gravity is vertical, your motion is horizontal).
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BIPM SI Brochure (9th edition, 2019) — derived units"
        clause="The joule (J) is the SI derived unit of energy and work, defined as the work done when a force of one newton is applied to an object that moves one metre in the direction of the force. 1 J = 1 N·m = 1 kg·m²/s²."
        meaning={
          <>
            Same unit for energy and work. That’s not a coincidence — energy <em>is</em> the
            capacity to do work, and the only way to transfer energy mechanically is to do work.
            Don’t mix the joule up with the newton-metre when used for torque (same units
            algebraically, but a different physical meaning).
          </>
        }
        cite="Source: BIPM SI Brochure, 9th edition; National Physical Laboratory (NPL) UK"
      />

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Energy — the ability to do work</ContentEyebrow>

      <ConceptBlock
        title="Energy comes in many forms — but always the same units"
        plainEnglish="Anything that can do work has energy. Energy in your battery, in a cable drum lifted up high, in a spinning fan, in a hot kettle. All measured in joules."
      >
        <p>
          Energy is the ability of a system to do work. Same unit as work — the joule. The forms
          you’ll meet most:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Kinetic energy (KE):</strong> energy of motion. Moving things have it.
          </li>
          <li>
            <strong>Gravitational potential energy (PE):</strong> energy of being up high.
            Anything raised against gravity has stored PE.
          </li>
          <li>
            <strong>Elastic potential energy:</strong> stretched springs, bent metal, taut cables.
          </li>
          <li>
            <strong>Chemical energy:</strong> stored in food, fuel, batteries.
          </li>
          <li>
            <strong>Electrical energy:</strong> in flowing charge, in a charged capacitor.
          </li>
          <li>
            <strong>Thermal (heat) energy:</strong> the random motion of atoms in a hot substance.
          </li>
          <li>
            <strong>Light, sound, nuclear:</strong> all energy too. All in joules.
          </li>
        </ul>
        <p>
          Energy can be converted from one form to another, but the total amount in a closed
          system stays the same. That’s the <strong>law of conservation of energy</strong> — the
          most important rule in physics.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Kinetic energy — the energy of motion</ContentEyebrow>

      <ConceptBlock
        title="KE = ½ × m × v²"
        plainEnglish="Heavier or faster moving things carry more energy. Speed counts double — twice the speed = four times the energy."
        onSite="A 0.5 kg spanner falling at 14 m/s (from 10 m) hits with about 49 J — enough to crack a tile, dent a hard hat, and put someone in A&E if it lands on a head. The same spanner walking around your tool belt at 1 m/s carries 0.25 J — basically nothing."
      >
        <p>The formula:</p>
        <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          KE = ½ × m × v²
        </p>
        <p>
          KE in joules, mass in kilograms, velocity in m/s. The velocity is{' '}
          <strong>squared</strong> — that’s the killer detail. Double the speed and you don’t
          double the KE, you quadruple it. Triple the speed and KE goes up nine times.
        </p>
        <p>
          Worked example: a 2 kg cable drum rolls across the floor at 3 m/s. KE = ½ × 2 × 3² = ½ ×
          2 × 9 = 9 J. To stop it, something has to absorb 9 J — usually friction at the brakes or
          the wall it crashes into.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Potential energy — the energy of height</ContentEyebrow>

      <ConceptBlock
        title="PE = m × g × h"
        plainEnglish="Lift something up against gravity, and you’ve stored energy in it. Drop it again, and that energy comes back out as motion."
        onSite="Lifting a 20 kg consumer unit 2 m onto a wall = 20 × 9.81 × 2 = 392 J of PE stored. The unit is now ‘holding’ that energy. If the bracket fails and it falls, all 392 J turn into KE — and then into a wrecked floor and a wrecked unit."
      >
        <p>The formula:</p>
        <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          PE = m × g × h
        </p>
        <p>
          PE in joules, mass in kg, g = 9.81 m/s² (Earth), h in metres. Note: h is the height
          above your <strong>reference level</strong> — usually the ground or the floor.
        </p>
        <p>
          Lifting anything against gravity stores PE equal to the work you did against gravity.
          That’s why W = mgh keeps showing up — it’s the same calculation whether you call it
          "work done against gravity" or "PE gained".
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The conversion — PE ↔ KE</ContentEyebrow>

      <ConceptBlock
        title="When something falls, PE turns into KE — and vice versa"
        plainEnglish="At the top: all PE, no KE. At the bottom: no PE, all KE. Total stays the same (ignoring friction and air resistance)."
      >
        <p>
          A 1 kg spanner sits on a 3 m scaffold deck. It has PE = 1 × 9.81 × 3 = 29.43 J and no KE
          (it’s not moving). Knock it off. As it falls:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Halfway down (1.5 m): PE = 14.7 J, KE = 14.7 J — half each.</li>
          <li>Just before impact (h ≈ 0): PE ≈ 0, KE ≈ 29.43 J — all kinetic.</li>
          <li>
            Velocity at impact: ½mv² = 29.43, so v = √(2 × 29.43 ÷ 1) ≈ 7.67 m/s. About the speed
            of a brisk jog — more than enough to do real damage.
          </li>
        </ul>
        <p>
          At impact, that 29.43 J of KE doesn’t vanish — it converts into heat, sound and a dent
          in whatever it hit. Energy is still conserved, just no longer in a useful form.
        </p>
      </ConceptBlock>

      <EnergyTransfer
        eyebrow="PE → KE on a slope (or in free-fall)"
        caption="At the top: max PE, zero KE. At the bottom: zero PE, max KE. Total energy constant. Same maths whether it’s a marble on a ramp or a tool off scaffold."
      />

      <ConceptBlock
        title="Dropped-tool impact table — what mgh actually means in joules"
        plainEnglish="The reg callout below says ‘PE = mgh tells you exactly why’ falling tools are dangerous. Here are the numbers behind that, for tools you carry every day."
        onSite="The impact velocity v = √(2gh) only depends on the height — every tool, regardless of mass, hits at the same speed from the same height. The MASS scales how much energy that speed carries. A 3 kg lump hammer at 12 m has ten times the KE of a 0.3 kg screwdriver at the same height — same impact speed, ten times the punch."
      >
        <p>Impact velocity (in air, ignoring drag): v = √(2gh) with g = 9.81 m/s². So:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1 m drop</strong> → impact speed ≈ 4.4 m/s (about brisk walking pace)
          </li>
          <li>
            <strong>3 m drop</strong> → impact speed ≈ 7.7 m/s (about a slow jog)
          </li>
          <li>
            <strong>6 m drop</strong> → impact speed ≈ 10.9 m/s (about a sprint)
          </li>
          <li>
            <strong>12 m drop</strong> → impact speed ≈ 15.3 m/s (about 34 mph)
          </li>
        </ul>
        <p>
          Kinetic energy at impact = mgh (all of the PE has converted). Read across by tool, down
          by drop height. Every value below is in <strong>joules</strong>.
        </p>
        {/* Mobile (<sm): card per drop height. Desktop (≥sm): same card grid — no horizontal scroll on either. */}
        <div className="space-y-3">
          {[
            {
              height: '1 m',
              speed: '≈ 4.4 m/s (brisk walk)',
              highlight: false,
              values: [
                { tool: '0.3 kg screwdriver', joules: '2.9 J' },
                { tool: '0.8 kg adjustable', joules: '7.8 J' },
                { tool: '2 kg drill', joules: '19.6 J' },
                { tool: '3 kg lump hammer', joules: '29.4 J' },
              ],
            },
            {
              height: '3 m',
              speed: '≈ 7.7 m/s (slow jog)',
              highlight: false,
              values: [
                { tool: '0.3 kg screwdriver', joules: '8.8 J' },
                { tool: '0.8 kg adjustable', joules: '23.5 J' },
                { tool: '2 kg drill', joules: '58.9 J' },
                { tool: '3 kg lump hammer', joules: '88.3 J' },
              ],
            },
            {
              height: '6 m',
              speed: '≈ 10.9 m/s (sprint)',
              highlight: false,
              values: [
                { tool: '0.3 kg screwdriver', joules: '17.7 J' },
                { tool: '0.8 kg adjustable', joules: '47.1 J' },
                { tool: '2 kg drill', joules: '117.7 J' },
                { tool: '3 kg lump hammer', joules: '176.6 J' },
              ],
            },
            {
              height: '12 m',
              speed: '≈ 15.3 m/s (about 34 mph)',
              highlight: true,
              values: [
                { tool: '0.3 kg screwdriver', joules: '35.3 J' },
                { tool: '0.8 kg adjustable', joules: '94.2 J' },
                { tool: '2 kg drill', joules: '235.4 J' },
                { tool: '3 kg lump hammer', joules: '353.2 J' },
              ],
            },
          ].map((row) => (
            <div
              key={row.height}
              className={`rounded-xl border p-3 sm:p-4 ${
                row.highlight
                  ? 'border-orange-400/30 bg-orange-500/[0.06]'
                  : 'border-white/[0.08] bg-white/[0.03]'
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2.5">
                <div className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-elec-yellow/90">
                  Drop height
                </div>
                <div className="text-[15px] font-semibold text-white">{row.height}</div>
                <div className="text-[12px] text-white/60">{row.speed}</div>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-[13px]">
                {row.values.map((v) => (
                  <li
                    key={v.tool}
                    className="flex items-baseline justify-between gap-3 border-b border-white/[0.04] pb-1 last:border-b-0 sm:border-b-0 sm:pb-0"
                  >
                    <span className="text-white/80">{v.tool}</span>
                    <span
                      className={`font-semibold tabular-nums ${
                        row.highlight ? 'text-orange-300' : 'text-white/95'
                      }`}
                    >
                      {v.joules}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p>
          For scale: a typical hard hat is rated to absorb about 50 J of crown impact (BS EN 397).
          Anything in the orange row at 12 m blows past that — the lid will help, but it isn't
          designed to take that hit. A 2 kg drill from the top of a four-storey scaffold delivers
          ~235 J onto a single point, regardless of how much PPE the labourer below is wearing.
          That's why "no loose tools at the edge", lanyards and exclusion zones are the actual
          control — PPE is the last line, not the first.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="HSE INDG401 — Working at height: A brief guide (rev2)"
        clause="The Work at Height Regulations 2005 apply to all work at height where there is a risk of a fall liable to cause personal injury. Employers must take suitable and sufficient measures to prevent — so far as is reasonably practicable — any person falling a distance liable to cause personal injury, AND prevent any object falling. Where this is not practicable, measures must minimise the distance and consequences of any fall."
        meaning={
          <>
            The reg explicitly cares about <strong>falling objects</strong>, not just falling
            people. PE = mgh tells you exactly why. A tool at 6 m has six times the PE of one at 1
            m, and converts to six times the KE on the way down. That’s why tool tethers, debris
            nets and exclusion zones below scaffolding aren’t optional extras.
          </>
        }
        cite="Verbatim wording paraphrased — see HSE INDG401 (rev2) Working at Height: A Brief Guide for the full text. Statutory basis: Work at Height Regulations 2005 (SI 2005/735)."
      />

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Conservation of energy</ContentEyebrow>

      <ConceptBlock
        title="Energy is never made or destroyed — only converted"
        plainEnglish="You don’t ‘use up’ energy. You convert it from one form into another. Useful electrical energy goes to heat (a lot of it), light, motion. The total never changes."
        onSite="A drill battery holds, say, 60 Wh of chemical energy. While drilling, that turns into KE in the bit, heat in the motor, heat in the masonry, sound, and a small amount stored as heat in the bearings. Total joules out = total joules in. ‘Wasted’ heat isn’t destroyed — it’s just energy in a form you can’t do useful work with anymore."
      >
        <p>
          The first law of thermodynamics, stripped down: energy can be converted from one form to
          another, but the total energy in a closed system stays constant.
        </p>
        <p>
          That’s why an electric kettle’s 2.4 kW input shows up as a roughly 2.4 kW heating effect
          (almost all of the electrical energy converts to heat in the element). It’s why a motor
          that draws 1 kW of electrical power produces something less than 1 kW of mechanical
          power — the rest leaks out as heat in the windings and friction in the bearings.
          Efficiency is the rest of this story.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Where work and energy show up on site"
        plainEnglish="W = F × d, KE = ½mv², PE = mgh and E = ½CV² aren’t exam props — they describe specific moments you’ll meet on site where the maths suddenly becomes real."
        onSite="If you can name the formula, you can predict what the kit is about to do. That’s the difference between a controlled job and a near-miss."
      >
        <p>Four real moments, each with the formula behind it:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Lifting a CU into a loft (PE = mgh).</strong> A 6 kg metal CU lifted 2.5 m
            into a loft hatch stores about 6 × 9.81 × 2.5 ≈ 147 J of PE. Not a lot — but if your
            grip slips, every joule comes back out as KE on the way down. This is why two people
            lift a CU above shoulder height, every time.
          </li>
          <li>
            <strong>Drill battery runtime (E = P × t).</strong> An 18 V 5 Ah battery holds roughly
            18 × 5 = 90 Wh ≈ 324 kJ of usable energy. Run a 500 W drill flat-out and you get about
            90 ÷ 0.5 ≈ 180 minutes of theoretical runtime — but heat losses and voltage sag mean
            real runtime is much shorter. Same energy, different power, very different time.
          </li>
          <li>
            <strong>
              The energy in a charged capacitor that bites you (E = ½CV²).
            </strong>{' '}
            A 470 µF capacitor in a VFD or a switched-mode PSU charged to 400 V holds ½ × 470 ×
            10⁻⁶ × 400² ≈ 37.6 J. Held in a small body that can dump it through your hand in
            milliseconds, that’s easily a stopping-the-heart shock. Why isolation alone isn’t
            enough on a drive — you safely discharge bus capacitors before touching them.
          </li>
          <li>
            <strong>Why a fuse blows on inrush (I²t through the link).</strong> A fuse element
            fails when enough energy (I²t — current squared times time) heats and melts it. A
            heavy inrush current carries lots of joules per second; the link absorbs them quickly,
            hits melting point, parts. Same conservation-of-energy story, just resolved in a few
            milliseconds inside a glass tube.
          </li>
        </ul>
        <p>
          Each one is a moment you’ll meet — sometimes calmly (sizing a battery), sometimes
          suddenly (a dropped CU, a capacitor bite). Naming the formula is what lets you size the
          risk before it sizes you.
        </p>
      </ConceptBlock>

      <CommonMistake
        title="Adding work, KE and PE in different units"
        whatHappens={
          <>
            The exam gives you a 5 kg load, lifted 2 m, then released. You write the PE as "5 ×
            9.81 × 2 = 98.1" and tick it as the answer. Examiner asks "in what units?" — and you
            lose the mark for not writing J.
          </>
        }
        doInstead={
          <>
            Always finish with the unit. <strong>J for energy and work.</strong> If your numbers
            were kg × m/s² × m, the units multiply out to kg·m²/s² — which is exactly what 1 joule
            is. Sanity check: weird units in your answer = something’s wrong.
          </>
        }
      />

      <Scenario
        title="A scaffold-deck near-miss"
        situation={
          <>
            You’re halfway up a four-level scaffold (12 m up) running cable to a high-bay light.
            The labourer below sees a 0.8 kg adjustable spanner sitting on the edge of your deck,
            behind your toolbox. He shouts up just before it tips off.
          </>
        }
        whatToDo={
          <>
            Stop. Move every loose tool away from the edge. Use lanyards or a tool tether for
            anything not in a closed bag. Tape off the area below for the rest of the job. Speak
            to your supervisor about the near-miss — it gets logged, even though no-one was hit.
          </>
        }
        whyItMatters={
          <>
            PE at 12 m = 0.8 × 9.81 × 12 ≈ 94 J. That converts to roughly 15 m/s impact velocity —
            about as fast as a moped at low speed, with all 94 J focused on a single hard point. A
            hard hat helps but isn’t designed to absorb impacts that big. The Work at Height Regs
            require you to prevent objects falling — not just to wear a lid in case they do.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Work = force × distance moved in the direction of the force. Unit: joule (J).',
          'Energy = the capacity to do work. Same unit (J). Same fundamental quantity, different perspective.',
          'KE = ½mv². The v is squared — double the speed, four times the energy. That’s why falling tools at height are a serious hazard.',
          'PE = mgh. Lifting against gravity stores energy. Drop the object, and that PE converts to KE on the way down.',
          'Conservation of energy: total energy in a closed system never changes. Forms convert into each other; the total stays the same.',
          'Work at Height Regs 2005 demand falling-object prevention precisely because PE → KE means a small tool at height = a serious projectile.',
        ]}
      />

      {/* ── Quiz ────────────────────────────────────────────── */}

      <Quiz title="Work and energy knowledge check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Power is the rate at which work is done. Same lift in half the time = double the power.
        Same SI unit (the watt) for mechanical and electrical — that’s the bridge between this
        module’s mechanics and its electrics.
      </p>

      <TLDR
        points={[
          'Power = work done ÷ time taken. Unit: watt (W). 1 W = 1 J/s.',
          'Same job in less time = more power. Same time, more work = more power.',
          'Same unit (W) covers both mechanical AND electrical power. That’s why a 1 kW motor and a 1 kW kettle compare directly.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Define power as the rate of doing work and give its SI unit (watt).',
          'Apply P = W ÷ t to calculate mechanical power.',
          'Distinguish between work, energy and power — and use the correct unit for each.',
          'Convert between kilowatts, watts and horsepower for sense-checks2.',
          'Recognise that mechanical and electrical power share the same unit and the same fundamental meaning.',
          'Relate power to time pressure on real on-site jobs.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Power — work over time</ContentEyebrow>

      <ConceptBlock
        title="Power = how fast you’re doing the work"
        plainEnglish="Two people lift the same load up the same ladder. The faster one is producing more power, even though both did the same work."
        onSite="A 1500 W kettle boils a litre of water in roughly 3.5–4 minutes. A 750 W travel kettle boils the same litre in roughly 7–8 minutes. Same total energy in (about 335 kJ to heat the water), half the power — twice the time."
      >
        <p>The formula is simple:</p>
        <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          P = W ÷ t
        </p>
        <p>
          Where P is power in <strong>watts (W)</strong>, W is work done in joules, and t is time
          in seconds. 1 watt = 1 joule per second. A 100 W lamp transfers 100 J of electrical
          energy to light and heat every single second. Most of it heat, in an old-school filament
          lamp.
        </p>
        <p>Rearranged versions for problems where you have power and want work or time:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>W = P × t</strong> — total work done over a time period.
          </li>
          <li>
            <strong>t = W ÷ P</strong> — how long a job will take at a given power.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BIPM SI Brochure (9th edition, 2019) — derived units"
        clause="The watt (W) is the SI derived unit of power, defined as one joule per second. 1 W = 1 J/s = 1 kg·m²/s³. The watt is also used for the rate of transfer of any form of energy, including electrical and electromagnetic."
        meaning={
          <>
            Same definition for mechanical power, electrical power, light power, heat power.
            That’s why your kettle, drill, immersion heater and PV inverter are all rated in watts
            (or kilowatts) — they all transfer energy at a rate, and the rate is in J/s.
          </>
        }
        cite="Source: BIPM SI Brochure, 9th edition; National Physical Laboratory (NPL) UK"
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Same job, less time, more power</ContentEyebrow>

      <ConceptBlock
        title="Power is the time-pressure version of work"
        plainEnglish="If two people both lift the same load up the same ladder, they’ve done the same amount of work — but the faster one produced more power."
        onSite="Pulling a 30 m drum of T+E up a ladder to a first-fix consumer position. Drum mass ≈ 25 kg. Lift height ≈ 5 m. Work = 25 × 9.81 × 5 ≈ 1226 J. If you do it in 30 s, P = 1226 ÷ 30 ≈ 41 W. Do it in 15 s and your power output doubles to 82 W. Knackering — but quicker."
      >
        <p>
          That’s the "fitness vs time" trade-off in physics terms. A power output of around 100 W
          is sustainable for a healthy adult for hours (roughly the work of a steady cycle ride).
          Bursts up to 500 W are achievable for short periods. A horse, by contrast, can sustain
          about 750 W — which is where the unit "horsepower" came from.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Worked example — sizing a hoist"
        plainEnglish="If you know the load (and so the work) and the time you’ve got, you can work out the minimum power needed."
      >
        <p>
          A small chain hoist needs to lift a 200 kg distribution board up a 4 m service riser, in
          no more than 30 seconds. What power is needed?
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Work to lift = mgh = 200 × 9.81 × 4 = 7848 J.</li>
          <li>Time available = 30 s.</li>
          <li>
            Minimum power = W ÷ t = 7848 ÷ 30 ≈ <strong>262 W</strong>.
          </li>
        </ul>
        <p>
          In practice you’d size the motor 30-50% above that to allow for friction and
          acceleration losses. So you’d look for a hoist rated around 350-400 W. The same lift in
          60 seconds would only need ≈ 130 W — half the power for double the time. Same total work
          either way.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The bridge to electrical power</ContentEyebrow>

      <ConceptBlock
        title="A watt is a watt — mechanical or electrical"
        plainEnglish="The reason a motor’s electrical input and mechanical output use the same unit is they’re the same kind of thing. Energy per second."
        onSite="A drill labelled ‘500 W’ usually means electrical input power. The shaft output (mechanical power) will be less — maybe 350-400 W after motor losses. The difference comes out as heat in the windings (which is why a hard-working drill gets hot)."
      >
        <p>Electrical power for DC and resistive AC loads:</p>
        <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          P = V × I
        </p>
        <p>
          Where V is voltage in volts and I is current in amps. The result is in watts — exactly
          the same watts as P = W ÷ t in mechanics. That’s the bridge that lets us say "a 1 kW
          motor on 230 V draws roughly 4.3 A".
        </p>
        <p>
          You’ll meet P = V × I properly in the next section of this module. The point here:{' '}
          <strong>the watt is universal.</strong> A 1 kW kettle, a 1 kW motor, a 1 kW PV panel and
          a 1 kW heater all transfer energy at the same rate (1000 J every second), even though
          the form of the energy is different.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Watts, kilowatts, megawatts and horsepower</ContentEyebrow>

      <ConceptBlock
        title="The prefixes you’ll meet"
        plainEnglish="Don’t get bitten by a 1000× error. A kilowatt is a thousand watts. A megawatt is a million."
      >
        <p>The everyday range:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Milliwatt (mW):</strong> a thousandth of a watt. Tiny — sensors, indicator
            LEDs.
          </li>
          <li>
            <strong>Watt (W):</strong> the SI base for power. Hand torch (≈3 W), phone charger
            (≈5-20 W), laptop (≈60-100 W).
          </li>
          <li>
            <strong>Kilowatt (kW):</strong> 1000 W. Domestic appliances — kettles (2-3 kW),
            immersions (3 kW), showers (8-10.5 kW), EV chargers (7-22 kW).
          </li>
          <li>
            <strong>Megawatt (MW):</strong> 1,000,000 W. Substations, wind turbines, big
            generators.
          </li>
          <li>
            <strong>Horsepower (hp):</strong> not SI. 1 hp ≈ 746 W (round to 750 W on site).
            Mostly seen on petrol/diesel kit and US spec sheets.
          </li>
        </ul>
      </ConceptBlock>

      <CommonMistake
        title="Mixing up units in P = W ÷ t calculations"
        whatHappens={
          <>
            The exam gives you 1.5 kJ of work done in 30 seconds. You write P = 1.5 ÷ 30 = 0.05 W.
            Wrong by a factor of 1000 — 1.5 kJ = 1500 J, so P = 1500 ÷ 30 = 50 W.
          </>
        }
        doInstead={
          <>
            Always convert kJ to J (×1000) and minutes to seconds (×60) BEFORE plugging into the
            formula. SI units in, SI units out. If your answer comes out 1000× too big or too
            small for the situation, you’ve almost certainly slipped on a prefix.
          </>
        }
      />

      <Scenario
        title="600 W jigsaw or 1200 W jigsaw — the deadline before the next trade"
        situation={
          <>
            You’re cutting access notches in a fit-out floor for cable pulls. Total cut length:
            roughly 24 m of 18 mm chipboard. The next trade is in to lay screed at 14:00, so
            you’ve got 4 hours of working time. The van has a 600 W jigsaw and a 1200 W jigsaw —
            same blade, same operator. Which do you grab?
          </>
        }
        whatToDo={
          <>
            Power × time arithmetic. The 600 W tool delivers roughly half the joules per second of
            useful cutting work that the 1200 W tool does, so on the same material the cut rate is
            roughly half. Bench measurement on chipboard with a clean blade puts the 600 W jigsaw
            at about 4 m/h of cut rate; the 1200 W tool sits at about 8 m/h. So: 24 m ÷ 4 m/h ={' '}
            <strong>6 h</strong> with the 600 W (overrun by 2 hours, screed team waiting). 24 m ÷
            8 m/h = <strong>3 h</strong> with the 1200 W (done with an hour to spare). Take the
            1200 W. Factor in cord vs battery too — a corded 1200 W won’t flatten a battery
            mid-cut, where a cordless equivalent might need a swap or drop power as the cell sags.
          </>
        }
        whyItMatters={
          <>
            Tool sizing is power × time arithmetic, full stop. Same total work in the cut (joules)
            regardless of which tool — but the rate at which you can deliver those joules is what
            decides whether you’re done before the screed team arrives or blocking their job. Pick
            the right power for the deadline AND the right energy source (corded vs battery
            capacity in Wh) for the runtime. Same equation, two different practical decisions.
          </>
        }
      />

      <Scenario
        title="The drill that keeps cutting out"
        situation={
          <>
            You’re drilling 14 mm holes through a brick wall for an SDS bolt. The 18V combi drill
            keeps stalling and the chuck warms up after a couple of holes. Your supervisor hands
            you a corded 1500 W SDS instead.
          </>
        }
        whatToDo={
          <>
            Use the SDS for the masonry. The combi was working at the edge of its power envelope —
            the motor couldn’t deliver the rate of work the bit needed, so it stalled and what
            energy did get in turned into heat instead of useful work. The bigger SDS does the
            same total work per hole faster, with current to spare.
          </>
        }
        whyItMatters={
          <>
            Tool selection is a power problem. You’re asking the kit to deliver enough joules per
            second to overcome friction in the masonry plus the work of breaking it up.
            Under-rated kit takes longer, runs hot, fails early, and sometimes won’t finish the
            job at all. Right tool, right power rating, every time.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Power = work done ÷ time taken. P = W ÷ t. Unit: watt (W).',
          '1 W = 1 J/s. Same SI unit for mechanical, electrical, light and heat power.',
          'Same job in less time = more power needed. Bigger tools and motors are about delivering more joules per second.',
          'Common prefixes: mW (10⁻³), W, kW (10³), MW (10⁶). 1 hp ≈ 746 W (non-SI but still on spec sheets).',
          'Don’t confuse kWh (energy) with kW (power). Power × time = energy.',
          'Power is the bridge from this section into electrical theory: P = V × I gives watts too, and the same definition applies on both sides.',
        ]}
      />

      <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-cyan-400/40 pl-4 italic">
        <span className="not-italic font-semibold text-cyan-300 mr-1.5">
          You’ll see this again in:
        </span>
        electrical power — exactly the same P = W ÷ t and the watt as a unit, just with P = V × I
        as the way to get there. The mechanical-vs-electrical distinction is the input, not the
        maths.
      </p>

      {/* ── Quiz ────────────────────────────────────────────── */}

      <Quiz title="Mechanical power knowledge check" questions={quizQuestions2} />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
