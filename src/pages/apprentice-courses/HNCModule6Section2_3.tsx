import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Biomass Systems - HNC Module 6 Section 2.3";
const DESCRIPTION = "Master biomass heating systems for building services: boiler types, fuel storage and handling, automatic feed systems, emissions control, flue requirements, ash management, and integration with heating systems.";

const quickCheckQuestions = [
  {
    id: "biomass-fuel-types",
    question: "Which biomass fuel type typically offers the most consistent combustion characteristics?",
    options: ["Logs", "Wood chips", "Wood pellets", "Miscanthus bales"],
    correctIndex: 2,
    explanation: "Wood pellets offer the most consistent combustion due to standardised moisture content (typically <10%), uniform size, and consistent calorific value. This enables precise automated control and higher combustion efficiency."
  },
  {
    id: "fuel-storage",
    question: "What is the primary reason biomass fuel stores must be kept dry?",
    options: ["To prevent pest infestation", "Moisture reduces calorific value and combustion efficiency", "To comply with fire regulations", "To prevent odour issues"],
    correctIndex: 1,
    explanation: "Moisture in biomass fuel significantly reduces its calorific value (energy content) and combustion efficiency. Energy is wasted evaporating water rather than producing heat, and wet fuel can cause incomplete combustion and increased emissions."
  },
  {
    id: "emissions-control",
    question: "What is the primary method of particulate emissions control in modern biomass boilers?",
    options: ["Wet scrubbers", "Electrostatic precipitators or cyclonic separators", "Catalytic converters", "Carbon filters"],
    correctIndex: 1,
    explanation: "Modern biomass boilers typically use electrostatic precipitators (ESP) or cyclonic/multicyclonic separators to remove particulate matter from flue gases. ESPs are highly effective, achieving >99% particulate removal."
  },
  {
    id: "buffer-vessel",
    question: "Why is a buffer vessel essential in most biomass heating systems?",
    options: ["To store hot water for domestic use", "To prevent boiler short-cycling and thermal shock", "To filter impurities from the system", "To increase system pressure"],
    correctIndex: 1,
    explanation: "Buffer vessels prevent short-cycling (frequent on/off operation) which reduces efficiency and increases emissions. They also protect against thermal shock during load changes and provide thermal mass for more stable operation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What moisture content is typically required for wood pellets to meet ENplus A1 quality standard?",
    options: [
      "Less than 5%",
      "Less than 10%",
      "Less than 15%",
      "Less than 20%"
    ],
    correctAnswer: 1,
    explanation: "ENplus A1 quality pellets must have moisture content below 10% (typically 8-10%). This ensures consistent combustion, high calorific value (minimum 4.6 kWh/kg), and reliable automatic feed system operation."
  },
  {
    id: 2,
    question: "Which type of biomass boiler is most suitable for small commercial applications requiring automated operation?",
    options: ["Log gasification boiler", "Pellet boiler with vacuum feed", "Batch-fed chip boiler", "Straw bale boiler"],
    correctAnswer: 1,
    explanation: "Pellet boilers with vacuum or auger feed systems offer fully automated operation ideal for small commercial applications. They provide precise modulation, automatic ignition, and minimal operator intervention."
  },
  {
    id: 3,
    question: "What is the typical storage volume required for wood pellets to provide one heating season for a 50kW system?",
    options: ["2-3 tonnes", "5-8 tonnes", "10-15 tonnes", "20-25 tonnes"],
    correctAnswer: 1,
    explanation: "A 50kW pellet boiler operating at average load typically requires 5-8 tonnes of pellets annually. Storage should accommodate at least one delivery (typically 3-6 tonnes) or ideally a full season's supply."
  },
  {
    id: 4,
    question: "What is the minimum recommended flue height above roof level for a biomass boiler installation?",
    options: [
      "0.5 metres",
      "1 metre above highest point within 10m",
      "2 metres above eaves",
      "3 metres above boiler room"
    ],
    correctAnswer: 1,
    explanation: "Flue terminals should be at least 1 metre above the highest point of any structure within 10 metres to ensure adequate dispersion of combustion products and prevent downdraught issues."
  },
  {
    id: 5,
    question: "What type of automatic feed system uses negative pressure to transport pellets?",
    options: [
      "Auger feed system",
      "Pneumatic vacuum system",
      "Gravity feed system",
      "Belt conveyor system"
    ],
    correctAnswer: 1,
    explanation: "Pneumatic vacuum systems use negative pressure to transport pellets through flexible pipes from the store to the boiler. They can handle longer distances (up to 25m) and multiple direction changes compared to auger systems."
  },
  {
    id: 6,
    question: "What is the primary purpose of a de-ashing system in a biomass boiler?",
    options: [
      "To improve combustion efficiency",
      "To automatically remove combustion residue from the grate",
      "To reduce flue gas temperatures",
      "To prevent fuel bridging"
    ],
    correctAnswer: 1,
    explanation: "Automatic de-ashing systems remove ash from the combustion grate and transfer it to external ash bins. This maintains airflow through the fuel bed, ensures consistent combustion, and reduces manual maintenance."
  },
  {
    id: 7,
    question: "What is the typical ash content of good quality wood pellets?",
    options: [
      "Less than 0.7%",
      "2-3%",
      "5-7%",
      "10-12%"
    ],
    correctAnswer: 0,
    explanation: "High-quality wood pellets (ENplus A1) have ash content below 0.7%. Lower ash content reduces de-ashing frequency, minimises maintenance, and indicates cleaner fuel with fewer impurities."
  },
  {
    id: 8,
    question: "Which regulation specifically governs emissions from medium combustion plants including biomass boilers?",
    options: [
      "Building Regulations Part L",
      "Medium Combustion Plant Directive (MCPD)",
      "Clean Air Act only",
      "BREEAM standards"
    ],
    correctAnswer: 1,
    explanation: "The Medium Combustion Plant Directive (MCPD), implemented in the UK as the Environmental Permitting Regulations, sets emission limits for plants 1-50MW thermal input, including NOx, SO2, and particulate matter."
  },
  {
    id: 9,
    question: "What is the recommended minimum buffer vessel size for a 100kW biomass boiler?",
    options: [
      "500 litres",
      "1,000-1,500 litres",
      "3,000-5,000 litres",
      "10,000 litres"
    ],
    correctAnswer: 1,
    explanation: "Buffer vessel sizing typically follows 10-20 litres per kW of boiler output. For a 100kW boiler, 1,000-2,000 litres is recommended to prevent short-cycling and provide adequate thermal storage for load variations."
  },
  {
    id: 10,
    question: "What safety device prevents fire spreading from the boiler back to the fuel store?",
    options: [
      "Pressure relief valve",
      "Drop tube or rotary valve with fire protection",
      "Expansion vessel",
      "Flow switch"
    ],
    correctAnswer: 1,
    explanation: "Drop tubes (creating an air gap) or rotary valves with thermal fuses prevent burn-back from the combustion chamber to the fuel store. These are essential safety features required by insurance and regulations."
  },
  {
    id: 11,
    question: "What is the typical calorific value of dry wood chips at 25% moisture content?",
    options: [
      "2.0 kWh/kg",
      "3.5 kWh/kg",
      "4.8 kWh/kg",
      "5.5 kWh/kg"
    ],
    correctAnswer: 1,
    explanation: "Wood chips at 25% moisture content have approximately 3.5 kWh/kg calorific value. This compares to 4.8 kWh/kg for pellets (<10% moisture) and reduces to about 2.5 kWh/kg at 40% moisture."
  },
  {
    id: 12,
    question: "Which thermal store configuration is most suitable for integrating biomass with solar thermal?",
    options: [
      "Single coil cylinder",
      "Buffer vessel only",
      "Multi-zone stratified thermal store",
      "Direct connection without storage"
    ],
    correctAnswer: 2,
    explanation: "Multi-zone stratified thermal stores allow different temperature zones for various heat sources and demands. Solar thermal feeds the lower zone, biomass the middle/upper zones, maximising efficiency of both systems."
  }
];

