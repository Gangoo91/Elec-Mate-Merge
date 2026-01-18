import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Introduction to Renewables - Renewable Energy Module 1 Section 1";
const DESCRIPTION = "Understanding the environmental, economic, and energy security drivers behind renewable energy adoption, including grid impact and benefits.";

const quickCheckQuestions = [
  {
    id: "climate-driver",
    question: "What percentage of global greenhouse gas emissions comes from traditional fossil fuel power generation?",
    options: [
      "About 10%",
      "About 25%",
      "About 50%",
      "About 75%"
    ],
    correctIndex: 1,
    explanation: "Traditional fossil fuel power generation is responsible for approximately 25% of global greenhouse gas emissions, making it a primary target for decarbonisation efforts."
  },
  {
    id: "decentralised-generation",
    question: "What is decentralised generation?",
    options: [
      "Large power stations far from cities",
      "Power produced close to where it's consumed",
      "Importing electricity from other countries",
      "Nuclear power plants"
    ],
    correctIndex: 1,
    explanation: "Decentralised generation refers to small to medium-scale installations located at or near consumption points, reducing transmission losses and improving local resilience."
  },
  {
    id: "duck-curve",
    question: "What causes the 'duck curve' in electricity demand?",
    options: [
      "Industrial demand patterns",
      "High solar generation during midday reducing net demand",
      "Wind power fluctuations",
      "Evening heating requirements"
    ],
    correctIndex: 1,
    explanation: "The duck curve is caused by solar generation significantly reducing midday demand, creating a steep evening ramp when solar output drops and demand rises."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary environmental driver for renewable energy adoption?",
    options: [
      "Reducing noise pollution",
      "Reducing greenhouse gas emissions",
      "Increasing energy consumption",
      "Creating more power stations"
    ],
    correctAnswer: 1,
    explanation: "The urgent need to reduce greenhouse gas emissions and combat climate change is the primary environmental driver for renewable energy adoption."
  },
  {
    id: 2,
    question: "How do life-cycle carbon footprints of renewables compare to fossil fuels?",
    options: [
      "About the same",
      "2-5 times lower",
      "10-50 times lower",
      "Only slightly lower"
    ],
    correctAnswer: 2,
    explanation: "Life-cycle analysis shows that renewable technologies have carbon footprints 10-50 times lower than fossil fuel alternatives."
  },
  {
    id: 3,
    question: "What is a key economic benefit of renewable energy?",
    options: [
      "Higher fuel costs",
      "Reduced exposure to volatile fuel prices",
      "Increased trade deficits",
      "More complex supply chains"
    ],
    correctAnswer: 1,
    explanation: "Renewables reduce exposure to volatile fossil fuel prices and provide price stability since the 'fuel' (sun, wind, water) is free."
  },
  {
    id: 4,
    question: "What scale are typical decentralised generation installations?",
    options: [
      "Over 100MW only",
      "1kW to 50MW",
      "500MW to 1GW",
      "Under 100W"
    ],
    correctAnswer: 1,
    explanation: "Decentralised generation typically involves small to medium-scale installations ranging from 1kW to 50MW, located near consumption points."
  },
  {
    id: 5,
    question: "What is a key challenge of integrating variable renewables into the grid?",
    options: [
      "They generate too much power",
      "Intermittency and weather dependence",
      "They use too much fuel",
      "They're too reliable"
    ],
    correctAnswer: 1,
    explanation: "Variable output from wind and solar requires backup systems and storage to address intermittency and weather dependence challenges."
  },
  {
    id: 6,
    question: "What technology helps address renewable intermittency?",
    options: [
      "More fossil fuel plants",
      "Energy storage systems",
      "Reducing energy demand",
      "Longer transmission lines"
    ],
    correctAnswer: 1,
    explanation: "Energy storage systems like batteries and pumped hydro help smooth output variations and store excess renewable energy for later use."
  },
  {
    id: 7,
    question: "What is 'demand response' in the context of grid management?",
    options: [
      "Building more power stations",
      "Flexible consumption to match variable generation",
      "Reducing renewable capacity",
      "Importing more electricity"
    ],
    correctAnswer: 1,
    explanation: "Demand response involves adjusting electricity consumption patterns to match variable renewable generation, helping balance the grid."
  },
  {
    id: 8,
    question: "How has the UK's increased solar capacity affected grid load profiles?",
    options: [
      "No change",
      "Higher midday demand",
      "Created the 'duck curve' with shifted peak demand",
      "Reduced evening demand"
    ],
    correctAnswer: 2,
    explanation: "Solar generation has created the 'duck curve' where peak demand timing has shifted from midday to early evening as solar output decreases."
  },
  {
    id: 9,
    question: "What is the main advantage of renewables for energy security?",
    options: [
      "Reliance on imported fuels",
      "Domestic resource utilisation",
      "Complex fuel supply chains",
      "Price volatility"
    ],
    correctAnswer: 1,
    explanation: "Renewables use domestic resources (sun, wind, water) that can't be weaponised or subjected to price manipulation, enhancing energy security."
  },
  {
    id: 10,
    question: "Why are smart grids important for renewable integration?",
    options: [
      "They reduce renewable output",
      "They enable real-time management and monitoring",
      "They increase fossil fuel use",
      "They simplify the grid"
    ],
    correctAnswer: 1,
    explanation: "Smart grids provide advanced monitoring and control systems for real-time management of variable renewable generation."
  }
];

