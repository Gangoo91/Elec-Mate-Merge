import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Hybrid Inverters and System Sizing - Renewable Energy Module 4";
const DESCRIPTION = "Learn about hybrid inverter operation, AC/DC coupling configurations, and system sizing methodology for battery energy storage systems.";

const quickCheckQuestions = [
  {
    id: "hybrid-inverter-function",
    question: "What distinguishes a hybrid inverter from a standard solar inverter?",
    options: ["Higher power output", "Integrated battery charging and management capability", "Lower cost", "Outdoor installation rating"],
    correctIndex: 1,
    explanation: "Hybrid inverters combine solar inverter and battery charger/inverter functions in one unit, managing power flow between solar, battery, grid, and loads seamlessly."
  },
  {
    id: "dc-coupling-advantage",
    question: "What is the main advantage of DC-coupled battery systems?",
    options: ["Lower equipment cost", "Higher overall efficiency due to fewer conversion stages", "Easier installation", "No inverter required"],
    correctIndex: 1,
    explanation: "DC coupling connects batteries directly to the DC bus before the inverter, avoiding DC-AC-DC conversion losses and achieving 2-5% higher efficiency than AC coupling."
  },
  {
    id: "sizing-methodology",
    question: "What is the primary factor for sizing battery storage capacity?",
    options: ["Solar panel wattage", "Daily energy consumption and desired autonomy", "Inverter brand", "Installation location"],
    correctIndex: 1,
    explanation: "Battery capacity sizing is primarily based on daily energy consumption patterns and the desired autonomy period (hours or days of backup without solar/grid input)."
  },
  {
    id: "inverter-sizing",
    question: "How should inverter power rating relate to maximum load?",
    options: ["Equal to average load", "25-30% above maximum expected load", "Same as solar array size", "Based on battery capacity only"],
    correctIndex: 1,
    explanation: "Inverter power rating should exceed maximum expected load by 25-30% to handle inrush currents from motors and ensure headroom for simultaneous loads."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a hybrid inverter manage?",
    options: [
      "Only solar to grid conversion",
      "Power flow between solar, battery, grid, and loads",
      "Only battery charging",
      "Only grid connection"
    ],
    correctAnswer: 1,
    explanation: "Hybrid inverters manage bidirectional power flow between all system components: solar input, battery storage, grid connection, and household/commercial loads."
  },
  {
    id: 2,
    question: "In AC-coupled systems, where does the battery inverter connect?",
    options: [
      "Directly to solar panels",
      "To the DC bus of the solar inverter",
      "To the AC distribution board",
      "Directly to the grid meter"
    ],
    correctAnswer: 2,
    explanation: "AC-coupled systems connect the battery inverter to the AC distribution board, allowing it to work independently of the solar inverter and enabling retrofit installations."
  },
  {
    id: 3,
    question: "What is the typical efficiency of a good quality hybrid inverter?",
    options: [
      "85-90%",
      "95-98%",
      "75-80%",
      "99-100%"
    ],
    correctAnswer: 1,
    explanation: "Quality hybrid inverters achieve 95-98% conversion efficiency. European efficiency weighted average is typically 96-97% for well-designed units."
  },
  {
    id: 4,
    question: "What factor determines the maximum charge/discharge rate of a battery system?",
    options: [
      "Solar array size only",
      "The lower of inverter power rating and battery C-rate limit",
      "Grid connection capacity",
      "Cable size only"
    ],
    correctAnswer: 1,
    explanation: "Maximum charge/discharge rate is limited by both the inverter power rating and the battery's maximum C-rate. The lower limit applies."
  },
  {
    id: 5,
    question: "What is the purpose of anti-islanding protection in grid-tied inverters?",
    options: [
      "Prevent theft",
      "Ensure inverter disconnects during grid outages for safety",
      "Improve efficiency",
      "Reduce noise"
    ],
    correctAnswer: 1,
    explanation: "Anti-islanding protection ensures the inverter disconnects from the grid during outages, preventing back-feeding that could endanger utility workers."
  },
  {
    id: 6,
    question: "How is usable battery capacity calculated from nominal capacity?",
    options: [
      "Nominal capacity x efficiency",
      "Nominal capacity x depth of discharge x efficiency",
      "Nominal capacity / 2",
      "Nominal capacity + 10%"
    ],
    correctAnswer: 1,
    explanation: "Usable capacity = Nominal capacity x DoD x efficiency. For example, 10kWh x 90% DoD x 95% efficiency = 8.55kWh usable."
  },
  {
    id: 7,
    question: "What is EPS or backup function in hybrid inverters?",
    options: [
      "Enhanced Power Saving",
      "Emergency Power Supply - providing power during grid outages",
      "Electronic Protection System",
      "Energy Performance Standard"
    ],
    correctAnswer: 1,
    explanation: "EPS (Emergency Power Supply) or backup function allows the hybrid inverter to supply power to essential loads during grid outages using battery storage."
  },
  {
    id: 8,
    question: "What sizing margin should be applied to inverter continuous power rating?",
    options: [
      "No margin needed",
      "10% below maximum load",
      "25-30% above maximum expected load",
      "50% of battery capacity"
    ],
    correctAnswer: 2,
    explanation: "Inverter should be sized 25-30% above maximum expected load to handle inrush currents, power factor variations, and provide operational headroom."
  },
  {
    id: 9,
    question: "What advantage does three-phase hybrid inverter offer over single-phase?",
    options: [
      "Lower cost",
      "Simpler installation",
      "Balanced power distribution and higher capacity",
      "No G99 application required"
    ],
    correctAnswer: 2,
    explanation: "Three-phase systems provide balanced power distribution across phases, higher total capacity (up to 3x), and are required for larger commercial installations."
  },
  {
    id: 10,
    question: "What is the typical DC input voltage range for residential hybrid inverters?",
    options: [
      "12-24V",
      "100-500V",
      "600-1000V",
      "50-100V"
    ],
    correctAnswer: 1,
    explanation: "Residential hybrid inverters typically accept 100-500V DC input to accommodate various battery configurations. Always verify compatibility with specific battery voltage."
  }
];

