import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Distribution Board Design - HNC Module 7 Section 6.1";
const DESCRIPTION = "Master distribution board design for electrical installations: board layouts, circuit groupings per BS 7671, labelling requirements, IP ratings, cable entry/exit, accessibility, spare capacity, and type designations.";

const quickCheckQuestions = [
  {
    id: "db-type-designation",
    question: "What does a Type B distribution board designation indicate according to BS EN 61439-3?",
    options: ["A board with basic insulation only", "A board designed for use by ordinary persons (non-skilled)", "A board with IP65 rating", "A board for three-phase supplies only"],
    correctIndex: 1,
    explanation: "Type B distribution boards (DBO) are designed for use by ordinary persons (non-skilled) and must have all live parts behind a barrier or enclosure that requires a tool to remove. Type A boards are for skilled persons only."
  },
  {
    id: "circuit-grouping",
    question: "According to BS 7671, which circuits should NOT share a common enclosure without appropriate barriers?",
    options: ["Lighting and socket circuits", "Ring final circuits and radial circuits", "SELV/PELV circuits and circuits exceeding 50V AC", "Single-phase and three-phase circuits"],
    correctIndex: 2,
    explanation: "BS 7671 Regulation 528.1 requires that SELV and PELV circuits must be separated from circuits of other systems, typically by a barrier, partition, or separate enclosure to maintain the integrity of the separated extra-low voltage system."
  },
  {
    id: "ip-rating",
    question: "What minimum IP rating is typically required for a distribution board installed in an external location?",
    options: ["IP2X", "IP20", "IP44", "IP65"],
    correctIndex: 3,
    explanation: "External distribution boards typically require IP65 rating minimum (dust tight and protected against water jets from any direction). IP44 may be acceptable in sheltered locations, but IP65 provides better protection for exposed external installations."
  },
  {
    id: "spare-capacity",
    question: "What is the recommended minimum spare capacity when designing a new distribution board installation?",
    options: ["5%", "10%", "20%", "30%"],
    correctIndex: 2,
    explanation: "Industry best practice recommends a minimum of 20% spare capacity (spare ways) in distribution boards to accommodate future circuit additions without the need for board replacement or additional enclosures."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS EN 61439-3, what is the maximum rated current for a distribution board classified as a DBO?",
    options: [
      "63A",
      "125A",
      "250A",
      "400A"
    ],
    correctAnswer: 2,
    explanation: "BS EN 61439-3 specifies that distribution boards for operation by ordinary persons (DBO) have a maximum rated current of 250A. Boards exceeding this are classified differently and require professional operation."
  },
  {
    id: 2,
    question: "What does the 'X' in an IP rating indicate?",
    options: ["Maximum protection level", "Extended protection", "No specific requirement for that digit", "Explosion proof"],
    correctAnswer: 2,
    explanation: "The 'X' in an IP rating indicates that no specific protection level is defined for that characteristic. For example, IPX4 means no solid object protection is specified, but it has protection against water splashing."
  },
  {
    id: 3,
    question: "When designing distribution board layouts, circuits should be arranged so that:",
    options: ["All MCBs are the same rating", "Higher rated circuits are at the bottom", "Circuits are grouped by function with clear labelling", "Three-phase circuits are always on the left side"],
    correctAnswer: 2,
    explanation: "Best practice requires circuits to be logically grouped by function (lighting, power, specialist loads) with clear labelling. This aids maintenance, fault finding, and ensures safe isolation of specific areas or systems."
  },
  {
    id: 4,
    question: "What is the purpose of a busbar chamber within a distribution board?",
    options: [
      "To provide additional cable termination space",
      "To house the incoming supply and main switch",
      "To distribute incoming supply to outgoing circuit protective devices",
      "To contain the earth bar only"
    ],
    correctAnswer: 2,
    explanation: "The busbar chamber houses the busbars that distribute the incoming supply to all outgoing circuit protective devices. It must be adequately rated for the prospective fault current and properly shrouded for safety."
  },
  {
    id: 5,
    question: "BS 7671 requires that distribution board circuit charts must include:",
    options: [
      "The installation date only",
      "Nominal current and type of protective device, circuit designation, and points served",
      "Only the electrician's contact details",
      "Cable colours used throughout"
    ],
    correctAnswer: 1,
    explanation: "Regulation 514.9.1 requires circuit charts to show the nominal current and type of protective device for each circuit, along with circuit designation and reference to the points served or areas covered."
  },
  {
    id: 6,
    question: "What consideration must be given to cable entry when designing distribution boards?",
    options: [
      "Cables can enter from any direction without planning",
      "All cables must enter from the top only",
      "Entry positions must allow adequate bending radii and heat dissipation",
      "Cable glands are only required for outdoor installations"
    ],
    correctAnswer: 2,
    explanation: "Cable entry design must consider minimum bending radii for cable types used, adequate space for termination, heat dissipation requirements, and appropriate glands or bushings to maintain the IP rating of the enclosure."
  },
  {
    id: 7,
    question: "What is the significance of a distribution board's form of separation (Form 1, 2, 3, or 4)?",
    options: [
      "It indicates the board's voltage rating",
      "It defines the level of internal segregation between functional units",
      "It shows the maximum number of circuits",
      "It indicates the enclosure material type"
    ],
    correctAnswer: 1,
    explanation: "Forms of separation (Forms 1-4) define the degree of internal segregation between functional units, busbars, and terminals. Higher form numbers provide greater separation, reducing risks during maintenance and improving safety."
  },
  {
    id: 8,
    question: "When selecting a distribution board location, which factor is LEAST important?",
    options: [
      "Accessibility for operation and maintenance",
      "Proximity to main earthing terminal",
      "The board manufacturer's brand reputation",
      "Environmental conditions and required IP rating"
    ],
    correctAnswer: 2,
    explanation: "While quality is important, brand reputation is not a technical installation factor. Key considerations are accessibility, earthing arrangements, environmental conditions, cable routing, and compliance with building regulations."
  },
  {
    id: 9,
    question: "According to Regulation 132.12, what must be considered when grouping circuits in a distribution board?",
    options: [
      "Only the cable colours used",
      "The need to avoid danger and minimise inconvenience in the event of a fault",
      "That all circuits must be the same rating",
      "The installation company's standard practices"
    ],
    correctAnswer: 1,
    explanation: "Regulation 132.12 requires that circuits be arranged to avoid danger and minimise inconvenience in the event of a fault. This means essential circuits may need separate RCDs, and critical loads should be distributed appropriately."
  },
  {
    id: 10,
    question: "What documentation must be provided with a completed distribution board installation?",
    options: [
      "Only the manufacturer's data sheet",
      "Circuit chart, test results, and warning labels as required by BS 7671",
      "Only the electrical installation certificate",
      "A photograph of the completed installation"
    ],
    correctAnswer: 1,
    explanation: "A completed installation requires: circuit chart/schedule (Reg 514.9.1), appropriate warning labels, test results recorded on the electrical installation certificate, and operating instructions where necessary."
  },
  {
    id: 11,
    question: "What is the primary purpose of selecting an appropriate IP rating for a distribution board?",
    options: [
      "To ensure the board matches other equipment aesthetically",
      "To protect internal components from ingress of solid objects and moisture",
      "To reduce the installation cost",
      "To simplify cable termination"
    ],
    correctAnswer: 1,
    explanation: "IP ratings define the level of protection against ingress of solid objects (first digit) and moisture (second digit). Selecting the appropriate rating ensures the board's internal components remain protected in the intended installation environment."
  },
  {
    id: 12,
    question: "When designing a three-phase distribution board, what must be considered regarding load balancing?",
    options: [
      "All single-phase loads can be connected to one phase",
      "Loads should be distributed across phases to minimise neutral current",
      "Only the red phase should carry lighting loads",
      "Load balancing is only required for industrial installations"
    ],
    correctAnswer: 1,
    explanation: "Loads should be distributed evenly across all three phases to minimise neutral current and prevent overloading of individual phases. Unbalanced loads can cause excessive neutral currents and voltage imbalances."
  }
];

