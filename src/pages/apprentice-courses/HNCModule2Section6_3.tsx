import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building Simulation - HNC Module 2 Section 6.3";
const DESCRIPTION = "Master dynamic thermal simulation principles for building services: simulation methods, software capabilities, validation requirements, and understanding uncertainty in modelling results.";

const quickCheckQuestions = [
  {
    id: "dynamic-vs-steady",
    question: "What is the key advantage of dynamic simulation over steady-state calculation?",
    options: ["It's faster to compute", "It accounts for thermal mass and time-varying conditions", "It requires less input data", "It guarantees accurate results"],
    correctIndex: 1,
    explanation: "Dynamic simulation models the time-varying nature of building thermal behaviour, including heat storage in thermal mass, solar gain variations throughout the day, and the interaction between building fabric and HVAC systems over time."
  },
  {
    id: "timestep",
    question: "Why do dynamic simulations typically use hourly or sub-hourly timesteps?",
    options: ["To reduce computation time", "To capture rapid changes in weather, occupancy and plant operation", "Because Building Regulations require it", "To match utility billing periods"],
    correctIndex: 1,
    explanation: "Hourly or sub-hourly timesteps capture rapid variations in solar radiation, occupancy patterns, and HVAC system responses that significantly affect building performance but would be averaged out in daily calculations."
  },
  {
    id: "weather-file",
    question: "What type of weather data does a dynamic simulation typically require?",
    options: ["Average monthly temperatures only", "Peak summer and winter design conditions", "Hourly data for a full design year (8,760 hours)", "Real-time weather feeds"],
    correctIndex: 2,
    explanation: "Dynamic simulation requires hourly weather data (8,760 hours/year) including temperature, humidity, solar radiation, wind speed and direction to accurately model time-varying building performance."
  },
  {
    id: "validation",
    question: "Model validation is important because:",
    options: ["It reduces computation time", "It verifies that the model reasonably represents reality", "Building Regulations mandate it", "It eliminates all uncertainty"],
    correctIndex: 1,
    explanation: "Validation compares model outputs against measured data or analytical solutions to verify the model reasonably represents real building behaviour. Without validation, predictions may be unreliable."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which calculation method is required for Part L compliance in buildings over 1,000m²?",
    options: [
      "Steady-state U-value calculations",
      "CIBSE admittance method",
      "Dynamic simulation modelling (DSM)",
      "Degree-day analysis"
    ],
    correctAnswer: 2,
    explanation: "Part L requires Dynamic Simulation Modelling (DSM) using approved software for buildings over 1,000m² to demonstrate compliance with carbon emission targets."
  },
  {
    id: 2,
    question: "The 'response factor' method in simulation refers to:",
    options: [
      "How quickly occupants respond to temperature changes",
      "Pre-calculated transfer functions for heat flow through construction",
      "HVAC system control response time",
      "Time to reach steady-state conditions"
    ],
    correctAnswer: 1,
    explanation: "Response factor methods use pre-calculated transfer functions that relate heat flux through building elements to temperature history, enabling efficient computation of transient heat transfer."
  },
  {
    id: 3,
    question: "What does 'zoning' mean in building simulation?",
    options: [
      "Planning permission zones",
      "Dividing the building into areas with similar thermal conditions",
      "BMS control zone setup",
      "Fire compartmentation"
    ],
    correctAnswer: 1,
    explanation: "Zoning divides a building into thermal zones - areas assumed to have uniform air temperature. Correct zoning balances model accuracy (more zones) against complexity (fewer zones)."
  },
  {
    id: 4,
    question: "Which of these is NOT a typical input for a dynamic thermal simulation?",
    options: [
      "Construction U-values and thermal mass",
      "Hourly weather data",
      "Occupancy and equipment schedules",
      "Electricity tariff prices"
    ],
    correctAnswer: 3,
    explanation: "While energy costs may be calculated post-simulation, electricity tariff prices are not required inputs for thermal simulation. The model calculates energy consumption, which can then be costed separately."
  },
  {
    id: 5,
    question: "The 'Design Summer Year' (DSY) weather file represents:",
    options: [
      "Average summer conditions",
      "Extreme heat wave conditions",
      "A near-extreme summer for overheating assessment",
      "Summer solstice conditions"
    ],
    correctAnswer: 2,
    explanation: "The DSY represents a near-extreme summer (3rd hottest from 20-year dataset) used for overheating assessments under TM52/TM59 criteria, more severe than average but not extreme."
  },
  {
    id: 6,
    question: "What is 'parametric analysis' in building simulation?",
    options: [
      "Analysing building parameters like U-values",
      "Systematically varying inputs to understand their impact on outputs",
      "Using parameters instead of real data",
      "Calibrating the model to measured data"
    ],
    correctAnswer: 1,
    explanation: "Parametric analysis systematically varies input parameters (e.g., glazing type, insulation thickness) to understand sensitivity and optimise design decisions."
  },
  {
    id: 7,
    question: "Which statement about simulation uncertainty is correct?",
    options: [
      "Dynamic simulation eliminates uncertainty",
      "Uncertainty only comes from weather data",
      "Multiple sources contribute to uncertainty including inputs, algorithms, and assumptions",
      "Uncertainty is only relevant for academic research"
    ],
    correctAnswer: 2,
    explanation: "Simulation results are subject to uncertainty from multiple sources: input data quality, modelling assumptions, algorithm limitations, user decisions on zoning and schedules, and inherent variability in building operation."
  },
  {
    id: 8,
    question: "The CIBSE TM52 overheating criteria are assessed using:",
    options: [
      "Peak temperature only",
      "Hours above 28°C",
      "Three adaptive comfort criteria based on operative temperature",
      "Mean radiant temperature"
    ],
    correctAnswer: 2,
    explanation: "TM52 uses three criteria based on adaptive comfort theory: (1) hours of exceedance, (2) daily weighted exceedance, and (3) absolute temperature limit. All three must pass."
  },
  {
    id: 9,
    question: "What is 'co-simulation' in building energy modelling?",
    options: [
      "Two people running the same model",
      "Coupling different simulation tools to model interacting systems",
      "Simulating two buildings together",
      "Using both heating and cooling in one model"
    ],
    correctAnswer: 1,
    explanation: "Co-simulation couples different specialist tools (e.g., building thermal with HVAC controls, or CFD with energy model) to capture interactions that neither tool can model alone."
  },
  {
    id: 10,
    question: "When is CFD (Computational Fluid Dynamics) simulation warranted instead of standard dynamic simulation?",
    options: [
      "For all commercial buildings",
      "When detailed air movement patterns matter (atria, displacement ventilation)",
      "For Part L compliance",
      "For residential buildings only"
    ],
    correctAnswer: 1,
    explanation: "CFD models detailed air movement and is warranted for complex spaces (atria, naturally ventilated buildings), displacement ventilation, smoke control, or where air temperature stratification significantly affects comfort."
  },
  {
    id: 11,
    question: "What does 'model calibration' involve?",
    options: [
      "Checking the model runs without errors",
      "Adjusting model inputs to match measured data from an existing building",
      "Using default values from software libraries",
      "Comparing two different software packages"
    ],
    correctAnswer: 1,
    explanation: "Calibration adjusts model inputs (within reasonable ranges) so that outputs match measured data from the actual building. This is essential when modelling existing buildings for retrofit analysis."
  },
  {
    id: 12,
    question: "The 'Test Reference Year' (TRY) weather file is used for:",
    options: [
      "Peak load calculations only",
      "Annual energy consumption estimates representing typical conditions",
      "Extreme weather analysis",
      "Historic building assessments"
    ],
    correctAnswer: 1,
    explanation: "The TRY represents typical weather conditions (based on average months from multi-year data) and is used for annual energy consumption estimates rather than extreme condition assessments."
  }
];

