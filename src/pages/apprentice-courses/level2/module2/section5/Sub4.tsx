/**
 * Electromagnetic induction and EMF — motor and generator effects (5.3).
 * City & Guilds 2365-02 → Unit 202 → LO5 → AC 5.3.
 * Apprentice-quality content from scratch — Faraday, Lenz, Fleming.
 * The reverse of Sub3: changing flux makes voltage. The other half of every
 * generator, transformer and induction motor.
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
  FlemingsLeftHandRule,
  FlemingsRightHandRule,
  MotorEffect,
  LenzLaw,
  TransformerSchematic,
} from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Electromagnetic induction and EMF — motor and generator effects (5.3) | Level 2 Module 2.5.4 | Elec-Mate';
const DESCRIPTION =
  "Faraday's law, Lenz's law, and the two Fleming rules. Move a conductor through a field — get an EMF. Pass a current through a conductor in a field — get a force. The reciprocal trick that runs every motor and generator.";

const checks = [
  {
    id: 'faraday-induction',
    question: 'When does an EMF get induced in a coil sitting in a magnetic field?',
    options: [
      'When the field is strong',
      'Only when the field is constant',
      'When the flux through the coil is changing',
      'Only when the coil is connected to a battery',
    ],
    correctIndex: 2,
    explanation:
      'Faraday’s law: EMF is induced only when the FLUX is CHANGING. A static field with a stationary coil produces nothing. Move the coil, move the magnet, or change the current that produced the field — then you get EMF.',
  },
  {
    id: 'lenz-direction',
    question:
      'You push the N pole of a magnet INTO a coil. The induced current in the coil produces:',
    options: [
      'A south pole at the entry end (pulls the magnet in faster)',
      'A north pole at the entry end (opposes the magnet)',
      'No pole at all',
      'A field perpendicular to the magnet’s motion',
    ],
    correctIndex: 1,
    explanation:
      'Lenz’s law: the induced current always OPPOSES the change that caused it. Pushing N in means the coil generates an induced N to push back. That opposition is what you feel as resistance — and it’s what conserves energy in every generator.',
  },
  {
    id: 'fleming-rules',
    question: 'Which rule do you use to find the direction of induced current in a generator?',
    options: [
      'Fleming’s left-hand rule',
      'Fleming’s right-hand rule',
      'Right-hand grip rule',
      'Lenz’s law alone',
    ],
    correctIndex: 1,
    explanation:
      'Right hand for Generators (induced current). Left hand for Motors (force on a current). The mnemonic is "RGLM" — Right Generator, Left Motor.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does Faraday's law of electromagnetic induction state?",
    options: [
      'Like poles repel',
      'Induced EMF is proportional to the rate of change of magnetic flux',
      'Current in a wire creates a magnetic field',
      'Force equals current times length times field',
    ],
    correctAnswer: 1,
    explanation:
      'Faraday: EMF ∝ rate of change of flux (dΦ/dt). Faster change = bigger EMF. No change = no EMF, even if the field is huge.',
  },
  {
    id: 2,
    question: 'Lenz’s law tells you the:',
    options: [
      'Magnitude of induced EMF',
      'Direction of induced current',
      'Strength of a magnet',
      'Speed of a motor',
    ],
    correctAnswer: 1,
    explanation:
      'Lenz gives you DIRECTION. Faraday gives you magnitude. Together they fully describe induction.',
  },
  {
    id: 3,
    question:
      'A 100-turn coil has the flux through it change by 0.02 Wb in 0.5 seconds. The induced EMF is:',
    options: ['1 V', '2 V', '4 V', '10 V'],
    correctAnswer: 2,
    explanation:
      'EMF = N × (dΦ/dt) = 100 × (0.02 / 0.5) = 100 × 0.04 = 4 V. Faraday’s law in numbers.',
  },
  {
    id: 4,
    question: 'Fleming’s LEFT-hand rule applies to:',
    options: [
      'Generators',
      'Motors',
      'Transformers only',
      'AC supplies only',
    ],
    correctAnswer: 1,
    explanation:
      'LEFT for Motors — force on a current-carrying conductor in a field. The mnemonic: Right Generator, Left Motor.',
  },
  {
    id: 5,
    question:
      "On Fleming's left-hand rule, the second finger represents:",
    options: ['Field', 'Force', 'Current', 'Motion'],
    correctAnswer: 2,
    explanation:
      'thuMb = Motion (force), First finger = Field, seCond finger = Current. That’s how you remember it: M-F-C from thumb outward.',
  },
  {
    id: 6,
    question: 'Why does an induction motor turn at all?',
    options: [
      'Because permanent magnets in the rotor pull on the stator',
      'Because the rotating stator field induces a current in the rotor, which then experiences a force F = BIL',
      'Because of friction',
      'Because of heat',
    ],
    correctAnswer: 1,
    explanation:
      'The rotor has no electrical connection. The stator’s rotating field induces current in the rotor bars (Faraday + Lenz), and that induced current sits in a field — so it feels F = BIL. Pure induction. The clue is in the name.',
  },
  {
    id: 7,
    question: 'What happens to an EMF if you double the speed at which a magnet moves through a coil?',
    options: ['Halves', 'Doubles', 'Quadruples', 'No change'],
    correctAnswer: 1,
    explanation:
      'EMF is proportional to rate of change of flux. Move the magnet twice as fast and dΦ/dt doubles — so the induced EMF doubles. Slow down or stop = EMF drops to zero instantly.',
  },
  {
    id: 8,
    question:
      'You disconnect a contactor coil under load and see a flash at the contacts. What’s causing it?',
    options: [
      'Static electricity',
      'A back-EMF induced by the rapidly collapsing field in the coil',
      'A short circuit',
      'A bad earth',
    ],
    correctAnswer: 1,
    explanation:
      'Lenz’s law in action. When the current breaks, the flux collapses fast — Faraday’s law gives a big induced EMF that opposes the change (which means it tries to keep the current flowing). That voltage spike jumps the contact gap as an arc. Snubber circuits exist exactly to absorb it.',
  },
];

const faqs = [
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

export default function Sub4() {
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
            eyebrow="Module 2 · Section 5 · Subsection 4"
            title="Electromagnetic induction and EMF"
            description="The reverse of last subsection. There, current made magnetism. Here, changing magnetism makes current. Faraday spotted it in 1831 — and it’s how every generator, transformer and induction motor on Earth works."
            tone="emerald"
          />

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
              In Sub3 you saw that a current makes a magnetic field — that’s the{' '}
              <strong>magnetic effect of current</strong>. Michael Faraday spent eleven years
              looking for the reverse: did a magnetic field make a current? In 1831 he found it.
              Move a magnet near a coil — and a small current flowed. Stop the magnet — current
              stopped. Move it the other way — current reversed.
            </p>
            <p>
              The discovery created an entire industry within a generation. Every generator that
              ever spun, every transformer that ever stepped a voltage up or down, every
              induction motor that ever turned a pump — all of them rely on Faraday’s law.
              Without this single 1831 discovery, there is no UK National Grid, no AC supply, no
              electrified anything.
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
              <strong>Faraday's law of electromagnetic induction</strong> says that the EMF
              induced in a coil is proportional to the <strong>rate of change of flux</strong>{' '}
              through it. Multiply by the number of turns and the formula is:
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
            <p>
              Three things to take away from that:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Static field, no induction.</strong> If Φ doesn’t change, the term ΔΦ/Δt
                is zero — no EMF, even if the field is enormous.
              </li>
              <li>
                <strong>Faster change, bigger EMF.</strong> Halve the time and you double the
                induced voltage.
              </li>
              <li>
                <strong>More turns, bigger EMF.</strong> A thousand-turn coil generates a
                thousand times the voltage of one turn for the same flux change.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Faraday's law of electromagnetic induction (Faraday, 1831)"
            clause="The electromotive force induced in any closed circuit is proportional to the rate of change of magnetic flux linking that circuit."
            meaning={
              <>
                That single sentence underpins every generator, every transformer, every
                induction motor and every wireless charger ever built. It’s the basis for the
                voltage at every UK socket — without flux changing inside the alternators at the
                power station, there’s no 230 V on your meter tails.
              </>
            }
            cite="Source: Faraday, 'Experimental Researches in Electricity', 1831 — paraphrased to modern wording."
          />

          <ConceptBlock title="Worked example — induced EMF in a coil">
            <p>
              A coil of <strong>N = 100 turns</strong> sits in a magnetic field. The flux through
              the coil changes by <strong>ΔΦ = 0.02 Wb</strong> over a time of{' '}
              <strong>Δt = 0.5 s</strong> (perhaps because a magnet was moved past it at a
              steady speed).
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
              Move the magnet through in half the time (0.25 s instead of 0.5 s) and the EMF
              doubles to 8 V. Same change in flux, twice the rate, twice the voltage. That’s
              Faraday in numbers.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
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
                <strong>The induced current flows in the direction that opposes the change in
                flux that caused it.</strong>
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
              magnet in (instead of resisting), the magnet would accelerate and generate more
              current, which would push it harder, which would generate more current — free
              energy from nothing. That’s impossible. Opposition is the universe’s receipt: the
              electrical energy you get out matches the mechanical work you put in.
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
              Lenz’s law tells you the principle of opposition. <strong>Fleming’s rules</strong>{' '}
              give you a mechanical way to find specific directions when you have force, field
              and current/motion all at right angles to each other. Two rules, two hands:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LEFT hand → MOTOR effect.</strong> Use it when you have a current-carrying
                conductor in a field and you want the direction of the resulting FORCE.
              </li>
              <li>
                <strong>RIGHT hand → GENERATOR effect.</strong> Use it when you’re moving a
                conductor through a field and you want the direction of the INDUCED CURRENT.
              </li>
            </ul>
            <p>
              For both rules, hold your <strong>thumb, first and second fingers at right angles
              to each other</strong> (like a fork). The labels are the same on either hand:
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
              The trick to remembering the order: <strong>M-F-C</strong> from thumb outwards.
              Motion, Field, Current.
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
              Two mnemonics. Drilled together, they’re the difference between getting Fleming’s
              rules right under pressure and getting them backwards.
            </p>
            <p>
              <strong>RGLM — Right Generator, Left Motor.</strong> If the question is about an
              induced current (something MOVING through a field, generating electricity), reach
              for your <strong>RIGHT</strong> hand. If the question is about a force on a
              current-carrying conductor (electricity producing motion), reach for your{' '}
              <strong>LEFT</strong> hand. Same word order both times: hand first, then what it’s
              for.
            </p>
            <p>
              <strong>M-F-C — thuMb, First finger, seCond finger.</strong> On either hand, hold
              your thumb, first and second fingers at right angles to each other (like a fork).
              The labels are the same on both:
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
              field — that’s a generator, so <strong>RIGHT</strong> hand. Field N-to-S along the
              first finger, motion of the conductor along the thumb, and the second finger now
              points the way the induced current flows. Compare it to a DC motor: current is
              fed in (pick the second finger), the field is fixed (first finger), and the thumb
              shows you which way the conductor will be forced — so you use the <strong>LEFT
              </strong> hand. RGLM keeps you honest.
            </p>
            <p>
              <strong>Write it on your hand for the exam.</strong> There’s no rule against having
              "RGLM" written on the back of your hand on the day of the assessment — and a lot of
              apprentices do exactly that. It’s a memory aid, not cheating. The examiners care
              that you can apply the rule, not that you’ve memorised which is which.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The motor effect in practice"
            plainEnglish="A wire carrying current sits in a field. The wire feels a force at right angles to both. Spin the wire in a loop and you’ve got a motor."
          >
            <p>
              When a current-carrying conductor sits in a magnetic field, the force on it is
              given by <strong>F = B × I × L</strong> from Sub3. Fleming’s LEFT-hand rule gives
              you the direction of that force.
            </p>
            <p>
              Wrap a coil round a shaft, pass current through it, sit it between magnetic poles
              — and the forces on the two sides of the loop push it round in a circle. That’s the
              guts of a DC motor: <strong>magnetic field + current + Fleming’s left hand =
              torque</strong>.
            </p>
            <p>
              <strong>Look at the diagram below:</strong> field running N to S across the page,
              current flowing through the conductor at right angles to the field, force kicking
              the conductor sideways at right angles to both. Three quantities, three axes — that’s
              the motor effect in one picture.
            </p>
          </ConceptBlock>

          <MotorEffect />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="The generator effect in practice"
            plainEnglish="Reverse the motor. Instead of feeding current in to make it spin, you spin it from outside — and a current comes out. Same kit, opposite direction of energy."
            onSite="A motor and a generator are mechanically the same machine. Run electrical energy in, get rotation out (motor). Run rotation in, get electrical energy out (generator). Change the direction of the energy and the maths reverses."
          >
            <p>
              If you spin the same coil the other way — by hand, by a steam turbine, by a wind
              turbine — and just let it move through the field, then a current is induced in it
              by Faraday’s law. Fleming’s RIGHT-hand rule tells you which way that induced
              current flows.
            </p>
            <p>
              That’s the entire principle of every alternator on every UK power station, every
              wind turbine, every diesel genset on a building site. Mechanical work spins a coil
              through a field, induced EMF appears at the terminals, current flows when you
              connect a load. Sub5 walks through the geometry of a single-loop AC generator step
              by step.
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

          <ConceptBlock title="Transformer — induction without movement">
            <p>
              A transformer is the cleanest example of electromagnetic induction in the trade. No
              shaft, no rotor, nothing physically moves. Just two coils wound on the same iron
              core — and the AC current in the first coil produces a constantly-changing flux in
              the core that induces an EMF in the second coil.
            </p>
            <p>
              <strong>Look at the diagram.</strong> Primary winding on the left, laminated iron
              core in the middle, secondary winding on the right. The CHANGING magnetic flux in
              the core (driven by AC in the primary) induces an EMF in the secondary — no wires
              touch between primary and secondary, ever. That’s pure Faraday in a steel box, and
              it’s how every step-down transformer in the country gets 230 V to your socket from
              the 11 kV in the street.
            </p>
          </ConceptBlock>

          <TransformerSchematic caption="Step-down transformer — primary on the left, laminated iron core in the middle, secondary on the right." />

          <VideoCard
            url={videos.transformers.url}
            title={videos.transformers.title}
            channel={videos.transformers.channel}
            duration={videos.transformers.duration}
            topic="Transformers — electromagnetic induction in one device · Unit 202 LO5.3"
            caption="Optional deeper dive — transformers are the cleanest visual demo of electromagnetic induction. Watch the primary winding induce an EMF in the secondary purely through a changing magnetic field."
          />

          <SectionRule />

          <CommonMistake
            title="Mixing up the LEFT and RIGHT hand rules under exam pressure"
            whatHappens={
              <>
                The exam asks for the direction of induced current in a generator. You reach for
                your left hand without thinking, set up your fingers, and confidently mark down
                the wrong answer. Or worse — on a job, you’re trying to predict which way the
                rotor of a small generator will spin from the polarity of the field windings,
                you grab the wrong hand, and spec the wrong drive direction.
              </>
            }
            doInstead={
              <>
                Drill the mnemonic until it’s automatic: <strong>"Right for Generators, Left
                for Motors" — RGLM</strong>. Hand on heart, you should be able to recite "right
                generator, left motor" in your sleep before you sit the Level 2 exam. Some
                apprentices write it on the back of their hand on the day of the exam — there’s
                no rule against having "RGLM" written there.
              </>
            }
          />

          <Scenario
            title="The disconnect that flashed — what went wrong?"
            situation={
              <>
                Your supervisor disconnects an old 230 V contactor coil under load by ripping the
                push-on terminals off — there’s a sharp blue flash and a small bang. Nothing
                appears damaged. He shrugs, "happens every time." What actually happened?
              </>
            }
            whatToDo={
              <>
                That flash is Faraday and Lenz colliding with reality. While the coil was
                energised, current was flowing, and there was a steady magnetic flux in the
                core. The instant he yanked the terminals off, the current was forced to fall
                from full to zero in microseconds. Faraday’s law says EMF is proportional to
                dΦ/dt — a fast change makes a HUGE induced voltage. Lenz says it opposes the
                change, which means it tries to keep the current flowing — and that voltage
                spike (often hundreds of volts on a 230 V coil) jumps across the air gap as the
                contacts separate. That’s your blue flash. Repeat it enough times and the
                contacts erode away. Snubber networks (resistor + capacitor across the coil)
                are designed to absorb that energy harmlessly.
              </>
            }
            whyItMatters={
              <>
                Knowing this stops you treating it as harmless. The same induced spike can blow
                low-voltage logic chips on adjacent control boards, damage RCBOs upstream, and
                slowly destroy contactors. Specifying a snubber on inductive loads — coils,
                solenoids, transformers, motors — is part of competent design, not optional
                garnish.
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
              When a contactor or relay coil is de-energised — by an MCB tripping, a switch
              opening, a PLC dropping its output — the magnetic field that was sitting in the
              core has nowhere to go and collapses in microseconds. Lenz’s law (Sub5.4’s rule)
              says the coil has to fight that collapse: it does so by inducing a big EMF in the
              direction that tries to keep the current flowing. Faraday’s law (also Sub5.4) says
              the size of that induced EMF is proportional to dΦ/dt — and a microsecond collapse
              of a sizeable flux gives an enormous dΦ/dt.
            </p>
            <p>
              The result is a voltage spike on the coil that can briefly hit{' '}
              <strong>hundreds or thousands of volts</strong>, even on a 24 V coil. That spike
              has to dump its energy somewhere. If you’ve given it nowhere to go, it dumps it
              anywhere it can reach:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Across an opening MCB or relay contact</strong> — the spike jumps the
                widening air gap as an arc, eroding the contact metal each time. Repeat for a
                year and the contacts are slag.
              </li>
              <li>
                <strong>Through a transistor in a PLC or control board</strong> — the spike
                exceeds the device’s rated breakdown voltage and the silicon punches through.
                One de-energisation, one dead output card.
              </li>
              <li>
                <strong>Across a relay’s own contacts</strong> — the spike welds the contacts
                shut. The relay never opens again. Whatever it was switching stays on.
              </li>
            </ul>
            <p>
              The fix is a <strong>snubber</strong> — a deliberate path for the energy to dump
              into harmlessly. Two common forms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RC snubber across an AC coil.</strong> A small resistor (typically 47 to
                220 Ω) in series with a capacitor (typically 0.1 to 0.47 µF), wired straight
                across the coil terminals. The capacitor absorbs the spike, the resistor damps
                the resulting oscillation.
              </li>
              <li>
                <strong>Flyback (freewheel) diode across a DC coil.</strong> A standard
                rectifier diode wired across the coil with its cathode to the positive supply.
                When the coil de-energises, the spike forward-biases the diode and the energy
                circulates harmlessly round the coil-diode loop until it dies in the coil
                resistance. Costs pence, saves the control board.
              </li>
            </ul>
            <p>
              <strong>Forward reference to Sub6.6.</strong> AFDDs include exactly this kind of
              transient suppression internally — they have to, because they’re monitoring fast
              spikes on the supply for arc detection and they can’t afford their own electronics
              being killed by every contactor switching upstream of them. When Sub6.6 builds out
              the AFDD electronics, the back-EMF problem you’ve just met is one of the things
              the device has to design around.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

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

          <Quiz title="Electromagnetic induction — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.3 Magnetic effect of current — fields, solenoids
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Single-loop AC generator
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
