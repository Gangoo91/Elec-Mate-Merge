/**
 * Ported from the English course, combining:
 *   level2/module2/section2/Sub2.tsx
 *   level2/module2/section2/Sub6.tsx
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
import { ForceVectorDiagram } from '@/components/study-centre/diagrams';
import { EfficiencyCalculator } from '@/components/apprentice-courses/EfficiencyCalculator';

/* ── Inline check questions ──────────────────────────────────────── */

const checks = [
  {
    id: 'force-units-check',
    question: 'A 4 kg drill is accelerated at 2 m/s². What force is needed?',
    options: ['2 N', '4 N', '6 N', '8 N'],
    correctIndex: 3,
    explanation: 'F = m × a = 4 × 2 = 8 N. That’s Newton’s second law in one line.',
  },
  {
    id: 'newton-third-law-check',
    question:
      'You pull hard on a stuck cable in a conduit. The cable doesn’t move. Why does Newton’s third law still apply?',
    options: [
      'Forces only matter when something accelerates',
      'Friction cancels gravity, so the third law switches off',
      'The cable is pulling back on you with an equal and opposite force',
      'It doesn’t — nothing’s moving so no forces are involved',
    ],
    correctIndex: 2,
    explanation:
      'Every action force has an equal and opposite reaction. The cable pulls on you just as hard as you pull on it — that’s why your hands ache after fighting one for ten minutes.',
  },
  {
    id: 'balanced-forces-check',
    question:
      'A consumer unit is bolted to a wall. Gravity pulls it down at 200 N. The bolts hold it up at 200 N. What does Newton’s first law say?',
    options: [
      'It will accelerate downward because gravity always wins',
      'It will stay at rest because the forces are balanced',
      'It will slowly creep down as the bolts can only resist for a while',
      'It will move only if a third force is added to the two',
    ],
    correctIndex: 1,
    explanation:
      'Forces balanced → no change in motion. First law in action. The moment one of those bolts gives, the forces are no longer balanced and gravity wins — fast.',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What is a force?',
    options: [
      'The amount of stuff in an object',
      'A push or a pull on an object',
      'The energy stored in something',
      'How quickly something moves',
    ],
    correctAnswer: 1,
    explanation:
      'A force is a push or a pull. It can change an object’s speed, direction or shape. Measured in newtons (N).',
  },
  {
    id: 2,
    question: 'What is the SI unit of force?',
    options: ['Watt (W)', 'Kilogram (kg)', 'Newton (N)', 'Joule (J)'],
    correctAnswer: 2,
    explanation:
      '1 N is the force needed to give a 1 kg mass an acceleration of 1 m/s². Named after Sir Isaac Newton, who worked it all out in the 1680s.',
  },
  {
    id: 3,
    question: 'Newton’s first law (the law of inertia) says…',
    options: [
      'An object always slows down and stops unless something keeps pushing it',
      'A bigger force always produces a bigger acceleration on any object',
      'Every force on an object is matched by an equal and opposite force',
      'An object stays at rest, or moves at constant speed in a straight line, unless a force acts on it',
    ],
    correctAnswer: 3,
    explanation:
      'Things don’t change motion on their own. They need a net (unbalanced) force. That’s why your van keeps going if you take your foot off the brake but the road’s wet.',
  },
  {
    id: 4,
    question: 'Newton’s second law tells you…',
    options: [
      'Force equals mass times acceleration (F = m × a)',
      'Mass equals force times acceleration',
      'Acceleration equals mass times force',
      'Force equals mass divided by gravity',
    ],
    correctAnswer: 0,
    explanation:
      'F = m × a. The bigger the mass, the more force you need to accelerate it. The bigger the force, the more it accelerates.',
  },
  {
    id: 5,
    question:
      'You push a 10 kg cable drum with a force of 30 N (no friction). What’s its acceleration?',
    options: ['0.33 m/s²', '3 m/s²', '300 m/s²', '30 m/s²'],
    correctAnswer: 1,
    explanation: 'Rearrange F = m × a → a = F ÷ m = 30 ÷ 10 = 3 m/s².',
  },
  {
    id: 6,
    question: 'Newton’s third law says…',
    options: [
      'A force always acts in the same direction as the motion',
      'The heavier an object is, the smaller the force it feels',
      'For every action there is an equal and opposite reaction',
      'Forces only act on objects that are already moving',
    ],
    correctAnswer: 2,
    explanation:
      'When you push a wall, the wall pushes back on you with the same force. It’s why your drill kicks back, why a recoiling cable hurts, and why nail guns punch.',
  },
  {
    id: 7,
    question: 'Forces on an object are balanced. What can you say?',
    options: [
      'It must be speeding up at a steady rate',
      'It must be slowing down to a stop',
      'It must be changing direction continuously',
      'It is either at rest or moving at constant velocity in a straight line',
    ],
    correctAnswer: 3,
    explanation:
      'Net force = 0 means no change in motion — that includes already-moving things. A van at 30 mph on a flat motorway with cruise control on has balanced forces too.',
  },
  {
    id: 8,
    question: 'Why does a 5 kg drill kick back when you pull the trigger hard?',
    options: [
      'Newton’s third law — the drill pushes the bit one way and the bit pushes the drill the other',
      'Newton’s first law — the drill keeps spinning even after the trigger is released',
      'Newton’s second law — the lighter the drill, the less it can ever kick',
      'Gravity — the weight of the drill pulls it back towards you',
    ],
    correctAnswer: 0,
    explanation:
      'The motor pushes the bit one way; the bit (and the wood) pushes the drill body the other. Equal and opposite. Hold it properly or it twists out of your hand.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Are Newton’s laws actually useful on site, or just exam content?',
    answer:
      'Both. They’re the reason ladders need to be footed (gravity wants to swing the base out — first law and reaction forces explain why). They’re why a drill kicks back when it bites (third law). They’re why a falling spanner from height does a lot more damage than one dropped at waist height (it accelerates the whole way down — second law). You won’t quote them on site, but you use them every day.',
  },
  {
    question: 'What’s the difference between speed, velocity and acceleration?',
    answer:
      'Speed = how fast (m/s). Velocity = speed AND direction (a vector). Acceleration = how quickly the velocity is changing (m/s²). Slowing down counts as acceleration too — it’s just negative. The exam asks about all three, so don’t get casual with the words.',
  },
  {
    question: 'Are weight and mass forces?',
    answer:
      'Weight is a force — it’s the force gravity puts on a mass, measured in newtons. Mass is NOT a force — it’s an amount of matter, measured in kilograms. The link is W = m × g, which is just Newton’s second law applied to gravity (a = g).',
  },
  {
    question: 'What does "net force" or "resultant force" mean?',
    answer:
      'It’s the single force you’d be left with if you added all the forces on an object together (taking direction into account). If two people push a drum from opposite sides with equal force, the net force is zero. Add a third pushing one way and the net force isn’t zero anymore — and the drum starts moving.',
  },
  {
    question: 'Why does a ladder feel safe on rough concrete and dodgy on smooth tile?',
    answer:
      'Friction. The base of the ladder pushes the floor; the floor pushes back. On rough concrete the friction force is high, so the base stays put. On polished tile or wet floor, friction drops, the base slides out, and the ladder swings down. Same Newton’s laws either way — different reaction forces.',
  },
  {
    question: 'How is force linked to electrical work later in the syllabus?',
    answer:
      'Magnetism. A current-carrying wire in a magnetic field experiences a force — that’s the force a motor uses to turn its shaft. The whole motor effect (covered later in this module) is just Newton’s laws happening at the wire-and-flux level.',
  },
];

