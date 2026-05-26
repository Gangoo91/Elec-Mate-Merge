/**
 * Module 3 · Section 3 · Subsection 2 — Frequency, Period and Amplitude Relationships
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Time-domain anatomy of an AC waveform — frequency, period, angular frequency,
 *   peak/RMS amplitude. The mathematical bridge from supply theory to motor speed,
 *   reactance and equipment compatibility on a building services project.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Frequency, Period and Amplitude Relationships - HNC Module 3 Section 3.2';
const DESCRIPTION =
  'Master AC waveform time-domain characteristics: frequency, period, angular frequency and amplitude. Essential for UK HNC Building Services with 50Hz supply analysis.';

const quickCheckQuestions = [
  {
    id: 'uk-frequency',
    question: 'What is the standard UK mains supply frequency?',
    options: [
      '40Hz',
      '60Hz',
      '50Hz',
      '100Hz',
    ],
    correctIndex: 2,
    explanation:
      'The UK mains supply operates at 50Hz, meaning the voltage completes 50 full cycles per second. This is standard across Europe, whilst North America uses 60Hz.',
  },
  {
    id: 'period-calc',
    question: 'What is the period of a 50Hz waveform?',
    options: [
      '0.01s (10ms)',
      '0.05s (50ms)',
      '0.02s (20ms)',
      '0.1s (100ms)',
    ],
    correctIndex: 2,
    explanation:
      'Period T = 1/f = 1/50 = 0.02 seconds = 20ms. Each complete cycle of the UK mains supply takes 20 milliseconds.',
  },
  {
    id: 'angular-frequency',
    question: 'What is the angular frequency (ω) for a 50Hz supply?',
    options: [
      '100 rad/s',
      '50 rad/s',
      '314 rad/s',
      '157 rad/s',
    ],
    correctIndex: 2,
    explanation:
      'Angular frequency ω = 2πf = 2 × π × 50 = 314.16 rad/s ≈ 314 rad/s. This is used in instantaneous value calculations.',
  },
  {
    id: 'peak-voltage',
    question: 'If UK mains is 230V RMS, what is the peak voltage (Vm)?',
    options: [
      '460V',
      '325V',
      '400V',
      '230V',
    ],
    correctIndex: 1,
    explanation:
      'Peak voltage Vm = Vrms × √2 = 230 × 1.414 = 325.3V ≈ 325V. Equipment insulation must withstand this peak value.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the relationship between frequency (f) and period (T)?',
    options: [
      'T = f',
      'T = 1/f',
      'T = 2πf',
      'T = f/2',
    ],
    correctAnswer: 1,
    explanation:
      'Period and frequency are reciprocals: T = 1/f. If frequency is 50Hz, period is 1/50 = 0.02s (20ms). This fundamental relationship is essential for all AC calculations.',
  },
  {
    id: 2,
    question: 'A motor is designed for 60Hz operation. What is its design period?',
    options: [
      '20ms',
      '10ms',
      '16.67ms',
      '25ms',
    ],
    correctAnswer: 2,
    explanation:
      'T = 1/f = 1/60 = 0.01667s = 16.67ms. This is important when considering 50Hz/60Hz equipment compatibility.',
  },
  {
    id: 3,
    question: 'What does angular frequency (ω) represent?',
    options: [
      'The peak voltage divided by frequency',
      'The number of cycles per second',
      'The power factor of the circuit',
      'The rate of change of phase angle in radians per second',
    ],
    correctAnswer: 3,
    explanation:
      'Angular frequency ω represents the rate at which the phase angle changes, measured in radians per second. It equals 2πf because one complete cycle equals 2π radians.',
  },
  {
    id: 4,
    question:
      'The instantaneous voltage equation v = Vm sin(ωt) at t = 5ms for 50Hz, 230V RMS supply gives:',
    options: [
      '325V',
      '230V',
      '0V',
      '162.5V',
    ],
    correctAnswer: 0,
    explanation:
      'Vm = 230 × √2 = 325V. ω = 314 rad/s. At t = 5ms: v = 325 × sin(314 × 0.005) = 325 × sin(1.57) = 325 × 1 = 325V (peak of sine wave at 90°)',
  },
  {
    id: 5,
    question: 'How many complete cycles occur in one second at 50Hz?',
    options: [
      '25 cycles',
      '50 cycles',
      '314 cycles',
      '100 cycles',
    ],
    correctAnswer: 1,
    explanation:
      'Frequency directly defines cycles per second: 50Hz means exactly 50 complete cycles per second. This is the fundamental definition of frequency in Hertz.',
  },
  {
    id: 6,
    question: 'A 60Hz motor operates on UK 50Hz supply. What happens to its speed?',
    options: [
      'Speed increases by 20%',
      'Speed remains the same',
      'Speed decreases by approximately 17%',
      'The motor will not run',
    ],
    correctAnswer: 2,
    explanation:
      'Motor speed is proportional to frequency. At 50Hz instead of 60Hz: speed ratio = 50/60 = 0.833 (83.3%), so speed decreases by approximately 17%.',
  },
  {
    id: 7,
    question:
      'What is the wavelength of a 50Hz signal in a cable with propagation velocity 2 × 10⁸ m/s?',
    options: [
      '4,000m',
      '40km',
      '400m',
      '4,000km',
    ],
    correctAnswer: 3,
    explanation:
      'Wavelength λ = v/f = (2 × 10⁸)/(50) = 4 × 10⁶m = 4,000km. At power frequencies, wavelengths are very long compared to building dimensions.',
  },
  {
    id: 8,
    question: 'If peak-to-peak voltage is 650V, what is the amplitude (peak value)?',
    options: [
      '325V',
      '460V',
      '162.5V',
      '230V',
    ],
    correctAnswer: 0,
    explanation:
      'Amplitude (peak) = peak-to-peak ÷ 2 = 650 ÷ 2 = 325V. The amplitude is measured from zero to positive (or negative) peak.',
  },
  {
    id: 9,
    question: 'What happens to capacitive reactance (Xc) when frequency increases?',
    options: [
      'Xc increases proportionally',
      'Xc decreases inversely',
      'Xc remains constant',
      'Xc increases with the square of frequency',
    ],
    correctAnswer: 1,
    explanation:
      'Xc = 1/(2πfC). As frequency increases, capacitive reactance decreases inversely. At higher frequencies, capacitors pass more current.',
  },
  {
    id: 10,
    question:
      'A building in the UK receives equipment designed for 60Hz, 120V. Which issue is most critical?',
    options: [
      'An unlimited fine and/or up to 2 years imprisonment',
      'Resistance increases as temperature increases',
      'Both voltage and frequency differences affect operation',
      'To maintain battery charge during normal operation',
    ],
    correctAnswer: 2,
    explanation:
      'Both differences matter: 230V vs 120V (voltage nearly doubled) and 50Hz vs 60Hz (frequency 17% lower). Motors run slower and may overheat; transformers saturate differently. Equipment requires proper conversion.',
  },
  {
    id: 11,
    question: 'At what time does v = Vm sin(ωt) first equal zero (after t = 0) for 50Hz?',
    options: [
      '5ms',
      '20ms',
      '15ms',
      '10ms',
    ],
    correctAnswer: 3,
    explanation:
      'sin(ωt) = 0 when ωt = π. So t = π/ω = π/314 = 0.01s = 10ms. This is half the period (T/2 = 20ms/2 = 10ms), representing the zero crossing.',
  },
  {
    id: 12,
    question: 'What is the effect of frequency on inductive reactance (XL)?',
    options: [
      'XL increases proportionally with frequency',
      'XL increases with the square of frequency',
      'XL decreases with increasing frequency',
      'XL is independent of frequency',
    ],
    correctAnswer: 0,
    explanation:
      'XL = 2πfL. Inductive reactance increases directly with frequency. Motors designed for 50Hz have higher reactance and draw less current at 60Hz.',
  },
];

const faqs = [
  {
    question: 'Why does the UK use 50Hz while North America uses 60Hz?',
    answer:
      'Historical development led to different standards. Europe adopted 50Hz partly because it was easier to achieve with early generators (3000 RPM for 2-pole machines). North America chose 60Hz, which provides slightly better motor performance and reduced flicker in incandescent lighting. Both frequencies are practical for power transmission and equipment design.',
  },
  {
    question: 'Can I use 60Hz equipment in the UK?',
    answer:
      "It depends on the equipment type. Resistive loads (heaters, incandescent bulbs) only care about voltage, not frequency. However, motors run 17% slower at 50Hz, potentially overheating. Transformers may saturate differently. Electronic equipment with switch-mode power supplies often accepts 50-60Hz automatically. Always check the equipment rating plate for '50/60Hz' compatibility.",
  },
  {
    question: "What does 'amplitude' mean in AC circuits?",
    answer:
      'Amplitude refers to the peak value (Vm or Im) of a sinusoidal waveform, measured from the zero line to the maximum positive or negative excursion. For UK mains at 230V RMS, the amplitude is 230 × √2 = 325V. Insulation and semiconductor ratings must account for peak values, not just RMS.',
  },
  {
    question: 'Why is angular frequency (ω) used instead of frequency (f)?',
    answer:
      'Angular frequency (ω = 2πf) simplifies mathematical expressions involving trigonometric functions. Since one complete cycle represents 2π radians, using ω eliminates the need to multiply by 2π repeatedly in calculations. The instantaneous value equation v = Vm sin(ωt) is more elegant than v = Vm sin(2πft).',
  },
  {
    question: 'How does frequency affect lighting systems?',
    answer:
      'At 50Hz, lamps flicker 100 times per second (twice per cycle at zero crossings). This is usually imperceptible but can cause stroboscopic effects with rotating machinery or issues for sensitive individuals. LED drivers and electronic ballasts operate at much higher frequencies (20kHz+) to eliminate visible flicker entirely.',
  },
  {
    question: 'What practical effect does wavelength have at 50Hz?',
    answer:
      'At 50Hz, the wavelength in cables is approximately 4,000km - vastly longer than any building installation. This means phase differences along conductors are negligible for building wiring. Wavelength effects only become significant at radio frequencies or in very long transmission lines (100km+).',
  },
];

const HNCModule3Section3_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 2"
            title="Frequency, Period and Amplitude Relationships"
            description="Time-domain characteristics of AC waveforms essential for building services engineering"
            tone="purple"
          />

          <TLDR
            points={[
              'You design every UK BSE installation around 50 Hz, T = 20 ms, &omega; = 314 rad/s — these three numbers anchor every reactance, motor-speed and waveform calculation you will produce.',
              'You convert between RMS and peak (V&#x2098; = V&#x1d63;&#x2098;&#x209b; &times; &radic;2) when sizing insulation, semiconductors and surge protection — peak is what punctures, RMS is what heats.',
              'You apply n&#x209b; = 120f/p to verify motor synchronous speed before mechanical sizing — a 60 Hz import on UK supply runs 17 % slow and may overheat.',
              'You recognise X&#x2097; rises and X&#x1d04; falls with frequency — relevant when DNO frequency excursions or VSD harmonic content shift the operating point.',
            ]}
          />

          <RegsCallout
            source="BS EN 50160 — Voltage characteristics of electricity supplied by public distribution networks"
            clause="The nominal frequency of the supply voltage shall be 50 Hz. Under normal operating conditions the mean value of the fundamental frequency measured over 10 s shall be within 50 Hz &plusmn; 1 % during 99.5 % of a year."
            meaning={
              <>
                BS EN 50160 is the standard the DNO works to. Your BSE designs assume
                49.5&ndash;50.5 Hz as the normal operating envelope. Outside this band
                (e.g. island-mode generation following grid loss), motor speeds, transformer
                losses and PFC capacitor performance all drift — which is why generator
                changeover sequences must verify frequency before re-energising loads.
              </>
            }
            cite="Source: BS EN 50160; BS 7671:2018+A4:2026, Reg 132.2.1 (suitability for service conditions)"
          />

          <LearningOutcomes
            outcomes={[
              'Define frequency, period and amplitude with correct SI units',
              'Calculate period from frequency using T = 1/f',
              'Apply angular frequency ω = 2πf in instantaneous value equations',
              'Determine peak voltage from RMS using Vm = Vrms × √2',
              'Understand wavelength considerations at power frequencies',
              'Analyse 50Hz vs 60Hz equipment compatibility issues',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Frequency - The Foundation of AC Systems">
            <p>
              Frequency (f) defines how many complete cycles an AC waveform completes per second. It
              is the fundamental parameter that determines motor speeds, transformer design, and the
              behaviour of reactive components throughout a building's electrical system.
            </p>
            <p>Key facts about frequency:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 Hertz (Hz) = 1 cycle per second</li>
              <li>UK mains frequency is 50Hz (±1% under normal conditions)</li>
              <li>Frequency is maintained by National Grid generators synchronised together</li>
              <li>Symbol: f, Unit: Hertz (Hz)</li>
            </ul>
            <p>
              <strong>Global Frequency Standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK / Europe — 50Hz, 230V, 20ms period</li>
              <li>North America — 60Hz, 120V, 16.67ms period</li>
              <li>Japan (East) — 50Hz, 100V, 20ms period</li>
              <li>Japan (West) — 60Hz, 100V, 16.67ms period</li>
              <li>Australia — 50Hz, 230V, 20ms period</li>
            </ul>
            <p>
              <strong>Remember:</strong> UK frequency of 50Hz means the voltage crosses zero 100
              times per second (twice per cycle) - this affects lighting flicker calculations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Period - Time for One Complete Cycle">
            <p>
              Period (T) is the time taken for one complete cycle of the waveform. It has a simple
              but fundamental reciprocal relationship with frequency: as frequency increases, the
              period decreases proportionally.
            </p>
            <p>
              <strong>The Fundamental Relationship:</strong> T = 1/f and f = 1/T (where T is in
              seconds and f is in Hertz).
            </p>
            <p>
              <strong>UK 50Hz Supply:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Period T = 1/50 = <strong>0.02s = 20ms</strong></li>
              <li>Each cycle takes 20 milliseconds</li>
              <li>Positive half-cycle: 10ms</li>
              <li>Negative half-cycle: 10ms</li>
            </ul>
            <p>
              <strong>60Hz System (Reference):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Period T = 1/60 = <strong>0.0167s = 16.67ms</strong></li>
              <li>Each cycle takes 16.67 milliseconds</li>
              <li>Positive half-cycle: 8.33ms</li>
              <li>Negative half-cycle: 8.33ms</li>
            </ul>
            <p>
              <strong>Angular Frequency (ω):</strong> Angular frequency expresses how fast the
              phase angle changes, measured in radians per second. Since one complete cycle equals
              2π radians: ω = 2πf = 2π/T. For UK 50Hz: ω = 2 × π × 50 = <strong>314.16 rad/s ≈ 314
              rad/s</strong>.
            </p>
            <p>
              <strong>Exam tip:</strong> Remember ω = 314 rad/s for UK 50Hz. For 60Hz systems, ω =
              377 rad/s.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Amplitude and Instantaneous Values">
            <p>
              Amplitude refers to the maximum value (peak) of the waveform. In AC circuits, we
              typically work with RMS values, but understanding peak values is essential for
              insulation ratings, semiconductor selection, and transient analysis.
            </p>
            <p>Key amplitude relationships:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Peak value:</strong> Vm = Vrms × √2 = Vrms × 1.414</li>
              <li><strong>Peak-to-peak:</strong> Vp-p = 2 × Vm = 2.828 × Vrms</li>
              <li><strong>UK mains:</strong> Vm = 230 × 1.414 = <strong>325V peak</strong></li>
              <li><strong>Peak-to-peak:</strong> Vp-p = 2 × 325 = <strong>650V</strong></li>
            </ul>
            <p>
              <strong>Instantaneous Value Equation:</strong> v = Vm sin(ωt). Where v is
              instantaneous voltage, Vm is peak voltage, ω is angular frequency, t is time. For UK
              mains: v = 325 sin(314t) volts.
            </p>
            <p>
              <strong>Instantaneous Values at Key Points (50Hz):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0 ms (0°) — sin(ωt) = 0 — Voltage 0V</li>
              <li>2.5 ms (45°) — sin(ωt) = 0.707 — Voltage 230V</li>
              <li>5 ms (90°) — sin(ωt) = 1.000 — Voltage <strong>325V (peak)</strong></li>
              <li>10 ms (180°) — sin(ωt) = 0 — Voltage 0V</li>
              <li>15 ms (270°) — sin(ωt) = -1.000 — Voltage <strong>-325V (negative peak)</strong></li>
              <li>20 ms (360°) — sin(ωt) = 0 — Voltage 0V (cycle complete)</li>
            </ul>
            <p>
              <strong>Practical note:</strong> The instantaneous voltage equals the RMS value (230V)
              at 45° and 135° - these are the points where sin(ωt) = 0.707 = 1/√2.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Frequency Effects on Reactive Components and Equipment">
            <p>
              Frequency directly affects how inductors and capacitors behave in AC circuits. This
              has major implications for motor operation, power factor correction, and equipment
              compatibility in building services installations.
            </p>
            <p>
              <strong>Reactance Equations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>XL = 2πfL = ωL — Inductive reactance increases with f</li>
              <li>XC = 1/(2πfC) = 1/(ωC) — Capacitive reactance decreases with f</li>
            </ul>
            <p>
              <strong>Effect of Frequency on Building Services Equipment (50Hz vs 60Hz):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Induction motors — Speed reduced by 17%; Fan/pump output reduced; may overheat</li>
              <li>Transformers — Core flux increases; may saturate; Increased heating and losses</li>
              <li>Capacitor banks — Higher Xc, less reactive current; PFC effectiveness reduced</li>
              <li>Fluorescent ballasts — Different operating point; May not start or run correctly</li>
              <li>Electronic loads — SMPS usually 50-60Hz tolerant; Check equipment rating plate</li>
            </ul>
            <p>
              <strong>Motor Synchronous Speed:</strong> ns = (120 × f) / p. Where ns is
              synchronous speed (RPM), f is frequency (Hz), p is number of poles.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2 poles — 50Hz: 3000 RPM, 60Hz: 3600 RPM</li>
              <li>4 poles — 50Hz: 1500 RPM, 60Hz: 1800 RPM</li>
              <li>6 poles — 50Hz: 1000 RPM, 60Hz: 1200 RPM</li>
              <li>8 poles — 50Hz: 750 RPM, 60Hz: 900 RPM</li>
            </ul>
            <p>
              <strong>Wavelength note:</strong> At 50Hz with typical cable propagation velocity
              (~2×10⁸ m/s), wavelength λ = v/f ≈ 4,000km. This is vastly longer than building
              installations, so transmission line effects are negligible.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Instantaneous Voltage Calculation.</strong> Calculate the
              instantaneous voltage of UK mains supply at t = 3ms after a positive zero crossing.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: Vrms = 230V, f = 50Hz, t = 3ms = 0.003s</li>
              <li>Vm = Vrms × √2 = 230 × 1.414 = <strong>325V</strong></li>
              <li>ω = 2πf = 2 × π × 50 = <strong>314 rad/s</strong></li>
              <li>v = Vm sin(ωt) = 325 × sin(314 × 0.003) = 325 × sin(0.942 rad) = 325 × sin(54°)</li>
              <li>v = 325 × 0.809 = <strong>263V</strong></li>
            </ul>
            <p>
              <strong>Example 2: Motor Speed at Different Frequencies.</strong> A 4-pole motor
              designed for 60Hz is connected to UK 50Hz supply. Calculate the speed change.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Synchronous speed formula: ns = (120 × f) / p</li>
              <li>At 60Hz (design frequency): ns = (120 × 60) / 4 = <strong>1800 RPM</strong></li>
              <li>At 50Hz (UK supply): ns = (120 × 50) / 4 = <strong>1500 RPM</strong></li>
              <li>Speed reduction: Change = (1800 - 1500) / 1800 × 100 = <strong>16.7% slower</strong></li>
              <li>Motor will run slower and may overheat if mechanically loaded</li>
            </ul>
            <p>
              <strong>Example 3: Reactance Change with Frequency.</strong> A 100µF capacitor is
              used for power factor correction. Calculate its reactance at 50Hz and 60Hz.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitive reactance: Xc = 1 / (2πfC)</li>
              <li>At 50Hz: Xc = 1 / (2 × π × 50 × 100×10⁻⁶) = 1 / 0.0314 = <strong>31.8Ω</strong></li>
              <li>At 60Hz: Xc = 1 / (2 × π × 60 × 100×10⁻⁶) = 1 / 0.0377 = <strong>26.5Ω</strong></li>
              <li>Lower Xc at higher frequency means more reactive current flows</li>
              <li>Capacitor provides more VAr at 60Hz than at 50Hz</li>
            </ul>
            <p>
              <strong>Example 4: Time to Reach Peak Voltage.</strong> Starting from zero crossing,
              how long until UK mains reaches its positive peak?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Peak occurs when sin(ωt) = 1, i.e., ωt = π/2 (90°)</li>
              <li>t = (π/2) / ω = (π/2) / 314 = 1.571 / 314 = 0.005s = <strong>5ms</strong></li>
              <li>Verification: Peak is at T/4 = 20ms/4 = 5ms — One quarter cycle from zero to positive peak</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p>
              <strong>Essential Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>T = 1/f</strong> — Period-frequency relationship</li>
              <li><strong>ω = 2πf</strong> — Angular frequency (UK 50Hz: ω = 314 rad/s)</li>
              <li><strong>v = Vm sin(ωt)</strong> — Instantaneous voltage</li>
              <li><strong>Vm = Vrms × √2</strong> — Peak from RMS (UK: 325V peak)</li>
              <li><strong>ns = (120f)/p</strong> — Motor synchronous speed</li>
              <li><strong>XL = 2πfL</strong> — Inductive reactance</li>
              <li><strong>XC = 1/(2πfC)</strong> — Capacitive reactance</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK frequency: <strong>50Hz</strong></li>
              <li>UK period: <strong>20ms</strong></li>
              <li>Angular frequency (50Hz): <strong>ω = 314 rad/s</strong></li>
              <li>UK peak voltage: <strong>325V</strong> (from 230V RMS)</li>
              <li>√2 = <strong>1.414</strong></li>
              <li>2π = <strong>6.283</strong></li>
            </ul>
            <p>
              <strong>50Hz vs 60Hz Equipment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Motors:</strong> Will run 17% slower at 50Hz - check cooling and torque requirements</li>
              <li><strong>Transformers:</strong> May overheat at lower frequency - verify VA rating</li>
              <li><strong>Electronic equipment:</strong> Check for "50/60Hz" or "50-60Hz" rating</li>
              <li><strong>Timers/clocks:</strong> Mains-synchronised clocks run slow at 50Hz</li>
              <li><strong>Capacitors:</strong> Deliver less VAr at 50Hz than 60Hz</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using degrees instead of radians</strong> — Ensure calculator is in correct mode for sin(ωt)</li>
                <li><strong>Confusing peak and RMS</strong> — Always clarify which value is given/required</li>
                <li><strong>Wrong ω value</strong> — Remember ω = 314 rad/s for 50Hz, not 50</li>
                <li><strong>Forgetting frequency affects reactance</strong> — XL and XC change with frequency</li>
                <li><strong>Assuming equipment is frequency-agnostic</strong> — Always check rating plates</li>
              </ul>
            }
            doInstead="Use radians (not degrees) when computing sin(ωt) on a calculator. Always state whether a quoted voltage is peak or RMS. Memorise ω = 314 rad/s for 50Hz, ω = 377 rad/s for 60Hz. Re-check XL and XC for the actual supply frequency. Verify the rating plate before importing or repurposing equipment."
          />

          <SectionRule />

          <Scenario
            title="Imported 60 Hz chiller commissioning on a 50 Hz UK site"
            situation={
              <>
                A 75 kW screw chiller imported from a US project is being installed on a
                London commercial fit-out. Nameplate: 460 V, 60 Hz, 4-pole, 1750 RPM full
                load. The MCC is 400 V, 50 Hz. The contractor proposes simply re-tapping
                the 460 V transformer and connecting direct.
              </>
            }
            whatToDo={
              <>
                Reject the proposal. At 50 Hz the synchronous speed drops to (120 &times;
                50)/4 = 1500 RPM &mdash; a 16.7 % speed reduction and refrigerant flow
                shortfall that will not meet design duty. Magnetising current rises (V/f
                ratio increases from 7.67 to 8.0) so the motor draws more no-load current
                and the windings heat. Specify a properly rated VSD or a 50 Hz replacement
                motor; do not connect the as-imported machine. Record the variation against
                the design submission.
              </>
            }
            whyItMatters={
              <>
                Cross-frequency motor connection is one of the commonest commissioning
                failures on imported equipment. It breaches BS 7671 132.2.1 (suitability
                for service conditions), invalidates the manufacturer&rsquo;s warranty, and
                under refrigerant duty may breach F-Gas Regulation 517/2014 if the unit
                trips repeatedly.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'T = 1/f — UK 50 Hz gives T = 20 ms; 60 Hz systems give T = 16.67 ms. Memorise both for international equipment work.',
              '&omega; = 2&pi;f — UK 50 Hz gives &omega; = 314 rad/s; 60 Hz gives 377 rad/s. Used in every instantaneous-value and reactance calculation.',
              'V&#x2098; = V&#x1d63;&#x2098;&#x209b; &times; &radic;2 — UK 230 V RMS &harr; 325 V peak. Insulation rated to peak, conductors rated to RMS.',
              'v(t) = V&#x2098; sin(&omega;t) — set your calculator to radians, not degrees, when computing instantaneous values.',
              'Motor synchronous speed n&#x209b; = 120f/p — drops 17 % when 60 Hz equipment is run on 50 Hz, with consequent torque and cooling implications.',
              'X&#x2097; = 2&pi;fL rises with frequency; X&#x1d04; = 1/(2&pi;fC) falls with frequency — drives PFC capacitor sizing and harmonic resonance studies.',
              'Wavelength at 50 Hz is ~4000 km — transmission line effects are negligible inside any building, but matter on long-haul HV.',
              'BS EN 50160 fixes UK supply at 50 Hz &plusmn; 1 % under normal conditions — your BSE designs assume this envelope.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                AC Waveform Characteristics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Phase Difference and Vectors
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section3_2;
