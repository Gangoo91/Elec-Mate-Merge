import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "The Purpose and Business Case for Efficiency - Energy Efficiency Module 1";
const DESCRIPTION = "Learn why energy efficiency matters for UK businesses, including cost reduction, carbon targets, and competitive advantage.";

const quickCheckQuestions = [
  {
    id: "m1s1-qc1",
    question: "What percentage of UK businesses cite energy costs as a significant operational concern?",
    options: ["Around 45%", "Around 65%", "Around 85%", "Around 95%"],
    correctIndex: 2,
    explanation: "Around 85% of UK businesses now cite energy costs as a significant operational concern, particularly following the energy price increases of 2022-2023."
  },
  {
    id: "m1s1-qc2",
    question: "What is the typical payback period for LED lighting upgrades in commercial buildings?",
    options: ["6-12 months", "1-3 years", "5-7 years", "10+ years"],
    correctIndex: 1,
    explanation: "LED lighting upgrades typically achieve payback within 1-3 years, making them one of the quickest wins for energy efficiency."
  },
  {
    id: "m1s1-qc3",
    question: "By what year has the UK legally committed to achieving net zero carbon emissions?",
    options: ["2030", "2040", "2050", "2060"],
    correctIndex: 2,
    explanation: "The UK has a legally binding commitment under the Climate Change Act to achieve net zero greenhouse gas emissions by 2050."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which UK regulation requires large enterprises to conduct energy audits every 4 years?",
    options: ["Building Regulations Part L", "ESOS (Energy Savings Opportunity Scheme)", "MEES Regulations", "Climate Change Levy"],
    correctAnswer: 1,
    explanation: "ESOS requires large undertakings (250+ employees or £44m+ turnover) to conduct comprehensive energy audits every 4 years."
  },
  {
    id: 2,
    question: "What is the minimum EPC rating required for commercial properties to be legally let in England and Wales?",
    options: ["Rating A", "Rating C", "Rating E", "Rating G"],
    correctAnswer: 2,
    explanation: "Under MEES regulations, commercial properties must achieve a minimum EPC rating of E to be legally let."
  },
  {
    id: 3,
    question: "Approximately what percentage of a typical commercial building's energy consumption is used for HVAC systems?",
    options: ["10-20%", "25-35%", "40-60%", "70-80%"],
    correctAnswer: 2,
    explanation: "HVAC systems typically account for 40-60% of commercial building energy consumption, making them a key target for efficiency improvements."
  },
  {
    id: 4,
    question: "Which of these is NOT typically considered a direct benefit of energy efficiency?",
    options: ["Reduced operational costs", "Lower carbon emissions", "Increased property value", "Higher staff turnover"],
    correctAnswer: 3,
    explanation: "Energy efficiency typically reduces staff turnover by improving workplace comfort. Higher turnover would be a negative outcome."
  },
  {
    id: 5,
    question: "What does SECR stand for in UK energy reporting requirements?",
    options: ["Sustainable Energy Carbon Reporting", "Streamlined Energy and Carbon Reporting", "Standard Environmental Compliance Review", "Strategic Energy Cost Reduction"],
    correctAnswer: 1,
    explanation: "SECR stands for Streamlined Energy and Carbon Reporting, requiring annual disclosure of energy use and emissions."
  },
  {
    id: 6,
    question: "By what percentage did UK non-domestic electricity prices increase between 2021 and 2023?",
    options: ["50-75%", "100-150%", "150-200%", "200-300%"],
    correctAnswer: 2,
    explanation: "UK non-domestic electricity prices increased by 150-200% between 2021 and 2023, dramatically improving the business case for efficiency."
  },
  {
    id: 7,
    question: "Which approach to energy management involves continuous monitoring and optimisation?",
    options: ["One-off audit", "ISO 50001", "Visual inspection", "Annual review"],
    correctAnswer: 1,
    explanation: "ISO 50001 provides a framework for continuous energy management through the Plan-Do-Check-Act cycle."
  },
  {
    id: 8,
    question: "What is 'Scope 2' emissions in carbon accounting?",
    options: ["Direct emissions from owned sources", "Indirect emissions from purchased electricity", "All supply chain emissions", "Employee commuting emissions"],
    correctAnswer: 1,
    explanation: "Scope 2 covers indirect emissions from purchased energy, primarily electricity. Electricians directly impact this through efficient installations."
  },
  {
    id: 9,
    question: "Which of these typically offers the fastest return on investment for energy efficiency?",
    options: ["Building fabric insulation", "Solar PV installation", "Behavioural change programmes", "Building Management System upgrade"],
    correctAnswer: 2,
    explanation: "Behavioural change programmes often have zero capital cost and deliver immediate savings, providing the fastest ROI."
  },
  {
    id: 10,
    question: "What percentage of UK SMEs report that sustainability credentials influence their choice of suppliers?",
    options: ["Around 25%", "Around 45%", "Around 65%", "Around 85%"],
    correctAnswer: 2,
    explanation: "Around 65% of UK SMEs consider sustainability when selecting suppliers, making efficiency a competitive advantage."
  }
];

