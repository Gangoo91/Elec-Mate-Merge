import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Carbon Fundamentals - HNC Module 6 Section 4.1";
const DESCRIPTION = "Master carbon accounting fundamentals for building services: GHG Protocol, Scope 1/2/3 emissions, emission factors, carbon intensity, CO2e calculations, and reporting frameworks for electrical installations.";

const quickCheckQuestions = [
  {
    id: "ghg-protocol",
    question: "What is the primary purpose of the GHG Protocol?",
    options: ["To regulate electricity prices", "To provide a standardised framework for measuring and reporting greenhouse gas emissions", "To design HVAC systems", "To calculate electrical load requirements"],
    correctIndex: 1,
    explanation: "The GHG Protocol provides a standardised framework for organisations to measure, manage, and report their greenhouse gas emissions. It is the most widely used international accounting standard for carbon emissions."
  },
  {
    id: "scope-2-definition",
    question: "Scope 2 emissions in the GHG Protocol refer to:",
    options: ["Direct emissions from owned sources", "Indirect emissions from purchased electricity, heat, and steam", "All supply chain emissions", "Emissions from employee commuting"],
    correctIndex: 1,
    explanation: "Scope 2 covers indirect emissions from the generation of purchased electricity, steam, heating, and cooling consumed by the reporting organisation. For buildings, this is typically the largest emission source."
  },
  {
    id: "co2e-meaning",
    question: "What does CO2e (carbon dioxide equivalent) represent?",
    options: ["The actual mass of CO2 emitted", "A metric converting all GHGs to equivalent CO2 impact based on global warming potential", "The cost of carbon offsets", "Electricity consumption in kilowatt-hours"],
    correctIndex: 1,
    explanation: "CO2e converts all greenhouse gases to their equivalent impact in terms of carbon dioxide, using their global warming potential (GWP). This allows different gases like methane and nitrous oxide to be compared on a common scale."
  },
  {
    id: "emission-factor-unit",
    question: "What is the typical unit for UK grid electricity emission factors?",
    options: ["kW/CO2", "kgCO2e/kWh", "tonnes/MW", "CO2/year"],
    correctIndex: 1,
    explanation: "UK grid emission factors are expressed in kgCO2e/kWh (kilograms of carbon dioxide equivalent per kilowatt-hour). This allows direct calculation of emissions by multiplying energy consumption by the emission factor."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which organisation publishes the most widely used greenhouse gas accounting standards?",
    options: [
      "UK Government BEIS",
      "World Resources Institute and WBCSD (GHG Protocol)",
      "International Energy Agency",
      "Carbon Trust"
    ],
    correctAnswer: 1,
    explanation: "The GHG Protocol, developed by the World Resources Institute and World Business Council for Sustainable Development, is the most widely used international accounting standard for greenhouse gas emissions."
  },
  {
    id: 2,
    question: "A gas boiler in an office building produces direct combustion emissions. Which scope category applies?",
    options: ["Scope 1", "Scope 2", "Scope 3", "Scope 0"],
    correctAnswer: 0,
    explanation: "Scope 1 covers direct emissions from sources owned or controlled by the organisation, including combustion of fuels in stationary equipment like boilers and furnaces."
  },
  {
    id: 3,
    question: "An office building consumes 500,000 kWh of electricity annually. Using an emission factor of 0.207 kgCO2e/kWh, what are the Scope 2 emissions?",
    options: [
      "103,500 kgCO2e (103.5 tCO2e)",
      "207,000 kgCO2e (207 tCO2e)",
      "2,415,459 kgCO2e",
      "50,000 kgCO2e"
    ],
    correctAnswer: 0,
    explanation: "Emissions = Consumption × Emission Factor = 500,000 kWh × 0.207 kgCO2e/kWh = 103,500 kgCO2e or 103.5 tonnes CO2e."
  },
  {
    id: 4,
    question: "Which of the following is NOT a Scope 3 emission category?",
    options: [
      "Business travel by employees",
      "Purchased goods and services",
      "Electricity consumed in owned buildings",
      "Waste generated in operations"
    ],
    correctAnswer: 2,
    explanation: "Electricity consumed in owned buildings is a Scope 2 emission (indirect from purchased energy). Scope 3 covers all other indirect emissions in the value chain including business travel, purchased goods, and waste."
  },
  {
    id: 5,
    question: "The UK grid carbon intensity has been decreasing primarily due to:",
    options: [
      "Increased coal generation",
      "Growth in renewable energy and phase-out of coal",
      "Reduced electricity demand",
      "Nuclear plant closures"
    ],
    correctAnswer: 1,
    explanation: "UK grid carbon intensity has fallen dramatically due to the growth of renewable energy (especially offshore wind) and the phase-out of coal-fired power stations. The UK grid is now one of the lowest carbon in Europe."
  },
  {
    id: 6,
    question: "What is the global warming potential (GWP) of methane (CH4) over 100 years?",
    options: [
      "1",
      "Approximately 28",
      "Approximately 265",
      "Approximately 1,000"
    ],
    correctAnswer: 1,
    explanation: "Methane has a GWP of approximately 28 over 100 years, meaning 1 tonne of methane has the same warming effect as 28 tonnes of CO2. This is why methane leaks from gas systems are significant."
  },
  {
    id: 7,
    question: "For a building with both gas heating and electric cooling, the gas consumption would be reported under:",
    options: [
      "Scope 1 only",
      "Scope 2 only",
      "Scope 3 only",
      "Both Scope 1 and Scope 2"
    ],
    correctAnswer: 0,
    explanation: "Gas combustion in on-site boilers is a direct emission (Scope 1). The electricity for cooling would be Scope 2. Gas consumption is always Scope 1 when burned on-site, regardless of the end use."
  },
  {
    id: 8,
    question: "The 'location-based' method for Scope 2 accounting uses:",
    options: [
      "Supplier-specific emission factors",
      "Grid average emission factors for the region",
      "Renewable energy certificates",
      "Actual measured emissions at the power station"
    ],
    correctAnswer: 1,
    explanation: "Location-based Scope 2 accounting uses grid average emission factors for the geographic location where electricity is consumed, reflecting the average emissions intensity of the local grid."
  },
  {
    id: 9,
    question: "Which reporting framework requires disclosure of climate-related financial risks?",
    options: [
      "GHG Protocol",
      "SECR",
      "TCFD",
      "ISO 14064"
    ],
    correctAnswer: 2,
    explanation: "The Task Force on Climate-related Financial Disclosures (TCFD) framework requires organisations to disclose climate-related risks and opportunities, including governance, strategy, risk management, and metrics."
  },
  {
    id: 10,
    question: "A building's embodied carbon refers to emissions from:",
    options: [
      "Day-to-day energy consumption",
      "Manufacturing, transport, and installation of building materials and systems",
      "Employee commuting",
      "Waste disposal only"
    ],
    correctAnswer: 1,
    explanation: "Embodied carbon includes all emissions associated with manufacturing, transporting, and installing building materials and systems. For electrical installations, this includes cables, switchgear, and equipment."
  },
  {
    id: 11,
    question: "Under SECR, which organisations must report energy and carbon information?",
    options: [
      "All UK businesses",
      "Large UK companies and LLPs meeting size thresholds",
      "Only public sector organisations",
      "Only energy-intensive industries"
    ],
    correctAnswer: 1,
    explanation: "Streamlined Energy and Carbon Reporting (SECR) applies to large UK companies and LLPs meeting certain size thresholds (turnover, employees, or balance sheet). It requires disclosure of energy use and emissions in annual reports."
  },
  {
    id: 12,
    question: "If the UK grid emission factor is 0.207 kgCO2e/kWh and a client switches to a 100% renewable tariff with REGOs, their Scope 2 market-based emissions become:",
    options: [
      "The same (0.207 kgCO2e/kWh)",
      "Zero or near-zero",
      "Double the grid factor",
      "Half the grid factor"
    ],
    correctAnswer: 1,
    explanation: "Under market-based Scope 2 accounting, electricity backed by Renewable Energy Guarantees of Origin (REGOs) can be reported as zero or near-zero emissions, as the renewable attributes are contractually claimed."
  }
];

