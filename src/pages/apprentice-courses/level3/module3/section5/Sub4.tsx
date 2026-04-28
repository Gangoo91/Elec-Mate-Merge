/**
 * Module 3 · Section 5 · Subsection 4 — Synchronous motors, VFDs and motor control
 * Maps to C&G 2365-03 / Unit 302 / LO3 / AC 3.2, 3.3, 3.4
 *   AC 3.4 — "describe the basic operating principles, limitations and applications of motor control"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 8.2, 8.3, 8.4
 *
 * Synchronous machines locked to grid frequency. VFDs that synthesise variable frequency.
 * DOL, star-delta, soft-starter and VFD compared. RCD type selection per §411.4.5 / §531.3.3.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { EnergyCostCalc } from '@/components/apprentice-courses/EnergyCostCalc';
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
import { ContactorSymbol } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Synchronous motors, VFDs, and motor control | Level 3 Module 3.5.4 (AC 3.4) | Elec-Mate';
const DESCRIPTION =
  'Synchronous machines locked to grid frequency. VFDs that synthesise variable frequency for speed control. DOL, star-delta, soft-starter and VFD methods compared.';

const checks = [
  {
    id: 'l3-m3-5-4-sync',
    question: 'A synchronous motor:',
    options: [
      'Has slip',
      'Locks exactly to N_s — no slip',
      'Has rotating brushes',
      'Runs only in one direction',
    ],
    correctIndex: 1,
    explanation:
      'Synchronous motors lock to the rotating field. Rotor (electromagnet or permanent magnet) follows the field exactly at N_s. Slip = 0.',
  },
  {
    id: 'l3-m3-5-4-vfd',
    question: 'A VFD changes motor speed by:',
    options: [
      'Rotating the stator',
      'Varying the supply frequency (and voltage proportionally to keep V/f constant)',
      'Disconnecting windings',
      'Changing pole count',
    ],
    correctIndex: 1,
    explanation:
      'VFD synthesises variable-frequency 3-phase from a DC bus. Lower f → lower N_s → lower motor speed. V scales with f to keep flux constant (V/f control).',
  },
  {
    id: 'l3-m3-5-4-stardelta',
    question: 'Star-delta starting reduces inrush by approximately:',
    options: ['Half', 'One-third (~3×)', 'One-tenth', 'No reduction'],
    correctIndex: 1,
    explanation:
      'Star connection at start gives 1/√3 voltage per winding → 1/3 the current. After accel, switch to delta for full V and full torque. Cuts inrush ~3×.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Synchronous motors are commonly used as:',
    options: [
      'Domestic fans',
      'Large grid generators (alternators) and PFC compensators',
      'Toys',
      'Drills',
    ],
    correctAnswer: 1,
    explanation:
      'All grid alternators are synchronous (rotor locked to grid frequency). Large synchronous motors (1+ MW) for compressors, plus over-excited synchronous motors used as PF correctors.',
  },
  {
    id: 2,
    question: 'VFD output is:',
    options: [
      'Pure sine 50 Hz',
      'PWM (chopped) approximating a sine wave at variable frequency',
      'DC',
      'Square wave only',
    ],
    correctAnswer: 1,
    explanation:
      'IGBT switching at kHz creates PWM that the motor inductance smooths into approximately sinusoidal current. The voltage waveform is chopped; output filters can clean it up.',
  },
  {
    id: 3,
    question: 'V/f control means:',
    options: [
      'Voltage and frequency varied independently',
      'V scales linearly with f to keep magnetic flux constant',
      'V is constant',
      'f is constant',
    ],
    correctAnswer: 1,
    explanation:
      'Constant V/f keeps stator flux constant → constant torque capability across speed range. Below ~10 Hz, voltage is boosted slightly to compensate for stator resistance drop.',
  },
  {
    id: 4,
    question: 'Soft-starter operation:',
    options: [
      'Uses VFD',
      'Phases-on the supply gradually with thyristors, ramping voltage from 0 to full over a few seconds',
      'Removes load',
      'Reduces frequency',
    ],
    correctAnswer: 1,
    explanation:
      'Soft-starter chops the supply waveform with phase-controlled thyristors during start-up. Ramped voltage = ramped torque, reduced inrush. Bypassed at full voltage to eliminate harmonic losses in steady state.',
  },
  {
    id: 5,
    question: 'A 100 kW motor with star-delta starter — peak motor inrush at start:',
    options: ['Same as DOL', 'About 1/3 of DOL', 'About 1/10 of DOL', 'Zero'],
    correctAnswer: 1,
    explanation:
      'Star = 1/√3 V → 1/3 current at the line side. So if DOL would draw 700 A, star draws ~233 A. Big saving.',
  },
  {
    id: 6,
    question: 'A VFD-fed motor running at 25 Hz:',
    options: ['Same speed as 50 Hz', 'Half speed', 'Twice speed', 'Stopped'],
    correctAnswer: 1,
    explanation:
      'N_s = 120f/P. Halving f halves synchronous speed. Useful for variable-flow pumps (cube law: half speed → 1/8 power).',
  },
  {
    id: 7,
    question: 'A motor contactor (AC-3 rated):',
    options: [
      'Is a fuse',
      "Switches motor inrush AND load currents reliably for the contactor's rated life cycles",
      'Is the same as an isolator',
      'Replaces an MCB',
    ],
    correctAnswer: 1,
    explanation:
      'AC-3 utilisation category covers normal motor switching. AC-4 covers reversing/jogging duty (more arduous). Always match contactor rating to actual motor inrush + duty cycle.',
  },
  {
    id: 8,
    question: 'Direct-on-line (DOL) starting requires:',
    options: [
      'VFD',
      'Contactor + overload + supply rated for inrush',
      'Star-delta switch',
      'Soft-starter',
    ],
    correctAnswer: 1,
    explanation:
      'DOL = simplest. Just a contactor (rated for motor inrush) and overload relay. Cable and protective device sized to handle 5-7× FLA inrush.',
  },
];

const faqs = [
  {
    question: "Why aren't all motors synchronous?",
    answer:
      "Synchronous motors won't start themselves on a 3-phase supply (no slip = no torque to spin up). They need a starting method (cage windings on the rotor, pony motor, or VFD frequency ramp). Hence induction motors dominate for general-purpose use; synchronous reserved for very large or specialty applications.",
  },
  {
    question: 'When is a VFD not worth fitting?',
    answer:
      'Constant-load motors with light duty cycle. The harmonic emissions, capital cost and complexity outweigh benefits. For a fan running 24/7 at constant speed, DOL with a contactor and overload is fine. For a pump that needs variable flow, VFD pays back rapidly via affinity laws (P ∝ N³).',
  },
  {
    question: 'What is "regenerative braking" on a VFD?',
    answer:
      'When the load (e.g. lift cab descending) drives the motor, the motor becomes a generator. VFD has to absorb that energy — either burn it in a brake resistor, or feed it back to the grid (regen drives, more expensive but green).',
  },
  {
    question: 'Are synchronous motors used in EVs?',
    answer:
      'Permanent-magnet synchronous motors (PMSM) are the dominant EV drive technology — high efficiency, high power-to-weight, smooth control. They are fundamentally synchronous; the inverter manages frequency to match desired speed.',
  },
  {
    question: 'How does a soft-starter compare with a VFD?',
    answer:
      'Soft-starter only controls START current, runs at full voltage in steady state. Cheaper. VFD controls start AND speed continuously. More expensive but more capable. Pick soft-starter for hard-start cable/transformer issues; VFD for energy savings or process control.',
  },
  {
    question: 'Do VFDs cause earth-leakage RCD trips?',
    answer:
      'Yes — VFDs have built-in EMC filters that leak ~5-30 mA to earth at high frequency. Standard 30 mA RCDs may trip on this. And Type AC and Type A RCDs can be blinded by DC components. Use Type B per §531.3.3 for VFD circuits.',
  },
];

export default function Sub4() {
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
            eyebrow="Module 3 · Section 5 · Subsection 4"
            title="Synchronous motors, VFDs and motor control"
            description="Synchronous machines locked to grid frequency. VFDs synthesising variable f. DOL, star-delta, soft-starter, VFD compared."
            tone="yellow"
          />

          <TLDR
            points={[
              'Synchronous motor: rotor locked to N_s, no slip. PMSM dominates EV traction.',
              'VFD: rectifier + DC bus + IGBT inverter → variable frequency 3-phase output.',
              'V/f control keeps flux constant; below 10 Hz needs voltage boost.',
              'Starting methods: DOL (simplest), star-delta (~1/3 inrush), soft-start (smooth ramp), VFD (controlled accel + variable speed).',
              'VFD circuits MUST use Type B RCD — high-frequency / DC leakage trips Type A and Type AC.',
              'BS 7671 §531.3.3: RCD Type AC only for fixed equipment with no DC components in load current.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish synchronous and induction motors by slip behaviour.',
              'Explain VFD operation and V/f control.',
              'Compare DOL, star-delta, soft-starter and VFD starting methods.',
              'Identify motor control components (contactor, overload, isolator).',
              'Specify the correct RCD type for a VFD-fed circuit per §531.3.3.',
              'Recognise common-mode currents and bearing damage in VFD-fed motors.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Synchronous motors</ContentEyebrow>

          <ConceptBlock
            title="The rotor locks to the field — no slip"
            plainEnglish="A synchronous machine has a rotor that creates its own magnetic field (electromagnet via slip rings, or permanent magnets). It locks to the rotating stator field at synchronous speed and runs at exactly that speed under any load, until pull-out torque is exceeded."
          >
            <p>
              <strong>Variants:</strong> electromagnetic-rotor (large industrial), permanent-magnet
              (PMSM, used in EV traction and high-efficiency drives), reluctance (no rotor field
              — uses geometry).
            </p>
            <p>
              <strong>Speed:</strong> exactly N_s = 120f/P. With grid f locked to 50 Hz, the only
              way to vary speed is to vary f — i.e. via a VFD/inverter.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <ConceptBlock
            title="Synchronous variants — wound-rotor, PMSM and reluctance motors"
            plainEnglish="The 'synchronous' label covers three quite different machines. Wound-rotor (or 'salient pole') has an electromagnet on the rotor fed via slip rings — used for grid alternators and large compressors. Permanent-magnet (PMSM) replaces the field winding with neodymium magnets — dominant in EV traction, robotics and high-end servos. Synchronous reluctance has no rotor field at all — it relies on shaped iron to lock to the field by magnetic preference."
          >
            <p>
              <strong>Wound-rotor synchronous</strong> uses a separate DC excitation supply
              through slip rings to set the rotor field strength. By over-exciting the rotor, the
              motor draws leading reactive current — it acts as a synchronous condenser and
              corrects power factor for the rest of the site. Big factories with 1+ MW
              synchronous compressors get the PFC for free.
            </p>
            <p>
              <strong>PMSM</strong> is hands-down the most efficient electric motor topology in
              mass production. Tesla, BMW, Toyota all use them; high-end industrial servos use
              them; the latest IE5 ultra-premium efficiency band (BS EN 60034-30-2) is essentially
              defined by what PMSMs can achieve. The price is rare-earth magnet cost and the need
              for an inverter — they cannot start direct on a 3-phase mains supply.
            </p>
            <p>
              <strong>Synchronous reluctance</strong> has a rotor that's just shaped iron — no
              copper, no magnets, no slip rings. Cheap to build, robust, no rare earths. Locks to
              the rotating stator field by magnetic preference (the rotor wants to align its
              high-permeability axis with the field). Performance approaching PMSM at
              ferrite-magnet cost. ABB SynRM range is the best-known commercial example. Becoming
              more popular as rare-earth supply concerns grow.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>VFDs and frequency control</ContentEyebrow>

          <ConceptBlock
            title="Synthesised variable frequency 3-phase"
            plainEnglish="A VFD rectifies AC to DC (smoothing capacitor bank), then chops the DC with IGBTs to synthesise PWM 3-phase at any frequency from a few Hz up to 100+ Hz. Motor sees ~sinusoidal current thanks to its own inductance."
          >
            <p>
              <strong>Speed control:</strong> lower f → lower N_s → lower motor speed. V
              proportional to f keeps flux roughly constant. Below ~10 Hz, voltage boost
              compensates for stator resistance.
            </p>
            <p>
              <strong>Affinity laws on a centrifugal pump or fan:</strong> Q ∝ N, P ∝ N³.
              Halving speed → 1/8 power. Massive energy savings in variable-flow applications.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <EnergyCostCalc />
          </div>

          <InlineCheck {...checks[1]} />

          <ConceptBlock
            title="Inside a VFD — rectifier, DC bus, IGBT inverter and the dead-time problem"
            plainEnglish="Every VFD has the same three-stage architecture. Front end: a 6-pulse diode bridge rectifies 3-phase mains into pulsating DC. Middle: a large electrolytic capacitor bank smooths it into a stable DC bus (typically 540 V on a 400 V supply). Output: six IGBTs arranged as a 3-phase H-bridge chop the DC bus at 2–16 kHz to synthesise variable-frequency 3-phase output."
          >
            <p>
              <strong>PWM and motor inductance:</strong> the IGBTs switch the motor between full
              +V and full −V at high frequency, varying the duty cycle to approximate a sine
              wave. The motor inductance acts as a low-pass filter — it sees the rectangular
              voltage pulses but forces a roughly sinusoidal current through itself. The result
              is acceptable torque ripple but harsh dV/dt at the motor terminals.
            </p>
            <p>
              <strong>The dead-time problem.</strong> The two IGBTs in each leg of the H-bridge
              must NEVER conduct at the same instant — that would short-circuit the DC bus. The
              control inserts a 1–5 µs "dead time" between switching one off and the other on.
              During dead time, the motor inductance forces current through whichever freewheel
              diode happens to be available. This causes small voltage distortions, output
              harmonic content, and a bit of audible noise.
            </p>
            <p>
              <strong>Cable-length problems.</strong> Long motor cables (&gt;30 m) act as
              transmission lines. The fast IGBT edges (rise time ~50 ns) reflect off the motor's
              high impedance and double the voltage at the motor terminals — peak voltage can hit
              1200 V on a 400 V drive. Insulation breaks down. Solution: dV/dt filter at the
              drive output, or sine filter for very long runs, or use motor cable rated for
              inverter duty (BS EN 50525 'INV' rating).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Motor starting methods</ContentEyebrow>

          <ConceptBlock
            title="DOL, star-delta, soft-start, VFD"
            plainEnglish="Pick by motor size, supply capacity, mechanical inertia and speed-control needs."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct-on-line (DOL)</strong> — contactor + overload. Simplest, cheapest.
                Inrush 5-7× FLA. Used up to ~7.5 kW typically; larger if supply can handle inrush.
              </li>
              <li>
                <strong>Star-delta</strong> — switches windings from star (start, 1/3 V per
                winding) to delta (run, full V) when motor near full speed. Cuts inrush ~3×. Used
                for medium motors 7.5-100 kW.
              </li>
              <li>
                <strong>Soft-starter</strong> — thyristor controller phases voltage on smoothly
                over 5-30 seconds. Smooth start, low inrush. Bypassed when at speed. Common
                5-200 kW.
              </li>
              <li>
                <strong>VFD</strong> — full electronic control of frequency and voltage. Smooth
                start with no inrush. Variable-speed in service. Best efficiency on variable-flow
                pumps and fans. Cost premium 2-4× DOL.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <ContactorSymbol />

          <ConceptBlock
            title="Star-delta starter wiring — three contactors and a precise sequence"
            plainEnglish="Star-delta needs three contactors: one main (closes first to feed L1/L2/L3 to U1/V1/W1), one star (briefly short-circuits U2/V2/W2 together to form the star point), and one delta (closes last, joining U2-W1, V2-U1, W2-V1 to make the delta). A timer transitions from star to delta after 5–15 s, sized to let the motor reach about 75 % speed."
          >
            <p>
              <strong>The dangerous moment is the changeover.</strong> Open the star contactor,
              wait ~50 ms (the changeover dead time, set in the timer relay), then close the
              delta contactor. If the gap is too short, the star and delta contactors might
              briefly both be closed — short-circuit between phases through the windings, big
              arc, blown fuses. If the gap is too long, the motor decelerates and the inrush when
              delta finally closes is nearly as big as a fresh DOL start.
            </p>
            <p>
              <strong>Mechanical interlocks</strong> between star and delta contactors prevent
              both being closed simultaneously even if the timer relay fails — a steel mechanical
              link physically blocks one when the other is closed. Standard supply on quality
              starters from Schneider, ABB, Siemens; verify it's there before commissioning.
            </p>
            <p>
              Star-delta only works on motors built for delta running on the supply voltage. A
              400 V delta / 690 V star motor on a 400 V supply must be wired delta for normal
              running — star-delta starting is then valid. The same motor on a 690 V supply must
              be wired star — and star-delta starting cannot be used. On a 230 V Δ / 400 V Y
              motor on 400 V, the motor is permanently star-connected — no star-delta possible.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What 'soft-starter' actually does — phase-controlled thyristors and the limits"
            plainEnglish="A soft-starter has six anti-parallel thyristors (or three TRIACs), one per leg, between the supply and the motor. By firing the thyristors progressively earlier each cycle, average voltage applied to the motor ramps from zero to full over 5–30 seconds. The motor accelerates smoothly, inrush current is roughly proportional to applied voltage (voltage halved → current halved), and starting torque follows the square of voltage (voltage halved → torque quartered)."
          >
            <p>
              That last point is a real limit. Soft-starters cannot deliver more starting torque
              than DOL — they can only reduce it (and the inrush). For a high-inertia load like a
              packed conveyor or a centrifugal compressor, the soft-starter has to ramp slowly
              enough not to stall, and the cumulative I²t through the motor windings during the
              long ramp can exceed a DOL inrush. Always verify by motor manufacturer's allowed
              start times.
            </p>
            <p>
              Once the motor reaches full speed and full voltage, the thyristors are bypassed by
              an internal contactor. Otherwise their continuous voltage drop (~1.5 V per leg, so
              4.5 V × √3 = 8 V line-to-line) wastes power and produces continuous harmonic
              current. The bypass contactor saves both energy and harmonic distortion in steady
              state.
            </p>
            <p>
              Soft-starters also offer "soft stop" — ramping voltage down on shutdown to gently
              slow the motor and prevent water-hammer in pumps or shock loads in conveyors.
              Better than DOL stop, especially for lifts and large pumps. But a true four-quadrant
              ride (acceleration AND regenerative braking) is only possible with a VFD.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 531.3.3 (RCD types)"
            clause="RCD Type AC shall only be used to serve fixed equipment, where it is known that the load current contains no DC components."
            meaning={
              <>
                Type AC RCDs are now restricted to a narrow set of pure-sinusoidal AC loads.
                Anything with internal rectification — VFDs, EV chargers, modern PV inverters,
                ECM pumps, LED drivers — produces DC components and CANNOT be protected by Type
                AC. Use Type A (AC + pulsed DC) for most modern installations, and Type B (full
                DC + AC + HF) for VFD-fed motor circuits and EV charging points.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 531.3.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 552.1.2 (Motor overload protection)"
            clause="Every electric motor having a rating exceeding 0.37 kW shall be provided with control equipment incorporating means of protection against overload of the motor."
            meaning={
              <>
                The contactor / starter must include thermal overload protection set close to
                FLA — usually 1.05–1.15× FLA on a thermal overload relay, or set in the VFD
                parameters as motor protection. Soft-starters and VFDs typically include
                electronic overload as standard; with a plain DOL contactor you need a separate
                thermal overload relay downstream.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 552.1.2."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 444.4.2.1 (Reducing electromagnetic interference)"
            clause="The following measures shall be considered, where appropriate, in order to reduce the effects of electromagnetic interference: where screened signal or data cables are used, care should be taken to limit the fault current from power systems flowing through the screens and cores of signal cables, or data cables, which are earthed."
            meaning={
              <>
                A VFD's switching IGBTs put kilohertz-rate dV/dt onto the motor cable —
                spectacular HF emission unless contained. Reg 444.4.2.1 mandates the EMI
                measures that are routine in VFD installs: screened motor cable with 360°
                screen termination at both ends, separate motor and signal cable trays, ferrite
                cores on the supply side. These are the regulation answers to the EMC
                Regulations 2016 referenced from Reg 523.1.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 444.4.2.1."
          />

          <SectionRule />

          <CommonMistake
            title="Fitting a Type AC RCD on a VFD circuit"
            whatHappens={
              <>
                VFD-fed motor circuit. Type AC 30 mA RCD installed. The VFD's DC leakage
                component "blinds" the RCD core — it stops detecting AC leakage. A real fault no
                longer trips. Could leave a dangerous condition undetected.
              </>
            }
            doInstead={
              <>
                VFD circuits ALWAYS use Type B RCDs per §531.3.3. Type B detects pure DC, AC,
                pulsed DC and high-frequency leakage. More expensive (~3× Type A) but the only
                safe choice. Read the VFD data sheet for the manufacturer's recommended RCD type.
              </>
            }
          />

          <CommonMistake
            title="Specifying a 30 mA Type B RCD on a long VFD cable run"
            whatHappens={
              <>
                15 kW VFD, 80 m motor cable. Built-in EMC filter leaks ~25 mA to earth at HF.
                30 mA Type B RCD trips intermittently — sometimes immediately, sometimes after
                hours. Customer loses production every time.
              </>
            }
            doInstead={
              <>
                For VFD circuits with significant cable length or built-in EMC filter, size the
                Type B RCD at 100 mA or 300 mA where the application allows (not for life
                protection of socket-outlets, but for fault protection upstream). Or use a 30 mA
                Type B RCD with the EMC filter capacitor downstream of it where geometry permits.
              </>
            }
          />

          <ConceptBlock
            title="Common-mode currents and bearing damage — the silent killer of VFD-fed motors"
            plainEnglish="A VFD's PWM output isn't perfectly balanced — there's a small common-mode voltage that pulses at the switching frequency. This forces high-frequency current through the motor's stray capacitance to earth, including through the bearings. Microscopic arcs across the lubricant film pit the bearing races. After 6–24 months the bearing turns from polished steel into something that looks like a sandblasted moonscape, and the motor fails."
            onSite="The motor manufacturer's installation manual usually mandates one or more mitigations for VFD-fed motors above ~30 kW. On smaller motors the issue is often ignored — and the motor lasts the warranty period plus a year, then fails just out of warranty. Spec it correctly first time."
          >
            <p>
              <strong>Symptom:</strong> bearing noise rising over time, eventually a full bearing
              failure on a motor that's only a few years old. Open the bearing and you'll see
              characteristic "fluting" — fine parallel grooves running across the race in the
              direction of rotation, evidence of sustained electrical erosion.
            </p>
            <p>
              <strong>Mitigations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Shaft grounding ring</strong> — a brush of conductive carbon fibres
                riding on the shaft, gives the high-frequency current a direct path to earth
                bypassing the bearings (Aegis SGR is the dominant brand).
              </li>
              <li>
                <strong>Insulated bearings</strong> on at least one end (the non-drive end is
                standard, fitting a ceramic bearing race that breaks the current path).
              </li>
              <li>
                <strong>dV/dt or sine filter</strong> at the drive output to slow the edge rates
                and reduce the common-mode capacitive current in the first place.
              </li>
              <li>
                <strong>Properly bonded shielded motor cable</strong> with both ends terminated
                360° to the metalwork.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Choosing the right starter for a 22 kW HVAC fan"
            situation={
              <>
                Customer wants a 22 kW supply and exhaust fan in a kitchen. Variable speed
                required (4 settings). Existing supply 100 A 3-phase. Considering DOL+contactor
                for cost vs VFD for variable speed.
              </>
            }
            whatToDo={
              <>
                Steady-state FLA: 22 / 0.92 / (1.732 × 0.4 × 0.86) = 40 A. DOL inrush: 6 × 40 =
                240 A briefly. Customer's 100 A supply can handle this.
                <br />
                BUT: customer wants 4 speeds. DOL = on/off only. Star-delta only gives 2 speeds
                (start + full). VFD gives infinite speed control plus 25-40 % energy saving on
                average duty cycle.
                <br />
                VFD it is. Specify with built-in EMC filter for cable length, Type B 30 mA RCD
                upstream per §531.3.3, output dV/dt filter if cable run over 50 m.
                <br />
                Add motor overload via VFD parameters per §552.1.2. Restart prevention via VFD
                "no auto-restart" parameter per §552.1.3.
              </>
            }
            whyItMatters={
              <>
                Variable-flow loads (fans, pumps) save more energy with VFD than the VFD costs to
                buy. Plus the customer gets the speed control they actually wanted, and the
                regulatory requirements (RCD type, overload, restart) all flow through the same
                drive parameters.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Synchronous motor: locked to N_s, no slip. PMSM common in EVs.',
              'VFD synthesises variable f, controls motor speed continuously. V/f control keeps flux constant.',
              'Starting methods: DOL → star-delta → soft-start → VFD (increasing complexity, decreasing inrush).',
              'AC-3 contactor rating for normal motor switching; AC-4 for reversing/jogging.',
              'VFD circuits MANDATE Type B RCD per §531.3.3 — Type A/AC blinded by DC leakage.',
              'Affinity laws (P ∝ N³) make VFDs hugely worthwhile on variable-flow pumps and fans.',
              'Common-mode currents pit motor bearings — fit shaft grounding rings or insulated bearings.',
            ]}
          />

          <Quiz title="Synchronous, VFD and control knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section5-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.3 Three-phase induction motors
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 6 — Components, lighting, heating
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
