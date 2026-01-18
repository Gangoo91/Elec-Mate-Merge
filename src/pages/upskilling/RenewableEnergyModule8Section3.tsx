import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "DNO Application Processes (G98, G99) - Renewable Energy Module 8";
const DESCRIPTION = "Master Distribution Network Operator application processes including G98 notification for smaller systems and G99 applications for larger installations connecting to the electricity grid.";

const quickCheckQuestions = [
  {
    id: "dno-check-1",
    question: "What is the maximum single-phase export capacity allowed under G98 notification?",
    options: [
      "3.68kW",
      "5kW",
      "10kW",
      "16kW"
    ],
    correctIndex: 0,
    explanation: "G98 allows single-phase systems up to 3.68kW export capacity (16A at 230V) to connect via simple notification process, without requiring full DNO application and assessment."
  },
  {
    id: "dno-check-2",
    question: "When must a G99 application be submitted to the DNO?",
    options: [
      "For any renewable installation",
      "When export capacity exceeds G98 limits or other criteria are met",
      "Only for three-phase installations",
      "Only for commercial installations"
    ],
    correctIndex: 1,
    explanation: "G99 applications are required when installations exceed G98 limits (over 3.68kW single-phase or 11.04kW three-phase), connect to 11kV networks, or meet other specific criteria requiring DNO assessment."
  },
  {
    id: "dno-check-3",
    question: "What does the term 'export limitation' mean in grid connection?",
    options: [
      "Limiting the total system size",
      "Restricting the amount of power that can be exported to the grid",
      "Limiting battery charging rates",
      "Restricting installation locations"
    ],
    correctIndex: 1,
    explanation: "Export limitation restricts the amount of power a system can export to the grid, either through device settings or dedicated export limiting equipment. This may enable larger systems to connect under G98."
  },
  {
    id: "dno-check-4",
    question: "What protection function must all grid-connected inverters provide?",
    options: [
      "Surge protection only",
      "Loss of mains (G98/G99 compliant) protection",
      "Lightning protection",
      "Overcurrent protection only"
    ],
    correctIndex: 1,
    explanation: "All grid-connected inverters must provide G98/G99 compliant loss of mains protection, disconnecting the generator if the grid supply fails to prevent energising the network during outages."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What replaced the older G83 and G59 standards for grid connection?",
    options: [
      "G100 and G101",
      "G98 and G99",
      "ENA EREC G5",
      "BS EN 50549"
    ],
    correctAnswer: 1,
    explanation: "G98 replaced G83 for smaller connections (simple notification) and G99 replaced G59 for larger connections (full application). These updated standards align with European requirements."
  },
  {
    id: 2,
    question: "What is the maximum three-phase export capacity under G98?",
    options: [
      "3.68kW",
      "7.36kW",
      "11.04kW",
      "16kW"
    ],
    correctAnswer: 2,
    explanation: "G98 allows three-phase systems up to 11.04kW total export capacity (3.68kW per phase, 16A at 230V per phase) to connect via the simple notification process."
  },
  {
    id: 3,
    question: "What information is required for a G98 notification?",
    options: [
      "Customer name only",
      "MPAN, installer details, equipment details, and installation date",
      "Full network study",
      "Customer income details"
    ],
    correctAnswer: 1,
    explanation: "G98 notification requires the MPAN (Meter Point Administration Number), installer and customer details, equipment specifications (inverter type, capacity), and commissioning date."
  },
  {
    id: 4,
    question: "What is an MPAN and why is it important for DNO applications?",
    options: [
      "Maximum Power Available Number - determines system size",
      "Meter Point Administration Number - unique identifier for the supply point",
      "Main Panel Access Number - for meter access",
      "Metering Protocol Application Number - for smart meters"
    ],
    correctAnswer: 1,
    explanation: "The MPAN (Meter Point Administration Number) is the unique 21-digit identifier for each electricity supply point, essential for DNO applications as it identifies the specific connection location."
  },
  {
    id: 5,
    question: "What is a Statement of Works issued by a DNO?",
    options: [
      "Invoice for connection charges",
      "Document specifying network reinforcement requirements and costs",
      "Installation certificate",
      "Planning permission"
    ],
    correctAnswer: 1,
    explanation: "A Statement of Works specifies any network reinforcement work required to accommodate the proposed generation, along with associated costs and timescales. This follows G99 application assessment."
  },
  {
    id: 6,
    question: "What does 'Type A' generation refer to in G99?",
    options: [
      "Generation up to 1MW",
      "Generation between 1MW and 10MW",
      "Generation over 10MW",
      "All domestic generation"
    ],
    correctAnswer: 0,
    explanation: "G99 categorises generators by size. Type A covers installations up to 1MW, Type B covers 1-10MW, Type C covers 10-50MW, and Type D covers over 50MW, with increasing application requirements."
  },
  {
    id: 7,
    question: "What is the purpose of anti-islanding protection in solar inverters?",
    options: [
      "To protect against power surges",
      "To prevent the system energising the grid during a power cut",
      "To maximise energy production",
      "To enable battery backup"
    ],
    correctAnswer: 1,
    explanation: "Anti-islanding (loss of mains) protection ensures the inverter disconnects from the grid if the mains supply fails, preventing the PV system from energising the network and endangering line workers."
  },
  {
    id: 8,
    question: "How long do DNOs typically have to respond to G98 notifications?",
    options: [
      "24 hours",
      "10 working days",
      "28 days",
      "No response required - it's a notification"
    ],
    correctAnswer: 3,
    explanation: "G98 is a notification process, not an application requiring approval. You notify the DNO before commissioning, and unless they contact you with concerns, you can proceed after the notification period."
  },
  {
    id: 9,
    question: "What factor might trigger a G99 application requirement for a system below G98 capacity limits?",
    options: [
      "Customer preference",
      "Existing generation already at the premises",
      "Type of solar panels used",
      "Roof orientation"
    ],
    correctAnswer: 1,
    explanation: "If existing generation at the premises means total capacity would exceed G98 limits, or if connecting to an 11kV supply, a G99 application may be required even for smaller new installations."
  },
  {
    id: 10,
    question: "What is the role of the Energy Networks Association (ENA) regarding G98/G99?",
    options: [
      "They manufacture inverters",
      "They publish the G98 and G99 connection standards",
      "They own the electricity networks",
      "They process all applications"
    ],
    correctAnswer: 1,
    explanation: "The Energy Networks Association (ENA) develops and publishes the G98 and G99 Engineering Recommendations that standardise connection requirements across all UK Distribution Network Operators."
  }
];

