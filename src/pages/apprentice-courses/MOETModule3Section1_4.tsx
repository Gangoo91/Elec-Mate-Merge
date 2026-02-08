import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Busbars and Cabling Systems - MOET Module 3 Section 1.4";
const DESCRIPTION = "Busbar types, busbar trunking, rising mains, cable containment systems, fire barriers and thermal imaging for maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "busbar-material",
    question: "What is the approximate electrical conductivity of aluminium compared to copper?",
    options: [
      "25% of copper",
      "40% of copper",
      "61% of copper",
      "85% of copper"
    ],
    correctIndex: 2,
    explanation: "Aluminium has approximately 61% of the electrical conductivity of copper (measured against the IACS standard). This means aluminium busbars must have a larger cross-sectional area to carry the same current as copper equivalents."
  },
  {
    id: "trunking-type",
    question: "Which type of busbar trunking provides tap-off points at regular intervals for connecting loads?",
    options: [
      "Feeder busbar trunking",
      "Plug-in busbar trunking",
      "Lighting trunking",
      "Rising main trunking"
    ],
    correctIndex: 1,
    explanation: "Plug-in busbar trunking has tap-off openings at regular intervals along its length, allowing distribution boards, motor starters or other loads to be connected at any position. This provides excellent flexibility for future modifications."
  },
  {
    id: "cable-fill",
    question: "What is the commonly used maximum fill percentage guideline for cable tray?",
    options: [
      "25%",
      "35%",
      "45%",
      "60%"
    ],
    correctIndex: 2,
    explanation: "A maximum fill of approximately 45% of the tray cross-sectional area is the common guideline. This ensures adequate ventilation around cables (preserving current ratings), leaves space for future additions, and keeps maintenance access practical."
  },
  {
    id: "thermal-load",
    question: "At what minimum load percentage should thermal imaging surveys be conducted for reliable results?",
    options: [
      "10%",
      "20%",
      "40%",
      "80%"
    ],
    correctIndex: 2,
    explanation: "Thermal surveys should be conducted with equipment under at least 40% of normal load. Higher loads generate larger temperature differentials between sound and faulty connections, producing more reliable and meaningful results."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary advantage of copper busbars over aluminium?",
    options: [
      "Lower cost",
      "Lower weight",
      "Higher electrical conductivity and easier jointing",
      "Greater flexibility"
    ],
    correctAnswer: 2,
    explanation: "Copper has approximately 100% IACS conductivity compared to aluminium's 61%. Copper joints are also simpler because copper does not form the resistive oxide layer that makes aluminium jointing more complex."
  },
  {
    id: 2,
    question: "Why do aluminium busbar joints require contact compound such as Penetrox?",
    options: [
      "To improve the appearance",
      "To prevent oxide reformation and reduce contact resistance",
      "To lubricate the bolts",
      "To increase the current rating"
    ],
    correctAnswer: 1,
    explanation: "Aluminium rapidly forms a hard, resistive oxide layer on its surface. Contact compound prevents this oxide reforming after the surface has been prepared, maintaining low contact resistance at the joint."
  },
  {
    id: 3,
    question: "What current range is typical for feeder busbar trunking?",
    options: [
      "25 A to 63 A",
      "100 A to 400 A",
      "800 A to 5000 A",
      "10 A to 32 A"
    ],
    correctAnswer: 2,
    explanation: "Feeder busbar trunking typically carries 800 A to 5000 A. It transfers power from the main switchboard to sub-distribution points and has no tap-off points along its length."
  },
  {
    id: 4,
    question: "What is a rising main?",
    options: [
      "A horizontal cable tray system",
      "A vertical busbar trunking system distributing power through a multi-storey building",
      "A type of emergency lighting circuit",
      "A fire alarm riser cable"
    ],
    correctAnswer: 1,
    explanation: "A rising main is a vertical busbar trunking system that rises through a dedicated riser shaft from the main switchroom, with tap-off points at each floor level feeding the floor distribution boards."
  },
  {
    id: 5,
    question: "What is the key difference between cable tray and cable ladder?",
    options: [
      "Cable tray is for outdoor use only",
      "Cable ladder is a heavy-duty version designed for large, heavy cables",
      "Cable tray is made of plastic",
      "Cable ladder cannot support more than 10 cables"
    ],
    correctAnswer: 1,
    explanation: "Cable ladder has parallel side rails with cross rungs and is designed for heavy cables such as HV cables and large sub-main cables. Cable tray is lighter-duty and suitable for general cable support."
  },
  {
    id: 6,
    question: "Where are fire barriers required in cable installations?",
    options: [
      "At every junction box",
      "Only at external walls",
      "Where cables pass through fire-rated walls, floors and partitions",
      "Only in domestic installations"
    ],
    correctAnswer: 2,
    explanation: "Fire barriers (penetration seals) are required wherever cables and containment pass through fire-rated structures. They restore the fire integrity of the building element to prevent fire and smoke spread."
  },
  {
    id: 7,
    question: "Which legislation governs fire barrier maintenance in buildings?",
    options: [
      "BS 7671 only",
      "Electricity at Work Regulations 1989",
      "Regulatory Reform (Fire Safety) Order 2005",
      "CDM Regulations 2015"
    ],
    correctAnswer: 2,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 requires fire barriers and penetration seals to be maintained as part of the building's fire safety management. Breached fire barriers must be re-sealed to the original fire rating."
  },
  {
    id: 8,
    question: "What does a Delta T of 25-40 degrees C on a thermal image indicate?",
    options: [
      "Normal operation",
      "Minor issue -- monitor during next shutdown",
      "Serious fault -- arrange maintenance as soon as possible",
      "Critical fault -- immediate shutdown required"
    ],
    correctAnswer: 2,
    explanation: "A Delta T of 25-40 degrees C indicates a serious developing fault. Maintenance should be arranged as soon as possible and load reduction should be considered to prevent failure."
  },
  {
    id: 9,
    question: "What is the main advantage of wire mesh cable basket over traditional cable tray?",
    options: [
      "Higher load capacity",
      "Better fire resistance",
      "Lighter weight, easier installation and better ventilation",
      "Lower IP rating"
    ],
    correctAnswer: 2,
    explanation: "Wire mesh cable basket is lighter, quicker to install, provides excellent ventilation around cables, and is more economical. It is well suited to data cables and small power cables."
  },
  {
    id: 10,
    question: "Why are copper busbars sometimes tin-plated or silver-plated?",
    options: [
      "To reduce weight",
      "To improve contact resistance at joints and protect against oxidation",
      "To change the colour for identification",
      "To increase flexibility"
    ],
    correctAnswer: 1,
    explanation: "Tin or silver plating improves contact resistance at bolted joints and provides a protective barrier against copper oxidation, extending the service life of busbar connections."
  },
  {
    id: 11,
    question: "What must happen if cables are added through an existing fire barrier?",
    options: [
      "Nothing -- the existing barrier is sufficient",
      "The barrier must be re-sealed to its original fire rating",
      "The cables must be painted red",
      "A new distribution board must be installed"
    ],
    correctAnswer: 1,
    explanation: "If cables are added through a fire barrier, the barrier must be re-sealed using approved materials to restore its original fire rating. A fire stop certificate should be issued for the work."
  },
  {
    id: 12,
    question: "How often should thermal imaging surveys typically be carried out on main switchboards?",
    options: [
      "Every 5 years",
      "Monthly",
      "Annually",
      "Only after a fault occurs"
    ],
    correctAnswer: 2,
    explanation: "Annual thermal surveys are recommended for main switchboards and distribution equipment. Critical installations such as hospitals and data centres may require more frequent surveys (six-monthly or quarterly)."
  }
];

