import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ground Source Heat Pumps - Renewable Energy Module 5";
const DESCRIPTION = "Learn about ground source heat pump systems, ground collector types, borehole design, and installation considerations for GSHP in UK applications.";

const quickCheckQuestions = [
  {
    id: "gshp-advantage",
    question: "What is the main advantage of ground source over air source heat pumps?",
    options: ["Lower installation cost", "Stable source temperature year-round providing consistent efficiency", "Smaller equipment size", "No electricity required"],
    correctIndex: 1,
    explanation: "Ground temperature remains stable at 8-12C year-round in the UK, unlike variable air temperatures. This provides consistent high efficiency regardless of weather conditions."
  },
  {
    id: "gshp-horizontal",
    question: "What is the typical installation depth for horizontal ground collectors?",
    options: ["0.5 metres", "1.0-1.5 metres", "3-5 metres", "10+ metres"],
    correctIndex: 1,
    explanation: "Horizontal collectors are typically installed at 1.0-1.5m depth, below the frost line but where ground still receives some seasonal thermal recharge."
  },
  {
    id: "gshp-borehole-depth",
    question: "What is a typical borehole depth for UK domestic GSHP systems?",
    options: ["20-30 metres", "50-150 metres", "200-300 metres", "500+ metres"],
    correctIndex: 1,
    explanation: "UK domestic boreholes typically range from 50-150 metres depth, with extraction rates of 30-50 W per metre length depending on geology."
  },
  {
    id: "gshp-fluid",
    question: "What fluid typically circulates in closed-loop ground collectors?",
    options: ["Pure water", "Water with antifreeze (glycol) mixture", "Refrigerant", "Oil"],
    correctIndex: 1,
    explanation: "Closed-loop systems use water with antifreeze (typically propylene glycol) to prevent freezing in the ground loop, which operates at temperatures below 0C in winter."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical SCOP range for ground source heat pumps?",
    options: [
      "2.0-2.5",
      "3.5-4.5",
      "5.5-6.5",
      "7.0-8.0"
    ],
    correctAnswer: 1,
    explanation: "GSHPs typically achieve SCOP of 3.5-4.5, higher than ASHPs, due to the stable ground temperature providing consistent source conditions throughout the heating season."
  },
  {
    id: 2,
    question: "What ground area is typically needed for horizontal collectors per kW of heating?",
    options: [
      "5-10 m2",
      "15-30 m2",
      "50-100 m2",
      "200+ m2"
    ],
    correctAnswer: 1,
    explanation: "Horizontal collectors typically require 15-30m2 of ground area per kW of heating capacity, depending on soil type, moisture content, and collector configuration."
  },
  {
    id: 3,
    question: "What is the typical heat extraction rate from UK boreholes?",
    options: [
      "10-20 W/m",
      "30-50 W/m",
      "80-100 W/m",
      "150-200 W/m"
    ],
    correctAnswer: 1,
    explanation: "UK boreholes typically extract 30-50 W per metre length, with higher rates for water-saturated ground and lower for dry sandy soils."
  },
  {
    id: 4,
    question: "What is the purpose of a thermal response test?",
    options: [
      "Test heat pump efficiency",
      "Determine ground thermal conductivity and borehole thermal resistance",
      "Check refrigerant charge",
      "Verify antifreeze concentration"
    ],
    correctAnswer: 1,
    explanation: "Thermal response tests determine ground thermal conductivity and borehole thermal resistance, enabling accurate sizing of borehole arrays for larger systems."
  },
  {
    id: 5,
    question: "What type of pipe is typically used for ground collectors?",
    options: [
      "Copper",
      "High-density polyethylene (HDPE)",
      "PVC",
      "Steel"
    ],
    correctAnswer: 1,
    explanation: "HDPE pipe is standard for ground loops due to its durability, flexibility, chemical resistance, and ability to be heat-fused for leak-free joints."
  },
  {
    id: 6,
    question: "What is the typical glycol concentration in ground loop fluid?",
    options: [
      "5-10%",
      "20-30%",
      "50-60%",
      "Pure glycol"
    ],
    correctAnswer: 1,
    explanation: "Ground loops typically use 20-30% propylene glycol concentration, providing freeze protection to approximately -10 to -15C while maintaining acceptable thermal properties."
  },
  {
    id: 7,
    question: "Why might slinky collectors be preferred over straight trenches?",
    options: [
      "Higher efficiency",
      "More pipe length in smaller trench area",
      "Easier installation",
      "Lower material cost"
    ],
    correctAnswer: 1,
    explanation: "Slinky (coiled) collectors fit more pipe length into a shorter trench, reducing excavation costs and required land area while maintaining heat extraction capacity."
  },
  {
    id: 8,
    question: "What is an open-loop ground source system?",
    options: [
      "Collectors not buried underground",
      "System using groundwater pumped from aquifer",
      "No antifreeze required",
      "Exposed pipework"
    ],
    correctAnswer: 1,
    explanation: "Open-loop systems extract groundwater from an aquifer, pass it through the heat pump, then return it to the ground. They require abstraction licences and suitable aquifer conditions."
  },
  {
    id: 9,
    question: "What permit is required for borehole drilling in England?",
    options: [
      "No permit required",
      "Planning permission only",
      "Notification to Coal Authority and potentially EA groundwater permit",
      "Building regulations approval"
    ],
    correctAnswer: 2,
    explanation: "Borehole drilling requires Coal Authority notification in former mining areas. Groundwater abstraction for open-loop systems requires Environment Agency permit."
  },
  {
    id: 10,
    question: "What affects ground thermal conductivity most significantly?",
    options: [
      "Time of year",
      "Moisture content and geology type",
      "Borehole diameter",
      "Pipe material"
    ],
    correctAnswer: 1,
    explanation: "Ground thermal conductivity varies significantly with moisture content (wet ground conducts better) and geology (rock higher than sand, sand higher than dry clay)."
  }
];

