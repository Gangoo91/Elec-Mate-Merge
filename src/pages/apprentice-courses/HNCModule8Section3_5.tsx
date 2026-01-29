import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "System Selection - HNC Module 8 Section 3.5";
const DESCRIPTION = "Master air conditioning system selection: cooling load calculations, CIBSE TM54 methodology, DX vs chilled water comparisons, SEER ratings, life cycle cost analysis, Part L compliance, low-GWP refrigerants, and sustainability considerations.";

const quickCheckQuestions = [
  {
    id: "load-calculation",
    question: "What does CIBSE TM54 provide guidance on for cooling load calculations?",
    options: ["Equipment selection only", "Evaluating operational energy use and closing the performance gap", "Refrigerant selection criteria", "Ductwork sizing methods"],
    correctIndex: 1,
    explanation: "CIBSE TM54 provides methodology for evaluating operational energy use in buildings, helping designers close the performance gap between predicted and actual energy consumption through realistic load assessment."
  },
  {
    id: "seer-rating",
    question: "What does SEER stand for and why is it important for system selection?",
    options: ["Standard Energy Efficiency Rating - measures compressor efficiency", "Seasonal Energy Efficiency Ratio - indicates annual cooling efficiency", "System Electrical Efficiency Requirement - regulatory compliance", "Sensible Energy Exchange Rate - heat transfer coefficient"],
    correctIndex: 1,
    explanation: "SEER (Seasonal Energy Efficiency Ratio) measures the cooling efficiency over a typical cooling season, accounting for varying load conditions. Higher SEER values indicate better seasonal performance and lower operating costs."
  },
  {
    id: "dx-vs-chilled",
    question: "For a building requiring precise temperature control across multiple zones, which system type is generally more suitable?",
    options: ["Single-split DX systems", "Multi-split systems", "Chilled water systems with fan coil units", "Window-mounted air conditioning units"],
    correctIndex: 2,
    explanation: "Chilled water systems with fan coil units offer superior zone control, easier balancing, and more stable temperature control across multiple zones. They also provide better central plant redundancy for critical applications."
  },
  {
    id: "life-cycle-cost",
    question: "Which factor typically represents the largest component of life cycle costs for air conditioning systems?",
    options: ["Initial capital cost", "Installation labour", "Energy consumption over the system lifetime", "Annual maintenance costs"],
    correctIndex: 2,
    explanation: "Energy costs typically account for 60-80% of total life cycle costs over a 15-20 year system lifetime. This is why selecting systems with high seasonal efficiency ratings can significantly reduce total cost of ownership."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When calculating cooling loads, which method accounts for thermal mass effects and time lag?",
    options: [
      "Steady-state calculation",
      "Peak load method",
      "Dynamic thermal simulation",
      "Rule of thumb estimation"
    ],
    correctAnswer: 2,
    explanation: "Dynamic thermal simulation accounts for thermal mass, time lag, and varying internal and external conditions throughout the day and year, providing more accurate load predictions than steady-state methods."
  },
  {
    id: 2,
    question: "According to Part L of the Building Regulations, what efficiency requirement applies to comfort cooling systems?",
    options: [
      "Minimum COP of 2.0",
      "Systems must meet minimum seasonal efficiency standards (SEER/SCOP)",
      "No specific requirements for cooling",
      "Maximum power consumption of 50 W/m²"
    ],
    correctAnswer: 1,
    explanation: "Part L requires comfort cooling systems to achieve minimum seasonal efficiency ratings. The Non-Domestic Building Services Compliance Guide specifies minimum SEER values depending on system type and cooling capacity."
  },
  {
    id: 3,
    question: "What is the typical SEER value for a modern VRF system?",
    options: [
      "2.0 - 3.0",
      "3.5 - 4.5",
      "5.0 - 8.0",
      "10.0 - 12.0"
    ],
    correctAnswer: 2,
    explanation: "Modern VRF systems typically achieve SEER values between 5.0 and 8.0, with premium systems exceeding 7.0. This represents significant improvement over traditional split systems which typically achieve 3.5-5.0."
  },
  {
    id: 4,
    question: "For Net Present Value (NPV) analysis of air conditioning options, which discount rate is typically used for commercial projects?",
    options: [
      "0-2%",
      "3.5-6%",
      "10-15%",
      "20-25%"
    ],
    correctAnswer: 1,
    explanation: "Commercial projects typically use discount rates of 3.5-6%, aligned with HM Treasury Green Book guidance. Public sector projects often use 3.5%, while private sector projects may use higher rates reflecting their cost of capital."
  },
  {
    id: 5,
    question: "Which refrigerant has the lowest GWP (Global Warming Potential) among common air conditioning refrigerants?",
    options: [
      "R-410A (GWP 2088)",
      "R-32 (GWP 675)",
      "R-290 (GWP 3)",
      "R-134a (GWP 1430)"
    ],
    correctAnswer: 2,
    explanation: "R-290 (propane) has a GWP of only 3, making it among the lowest of practical refrigerants. However, its flammability (A3 classification) limits charge sizes and applications. R-32 offers a good balance with GWP of 675."
  },
  {
    id: 6,
    question: "When comparing DX and chilled water systems, which statement is correct regarding refrigerant charge?",
    options: [
      "DX systems always have lower total refrigerant charge",
      "Chilled water systems have no refrigerant in the building",
      "VRF systems have lower charge than equivalent chillers",
      "Refrigerant charge is the same regardless of system type"
    ],
    correctAnswer: 1,
    explanation: "Chilled water systems confine refrigerant to the chiller plant room, meaning no refrigerant is distributed throughout the building. This reduces leak risk and simplifies compliance with F-gas regulations for occupied spaces."
  },
  {
    id: 7,
    question: "What is the primary advantage of selecting water-cooled chillers over air-cooled chillers?",
    options: [
      "Lower capital cost",
      "No external plant required",
      "Higher efficiency, especially at peak ambient temperatures",
      "Simpler maintenance requirements"
    ],
    correctAnswer: 2,
    explanation: "Water-cooled chillers maintain higher efficiency at peak ambient temperatures because cooling tower water temperature is lower than peak air temperature. This can improve COP by 20-30% compared to air-cooled alternatives."
  },
  {
    id: 8,
    question: "According to the F-gas Regulation phase-down schedule, what is the GWP limit for single split systems under 3 kg charge from 2025?",
    options: [
      "No limit applies",
      "GWP &lt; 2500",
      "GWP &lt; 750",
      "GWP &lt; 150"
    ],
    correctAnswer: 2,
    explanation: "From 2025, single split systems containing less than 3 kg of fluorinated greenhouse gases must use refrigerants with GWP below 750. This effectively prohibits R-410A (GWP 2088) for most split system applications."
  },
  {
    id: 9,
    question: "What cooling load factor should typically be applied for equipment diversity in office buildings?",
    options: [
      "1.0 (no diversity)",
      "0.9 - 0.95",
      "0.7 - 0.85",
      "0.5 - 0.6"
    ],
    correctAnswer: 2,
    explanation: "Office equipment diversity factors of 0.7-0.85 are typical, reflecting that not all equipment operates simultaneously at maximum load. This reduces oversizing whilst maintaining adequate capacity for realistic operating conditions."
  },
  {
    id: 10,
    question: "For BREEAM Excellent rating, what enhanced commissioning requirement typically applies to air conditioning systems?",
    options: [
      "Standard commissioning only",
      "Seasonal commissioning with post-occupancy verification",
      "No specific commissioning requirements",
      "Self-certification by the installer"
    ],
    correctAnswer: 1,
    explanation: "BREEAM Excellent typically requires seasonal commissioning to verify performance under varying conditions, plus post-occupancy evaluation to confirm systems meet design intent and actual operational requirements."
  },
  {
    id: 11,
    question: "What is the typical payback period for upgrading from SEER 4.0 to SEER 6.0 equipment?",
    options: [
      "Less than 1 year",
      "2-4 years",
      "5-7 years",
      "Over 10 years"
    ],
    correctAnswer: 1,
    explanation: "Upgrading from SEER 4.0 to SEER 6.0 typically achieves 2-4 year payback depending on operating hours and energy costs. The 33% reduction in energy consumption provides substantial ongoing savings."
  },
  {
    id: 12,
    question: "When selecting air conditioning for a data centre, which parameter is most critical?",
    options: [
      "Initial capital cost",
      "Aesthetic appearance",
      "Reliability and redundancy (N+1 or greater)",
      "Quiet operation"
    ],
    correctAnswer: 2,
    explanation: "Data centres require continuous cooling with high reliability. N+1 redundancy (or greater) ensures cooling continues if one unit fails. System availability typically must exceed 99.99% for critical facilities."
  }
];