const faqs = [
  {
    question: "Why do aluminium busbar joints require special preparation?",
    answer: "Aluminium forms a hard, resistive oxide layer on its surface within seconds of exposure to air. This oxide increases contact resistance at joints and can lead to overheating. Joints must have the oxide removed immediately before assembly, be treated with contact compound (e.g., Penetrox), be assembled with the correct torque using suitable hardware (often bimetallic connectors when joining to copper), and be re-torqued after the initial thermal cycling."
  },
  {
    question: "What is the difference between cable tray and cable ladder?",
    answer: "Cable tray is a perforated or ventilated channel for general cable support, suitable for most power and data cable installations. Cable ladder is a heavy-duty variant with parallel side rails and cross rungs, designed for large, heavy cables such as HV cables and large sub-main cables where the weight would exceed the capacity of standard tray."
  },
  {
    question: "Who can re-seal a fire barrier after adding cables?",
    answer: "Fire barrier installation and re-sealing should be carried out by trained personnel using approved materials and methods specified by the fire stop manufacturer. The work must be documented with a fire stop certificate. It is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005 and is routinely checked during periodic electrical inspections."
  },
  {
    question: "How often should thermal imaging surveys be carried out?",
    answer: "Annual thermal surveys are recommended for main switchboards and distribution equipment in most commercial and industrial installations. Critical facilities such as hospitals, data centres and manufacturing plants may require six-monthly or quarterly surveys. Newly commissioned installations should have an initial survey after the first year of operation."
  },
  {
    question: "Can I mix copper and aluminium busbars in the same installation?",
    answer: "Yes, but bimetallic joints require special treatment to prevent galvanic corrosion. Where copper and aluminium conductors are connected, bimetallic connectors or transition pads must be used. Direct bolting of copper to aluminium without bimetallic isolation will cause accelerated corrosion and eventual joint failure."
  }
];