const faqs = [
  {
    question: "How long do ground loops last?",
    answer: "HDPE ground loops have expected lifespans of 50+ years with no moving parts to wear out. The heat pump unit itself may need replacement after 20-25 years, but the ground collectors remain. This longevity contributes to excellent lifetime value."
  },
  {
    question: "Can ground loops be installed under buildings or driveways?",
    answer: "Horizontal collectors should not be installed under buildings due to access requirements and potential ground heave. They can be installed under driveways or parking areas if properly designed. Boreholes can be drilled adjacent to buildings with appropriate precautions."
  },
  {
    question: "What happens if the ground gets too cold from heat extraction?",
    answer: "Undersized ground collectors can result in declining temperatures over years, reducing efficiency. Proper sizing accounts for annual thermal balance. In UK climate, summer solar gain typically recharges domestic systems. Larger commercial systems may need thermal balance analysis."
  },
  {
    question: "How do installation costs compare between horizontal and vertical collectors?",
    answer: "Horizontal collectors cost less per kW (GBP 5,000-10,000 for domestic) but need significant land area. Vertical boreholes cost more (GBP 10,000-20,000 for domestic) but need minimal surface area. Total system costs are similar for equivalent performance."
  },
  {
    question: "Can GSHPs provide cooling as well as heating?",
    answer: "Yes, reversible GSHPs can provide cooling by extracting heat from the building and rejecting it to the ground. This also helps recharge ground temperature for winter. Ground-coupled cooling is very efficient with COPs often exceeding 20 for passive cooling."
  },
  {
    question: "What maintenance do ground source systems require?",
    answer: "Ground loops require minimal maintenance - periodic antifreeze concentration and pH checks, pressure verification, and visual inspection. The heat pump unit requires annual servicing similar to any heating system. Overall maintenance needs are lower than air source due to absence of outdoor unit."
  }
];