const faqs = [
  {
    question: "What's the difference between location-based and market-based Scope 2 reporting?",
    answer: "Location-based reporting uses grid average emission factors for your geographic area, reflecting the actual emissions from the local grid mix. Market-based reporting uses supplier-specific factors or contractual instruments like REGOs, allowing organisations to claim lower emissions if they purchase renewable electricity. The GHG Protocol requires organisations to report both methods for transparency."
  },
  {
    question: "Why are Scope 3 emissions often the largest but hardest to report?",
    answer: "Scope 3 covers the entire value chain - from purchased materials and services to product use and end-of-life disposal. For most organisations, Scope 3 represents 70-90% of total emissions. However, data collection is challenging as it relies on suppliers and customers. Many organisations start with the most significant categories (e.g., purchased goods, business travel) before expanding coverage."
  },
  {
    question: "How do emission factors change over time, and why does this matter?",
    answer: "Emission factors are updated annually to reflect changes in the energy mix. The UK grid factor has fallen from 0.5 kgCO2e/kWh in 2010 to around 0.2 kgCO2e/kWh today due to renewable growth. Using current factors ensures accurate reporting and shows the benefit of electrification as the grid decarbonises. Always use the factor corresponding to the reporting year."
  },
  {
    question: "How should electrical contractors account for their own carbon footprint?",
    answer: "Electrical contractors should account for: Scope 1 - company vehicle fuel, generator fuel on sites; Scope 2 - office and depot electricity; Scope 3 - materials purchased (cables, equipment), waste disposal, employee commuting, subcontractor activities. Many clients now require carbon reporting in tenders, making this commercially important."
  },
  {
    question: "What is the relationship between carbon intensity and time of use?",
    answer: "Grid carbon intensity varies throughout the day based on the generation mix. It's typically lowest during sunny/windy periods when renewables dominate, and highest during evening peaks when gas plants ramp up. Smart building controls can shift flexible loads (EV charging, thermal storage) to low-carbon periods, reducing Scope 2 emissions without changing total consumption."
  },
  {
    question: "How do REGOs (Renewable Energy Guarantees of Origin) work?",
    answer: "REGOs are certificates issued for each MWh of renewable electricity generated. Energy suppliers can purchase REGOs to offer 'green' tariffs, allowing customers to claim the renewable attributes. Under market-based Scope 2 reporting, electricity backed by REGOs can be reported as zero emissions. However, the physical electricity consumed still comes from the grid mix - REGOs represent a contractual claim, not physical delivery of renewable electrons."
  }
];