const faqs = [
  {
    question: "How do I size a biomass fuel store for a commercial installation?",
    answer: "Calculate annual fuel consumption based on heat demand and boiler efficiency (typically 85-92%). For pellets: annual heat demand (kWh) ÷ 4,800 (kWh/tonne) ÷ efficiency = tonnes required. Size storage for at least one delivery (3-6 tonnes for blown delivery) or ideally 50-100% of annual requirement. Consider access for delivery vehicles, store structural requirements for bulk material, and factor in a 15-20% contingency."
  },
  {
    question: "What maintenance schedule is required for biomass boilers?",
    answer: "Daily: Check fuel levels and system operation. Weekly: Empty ash bin (frequency depends on fuel quality and load). Monthly: Clean heat exchanger tubes, check combustion parameters, inspect seals. Annually: Full service including burner inspection, flue cleaning, safety device testing, and combustion analysis. Keep maintenance logs for warranty and RHI compliance if applicable."
  },
  {
    question: "Can biomass boilers operate in Smoke Control Areas?",
    answer: "Yes, but only if the appliance is DEFRA-exempt (listed on the DEFRA website) and uses authorised fuels. Most modern pellet boilers achieve exemption status. Wood chip and log boilers may not qualify due to higher emissions. Always verify exemption status before specifying equipment for Smoke Control Areas and ensure the specific fuel type is also approved."
  },
  {
    question: "How does biomass integrate with existing heating systems?",
    answer: "Biomass typically connects via a buffer vessel to the heating system primary circuit. The buffer vessel decouples the boiler from variable building loads, preventing short-cycling. Low-loss headers may be used for multiple circuits. Existing boilers can be retained as backup/peak load duty. Controls should prioritise biomass with fossil fuel backup only when required or during maintenance periods."
  },
  {
    question: "What are the key planning considerations for biomass installations?",
    answer: "Key considerations include: delivery vehicle access (articulated lorries for blown pellet delivery), noise from fuel delivery and plant operation, flue height and dispersion modelling for larger installations, fuel store location and fire separation requirements, visual impact of flue and buildings, and local air quality constraints. Pre-application consultation with the planning authority is recommended for installations over 400kW."
  },
  {
    question: "How do RHI requirements affect biomass system design?",
    answer: "Although the domestic RHI closed in 2022 and non-domestic RHI closed to new applications in 2021, existing accredited installations must maintain compliance. Requirements included: MCS certification for installations under 45kW, metering of heat output, use of sustainable fuel (typically requiring Biomass Suppliers List registration), annual fuel sustainability reporting, and maintenance records. Similar requirements may apply to successor schemes."
  }
];

