import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Small-Scale Wind - HNC Module 6 Section 2.4";
const DESCRIPTION = "Master small-scale wind energy systems: building-mounted and standalone turbines, site wind assessment, Weibull distribution, planning considerations, and grid connection requirements for UK installations.";

const quickCheckQuestions = [
  {
    id: "turbine-types",
    question: "What is the main advantage of a horizontal axis wind turbine (HAWT) over a vertical axis wind turbine (VAWT)?",
    options: ["Lower installation costs", "Higher energy capture efficiency", "No yaw mechanism required", "Better performance in turbulent wind"],
    correctIndex: 1,
    explanation: "HAWTs typically achieve higher energy capture efficiency (Cp values of 0.35-0.45) compared to VAWTs (0.25-0.35) because they can better optimise blade angle relative to wind direction and operate at higher tip-speed ratios."
  },
  {
    id: "wind-assessment",
    question: "Why is the Weibull distribution used in wind resource assessment?",
    options: ["It calculates turbine efficiency", "It predicts maintenance intervals", "It accurately models the statistical distribution of wind speeds", "It determines planning permission requirements"],
    correctIndex: 2,
    explanation: "The Weibull distribution accurately models the probability distribution of wind speeds at a site, using shape (k) and scale (c) parameters. This enables calculation of annual energy yield by combining the wind speed distribution with the turbine power curve."
  },
  {
    id: "building-mounted",
    question: "Why are building-mounted wind turbines generally less effective than freestanding installations?",
    options: ["They are more expensive to install", "Building interference creates turbulent, low-velocity airflow", "Planning permission is harder to obtain", "Grid connection is more complex"],
    correctIndex: 1,
    explanation: "Buildings create significant turbulence and reduce wind speed in their vicinity. The building effect zone extends to approximately 2-3 times building height. Turbulent flow reduces energy capture and increases mechanical stress on the turbine."
  },
  {
    id: "grid-connection",
    question: "For a small wind turbine connecting to the UK grid, what is the maximum single-phase inverter capacity typically permitted without DNO application?",
    options: ["1.6 kW", "3.68 kW", "6 kW", "10 kW"],
    correctIndex: 1,
    explanation: "Under G98 (formerly G83), single-phase inverters up to 3.68 kW can be connected using the notification process without requiring a formal DNO application. Above this threshold, or for three-phase systems above 11.04 kW, G99 application is required."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The power available in wind is proportional to:",
    options: [
      "Wind speed",
      "Wind speed squared",
      "Wind speed cubed",
      "Wind speed to the fourth power"
    ],
    correctAnswer: 2,
    explanation: "Wind power is proportional to the cube of wind speed (P = ½ρAV³). This means doubling wind speed increases available power by a factor of eight, making site selection critical."
  },
  {
    id: 2,
    question: "The Betz limit states that the maximum theoretical efficiency of a wind turbine is approximately:",
    options: ["42%", "50%", "59%", "75%"],
    correctAnswer: 2,
    explanation: "The Betz limit (59.3% or 16/27) is the theoretical maximum proportion of wind energy that can be extracted by a turbine. Practical turbines achieve 35-45% due to aerodynamic losses, generator efficiency, and tip losses."
  },
  {
    id: 3,
    question: "A site has an average wind speed of 5 m/s. If an alternative site has 6 m/s average, approximately how much more energy would the same turbine produce?",
    options: ["20% more", "44% more", "73% more", "100% more"],
    correctAnswer: 2,
    explanation: "Energy is proportional to velocity cubed: (6/5)³ = 1.728, representing 72.8% more energy. This demonstrates why even small increases in average wind speed significantly impact annual yield."
  },
  {
    id: 4,
    question: "In a Weibull distribution with shape parameter k = 2, the distribution is known as:",
    options: [
      "Normal distribution",
      "Rayleigh distribution",
      "Exponential distribution",
      "Uniform distribution"
    ],
    correctAnswer: 1,
    explanation: "When k = 2, the Weibull distribution becomes the Rayleigh distribution, which is commonly used for wind speed analysis. Most UK sites have k values between 1.8 and 2.5."
  },
  {
    id: 5,
    question: "The capacity factor of a small wind turbine is typically:",
    options: [
      "5-15%",
      "15-30%",
      "35-45%",
      "50-60%"
    ],
    correctAnswer: 1,
    explanation: "Small wind turbines typically achieve capacity factors of 15-30% in the UK, compared to 25-45% for large utility-scale turbines. This reflects lower hub heights, more turbulent wind regimes, and less optimal siting."
  },
  {
    id: 6,
    question: "What minimum hub height above nearby obstructions is generally recommended for small wind turbines?",
    options: ["5 metres", "10 metres", "15 metres", "20 metres"],
    correctAnswer: 1,
    explanation: "A minimum of 10 metres clearance above obstructions within a 150m radius is recommended to avoid turbulent wake effects. Higher installations capture stronger, more consistent wind."
  },
  {
    id: 7,
    question: "Under UK permitted development rights, a standalone domestic wind turbine must not exceed what hub height?",
    options: ["9 metres", "11.1 metres", "15 metres", "20 metres"],
    correctAnswer: 1,
    explanation: "Permitted development rights in England allow standalone turbines with hub height not exceeding 11.1 metres and overall height not exceeding 11.1 metres plus half the rotor diameter, subject to other conditions."
  },
  {
    id: 8,
    question: "Wind shear describes:",
    options: [
      "The force exerted on turbine blades",
      "The increase in wind speed with height above ground",
      "The effect of buildings on wind direction",
      "The variation in wind speed throughout the day"
    ],
    correctAnswer: 1,
    explanation: "Wind shear is the increase in wind speed with height, typically modelled using the power law: V₂/V₁ = (h₂/h₁)^α where α is the shear exponent (typically 0.14-0.25 depending on terrain roughness)."
  },
  {
    id: 9,
    question: "A 5 kW turbine at a site with capacity factor 0.22 would generate approximately how much energy annually?",
    options: ["4,380 kWh", "8,760 kWh", "9,636 kWh", "43,800 kWh"],
    correctAnswer: 2,
    explanation: "Annual energy = Rated power × Hours in year × Capacity factor = 5 kW × 8,760 hours × 0.22 = 9,636 kWh. This represents the actual expected output compared to theoretical maximum."
  },
  {
    id: 10,
    question: "Which noise level at the nearest dwelling typically triggers a planning concern for small wind turbines?",
    options: ["25 dB(A)", "35 dB(A)", "45 dB(A)", "55 dB(A)"],
    correctAnswer: 2,
    explanation: "ETSU-R-97 guidelines typically limit turbine noise to 35-40 dB(A) at dwellings during daytime or 5 dB above background, whichever is greater. Night-time limits are often 43 dB(A) or background + 5 dB."
  },
  {
    id: 11,
    question: "For grid-connected small wind systems, the inverter must comply with which current UK standard?",
    options: [
      "BS 7671",
      "G98/G99 (Engineering Recommendations)",
      "MCS 006",
      "IEC 61400"
    ],
    correctAnswer: 1,
    explanation: "G98 (for systems ≤16A per phase) and G99 (larger systems) are the Engineering Recommendations governing connection of generation equipment to UK distribution networks, specifying protection, power quality, and disconnection requirements."
  },
  {
    id: 12,
    question: "What is the primary structural concern for building-mounted wind turbines?",
    options: [
      "Roof waterproofing",
      "Dynamic loading and resonance with building structure",
      "Aesthetic impact",
      "Electrical cable routing"
    ],
    correctAnswer: 1,
    explanation: "Dynamic loads from turbine operation (vibration, cyclic loading) can cause resonance with building structures, potentially causing structural damage. Structural engineering assessment is essential for building-mounted installations."
  }
];

