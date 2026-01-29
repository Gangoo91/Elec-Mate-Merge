import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BREEAM Energy Category - HNC Module 6 Section 3.3";
const DESCRIPTION = "Master BREEAM Energy category requirements: Ene 01 energy performance, EPR calculation, sub-metering (Ene 02), external lighting (Ene 03), low carbon technologies (Ene 04), energy modelling, and BRUKL compliance.";

const quickCheckQuestions = [
  {
    id: "ene01-purpose",
    question: "What is the primary purpose of BREEAM Ene 01?",
    options: ["To specify minimum insulation levels", "To reduce building CO2 emissions through improved energy performance beyond Building Regulations", "To mandate renewable energy installation", "To set maximum electricity consumption limits"],
    correctIndex: 1,
    explanation: "Ene 01 rewards buildings that demonstrate improved energy performance beyond the minimum Building Regulations requirements, reducing operational CO2 emissions through the Energy Performance Ratio (EPR)."
  },
  {
    id: "sub-metering",
    question: "What does BREEAM Ene 02 require for sub-metering?",
    options: ["Only main incoming meter", "Sub-metering of major energy-consuming systems and tenancy areas", "Smart meters on all circuits", "Annual energy audits only"],
    correctIndex: 1,
    explanation: "Ene 02 requires sub-metering of major energy-consuming systems (HVAC, lighting, small power) and tenant/occupancy areas to enable energy monitoring, management, and identification of wasteful consumption."
  },
  {
    id: "external-lighting",
    question: "What is the average lamp efficacy requirement for external lighting under Ene 03?",
    options: ["50 luminous lm/W", "60 luminous lm/W", "70 luminous lm/W", "80 luminous lm/W"],
    correctIndex: 2,
    explanation: "Ene 03 requires external lighting to achieve an average initial luminous efficacy of at least 70 luminous lm/W across all external luminaires, promoting energy-efficient external lighting design."
  },
  {
    id: "low-carbon-tech",
    question: "Under Ene 04, what is the minimum percentage of building energy demand that must be met by low or zero carbon technologies to achieve credits?",
    options: ["5%", "10%", "15%", "20%"],
    correctIndex: 1,
    explanation: "Ene 04 awards credits where low or zero carbon (LZC) technologies contribute at least 10% of the total energy demand or carbon emissions reduction, encouraging renewable and low carbon energy sources."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does EPR stand for in BREEAM energy assessment?",
    options: [
      "Energy Performance Rating",
      "Energy Performance Ratio",
      "Environmental Performance Requirement",
      "Electrical Power Reduction"
    ],
    correctAnswer: 1,
    explanation: "EPR stands for Energy Performance Ratio - a metric comparing actual building performance against a notional building, used in Ene 01 to assess and reward energy efficiency improvements."
  },
  {
    id: 2,
    question: "Which document provides the regulatory baseline for BREEAM energy calculations?",
    options: ["SAP calculations", "BRUKL (Building Regulations UK Part L)", "Display Energy Certificate", "NABERS rating"],
    correctAnswer: 1,
    explanation: "BRUKL (Building Regulations UK Part L) compliance calculations provide the regulatory baseline. BREEAM Ene 01 rewards performance improvements beyond this minimum requirement."
  },
  {
    id: 3,
    question: "What is the minimum credit threshold in Ene 01 that must be achieved for a BREEAM Excellent rating?",
    options: ["4 credits", "6 credits", "8 credits", "10 credits"],
    correctAnswer: 1,
    explanation: "For BREEAM Excellent rating, a minimum of 6 credits must be achieved in Ene 01. This ensures buildings targeting higher ratings demonstrate genuine energy performance improvements."
  },
  {
    id: 4,
    question: "Sub-metering under Ene 02 must enable monitoring of energy consumption at intervals of:",
    options: ["Daily", "Hourly or better", "Weekly", "Monthly"],
    correctAnswer: 1,
    explanation: "Ene 02 requires sub-metering systems capable of recording consumption data at hourly intervals or better, enabling detailed analysis of energy use patterns and identification of anomalies."
  },
  {
    id: 5,
    question: "For external lighting (Ene 03), what additional control requirement supports the efficacy standard?",
    options: [
      "Manual switching only",
      "Automatic daylight sensing and time scheduling",
      "Motion sensors on all luminaires",
      "Central dimming to 50%"
    ],
    correctAnswer: 1,
    explanation: "Ene 03 requires external lighting to incorporate automatic controls including daylight sensing (switching off/dimming in adequate daylight) and time scheduling to prevent unnecessary operation."
  },
  {
    id: 6,
    question: "Which of the following is NOT typically classified as a low or zero carbon technology under Ene 04?",
    options: ["Air source heat pumps", "Solar PV panels", "Combined heat and power (CHP)", "High-efficiency gas boilers"],
    correctAnswer: 3,
    explanation: "High-efficiency gas boilers, while efficient, are not classified as LZC technologies as they rely on fossil fuels. LZC technologies include heat pumps, solar PV, wind, biomass, and CHP systems."
  },
  {
    id: 7,
    question: "What software tool is commonly used to produce BRUKL calculations for non-domestic buildings?",
    options: ["SAP 10", "SBEM (Simplified Building Energy Model)", "RdSAP", "EnergyPlus"],
    correctAnswer: 1,
    explanation: "SBEM (Simplified Building Energy Model) is the National Calculation Methodology (NCM) tool for non-domestic buildings, producing BRUKL outputs that demonstrate Part L compliance."
  },
  {
    id: 8,
    question: "Under Ene 02, which building type has specific enhanced sub-metering requirements?",
    options: ["Residential developments", "Multi-tenanted buildings", "Single-occupancy offices", "Industrial warehouses"],
    correctAnswer: 1,
    explanation: "Multi-tenanted buildings have enhanced Ene 02 requirements, needing sub-metering for each tenancy to enable individual tenant energy monitoring and encourage responsible consumption."
  },
  {
    id: 9,
    question: "What is the maximum luminaire power density typically required for car park lighting under Ene 03?",
    options: ["1.5 W/m²", "2.0 W/m²", "2.5 W/m²", "3.0 W/m²"],
    correctAnswer: 2,
    explanation: "BREEAM guidance indicates car park lighting should achieve approximately 2.5 W/m² or less, depending on maintained illuminance requirements and luminaire efficacy."
  },
  {
    id: 10,
    question: "Evidence for Ene 01 credits must include:",
    options: [
      "Manufacturer product data only",
      "Design stage BRUKL output and energy model report",
      "Post-occupancy energy bills",
      "Building user satisfaction surveys"
    ],
    correctAnswer: 1,
    explanation: "Ene 01 requires design stage evidence including BRUKL calculations, dynamic simulation model outputs (where applicable), and specification of energy efficiency measures achieving the claimed EPR."
  },
  {
    id: 11,
    question: "The 'energy model' used for BREEAM assessment must account for:",
    options: [
      "Heating only",
      "All regulated energy uses (heating, cooling, lighting, hot water, auxiliary)",
      "Unregulated loads only",
      "Renewable generation only"
    ],
    correctAnswer: 1,
    explanation: "The energy model must account for all regulated energy uses as defined by Part L: space heating, space cooling, domestic hot water, lighting, and auxiliary energy (pumps, fans, controls)."
  },
  {
    id: 12,
    question: "What is the relationship between BREEAM energy credits and EPC ratings?",
    options: [
      "They are identical calculations",
      "BREEAM uses EPR which correlates with but is distinct from EPC ratings",
      "EPC replaces BREEAM energy assessment",
      "BREEAM ignores EPC methodology"
    ],
    correctAnswer: 1,
    explanation: "BREEAM uses the Energy Performance Ratio (EPR) which builds upon Part L/EPC methodology but applies additional performance thresholds. A good EPC typically supports higher BREEAM energy credits."
  }
];