/* ── Inline check questions ──────────────────────────────────────── */

const checks2 = [
  {
    id: 'efficiency-formula-check',
    question:
      'A motor draws 1000 W of electrical power and delivers 850 W of mechanical power at the shaft. What is its efficiency?',
    options: ['8.5%', '15%', '85%', '117%'],
    correctIndex: 2,
    explanation:
      'Efficiency = useful out ÷ total in × 100% = 850 ÷ 1000 × 100 = 85%. The other 150 W comes out as heat in the motor windings and friction in the bearings.',
  },
  {
    id: 'energy-in-out-check',
    question:
      'A pulley hoist lifts a 100 kg load 2 m. You put 2400 J of work into the rope. What is the efficiency (g = 9.81)?',
    options: ['About 60%', 'About 122%', 'About 95%', 'About 82%'],
    correctIndex: 3,
    explanation:
      'Useful work out = mgh = 100 × 9.81 × 2 ≈ 1962 J. Efficiency = 1962 ÷ 2400 × 100 ≈ 82%. The missing 18% went into friction in the pulleys and rope stretching.',
  },
  {
    id: 'power-from-energy-check',
    question:
      'A pump lifts 600 litres of water (600 kg) from a basement up 8 m to ground level in 2 minutes (120 s). Find the useful mechanical power delivered (g = 9.81).',
    options: ['About 4 kW', 'About 392 W', 'About 49 W', 'About 196 W'],
    correctIndex: 1,
    explanation:
      'Work = mgh = 600 × 9.81 × 8 = 47,088 J. Power = 47,088 ÷ 120 ≈ 392 W. That’s the USEFUL output — the actual electrical input to the pump will be more, divided by its efficiency.',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question: 'How is efficiency calculated?',
    options: [
      'Efficiency = total energy in ÷ useful energy out (× 100 for percentage)',
      'Efficiency = useful energy out ÷ total energy in (× 100 for percentage)',
      'Efficiency = energy lost as heat ÷ total energy in (× 100 for percentage)',
      'Efficiency = useful energy out × total energy in (× 100 for percentage)',
    ],
    correctAnswer: 1,
    explanation:
      'η = (useful out ÷ total in) × 100%. The Greek letter eta (η) is sometimes used as the symbol for efficiency. It’s always less than 100% in the real world.',
  },
  {
    id: 2,
    question: 'Why can no real machine ever be 100% efficient?',
    options: [
      'Because energy is always destroyed as a machine runs',
      'Because a machine can never produce as much energy as it consumes by law',
      'Because some energy always converts into "less useful" forms like heat, sound and friction',
      'Because friction adds extra energy that has to be removed again',
    ],
    correctAnswer: 2,
    explanation:
      'Energy is conserved (it’s not created or destroyed) — but in real systems some always ends up as heat, sound or other low-grade forms that you can’t use for the intended job.',
  },
  {
    id: 3,
    question:
      'A 2 kW heater is used in a small bedroom and converts essentially all of its electrical input into heat. What is its efficiency?',
    options: ['~85%', '~25%', '~50%', '~100%'],
    correctAnswer: 3,
    explanation:
      'Heating elements are essentially 100% efficient — every joule of electrical input becomes heat (sound and light from the indicator are negligible). That’s why electric heating is hard to beat for raw efficiency.',
  },
  {
    id: 4,
    question: 'A motor draws 500 W and outputs 425 W of mechanical power. What is its efficiency?',
    options: ['85%', '15%', '925%', '50%'],
    correctAnswer: 0,
    explanation: 'η = (425 ÷ 500) × 100 = 85%. The other 75 W comes out as heat in the motor.',
  },
  {
    id: 5,
    question:
      'You lift a 50 kg load 4 m using a hoist that consumes 2500 J of electrical energy. What is the efficiency (g = 9.81)?',
    options: ['About 65%', 'About 78%', 'About 39%', 'About 51%'],
    correctAnswer: 1,
    explanation: 'Useful work = mgh = 50 × 9.81 × 4 = 1962 J. η = 1962 ÷ 2500 × 100 ≈ 78%.',
  },
  {
    id: 6,
    question: 'Roughly, what is the efficiency of a typical petrol car engine?',
    options: ['About 10%', 'About 60%', 'About 25%', 'About 95%'],
    correctAnswer: 2,
    explanation:
      'Petrol engines are around 20-30% efficient — most of the chemical energy in the fuel comes out as heat in the exhaust and the cooling system. Diesel does a bit better (~35%). Electric motors blow them away at 85-95%.',
  },
  {
    id: 7,
    question:
      'An old filament bulb is rated 60 W and converts about 5% of its input to light. What does the rest become?',
    options: ['Sound', 'It’s lost — energy isn’t conserved here', 'Magnetic field', 'Heat'],
    correctAnswer: 3,
    explanation:
      'About 95% becomes heat. That’s why old bulbs got so hot. LEDs, by contrast, push something like 30-40% of their input into useful light, the rest into a much smaller amount of heat.',
  },
  {
    id: 8,
    question:
      'A motor delivers 80% efficiency. To get 800 W of mechanical output, how much electrical input does it need?',
    options: ['1000 W', '880 W', '640 W', '800 W'],
    correctAnswer: 0,
    explanation:
      'Input = output ÷ efficiency = 800 ÷ 0.80 = 1000 W. That’s why oversizing motors slightly helps — you need headroom in the electrical supply for the losses.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────── */

const faqs2 = [
  {
    question: 'Why is an electric motor so much more efficient than a petrol engine?',
    answer:
      'Petrol engines burn fuel and try to capture the heat as expansion against a piston. Most of the heat just blows out the exhaust or radiates from the cooling system — only about 20-30% becomes useful work. Electric motors convert electromagnetic force directly into rotation; the only losses are friction, windage and copper heating. That’s why a typical induction motor sits at 85-95% efficiency.',
  },
  {
    question: 'Where does the "wasted" energy actually go?',
    answer:
      'Mostly heat (in motor windings, gearbox bearings, friction surfaces). Some becomes sound (a noisy motor is one converting electrical into acoustic energy you can’t use). A tiny bit goes into vibration. Conservation of energy still holds — total in = total out — it’s just the OUTPUT split that changes from "useful" to "wasted".',
  },
  {
    question: 'How does efficiency tie together everything else in this section?',
    answer:
      'It’s the bookkeeper for all the other formulas. Energy in = useful work out + losses. Power in = useful power out + power lost to heat. Force, work and energy on the input side; useful work, useful power and useful energy on the output side. Efficiency is the ratio. That’s the whole interplay between mechanics quantities.',
  },
  {
    question: 'Are LEDs really that much more efficient than old bulbs?',
    answer:
      'Yes. A 60 W incandescent puts out ~800 lumens (about 13 lm/W). A 9 W LED puts out the same 800 lumens (about 90 lm/W). Roughly 7× the lumens-per-watt. Less heat in your light fittings, less heat to remove with air-con, less load on the consumer unit. That’s why every domestic spec has switched.',
  },
  {
    question: 'What’s the symbol for efficiency in formulas?',
    answer:
      'The Greek letter eta — η. So you might see η = P_out ÷ P_in × 100%. Don’t panic at the symbol; it’s just shorthand for efficiency. You can write the word out in full.',
  },
  {
    question: 'Why does efficiency drop when a motor is overloaded?',
    answer:
      'Heavier loads slow the motor and push more current through the windings. More current means more I²R heating in the copper — losses rise sharply. The mechanical output goes up too, but the losses go up faster, so the efficiency dips. Run a motor close to its rated point and efficiency stays high.',
  },
];

export default function Lesson307E_3_3() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        A force is a push or a pull. Newton’s three laws describe how forces and motion are linked
        — the rules behind every lift, every drill kick-back and every motor on every tool you’ll
        ever use.
      </p>

      <TLDR
        points={[
          'Force = a push or a pull. Unit: newton (N). 1 N = the force needed to push 1 kg at 1 m/s².',
          'Newton’s three laws: things don’t change motion without a net force; F = m × a; every push has an equal-and-opposite push back.',
          'Balanced forces = no change in motion. Unbalanced forces = something accelerates.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Define force and give its SI unit (newton).',
          'State and explain Newton’s three laws of motion in plain English.',
          'Apply F = m × a to simple problems.',
          'Distinguish balanced from unbalanced forces.',
          'Recognise where the laws show up on site — drills, ladders, lifts and motors.',
          'Use vectors to think about forces with direction (resultant force).',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What a force actually is</ContentEyebrow>

      <ConceptBlock
        title="Force = push or pull"
        plainEnglish="Anything that can change how something is moving (or its shape) is a force."
        onSite="Pushing a drum across a floor, lifting a board, tightening a gland nut, an RCD slamming a contact open — all forces. Some you do, some happen to you."
      >
        <p>A force is any push or pull. It can:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>start something moving (push a stationary trolley)</li>
          <li>stop something moving (catch a falling spanner — please don’t)</li>
          <li>speed it up or slow it down</li>
          <li>change its direction</li>
          <li>change its shape (squash, stretch, bend, twist)</li>
        </ul>
        <p>
          Force is measured in <strong>newtons (N)</strong>, named after Sir Isaac Newton. 1 N is
          roughly the weight of a small apple sitting in your palm.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BIPM SI Brochure (9th edition, 2019) — derived units"
        clause="The newton (N) is the SI derived unit of force, defined as 1 N = 1 kg·m/s². It is the force which gives a mass of one kilogram an acceleration of one metre per second squared in the direction of the force."
        meaning={
          <>
            The definition itself is Newton’s second law (F = m × a). The newton isn’t one of the
            seven base SI units — it’s built out of kilograms, metres and seconds. Same for the
            joule (energy) and the watt (power), which you’ll meet in the next few lessons.
          </>
        }
        cite="Source: BIPM SI Brochure, 9th edition; National Physical Laboratory (NPL) UK"
      />

      <SectionRule />

      <ContentEyebrow>Newton’s first law</ContentEyebrow>

      <ConceptBlock
        title="Things keep doing what they’re doing — unless a force acts"
        plainEnglish="At rest stays at rest. Moving stays moving (in a straight line, at constant speed). Until a net force gets involved."
        onSite="Park your van on a slope without the handbrake — gravity is now a net force, and the van starts rolling. Same law, just costly."
      >
        <p>
          Newton’s first law (sometimes called the law of inertia) says: an object will stay at
          rest, or carry on moving at a constant velocity in a straight line, unless an unbalanced
          force acts on it.
        </p>
        <p>
          "Inertia" is just the tendency of stuff to keep doing what it’s doing. The bigger the
          mass, the more inertia, and the harder it is to start, stop or steer. A 25 kg cable drum
          needs a real shove to get rolling. Once it’s rolling on a smooth floor, it wants to keep
          rolling — and you need another shove to stop it.
        </p>
      </ConceptBlock>

      <ForceVectorDiagram
        eyebrow="Forces on a body — balanced or not?"
        caption="Add the arrows up taking direction into account. If they cancel, the object’s motion doesn’t change (Newton’s first law). If they don’t, F = m × a kicks in (Newton’s second law)."
      />

      <SectionRule />

      <ContentEyebrow>Newton’s second law</ContentEyebrow>

      <ConceptBlock
        title="The one formula you’ll actually use: F = m × a"
        plainEnglish="A force on a mass causes acceleration. Bigger force → bigger acceleration. Bigger mass → smaller acceleration for the same force."
        onSite="Why a small drill struggles in a hard-to-spin masonry bit and a big SDS rips through it: more force at the chuck → more angular acceleration → faster bite."
      >
        <p>The second law is the headline:</p>
        <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          F = m × a
        </p>
        <p>
          Where <strong>F</strong> is the net force in newtons, <strong>m</strong> is the mass in
          kilograms, and <strong>a</strong> is the acceleration in m/s². Rearrange it to find any
          of the three:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>a = F ÷ m</strong> — find acceleration from force and mass
          </li>
          <li>
            <strong>m = F ÷ a</strong> — find mass from force and acceleration
          </li>
        </ul>
        <p>
          Worked example. You push a 10 kg cable drum with 50 N of force across a smooth floor (no
          friction). a = F ÷ m = 50 ÷ 10 = 5 m/s². Add friction at 20 N pushing back, and the net
          force drops to 30 N → a = 3 m/s². Friction matters.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Newton — Philosophiæ Naturalis Principia Mathematica (1687), Law II"
        clause="The alteration of motion is ever proportional to the motive force impressed; and is made in the direction of the right line in which that force is impressed."
        meaning={
          <>
            In modern English: the rate of change of momentum is equal to the net force. For a
            fixed mass, that simplifies to <strong>F = m × a</strong>. Same law, three centuries
            of restating it. The exam wants the modern form.
          </>
        }
        cite="Reference: Newton’s Principia (1687), Definitions and Axioms or Laws of Motion"
      />

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Newton’s third law</ContentEyebrow>

      <ConceptBlock
        title="Every action has an equal and opposite reaction"
        plainEnglish="If A pushes on B, then B pushes back on A with the same force, in the opposite direction. Always."
        onSite="The reason your drill kicks back, the reason a hammer rebounds when you hit a nail, the reason a recoiling cable end can split lip. Every push you give, the world pushes back."
      >
        <p>
          Newton’s third law: when one object exerts a force on another, the second object exerts
          an equal and opposite force on the first. Forces always come in pairs.
        </p>
        <p>
          Stand on the floor. You push down on it with your weight (say, 750 N). The floor pushes
          back up on you with exactly 750 N. If it didn’t, you’d fall through it. That upward push
          from the floor is called the <strong>normal force</strong> and it’s always at right
          angles to the surface.
        </p>
        <p>
          Same with a wall plug holding a consumer unit. Gravity pulls the unit down at, say, 200
          N. The plug pulls back up at 200 N. Forces balanced → first law → unit stays still. Plug
          pulls out → reaction force vanishes → unit accelerates downward at g → floor.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Where Newton’s laws show up on site"
        plainEnglish="The three laws aren’t physics for the sake of it — every tool you use leans on at least one of them. Spot which law and you suddenly understand why the kit behaves the way it does."
        onSite="Once you’ve named the law behind a tool, you stop being surprised by it. ‘Surprise’ is what hurts on site."
      >
        <p>Six everyday electrical-trade moments, each tied to one of Newton’s laws:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Drill kick-back (3rd law).</strong> The motor twists the bit one way; the bit
            twists the drill body the other. Side handle exists because of this.
          </li>
          <li>
            <strong>Ladder slip when friction fails (1st &amp; 3rd law).</strong> While the foot
            stays put, friction at the floor is the reaction force balancing the horizontal push
            from the ladder. Lose the friction (wet tile, dust, polished floor) and the horizontal
            forces are no longer balanced — the base accelerates outward, the top accelerates
            downward.
          </li>
          <li>
            <strong>Pulling a stuck cable in conduit (1st law).</strong> You pull, friction in the
            bend pulls back, nothing moves — forces balanced, no acceleration. The moment friction
            loses, the cable pops out fast and your full pull goes into accelerating it (and you).
          </li>
          <li>
            <strong>The wedging force in a knockout punch (2nd law).</strong> Squeeze the
            hydraulic handle and the punch accelerates a small mass of steel through the enclosure
            wall. F = m × a — small mass, big acceleration, big force at the cutting edge. That’s
            how a hand tool punches 20 mm holes in a steel CU.
          </li>
          <li>
            <strong>The recoil from a Hilti DX shot tool (3rd law).</strong> The cartridge fires a
            fastener forward; the tool body kicks back into your shoulder/grip with equal and
            opposite force. Hold it firmly against the work surface or the recoil eats the
            accuracy of the shot.
          </li>
          <li>
            <strong>Cable-pulling tension and the ‘pop’ at the end of a run (2nd law).</strong>{' '}
            While the cable’s sliding, friction equals your pull and net force is roughly zero —
            steady speed, 1st law. Stop pulling and friction stops the cable almost instantly
            (small deceleration, small distance). When the cable suddenly frees up, friction drops
            and your unchanged pull becomes a net force that accelerates the whole drum — that’s
            the lurch you feel through the rope.
          </li>
        </ul>
        <p>
          You won’t quote a law to your supervisor, but knowing which one is in play is the
          difference between a tool surprising you and you knowing what it’s about to do next.
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

      <ContentEyebrow>Adding forces — vectors</ContentEyebrow>

      <ConceptBlock
        title="Force has size AND direction — that makes it a vector"
        plainEnglish="To add forces, you don’t just add the numbers. You take direction into account too. Two 100 N forces pushing the same way add to 200 N. The same two pushing opposite ways cancel to zero."
      >
        <p>
          A force isn’t just a number — it has a direction too. We call quantities like that{' '}
          <strong>vectors</strong>. Mass and time, by contrast, are just numbers (scalars).
        </p>
        <p>
          When several forces act on an object, you find the <strong>resultant</strong> (or net)
          force by adding them up vectorially:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Same direction:</strong> add the numbers (two people pushing a drum the same
            way at 80 N each → 160 N).
          </li>
          <li>
            <strong>Opposite directions:</strong> subtract (one person pushing 80 N forward,
            another pulling 50 N back → 30 N forward).
          </li>
          <li>
            <strong>At an angle:</strong> use a parallelogram or right-angle triangle method
            (you’ll see this properly later — for now, stick to the in-line cases).
          </li>
        </ul>
        <p>
          If the resultant works out as zero, the object is in <strong>equilibrium</strong> —
          first law applies, and it stays at rest or carries on at constant velocity.
        </p>
      </ConceptBlock>

      <CommonMistake
        title="Confusing mass with force in F = m × a"
        whatHappens={
          <>
            The exam gives you a 50 kg motor and asks for the force needed to accelerate it at 2
            m/s². You write F = 50 × 2 = 100 kg. Wrong unit. The answer is 100{' '}
            <strong>newtons</strong>, not kilograms. Simple slip, full mark gone.
          </>
        }
        doInstead={
          <>
            Always write the formula, plug numbers in with their units, and finish with the
            correct unit on your final answer. Force is in N, mass in kg, acceleration in m/s². If
            your answer comes out with a weird unit, you’ve made a mistake somewhere.
          </>
        }
      />

      <Scenario
        title="The 18V drill that twists out of your hand"
        situation={
          <>
            You’re drilling a hole through a stud for a cable run. The bit catches on a metal
            noggin you didn’t spot. The drill twists hard in your grip and almost rotates around
            the bit.
          </>
        }
        whatToDo={
          <>
            Always use the side handle on big drills. Plant your stance — feet shoulder-width,
            bracing your weight against the kick. Modern drills with anti-kickback sensors will
            cut motor power as soon as they detect the body rotating; don’t disable that feature
            just because it’s annoying.
          </>
        }
        whyItMatters={
          <>
            Newton’s third law. The motor is putting torque (a turning force) on the bit one way;
            the bit is putting equal-and-opposite torque on the drill body the other way. As long
            as the bit can spin freely, you only feel a small reaction. The moment it jams, the
            only thing left to rotate is the drill body — and your wrist is what stops it.
          </>
        }
      />

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Friction — the always-there force</ContentEyebrow>

      <ConceptBlock
        title="Friction opposes motion, every time"
        onSite="The reason you can stand on a floor without sliding. Also the reason a bit gets hot, drills go blunt and conduit gets warm in a tight bend."
      >
        <p>
          Wherever two surfaces are in contact, friction acts between them — and it always opposes
          relative motion. If you push a drum forward, friction acts backward. If the drum tries
          to slide left, friction pushes right. Always against you.
        </p>
        <p>
          On exam papers and in basic problems, you’ll often see the line "ignore friction" — that
          lets you use F = m × a cleanly. In real life you can’t ignore it. It’s why ladders need
          rough feet, why pulling cable through a tight bend needs lube, and why motor bearings
          get hot if they’re dry.
        </p>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Force = a push or a pull. Unit: newton (N). Forces have direction (vectors).',
          'First law: at rest stays at rest, moving stays moving — until a net force changes it (inertia).',
          'Second law: F = m × a. The one formula you’ll actually use on a calc question.',
          'Third law: every action has an equal and opposite reaction. Why drills kick back and walls don’t collapse.',
          'Add forces vectorially. Balanced forces = no change in motion. Unbalanced = acceleration.',
          'Friction is always there in real life and always opposes relative motion. Ignored only when an exam tells you to.',
        ]}
      />

      {/* ── Quiz ────────────────────────────────────────────── */}

      <Quiz title="Force and Newton’s laws knowledge check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Efficiency = useful out ÷ total in. The bookkeeper that ties together force, work, energy
        and power. No real machine ever hits 100% — and the gap is the heat your kit dumps into
        the room.
      </p>

      <TLDR
        points={[
          'Efficiency = useful energy (or power) out ÷ total energy (or power) in. Multiply by 100 for a percentage.',
          'Always less than 100% in the real world — the missing bit goes into heat, sound and friction.',
          'Petrol engines ≈ 25%. Electric motors ≈ 85-95%. LED ≈ 30-40%. Heating elements ≈ 100%.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Define efficiency and write it as a percentage.',
          'Calculate efficiency from energy or power values.',
          'Show how force, work, energy, power and efficiency tie together in a single problem.',
          'Compare typical efficiencies of common kit (motors, engines, lamps, heaters).',
          'Use the conservation of energy idea to account for "lost" energy as heat or sound.',
          'Solve multi-step problems mixing the formulas from earlier lessons.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What efficiency really is</ContentEyebrow>

      <ConceptBlock
        title="Useful out ÷ total in"
        plainEnglish="What fraction of the energy you put in actually does the job you wanted? That’s efficiency. Everything else got converted into something less useful."
        onSite="A 1000 W vacuum cleaner doesn’t put 1000 W into sucking air. Maybe 300 W becomes useful airflow — the rest is noise (a lot of it), heat in the motor and vibration. Efficiency ~30%."
      >
        <p>The formula:</p>
        <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          Efficiency (η) = Useful energy out ÷ Total energy in
        </p>
        <p>Or, equivalently, with power:</p>
        <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          Efficiency = Useful power out ÷ Total power in
        </p>
        <p>
          Multiply by 100 to get a percentage. Efficiency is always between 0 and 1 (or 0 and
          100%). If your answer comes out greater than 100%, you’ve put the numbers in upside
          down.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="IEC 60034-30-1:2014 — Rotating electrical machines, Part 30-1: Efficiency classes (IE codes)"
        clause="The standard defines four efficiency classes for line-operated AC motors: IE1 (Standard), IE2 (High), IE3 (Premium) and IE4 (Super Premium). For a 4-pole, 7.5 kW, 50 Hz motor, the minimum efficiency at full load is approximately 88.7% for IE2, 90.4% for IE3 and 91.7% for IE4."
        meaning={
          <>
            There’s a real-world reason to care about efficiency: legislation. Since 2017, EU/UK
            regulations require IE3 (or IE2 with a variable-speed drive) as the minimum for most
            industrial motors above 0.75 kW. Higher efficiency = less heat dumped in the plant
            room = lower running cost = less load on the supply. Electricians specifying
            replacements need to know which class their kit falls into.
          </>
        }
        cite="Source: IEC 60034-30-1:2014; UK SI 2010/2617 (as amended)"
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Try the calculator yourself</ContentEyebrow>

      <ConceptBlock
        title="Inline efficiency calculator"
        plainEnglish="Punch in the numbers and see the maths play out. Useful for sense-checking exam answers and sizing motor circuits in real life."
      >
        <p>
          Use the calculator below to either find efficiency from input and output power, or find
          the output power if you know the input and the efficiency. The same maths works for
          energy (J) or power (W) — just be consistent with units.
        </p>
      </ConceptBlock>

      <EfficiencyCalculator />

      <SectionRule />

      <ContentEyebrow>Where the energy actually goes</ContentEyebrow>

      <ConceptBlock
        title="Typical efficiencies you’ll meet"
        onSite="A 7 kW domestic EV charger is roughly 95% efficient end-to-end. The 5% loss (350 W) shows up as heat in the unit and the cabling — which is why EV chargers can warm up noticeably during a long charge."
      >
        <p>Rough figures for the kit you’ll work with:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Heating elements (kettle, immersion, heater):</strong> ~100%. Almost
            everything in becomes heat out. Hard to beat.
          </li>
          <li>
            <strong>Modern induction motor (IE3+):</strong> 85-95%. Big motors and big loads do
            better than small motors and light loads.
          </li>
          <li>
            <strong>Transformer:</strong> 95-99%. Excellent — almost all of the input becomes
            output, losses only in the windings and core.
          </li>
          <li>
            <strong>EV charger / power supply:</strong> 90-95%. Very good for modern switch-mode
            kit.
          </li>
          <li>
            <strong>LED lamp:</strong> ~30-40%. Best lamp technology yet, but most of the
            electricity still becomes heat — just much less than incandescent (~5%) or halogen
            (~10%).
          </li>
          <li>
            <strong>Petrol car engine:</strong> ~20-30%. Diesel ~30-35%. Most of the fuel’s energy
            goes out the exhaust as hot gas.
          </li>
          <li>
            <strong>Solar PV panel:</strong> ~18-22%. Limited by physics — more than half of
            sunlight is the wrong wavelength to be absorbed.
          </li>
        </ul>
        <p>
          Knowing these figures lets you sense-check exam answers and lift-plan calcs. If your
          efficiency for a motor comes out as 30% you’ve probably divided the wrong way round.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Tying it all together — multi-step worked examples</ContentEyebrow>

      <ConceptBlock
        title="Example 1 — Lifting a load with a hoist"
        plainEnglish="The kind of problem you’ll see in the exam: a load, a height, a motor power and a time. Solve in steps, label every unit."
      >
        <p>
          <strong>The question.</strong> A hoist lifts a 150 kg piece of switchgear up 6 m onto a
          mezzanine in 30 seconds. The motor draws 600 W of electrical input. Find: (a) the work
          done against gravity, (b) the useful mechanical power output, and (c) the hoist’s
          efficiency. Use g = 9.81 m/s².
        </p>
        <p>
          <strong>(a) Work done against gravity.</strong>
        </p>
        <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          W = m × g × h = 150 × 9.81 × 6 = 8829 J
        </p>
        <p>
          <strong>(b) Useful mechanical power output.</strong>
        </p>
        <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          P = W ÷ t = 8829 ÷ 30 ≈ 294 W
        </p>
        <p>
          <strong>(c) Efficiency.</strong>
        </p>
        <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          η = (Useful out ÷ Total in) × 100% = (294 ÷ 600) × 100% ≈ 49%
        </p>
        <p>
          That’s low — typical of a small hoist with friction in chain links and gearboxes. A
          bigger industrial hoist with planetary gearing and roller chain would push 70-80%. The
          306 W of "lost" power becomes heat in the motor and the chain mechanism.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Example 2 — Sizing a motor from a job"
        plainEnglish="Sometimes you’re given the job and asked what motor to specify. Run the same maths backwards."
      >
        <p>
          <strong>The question.</strong> A pump must lift 1200 litres of water (1200 kg) from a
          basement, 5 m vertical, in 60 seconds. The pump is 70% efficient. What minimum
          electrical input power must the supply provide? Use g = 9.81 m/s².
        </p>
        <p>
          <strong>Useful work needed.</strong>
        </p>
        <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          W = m × g × h = 1200 × 9.81 × 5 = 58,860 J
        </p>
        <p>
          <strong>Useful power needed.</strong>
        </p>
        <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          P_useful = W ÷ t = 58,860 ÷ 60 ≈ 981 W
        </p>
        <p>
          <strong>Electrical input needed (account for efficiency).</strong>
        </p>
        <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
          P_in = P_useful ÷ efficiency = 981 ÷ 0.70 ≈ 1402 W ≈ 1.4 kW
        </p>
        <p>
          So a 1.5 kW motor would just about cover it (the headroom helps with starting and
          friction at start-up). At 230 V single-phase, that’s a current of roughly 1500 ÷ 230 ≈
          6.5 A — plenty for a 16 A radial circuit. Spec sheet sorted.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The big inter-relationships</ContentEyebrow>

      <ConceptBlock
        title="One picture of how it all hangs together"
        plainEnglish="Force does work over a distance. Work transfers energy. Energy delivered per second is power. The fraction that ends up useful is efficiency."
      >
        <p>The chain through this section:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Force (N)</strong> — a push or a pull. F = m × a, or W = m × g for weight.
          </li>
          <li>
            <strong>Work (J)</strong> — Force × distance moved in the direction of the force. W =
            F × d.
          </li>
          <li>
            <strong>Energy (J)</strong> — same units as work; the capacity to do work. Forms
            include KE = ½mv² and PE = mgh.
          </li>
          <li>
            <strong>Power (W)</strong> — work or energy per unit time. P = W ÷ t. 1 W = 1 J/s.
          </li>
          <li>
            <strong>Efficiency (%)</strong> — useful power out ÷ total power in. The fraction that
            does the job you wanted.
          </li>
        </ul>
        <p>
          Most mechanics problems at this level are just two or three of these stitched together. Spot
          which one the question gives you, work out which one it’s asking for, and chain the
          formulas. Show the working. Carry units through.
        </p>
      </ConceptBlock>

      <CommonMistake
        title="Getting the efficiency ratio upside down"
        whatHappens={
          <>
            The exam gives you 1000 W in and 850 W out. You write η = 1000 ÷ 850 = 117% and tick
            it confidently. The examiner knows real efficiency can never be over 100%, so it’s an
            obvious clue you’ve flipped the ratio.
          </>
        }
        doInstead={
          <>
            Always: <strong>useful out on top, total in on the bottom.</strong> The result must
            end up between 0 and 100%. If it’s over 100%, swap the numerator and denominator and
            try again.
          </>
        }
      />

      <Scenario
        title="The pump that keeps tripping the breaker"
        situation={
          <>
            A small workshop has a basement sump pump that has started tripping its 6 A MCB
            whenever it kicks in. The pump is rated 1.1 kW at 230 V (around 4.8 A in steady
            state). It used to run fine on this circuit.
          </>
        }
        whatToDo={
          <>
            Two checks2. (1) Inrush current — induction motors draw 5-7× their running current at
            start-up, briefly. A 6 A MCB on a Type B characteristic might be tripping on start.
            Swap to a Type C of the same rating, or a 10 A B if circuit conductors allow. (2)
            Efficiency loss — if the pump bearings or impeller are knackered, efficiency drops,
            current rises and the motor runs hotter. Ammeter on the supply while it runs steady
            tells you straight away.
          </>
        }
        whyItMatters={
          <>
            Efficiency isn’t just an exam concept. A motor losing efficiency draws more current
            for the same useful work, runs hotter, dumps more heat into the plant room, and
            eventually fails. Spotting it early — by knowing roughly what current the pump should
            draw at full load — saves a callout in winter when the basement floods.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Efficiency = useful out ÷ total in (×100 for %). Always < 100% in real machines.',
          'The lost energy becomes heat, sound, vibration — same total, just no longer useful.',
          'Typical efficiencies: heating element ~100%, transformer ~98%, motor 85-95%, LED ~35%, petrol engine ~25%.',
          'Multi-step problems chain together F = ma, W = Fd, KE = ½mv², PE = mgh, P = W ÷ t and efficiency. Show the working, carry the units.',
          'Force does work, work transfers energy, energy per second is power, useful power ÷ total power is efficiency. Five quantities, one chain.',
          'Knowing real-world efficiency figures lets you sense-check exam answers and pick sensibly-sized motors and tools on site.',
        ]}
      />

      {/* ── Quiz ────────────────────────────────────────────── */}

      <Quiz
        title="Efficiency and inter-relationships knowledge check"
        questions={quizQuestions2}
      />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