const faqs = [
  {
    question: "How do I choose between VRF and chilled water for a medium-sized office building?",
    answer: "Consider building size, zone count, and operational requirements. VRF suits buildings under 10,000 m² with diverse zones and varying occupancy, offering quick response and individual zone control. Chilled water is preferred for larger buildings (over 10,000 m²), where central plant provides better efficiency, easier maintenance access, and simpler future expansion. Also consider refrigerant regulations - VRF distributes refrigerant throughout the building whilst chilled water confines it to the plant room."
  },
  {
    question: "What factors should I include in a life cycle cost analysis for air conditioning?",
    answer: "Include: capital costs (equipment, installation, commissioning), energy costs over 15-20 years with realistic escalation rates, planned maintenance (filters, belts, refrigerant), reactive maintenance and component replacement, water treatment for cooling towers or chilled water systems, disposal/decommissioning costs, and carbon pricing if applicable. Use NPV with appropriate discount rate (typically 3.5-6%) and include sensitivity analysis for energy price variations."
  },
  {
    question: "How will F-gas regulations affect my system selection decisions?",
    answer: "F-gas phase-down significantly impacts refrigerant choice. From 2025, single splits under 3 kg must use GWP &lt; 750 refrigerants (excluding R-410A). Systems over 50 tonnes CO2 equivalent require quarterly leak checks and certified technicians. Consider R-32 (GWP 675) for splits, R-290 propane (GWP 3) for small systems, or R-1234ze (GWP 7) for chillers. Alternatively, chilled water systems localise refrigerant in plant rooms, simplifying compliance."
  },
  {
    question: "What is the performance gap and how can good system selection help close it?",
    answer: "The performance gap is the difference between predicted and actual energy consumption - typically buildings use 2-5 times more energy than design predictions. Good system selection addresses this through: realistic load calculations using CIBSE TM54 methodology, appropriate diversity and part-load factors, selecting systems with good part-load efficiency (high SEER/SCOP), ensuring controllability matches operational needs, and specifying proper commissioning and post-occupancy evaluation."
  },
  {
    question: "When should I consider hybrid systems combining DX and chilled water?",
    answer: "Hybrid systems suit buildings with mixed requirements: DX for areas needing quick response or extended hours operation, chilled water for base load and critical areas. Examples include retail with food court (chilled water for common areas, DX for individual tenants), or offices with 24/7 data rooms (dedicated DX for IT, chilled water for general cooling). Hybrids add complexity but offer flexibility and can optimise overall efficiency."
  },
  {
    question: "How do I account for climate change in system selection for a 25-year building life?",
    answer: "Design for future climate using CIBSE TM49 future weather files or UKCP18 projections. Consider: increased cooling degree days (10-30% higher by 2050), more frequent heat waves requiring sustained peak capacity, reduced heating loads offsetting some additional cooling, and potential for natural ventilation to become less effective. Select systems with capacity for future conditions and ensure good part-load efficiency for current, lower loads."
  }
];

