/**
 * The single-loop AC generator (5.4).
 * City & Guilds 2365-02 → Unit 202 → LO5 → AC 5.4.
 * Apprentice-quality content from scratch — Faraday's law geometry.
 * Why a spinning coil produces a sine wave, slip rings vs commutator,
 * the EMF = NBAω equation that ties it all together.
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
import { ACGenerator, DCMotorSchematic, SineWave } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'The single-loop AC generator (5.4) | Level 2 Module 2.5.5 | Elec-Mate';
const DESCRIPTION =
  'How a spinning coil between two magnets generates the sine wave you measure on every UK 230 V socket. EMF = NBAω, slip rings vs commutator, and why the output is naturally sinusoidal.';

const checks = [
  {
    id: 'generator-output-shape',
    question:
      'A single rectangular coil rotates at a steady speed between two magnetic poles. The voltage across its ends is:',
    options: [
      'A sine wave',
      'A sawtooth wave',
      'Constant DC',
      'A square wave',
    ],
    correctIndex: 0,
    explanation:
      'The flux through the coil changes as the cosine of the angle (Φ = BA cosθ). The induced EMF is the rate of change — which is sinusoidal. Spin a coil at constant speed = sine wave out, every time.',
  },
  {
    id: 'slip-rings-vs-commutator',
    question:
      'A generator uses two SLIP RINGS (continuous metal rings, one per coil end). What does the output look like?',
    options: [
      'No output at all',
      'Pure DC',
      'Pulsating DC (always positive)',
      'AC sine wave',
    ],
    correctIndex: 3,
    explanation:
      'Slip rings keep each end of the coil permanently connected to the same brush. Result: AC. A SPLIT-RING (commutator) swaps the connection every half-turn to produce DC. Same coil, two different output styles.',
  },
  {
    id: 'peak-emf-formula',
    question:
      'A 100-turn coil of area 0.01 m² rotates at 314 rad/s in a 0.5 T field. Approximate peak EMF?',
    options: [
      '157 V',
      '50 V',
      '314 V',
      '500 V',
    ],
    correctIndex: 0,
    explanation:
      'EMF_peak = N × B × A × ω = 100 × 0.5 × 0.01 × 314 = 157 V. (ω = 2πf, so 314 rad/s ≈ 50 Hz — one revolution per 20 ms, the UK mains rate.)',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why does a coil rotating at constant speed in a magnetic field produce a sine wave?',
    options: [
      'Internal thermal mass moderates temperature swings and reduces peak loads',
      'Because the rate of change of flux through the coil varies sinusoidally with the angle',
      'Appropriate mechanical protection such as conduit or trunking',
      'To record labour, materials, and plant for work done outside the contract scope',
    ],
    correctAnswer: 1,
    explanation:
      'The flux through a rotating coil is Φ = BA cosθ. Its rate of change with time (the EMF) is BAω sinθ — a sine wave. Different shape of input motion would give a different waveform.',
  },
  {
    id: 2,
    question: 'When is the induced EMF in a rotating coil at its MAXIMUM?',
    options: [
      'When the coil is at 45° to the field',
      'When the coil is stationary',
      'When the coil is parallel to the field',
      'When the coil is perpendicular to the field',
    ],
    correctAnswer: 2,
    explanation:
      'When the coil sides cut the field lines at right angles — that is, when the coil PLANE is parallel to the field. At that moment dΦ/dt is greatest, so EMF is at its peak.',
  },
  {
    id: 3,
    question: 'What component is used to take AC out of a rotating coil?',
    options: [
      'Diode bridge',
      'Commutator (split ring)',
      'Capacitor',
      'Slip rings',
    ],
    correctAnswer: 3,
    explanation:
      'Two slip rings — one continuous metal ring per coil end. Brushes ride on the rings to deliver AC to the external circuit. A split-ring commutator would convert the AC to pulsating DC.',
  },
  {
    id: 4,
    question:
      'The peak EMF of an AC generator is given by:',
    options: [
      'EMF = NBAω',
      'EMF = NBA/ω',
      'EMF = NB/Aω',
      'EMF = NA/(Bω)',
    ],
    correctAnswer: 0,
    explanation:
      'EMF_peak = N × B × A × ω, where N is turns, B is flux density, A is coil area and ω is angular velocity in rad/s. Bigger anything on the right = bigger peak voltage.',
  },
  {
    id: 5,
    question: 'A generator coil spins at 50 revolutions per second. Its angular velocity ω is:',
    options: [
      '100 rad/s',
      '314 rad/s',
      '50 rad/s',
      '157 rad/s',
    ],
    correctAnswer: 1,
    explanation:
      'ω = 2π × f = 2π × 50 ≈ 314 rad/s. UK mains generators spin at this electrical angular velocity to deliver the 50 Hz waveform.',
  },
  {
    id: 6,
    question:
      'You double the rotation speed of a generator coil. What happens to the peak EMF and the frequency of the output?',
    options: [
      'Both halve',
      'Peak EMF doubles, frequency halves',
      'Both double',
      'Peak EMF stays, frequency doubles',
    ],
    correctAnswer: 2,
    explanation:
      'EMF = NBAω — double ω, double the peak voltage. Frequency f = ω / 2π — double ω, double f. That’s why frequency is the easy thing to control on a generator: spin it faster.',
  },
  {
    id: 7,
    question:
      'A single-loop generator produces 10 V peak. What would 100 identical loops in series produce?',
    options: [
      '10 V peak',
      '100 V peak',
      'No change',
      '1000 V peak',
    ],
    correctAnswer: 3,
    explanation:
      'EMF scales linearly with N (number of turns). 100 turns in series → 100 × 10 V = 1000 V peak. That’s why every real generator has many turns per coil — you can’t spin a single loop fast enough to make useful voltage.',
  },
  {
    id: 8,
    question: 'How is the 50 Hz UK mains frequency actually produced at the power station?',
    options: [
      'A 2-pole alternator spinning at 3000 rpm, or a 4-pole alternator at 1500 rpm, etc.',
      'They prove the circuit between two test points, confirming complete circuit',
      'After completing full GS38 procedure and posting warning notices',
      'To check if the wearer can detect the test aerosol through the facepiece, indicating a leak',
    ],
    correctAnswer: 0,
    explanation:
      'f = (poles × rpm) / 120. A 2-pole machine at 3000 rpm gives 50 Hz. A 4-pole at 1500 rpm gives 50 Hz. The grid keeps it within ±1% by balancing generation and demand in real time.',
  },
];

const faqs = [
  {
    question: 'Why does a coil that just sits there give nothing — even in a strong field?',
    answer:
      'No movement = no change in flux = no EMF. Faraday is brutal about this: the field can be a thousand tesla, but if the flux through the coil isn’t changing, the induced voltage is zero. That’s why every generator needs something mechanical to keep the coil moving — water through a turbine, steam through a blade, wind through a propeller. Stop the rotation and the lights go out, no matter how many magnets are in the building.',
  },
  {
    question: 'What’s the difference between a slip ring and a commutator?',
    answer:
      'A slip ring is a continuous metal ring — each end of the coil is permanently connected to its own ring. The brush always touches the same end, so the AC waveform comes out unchanged. A commutator is a split ring (or many segments) — it physically swaps the brush connection every half-turn. That swap flips the negative half of the AC waveform up to positive, giving you pulsating DC. So: slip rings = AC out, split-ring commutator = DC out. Same machine, different connections.',
  },
  {
    question:
      'Why does a real generator give such a clean sine wave when the coil is moving in a complicated 3D way?',
    answer:
      'Because the coil sides only cut the field component perpendicular to their motion, and that perpendicular component varies as sinθ. So even though the coil is doing a complex rotation, the bit that actually contributes to EMF is the smooth sin/cos pattern. The output IS a clean sine wave. Real machines add small distortions from the shape of the pole faces and the discrete coil placement, which is why power-station alternators are designed with skewed slots and graded pole faces — to keep the output as close to a perfect sine as possible.',
  },
  {
    question: 'How does a 3-phase alternator differ from a single-loop generator?',
    answer:
      'Three coils instead of one, spaced 120° apart around the rotor (or stator). As the rotor turns, each coil hits its peak EMF at a different moment — 120° of rotation apart. The three outputs are three sine waves of the same frequency and amplitude, each shifted by 120°. That’s how the National Grid generates and delivers three-phase electricity from each alternator. Same physics as single-loop, just three of them.',
  },
  {
    question: 'Where does the energy in the output actually come from?',
    answer:
      'From whatever is spinning the shaft. Lenz’s law guarantees the coil resists being turned — that resistance grows as you draw more current. So the engine, turbine or motor doing the spinning has to push HARDER to maintain rpm under load. The mechanical work done against that resistance is exactly what comes out as electrical energy at the terminals. Energy in (mechanical) = energy out (electrical, plus losses to heat and friction). Free energy isn’t on the menu.',
  },
  {
    question: 'Do I need to remember EMF = NBAω for the exam?',
    answer:
      'Yes — it’s the key equation for this section. Understand each letter: N is turns (more = bigger EMF), B is flux density of the field (stronger magnet = bigger EMF), A is coil cross-section (bigger area = bigger EMF), ω is angular velocity in radians per second (faster spin = bigger EMF). All four are linear — double any one of them and you double the peak voltage. This is the equation a generator designer uses to size every part of the machine.',
  },
];

export default function Sub5() {
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
            eyebrow="Module 2 · Section 5 · Subsection 5"
            title="The single-loop AC generator"
            description="A coil. Two magnets. A spinning shaft. That’s it. Every UK kilowatt-hour ever generated comes from this one trick — and the maths behind it falls out of Faraday’s law in three lines."
            tone="emerald"
          />

          <TLDR
            points={[
              'Spin a coil between two magnetic poles at a steady speed and the EMF that comes out is a sine wave. Same trick at every power station and every wind turbine.',
              'Peak EMF = N × B × A × ω. More turns, stronger magnet, bigger coil or faster spin all scale the voltage up linearly.',
              'Slip rings keep the AC as AC. A split-ring commutator turns the same machine into a DC generator. Same coil — just a different connection.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the construction of a single-loop AC generator (coil, magnets, slip rings, brushes, load).',
              'Explain why a coil rotating at constant speed in a uniform field produces a sine wave EMF.',
              'Apply EMF_peak = NBAω in worked calculations.',
              'Distinguish slip rings (AC output) from a split-ring commutator (DC output).',
              'Relate angular velocity ω to frequency f using ω = 2πf.',
              'Recognise the link between this idealised generator and real power-station alternators on the UK grid.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The whole UK grid in one diagram</ContentEyebrow>

          <ConceptBlock
            title="A spinning coil between two magnets — that’s the whole secret"
            plainEnglish="Take a single loop of wire. Mount it on a shaft so it can rotate. Put it between the N and S poles of a magnet. Spin the shaft. The voltage at the ends of the loop traces out a perfect sine wave. That’s an AC generator."
            onSite="Every alternator in every UK power station — coal, gas, nuclear, hydro, wind, diesel genset on a building site — is doing exactly this, just bigger and with more coils. The fundamental machine doesn’t change."
          >
            <p>
              Section 5 has built up to this. Sub3 showed you that a current creates a magnetic
              field. Sub4 showed you that a changing magnetic flux induces an EMF. Now we put
              the two together in the most useful machine ever built: take a coil, put it in a
              field, and rotate it. As the coil turns, the flux through it changes — and an EMF
              appears at its terminals.
            </p>
            <p>
              Spin it at a constant speed and the output is a clean sine wave that alternates
              direction once per revolution. Connect a load and current flows. That’s an
              alternator — the heart of every power station and the source of every joule of
              mains electricity in the UK.
            </p>
          </ConceptBlock>

          <ACGenerator />

          <SectionRule />

          <ContentEyebrow>What’s in the box</ContentEyebrow>

          <ConceptBlock
            title="Five parts — and that’s the lot"
            plainEnglish="A magnet to provide the field. A coil to be the conductor. A shaft to spin it. Slip rings + brushes to take the output off the moving coil. A load to use it. Five parts."
          >
            <p>The classic single-loop AC generator from your textbook has five components:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The magnetic field.</strong> A pair of permanent magnets (or, in real
                machines, electromagnet field windings) provides a steady field across the gap
                where the coil rotates. N pole one side, S pole the other.
              </li>
              <li>
                <strong>The coil (the rotor or armature).</strong> A rectangular loop of wire
                wound onto an iron core, free to rotate on a central shaft. Real machines have
                many turns to multiply the output.
              </li>
              <li>
                <strong>The shaft.</strong> Whatever is doing the spinning — a steam turbine,
                hydro turbine, wind turbine, diesel engine, hand crank — connects to this shaft
                and provides the mechanical input.
              </li>
              <li>
                <strong>Slip rings + brushes.</strong> Two metal rings, one connected to each end
                of the coil, rotating with the shaft. Stationary carbon brushes ride on the rings
                and carry the induced current out to the external circuit. (Use a split-ring
                commutator instead and you get DC out — same coil, different connection.)
              </li>
              <li>
                <strong>The external circuit (load).</strong> Whatever you’re powering — a lamp,
                a motor, the National Grid.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Why the output is a sine wave</ContentEyebrow>

          <ConceptBlock
            title="The geometry of a rotating coil produces a sine wave automatically"
            plainEnglish="As the coil turns, the angle between it and the field changes smoothly. The flux through it changes as the cosine of that angle. The rate of change — which IS the induced EMF — comes out as a sine wave."
            onSite="That’s why every domestic socket measures as a sine wave on a scope. It’s not a design choice. It’s the unavoidable consequence of spinning a coil through a uniform field at constant speed. You’d have to work hard to get anything other than a sine."
          >
            <p>
              Picture the coil at four positions through one revolution:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Position 1 (0°) — coil flat in the field, plane parallel to the field
                lines.</strong> Maximum flux is threading the coil. But at this exact instant the
                flux is at its peak and not yet changing — the rate of change dΦ/dt is zero. So
                the EMF is zero. Counterintuitive but correct.
              </li>
              <li>
                <strong>Position 2 (90°) — coil edge-on to the field, plane perpendicular to the
                field lines.</strong> No flux through it at all (the field passes parallel to the
                coil plane). But at this moment the flux is changing FASTEST — every degree of
                rotation makes a big difference. Maximum dΦ/dt → maximum EMF. This is the peak
                of your sine wave.
              </li>
              <li>
                <strong>Position 3 (180°) — coil flat again, but flipped over.</strong> Maximum
                flux through it again, but in the opposite direction. dΦ/dt is back to zero, EMF
                is back to zero.
              </li>
              <li>
                <strong>Position 4 (270°) — coil edge-on the other way.</strong> dΦ/dt is at its
                negative peak. EMF is at its negative peak.
              </li>
            </ul>
            <p>
              Plot the EMF against time as the coil rotates and you trace out a perfect sine
              wave. One revolution = one full cycle. Spin the coil twice per second and you’ve
              got a 2 Hz output. Spin it 50 times per second and you’ve got UK mains 50 Hz.
            </p>
          </ConceptBlock>

          <SineWave
            eyebrow="Output waveform — one revolution = one cycle"
            caption="Position 1 (flat, max flux) = zero EMF. Position 2 (edge-on, zero flux) = peak EMF. The cosine of the flux angle gives the sine of the EMF — that’s why you get a clean sinusoid out for free."
          />

          <ConceptBlock
            title="Counter-intuitive bit — EMF is ZERO when the coil sides look closest to the poles"
            plainEnglish="The moment the coil is sitting flat between the magnets — the position where it ‘looks’ most like it should be doing the most work — is the exact moment the EMF is zero."
          >
            <p>
              The maths quietly implies it (sin(0) = 0), but it’s the kind of thing nobody states
              out loud — and it’s the one thing that catches every apprentice the first time they
              meet a generator.
            </p>
            <p>
              When the coil sides are right next to the poles — looking ‘closest’ to the
              magnets, with the maximum number of field lines threading through the loop — the
              EMF is at its <strong>MINIMUM</strong>, not its maximum. The flux through the coil
              is highest at that instant, but it’s not <em>changing</em>. And Faraday only cares
              about <strong>change</strong>, not size.
            </p>
            <p>
              EMF only happens during change, not during size. Big static field = nothing. Tiny
              field that’s changing fast = plenty of voltage. That’s why a coil sitting still in
              the strongest magnet on Earth produces zero EMF — and a coil moving through a weak
              field at speed produces real, useful voltage. The peak of the output sine wave
              lives at the position the coil ‘looks’ least productive: edge-on, with no flux
              through it but the rate of change at its absolute maximum.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Faraday's law applied to a rotating coil — derivation"
            clause="For a coil of N turns and area A rotating with angular velocity ω in a uniform field B, the flux is Φ(t) = BA cos(ωt). Differentiating gives the induced EMF: e(t) = NBAω sin(ωt). Peak EMF therefore equals NBAω."
            meaning={
              <>
                Sub4’s Faraday’s law plus a bit of school maths gets you the equation that runs
                every power station in the UK: <strong>EMF_peak = N × B × A × ω</strong>. You
                don’t need to do the calculus on the exam — but the formula and what each letter
                means is fair game and likely to come up.
              </>
            }
            cite="Source: Hughes Electrical Technology, 12th edition — Chapter 8 (electromagnetic induction)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The peak EMF equation</ContentEyebrow>

          <ConceptBlock
            title="EMF_peak = N × B × A × ω — four levers to control voltage"
            plainEnglish="Four things multiplied together give you the peak voltage. Increase any one and the output goes up in proportion."
            onSite="When a generator designer is trying to hit a 400 V phase voltage, this is the equation they’re working with. They pick N, A and B; the operating ω is set by the grid frequency. All four are at their disposal."
          >
            <p>The peak induced EMF in a rotating coil generator is:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EMF_peak = N × B × A × ω</strong>
              </li>
              <li>
                <strong>N</strong> = number of turns in the coil
              </li>
              <li>
                <strong>B</strong> = magnetic flux density (T)
              </li>
              <li>
                <strong>A</strong> = cross-sectional area of the coil (m²)
              </li>
              <li>
                <strong>ω</strong> = angular velocity (rad/s) — equal to 2π × f, where f is
                frequency in Hz
              </li>
            </ul>
            <p>
              Each variable scales the output linearly. Double any one and the peak voltage
              doubles. Halve any one and the voltage halves. That gives the designer four
              independent dials to tune.
            </p>
            <p>
              For UK 50 Hz generation, ω is fixed at 2π × 50 = 314 rad/s for a 2-pole machine.
              That’s why N, B and A are the variables left to play with — they decide how big
              and how heavy the alternator has to be to produce a given voltage.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Worked example — peak EMF of a typical machine">
            <p>A small AC generator has the following specification:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>N = 100 turns</li>
              <li>B = 0.5 T (the field across the air gap)</li>
              <li>A = 0.01 m² (100 cm²)</li>
              <li>ω = 314 rad/s (which is 2π × 50, so 50 Hz output)</li>
            </ul>
            <p>What’s the peak EMF at the terminals?</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EMF_peak = N × B × A × ω</strong>
              </li>
              <li>
                <strong>EMF_peak = 100 × 0.5 × 0.01 × 314</strong>
              </li>
              <li>
                <strong>EMF_peak = 157 V</strong>
              </li>
            </ul>
            <p>
              That’s the peak. The next subsection (Sub6) explains why we usually quote AC in
              RMS terms instead — and it works out that 157 V peak corresponds to about 111 V
              RMS, the kind of low-voltage output you’d find on a small portable genset before
              any step-up transformation.
            </p>
            <p>
              For the same machine, double the rotation speed (ω = 628 rad/s) and you get 314 V
              peak — but at 100 Hz instead of 50 Hz. That’s the trade-off: bigger voltage costs
              you frequency. To keep frequency fixed at 50 Hz while raising voltage, you’d have
              to add turns, increase B, or grow the coil area.
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

          <ContentEyebrow>Slip rings vs commutator — AC or DC</ContentEyebrow>

          <ConceptBlock
            title="The connection at the shaft decides whether you get AC or DC"
            plainEnglish="The coil itself produces an alternating EMF either way — that’s the physics. Whether you take it OFF as AC or DC depends on how the rings are split."
            onSite="Same machine, two output options. Real industrial generators almost always use slip rings (AC) because grid distribution wants AC. DC generators (with commutators) survive in specialist niches — battery chargers, traction motors run as generators during regen braking."
          >
            <p>
              <strong>Slip rings.</strong> Two continuous metal rings, one bonded to each end of
              the coil. They rotate with the shaft. Carbon brushes ride on the outside of the
              rings and connect to the load. Each brush always touches the same end of the coil
              — so when the coil reverses direction, the load sees the reversal too. Output =
              <strong> AC</strong>.
            </p>
            <p>
              <strong>Split-ring commutator.</strong> One ring, sawn in half. Each half is
              connected to one end of the coil — but the brushes are positioned so they swap
              which half they touch every half-revolution. The swap happens at the exact moment
              the coil EMF reverses, so the brush ends up always being connected to the
              "currently positive" side of the coil. Output = <strong>pulsating DC</strong>{' '}
              (always positive, but not flat). Add a smoothing capacitor or more coils at
              different angles and you get something close to flat DC.
            </p>
            <p>
              <strong>The same coil + same magnets + same rotation</strong> produces both AC and
              DC. The connection at the shaft is the only difference. That’s a useful thing to
              hold in your head: AC and DC machines are not separate species. They’re the same
              machine wired up two different ways.
            </p>
            <p>
              <strong>Look at the diagram below.</strong> DC version of the same machine — the
              split-ring commutator (the gapped ring at the shaft) is what physically swaps the
              brush connection every half-turn so the load only ever sees positive voltage. Wipe
              that ring off and replace it with two continuous slip rings and you’d be back to AC.
            </p>
          </ConceptBlock>

          <DCMotorSchematic />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>From single loop to UK grid</ContentEyebrow>

          <ConceptBlock
            title="Real alternators — many coils, many poles, three phases"
            plainEnglish="A power station alternator is a single-loop generator on steroids. Many turns per coil, many coils round the rotor, three sets of coils 120° apart for three-phase. Same physics."
            onSite="The huge alternator at a 1 GW gas-fired station and the 5 kVA portable on the back of your van work on identical principles. Different scale, different number of poles, same Faraday’s law."
          >
            <p>
              Real alternators are scaled-up, multi-coil versions of the single loop you’ve just
              met. A few practical refinements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Many turns per coil.</strong> The single loop in a textbook produces
                tiny voltages. Wrap a few hundred turns around an iron former and the output
                multiplies. Hundreds or thousands of turns per coil is normal.
              </li>
              <li>
                <strong>Three coils set 120° apart.</strong> Take three identical coils, space
                them evenly round the rotor, and you generate three sine waves of the same
                amplitude and frequency, each shifted by 120°. That’s exactly what UK three-phase
                supply is.
              </li>
              <li>
                <strong>Multiple pole pairs.</strong> Put two pairs of N-S poles round the stator
                instead of one and the coil sees a complete N-S-N-S cycle every half-rotation —
                so the output frequency is twice the rotational frequency. That’s the
                relationship: <strong>f = (poles × rpm) / 120</strong>.
              </li>
              <li>
                <strong>Field windings instead of permanent magnets.</strong> Instead of fixed
                magnets, real alternators use electromagnets fed from a small DC supply (called
                the "excitation"). Vary the excitation current and you can vary B — which gives
                you control over the output voltage.
              </li>
            </ul>
            <p>
              UK National Grid frequency is 50 Hz. To deliver that, every alternator on the grid
              has to spin at the right rpm for its number of poles: a 2-pole machine at 3000
              rpm, a 4-pole at 1500 rpm, a 6-pole at 1000 rpm, and so on. They’re all locked in
              electromagnetic step with each other through the grid itself — a property called
              "synchronisation".
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity Safety, Quality and Continuity Regulations (ESQCR) 2002, Regulation 27 (paraphrased)"
            clause="The frequency of the supply at the supply terminals shall not vary from the declared frequency by more than ±1 per cent unless agreed otherwise."
            meaning={
              <>
                That’s why every UK 50 Hz generator on the grid is held within ±0.5 Hz —{' '}
                <strong>49.5 Hz to 50.5 Hz</strong>. Push outside that and the DNO (Distribution
                Network Operator) is in breach of the law and has to disconnect customers.
                Underneath all the network engineering, this regulation is just enforcing that
                ω = 2π × 50 stays constant at every alternator across the country.
              </>
            }
            cite="Verbatim wording paraphrased — see ESQCR 2002 (Statutory Instrument 2002 No. 2665, as amended) Regulation 27 for the full text."
          />

          <SectionRule />

          <ContentEyebrow>Where the single-loop generator shows up on site</ContentEyebrow>

          <ConceptBlock
            title="Where the single-loop generator shows up on site — it’s the same machine, scaled"
            plainEnglish="The textbook single-loop drawing isn’t a museum piece. Your van’s alternator IS this machine. So is every power-station generator. Same physics, just more poles and a heavier rotor."
            onSite="Three places the single-loop diagram is doing real work right now:"
          >
            <p>
              Don’t let the simplicity of the single-loop drawing fool you — it’s not a teaching
              toy. It’s the same machine you’ll meet on site, just with more turns, more
              poles, and a beefier shaft. Three places it’s already working in kit you’ve seen:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The alternator on your van.</strong> A spinning rotor with field windings
                inside a stator with output coils, slip rings + brushes (or solid-state
                equivalents), driven by the engine via a belt. Same Sub5.4 induction, same Sub5.5
                rotation-makes-sine-wave geometry — just with three-phase windings, multiple pole
                pairs, and a built-in rectifier to deliver DC for the battery and electronics.
              </li>
              <li>
                <strong>Power-station generators.</strong> A coal, gas, nuclear, hydro or wind
                turbine spins a shaft. The shaft turns a rotor through field windings inside a
                stator. EMF appears at the stator terminals. The size of the alternator is
                terrifying — 1 GW machines stand two storeys tall — but the physics is identical
                to the bar-magnet-and-loop drawing earlier in this Sub.
              </li>
              <li>
                <strong>The site genset on the back of a van.</strong> A small diesel engine
                spinning a 5 to 20 kVA alternator. Slip rings on the rotor, brushes on the
                stator side, output filtered and regulated to give 230 V at 50 Hz. Same five
                parts (field, coil, shaft, rings + brushes, load) listed in the "What’s in the
                box" block above.
              </li>
            </ul>
            <p>
              The slip-ring vs commutator choice from earlier in this Sub is exactly what divides
              AC from DC machines in the wild — alternators on the grid use slip rings (AC out),
              old-school DC dynamos and brushed DC motors use a split-ring commutator. Both are
              sitting on Sub5.4’s induction. The next Sub (5.6) takes the sine wave you’ve just
              seen come out and analyses it as RMS, peak and frequency — which is how you put
              numbers on every measurement you’ll make on UK mains.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Optional deeper dive</ContentEyebrow>

          <VideoCard
            url={videos.acGenerator.url}
            title={videos.acGenerator.title}
            channel={videos.acGenerator.channel}
            duration={videos.acGenerator.duration}
            topic="AC electrical generator basics · Unit 202 LO5.4"
            caption="Optional. The Engineering Mindset shows the rotation-to-sine-wave conversion in animation. Worth five minutes if the maths in this subsection feels abstract — it makes EMF = NBAω click into place."
          />

          <SectionRule />

          <CommonMistake
            title="Thinking the EMF is biggest when the coil sits flat in the field"
            whatHappens={
              <>
                It feels intuitive: when the coil is flat to the field, the maximum number of
                field lines pass through it. So that must be when the EMF is biggest, right?
                Wrong — that’s when the FLUX is biggest, but Faraday cares about the{' '}
                <em>rate of change</em> of flux, not the flux itself. At flat-on, the flux is at
                a momentary maximum and isn’t changing at all. EMF = zero.
              </>
            }
            doInstead={
              <>
                Remember: EMF is biggest when the coil is <strong>edge-on to the field</strong>{' '}
                (its plane parallel to the field). At that moment the coil sides are sweeping
                across the field lines as fast as possible — maximum dΦ/dt → maximum EMF. The
                coil cuts through field lines fastest when it’s passing through "edge-on", not
                "face-on". Burn that in.
              </>
            }
          />

          <Scenario
            title="Where does the 50 Hz actually come from?"
            situation={
              <>
                A new apprentice on the job asks why UK mains is exactly 50 Hz. "Did someone just
                pick that number? Why not 60 Hz like the Americans?" What do you tell her?
              </>
            }
            whatToDo={
              <>
                Two parts. The CHOICE of 50 Hz over 60 Hz was a historical/political decision
                made when the UK grid was being built in the 1920s — it’s arbitrary, the same
                way left-hand-drive vs right-hand-drive is. But the way 50 Hz is actually
                PRODUCED today is a direct consequence of EMF = NBAω. Every alternator on the
                grid is mechanically locked to the grid frequency: a 2-pole machine spinning at
                3000 rpm, a 4-pole at 1500 rpm. Spin them faster and the grid frequency rises;
                slow them down and it drops. The grid operator (NESO) maintains 50 Hz to within
                ±1% by constantly balancing how much fuel goes into the generators against how
                much load is being drawn at any instant. It’s 50 Hz because we collectively spin
                every generator on the island at the right speed to make it so.
              </>
            }
            whyItMatters={
              <>
                Knowing that frequency comes from rotational speed means you understand why a
                site genset has to be carefully synchronised before it can be paralleled with the
                grid (frequency, phase angle, voltage all matched), and why a 60 Hz American
                appliance won’t run properly off UK 50 Hz mains (motors run slower, transformers
                heat up). All of it traces back to ω = 2πf in this subsection.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A coil rotating at steady speed in a uniform magnetic field produces a sine-wave EMF — every time, automatically.',
              'EMF is zero when the coil is flat in the field (max flux, no change). EMF is maximum when the coil is edge-on to the field (zero flux, fastest change).',
              'Peak EMF = N × B × A × ω. Linear in all four — double any one, double the voltage.',
              'Slip rings keep the alternating output as AC. A split-ring commutator on the same machine flips it to pulsating DC.',
              'Angular velocity ω = 2πf. UK 50 Hz mains = 314 rad/s at the alternator.',
              'Real alternators add many turns, many poles, three coils at 120° (for three-phase) and electromagnet field windings — but the underlying physics is exactly the single-loop generator you’ve just walked through.',
            ]}
          />

          <Quiz title="The single-loop AC generator — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.4 Electromagnetic induction and EMF
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.6 Sine waves — peak, RMS, frequency
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
