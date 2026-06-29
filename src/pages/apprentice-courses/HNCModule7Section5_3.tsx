/**
 * Module 7 · Section 5 · Subsection 3 — Harmonic Mitigation
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Harmonic sources, effects, measurement, passive and active filters, and design considerations for building services
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Harmonic Mitigation - HNC Module 7 Section 5.3';
const DESCRIPTION =
  'Master harmonic mitigation techniques for building services: harmonic sources, effects on electrical systems, THD measurement, G5/5 limits, passive and active filters, K-rated transformers, and design considerations.';

const quickCheckQuestions = [
  {
    id: 'harmonic-definition',
    question: 'What is a harmonic in an electrical power system?',
    options: [
      'A sinusoidal component at a multiple of the fundamental frequency',
      'A momentary spike in voltage caused by a lightning strike',
      'The reactive power drawn by an inductive load',
      'A slow drift in supply frequency away from 50 Hz',
    ],
    correctIndex: 0,
    explanation:
      'A harmonic is a sinusoidal component of a periodic wave having a frequency that is an integer multiple of the fundamental frequency (50 Hz in the UK). The 3rd harmonic is 150 Hz, the 5th is 250 Hz, etc.',
  },
  {
    id: 'thd-meaning',
    question: 'What does THD stand for in power quality assessment?',
    options: [
      'Thermal Heat Distribution',
      'Total Harmonic Distortion',
      'Three-phase Harmonic Detection',
      'Transient Harmonic Delay',
    ],
    correctIndex: 1,
    explanation:
      'Total Harmonic Distortion (THD) is a measurement of the harmonic distortion present in a signal, expressed as a percentage of the fundamental frequency. It quantifies how much the waveform deviates from a pure sine wave.',
  },
  {
    id: 'triplen-harmonics',
    question:
      'Why are triplen harmonics (3rd, 9th, 15th) particularly problematic in three-phase systems?',
    options: [
      'They add arithmetically in the neutral conductor',
      'They cancel completely in the phase conductors',
      'They flow only in the protective earth conductor',
      'They are filtered out automatically by the supply transformer',
    ],
    correctIndex: 0,
    explanation:
      'Triplen harmonics (multiples of 3) are zero-sequence components that add arithmetically in the neutral conductor rather than cancelling. This can cause neutral currents to exceed phase currents, leading to overheating.',
  },
  {
    id: 'passive-filter-type',
    question: 'A passive harmonic filter typically consists of:',
    options: [
      'A microprocessor that measures and cancels harmonic currents',
      'A bank of bleed resistors connected across the supply',
      'Inductors and capacitors tuned to specific frequencies',
      'A second rectifier phase-shifted by 30 degrees',
    ],
    correctIndex: 2,
    explanation:
      'Passive harmonic filters use inductors and capacitors tuned to resonate at specific harmonic frequencies, providing a low-impedance path to divert harmonic currents away from the supply. They contain no active components.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is NOT a typical source of harmonics in modern buildings?',
    options: [
      'Variable speed drives (VSDs)',
      'Incandescent light bulbs',
      'LED lighting with electronic drivers',
      'Switch-mode power supplies in computers',
    ],
    correctAnswer: 1,
    explanation:
      'Incandescent bulbs are purely resistive loads and draw sinusoidal current, producing no harmonics. VSDs, LED drivers, and switch-mode power supplies all use power electronic switching that generates harmonic currents.',
  },
  {
    id: 2,
    question:
      'According to Engineering Recommendation G5/5, what is the typical planning level for THD voltage at 400V?',
    options: [
      '12%',
      '2%',
      '8%',
      '5%',
    ],
    correctAnswer: 2,
    explanation:
      'G5/5 sets planning levels for harmonic voltages. At 400V (LV), the typical planning level for THD is 8%. Individual harmonic limits also apply, with lower limits for lower-order harmonics.',
  },
  {
    id: 3,
    question: 'A VSD operating a 30 kW motor will predominantly produce which harmonic orders?',
    options: [
      '2nd, 4th, 6th, 8th (even harmonics)',
      '3rd, 9th, 15th (triplen harmonics)',
      'Only the fundamental at 50 Hz with no harmonics',
      '5th, 7th, 11th, 13th (characteristic harmonics)',
    ],
    correctAnswer: 3,
    explanation:
      'Six-pulse VSDs produce characteristic harmonics at orders 6n±1 (5th, 7th, 11th, 13th, etc.). The 5th and 7th are typically the largest. Twelve-pulse drives produce 12n±1 harmonics with reduced magnitudes.',
  },
  {
    id: 4,
    question: 'What is the primary effect of harmonic currents on transformer windings?',
    options: [
      'Additional heating due to increased eddy current and skin effect losses',
      'A permanent increase in the transformer turns ratio',
      'A reduction in the no-load magnetising current',
      'Improved efficiency due to better magnetic coupling',
    ],
    correctAnswer: 0,
    explanation:
      'Harmonic currents cause additional heating in transformers through increased eddy current losses (proportional to frequency squared) and skin effect. This is why K-rated transformers are designed to handle harmonic-rich loads.',
  },
  {
    id: 5,
    question: 'A K-13 rated transformer indicates it can handle:',
    options: [
      'A maximum of 13 harmonic orders before it must be replaced',
      'Harmonic loading equivalent to K-factor of 13',
      'A supply containing no more than 13% total harmonic distortion',
      'A load of exactly 13 kVA at the fundamental frequency',
    ],
    correctAnswer: 1,
    explanation:
      "K-factor rating indicates a transformer's ability to handle harmonic heating. K-13 can supply loads with a K-factor up to 13 without exceeding temperature limits. Higher K-factors indicate greater harmonic content tolerance.",
  },
  {
    id: 6,
    question:
      'Which mitigation technique would be most effective for a building with many single-phase non-linear loads causing neutral overheating?',
    options: [
      'A 12-pulse rectifier on the incoming supply transformer',
      'A series AC line reactor fitted to each lighting circuit',
      'Oversized neutral conductor with triplen harmonic filter',
      'A single tuned passive filter for the 5th harmonic only',
    ],
    correctAnswer: 2,
    explanation:
      'For widespread single-phase non-linear loads (computers, LED lighting), oversizing the neutral (typically to 200% of phase) combined with a neutral-connected triplen harmonic filter addresses the specific problem of 3rd harmonic accumulation.',
  },
  {
    id: 7,
    question: 'An active harmonic filter works by:',
    options: [
      'Blocking harmonics with tuned LC circuits',
      'Converting harmonics back to fundamental frequency',
      'Absorbing harmonics in large capacitor banks',
      'Injecting currents equal and opposite to the harmonic currents',
    ],
    correctAnswer: 3,
    explanation:
      'Active harmonic filters (AHFs) use power electronics to measure harmonic currents and inject equal but opposite currents, effectively cancelling the harmonics. They can adapt to changing load conditions unlike passive filters.',
  },
  {
    id: 8,
    question: 'What is the main advantage of using a 12-pulse VSD configuration over a 6-pulse?',
    options: [
      'Reduced 5th and 7th harmonic generation',
      'A lower purchase cost and simpler installation',
      'Elimination of all harmonics from the supply',
      'A higher motor speed range at the same frequency',
    ],
    correctAnswer: 0,
    explanation:
      'Twelve-pulse VSDs use two 6-pulse rectifiers with 30° phase shift, which cancels the 5th and 7th harmonics (the largest in 6-pulse drives). The lowest significant harmonics become 11th and 13th with reduced magnitudes.',
  },
  {
    id: 9,
    question:
      'When measuring THD with a power quality analyser, the measurement should typically be taken over:',
    options: [
      'A single instantaneous reading at switch-on',
      'At least 10 minutes under representative load conditions',
      'Only at no-load with all equipment switched off',
      'A few seconds during the worst-case inrush current',
    ],
    correctAnswer: 1,
    explanation:
      'G5/5 and power quality standards typically require measurements over periods that capture representative operating conditions. A minimum of 10 minutes under normal load is recommended, though 24-hour surveys provide more comprehensive data.',
  },
  {
    id: 10,
    question: 'Detuned harmonic filters include a reactor in series with the capacitor to:',
    options: [
      'Increase the reactive power the capacitor can deliver',
      'Raise the resonant frequency above the 13th harmonic',
      'Prevent resonance with the supply at harmonic frequencies',
      'Convert the capacitor bank into an active harmonic filter',
    ],
    correctAnswer: 2,
    explanation:
      'Detuned filters add inductance to shift the resonant frequency below the lowest significant harmonic (typically tuned to 189 Hz or 134 Hz). This prevents dangerous resonance amplification while still providing power factor correction.',
  },
  {
    id: 11,
    question:
      'Which symptom is most likely to indicate a harmonic problem in an electrical installation?',
    options: [
      'A steady improvement in measured power factor over time',
      'Cooler-than-normal running of transformers and cables',
      'A reduction in the supply voltage during peak demand only',
      'Unexplained nuisance tripping of circuit breakers',
    ],
    correctAnswer: 3,
    explanation:
      'Harmonics cause additional RMS current that thermal-magnetic breakers measure but may trip before the load appears overloaded. Other symptoms include overheating neutrals, transformer humming, and capacitor failures.',
  },
  {
    id: 12,
    question:
      'For a new commercial building with substantial IT load and LED lighting, which design approach best addresses harmonics?',
    options: [
      'K-rated transformer, oversized neutrals, and centralised active filtering',
      'Standard transformer with undersized neutral to save cable cost',
      'A single power factor correction capacitor bank with no detuning',
      'Relying solely on the supply network to absorb the harmonics',
    ],
    correctAnswer: 0,
    explanation:
      'A comprehensive approach includes: K-rated transformers to handle additional heating, oversized neutrals (typically 200%) for triplen harmonic current, and centralised active filtering or distributed harmonic mitigation at major non-linear loads.',
  },
];

const faqs = [
  {
    question: 'How do I know if a site has a harmonic problem?',
    answer:
      'Common indicators include: unexplained overheating of transformers, cables, or neutrals; nuisance tripping of circuit breakers; audible transformer humming or buzzing; premature failure of capacitors or power factor correction equipment; flickering or dimming of lights; interference with sensitive electronic equipment. A power quality survey with a harmonic analyser provides definitive diagnosis, measuring THD and individual harmonic magnitudes against G5/5 limits.',
  },
  {
    question: 'When should I specify a K-rated transformer instead of a standard unit?',
    answer:
      'K-rated transformers should be specified when the load has a calculated K-factor greater than 1. Use K-4 for moderate non-linear loads (up to 50% electronic), K-13 for heavy non-linear loads (data centres, UPS systems), and K-20 for extreme cases (mainframe computer rooms). Calculate K-factor using K = Σ(Ih²×h²) where Ih is the harmonic current and h is the harmonic order. If uncertain, a power quality survey of similar installations provides guidance.',
  },
  {
    question: 'What is the difference between passive and active harmonic filters?',
    answer:
      'Passive filters use tuned LC circuits to provide a low-impedance path for specific harmonic frequencies - they are lower cost but fixed in their filtering characteristics and can cause resonance issues. Active filters use power electronics to inject compensating currents, adapting to changing loads and filtering multiple harmonics simultaneously. Active filters cost more but offer superior performance for variable loads. Hybrid solutions combine both approaches.',
  },
  {
    question: 'Why do LED lights cause more harmonic problems than incandescent bulbs?',
    answer:
      'LED drivers contain switch-mode power supplies that draw current in short pulses rather than continuously. This pulsed current is rich in harmonics, particularly the 3rd harmonic. While each individual LED contributes little, the cumulative effect of thousands of LEDs in a building creates significant harmonic distortion. Modern LED drivers may include built-in harmonic filtering, and specifying drivers compliant with IEC 61000-3-2 helps manage the issue.',
  },
  {
    question: 'How do harmonics affect my power factor correction capacitors?',
    answer:
      'Capacitors present decreasing impedance to higher frequencies, attracting harmonic currents. This causes additional heating, potential resonance with supply inductance, and premature failure. Standard PFC capacitors should not be used where THD exceeds 5%. Solutions include detuned filters (capacitors with series reactors), active PFC, or relocating capacitors upstream of harmonic sources. Always assess harmonic levels before installing capacitor banks.',
  },
];

const HNCModule7Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Subsection 3"
            title="Harmonic Mitigation"
            description="Harmonic sources, effects, measurement, passive and active filters, and design considerations for building services"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Identify harmonic sources in modern electrical installations",
              "Understand harmonic effects on cables, transformers, and equipment",
              "Apply THD measurement techniques and interpret G5/5 limits",
              "Design passive harmonic filter solutions for specific frequencies",
              "Specify active filters and K-rated transformers appropriately",
              "Develop harmonic mitigation strategies for building services projects",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Harmonic Sources in Buildings">
            <p>Harmonics are sinusoidal components at frequencies that are integer multiples of the fundamental 50 Hz supply. They are generated by non-linear loads that draw current in pulses rather than as a continuous sine wave, distorting both current and voltage waveforms throughout the installation.</p>
            <p><strong>Common harmonic sources in modern buildings:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Variable speed drives (VSDs):</strong> Six-pulse rectifiers produce 5th, 7th, 11th, 13th harmonics</li>
              <li><strong>LED lighting:</strong> Switch-mode drivers generate predominantly 3rd harmonic current</li>
              <li><strong>IT equipment:</strong> Computers, servers with switch-mode PSUs produce 3rd and 5th harmonics</li>
              <li><strong>UPS systems:</strong> Both input rectifier and output inverter contribute harmonics</li>
              <li><strong>Lift drives:</strong> Modern regenerative drives are significant harmonic sources</li>
            </ul>
            <p><strong>Harmonic Orders and Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>3rd (triplen):</strong> 150 — Zero sequence — Single-phase loads (LEDs, PCs)</li>
              <li><strong>5th:</strong> 250 — Negative sequence — VSDs, rectifiers</li>
              <li><strong>7th:</strong> 350 — Positive sequence — VSDs, rectifiers</li>
              <li><strong>9th (triplen):</strong> 450 — Zero sequence — Single-phase loads</li>
              <li><strong>11th, 13th:</strong> 550, 650 — Neg/Pos sequence — VSDs, 6-pulse rectifiers</li>
            </ul>
            <p><strong>Key principle:</strong> Six-pulse converters produce harmonics at orders 6n±1 (5th, 7th, 11th, 13th...). Single-phase non-linear loads predominantly produce triplen harmonics (3rd, 9th, 15th...).</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Effects of Harmonics on Electrical Systems">
            <p>Harmonic distortion causes a range of problems from increased energy losses to equipment damage and nuisance tripping. Understanding these effects is essential for diagnosing problems and specifying appropriate mitigation measures.</p>
            <p><strong>Thermal Effects</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Increased cable heating (skin effect)</li>
              <li>Transformer overheating (eddy currents)</li>
              <li>Neutral conductor overheating</li>
              <li>Motor additional losses</li>
            </ul>
            <p><strong>Operational Effects</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Nuisance tripping of MCBs/MCCBs</li>
              <li>Capacitor failures and resonance</li>
              <li>Metering inaccuracies</li>
              <li>Electronic equipment malfunction</li>
            </ul>
            <p><strong>Critical: Neutral Conductor Overheating</strong></p>
            <p>In three-phase systems, triplen harmonics (3rd, 9th, 15th) are zero-sequence currents that add arithmetically in the neutral rather than cancelling. With significant single-phase non-linear loads, neutral current can exceed 170% of phase current. Standard neutral sizing (equal to phase) becomes dangerously inadequate.</p>
            <p><strong>Equipment-Specific Effects</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Transformers:</strong> Increased eddy current and hysteresis losses — Derating required or premature failure</li>
              <li><strong>Cables:</strong> Skin effect increases AC resistance — Additional voltage drop and heating</li>
              <li><strong>Circuit breakers:</strong> RMS current higher than expected — Nuisance tripping, inadequate protection</li>
              <li><strong>Motors:</strong> Negative sequence creates counter-torque — Reduced efficiency, overheating, vibration</li>
              <li><strong>Capacitors:</strong> Harmonic current amplification — Overheating, resonance, catastrophic failure</li>
            </ul>
            <p><strong>Diagnostic indicator:</strong> If transformers or panels are running hot with loads below rated capacity, or breakers trip without apparent overload, suspect harmonic distortion.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="THD Measurement and G5/5 Limits">
            <p>Total Harmonic Distortion (THD) quantifies waveform distortion as a percentage of the fundamental. UK installations must comply with Engineering Recommendation G5/5, which sets planning levels to limit harmonic voltage distortion on public supply networks.</p>
            <p><strong>THD Calculation</strong></p>
            <p>THD = √(V₂² + V₃² + V₄² + ... + Vₙ²) / V₁ × 100%</p>
            <p>Where:</p>
            <p>V₁ = Fundamental voltage (50 Hz)</p>
            <p>Vₙ = Voltage at harmonic order n</p>
            <p><strong>G5/5 Planning Levels at 400V (LV)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>5th:</strong> 6% — - — -</li>
              <li><strong>7th:</strong> 5% — - — -</li>
              <li><strong>3rd:</strong> - — 5% — -</li>
              <li><strong>9th:</strong> - — 1.5% — -</li>
              <li><strong>11th, 13th:</strong> 3.5% — - — -</li>
              <li><strong>THD (total):</strong> 8%</li>
            </ul>
            <p><strong>Power quality measurement requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Equipment:</strong> Class A power quality analyser per IEC 61000-4-30</li>
              <li><strong>Duration:</strong> Minimum 10 minutes, preferably 24 hours or longer</li>
              <li><strong>Conditions:</strong> Representative operating loads (typical working day)</li>
              <li><strong>Location:</strong> Point of common coupling (PCC) and within installation</li>
              <li><strong>Parameters:</strong> THD voltage, individual harmonic magnitudes, THD current</li>
            </ul>
            <p><strong>Compliance note:</strong> G5/5 limits apply at the point of common coupling. Internal installation limits may be tighter to ensure PCC compliance when supply impedance is considered.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Passive and Active Filter Solutions">
            <p>Harmonic mitigation strategies range from source treatment (reducing harmonic generation) to system-level filtering. The optimal solution depends on harmonic spectrum, load characteristics, and economic factors.</p>
            <p><strong>Passive Filters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Tuned LC circuits for specific harmonics</li>
              <li>Lower cost than active solutions</li>
              <li>Fixed filtering characteristics</li>
              <li>Risk of resonance with supply</li>
              <li>Also provides reactive power compensation</li>
            </ul>
            <p><strong>Active Filters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Injects compensating currents</li>
              <li>Adapts to changing loads</li>
              <li>Filters multiple harmonics simultaneously</li>
              <li>Higher cost but superior performance</li>
              <li>No resonance risk</li>
            </ul>
            <p><strong>Mitigation Techniques Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>12-pulse VSD:</strong> Large motor drives (&gt;100 kW) — Eliminates 5th, 7th harmonics</li>
              <li><strong>18-pulse VSD:</strong> Critical applications — THD &lt;5% achievable</li>
              <li><strong>DC choke:</strong> VSD input stage — 20-30% harmonic reduction</li>
              <li><strong>AC line reactor:</strong> VSD input, general loads — 35-45% harmonic reduction</li>
              <li><strong>Passive tuned filter:</strong> Specific harmonic orders — 80-90% of targeted harmonic</li>
              <li><strong>Active filter (AHF):</strong> Centralised or distributed — THD &lt;5% across spectrum</li>
              <li><strong>K-rated transformer:</strong> Non-linear load substations — Handles harmonic heating</li>
            </ul>
            <p><strong>K-Factor Transformer Ratings</strong></p>
            <p><strong>K-1:</strong> Linear loads only (motors, resistive heating)</p>
            <p><strong>K-4:</strong> Moderate non-linear loads (mixed office, some IT)</p>
            <p><strong>K-13:</strong> Heavy non-linear loads (data centres, UPS systems)</p>
            <p><strong>K-20:</strong> Extreme non-linear loads (mainframe computer rooms)</p>
            <p>K-factor = Σ(Iₕ² × h²) where Iₕ = per-unit harmonic current, h = harmonic order</p>
            <p><strong>Detuned filter design considerations:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Tuning frequency:</strong> 189 Hz (7%) or 134 Hz (14%) to avoid 3rd harmonic resonance</li>
              <li><strong>Reactor rating:</strong> Must handle harmonic current without saturation</li>
              <li><strong>Capacitor rating:</strong> Voltage rise from reactor must be considered</li>
              <li><strong>Location:</strong> Install close to non-linear loads for maximum effectiveness</li>
            </ul>
            <p><strong>Design strategy:</strong> For new installations, specify low-harmonic equipment at source. For existing installations, centralised active filtering often provides the best cost-performance ratio.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: K-Factor Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate K-factor for an IT load distribution board with measured harmonic currents.</p>
            <p>Measured harmonic currents (per unit of fundamental):</p>
            <p>I₁ = 1.00 (fundamental)</p>
            <p>I₃ = 0.82 (3rd harmonic)</p>
            <p>I₅ = 0.58 (5th harmonic)</p>
            <p>I₇ = 0.38 (7th harmonic)</p>
            <p>I₉ = 0.18 (9th harmonic)</p>
            <p>K = Σ(Iₕ² × h²)</p>
            <p>K = (1.00² × 1²) + (0.82² × 3²) + (0.58² × 5²) + (0.38² × 7²) + (0.18² × 9²)</p>
            <p>K = 1.00 + 6.05 + 8.41 + 7.08 + 2.62</p>
            <p>K = 25.16 → Specify K-30 transformer (or K-20 minimum with derating)</p>
            <p>
              <strong>Example 2: Neutral Conductor Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size neutral conductor for LED lighting circuit with high 3rd harmonic content.</p>
            <p>Given:</p>
            <p>Phase current = 32 A per phase</p>
            <p>3rd harmonic content = 80% of fundamental</p>
            <p>Neutral current calculation:</p>
            <p>Triplen harmonics add in neutral:</p>
            <p>I₃ per phase = 0.80 × 32 A = 25.6 A</p>
            <p>I₃ neutral = 3 × 25.6 A = 76.8 A</p>
            <p>Total neutral current (RMS):</p>
            <p>Includes fundamental imbalance + triplen sum</p>
            <p>Worst case ≈ 1.73 × phase current = 55.4 A fundamental</p>
            <p>Combined: √(55.4² + 76.8²) = 94.7 A</p>
            <p>Size neutral for minimum 100 A (200% of balanced phase current)</p>
            <p>Use 16 mm² minimum vs 10 mm² for phases</p>
            <p>
              <strong>Example 3: Active Filter Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size centralised active harmonic filter for commercial building.</p>
            <p>Building loads:</p>
            <p>- VSDs total: 150 kVA (THDi = 35%)</p>
            <p>- IT loads: 80 kVA (THDi = 100%)</p>
            <p>- LED lighting: 40 kVA (THDi = 60%)</p>
            <p>Harmonic current estimation:</p>
            <p>VSDs: 150 × 0.35 = 52.5 kVA harmonic</p>
            <p>IT: 80 × 1.00 = 80 kVA harmonic</p>
            <p>LEDs: 40 × 0.60 = 24 kVA harmonic</p>
            <p>Diversity factor (0.7 for different harmonic spectra):</p>
            <p>Total = (52.5 + 80 + 24) × 0.7 = 109.6 kVA</p>
            <p>Specify 125 kVA active harmonic filter</p>
            <p>Allow 15% margin for load growth</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Harmonic Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify all non-linear loads and their harmonic characteristics</li>
              <li>Measure existing THD at point of common coupling</li>
              <li>Check neutral conductors for thermal stress</li>
              <li>Verify transformer K-factor rating against actual load</li>
              <li>Assess power factor correction equipment compatibility</li>
              <li>Review circuit breaker trip history for unexplained events</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>THD voltage limit at LV: <strong>8%</strong> per G5/5</li>
              <li>5th harmonic voltage limit: <strong>6%</strong></li>
              <li>Neutral sizing for triplen loads: <strong>200%</strong> of phase</li>
              <li>6-pulse VSD harmonics: <strong>6n±1</strong> (5th, 7th, 11th, 13th)</li>
              <li>Detuning frequency: <strong>189 Hz</strong> (7%) typical</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Installing PFC capacitors without harmonic assessment</strong> - can cause resonance and capacitor failure</li>
                <li><strong>Using standard transformers for IT loads</strong> - causes overheating even at partial load</li>
                <li><strong>Undersizing neutrals</strong> - triplen harmonics sum, not cancel</li>
                <li><strong>Specifying passive filters without supply impedance analysis</strong> - resonance risk</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power factor correction
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Energy metering
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section5_3;
