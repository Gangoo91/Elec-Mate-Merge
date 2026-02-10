import { FlashcardData } from "./types";

export const circuitProtection: FlashcardData[] = [
  // === MCBs (cp1–cp5) ===
  {
    id: "cp1",
    question: "What are the trip characteristics of a Type B MCB?",
    answer:
      "A Type B MCB trips between 3 and 5 times its rated current (In). It is the standard choice for general domestic circuits such as lighting and socket outlets where inrush currents are low.",
    category: "MCBs",
    difficulty: "easy",
  },
  {
    id: "cp2",
    question: "What are the trip characteristics of a Type C MCB?",
    answer:
      "A Type C MCB trips between 5 and 10 times its rated current (In). It is used for circuits with moderate inrush currents such as small motors, fluorescent lighting banks, and air conditioning units.",
    category: "MCBs",
    difficulty: "easy",
  },
  {
    id: "cp3",
    question: "What are the trip characteristics of a Type D MCB?",
    answer:
      "A Type D MCB trips between 10 and 20 times its rated current (In). It is used for equipment with very high inrush currents such as transformers, X-ray machines, welding equipment, and large motor starters.",
    category: "MCBs",
    difficulty: "easy",
  },
  {
    id: "cp4",
    question:
      "Scenario: You install a Type B MCB on a circuit supplying a 3-phase motor and it trips every time the motor starts. What is the likely cause and solution?",
    answer:
      "The motor's inrush current on start-up exceeds the magnetic trip threshold of the Type B MCB (3-5x In). The solution is to replace it with a Type C (5-10x In) or Type D (10-20x In) MCB, depending on the motor's starting characteristics, while ensuring the cable is rated for the higher let-through energy.",
    category: "MCBs",
    difficulty: "medium",
  },
  {
    id: "cp5",
    question:
      "An MCB provides two types of protection. What are they and how do they work?",
    answer:
      "Thermal protection (bimetallic strip) for sustained overloads - the strip heats, bends, and trips the mechanism. Magnetic protection (solenoid/electromagnet) for short circuits - a sudden high current energises the coil instantly tripping the mechanism. The MCB type (B, C, D) defines the magnetic trip threshold.",
    category: "MCBs",
    difficulty: "medium",
  },

  // === RCDs (cp6–cp9) ===
  {
    id: "cp6",
    question:
      "What is the difference between a Type AC and a Type A RCD?",
    answer:
      "A Type AC RCD detects sinusoidal AC residual currents only. A Type A RCD detects both sinusoidal AC residual currents and pulsating DC residual currents. Type A is required where electronic equipment (e.g. EV chargers, inverters) may produce pulsating DC fault currents. BS 7671 generally requires Type A as a minimum.",
    category: "RCDs",
    difficulty: "medium",
  },
  {
    id: "cp7",
    question:
      "What do Type F and Type B RCDs detect, and where are they used?",
    answer:
      "A Type F RCD detects AC, pulsating DC, and composite residual currents containing mixed frequencies - it is required for circuits supplying variable speed drives (VSDs) and some inverter-driven equipment. A Type B RCD also detects smooth DC residual currents and is required for three-phase variable speed drives and EV chargers that can produce smooth DC leakage.",
    category: "RCDs",
    difficulty: "hard",
  },
  {
    id: "cp8",
    question:
      "What is the maximum disconnection time for a 30 mA RCD at its rated residual operating current (IΔn)?",
    answer:
      "A 30 mA RCD must disconnect within 300 ms at its rated residual operating current (IΔn) of 30 mA, and within 40 ms at 5 times its rated residual current (150 mA). These are the requirements of BS EN 61008/61009.",
    category: "RCDs",
    difficulty: "medium",
  },
  {
    id: "cp9",
    question:
      "Scenario: An RCD protecting a commercial kitchen circuit nuisance-trips regularly. What are the likely causes?",
    answer:
      "Likely causes include: cumulative earth leakage from multiple appliances on the same RCD (each appliance leaks a small amount, but together they exceed 30 mA); moisture ingress into socket outlets or junction boxes; a deteriorating element in one of the appliances; or an incorrect RCD type (e.g. Type AC where Type A or F is needed). Solutions include splitting the load across multiple RCDs, checking for earth leakage on individual appliances, and improving IP ratings of accessories.",
    category: "RCDs",
    difficulty: "hard",
  },

  // === RCBOs (cp10–cp11) ===
  {
    id: "cp10",
    question: "What is an RCBO and what advantage does it offer over a separate MCB and RCD?",
    answer:
      "An RCBO (Residual Current Circuit Breaker with Overload protection) combines the functions of an MCB and an RCD in a single device. It provides overcurrent protection and earth fault protection for an individual circuit. The key advantage is that a fault on one circuit only trips that circuit's RCBO, preventing nuisance tripping of other circuits that would occur with a shared RCD.",
    category: "RCBOs",
    difficulty: "easy",
  },
  {
    id: "cp11",
    question:
      "When specifying an RCBO, what three key ratings must you confirm?",
    answer:
      "1) The current rating (In) to suit the circuit's design current and cable rating. 2) The MCB type (B, C, or D) to suit the load characteristics. 3) The RCD sensitivity and type (e.g. 30 mA Type A) to suit the fault protection requirements. You must also verify the breaking capacity is adequate for the prospective fault current at the point of installation.",
    category: "RCBOs",
    difficulty: "medium",
  },

  // === Fuses (cp12–cp15) ===
  {
    id: "cp12",
    question:
      "What is a BS 88 fuse and where is it typically used?",
    answer:
      "A BS 88 fuse is a High Rupturing Capacity (HRC) cartridge fuse used in industrial and commercial installations. It consists of a ceramic body filled with silica sand and a precisely engineered silver element. It offers excellent discrimination, high breaking capacity (typically 80 kA), and accurate time/current characteristics. Common applications include main switchgear, motor circuits, and distribution boards.",
    category: "Fuses",
    difficulty: "medium",
  },
  {
    id: "cp13",
    question:
      "Why must a factor of 0.725 be applied when using BS 3036 rewirable fuses, and what does this mean in practice?",
    answer:
      "The 0.725 factor (known as Cf) is applied because rewirable fuses have less accurate operating characteristics than cartridge fuses - the fuse wire can deteriorate, be replaced with incorrect wire, or have poor contact. In practice, the cable's current-carrying capacity (Iz) must be at least In / 0.725 (i.e. roughly 1.38 times the fuse rating). For example, a 30 A BS 3036 fuse requires a cable rated for at least 41.4 A.",
    category: "Fuses",
    difficulty: "medium",
  },
  {
    id: "cp14",
    question:
      "What are BS 1361 fuses and where would you commonly find them?",
    answer:
      "BS 1361 cartridge fuses are used primarily in older domestic consumer units and as the main cut-out fuse (service fuse) provided by the Distribution Network Operator (DNO). Common ratings are 60 A and 100 A for the service cut-out, and 5 A, 15 A, 20 A, 30 A, and 45 A for consumer unit ways. They are more reliable than rewirable fuses but less precise than BS 88 HRC types.",
    category: "Fuses",
    difficulty: "easy",
  },
  {
    id: "cp15",
    question:
      "Exam question: List three disadvantages of BS 3036 rewirable fuses compared to BS 88 HRC fuses.",
    answer:
      "1) The fuse element can be replaced with incorrect wire, leading to dangerous overrating. 2) They have less precise time/current characteristics, requiring the 0.725 (Cf) correction factor and therefore larger cables. 3) They have a much lower breaking capacity (typically only 1-4 kA vs 80 kA for BS 88), making them unsuitable where prospective fault currents are high.",
    category: "Fuses",
    difficulty: "medium",
  },

  // === Discrimination / Selectivity (cp16–cp18) ===
  {
    id: "cp16",
    question:
      "What is meant by 'discrimination' (selectivity) in a circuit protection system?",
    answer:
      "Discrimination means that in the event of a fault, only the protective device closest to the fault operates, while upstream devices remain closed. This ensures that only the affected circuit is disconnected, maintaining supply to all healthy circuits. It is achieved by coordinating the time/current characteristics of protective devices in series.",
    category: "Discrimination",
    difficulty: "easy",
  },
  {
    id: "cp17",
    question:
      "Scenario: A fault occurs on a final circuit, but instead of the local MCB tripping, the main switch trips and the entire board loses supply. What has gone wrong?",
    answer:
      "There is a lack of discrimination between the protective devices. The upstream device (main switch or main MCB) has operated before the downstream device (final circuit MCB). This typically occurs when the fault current is high enough to trip both devices simultaneously, or when the time/current curves overlap. The solution is to review the coordination of devices, potentially upgrading to a main device with a higher trip threshold or time delay, or using HRC fuses upstream which offer better discrimination characteristics.",
    category: "Discrimination",
    difficulty: "hard",
  },
  {
    id: "cp18",
    question:
      "What is 'back-up protection' and how does it relate to breaking capacity?",
    answer:
      "Back-up protection is an arrangement where an upstream protective device (typically an HRC fuse) assists a downstream device (typically an MCB) in breaking fault currents that exceed the downstream device's rated breaking capacity. The upstream fuse limits the energy let-through so the MCB is not damaged. BS 7671 Regulation 536.4 covers the requirements. The combination must be tested and verified by the manufacturer.",
    category: "Discrimination",
    difficulty: "hard",
  },

  // === Fault Current (cp19–cp21) ===
  {
    id: "cp19",
    question:
      "What is prospective fault current (PFC) and why must it be measured?",
    answer:
      "Prospective fault current (also called prospective short-circuit current, PSCC) is the maximum current that would flow in the event of a short circuit or earth fault at a given point in the installation. It must be measured (using a loop impedance tester or PFC meter) to verify that every protective device has an adequate breaking capacity to safely interrupt the highest possible fault current without damage or danger.",
    category: "Fault Current",
    difficulty: "easy",
  },
  {
    id: "cp20",
    question:
      "What is the typical maximum prospective fault current at the origin of a domestic installation, and what breaking capacity must protective devices have?",
    answer:
      "The typical maximum PFC at the origin of a UK domestic installation is 16 kA (as declared by most DNOs for single-phase TN-C-S supplies). All protective devices must have a rated breaking capacity (Icn) at least equal to the PFC at the point where they are installed. Standard domestic MCBs are commonly rated at 6 kA, which is adequate downstream because cable impedance reduces the PFC. If the measured PFC exceeds the MCB's rating, back-up protection from an upstream fuse may be needed.",
    category: "Fault Current",
    difficulty: "medium",
  },
  {
    id: "cp21",
    question:
      "Exam question: How do you verify that a protective device's breaking capacity is adequate for its location in the installation?",
    answer:
      "1) Measure or calculate the prospective fault current at the point of installation (both line-to-neutral and line-to-earth). 2) Check the protective device's rated short-circuit breaking capacity (Icn or Icu on the device label). 3) Confirm that the breaking capacity is equal to or greater than the PFC. 4) If it is not, either select a device with a higher rating or verify that a suitable upstream device provides back-up protection in accordance with BS 7671 Regulation 536.4.",
    category: "Fault Current",
    difficulty: "medium",
  },

  // === SPDs (cp22–cp23) ===
  {
    id: "cp22",
    question:
      "Under BS 7671 18th Edition Amendment 2, when are Surge Protection Devices (SPDs) required?",
    answer:
      "SPDs are required where the consequence of an overvoltage could result in: serious injury or death (e.g. medical locations, safety services), damage to irreplaceable items (e.g. museums, heritage buildings), or disruption to commercial or industrial activity. They are also required where the installation is supplied by an overhead line or includes an overhead line within the installation. A risk assessment per Regulation 443.4 determines the need in other cases.",
    category: "SPDs",
    difficulty: "medium",
  },
  {
    id: "cp23",
    question:
      "What are Type 1, Type 2, and Type 3 SPDs, and where are they installed?",
    answer:
      "Type 1 SPDs are installed at the origin of the installation (near the main switch) and protect against direct lightning strikes to the building or supply. Type 2 SPDs are the most common, installed at the main distribution board to protect against indirect surges and switching transients. Type 3 SPDs are installed close to sensitive equipment (e.g. at socket outlets) to provide fine protection. A coordinated approach using multiple types offers the best protection.",
    category: "SPDs",
    difficulty: "hard",
  },

  // === AFDDs (cp24) ===
  {
    id: "cp24",
    question:
      "What is an Arc Fault Detection Device (AFDD) and when does BS 7671 recommend their use?",
    answer:
      "An AFDD detects dangerous arc faults (both series and parallel arcs) caused by damaged cables, loose connections, or deteriorating insulation, and disconnects the circuit before a fire can start. BS 7671 18th Edition recommends AFDDs in locations with sleeping accommodation (HMOs, care homes), premises with combustible construction materials, locations with irreplaceable goods, and locations with combustible materials. They are fitted at the origin of the final circuit, typically in the consumer unit.",
    category: "AFDDs",
    difficulty: "hard",
  },

  // === Practical Scenario (cp25) ===
  {
    id: "cp25",
    question:
      "Scenario: A customer reports that their 32 A Type B MCB trips every time they switch on the washing machine, but it runs fine on an extension lead from another socket. What should you investigate?",
    answer:
      "Investigate: 1) Measure the circuit's insulation resistance (IR) to rule out an earth fault on the fixed wiring to that socket. 2) Check all connections at the socket outlet, junction boxes, and consumer unit for loose terminals causing high resistance. 3) Measure the earth fault loop impedance (Zs) on the circuit - a high Zs combined with a leaking appliance could cause tripping. 4) Test the MCB itself, as it may have weakened from repeated tripping. 5) If the washing machine runs fine on another circuit, compare the two circuits' protection - the other may have a higher-rated MCB or different type. The most common cause is a developing earth fault on the washing machine that produces enough leakage to trip an RCD or RCBO protecting that circuit but not the other.",
    category: "MCBs",
    difficulty: "medium",
  },
];
