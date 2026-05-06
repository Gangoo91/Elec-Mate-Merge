/**
 * Module 3 · Section 2 · Subsection 3 — Magnetism, electromagnetism and EMF generation (AC 2.1)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.1
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 5.1, 5.2
 *   AC 5.1 — "magnetic effects of electrical currents"
 *   AC 5.2 — "basic principles of generating an A.C. supply"
 *
 * Magnetic fields, Fleming's hand rules, and how moving a conductor through a field
 * generates EMF. The physics behind every motor, generator and transformer.
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
  VideoList,
} from '@/components/study-centre/learning';
import { BarMagnet, SolenoidField, RightHandGripRule, FlemingsLeftHandRule, FlemingsRightHandRule, ACGenerator } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Magnetism and EMF generation | Level 3 Module 3.2.3 | Elec-Mate';
const DESCRIPTION =
  "Magnetic fields around conductors and coils, Fleming's left- and right-hand rules, and how a rotating loop in a field produces sinusoidal EMF.";

const checks = [
  {
    id: 'l3-m3-2-3-grip',
    question:
      "Right-hand grip rule: thumb points in the direction of conventional current. Fingers curl in the direction of:",
    options: ['The voltage', 'The magnetic field', 'The force on the conductor', 'The induced EMF'],
    correctIndex: 1,
    explanation:
      'Grip the conductor with the right hand, thumb in the direction of conventional current flow. Fingers curl around the conductor showing the direction of the magnetic field lines.',
  },
  {
    id: 'l3-m3-2-3-fleming-l',
    question:
      "Fleming's left-hand rule applies to:",
    options: ['Generators', 'Motors', 'Transformers', 'Induction'],
    correctIndex: 1,
    explanation:
      "FBI for the LEFT hand: First finger = field, seCond = current, thumB = motion (force). Used for MOTORS where current in a field produces motion.",
  },
  {
    id: 'l3-m3-2-3-emf',
    question:
      'A coil of 200 turns has flux changing at 0.05 Wb/s. Induced EMF magnitude:',
    options: ['0.25 V', '4 V', '10 V', '100 V'],
    correctIndex: 2,
    explanation:
      "Faraday's law: |EMF| = N × dΦ/dt = 200 × 0.05 = 10 V.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Magnetic flux is measured in:',
    options: ['Tesla', 'Weber', 'Henry', 'Coulomb'],
    correctAnswer: 1,
    explanation: 'Weber (Wb) is total flux. Tesla (T) is flux density (Wb/m²).',
  },
  {
    id: 2,
    question: 'Like magnetic poles:',
    options: ['Attract', 'Repel', 'No effect', 'Cancel out'],
    correctAnswer: 1,
    explanation: 'Like poles repel; unlike poles attract. Same as charges in electrostatics.',
  },
  {
    id: 3,
    question: "Fleming's right-hand rule applies to:",
    options: ['Motors', 'Generators (induced EMF)', 'Transformers', 'Capacitors'],
    correctAnswer: 1,
    explanation:
      "Right hand for generators: First finger = field, seCond finger = current direction (induced), thumB = motion. The CAUSE of the EMF is the motion.",
  },
  {
    id: 4,
    question: "What does Faraday's law state?",
    options: [
      'Force = current × field × length',
      'Induced EMF is proportional to the rate of change of flux linkage',
      'Magnetic field is perpendicular to current',
      'Resistance changes with temperature',
    ],
    correctAnswer: 1,
    explanation:
      "EMF = −N × dΦ/dt. The faster the flux changes, and the more turns, the bigger the EMF. The minus sign is Lenz's law (the EMF opposes the change).",
  },
  {
    id: 5,
    question:
      "Lenz's law states the direction of induced EMF is such that:",
    options: [
      'It increases the flux change',
      'It opposes the change in flux that produced it',
      "It's always positive",
      "It's perpendicular to the field",
    ],
    correctAnswer: 1,
    explanation:
      'Lenz: the induced EMF drives current in a direction whose magnetic effect opposes the original flux change. Conservation of energy in disguise.',
  },
  {
    id: 6,
    question: 'A solenoid produces a magnetic field that:',
    options: [
      'Spirals around the wires',
      'Resembles a bar magnet, with north and south poles at the ends',
      'Is uniform in all directions',
      'Has no defined poles',
    ],
    correctAnswer: 1,
    explanation:
      'The solenoid concentrates the field along its axis, with field lines emerging from one end (N) and entering the other (S) — same external-field shape as a bar magnet.',
  },
  {
    id: 7,
    question:
      'A simple loop generator rotates in a magnetic field. The output waveform is:',
    options: ['Square wave', 'Triangular', 'Sinusoidal', 'DC'],
    correctAnswer: 2,
    explanation:
      'As the loop rotates, the rate of flux cutting varies as sin(θ), so the induced EMF is a sine wave. A 50 Hz alternator turns this into the UK 230 V mains.',
  },
  {
    id: 8,
    question:
      'A 4-pole alternator running at 1500 rev/min produces what frequency?',
    options: ['25 Hz', '50 Hz', '100 Hz', '200 Hz'],
    correctAnswer: 1,
    explanation:
      'f = (P × N) / 120 where P = number of poles, N = rev/min. f = (4 × 1500) / 120 = 50 Hz. (Equivalently: each pole pair makes one cycle per rev; 1500/60 × 2 = 50.)',
  },
];

const faqs = [
  {
    question: 'How is a magnetic field actually different from an electric field?',
    answer:
      "Both are part of electromagnetism. Electric fields surround stationary charges; magnetic fields surround MOVING charges (current). Maxwell's equations show they're two faces of the same thing — and that's why a changing magnetic field induces an electric field (and vice versa). Transformers and motors are built on that.",
  },
  {
    question: 'Why does conventional current flow opposite to electron flow?',
    answer:
      "Historical accident. Benjamin Franklin guessed (wrong) that current flowed from + to −, and the convention stuck before electrons were discovered to actually flow − to +. We use 'conventional current' (+ to −) for all engineering work to keep formulas consistent.",
  },
  {
    question: 'Do I really need both Fleming hand rules?',
    answer:
      "Yes. Left for motors (current creates motion), right for generators (motion creates current). Same hand on both rules would have you spinning the wrong way half the time. Memorise them as a pair: F-B-I, motors LEFT, generators RIGHT.",
  },
  {
    question: 'Why does the Earth have a magnetic field?',
    answer:
      "Convection currents in the molten iron core generate it. Important practically because it's why a compass works — and it's also why steel structures slowly magnetise themselves. The Earth's field is around 25-65 μT — tiny compared with a transformer core (1.5 T).",
  },
  {
    question: "What's saturation in a magnetic core?",
    answer:
      "Above a certain flux density (~1.7 T for grain-oriented silicon steel), the iron can't accommodate any more flux — adding more current barely increases B. Saturation causes harmonic distortion in transformers and is what limits maximum operating flux. You'll meet it again in §4.",
  },
  {
    question: 'Why do we use silicon steel for transformer cores?',
    answer:
      "Adding ~3% silicon to iron raises the resistivity (cuts eddy-current losses) and reduces the area of the hysteresis loop (cuts hysteresis losses). The result is much more efficient than plain iron, especially at 50 Hz. Sub 4.4 covers this in detail.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 3"
            title="Magnetism, electromagnetism and EMF generation"
            description="Magnetic fields around conductors. Fleming's hand rules. Faraday's law. The physics behind every motor, generator and transformer."
            tone="yellow"
          />

          <TLDR
            points={[
              'A current produces a magnetic field around the conductor (right-hand grip rule).',
              "Force on a current-carrying conductor in a field: Fleming's LEFT-hand rule (motor effect).",
              "Induced EMF when a conductor moves in a field: Fleming's RIGHT-hand rule (generator effect).",
              "Faraday's law: EMF = N × (dΦ/dt). Lenz's law sets the polarity (always opposes the change).",
              'A loop rotating in a uniform field produces sinusoidal EMF — the basis of all AC generators.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain how a current produces a magnetic field and apply the right-hand grip rule.',
              "Use Fleming's left-hand rule to determine force direction on a current-carrying conductor.",
              "Use Fleming's right-hand rule to determine induced EMF direction in a moving conductor.",
              "State Faraday's law and Lenz's law and use them to calculate induced EMF.",
              'Explain how rotating-coil generators produce sinusoidal AC.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Magnetic fields and conductors</ContentEyebrow>

          <ConceptBlock
            title="Every current creates a magnetic field"
            plainEnglish="When current flows in a wire, a circular magnetic field forms around it. Reverse the current and the field reverses direction. Bend the wire into a coil and the fields add up — making the coil look like a bar magnet."
            onSite="A clamp meter relies on this. The wire's magnetic field is sensed by the jaws and converted to a current reading without breaking the conductor."
          >
            <p>
              <strong>Right-hand grip rule:</strong> point the right thumb in the direction of
              conventional current. The fingers curl in the direction of the magnetic field lines
              around the conductor.
            </p>
            <p>
              For a single straight wire, the field is concentric circles around it, weakening
              with distance (B ∝ 1/r). For a coil (solenoid), the field is concentrated along the
              axis, with N and S poles at the ends.
            </p>
          </ConceptBlock>

          <BarMagnet />
          <RightHandGripRule />
          <SolenoidField />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Force and motion — Fleming's hands</ContentEyebrow>

          <ConceptBlock
            title="Left hand for motors, right hand for generators"
            plainEnglish="A current-carrying conductor in a magnetic field feels a force. The direction is given by Fleming\'s LEFT-hand rule (FBI). A conductor moving through a field induces an EMF — direction by Fleming\'s RIGHT-hand rule. Same fingers, different hand."
          >
            <p>
              <strong>Left-hand rule (motors):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>F (First finger) = magnetic Field direction (N to S)</li>
              <li>B (seCond finger) = current direction (Conventional, + to −)</li>
              <li>I (thumB) = motion / force direction</li>
            </ul>
            <p>
              <strong>Right-hand rule (generators):</strong> same finger assignments, but you\'ve
              applied the motion (thumb) and the rule tells you which way the induced current
              flows. The hand simply reflects cause-and-effect.
            </p>
          </ConceptBlock>

          <FlemingsLeftHandRule />
          <FlemingsRightHandRule />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Faraday and Lenz — induction laws</ContentEyebrow>

          <ConceptBlock
            title="EMF is generated when flux through a coil changes"
            plainEnglish="Faraday\'s law: the EMF induced in a coil equals the number of turns times the rate of change of magnetic flux through the coil. Lenz\'s law: the induced EMF drives a current whose magnetic effect opposes the original change."
            onSite="In a transformer, the primary\'s alternating flux changes 100 times a second (50 Hz, two zero-crossings per cycle), inducing an EMF in the secondary. More turns on the secondary = more induced EMF — that\'s how the ratio sets the output voltage."
          >
            <p>
              <strong>EMF = −N × (dΦ / dt)</strong>
            </p>
            <p>Where:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>N = number of turns in the coil</li>
              <li>dΦ/dt = rate of change of magnetic flux (Wb/s = V)</li>
              <li>Negative sign = Lenz\'s law (induced EMF opposes the cause)</li>
            </ul>
            <p>
              Worked example: a 500-turn coil sees flux changing from 0 to 0.02 Wb in 0.1 s.
              Average EMF = 500 × (0.02 / 0.1) = 500 × 0.2 = 100 V.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>The AC generator</ContentEyebrow>

          <ConceptBlock
            title="A rotating loop in a uniform field produces a sine wave"
            plainEnglish="Imagine a rectangular loop spinning on an axis between the N and S poles of a magnet. As it rotates, the rate at which it cuts flux varies as sin(θ). The induced EMF therefore varies sinusoidally with time."
          >
            <p>
              When the loop is parallel to the field (θ = 0°), the conductors move along the
              field lines — no cutting, EMF = 0. When perpendicular (θ = 90°), they move across
              the field at maximum rate — EMF peaks.
            </p>
            <p>
              <strong>e(t) = E<sub>peak</sub> × sin(ωt)</strong>
            </p>
            <p>
              Where ω = 2πf (radians per second) and E<sub>peak</sub> = N × B × A × ω (peak EMF
              depends on turns, flux density, loop area and speed).
            </p>
          </ConceptBlock>

          <ACGenerator />

          <VideoCard
            url={videos.acBasics.url}
            title={videos.acBasics.title}
            channel={videos.acBasics.channel}
            duration={videos.acBasics.duration}
            topic={videos.acBasics.topic}
          />

          <VideoList
            title="Watch — generators and transformers from the same induction physics"
            videos={[
              {
                url: videos.acGenerator.url,
                title: videos.acGenerator.title,
                channel: videos.acGenerator.channel,
                duration: videos.acGenerator.duration,
                topic: 'Rotating loop in a field → sine-wave EMF',
              },
              {
                url: videos.transformers.url,
                title: videos.transformers.title,
                channel: videos.transformers.channel,
                duration: videos.transformers.duration,
                topic: 'Mutual inductance between two coils on a core',
              },
            ]}
          />

          <ConceptBlock
            title="Magnetic circuit — flux, MMF, reluctance"
            plainEnglish="A magnetic circuit is the loop that flux follows around an iron core. It has the same Ohm's-Law structure as an electrical circuit: MMF (volts equivalent) drives flux (current equivalent) through reluctance (resistance equivalent)."
            onSite="In a transformer, the iron core is the magnetic circuit. Higher-permeability silicon steel = lower reluctance = more flux for the same MMF = lower magnetising current. That's why transformer cores use grain-oriented silicon steel, not mild steel."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MMF (F)</strong> = N × I (ampere-turns). The "voltage" of the magnetic circuit.</li>
              <li><strong>Flux (Φ)</strong> in webers. The "current" — what the MMF drives through the core.</li>
              <li><strong>Reluctance (S)</strong> = ℓ/(μ × A). Magnetic resistance — depends on core path length, area and permeability.</li>
              <li><strong>Magnetic Ohm's Law</strong>: F = Φ × S, so Φ = F/S = (N × I)/S.</li>
            </ul>
            <p>
              Worked example: a coil of N = 500 turns drives I = 0.5 A through a core with
              reluctance S = 5 × 10⁵ A·t/Wb. MMF = 500 × 0.5 = 250 A·t. Flux Φ = 250 / (5 × 10⁵)
              = 5 × 10⁻⁴ Wb = 0.5 mWb. If the core cross-section is 25 cm² = 2.5 × 10⁻³ m², flux
              density B = Φ/A = 5 × 10⁻⁴ / 2.5 × 10⁻³ = 0.2 T — well below the saturation limit
              (~1.7 T) for grain-oriented silicon steel.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Self-inductance and mutual inductance"
            plainEnglish="A coil's own changing current induces an EMF in itself — that's SELF-inductance L (henries). Two coils sharing a core: a changing current in one induces an EMF in the other — that's MUTUAL inductance M (henries). Mutual inductance is what transformers exploit."
          >
            <p>
              <strong>v_L = L × di/dt</strong> — voltage across an inductor depends on rate of
              current change.
              <br />
              <strong>v_2 = M × (di_1/dt)</strong> — voltage induced in coil 2 from current change
              in coil 1.
            </p>
            <p>
              For two perfectly coupled coils on the same core, M = √(L₁ × L₂). Real transformers
              have leakage flux, so M = k × √(L₁ × L₂) where k is the coupling coefficient (≤ 1,
              typically 0.95–0.99 for power transformers).
            </p>
            <p>
              Worked example: two coils with L₁ = 100 mH and L₂ = 25 mH, coupling k = 0.98.
              M = 0.98 × √(0.1 × 0.025) = 0.98 × √0.0025 = 0.98 × 0.05 = 0.049 H = 49 mH. A
              50 Hz, 1 A current change at di/dt = 314 A/s in coil 1 induces v₂ = 0.049 × 314 ≈
              15.4 V in coil 2.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Frequency from poles and speed"
            plainEnglish="A synchronous generator\'s frequency depends on how many magnetic poles it has and how fast it spins. UK mains is 50 Hz — set by the rev/min of the alternators in every power station."
          >
            <p>
              <strong>f = (P × N) / 120</strong>
            </p>
            <p>
              P = number of poles (always even); N = rev/min.
            </p>
            <p>
              For 50 Hz: a 2-pole machine spins at 3000 rev/min; a 4-pole at 1500 rev/min; a
              6-pole at 1000 rev/min. Synchronous motors at L3 work the same way in reverse —
              you\'ll meet them in §5.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase EMF — three sine waves 120° apart"
            plainEnglish="A 3-phase alternator has three sets of windings spaced 120° around the rotor. As the magnetic field sweeps past, each winding generates a sinusoidal EMF — but offset 120° from its neighbours. The result is three identical sine waves, each peaking one-third of a cycle later than the previous."
            onSite="UK 3-phase 400 V supply: each line conductor carries 230 V (RMS) to neutral, but the line-to-line voltage is 400 V because the two phases are 120° apart. The √3 factor (≈ 1.732) is the geometry: V_line = √3 × V_phase. 230 × 1.732 = 398.4 V ≈ 400 V."
          >
            <p>
              The three EMFs at any instant t (with f = 50 Hz, ω = 314.16 rad/s):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>e_L1(t) = E_peak × sin(ωt)</li>
              <li>e_L2(t) = E_peak × sin(ωt − 120°)</li>
              <li>e_L3(t) = E_peak × sin(ωt − 240°) = E_peak × sin(ωt + 120°)</li>
            </ul>
            <p>
              At any instant the three EMFs sum to zero (geometric property of three vectors at
              120°) — which is why a balanced 3-phase load has no neutral current. Unbalanced
              loads (different currents per phase) put the difference into the neutral. Single-
              phase loads spread across the three phases keep the neutral close to zero.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50160:2010+A3:2019 — Voltage characteristics of public distribution networks"
            clause="Under normal operating conditions the supply voltage frequency shall be 50 Hz with a tolerance of ±1 % during 99.5 % of a year."
            meaning={
              <>
                The whole UK national grid is locked to 50 Hz within tight tolerance. Every
                rotating machine connected to the grid must run at a multiple of 50 Hz divided by
                its pole pairs. The frequency is the result of millions of generators acting in
                synchrony — and is the reference for every clock and motor connected to mains.
              </>
            }
            cite="Source: BS EN 50160:2010+A3:2019."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 521.5.1 (Ferromagnetic enclosures)"
            clause="The conductors of an AC circuit installed in a ferromagnetic enclosure shall be arranged so that all line conductors and the neutral conductor, if any, and the appropriate protective conductor are contained within the same enclosure. Where such conductors enter a ferrous enclosure, they shall be arranged such that the conductors are only collectively surrounded by ferromagnetic material."
            meaning={
              <>
                Faraday's law in regulation form. A single line conductor through a ferrous gland
                plate sets up an induced AC flux loop in the steel that heats the plate and can
                trip a ZS reading high. Bring all line/neutral/CPC conductors through the same
                hole — net flux cancels and the steel stays cool. This is why steel SWA glands
                accept all cores together and why singles in steel conduit must run as a complete
                circuit set.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 521.5.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 521.5.2 (Single-core armoured AC)"
            clause="Single-core cables armoured with steel wire or steel tape shall not be used for an AC circuit."
            meaning={
              <>
                A single-core SWA carrying AC sets up an alternating flux in its own steel armour
                — eddy-current losses heat the armour and the cable de-rates massively. Three- or
                four-core SWA is permitted because the line and neutral fluxes cancel inside the
                armour. For single-core AC runs use aluminium-armoured cable or unarmoured singles
                in non-magnetic enclosures.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 521.5.2."
          />

          <SectionRule />

          <CommonMistake
            title="Mixing up left and right hand rules"
            whatHappens={
              <>
                Apprentice working out which way a motor will rotate uses the right hand by
                habit. Predicts forward; the motor spins backward. Reverses the supply, motor
                still spins backward (because the rule was wrong, not the wiring). Wastes an
                hour fault-finding what is actually correct wiring.
              </>
            }
            doInstead={
              <>
                LEFT hand for MOTORS (you provide current, the field does work, you get motion).
                RIGHT hand for GENERATORS (you provide motion, the field does work, you get
                current). Mnemonic: LEFT for L for "Load" (motor drives a load); RIGHT for R for
                "Rotate" (you\'re rotating the generator).
              </>
            }
          />

          <Scenario
            title="Wiring a 3-phase induction motor for the right rotation"
            situation={
              <>
                Customer\'s pump motor needs to spin clockwise viewed from the shaft end. You\'ve
                connected L1, L2, L3 — motor spins anticlockwise. How do you reverse it without
                tearing the wiring apart?
              </>
            }
            whatToDo={
              <>
                Swap any two of the three line connections. The phase rotation reverses, the
                rotating magnetic field reverses, and so does the rotor. (Don\'t touch the
                neutral or earth.) Most contactors and isolators have phase-rotation labels —
                always check rotation BEFORE coupling to the load.
              </>
            }
            whyItMatters={
              <>
                Wrong rotation on a centrifugal pump just gives no flow. Wrong rotation on a
                positive-displacement pump can hydraulic-lock and damage seals. The
                magnetism-and-Fleming reasoning behind why swapping two phases reverses rotation
                is the L3 understanding the AM2 will test.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Right-hand grip rule: thumb = current, fingers curl = magnetic field around the conductor.',
              "Fleming's LEFT hand for motors: F (field), B (current), I (motion). Current in field = force.",
              "Fleming's RIGHT hand for generators: motion in field = induced EMF.",
              "Faraday: EMF = N × dΦ/dt. Lenz: polarity opposes the change that caused it.",
              'A rotating loop in a uniform field generates sinusoidal EMF — the basis of all AC.',
              'f = P×N/120 for synchronous machines. UK 50 Hz: 2-pole at 3000 rev/min, 4-pole at 1500.',
            ]}
          />

          <Quiz title="Magnetism and EMF knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.2 Resistance and DC circuits
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Sine wave — RMS, peak, frequency
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