const faqs = [
  {
    question: "Can I commission a system before receiving DNO confirmation?",
    answer: "For G98 notifications, you can proceed after submitting the notification - it is an information process, not an approval process. However, it is good practice to wait for acknowledgement and check for any DNO concerns. For G99 applications, you must receive formal connection approval before energising the system."
  },
  {
    question: "What happens if the DNO identifies network constraints?",
    answer: "For G98 systems, the DNO may contact you to discuss export limitation or other solutions. For G99, the assessment may identify that network reinforcement is required before connection can proceed. The DNO issues a Statement of Works detailing requirements, costs, and timescales. Connection charges or export limitations may apply."
  },
  {
    question: "How do I submit G98 and G99 applications?",
    answer: "Most DNOs provide online portals for G98 notifications and G99 applications. You will need the MPAN, customer details, equipment specifications, and site information. G99 applications require more detailed technical information and may involve application fees depending on the DNO and project size."
  },
  {
    question: "What is export limitation and when should I use it?",
    answer: "Export limitation restricts grid export to a specified level, typically using inverter settings or dedicated limiting devices. It enables installation of larger PV systems within G98 limits by capping export at 3.68kW single-phase or 11.04kW three-phase. This is useful when self-consumption is high or when avoiding G99 application costs and delays."
  },
  {
    question: "Do battery storage systems require separate DNO notification?",
    answer: "Battery systems that export to the grid are treated as generating equipment and must be included in DNO notifications. The combined export capacity of all generation (PV, wind, battery) determines whether G98 or G99 applies. AC-coupled batteries that can export are included; DC-coupled systems integrated within PV system capacity may be covered by the PV notification."
  },
  {
    question: "How long does the G99 application process take?",
    answer: "G99 timescales vary depending on project size and network complexity. Initial assessment typically takes 45-65 working days for Type A installations. If network reinforcement is required, this extends the process significantly. Complex applications or those requiring detailed network studies may take several months. Always factor this into project timelines."
  }
];

