import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Overview of Key Systems - Renewable Energy Module 1 Section 2";
const DESCRIPTION = "Understanding how Solar PV, Wind, Hydro, and Biomass technologies work, their applications, and comparative strengths.";

const quickCheckQuestions = [
  {
    id: "solar-pv",
    question: "What is the typical efficiency range for commercial solar panels?",
    options: [
      "5-10%",
      "15-22%",
      "30-40%",
      "50-60%"
    ],
    correctIndex: 1,
    explanation: "Modern commercial solar panels achieve 15-22% efficiency, with UK capacity factors of 15-25% depending on location and orientation."
  },
  {
    id: "wind-power",
    question: "How does power output relate to wind speed?",
    options: [
      "Power is directly proportional to wind speed",
      "Power is proportional to wind speed squared",
      "Power is proportional to wind speed cubed",
      "Power is constant regardless of wind speed"
    ],
    correctIndex: 2,
    explanation: "Wind power is proportional to wind speed cubed (P proportional to V cubed), meaning doubling wind speed increases power output eightfold."
  },
  {
    id: "hydro-efficiency",
    question: "What efficiency can hydroelectric systems achieve?",
    options: [
      "30-50%",
      "50-70%",
      "Over 90%",
      "Around 80%"
    ],
    correctIndex: 2,
    explanation: "Hydroelectric systems can achieve over 90% efficiency, making them one of the most efficient forms of electricity generation available."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "How do solar PV cells convert sunlight to electricity?",
    options: [
      "Through heat generation",
      "Through the photovoltaic effect using semiconductors",
      "Through mechanical movement",
      "Through chemical reactions"
    ],
    correctAnswer: 1,
    explanation: "Solar PV cells use the photovoltaic effect where photons knock electrons loose from atoms in semiconductor materials, creating electric current."
  },
  {
    id: 2,
    question: "What is a typical capacity factor for UK offshore wind farms?",
    options: [
      "15-20%",
      "25-35%",
      "45-55%",
      "70-80%"
    ],
    correctAnswer: 2,
    explanation: "UK offshore wind farms typically achieve 45-55% capacity factors due to stronger and more consistent winds compared to onshore locations."
  },
  {
    id: 3,
    question: "What is 'cut-in speed' for wind turbines?",
    options: [
      "Maximum safe operating speed",
      "Speed at which the turbine reaches full power",
      "Minimum wind speed for electricity generation",
      "Speed for maintenance procedures"
    ],
    correctAnswer: 2,
    explanation: "Cut-in speed is the minimum wind speed (typically 3-4 m/s) at which a wind turbine begins generating electricity."
  },
  {
    id: 4,
    question: "What is the typical lifespan of a hydroelectric plant?",
    options: [
      "10-20 years",
      "20-30 years",
      "30-50 years",
      "50-100 years"
    ],
    correctAnswer: 3,
    explanation: "Hydroelectric plants have very long lifespans of 50-100 years, making them one of the most durable renewable energy technologies."
  },
  {
    id: 5,
    question: "Why is biomass considered carbon neutral when sustainably managed?",
    options: [
      "It produces no emissions",
      "CO2 released was recently absorbed during plant growth",
      "It uses carbon capture technology",
      "It only burns clean fuels"
    ],
    correctAnswer: 1,
    explanation: "Biomass is considered carbon neutral because the CO2 released during combustion was recently absorbed from the atmosphere during the plants' growth cycle."
  },
  {
    id: 6,
    question: "What is 'pumped storage' hydropower used for?",
    options: [
      "Continuous baseload generation",
      "Energy storage and grid balancing",
      "Water treatment",
      "Irrigation"
    ],
    correctAnswer: 1,
    explanation: "Pumped storage uses excess electricity to pump water uphill, then releases it to generate power when needed, providing energy storage and grid balancing services."
  },
  {
    id: 7,
    question: "What is the main advantage of thin-film solar panels?",
    options: [
      "Highest efficiency",
      "Flexibility and better performance in high temperatures",
      "Lowest degradation rates",
      "Longest warranty"
    ],
    correctAnswer: 1,
    explanation: "Thin-film panels offer flexibility, lower temperature coefficients, and better performance in diffuse light and high-temperature conditions."
  },
  {
    id: 8,
    question: "What is the UK's installed wind capacity (2023)?",
    options: [
      "About 10GW",
      "About 28.8GW",
      "About 50GW",
      "About 100GW"
    ],
    correctAnswer: 1,
    explanation: "The UK had approximately 28.8GW of installed wind capacity in 2023, making it one of the world's leading wind energy producers."
  },
  {
    id: 9,
    question: "What is anaerobic digestion used for in biomass energy?",
    options: [
      "Burning wood chips",
      "Producing biogas from organic waste",
      "Generating solar power",
      "Pumping water"
    ],
    correctAnswer: 1,
    explanation: "Anaerobic digestion breaks down organic materials without oxygen to produce biogas, which can be used for electricity generation or heating."
  },
  {
    id: 10,
    question: "Why are wind and solar often described as 'complementary'?",
    options: [
      "They use the same equipment",
      "Wind is often stronger when solar is lower and vice versa",
      "They have identical capacity factors",
      "They cost the same to install"
    ],
    correctAnswer: 1,
    explanation: "Wind tends to be stronger at night and in winter when solar output is lower, meaning combined systems can provide more consistent generation."
  }
];

