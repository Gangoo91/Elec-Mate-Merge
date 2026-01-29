import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fire Alarm Systems - HNC Module 7 Section 2.2";
const DESCRIPTION = "Master fire alarm systems for building services: BS 5839 categories, detector types, zoning requirements, cause and effect matrices, voice alarm systems BS 5839-8, and system integration.";

const quickCheckQuestions = [
  {
    id: "bs5839-l1",
    question: "What level of protection does a Category L1 system provide?",
    options: ["Protection of escape routes only", "Protection of property only", "Protection of the entire building including all areas", "Manual call point protection only"],
    correctIndex: 2,
    explanation: "Category L1 provides the highest level of life protection, with automatic fire detection installed throughout all areas of the building, including roof spaces, voids, and storage areas."
  },
  {
    id: "detector-selection",
    question: "Which detector type is most suitable for a kitchen environment?",
    options: ["Ionisation smoke detector", "Optical smoke detector", "Heat detector (rate of rise)", "Multi-sensor detector in heat-only mode"],
    correctIndex: 3,
    explanation: "A multi-sensor detector configured for heat-only mode or a dedicated heat detector is most suitable for kitchens, as smoke and optical detectors would cause frequent false alarms from cooking activities."
  },
  {
    id: "zone-limit",
    question: "What is the maximum floor area for a single fire alarm zone under BS 5839-1?",
    options: ["1,000 m²", "1,600 m²", "2,000 m²", "No limit specified"],
    correctIndex: 2,
    explanation: "BS 5839-1 specifies that no single zone should exceed 2,000 m² floor area. This ensures that the fire brigade can locate the fire within a reasonable search area when responding to an alarm."
  },
  {
    id: "cause-effect",
    question: "What is the primary purpose of a cause and effect matrix in fire alarm design?",
    options: ["To calculate cable sizes", "To define system responses to alarm conditions in different zones", "To select detector types", "To determine battery backup requirements"],
    correctIndex: 1,
    explanation: "A cause and effect matrix defines what outputs are activated (effects) when specific inputs occur (causes). It maps alarm conditions in zones to actions such as sounders, door releases, lift recall, HVAC shutdown, and voice alarm messages."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which BS 5839-1 category provides automatic fire detection to protect a specific high-risk area only?",
    options: [
      "Category L1",
      "Category L3",
      "Category L5",
      "Category P1"
    ],
    correctAnswer: 2,
    explanation: "Category L5 is designed to protect specific areas where there is a high fire risk, a high risk to occupants, or other specific circumstances requiring localised automatic detection. It's a bespoke category for targeted protection."
  },
  {
    id: 2,
    question: "What is the key difference between Category P1 and P2 systems?",
    options: [
      "P1 is for life safety, P2 is for property protection",
      "P1 covers all areas, P2 covers high-risk areas only",
      "P1 uses smoke detectors, P2 uses heat detectors",
      "P1 is addressable, P2 is conventional"
    ],
    correctAnswer: 1,
    explanation: "Category P1 provides automatic fire detection throughout the building for property protection, whilst P2 only protects defined areas of high fire risk. Both are property protection categories, not life safety."
  },
  {
    id: 3,
    question: "An ionisation smoke detector is most sensitive to:",
    options: [
      "Large visible smoke particles from smouldering fires",
      "Small invisible particles from fast-flaming fires",
      "Heat from any fire type",
      "Carbon monoxide from incomplete combustion"
    ],
    correctAnswer: 1,
    explanation: "Ionisation detectors respond fastest to small, invisible particles produced by fast-flaming fires with little visible smoke. They use a radioactive source to ionise air and detect disruption to the current flow."
  },
  {
    id: 4,
    question: "What is the maximum number of devices permitted on a single conventional fire alarm zone?",
    options: [
      "10 devices",
      "20 devices",
      "32 devices",
      "No specific limit"
    ],
    correctAnswer: 2,
    explanation: "BS 5839-1 recommends a maximum of 32 devices per zone for conventional systems. This limitation ensures that the fire can be located within an acceptable search time when the brigade arrives."
  },
  {
    id: 5,
    question: "In an addressable fire alarm system, what additional information does each device provide compared to conventional?",
    options: [
      "Higher sensitivity detection only",
      "Individual device identification and status",
      "Automatic sensitivity adjustment only",
      "Wireless communication capability"
    ],
    correctAnswer: 1,
    explanation: "Addressable devices provide individual identification, allowing the control panel to display exactly which device has activated, its precise location, and diagnostic information. This enables faster response and easier maintenance."
  },
  {
    id: 6,
    question: "BS 5839-8 specifically covers which type of fire alarm system?",
    options: [
      "Conventional fire alarm systems",
      "Addressable fire alarm systems",
      "Voice alarm and public address systems",
      "Aspirating smoke detection systems"
    ],
    correctAnswer: 2,
    explanation: "BS 5839-8 provides the code of practice for voice alarm systems in buildings. It covers design, installation, commissioning, and maintenance of systems that provide spoken evacuation messages in addition to or instead of traditional sounders."
  },
  {
    id: 7,
    question: "What is the minimum standby battery capacity required for a fire alarm system under BS 5839-1?",
    options: [
      "24 hours standby plus 30 minutes alarm",
      "24 hours standby plus 1 hour alarm",
      "48 hours standby plus 30 minutes alarm",
      "72 hours standby plus 30 minutes alarm"
    ],
    correctAnswer: 0,
    explanation: "BS 5839-1 requires batteries to provide at least 24 hours standby capacity followed by 30 minutes in the alarm condition. This ensures the system remains operational during mains failure until the fault can be rectified."
  },
  {
    id: 8,
    question: "Which detector type uses a light beam scattered by smoke particles?",
    options: [
      "Ionisation detector",
      "Optical (photoelectric) detector",
      "Aspirating detector",
      "Linear heat detector"
    ],
    correctAnswer: 1,
    explanation: "Optical smoke detectors work on the light-scattering principle. When smoke enters the chamber, particles scatter an LED light beam onto a photodiode, triggering the alarm. They are particularly effective for smouldering fires."
  },
  {
    id: 9,
    question: "In cause and effect programming, what would typically be an 'effect' of a fire alarm activation in a lift lobby zone?",
    options: [
      "Detector goes into alarm",
      "Manual call point activated",
      "Lift recalled to ground floor",
      "Smoke detected in zone"
    ],
    correctAnswer: 2,
    explanation: "Lift recall is an 'effect' - an output action triggered by the alarm condition. Causes are inputs (detector activation, MCP operation), whilst effects are outputs (sounders, door releases, lift control, HVAC shutdown)."
  },
  {
    id: 10,
    question: "What is the maximum cable resistance permitted for a fire alarm sounder circuit?",
    options: [
      "26 ohms",
      "40 ohms",
      "50 ohms",
      "Depends on system design and voltage"
    ],
    correctAnswer: 3,
    explanation: "Maximum cable resistance depends on the system design voltage, sounder current requirements, and minimum operating voltage. Manufacturers specify maximum loop resistance based on these factors - there is no universal fixed value."
  },
  {
    id: 11,
    question: "A multi-sensor detector typically combines which detection methods?",
    options: [
      "Ionisation and heat only",
      "Optical smoke and heat detection",
      "Heat and carbon monoxide only",
      "Aspirating and optical only"
    ],
    correctAnswer: 1,
    explanation: "Multi-sensor detectors typically combine optical smoke detection with heat sensing. Advanced algorithms analyse both inputs to distinguish between fire signatures and false alarm sources, significantly reducing unwanted alarms."
  },
  {
    id: 12,
    question: "What is the required minimum sound level for fire alarm sounders in BS 5839-1?",
    options: [
      "60 dB(A) or 5 dB(A) above background, whichever is greater",
      "65 dB(A) or 5 dB(A) above background, whichever is greater",
      "75 dB(A) in all areas",
      "85 dB(A) minimum everywhere"
    ],
    correctAnswer: 1,
    explanation: "BS 5839-1 requires a minimum of 65 dB(A) or 5 dB(A) above any background noise likely to persist for more than 30 seconds, whichever is greater. In sleeping areas, 75 dB(A) at bed-head is required."
  }
];

