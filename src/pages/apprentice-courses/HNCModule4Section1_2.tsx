import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Diversity Factors - HNC Module 4 Section 1.2";
const DESCRIPTION = "Master diversity factor application for building services: BS 7671 Table 1A guidance, ADMD calculations, typical values for commercial and industrial installations.";

const quickCheckQuestions = [
  {
    id: "diversity-def",
    question: "What does a diversity factor of 0.6 mean?",
    options: ["60% of loads are connected", "Only 60% of connected load operates at peak", "Loads operate 60% of the time", "60% voltage drop is acceptable"],
    correctIndex: 1,
    explanation: "A diversity factor of 0.6 means that at peak demand, only 60% of the total connected load is expected to operate simultaneously. This reduces the calculated maximum demand."
  },
  {
    id: "socket-diversity",
    question: "According to BS 7671 guidance, what diversity applies to socket outlets in an office?",
    options: ["100% of first 10 sockets + 50% remainder", "100% of all sockets", "40% of total connected", "25% of total connected"],
    correctIndex: 0,
    explanation: "BS 7671 Appendix 1 recommends 100% of the first group of socket outlets plus a reduced percentage (typically 40-50%) of the remainder for commercial installations."
  },
  {
    id: "admd-meaning",
    question: "What does ADMD stand for?",
    options: ["Average Daily Maximum Demand", "After Diversity Maximum Demand", "Assessed Design Maximum Demand", "Annual Demand Measurement Data"],
    correctIndex: 1,
    explanation: "ADMD means After Diversity Maximum Demand - the expected peak demand after applying appropriate diversity factors to the connected load."
  },
  {
    id: "lighting-diversity",
    question: "What diversity factor typically applies to office lighting?",
    options: ["100% (no diversity)", "90%", "75%", "50%"],
    correctIndex: 1,
    explanation: "Office lighting typically uses 90% diversity - almost all lights operate during occupied hours, but some areas (meeting rooms, stores) won't be fully lit continuously."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is diversity applied to electrical load calculations?",
    options: [
      "To increase safety margins",
      "To account for loads not operating simultaneously at full capacity",
      "To simplify calculations",
      "To meet planning requirements"
    ],
    correctAnswer: 1,
    explanation: "Diversity accounts for the fact that not all electrical equipment operates at the same time or at full rated capacity. This allows more realistic demand assessment."
  },
  {
    id: 2,
    question: "A building has 100 × 3kW heaters. With 0.6 diversity, what is the diversified load?",
    options: ["300kW", "180kW", "100kW", "60kW"],
    correctAnswer: 1,
    explanation: "Total connected = 100 × 3kW = 300kW. Diversified load = 300kW × 0.6 = 180kW"
  },
  {
    id: 3,
    question: "Which load type typically has the lowest diversity factor?",
    options: ["Socket outlets", "Emergency lighting", "Cooking equipment in domestic", "Office small power"],
    correctAnswer: 1,
    explanation: "Emergency lighting has 100% diversity (no reduction) as all emergency luminaires operate simultaneously when activated - this is essential for life safety."
  },
  {
    id: 4,
    question: "BS 7671 Appendix 1 Table 1A provides guidance on:",
    options: [
      "Cable current ratings",
      "Diversity allowances for domestic installations",
      "Earth fault loop impedance",
      "RCD disconnection times"
    ],
    correctAnswer: 1,
    explanation: "Table 1A in BS 7671 Appendix 1 provides diversity factors specifically for domestic installations. Commercial diversity requires engineering judgement."
  },
  {
    id: 5,
    question: "For a housing estate, ADMD is calculated per dwelling. A typical UK dwelling has ADMD of:",
    options: ["1-2 kVA", "2-3 kVA", "5-8 kVA", "15-20 kVA"],
    correctAnswer: 1,
    explanation: "Typical UK dwelling ADMD is 2-3 kVA (often 2.5 kVA used), though this varies with property size, heating type, and EV charging provision."
  },
  {
    id: 6,
    question: "When calculating ADMD for a block of 50 flats, the diversity factor between dwellings is:",
    options: ["1.0 (no diversity)", "Applied - total is less than 50 × individual ADMD", "Applied only to heating", "Not permitted by BS 7671"],
    correctAnswer: 1,
    explanation: "Inter-dwelling diversity is applied because not all flats experience peak demand simultaneously. 50 flats at 2.5kVA each would total 125kVA, but diversified demand might be 60-80kVA."
  },
  {
    id: 7,
    question: "Which statement about diversity factors is correct?",
    options: [
      "Diversity can only be applied once at the main incomer",
      "Individual circuits should not have diversity applied",
      "Diversity can be applied at each distribution level",
      "Only DNO-approved diversity factors can be used"
    ],
    correctAnswer: 2,
    explanation: "Diversity can be applied at each distribution level (final circuits, distribution boards, sub-mains), but care must be taken not to compound diversity inappropriately."
  },
  {
    id: 8,
    question: "A commercial kitchen has 50kW of cooking equipment. What diversity might apply?",
    options: ["20-30%", "40-50%", "80-90%", "100%"],
    correctAnswer: 2,
    explanation: "Commercial kitchens typically operate at 80-90% of connected load during peak service times. Diversity is lower than offices because most equipment operates simultaneously during service."
  },
  {
    id: 9,
    question: "How does diversity differ between daytime and 24-hour buildings?",
    options: [
      "No difference in diversity factors",
      "24-hour buildings have higher diversity overall",
      "24-hour buildings have lower peak-to-average ratio",
      "Diversity only applies to daytime buildings"
    ],
    correctAnswer: 2,
    explanation: "24-hour buildings (hospitals, data centres) have lower peak-to-average ratios as loads are more evenly distributed. Peak demand may be similar but average demand is higher."
  },
  {
    id: 10,
    question: "When should diversity NOT be applied?",
    options: [
      "For emergency systems and life safety equipment",
      "For motor loads",
      "For lighting circuits",
      "For heating circuits"
    ],
    correctAnswer: 0,
    explanation: "Emergency systems (emergency lighting, fire alarm, smoke extract) must be calculated at 100% - all equipment operates simultaneously during an emergency."
  }
];

