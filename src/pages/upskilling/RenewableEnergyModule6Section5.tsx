import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "V2G and Smart Charging - Renewable Energy Module 6";
const DESCRIPTION =
  "Explore vehicle-to-grid technology, bidirectional charging, smart charging orchestration, and the role of EVs in grid services and renewable energy integration.";

const quickCheckQuestions = [
  {
    id: "v2g-qc1",
    question: "What is the primary difference between V2G and V2H?",
    options: [
      "V2G uses AC, V2H uses DC",
      "V2G exports to the grid, V2H powers only the home",
      "V2H is faster than V2G",
      "V2G is bidirectional, V2H is not",
    ],
    correctIndex: 1,
    explanation:
      "V2G (Vehicle-to-Grid) exports power to the public electricity grid, while V2H (Vehicle-to-Home) powers only the property, typically operating as a backup power source.",
  },
  {
    id: "v2g-qc2",
    question: "What ISO standard defines bidirectional charging communication?",
    options: ["ISO 15118-1", "ISO 15118-2", "ISO 15118-20", "ISO 61851"],
    correctIndex: 2,
    explanation:
      "ISO 15118-20 extends the CCS communication protocol to support bidirectional power transfer, enabling V2G and V2H functionality with standardised communication.",
  },
  {
    id: "v2g-qc3",
    question: "What grid service involves rapid power adjustment to maintain 50Hz frequency?",
    options: ["Peak shaving", "Frequency response", "Demand shifting", "Load balancing"],
    correctIndex: 1,
    explanation:
      "Frequency response services involve rapid power injection or absorption to help maintain grid frequency at 50Hz, responding to supply/demand imbalances within seconds.",
  },
  {
    id: "v2g-qc4",
    question: "What is the typical export power capability of current V2G chargers?",
    options: ["3.6 kW", "7-10 kW", "22 kW", "50 kW"],
    correctIndex: 1,
    explanation:
      "Current V2G chargers typically support 7-10 kW bidirectional power, matching common single-phase domestic supply limits whilst providing meaningful grid services.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is 'smart charging' in the context of EV infrastructure?",
    options: [
      "Faster charging technology",
      "Automated scheduling and power adjustment based on signals",
      "Wireless charging",
      "Premium charging services",
    ],
    correctAnswer: 1,
    explanation:
      "Smart charging automatically adjusts when and how fast vehicles charge based on grid signals, tariffs, renewable availability, and user preferences.",
  },
  {
    id: 2,
    question: "Which vehicles currently support V2G in the UK market?",
    options: [
      "All electric vehicles",
      "Only Tesla vehicles",
      "Select models with CHAdeMO (Nissan Leaf) and some CCS vehicles",
      "No vehicles support V2G yet",
    ],
    correctAnswer: 2,
    explanation:
      "V2G is currently supported by select vehicles including Nissan Leaf (CHAdeMO) and some newer CCS vehicles. Compatibility is expanding but not universal.",
  },
  {
    id: 3,
    question: "What is demand response in smart charging?",
    options: [
      "Responding to customer charging requests",
      "Adjusting charging based on grid operator signals",
      "Faster response to plug-in events",
      "Customer service response times",
    ],
    correctAnswer: 1,
    explanation:
      "Demand response involves automatically reducing or shifting charging load in response to grid operator signals, helping balance supply and demand across the network.",
  },
  {
    id: 4,
    question: "What regulation requires smart functionality in UK private EV chargers?",
    options: [
      "BS 7671",
      "The Electric Vehicles (Smart Charge Points) Regulations 2021",
      "Part P Building Regulations",
      "G99 requirements",
    ],
    correctAnswer: 1,
    explanation:
      "The Electric Vehicles (Smart Charge Points) Regulations 2021 mandate smart functionality for private charge points, enabling demand management and off-peak charging.",
  },
  {
    id: 5,
    question: "What is the economic benefit of participating in frequency response services?",
    options: [
      "Reduced electricity bills only",
      "Payment for providing grid balancing services",
      "Free electricity",
      "No economic benefit - it's mandatory",
    ],
    correctAnswer: 1,
    explanation:
      "V2G participants can receive payments for providing frequency response and other grid services, potentially earning significant revenue from their vehicle battery capacity.",
  },
  {
    id: 6,
    question: "What battery warranty concern exists with V2G operation?",
    options: [
      "No warranty concerns exist",
      "Additional charge cycles may affect warranty terms",
      "V2G always voids the warranty",
      "Warranties are extended for V2G",
    ],
    correctAnswer: 1,
    explanation:
      "Some manufacturers have warranty concerns about additional V2G cycling. However, controlled V2G operation may cause minimal additional degradation, and some manufacturers now explicitly support V2G.",
  },
  {
    id: 7,
    question: "What is 'time-of-use' tariff integration in smart charging?",
    options: [
      "Charging only at certain times",
      "Automatic scheduling to charge during cheapest rate periods",
      "Payment by the hour",
      "Time-limited charging sessions",
    ],
    correctAnswer: 1,
    explanation:
      "Time-of-use integration automatically schedules charging during off-peak periods when electricity is cheapest, typically overnight, reducing charging costs significantly.",
  },
  {
    id: 8,
    question: "What is solar matching in EV charging?",
    options: [
      "Using yellow-coloured chargers",
      "Adjusting charge rate to match solar PV generation",
      "Charging only on sunny days",
      "Solar-powered charging stations",
    ],
    correctAnswer: 1,
    explanation:
      "Solar matching dynamically adjusts EV charging power to utilise available solar generation, maximising self-consumption and reducing grid import.",
  },
  {
    id: 9,
    question: "What approval may be required for V2G export in the UK?",
    options: [
      "No approval required",
      "DNO notification and potentially G98/G99 approval",
      "Only manufacturer approval",
      "Local authority planning permission",
    ],
    correctAnswer: 1,
    explanation:
      "V2G systems that export to the grid require DNO notification and compliance with G98 (up to 16A per phase) or G99 (larger systems) connection standards.",
  },
  {
    id: 10,
    question: "What is the expected market development for V2G by 2030?",
    options: [
      "V2G will be discontinued",
      "Widespread adoption with millions of V2G-capable vehicles",
      "No significant change expected",
      "Only commercial fleets will use V2G",
    ],
    correctAnswer: 1,
    explanation:
      "Industry projections suggest widespread V2G adoption by 2030, with millions of vehicles capable of providing grid services, supported by standardisation and growing vehicle compatibility.",
  },
];

