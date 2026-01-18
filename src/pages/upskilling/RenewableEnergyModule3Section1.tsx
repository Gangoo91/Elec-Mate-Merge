import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wind Generation Principles and Power Curves - Renewable Energy Module 3";
const DESCRIPTION = "Learn the science behind wind energy conversion, power curves, capacity factors, and turbine performance evaluation for UK renewable energy installations.";

const quickCheckQuestions = [
  {
    id: "wind-betz-limit",
    question: "What is the maximum theoretical efficiency that a wind turbine can achieve (Betz limit)?",
    options: ["45.3%", "59.3%", "75.5%", "85.0%"],
    correctIndex: 1,
    explanation: "The Betz limit states that no wind turbine can capture more than 59.3% of the kinetic energy in wind. Modern turbines typically achieve 35-45% under optimal conditions."
  },
  {
    id: "wind-power-relationship",
    question: "How does wind power relate to wind speed?",
    options: ["Linear relationship (doubles with speed)", "Square relationship (quadruples when speed doubles)", "Cubic relationship (increases 8x when speed doubles)", "Logarithmic relationship"],
    correctIndex: 2,
    explanation: "Wind power has a cubic relationship with wind speed (P proportional to V cubed). This means doubling wind speed increases available power by 8 times, making site selection critical."
  },
  {
    id: "wind-cut-in-speed",
    question: "What is the typical cut-in wind speed for modern commercial wind turbines?",
    options: ["1-2 m/s", "3-4 m/s", "6-7 m/s", "10-12 m/s"],
    correctIndex: 1,
    explanation: "Most modern commercial wind turbines have a cut-in speed of 3-4 m/s, which is when they begin generating electricity. Below this speed, wind energy cannot overcome system losses."
  },
  {
    id: "wind-capacity-factor",
    question: "What capacity factor do UK offshore wind farms typically achieve?",
    options: ["15-25%", "25-35%", "40-50%", "60-70%"],
    correctIndex: 2,
    explanation: "UK offshore wind farms typically achieve 40-50% capacity factors due to consistent, strong offshore winds. Onshore installations typically achieve 25-35%."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a power curve primarily used for in wind energy?",
    options: [
      "To measure wind direction changes",
      "To predict electrical output at different wind speeds",
      "To calculate maintenance costs",
      "To determine blade rotation speed"
    ],
    correctAnswer: 1,
    explanation: "A power curve shows the relationship between wind speed and electrical power output, allowing engineers to predict energy generation and assess turbine performance under various wind conditions."
  },
  {
    id: 2,
    question: "What is the power equation for wind energy extraction?",
    options: [
      "P = V x A",
      "P = 0.5 x rho x A x V squared",
      "P = 0.5 x rho x A x V cubed x Cp",
      "P = mass x acceleration"
    ],
    correctAnswer: 2,
    explanation: "The wind power equation is P = 0.5 x rho x A x V cubed x Cp, where rho is air density, A is swept area, V is wind speed, and Cp is the power coefficient."
  },
  {
    id: 3,
    question: "What does 'capacity factor' represent in wind generation?",
    options: [
      "Maximum power output of the turbine",
      "Ratio of actual energy output to theoretical maximum over a period",
      "Number of turbines in a wind farm",
      "Wind speed measurement accuracy"
    ],
    correctAnswer: 1,
    explanation: "Capacity factor is the ratio of actual energy output to the theoretical maximum if the turbine operated at rated power continuously. UK offshore wind farms typically achieve 40-50% capacity factors."
  },
  {
    id: 4,
    question: "How does blade length affect energy capture in wind turbines?",
    options: [
      "Longer blades capture less energy due to weight",
      "Blade length has no effect on energy capture",
      "Longer blades sweep a larger area, capturing more wind energy",
      "Shorter blades are always more efficient"
    ],
    correctAnswer: 2,
    explanation: "Longer blades sweep a larger circular area, following the relationship Power proportional to D squared (where D is rotor diameter). Modern offshore turbines use blades over 100m long to maximise energy capture."
  },
  {
    id: 5,
    question: "What happens when wind speed exceeds the cut-out speed?",
    options: [
      "The turbine generates maximum power",
      "The turbine shuts down for safety protection",
      "Power output continues to increase",
      "The turbine switches to backup power"
    ],
    correctAnswer: 1,
    explanation: "Above cut-out speed (typically 20-25 m/s), turbines automatically shut down to prevent damage from excessive forces. Advanced systems use blade pitching and braking to safely stop rotation."
  },
  {
    id: 6,
    question: "What effect does air density have on wind turbine output?",
    options: [
      "No effect on output",
      "Denser air provides more power",
      "Denser air reduces power output",
      "Only affects blade rotation speed"
    ],
    correctAnswer: 1,
    explanation: "Denser air provides more kinetic energy and therefore more power. Cold air is denser than warm air, which is why wind turbines often perform better in winter conditions."
  },
  {
    id: 7,
    question: "What is the typical rated wind speed for commercial wind turbines?",
    options: [
      "5-8 m/s",
      "12-16 m/s",
      "20-25 m/s",
      "30-35 m/s"
    ],
    correctAnswer: 1,
    explanation: "Rated wind speed is typically 12-16 m/s for commercial turbines. At this speed, the turbine achieves its maximum rated power output and uses pitch control to maintain constant power at higher speeds."
  },
  {
    id: 8,
    question: "What does wind shear describe?",
    options: [
      "Turbine blade stress",
      "Change in wind speed with height above ground",
      "Wind direction variability",
      "Turbine foundation forces"
    ],
    correctAnswer: 1,
    explanation: "Wind shear describes how wind speed increases with height above ground. This is why taller turbines access stronger winds. The shear exponent is typically 0.1-0.2 offshore and 0.2-0.4 onshore."
  },
  {
    id: 9,
    question: "What is the purpose of Maximum Power Point Tracking (MPPT) in wind turbines?",
    options: [
      "Track wind direction",
      "Optimise rotor speed for maximum power extraction",
      "Monitor grid frequency",
      "Calculate maintenance schedules"
    ],
    correctAnswer: 1,
    explanation: "MPPT optimises rotor speed to extract maximum power at each wind speed by maintaining the optimal tip speed ratio, ensuring the turbine operates at peak efficiency across the operating range."
  },
  {
    id: 10,
    question: "What information does a wind rose diagram provide?",
    options: [
      "Only wind speed data",
      "Wind direction and frequency distribution",
      "Turbine power output curves",
      "Monthly energy production"
    ],
    correctAnswer: 1,
    explanation: "A wind rose shows the frequency and strength of winds from different directions at a site, essential for turbine placement and yaw system design to maximise energy capture."
  }
];