const faqs = [
  {
    question: "Why is renewable energy considered essential for climate action?",
    answer: "Renewable energy produces zero operational carbon emissions and can reduce electricity sector emissions by 85-95%. With electricity generation responsible for about 25% of global greenhouse gas emissions, the transition to renewables is crucial for meeting climate targets."
  },
  {
    question: "How do renewables improve energy security?",
    answer: "Renewables use domestic resources (sun, wind, water) that can't be weaponised or subjected to price manipulation by other countries. This reduces dependence on volatile fossil fuel imports and provides price stability."
  },
  {
    question: "What is the 'duck curve' and why does it matter?",
    answer: "The duck curve describes how net electricity demand changes when solar generation is high during midday but drops as the sun sets, creating a steep evening ramp. This challenges grid operators who must rapidly increase conventional generation."
  },
  {
    question: "Are renewables really cheaper than fossil fuels?",
    answer: "Yes, in most regions renewables are now the cheapest source of new electricity generation. Solar and wind costs have fallen 85% and 70% respectively since 2010, though total system costs including storage must be considered."
  },
  {
    question: "How do renewables affect local communities?",
    answer: "Renewables can bring local job creation, lease payments to landowners, and business rates for local councils. However, concerns about visual impact and noise require careful planning and community engagement."
  },
  {
    question: "What happens when the wind doesn't blow and the sun doesn't shine?",
    answer: "This is addressed through energy storage, demand flexibility, grid interconnection to areas with better conditions, and maintaining some dispatchable generation for backup during extended low renewable periods."
  }
];

const RenewableEnergyModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 1 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Introduction to Renewables
          </h1>
          <p className="text-white/80">
            The Need, Benefits &amp; Grid Impact
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Climate:</strong> Renewables cut emissions by 85-95%</li>
              <li><strong>Security:</strong> Domestic resources, no fuel imports</li>
              <li><strong>Economics:</strong> Lower long-term costs, price stability</li>
              <li><strong>Grid:</strong> Requires storage and smart management</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Solar panels, wind turbines, grid-connected systems</li>
              <li><strong>Use:</strong> Site assessments, system design, grid integration</li>
              <li><strong>Apply:</strong> Understanding customer benefits and challenges</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand environmental drivers for renewable adoption",
              "Recognise economic and energy security benefits",
              "Identify challenges of grid integration",
              "Explain decentralised generation concepts",
              "Describe solutions for renewable intermittency",
              "Compare renewables with fossil fuel systems"
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

        {/* Section 1: Climate Change and Carbon Reduction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Climate Change and Carbon Reduction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The primary environmental driver for renewable energy adoption is the urgent need to reduce greenhouse gas emissions. Traditional fossil fuel power generation is responsible for approximately 25% of global greenhouse gas emissions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Environmental Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Zero operational carbon emissions from wind, solar, and hydro</li>
                <li>Significant reduction in air pollution and particulate matter</li>
                <li>Minimal water consumption compared to thermal power plants</li>
                <li>Reduced environmental degradation from fuel extraction</li>
              </ul>
            </div>

            <p>
              Life-cycle analysis shows that renewable technologies have carbon footprints 10-50 times lower than fossil fuel alternatives when considering manufacturing, operation, and decommissioning phases.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Energy Independence and Resilience */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Energy Independence and Resilience
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy security has become a critical national priority, particularly following recent geopolitical events that have highlighted the risks of fossil fuel dependence.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Economic Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Reduced exposure to volatile fuel prices</li>
                  <li>Lower long-term operational costs</li>
                  <li>Job creation in green industries</li>
                  <li>Reduced trade deficits from fuel imports</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Security Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Domestic resource utilisation</li>
                  <li>Reduced geopolitical risks</li>
                  <li>Enhanced supply chain resilience</li>
                  <li>Strategic independence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Decentralised Generation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Decentralised Generation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Traditional power systems rely on large, centralised power stations that transmit electricity over long distances. Renewable energy enables a shift towards decentralised generation, where power is produced closer to where it's consumed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Decentralised Generation Characteristics:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Scale and Location:</strong> Small to medium-scale installations (1kW to 50MW) located at or near consumption points</li>
                <li><strong>Grid Connection:</strong> Connected to distribution networks rather than transmission systems</li>
                <li><strong>Benefits:</strong> Reduced transmission losses, improved local resilience, faster deployment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Grid Impact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Impact on Grid Stability and Balancing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While renewables offer significant benefits, their integration presents new challenges for grid operation and stability.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Challenges</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Intermittency:</strong> Variable output requires backup systems</li>
                  <li><strong>Forecasting:</strong> Weather-dependent generation is harder to predict</li>
                  <li><strong>Grid Stability:</strong> Maintaining frequency and voltage limits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Solutions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Smart Grids:</strong> Advanced monitoring and control</li>
                  <li><strong>Energy Storage:</strong> Batteries and pumped hydro</li>
                  <li><strong>Demand Response:</strong> Flexible consumption patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Real World Example */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Example: UK Solar Impact
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The UK's increased solar capacity has fundamentally changed grid load profiles. During sunny days, solar generation significantly reduces midday demand from traditional power stations, creating what's known as the "duck curve" - where conventional generation must ramp down during the day and rapidly ramp up in the evening as solar output decreases.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow text-sm font-medium">
                Key Impact: Peak demand timing has shifted from midday to early evening, requiring new grid management approaches.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Comparison with Fossil Fuels */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Comparison with Fossil Fuel Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white p-2">Aspect</th>
                    <th className="text-left text-elec-yellow p-2">Renewables</th>
                    <th className="text-left text-white/70 p-2">Fossil Fuels</th>
                  </tr>
                </thead>
                <tbody className="text-white/90">
                  <tr className="border-b border-white/5">
                    <td className="p-2 font-medium">Fuel Cost</td>
                    <td className="p-2">Free (sun, wind, water)</td>
                    <td className="p-2">Variable market prices</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 font-medium">Emissions</td>
                    <td className="p-2">Zero operational</td>
                    <td className="p-2">Significant CO2, NOx, SO2</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 font-medium">Predictability</td>
                    <td className="p-2">Weather dependent</td>
                    <td className="p-2">Highly controllable</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 font-medium">Ramp Rate</td>
                    <td className="p-2">Variable by technology</td>
                    <td className="p-2">Fast (gas), slow (coal)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Lifespan</td>
                    <td className="p-2">20-30 years</td>
                    <td className="p-2">30-50 years</td>
                  </tr>
                </tbody>
              </table>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Discussing with Customers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Explain the long-term cost benefits of renewable systems</li>
                <li>Highlight energy independence and price stability advantages</li>
                <li>Address grid connection requirements and processes</li>
                <li>Discuss realistic expectations for system performance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider local grid capacity and connection constraints</li>
                <li>Factor in storage requirements for maximising self-consumption</li>
                <li>Account for seasonal variations in renewable output</li>
                <li>Plan for future expansion and technology upgrades</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Overselling reliability</strong> - be honest about intermittency</li>
                <li><strong>Ignoring grid constraints</strong> - always check connection capacity</li>
                <li><strong>Underestimating storage needs</strong> - critical for self-consumption goals</li>
                <li><strong>Forgetting maintenance</strong> - renewables still need regular care</li>
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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
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

export default RenewableEnergyModule1Section1;
