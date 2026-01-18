import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "UK Carbon Targets and Net Zero - Energy Efficiency Module 1";
const DESCRIPTION = "Learn about UK Climate Change Act, carbon budgets, net zero targets, and how grid decarbonisation affects electricians.";

const quickCheckQuestions = [
  {
    id: "m1s2-qc1",
    question: "By what year must the UK achieve net zero greenhouse gas emissions under the Climate Change Act?",
    options: ["2030", "2040", "2050", "2060"],
    correctIndex: 2,
    explanation: "The Climate Change Act was amended in 2019 to set a legally binding target of net zero greenhouse gas emissions by 2050."
  },
  {
    id: "m1s2-qc2",
    question: "Which scope of emissions covers the indirect emissions from purchased electricity used by a business?",
    options: ["Scope 1", "Scope 2", "Scope 3", "Scope 4"],
    correctIndex: 1,
    explanation: "Scope 2 emissions are indirect emissions from the generation of purchased energy, including electricity."
  },
  {
    id: "m1s2-qc3",
    question: "How many years does each UK carbon budget period cover?",
    options: ["3 years", "5 years", "10 years", "15 years"],
    correctIndex: 1,
    explanation: "UK carbon budgets are set in 5-year periods, providing a clear pathway towards the 2050 net zero target."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When was the UK Climate Change Act originally passed?",
    options: ["2005", "2008", "2015", "2019"],
    correctAnswer: 1,
    explanation: "The Climate Change Act was originally passed in 2008, making the UK the first country to set legally binding emissions targets."
  },
  {
    id: 2,
    question: "What was the original emissions reduction target in the Climate Change Act before amendment?",
    options: ["60% by 2050", "80% by 2050", "100% by 2050", "50% by 2030"],
    correctAnswer: 1,
    explanation: "The original target was 80% reduction by 2050, which was strengthened to net zero in 2019."
  },
  {
    id: 3,
    question: "Which body is responsible for advising the UK government on carbon budgets?",
    options: ["Environment Agency", "Climate Change Committee (CCC)", "Ofgem", "Carbon Trust"],
    correctAnswer: 1,
    explanation: "The Climate Change Committee (CCC) is an independent statutory body that advises government on emissions targets and monitors progress."
  },
  {
    id: 4,
    question: "Scope 1 emissions refer to which type of emissions?",
    options: ["Purchased electricity", "Direct emissions from owned sources", "Supply chain emissions", "Employee commuting"],
    correctAnswer: 1,
    explanation: "Scope 1 covers direct emissions from sources the organisation owns or controls, such as gas boilers and company vehicles."
  },
  {
    id: 5,
    question: "What is the approximate grid carbon intensity target for UK electricity by 2035?",
    options: ["100g CO2/kWh", "50g CO2/kWh", "Near zero (fully decarbonised)", "200g CO2/kWh"],
    correctAnswer: 2,
    explanation: "The UK government aims for a fully decarbonised electricity grid by 2035, meaning near-zero carbon intensity."
  },
  {
    id: 6,
    question: "Which regulation requires large UK companies to report their energy use and carbon emissions?",
    options: ["Part L Building Regulations", "ESOS", "SECR (Streamlined Energy and Carbon Reporting)", "EPC regulations"],
    correctAnswer: 2,
    explanation: "SECR requires quoted and large unquoted companies to disclose energy use and emissions in their annual reports."
  },
  {
    id: 7,
    question: "What percentage of UK emissions come from buildings (heating, cooling, and electricity use)?",
    options: ["About 10%", "About 20%", "About 30%", "About 50%"],
    correctAnswer: 2,
    explanation: "Buildings account for approximately 30% of UK emissions, making building efficiency crucial for net zero."
  },
  {
    id: 8,
    question: "Which carbon budget period runs from 2033-2037?",
    options: ["Fourth Carbon Budget", "Fifth Carbon Budget", "Sixth Carbon Budget", "Seventh Carbon Budget"],
    correctAnswer: 2,
    explanation: "The Sixth Carbon Budget covers 2033-2037 and requires a 78% reduction compared to 1990 levels."
  },
  {
    id: 9,
    question: "Under ESOS, which organisations must conduct energy audits every 4 years?",
    options: ["All businesses", "Large undertakings (250+ employees or £44m+ turnover)", "Only public sector bodies", "Only manufacturing companies"],
    correctAnswer: 1,
    explanation: "ESOS applies to large undertakings meeting the employee or turnover thresholds."
  },
  {
    id: 10,
    question: "What does 'net zero' mean in the context of UK climate targets?",
    options: ["Zero energy consumption", "Balancing emissions produced with emissions removed", "No use of fossil fuels", "Zero carbon electricity only"],
    correctAnswer: 1,
    explanation: "Net zero means balancing greenhouse gas emissions with equivalent removals, acknowledging some residual emissions will need offsetting."
  }
];