const faqs = [
  {
    question: "Why is the cubic relationship between wind speed and power so important?",
    answer: "The cubic relationship means small changes in wind speed create large changes in power output. A site with 8 m/s average wind produces nearly 2.4 times more energy than a 6 m/s site. This makes accurate wind resource assessment critical for project viability and explains why offshore locations with higher winds are increasingly attractive despite higher costs."
  },
  {
    question: "How do modern turbines maintain constant power above rated wind speed?",
    answer: "Above rated wind speed, turbines use active pitch control to rotate the blades, reducing the angle of attack and limiting power capture. This keeps power output constant at rated capacity while protecting the turbine from excessive mechanical loads until cut-out speed is reached."
  },
  {
    question: "What factors affect air density at a wind farm site?",
    answer: "Air density varies with altitude (decreasing approximately 1.2% per 100m elevation), temperature (cold air is denser), humidity (moist air is slightly less dense), and atmospheric pressure. These factors are corrected when applying manufacturer power curves to specific site conditions."
  },
  {
    question: "How is Annual Energy Production (AEP) calculated for a wind farm?",
    answer: "AEP is calculated by combining the site's wind speed distribution (typically Weibull) with the turbine power curve, then applying loss factors for wake effects, electrical losses, availability, and environmental factors. P50 represents expected production while P90 (90% exceedance probability) is typically used for financing."
  },
  {
    question: "What causes wake effects in wind farms and how are they managed?",
    answer: "Wake effects occur when upstream turbines reduce wind speed and increase turbulence for downstream turbines. Wake losses typically range from 5-15% depending on spacing and layout. Modern wind farm design uses computational fluid dynamics and operational wake steering to minimise these effects."
  },
  {
    question: "Why do offshore wind farms achieve higher capacity factors than onshore?",
    answer: "Offshore locations benefit from higher average wind speeds (20-40% higher than onshore), lower turbulence due to smooth sea surface, and more consistent wind patterns. Combined with larger turbines uncontrained by transport limitations, offshore farms achieve 45-55% capacity factors compared to 25-35% onshore."
  }
];

