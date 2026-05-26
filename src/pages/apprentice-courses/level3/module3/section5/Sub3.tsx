/**
 * Module 3 · Section 5 · Subsection 3 — Three-phase induction motors, slip and torque
 * Maps to C&G 2365-03 / Unit 302 / LO3 / AC 3.2, 3.3
 *   AC 3.2 — "describe the operating principles of AC motors"
 *   AC 3.3 — "state the basic types, applications and limitations of AC motors"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 8.2, 8.3
 *
 * N_s = 120f/P. Slip s = (N_s − N) / N_s. Squirrel-cage and wound-rotor motors. Torque-speed
 * curves and starting current. BS 7671 §552 motor circuits + protection sizing.
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
import { ThreePhaseWave, MotorEffect } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Three-phase induction motors, slip and torque | Level 3 Module 3.5.3 (AC 3.2, 3.3) | Elec-Mate';
const DESCRIPTION =
  'N_s = 120f/P. Slip s = (N_s − N) / N_s. Squirrel-cage and wound-rotor motors. Torque-speed curves and starting current per BS 7671 §552.';

const checks = [
  {
    id: 'l3-m3-5-3-ns',
    question: 'A 4-pole 50 Hz induction motor synchronous speed:',
    options: [
      '750 rpm',
      '6000 rpm',
      '3000 rpm',
      '1500 rpm',
    ],
    correctIndex: 3,
    explanation: 'N_s = 120f/P = 120 × 50 / 4 = 1500 rpm.',
  },
  {
    id: 'l3-m3-5-3-slip',
    question: 'Same motor running at 1440 rpm. Slip is:',
    options: [
      '1 %',
      '40 %',
      '4 %',
      '60 %',
    ],
    correctIndex: 2,
    explanation:
      's = (N_s − N) / N_s = (1500 − 1440) / 1500 = 60/1500 = 0.04 = 4 %. Typical full-load slip for an induction motor.',
  },
  {
    id: 'l3-m3-5-3-start',
    question: 'A direct-on-line (DOL) starting current is approximately:',
    options: [
      '5-7× full-load current',
      '20× full-load current',
      'Same as full-load current',
      '2-3× full-load current',
    ],
    correctIndex: 0,
    explanation:
      'DOL inrush is typically 5-7× full-load (FLA). Type C or D MCBs needed; soft-starters or VFDs cut this dramatically.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Synchronous speed N_s formula:',
    options: [
      '120/P × f',
      '120 × f / P',
      'P × f',
      'f / P',
    ],
    correctAnswer: 1,
    explanation:
      'N_s (rpm) = 120 × frequency / number of poles. UK 50 Hz, 2 poles → 3000 rpm; 4 poles → 1500; 6 poles → 1000.',
  },
  {
    id: 2,
    question: 'An induction motor must run BELOW synchronous speed because:',
    options: [
      "Yes, if they result from work activity and require hospital treatment",
      "That they are properly located, secured, free from damage and that trapdoors function correctly",
      "Without slip there's no relative motion → no induced EMF in the rotor → no torque",
      "Self-contained breathing apparatus (SCBA) in positive pressure mode",
    ],
    correctAnswer: 2,
    explanation:
      'Induction motor rotor needs to LAG the rotating field. The slip creates relative motion, induces rotor EMF, which drives rotor current, which creates rotor field, which interacts with stator field for torque.',
  },
  {
    id: 3,
    question: 'Squirrel-cage rotor:',
    options: [
      'DECs measure actual energy use, EPCs assess theoretical performance',
      'Organisational — the commissioning procedure was incomplete',
      'Radio, mobile phone, visual signals, and audible signals such as a whistle or horn',
      'Has solid bars short-circuited at the ends — no electrical connection to the outside',
    ],
    correctAnswer: 3,
    explanation:
      'Cage rotor: aluminium or copper bars cast into the rotor laminations, all short-circuited by end rings. Simple, robust, almost no maintenance. The standard 3-phase motor type.',
  },
  {
    id: 4,
    question: 'Wound-rotor motor uses:',
    options: [
      'Three-phase windings on the rotor brought out via slip rings to external resistance',
      'To prove that the holder has the required training and qualifications for their occupation',
      'To ensure illumination from both directions regardless of which end occupants enter from',
      'Maximum demand, load type, power factor, and growth expectations',
    ],
    correctAnswer: 0,
    explanation:
      'Wound rotor allows external resistance to be inserted in the rotor circuit during starting. Smooth start, low inrush, controllable torque. Used for cranes, hoists, large pumps.',
  },
  {
    id: 5,
    question: 'A 4-pole motor at 50 Hz, with slip 5 %, runs at:',
    options: [
      '1500 rpm',
      '1425 rpm',
      '1500 × 1.05 rpm',
      '1575 rpm',
    ],
    correctAnswer: 1,
    explanation: 'N = N_s × (1 − s) = 1500 × 0.95 = 1425 rpm.',
  },
  {
    id: 6,
    question: 'Maximum (pull-out) torque of an induction motor occurs at:',
    options: [
      'Based on cable manufacturer\\\\\\\\\\\\\\\'s specifications',
      'Safety level for electrical environments',
      'Slip ~15-20 % (depends on rotor R)',
      'Fundamental principles of design',
    ],
    correctAnswer: 2,
    explanation:
      'Pull-out (breakdown) torque happens at higher slip than rated. Beyond pull-out, more load → more slip → less torque → motor stalls.',
  },
  {
    id: 7,
    question: 'Increasing rotor resistance (wound-rotor):',
    options: [
      'Minor Electrical Installation Works Certificate (MEIWC)',
      'Wind speed monitoring, precipitation alerts, temperature limits, and lightning detection',
      'Document as non-compliance and specify corrective actions',
      'Shifts maximum torque to higher slip — useful for high starting torque',
    ],
    correctAnswer: 3,
    explanation:
      'Higher rotor R moves the torque-speed curve to lower speed. At zero speed (locked rotor), more rotor R = more starting torque. Then resistance is shorted out as motor runs up.',
  },
  {
    id: 8,
    question: 'Slip frequency in the rotor at full load:',
    options: [
      '2 Hz',
      '0 Hz',
      '50 Hz',
      '5 Hz',
    ],
    correctAnswer: 0,
    explanation:
      'f_rotor = s × f. With s = 4 %: f_rotor = 0.04 × 50 = 2 Hz. At standstill (s = 1) it equals supply frequency; near synchronous it approaches zero.',
  },
];

const faqs = [
  {
    question: 'Why is a 3-phase induction motor so popular?',
    answer:
      'Robust (no brushes), efficient (85-95 % at full load), self-starting (3-phase produces a rotating field automatically), cheap, long life. The default motor for any 3-phase application from 0.37 kW upwards.',
  },
  {
    question: 'What is the difference between squirrel-cage and wound-rotor?',
    answer:
      'Cage = simple bars, no electrical access. Cheap, fixed performance. Wound = real windings on rotor, brought out via slip rings. Allows external resistance for start control. Cage dominates today; wound-rotor used in specialty large drives.',
  },
  {
    question: 'Why does the motor draw 5-7× FLA on starting?',
    answer:
      'At standstill, rotor sees full slip (s = 1). Rotor reactance is X_r = sX → high; rotor impedance is roughly resistance only (low). High induced EMF + low impedance = huge rotor current. Stator must supply equivalent → inrush.',
  },
  {
    question: 'How do you reduce starting current?',
    answer:
      'Star-delta (run-up in star at √3× lower V, switch to delta at full speed) — cuts inrush by ~3×. Soft-starter (gradually ramps voltage) — smooth run-up, lower inrush. VFD (frequency ramp from low f) — best of all, no inrush, controlled acceleration.',
  },
  {
    question: 'What is "pull-out" torque?',
    answer:
      'Maximum torque the motor can produce. Occurs at slip ~15-25 % (depending on rotor design). Beyond this slip, torque DECREASES with more slip — and the motor stalls into the locked-rotor condition. Choose motor so pull-out is at least 1.6× the highest expected load.',
  },
  {
    question: 'Why does motor speed barely change between no-load and full-load?',
    answer:
      'Slip changes from ~0 % (no-load) to ~4 % (full-load) on a typical induction motor. Speed drops from 1500 to 1440 rpm — only 4 %. Hence "constant-speed" reputation. But torque-speed curve is sharply linear in this range.',
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
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 3"
            title="Three-phase induction motors, slip and torque"
            description="N_s = 120f/P. Slip = (N_s − N) / N_s. Squirrel-cage and wound-rotor types. Torque-speed curves and starting current."
            tone="yellow"
          />

          <TLDR
            points={[
              'Synchronous speed N_s = 120 × f / P (rpm). UK 50 Hz: 2-pole → 3000 rpm, 4-pole → 1500 rpm.',
              'Slip s = (N_s − N) / N_s. Typical full-load slip 2-5 %.',
              'Squirrel-cage = bars + end rings, no maintenance, cheap. Standard induction motor.',
              'Wound-rotor = slip rings + external R, controlled starting. Used for cranes, large pumps.',
              'DOL starting current = 5-7× FLA. Star-delta, soft-start, VFD all reduce this.',
              'BS 7671 §552 governs motor circuit protection and starting; Type C MCB minimum on DOL.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate synchronous speed from frequency and number of poles.',
              'Calculate slip from synchronous and actual rotor speed.',
              'Distinguish squirrel-cage and wound-rotor induction motors.',
              'Identify why starting current is 5-7× FLA on DOL start.',
              'Sketch and interpret a torque-speed curve for an induction motor.',
              'Read a three-phase motor nameplate and use it to size cable, MCB and overload.',
            ]}
            initialVisibleCount={3}
          />

          <ThreePhaseWave />

          <ContentEyebrow>Synchronous speed and slip</ContentEyebrow>

          <ConceptBlock
            title="The rotating field spins at N_s; the rotor lags by slip"
            plainEnglish="Three-phase stator currents create a magnetic field that rotates at N_s rpm. The rotor follows but always slightly slower — that 'slip' is what induces rotor current and creates torque."
          >
            <p>
              <strong>N_s = 120f / P</strong> (rpm), where P = number of poles (always even). For
              50 Hz UK supply:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2-pole: N_s = 3000 rpm. Full-load N ≈ 2900.</li>
              <li>4-pole: N_s = 1500 rpm. Full-load N ≈ 1440.</li>
              <li>6-pole: N_s = 1000 rpm. Full-load N ≈ 960.</li>
              <li>8-pole: N_s = 750 rpm. Full-load N ≈ 720.</li>
            </ul>
            <p>
              <strong>Slip s = (N_s − N) / N_s.</strong> Often expressed as a percentage. Typical
              full-load slip is 2–5 % on a well-designed motor.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <VideoCard
            url={videos.inductionMotor.url}
            title={videos.inductionMotor.title}
            channel={videos.inductionMotor.channel}
            duration={videos.inductionMotor.duration}
            topic="Three-phase induction motor — rotating field and slip"
            caption={
              <>
                The Engineering Mindset cuts through a squirrel-cage induction motor and animates
                the rotating stator field, the induced rotor currents and the slip that produces
                torque. Pairs directly with the N_s and slip equations above.
              </>
            }
          />

          <ConceptBlock
            title="Producing the rotating field — three currents, three windings, 120° apart"
            plainEnglish="Three identical stator windings, physically spaced 120° around the stator core, each carrying a sinusoidal current 120° apart in time. Add the three resulting magnetic fields vectorially at any instant and you get a single resultant field of constant magnitude that rotates smoothly around the stator at exactly N_s rpm. No commutation tricks needed — three-phase does it for free."
            onSite="This is why every commissioning where the pump or conveyor runs the wrong way gets fixed by swapping any two phases at the terminal box."
          >
            <p>
              This is the fundamental advantage of three-phase over single-phase. Mathematically:
              B_a(t) = B_max cos(ωt) along axis A; B_b(t) = B_max cos(ωt − 120°) along axis B (120°
              offset spatially); B_c(t) = B_max cos(ωt − 240°) along axis C. Sum these three
              vectors at every instant and the resultant is a vector of magnitude (3/2)B_max
              rotating at angular frequency ω. The field is genuinely rotating — not pulsating.
            </p>
            <p>
              <strong>Reverse the rotation:</strong> swap any two of the three line connections
              (e.g. L1 ↔ L2). The phase sequence becomes A-C-B instead of A-B-C, and the
              resultant rotates the other way. That's why every three-phase motor reverses by
              swapping any two phases at the terminal box.
            </p>
          </ConceptBlock>

          <MotorEffect />

          <SectionRule />

          <ContentEyebrow>Cage vs wound rotor</ContentEyebrow>

          <ConceptBlock
            title="Two construction types"
            plainEnglish="Cage = solid bars short-circuited internally. No electrical access. Wound = real 3-phase windings brought out via slip rings to external connections."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Squirrel-cage</strong> — aluminium or copper bars cast into rotor
                laminations, joined by end rings. Robust, almost no maintenance. Cheap.
                Performance fixed by design — can't adjust externally.
              </li>
              <li>
                <strong>Wound-rotor (slip-ring)</strong> — 3-phase rotor winding terminated at
                slip rings; external resistance can be inserted at start (high R = high starting
                torque, low inrush) and progressively shorted as motor accelerates. More
                expensive, brushes need maintenance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Star vs delta — what the terminal-box jumpers actually do"
            plainEnglish="Inside the terminal box of a three-phase motor are six connection studs (U1, V1, W1 at one end of each winding; U2, V2, W2 at the other). Three brass jumper bars rearrange these into either star (Y) or delta (Δ). Star joins all three 'finish' ends together to form the neutral point. Delta joins the finish of each winding to the start of the next, forming a triangle."
          >
            <p>
              The voltage across each phase winding differs by √3 between the two configurations.
              In <strong>star</strong>, line voltage 400 V appears across two windings in series
              via the neutral point — each winding sees 400/√3 = 230 V. In <strong>delta</strong>,
              line voltage 400 V appears directly across each single winding. So a winding
              designed for 230 V can be wired star on a 400 V supply; the same winding can be
              wired delta on a 230 V three-phase supply.
            </p>
            <p>
              Modern UK 400/230 V motors are normally wired in <strong>delta</strong> for
              direct-on-line running on the 400 V three-phase supply. That same motor wired in
              {' '}<strong>star</strong> sees only 230 V per winding, develops only 1/3 the torque
              and draws only 1/3 the current — which is the core idea behind star-delta starting
              (Sub 5.4): start in star to limit inrush, then switch to delta for full operation.
            </p>
            <p>
              <strong>Read the rating plate carefully.</strong> A plate marked "Δ 400 V / Y 690 V"
              means delta-connect on a 400 V supply; do NOT star-connect on 400 V (each winding
              then sees only 230 V — motor will run slow and underpowered). Plates marked
              "Y 400 V / Δ 230 V" go the other way. Wrong jumper position = wrong torque, wrong
              current, possibly burnt windings.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Starting current and torque-speed curve</ContentEyebrow>

          <ConceptBlock
            title="Why DOL inrush is huge"
            plainEnglish="At standstill, rotor sees full-frequency stator field — induces large rotor current, which mirrors as large stator current. Once moving, slip falls, rotor frequency falls, rotor reactance falls, current settles to running value."
          >
            <p>
              DOL inrush ≈ 5-7 × FLA for ~5–30 seconds depending on inertia. The MCB and contactor
              must withstand this without tripping.
            </p>
            <p>
              <strong>Torque-speed curve shape:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Locked rotor (s = 1): starting torque ~1.5-2× rated.</li>
              <li>Pull-up torque: minimum during acceleration, ~1× rated.</li>
              <li>Pull-out (breakdown) torque: max ~2-3× rated, at slip ~20 %.</li>
              <li>Full-load operating point: slip ~3-5 %, torque = rated.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Power factor and efficiency — why a motor running underloaded is a problem"
            plainEnglish="An induction motor draws magnetising current through its inductive stator winding regardless of load. At full load, that magnetising current is small relative to the working current, so power factor is good (0.85–0.92 typical). At quarter load, the magnetising current dominates and power factor collapses (often to 0.4–0.5). The motor still works, but the supply has to push much more apparent power for the actual mechanical output."
            onSite="Most commercial DNO tariffs charge a power factor penalty (or a maximum kVA charge) above their kWh meter reading. Oversized motors running at low load are an avoidable monthly cost."
          >
            <p>
              The fix on a per-motor basis is correctly sizing the motor to the load. A 22 kW
              motor driving a 5 kW load is a permanent power factor disaster; a 7.5 kW motor
              doing the same job at ~70 % load runs at near-nameplate efficiency and pf. Where
              the motor must be oversized for occasional surge loads, fit centrally-controlled
              power factor correction capacitors on the main switchboard — typical kVAr rating
              ≈ 1/3 of the connected motor kVA.
            </p>
            <p>
              <strong>VFDs change the picture.</strong> A VFD-fed motor presents close to unity
              power factor to the supply at the input rectifier (because the DC bus capacitor
              naturally fills in the gaps), but draws non-sinusoidal current with significant
              harmonic content. Different problem, different fix (line reactor, harmonic filter,
              active front end).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reading a three-phase motor nameplate — every number matters"
            plainEnglish="The metal plate on the side of every motor carries about 15 numbers, every one of which constrains your installation choices. Decoding it correctly is the single most useful skill in industrial wiring."
          >
            <p>Typical lines you'll see on a 400 V three-phase plate:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>kW (output)</strong> — mechanical shaft power. NOT the electrical input.
                Electrical input = kW / efficiency.
              </li>
              <li>
                <strong>V (Δ / Y)</strong> — voltages for each connection. Pick the one matching
                your supply.
              </li>
              <li>
                <strong>A (FLA, full-load amps)</strong> — corresponding line current at rated
                kW. Sets cable rating and overload setting.
              </li>
              <li>
                <strong>Hz</strong> — design frequency. UK: 50 Hz. A 60 Hz Asian motor on UK 50 Hz
                runs at 5/6 speed and develops 5/6 voltage-saturation flux margin — runs hot.
              </li>
              <li>
                <strong>rpm</strong> — full-load speed (NOT synchronous). Tells you pole count:
                rpm 2880 ≈ 2-pole, 1440 ≈ 4-pole, 960 ≈ 6-pole.
              </li>
              <li>
                <strong>cos φ</strong> — full-load power factor. Used in I = P / (√3 × V × cos φ
                × η).
              </li>
              <li>
                <strong>η or IE class</strong> — full-load efficiency or its IEC class (IE2, IE3,
                IE4 — higher is better, IE3 is UK minimum since 2017 for most ratings).
              </li>
              <li>
                <strong>Duty (S1–S10)</strong> — S1 continuous, S2 short-time, S3 intermittent.
                Critical for thermal sizing.
              </li>
              <li>
                <strong>IP rating</strong> — IP55 = dust protected + low-pressure jets, common
                for industrial sites. IP56 for washdown.
              </li>
              <li>
                <strong>Insulation class</strong> — F (155 °C max winding temp) or H (180 °C).
                Sets the temperature derating and overload margin.
              </li>
            </ul>
            <p>
              Every figure on the plate connects to a calculation in BS 7671 design — cable
              selection, MCB rating, contactor utilisation category, RCD type, overload relay
              setting. Get the plate wrong and the rest cascades into either a too-small or
              too-big install, both expensive.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 552.1.1 (Rotating machines: equipment rating)"
            clause="All equipment, including cable, of every circuit carrying the starting, accelerating and load currents of a motor shall be suitable for a current at least equal to the full-load current rating of the motor when rated in accordance with the appropriate British or Harmonized Standard. Where the motor is intended for intermittent duty and for frequent starting and stopping, account shall be taken of any cumulative effects of the starting or braking currents upon the temperature rise of the equipment of the circuit."
            meaning={
              <>
                Cable, contactor, MCB and any switching device on the motor circuit must carry
                the FLA continuously, AND must withstand the cumulative thermal effect of repeated
                starts on intermittent-duty motors. Type B MCBs trip too fast on motor inrush;
                Type C (5-10× rated) and Type D (10-20× rated) ride through inrush. Soft-starters
                and VFDs let you use Type B safely.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 552.1.1; BS EN 60898 MCB types."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 552.1.3 (Restart after voltage drop)"
            clause="Except where failure to start after a brief interruption would be likely to cause greater danger, every motor shall be provided with means to prevent automatic restarting after a stoppage due to a drop in voltage or failure of supply, where unexpected restarting of the motor might cause danger."
            meaning={
              <>
                Motors must not auto-restart after a supply dip — the operator could be working on
                the load, having assumed the motor stopped for safety. Implement with a
                latching-type contactor circuit (start button latches via NO auxiliary, stop
                button breaks the latch) rather than direct switching. Where auto-restart is
                deliberately required (some pumps, fans), the risk assessment must justify it and
                the design must provide other safeguards.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 552.1.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.15.202 (Switching off fixed motors)"
            clause="Every fixed electric motor shall be provided with an efficient means of switching off, readily accessible, easily operated and so placed as to prevent danger."
            meaning={
              <>
                Three-phase induction motors driving conveyors, pumps and fans all need a
                lockable local isolator at the machine. Reg 132.15.202 is the regulatory anchor
                for the "isolator within sight" rule that lets a maintenance operative
                physically lock-off, padlock and tag the supply. Distance switching from a
                control room never substitutes for the local isolator — both are needed.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.15.202."
          />

          <SectionRule />

          <CommonMistake
            title="Picking a Type B MCB for a DOL induction motor"
            whatHappens={
              <>
                11 kW motor, FLA 21 A. Apprentice fits a 25 A Type B MCB. Motor inrush 6 × 21 =
                126 A → above Type B 3-5× threshold (75-125 A) → MCB trips on every start.
              </>
            }
            doInstead={
              <>
                Use Type C MCB (5-10× = 125-250 A) or Type D for very high inertia. Or fit a
                soft-starter and stay with Type B. Always check inrush vs MCB type curve before
                ordering.
              </>
            }
          />

          <CommonMistake
            title="Ignoring duty type when sizing a motor circuit"
            whatHappens={
              <>
                Motor plate says 7.5 kW S3 25 % — meaning intermittent duty, 25 % of cycle
                running. Apprentice sizes the cable for steady FLA only. After a few weeks of
                heavy intermittent operation, the cable insulation has overheated and the
                contactor coil is browning.
              </>
            }
            doInstead={
              <>
                Read the duty type on the plate (S1–S10). For S3, S4, S5 (intermittent), the
                cumulative thermal effect of frequent starts can exceed steady-state FLA. Apply
                the correct rating factor per BS 7671 §552.1.1 and the manufacturer's data sheet.
              </>
            }
          />

          <ConceptBlock
            title="Slip frequency in the rotor — why 'rotor frequency' isn't 50 Hz"
            plainEnglish="The stator field rotates at N_s. The rotor follows at N. The relative speed between them is the slip speed (N_s − N). The frequency of the EMF induced in the rotor is f_r = s × f, where s is fractional slip and f is supply frequency. At standstill, s = 1, so rotor frequency = full 50 Hz. At full load (s = 4 %), rotor frequency = only 2 Hz."
          >
            <p>
              <strong>Why this matters:</strong> rotor reactance X_r = 2π f_r L_r. At standstill,
              X_r is huge — rotor current is limited by the reactance, lags voltage badly, and
              the resulting torque per amp is poor. As the rotor speeds up, f_r drops, X_r drops,
              the rotor circuit becomes more resistive than reactive, current comes into phase
              with rotor EMF, and torque per amp rises sharply.
            </p>
            <p>
              This is why the torque-speed curve has the shape it does. From standstill, torque
              actually rises slightly as slip falls from 1 toward the breakdown slip (~20 %) —
              peak torque — then falls quickly as slip falls further toward operating slip.
              Beyond breakdown, more load means more slip means LESS torque, and the motor stalls
              back to zero speed in fractions of a second.
            </p>
            <p>
              <strong>Diagnostic use:</strong> a stroboscope flashing at exactly 50 Hz freezes a
              stationary mark on a 2-pole rotor running at exactly 3000 rpm (impossible — needs
              slip). Setting it to 49 Hz freezes the mark on a rotor running at ~2940 rpm (slip
              2 %). Engineers use this to measure slip without intruding on the running machine.
            </p>
          </ConceptBlock>

          <Scenario
            title="Sizing the supply for an 18.5 kW 3-phase pump motor"
            situation={
              <>
                Motor: 18.5 kW (output), 4-pole, 400 V 3-phase, η 92 %, pf 0.86. DOL start. What
                FLA, supply cable, and MCB size?
              </>
            }
            whatToDo={
              <>
                P_input = 18 500 / 0.92 = 20 109 W.
                <br />
                FLA = P / (√3 × V × pf) = 20 109 / (1.732 × 400 × 0.86) = 33.7 A.
                <br />
                Cable: 6 mm² 4-core SWA at 90 °C, clipped, gives I_z ≈ 51 A → adequate.
                <br />
                MCB: 40 A Type C (rated &gt; FLA, withstands 5-7 × 33.7 ≈ 235 A inrush comfortably
                under instantaneous trip 5-10× = 200-400 A).
                <br />
                Add overload relay set to 1.05 × FLA for thermal protection per §552.1.2.
                Contactor rated AC-3 ≥ 40 A.
                <br />
                Restart prevention per §552.1.3 — latching contactor circuit with stop button
                breaking the seal-in path.
              </>
            }
            whyItMatters={
              <>
                The arithmetic chain — output → input via η → FLA via √3 and pf → cable + MCB
                selection — is the daily 3-phase motor design routine. Each step uses standards
                from this section and §3.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'N_s (rpm) = 120 × f / P. UK 50 Hz: 2P → 3000, 4P → 1500, 6P → 1000.',
              'Slip s = (N_s − N) / N_s. Typical full-load 2-5 %. No slip = no rotor EMF = no torque.',
              'Squirrel-cage: simple, cheap, robust. Wound-rotor: slip-ring + external R for controlled start.',
              'DOL starting current = 5-7× FLA. Type C MCB minimum; Type D for high inertia.',
              'Pull-out (breakdown) torque ~ 2-3× rated, at slip ~20 %.',
              'Soft-starters and VFDs cut inrush dramatically and allow Type B MCBs.',
              'BS 7671 §552.1.1 governs cable + switchgear rating. §552.1.3 mandates restart prevention.',
            ]}
          />

          <Quiz title="Three-phase induction knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.2 Single-phase AC motors
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Synchronous motors and VFDs
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
