/**
 * Ported from the English course, combining:
 *   level2/module2/section5/Sub3.tsx
 *   level2/module2/section5/Sub4.tsx
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
  VideoCard,
} from '@/components/study-centre/learning';
import {
  MagneticField,
  RightHandGripRule,
  SolenoidField,
  FlemingsLeftHandRule,
  FlemingsRightHandRule,
  MotorEffect,
  LenzLaw,
  TransformerSchematic,
} from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';

const checks = [
  {
    id: 'right-hand-grip',
    question:
      'You wrap your right hand round a vertical conductor with your thumb pointing UP (the current direction). Your fingers curl:',
    options: [
      'Anticlockwise looking down',
      'Anticlockwise looking up',
      'Straight up',
      'Clockwise looking down',
    ],
    correctIndex: 0,
    explanation:
      'Right-hand grip rule: thumb points along the current, fingers curl in the direction of the magnetic field. Current up = field anticlockwise looking from above (or clockwise looking from below).',
  },
  {
    id: 'solenoid-poles',
    question:
      'A current flows anticlockwise through a coil when viewed from the right-hand end. Which end is the north pole?',
    options: [
      'The left-hand end',
      'The right-hand end',
      'Both ends are north',
      'Solenoids don’t have poles',
    ],
    correctIndex: 0,
    explanation:
      'Right-hand grip rule for a coil: curl your fingers in the direction of conventional current — your thumb points to the north pole. Current anticlockwise viewed from the right means thumb points LEFT, so the left end is N.',
  },
  {
    id: 'force-on-conductor',
    question:
      'A 2 m long conductor carrying 10 A sits in a 0.4 T field perpendicular to it. What force acts on it?',
    options: ['0.8 N', '20 N', '8 N', '5 N'],
    correctIndex: 2,
    explanation:
      'F = B × I × L = 0.4 × 10 × 2 = 8 N. Same shape of formula as Ohm’s law — just learn it and plug in. This force is what spins every motor and pulls every contactor in.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Who first discovered that an electric current produces a magnetic field?',
    options: ['Michael Faraday', 'Hans Christian Ørsted', 'Nikola Tesla', 'André-Marie Ampère'],
    correctAnswer: 1,
    explanation:
      'Hans Christian Ørsted, 1820. He noticed a compass needle deflect when he switched on a circuit nearby. Faraday, Tesla and Ampère all built on it — but Ørsted was first.',
  },
  {
    id: 2,
    question: 'A current flows out of the page (towards you). The magnetic field around it goes:',
    options: ['Radially outward', 'Clockwise', 'Anticlockwise', 'Radially inward'],
    correctAnswer: 2,
    explanation:
      'Right-hand grip rule: thumb out of the page (towards you), fingers curl anticlockwise. Reverse the current and the field reverses too.',
  },
  {
    id: 3,
    question:
      'Which rule do you use to find the direction of the magnetic field around a current-carrying conductor?',
    options: [
      'Fleming’s right-hand rule',
      'Fleming’s left-hand rule',
      'Lenz’s law',
      'Right-hand grip rule',
    ],
    correctAnswer: 3,
    explanation:
      'The right-hand grip rule. Thumb along the current, fingers curl in the direction of B. Fleming’s rules come into play later for force and induced EMF — different problem, different rule.',
  },
  {
    id: 4,
    question: 'A solenoid is best described as:',
    options: [
      'A coil of wire that produces a magnetic field when current flows',
      'A single straight conductor carrying a heavy current',
      'A permanent magnet used to detect current in a cable',
      'A resistor designed to limit the current in a coil',
    ],
    correctAnswer: 0,
    explanation:
      'A solenoid is a coil — a series of loops of wire wound in a tube. When current flows it produces a field along its axis, just like a bar magnet, with a north and south end.',
  },
  {
    id: 5,
    question: 'What happens to the strength of a solenoid’s field if you double the current?',
    options: ['Stays the same', 'Doubles', 'Quadruples', 'Halves'],
    correctAnswer: 1,
    explanation:
      'Field strength inside a solenoid is proportional to current × turns per metre. Double the current → double the field. Same applies if you double the number of turns instead.',
  },
  {
    id: 6,
    question:
      'A 0.5 m conductor carrying 5 A sits at right angles in a 0.2 T field. The force on it is:',
    options: ['5 N', '2 N', '0.5 N', '0.05 N'],
    correctAnswer: 2,
    explanation:
      'F = B × I × L = 0.2 × 5 × 0.5 = 0.5 N. The "perpendicular" bit matters — if the conductor lies along the field instead of across it, F is zero.',
  },
  {
    id: 7,
    question: 'Why does a contactor coil pull its armature in when you energise it?',
    options: [
      'The current heats the armature until it expands into contact',
      'The voltage across the coil pushes the armature mechanically',
      'A permanent magnet inside the coil grips the armature directly',
      'The current creates a magnetic field that attracts the iron armature',
    ],
    correctAnswer: 3,
    explanation:
      'Energising the coil makes it act like an electromagnet. The induced field pulls the soft-iron armature in against the spring. Cut the current and the spring throws it back.',
  },
  {
    id: 8,
    question: 'Why is the iron core inside an electromagnet so important?',
    options: [
      'It concentrates the flux thousands of times more than air would',
      'It carries the current so the coil does not have to',
      'It insulates the coil from the moving armature',
      'It stores charge to keep the coil energised after switch-off',
    ],
    correctAnswer: 0,
    explanation:
      'Soft iron has high permeability — it carries far more flux than air for the same current. Without the core, the same coil would barely lift a paper clip. With it, you’ve got a contactor that can switch a 100 A motor.',
  },
];

const faqs = [
  {
    question: 'Did Ørsted discover this on purpose?',
    answer:
      'Almost the opposite — he was demonstrating something else to a class in 1820 when he noticed a compass needle near his circuit twitch as he switched it on. He spent the next three months running careful experiments to confirm what he’d seen, then published. Within ten years, electromagnetism had become its own field of study and the first relays and motors were being built.',
  },
  {
    question: 'What’s the difference between a solenoid and an electromagnet?',
    answer:
      'A solenoid is just the coil — wire wound into loops. An electromagnet is a solenoid with a soft-iron core inside it to concentrate the flux. In trade language people often use the words loosely: "the solenoid valve" is really an electromagnet pulling a plunger in. The exam wants you to know the strict definition: solenoid = coil, electromagnet = coil + core.',
  },
  {
    question: 'How do I remember which rule is for what?',
    answer:
      'Three things to keep separate: right-hand GRIP rule for the field around a current (no force involved). Fleming’s LEFT for motors (force on a current in a field). Fleming’s RIGHT for generators (induced current from motion in a field). The mnemonic "Right-hand for Generators, Left for Motors" — RGLM, "right generator, left motor" — gets a lot of apprentices through their exam.',
  },
  {
    question: 'Why does a wire kick when you switch a heavy load?',
    answer:
      'Two effects. First, there’s a real force on the wire because current in a wire creates a magnetic field, and any nearby field (from another wire or a magnet) pushes back. Second — and bigger — when you break a high current the collapsing field induces a big back-EMF (covered later in this lesson). On a contactor that’s why you sometimes hear a snap and see a flash on disconnection.',
  },
  {
    question: 'Why are big electromagnets always wound with thick copper, not thin?',
    answer:
      'Because the field strength depends on current × turns. To get a strong field you want big current. Big current + thin wire = big I²R losses and a coil that melts. Thick copper carries the current with less voltage drop, less heat, and lets the magnetic energy go into the field instead of being wasted as heat. Same reason DNO transformers use chunky bus bars.',
  },
  {
    question: 'Is the field around an AC conductor the same as around DC?',
    answer:
      'Same shape, but it reverses direction every half-cycle. At 50 Hz that means the field round a UK mains conductor flips direction 100 times a second. That’s why two parallel current-carrying conductors — like phase and neutral cables in the same enclosure — exert a pulsing force on each other. Heavy bus bars on switchgear are physically braced to stop that force shaking them apart on a fault.',
  },
];

const DESCRIPTION2 =
  "Faraday's law, Lenz's law, and the two Fleming rules. Move a conductor through a field — get an EMF. Pass a current through a conductor in a field — get a force. The reciprocal trick that runs every motor and generator.";

const checks2 = [
  {
    id: 'faraday-induction',
    question: 'When does an EMF get induced in a coil sitting in a magnetic field?',
    options: [
      'When the field is strong',
      'Only when the field is constant',
      'Only when the coil is connected to a battery',
      'When the flux through the coil is changing',
    ],
    correctIndex: 3,
    explanation:
      'Faraday’s law: EMF is induced only when the FLUX is CHANGING. A static field with a stationary coil produces nothing. Move the coil, move the magnet, or change the current that produced the field — then you get EMF.',
  },
  {
    id: 'lenz-direction',
    question:
      'You push the N pole of a magnet INTO a coil. The induced current in the coil produces:',
    options: [
      'A field perpendicular to the magnet’s motion',
      'A south pole at the entry end (pulls the magnet in faster)',
      'A north pole at the entry end (opposes the magnet)',
      'A south pole only after the magnet stops moving',
    ],
    correctIndex: 2,
    explanation:
      'Lenz’s law: the induced current always OPPOSES the change that caused it. Pushing N in means the coil generates an induced N to push back. That opposition is what you feel as resistance — and it’s what conserves energy in every generator.',
  },
  {
    id: 'fleming-rules',
    question: 'Which rule do you use to find the direction of induced current in a generator?',
    options: [
      'Right-hand grip rule',
      'Fleming’s right-hand rule',
      'Fleming’s left-hand rule',
      'Lenz’s law alone',
    ],
    correctIndex: 1,
    explanation:
      'Right hand for Generators (induced current). Left hand for Motors (force on a current). The mnemonic is "RGLM" — Right Generator, Left Motor.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: "What does Faraday's law of electromagnetic induction state?",
    options: [
      'Induced EMF is proportional to the strength of the magnetic field',
      'Induced EMF is proportional to the rate of change of magnetic flux',
      'Induced EMF is proportional to the resistance of the coil',
      'Induced EMF is proportional to the total flux through the coil',
    ],
    correctAnswer: 1,
    explanation:
      'Faraday: EMF ∝ rate of change of flux (dΦ/dt). Faster change = bigger EMF. No change = no EMF, even if the field is huge.',
  },
  {
    id: 2,
    question: 'Lenz’s law tells you the:',
    options: [
      'Strength of a magnet',
      'Magnitude of induced EMF',
      'Direction of induced current',
      'Speed of a motor',
    ],
    correctAnswer: 2,
    explanation:
      'Lenz gives you DIRECTION. Faraday gives you magnitude. Together they fully describe induction.',
  },
  {
    id: 3,
    question:
      'A 100-turn coil has the flux through it change by 0.02 Wb in 0.5 seconds. The induced EMF is:',
    options: ['2 V', '1 V', '10 V', '4 V'],
    correctAnswer: 3,
    explanation:
      'EMF = N × (dΦ/dt) = 100 × (0.02 / 0.5) = 100 × 0.04 = 4 V. Faraday’s law in numbers.',
  },
  {
    id: 4,
    question: 'Fleming’s LEFT-hand rule applies to:',
    options: ['Motors', 'Generators', 'Transformers only', 'AC supplies only'],
    correctAnswer: 0,
    explanation:
      'LEFT for Motors — force on a current-carrying conductor in a field. The mnemonic: Right Generator, Left Motor.',
  },
  {
    id: 5,
    question: "On Fleming's left-hand rule, the second finger represents:",
    options: ['Force', 'Current', 'Motion', 'Field'],
    correctAnswer: 1,
    explanation:
      'thuMb = Motion (force), First finger = Field, seCond finger = Current. That’s how you remember it: M-F-C from thumb outward.',
  },
  {
    id: 6,
    question: 'Why does an induction motor turn at all?',
    options: [
      'A battery feeds direct current into the rotor windings through brushes and slip rings',
      'The rotor is a permanent magnet that locks onto and follows the rotating stator field',
      'The rotating stator field induces a rotor current, which then experiences a force F = BIL',
      'The supply frequency is rectified to DC and drives the rotor round mechanically',
    ],
    correctAnswer: 2,
    explanation:
      'The rotor has no electrical connection. The stator’s rotating field induces current in the rotor bars (Faraday + Lenz), and that induced current sits in a field — so it feels F = BIL. Pure induction. The clue is in the name.',
  },
  {
    id: 7,
    question:
      'What happens to an EMF if you double the speed at which a magnet moves through a coil?',
    options: ['Halves', 'No change', 'Quadruples', 'Doubles'],
    correctAnswer: 3,
    explanation:
      'EMF is proportional to rate of change of flux. Move the magnet twice as fast and dΦ/dt doubles — so the induced EMF doubles. Slow down or stop = EMF drops to zero instantly.',
  },
  {
    id: 8,
    question:
      'You disconnect a contactor coil under load and see a flash at the contacts. What’s causing it?',
    options: [
      'A back-EMF induced by the rapidly collapsing field in the coil',
      'The supply voltage momentarily doubling as the contacts open',
      'Capacitance in the cable discharging across the open contacts',
      'A short circuit between the coil terminals as they separate',
    ],
    correctAnswer: 0,
    explanation:
      'Lenz’s law in action. When the current breaks, the flux collapses fast — Faraday’s law gives a big induced EMF that opposes the change (which means it tries to keep the current flowing). That voltage spike jumps the contact gap as an arc. Snubber circuits exist exactly to absorb it.',
  },
];

const faqs2 = [
  {
    question: 'Did Faraday and Lenz contradict each other?',
    answer:
      'No — they cover different bits of the same phenomenon. Faraday (1831) gives you the magnitude of the induced EMF: it’s proportional to how fast the flux is changing. Lenz (1834) gives you the direction: the induced current always flows in the direction that opposes the change in flux. Together they describe induction completely. Faraday’s the "how big", Lenz is the "which way".',
  },
  {
    question:
      'Why does Lenz’s law have to oppose the change — couldn’t it just go either way at random?',
    answer:
      'Conservation of energy. If the induced current pushed the magnet IN faster instead of opposing it, you’d get free energy — the magnet would accelerate forever, generating more current the faster it went, with no input. That breaks the laws of physics. Opposition forces you to do real work to move the magnet against the resistance, and that work is exactly what comes out the other end as electrical energy. Push harder = generate more.',
  },
  {
    question: 'How do I keep Fleming’s left and right hands the right way round?',
    answer:
      'Quick recap of the two mnemonics — both are unpacked properly in the "RGLM" ConceptBlock above. RGLM = Right Generator, Left Motor (which hand). M-F-C = thuMb (Motion), First finger (Field), seCond finger (Current) — same labels on either hand. Drill them together until they’re automatic. There’s no rule against writing "RGLM" on the back of your hand on exam day.',
  },
  {
    question: 'Is back-EMF a real thing or is it just textbook talk?',
    answer:
      'Very real. Every motor running under load is generating its own EMF that opposes the supply voltage — the induced EMF from its own rotor turning in its own field. That back-EMF is what limits the running current to a safe value. When you first energise a motor before it’s spinning there’s NO back-EMF, so the current is huge — that’s your inrush. As the motor speeds up, back-EMF rises and current falls to its normal level. Stall the motor and back-EMF drops to zero — current shoots up — and either the overload trips or the windings cook.',
  },
  {
    question: 'How does a transformer fit into all this — there’s no movement involved?',
    answer:
      'Transformers prove the "movement" bit isn’t the key thing — what matters is the flux CHANGING. In a transformer the primary winding carries an AC current, which produces an AC (constantly changing) flux in the iron core. That changing flux passes through the secondary winding and induces an EMF there. No movement, no rotation, just flux that’s alternating direction 50 times a second. Pure Faraday. Same equation, same direction by Lenz.',
  },
  {
    question: 'Why does an MCB need a "snubber" or freewheel diode across coils on contactors?',
    answer:
      'Promoted to its own ConceptBlock — see "Back-EMF in practice — why coils need snubbers" above, just before the FAQ. The short answer: collapsing flux when a coil de-energises induces a high-voltage spike that flashes contacts and blows logic. A snubber absorbs it.',
  },
];

export default function Lesson307E_5_3() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Move a charge and you get a magnetic field. That single fact, discovered by Ørsted in
        1820, is the working principle behind every motor, contactor, RCD, transformer and
        solenoid valve on a UK building site.
      </p>

      <TLDR
        points={[
          'Every electric current creates a magnetic field around it. Switch the current off and the field disappears.',
          'Right-hand grip rule: thumb along the current, curled fingers show the direction of the field. Coil it up and you get a solenoid with N and S poles like a bar magnet.',
          'A current-carrying conductor sitting in a magnetic field feels a force F = B × I × L. That’s the force that turns every motor on the planet.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the magnetic field around a straight current-carrying conductor.',
          'Apply the right-hand grip rule to find field direction from current direction.',
          'Describe the field of a solenoid and use the grip rule to find its N pole.',
          'Explain how a soft-iron core turns a solenoid into an electromagnet.',
          'Calculate the force on a current-carrying conductor using F = BIL.',
          'Recognise the magnetic effect of current at work inside relays, contactors and solenoid valves.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The discovery that started it all</ContentEyebrow>

      <ConceptBlock
        title="Ørsted, 1820 — the moment electricity met magnetism"
        plainEnglish="A current in a wire creates a magnetic field around the wire. No magnet needed — just moving charge."
        onSite="That single fact is why every motor, every contactor, every transformer and every RCD coil works. Without it, a battery would be a battery and a magnet would be a magnet, and the two would have nothing to do with each other."
      >
        <p>
          Until 1820, electricity and magnetism were thought to be two completely separate
          phenomena. Hans Christian Ørsted, a Danish physicist, was demonstrating something else
          to a class when he noticed a compass needle twitching every time he switched on a nearby
          circuit. The needle deflected at right angles to the wire — and reversed direction when
          he reversed the current.
        </p>
        <p>
          That accidental observation was the start of electromagnetism as a subject. Within a
          decade, Ampère, Faraday and others had worked out the rules. Within fifty years, the
          first electric motors and generators were being built. Every part of your trade — every
          spinning thing, every switching thing, every transforming thing — runs on what Ørsted
          accidentally spotted.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The field around a straight wire</ContentEyebrow>

      <ConceptBlock
        title="A straight current-carrying conductor produces a circular field around it"
        plainEnglish="The field forms concentric rings round the wire. Closer to the wire = stronger field. Reverse the current and the rings reverse direction."
      >
        <p>
          A long straight wire carrying a current is surrounded by a magnetic field whose lines
          form <strong>concentric circles</strong> around the wire — like ripples on a pond, but
          in 3D. The field exists in the air (or whatever else is around the wire) and gets weaker
          the further you go.
        </p>
        <p>
          Field strength at a distance r from a long straight wire is proportional to
          <strong> I / r</strong>. Double the current and you double the field. Double the
          distance from the wire and you halve it. Move a long way away and the field effectively
          vanishes.
        </p>
      </ConceptBlock>

      <MagneticField direction="up" />

      <RegsCallout
        source="IEC 60050 — International Electrotechnical Vocabulary, 121-11-50"
        clause="The magnetic field strength produced by an electric current is defined by the line integral of the magnetic field strength along a closed path enclosing the current."
        meaning={
          <>
            Plain English version: every electric current is automatically wrapped in a magnetic
            field. The bigger the current, the stronger the field. This is the formal IEC
            statement of what Ørsted found by accident — and what the right-hand grip rule shows
            you visually.
          </>
        }
        cite="Source: IEC Electropedia (electropedia.org) — entry 121-11-50."
      />

      <SectionRule />

      <ContentEyebrow>The right-hand grip rule</ContentEyebrow>

      <ConceptBlock
        title="Thumb in the direction of current — fingers curl with the field"
        plainEnglish="Make a thumbs-up with your right hand. Thumb = direction the current is flowing. The way your fingers curl = the way the magnetic field lines go around the wire."
        onSite="This is the rule you’ll use most often. It works for a single wire, and it works for a coil — same hand, same idea, just applied differently."
      >
        <p>
          The <strong>right-hand grip rule</strong> is the trick for working out the direction of
          the magnetic field around any current-carrying conductor. You don’t need a compass and
          you don’t need iron filings.
        </p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            Hold your <strong>right hand</strong> out, thumb extended like a thumbs-up.
          </li>
          <li>
            Point the <strong>thumb in the direction the conventional current is flowing</strong>{' '}
            (positive to negative, outside the source).
          </li>
          <li>
            Your fingers naturally curl around — and that curl shows the{' '}
            <strong>direction of the magnetic field</strong> around the wire.
          </li>
        </ol>
        <p>
          Reverse the current and you flip the hand round — the field reverses too. It’s why the
          field around an AC conductor reverses direction every half-cycle (50 times a second on
          UK 50 Hz mains).
        </p>
        <p>
          <strong>Common notation on diagrams:</strong> a dot ⊙ in the wire’s end-on view means
          current is coming OUT of the page towards you. A cross ⊗ means current is going INTO the
          page away from you. (Think of a feathered arrow — point of arrowhead coming at you =
          dot, tail-feathers going away = cross.)
        </p>
      </ConceptBlock>

      <RightHandGripRule />

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>From a single wire to a solenoid</ContentEyebrow>

      <ConceptBlock
        title="Coil the wire and you get a bar-magnet-shaped field"
        plainEnglish="One loop of wire makes a small ring of field through the middle. Stack lots of loops together — a solenoid — and the fields add up to give you something that looks exactly like a bar magnet."
        onSite="Solenoid valves, contactor coils, electric door strikes, the lock mechanism in your van’s central locking — all the same principle. Coil + core + current = controlled magnetic pull."
      >
        <p>
          A <strong>solenoid</strong> is a wire wound into a long coil — many turns side by side,
          like the spring inside a biro pen. When you pass a current through it, every turn
          produces its own ring of magnetic field. Inside the coil all those fields point the same
          way and add together to form one strong, uniform field along the coil’s axis. Outside
          the coil, the field loops back round to the other end — exactly the same shape as the
          field around a bar magnet.
        </p>
        <p>
          One end of the solenoid acts as a <strong>north pole</strong>, the other as a{' '}
          <strong>south</strong>. Reverse the current and you swap them over.
        </p>
        <p>Field strength inside the coil depends on three things:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>The current I</strong> — double the current, double the field.
          </li>
          <li>
            <strong>The number of turns per metre (n)</strong> — pack the loops in tighter and you
            get more field.
          </li>
          <li>
            <strong>The core material</strong> — a soft-iron core can multiply the field by a
            factor of thousands.
          </li>
        </ul>
        <p>
          The full equation for an air-cored solenoid is <strong>B = µ₀ × n × I</strong>, where µ₀
          is the permeability of free space (4π × 10⁻⁷ Tm/A). At this level you don’t need to crunch
          that — just remember that B scales with current and turns per metre.
        </p>
      </ConceptBlock>

      <SolenoidField />

      <ConceptBlock
        title="Right-hand grip rule for a coil — find the N pole in two seconds"
        plainEnglish="Curl your right-hand fingers in the direction the current loops round the coil. Your thumb points to the north end."
      >
        <p>
          The same right-hand grip rule works for a coil — you just apply it to the loops instead
          of the straight bit. Curl your right-hand fingers in the direction the
          <strong> conventional current</strong> is flowing round the loops, and your thumb points
          to the <strong>north pole</strong> of the solenoid.
        </p>
        <p>
          Reverse the current and the poles swap — the north end becomes south and vice versa.
          That’s why a DC solenoid valve only works one way round, and why an AC coil vibrates at
          twice mains frequency (the field reverses 100 times a second on UK 50 Hz, attracting the
          armature on every half-cycle).
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

      <ContentEyebrow>Add a core, get an electromagnet</ContentEyebrow>

      <ConceptBlock
        title="Soft iron inside a solenoid concentrates the flux thousands of times"
        plainEnglish="Air is a poor conductor of magnetism. Iron is hugely better. Slide a soft-iron rod into your coil and the field inside jumps by a factor of hundreds or thousands — without changing the current at all."
        onSite="That’s how every contactor and relay works. The coil is the solenoid, the soft-iron armature is the moving part, and the core/yoke around the coil is the path the flux follows."
      >
        <p>
          An <strong>electromagnet</strong> is just a solenoid with a soft-iron core inside. The
          high permeability of the iron concentrates the flux dramatically — typically by 1,000 to
          5,000 times for a soft-iron core, even more for advanced materials.
        </p>
        <p>
          The genius of an electromagnet over a permanent magnet is that{' '}
          <strong>you can switch it on and off</strong>. Cut the current and the field collapses
          to nothing in milliseconds. That’s exactly what you need for a contactor that has to
          engage and release thousands of times a day, an MCB that has to trip within milliseconds
          on a short circuit, or a solenoid valve that has to open and close on demand.
        </p>
        <p>
          The opposite trade-off applies if you make the core out of <strong>hard</strong>{' '}
          magnetic material — once you’ve magnetised it, it stays magnetised. That’s how permanent
          magnets are made in the first place: a strong solenoid pulse aligns the domains in a
          hard alloy, and the alignment stays put for years.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The force on a current-carrying conductor</ContentEyebrow>

      <ConceptBlock
        title="A current in a magnetic field feels a force — F = B × I × L"
        plainEnglish="If you stick a current-carrying wire into a magnetic field, the wire physically gets pushed. Bigger field, bigger current or longer wire = bigger push."
        onSite="This is the force that spins every motor on a building site. It’s also the force that brace bars on bus chambers are designed to resist on a fault — at 30 kA fault current, the kick on the bars is enough to bend them if they’re not braced."
      >
        <p>
          Once you accept that current makes its own field, the next question is: what happens
          when that current sits inside someone else’s field? The answer is: the wire feels a{' '}
          <strong>force</strong>.
        </p>
        <p>For a straight conductor at right angles to a uniform field, the force is:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>F = B × I × L</strong>
          </li>
          <li>F in newtons (N)</li>
          <li>B in tesla (T) — the flux density of the external field</li>
          <li>I in amperes (A) — the current through the wire</li>
          <li>L in metres (m) — the length of wire that lies in the field</li>
        </ul>
        <p>
          Direction of the force is given by Fleming’s LEFT-hand rule (covered later in this
          lesson). For now just remember the magnitude: <strong>F = BIL</strong>.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Worked example — the force on a motor conductor">
        <p>
          A 2 m length of conductor carries a current of 10 A and sits at right angles inside a
          magnetic field of 0.4 T (the kind of field strength you’d find in the air gap of a small
          DC motor).
        </p>
        <p>What force acts on the wire?</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>F = B × I × L</strong>
          </li>
          <li>
            <strong>F = 0.4 × 10 × 2 = 8 N</strong>
          </li>
        </ul>
        <p>
          Eight newtons is roughly the weight of a 1-litre bottle of water. Multiply that by
          hundreds of conductors round the rotor of a real motor and you’re into the kind of
          torque that turns washing-machine drums and lathe chucks. Same equation, scaled up.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Optional deeper dive</ContentEyebrow>

      <VideoCard
        {...videos.dcMotor}
        topic="DC motor — fields and force in action"
        caption="Optional. The Engineering Mindset shows what F = BIL actually looks like inside a DC motor — current flowing through wires sitting in a field, force pushing the rotor round. The maths from this lesson in moving form."
      />

      <SectionRule />

      <CommonMistake
        title="Using your LEFT hand for the grip rule"
        whatHappens={
          <>
            You apply the grip rule with your left hand, get the field direction backwards, then
            conclude the north end of your solenoid is on the wrong side. In an exam that’s a
            wrong answer. On site, if you’re relying on it to wire up an electromagnet with a
            defined orientation (a polarised relay, a DC solenoid that has to push rather than
            pull), you’ve wired it backwards.
          </>
        }
        doInstead={
          <>
            Always use your <strong>RIGHT hand</strong> for the grip rule. Always. The left hand
            is reserved for Fleming’s left-hand rule (motor force, later in this lesson). Pin it on the
            wall: <em>"Grip rule = right hand. Always."</em>
          </>
        }
      />

      <Scenario
        title="Why does an electric drill kick when you pull the trigger?"
        situation={
          <>
            You pull the trigger on a corded SDS drill and it gives a sudden jerk in your hand
            before settling into a steady spin. New apprentice asks why — what do you tell them?
          </>
        }
        whatToDo={
          <>
            That kick is the <strong>motor effect</strong> in action — F = BIL. The instant you
            energise the motor, a big inrush of current floods through the rotor windings. Each
            conductor in the rotor sits in the magnetic field of the stator, and the force on each
            one is proportional to that current. Big inrush = big force = a sudden torque kick in
            your hand. Within a fraction of a second the motor speeds up, the inrush dies down,
            and the drill settles. The same kick is why every motor on site is rated for "locked
            rotor current" — the current it draws at the moment of starting before it’s spinning.
          </>
        }
        whyItMatters={
          <>
            Understanding the kick stops you spec’ing a circuit that trips on every motor start.
            Inrush can be 6 to 10 times normal running current. That’s why circuits feeding motors
            get sized for the inrush, and why MCB curves (B, C, D) are chosen to ride out the
            brief overshoot without nuisance-tripping.
          </>
        }
      />

      <SectionRule />

      <ConceptBlock title="Forward reference — this is what an RCD sees">
        <p>
          The magnetic effect of current you’ve just learned is exactly what an RCD’s toroidal
          current transformer relies on — and it is built on directly when we get to RCD and AFDD
          electronics.
        </p>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Every current produces a magnetic field around it. Switch the current off, the field disappears.',
          'Right-hand grip rule: thumb along the conventional current, fingers curl with the field. Use the same hand for a coil to find the N pole.',
          'A solenoid is a coil; an electromagnet is a coil with a soft-iron core. The core multiplies the field by 1,000 or more.',
          'Field strength inside a solenoid scales with current × turns per metre. Reverse the current and the poles swap.',
          'A current-carrying conductor in a magnetic field feels a force F = B × I × L. That’s the working principle of every motor on the planet.',
          'This effect runs every contactor, relay, solenoid valve, electric lock, motor and RCD coil you’ll touch on site.',
        ]}
      />

      <Quiz title="Magnetic effect of current — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The reverse of what came before. There, current made magnetism. Here, changing magnetism
        makes current. Faraday spotted it in 1831 — and it’s how every generator, transformer and
        induction motor on Earth works.
      </p>

      <TLDR
        points={[
          "Faraday's law: a changing magnetic flux through a coil induces an EMF. Faster change = bigger EMF. No change = no EMF, ever.",
          "Lenz's law: the induced current always flows in the direction that OPPOSES the change. That’s where the resistance you feel pushing a magnet into a coil comes from — and where conservation of energy lives.",
          'Fleming’s rules: LEFT hand for motors (force from a current in a field), RIGHT hand for generators (induced current from motion in a field). RGLM — Right Generator, Left Motor.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          "State Faraday's law of electromagnetic induction in your own words.",
          'Apply EMF = N × (dΦ/dt) in worked examples.',
          "State Lenz's law and explain why opposition is required by conservation of energy.",
          'Use Fleming’s left-hand rule to find force direction in a motor.',
          'Use Fleming’s right-hand rule to find induced-current direction in a generator.',
          'Recognise back-EMF in motors and switching transients in coils on site.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The discovery that closed the circle</ContentEyebrow>

      <ConceptBlock
        title="Faraday, 1831 — moving magnetism makes electricity"
        plainEnglish="Ørsted (1820): pass current → get magnetism. Faraday (1831): change magnetism → get current. The two halves of electromagnetism, eleven years apart."
        onSite="Every kWh of electricity ever generated in the UK has been generated by Faraday’s discovery — a coil being spun through a magnetic field. Coal, gas, nuclear, hydro, wind — they’re all just different ways of turning the shaft."
      >
        <p>
          Earlier in this lesson you saw that a current makes a magnetic field — that’s the{' '}
          <strong>magnetic effect of current</strong>. Michael Faraday spent eleven years looking
          for the reverse: did a magnetic field make a current? In 1831 he found it. Move a magnet
          near a coil — and a small current flowed. Stop the magnet — current stopped. Move it the
          other way — current reversed.
        </p>
        <p>
          The discovery created an entire industry within a generation. Every generator that ever
          spun, every transformer that ever stepped a voltage up or down, every induction motor
          that ever turned a pump — all of them rely on Faraday’s law. Without this single 1831
          discovery, there is no UK National Grid, no AC supply, no electrified anything.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Faraday's law — the magnitude</ContentEyebrow>

      <ConceptBlock
        title="EMF is induced when the flux through a coil changes"
        plainEnglish="The voltage you generate depends on three things: how strong the field is, how fast it’s changing, and how many turns of wire your coil has."
        onSite="A torch dynamo. Wind it slowly — dim glow. Wind it fast — bright glow. That’s Faraday’s law in your hand: the faster you change the flux, the bigger the EMF."
      >
        <p>
          <strong>Faraday's law of electromagnetic induction</strong> says that the EMF induced in
          a coil is proportional to the <strong>rate of change of flux</strong> through it.
          Multiply by the number of turns and the formula is:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>EMF = N × (ΔΦ / Δt)</strong>
          </li>
          <li>EMF in volts (V)</li>
          <li>N = number of turns in the coil</li>
          <li>ΔΦ = change in flux (Wb)</li>
          <li>Δt = time over which the change happens (s)</li>
        </ul>
        <p>Three things to take away from that:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Static field, no induction.</strong> If Φ doesn’t change, the term ΔΦ/Δt is
            zero — no EMF, even if the field is enormous.
          </li>
          <li>
            <strong>Faster change, bigger EMF.</strong> Halve the time and you double the induced
            voltage.
          </li>
          <li>
            <strong>More turns, bigger EMF.</strong> A thousand-turn coil generates a thousand
            times the voltage of one turn for the same flux change.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Faraday's law of electromagnetic induction (Faraday, 1831)"
        clause="The electromotive force induced in any closed circuit is proportional to the rate of change of magnetic flux linking that circuit."
        meaning={
          <>
            That single sentence underpins every generator, every transformer, every induction
            motor and every wireless charger ever built. It’s the basis for the voltage at every
            UK socket — without flux changing inside the alternators at the power station, there’s
            no 230 V on your meter tails.
          </>
        }
        cite="Source: Faraday, 'Experimental Researches in Electricity', 1831 — paraphrased to modern wording."
      />

      <ConceptBlock title="Worked example — induced EMF in a coil">
        <p>
          A coil of <strong>N = 100 turns</strong> sits in a magnetic field. The flux through the
          coil changes by <strong>ΔΦ = 0.02 Wb</strong> over a time of <strong>Δt = 0.5 s</strong>{' '}
          (perhaps because a magnet was moved past it at a steady speed).
        </p>
        <p>What EMF is induced across the ends of the coil?</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>EMF = N × (ΔΦ / Δt)</strong>
          </li>
          <li>
            <strong>EMF = 100 × (0.02 / 0.5)</strong>
          </li>
          <li>
            <strong>EMF = 100 × 0.04 = 4 V</strong>
          </li>
        </ul>
        <p>
          Move the magnet through in half the time (0.25 s instead of 0.5 s) and the EMF doubles
          to 8 V. Same change in flux, twice the rate, twice the voltage. That’s Faraday in
          numbers.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Lenz's law — the direction</ContentEyebrow>

      <ConceptBlock
        title="The induced current always opposes the change that caused it"
        plainEnglish="Push a magnet into a coil and the coil generates a current in the direction that creates an opposing pole — pushing back on the magnet. Pull it out and the current reverses to try to hold the magnet in. Whatever you’re doing to it, the coil resists."
        onSite="That’s why a hand-cranked generator gets HARDER to turn the more current you draw from it. The harder you load it, the bigger the induced current, the bigger the opposing field, the bigger the resistance you have to push against. Conservation of energy in your forearm."
      >
        <p>
          <strong>Lenz’s law</strong> (Heinrich Lenz, 1834) tells you which way the induced
          current actually flows. The rule is simple but profound:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>
              The induced current flows in the direction that opposes the change in flux that
              caused it.
            </strong>
          </li>
        </ul>
        <p>
          Push the N pole of a magnet INTO a coil and the induced current creates a
          <strong> N pole at the coil’s entry end</strong> — like-pole-to-like, repelling the
          magnet, fighting your push. Pull the magnet OUT and the induced current reverses,
          creating a <strong>S pole at the entry end</strong> — opposite-pole-to-opposite,
          attracting the magnet, fighting your pull.
        </p>
        <p>
          Why must this be? Conservation of energy. If the coil <em>helped</em> you push the
          magnet in (instead of resisting), the magnet would accelerate and generate more current,
          which would push it harder, which would generate more current — free energy from
          nothing. That’s impossible. Opposition is the universe’s receipt: the electrical energy
          you get out matches the mechanical work you put in.
        </p>
      </ConceptBlock>

      <LenzLaw />

      <SectionRule />

      <ContentEyebrow>Fleming's two hands — direction the practical way</ContentEyebrow>

      <ConceptBlock
        title="Two rules, two hands. Get this clear and stop guessing."
        plainEnglish="LEFT hand for motors (force on a current). RIGHT hand for generators (induced current from motion). The mnemonic: ‘Right Generator, Left Motor’ — RGLM."
        onSite="If you ever stop and have to think which is which mid-job, you’ll get it backwards. Burn the mnemonic in: RGLM. Write it on the back of your hand if you have to. The exam will catch you out otherwise."
      >
        <p>
          Lenz’s law tells you the principle of opposition. <strong>Fleming’s rules</strong> give
          you a mechanical way to find specific directions when you have force, field and
          current/motion all at right angles to each other. Two rules, two hands:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>LEFT hand → MOTOR effect.</strong> Use it when you have a current-carrying
            conductor in a field and you want the direction of the resulting FORCE.
          </li>
          <li>
            <strong>RIGHT hand → GENERATOR effect.</strong> Use it when you’re moving a conductor
            through a field and you want the direction of the INDUCED CURRENT.
          </li>
        </ul>
        <p>
          For both rules, hold your{' '}
          <strong>thumb, first and second fingers at right angles to each other</strong> (like a
          fork). The labels are the same on either hand:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>thuMb → Motion / force</strong>
          </li>
          <li>
            <strong>First finger → Field (N to S)</strong>
          </li>
          <li>
            <strong>seCond finger → Current (conventional, + to −)</strong>
          </li>
        </ul>
        <p>
          The trick to remembering the order: <strong>M-F-C</strong> from thumb outwards. Motion,
          Field, Current.
        </p>
      </ConceptBlock>

      <FlemingsLeftHandRule />

      <FlemingsRightHandRule />

      <ConceptBlock
        title="The trick that gets you through the exam: RGLM"
        plainEnglish="Right hand for Generators, Left hand for Motors. On either hand: thuMb = Motion / force, First finger = Field, seCond finger = Current. M-F-C from thumb out. Burn it in."
        onSite="Mid-job, mid-exam, mid-panic — you don’t want to be guessing which hand to grab. RGLM in your head and M-F-C on the fingers, every time."
      >
        <p>
          Two mnemonics. Drilled together, they’re the difference between getting Fleming’s rules
          right under pressure and getting them backwards.
        </p>
        <p>
          <strong>RGLM — Right Generator, Left Motor.</strong> If the question is about an induced
          current (something MOVING through a field, generating electricity), reach for your{' '}
          <strong>RIGHT</strong> hand. If the question is about a force on a current-carrying
          conductor (electricity producing motion), reach for your <strong>LEFT</strong> hand.
          Same word order both times: hand first, then what it’s for.
        </p>
        <p>
          <strong>M-F-C — thuMb, First finger, seCond finger.</strong> On either hand, hold your
          thumb, first and second fingers at right angles to each other (like a fork). The labels
          are the same on both:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>thuMb → Motion</strong> (or force, in the motor case)
          </li>
          <li>
            <strong>First finger → Field</strong> (N to S)
          </li>
          <li>
            <strong>seCond finger → Current</strong> (conventional, + to −)
          </li>
        </ul>
        <p>
          <strong>Quick worked check.</strong> A wind turbine spins a coil through a magnetic
          field — that’s a generator, so <strong>RIGHT</strong> hand. Field N-to-S along the first
          finger, motion of the conductor along the thumb, and the second finger now points the
          way the induced current flows. Compare it to a DC motor: current is fed in (pick the
          second finger), the field is fixed (first finger), and the thumb shows you which way the
          conductor will be forced — so you use the <strong>LEFT</strong> hand. RGLM keeps you
          honest.
        </p>
        <p>
          <strong>Write it on your hand for the exam.</strong> There’s no rule against having
          "RGLM" written on the back of your hand on the day of the assessment — and a lot of
          apprentices do exactly that. It’s a memory aid, not cheating. The examiners care that
          you can apply the rule, not that you’ve memorised which is which.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The motor effect in practice"
        plainEnglish="A wire carrying current sits in a field. The wire feels a force at right angles to both. Spin the wire in a loop and you’ve got a motor."
      >
        <p>
          When a current-carrying conductor sits in a magnetic field, the force on it is given by{' '}
          <strong>F = B × I × L</strong> from earlier in this lesson. Fleming’s LEFT-hand rule gives you the
          direction of that force.
        </p>
        <p>
          Wrap a coil round a shaft, pass current through it, sit it between magnetic poles — and
          the forces on the two sides of the loop push it round in a circle. That’s the guts of a
          DC motor: <strong>magnetic field + current + Fleming’s left hand = torque</strong>.
        </p>
        <p>
          <strong>Look at the diagram below:</strong> field running N to S across the page,
          current flowing through the conductor at right angles to the field, force kicking the
          conductor sideways at right angles to both. Three quantities, three axes — that’s the
          motor effect in one picture.
        </p>
      </ConceptBlock>

      <MotorEffect />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <ConceptBlock
        title="The generator effect in practice"
        plainEnglish="Reverse the motor. Instead of feeding current in to make it spin, you spin it from outside — and a current comes out. Same kit, opposite direction of energy."
        onSite="A motor and a generator are mechanically the same machine. Run electrical energy in, get rotation out (motor). Run rotation in, get electrical energy out (generator). Change the direction of the energy and the maths reverses."
      >
        <p>
          If you spin the same coil the other way — by hand, by a steam turbine, by a wind turbine
          — and just let it move through the field, then a current is induced in it by Faraday’s
          law. Fleming’s RIGHT-hand rule tells you which way that induced current flows.
        </p>
        <p>
          That’s the entire principle of every alternator on every UK power station, every wind
          turbine, every diesel genset on a building site. Mechanical work spins a coil through a
          field, induced EMF appears at the terminals, current flows when you connect a load. The
          lesson on AC generation walks through the geometry of a single-loop AC generator step by
          step.
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

      <ContentEyebrow>Optional deeper dive</ContentEyebrow>

      <ConceptBlock title="Transformer — induction without movement">
        <p>
          A transformer is the cleanest example of electromagnetic induction in the trade. No
          shaft, no rotor, nothing physically moves. Just two coils wound on the same iron core —
          and the AC current in the first coil produces a constantly-changing flux in the core
          that induces an EMF in the second coil.
        </p>
        <p>
          <strong>Look at the diagram.</strong> Primary winding on the left, laminated iron core
          in the middle, secondary winding on the right. The CHANGING magnetic flux in the core
          (driven by AC in the primary) induces an EMF in the secondary — no wires touch between
          primary and secondary, ever. That’s pure Faraday in a steel box, and it’s how every
          step-down transformer in the country gets 230 V to your socket from the 11 kV in the
          street.
        </p>
      </ConceptBlock>

      <TransformerSchematic caption="Step-down transformer — primary on the left, laminated iron core in the middle, secondary on the right." />

      <VideoCard
        {...videos.transformers}
        topic="Transformers — electromagnetic induction in one device"
        caption="Optional deeper dive — transformers are the cleanest visual demo of electromagnetic induction. Watch the primary winding induce an EMF in the secondary purely through a changing magnetic field."
      />

      <SectionRule />

      <CommonMistake
        title="Mixing up the LEFT and RIGHT hand rules under exam pressure"
        whatHappens={
          <>
            The exam asks for the direction of induced current in a generator. You reach for your
            left hand without thinking, set up your fingers, and confidently mark down the wrong
            answer. Or worse — on a job, you’re trying to predict which way the rotor of a small
            generator will spin from the polarity of the field windings, you grab the wrong hand,
            and spec the wrong drive direction.
          </>
        }
        doInstead={
          <>
            Drill the mnemonic until it’s automatic:{' '}
            <strong>"Right for Generators, Left for Motors" — RGLM</strong>. Hand on heart, you
            should be able to recite "right generator, left motor" in your sleep before you sit
            the exam. Some apprentices write it on the back of their hand on the day of
            the exam — there’s no rule against having "RGLM" written there.
          </>
        }
      />

      <Scenario
        title="The disconnect that flashed — what went wrong?"
        situation={
          <>
            Your supervisor disconnects an old 230 V contactor coil under load by ripping the
            push-on terminals off — there’s a sharp blue flash and a small bang. Nothing appears
            damaged. He shrugs, "happens every time." What actually happened?
          </>
        }
        whatToDo={
          <>
            That flash is Faraday and Lenz colliding with reality. While the coil was energised,
            current was flowing, and there was a steady magnetic flux in the core. The instant he
            yanked the terminals off, the current was forced to fall from full to zero in
            microseconds. Faraday’s law says EMF is proportional to dΦ/dt — a fast change makes a
            HUGE induced voltage. Lenz says it opposes the change, which means it tries to keep
            the current flowing — and that voltage spike (often hundreds of volts on a 230 V coil)
            jumps across the air gap as the contacts separate. That’s your blue flash. Repeat it
            enough times and the contacts erode away. Snubber networks (resistor + capacitor
            across the coil) are designed to absorb that energy harmlessly.
          </>
        }
        whyItMatters={
          <>
            Knowing this stops you treating it as harmless. The same induced spike can blow
            low-voltage logic chips on adjacent control boards, damage RCBOs upstream, and slowly
            destroy contactors. Specifying a snubber on inductive loads — coils, solenoids,
            transformers, motors — is part of competent design, not optional garnish.
          </>
        }
      />

      <SectionRule />

      <ConceptBlock
        title="Back-EMF in practice — why coils need snubbers"
        plainEnglish="When you switch off the current to a coil, the field collapses fast. Lenz’s law fights the change — and the only way it can fight is by inducing a huge voltage spike that tries to keep the current flowing. Without somewhere safe for that spike to go, it flashes contacts, fries transistors and welds relays."
        onSite="Open any panel feeding a contactor coil from a PLC output and you’ll find a snubber across the coil terminals — a small RC pack on AC, or a freewheel diode across DC coils. That’s not optional garnish. That’s what stops the PLC output stage blowing up the first time the contactor de-energises."
      >
        <p>
          When a contactor or relay coil is de-energised — by an MCB tripping, a switch opening, a
          PLC dropping its output — the magnetic field that was sitting in the core has nowhere to
          go and collapses in microseconds. Lenz’s law says the coil has to fight
          that collapse: it does so by inducing a big EMF in the direction that tries to keep the
          current flowing. Faraday’s law says the size of that induced EMF is
          proportional to dΦ/dt — and a microsecond collapse of a sizeable flux gives an enormous
          dΦ/dt.
        </p>
        <p>
          The result is a voltage spike on the coil that can briefly hit{' '}
          <strong>hundreds or thousands of volts</strong>, even on a 24 V coil. That spike has to
          dump its energy somewhere. If you’ve given it nowhere to go, it dumps it anywhere it can
          reach:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Across an opening MCB or relay contact</strong> — the spike jumps the widening
            air gap as an arc, eroding the contact metal each time. Repeat for a year and the
            contacts are slag.
          </li>
          <li>
            <strong>Through a transistor in a PLC or control board</strong> — the spike exceeds
            the device’s rated breakdown voltage and the silicon punches through. One
            de-energisation, one dead output card.
          </li>
          <li>
            <strong>Across a relay’s own contacts</strong> — the spike welds the contacts shut.
            The relay never opens again. Whatever it was switching stays on.
          </li>
        </ul>
        <p>
          The fix is a <strong>snubber</strong> — a deliberate path for the energy to dump into
          harmlessly. Two common forms:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>RC snubber across an AC coil.</strong> A small resistor (typically 47 to 220
            Ω) in series with a capacitor (typically 0.1 to 0.47 µF), wired straight across the
            coil terminals. The capacitor absorbs the spike, the resistor damps the resulting
            oscillation.
          </li>
          <li>
            <strong>Flyback (freewheel) diode across a DC coil.</strong> A standard rectifier
            diode wired across the coil with its cathode to the positive supply. When the coil
            de-energises, the spike forward-biases the diode and the energy circulates harmlessly
            round the coil-diode loop until it dies in the coil resistance. Costs pence, saves the
            control board.
          </li>
        </ul>
        <p>
          <strong>Forward reference — AFDDs.</strong> AFDDs include exactly this kind of
          transient suppression internally — they have to, because they’re monitoring fast spikes
          on the supply for arc detection and they can’t afford their own electronics being killed
          by every contactor switching upstream of them. When the AFDD electronics are built out
          later in this course, the back-EMF problem you’ve just met is one of the things the device has to
          design around.
        </p>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          "Faraday's law: EMF = N × (ΔΦ / Δt). Faster flux change or more turns = bigger EMF. No change = no EMF, even in a strong static field.",
          "Lenz's law: the induced current always flows in the direction that OPPOSES the change in flux that caused it. Required by conservation of energy.",
          'Fleming’s LEFT hand → motor effect. Force on a current-carrying conductor in a field. The principle of every motor.',
          'Fleming’s RIGHT hand → generator effect. Induced current when a conductor moves through a field. The principle of every generator and alternator.',
          'Mnemonic for both: thuMb = Motion, First finger = Field, seCond finger = Current. M-F-C from thumb out. RGLM = Right Generator, Left Motor.',
          'Back-EMF, transformer action, induction motors, switching transients — everything in this list is just Faraday and Lenz operating in slightly different geometry.',
        ]}
      />

      <Quiz title="Electromagnetic induction — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
