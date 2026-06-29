/**
 * Module 2 · Section 6 · Subsection 3 — Building Simulation
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Dynamic thermal simulation, model validation, uncertainty bands and
 *   appropriate use cases — the analytical superpower the HNC engineer wields
 *   on TM52, Net-Zero and BREEAM Ene-04 submissions.
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

const TITLE = 'Building Simulation - HNC Module 2 Section 6.3';
const DESCRIPTION =
  'Master dynamic thermal simulation principles for building services: simulation methods, software capabilities, validation requirements, and understanding uncertainty in modelling results.';

const quickCheckQuestions = [
  {
    id: 'dynamic-vs-steady',
    question: 'What is the key advantage of dynamic simulation over steady-state calculation?',
    options: [
      'It runs much faster and needs far less input data',
      'It removes the need for weather data altogether',
      'It only requires a single peak design temperature',
      'It accounts for thermal mass and time-varying conditions',
    ],
    correctIndex: 3,
    explanation:
      'Dynamic simulation models the time-varying nature of building thermal behaviour, including heat storage in thermal mass, solar gain variations throughout the day, and the interaction between building fabric and HVAC systems over time.',
  },
  {
    id: 'timestep',
    question: 'Why do dynamic simulations typically use hourly or sub-hourly timesteps?',
    options: [
      'To keep the total run time as short as a steady-state calculation',
      'To match the annual billing period used by energy suppliers',
      'To capture rapid changes in weather, occupancy and plant operation',
      'To average out short-term variations into a single daily figure',
    ],
    correctIndex: 2,
    explanation:
      'Hourly or sub-hourly timesteps capture rapid variations in solar radiation, occupancy patterns, and HVAC system responses that significantly affect building performance but would be averaged out in daily calculations.',
  },
  {
    id: 'weather-file',
    question: 'What type of weather data does a dynamic simulation typically require?',
    options: [
      'Hourly data for a full design year (8,760 hours)',
      'A single peak outdoor design temperature for the location',
      'Monthly average temperatures for the previous calendar year',
      'The long-term annual mean temperature for the region',
    ],
    correctIndex: 0,
    explanation:
      'Dynamic simulation requires hourly weather data (8,760 hours/year) including temperature, humidity, solar radiation, wind speed and direction to accurately model time-varying building performance.',
  },
  {
    id: 'validation',
    question: 'Model validation is important because:',
    options: [
      'It guarantees the building will meet its design energy target exactly',
      'It removes all uncertainty from the simulation results',
      'It verifies that the model reasonably represents reality',
      'It allows the simulation to run without any input weather data',
    ],
    correctIndex: 2,
    explanation:
      'Validation compares model outputs against measured data or analytical solutions to verify the model reasonably represents real building behaviour. Without validation, predictions may be unreliable.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which calculation method is required for Part L compliance in buildings over 1,000m²?',
    options: [
      'Steady-state U-value calculations',
      'Dynamic simulation modelling (DSM)',
      'CIBSE admittance method',
      'Degree-day analysis',
    ],
    correctAnswer: 1,
    explanation:
      'Part L requires Dynamic Simulation Modelling (DSM) using approved software for buildings over 1,000m² to demonstrate compliance with carbon emission targets.',
  },
  {
    id: 2,
    question: "The 'response factor' method in simulation refers to:",
    options: [
      'A factor that scales results to match the building’s actual size',
      'The ratio of cooling load to heating load for a zone',
      'Pre-calculated transfer functions for heat flow through construction',
      'How quickly occupants respond to changes in room temperature',
    ],
    correctAnswer: 2,
    explanation:
      'Response factor methods use pre-calculated transfer functions that relate heat flux through building elements to temperature history, enabling efficient computation of transient heat transfer.',
  },
  {
    id: 3,
    question: "What does 'zoning' mean in building simulation?",
    options: [
      'Setting the planning use class for each part of the building',
      'Splitting the simulation into separate annual time periods',
      'Grouping similar buildings together for benchmarking',
      'Dividing the building into areas with similar thermal conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Zoning divides a building into thermal zones - areas assumed to have uniform air temperature. Correct zoning balances model accuracy (more zones) against complexity (fewer zones).',
  },
  {
    id: 4,
    question: 'Which of these is NOT a typical input for a dynamic thermal simulation?',
    options: [
      'Electricity tariff prices',
      'Hourly weather data',
      'Occupancy and equipment schedules',
      'Construction U-values and thermal mass',
    ],
    correctAnswer: 0,
    explanation:
      'While energy costs may be calculated post-simulation, electricity tariff prices are not required inputs for thermal simulation. The model calculates energy consumption, which can then be costed separately.',
  },
  {
    id: 5,
    question: "The 'Design Summer Year' (DSY) weather file represents:",
    options: [
      'Typical average conditions used for annual energy estimates',
      'A near-extreme summer for overheating assessment',
      'The single hottest day ever recorded at the location',
      'A future projected climate for the 2080s scenario',
    ],
    correctAnswer: 1,
    explanation:
      'The DSY represents a near-extreme summer (3rd hottest from 20-year dataset) used for overheating assessments under TM52/TM59 criteria, more severe than average but not extreme.',
  },
  {
    id: 6,
    question: "What is 'parametric analysis' in building simulation?",
    options: [
      'Analysing building parameters like U-values',
      'Using parameters instead of real data',
      'Systematically varying inputs to understand their impact on outputs',
      'Calibrating the model to measured data',
    ],
    correctAnswer: 2,
    explanation:
      'Parametric analysis systematically varies input parameters (e.g., glazing type, insulation thickness) to understand sensitivity and optimise design decisions.',
  },
  {
    id: 7,
    question: 'Which statement about simulation uncertainty is correct?',
    options: [
      'A model that runs without errors produces certain results',
      'Uncertainty comes only from the choice of weather file',
      'Calibrated models remove uncertainty entirely',
      'Multiple sources contribute to uncertainty including inputs, algorithms, and assumptions',
    ],
    correctAnswer: 3,
    explanation:
      'Simulation results are subject to uncertainty from multiple sources: input data quality, modelling assumptions, algorithm limitations, user decisions on zoning and schedules, and inherent variability in building operation.',
  },
  {
    id: 8,
    question: 'The CIBSE TM52 overheating criteria are assessed using:',
    options: [
      'Three adaptive comfort criteria based on operative temperature',
      'A single fixed indoor temperature limit of 28 °C',
      'Annual energy consumption against a benchmark target',
      'The number of hours air conditioning is switched on',
    ],
    correctAnswer: 0,
    explanation:
      'TM52 uses three criteria based on adaptive comfort theory: (1) hours of exceedance, (2) daily weighted exceedance, and (3) absolute temperature limit. All three must pass.',
  },
  {
    id: 9,
    question: "What is 'co-simulation' in building energy modelling?",
    options: [
      'Running the same model twice and averaging the two results',
      'Coupling different simulation tools to model interacting systems',
      'Simulating two identical buildings on neighbouring sites',
      'Sharing one model between several engineers at the same time',
    ],
    correctAnswer: 1,
    explanation:
      'Co-simulation couples different specialist tools (e.g., building thermal with HVAC controls, or CFD with energy model) to capture interactions that neither tool can model alone.',
  },
  {
    id: 10,
    question:
      'When is CFD (Computational Fluid Dynamics) simulation warranted instead of standard dynamic simulation?',
    options: [
      'For every Part L compliance calculation on small buildings',
      'When only annual energy totals are required',
      'When detailed air movement patterns matter (atria, displacement ventilation)',
      'Whenever a single thermal zone is sufficient for the space',
    ],
    correctAnswer: 2,
    explanation:
      'CFD models detailed air movement and is warranted for complex spaces (atria, naturally ventilated buildings), displacement ventilation, smoke control, or where air temperature stratification significantly affects comfort.',
  },
  {
    id: 11,
    question: "What does 'model calibration' involve?",
    options: [
      'Setting the simulation software clock to the correct time zone',
      'Checking the geometry matches the architect’s drawings',
      'Selecting the correct weather file for the location',
      'Adjusting model inputs to match measured data from an existing building',
    ],
    correctAnswer: 3,
    explanation:
      'Calibration adjusts model inputs (within reasonable ranges) so that outputs match measured data from the actual building. This is essential when modelling existing buildings for retrofit analysis.',
  },
  {
    id: 12,
    question: "The 'Test Reference Year' (TRY) weather file is used for:",
    options: [
      'Annual energy consumption estimates representing typical conditions',
      'Overheating assessments under TM52 and TM59 criteria',
      'Modelling a near-extreme summer for worst-case design',
      'Projecting future climate conditions for the 2050s',
    ],
    correctAnswer: 0,
    explanation:
      'The TRY represents typical weather conditions (based on average months from multi-year data) and is used for annual energy consumption estimates rather than extreme condition assessments.',
  },
];

const faqs = [
  {
    question: 'When should I use dynamic simulation versus simpler calculation methods?',
    answer:
      'Use dynamic simulation when: thermal mass effects are significant; solar gains vary substantially through the day; cooling loads need accurate prediction; overheating risk must be assessed; Part L requires it (>1,000m²); or optimising mixed-mode/natural ventilation strategies. Simpler steady-state methods suffice for: heating load estimates in heavyweight buildings; early-stage design comparisons; or buildings where fabric losses dominate.',
  },
  {
    question: 'How accurate are dynamic simulation results?',
    answer:
      'Studies show calibrated models typically achieve ±10-15% accuracy compared to measured consumption. Uncalibrated design-stage models may show ±20-30% or more variation. Accuracy depends heavily on input data quality, appropriate zoning, realistic schedules, and correct HVAC system modelling. Single-point predictions should be treated with caution - consider results as indicative rather than precise.',
  },
  {
    question: 'What weather files should I use for different purposes?',
    answer:
      'For UK projects: TRY (Test Reference Year) for annual energy estimates; DSY (Design Summer Year) for overheating assessment; current and future DSYs for climate change analysis; and actual recorded weather for model calibration. CIBSE provides these for 14 UK locations. Always document which weather file was used.',
  },
  {
    question: 'How do I validate a simulation model?',
    answer:
      'Validation approaches include: analytical validation (comparing to known solutions for simple cases); inter-model comparison (checking results against other software); and empirical validation (comparing to measured data). For design models, focus on inter-model comparison and sensitivity analysis. For existing buildings, empirical validation against sub-metered data is essential.',
  },
  {
    question: 'What are the main limitations of building simulation?',
    answer:
      "Key limitations include: simplified occupant behaviour (schedules don't capture real variation); idealized controls (perfect response assumed); air flow approximations (single zone temperature); weather uncertainty (future ≠ historic); and construction quality assumptions (thermal bridges, air tightness). Understanding these limitations is essential for interpreting results appropriately.",
  },
  {
    question: 'How detailed should my model be?',
    answer:
      "Balance detail against purpose and time constraints. Part L compliance: follow NCM (National Calculation Methodology) conventions. Design optimisation: sufficient detail to capture options being compared. Energy estimates: detailed schedules and realistic HVAC efficiencies. Overheating: sub-hourly timesteps, accurate glazing data, night cooling strategies. More detail isn't always better - it increases time and error potential.",
  },
];

const HNCModule2Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 3"
            title="Building Simulation"
            description="Dynamic thermal simulation principles, validation methods, and understanding modelling uncertainty."
            tone="purple"
          />

          <TLDR
            points={[
              'You decide when dynamic simulation is justified (overheating, mass-coupled designs, complex HVAC) versus when steady-state is fine (single-zone heating load).',
              'You understand the underlying time-step heat balance: zone air node + multiple surface nodes + HVAC schedule, all solved hourly or sub-hourly.',
              'You build calibrated models (CIBSE TM63 / ASHRAE Guideline 14) so the dynamic output is defendable against measured data.',
              'You quantify and communicate uncertainty bands — single-point predictions are dangerous in tender review.',
            ]}
          />

          <RegsCallout
            source="CIBSE AM11 — Building Performance Modelling and TM63 — Operational Performance"
            clause="AM11 sets the methodology for building performance simulation, model construction, calibration and reporting; TM63 sets the standard for in-use performance verification through measurement."
            meaning={
              <>
                CIBSE AM11 + TM63 frame the design-to-operation workflow. As HNC engineer
                you cite AM11 to justify the simulation tool choice, the input assumptions
                and the calibration approach — and TM63 to commit to post-handover
                performance verification.
              </>
            }
            cite="Source: CIBSE AM11 Building Performance Modelling; CIBSE TM63 Operational Performance: Building Performance Modelling and Calibration; ASHRAE Guideline 14 Measurement of Energy and Demand Savings."
          />

          <LearningOutcomes
            outcomes={[
              'Understand the principles of dynamic thermal simulation',
              'Recognise when simulation is appropriate versus simpler methods',
              'Interpret simulation outputs critically',
              'Identify sources of uncertainty in modelling results',
              'Apply appropriate validation approaches',
              'Understand limitations of building simulation',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Dynamic Simulation Principles"
            plainEnglish="Dynamic simulation solves the heat balance hour by hour for a whole year. It captures thermal mass, solar swings, and HVAC interaction - things steady-state can't see."
          >
            <p>
              Dynamic thermal simulation models the time-varying thermal behaviour of buildings,
              accounting for heat storage in thermal mass, varying solar radiation, and the dynamic
              response of HVAC systems. This is essential for accurate cooling load and comfort
              prediction.
            </p>
            <p>
              <strong>How dynamic simulation works:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Timestep calculation:</strong> Solves heat balance equations at each timestep (typically hourly)
              </li>
              <li>
                <strong>Heat storage:</strong> Tracks energy stored in walls, floors, furniture
              </li>
              <li>
                <strong>Weather interaction:</strong> Applies hourly weather data (8,760 hours/year)
              </li>
              <li>
                <strong>Schedule-driven:</strong> Varies occupancy, lighting, equipment by hour
              </li>
              <li>
                <strong>System response:</strong> Models HVAC plant output and control
              </li>
            </ul>
            <p>
              <strong>Comparison: steady-state vs dynamic simulation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermal mass:</strong> Steady-state ignored; dynamic fully modelled
              </li>
              <li>
                <strong>Time variation:</strong> Steady-state single point in time; dynamic full year
              </li>
              <li>
                <strong>Solar gains:</strong> Steady-state peak or average; dynamic hourly variation
              </li>
              <li>
                <strong>Suitable for:</strong> Steady-state heating loads; dynamic cooling, energy, comfort
              </li>
              <li>
                <strong>Computation:</strong> Steady-state simple/fast; dynamic complex/slower
              </li>
            </ul>
            <p>
              <strong>The heat balance equation:</strong> Q_stored = Q_solar + Q_internal + Q_HVAC
              - Q_fabric - Q_ventilation. Solved at each timestep for each thermal zone.
            </p>
            <p>
              <strong>Key insight:</strong> Dynamic simulation captures the time lag between when
              heat enters a building and when it affects indoor temperature - critical for
              understanding peak cooling times.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Software Capabilities and Requirements"
            plainEnglish="Software ranges from compliance calculators to full physics. Match the tool to the question - and make sure you've got the inputs to feed it."
          >
            <p>
              Building simulation software ranges from compliance calculation tools to
              research-grade thermal modelling packages. Understanding capabilities helps select
              appropriate tools for different applications.
            </p>
            <p>
              <strong>Typical simulation capabilities (capability / description / typical use):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Thermal zones - multiple zones with heat transfer - all building simulations</li>
              <li>HVAC systems - detailed plant modelling - energy consumption</li>
              <li>Natural ventilation - wind/stack-driven airflow - mixed-mode buildings</li>
              <li>Daylighting - daylight factor, glare - lighting energy, comfort</li>
              <li>CFD coupling - detailed air movement - atria, displacement vent</li>
            </ul>
            <p>
              <strong>Essential simulation inputs - geometry &amp; construction:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building geometry (3D model)</li>
              <li>Construction layers and properties</li>
              <li>Window specifications (U, g, VT)</li>
              <li>Shading devices</li>
            </ul>
            <p>
              <strong>Essential inputs - operations &amp; systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Occupancy schedules</li>
              <li>Equipment and lighting loads</li>
              <li>HVAC system configuration</li>
              <li>Control setpoints and strategies</li>
            </ul>
            <p>
              <strong>Weather files for UK simulation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TRY:</strong> Test Reference Year - typical conditions for energy estimates
              </li>
              <li>
                <strong>DSY:</strong> Design Summer Year - near-extreme for overheating
              </li>
              <li>
                <strong>Future DSY:</strong> 2020s, 2050s, 2080s projections for climate change
              </li>
              <li>
                <strong>EPW format:</strong> Standard hourly format (8,760 hours)
              </li>
            </ul>
            <p>
              <strong>Practical tip:</strong> Always document the weather file used - results are
              only meaningful in the context of the weather data applied.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Validation and Verification"
            plainEnglish="A model that runs is not a model that's right. Validation - against analytics, other tools, or measured data - tells you whether you can trust the answer."
          >
            <p>
              Validation confirms that a simulation model reasonably represents real building
              behaviour. Without validation, simulation results may mislead design decisions.
            </p>
            <p>
              <strong>Types of validation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Analytical:</strong> Compare to known mathematical solutions - software testing
              </li>
              <li>
                <strong>Inter-model:</strong> Compare results between different tools - design stage
              </li>
              <li>
                <strong>Empirical:</strong> Compare to measured building data - existing buildings
              </li>
              <li>
                <strong>Calibration:</strong> Adjust inputs to match measurements - retrofit analysis
              </li>
            </ul>
            <p>
              <strong>ASHRAE Guideline 14 calibration criteria:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NMBE:</strong> Normalised Mean Bias Error ≤ ±5% (monthly)
              </li>
              <li>
                <strong>CV(RMSE):</strong> Coefficient of Variation of RMSE ≤ 15% (monthly)
              </li>
              <li>Hourly data: NMBE ≤ ±10%, CV(RMSE) ≤ 30%</li>
              <li>Based on comparison with sub-metered data</li>
            </ul>
            <p>
              <strong>Quality assurance checks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review zone areas and volumes against drawings</li>
              <li>Verify construction assignments</li>
              <li>Check schedules reflect realistic operation</li>
              <li>Confirm HVAC sizing and control logic</li>
              <li>Review warning messages from simulation</li>
              <li>Sense-check results against benchmarks</li>
            </ul>
            <p>
              <strong>Remember:</strong> A model that runs without errors is not necessarily a valid
              model. Critical review of inputs and outputs is essential.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Understanding Limitations and Uncertainty"
            plainEnglish="Simulation results aren't single-point truth - they're a band shaped by inputs, weather, occupancy and your own modelling choices. Quote ranges, not decimals."
          >
            <p>
              All simulation results carry uncertainty. Understanding sources of uncertainty helps
              interpret results appropriately and communicate confidence levels to clients.
            </p>
            <p>
              <strong>Sources of uncertainty (source / examples / typical impact):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Input data - material properties, equipment loads - ±10-20%</li>
              <li>Weather - year-to-year variation - ±10-15%</li>
              <li>Occupancy - actual vs assumed schedules - ±15-30%</li>
              <li>HVAC modelling - part-load performance, controls - ±10-20%</li>
              <li>User decisions - zoning, assumptions - ±5-15%</li>
            </ul>
            <p>
              <strong>Key modelling limitations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Perfect controls:</strong> Models assume controls work as intended
              </li>
              <li>
                <strong>Idealised occupants:</strong> Schedules don't capture behavioural variation
              </li>
              <li>
                <strong>Well-mixed air:</strong> Single temperature per zone assumed
              </li>
              <li>
                <strong>Construction quality:</strong> Assumes as-designed performance
              </li>
              <li>
                <strong>Future uncertainty:</strong> Climate, occupancy, use may change
              </li>
            </ul>
            <p>
              <strong>Managing uncertainty:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensitivity analysis:</strong> Vary key inputs to understand impact
              </li>
              <li>
                <strong>Scenario modelling:</strong> High/medium/low cases
              </li>
              <li>
                <strong>Range reporting:</strong> Present results as ranges, not single values
              </li>
              <li>
                <strong>Benchmarking:</strong> Compare results to TM46 and similar buildings
              </li>
            </ul>
            <p>
              <strong>Professional responsibility:</strong> Communicate uncertainty to clients.
              Don't present simulation results with false precision - acknowledge the limitations of
              the analysis.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three walk-throughs covering thermal zoning, sensitivity analysis on cooling load, and weather file selection by analysis purpose."
          >
            <p>
              <strong>Example 1 - Zoning decision:</strong> A 2,000m² open-plan office has south
              and north facades. How should it be zoned?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>South perimeter receives high solar gains</li>
              <li>North perimeter has minimal solar</li>
              <li>Core areas have no external exposure</li>
              <li>Recommended zoning: south perimeter zone (4-5m depth), north perimeter zone (4-5m depth), core zone (remainder)</li>
              <li>Minimum 3 zones to capture different thermal conditions</li>
              <li>For TM52 assessment, may need finer perimeter zoning to identify worst-case locations</li>
            </ul>
            <p>
              <strong>Example 2 - Sensitivity analysis:</strong> How do you present uncertainty in
              cooling load predictions?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Base case cooling load: 150 kW</li>
              <li>Small power +20%: 162 kW (+8%)</li>
              <li>Small power -20%: 138 kW (-8%)</li>
              <li>Occupancy +25%: 158 kW (+5%)</li>
              <li>Weather DSY2080: 175 kW (+17%)</li>
              <li>Infiltration doubled: 155 kW (+3%)</li>
              <li>Report as range: <strong>Design cooling: 150 kW (range 135-175 kW)</strong></li>
              <li>Small power and future climate have greatest impact</li>
            </ul>
            <p>
              <strong>Example 3 - Weather file selection:</strong> Which weather files for a new
              London office assessment?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Annual energy estimate → London TRY (typical conditions)</li>
              <li>2. Part L compliance → London TRY (as per NCM)</li>
              <li>3. Overheating assessment (TM52) → London DSY1 (moderate warm year)</li>
              <li>4. Future-proofing assessment → London DSY1 2050s medium scenario</li>
              <li>Document weather files in report appendix</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The standards, validation criteria and reporting habits that separate a defensible model from a black box."
          >
            <p>
              <strong>Simulation best practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Document all modelling assumptions clearly</li>
              <li>Record weather file and software version used</li>
              <li>Check energy balance (inputs ≈ outputs annually)</li>
              <li>Compare results to benchmarks as sanity check</li>
              <li>Present results as ranges, not single values</li>
            </ul>
            <p>
              <strong>Key software standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CIBSE AM11:</strong> Building energy and environmental modelling
              </li>
              <li>
                <strong>ASHRAE 140:</strong> Standard method of test for building simulation
              </li>
              <li>
                <strong>ASHRAE Guideline 14:</strong> Measurement and verification
              </li>
              <li>
                <strong>Part L NCM:</strong> National Calculation Methodology
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Wrong weather file:</strong> TRY for energy, DSY for overheating
                </li>
                <li>
                  <strong>Oversimplified zones:</strong> Missing perimeter/core distinction
                </li>
                <li>
                  <strong>Default schedules:</strong> May not match actual operation
                </li>
                <li>
                  <strong>Ignoring warnings:</strong> Unmet hours indicate undersizing
                </li>
              </ul>
            }
            doInstead="Pick the weather file by purpose (TRY for energy, DSY for overheating), zone perimeter and core separately, replace default schedules with project-specific ones, and investigate every unmet-hours warning before signing off the run."
          />

          <SectionRule />

          <Scenario
            title="Dynamic simulation supporting a TM52 overheating planning condition"
            situation={
              <>
                A 14-storey office in Manchester is going to planning. The local plan
                requires a CIBSE TM52 overheating assessment using a 2050s DSY weather
                file. The architect&rsquo;s envelope (50% glazing, g = 0.45) and the
                proposed mixed-mode HVAC need to be tested.
              </>
            }
            whatToDo={
              <>
                Build a multi-zone dynamic model in IES VE / DesignBuilder / TAS. Set
                weather to DSY1 Manchester 2050s. Apply CIBSE Guide A occupancy and gain
                profiles. Model the mixed-mode HVAC: natural ventilation 19–24 °C,
                mechanical cooling cut-in at 24 °C. Run TM52 Criteria A, B, C across
                worst-case zones (south-west aspect, top floor). Where any zone fails two
                of three criteria, iterate: external shading, lower g-value, increased
                openable area, mechanical cooling extension. Document in the TM52 report.
              </>
            }
            whyItMatters={
              <>
                Manchester planning explicitly requires TM52 evidence for new commercial
                buildings &gt; 1,000 m². A TM52 fail blocks consent. Once consented and
                built, an overheating-prone office becomes a leasing problem within five
                years as climate warms. The dynamic simulation is the design-stage insurance.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Dynamic simulation = hourly (or sub-hourly) heat balance for each thermal zone, all year.',
              'Use cases: overheating studies, thermal-mass designs, mixed-mode HVAC, BREEAM Ene-04, TM54 forecasts.',
              'Tools: IES VE, DesignBuilder, TAS, EnergyPlus — pick one supported by AM11 and validated to BESTEST.',
              'Inputs to control carefully: weather file (DSY/TRY), occupancy/equipment profiles, infiltration, HVAC schedule.',
              'Calibrate against measured data per CIBSE TM63 / ASHRAE Guideline 14 (CV(RMSE) ≤ 30% monthly).',
              'Communicate uncertainty bands — single-point output is misleading.',
              'Dynamic simulation is not a Part L compliance tool — that role belongs to SBEM/SAP.',
              'CIBSE AM11 + TM63 are the UK reference methodology for modelling and operational verification.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Energy analysis
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Design tools and software
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section6_3;
