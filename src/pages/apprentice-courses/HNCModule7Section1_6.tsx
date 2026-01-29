import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Load Assessment - HNC Module 7 Section 1.6";
const DESCRIPTION = "Master load assessment for electrical installations: maximum demand calculation, diversity factors, DNO supply capacity, load growth allowance, and future expansion planning per BS 7671.";

const quickCheckQuestions = [
  {
    id: "max-demand-definition",
    question: "What is maximum demand in an electrical installation?",
    options: ["The total connected load in kW", "The highest current expected to flow at any time", "The cable rating required", "The DNO supply limit"],
    correctIndex: 1,
    explanation: "Maximum demand is the highest electrical current or power expected to flow at any time in an installation. It is always less than total connected load due to diversity - not all loads operate simultaneously at full capacity."
  },
  {
    id: "diversity-purpose",
    question: "Why are diversity factors applied in load assessment?",
    options: ["To increase cable sizes for safety", "To account for the fact that not all loads operate simultaneously", "To comply with DNO requirements", "To reduce installation costs"],
    correctIndex: 1,
    explanation: "Diversity factors account for the reality that connected loads do not all operate at the same time at full capacity. This allows more realistic sizing of supply equipment without over-engineering the installation."
  },
  {
    id: "supply-capacity",
    question: "What determines the available supply capacity from a DNO?",
    options: ["The customer's requested load only", "The existing network infrastructure and transformer capacity", "BS 7671 regulations", "The size of the service cable"],
    correctIndex: 1,
    explanation: "Available supply capacity depends on the DNO's existing network infrastructure, including local transformer capacity, cable ratings, and network loading. Customers must apply for capacity and the DNO assesses network capability."
  },
  {
    id: "load-growth",
    question: "What is a typical allowance for future load growth in commercial installations?",
    options: ["5% of current demand", "10-25% of current demand", "50% of current demand", "No allowance is required"],
    correctIndex: 1,
    explanation: "Commercial installations typically allow 10-25% spare capacity for future load growth. This prevents costly upgrades when additional equipment is installed and is considered good design practice per BS 7671 guidance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671 Appendix 1, what diversity factor would typically apply to a domestic cooker rated at 12 kW?",
    options: [
      "100% of the full rating",
      "10A + 30% of remainder + 5A for socket",
      "50% of the full rating",
      "80% of the full rating"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Appendix 1 provides a specific formula for domestic cookers: first 10A of rated current at 100%, plus 30% of the remainder, plus 5A if the cooker has a socket outlet."
  },
  {
    id: 2,
    question: "When assessing maximum demand for socket outlets in a commercial office, which approach is recommended?",
    options: ["1 kVA per socket outlet", "VA/m² based on floor area", "100% of all connected loads", "Number of workstations × 2 kW"],
    correctAnswer: 1,
    explanation: "For commercial offices, assessing socket outlet demand using VA per square metre of floor area (typically 25-35 VA/m²) is more accurate than per-socket calculations, accounting for typical office equipment density."
  },
  {
    id: 3,
    question: "What is the typical diversity factor for lighting circuits in a commercial building?",
    options: ["50%", "66%", "90%", "100%"],
    correctAnswer: 2,
    explanation: "Commercial lighting typically attracts a diversity factor of 90% (0.9), as most lighting is likely to be on during occupied hours. Some allowance is made for areas not continuously lit or daylight-controlled zones."
  },
  {
    id: 4,
    question: "A DNO quotes an available supply capacity of 150 kVA. What is the maximum demand (kW) assuming a power factor of 0.95?",
    options: [
      "150 kW",
      "142.5 kW",
      "157.9 kW",
      "158 kW"
    ],
    correctAnswer: 1,
    explanation: "kW = kVA × power factor = 150 × 0.95 = 142.5 kW. The available active power (kW) depends on the power factor of the installation. A typical commercial power factor of 0.95 is often assumed."
  },
  {
    id: 5,
    question: "When calculating maximum demand for motor loads, what factor accounts for starting current?",
    options: [
      "No additional factor required",
      "Largest motor at full load, others at 50%",
      "Largest motor at 125% or higher, others at full load",
      "All motors at 50%"
    ],
    correctAnswer: 2,
    explanation: "For motor installations, the largest motor is typically assessed at 125% (or higher for DOL starting) to account for starting current, with other motors at full load current. This reflects the diversity of motor operation and starting sequences."
  },
  {
    id: 6,
    question: "What information must be provided to the DNO when applying for a new supply?",
    options: [
      "Only the cable size required",
      "Maximum demand, load type, power factor, and growth expectations",
      "The number of circuits",
      "The contractor's name"
    ],
    correctAnswer: 1,
    explanation: "DNO applications require maximum demand (kVA), load type/characteristics, expected power factor, phasing requirements, and anticipated load growth. This enables the DNO to assess network capacity and design the appropriate supply."
  },
  {
    id: 7,
    question: "In a residential development with 20 dwellings, each with a 100A supply, what diversity factor would typically apply?",
    options: [
      "100% (2000A total)",
      "Approximately 50% (1000A equivalent)",
      "Approximately 30-40% (600-800A equivalent)",
      "25% (500A equivalent)"
    ],
    correctAnswer: 2,
    explanation: "Multiple dwelling developments attract significant diversity (typically 0.3-0.4 for 20+ units) because households have different usage patterns. BS 7671 Appendix 1 and ESQCR guidance provide specific factors based on dwelling count."
  },
  {
    id: 8,
    question: "What is the purpose of a block load assessment?",
    options: [
      "To size individual circuit cables",
      "To determine overall supply requirements for a building or site",
      "To calculate voltage drop",
      "To select protective devices"
    ],
    correctAnswer: 1,
    explanation: "A block load assessment determines the overall supply requirements for a building or site, aggregating all load types with appropriate diversity factors to establish maximum demand for DNO supply sizing and main switchgear selection."
  },
  {
    id: 9,
    question: "Which factor most significantly affects future load growth allowance?",
    options: [
      "Current cable sizes",
      "Building use, technology trends, and client expansion plans",
      "DNO preferences",
      "Existing lighting levels"
    ],
    correctAnswer: 1,
    explanation: "Future load growth depends on building use (office technology changes, EV charging), technological trends (LED conversion, heat pumps), and client expansion plans. A thorough understanding of the client's business is essential."
  },
  {
    id: 10,
    question: "What is the recommended approach when calculated maximum demand exceeds available DNO supply?",
    options: [
      "Reduce cable sizes to fit",
      "Apply for supply upgrade, consider on-site generation, or implement load management",
      "Ignore the shortfall",
      "Use smaller protective devices"
    ],
    correctAnswer: 1,
    explanation: "Options include applying for a DNO supply upgrade (may involve infrastructure costs), installing on-site generation or energy storage, implementing intelligent load management/demand response, or reviewing design to reduce demand."
  },
  {
    id: 11,
    question: "How does power factor correction affect maximum demand assessment?",
    options: [
      "It has no effect on demand",
      "It reduces kVA demand for the same kW load, potentially avoiding supply upgrades",
      "It increases the maximum demand",
      "It only affects voltage drop"
    ],
    correctAnswer: 1,
    explanation: "Power factor correction reduces the kVA demand for a given kW load (kVA = kW ÷ pf). Improving power factor from 0.8 to 0.95 reduces kVA by approximately 16%, potentially avoiding expensive supply upgrades."
  },
  {
    id: 12,
    question: "When would you NOT apply diversity to a load in maximum demand calculations?",
    options: [
      "Domestic cooking appliances",
      "Essential/critical loads that must always be available at full capacity",
      "Office small power",
      "Residential heating"
    ],
    correctAnswer: 1,
    explanation: "Critical loads such as hospital life-safety equipment, data centre UPS systems, or essential industrial processes should be assessed at 100% as they must be available at full capacity whenever required, regardless of other loads."
  }
];

const faqs = [
  {
    question: "How do I obtain diversity factors not listed in BS 7671 Appendix 1?",
    answer: "BS 7671 Appendix 1 provides guidance for common domestic situations. For commercial and industrial applications, use industry guidance such as CIBSE Guide K (electricity in buildings), IET guidance notes, manufacturer data, or historical metering data from similar installations. When in doubt, consult with the DNO and apply conservative estimates."
  },
  {
    question: "What happens if my maximum demand calculation is significantly wrong?",
    answer: "Overestimating leads to oversized, more expensive infrastructure. Underestimating may result in overloaded equipment, nuisance tripping, or the need for costly upgrades. It's better to slightly overestimate with reasonable growth allowance than to underestimate. Review calculations with experienced engineers for complex projects."
  },
  {
    question: "How do I account for electric vehicle charging in load assessments?",
    answer: "EV charging adds significant load (7 kW domestic, 22+ kW commercial per point). For multiple charge points, apply diversity based on expected simultaneous usage (typically 0.2-0.5 depending on charger type and user patterns). Consider smart charging systems that can limit simultaneous demand. The DNO may require specific assessments for EV installations."
  },
  {
    question: "Should I include standby generators in maximum demand calculations?",
    answer: "Standby generators do not add to DNO supply demand as they operate when mains supply fails. However, if the generator can parallel with mains (peak lopping), the combined capacity must be considered. Generator sizing is based on essential load demand, not total installation demand."
  },
  {
    question: "How do I handle seasonal load variations in assessments?",
    answer: "Consider peak demand season (typically winter for heating, summer for cooling). Assess HVAC loads based on design conditions (summer/winter peaks). For mixed heating/cooling, the assessment should use whichever season produces the higher demand. Some installations may have different maximum demands in different seasons."
  },
  {
    question: "What is the difference between maximum demand and design current?",
    answer: "Maximum demand (Ib) is the expected highest current under normal operating conditions, used for supply and main equipment sizing. Design current for individual circuits considers the specific load characteristics and any diversity within that circuit. Maximum demand aggregates all circuits with inter-circuit diversity."
  }
];

const HNCModule7Section1_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1">
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
            <span>Module 7.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Load Assessment
          </h1>
          <p className="text-white/80">
            Maximum demand, diversity factors, supply capacity, and future expansion planning
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Maximum demand:</strong> Highest expected current at any time</li>
              <li className="pl-1"><strong>Diversity:</strong> Accounts for non-simultaneous operation</li>
              <li className="pl-1"><strong>Supply capacity:</strong> DNO network capability assessment</li>
              <li className="pl-1"><strong>Growth allowance:</strong> 10-25% for future expansion</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key References</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 7671:</strong> Appendix 1 - Current demand</li>
              <li className="pl-1"><strong>CIBSE Guide K:</strong> Electricity in buildings</li>
              <li className="pl-1"><strong>Engineering Recommendation P2:</strong> DNO planning</li>
              <li className="pl-1"><strong>ESQCR:</strong> Supply quality requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate maximum demand using diversity factors",
              "Apply BS 7671 Appendix 1 guidance correctly",
              "Assess DNO supply capacity requirements",
              "Determine appropriate load growth allowances",
              "Plan for future expansion and technology changes",
              "Coordinate with DNO for supply applications"
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

        {/* Section 1: Maximum Demand Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Maximum Demand Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum demand (MD) is the highest electrical load expected to be drawn from the supply
              at any point in time. It forms the basis for sizing the incoming supply, main switchgear,
              and distribution equipment. Accurate assessment prevents both undersizing (causing
              overloading) and oversizing (increasing costs unnecessarily).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key maximum demand principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Connected load:</strong> Sum of all equipment ratings - always greater than MD</li>
                <li className="pl-1"><strong>Maximum demand:</strong> Actual peak load considering usage patterns</li>
                <li className="pl-1"><strong>Diversity:</strong> Factor accounting for non-simultaneous operation</li>
                <li className="pl-1"><strong>Load factor:</strong> Ratio of average demand to maximum demand</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Demand vs Connected Load</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Installation Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Connected Load</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical MD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversity Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Domestic dwelling</td>
                      <td className="border border-white/10 px-3 py-2">50-80 kW</td>
                      <td className="border border-white/10 px-3 py-2">8-15 kW</td>
                      <td className="border border-white/10 px-3 py-2">0.15-0.25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office building</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">40-80 VA/m²</td>
                      <td className="border border-white/10 px-3 py-2">0.4-0.7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail premises</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">50-150 VA/m²</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial (process)</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">Process dependent</td>
                      <td className="border border-white/10 px-3 py-2">0.6-0.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Maximum Demand Formula</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Maximum Demand (MD):</span></p>
                <p className="text-white">MD = Σ(Connected Load × Diversity Factor × Utilisation Factor)</p>
                <p className="mt-2 text-white/60">Where:</p>
                <p className="text-white/80">Diversity Factor = accounts for non-simultaneous operation</p>
                <p className="text-white/80">Utilisation Factor = proportion of rated capacity actually used</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Maximum demand assessment requires understanding of how the installation will actually be used, not just what is connected.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Diversity Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Diversity Factors by Load Type
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diversity factors reflect the statistical probability that loads will operate
              simultaneously. BS 7671 Appendix 1 provides guidance for domestic installations,
              while commercial and industrial applications require engineering judgement and
              industry-specific data.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Appendix 1 - Domestic Diversity</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversity Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">66% of total load</td>
                      <td className="border border-white/10 px-3 py-2">Assumes not all lights on simultaneously</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating (instantaneous)</td>
                      <td className="border border-white/10 px-3 py-2">100% of largest + 40% of others</td>
                      <td className="border border-white/10 px-3 py-2">Immersion heaters, electric heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard circuits</td>
                      <td className="border border-white/10 px-3 py-2">100% of largest + 40% of others</td>
                      <td className="border border-white/10 px-3 py-2">Including ring final circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooker</td>
                      <td className="border border-white/10 px-3 py-2">10A + 30% remainder + 5A socket</td>
                      <td className="border border-white/10 px-3 py-2">Specific formula for domestic cookers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motors (AC)</td>
                      <td className="border border-white/10 px-3 py-2">Full load + 1/3 starting current</td>
                      <td className="border border-white/10 px-3 py-2">Or largest at 125% + others at 100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial/Industrial Diversity</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Lighting:</strong> 0.9 (90%) commercial</li>
                  <li className="pl-1"><strong>Small power:</strong> 0.4-0.6 office, 0.3-0.5 retail</li>
                  <li className="pl-1"><strong>HVAC:</strong> 0.8-1.0 depending on control</li>
                  <li className="pl-1"><strong>Process equipment:</strong> 0.7-0.9 typically</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multiple Dwellings Diversity</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>2-4 dwellings:</strong> 0.6-0.8</li>
                  <li className="pl-1"><strong>5-9 dwellings:</strong> 0.5-0.6</li>
                  <li className="pl-1"><strong>10-19 dwellings:</strong> 0.4-0.5</li>
                  <li className="pl-1"><strong>20+ dwellings:</strong> 0.3-0.4</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial Socket Outlet Assessment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Small Power (VA/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">25-35</td>
                      <td className="border border-white/10 px-3 py-2">Standard office with PCs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dealing room/IT intensive</td>
                      <td className="border border-white/10 px-3 py-2">50-80</td>
                      <td className="border border-white/10 px-3 py-2">High equipment density</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (general)</td>
                      <td className="border border-white/10 px-3 py-2">15-25</td>
                      <td className="border border-white/10 px-3 py-2">Shop floor areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Restaurant/kitchen</td>
                      <td className="border border-white/10 px-3 py-2">100-200</td>
                      <td className="border border-white/10 px-3 py-2">Commercial kitchen equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Document all diversity assumptions clearly. If historical data or metering is available, use it to validate assumptions.
            </p>
          </div>
        </section>

        {/* Section 3: DNO Supply Capacity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            DNO Supply Capacity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Distribution Network Operators (DNOs) manage the electricity distribution network and
              determine available supply capacity. Understanding DNO processes is essential for
              ensuring adequate supply for new installations and upgrades.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Standard DNO Supply Options</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Single-phase domestic:</span> <span className="text-white">60A, 80A, or 100A (230V)</span></p>
                <p><span className="text-white/60">Three-phase domestic:</span> <span className="text-white">60A or 100A per phase (400V)</span></p>
                <p><span className="text-white/60">Small commercial LV:</span> <span className="text-white">Up to 150 kVA (typically)</span></p>
                <p><span className="text-white/60">Larger commercial LV:</span> <span className="text-white">Up to 1 MVA (network dependent)</span></p>
                <p><span className="text-white/60">HV supply:</span> <span className="text-white">&gt;1 MVA, customer owns HV equipment</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DNO Application Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Information Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Budget estimate</td>
                      <td className="border border-white/10 px-3 py-2">Preliminary cost indication</td>
                      <td className="border border-white/10 px-3 py-2">Approximate load, location, phasing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Formal application</td>
                      <td className="border border-white/10 px-3 py-2">Detailed assessment request</td>
                      <td className="border border-white/10 px-3 py-2">Max demand, load breakdown, power factor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Connection offer</td>
                      <td className="border border-white/10 px-3 py-2">DNO quote for supply</td>
                      <td className="border border-white/10 px-3 py-2">Review capacity, costs, timescales</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Acceptance</td>
                      <td className="border border-white/10 px-3 py-2">Contract agreement</td>
                      <td className="border border-white/10 px-3 py-2">Agree terms, pay connection charges</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energisation</td>
                      <td className="border border-white/10 px-3 py-2">Supply connected</td>
                      <td className="border border-white/10 px-3 py-2">Installation complete, certificates issued</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Network Constraints</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Transformer capacity</li>
                  <li className="pl-1">Cable thermal ratings</li>
                  <li className="pl-1">Voltage regulation limits</li>
                  <li className="pl-1">Fault level capacity</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Distance from network</li>
                  <li className="pl-1">Reinforcement needed</li>
                  <li className="pl-1">Metering requirements</li>
                  <li className="pl-1">HV vs LV supply costs</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Timescales</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Simple: 4-8 weeks</li>
                  <li className="pl-1">Standard: 8-16 weeks</li>
                  <li className="pl-1">With reinforcement: 6-12 months</li>
                  <li className="pl-1">HV installation: 12-24 months</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Planning tip:</strong> Engage with the DNO early in design. Network constraints may require design changes or alternative strategies such as on-site generation or demand management.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Load Growth and Future Expansion */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Load Growth and Future Expansion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Prudent electrical design considers future load growth to avoid costly upgrades.
              BS 7671 recommends allowing for future expansion. The appropriate allowance depends
              on building type, client intentions, and technological trends.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Load Growth Allowances</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Spare Capacity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Domestic (new build)</td>
                      <td className="border border-white/10 px-3 py-2">20-30%</td>
                      <td className="border border-white/10 px-3 py-2">EV charging, heat pumps, home working</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office building</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">Technology changes, tenant fit-out</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centre</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">Rapid IT growth, cooling demands</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial</td>
                      <td className="border border-white/10 px-3 py-2">20-30%</td>
                      <td className="border border-white/10 px-3 py-2">Process expansion, automation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Healthcare</td>
                      <td className="border border-white/10 px-3 py-2">25-35%</td>
                      <td className="border border-white/10 px-3 py-2">Medical equipment, imaging technology</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emerging Load Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>EV charging:</strong> 7-22 kW per point domestic/commercial</li>
                  <li className="pl-1"><strong>Heat pumps:</strong> 3-12 kW replacing gas heating</li>
                  <li className="pl-1"><strong>Battery storage:</strong> Bidirectional power flow</li>
                  <li className="pl-1"><strong>Solar PV:</strong> Export capacity and integration</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Planning Strategies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Size cables/busbar for future capacity</li>
                  <li className="pl-1">Allow spare ways in distribution boards</li>
                  <li className="pl-1">Install larger containment systems</li>
                  <li className="pl-1">Reserve transformer/switchboard space</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Load Growth Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Current assessed maximum demand:</span> <span className="text-white">200 kVA</span></p>
                <p><span className="text-white/60">Growth allowance (20%):</span> <span className="text-white">40 kVA</span></p>
                <p><span className="text-white/60">Design maximum demand:</span> <span className="text-white">240 kVA</span></p>
                <p className="mt-2"><span className="text-white/60">With EV charging (10 × 7 kW):</span> <span className="text-white">+70 kVA (with diversity 0.3 = 21 kVA)</span></p>
                <p><span className="text-white/60">Revised design MD:</span> <span className="text-white">261 kVA → specify 300 kVA supply</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Appendix 1 Guidance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Appendix 1 provides current demand assessment methods</li>
                <li className="pl-1">Encourages consideration of future requirements at design stage</li>
                <li className="pl-1">Notes that allowance should be made for anticipated load increases</li>
                <li className="pl-1">Recognises that good design accommodates change without major rework</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Cost-benefit consideration:</strong> The marginal cost of specifying slightly larger infrastructure at installation is typically much less than retrofitting upgrades later.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Domestic Maximum Demand</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate maximum demand for a 4-bedroom house with electric cooker (12 kW), immersion heater (3 kW), electric shower (9.5 kW), and standard ring circuits.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Lighting: 100 outlets × 100W = 10 kW × 66% = <span className="text-green-400">6.6 kW</span></p>
                <p className="mt-2">Cooker (12 kW at 230V = 52.2A):</p>
                <p className="ml-4">First 10A = 10A</p>
                <p className="ml-4">Remainder: (52.2 - 10) × 30% = 12.7A</p>
                <p className="ml-4">Socket: 5A</p>
                <p className="ml-4">Total: 27.7A × 230V = <span className="text-green-400">6.4 kW</span></p>
                <p className="mt-2">Heating loads (immersion + shower):</p>
                <p className="ml-4">Larger (9.5 kW) at 100% = 9.5 kW</p>
                <p className="ml-4">Smaller (3 kW) at 40% = 1.2 kW</p>
                <p className="ml-4">Total: <span className="text-green-400">10.7 kW</span></p>
                <p className="mt-2">Socket circuits (assume 4 rings):</p>
                <p className="ml-4">Largest at 100% + others at 40%</p>
                <p className="ml-4">Assume typical usage: <span className="text-green-400">~5 kW</span></p>
                <p className="mt-3 text-white border-t border-white/20 pt-2">Total Maximum Demand ≈ 28.7 kW = 125A at 230V</p>
                <p className="text-green-400">100A single-phase supply adequate with managed usage</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Commercial Office Block Load</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Assess maximum demand for a 2,000 m² office building with HVAC.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Lighting: 12 W/m² × 2,000 m² × 0.9 diversity = <span className="text-green-400">21.6 kW</span></p>
                <p className="mt-2">Small power: 30 VA/m² × 2,000 m² × 0.5 diversity = <span className="text-green-400">30 kVA</span></p>
                <p className="mt-2">HVAC (cooling dominant):</p>
                <p className="ml-4">Chillers: 80 kW × 0.9 = 72 kW</p>
                <p className="ml-4">AHUs/FCUs: 25 kW × 0.85 = 21.3 kW</p>
                <p className="ml-4">Pumps: 10 kW × 0.8 = 8 kW</p>
                <p className="ml-4">Total HVAC: <span className="text-green-400">101.3 kW</span></p>
                <p className="mt-2">Lifts: 2 × 15 kW × 0.3 (diversity for 2) = <span className="text-green-400">9 kW</span></p>
                <p className="mt-2">Ancillary (BMS, security, etc.): <span className="text-green-400">5 kW</span></p>
                <p className="mt-3 text-white border-t border-white/20 pt-2">Subtotal: 166.9 kW (at 0.95 pf = 175.7 kVA)</p>
                <p>Add 20% growth: 175.7 × 1.2 = 210.8 kVA</p>
                <p className="text-green-400">Specify 250 kVA supply (standard transformer size)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Motor Load Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate maximum demand for a pump room with 3 motors: 22 kW, 15 kW, and 11 kW.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Motor ratings (assume pf 0.85, efficiency 0.9):</p>
                <p className="ml-4">22 kW: I = 22000 / (√3 × 400 × 0.85 × 0.9) = 41.5A</p>
                <p className="ml-4">15 kW: I = 15000 / (√3 × 400 × 0.85 × 0.9) = 28.3A</p>
                <p className="ml-4">11 kW: I = 11000 / (√3 × 400 × 0.85 × 0.9) = 20.8A</p>
                <p className="mt-2">Maximum demand calculation:</p>
                <p className="ml-4">Largest motor (22 kW) at 125% = 51.9A</p>
                <p className="ml-4">Others at full load: 28.3 + 20.8 = 49.1A</p>
                <p className="ml-4">Total: <span className="text-green-400">101A</span></p>
                <p className="mt-2">In kVA: 101 × √3 × 400 / 1000 = <span className="text-green-400">70 kVA</span></p>
                <p className="text-white/60 mt-2">Note: Starting current considerations may require higher short-term capacity</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Load Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Obtain complete load schedule from design documentation</li>
                <li className="pl-1">Identify load types: lighting, power, HVAC, specialist equipment</li>
                <li className="pl-1">Apply appropriate diversity factors from BS 7671 or industry data</li>
                <li className="pl-1">Consider power factor and correct if necessary</li>
                <li className="pl-1">Add reasonable growth allowance based on building type</li>
                <li className="pl-1">Verify DNO supply availability early in design process</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Domestic lighting diversity: <strong>66%</strong></li>
                <li className="pl-1">Commercial lighting diversity: <strong>90%</strong></li>
                <li className="pl-1">Office small power: <strong>25-35 VA/m²</strong></li>
                <li className="pl-1">Typical growth allowance: <strong>15-25%</strong></li>
                <li className="pl-1">EV charger (domestic): <strong>7 kW</strong> per point</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using connected load as MD</strong> - always apply diversity</li>
                <li className="pl-1"><strong>Ignoring power factor</strong> - kVA ≠ kW unless pf = 1</li>
                <li className="pl-1"><strong>No growth allowance</strong> - leads to costly future upgrades</li>
                <li className="pl-1"><strong>Late DNO engagement</strong> - can delay entire project</li>
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
                <p className="font-medium text-white mb-1">Domestic Diversity (BS 7671)</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 66% of total</li>
                  <li>Cooker: 10A + 30% remainder + 5A socket</li>
                  <li>Heating: 100% largest + 40% others</li>
                  <li>Standard circuits: 100% + 40% others</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Commercial Allowances</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 90% diversity</li>
                  <li>Small power: 25-35 VA/m² (office)</li>
                  <li>Growth: 15-25% typical</li>
                  <li>EV charging: consider with diversity 0.2-0.5</li>
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
            <Link to="../h-n-c-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2-1">
              Next: Section 2.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section1_6;
