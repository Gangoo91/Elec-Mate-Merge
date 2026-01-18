import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "ROI, Payback Periods, and System Lifespan - Renewable Energy Module 9";
const DESCRIPTION = "Learn to calculate return on investment, payback periods, and understand system lifespan considerations for solar PV, battery storage, and heat pump installations.";

const quickCheckQuestions = [
  {
    id: "roi-check-1",
    question: "What does payback period measure in renewable energy investments?",
    options: [
      "The total cost of the system",
      "The time taken for savings to equal the initial investment",
      "The lifespan of the equipment",
      "The annual return percentage"
    ],
    correctIndex: 1,
    explanation: "Payback period measures how long it takes for the cumulative savings (from reduced bills and export income) to equal the initial investment cost, after which the system generates net positive returns."
  },
  {
    id: "roi-check-2",
    question: "What is the typical expected lifespan of solar PV panels?",
    options: [
      "10-15 years",
      "15-20 years",
      "25-30+ years",
      "5-10 years"
    ],
    correctIndex: 2,
    explanation: "Solar PV panels typically have expected lifespans of 25-30+ years, with most manufacturers offering 25-year performance warranties. Actual lifespans often exceed warranty periods."
  },
  {
    id: "roi-check-3",
    question: "Which component typically has the shortest lifespan in a PV system?",
    options: [
      "Solar panels",
      "Mounting system",
      "DC cables",
      "Inverter"
    ],
    correctIndex: 3,
    explanation: "Inverters typically have shorter lifespans than panels, usually 10-15 years. Financial calculations should include provision for at least one inverter replacement during the system's lifetime."
  },
  {
    id: "roi-check-4",
    question: "How does electricity price inflation affect payback calculations?",
    options: [
      "It has no effect",
      "Higher inflation typically shortens payback periods",
      "Higher inflation lengthens payback periods",
      "Only affects commercial systems"
    ],
    correctIndex: 1,
    explanation: "Higher electricity price inflation increases the value of self-consumed electricity over time, typically shortening effective payback periods as savings grow faster than initially projected."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the formula for simple payback period?",
    options: [
      "Total cost multiplied by annual savings",
      "Total cost divided by annual savings",
      "Annual savings divided by total cost",
      "Total cost minus annual savings"
    ],
    correctAnswer: 1,
    explanation: "Simple payback period is calculated as the total investment cost divided by the annual savings, giving the number of years to recoup the initial investment."
  },
  {
    id: 2,
    question: "What does ROI (Return on Investment) express?",
    options: [
      "The payback period in months",
      "The total lifetime savings",
      "The annual return as a percentage of investment",
      "The system efficiency"
    ],
    correctAnswer: 2,
    explanation: "ROI expresses the annual return (savings plus income) as a percentage of the initial investment, allowing comparison with other investment opportunities."
  },
  {
    id: 3,
    question: "Why is NPV (Net Present Value) considered more accurate than simple payback?",
    options: [
      "It is easier to calculate",
      "It accounts for the time value of money through discounting",
      "It only considers first year returns",
      "It ignores inflation"
    ],
    correctAnswer: 1,
    explanation: "NPV discounts future cash flows to present value, recognising that money received in the future is worth less than money today. This provides a more financially accurate assessment."
  },
  {
    id: 4,
    question: "What performance degradation rate is typical for quality solar panels?",
    options: [
      "5% per year",
      "2-3% per year",
      "0.3-0.5% per year",
      "No degradation occurs"
    ],
    correctAnswer: 2,
    explanation: "Quality solar panels typically degrade at 0.3-0.5% per year. After 25 years, a panel might still produce 85-90% of its original output, which should be factored into long-term yield calculations."
  },
  {
    id: 5,
    question: "What is a typical warranty period for inverters?",
    options: [
      "1-2 years",
      "5-10 years",
      "25 years",
      "Lifetime warranty"
    ],
    correctAnswer: 1,
    explanation: "Inverter warranties typically range from 5-10 years, though some manufacturers offer extended warranties. Given inverter lifespans of 10-15 years, replacement costs should be included in financial planning."
  },
  {
    id: 6,
    question: "How should battery replacement costs be factored into financial calculations?",
    options: [
      "Batteries never need replacing",
      "Include provision for replacement after typical cycle life is reached",
      "Only consider if the battery fails",
      "Battery costs are refunded by manufacturers"
    ],
    correctAnswer: 1,
    explanation: "Battery systems have finite cycle lives and may need replacement after 10-15 years depending on usage. Financial models should include provision for replacement to accurately represent lifetime costs."
  },
  {
    id: 7,
    question: "What electricity price assumption significantly impacts payback calculations?",
    options: [
      "Only current prices matter",
      "Future price trends and inflation rates",
      "Wholesale prices only",
      "Standing charges only"
    ],
    correctAnswer: 1,
    explanation: "Assumptions about future electricity prices significantly impact payback calculations. Higher assumed inflation shortens payback but should be realistic to avoid misleading customers."
  },
  {
    id: 8,
    question: "What is the typical heat pump lifespan compared to a gas boiler?",
    options: [
      "Much shorter than gas boilers",
      "Similar or longer than gas boilers (15-25 years)",
      "Only 5 years",
      "Cannot be compared"
    ],
    correctAnswer: 1,
    explanation: "Heat pumps typically have lifespans of 15-25 years, similar to or longer than gas boilers. Fewer moving parts and lower operating temperatures can contribute to longevity."
  },
  {
    id: 9,
    question: "What factor makes comparing solar PV ROI to other investments challenging?",
    options: [
      "Solar produces no returns",
      "Returns depend on uncertain future energy prices",
      "Solar is always the best investment",
      "Banks do not recognise solar returns"
    ],
    correctAnswer: 1,
    explanation: "Solar returns depend on future energy prices, consumption patterns, and export rates, all of which involve uncertainty. This makes direct comparison with fixed-return investments challenging."
  },
  {
    id: 10,
    question: "What maintenance costs should be included in long-term financial planning?",
    options: [
      "No maintenance costs for solar PV",
      "Periodic cleaning, inspection, inverter replacement, and potential repairs",
      "Only inverter replacement",
      "Monthly servicing costs"
    ],
    correctAnswer: 1,
    explanation: "Long-term financial planning should include periodic professional inspections, cleaning costs (if applicable), inverter replacement, and a contingency for unexpected repairs."
  }
];

