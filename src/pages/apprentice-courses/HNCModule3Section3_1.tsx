/**
 * Module 3 · Section 3 · Subsection 1 — AC Waveform Characteristics (RMS, Average, Peak)
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Sinusoidal AC fundamentals — peak/RMS/average values, form and crest factors,
 *   meter selection. Foundation for every BSE engineer&rsquo;s power, voltage drop and
 *   insulation coordination calculation.
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

const TITLE = 'AC Waveform Characteristics (RMS, Average, Peak Values) - HNC Module 3 Section 3.1';
const DESCRIPTION =
  'Understand sinusoidal AC waveforms for building services: RMS values, peak voltages, form factor and crest factor. UK supply analysis with practical multimeter applications.';

const quickCheckQuestions = [
  {
    id: 'uk-peak-voltage',
    question: 'What is the peak voltage of the UK 230V RMS supply?',
    options: [
      '253V',
      '325V',
      '230V',
      '400V',
    ],
    correctIndex: 1,
    explanation:
      'UK supply is 230V RMS. Peak voltage = 230 x sqrt(2) = 230 x 1.414 = 325V. This is the maximum instantaneous voltage reached during each cycle.',
  },
  {
    id: 'rms-conversion',
    question: 'What is the RMS value of a sinusoidal waveform with a peak value of 100V?',
    options: [
      '50V',
      '63.7V',
      '70.7V',
      '100V',
    ],
    correctIndex: 2,
    explanation:
      'RMS = Peak x 0.707 (or Peak / sqrt(2)). Therefore: 100V x 0.707 = 70.7V RMS. This is the equivalent DC voltage that would produce the same heating effect.',
  },
  {
    id: 'form-factor',
    question: 'What is the form factor of a pure sinusoidal waveform?',
    options: [
      '0.707',
      '1.11',
      '1.0',
      '1.414',
    ],
    correctIndex: 1,
    explanation:
      'Form factor = RMS value / Average value = 0.707 / 0.637 = 1.11 for a pure sine wave. This ratio is used to verify waveform quality.',
  },
  {
    id: 'why-rms',
    question: 'Why are AC voltages quoted as RMS values rather than peak values?',
    options: [
      'Peak values are too high to display on a meter',
      'RMS values are easier to measure than peak values',
      'RMS is simply the value required by the wiring regulations',
      'RMS gives the equivalent DC heating effect',
    ],
    correctIndex: 3,
    explanation:
      'RMS (Root Mean Square) represents the equivalent DC value that would produce the same power dissipation in a resistive load. This makes power calculations straightforward: P = V squared / R works directly with RMS values.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does RMS stand for?',
    options: [
      'Resistance Measurement Standard',
      'Root Mean Square',
      'Regulated Mains Supply',
      'Rate of Maximum Swing',
    ],
    correctAnswer: 1,
    explanation:
      'RMS stands for Root Mean Square. It is calculated by taking the square root of the mean (average) of the squared values of the waveform over one complete cycle.',
  },
  {
    id: 2,
    question: 'A sinusoidal voltage has a peak value of 339V. What is its RMS value?',
    options: [
      '339V',
      '169.5V',
      '240V',
      '216V',
    ],
    correctAnswer: 2,
    explanation:
      'RMS = Peak x 0.707 = 339 x 0.707 = 239.7V which is approximately 240V. This is approximately the historic UK supply voltage before harmonisation.',
  },
  {
    id: 3,
    question:
      'What is the relationship between peak-to-peak voltage and peak voltage for a sinusoid?',
    options: [
      'Peak-to-peak = Peak / 2',
      'Peak-to-peak = Peak x sqrt(2)',
      'Peak-to-peak = Peak x 1.414',
      'Peak-to-peak = Peak x 2',
    ],
    correctAnswer: 3,
    explanation:
      'Peak-to-peak voltage is exactly twice the peak voltage, as it measures from the negative peak to the positive peak. For UK mains: Vp-p = 325V x 2 = 650V.',
  },
  {
    id: 4,
    question: 'The average value of a sinusoidal waveform over a complete cycle is:',
    options: [
      'Zero',
      '0.707 x Peak',
      '0.637 x Peak',
      'Equal to RMS',
    ],
    correctAnswer: 0,
    explanation:
      'Over a complete cycle, a sinusoid is symmetrical about zero, so positive and negative half-cycles cancel out. The average over one complete cycle is zero. The 0.637 factor applies to half-cycle average only.',
  },
  {
    id: 5,
    question:
      'A true RMS multimeter measures 230V on a distorted waveform. An average-responding meter reads 245V. What does this indicate?',
    options: [
      'The true RMS meter is faulty and reading low',
      'The waveform has significant harmonic distortion',
      'The supply voltage is exactly sinusoidal and both meters are correct',
      'The circuit is carrying direct current rather than alternating current',
    ],
    correctAnswer: 1,
    explanation:
      'Average-responding meters are calibrated for pure sinusoids (form factor 1.11). Distorted waveforms have different form factors, causing discrepancies. True RMS meters measure actual heating effect regardless of waveform shape.',
  },
  {
    id: 6,
    question: 'What is the crest factor of a pure sinusoidal waveform?',
    options: [
      '0.707',
      '1.11',
      '1.414',
      '2.0',
    ],
    correctAnswer: 2,
    explanation:
      'Crest factor = Peak / RMS = 1 / 0.707 = 1.414 (which equals sqrt(2)) for a pure sine wave. Higher crest factors indicate peakier waveforms.',
  },
  {
    id: 7,
    question:
      'An oscilloscope displays a 50Hz sinusoidal waveform. How many complete cycles appear in 40ms?',
    options: [
      '1 cycle',
      '20 cycles',
      '4 cycles',
      '2 cycles',
    ],
    correctAnswer: 3,
    explanation:
      'Period T = 1/f = 1/50 = 20ms per cycle. In 40ms: 40/20 = 2 complete cycles will be displayed.',
  },
  {
    id: 8,
    question: 'Why might equipment insulation be rated for 400V even when operating on 230V RMS?',
    options: [
      'To withstand the 325V peak voltage with safety margin',
      'Because RMS and peak voltage are the same value for a sine wave',
      'To allow the equipment to be used on 400V three-phase supplies as well',
      'Because insulation is always rated at double the nominal RMS voltage by convention',
    ],
    correctAnswer: 0,
    explanation:
      'Insulation must withstand peak voltage (325V) plus a safety margin for transients. Rating at 400V provides adequate clearance for the 325V peaks plus overvoltage conditions.',
  },
  {
    id: 9,
    question: 'Calculate the average value over a half-cycle for a waveform with Vpeak = 325V.',
    options: [
      '163V',
      '207V',
      '230V',
      '325V',
    ],
    correctAnswer: 1,
    explanation:
      'Half-cycle average = 0.637 x Peak = 0.637 x 325 = 207V. This value is used in rectifier calculations but not for power calculations.',
  },
  {
    id: 10,
    question:
      'A building services engineer measures 400V between phases in a three-phase system. What is the peak line voltage?',
    options: [
      '283V',
      '400V',
      '566V',
      '693V',
    ],
    correctAnswer: 2,
    explanation:
      'Peak = RMS x sqrt(2) = 400 x 1.414 = 566V. This is the maximum instantaneous voltage between any two phases.',
  },
  {
    id: 11,
    question:
      'Which meter type is essential for accurate measurement of variable speed drive output voltages?',
    options: [
      'Moving coil meter',
      'Average-responding digital meter',
      'Peak-reading meter',
      'True RMS meter',
    ],
    correctAnswer: 3,
    explanation:
      'VSDs produce non-sinusoidal PWM outputs. True RMS meters calculate actual heating effect regardless of waveform, giving accurate readings. Average-responding meters assume sinusoidal waveforms and give incorrect results.',
  },
  {
    id: 12,
    question: 'The UK supply frequency is 50Hz. What is the angular frequency (omega)?',
    options: [
      '314 rad/s',
      '628 rad/s',
      '50 rad/s',
      '100 pi rad/s',
    ],
    correctAnswer: 0,
    explanation:
      'Angular frequency omega = 2 x pi x f = 2 x pi x 50 = 314 rad/s (or 100 pi rad/s, both answers represent the same value).',
  },
];

const faqs = [
  {
    question: 'Why is UK mains voltage quoted as 230V when the actual voltage is often higher?',
    answer:
      'The UK harmonised with European standards to 230V +10%/-6% (216V to 253V). Historically UK used 240V, so most supplies still run at the upper end of tolerance (around 240V actual). The 230V nominal is a standards compromise that allowed both UK and continental European equipment to be compatible.',
  },
  {
    question: 'Do I need a true RMS meter for building services work?',
    answer:
      'For most standard installations with sinusoidal supplies, average-responding meters calibrated for RMS are adequate. However, true RMS meters are essential when measuring circuits with harmonic distortion (LED drivers, VFDs, electronic loads) or non-sinusoidal waveforms. Modern building services increasingly require true RMS capability.',
  },
  {
    question: 'Why does my oscilloscope show 325V peaks but my meter reads 230V?',
    answer:
      'Both readings are correct. Oscilloscopes display instantaneous voltage including peak values. Meters display RMS values (230V), which is the equivalent DC value for power calculations. The relationship is: Peak = RMS x sqrt(2) = 230 x 1.414 = 325V.',
  },
  {
    question: 'How do harmonics affect RMS readings?',
    answer:
      'Harmonics increase the true RMS value compared to the fundamental alone. If a 230V fundamental has 10% third harmonic, the true RMS is sqrt(230 squared + 23 squared) = 231.1V. This is why true RMS meters are important for distorted waveforms - average-responding meters would read incorrectly.',
  },
  {
    question: 'What is the difference between form factor and crest factor?',
    answer:
      "Form factor = RMS/Average (1.11 for sine wave) indicates waveform 'shape' relative to a sine wave. Crest factor = Peak/RMS (1.414 for sine wave) indicates how 'peaky' the waveform is. Both equal their sine wave values for undistorted supplies; deviations indicate harmonic content or waveform distortion.",
  },
];

const HNCModule3Section3_1 = () => {
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
            eyebrow="Module 3 · Section 3 · Subsection 1"
            title="AC Waveform Characteristics"
            description="RMS, average and peak values - understanding the sinusoidal waveforms that power building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You will work with RMS values for every power calculation, voltage drop sum and cable rating on a building services project — RMS is the equivalent DC heating value.',
              'You can convert peak (325 V) ↔ RMS (230 V) ↔ peak-to-peak (650 V) ↔ half-cycle average (207 V) for the UK 230 V single-phase supply.',
              'You select true-RMS instruments for any circuit feeding LED lighting, VSDs or switch-mode loads — average-responding meters lie on distorted waveforms.',
              'You specify equipment insulation against peak voltage with margin (400 V class for 230 V RMS), not RMS — switching transients can reach 2&ndash;3&times; nominal peak.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.1 (Voltage at terminals of equipment)"
            clause="In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment."
            meaning={
              <>
                BS 7671 expresses voltage limits at equipment terminals in RMS values
                because product standards (BS EN 60898 for MCBs, BS EN 60947 for switchgear)
                are RMS-rated. As a BSE designer you must convert from peak only when
                checking insulation withstand (BS 7671 443.4 / equipment data sheets) — not
                for the voltage-drop calculation in Appendix 4.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 525.1; BS EN 50160 (supply voltage characteristics, &plusmn;10 %)"
          />

          <LearningOutcomes
            outcomes={[
              'Describe sinusoidal AC waveform generation and characteristics',
              'Calculate peak, RMS and average values and convert between them',
              'Explain why RMS values are used for power calculations',
              'Apply form factor and crest factor to verify waveform quality',
              'Relate UK supply voltages to peak and RMS values',
              'Select appropriate meters for different measurement applications',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Sinusoidal AC Waveforms - Generation and Characteristics">
            <p>
              Alternating current (AC) is generated when a conductor rotates through a magnetic
              field, producing a voltage that varies sinusoidally with time. This is the fundamental
              principle behind all power station generators and forms the basis of UK electricity
              supply.
            </p>
            <p>Key characteristics of sinusoidal waveforms:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage varies smoothly between positive and negative peak values</li>
              <li>One complete cycle takes 20ms at 50Hz (UK frequency)</li>
              <li>Instantaneous voltage: v = Vm sin(omega t) where omega = 2 pi f</li>
              <li>Waveform repeats indefinitely with constant frequency</li>
            </ul>
            <p>
              <strong>The Sinusoidal Equation:</strong> v = Vm sin(omega t) = Vm sin(2 pi f t)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>v</strong> = instantaneous voltage (V)</li>
              <li><strong>Vm</strong> = peak voltage (V)</li>
              <li><strong>omega</strong> = angular frequency (rad/s)</li>
              <li><strong>f</strong> = frequency (Hz)</li>
              <li><strong>t</strong> = time (seconds)</li>
              <li><strong>2 pi f</strong> = 314 rad/s at 50Hz</li>
            </ul>
            <p>
              <strong>AC Waveform Terminology:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cycle</strong> — One complete positive and negative alternation</li>
              <li><strong>Period (T)</strong> — Time for one cycle: T = 1/f = 20ms at 50Hz</li>
              <li><strong>Frequency (f)</strong> — Cycles per second: 50Hz in UK</li>
              <li><strong>Angular frequency (omega)</strong> — Radians per second: omega = 2 pi f = 314 rad/s</li>
              <li><strong>Amplitude (Vm, Im)</strong> — Maximum value (peak) from zero</li>
            </ul>
            <p>
              <strong>Remember:</strong> The sinusoidal waveform is the 'purest' AC waveform. Any
              other periodic waveform can be represented as a combination of sinusoids at different
              frequencies (harmonics).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Peak and RMS Values">
            <p>
              The peak value (Vm or Im) is the maximum instantaneous value reached by the waveform.
              The RMS value is the effective value that produces the same heating effect as an
              equivalent DC supply - this is why AC voltages and currents are always quoted as RMS
              values.
            </p>
            <p>
              <strong>Fundamental Relationships (Sinusoidal Only):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>VRMS = Vpeak / sqrt(2) = 0.707 x Vpeak</li>
              <li>Vpeak = VRMS x sqrt(2) = 1.414 x VRMS</li>
            </ul>
            <p>Why RMS is used for power calculations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>RMS gives the equivalent DC heating effect in a resistor</li>
              <li>Power formula P = V squared / R works directly with RMS values</li>
              <li>A 230V RMS AC supply delivers the same power as 230V DC to a resistor</li>
              <li>All standard electrical equipment is rated in RMS values</li>
            </ul>
            <p>
              <strong>UK Supply Voltage Values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-phase RMS (nominal): 230V — Three-phase line: 400V</li>
              <li>Single-phase peak: 325V — Three-phase line peak: 566V</li>
              <li>Single-phase peak-to-peak: 650V — Three-phase line peak-to-peak: 1131V</li>
              <li>Single-phase half-cycle average: 207V — Three-phase line half-cycle average: 358V</li>
            </ul>
            <p>
              <strong>Mathematical Definition of RMS:</strong> VRMS = sqrt(1/T integral from 0 to T
              of v squared dt). For a sine wave, this evaluates to Vpeak/sqrt(2) = 0.707 x Vpeak.
            </p>
            <p>
              <strong>Key point:</strong> 230V RMS means the supply voltage varies between +325V and
              -325V, but delivers the same power as 230V DC would to a resistive load.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Average Value, Form Factor and Crest Factor">
            <p>
              The average value over a complete cycle of a symmetrical AC waveform is zero (positive
              and negative halves cancel). However, the half-cycle average is meaningful and used in
              rectifier calculations. Form factor and crest factor characterise waveform shape.
            </p>
            <p>
              <strong>Average Value (Half-Cycle):</strong> Vavg = 0.637 x Vpeak = (2/pi) x Vpeak.
              Only applies to half-cycle (rectified) waveforms.
            </p>
            <p>
              <strong>Form Factor</strong> = RMS / Average:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pure sine wave: 0.707/0.637 = <strong>1.11</strong></li>
              <li>Square wave: 1.0</li>
              <li>Triangular wave: 1.15</li>
              <li>Values not equal to 1.11 indicate non-sinusoidal</li>
            </ul>
            <p>
              <strong>Crest Factor</strong> = Peak / RMS:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pure sine wave: 1/0.707 = <strong>1.414</strong> (sqrt(2))</li>
              <li>Square wave: 1.0</li>
              <li>High crest factor = 'peaky' waveform</li>
              <li>Important for surge protection</li>
            </ul>
            <p>
              <strong>Waveform Comparison:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sine wave — RMS/Peak: 0.707, Form Factor: 1.11, Crest Factor: 1.414</li>
              <li>Square wave — RMS/Peak: 1.0, Form Factor: 1.0, Crest Factor: 1.0</li>
              <li>Triangle wave — RMS/Peak: 0.577, Form Factor: 1.15, Crest Factor: 1.73</li>
              <li>Distorted sine — RMS/Peak: Varies, Form Factor: Not 1.11, Crest Factor: Greater than 1.414</li>
            </ul>
            <p>
              <strong>Practical application:</strong> Comparing true RMS and average-responding
              meter readings can reveal waveform distortion. If they differ significantly, harmonics
              are present.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Practical Applications in Building Services">
            <p>
              Understanding AC waveform characteristics is essential for correct equipment
              selection, meter interpretation, and troubleshooting in modern building services where
              non-linear loads increasingly distort supply waveforms.
            </p>
            <p>
              <strong>Meter Types and Applications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Average-responding (scaled) — Measures average, scales by 1.11. Best for: Pure sinusoidal supplies</li>
              <li>True RMS — Calculates actual RMS mathematically. Best for: Any waveform, VSDs, LEDs</li>
              <li>Peak-reading — Captures maximum value. Best for: Transient detection, surges</li>
              <li>Moving coil (analogue) — Responds to average DC value. Best for: DC only (needs rectifier for AC)</li>
            </ul>
            <p>
              <strong>Building Services Considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LED lighting:</strong> Switch-mode drivers draw non-sinusoidal current - true RMS meters essential</li>
              <li><strong>Variable speed drives:</strong> PWM outputs are not sinusoidal - average-responding meters give wrong readings</li>
              <li><strong>Insulation testing:</strong> Test voltages must consider peak values (500V DC test is comparable to 354V AC RMS)</li>
              <li><strong>Harmonic surveys:</strong> Form factor deviation from 1.11 indicates harmonic content</li>
              <li><strong>Supply quality:</strong> Crest factor greater than 1.5 suggests voltage distortion issues</li>
            </ul>
            <p>
              <strong>Energy Meter Operation:</strong> Building energy meters measure real power
              (kW) and energy (kWh) using voltage and current transformers. They sample
              instantaneous v and i, multiply them, and integrate over time to give true energy
              consumption regardless of waveform distortion. Modern meters also measure kVA
              (apparent power), kVAr (reactive power), power factor, and total harmonic distortion
              (THD).
            </p>
            <p>
              <strong>Insulation and Voltage Ratings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Equipment insulation must withstand <strong>peak voltage</strong>, not just RMS</li>
              <li>230V RMS system has 325V peaks - insulation needs safety margin above this</li>
              <li>400V rated insulation provides adequate margin for 230V RMS systems</li>
              <li>Transient overvoltages can reach 2-3 times normal peak during switching</li>
            </ul>
            <p>
              <strong>Design tip:</strong> When specifying equipment for buildings with significant
              LED or VSD loads, always use true RMS instruments for measurements and consider
              harmonic filters if THD exceeds 5%.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: UK Supply Values.</strong> Calculate all voltage values for the UK
              230V supply.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: VRMS = 230V</li>
              <li>Vpeak = VRMS x sqrt(2) = 230 x 1.414 = <strong>325V</strong></li>
              <li>Vp-p = 2 x Vpeak = 2 x 325 = <strong>650V</strong></li>
              <li>Vavg (half-cycle) = 0.637 x Vpeak = 0.637 x 325 = <strong>207V</strong></li>
            </ul>
            <p>
              <strong>Example 2: Finding Peak from RMS Current.</strong> A circuit draws 13A RMS.
              What is the peak current and what current capacity must the cable withstand?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ipeak = IRMS x sqrt(2) = 13 x 1.414 = <strong>18.4A</strong></li>
              <li>Cable rated for 13A RMS (continuous rating)</li>
              <li>Thermal effects based on I squared R use RMS value</li>
              <li>Peak current is brief and does not cause additional heating</li>
              <li>Select cable based on 13A RMS, not peak</li>
            </ul>
            <p>
              <strong>Example 3: Form Factor Verification.</strong> A true RMS meter reads 228V
              while an average-responding meter reads 243V on the same circuit. What does this
              indicate?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Average-responding meter assumes form factor 1.11</li>
              <li>If pure sine: both meters should read same value</li>
              <li>Measured average = 243 / 1.11 = 219V (what meter actually sensed)</li>
              <li>Actual form factor = True RMS / Average = 228 / 219 = <strong>1.04</strong></li>
              <li>Form factor less than 1.11 indicates flat-topped waveform</li>
              <li>Likely cause: harmonic distortion from non-linear loads</li>
              <li>Investigation needed if THD exceeds 5%</li>
            </ul>
            <p>
              <strong>Example 4: Three-Phase Peak Voltages.</strong> Calculate peak voltages for a
              400V three-phase supply.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>VL(RMS) = 400V — VL(peak) = 400 x 1.414 = <strong>566V</strong></li>
              <li>VP(RMS) = 400 / sqrt(3) = 231V — VP(peak) = 231 x 1.414 = <strong>327V</strong></li>
              <li>Three-phase equipment must withstand 566V peaks between lines</li>
            </ul>
            <p>
              <strong>Example 5: Power Calculation Using RMS.</strong> A 46 ohm heating element is
              connected to 230V RMS. Calculate the power dissipation.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using P = V squared / R with RMS values directly</li>
              <li>P = (230) squared / 46 = 52900 / 46 = <strong>1150W</strong></li>
              <li>RMS values allow direct use of DC power formulas</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p>
              <strong>Essential Conversion Factors (Sine Wave):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>RMS = Peak x 0.707</strong> (or Peak / sqrt(2))</li>
              <li><strong>Peak = RMS x 1.414</strong> (or RMS x sqrt(2))</li>
              <li><strong>Average = Peak x 0.637</strong> (half-cycle only)</li>
              <li><strong>Peak-to-peak = Peak x 2</strong></li>
              <li><strong>Form factor = 1.11</strong> (RMS/Average)</li>
              <li><strong>Crest factor = 1.414</strong> (Peak/RMS)</li>
            </ul>
            <p>
              <strong>Key UK Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-phase: <strong>230V RMS = 325V peak</strong></li>
              <li>Three-phase line: <strong>400V RMS = 566V peak</strong></li>
              <li>Three-phase phase: <strong>230V RMS = 325V peak</strong></li>
              <li>Frequency: <strong>50Hz</strong> (T = 20ms)</li>
              <li>Angular frequency: <strong>omega = 314 rad/s</strong></li>
            </ul>
            <p>
              <strong>When to Use True RMS Meters:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measuring VSD/inverter output voltages or currents</li>
              <li>Circuits supplying LED lighting loads</li>
              <li>Any circuit with electronic/switch-mode equipment</li>
              <li>Power quality investigations</li>
              <li>When form factor differs from 1.11</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using peak for power:</strong> P = V x I uses RMS, not peak values</li>
                <li><strong>Confusing average types:</strong> Full-cycle average is zero; half-cycle average is 0.637 x peak</li>
                <li><strong>Wrong meter choice:</strong> Average-responding meters give errors on distorted waveforms</li>
                <li><strong>Ignoring peaks for insulation:</strong> Insulation must withstand peak voltage, not RMS</li>
                <li><strong>Assuming sine wave:</strong> Modern loads distort waveforms - verify with true RMS</li>
              </ul>
            }
            doInstead="Use RMS values for all power and heating calculations. Always remember the half-cycle average factor (0.637) only applies to rectified waveforms. Use true RMS instruments on any circuit feeding electronic, LED, or VSD loads. Specify insulation to withstand peak voltage with margin (400V class for 230V RMS systems)."
          />

          <SectionRule />

          <Scenario
            title="Choosing the right meter for an LED retrofit commissioning"
            situation={
              <>
                You are commissioning a 240-luminaire LED retrofit on a single 100 A
                three-phase distribution board. Your average-responding multimeter reads
                238 V on L1 but the energy meter logs the same circuit at 230 V true-RMS.
                The Class C LED drivers draw heavily distorted current (5th and 7th
                harmonics typical 25&ndash;40 %).
              </>
            }
            whatToDo={
              <>
                Switch to a true-RMS meter for every voltage and current reading on this
                board (Fluke 87V, Megger DCM340 or equivalent). Record line current with a
                clamp meter that supports true-RMS bandwidth to at least the 13th harmonic.
                Compare true-RMS phase currents to the neutral current — if the neutral
                exceeds 1.0&times; phase current you have triplen aggregation and need to
                size the neutral up under BS 7671 Appendix 4 / IEC 61000-3-2 considerations.
              </>
            }
            whyItMatters={
              <>
                An average-responding meter is calibrated for a pure sine form factor of
                1.11. A 25 % THD waveform throws the reading off by 5&ndash;10 %. That can
                mean you sign off a board as compliant when the true neutral current is
                already above its design rating, leading to overheating, RCBO nuisance
                tripping and breach of BS 7671 132.2.1 (suitability for service conditions).
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'RMS = peak / &radic;2 = peak &times; 0.707 — the value that produces the same heating effect as DC of the same magnitude.',
              'UK single-phase: 230 V RMS &harr; 325 V peak &harr; 650 V peak-to-peak &harr; 207 V half-cycle average.',
              'UK three-phase line: 400 V RMS &harr; 566 V peak — equipment insulation must withstand the 566 V peak with margin.',
              'Form factor 1.11 (RMS/avg) and crest factor 1.414 (peak/RMS) confirm a pure sine — deviations indicate harmonic distortion.',
              'P = V&sup2;/R works directly with RMS values — never use peak for power, never use full-cycle average (which is zero).',
              'Half-cycle average (0.637 &times; peak) only applies to rectified waveforms — used in DC bus calculations for VSD inputs.',
              'True-RMS meters mandatory for LED, VSD, SMPS and any non-linear load — average-responding meters give wrong readings on distorted waveforms.',
              'Building Regs Part L energy meters log true RMS power — this is your source of truth for kWh consumption regardless of waveform shape.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 2.7
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Frequency, Period and Amplitude
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section3_1;