const faqs = [
  {
    question: "How does BREEAM Ene 01 differ from Building Regulations Part L compliance?",
    answer: "Part L sets minimum legal requirements for energy performance; all new buildings must achieve Part L compliance. BREEAM Ene 01 rewards buildings that exceed Part L requirements through the Energy Performance Ratio (EPR). The better a building performs beyond the Part L baseline, the more credits awarded. Part L compliance alone typically achieves minimal or no Ene 01 credits - meaningful credits require genuine improvement through enhanced fabric, efficient systems, and low carbon technologies."
  },
  {
    question: "What sub-metering strategy satisfies BREEAM Ene 02 requirements?",
    answer: "A compliant strategy requires: (1) Main incoming meter with pulsed output for BMS integration, (2) Sub-meters on major energy end uses - HVAC systems, lighting circuits, small power distribution, and specialist equipment, (3) Tenant/occupancy area sub-metering in multi-let buildings, (4) Meters capable of hourly data recording, (5) System enabling data display to building operators. The strategy should enable at least 90% of estimated annual energy consumption to be monitored through accessible sub-meters."
  },
  {
    question: "What evidence is required for Ene 04 low/zero carbon technology credits?",
    answer: "Evidence requirements include: (1) Feasibility study demonstrating consideration of LZC options, (2) Calculations showing percentage of energy demand/carbon reduction from LZC, (3) Specification and drawings of proposed LZC systems, (4) Manufacturer performance data, (5) Confirmation that installed capacity meets the minimum 10% contribution threshold. For heat pumps, evidence must include seasonal performance factor (SPF) calculations demonstrating low carbon operation."
  },
  {
    question: "How should external lighting design balance Ene 03 efficacy requirements with other BREEAM criteria?",
    answer: "External lighting design must achieve 70 lm/W average efficacy whilst also considering: Hea 05 (light pollution) requiring upward light ratio limits and appropriate luminaire cut-off angles, Pol 04 potentially requiring dark sky compliance in sensitive areas, and security/safety requirements. LED technology typically achieves 100+ lm/W, comfortably meeting efficacy requirements whilst enabling directional control for light pollution compliance. Integrated controls (daylight, time, motion) maximise credits across multiple issues."
  },
  {
    question: "What is the role of dynamic simulation modelling in BREEAM energy assessment?",
    answer: "Dynamic simulation modelling (DSM) using tools like IES-VE or TAS is required for complex buildings or where SBEM cannot adequately represent building systems. DSM provides hourly energy calculations accounting for thermal mass, solar gains, and system interactions. For BREEAM, DSM enables more accurate EPR calculation for buildings with advanced features (mixed-mode ventilation, thermal storage, complex glazing). DSM reports must follow CIBSE AM11 methodology and be prepared by competent energy modellers."
  }
];

