/**
 * Module 3 · Section 4 · Subsection 7 — Harmonics and Power Quality in Three-Phase Distribution
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Three-phase harmonic propagation — triplen aggregation, K-factor transformer
 *   selection, EN 50160 / G5/5 compliance, mitigation hierarchy. The advanced power-quality
 *   playbook for modern building distribution systems.
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

const TITLE = 'Harmonics and Power Quality Issues - HNC Module 3 Section 4.7';
const DESCRIPTION =
  'Understanding harmonic distortion in three-phase systems, triplen harmonics in neutrals, power quality standards EN 50160 and G5/4-1, K-factor transformers, and harmonic mitigation techniques for building services.';

const quickCheckQuestions = [
  {
    id: 'triplen-harmonics',
    question: 'Which harmonic orders are classified as triplen harmonics?',
    options: [
      '3rd, 9th, 15th',
      '2nd, 4th, 6th',
      '5th, 7th, 11th',
      '1st, 2nd, 3rd',
    ],
    correctIndex: 0,
    explanation:
      'Triplen harmonics are odd multiples of the 3rd harmonic (3rd, 9th, 15th, 21st, etc.). These are particularly problematic as they sum in the neutral conductor rather than cancelling.',
  },
  {
    id: 'thd-limit',
    question: 'What is the typical THD voltage limit for LV supplies under EN 50160?',
    options: [
      '5%',
      '8%',
      '12%',
      '3%',
    ],
    correctIndex: 1,
    explanation:
      'EN 50160 specifies that THD voltage should not exceed 8% for 95% of 10-minute intervals over a week. Individual harmonics have specific limits, with lower-order harmonics having tighter restrictions.',
  },
  {
    id: 'k-factor',
    question: 'A K-factor transformer rated K-13 is designed for installations with:',
    options: [
      'Current and the cable’s resistance',
      'Proportional, Integral, Derivative',
      'Moderate to heavy harmonic loads',
      'Further Investigation required',
    ],
    correctIndex: 2,
    explanation:
      'K-13 rated transformers handle moderate to heavy harmonic loads typical of data centres and VSD-heavy installations. K-1 is for linear loads, K-4 for light harmonics, and K-20+ for severe harmonic environments.',
  },
  {
    id: '5th-harmonic',
    question:
      'In a three-phase system, 5th harmonic currents create a rotating magnetic field that:',
    options: [
      'Describe behaviour, express feelings, state impact, request change',
      'Rotates in the opposite direction (negative sequence)',
      'Test lead connections and instrument battery',
      'Proactive monitoring and preventive maintenance',
    ],
    correctIndex: 1,
    explanation:
      '5th harmonic is a negative sequence harmonic, creating counter-rotating fields that cause additional heating and torque pulsations in motors. 7th harmonic is positive sequence, 3rd is zero sequence.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the fundamental frequency of the UK mains supply?',
    options: [
      '40Hz',
      '50Hz',
      '60Hz',
      '100Hz',
    ],
    correctAnswer: 1,
    explanation:
      'The UK mains frequency is 50Hz. The 3rd harmonic is therefore 150Hz, the 5th is 250Hz, and so on.',
  },
  {
    id: 2,
    question:
      'In a balanced three-phase system with non-linear loads, which harmonics cancel in the neutral?',
    options: [
      'Triplen harmonics cancel',
      'All harmonics cancel',
      'Non-triplen harmonics cancel',
      '5th and 7th harmonics cancel',
    ],
    correctAnswer: 2,
    explanation:
      'Non-triplen harmonics (5th, 7th, 11th, 13th, etc.) cancel in a balanced three-phase neutral. Triplen harmonics (3rd, 9th, 15th) add arithmetically, potentially causing neutral currents exceeding phase currents.',
  },
  {
    id: 3,
    question:
      'A three-phase circuit supplies identical single-phase non-linear loads drawing 80A fundamental and 40A third harmonic each. What is the neutral current?',
    options: [
      '80A',
      '0A',
      '40A',
      '120A',
    ],
    correctAnswer: 3,
    explanation:
      'Third harmonic currents from all three phases add: 3 × 40A = 120A. The fundamental currents cancel (120° phase shift), but triplen harmonics are in phase and sum directly.',
  },
  {
    id: 4,
    question:
      'Which power quality standard specifically addresses harmonic emissions from customer installations connected to UK distribution networks?',
    options: [
      'G5/4-1',
      'EN 50160',
      'BS 7671',
      'IEC 61000-3-2',
    ],
    correctAnswer: 0,
    explanation:
      'Engineering Recommendation G5/4-1 sets planning levels and assessment procedures for harmonic emissions from customer installations connecting to UK DNO networks.',
  },
  {
    id: 5,
    question:
      'What is the primary cause of additional heating in cables carrying harmonic currents?',
    options: [
      'Skin effect at higher frequencies',
      'Both A and B',
      'Reduced insulation resistance',
      'Increased RMS current value',
    ],
    correctAnswer: 1,
    explanation:
      'Harmonic currents increase both the RMS current value and cause skin effect at higher frequencies, pushing current to the conductor surface and increasing effective resistance. Both effects contribute to additional heating.',
  },
  {
    id: 6,
    question: 'An active harmonic filter operates by:',
    options: [
      'Blocking harmonic frequencies with LC circuits',
      'Absorbing harmonics through resistive elements',
      'Injecting anti-phase currents to cancel harmonics',
      'Shifting harmonic phase angles',
    ],
    correctAnswer: 2,
    explanation:
      'Active filters measure harmonic content in real-time and inject equal but opposite currents to cancel harmonics at the point of common coupling. They are adaptive and effective across a wide frequency range.',
  },
  {
    id: 7,
    question:
      'For a data centre with UPS systems and server power supplies, what K-factor transformer rating would typically be specified?',
    options: [
      'K-1',
      'K-4',
      'K-20',
      'K-13',
    ],
    correctAnswer: 3,
    explanation:
      'Data centres typically require K-13 transformers due to the high harmonic content from switch-mode power supplies, UPS systems, and variable speed drives. K-20 may be needed for particularly severe environments.',
  },
  {
    id: 8,
    question:
      'According to G5/4-1, what assessment is required before connecting a large non-linear load to the distribution network?',
    options: [
      'Harmonic current assessment at the point of connection',
      'The volume of air forcibly exhaled in the first one second',
      'To identify obvious faults safely before applying power',
      'Summarising and checking understanding',
    ],
    correctAnswer: 0,
    explanation:
      "G5/4-1 requires harmonic current assessment to ensure customer emissions don't cause voltage distortion at the point of common coupling to exceed planning levels.",
  },
  {
    id: 9,
    question: 'A passive harmonic filter tuned to 250Hz is designed to attenuate which harmonic?',
    options: [
      '3rd harmonic',
      '5th harmonic',
      '7th harmonic',
      '11th harmonic',
    ],
    correctAnswer: 1,
    explanation:
      'At 50Hz fundamental, the 5th harmonic frequency is 5 × 50Hz = 250Hz. Passive filters are tuned to specific harmonic frequencies using LC resonant circuits.',
  },
  {
    id: 10,
    question: 'What is Total Harmonic Distortion (THD)?',
    options: [
      'That they are fitted at the correct height (950mm minimum), secured and undamaged',
      'To prevent the cable from overheating due to reduced heat dissipation',
      'The ratio of harmonic content to fundamental, expressed as a percentage',
      'Raise the alarm and ensure all persons in the area are alerted',
    ],
    correctAnswer: 2,
    explanation:
      'THD is calculated as the square root of the sum of squares of all harmonic amplitudes divided by the fundamental amplitude, expressed as a percentage. THD = (sqrt(H2² + H3² + H4² + ...)) / H1 × 100%',
  },
];

const faqs = [
  {
    question: 'Why are harmonics becoming more prevalent in modern installations?',
    answer:
      'The proliferation of non-linear loads such as LED drivers, switch-mode power supplies, variable speed drives, and electronic equipment draws current in non-sinusoidal waveforms, generating harmonics. Modern buildings with extensive IT equipment, efficient lighting, and motor control systems have significantly higher harmonic content than traditional installations with predominantly linear loads.',
  },
  {
    question: 'How do I know if an installation has a harmonic problem?',
    answer:
      'Common symptoms include: neutral conductors running hot, nuisance tripping of circuit breakers, transformer overheating, capacitor failures, flickering lights, and equipment malfunctions. Power quality analysers can measure THD and individual harmonic levels to quantify the problem. BS 7671 Table 5.4a provides correction factors for sizing neutrals in harmonic-rich environments.',
  },
  {
    question: 'When should I use an active filter versus a passive filter?',
    answer:
      'Passive filters are cost-effective for fixed, predictable harmonic spectra (e.g., single large VSD). Active filters suit dynamic loads with varying harmonic content, multiple harmonic orders, or where passive filter resonance risks exist. Hybrid solutions combining both technologies offer optimal performance for complex installations like data centres.',
  },
  {
    question: 'What neutral conductor sizing is required for high harmonic installations?',
    answer:
      'BS 7671 requires neutral sizing based on third harmonic current content. For THD above 33%, the neutral may need to be larger than phase conductors. Table 5.4a provides reduction factors: at 33% third harmonic, factor is 0.86; at 45% factor is 0.75. Some specifications require double-sized neutrals (200%) for IT-heavy environments.',
  },
  {
    question: 'How do harmonics affect power factor correction capacitors?',
    answer:
      'Capacitor impedance decreases with frequency (Xc = 1/2πfC), making them low-impedance paths for harmonic currents. This causes overheating, premature failure, and potential resonance with system inductance. Detuned reactors (typically 7% or 14%) are added to capacitor banks to raise the resonant frequency above prevalent harmonics, preventing amplification.',
  },
  {
    question: 'What is the difference between displacement power factor and true power factor?',
    answer:
      'Displacement power factor (cos φ) considers only the phase angle between fundamental voltage and current. True power factor (TPF) accounts for harmonic distortion: TPF = Displacement PF × Distortion Factor. A load with 0.95 displacement PF but 20% current THD has TPF of approximately 0.93. Modern power factor meters should measure true power factor.',
  },
];

const HNCModule3Section4_7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 7"
            title="Harmonics and Power Quality Issues"
            description="Harmonic distortion sources, effects on three-phase systems, and mitigation techniques for building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You design three-phase distribution boards expecting triplen harmonic aggregation in the neutral &mdash; up to 1.73&times; phase current under high-density LED or IT load.',
              'You apply BS 7671 Appendix 4 &sect;5.5 rating factors for harmonic content above 33 % to derate cable / upsize neutral on every distribution feed.',
              'You specify K-rated transformers (K-4 office, K-13 IT, K-20 data centre) on dedicated transformers feeding non-linear load.',
              'You document G5/5 compliance at the PCC and ENA P28 voltage-step compliance for any installation the DNO flags as a Stage 2 / 3 connection assessment.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 524.2 (Cross-sectional area of neutral conductors) — Appendix 4 §5.5 referenced"
            clause="The cross-sectional area of the neutral conductor shall be at least equal to that of the line conductor in single-phase circuits, polyphase circuits where the size of the line conductor is less than or equal to 16 mm² for copper or 25 mm² for aluminium, and any circuit liable to carry harmonic currents — particularly third harmonic and odd multiples of third harmonic exceeding 15 %."
            meaning={
              <>
                The 2026 amendment expanded the harmonic-rating-factor table in
                Appendix 4 &sect;5.5. As BSE designer of any modern three-phase
                distribution serving LED lighting, IT load or EV charging, you must apply
                the relevant factor (e.g. 0.86 above 33 %, dropping further for higher
                triplen content) and choose between cable upsize, parallel neutrals, or
                active filtering. This is the regulatory anchor for the whole section.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 524.2 + Appendix 4 &sect;5.5; ENA Engineering Recommendation G5/5; ENA Engineering Recommendation P28; IEC 61000-3-12; IEEE 519-2014"
          />

          <LearningOutcomes
            outcomes={[
              'Define harmonics and explain their generation by non-linear loads',
              'Analyse triplen harmonic behaviour in three-phase neutral conductors',
              'Calculate harmonic heating effects on cables and transformers',
              'Apply power quality standards EN 50160 and G5/4-1',
              'Select appropriate harmonic mitigation techniques',
              'Specify K-factor transformers for harmonic-rich installations',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Non-linear loads inject harmonics; triplen harmonics sum in the neutral, others cause heating — manage with K-factor transformers and filters."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Harmonics:</strong> Integer multiples of 50Hz fundamental frequency
              </li>
              <li>
                <strong>Triplen harmonics:</strong> 3rd, 9th, 15th sum in neutral conductors
              </li>
              <li>
                <strong>THD limits:</strong> EN 50160 specifies 8% voltage THD maximum
              </li>
              <li>
                <strong>Mitigation:</strong> Passive/active filters, K-factor transformers
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Data centres:</strong> High harmonic content from IT loads
              </li>
              <li>
                <strong>VSD installations:</strong> 6-pulse drives produce 5th, 7th harmonics
              </li>
              <li>
                <strong>LED lighting:</strong> Driver circuits generate harmonics
              </li>
              <li>
                <strong>G5/4-1:</strong> UK harmonic assessment requirements
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="What Are Harmonics?">
            <p>
              Harmonics are sinusoidal components of a periodic waveform that have frequencies which
              are integer multiples of the fundamental frequency. In UK electrical systems, the
              fundamental frequency is 50Hz, so the 3rd harmonic is 150Hz, the 5th is 250Hz, and so
              on.
            </p>
            <p className="text-sm font-medium text-white">Key harmonic concepts:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fundamental frequency (1st harmonic): 50Hz in the UK</li>
              <li>Odd harmonics (3rd, 5th, 7th...): Most prevalent from non-linear loads</li>
              <li>
                Even harmonics (2nd, 4th, 6th...): Rare, indicate asymmetrical waveforms
              </li>
              <li>Inter-harmonics: Non-integer multiples, caused by cycloconverters</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Common Harmonic Sources in Buildings
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>6-pulse VSD:</strong> 5th, 7th, 11th, 13th — typical THD(I) 80-100%
              </li>
              <li>
                <strong>12-pulse VSD:</strong> 11th, 13th, 23rd, 25th — typical THD(I) 10-15%
              </li>
              <li>
                <strong>PC/Server SMPS:</strong> 3rd, 5th, 7th — typical THD(I) 70-120%
              </li>
              <li>
                <strong>LED drivers:</strong> 3rd, 5th, 7th, 9th — typical THD(I) 20-80%
              </li>
              <li>
                <strong>UPS systems:</strong> 5th, 7th (input side) — typical THD(I) 30-40%
              </li>
              <li>
                <strong>Fluorescent lighting (magnetic):</strong> 3rd, 5th — typical THD(I) 15-25%
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> THD(I) is Total Harmonic Distortion of current. Values above
              100% indicate harmonic content exceeds fundamental current magnitude.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Three-Phase Harmonic Patterns and Sequences">
            <p>
              In three-phase systems, harmonics are classified by their sequence - the direction and
              nature of the rotating magnetic field they create. Understanding sequences is
              essential for predicting harmonic behaviour and effects.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Harmonic Sequence Classification</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Positive:</strong> 1st, 4th, 7th, 10th, 13th... — rotation same as
                fundamental — motor heating, torque ripple
              </li>
              <li>
                <strong>Negative:</strong> 2nd, 5th, 8th, 11th, 14th... — rotation opposite to
                fundamental — counter-torque, motor braking
              </li>
              <li>
                <strong>Zero (Triplen):</strong> 3rd, 6th, 9th, 12th, 15th... — no rotation (in
                phase) — sum in neutral, transformer heating
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Sequence Pattern Formula</p>
            <p>The sequence of harmonic h can be determined by:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                h = 3n + 1 (where n = 0,1,2,3...): <strong>Positive sequence</strong> (1, 4, 7, 10,
                13...)
              </li>
              <li>
                h = 3n + 2 (where n = 0,1,2,3...): <strong>Negative sequence</strong> (2, 5, 8, 11,
                14...)
              </li>
              <li>
                h = 3n (where n = 1,2,3,4...): <strong>Zero sequence</strong> (3, 6, 9, 12, 15...)
              </li>
            </ul>
            <p className="text-sm text-white italic">
              <strong>Practical implication:</strong> 6-pulse VSDs produce predominantly 5th and 7th
              harmonics (6k±1 rule), which are negative and positive sequence respectively. The 5th
              harmonic causes motor counter-rotation effects.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Triplen Harmonics in Neutral Conductors">
            <p>
              Triplen harmonics (3rd, 9th, 15th, etc.) present unique challenges in three-phase
              four-wire systems. Unlike other harmonics that cancel in a balanced system, triplen
              harmonics are zero-sequence and add arithmetically in the neutral conductor.
            </p>
            <p className="text-sm font-medium text-white">Why triplen harmonics sum in the neutral:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Fundamental currents are 120° apart and sum to zero in a balanced system
              </li>
              <li>
                3rd harmonic: Each phase current is at 3 × 120° = 360° = 0° - all in phase
              </li>
              <li>Being in phase, they add rather than cancel: IN(3rd) = 3 × Iph(3rd)</li>
              <li>Neutral current can exceed phase current even with balanced loads</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Critical Design Consideration</p>
            <p>
              In installations with significant single-phase non-linear loads (IT equipment, LED
              lighting), the neutral current can be 1.5 to 1.7 times the phase current due to
              triplen harmonic summation. Standard neutral sizing (equal to phase) is inadequate.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              BS 7671 Neutral Sizing for Harmonics
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0-15% 3rd harmonic:</strong> Reduction factor 1.0 — size for phase current
              </li>
              <li>
                <strong>15-33%:</strong> Reduction factor 0.86 — size for phase current
              </li>
              <li>
                <strong>33-45%:</strong> Reduction factor 0.86 — size for neutral current
              </li>
              <li>
                <strong>&gt;45%:</strong> Reduction factor 1.0 — size for neutral current
              </li>
              <li>
                Reference: BS 7671 Table 5.4a — Reduction factors for harmonic currents in
                four-core and five-core cables
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design practice:</strong> For data centres and IT-heavy installations, specify
              neutral conductor at 200% of phase size, or use separate neutral conductors per phase.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Harmonic Heating Effects on Cables and Transformers">
            <p>
              Harmonic currents cause additional heating through two primary mechanisms: increased
              RMS current and frequency-dependent losses. These effects must be considered when
              sizing cables and transformers for harmonic-rich installations.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Cable Heating Effects</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Skin effect:</strong> Higher frequencies force current to conductor
                surface, increasing effective resistance
              </li>
              <li>
                <strong>Proximity effect:</strong> Adjacent conductors create additional eddy
                current losses
              </li>
              <li>
                <strong>Neutral heating:</strong> Triplen harmonics cause unexpected neutral heating
              </li>
              <li>
                <strong>Dielectric losses:</strong> Higher frequencies increase insulation losses
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Transformer Heating Effects</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Winding losses:</strong> I²R losses increase with harmonic current
              </li>
              <li>
                <strong>Eddy current losses:</strong> Proportional to frequency squared (f²)
              </li>
              <li>
                <strong>Core losses:</strong> Hysteresis and eddy currents in laminations
              </li>
              <li>
                <strong>Stray losses:</strong> Induced currents in structural parts
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Calculating Harmonic RMS Current</p>
            <p>
              I<sub>RMS</sub> = √(I<sub>1</sub>² + I<sub>3</sub>² + I<sub>5</sub>² + I<sub>7</sub>²
              + ...) — where I1 is fundamental current and I3, I5, etc. are harmonic currents.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Skin Effect Resistance Multipliers (Approximate)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fundamental (50Hz):</strong> RAC/RDC 1.0 - 1.02
              </li>
              <li>
                <strong>5th (250Hz):</strong> RAC/RDC 1.1 - 1.3
              </li>
              <li>
                <strong>7th (350Hz):</strong> RAC/RDC 1.15 - 1.5
              </li>
              <li>
                <strong>11th (550Hz):</strong> RAC/RDC 1.3 - 2.0
              </li>
              <li>
                Values vary with conductor size — larger conductors experience greater skin effect
              </li>
            </ul>
            <p className="text-sm text-white italic">
              <strong>Derating requirement:</strong> Standard transformers must be derated when
              supplying non-linear loads. A transformer with 30% current THD may need to be derated
              to 70-80% of nameplate capacity to prevent overheating.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Power Quality Standards (EN 50160, G5/4-1)">
            <p>
              Power quality standards set limits on harmonic distortion to ensure compatibility
              between equipment and the supply network. The UK applies European standards (EN 50160)
              and the Distribution Code (Engineering Recommendation G5/4-1).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">EN 50160 - Voltage Characteristics</p>
            <p>
              Defines voltage quality at the point of supply to customers. For harmonics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total Harmonic Distortion (THD): ≤8% for LV supplies</li>
              <li>Individual harmonic limits vary by order (see below)</li>
              <li>Measurements over 95% of 10-minute intervals per week</li>
              <li>Applies to supply voltage, not current</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              EN 50160 Individual Voltage Harmonic Limits
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>3rd:</strong> 5.0% — <strong>2nd (even):</strong> 2.0%
              </li>
              <li>
                <strong>5th:</strong> 6.0% — <strong>4th (even):</strong> 1.0%
              </li>
              <li>
                <strong>7th:</strong> 5.0% — <strong>6th (even):</strong> 0.5%
              </li>
              <li>
                <strong>9th:</strong> 1.5% — <strong>8th-24th (even):</strong> 0.5%
              </li>
              <li>
                <strong>11th:</strong> 3.5%
              </li>
              <li>
                <strong>13th:</strong> 3.0%
              </li>
              <li>
                <strong>15th-25th:</strong> 0.5-2.0%
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              G5/4-1 - UK Distribution Code Requirements
            </p>
            <p>
              Engineering Recommendation G5/4-1 sets planning levels for harmonic voltage distortion
              and requires assessment of customer installations that may cause network harmonic
              issues.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Stage 1: Simplified assessment for small non-linear loads</li>
              <li>
                Stage 2: Harmonic current allocation based on agreed supply capacity
              </li>
              <li>Stage 3: Detailed assessment for large or complex installations</li>
              <li>DNO approval required for installations exceeding Stage 1 limits</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Practical application:</strong> Any installation with VSDs totalling &gt;25%
              of supply capacity, or single VSD &gt;12.5% of supply, triggers G5/4-1 Stage 2
              assessment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Harmonic Assessment Requirements">
            <p>
              Before connecting significant non-linear loads to the distribution network, a harmonic
              assessment ensures the installation will not cause unacceptable voltage distortion at
              the point of common coupling (PCC).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Stage 1 — Simplified Assessment</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>For installations with non-linear load &lt;25% of supply capacity</li>
              <li>Assumes standard equipment harmonic spectra</li>
              <li>No detailed analysis required if within limits</li>
              <li>Most small commercial installations qualify</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Stage 2 — Detailed Assessment</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Required when Stage 1 limits exceeded</li>
              <li>Calculate harmonic current emissions from each source</li>
              <li>Assess voltage distortion at PCC using network impedance</li>
              <li>May require network data from DNO</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Stage 3 — Comprehensive Study</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>For large, complex, or critical installations</li>
              <li>Full harmonic power flow analysis</li>
              <li>Consider resonance risks with power factor correction</li>
              <li>May require mitigation measures before approval</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Assessment Parameters</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Agreed Supply Capacity (ASC):</strong> Maximum import capacity (kVA)
              </li>
              <li>
                <strong>Fault Level (Sk):</strong> Network strength at PCC (MVA)
              </li>
              <li>
                <strong>Harmonic Impedance (Zh):</strong> Network impedance at each harmonic
              </li>
              <li>
                <strong>Planning Level (PLh):</strong> Maximum permitted Vh at PCC
              </li>
            </ul>
            <p className="text-sm text-white italic">
              <strong>Voltage distortion calculation:</strong> V<sub>h</sub> = I<sub>h</sub> × Z
              <sub>h</sub> where I<sub>h</sub> is harmonic current and Z<sub>h</sub> is network
              impedance at that harmonic frequency.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Active and Passive Harmonic Filters">
            <p>
              When harmonic levels exceed acceptable limits, mitigation is required. The two main
              approaches are passive filters (using LC resonant circuits) and active filters (using
              power electronics to inject cancelling currents).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Passive Filters</p>
            <p>LC circuits tuned to specific harmonic frequencies:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower cost for single-frequency filtering</li>
              <li>Provide reactive power compensation</li>
              <li>Fixed tuning - less effective if harmonics vary</li>
              <li>Risk of resonance with network impedance</li>
              <li>May amplify non-tuned harmonics</li>
              <li>Typical: tuned to 5th (250Hz), 7th (350Hz), 11th (550Hz)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Active Filters</p>
            <p>Power electronic devices injecting anti-phase currents:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Adaptive - responds to changing harmonic content</li>
              <li>Effective across wide frequency range (2nd-50th)</li>
              <li>No resonance risk with network</li>
              <li>Higher initial cost</li>
              <li>Can provide power factor correction</li>
              <li>Ideal for variable loads (data centres, manufacturing)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Filter Selection Guide</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single large VSD:</strong> Passive (5th, 7th tuned) — predictable spectrum,
                cost-effective
              </li>
              <li>
                <strong>Data centre:</strong> Active filter — variable loads, wide harmonic spectrum
              </li>
              <li>
                <strong>Large HVAC system:</strong> Hybrid (passive + active) — base filtering with
                adaptive trim
              </li>
              <li>
                <strong>Commercial building:</strong> Active filter at main DB — diverse loads,
                changing tenants
              </li>
              <li>
                <strong>LED lighting installation:</strong> Detuned PFC or passive filter —
                significant 3rd harmonic content
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Other Mitigation Techniques</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Multi-pulse rectifiers:</strong> 12-pulse, 18-pulse, or 24-pulse VSDs
                cancel lower-order harmonics
              </li>
              <li>
                <strong>Active front-end (AFE) drives:</strong> Near-sinusoidal input current, THD
                &lt;5%
              </li>
              <li>
                <strong>Line reactors (3-5%):</strong> Reduce harmonic current peaks, limit dI/dt
              </li>
              <li>
                <strong>DC bus chokes:</strong> Smooth rectifier output, reduce input current
                harmonics
              </li>
              <li>
                <strong>Phase shifting transformers:</strong> Cancel harmonics between multiple
                drives
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="K-Factor Transformers">
            <p>
              K-factor transformers are specifically designed to handle harmonic-rich loads without
              excessive heating. The K-factor quantifies the harmonic heating effect relative to a
              linear load of the same RMS current.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">K-Factor Formula</p>
            <p>
              K = Σ(I<sub>h</sub>²×h²) / Σ(I<sub>h</sub>²) — where Ih is the per-unit current at
              harmonic h, and h is the harmonic order.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">K-Factor Ratings and Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>K-1:</strong> Linear loads only — resistive heating, incandescent lighting
              </li>
              <li>
                <strong>K-4:</strong> General commercial — mixed loads, some electronic equipment
              </li>
              <li>
                <strong>K-9:</strong> Office buildings — significant IT load, LED lighting
              </li>
              <li>
                <strong>K-13:</strong> Data centres, hospitals — high-density IT, medical equipment
              </li>
              <li>
                <strong>K-20:</strong> Broadcast, severe industrial — SCR drives, very high
                harmonic content
              </li>
              <li>
                <strong>K-30+:</strong> Specialist applications — extreme harmonic environments
              </li>
            </ul>
            <p className="text-sm font-medium text-white">K-factor transformer design features:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Oversized neutral:</strong> 200% neutral bus for triplen harmonics
              </li>
              <li>
                <strong>Lower flux density:</strong> Reduced core losses at harmonic frequencies
              </li>
              <li>
                <strong>Multiple parallel conductors:</strong> Minimise skin effect in windings
              </li>
              <li>
                <strong>Enhanced cooling:</strong> Larger radiators or forced cooling
              </li>
              <li>
                <strong>Electrostatic shields:</strong> Reduce capacitive coupling of
                high-frequency noise
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> When in doubt, specify K-13 for modern commercial
              buildings. The additional cost is typically 15-25% above standard transformers but
              provides essential protection.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Services: Data Centres and VSD Installations">
            <p>
              Modern building services installations increasingly feature high concentrations of
              non-linear loads. Data centres and VSD-heavy HVAC systems present particular
              challenges that require careful design consideration.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Data Centre Power Quality Considerations
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>IT load profile:</strong> SMPS draw current in narrow peaks, 70-120%
                current THD typical
              </li>
              <li>
                <strong>UPS systems:</strong> Input rectifiers generate 5th, 7th, 11th harmonics
              </li>
              <li>
                <strong>Neutral currents:</strong> May exceed 170% of phase current due to triplen
                harmonics
              </li>
              <li>
                <strong>Transformer selection:</strong> K-13 minimum, consider K-20 for
                high-density facilities
              </li>
              <li>
                <strong>Generator sizing:</strong> Alternator must handle harmonic currents without
                overheating
              </li>
              <li>
                <strong>Cable sizing:</strong> Additional derating for harmonic heating and
                oversized neutrals
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Data Centre Design Checklist</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>K-13 or K-20 transformers</li>
              <li>200% neutral conductors</li>
              <li>Active harmonic filters at PDUs</li>
              <li>True-RMS metering throughout</li>
              <li>Generator with 2/3 pitch windings</li>
              <li>Detuned PFC capacitor banks</li>
              <li>Power quality monitoring system</li>
              <li>Separate clean earth for IT equipment</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">VSD-Heavy HVAC Installations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>6-pulse drives:</strong> Produce significant 5th (20-25%) and 7th (11-15%)
                harmonics
              </li>
              <li>
                <strong>Aggregation:</strong> Multiple VSDs on same supply increase total harmonic
                distortion
              </li>
              <li>
                <strong>G5/4-1 assessment:</strong> Usually required for VSD load &gt;25% of supply
                capacity
              </li>
              <li>
                <strong>Mitigation options:</strong> Line reactors, passive filters, multi-pulse
                drives, AFE drives
              </li>
              <li>
                <strong>Motor effects:</strong> Harmonic currents cause additional motor heating,
                reduce by 5-10% derating
              </li>
              <li>
                <strong>Capacitor protection:</strong> PFC capacitors require detuning reactors when
                VSDs present
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">VSD Harmonic Mitigation Comparison</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>3% Line reactor:</strong> 35-40% THD(I) — typical cost premium 5-8%
              </li>
              <li>
                <strong>5% DC choke:</strong> 30-35% THD(I) — typical cost premium 8-12%
              </li>
              <li>
                <strong>Passive filter (5th, 7th):</strong> 10-15% THD(I) — typical cost premium
                15-25%
              </li>
              <li>
                <strong>12-pulse drive:</strong> 10-12% THD(I) — typical cost premium 30-40%
              </li>
              <li>
                <strong>Active front-end (AFE):</strong> &lt;5% THD(I) — typical cost premium
                50-80%
              </li>
            </ul>
            <p className="text-sm text-white italic">
              <strong>Economic consideration:</strong> For large installations, the cost of harmonic
              mitigation at source (AFE drives) may be less than the cost of oversized cables,
              transformers, and central filtering required for standard 6-pulse drives.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 1: Neutral Current Calculation
            </p>
            <p>
              <strong>Question:</strong> A three-phase system supplies balanced single-phase
              non-linear loads. Each phase draws 100A fundamental and 45A third harmonic. Calculate
              the neutral current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fundamental currents: 120° phase shift, cancel in neutral</li>
              <li>
                I<sub>N(fundamental)</sub> = 0A
              </li>
              <li>Third harmonic currents: In phase (0°), add directly</li>
              <li>
                I<sub>N(3rd)</sub> = 3 × 45A = <strong>135A</strong>
              </li>
              <li>Total neutral current = 135A (exceeds 100A phase current!)</li>
              <li>→ Neutral must be sized for 135A minimum</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: THD Calculation</p>
            <p>
              <strong>Question:</strong> A non-linear load draws the following currents: Fundamental
              50A, 3rd harmonic 30A, 5th harmonic 25A, 7th harmonic 10A. Calculate the THD(I) and
              RMS current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                THD(I) = √(I<sub>3</sub>² + I<sub>5</sub>² + I<sub>7</sub>²) / I<sub>1</sub> ×
                100%
              </li>
              <li>THD(I) = √(30² + 25² + 10²) / 50 × 100%</li>
              <li>THD(I) = √(900 + 625 + 100) / 50 × 100%</li>
              <li>THD(I) = √1625 / 50 × 100% = 40.3 / 50 × 100%</li>
              <li>
                THD(I) = <strong>80.6%</strong>
              </li>
              <li>RMS current = √(50² + 30² + 25² + 10²)</li>
              <li>RMS current = √(2500 + 900 + 625 + 100) = √4125</li>
              <li>
                RMS current = <strong>64.2A</strong>
              </li>
              <li>→ Cable must be rated for 64.2A, not 50A</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: K-Factor Calculation
            </p>
            <p>
              <strong>Question:</strong> Calculate the K-factor for a load with the following
              harmonic current spectrum (per unit of fundamental): I1=1.0, I3=0.8, I5=0.6, I7=0.4,
              I9=0.2.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                K = Σ(I<sub>h</sub>² × h²) / Σ(I<sub>h</sub>²)
              </li>
              <li>
                Numerator: (1×1) + (0.8²×9) + (0.6²×25) + (0.4²×49) + (0.2²×81)
              </li>
              <li>= 1 + 5.76 + 9 + 7.84 + 3.24 = 26.84</li>
              <li>Denominator: 1² + 0.8² + 0.6² + 0.4² + 0.2²</li>
              <li>= 1 + 0.64 + 0.36 + 0.16 + 0.04 = 2.2</li>
              <li>
                K = 26.84 / 2.2 = <strong>K-12.2</strong>
              </li>
              <li>→ Specify K-13 rated transformer</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Harmonic frequency:</strong> f<sub>h</sub> = h × f<sub>1</sub> (where f
                <sub>1</sub> = 50Hz)
              </li>
              <li>
                <strong>THD:</strong> √(Σh<sub>n</sub>²) / h<sub>1</sub> × 100%
              </li>
              <li>
                <strong>RMS current:</strong> √(I<sub>1</sub>² + I<sub>3</sub>² + I<sub>5</sub>² +
                ...)
              </li>
              <li>
                <strong>Neutral current (triplen):</strong> I<sub>N</sub> = 3 × I<sub>3</sub>{' '}
                (balanced loads)
              </li>
              <li>
                <strong>Voltage distortion:</strong> V<sub>h</sub> = I<sub>h</sub> × Z<sub>h</sub>
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Standards to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EN 50160:</strong> Voltage THD ≤8% for LV supplies
              </li>
              <li>
                <strong>G5/4-1:</strong> UK harmonic assessment for customer connections
              </li>
              <li>
                <strong>BS 7671 Table 5.4a:</strong> Neutral sizing for harmonic currents
              </li>
              <li>
                <strong>IEEE 519:</strong> Harmonic current limits at PCC
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common harmonic and power-quality mistakes"
            whatHappens={
              <>
                Sizing the neutral the same as the phase conductors when triplen harmonics are
                present. Using average-reading meters that under-read distorted currents. Adding
                bare PFC capacitors with VSDs — they resonate and amplify harmonics. Specifying
                standard transformers for IT-heavy or VSD-heavy loads. Underestimating cable
                heating (skin effect plus higher RMS).
              </>
            }
            doInstead={
              <>
                Use Table 5.4a / 200% neutrals for triplen-rich loads. Use true-RMS meters and
                power-quality analysers. Add detuned reactors (typically 7% or 14%) to PFC banks
                where VSDs are present. Specify K-rated transformers (K-9 office, K-13 data
                centre). Apply derating factors for both increased RMS current and skin effect.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Data-centre 1500 kVA transformer specification — K-factor selection"
            situation={
              <>
                A new tier-III data centre has 1500 kVA of computing load via dual-feed
                UPS systems plus 200 kVA of cooling (CRAC units with EC fans). Vendor
                power-quality estimate: THDi 35&ndash;45 % at the UPS input, falling to
                ~10 % through the UPS double-conversion. You must specify the upstream
                LV transformer.
              </>
            }
            whatToDo={
              <>
                Specify a K-13 (or K-20 for headroom) cast-resin or oil-filled transformer
                rated 2000 kVA. Reasoning: K-13 handles the eddy/stray heating from
                THDi up to ~50 %, with 12 % over-rating for harmonic-derived losses.
                Provide a separately-derived neutral (a star secondary with its own
                substantial neutral), and consider a zig-zag transformer at the LV panel
                if triplen content exceeds 33 % at any board. Document G5/5 compliance
                at the PCC with the DNO connection application.
              </>
            }
            whyItMatters={
              <>
                A standard K-1 transformer of the same nameplate kVA would overheat
                within 6&ndash;12 months of energising a data-centre load profile, with
                accelerated insulation breakdown and eventual failure. The cost of
                upgrading post-energisation includes site shutdown of the entire IT
                workload &mdash; six-figure consequence for a five-figure transformer
                spec error. K-rating is the defining transformer decision on every BSE
                data-centre project.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Triplen harmonics (3rd, 9th&hellip;) are zero-sequence — add arithmetically in the neutral, can drive I&#x2099; up to 1.73&times; phase RMS.',
              'BS 7671 Appendix 4 &sect;5.5 mandates derating factors above 33 % triplen content — neutral may need to be 1.45&times; or 2&times; the phase conductor.',
              'K-rated transformers handle eddy/stray heating from non-linear load &mdash; K-4 office, K-13 IT, K-20 data centre.',
              'Engineering Recommendation G5/5 caps THDv at 5 % at the LV PCC — Stage 2/3 assessment for large non-linear loads.',
              'Engineering Recommendation P28 caps voltage step / fluctuation — relevant for large motor starts and welding plants.',
              'Three-phase mitigation hierarchy: line reactor (3&ndash;5 %) &rarr; DC link choke &rarr; passive tuned filter &rarr; 12-pulse rectifier &rarr; AFE drive / active filter.',
              'BS 7671 Reg 331.1 forces assessment of equipment characteristics likely to impair the supply — harmonic emission qualifies.',
              'Document harmonic study + mitigation in the design submission and the DNO connection application — both auditors will check.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Earthing and Protective Devices
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-8')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Building Distribution Boards
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section4_7;
