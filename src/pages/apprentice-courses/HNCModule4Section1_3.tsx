/**
 * Module 4 · Section 1 · Subsection 3 — Power Factor Considerations
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Real / reactive / apparent power, lagging vs leading PF, DNO 0.95 minimum, and how
 *   to size capacitor banks (fixed and automatic) so the building hits its target PF
 *   without over-correcting and pushing voltage up.
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

const TITLE = 'Power Factor Considerations - HNC Module 4 Section 1.3';
const DESCRIPTION =
  'Master power factor in building services design: reactive power impact, DNO requirements, power factor correction sizing, and supply capacity implications.';

const quickCheckQuestions = [
  {
    id: 'pf-definition',
    question: 'Power factor is the ratio of:',
    options: [
      'BS EN 60309-2 (commando/CEE) socket',
      'Up to 90% or higher heat recovery',
      'DC does not produce a changing magnetic flux',
      'Real power (kW) to apparent power (kVA)',
    ],
    correctIndex: 3,
    explanation:
      'Power factor = kW/kVA = cos φ. It represents how effectively electrical power is being converted to useful work output.',
  },
  {
    id: 'low-pf-effect',
    question: 'A low power factor (e.g., 0.7) means:',
    options: [
      'Higher current for the same kW load',
      'Lower current for the same kW load',
      'Higher real power consumption',
      'Better energy efficiency',
    ],
    correctIndex: 0,
    explanation:
      'Low power factor means higher current flows for the same real power (kW). This increases cable losses, requires larger infrastructure, and may incur DNO penalties.',
  },
  {
    id: 'pf-correction',
    question: 'Power factor correction capacitors work by:',
    options: [
      'Reducing real power consumption',
      'Increasing supply voltage',
      'Supplying reactive power locally',
      'Reducing harmonic distortion',
    ],
    correctIndex: 2,
    explanation:
      'Capacitors supply leading reactive power (kVAr) locally, offsetting the lagging reactive power drawn by inductive loads like motors, reducing the reactive power drawn from supply.',
  },
  {
    id: 'dno-requirement',
    question: 'UK DNOs typically require power factor to be at least:',
    options: [
      '0.70',
      '0.80',
      '0.95',
      '0.85',
    ],
    correctIndex: 2,
    explanation:
      'UK DNOs require power factor of 0.95 or better at the point of supply. Failure to meet this may result in reactive power charges or requirement to install correction.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What causes a lagging power factor in building services?',
    options: [
      'The test current passes through earth causing imbalance',
      'Inductive loads such as motors and transformers',
      'Measure end-to-end resistance of each conductor (L, N, E)',
      'Enabling - provides framework for regulations',
    ],
    correctAnswer: 1,
    explanation:
      'Inductive loads (motors, transformers, fluorescent ballasts) draw lagging reactive current, causing a lagging power factor. The magnetic fields require reactive power to establish.',
  },
  {
    id: 2,
    question: 'A building draws 200kW at 0.8 power factor. What is the apparent power (kVA)?',
    options: [
      '280 kVA',
      '160 kVA',
      '250 kVA',
      '200 kVA',
    ],
    correctAnswer: 2,
    explanation:
      'kVA = kW ÷ power factor = 200 ÷ 0.8 = 250 kVA. The building requires 250 kVA supply capacity despite only using 200kW.',
  },
  {
    id: 3,
    question: 'What is reactive power?',
    options: [
      'Measure multiple parameters: V, I, kW, kVA, kVAr, PF, harmonics',
      'To take reasonable care of themselves and others affected by their actions',
      'To capture system performance data over time for analysis and verification',
      'Power that oscillates between source and load without doing work',
    ],
    correctAnswer: 3,
    explanation:
      "Reactive power (kVAr) is power that oscillates between the source and the reactive components (inductors, capacitors) in the load. It doesn't perform useful work but still loads the supply.",
  },
  {
    id: 4,
    question:
      'If power factor improves from 0.8 to 0.95, the current drawn (for same kW) reduces by:',
    options: [
      'About 16%',
      'About 10%',
      'About 5%',
      'About 25%',
    ],
    correctAnswer: 0,
    explanation:
      'Current ratio = pf1/pf2 = 0.8/0.95 = 0.84, so current reduces to 84% of original. This is a 16% reduction in current for the same real power.',
  },
  {
    id: 5,
    question: 'Where should power factor correction capacitors ideally be installed?',
    options: [
      'To prevent insulation damage on sharp edges',
      'As close to the inductive loads as practical',
      '24 hours maximum as per BS 5266-1',
      'An ID card confirming qualifications and competence',
    ],
    correctAnswer: 1,
    explanation:
      'Capacitors are most effective close to inductive loads, reducing reactive current throughout the distribution system. However, practical considerations (cost, maintenance) often mean correction at DB level or main incomer.',
  },
  {
    id: 6,
    question: 'What is the power factor triangle relationship?',
    options: [
      'kVAr² = kW² + kVA²',
      'kW² = kVA² + kVAr²',
      'kVA² = kW² + kVAr²',
      'kW = kVA × kVAr',
    ],
    correctAnswer: 2,
    explanation:
      'The power triangle shows: kVA² = kW² + kVAr². Apparent power (kVA) is the vector sum of real power (kW) and reactive power (kVAr).',
  },
  {
    id: 7,
    question: 'Why might automatic power factor correction be needed?',
    options: [
      'Power stored and returned by inductors and capacitors',
      'Kinetic (water) → mechanical (turbine/generator) → electrical',
      'Verify the generator is isolated and cannot start automatically',
      'To handle variable loads that change power factor',
    ],
    correctAnswer: 3,
    explanation:
      'Automatic PFC systems switch capacitor banks in and out as load varies, maintaining target power factor. Fixed correction can lead to over-correction (leading pf) at low loads.',
  },
  {
    id: 8,
    question: 'What is the effect of over-correction (power factor > 1.0 leading)?',
    options: [
      'Voltage rise at the point of connection',
      'Load requirements and current demand',
      'They can lock clients into using a single vendor',
      'The condenser outlet (liquid line)',
    ],
    correctAnswer: 0,
    explanation:
      'Over-correction creates leading power factor which can cause voltage rise, potentially exceeding supply voltage limits. This can damage equipment and is penalised by some DNOs.',
  },
  {
    id: 9,
    question: 'A motor draws 50kW at 0.75 pf lagging. What kVAr correction brings this to 0.95 pf?',
    options: [
      '22 kVAr',
      '28 kVAr',
      '33 kVAr',
      '44 kVAr',
    ],
    correctAnswer: 1,
    explanation:
      'At 0.75 pf: kVAr = 50 × tan(cos⁻¹0.75) = 50 × 0.882 = 44.1 kVAr. At 0.95 pf: kVAr = 50 × tan(cos⁻¹0.95) = 50 × 0.329 = 16.4 kVAr. Correction needed = 44.1 - 16.4 = 27.7 ≈ 28 kVAr',
  },
  {
    id: 10,
    question: 'Why is power factor particularly important for DNO supply capacity?',
    options: [
      'It affects the colour of supply cables',
      'It affects the supply frequency',
      'DNO transformers and cables are rated in kVA, not kW',
      'It determines the electricity tariff rate',
    ],
    correctAnswer: 2,
    explanation:
      'DNO infrastructure (transformers, cables) is rated by current-carrying capacity, which relates to kVA not kW. Poor power factor uses more of this capacity for the same useful power.',
  },
];

const faqs = [
  {
    question: 'What is the difference between leading and lagging power factor?',
    answer:
      'Lagging power factor (most common) is caused by inductive loads like motors - current lags behind voltage. Leading power factor is caused by capacitive loads or over-correction - current leads voltage. DNOs penalise both extremes; target is typically 0.95-1.0 lagging.',
  },
  {
    question: 'Do modern LED lights affect power factor?',
    answer:
      'LED drivers can have poor power factor (0.5-0.7) without built-in correction. Quality LED luminaires include power factor correction circuits achieving 0.9+. When specifying LED lighting, always check the power factor specification - it significantly affects circuit sizing.',
  },
  {
    question: 'How do variable speed drives (VSDs) affect power factor?',
    answer:
      'VSDs typically have good displacement power factor (close to unity) because they draw current in phase with voltage. However, they create harmonic currents which reduce the true power factor. Modern VSDs with active front ends can achieve near-unity true power factor.',
  },
  {
    question: 'When should I use automatic vs fixed power factor correction?',
    answer:
      'Fixed correction suits loads with consistent power factor (large constant motors). Automatic correction suits variable loads where power factor changes with demand. Most commercial buildings need automatic systems due to varying occupancy and load patterns.',
  },
  {
    question: 'What size capacitor bank do I need?',
    answer:
      'Calculate existing kVAr from kW and current power factor, then target kVAr at 0.95 pf. Correction needed = existing kVAr - target kVAr. Size automatic banks with 10-15% margin and appropriate step sizes for smooth regulation.',
  },
  {
    question: 'Can power factor correction reduce my electricity bills?',
    answer:
      'Yes, in three ways: (1) Avoiding reactive power charges if your DNO applies them, (2) Reducing maximum demand charges as kVA reduces, (3) Reducing I²R losses in your distribution system. Payback periods of 1-3 years are typical for well-designed PFC systems.',
  },
];

const HNCModule4Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 3"
            title="Power Factor Considerations"
            description="Understanding reactive power and power factor correction in building services electrical design."
            tone="purple"
          />

          <TLDR
            points={[
              'Power factor (cos φ = kW/kVA) is the ratio of useful real power to total apparent power — every kVAr of reactive load uses DNO capacity but does no work.',
              'UK DNOs typically require ≥ 0.95 lagging at the point of supply. Below that triggers reactive-energy (kVArh) charges and may need PFC plant retro-fitted at your client&rsquo;s cost.',
              'Inductive loads (motors, transformers, magnetic ballasts) lag; capacitive over-correction leads — both are penalised. Target 0.95 lagging, never unity.',
              'PFC capacitor sizing: kVAr_required = kW × (tan φ₁ − tan φ₂). Use detuned reactors where the load mix includes VSDs or significant non-linear load.',
              'BS 7671 Reg 132.1 makes economic and reliable design a duty — leaving a building at 0.7 pf wastes 43% of the supply capacity and is a defendable design failure.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 132.1 (Design objectives)"
            clause="The electrical installation shall be designed by one or more skilled persons to provide for: (a) the protection of persons, livestock and property in accordance with Section 131; and (b) the proper functioning of the electrical installation for the intended use."
            meaning={
              <>
                Reg 132.1 is the &lsquo;design competence&rsquo; clause. As the HNC engineer, the
                proper-functioning duty under (b) covers economic and reliable operation —
                leaving a building running at 0.7 power factor wastes DNO capacity, oversizes
                cables and switchgear and exposes the client to reactive-energy charges. Power
                factor correction is a design decision, not an afterthought, and your sign-off
                under 132.1 carries the responsibility.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 132.1; ENA Engineering Recommendation P29; DNO connection agreements."
          />

          <LearningOutcomes
            outcomes={[
              'Define power factor and distinguish between leading and lagging',
              'Calculate apparent power, real power, and reactive power',
              'Understand the impact of poor power factor on supply capacity',
              'Apply DNO requirements for power factor at point of supply',
              'Size power factor correction capacitor banks',
              'Select between fixed and automatic PFC systems',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Power Factor Fundamentals">
            <p>
              Power factor is one of the most important parameters in electrical system design,
              affecting everything from cable sizing to electricity costs. Understanding power
              factor is essential for efficient building services design.
            </p>
            <p>
              <strong>The power triangle:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>kW (real power)</strong> — does useful work
              </li>
              <li>
                <strong>kVAr (reactive power)</strong> — establishes magnetic fields
              </li>
              <li>
                <strong>kVA (apparent power)</strong> — total supplied
              </li>
              <li>kVA² = kW² + kVAr², and pf = kW / kVA = cos φ</li>
            </ul>
            <p>
              <strong>Key relationships:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Power factor:</strong> pf = cos φ = kW ÷ kVA
              </li>
              <li>
                <strong>Apparent power:</strong> kVA = √(kW² + kVAr²)
              </li>
              <li>
                <strong>Reactive power:</strong> kVAr = kW × tan φ
              </li>
              <li>
                <strong>Current:</strong> I = kVA ÷ (√3 × kV) for three-phase
              </li>
            </ul>
            <p>
              <strong>Power factor values by load type:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Resistive heaters:</strong> 1.0 (unity)
              </li>
              <li>
                <strong>Incandescent lighting:</strong> 1.0 (unity)
              </li>
              <li>
                <strong>Induction motors (loaded):</strong> 0.80-0.90 lagging
              </li>
              <li>
                <strong>Induction motors (light load):</strong> 0.50-0.70 lagging
              </li>
              <li>
                <strong>Fluorescent (magnetic ballast):</strong> 0.50-0.60 lagging
              </li>
              <li>
                <strong>LED (with PFC):</strong> 0.90-0.98 near unity
              </li>
              <li>
                <strong>VSD (6-pulse):</strong> 0.95 near unity (displacement pf good, but harmonic
                distortion affects true pf)
              </li>
            </ul>
            <p>
              <strong>Remember:</strong> Power factor of 0.8 means 80% of apparent power does useful
              work; 20% is reactive, circulating but not working.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Impact on Supply Capacity">
            <p>
              Poor power factor has significant practical and financial implications. DNO
              infrastructure is rated by current-carrying capacity, which means poor power factor
              uses more of the available supply capacity for the same useful power.
            </p>
            <p>
              <strong>Impact of poor power factor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher current for same kW → larger cables needed</li>
              <li>More supply capacity used → larger transformer required</li>
              <li>Increased I²R losses → higher running costs</li>
              <li>DNO penalties → reactive power charges</li>
              <li>Reduced system capacity → less spare for growth</li>
            </ul>
            <p>
              <strong>Current increase due to poor power factor (100kW reference, 400V 3φ):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>pf 1.00 → 100 kVA / 144A — reference</li>
              <li>pf 0.95 → 105 kVA / 152A — +5%</li>
              <li>pf 0.90 → 111 kVA / 160A — +11%</li>
              <li>pf 0.85 → 118 kVA / 170A — +18%</li>
              <li>pf 0.80 → 125 kVA / 180A — +25%</li>
              <li>pf 0.70 → 143 kVA / 206A — +43%</li>
            </ul>
            <p>
              <strong>Design impact:</strong> A building at 0.7 pf needs 43% more supply capacity
              than one at unity pf for the same useful power.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="DNO Requirements">
            <p>
              UK Distribution Network Operators require customers to maintain adequate power factor
              at the point of supply. This is both a technical requirement (network capacity) and a
              commercial requirement (connection agreement).
            </p>
            <p>
              <strong>DNO power factor requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Minimum requirement:</strong> 0.95 lagging typical
              </li>
              <li>
                <strong>Specified in:</strong> Connection agreement terms
              </li>
              <li>
                <strong>Measurement point:</strong> At the point of supply (meter)
              </li>
              <li>
                <strong>Penalty:</strong> Reactive power charges (kVArh)
              </li>
              <li>
                <strong>Leading pf:</strong> Also penalised (causes voltage rise)
              </li>
            </ul>
            <p>
              <strong>Reactive power charges:</strong> DNOs may apply charges for excessive reactive
              power consumption.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Typically applied when pf falls below 0.95</li>
              <li>Charged per kVArh (reactive energy)</li>
              <li>Can be significant for industrial loads</li>
              <li>Some suppliers include in maximum demand charges</li>
            </ul>
            <p>
              <strong>Connection agreement implications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>≥0.95 lagging</strong> — compliant, no action required
              </li>
              <li>
                <strong>0.90-0.95 lagging</strong> — reactive charges may apply
              </li>
              <li>
                <strong>&lt;0.90 lagging</strong> — PFC required, significant charges
              </li>
              <li>
                <strong>Leading (capacitive)</strong> — voltage issues, charges possible
              </li>
            </ul>
            <p>
              <strong>Note:</strong> Check with your local DNO for specific requirements — these
              vary between operators and may change.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Power Factor Correction Sizing">
            <p>
              Power factor correction uses capacitors to supply reactive power locally, reducing the
              reactive power drawn from the supply. Correct sizing ensures target power factor is
              achieved without over-correction.
            </p>
            <p>
              <strong>PFC sizing formula:</strong> kVAr required = kW × (tan φ₁ - tan φ₂), where φ₁
              = original angle and φ₂ = target angle.
            </p>
            <p>
              <strong>kVAr multipliers (kVAr per kW) — original pf → target pf:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0.65 → 0.90 = 0.685 / → 0.95 = 0.840 / → 1.00 = 1.169</li>
              <li>0.70 → 0.90 = 0.536 / → 0.95 = 0.691 / → 1.00 = 1.020</li>
              <li>0.75 → 0.90 = 0.398 / → 0.95 = 0.553 / → 1.00 = 0.882</li>
              <li>0.80 → 0.90 = 0.266 / → 0.95 = 0.421 / → 1.00 = 0.750</li>
              <li>0.85 → 0.90 = 0.140 / → 0.95 = 0.291 / → 1.00 = 0.620</li>
              <li>0.90 → 0.95 = 0.155 / → 1.00 = 0.484</li>
              <li>Example: 200kW at 0.75 pf → 0.95 pf needs 200 × 0.553 = 110.6 kVAr</li>
            </ul>
            <p>
              <strong>Fixed PFC:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single capacitor or fixed bank</li>
              <li>Suits constant loads</li>
              <li>Lower cost, simpler</li>
              <li>Risk of over-correction at low load</li>
            </ul>
            <p>
              <strong>Automatic PFC:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Controller switches capacitor steps</li>
              <li>Maintains target pf under varying load</li>
              <li>Higher initial cost</li>
              <li>Essential for variable loads</li>
            </ul>
            <p>
              <strong>Design tip:</strong> Size automatic banks to 110-115% of calculated kVAr to
              allow for load growth and measurement tolerance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — power factor calculation:</strong> A building draws 300A at 400V
              three-phase. Real power measured is 160kW. Calculate power factor.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Apparent power: S = √3 × V × I</li>
              <li>S = 1.732 × 400 × 300 = 207.8 kVA</li>
              <li>Power factor: pf = kW / kVA</li>
              <li>
                pf = 160 / 207.8 = <strong>0.77 lagging</strong>
              </li>
              <li>Below 0.95 requirement — PFC needed</li>
            </ul>
            <p>
              <strong>Example 2 — PFC sizing:</strong> The 160kW load at 0.77 pf needs correction to
              0.95. Calculate capacitor bank size.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Original angle: φ₁ = cos⁻¹(0.77) = 39.6°</li>
              <li>Target angle: φ₂ = cos⁻¹(0.95) = 18.2°</li>
              <li>kVAr = kW × (tan φ₁ - tan φ₂)</li>
              <li>kVAr = 160 × (tan 39.6° - tan 18.2°)</li>
              <li>kVAr = 160 × (0.828 - 0.329)</li>
              <li>
                kVAr = 160 × 0.499 = <strong>79.8 kVAr</strong>
              </li>
              <li>Specify 80-90 kVAr automatic bank</li>
            </ul>
            <p>
              <strong>Example 3 — current reduction:</strong> After PFC, power factor improves from
              0.77 to 0.95. What is the new current?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Original: S₁ = 160 / 0.77 = 207.8 kVA</li>
              <li>Original current: 207.8 × 1000 / (√3 × 400) = 300A</li>
              <li>After PFC: S₂ = 160 / 0.95 = 168.4 kVA</li>
              <li>
                New current: 168.4 × 1000 / (√3 × 400) = <strong>243A</strong>
              </li>
              <li>
                Reduction = (300 - 243) / 300 × 100 = <strong>19% reduction</strong>
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>PFC design checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measure or calculate existing power factor</li>
              <li>Determine target power factor (typically 0.95)</li>
              <li>Calculate required kVAr correction</li>
              <li>Select fixed or automatic system</li>
              <li>Consider harmonic environment (may need detuned reactors)</li>
              <li>Locate equipment for effective correction</li>
            </ul>
            <p>
              <strong>Key formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>pf = kW / kVA</strong> = cos φ
              </li>
              <li>
                <strong>kVA = √(kW² + kVAr²)</strong>
              </li>
              <li>
                <strong>kVAr = kW × tan φ</strong>
              </li>
              <li>
                <strong>Correction = kW × (tan φ₁ - tan φ₂)</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Over-correction</strong> — leading pf can cause voltage rise
                </li>
                <li>
                  <strong>Fixed PFC on variable loads</strong> — leads to over-correction at low
                  load
                </li>
                <li>
                  <strong>Ignoring harmonics</strong> — can damage capacitors without detuning
                </li>
                <li>
                  <strong>Installing after VSD</strong> — VSDs need special consideration
                </li>
              </ul>
            }
            doInstead="Use automatic PFC for any building with variable load, target 0.95 lagging (not unity, to avoid over-correction), specify detuned reactors if harmonic distortion is significant, and never connect PFC capacitors directly to a VSD output without consulting the drive manufacturer."
          />

          <SectionRule />

          <Scenario
            title="Light-industrial unit running at 0.78 pf — sizing the PFC bank"
            situation={
              <>
                A 600&nbsp;m² light-industrial unit has been logged at 220&nbsp;kW with a measured
                power factor of 0.78 lagging. The DNO connection agreement specifies a 0.95
                minimum and the client is being billed for kVArh. Loads: 8 × 22&nbsp;kW induction
                motors on conveyors (varies by shift), some compressors, LED area lighting and a
                small office wing. The client wants a payback under 3 years.
              </>
            }
            whatToDo={
              <>
                Use kVAr = kW × (tan φ₁ − tan φ₂) = 220 × (tan 38.7° − tan 18.2°) = 220 × (0.802
                − 0.329) = ≈ 104 kVAr to bring 220&nbsp;kW from 0.78 to 0.95. Specify automatic
                PFC (load varies by shift), 6–8 step controller, sized at 110–125&nbsp;kVAr for
                growth headroom, with detuned reactors (typically 7% or 14%) if any VSDs are
                present or harmonic survey shows distortion. Locate at the main LV panel.
                Document the calculation against Reg 132.1 design-objective duty.
              </>
            }
            whyItMatters={
              <>
                A switch from 0.78 to 0.95 reduces apparent power from 282&nbsp;kVA to 232&nbsp;kVA
                — a 50&nbsp;kVA capacity release without a single DNO upgrade. Reactive-energy
                charges typically pay back the PFC investment in 18–30 months. Skip the detuned
                reactors and the capacitors blow on the harmonic spectrum within months.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Power factor = kW/kVA = cos φ. Apparent power kVA² = kW² + kVAr².',
              'UK DNO target: ≥ 0.95 lagging at the point of supply — below triggers reactive-energy (kVArh) charges in the connection agreement.',
              'Inductive loads (motors, transformers, magnetic ballasts) cause lagging pf; capacitive loads or over-corrected PFC cause leading pf. Both are penalised.',
              'PFC sizing: kVAr_required = kW × (tan φ₁ − tan φ₂). Locate close to inductive loads where practical, otherwise at the main LV panel.',
              'Use automatic PFC for variable loads and detuned reactors (7% or 14%) wherever VSDs or significant non-linear load is present.',
              'A jump from 0.7 to 0.95 pf releases ≈ 26% of supply capacity for the same useful kW — often the cheapest way to defer a DNO upgrade.',
              'Modern LED drivers vary widely (0.5–0.98) — specify pf in the lighting schedule and check at FAT.',
              'Reg 132.1 makes economic and reliable design the engineer&rsquo;s duty — power factor management sits squarely under that obligation.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Diversity factors
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Harmonic assessment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section1_3;