const faqs = [
  {
    question: "Can I apply my own diversity factors or must I use published values?",
    answer: "BS 7671 Table 1A provides guidance for domestic installations. For commercial and industrial buildings, diversity factors are based on engineering judgement, using CIBSE guidance, measured data from similar buildings, and operational knowledge. The designer takes responsibility for the factors applied."
  },
  {
    question: "How do I determine diversity for a unique building type?",
    answer: "Start with CIBSE benchmarks for similar building types. Consider operational patterns - when loads operate, for how long, and at what capacity. Review measured data from comparable installations if available. Apply conservative factors initially, then refine based on commissioning data."
  },
  {
    question: "What is the relationship between diversity and load factor?",
    answer: "Diversity relates to peak demand (reducing connected load to maximum demand). Load factor relates to average demand (average ÷ maximum). High diversity means low peak compared to connected load. High load factor means consistent demand over time. A building can have high diversity but low load factor."
  },
  {
    question: "How does EV charging affect dwelling ADMD?",
    answer: "A 7kW EV charger significantly increases dwelling ADMD if charged at peak times. Smart charging with off-peak operation has minimal impact on peak ADMD. DNOs are developing specific guidance, but currently 1-2kVA per dwelling might be added for EV-ready installations, assuming diversity between vehicles."
  },
  {
    question: "Should I apply diversity to standby generator sizing?",
    answer: "Generally yes, but with care. Generator sizing considers both running load (diversified) and starting duty (may need full motor starting kVA). Essential loads typically have higher diversity (lower reduction) than general loads. Consult generator manufacturer guidance for starting calculations."
  },
  {
    question: "How does diversity change with building size?",
    answer: "Larger buildings generally have higher diversity (more loads, more variation in use patterns). A 10-desk office might have 50% small power diversity; a 1000-desk building might achieve 30%. However, large single-process loads (data centres, manufacturing) may have low diversity regardless of size."
  }
];