const MOETModule3Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Busbars and Cabling Systems
          </h1>
          <p className="text-white/80">
            Busbar types, trunking, rising mains, cable containment and thermal imaging for maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Copper:</strong> 100% IACS conductivity, excellent jointing properties</li>
              <li className="pl-1"><strong>Aluminium:</strong> 61% IACS, lighter but requires oxide preparation</li>
              <li className="pl-1"><strong>Trunking:</strong> Feeder, plug-in and lighting variants</li>
              <li className="pl-1"><strong>Thermal imaging:</strong> Minimum 40% load for reliable surveys</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Joints:</strong> Torque, compound and re-torque after thermal cycling</li>
              <li className="pl-1"><strong>Fire barriers:</strong> Must be maintained at cable penetrations</li>
              <li className="pl-1"><strong>Cable fill:</strong> 45% maximum for adequate ventilation</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to electrical plant knowledge KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare the properties and applications of copper and aluminium busbars",
              "Describe busbar trunking systems including rising mains",
              "Identify cable containment types and their selection criteria",
              "Explain fire barrier requirements for cable penetrations",
              "Outline thermal imaging principles for busbar joint inspection",
              "Describe maintenance procedures for busbar systems and containment"
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

        {/* Section 01: Busbar Types and Materials */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Busbar Types and Materials
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Busbars are rigid conductors that carry large currents within switchgear assemblies, panel boards and between
              distribution equipment. They form the power distribution backbone of commercial and industrial installations,
              carrying currents from hundreds to several thousands of amperes. Unlike cables, busbars are designed for
              fixed installation and offer low impedance, compact form and high current density.
            </p>
            <p>
              The two principal busbar materials are copper and aluminium, each with distinct properties that make them
              suitable for different applications. The selection between them depends on current capacity, space constraints,
              weight limitations, environmental conditions and cost.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Copper Busbars</p>
              <p className="text-sm text-white mb-3">
                Copper is the traditional and most widely used busbar material. It has excellent electrical conductivity
                (approximately 100% IACS -- International Annealed Copper Standard), good thermal conductivity, excellent
                corrosion resistance and high mechanical strength.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cross-sections:</strong> Typically rectangular, ranging from 15 mm x 3 mm for small boards to 120 mm x 10 mm or multiple bars per phase for large switchboards</li>
                <li className="pl-1"><strong>Plating:</strong> Often tin-plated or silver-plated to improve contact resistance at joints and protect against oxidation</li>
                <li className="pl-1"><strong>Current capacity:</strong> Depends on cross-section, number of bars per phase, ambient temperature and ventilation</li>
                <li className="pl-1"><strong>Typical applications:</strong> Main switchboards, motor control centres, power distribution in critical facilities</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Aluminium Busbars</p>
              <p className="text-sm text-white mb-3">
                Aluminium busbars are lighter (approximately 30% of the weight of copper for equivalent current capacity)
                and less expensive, making them attractive for large installations. However, aluminium has only approximately
                61% of the conductivity of copper, requiring larger cross-sections.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oxide layer:</strong> Aluminium rapidly forms a hard, resistive oxide (Al2O3) that increases contact resistance at joints</li>
                <li className="pl-1"><strong>Joint preparation:</strong> Requires oxide removal immediately before assembly, contact compound (e.g., Penetrox), bimetallic connectors for copper-to-aluminium connections, and specific torque values</li>
                <li className="pl-1"><strong>Thermal expansion:</strong> Higher coefficient of thermal expansion than copper; joints must accommodate movement</li>
                <li className="pl-1"><strong>Typical applications:</strong> Large panel boards, busbar trunking, overhead line conductors</li>
              </ul>
            </div>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Property</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Copper</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Aluminium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conductivity (% IACS)</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">61%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Density (kg/m3)</td>
                      <td className="border border-white/10 px-3 py-2">8,900</td>
                      <td className="border border-white/10 px-3 py-2">2,700</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Oxide behaviour</td>
                      <td className="border border-white/10 px-3 py-2">Conductive, self-limiting</td>
                      <td className="border border-white/10 px-3 py-2">Resistive, requires preparation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Relative cost</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When copper and aluminium are joined directly, galvanic corrosion will occur
              due to their different positions in the electrochemical series. Bimetallic connectors or transition pads
              must always be used at copper-to-aluminium connections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Busbar Trunking and Rising Mains */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Busbar Trunking and Rising Mains
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Busbar trunking (also called busway) is a prefabricated power distribution system consisting of busbars
              enclosed in a protective housing. It provides a flexible and efficient alternative to large parallel cable
              runs for distributing power through buildings. Busbar trunking is manufactured in standard lengths with
              factory-tested joints, ensuring consistent quality and rapid installation.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Feeder Busbar Trunking</h3>
                <p className="text-sm text-white">
                  High-current trunking typically rated from 800 A to 5000 A. Used to transfer power from the main
                  switchboard to sub-distribution points. There are no tap-off points along its length -- power is
                  taken off only at the ends. Feeder trunking provides the lowest impedance path for high-current
                  distribution and is commonly used in industrial plants and large commercial buildings.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Plug-In Busbar Trunking</h3>
                <p className="text-sm text-white">
                  Medium-current trunking typically rated from 100 A to 1600 A with tap-off points at regular intervals
                  (usually every 0.5 m or 1.0 m). Allows distribution boards, motor starters or other loads to be
                  connected at any tap-off position, providing excellent flexibility for layout changes and future
                  expansion. Plug-in units can be hot-swapped on some systems without shutting down the trunking.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Trunking</h3>
                <p className="text-sm text-white">
                  Low-current trunking typically rated from 25 A to 63 A, designed specifically for lighting distribution
                  in industrial and commercial buildings. Tap-off units allow individual luminaires or lighting circuits
                  to be connected along the trunking run. Lighting trunking often doubles as the mechanical support
                  for the luminaires, eliminating the need for separate suspension systems.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Rising Mains</h3>
              <p className="text-sm text-white mb-3">
                A rising main is a vertical busbar trunking system that distributes power through multi-storey buildings.
                It rises through a dedicated riser shaft from the main switchroom to each floor, with tap-off points
                at each floor level feeding the floor distribution boards. Rising mains offer significant advantages
                over cable-based risers:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Compact:</strong> Requires less riser shaft space than equivalent cable installations</li>
                <li className="pl-1"><strong>Modular:</strong> Easier to install in stages as floors are completed</li>
                <li className="pl-1"><strong>Flexible:</strong> Tap-off units can be added or changed without re-cabling</li>
                <li className="pl-1"><strong>Low impedance:</strong> Better voltage regulation and power quality than long cable runs</li>
                <li className="pl-1"><strong>Maintenance:</strong> Joints accessible at each floor; thermal imaging identifies developing faults</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance note:</strong> Rising main maintenance includes checking the tightness of all joint
              bolts (using calibrated torque equipment), inspecting tap-off units for signs of overheating, verifying
              that fire barriers at each floor penetration are intact, and performing thermal imaging of joints under load.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Cable Containment Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Containment Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable containment systems support, protect and organise cables as they route between distribution equipment
              and final circuits. The choice of containment directly affects cable current ratings (through grouping and
              thermal derating factors applied in accordance with BS 7671 Appendix 4), ease of maintenance, fire
              performance and the ability to accommodate future additions.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Tray</h3>
                <p className="text-sm text-white">
                  A ladder-like or perforated metal channel that supports cables. Available in galvanised steel,
                  stainless steel and aluminium. Cable tray provides good ventilation around cables (improving
                  current ratings compared to enclosed containment), is easy to install and modify, and allows
                  cables to be visually inspected without removal. Tray width is selected based on the number and
                  size of cables, with consideration of space factors and future expansion.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Ladder</h3>
                <p className="text-sm text-white">
                  A heavy-duty version of cable tray consisting of parallel side rails connected by cross rungs.
                  Cable ladder is designed for large, heavy cables where the weight would exceed the capacity of
                  standard tray. Typically used for HV cables, large LV sub-main cables and heavy industrial
                  cable routes. The open rung design provides excellent ventilation and allows cables to be
                  secured individually with cable cleats at each rung.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Wire Mesh Cable Basket</h3>
                <p className="text-sm text-white">
                  An increasingly popular alternative to traditional tray. Wire mesh basket is lighter, faster to
                  install, provides excellent ventilation and is more economical. It is well suited to data cables,
                  small power cables and mixed services. However, it may not be suitable for very heavy cables
                  due to its lower load-carrying capacity compared to steel tray or ladder.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Containment Sizing</p>
              <p className="text-sm text-white">
                When sizing cable containment, the space factor must be considered. For cable tray, cables should
                not be stacked more than one layer deep for optimum current ratings. A maximum fill of 45% of the
                tray cross-sectional area is a common guideline. Overcrowded containment restricts ventilation,
                reduces cable current ratings (requiring larger cables), and makes maintenance difficult. Always
                allow a minimum of 25% spare capacity for future additions.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 reference:</strong> Cable grouping factors (Table 4C1) and thermal insulation factors
              must be applied when calculating the current-carrying capacity of cables in containment. The installation
              method directly determines the applicable rating from Appendix 4.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Fire Barriers and Penetration Seals */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fire Barriers and Penetration Seals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Where cables and containment pass through fire-rated walls, floors and partitions, the fire integrity
              of the building structure must be maintained. This requires fire barriers (also called fire stops or
              penetration seals) that restore the fire rating of the structural element. Without effective fire
              barriers, cable penetrations create pathways for fire and smoke to spread between compartments,
              undermining the building's passive fire protection.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Barrier Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fire rating:</strong> Must match the rating of the structure penetrated (typically 30, 60, 90 or 120 minutes)</li>
                <li className="pl-1"><strong>Materials:</strong> Intumescent pillows (expand when heated), fire-resistant sealant, fire-rated boards (mineral fibre or calcium silicate), intumescent wraps for individual cables</li>
                <li className="pl-1"><strong>Documentation:</strong> Fire stop certificates must be issued for each installation</li>
                <li className="pl-1"><strong>Inspection:</strong> Regular checks to ensure barriers have not been breached by subsequent works</li>
                <li className="pl-1"><strong>Legislation:</strong> Regulatory Reform (Fire Safety) Order 2005 and Building Regulations Approved Document B</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Maintenance Requirement</p>
              <p className="text-sm text-white">
                During maintenance work, always check that fire barriers have not been compromised. If additional
                cables are routed through a fire barrier, the barrier must be re-sealed to its original fire rating
                using approved materials and methods. This is a legal requirement and a key item on periodic
                inspection reports (BS 7671 Regulation 421.7). Breached fire barriers have been identified as a
                contributing factor in the spread of fire in multiple building fire investigations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Thermal Imaging for Busbar Joints */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Thermal Imaging for Busbar Joints
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal imaging (infrared thermography) is one of the most valuable predictive maintenance techniques
              for electrical systems, particularly for busbar joints and connections. A thermal imaging camera detects
              infrared radiation emitted by objects and converts it into a visible image showing temperature variations.
              In electrical systems, a high-resistance connection generates excess heat visible as a "hot spot".
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hot Spot Classification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Delta T</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Severity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-10 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Monitor</td>
                      <td className="border border-white/10 px-3 py-2">Schedule maintenance during next planned shutdown</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10-25 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Significant</td>
                      <td className="border border-white/10 px-3 py-2">Plan maintenance within weeks; increase monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25-40 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Serious</td>
                      <td className="border border-white/10 px-3 py-2">Arrange maintenance ASAP; consider load reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above 40 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Critical</td>
                      <td className="border border-white/10 px-3 py-2">Immediate action; risk of failure, fire or damage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice for Thermal Surveys</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Load:</strong> Equipment under at least 40% of normal load (higher is better)</li>
                <li className="pl-1"><strong>Access:</strong> Panel doors open or removed for direct line of sight</li>
                <li className="pl-1"><strong>Conditions:</strong> Consistent ambient temperatures; avoid direct sunlight or draughts</li>
                <li className="pl-1"><strong>Competence:</strong> Trained and competent thermographers (Category 1 or 2 certified)</li>
                <li className="pl-1"><strong>Documentation:</strong> Thermal images, temperature data, load conditions and recommended actions</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance value:</strong> Regular thermal imaging identifies deteriorating connections before
              they fail catastrophically. A single busbar joint failure can cause a complete installation outage,
              arc flash injuries and significant fire damage. Prevention through thermal imaging is far more
              cost-effective than reactive repair.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">Busbar Materials</p>
                <ul className="space-y-0.5">
                  <li>Copper: 100% IACS, 8,900 kg/m3</li>
                  <li>Aluminium: 61% IACS, 2,700 kg/m3</li>
                  <li>Bimetallic joints for Cu-Al connections</li>
                  <li>Contact compound for aluminium joints</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Thermal Imaging</p>
                <ul className="space-y-0.5">
                  <li>Minimum 40% load for reliable surveys</li>
                  <li>Delta T 1-10 degrees C: Monitor</li>
                  <li>Delta T 25-40 degrees C: Serious</li>
                  <li>Delta T above 40 degrees C: Critical</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: 3.1.3
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-5">
              Next: 3.1.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section1_4;
