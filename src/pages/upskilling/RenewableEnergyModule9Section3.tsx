import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cost-Benefit Analysis (Domestic vs Commercial) - Renewable Energy Module 9";
const DESCRIPTION = "Compare the financial considerations for domestic and commercial renewable energy installations including system sizing, consumption patterns, and business case development.";

const quickCheckQuestions = [
  {
    id: "cost-benefit-check-1",
    question: "Why do commercial systems often have shorter payback periods than domestic?",
    options: [
      "Commercial electricity prices are lower",
      "Higher self-consumption rates due to daytime usage patterns",
      "Commercial systems receive more subsidies",
      "Commercial panels are more efficient"
    ],
    correctIndex: 1,
    explanation: "Commercial premises typically have higher daytime electricity consumption that aligns with solar generation, enabling higher self-consumption rates and avoiding more expensive import electricity."
  },
  {
    id: "cost-benefit-check-2",
    question: "What cost advantage do larger commercial systems typically have?",
    options: [
      "No cost advantage",
      "Lower cost per kW installed due to economies of scale",
      "Free installation",
      "Government covers half the cost"
    ],
    correctIndex: 1,
    explanation: "Larger systems benefit from economies of scale in equipment purchasing, installation efficiency, and fixed costs being spread over more capacity, resulting in lower cost per kW installed."
  },
  {
    id: "cost-benefit-check-3",
    question: "What additional financial consideration applies to commercial installations?",
    options: [
      "No additional considerations",
      "Capital allowances and tax relief on equipment",
      "Automatic grants",
      "Free electricity for 5 years"
    ],
    correctIndex: 1,
    explanation: "Businesses can claim capital allowances on renewable energy equipment, reducing tax liability. This effectively reduces the net cost of installation and improves financial returns."
  },
  {
    id: "cost-benefit-check-4",
    question: "What makes domestic consumption patterns challenging for maximising solar value?",
    options: [
      "Domestic systems are smaller",
      "Many households are empty during peak solar hours when generation is highest",
      "Domestic tariffs are lower",
      "Panels produce less on houses"
    ],
    correctIndex: 1,
    explanation: "Many households have low daytime occupancy, meaning peak solar generation occurs when nobody is home to use it. This reduces self-consumption unless batteries or smart controls are used."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is typically the largest single cost in a domestic PV installation?",
    options: [
      "Scaffolding",
      "The solar panels themselves",
      "Labour costs",
      "DNO application fees"
    ],
    correctAnswer: 1,
    explanation: "Solar panels typically represent the largest single cost component in domestic installations, followed by the inverter and then labour and mounting hardware."
  },
  {
    id: 2,
    question: "How do commercial electricity rates typically compare to domestic?",
    options: [
      "Always higher than domestic",
      "Usually lower per unit but with demand charges",
      "Exactly the same",
      "Only half the domestic rate"
    ],
    correctAnswer: 1,
    explanation: "Commercial electricity rates are often lower per unit than domestic rates but may include demand charges based on peak usage. The value of solar depends on the specific tariff structure."
  },
  {
    id: 3,
    question: "What factor makes weekend generation problematic for many commercial installations?",
    options: [
      "Panels do not work on weekends",
      "Reduced or zero consumption when premises are closed",
      "Electricity is free on weekends",
      "DNO restrictions on weekend export"
    ],
    correctAnswer: 1,
    explanation: "Many commercial premises have reduced or zero occupancy on weekends, meaning solar generation during these periods is largely exported at lower SEG rates rather than self-consumed."
  },
  {
    id: 4,
    question: "What does 'load profile matching' mean in commercial system design?",
    options: [
      "Matching panel colours to the building",
      "Sizing the system to align generation with the premises' consumption pattern",
      "Connecting to three-phase supply",
      "Installing batteries"
    ],
    correctAnswer: 1,
    explanation: "Load profile matching means designing the system size and configuration to align generation with the premises' actual consumption pattern, maximising self-consumption and financial returns."
  },
  {
    id: 5,
    question: "What business benefit beyond direct savings might solar provide for commercial premises?",
    options: [
      "No other benefits",
      "Enhanced environmental credentials and ESG reporting",
      "Automatic planning permission",
      "Reduced business rates"
    ],
    correctAnswer: 1,
    explanation: "Solar installations can enhance environmental credentials, support ESG (Environmental, Social, Governance) reporting, and demonstrate corporate responsibility, which may have commercial value beyond direct energy savings."
  },
  {
    id: 6,
    question: "What financing option is more commonly available for commercial than domestic installations?",
    options: [
      "Credit cards",
      "Power Purchase Agreements (PPAs) where a third party owns the system",
      "Personal loans",
      "Mortgages"
    ],
    correctAnswer: 1,
    explanation: "Power Purchase Agreements (PPAs) are more common in commercial contexts, where a third party installs and owns the system, selling electricity to the premises at an agreed rate."
  },
  {
    id: 7,
    question: "What grid connection consideration differs between large domestic and commercial systems?",
    options: [
      "No differences",
      "Larger systems may require G99 application and potential network reinforcement",
      "Commercial systems do not connect to the grid",
      "DNO fees are waived for commercial"
    ],
    correctAnswer: 1,
    explanation: "Larger commercial systems may exceed G98 limits, requiring G99 applications with potential network studies and reinforcement costs, adding complexity and potential expense."
  },
  {
    id: 8,
    question: "How does roof ownership affect commercial solar decisions?",
    options: [
      "Roof ownership is irrelevant",
      "Leased premises may require landlord consent and complicate investment decisions",
      "Only owned roofs can have solar",
      "Landlords must pay for installation"
    ],
    correctAnswer: 1,
    explanation: "Businesses in leased premises need landlord consent for solar installation. Lease terms, remaining lease duration, and who benefits from the installation all affect the investment decision."
  },
  {
    id: 9,
    question: "What maintenance consideration differs for commercial flat roof installations?",
    options: [
      "No differences",
      "Easier access but potential for more debris accumulation requiring cleaning",
      "Flat roofs cannot have solar",
      "Maintenance is never needed"
    ],
    correctAnswer: 1,
    explanation: "Flat roof installations offer easier access for maintenance but may accumulate more debris and require more frequent cleaning than pitched roofs where rain naturally cleans panels."
  },
  {
    id: 10,
    question: "What should a comprehensive commercial solar proposal include beyond domestic proposals?",
    options: [
      "Nothing additional",
      "Load profile analysis, demand charge impacts, and business case with tax implications",
      "Marketing materials only",
      "Competitor pricing"
    ],
    correctAnswer: 1,
    explanation: "Commercial proposals should include detailed load profile analysis, impact on demand charges, comprehensive business case documentation including capital allowances, and projections suitable for board-level decisions."
  }
];