const RenewableEnergyModule3Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wind Generation Principles and Power Curves
          </h1>
          <p className="text-white/80">
            Understanding wind energy conversion, power curve analysis, and turbine performance assessment
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Betz limit:</strong> 59.3% max theoretical efficiency</li>
              <li><strong>Power:</strong> Proportional to wind speed cubed</li>
              <li><strong>Cut-in:</strong> 3-4 m/s typical for modern turbines</li>
              <li><strong>Cut-out:</strong> 20-25 m/s for safety protection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">UK Performance</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Onshore:</strong> 25-35% capacity factor</li>
              <li><strong>Offshore:</strong> 40-50% capacity factor</li>
              <li><strong>Best offshore:</strong> &gt;55% at optimal sites</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand fundamental principles of wind energy conversion",
              "Learn to interpret power curves and performance metrics",
              "Calculate capacity factors and energy yields",
              "Apply the Betz limit to real-world turbine efficiency",
              "Understand environmental factors affecting performance",
              "Evaluate advanced control systems and grid integration"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Aerodynamic Principles of Wind Energy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wind turbines convert kinetic energy from moving air into rotational mechanical energy through aerodynamic principles. The rotating blades drive a generator to produce electricity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Betz's Law and Theoretical Limits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Maximum efficiency:</strong> 59.3% (Betz limit) of wind energy can theoretically be extracted</li>
                <li><strong>Real-world efficiency:</strong> Modern turbines achieve 35-45% under optimal conditions</li>
                <li><strong>Key insight:</strong> Power increases with the cube of wind speed</li>
                <li><strong>Swept area importance:</strong> Doubling blade length quadruples power capture potential</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Wind Energy Formula:</p>
              <p className="text-white text-sm mb-2"><strong>P = 0.5 x rho x A x V cubed x Cp</strong></p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>P:</strong> Power output (Watts)</li>
                <li><strong>rho:</strong> Air density (kg/m cubed) - varies with altitude, temperature, humidity</li>
                <li><strong>A:</strong> Swept area (m squared) - pi x radius squared</li>
                <li><strong>V:</strong> Wind speed (m/s) - most critical factor due to cubic relationship</li>
                <li><strong>Cp:</strong> Power coefficient - efficiency factor (max 0.593)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Lift and Drag Forces:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Angle of attack:</strong> Critical for optimising lift-to-drag ratio</li>
                <li><strong>Pitch control:</strong> Active blade angle adjustment for performance optimisation</li>
                <li><strong>Tip speed ratio:</strong> Optimal relationship between blade tip speed and wind speed</li>
                <li><strong>Stall prevention:</strong> Managing airflow separation at high angles of attack</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Power Curves
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power curves are fundamental tools for predicting wind turbine performance across different wind conditions. They show the relationship between wind speed and electrical output.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cut-in Wind Speed (3-4 m/s typical):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Minimum speed for electricity generation to begin</li>
                <li>Below cut-in, turbine remains stationary to avoid wear</li>
                <li>Automated systems monitor wind conditions for start-up</li>
                <li>Grid synchronisation occurs before power export</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Rated Wind Speed (12-16 m/s typical):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Turbine achieves rated (maximum) electrical output</li>
                <li>Blade pitch control begins active angle adjustment</li>
                <li>Output maintained constant despite higher wind speeds</li>
                <li>Design optimisation matched to local wind resource</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cut-out Wind Speed (20-25 m/s typical):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Emergency shutdown sequence activates for safety protection</li>
                <li>Mechanical and aerodynamic braking systems engage</li>
                <li>Blade feathering reduces aerodynamic load</li>
                <li>Wind must drop below reset threshold before restart</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Environmental Factors Affecting Performance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multiple environmental factors significantly influence wind turbine performance and must be considered in system design and energy prediction.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Air Density Effects:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Altitude impact:</strong> Density decreases approximately 1.2% per 100m elevation</li>
                <li><strong>Temperature effect:</strong> Cold air is denser, providing more power</li>
                <li><strong>Humidity influence:</strong> Moist air is less dense than dry air</li>
                <li><strong>Seasonal variation:</strong> Winter typically provides higher air density</li>
                <li><strong>Correction factors:</strong> Power curves adjusted for local conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wind Shear and Turbulence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wind shear:</strong> Speed increases with height above ground</li>
                <li><strong>Shear exponent:</strong> Typically 0.1-0.2 for offshore, 0.2-0.4 onshore</li>
                <li><strong>Turbulence intensity:</strong> Affects fatigue loading and performance</li>
                <li><strong>Wake effects:</strong> Downstream turbines experience reduced wind</li>
                <li><strong>Site assessment:</strong> Detailed wind measurement campaigns required</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Capacity Factor and Yield Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Capacity factor and energy yield assessments are critical metrics for evaluating wind project viability and predicting long-term performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Capacity Factor Analysis:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Definition:</strong> Actual output divided by maximum possible output</li>
                <li><strong>UK onshore:</strong> Typically 25-35% capacity factor</li>
                <li><strong>UK offshore:</strong> 40-50% capacity factor achievable</li>
                <li><strong>Best-in-class:</strong> &gt;55% for optimal offshore locations</li>
                <li><strong>Calculation period:</strong> Usually assessed over full annual cycle</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Yield Metrics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Annual Energy Production (AEP):</strong> Total yearly generation in MWh</li>
                <li><strong>Specific yield:</strong> kWh per kW installed capacity per year</li>
                <li><strong>Load factor:</strong> Average load as percentage of peak capacity</li>
                <li><strong>Availability factor:</strong> Operational uptime percentage (95-98% typical)</li>
                <li><strong>Performance ratio:</strong> Actual versus predicted performance</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Case Study: Hornsea One Offshore Wind Farm</p>
              <p className="text-white text-sm mb-2">
                Located 120km off the Yorkshire coast, Hornsea One demonstrates modern UK offshore performance:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>174 x Siemens Gamesa 7MW turbines (1,218MW total capacity)</li>
                <li>42% average capacity factor (2020-2022)</li>
                <li>4,500 GWh annual generation - powers &gt;1 million UK homes</li>
                <li>&gt;97% availability through predictive maintenance</li>
                <li>Winter capacity factors often exceed 60%</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Advanced Control Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern wind turbines employ sophisticated control systems to optimise performance, protect equipment, and provide essential grid services.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Active Power Control:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Maximum Power Point Tracking (MPPT):</strong> Optimising rotor speed for each wind condition</li>
                <li><strong>Pitch control:</strong> Individual blade angle adjustment for optimal energy capture</li>
                <li><strong>Torque control:</strong> Generator load management for smooth operation</li>
                <li><strong>Wind following:</strong> Yaw system continuously tracks wind direction</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Grid Integration Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power quality:</strong> Low harmonic distortion to grid standards</li>
                <li><strong>Voltage support:</strong> Reactive power provision for grid stability</li>
                <li><strong>Frequency response:</strong> Grid stability services during demand changes</li>
                <li><strong>Fault ride-through:</strong> Staying connected during grid disturbances</li>
                <li><strong>Curtailment capability:</strong> Rapid power reduction when required</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Condition Monitoring:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Vibration analysis:</strong> Early detection of mechanical issues</li>
                <li><strong>Temperature monitoring:</strong> Thermal management for critical components</li>
                <li><strong>Oil analysis:</strong> Gearbox and bearing condition assessment</li>
                <li><strong>Performance trends:</strong> Degradation tracking and prediction</li>
                <li><strong>Remote diagnostics:</strong> 24/7 monitoring and analysis from control centres</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Wind Sites</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider the cubic relationship - small wind speed differences have large energy impacts</li>
                <li>Account for air density variations based on site altitude and typical temperatures</li>
                <li>Evaluate wind shear to determine optimal hub height for the site</li>
                <li>Assess turbulence intensity for turbine class selection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Interpreting Power Curves</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always apply site-specific air density corrections to manufacturer curves</li>
                <li>Consider turbulence adjustments for sites with TI &gt;15%</li>
                <li>Account for blade icing effects in colder climates</li>
                <li>Verify actual performance against warranted curves during operation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring cubic relationship</strong> - small measurement errors become large energy errors</li>
                <li><strong>Using uncorrected power curves</strong> - site conditions differ from standard test conditions</li>
                <li><strong>Underestimating wake losses</strong> - downstream turbines can lose 10-15% production</li>
                <li><strong>Overlooking availability</strong> - even 95% availability means 438 hours downtime per year</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule3Section1;
