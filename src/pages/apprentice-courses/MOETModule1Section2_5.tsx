import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earthing and Bonding for Safety - MOET Module 1.2.5";
const DESCRIPTION = "Comprehensive guide to earthing and bonding: fault current paths, disconnection times, TN-S/TN-C-S/TT/IT systems, main protective bonding, supplementary bonding, earth electrodes, earth fault loop impedance, protective conductor sizing and testing under BS 7671:2018+A3:2024.";

const quickCheckQuestions = [
  {
    id: "earthing-purpose",
    question: "What is the PRIMARY purpose of earthing in an electrical installation?",
    options: [
      "To reduce electricity bills by improving power factor",
      "To provide a low-impedance fault current path so protective devices operate quickly to disconnect the supply",
      "To prevent static electricity building up on equipment casings",
      "To improve the quality of the electrical supply"
    ],
    correctIndex: 1,
    explanation: "The primary purpose of earthing is to provide a low-impedance path for fault current to flow back to the source, enabling protective devices (fuses, MCBs, RCDs) to detect the fault and disconnect the supply within the required time specified in BS 7671. Without an effective earth path, a fault to an exposed-conductive-part could leave it at a dangerous potential indefinitely."
  },
  {
    id: "tncs-system",
    question: "In a TN-C-S (PME) system, the neutral and earth functions are:",
    options: [
      "Completely separate throughout the system",
      "Combined in a single PEN conductor in the supply network, then separated at the origin of the installation",
      "Combined throughout the entire installation including final circuits",
      "Never connected to each other"
    ],
    correctIndex: 1,
    explanation: "In a TN-C-S system (Protective Multiple Earthing / PME), the supply network uses a combined Protective Earth and Neutral (PEN) conductor. At the origin of the consumer's installation, this is separated into distinct neutral (N) and earth (PE) conductors. TN-C-S is the most common earthing system for new installations in the UK. The term 'PME' refers to the multiple earthing of the neutral conductor along the supply network."
  },
  {
    id: "bonding-purpose",
    question: "The purpose of main protective bonding is to:",
    options: [
      "Improve the earth fault loop impedance for faster disconnection",
      "Ensure all extraneous-conductive-parts are at the same potential as the main earthing terminal, preventing dangerous potential differences during a fault",
      "Provide a return path for normal load current",
      "Connect the gas and water pipes to the electricity supply"
    ],
    correctIndex: 1,
    explanation: "Main protective bonding connects extraneous-conductive-parts (such as metallic water, gas and oil pipes, structural steelwork and lightning protection systems) to the main earthing terminal. This creates an equipotential zone — ensuring that during a fault, all metallic parts that a person could simultaneously touch are at substantially the same potential, preventing a dangerous voltage across the body."
  },
  {
    id: "loop-impedance",
    question: "Earth fault loop impedance (Zs) must be low enough to ensure that:",
    options: [
      "The voltage drop on the circuit is within limits",
      "Sufficient fault current flows to operate the protective device within the disconnection time required by BS 7671",
      "The neutral current does not exceed the cable rating",
      "The earth electrode resistance is below 1 ohm"
    ],
    correctIndex: 1,
    explanation: "The earth fault loop impedance (Zs) determines the fault current that will flow during an earth fault: If = Uo/Zs. If Zs is too high, the fault current will be too low to operate the protective device (fuse or MCB) within the disconnection time specified in BS 7671 (0.4 s for socket outlets and portable equipment, 5 s for fixed equipment in TN systems). This would leave the exposed-conductive-part energised at a dangerous potential."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a TN-S earthing system, the means of earthing is:",
    options: [
      "The supply neutral conductor",
      "A separate earth conductor provided by the DNO, typically the cable sheath",
      "An earth electrode at the installation",
      "A combined PEN conductor"
    ],
    correctAnswer: 1,
    explanation: "In a TN-S system, the DNO provides a separate earth conductor — typically the metallic sheath (lead or aluminium) of the supply cable. This is connected to the main earthing terminal of the installation. The 'S' in TN-S stands for 'separate' — the earth (PE) and neutral (N) are separate conductors throughout the entire system."
  },
  {
    id: 2,
    question: "A TT earthing system requires:",
    options: [
      "A PEN conductor from the supply",
      "A separate metallic return path to the substation earth",
      "The installation to provide its own earth electrode, with the earth return path through the general mass of earth",
      "No earth connection at all"
    ],
    correctAnswer: 2,
    explanation: "In a TT system, the installation provides its own earth electrode (typically a driven rod, plate or foundation earth). The fault current return path is through the general mass of earth back to the source transformer's earthed neutral. Because the earth path impedance is relatively high, TT systems almost always require RCD protection to achieve the required disconnection times."
  },
  {
    id: 3,
    question: "The main earthing terminal is the point where:",
    options: [
      "The electricity meter is connected",
      "The earthing conductor, main protective bonding conductors and circuit protective conductors all connect to form the installation's earth reference",
      "The consumer unit is mounted on the wall",
      "Lightning protection is connected to the building"
    ],
    correctAnswer: 1,
    explanation: "The main earthing terminal (MET) is the central connection point for the installation's earthing system. It connects: the earthing conductor (from the means of earthing), the main protective bonding conductors (from extraneous-conductive-parts), and the circuit protective conductors (via the distribution board). It is the star point of the installation's earth network."
  },
  {
    id: 4,
    question: "Under BS 7671:2018+A3:2024, the minimum cross-sectional area of a main protective bonding conductor in a PME installation with 25 mm² supply tails is:",
    options: [
      "4 mm²",
      "6 mm²",
      "10 mm²",
      "16 mm²"
    ],
    correctAnswer: 2,
    explanation: "For TN-C-S (PME) installations, BS 7671 Table 54.8 specifies minimum bonding conductor sizes. Where the supply neutral is 25 mm² copper, the minimum main protective bonding conductor is 10 mm² copper. For 35 mm² supply tails (common in modern domestic installations), the minimum is 10 mm² copper. These sizes ensure the bonding conductor can carry the prospective fault current without damage."
  },
  {
    id: 5,
    question: "Supplementary bonding is required when:",
    options: [
      "It is always required in every installation",
      "The conditions for automatic disconnection of supply cannot be met, or in specific special locations such as bathrooms",
      "The installation has an RCD fitted",
      "The building has a lightning protection system"
    ],
    correctAnswer: 1,
    explanation: "Supplementary bonding locally connects exposed-conductive-parts and extraneous-conductive-parts within a specific area. It is required when the conditions for automatic disconnection cannot be met by the protective device, and in special locations defined by BS 7671 (such as bathrooms — Section 701, swimming pools — Section 702). However, BS 7671 now permits supplementary bonding in bathrooms to be omitted if all circuits are RCD-protected (≤30 mA) and the protective conductor meets specific requirements."
  },
  {
    id: 6,
    question: "An earth electrode for a TT system is typically:",
    options: [
      "A copper water pipe connected to the mains water supply",
      "A driven copper-clad steel rod, copper plate, or foundation earth electrode in direct contact with the general mass of earth",
      "An aluminium rod hammered into the ground",
      "A connection to the gas pipe"
    ],
    correctAnswer: 1,
    explanation: "Earth electrodes for TT systems are typically driven copper-clad steel rods (usually 1.2 m lengths coupled together to achieve the required depth), copper plates, or foundation earth electrodes (copper conductors embedded in the concrete foundations). The electrode must be in direct contact with the general mass of earth. Water and gas pipes must NOT be used as the sole means of earthing — they are extraneous-conductive-parts that require bonding TO the earthing system."
  },
  {
    id: 7,
    question: "The earth fault loop impedance (Zs) for a circuit is the sum of:",
    options: [
      "The resistance of the line conductor and the neutral conductor only",
      "The source impedance (Ze), the line conductor impedance (R1) and the circuit protective conductor impedance (R2)",
      "The resistance of the earth electrode only",
      "The impedance of the supply transformer"
    ],
    correctAnswer: 1,
    explanation: "The total earth fault loop impedance is: Zs = Ze + (R1 + R2), where Ze is the external earth fault loop impedance (from the supply), R1 is the resistance of the line conductor from the distribution board to the point of utilisation, and R2 is the resistance of the circuit protective conductor over the same length. All three elements contribute to determining the fault current that will flow."
  },
  {
    id: 8,
    question: "For a 230 V circuit protected by a 32 A Type B MCB in a TN system, BS 7671 requires disconnection within:",
    options: [
      "0.1 seconds",
      "0.4 seconds for socket outlet circuits (or portable equipment), 5 seconds for fixed equipment",
      "10 seconds",
      "No specific time is required"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 41.1 specifies maximum disconnection times for TN systems: 0.4 seconds for circuits supplying socket outlets and portable equipment (where a person could be in direct contact), and 5 seconds for circuits supplying fixed equipment. These times ensure that the touch voltage on exposed-conductive-parts does not persist long enough to cause ventricular fibrillation."
  },
  {
    id: 9,
    question: "The protective conductor (CPC) in a ring final circuit can be sized using the adiabatic equation. This equation relates the minimum conductor size to:",
    options: [
      "The length of the circuit and the voltage drop",
      "The prospective fault current, the disconnection time and the material properties of the conductor (k factor)",
      "The load current and the ambient temperature",
      "The number of socket outlets on the ring"
    ],
    correctAnswer: 1,
    explanation: "The adiabatic equation is S = √(I²t) / k, where S is the minimum conductor cross-sectional area (mm²), I is the prospective fault current (A), t is the disconnection time (s), and k is a factor depending on the conductor material and insulation type (from BS 7671 Table 54.2-54.6). This ensures the CPC can carry the fault current without its temperature exceeding safe limits for the insulation."
  },
  {
    id: 10,
    question: "When testing an earthing system, the earth electrode resistance (RA) for a TT system protected by a 30 mA RCD must not exceed:",
    options: [
      "1 Ω",
      "200 Ω",
      "1667 Ω (50 V ÷ 0.03 A)",
      "Any value is acceptable if an RCD is fitted"
    ],
    correctAnswer: 2,
    explanation: "For a TT system with RCD protection, the condition is: RA × IΔn ≤ 50 V, where RA is the electrode resistance and IΔn is the rated residual operating current of the RCD. For a 30 mA RCD: RA ≤ 50 / 0.03 = 1667 Ω. In practice, electrode resistance values well below this (typically below 200 Ω) are desirable for reliable RCD operation and to limit touch voltages under fault conditions."
  },
  {
    id: 11,
    question: "Temporary earthing for HV maintenance is applied to:",
    options: [
      "Improve the quality of test readings",
      "Discharge stored energy, protect against inadvertent re-energisation, and ensure the work area remains at earth potential",
      "Provide a better connection for portable tools",
      "Meet insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "Temporary earths (portable earthing equipment) are applied to HV systems during maintenance to: discharge any stored energy (capacitive charge on cables, residual magnetism in transformers), protect workers against inadvertent re-energisation (if someone switches on the supply, the earths create a dead short circuit that will trip the protective device), and ensure the work area conductors remain at earth potential."
  },
  {
    id: 12,
    question: "A common earthing defect found during periodic inspection is:",
    options: [
      "Too many earth connections at the main earthing terminal",
      "Corroded, loose or disconnected main protective bonding conductors",
      "Earth conductors that are too large",
      "Too many supplementary bonds in the bathroom"
    ],
    correctAnswer: 1,
    explanation: "Corroded, loose or disconnected bonding conductors are among the most commonly found defects during periodic inspection. Over time, connections can corrode (particularly at dissimilar metal joints), vibration can loosen clamps, and plumbing or gas work can result in bonding being disconnected and not reconnected. These defects can leave metallic parts unbonded, creating a serious risk of dangerous potential differences during a fault."
  }
];

const faqs = [
  {
    question: "What is the difference between earthing and bonding?",
    answer: "Earthing provides a path for fault current to flow back to the source, enabling protective devices to operate and disconnect the faulty circuit. Bonding connects metallic parts together to ensure they are all at the same potential, preventing dangerous voltage differences that could cause a shock if a person touched two parts at different potentials simultaneously. Both are essential — earthing provides automatic disconnection, bonding provides equipotential protection."
  },
  {
    question: "Why does a TT system always need an RCD?",
    answer: "In a TT system, the earth fault return path is through the general mass of earth, which has a much higher impedance than the metallic return path in TN systems. This high impedance limits the earth fault current, often to levels too low for fuses or MCBs to operate within the required disconnection time. An RCD detects the imbalance between line and neutral current caused by an earth fault and disconnects the supply at a much lower current (typically 30 mA), providing effective protection even with high earth electrode resistance."
  },
  {
    question: "Can I use a water pipe as the sole means of earthing?",
    answer: "No. BS 7671 does not permit metallic water, gas or oil pipes to be used as the sole means of earthing. These pipes may be replaced with plastic in the future (or may already have plastic sections), and their continuity cannot be guaranteed. However, metallic pipes that enter the building must be bonded TO the earthing system as extraneous-conductive-parts — they are bonded for safety, not used as the earth itself."
  },
  {
    question: "What is an IT earthing system and where is it used?",
    answer: "An IT system has an unearthed or impedance-earthed source (the transformer neutral is not connected directly to earth). The first earth fault does not cause a dangerous touch voltage because there is no direct return path to the source. This allows the system to continue operating after a single fault — which is why IT systems are used in critical applications such as operating theatres, intensive care units and continuous process industries where an unexpected disconnection could be life-threatening."
  },
  {
    question: "How do I test earth fault loop impedance on a TT system with an RCD?",
    answer: "Standard loop impedance testers will trip the RCD on a TT system because they inject a test current that exceeds the RCD threshold. Use a loop impedance tester with a 'non-trip' or 'RCD safe' mode, which limits the test current to below 15 mA. Alternatively, measure Ze at the origin (with the installation disconnected) and add the measured R1+R2 values for the circuit. Some modern testers can measure Zs in the presence of RCDs using a two-wire method."
  }
];

const MOETModule1Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2">
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
            <span>Module 1.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earthing and Bonding for Safety
          </h1>
          <p className="text-white/80">
            Protective earthing, equipotential bonding and fault current management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Earthing:</strong> Fault current path for automatic disconnection</li>
              <li className="pl-1"><strong>Bonding:</strong> Equipotential zone — no dangerous voltage differences</li>
              <li className="pl-1"><strong>Systems:</strong> TN-S, TN-C-S (PME), TT and IT</li>
              <li className="pl-1"><strong>Testing:</strong> Zs, Ze, R1+R2 and earth electrode resistance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 7671:2018+A3:2024:</strong> Chapters 41, 54; Tables 41.1-41.6</li>
              <li className="pl-1"><strong>EAWR 1989:</strong> Reg 8 (earthing); Reg 9 (integrity of earth)</li>
              <li className="pl-1"><strong>BS EN 62305:</strong> Lightning protection earthing</li>
              <li className="pl-1"><strong>ENA ER S34:</strong> DNO earthing requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of earthing in creating a fault current path for automatic disconnection",
              "Describe the characteristics of TN-S, TN-C-S, TT and IT earthing systems",
              "Identify the requirements for main protective bonding under BS 7671",
              "Calculate earth fault loop impedance and verify disconnection times",
              "Explain protective conductor sizing using the adiabatic equation",
              "Describe testing methods for earthing systems and common defects"
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

        {/* Section 01: Purpose of Earthing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Purpose of Earthing — Fault Current Paths and Disconnection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earthing is one of the most fundamental safety measures in any electrical installation. Its
              primary purpose is to provide a low-impedance path for fault current to flow back to the
              source transformer when a fault occurs between a live conductor and an exposed-conductive-part
              (such as a metal equipment casing). This fault current path enables the protective device
              (fuse, MCB or RCD) to detect the fault and disconnect the supply within the time specified
              by BS 7671.
            </p>
            <p>
              Without an effective earthing system, a fault between a live conductor and a metal casing
              would leave the casing energised at a dangerous potential. Anyone touching the casing while
              simultaneously in contact with earth (through their feet on a conductive floor, or by
              touching another earthed metallic part) would receive an electric shock. The earthing system
              ensures this situation is detected and cleared rapidly — typically within 0.4 seconds for
              circuits supplying socket outlets.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How Earthing Achieves Safety</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fault current path:</strong> The earthing system provides a low-impedance return path for fault current from the point of fault back to the source (transformer star point)</li>
                <li className="pl-1"><strong>Sufficient fault current:</strong> The low impedance ensures enough current flows to operate the protective device — for a 32 A Type B MCB, the instantaneous trip requires at least 160 A (5 × In)</li>
                <li className="pl-1"><strong>Fast disconnection:</strong> The protective device disconnects within the required time: 0.4 s for portable equipment circuits (TN), 5 s for fixed equipment (TN), 0.2 s for TT systems with RCDs</li>
                <li className="pl-1"><strong>Limited touch voltage:</strong> During the brief fault clearance time, the touch voltage on the exposed-conductive-part is limited by the protective device operating quickly</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Earth Fault Loop</p>
              <p className="text-sm text-white mb-3">
                The earth fault loop is the complete circuit that fault current flows through during an
                earth fault. Understanding its components is essential for testing and verifying that
                disconnection times will be met.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Source impedance:</strong> The transformer winding impedance (typically very low, 0.01-0.05 Ω)</li>
                <li className="pl-1"><strong>Line conductor (R1):</strong> Impedance of the phase conductor from the distribution board to the point of fault</li>
                <li className="pl-1"><strong>Fault:</strong> The fault itself (assumed zero impedance for a bolted fault)</li>
                <li className="pl-1"><strong>Protective conductor (R2):</strong> Impedance of the CPC from the point of fault back to the distribution board</li>
                <li className="pl-1"><strong>Earthing conductor:</strong> From the distribution board MET to the means of earthing</li>
                <li className="pl-1"><strong>Return path:</strong> Through the supply earth (metallic sheath in TN-S, PEN in TN-C-S, or general mass of earth in TT)</li>
                <li className="pl-1"><strong>Total: Zs = Ze + (R1 + R2)</strong> — all components add up to determine the total loop impedance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Disconnection Times (Table 41.1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Uo (V)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disconnection Time (Socket Outlets)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disconnection Time (Fixed Equipment)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN (TN-S, TN-C-S)</td>
                      <td className="border border-white/10 px-3 py-2">230 V</td>
                      <td className="border border-white/10 px-3 py-2">0.4 s</td>
                      <td className="border border-white/10 px-3 py-2">5 s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TT</td>
                      <td className="border border-white/10 px-3 py-2">230 V</td>
                      <td className="border border-white/10 px-3 py-2">0.2 s</td>
                      <td className="border border-white/10 px-3 py-2">1.0 s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The earthing system is only as effective as its weakest link. A
              corroded connection, an undersized conductor, or a broken protective conductor can render
              the entire fault protection system ineffective. Regular inspection and testing of the
              earthing system is essential for continued safety.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Earthing Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Earthing Systems — TN-S, TN-C-S, TT and IT
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 classifies earthing systems using a letter code defined in IEC 60364. The first
              letter indicates the relationship of the source (transformer) to earth, and the second
              letter indicates the relationship of the exposed-conductive-parts of the installation to
              earth. Understanding which earthing system is in use is essential for selecting appropriate
              protection and calculating disconnection requirements.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Letter Code Explained</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>First letter (source relationship to earth):</strong> T = directly connected to earth (terre); I = not connected to earth or connected through a high impedance</li>
                <li className="pl-1"><strong>Second letter (installation to earth):</strong> T = directly connected to earth via local electrode; N = connected to the source earth via the supply network</li>
                <li className="pl-1"><strong>Subsequent letters:</strong> S = separate neutral and earth conductors; C = combined neutral and earth (PEN conductor); C-S = combined in supply, separate in installation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Earthing Systems Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Earth Provision</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Ze</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical UK Use</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RCD Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">TN-S</td>
                      <td className="border border-white/10 px-3 py-2">DNO cable sheath (separate PE)</td>
                      <td className="border border-white/10 px-3 py-2">≤0.8 Ω</td>
                      <td className="border border-white/10 px-3 py-2">Older urban areas with lead-sheathed cables</td>
                      <td className="border border-white/10 px-3 py-2">Not essential for ADS (but required for additional protection)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">TN-C-S (PME)</td>
                      <td className="border border-white/10 px-3 py-2">PEN conductor, separated at origin</td>
                      <td className="border border-white/10 px-3 py-2">≤0.35 Ω</td>
                      <td className="border border-white/10 px-3 py-2">Most new installations; majority of UK supplies</td>
                      <td className="border border-white/10 px-3 py-2">Not essential for ADS (but required for additional protection)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">TT</td>
                      <td className="border border-white/10 px-3 py-2">Installation's own earth electrode</td>
                      <td className="border border-white/10 px-3 py-2">≤21 Ω (varies)</td>
                      <td className="border border-white/10 px-3 py-2">Rural areas; overhead supply; no DNO earth</td>
                      <td className="border border-white/10 px-3 py-2">Essential — RCD protection required for all circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">IT</td>
                      <td className="border border-white/10 px-3 py-2">Unearthed or impedance-earthed source</td>
                      <td className="border border-white/10 px-3 py-2">Very high</td>
                      <td className="border border-white/10 px-3 py-2">Hospitals (theatres), critical processes</td>
                      <td className="border border-white/10 px-3 py-2">Insulation monitoring device required; RCD on second fault</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">PME (TN-C-S) — Special Considerations</p>
              <p className="text-sm text-white mb-3">
                TN-C-S is the most common earthing system in the UK, but it has specific risks that must be
                understood, particularly the 'broken PEN conductor' scenario.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Broken PEN risk:</strong> If the combined PEN conductor breaks between the consumer and the substation, the installation's earthing is lost. Load current from neighbouring properties flows through the consumer's earth, potentially raising all bonded metalwork to a dangerous potential</li>
                <li className="pl-1"><strong>Main bonding:</strong> Enhanced main protective bonding requirements for PME — larger minimum conductor sizes to manage the broken PEN scenario</li>
                <li className="pl-1"><strong>Restrictions:</strong> PME earthing is restricted or prohibited for certain locations: swimming pools, caravan parks (conductive locations), petrol forecourts, and some locations where the broken PEN scenario presents an unacceptable risk</li>
                <li className="pl-1"><strong>BS 7671 Section 411:</strong> Specifies the requirements for automatic disconnection in TN-C-S systems</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always confirm the earthing system type at the start of any work
              on an installation. It determines the disconnection time requirements, the need for RCD
              protection, the bonding conductor sizes and the testing methods. Never assume — verify.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Bonding, Electrodes and Conductor Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Protective Bonding, Earth Electrodes and Conductor Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While earthing provides a fault current path for automatic disconnection, protective bonding
              creates an equipotential zone — ensuring that all metallic parts a person could simultaneously
              touch are at substantially the same potential. Together, earthing and bonding form the two
              pillars of protection against electric shock by indirect contact (touching an exposed-conductive-part
              that has become live due to a fault).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Protective Bonding (BS 7671 Regulation Group 411.3.1.2)</p>
              <p className="text-sm text-white mb-3">
                Main protective bonding conductors connect extraneous-conductive-parts to the main
                earthing terminal (MET) at the origin of the installation.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>What must be bonded:</strong> Metallic water pipes, metallic gas pipes, metallic oil pipes, metallic central heating pipes, structural steelwork, lightning protection system earth, other metallic services entering the building</li>
                <li className="pl-1"><strong>Connection point:</strong> As close as practicable to the point of entry of the service into the building, and on the consumer's side of any insulating section or meter</li>
                <li className="pl-1"><strong>Label:</strong> Every main bonding connection must be labelled: "Safety Electrical Connection — Do Not Remove"</li>
                <li className="pl-1"><strong>Continuity:</strong> The bonding conductor must provide a permanent, reliable connection — not reliant on removable fittings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Protective Bonding Conductor Sizes (BS 7671 Table 54.8)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Supply Neutral CSA (Cu)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min Bonding Conductor (Cu) — TN-S</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min Bonding Conductor (Cu) — TN-C-S (PME)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 16 mm²</td>
                      <td className="border border-white/10 px-3 py-2">6 mm²</td>
                      <td className="border border-white/10 px-3 py-2">10 mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25 mm²</td>
                      <td className="border border-white/10 px-3 py-2">6 mm²</td>
                      <td className="border border-white/10 px-3 py-2">10 mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35 mm²</td>
                      <td className="border border-white/10 px-3 py-2">10 mm²</td>
                      <td className="border border-white/10 px-3 py-2">16 mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50 mm² and above</td>
                      <td className="border border-white/10 px-3 py-2">10 mm²</td>
                      <td className="border border-white/10 px-3 py-2">25 mm²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supplementary Bonding</p>
              <p className="text-sm text-white mb-3">
                Supplementary bonding provides local equipotential bonding within a specific area, connecting
                exposed-conductive-parts and extraneous-conductive-parts together.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>When required:</strong> In special locations (BS 7671 Part 7) where the risk is higher — historically always required in bathrooms, but can now be omitted if all circuits are 30 mA RCD-protected</li>
                <li className="pl-1"><strong>Minimum sizes:</strong> 4 mm² between two exposed-conductive-parts; 4 mm² between an exposed-conductive-part and an extraneous-conductive-part; 2.5 mm² if mechanically protected</li>
                <li className="pl-1"><strong>Verification:</strong> The resistance between simultaneously accessible parts must be ≤ 50/(Ia) ohms, where Ia is the operating current of the protective device</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Electrode Types and Installation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Driven rod:</strong> Copper-clad steel rods (typically 1.2 m sections) coupled and driven into the ground. Most common type for TT systems. Target: RA ≤ 200 Ω (ideally &lt;100 Ω)</li>
                <li className="pl-1"><strong>Copper plate:</strong> Buried copper plate electrode — larger contact area with earth. Used where rod driving is impractical (rocky ground)</li>
                <li className="pl-1"><strong>Foundation earth electrode:</strong> Copper or steel conductor embedded in the building's concrete foundations during construction. Very effective due to large contact area with earth</li>
                <li className="pl-1"><strong>Earth mat/ring:</strong> Horizontal conductor buried around the building perimeter. Used for larger installations or HV substations</li>
                <li className="pl-1"><strong>Factors affecting resistance:</strong> Soil type (clay is better than sand/rock), moisture content, depth, electrode surface area, temperature</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protective Conductor Sizing — The Adiabatic Equation</p>
              <p className="text-sm text-white mb-3">
                The minimum cross-sectional area of a protective conductor is determined by either
                BS 7671 Table 54.7 (simplified method based on line conductor size) or the adiabatic
                equation (calculation method based on fault current and time).
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Adiabatic equation:</strong> S = √(I²t) / k</li>
                <li className="pl-1"><strong>S</strong> = minimum conductor cross-sectional area (mm²)</li>
                <li className="pl-1"><strong>I</strong> = prospective earth fault current (A)</li>
                <li className="pl-1"><strong>t</strong> = disconnection time of the protective device (s)</li>
                <li className="pl-1"><strong>k</strong> = material factor from BS 7671 Tables 54.2-54.6 (e.g., k=115 for PVC-insulated copper)</li>
                <li className="pl-1"><strong>Purpose:</strong> Ensures the CPC can carry the fault current for the disconnection time without its temperature exceeding the insulation rating</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Undersized protective conductors are a serious safety defect. If
              the CPC is too small, it may overheat and fail during a fault — losing the earth path at
              the very moment it is needed most. Always verify CPC sizing against the prospective fault
              current and disconnection time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Testing, Maintenance and Common Defects */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Testing Earthing Systems, Maintenance and Common Defects
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earthing and bonding system must be tested at initial verification and at every periodic
              inspection to confirm that it continues to provide the required level of protection.
              Deterioration over time — through corrosion, mechanical damage, building modifications and
              plumbing/gas work — can compromise the earthing system without any visible indication.
              Regular testing is the only way to identify these hidden defects.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Tests for Earthing and Bonding</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Continuity of protective conductors (R2):</strong> Low-resistance ohmmeter test to verify the CPC is intact throughout its length. Test between the distribution board earth bar and the earth terminal of every point on the circuit</li>
                <li className="pl-1"><strong>Continuity of main bonding:</strong> Test from the MET to each bonded service. Expected reading: very low (&lt;0.05 Ω for short runs). Any high reading indicates a poor connection</li>
                <li className="pl-1"><strong>External earth fault loop impedance (Ze):</strong> Measured at the origin with the installation's earthing conductor disconnected from the MET. Confirms the DNO's earth provision is within acceptable limits</li>
                <li className="pl-1"><strong>Earth fault loop impedance (Zs):</strong> Measured at each point on the circuit. Must be within the maximum values in BS 7671 Tables 41.2-41.6 for the protective device type and rating</li>
                <li className="pl-1"><strong>Earth electrode resistance (RA):</strong> For TT systems — measured using a dedicated earth electrode tester (three-terminal method) or calculated from the Ze measurement</li>
                <li className="pl-1"><strong>R1+R2:</strong> Combined resistance of line and CPC — measured during dead testing and added to Ze to calculate Zs</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Earthing and Bonding Defects</p>
              <p className="text-sm text-white mb-3">
                The following defects are frequently found during periodic inspection and condition
                reporting. Each one can render the protection system partially or completely ineffective.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Disconnected main bonding:</strong> Plumbing or gas work has broken the bonding connection and not reconnected it — extremely common</li>
                <li className="pl-1"><strong>Corroded connections:</strong> Dissimilar metal joints (copper to steel), outdoor connections and damp environments cause corrosion that increases resistance</li>
                <li className="pl-1"><strong>Missing labels:</strong> Bonding connections without the "Safety Electrical Connection — Do Not Remove" label, leading to removal during maintenance</li>
                <li className="pl-1"><strong>Undersized conductors:</strong> Bonding or CPC conductors smaller than the minimum specified in BS 7671 for the installation type</li>
                <li className="pl-1"><strong>Broken CPCs in ring circuits:</strong> A broken CPC in a ring final circuit may not be detected by a simple end-to-end continuity test — the ring measurement is essential</li>
                <li className="pl-1"><strong>Missing earth on old installations:</strong> Pre-1966 installations may have no CPC in the cables — only the circuit earth provided by conduit or sheath</li>
                <li className="pl-1"><strong>Plastic pipe replacement:</strong> Metallic water or gas pipes replaced with plastic sections, breaking the bonding continuity</li>
                <li className="pl-1"><strong>Earth electrode deterioration:</strong> Driven rods corroding underground, increasing resistance over time — annual measurement recommended</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temporary Earthing for HV Work</p>
              <p className="text-sm text-white mb-3">
                When working on HV systems that have been isolated and proved dead, temporary earths
                (portable earthing equipment) are applied as an additional safety measure.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Purpose:</strong> Discharge stored energy, protect against inadvertent re-energisation, maintain work area at earth potential</li>
                <li className="pl-1"><strong>Application:</strong> Applied using approved portable earthing equipment — heavy-duty clamps connected by flexible copper conductor to the system earth bar</li>
                <li className="pl-1"><strong>Sequence:</strong> Always connect to the earth bar FIRST, then to the conductor being earthed. Remove in reverse order (conductor first, earth bar last)</li>
                <li className="pl-1"><strong>Rating:</strong> Portable earths must be rated for the prospective fault current of the system</li>
                <li className="pl-1"><strong>Inspection:</strong> Check portable earths before each use — look for damage to conductors, clamps and insulation. Periodic electrical testing required</li>
                <li className="pl-1"><strong>Recording:</strong> The application and removal of temporary earths must be recorded on the permit to work</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance of Earthing Systems</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Periodic inspection per BS 7671 (domestic: 10 years recommended; commercial: 5 years; industrial: 3 years)</li>
                  <li className="pl-1">Visual check of all bonding connections during any electrical work</li>
                  <li className="pl-1">Earth electrode resistance measurement annually (TT systems)</li>
                  <li className="pl-1">Re-test after any building work that may affect services</li>
                  <li className="pl-1">Replace corroded clamps and connections immediately</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">EAWR 1989 Earthing Regulations</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Reg 8:</strong> Earthing or other suitable precautions must be taken to prevent danger from conductors that may become charged</li>
                  <li className="pl-1"><strong>Reg 9:</strong> The integrity of referenced earthed conductors must be maintained — no single fault should result in danger</li>
                  <li className="pl-1"><strong>Reg 10:</strong> Every joint and connection must be mechanically and electrically suitable</li>
                  <li className="pl-1"><strong>Reg 4(2):</strong> All systems must be maintained to prevent danger — includes the earthing system</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> As a maintenance technician, you will regularly test and verify
              earthing and bonding as part of your inspection and maintenance duties. You must be able to
              measure Ze, Zs, R1+R2 and earth electrode resistance, interpret the results against BS 7671
              requirements, and identify defects that require corrective action.
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
                <p className="font-medium text-white mb-1">Earthing Systems</p>
                <ul className="space-y-0.5">
                  <li>TN-S — Separate earth (cable sheath)</li>
                  <li>TN-C-S — Combined PEN, separated at origin (PME)</li>
                  <li>TT — Installation earth electrode</li>
                  <li>IT — Unearthed/impedance-earthed source</li>
                  <li>Zs = Ze + (R1 + R2)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 7671:2018+A3:2024 — Chapters 41, 54</li>
                  <li>EAWR 1989 — Regulations 8, 9, 10</li>
                  <li>BS 7430 — Code of practice for earthing</li>
                  <li>BS EN 62305 — Lightning protection</li>
                  <li>ST1426 — Maintenance technician KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Approach Distances
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section2_5;