const faqs = [
  {
    question: "Will V2G damage my EV battery?",
    answer:
      "Research suggests that controlled V2G operation causes minimal additional battery degradation compared to normal driving. Smart V2G systems optimise cycles to minimise wear. Some studies show V2G can even extend battery life by maintaining optimal charge levels. However, check manufacturer warranty terms for your specific vehicle.",
  },
  {
    question: "How much can I earn from V2G services?",
    answer:
      "Earnings vary based on vehicle availability, battery capacity, and services provided. Current UK trials show potential earnings of 300-700 pounds per year for domestic V2G, with higher returns possible for commercial fleet participation. As the market develops, revenue streams may increase.",
  },
  {
    question: "Do I need a special electricity tariff for smart charging?",
    answer:
      "While not mandatory, time-of-use or EV-specific tariffs maximise smart charging benefits. These tariffs offer significantly cheaper overnight rates (sometimes 5-7p/kWh vs 25p+ peak). Many suppliers offer dedicated EV tariffs with smart charging integration.",
  },
  {
    question: "Can I use V2G as home backup power during outages?",
    answer:
      "Yes, V2H (Vehicle-to-Home) functionality can provide backup power during grid outages. A typical EV battery (40-70 kWh) could power essential home loads for 1-3 days. The charger must support islanded operation and appropriate changeover switching is required for safety.",
  },
  {
    question: "What happens if I need my car but it has been discharged by V2G?",
    answer:
      "V2G systems allow users to set minimum charge levels and departure times. The system ensures your vehicle has the required charge when needed. You can override V2G operation at any time if plans change.",
  },
  {
    question: "Is V2G compatible with all EVs?",
    answer:
      "Currently, V2G is only supported by specific vehicles. CHAdeMO-equipped Nissan Leafs have the longest V2G track record. CCS vehicles are gaining V2G capability as ISO 15118-20 is implemented. Check vehicle specifications and charger compatibility before planning V2G installations.",
  },
];

