/**
 * Module 3 · Section 6 · Subsection 1 — Contactors, relays and solenoids
 * Maps to C&G 2365-03 / Unit 302 / LO4 / AC 4.1
 *   AC 4.1 — "specify the main types and operating principles of electrical components"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 9.1, 9.2
 *
 * Electromagnetic switching: how contactors, relays and solenoids work, utilisation categories
 * AC-1 to AC-4 / DC-1 to DC-13, coil ratings, snubbing inductive coils, BS EN 60947-4-1.
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
import { ContactorSymbol, RelaySymbol } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Contactors, relays and solenoids | Level 3 Module 3.6.1 (AC 4.1) | Elec-Mate';
const DESCRIPTION =
  'Electromagnetic switching: how contactors, relays and solenoids work, utilisation categories AC-1 to AC-4, coil ratings and snubbing.';

const checks = [
  {
    id: 'l3-m3-6-1-cat',
    question: 'AC-3 utilisation category contactor is rated for:',
    options: [
      'Copper cables, steel containment, pipework, and ductwork',
      'To establish the true extent of work executed',
      'Measure and check against the drawing',
      'Squirrel-cage motor switching with normal start/stop',
    ],
    correctIndex: 3,
    explanation:
      'AC-3 = motor squirrel-cage normal start, current at make = ~6× rated, current at break = rated. Standard motor application.',
  },
  {
    id: 'l3-m3-6-1-relay',
    question: 'A standard relay differs from a contactor primarily by:',
    options: [
      'Fire barriers must be installed to maintain compartmentation',
      'A written document describing how work will be carried out safely, step by step',
      'Smaller current rating, used in control circuits not for switching loads',
      'To provide strain relief, earth continuity, and environmental sealing',
    ],
    correctIndex: 2,
    explanation:
      'Relays = small switching for control logic (typ. < 16 A). Contactors = power switching (16 A and up). Same physics; different scale.',
  },
  {
    id: 'l3-m3-6-1-solenoid',
    question: 'A solenoid valve in a heating system uses:',
    options: [
      'Electrical Installation Certificate or Minor Works Certificate',
      'They address professional topics and learning is documented',
      'Coil that pulls a plunger to open or close a valve when energised',
      'Adding a single socket outlet to an existing circuit',
    ],
    correctIndex: 2,
    explanation:
      'Solenoid coil → magnetic field → pulls iron core (plunger) → opens or closes mechanically connected valve. Used everywhere — fuel cut-off, water valves, gas valves, locks.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Contactor coil voltage typically:',
    options: [
      'Hazards during construction, maintenance, use and demolition',
      'Independent — could be 230 V AC, 24 V DC, etc., separate from load circuit',
      'Flammable — the substance, vapour or gas can ignite easily',
      'To accommodate thermal expansion in long conduit runs',
    ],
    correctAnswer: 1,
    explanation:
      'Coil and load are independent. Common: 230 V AC coil for industrial; 24 V DC coil for control panels with low-voltage logic.',
  },
  {
    id: 2,
    question: 'Auxiliary contacts on a contactor:',
    options: [
      'Eliminate, substitute, engineering controls, administrative controls, PPE',
      'To avoid electromagnetic interference affecting data transmission',
      'Give signal contacts (e.g. to feed a "running" lamp or interlock another circuit)',
      'RIDDOR 2013 reporting by the responsible person if the injury is over-7-day, specified or fatal',
    ],
    correctAnswer: 2,
    explanation:
      'Aux contacts = small N/O or N/C signal contacts on the contactor body. Used for control logic, indicator lamps, interlocks.',
  },
  {
    id: 3,
    question: 'Why do contactors hum on AC?',
    options: [
      'Zooming into specific areas, measuring distances between features, and searching for components by tag number',
      'The collapse, overturning, or failure of load-bearing parts of lifts and lifting equipment',
      'Continue CPR immediately and follow the AED prompts — it will re-analyse every 2 minutes',
      'Coil flux pulses at 100 Hz; shading ring on the pole face creates a small phase-shifted flux to keep the armature held',
    ],
    correctAnswer: 3,
    explanation:
      'On AC, the magnetic flux passes through zero each half-cycle — armature would chatter. A copper shading ring on the pole face creates a small phase-shifted flux that keeps net flux non-zero, suppressing chatter (mostly).',
  },
  {
    id: 4,
    question: 'A latching relay:',
    options: [
      'Holds its state without continuous coil power; needs a pulse to change state',
      'Because they happen far more frequently and complacency is common',
      'The cable from distribution point to individual customer premises',
      'It allows engineers to trace what happened before and after an alarm',
    ],
    correctAnswer: 0,
    explanation:
      'Latching relay (or impulse relay) flips state on each control pulse. Useful for low-power memory functions; e.g. push-button room lighting in commercial premises.',
  },
  {
    id: 5,
    question: 'Overload relays in a motor circuit:',
    options: [
      'To prevent the shield from acting as an antenna and picking up more interference',
      'Sense motor current and trip if the running current exceeds set value for a sustained period',
      'Causes more severe burns, deeper tissue damage and a higher likelihood of cardiac arrest',
      'Always referring to the person before their condition, e.g. \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'a person with schizophrenia\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' rather than \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'a schizophrenic\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'',
    ],
    correctAnswer: 1,
    explanation:
      'Overload relay (thermal or electronic) detects sustained over-current that would damage the motor — typically 1.05-1.25× FLA for minutes. Trips the contactor coil.',
  },
  {
    id: 6,
    question: 'Solenoid valves are commonly used to:',
    options: [
      'Certification and unsupervised live testing',
      'Fundamental principles of how light affects human vision and comfort',
      'Open/close fluid or gas flow paths under electrical control',
      'Embodied carbon coefficients for construction materials',
    ],
    correctAnswer: 2,
    explanation:
      'Solenoid valves: heating system zone valves, washing machine water inlet, fuel injection, automatic door locks. Coil energised → plunger pulled → valve opens (or closes).',
  },
  {
    id: 7,
    question: 'A contactor for capacitor bank switching is rated:',
    options: [
      'AC-3',
      'AC-5',
      'AC-1',
      'AC-6b',
    ],
    correctAnswer: 3,
    explanation:
      'AC-6b = capacitor bank switching. Special design with pre-charge resistors to limit inrush current. Standard AC-3 contactors burn out switching big caps.',
  },
  {
    id: 8,
    question: 'Contactor coil voltage range typically tolerates:',
    options: [
      '85-110 % of nominal',
      '50-150 % of nominal',
      'Exactly nominal voltage',
      'No tolerance',
    ],
    correctAnswer: 0,
    explanation:
      'IEC 60947-4-1: contactor must close at 85 % nominal voltage and remain closed down to 75 %. Normal operating range 85-110 %.',
  },
];

const faqs = [
  {
    question: 'Why do contactors burn out the coil?',
    answer:
      'Most common cause: voltage spike on the coil from inductive load switching elsewhere on the same supply. Or operating below 75 % rated voltage (chattering, high heat). Always fit RC snubber or freewheel diode for inductive coil switching.',
  },
  {
    question: 'When do I use a relay vs a contactor?',
    answer:
      'Below 16 A: relay (cheaper, smaller). 16 A and above for motors / heaters / lighting circuits: contactor. Above 100 A for motors: contactor with larger frame. Above 600 A: dedicated air-circuit-breaker (ACB).',
  },
  {
    question: 'Why do some old contactors have a shading ring?',
    answer:
      "On AC, flux passes through zero twice per cycle. Without anything else, the armature would let go and re-clamp at 100 Hz — buzzing constantly. A copper shading ring on the pole face creates a phase-shifted flux that keeps total flux non-zero. (DC-coil contactors don't need this.)",
  },
  {
    question: 'What is "MCCB" vs "contactor"?',
    answer:
      "MCCB (moulded-case circuit breaker) is a manually operated protection device that ALSO switches under fault. Contactor is electromagnetic, switches under control signal, but isn't intended as primary fault protection. Many panels have both — MCCB upstream, contactor downstream for control.",
  },
  {
    question: 'How long does a contactor last?',
    answer:
      'Mechanical life: 10⁶-10⁷ operations. Electrical life: depends on duty — 10⁵-10⁶ for AC-3 motor switching at rated current. Each "make" arcs slightly and erodes the contact tips; eventually they pit and weld. Replace when the tips show pitting or arcing scars.',
  },
  {
    question: 'Can I use a relay to switch a 3-phase motor?',
    answer:
      'No — relays are usually single-pole or two-pole, low current. Motor switching needs a 3- or 4-pole contactor with the motor utilisation category (AC-3 or AC-4), arc chambers and proper inrush rating.',
  },
];

export default function Sub1() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 1"
            title="Contactors, relays and solenoids"
            description="Electromagnetic switching for power circuits. Utilisation categories. Coil ratings. Snubbing inductive loads."
            tone="yellow"
          />

          <TLDR
            points={[
              'Contactor = electromagnetic switch for power circuits. Coil energised → contacts close.',
              'Relay = small contactor for control circuits, typically < 16 A.',
              'Solenoid = coil + plunger that mechanically actuates a valve, lock or piston.',
              'Utilisation categories AC-1 (resistive) to AC-4 (motor reversing/jogging) define duty.',
              'Always snub inductive coil circuits (RC for AC, freewheel diode for DC).',
              'BS EN 60947-4-1 governs contactor and motor-starter ratings, plus restart prevention.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain how contactors, relays and solenoids work electromagnetically.',
              'Identify utilisation categories and pick the right contactor for the duty.',
              'Recognise main contacts vs auxiliary contacts.',
              'Specify coil voltage independent of load voltage.',
              'Apply snubber circuits to suppress switching transients on coils.',
              'Distinguish DC switching from AC switching and understand why DC-rated contactors are different.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>How they work</ContentEyebrow>

          <ConceptBlock
            title="Coil pulls the armature, contacts close"
            plainEnglish="Energise the coil → magnetic field → iron armature pulled toward the coil → mechanically connected contacts close (and any N/C contacts open). De-energise → spring returns the armature."
          >
            <p>Three families with the same physics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contactor</strong> — power switch for motors, heaters, lighting circuits
                ≥16 A.
              </li>
              <li>
                <strong>Relay</strong> — small switch for control logic, &lt;16 A typical.
              </li>
              <li>
                <strong>Solenoid</strong> — actuator that drives a mechanical part (valve plunger,
                door lock, fuel cut-off).
              </li>
            </ul>
          </ConceptBlock>

          <ContactorSymbol />
          <RelaySymbol />

          <ConceptBlock
            title="Inside a contactor — armature, return spring, arc chute and pole face"
            plainEnglish="Open up any contactor and you find the same six parts: a fixed iron core wound with the coil; a moving iron armature that gets pulled toward the core when the coil energises; a stiff return spring that flings the armature back when the coil drops out; the moving contact carrier on top of the armature; the fixed contact terminals; and an arc chute (a stack of steel splitter plates) above each pole that chops a developing arc into many small arcs to extinguish it."
          >
            <p>
              <strong>The arc chute is the part that defines whether a contactor can do its job
              safely.</strong> When the moving contact opens under load, the inductive load tries
              to maintain current — the air ionises and a small electric arc forms. Without help,
              that arc could persist for tens of milliseconds and weld the contacts together.
              The chute uses two effects: blow-out from the magnetic field of the load current
              itself drives the arc upward into the chute, and the chute's metal plates split
              the single long arc into many small ones, each of which extinguishes at the next
              AC zero crossing.
            </p>
            <p>
              This is why contactors are rated by AC waveform (AC-1, AC-3, etc.) and DC contactors
              look completely different — a DC arc has no zero crossing to extinguish it, so DC
              contactors need much more aggressive blow-out arrangements (permanent magnets,
              larger chutes) and have far lower DC ratings than their AC equivalents. Never use
              an AC contactor on a DC circuit beyond a tiny fraction of its AC rating.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The shading ring — why AC contactors don't buzz themselves to death"
            plainEnglish="On a DC coil, magnetic flux is constant — the armature is held firmly to the pole face, no chatter, no noise. On an AC coil, the flux follows the supply waveform: zero, positive peak, zero, negative peak, zero — twice every cycle. Without anything else, the armature would let go each time the flux passed zero (100 times per second on UK 50 Hz), making a violent buzz and rapid mechanical wear. The shading ring fixes it."
            onSite="Symptom of a damaged shading ring: contactor that suddenly starts buzzing audibly under load, or chatters and re-arcs at every supply zero crossing. A buzzing contactor is a contactor about to fail — replace it before it welds itself shut."
          >
            <p>
              The shading ring is a single-turn copper or brass loop set into a slot in the pole
              face. The main flux passing through it induces a small EMF in the loop, which
              drives a current that creates a SECOND flux component, phase-shifted from the main
              flux by about 60–90°. The two fluxes (main and shaded) overlap such that when one
              is at zero, the other is near peak. Net flux through the armature never reaches
              zero — armature stays clamped.
            </p>
            <p>
              This is the same trick as a shaded-pole motor (Sub 5.2), used here for clamping
              rather than rotation. The moment AC was invented, this problem appeared and this
              fix was developed. Universal across every AC-coil contactor since the 1920s.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Utilisation categories</ContentEyebrow>

          <ConceptBlock
            title="AC-1 to AC-4 (and DC equivalents)"
            plainEnglish="The utilisation category tells you what duty the contactor is rated for — current at make, current at break, contact wear cycle. Pick the right category or contacts wear out fast."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AC-1</strong> — resistive (heaters). Make and break at I_e (rated).
              </li>
              <li>
                <strong>AC-2</strong> — slip-ring motor (rare today).
              </li>
              <li>
                <strong>AC-3</strong> — squirrel-cage motor normal start. Make at 6×I_e, break at
                I_e. Standard for motor circuits.
              </li>
              <li>
                <strong>AC-4</strong> — squirrel-cage motor reversing/jogging. Make at 6×I_e,
                break at 6×I_e. Tougher duty — derate or oversize.
              </li>
              <li>
                <strong>AC-6b</strong> — capacitor bank. Pre-charge required to limit cap inrush.
              </li>
              <li>
                <strong>AC-15</strong> — auxiliary contact for control circuits.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Coil snubbing — why an inductive switching circuit needs an RC or freewheel diode"
            plainEnglish="A contactor coil is an inductor. When you de-energise it, the magnetic field stored in the coil collapses and tries to maintain current — by generating whatever voltage it needs (V = L × di/dt). With a fast switching contact, that voltage can spike to several kV, arc across the opening contacts, damage relay contacts elsewhere on the same supply, and emit electromagnetic noise that crashes nearby electronics."
          >
            <p>
              <strong>For DC coils, fit a freewheel (flyback) diode</strong> across the coil,
              anode to negative side, cathode to positive side. In normal operation the diode is
              reverse-biased and does nothing. When the coil de-energises, the collapsing field
              reverses the coil's voltage; the diode now sees forward bias and provides a path
              for the inductive current to circulate harmlessly until the energy dissipates as
              heat in the coil's own resistance. Coil voltage is clamped at one diode drop
              (~0.7 V) above supply. Cheap, foolproof, universal.
            </p>
            <p>
              <strong>For AC coils, fit a parallel RC snubber</strong> (typically 100 Ω in series
              with 0.1 µF metallised polypropylene) across the coil. The capacitor absorbs the
              high-frequency switching transient; the resistor dissipates the energy and prevents
              the cap-coil pair becoming a high-Q resonant circuit. AC coils can't use a simple
              diode (would short-circuit the AC every alternate half-cycle).
            </p>
            <p>
              <strong>Symptoms of an unsnubbed circuit:</strong> nuisance trips on neighbouring
              electronics, premature relay contact wear, EMC test failure, occasional contactor
              coil burnouts when an unrelated downstream contactor opens. Snubbing is a £1 fix
              that prevents repeat callouts.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Solenoid valves — coil + plunger + seat, the workhorse of automation"
            plainEnglish="A solenoid valve is a coil wound around a cylindrical iron core. When energised, the magnetic field pulls a soft-iron plunger up against the coil; the plunger is mechanically connected to a valve seat that opens (or closes, depending on design — 'normally open' or 'normally closed' valves exist). De-energise and a return spring drives the plunger back down. Used in heating zone valves, washing machine inlets, gas safety valves, hydraulic and pneumatic systems."
          >
            <p>
              Two construction types matter: <strong>direct-acting</strong> (the plunger IS the
              valve — small bore, low pressure, fast response, used for low-flow water/gas/air
              applications); <strong>pilot-operated or 'servo'</strong> (the plunger opens a tiny
              pilot port, and supply pressure does the work of moving a much bigger main
              diaphragm — used for high-flow water valves and large gas valves where coil power
              alone could never lift the pressure-sealed disc directly).
            </p>
            <p>
              <strong>Inrush vs holding current.</strong> A solenoid coil at the moment of
              switch-on draws several times its steady current — same physics as a contactor coil,
              plus the air gap (plunger fully out) makes the magnetic circuit weak so more
              current is needed to develop the pulling force. Once the plunger is seated, the
              air gap closes and the coil's effective inductance rises sharply, dropping current
              to its steady value. Always size cabling and protective devices for inrush, not
              just steady current.
            </p>
            <p>
              Most modern solenoid valves carry both AC and DC ratings on the body — the same
              coil can often be wound for either, but the rated voltage MUST match. A 24 V DC
              valve on 24 V AC will run hot and may chatter; a 230 V AC valve on 230 V DC will
              burn the coil in seconds (no inductive reactance to limit current).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Latching, time-delay and overload relays — control variants you'll meet on site"
            plainEnglish="The basic 'energise = closed' relay is the start of a family of variants. Latching relays hold their position without continuous coil power. Time-delay relays close (or open) after a programmable delay. Overload relays trip when downstream current exceeds a set value for a sustained period. Together they form most of the small-scale logic in a control panel."
          >
            <p>
              <strong>Latching (impulse) relays</strong> use a mechanical latch (sometimes
              magnetic) to hold the contact in its last commanded state. A short pulse to one
              coil flips them ON; a pulse to the other (or sometimes the same) flips them OFF.
              Used for whole-room corridor lighting where multiple wall switches each toggle the
              same lamp circuit. Saves the cost of two-way and intermediate switching for runs
              over three switch points.
            </p>
            <p>
              <strong>Time-delay relays</strong> come in four flavours: ON-delay (close N seconds
              after energise), OFF-delay (stay closed N seconds after de-energise), interval
              (close on energise, open after N seconds, ignore further input until reset), and
              pulse (output a fixed-width pulse on each input). Found in motor sequencers, fan
              run-on for bathroom extracts, and emergency lighting test cycles.
            </p>
            <p>
              <strong>Thermal overload relays</strong> sit downstream of the contactor and contain
              three small bimetallic strips (one per phase) heated by the load current via a
              small replica winding. Sustained over-current bends the strips, releasing a trip
              mechanism that opens an N/C contact wired in series with the contactor coil —
              contactor drops out, motor stops. Set the dial to between 1.0 and 1.15 × FLA.
              Modern electronic overloads do the same job with a thermistor or current
              transformer plus a microcontroller, with much wider adjustment range and remote
              diagnostics.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60947-4-1:2018 — Low-voltage switchgear: Contactors and motor-starters"
            clause="Contactors shall be classified by utilisation category according to the application duty. The rated operational current I_e shall be marked, together with the rated making and breaking currents for each utilisation category for which the device is intended."
            meaning={
              <>
                The plate on every contactor shows I_e for AC-1, AC-3, AC-4 (often three
                different numbers — same contactor). Pick by the right column. AC-3 23 A means
                23 A in normal motor duty; the same contactor might only be 8 A in AC-4
                reversing duty.
              </>
            }
            cite="Source: BS EN 60947-4-1:2018."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 552.1.3 (Restart prevention)"
            clause="Except where failure to start after a brief interruption would be likely to cause greater danger, every motor shall be provided with means to prevent automatic restarting after a stoppage due to a drop in voltage or failure of supply, where unexpected restarting of the motor might cause danger."
            meaning={
              <>
                The standard contactor circuit — start button momentarily energises the coil, an
                NO auxiliary contact "seals in" the coil voltage so the contactor stays in once
                the start button is released, and a stop button breaks the seal-in path — does
                exactly this. A supply dip drops the coil out, the seal-in opens, and a fresh
                start button press is needed to restart. Hard-wired contactor logic is safer
                than wiring start direct from a switch.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 552.1.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.15.202 (Switching off motors)"
            clause="Every fixed electric motor shall be provided with an efficient means of switching off, readily accessible, easily operated and so placed as to prevent danger."
            meaning={
              <>
                Every motor starter assembly needs a local lockable isolator within sight of the
                machine. Reg 132.15.202 is the rule that distinguishes the contactor (a control
                switch you operate routinely) from the isolator (a safety device you lock-off
                for maintenance). Contactor coils can fail closed; only a physical isolator
                guarantees the motor cannot restart while a worker is on the load.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.15.202."
          />

          <SectionRule />

          <ConceptBlock
            title="DC switching, polarised contactors and why DC is harder than AC"
            plainEnglish="An AC arc extinguishes naturally at every zero crossing — 100 times per second on UK mains. A DC arc has no zero crossing; once it strikes, it persists until something physically interrupts it. That makes DC switching much more arduous, with much lower current ratings on the same physical contactor compared to its AC use."
            onSite="Where you'll meet it: EV charging stations (DC fast chargers), battery storage systems, solar PV string isolators, traction motor controllers, large UPS battery cabinets. Standard AC contactors will burn out within hours on these duties — always specify a DC-rated device matched to the actual voltage and current."
          >
            <p>
              <strong>Polarity matters.</strong> A DC contactor is often POLARISED — the +
              terminal must be connected to one specific side of each pole, marked on the body.
              This is so the magnetic blow-out (a permanent magnet near each contact) drives the
              arc upward into the chute in the correct direction. Reverse polarity and the
              blow-out drives the arc the WRONG way — into the contactor body — and the
              contactor self-destructs on the first switching event under load.
            </p>
            <p>
              <strong>Series-poling for higher voltage.</strong> A 250 V DC contactor cannot
              safely switch 500 V DC even on a half-rated current. The fix used in EV chargers,
              traction control and battery storage: wire several poles in series so each pole
              sees a fraction of the voltage. The arc breaks across each pole's gap simultaneously
              and is much easier to extinguish per-pole. Modern DC contactors for EV charging
              rate themselves at 1000+ V using this approach with 2–4 poles in series.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Sizing a contactor by AC-1 rating for a motor"
            whatHappens={
              <>
                Apprentice picks a 25 A "AC-1" rated contactor for a 22 A motor. Sounds fine —
                until the motor draws 6 × 22 = 132 A inrush every start. Contacts pit, then weld
                closed. Motor runs continuously regardless of stop button.
              </>
            }
            doInstead={
              <>
                Pick by AC-3 (or AC-4 for reversing) for motors. A contactor showing 25 A AC-1
                might only be 11 A AC-3. Always read the right utilisation column for your
                application.
              </>
            }
          />

          <CommonMistake
            title="Wiring a DC coil contactor without a freewheel diode"
            whatHappens={
              <>
                24 V DC coil controlled by a small relay. Every time the relay drops out the coil
                spike (200+ V) arcs across the relay contacts. Within months the relay contacts
                are pitted and welded. Plus a nearby PLC analogue input glitches randomly with
                spurious readings.
              </>
            }
            doInstead={
              <>
                Fit a flyback diode (e.g. 1N4007 for small coils) directly across the coil
                terminals. Cathode to positive supply, anode to negative. The diode clamps the
                spike to ~0.7 V on collapse and protects the rest of the circuit. £0.10 part,
                saves callouts.
              </>
            }
          />

          <Scenario
            title="Selecting a contactor for a 7.5 kW 400 V 3-phase pump"
            situation={
              <>
                FLA ≈ 14 A. DOL start, normal duty (AC-3). Allow for occasional reverse running
                (AC-4 considered). Coil voltage to suit panel control 24 V DC.
              </>
            }
            whatToDo={
              <>
                For DOL start AC-3: 25 A AC-3 contactor (e.g. ABB AF26 or similar). Margin = 25/14
                = 1.78. Adequate.
                <br />
                If AC-4 reversing: derate AC-3 by ~50 % → 50 A AC-3 contactor sized for 25 A AC-4
                duty.
                <br />
                Coil: 24 V DC, current rating per data sheet. Add freewheel diode across coil to
                suppress switch-off spike.
                <br />
                Aux contacts: 1 N/O for "running" lamp + 1 N/C for interlock with the standby
                pump contactor. Seal-in via N/O aux for restart prevention per §552.1.3.
              </>
            }
            whyItMatters={
              <>
                The right utilisation category, properly snubbed, plus appropriate aux contacts
                gives a panel that runs reliably for years. Wrong choice = field call within
                months.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Contactor = power EM switch; relay = small EM switch; solenoid = EM actuator.',
              'Utilisation categories AC-1 (resistive) to AC-4 (reversing motor) — pick correctly.',
              'Coil voltage independent of load — typical 230 V AC or 24 V DC.',
              'Aux contacts for indication and interlock — separate from the main contacts.',
              'Snub inductive coils: RC across coil (AC) or freewheel diode (DC).',
              'BS EN 60947-4-1 governs contactor and motor-starter ratings and duty.',
              'BS 7671 §552.1.3: motor starter logic must prevent automatic restart after supply dip.',
            ]}
          />

          <Quiz title="Contactors, relays and solenoids knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">Section 5</div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Protective devices
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
