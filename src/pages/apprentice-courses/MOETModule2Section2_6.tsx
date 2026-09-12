/**
 * MOET · Module 2 · Section 2.2 · Subsection 6 — Capacitors and Inductors
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical engineering principles: circuit terminology,
 *     Ohm’s Law, transformer theory, and power calculations."
 *   · "Electrical. Functions and applications of electrical circuits."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { RCChargingCurve } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Capacitors and Inductors - MOET Module 2.2.6';
const DESCRIPTION =
  "Comprehensive guide to capacitors and inductors for maintenance technicians: capacitor construction and types (electrolytic, film, ceramic), capacitance (farads), charging/discharging, energy storage, inductor construction, inductance (henries), electromagnetic induction, Faraday's and Lenz's laws, time constants (RC, RL), applications in maintenance (motor capacitors, PFC banks, chokes, filters), and safety considerations under BS 7671 and ST1426.";

const quickCheckQuestions = [
  {
    id: 'capacitor-energy',
    question:
      'A 470 μF capacitor is charged to 400 V DC (as found in a VSD DC bus). What energy is stored?',
    options: ['3.76 J', '0.037 J', '37.6 J', '376 J'],
    correctIndex: 2,
    explanation:
      'Energy stored E = ½CV² = 0.5 x 470x10⁻⁶ x 400² = 0.5 x 0.00047 x 160,000 = 37.6 joules. While this may seem small, 37.6 J delivered in a fraction of a second can cause a severe shock, burns and cardiac arrest. For comparison, a defibrillator delivers approximately 150-360 J — capacitor stored energy is in the same order of magnitude and must be treated with extreme caution.',
  },
  {
    id: 'rc-time-constant',
    question: 'What is the time constant of a 100 μF capacitor charging through a 10 kΩ resistor?',
    options: ['10 seconds', '0.1 seconds', '0.001 seconds', '1 second'],
    correctIndex: 3,
    explanation:
      'The RC time constant τ = R x C = 10,000 x 100x10⁻⁶ = 1 second. After one time constant, the capacitor charges to 63.2% of the supply voltage. After five time constants (5 seconds), the capacitor is considered fully charged (99.3%). The time constant is critical for understanding how quickly circuits respond and how long capacitors take to discharge to a safe voltage.',
  },
  {
    id: 'faraday-law',
    question:
      "Faraday's law of electromagnetic induction states that the induced EMF is proportional to:",
    options: [
      'The rate of change of magnetic flux linkage',
      'The strength of the magnetic field',
      'The resistance of the conductor',
      'The temperature of the inductor',
    ],
    correctIndex: 0,
    explanation:
      "Faraday's law states: e = -N(dΦ/dt) — the induced EMF equals the negative of the number of turns multiplied by the rate of change of magnetic flux. The faster the flux changes, the greater the induced EMF. This is the fundamental principle behind generators, transformers, inductors and all electromagnetic energy conversion devices.",
  },
  {
    id: 'lenz-law',
    question: "Lenz's law states that the direction of an induced current is always such that it:",
    options: [
      'Is independent of the change producing it',
      'Supports the change producing it',
      'Doubles the change producing it',
      'Opposes the change producing it',
    ],
    correctIndex: 3,
    explanation:
      "Lenz's law states that an induced current always flows in a direction that opposes the change that produced it. This is a consequence of energy conservation — if the induced current supported the change, a self-sustaining system would create energy from nothing. Lenz's law explains why inductors oppose changes in current and why back-EMF is generated in motors.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The unit of capacitance is the:',
    options: ['Henry (H)', 'Farad (F)', 'Ohm (Ω)', 'Weber (Wb)'],
    correctAnswer: 1,
    explanation:
      'The unit of capacitance is the farad (F), named after Michael Faraday. One farad is the capacitance that stores one coulomb of charge at a potential difference of one volt. In practice, one farad is an extremely large capacitance — typical values range from picofarads (pF, 10⁻¹²) for ceramic capacitors to millifarads (mF, 10⁻³) for large electrolytic capacitors. Supercapacitors can reach several farads.',
  },
  {
    id: 2,
    question: 'Which type of capacitor is polarised and must be connected with correct polarity?',
    options: [
      'Metallised polypropylene film capacitor',
      'Ceramic disc capacitor',
      'Electrolytic capacitor (aluminium or tantalum)',
      'Mica capacitor',
    ],
    correctAnswer: 2,
    explanation:
      'Electrolytic capacitors (both aluminium and tantalum types) are polarised — they have a positive and negative terminal that must be connected correctly. The dielectric in an electrolytic capacitor is a thin oxide layer formed electrochemically, and it only functions as an insulator in one direction. Reverse polarity can destroy the oxide layer, causing a short circuit, overheating and potentially explosive failure.',
  },
  {
    id: 3,
    question: 'The energy stored in a capacitor is given by:',
    options: ['E = C²V', 'E = CV', 'E = ½C²V', 'E = ½CV²'],
    correctAnswer: 3,
    explanation:
      'The energy stored in a capacitor is E = ½CV², where C is the capacitance in farads and V is the voltage across the capacitor. Note that the energy increases with the square of the voltage — doubling the voltage quadruples the stored energy. This is why high-voltage capacitors (such as those in VSDs and power supplies) store dangerous amounts of energy.',
  },
  {
    id: 4,
    question: 'The unit of inductance is the:',
    options: ['Henry (H)', 'Farad (F)', 'Tesla (T)', 'Siemens (S)'],
    correctAnswer: 0,
    explanation:
      'The unit of inductance is the henry (H), named after Joseph Henry. One henry is the inductance that produces an EMF of one volt when the current changes at a rate of one ampere per second. Typical values: millihenries (mH) for motor windings and chokes, microhenries (μH) for filter inductors, and henries (H) for large power inductors.',
  },
  {
    id: 5,
    question: 'When a capacitor is fully charged in a DC circuit, the current through it is:',
    options: [
      'At its maximum value (the capacitor acts as a short circuit to DC)',
      'Zero (the capacitor acts as an open circuit to DC)',
      'Equal to the supply voltage divided by the capacitance',
      'Constant and limited only by the series resistance',
    ],
    correctAnswer: 1,
    explanation:
      'Once a capacitor is fully charged, the voltage across it equals the supply voltage and no further current flows — the capacitor acts as an open circuit to DC. This is because there is no potential difference to drive current. In an AC circuit, the continuously changing voltage causes a continuously changing charge and therefore a continuous current — this is why capacitors pass AC but block DC.',
  },
  {
    id: 6,
    question: 'A motor start capacitor is used to:',
    options: [
      'Smooth the rectified DC supply feeding the motor windings',
      'Limit the inrush current drawn by the motor at start-up',
      'Create a phase shift to produce a rotating magnetic field for starting a single-phase motor',
      'Correct the power factor of the motor during normal running',
    ],
    correctAnswer: 2,
    explanation:
      'Single-phase induction motors cannot produce a rotating magnetic field from a single-phase supply alone. A start capacitor is connected in series with an auxiliary (start) winding. The capacitor shifts the current in the start winding by approximately 90 degrees relative to the main winding current, creating a two-phase effect that produces a rotating magnetic field for starting. Once the motor reaches speed, a centrifugal switch typically disconnects the start capacitor.',
  },
  {
    id: 7,
    question: 'The RL time constant of a circuit with L = 2 H and R = 100 Ω is:',
    options: ['0.002 seconds', '200 seconds', '0.2 seconds', '0.02 seconds'],
    correctAnswer: 3,
    explanation:
      'The RL time constant τ = L/R = 2/100 = 0.02 seconds (20 ms). After one time constant, the current in an RL circuit reaches 63.2% of its final value when energising, or decays to 36.8% of its initial value when de-energising. After five time constants (0.1 seconds), the current is considered to have reached its steady-state value.',
  },
  {
    id: 8,
    question: 'When an inductor carrying current is suddenly disconnected, what happens?',
    options: [
      'The inductor generates a high back-EMF voltage spike as the magnetic field collapses',
      'The current continues to flow at the same level for several seconds',
      'The stored energy is harmlessly absorbed by the winding resistance',
      'The voltage across the inductor immediately drops to zero',
    ],
    correctAnswer: 0,
    explanation:
      "An inductor stores energy in its magnetic field (E = ½LI²). When the current is suddenly interrupted, the magnetic field collapses rapidly, inducing a very high voltage spike across the inductor (by Faraday's law: e = -L(dI/dt)). This back-EMF can be hundreds or thousands of volts and can damage contacts, semiconductors and insulation. Suppression devices (snubbers, flyback diodes, varistors) are used to protect against these voltage spikes.",
  },
  {
    id: 9,
    question:
      "A 'snubber' or freewheeling protection across a DC relay coil typically consists of:",
    options: [
      'A high-value resistor connected in series with the coil',
      'A diode connected in reverse across the coil (flyback diode)',
      'An electrolytic capacitor connected in series with the supply',
      'A fuse rated below the coil operating current',
    ],
    correctAnswer: 1,
    explanation:
      'A flyback (freewheeling) diode is connected in reverse across an inductive load such as a relay coil. Under normal operation, the diode is reverse-biased and does nothing. When the coil is de-energised, the collapsing magnetic field reverses the voltage polarity, forward-biasing the diode and allowing the stored energy to dissipate as current circulating through the coil resistance and the diode — safely absorbing the energy without producing a damaging voltage spike.',
  },
  {
    id: 10,
    question: 'Capacitors connected in parallel have a total capacitance of:',
    options: [
      'C_total equals the smallest capacitor',
      '1/C_total = 1/C₁ + 1/C₂ + 1/C₃ (reciprocal sum)',
      'C_total = C₁ + C₂ + C₃ (arithmetic sum)',
      'C_total = C₁ x C₂ / (C₁ + C₂)',
    ],
    correctAnswer: 2,
    explanation:
      'Capacitors in parallel add directly: C_total = C₁ + C₂ + C₃. This is the opposite of resistors (which add in series). Parallel connection increases the total capacitance and is used in PFC capacitor banks to build up the required kVAr rating from standard-sized capacitor units. In series, the reciprocal formula applies: 1/C_total = 1/C₁ + 1/C₂.',
  },
  {
    id: 11,
    question:
      'Which of the following is a safety hazard specific to capacitors that has no equivalent for resistors?',
    options: [
      'Heat generated by current flowing through the component',
      'Voltage drop developed across the component under load',
      'Mechanical vibration caused by alternating current',
      'Stored electrical energy that persists after the supply is disconnected',
    ],
    correctAnswer: 3,
    explanation:
      'Capacitors store electrical energy in their electric field, and this energy remains after the supply is disconnected. A charged capacitor can deliver a dangerous shock minutes, hours or even days after disconnection — unlike a resistor, which dissipates all energy as heat immediately. This is why capacitors in power supplies, VSDs and PFC banks must be verified as discharged before any maintenance work begins.',
  },
  {
    id: 12,
    question: 'Inductors connected in series (with no mutual coupling) have a total inductance of:',
    options: [
      'L_total = L₁ + L₂ + L₃ (arithmetic sum)',
      'L_total equals the largest inductor',
      'L_total = L₁ x L₂ / (L₁ + L₂)',
      '1/L_total = 1/L₁ + 1/L₂ + 1/L₃ (reciprocal sum)',
    ],
    correctAnswer: 0,
    explanation:
      'Inductors in series add directly: L_total = L₁ + L₂ + L₃ (assuming no mutual coupling between them). This is the same rule as resistors in series. In parallel (with no mutual coupling), the reciprocal formula applies: 1/L_total = 1/L₁ + 1/L₂. If there is mutual coupling between inductors, the mutual inductance must also be considered.',
  },
];

const faqs = [
  {
    question: 'How long should I wait before touching capacitors inside a VSD?',
    answer:
      "Follow the manufacturer's specified discharge time — typically 5-15 minutes for industrial VSDs. The DC bus capacitors in a standard 400 V VSD can store 10-50 joules of energy. Even after the specified time, always verify the voltage with a suitable instrument (rated for DC, CAT III minimum) before touching any internal components. Never rely solely on internal bleeder resistors — they can fail open-circuit. Some VSDs have a 'charge' indicator LED that extinguishes when the DC bus voltage drops below a safe level.",
  },
  {
    question: 'What causes a motor run capacitor to fail?',
    answer:
      'Motor run capacitors (typically metallised polypropylene film) fail for several reasons: age-related degradation of the dielectric film (typical life: 5-10 years in continuous service), overheating from excessive ambient temperature or inadequate ventilation, overvoltage transients from supply disturbances or switching, and harmonic voltages from VSD-controlled circuits. Symptoms of a failing motor capacitor include: reduced starting torque, motor humming but not starting, motor running slowly or overheating, and tripping of the motor protection device.',
  },
  {
    question: 'Why do inductors get hot during operation?',
    answer:
      'Inductors generate heat from two main sources. First, the copper winding resistance causes I²R (copper) losses — this is the same heating mechanism as in any resistor. Second, the magnetic core (if present) generates losses from eddy currents (circulating currents induced in the core by the changing magnetic field) and hysteresis (energy lost in magnetising and demagnetising the core material each cycle). Core losses increase with frequency, which is why inductors carrying harmonic currents run hotter than expected. Laminated silicon steel cores minimise eddy current losses; ferrite cores are used at higher frequencies.',
  },
  {
    question:
      'What is the difference between a start capacitor and a run capacitor on a single-phase motor?',
    answer:
      'A start capacitor is a high-capacitance (typically 50-300 μF) electrolytic capacitor used only during starting — it is disconnected by a centrifugal switch or timer relay once the motor reaches approximately 75% of full speed. It provides a large phase shift and high starting torque. A run capacitor is a lower-capacitance (typically 5-50 μF) metallised film capacitor that remains in circuit permanently. It provides a smaller but continuous phase shift to improve running efficiency, power factor and reduce vibration. Some motors use both (capacitor-start, capacitor-run).',
  },
  {
    question: 'Can I replace a capacitor with one of a different voltage rating?',
    answer:
      'You can safely replace a capacitor with one of a higher voltage rating — it simply has a greater safety margin. Never replace with a lower voltage rating, as the capacitor may fail catastrophically when the working voltage exceeds its rating. For capacitance value, always match the original specification. Using a significantly different capacitance in a motor circuit will alter the phase shift and affect starting torque, running current and efficiency. In PFC applications, the capacitance directly determines the kVAr rating and must match the system design.',
  },
];

const MOETModule2Section2_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.2 · Subsection 6"
        title="Capacitors and Inductors"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding energy storage components, electromagnetic induction and their
            applications in electrical maintenance.
          </p>

          <TLDR
            points={[
              'Capacitors store energy in an electric field (E = ½CV²).',
              'Inductors store energy in a magnetic field (E = ½LI²).',
              'RC time constant τ = R x C (seconds).',
              'RL time constant τ = L / R (seconds).',
            ]}
          />

          <ConceptBlock title="Maintenance applications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor capacitors:</strong> Start and run types for single-phase motors.
              </li>
              <li>
                <strong>PFC banks:</strong> Power factor correction capacitor installations.
              </li>
              <li>
                <strong>Chokes:</strong> Line reactors for VSD harmonic reduction.
              </li>
              <li>
                <strong>Filters:</strong> EMC/RFI filtering in electronic equipment.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Describe capacitor construction, types and their applications in electrical maintenance',
              'Calculate capacitor energy storage, charge and RC time constants',
              "Explain electromagnetic induction using Faraday's law and Lenz's law",
              'Describe inductor construction, types and the RL time constant',
              'Identify practical applications of capacitors and inductors in maintenance',
              'Implement safety procedures for working with stored energy in capacitors and inductors',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Capacitor construction, types and characteristics</ContentEyebrow>

          <ConceptBlock title="Energy stored in an electric field">
            <p>
              A capacitor is a passive component that stores electrical energy in an electric field
              between two conducting plates separated by an insulating material (the dielectric).
              When voltage is applied, electrons accumulate on one plate and are depleted from the
              other, creating a charge difference. The ability to store charge is called
              capacitance, measured in farads (F). In practice, most capacitors have values from
              picofarads (pF) to millifarads (mF).
            </p>
            <p>
              Capacitance depends on three factors: the area of the plates (larger area = more
              capacitance), the distance between the plates (closer = more capacitance), and the
              dielectric material (higher permittivity = more capacitance). The formula is: C =
              ε₀εᵣA/d, where ε₀ is the permittivity of free space, εᵣ is the relative permittivity
              of the dielectric, A is the plate area and d is the plate separation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common capacitor types in maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Aluminium electrolytic:</strong> High capacitance (1 μF - 100,000 μF),
                polarised. Used in power supply smoothing, VSD DC bus, UPS systems. Limited life
                (typically 2,000-10,000 hours at rated temperature). Fails by drying out —
                capacitance decreases, ESR increases.
              </li>
              <li>
                <strong>Metallised polypropylene film:</strong> Self-healing, non-polarised,
                excellent for AC applications. Used in motor run capacitors, PFC banks and snubber
                circuits. Good temperature stability and long life (50,000+ hours).
              </li>
              <li>
                <strong>Ceramic:</strong> Small physical size, non-polarised. Types: NP0/C0G
                (stable, precise — used in timing circuits), X7R (moderate stability — general
                purpose), Y5V (high capacitance but poor stability). Used in EMC filtering,
                decoupling and high-frequency applications.
              </li>
              <li>
                <strong>Tantalum electrolytic:</strong> Smaller than aluminium electrolytic for the
                same capacitance. Polarised. Used in electronic control boards. Can fail
                catastrophically (short circuit and fire) if overvoltaged or reverse-polarised.
              </li>
              <li>
                <strong>Supercapacitors (EDLC):</strong> Very high capacitance (1-3000 F) but low
                voltage (2.5-2.7 V per cell). Used in energy storage, regenerative braking, UPS
                ride-through. Series strings required for higher voltages.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Capacitor charging and discharging">
            <p>
              When a capacitor charges through a resistor, the voltage rises exponentially according
              to the RC time constant:
            </p>
            <div className="rounded bg-white/5 p-3 text-center font-mono text-sm">
              τ = R x C (seconds)
            </div>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1τ:</strong> Capacitor charges to 63.2% of supply voltage (or discharges to
                36.8%).
              </li>
              <li>
                <strong>2τ:</strong> 86.5% charged (13.5% remaining on discharge).
              </li>
              <li>
                <strong>3τ:</strong> 95.0% charged (5.0% remaining).
              </li>
              <li>
                <strong>4τ:</strong> 98.2% charged (1.8% remaining).
              </li>
              <li>
                <strong>5τ:</strong> 99.3% charged — considered fully charged (0.7% remaining).
              </li>
            </ul>
          </ConceptBlock>

          <RCChargingCurve mode="charge" />

          <CommonMistake
            title="Assuming stored charge is trivial once the supply is off"
            whatHappens={
              <>
                Capacitors present a unique and serious safety hazard because they retain stored
                energy after the supply is disconnected. E = ½CV² — a 1,000 μF capacitor at 400 V
                stores 80 J, enough to cause fatal injury. Discharge time depends on the discharge
                resistance: internal bleeder resistors may take 1-10 minutes, but if the bleeder
                resistor fails (open circuit), the capacitor can remain charged indefinitely.
              </>
            }
            doInstead={
              <>
                Always measure the voltage across the capacitor terminals with a suitable DC
                voltmeter before handling — do not rely on the bleeder circuit alone. If manual
                discharge is required, use an insulated discharge tool (resistor with insulated
                probes) — never short-circuit a charged capacitor directly (explosive discharge,
                contact welding, component damage). Under BS EN 60831, PFC capacitors must discharge
                to below 50 V within one minute of disconnection.
              </>
            }
          />

          <ConceptBlock title="Voltage rating">
            <p>
              The voltage rating on a capacitor is the maximum continuous voltage it can withstand.
              Exceeding this rating, even briefly, can cause dielectric breakdown, short circuit and
              potentially explosive failure — particularly for electrolytic capacitors. Always
              replace capacitors with the same or higher voltage rating.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Inductors, electromagnetic induction and stored energy</ContentEyebrow>

          <ConceptBlock title="Energy stored in a magnetic field">
            <p>
              An inductor is a passive component that stores energy in a magnetic field when current
              flows through it. The simplest inductor is a coil of wire — when current flows, it
              creates a magnetic field around the coil. Winding the coil on a magnetic core (iron,
              ferrite) greatly increases the inductance by concentrating and amplifying the magnetic
              flux. The unit of inductance is the henry (H).
            </p>
            <p>
              Inductors are governed by two fundamental laws of electromagnetic induction:
              Faraday&apos;s law (the magnitude of induced EMF is proportional to the rate of change
              of magnetic flux linkage) and Lenz&apos;s law (the direction of induced EMF opposes
              the change producing it). Together, these laws explain why inductors oppose changes in
              current — a property that is both useful (in filters, chokes and transformers) and
              potentially hazardous (back-EMF voltage spikes).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Faraday's and Lenz's laws">
            <div className="rounded bg-white/5 p-3 text-center font-mono text-sm">
              e = -N(dΦ/dt)
            </div>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>e</strong> = induced EMF (volts)
              </li>
              <li>
                <strong>N</strong> = number of turns in the coil
              </li>
              <li>
                <strong>dΦ/dt</strong> = rate of change of magnetic flux (webers per second)
              </li>
              <li>
                <strong>Negative sign</strong> = Lenz&apos;s law — induced EMF opposes the change
              </li>
              <li>
                <strong>Practical consequence:</strong> An inductor opposes any increase in current
                (self-induced back-EMF) and opposes any decrease in current (maintaining current
                flow through any available path)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Inductor types in maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air-core inductors:</strong> No magnetic core. Linear characteristics (no
                saturation). Used in high-frequency filters and tuned circuits. Low inductance
                values.
              </li>
              <li>
                <strong>Iron-core inductors (chokes):</strong> Laminated silicon steel core. High
                inductance. Used as line reactors for VSDs, DC smoothing chokes, motor starting
                reactors. Subject to core saturation at high currents.
              </li>
              <li>
                <strong>Ferrite-core inductors:</strong> High-frequency magnetic material. Used in
                switch-mode power supplies, EMC filters and high-frequency chokes. Low eddy current
                losses at high frequencies.
              </li>
              <li>
                <strong>Toroidal inductors:</strong> Doughnut-shaped core containing all magnetic
                flux within the core. Minimal stray field, compact, efficient. Used in audio
                equipment, medical devices and sensitive applications.
              </li>
              <li>
                <strong>Motor windings:</strong> Every motor winding is an inductor — it stores
                energy in its magnetic field. The inductance determines the motor&apos;s impedance,
                starting current and power factor.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="RL time constant and energy storage">
            <p>
              When an inductor is energised through a resistor, the current rises exponentially:
            </p>
            <div className="rounded bg-white/5 p-3 text-center font-mono text-sm">
              τ = L / R (seconds) &nbsp;&nbsp;|&nbsp;&nbsp; E = ½LI² (joules)
            </div>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1τ:</strong> Current rises to 63.2% of final value (I = V/R).
              </li>
              <li>
                <strong>5τ:</strong> Current reaches 99.3% — considered at steady state.
              </li>
              <li>
                <strong>Energy:</strong> E = ½LI². A 1 H inductor carrying 10 A stores 50 J of
                energy.
              </li>
              <li>
                <strong>Decay:</strong> When disconnected, current decays exponentially — but the
                rapid decay generates a high voltage spike (Lenz&apos;s law).
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> The energy stored in an inductor&apos;s magnetic field is
              released when the current is interrupted. Unlike a capacitor (where the stored energy
              is proportional to V²), the inductor&apos;s energy is proportional to I². High-current
              inductive circuits (motor contactors, relay coils, solenoid valves) can generate
              significant back-EMF spikes when switched off.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Time constants and transient behaviour</ContentEyebrow>

          <ConceptBlock title="An exponential curve, not an instant change">
            <p>
              When a circuit containing capacitors or inductors is switched on or off, the voltages
              and currents do not change instantaneously — they follow an exponential curve
              described by the time constant. Understanding time constants is essential for
              predicting how quickly circuits respond to changes, how long capacitors take to charge
              or discharge, and how long it takes for current to build up in inductive circuits.
            </p>
          </ConceptBlock>

          <ConceptBlock title="RC and RL time constants compared">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Property</th>
                    <th className="border border-white/10 px-3 py-2 text-left">RC Circuit</th>
                    <th className="border border-white/10 px-3 py-2 text-left">RL Circuit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Time constant</td>
                    <td className="border border-white/10 px-3 py-2">τ = RC</td>
                    <td className="border border-white/10 px-3 py-2">τ = L/R</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Energy stored</td>
                    <td className="border border-white/10 px-3 py-2">E = ½CV² (electric field)</td>
                    <td className="border border-white/10 px-3 py-2">E = ½LI² (magnetic field)</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">On energising</td>
                    <td className="border border-white/10 px-3 py-2">
                      Voltage rises exponentially
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Current rises exponentially
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">On de-energising</td>
                    <td className="border border-white/10 px-3 py-2">
                      Voltage decays exponentially
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Current decays exponentially
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Hazard</td>
                    <td className="border border-white/10 px-3 py-2">Stored charge — shock risk</td>
                    <td className="border border-white/10 px-3 py-2">Back-EMF voltage spike</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">To increase τ</td>
                    <td className="border border-white/10 px-3 py-2">Increase R or C</td>
                    <td className="border border-white/10 px-3 py-2">Increase L or decrease R</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Fully settled</td>
                    <td className="border border-white/10 px-3 py-2">5τ (99.3%)</td>
                    <td className="border border-white/10 px-3 py-2">5τ (99.3%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Practical time constant examples">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VSD DC bus capacitor discharge:</strong> C = 1000 μF, bleeder R = 100 kΩ. τ
                = 100 s. To discharge to less than 50 V from 565 V (peak of 400 V): requires
                approximately 5τ = 500 s (8.3 minutes). This explains why manufacturer discharge
                times are typically 5-15 minutes.
              </li>
              <li>
                <strong>Motor start circuit:</strong> L = 0.5 H, R = 5 Ω. τ = 0.1 s. Current reaches
                99% of steady-state in 0.5 s. This matches the typical motor starting time for a
                small motor.
              </li>
              <li>
                <strong>EMC filter:</strong> C = 100 nF, R = 1 MΩ. τ = 0.1 s. Filter capacitors
                discharge to safe levels within about 0.5 s — relatively fast.
              </li>
              <li>
                <strong>PFC bank discharge:</strong> C = 50 μF, bleeder R = 1 MΩ. τ = 50 s. Must
                discharge to below 50 V within 60 s per BS EN 60831 — this design meets the
                requirement.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> When replacing capacitors in power supplies, VSDs or
              PFC equipment, calculate the discharge time constant to determine how long you must
              wait before it is safe to work inside the equipment. If the bleeder resistor has
              failed, the capacitor may be fully charged even after extended periods — always
              measure before touching.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Practical applications in electrical maintenance</ContentEyebrow>

          <ConceptBlock title="Found throughout electrical installations">
            <p>
              Capacitors and inductors are found throughout electrical installations — from motor
              circuits and power supplies to EMC filters and protection devices. As a maintenance
              technician, you will encounter these components regularly and must understand their
              function, common failure modes and replacement procedures.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Capacitor applications in maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor start/run capacitors:</strong> Create phase shift for single-phase
                motor starting and running. Common failure — motor hums but does not start. Test
                with capacitance meter — reading should be within ±10% of rated value.
              </li>
              <li>
                <strong>PFC capacitor banks:</strong> Correct lagging power factor. Automatic
                switching by PFC controller. Common failures: capacitor swelling, fuse blowing,
                contactor wear. Annual thermographic survey recommended.
              </li>
              <li>
                <strong>Power supply smoothing:</strong> Large electrolytic capacitors in power
                supplies and VSD DC buses. Failure causes increased ripple, equipment malfunction,
                audible hum. ESR (equivalent series resistance) increases with age — measurable with
                ESR meter.
              </li>
              <li>
                <strong>Snubber circuits:</strong> RC networks across switch contacts to suppress
                arcing and voltage transients. Failure causes contact erosion, interference and
                premature switch failure.
              </li>
              <li>
                <strong>EMC/RFI filters:</strong> Capacitors (typically Y-class safety capacitors)
                in mains filters to suppress conducted electromagnetic interference. Must be X/Y
                rated for safety.
              </li>
              <li>
                <strong>Surge protection devices (SPDs):</strong> Metal oxide varistors (MOV) and
                gas discharge tubes work on capacitive/energy-absorption principles to divert
                transient overvoltages.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Inductor applications in maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VSD line reactors (chokes):</strong> Series inductors on VSD input to reduce
                harmonic current distortion by 30-50%. Typically 3-5% impedance. Check for core
                vibration (loose laminations), overheating and insulation degradation.
              </li>
              <li>
                <strong>DC smoothing chokes:</strong> In DC power supplies and battery chargers.
                Smooth the pulsating DC from the rectifier. Check for core saturation (reduced
                effectiveness) and winding insulation.
              </li>
              <li>
                <strong>Motor windings:</strong> Every motor stator and rotor winding is an
                inductor. Insulation resistance testing (meggering), surge testing and winding
                resistance testing are standard maintenance procedures.
              </li>
              <li>
                <strong>Transformer windings:</strong> Primary and secondary windings are coupled
                inductors. Maintenance includes oil testing (for oil-filled types), insulation
                resistance testing, turns ratio testing and winding resistance testing.
              </li>
              <li>
                <strong>Relay and contactor coils:</strong> Electromagnetic coils that produce the
                magnetic force to operate the switching mechanism. Failure modes include coil
                burnout (open circuit), insulation breakdown and mechanical wear.
              </li>
              <li>
                <strong>Fluorescent lamp ballasts:</strong> Choke ballasts in older fluorescent
                fittings (magnetic ballasts). Common failure — lamp flickers, hums or does not
                start. Being replaced by electronic ballasts in LED retrofits.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Testing capacitors and inductors">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capacitance test:</strong> Use a capacitance meter or multimeter with
                capacitance function. Compare reading to rated value — should be within ±10%. Ensure
                capacitor is fully discharged before testing.
              </li>
              <li>
                <strong>ESR test:</strong> An ESR (equivalent series resistance) meter measures the
                internal resistance of a capacitor. High ESR indicates degradation (dried-out
                electrolyte). ESR should be below the manufacturer&apos;s specified maximum.
              </li>
              <li>
                <strong>Insulation resistance:</strong> Test between capacitor terminals and
                case/chassis with an insulation resistance tester at an appropriate voltage. Minimum
                2 MΩ for LV capacitors.
              </li>
              <li>
                <strong>Inductance test:</strong> Use an LCR meter to measure inductance. Compare to
                rated value. Low readings may indicate shorted turns.
              </li>
              <li>
                <strong>Winding resistance:</strong> Measure with a low-resistance ohmmeter. Compare
                between phases (for three-phase equipment) — a significant imbalance indicates a
                winding fault. Compare to previous measurements for trend analysis.
              </li>
              <li>
                <strong>Visual inspection:</strong> Look for swelling, leaking, discolouration
                (capacitors), insulation damage, burn marks and overheating signs (inductors).
              </li>
            </ul>
            <p>
              <strong>ST1426 link:</strong> The maintenance technician standard requires the ability
              to identify, test and replace capacitors and inductors in electrical equipment.
              Understanding the function of these components and the safety procedures for working
              with stored energy is essential for safe and competent maintenance practice.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Safety summary — working with stored energy</ContentEyebrow>

          <ConceptBlock title="Capacitor safety checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Isolate the supply and lock off before accessing equipment containing capacitors.
              </li>
              <li>
                Wait the manufacturer&apos;s specified discharge time (typically 5-15 minutes for
                VSDs).
              </li>
              <li>
                Verify discharge by measuring DC voltage across capacitor terminals with a CAT-rated
                multimeter.
              </li>
              <li>
                If voltage is still present, discharge using an insulated discharge tool (never
                short-circuit directly).
              </li>
              <li>Re-verify zero voltage before handling.</li>
              <li>
                When replacing, ensure the new capacitor matches the voltage and capacitance ratings
                (voltage may be higher, never lower).
              </li>
              <li>Observe correct polarity for electrolytic capacitors.</li>
              <li>
                Dispose of failed capacitors according to waste regulations (some contain PCBs or
                hazardous materials).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Inductor safety checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Be aware that de-energising inductive circuits produces voltage spikes — ensure
                adequate suppression is in place.
              </li>
              <li>
                Do not disconnect inductive loads under current without appropriate switching
                devices (contactors, circuit breakers).
              </li>
              <li>
                Motor windings retain residual magnetism — a motor can generate voltage if the shaft
                is rotated externally.
              </li>
              <li>
                Large inductors (transformers, reactors) may generate significant electromagnetic
                fields — pacemaker hazard. Maintain safe distances as specified by manufacturer.
              </li>
              <li>
                Check for hot surfaces on chokes and inductors before handling — core losses cause
                significant heating under load.
              </li>
              <li>
                When replacing relay/contactor coils, ensure suppression devices (flyback diodes, RC
                snubbers) are also checked and replaced if necessary.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=KSylo01n5FY"

            title="Inductors Explained — How Inductors Work"

            channel="The Engineering Mindset"

            duration="10:20"

            topic="How an inductor stores energy in a magnetic field, and why it opposes change"

            caption="Pairs with the RC curve above — the inductive half of the same story."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The voltage rating on a capacitor is the maximum continuous voltage it can withstand — exceeding it, even briefly, can cause explosive failure. Always replace like-for-like or higher voltage, never lower.',
              "The energy stored in an inductor's magnetic field is proportional to I² (not V² as for a capacitor) — high-current inductive circuits can generate significant back-EMF spikes when switched off.",
              'When replacing capacitors in power supplies, VSDs or PFC equipment, calculate the discharge time constant to know how long you must wait before it is safe to work inside.',
              'The maintenance technician standard requires the ability to identify, test and replace capacitors and inductors, and to work safely with the stored energy they hold.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Capacitors and Inductors"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section2-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Reactance, Impedance and Power Factor
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section3-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Transformers: Principles and Applications
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section2_6;