const faqs = [
  {
    question: "Should I choose AC or DC coupling for a new installation?",
    answer: "DC coupling is generally preferred for new installations due to higher efficiency (2-5% better) and simpler system architecture. AC coupling is better for retrofitting existing solar systems or when using incompatible equipment."
  },
  {
    question: "How do I size a battery system for self-consumption optimisation?",
    answer: "Analyse daily load profile and solar generation pattern. Typically, 1-1.5 kWh of storage per kWp of solar covers evening peak use. For UK homes, 8-13kWh covers typical evening loads after solar generation drops."
  },
  {
    question: "What happens if my inverter is undersized?",
    answer: "An undersized inverter will trip on overload, limiting the loads you can run simultaneously. It may also reduce charging speed and prevent full utilisation of solar generation or battery capacity."
  },
  {
    question: "Can I expand battery capacity later with a hybrid system?",
    answer: "Yes, most hybrid systems allow battery expansion within the inverter's voltage and current limits. However, matching battery specifications and BMS compatibility is essential. Some manufacturers require batteries from the same production batch."
  },
  {
    question: "What is the difference between backup power and off-grid capability?",
    answer: "Backup power (EPS) provides limited power to essential circuits during outages but relies on grid for normal operation. True off-grid capability means the system can operate indefinitely without grid connection, requiring larger battery, solar, and potentially generator integration."
  },
  {
    question: "How do grid export limits affect system sizing?",
    answer: "DNO export limits (typically 3.68kW for G98, higher for G99) may require export limitation settings in the inverter. This affects system sizing as excess generation beyond export limit must be stored or curtailed. Size batteries to capture potential curtailed energy."
  }
];

