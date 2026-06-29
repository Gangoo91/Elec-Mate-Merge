/**
 * Module 3 · Section 2 · Subsection 4 — Sine waves: RMS, peak, average, frequency (AC 2.2)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.2
 *   AC 2.2 — "determine electrical quantities in alternating current circuits"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 5.3
 *   AC 5.3 — "explain how characteristics of a sine-wave affect the values of A.C. voltage and current"
 *
 * RMS, peak, average, frequency, period, phase angle. Why we say 230 V even though
 * the peak is 325 V, and what 'true RMS' means in the real world.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PowerCalculator } from '@/components/apprentice-courses/PowerCalculator';
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
import { SineWave } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Sine waves — RMS, peak, average and frequency | Level 3 Module 3.2.4 | Elec-Mate';
const DESCRIPTION =
  '230 V RMS, 325 V peak. Period, frequency, angular velocity. Why your meter reads RMS and what changes on a non-sinusoidal load.';

const checks = [
  {
    id: 'l3-m3-2-4-peak',
    question:
      'UK mains is 230 V RMS. Peak voltage is approximately:',
    options: [
      '400 V',
      '115 V',
      '230 V',
      '325 V',
    ],
    correctIndex: 3,
    explanation:
      'V_peak = V_RMS × √2 = 230 × 1.414 = 325 V. RMS is the value that delivers the same heating effect as a DC of the same number — peak is what insulation has to withstand.',
  },
  {
    id: 'l3-m3-2-4-period',
    question:
      'Period of a 50 Hz sine wave:',
    options: [
      '50 ms',
      '20 ms',
      '10 ms',
      '100 ms',
    ],
    correctIndex: 1,
    explanation: 'T = 1/f = 1/50 = 0.02 s = 20 ms. One full cycle every 20 ms.',
  },
  {
    id: 'l3-m3-2-4-rms',
    question:
      'A sine wave has a peak value of 14.14 A. Its RMS value is:',
    options: [
      '20 A',
      '7.07 A',
      '10 A',
      '9 A',
    ],
    correctIndex: 2,
    explanation:
      'I_RMS = I_peak / √2 = 14.14 / 1.414 = 10 A. RMS is the heating-equivalent value a true-RMS meter would display for this sine wave.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The RMS value of a sine wave equals the peak divided by:',
    options: [
      'π',
      '√2',
      '2',
      '√3',
    ],
    correctAnswer: 1,
    explanation: 'V_RMS = V_peak / √2 ≈ V_peak × 0.707. Or V_peak = V_RMS × √2.',
  },
  {
    id: 2,
    question: 'Average value of a full sine wave (over one full cycle):',
    options: [
      'V_peak × 0.637',
      'V_peak / √2',
      'Zero',
      'V_peak / 2',
    ],
    correctAnswer: 2,
    explanation:
      'Over a full cycle the positive and negative halves cancel exactly. The non-zero "average" you sometimes see (0.637 × V_peak) is the average over HALF a cycle.',
  },
  {
    id: 3,
    question: 'Form factor for a sine wave (RMS / average) is:',
    options: [
      '1.414',
      '1.0',
      '√3',
      '1.11',
    ],
    correctAnswer: 3,
    explanation:
      'Form factor = RMS / |average over half cycle| = (V_p/√2) / (0.637 × V_p) = 1.11. Average-responding meters multiply by this to display RMS — assuming sine.',
  },
  {
    id: 4,
    question: 'Angular frequency ω equals:',
    options: [
      '2πf',
      'f / 2π',
      '√2 × f',
      'π × f',
    ],
    correctAnswer: 0,
    explanation: 'ω = 2πf, in radians per second. For 50 Hz: ω = 2π × 50 = 314.16 rad/s.',
  },
  {
    id: 5,
    question: 'A 50 Hz waveform completes one full cycle in:',
    options: [
      '10 ms',
      '20 ms',
      '1 s',
      '50 ms',
    ],
    correctAnswer: 1,
    explanation: 'Period T = 1/f = 1/50 = 20 ms.',
  },
  {
    id: 6,
    question:
      'Two sine waves of the same frequency, where one peaks 90° before the other, are said to be:',
    options: [
      'In phase',
      'Anti-phase',
      '90° out of phase',
      'Different frequencies',
    ],
    correctAnswer: 2,
    explanation:
      'A 90° (π/2 radian) difference. In an inductor, voltage leads current by 90°. In a capacitor, current leads voltage by 90°. Both come from the maths of the sine wave.',
  },
  {
    id: 7,
    question:
      'A 230 V supply across a pure 23 Ω resistance: the peak current is:',
    options: [
      '10 A',
      '23 A',
      '20 A',
      '14.1 A',
    ],
    correctAnswer: 3,
    explanation:
      'I_RMS = 230 / 23 = 10 A. I_peak = I_RMS × √2 = 10 × 1.414 = 14.1 A. Insulation and protective devices see peak; the meter reads RMS.',
  },
  {
    id: 8,
    question: 'Peak-to-peak voltage of UK mains:',
    options: [
      '650 V',
      '460 V',
      '230 V',
      '325 V',
    ],
    correctAnswer: 0,
    explanation:
      'V_peak = 325 V; V_pk-pk = 2 × 325 = 650 V. That\'s the swing the insulation has to take.',
  },
];

const faqs = [
  {
    question: "Why don't we just call the supply 325 V (the peak)?",
    answer:
      "Because RMS is the value that does useful work. A 230 V RMS supply delivers the same heating to a resistor as a 230 V DC supply would. Peak is just the maximum the insulation has to survive. The world standardised on RMS for that reason — meters, certificates and BS 7671 all use RMS.",
  },
  {
    question: "What's 'form factor' for and why does it matter?",
    answer:
      "Form factor = RMS / average. For a perfect sine wave it's 1.11. Average-responding meters detect the average and multiply by 1.11 to display RMS — but only correctly if the waveform IS a sine. On distorted waveforms (LED drivers, VFDs) the form factor is different, and the meter reads wrong. True-RMS meters compute RMS directly and don't care about form factor.",
  },
  {
    question: 'How do harmonics fit in?',
    answer:
      "A pure sine has only the fundamental (50 Hz). Distorted waveforms contain harmonics (100 Hz, 150 Hz, 250 Hz, etc.) added to it. The total RMS includes all the harmonic content. You'll meet harmonics properly in §3.6 and they're what drives neutral overloading on 3-phase installs.",
  },
  {
    question: 'Why does the meter sometimes read wildly different from a clamp?',
    answer:
      "Because they're sampling at different times and one might be true-RMS while the other is averaging. Always check what the meter does. Most modern Fluke / Megger / Kewtech models are true-RMS — but cheap clamp meters often aren't.",
  },
  {
    question: 'What does 0.707 keep showing up for?',
    answer:
      "0.707 = 1/√2. The factor between RMS and peak for a sine wave. It also shows up in single-phase vs 3-phase voltage ratios (V_phase = V_line / √3 in 3-phase star) and in power-factor calculations at 45° (cos 45° = 0.707).",
  },
  {
    question: 'Is 50 Hz the same everywhere in the world?',
    answer:
      "No. UK and most of Europe, Africa, Asia and Australia use 50 Hz. North America, parts of Japan and a few other countries use 60 Hz. The choice was historical — but it's why a UK clock plugged into a US socket runs slow.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 4"
            title="Sine waves — RMS, peak, average, frequency"
            description="230 V RMS = 325 V peak. Period, frequency, angular velocity. Form factor 1.11 and why true-RMS matters on modern loads."
            tone="yellow"
          />

          <TLDR
            points={[
              "V_RMS = V_peak / √2; V_peak = V_RMS × √2. UK 230 V RMS → 325 V peak.",
              'Period T = 1/f. UK 50 Hz → T = 20 ms per cycle.',
              'Angular frequency ω = 2πf rad/s. UK 50 Hz → ω = 314.16 rad/s.',
              'Average over half cycle = 0.637 × peak; over full cycle = 0. Form factor = RMS/avg = 1.11 for sine.',
              'True-RMS meters compute RMS from the actual waveform — needed for any non-sinusoidal load.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Convert between peak, peak-to-peak, RMS and average values for a sine wave.',
              'Calculate period from frequency and vice versa.',
              'Calculate angular frequency ω = 2πf.',
              'Define form factor and explain when an average-responding meter reads incorrectly.',
              'Identify why true-RMS measurement matters on modern loads.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The sine wave</ContentEyebrow>

          <ConceptBlock
            title="One cycle, four key values"
            plainEnglish="A sine wave repeats. Each cycle has a peak (maximum), a peak-to-peak (top to bottom), an RMS (effective value), and an average (over half a cycle). Mains is described by its RMS — but you need to recognise all four."
          >
            <p>For a sine wave with peak amplitude V<sub>p</sub>:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Peak (V_p)</strong> — maximum value. Insulation must withstand this.</li>
              <li><strong>Peak-to-peak (V_pp)</strong> = 2 × V_p. The total swing.</li>
              <li><strong>RMS (V_RMS)</strong> = V_p / √2 ≈ 0.707 × V_p. The "DC equivalent" — does the same heating work as a DC of the same value.</li>
              <li><strong>Average (V_avg over half cycle)</strong> = (2/π) × V_p ≈ 0.637 × V_p. Used internally by averaging meters.</li>
            </ul>
            <p>
              For UK mains: V_RMS = 230 V (the figure on the certificate). V_peak = 325 V. V_pp =
              650 V. V_avg (half cycle) = 207 V. Same wave, different ways of describing it.
            </p>
          </ConceptBlock>

          <SineWave />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Frequency, period and angular frequency</ContentEyebrow>

          <ConceptBlock
            title="Three ways to describe how fast the wave repeats"
            plainEnglish="Frequency = cycles per second (Hz). Period = seconds per cycle. Angular frequency = how many radians per second the rotating phasor spins."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Frequency (f)</strong> — Hz (cycles per second). UK 50 Hz.</li>
              <li><strong>Period (T)</strong> = 1/f. UK 50 Hz → T = 20 ms.</li>
              <li><strong>Angular frequency (ω)</strong> = 2πf rad/s. UK → ω = 314.16 rad/s. Used in inductive/capacitive reactance formulas: X_L = ωL, X_C = 1/(ωC).</li>
            </ul>
            <p>
              At higher frequencies (400 Hz aircraft, 20 kHz inverter outputs) the same maths
              applies. ω just gets bigger — and inductive reactance with it.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <ConceptBlock
            title="Phase angle — describing how two waveforms line up"
            plainEnglish="If two sine waves of the same frequency don't peak at the same instant, they are out of phase. The phase difference is measured in degrees (0° to 360°) or radians (0 to 2π). 90° = quarter cycle = 5 ms at 50 Hz."
            onSite="In a pure inductor, voltage leads current by 90° (current lags). In a pure capacitor, current leads voltage by 90°. Power factor cos φ comes directly from this angle: in-phase = cos 0° = 1.0 (resistive); 90° lag = cos 90° = 0 (purely reactive)."
          >
            <p>
              <strong>Time delay:</strong> Δt = (φ / 360°) × T. At 50 Hz (T = 20 ms), a 30° lag
              corresponds to Δt = (30/360) × 20 = 1.67 ms. A 90° lag = 5 ms. A 120° lag = 6.67 ms
              (which is the spacing between phases in 3-phase).
            </p>
            <p>
              <strong>Adding sine waves of the same frequency</strong>: use phasors (vectors).
              Two sines 90° apart with peak 100 V each combine to a single sine of peak √(100² +
              100²) = 141.4 V at 45°. Same Pythagoras as the impedance triangle in Sub 2.5.
            </p>
            <p>
              <strong>Anti-phase (180°)</strong>: two equal sines 180° apart cancel exactly.
              That's why a humbucker pickup, a balanced audio line, or a differential signal
              twin-pair rejects common-mode noise — equal noise picked up on both wires cancels
              when the receiver subtracts.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.capacitors.url}
            title={videos.capacitors.title}
            channel={videos.capacitors.channel}
            duration={videos.capacitors.duration}
            topic={videos.capacitors.topic}
          />

          <ConceptBlock
            title="Form factor and crest factor — two waveform descriptors"
            plainEnglish="Form factor (RMS / average) and crest factor (peak / RMS) describe waveform shape. Pure sine: form factor 1.11, crest factor 1.414 (√2). Square wave: both are 1.0. Spiky waveforms (rectifier inputs, LED driver currents): crest factor up to 3 or higher."
          >
            <p>For common waveforms:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sine</strong>: peak/RMS = √2 ≈ 1.414; RMS/avg = 1.11.</li>
              <li><strong>Square</strong>: peak = RMS = avg → form factor 1.0, crest factor 1.0.</li>
              <li><strong>Triangular</strong>: form factor ≈ 1.155; crest factor ≈ 1.732 (√3).</li>
              <li><strong>Half-wave rectified sine</strong>: RMS = V_peak / 2; avg = V_peak / π; form factor π/2 ≈ 1.57.</li>
              <li><strong>SMPS input current</strong>: pulses near voltage peak; crest factor 2 to 3.</li>
            </ul>
            <p>
              Why crest factor matters for measurement: a true-RMS meter must handle a crest
              factor of at least 3 to read computer/LED loads accurately. Cheap meters spec CF
              ≤ 1.5 — only good for sines.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RMS — what it actually means</ContentEyebrow>

          <ConceptBlock
            title="Root Mean Square — the heating-equivalent value"
            plainEnglish="RMS isn't an averaging trick. It's the value of DC that would heat a given resistor to the same temperature as the AC waveform does. That's why we use it for everything practical."
            onSite="A 230 V RMS supply through a 23 Ω element delivers exactly the same power (2300 W) as a 230 V DC supply would. That's the whole point — RMS makes AC and DC compare like-for-like."
          >
            <p>The maths comes from the operation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>R</strong>oot — take the square root of</li>
              <li><strong>M</strong>ean — the average of</li>
              <li><strong>S</strong>quare — the squared values of the waveform.</li>
            </ul>
            <p>
              For a pure sine wave the maths gives RMS = peak / √2. For other waveforms (square,
              triangle, distorted) the relationship is different — which is why an
              average-responding meter calibrated for sine reads wrong on a distorted wave, and
              true-RMS is the safer default.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <PowerCalculator />
          </div>

          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Harmonics — when the waveform is more than just a sine"
            plainEnglish="A 'pure' sine wave is the fundamental at 50 Hz. Real loads draw distorted current — equivalent mathematically to the fundamental PLUS smaller sine waves at multiples of 50 Hz (the harmonics). Total RMS includes them all."
            onSite="LED drivers, computer power supplies and VFDs draw current in spikes near the voltage peak. Fourier analysis breaks that spiky waveform into 50 Hz fundamental + 150 Hz (3rd) + 250 Hz (5th) + 350 Hz (7th) + ... A clamp meter sees the total RMS; an analyser shows the individual harmonics."
          >
            <p>
              <strong>Total RMS</strong> = √(I₁² + I₃² + I₅² + I₇² + …) — the harmonics add as
              squares, then root.
            </p>
            <p>
              <strong>Total harmonic distortion (THD)</strong> = √(I₃² + I₅² + I₇² + …) / I₁. A
              healthy supply has THD &lt; 5 %. LED and computer loads typically present THD 50–
              100 % at the load terminals.
            </p>
            <p>
              Worked example: a load draws I₁ = 10 A fundamental, I₃ = 6 A (3rd harmonic), I₅ =
              3 A. Total RMS = √(100 + 36 + 9) = √145 = 12.04 A. THD = √(36 + 9) / 10 = √45 / 10
              = 6.71 / 10 = 67 %. The cable carries 12 A while the active 50 Hz current is only
              10 A — the harmonics ride for free.
            </p>
            <p>
              The 3rd harmonic in particular sums into the neutral on a 3-phase 4-wire system
              (instead of cancelling like the fundamental), which is why heavily-loaded 3-phase
              systems with switching loads need oversized neutrals. BS 7671 §524.2.1 covers this.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Generating the sine wave — phasor representation"
            plainEnglish="A sine wave can be drawn as a rotating vector (phasor) of length equal to its peak amplitude, spinning anti-clockwise at angular frequency ω. The vertical projection of the tip traces the sine wave over time. This phasor picture is how engineers analyse AC circuits without trigonometry."
          >
            <p>
              <strong>v(t) = V_peak × sin(ωt + φ)</strong>
              <br />
              In phasor form: V = V_RMS ∠ φ. The phasor magnitude is the RMS value, the angle is
              the phase relative to a reference (usually L1 voltage).
            </p>
            <p>
              Why phasors are useful: instead of integrating dv/dt and di/dt for a sine input, you
              treat the inductor as an impedance jωL and the capacitor as 1/(jωC). The result is
              a complex number where the real part is the resistive component and the imaginary
              part is the reactive. Vector addition replaces calculus.
            </p>
            <p>
              At L3, you don't need to use complex numbers explicitly — Pythagoras handles the
              magnitude and arctan handles the angle. But the picture (rotating arrow, vertical
              projection = wave) is the foundation of every AC analysis from Sub 2.5 onward.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 61010-1 + IEC 60051 (instrument standards)"
            clause="Multimeters used for AC measurement shall be marked TRMS (True Root Mean Square) where the response is independent of waveform; non-TRMS meters shall be marked as average-responding and may give significant errors on non-sinusoidal waveforms."
            meaning={
              <>
                If your meter doesn't say TRMS, it's averaging. On modern installs with LED, VFD,
                inverter or rectifier loads, the meter will under-read the real RMS by 5-30 % or
                more. Buy true-RMS as standard for any installation work.
              </>
            }
            cite="Source: IEC 60051 / BS EN 61010-1 instrument response classification."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.1 (Voltage at terminals of fixed equipment)"
            clause="In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment."
            meaning={
              <>
                The 230 V RMS supply has manufacturer-tolerated bands either side. A peak of 325 V
                and an RMS of 230 V are the same waveform — what the appliance "sees" is the RMS,
                because RMS is the heating-equivalent value that drives every appliance rating.
                Reg 525.1 ties cable sizing back to the RMS at the terminals after voltage drop.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 525.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 523.6.201 (Tabulated current-carrying capacities)"
            clause="The tabulated current-carrying capacities in Appendix 4 are based on the fundamental frequency only and do not take account of the effect of harmonics."
            meaning={
              <>
                Appendix 4 assumes a clean 50 Hz sine. With LED drivers, VFDs and switching power
                supplies, third-harmonic currents add in the neutral and don't cancel between
                phases — neutral currents can exceed line currents. On harmonic-rich installs you
                upsize the neutral or apply the Appendix 4 §C de-rating factors. RMS measured on
                a true-RMS meter is the figure you compare against the Appendix 4 column.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 523.6.201; Appendix 4."
          />

          <ConceptBlock
            title="Power on a sine — instantaneous, real and reactive"
            plainEnglish="Multiply the voltage waveform by the current waveform and you get instantaneous power p(t) — also a sine wave but at twice the supply frequency (100 Hz on a 50 Hz supply). For a resistive load, p(t) is always positive (energy flows from supply to load). For a reactive load, p(t) swings positive and negative — energy oscillates back and forth."
          >
            <p>
              For a pure resistor with v(t) = V_p sin(ωt) and i(t) = I_p sin(ωt):
              <br />
              p(t) = V_p I_p sin²(ωt) = (V_p I_p / 2) × (1 − cos 2ωt)
              <br />
              Average value = V_p I_p / 2 = V_RMS × I_RMS = real power P.
            </p>
            <p>
              For a pure inductor with v(t) leading i(t) by 90°:
              <br />
              p(t) = V_p sin(ωt) × I_p sin(ωt − 90°) = (V_p I_p / 2) × sin 2ωt
              <br />
              Average over a full cycle = 0 — no real power consumed; just oscillating reactive
              energy at 2 × line frequency.
            </p>
            <p>
              Worked example: 230 V RMS through a 23 Ω resistor. P_avg = V × I = 230 × 10 = 2300
              W. Peak instantaneous power = 2 × P_avg = 4600 W (for half a cycle, twice per
              50 Hz period — i.e. peaks at 100 Hz). The element heats steadily but the heat
              delivery pulses at 100 Hz.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Sizing insulation for RMS instead of peak"
            whatHappens={
              <>
                Specifier sees 230 V on the supply, picks 230 V-rated insulation. It works for
                weeks, then breaks down — because the insulation has to survive the PEAK (325 V)
                every cycle, not the RMS.
              </>
            }
            doInstead={
              <>
                Always check the cable / device voltage rating against PEAK plus a margin for
                transients. Modern XLPE insulation is typically rated 600/1000 V — well clear of
                325 V peak even with switching transients. Old PVC at 300/500 V is marginal —
                that's why it's largely been replaced.
              </>
            }
          />

          <Scenario
            title="Reading RMS on a VFD-fed motor circuit"
            situation={
              <>
                You're investigating a tripping problem on a 3-phase fan motor fed by a VFD. The
                VFD output is a chopped PWM (pulse-width modulated) waveform — looks square-ish.
                Standard clamp meter shows 14 A; true-RMS clamp shows 18 A. Cable is rated 20 A.
                Why the difference, and what to do?
              </>
            }
            whatToDo={
              <>
                The standard meter is averaging — assumes sine and applies form factor 1.11. The
                actual VFD waveform has higher harmonic content; the true RMS is genuinely 18 A.
                Cable at 20 A is on the edge — fine in steady state, but adds no margin for
                ambient temperature or grouping factors.
                <br />
                Action: trust the true-RMS reading, recalculate the cable using actual current
                (18 A × derate factors) and probably upgrade one CSA. The standard meter has been
                lying for the whole survey.
              </>
            }
            whyItMatters={
              <>
                On any modern install with switched-mode supplies, VFDs or inverter loads, an
                averaging meter under-reads. Cables and protection sized to the meter reading
                quietly run beyond their rating. True-RMS is the difference between a compliant
                install and a slow burn.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'V_peak = V_RMS × √2; V_RMS = V_peak / √2 (≈ 0.707).',
              'UK mains: 230 V RMS = 325 V peak = 650 V peak-to-peak.',
              'Period T = 1/f. 50 Hz → 20 ms.',
              'Angular frequency ω = 2πf. 50 Hz → 314.16 rad/s.',
              'Average over half cycle = 0.637 × V_peak; form factor (RMS/avg) = 1.11 for pure sine.',
              'True-RMS meters compute RMS from the waveform — essential on LED, VFD, inverter loads.',
              'Insulation rating must cover peak voltage + transients, not the RMS nominal.',
            ]}
          />

          <Quiz title="Sine wave knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.3 Magnetism and EMF
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Inductance and capacitance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
