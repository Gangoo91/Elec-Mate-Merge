/**
 * Module 6 · Section 5 · Subsection 3 — Monitoring and Targeting
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   M&T principles, degree day analysis, cusum charts, exception reporting, and performance tracking systems
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Monitoring and Targeting - HNC Module 6 Section 5.3';
const DESCRIPTION =
  'Master Monitoring and Targeting (M&T) for energy management: degree day analysis, cusum charts, weather normalisation, regression analysis, exception reporting, and performance tracking systems.';

const quickCheckQuestions = [
  {
    id: 'mt-definition',
    question: 'What is the primary purpose of Monitoring and Targeting (M&T)?',
    options: [
      'Loads should be distributed across phases to minimise neutral current',
      'When you reach a cause you can actually fix at a system level (not just blame an individual)',
      'To compare actual energy use against expected performance and identify variances',
      'Reduces artificial lighting when natural daylight is sufficient',
    ],
    correctIndex: 2,
    explanation:
      'M&T compares actual energy consumption against expected performance targets, identifies variances, and enables corrective action to improve energy efficiency.',
  },
  {
    id: 'degree-day-purpose',
    question: 'Why are degree days used in energy analysis?',
    options: [
      'Only when dead working is not practicable and properly risk assessed',
      'To normalise energy consumption for weather variations',
      'Misleadingly low insulation resistance readings',
      'Clear fluid leaking from the ear or nose',
    ],
    correctIndex: 1,
    explanation:
      'Degree days provide a method to normalise heating or cooling energy consumption for weather variations, enabling fair comparison between different periods regardless of outdoor conditions.',
  },
  {
    id: 'cusum-interpretation',
    question: 'On a cusum chart, a downward slope indicates:',
    options: [
      'Equipment failure',
      'Performance better than target',
      'Rising outdoor temperatures',
      'Increasing energy consumption',
    ],
    correctIndex: 1,
    explanation:
      'A downward slope on a cusum chart indicates that actual consumption is consistently below target (negative variances accumulating), meaning performance is better than expected.',
  },
  {
    id: 'exception-reporting',
    question: 'What triggers an exception report in an M&T system?',
    options: [
      'Elimination of 5th and 7th harmonics',
      'Variance exceeding predetermined threshold limits',
      'General-purpose indoor cables (not plenum)',
      'Protect themselves and deliver what\\\\\\\'s agreed',
    ],
    correctIndex: 1,
    explanation:
      'Exception reports are triggered when actual consumption deviates from expected values by more than predetermined threshold limits, highlighting potential problems requiring investigation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A building has a base temperature of 15.5°C. If the mean daily outdoor temperature is 8°C, how many heating degree days occurred?',
    options: [
      '8 degree days',
      '7.5 degree days',
      '15.5 degree days',
      '23.5 degree days',
    ],
    correctAnswer: 1,
    explanation:
      'Heating degree days = Base temperature - Mean outdoor temperature = 15.5°C - 8°C = 7.5 degree days. This represents the heating requirement for that day.',
  },
  {
    id: 2,
    question:
      'In regression analysis of energy consumption, the y-intercept of the performance line represents:',
    options: [
      'Peak demand',
      'Weather-dependent consumption',
      'Base load consumption',
      'Degree day total',
    ],
    correctAnswer: 2,
    explanation:
      'The y-intercept represents the base load - energy consumption that occurs regardless of weather, such as lighting, equipment, domestic hot water, and other non-heating/cooling loads.',
  },
  {
    id: 3,
    question: 'Which formula correctly describes the standard performance line equation?',
    options: [
      'Energy = Degree days ÷ Base load',
      'Energy = Base load × Degree days',
      'Energy = Base load - (Slope × Degree days)',
      'Energy = (Slope × Degree days) + Base load',
    ],
    correctAnswer: 3,
    explanation:
      'The performance line equation is E = (m × DD) + c, where E is energy, m is the slope (weather sensitivity), DD is degree days, and c is the base load (y-intercept).',
  },
  {
    id: 4,
    question:
      'A cusum chart shows a sudden upward step change in the line. This most likely indicates:',
    options: [
      'A specific event causing increased consumption (e.g., new equipment, system fault)',
      'A step-by-step procedure to ensure electrical equipment is safely disconnected from supply before work',
      'Fraction of lumens that reach the task surface vs lost to walls/ceiling',
      'Body language, facial expressions, tone of voice, eye contact and physical gestures',
    ],
    correctAnswer: 0,
    explanation:
      'A sudden step change in a cusum chart indicates a discrete event occurred at that point - perhaps equipment failure, new plant installation, occupancy change, or control system malfunction.',
  },
  {
    id: 5,
    question: 'What base temperature is typically used for UK heating degree day calculations?',
    options: [
      '20°C',
      '15.5°C',
      '12°C',
      '18°C',
    ],
    correctAnswer: 1,
    explanation:
      'The UK standard base temperature for heating degree days is 15.5°C. This assumes internal heat gains (people, equipment, solar) reduce the heating requirement, so heating is only needed when outdoor temperature falls below this threshold.',
  },
  {
    id: 6,
    question: 'Exception reporting thresholds are typically set at:',
    options: [
      'Any deviation from target',
      '50% variance from expected values',
      '5-10% variance from expected values',
      'Only when consumption doubles',
    ],
    correctAnswer: 2,
    explanation:
      'Exception thresholds are typically set at 5-10% variance from expected performance. This captures significant deviations while avoiding false alarms from minor measurement variations or normal operational fluctuations.',
  },
  {
    id: 7,
    question: 'The slope of a performance line (energy vs degree days) represents:',
    options: [
      '5-10% variance from expected values',
      'Energy = (Slope × Degree days) + Base load',
      'At least 12 months to capture seasonal variations',
      'Building thermal performance (weather sensitivity)',
    ],
    correctAnswer: 3,
    explanation:
      "The slope represents the building's thermal performance or weather sensitivity - how much additional energy is required per degree day. A steeper slope indicates poorer insulation or higher ventilation losses.",
  },
  {
    id: 8,
    question: 'Which action should follow identification of an exception in M&T analysis?',
    options: [
      'Investigation to identify root cause before taking action',
      'Ignore if less than 20% variance',
      'Immediately replace all equipment',
      'Adjust the target to match actual consumption',
    ],
    correctAnswer: 0,
    explanation:
      'Exceptions require investigation to identify the root cause - is it a meter fault, operational change, equipment problem, or genuine efficiency loss? Only after understanding the cause can appropriate corrective action be determined.',
  },
  {
    id: 9,
    question:
      "A building's performance line shows: E = 2.5DD + 1,200 (kWh). For a month with 300 degree days, expected consumption is:",
    options: [
      '750 kWh',
      '1,950 kWh',
      '1,200 kWh',
      '3,600 kWh',
    ],
    correctAnswer: 1,
    explanation:
      'Expected consumption = (2.5 × 300) + 1,200 = 750 + 1,200 = 1,950 kWh. The 750 kWh is weather-dependent heating, and 1,200 kWh is the base load.',
  },
  {
    id: 10,
    question: 'What does R² (coefficient of determination) indicate in regression analysis?',
    options: [
      'A specific event causing increased consumption (e.g., new equipment, system fault)',
      'Building thermal performance (weather sensitivity)',
      'The percentage of consumption variation explained by degree days',
      'Investigation to identify root cause before taking action',
    ],
    correctAnswer: 2,
    explanation:
      'R² indicates how well the regression line fits the data - specifically, the proportion of energy consumption variation that can be explained by degree day variation. Values above 0.9 indicate good correlation.',
  },
  {
    id: 11,
    question: 'Which meter data frequency is typically recommended for effective M&T?',
    options: [
      'Annual readings only',
      'Quarterly readings',
      'Monthly is always sufficient',
      'Weekly or more frequent readings',
    ],
    correctAnswer: 3,
    explanation:
      'Weekly or more frequent readings (ideally half-hourly from smart meters) enable timely identification of problems. Annual or quarterly data may detect long-term trends but cannot identify issues quickly enough for effective intervention.',
  },
  {
    id: 12,
    question: 'When establishing a baseline for M&T, what period should typically be used?',
    options: [
      'At least 12 months to capture seasonal variations',
      'Building thermal performance (weather sensitivity)',
      '5-10% variance from expected values',
      'Investigation to identify root cause before taking action',
    ],
    correctAnswer: 0,
    explanation:
      'A minimum of 12 months of baseline data is needed to capture full seasonal variation, occupancy patterns, and establish reliable performance lines that account for all operating conditions throughout the year.',
  },
];

const faqs = [
  {
    question: 'What is the difference between monitoring and targeting?',
    answer:
      'Monitoring is the systematic collection and analysis of energy consumption data over time. Targeting adds the comparative element - setting expected performance levels and comparing actual consumption against these targets. Together, M&T enables identification of variances and drives corrective action. Without targets, monitoring alone shows consumption patterns but cannot identify whether performance is good or poor.',
  },
  {
    question: 'How do I choose the correct base temperature for degree day analysis?',
    answer:
      'The standard UK base temperature is 15.5°C for heating. However, the optimal base temperature varies by building type. Buildings with high internal heat gains (offices, retail) may have lower base temperatures (14-15°C), while naturally ventilated or poorly insulated buildings may need higher values (16-17°C). The correct base temperature gives the highest R² correlation when plotting energy against degree days.',
  },
  {
    question: 'Why might a performance line show poor correlation (low R²)?',
    answer:
      'Poor correlation can result from: mixed fuel use not separately metered; significant non-weather-dependent loads dominating consumption; variable occupancy or operating hours; incorrect base temperature selection; meter reading errors or estimated readings; building with multiple heating zones on different schedules; or process loads that vary independently of weather.',
  },
  {
    question: 'How often should M&T reports be reviewed?',
    answer:
      'Exception reports should be reviewed weekly to enable prompt corrective action. Performance summaries should be reviewed monthly for management reporting. Cusum charts and trend analysis should be reviewed quarterly to identify gradual changes. Full baseline reviews should occur annually or when significant changes occur (refurbishment, occupancy change, new equipment).',
  },
  {
    question: 'What actions can result from M&T exception reports?',
    answer:
      'Actions range from simple operational corrections (resetting time clocks, closing windows, adjusting set points) to maintenance interventions (fixing faulty controls, replacing failed components) to capital investment (upgrading inefficient equipment, improving insulation). The key is investigating to find root causes rather than simply noting the exception.',
  },
  {
    question: 'How does M&T support ISO 50001 energy management?',
    answer:
      'M&T directly supports ISO 50001 requirements for: establishing energy baselines (Clause 4.4.4); setting energy performance indicators and targets (Clause 4.4.5); monitoring and measurement (Clause 4.6.1); and continual improvement through the Plan-Do-Check-Act cycle. Cusum charts provide visual evidence of improvement trends for audit purposes.',
  },
];

const HNCModule6Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · Subsection 3"
            title="Monitoring and Targeting"
            description="M&T principles, degree day analysis, cusum charts, exception reporting, and performance tracking systems"
            tone="purple"
          />

          <TLDR
            points={[
              "Monitoring and Targeting (M&T) compares measured energy use against a target — usually a regression model relating consumption to driving variables (degree days for heating, occupancy for power, production output for industrial).",
              "Cusum (cumulative sum of differences) charts and exception reports are the analytical workhorses — cusum reveals trend changes (drift), exceptions catch single-period anomalies.",
              "Degree-day analysis (heating degree days base 15.5°C UK convention) is the standard normalisation for weather-sensitive loads — without it, year-on-year comparisons are misleading.",
            ]}
          />

          <RegsCallout
            source="CIBSE TM39 Building Energy Metering + ISO 50006 Energy Performance Indicators and Baselines + ISO 50015 Measurement and Verification of Energy Performance"
            clause="Energy performance shall be characterised by Energy Performance Indicators (EnPIs) appropriate to the activity, consistent over time, and supported by an Energy Baseline (EnB) reflecting current performance under defined operating conditions. Variations in EnPI shall be evaluated against the EnB taking into account changes in relevant variables (production output, weather, occupancy). Significant deviations shall be investigated and corrective actions documented."
            meaning={
              <>
                ISO 50006 is the methodology underpinning ISO 50001 M&T — defining EnPIs (e.g. kWh/m², kWh/HDD), baselines, and the requirement to investigate deviations. Without baselines and normalisation, energy data is just numbers; with them, it is a management tool.
              </>
            }
            cite="Source: ISO 50006:2014 + ISO 50015:2014 — iso.org; CIBSE TM39 (2021)"
          />

          <LearningOutcomes
            outcomes={[
              "Explain M&T principles and their role in energy management",
              "Apply degree day analysis for weather normalisation",
              "Construct and interpret performance lines using regression",
              "Create and analyse cusum charts to identify trends",
              "Design exception reporting systems with appropriate thresholds",
              "Establish baselines and set meaningful energy targets",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="M&T Fundamentals and Baseline Establishment">
            <p>Monitoring and Targeting (M&T) is a systematic approach to energy management that compares actual consumption against expected performance. By establishing baselines, setting targets, and tracking variances, organisations can identify waste, verify savings, and drive continuous improvement in energy efficiency.</p>
            <p><strong>The M&T Process Cycle:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Monitor:</strong> Collect consumption data at appropriate intervals (weekly/daily/half-hourly)</li>
              <li><strong>Normalise:</strong> Adjust for weather, occupancy, and production variations</li>
              <li><strong>Compare:</strong> Assess actual performance against targets</li>
              <li><strong>Report:</strong> Generate exception alerts when variances exceed thresholds</li>
              <li><strong>Act:</strong> Investigate causes and implement corrective measures</li>
            </ul>
            <p><strong>Baseline Establishment Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Data period:</strong> Capture seasonal variation — 12 months minimum</li>
              <li><strong>Data quality:</strong> Reliable analysis — Actual readings, not estimates</li>
              <li><strong>Weather data:</strong> Enable normalisation — Local degree day records</li>
              <li><strong>Operating conditions:</strong> Context for analysis — Occupancy, hours, production data</li>
              <li><strong>Sub-metering:</strong> Identify specific loads — Separate heating, lighting, processes</li>
            </ul>
            <p><strong>Key principle:</strong> M&T answers "Are we using more or less energy than we should for the conditions?" rather than simply "How much energy did we use?"</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Degree Day Analysis and Weather Normalisation">
            <p>Degree days quantify the severity of weather and enable fair comparison of energy consumption across different periods. Without weather normalisation, comparing January's consumption to July's would be meaningless for heating analysis.</p>
            <p><strong>Heating Degree Days (HDD)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK base temperature: 15.5°C</li>
              <li>HDD = Base temp - Mean outdoor temp</li>
              <li>Only counted when outdoor &lt; base</li>
              <li>Higher HDD = more heating required</li>
            </ul>
            <p><strong>Cooling Degree Days (CDD)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Typical base: 18-22°C depending on building</li>
              <li>CDD = Mean outdoor temp - Base temp</li>
              <li>Only counted when outdoor &gt; base</li>
              <li>Higher CDD = more cooling required</li>
            </ul>
            <p><strong>Degree Day Calculation Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Base temperature:</strong> 15.5°C (UK standard)</li>
              <li><strong>Day 1 mean temp:</strong> 8°C → HDD = 15.5 - 8 = 7.5</li>
              <li><strong>Day 2 mean temp:</strong> 12°C → HDD = 15.5 - 12 = 3.5</li>
              <li><strong>Day 3 mean temp:</strong> 16°C → HDD = 0 (no heating needed)</li>
              <li><strong>3-day total:</strong> 7.5 + 3.5 + 0 = 11 degree days</li>
            </ul>
            <p><strong>Base Temperature Selection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dense office:</strong> 14-15°C — High internal gains from IT, people</li>
              <li><strong>Standard commercial:</strong> 15.5°C — UK default, moderate internal gains</li>
              <li><strong>Residential:</strong> 15.5-16°C — Lower gains, higher comfort expectations</li>
              <li><strong>Warehouse:</strong> 12-14°C — Lower temperature requirement</li>
              <li><strong>Hospital:</strong> 16-17°C — Higher comfort, ventilation requirements</li>
            </ul>
            <p><strong>Optimisation tip:</strong> The correct base temperature gives the highest R² correlation. Try different values (14-17°C) and select the one producing the best regression fit.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Performance Lines and Regression Analysis">
            <p>Performance lines establish the relationship between energy consumption and degree days using linear regression. This enables prediction of expected consumption for any weather condition and forms the basis for target setting and variance analysis.</p>
            <p><strong>Performance Line Equation</strong></p>
            <p>E = (m × DD) + c</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>E =</strong> Energy consumption (kWh, kWh/m², or therms)</li>
              <li><strong>m =</strong> Slope (weather sensitivity, kWh per degree day)</li>
              <li><strong>DD =</strong> Degree days for the period</li>
              <li><strong>c =</strong> Y-intercept (base load, weather-independent consumption)</li>
            </ul>
            <p><strong>Interpreting the Performance Line</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Slope (m):</strong> Represents thermal performance - steeper slope means more energy per degree day (poorer building fabric or higher ventilation losses)</li>
              <li><strong>Intercept (c):</strong> Base load consumption - lighting, equipment, domestic hot water, processes that occur regardless of weather</li>
              <li><strong>R² value:</strong> Coefficient of determination - indicates how well the line fits data (aim for R² &gt; 0.9)</li>
              <li><strong>Scatter:</strong> Spread of points around the line - wide scatter suggests other influencing factors</li>
            </ul>
            <p><strong>Regression Analysis Quality Indicators</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&gt; 0.95:</strong> Excellent correlation — High confidence in predictions</li>
              <li><strong>0.85 - 0.95:</strong> Good correlation — Acceptable for M&T purposes</li>
              <li><strong>0.70 - 0.85:</strong> Moderate correlation — Consider other influencing factors</li>
              <li><strong>&lt; 0.70:</strong> Poor correlation — Review base temp, check data quality</li>
            </ul>
            <p><strong>Performance Line Calculation Example</strong></p>
            <p><strong>Given regression result:</strong> E = 2.8DD + 850 (kWh/week)</p>
            <p><strong>February week:</strong> 95 degree days</p>
            <p><strong>Expected consumption:</strong> (2.8 × 95) + 850 = 266 + 850 = 1,116 kWh</p>
            <p><strong>Actual consumption:</strong> 1,280 kWh</p>
            <p><strong>Variance:</strong> 1,280 - 1,116 = +164 kWh (14.7% over target)</p>
            <p>This exceeds typical 10% threshold - exception report triggered</p>
            <p><strong>Improvement indicator:</strong> A steeper slope after retrofit suggests insulation or controls improvements have not worked. A shallower slope confirms reduced weather sensitivity.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Cusum Charts and Exception Reporting">
            <p>Cumulative Sum (Cusum) charts provide powerful visual representation of ongoing performance trends. By plotting the running total of variances (actual minus expected), cusum charts reveal patterns that might be obscured in raw consumption data.</p>
            <p><strong>Cusum Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate variance each period</li>
              <li>Variance = Actual - Expected</li>
              <li>Add to cumulative total</li>
              <li>Plot running sum over time</li>
            </ul>
            <p><strong>Interpreting Cusum Slope</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Horizontal line = on target</li>
              <li>Upward slope = over-consuming</li>
              <li>Downward slope = under-consuming</li>
              <li>Steeper = larger variance</li>
            </ul>
            <p><strong>Cusum Chart Calculation Example</strong></p>
            <p>Pattern shows over-consumption corrected by Week 5</p>
            <p><strong>Cusum Pattern Recognition</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sudden step up:</strong> Discrete event increased consumption — New equipment, system fault, occupancy change</li>
              <li><strong>Sudden step down:</strong> Discrete event reduced consumption — Energy saving measure, equipment removed</li>
              <li><strong>Gradual upward drift:</strong> Progressive degradation — Control deterioration, maintenance needs</li>
              <li><strong>Seasonal oscillation:</strong> Weather correlation issues — Wrong base temp, unaccounted solar gain</li>
            </ul>
            <p><strong>Exception Reporting Framework</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Threshold setting:</strong> Typically 5-10% of expected consumption</li>
              <li><strong>Alert mechanism:</strong> Automatic notification when threshold exceeded</li>
              <li><strong>Investigation protocol:</strong> Defined steps to identify root cause</li>
              <li><strong>Action tracking:</strong> Record corrective measures and outcomes</li>
              <li><strong>Escalation:</strong> Procedures for persistent or severe exceptions</li>
            </ul>
            <p><strong>Best practice:</strong> Set initial thresholds conservatively (10%) then tighten as the system matures and noise sources are eliminated.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Establishing a Performance Baseline</strong>
            </p>
            <p><strong>Scenario:</strong> Establish heating performance line for an office building from 12 months of data.</p>
            <p>Monthly data collected (gas consumption vs degree days):</p>
            <p>Regression analysis results:</p>
            <p>Slope (m) = 45.2 kWh/degree day</p>
            <p>Intercept (c) = 2,450 kWh (monthly base load)</p>
            <p>R² = 0.94 (good correlation)</p>
            <p>Performance line: E = 45.2DD + 2,450 kWh/month</p>
            <p>Interpretation:</p>
            <p>- Base load 2,450 kWh/month (DHW, kitchens, losses)</p>
            <p>- Each degree day requires 45.2 kWh heating</p>
            <p>R² of 0.94 confirms reliable baseline for targeting</p>
            <p>
              <strong>Example 2: Weather Normalised Comparison</strong>
            </p>
            <p><strong>Scenario:</strong> Compare January consumption between two years with different weather.</p>
            <p>Year 1 January: 15,200 kWh at 380 degree days</p>
            <p>Year 2 January: 12,800 kWh at 310 degree days</p>
            <p>Raw comparison suggests 16% reduction - but is it real?</p>
            <p>Using performance line E = 35DD + 1,800:</p>
            <p>Year 1 expected: (35 × 380) + 1,800 = 15,100 kWh</p>
            <p>Year 2 expected: (35 × 310) + 1,800 = 12,650 kWh</p>
            <p>Normalised analysis:</p>
            <p>Year 1 variance: 15,200 - 15,100 = +100 kWh (+0.7%)</p>
            <p>Year 2 variance: 12,800 - 12,650 = +150 kWh (+1.2%)</p>
            <p>Conclusion: Performance similar - reduction was weather-related, not efficiency gain</p>
            <p>
              <strong>Example 3: Cusum Analysis Identifying a Problem</strong>
            </p>
            <p><strong>Scenario:</strong> Analyse 10-week cusum data for a retail store.</p>
            <p>Weekly variances (kWh): -5, +8, +12, +45, +52, +48, +55, +42, +38, +40</p>
            <p>Cumulative sum: -5, +3, +15, +60, +112, +160, +215, +257, +295, +335</p>
            <p>Pattern analysis:</p>
            <p>Weeks 1-3: Near horizontal (on target)</p>
            <p>Week 4: Sharp upward step (+45 kWh variance)</p>
            <p>Weeks 4-10: Sustained upward slope (~45 kWh/week average)</p>
            <p>Investigation findings:</p>
            <p>- Week 4: New refrigeration unit commissioned</p>
            <p>- Unit running 24/7 instead of scheduled hours</p>
            <p>Action: Correct time clock settings - savings verified in subsequent weeks</p>
            <p>
              <strong>Example 4: Target Setting with Improvement Factor</strong>
            </p>
            <p><strong>Scenario:</strong> Set targets after implementing energy conservation measures.</p>
            <p>Current performance line: E = 52DD + 3,200 kWh/month</p>
            <p>Planned improvements:</p>
            <p>- BMS optimisation: Expected 8% reduction in weather-dependent load</p>
            <p>- LED lighting retrofit: Expected 15% reduction in base load</p>
            <p>New target line calculation:</p>
            <p>New slope: 52 × 0.92 = 47.8 kWh/DD</p>
            <p>New intercept: 3,200 × 0.85 = 2,720 kWh</p>
            <p>Target line: E = 47.8DD + 2,720 kWh/month</p>
            <p>For month with 200 DD:</p>
            <p>Old expected: (52 × 200) + 3,200 = 13,600 kWh</p>
            <p>New target: (47.8 × 200) + 2,720 = 12,280 kWh</p>
            <p>Expected saving: 1,320 kWh (9.7%)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>M&T Implementation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install appropriate sub-metering for major energy uses</li>
              <li>Establish data collection protocols and responsibilities</li>
              <li>Collect minimum 12 months baseline data</li>
              <li>Develop performance lines with R² validation</li>
              <li>Set realistic exception thresholds (start at 10%)</li>
              <li>Define investigation and escalation procedures</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK heating base temperature: <strong>15.5°C</strong></li>
              <li>Good R² correlation: <strong>&gt; 0.85</strong></li>
              <li>Typical exception threshold: <strong>5-10%</strong></li>
              <li>Baseline period: <strong>12 months minimum</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring base temperature optimisation</strong> - Wrong base temp gives poor correlation</li>
                <li><strong>Using estimated meter readings</strong> - Actual readings essential for accuracy</li>
                <li><strong>Setting thresholds too tight initially</strong> - Creates alert fatigue</li>
                <li><strong>Not investigating exceptions</strong> - Reports are useless without action</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Cusum chart reveals BMS schedule drift after FM contract change"
            situation={
              <>
                A 6,000 m² office has run M&T for 3 years with weekly cusum charts. After an FM contract handover, the cusum on heating gas suddenly turns sharply upward — accumulating 18% above baseline over 8 weeks despite no occupancy or weather change.
              </>
            }
            whatToDo={
              <>
                Investigate immediately — the cusum shape suggests sustained schedule change, not a one-off event. Check BMS heating schedules: most likely (1) new FM team has reset weekend setback to occupied, or (2) optimisation start time has moved earlier "to be safe", or (3) summer cooling/heating changeover not implemented. Reset to commissioned strategy, document the cause, and use as training material with the new FM team. Report the saved energy in the next M&T report.
              </>
            }
            whyItMatters={
              <>
                M&T catches operational drift that no one would otherwise notice — schedule changes, control overrides, insulation damage, thermostat tampering. The cusum shape (sudden step, gradual drift, periodic spike) tells you what kind of cause to look for. Without M&T, drift accumulates silently for years.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "M&T = compare measured use against a baseline target with normalisation for drivers.",
              "Cusum charts reveal trend changes (cumulative deviation from baseline).",
              "Exception reports flag single-period anomalies (>2σ).",
              "Heating: degree days base 15.5°C (UK convention) for normalisation.",
              "Cooling: degree days or occupancy / external temperature regression.",
              "EnPIs (Energy Performance Indicators) per ISO 50006 — kWh/m², kWh/HDD, kWh/output.",
              "Operational drift is the largest source of preventable energy waste — typically caught only by M&T.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Metering strategies
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                ISO 50001
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section5_3;
