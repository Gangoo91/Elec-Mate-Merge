import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "General Lighting Circuits - MOET Module 3.4.1";
const DESCRIPTION = "Comprehensive guide to general lighting circuits for maintenance technicians: radial and loop-in wiring, switching arrangements, dimming, lighting control systems, lux levels, luminaire types and maintenance procedures under BS 7671 and ST1426.";

const quickCheckQuestions = [
  {
    id: "loop-in-wiring",
    question: "In a loop-in lighting circuit, where are the connections between the supply, switch and luminaire made?",
    options: [
      "At the light switch only",
      "At the ceiling rose or luminaire terminal",
      "At a separate junction box on the wall",
      "At the consumer unit"
    ],
    correctIndex: 1,
    explanation: "In loop-in wiring, the supply, switch wire and luminaire connections are all made at the ceiling rose or luminaire terminal. This eliminates the need for separate junction boxes, reducing material costs and the number of connection points that could develop faults over time."
  },
  {
    id: "two-way-switching",
    question: "How many conductors (excluding earth) are required between the two switches in a two-way switching arrangement?",
    options: [
      "Two conductors",
      "Three conductors",
      "Four conductors",
      "Five conductors"
    ],
    correctIndex: 1,
    explanation: "A two-way switching arrangement requires three conductors between the two switches: one common terminal wire and two strappers (travellers). The common terminal on one switch receives the supply, and the common terminal on the other connects to the luminaire. The two strappers connect L1 to L1 and L2 to L2 between the switches."
  },
  {
    id: "pir-sensor",
    question: "What does a PIR sensor detect in order to trigger a lighting circuit?",
    options: [
      "Changes in visible light levels",
      "Changes in infrared radiation caused by movement of warm bodies",
      "Sound and vibration",
      "Changes in air pressure"
    ],
    correctIndex: 1,
    explanation: "A PIR (Passive Infrared) sensor detects changes in infrared radiation within its field of view. When a warm body (person) moves through the detection zone, the change in infrared energy triggers the sensor. PIR sensors are passive because they detect existing infrared radiation rather than emitting any signal of their own."
  },
  {
    id: "lux-levels",
    question: "According to CIBSE guidelines, what is the recommended maintained illuminance for a general office area?",
    options: [
      "100 lux",
      "200 lux",
      "300 lux",
      "500 lux"
    ],
    correctIndex: 3,
    explanation: "CIBSE (Chartered Institution of Building Services Engineers) recommends a maintained illuminance of 500 lux for general office areas. This is the minimum illuminance on the working plane that should be maintained throughout the life of the installation, accounting for lamp depreciation and luminaire dirt accumulation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a radial lighting circuit, which of the following best describes the cable routing?",
    options: [
      "The cable forms a complete loop back to the consumer unit",
      "The cable runs from the consumer unit to each luminaire in sequence, terminating at the last point",
      "Each luminaire has its own dedicated cable from the consumer unit",
      "The cable runs in a star configuration from a central junction box"
    ],
    correctAnswer: 1,
    explanation: "A radial lighting circuit runs from the consumer unit to each luminaire in sequence along a single cable route, terminating at the last point on the circuit. This is the most common arrangement for domestic and small commercial lighting circuits. Unlike a ring circuit, there is no return path back to the origin."
  },
  {
    id: 2,
    question: "What is the maximum number of points typically recommended on a single domestic lighting circuit protected by a 6 A MCB?",
    options: [
      "6 points",
      "8 points",
      "10 points",
      "12 points"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Guidance Note 1 and the IET On-Site Guide recommend a maximum of approximately 10-12 lighting points per circuit, assuming each point draws around 100 W. However, with modern LED luminaires drawing much less power, the limitation is more often the cable volt drop or the number of connections rather than the total load."
  },
  {
    id: 3,
    question: "In a three-plate ceiling rose using loop-in wiring, what is connected to the middle terminal block?",
    options: [
      "The earth conductors",
      "The neutral conductors",
      "The switched live conductors",
      "The permanent live conductors (loop terminals)"
    ],
    correctAnswer: 3,
    explanation: "In a three-plate ceiling rose, the middle terminal block typically carries the permanent live conductors — the incoming live, the outgoing live to the next point, and the live feed to the switch. This is the 'loop' terminal that gives the system its name, as the live supply loops through each ceiling rose."
  },
  {
    id: 4,
    question: "An intermediate switch is required when controlling a light from:",
    options: [
      "Two locations",
      "Three or more locations",
      "A single location with a dimmer",
      "An external location only"
    ],
    correctAnswer: 1,
    explanation: "An intermediate switch is used when a light needs to be controlled from three or more locations. Two two-way switches are used at the first and last positions, and intermediate switches are placed at each position in between. The intermediate switch has four terminals and effectively cross-connects the two strappers."
  },
  {
    id: 5,
    question: "Which type of dimmer is most suitable for use with LED luminaires?",
    options: [
      "Leading-edge (triac) dimmer",
      "Trailing-edge dimmer",
      "Rheostat dimmer",
      "Autotransformer dimmer"
    ],
    correctAnswer: 1,
    explanation: "Trailing-edge dimmers are the most suitable type for LED luminaires. They switch off at the trailing edge of the AC waveform, producing a smoother and quieter operation with LEDs. Leading-edge (triac) dimmers were designed for resistive and inductive loads and can cause flickering, buzzing and premature failure when used with many LED drivers."
  },
  {
    id: 6,
    question: "What does the DALI protocol stand for in lighting control?",
    options: [
      "Digital Addressable Lighting Interface",
      "Distributed Automated Lighting Integration",
      "Direct Analogue Lighting Interconnect",
      "Dynamic Adaptive Luminaire Intelligence"
    ],
    correctAnswer: 0,
    explanation: "DALI stands for Digital Addressable Lighting Interface (IEC 62386). It is an international standard for digital lighting control that allows individual luminaires to be addressed, grouped and controlled independently. DALI uses a two-wire control bus that can run alongside the mains supply cabling."
  },
  {
    id: 7,
    question: "According to CIBSE SLL Code for Lighting, what is the recommended maintained illuminance for a corridor or circulation area?",
    options: [
      "50 lux",
      "100 lux",
      "200 lux",
      "300 lux"
    ],
    correctAnswer: 1,
    explanation: "CIBSE recommends 100 lux as the maintained illuminance for corridors and circulation areas. This provides adequate light for safe movement without the higher levels required for detailed task work. Stairwells and escape routes may require different levels, and emergency lighting must provide a minimum of 1 lux on the centre line of escape routes."
  },
  {
    id: 8,
    question: "When replacing a fluorescent lamp, what should a maintenance technician check FIRST?",
    options: [
      "The colour temperature of the replacement lamp",
      "That the circuit is isolated and confirmed dead",
      "The wattage rating of the replacement",
      "Whether the ballast is electronic or magnetic"
    ],
    correctAnswer: 1,
    explanation: "The first action must always be to isolate the circuit and confirm it is dead using an approved voltage indicator, tested before and after use on a known live source (proving unit). This is a fundamental safe isolation procedure required by the EAWR 1989 Regulation 12. Only after confirming the circuit is dead should the technician proceed with lamp replacement."
  },
  {
    id: 9,
    question: "A daylight-linked lighting control system uses which type of sensor?",
    options: [
      "PIR sensor",
      "Microwave sensor",
      "Photocell (lux sensor)",
      "Ultrasonic sensor"
    ],
    correctAnswer: 2,
    explanation: "Daylight-linked systems use a photocell (lux sensor) to measure the ambient light level and adjust the artificial lighting output accordingly. As natural daylight increases, the artificial lighting dims or switches off; as daylight decreases, the lighting increases. This can reduce lighting energy consumption by 30-60% in areas with good daylight."
  },
  {
    id: 10,
    question: "What is the typical cable size used for a domestic lighting circuit in the UK?",
    options: [
      "1.0 mm² twin and earth",
      "1.5 mm² twin and earth",
      "2.5 mm² twin and earth",
      "4.0 mm² twin and earth"
    ],
    correctAnswer: 1,
    explanation: "Domestic lighting circuits in the UK typically use 1.5 mm² twin and earth cable (or 1.0 mm² in some installations). The choice depends on the circuit length, volt drop, and the protective device rating. BS 7671 requires that the cable is adequately rated for the design current and that volt drop limits are not exceeded."
  },
  {
    id: 11,
    question: "Which of the following is NOT a benefit of using occupancy sensors in lighting control?",
    options: [
      "Reduced energy consumption in infrequently used areas",
      "Extended lamp life through reduced operating hours",
      "Increased light output from luminaires",
      "Compliance with Building Regulations Part L"
    ],
    correctAnswer: 2,
    explanation: "Occupancy sensors reduce energy consumption by switching off or dimming lights in unoccupied areas. They extend lamp life by reducing operating hours, and help achieve compliance with Building Regulations Part L (conservation of fuel and power). They do not increase light output — this is determined by the luminaire and lamp specifications."
  },
  {
    id: 12,
    question: "When maintaining luminaires, what is the primary reason for regular cleaning of reflectors and diffusers?",
    options: [
      "To prevent overheating of the luminaire",
      "To maintain the designed lux levels on the working plane",
      "To prevent the growth of bacteria",
      "To comply with PAT testing requirements"
    ],
    correctAnswer: 1,
    explanation: "Regular cleaning of reflectors and diffusers is essential to maintain the designed lux levels on the working plane. Dirt accumulation on luminaire surfaces reduces light output — this is accounted for in lighting design as the Luminaire Maintenance Factor (LMF). Without regular cleaning, actual lux levels will fall below the maintained illuminance required by CIBSE guidelines."
  }
];

const faqs = [
  {
    question: "What is the difference between loop-in and junction box wiring?",
    answer: "In loop-in wiring, all connections are made at the ceiling rose or luminaire terminal, with the supply cable looping from one fitting to the next. In junction box wiring, a separate junction box is used to make the connections between the supply, switch drop and luminaire drop. Loop-in is the more modern and common method as it requires fewer junction boxes and is easier to maintain, though junction box wiring can be simpler for complex switching arrangements."
  },
  {
    question: "Can I use a standard dimmer switch with LED lamps?",
    answer: "Not all dimmers are compatible with LED lamps. Standard leading-edge (triac) dimmers designed for incandescent and halogen loads can cause flickering, buzzing and reduced lamp life when used with LEDs. You should use a trailing-edge dimmer specifically rated for LED loads, and check the LED lamp manufacturer's compatibility list. The minimum load rating of the dimmer must also be considered, as LEDs draw much less power than the incandescent lamps they replace."
  },
  {
    question: "How often should lighting maintenance be carried out?",
    answer: "Lighting maintenance frequency depends on the environment and luminaire type. As a general guide: lamp replacement should follow the manufacturer's rated life guidance or be replaced on failure; cleaning of luminaires should be carried out at intervals specified in the lighting design (typically every 1-3 years depending on the environment); and a full lighting survey should be carried out periodically to verify that maintained illuminance levels are being achieved. Industrial and dusty environments require more frequent cleaning."
  },
  {
    question: "What is the minimum cable size for a lighting switch drop?",
    answer: "The switch drop (the cable between the ceiling rose and the light switch) is typically the same size as the main circuit cable — 1.0 mm² or 1.5 mm² in domestic installations. BS 7671 requires that all conductors in a circuit are adequately rated for the design current and that earth continuity is maintained throughout. Three-core and earth cable is used for two-way switching to provide the necessary strappers."
  },
  {
    question: "What are the advantages of DALI over 1-10 V dimming?",
    answer: "DALI offers several advantages over analogue 1-10 V dimming: individual addressing of each luminaire (up to 64 per DALI bus), bi-directional communication (the controller can receive status information from luminaires), grouping and scene setting without rewiring, logarithmic dimming curve for smooth perceived dimming, and standardised protocol ensuring interoperability between manufacturers. 1-10 V is simpler and cheaper but only provides group dimming with no feedback capability."
  }
];

const MOETModule3Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
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
            <span>Module 3.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            General Lighting Circuits
          </h1>
          <p className="text-white/80">
            Lighting circuit types, switching arrangements, control systems and maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Radial circuits:</strong> Supply loops from point to point, terminating at the last</li>
              <li className="pl-1"><strong>Loop-in wiring:</strong> Connections made at each ceiling rose — no junction boxes</li>
              <li className="pl-1"><strong>Switching:</strong> One-way, two-way, intermediate and dimmer arrangements</li>
              <li className="pl-1"><strong>Controls:</strong> PIR, photocell, DALI and smart lighting systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Regulatory Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 7671:2018+A3:2024:</strong> Part 5 — selection and erection of equipment</li>
              <li className="pl-1"><strong>CIBSE SLL:</strong> Code for Lighting — maintained illuminance levels</li>
              <li className="pl-1"><strong>Building Regs Part L:</strong> Conservation of fuel and power — lighting efficacy</li>
              <li className="pl-1"><strong>ST1426:</strong> Install, maintain and fault-find lighting systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe radial and loop-in lighting circuit wiring arrangements",
              "Explain one-way, two-way and intermediate switching configurations",
              "Identify dimmer types and their compatibility with different lamp technologies",
              "Describe lighting control systems including PIR, photocell and DALI",
              "State recommended lux levels for common workplace areas",
              "Outline luminaire maintenance procedures including lamp replacement and cleaning"
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

        {/* Section 01: Lighting Circuit Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Lighting Circuit Types and Wiring Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting circuits in the UK are predominantly radial circuits, meaning the cable runs from
              the consumer unit or distribution board through each lighting point in sequence, terminating
              at the last point on the circuit. Unlike ring final circuits used for socket outlets, lighting
              circuits do not return to the origin. The two principal wiring methods are loop-in wiring and
              junction box wiring, each with distinct advantages for installation and maintenance.
            </p>
            <p>
              A typical domestic lighting circuit is protected by a 6 A Type B MCB and wired in 1.0 mm² or
              1.5 mm² twin and earth cable. The IET On-Site Guide recommends a maximum of approximately
              10-12 lighting points per circuit, assuming each point is rated at 100 W. With modern LED
              luminaires drawing significantly less power, the practical limitation is often the cable
              volt drop over long runs rather than the total load.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Loop-In Wiring</p>
              <p className="text-sm text-white mb-3">
                Loop-in wiring is the standard method for domestic and small commercial lighting circuits.
                All connections are made at the ceiling rose or luminaire terminal, eliminating the need
                for separate junction boxes. The supply cable loops through each ceiling rose in sequence.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Three-plate ceiling rose:</strong> Three terminal blocks — live (loop), neutral, and switched live</li>
                <li className="pl-1"><strong>Supply in/out:</strong> The supply cable enters and exits through the loop terminals</li>
                <li className="pl-1"><strong>Switch wire:</strong> A twin and earth cable runs down to the switch — live goes to common, switched live returns on the neutral conductor (sleeved brown)</li>
                <li className="pl-1"><strong>Pendant flex:</strong> Connects from the switched live and neutral terminals to the lamp holder</li>
                <li className="pl-1"><strong>Advantage:</strong> All joints accessible at the ceiling rose for maintenance and fault-finding</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Junction Box Wiring</p>
              <p className="text-sm text-white mb-3">
                In junction box wiring, a four-terminal junction box is used at each lighting point to make
                the connections between the supply cable, switch drop and luminaire drop. This method is
                often used in existing installations and where ceiling access is limited.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Four terminals:</strong> Permanent live, neutral, switched live, earth</li>
                <li className="pl-1"><strong>Separate drops:</strong> Individual cables run from the junction box to the switch and to the luminaire</li>
                <li className="pl-1"><strong>Location:</strong> Junction boxes must remain accessible (typically above the ceiling)</li>
                <li className="pl-1"><strong>Disadvantage:</strong> Additional connection points that may be difficult to locate during fault-finding</li>
                <li className="pl-1"><strong>Use case:</strong> Often preferred for complex switching arrangements or where ceiling roses are not used</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Commercial and Industrial Circuits</p>
              <p className="text-sm text-white">
                In larger commercial and industrial installations, lighting circuits are often wired using
                single-core cables in trunking or conduit, or using SWA (Steel Wire Armoured) or MICC
                (Mineral Insulated Copper Clad) cable. Circuits may be three-phase with luminaires distributed
                across all three phases for balanced loading. Busbar trunking systems are also used in
                warehouses and factories to provide flexible luminaire positioning.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When fault-finding on lighting circuits, always start by
              identifying the wiring method (loop-in or junction box) as this determines where connections
              are located. In loop-in systems, all joints are at the ceiling rose. In junction box systems,
              you must locate the junction boxes — which may be hidden above ceilings or in voids.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Switching Arrangements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Switching Arrangements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Switching arrangements determine how luminaires can be controlled from one or more locations.
              The correct switching configuration is essential for user convenience, energy efficiency and
              compliance with Building Regulations. Maintenance technicians must understand each type to
              diagnose faults and carry out replacements correctly.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">One-Way Switching</p>
              <p className="text-sm text-white mb-3">
                The simplest arrangement — a single switch controls a single luminaire or group of luminaires
                from one location. The switch is a single-pole device that breaks the line conductor only.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Terminals:</strong> Common (COM) and L1</li>
                <li className="pl-1"><strong>Cable:</strong> Twin and earth from ceiling rose to switch</li>
                <li className="pl-1"><strong>Wiring:</strong> Permanent live to COM, switched live returns on L1</li>
                <li className="pl-1"><strong>Application:</strong> Rooms with a single entrance, small spaces, utility areas</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Way Switching</p>
              <p className="text-sm text-white mb-3">
                Allows a luminaire to be controlled from two locations — typically at each end of a corridor,
                staircase or room with two entrances. Uses two two-way switches connected by strappers.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Terminals:</strong> Common (COM), L1 and L2 on each switch</li>
                <li className="pl-1"><strong>Cable:</strong> Three-core and earth between the two switches (for strappers)</li>
                <li className="pl-1"><strong>Wiring:</strong> Supply to COM on switch 1; COM on switch 2 to luminaire; L1-L1 and L2-L2 connected (strappers)</li>
                <li className="pl-1"><strong>Operation:</strong> Either switch can change the state of the luminaire regardless of the other switch position</li>
                <li className="pl-1"><strong>Application:</strong> Stairways, corridors, rooms with multiple entrances</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Intermediate Switching</p>
              <p className="text-sm text-white mb-3">
                When control from three or more locations is required, intermediate switches are added between
                two two-way switches. Each intermediate switch has four terminals and cross-connects the strappers.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Terminals:</strong> Four terminals — L1 in, L2 in, L1 out, L2 out</li>
                <li className="pl-1"><strong>Operation:</strong> Cross-connects or straight-connects the strappers depending on switch position</li>
                <li className="pl-1"><strong>Quantity:</strong> Any number of intermediate switches can be added between the two two-way end switches</li>
                <li className="pl-1"><strong>Application:</strong> Long corridors, open-plan offices, large retail spaces</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Switching Arrangement Summary</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Arrangement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Points</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Switch Types</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Strappers Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">One-way</td>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">1 x one-way switch</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Two-way</td>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">2 x two-way switches</td>
                      <td className="border border-white/10 px-3 py-2">2 (three-core and earth)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Intermediate</td>
                      <td className="border border-white/10 px-3 py-2">3+</td>
                      <td className="border border-white/10 px-3 py-2">2 x two-way + N x intermediate</td>
                      <td className="border border-white/10 px-3 py-2">2 (continuous through all switches)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Fault-finding tip:</strong> When a two-way or intermediate switching circuit fails, the
              fault is most commonly at the strapper connections. Check continuity of both strappers between
              all switches. A broken strapper will cause the light to work from one switch position only.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Dimming and Lighting Control Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Dimming and Lighting Control Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern lighting installations increasingly incorporate dimming and automated control systems
              to reduce energy consumption, improve occupant comfort and comply with Building Regulations
              Part L. Understanding these systems is essential for maintenance technicians who must install,
              commission, maintain and fault-find them.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dimmer Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Leading-edge (triac):</strong> Cuts the leading edge of each AC half-cycle. Suitable for incandescent and halogen loads. Not recommended for most LED lamps due to flickering and compatibility issues</li>
                <li className="pl-1"><strong>Trailing-edge:</strong> Cuts the trailing edge of each AC half-cycle. Smoother, quieter operation. The preferred choice for LED and electronic transformer loads. More expensive than leading-edge</li>
                <li className="pl-1"><strong>1-10 V analogue:</strong> A separate pair of control wires carries a 1-10 V DC signal to the ballast/driver. 1 V = minimum output, 10 V = full output. Simple and reliable but no individual addressing</li>
                <li className="pl-1"><strong>DALI (Digital Addressable Lighting Interface):</strong> Digital protocol (IEC 62386) using a two-wire bus. Up to 64 individual addresses per bus. Bi-directional communication, scene setting, grouping</li>
                <li className="pl-1"><strong>DSI (Digital Serial Interface):</strong> Predecessor to DALI. Unidirectional only. Being phased out in favour of DALI</li>
                <li className="pl-1"><strong>DMX512:</strong> Entertainment and architectural lighting protocol. 512 channels per universe. High-speed control for colour-changing and dynamic lighting effects</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automated Lighting Controls</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>PIR (Passive Infrared) sensors:</strong> Detect movement of warm bodies via changes in infrared radiation. Ideal for intermittently occupied areas — toilets, corridors, storerooms. Typical range 6-12 m, detection angle 180-360 degrees</li>
                <li className="pl-1"><strong>Microwave sensors:</strong> Emit microwave signals and detect the Doppler shift caused by movement. More sensitive than PIR, can detect through thin walls and partitions. Used in areas where PIR coverage is insufficient</li>
                <li className="pl-1"><strong>Ultrasonic sensors:</strong> Emit ultrasonic sound waves and detect changes caused by movement. Good for areas with obstructions or partitions. Less common than PIR and microwave</li>
                <li className="pl-1"><strong>Photocells (daylight sensors):</strong> Measure ambient light level in lux. Used for daylight-linked dimming — reducing artificial light output as natural daylight increases. Can reduce lighting energy by 30-60%</li>
                <li className="pl-1"><strong>Time switches and astronomical clocks:</strong> Control lighting based on time of day and calculated sunrise/sunset times. Used for external lighting and car park lighting</li>
                <li className="pl-1"><strong>BMS integration:</strong> Lighting control integrated into the Building Management System for centralised monitoring, scheduling and energy reporting</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI System Architecture</p>
              <p className="text-sm text-white mb-3">
                DALI is the most widely adopted digital lighting control protocol in commercial buildings.
                Understanding its architecture is essential for maintenance and fault-finding.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DALI bus:</strong> Two-wire, polarity-independent control bus. Can run alongside mains cabling. Maximum bus length approximately 300 m (voltage drop limited)</li>
                <li className="pl-1"><strong>Addressing:</strong> Up to 64 individual DALI addresses per bus. Each luminaire (or DALI driver) has a unique address</li>
                <li className="pl-1"><strong>Grouping:</strong> Addresses can be assigned to up to 16 groups for simultaneous control</li>
                <li className="pl-1"><strong>Scenes:</strong> Up to 16 pre-set lighting scenes can be stored in each driver</li>
                <li className="pl-1"><strong>Feedback:</strong> Bi-directional — drivers report lamp status, failure and operating hours back to the controller</li>
                <li className="pl-1"><strong>DALI-2:</strong> Updated standard with improved interoperability, push-button input devices, and sensor integration</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Building Regulations Part L requires that new non-domestic buildings
              incorporate lighting controls that respond to daylight and occupancy. Maintenance technicians
              must understand how to commission, adjust and fault-find these systems to maintain energy
              performance throughout the building's life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Lux Levels, Luminaires and Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Lux Levels, Luminaire Types and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintaining adequate lighting levels is a legal requirement under the Workplace (Health, Safety
              and Welfare) Regulations 1992 and is essential for the safety, comfort and productivity of
              building occupants. The CIBSE Society of Light and Lighting (SLL) Code for Lighting provides
              detailed recommendations for illuminance levels in different types of spaces.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Maintained Illuminance (CIBSE SLL)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Area Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintained Illuminance (lux)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridors and circulation</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">Safe movement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stairways</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">On treads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">On working plane</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technical drawing</td>
                      <td className="border border-white/10 px-3 py-2">750</td>
                      <td className="border border-white/10 px-3 py-2">Detail work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Workshop (general)</td>
                      <td className="border border-white/10 px-3 py-2">300</td>
                      <td className="border border-white/10 px-3 py-2">General work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Workshop (fine work)</td>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">Bench level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse (general)</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">At floor level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Car park (covered)</td>
                      <td className="border border-white/10 px-3 py-2">75</td>
                      <td className="border border-white/10 px-3 py-2">At floor level</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Luminaire Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Recessed modular (600x600 mm):</strong> Standard suspended ceiling luminaire — LED panel or troffer. Clean appearance, good uniformity. Used in offices, healthcare, education</li>
                <li className="pl-1"><strong>Surface-mounted battens:</strong> Linear luminaires mounted directly to the ceiling. Used in workshops, warehouses, plant rooms. LED replacements for fluorescent battens</li>
                <li className="pl-1"><strong>High-bay luminaires:</strong> High-output luminaires for mounting heights above 6 m. Used in warehouses, factories, sports halls. LED high-bays now standard</li>
                <li className="pl-1"><strong>Downlights:</strong> Recessed or semi-recessed circular fittings. Used in retail, hospitality, residential. Fire-rated versions required where penetrating fire compartment boundaries</li>
                <li className="pl-1"><strong>Bulkhead fittings:</strong> Robust, often IP65-rated surface-mounted fittings. Used in plant rooms, stairwells, external areas. Available in emergency lighting variants</li>
                <li className="pl-1"><strong>Track lighting:</strong> Luminaires mounted on an electrified track. Used in retail and gallery spaces. Allows flexible repositioning without rewiring</li>
                <li className="pl-1"><strong>Floodlights:</strong> External area lighting. Used for car parks, sports facilities, building facades. LED floodlights offer significant energy savings over traditional SON and MH</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Maintenance Procedures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lamp replacement:</strong> Always isolate and prove dead first. Match wattage, cap type, colour temperature and CRI. Dispose of discharge lamps (fluorescent, HID) as hazardous waste — they contain mercury</li>
                <li className="pl-1"><strong>Luminaire cleaning:</strong> Clean reflectors, diffusers and louvres at intervals specified in the maintenance schedule. Dirt accumulation reduces light output — the Luminaire Maintenance Factor (LMF) accounts for this in design</li>
                <li className="pl-1"><strong>Emergency lighting testing:</strong> Monthly functional test (brief operation on battery), annual full-duration test (1 hr or 3 hr). Record all results in the log book (BS 5266)</li>
                <li className="pl-1"><strong>Control system checks:</strong> Verify PIR sensitivity and time-out settings, check photocell calibration, confirm DALI addressing and scene settings are correct</li>
                <li className="pl-1"><strong>Lux level surveys:</strong> Periodic measurement using a calibrated lux meter to verify maintained illuminance levels are being achieved. Compare with design values</li>
                <li className="pl-1"><strong>Thermal imaging:</strong> Infrared survey of luminaire connections, control gear and switchgear to identify hot spots indicating loose connections or failing components</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Lamp Disposal Requirements</p>
              <p className="text-sm text-white">
                Discharge lamps (fluorescent tubes, compact fluorescent, metal halide, sodium) contain mercury
                and must be disposed of as hazardous waste under the Waste Electrical and Electronic Equipment
                (WEEE) Regulations. They must not be placed in general waste. Broken lamps should be handled
                with care due to mercury vapour risk. LED lamps contain electronic components and should also
                be recycled through WEEE-compliant routes, although they do not contain mercury.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in maintaining
              lighting systems, including lamp replacement, cleaning, testing and recording. You must be able to
              identify when lux levels have fallen below acceptable limits and take corrective action.
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4-2">
              Next: Emergency Lighting Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section4_1;