const faqs = [
  {
    question: "What system size is optimal for domestic installations?",
    answer: "Optimal sizing depends on roof space, consumption, and budget. A system that generates roughly your annual consumption often provides good returns, but higher self-consumption rates with smaller systems may yield better payback. Consider future consumption changes (EVs, heat pumps) and the potential for battery storage. Systems between 3-6kW are common for UK homes."
  },
  {
    question: "How do I assess a commercial premises' solar potential?",
    answer: "Obtain half-hourly consumption data from the energy supplier to understand the load profile. Survey the roof for available area, orientation, and shading. Compare generation profiles with consumption to estimate self-consumption. Consider operational patterns including weekend closures and seasonal variations."
  },
  {
    question: "What is a Power Purchase Agreement (PPA)?",
    answer: "A PPA is a financing arrangement where a third party installs, owns, and maintains the solar system on your roof. You purchase the electricity generated at an agreed rate, typically lower than grid prices. PPAs avoid upfront capital cost but the savings are lower than outright ownership. They suit organisations preferring operating expense models over capital investment."
  },
  {
    question: "How do I justify solar investment to commercial decision-makers?",
    answer: "Present a comprehensive business case including ROI calculations, payback periods, NPV analysis, and comparison with alternative investments. Include risk analysis, sensitivity to energy price changes, and non-financial benefits (ESG, brand value). Use clear graphics and executive summaries. Be prepared to address due diligence questions about warranties, maintenance, and installer credentials."
  },
  {
    question: "Should domestic customers with low daytime consumption still consider solar?",
    answer: "Yes, with appropriate expectations. Battery storage can shift generation to evening usage. Smart home devices can automate daytime appliance use. Heat pump pre-heating and EV daytime charging increase self-consumption. Even with primarily export use, systems can still provide reasonable returns over their lifetime, particularly if electricity prices continue rising."
  },
  {
    question: "What additional costs might commercial installations incur?",
    answer: "Commercial installations may require structural assessments, Planning permission in some cases, G99 applications and potential DNO charges, three-phase electrical work, specialist access equipment, longer cable runs, enhanced monitoring systems, and more complex project management. These should all be factored into proposals."
  }
];