const RenewableEnergyModule5Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ground Source Heat Pumps
          </h1>
          <p className="text-white/80">
            Ground collector systems, boreholes, and installation considerations
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Collector Types</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Horizontal:</strong> 1.0-1.5m depth, 15-30m2/kW</li>
              <li><strong>Vertical:</strong> 50-150m boreholes, 30-50W/m</li>
              <li><strong>Slinky:</strong> Coiled pipe in shorter trenches</li>
              <li><strong>Open-loop:</strong> Groundwater extraction</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Performance</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Ground temp:</strong> 8-12C stable year-round</li>
              <li><strong>SCOP:</strong> 3.5-4.5 typical</li>
              <li><strong>Lifespan:</strong> Loops 50+ years</li>
              <li><strong>Maintenance:</strong> Lower than ASHP</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare ground collector configurations",
              "Size horizontal and vertical collectors",
              "Understand geology and thermal conductivity",
              "Apply borehole design principles",
              "Navigate regulatory requirements",
              "Assess site suitability for GSHP"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Ground Source Advantages
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ground source heat pumps exploit the stable temperature found below ground, providing consistent efficiency regardless of air temperature fluctuations throughout the year.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Temperature Stability:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Surface variation:</strong> Air temperatures range -10C to +30C in UK</li>
                <li><strong>Ground stability:</strong> 8-12C year-round at 1.5m+ depth</li>
                <li><strong>Efficiency impact:</strong> Consistent COP throughout year</li>
                <li><strong>No defrost:</strong> Not affected by frost or humidity</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Operational Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Higher SCOP:</strong> Typically 3.5-4.5 vs 2.8-3.5 for ASHP</li>
                <li><strong>No outdoor unit:</strong> No noise concerns or visual impact</li>
                <li><strong>Lower running costs:</strong> Higher efficiency reduces electricity use</li>
                <li><strong>Longer life:</strong> Protected underground components</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Cost Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Higher capital:</strong> GBP 15,000-25,000 typical domestic</li>
                <li><strong>Lower running:</strong> 10-20% less than ASHP typically</li>
                <li><strong>RHI/grants:</strong> Higher rates reflect higher efficiency</li>
                <li><strong>Payback:</strong> Longer but better lifetime value</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Horizontal Collector Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Horizontal collectors offer lower installation costs than boreholes but require significant land area, making them suitable for properties with adequate garden or field space.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Collector Configurations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Straight trenches:</strong> Single or multiple parallel runs</li>
                <li><strong>Slinky coils:</strong> Overlapping loops in narrower trenches</li>
                <li><strong>Horizontal bore:</strong> Directional drilling under obstacles</li>
                <li><strong>Basket collectors:</strong> Vertical coils in wider pits</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sizing Guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Land area:</strong> 15-30 m2 per kW of heating capacity</li>
                <li><strong>Pipe length:</strong> 30-50 metres per kW typically</li>
                <li><strong>Trench depth:</strong> 1.0-1.5 metres below surface</li>
                <li><strong>Pipe spacing:</strong> Minimum 0.5m between parallel runs</li>
                <li><strong>Trench separation:</strong> 2-3 metres between trenches</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Site Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Access:</strong> For excavation equipment</li>
                <li><strong>Soil type:</strong> Affects thermal performance</li>
                <li><strong>Drainage:</strong> Waterlogged ground improves extraction</li>
                <li><strong>Future use:</strong> No structures over collectors</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Vertical Borehole Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Vertical boreholes require minimal surface area and access stable deeper ground temperatures, making them ideal for urban sites or properties with limited land.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Borehole Design:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Typical depth:</strong> 50-150m for domestic, up to 200m commercial</li>
                <li><strong>Diameter:</strong> 125-150mm typically</li>
                <li><strong>Extraction rate:</strong> 30-50 W/m depending on geology</li>
                <li><strong>Spacing:</strong> 5-6m minimum between boreholes</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pipe Configuration:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Single U-tube:</strong> Most common, simple installation</li>
                <li><strong>Double U-tube:</strong> Higher extraction, more complex</li>
                <li><strong>Coaxial:</strong> Pipe-in-pipe design for deeper boreholes</li>
                <li><strong>Grouting:</strong> Thermally enhanced grout improves heat transfer</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Thermal Conductivity by Geology</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Granite/basalt:</strong> 2.5-3.5 W/mK (high)</li>
                <li><strong>Sandstone:</strong> 2.0-2.5 W/mK</li>
                <li><strong>Limestone:</strong> 1.5-2.5 W/mK</li>
                <li><strong>Clay:</strong> 1.0-1.8 W/mK</li>
                <li><strong>Sand (dry):</strong> 0.4-0.8 W/mK (low)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ground Loop Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper ground loop design ensures adequate heat extraction capacity, appropriate flow rates, and long-term thermal sustainability of the system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Closed-Loop Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>HDPE pipe:</strong> 32-40mm diameter, SDR11 rating</li>
                <li><strong>Heat transfer fluid:</strong> Water with 20-30% propylene glycol</li>
                <li><strong>Circulation pump:</strong> Sized for system flow and head loss</li>
                <li><strong>Manifold:</strong> Distributes flow to multiple loops</li>
                <li><strong>Expansion vessel:</strong> Accommodates fluid volume changes</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Flow Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Flow rate:</strong> 0.2-0.3 litres/second per kW</li>
                <li><strong>Delta T:</strong> 3-5C typical temperature difference</li>
                <li><strong>Velocity:</strong> 0.6-1.2 m/s in pipes</li>
                <li><strong>Pressure loss:</strong> Calculated for pump sizing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Open-Loop Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Water quality:</strong> Must not damage heat exchanger</li>
                <li><strong>Abstraction rate:</strong> Sustainable yield from aquifer</li>
                <li><strong>Return:</strong> Re-injection or surface discharge</li>
                <li><strong>Licensing:</strong> EA permit typically required</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Regulatory Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ground source installations require compliance with various regulations depending on collector type, location, and whether groundwater is involved.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Borehole Drilling:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Coal Authority:</strong> Notification in former mining areas</li>
                <li><strong>Building regs:</strong> Part P for electrical installation</li>
                <li><strong>Contamination:</strong> Assessment if brownfield site</li>
                <li><strong>Planning:</strong> Usually permitted development</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Groundwater:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Open-loop:</strong> Environment Agency abstraction licence</li>
                <li><strong>Discharge:</strong> Permit for water return</li>
                <li><strong>Source protection:</strong> Restrictions in protected zones</li>
                <li><strong>Closed-loop:</strong> Generally no water permits required</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">MCS Standards</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>MCS 022:</strong> Ground source heat pump installations</li>
                <li><strong>Design:</strong> EN 15450 heat pump heating systems</li>
                <li><strong>Drilling:</strong> To relevant codes of practice</li>
                <li><strong>Documentation:</strong> Design calculations and test results</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Sites for GSHP</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Evaluate available land area for horizontal collectors</li>
                <li>Research local geology for borehole feasibility</li>
                <li>Check Coal Authority records for mining activity</li>
                <li>Assess access for drilling or excavation equipment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate accurate heat loss before sizing collectors</li>
                <li>Consider thermal response testing for larger systems</li>
                <li>Allow for cooling if system will be reversible</li>
                <li>Size circulation pump for actual system pressure loss</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersizing collectors</strong> - leads to declining performance</li>
                <li><strong>Poor grouting</strong> - reduces borehole heat transfer</li>
                <li><strong>Inadequate antifreeze</strong> - risk of freezing damage</li>
                <li><strong>Ignoring regulations</strong> - compliance issues later</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule5Section3;
