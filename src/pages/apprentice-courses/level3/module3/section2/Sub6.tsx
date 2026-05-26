/**
 * Module 3 · Section 2 · Subsection 6 — Transient response: RC and RL time constants (AC 2.1, 2.2)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.1, 2.2
 *
 * Layered depth: builds on 2357 Unit 609 ELTK08 / AC 7.1, 7.2 (R, L, C, impedance)
 *
 * What happens at the moment a switch closes? Capacitors charge/discharge exponentially;
 * inductors current ramps. The time constant τ tells you how long. Behind RCD trip
 * timing, contactor coil release sparks, EMI snubber design.
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
import { RCChargingCurve } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Transient response — RC and RL time constants | Level 3 Module 3.2.6 | Elec-Mate';
const DESCRIPTION =
  'τ = RC for capacitors; τ = L/R for inductors. Exponential charge/discharge curves. Why a contactor sparks on disconnect and how snubbers fix it.';

const checks = [
  {
    id: 'l3-m3-2-6-rc-tau',
    question:
      'A 100 μF capacitor charging through a 10 kΩ resistor. Time constant τ:',
    options: [
      '10 ms',
      '100 ms',
      '1 s',
      '10 s',
    ],
    correctIndex: 2,
    explanation:
      'τ = RC = 10 000 × 100 × 10⁻⁶ = 1.0 s. After one time constant, capacitor reaches 63 % of final voltage; after 5τ it\'s effectively fully charged.',
  },
  {
    id: 'l3-m3-2-6-rl-tau',
    question: 'A 0.5 H inductor in series with 100 Ω. Time constant τ_L:',
    options: [
      '0.005 s',
      '50 ms',
      '5 s',
      '5 ms',
    ],
    correctIndex: 3,
    explanation:
      'τ = L/R = 0.5 / 100 = 0.005 s = 5 ms. Inductor current rises to 63 % of final value in 5 ms; effectively final after 25 ms.',
  },
  {
    id: 'l3-m3-2-6-charge',
    question:
      'A 12 V supply charges a capacitor through R = 1 kΩ, C = 1000 μF. Voltage across the cap after one time constant:',
    options: [
      '0 V',
      '4.4 V',
      '7.6 V',
      '12 V',
    ],
    correctIndex: 2,
    explanation:
      'After 1τ, V = V_max × (1 − e⁻¹) = 12 × 0.632 = 7.58 V ≈ 7.6 V. After 2τ → 10.4 V. After 5τ → ~11.92 V (near full).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The time constant τ for an RC circuit equals:',
    options: [
      'R / C',
      'R × C',
      'R + C',
      'C / R',
    ],
    correctAnswer: 1,
    explanation: 'τ = RC, with R in ohms and C in farads, gives τ in seconds.',
  },
  {
    id: 2,
    question: 'The time constant τ for an RL circuit equals:',
    options: [
      'R / L',
      'R × L',
      'L / R',
      'L + R',
    ],
    correctAnswer: 2,
    explanation: 'τ = L / R for an inductor in series with R.',
  },
  {
    id: 3,
    question:
      'After one time constant, a charging capacitor reaches what percentage of final voltage?',
    options: [
      '50 %',
      '37 %',
      '99 %',
      '63 %',
    ],
    correctAnswer: 3,
    explanation:
      'V(τ) = V_max × (1 − e⁻¹) = V_max × 0.632. So 63.2 % at one time constant. At 5τ, you\'re at 99.3 % — effectively full.',
  },
  {
    id: 4,
    question: 'After one time constant, a discharging capacitor falls to what fraction of initial?',
    options: [
      '37 %',
      '50 %',
      '63 %',
      '13 %',
    ],
    correctAnswer: 0,
    explanation:
      'V(τ) = V_0 × e⁻¹ = V_0 × 0.368. So 36.8 % left after one time constant.',
  },
  {
    id: 5,
    question: 'Why does opening a contactor coil produce a spark?',
    options: [
      'A detailed assessment focused on a particular activity or operation',
      'The collapsing magnetic field induces a high voltage that arcs across the opening contacts',
      'Members of the public could walk into the tower, attempt to climb it, or be struck by falling objects',
      'For a sensitive performance discussion or a heated disagreement that needs de-escalation',
    ],
    correctAnswer: 1,
    explanation:
      'L × di/dt — the rapid change in current produces a back-EMF that can be hundreds of volts, easily ionising the gap and producing an arc. Snubbers (RC across coil, or freewheel diode for DC) absorb this safely.',
  },
  {
    id: 6,
    question:
      'For practical purposes, a capacitor is considered fully charged after how many time constants?',
    options: [
      '1',
      '2',
      '5',
      '10',
    ],
    correctAnswer: 2,
    explanation:
      "After 5τ, V ≈ 99.3 % of V_max — close enough to call it fully charged.",
  },
  {
    id: 7,
    question:
      'What is the energy stored in a 470 μF capacitor charged to 100 V?',
    options: [
      '0.47 J',
      '47 J',
      '4.7 J',
      '2.35 J',
    ],
    correctAnswer: 3,
    explanation: 'W = ½CV² = 0.5 × 470 × 10⁻⁶ × 10 000 = 2.35 J. Discharge through you would hurt.',
  },
  {
    id: 8,
    question:
      'A capacitor across an AC contactor coil acts as a:',
    options: [
      'Snubber to suppress switch-off transients',
      'A storage tank that previously held chemicals',
      'For compliance and future maintenance reference',
      'BS 7671 IET Wiring Regulations',
    ],
    correctAnswer: 0,
    explanation:
      'The cap (often with a small series resistor — RC snubber) absorbs the energy in the inductance when the contacts open, preventing arcing and contact erosion.',
  },
];

const faqs = [
  {
    question: 'What does "transient" actually mean?',
    answer:
      "A transient is a non-repeating change — usually triggered by a switch operation. The circuit moves from one steady state to another, and during the transition the voltages and currents follow exponential curves. After about 5 time constants, you've effectively reached the new steady state.",
  },
  {
    question: 'Why is the curve exponential?',
    answer:
      "Because the rate of change at any moment is proportional to how far from final you still are. As the capacitor charges, the difference between actual and final voltage shrinks, so the charging current shrinks, so the rate of charging slows. That self-similar behaviour produces an exponential curve.",
  },
  {
    question: 'Why does a freewheel diode go across DC inductive loads?',
    answer:
      "When you open a switch on an inductive load (relay coil, motor, solenoid), the collapsing magnetic field tries to keep the current flowing. The freewheel diode lets the current circulate harmlessly through the inductor and itself, dissipating as heat in the coil resistance. Without it, the back-EMF can hit hundreds of volts and destroy the switching transistor or arc the contacts.",
  },
  {
    question: 'How do RC snubbers help on AC?',
    answer:
      "An RC snubber across switching contacts (or across an inductive load) absorbs the L × di/dt energy as the contacts open. The cap charges quickly through the small series resistor, soaking up what would otherwise become an arc. Used everywhere on AC contactors, motor starters and solenoid valves.",
  },
  {
    question: 'Does transient response matter on standard fixed wiring?',
    answer:
      "On the cable itself, no — 50 Hz is far too slow for transient effects to matter. But on switching events (contactor opens, lightning surge, capacitor bank energising) you absolutely see transients in the kV range. That's why surge protective devices (SPDs) are now mandatory in BS 7671 §443.",
  },
  {
    question: 'How does a capacitor charge through your body if you touch it?',
    answer:
      "Your body is roughly 1-100 kΩ depending on conditions. A charged 470 μF cap at 350 V (a typical mains-rated PSU smoothing cap) discharges through you with τ = RC = 100 000 × 470 × 10⁻⁶ = 47 s — but the peak current at the moment of contact is V/R = 350 / 100 000 = 3.5 mA, climbing to 35 mA on dry palms (1 kΩ). Painful, possibly dangerous. Always discharge bench caps with a bleeder resistor before working on them.",
  },
];

export default function Sub6() {
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
            eyebrow="Module 3 · Section 2 · Subsection 6"
            title="Transient response — RC and RL time constants"
            description="τ = RC, τ = L/R. Exponential charge and discharge. The maths behind contactor sparks, RCD trip timing and surge protection."
            tone="yellow"
          />

          <TLDR
            points={[
              'A circuit changing state (switch closes/opens) goes through a transient before reaching the new steady state.',
              "Time constant τ = RC for capacitors, τ = L/R for inductors. Defines how fast.",
              'After 1τ a charging cap reaches 63 % of final; a discharging cap falls to 37 %. After 5τ ≈ fully done.',
              'Inductive switch-off creates back-EMF L × di/dt — needs freewheel diode (DC) or RC snubber (AC) to suppress.',
              'Energy stored: W = ½CV² in a cap, W = ½LI² in an inductor. Both released on disconnect.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate the time constant τ for RC and RL circuits.',
              'Sketch the charging and discharging exponential curves and state V or I at 1τ and 5τ.',
              'Calculate energy stored in a charged capacitor and a current-carrying inductor.',
              'Explain why opening an inductive circuit produces a back-EMF.',
              'Identify the role of freewheel diodes and RC snubbers in suppressing transients.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The RC time constant</ContentEyebrow>

          <ConceptBlock
            title="Capacitor charging through a resistor"
            plainEnglish="Connect a capacitor to a DC supply through a resistor. The cap doesn't charge instantly — the current is limited by the resistor, and the rate of charging slows as the cap voltage approaches the supply voltage. The resulting curve is exponential."
            onSite="A surge protective device (SPD) uses an MOV across line and earth. Normal voltage = no current. A surge spike charges the MOV's stray capacitance through the supply impedance — but if the SPD's response time τ is comparable to the surge rise time, it diverts the energy to earth before damage. Manufacturers spec response times in nanoseconds for this reason."
          >
            <p>
              <strong>τ = R × C</strong>, in seconds (R in Ω, C in F).
            </p>
            <p>Charging from zero towards V_max:</p>
            <p>
              <strong>v(t) = V_max × (1 − e⁻ᵗ/τ)</strong>
            </p>
            <p>Discharging from V_0 toward zero:</p>
            <p>
              <strong>v(t) = V_0 × e⁻ᵗ/τ</strong>
            </p>
            <p>
              At t = τ: charged to 63 % (or discharged to 37 %).
              <br />
              At t = 2τ: 86 % (or 14 %).
              <br />
              At t = 3τ: 95 % (or 5 %).
              <br />
              At t = 5τ: 99.3 % — effectively done.
            </p>
          </ConceptBlock>

          <RCChargingCurve />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Capacitor charge and discharge — the maths step by step"
            plainEnglish="At any instant, the voltage across a charging capacitor depends on how much charge has already accumulated on the plates. Q = CV, and the current charging the cap is what's left of the supply voltage divided by the resistor. As V rises, the current falls — that self-limiting behaviour gives the exponential."
          >
            <p>
              At t = 0 (switch closes): V_cap = 0, so I_initial = V_supply / R.
              <br />
              As V_cap rises toward V_supply, the voltage across R falls, and current falls
              proportionally.
              <br />
              At t → ∞: V_cap = V_supply, I = 0 (cap fully charged, no current flows).
            </p>
            <p>
              <strong>Q(t) = C × V(t) = Q_max × (1 − e⁻ᵗ/τ)</strong>
              <br />
              <strong>I(t) = (V_supply / R) × e⁻ᵗ/τ</strong>
            </p>
            <p>
              Worked example: 100 μF cap charged through 10 kΩ from a 12 V supply. τ = RC = 1.0 s
              (from Check 1).
              <br />
              At t = 0: I_max = 12 / 10 000 = 1.2 mA.
              <br />
              At t = 1 s (1τ): V_cap = 7.58 V; I = 1.2 × e⁻¹ = 1.2 × 0.368 = 0.44 mA.
              <br />
              At t = 5 s (5τ): V_cap ≈ 11.92 V; I ≈ 0.008 mA — effectively done.
              <br />
              Final stored charge Q = CV = 100 × 10⁻⁶ × 12 = 1.2 mC. Final stored energy W = ½CV²
              = 0.5 × 100 × 10⁻⁶ × 144 = 7.2 mJ.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The RL time constant</ContentEyebrow>

          <ConceptBlock
            title="Inductor current ramp"
            plainEnglish="Apply a DC voltage to an inductor through a resistor. Current can't change instantly — the inductor opposes the rise. Current builds exponentially toward the final value V/R."
          >
            <p>
              <strong>τ = L / R</strong>, in seconds (L in H, R in Ω).
            </p>
            <p>Current building from zero toward I_max = V/R:</p>
            <p>
              <strong>i(t) = I_max × (1 − e⁻ᵗ/τ)</strong>
            </p>
            <p>
              At t = τ: 63 % of I_max. At t = 5τ: ≈ 99 %.
            </p>
            <p>
              When the supply is removed, the current decays from I_0 toward zero through the
              same time constant — but only if there's still a path for the current. Open the
              circuit and the current has to drop to zero in nano-seconds, producing a huge dV/dt
              spike across the open contacts.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <ConceptBlock
            title="Inductor energy storage and discharge"
            plainEnglish="An inductor with current I stores energy W = ½LI² in its magnetic field. Open the circuit and that energy has to go somewhere — through the freewheel diode, into a snubber, or as an arc across the opening contacts."
          >
            <p>
              <strong>W_L = ½ × L × I²</strong> (joules; L in H, I in A)
            </p>
            <p>
              Worked example: an LV solenoid coil L = 2 H carrying I = 0.3 A. Stored energy = 0.5
              × 2 × 0.09 = 0.09 J. Released as a 5 ms inductive transient = 18 W average power
              (small but capable of producing kilovolt spikes for microseconds — quite enough to
              kill a transistor or pit a contactor face).
            </p>
            <p>
              Compare to a contactor coil at 0.4 H and 12 mA: W = 0.5 × 0.4 × (0.012)² = 28.8 ×
              10⁻⁶ J = 29 μJ. Tiny — but if released as a 1 μs spike, average power = 29 W, and
              voltage = L × di/dt = 0.4 × (0.012/10⁻⁶) = 4800 V. Energy is small; voltage and
              power density are large.
            </p>
            <p>
              That's why the size of a freewheel diode is set by AVERAGE current the diode has to
              freewheel, not peak voltage — the diode dissipates I²R in its forward voltage drop
              while the inductor energy decays. A 1N4007 (1 A continuous, 1000 V reverse) handles
              every relay coil under about 1 A.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Inductive switch-off — the back-EMF problem</ContentEyebrow>

          <ConceptBlock
            title="L × di/dt — opening an inductive circuit hurts"
            plainEnglish="If the current was 1 A and you open the switch, di/dt is huge (almost infinite over a few microseconds). The inductor responds with a back-EMF (V = L × di/dt) that can be hundreds or thousands of volts. That\'s the spark you see across opening contactor contacts."
            onSite="A 0.5 H solenoid coil carrying 0.5 A, opened in 10 μs: di/dt = 0.5 / 10⁻⁵ = 50 000 A/s. V_back = L × di/dt = 0.5 × 50 000 = 25 000 V. That arcs across the opening contacts, erodes them, and over time destroys the switch."
          >
            <p>Solutions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC inductive load:</strong> fit a freewheel diode in reverse-bias across
                the coil. When the switch opens, the diode forward-biases and lets the current
                circulate through the coil resistance until it dies. No back-EMF spike.
              </li>
              <li>
                <strong>AC inductive load:</strong> fit an RC snubber (typically 100 nF + 47 Ω)
                across the coil OR across the contacts. The cap absorbs the energy as the
                contacts open; the resistor limits the discharge current when they close.
              </li>
              <li>
                <strong>Higher-energy DC:</strong> add a varistor (MOV) or transient-voltage
                suppressor diode to clamp the spike at a safe level.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Time constants in real BS 7671 work"
            plainEnglish="Time constants aren't just textbook maths. They set RCD trip times, MCB magnetic threshold detection windows, SPD response, and the clearance interval before you can safely touch a capacitor bank."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>RCD trip time</strong> — Type AC instantaneous trips in &lt; 40 ms at 1× rated; the residual current detection circuit has its own RC filter to ignore short transients (spec limits set in BS EN 61008).</li>
              <li><strong>MCB magnetic trip</strong> — Type B 3-5× I_n; Type C 5-10×; Type D 10-20×. Trip is &lt; 100 ms but the breaker's electromagnet has an RL time constant determining minimum reliable tripping current.</li>
              <li><strong>SPD response</strong> — Type 2 surge devices clamp in &lt; 25 ns. An MOV's parasitic inductance (~10 nH per terminal lead) limits how fast it can absorb energy.</li>
              <li><strong>VFD DC bus</strong> — typical 3 kW drive has 1500 μF at 540 V (218 J stored). Internal bleeder via 50 kΩ → τ = RC = 75 s; to fall from 540 V to a safe 50 V takes t = τ × ln(540/50) = 75 × 2.38 ≈ 180 s (3 minutes). Always check with a meter.</li>
              <li><strong>PFC bank</strong> — large industrial bank may need separate discharge resistors to bring voltage below 50 V within 1 minute (BS EN 60831-1).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 61643-11:2012+A1:2019 — Surge protective devices (SPDs)"
            clause="Type 2 SPDs intended for installation downstream of the origin shall have a response time and protection level appropriate for the equipment to be protected, and shall be coordinated with any upstream Type 1 device."
            meaning={
              <>
                SPDs use MOVs and gas-discharge tubes to absorb fast transients (usually
                sub-microsecond rise times). The component RC and RL time constants determine
                how quickly the SPD can clamp the surge. BS 7671 §443 mandates SPDs in most new
                installations from A2:2022 onward.
              </>
            }
            cite="Source: BS EN 61643-11:2012+A1:2019; BS 7671:2018+A4:2026 §443."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connections)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
            meaning={
              <>
                Transients and switching surges punish loose joints first — a high-impedance
                joint at a contactor terminal will arc, char and fail under repeated L·di/dt
                kicks. Reg 526.1 demands the terminal selection take account of conductor class,
                CSA and the temperature reached at the terminal in normal service. Snubber
                circuits and SPDs only do their job when the joints they protect are sound.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 526.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc fault detection devices, A4:2026)"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents."
            meaning={
              <>
                A4:2026 introduced 421.1.7 as a recommendation (not yet a hard requirement) for
                AFDDs in AC final circuits — exactly the kind of fault that loose connections,
                degraded snubbers and damaged cable sheaths produce. High-risk residential
                buildings (HRRBs) carry mandatory AFDD obligations via the Building Safety Act
                2022. Where a final circuit feeds inductive loads through ageing terminations,
                AFDD is the right protective response.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 421.1.7 (introduced by Amendment 4:2026)."
          />

          <ConceptBlock
            title="Snubber circuit design — picking R and C for an AC contactor"
            plainEnglish="An RC snubber across an AC contactor coil (or across opening contacts) absorbs the L × di/dt energy at switch-off. The capacitor charges through the resistor as the contacts open, soaking up the inductor's stored energy as heat in R rather than as an arc across the contacts."
          >
            <p>Rule of thumb sizing for an AC inductive load:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>C</strong> ≈ I_load (in A) × 1 μF per ampere — typical 0.1–1 μF for control circuits.</li>
              <li><strong>R</strong> ≈ V_supply / (10 × I_load) — typical 22–100 Ω for 230 V control.</li>
              <li>Cap voltage rating: ≥ 1.5 × peak supply voltage. For 230 V mains: ≥ 1.5 × 325 = 488 V → use 630 V class X1/X2 safety capacitor.</li>
              <li>Resistor power: I²R rating ≥ V × I × pf at the cycle rate — typically 0.25–1 W for control circuits.</li>
            </ul>
            <p>
              Worked example: 230 V AC contactor coil drawing 50 mA. Snubber C = 0.05 μF (50 nF);
              R = 230 / 0.5 = 460 Ω → use 470 Ω. RC = 0.05 × 10⁻⁶ × 470 = 23.5 μs — fast enough
              to follow the contact-opening transient (typical contact-bounce gap closure ≈ 100 μs)
              while small enough to avoid affecting the steady-state coil current. Energy
              dissipated per cycle: ½ × C × V² = 0.5 × 50 × 10⁻⁹ × 325² = 2.6 mJ → 0.13 W at
              50 Hz. A 0.5 W resistor is fine.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Surge protective devices (SPDs) — fast transients on the supply"
            plainEnglish="Lightning, switching events on the DNO network, and large inductive switch-offs anywhere on the local supply can put kV-scale spikes onto the mains. Surge protective devices (SPDs) clamp these transients to a safe level by diverting the current to earth in nanoseconds."
            onSite="A Type 2 SPD at the consumer unit uses metal-oxide varistors (MOVs) that switch from megohms (off) to milliohms (clamping) when the voltage exceeds a threshold (typically 470 V for a 230 V supply). The transient energy goes to earth instead of frying downstream electronics."
          >
            <p>SPD types per BS EN 61643-11:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type 1</strong> — at the supply origin. Handles direct lightning strike. Tested at 10/350 μs waveform, 25 kA per pole.</li>
              <li><strong>Type 2</strong> — at the consumer unit. Indirect lightning and switching transients. 8/20 μs waveform, 20 kA per pole typical.</li>
              <li><strong>Type 3</strong> — at the equipment. Final cleanup. 1.2/50 μs waveform, lower energy but tighter clamping.</li>
            </ul>
            <p>
              BS 7671 §443 mandates SPDs in most installations from A2:2022 onward unless a
              documented risk assessment shows they aren't required. The protection level Up
              (typically 1.5 kV for Type 2) sets what voltage gets through to downstream
              equipment — must be below the equipment's rated impulse withstand voltage Uw
              (typically 4 kV for Class III equipment).
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Working on a \'switched off' bank of capacitors without bleeding them"
            whatHappens={
              <>
                VFD has been off for an hour. Apprentice opens the cover and touches the DC bus
                terminals to check continuity. 540 V DC across 1500 μF caps stored 218 J. Hits
                them with their meter probes — flash-bang, meter destroyed, fingers burnt.
              </>
            }
            doInstead={
              <>
                Drives, PSUs and PFC banks store dangerous energy. Always:
                <br />
                — Wait the manufacturer-stated discharge time (typically 5-15 minutes).
                <br />
                — Verify with a meter that DC bus voltage is below 50 V.
                <br />
                — Apply a discharge resistor (e.g. 1 kΩ 100 W) deliberately if the internal
                bleeder isn't fast enough.
                <br />
                — Treat capacitors as live until proven dead.
              </>
            }
          />

          <Scenario
            title="Designing an RC snubber for a relay coil on a control circuit"
            situation={
              <>
                A 24 V DC relay coil (12 mA, 0.4 H) is switched by a transistor that fails every
                few hundred operations. The fault is the inductive spike on switch-off. Size a
                freewheel diode and explain why the existing RC snubber across the contacts
                isn't helping.
              </>
            }
            whatToDo={
              <>
                Coil energy: W = ½ × L × I² = 0.5 × 0.4 × (0.012)² = 2.88 × 10⁻⁵ J — small but
                released as a sub-microsecond spike.
                <br />
                Without protection: V_back = L × di/dt; with di/dt of about 12 mA per μs, V_back
                ≈ 4800 V. Easily kills the transistor.
                <br />
                Solution: 1N4007 diode in reverse across the coil (cathode to +, anode to coil).
                On switch-off, the diode forward-biases at 0.7 V, current decays through coil
                resistance with τ = L/R_coil ≈ 0.4/2000 = 0.2 ms. Transistor only sees 24 + 0.7
                = 24.7 V — well within its rating.
                <br />
                The RC snubber across the contacts wasn't helping because there's no
                semiconductor switch in series with the coil — the snubber was protecting the
                wrong thing.
              </>
            }
            whyItMatters={
              <>
                Transient suppression has to be matched to the topology. Wrong component, wrong
                place — same intermittent failure. The maths (L × di/dt = back-EMF) tells you
                what scale of voltage you\'re protecting against.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'τ = RC for capacitors; τ = L/R for inductors. Both in seconds with SI units.',
              'After 1τ: charging reaches 63 %, discharging falls to 37 %. After 5τ: effectively done.',
              'v(t) = V_max × (1 − e⁻ᵗ/τ) charging; v(t) = V_0 × e⁻ᵗ/τ discharging.',
              'Inductive switch-off generates back-EMF V = L × di/dt — up to thousands of volts.',
              'Freewheel diode (DC) or RC snubber (AC) to suppress inductive transients.',
              'Energy in cap = ½CV²; in inductor = ½LI². Released on disconnect — discharge before working.',
              'BS 7671 §443 mandates SPDs in most new installations to absorb supply transients.',
            ]}
          />

          <Quiz title="Transient response knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.5 Inductance and capacitance
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 — Three-phase and power factor
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