const HNCModule6Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section2">
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
            <span>Module 6.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Biomass Systems
          </h1>
          <p className="text-white/80">
            Biomass boilers, fuel storage, handling systems, emissions control and integration with building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Biomass:</strong> Carbon-neutral renewable heat from organic material</li>
              <li className="pl-1"><strong>Fuel types:</strong> Pellets, chips, logs - varying automation levels</li>
              <li className="pl-1"><strong>Storage:</strong> Dry, accessible for delivery, fire-separated</li>
              <li className="pl-1"><strong>Integration:</strong> Buffer vessel essential, backup boiler typical</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Applications:</strong> District heating, commercial, industrial</li>
              <li className="pl-1"><strong>Sizing:</strong> Heat demand + diversity + buffer capacity</li>
              <li className="pl-1"><strong>Emissions:</strong> MCPD compliance, particulate control</li>
              <li className="pl-1"><strong>Maintenance:</strong> Regular ash removal, annual service</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare biomass boiler types and their applications",
              "Specify fuel storage and automatic handling systems",
              "Design emissions control and flue systems to regulations",
              "Size buffer vessels and thermal stores for biomass integration",
              "Plan ash handling and maintenance requirements",
              "Integrate biomass with conventional heating systems"
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

        {/* Section 1: Biomass Boiler Types and Fuel */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Biomass Boiler Types and Fuel
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Biomass heating uses organic material - primarily wood in various forms - as fuel to generate heat.
              When sourced sustainably, biomass is considered carbon-neutral as the CO2 released during combustion
              equals that absorbed during growth. Boiler selection depends on fuel availability, automation requirements,
              and heat demand profile.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Biomass fuel comparison:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fuel Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Moisture</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calorific Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Automation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wood pellets</td>
                      <td className="border border-white/10 px-3 py-2">&lt;10%</td>
                      <td className="border border-white/10 px-3 py-2">4.8 kWh/kg</td>
                      <td className="border border-white/10 px-3 py-2">Fully automatic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wood chips (G30)</td>
                      <td className="border border-white/10 px-3 py-2">20-30%</td>
                      <td className="border border-white/10 px-3 py-2">3.5 kWh/kg</td>
                      <td className="border border-white/10 px-3 py-2">Automatic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wood chips (G50)</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">2.5-3.0 kWh/kg</td>
                      <td className="border border-white/10 px-3 py-2">Automatic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Logs (seasoned)</td>
                      <td className="border border-white/10 px-3 py-2">15-20%</td>
                      <td className="border border-white/10 px-3 py-2">4.0-4.3 kWh/kg</td>
                      <td className="border border-white/10 px-3 py-2">Manual batch</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Boiler Types by Application</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Pellet Boilers (10-500kW)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Fully automated operation</li>
                    <li>High modulation range (30-100%)</li>
                    <li>Compact fuel storage</li>
                    <li>Low ash production (&lt;1%)</li>
                    <li>Ideal: commercial, schools, care homes</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Chip Boilers (50kW-10MW)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Lower fuel cost per kWh</li>
                    <li>Larger fuel store required</li>
                    <li>More robust feed systems</li>
                    <li>Higher ash content (1-3%)</li>
                    <li>Ideal: estates, industry, district heating</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Fuel Quality Standards</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>ENplus:</strong> European pellet quality certification (A1, A2, B grades)</li>
                <li><strong>Woodsure:</strong> UK quality assurance for logs, chips, briquettes</li>
                <li><strong>BSL:</strong> Biomass Suppliers List - sustainability certification</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification note:</strong> Always specify fuel quality requirements in tender documents - poor fuel quality is the primary cause of biomass system problems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fuel Storage and Handling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fuel Storage and Handling Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper fuel storage is critical for biomass system reliability. Storage must keep fuel dry,
              allow efficient delivery and extraction, and maintain fire separation from the boiler plant.
              Automatic handling systems transport fuel from store to boiler with minimal operator intervention.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pellet Storage</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Bulk silo (internal/external)</li>
                  <li className="pl-1">Underground tank</li>
                  <li className="pl-1">Purpose-built store room</li>
                  <li className="pl-1">Fabric silo systems</li>
                  <li className="pl-1">Pneumatic delivery via tanker</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chip Storage</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Walking floor bunker</li>
                  <li className="pl-1">Inclined agitator system</li>
                  <li className="pl-1">Rotating arm/sweep system</li>
                  <li className="pl-1">Tipper access required</li>
                  <li className="pl-1">Larger volumes (2-3x pellets)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Weatherproof construction</li>
                  <li className="pl-1">Ventilation to control humidity</li>
                  <li className="pl-1">Fire-rated separation</li>
                  <li className="pl-1">Vehicle access for delivery</li>
                  <li className="pl-1">Level sensors for monitoring</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automatic Feed Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Distance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Auger (screw conveyor)</td>
                      <td className="border border-white/10 px-3 py-2">6-8 metres</td>
                      <td className="border border-white/10 px-3 py-2">Short, straight runs</td>
                      <td className="border border-white/10 px-3 py-2">Simple, reliable, limited flexibility</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pneumatic vacuum</td>
                      <td className="border border-white/10 px-3 py-2">20-25 metres</td>
                      <td className="border border-white/10 px-3 py-2">Remote stores, direction changes</td>
                      <td className="border border-white/10 px-3 py-2">Pellets only, quiet operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Macerating auger</td>
                      <td className="border border-white/10 px-3 py-2">8-15 metres</td>
                      <td className="border border-white/10 px-3 py-2">Larger chips (G50)</td>
                      <td className="border border-white/10 px-3 py-2">Handles variable chip sizes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Belt/chain conveyor</td>
                      <td className="border border-white/10 px-3 py-2">50+ metres</td>
                      <td className="border border-white/10 px-3 py-2">Large chip installations</td>
                      <td className="border border-white/10 px-3 py-2">Higher capacity, more maintenance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Fire Safety - Burn-Back Prevention</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Drop tube:</strong> Creates air gap between feed system and combustion chamber</li>
                <li><strong>Rotary valve:</strong> Provides positive isolation, thermal fuse triggers closure</li>
                <li><strong>Water dousing:</strong> Temperature sensor activates water spray in feed tube</li>
                <li><strong>Fire-rated construction:</strong> 60-minute separation between store and boiler</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Allow 15-20% additional storage capacity beyond calculated requirements to accommodate delivery schedule variations and ensure continuous operation.
            </p>
          </div>
        </section>

        {/* Section 3: Emissions Control and Flue Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Emissions Control and Flue Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Biomass combustion produces particulate matter (PM), nitrogen oxides (NOx), carbon monoxide (CO),
              and volatile organic compounds (VOCs). Modern boilers incorporate primary combustion controls
              and may require secondary abatement equipment to meet emission limits, particularly for larger
              installations subject to environmental permitting.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Emission Limits (Medium Combustion Plant Directive)</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Thermal input:</span> <span className="text-white">1-50 MW</span></p>
                <p><span className="text-white/60">NOx limit:</span> <span className="text-white">300 mg/Nm3 (new plant &gt;5MW)</span></p>
                <p><span className="text-white/60">PM limit:</span> <span className="text-white">30 mg/Nm3 (new plant &gt;5MW)</span></p>
                <p><span className="text-white/60">SO2 limit:</span> <span className="text-white">200 mg/Nm3</span></p>
                <p className="text-white/60 mt-2">Note: Tighter limits apply in certain areas and for larger plant</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emissions Control Technologies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Primary measures:</strong> Optimised combustion air, staged combustion, lambda control</li>
                <li className="pl-1"><strong>Cyclonic separator:</strong> 70-85% PM removal, low maintenance, common on chip boilers</li>
                <li className="pl-1"><strong>Multicyclone:</strong> 85-95% PM removal, moderate cost</li>
                <li className="pl-1"><strong>Electrostatic precipitator (ESP):</strong> &gt;99% PM removal, higher cost, required for strict limits</li>
                <li className="pl-1"><strong>Fabric filter (baghouse):</strong> &gt;99% PM removal, used in larger industrial plant</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flue System Design</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flue material</td>
                      <td className="border border-white/10 px-3 py-2">Stainless steel 316L minimum</td>
                      <td className="border border-white/10 px-3 py-2">Condensing flues require higher grades</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Terminal height</td>
                      <td className="border border-white/10 px-3 py-2">1m above highest point within 10m</td>
                      <td className="border border-white/10 px-3 py-2">Dispersion modelling may require more</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation</td>
                      <td className="border border-white/10 px-3 py-2">Twin-wall insulated throughout</td>
                      <td className="border border-white/10 px-3 py-2">Maintains flue gas temperature</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Condensate drain</td>
                      <td className="border border-white/10 px-3 py-2">Required at base of flue</td>
                      <td className="border border-white/10 px-3 py-2">Acidic - may need neutralisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Access for cleaning</td>
                      <td className="border border-white/10 px-3 py-2">Inspection hatches required</td>
                      <td className="border border-white/10 px-3 py-2">Annual cleaning essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Planning consideration:</strong> Flue heights above 10m may require planning permission. Early consultation with local authority is recommended for installations over 200kW.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: System Integration and Operation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            System Integration and Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful biomass integration requires careful hydraulic design to maximise efficiency,
              prevent operational problems, and ensure seamless integration with building heating systems.
              Buffer vessels, thermal stores, and backup provision are key design considerations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hydraulic Integration Components</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Buffer Vessel</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Prevents short-cycling (on/off)</li>
                    <li>Absorbs load variations</li>
                    <li>Size: 10-20 litres per kW</li>
                    <li>Single temperature zone</li>
                    <li>Essential for all biomass systems</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Thermal Store</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Stratified temperature zones</li>
                    <li>Multiple heat source integration</li>
                    <li>DHW via internal coil possible</li>
                    <li>Size: 25-50 litres per kW</li>
                    <li>Preferred for multi-source systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical System Configuration</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sizing Guidance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Biomass boiler</td>
                      <td className="border border-white/10 px-3 py-2">Primary heat generation</td>
                      <td className="border border-white/10 px-3 py-2">60-80% of design heat load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Buffer vessel</td>
                      <td className="border border-white/10 px-3 py-2">Load smoothing, anti-cycling</td>
                      <td className="border border-white/10 px-3 py-2">10-20 litres per kW biomass</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Backup boiler (gas/oil)</td>
                      <td className="border border-white/10 px-3 py-2">Peak load, maintenance cover</td>
                      <td className="border border-white/10 px-3 py-2">100% of design load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low-loss header</td>
                      <td className="border border-white/10 px-3 py-2">Hydraulic separation</td>
                      <td className="border border-white/10 px-3 py-2">For multiple circuit systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plate heat exchanger</td>
                      <td className="border border-white/10 px-3 py-2">System separation</td>
                      <td className="border border-white/10 px-3 py-2">If water quality differs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Strategy</p>
              <div className="text-sm space-y-2">
                <p><strong>Cascade control:</strong> Biomass boiler operates as lead, backup as lag</p>
                <p><strong>Weather compensation:</strong> Flow temperature varies with external conditions</p>
                <p><strong>Buffer management:</strong> Boiler fires to maintain buffer temperature band</p>
                <p><strong>Modulation:</strong> Modern boilers modulate 30-100% to match load</p>
                <p><strong>Anti-cycling:</strong> Minimum run time and rest periods programmed</p>
                <p><strong>BMS integration:</strong> Enable/disable, alarm monitoring, energy metering</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ash Handling Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Automatic de-ashing:</strong> Auger removes ash from grate to external bin</li>
                <li className="pl-1"><strong>Ash bin sizing:</strong> Typically 4-8 weeks between emptying for pellet systems</li>
                <li className="pl-1"><strong>Disposal:</strong> Wood ash can be used as fertiliser (pH alkaline) or general waste</li>
                <li className="pl-1"><strong>Access:</strong> Ensure ash bin is accessible for manual removal</li>
                <li className="pl-1"><strong>Compaction:</strong> Some systems compact ash to reduce emptying frequency</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Undersizing the biomass boiler to 60-80% of peak load and relying on backup for peaks is often more cost-effective than sizing biomass for 100% peak load.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Fuel Store Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate pellet storage for a 150kW boiler serving a care home with 1,200,000 kWh annual heat demand.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate annual fuel requirement</p>
                <p className="ml-4">Annual heat demand: 1,200,000 kWh</p>
                <p className="ml-4">Boiler efficiency: 90%</p>
                <p className="ml-4">Fuel energy required: 1,200,000 / 0.90 = 1,333,333 kWh</p>
                <p className="mt-2 text-white/60">Step 2: Convert to fuel mass</p>
                <p className="ml-4">Pellet calorific value: 4,800 kWh/tonne</p>
                <p className="ml-4">Annual pellet requirement: 1,333,333 / 4,800 = 278 tonnes</p>
                <p className="mt-2 text-white/60">Step 3: Size fuel store</p>
                <p className="ml-4">Delivery capacity: 6 tonnes (blown delivery tanker)</p>
                <p className="ml-4">Deliveries per year: 278 / 6 = 46 deliveries</p>
                <p className="ml-4">Target: One delivery per week maximum in winter</p>
                <p className="ml-4">Recommended store: 10-12 tonnes capacity</p>
                <p className="ml-4">Pellet bulk density: 650 kg/m3</p>
                <p className="ml-4 text-green-400">Store volume: 12,000 / 650 = 18.5 m3 (minimum 20 m3)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Buffer Vessel Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size a buffer vessel for a 200kW wood chip boiler with minimum modulation of 40%.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Determine minimum output</p>
                <p className="ml-4">Minimum modulation: 40% of 200kW = 80kW</p>
                <p className="ml-4">Building base load (summer): ~30kW</p>
                <p className="ml-4">Excess heat when cycling: 80 - 30 = 50kW</p>
                <p className="mt-2 text-white/60">Step 2: Calculate storage requirement</p>
                <p className="ml-4">Minimum run time (for clean burn): 30 minutes</p>
                <p className="ml-4">Energy to store: 50kW x 0.5h = 25 kWh</p>
                <p className="ml-4">Temperature differential: 80°C - 60°C = 20K</p>
                <p className="ml-4">Water specific heat: 4.18 kJ/kg·K</p>
                <p className="mt-2 text-white/60">Step 3: Size buffer</p>
                <p className="ml-4">Volume = (25 x 3600) / (4.18 x 20 x 1) = 1,076 litres</p>
                <p className="ml-4 text-green-400">Recommended: 1,500 litre buffer vessel</p>
                <p className="ml-4 text-white/60">Check: 1,500 / 200 = 7.5 litres/kW (within 10-20 range)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Ash Production Estimate</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Estimate ash bin emptying frequency for a 100kW pellet boiler.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Estimate fuel consumption</p>
                <p className="ml-4">Average load: 60kW (60% of rated output)</p>
                <p className="ml-4">Daily operating hours: 12 hours average</p>
                <p className="ml-4">Daily energy: 60 x 12 = 720 kWh</p>
                <p className="ml-4">Daily pellet use: 720 / (4.8 x 0.9) = 167 kg</p>
                <p className="mt-2 text-white/60">Step 2: Calculate ash production</p>
                <p className="ml-4">Pellet ash content (ENplus A1): 0.5%</p>
                <p className="ml-4">Daily ash: 167 x 0.005 = 0.84 kg</p>
                <p className="ml-4">Weekly ash: 0.84 x 7 = 5.9 kg</p>
                <p className="mt-2 text-white/60">Step 3: Determine emptying frequency</p>
                <p className="ml-4">Ash bin capacity: 50 litres (typical)</p>
                <p className="ml-4">Ash bulk density: ~300 kg/m3</p>
                <p className="ml-4">Bin capacity by mass: 0.05 x 300 = 15 kg</p>
                <p className="ml-4 text-green-400">Emptying frequency: 15 / 5.9 = every 2.5 weeks</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Confirm fuel availability, quality, and supply chain reliability</li>
                <li className="pl-1">Assess delivery vehicle access - articulated lorry turning circle 25m</li>
                <li className="pl-1">Calculate fuel store size for minimum 2-3 weeks supply at peak demand</li>
                <li className="pl-1">Design buffer/thermal store to prevent short-cycling</li>
                <li className="pl-1">Specify emissions control to meet MCPD limits if applicable</li>
                <li className="pl-1">Plan flue route and terminal position for dispersion and planning compliance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Pellet calorific value: <strong>4.8 kWh/kg</strong> at &lt;10% moisture</li>
                <li className="pl-1">Wood chip calorific value: <strong>3.5 kWh/kg</strong> at 25% moisture</li>
                <li className="pl-1">Buffer vessel: <strong>10-20 litres per kW</strong> boiler output</li>
                <li className="pl-1">Flue terminal: <strong>1m above highest point within 10m</strong></li>
                <li className="pl-1">Boiler efficiency: <strong>85-92%</strong> typical for modern units</li>
                <li className="pl-1">Pellet bulk density: <strong>650 kg/m3</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Problems to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Poor fuel quality:</strong> Specify ENplus or Woodsure certification</li>
                <li className="pl-1"><strong>Inadequate storage:</strong> Wet fuel causes bridging and combustion issues</li>
                <li className="pl-1"><strong>No buffer vessel:</strong> Short-cycling damages boiler and increases emissions</li>
                <li className="pl-1"><strong>Undersized flue:</strong> Poor draught causes incomplete combustion</li>
                <li className="pl-1"><strong>Blocked feed systems:</strong> Ensure fuel is correctly sized for feed mechanism</li>
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
                <p className="font-medium text-white mb-1">Fuel Properties</p>
                <ul className="space-y-0.5">
                  <li>Pellets: 4.8 kWh/kg, &lt;10% moisture, 650 kg/m3</li>
                  <li>Chips G30: 3.5 kWh/kg, 20-30% moisture, 250 kg/m3</li>
                  <li>ENplus A1: &lt;0.7% ash, &lt;10% moisture</li>
                  <li>Storage: dry, ventilated, fire-separated</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">System Design</p>
                <ul className="space-y-0.5">
                  <li>Buffer vessel: 10-20 L/kW boiler output</li>
                  <li>Flue: 1m above highest point within 10m</li>
                  <li>Biomass sizing: 60-80% of peak load typical</li>
                  <li>MCPD: 1-50 MW thermal, PM &lt;30 mg/Nm3</li>
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
            <Link to="../h-n-c-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section2-4">
              Next: Section 2.4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section2_3;