const RenewableEnergyModule6Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-6">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">V2G and Smart Charging</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 6 - Section 5</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          V2G and Smart Charging
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Bidirectional charging technology and intelligent charging management for grid integration
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">In 30 Seconds:</span> V2G enables EVs to export stored energy back to the grid for revenue
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Spot it:</span> CHAdeMO or CCS connectors with bidirectional capability
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Use it:</span> Frequency response and peak shaving grid services
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Key Standard:</span> ISO 15118-20 for bidirectional communication
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Understand V2G, V2H, and V2L technology differences",
            "Explain grid services that EVs can provide",
            "Describe smart charging communication protocols",
            "Identify regulatory requirements for bidirectional charging",
            "Apply solar and tariff integration strategies",
            "Assess V2G business cases and deployment considerations",
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
            <h2 className="text-xl font-semibold text-white">Bidirectional Charging Technologies</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Bidirectional charging transforms EVs from passive loads into active energy assets. Several related technologies enable different use cases for exporting stored battery energy.
            </p>
            <p>
              <span className="text-white font-medium">V2G - Vehicle-to-Grid:</span> Exports power from the vehicle battery to the public electricity grid. Enables participation in grid balancing services and wholesale energy markets. Requires G98/G99 compliant inverter and DNO notification. The charger must synchronise with grid frequency and voltage.
            </p>
            <p>
              <span className="text-white font-medium">V2H - Vehicle-to-Home:</span> Powers the home from the vehicle battery without exporting to the grid. Can operate during outages as backup power if appropriately configured. Has simpler regulatory requirements than V2G and reduces peak demand whilst maximising solar self-consumption.
            </p>
            <p>
              <span className="text-white font-medium">V2L - Vehicle-to-Load:</span> Provides AC power output directly from the vehicle, typically via an outlet in the vehicle or a portable adapter. Useful for tools, camping, and emergency power. Built into some vehicles like Hyundai Ioniq 5 and Ford F-150 Lightning, typically offering 2-3 kW output capacity.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Grid Services and Revenue Streams</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              EVs can provide valuable services to the electricity grid, generating revenue for vehicle owners whilst helping to balance supply and demand across the network.
            </p>
            <p>
              <span className="text-white font-medium">Frequency Response:</span> The grid frequency must remain close to 50Hz. EVs can rapidly inject or absorb power to help maintain frequency stability. Dynamic Containment provides sub-second response to frequency deviations. Payments are based on availability and energy delivered.
            </p>
            <p>
              <span className="text-white font-medium">Peak Demand Reduction:</span> Reducing grid demand during peak periods (typically 4-7pm) eases network constraints. EVs can defer or pause charging during peak periods, export stored energy during high-demand periods, and participate in demand turn-up/turn-down programmes.
            </p>
            <p>
              <span className="text-white font-medium">Arbitrage Opportunities:</span> Buying electricity when cheap and selling when expensive creates arbitrage value. Charge during overnight off-peak rates (5-10p/kWh), export during peak periods (15-30p/kWh). This requires time-of-use tariff and export agreement, automated by V2G platform algorithms.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Smart Charging Implementation</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Smart charging optimises when and how vehicles charge, balancing user needs, grid constraints, and cost considerations through automated scheduling and power management.
            </p>
            <p>
              <span className="text-white font-medium">UK Regulatory Requirements:</span> The Electric Vehicles (Smart Charge Points) Regulations 2021 require private charge points to include off-peak default (8am-11pm charging disabled by default), demand response capability, user override option, randomised delay to prevent simultaneous charging spikes, and accurate metering.
            </p>
            <p>
              <span className="text-white font-medium">Scheduling Strategies:</span> Time-of-use optimisation automatically schedules charging for cheapest periods. Solar matching charges when solar generation exceeds home load. Target SoC ensures vehicle is ready by departure time. Grid response adjusts charging based on external signals.
            </p>
            <p>
              <span className="text-white font-medium">Communication Standards:</span> OCPP handles charger-to-backend communication. OpenADR enables demand response signalling. ISO 15118 manages vehicle-charger communication. OSCP (Open Smart Charging Protocol) provides load management coordination.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">V2G Installation Requirements</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Installing V2G systems requires consideration of electrical infrastructure, regulatory compliance, and vehicle compatibility beyond standard EV charging requirements.
            </p>
            <p>
              <span className="text-white font-medium">Electrical Requirements:</span> A bidirectional inverter with G98/G99 compliance is essential. Anti-islanding protection ensures grid safety. Export metering may require smart meter upgrade. Appropriate circuit protection for bidirectional power flow and earth fault monitoring for DC systems are required.
            </p>
            <p>
              <span className="text-white font-medium">Regulatory Compliance:</span> DNO notification is required for any export capability. G98 applies to systems up to 16A per phase. G99 is required for larger systems with full application. An export tariff agreement with electricity supplier and grid services contract with aggregator or ESO are needed.
            </p>
            <p>
              <span className="text-white font-medium">Vehicle Compatibility:</span> V2G requires vehicle support - not all EVs are capable. CHAdeMO vehicles include Nissan Leaf and Mitsubishi Outlander PHEV. CCS with V2G is available on growing list including some BMW and Hyundai models. Always check vehicle specification, software version, and confirm manufacturer warranty covers V2G operation.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Renewable Energy Integration</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              EVs and smart/bidirectional charging play a key role in maximising renewable energy utilisation, both at individual property level and across the wider grid.
            </p>
            <p>
              <span className="text-white font-medium">Solar PV Integration:</span> Smart chargers can maximise solar self-consumption through CT clamp monitoring of solar generation and home load, automatic power adjustment to match surplus generation, minimum power thresholds for efficient charging, and integration with solar inverter for coordinated control.
            </p>
            <p>
              <span className="text-white font-medium">Grid-Scale Renewable Support:</span> EVs help accommodate variable renewable generation at grid scale through demand shifting (charge when wind/solar generation is high), frequency support (balance second-by-second fluctuations), curtailment reduction (absorb excess renewable generation), and storage capacity (fleet batteries as distributed storage).
            </p>
            <p>
              <span className="text-white font-medium">Future Outlook:</span> With millions of EVs expected in the UK by 2030, the combined battery capacity represents substantial flexible storage. Smart and bidirectional charging will be essential for integrating this demand with renewable generation, potentially providing significant grid balancing capacity.
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
              <span className="text-white font-medium">Customer conversations:</span> Focus on practical benefits - reduced bills through smart charging, potential revenue from grid services, backup power capability. Be realistic about current limitations such as vehicle compatibility and charger availability.
            </p>
            <p>
              <span className="text-white font-medium">Installation considerations:</span> V2G installations are more complex than standard EV charging. Ensure familiarity with G98/G99 requirements, coordinate with DNO early, and verify vehicle compatibility before committing to V2G-specific equipment.
            </p>
            <p>
              <span className="text-white font-medium">Future-proofing:</span> Even where V2G is not immediately planned, install infrastructure that can support future upgrades - appropriate cable sizes, smart metering capability, and solar integration ready.
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
          title="V2G and Smart Charging Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/renewable-energy-module-7-section-1">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section5;