const faqs = [
  {
    question: "When should I use dynamic simulation versus simpler calculation methods?",
    answer: "Use dynamic simulation when: thermal mass effects are significant; solar gains vary substantially through the day; cooling loads need accurate prediction; overheating risk must be assessed; Part L requires it (>1,000m²); or optimising mixed-mode/natural ventilation strategies. Simpler steady-state methods suffice for: heating load estimates in heavyweight buildings; early-stage design comparisons; or buildings where fabric losses dominate."
  },
  {
    question: "How accurate are dynamic simulation results?",
    answer: "Studies show calibrated models typically achieve ±10-15% accuracy compared to measured consumption. Uncalibrated design-stage models may show ±20-30% or more variation. Accuracy depends heavily on input data quality, appropriate zoning, realistic schedules, and correct HVAC system modelling. Single-point predictions should be treated with caution - consider results as indicative rather than precise."
  },
  {
    question: "What weather files should I use for different purposes?",
    answer: "For UK projects: TRY (Test Reference Year) for annual energy estimates; DSY (Design Summer Year) for overheating assessment; current and future DSYs for climate change analysis; and actual recorded weather for model calibration. CIBSE provides these for 14 UK locations. Always document which weather file was used."
  },
  {
    question: "How do I validate a simulation model?",
    answer: "Validation approaches include: analytical validation (comparing to known solutions for simple cases); inter-model comparison (checking results against other software); and empirical validation (comparing to measured data). For design models, focus on inter-model comparison and sensitivity analysis. For existing buildings, empirical validation against sub-metered data is essential."
  },
  {
    question: "What are the main limitations of building simulation?",
    answer: "Key limitations include: simplified occupant behaviour (schedules don't capture real variation); idealized controls (perfect response assumed); air flow approximations (single zone temperature); weather uncertainty (future ≠ historic); and construction quality assumptions (thermal bridges, air tightness). Understanding these limitations is essential for interpreting results appropriately."
  },
  {
    question: "How detailed should my model be?",
    answer: "Balance detail against purpose and time constraints. Part L compliance: follow NCM (National Calculation Methodology) conventions. Design optimisation: sufficient detail to capture options being compared. Energy estimates: detailed schedules and realistic HVAC efficiencies. Overheating: sub-hourly timesteps, accurate glazing data, night cooling strategies. More detail isn't always better - it increases time and error potential."
  }
];

