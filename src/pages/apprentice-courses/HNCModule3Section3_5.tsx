/**
 * Module 3 · Section 3 · Subsection 5 — Harmonics: Sources, Effects and Mitigation
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Practical harmonic engineering — VSD spectra, LED triplens, K-rated transformers,
 *   active and passive filters, BS 7671 / G5/5 compliance evidence. The mitigation
 *   playbook for any modern building distribution design.
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

const TITLE = 'Harmonics - Sources, Effects and Mitigation - HNC Module 3 Section 3.5';
const DESCRIPTION =
  'Master harmonic distortion in building services: understand harmonic frequencies, triplen harmonics, sources in VSDs and LED lighting, effects on electrical systems, and mitigation techniques including filters and K-rated transformers.';

const quickCheckQuestions = [
  {
    id: 'third-harmonic-freq',
    question: 'What is the frequency of the 3rd harmonic in a 50Hz UK supply system?',
    options: [
      '100Hz',
      '250Hz',
      '200Hz',
      '150Hz',
    ],
    correctIndex: 3,
    explanation:
      'The 3rd harmonic frequency = 3 × fundamental frequency = 3 × 50Hz = 150Hz. Harmonic frequencies are integer multiples of the fundamental frequency.',
  },
  {
    id: 'triplen-neutral',
    question:
      'In a balanced three-phase system with non-linear loads, which harmonics add together in the neutral conductor?',
    options: [
      'Even harmonics (2nd, 4th, 6th)',
      'Positive-sequence harmonics (7th, 13th)',
      'Negative-sequence harmonics (5th, 11th)',
      'Triplen harmonics (3rd, 9th, 15th)',
    ],
    correctIndex: 3,
    explanation:
      'Triplen harmonics (3rd, 9th, 15th, 21st, etc.) are zero-sequence harmonics that add arithmetically in the neutral conductor rather than cancelling. This can cause neutral currents up to 1.73 times the phase current.',
  },
  {
    id: 'vsd-harmonics',
    question: 'A 6-pulse Variable Speed Drive (VSD) primarily produces which dominant harmonics?',
    options: [
      '3rd and 9th',
      '11th and 13th',
      '2nd and 4th',
      '5th and 7th',
    ],
    correctIndex: 3,
    explanation:
      'A standard 6-pulse VSD produces harmonics of order h = (6n ± 1), where n = 1, 2, 3... This gives 5th, 7th, 11th, 13th, etc. The 5th and 7th are typically the most significant.',
  },
  {
    id: 'k-rated-transformer',
    question: 'What is the primary purpose of a K-rated transformer?',
    options: [
      'Step the voltage up for long-distance transmission',
      'Correct the power factor of non-linear loads',
      'Filter out triplen harmonics before the neutral',
      'Withstand additional heating from harmonic currents',
    ],
    correctIndex: 3,
    explanation:
      "K-rated transformers are designed with additional thermal capacity to handle the increased I²R heating caused by harmonic currents. The K-factor indicates the transformer's ability to serve non-linear loads.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What defines the order of a harmonic?',
    options: [
      'Its phase angle relative to the fundamental',
      'The number of times greater its frequency is than the fundamental',
      'Its amplitude as a percentage of the fundamental',
      'Its power contribution to the total waveform',
    ],
    correctAnswer: 1,
    explanation:
      'Harmonic order is the ratio of the harmonic frequency to the fundamental frequency. A 3rd harmonic has 3 times the fundamental frequency (150Hz in a 50Hz system).',
  },
  {
    id: 2,
    question: 'Why do single-phase electronic loads predominantly produce odd harmonics?',
    options: [
      'Because the rectifier uses two diodes',
      'Because AC current flows in one direction',
      'Because they have symmetrical positive and negative half-cycles',
      'Because the supply voltage is sinusoidal',
    ],
    correctAnswer: 2,
    explanation:
      'Most electronic loads draw current symmetrically on positive and negative half-cycles. This half-wave symmetry in the time domain results in only odd harmonics being present in the frequency spectrum.',
  },
  {
    id: 3,
    question:
      'In a 400V three-phase system with 100A per phase of triplen harmonic current, what could the neutral current theoretically reach?',
    options: [
      '173A',
      '0A',
      '100A',
      '300A',
    ],
    correctAnswer: 3,
    explanation:
      'Triplen harmonics are zero-sequence and add arithmetically in the neutral. With 100A of triplen harmonic current per phase, the neutral current could reach 3 × 100A = 300A.',
  },
  {
    id: 4,
    question: 'What is Total Harmonic Distortion (THD)?',
    options: [
      'The RMS value of all harmonics expressed as a percentage of the fundamental',
      'The peak value of the highest single harmonic present',
      'The phase shift between the fundamental and the 3rd harmonic',
      'The ratio of neutral current to total phase current',
    ],
    correctAnswer: 0,
    explanation:
      'THD is calculated as √(I₂² + I₃² + I₄² + ...)/I₁ × 100%, representing the total harmonic content as a percentage of the fundamental component.',
  },
  {
    id: 5,
    question: 'Which type of filter is most commonly used to reduce 5th harmonic distortion?',
    options: [
      'Low-pass filter',
      'Tuned passive filter',
      'Band-stop filter',
      'High-pass filter',
    ],
    correctAnswer: 1,
    explanation:
      'Tuned passive filters are designed to provide a low-impedance path at a specific harmonic frequency, diverting that harmonic current away from the supply. They are commonly tuned to the 5th harmonic (250Hz).',
  },
  {
    id: 6,
    question: 'What effect do harmonics have on energy meter accuracy?',
    options: [
      'They have no effect on any type of energy meter',
      'They always cause meters to over-read consumption',
      'Older meters may under-read actual energy consumption',
      'They reduce the metered voltage but not the current',
    ],
    correctAnswer: 2,
    explanation:
      'Traditional electromechanical meters were designed for sinusoidal waveforms and may not accurately measure energy in harmonic-rich environments. Modern electronic meters typically handle harmonics better, but verification may be required.',
  },
  {
    id: 7,
    question:
      'According to BS 7671, what consideration is required for neutral conductors in circuits supplying harmonic-generating equipment?',
    options: [
      'Neutral must always be twice the phase conductor size',
      'Neutral can be reduced to 50% of phase conductor size',
      'Neutral conductor is not required for harmonic loads',
      'Neutral may need to be oversized due to triplen harmonic currents',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Regulation 523.6.1 addresses neutral current in harmonic-rich circuits. Where third harmonic distortion exceeds 15% of the fundamental, the neutral conductor is treated as a loaded conductor and shall be at least equal to the line conductors.',
  },
  {
    id: 8,
    question: 'What is the primary advantage of using a 12-pulse VSD over a 6-pulse VSD?',
    options: [
      'Elimination of 5th and 7th harmonics',
      'Removal of all triplen harmonics from the neutral',
      'A lower output voltage to the connected motor',
      'A reduced number of input rectifier diodes',
    ],
    correctAnswer: 0,
    explanation:
      'A 12-pulse VSD produces harmonics of order h = (12n ± 1), eliminating the 5th, 7th, 17th, 19th harmonics. The lowest significant harmonics are the 11th and 13th, which are smaller in magnitude.',
  },
  {
    id: 9,
    question:
      'What is the typical K-factor rating recommended for a transformer supplying a data centre with high harmonic loads?',
    options: [
      'K-1',
      'K-13',
      'K-4',
      'K-30',
    ],
    correctAnswer: 1,
    explanation:
      'Data centres with servers, UPS systems, and IT equipment typically require K-13 rated transformers. K-4 is suitable for light harmonic loads, while K-20 or higher may be needed for extremely non-linear loads.',
  },
  {
    id: 10,
    question:
      'Which harmonic can cause overheating of three-phase motors due to negative sequence effects?',
    options: [
      '3rd harmonic',
      '9th harmonic',
      '5th harmonic',
      '7th harmonic',
    ],
    correctAnswer: 2,
    explanation:
      'The 5th harmonic creates a negative sequence component that produces a reverse rotating magnetic field in motors. This opposes the fundamental field, causing additional heating, vibration, and reduced torque.',
  },
];

const faqs = [
  {
    question: 'Why are harmonics becoming more of a concern in modern buildings?',
    answer:
      'Modern buildings have dramatically increased non-linear loads: LED lighting, computers, servers, VSDs for HVAC motors, and UPS systems. A typical modern office building may have 50-70% of its load from non-linear sources, compared to less than 20% thirty years ago. This concentration of harmonic-generating equipment creates cumulative effects that can cause significant power quality problems.',
  },
  {
    question: 'How do I measure harmonics on site?',
    answer:
      'Use a power quality analyser capable of measuring individual harmonic currents and voltages up to at least the 25th harmonic. Key measurements include THD (Total Harmonic Distortion), individual harmonic magnitudes, and neutral current. EN 50160 and Engineering Recommendation G5/5 define acceptable limits. Measurements should be taken over a representative period, typically a week minimum.',
  },
  {
    question: 'When is an active harmonic filter better than a passive filter?',
    answer:
      "Active filters are preferred when: loads vary significantly, multiple harmonic orders need treatment, space is limited, or precise harmonic reduction is required. Passive filters are more cost-effective for fixed loads with dominant single harmonics. Active filters can adapt to changing conditions and won't cause resonance issues, but are more expensive and complex.",
  },
  {
    question: 'Can harmonics damage equipment?',
    answer:
      'Yes, harmonics can cause: transformer and motor overheating, capacitor failure (due to resonance), nuisance tripping of RCDs and MCBs, premature failure of contactors and relays, interference with sensitive electronic equipment, and accelerated insulation degradation. The economic impact includes increased energy losses, equipment replacement costs, and reduced system reliability.',
  },
  {
    question: 'What is the difference between voltage and current harmonics?',
    answer:
      'Current harmonics are generated by non-linear loads drawing non-sinusoidal current. Voltage harmonics result from these harmonic currents flowing through system impedances, creating harmonic voltage drops. A stiff supply (low impedance) will have lower voltage THD for the same current THD. Voltage THD is typically limited to 5% at the point of common coupling.',
  },
  {
    question: 'How do harmonics affect power factor correction capacitors?',
    answer:
      "Capacitive reactance decreases with frequency (Xc = 1/2πfC), so capacitors attract harmonic currents. If a harmonic frequency coincides with the system's resonant frequency (determined by supply inductance and capacitor value), dangerous resonance can occur, potentially destroying capacitors and causing voltage magnification. Detuned reactors or active PFC are often required in harmonic-rich environments.",
  },
];

const HNCModule3Section3_5 = () => {
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
            eyebrow="Module 3 · Section 3 · Subsection 5"
            title="Harmonics - Sources, Effects and Mitigation"
            description="Understanding and managing harmonic distortion in modern building electrical systems"
            tone="purple"
          />

          <TLDR
            points={[
              'You identify harmonic source spectra by load type — 6-pulse VSD = 5/7/11/13, single-phase SMPS = 3/5/7, LED driver = 3/5 — and pick mitigation matched to that spectrum.',
              'You evaluate transformer derating and K-factor selection on every BSE board feeding non-linear load above ~30 % of transformer kVA.',
              'You compare passive (line reactor, tuned LC, zig-zag) and active filters against THDi targets — passive is cheap and brittle, active adapts to load mix.',
              'You document G5/5 compliance at the point of common coupling for any project the DNO flags as a Stage 2 / Stage 3 connection assessment.',
            ]}
          />

          <RegsCallout
            source="ENA Engineering Recommendation G5/5 — Harmonic voltage distortion at the point of common coupling"
            clause="The total harmonic voltage distortion (THDv) on LV public networks (≤ 1 kV) shall not exceed 5 %, with individual harmonic limits including 4 % for the 5th, 4 % for the 7th and 5 % for the 3rd at LV."
            meaning={
              <>
                G5/5 (which superseded G5/4-1 in 2020) is the UK DNO&rsquo;s harmonic
                planning standard. Any large LED retrofit, multi-VSD HVAC plant or EV
                charger array may trigger a Stage 2 (estimated emission) or Stage 3
                (measured) assessment. As the BSE engineer you specify the mitigation
                (line reactors, AFE drives, active filters) that keeps the project below
                the limit at the PCC and provides the compliance evidence with the DNO
                connection application.
              </>
            }
            cite="Source: ENA Engineering Recommendation G5/5; BS 7671:2018+A4:2026, Reg 524.2 + Appendix 4 &sect;5.5; IEC 61000-3-2 / -3-12; IEEE 519-2014"
          />

          <LearningOutcomes
            outcomes={[
              'Explain harmonic frequencies and their relationship to the fundamental',
              'Distinguish between odd, even, and triplen harmonics and their effects',
              'Identify common harmonic sources in building services installations',
              'Describe the effects of harmonics on transformers, motors, and cables',
              'Apply mitigation techniques including filters and K-rated transformers',
              'Understand BS 7671 requirements for harmonic-rich environments',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Harmonic Fundamentals">
            <p>
              Harmonics are currents or voltages at frequencies that are integer multiples of the
              fundamental supply frequency. In the UK's 50Hz system, the 3rd harmonic is at 150Hz,
              the 5th at 250Hz, and so on. These harmonics combine with the fundamental to create
              distorted waveforms.
            </p>
            <p>Key harmonic concepts:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Harmonic order (h):</strong> The multiple of the fundamental frequency (3rd, 5th, 7th...)</li>
              <li><strong>Fundamental (h=1):</strong> The 50Hz component - the intended power frequency</li>
              <li><strong>THD:</strong> Total Harmonic Distortion - measures overall harmonic content</li>
              <li><strong>Fourier analysis:</strong> Any periodic waveform can be decomposed into harmonics</li>
            </ul>
            <p>
              <strong>Harmonic Frequencies in a 50Hz System:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1st (Fundamental) — 50Hz, Positive sequence — The intended supply</li>
              <li>3rd — 150Hz, Zero sequence — Triplen, adds in neutral</li>
              <li>5th — 250Hz, Negative sequence — Reverse rotating field in motors</li>
              <li>7th — 350Hz, Positive sequence — Forward rotating field in motors</li>
              <li>9th — 450Hz, Zero sequence — Triplen, adds in neutral</li>
              <li>11th — 550Hz, Negative sequence — Common from 12-pulse drives</li>
              <li>13th — 650Hz, Positive sequence — Common from 12-pulse drives</li>
            </ul>
            <p>
              <strong>Sequence matters:</strong> Positive sequence harmonics (1, 4, 7, 10...)
              rotate in the same direction as the fundamental. Negative sequence (2, 5, 8, 11...)
              rotate opposite. Zero sequence (3, 6, 9, 12...) do not create a rotating field but
              add in the neutral.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Odd, Even and Triplen Harmonics">
            <p>
              Understanding the different categories of harmonics is essential for predicting
              their effects and selecting appropriate mitigation strategies. Each type behaves
              differently in three-phase systems.
            </p>
            <p>
              <strong>Odd Harmonics</strong> (3rd, 5th, 7th, 9th, 11th...):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Predominant in most non-linear loads</li>
              <li>Result from half-wave symmetry</li>
              <li>Most significant for power quality</li>
            </ul>
            <p>
              <strong>Even Harmonics</strong> (2nd, 4th, 6th, 8th...):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rare - indicate asymmetrical operation</li>
              <li>Present in half-wave rectifiers</li>
              <li>May indicate equipment faults</li>
            </ul>
            <p>
              <strong>Triplen Harmonics</strong> (3rd, 9th, 15th, 21st...):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zero-sequence (in-phase)</li>
              <li>Add arithmetically in neutral</li>
              <li>Critical for neutral sizing</li>
            </ul>
            <p>
              <strong>Critical: Triplen Harmonics and Neutral Current.</strong> In a balanced
              three-phase system, fundamental currents cancel in the neutral. However, triplen
              harmonics are all in-phase (zero-sequence) and ADD together. Neutral current
              (triplen) = 3 × Phase triplen current. Example: If each phase has 40A of 3rd
              harmonic current: Iₙ = 3 × 40A = <strong>120A in neutral</strong>. This can exceed
              the phase current, causing neutral overheating.
            </p>
            <p>
              <strong>Why Odd Harmonics Dominate:</strong> Most electronic loads draw current
              symmetrically on both half-cycles of the AC waveform. This half-wave symmetry means
              the positive and negative half-cycles are mirror images, which mathematically
              results in only odd harmonic components. Even harmonics would require asymmetry
              between half-cycles - typically indicating a fault condition or unusual load
              characteristic.
            </p>
            <p>
              <strong>Design rule:</strong> When third harmonic current exceeds 15% of the
              fundamental, consider increasing neutral conductor size per BS 7671 Regulation
              523.6.3.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Sources of Harmonics in Building Services">
            <p>
              Non-linear loads draw current in a non-sinusoidal pattern, generating harmonics.
              Modern buildings are increasingly dominated by these loads, making harmonic
              management a critical design consideration.
            </p>
            <p>
              <strong>Major Harmonic Sources:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>6-pulse VSD — 5th, 7th, 11th, 13th — Typical THDᵢ 30-80% — Application: HVAC fans, pumps</li>
              <li>LED drivers (SMPS) — 3rd, 5th, 7th — Typical THDᵢ 20-150% — Application: Lighting throughout</li>
              <li>Computers/servers — 3rd dominant — Typical THDᵢ 60-100% — Application: Offices, data centres</li>
              <li>UPS systems — 5th, 7th, 11th — Typical THDᵢ 25-35% — Application: Data centres, critical loads</li>
              <li>Lift drives — 5th, 7th — Typical THDᵢ 40-60% — Application: Vertical transportation</li>
              <li>Fluorescent lighting — 3rd, 5th — Typical THDᵢ 15-25% — Application: Legacy installations</li>
            </ul>
            <p>
              <strong>Variable Speed Drives (VSDs):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Input rectifier draws pulsed current</li>
              <li>6-pulse produces h = (6n ± 1): 5, 7, 11, 13...</li>
              <li>12-pulse produces h = (12n ± 1): 11, 13, 23, 25...</li>
              <li>Active front end VSDs have lowest THD</li>
            </ul>
            <p>
              <strong>LED Lighting Systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switch-mode drivers generate harmonics</li>
              <li>3rd harmonic particularly high</li>
              <li>Poor quality drivers can exceed 100% THD</li>
              <li>Cumulative effect significant in large installations</li>
            </ul>
            <p>
              <strong>IT Equipment and Data Centres:</strong> Server power supplies use
              switch-mode rectification, drawing current only at the peak of each half-cycle. This
              creates a characteristic current waveform with very high 3rd harmonic content -
              often 80% of the fundamental or more. A data centre with 1MW of IT load may
              generate 800kW equivalent of 3rd harmonic current, requiring careful neutral
              conductor sizing and transformer specification.
            </p>
            <p>
              <strong>Design consideration:</strong> In modern buildings, assume 60-80% of loads
              are non-linear when calculating harmonic effects unless specific load data is
              available.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Effects of Harmonics on Electrical Systems">
            <p>
              Harmonics cause a range of problems from nuisance issues to serious equipment
              damage. Understanding these effects is essential for designing robust building
              electrical systems.
            </p>
            <p>
              <strong>Thermal Effects (Overheating):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Transformers — Increased eddy current and hysteresis losses — Reduced capacity, shortened life</li>
              <li>Cables — Skin effect increases AC resistance — Overheating, insulation degradation</li>
              <li>Neutral conductors — Triplen harmonic currents add — Can exceed phase current capacity</li>
              <li>Motors — Opposing torques, rotor heating — Reduced efficiency, vibration</li>
              <li>Capacitors — Dielectric heating at high frequencies — Premature failure, potential fire</li>
            </ul>
            <p>
              <strong>Resonance Issues:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitors and inductors can create resonant circuits</li>
              <li>If resonant frequency matches a harmonic, current magnifies</li>
              <li>Can cause capacitor explosion or fuse failure</li>
              <li>Voltage distortion amplified at resonance</li>
            </ul>
            <p>
              <strong>Interference Effects:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>EMC issues with sensitive equipment</li>
              <li>Telephone and data cable interference</li>
              <li>Audio system hum (150Hz particularly audible)</li>
              <li>Control system malfunctions</li>
            </ul>
            <p>
              <strong>Energy Metering Errors:</strong> Traditional electromechanical meters were
              calibrated for sinusoidal waveforms. In harmonic-rich environments, they may
              under-register actual energy consumption by 10-15%, resulting in revenue loss for
              utilities and inaccurate energy management data. Modern electronic meters
              conforming to BS EN 50470 are more accurate for distorted waveforms.
            </p>
            <p>
              <strong>Protective Device Operation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>RCDs:</strong> May nuisance trip due to high-frequency leakage currents</li>
              <li><strong>MCBs:</strong> Magnetic trip may occur at lower RMS currents</li>
              <li><strong>Fuses:</strong> Peak currents cause faster deterioration</li>
              <li><strong>Electronic relays:</strong> May misoperate if not rated for harmonics</li>
            </ul>
            <p>
              <strong>Motor effect:</strong> The 5th harmonic creates a reverse-rotating magnetic
              field that opposes motor torque, causing additional heating and reducing net output
              by 2-5% in severe cases.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Harmonic Mitigation Techniques">
            <p>
              Several strategies can reduce harmonic levels to acceptable limits. The choice
              depends on the severity of the problem, available space, budget, and whether
              mitigation is applied at source or system-wide.
            </p>
            <p>
              <strong>Passive Harmonic Filters:</strong> Tuned LC circuits providing a
              low-impedance path for specific harmonic frequencies, diverting them from the
              supply.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Advantages: Simple, robust technology; No power electronics; Also provide reactive power compensation; Cost-effective for single harmonics</li>
              <li>Limitations: Must be tuned to specific frequency; Risk of resonance at other frequencies; Large physical size; Fixed compensation only</li>
            </ul>
            <p>
              <strong>Active Harmonic Filters:</strong> Power electronic devices that inject
              currents equal and opposite to measured harmonics, actively cancelling distortion.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Advantages: Adapts to changing loads; Corrects multiple harmonics simultaneously; Compact size; No resonance risk</li>
              <li>Limitations: Higher initial cost; Requires maintenance; Power electronics can fail; Limited capacity per unit</li>
            </ul>
            <p>
              <strong>K-Rated Transformers:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>K-1 — Standard - resistive loads — Heating, incandescent lighting</li>
              <li>K-4 — Light harmonics — General commercial, some LED</li>
              <li>K-13 — Moderate harmonics — Data centres, high IT load offices</li>
              <li>K-20 — High harmonics — VSD-heavy industrial, large UPS</li>
              <li>K-30+ — Very high harmonics — Specialist applications</li>
            </ul>
            <p>
              K-factor indicates increased heating capacity. A K-13 transformer can handle
              harmonic loads that would cause a K-1 transformer to overheat by 13 times.
            </p>
            <p>
              <strong>Phase-Shifting Transformers:</strong> Using multiple transformers with
              different phase shifts can cancel specific harmonics. A delta-star and delta-delta
              pair with 30° phase shift eliminates 5th and 7th harmonics when loads are balanced.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Two transformers with 30° shift: Cancels 5th, 7th harmonics</li>
              <li>Three transformers with 20° shift: Cancels 5th, 7th, 11th, 13th</li>
              <li>Requires balanced load distribution between transformers</li>
            </ul>
            <p>
              <strong>Line Reactors and DC Link Chokes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Line reactors (3-5%):</strong> Reduce THD from VSDs by 30-50%</li>
              <li><strong>DC link chokes:</strong> Smooth current drawn by VSD input rectifier</li>
              <li><strong>Combined approach:</strong> Can reduce VSD THD from 80% to 30%</li>
              <li>Cost-effective first step before considering filters</li>
            </ul>
            <p>
              <strong>Design strategy:</strong> Address harmonics at source (12-pulse drives, line
              reactors) before system-wide solutions (filters). This is usually more
              cost-effective and reduces distribution losses.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="BS 7671 Requirements for Harmonic Environments">
            <p>
              BS 7671:2018+A4:2026 includes specific requirements for installations with
              significant harmonic content, particularly regarding neutral conductor sizing and
              equipment selection.
            </p>
            <p>
              <strong>Regulation 523.6.3 - Neutral Conductor Sizing.</strong> Where the third
              harmonic content of line conductors is greater than 15%, the neutral conductor
              shall have a cross-sectional area at least equal to that of the line conductors.
              Where third harmonic content exceeds 33%, the neutral current may exceed the phase
              current. In such cases, the neutral conductor may need to be sized based on the
              neutral current rather than the phase current, potentially requiring a larger
              neutral than phase conductors.
            </p>
            <p>
              <strong>Key BS 7671 Considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>523.6.3 — Neutral sizing for harmonic loads — All harmonic-rich circuits</li>
              <li>Appendix 4 — Current-carrying capacity tables — Cable sizing considerations</li>
              <li>332.1 — Assessment of characteristics — Identify harmonic sources</li>
              <li>512.1.5 — Electromagnetic compatibility — Prevention of interference</li>
            </ul>
            <p>
              <strong>Engineering Recommendation G5/5:</strong> Published by the Energy Networks
              Association, G5/5 sets limits for harmonic distortion at the point of common
              coupling (PCC) with the distribution network:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Voltage THD limit:</strong> Typically 5% at LV point of common coupling</li>
              <li><strong>Individual harmonic limits:</strong> Vary by harmonic order</li>
              <li><strong>Applies to:</strong> Connections above certain power thresholds</li>
              <li><strong>Assessment:</strong> May be required for large non-linear loads</li>
            </ul>
            <p>
              <strong>Neutral Sizing Decision Process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine third harmonic content (I₃) as % of fundamental (I₁)</li>
              <li>If I₃ ≤ 15%: Neutral = Standard sizing per Appendix 4</li>
              <li>If 15% &lt; I₃ ≤ 33%: Neutral ≥ Phase conductor size</li>
              <li>If I₃ &gt; 33%: Calculate Iₙ = 3 × I₃ and size neutral based on Iₙ if &gt; Iphase</li>
            </ul>
            <p>
              <strong>Documentation:</strong> The Electrical Installation Certificate should note
              where neutral conductors have been sized for harmonic loads to inform future
              modifications.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Services Applications">
            <p>
              Different building types present varying harmonic challenges. Understanding the
              typical load profiles helps in specifying appropriate mitigation from the design
              stage.
            </p>
            <p>
              <strong>Data Centres:</strong> The most demanding environment for harmonic
              management, with IT loads often representing 70-90% of total building consumption.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Typical THD:</strong> 30-50% current distortion at transformer</li>
              <li><strong>Transformer:</strong> K-13 minimum, K-20 for high density</li>
              <li><strong>UPS selection:</strong> Specify input THD and PF requirements</li>
              <li><strong>Neutral sizing:</strong> Often 150-200% of phase conductor</li>
              <li><strong>PDU design:</strong> Consider active filtering at rack level</li>
            </ul>
            <p>
              <strong>Modern Office Buildings:</strong> High concentration of computers, LED
              lighting, and variable air volume (VAV) systems create cumulative harmonic loading.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IT load:</strong> Computers, monitors, printers - high 3rd harmonic</li>
              <li><strong>Lighting:</strong> LED drivers throughout - 3rd, 5th harmonics</li>
              <li><strong>HVAC:</strong> VSD-controlled AHUs and FCUs - 5th, 7th harmonics</li>
              <li><strong>Recommendation:</strong> K-4 to K-13 transformers, check neutral sizing</li>
            </ul>
            <p>
              <strong>Industrial Facilities:</strong> Variable speed drives for motors often
              dominate the harmonic profile, but loads are typically more predictable than
              commercial buildings.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>VSD specification:</strong> Consider 12-pulse or AFE drives for large motors</li>
              <li><strong>Line reactors:</strong> Standard 3% reactors on all VSDs</li>
              <li><strong>Capacitor PFC:</strong> Use detuned reactors to avoid resonance</li>
              <li><strong>Centralised filtering:</strong> May be cost-effective for large installations</li>
            </ul>
            <p>
              <strong>Design Checklist for Harmonic-Rich Environments:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify and quantify harmonic-generating loads</li>
              <li>Calculate neutral currents including triplen harmonics</li>
              <li>Specify appropriate K-rated transformers</li>
              <li>Size cables for harmonic heating effects</li>
              <li>Verify PFC capacitor compatibility</li>
              <li>Consider detuned reactors for capacitor banks</li>
              <li>Specify line reactors for VSDs</li>
              <li>Evaluate need for harmonic filtering</li>
              <li>Check protective device ratings for harmonics</li>
              <li>Document harmonic considerations in design</li>
            </ul>
            <p>
              <strong>Future-proofing:</strong> With increasing electrification (EV charging,
              heat pumps) and renewable integration (inverters), harmonic levels in buildings are
              expected to increase. Design with margin for future harmonic growth.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Neutral Current Calculation.</strong> A three-phase 100A per
              phase lighting circuit has LED drivers generating 40% third harmonic current.
              Calculate the neutral current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>I₃ = 100A × 0.40 = 40A per phase</li>
              <li>Fundamental neutral current (balanced): 0A (cancels)</li>
              <li>Third harmonic neutral current (adds): Iₙ(3rd) = 3 × 40A = <strong>120A</strong></li>
              <li>Total neutral RMS (if only 3rd harmonic): Iₙ ≈ <strong>120A</strong></li>
              <li>Neutral current exceeds phase current — Neutral must be sized for 120A minimum</li>
            </ul>
            <p>
              <strong>Example 2: K-Factor Selection.</strong> A transformer supplies a data
              centre with the following harmonic profile. Calculate the K-factor and recommend
              transformer rating. I₁ = 100%, I₃ = 80%, I₅ = 60%, I₇ = 40%, I₉ = 20%.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>K-factor = Σ(Iₕ² × h²) / Σ(Iₕ²)</li>
              <li>Numerator = (1² × 1²) + (0.8² × 3²) + (0.6² × 5²) + (0.4² × 7²) + (0.2² × 9²) = 1 + 5.76 + 9 + 7.84 + 3.24 = 26.84</li>
              <li>Denominator = 1² + 0.8² + 0.6² + 0.4² + 0.2² = 1.84</li>
              <li>K-factor = 26.84 / 1.84 = <strong>14.6</strong></li>
              <li>Specify K-20 transformer (next standard rating above)</li>
            </ul>
            <p>
              <strong>Example 3: THD Calculation.</strong> A VSD draws the following harmonic
              currents: I₁ = 100A, I₅ = 25A, I₇ = 14A, I₁₁ = 9A, I₁₃ = 7A. Calculate the THD.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>THD = √(I₅² + I₇² + I₁₁² + I₁₃² + ...) / I₁ × 100%</li>
              <li>Harmonic sum of squares = 25² + 14² + 9² + 7² = 625 + 196 + 81 + 49 = 951</li>
              <li>THD = √951 / 100 × 100% = 30.8 / 100 × 100% = <strong>30.8%</strong></li>
              <li>This is typical for a 6-pulse VSD without filtering — Consider 3% line reactor to reduce to ~20%</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p>
              <strong>Essential Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Harmonic frequency:</strong> fₕ = h × f₁ (e.g., 3rd = 3 × 50 = 150Hz)</li>
              <li><strong>THD:</strong> √(ΣIₕ²) / I₁ × 100%</li>
              <li><strong>Neutral triplen current:</strong> Iₙ = 3 × I(triplen per phase)</li>
              <li><strong>6-pulse harmonics:</strong> h = 6n ± 1 (5, 7, 11, 13...)</li>
              <li><strong>12-pulse harmonics:</strong> h = 12n ± 1 (11, 13, 23, 25...)</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3rd harmonic: <strong>150Hz</strong> - triplen, adds in neutral</li>
              <li>5th harmonic: <strong>250Hz</strong> - negative sequence, reverse motor rotation</li>
              <li>Neutral sizing threshold: <strong>15%</strong> third harmonic</li>
              <li>Voltage THD limit (G5/5): Typically <strong>5%</strong> at PCC</li>
              <li>Line reactor THD reduction: <strong>30-50%</strong> improvement</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Assuming balanced neutral:</strong> Triplen harmonics do not cancel</li>
                <li><strong>Ignoring skin effect:</strong> AC resistance increases at higher frequencies</li>
                <li><strong>Standard capacitors in harmonic environment:</strong> Causes resonance</li>
                <li><strong>K-1 transformer for IT loads:</strong> Will overheat and fail prematurely</li>
                <li><strong>Not documenting harmonic considerations:</strong> Affects future modifications</li>
              </ul>
            }
            doInstead="Always calculate neutral current including triplen contributions. Apply skin-effect derating for cables in harmonic-rich circuits. Use detuned PFC capacitors when supplying VSDs or LED loads. Specify K-rated transformers (K-13 for IT, K-20 for data centres). Note any neutral oversizing or K-rating on the EIC."
          />

          <SectionRule />

          <Scenario
            title="HVAC plantroom with five 75 kW chiller VSDs — DNO Stage 2 challenge"
            situation={
              <>
                A new commercial HQ has five 75 kW air-cooled chillers each with 6-pulse
                VSDs feeding screw compressors. Total VSD load = 375 kW on a 1000 kVA DNO
                supply. The DNO has flagged the connection for G5/5 Stage 2 assessment;
                pre-energisation harmonic study estimates THDv at the PCC of 6.8 % &mdash;
                above the 5 % limit.
              </>
            }
            whatToDo={
              <>
                Three options to bring THDv under 5 %: (a) specify each VSD with a 5 %
                line reactor (cheap, drops VSD-side THDi from ~80 % to ~35 %, normally
                gets you compliant); (b) upgrade two VSDs to 12-pulse drives (eliminates
                5th and 7th, costly but elegant); (c) install a single 200 A active
                harmonic filter at the MCC (adaptive, future-proofs for further EV /
                LED additions). Run the harmonic study again with the chosen mitigation
                and submit to the DNO with the G5/5 application.
              </>
            }
            whyItMatters={
              <>
                If the project energises without G5/5 compliance the DNO can disconnect
                the supply, and you will be back-fitting mitigation under live conditions.
                Active filters retro-fitted later cost 2&ndash;3&times; the price of a
                designed-in solution, plus disruption to building operation.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Harmonic frequency f&#x2099; = n &times; f&#x2081; — 3rd = 150 Hz, 5th = 250 Hz, 7th = 350 Hz at 50 Hz fundamental.',
              'Triplen (3rd, 9th, 15th) zero-sequence harmonics add in the neutral; can drive neutral current to 1.73&times; phase current.',
              'Negative-sequence harmonics (5th, 11th) cause reverse-rotating fields in motors — heating and torque pulsation.',
              'Source spectra: 6-pulse VSD = 5/7/11/13; LED driver = 3/5; SMPS PSU = 3/5/7/9; UPS = 5/7/11.',
              'K-rated transformers handle eddy/stray heating from harmonics — K-4 office, K-13 IT, K-20 data centre.',
              'Mitigation hierarchy: line reactor (3&ndash;5 %) &rarr; DC link choke &rarr; passive tuned filter &rarr; 12-pulse rectifier &rarr; AFE drive / active filter.',
              'BS 7671 Reg 524.2 + Appendix 4 &sect;5.5 governs neutral sizing under harmonic loading.',
              'Engineering Recommendation G5/5 caps THDv at 5 % at the PCC for LV public networks — Stage 2/3 assessment for large non-linear loads.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Sinusoidal and Distorted Waveforms
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                True, Reactive and Apparent Power
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section3_5;