const faqs = [
  {
    question: "What is the difference between Type A and Type B distribution boards?",
    answer: "Type A distribution boards (DBO-A) are designed for use by skilled persons only (electricians), where live parts may be accessible during normal operation. Type B boards (DBO-B) are designed for use by ordinary persons (non-skilled) and must have all live parts behind barriers or enclosures requiring a tool to remove. In domestic and most commercial installations, Type B boards are required to protect untrained users from electric shock."
  },
  {
    question: "How do I determine the required IP rating for a distribution board?",
    answer: "The IP rating depends on the installation environment. Indoor dry locations typically require IP2X or IP20 minimum. Bathrooms and wet areas need IP44 or higher. External locations generally require IP65 or IP66. Industrial environments with dust require the first digit to be at least 5 (dust protected) or 6 (dust tight). Always assess the specific environmental conditions including temperature, humidity, potential for water ingress, and presence of dust or solid particles."
  },
  {
    question: "Why is spare capacity important in distribution board design?",
    answer: "Spare capacity (typically 20% minimum) allows for future circuit additions without replacing the entire board. It accommodates changes in building use, additional equipment, and technology upgrades. Without spare capacity, future modifications require either a new board installation or additional sub-distribution boards, increasing costs significantly. Spare ways also provide flexibility during fault conditions to temporarily re-route circuits."
  },
  {
    question: "What are the Forms of Separation and when are they required?",
    answer: "Forms 1-4 define internal segregation levels. Form 1 has no separation between functional units. Form 2 separates busbars from functional units. Form 3 also separates functional units from each other. Form 4 additionally separates outgoing terminals within each functional unit. Higher forms are typically required where different contractors may work on different sections, or where maintenance work must be carried out with adjacent circuits live."
  },
  {
    question: "How should circuits be grouped within a distribution board?",
    answer: "Circuits should be logically grouped by function (lighting, socket outlets, fixed equipment), location (floor or zone), and protective device type (RCD-protected circuits together). Critical circuits should be on separate protective devices to prevent total loss of supply. BS 7671 Regulation 314.1 requires division of the installation to avoid danger and minimise inconvenience in the event of a fault, and to facilitate safe inspection, testing, and maintenance."
  },
  {
    question: "What labelling requirements apply to distribution boards?",
    answer: "BS 7671 requires a durable circuit chart (Regulation 514.9.1) showing: circuit number, nominal current and type of each protective device, circuit designation, and reference to points served. Warning labels are required for RCDs (quarterly test notice), dual supplies if present, and where nominal voltage exceeds 230V. Labels must be clear, legible, and durable for the expected lifetime of the installation. The main switch must be clearly identified."
  }
];