const RenewableEnergyModule4Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-4">
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
            <span>Module 4 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Hybrid Inverters and System Sizing
          </h1>
          <p className="text-white/80">
            Inverter selection, AC/DC coupling, and sizing methodology for BESS
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Hybrid Inverter Functions</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Solar MPPT:</strong> Maximum power point tracking</li>
              <li><strong>Battery management:</strong> Charge/discharge control</li>
              <li><strong>Grid interaction:</strong> Import, export, backup</li>
              <li><strong>Load management:</strong> Prioritisation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Sizing Considerations</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Inverter:</strong> 25-30% above max load</li>
              <li><strong>Battery:</strong> Daily use + autonomy</li>
              <li><strong>Solar:</strong> Annual consumption / yield</li>
              <li><strong>Efficiency:</strong> Account for losses</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand hybrid inverter operation modes",
              "Compare AC and DC coupling architectures",
              "Calculate battery capacity requirements",
              "Size inverter for load requirements",
              "Apply efficiency factors to sizing",
              "Consider grid connection requirements"
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
            Hybrid Inverter Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hybrid inverters combine multiple functions into a single unit, managing power flow between solar panels, batteries, grid, and loads to optimise energy use and provide backup capability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Operating Modes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Self-consumption:</strong> Maximise use of solar generation locally</li>
                <li><strong>Time-of-use:</strong> Charge from grid at low tariff, discharge at peak</li>
                <li><strong>Backup priority:</strong> Maintain battery reserve for outages</li>
                <li><strong>Feed-in priority:</strong> Export excess to grid for maximum revenue</li>
                <li><strong>Off-grid/EPS:</strong> Islanded operation during grid outage</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rated power:</strong> Maximum continuous AC output (kW)</li>
                <li><strong>Peak power:</strong> Short-term overload capability</li>
                <li><strong>DC input voltage:</strong> Solar and battery voltage ranges</li>
                <li><strong>MPPT channels:</strong> Number of independent solar inputs</li>
                <li><strong>Efficiency:</strong> Typically 95-98% at rated load</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Common Hybrid Inverter Sizes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Residential single-phase:</strong> 3.6kW, 5kW, 6kW, 8kW</li>
                <li><strong>Residential three-phase:</strong> 8kW, 10kW, 12kW</li>
                <li><strong>Small commercial:</strong> 15kW, 20kW, 30kW</li>
                <li><strong>Commercial:</strong> 50kW, 100kW+ (often modular)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            AC vs DC Coupling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between AC and DC coupling affects system efficiency, complexity, and flexibility. Understanding both architectures helps in selecting the optimal configuration for each project.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DC-Coupled Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Architecture:</strong> Battery connects to DC bus before inverter</li>
                <li><strong>Efficiency:</strong> Single DC-AC conversion, 2-5% higher than AC</li>
                <li><strong>Components:</strong> Hybrid inverter or solar inverter + DC-DC converter</li>
                <li><strong>Advantages:</strong> Higher efficiency, simpler wiring, single unit</li>
                <li><strong>Limitations:</strong> Battery voltage must match inverter range</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">AC-Coupled Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Architecture:</strong> Separate battery inverter on AC side</li>
                <li><strong>Efficiency:</strong> Multiple conversions reduce overall efficiency</li>
                <li><strong>Components:</strong> Solar inverter + battery inverter + batteries</li>
                <li><strong>Advantages:</strong> Retrofit flexibility, component independence</li>
                <li><strong>Limitations:</strong> Lower efficiency, more equipment, higher cost</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">When to Choose Each</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>DC coupling:</strong> New installations, maximum efficiency priority</li>
                <li><strong>AC coupling:</strong> Retrofits, existing solar systems, brand mixing</li>
                <li><strong>Hybrid approach:</strong> Some systems support both simultaneously</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Battery Capacity Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate battery sizing ensures the system meets energy requirements while avoiding oversizing that increases costs without proportional benefits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sizing Methodology:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Determine daily energy consumption (kWh)</li>
                <li><strong>Step 2:</strong> Identify evening/night consumption (solar unavailable)</li>
                <li><strong>Step 3:</strong> Define autonomy requirement (hours or days)</li>
                <li><strong>Step 4:</strong> Apply depth of discharge factor (80-95%)</li>
                <li><strong>Step 5:</strong> Apply efficiency factor (90-95%)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Calculation Example:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Evening consumption:</strong> 8 kWh (5pm to 7am)</li>
                <li><strong>Desired autonomy:</strong> 1 day</li>
                <li><strong>Required energy:</strong> 8 kWh</li>
                <li><strong>DoD factor (90%):</strong> 8 / 0.9 = 8.9 kWh</li>
                <li><strong>Efficiency (95%):</strong> 8.9 / 0.95 = 9.4 kWh nominal</li>
                <li><strong>Recommended:</strong> 10 kWh battery system</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">UK Residential Guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Small household:</strong> 5-8 kWh for basic self-consumption</li>
                <li><strong>Average household:</strong> 8-13 kWh for good autonomy</li>
                <li><strong>Large household:</strong> 13-20 kWh for extended backup</li>
                <li><strong>Rule of thumb:</strong> 1-1.5 kWh per kWp of solar</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Inverter Power Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inverter sizing must account for maximum load, inrush currents, power factor, and operational headroom to ensure reliable system operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Load Analysis:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Continuous loads:</strong> Base load that runs constantly</li>
                <li><strong>Intermittent loads:</strong> Appliances that cycle on/off</li>
                <li><strong>Peak loads:</strong> Maximum simultaneous demand</li>
                <li><strong>Inrush currents:</strong> Motor starting (3-6x rated current)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sizing Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Maximum demand:</strong> Sum of likely simultaneous loads</li>
                <li><strong>Safety margin:</strong> Add 25-30% above calculated maximum</li>
                <li><strong>Power factor:</strong> Consider reactive power requirements</li>
                <li><strong>Temperature derating:</strong> Reduce rating for high ambient temps</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example Calculation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Maximum load:</strong> 5 kW simultaneous</li>
                <li><strong>Inrush allowance:</strong> Additional 2 kW for motor starts</li>
                <li><strong>Total requirement:</strong> 7 kW peak</li>
                <li><strong>With margin:</strong> 7 x 1.3 = 9.1 kW</li>
                <li><strong>Selected inverter:</strong> 10 kW rated unit</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Grid Connection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Grid connection requirements affect system design, sizing, and installation procedures. Understanding DNO requirements ensures compliant installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">G98/G99 Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>G98:</strong> Simplified connection up to 16A per phase (3.68kW single-phase)</li>
                <li><strong>G99:</strong> Full application required above G98 limits</li>
                <li><strong>Export limitation:</strong> May be required in constrained areas</li>
                <li><strong>Protection settings:</strong> Must comply with ENA requirements</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inverter Compliance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>G98/G99 certification:</strong> Essential for grid connection</li>
                <li><strong>Anti-islanding:</strong> Must disconnect within 0.5 seconds</li>
                <li><strong>Frequency response:</strong> Rate of change of frequency (RoCoF)</li>
                <li><strong>Voltage ride-through:</strong> Response to grid disturbances</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Documentation Required</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>G98:</strong> Notification to DNO before energisation</li>
                <li><strong>G99:</strong> Full application and approval before installation</li>
                <li><strong>Commissioning:</strong> G98/G99 commissioning confirmation form</li>
                <li><strong>Certification:</strong> MCS or equivalent for FIT/SEG eligibility</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with load analysis before selecting equipment</li>
                <li>Consider future expansion when sizing inverter capacity</li>
                <li>Match battery voltage to inverter specifications carefully</li>
                <li>Allow for efficiency losses in all calculations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Equipment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify G98/G99 certification before purchase</li>
                <li>Check battery compatibility with chosen inverter</li>
                <li>Ensure adequate MPPT channels for solar configuration</li>
                <li>Confirm EPS/backup capability meets requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersizing inverter</strong> - causes trips and limits capability</li>
                <li><strong>Ignoring inrush currents</strong> - undersizes for motor loads</li>
                <li><strong>Wrong coupling choice</strong> - inefficient for new installs</li>
                <li><strong>Missing DNO notification</strong> - non-compliant installation</li>
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

export default RenewableEnergyModule4Section3;