const RenewableEnergyModule9Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-9">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Cost-Benefit Analysis</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 9 - Section 3</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Cost-Benefit Analysis
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Comparing domestic and commercial renewable energy investments
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Commercial:</span> Higher self-consumption, economies of scale
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Domestic:</span> Simpler process, personal benefit
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Load Matching:</span> Key to maximising financial returns
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Tax Benefits:</span> Capital allowances for businesses
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Key differences between domestic and commercial projects",
            "Load profile analysis for system sizing",
            "Commercial financing options including PPAs",
            "Tax and capital allowance considerations",
            "Developing compelling business cases"
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Domestic System Economics</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Domestic solar installations typically range from 2-6kW, designed to suit available roof space and household consumption. The economics are relatively straightforward but depend heavily on individual circumstances.
            </p>
            <p>
              <span className="text-white font-medium">Typical Costs:</span> Domestic systems currently cost approximately 1,200-1,800 per kW installed, including all equipment, installation, and certification. A typical 4kW system might cost 5,000-7,000. Costs vary by location, roof complexity, and installer.
            </p>
            <p>
              <span className="text-white font-medium">Consumption Patterns:</span> The challenge for many domestic systems is daytime absence. If residents work away from home, peak solar generation occurs when nobody is using electricity. Typical domestic self-consumption without batteries is 30-50%.
            </p>
            <p>
              <span className="text-white font-medium">Increasing Self-Consumption:</span> Battery storage, smart home devices (scheduling washing machines, dishwashers for sunny periods), EV charging, and heat pump pre-heating can increase self-consumption significantly, improving returns.
            </p>
            <p>
              <span className="text-white font-medium">Simple Decision Making:</span> Domestic customers typically make decisions based on payback period, overall savings, and environmental motivation. Complex financial metrics are less important than clear, honest projections of savings.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Commercial System Economics</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Commercial installations offer different economic characteristics. Larger systems, professional decision-making, and different consumption patterns all affect the business case.
            </p>
            <p>
              <span className="text-white font-medium">Economies of Scale:</span> Larger systems benefit from lower costs per kW. Equipment can be purchased in larger quantities, installation efficiency improves, and fixed costs (scaffolding, mobilisation) are spread over more capacity. Commercial systems might achieve 800-1,200 per kW.
            </p>
            <p>
              <span className="text-white font-medium">Daytime Consumption:</span> Commercial premises typically operate during daylight hours when solar generation is highest. Offices, factories, retail, and hospitality all have significant daytime loads, enabling higher self-consumption rates often exceeding 70-80%.
            </p>
            <p>
              <span className="text-white font-medium">Demand Charges:</span> Many commercial electricity tariffs include demand charges based on peak usage. Solar can reduce these charges by providing power during peak demand periods, adding value beyond simple kWh savings.
            </p>
            <p>
              <span className="text-white font-medium">Weekend Impact:</span> Premises closed on weekends (offices, many retail) lose self-consumption value for two days per week. This affects the overall economics and should be factored into projections.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Commercial Tax Considerations</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Commercial installations can benefit from tax advantages not available to domestic customers, significantly improving the effective return on investment.
            </p>
            <p>
              <span className="text-white font-medium">Capital Allowances:</span> Businesses can claim capital allowances on renewable energy equipment, deducting the cost from taxable profits. Currently, certain energy-efficient equipment qualifies for 100% first-year allowances under the Annual Investment Allowance.
            </p>
            <p>
              <span className="text-white font-medium">Effective Cost Reduction:</span> For a business paying 25% corporation tax, a 50,000 solar installation effectively costs 37,500 after tax relief - a 25% reduction in net cost. This significantly improves payback and ROI calculations.
            </p>
            <p>
              <span className="text-white font-medium">VAT Treatment:</span> Businesses registered for VAT can typically reclaim VAT on solar installation costs. Non-VAT registered businesses and domestic customers cannot reclaim VAT, though reduced VAT rates may apply in some circumstances.
            </p>
            <p>
              <span className="text-white font-medium">Professional Advice:</span> Tax treatment varies by business type and circumstances. Always recommend customers consult their accountant or tax advisor to understand specific implications and optimise the financial structure.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Load Profile Analysis</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Accurate load profile analysis is essential for sizing commercial systems optimally and providing realistic financial projections.
            </p>
            <p>
              <span className="text-white font-medium">Obtaining Data:</span> Request half-hourly consumption data from the customer's energy supplier. Most commercial supplies have smart meters providing this data. Analyse at least 12 months to capture seasonal variations.
            </p>
            <p>
              <span className="text-white font-medium">Understanding Patterns:</span> Plot consumption against time of day and day of week. Identify base load (constant consumption), variable load (operational hours), and peak demands. Compare with solar generation profiles for the location.
            </p>
            <p>
              <span className="text-white font-medium">Optimal System Sizing:</span> The optimal system size balances cost against self-consumption. A smaller system might have higher self-consumption percentage but generate fewer total kWh. A larger system generates more but exports more at lower value. Find the size that maximises net benefit.
            </p>
            <p>
              <span className="text-white font-medium">Future Changes:</span> Consider planned changes to the business. Expansion might increase consumption. Shift changes might alter timing. EVs or heat pumps might add load. Size systems with reasonable growth potential in mind.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Commercial Financing Options</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Commercial customers have access to a wider range of financing options than domestic, enabling investment even without significant capital reserves.
            </p>
            <p>
              <span className="text-white font-medium">Outright Purchase:</span> Buying the system outright provides maximum financial return as all savings flow directly to the business. Suitable for organisations with available capital and desire to own assets.
            </p>
            <p>
              <span className="text-white font-medium">Finance Lease:</span> The system is leased from a finance company, with payments spread over several years. The business gains immediate benefit while managing cash flow. Ownership may transfer at lease end.
            </p>
            <p>
              <span className="text-white font-medium">Operating Lease:</span> Similar to finance lease but treated as an operating expense rather than capital asset. May suit organisations preferring off-balance-sheet arrangements or with shorter property tenure.
            </p>
            <p>
              <span className="text-white font-medium">Power Purchase Agreement (PPA):</span> A third party installs, owns, and maintains the system. The business purchases generated electricity at an agreed rate, typically below grid prices. No upfront cost but lower lifetime savings than ownership.
            </p>
            <p>
              <span className="text-white font-medium">Hybrid Approaches:</span> Some arrangements combine elements - perhaps purchasing panels with a maintenance contract, or PPA with purchase option after a period. Match the financing structure to customer needs and preferences.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Understand the decision-maker:</span> Domestic decisions are often emotional and practical. Commercial decisions typically require formal business cases with defined ROI thresholds. Tailor your approach accordingly.
            </p>
            <p>
              <span className="text-white font-medium">Get the data:</span> Never estimate commercial consumption when actual data is available. Half-hourly data transforms the quality of your proposals and credibility with sophisticated customers.
            </p>
            <p>
              <span className="text-white font-medium">Consider the whole building:</span> Commercial customers may benefit from combined approaches - solar, batteries, EV charging, LED lighting, and heat pumps. Understanding the broader picture positions you as a valuable advisor.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Cost-Benefit Analysis Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-2">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-4">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule9Section3;
