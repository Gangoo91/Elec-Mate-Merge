/**
 * Module 2 · Section 5 · Subsection 5 — Thermal Comfort
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Fanger PMV/PPD model, operative temperature, adaptive comfort and TM52/TM59
 *   overheating criteria — the framework that turns subjective comfort into
 *   defendable design targets.
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

const TITLE = 'Thermal Comfort - HNC Module 2 Section 5.5';
const DESCRIPTION =
  "Understanding Fanger's PMV/PPD model, CIBSE comfort criteria, operative temperature, adaptive comfort, and overheating assessment.";

const quickCheckQuestions = [
  {
    id: 'pmv-range',
    question: 'What PMV range is typically considered acceptable for thermal comfort?',
    options: [
      '-0.5 to +0.5',
      '-1 to +1',
      '-3 to +3',
      '0 only',
    ],
    correctIndex: 0,
    explanation:
      "PMV (Predicted Mean Vote) of -0.5 to +0.5 is considered 'optimal' comfort, with -1 to +1 being acceptable. PPD (Predicted Percentage Dissatisfied) is less than 10% within ±0.5 PMV.",
  },
  {
    id: 'operative-temp',
    question: 'Operative temperature combines which two factors?',
    options: [
      'Mean radiant temperature and air velocity',
      'Air temperature and air velocity',
      'Air temperature and humidity',
      'Air temperature and mean radiant temperature',
    ],
    correctIndex: 3,
    explanation:
      "Operative temperature (Top) combines air temperature (Ta) and mean radiant temperature (Tr). For low air velocities, Top ≈ (Ta + Tr)/2. It represents what occupants 'feel'.",
  },
  {
    id: 'cibse-summer',
    question: 'What is the CIBSE recommended summer comfort temperature for offices?',
    options: [
      '18-20°C',
      '23-25°C',
      '21-23°C',
      '25-28°C',
    ],
    correctIndex: 1,
    explanation:
      'CIBSE Guide A recommends 23-25°C operative temperature for summer office conditions. Winter recommendation is 21-23°C. These are for Category II (normal level of expectation).',
  },
  {
    id: 'overheating-criteria',
    question:
      'Under TM52, what is the threshold temperature above which hours are counted for overheating?',
    options: [
      'A fixed 26°C for all occupied spaces',
      'A fixed 28°C regardless of outdoor conditions',
      'Whatever the building services engineer specifies',
      'Varies with running mean outdoor temperature',
    ],
    correctIndex: 3,
    explanation:
      "TM52 uses adaptive comfort limits that vary with running mean outdoor temperature. The threshold rises in warmer weather as occupants adapt. It's not a fixed temperature.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the six factors in Fanger's thermal comfort model?",
    options: [
      'Temperature, humidity, velocity, radiation, clothing, gender',
      'Air temperature, radiant temperature, humidity, velocity, metabolic rate, clothing',
      'Temperature, humidity, CO2, velocity, noise, light',
      'Air temperature, surface temperature, pressure, velocity, clothing, age',
    ],
    correctAnswer: 1,
    explanation:
      "Fanger's six factors: air temperature, mean radiant temperature, relative humidity, air velocity (4 environmental) plus metabolic rate and clothing insulation (2 personal factors).",
  },
  {
    id: 2,
    question: 'What does a PMV of +2 indicate?',
    options: [
      'Hot',
      'Thermally neutral',
      'Warm',
      'Slightly warm',
    ],
    correctAnswer: 2,
    explanation:
      "PMV scale: -3 cold, -2 cool, -1 slightly cool, 0 neutral, +1 slightly warm, +2 warm, +3 hot. PMV +2 indicates occupants would vote 'warm' on average.",
  },
  {
    id: 3,
    question: 'What unit is used to measure clothing insulation?',
    options: [
      'Met',
      'Watts',
      'W/m²K',
      'Clo',
    ],
    correctAnswer: 3,
    explanation:
      "Clothing insulation is measured in 'clo'. 1 clo = 0.155 m²K/W. Typical summer clothing is 0.5 clo, winter business attire 1.0 clo.",
  },
  {
    id: 4,
    question: 'What metabolic rate (Met) is assumed for sedentary office work?',
    options: [
      '1.2 Met',
      '1.0 Met',
      '0.8 Met',
      '1.5 Met',
    ],
    correctAnswer: 0,
    explanation:
      'Sedentary office work is typically 1.2 Met (1 Met = 58.2 W/m² body area = ~105W for average person). Sleeping is 0.8 Met, walking slowly is 2.0 Met.',
  },
  {
    id: 5,
    question: 'What is the adaptive comfort principle based on?',
    options: [
      'A single fixed comfort temperature applied all year round',
      'Occupants adapting to seasonal and local conditions',
      'The mechanical cooling system maintaining a constant setpoint',
      'Comfort being determined solely by relative humidity',
    ],
    correctAnswer: 1,
    explanation:
      'Adaptive comfort recognises that occupants in naturally ventilated buildings adapt to local conditions - adjusting clothing, opening windows, accepting wider temperature ranges than PMV/PPD predicts.',
  },
  {
    id: 6,
    question: 'For CIBSE Category II comfort, what is the maximum acceptable PPD?',
    options: [
      '5%',
      '15%',
      '10%',
      '20%',
    ],
    correctAnswer: 2,
    explanation:
      'Category II (normal expectation) allows max 10% PPD, corresponding to PMV ±0.5. Category I (high expectation) allows max 6% PPD. Category III allows 15%.',
  },
  {
    id: 7,
    question:
      'What is the effect of increasing air velocity on thermal sensation in warm conditions?',
    options: [
      'Feels warmer because moving air carries more heat to the skin',
      'Has no measurable effect on perceived thermal sensation',
      'Increases relative humidity and therefore feels more humid',
      'Feels cooler due to increased convective and evaporative heat loss',
    ],
    correctAnswer: 3,
    explanation:
      'Increased air velocity enhances convective and evaporative heat loss from skin, providing a cooling effect. This is why fans can extend comfortable temperature range upward by 2-3°C.',
  },
  {
    id: 8,
    question: 'In TM52 overheating assessment, what are the three criteria?',
    options: [
      'Hours of exceedance, daily weighted exceedance, maximum temperature',
      'Air temperature, mean radiant temperature, relative humidity',
      'Solar gain, internal gain, ventilation rate',
      'Clothing insulation, metabolic rate, air velocity',
    ],
    correctAnswer: 0,
    explanation:
      'TM52 Criterion 1: Hours where ΔT > 1K (max 3% occupied hours). Criterion 2: Daily weighted exceedance (max 6). Criterion 3: Absolute maximum ΔT ≤ 4K. A space is deemed to overheat if it fails any two of the three criteria.',
  },
  {
    id: 9,
    question: "What is 'asymmetric radiant temperature' and why does it matter?",
    options: [
      'The difference between summer and winter design temperatures',
      'Temperature difference between different directions from occupant',
      'The variation in air temperature over a 24-hour period',
      'The gap between the supply and return air temperatures',
    ],
    correctAnswer: 1,
    explanation:
      'Asymmetric radiant temperature is the difference in radiant temperature from different directions. Large asymmetry (cold window, warm ceiling) causes local discomfort even if mean conditions are acceptable.',
  },
  {
    id: 10,
    question:
      'For Part O compliance, which buildings must demonstrate overheating risk is addressed?',
    options: [
      'All buildings',
      'Only naturally ventilated buildings',
      'New residential buildings',
      'Only buildings over 1000m²',
    ],
    correctAnswer: 2,
    explanation:
      'Part O (2021) applies to new residential buildings in England. It requires demonstrating overheating risk is acceptable using either simplified method or TM59 dynamic simulation.',
  },
  {
    id: 11,
    question: 'What running mean outdoor temperature is used in adaptive comfort calculations?',
    options: [
      'A simple arithmetic mean of the past seven days',
      'The single highest temperature recorded that day',
      'The annual average outdoor temperature for the location',
      'Exponentially weighted running mean',
    ],
    correctAnswer: 3,
    explanation:
      'The running mean outdoor temperature (θrm) uses exponentially weighted average where recent days have more influence. This reflects gradual adaptation to changing seasonal conditions.',
  },
  {
    id: 12,
    question:
      'What is the recommended maximum vertical air temperature difference to avoid discomfort?',
    options: [
      '3°C between ankle and head',
      'No limit if mean is comfortable',
      '1°C between ankle and head',
      '5°C between floor and ceiling',
    ],
    correctAnswer: 0,
    explanation:
      'CIBSE recommends maximum 3°C difference between 0.1m (ankle) and 1.1m (head height) for seated occupants. Larger gradients cause cold feet/warm head discomfort.',
  },
];

const faqs = [
  {
    question: 'When should I use PMV/PPD versus adaptive comfort model?',
    answer:
      'Use PMV/PPD for mechanically conditioned buildings with tight temperature control and uniform conditions. Use adaptive model for naturally ventilated or mixed-mode buildings where occupants can adjust clothing and open windows. Part O and TM59 primarily use adaptive approach.',
  },
  {
    question: 'How does humidity affect thermal comfort?',
    answer:
      'Humidity has relatively small effect on thermal sensation at normal comfort temperatures. At extremes, high humidity (>70%) prevents evaporative cooling making warm conditions feel hotter. Very low humidity (<30%) can cause dry eyes and throat. CIBSE recommends 40-70% RH for comfort.',
  },
  {
    question: 'What is the difference between TM52 and TM59?',
    answer:
      'TM52 covers overheating assessment for non-domestic buildings. TM59 is specifically for domestic buildings and aligns with Part O requirements. TM59 has additional criteria for bedrooms (night-time cooling) and considers vulnerable occupants. Both use adaptive comfort principles.',
  },
  {
    question: 'Can increasing air velocity offset higher temperatures?',
    answer:
      'Yes, up to a point. CIBSE Guide A indicates each 0.1 m/s increase in air velocity can offset approximately 0.3°C temperature rise. This works up to about 1 m/s (above which draught becomes unacceptable). Maximum useful offset is about 2-3°C.',
  },
  {
    question: 'How do I account for radiant heating panels in comfort calculations?',
    answer:
      'Radiant panels affect mean radiant temperature (MRT), not air temperature. Calculate MRT using angle factors from panel to occupant. For comfort, what matters is operative temperature which averages air and MRT. Radiant systems can provide comfort at lower air temperatures.',
  },
  {
    question: 'What causes local thermal discomfort?',
    answer:
      'Local discomfort occurs even when overall PMV is acceptable. Causes include: radiant asymmetry (cold windows, warm ceilings), vertical temperature gradient, floor temperature (cold concrete, warm heated floors), and draughts. CIBSE Guide A provides limits for each.',
  },
];

const HNCModule2Section5_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 5"
            title="Thermal Comfort"
            description="Understanding and achieving comfortable thermal environments for building occupants."
            tone="purple"
          />

          <TLDR
            points={[
              'You apply the Fanger PMV/PPD model — six factors (air T, MRT, air velocity, RH, clothing clo, metabolic met) — to size mechanical conditioning.',
              'You target PMV ±0.5 and PPD ≤ 10% for Cat A office comfort, per BS EN ISO 7730 and CIBSE Guide A.',
              'You distinguish operative temperature (Top) from air temperature and use Top in glazed/perimeter zones where MRT diverges.',
              'You apply CIBSE TM52 (non-domestic) and TM59 (homes) adaptive overheating criteria for naturally-ventilated and mixed-mode designs.',
            ]}
          />

          <RegsCallout
            source="BS EN ISO 7730 — Ergonomics of the thermal environment (PMV/PPD); CIBSE TM52 / TM59 (Overheating)"
            clause="Methods for predicted mean vote (PMV) and predicted percentage dissatisfied (PPD) using Fanger&rsquo;s model; TM52 / TM59 adaptive overheating criteria for non-domestic and domestic buildings respectively."
            meaning={
              <>
                BS EN ISO 7730 + CIBSE TM52/TM59 are the reference standards for sizing
                conditioning and assessing overheating risk. As HNC engineer you cite them
                in the design risk register, in the TM52 study report, and in any planning
                Net-Zero submission where overheating is in scope.
              </>
            }
            cite="Source: BS EN ISO 7730:2005; CIBSE TM52:2013 The Limits of Thermal Comfort; CIBSE TM59:2017 Design Methodology for Overheating in Homes; CIBSE Guide A — Environmental Design."
          />

          <LearningOutcomes
            outcomes={[
              "Apply Fanger's six-factor thermal comfort model",
              'Calculate and interpret PMV and PPD',
              'Determine operative temperature for comfort assessment',
              'Use CIBSE comfort criteria for different building types',
              'Understand adaptive comfort for natural ventilation',
              'Apply TM52/TM59 overheating assessment criteria',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Fanger's PMV/PPD Model"
            plainEnglish="Fanger boiled comfort down to six factors and a vote scale from -3 (cold) to +3 (hot). PPD tells you what fraction of people will moan whatever you do."
          >
            <p>
              Professor Ole Fanger developed the most widely used thermal comfort model, based on
              heat balance between the human body and its environment. The model predicts average
              thermal sensation and percentage of dissatisfied occupants.
            </p>
            <p>
              <strong>The six factors affecting thermal comfort:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Environmental:</strong> Air temperature (Ta °C), Mean radiant temp (Tr °C),
                Relative humidity (RH %), Air velocity (v m/s)
              </li>
              <li>
                <strong>Personal:</strong> Metabolic rate (M, Met), Clothing insulation (Icl, clo)
              </li>
            </ul>
            <p>
              <strong>PMV scale (Predicted Mean Vote) - PMV / sensation / PPD%:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>-3 / Cold / ~100%</li>
              <li>-2 / Cool / ~75%</li>
              <li>-1 / Slightly cool / ~25%</li>
              <li>0 / Neutral / 5%</li>
              <li>+1 / Slightly warm / ~25%</li>
              <li>+2 / Warm / ~75%</li>
              <li>+3 / Hot / ~100%</li>
            </ul>
            <p>
              <strong>Note:</strong> Even at PMV = 0 (neutral), 5% of people will be dissatisfied
              due to individual variation. Perfect comfort for everyone is impossible; design aims
              for acceptable levels.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Operative Temperature and CIBSE Criteria"
            plainEnglish="Operative temperature is the average of air and radiant - what you actually feel. CIBSE gives you target ranges by building type."
          >
            <p>
              Operative temperature combines air and radiant temperatures into a single value
              representing what occupants actually experience. CIBSE Guide A provides recommended
              comfort ranges for different building types and seasons.
            </p>
            <p>
              <strong>Operative temperature:</strong> Top = (Ta + Tr) / 2. For low air velocity
              (&lt;0.2 m/s). More complex formula for higher velocities.
            </p>
            <p>
              <strong>CIBSE recommended operative temperatures (winter / summer °C):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Office (sedentary): 21-23 / 23-25</li>
              <li>Retail: 19-21 / 21-23</li>
              <li>Teaching space: 19-21 / 21-25</li>
              <li>Hospital ward: 22-24 / 23-25</li>
              <li>Sports hall: 13-16 / 14-18</li>
              <li>Factory (light work): 16-19 / 18-21</li>
            </ul>
            <p>
              <strong>Comfort categories (ISO 7730):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category A (high):</strong> PMV ±0.2, PPD &lt;6% (hospitals, care homes)
              </li>
              <li>
                <strong>Category B (normal):</strong> PMV ±0.5, PPD &lt;10% (offices, schools)
              </li>
              <li>
                <strong>Category C (moderate):</strong> PMV ±0.7, PPD &lt;15% (retail, light industry)
              </li>
            </ul>
            <p>
              <strong>Design note:</strong> Summer temperatures can be 2°C higher than winter
              because occupants wear lighter clothing (lower clo value), maintaining thermal balance
              at higher air temperature.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Adaptive Comfort Model"
            plainEnglish="In nat-vent buildings, people adapt - they roll up sleeves, open windows, accept wider ranges. The adaptive model lets you raise the comfort ceiling when it's hot outside."
          >
            <p>
              The adaptive comfort model recognises that occupants in naturally ventilated buildings
              adapt to seasonal conditions by adjusting clothing, opening windows, and accepting
              wider temperature ranges. This approach is central to Part O and TM59 overheating
              assessment.
            </p>
            <p>
              <strong>Key principles of adaptive comfort:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Expectation:</strong> Occupants expect wider ranges in free-running buildings
              </li>
              <li>
                <strong>Adaptation:</strong> Clothing adjustment, window operation, activity modification
              </li>
              <li>
                <strong>Running mean:</strong> Comfort limit varies with recent outdoor temperature
              </li>
              <li>
                <strong>Control:</strong> Having personal control increases acceptable range
              </li>
            </ul>
            <p>
              <strong>Adaptive comfort temperature:</strong> Tcomf = 0.33 × θrm + 18.8. Where θrm =
              exponentially weighted running mean outdoor temperature. Upper limit (Cat II) = Tcomf
              + 3°C; Lower limit = Tcomf - 4°C.
            </p>
            <p>
              <strong>Comparison: PMV vs adaptive:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Building type:</strong> PMV - mechanically conditioned; adaptive - naturally ventilated
              </li>
              <li>
                <strong>Temperature range:</strong> PMV - fixed narrow band; adaptive - varies with outdoor temp
              </li>
              <li>
                <strong>Occupant control:</strong> PMV - not considered; adaptive - central assumption
              </li>
              <li>
                <strong>Energy implication:</strong> PMV - higher energy use; adaptive - lower energy use
              </li>
            </ul>
            <p>
              <strong>Mixed-mode buildings:</strong> Can use adaptive approach when in natural
              ventilation mode, switching to PMV criteria when mechanical cooling operates.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Overheating Assessment (TM52/TM59/Part O)"
            plainEnglish="UK buildings are getting hotter and tighter, so overheating is now a real compliance risk. TM52/TM59 use adaptive limits and three pass/fail criteria."
          >
            <p>
              Overheating has become a major concern in UK buildings, driven by climate change,
              tighter construction, and increased glazing. Building Regulations Part O and CIBSE
              TM52/TM59 provide assessment methods and compliance criteria.
            </p>
            <p>
              <strong>TM52 criteria (non-domestic buildings):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Hours of exceedance:</strong> Max 3% occupied hours where ΔT &gt; 1K above limit
              </li>
              <li>
                <strong>2. Daily weighted:</strong> Max We = 6 on any day (severity × hours)
              </li>
              <li>
                <strong>3. Upper limit:</strong> ΔT never &gt; 4K (absolute maximum)
              </li>
            </ul>
            <p>
              <strong>TM59 additional criteria (domestic):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Living areas:</strong> TM52 Criteria 1 and 2 apply
              </li>
              <li>
                <strong>Bedrooms (night):</strong> Max 3% hours over 26°C (23:00-07:00)
              </li>
              <li>
                <strong>Vulnerable occupants:</strong> Fixed 26°C threshold (not adaptive)
              </li>
              <li>
                <strong>Noise constraint:</strong> Check if windows can realistically be opened
              </li>
            </ul>
            <p>
              <strong>Part O compliance routes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Simplified method:</strong> Glazing area limits by orientation, max g-value, min free area for ventilation, cross-vent required
              </li>
              <li>
                <strong>Dynamic simulation:</strong> Full TM59 assessment, DSY weather file required, all three criteria assessed, more design flexibility
              </li>
            </ul>
            <p>
              <strong>Climate change:</strong> TM59 recommends using DSY1 (2020s high emissions) or
              DSY2/3 for future-proofing. What passes today may not remain comfortable by 2050.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Four sums covering operative temperature, adaptive limits from running mean, the velocity offset rule, and a TM52 Criterion 1 hours-of-exceedance check."
          >
            <p>
              <strong>Example 1 - Operative temperature:</strong> An office has air temperature
              22°C and mean radiant temperature 24°C (due to warm ceiling). Calculate operative
              temperature.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>For low air velocity, Top = (Ta + Tr) / 2</li>
              <li>Top = (22 + 24) / 2 = <strong>23°C</strong></li>
              <li>Within CIBSE summer comfort range for offices (23-25°C)</li>
            </ul>
            <p>
              <strong>Example 2 - Adaptive comfort limit:</strong> The running mean outdoor
              temperature is 18°C. Calculate the Category II adaptive comfort upper limit.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Comfort temperature: Tcomf = 0.33 × θrm + 18.8</li>
              <li>Tcomf = 0.33 × 18 + 18.8 = 24.7°C</li>
              <li>Upper limit (Cat II) = Tcomf + 3 = 24.7 + 3 = <strong>27.7°C</strong></li>
              <li>Temperatures above 27.7°C count as overheating hours</li>
            </ul>
            <p>
              <strong>Example 3 - Velocity offset:</strong> If air velocity increases from 0.1 to
              0.4 m/s, approximately how much higher temperature can be tolerated while maintaining
              comfort?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rule of thumb: 0.3°C per 0.1 m/s increase</li>
              <li>Velocity increase = 0.4 - 0.1 = 0.3 m/s</li>
              <li>Temperature offset = 0.3 × 3 = <strong>~0.9°C higher acceptable</strong></li>
              <li>Ceiling fans can extend acceptable range by 2-3°C in summer</li>
            </ul>
            <p>
              <strong>Example 4 - TM52 Criterion 1 check:</strong> A building is occupied 3000
              hours per year. Dynamic simulation shows 120 hours above the adaptive comfort limit.
              Does it pass Criterion 1?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Criterion 1 limit = 3% of occupied hours</li>
              <li>3% of 3000 = 90 hours maximum</li>
              <li>Actual exceedance = 120 hours</li>
              <li><strong>FAIL:</strong> 120 &gt; 90 hours (4% exceedance)</li>
              <li>Building requires design changes to reduce overheating</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The PMV/PPD targets, operative ranges and overheating limits you'll be quoted against in design reviews."
          >
            <p>
              <strong>Essential values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1 clo:</strong> Business suit + accessories (0.155 m²K/W)
              </li>
              <li>
                <strong>1 Met:</strong> 58.2 W/m² body area (~105W/person)
              </li>
              <li>
                <strong>PMV target:</strong> ±0.5 for Category B (normal) comfort
              </li>
              <li>
                <strong>Office winter:</strong> 21-23°C operative
              </li>
              <li>
                <strong>Office summer:</strong> 23-25°C operative
              </li>
            </ul>
            <p>
              <strong>Key formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Top = (Ta + Tr) / 2:</strong> Operative temperature (low velocity)
              </li>
              <li>
                <strong>Tcomf = 0.33θrm + 18.8:</strong> Adaptive comfort temperature
              </li>
              <li>
                <strong>Upper limit = Tcomf + 3:</strong> Category II adaptive limit
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Using air temp only:</strong> Radiant effects significant near windows/walls
                </li>
                <li>
                  <strong>Ignoring adaptation:</strong> PMV too strict for free-running buildings
                </li>
                <li>
                  <strong>Fixed overheating limit:</strong> TM52/59 use adaptive limits, not 26°C
                </li>
                <li>
                  <strong>Bedroom hours:</strong> TM59 uses fixed 26°C at night
                </li>
              </ul>
            }
            doInstead="Always work with operative temperature near glazing and walls, use the adaptive model for nat-vent buildings, apply the running-mean adaptive limit for TM52/59, and switch to a fixed 26°C threshold for bedrooms at night."
          />

          <SectionRule />

          <Scenario
            title="TM59 overheating assessment for a Build-to-Rent residential block"
            situation={
              <>
                A 96-unit BtR residential block in central London is going through planning.
                The local plan requires a CIBSE TM59 overheating assessment for all
                naturally-ventilated bedrooms. Initial dynamic simulation shows three
                south-west aspect bedrooms failing TM59 Criterion A (operative temperature
                threshold).
              </>
            }
            whatToDo={
              <>
                Verify the TM59 weather file (DSY1 London for 2020s) and the bedroom
                occupancy profile (8 hours single occupancy 23:00–07:00). Identify the
                fail driver: solar gain through glazing or insufficient night ventilation.
                Apply mitigation in priority order: external shading (brise-soleil or
                shutters), reduced g-value glazing, increased openable area, then mechanical
                cooling as a last resort. Re-run the simulation. Document the design
                decisions in the TM59 report submitted with the planning application.
              </>
            }
            whyItMatters={
              <>
                A TM59 fail blocks planning consent. Once the building is occupied and
                overheating is confirmed, the developer is exposed to litigation under the
                Homes (Fitness for Human Habitation) Act 2018. Getting TM59 right at design
                stage is a multi-million-pound risk-reduction exercise.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Fanger PMV combines six factors: air temperature, MRT, air velocity, RH, clothing (clo), metabolic rate (met).',
              'Comfort target Cat A: PMV ±0.5, PPD ≤ 10%.',
              'Operative temperature Top ≈ (Tair + MRT)/2 — better comfort proxy than air temperature alone.',
              'Adaptive comfort: occupants tolerate wider ranges if they have control (windows, blinds, fans).',
              'Clo values: light office wear ≈ 0.5–1.0 clo; met values: seated office work ≈ 1.0–1.2 met.',
              'CIBSE TM52 — three criteria for non-domestic overheating; pass two of three.',
              'CIBSE TM59 — adaptive method for residential, with bedroom and living-room thresholds.',
              'BS EN ISO 7730 is the international standard for the PMV/PPD method.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Air infiltration and ventilation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Building fabric performance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section5_5;
