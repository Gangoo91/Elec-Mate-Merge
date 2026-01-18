import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const RenewableEnergyModule1Section4 = () => {
  useSEO({
    title: "Global & UK Regulatory Landscape | Renewable Energy",
    description: "Understand Net Zero commitments, smart energy initiatives, and the policy frameworks driving renewable deployment."
  });

  const quizQuestions = [
    {
      question: "When did the UK legally commit to Net Zero by 2050?",
      options: ["2015", "2019", "2020", "2022"],
      correctAnswer: 1,
      explanation: "The UK became the first major economy to enshrine Net Zero in law through the Climate Change Act 2008 (2050 Target Amendment) Order 2019."
    },
    {
      question: "What is the UK's offshore wind target for 2030?",
      options: ["25GW", "40GW", "50GW", "70GW"],
      correctAnswer: 2,
      explanation: "The UK has set an ambitious target of 50GW offshore wind capacity by 2030."
    },
    {
      question: "How long do Contracts for Difference (CfD) typically last?",
      options: ["5 years", "10 years", "15 years", "25 years"],
      correctAnswer: 2,
      explanation: "CfDs provide 15-year contracts giving price certainty for low-carbon generation projects."
    },
    {
      question: "What replaced the Feed-in Tariff for small-scale renewables in 2020?",
      options: ["Net Metering", "Smart Export Guarantee (SEG)", "Renewable Obligation", "Green Deal"],
      correctAnswer: 1,
      explanation: "The Smart Export Guarantee replaced Feed-in Tariffs for new small-scale renewable installations from 2020."
    },
    {
      question: "What is the maximum capacity for rooftop solar under permitted development rights?",
      options: ["100kW", "250kW", "500kW", "1MW"],
      correctAnswer: 3,
      explanation: "Most rooftop solar installations under 1MW require no planning permission under permitted development rights."
    },
    {
      question: "What body provides independent oversight of UK climate progress?",
      options: ["Ofgem", "Committee on Climate Change", "National Grid", "BEIS"],
      correctAnswer: 1,
      explanation: "The Committee on Climate Change monitors UK progress toward Net Zero and recommends policies."
    },
    {
      question: "How much network investment did RIIO-2 allocate for 2021-2026?",
      options: ["£10bn", "£15bn", "£25bn", "£40bn"],
      correctAnswer: 2,
      explanation: "Ofgem's RIIO-2 price control allocates £25bn for network investment including smart grid technologies."
    },
    {
      question: "What is the difference between Net Zero and carbon neutral?",
      options: ["They are the same", "Net Zero covers only CO2, carbon neutral covers all GHGs", "Net Zero covers all GHGs, carbon neutral only CO2", "Net Zero is voluntary, carbon neutral is mandatory"],
      correctAnswer: 2,
      explanation: "Net Zero covers all greenhouse gases and requires deep decarbonisation, while carbon neutral only addresses CO2."
    },
    {
      question: "Which international agreement set the framework for national climate targets?",
      options: ["Kyoto Protocol only", "Paris Agreement (2015)", "Copenhagen Accord", "Montreal Protocol"],
      correctAnswer: 1,
      explanation: "The Paris Agreement (2015) set the framework for international climate action and national targets."
    },
    {
      question: "What is the Future Homes Standard target year?",
      options: ["2024", "2025", "2030", "2035"],
      correctAnswer: 1,
      explanation: "The Future Homes Standard aims to deliver zero carbon homes from 2025."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Minimal Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 -ml-2" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
            <Zap className="w-6 h-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Global &amp; UK Regulatory Landscape
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding Net Zero commitments and policy frameworks
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">UK Target</div>
            <div className="text-white font-semibold">Net Zero by 2050</div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Offshore Wind</div>
            <div className="text-white font-semibold">50GW by 2030</div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Learning Outcomes</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Understand key Net Zero commitments and their impact on renewable deployment</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Learn how policy shapes renewable energy investment and development</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Identify financial incentives and compliance schemes supporting renewables</span>
            </div>
          </div>
        </div>

        {/* Section 01 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            UK's Net Zero by 2050 Target
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The UK became the first major economy to enshrine a Net Zero target in law through the Climate Change Act 2008 (2050 Target Amendment) Order 2019. This legally binding commitment requires net zero greenhouse gas emissions by 2050.
            </p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-3">Legal Framework:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Binding commitment:</strong> Legally binding target for net zero by 2050</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Carbon budgets:</strong> Five-year caps on UK emissions providing stepping stones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Independent oversight:</strong> Committee on Climate Change monitors progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Sectoral targets:</strong> Specific goals for electricity, transport, buildings, and industry</span>
                </li>
              </ul>
            </div>
            <p>
              <strong className="text-white">Electricity sector targets</strong> include a fully decarbonised electricity system by 2030, 50GW offshore wind by 2030, 70GW solar by 2035 (industry ambition), and 30GW storage by 2030. These are supported by £12bn Green Bond programme and £1bn Net Zero Innovation Portfolio.
            </p>
          </div>
        </div>

        <InlineCheck
          question="When did the UK legally commit to Net Zero by 2050?"
          options={["2015", "2019", "2022"]}
          correctIndex={1}
          explanation="The Climate Change Act 2008 (2050 Target Amendment) Order 2019 made the UK the first major economy to enshrine Net Zero in law."
        />

        {/* Section 02 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Smart Energy Initiatives
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The UK's smart energy strategy focuses on enabling flexible, efficient energy systems that can accommodate high levels of renewable generation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Smart Meters</h4>
                <ul className="text-sm space-y-1">
                  <li>• Target: All homes by 2024</li>
                  <li>• Half-hourly data collection</li>
                  <li>• Enable time-of-use tariffs</li>
                  <li>• Support demand response</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Demand Side Response</h4>
                <ul className="text-sm space-y-1">
                  <li>• Flexibility services markets</li>
                  <li>• Industrial demand reduction</li>
                  <li>• EV smart charging</li>
                  <li>• Heat pump optimisation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Virtual Power Plants</h4>
                <ul className="text-sm space-y-1">
                  <li>• Aggregate distributed resources</li>
                  <li>• Solar + storage + flexible loads</li>
                  <li>• Grid services provision</li>
                  <li>• Optimised dispatch</li>
                </ul>
              </div>
            </div>
            <p>
              <strong className="text-white">Smart Grid Investments:</strong> Ofgem's RIIO-2 price control (2021-2026) allocates £25bn for network investment, including advanced monitoring and control systems, flexibility services procurement, enhanced grid resilience, and EV charging infrastructure support.
            </p>
          </div>
        </div>

        <InlineCheck
          question="How much did RIIO-2 allocate for network investment from 2021-2026?"
          options={["£15 billion", "£25 billion", "£40 billion"]}
          correctIndex={1}
          explanation="Ofgem's RIIO-2 price control allocates £25bn for network investment including smart grid technologies and flexibility services."
        />

        {/* Section 03 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Financial Support Mechanisms
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The UK has developed sophisticated financial mechanisms to support renewable energy deployment and ensure value for money for consumers.
            </p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-3">Contracts for Difference (CfD):</h4>
              <p className="text-sm mb-3">
                Long-term contracts (15 years) that provide price certainty for low-carbon generation. Generators receive the difference between a strike price and market price.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Competitive allocation rounds</li>
                <li>• Technology-specific "pots"</li>
                <li>• Consumer protection from high prices</li>
                <li>• Revenue certainty for investors</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-3">Smart Export Guarantee (SEG):</h4>
              <p className="text-sm mb-3">
                Replaced Feed-in Tariffs for new installations from 2020. Covers small-scale renewables up to 5MW.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Mandatory for large suppliers</li>
                <li>• Market-based export rates</li>
                <li>• Smart meter requirement</li>
                <li>• Technology agnostic</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="text-white font-medium mb-2">Recent CfD Results (2023):</h4>
              <div className="text-sm space-y-1">
                <p>• <strong className="text-white">Offshore Wind:</strong> 11GW at £37.35/MWh</p>
                <p>• <strong className="text-white">Solar PV:</strong> 3.5GW at £47.87/MWh</p>
                <p>• <strong className="text-white">Onshore Wind:</strong> 1.5GW at £52.29/MWh</p>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What scheme replaced Feed-in Tariffs for small-scale renewables in 2020?"
          options={["Contracts for Difference", "Smart Export Guarantee", "Renewable Obligation"]}
          correctIndex={1}
          explanation="The Smart Export Guarantee (SEG) replaced Feed-in Tariffs for new small-scale renewable installations from 2020."
        />

        {/* Section 04 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Regulations &amp; Permitted Development
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Building regulations and planning frameworks play a crucial role in enabling renewable energy deployment, particularly for distributed generation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-2">Building Regulations Part L:</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">2022 updates:</strong> 31% carbon reduction for new homes</li>
                  <li>• <strong className="text-white">Fabric first:</strong> Improved insulation standards</li>
                  <li>• <strong className="text-white">Low carbon heating:</strong> Heat pumps preferred</li>
                  <li>• <strong className="text-white">EV charging:</strong> Mandatory for new buildings</li>
                  <li>• <strong className="text-white">Future Homes Standard:</strong> Zero carbon from 2025</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-2">Permitted Development Rights:</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Solar PV:</strong> No planning for most rooftop installations</li>
                  <li>• <strong className="text-white">Size limits:</strong> Up to 1MW for non-domestic</li>
                  <li>• <strong className="text-white">Ground-mounted:</strong> Up to 9m² for domestic</li>
                  <li>• <strong className="text-white">Wind turbines:</strong> Limited permitted development</li>
                  <li>• <strong className="text-white">Heat pumps:</strong> Permitted with noise considerations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Global Climate Frameworks
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              International climate agreements create the global context for national renewable energy policies and drive international cooperation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">EU Green Deal</h4>
                <ul className="text-sm space-y-1">
                  <li>• Net zero by 2050</li>
                  <li>• 55% reduction by 2030</li>
                  <li>• REPowerEU plan</li>
                  <li>• Carbon border adjustment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">US Inflation Reduction Act</h4>
                <ul className="text-sm space-y-1">
                  <li>• $370bn clean energy</li>
                  <li>• Tax credits</li>
                  <li>• Domestic content rules</li>
                  <li>• Green hydrogen support</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">COP Agreements</h4>
                <ul className="text-sm space-y-1">
                  <li>• Paris Agreement (2015)</li>
                  <li>• Global Stocktake</li>
                  <li>• Loss and damage fund</li>
                  <li>• Technology transfer</li>
                </ul>
              </div>
            </div>
            <p>
              <strong className="text-white">Key International Initiatives:</strong> IRENA (global renewable transformation roadmap), Mission Innovation (accelerating clean energy innovation), Global Green Growth Institute (supporting developing countries), and RE100 (corporate renewable procurement commitment).
            </p>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
          <h3 className="text-white font-semibold mb-3">Practical Guidance</h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <strong className="text-white">For Installers:</strong> Stay current with changing regulations, especially permitted development rights and building regulations updates.
            </p>
            <p>
              <strong className="text-white">For Customers:</strong> Understand available financial incentives like SEG rates and any local authority schemes in your area.
            </p>
            <p>
              <strong className="text-white">For Businesses:</strong> CfD rounds offer opportunities for larger projects - monitor allocation round announcements and strike price trends.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What is the difference between Net Zero and carbon neutral?</h4>
              <p className="text-white/70 text-sm">Net Zero means balancing all greenhouse gas emissions with removals, while carbon neutral only addresses CO2. Net Zero is more comprehensive, covering all GHGs and requires deep decarbonisation rather than just offsetting.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How do Contracts for Difference (CfD) protect consumers?</h4>
              <p className="text-white/70 text-sm">CfDs provide two-way protection: when market prices are below strike price, generators receive top-up payments. When market prices exceed strike price, generators pay back the difference, reducing consumer bills.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Why are renewable energy costs falling in CfD auctions?</h4>
              <p className="text-white/70 text-sm">Competitive auctions drive cost reductions as developers bid against each other. Technology improvements, economies of scale, supply chain optimisation, and lower financing costs all contribute to falling strike prices.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What planning permissions are needed for solar PV?</h4>
              <p className="text-white/70 text-sm">Most rooftop solar under 1MW requires no planning permission under permitted development rights. Ground-mounted systems up to 9m² for homes are also permitted. Listed buildings and conservation areas may require full applications.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How do international policies affect UK renewable development?</h4>
              <p className="text-white/70 text-sm">International frameworks set expectations for national climate action. EU policies affect UK-EU energy trading and technology standards. Trade policies and carbon border adjustments can impact supply chains.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What support is available for community energy projects?</h4>
              <p className="text-white/70 text-sm">Community groups can access SEG for small-scale generation, apply for CfDs for larger projects, access local authority sustainability funds, and benefit from community energy loan schemes.</p>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz
            title="Section 4 Quiz: Regulatory Landscape"
            questions={quizQuestions}
            passingScore={70}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" asChild>
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-1">
              Complete Module 1
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule1Section4;