const faqs = [
  {
    question: "How long does wind monitoring need to be conducted before installing a turbine?",
    answer: "Ideally, 12 months of site-specific wind data should be collected to capture seasonal variations. As a minimum, 6 months of data correlated with nearby long-term reference data can provide reasonable estimates. For domestic installations, using wind maps (e.g., NOABL database) combined with local adjustment factors is common, though less accurate. Professional developers typically use anemometer masts at hub height with data logging for larger installations."
  },
  {
    question: "What maintenance do small wind turbines require?",
    answer: "Annual maintenance typically includes: visual inspection of blades for damage, checking tower bolt torque, verifying yaw mechanism operation (HAWTs), inspecting guy wires and foundations, testing electrical connections and earthing, and reviewing inverter/controller function. Gearbox oil changes (if applicable) are typically every 2-3 years. Budget approximately £200-400 annually for maintenance on a domestic turbine, with major component replacement reserves."
  },
  {
    question: "Can I install a wind turbine in an urban area?",
    answer: "Urban installations face significant challenges: buildings create turbulence reducing output by 50% or more compared to rated capacity; planning permission is more difficult due to noise and visual impact; and structural loading on buildings requires engineering assessment. Permitted development rights typically do not apply to building-mounted turbines. While technically possible, urban wind installations rarely achieve economic payback. Consider solar PV as a more reliable alternative in urban settings."
  },
  {
    question: "What is the typical payback period for a small wind turbine in the UK?",
    answer: "Payback periods vary enormously based on wind resource and electricity prices. A well-sited 5 kW turbine costing £15,000-25,000 installed might generate 10,000 kWh/year, saving approximately £2,500-3,000 annually at current electricity prices, suggesting 5-10 year payback. However, poorly sited turbines may never achieve payback. The Smart Export Guarantee (SEG) provides additional income for exported electricity, typically 3-15p/kWh depending on supplier."
  },
  {
    question: "What is the difference between G98 and G99 for grid connection?",
    answer: "G98 (formerly G83) applies to smaller installations: single-phase up to 3.68 kW or three-phase up to 11.04 kW per phase. It uses a simple notification process - inform the DNO and wait 28 days. G99 applies to larger systems and requires a formal application with technical studies. Both specify protection settings, power quality requirements, and the need for type-tested inverters. MCS-certified installers can complete G98 notifications on behalf of customers."
  },
  {
    question: "How does turbulence intensity affect small wind turbines?",
    answer: "Turbulence intensity (TI) measures wind speed fluctuations relative to mean speed. High TI (>18%) increases fatigue loading on blades and components, reduces energy capture due to the cubic relationship with wind speed, and can cause premature failure. Small turbines are more susceptible than large ones due to their lower inertia. IEC 61400-2 specifies turbine design classes for different turbulence environments. Building-mounted sites typically have TI of 20-40%, significantly reducing expected lifetime and output."
  }
];