const faqs = [
  {
    question: "When should I specify Category L2 instead of L1?",
    answer: "Category L2 provides automatic detection in escape routes plus rooms opening onto them, and high-risk areas. It's appropriate where a fire in circulation areas poses the greatest risk to occupants, such as in residential care homes or hotels. L1 is specified when fires anywhere could develop rapidly, trap occupants, or when building complexity means fires in any location are equally dangerous. L2 offers a balance between cost and protection where escape routes are the primary concern."
  },
  {
    question: "How do I select between optical and multi-sensor detectors?",
    answer: "Optical detectors suit most general applications with low false alarm risk. Multi-sensor detectors are preferred where false alarm sources exist (dust, steam, cooking nearby) because their algorithms distinguish fire signatures from environmental factors. Consider multi-sensors in open-plan offices, corridors near kitchens, areas with varying temperature, or where historical false alarm data suggests problems. The additional cost of multi-sensors is often justified by reduced false alarm call-out charges."
  },
  {
    question: "What determines fire alarm zone boundaries?",
    answer: "Zone boundaries are determined by: maximum area (2,000 m²), maximum search distance (practical limit ~30m), fire compartment boundaries, floor levels (each floor typically separate zone), stairwells (each stairwell separate zone), and building function changes. The goal is enabling the fire brigade to locate an alarm within 1-2 minutes of arriving. Addressable systems allow more flexibility with larger 'zones' because individual device locations are displayed."
  },
  {
    question: "What interfaces are typically required for fire alarm system integration?",
    answer: "Common interfaces include: HVAC shutdown (prevent smoke spread), smoke damper control, door holder release (close fire doors), lift recall to ground floor, access control override (unlock doors on evacuation routes), emergency lighting activation, security system notification, BMS alarm logging, gas suppression systems, and voice alarm activation. Each interface requires careful design of cause and effect relationships and appropriate interface modules."
  },
  {
    question: "When is a voice alarm system required instead of traditional sounders?",
    answer: "Voice alarm (BS 5839-8) is recommended or required for: large complex buildings where phased evacuation is planned, buildings with sleeping occupants unfamiliar with the premises (hotels), areas with high background noise where sounders may be ignored, buildings where different messages may be needed for different scenarios, and locations where multilingual announcements are beneficial. The Regulatory Reform (Fire Safety) Order may require voice alarm where a fire risk assessment identifies specific communication needs."
  },
  {
    question: "How do I size fire alarm system batteries correctly?",
    answer: "Battery capacity = (standby current x 24 hours) + (alarm current x 0.5 hours), plus a 25% safety margin. Standby current includes the control panel, all detectors in quiescent mode, and any continuously powered devices. Alarm current includes all sounders, beacons, and the panel in alarm mode. For large systems, consider distributed power supplies to reduce cable volt drop and provide redundancy. Always verify manufacturer's specific requirements and derate batteries for end-of-life capacity."
  }
];