const faqs = [
  {
    question: "How much can a typical UK business save through energy efficiency measures?",
    answer: "Most UK businesses can achieve energy savings of 10-30% through no-cost and low-cost measures such as behavioural changes, optimising heating schedules, and switching off equipment. With capital investment in efficient equipment and building improvements, savings of 30-50% are commonly achieved."
  },
  {
    question: "What are the legal requirements for energy efficiency in UK businesses?",
    answer: "Legal requirements vary by business size and sector. Large enterprises must comply with ESOS and SECR reporting. Commercial landlords must meet MEES regulations (minimum EPC E). All businesses must comply with Building Regulations Part L for new installations."
  },
  {
    question: "What is the best first step for improving energy efficiency?",
    answer: "The best first step is understanding your current energy consumption through metering and monitoring. This baseline allows you to identify the biggest opportunities and measure improvements. Start by reviewing energy bills and conducting a walk-through survey."
  },
  {
    question: "How does energy efficiency contribute to net zero targets?",
    answer: "Energy efficiency is often called 'the first fuel' because reducing energy demand is the most cost-effective way to cut carbon emissions. Reducing consumption directly reduces emissions and makes the transition to renewable energy more affordable."
  },
  {
    question: "What funding is available for business energy efficiency in the UK?",
    answer: "Various funding options exist including Enhanced Capital Allowances for qualifying equipment, government-backed loans through the British Business Bank, local authority grants, and sector-specific programmes."
  }
];

const EnergyEfficiencyModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/energy-efficiency-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Purpose and Business Case for Efficiency
          </h1>
          <p className="text-white/80">
            Understanding why energy efficiency is essential for modern UK businesses
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Why:</strong> 85% of UK businesses cite energy costs as major concern</li>
              <li><strong>Savings:</strong> 10-30% achievable through basic measures</li>
              <li><strong>Target:</strong> UK net zero by 2050, 78% reduction by 2035</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High energy bills, old equipment, poor controls</li>
              <li><strong>Use:</strong> LED upgrades, BMS optimisation, motor efficiency</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Why energy efficiency has become a business-critical priority",
              "The financial case for efficiency investments",
              "UK regulatory framework including ESOS, SECR, and MEES",
              "How efficiency contributes to net zero targets",
              "Competitive advantages of sustainability credentials",
              "How to structure an efficiency improvement programme"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Energy Efficiency Matters for Businesses
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy efficiency has moved from a "nice to have" environmental initiative to a business-critical priority for UK organisations of all sizes. The energy crisis of 2022-2023 brought this reality into sharp focus, with many businesses seeing their energy bills triple or quadruple in just twelve months.
            </p>
            <p>
              According to the British Chambers of Commerce, 85% of UK businesses now cite energy costs as a significant operational concern. For energy-intensive sectors like manufacturing, hospitality, and retail, energy can represent 10-30% of total operating costs, making efficiency improvements directly visible on the bottom line.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Statistics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>UK business electricity demand fell 7% in 2023 as companies implemented efficiency measures</li>
                <li>80% of buildings that will exist in 2050 have already been built, making retrofitting essential</li>
                <li>Non-domestic electricity prices increased 150-200% between 2021-2023</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cost Reduction and Financial Benefits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The financial case for energy efficiency has never been stronger. With UK non-domestic electricity prices averaging 30-40p per kWh (compared to 12-15p pre-crisis), every kilowatt-hour saved delivers significantly greater value than before.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Financial Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Direct cost savings:</strong> Every £1 invested typically returns £3-5 over the measure's lifetime</li>
                <li><strong>Reduced price volatility exposure:</strong> Lower consumption means less exposure to market swings</li>
                <li><strong>Enhanced asset value:</strong> Buildings with better EPC ratings command 10-20% higher rents</li>
                <li><strong>Tax benefits:</strong> Enhanced Capital Allowances allow 100% first-year write-off for qualifying equipment</li>
              </ul>
            </div>
            <p>
              A medium-sized manufacturing firm in the Midlands reduced their annual energy bill by £127,000 through LED lighting, compressed air leak repairs, and motor replacements, achieving full payback within 18 months.
            </p>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Environmental and Sustainability Drivers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The UK has set one of the world's most ambitious climate targets: achieving net zero greenhouse gas emissions by 2050, with an interim target of 78% reduction by 2035 compared to 1990 levels. Businesses are increasingly expected to contribute to these goals.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Regulatory Framework:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>ESOS:</strong> Mandatory energy audits every 4 years for large enterprises with action plans required</li>
                <li><strong>SECR:</strong> Annual reporting of energy use and carbon emissions in director's reports</li>
                <li><strong>MEES:</strong> Commercial properties must meet minimum EPC E to be legally let (increasing to C by 2027-2030)</li>
              </ul>
            </div>
            <p>
              Beyond compliance, over 400 UK companies have committed to science-based targets through the SBTi (Science Based Targets initiative), driving demand for efficiency expertise.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Risk Mitigation and Resilience
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy efficiency is increasingly recognised as a key component of business resilience. The energy crisis demonstrated how vulnerable businesses can be to supply disruptions and price shocks. Those with lower energy intensity weathered the storm far better.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Risk Factors Addressed:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Price Volatility:</strong> Reduced consumption means reduced exposure to wholesale price swings</li>
                <li><strong>Supply Security:</strong> Lower demand reduces strain during peak periods and supply constraints</li>
                <li><strong>Regulatory Risk:</strong> Proactive efficiency reduces future compliance costs as standards tighten</li>
                <li><strong>Stranded Assets:</strong> Inefficient buildings may become unlettable or unsaleable</li>
              </ul>
            </div>
            <p>
              Research by the UK Green Building Council suggests that up to 80% of commercial property value could be at risk from climate-related factors by 2050 if buildings are not upgraded.
            </p>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Competitive Advantage and Reputation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sustainability credentials have become a significant factor in business relationships. Research consistently shows that customers, employees, and investors increasingly favour organisations demonstrating genuine commitment to environmental responsibility.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stakeholder Expectations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>B2B Customers:</strong> 65% of UK SMEs report sustainability influences supplier selection</li>
                <li><strong>Employees:</strong> 70% of workers consider company environmental commitment when choosing employers</li>
                <li><strong>Investors:</strong> £2.3 trillion in ESG-focused investment funds in the UK</li>
              </ul>
            </div>
            <p>
              Large corporations are cascading their net zero commitments through supply chains. Being able to demonstrate verified energy efficiency can be essential for winning and retaining contracts.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Getting Started with Efficiency Programmes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective energy efficiency programmes follow a structured approach. The most successful initiatives combine quick wins with longer-term strategic improvements, building momentum and demonstrating value along the way.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Recommended Approach:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Establish Baseline:</strong> Collect 12 months of energy data, install sub-metering, calculate carbon footprint</li>
                <li><strong>2. Identify Opportunities:</strong> Conduct energy audits, benchmark against similar organisations, prioritise by payback</li>
                <li><strong>3. Implement Quick Wins:</strong> Behavioural changes, optimising controls, eliminating waste</li>
                <li><strong>4. Plan Strategic Investments:</strong> Multi-year capital plan for lighting, HVAC, building fabric, renewables</li>
                <li><strong>5. Monitor and Optimise:</strong> Ongoing monitoring, verify savings, consider ISO 50001 certification</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Advising Clients</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with energy bills to understand baseline consumption and costs</li>
                <li>Identify quick wins with payback under 2 years to build confidence</li>
                <li>Link recommendations to regulatory requirements (ESOS, MEES)</li>
                <li>Quantify savings in both £ and kgCO2 to address multiple stakeholders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">For Electrical Installations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>LED lighting upgrades offer 1-3 year payback and 50-80% energy reduction</li>
                <li>Motor replacements with IE3/IE4 efficiency motors save 3-5% running costs</li>
                <li>VSD installations can reduce pump and fan energy by 20-50%</li>
                <li>Power factor correction reduces kVA demand and distribution losses</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Focusing only on capital projects</strong> — behavioural changes often deliver fastest savings</li>
                <li><strong>Not measuring baseline</strong> — without data you cannot prove savings</li>
                <li><strong>Ignoring controls</strong> — new equipment with poor controls wastes energy</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Statistics</p>
                <ul className="space-y-0.5">
                  <li>UK net zero target: 2050</li>
                  <li>Interim target: 78% reduction by 2035</li>
                  <li>85% of businesses cite energy as concern</li>
                  <li>Typical savings potential: 10-30%</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>ESOS: 4-yearly audits (large enterprises)</li>
                  <li>SECR: Annual carbon reporting</li>
                  <li>MEES: Minimum EPC E (rising to C)</li>
                  <li>Part L: Building efficiency standards</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/energy-efficiency-module-1">
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

export default EnergyEfficiencyModule1Section1;
