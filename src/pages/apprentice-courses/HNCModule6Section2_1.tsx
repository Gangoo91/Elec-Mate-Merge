import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Solar Photovoltaic Systems - HNC Module 6 Section 2.1";
const DESCRIPTION = "Master solar photovoltaic technology for building services: PV cell types, system sizing, inverter technology, G98/G99 DNO connection requirements, MCS standards, and performance monitoring systems.";

const quickCheckQuestions = [
  {
    id: "pv-cell-types",
    question: "Which PV cell technology typically offers the highest efficiency in standard test conditions?",
    options: ["Thin film amorphous silicon", "Polycrystalline silicon", "Monocrystalline silicon", "Cadmium telluride"],
    correctIndex: 2,
    explanation: "Monocrystalline silicon cells offer the highest efficiency (typically 18-22%) due to their uniform crystal structure, which allows electrons to flow more freely than in polycrystalline or thin film technologies."
  },
  {
    id: "g98-limit",
    question: "What is the maximum single-phase export capacity permitted under G98 without requiring DNO application approval?",
    options: ["3.68 kW per phase", "6 kW per phase", "16 A per phase", "50 kW total"],
    correctIndex: 0,
    explanation: "G98 permits up to 3.68 kW per phase (16 A × 230 V = 3.68 kW) for single-phase connections without requiring formal DNO application - only notification is required within 28 days of commissioning."
  },
  {
    id: "inverter-function",
    question: "What is the primary function of a grid-tied inverter in a PV system?",
    options: ["Store excess energy for later use", "Convert DC from panels to AC synchronised with grid frequency", "Increase the voltage output from panels", "Provide battery charging capability"],
    correctIndex: 1,
    explanation: "A grid-tied inverter converts DC electricity from PV panels to AC electricity synchronised with the grid frequency (50 Hz in the UK). It must also incorporate anti-islanding protection for safety."
  },
  {
    id: "annual-yield",
    question: "In the UK, typical annual solar irradiation for system sizing calculations is approximately:",
    options: ["500-700 kWh/m² per year", "850-1,100 kWh/m² per year", "1,500-1,800 kWh/m² per year", "2,000-2,500 kWh/m² per year"],
    correctIndex: 1,
    explanation: "The UK receives approximately 850-1,100 kWh/m² of solar irradiation annually, varying by location (higher in the south). This equates to roughly 800-1,000 kWh annual yield per kWp of installed capacity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A monocrystalline PV panel is rated at 400 Wp under Standard Test Conditions (STC). What irradiance level does STC specify?",
    options: [
      "500 W/m²",
      "800 W/m²",
      "1,000 W/m²",
      "1,200 W/m²"
    ],
    correctAnswer: 2,
    explanation: "Standard Test Conditions (STC) specify 1,000 W/m² irradiance, 25°C cell temperature, and AM 1.5 spectrum. The Wp rating indicates peak power output under these specific conditions."
  },
  {
    id: 2,
    question: "What is the typical temperature coefficient of power for crystalline silicon PV modules?",
    options: [
      "-0.1% per °C",
      "-0.35% to -0.45% per °C",
      "-1.0% per °C",
      "+0.5% per °C"
    ],
    correctAnswer: 1,
    explanation: "Crystalline silicon modules typically lose 0.35-0.45% of rated power for each degree Celsius above 25°C (STC). This means a 400 Wp panel at 45°C would produce approximately 368-372 W under 1,000 W/m²."
  },
  {
    id: 3,
    question: "Which inverter topology allows individual panel-level MPPT optimisation?",
    options: [
      "Central string inverter",
      "Multi-string inverter",
      "Microinverter",
      "Transformer-coupled inverter"
    ],
    correctAnswer: 2,
    explanation: "Microinverters are fitted to individual panels, providing panel-level maximum power point tracking (MPPT). This optimises energy harvest from each panel independently, beneficial where shading or panel mismatch occurs."
  },
  {
    id: 4,
    question: "When calculating PV system annual yield, which factor accounts for losses from dust, wiring, and inverter inefficiency?",
    options: [
      "Shading factor",
      "Temperature derating",
      "Performance ratio (PR)",
      "Orientation factor"
    ],
    correctAnswer: 2,
    explanation: "Performance ratio (PR) typically ranges from 0.75-0.85 and accounts for all system losses including soiling, wiring resistance, inverter efficiency, temperature effects, and mismatch losses."
  },
  {
    id: 5,
    question: "For a south-facing roof in central England with 35° pitch, what is the approximate orientation factor for annual yield calculation?",
    options: [
      "0.70-0.75",
      "0.85-0.90",
      "0.95-1.00",
      "1.05-1.10"
    ],
    correctAnswer: 2,
    explanation: "A south-facing array at 30-40° pitch in the UK achieves near-optimal orientation with an orientation factor of 0.95-1.00. The optimal pitch angle approximately equals the latitude (51-54° for most of England)."
  },
  {
    id: 6,
    question: "G99 application to the DNO is required for installations exceeding:",
    options: [
      "3.68 kW single-phase",
      "6 kW three-phase",
      "11.04 kW three-phase or 3.68 kW single-phase",
      "16 kW total capacity"
    ],
    correctAnswer: 2,
    explanation: "G99 application is required when total export capacity exceeds 3.68 kW per phase (single-phase) or 11.04 kW total (three-phase balanced across phases). The DNO must assess network impact before connection approval."
  },
  {
    id: 7,
    question: "What is the maximum permitted DC voltage for PV string design in a domestic installation under BS 7671?",
    options: [
      "120 V DC",
      "600 V DC",
      "1,000 V DC",
      "1,500 V DC"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 and product standards typically limit DC voltage to 1,000 V for standard PV installations. String voltage must remain below this at all temperatures - typically calculated at minimum expected temperature when Voc is highest."
  },
  {
    id: 8,
    question: "Which MCS standard covers the installation of solar PV systems in the UK?",
    options: [
      "MCS 001",
      "MCS 012",
      "MCS 020",
      "MCS 025"
    ],
    correctAnswer: 1,
    explanation: "MCS 012 covers 'Installation Standard Requirements for contractors undertaking the supply, design, installation, set to work, commissioning and handover of Solar Photovoltaic Systems'."
  },
  {
    id: 9,
    question: "Anti-islanding protection in a grid-tied inverter ensures that:",
    options: [
      "The system maximises energy export",
      "Power factor remains above 0.95",
      "The inverter disconnects within 0.5 seconds of grid failure",
      "DC voltage remains stable"
    ],
    correctAnswer: 2,
    explanation: "Anti-islanding protection detects grid failure (loss of mains) and disconnects the inverter within 0.5 seconds. This prevents back-feeding into a dead network, which could endanger workers and equipment."
  },
  {
    id: 10,
    question: "A 4 kWp PV system in the South of England typically generates approximately how much energy annually?",
    options: [
      "1,500-2,000 kWh",
      "3,200-4,000 kWh",
      "5,000-6,000 kWh",
      "7,000-8,000 kWh"
    ],
    correctAnswer: 1,
    explanation: "In Southern England, expect approximately 800-1,000 kWh per kWp annually. A 4 kWp system would generate 3,200-4,000 kWh per year, assuming good orientation and minimal shading."
  },
  {
    id: 11,
    question: "When connecting PV panels in series, which parameter is additive?",
    options: [
      "Current (Isc and Imp)",
      "Voltage (Voc and Vmp)",
      "Power output only",
      "Neither voltage nor current"
    ],
    correctAnswer: 1,
    explanation: "Connecting panels in series adds voltages (Voc values and Vmp values sum), while current remains equal to a single panel. This is why string voltage calculations are critical for inverter compatibility."
  },
  {
    id: 12,
    question: "For MCS certification, how long must generation meter data be retained?",
    options: [
      "1 year",
      "5 years",
      "10 years",
      "20 years"
    ],
    correctAnswer: 2,
    explanation: "MCS requires installers to retain records including commissioning data and generation meter readings for a minimum of 10 years. This supports performance monitoring and warranty claims throughout the system lifetime."
  }
];

const faqs = [
  {
    question: "What is the difference between G98 and G99 connections?",
    answer: "G98 applies to small-scale generation up to 3.68 kW per phase (16 A × 230 V) for single-phase or 11.04 kW total for three-phase balanced connections. G98 requires only notification to the DNO within 28 days of commissioning. G99 applies to larger installations exceeding these limits and requires formal application to the DNO before installation, with network studies potentially required to assess grid impact."
  },
  {
    question: "How do I calculate the number of panels that can be connected in series?",
    answer: "Maximum string length is determined by the inverter's maximum DC input voltage (typically 600-1,000 V) divided by the panel's Voc at minimum expected temperature. Minimum string length is determined by the inverter's MPPT minimum voltage divided by Vmp at maximum expected temperature. Use temperature coefficients (typically +0.3% per °C below 25°C for Voc) to calculate voltage at -10°C for maximum and +70°C for minimum."
  },
  {
    question: "What factors affect actual PV system yield versus rated capacity?",
    answer: "Several factors reduce actual yield below nameplate capacity: (1) Solar irradiation varies by location (850-1,100 kWh/m² annually in UK); (2) Temperature - panels lose 0.35-0.45% per °C above 25°C; (3) Orientation and tilt - sub-optimal angles reduce yield; (4) Shading - even partial shade significantly impacts output; (5) System losses - inverter efficiency (95-98%), wiring losses (1-2%), soiling (2-5%). Performance ratio typically 0.75-0.85."
  },
  {
    question: "Do I need to be MCS certified to install PV systems?",
    answer: "MCS certification is not legally required to install PV systems, but it is essential for customers to qualify for Smart Export Guarantee (SEG) payments for exported electricity. MCS certification requires working to MCS 012 installation standards, using MCS-certified products, and completing approved installer training. Without MCS certification, the installation cannot be registered and the customer loses access to export tariffs."
  },
  {
    question: "What isolation and protection requirements apply to PV DC circuits?",
    answer: "PV DC circuits require: (1) DC isolator adjacent to the inverter rated for DC breaking capacity; (2) String fuses where multiple strings connect in parallel (typically 15-20 A); (3) Type II surge protection devices on DC side recommended; (4) Fireman's switch for emergency isolation where required; (5) Clear labelling of all DC components warning of voltage presence even when AC isolated; (6) Cable sizing for 1.25 × Isc to account for irradiance above STC."
  },
  {
    question: "How do microinverters differ from string inverters for system design?",
    answer: "String inverters convert DC from multiple series-connected panels through a single unit, requiring matched panels and string voltage calculations. Microinverters are fitted to each panel, converting to AC at panel level. Microinverters offer panel-level MPPT optimisation (beneficial for shading), easier expansion, and no high-voltage DC, but cost more per watt. String inverters offer lower cost, easier maintenance, and higher efficiency for unshaded arrays."
  }
];

const HNCModule6Section2_1 = () => {
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
            <span>Module 6.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Solar Photovoltaic Systems
          </h1>
          <p className="text-white/80">
            PV technology, system sizing, installation requirements, G98/G99 connection, and performance monitoring
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>PV cells:</strong> Monocrystalline (18-22%), polycrystalline (15-18%), thin film (10-13%)</li>
              <li className="pl-1"><strong>UK yield:</strong> 800-1,000 kWh per kWp annually</li>
              <li className="pl-1"><strong>G98 limit:</strong> 3.68 kW per phase (notification only)</li>
              <li className="pl-1"><strong>MCS 012:</strong> Installation standard for certification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Calculations</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Annual yield:</strong> kWp × PSH × PR × orientation factor</li>
              <li className="pl-1"><strong>String Voc max:</strong> At -10°C (UK winter)</li>
              <li className="pl-1"><strong>String Vmp min:</strong> At +70°C (roof temperature)</li>
              <li className="pl-1"><strong>Performance ratio:</strong> Typically 0.75-0.85</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare PV cell technologies and their performance characteristics",
              "Size PV arrays including string voltage and inverter matching",
              "Calculate annual energy yield using UK irradiation data",
              "Apply G98/G99 DNO connection requirements correctly",
              "Understand MCS certification requirements and installation standards",
              "Design performance monitoring systems for ongoing verification"
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

        {/* Section 1: PV Cell Technology */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            PV Cell Technology and Panel Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Photovoltaic cells convert solar radiation directly into electrical energy through the
              photovoltaic effect. Understanding cell technologies, their characteristics, and
              specification parameters is essential for system design and component selection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">PV Cell Technology Comparison:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monocrystalline</td>
                      <td className="border border-white/10 px-3 py-2">18-22%</td>
                      <td className="border border-white/10 px-3 py-2">Uniform black appearance, highest efficiency, performs well in low light</td>
                      <td className="border border-white/10 px-3 py-2">Premium residential, limited roof space</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Polycrystalline</td>
                      <td className="border border-white/10 px-3 py-2">15-18%</td>
                      <td className="border border-white/10 px-3 py-2">Blue speckled appearance, lower cost, slightly lower efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Budget residential, commercial arrays</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thin Film (CdTe/CIGS)</td>
                      <td className="border border-white/10 px-3 py-2">10-13%</td>
                      <td className="border border-white/10 px-3 py-2">Flexible, lightweight, better shade tolerance, lower efficiency</td>
                      <td className="border border-white/10 px-3 py-2">BIPV, curved surfaces, large commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Half-cut cells</td>
                      <td className="border border-white/10 px-3 py-2">19-22%</td>
                      <td className="border border-white/10 px-3 py-2">Reduced resistive losses, better shade performance, higher power density</td>
                      <td className="border border-white/10 px-3 py-2">Modern premium installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Panel Specifications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wp (Peak Watts):</strong> Rated power output at STC (1,000 W/m², 25°C, AM 1.5)</li>
                <li className="pl-1"><strong>Voc (Open Circuit Voltage):</strong> Maximum voltage when no current flows - critical for string design</li>
                <li className="pl-1"><strong>Vmp (Voltage at Maximum Power):</strong> Operating voltage at peak power point</li>
                <li className="pl-1"><strong>Isc (Short Circuit Current):</strong> Maximum current - used for cable and fuse sizing</li>
                <li className="pl-1"><strong>Imp (Current at Maximum Power):</strong> Operating current at peak power point</li>
                <li className="pl-1"><strong>Temperature coefficients:</strong> Power typically -0.35% to -0.45% per °C above 25°C</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Standard Test Conditions (STC)</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>Irradiance: <strong>1,000 W/m²</strong></li>
                <li>Cell temperature: <strong>25°C</strong></li>
                <li>Air mass: <strong>AM 1.5</strong> (spectrum at 48.2° solar elevation)</li>
              </ul>
              <p className="text-sm text-white/70 mt-2">
                Real-world performance differs due to varying irradiance, higher cell temperatures, and system losses.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Cell temperature on a roof can reach 60-70°C on hot days, reducing output by 15-20% from STC ratings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: System Sizing and Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            System Sizing and Annual Yield Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate system sizing requires understanding solar irradiation data, system losses,
              and electrical parameters. String voltage calculations ensure inverter compatibility
              and safe operation across temperature extremes.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Solar Irradiation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">South England: 1,000-1,100 kWh/m²</li>
                  <li className="pl-1">Midlands: 900-1,000 kWh/m²</li>
                  <li className="pl-1">North England: 850-950 kWh/m²</li>
                  <li className="pl-1">Scotland: 800-900 kWh/m²</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Orientation Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">South 30-40°: 0.95-1.00</li>
                  <li className="pl-1">SE/SW 30-40°: 0.90-0.95</li>
                  <li className="pl-1">East/West 30-40°: 0.80-0.85</li>
                  <li className="pl-1">Flat roof: 0.85-0.90</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Losses (PR)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Inverter efficiency: 95-98%</li>
                  <li className="pl-1">Cable losses: 1-2%</li>
                  <li className="pl-1">Temperature: 5-10%</li>
                  <li className="pl-1">Soiling/mismatch: 2-5%</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Yield Calculation</p>
              <div className="bg-black/30 p-4 rounded text-sm font-mono text-white/90">
                <p className="text-white/60 mb-2">Formula:</p>
                <p className="text-green-400">Annual Yield (kWh) = kWp × PSH × PR × Orientation Factor</p>
                <p className="text-white/60 mt-4 mb-2">Where:</p>
                <p>kWp = System peak power rating</p>
                <p>PSH = Peak Sun Hours (kWh/m²/year ÷ 1 kW/m²)</p>
                <p>PR = Performance Ratio (typically 0.75-0.85)</p>
                <p className="mt-4 text-white/60">Simplified UK calculation:</p>
                <p className="text-green-400">Annual Yield ≈ kWp × 800 to 1,000 kWh</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">String Voltage Calculations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Check Against</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum Voc</td>
                      <td className="border border-white/10 px-3 py-2">-10°C (UK minimum)</td>
                      <td className="border border-white/10 px-3 py-2">Voc × [1 + (Tc × (Tmin - 25))]</td>
                      <td className="border border-white/10 px-3 py-2">Inverter max DC input</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Minimum Vmp</td>
                      <td className="border border-white/10 px-3 py-2">+70°C (roof max)</td>
                      <td className="border border-white/10 px-3 py-2">Vmp × [1 + (Tc × (Tmax - 25))]</td>
                      <td className="border border-white/10 px-3 py-2">Inverter MPPT min voltage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-white/70 mt-2">
                Tc = Temperature coefficient of voltage (typically -0.3% per °C for crystalline silicon)
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical check:</strong> String Voc at -10°C must not exceed inverter maximum DC voltage (typically 600-1,000 V), and string Vmp at 70°C must remain above MPPT minimum voltage.
            </p>
          </div>
        </section>

        {/* Section 3: Inverter Technology and G98/G99 Connection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Inverter Technology and DNO Connection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Grid-tied inverters convert DC from PV arrays to AC synchronised with the mains supply.
              They incorporate maximum power point tracking (MPPT), grid monitoring, and safety
              features required by Engineering Recommendation G98/G99.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inverter Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limitations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">String Inverter</td>
                      <td className="border border-white/10 px-3 py-2">Central unit for one or more strings</td>
                      <td className="border border-white/10 px-3 py-2">Cost-effective, easy maintenance, high efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Shade affects entire string, requires matching</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Microinverter</td>
                      <td className="border border-white/10 px-3 py-2">Individual unit per panel</td>
                      <td className="border border-white/10 px-3 py-2">Panel-level MPPT, no high-voltage DC, shade tolerant</td>
                      <td className="border border-white/10 px-3 py-2">Higher cost, more components to fail</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DC Optimiser + Inverter</td>
                      <td className="border border-white/10 px-3 py-2">Panel-level optimiser with string inverter</td>
                      <td className="border border-white/10 px-3 py-2">Panel-level MPPT, string inverter benefits</td>
                      <td className="border border-white/10 px-3 py-2">Additional cost, still has DC cabling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hybrid Inverter</td>
                      <td className="border border-white/10 px-3 py-2">PV input plus battery interface</td>
                      <td className="border border-white/10 px-3 py-2">Integrated storage solution, backup capability</td>
                      <td className="border border-white/10 px-3 py-2">Higher cost, more complex installation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">G98 vs G99 Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">G98 (Notification Only)</p>
                  <ul className="text-white/90 space-y-1">
                    <li>• Single-phase: ≤ 3.68 kW (16 A × 230 V)</li>
                    <li>• Three-phase: ≤ 11.04 kW (3 × 3.68 kW)</li>
                    <li>• Notify DNO within 28 days of commissioning</li>
                    <li>• No approval required</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">G99 (Application Required)</p>
                  <ul className="text-white/90 space-y-1">
                    <li>• Exceeds G98 limits</li>
                    <li>• Apply before installation</li>
                    <li>• DNO assesses network impact</li>
                    <li>• May require network reinforcement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inverter Safety Features (G98/G99 Compliance)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Anti-islanding:</strong> Disconnects within 0.5 seconds of grid failure - prevents energising dead network</li>
                <li className="pl-1"><strong>Voltage monitoring:</strong> Disconnects if voltage outside 207-253 V (230 V +10%/-10%)</li>
                <li className="pl-1"><strong>Frequency monitoring:</strong> Disconnects if frequency outside 47.5-52 Hz</li>
                <li className="pl-1"><strong>Rate of Change of Frequency (RoCoF):</strong> 1 Hz/s protection setting</li>
                <li className="pl-1"><strong>Power factor:</strong> Adjustable, typically set at 0.95 lagging to unity</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> All grid-connected inverters must comply with G98/G99 and carry appropriate type-test certification (e.g., EN 50549).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: MCS Standards and Performance Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            MCS Standards and Performance Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Microgeneration Certification Scheme (MCS) sets quality standards for renewable
              energy installations in the UK. MCS certification is required for customers to access
              Smart Export Guarantee (SEG) payments. Ongoing performance monitoring ensures systems
              deliver expected yields.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCS Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>MCS 012:</strong> Installation standards</li>
                  <li className="pl-1"><strong>MCS 005:</strong> Product certification</li>
                  <li className="pl-1">Approved installer training</li>
                  <li className="pl-1">Registered design software</li>
                  <li className="pl-1">Generation meter installation</li>
                  <li className="pl-1">10-year record retention</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Documentation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">MCS certificate (unique number)</li>
                  <li className="pl-1">Electrical Installation Certificate</li>
                  <li className="pl-1">G98/G99 notification/approval</li>
                  <li className="pl-1">Commissioning checklist</li>
                  <li className="pl-1">Estimated annual yield calculation</li>
                  <li className="pl-1">O&M documentation and warranties</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Monitoring Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Monitoring Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Data Captured</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Benefits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generation meter only</td>
                      <td className="border border-white/10 px-3 py-2">Total kWh generated</td>
                      <td className="border border-white/10 px-3 py-2">Basic verification, SEG compliance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inverter monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Real-time power, daily yield, fault codes</td>
                      <td className="border border-white/10 px-3 py-2">Remote fault detection, performance tracking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Panel-level monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Individual panel output</td>
                      <td className="border border-white/10 px-3 py-2">Identify underperforming panels, shade impact</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weather-compensated</td>
                      <td className="border border-white/10 px-3 py-2">Irradiance, temperature, actual vs expected</td>
                      <td className="border border-white/10 px-3 py-2">True performance ratio calculation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Ratio Monitoring</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Performance Ratio (PR) calculation:</p>
                <p className="mt-2 text-green-400">PR = Actual Energy Output ÷ (Installed kWp × Plane of Array Irradiation ÷ 1,000)</p>
                <p className="mt-4 text-white/60">Expected values:</p>
                <p>New system: <span className="text-green-400">0.80-0.85</span></p>
                <p>After degradation (10+ years): <span className="text-yellow-400">0.75-0.80</span></p>
                <p>Indicating fault: <span className="text-red-400">&lt; 0.70</span></p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Maintenance consideration:</strong> Panels typically degrade 0.5-0.7% per year. Inverters have 10-15 year typical lifespan. Factor replacement costs into lifecycle analysis.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Annual Yield Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate annual yield for a 4 kWp system in Birmingham, south-facing at 35° pitch.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p>System size: 4 kWp</p>
                <p>Location: Birmingham (950 kWh/m² annual irradiation)</p>
                <p>Orientation: South-facing, 35° pitch (factor 0.97)</p>
                <p>Performance ratio: 0.80</p>
                <p className="mt-4 text-white/60">Calculation:</p>
                <p>Peak Sun Hours (PSH) = 950 kWh/m² ÷ 1 kW/m² = 950 hours</p>
                <p>Annual Yield = 4 kWp × 950 × 0.80 × 0.97</p>
                <p className="text-green-400 mt-2">Annual Yield = 2,941 kWh</p>
                <p className="text-white/60 mt-2">Simplified: 4 × 900 = 3,600 kWh (using 900 kWh/kWp rule of thumb)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: String Voltage Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine maximum panels per string for 400 W panels (Voc = 49.5 V, Vmp = 41.5 V) with a 600 V inverter.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Panel specifications:</p>
                <p>Voc at STC (25°C): 49.5 V</p>
                <p>Vmp at STC (25°C): 41.5 V</p>
                <p>Temperature coefficient: -0.29%/°C</p>
                <p className="mt-4 text-white/60">Maximum Voc at -10°C:</p>
                <p>Temperature difference = 25°C - (-10°C) = 35°C</p>
                <p>Voltage increase = 35 × 0.29% = 10.15%</p>
                <p>Voc at -10°C = 49.5 × 1.1015 = <span className="text-yellow-400">54.5 V</span></p>
                <p className="mt-4 text-white/60">Maximum panels in string:</p>
                <p>600 V ÷ 54.5 V = 11.0 panels</p>
                <p className="text-green-400 mt-2">Maximum: 11 panels per string</p>
                <p className="text-white/60 mt-4">Also check minimum Vmp remains above MPPT minimum (typically 150-200 V)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: G98/G99 Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine connection requirements for a 6 kWp single-phase domestic installation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Installation details:</p>
                <p>Inverter AC output: 6 kW single-phase</p>
                <p>Supply: Single-phase 230 V</p>
                <p className="mt-4 text-white/60">G98 limit check:</p>
                <p>G98 single-phase limit: 16 A × 230 V = 3.68 kW</p>
                <p>Proposed installation: 6 kW</p>
                <p className="text-red-400 mt-2">6 kW &gt; 3.68 kW - G98 limit exceeded</p>
                <p className="mt-4 text-white/60">Requirement:</p>
                <p className="text-yellow-400">G99 application required before installation</p>
                <p className="text-white/60 mt-2">Alternative: Install 3.68 kW inverter to qualify for G98 notification only</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">PV System Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Survey roof orientation, pitch, shading, and structural capacity</li>
                <li className="pl-1">Calculate available area and maximum system size</li>
                <li className="pl-1">Select appropriate panel technology and inverter type</li>
                <li className="pl-1">Verify string voltage within inverter limits at temperature extremes</li>
                <li className="pl-1">Assess G98/G99 requirements based on export capacity</li>
                <li className="pl-1">Calculate estimated annual yield using local irradiation data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK annual yield: <strong>800-1,000 kWh per kWp</strong></li>
                <li className="pl-1">G98 single-phase limit: <strong>3.68 kW</strong> (16 A × 230 V)</li>
                <li className="pl-1">Performance ratio: <strong>0.75-0.85</strong></li>
                <li className="pl-1">Temperature coefficient: <strong>-0.35% to -0.45% per °C</strong></li>
                <li className="pl-1">Anti-islanding disconnect: <strong>&lt; 0.5 seconds</strong></li>
                <li className="pl-1">Annual degradation: <strong>0.5-0.7% per year</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring temperature coefficients</strong> - String voltage at -10°C can exceed inverter limits</li>
                <li className="pl-1"><strong>Underestimating shading</strong> - Even partial shade dramatically reduces string output</li>
                <li className="pl-1"><strong>Incorrect G98/G99 assessment</strong> - Based on inverter export capacity, not panel rating</li>
                <li className="pl-1"><strong>Omitting DC isolation</strong> - DC isolator at inverter required, fireman's switch where applicable</li>
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
                <p className="font-medium text-white mb-1">Panel Specifications</p>
                <ul className="space-y-0.5">
                  <li>Monocrystalline: 18-22% efficiency</li>
                  <li>STC: 1,000 W/m², 25°C, AM 1.5</li>
                  <li>Temp coefficient: -0.35% to -0.45%/°C</li>
                  <li>Typical module: 350-450 Wp</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">DNO Connection</p>
                <ul className="space-y-0.5">
                  <li>G98: ≤ 3.68 kW/phase (notification)</li>
                  <li>G99: &gt; 3.68 kW/phase (application)</li>
                  <li>Anti-islanding: &lt; 0.5 s disconnect</li>
                  <li>Voltage: 207-253 V operating range</li>
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
            <Link to="../h-n-c-module6-section2-2">
              Next: Battery Storage Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section2_1;
