/**
 * Module 3 · Section 2 · Subsection 4 — Power Factor: Causes and Effects on Systems
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   Why a 100 kW motor draws more than 100 kVA from the supply, what it costs the tenant
 *   on the utility bill, and what it does to cable, transformer and switchgear sizing.
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

const TITLE = 'Power Factor - Causes and Effects on Systems - HNC Module 3 Section 2.4';
const DESCRIPTION =
  'Understand power factor in AC circuits: true power, reactive power, apparent power, the power triangle, and the effects of poor power factor on building services electrical systems including DNO penalties.';

const quickCheckQuestions = [
  {
    id: 'power-factor-definition',
    question: 'What is the formula for power factor?',
    options: ['pf = S/P', 'pf = Q/P', 'pf = P/S', 'pf = P/Q'],
    correctIndex: 2,
    explanation:
      'Power factor is the ratio of true power (P) to apparent power (S): pf = P/S = cos φ. It indicates how effectively current is being converted into useful work.',
  },
  {
    id: 'lagging-power-factor',
    question: 'Which type of load causes a lagging power factor?',
    options: ['Resistive heaters', 'Capacitor banks', 'Induction motors', 'LED drivers'],
    correctIndex: 2,
    explanation:
      'Induction motors cause a lagging power factor because current lags behind voltage due to their inductive nature. This is the most common cause of poor power factor in buildings.',
  },
  {
    id: 'power-triangle',
    question: 'In the power triangle, what does the vertical side represent?',
    options: ['True power (P)', 'Apparent power (S)', 'Reactive power (Q)', 'Power factor'],
    correctIndex: 2,
    explanation:
      'The power triangle shows P (true power) on the horizontal axis, Q (reactive power) on the vertical axis, and S (apparent power) as the hypotenuse. Q represents the power that oscillates between source and load.',
  },
  {
    id: 'poor-pf-effect',
    question: 'What is a direct consequence of operating with a 0.7 power factor instead of unity?',
    options: [
      'Reduced cable heating',
      'Lower energy bills',
      '43% higher current for same power',
      'Faster motor operation',
    ],
    correctIndex: 2,
    explanation:
      'At 0.7 pf, current is 1/0.7 = 1.43 times higher than at unity pf for the same real power. This 43% increase causes greater I²R losses, voltage drop, and requires larger cables.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is true power (P) measured in?',
    options: [
      'Volt-amperes (VA)',
      'Volt-amperes reactive (VAr)',
      'Watts (W)',
      'Power factor units',
    ],
    correctAnswer: 2,
    explanation:
      'True power (P) is measured in Watts (W) or kilowatts (kW). It represents the actual power doing useful work in the circuit.',
  },
  {
    id: 2,
    question: 'A motor draws 50kVA at 0.8 power factor. What is the true power?',
    options: ['62.5kW', '50kW', '40kW', '30kW'],
    correctAnswer: 2,
    explanation:
      'True power P = S × pf = 50kVA × 0.8 = 40kW. The remaining 30kVAr is reactive power.',
  },
  {
    id: 3,
    question: 'What causes leading power factor?',
    options: [
      'Induction motors',
      'Transformers at low load',
      'Capacitor banks or synchronous motors',
      'Incandescent lighting',
    ],
    correctAnswer: 2,
    explanation:
      'Capacitor banks and over-excited synchronous motors cause leading power factor, where current leads voltage. This is used for power factor correction.',
  },
  {
    id: 4,
    question: 'Using S² = P² + Q², calculate Q when S = 100kVA and P = 80kW.',
    options: ['20kVAr', '40kVAr', '60kVAr', '80kVAr'],
    correctAnswer: 2,
    explanation: 'Q = √(S² - P²) = √(100² - 80²) = √(10000 - 6400) = √3600 = 60kVAr',
  },
  {
    id: 5,
    question: 'What is the typical power factor of an unloaded induction motor?',
    options: ['0.95 lagging', '0.85 lagging', '0.3 to 0.4 lagging', 'Unity'],
    correctAnswer: 2,
    explanation:
      'Unloaded induction motors have very poor power factor (0.3-0.4) because magnetising current is a large proportion of total current. This improves significantly when loaded.',
  },
  {
    id: 6,
    question: 'At what power factor do UK DNOs typically start charging reactive power penalties?',
    options: ['Below unity', 'Below 0.95', 'Below 0.90', 'Below 0.85'],
    correctAnswer: 2,
    explanation:
      'Most UK DNOs charge reactive power penalties when power factor falls below 0.90. The charge is typically based on kVArh consumption above this threshold.',
  },
  {
    id: 7,
    question: 'How does poor power factor affect cable sizing?',
    options: [
      'No effect - cables are sized on true power only',
      'Larger cables needed due to higher current',
      'Smaller cables can be used',
      'Only affects three-phase cables',
    ],
    correctAnswer: 1,
    explanation:
      'Poor power factor means higher current for the same real power, requiring larger cables to carry the additional current without overheating or excessive voltage drop.',
  },
  {
    id: 8,
    question:
      'What power factor do fluorescent luminaires with electronic control gear typically achieve?',
    options: ['0.5 lagging', '0.7 lagging', '0.85 lagging', '0.95 or better'],
    correctAnswer: 3,
    explanation:
      'Modern electronic control gear includes power factor correction, achieving 0.95 or better. Older magnetic ballasts typically operated at 0.5-0.6 power factor.',
  },
  {
    id: 9,
    question:
      'If cable I²R losses are 2kW at unity power factor, what are they at 0.8 pf (same real power)?',
    options: ['1.6kW', '2.0kW', '2.5kW', '3.125kW'],
    correctAnswer: 3,
    explanation:
      'At 0.8 pf, current is 1.25× higher (1/0.8). Losses = I²R, so with 1.25× current: (1.25)² × 2kW = 1.5625 × 2 = 3.125kW - a 56% increase in losses.',
  },
  {
    id: 10,
    question:
      'A building has 200kW load at 0.75 pf. What apparent power must the transformer supply?',
    options: ['150kVA', '200kVA', '267kVA', '300kVA'],
    correctAnswer: 2,
    explanation:
      'S = P / pf = 200kW / 0.75 = 267kVA. The transformer must be rated for apparent power, not just true power, hence poor pf requires larger transformers.',
  },
  {
    id: 11,
    question: 'What is the phase angle φ when power factor is 0.866?',
    options: ['15°', '30°', '45°', '60°'],
    correctAnswer: 1,
    explanation:
      'pf = cos φ, so φ = cos⁻¹(0.866) = 30°. This represents the phase difference between voltage and current waveforms.',
  },
  {
    id: 12,
    question: 'Which building services equipment typically has the worst power factor?',
    options: [
      'Electric resistance heaters',
      'LED lighting with drivers',
      'Lightly loaded induction motors',
      'Computer power supplies',
    ],
    correctAnswer: 2,
    explanation:
      'Lightly loaded induction motors can have power factors as low as 0.3, much worse than motors at full load (0.85). Variable speed drives can help by unloading motors efficiently.',
  },
];

const faqs = [
  {
    question: 'Why does poor power factor increase electricity costs?',
    answer:
      'Poor power factor increases costs in two ways: (1) DNOs charge reactive power penalties (typically above kVArh allowances) to recover costs of supplying reactive current, and (2) higher currents cause greater I²R losses in your own cables, so more energy is wasted as heat. Commercial users with maximum demand tariffs pay for kVA capacity, making poor pf directly expensive.',
  },
  {
    question: 'Can power factor be too high (leading)?',
    answer:
      'Yes, excessive leading power factor (from over-compensation with capacitors) can cause problems including voltage rise, potential resonance with system inductance, and additional losses. Most installations aim for 0.95-0.98 lagging rather than unity, providing a safety margin against leading pf conditions.',
  },
  {
    question: 'How do variable speed drives affect power factor?',
    answer:
      'Modern variable speed drives (VSDs) typically have power factor correction built in, achieving 0.95 or better regardless of motor loading. This is a major advantage over direct-on-line motors which have poor pf at light loads. However, older or basic VSDs may introduce harmonic distortion which affects power quality differently.',
  },
  {
    question: "What's the difference between displacement and distortion power factor?",
    answer:
      'Displacement power factor (cos φ) relates to the phase shift between fundamental voltage and current waveforms. Distortion power factor accounts for harmonic content in non-sinusoidal waveforms. True power factor is the product of both. Non-linear loads like VSDs and LED drivers may have good displacement pf but poor distortion pf due to harmonics.',
  },
  {
    question: 'How is reactive power billed by UK DNOs?',
    answer:
      'UK DNOs typically allow reactive power consumption up to a certain percentage of active power (often equivalent to 0.90 pf). Consumption above this threshold is charged per kVArh, with rates varying by DNO and time of use. Half-hourly metered sites face the most significant charges, making power factor correction economically attractive.',
  },
  {
    question: 'Why do transformers have poor power factor at light load?',
    answer:
      'Transformers draw magnetising current to maintain the magnetic field in the core regardless of load. At light load, this reactive magnetising current is a large proportion of total current, resulting in poor power factor. At full load, the resistive load current dominates and pf improves typically to 0.85-0.95.',
  },
];

const HNCModule3Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 4"
            title="Power Factor - Causes and Effects on Systems"
            description="Understanding how reactive loads affect power delivery, efficiency, and costs in building services installations"
            tone="purple"
          />

          <TLDR
            points={[
              'You can distinguish real power P (W), reactive power Q (VAr) and apparent power S (VA) and assemble them into the power triangle: S² = P² + Q².',
              'You can compute power factor PF = P / S = cosφ and explain why an inductive motor load gives a lagging PF.',
              'You can identify the three big offenders for poor PF on a building: induction motors at part load, magnetic ballasts (legacy lighting), uncorrected LED drivers without active PFC.',
              'You can quantify the cost of poor PF — oversized cable, oversized transformer, increased I²R losses, utility kVA penalty (typically applied above 100 kVA maximum demand).',
              'You can spot the difference between displacement PF (fundamental phase shift) and true PF (which includes harmonic distortion) on modern non-linear loads.',
            ]}
          />

          <RegsCallout
            source="BS EN 61000-3-2 — Limits for harmonic current emissions (equipment input current ≤ 16 A per phase)"
            clause="Class C equipment (lighting equipment) with active input power > 25 W shall comply with the harmonic current limits expressed as a percentage of the fundamental input current, including a third-harmonic limit of 30 % × PF (circle) and individual limits on each higher order."
            meaning={
              <>
                Modern LED drivers and switching power supplies must build active PFC into
                the input stage to comply with BS EN 61000-3-2. The standard is the reason an
                LED-retrofit office no longer needs the same scale of bulk PFC banks that
                fluorescent installations did — but it also means “true” PF on the supply
                now includes harmonic content, not just the fundamental phase shift.
              </>
            }
            cite="Source: BS EN 61000-3-2 (latest edition); IEEE 519 voltage / current distortion limits."
          />

          <LearningOutcomes
            outcomes={[
              'Define true, reactive and apparent power with correct units',
              'Calculate power factor from the power triangle relationship',
              'Distinguish between leading and lagging power factor',
              'Identify causes of poor power factor in building services',
              'Quantify effects on current, cable losses and voltage drop',
              'Understand UK DNO reactive power charging mechanisms',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Power factor is how effectively a circuit converts current into useful work; reactive loads waste capacity."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>True power (P):</strong> Watts - actual work done
              </li>
              <li>
                <strong>Reactive power (Q):</strong> VAr - oscillates, does no work
              </li>
              <li>
                <strong>Apparent power (S):</strong> VA - total power supplied
              </li>
              <li>
                <strong>Power factor:</strong> pf = P/S = cos φ (0 to 1)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Impact</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motors:</strong> Largest cause of poor pf in buildings
              </li>
              <li>
                <strong>Cables:</strong> Larger sizes needed for same kW
              </li>
              <li>
                <strong>Transformers:</strong> Must be rated for kVA, not kW
              </li>
              <li>
                <strong>DNO charges:</strong> Penalties below 0.90 pf
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="True, Reactive and Apparent Power">
            <p>
              In AC circuits with reactive components, the power relationships become more complex
              than simple P = VI. Three distinct power quantities must be understood to properly
              analyse and design electrical systems.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Three Power Types</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>True Power (P) - Watts:</strong> Also called active or real power. This is the power that actually does useful work - turning motors, producing heat, or generating light. Measured in Watts (W) or kilowatts (kW). This is what you pay for on your electricity bill (kWh consumption). P = V × I × cos φ
              </li>
              <li>
                <strong>Reactive Power (Q) - Volt-Amperes Reactive:</strong> Power that oscillates between the source and the load, doing no useful work. Required to establish magnetic fields in motors and transformers. Measured in VAr or kVAr. Though it does no work, it still requires current to flow, increasing conductor loading. Q = V × I × sin φ
              </li>
              <li>
                <strong>Apparent Power (S) - Volt-Amperes:</strong> The total power that must be supplied by the source - the vector sum of true and reactive power. Measured in VA or kVA. Transformers, generators and cables must be rated for apparent power, not just true power. This is why poor power factor requires larger equipment. S = V × I (total current)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Power Relationships</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>True power (P):</strong> Unit W, kW. Single-phase: V × I × cos φ. Three-phase: √3 × VL × IL × cos φ
              </li>
              <li>
                <strong>Reactive power (Q):</strong> Unit VAr, kVAr. Single-phase: V × I × sin φ. Three-phase: √3 × VL × IL × sin φ
              </li>
              <li>
                <strong>Apparent power (S):</strong> Unit VA, kVA. Single-phase: V × I. Three-phase: √3 × VL × IL
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key relationship:</strong> S² = P² + Q² — apparent power is the hypotenuse of
              the power triangle.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Power Factor and the Power Triangle">
            <p>
              Power factor is the ratio of true power to apparent power, indicating how effectively
              current is being converted to useful work. It ranges from 0 (purely reactive) to 1
              (purely resistive, also called unity).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Power Factor Definition</p>
            <p>
              <strong>pf = P / S = cos φ</strong> — Where φ is the phase angle between voltage and current
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Power Triangle</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Horizontal: P (kW)</strong> — True power, work done
              </li>
              <li>
                <strong>Vertical: Q (kVAr)</strong> — Reactive power, oscillating
              </li>
              <li>
                <strong>Hypotenuse: S (kVA)</strong> — Apparent power, total supplied
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Power Triangle Relationships</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>S² = P² + Q²</strong> — Pythagorean
              </li>
              <li>
                <strong>pf = P / S</strong> — Power factor
              </li>
              <li>
                <strong>cos φ = P / S</strong> — From triangle
              </li>
              <li>
                <strong>tan φ = Q / P</strong> — Q from P and φ
              </li>
            </ul>
            <p className="text-sm font-medium text-white">Leading vs Lagging Power Factor</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lagging Power Factor:</strong> Current lags voltage (inductive). Caused by
                motors, transformers, reactors. Most common in building services. Q is positive
                (consuming VAr).
              </li>
              <li>
                <strong>Leading Power Factor:</strong> Current leads voltage (capacitive). Caused
                by capacitors, over-excited synchronous motors. Used for power factor correction.
                Q is negative (generating VAr).
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Convention:</strong> Always state whether power factor is leading or lagging -
              "0.85 lagging" for motors, "0.95 leading" would indicate over-correction.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Causes of Poor Power Factor in Building Services">
            <p>
              Poor power factor in building services is predominantly caused by inductive loads -
              equipment that requires magnetic fields to operate. Understanding the specific causes
              helps target correction measures.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Typical Power Factors of Building Services Equipment
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Induction motors (unloaded):</strong> 0.30 - 0.40 lagging — Worst case, avoid running unloaded
              </li>
              <li>
                <strong>Induction motors (50% load):</strong> 0.70 - 0.80 lagging — Common operating condition
              </li>
              <li>
                <strong>Induction motors (full load):</strong> 0.85 - 0.90 lagging — Best motor pf but still requires correction
              </li>
              <li>
                <strong>Transformers (light load):</strong> 0.50 - 0.70 lagging — Magnetising current dominates
              </li>
              <li>
                <strong>Transformers (full load):</strong> 0.85 - 0.95 lagging — Load current improves pf
              </li>
              <li>
                <strong>Fluorescent (magnetic ballast):</strong> 0.50 - 0.60 lagging — Legacy equipment, replace with LED
              </li>
              <li>
                <strong>Fluorescent (HF electronic):</strong> 0.95+ near unity — Built-in pf correction
              </li>
              <li>
                <strong>LED luminaires (quality drivers):</strong> 0.90 - 0.98 near unity — Varies by manufacturer
              </li>
              <li>
                <strong>Resistance heaters:</strong> 1.00 unity — Purely resistive, no reactive component
              </li>
              <li>
                <strong>Modern VSDs:</strong> 0.95+ near unity — Active front end with pf correction
              </li>
              <li>
                <strong>Welding equipment:</strong> 0.50 - 0.70 lagging — Transformer-based
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Primary Causes in Buildings</p>
            <p className="text-sm font-medium text-white">HVAC Systems</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>AHU fan motors (often 50-70% loaded)</li>
              <li>Chiller compressor motors</li>
              <li>Pump motors for CHW/condenser water</li>
              <li>Cooling tower fan motors</li>
              <li>FCU fan motors throughout building</li>
            </ul>
            <p className="text-sm font-medium text-white">Other Building Loads</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lift motors (highly variable loading)</li>
              <li>Escalator drives</li>
              <li>Distribution transformers</li>
              <li>Legacy discharge lighting</li>
              <li>UPS systems (varies by type)</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Motor loading significantly affects power factor - a motor
              running at 25% load may have pf of 0.55, while the same motor at 100% load achieves
              0.88. Right-sizing motors is essential.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Effects on Electrical Systems and DNO Requirements">
            <p>
              Poor power factor has significant technical and commercial consequences for building
              electrical systems. The effects compound throughout the installation from individual
              circuits to the DNO connection.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Technical Effects</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Increased Current:</strong> For the same real power (kW), poor pf requires higher current. Current increases by factor 1/pf. At 0.7 pf: 1.43× higher than unity. At 0.8 pf: 1.25× higher. At 0.9 pf: 1.11× higher.
              </li>
              <li>
                <strong>Increased Cable Losses (I²R):</strong> Power loss in conductors is proportional to current squared. At 0.7 pf: losses 2.04× higher. At 0.8 pf: 1.56× higher. At 0.9 pf: 1.23× higher. This wasted energy appears as heat in cables, transformers and switchgear.
              </li>
              <li>
                <strong>Increased Voltage Drop:</strong> Higher current causes proportionally greater voltage drop along cables (Vd = I × R × L × 2). May require larger cables to meet the 5% voltage drop limit for power circuits.
              </li>
              <li>
                <strong>Oversized Equipment Required:</strong> Transformers, generators, cables and switchgear must be rated for apparent power (kVA). A 100kW load at 0.7 pf requires 143kVA capacity - 43% larger than at unity pf.
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">DNO Requirements and Charges</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Minimum power factor:</strong> 0.90 lagging or better — Below this, reactive charges apply
              </li>
              <li>
                <strong>Reactive power charge:</strong> p/kVArh (varies by DNO) — Charged on excess kVArh above 0.90 pf equivalent
              </li>
              <li>
                <strong>Maximum demand charge:</strong> Based on kVA not kW — Poor pf increases MD charges
              </li>
              <li>
                <strong>Connection agreement:</strong> May specify pf requirement — Breach may result in penalty or disconnection
              </li>
              <li>
                <strong>Measurement:</strong> Half-hourly metering — kWh and kVArh recorded for each HH period
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Commercial Impact Example</p>
            <p>
              A 500kW commercial building at 0.75 pf draws 667kVA apparent power. This requires:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>33% larger transformer capacity (667kVA vs 500kVA at unity)</li>
              <li>78% higher I²R losses in all distribution cables</li>
              <li>Reactive power charges on 441kVArh per hour of operation</li>
              <li>Higher maximum demand charges based on kVA reading</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Target:</strong> Most installations should aim for 0.95 lagging power factor,
              providing margin above the 0.90 penalty threshold while avoiding over-correction to
              leading pf.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Power Triangle Calculation</p>
            <p>
              <strong>Question:</strong> A three-phase motor draws 45kW at 0.82 power factor
              lagging. Calculate the reactive power (Q) and apparent power (S).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: P = 45kW, pf = cos φ = 0.82</li>
              <li>Step 1: Find apparent power</li>
              <li>S = P / pf = 45 / 0.82 = <strong>54.9kVA</strong></li>
              <li>Step 2: Find phase angle</li>
              <li>φ = cos⁻¹(0.82) = 34.9°</li>
              <li>Step 3: Find reactive power</li>
              <li>Q = S × sin φ = 54.9 × sin(34.9°) = 54.9 × 0.572</li>
              <li>Q = <strong>31.4kVAr</strong></li>
              <li>Check: S² = P² + Q² → 54.9² = 45² + 31.4² → 3014 ≈ 2025 + 986 ✓</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: Current Comparison at Different Power Factors</p>
            <p>
              <strong>Question:</strong> A 30kW three-phase load operates at 400V. Compare the
              line current at (a) unity pf, (b) 0.85 pf, and (c) 0.70 pf.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using: I = P / (√3 × V × pf)</li>
              <li>(a) At unity pf (1.0): I = 30000 / (1.732 × 400 × 1.0) = <strong>43.3A</strong></li>
              <li>(b) At 0.85 pf: I = 30000 / (1.732 × 400 × 0.85) = <strong>50.9A</strong> (18% increase)</li>
              <li>(c) At 0.70 pf: I = 30000 / (1.732 × 400 × 0.70) = <strong>61.9A</strong> (43% increase)</li>
              <li>At 0.70 pf, current is 43% higher, losses are 104% higher (2.04×)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: Transformer Sizing</p>
            <p>
              <strong>Question:</strong> A building has 200kW of load at 0.75 pf and 100kW of
              resistive heating. What transformer kVA rating is required?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Heating load (unity pf)</li>
              <li>S₁ = P₁ / pf = 100 / 1.0 = 100kVA</li>
              <li>Q₁ = 0kVAr (resistive)</li>
              <li>Step 2: Motor/inductive load</li>
              <li>S₂ = P₂ / pf = 200 / 0.75 = 266.7kVA</li>
              <li>Q₂ = √(S₂² - P₂²) = √(266.7² - 200²) = 176.8kVAr</li>
              <li>Step 3: Total power</li>
              <li>P_total = 100 + 200 = 300kW</li>
              <li>Q_total = 0 + 176.8 = 176.8kVAr</li>
              <li>Step 4: Total apparent power</li>
              <li>S_total = √(300² + 176.8²) = √(90000 + 31258)</li>
              <li>S_total = √121258 = <strong>348.2kVA</strong></li>
              <li>Combined pf = 300/348.2 = 0.86 lagging</li>
              <li>→ Select 400kVA transformer (next standard size)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 4: DNO Reactive Power Charges</p>
            <p>
              <strong>Question:</strong> A factory operates at 150kW average load, 0.78 pf, for
              2000 hours per year. If the DNO charges 0.45p/kVArh for reactive power above 0.90 pf
              equivalent, calculate the annual reactive charge.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Actual reactive power at 0.78 pf</li>
              <li>S = 150/0.78 = 192.3kVA</li>
              <li>Q_actual = √(192.3² - 150²) = 120.4kVAr</li>
              <li>Step 2: Allowable reactive power at 0.90 pf</li>
              <li>S_allowed = 150/0.90 = 166.7kVA</li>
              <li>Q_allowed = √(166.7² - 150²) = 72.6kVAr</li>
              <li>Step 3: Excess reactive power</li>
              <li>Q_excess = 120.4 - 72.6 = 47.8kVAr</li>
              <li>Step 4: Annual excess kVArh</li>
              <li>Annual kVArh = 47.8 × 2000 = 95,600 kVArh</li>
              <li>Step 5: Annual charge</li>
              <li>Charge = 95,600 × 0.45p = <strong>43,020p = £430.20</strong></li>
              <li>This does not include additional losses and MD charges - total savings from pf correction would be significantly higher</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>pf = P/S = cos φ</strong> — Power factor definition</li>
              <li><strong>S² = P² + Q²</strong> — Power triangle (Pythagoras)</li>
              <li><strong>P = V × I × cos φ</strong> — True power (single-phase)</li>
              <li><strong>Q = V × I × sin φ</strong> — Reactive power (single-phase)</li>
              <li><strong>P = √3 × VL × IL × cos φ</strong> — True power (three-phase)</li>
              <li><strong>I₂/I₁ = pf₁/pf₂</strong> — Current ratio at different power factors</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DNO penalty threshold: typically <strong>0.90 lagging</strong></li>
              <li>Target power factor: <strong>0.95 lagging</strong></li>
              <li>Induction motor (full load): <strong>0.85-0.90</strong></li>
              <li>Induction motor (no load): <strong>0.30-0.40</strong></li>
              <li>Modern LED drivers: <strong>0.90-0.98</strong></li>
              <li>Resistance heaters: <strong>1.00 (unity)</strong></li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Impact Reference</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1.00 (unity):</strong> Current 0%, Loss 0%, kVA for 100kW = 100kVA</li>
              <li><strong>0.95:</strong> Current +5%, Loss +11%, kVA for 100kW = 105kVA</li>
              <li><strong>0.90:</strong> Current +11%, Loss +23%, kVA for 100kW = 111kVA</li>
              <li><strong>0.85:</strong> Current +18%, Loss +38%, kVA for 100kW = 118kVA</li>
              <li><strong>0.80:</strong> Current +25%, Loss +56%, kVA for 100kW = 125kVA</li>
              <li><strong>0.70:</strong> Current +43%, Loss +104%, kVA for 100kW = 143kVA</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common power factor mistakes"
            whatHappens={
              <>
                Confusing P (kW) and S (kVA) when sizing transformers and cables. Forgetting to
                state lagging or leading. Adding kVA values directly instead of using vector
                addition (P and Q separately). Ignoring how lightly loaded motors have much worse
                pf. Over-correcting with too much capacitance, leading to resonance and voltage
                issues.
              </>
            }
            doInstead={
              <>
                Always size transformers and cables on kVA, not kW. State direction (lagging or
                leading) every time. Sum P and Q separately, then compute resultant S. Check motor
                loading - right-size motors. Aim for 0.95 lagging, not unity, to avoid leading pf.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Investigating an unexpected utility PF penalty on an office building"
            situation={
              <>
                The facilities manager has flagged a £850-per-month “reactive power”
                charge on the latest electricity bill. The building is an LED-lit office with
                two 30 kW chiller compressors and a large AHU bank. Average maximum demand
                is 220 kVA, average true power 175 kW — PF = 175 / 220 = 0.795 lagging.
              </>
            }
            whatToDo={
              <>
                Walk the switchroom: identify whether the existing PFC bank (if any) is
                online, that capacitors are still healthy (no swollen cans, fuses intact)
                and that contactors are switching as expected. Map total reactive demand:
                Q = √(S² − P²) = √(220² − 175²) ≈ 133 kVAr.
                Size new or supplementary PFC: Q_C = P × (tanφ₁ − tanφ₂) =
                175 × (0.762 − 0.329) ≈ 76 kVAr to lift PF from 0.795 to 0.95.
                Specify a stepped capacitor bank (typically 5 × 15 kVAr or
                detuned/harmonic-filtered if non-linear load is significant) to BS EN 61921.
                Pay-back is usually under 18 months purely on the avoided penalty.
              </>
            }
            whyItMatters={
              <>
                Power factor is a direct line on the utility bill — fix it and the saving
                is real, repeatable and easy to quantify in the energy strategy. As the HNC
                engineer, you are the one who sizes the bank, picks the standard and signs
                off the install — the maths in this section is what gets that done.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Real power P (W) = work done. Reactive power Q (VAr) = energy stored and returned each cycle. Apparent power S (VA) = the supply has to provide both.',
              'Power triangle: S² = P² + Q². Phase angle φ sits between S (hypotenuse) and P (adjacent).',
              'Power factor: PF = cosφ = P / S. PF = 1 means perfectly resistive. PF < 1 means reactive content the supply has to carry.',
              'Lagging PF = inductive (motors, transformers, magnetic ballasts). Leading PF = capacitive (over-corrected installations, long lightly loaded cables).',
              'Cost of poor PF: oversized cable, oversized transformer, higher I²R losses, and a direct utility kVA / kVAr penalty (typically above 100 kVA MD).',
              'PFC sizing: Q_C = P × (tanφ₁ − tanφ₂). Common target PF 0.95 — do not over-correct into leading PF.',
              'BS EN 61000-3-2 makes modern LED drivers and switching supplies do their own active PFC — the bulk PFC bank story has moved from lighting to motors and chillers.',
              'True PF includes harmonic distortion. If significant non-linear load is present (VFDs, LED drivers), use a detuned or harmonic-filtered capacitor bank (BS EN 61921) instead of plain capacitors.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Phase Angle and Phasor Diagrams
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2.5
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section2_4;