const HNCModule4Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1">
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
            <span>Module 4.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Diversity Factors
          </h1>
          <p className="text-white/80">
            Understanding and applying diversity to achieve accurate maximum demand calculations in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Diversity factor:</strong> Ratio of maximum demand to connected load</li>
              <li className="pl-1"><strong>Purpose:</strong> Account for non-simultaneous operation</li>
              <li className="pl-1"><strong>BS 7671:</strong> Table 1A for domestic guidance</li>
              <li className="pl-1"><strong>ADMD:</strong> After Diversity Maximum Demand</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Lighting:</strong> 90% typical (high coincidence)</li>
              <li className="pl-1"><strong>Small power:</strong> 30-50% typical</li>
              <li className="pl-1"><strong>HVAC:</strong> 70-100% depending on system</li>
              <li className="pl-1"><strong>Emergency:</strong> 100% (no diversity)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define diversity factor and its role in load assessment",
              "Apply BS 7671 Table 1A diversity factors for domestic installations",
              "Select appropriate diversity for commercial building services",
              "Calculate ADMD for individual dwellings and developments",
              "Understand when diversity should not be applied",
              "Apply diversity at multiple distribution levels correctly"
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

        {/* Section 1: Diversity Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Diversity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diversity is the recognition that not all connected electrical equipment operates simultaneously
              at full rated capacity. Understanding and correctly applying diversity is essential for
              economical yet safe electrical system design.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Diversity Equation</p>
              <p className="font-mono text-center text-lg mb-2">Maximum Demand = Connected Load × Diversity Factor</p>
              <p className="text-xs text-white/70 text-center">Diversity Factor is always ≤ 1.0</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors affecting diversity:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Number of loads:</strong> More loads generally means higher diversity</li>
                <li className="pl-1"><strong>Type of loads:</strong> Some loads have inherently low diversity</li>
                <li className="pl-1"><strong>Usage patterns:</strong> Intermittent vs continuous operation</li>
                <li className="pl-1"><strong>Control systems:</strong> Automated load management reduces peaks</li>
                <li className="pl-1"><strong>Building type:</strong> Different usage patterns by sector</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Diversity Factors by Load Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reasoning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting (office)</td>
                      <td className="border border-white/10 px-3 py-2">0.9</td>
                      <td className="border border-white/10 px-3 py-2">Most lights on during occupied hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power (office)</td>
                      <td className="border border-white/10 px-3 py-2">0.3-0.5</td>
                      <td className="border border-white/10 px-3 py-2">Desks not all occupied, PCs vary</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC (constant)</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Runs continuously at design load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC (VAV)</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.8</td>
                      <td className="border border-white/10 px-3 py-2">Variable air volume reduces average</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.7</td>
                      <td className="border border-white/10 px-3 py-2">Not all cars run simultaneously</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">All on during emergency (no diversity)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Lower diversity factor = less equipment operating simultaneously = lower maximum demand
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: BS 7671 Table 1A */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 7671 Table 1A Guidance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Appendix 1, Table 1A provides diversity factors specifically for domestic installations.
              These are guidance values that have proven reliable over many years of application.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Table 1A - Domestic Diversity</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversity Allowance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">66% of total connected load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating and power</td>
                      <td className="border border-white/10 px-3 py-2">100% of largest + 40% of remaining</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooking appliances</td>
                      <td className="border border-white/10 px-3 py-2">10A + 30% of remaining + 5A if socket</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motors (excluding lifts)</td>
                      <td className="border border-white/10 px-3 py-2">100% largest + 40% of remaining</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Instantaneous water heaters</td>
                      <td className="border border-white/10 px-3 py-2">100% of largest + 100% of 2nd largest + 25% remainder</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal storage heaters</td>
                      <td className="border border-white/10 px-3 py-2">100% (all charge together overnight)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlets (domestic)</td>
                      <td className="border border-white/10 px-3 py-2">100% of largest circuit + 40% of others</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important Notes on Table 1A</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Table 1A applies to <strong>domestic</strong> installations only</li>
                <li className="pl-1">Commercial installations require engineering judgement</li>
                <li className="pl-1">These are <strong>guidance values</strong>, not mandatory requirements</li>
                <li className="pl-1">Designer responsibility to select appropriate values</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Application note:</strong> Table 1A values are conservative for typical dwellings. Higher diversity might apply for small flats; lower diversity for large houses.
            </p>
          </div>
        </section>

        {/* Section 3: Commercial Building Services Diversity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Commercial Building Services Diversity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commercial installations require more sophisticated diversity analysis than domestic.
              CIBSE Guide A and engineering judgement based on operational patterns are the primary references.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diversity by Building Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Overall Diversity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (standard)</td>
                      <td className="border border-white/10 px-3 py-2">0.6-0.7</td>
                      <td className="border border-white/10 px-3 py-2">Daytime operation, variable occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (prestige)</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.8</td>
                      <td className="border border-white/10 px-3 py-2">Higher small power density</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (general)</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.8</td>
                      <td className="border border-white/10 px-3 py-2">High lighting, lower small power</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supermarket</td>
                      <td className="border border-white/10 px-3 py-2">0.85-0.95</td>
                      <td className="border border-white/10 px-3 py-2">Refrigeration constant load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.8</td>
                      <td className="border border-white/10 px-3 py-2">24-hour, mixed loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centre</td>
                      <td className="border border-white/10 px-3 py-2">0.9-1.0</td>
                      <td className="border border-white/10 px-3 py-2">Constant IT load, minimal diversity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Manufacturing</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.9</td>
                      <td className="border border-white/10 px-3 py-2">Highly variable by process</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Small Power Diversity</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">General office: 25-35 W/m² connected</li>
                  <li className="pl-1">Typical diversity: 0.4 (40%)</li>
                  <li className="pl-1">Diversified: 10-14 W/m²</li>
                  <li className="pl-1">Higher for dealing rooms, call centres</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Diversity Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Constant volume: ~100% at design conditions</li>
                  <li className="pl-1">VAV systems: 70-80% typical</li>
                  <li className="pl-1">VRF systems: 60-70% typical</li>
                  <li className="pl-1">Consider heating vs cooling modes</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Commercial diversity factors require justification. Document your assumptions and the basis for diversity applied.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: ADMD Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            ADMD Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After Diversity Maximum Demand (ADMD) is particularly important for residential developments
              where multiple dwellings share infrastructure. DNOs publish ADMD tables for different dwelling types.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Dwelling ADMD Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Dwelling Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ADMD (kVA)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-bed flat (gas heating)</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2.0</td>
                      <td className="border border-white/10 px-3 py-2">Low electrical demand</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2-bed flat (gas heating)</td>
                      <td className="border border-white/10 px-3 py-2">2.0-2.5</td>
                      <td className="border border-white/10 px-3 py-2">Standard assumption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3-bed house (gas heating)</td>
                      <td className="border border-white/10 px-3 py-2">2.5-3.0</td>
                      <td className="border border-white/10 px-3 py-2">Typical family home</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large house (gas heating)</td>
                      <td className="border border-white/10 px-3 py-2">3.0-4.0</td>
                      <td className="border border-white/10 px-3 py-2">Higher than average demand</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">All-electric dwelling</td>
                      <td className="border border-white/10 px-3 py-2">4.0-6.0</td>
                      <td className="border border-white/10 px-3 py-2">Heat pump or direct electric</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">With 7kW EV charger</td>
                      <td className="border border-white/10 px-3 py-2">+1.0-2.0</td>
                      <td className="border border-white/10 px-3 py-2">Additional allowance (with diversity)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inter-Dwelling Diversity</p>
              <p className="text-sm text-white mb-3">For multiple dwellings, total ADMD is not simply n × individual ADMD:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>10 dwellings × 2.5kVA = 25kVA connected</p>
                <p>Diversified total ≈ 15-18kVA (diversity factor ~0.6-0.7)</p>
                <p className="mt-2">50 dwellings × 2.5kVA = 125kVA connected</p>
                <p>Diversified total ≈ 60-75kVA (diversity factor ~0.5-0.6)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Development ADMD Calculation Steps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Step 1: Determine individual dwelling ADMD (from DNO tables or engineering assessment)</li>
                <li className="pl-1">Step 2: Apply inter-dwelling diversity factor based on number of dwellings</li>
                <li className="pl-1">Step 3: Add landlord services (lifts, lighting, pumps) at appropriate diversity</li>
                <li className="pl-1">Step 4: Add non-domestic loads (retail units) separately</li>
                <li className="pl-1">Step 5: Sum for total development maximum demand</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>DNO guidance:</strong> Always check with the local DNO for their specific ADMD values and diversity tables - these vary between network operators.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Domestic Consumer Unit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate diversified demand for: Lighting 3kW, Ring circuits 2 × 7.2kW, Cooker 12kW, Shower 9kW.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Lighting: 3kW × 0.66 = 1.98kW</p>
                <p>Socket circuits: 7.2 + (7.2 × 0.4) = 10.08kW</p>
                <p>Cooker: 10A(2.3kW) + (12-2.3) × 0.3 = 5.2kW</p>
                <p>Shower: 9kW × 1.0 = 9kW</p>
                <p className="mt-2">Total diversified = 1.98 + 10.08 + 5.2 + 9 = <strong>26.3kW</strong></p>
                <p className="text-white/60">Compare to connected load: 3 + 14.4 + 12 + 9 = 38.4kW</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Office Floor Plate</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 2000m² office floor has: Lighting 24kW, Small power 60kW, Fan coils 30kW. Calculate diversified demand.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Lighting: 24kW × 0.9 = 21.6kW</p>
                <p>Small power: 60kW × 0.4 = 24kW</p>
                <p>Fan coils: 30kW × 0.8 = 24kW</p>
                <p className="mt-2">Total diversified = 21.6 + 24 + 24 = <strong>69.6kW</strong></p>
                <p className="text-white/60">Connected load was 114kW - diversity factor = 0.61</p>
                <p className="mt-2">At 0.9 pf: 69.6 ÷ 0.9 = <strong>77.3 kVA</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Residential Development ADMD</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate maximum demand for 30 × 2-bed flats (gas heating) with communal lighting 5kW and lift 15kW.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Individual flat ADMD: 2.5kVA</p>
                <p>30 flats connected: 30 × 2.5 = 75kVA</p>
                <p>Inter-dwelling diversity (30 units): ~0.55</p>
                <p>Diversified flats: 75 × 0.55 = 41.25kVA</p>
                <p className="mt-2">Landlord services:</p>
                <p>Lighting: 5kW × 1.0 = 5kVA (essential, no diversity)</p>
                <p>Lift: 15kW × 0.6 = 9kVA</p>
                <p className="mt-2">Total ADMD = 41.25 + 5 + 9 = <strong>55.3 kVA</strong></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Diversity Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify building type and operational patterns</li>
                <li className="pl-1">List all load categories with connected values</li>
                <li className="pl-1">Select diversity factors from CIBSE or engineering judgement</li>
                <li className="pl-1">Apply no diversity to emergency/life safety systems</li>
                <li className="pl-1">Document all assumptions for future reference</li>
                <li className="pl-1">Validate against benchmark data where available</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Domestic lighting: <strong>66%</strong></li>
                <li className="pl-1">Office small power: <strong>30-40%</strong></li>
                <li className="pl-1">Office lighting: <strong>90%</strong></li>
                <li className="pl-1">Emergency systems: <strong>100%</strong> (no diversity)</li>
                <li className="pl-1">Typical dwelling ADMD: <strong>2-3 kVA</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Compounding diversity</strong> — Don't apply diversity twice at different levels</li>
                <li className="pl-1"><strong>Using domestic values commercially</strong> — Commercial needs specific assessment</li>
                <li className="pl-1"><strong>Applying diversity to emergency systems</strong> — Life safety always 100%</li>
                <li className="pl-1"><strong>Ignoring process loads</strong> — Industrial loads may have low diversity</li>
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
                <p className="font-medium text-white mb-1">Domestic (BS 7671 Table 1A)</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 66% of total</li>
                  <li>Sockets: 100% largest + 40% remainder</li>
                  <li>Cooking: 10A + 30% remainder + 5A</li>
                  <li>Water heaters: 100% + 100% + 25%</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Commercial Guidance</p>
                <ul className="space-y-0.5">
                  <li>Office lighting: 90%</li>
                  <li>Office small power: 30-40%</li>
                  <li>HVAC: 70-100% by type</li>
                  <li>Emergency: 100% always</li>
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
            <Link to="../h-n-c-module4-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Maximum Demand
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1-3">
              Next: Power Factor
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section1_2;