const HNCModule6Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Carbon Fundamentals
          </h1>
          <p className="text-white/80">
            Carbon accounting, GHG Protocol, Scope 1/2/3 emissions, emission factors, and reporting frameworks for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>GHG Protocol:</strong> International standard for carbon accounting</li>
              <li className="pl-1"><strong>Three scopes:</strong> Direct (1), energy (2), value chain (3)</li>
              <li className="pl-1"><strong>CO2e:</strong> Common unit for all greenhouse gases</li>
              <li className="pl-1"><strong>Emission factors:</strong> Convert energy to carbon (kgCO2e/kWh)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Scope 2:</strong> Usually largest for buildings (electricity)</li>
              <li className="pl-1"><strong>UK grid factor:</strong> ~0.207 kgCO2e/kWh (2023)</li>
              <li className="pl-1"><strong>SECR:</strong> Mandatory reporting for large companies</li>
              <li className="pl-1"><strong>Embodied carbon:</strong> Materials and equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the GHG Protocol framework to building carbon accounting",
              "Distinguish between Scope 1, 2, and 3 emissions with examples",
              "Calculate building carbon emissions using emission factors",
              "Understand CO2e and global warming potential concepts",
              "Navigate UK reporting requirements (SECR, TCFD)",
              "Analyse grid carbon intensity and its implications for design"
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

        {/* Section 1: GHG Protocol and Carbon Accounting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            GHG Protocol and Carbon Accounting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Greenhouse Gas Protocol provides the world's most widely used standards for measuring
              and reporting greenhouse gas emissions. Developed by the World Resources Institute and
              World Business Council for Sustainable Development, it forms the foundation of corporate
              carbon accounting and most regulatory frameworks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key GHG Protocol Principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Relevance:</strong> Information must serve decision-making needs of users</li>
                <li className="pl-1"><strong>Completeness:</strong> Account for all emission sources within the boundary</li>
                <li className="pl-1"><strong>Consistency:</strong> Use consistent methodologies for meaningful comparison</li>
                <li className="pl-1"><strong>Transparency:</strong> Disclose assumptions, methods, and data sources</li>
                <li className="pl-1"><strong>Accuracy:</strong> Reduce uncertainties as far as practicable</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Three Emission Scopes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Scope 1</td>
                      <td className="border border-white/10 px-3 py-2">Direct emissions from owned/controlled sources</td>
                      <td className="border border-white/10 px-3 py-2">Gas boilers, backup generators, company vehicles, refrigerant leaks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Scope 2</td>
                      <td className="border border-white/10 px-3 py-2">Indirect emissions from purchased energy</td>
                      <td className="border border-white/10 px-3 py-2">Grid electricity, purchased heat/steam, district cooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Scope 3</td>
                      <td className="border border-white/10 px-3 py-2">All other indirect emissions in value chain</td>
                      <td className="border border-white/10 px-3 py-2">Materials, construction, waste, commuting, water supply</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> For most commercial buildings, Scope 2 (electricity) represents 60-80% of operational emissions, making electrical efficiency a primary decarbonisation lever.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Scope Emissions in Detail */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Scope Emissions in Detail
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the boundaries and calculation methods for each scope is essential for
              accurate carbon accounting. Each scope requires different data sources, emission
              factors, and reporting approaches.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scope 1 Sources</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Natural gas combustion</li>
                  <li className="pl-1">Oil/diesel combustion</li>
                  <li className="pl-1">Company vehicle fleet</li>
                  <li className="pl-1">Refrigerant losses (F-gases)</li>
                  <li className="pl-1">Backup generator fuel</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scope 2 Sources</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Grid electricity</li>
                  <li className="pl-1">Purchased heat</li>
                  <li className="pl-1">Purchased steam</li>
                  <li className="pl-1">District cooling</li>
                  <li className="pl-1">Two methods: location/market</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scope 3 Categories</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Purchased goods/services</li>
                  <li className="pl-1">Business travel</li>
                  <li className="pl-1">Employee commuting</li>
                  <li className="pl-1">Waste disposal</li>
                  <li className="pl-1">Upstream/downstream transport</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scope 2 Accounting Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Emission Factor Used</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When to Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Location-based</td>
                      <td className="border border-white/10 px-3 py-2">Grid average for location</td>
                      <td className="border border-white/10 px-3 py-2">Reflects actual grid emissions; required for regulatory reporting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Market-based</td>
                      <td className="border border-white/10 px-3 py-2">Supplier-specific or contractual</td>
                      <td className="border border-white/10 px-3 py-2">Reflects purchasing decisions; allows renewable tariff claims</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Scope 3 Categories (GHG Protocol)</p>
              <div className="text-sm space-y-1">
                <p><strong>Upstream:</strong> 1. Purchased goods/services, 2. Capital goods, 3. Fuel/energy activities, 4. Transport (upstream), 5. Waste, 6. Business travel, 7. Commuting, 8. Leased assets (upstream)</p>
                <p><strong>Downstream:</strong> 9. Transport (downstream), 10. Processing, 11. Product use, 12. End-of-life, 13. Leased assets (downstream), 14. Franchises, 15. Investments</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Reporting requirement:</strong> The GHG Protocol requires dual reporting of both location-based and market-based Scope 2 emissions for transparency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: CO2e and Emission Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CO2e and Emission Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Carbon dioxide equivalent (CO2e) is the universal metric for comparing different
              greenhouse gases. Emission factors convert activity data (energy consumption, fuel
              use) into carbon emissions, enabling organisations to calculate their carbon footprint.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Global Warming Potential (GWP-100)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Gas</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">GWP-100</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carbon dioxide</td>
                      <td className="border border-white/10 px-3 py-2">CO2</td>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Combustion, grid electricity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Methane</td>
                      <td className="border border-white/10 px-3 py-2">CH4</td>
                      <td className="border border-white/10 px-3 py-2">28</td>
                      <td className="border border-white/10 px-3 py-2">Gas leaks, incomplete combustion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Nitrous oxide</td>
                      <td className="border border-white/10 px-3 py-2">N2O</td>
                      <td className="border border-white/10 px-3 py-2">265</td>
                      <td className="border border-white/10 px-3 py-2">Combustion byproduct</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HFCs (refrigerants)</td>
                      <td className="border border-white/10 px-3 py-2">Various</td>
                      <td className="border border-white/10 px-3 py-2">140-11,700</td>
                      <td className="border border-white/10 px-3 py-2">HVAC refrigerant leaks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SF6</td>
                      <td className="border border-white/10 px-3 py-2">SF6</td>
                      <td className="border border-white/10 px-3 py-2">23,500</td>
                      <td className="border border-white/10 px-3 py-2">HV switchgear insulation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Government Conversion Factors (2023)</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Electricity</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>Grid electricity: <strong>0.207 kgCO2e/kWh</strong></li>
                    <li>Transmission losses: 0.018 kgCO2e/kWh</li>
                    <li>Well-to-tank: 0.024 kgCO2e/kWh</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Fuels</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>Natural gas: <strong>0.183 kgCO2e/kWh</strong></li>
                    <li>Gas oil (diesel): 0.256 kgCO2e/kWh</li>
                    <li>LPG: 0.214 kgCO2e/kWh</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Carbon Calculation Formula</p>
              <div className="bg-black/30 p-4 rounded font-mono text-sm">
                <p className="text-green-400">Carbon Emissions = Activity Data × Emission Factor</p>
                <p className="mt-2 text-white/80">Where:</p>
                <p className="text-white/80">- Activity data = energy consumption (kWh), fuel use (litres), etc.</p>
                <p className="text-white/80">- Emission factor = kgCO2e per unit of activity</p>
                <p className="mt-2 text-white/80">Example:</p>
                <p className="text-white">1,000,000 kWh electricity × 0.207 kgCO2e/kWh = 207,000 kgCO2e = <strong>207 tCO2e</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> UK Government conversion factors are published annually by DESNZ (formerly BEIS) and should be used for the reporting year in question. Historical comparisons should use year-appropriate factors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Grid Carbon Intensity and Reporting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Grid Carbon Intensity and Reporting Frameworks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Grid carbon intensity varies by time and location, reflecting the generation mix.
              Understanding these variations enables optimised building operation and accurate
              carbon reporting under various regulatory frameworks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Grid Carbon Intensity Trends</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Year</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Grid Factor (kgCO2e/kWh)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2010</td>
                      <td className="border border-white/10 px-3 py-2">0.500</td>
                      <td className="border border-white/10 px-3 py-2">Coal-dominated generation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2015</td>
                      <td className="border border-white/10 px-3 py-2">0.412</td>
                      <td className="border border-white/10 px-3 py-2">Gas replacing coal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2020</td>
                      <td className="border border-white/10 px-3 py-2">0.233</td>
                      <td className="border border-white/10 px-3 py-2">Renewable growth, coal phase-out</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2023</td>
                      <td className="border border-white/10 px-3 py-2">0.207</td>
                      <td className="border border-white/10 px-3 py-2">Offshore wind expansion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2035 (target)</td>
                      <td className="border border-white/10 px-3 py-2">~0.050</td>
                      <td className="border border-white/10 px-3 py-2">Decarbonised grid target</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Real-Time Carbon Intensity</p>
              <p className="text-sm text-white/90 mb-2">
                Grid carbon intensity varies throughout the day, typically:
              </p>
              <ul className="text-sm text-white/80 space-y-1">
                <li><strong>Lowest:</strong> Sunny/windy afternoons (solar + wind peak) - can drop below 0.100 kgCO2e/kWh</li>
                <li><strong>Highest:</strong> Winter evening peaks (5-7pm) when gas plants run - can exceed 0.300 kgCO2e/kWh</li>
                <li><strong>Implication:</strong> Shifting flexible loads (EV charging, thermal storage) to low-carbon periods reduces emissions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Carbon Reporting Frameworks</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Framework</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applicability</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SECR</td>
                      <td className="border border-white/10 px-3 py-2">Large UK companies/LLPs</td>
                      <td className="border border-white/10 px-3 py-2">Energy use, emissions, intensity ratio in annual report</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TCFD</td>
                      <td className="border border-white/10 px-3 py-2">Listed companies, large asset owners</td>
                      <td className="border border-white/10 px-3 py-2">Climate risk disclosure, scenario analysis</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ESOS</td>
                      <td className="border border-white/10 px-3 py-2">Large undertakings (250+ employees)</td>
                      <td className="border border-white/10 px-3 py-2">Energy audits every 4 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ISO 14064</td>
                      <td className="border border-white/10 px-3 py-2">Voluntary</td>
                      <td className="border border-white/10 px-3 py-2">GHG inventory, verification, project accounting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SBTi</td>
                      <td className="border border-white/10 px-3 py-2">Voluntary commitment</td>
                      <td className="border border-white/10 px-3 py-2">Science-based reduction targets (1.5°C pathway)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SECR Reporting Requirements</p>
              <div className="text-sm space-y-2">
                <p><strong>Applies to:</strong> UK companies meeting 2 of 3 criteria: turnover &gt;£36m, balance sheet &gt;£18m, &gt;250 employees</p>
                <p><strong>Must disclose:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1 text-white/80">
                  <li>UK energy use (electricity, gas, transport fuel) in kWh</li>
                  <li>Associated GHG emissions (Scope 1 and 2 minimum) in tCO2e</li>
                  <li>At least one intensity ratio (e.g., kgCO2e/m², tCO2e/£m turnover)</li>
                  <li>Methodology used and previous year comparison</li>
                  <li>Energy efficiency actions taken</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design implication:</strong> As the grid decarbonises, electrification of heating (heat pumps) becomes increasingly favourable compared to gas. A heat pump with COP of 3.0 using grid electricity already has lower carbon than a 90% efficient gas boiler at current grid factors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Building Annual Carbon Footprint</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate Scope 1 and 2 emissions for a 5,000 m² office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p>Annual electricity consumption: 450,000 kWh</p>
                <p>Annual gas consumption: 200,000 kWh</p>
                <p className="mt-2 text-white/60">Emission factors (2023):</p>
                <p>Electricity: 0.207 kgCO2e/kWh</p>
                <p>Natural gas: 0.183 kgCO2e/kWh</p>
                <p className="mt-2 text-white/60">Calculations:</p>
                <p><strong>Scope 1 (gas):</strong></p>
                <p>200,000 kWh × 0.183 kgCO2e/kWh = 36,600 kgCO2e = <span className="text-green-400">36.6 tCO2e</span></p>
                <p className="mt-2"><strong>Scope 2 (electricity):</strong></p>
                <p>450,000 kWh × 0.207 kgCO2e/kWh = 93,150 kgCO2e = <span className="text-green-400">93.2 tCO2e</span></p>
                <p className="mt-2"><strong>Total operational carbon:</strong> <span className="text-green-400">129.8 tCO2e/year</span></p>
                <p className="mt-2"><strong>Carbon intensity:</strong> 129,750 kgCO2e ÷ 5,000 m² = <span className="text-green-400">25.95 kgCO2e/m²/year</span></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Impact of Renewable Electricity Tariff</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare location-based vs market-based Scope 2 reporting.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Building electricity: 450,000 kWh/year</p>
                <p className="text-white/60">Tariff: 100% REGO-backed renewable electricity</p>
                <p className="mt-2"><strong>Location-based Scope 2:</strong></p>
                <p>450,000 × 0.207 = 93,150 kgCO2e = <span className="text-blue-400">93.2 tCO2e</span></p>
                <p className="text-white/60">(Uses grid average - reflects actual grid emissions)</p>
                <p className="mt-2"><strong>Market-based Scope 2:</strong></p>
                <p>450,000 × 0.000 = 0 kgCO2e = <span className="text-green-400">0 tCO2e</span></p>
                <p className="text-white/60">(REGO-backed renewable tariff - zero emission factor)</p>
                <p className="mt-2 text-yellow-400">Note: Both figures must be reported under GHG Protocol</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Heat Pump vs Gas Boiler Carbon Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare carbon emissions for 100,000 kWh heating demand.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Heating demand: 100,000 kWh/year</p>
                <p className="mt-2"><strong>Option A: Gas boiler (92% efficient)</strong></p>
                <p>Gas input: 100,000 ÷ 0.92 = 108,696 kWh</p>
                <p>Emissions: 108,696 × 0.183 = 19,891 kgCO2e = <span className="text-red-400">19.9 tCO2e</span></p>
                <p className="mt-2"><strong>Option B: Air source heat pump (COP 3.0)</strong></p>
                <p>Electricity input: 100,000 ÷ 3.0 = 33,333 kWh</p>
                <p>Emissions: 33,333 × 0.207 = 6,900 kgCO2e = <span className="text-green-400">6.9 tCO2e</span></p>
                <p className="mt-2 text-green-400">Heat pump saves: 65% carbon reduction</p>
                <p className="text-white/60 mt-1">As grid decarbonises, this advantage increases further</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Refrigerant Leak Emissions</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate Scope 1 emissions from HVAC refrigerant loss.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Chiller system refrigerant: R-410A</p>
                <p className="text-white/60">System charge: 50 kg</p>
                <p className="text-white/60">Annual leakage rate: 5% (typical)</p>
                <p className="text-white/60">R-410A GWP: 2,088</p>
                <p className="mt-2"><strong>Calculation:</strong></p>
                <p>Annual leakage: 50 kg × 5% = 2.5 kg</p>
                <p>CO2e emissions: 2.5 kg × 2,088 = 5,220 kgCO2e = <span className="text-orange-400">5.2 tCO2e</span></p>
                <p className="mt-2 text-white/60">This is often overlooked but can be significant!</p>
                <p className="text-white/60">Low-GWP alternatives (R-32, R-290) reduce this substantially</p>
              </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Carbon Accounting Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Collect 12 months of energy bills (electricity, gas, other fuels)</li>
                <li className="pl-1">Identify any on-site combustion sources (boilers, generators, vehicles)</li>
                <li className="pl-1">Record refrigerant types and any top-up quantities</li>
                <li className="pl-1">Obtain current year UK Government conversion factors</li>
                <li className="pl-1">Calculate Scope 1 (direct) and Scope 2 (electricity) separately</li>
                <li className="pl-1">Calculate both location-based and market-based Scope 2</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Emission Factors to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK grid electricity: <strong>~0.207 kgCO2e/kWh</strong> (2023)</li>
                <li className="pl-1">Natural gas: <strong>~0.183 kgCO2e/kWh</strong></li>
                <li className="pl-1">Grid electricity transmission losses: <strong>~0.018 kgCO2e/kWh</strong></li>
                <li className="pl-1">Methane GWP: <strong>28</strong> (100-year)</li>
                <li className="pl-1">Common refrigerant R-410A GWP: <strong>2,088</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using wrong year factors</strong> - always use factors for the reporting year</li>
                <li className="pl-1"><strong>Forgetting transmission losses</strong> - add these to electricity figures for full Scope 2</li>
                <li className="pl-1"><strong>Ignoring refrigerant leaks</strong> - high-GWP refrigerants can be a major Scope 1 source</li>
                <li className="pl-1"><strong>Mixing units</strong> - ensure kWh for energy, kgCO2e for emissions, convert to tonnes where appropriate</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Scope Definitions</p>
                <ul className="space-y-0.5">
                  <li>Scope 1: Direct emissions (combustion, vehicles)</li>
                  <li>Scope 2: Purchased energy (electricity, heat)</li>
                  <li>Scope 3: Value chain (materials, travel, waste)</li>
                  <li>CO2e: Universal metric using GWP values</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">UK Emission Factors (2023)</p>
                <ul className="space-y-0.5">
                  <li>Grid electricity: 0.207 kgCO2e/kWh</li>
                  <li>Natural gas: 0.183 kgCO2e/kWh</li>
                  <li>Diesel/gas oil: 0.256 kgCO2e/kWh</li>
                  <li>LPG: 0.214 kgCO2e/kWh</li>
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

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4-2">
              Next: Carbon Reduction Strategies
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section4_1;
