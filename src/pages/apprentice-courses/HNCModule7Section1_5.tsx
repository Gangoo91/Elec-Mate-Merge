/**
 * Module 7 · Section 1 · Subsection 5 — Power Quality
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Harmonics, voltage variations, flicker, power factor, and mitigation measures for electrical installations
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

const TITLE = 'Power Quality - HNC Module 7 Section 1.5';
const DESCRIPTION =
  'Master power quality concepts for electrical installations: harmonics, THD limits, voltage dips and swells, flicker, power factor correction, G5/5 compliance, and mitigation measures.';

const quickCheckQuestions = [
  {
    id: 'thd-definition',
    question: 'What does THD stand for in power quality?',
    options: [
      'Thermal Harmonic Deviation',
      'Technical Harmonic Distribution',
      'Total Harmonic Detection',
      'Total Harmonic Distortion',
    ],
    correctIndex: 3,
    explanation:
      'THD stands for Total Harmonic Distortion - a measure of the harmonic content present in a waveform expressed as a percentage of the fundamental frequency component.',
  },
  {
    id: 'voltage-dip',
    question: 'A voltage dip is defined as a temporary reduction in RMS voltage to:',
    options: [
      'Between 90% and 100% of nominal',
      'Between 1% and 90% of nominal',
      'Above 110% of nominal',
      'Below 1% of nominal',
    ],
    correctIndex: 1,
    explanation:
      'According to EN 50160, a voltage dip is a temporary reduction in RMS voltage to between 1% and 90% of the nominal voltage, lasting from 10ms to 1 minute.',
  },
  {
    id: 'power-factor',
    question: 'A lagging power factor is caused by:',
    options: [
      'Linear loads',
      'Capacitive loads',
      'Inductive loads',
      'Resistive loads',
    ],
    correctIndex: 2,
    explanation:
      'Inductive loads such as motors, transformers, and fluorescent lighting ballasts cause a lagging power factor where current lags behind voltage.',
  },
  {
    id: 'harmonic-source',
    question: 'Which equipment is a major source of harmonic distortion?',
    options: [
      'Variable speed drives',
      'Resistance heaters',
      'Incandescent lamps',
      'Synchronous motors',
    ],
    correctIndex: 0,
    explanation:
      'Variable speed drives (VSDs), along with other non-linear loads like switched-mode power supplies and LED drivers, are major sources of harmonic distortion due to their rectifier front-ends.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'According to G5/5, what is the typical planning level for voltage THD at 400V?',
    options: [
      '3%',
      '8%',
      '5%',
      '10%',
    ],
    correctAnswer: 1,
    explanation:
      'The G5/5 planning level for voltage THD at 400V low voltage systems is 8%. Individual harmonic limits also apply, with lower limits for lower order harmonics.',
  },
  {
    id: 2,
    question: 'Which harmonic order is typically the largest in three-phase rectifier systems?',
    options: [
      '7th harmonic',
      '3rd harmonic',
      '5th harmonic',
      '11th harmonic',
    ],
    correctAnswer: 2,
    explanation:
      'The 5th harmonic (250Hz) is typically the largest in six-pulse three-phase rectifier systems. The harmonic spectrum follows the pattern 6k±1 where k is an integer, giving 5th, 7th, 11th, 13th, etc.',
  },
  {
    id: 3,
    question: 'What is the effect of triplen harmonics (3rd, 9th, 15th) in a three-phase system?',
    options: [
      'They only affect phase conductors',
      'They cancel out in the neutral',
      'They reduce power factor',
      'They add arithmetically in the neutral',
    ],
    correctAnswer: 3,
    explanation:
      'Triplen harmonics (multiples of 3) are zero-sequence harmonics that add arithmetically in the neutral conductor, potentially causing neutral current to exceed phase current.',
  },
  {
    id: 4,
    question: 'A power factor of 0.8 lagging means:',
    options: [
      '80% of apparent power is real power',
      '80% of apparent power is reactive power',
      'Current leads voltage by 36.87°',
      'Voltage leads current by 53.13°',
    ],
    correctAnswer: 0,
    explanation:
      'Power factor is the ratio of real power (kW) to apparent power (kVA). A PF of 0.8 means 80% of the apparent power is converted to real power, with current lagging voltage by cos⁻¹(0.8) = 36.87°.',
  },
  {
    id: 5,
    question:
      'Which mitigation measure is most effective for reducing 5th and 7th harmonics from VSDs?',
    options: [
      'They add arithmetically in the neutral',
      'Passive LC filters tuned to harmonic frequencies',
      'Injecting currents equal and opposite to the harmonic currents',
      'Pst (short-term) and Plt (long-term)',
    ],
    correctAnswer: 1,
    explanation:
      'Passive LC filters tuned to specific harmonic frequencies provide a low-impedance path to divert harmonic currents away from the supply. Active filters can also be used for broader harmonic mitigation.',
  },
  {
    id: 6,
    question: 'Flicker is measured in units of:',
    options: [
      'They add arithmetically in the neutral',
      'Detuned or harmonic-filtered capacitor banks',
      'Pst (short-term) and Plt (long-term)',
      'Engineering Recommendation G5/5',
    ],
    correctAnswer: 2,
    explanation:
      'Flicker severity is measured using Pst (short-term over 10 minutes) and Plt (long-term over 2 hours). A Pst value of 1.0 represents the threshold of irritability for most people.',
  },
  {
    id: 7,
    question: 'What is the typical voltage tolerance for LV supplies according to EN 50160?',
    options: [
      '±5% of nominal',
      '±15% of nominal',
      '±6% of nominal',
      '±10% of nominal',
    ],
    correctAnswer: 3,
    explanation:
      'EN 50160 specifies that under normal operating conditions, 95% of the 10-minute mean RMS voltage values should be within ±10% of nominal voltage (i.e., 207V to 253V for 230V systems).',
  },
  {
    id: 8,
    question:
      'What type of power factor correction is most suitable for installations with significant harmonic content?',
    options: [
      'Detuned or harmonic-filtered capacitor banks',
      '80% of apparent power is real power',
      'Between 110% and 180% of nominal',
      'They add arithmetically in the neutral',
    ],
    correctAnswer: 0,
    explanation:
      'Detuned capacitor banks include series reactors (typically 7% or 14%) that shift the resonant frequency away from harmonic frequencies, preventing dangerous resonance and capacitor damage.',
  },
  {
    id: 9,
    question: 'A voltage swell is defined as a temporary increase in RMS voltage to:',
    options: [
      'Between 100% and 105% of nominal',
      'Between 110% and 180% of nominal',
      'Between 105% and 110% of nominal',
      'Above 180% of nominal',
    ],
    correctAnswer: 1,
    explanation:
      'A voltage swell is a temporary increase in RMS voltage to between 110% and 180% of nominal, typically lasting from 10ms to 1 minute. Swells often occur when large loads are switched off.',
  },
  {
    id: 10,
    question:
      'Which document provides guidance on harmonic limits for connections to UK distribution networks?',
    options: [
      'Pst (short-term) and Plt (long-term)',
      'Between 110% and 180% of nominal',
      'Engineering Recommendation G5/5',
      'They add arithmetically in the neutral',
    ],
    correctAnswer: 2,
    explanation:
      "Engineering Recommendation G5/5 'Limits for Harmonics in the UK Electricity Supply System' provides planning levels and assessment procedures for harmonic emissions from customer installations.",
  },
  {
    id: 11,
    question: 'What is the displacement power factor?',
    options: [
      'The difference between leading and lagging power factors',
      'The total power factor including all harmonics',
      'The power factor of reactive components only',
      'The ratio of real power to apparent power at the fundamental frequency',
    ],
    correctAnswer: 3,
    explanation:
      'Displacement power factor (DPF) is the power factor at the fundamental frequency only (cosφ₁). Total power factor (TPF) includes the effect of harmonics and is always less than or equal to DPF.',
  },
  {
    id: 12,
    question: 'Active harmonic filters operate by:',
    options: [
      'Injecting currents equal and opposite to the harmonic currents',
      'Converting harmonics to heat energy',
      'Providing a low-impedance path for harmonic currents',
      'Blocking harmonic frequencies with high impedance',
    ],
    correctAnswer: 0,
    explanation:
      'Active harmonic filters measure the harmonic content in real-time and inject compensating currents that are equal in magnitude but opposite in phase, effectively cancelling the harmonic distortion.',
  },
];

const faqs = [
  {
    question: 'What is the difference between voltage THD and current THD?',
    answer:
      'Voltage THD measures harmonic distortion in the voltage waveform at a point in the system, typically limited to 8% in LV systems. Current THD measures harmonic distortion in the current drawn by loads and can be much higher (often 30-80% for non-linear loads). Current harmonics flowing through system impedance create voltage harmonics, so limiting current THD helps maintain voltage quality.',
  },
  {
    question: 'Why do we need detuned capacitor banks rather than standard PFC capacitors?',
    answer:
      'Standard capacitors can create resonance with system inductance at harmonic frequencies, amplifying harmonics and potentially damaging the capacitors. Detuned banks include series reactors (typically 7% or 14%) that lower the resonant frequency below the lowest significant harmonic (usually the 5th at 250Hz), preventing amplification while still providing reactive power compensation.',
  },
  {
    question: 'How do I know if power quality issues are affecting my installation?',
    answer:
      'Signs include unexplained equipment failures, overheating of neutral conductors or transformers, nuisance tripping of protection devices, flickering lights, interference with IT equipment, and higher-than-expected energy bills. Power quality analysers can measure THD, power factor, voltage variations, and flicker to diagnose specific issues.',
  },
  {
    question: 'What causes voltage dips and how can they be mitigated?',
    answer:
      'Voltage dips are typically caused by faults on the supply network, large motor starting currents, or switching of large loads. Mitigation measures include soft starters or VSDs for motors, uninterruptible power supplies (UPS) for sensitive equipment, dynamic voltage restorers (DVRs), and ensuring adequate supply capacity for starting loads.',
  },
  {
    question: 'When is an active filter preferred over a passive filter?',
    answer:
      'Active filters are preferred when: the harmonic spectrum varies (mixed non-linear loads), multiple harmonic orders need addressing simultaneously, space is limited, or the load pattern changes frequently. Passive filters are more economical for fixed loads with predictable harmonic content, particularly when only one or two dominant harmonics need filtering.',
  },
];

const HNCModule7Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · Subsection 5"
            title="Power Quality"
            description="Harmonics, voltage variations, flicker, power factor, and mitigation measures for electrical installations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Define power quality parameters and their effects on equipment",
              "Calculate THD and apply G5/5 harmonic limits",
              "Analyse voltage dips, swells, and interruptions",
              "Understand flicker measurement and mitigation",
              "Design power factor correction systems for harmonic-rich environments",
              "Select appropriate mitigation measures for power quality issues",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Power Quality Fundamentals">
            <p>Power quality refers to the characteristics of the electrical supply that determine whether equipment operates correctly without interference or damage. Poor power quality can cause equipment malfunction, reduced efficiency, overheating, and premature failure.</p>
            <p><strong>Key power quality parameters:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Voltage magnitude:</strong> Steady-state level compared to nominal (230V/400V)</li>
              <li><strong>Frequency:</strong> Deviation from nominal 50Hz (typically ±1%)</li>
              <li><strong>Waveform distortion:</strong> Deviation from ideal sinusoidal (harmonics)</li>
              <li><strong>Voltage variations:</strong> Dips, swells, interruptions, flicker</li>
              <li><strong>Voltage unbalance:</strong> Asymmetry between phases (typically &lt;2%)</li>
            </ul>
            <p><strong>EN 50160 Voltage Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply voltage:</strong> ±10% of Uₙ (207V-253V) — 95% of 10-min values/week</li>
              <li><strong>Frequency:</strong> ±1% (49.5Hz-50.5Hz) — 99.5% of year</li>
              <li><strong>Voltage THD:</strong> ≤8% — 95% of 10-min values/week</li>
              <li><strong>Voltage unbalance:</strong> ≤2% — 95% of 10-min values/week</li>
              <li><strong>Flicker Plt:</strong> ≤1.0 — 95% of week</li>
            </ul>
            <p><strong>Industry impact:</strong> Power quality issues cost UK industry an estimated £150-200 million annually through equipment damage, downtime, and reduced productivity.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Harmonic Distortion">
            <p>Harmonics are sinusoidal voltages or currents at frequencies that are integer multiples of the fundamental supply frequency (50Hz). They are generated by non-linear loads that draw current in pulses rather than smoothly throughout the cycle.</p>
            <p><strong>Common Harmonic Sources</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Variable speed drives</li>
              <li>Switch-mode power supplies</li>
              <li>LED drivers</li>
              <li>UPS systems</li>
              <li>Rectifiers and DC drives</li>
            </ul>
            <p><strong>Effects of Harmonics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Overheating of transformers</li>
              <li>Neutral conductor overload</li>
              <li>Capacitor bank failure</li>
              <li>Motor vibration/noise</li>
              <li>Interference with equipment</li>
            </ul>
            <p><strong>Harmonic Orders</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3rd = 150Hz (triplen)</li>
              <li>5th = 250Hz (dominant)</li>
              <li>7th = 350Hz</li>
              <li>11th = 550Hz</li>
              <li>13th = 650Hz</li>
            </ul>
            <p><strong>Total Harmonic Distortion (THD) Calculation</strong></p>
            <p>THD = √(V₂² + V₃² + V₄² + ... + Vₙ²) / V₁ × 100%</p>
            <p>Where V₁ = fundamental, V₂, V₃... = harmonic magnitudes</p>
            <p><strong>Example:</strong> If V₁=230V, V₅=12V, V₇=8V, V₁₁=4V:</p>
            <p>THD = √(12² + 8² + 4²) / 230 × 100%</p>
            <p>THD = √(144 + 64 + 16) / 230 × 100%</p>
            <p>THD = 6.5% (within 8% limit)</p>
            <p><strong>G5/5 Individual Harmonic Limits at 400V</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>3rd:</strong> 150Hz — 4% — 5%</li>
              <li><strong>5th:</strong> 250Hz — 5% — 6%</li>
              <li><strong>7th:</strong> 350Hz — 4% — 5%</li>
              <li><strong>11th:</strong> 550Hz — 3% — 3.5%</li>
              <li><strong>Total THD:</strong> - — 8% — 8%</li>
            </ul>
            <p><strong>Triplen harmonics:</strong> The 3rd, 9th, 15th harmonics are zero-sequence and add in the neutral conductor - neutral current can exceed phase current in single-phase non-linear loads.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Voltage Variations and Flicker">
            <p>Voltage variations include dips, swells, and interruptions that can cause equipment malfunction or damage. Flicker is rapid voltage fluctuation that causes visible light flickering and can affect sensitive equipment.</p>
            <p><strong>Voltage Variation Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Voltage dip (sag):</strong> 1% to 90% of Uₙ — Faults, large motor starting — 10ms to 1 minute</li>
              <li><strong>Voltage swell:</strong> 110% to 180% of Uₙ — Large load switching off, SLG faults — 10ms to 1 minute</li>
              <li><strong>Interruption:</strong> &lt;1% of Uₙ — Faults, protection operation — 10ms to 3 minutes</li>
              <li><strong>Undervoltage:</strong> &lt;90% of Uₙ sustained — Overloaded circuits, long cables — &gt;1 minute</li>
              <li><strong>Overvoltage:</strong> &gt;110% of Uₙ sustained — Incorrect tap settings, light load — &gt;1 minute</li>
            </ul>
            <p><strong>Flicker Measurement</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pst (short-term):</strong> Measured over 10 minutes, Pst ≤1.0 required</li>
              <li><strong>Plt (long-term):</strong> Calculated from 12 consecutive Pst values over 2 hours</li>
              <li><strong>Flicker sources:</strong> Arc furnaces, welders, large motor starting, wind turbines</li>
              <li><strong>Human perception:</strong> Most sensitive to voltage changes at 8.8Hz frequency</li>
            </ul>
            <p><strong>Voltage Dip Classification (ITIC/CBEMA)</strong></p>
            <p><strong>Region A:</strong> Equipment should operate without interruption</p>
            <p><strong>Region B:</strong> Equipment may malfunction but should not be damaged</p>
            <p><strong>Region C:</strong> Equipment may be damaged</p>
            <p>Example: A 70% dip lasting 100ms falls in Region B - computers may reset but should not be damaged.</p>
            <p><strong>Sensitive equipment:</strong> PLCs, variable speed drives, and IT equipment are particularly sensitive to voltage dips and may require UPS protection or voltage conditioning.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Power Factor and Mitigation Measures">
            <p>Power factor is the ratio of real power (kW) to apparent power (kVA). A low power factor means more current is required to deliver the same real power, increasing losses, requiring larger equipment, and potentially attracting utility penalties.</p>
            <p><strong>Power Factor Relationships</strong></p>
            <p>Power Factor (PF) = P / S = kW / kVA = cosφ</p>
            <p>Reactive Power: Q = S × sinφ (kVAr)</p>
            <p>Apparent Power: S = √(P² + Q²)</p>
            <p><strong>Example:</strong> 100kW load at PF 0.8 lagging:</p>
            <p>S = 100 / 0.8 = 125 kVA</p>
            <p>Q = 125 × 0.6 = 75 kVAr lagging</p>
            <p>To correct to PF 0.95: Need 100/0.95 = 105.3 kVA</p>
            <p>New Q = 105.3 × 0.312 = 32.8 kVAr</p>
            <p>Capacitor required = 75 - 32.8 = 42.2 kVAr</p>
            <p><strong>Mitigation Measures Summary</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Low power factor:</strong> Capacitor banks, synchronous motors — Central or distributed PFC</li>
              <li><strong>Harmonics:</strong> Passive filters, active filters, 12/18-pulse drives — At source or central</li>
              <li><strong>Voltage dips:</strong> UPS, DVR, soft starters — Sensitive equipment protection</li>
              <li><strong>Flicker:</strong> SVCs, STATCOMs, dedicated feeders — Large fluctuating loads</li>
              <li><strong>Neutral overload:</strong> Oversized neutral, zig-zag transformer — Single-phase non-linear loads</li>
            </ul>
            <p><strong>Passive Harmonic Filters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LC circuits tuned to specific frequencies</li>
              <li>Typically 4.7%, 7%, or 14% reactor</li>
              <li>Lower cost, simpler design</li>
              <li>Fixed compensation only</li>
              <li>Risk of resonance if misapplied</li>
            </ul>
            <p><strong>Active Harmonic Filters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Inject compensating currents</li>
              <li>Adapt to changing loads</li>
              <li>Address multiple harmonics</li>
              <li>Higher cost, more complex</li>
              <li>No resonance risk</li>
            </ul>
            <p><strong>Power Quality Monitoring Equipment</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Power quality analysers:</strong> Fluke 435-II, Hioki PQ3100, Dranetz</li>
              <li><strong>Parameters measured:</strong> V, I, P, Q, S, PF, THD, harmonics, dips/swells, flicker</li>
              <li><strong>Standards compliance:</strong> Class A to IEC 61000-4-30 for contractual measurements</li>
              <li><strong>Monitoring period:</strong> Minimum 7 days recommended for baseline assessment</li>
            </ul>
            <p><strong>Detuned capacitors:</strong> In harmonic-rich environments, always use detuned capacitor banks (7% or 14% reactor) to prevent resonance amplification of harmonics at the capacitor bank.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: THD Compliance Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Assess whether a measured harmonic spectrum complies with G5/5 limits.</p>
            <p>Measured values at 400V LV board:</p>
            <p>Fundamental (50Hz): V₁ = 400V</p>
            <p>3rd harmonic: V₃ = 14V (3.5%)</p>
            <p>5th harmonic: V₅ = 18V (4.5%)</p>
            <p>7th harmonic: V₇ = 10V (2.5%)</p>
            <p>11th harmonic: V₁₁ = 6V (1.5%)</p>
            <p>THD calculation:</p>
            <p>THD = √(14² + 18² + 10² + 6²) / 400 × 100%</p>
            <p>THD = √(196 + 324 + 100 + 36) / 400 × 100%</p>
            <p>THD = √656 / 400 × 100% = 6.4%</p>
            <p>Individual harmonics: All within limits</p>
            <p>Total THD: 6.4% &lt; 8% limit - COMPLIANT</p>
            <p>
              <strong>Example 2: Power Factor Correction Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate capacitor bank size to improve power factor from 0.75 to 0.95.</p>
            <p>Installation data:</p>
            <p>Real power demand: P = 200 kW</p>
            <p>Current power factor: PF₁ = 0.75 lagging</p>
            <p>Target power factor: PF₂ = 0.95 lagging</p>
            <p>Step 1: Calculate angles</p>
            <p>φ₁ = cos⁻¹(0.75) = 41.4°, tanφ₁ = 0.882</p>
            <p>φ₂ = cos⁻¹(0.95) = 18.2°, tanφ₂ = 0.329</p>
            <p>Step 2: Calculate reactive power</p>
            <p>Q₁ = P × tanφ₁ = 200 × 0.882 = 176.4 kVAr</p>
            <p>Q₂ = P × tanφ₂ = 200 × 0.329 = 65.8 kVAr</p>
            <p>Step 3: Capacitor required</p>
            <p>Qc = Q₁ - Q₂ = 176.4 - 65.8 = 110.6 kVAr</p>
            <p>Select: 125 kVAr detuned capacitor bank</p>
            <p>(Use detuned type due to likely VSD loads)</p>
            <p>
              <strong>Example 3: Neutral Current with Triplen Harmonics</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate neutral current for balanced single-phase non-linear loads.</p>
            <p>Each phase draws 50A with 30% 3rd harmonic:</p>
            <p>Fundamental current: I₁ = 50A per phase</p>
            <p>3rd harmonic current: I₃ = 50 × 0.30 = 15A per phase</p>
            <p>Fundamental in neutral (balanced):</p>
            <p>IN₁ = 0A (cancel in balanced system)</p>
            <p>3rd harmonic in neutral:</p>
            <p>IN₃ = 3 × I₃ = 3 × 15A = 45A</p>
            <p>(Triplen harmonics add arithmetically)</p>
            <p>Phase current: Iph = √(50² + 15²) = 52.2A</p>
            <p>Neutral current (45A) approaches phase current!</p>
            <p>Solution: Oversize neutral to 150% of phase size</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Power Quality Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install power quality analyser for minimum 7-day monitoring period</li>
              <li>Record voltage THD, current THD, and individual harmonics</li>
              <li>Measure power factor at various load conditions</li>
              <li>Log voltage dips/swells with magnitude and duration</li>
              <li>Assess flicker Pst and Plt values</li>
              <li>Compare results against G5/5 and EN 50160 limits</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage THD limit: <strong>8%</strong> at LV (G5/5)</li>
              <li>Voltage tolerance: <strong>±10%</strong> of nominal (EN 50160)</li>
              <li>Target power factor: <strong>&gt;0.95</strong> to avoid penalties</li>
              <li>Flicker limit: <strong>Pst ≤1.0</strong></li>
              <li>5th harmonic limit: <strong>5%</strong> planning level</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Standard capacitors with VSDs</strong> - Always use detuned banks to prevent resonance</li>
                <li><strong>Undersized neutrals</strong> - Size for triplen harmonics in single-phase loads</li>
                <li><strong>Ignoring displacement vs total PF</strong> - Harmonics reduce total power factor</li>
                <li><strong>Over-correction of PF</strong> - Can cause leading power factor and voltage rise</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Discrimination studies
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Load assessment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section1_5;