const RenewableEnergyModule8Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="..">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">DNO Application Processes</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 8 - Section 3</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          DNO Application Processes
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          G98 notifications and G99 applications for grid-connected renewable energy systems
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">G98:</span> Simple notification for systems up to 3.68kW single-phase
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">G99:</span> Full application for larger systems requiring assessment
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Export Limitation:</span> Enables larger systems within G98 limits
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Loss of Mains:</span> Essential protection for all grid connections
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "G98 notification requirements and process",
            "G99 application procedures for larger systems",
            "Export limitation strategies and implementation",
            "Loss of mains protection requirements",
            "DNO connection assessment processes"
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
            <h2 className="text-xl font-semibold text-white">Understanding DNO Requirements</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Distribution Network Operators (DNOs) are responsible for operating and maintaining the local electricity distribution networks that connect premises to the national transmission system. When installing generation equipment that connects to these networks, you must follow DNO requirements.
            </p>
            <p>
              The Energy Networks Association (ENA) publishes Engineering Recommendations that standardise connection requirements across all DNOs. G98 and G99 are the current standards for connecting small-scale generation (up to 50MW) to the distribution network.
            </p>
            <p>
              <span className="text-white font-medium">G98 - Simple Notification:</span> For smaller installations within specified limits, G98 provides a streamlined notification process. You inform the DNO of the installation, and unless they raise concerns, you can proceed with commissioning.
            </p>
            <p>
              <span className="text-white font-medium">G99 - Full Application:</span> Larger installations require full G99 applications, which involve detailed assessment by the DNO to determine if the network can accommodate the generation without reinforcement.
            </p>
            <p>
              Understanding which process applies, and following it correctly, is essential for legal compliance and ensuring systems can operate safely alongside the distribution network.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">G98 Notification Process</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              G98 covers installations with export capacity up to 3.68kW per phase. For single-phase connections, this means up to 3.68kW total. For three-phase connections, up to 11.04kW total (3.68kW per phase).
            </p>
            <p>
              <span className="text-white font-medium">Notification Requirements:</span> G98 notification must be submitted to the DNO before commissioning. Most DNOs provide online portals for this. Required information includes the MPAN (Meter Point Administration Number), customer details, installer details, equipment specifications (inverter make, model, capacity), and planned commissioning date.
            </p>
            <p>
              <span className="text-white font-medium">Equipment Compliance:</span> All equipment must be Type Tested and certified as G98 compliant. Inverter manufacturers provide declarations of conformity confirming compliance with the required standards. Using non-compliant equipment is not permitted.
            </p>
            <p>
              <span className="text-white font-medium">Multiple Installations:</span> Where multiple generating installations exist at a premises, the total export capacity determines the applicable standard. Adding generation to a site with existing equipment may trigger G99 requirements even if the new installation alone would qualify for G98.
            </p>
            <p>
              <span className="text-white font-medium">Documentation:</span> Retain copies of G98 notifications and any DNO correspondence as part of installation records. MCS requires evidence of DNO notification for registered installations.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">G99 Application Process</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              G99 applies to installations exceeding G98 limits or meeting other criteria such as connection to 11kV networks. The application process involves DNO assessment of network capacity and may require detailed technical information.
            </p>
            <p>
              <span className="text-white font-medium">Application Stages:</span> G99 applications typically follow a staged process. Initial application and assessment, followed by connection offer or Statement of Works if reinforcement is needed, then acceptance and connection agreement, and finally commissioning and energisation.
            </p>
            <p>
              <span className="text-white font-medium">Technical Information:</span> G99 applications require detailed technical information including single line diagrams, protection settings, equipment specifications, and site plans. The level of detail increases with installation size.
            </p>
            <p>
              <span className="text-white font-medium">Generator Categories:</span> G99 categorises generators by size. Type A (up to 1MW), Type B (1-10MW), Type C (10-50MW), and Type D (over 50MW). Requirements increase with category, with Type A having the simplest requirements.
            </p>
            <p>
              <span className="text-white font-medium">Timescales and Costs:</span> DNOs have specified timescales for processing applications, typically 45-65 working days for Type A initial assessment. Application fees may apply, and if network reinforcement is required, substantial costs and delays can result.
            </p>
            <p>
              <span className="text-white font-medium">Connection Offers:</span> Following assessment, the DNO issues a connection offer specifying terms, conditions, and any charges. You must accept the offer to proceed. Offers have validity periods, and accepting commits you to the terms.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Export Limitation Strategies</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Export limitation restricts the amount of power a system can export to the grid, regardless of total generation capacity. This strategy enables larger systems to connect under G98 by capping export within the allowable limits.
            </p>
            <p>
              <span className="text-white font-medium">Why Use Export Limitation:</span> A customer with high daytime consumption might benefit from a larger PV system but rarely export significant power. Export limitation allows installation of, for example, a 6kW system while limiting export to 3.68kW, avoiding G99 processes.
            </p>
            <p>
              <span className="text-white font-medium">Implementation Methods:</span> Export limitation can be achieved through inverter settings (software limits), dedicated export limiting devices that monitor export and curtail generation, or dynamic export control that responds to consumption patterns.
            </p>
            <p>
              <span className="text-white font-medium">Zero Export Systems:</span> Some installations are configured for zero export, where all generation is consumed on-site or stored. This may be appropriate where grid export is not possible or not economically viable.
            </p>
            <p>
              <span className="text-white font-medium">Documentation:</span> When using export limitation to qualify for G98, document the export limit settings and include this in the DNO notification. Ensure the customer understands the limitation and its implications for their expected generation use.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Protection and Compliance Requirements</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Grid-connected generation must incorporate protection systems that maintain network safety and stability. The primary requirement is Loss of Mains (LoM) protection, which disconnects the generator if the grid supply fails.
            </p>
            <p>
              <span className="text-white font-medium">Loss of Mains Protection:</span> All G98 and G99 compliant inverters must include LoM protection that detects grid failure and disconnects within specified time limits. This prevents "islanding" where generation continues to energise a disconnected network section.
            </p>
            <p>
              <span className="text-white font-medium">Protection Settings:</span> G98/G99 specify protection settings for voltage and frequency limits. Inverters must disconnect if voltage or frequency moves outside defined ranges, indicating network abnormality. These settings are typically factory-configured and should not be modified.
            </p>
            <p>
              <span className="text-white font-medium">Reconnection Delays:</span> After a grid disturbance, inverters must wait a specified period before reconnecting to ensure the grid has stabilised. This prevents repeated connection attempts during unstable conditions.
            </p>
            <p>
              <span className="text-white font-medium">Testing and Verification:</span> During commissioning, verify that protection functions operate correctly. This includes checking that the inverter disconnects when isolated from the grid and that protection settings match G98/G99 requirements.
            </p>
            <p>
              <span className="text-white font-medium">Type Testing:</span> Equipment must be Type Tested to G98/G99 requirements by accredited laboratories. Manufacturers provide Type Test certificates confirming compliance. Installing non-Type Tested equipment is not permitted for grid connection.
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
              <span className="text-white font-medium">Identify the DNO early:</span> Different DNOs have different application processes, portal systems, and fee structures. Identify the relevant DNO at survey stage and familiarise yourself with their specific requirements.
            </p>
            <p>
              <span className="text-white font-medium">Obtain MPAN accurately:</span> The MPAN is essential for all DNO communications. Obtain it from recent electricity bills or the meter itself. Incorrect MPANs cause application delays.
            </p>
            <p>
              <span className="text-white font-medium">Plan for G99 timescales:</span> If G99 application is likely, factor extended timescales into project planning. Customer expectations should be managed regarding connection dates when DNO assessment is required.
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
          title="DNO Application Processes Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-2">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-4">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule8Section3;