const HNCModule6Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3">
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
            <span>Module 6.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BREEAM Energy Category
          </h1>
          <p className="text-white/80">
            Energy performance (Ene 01), sub-metering (Ene 02), external lighting (Ene 03), and low carbon technologies (Ene 04)
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Ene 01:</strong> Energy Performance Ratio (EPR) beyond Part L</li>
              <li className="pl-1"><strong>Ene 02:</strong> Sub-metering major systems and tenancies</li>
              <li className="pl-1"><strong>Ene 03:</strong> External lighting 70 lm/W minimum efficacy</li>
              <li className="pl-1"><strong>Ene 04:</strong> 10%+ energy from LZC technologies</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Evidence Requirements</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BRUKL output:</strong> Part L compliance calculation</li>
              <li className="pl-1"><strong>Energy model:</strong> SBEM or dynamic simulation</li>
              <li className="pl-1"><strong>Metering schedule:</strong> Sub-meter specification</li>
              <li className="pl-1"><strong>LZC feasibility:</strong> Technology assessment report</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BREEAM Ene 01 Energy Performance Ratio methodology",
              "Design sub-metering strategies compliant with Ene 02",
              "Specify external lighting achieving Ene 03 efficacy standards",
              "Evaluate low/zero carbon technologies for Ene 04 credits",
              "Understand BRUKL calculations and energy modelling requirements",
              "Prepare evidence documentation for BREEAM energy credits"
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

        {/* Section 1: Ene 01 Energy Performance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Ene 01 - Energy Performance and EPR
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM Ene 01 is typically the highest-weighted energy credit issue, rewarding buildings that
              achieve operational CO2 emissions reductions beyond Building Regulations Part L minimum requirements.
              Credits are awarded based on the Energy Performance Ratio (EPR), which compares the actual
              building's calculated performance against a notional baseline building.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Performance Ratio (EPR) Explained:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EPR calculation:</strong> Compares actual vs notional building energy/carbon performance</li>
                <li className="pl-1"><strong>Baseline:</strong> Part L 2021 compliant notional building (BRUKL output)</li>
                <li className="pl-1"><strong>Improvement required:</strong> Higher EPR = better performance = more credits</li>
                <li className="pl-1"><strong>Credit scaling:</strong> Minimum 4 credits for BREEAM Very Good, 6 for Excellent</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ene 01 Credit Thresholds (Indicative)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Credits</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Performance Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Measures</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-3</td>
                      <td className="border border-white/10 px-3 py-2">Marginal improvement over Part L</td>
                      <td className="border border-white/10 px-3 py-2">Enhanced fabric, efficient lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4-6</td>
                      <td className="border border-white/10 px-3 py-2">Good performance (Very Good/Excellent)</td>
                      <td className="border border-white/10 px-3 py-2">Heat recovery, LED throughout, controls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7-9</td>
                      <td className="border border-white/10 px-3 py-2">Excellent performance</td>
                      <td className="border border-white/10 px-3 py-2">LZC technologies, optimised systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10+</td>
                      <td className="border border-white/10 px-3 py-2">Outstanding/Net zero</td>
                      <td className="border border-white/10 px-3 py-2">Passive design, significant renewables</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">BRUKL Output Requirements</p>
              <div className="text-sm text-white space-y-1">
                <p>The Building Regulations UK Part L (BRUKL) output document provides:</p>
                <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                  <li>Building Emission Rate (BER) - actual building CO2 emissions</li>
                  <li>Target Emission Rate (TER) - notional building threshold</li>
                  <li>Primary energy consumption comparison</li>
                  <li>Building fabric and services specifications used</li>
                </ul>
                <p className="mt-2 text-white/70">BRUKL must demonstrate BER ≤ TER for Part L compliance; BREEAM rewards BER significantly below TER.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Early-stage decisions on building form, orientation, and fabric have the greatest impact on Ene 01 performance - optimise these before relying on efficient services or renewables.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Ene 02 Sub-Metering */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Ene 02 - Sub-Metering of Substantial Energy Uses
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective energy management requires visibility of consumption patterns. Ene 02 mandates
              sub-metering infrastructure enabling building operators and occupants to monitor energy
              use by major end-use category and, in multi-tenanted buildings, by occupancy area.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Sub-Metering</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Space heating systems</li>
                  <li className="pl-1">Domestic hot water</li>
                  <li className="pl-1">Humidification plant</li>
                  <li className="pl-1">Cooling systems</li>
                  <li className="pl-1">Fans (ventilation/air handling)</li>
                  <li className="pl-1">Lighting (general and external)</li>
                  <li className="pl-1">Small power distribution</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Hourly data recording capability</li>
                  <li className="pl-1">Pulsed output for BMS integration</li>
                  <li className="pl-1">Tenant area sub-metering (multi-let)</li>
                  <li className="pl-1">High energy loads (lifts, server rooms)</li>
                  <li className="pl-1">Renewable generation monitoring</li>
                  <li className="pl-1">Data accessible to building operators</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sub-Metering Strategy Example - Office Building</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meter Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meter Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main incomer</td>
                      <td className="border border-white/10 px-3 py-2">Main LV switchboard</td>
                      <td className="border border-white/10 px-3 py-2">CT metering, MID Class B</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical services DB</td>
                      <td className="border border-white/10 px-3 py-2">kWh meter, pulsed output</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Lighting distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">kWh meter per floor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power</td>
                      <td className="border border-white/10 px-3 py-2">Floor distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">kWh meter per tenant area</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">Lift motor room DB</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated kWh meter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Server room</td>
                      <td className="border border-white/10 px-3 py-2">IT distribution board</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated kWh meter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Design metering strategy at RIBA Stage 2-3 to ensure switchboard and distribution layouts accommodate required meters and communication infrastructure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Ene 03 External Lighting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ene 03 - External Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              External lighting represents a significant energy consumption category that often operates
              outside occupied hours. Ene 03 encourages energy-efficient external lighting design through
              efficacy requirements and mandatory automatic controls, whilst considering interface with
              light pollution criteria (Pol 04).
            </p>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Core Requirements - Ene 03</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Minimum efficacy:</strong> Average initial luminous efficacy ≥70 luminous lm/W across all external luminaires</li>
                <li className="pl-1"><strong>Daylight control:</strong> Automatic switching/dimming based on daylight levels</li>
                <li className="pl-1"><strong>Time scheduling:</strong> Time-based controls preventing unnecessary operation</li>
                <li className="pl-1"><strong>Zoning:</strong> Separate control of different external areas</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">External Lighting Design Checklist</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Area Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Illuminance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Car parks</td>
                      <td className="border border-white/10 px-3 py-2">20-75 lux (BS 5489)</td>
                      <td className="border border-white/10 px-3 py-2">Photocell + time clock, presence dimming</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pedestrian routes</td>
                      <td className="border border-white/10 px-3 py-2">5-20 lux</td>
                      <td className="border border-white/10 px-3 py-2">Photocell control, reduced overnight</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building entrance</td>
                      <td className="border border-white/10 px-3 py-2">100-200 lux</td>
                      <td className="border border-white/10 px-3 py-2">Photocell, occupancy-linked dimming</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Security/perimeter</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">PIR activation, CCTV integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Decorative/facade</td>
                      <td className="border border-white/10 px-3 py-2">Design dependent</td>
                      <td className="border border-white/10 px-3 py-2">Time scheduling, curfew hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Efficacy Calculation Example:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>External lighting schedule:</p>
                <p className="mt-2">Car park: 20 × LED luminaires @ 80W, 120 lm/W = 1,600W</p>
                <p>Pathways: 15 × LED luminaires @ 40W, 110 lm/W = 600W</p>
                <p>Entrance: 6 × LED luminaires @ 60W, 95 lm/W = 360W</p>
                <p className="mt-2">Weighted average efficacy calculation:</p>
                <p>= (20×120 + 15×110 + 6×95) / (20+15+6)</p>
                <p>= (2400 + 1650 + 570) / 41</p>
                <p>= 4620 / 41</p>
                <p className="text-green-400">= 112.7 lm/W (exceeds 70 lm/W requirement)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration note:</strong> Coordinate external lighting design with Pol 04 (light pollution) requirements - use luminaires with appropriate upward light ratio (0% for E1/E2 zones) and consider impact on neighbouring properties.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Ene 04 Low Carbon Technologies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ene 04 - Low and Zero Carbon Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ene 04 encourages incorporation of low and zero carbon (LZC) technologies to reduce
              reliance on grid electricity and fossil fuels. Credits are awarded where feasibility
              assessment demonstrates appropriate technology selection and installed capacity meets
              minimum contribution thresholds.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recognised LZC Technologies</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Electricity Generation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Solar photovoltaic (PV) systems</li>
                    <li>Wind turbines (building-mounted/standalone)</li>
                    <li>Combined heat and power (CHP)</li>
                    <li>Fuel cells (hydrogen/natural gas)</li>
                    <li>Micro-hydro (site specific)</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Heat Generation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Air source heat pumps (ASHP)</li>
                    <li>Ground source heat pumps (GSHP)</li>
                    <li>Water source heat pumps</li>
                    <li>Biomass boilers</li>
                    <li>Solar thermal collectors</li>
                    <li>District heating (low carbon networks)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">LZC Feasibility Study Requirements</p>
              <div className="text-sm text-white space-y-1">
                <p>The feasibility study must consider:</p>
                <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                  <li>Site characteristics (solar access, wind exposure, ground conditions)</li>
                  <li>Building energy demand profile (baseload, peak, seasonal variation)</li>
                  <li>Technical feasibility of each technology option</li>
                  <li>Capital cost, operational cost, and lifecycle assessment</li>
                  <li>Carbon reduction potential of each option</li>
                  <li>Recommended technology selection with justification</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Credit Requirements and Calculation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Threshold</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Feasibility study</td>
                      <td className="border border-white/10 px-3 py-2">Prerequisite</td>
                      <td className="border border-white/10 px-3 py-2">LZC options assessment report</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy contribution</td>
                      <td className="border border-white/10 px-3 py-2">≥10% of building demand</td>
                      <td className="border border-white/10 px-3 py-2">Energy model showing LZC output</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carbon contribution</td>
                      <td className="border border-white/10 px-3 py-2">OR ≥10% CO2 reduction</td>
                      <td className="border border-white/10 px-3 py-2">Carbon calculation methodology</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">System specification</td>
                      <td className="border border-white/10 px-3 py-2">Detailed design</td>
                      <td className="border border-white/10 px-3 py-2">Drawings, specifications, datasheets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Pump Carbon Assessment Example</p>
              <div className="text-sm space-y-2">
                <p><strong>System:</strong> Air source heat pump (ASHP) for space heating</p>
                <p><strong>Seasonal Performance Factor (SPF):</strong> 3.2</p>
                <p><strong>Annual heating demand:</strong> 150,000 kWh</p>
                <p className="mt-2"><strong>Calculation:</strong></p>
                <p>Electricity consumed = 150,000 / 3.2 = 46,875 kWh</p>
                <p>Grid electricity factor = 0.136 kgCO2/kWh (SAP 10.2)</p>
                <p>ASHP emissions = 46,875 × 0.136 = 6,375 kgCO2</p>
                <p className="mt-2">Comparison with gas boiler (90% efficiency):</p>
                <p>Gas consumed = 150,000 / 0.9 = 166,667 kWh</p>
                <p>Gas factor = 0.210 kgCO2/kWh</p>
                <p>Gas boiler emissions = 166,667 × 0.210 = 35,000 kgCO2</p>
                <p className="text-green-400 mt-2">Carbon saving = 35,000 - 6,375 = 28,625 kgCO2 (82% reduction)</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Technology selection:</strong> Heat pumps typically offer highest carbon savings due to grid decarbonisation trajectory. Solar PV provides excellent returns where roof area permits and complements electrified heating.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Energy Model Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify energy modelling approach for a 5,000m² office building targeting BREEAM Excellent.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Energy Modelling Approach:</p>
                <p className="mt-2">Building type: Naturally ventilated office with local cooling</p>
                <p>Modelling tool: SBEM (IES-VE DSM backup for specific areas)</p>
                <p className="mt-2">Model inputs:</p>
                <p className="ml-4">- Fabric U-values from specification</p>
                <p className="ml-4">- Air permeability target: 3.0 m³/h/m² @ 50Pa</p>
                <p className="ml-4">- Lighting: 8 W/m² installed, automatic controls</p>
                <p className="ml-4">- HVAC: VRF system, SCOP 4.5</p>
                <p className="ml-4">- Ventilation: MVHR, 85% heat recovery</p>
                <p className="ml-4">- Renewables: 100 kWp rooftop PV</p>
                <p className="mt-2 text-white/60">Outputs required:</p>
                <p className="ml-4 text-green-400">- BRUKL document showing BER vs TER</p>
                <p className="ml-4 text-green-400">- EPR calculation for Ene 01 credits</p>
                <p className="ml-4 text-green-400">- LZC contribution percentage</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Sub-Metering Schedule</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop sub-metering schedule for multi-tenanted retail development.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Meter Ref | Description | Location | Output</p>
                <p>----------|-------------|----------|--------</p>
                <p>M-01 | Main incomer | MSB | Modbus RTU</p>
                <p>M-02 | Landlord HVAC | MSB | Pulsed (BMS)</p>
                <p>M-03 | Landlord lighting | LDB-LL | Pulsed (BMS)</p>
                <p>M-04 | Common area SP | DB-CA | Pulsed (BMS)</p>
                <p>M-05 | External lighting | DB-EXT | Pulsed (BMS)</p>
                <p>M-06 | Lifts/escalators | DB-VERT | Pulsed (BMS)</p>
                <p>M-T01 | Unit 1 supply | DB-T01 | Tenant meter</p>
                <p>M-T02 | Unit 2 supply | DB-T02 | Tenant meter</p>
                <p>... | ... | ... | ...</p>
                <p className="mt-2 text-green-400">Coverage: 95% of total consumption sub-metered</p>
                <p className="text-green-400">Data: BMS trending at 15-minute intervals</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: LZC Technology Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare LZC options for school building (1,500m², 200,000 kWh annual demand).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Technology Assessment Summary:</p>
                <p className="mt-2">Option A: Rooftop Solar PV (50 kWp)</p>
                <p className="ml-4">- Annual yield: 42,500 kWh (21% of demand)</p>
                <p className="ml-4">- Capital cost: £50,000</p>
                <p className="ml-4">- Carbon saving: 5,780 kgCO2/year</p>
                <p className="mt-2">Option B: Air Source Heat Pump</p>
                <p className="ml-4">- Heating demand covered: 80,000 kWh</p>
                <p className="ml-4">- Electricity consumption: 22,850 kWh (SPF 3.5)</p>
                <p className="ml-4">- Capital cost: £85,000</p>
                <p className="ml-4">- Carbon saving: 13,720 kgCO2/year</p>
                <p className="mt-2">Option C: Combined PV + ASHP</p>
                <p className="ml-4">- Total carbon saving: 19,500 kgCO2/year</p>
                <p className="ml-4">- Capital cost: £125,000</p>
                <p className="ml-4 text-green-400">- LZC contribution: 35%+ (exceeds Ene 04 threshold)</p>
                <p className="mt-2 text-green-400">Recommendation: Option C for maximum credits</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Evidence Preparation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">BRUKL output document from approved NCM software (SBEM/DSM)</li>
                <li className="pl-1">Energy model report detailing inputs, assumptions, and results</li>
                <li className="pl-1">Sub-metering schedule with meter types and communication protocols</li>
                <li className="pl-1">External lighting schedule showing all luminaires and controls</li>
                <li className="pl-1">LZC feasibility study with technology options assessment</li>
                <li className="pl-1">Specifications and drawings for energy-related systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">External lighting efficacy: <strong>≥70 lm/W</strong> average</li>
                <li className="pl-1">LZC contribution threshold: <strong>≥10%</strong> of energy or carbon</li>
                <li className="pl-1">Sub-metering intervals: <strong>Hourly</strong> or better</li>
                <li className="pl-1">Ene 01 minimum for Excellent: <strong>6 credits</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late energy modelling:</strong> Model early to inform design decisions</li>
                <li className="pl-1"><strong>Inadequate sub-metering:</strong> Missing systems results in non-compliance</li>
                <li className="pl-1"><strong>Decorative lighting excluded:</strong> All external lighting counts towards efficacy</li>
                <li className="pl-1"><strong>LZC oversizing:</strong> Match capacity to demand profile, not maximum possible</li>
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
                <p className="font-medium text-white mb-1">BREEAM Energy Issues</p>
                <ul className="space-y-0.5">
                  <li>Ene 01 - Energy Performance (EPR)</li>
                  <li>Ene 02 - Sub-metering major uses</li>
                  <li>Ene 03 - External lighting (70 lm/W)</li>
                  <li>Ene 04 - Low/zero carbon (10%+)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Documentation</p>
                <ul className="space-y-0.5">
                  <li>BRUKL output (BER vs TER)</li>
                  <li>Energy model report</li>
                  <li>Sub-metering schedule</li>
                  <li>LZC feasibility study</li>
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
            <Link to="../h-n-c-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3-4">
              Next: Water and Materials
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section3_3;
