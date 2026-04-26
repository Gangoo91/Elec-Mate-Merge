/**
 * Sine waves — peak, RMS, frequency, period (5.5).
 * City & Guilds 2365-02 → Unit 202 → LO5 → AC 5.5.
 * Polished and consolidated from former section4/Sub3 (AC waveforms & RMS) and
 * section4/Sub4 (frequency & UK mains). Now lives at Section 5 / Subsection 6
 * to align with Unit 202 LO5 ordering. Rewritten to canonical structure.
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
import { SineWave, ThreePhaseWave } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Sine waves — peak, RMS, frequency, period (5.5) | Level 2 Module 2.5.6 | Elec-Mate';
const DESCRIPTION =
  'Peak, RMS, period, frequency. UK 230 V RMS = 325 V peak; 50 Hz = 20 ms period. Why we use RMS, when you need a true-RMS meter, and how frequency sets motor synchronous speed.';

const checks = [
  {
    id: 'rms-peak',
    question: 'UK mains is 230 V RMS. Approximately what is the peak voltage?',
    options: ['230 V', '253 V', '325 V', '460 V'],
    correctIndex: 2,
    explanation:
      'V_peak = V_RMS × √2 ≈ 230 × 1.414 ≈ 325 V. Same equipment but designed for the peak — that’s why insulation, clearances and component voltage ratings have to handle 325 V even though "the supply" is "only" 230 V.',
  },
  {
    id: 'frequency-period',
    question: 'What is the period of UK 50 Hz mains?',
    options: ['10 ms', '20 ms', '50 ms', '100 ms'],
    correctIndex: 1,
    explanation:
      'T = 1 / f = 1 / 50 = 0.02 s = 20 ms. Each complete cycle takes 20 milliseconds. The voltage crosses zero twice per cycle, so 100 zero-crossings every second on UK mains.',
  },
  {
    id: 'sync-speed',
    question:
      'A 4-pole induction motor on UK 50 Hz mains has a synchronous speed of about:',
    options: ['750 rpm', '1500 rpm', '3000 rpm', '6000 rpm'],
    correctIndex: 1,
    explanation:
      'n_s = (120 × f) / poles = (120 × 50) / 4 = 1500 rpm. Real running speed is a bit less (typically 1440–1470 rpm) due to slip — that’s how an induction motor produces torque.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does RMS represent for an AC waveform?',
    options: [
      'The average of the peaks',
      'The DC voltage that gives the same heating effect',
      'The highest possible voltage',
      'The frequency of the waveform',
    ],
    correctAnswer: 1,
    explanation:
      'RMS = the effective value. It’s the equivalent DC voltage that would dissipate the same power in a resistor. That’s why nameplates and ratings are quoted in RMS — the numbers actually correspond to the heating, lighting or motor power you’ll get.',
  },
  {
    id: 2,
    question: 'For a pure sine wave, V_RMS in terms of V_peak is:',
    options: ['V_p × 2', 'V_p / √2', 'V_p / 2', 'V_p × √2'],
    correctAnswer: 1,
    explanation:
      'V_RMS = V_p / √2 ≈ 0.707 × V_p. The 1/√2 factor falls out of the maths of squaring a sine wave and averaging it. Memorise the number — examiners love asking it both ways round.',
  },
  {
    id: 3,
    question: 'If V_RMS = 230 V (UK mains), V_p is approximately:',
    options: ['230 V', '253 V', '325 V', '460 V'],
    correctAnswer: 2,
    explanation:
      'V_p ≈ V_RMS × √2 ≈ 230 × 1.414 ≈ 325 V. Insulation and clearances must handle this peak even though "the supply" is quoted at 230 V.',
  },
  {
    id: 4,
    question: 'What is the frequency of UK public mains?',
    options: ['60 Hz', '50 Hz', '25 Hz', '400 Hz'],
    correctAnswer: 1,
    explanation:
      '50 Hz, set by ESQCR 2002. The grid keeps it within ±1% (49.5 Hz to 50.5 Hz) by balancing generation and load in real time. The US uses 60 Hz, aircraft typically 400 Hz.',
  },
  {
    id: 5,
    question: 'Increasing frequency does what to the period?',
    options: ['Increases T', 'Decreases T', 'No change', 'Makes T negative'],
    correctAnswer: 1,
    explanation:
      'f and T are inverses: T = 1/f. Higher f = shorter T. 50 Hz → 20 ms. 100 Hz → 10 ms. 1 kHz → 1 ms.',
  },
  {
    id: 6,
    question:
      'When MUST you use a true-RMS meter rather than an average-responding one?',
    options: [
      'Only on DC supplies',
      'Only on perfect sine waves',
      'On distorted or non-sinusoidal waveforms (drives, SMPS, LED drivers)',
      'Never — they read the same',
    ],
    correctAnswer: 2,
    explanation:
      'Average-responding meters are calibrated for sine waves only. Stick one on the output of a VFD, an SMPS or a dimmer and the reading can be 10–40% wrong. True-RMS meters integrate any waveform shape correctly.',
  },
  {
    id: 7,
    question: 'A 6-pole induction motor on UK 50 Hz mains. Synchronous speed:',
    options: ['1500 rpm', '1000 rpm', '750 rpm', '3000 rpm'],
    correctAnswer: 1,
    explanation:
      '(120 × 50) / 6 = 1000 rpm. That’s the magnetic synchronous speed. Real running speed sits 2–5% below it due to slip — typically 950–980 rpm at full load.',
  },
  {
    id: 8,
    question: 'Your meter shows 49.8 Hz on a domestic socket. What should you do?',
    options: [
      'Panic and isolate the property',
      'Nothing — variation within ±1% of 50 Hz is normal under ESQCR 2002',
      'Phone the DNO straight away',
      'Reset the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      'ESQCR 2002 Reg 27 allows ±1% on declared frequency — that’s 49.5 to 50.5 Hz. 49.8 is well inside. Daily fluctuations of ±0.2 Hz are normal as the grid balances supply against demand minute by minute.',
  },
];

const faqs = [
  {
    question: 'Why use RMS instead of peak voltage on every nameplate?',
    answer:
      'Because RMS is the value that maps directly to power and heat. A 230 V RMS supply delivers exactly the same average power into a resistive load as a 230 V DC supply would — so a 1 kW kettle on RMS 230 V really does dissipate 1 kW. If we quoted peak voltage instead, every power calculation would need an awkward conversion factor. RMS is the practical "working voltage" of an AC supply; peak is the "scary number" your insulation has to survive.',
  },
  {
    question: 'Is exactly 50.00 Hz required for UK mains?',
    answer:
      'No. ESQCR 2002 allows ±1% — so 49.5 Hz to 50.5 Hz is legal and normal. Daily variations of ±0.2 Hz happen all the time as the National Grid balances generation against demand. Synchronous clocks (the old "mains-frequency" type that count grid cycles) used to drift slightly during the day and were corrected overnight when the grid deliberately overshoots to bring the average back to 50.000 Hz. Modern digital clocks use a quartz crystal so they don’t care.',
  },
  {
    question: 'When do I genuinely need a true-RMS meter on site?',
    answer:
      'Any time you’re measuring on the load side of a variable frequency drive (VFD), a switched-mode power supply (SMPS), a dimmer, an LED driver, an inverter, or a UPS. All of these produce non-sinusoidal waveforms. An average-responding meter (the cheaper kind) assumes everything’s a clean sine wave and applies the 1.11 form factor — when the reality is a chopped, distorted shape, the reading is wrong by anywhere from 10% to 40%. True-RMS meters integrate the actual waveform regardless of shape. If you do any commercial, industrial or modern domestic work, get a true-RMS meter.',
  },
  {
    question: 'Why does peak voltage matter for safety if "the supply" is 230 V?',
    answer:
      'Insulation has to withstand instantaneous voltage, not average. UK 230 V RMS hits 325 V peak twice every cycle — and during transient events (lightning, switching surges, motor disconnections) it can briefly hit 1000 V or more. That’s why CAT-rated test gear has voltage classes (CAT III 600 V is the minimum sensible rating for distribution-board work) and why insulation testers go to 500 V DC test for 230 V circuits. The peak — and the surge above the peak — is what your kit has to survive without flashover.',
  },
  {
    question: 'How does frequency affect motor speed?',
    answer:
      'Synchronous speed is set by n_s = (120 × f) / poles. So at fixed UK 50 Hz: a 2-pole motor sits around 3000 rpm, a 4-pole around 1500 rpm, a 6-pole around 1000 rpm. INDUCTION motors run slightly slower than synchronous due to "slip" — typically 2–5%, so a 4-pole at full load might run at 1440–1470 rpm. SYNCHRONOUS motors and PMSM motors lock exactly to f. Variable frequency drives change f deliberately to control motor speed without throttling — that’s how every modern variable-speed pump, fan and lift works.',
  },
  {
    question: 'Three-phase isn’t in the AC criterion — should I bother with it now?',
    answer:
      'Promoted to its own ConceptBlock — see "What’s coming in Module 3 — three-phase" near the end of this Sub, just before the Quiz. Short version: three sine waves 120° apart, all the peak/RMS/period maths from this Sub carries straight over.',
  },
];

export default function Sub6() {
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
            eyebrow="Module 2 · Section 5 · Subsection 6"
            title="Sine waves — peak, RMS, frequency, period"
            description="The vocabulary you need to talk about every AC supply you’ll ever isolate. Peak, RMS, period, frequency — UK 230 V RMS, 325 V peak, 20 ms period, 50 Hz, every socket on the island."
            tone="emerald"
          />

          <TLDR
            points={[
              'UK mains is a sine wave at 50 Hz, 230 V RMS, 325 V peak, 20 ms per cycle. Burn those four numbers in.',
              'V_RMS = V_peak / √2 for a sine wave. RMS = the equivalent DC that would dissipate the same power in a resistor. That’s why nameplates and ratings are quoted in RMS.',
              'Period T = 1 / f. Frequency f sets motor synchronous speed: n_s = (120 × f) / poles. 4-pole at 50 Hz = 1500 rpm.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the sine wave as the standard AC waveform from a single-loop generator.',
              'Convert between peak and RMS values for sinusoidal waveforms.',
              'Calculate period from frequency using T = 1 / f, and frequency from period.',
              'Apply the synchronous-speed formula n_s = (120 × f) / poles for motors.',
              'Recognise when an average-responding meter will read incorrectly and a true-RMS meter is needed.',
              'Apply safety thinking around peak voltage, insulation classes and CAT-rated test gear.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Where this Sub fits</ContentEyebrow>

          <ConceptBlock title="The Section 5 thread, in one line">
            <p>
              Sub 5.4 said: changing flux through a coil = induced EMF. Sub 5.5 showed what shape
              that EMF takes from a single rotating coil — sinusoidal. This Sub answers the next
              practical question: how do we measure a sine wave?
            </p>
          </ConceptBlock>

          <ContentEyebrow>The shape of UK mains</ContentEyebrow>

          <ConceptBlock
            title="Every UK socket is a sine wave at 50 Hz, 230 V RMS"
            plainEnglish="Hook a scope to L and N at any normal socket and you see a clean sine wave that swings between +325 V and −325 V, 50 times per second. We call it ‘230 V’ because that’s its RMS value — the working number that matches what a DC equivalent would do."
            onSite="The numbers: 230 V RMS, 325 V peak, 20 ms per cycle, 50 Hz. Every domestic supply, every commercial supply, every site supply (per phase) on this island. Drill those four numbers in."
          >
            <p>
              In Sub5 you saw why a rotating coil produces a sine wave — it’s the unavoidable
              consequence of constant rotation through a uniform field. Now we put numbers on
              that wave.
            </p>
            <p>
              UK public mains supply is a sine wave at <strong>50 Hz</strong> with an RMS voltage
              of <strong>230 V</strong>. That sine wave reaches a peak of about <strong>325 V
              </strong> twice per cycle (once positive, once negative), crosses zero twice per
              cycle, and completes one full cycle every <strong>20 ms</strong>.
            </p>
          </ConceptBlock>

          <SineWave
            eyebrow="UK mains — one cycle"
            caption="Sine wave at 50 Hz. Peak ≈ +325 V, trough ≈ −325 V. Crosses zero at 0 ms, 10 ms and 20 ms. Period (one full cycle) = 20 ms."
          />

          <SectionRule />

          <ContentEyebrow>Peak, RMS and the √2 factor</ContentEyebrow>

          <ConceptBlock
            title="RMS — the DC equivalent that does the same work"
            plainEnglish="RMS stands for Root Mean Square. It’s the equivalent DC voltage that would dissipate the same average power in a resistor. So 230 V RMS heats your kettle exactly as fast as 230 V DC would."
            onSite="When the data sheet says ‘rated voltage 230 V AC’, that 230 V is RMS. Same on every motor nameplate, every immersion heater, every appliance label. Working with peak instead would give the wrong power every time."
          >
            <p>
              An AC waveform is constantly changing voltage. So what does the single number "230 V"
              actually mean? It’s the <strong>root mean square (RMS)</strong> value — defined as
              the equivalent DC voltage that would dissipate the same average power in a
              resistor. That makes RMS the natural choice for nameplates and ratings: a 230 V
              RMS supply genuinely produces 230 V × I worth of heat in a 230 V kettle.
            </p>
            <p>
              For a <strong>pure sine wave</strong> only (and only sine wave), the relationship
              between peak and RMS is fixed:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V_RMS = V_peak / √2</strong> ≈ V_peak × 0.707
              </li>
              <li>
                <strong>V_peak = V_RMS × √2</strong> ≈ V_RMS × 1.414
              </li>
              <li>
                Same √2 ratio applies to current: I_RMS = I_peak / √2.
              </li>
            </ul>
            <p>
              For UK mains: V_peak = 230 × √2 ≈ 325 V. That 325 V is the figure your insulation
              has to withstand twice per cycle, every 20 ms, for the next forty years on the
              installation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Worked example — peak from RMS, RMS from peak">
            <p>
              <strong>Question 1.</strong> A scope shows V_peak = 70.7 V. What is V_RMS?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>V_RMS = V_peak / √2 = 70.7 / 1.414 ≈ 50 V</li>
            </ul>
            <p>
              <strong>Question 2.</strong> A control transformer has a 24 V RMS secondary. What is
              the peak voltage your test probe would see across it?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>V_peak = V_RMS × √2 = 24 × 1.414 ≈ 34 V</li>
            </ul>
            <p>
              The same trick scales up. A 400 V three-phase supply (line-to-line, RMS) hits
              about 565 V peak at every line-to-line crossing. Insulation class on the
              switchgear has to suit.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IEC 60050 — International Electrotechnical Vocabulary, 103-02-13"
            clause="Root mean square (RMS) value of a periodic quantity: square root of the mean value of the square of the instantaneous values of the quantity over a period."
            meaning={
              <>
                Plain English: RMS is calculated by squaring the waveform (which makes everything
                positive), averaging it over one cycle, and taking the square root. For a sine
                wave that whole calculation simplifies to V_peak / √2. For a square wave it gives
                V_peak (no √2 factor). For weird shapes (drives, SMPS), only a true-RMS meter
                actually does the integration properly.
              </>
            }
            cite="Source: IEC Electropedia (electropedia.org) — entry 103-02-13."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Frequency and period</ContentEyebrow>

          <ConceptBlock
            title="Frequency f tells you how many cycles per second; period T is the time of one cycle"
            plainEnglish="They’re inverses. f = 1/T and T = 1/f. UK mains: 50 Hz means 50 cycles per second; T = 1/50 = 0.02 s = 20 ms per cycle."
            onSite="On a scope you measure period directly (zero crossing to next zero crossing in the same direction = T). Then f = 1/T. Modern multimeters measure f directly."
          >
            <p>
              <strong>Frequency</strong> (symbol <strong>f</strong>) is the number of complete
              cycles per second, measured in <strong>hertz (Hz)</strong>. UK public mains
              frequency is fixed at 50 Hz by ESQCR 2002.
            </p>
            <p>
              <strong>Period</strong> (symbol <strong>T</strong>) is the time taken for one
              complete cycle, measured in seconds. The two are inverses of each other:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>T = 1 / f</strong>
              </li>
              <li>
                <strong>f = 1 / T</strong>
              </li>
            </ul>
            <p>
              Worked examples — quick conversions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK 50 Hz → T = 1/50 = 0.02 s = <strong>20 ms</strong></li>
              <li>US 60 Hz → T = 1/60 ≈ 16.67 ms</li>
              <li>Aircraft 400 Hz → T = 1/400 = 2.5 ms</li>
              <li>VFD output at 30 Hz → T = 1/30 ≈ 33.3 ms (motor runs slower)</li>
              <li>VFD output at 80 Hz → T = 1/80 = 12.5 ms (motor runs faster)</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity Safety, Quality and Continuity Regulations (ESQCR) 2002, Regulation 27 (paraphrased)"
            clause="The frequency of the supply at the supply terminals shall not vary from the declared frequency by more than ±1 per cent unless agreed otherwise."
            meaning={
              <>
                Declared frequency in the UK is 50 Hz. The legal tolerance is ±1%, so the supply
                must stay between <strong>49.5 Hz and 50.5 Hz</strong>. National Grid (now
                NESO) keeps it inside that window minute by minute by balancing generation
                against demand. If you ever see a meter reading 49.7 or 50.2 — that’s normal,
                not a fault.
              </>
            }
            cite="Verbatim wording paraphrased — see ESQCR 2002 (Statutory Instrument 2002 No. 2665, as amended) Regulation 27 for the full text."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Frequency sets motor speed</ContentEyebrow>

          <ConceptBlock
            title="Synchronous speed: n_s = (120 × f) / poles"
            plainEnglish="Mains frequency directly determines how fast every AC motor on the network spins. Change the frequency, change the speed."
            onSite="That’s the entire principle behind every variable frequency drive (VFD) on a building site. Want a fan running at half speed? Drop the frequency from 50 Hz to 25 Hz. Synchronous speed halves, real speed follows."
          >
            <p>
              For an AC induction motor, the rotational speed is set by mains frequency and the
              number of magnetic poles built into the stator:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>n_s = (120 × f) / poles</strong>
              </li>
              <li>n_s = synchronous speed (rpm)</li>
              <li>f = supply frequency (Hz)</li>
              <li>poles = number of magnetic poles in the stator (always even)</li>
            </ul>
            <p>For UK 50 Hz mains, the standard speeds are:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2-pole: (120 × 50) / 2 = <strong>3000 rpm</strong></li>
              <li>4-pole: (120 × 50) / 4 = <strong>1500 rpm</strong> (most common industrial)</li>
              <li>6-pole: (120 × 50) / 6 = <strong>1000 rpm</strong></li>
              <li>8-pole: (120 × 50) / 8 = <strong>750 rpm</strong></li>
            </ul>
            <p>
              <strong>Slip.</strong> An induction motor’s real running speed sits 2–5% below
              synchronous because the rotor needs to be slightly slower than the field to
              generate the induced current that creates its torque (Faraday’s law again — Sub4).
              A 4-pole motor with 3% slip runs at 1500 × 0.97 = 1455 rpm at full load.
            </p>
            <p>
              <strong>Synchronous and PMSM motors</strong> lock exactly to mains frequency — no
              slip. They’re used where precise speed matters (timing, conveyors that have to
              stay in step with each other, paper machines).
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

          <ContentEyebrow>True-RMS vs average-responding meters</ContentEyebrow>

          <ConceptBlock
            title="Average-responding meters lie when the waveform isn’t a sine wave"
            plainEnglish="Cheap multimeters assume everything is a sine wave and apply a fixed conversion factor. Stick one on a non-sine waveform and the reading is wrong — sometimes by 30% or more."
            onSite="If you do anything with VFDs, SMPS, LED drivers, dimmers, inverters or UPS gear — get a true-RMS meter. The cheap ones will mislead you on commissioning and you won’t know why."
          >
            <p>
              The √2 conversion only works on pure sine waves. Take an average-responding meter
              and put it on:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The output of a <strong>variable frequency drive (VFD)</strong> — the waveform
                is a chopped pulse-width modulated (PWM) shape, not a sine.
              </li>
              <li>
                The DC bus or output of a <strong>switched-mode power supply (SMPS)</strong> —
                square waves with sharp edges.
              </li>
              <li>
                The output of an <strong>LED driver or dimmer</strong> — phase-cut sine waves
                with chunks missing.
              </li>
              <li>
                The output of a <strong>UPS in inverter mode</strong> — often a stepped
                approximation, not a true sine.
              </li>
            </ul>
            <p>
              On all of these, an average-responding meter applies the wrong conversion factor
              and gives a reading that can be 10–40% off. A <strong>true-RMS meter</strong>{' '}
              actually integrates the waveform over a cycle and gives a correct RMS value
              regardless of shape. Spec one with at least CAT III 600 V for distribution-board
              work; CAT IV at the origin.
            </p>
            <p>
              <strong>Tool-bag thread.</strong> The True-RMS clamp meter you’ll need here is the
              same instrument family as the basic multimeter you met back in Sub1.5 — except where
              Sub1.5’s meter LIES on a non-sinusoidal LED-driver waveform, the True-RMS version
              reads correctly. Same body, smarter brain. The upgrade pays for itself the first
              time it stops you chasing a ghost fault on a VFD or LED job.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Worked example — when the meter lies — non-sinusoidal current">
            <p>
              You’re commissioning a panel feeding banks of LED downlights. Your clamp meter — an
              average-responding one — reads <strong>13 A</strong> on the cable feeding one of the
              LED drivers. What’s the peak current the cable actually sees?
            </p>
            <p>
              <strong>If it were a clean sine wave</strong> (which is what the meter assumes),
              you’d work out the peak with the standard √2 factor:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>I_peak = I_RMS × √2 = 13 × 1.414 ≈ <strong>18 A peak</strong></li>
            </ul>
            <p>
              That’s what the meter is implicitly telling you — because under the hood it
              measured the average rectified current and applied the sine-wave form factor of
              1.11 to display "RMS".
            </p>
            <p>
              <strong>But this is an LED driver.</strong> Half the LED drivers an electrician meets are
              non-sinusoidal — switched-mode supplies that pull current in short, sharp pulses
              near the peak of each mains half-cycle. The peak-to-RMS ratio (the "crest factor")
              for a clean sine wave is √2 = <strong>1.414</strong>. For a typical LED-driver
              current waveform it’s anywhere from <strong>2 to 3</strong>. Same RMS reading,
              very different peak:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Crest factor 2 → I_peak = 13 × 2 = <strong>26 A peak</strong></li>
              <li>Crest factor 3 → I_peak = 13 × 3 = <strong>39 A peak</strong></li>
            </ul>
            <p>
              So the real cable peak could be anywhere from <strong>26 to 39 A</strong> against
              the 18 A peak the meter implies. The cable, the breaker and the connectors are
              all sitting in that current spike every half-cycle, even though the displayed RMS
              says everything’s fine.
            </p>
            <p>
              <strong>Conclusion:</strong> use a True-RMS meter on LED-heavy installations. An
              average-responding meter doesn’t just under-read RMS on these waveforms — it also
              makes any "what’s the peak?" calculation you try to do off it meaningless. If
              you’re sizing protection or auditing inrush on an LED job, the cheap meter will
              quietly point you at the wrong answer.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Three-phase — same physics, three of them</ContentEyebrow>

          <ConceptBlock
            title="Three sine waves, 120° apart"
            plainEnglish="A three-phase supply is just three single-phase sine waves of the same amplitude and frequency, generated together with each peak shifted 120° (one-third of a cycle) from the next."
          >
            <p>
              UK three-phase distribution carries three line conductors, each with its own
              voltage waveform. Each phase is a sine wave of the same amplitude and frequency,
              but offset in time so the peaks land 120° apart (one-third of a 20 ms cycle, so
              about 6.67 ms). Three-phase is a Level 3 / Module 3 topic — but the building
              blocks (peak, RMS, frequency, period) are exactly what you’ve just learned.
            </p>
            <p>
              Each single phase to neutral measures 230 V RMS (50 Hz). Line-to-line measures 400
              V RMS — the √3 factor that comes from the geometry of phasors 120° apart.
              Everything you’ll ever measure on UK mains, single or three-phase, comes from
              applying this subsection’s rules to one or three sine waves.
            </p>
          </ConceptBlock>

          <ThreePhaseWave />

          <SectionRule />

          <ContentEyebrow>Optional deeper dive</ContentEyebrow>

          <VideoCard
            url={videos.acBasics.url}
            title={videos.acBasics.title}
            channel={videos.acBasics.channel}
            duration={videos.acBasics.duration}
            topic="AC basics — alternating current · Unit 202 LO5.5"
            caption="Optional. The Engineering Mindset goes through peak, RMS and the √2 factor with animation. Worth five minutes if the maths feels abstract — it puts moving pictures on the equations in this subsection."
          />

          <SectionRule />

          <CommonMistake
            title="Specifying insulation or test kit for the RMS voltage instead of the peak"
            whatHappens={
              <>
                You assume "the supply is only 230 V" and pick test gear or insulation rated for
                that. Reality is the supply hits 325 V peak twice per cycle, and transient surges
                regularly push it briefly past 1000 V. Cheap test leads flash over. Insulation
                fails after a few years. RCBOs explode on a fault. You’ve under-specified the
                whole installation.
              </>
            }
            doInstead={
              <>
                Always design and select for the <strong>peak</strong> voltage and the expected
                <strong> transient</strong> overvoltage class. UK 230 V supplies want CAT III 600
                V minimum on test gear (CAT IV at the supply origin), 500 V DC insulation
                resistance test kit, components rated for at least 600 V working voltage.
                BS 7671 puts numerical limits on this — design out from the peak, not the RMS.
              </>
            }
          />

          <Scenario
            title="The cheap meter that lied — VFD commissioning gone wrong"
            situation={
              <>
                You’re commissioning a 7.5 kW pump fed from a brand-new VFD. Your basic
                average-responding meter reads 180 V on the motor terminals when the drive is
                set to 50 Hz output. You panic — the motor is rated for 400 V. Where’s the
                missing voltage?
              </>
            }
            whatToDo={
              <>
                Borrow a true-RMS meter and re-measure. The reading jumps to about 400 V — which
                is what should have been there all along. The drive’s output isn’t a sine wave,
                it’s a chopped PWM waveform that an average-responding meter can’t handle. The
                motor is fine. The drive is fine. Your meter is just lying. Same scenario plays
                out daily on commissioning jobs across the UK; if you don’t know the meter’s
                limitations, you chase ghost faults for hours.
              </>
            }
            whyItMatters={
              <>
                A true-RMS meter costs twice as much as an average-responding one, but pays for
                itself the first time it stops you spending a day chasing a non-existent fault on
                a VFD installation. As soon as you start working on commercial, industrial, EV
                charging or anything with switched-mode supplies, average-responding meters
                aren’t fit for purpose.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Looking ahead — Module 3</ContentEyebrow>

          <ConceptBlock
            title="What’s coming in Module 3 — three-phase"
            plainEnglish="Three-phase isn’t exotic. It’s three single-phase sine waves generated together, 120° apart. Smoother power, higher voltages from the same machine, and what every commercial and industrial install you’ll meet runs on. Module 3 covers it properly — but the maths from THIS Sub already covers most of it."
            onSite="Walk into any factory, gym, school plant room or commercial kitchen and the supply on the wall is three-phase. Module 3 gives you the proper grounding. The numbers and the shape of each phase are exactly what you’ve learned here."
          >
            <p>
              Up to now this Sub has dealt with single-phase — one sine wave, 230 V RMS, 50 Hz,
              one socket on a domestic wall. <strong>Three-phase</strong> takes the same idea and
              triples it. Three coils inside a single alternator, spaced 120° (one third of a
              revolution) apart around the rotor. As the rotor turns, each coil hits its peak EMF
              a third of a cycle (about 6.67 ms) after the one before. The result is three
              sine waves of identical amplitude and frequency, all delivered together on three
              line conductors.
            </p>
            <p>What you get from generating three together instead of one:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Smoother total power delivery.</strong> When one phase is at zero EMF,
                the other two are still pushing. The total instantaneous power across all three
                phases is constant (for a balanced load), instead of pulsing 100 times a second
                like single-phase. That’s why every motor above a few kW runs on three-phase —
                no torque pulsations.
              </li>
              <li>
                <strong>Higher voltages from the same kit.</strong> Each phase is 230 V RMS to
                neutral. But because the three peaks land 120° apart, the line-to-line voltage
                between any two phases is <strong>400 V RMS</strong> — the √3 factor that comes
                from phasor geometry. Same alternator, two voltage levels: 230 V where you need
                a phase + neutral, 400 V where you need line-to-line.
              </li>
              <li>
                <strong>What every commercial and industrial install in the UK runs on.</strong>{' '}
                Factories, schools, gyms, commercial kitchens, plant rooms, anywhere with motors
                bigger than a domestic boiler pump — all three-phase. As soon as you leave
                domestic work behind, you’re into three-phase territory.
              </li>
            </ul>
            <p>
              Module 3 covers all of it properly — line vs phase voltage, the √3 factor, balanced
              vs unbalanced loads, star and delta connection, three-phase metering, three-phase
              fault current. <strong>The peak/RMS/period maths from THIS Sub all carries over.</strong>{' '}
              Every individual phase IS a 230 V RMS sine wave at 50 Hz with a 325 V peak and a
              20 ms period. You already know how to measure one of them. Module 3 just teaches
              you what happens when you have three at once.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'UK mains: 230 V RMS, 325 V peak, 50 Hz, 20 ms per cycle. Burn the four numbers in.',
              'V_RMS = V_peak / √2 (≈ × 0.707). V_peak = V_RMS × √2 (≈ × 1.414). Sine waves only.',
              'RMS is the DC equivalent that gives the same heating effect — that’s why it’s the value used on every nameplate and rating plate.',
              'T = 1/f. f = 1/T. UK mains is held to 50 Hz ±1% by ESQCR 2002.',
              'Synchronous speed n_s = (120 × f) / poles. 4-pole at 50 Hz = 1500 rpm; induction motors slip 2–5% below this in real running.',
              'Get a true-RMS meter as soon as you work on VFDs, SMPS, LED drivers, dimmers, inverters or UPS gear. Average-responding meters lie on non-sine waveforms.',
              'Insulation, clearances and test gear are specified for the PEAK voltage and the transient surges above it — not the RMS. Under-specifying for the peak is a classic cause of equipment failure.',
            ]}
          />

          <Quiz title="Sine waves — peak, RMS, frequency — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.5 The single-loop AC generator
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 6 — Electronic components
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