const faqs = [
  {
    question: "What is a good payback period for domestic solar PV?",
    answer: "Payback periods for domestic solar PV currently range from 6-12 years depending on system size, electricity prices, consumption patterns, and self-consumption rates. With high electricity prices, paybacks under 8 years are common. Systems typically have 25+ year lifespans, so even 12-year paybacks still provide substantial lifetime returns."
  },
  {
    question: "How do I explain ROI to customers unfamiliar with financial concepts?",
    answer: "Focus on relatable terms: the payback period shows when the system has paid for itself, and after that point, all savings are effectively profit. Compare annual returns to savings account interest rates - solar often provides better returns. Use charts showing cumulative savings over time to visualise the value created."
  },
  {
    question: "Should I include potential electricity price increases in quotes?",
    answer: "Show calculations at current prices as the baseline, then demonstrate sensitivity to price changes. This is transparent and allows customers to see how their investment performs under different scenarios. Avoid guaranteeing specific future prices but note historical trends for context."
  },
  {
    question: "How do I account for panel degradation in yield estimates?",
    answer: "Apply the degradation rate annually to calculate expected output in future years. For example, with 0.5% annual degradation, Year 1 output of 4000kWh becomes approximately 3600kWh by Year 25. Software tools often include degradation automatically. Lifetime yield is the sum of annual outputs accounting for this reduction."
  },
  {
    question: "What happens to payback calculations if electricity prices fall?",
    answer: "Lower electricity prices lengthen payback periods as savings reduce. However, wholesale prices strongly influence retail prices, and demand for electricity is expected to grow with electrification of transport and heating. Most analysts expect long-term price trends to remain upward, though short-term volatility can occur."
  },
  {
    question: "How do I compare heat pump payback to gas boiler economics?",
    answer: "Compare the lifetime cost of ownership including installation, fuel costs over the expected lifetime, maintenance, and replacement. Heat pumps have higher upfront costs but lower running costs depending on efficiency (COP/SPF) and relative gas/electricity prices. Include carbon considerations for customers with environmental priorities."
  }
];