const faqs = [
  {
    question: "Which renewable technology is best for homes?",
    answer: "Solar PV is typically most suitable for homes due to its scalability, modularity, and ease of rooftop installation. Heat pumps can also be excellent for heating and hot water. The choice depends on property orientation, roof space, energy usage, and local planning."
  },
  {
    question: "How efficient are solar panels in the UK?",
    answer: "Modern solar panels achieve 15-22% efficiency, with UK capacity factors of 15-25%. Despite less sunshine than sunnier countries, solar is economically viable, generating about 1,000kWh per year per kW installed in southern England."
  },
  {
    question: "Why is offshore wind more expensive than onshore?",
    answer: "Offshore wind requires specialised vessels, subsea cables, and offshore substations. However, offshore winds are stronger and more consistent, leading to higher capacity factors (45-55% vs 25-35% onshore) that offset additional costs."
  },
  {
    question: "Is biomass really renewable if it produces CO2?",
    answer: "Biomass is considered renewable because the CO2 released was recently absorbed during plant growth, creating a short carbon cycle. However, this assumes sustainable sourcing - if from deforestation, it may not provide net climate benefits."
  },
  {
    question: "How long do renewable energy systems last?",
    answer: "Lifespans vary: solar panels 25-30 years, wind turbines 20-25 years, small hydro 50+ years, and large hydro 50-100+ years. Long lifespans and minimal fuel costs often make renewables cheaper over their lifetime."
  },
  {
    question: "Can renewables really replace all fossil fuel generation?",
    answer: "Studies suggest renewables could provide 80-100% of electricity needs with the right mix of technologies, storage, grid flexibility, and demand management. Key challenges are seasonal storage and ensuring adequate grid services."
  }
];