const HNCModule8Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3">
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
            <span>Module 8.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            System Selection
          </h1>
          <p className="text-white/80">
            Load calculations, system comparison, life cycle costs, sustainability and selection criteria
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Load calculation:</strong> CIBSE TM54 for realistic predictions</li>
              <li className="pl-1"><strong>System comparison:</strong> DX vs chilled water based on application</li>
              <li className="pl-1"><strong>Life cycle costs:</strong> Energy typically 60-80% of total</li>
              <li className="pl-1"><strong>Sustainability:</strong> Low-GWP refrigerants and high SEER</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L:</strong> Minimum SEER requirements for compliance</li>
              <li className="pl-1"><strong>F-gas:</strong> GWP limits driving refrigerant selection</li>
              <li className="pl-1"><strong>BREEAM:</strong> Enhanced commissioning requirements</li>
              <li className="pl-1"><strong>Performance gap:</strong> Closing predicted vs actual consumption</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate cooling loads using CIBSE methodologies including TM54",
              "Compare DX and chilled water systems for specific applications",
              "Evaluate SEER and SCOP ratings for Part L compliance",
              "Conduct life cycle cost analysis with appropriate discount rates",
              "Select refrigerants considering F-gas regulations and GWP limits",
              "Apply sustainability criteria to system selection decisions"
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

        {/* Section 1: Cooling Load Calculations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Cooling Load Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate cooling load calculation forms the foundation of effective system selection.
              Oversized systems waste capital and operate inefficiently at part load, whilst
              undersized systems fail to maintain comfort conditions during peak periods.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cooling Load Components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fabric gains:</strong> Heat transfer through walls, roof, glazing (U-value dependent)</li>
                <li className="pl-1"><strong>Solar gains:</strong> Direct and diffuse radiation through glazing (orientation critical)</li>
                <li className="pl-1"><strong>Internal gains:</strong> Occupants, lighting, equipment (diversity factors apply)</li>
                <li className="pl-1"><strong>Ventilation load:</strong> Fresh air sensible and latent heat</li>
                <li className="pl-1"><strong>Infiltration:</strong> Uncontrolled air leakage through envelope</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Load Calculation Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Simple (CIBSE Guide A)</td>
                      <td className="border border-white/10 px-3 py-2">Small, simple buildings</td>
                      <td className="border border-white/10 px-3 py-2">±20%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Admittance method</td>
                      <td className="border border-white/10 px-3 py-2">General commercial buildings</td>
                      <td className="border border-white/10 px-3 py-2">±10-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dynamic simulation (TM54)</td>
                      <td className="border border-white/10 px-3 py-2">Complex or critical buildings</td>
                      <td className="border border-white/10 px-3 py-2">±5-10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">CIBSE TM54 Methodology</p>
              <p className="text-sm text-white mb-3">
                TM54 addresses the performance gap by providing a structured approach to predicting
                operational energy use. Key steps include:
              </p>
              <ul className="text-sm text-white/90 space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Separating regulated (Part L) from unregulated energy use</li>
                <li className="pl-1">Using realistic operating hours and occupancy patterns</li>
                <li className="pl-1">Applying appropriate equipment diversity factors</li>
                <li className="pl-1">Accounting for actual system efficiencies at part load</li>
                <li className="pl-1">Including auxiliary energy (pumps, fans, controls)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Internal Heat Gains</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversity Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupants (office)</td>
                      <td className="border border-white/10 px-3 py-2">90-150 W/person (sensible + latent)</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.85</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED lighting</td>
                      <td className="border border-white/10 px-3 py-2">8-12 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">0.8-0.9</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office equipment</td>
                      <td className="border border-white/10 px-3 py-2">15-25 W/m² (general office)</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.85</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data/comms rooms</td>
                      <td className="border border-white/10 px-3 py-2">500-2000 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">0.9-1.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Peak Load vs Annual Energy</p>
              <p className="text-sm text-white">
                Peak load determines system sizing, but annual energy consumption depends on part-load
                performance. A system sized for 100 kW peak may average only 30-40% load across the
                cooling season. This is why SEER (Seasonal Energy Efficiency Ratio) is more meaningful
                than peak COP for comparing systems.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design margin:</strong> Allow 10-15% safety margin on calculated loads, but avoid
              excessive oversizing which reduces efficiency and increases capital cost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: System Comparison - DX vs Chilled Water */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            System Comparison: DX vs Chilled Water
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between direct expansion (DX) systems and chilled water systems represents
              one of the most significant decisions in air conditioning design. Each approach has
              distinct advantages depending on building type, size, and operational requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Comparison Matrix</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Criterion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DX Systems (Split/VRF)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Chilled Water Systems</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical building size</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 10,000 m²</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 5,000 m² (preferred &gt; 10,000 m²)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capital cost</td>
                      <td className="border border-white/10 px-3 py-2">Lower for small systems</td>
                      <td className="border border-white/10 px-3 py-2">Lower per kW for large systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Refrigerant distribution</td>
                      <td className="border border-white/10 px-3 py-2">Throughout building</td>
                      <td className="border border-white/10 px-3 py-2">Confined to plant room</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zone control</td>
                      <td className="border border-white/10 px-3 py-2">Good (VRF excellent)</td>
                      <td className="border border-white/10 px-3 py-2">Excellent with FCUs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Response time</td>
                      <td className="border border-white/10 px-3 py-2">Fast (minutes)</td>
                      <td className="border border-white/10 px-3 py-2">Slower (thermal mass)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance access</td>
                      <td className="border border-white/10 px-3 py-2">Distributed (ceiling void)</td>
                      <td className="border border-white/10 px-3 py-2">Centralised plant room</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Redundancy</td>
                      <td className="border border-white/10 px-3 py-2">Per zone/unit</td>
                      <td className="border border-white/10 px-3 py-2">N+1 at central plant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part load efficiency</td>
                      <td className="border border-white/10 px-3 py-2">VRF: Excellent</td>
                      <td className="border border-white/10 px-3 py-2">Good with VSD and staging</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DX Systems - Best For</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Small to medium buildings (&lt; 10,000 m²)</li>
                  <li className="pl-1">Diverse occupancy patterns</li>
                  <li className="pl-1">Extended hours operation (zones)</li>
                  <li className="pl-1">Speculative developments</li>
                  <li className="pl-1">Phased installation</li>
                  <li className="pl-1">Simultaneous heating and cooling (VRF)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chilled Water - Best For</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Large buildings (&gt; 10,000 m²)</li>
                  <li className="pl-1">Critical facilities requiring redundancy</li>
                  <li className="pl-1">Precise temperature control needs</li>
                  <li className="pl-1">Buildings with central plant rooms</li>
                  <li className="pl-1">Healthcare and laboratories</li>
                  <li className="pl-1">Long pipe runs (water vs refrigerant)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Seasonal Efficiency Ratings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical SEER</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Part L Minimum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single split (&lt; 12 kW)</td>
                      <td className="border border-white/10 px-3 py-2">4.0 - 6.5</td>
                      <td className="border border-white/10 px-3 py-2">SEER &gt; 4.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multi-split system</td>
                      <td className="border border-white/10 px-3 py-2">4.5 - 7.0</td>
                      <td className="border border-white/10 px-3 py-2">SEER &gt; 4.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRF/VRV system</td>
                      <td className="border border-white/10 px-3 py-2">5.0 - 8.0</td>
                      <td className="border border-white/10 px-3 py-2">SEER &gt; 4.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air-cooled chiller</td>
                      <td className="border border-white/10 px-3 py-2">2.8 - 4.0 (EER)</td>
                      <td className="border border-white/10 px-3 py-2">SEER &gt; 3.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water-cooled chiller</td>
                      <td className="border border-white/10 px-3 py-2">5.0 - 7.5 (EER)</td>
                      <td className="border border-white/10 px-3 py-2">SEER &gt; 4.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Understanding SEER vs EER vs COP</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>COP (Coefficient of Performance):</strong> Instantaneous efficiency at specific conditions (e.g., 35°C outdoor)</p>
                <p><strong>EER (Energy Efficiency Ratio):</strong> Cooling capacity (BTU/h) ÷ power input (W) at rated conditions</p>
                <p><strong>SEER (Seasonal EER):</strong> Weighted average efficiency across a typical cooling season, accounting for part-load operation</p>
                <p className="text-white/70 mt-2">SEER is most meaningful for comparing systems as it reflects real-world performance across varying conditions.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> For buildings between 5,000-10,000 m², evaluate both options
              using life cycle cost analysis. The crossover point depends on local energy costs,
              maintenance capabilities, and specific operational requirements.
            </p>
          </div>
        </section>

        {/* Section 3: Life Cycle Cost Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Life Cycle Cost Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Life cycle cost (LCC) analysis evaluates the total cost of ownership over a system's
              lifetime, typically 15-20 years for air conditioning equipment. This approach reveals
              the true cost implications of design decisions beyond initial capital expenditure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Life Cycle Cost Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cost Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical % of LCC</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Variables</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capital (equipment + install)</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">System type, capacity, complexity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy consumption</td>
                      <td className="border border-white/10 px-3 py-2">60-80%</td>
                      <td className="border border-white/10 px-3 py-2">SEER, operating hours, tariff</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Planned maintenance</td>
                      <td className="border border-white/10 px-3 py-2">5-10%</td>
                      <td className="border border-white/10 px-3 py-2">Service frequency, access difficulty</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reactive maintenance</td>
                      <td className="border border-white/10 px-3 py-2">3-8%</td>
                      <td className="border border-white/10 px-3 py-2">Reliability, parts availability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Replacement/disposal</td>
                      <td className="border border-white/10 px-3 py-2">2-5%</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant recovery, disposal costs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Net Present Value Calculation</p>
              <div className="font-mono text-sm space-y-1">
                <p className="text-white">NPV = -C₀ + Σ (Cₙ / (1 + r)ⁿ)</p>
                <p className="mt-2 text-white/80">Where:</p>
                <p className="ml-4 text-white/80">C₀ = Initial capital cost</p>
                <p className="ml-4 text-white/80">Cₙ = Net cash flow in year n (energy savings - operating costs)</p>
                <p className="ml-4 text-white/80">r = Discount rate (typically 3.5-6%)</p>
                <p className="ml-4 text-white/80">n = Year number (1 to system lifetime)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LCC Example: DX vs Chilled Water for 5,000 m² Office</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Item</th>
                      <th className="border border-white/10 px-3 py-2 text-left">VRF System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Chilled Water</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling load</td>
                      <td className="border border-white/10 px-3 py-2">400 kW</td>
                      <td className="border border-white/10 px-3 py-2">400 kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capital cost</td>
                      <td className="border border-white/10 px-3 py-2">£320,000</td>
                      <td className="border border-white/10 px-3 py-2">£380,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SEER</td>
                      <td className="border border-white/10 px-3 py-2">6.5</td>
                      <td className="border border-white/10 px-3 py-2">5.0 (system)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annual energy (1,500 EFLHs)</td>
                      <td className="border border-white/10 px-3 py-2">92,300 kWh</td>
                      <td className="border border-white/10 px-3 py-2">120,000 kWh</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annual energy cost (£0.30/kWh)</td>
                      <td className="border border-white/10 px-3 py-2">£27,700</td>
                      <td className="border border-white/10 px-3 py-2">£36,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annual maintenance</td>
                      <td className="border border-white/10 px-3 py-2">£12,000</td>
                      <td className="border border-white/10 px-3 py-2">£15,000</td>
                    </tr>
                    <tr className="bg-elec-yellow/10">
                      <td className="border border-white/10 px-3 py-2 font-medium">20-year NPV (5% discount)</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">£815,000</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">£1,015,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-white/70 mt-2">
                Note: This example shows VRF advantage at this scale. Results vary significantly with
                building size, operating hours, and energy costs. Always perform project-specific analysis.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensitivity Analysis Factors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy price escalation:</strong> Test 2%, 5%, 8% annual increases</li>
                <li className="pl-1"><strong>Discount rate:</strong> Test 3.5% (public sector) to 8% (private)</li>
                <li className="pl-1"><strong>Operating hours:</strong> Test reduced hours (COVID effect) and extended hours</li>
                <li className="pl-1"><strong>System lifetime:</strong> Test 15, 20, and 25-year scenarios</li>
                <li className="pl-1"><strong>Maintenance costs:</strong> Test ±20% from base estimates</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Energy typically dominates LCC, so a 20% more efficient system
              can justify 30-40% higher capital cost whilst still providing lower total cost of ownership.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Sustainability and Selection Criteria */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Sustainability and Selection Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern system selection must address sustainability requirements including F-gas
              regulations, carbon reduction targets, and building certification schemes. These
              factors increasingly influence both regulatory compliance and market value.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Refrigerant Selection and F-gas Compliance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Refrigerant</th>
                      <th className="border border-white/10 px-3 py-2 text-left">GWP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safety Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R-410A</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">2088</td>
                      <td className="border border-white/10 px-3 py-2">A1 (non-flammable)</td>
                      <td className="border border-white/10 px-3 py-2">Being phased out for new systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R-32</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">675</td>
                      <td className="border border-white/10 px-3 py-2">A2L (mildly flammable)</td>
                      <td className="border border-white/10 px-3 py-2">Splits, VRF (preferred for &lt;3 kg)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R-290 (propane)</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">3</td>
                      <td className="border border-white/10 px-3 py-2">A3 (flammable)</td>
                      <td className="border border-white/10 px-3 py-2">Small systems (&lt;500g charge)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R-1234ze</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">7</td>
                      <td className="border border-white/10 px-3 py-2">A2L (mildly flammable)</td>
                      <td className="border border-white/10 px-3 py-2">Chillers, large systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R-513A</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">631</td>
                      <td className="border border-white/10 px-3 py-2">A1 (non-flammable)</td>
                      <td className="border border-white/10 px-3 py-2">Chillers (R-134a replacement)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">F-gas Regulation Key Dates</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>2025:</strong> Single splits &lt;3 kg must use GWP &lt;750 refrigerants</li>
                <li className="pl-1"><strong>2025:</strong> Multi-splits &lt;3 kg must use GWP &lt;750 refrigerants</li>
                <li className="pl-1"><strong>2027:</strong> All splits and multi-splits must use GWP &lt;750 refrigerants</li>
                <li className="pl-1"><strong>Ongoing:</strong> Phase-down of HFC quotas reducing availability of high-GWP refrigerants</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Compliance Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Minimum efficiency:</strong> Systems must meet SEER minimums per Non-Domestic Building Services Compliance Guide</li>
                <li className="pl-1"><strong>Metering:</strong> Systems &gt;12 kW cooling must have energy metering</li>
                <li className="pl-1"><strong>Controls:</strong> Time and temperature control required, optimum start/stop for larger systems</li>
                <li className="pl-1"><strong>Demand control:</strong> CO₂ or occupancy sensing for variable occupancy spaces</li>
                <li className="pl-1"><strong>Free cooling:</strong> Consider economiser cycles for air handling systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM Credits for Cooling Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Credit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ene 01</td>
                      <td className="border border-white/10 px-3 py-2">Energy performance (EPR improvement)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ene 02</td>
                      <td className="border border-white/10 px-3 py-2">Sub-metering of major energy uses</td>
                      <td className="border border-white/10 px-3 py-2">Up to 2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ene 04</td>
                      <td className="border border-white/10 px-3 py-2">Low and zero carbon technologies</td>
                      <td className="border border-white/10 px-3 py-2">Up to 5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pol 01</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant GWP &lt;10 (exemplary)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Man 04</td>
                      <td className="border border-white/10 px-3 py-2">Seasonal commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Up to 4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Selection Decision Matrix</p>
              <p className="text-sm text-white mb-3">
                Weight and score each factor (1-5) based on project priorities:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Technical Factors</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Peak cooling capacity match</li>
                    <li>Part-load efficiency (SEER)</li>
                    <li>Zone control capability</li>
                    <li>Response time requirements</li>
                    <li>Redundancy and reliability</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Commercial Factors</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Capital cost budget</li>
                    <li>Life cycle cost target</li>
                    <li>Maintenance capability</li>
                    <li>Future flexibility</li>
                    <li>Certification requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Future-Proofing Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Climate change:</strong> Design for future weather conditions (CIBSE TM49)</li>
                <li className="pl-1"><strong>Flexibility:</strong> Consider modular systems for changing requirements</li>
                <li className="pl-1"><strong>Refrigerant availability:</strong> Select refrigerants with long-term availability</li>
                <li className="pl-1"><strong>Grid integration:</strong> Enable demand response and smart grid connection</li>
                <li className="pl-1"><strong>Electrification:</strong> Design for potential elimination of gas heating</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Key principle:</strong> System selection should balance immediate requirements with
              long-term sustainability goals. The lowest capital cost option is rarely the best value
              when life cycle costs and environmental impact are properly considered.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Cooling Load Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate peak cooling load for a 200 m² south-facing office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Floor area: 200 m², ceiling height 2.7 m</p>
                <p className="ml-4">Glazing: 40 m² south-facing, U-value 1.4 W/m²K, g-value 0.4</p>
                <p className="ml-4">Occupancy: 15 people</p>
                <p className="ml-4">Equipment: 25 W/m² (with 0.8 diversity)</p>
                <p className="ml-4">Lighting: 10 W/m²</p>
                <p className="ml-4">Ventilation: 12 l/s per person</p>
                <p className="mt-2 text-white/60">Heat gain calculations:</p>
                <p className="ml-4">Solar gain: 40 m² × 350 W/m² × 0.4 = 5,600 W</p>
                <p className="ml-4">Occupants: 15 × 90 W (sensible) = 1,350 W</p>
                <p className="ml-4">Equipment: 200 × 25 × 0.8 = 4,000 W</p>
                <p className="ml-4">Lighting: 200 × 10 = 2,000 W</p>
                <p className="ml-4">Ventilation: 15 × 12 × 1.2 × 8 = 1,728 W (8K temp diff)</p>
                <p className="mt-2 text-white/60">Total sensible load: 14,678 W</p>
                <p className="text-white/60">Add 10% safety margin: 14,678 × 1.1 = 16,146 W</p>
                <p className="mt-2 text-green-400">Design cooling capacity: 16.5 kW (80 W/m²)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: SEER Comparison and Payback</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare two VRF systems with different SEER ratings.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">System requirements:</p>
                <p className="ml-4">Cooling capacity: 100 kW</p>
                <p className="ml-4">Annual equivalent full load hours: 1,200</p>
                <p className="ml-4">Electricity cost: £0.30/kWh</p>
                <p className="mt-2 text-white/60">Option A: SEER 5.0, Capital £85,000</p>
                <p className="ml-4">Annual energy: (100 × 1,200) / 5.0 = 24,000 kWh</p>
                <p className="ml-4">Annual cost: 24,000 × £0.30 = £7,200</p>
                <p className="mt-2 text-white/60">Option B: SEER 7.0, Capital £105,000</p>
                <p className="ml-4">Annual energy: (100 × 1,200) / 7.0 = 17,143 kWh</p>
                <p className="ml-4">Annual cost: 17,143 × £0.30 = £5,143</p>
                <p className="mt-2 text-white/60">Comparison:</p>
                <p className="ml-4">Capital premium: £105,000 - £85,000 = £20,000</p>
                <p className="ml-4">Annual saving: £7,200 - £5,143 = £2,057</p>
                <p className="mt-2 text-green-400">Simple payback: £20,000 / £2,057 = 9.7 years</p>
                <p className="text-white/60 mt-2">20-year NPV saving (5% discount): £5,600</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Refrigerant Charge Compliance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Check F-gas compliance for a proposed VRF installation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Proposed system:</p>
                <p className="ml-4">VRF system with R-410A refrigerant</p>
                <p className="ml-4">Total charge: 25 kg</p>
                <p className="ml-4">Installation date: 2026</p>
                <p className="mt-2 text-white/60">F-gas calculation:</p>
                <p className="ml-4">R-410A GWP: 2,088</p>
                <p className="ml-4">CO₂ equivalent: 25 kg × 2,088 = 52,200 kg CO₂e</p>
                <p className="ml-4">= 52.2 tonnes CO₂ equivalent</p>
                <p className="mt-2 text-white/60">Requirements:</p>
                <p className="ml-4">&gt; 50 tonnes CO₂e: Quarterly leak checks required</p>
                <p className="ml-4">&gt; 500 tonnes CO₂e: Automatic leak detection required</p>
                <p className="mt-2 text-red-400">Issue: R-410A prohibited for new VRF from 2027</p>
                <p className="text-white/60 mt-2">Recommendation:</p>
                <p className="ml-4">Select R-32 system (GWP 675)</p>
                <p className="ml-4">CO₂ equivalent: 25 × 675 = 16,875 kg = 16.9 tonnes</p>
                <p className="text-green-400">Annual leak checks only (not quarterly)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">System Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Calculate cooling loads using appropriate CIBSE methodology</li>
                <li className="pl-1">Apply realistic diversity factors for internal gains</li>
                <li className="pl-1">Compare at least two system types using LCC analysis</li>
                <li className="pl-1">Verify Part L compliance for minimum SEER requirements</li>
                <li className="pl-1">Check F-gas compliance for refrigerant selection</li>
                <li className="pl-1">Consider BREEAM or other certification requirements</li>
                <li className="pl-1">Evaluate maintenance access and operational requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Energy = <strong>60-80%</strong> of typical life cycle cost</li>
                <li className="pl-1">VRF typical SEER: <strong>5.0 - 8.0</strong></li>
                <li className="pl-1">Water-cooled chiller EER: <strong>5.0 - 7.5</strong></li>
                <li className="pl-1">R-32 GWP: <strong>675</strong> (vs R-410A at 2088)</li>
                <li className="pl-1">F-gas GWP limit from 2025: <strong>&lt;750</strong> for splits &lt;3 kg</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversizing:</strong> Adding excessive safety margins reduces efficiency</li>
                <li className="pl-1"><strong>Ignoring part-load:</strong> Peak COP matters less than seasonal SEER</li>
                <li className="pl-1"><strong>Capital cost focus:</strong> Lowest first cost rarely means lowest LCC</li>
                <li className="pl-1"><strong>F-gas oversight:</strong> Specifying R-410A for systems prohibited from 2025/2027</li>
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
                <p className="font-medium text-white mb-1">System Comparison</p>
                <ul className="space-y-0.5">
                  <li>DX: Best for &lt;10,000 m², diverse zones</li>
                  <li>Chilled water: Best for &gt;10,000 m², critical</li>
                  <li>VRF SEER: 5.0-8.0 typical</li>
                  <li>Water-cooled chiller EER: 5.0-7.5</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Refrigerant GWP</p>
                <ul className="space-y-0.5">
                  <li>R-410A: 2088 (being phased out)</li>
                  <li>R-32: 675 (preferred for DX)</li>
                  <li>R-290 propane: 3 (small systems)</li>
                  <li>R-1234ze: 7 (chillers)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Life Cycle Costs</p>
                <ul className="space-y-0.5">
                  <li>Capital: 15-25% of LCC</li>
                  <li>Energy: 60-80% of LCC</li>
                  <li>Maintenance: 8-18% of LCC</li>
                  <li>Discount rate: 3.5-6% typical</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">F-gas Deadlines</p>
                <ul className="space-y-0.5">
                  <li>2025: GWP &lt;750 for splits &lt;3 kg</li>
                  <li>2027: GWP &lt;750 for all splits</li>
                  <li>&gt;50t CO₂e: Quarterly leak checks</li>
                  <li>&gt;500t CO₂e: Auto leak detection</li>
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
            <Link to="../h-n-c-module8-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3-6">
              Next: Section 3.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section3_5;
