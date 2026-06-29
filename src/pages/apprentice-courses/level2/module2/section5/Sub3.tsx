/**
 * Magnetic effect of current — fields, solenoids (5.3).
 * City & Guilds 2365-02 → Unit 202 → LO5 → AC 5.3.
 * Apprentice-quality content from scratch — current makes magnetism. The
 * other half of every motor, contactor and transformer.
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
  VideoCard,
} from '@/components/study-centre/learning';
import {
  MagneticField,
  RightHandGripRule,
  SolenoidField,
} from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Magnetic effect of current — fields, solenoids (5.3) | Level 2 Module 2.5.3 | Elec-Mate';
const DESCRIPTION =
  'Every current makes a magnetic field. Right-hand grip rule, solenoids, electromagnets — and the force on a current-carrying conductor (F = BIL). The principle behind every motor, contactor and relay.';

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
    options: [
      '0.8 N',
      '20 N',
      '8 N',
      '5 N',
    ],
    correctIndex: 2,
    explanation:
      'F = B × I × L = 0.4 × 10 × 2 = 8 N. Same shape of formula as Ohm’s law — just learn it and plug in. This force is what spins every motor and pulls every contactor in.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Who first discovered that an electric current produces a magnetic field?',
    options: [
      'Michael Faraday',
      'Hans Christian Ørsted',
      'Nikola Tesla',
      'André-Marie Ampère',
    ],
    correctAnswer: 1,
    explanation:
      'Hans Christian Ørsted, 1820. He noticed a compass needle deflect when he switched on a circuit nearby. Faraday, Tesla and Ampère all built on it — but Ørsted was first.',
  },
  {
    id: 2,
    question: 'A current flows out of the page (towards you). The magnetic field around it goes:',
    options: [
      'Radially outward',
      'Clockwise',
      'Anticlockwise',
      'Radially inward',
    ],
    correctAnswer: 2,
    explanation:
      'Right-hand grip rule: thumb out of the page (towards you), fingers curl anticlockwise. Reverse the current and the field reverses too.',
  },
  {
    id: 3,
    question: 'Which rule do you use to find the direction of the magnetic field around a current-carrying conductor?',
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
    options: [
      'Stays the same',
      'Doubles',
      'Quadruples',
      'Halves',
    ],
    correctAnswer: 1,
    explanation:
      'Field strength inside a solenoid is proportional to current × turns per metre. Double the current → double the field. Same applies if you double the number of turns instead.',
  },
  {
    id: 6,
    question: 'A 0.5 m conductor carrying 5 A sits at right angles in a 0.2 T field. The force on it is:',
    options: [
      '5 N',
      '2 N',
      '0.5 N',
      '0.05 N',
    ],
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
      'Two effects. First, there’s a real force on the wire because current in a wire creates a magnetic field, and any nearby field (from another wire or a magnet) pushes back. Second — and bigger — when you break a high current the collapsing field induces a big back-EMF (Sub4’s territory). On a contactor that’s why you sometimes hear a snap and see a flash on disconnection.',
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

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 3"
            title="Magnetic effect of current — fields, solenoids"
            description="Move a charge and you get a magnetic field. That single fact, discovered by Ørsted in 1820, is the working principle behind every motor, contactor, RCD, transformer and solenoid valve on a UK building site."
            tone="emerald"
          />

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
              phenomena. Hans Christian Ørsted, a Danish physicist, was demonstrating something
              else to a class when he noticed a compass needle twitching every time he switched
              on a nearby circuit. The needle deflected at right angles to the wire — and
              reversed direction when he reversed the current.
            </p>
            <p>
              That accidental observation was the start of electromagnetism as a subject. Within
              a decade, Ampère, Faraday and others had worked out the rules. Within fifty years,
              the first electric motors and generators were being built. Every part of your trade
              — every spinning thing, every switching thing, every transforming thing — runs on
              what Ørsted accidentally spotted.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The field around a straight wire</ContentEyebrow>

          <ConceptBlock
            title="A straight current-carrying conductor produces a circular field around it"
            plainEnglish="The field forms concentric rings round the wire. Closer to the wire = stronger field. Reverse the current and the rings reverse direction."
          >
            <p>
              A long straight wire carrying a current is surrounded by a magnetic field whose
              lines form <strong>concentric circles</strong> around the wire — like ripples on a
              pond, but in 3D. The field exists in the air (or whatever else is around the wire)
              and gets weaker the further you go.
            </p>
            <p>
              Field strength at a distance r from a long straight wire is proportional to
              <strong> I / r</strong>. Double the current and you double the field. Double the
              distance from the wire and you halve it. Move a long way away and the field
              effectively vanishes.
            </p>
          </ConceptBlock>

          <MagneticField direction="up" />

          <RegsCallout
            source="IEC 60050 — International Electrotechnical Vocabulary, 121-11-50"
            clause="The magnetic field strength produced by an electric current is defined by the line integral of the magnetic field strength along a closed path enclosing the current."
            meaning={
              <>
                Plain English version: every electric current is automatically wrapped in a
                magnetic field. The bigger the current, the stronger the field. This is the
                formal IEC statement of what Ørsted found by accident — and what the right-hand
                grip rule shows you visually.
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
              The <strong>right-hand grip rule</strong> is the trick for working out the direction
              of the magnetic field around any current-carrying conductor. You don’t need a
              compass and you don’t need iron filings.
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Hold your <strong>right hand</strong> out, thumb extended like a thumbs-up.</li>
              <li>
                Point the <strong>thumb in the direction the conventional current is flowing
                </strong> (positive to negative, outside the source).
              </li>
              <li>
                Your fingers naturally curl around — and that curl shows the{' '}
                <strong>direction of the magnetic field</strong> around the wire.
              </li>
            </ol>
            <p>
              Reverse the current and you flip the hand round — the field reverses too. It’s why
              the field around an AC conductor reverses direction every half-cycle (50 times a
              second on UK 50 Hz mains).
            </p>
            <p>
              <strong>Common notation on diagrams:</strong> a dot ⊙ in the wire’s end-on view
              means current is coming OUT of the page towards you. A cross ⊗ means current is
              going INTO the page away from you. (Think of a feathered arrow — point of arrowhead
              coming at you = dot, tail-feathers going away = cross.)
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
              A <strong>solenoid</strong> is a wire wound into a long coil — many turns side by
              side, like the spring inside a biro pen. When you pass a current through it, every
              turn produces its own ring of magnetic field. Inside the coil all those fields
              point the same way and add together to form one strong, uniform field along the
              coil’s axis. Outside the coil, the field loops back round to the other end — exactly
              the same shape as the field around a bar magnet.
            </p>
            <p>One end of the solenoid acts as a <strong>north pole</strong>, the other as a{' '}
              <strong>south</strong>. Reverse the current and you swap them over.
            </p>
            <p>
              Field strength inside the coil depends on three things:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The current I</strong> — double the current, double the field.
              </li>
              <li>
                <strong>The number of turns per metre (n)</strong> — pack the loops in tighter and
                you get more field.
              </li>
              <li>
                <strong>The core material</strong> — a soft-iron core can multiply the field by a
                factor of thousands.
              </li>
            </ul>
            <p>
              The full equation for an air-cored solenoid is{' '}
              <strong>B = µ₀ × n × I</strong>, where µ₀ is the permeability of free space
              (4π × 10⁻⁷ Tm/A). For Level 2 you don’t need to crunch that — just remember that B
              scales with current and turns per metre.
            </p>
          </ConceptBlock>

          <SolenoidField />

          <ConceptBlock
            title="Right-hand grip rule for a coil — find the N pole in two seconds"
            plainEnglish="Curl your right-hand fingers in the direction the current loops round the coil. Your thumb points to the north end."
          >
            <p>
              The same right-hand grip rule works for a coil — you just apply it to the loops
              instead of the straight bit. Curl your right-hand fingers in the direction the
              <strong> conventional current</strong> is flowing round the loops, and your thumb
              points to the <strong>north pole</strong> of the solenoid.
            </p>
            <p>
              Reverse the current and the poles swap — the north end becomes south and vice
              versa. That’s why a DC solenoid valve only works one way round, and why an AC coil
              vibrates at twice mains frequency (the field reverses 100 times a second on UK 50
              Hz, attracting the armature on every half-cycle).
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
              An <strong>electromagnet</strong> is just a solenoid with a soft-iron core inside.
              The high permeability of the iron concentrates the flux dramatically — typically
              by 1,000 to 5,000 times for a soft-iron core, even more for advanced materials.
            </p>
            <p>
              The genius of an electromagnet over a permanent magnet is that{' '}
              <strong>you can switch it on and off</strong>. Cut the current and the field
              collapses to nothing in milliseconds. That’s exactly what you need for a contactor
              that has to engage and release thousands of times a day, an MCB that has to trip
              within milliseconds on a short circuit, or a solenoid valve that has to open and
              close on demand.
            </p>
            <p>
              The opposite trade-off applies if you make the core out of <strong>hard</strong>{' '}
              magnetic material — once you’ve magnetised it, it stays magnetised. That’s how
              permanent magnets are made in the first place: a strong solenoid pulse aligns the
              domains in a hard alloy, and the alignment stays put for years.
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
              Once you accept that current makes its own field, the next question is: what
              happens when that current sits inside someone else’s field? The answer is: the
              wire feels a <strong>force</strong>.
            </p>
            <p>
              For a straight conductor at right angles to a uniform field, the force is:
            </p>
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
              Direction of the force is given by Fleming’s LEFT-hand rule (next subsection’s
              territory). For now just remember the magnitude: <strong>F = BIL</strong>.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Worked example — the force on a motor conductor">
            <p>
              A 2 m length of conductor carries a current of 10 A and sits at right angles inside
              a magnetic field of 0.4 T (the kind of field strength you’d find in the air gap of a
              small DC motor).
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
            url={videos.dcMotor.url}
            title={videos.dcMotor.title}
            channel={videos.dcMotor.channel}
            duration={videos.dcMotor.duration}
            topic="DC motor — fields and force in action · Unit 202 LO5.3"
            caption="Optional. The Engineering Mindset shows what F = BIL actually looks like inside a DC motor — current flowing through wires sitting in a field, force pushing the rotor round. The maths from this subsection in moving form."
          />

          <SectionRule />

          <CommonMistake
            title="Using your LEFT hand for the grip rule"
            whatHappens={
              <>
                You apply the grip rule with your left hand, get the field direction backwards,
                then conclude the north end of your solenoid is on the wrong side. In an exam
                that’s a wrong answer. On site, if you’re relying on it to wire up an electromagnet
                with a defined orientation (a polarised relay, a DC solenoid that has to push
                rather than pull), you’ve wired it backwards.
              </>
            }
            doInstead={
              <>
                Always use your <strong>RIGHT hand</strong> for the grip rule. Always. The left
                hand is reserved for Fleming’s left-hand rule (motor force, next subsection).
                Pin it on the wall: <em>"Grip rule = right hand. Always."</em>
              </>
            }
          />

          <Scenario
            title="Why does an electric drill kick when you pull the trigger?"
            situation={
              <>
                You pull the trigger on a corded SDS drill and it gives a sudden jerk in your hand
                before settling into a steady spin. New apprentice asks why — what do you tell
                them?
              </>
            }
            whatToDo={
              <>
                That kick is the <strong>motor effect</strong> in action — F = BIL. The instant
                you energise the motor, a big inrush of current floods through the rotor windings.
                Each conductor in the rotor sits in the magnetic field of the stator, and the
                force on each one is proportional to that current. Big inrush = big force = a
                sudden torque kick in your hand. Within a fraction of a second the motor speeds
                up, the inrush dies down, and the drill settles. The same kick is why every motor
                on site is rated for "locked rotor current" — the current it draws at the moment
                of starting before it’s spinning.
              </>
            }
            whyItMatters={
              <>
                Understanding the kick stops you spec’ing a circuit that trips on every motor
                start. Inrush can be 6 to 10 times normal running current. That’s why circuits
                feeding motors get sized for the inrush, and why MCB curves (B, C, D) are chosen
                to ride out the brief overshoot without nuisance-tripping.
              </>
            }
          />

          <SectionRule />

          <ConceptBlock title="Forward reference — this is what an RCD sees">
            <p>
              The magnetic effect of current you’ve just learned is exactly what an RCD’s
              toroidal current transformer relies on — Sub6.6 builds on this directly when we
              get to RCD and AFDD electronics.
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

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.2 Magnetic flux and flux density
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Electromagnetic induction and EMF
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