const RenewableEnergyModule1Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-1">
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
            <span>Module 1 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overview of Key Systems
          </h1>
          <p className="text-white/80">
            Solar PV, Wind, Hydro &amp; Biomass
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Solar PV:</strong> 15-22% efficiency, highly scalable</li>
              <li><strong>Wind:</strong> Power proportional to wind speed cubed</li>
              <li><strong>Hydro:</strong> &gt;90% efficiency, 50-100 year lifespan</li>
              <li><strong>Biomass:</strong> Dispatchable, uses organic materials</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Rooftop panels, wind farms, reservoirs</li>
              <li><strong>Use:</strong> Technology selection for specific sites</li>
              <li><strong>Apply:</strong> Understanding trade-offs for project planning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify how each renewable technology converts resources to electricity",
              "Understand typical applications and output characteristics",
              "Compare strengths and limitations of different technologies",
              "Evaluate appropriate technology choices for specific projects",
              "Recognise key performance metrics for each system type",
              "Apply knowledge to real-world installation decisions"
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

        {/* Section 1: Solar PV */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Solar PV: Photovoltaic Technology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Solar photovoltaic (PV) systems convert sunlight directly into electricity using the photovoltaic effect, where photons knock electrons loose from atoms in semiconductor materials.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">How It Works</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Photovoltaic cells made from silicon semiconductors</li>
                  <li>Photons create electron-hole pairs in the material</li>
                  <li>Built-in electric field separates charge carriers</li>
                  <li>Direct current (DC) flows to external circuit</li>
                  <li>Inverters convert DC to AC for grid connection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li>PV modules (panels) with multiple cells</li>
                  <li>Mounting systems and tracking mechanisms</li>
                  <li>DC optimisers and power electronics</li>
                  <li>Inverters for AC conversion</li>
                  <li>Monitoring and safety systems</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Real-World Performance (UK):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Capacity Factor:</strong> 15-25% (UK average)</li>
                <li><strong>Module Efficiency:</strong> 15-22% (commercial panels)</li>
                <li><strong>System Lifespan:</strong> 25-30 years with warranty</li>
                <li><strong>Annual Degradation:</strong> 0.5-0.8% per year</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Wind */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Wind: Mechanical-to-Electrical Conversion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wind turbines harness kinetic energy from moving air, converting it to rotational mechanical energy, then to electricity through generators.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Principle</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Aerodynamic blade design creates lift force</li>
                  <li>Rotor assembly converts wind to rotation</li>
                  <li>Gearbox increases rotational speed</li>
                  <li>Generator converts mechanical to electrical energy</li>
                  <li>Power electronics condition output</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cut-in:</strong> 3-4 m/s minimum for generation</li>
                  <li><strong>Rated:</strong> 12-15 m/s for maximum output</li>
                  <li><strong>Cut-out:</strong> 25 m/s for safety shutdown</li>
                  <li><strong>Power:</strong> Proportional to wind speed cubed</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UK Wind Industry Facts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installed Capacity:</strong> 28.8GW (2023)</li>
                <li><strong>Capacity Factor:</strong> 25-35% onshore, 45-55% offshore</li>
                <li><strong>Best UK Regions:</strong> Scotland, Wales, SW England</li>
                <li><strong>Offshore Potential:</strong> World's largest offshore market</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Hydro */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Hydro: Harnessing Water Flow
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hydroelectric systems convert the potential and kinetic energy of flowing water into electricity, providing one of the most reliable and efficient renewable energy sources.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Large scale:</strong> Dams with reservoirs (&gt;30MW)</li>
                  <li><strong>Small scale:</strong> Run-of-river systems (&lt;30MW)</li>
                  <li><strong>Micro hydro:</strong> Very small installations (&lt;100kW)</li>
                  <li><strong>Pumped storage:</strong> Energy storage and generation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Very long lifespan (50-100 years)</li>
                  <li>High efficiency (&gt;90%)</li>
                  <li>Predictable output based on water flow</li>
                  <li>Fast response for grid balancing</li>
                  <li>Black start capability</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UK Hydro Landscape:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Total Capacity:</strong> ~1.9GW (large scale) + ~500MW small scale</li>
                <li><strong>Pumped Storage:</strong> 2.8GW (Dinorwig, Ffestiniog)</li>
                <li><strong>Best Regions:</strong> Scotland, Wales, Northern England</li>
                <li><strong>Annual Generation:</strong> ~2% of UK electricity</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Biomass */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Biomass: Organic Material for Energy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Biomass energy systems burn organic materials to produce heat and electricity, offering a renewable alternative that provides controllable, dispatchable power.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fuel Sources</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wood chips, pellets, and forestry residues</li>
                  <li>Agricultural residues (straw, husks)</li>
                  <li>Energy crops (miscanthus, switchgrass)</li>
                  <li>Organic waste and biogas</li>
                  <li>Municipal solid waste (MSW)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conversion Technologies</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Direct combustion in boilers</li>
                  <li>Gasification for syngas production</li>
                  <li>Pyrolysis for bio-oil</li>
                  <li>Anaerobic digestion for biogas</li>
                  <li>Co-firing with coal</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow text-sm font-medium mb-2">Carbon Cycle Note:</p>
              <p className="text-white text-sm">
                Biomass is considered renewable because CO2 released during combustion was recently absorbed during plant growth, creating a short carbon cycle. Sustainability depends on responsible sourcing practices.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Technology Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Technology Comparison Matrix
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white p-2">System</th>
                    <th className="text-left text-elec-yellow p-2">Pros</th>
                    <th className="text-left text-white/70 p-2">Cons</th>
                    <th className="text-left text-white p-2">Scale</th>
                  </tr>
                </thead>
                <tbody className="text-white/90">
                  <tr className="border-b border-white/5">
                    <td className="p-2 font-medium">Solar PV</td>
                    <td className="p-2 text-sm">Scalable, low maintenance, modular</td>
                    <td className="p-2 text-sm">Intermittent, weather dependent</td>
                    <td className="p-2">1kW - 1GW+</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 font-medium">Wind</td>
                    <td className="p-2 text-sm">High capacity factors, clean</td>
                    <td className="p-2 text-sm">Visual impact, wind variability</td>
                    <td className="p-2">100kW - 1GW+</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 font-medium">Hydro</td>
                    <td className="p-2 text-sm">Stable baseload, very long life</td>
                    <td className="p-2 text-sm">Site limited, ecological risks</td>
                    <td className="p-2">1MW - 22GW</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Biomass</td>
                    <td className="p-2 text-sm">Dispatchable, waste utilisation</td>
                    <td className="p-2 text-sm">Some emissions, fuel logistics</td>
                    <td className="p-2">100kW - 700MW</td>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Technology</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider site-specific resources (solar irradiance, wind speed, water flow)</li>
                <li>Evaluate available space and planning constraints</li>
                <li>Match technology to customer energy usage patterns</li>
                <li>Factor in grid connection capacity and requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider hybrid systems combining complementary technologies</li>
                <li>Include storage where appropriate to maximise value</li>
                <li>Plan for seasonal variations in resource availability</li>
                <li>Design for long-term reliability and maintenance access</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring site conditions</strong> - resource assessment is critical</li>
                <li><strong>Oversizing systems</strong> - match capacity to actual demand</li>
                <li><strong>Forgetting maintenance</strong> - all systems need regular care</li>
                <li><strong>Underestimating costs</strong> - include grid connection and commissioning</li>
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
            <Link to="/electrician/upskilling/renewable-energy-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
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

export default RenewableEnergyModule1Section2;