const HNCModule7Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2">
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
            <span>Module 7.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fire Alarm Systems
          </h1>
          <p className="text-white/80">
            BS 5839 categories, detector types, zoning, cause and effect, voice alarm and system integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 5839-1:</strong> Code of practice for fire detection and alarm</li>
              <li className="pl-1"><strong>Categories:</strong> L1-L5 (life), M (manual), P1-P2 (property)</li>
              <li className="pl-1"><strong>Detection:</strong> Optical, ionisation, heat, multi-sensor</li>
              <li className="pl-1"><strong>Integration:</strong> HVAC, access, lifts, voice alarm</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Zoning:</strong> Max 2,000 m² per zone</li>
              <li className="pl-1"><strong>Standby:</strong> 24 hours + 30 minutes alarm</li>
              <li className="pl-1"><strong>Sound level:</strong> 65 dB(A) or 5 dB above background</li>
              <li className="pl-1"><strong>Voice alarm:</strong> BS 5839-8 requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain BS 5839-1 system categories and their applications",
              "Select appropriate detector types for different environments",
              "Apply zoning requirements and calculate zone boundaries",
              "Develop cause and effect matrices for system integration",
              "Understand voice alarm requirements under BS 5839-8",
              "Design fire alarm interfaces with building services"
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

        {/* Section 1: BS 5839-1 System Categories */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS 5839-1 System Categories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5839-1 defines system categories based on the protection objectives. Life safety
              categories (L) prioritise occupant evacuation, whilst property protection categories (P)
              focus on minimising fire damage. Category M provides manual alarm only.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Life Safety Categories (L1-L5)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coverage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L1</td>
                      <td className="border border-white/10 px-3 py-2">All areas including voids, roof spaces, cupboards</td>
                      <td className="border border-white/10 px-3 py-2">High-risk premises, hospitals, residential care</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L2</td>
                      <td className="border border-white/10 px-3 py-2">Escape routes, rooms opening onto them, high-risk areas</td>
                      <td className="border border-white/10 px-3 py-2">Hotels, hostels, HMOs, boarding houses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L3</td>
                      <td className="border border-white/10 px-3 py-2">Escape routes only</td>
                      <td className="border border-white/10 px-3 py-2">Factories, warehouses with clear escape paths</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L4</td>
                      <td className="border border-white/10 px-3 py-2">Escape routes within dwellings</td>
                      <td className="border border-white/10 px-3 py-2">Domestic premises (linked to Building Regs)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L5</td>
                      <td className="border border-white/10 px-3 py-2">Specific areas defined by fire risk assessment</td>
                      <td className="border border-white/10 px-3 py-2">Bespoke protection, server rooms, plant areas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Property and Manual Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coverage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">P1</td>
                      <td className="border border-white/10 px-3 py-2">All areas (property protection throughout)</td>
                      <td className="border border-white/10 px-3 py-2">Museums, heritage buildings, warehouses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">P2</td>
                      <td className="border border-white/10 px-3 py-2">High-risk areas only (property)</td>
                      <td className="border border-white/10 px-3 py-2">Storage areas, plant rooms, specific risks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">M</td>
                      <td className="border border-white/10 px-3 py-2">Manual call points only, no automatic detection</td>
                      <td className="border border-white/10 px-3 py-2">Low-risk, single-storey, good visibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> The system category is determined by the fire risk assessment, not simply the building type. A combined category (e.g., L2/P2) may be specified where different areas have different protection requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Detector Types and Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Detector Types and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the appropriate detector type requires understanding both the fire
              characteristics likely to occur and the environmental conditions that could cause
              false alarms. Different detector technologies respond to different fire signatures.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optical Smoke Detectors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Light-scattering principle</li>
                  <li className="pl-1">Best for smouldering fires</li>
                  <li className="pl-1">Large visible smoke particles</li>
                  <li className="pl-1">Most common general-purpose type</li>
                  <li className="pl-1">Prone to dust false alarms</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ionisation Smoke Detectors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Radioactive source ionises air</li>
                  <li className="pl-1">Best for fast-flaming fires</li>
                  <li className="pl-1">Small invisible particles</li>
                  <li className="pl-1">Rarely specified (disposal issues)</li>
                  <li className="pl-1">Very sensitive to cooking fumes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Detectors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fixed temperature or rate-of-rise</li>
                  <li className="pl-1">Immune to smoke false alarms</li>
                  <li className="pl-1">Slower response than smoke types</li>
                  <li className="pl-1">Ideal for kitchens, garages, plant</li>
                  <li className="pl-1">Various temperature grades (A1-G)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Sensor Detectors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Combines optical + heat sensing</li>
                  <li className="pl-1">Algorithm distinguishes fire from false alarm</li>
                  <li className="pl-1">Configurable sensitivity modes</li>
                  <li className="pl-1">Reduces unwanted alarms by 50-80%</li>
                  <li className="pl-1">Premium cost but often justified</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detector Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Environment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office, corridor</td>
                      <td className="border border-white/10 px-3 py-2">Optical or multi-sensor</td>
                      <td className="border border-white/10 px-3 py-2">General purpose, good response</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kitchen</td>
                      <td className="border border-white/10 px-3 py-2">Heat detector</td>
                      <td className="border border-white/10 px-3 py-2">Immune to cooking fumes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant room</td>
                      <td className="border border-white/10 px-3 py-2">Heat detector (rate-of-rise)</td>
                      <td className="border border-white/10 px-3 py-2">Tolerates fumes, dust, temperature</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Server room</td>
                      <td className="border border-white/10 px-3 py-2">Aspirating (VESDA)</td>
                      <td className="border border-white/10 px-3 py-2">Very early warning, high airflow</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse (high ceiling)</td>
                      <td className="border border-white/10 px-3 py-2">Beam detector or aspirating</td>
                      <td className="border border-white/10 px-3 py-2">Point detectors impractical at height</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Always consider false alarm sources when selecting detectors. Unwanted alarms cost money, cause disruption, and lead to complacency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Zoning and Cause and Effect */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Zoning Requirements and Cause and Effect
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire alarm zoning determines how the building is divided for alarm indication and
              fire brigade response. Cause and effect matrices define system behaviour when alarms
              occur in different zones, controlling outputs such as sounders, door releases, and
              building services interfaces.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">BS 5839-1 Zoning Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Maximum zone area:</strong> 2,000 m² floor area</li>
                <li className="pl-1"><strong>Maximum search distance:</strong> Should allow location within 1-2 minutes</li>
                <li className="pl-1"><strong>Floor separation:</strong> Each floor should be a separate zone (exceptions for atriums)</li>
                <li className="pl-1"><strong>Stairwells:</strong> Each stairwell should be a separate zone</li>
                <li className="pl-1"><strong>Fire compartments:</strong> Zone boundaries should align with compartment walls</li>
                <li className="pl-1"><strong>Conventional systems:</strong> Maximum 32 devices per zone</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cause and Effect Matrix Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cause (Input)</th>
                      <th className="border border-white/10 px-3 py-2 text-center">Sounders All</th>
                      <th className="border border-white/10 px-3 py-2 text-center">Door Holders</th>
                      <th className="border border-white/10 px-3 py-2 text-center">Lift Recall</th>
                      <th className="border border-white/10 px-3 py-2 text-center">HVAC Stop</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zone 1 - Ground Floor</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zone 2 - First Floor</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zone 5 - Kitchen</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-yellow-400">Delayed 3min</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-red-400">No</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-yellow-400">Extract only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zone 8 - Plant Room</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCP Any Zone</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Immediate</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                      <td className="border border-white/10 px-3 py-2 text-center text-green-400">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical System Outputs (Effects)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sounders and beacons:</strong> Alert occupants to evacuate</li>
                <li className="pl-1"><strong>Fire door holders:</strong> Release doors to maintain compartmentation</li>
                <li className="pl-1"><strong>Lift recall:</strong> Return lifts to ground floor, prevent further use</li>
                <li className="pl-1"><strong>HVAC shutdown:</strong> Stop air handling to prevent smoke spread</li>
                <li className="pl-1"><strong>Smoke dampers:</strong> Close dampers in ductwork</li>
                <li className="pl-1"><strong>Stairwell pressurisation:</strong> Activate to keep escape routes clear</li>
                <li className="pl-1"><strong>Access control:</strong> Release doors on escape routes</li>
                <li className="pl-1"><strong>Voice alarm:</strong> Trigger evacuation messages</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> The cause and effect matrix should be developed collaboratively between fire alarm, mechanical, and controls engineers to ensure all system interactions are properly defined.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Voice Alarm and System Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Voice Alarm and System Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voice alarm systems (BS 5839-8) provide spoken evacuation messages instead of or
              alongside traditional sounders. They enable phased evacuation, multilingual announcements,
              and situation-specific messages. System integration connects the fire alarm to other
              building services for coordinated emergency response.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 5839-8 Voice Alarm Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Intelligibility:</strong> STIPA (Speech Transmission Index for PA) &gt; 0.5 minimum</li>
                <li className="pl-1"><strong>Sound level:</strong> 65 dB(A) or 5 dB above background (as per Part 1)</li>
                <li className="pl-1"><strong>Message structure:</strong> Alert tone, spoken message, alert tone (A-M-A pattern)</li>
                <li className="pl-1"><strong>Message duration:</strong> Should not exceed 30 seconds</li>
                <li className="pl-1"><strong>Standby power:</strong> Same as fire alarm (24 hours + 30 minutes)</li>
                <li className="pl-1"><strong>Fault tolerance:</strong> Single fault should not disable more than one zone</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Voice Alarm is Required</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Phased evacuation buildings</li>
                  <li className="pl-1">Sleeping accommodation (hotels)</li>
                  <li className="pl-1">High background noise areas</li>
                  <li className="pl-1">Complex buildings, multiple routes</li>
                  <li className="pl-1">Multilingual requirements</li>
                  <li className="pl-1">Fire risk assessment recommendation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voice Alarm Message Types</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Alert:</strong> "Attention please, this is a fire alert..."</li>
                  <li className="pl-1"><strong>Evacuate:</strong> "Please leave the building immediately..."</li>
                  <li className="pl-1"><strong>All-clear:</strong> "The emergency has ended..."</li>
                  <li className="pl-1"><strong>Phased:</strong> Zone-specific instructions</li>
                  <li className="pl-1"><strong>Live PA:</strong> Manual announcements if needed</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Alarm Integration Interfaces</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Interface Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action on Fire Alarm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC / AHU</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free contact or BACnet</td>
                      <td className="border border-white/10 px-3 py-2">Shutdown fans, close dampers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Smoke dampers</td>
                      <td className="border border-white/10 px-3 py-2">24V DC or volt-free</td>
                      <td className="border border-white/10 px-3 py-2">Close to prevent smoke spread</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated fire service switch</td>
                      <td className="border border-white/10 px-3 py-2">Recall to ground, doors open</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Access control</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free or network</td>
                      <td className="border border-white/10 px-3 py-2">Unlock escape route doors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS</td>
                      <td className="border border-white/10 px-3 py-2">BACnet, Modbus, or volt-free</td>
                      <td className="border border-white/10 px-3 py-2">Log alarms, coordinate response</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">Automatic (loss of supply)</td>
                      <td className="border border-white/10 px-3 py-2">Illuminate escape routes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gas suppression</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated interface panel</td>
                      <td className="border border-white/10 px-3 py-2">Trigger release after delay</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Critical consideration:</strong> All fire alarm interfaces must be fail-safe. Loss of power or signal should result in the safe condition (doors release, dampers close, lifts recall).
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Determining System Category</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 4-storey office building with open-plan offices, meeting rooms, a ground floor reception, plant room, and basement car park. Determine the appropriate BS 5839-1 category.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Fire Risk Assessment Considerations:</p>
                <p className="mt-2">- Office occupancy: awake, familiar with building</p>
                <p>- Multiple escape routes available</p>
                <p>- No sleeping accommodation</p>
                <p>- No high-risk processes</p>
                <p className="mt-2 text-white/60">Category Selection:</p>
                <p className="ml-4">Office floors: <span className="text-green-400">L3</span> (escape routes) or <span className="text-green-400">L2</span> if enhanced protection required</p>
                <p className="ml-4">Plant room: <span className="text-green-400">P2</span> (property protection of high-risk area)</p>
                <p className="ml-4">Car park: <span className="text-green-400">P2</span> or separate system per BS 5839-6</p>
                <p className="mt-2 text-green-400">Recommendation: Combined L3/P2 system</p>
                <p className="text-white/60">(Detection in escape routes, plus specific areas)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Zone Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A warehouse measuring 80m x 50m (4,000 m²) single storey. Calculate the minimum number of zones required.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total floor area = 80m x 50m = 4,000 m²</p>
                <p>Maximum zone area = 2,000 m² (BS 5839-1)</p>
                <p className="mt-2">Minimum zones = 4,000 ÷ 2,000 = <span className="text-green-400">2 zones</span></p>
                <p className="mt-2 text-white/60">Practical considerations:</p>
                <p className="ml-4">- Consider fire compartment boundaries</p>
                <p className="ml-4">- Search distance for fire brigade</p>
                <p className="ml-4">- Racking layout and access routes</p>
                <p className="mt-2 text-yellow-400">Recommendation: 4 zones (quadrants)</p>
                <p className="text-white/60">Provides better location indication</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Battery Capacity Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate battery capacity for a fire alarm system with 2A standby current and 8A alarm current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Standby capacity = 2A x 24 hours = 48 Ah</p>
                <p>Alarm capacity = 8A x 0.5 hours = 4 Ah</p>
                <p className="mt-2">Sub-total = 48 + 4 = 52 Ah</p>
                <p className="mt-2">Add 25% safety margin:</p>
                <p>52 x 1.25 = <span className="text-green-400">65 Ah minimum</span></p>
                <p className="mt-2 text-white/60">Select next standard size up:</p>
                <p className="text-green-400">Specify 2 x 38 Ah batteries (76 Ah total)</p>
                <p className="text-white/60">(Twin batteries for redundancy)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Alarm Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Obtain fire risk assessment and determine required category</li>
                <li className="pl-1">Review building plans for compartmentation and escape routes</li>
                <li className="pl-1">Define zones based on area, floors, and compartments</li>
                <li className="pl-1">Select detector types considering environment and false alarm risk</li>
                <li className="pl-1">Develop cause and effect matrix with all stakeholders</li>
                <li className="pl-1">Calculate battery capacity with safety margin</li>
                <li className="pl-1">Coordinate interfaces with mechanical and controls packages</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Maximum zone area: <strong>2,000 m²</strong></li>
                <li className="pl-1">Standby battery: <strong>24 hours + 30 minutes alarm</strong></li>
                <li className="pl-1">Sound level: <strong>65 dB(A) or 5 dB above background</strong></li>
                <li className="pl-1">Sleeping areas: <strong>75 dB(A) at bed-head</strong></li>
                <li className="pl-1">Conventional zone limit: <strong>32 devices</strong></li>
                <li className="pl-1">Voice alarm STIPA: <strong>&gt; 0.5</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong detector type:</strong> Optical detectors in kitchens cause repeated false alarms</li>
                <li className="pl-1"><strong>Poor zone design:</strong> Zones crossing fire compartments reduce effectiveness</li>
                <li className="pl-1"><strong>Incomplete cause and effect:</strong> Missing interfaces leave systems uncoordinated</li>
                <li className="pl-1"><strong>Undersized batteries:</strong> Failing to include all loads and safety margin</li>
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
                <p className="font-medium text-white mb-1">BS 5839-1 Categories</p>
                <ul className="space-y-0.5">
                  <li>L1: All areas (highest life protection)</li>
                  <li>L2: Escape routes + high-risk areas</li>
                  <li>L3: Escape routes only</li>
                  <li>L4: Domestic escape routes</li>
                  <li>L5: Specific areas (bespoke)</li>
                  <li>P1/P2: Property protection</li>
                  <li>M: Manual call points only</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Detector Types</p>
                <ul className="space-y-0.5">
                  <li>Optical: smouldering fires, most common</li>
                  <li>Ionisation: fast-flaming (rarely used)</li>
                  <li>Heat: kitchens, plant, garages</li>
                  <li>Multi-sensor: false alarm reduction</li>
                  <li>Aspirating: very early warning</li>
                  <li>Beam: high ceilings, large areas</li>
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
            <Link to="../h-n-c-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2-3">
              Next: Emergency Lighting Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section2_2;
