/**
 * Module 4 · Section 1 · Subsection 1 — Maximum Demand Calculations
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Assessment methods for peak electrical load: measured, calculated and benchmarked
 *   approaches; ESQCR Regulation 25 DNO interface; load profiles, coincident demand and
 *   integration periods. Foundation for transformer sizing, switchgear ratings and supply
 *   capacity submissions on every building services project.
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

const TITLE = 'Maximum Demand Calculations - HNC Module 4 Section 1.1';
const DESCRIPTION =
  'Master maximum demand assessment methods for building services: measured and calculated approaches, ESQCR requirements, load profiles, coincident demand, and peak measurement techniques.';

const quickCheckQuestions = [
  {
    id: 'max-demand-def',
    question: 'What is maximum demand in electrical installation design?',
    options: [
      'The nameplate rating of all equipment',
      'The highest expected load at any time',
      'The average daily consumption',
      'The total connected load',
    ],
    correctIndex: 1,
    explanation:
      'Maximum demand is the highest expected electrical load that will occur at any instant. It accounts for diversity and is typically lower than the total connected load.',
  },
  {
    id: 'esqcr-requirement',
    question: 'Under ESQCR, who must agree the maximum demand with the DNO?',
    options: [
      'All of the above',
      'The building owner',
      'The installing contractor',
      'The designer/specifier',
    ],
    correctIndex: 3,
    explanation:
      'The designer or specifier is responsible for assessing maximum demand and agreeing the supply capacity with the Distribution Network Operator (DNO) under ESQCR.',
  },
  {
    id: 'coincident-demand',
    question: 'Coincident demand refers to:',
    options: [
      'Loads that occur at the same time',
      'Loads that never operate together',
      'Emergency backup loads only',
      'The total connected load of the installation',
    ],
    correctIndex: 0,
    explanation:
      'Coincident demand is the portion of loads that operate simultaneously. Understanding coincidence is essential for accurate maximum demand assessment.',
  },
  {
    id: 'measurement-period',
    question: 'What integration period is typically used for maximum demand measurement?',
    options: [
      '15 minutes',
      '30 minutes',
      '1 minute',
      '1 hour',
    ],
    correctIndex: 1,
    explanation:
      'DNOs typically measure maximum demand over 30-minute integration periods. This smooths out short transient peaks while capturing sustained high loads.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the relationship between total connected load and maximum demand?',
    options: [
      'They are always equal',
      'Maximum demand is typically lower due to diversity',
      'Maximum demand is always higher due to safety factors',
      'Maximum demand only includes lighting loads',
    ],
    correctAnswer: 1,
    explanation:
      'Maximum demand is typically 40-70% of total connected load because not all equipment operates simultaneously at full capacity. This is accounted for through diversity factors.',
  },
  {
    id: 2,
    question: 'Which method provides the most accurate maximum demand assessment?',
    options: [
      'Building regulations tables',
      'Nameplate summation',
      'Measured data from similar buildings',
      'Calculated using diversity factors',
    ],
    correctAnswer: 2,
    explanation:
      'Measured data from similar buildings provides the most accurate assessment as it reflects actual usage patterns. Calculated methods are used when measured data is unavailable.',
  },
  {
    id: 3,
    question:
      'A building has 500kVA total connected load. If diversity is estimated at 0.65, what is the maximum demand?',
    options: [
      '769kVA',
      '500kVA',
      '750kVA',
      '325kVA',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum demand = Total connected load × Diversity factor = 500kVA × 0.65 = 325kVA',
  },
  {
    id: 4,
    question: 'Under ESQCR Regulation 25, the maximum demand assessment must:',
    options: [
      'Be agreed with the DNO before connection',
      'Always equal the total connected load',
      'Be based on lighting loads only',
      'Be reassessed every working day',
    ],
    correctAnswer: 0,
    explanation:
      'ESQCR Regulation 25 requires that maximum demand be assessed and agreed with the DNO before connection to ensure adequate supply capacity.',
  },
  {
    id: 5,
    question: 'What is a load profile?',
    options: [
      'A list of all connected equipment nameplate ratings',
      'A graph showing demand variation over time',
      'The maximum current a single circuit can carry',
      'The agreed supply capacity from the DNO',
    ],
    correctAnswer: 1,
    explanation:
      'A load profile is a graphical representation showing how electrical demand varies over time (hourly, daily, or seasonally), essential for understanding peak periods.',
  },
  {
    id: 6,
    question: 'Peak demand for an office building typically occurs:',
    options: [
      'Late evening after occupants have left',
      'Early hours of the morning before opening',
      'Mid-morning to early afternoon',
      'At weekends when the building is empty',
    ],
    correctAnswer: 2,
    explanation:
      'Office buildings typically experience peak demand mid-morning to early afternoon when lighting, IT equipment, and HVAC systems operate at maximum capacity with full occupancy.',
  },
  {
    id: 7,
    question: 'Why is the 30-minute integration period used for maximum demand?',
    options: [
      'It matches the half-hourly billing meter exactly',
      'It is the longest period permitted by the DNO',
      'It captures every motor-starting transient peak',
      'It filters short transients while capturing sustained loads',
    ],
    correctAnswer: 3,
    explanation:
      'The 30-minute integration period smooths out short-duration peaks (motor starting, lift operation) while capturing genuinely sustained high demands that stress the supply infrastructure.',
  },
  {
    id: 8,
    question: 'For a mixed-use development, how should maximum demand be assessed?',
    options: [
      'Apply inter-building diversity to summed demands',
      'Use a flat rate per square metre',
      'Sum all individual building demands',
      'Use the largest single building demand',
    ],
    correctAnswer: 0,
    explanation:
      'Mixed-use developments benefit from inter-building diversity - residential peaks occur at different times to commercial. Total demand is the sum with diversity factors applied.',
  },
  {
    id: 9,
    question: 'What information must be provided to the DNO when requesting a supply?',
    options: [
      'The total connected load in kW only',
      'Maximum demand (kVA), power factor, and connection point',
      'The make and model of every appliance to be installed',
      'The expected number of occupants in the building',
    ],
    correctAnswer: 1,
    explanation:
      'DNO supply applications require maximum demand in kVA, expected power factor, single/three-phase requirement, and proposed connection point location.',
  },
  {
    id: 10,
    question:
      'A commercial building measured maximum demand is 180kW at 0.85 power factor. What is the kVA demand?',
    options: [
      '153kVA',
      '180kVA',
      '212kVA',
      '270kVA',
    ],
    correctAnswer: 2,
    explanation:
      'kVA = kW ÷ power factor = 180 ÷ 0.85 = 211.8kVA ≈ 212kVA. DNOs supply capacity is in kVA, not kW.',
  },
];

const faqs = [
  {
    question: "What's the difference between connected load and maximum demand?",
    answer:
      'Connected load is the sum of all equipment nameplate ratings - if everything ran at full power simultaneously. Maximum demand is the actual peak load expected, which is always lower due to diversity (not all equipment operates at once or at full capacity). A building with 1000kVA connected load might have only 600kVA maximum demand.',
  },
  {
    question: 'How do I assess maximum demand for a new building with no historical data?',
    answer:
      'Use a combination of methods: (1) CIBSE Guide A benchmark data for similar building types, (2) BS 7671 Appendix 1 diversity factors, (3) detailed load analysis of major equipment, (4) measured data from comparable buildings. Always add appropriate allowance for future growth (typically 20-25%).',
  },
  {
    question: 'Why does the DNO want maximum demand in kVA not kW?',
    answer:
      'DNO network capacity is limited by current (which determines cable/transformer heating), not real power. kVA represents apparent power which directly relates to current: I = kVA ÷ (√3 × kV). A load with poor power factor draws more current (higher kVA) for the same kW, stressing the network more.',
  },
  {
    question: 'What happens if actual demand exceeds the agreed maximum?',
    answer:
      'The DNO supply may become unreliable or protective devices may trip. Exceeding agreed maximum demand is a breach of the connection agreement and may incur penalty charges. In severe cases, the DNO can disconnect the supply. Regular monitoring and proactive capacity increases are essential.',
  },
  {
    question: 'How often should maximum demand be reviewed?',
    answer:
      'Review annually as part of building management, after any significant changes to equipment or occupancy, and when planning expansions. Many modern buildings have sub-metering that continuously logs demand, making trend analysis straightforward.',
  },
  {
    question: 'Can I reduce maximum demand without reducing services?',
    answer:
      'Yes, through load management strategies: stagger HVAC start times, use building automation to prevent simultaneous operation of non-critical loads, install thermal storage for cooling, and implement demand response programmes. Power factor correction also reduces kVA demand without affecting kW output.',
  },
];

const HNCModule4Section1_1 = () => {
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
            eyebrow="Module 4 · Section 1 · Subsection 1"
            title="Maximum Demand Calculations"
            description="Assessment methods and techniques for determining peak electrical load requirements in building services."
            tone="purple"
          />

          <TLDR
            points={[
              'Maximum demand drives every downstream sizing decision — DNO supply (kVA), transformer rating, main switchgear, sub-mains and standby plant.',
              'Three assessment methods: measured (most accurate), calculated with diversity, and CIBSE benchmark (early-stage). Always cross-check with at least two.',
              'BS 7671 Reg 311.1 mandates determination of maximum demand for economic and reliable design within thermal limits and admissible voltage drop.',
              'ESQCR Reg 25 places the duty on the designer to agree the supply capacity (kVA, not kW) with the DNO before connection — lead times of 8 weeks to 18 months.',
              'Build in 20–25% growth headroom and integrate over 30 minutes (UK DNO standard) so transient peaks do not distort the design figure.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 311.1 (Maximum demand and diversity)"
            clause="For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined as required by Regulation 311.1. This determination is mandatory to ensure conductor and protective device sizing are appropriate."
            meaning={
              <>
                Reg 311.1 is the regulatory anchor for everything in this subsection. As the
                designer, you cannot pull a kVA figure out of the air — you must determine
                maximum demand by a defensible method (measured, calculated with diversity, or
                benchmarked) and document it. Get this wrong and every cable, every CB rating
                and the DNO connection itself sit on a faulty assumption.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 311.1; ESQCR 2002 Regulation 25; CIBSE Guide A."
          />

          <LearningOutcomes
            outcomes={[
              'Define maximum demand and its importance in electrical design',
              'Apply measured, calculated, and benchmark assessment methods',
              'Understand ESQCR requirements for DNO notification',
              'Analyse load profiles and identify peak demand periods',
              'Calculate coincident demand for multiple load types',
              'Apply appropriate growth factors for future capacity',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Maximum Demand Fundamentals">
            <p>
              Maximum demand is the cornerstone of electrical installation design. It determines the
              supply capacity required from the Distribution Network Operator (DNO), transformer
              sizing, main switchgear ratings, and the overall infrastructure investment.
            </p>
            <p>
              <strong>Key definitions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Connected load:</strong> Sum of all equipment nameplate ratings
              </li>
              <li>
                <strong>Maximum demand:</strong> Highest actual load expected at any time
              </li>
              <li>
                <strong>Average demand:</strong> Total energy ÷ time period
              </li>
              <li>
                <strong>Load factor:</strong> Average demand ÷ maximum demand
              </li>
            </ul>
            <p>
              <strong>Why maximum demand matters:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DNO supply</strong> sized by maximum demand (kVA) — overestimate means
                higher connection charges
              </li>
              <li>
                <strong>Transformer</strong> sized by maximum demand + growth — overestimate means
                increased capital cost
              </li>
              <li>
                <strong>Main switchgear</strong> sized by maximum demand current — overestimate
                means larger, more expensive equipment
              </li>
              <li>
                <strong>Main cables</strong> sized by maximum demand current — overestimate means
                larger containment and higher material cost
              </li>
              <li>
                <strong>Standby generation</strong> sized by essential load demand — overestimate
                means oversized plant and higher running costs
              </li>
            </ul>
            <p>
              <strong>Design principle:</strong> Accurate maximum demand assessment balances
              adequate capacity against unnecessary infrastructure cost.
            </p>
            <p>
              <strong>Quick context:</strong> Office buildings typically run at 70-100 VA/m²; retail
              80-150 VA/m²; industrial highly variable by process. Always add 20-25% growth
              allowance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Assessment Methods">
            <p>
              Three primary methods exist for assessing maximum demand, each with appropriate
              applications depending on available data and project stage.
            </p>
            <p>
              <strong>1. Measured method:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Data from similar existing buildings</li>
              <li>Half-hourly metering records</li>
              <li>Most accurate when data available</li>
              <li>Requires comparable building type</li>
            </ul>
            <p>
              <strong>2. Calculated method:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sum connected loads</li>
              <li>Apply diversity factors</li>
              <li>BS 7671 Appendix 1 guidance</li>
              <li>Suitable when loads known</li>
            </ul>
            <p>
              <strong>3. Benchmark method:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>CIBSE Guide A data</li>
              <li>W/m² or VA/m² benchmarks</li>
              <li>Quick initial estimates</li>
              <li>Early design stages</li>
            </ul>
            <p>
              <strong>CIBSE benchmark values (typical / good practice, VA/m²):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard office: 70-100 / 55-75</li>
              <li>Prestige office: 90-130 / 75-95</li>
              <li>Retail (general): 80-120 / 60-90</li>
              <li>Supermarket: 150-250 / 120-180</li>
              <li>Hospital: 100-180 / 80-140</li>
              <li>School: 40-60 / 30-45</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Use multiple methods and compare results. Significant
              discrepancies require investigation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="ESQCR Requirements and DNO Interface">
            <p>
              The Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR) place legal
              obligations on both consumers and distributors regarding maximum demand assessment and
              notification.
            </p>
            <p>
              <strong>ESQCR Regulation 25 — key requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Consumers must provide maximum demand information to DNO</li>
              <li>Notification required before connection or significant increase</li>
              <li>DNO must be satisfied supply can meet demand safely</li>
              <li>Designer/specifier responsibility to assess and notify</li>
            </ul>
            <p>
              <strong>DNO application process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1:</strong> Submit application with maximum demand (kVA), power
                factor, connection details
              </li>
              <li>
                <strong>Stage 2:</strong> DNO issues budget quotation (typically within 10 working
                days)
              </li>
              <li>
                <strong>Stage 3:</strong> Accept quotation and pay connection charges
              </li>
              <li>
                <strong>Stage 4:</strong> DNO carries out reinforcement works if required
              </li>
              <li>
                <strong>Stage 5:</strong> Connection made and supply energised
              </li>
            </ul>
            <p>
              <strong>Information required for DNO application:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum demand — kVA (not kW)</li>
              <li>Power factor — expected value (e.g. 0.9)</li>
              <li>Supply type — single-phase or three-phase</li>
              <li>Voltage required — LV (400V) or HV (11kV)</li>
              <li>Connection point — site plan with meter location</li>
              <li>Programme — required energisation date</li>
            </ul>
            <p>
              <strong>Lead times:</strong> Standard LV connections typically 8-12 weeks; HV
              connections requiring reinforcement can be 6-18 months.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Load Profiles and Peak Measurement">
            <p>
              Understanding load profiles is essential for accurate maximum demand assessment and
              for identifying opportunities to reduce peak loads through load management strategies.
            </p>
            <p>
              <strong>Typical daily load profile — office building:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>07:00 — HVAC pre-conditioning starts</li>
              <li>08:00-09:00 — Rapid load increase</li>
              <li>10:00-15:00 — Peak demand period</li>
              <li>17:00-19:00 — Gradual load reduction</li>
              <li>19:00+ — Base load only</li>
            </ul>
            <p>
              <strong>Typical daily load profile — retail store:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>06:00 — Cleaning, restocking</li>
              <li>09:00 — Full lighting, HVAC</li>
              <li>12:00-14:00 — Lunchtime peak</li>
              <li>16:00-18:00 — Evening shopping peak</li>
              <li>21:00+ — Security lighting only</li>
            </ul>
            <p>
              <strong>Coincident vs non-coincident demand:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Coincident demand:</strong> Loads that operate simultaneously and contribute
                to peak
              </li>
              <li>
                <strong>Non-coincident demand:</strong> Loads that rarely operate together (e.g.
                heating and cooling)
              </li>
              <li>
                <strong>Example:</strong> Electric heating has high winter demand but zero summer
                contribution
              </li>
              <li>
                <strong>Design implication:</strong> Only coincident loads determine maximum demand
              </li>
            </ul>
            <p>
              <strong>Maximum demand measurement:</strong> MD = Peak 30-minute kVAh × 2 (where MD is
              the maximum demand averaged over the 30-minute period).
            </p>
            <p>
              <strong>Integration period effects:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1 minute</strong> — captures motor starting, lift operation; used for
                protective device sizing
              </li>
              <li>
                <strong>15 minutes</strong> — captures short-term process peaks; used in some
                billing tariffs
              </li>
              <li>
                <strong>30 minutes</strong> — captures sustained high loads; UK DNO standard
              </li>
              <li>
                <strong>1 hour</strong> — heavily averaged demand; some international standards
              </li>
            </ul>
            <p>
              <strong>Monitoring tip:</strong> Modern smart meters and sub-meters record half-hourly
              data automatically. Request historical data when assessing existing buildings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — benchmark assessment:</strong> Estimate maximum demand for a
              5,000m² standard office building.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using CIBSE benchmark: 80 VA/m² (mid-range)</li>
              <li>Maximum demand = Area × Benchmark</li>
              <li>
                MD = 5,000m² × 80 VA/m² = <strong>400,000 VA = 400 kVA</strong>
              </li>
              <li>Add 20% growth allowance</li>
              <li>
                Design MD = 400 × 1.2 = <strong>480 kVA</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2 — calculated method:</strong> Calculate maximum demand from
              connected loads — Lighting 80kW, Small power 120kW, HVAC 200kW, Lifts 60kW (2 ×
              30kW).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting: 80kW × 0.9 = 72kW</li>
              <li>Small power: 120kW × 0.4 = 48kW</li>
              <li>HVAC: 200kW × 1.0 = 200kW (constant when running)</li>
              <li>Lifts: 60kW × 0.6 = 36kW (only 1 at peak typically)</li>
              <li>
                Total diversified = 72 + 48 + 200 + 36 = <strong>356kW</strong>
              </li>
              <li>
                At 0.9 power factor: 356 ÷ 0.9 = <strong>396 kVA</strong>
              </li>
            </ul>
            <p>
              <strong>Example 3 — kW to kVA conversion:</strong> A building has measured maximum
              demand of 250kW. Power factor is 0.85. What capacity should be requested from DNO?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>kVA = kW ÷ power factor</li>
              <li>
                kVA = 250 ÷ 0.85 = <strong>294 kVA</strong>
              </li>
              <li>DNO would typically offer standard sizes: 315 kVA or 500 kVA supply</li>
              <li>Request 315 kVA, allowing some growth margin</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Assessment checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify all connected loads and their ratings</li>
              <li>Determine operational patterns (hours of use, seasonal variation)</li>
              <li>Apply appropriate diversity factors</li>
              <li>Consider coincident and non-coincident loads</li>
              <li>Add growth allowance (typically 20-25%)</li>
              <li>Convert to kVA using expected power factor</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Standard office: <strong>70-100 VA/m²</strong>
              </li>
              <li>
                Integration period: <strong>30 minutes</strong> (UK standard)
              </li>
              <li>
                Growth allowance: <strong>20-25%</strong>
              </li>
              <li>
                Typical building diversity: <strong>0.6-0.8</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Confusing kW and kVA</strong> — DNO supplies are rated in kVA
                </li>
                <li>
                  <strong>Ignoring diversity</strong> — overestimates demand significantly
                </li>
                <li>
                  <strong>No growth allowance</strong> — building outgrows supply quickly
                </li>
                <li>
                  <strong>Late DNO application</strong> — reinforcement can take 6+ months
                </li>
              </ul>
            }
            doInstead="Always state demand in kVA for the DNO submission, apply realistic diversity factors before sizing, build in 20-25% growth headroom, and lodge the DNO application early in the design programme so reinforcement does not become the critical path."
          />

          <SectionRule />

          <Scenario
            title="Office refurbishment scope brief — sizing the incoming supply"
            situation={
              <>
                You are picking up a 4,500&nbsp;m² office refurbishment for a fit-out client. The
                shell building has an existing 400&nbsp;A LV supply on a 250&nbsp;kVA DNO TX. The
                client wants to add a new comms room (continuous 40&nbsp;kW IT load), VRF cooling
                and a small staff kitchen. The design team needs maximum demand to confirm whether
                the existing supply will cope or a DNO upgrade is the critical path.
              </>
            }
            whatToDo={
              <>
                Take the CIBSE prestige-office benchmark of 90–130&nbsp;VA/m² as a sanity check
                (≈ 540&nbsp;kVA). Then build the calculated method: lighting 30&nbsp;kW × 0.9,
                small power 110&nbsp;kW × 0.4, VRF 90&nbsp;kW × 0.7, comms 40&nbsp;kW × 1.0
                (data centre — no diversity), kitchen 25&nbsp;kW × 0.5. Sum, divide by an expected
                0.95 power factor, add 20% growth, then convert to kVA. Compare against the
                existing 250&nbsp;kVA supply. If above, lodge a DNO application immediately —
                reinforcement may take 3–6 months.
              </>
            }
            whyItMatters={
              <>
                Reg 311.1 makes this assessment mandatory. ESQCR Reg 25 places the duty on you
                as designer to agree the figure with the DNO before connection. Discovering a
                supply shortfall at second-fix stage is a programme-killer that can push the
                handover back by months and trigger client claims.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 311.1 is mandatory: maximum demand shall be determined for economic and reliable design within thermal limits and admissible voltage drop.',
              'Connected load ≠ maximum demand — typical buildings run at 40–70% of connected load after diversity.',
              'DNO supplies are rated in kVA, not kW — always convert using the expected power factor before applying.',
              'Use multiple methods (measured + calculated + benchmark) and triangulate. Significant disagreement means you have not understood the load.',
              'Add 20–25% growth headroom — buildings change use, EV charging is coming, and reinforcement after the fact costs serious money.',
              'ESQCR Reg 25 means the designer agrees the supply capacity with the DNO before connection — lodge the application early so reinforcement is not the critical path.',
              'Integration period matters: 30 minutes is the UK DNO standard — captures sustained loads while filtering motor-start transients.',
              'For mixed-use developments, apply inter-building diversity to the summed individual demands — never just add them.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Electrical load assessment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Diversity factors
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section1_1;