const HNCModule6Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Small-Scale Wind
          </h1>
          <p className="text-white/80">
            Building-mounted and standalone turbines, site assessment, planning considerations, and grid connection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Wind power:</strong> P = ½ρAV³ (cubed relationship)</li>
              <li className="pl-1"><strong>Betz limit:</strong> 59.3% maximum theoretical efficiency</li>
              <li className="pl-1"><strong>Capacity factor:</strong> 15-30% typical for small wind</li>
              <li className="pl-1"><strong>Grid connection:</strong> G98/G99 requirements apply</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">UK Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Permitted development:</strong> 11.1m hub height limit</li>
              <li className="pl-1"><strong>Noise limit:</strong> 35-45 dB(A) at dwellings</li>
              <li className="pl-1"><strong>MCS certification:</strong> Required for SEG payments</li>
              <li className="pl-1"><strong>Site assessment:</strong> NOABL database available</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Analyse wind turbine types and their operating principles",
              "Apply the Weibull distribution to wind resource assessment",
              "Calculate annual energy yield and capacity factor",
              "Evaluate building-mounted versus freestanding installations",
              "Understand UK planning requirements and permitted development",
              "Specify grid connection requirements under G98/G99"
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

        {/* Section 1: Wind Turbine Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Wind Turbine Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Small-scale wind turbines convert kinetic energy from wind into electrical energy. Understanding
              the fundamental physics and turbine configurations is essential for system design and performance
              prediction.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Wind Power Equation</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white">P = ½ρAV³</span></p>
                <p className="text-white/60 mt-2">Where:</p>
                <p className="text-white/80">P = Power (W)</p>
                <p className="text-white/80">ρ = Air density (≈1.225 kg/m³ at sea level)</p>
                <p className="text-white/80">A = Swept area (m²) = πr² for HAWT</p>
                <p className="text-white/80">V = Wind velocity (m/s)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Turbine Type Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">HAWT</th>
                      <th className="border border-white/10 px-3 py-2 text-left">VAWT (Darrieus/Savonius)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical Cp (efficiency)</td>
                      <td className="border border-white/10 px-3 py-2">0.35-0.45</td>
                      <td className="border border-white/10 px-3 py-2">0.25-0.35</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Yaw mechanism</td>
                      <td className="border border-white/10 px-3 py-2">Required (tail vane or motor)</td>
                      <td className="border border-white/10 px-3 py-2">Not required - omnidirectional</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Turbulence tolerance</td>
                      <td className="border border-white/10 px-3 py-2">Lower - affected by gusts</td>
                      <td className="border border-white/10 px-3 py-2">Higher - better in urban sites</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Starting wind speed</td>
                      <td className="border border-white/10 px-3 py-2">2.5-4 m/s typical</td>
                      <td className="border border-white/10 px-3 py-2">Savonius: 2 m/s, Darrieus: 4+ m/s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Noise level</td>
                      <td className="border border-white/10 px-3 py-2">Moderate (tip noise)</td>
                      <td className="border border-white/10 px-3 py-2">Lower typically</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Market availability</td>
                      <td className="border border-white/10 px-3 py-2">Dominant (90%+ of market)</td>
                      <td className="border border-white/10 px-3 py-2">Niche applications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key operating parameters:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cut-in speed:</strong> Minimum wind speed for generation (typically 2.5-4 m/s)</li>
                <li className="pl-1"><strong>Rated speed:</strong> Wind speed at which rated power is achieved (10-14 m/s)</li>
                <li className="pl-1"><strong>Cut-out speed:</strong> Maximum operating wind speed before shutdown (25-30 m/s)</li>
                <li className="pl-1"><strong>Survival speed:</strong> Maximum wind speed the structure can withstand (50-70 m/s)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Betz limit:</strong> No turbine can extract more than 59.3% (16/27) of the wind's kinetic energy, as some air must pass through to maintain flow.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Wind Resource Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Wind Resource Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate wind resource assessment is critical for predicting turbine performance. The
              Weibull distribution provides a statistical model for wind speed variation, while
              understanding wind shear and turbulence helps optimise turbine placement.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Weibull Distribution</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white">f(V) = (k/c)(V/c)^(k-1) × e^(-(V/c)^k)</span></p>
                <p className="text-white/60 mt-2">Where:</p>
                <p className="text-white/80">k = Shape parameter (typically 1.8-2.5 in UK)</p>
                <p className="text-white/80">c = Scale parameter (related to mean wind speed)</p>
                <p className="text-white/80">V = Wind speed</p>
                <p className="text-white/60 mt-2">When k = 2, this becomes the Rayleigh distribution</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">NOABL Database</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">UK wind speed estimates</li>
                  <li className="pl-1">1 km grid resolution</li>
                  <li className="pl-1">10m, 25m, 45m heights</li>
                  <li className="pl-1">Free resource for initial assessment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wind Shear Correction</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">V₂/V₁ = (h₂/h₁)^α</li>
                  <li className="pl-1">α = 0.14 (open terrain)</li>
                  <li className="pl-1">α = 0.25 (suburban)</li>
                  <li className="pl-1">α = 0.4+ (urban)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Site Selection Criteria</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Mean speed &gt; 5 m/s at hub</li>
                  <li className="pl-1">10m clearance above obstacles</li>
                  <li className="pl-1">Turbulence intensity &lt; 18%</li>
                  <li className="pl-1">Unobstructed prevailing wind</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Energy Yield Calculation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacity factor method</td>
                      <td className="border border-white/10 px-3 py-2">AEY = P_rated × 8760 × CF</td>
                      <td className="border border-white/10 px-3 py-2">±20-30%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weibull integration</td>
                      <td className="border border-white/10 px-3 py-2">AEY = ∫P(V)×f(V)dV × 8760</td>
                      <td className="border border-white/10 px-3 py-2">±10-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bin method (measured data)</td>
                      <td className="border border-white/10 px-3 py-2">AEY = Σ(P_i × hours_i)</td>
                      <td className="border border-white/10 px-3 py-2">±5-10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical insight:</strong> Due to the V³ relationship, a 1 m/s error in mean wind speed assessment can result in 30-50% error in energy prediction.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Installation Types and Planning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation Types and Planning Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Small wind turbines can be installed as freestanding (pole/tower mounted) or building-mounted
              systems. Each has distinct structural, planning, and performance characteristics that
              significantly affect viability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Freestanding vs Building-Mounted Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Freestanding</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building-Mounted</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wind quality</td>
                      <td className="border border-white/10 px-3 py-2">Cleaner, laminar flow</td>
                      <td className="border border-white/10 px-3 py-2">Turbulent, reduced speed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Expected output</td>
                      <td className="border border-white/10 px-3 py-2">100% of rated potential</td>
                      <td className="border border-white/10 px-3 py-2">30-60% of rated potential</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Structural concerns</td>
                      <td className="border border-white/10 px-3 py-2">Foundation design</td>
                      <td className="border border-white/10 px-3 py-2">Vibration, resonance, load transfer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Permitted development (England)</td>
                      <td className="border border-white/10 px-3 py-2">Possible with conditions</td>
                      <td className="border border-white/10 px-3 py-2">Generally not permitted</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical lifespan</td>
                      <td className="border border-white/10 px-3 py-2">20-25 years</td>
                      <td className="border border-white/10 px-3 py-2">10-15 years (fatigue issues)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Permitted Development Conditions (England)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Only one turbine per property (standalone)</li>
                <li className="pl-1">Hub height ≤ 11.1 metres</li>
                <li className="pl-1">Total height ≤ hub height + 0.5 × rotor diameter</li>
                <li className="pl-1">Distance from property boundary ≥ hub height + 10%</li>
                <li className="pl-1">Not in Conservation Areas, AONB, World Heritage Sites, or listed building curtilage</li>
                <li className="pl-1">Noise level ≤ 45 dB(A) at nearest premises</li>
                <li className="pl-1">Must be removed when no longer needed</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structural Requirements for Building-Mounted Turbines</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Structural assessment:</strong> Building must withstand dynamic loads (thrust + cyclic)</li>
                <li className="pl-1"><strong>Resonance check:</strong> Building natural frequency must differ from turbine operating frequency</li>
                <li className="pl-1"><strong>Mounting detail:</strong> Loads transferred to main structure, not just roof covering</li>
                <li className="pl-1"><strong>Vibration isolation:</strong> Anti-vibration mounts typically required</li>
                <li className="pl-1"><strong>Waterproofing:</strong> Roof penetrations must maintain weather integrity</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Noise Considerations (ETSU-R-97 Guidelines)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Noise Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Alternative</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daytime (07:00-23:00)</td>
                      <td className="border border-white/10 px-3 py-2">35-40 dB(A) LA90</td>
                      <td className="border border-white/10 px-3 py-2">Background + 5 dB (if higher)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Night-time (23:00-07:00)</td>
                      <td className="border border-white/10 px-3 py-2">43 dB(A) LA90</td>
                      <td className="border border-white/10 px-3 py-2">Background + 5 dB (if higher)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Planning tip:</strong> Pre-application consultation with the Local Planning Authority can identify potential issues before incurring full application costs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Grid Connection Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Grid Connection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Grid-connected small wind systems must comply with Engineering Recommendations G98 or G99,
              which specify technical requirements for protection, power quality, and safe disconnection.
              MCS certification is required for Smart Export Guarantee payments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">G98 vs G99 Application</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">G98 (Small Scale)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">G99 (Larger Scale)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-phase limit</td>
                      <td className="border border-white/10 px-3 py-2">≤ 3.68 kW (16A)</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 3.68 kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase limit</td>
                      <td className="border border-white/10 px-3 py-2">≤ 11.04 kW (16A/phase)</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 11.04 kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Process</td>
                      <td className="border border-white/10 px-3 py-2">Notification (28-day wait)</td>
                      <td className="border border-white/10 px-3 py-2">Formal application required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Usually free</td>
                      <td className="border border-white/10 px-3 py-2">Application and study fees apply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Timeline</td>
                      <td className="border border-white/10 px-3 py-2">28 days from notification</td>
                      <td className="border border-white/10 px-3 py-2">45-90 days typical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Grid Protection Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Over/under voltage:</strong> Trip at ±10% of nominal (230V: 207-253V)</li>
                <li className="pl-1"><strong>Over/under frequency:</strong> Trip at 47.5-52 Hz (GB grid)</li>
                <li className="pl-1"><strong>Loss of mains:</strong> Rate of change of frequency (RoCoF) or vector shift detection</li>
                <li className="pl-1"><strong>Reconnection delay:</strong> Minimum 20 seconds after grid restoration</li>
                <li className="pl-1"><strong>Power factor:</strong> 0.95 lagging to 0.95 leading capability</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inverter Types for Wind Turbines</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">AC-Coupled (Synchronous)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Turbine generates AC directly</li>
                    <li>Frequency varies with speed</li>
                    <li>Power electronics convert to grid frequency</li>
                    <li>Common in larger systems</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">DC-Coupled (PMG + Rectifier)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Permanent magnet generator</li>
                    <li>Rectified to DC, then inverted</li>
                    <li>MPPT tracking for optimal power</li>
                    <li>Common in small turbines</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Requirements (BS 7671)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Section 712:</strong> Solar PV power supply systems (principles apply)</li>
                <li className="pl-1"><strong>Section 551:</strong> Low voltage generating sets</li>
                <li className="pl-1"><strong>Isolation:</strong> Double-pole isolation between turbine and grid</li>
                <li className="pl-1"><strong>Labelling:</strong> Warning labels at meter position and consumer unit</li>
                <li className="pl-1"><strong>Earthing:</strong> Turbine and tower earthed per manufacturer and BS 7671</li>
                <li className="pl-1"><strong>Protection:</strong> Type II SPDs recommended for exposed locations</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCS Certification Requirements</p>
              <div className="text-sm space-y-2">
                <p><strong>For SEG eligibility:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Turbine must be MCS-certified product</li>
                  <li>Installation by MCS-certified installer</li>
                  <li>Compliance with MCS 006 (Wind) installation standard</li>
                  <li>MCS certificate issued and registered</li>
                  <li>Metering to comply with SEG requirements</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Export tariff:</strong> SEG rates vary by supplier (3-15p/kWh typically). Some suppliers offer time-of-use export rates with higher payments during peak demand.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Wind Shear Correction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> NOABL data gives 5.2 m/s at 10m height. Calculate wind speed at 15m hub height in suburban terrain (α = 0.25).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using wind shear power law:</p>
                <p className="mt-2">V₂/V₁ = (h₂/h₁)^α</p>
                <p className="mt-1">V₁₅/V₁₀ = (15/10)^0.25</p>
                <p className="mt-1">V₁₅/V₁₀ = (1.5)^0.25</p>
                <p className="mt-1">V₁₅/V₁₀ = 1.107</p>
                <p className="mt-2">V₁₅ = 5.2 × 1.107 = <span className="text-green-400">5.76 m/s at hub height</span></p>
                <p className="mt-2 text-white/60">Note: This 11% increase in wind speed translates to (1.107)³ = 36% more available power</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Annual Energy Yield Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 6 kW rated turbine is installed at a site with estimated capacity factor of 0.24. Calculate annual energy yield.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Annual Energy Yield = Rated Power × Hours per Year × Capacity Factor</p>
                <p className="mt-2">AEY = P_rated × 8760 × CF</p>
                <p className="mt-1">AEY = 6 kW × 8760 h × 0.24</p>
                <p className="mt-1">AEY = <span className="text-green-400">12,614 kWh/year</span></p>
                <p className="mt-2">At electricity cost of £0.28/kWh:</p>
                <p className="mt-1">Savings = 12,614 × £0.28 = <span className="text-green-400">£3,532/year</span></p>
                <p className="mt-1">Plus SEG export (assume 50% exported at 10p/kWh):</p>
                <p className="mt-1">Export income = 6,307 × £0.10 = £631/year</p>
                <p className="mt-1">Total annual value = <span className="text-green-400">£3,847/year</span></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Weibull Distribution Application</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A site has Weibull parameters k = 2.1, c = 6.5 m/s. Estimate percentage of time wind speed exceeds 4 m/s (turbine cut-in).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Probability P(V &gt; v) = e^(-(v/c)^k)</p>
                <p className="mt-2">P(V &gt; 4) = e^(-(4/6.5)^2.1)</p>
                <p className="mt-1">P(V &gt; 4) = e^(-(0.615)^2.1)</p>
                <p className="mt-1">P(V &gt; 4) = e^(-0.354)</p>
                <p className="mt-1">P(V &gt; 4) = <span className="text-green-400">0.702 = 70.2% of the time</span></p>
                <p className="mt-2 text-white/60">The turbine will operate approximately 70% of hours annually</p>
                <p className="mt-1 text-white/60">Operating hours = 8760 × 0.702 = 6,150 hours/year</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Available Wind Power</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate the theoretical power available in wind for a 5m diameter rotor at 8 m/s wind speed (air density 1.225 kg/m³).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Swept area A = πr² = π × 2.5² = 19.63 m²</p>
                <p className="mt-2">Available power P = ½ρAV³</p>
                <p className="mt-1">P = 0.5 × 1.225 × 19.63 × 8³</p>
                <p className="mt-1">P = 0.5 × 1.225 × 19.63 × 512</p>
                <p className="mt-1">P = <span className="text-green-400">6,158 W (6.16 kW) available</span></p>
                <p className="mt-2">With Cp = 0.40 (typical HAWT efficiency):</p>
                <p className="mt-1">Extracted power = 6,158 × 0.40 = <span className="text-green-400">2,463 W electrical output</span></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Site Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Obtain NOABL wind speed data for location and apply shear correction</li>
                <li className="pl-1">Survey obstructions within 150m radius and check 10m clearance rule</li>
                <li className="pl-1">Identify prevailing wind direction and potential wake effects</li>
                <li className="pl-1">Consider terrain roughness class for turbulence assessment</li>
                <li className="pl-1">Check planning constraints (Conservation Area, AONB, listed buildings)</li>
                <li className="pl-1">Assess noise sensitivity of nearest receptors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Betz limit: <strong>59.3%</strong> maximum theoretical efficiency</li>
                <li className="pl-1">Typical HAWT Cp: <strong>0.35-0.45</strong></li>
                <li className="pl-1">Capacity factor range: <strong>15-30%</strong> for small wind UK</li>
                <li className="pl-1">G98 single-phase limit: <strong>3.68 kW</strong></li>
                <li className="pl-1">Permitted development hub height: <strong>11.1m</strong> maximum</li>
                <li className="pl-1">Noise limit: <strong>35-45 dB(A)</strong> at nearest dwelling</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using unadjusted NOABL data</strong> - Always apply wind shear correction for actual hub height</li>
                <li className="pl-1"><strong>Ignoring turbulence</strong> - Building-mounted and urban sites have severe performance penalties</li>
                <li className="pl-1"><strong>Optimistic yield estimates</strong> - Use conservative capacity factors (0.15-0.20) for financial calculations</li>
                <li className="pl-1"><strong>Assuming permitted development</strong> - Check all conditions carefully; many sites require full planning</li>
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
                <p className="font-medium text-white mb-1">Wind Power Fundamentals</p>
                <ul className="space-y-0.5">
                  <li>P = ½ρAV³ (cubed relationship)</li>
                  <li>Betz limit: 59.3% maximum</li>
                  <li>Weibull: k (shape), c (scale)</li>
                  <li>Rayleigh distribution when k = 2</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">UK Requirements</p>
                <ul className="space-y-0.5">
                  <li>G98: ≤3.68 kW single-phase</li>
                  <li>Permitted development: 11.1m hub</li>
                  <li>MCS certification for SEG</li>
                  <li>ETSU-R-97 noise guidance</li>
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
            <Link to="../h-n-c-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section2-5">
              Next: Heat Pumps
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section2_4;
