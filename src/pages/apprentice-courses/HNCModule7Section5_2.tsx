/**
 * Module 7 · Section 5 · Subsection 2 — Power Factor Correction
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Reactive power fundamentals, capacitor bank sizing, automatic PFC systems, and harmonic considerations for industrial installations
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

const TITLE = 'Power Factor Correction - HNC Module 7 Section 5.2';
const DESCRIPTION =
  'Master power factor correction for industrial installations: reactive power fundamentals, capacitor bank sizing, automatic PFC systems, detuned reactors for harmonic environments, and installation requirements per BS 7671.';

const quickCheckQuestions = [
  {
    id: 'reactive-power',
    question: 'What is reactive power (kVAr)?',
    options: [
      'The power that performs useful work such as heating and mechanical output',
      'The vector sum of real and reactive power drawn from the supply',
      'Power oscillating between source and inductive/capacitive loads',
      'The power dissipated as heat in the cable resistance',
    ],
    correctIndex: 2,
    explanation:
      'Reactive power (kVAr) represents energy that oscillates between the source and reactive components (inductors and capacitors). It does no useful work but is essential for establishing magnetic and electric fields in AC circuits.',
  },
  {
    id: 'pf-calculation',
    question:
      'An installation draws 150 kW at 0.75 power factor lagging. What is the apparent power (kVA)?',
    options: [
      '112.5 kVA',
      '150 kVA',
      '175 kVA',
      '200 kVA',
    ],
    correctIndex: 3,
    explanation:
      'Apparent power S = P / pf = 150 / 0.75 = 200 kVA. This demonstrates why poor power factor increases the apparent power demand on the supply system.',
  },
  {
    id: 'capacitor-sizing',
    question:
      'To correct power factor from 0.8 to 0.95 for a 100 kW load, which value is closest to the required kVAr?',
    options: [
      '42 kVAr',
      '25 kVAr',
      '55 kVAr',
      '75 kVAr',
    ],
    correctIndex: 0,
    explanation:
      'kVAr = P × (tan φ₁ - tan φ₂) = 100 × (tan 36.87° - tan 18.19°) = 100 × (0.75 - 0.329) = 42.1 kVAr. This calculation is fundamental to capacitor bank sizing.',
  },
  {
    id: 'detuned-reactor',
    question: 'Why are detuned reactors used with capacitor banks in harmonic-rich environments?',
    options: [
      'To reduce the physical size of capacitors',
      'To prevent harmonic resonance and capacitor damage',
      'To eliminate the need for protection devices',
      'To increase the capacitor voltage rating',
    ],
    correctIndex: 1,
    explanation:
      'Detuned reactors shift the resonant frequency of the capacitor bank below the lowest significant harmonic (typically 189 Hz for 7% detuning), preventing dangerous harmonic amplification and protecting capacitors from overload.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the relationship between power factor (pf), real power (P), and apparent power (S)?',
    options: [
      'pf = S / P',
      'pf = P / S',
      'pf = P × S',
      'pf = P - S',
    ],
    correctAnswer: 1,
    explanation:
      'Power factor is the ratio of real power (kW) to apparent power (kVA): pf = P / S = cos φ. This dimensionless ratio ranges from 0 to 1, with 1 being unity power factor.',
  },
  {
    id: 2,
    question:
      'A factory has a maximum demand of 500 kVA at 0.7 pf lagging. What is the reactive power demand?',
    options: [
      '500 kVAr',
      '250 kVAr',
      '357 kVAr',
      '350 kVAr',
    ],
    correctAnswer: 2,
    explanation:
      'Q = S × sin φ. First find φ from cos φ = 0.7, so φ = 45.57°, sin φ = 0.714. Therefore Q = 500 × 0.714 = 357 kVAr.',
  },
  {
    id: 3,
    question:
      'What is the main financial benefit of power factor correction for industrial consumers?',
    options: [
      'A lower unit price per kWh of energy consumed',
      'Exemption from the Climate Change Levy on electricity',
      'Reduced standing charge for the metering equipment',
      'Lower reactive power charges and maximum demand penalties',
    ],
    correctAnswer: 3,
    explanation:
      'Electricity suppliers charge penalties for poor power factor (typically below 0.95) through reactive power charges (kVAr) and increased maximum demand charges (kVA). PFC reduces both.',
  },
  {
    id: 4,
    question:
      'An installation requires 80 kVAr of correction. Which capacitor bank configuration would be most suitable for varying loads?',
    options: [
      'Automatic PFC with 8 × 10 kVAr stages',
      'Two 40 kVAr fixed capacitors',
      'Single 80 kVAr fixed capacitor',
      'One 100 kVAr capacitor with reduced voltage',
    ],
    correctAnswer: 0,
    explanation:
      'Automatic PFC with multiple stages (8 × 10 kVAr = 80 kVAr) provides stepped correction matching the varying reactive power demand, preventing over-correction which would cause leading power factor.',
  },
  {
    id: 5,
    question: 'What is the typical target power factor for UK industrial installations?',
    options: [
      '0.90 lagging',
      '0.95 lagging or better',
      'Unity (1.0)',
      '0.85 lagging',
    ],
    correctAnswer: 1,
    explanation:
      'UK electricity suppliers typically require 0.95 lagging or better to avoid reactive power charges. Correcting beyond 0.98 is often not cost-effective and risks leading power factor at light loads.',
  },
  {
    id: 6,
    question:
      'A 7% detuned reactor is used with a PFC capacitor bank. At what frequency is the system tuned?',
    options: [
      '50 Hz',
      '150 Hz',
      '189 Hz',
      '250 Hz',
    ],
    correctAnswer: 2,
    explanation:
      '7% detuning means the resonant frequency fr = 50 / √0.07 = 50 / 0.265 = 189 Hz. This is below the 5th harmonic (250 Hz), preventing resonance with common harmonics.',
  },
  {
    id: 7,
    question:
      'Which BS standard specifically covers capacitor installations for power factor correction?',
    options: [
      'BS EN 60898 (circuit breakers for household installations)',
      'BS EN 61439 (low-voltage switchgear assemblies)',
      'BS EN 60269 (low-voltage fuses)',
      'Both BS EN 61921 and BS EN 60831',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 61921 covers capacitor installation design and application, while BS EN 60831 specifies capacitor construction and testing. Both are essential references for PFC installations.',
  },
  {
    id: 8,
    question: 'What protection device is essential for capacitor bank installations?',
    options: [
      'HRC fuses or MCCBs rated for capacitor switching duty',
      'A standard Type B MCB sized to the rated capacitor current',
      'A 30 mA RCD on each capacitor stage',
      'A semiconductor fuse rated for the supply frequency only',
    ],
    correctAnswer: 0,
    explanation:
      'HRC fuses or MCCBs with adequate breaking capacity and rated for capacitor switching duty are essential. Standard MCBs may not handle capacitor inrush currents (up to 200× rated current) safely.',
  },
  {
    id: 9,
    question:
      'An automatic PFC controller measures which parameters to determine capacitor switching?',
    options: [
      'Voltage only',
      'Current and power factor',
      'Temperature only',
      'Frequency only',
    ],
    correctAnswer: 1,
    explanation:
      'Automatic PFC controllers measure load current via CT and system voltage to calculate the power factor continuously. They then switch capacitor stages in/out to maintain the target power factor.',
  },
  {
    id: 10,
    question: 'What is the typical safe discharge time for PFC capacitors before maintenance work?',
    options: [
      'Capacitors discharge instantly the moment the supply is isolated',
      '30 seconds is always sufficient regardless of capacitor size',
      'Around 3 minutes, allowing discharge resistors to bring the voltage down to a safe level',
      'No discharge time is needed if the bank is fitted with HRC fuses',
    ],
    correctAnswer: 2,
    explanation:
      'PFC capacitors retain a dangerous charge after isolation and must be allowed to discharge to a safe voltage (typically taken as 75 V) through their discharge resistors before work begins — commonly around 3 minutes. BS 7671 (Reg 559.7) mandates that compensation capacitors with a total capacitance exceeding 0.5 µF are used only in conjunction with discharge resistors.',
  },
  {
    id: 11,
    question: 'What happens if capacitors are switched in when not required (over-correction)?',
    options: [
      'Lagging power factor causing increased reactive power charges',
      'Unity power factor with no effect on system voltage',
      'A reduction in the harmonic content of the supply current',
      'Leading power factor causing voltage rise and potential utility penalties',
    ],
    correctAnswer: 3,
    explanation:
      'Over-correction causes leading power factor, which raises system voltage and can attract utility penalties. It may also cause resonance issues. Automatic PFC prevents this by matching correction to demand.',
  },
  {
    id: 12,
    question:
      'Calculate the kVAr required to correct a 200 kW load from 0.75 to 0.95 power factor.',
    options: [
      '111 kVAr',
      '150 kVAr',
      '85 kVAr',
      '132 kVAr',
    ],
    correctAnswer: 0,
    explanation:
      'kVAr = P × (tan φ₁ - tan φ₂). At pf 0.75: φ₁ = 41.41°, tan φ₁ = 0.882. At pf 0.95: φ₂ = 18.19°, tan φ₂ = 0.329. kVAr = 200 × (0.882 - 0.329) = 200 × 0.553 = 110.6 kVAr ≈ 111 kVAr.',
  },
];

const faqs = [
  {
    question: 'When should fixed capacitors be used instead of automatic PFC?',
    answer:
      'Fixed capacitors are suitable for constant loads such as large motors running continuously at steady load. They are simpler and cheaper but cannot adapt to varying loads. For installations with fluctuating demand (most industrial sites), automatic PFC with multiple switched stages is preferred to avoid over-correction during light load periods.',
  },
  {
    question: 'How do I determine if detuned reactors are necessary?',
    answer:
      'Detuned reactors are essential when total harmonic distortion (THD) exceeds 5%, or when VSD drives, UPS systems, LED lighting, or other non-linear loads represent more than 20% of the connected load. Without detuning, harmonic currents can cause capacitor overheating, premature failure, and dangerous resonance. A power quality survey should be conducted before specifying PFC equipment.',
  },
  {
    question: 'What maintenance do PFC systems require?',
    answer:
      'Annual maintenance should include: visual inspection for swelling or leakage, thermal imaging to identify hotspots, capacitance measurement (replace if more than 5% reduction), contactor contact inspection, controller calibration check, discharge resistor verification, and cleaning of ventilation. Capacitors typically have a 10-15 year service life depending on operating conditions.',
  },
  {
    question: 'Can power factor correction reduce my electricity bills significantly?',
    answer:
      'Yes, substantial savings are achievable. A factory paying £5,000/year in reactive power charges could eliminate these entirely with PFC. Additionally, by reducing apparent power (kVA), the maximum demand charge also reduces. Payback periods of 1-3 years are typical for industrial PFC installations. The financial case should include avoided capacity charges for future load growth.',
  },
  {
    question: 'What cable sizing considerations apply to capacitor circuits?',
    answer:
      'Capacitor cables must be sized for at least 1.5 times the rated capacitor current to account for harmonics, voltage variations, and capacitance tolerance (per BS 7671). Cable voltage drop should not exceed 3% to maintain capacitor effectiveness. Additionally, cables must withstand high inrush currents during switching.',
  },
  {
    question: 'How does power factor correction affect generator sizing?',
    answer:
      'Generators must supply the full kVA demand of a load. Improving power factor from 0.75 to 0.95 allows a smaller generator to supply the same kW load. For example, a 100 kW load at 0.75 pf needs a 133 kVA generator, but at 0.95 pf only needs 105 kVA. However, capacitors must be carefully controlled or disconnected when running on generator to prevent voltage regulation issues.',
  },
];

const HNCModule7Section5_2 = () => {
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
            eyebrow="Module 7 · Section 5 · Subsection 2"
            title="Power Factor Correction"
            description="Reactive power fundamentals, capacitor bank sizing, automatic PFC systems, and harmonic considerations for industrial installations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the power triangle and relationship between P, Q, and S",
              "Calculate reactive power requirements for power factor correction",
              "Size capacitor banks for fixed and automatic PFC applications",
              "Specify detuned reactors for harmonic-rich environments",
              "Apply BS 7671 and BS EN 61921 requirements to PFC installations",
              "Design protection and control systems for capacitor banks",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Reactive Power Fundamentals">
            <p>In AC electrical systems, the relationship between voltage and current determines how effectively power is delivered to loads. When current and voltage are in phase, all power delivered does useful work. However, inductive loads such as motors, transformers, and fluorescent lighting cause current to lag behind voltage, creating reactive power.</p>
            <p><strong>The Power Triangle</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Real power (P):</strong> Measured in kW - power that does useful work (heating, mechanical output)</li>
              <li><strong>Reactive power (Q):</strong> Measured in kVAr - power oscillating between source and load, establishing magnetic/electric fields</li>
              <li><strong>Apparent power (S):</strong> Measured in kVA - the vector sum of P and Q, representing total supply demand</li>
              <li><strong>Power factor (pf):</strong> Dimensionless ratio P/S = cos φ, where φ is the phase angle between voltage and current</li>
            </ul>
            <p><strong>Power Triangle Relationships</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>S² = P² + Q²:</strong> Pythagorean relationship — Finding any power component</li>
              <li><strong>pf = P / S = cos φ:</strong> Power factor definition — Determining phase angle</li>
              <li><strong>Q = P × tan φ:</strong> Reactive from real power — Calculating kVAr demand</li>
              <li><strong>S = P / pf:</strong> Apparent from real power — Supply sizing calculations</li>
            </ul>
            <p><strong>Why Power Factor Matters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply capacity:</strong> Poor pf means higher kVA demand for the same kW load</li>
              <li><strong>Cable sizing:</strong> Current increases as pf decreases (I = P / (√3 × V × pf))</li>
              <li><strong>Transformer loading:</strong> Transformers are rated in kVA, not kW</li>
              <li><strong>Utility charges:</strong> Reactive power charges apply below 0.95 pf</li>
              <li><strong>Voltage regulation:</strong> High reactive current causes increased voltage drop</li>
            </ul>
            <p><strong>Key principle:</strong> Improving power factor from 0.7 to 0.95 reduces apparent power by 26% - equivalent to increasing supply capacity without infrastructure upgrades.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Capacitor Bank Sizing and Selection">
            <p>Capacitors provide leading reactive power that cancels the lagging reactive power drawn by inductive loads. Correct sizing ensures the target power factor is achieved without over-correction, which would cause leading power factor and potential problems.</p>
            <p><strong>Fixed Capacitor Banks</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Suitable for constant loads (large motors)</li>
              <li>Simple, lower cost installation</li>
              <li>No control equipment required</li>
              <li>Risk of over-correction at light loads</li>
              <li>Often installed at motor terminals</li>
            </ul>
            <p><strong>Automatic PFC Banks</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Suited for varying loads (most industrial)</li>
              <li>Multiple switched capacitor stages</li>
              <li>Controller maintains target pf</li>
              <li>Prevents over-correction</li>
              <li>Typically installed at main switchboard</li>
            </ul>
            <p><strong>Capacitor Sizing Calculation</strong></p>
            <p>Step 1: Determine existing power factor and target</p>
            <p>Existing pf = 0.75 lagging → φ₁ = cos⁻¹(0.75) = 41.41°</p>
            <p>Target pf = 0.95 lagging → φ₂ = cos⁻¹(0.95) = 18.19°</p>
            <p>Step 2: Calculate tangent values</p>
            <p>tan φ₁ = tan(41.41°) = 0.882</p>
            <p>tan φ₂ = tan(18.19°) = 0.329</p>
            <p>Step 3: Calculate required kVAr per kW of load</p>
            <p>kVAr/kW = tan φ₁ - tan φ₂ = 0.882 - 0.329 = 0.553</p>
            <p>Step 4: Apply to actual load</p>
            <p>For 200 kW load: kVAr = 200 × 0.553 =  <span>110.6 kVAr</span></p>
            <p><strong>Standard Capacitor Bank Ratings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>5 kVAr:</strong> Small commercial, fine control — Contactor</li>
              <li><strong>10 kVAr:</strong> Light industrial, retail — Contactor</li>
              <li><strong>25 kVAr:</strong> Medium industrial — Contactor or thyristor</li>
              <li><strong>50 kVAr:</strong> Heavy industrial — Contactor or circuit breaker</li>
              <li><strong>100+ kVAr:</strong> Large industrial, substations — Circuit breaker</li>
            </ul>
            <p><strong>Sizing tip:</strong> For automatic PFC, select stage sizes that provide adequate resolution. A 150 kVAr bank might use 6 × 25 kVAr or 5 × 25 kVAr + 5 × 5 kVAr for finer control.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Automatic Power Factor Correction">
            <p>Automatic PFC systems continuously monitor power factor and switch capacitor stages in or out to maintain the target value. This is essential for installations with varying loads where fixed correction would cause over-correction during light load periods.</p>
            <p><strong>Automatic PFC Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Power factor controller:</strong> Microprocessor unit measuring V, I, and calculating pf continuously</li>
              <li><strong>Current transformer (CT):</strong> Measures load current for pf calculation (typically 5A secondary)</li>
              <li><strong>Capacitor stages:</strong> Individual capacitor units with contactors for switching</li>
              <li><strong>Switching contactors:</strong> Special capacitor-duty contactors with pre-insertion resistors</li>
              <li><strong>Discharge resistors:</strong> Ensure safe voltage decay when capacitors disconnect</li>
              <li><strong>Protection devices:</strong> HRC fuses or MCCBs rated for capacitor duty</li>
            </ul>
            <p><strong>Controller Operation Sequence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1:</strong> Measure voltage and current — Determine load conditions</li>
              <li><strong>2:</strong> Calculate power factor — Compare with target setpoint</li>
              <li><strong>3:</strong> Determine correction needed — Calculate kVAr deficit/excess</li>
              <li><strong>4:</strong> Check discharge time — Ensure capacitor ready for reconnection</li>
              <li><strong>5:</strong> Switch appropriate stage — Add/remove capacitors</li>
              <li><strong>6:</strong> Wait settling time — Allow system to stabilise</li>
            </ul>
            <p><strong>Contactor Switching</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pre-insertion resistors limit inrush</li>
              <li>30-60 second minimum off time</li>
              <li>Lower cost, proven technology</li>
              <li>Mechanical wear limits life</li>
              <li>Suitable for most applications</li>
            </ul>
            <p><strong>Thyristor Switching</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zero-crossing switching eliminates transients</li>
              <li>Rapid response (&lt;20ms)</li>
              <li>No mechanical wear</li>
              <li>Higher cost, requires cooling</li>
              <li>For fast-changing loads, welders, cranes</li>
            </ul>
            <p><strong>CT placement:</strong> The current transformer must be installed on the supply side of the PFC connection point, measuring the total load current including any existing correction.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Harmonic Filters and Detuned Reactors">
            <p>Modern installations contain significant non-linear loads (VSDs, LED drivers, IT equipment) that generate harmonic currents. Standard capacitors can create dangerous resonance with system inductance, amplifying harmonics and causing capacitor failure. Detuned reactors prevent this by shifting the resonant frequency below harmful harmonics.</p>
            <p><strong>Warning: Harmonic Resonance</strong></p>
            <p>When system inductance (transformers, cables) resonates with capacitor banks at a harmonic frequency, currents at that frequency are amplified dramatically. This causes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitor overheating and premature failure</li>
              <li>Blown fuses and nuisance tripping</li>
              <li>Voltage distortion and equipment malfunction</li>
              <li>Potential fire risk in severe cases</li>
            </ul>
            <p><strong>Detuning Reactor Principles</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Series reactor:</strong> Inductor connected in series with each capacitor stage</li>
              <li><strong>Detuning factor (p):</strong> Expressed as percentage (typically 7%, 5.67%, or 14%)</li>
              <li><strong>Resonant frequency:</strong> f<sub>r</sub> = 50 / √p (for 7%: f <sub>r</sub> = 189 Hz)</li>
              <li><strong>Purpose:</strong> Shift resonance below 5th harmonic (250 Hz) to prevent amplification</li>
            </ul>
            <p><strong>Detuning Factor Selection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>5.67%:</strong> 210 Hz — Low harmonic environments (THD &lt;8%)</li>
              <li><strong>7%:</strong> 189 Hz — Standard industrial (THD 8-15%)</li>
              <li><strong>14%:</strong> 134 Hz — High harmonic environments (THD &gt;15%)</li>
            </ul>
            <p><strong>Detuned vs Active Filters</strong></p>
            <p><strong>Detuned Reactors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Prevent resonance only</li>
              <li>• Do not reduce harmonics</li>
              <li>• Passive, reliable technology</li>
              <li>• Lower cost</li>
            </ul>
            <p><strong>Active Harmonic Filters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Actively cancel harmonics</li>
              <li>• Can provide reactive power</li>
              <li>• Complex, require maintenance</li>
              <li>• Higher cost, higher benefit</li>
            </ul>
            <p><strong>Survey first:</strong> Always conduct a power quality survey before specifying PFC equipment. Harmonic levels determine whether standard, detuned, or active solutions are required.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Complete PFC Sizing Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> A factory has 300 kW load at 0.72 power factor. Calculate capacitor bank size to achieve 0.95 pf.</p>
            <p>Given:</p>
            <p>P = 300 kW, pf₁ = 0.72, pf₂ = 0.95 (target)</p>
            <p>Step 1: Find phase angles</p>
            <p>φ₁ = cos⁻¹(0.72) = 43.95°</p>
            <p>φ₂ = cos⁻¹(0.95) = 18.19°</p>
            <p>Step 2: Calculate tangent values</p>
            <p>tan(43.95°) = 0.964</p>
            <p>tan(18.19°) = 0.329</p>
            <p>Step 3: Calculate kVAr required</p>
            <p>kVAr = P × (tan φ₁ - tan φ₂)</p>
            <p>kVAr = 300 × (0.964 - 0.329)</p>
            <p>kVAr = 300 × 0.635 = <span>190.5 kVAr</span></p>
            <p>Step 4: Select bank configuration</p>
            <p>Option A: 8 × 25 kVAr = 200 kVAr (automatic)</p>
            <p>Option B: 6 × 25 kVAr + 4 × 10 kVAr = 190 kVAr (finer control)</p>
            <p>
              <strong>Example 2: Financial Payback Analysis</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate annual savings and payback for a 200 kVAr PFC installation.</p>
            <p>Current situation:</p>
            <p>Max demand: 500 kVA at 0.75 pf → P = 375 kW</p>
            <p>kVA charge: £8/kVA/month × 500 kVA = £4,000/month</p>
            <p>kVAr charge: £0.50/kVAr/month × 331 kVAr = £166/month</p>
            <p>After PFC (200 kVAr correction):</p>
            <p>New pf ≈ 0.95, new kVA = 375/0.95 = 395 kVA</p>
            <p>New kVA charge: £8 × 395 = £3,160/month</p>
            <p>New kVAr: 331 - 200 = 131 kVAr</p>
            <p>New kVAr charge: £0.50 × 131 = £66/month (or zero if &gt;0.95)</p>
            <p>Annual savings:</p>
            <p>kVA saving: (4,000 - 3,160) × 12 = <span>£10,080</span></p>
            <p>kVAr saving: (166 - 66) × 12 = <span>£1,200</span></p>
            <p>Total annual saving: <span>£11,280</span></p>
            <p>Payback (200 kVAr detuned bank ~£15,000 installed):</p>
            <p>Payback = £15,000 / £11,280 = <span>1.3 years</span></p>
            <p>
              <strong>Example 3: Motor Individual Correction</strong>
            </p>
            <p><strong>Scenario:</strong> Size a fixed capacitor for a 45 kW motor running at 0.82 pf.</p>
            <p>Motor data:</p>
            <p>P = 45 kW, pf = 0.82, target pf = 0.95</p>
            <p>Calculation:</p>
            <p>φ₁ = cos⁻¹(0.82) = 34.92°, tan φ₁ = 0.698</p>
            <p>φ₂ = cos⁻¹(0.95) = 18.19°, tan φ₂ = 0.329</p>
            <p>kVAr = 45 × (0.698 - 0.329) = <span>16.6 kVAr</span></p>
            <p>Selection:</p>
            <p>Use standard 15 kVAr capacitor (nearest lower value)</p>
            <p>Note: Never exceed motor no-load magnetising current</p>
            <p>or self-excitation can occur during motor run-down</p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                LED technology
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Harmonic mitigation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section5_2;
