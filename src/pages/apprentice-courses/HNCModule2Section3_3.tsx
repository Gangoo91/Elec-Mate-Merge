/**
 * Module 2 · Section 3 · Subsection 3 — Psychrometric Charts
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Reading the CIBSE psychrometric chart, plotting state points and visualising
 *   AHU processes — the graphical literacy that turns moisture-content equations
 *   into a defendable AHU schematic.
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

const TITLE = 'Psychrometric Charts - HNC Module 2 Section 3.3';
const DESCRIPTION =
  'Learn to read and use psychrometric charts for HVAC design: chart construction, axes, property lines, plotting air conditions and CIBSE chart applications.';

const quickCheckQuestions = [
  {
    id: 'chart-x-axis',
    question:
      'What property is shown on the horizontal (x) axis of a standard psychrometric chart?',
    options: ['Relative humidity', 'Dry bulb temperature', 'Moisture content', 'Enthalpy'],
    correctIndex: 1,
    explanation:
      'The horizontal axis shows dry bulb temperature in °C. This is the primary reference for locating any air condition on the chart.',
  },
  {
    id: 'chart-y-axis',
    question: 'What property is shown on the vertical (y) axis of a psychrometric chart?',
    options: ['Wet bulb temperature', 'Enthalpy', 'Moisture content (g/kg)', 'Relative humidity'],
    correctIndex: 2,
    explanation:
      'The vertical axis shows moisture content (specific humidity) in g/kg of dry air. This scale typically runs from 0 to about 30 g/kg.',
  },
  {
    id: 'saturation-line',
    question: 'What does the curved saturation line on a psychrometric chart represent?',
    options: [
      'Constant enthalpy',
      '100% relative humidity',
      'Constant wet bulb',
      'Sea level pressure',
    ],
    correctIndex: 1,
    explanation:
      'The saturation curve represents 100% RH - air that is fully saturated with water vapour. All feasible air conditions lie on or below this curve.',
  },
  {
    id: 'two-properties',
    question:
      'How many independent properties are needed to fix an air state on the psychrometric chart?',
    options: ['One', 'Two', 'Three', 'Four'],
    correctIndex: 1,
    explanation:
      'Any two independent psychrometric properties will fix the air state on the chart. Common combinations are: dry bulb + wet bulb, or dry bulb + RH, or dry bulb + moisture content.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The psychrometric chart is valid for a specific:',
    options: [
      'Temperature range only',
      'Atmospheric pressure (typically 101.325 kPa)',
      'Humidity range only',
      'Time of year',
    ],
    correctAnswer: 1,
    explanation:
      'Psychrometric charts are constructed for a specific atmospheric pressure, usually standard sea-level pressure of 101.325 kPa. Charts for different altitudes show different curves.',
  },
  {
    id: 2,
    question: 'On a psychrometric chart, lines of constant relative humidity are:',
    options: [
      'Straight horizontal lines',
      'Straight vertical lines',
      'Curved lines following the saturation curve shape',
      'Diagonal straight lines',
    ],
    correctAnswer: 2,
    explanation:
      'Constant RH lines are curved, roughly parallel to the saturation curve. The saturation curve itself is the 100% RH line.',
  },
  {
    id: 3,
    question: 'Wet bulb temperature lines on a psychrometric chart slope:',
    options: [
      'Vertically upward',
      'Horizontally to the right',
      'Diagonally downward from left to right',
      'Diagonally upward from left to right',
    ],
    correctAnswer: 2,
    explanation:
      'Wet bulb (and enthalpy) lines slope downward from left to right. They start from the saturation curve and extend into the body of the chart.',
  },
  {
    id: 4,
    question:
      'If air at 22°C dry bulb, 50% RH is sensibly heated to 28°C, what happens on the chart?',
    options: [
      'The point moves horizontally to the right',
      'The point moves vertically upward',
      'The point moves along the saturation curve',
      'The point moves diagonally along a wet bulb line',
    ],
    correctAnswer: 0,
    explanation:
      'Sensible heating moves the state point horizontally to the right (higher dry bulb, same moisture content). No moisture is added or removed.',
  },
  {
    id: 5,
    question: 'What is the specific enthalpy of moist air at the origin (0°C, 0 g/kg)?',
    options: ['0 kJ/kg', 'Approximately 0 kJ/kg', '2501 kJ/kg', 'Undefined'],
    correctAnswer: 1,
    explanation:
      'By convention, dry air at 0°C has zero enthalpy. The chart reference point is typically 0°C dry bulb, 0 g/kg moisture content.',
  },
  {
    id: 6,
    question: 'Specific volume lines on a psychrometric chart are:',
    options: [
      'Horizontal lines',
      'Near-vertical lines sloping slightly',
      'The same as constant RH lines',
      'Only shown on the saturation curve',
    ],
    correctAnswer: 1,
    explanation:
      'Specific volume lines are nearly vertical, sloping very slightly to the right as temperature increases. They are often spaced at 0.01 m³/kg intervals.',
  },
  {
    id: 7,
    question:
      'What happens to enthalpy when air is adiabatically humidified along a wet bulb line?',
    options: [
      'Enthalpy increases significantly',
      'Enthalpy decreases significantly',
      'Enthalpy remains approximately constant',
      'Enthalpy becomes zero',
    ],
    correctAnswer: 2,
    explanation:
      'Along an adiabatic saturation (wet bulb) line, enthalpy is approximately constant. The sensible heat lost equals the latent heat gained from evaporation.',
  },
  {
    id: 8,
    question: 'To find dew point from a chart, starting from the air state point, move:',
    options: [
      'Horizontally to the right',
      'Horizontally to the left until hitting the saturation curve',
      'Vertically downward',
      'Diagonally along a wet bulb line',
    ],
    correctAnswer: 1,
    explanation:
      'Dew point is found by moving horizontally left (constant moisture content) until reaching the saturation curve. The temperature at that intersection is the dew point.',
  },
  {
    id: 9,
    question: 'The CIBSE psychrometric chart typically covers a temperature range of:',
    options: ['-20°C to +20°C', '-10°C to +60°C', '0°C to +50°C', '+10°C to +40°C'],
    correctAnswer: 1,
    explanation:
      'The standard CIBSE chart covers approximately -10°C to +60°C dry bulb, which accommodates most UK HVAC applications including winter and summer design conditions.',
  },
  {
    id: 10,
    question: 'If you know dry bulb = 20°C and wet bulb = 14°C, you can determine:',
    options: [
      'Only relative humidity',
      'Only moisture content',
      'All other psychrometric properties',
      'Nothing without more information',
    ],
    correctAnswer: 2,
    explanation:
      'Two independent properties fix the air state completely. From this point, you can read moisture content, RH, dew point, enthalpy, and specific volume directly from the chart.',
  },
  {
    id: 11,
    question: 'The enthalpy scale on a CIBSE chart typically reads in:',
    options: ['J/kg', 'kJ/kg of dry air', 'kJ/kg of moist air', 'BTU/lb'],
    correctAnswer: 1,
    explanation:
      'CIBSE charts use kJ/kg of dry air for enthalpy. This convention ensures consistency as moisture content changes during processes.',
  },
  {
    id: 12,
    question: 'Why is the psychrometric chart preferred over calculations for HVAC design?',
    options: [
      'It is more accurate',
      'It visualises processes and relationships between properties',
      'Calculations are not possible',
      'Charts are required by regulations',
    ],
    correctAnswer: 1,
    explanation:
      'The chart provides visual understanding of air conditioning processes and shows how properties change together. It makes it easy to plot and analyse heating, cooling, mixing and humidification.',
  },
];

const faqs = [
  {
    question: 'Why are there different psychrometric charts for different altitudes?',
    answer:
      'Psychrometric relationships depend on atmospheric pressure. At higher altitudes, lower pressure means the same moisture content represents a higher partial pressure ratio, affecting RH calculations. Charts for 1000m or 1500m elevation show different curve positions. Always use a chart matching your site pressure.',
  },
  {
    question: 'How accurate is reading from a psychrometric chart?',
    answer:
      'With careful reading using a sharp pencil and ruler, accuracy of ±0.5°C for temperatures and ±0.2 g/kg for moisture content is achievable. For precise calculations, use psychrometric equations or software. Charts are excellent for understanding processes and preliminary design.',
  },
  {
    question: 'What is the difference between enthalpy and wet bulb lines?',
    answer:
      'For practical purposes in HVAC, enthalpy and wet bulb lines are often treated as identical. Strictly, they differ slightly because the adiabatic saturation temperature (theoretical wet bulb) differs marginally from the actual wet bulb. On most charts, the error is negligible.',
  },
  {
    question: 'Can I use the chart for temperatures below 0°C?',
    answer:
      'Yes, but with care. Below 0°C, moisture may exist as ice rather than liquid water, and the latent heat values differ. Some charts extend to -10°C or lower. For very cold conditions, use charts specifically designed for low temperatures or perform calculations.',
  },
  {
    question: 'How do I plot a mixing process on the chart?',
    answer:
      'When two air streams mix, the resulting state lies on a straight line between the two original states. The position on this line depends on the mass flow ratio: closer to the larger flow. Use the lever rule: the mixed state divides the line in inverse ratio to the masses.',
  },
  {
    question: 'What software can replace psychrometric charts?',
    answer:
      'Several options exist: CIBSE Psychrometric Calculator (Excel-based), EnergyPlus, carrier HAP, Trane TRACE, and various free online calculators. These tools perform the same calculations but allow quicker iteration. Understanding the chart remains essential for interpreting results.',
  },
];

const HNCModule2Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 3"
            title="Psychrometric Charts"
            description="The essential graphical tool for analysing and designing air conditioning processes."
            tone="purple"
          />

          <TLDR
            points={[
              'You can plot any air state on a CIBSE chart from two known properties (typically tdb + RH or tdb + twb) and read the rest off the intersection.',
              'You recognise process directions instinctively: horizontal = sensible, vertical = latent, along wet-bulb = adiabatic, toward saturation = cooling coil.',
              'You apply the lever rule for mixed air streams in a return-air AHU and verify the mixed condition before sizing the coil.',
              'You use the chart as a comms tool with architects and BMS engineers — a one-page picture of every AHU process state.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide C — Reference Data (latest edition)"
            clause="Standard psychrometric chart for the UK at 101.325 kPa (sea-level pressure), with property scales for dry-bulb temperature, moisture content, relative humidity, wet-bulb temperature, enthalpy and specific volume."
            meaning={
              <>
                The CIBSE chart is the de facto reference for UK HVAC design. As HNC engineer
                you should annotate every AHU schematic with its psychrometric process line
                so the commissioning engineer and BMS programmer can verify performance
                against design intent.
              </>
            }
            cite="Source: CIBSE Guide C — Reference Data; CIBSE Guide A — Environmental Design."
          />

          <LearningOutcomes
            outcomes={[
              'Identify all lines and scales on a psychrometric chart',
              'Plot air conditions from given property pairs',
              'Read all properties from a plotted state point',
              'Understand the construction and limitations of charts',
              'Use charts to analyse air conditioning processes',
              'Apply CIBSE chart conventions for UK practice',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Chart Construction and Axes"
            plainEnglish="One chart, every air property. Dry bulb across the bottom, moisture up the side, saturation curve on top — everything else fills the middle."
          >
            <p>
              The psychrometric chart is a graphical representation of the thermodynamic properties
              of moist air. It allows engineers to visualise and analyse air conditioning processes.
            </p>
            <p>
              <strong>Chart Structure — Primary Axes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Horizontal: Dry bulb temperature (°C)</li>
              <li>Vertical: Moisture content (g/kg dry air)</li>
            </ul>
            <p>
              <strong>Chart Boundaries:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Upper curve: Saturation line (100% RH)</li>
              <li>Lower bound: 0 g/kg (dry air)</li>
              <li>Left/Right: Temperature range</li>
            </ul>
            <p>
              <strong>CIBSE Chart Specifications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pressure:</strong> 101.325 kPa (sea level standard)
              </li>
              <li>
                <strong>Temperature range:</strong> -10°C to +60°C (covers UK conditions)
              </li>
              <li>
                <strong>Moisture range:</strong> 0 to 30 g/kg (typical maximum)
              </li>
              <li>
                <strong>Enthalpy reference:</strong> 0°C dry air = 0 kJ/kg (datum point)
              </li>
            </ul>
            <p>
              <strong>Important:</strong> The chart only shows states below the saturation curve.
              Points above this curve represent super-saturated conditions (fog) which are not
              normally encountered in HVAC systems.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Property Lines on the Chart"
            plainEnglish="Stack of overlay lines, one per property. Find any two and the rest fall into place at the intersection."
          >
            <p>
              Multiple property lines are overlaid on the basic chart grid, allowing all
              psychrometric properties to be read from a single state point.
            </p>
            <p>
              <strong>Types of Lines on the Chart:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dry bulb temperature:</strong> Vertical straight lines, from bottom upward
              </li>
              <li>
                <strong>Moisture content:</strong> Horizontal straight lines, from left to right
              </li>
              <li>
                <strong>Relative humidity:</strong> Curved lines, parallel to saturation curve
              </li>
              <li>
                <strong>Wet bulb / Enthalpy:</strong> Diagonal straight lines, slope down left to
                right
              </li>
              <li>
                <strong>Specific volume:</strong> Near-vertical lines, slight slope to right
              </li>
            </ul>
            <p>
              <strong>Reading the Chart:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Start with two known properties</li>
              <li>Find intersection of their lines</li>
              <li>Read other properties from that point</li>
              <li>Use interpolation between printed lines</li>
            </ul>
            <p>
              <strong>Common Starting Pairs:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>tdb + RH</strong> — weather data
              </li>
              <li>
                <strong>tdb + twb</strong> — psychrometer reading
              </li>
              <li>
                <strong>tdb + g</strong> — design conditions
              </li>
              <li>
                <strong>tdb + h</strong> — energy calculations
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Plotting Air States"
            plainEnglish="Two known properties = one point on the chart = every other property in seconds."
          >
            <p>
              Any air state within the chart boundaries can be precisely located using two known
              properties. The intersection of the corresponding lines defines the state point.
            </p>
            <p>
              <strong>Step-by-Step Plotting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify the two known properties</li>
              <li>Locate the line for the first property</li>
              <li>Locate the line for the second property</li>
              <li>Mark the intersection point clearly</li>
              <li>Read all other properties from this point</li>
            </ul>
            <p>
              <strong>Example: Plotting 22°C db, 50% RH:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dry bulb:</strong> Given - vertical line at 22°C → reads 22°C
              </li>
              <li>
                <strong>Relative humidity:</strong> Given - curved 50% line → reads 50%
              </li>
              <li>
                <strong>Moisture content:</strong> Read horizontally to y-axis → reads 8.3 g/kg
              </li>
              <li>
                <strong>Wet bulb:</strong> Follow diagonal to saturation → reads 15.5°C
              </li>
              <li>
                <strong>Dew point:</strong> Move left horizontal to saturation → reads 11°C
              </li>
              <li>
                <strong>Enthalpy:</strong> Read from diagonal scale → reads 43 kJ/kg
              </li>
              <li>
                <strong>Specific volume:</strong> Interpolate between v lines → reads 0.845 m³/kg
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Plotting Processes"
            plainEnglish="Each AC process moves your point in a predictable direction. Heat right, cool left, humidify up, dehumidify down. Once you know the direction, you can plot the whole AHU."
          >
            <p>
              Air conditioning processes appear as lines connecting state points on the chart. Each
              type of process produces a characteristic direction of movement.
            </p>
            <p>
              <strong>Basic Process Directions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensible heating:</strong> Horizontal right →. tdb↑, RH↓, g constant
              </li>
              <li>
                <strong>Sensible cooling:</strong> Horizontal left ←. tdb↓, RH↑, g constant
              </li>
              <li>
                <strong>Humidification (isothermal):</strong> Vertical up ↑. g↑, RH↑, tdb constant
              </li>
              <li>
                <strong>Dehumidification:</strong> Vertical down ↓. g↓, RH↓, tdb constant
              </li>
              <li>
                <strong>Adiabatic humidification:</strong> Along wet bulb line ↙. g↑, tdb↓, h
                constant
              </li>
              <li>
                <strong>Cooling with dehumidification:</strong> Diagonal toward saturation ↙. tdb↓,
                g↓, follows coil
              </li>
              <li>
                <strong>Mixing two air streams:</strong> Straight line between states. Position by
                mass ratio
              </li>
            </ul>
            <p>
              <strong>Using Process Lines:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Plot initial state from known conditions</li>
              <li>Apply process direction rules</li>
              <li>Find final state from equipment capacity</li>
              <li>Calculate loads from property changes</li>
            </ul>
            <p>
              <strong>Typical AHU Sequence:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Outside air state (design condition)</li>
              <li>2. Mixed air (after recirculation)</li>
              <li>3. Off-coil state (after cooling/heating)</li>
              <li>4. Supply state (after fan heat gain)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Plot, read, mix, dehumidify — same chart, four different jobs."
          >
            <p>
              <strong>Example 1: Finding All Properties.</strong> A sling psychrometer reads 24°C
              dry bulb and 17°C wet bulb. Find RH, moisture content, dew point and enthalpy.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Plot the state point. Find vertical line at 24°C dry bulb. Find
              diagonal wet bulb line at 17°C. Mark intersection.</li>
              <li>Step 2: Read properties from intersection.</li>
              <li>
                RH (follow curved line): <strong>50%</strong>
              </li>
              <li>
                Moisture content (horizontal to y-axis): <strong>9.4 g/kg</strong>
              </li>
              <li>
                Dew point (horizontal left to saturation): <strong>13°C</strong>
              </li>
              <li>
                Enthalpy (from diagonal scale): <strong>48 kJ/kg</strong>
              </li>
              <li>
                Specific volume: <strong>0.855 m³/kg</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2: Sensible Heating Process.</strong> Air at 12°C, 70% RH is heated to
              22°C. Find the new RH and verify moisture content is unchanged.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Plot initial state (12°C, 70% RH). Read initial moisture content: 6.2
              g/kg.</li>
              <li>Step 2: Move horizontally to 22°C. Sensible heating = horizontal line (constant
              g).</li>
              <li>Step 3: Read final state at 22°C.</li>
              <li>
                New RH: <strong>38%</strong> (much lower)
              </li>
              <li>
                Moisture content: <strong>6.2 g/kg</strong> (unchanged ✓)
              </li>
              <li>Enthalpy increased from 27.5 to 37.5 kJ/kg</li>
            </ul>
            <p>
              <strong>Example 3: Mixing Two Air Streams.</strong> 3 kg/s of outside air (30°C, 60%
              RH) mixes with 7 kg/s of return air (24°C, 50% RH). Find the mixed condition.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Plot both states. Outside (O): 30°C, 60% RH → g = 16.0 g/kg. Return
              (R): 24°C, 50% RH → g = 9.4 g/kg.</li>
              <li>Step 2: Draw line between O and R.</li>
              <li>Step 3: Find mixed point (M) by lever rule. Mass ratio: 3:7 (outside:return). M
              is 3/10 of distance from R toward O.</li>
              <li>Step 4: Read mixed state properties.</li>
              <li>
                Mixed dry bulb: <strong>25.8°C</strong>
              </li>
              <li>
                Mixed moisture: <strong>11.4 g/kg</strong>
              </li>
              <li>
                Mixed RH: <strong>53%</strong>
              </li>
            </ul>
            <p>
              <strong>Example 4: Determining Dew Point for Condensation.</strong> Room air is 21°C,
              55% RH. What is the minimum surface temperature to avoid condensation?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Plot room condition (21°C, 55% RH). Moisture content from chart: 8.6
              g/kg.</li>
              <li>Step 2: Find dew point. Move horizontally left to saturation curve. Read
              temperature at intersection.</li>
              <li>
                Dew point = <strong>11.5°C</strong>
              </li>
              <li>Any surface at or below 11.5°C will have condensation. Keep surfaces above 12°C
              for safety margin.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="A few habits that turn chart-reading from guess work into a tool you trust."
          >
            <p>
              <strong>Chart Reading Tips:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use a sharp pencil and clear ruler</li>
              <li>Interpolate carefully between printed lines</li>
              <li>Check readings by using different property paths</li>
              <li>Mark state points clearly for process plotting</li>
            </ul>
            <p>
              <strong>Process Directions to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Horizontal</strong> = sensible heat only (g constant)
              </li>
              <li>
                <strong>Vertical</strong> = latent heat only (tdb constant)
              </li>
              <li>
                <strong>Along wet bulb line</strong> = adiabatic (h constant)
              </li>
              <li>
                <strong>Toward saturation</strong> = cooling coil operation
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Wrong chart pressure:</strong> Use sea level for UK lowlands
                </li>
                <li>
                  <strong>Confusing wet bulb and enthalpy lines:</strong> Nearly parallel but
                  distinct
                </li>
                <li>
                  <strong>Plotting above saturation:</strong> Not physically possible
                </li>
                <li>
                  <strong>Mixing line position:</strong> Divide by mass, not volume
                </li>
              </ul>
            }
            doInstead="Pick a chart matching your site's atmospheric pressure, treat wet bulb and enthalpy as related but separate scales, never plot above the saturation curve, and always apply the lever rule by mass flow not volume flow."
          />

          <SectionRule />

          <Scenario
            title="Plotting a return-air mixing AHU on the CIBSE chart"
            situation={
              <>
                You inherit a partial design for a 12,000 l/s mixed-air AHU serving a 4-floor
                office. The schematic shows 30% outside air at 32 °C, 60% RH (CIBSE summer
                design) mixed with 70% return air at 24 °C, 50% RH. The cooling coil is
                provisionally sized at 180 kW. You need to verify before tender.
              </>
            }
            whatToDo={
              <>
                Plot the outside-air state and the return-air state on the chart. Apply the
                lever rule (by mass flow, not volume): mixed point is 30% of the way from
                return to outside. Read the mixed-air enthalpy and moisture content. Plot the
                off-coil state from the supply temperature and required moisture content,
                read enthalpy. Calculate Q̇coil = ṁsupply × Δh. Compare to the
                provisional 180 kW.
              </>
            }
            whyItMatters={
              <>
                Sizing a cooling coil from sensible duty alone (ignoring latent load) typically
                undersizes it by 25–40% in the UK summer. The chart visualises both
                sensible and latent legs of the process — undeniable on a peer review and
                cheaper than swapping the coil after commissioning.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Two independent properties uniquely fix any air state on the chart — pick the pair that matches your data source.',
              'Horizontal axis = dry bulb (°C); vertical axis = moisture content (g/kg dry air).',
              'Saturation curve = 100% RH — no plot above it; constant-RH lines are curved parallels.',
              'Wet-bulb and enthalpy lines slope down-right; specific-volume lines slope slightly right of vertical.',
              'Sensible heating/cooling = horizontal; isothermal humidification = vertical; adiabatic humidification = along wet-bulb.',
              'Mixing two air streams = straight line; position by lever rule using mass flow ratio.',
              'CIBSE chart is constructed for 101.325 kPa — apply altitude correction above ~500 m or use a charted altitude variant.',
              'Annotate every AHU schematic with a psychrometric process trace — invaluable at commissioning and handover.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Humidity
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Air Conditioning Processes
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section3_3;