const RenewableEnergyModule9Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-9">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">ROI, Payback & System Lifespan</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 9 - Section 2</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          ROI, Payback Periods & System Lifespan
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Financial metrics that drive renewable energy investment decisions
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Payback:</span> Time to recoup initial investment
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">ROI:</span> Annual return as percentage of investment
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Panel Life:</span> 25-30+ years typical lifespan
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Inverter Life:</span> 10-15 years, plan for replacement
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Calculate payback periods accurately",
            "Understand ROI and its limitations",
            "Account for component lifespans",
            "Factor in degradation and maintenance",
            "Present financial information clearly to customers"
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
            <h2 className="text-xl font-semibold text-white">Understanding Payback Period</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Payback period is the most commonly requested financial metric for renewable energy investments. It answers the fundamental question: how long until this system pays for itself?
            </p>
            <p>
              <span className="text-white font-medium">Simple Payback Calculation:</span> Divide the total investment cost by the annual savings. For example, a 7000 system generating 600 annual savings has a simple payback of 11.7 years (7000 / 600 = 11.67).
            </p>
            <p>
              <span className="text-white font-medium">Components of Annual Savings:</span> Savings comprise avoided import costs (self-consumed electricity) plus any export income (SEG payments). If a system generates 4000kWh, 70% is self-consumed at 28p/kWh (784), and 30% is exported at 5p/kWh (60), total annual savings are 844.
            </p>
            <p>
              <span className="text-white font-medium">Limitations of Simple Payback:</span> Simple payback assumes constant prices and does not account for inflation, degradation, or the time value of money. It is a useful rule of thumb but should not be the only financial metric considered.
            </p>
            <p>
              <span className="text-white font-medium">Discounted Payback:</span> A more accurate approach discounts future savings to present value, recognising that 600 received in 10 years is worth less than 600 today. This typically lengthens calculated payback slightly but is more financially rigorous.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Return on Investment (ROI)</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              ROI expresses returns as a percentage of the initial investment, enabling comparison with other investment opportunities such as savings accounts, bonds, or stock market investments.
            </p>
            <p>
              <span className="text-white font-medium">Basic ROI Formula:</span> Annual Return / Initial Investment x 100 = ROI%. Using the previous example, 844 annual savings on a 7000 investment gives an ROI of 12% (844 / 7000 x 100 = 12.05%).
            </p>
            <p>
              <span className="text-white font-medium">Comparing to Alternatives:</span> A 12% annual return compares favourably to savings accounts (typically 2-5%) or average stock market returns (historically 7-10%). However, renewable energy returns are partially inflation-protected as electricity prices typically rise with inflation.
            </p>
            <p>
              <span className="text-white font-medium">Lifetime ROI:</span> Consider total returns over the system lifetime. A 7000 investment generating 844 annually for 25 years (ignoring degradation and inflation) provides 21,100 total return - a 301% lifetime ROI.
            </p>
            <p>
              <span className="text-white font-medium">Internal Rate of Return (IRR):</span> IRR is a more sophisticated metric that calculates the discount rate at which the net present value of all cash flows equals zero. It accounts for timing of returns and is useful for comparing investments of different sizes and durations.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Component Lifespans</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Different components have different expected lifespans, affecting both financial planning and maintenance requirements. Understanding these lifespans ensures realistic financial projections.
            </p>
            <p>
              <span className="text-white font-medium">Solar Panels:</span> Modern panels typically carry 25-year performance warranties guaranteeing at least 80-85% of original output. Actual lifespans often exceed 30 years, with panels continuing to produce usable power well beyond warranty periods.
            </p>
            <p>
              <span className="text-white font-medium">Inverters:</span> String inverters typically last 10-15 years, with warranties of 5-10 years (sometimes extendable). Microinverters and optimisers often have longer warranties (up to 25 years) reflecting their design for longer service life. Budget for at least one inverter replacement during system lifetime.
            </p>
            <p>
              <span className="text-white font-medium">Battery Storage:</span> Lithium-ion batteries are typically warranted for 10 years or a specified number of cycles. Capacity gradually reduces over time. Depending on usage patterns, replacement after 10-15 years may be needed to maintain desired performance.
            </p>
            <p>
              <span className="text-white font-medium">Heat Pumps:</span> Air source heat pumps typically last 15-20 years with proper maintenance. Ground source systems may last longer due to fewer moving parts exposed to weather. Compressor life is often the limiting factor.
            </p>
            <p>
              <span className="text-white font-medium">Balance of System:</span> Mounting systems, cables, junction boxes, and other components generally last the life of the installation if properly specified and installed. Quality during installation pays dividends in longevity.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Degradation and Yield Over Time</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Solar panels gradually lose efficiency over time. Accurate financial projections must account for this degradation to avoid overstating long-term returns.
            </p>
            <p>
              <span className="text-white font-medium">Typical Degradation Rates:</span> Quality crystalline silicon panels typically degrade at 0.3-0.5% per year. Premium panels may specify lower rates (0.25%). This means a panel producing 400W when new might produce around 350W after 25 years.
            </p>
            <p>
              <span className="text-white font-medium">Impact on Yield:</span> A 4kW system generating 4000kWh in Year 1 at 0.5% annual degradation would generate approximately 3550kWh in Year 25. Total 25-year output would be around 94,500kWh rather than 100,000kWh without degradation.
            </p>
            <p>
              <span className="text-white font-medium">Warranty Guarantees:</span> Performance warranties typically guarantee 90% output after 10 years and 80-85% after 25 years. If panels degrade faster than warranted, manufacturers should provide remediation or replacement.
            </p>
            <p>
              <span className="text-white font-medium">Battery Degradation:</span> Batteries also degrade with use. A 10kWh battery might retain only 70-80% capacity after its warranted cycle count. This affects the value of stored energy and should be factored into financial models.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Comprehensive Financial Modelling</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Realistic financial projections combine all factors: initial cost, annual savings, degradation, maintenance, component replacement, and assumptions about future prices.
            </p>
            <p>
              <span className="text-white font-medium">Year-by-Year Modelling:</span> Build a spreadsheet showing each year: expected generation (accounting for degradation), self-consumption, export, electricity price (with assumed inflation), resulting savings, and cumulative savings. This shows both payback point and lifetime returns.
            </p>
            <p>
              <span className="text-white font-medium">Maintenance Costs:</span> Include periodic inspection costs, cleaning (if required), and a contingency for repairs. Professional inspections every 3-5 years cost 100-200. Cleaning costs depend on location and access.
            </p>
            <p>
              <span className="text-white font-medium">Component Replacement:</span> Budget for inverter replacement around Year 12-15. Current inverter prices provide a guide, though technology changes may affect future costs. For batteries, consider replacement around Year 10-12 if cycling has been heavy.
            </p>
            <p>
              <span className="text-white font-medium">Sensitivity Analysis:</span> Show how results change with different assumptions. What if electricity prices rise 5% annually versus 3%? What if self-consumption is 50% instead of 70%? This demonstrates the range of possible outcomes.
            </p>
            <p>
              <span className="text-white font-medium">Transparent Communication:</span> Present financial information clearly and honestly. State assumptions explicitly. Avoid guaranteed returns language. Customers make better decisions when they understand both the opportunity and the uncertainties.
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
              <span className="text-white font-medium">Use conservative assumptions:</span> Under-promise and over-deliver. Conservative assumptions that prove pessimistic leave customers pleasantly surprised rather than disappointed.
            </p>
            <p>
              <span className="text-white font-medium">Document your methodology:</span> Record the assumptions used in financial projections. This protects you if questioned later and helps with follow-up discussions.
            </p>
            <p>
              <span className="text-white font-medium">Update for current prices:</span> Energy prices change frequently. Ensure your financial models use current prices and update them regularly.
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
          title="ROI and Payback Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-1">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-3">
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

export default RenewableEnergyModule9Section2;