const HNCModule2Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Simulation
          </h1>
          <p className="text-white/80">
            Dynamic thermal simulation principles, validation methods, and understanding modelling uncertainty
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Dynamic simulation:</strong> Models time-varying thermal behaviour</li>
              <li className="pl-1"><strong>Timestep:</strong> Hourly or sub-hourly for 8,760 hours/year</li>
              <li className="pl-1"><strong>Validation:</strong> Essential for confidence in results</li>
              <li className="pl-1"><strong>Uncertainty:</strong> Multiple sources affect accuracy</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">When Simulation is Required</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L:</strong> Buildings over 1,000m² (DSM)</li>
              <li className="pl-1"><strong>BREEAM:</strong> Various credits require simulation</li>
              <li className="pl-1"><strong>TM52/59:</strong> Overheating assessment</li>
              <li className="pl-1"><strong>Complex buildings:</strong> Atria, mixed-mode ventilation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the principles of dynamic thermal simulation",
              "Recognise when simulation is appropriate versus simpler methods",
              "Interpret simulation outputs critically",
              "Identify sources of uncertainty in modelling results",
              "Apply appropriate validation approaches",
              "Understand limitations of building simulation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Dynamic Simulation Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Dynamic Simulation Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dynamic thermal simulation models the time-varying thermal behaviour of buildings,
              accounting for heat storage in thermal mass, varying solar radiation, and the dynamic
              response of HVAC systems. This is essential for accurate cooling load and comfort prediction.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How Dynamic Simulation Works:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Timestep calculation:</strong> Solves heat balance equations at each timestep (typically hourly)</li>
                <li className="pl-1"><strong>Heat storage:</strong> Tracks energy stored in walls, floors, furniture</li>
                <li className="pl-1"><strong>Weather interaction:</strong> Applies hourly weather data (8,760 hours/year)</li>
                <li className="pl-1"><strong>Schedule-driven:</strong> Varies occupancy, lighting, equipment by hour</li>
                <li className="pl-1"><strong>System response:</strong> Models HVAC plant output and control</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Comparison: Steady-State vs Dynamic</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Steady-State</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dynamic Simulation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal mass</td>
                      <td className="border border-white/10 px-3 py-2">Ignored</td>
                      <td className="border border-white/10 px-3 py-2">Fully modelled</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Time variation</td>
                      <td className="border border-white/10 px-3 py-2">Single point in time</td>
                      <td className="border border-white/10 px-3 py-2">Full year simulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar gains</td>
                      <td className="border border-white/10 px-3 py-2">Peak or average</td>
                      <td className="border border-white/10 px-3 py-2">Hourly variation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Suitable for</td>
                      <td className="border border-white/10 px-3 py-2">Heating loads</td>
                      <td className="border border-white/10 px-3 py-2">Cooling, energy, comfort</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Computation</td>
                      <td className="border border-white/10 px-3 py-2">Simple, fast</td>
                      <td className="border border-white/10 px-3 py-2">Complex, slower</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Heat Balance Equation</p>
              <p className="font-mono text-center text-sm mb-2">Q<sub>stored</sub> = Q<sub>solar</sub> + Q<sub>internal</sub> + Q<sub>HVAC</sub> - Q<sub>fabric</sub> - Q<sub>ventilation</sub></p>
              <p className="text-xs text-white/70 text-center">Solved at each timestep for each thermal zone</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Dynamic simulation captures the time lag between when heat enters
              a building and when it affects indoor temperature - critical for understanding peak cooling times.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Software Capabilities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Software Capabilities and Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building simulation software ranges from compliance calculation tools to research-grade
              thermal modelling packages. Understanding capabilities helps select appropriate tools
              for different applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Simulation Capabilities</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Capability</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal zones</td>
                      <td className="border border-white/10 px-3 py-2">Multiple zones with heat transfer</td>
                      <td className="border border-white/10 px-3 py-2">All building simulations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC systems</td>
                      <td className="border border-white/10 px-3 py-2">Detailed plant modelling</td>
                      <td className="border border-white/10 px-3 py-2">Energy consumption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Natural ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Wind/stack-driven airflow</td>
                      <td className="border border-white/10 px-3 py-2">Mixed-mode buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daylighting</td>
                      <td className="border border-white/10 px-3 py-2">Daylight factor, glare</td>
                      <td className="border border-white/10 px-3 py-2">Lighting energy, comfort</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CFD coupling</td>
                      <td className="border border-white/10 px-3 py-2">Detailed air movement</td>
                      <td className="border border-white/10 px-3 py-2">Atria, displacement vent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential Simulation Inputs:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white/60 mb-2">Geometry & Construction</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Building geometry (3D model)</li>
                    <li>Construction layers and properties</li>
                    <li>Window specifications (U, g, VT)</li>
                    <li>Shading devices</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60 mb-2">Operations & Systems</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Occupancy schedules</li>
                    <li>Equipment and lighting loads</li>
                    <li>HVAC system configuration</li>
                    <li>Control setpoints and strategies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Weather Files for UK Simulation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>TRY:</strong> Test Reference Year - typical conditions for energy estimates</li>
                <li className="pl-1"><strong>DSY:</strong> Design Summer Year - near-extreme for overheating</li>
                <li className="pl-1"><strong>Future DSY:</strong> 2020s, 2050s, 2080s projections for climate change</li>
                <li className="pl-1"><strong>EPW format:</strong> Standard hourly format (8,760 hours)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Always document the weather file used - results are only meaningful
              in the context of the weather data applied.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Validation Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Validation and Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Validation confirms that a simulation model reasonably represents real building behaviour.
              Without validation, simulation results may mislead design decisions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Validation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Analytical</td>
                      <td className="border border-white/10 px-3 py-2">Compare to known mathematical solutions</td>
                      <td className="border border-white/10 px-3 py-2">Software testing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inter-model</td>
                      <td className="border border-white/10 px-3 py-2">Compare results between different tools</td>
                      <td className="border border-white/10 px-3 py-2">Design stage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Empirical</td>
                      <td className="border border-white/10 px-3 py-2">Compare to measured building data</td>
                      <td className="border border-white/10 px-3 py-2">Existing buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Calibration</td>
                      <td className="border border-white/10 px-3 py-2">Adjust inputs to match measurements</td>
                      <td className="border border-white/10 px-3 py-2">Retrofit analysis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ASHRAE Guideline 14 Calibration Criteria:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>NMBE:</strong> Normalised Mean Bias Error ≤ ±5% (monthly)</li>
                <li className="pl-1"><strong>CV(RMSE):</strong> Coefficient of Variation of RMSE ≤ 15% (monthly)</li>
                <li className="pl-1">Hourly data: NMBE ≤ ±10%, CV(RMSE) ≤ 30%</li>
                <li className="pl-1">Based on comparison with sub-metered data</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Assurance Checks</p>
              <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
                <li>Review zone areas and volumes against drawings</li>
                <li>Verify construction assignments</li>
                <li>Check schedules reflect realistic operation</li>
                <li>Confirm HVAC sizing and control logic</li>
                <li>Review warning messages from simulation</li>
                <li>Sense-check results against benchmarks</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A model that runs without errors is not necessarily a valid model.
              Critical review of inputs and outputs is essential.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Limitations and Uncertainty */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Understanding Limitations and Uncertainty
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All simulation results carry uncertainty. Understanding sources of uncertainty helps
              interpret results appropriately and communicate confidence levels to clients.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sources of Uncertainty</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Input data</td>
                      <td className="border border-white/10 px-3 py-2">Material properties, equipment loads</td>
                      <td className="border border-white/10 px-3 py-2">±10-20%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weather</td>
                      <td className="border border-white/10 px-3 py-2">Year-to-year variation</td>
                      <td className="border border-white/10 px-3 py-2">±10-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupancy</td>
                      <td className="border border-white/10 px-3 py-2">Actual vs assumed schedules</td>
                      <td className="border border-white/10 px-3 py-2">±15-30%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC modelling</td>
                      <td className="border border-white/10 px-3 py-2">Part-load performance, controls</td>
                      <td className="border border-white/10 px-3 py-2">±10-20%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">User decisions</td>
                      <td className="border border-white/10 px-3 py-2">Zoning, assumptions</td>
                      <td className="border border-white/10 px-3 py-2">±5-15%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Modelling Limitations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Perfect controls:</strong> Models assume controls work as intended</li>
                <li className="pl-1"><strong>Idealised occupants:</strong> Schedules don't capture behavioural variation</li>
                <li className="pl-1"><strong>Well-mixed air:</strong> Single temperature per zone assumed</li>
                <li className="pl-1"><strong>Construction quality:</strong> Assumes as-designed performance</li>
                <li className="pl-1"><strong>Future uncertainty:</strong> Climate, occupancy, use may change</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-2">Managing Uncertainty</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sensitivity analysis:</strong> Vary key inputs to understand impact</li>
                <li className="pl-1"><strong>Scenario modelling:</strong> High/medium/low cases</li>
                <li className="pl-1"><strong>Range reporting:</strong> Present results as ranges, not single values</li>
                <li className="pl-1"><strong>Benchmarking:</strong> Compare results to TM46 and similar buildings</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Professional responsibility:</strong> Communicate uncertainty to clients. Don't present
              simulation results with false precision - acknowledge the limitations of the analysis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Zoning Decision</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 2,000m² open-plan office has south and north facades. How should it be zoned?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Considerations:</p>
                <p>- South perimeter receives high solar gains</p>
                <p>- North perimeter has minimal solar</p>
                <p>- Core areas have no external exposure</p>
                <p className="mt-2">Recommended zoning:</p>
                <p>1. South perimeter zone (4-5m depth)</p>
                <p>2. North perimeter zone (4-5m depth)</p>
                <p>3. Core zone (remainder)</p>
                <p className="mt-2 text-white/60">→ Minimum 3 zones to capture different thermal conditions</p>
                <p className="mt-2">For TM52 assessment, may need finer perimeter</p>
                <p>zoning to identify worst-case locations</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Sensitivity Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> How do you present uncertainty in cooling load predictions?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Base case cooling load: 150 kW</p>
                <p className="mt-2">Sensitivity runs:</p>
                <p>- Small power +20%: 162 kW (+8%)</p>
                <p>- Small power -20%: 138 kW (-8%)</p>
                <p>- Occupancy +25%: 158 kW (+5%)</p>
                <p>- Weather DSY2080: 175 kW (+17%)</p>
                <p>- Infiltration doubled: 155 kW (+3%)</p>
                <p className="mt-2">Report as range:</p>
                <p className="text-green-400">Design cooling: 150 kW (range 135-175 kW)</p>
                <p className="mt-2 text-white/60">→ Small power and future climate have greatest impact</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Weather File Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Which weather files for a new London office assessment?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Analysis requirements and weather files:</p>
                <p className="mt-2">1. Annual energy estimate</p>
                <p className="text-green-400">   → London TRY (typical conditions)</p>
                <p className="mt-2">2. Part L compliance</p>
                <p className="text-green-400">   → London TRY (as per NCM)</p>
                <p className="mt-2">3. Overheating assessment (TM52)</p>
                <p className="text-green-400">   → London DSY1 (moderate warm year)</p>
                <p className="mt-2">4. Future-proofing assessment</p>
                <p className="text-green-400">   → London DSY1 2050s medium scenario</p>
                <p className="mt-2 text-white/60">Document weather files in report appendix</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Simulation Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Document all modelling assumptions clearly</li>
                <li className="pl-1">Record weather file and software version used</li>
                <li className="pl-1">Check energy balance (inputs ≈ outputs annually)</li>
                <li className="pl-1">Compare results to benchmarks as sanity check</li>
                <li className="pl-1">Present results as ranges, not single values</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Software Standards</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CIBSE AM11:</strong> Building energy and environmental modelling</li>
                <li className="pl-1"><strong>ASHRAE 140:</strong> Standard method of test for building simulation</li>
                <li className="pl-1"><strong>ASHRAE Guideline 14:</strong> Measurement and verification</li>
                <li className="pl-1"><strong>Part L NCM:</strong> National Calculation Methodology</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong weather file:</strong> TRY for energy, DSY for overheating</li>
                <li className="pl-1"><strong>Oversimplified zones:</strong> Missing perimeter/core distinction</li>
                <li className="pl-1"><strong>Default schedules:</strong> May not match actual operation</li>
                <li className="pl-1"><strong>Ignoring warnings:</strong> Unmet hours indicate undersizing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Weather Files</p>
                <ul className="space-y-0.5">
                  <li>TRY - typical year for energy</li>
                  <li>DSY - summer year for overheating</li>
                  <li>8,760 hours of hourly data</li>
                  <li>14 UK locations from CIBSE</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Validation Criteria</p>
                <ul className="space-y-0.5">
                  <li>NMBE ≤ ±5% (monthly)</li>
                  <li>CV(RMSE) ≤ 15% (monthly)</li>
                  <li>Compare to sub-metered data</li>
                  <li>Document all assumptions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6-4">
              Next: Design Tools and Software
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section6_3;
