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
      "Earnings vary based on vehicle availability, battery capacity, and services provided. Current UK trials show potential earnings of £300-£700 per year for domestic V2G, with higher returns possible for commercial fleet participation. As the market develops, revenue streams may increase.",
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
    question: "What happens if I need my car but it is been discharged by V2G?",
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
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to=".."
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Link>
          <span className="text-sm text-white">Module 6 • Section 5</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow/10 px-4 py-1.5 text-sm font-medium text-elec-yellow">
              <Zap className="h-4 w-4" />
              EV Charging Infrastructure
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              V2G and Smart Charging
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Bidirectional charging technology and intelligent charging management for grid integration.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Vehicle-to-Grid</h3>
              <p className="text-sm text-white">
                V2G technology enables EVs to export stored energy back to the grid, providing valuable services like frequency response and peak demand reduction.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Smart Charging</h3>
              <p className="text-sm text-white">
                Intelligent charging management optimises when vehicles charge based on electricity prices, grid demand, and renewable availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Outcomes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Understand V2G, V2H, and V2L technology differences",
                "Explain grid services that EVs can provide",
                "Describe smart charging communication protocols",
                "Identify regulatory requirements for bidirectional charging",
                "Apply solar and tariff integration strategies",
                "Assess V2G business cases and deployment considerations",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-elec-yellow" />
                  <span className="text-sm text-white">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section 01 */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                01
              </span>
              <h2 className="text-2xl font-bold text-white">Bidirectional Charging Technologies</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Bidirectional charging transforms EVs from passive loads into active energy assets. Several related technologies enable different use cases for exporting stored battery energy.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">V2G - Vehicle-to-Grid</h4>
                <p className="mb-2">
                  Exports power from the vehicle battery to the public electricity grid. Enables participation in grid balancing services and wholesale energy markets.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Requires G98/G99 compliant inverter and DNO notification</li>
                  <li>Charger must synchronise with grid frequency and voltage</li>
                  <li>Provides revenue through grid services contracts</li>
                  <li>Currently limited vehicle and charger compatibility</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">V2H - Vehicle-to-Home</h4>
                <p className="mb-2">
                  Powers the home from the vehicle battery without exporting to the grid. Can operate during outages as backup power if appropriately configured.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Simpler regulatory requirements than V2G</li>
                  <li>Reduces peak demand and grid import</li>
                  <li>Provides backup power capability</li>
                  <li>Maximises solar self-consumption</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">V2L - Vehicle-to-Load</h4>
                <p className="mb-2">
                  Provides AC power output directly from the vehicle, typically via an outlet in the vehicle or a portable adapter. Useful for tools, camping, and emergency power.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Built into some vehicles (Hyundai Ioniq 5, Ford F-150 Lightning)</li>
                  <li>Typically 2-3 kW output capacity</li>
                  <li>No special installation required</li>
                  <li>Immediate availability on compatible vehicles</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 02 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                02
              </span>
              <h2 className="text-2xl font-bold text-white">Grid Services and Revenue Streams</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                EVs can provide valuable services to the electricity grid, generating revenue for vehicle owners whilst helping to balance supply and demand across the network.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Frequency Response</h4>
                <p className="mb-2">
                  The grid frequency must remain close to 50Hz. EVs can rapidly inject or absorb power to help maintain frequency stability:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li><strong>Dynamic Containment:</strong> Sub-second response to frequency deviations</li>
                  <li><strong>Dynamic Moderation:</strong> Slower response for sustained imbalances</li>
                  <li><strong>Dynamic Regulation:</strong> Continuous adjustment to track setpoints</li>
                  <li>Payments based on availability and energy delivered</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Peak Demand Reduction</h4>
                <p className="mb-2">
                  Reducing grid demand during peak periods (typically 4-7pm) eases network constraints and reduces expensive peak generation:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Defer or pause charging during peak periods</li>
                  <li>Export stored energy during high-demand periods</li>
                  <li>Participate in demand turn-up/turn-down programmes</li>
                  <li>Revenue from avoided peak pricing and incentive payments</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Arbitrage Opportunities</h4>
                <p className="mb-2">
                  Buying electricity when cheap and selling when expensive creates arbitrage value:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Charge during overnight off-peak rates (5-10p/kWh)</li>
                  <li>Export during peak periods (15-30p/kWh)</li>
                  <li>Requires time-of-use tariff and export agreement</li>
                  <li>Automated by V2G platform algorithms</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 03 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                03
              </span>
              <h2 className="text-2xl font-bold text-white">Smart Charging Implementation</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Smart charging optimises when and how vehicles charge, balancing user needs, grid constraints, and cost considerations through automated scheduling and power management.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Smart Charge Point Requirements</h4>
                <p className="mb-2">
                  UK regulations require private charge points to include:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Off-peak default: 8am-11pm charging disabled by default</li>
                  <li>Demand response: Ability to respond to grid signals</li>
                  <li>User override: Owners can charge immediately if needed</li>
                  <li>Randomised delay: Prevents simultaneous charging spikes</li>
                  <li>Metering: Accurate energy measurement</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Scheduling Strategies</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Time-of-use optimisation:</strong> Automatic scheduling for cheapest periods</li>
                  <li><strong>Solar matching:</strong> Charge when solar generation exceeds home load</li>
                  <li><strong>Target SoC:</strong> Ensure vehicle ready by departure time</li>
                  <li><strong>Grid response:</strong> Adjust based on external signals</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Communication Standards</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>OCPP:</strong> Charger-to-backend communication</li>
                  <li><strong>OpenADR:</strong> Demand response signalling</li>
                  <li><strong>ISO 15118:</strong> Vehicle-charger communication</li>
                  <li><strong>OSCP:</strong> Open Smart Charging Protocol for load management</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 04 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                04
              </span>
              <h2 className="text-2xl font-bold text-white">V2G Installation Requirements</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Installing V2G systems requires consideration of electrical infrastructure, regulatory compliance, and vehicle compatibility beyond standard EV charging requirements.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Electrical Requirements</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Bidirectional inverter with G98/G99 compliance</li>
                  <li>Anti-islanding protection for grid safety</li>
                  <li>Export metering (may require smart meter upgrade)</li>
                  <li>Appropriate circuit protection for bidirectional power flow</li>
                  <li>Earth fault monitoring for DC systems</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Regulatory Compliance</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>DNO notification:</strong> Required for any export capability</li>
                  <li><strong>G98:</strong> Applies to systems up to 16A per phase</li>
                  <li><strong>G99:</strong> Required for larger systems (full application)</li>
                  <li><strong>Export tariff:</strong> Agreement with electricity supplier</li>
                  <li><strong>Grid services:</strong> Contract with aggregator or direct with ESO</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Vehicle Compatibility</h4>
                <p className="mb-2">
                  V2G requires vehicle support - not all EVs are V2G-capable:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li><strong>CHAdeMO:</strong> Nissan Leaf, Mitsubishi Outlander PHEV</li>
                  <li><strong>CCS with V2G:</strong> Growing list including some BMW, Hyundai models</li>
                  <li>Check vehicle specification and software version</li>
                  <li>Confirm manufacturer warranty covers V2G operation</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Section 05 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                05
              </span>
              <h2 className="text-2xl font-bold text-white">Renewable Energy Integration</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                EVs and smart/bidirectional charging play a key role in maximising renewable energy utilisation, both at individual property level and across the wider grid.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Solar PV Integration</h4>
                <p className="mb-2">
                  Smart chargers can maximise solar self-consumption:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>CT clamp monitoring of solar generation and home load</li>
                  <li>Automatic power adjustment to match surplus generation</li>
                  <li>Minimum power thresholds for efficient charging</li>
                  <li>Override options for urgent charging needs</li>
                  <li>Integration with solar inverter for coordinated control</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Grid-Scale Renewable Support</h4>
                <p className="mb-2">
                  EVs help accommodate variable renewable generation at grid scale:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li><strong>Demand shifting:</strong> Charge when wind/solar generation is high</li>
                  <li><strong>Frequency support:</strong> Balance second-by-second fluctuations</li>
                  <li><strong>Curtailment reduction:</strong> Absorb excess renewable generation</li>
                  <li><strong>Storage capacity:</strong> Fleet batteries as distributed storage</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Future Outlook</h4>
                <p>
                  With millions of EVs expected in the UK by 2030, the combined battery capacity represents substantial flexible storage. Smart and bidirectional charging will be essential for integrating this demand with renewable generation, potentially providing significant grid balancing capacity and enabling higher renewable penetration without corresponding grid reinforcement.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12 mt-12">
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/5 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Practical Guidance</h2>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Customer Conversations</h4>
                  <p className="mt-1 text-sm">
                    When discussing V2G with customers, focus on practical benefits: reduced bills through smart charging, potential revenue from grid services, backup power capability. Be realistic about current limitations - vehicle compatibility and charger availability are still developing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Installation Considerations</h4>
                  <p className="mt-1 text-sm">
                    V2G installations are more complex than standard EV charging. Ensure familiarity with G98/G99 requirements, coordinate with DNO early, and verify vehicle compatibility before committing to V2G-specific equipment.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Future-Proofing</h4>
                  <p className="mt-1 text-sm">
                    Even where V2G is not immediately planned, install infrastructure that can support future upgrades - appropriate cable sizes, smart metering capability, and solar integration ready. The market is evolving rapidly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-elec-yellow">{faq.question}</h3>
                  <p className="text-sm text-white">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="V2G and Smart Charging Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-6/section-4">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-7/section-1">
              <Button className="w-full gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 sm:w-auto">
                Next Module
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section5;