const HNCModule7Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6">
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
            <span>Module 7.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Distribution Board Design
          </h1>
          <p className="text-white/80">
            Board layouts, circuit groupings, labelling, IP ratings, and installation considerations for electrical distribution
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Type A/B:</strong> Skilled vs ordinary person operation</li>
              <li className="pl-1"><strong>IP ratings:</strong> Protection against ingress (IP20 to IP66)</li>
              <li className="pl-1"><strong>Circuit grouping:</strong> Function, location, and RCD allocation</li>
              <li className="pl-1"><strong>Spare capacity:</strong> Minimum 20% for future expansion</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS EN 61439-3:</strong> Low-voltage switchgear assemblies</li>
              <li className="pl-1"><strong>BS 7671:</strong> Regulations 132.12, 314.1, 514.9</li>
              <li className="pl-1"><strong>BS EN 60529:</strong> IP rating classification</li>
              <li className="pl-1"><strong>Forms 1-4:</strong> Internal separation requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate distribution board types per BS EN 61439-3",
              "Apply IP rating requirements for different environments",
              "Design circuit groupings compliant with BS 7671",
              "Specify labelling and documentation requirements",
              "Plan cable entry, exit, and termination arrangements",
              "Determine spare capacity and future expansion provisions"
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

        {/* Section 1: Board Types and Designations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Board Types and Designations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Distribution boards are classified according to BS EN 61439-3, which defines requirements for
              low-voltage switchgear and controlgear assemblies. Understanding board designations is essential
              for specifying appropriate equipment for each installation environment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key board type classifications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DBO (Type B):</strong> Distribution boards for operation by ordinary persons - live parts inaccessible</li>
                <li className="pl-1"><strong>DBO-A (Type A):</strong> For skilled persons only - live parts may be accessible during normal use</li>
                <li className="pl-1"><strong>Consumer unit:</strong> Specific type of DBO for domestic installations with integral main switch</li>
                <li className="pl-1"><strong>Sub-distribution board:</strong> Fed from main board, distributing to local final circuits</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Board Type Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Installation Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Board Designation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Domestic</td>
                      <td className="border border-white/10 px-3 py-2">Consumer unit (Type B)</td>
                      <td className="border border-white/10 px-3 py-2">Non-combustible enclosure, integral main switch</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commercial office</td>
                      <td className="border border-white/10 px-3 py-2">DBO-B</td>
                      <td className="border border-white/10 px-3 py-2">Tool-only access to live parts, IP2X minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial</td>
                      <td className="border border-white/10 px-3 py-2">DBO-A or DBO-B</td>
                      <td className="border border-white/10 px-3 py-2">Form of separation, higher IP rating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant room</td>
                      <td className="border border-white/10 px-3 py-2">DBO-A (restricted access)</td>
                      <td className="border border-white/10 px-3 py-2">Higher forms of separation, dust/moisture protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External</td>
                      <td className="border border-white/10 px-3 py-2">DBO-B with IP65+</td>
                      <td className="border border-white/10 px-3 py-2">Weather protection, UV-resistant materials</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Always specify Type B (DBO-B) boards unless the installation is in a restricted access area operated exclusively by skilled persons.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: IP Ratings and Environmental Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            IP Ratings and Environmental Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IP (Ingress Protection) ratings defined by BS EN 60529 specify the level of protection
              provided by enclosures against solid objects and moisture. Correct IP rating selection
              ensures distribution board reliability and safety throughout its service life.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">First Digit - Solid Objects</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>0:</strong> No protection</li>
                  <li className="pl-1"><strong>1:</strong> Objects &gt;50mm (hand)</li>
                  <li className="pl-1"><strong>2:</strong> Objects &gt;12.5mm (finger)</li>
                  <li className="pl-1"><strong>3:</strong> Objects &gt;2.5mm (tools)</li>
                  <li className="pl-1"><strong>4:</strong> Objects &gt;1mm (wires)</li>
                  <li className="pl-1"><strong>5:</strong> Dust protected</li>
                  <li className="pl-1"><strong>6:</strong> Dust tight</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Second Digit - Moisture</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>0:</strong> No protection</li>
                  <li className="pl-1"><strong>1:</strong> Vertical dripping water</li>
                  <li className="pl-1"><strong>2:</strong> Dripping water (15° tilt)</li>
                  <li className="pl-1"><strong>3:</strong> Spraying water (60°)</li>
                  <li className="pl-1"><strong>4:</strong> Splashing water</li>
                  <li className="pl-1"><strong>5:</strong> Water jets</li>
                  <li className="pl-1"><strong>6:</strong> Powerful water jets</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Rating Selection by Location</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum IP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Indoor dry (office, home)</td>
                      <td className="border border-white/10 px-3 py-2">IP2X</td>
                      <td className="border border-white/10 px-3 py-2">IP20 or IP30</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kitchen/utility</td>
                      <td className="border border-white/10 px-3 py-2">IP2X</td>
                      <td className="border border-white/10 px-3 py-2">IP40 or IP41</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bathroom (outside zones)</td>
                      <td className="border border-white/10 px-3 py-2">IP44</td>
                      <td className="border border-white/10 px-3 py-2">IP44</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External sheltered</td>
                      <td className="border border-white/10 px-3 py-2">IP44</td>
                      <td className="border border-white/10 px-3 py-2">IP55</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External exposed</td>
                      <td className="border border-white/10 px-3 py-2">IP55</td>
                      <td className="border border-white/10 px-3 py-2">IP65 or IP66</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial dusty</td>
                      <td className="border border-white/10 px-3 py-2">IP5X</td>
                      <td className="border border-white/10 px-3 py-2">IP54 or IP55</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wash-down areas</td>
                      <td className="border border-white/10 px-3 py-2">IP65</td>
                      <td className="border border-white/10 px-3 py-2">IP66 or IP67</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> IP ratings apply with the enclosure closed. Cable entries must be properly sealed with appropriate glands to maintain the rated protection level.
            </p>
          </div>
        </section>

        {/* Section 3: Circuit Groupings and Layout Design */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Circuit Groupings and Layout Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective circuit grouping within distribution boards is governed by BS 7671 Regulation 314.1,
              which requires installations to be divided into circuits to avoid danger and minimise
              inconvenience in the event of a fault, while facilitating safe operation, inspection, and maintenance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">BS 7671 Circuit Division Requirements (Reg 314.1)</p>
              <ul className="text-sm space-y-1">
                <li>- Separate circuits for different parts of the installation</li>
                <li>- Avoid danger from failure of a single circuit</li>
                <li>- Minimise possibility of unwanted tripping of RCDs</li>
                <li>- Reduce effects of electromagnetic interference</li>
                <li>- Consider load characteristics (harmonics, starting currents)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Circuit Groupings</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lighting circuits:</strong> Separate from socket circuits; consider emergency lighting on dedicated supply</li>
                <li className="pl-1"><strong>Socket outlets:</strong> Ring finals or radials grouped by area or floor</li>
                <li className="pl-1"><strong>Fixed equipment:</strong> Individual circuits for large loads (cookers, showers, immersion heaters)</li>
                <li className="pl-1"><strong>Safety circuits:</strong> Fire alarm, emergency lighting, security on separate RCDs or non-RCD protected</li>
                <li className="pl-1"><strong>SELV/PELV:</strong> Must be segregated from higher voltage circuits per Regulation 528.1</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Allocation Strategy</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RCD Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Allocation Guidance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlets up to 32A</td>
                      <td className="border border-white/10 px-3 py-2">30mA RCD required</td>
                      <td className="border border-white/10 px-3 py-2">Distribute across multiple RCDs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting circuits</td>
                      <td className="border border-white/10 px-3 py-2">30mA RCD (most cases)</td>
                      <td className="border border-white/10 px-3 py-2">Separate RCD from sockets where possible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outdoor circuits</td>
                      <td className="border border-white/10 px-3 py-2">30mA RCD required</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated RCD recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Freezers/fridges</td>
                      <td className="border border-white/10 px-3 py-2">RCD protected</td>
                      <td className="border border-white/10 px-3 py-2">Separate RCD to avoid food spoilage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm</td>
                      <td className="border border-white/10 px-3 py-2">May be non-RCD</td>
                      <td className="border border-white/10 px-3 py-2">Risk assessment required per Reg 411.3.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design tip:</strong> Use dual RCD consumer units or split-load boards to distribute circuits across two RCDs, ensuring loss of one RCD does not cause total loss of lighting or power.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Labelling, Documentation, and Installation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Labelling, Documentation, and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Regulation 514.9.1 mandates comprehensive labelling and documentation for distribution
              boards. Proper identification enables safe operation, efficient fault diagnosis, and compliant
              periodic inspection throughout the installation's lifetime.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Circuit Chart Information (Reg 514.9.1)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Mandatory Elements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>- Circuit number/reference</li>
                    <li>- Type of protective device (MCB, RCBO, etc.)</li>
                    <li>- Nominal current rating (In)</li>
                    <li>- Circuit designation/description</li>
                    <li>- Points served or area covered</li>
                    <li>- Number of points (where applicable)</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Additional Best Practice</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>- Cable type and size</li>
                    <li>- RCD rating if applicable</li>
                    <li>- Test results summary</li>
                    <li>- Date of installation/last test</li>
                    <li>- Reference to full test certificates</li>
                    <li>- Installer identification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Warning Labels Required by BS 7671</p>
              <div className="text-sm space-y-2">
                <p><strong>RCD Test Notice (Reg 514.12.2):</strong> "This installation, or part of it, is protected by a device which automatically switches off the supply if an earth fault develops. Test quarterly by pressing the button marked 'T' or 'Test'. The device should switch off the supply and should then be switched on to restore the supply. If the device does not switch off the supply when the button is pressed, seek expert advice."</p>
                <p><strong>Dual Supply Warning:</strong> Required where more than one source of supply exists</p>
                <p><strong>Voltage Warning:</strong> Where nominal voltage exceeds 230V between conductors</p>
                <p><strong>Main Switch Identification:</strong> Clear identification of the means of isolation</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Consideration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Guidance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accessibility</td>
                      <td className="border border-white/10 px-3 py-2">Reg 132.12</td>
                      <td className="border border-white/10 px-3 py-2">Adequate space for operation and maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mounting height</td>
                      <td className="border border-white/10 px-3 py-2">Best practice</td>
                      <td className="border border-white/10 px-3 py-2">Main switch 1.2-1.8m above floor level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable entry</td>
                      <td className="border border-white/10 px-3 py-2">IP maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Suitable glands, maintain bending radii</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Heat dissipation</td>
                      <td className="border border-white/10 px-3 py-2">Adequate clearance around enclosure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Spare capacity</td>
                      <td className="border border-white/10 px-3 py-2">Future expansion</td>
                      <td className="border border-white/10 px-3 py-2">Minimum 20% spare ways recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earthing</td>
                      <td className="border border-white/10 px-3 py-2">Reg 542</td>
                      <td className="border border-white/10 px-3 py-2">Adequate earth bar capacity, MET connection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> Circuit charts must be accurate and updated following any modification. Inaccurate documentation creates safety risks during maintenance and emergency situations.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Domestic Consumer Unit Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify a consumer unit for a 3-bedroom house with 12 circuits including lighting, sockets, cooker, shower, and outdoor supplies.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Requirements Analysis:</p>
                <p className="mt-2">Circuits required: 12</p>
                <p>Spare capacity (20%): 12 × 0.2 = 2.4 ≈ 3 spare ways</p>
                <p>Total ways needed: 12 + 3 = 15 ways minimum</p>
                <p className="mt-2">RCD allocation:</p>
                <p className="ml-4">- RCD 1: Upstairs lighting, downstairs lighting, smoke alarms</p>
                <p className="ml-4">- RCD 2: Ring main (ground), ring main (first), kitchen sockets</p>
                <p className="ml-4">- Non-RCD or separate RCD: Cooker, shower, immersion</p>
                <p className="mt-2">Specification:</p>
                <p className="ml-4">- 18-way dual RCD consumer unit (or RCBO board)</p>
                <p className="ml-4">- 100A main switch</p>
                <p className="ml-4">- Type B (domestic, ordinary persons)</p>
                <p className="ml-4">- IP20 (indoor dry location)</p>
                <p className="ml-4 text-green-400">- Non-combustible enclosure (Amendment 3 requirement)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: IP Rating Selection for External Board</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select appropriate IP rating for a distribution board in an exposed car park location.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Environmental Assessment:</p>
                <p className="mt-2">Location: External car park, no shelter</p>
                <p>Exposure: Direct rain, wind-driven spray</p>
                <p>Dust/debris: Moderate (vehicle movements)</p>
                <p className="mt-2">IP Rating Analysis:</p>
                <p className="ml-4">First digit: 5 or 6 (dust protected/tight)</p>
                <p className="ml-4">Second digit: 5 or 6 (water jets/powerful jets)</p>
                <p className="mt-2">Selection: IP65 minimum</p>
                <p className="ml-4">- IP66 preferred for durability</p>
                <p className="mt-2">Additional requirements:</p>
                <p className="ml-4">- UV-resistant enclosure material</p>
                <p className="ml-4">- Cable glands rated to match IP65/66</p>
                <p className="ml-4">- Drainage provision (weep holes at lowest point)</p>
                <p className="ml-4 text-green-400">- Anti-condensation heater if in humid climate</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Three-Phase Board Layout</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design circuit allocation for a small commercial three-phase distribution board.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Load Schedule:</p>
                <p className="mt-2">Single-phase loads:</p>
                <p className="ml-4">- Lighting: 3 × 10A circuits (3.6kW each max)</p>
                <p className="ml-4">- Socket circuits: 6 × 32A ring finals</p>
                <p className="ml-4">- Fixed equipment: 3 × 20A (water heaters, etc.)</p>
                <p className="mt-2">Three-phase loads:</p>
                <p className="ml-4">- HVAC unit: 3P 32A</p>
                <p className="ml-4">- Lift motor: 3P 40A</p>
                <p className="mt-2">Phase Balancing:</p>
                <p className="ml-4">L1: Light 1, Ring 1, Ring 4, WH 1 = ~22kW</p>
                <p className="ml-4">L2: Light 2, Ring 2, Ring 5, WH 2 = ~22kW</p>
                <p className="ml-4">L3: Light 3, Ring 3, Ring 6, WH 3 = ~22kW</p>
                <p className="ml-4 text-green-400">Result: Balanced single-phase loading across phases</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Determine total number of circuits required plus 20% spare capacity</li>
                <li className="pl-1">Select board type (A or B) based on user access requirements</li>
                <li className="pl-1">Specify IP rating appropriate to installation environment</li>
                <li className="pl-1">Plan RCD allocation to minimise inconvenience from tripping</li>
                <li className="pl-1">Group circuits logically by function and location</li>
                <li className="pl-1">Verify prospective fault current is within board rating</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Spare capacity: <strong>Minimum 20%</strong> of total ways</li>
                <li className="pl-1">DBO maximum rating: <strong>250A</strong> per BS EN 61439-3</li>
                <li className="pl-1">Internal dry location: <strong>IP2X or IP20</strong> minimum</li>
                <li className="pl-1">External exposed: <strong>IP65</strong> minimum recommended</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insufficient spare capacity</strong> - leads to costly board replacement</li>
                <li className="pl-1"><strong>All circuits on one RCD</strong> - total loss of supply on single fault</li>
                <li className="pl-1"><strong>Incorrect IP rating</strong> - premature failure in hostile environments</li>
                <li className="pl-1"><strong>Missing or inaccurate circuit charts</strong> - safety risk during maintenance</li>
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
                <p className="font-medium text-white mb-1">Board Type Selection</p>
                <ul className="space-y-0.5">
                  <li>Type B (DBO-B): Ordinary persons - standard choice</li>
                  <li>Type A (DBO-A): Skilled persons only</li>
                  <li>Consumer unit: Domestic with integral main switch</li>
                  <li>Forms 1-4: Increasing internal segregation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">IP Rating Summary</p>
                <ul className="space-y-0.5">
                  <li>IP20/IP2X: Indoor dry locations</li>
                  <li>IP44: Wet indoor or sheltered outdoor</li>
                  <li>IP55: Light industrial, external protected</li>
                  <li>IP65/66: External exposed, wash-down areas</li>
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
            <Link to="../h-n-c-module7-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6-2">
              Next: Cable Selection and Sizing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section6_1;