const faqs = [
  {
    question: "What is the difference between 'net zero' and 'zero carbon'?",
    answer: "Zero carbon means producing no carbon emissions at all, which is virtually impossible for most activities. Net zero is more achievable - it means balancing the greenhouse gases emitted with an equivalent amount removed from the atmosphere through carbon capture, tree planting, or offset schemes."
  },
  {
    question: "How do carbon budgets affect the electrical industry?",
    answer: "Carbon budgets create a framework driving increasingly strict building regulations, appliance standards, and grid policies. This means growing demand for energy-efficient installations, heat pump systems, EV charging infrastructure, and smart controls."
  },
  {
    question: "Why should electricians understand scope emissions?",
    answer: "Understanding scope emissions helps electricians advise clients effectively. When businesses need to reduce Scope 2 emissions (from electricity), electricians can recommend LED lighting, efficient motors, and smart controls. For Scope 1 (gas heating), electricians can propose heat pump alternatives."
  },
  {
    question: "What is grid decarbonisation and why does it matter?",
    answer: "Grid decarbonisation is replacing fossil fuel power stations with renewable sources like wind, solar, and nuclear. As the grid gets cleaner, switching from gas to electric heating becomes increasingly beneficial for emissions."
  },
  {
    question: "How will the 2035 clean power target affect electrical work?",
    answer: "The 2035 target will massively increase demand for electricians skilled in renewable energy integration, battery storage systems, smart grid technologies, and electric heating installations."
  }
];

