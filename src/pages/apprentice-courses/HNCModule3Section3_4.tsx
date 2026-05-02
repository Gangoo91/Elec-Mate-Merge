/**
 * Module 3 · Section 3 · Subsection 4 — Sinusoidal, Non-sinusoidal and Distorted Waveforms
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Fourier decomposition, harmonic order, THD, neutral loading, IEEE 519, IEC 61000
 *   and G5/5 compliance. The framework every BSE designer needs for LED retrofits,
 *   VSD specification and data-centre power quality.
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

const TITLE = 'Sinusoidal, Non-sinusoidal and Distorted Waveforms - HNC Module 3 Section 3.4';
const DESCRIPTION =
  'Master waveform analysis for building services: pure sinusoids, complex waveforms, Fourier analysis, THD measurement, harmonic sources and their effects on electrical installations.';

const quickCheckQuestions = [
  {
    id: 'fundamental-frequency',
    question: 'What is the fundamental frequency of the UK mains supply?',
    options: ['25 Hz', '50 Hz', '60 Hz', '100 Hz'],
    correctIndex: 1,
    explanation:
      'The UK mains supply operates at 50 Hz fundamental frequency. All harmonic frequencies are multiples of this (e.g., 3rd harmonic = 150 Hz, 5th harmonic = 250 Hz).',
  },
  {
    id: 'third-harmonic',
    question:
      'Why are triplen harmonics (3rd, 9th, 15th) particularly problematic in three-phase systems?',
    options: [
      'They cause motors to overheat',
      'They add in the neutral conductor rather than cancelling',
      'They trip RCDs',
      'They only affect single-phase loads',
    ],
    correctIndex: 1,
    explanation:
      'In a balanced three-phase system, triplen harmonics (multiples of 3) are zero-sequence currents that add arithmetically in the neutral conductor, potentially causing it to carry up to 1.73 times the phase current.',
  },
  {
    id: 'thd-limit',
    question:
      'What is the typical maximum THD voltage limit for LV public supply under Engineering Recommendation G5/5?',
    options: ['2%', '5%', '8%', '10%'],
    correctIndex: 1,
    explanation:
      'Engineering Recommendation G5/5 limits total harmonic voltage distortion to 5% at the point of common coupling for LV supplies. Individual harmonics have lower limits depending on their order.',
  },
  {
    id: 'vsd-harmonics',
    question: 'Which harmonic orders are predominantly produced by a 6-pulse variable speed drive?',
    options: ['2nd, 4th, 6th', '3rd, 9th, 15th', '5th, 7th, 11th, 13th', 'All odd harmonics'],
    correctIndex: 2,
    explanation:
      'A 6-pulse VSD produces characteristic harmonics of order 6n plus or minus 1 (i.e., 5th, 7th, 11th, 13th, etc.). The 5th and 7th harmonics are typically the largest.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the peak voltage of a 230V RMS sinusoidal supply?',
    options: ['230V', '325V', '400V', '460V'],
    correctAnswer: 1,
    explanation:
      'Peak voltage = RMS x square root of 2. So 230V x 1.414 = 325V. This peak-to-peak swing is important when considering insulation stress and electronic component ratings.',
  },
  {
    id: 2,
    question:
      'Which waveform type has harmonic content that decreases proportionally to the harmonic order?',
    options: ['Square wave', 'Triangular wave', 'Sawtooth wave', 'Pure sinusoid'],
    correctAnswer: 1,
    explanation:
      "A triangular wave's harmonic amplitudes decrease as 1/n squared (where n is harmonic order), giving it lower THD than a square wave. Square waves decrease only as 1/n.",
  },
  {
    id: 3,
    question:
      'A waveform has a fundamental component of 100A and a 5th harmonic of 20A. What is the THD due to this harmonic alone?',
    options: ['5%', '10%', '20%', '25%'],
    correctAnswer: 2,
    explanation:
      'THD for a single harmonic = (harmonic current / fundamental current) x 100% = (20/100) x 100% = 20%. Total THD would include all harmonics in the calculation.',
  },
  {
    id: 4,
    question:
      'What neutral conductor sizing is typically required for circuits supplying significant non-linear loads?',
    options: [
      'Same as phase conductors',
      '1.5 times phase conductor size',
      'Double the phase conductor size',
      'Half the phase conductor size',
    ],
    correctIndex: 2,
    explanation:
      'For circuits with significant triplen harmonic content (e.g., LED lighting, IT equipment), the neutral may need to be doubled in size as triplen harmonics add in the neutral rather than cancel.',
  },
  {
    id: 5,
    question:
      'Which IEEE standard specifically addresses harmonic limits for electrical installations?',
    options: ['IEEE 519', 'IEEE 1547', 'IEEE 1159', 'IEEE 446'],
    correctAnswer: 0,
    explanation:
      "IEEE 519 'Recommended Practice for Harmonic Control in Electric Power Systems' defines harmonic current and voltage distortion limits at the point of common coupling.",
  },
  {
    id: 6,
    question: 'What effect do harmonics have on transformer operation?',
    options: [
      'Improved efficiency',
      'Reduced losses',
      'Increased heating due to eddy currents',
      'Lower magnetising current',
    ],
    correctAnswer: 2,
    explanation:
      'Harmonics cause additional heating in transformers due to increased eddy current and hysteresis losses. K-rated transformers are designed to handle this additional heating from non-linear loads.',
  },
  {
    id: 7,
    question: 'Which modern building load is a major source of 3rd harmonic currents?',
    options: [
      'Three-phase motors',
      'Resistive heaters',
      'LED lighting with SMPS drivers',
      'Incandescent lamps',
    ],
    correctAnswer: 2,
    explanation:
      'LED luminaires with switch-mode power supply drivers are significant sources of 3rd harmonic current. While individual units may comply with EN 61000-3-2, large installations aggregate these harmonics.',
  },
  {
    id: 8,
    question: 'What is the form factor of a pure sinusoidal waveform?',
    options: ['1.0', '1.11', '1.414', '1.732'],
    correctAnswer: 1,
    explanation:
      'Form factor = RMS value / average value = 0.707Vpk / 0.637Vpk = 1.11 for a pure sinusoid. Different form factors indicate non-sinusoidal waveforms and affect true-RMS meter accuracy.',
  },
  {
    id: 9,
    question:
      'According to IEC 61000-3-2, what is the purpose of Class A, B, C, and D equipment categories?',
    options: [
      'Power factor correction requirements',
      'Harmonic emission limits by equipment type',
      'Voltage tolerance requirements',
      'Fault current ratings',
    ],
    correctAnswer: 1,
    explanation:
      'IEC 61000-3-2 categorises equipment by type (Class A: general, B: portable tools, C: lighting, D: PC/TV) and sets specific harmonic current limits for each class to control emissions at source.',
  },
  {
    id: 10,
    question:
      'What is the primary advantage of using an active harmonic filter over a passive filter?',
    options: [
      'Lower cost',
      'Simpler installation',
      'Adaptive response to changing load conditions',
      'Higher power losses',
    ],
    correctAnswer: 2,
    explanation:
      "Active harmonic filters dynamically measure and inject compensating currents to cancel harmonics. Unlike passive filters, they adapt to changing load conditions and don't risk resonance with system impedance.",
  },
];

const faqs = [
  {
    question: 'Why do I need to understand harmonics as a building services engineer?',
    answer:
      'Modern buildings contain significant non-linear loads (LEDs, VSDs, IT equipment, UPS systems) that generate harmonic currents. Understanding harmonics is essential for correct neutral sizing, transformer selection (K-rating), power quality assessment, and avoiding problems like overheating, nuisance tripping, and interference with sensitive equipment.',
  },
  {
    question: 'How do I measure THD on site?',
    answer:
      'Use a power quality analyser or clamp meter with harmonic measurement capability (true-RMS with harmonic analysis). These instruments perform FFT (Fast Fourier Transform) analysis and display individual harmonic magnitudes and total THD. For comprehensive assessment, a portable power quality recorder logging over time is recommended.',
  },
  {
    question: 'When should I specify a K-rated transformer?',
    answer:
      'Specify K-rated transformers when serving predominantly non-linear loads. K-4 is suitable for mixed loads with some IT equipment, K-13 for dedicated computer rooms or data centres, and K-20 for the highest harmonic content environments. The K-factor accounts for additional eddy current losses from harmonic currents.',
  },
  {
    question: 'What is the relationship between power factor and harmonics?',
    answer:
      "Harmonics reduce the true power factor (displacement power factor x distortion power factor). Even if voltage and current fundamentals are in phase (unity displacement PF), harmonic content creates 'distortion reactive power' that increases apparent power and reduces overall power factor. This is why PFC capacitors alone don't solve harmonic problems.",
  },
  {
    question: 'Can harmonics damage equipment?',
    answer:
      'Yes. Harmonics cause additional heating in motors and transformers, can trigger nuisance tripping of circuit breakers and RCDs, cause capacitor failure due to overloading, create interference with sensitive electronics, and accelerate insulation degradation. The neutral conductor can also overheat if not properly sized for triplen harmonics.',
  },
  {
    question: 'What is the difference between voltage and current THD?',
    answer:
      'Current THD measures harmonic content of the current waveform drawn by loads. Voltage THD measures distortion of the supply voltage caused by harmonic currents flowing through system impedance. High current THD from a load causes voltage THD that affects all connected equipment. Limits are typically set on voltage THD at the point of common coupling.',
  },
];

const HNCModule3Section3_4 = () => {
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
            eyebrow="Module 3 · Section 3 · Subsection 4"
            title="Sinusoidal, Non-sinusoidal and Distorted Waveforms"
            description="Understanding waveform characteristics, harmonic analysis, and power quality in modern building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You decompose every distorted waveform into a Fourier series — the fundamental at 50 Hz plus integer-order harmonics tell you what neutral, transformer and PFC kit you need.',
              'You measure THD on every commissioning of LED, VSD or IT load — voltage THD &gt; 5 % at the PCC breaches Engineering Recommendation G5/5 and demands mitigation.',
              'You size the neutral up (often equal to or larger than phase) on circuits feeding triplen-rich loads — third harmonic adds arithmetically in the neutral, not vectorially.',
              'You specify K-rated transformers (K-4 office, K-13 IT, K-20 data centre) for non-linear loads — standard transformers overheat from eddy and stray losses on harmonic currents.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 524.2 (Cross-sectional area of neutral conductors)"
            clause="The cross-sectional area of the neutral conductor shall be at least equal to that of the line conductor in single-phase circuits, polyphase circuits where the size of the line conductor is less than or equal to 16 mm² for copper or 25 mm² for aluminium, and any circuit liable to carry harmonic currents — particularly third harmonic and odd multiples of third harmonic exceeding 15 %."
            meaning={
              <>
                BS 7671 524.2 plus Appendix 4 Section 5.5 is the controlling reg for
                neutral sizing on harmonic-rich circuits. As the BSE designer of any
                modern lighting or IT distribution board, you must apply the rating factors
                in Appendix 4 Table 4Aa for triplen content above 33 % &mdash; in dense
                LED or data-centre circuits the neutral may need to be sized
                1.45&times; or 2&times; the phase conductor.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 524.2 and Appendix 4 &sect;5.5; ENA Engineering Recommendation G5/5; IEEE 519-2014; IEC 61000-3-2"
          />

          <LearningOutcomes
            outcomes={[
              'Describe pure sinusoidal waveform characteristics and parameters',
              'Identify square, triangular, and sawtooth waveforms and their harmonic content',
              'Apply Fourier analysis principles to complex waveforms',
              'Calculate and interpret Total Harmonic Distortion (THD)',
              'Identify common sources of harmonic distortion in building services',
              'Apply IEEE 519 and IEC 61000 harmonic standards',
              'Determine neutral conductor sizing for non-linear loads',
              'Specify harmonic mitigation measures for building installations',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Pure Sinusoidal Waveforms">
            <p>
              A pure sinusoidal waveform is the ideal AC signal, containing only the fundamental
              frequency with no harmonic content. The UK mains supply is designed to be sinusoidal
              at 50 Hz, though in practice some distortion is always present.
            </p>
            <p>
              <strong>Mathematical representation:</strong> v(t) = Vpk sin(2pift + phi). Where Vpk
              = peak voltage, f = frequency (50 Hz), phi = phase angle.
            </p>
            <p>
              <strong>Key Sinusoidal Parameters (230V Supply):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Peak voltage (Vpk) = Vrms x 1.414 — 325V</li>
              <li>Peak-to-peak (Vpp) = 2 x Vpk — 650V</li>
              <li>Average value (Vavg) = Vpk x 0.637 — 207V</li>
              <li>RMS value (Vrms) = Vpk x 0.707 — 230V</li>
              <li>Form factor = Vrms / Vavg — 1.11</li>
              <li>Crest factor = Vpk / Vrms — 1.414</li>
              <li>Period (T) = 1/f — 20 ms</li>
              <li>Angular frequency (omega) = 2pif — 314 rad/s</li>
            </ul>
            <p>
              <strong>Remember:</strong> The RMS value (230V) is what we use for power calculations
              because it represents the equivalent DC voltage that would produce the same heating
              effect in a resistive load.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Square, Triangular, and Sawtooth Waveforms">
            <p>
              Non-sinusoidal waveforms are common in electronic circuits, control systems, and as
              the current waveforms drawn by many modern loads. Each type has a characteristic
              harmonic content that can be analysed using Fourier series.
            </p>
            <p>
              <strong>Common Non-Sinusoidal Waveforms:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Square wave — Harmonics: Odd only (1, 3, 5, 7...); Amplitude decay 1/n; THD 48.3%</li>
              <li>Triangular wave — Harmonics: Odd only (1, 3, 5, 7...); Amplitude decay 1/n²; THD 12.1%</li>
              <li>Sawtooth wave — Harmonics: All (1, 2, 3, 4, 5...); Amplitude decay 1/n; THD 80.3%</li>
              <li>Half-wave rectified — Harmonics: DC + all harmonics; Amplitude decay Complex; THD 121%</li>
              <li>Full-wave rectified — Harmonics: DC + even harmonics; Amplitude decay Complex; THD 48.3%</li>
            </ul>
            <p>
              <strong>Square Wave Fourier Series:</strong> v(t) = (4Vpk/pi) x [sin(omega t) +
              sin(3 omega t)/3 + sin(5 omega t)/5 + ...]. Contains only odd harmonics, amplitudes
              decrease as 1/n.
            </p>
            <p>Where Square Waves Appear:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Digital control signals</li>
              <li>Simple inverter outputs</li>
              <li>PWM switching signals</li>
              <li>Motor drive gate signals</li>
            </ul>
            <p>
              <strong>Key insight:</strong> The faster the rate of change (sharper edges), the
              more high-frequency harmonic content. Square waves have the sharpest edges, hence
              the highest harmonic content.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Complex Waveforms and Fourier Analysis">
            <p>
              Joseph Fourier proved that any periodic waveform can be represented as a sum of
              sinusoidal components at the fundamental frequency and integer multiples (harmonics).
              This is fundamental to understanding and measuring power quality.
            </p>
            <p>
              <strong>Fourier Series Representation:</strong> f(t) = a₀ + Sum[aₙcos(n omega t) +
              bₙsin(n omega t)]. Where a₀ = DC component (average value); n = 1 = Fundamental (50
              Hz); n = 2, 3, 4... = Harmonics.
            </p>
            <p>
              <strong>Harmonic Orders and Frequencies (50 Hz System):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1st (fundamental) — 50 Hz, Positive sequence, Effect: Normal operation</li>
              <li>3rd (triplen) — 150 Hz, Zero sequence, Effect: Adds in neutral</li>
              <li>5th — 250 Hz, Negative sequence, Effect: Opposes rotation</li>
              <li>7th — 350 Hz, Positive sequence, Effect: Aids rotation</li>
              <li>9th (triplen) — 450 Hz, Zero sequence, Effect: Adds in neutral</li>
              <li>11th — 550 Hz, Negative sequence, Effect: Opposes rotation</li>
              <li>13th — 650 Hz, Positive sequence, Effect: Aids rotation</li>
            </ul>
            <p>Harmonic sequence pattern (in a balanced three-phase system):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Positive sequence</strong> (1, 4, 7, 10...): n = 3k + 1 - rotates same direction as fundamental</li>
              <li><strong>Negative sequence</strong> (2, 5, 8, 11...): n = 3k + 2 - rotates opposite to fundamental</li>
              <li><strong>Zero sequence</strong> (3, 6, 9, 12...): n = 3k - does not rotate, adds in neutral (triplen harmonics)</li>
            </ul>
            <p>
              <strong>Practical note:</strong> Power quality analysers perform Fast Fourier
              Transform (FFT) to decompose measured waveforms into their harmonic components for
              analysis.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Total Harmonic Distortion (THD)">
            <p>
              Total Harmonic Distortion quantifies how much a waveform deviates from a pure
              sinusoid. It is the primary metric for assessing power quality and is expressed as a
              percentage.
            </p>
            <p>
              <strong>THD Calculation:</strong> THD = sqrt(V₂² + V₃² + V₄² + ...) / V₁ x 100%.
              Where V₁ = fundamental RMS, V₂, V₃, etc. = harmonic RMS values.
            </p>
            <p>
              <strong>THD Voltage (THDᵥ):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measures supply voltage quality</li>
              <li>Caused by harmonic currents in system impedance</li>
              <li>Affects all loads on the circuit</li>
              <li>Typical limit: 5% at LV (G5/5)</li>
            </ul>
            <p>
              <strong>THD Current (THDᵢ):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measures load current distortion</li>
              <li>Generated by non-linear loads</li>
              <li>Causes heating and neutral loading</li>
              <li>Can exceed 100% for some loads</li>
            </ul>
            <p>
              <strong>Interpreting THDᵥ Values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Less than 3% — Excellent — None - good power quality</li>
              <li>3% - 5% — Acceptable — Monitor for increase</li>
              <li>5% - 8% — Marginal — Investigation needed</li>
              <li>Greater than 8% — Poor — Mitigation essential</li>
            </ul>
            <p>
              <strong>Important:</strong> THD-R (relative to fundamental) is the standard measure.
              THD-F (relative to full RMS) gives lower values for the same waveform - ensure you
              know which is being used.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Sources of Waveform Distortion in Building Services">
            <p>
              Modern buildings contain numerous non-linear loads that draw non-sinusoidal currents
              even from a perfect sinusoidal supply. Understanding these sources is essential for
              power quality management.
            </p>
            <p>
              <strong>Major Harmonic Sources:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>6-pulse VSD (AHU, pump) — 5th, 7th, 11th, 13th — Typical THDᵢ 30-80%</li>
              <li>12-pulse VSD — 11th, 13th, 23rd, 25th — Typical THDᵢ 10-15%</li>
              <li>LED driver (SMPS) — 3rd, 5th, 7th — Typical THDᵢ 20-100%</li>
              <li>Switch-mode PSU (IT) — 3rd, 5th, 7th, 9th — Typical THDᵢ 80-130%</li>
              <li>UPS (double conversion) — 5th, 7th, 11th — Typical THDᵢ 25-35%</li>
              <li>Electronic fluorescent ballast — 3rd, 5th, 7th — Typical THDᵢ 15-25%</li>
              <li>Lift motor drive — 5th, 7th, 11th, 13th — Typical THDᵢ 40-80%</li>
              <li>Electric vehicle charger — 3rd, 5th, 7th (single-phase) — Typical THDᵢ 20-50%</li>
            </ul>
            <p>
              <strong>Variable Speed Drives (VSDs):</strong> VSDs are increasingly common for
              HVAC control but are significant harmonic sources:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>6-pulse drives</strong> produce harmonics of order 6n +/- 1 (5th, 7th, 11th, 13th...)</li>
              <li><strong>12-pulse drives</strong> eliminate 5th and 7th harmonics using phase-shifted transformers</li>
              <li><strong>18-pulse drives</strong> further reduce harmonics but at higher cost</li>
              <li><strong>Active front-end (AFE)</strong> drives have near-sinusoidal input current (THD less than 5%)</li>
            </ul>
            <p>
              <strong>LED Lighting Systems:</strong> While energy-efficient, LED drivers are
              single-phase non-linear loads with high 3rd harmonic content:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual luminaires comply with IEC 61000-3-2 Class C</li>
              <li>Large LED installations aggregate harmonic currents</li>
              <li>3rd harmonic (zero sequence) adds in neutral conductor</li>
              <li>Retrofit LED projects may exceed original neutral capacity</li>
            </ul>
            <p>
              <strong>Design consideration:</strong> When specifying VSDs, consider the total
              installed VSD power as a percentage of transformer capacity. Above 30%, harmonic
              mitigation is typically required.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Effects on Neutral Conductor Sizing">
            <p>
              In a balanced three-phase system with linear loads, the neutral current is zero as
              the phase currents cancel. However, triplen harmonics (3rd, 9th, 15th...) are
              zero-sequence currents that add arithmetically in the neutral.
            </p>
            <p>
              <strong>Critical Design Issue:</strong> With significant 3rd harmonic content, the
              neutral current can exceed the phase current by up to 1.73 times (square root of 3).
              This can cause neutral conductor overheating in installations designed with reduced
              neutral sizes.
            </p>
            <p>
              <strong>Neutral Current Calculation:</strong> Iₙ = 3 x I₃ (for 3rd harmonic only).
              For balanced loads with only 3rd harmonic content. If each phase carries 10A of
              fundamental and 5A of 3rd harmonic:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fundamental neutral current: 0A (balanced, cancels)</li>
              <li>3rd harmonic neutral current: 3 x 5A = 15A</li>
              <li>Total neutral current: 15A (50% of phase RMS!)</li>
            </ul>
            <p>
              <strong>BS 7671 Requirements for Neutral Sizing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0-15% 3rd harmonic — Same as phase (can reduce in some cases) — Mixed loads, resistive</li>
              <li>15-33% 3rd harmonic — Same as phase conductor — General office</li>
              <li>33-45% 3rd harmonic — Neutral sized for Iₙ (may exceed phase) — Dense LED/IT loads</li>
              <li>Greater than 45% 3rd harmonic — Neutral sized 1.45-2 times phase — Data centres, large LED</li>
            </ul>
            <p>
              <strong>Practical Solutions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Oversize neutral:</strong> Specify neutral equal to or larger than phase conductors</li>
              <li><strong>Separate neutrals:</strong> Consider individual neutrals per phase for distribution boards</li>
              <li><strong>Zig-zag transformer:</strong> Provides low-impedance path for triplen harmonics</li>
              <li><strong>Active filters:</strong> Inject compensating current to cancel harmonics</li>
              <li><strong>K-rated transformers:</strong> Designed to handle non-linear loads</li>
            </ul>
            <p>
              <strong>Important:</strong> BS 7671 Appendix 4 provides specific guidance on rating
              factors for harmonic currents. Always assess harmonic content when designing
              circuits for LED lighting or IT equipment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="IEEE and IEC Harmonic Standards">
            <p>
              International standards set limits on harmonic emissions and immunity to ensure
              power quality and electromagnetic compatibility. Building services engineers must
              understand these standards to specify compliant equipment.
            </p>
            <p>
              <strong>Key Harmonic Standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>IEEE 519 — Harmonic limits at PCC — Customer/utility interface</li>
              <li>IEC 61000-3-2 — Equipment emission limits (less than 16A) — Small appliances, LEDs</li>
              <li>IEC 61000-3-12 — Equipment emission limits (16-75A) — Larger equipment, VSDs</li>
              <li>IEC 61000-2-4 — Compatibility levels (industrial) — Planning levels</li>
              <li>EN 50160 — Supply voltage characteristics — DNO supply quality</li>
              <li>G5/5 (UK) — Planning limits for UK networks — DNO connection agreements</li>
            </ul>
            <p>
              <strong>IEEE 519 Voltage Distortion Limits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>≤ 1 kV (LV) — Individual harmonic 5.0%, THDᵥ 8.0%</li>
              <li>1 kV to 69 kV (MV) — Individual harmonic 3.0%, THDᵥ 5.0%</li>
              <li>69 kV to 161 kV — Individual harmonic 1.5%, THDᵥ 2.5%</li>
              <li>Greater than 161 kV (HV) — Individual harmonic 1.0%, THDᵥ 1.5%</li>
            </ul>
            <p>
              <strong>IEC 61000-3-2 Equipment Classes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class A:</strong> Balanced three-phase and other equipment not in B, C, or D</li>
              <li><strong>Class B:</strong> Portable tools (higher limits than Class A)</li>
              <li><strong>Class C:</strong> Lighting equipment (limits as % of fundamental)</li>
              <li><strong>Class D:</strong> Equipment with 'special waveshape' (PCs, monitors with power 75-600W)</li>
            </ul>
            <p>
              <strong>UK context:</strong> Engineering Recommendation G5/5 sets planning limits
              for harmonic voltage distortion in UK distribution networks. DNOs may require
              harmonic studies for large non-linear loads.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Services: Harmonic Assessment and Mitigation">
            <p>
              Modern commercial and industrial buildings require proactive harmonic management
              due to the prevalence of non-linear loads. This section covers practical assessment
              and mitigation strategies for building services engineers.
            </p>
            <p>
              <strong>When to Conduct Harmonic Assessment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>VSD capacity exceeds 30% of transformer rating</li>
              <li>Large LED lighting retrofit (greater than 50% of lighting load)</li>
              <li>New data centre or server room</li>
              <li>EV charging installation (multiple chargers)</li>
              <li>Unexplained equipment failures or nuisance tripping</li>
              <li>Neutral conductor overheating observed</li>
              <li>DNO connection agreement requires harmonic compliance</li>
            </ul>
            <p>
              <strong>Harmonic Mitigation Techniques:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Line reactors (3-5%) — Individual VSDs — Reduces THD to 35-45%</li>
              <li>DC link chokes — VSD DC bus — Reduces THD to 30-40%</li>
              <li>Passive harmonic filter — Fixed non-linear load — Tuned to specific harmonics</li>
              <li>Active harmonic filter — Variable/multiple loads — THD less than 5% achievable</li>
              <li>12/18-pulse rectifier — Large VSDs (greater than 100kW) — THD 8-12%</li>
              <li>Active front-end VSD — Critical installations — THD less than 5%</li>
              <li>K-rated transformer — High harmonic load areas — Accommodates, doesn't filter</li>
              <li>Phase-shifting transformer — Multiple similar loads — Cancels specific harmonics</li>
            </ul>
            <p>
              <strong>K-Rated Transformer Selection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>K-1 — Linear loads only — Resistive heating, motors DOL</li>
              <li>K-4 — General office — Mixed linear and non-linear</li>
              <li>K-13 — IT/telecommunications — High proportion SMPS</li>
              <li>K-20 — Data centre — Very high harmonic content</li>
            </ul>
            <p>
              <strong>Design tip:</strong> For new buildings, specify VSD manufacturers to provide
              low-harmonic drives (AFE or with integral filters) where practical. The additional
              capital cost is often offset by avoiding centralised mitigation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: THD Calculation.</strong> A current waveform has the following
              harmonic content: I₁ = 100A, I₃ = 40A, I₅ = 20A, I₇ = 14A. Calculate the THD.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>THD = sqrt(I₃² + I₅² + I₇²) / I₁ x 100%</li>
              <li>THD = sqrt(40² + 20² + 14²) / 100 x 100%</li>
              <li>THD = sqrt(1600 + 400 + 196) / 100 x 100%</li>
              <li>THD = sqrt(2196) / 100 x 100% = 46.86 / 100 x 100% = <strong>46.9%</strong></li>
              <li>This is high THD typical of a single-phase SMPS load</li>
            </ul>
            <p>
              <strong>Example 2: Neutral Current Assessment.</strong> A three-phase balanced
              lighting circuit has 20A per phase with 35% third harmonic content. Calculate the
              neutral current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3rd harmonic current per phase = 20A x 0.35 = 7A</li>
              <li>Fundamental neutral current = 0A (balanced)</li>
              <li>3rd harmonic neutral current = 3 x 7A = <strong>21A</strong></li>
              <li>Total phase RMS = sqrt(20² + 7²) = 21.2A</li>
              <li>Neutral carries 21A while phases only carry 21.2A — Neutral should be sized same as or larger than phases</li>
            </ul>
            <p>
              <strong>Example 3: VSD Harmonic Assessment.</strong> A building has a 500kVA
              transformer. The installed 6-pulse VSD load is 180kW. Should harmonic mitigation be
              specified?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>VSD proportion = 180kW / (500kVA x 0.8 pf) x 100% = 180 / 400 x 100% = <strong>45%</strong></li>
              <li>This exceeds the 30% guideline threshold</li>
              <li>Recommendation: Specify either Active harmonic filters at main LV panel; Low-harmonic VSD variants (AFE or with filters); or 12-pulse drives for larger motors</li>
            </ul>
            <p>
              <strong>Example 4: Waveform RMS Calculation.</strong> A voltage waveform has V₁ =
              230V, V₅ = 15V, V₇ = 10V. What is the true RMS voltage?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Vrms = sqrt(V₁² + V₅² + V₇²) = sqrt(230² + 15² + 10²)</li>
              <li>Vrms = sqrt(52900 + 225 + 100) = sqrt(53225) = <strong>230.7V</strong></li>
              <li>THDᵥ = sqrt(15² + 10²) / 230 x 100% = 7.8% — This exceeds the 5% limit - investigation needed</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p>
              <strong>Essential Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Vpk = Vrms x 1.414</strong> - Peak from RMS</li>
              <li><strong>THD = sqrt(sum of Vₙ²) / V₁</strong> - Total harmonic distortion</li>
              <li><strong>Iₙ = 3 x I₃</strong> - Neutral current from 3rd harmonic</li>
              <li><strong>fₙ = n x f₁</strong> - Harmonic frequency</li>
              <li><strong>Form factor = 1.11</strong> - For pure sinusoid</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK fundamental frequency: <strong>50 Hz</strong></li>
              <li>3rd harmonic frequency: <strong>150 Hz</strong></li>
              <li>THDᵥ limit (LV, G5/5): <strong>5%</strong></li>
              <li>VSD threshold for mitigation: <strong>30% of transformer</strong></li>
              <li>Maximum neutral current factor: <strong>1.73 x phase</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Undersizing neutrals</strong> - Always consider triplen harmonics in LED/IT circuits</li>
                <li><strong>Using average-reading meters</strong> - Only true-RMS meters give correct readings for distorted waveforms</li>
                <li><strong>Ignoring harmonic resonance</strong> - PFC capacitors can resonate with system inductance at harmonic frequencies</li>
                <li><strong>Assuming compliance</strong> - Individual compliant equipment can aggregate to exceed limits</li>
              </ul>
            }
            doInstead="Size neutral conductors equal to or larger than phase conductors on circuits feeding LED lighting or IT loads. Use a true-RMS power quality meter for any survey work. Check for resonance between PFC capacitors and supply impedance before specifying. Run an aggregate harmonic study before declaring compliance."
          />

          <SectionRule />

          <Scenario
            title="Office LED retrofit — neutral overload investigation"
            situation={
              <>
                A 1990s commercial office had 8/2.5 mm&sup2; SWA submains feeding lighting
                distribution boards, designed for incandescent and T8 fluorescent loads.
                After a full LED retrofit the FM team reports neutral overheating at one
                board, with the busbar test showing 32 A neutral against 28 A average phase
                current. Power-quality analyser shows 38 % third harmonic and 18 % fifth
                on each phase.
              </>
            }
            whatToDo={
              <>
                Apply BS 7671 Appendix 4 Table 4Aa: with 38 % third harmonic, the neutral
                rating factor is 0.86 of the phase conductor capacity, but the actual
                neutral current = 3 &times; (28 &times; 0.38) = 32 A &mdash; above the
                phase RMS. Either (a) replace the SWA with a cable having an
                equal-or-larger neutral, (b) split the lighting across two boards to
                halve the harmonic concentration, or (c) install a zig-zag transformer or
                active filter at the board to suppress triplen content. Document the
                solution against G5/5 limits.
              </>
            }
            whyItMatters={
              <>
                Neutral overheating is invisible until the cable insulation degrades and
                fails — at which point you have a fire risk in a concealed riser. Modern
                LED retrofits in older buildings routinely surface this problem. Failing
                to act breaches BS 7671 132.6 (mutual detrimental influence) and Reg 524.2
                (neutral sizing).
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Fourier series decomposes any periodic waveform into fundamental + harmonics — order n = 1 is the 50 Hz fundamental, n &gt; 1 are integer multiples.',
              'Triplen harmonics (3rd, 9th, 15th) are zero-sequence and add in the neutral &mdash; can drive neutral current to 1.73&times; phase current.',
              'Positive sequence (1, 4, 7&hellip;) rotates with the fundamental; negative sequence (5, 11&hellip;) opposes; zero sequence (3, 9&hellip;) does not rotate.',
              'THD = &radic;(&Sigma;V&#x2099;&sup2;) / V&#x2081; &mdash; G5/5 caps THDv at 5 % on LV public supplies.',
              'BS 7671 524.2 + Appendix 4 &sect;5.5 control neutral sizing; over 33 % triplen content can require neutral &gt; phase.',
              'IEEE 519 sets harmonic limits at the PCC; IEC 61000-3-2 limits equipment emissions (Class A&ndash;D).',
              'K-rated transformers (K-4 office, K-13 IT, K-20 data centre) handle eddy/stray heating from non-linear loads.',
              'Mitigation hierarchy: line reactor &rarr; DC link choke &rarr; passive filter &rarr; 12-pulse rectifier &rarr; active filter / AFE drive &mdash; cost rises with effectiveness.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Phase Difference and Vectors
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Harmonics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section3_4;
