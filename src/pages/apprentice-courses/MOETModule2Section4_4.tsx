import { ArrowLeft, Activity, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earthing Systems (TN, TT, IT) - MOET Module 2 Section 4.4";
const DESCRIPTION = "Comprehensive guide to earthing system arrangements for electrical maintenance technicians: TN-S, TN-C-S (PME), TT and IT systems, earth electrode requirements, Ze measurement and BS 7671 compliance.";

const quickCheckQuestions = [
  {
    id: "earthing-purpose",
    question: "What is the primary purpose of earthing in an electrical installation?",
    options: [
      "To reduce the electricity bill by providing a return path",
      "To provide a low-impedance path for fault current so that protective devices operate within the required time",
      "To improve the power factor of the installation",
      "To prevent static electricity build-up on equipment"
    ],
    correctIndex: 1,
    explanation: "The primary purpose of earthing is to provide a low-impedance path for earth fault current to flow back to the source (transformer star point). This ensures that the fault current is large enough to operate the protective device (fuse, MCB or RCD) within the maximum disconnection time specified by BS 7671, thereby limiting the duration of any dangerous touch voltage."
  },
  {
    id: "tn-c-s-pme",
    question: "In a TN-C-S (PME) system, the neutral and earth functions are:",
    options: [
      "Completely separate throughout the entire system",
      "Combined in the supply cable (PEN conductor) and separated at the origin of the installation",
      "Combined throughout both supply and installation",
      "Not connected — the installation relies on an earth electrode"
    ],
    correctIndex: 1,
    explanation: "In a TN-C-S system (Protective Multiple Earthing), the supply uses a combined neutral and earth conductor called a PEN (Protective Earth and Neutral) conductor. At the origin of the consumer's installation, the PEN conductor is separated into distinct neutral (N) and protective earth (PE) conductors. This is the most common earthing arrangement for new UK domestic supplies."
  },
  {
    id: "tt-system-rcd",
    question: "Why is RCD protection particularly important in a TT earthing system?",
    options: [
      "Because TT systems have higher supply voltages",
      "Because the earth fault loop impedance is typically too high for overcurrent devices to achieve the required disconnection time",
      "Because TT systems do not have a neutral conductor",
      "Because the supply transformer is further away"
    ],
    correctIndex: 1,
    explanation: "In a TT system, the earth return path includes the resistance of the consumer's earth electrode and the general mass of earth, which is typically much higher than the metallic return path in a TN system. This high earth fault loop impedance (Zs) means the earth fault current is too low for overcurrent devices (fuses/MCBs) to operate within the required disconnection time. An RCD, which operates at milliamp levels, provides the necessary fast disconnection."
  },
  {
    id: "ze-measurement",
    question: "External earth fault loop impedance (Ze) is measured:",
    options: [
      "Between the main earthing terminal and the supply neutral with the installation earthing disconnected",
      "Between any socket outlet and the consumer unit",
      "Between the line conductor and a separate earth electrode",
      "With all circuits loaded to their maximum capacity"
    ],
    correctIndex: 0,
    explanation: "Ze is measured at the origin of the installation between the means of earthing (main earthing terminal) and the supply neutral, with the installation's earthing conductor disconnected from the main earthing terminal. This isolates the measurement from the installation's own earth paths and measures only the impedance of the external supply earth loop — the supplier's responsibility."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The letter designations in earthing system classification (TN, TT, IT) are defined by:",
    options: [
      "The cable manufacturer's product codes",
      "IEC 60364 and BS 7671 — the first letter relates to the source earthing, the second to the exposed-conductive-parts",
      "The regional electricity company's naming convention",
      "The physical layout of the installation"
    ],
    correctAnswer: 1,
    explanation: "The classification follows IEC 60364 (adopted in BS 7671): the first letter indicates the relationship of the supply source to earth (T = directly earthed, I = isolated or high impedance), and the second letter indicates the relationship of the exposed-conductive-parts to earth (T = directly earthed via local electrode, N = connected to the supply earth/neutral). Additional letters (S, C, C-S) describe the neutral/earth conductor arrangement."
  },
  {
    id: 2,
    question: "In a TN-S system, the earth path from the installation back to the source is provided by:",
    options: [
      "A local earth electrode driven into the ground",
      "A separate metallic conductor (the supply cable sheath or a dedicated earth conductor) from the supply",
      "The general mass of earth",
      "The water mains pipe"
    ],
    correctAnswer: 1,
    explanation: "TN-S (Separate) uses a dedicated earth conductor separate from the neutral throughout the supply cable. In older installations, this was typically the lead sheath of the supply cable. In modern installations, it may be a separate conductor within the supply cable or the steel wire armour. The key characteristic is that N and PE are separate throughout."
  },
  {
    id: 3,
    question: "A PEN conductor in a TN-C-S system must have a minimum cross-sectional area of:",
    options: [
      "1.5 mm² copper",
      "6 mm² copper or 10 mm² aluminium",
      "10 mm² copper or 16 mm² aluminium",
      "25 mm² copper"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Regulation 543.4.1 requires that a PEN conductor must have a cross-sectional area of not less than 10 mm² copper or 16 mm² aluminium. This minimum size ensures the conductor has sufficient integrity to maintain the combined neutral and earth function reliably. Loss of the PEN conductor in a PME system can cause dangerous voltages on exposed metalwork."
  },
  {
    id: 4,
    question: "The typical range of Ze values for a TN-C-S (PME) supply in the UK is:",
    options: [
      "0.01 to 0.05 ohms",
      "0.2 to 0.35 ohms",
      "2 to 5 ohms",
      "20 to 200 ohms"
    ],
    correctAnswer: 1,
    explanation: "For a TN-C-S (PME) supply, the DNO typically declares a maximum Ze of 0.35 ohms, with measured values commonly in the range 0.2 to 0.35 ohms. This low impedance ensures high earth fault currents, allowing overcurrent devices to operate within the required disconnection times. For TN-S supplies, the maximum declared Ze is typically 0.8 ohms."
  },
  {
    id: 5,
    question: "In a TT system, the earth fault loop impedance (Zs) consists of:",
    options: [
      "The supply transformer winding impedance and the supply cable impedance only",
      "The supply source impedance, the line conductor, the CPC, the installation earth electrode, and the general mass of earth back to the source earth",
      "Only the resistance of the earth electrode",
      "The line and neutral conductor impedances"
    ],
    correctAnswer: 1,
    explanation: "In a TT system, the earth fault loop includes: the supply source impedance, the line conductor from source to fault, the CPC from fault back to the earth electrode, the earth electrode resistance, the general mass of earth, and the supply source earth connection. The earth electrode and earth path resistances dominate, giving a much higher Zs than in TN systems."
  },
  {
    id: 6,
    question: "The main reason PME (TN-C-S) earthing is restricted for some applications is:",
    options: [
      "PME supplies have insufficient current capacity",
      "If the PEN conductor breaks, the installation earth rises to supply voltage, creating danger on exposed metalwork and extraneous-conductive-parts",
      "PME supplies cannot be used with RCDs",
      "PME is too expensive for domestic installations"
    ],
    correctAnswer: 1,
    explanation: "The critical risk with PME is that if the PEN conductor becomes open-circuit (broken, disconnected), the installation's earthing terminal is no longer connected to the supply earth. Load current flowing through the neutral will cause the earth terminal — and all earthed metalwork — to rise to a dangerous voltage. This is why PME earthing has restrictions for swimming pools, caravan parks, petrol stations and other special locations."
  },
  {
    id: 7,
    question: "An IT earthing system is characterised by:",
    options: [
      "The source being directly earthed and the installation using an earth electrode",
      "The source being isolated from earth (or earthed through a high impedance) so that a single earth fault does not cause automatic disconnection",
      "Using information technology to monitor earthing",
      "The installation having no earthing at all"
    ],
    correctAnswer: 1,
    explanation: "In an IT system, the supply source is either isolated from earth or connected through a high impedance. A first earth fault produces only a small fault current (through the distributed capacitance or the high impedance connection) that is insufficient to cause automatic disconnection. This allows continuity of supply — critical in hospitals, process plants and other locations where unexpected disconnection is dangerous."
  },
  {
    id: 8,
    question: "In an IT system, what happens when a second earth fault occurs on a different phase?",
    options: [
      "Nothing — the system continues to operate normally",
      "The two faults create a phase-to-phase fault through earth, requiring immediate disconnection",
      "The insulation monitoring device resets",
      "The supply voltage increases"
    ],
    correctAnswer: 1,
    explanation: "A second earth fault on a different phase creates a fault loop through earth between the two faulted phases. This is effectively a phase-to-phase short-circuit through the earth path, producing a high fault current that must be cleared by overcurrent protection. This is why IT systems require insulation monitoring devices (IMDs) to detect the first fault and raise an alarm so it can be rectified before a second fault occurs."
  },
  {
    id: 9,
    question: "The maximum value of earth electrode resistance for a TT system protected by a 30 mA RCD is:",
    options: [
      "20 ohms",
      "200 ohms",
      "1,667 ohms",
      "There is no maximum"
    ],
    correctAnswer: 2,
    explanation: "For a 30 mA RCD, the maximum Zs = 50 V / 0.03 A = 1,667 ohms. Since the earth electrode resistance (RA) dominates Zs in a TT system, RA must not exceed approximately 1,667 ohms. In practice, earth electrode resistances are typically kept well below 200 ohms to provide an adequate safety margin."
  },
  {
    id: 10,
    question: "When measuring Ze on a TN-C-S supply, a typical acceptable value would be:",
    options: [
      "0.28 ohms",
      "2.8 ohms",
      "28 ohms",
      "280 ohms"
    ],
    correctAnswer: 0,
    explanation: "A typical Ze measurement on a TN-C-S (PME) supply would be around 0.2 to 0.35 ohms. A value of 0.28 ohms is entirely normal and within the DNO's declared maximum of 0.35 ohms. Values of 2.8 ohms or higher would indicate a problem with the earthing or suggest a TT rather than TN-C-S arrangement."
  },
  {
    id: 11,
    question: "BS 7671 requires the main earthing terminal to be accessible for:",
    options: [
      "Decorative purposes",
      "Testing, inspection and disconnection of the earthing conductor",
      "Connection of surge protection devices only",
      "Connection of telecommunications equipment"
    ],
    correctAnswer: 1,
    explanation: "Regulation 542.4.1 requires that the main earthing terminal is accessible for inspection, testing and, where necessary, disconnection of the earthing conductor. This is essential for measuring Ze (which requires disconnecting the installation earth from the main earthing terminal to isolate the external loop impedance from the installation's own earth paths)."
  },
  {
    id: 12,
    question: "Which earthing system type is most commonly used for new domestic supplies in the UK?",
    options: [
      "TN-S",
      "TN-C-S (PME)",
      "TT",
      "IT"
    ],
    correctAnswer: 1,
    explanation: "TN-C-S (PME — Protective Multiple Earthing) is the most common earthing arrangement for new domestic supplies in the UK. The DNO provides earth via the combined neutral/earth (PEN) conductor of the supply cable. PME provides a low-impedance earth, good for overcurrent protection disconnection times. TN-S is common in older urban areas, and TT is used in rural areas where the DNO does not provide an earth terminal."
  }
];

const faqs = [
  {
    question: "How do I determine what type of earthing system an installation has?",
    answer: "Inspect the supply intake position. In a TN-S system, you will find a separate earth terminal connected to the cable sheath or armour. In a TN-C-S (PME) system, the earth terminal is derived from the combined neutral/earth conductor, often with a link or connection at the cutout. In a TT system, there is no earth terminal from the supplier — the installation has its own earth electrode. The supply type should be recorded on the electrical installation certificate or EICR."
  },
  {
    question: "What is the difference between Ze and Zs?",
    answer: "Ze is the external earth fault loop impedance — the impedance of the supply earth loop outside the installation, measured at the origin with the installation earthing disconnected. Zs is the total earth fault loop impedance at any point in the installation, including Ze plus the impedance of the circuit's line conductor (R1) and circuit protective conductor (R2) from the origin to the point of measurement. Zs = Ze + (R1 + R2)."
  },
  {
    question: "Can a TT system use overcurrent devices (MCBs) for earth fault protection instead of RCDs?",
    answer: "In theory, if the earth fault loop impedance is low enough for an MCB to trip within the required time (0.4 seconds for final circuits up to 32 A), an MCB could provide earth fault protection. In practice, TT earth electrode resistances are almost always too high for this. A 30 mA RCD will operate with Zs up to 1,667 ohms, whereas a 32 A Type B MCB requires Zs below approximately 1.44 ohms. RCD protection is therefore essential in TT systems."
  },
  {
    question: "Why is PME earthing not permitted for some special locations?",
    answer: "PME earthing carries the risk that if the PEN conductor breaks, all earthed metalwork in the installation could rise to dangerous voltage. In special locations such as swimming pools, marinas, caravan parks and petrol stations, the consequences of this voltage appearing on metalwork that people may be in contact with (especially in wet or conductive conditions) are considered unacceptable. BS 7671 and the DNO's conditions require TT earthing for these locations."
  },
  {
    question: "What is the minimum earth electrode resistance that should be aimed for in a TT system?",
    answer: "While the theoretical maximum for a 30 mA RCD is 1,667 ohms, best practice aims for an earth electrode resistance well below 200 ohms, and ideally below 20 ohms. Lower resistance provides a better safety margin, improves protection coordination, and reduces the magnitude of touch voltages during faults. The actual resistance depends on soil conditions — clay soils give lower resistance than sandy or rocky ground."
  }
];

const MOETModule2Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4">
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
            <Activity className="h-4 w-4" />
            <span>Module 2.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earthing Systems (TN, TT, IT)
          </h1>
          <p className="text-white/80">
            Types of earthing arrangements, their characteristics and applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>TN-S:</strong> Separate earth from supply cable sheath/conductor</li>
              <li className="pl-1"><strong>TN-C-S (PME):</strong> Combined PEN in supply, separated at origin</li>
              <li className="pl-1"><strong>TT:</strong> Local earth electrode, no supply earth — needs RCD</li>
              <li className="pl-1"><strong>IT:</strong> Isolated source — first fault does not disconnect</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Identification:</strong> Determine system type at supply intake</li>
              <li className="pl-1"><strong>Testing:</strong> Measure Ze to verify earthing integrity</li>
              <li className="pl-1"><strong>Protection:</strong> Match device selection to earthing type</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to earthing and protection system KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of earthing and its role in automatic disconnection of supply",
              "Describe TN-S, TN-C-S (PME) and TT earthing arrangements and how to identify them",
              "Understand the IT earthing system and its applications in critical installations",
              "Identify the risks associated with PME earthing and the special location restrictions",
              "Measure and interpret external earth fault loop impedance (Ze) values",
              "Reference BS 7671 Part 4 and Section 542 earthing requirements"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Purpose and Principles of Earthing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earthing is the foundation of electrical safety. Without a reliable earth connection, protective
              devices cannot operate when a fault occurs, and metalwork that should be safe to touch can
              become live at dangerous voltages. The fundamental purpose of earthing is to create a
              low-impedance path for earth fault current to flow from the point of fault back to the source
              (the star point of the supply transformer), thereby ensuring that protective devices — fuses,
              MCBs or RCDs — can detect the fault and disconnect the supply within a safe time.
            </p>
            <p>
              BS 7671 addresses earthing in Part 4 (Protection for safety, Chapter 41 — Automatic
              disconnection of supply) and Part 5 (Section 542 — Earthing arrangements). The standard
              classifies earthing systems using a lettering scheme derived from IEC 60364, based on the
              relationship between the source earth and the installation earth.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earthing System Classification</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>First letter — Source earthing:</strong> T = source directly earthed (terre = earth); I = source isolated or high-impedance earthed</li>
                <li className="pl-1"><strong>Second letter — Installation earthing:</strong> T = exposed-conductive-parts earthed via local electrode; N = exposed-conductive-parts connected to the supply earth (neutral)</li>
                <li className="pl-1"><strong>Third letter (TN only):</strong> S = separate N and PE conductors; C = combined PEN conductor; C-S = combined in supply, separate in installation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Why Earthing Type Matters for Maintenance</p>
              <p className="text-sm text-white">
                The type of earthing system directly determines the earth fault loop impedance, which in turn
                determines which protective devices can achieve the required disconnection times. A maintenance
                technician must be able to identify the earthing system, understand its implications for
                protection, and verify that the earthing arrangement is intact and effective through measurement
                and inspection.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            TN Systems — TN-S and TN-C-S
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              TN systems provide a metallic earth return path from the installation back to the supply
              transformer star point. This metallic path has low impedance, resulting in high earth fault
              currents that allow overcurrent protective devices (fuses and MCBs) to achieve fast
              disconnection. TN is the most common earthing arrangement in the UK.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">TN-S (Separate)</h3>
                <p className="text-sm text-white mb-2">
                  In a TN-S system, the protective earth (PE) conductor is separate from the neutral (N)
                  throughout both the supply and the installation. The earth path is typically provided by the
                  metallic sheath (lead or aluminium) of the supply cable or by a dedicated earth conductor.
                  This system is common in older urban areas where the supply uses paper-insulated lead-sheathed
                  (PILC) cables.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Typical Ze: 0.4 to 0.8 ohms (DNO maximum declared: 0.8 ohms)</li>
                  <li className="pl-1">Earth terminal: connected to cable sheath at the cutout</li>
                  <li className="pl-1">Safe for all applications — no PEN conductor risk</li>
                  <li className="pl-1">Being replaced by TN-C-S as networks are modernised</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">TN-C-S (PME — Protective Multiple Earthing)</h3>
                <p className="text-sm text-white mb-2">
                  TN-C-S is the most common arrangement for new UK supplies. The supply cable uses a combined
                  PEN (Protective Earth and Neutral) conductor. At the origin of the installation, the PEN
                  is separated into distinct neutral (N) and protective earth (PE) conductors. The PEN conductor
                  is earthed at multiple points along the supply network — hence 'Protective Multiple Earthing'.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Typical Ze: 0.2 to 0.35 ohms (DNO maximum declared: 0.35 ohms)</li>
                  <li className="pl-1">Lowest Ze — therefore highest fault currents and fastest disconnection</li>
                  <li className="pl-1">PEN conductor minimum: 10 mm² Cu or 16 mm² Al</li>
                  <li className="pl-1">Risk: broken PEN conductor causes dangerous voltages on earthed metalwork</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">PME Risks and Restrictions</p>
              <p className="text-sm text-white">
                The critical risk with PME is loss of the PEN conductor. If the PEN conductor becomes
                open-circuit between the installation and the transformer, load current that would normally
                return via the neutral is forced to flow through the installation's earth system. This causes
                the earth terminal and all connected metalwork to rise to a potentially lethal voltage. BS 7671
                and DNO regulations restrict PME earthing for swimming pools, marinas, construction sites,
                caravan parks, agricultural premises and petrol filling stations.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TN System Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">TN-S</th>
                      <th className="border border-white/10 px-3 py-2 text-left">TN-C-S (PME)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum declared Ze</td>
                      <td className="border border-white/10 px-3 py-2">0.8 ohms</td>
                      <td className="border border-white/10 px-3 py-2">0.35 ohms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth return</td>
                      <td className="border border-white/10 px-3 py-2">Cable sheath (separate)</td>
                      <td className="border border-white/10 px-3 py-2">PEN conductor (combined)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PEN conductor risk</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                      <td className="border border-white/10 px-3 py-2">Yes — loss causes danger</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Special location restrictions</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                      <td className="border border-white/10 px-3 py-2">Yes — pools, marinas, etc.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When inspecting a TN-C-S installation, check the integrity of the
              main bonding conductors. These limit the potential difference between earthed metalwork and
              extraneous-conductive-parts (gas, water pipes) in the event of a PEN conductor issue. Inadequate
              bonding in a PME installation is a serious deficiency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            TT Earthing Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a TT system, the supply company does not provide an earth terminal. The installation must
              obtain its own connection to earth, typically via one or more earth electrodes driven into the
              ground. The earth fault return path includes the resistance of the earth electrode and the
              general mass of earth between the installation electrode and the supply transformer's earth
              connection. This earth path resistance is significantly higher than the metallic path in a TN
              system.
            </p>
            <p>
              TT systems are common in rural areas of the UK where the overhead line supply does not include
              a suitable earth conductor. They are also required in locations where PME earthing is restricted.
              The high earth fault loop impedance characteristic of TT systems means that RCDs are essential
              for earth fault protection — overcurrent devices alone cannot achieve the required disconnection
              times.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TT System Characteristics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Earth electrode types:</strong> Driven rods (copper-clad steel), copper plates, bare copper tape buried in trenches, foundation electrodes</li>
                <li className="pl-1"><strong>Typical electrode resistance:</strong> 10 to 200 ohms (depends heavily on soil conditions)</li>
                <li className="pl-1"><strong>Protection:</strong> RCD essential — 30 mA for additional protection, with maximum Zs &le; 1,667 ohms</li>
                <li className="pl-1"><strong>Testing:</strong> Earth electrode resistance must be measured separately during periodic inspection</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Electrode Resistance and Soil Conditions</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Soil Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Resistivity (ohm-m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Expected Electrode Resistance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clay (moist)</td>
                      <td className="border border-white/10 px-3 py-2">5 - 20</td>
                      <td className="border border-white/10 px-3 py-2">Low (5 - 30 ohms)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Loam/topsoil</td>
                      <td className="border border-white/10 px-3 py-2">10 - 100</td>
                      <td className="border border-white/10 px-3 py-2">Moderate (10 - 100 ohms)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sand</td>
                      <td className="border border-white/10 px-3 py-2">50 - 500</td>
                      <td className="border border-white/10 px-3 py-2">High (50 - 300 ohms)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rock (granite/sandstone)</td>
                      <td className="border border-white/10 px-3 py-2">1,000 - 10,000</td>
                      <td className="border border-white/10 px-3 py-2">Very high (200+ ohms)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance note:</strong> Earth electrode resistance can vary significantly with season —
              dry summer conditions can increase resistance dramatically as soil moisture decreases. Periodic
              inspection should ideally include earth electrode resistance measurement, and the installation
              owner should be aware that seasonal variation may affect protection performance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            IT Earthing Systems and Insulation Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IT earthing system is fundamentally different from TN and TT systems. In an IT system, the
              supply source (transformer) is either completely isolated from earth or connected to earth
              through a deliberate high impedance. This means that a single earth fault does not create a
              closed circuit for significant fault current to flow — the fault current is limited to a small
              value determined by the distributed capacitance of the system or the impedance of the earthing
              connection.
            </p>
            <p>
              The key advantage is continuity of supply. When a first earth fault occurs, the system continues
              to operate safely because the fault current is too small to cause danger or trip protective
              devices. An insulation monitoring device (IMD) detects the fault and raises an alarm, allowing
              maintenance personnel to locate and repair the fault in a planned manner without interrupting
              supply.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IT System Applications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hospitals:</strong> Operating theatres and critical care areas where loss of supply could be life-threatening</li>
                <li className="pl-1"><strong>Process industries:</strong> Chemical plants and refineries where unexpected shutdown could cause hazardous conditions</li>
                <li className="pl-1"><strong>Mining:</strong> Underground mining where fault conditions combined with water create extreme danger</li>
                <li className="pl-1"><strong>Laboratory equipment:</strong> Sensitive measurement systems where leakage currents could affect results</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">IT System Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insulation monitoring device (IMD):</strong> Continuously monitors insulation resistance and alarms on first fault</li>
                <li className="pl-1"><strong>Second fault protection:</strong> Overcurrent devices must disconnect for a second fault (which creates a phase-to-phase path through earth)</li>
                <li className="pl-1"><strong>Maintenance:</strong> First faults must be rectified promptly to maintain the safety advantage</li>
                <li className="pl-1"><strong>Exposed-conductive-parts:</strong> Must still be earthed (individually or collectively) for second-fault protection</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 context:</strong> While IT systems are less common than TN or TT in general
              maintenance work, understanding their principle is important for the maintenance technician
              standard. You may encounter IT systems in hospital maintenance, industrial process plants,
              or when working with standby generators and UPS systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Testing and Verification of Earthing Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Verifying the integrity and adequacy of the earthing system is a critical part of both initial
              verification and periodic inspection. The key measurements are the external earth fault loop
              impedance (Ze), the total earth fault loop impedance at each circuit endpoint (Zs), and — for
              TT systems — the earth electrode resistance (RA).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measuring Ze</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Method:</strong> Disconnect the installation earthing conductor from the main earthing terminal. Connect the loop impedance tester between line, neutral and the supply earth terminal.</li>
                <li className="pl-1"><strong>Safety:</strong> Whilst the installation earthing is disconnected, there is no earth fault protection. Minimise the disconnection time and ensure no work is carried out on the installation.</li>
                <li className="pl-1"><strong>Expected values:</strong> TN-S: up to 0.8 ohms; TN-C-S: up to 0.35 ohms</li>
                <li className="pl-1"><strong>Anomalies:</strong> A Ze significantly higher than expected may indicate a damaged earthing conductor or a change in the supply arrangement</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Zs Verification</h3>
                <p className="text-sm text-white">
                  Zs is measured at each circuit endpoint (furthest point from the origin) using a loop
                  impedance tester. The measured value must not exceed the maximum Zs for the protective
                  device type and rating, as tabulated in BS 7671. Values should be compared with the
                  corrected (temperature-adjusted) tabulated maximums, applying a 0.8 multiplier to the
                  table values for ambient temperature correction during testing.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Electrode Testing (TT)</h3>
                <p className="text-sm text-white">
                  For TT systems, the earth electrode resistance (RA) must be measured using the fall-of-
                  potential method with a dedicated earth electrode tester. This involves placing temporary
                  test electrodes at defined distances from the installation electrode and measuring the
                  voltage gradient. The 61.8% rule is used to determine the correct measurement point for
                  accuracy.
                </p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Always record earthing system type and Ze on the electrical installation
              certificate or periodic inspection report. Changes in Ze over time can indicate deterioration of
              the supply earth connection and should be investigated with the DNO.
            </p>
          </div>
        </section>

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
                <p className="font-medium text-white mb-1">Earthing System Types</p>
                <ul className="space-y-0.5">
                  <li>TN-S — Separate PE, Ze &le; 0.8 ohms</li>
                  <li>TN-C-S — PME, Ze &le; 0.35 ohms</li>
                  <li>TT — Local electrode, RCD essential</li>
                  <li>IT — Isolated source, IMD required</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Chapter 41 — Automatic disconnection of supply</li>
                  <li>Section 542 — Earthing arrangements</li>
                  <li>Table 41.1/41.2 — Maximum disconnection times</li>
                  <li>Reg 543.4.1 — PEN conductor requirements</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Overcurrent and Short-Circuit Protection
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-5">
              Next: Bonding Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section4_4;