const EnergyEfficiencyModule1Section2 = () => {
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
            <span>Module 1 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            UK Carbon Targets and Net Zero
          </h1>
          <p className="text-white/80">
            Understanding the UK's legally binding climate commitments and their impact on the electrical industry
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Target:</strong> UK net zero by 2050 (legally binding)</li>
              <li><strong>Interim:</strong> 78% reduction by 2035</li>
              <li><strong>Grid:</strong> Fully decarbonised electricity by 2035</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Gas heating, high carbon footprint, old systems</li>
              <li><strong>Use:</strong> Heat pumps, efficient electrification, smart controls</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The UK Climate Change Act and 2050 net zero target",
              "Carbon budgets and interim reduction targets",
              "Scope 1, 2, and 3 emissions explained",
              "How electricity grid decarbonisation affects buildings",
              "Business compliance requirements (ESOS, SECR)",
              "Practical implications for electricians"
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
            UK Climate Change Act and 2050 Net Zero Target
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Climate Change Act 2008 made the UK the first country in the world to set legally binding, long-term emissions reduction targets. Originally, it committed to reducing greenhouse gas emissions by 80% compared to 1990 levels by 2050.
            </p>
            <p>
              In June 2019, the target was strengthened to net zero by 2050, making the UK the first major economy to pass net zero legislation. This means the UK must balance any emissions produced with an equivalent amount removed from the atmosphere.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Elements of the Act:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Legal Requirement:</strong> Government must ensure emissions targets are met - it is the law, not just policy</li>
                <li><strong>Independent Oversight:</strong> Climate Change Committee (CCC) advises government and monitors progress</li>
                <li><strong>Carbon Budgets:</strong> Five-year caps on total emissions create a pathway to 2050</li>
                <li><strong>Regular Reporting:</strong> Government must report annually on emissions and progress</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Carbon Budgets and Interim Targets
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Carbon budgets act like a "spending limit" for greenhouse gas emissions over five-year periods. The UK cannot exceed its carbon budget, just as you cannot exceed a financial budget. Each budget is progressively tighter, creating a clear trajectory towards net zero.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Current Carbon Budget Periods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>First (2008-2012):</strong> 25% reduction - Met</li>
                <li><strong>Second (2013-2017):</strong> 31% reduction - Met</li>
                <li><strong>Third (2018-2022):</strong> 37% reduction - Met</li>
                <li><strong>Fourth (2023-2027):</strong> 51% reduction - Current</li>
                <li><strong>Fifth (2028-2032):</strong> 57% reduction - Upcoming</li>
                <li><strong>Sixth (2033-2037):</strong> 78% reduction - Set in law</li>
              </ul>
            </div>
            <p>
              The Sixth Carbon Budget requires a 78% reduction - almost doubling the effort of previous budgets. This will require massive changes to building heating, transport, and industry. The demand for electricians skilled in low-carbon technologies will surge significantly.
            </p>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Scope 1, 2, and 3 Emissions Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Greenhouse Gas Protocol divides emissions into three "scopes" to help organisations understand and manage their carbon footprint. Understanding these categories helps electricians identify where they can make the biggest impact for clients.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Three Scopes:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Scope 1 - Direct Emissions:</strong> Emissions from sources the organisation owns or controls directly (gas boilers, company vehicles, on-site generators, refrigerant leaks)</li>
                <li><strong>Scope 2 - Indirect Energy:</strong> Emissions from purchased energy consumed by the organisation (purchased electricity, steam, heating, cooling)</li>
                <li><strong>Scope 3 - Value Chain:</strong> All other indirect emissions (supply chain, business travel, employee commuting, product end-of-life)</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How Electricians Impact Each Scope:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Scope 1:</strong> Install heat pumps to replace gas boilers, reducing direct combustion emissions</li>
                <li><strong>Scope 2:</strong> LED upgrades, efficient motors, smart controls all reduce electricity consumption</li>
                <li><strong>Scope 3:</strong> EV charging installations help clients reduce transport emissions</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            How Electricity Grid Decarbonisation Affects Buildings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The UK electricity grid has been rapidly decarbonising, with the carbon intensity of electricity dropping dramatically. This transformation has major implications for how we heat buildings and design electrical systems.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Grid Carbon Intensity Trends:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1990:</strong> ~700g CO2/kWh</li>
                <li><strong>2010:</strong> ~500g CO2/kWh</li>
                <li><strong>2020:</strong> ~200g CO2/kWh</li>
                <li><strong>2024:</strong> ~140g CO2/kWh</li>
                <li><strong>2035 Target:</strong> Near zero</li>
              </ul>
            </div>
            <p>
              As grid carbon intensity falls, the emissions benefit of heat pumps over gas boilers grows dramatically. A heat pump using electricity at 140g CO2/kWh already beats a gas boiler. With near-zero grid carbon by 2035, heat pumps will be virtually carbon-free in operation.
            </p>
            <p>
              The UK aims for a fully decarbonised electricity grid by 2035. This 15-year window represents the biggest transformation in UK energy history, and electricians are at the centre of making it happen.
            </p>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Business Responsibilities and Compliance Drivers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multiple regulations and drivers push businesses towards energy efficiency and carbon reduction. Understanding these helps electricians identify opportunities and communicate the value of upgrades to commercial clients.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Compliance Frameworks:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>ESOS:</strong> Mandatory energy audits every 4 years for large undertakings (250+ employees OR £44m+ turnover). Must identify energy saving opportunities.</li>
                <li><strong>SECR:</strong> Annual reporting of energy use (kWh) and greenhouse gas emissions for quoted and large unquoted companies. Published in annual reports.</li>
                <li><strong>MEES:</strong> Commercial properties must meet minimum EPC E to be legally let. Future trajectory towards EPC B by 2030.</li>
                <li><strong>Public Sector:</strong> Display Energy Certificates (DECs) required. Government committed to net zero by 2050.</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Practical Implications for Electricians
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding carbon targets is not just academic - it directly shapes the work electricians will do for decades to come. Here is how these policies translate to practical opportunities and requirements.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Growing Demand Areas:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heat Pump Installations:</strong> Massive growth as gas boilers phased out. 600,000/year target by 2028.</li>
                <li><strong>Electrical Infrastructure Upgrades:</strong> Many properties need larger supplies for heat pumps and EV chargers.</li>
                <li><strong>Energy Efficiency Retrofits:</strong> LED lighting, smart controls, efficient motors for MEES compliance.</li>
                <li><strong>Solar PV and Battery Storage:</strong> On-site generation increasingly common for commercial and domestic.</li>
                <li><strong>Smart Building Controls:</strong> BMS integration, demand response, automated energy management.</li>
                <li><strong>EV Charging Infrastructure:</strong> Workplace, domestic, and public charging installations growing rapidly.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Skills Development Priority</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Upskill in heat pump electrical requirements and MCS certification</li>
                <li>Gain expertise in solar PV and battery storage systems</li>
                <li>Learn EV charging installation and smart charging protocols</li>
                <li>Understand Building Management Systems and integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Client Advisory Role</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Help clients understand compliance requirements (ESOS, MEES)</li>
                <li>Prioritise investments based on carbon reduction impact</li>
                <li>Future-proof installations for electrification of heating</li>
                <li>This advisory value commands premium rates</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersizing supplies</strong> - always consider future heat pump and EV capacity needs</li>
                <li><strong>Ignoring grid connection</strong> - larger installations may need DNO approval</li>
                <li><strong>Not considering controls</strong> - efficient equipment needs smart controls to deliver savings</li>
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
                <p className="font-medium text-white mb-1">Key Dates</p>
                <ul className="space-y-0.5">
                  <li>2008: Climate Change Act passed</li>
                  <li>2019: Net zero target adopted</li>
                  <li>2035: Clean electricity grid target</li>
                  <li>2050: Net zero deadline</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Scope Emissions</p>
                <ul className="space-y-0.5">
                  <li>Scope 1: Direct emissions (gas, vehicles)</li>
                  <li>Scope 2: Purchased energy (electricity)</li>
                  <li>Scope 3: Supply chain and indirect</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule1Section2;
