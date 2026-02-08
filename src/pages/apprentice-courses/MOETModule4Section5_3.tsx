import { ArrowLeft, CircuitBoard, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earth Fault Loop Impedance Testing - MOET Module 4.5.3";
const DESCRIPTION = "Comprehensive guide to earth fault loop impedance testing in electrical maintenance: Ze and Zs measurements, disconnection time verification, test methods, and interpretation of results in accordance with BS 7671.";

const quickCheckQuestions = [
  {
    id: "efli-purpose",
    question: "What is the primary purpose of earth fault loop impedance (Zs) testing?",
    options: [
      "To measure the voltage at the furthest point of the circuit",
      "To verify that the earth fault loop impedance is low enough for the protective device to disconnect the supply within the maximum time specified by BS 7671 in the event of an earth fault",
      "To check the insulation resistance of the cable",
      "To measure the current-carrying capacity of the earth conductor"
    ],
    correctIndex: 1,
    explanation: "Earth fault loop impedance testing verifies that the total impedance of the fault current path is low enough to ensure sufficient fault current flows to operate the protective device within the maximum disconnection time specified by BS 7671. For socket outlet circuits in TN systems, this is 0.4 seconds; for fixed equipment circuits, it is 5 seconds."
  },
  {
    id: "efli-components",
    question: "The earth fault loop impedance (Zs) consists of which components?",
    options: [
      "Only the resistance of the circuit protective conductor",
      "The external earth fault loop impedance (Ze) plus the resistance of the line conductor (R1) and the circuit protective conductor (R2): Zs = Ze + (R1+R2)",
      "The supply voltage divided by the load current",
      "The insulation resistance between line and earth"
    ],
    correctIndex: 1,
    explanation: "The total earth fault loop impedance (Zs) is the sum of the external earth fault loop impedance (Ze — from the supply transformer, distribution network, and return path to the transformer) and the internal impedance of the circuit (R1+R2 — the line conductor and circuit protective conductor). Both components must be as low as possible to ensure adequate fault current."
  },
  {
    id: "efli-ze-measurement",
    question: "How is the external earth fault loop impedance (Ze) measured?",
    options: [
      "At any socket outlet on the installation",
      "At the origin of the installation with the main earthing conductor disconnected from the earthing terminal, to exclude the influence of the installation's earthing arrangement",
      "By reading the value from the electricity supplier's meter",
      "By calculating it from the cable size and route length"
    ],
    correctIndex: 1,
    explanation: "Ze is measured at the origin of the installation (typically the main switch or consumer unit) with the main earthing conductor disconnected from the main earthing terminal. This isolates the measurement from the installation's own earthing arrangement (earth electrodes, bonding conductors), giving the true external impedance. The installation must be isolated from the supply during this measurement for safety."
  },
  {
    id: "efli-80-percent",
    question: "Why should the measured Zs not exceed 80% of the maximum tabulated value in BS 7671?",
    options: [
      "Because the instrument is only 80% accurate",
      "Because conductor resistance increases with temperature during a fault, and supply impedance varies, so a margin is needed to ensure the protective device operates within the required time under all conditions",
      "Because 20% of the fault current flows through the earth",
      "Because BS 7671 always requires a 20% safety factor on all measurements"
    ],
    correctIndex: 1,
    explanation: "The maximum Zs values tabulated in BS 7671 assume conductor temperatures under fault conditions (typically 70-80°C or higher). Measurements taken with test instruments are at ambient temperature, where conductor resistance is lower. Additionally, supply impedance varies with network load conditions. The 80% rule (or correction factor of 0.8) ensures that even when conductors are hot and supply impedance is at its highest, the Zs will still be within the maximum permitted value."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "For a 230 V circuit protected by a 32 A Type B MCB, BS 7671 specifies a maximum Zs of 1.37 Ω for 0.4 s disconnection. The maximum measured Zs at ambient temperature should not exceed:",
    options: [
      "1.37 Ω",
      "1.10 Ω (80% of 1.37 Ω)",
      "0.69 Ω (50% of 1.37 Ω)",
      "2.74 Ω (double the tabulated value)"
    ],
    correctAnswer: 1,
    explanation: "The maximum measured Zs at ambient temperature should not exceed 80% of the tabulated maximum value: 1.37 × 0.8 = 1.096 Ω, rounded to 1.10 Ω. This allows for the increase in conductor resistance at elevated temperatures during a fault and for variations in supply impedance."
  },
  {
    id: 2,
    question: "The maximum disconnection time for a socket outlet circuit in a TN system under BS 7671 is:",
    options: [
      "0.2 seconds",
      "0.4 seconds",
      "5 seconds",
      "10 seconds"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires a maximum disconnection time of 0.4 seconds for circuits supplying socket outlets and portable equipment in TN systems. This shorter time is required because users are likely to be in direct contact with earthed equipment (via the plug and cord) when a fault occurs, creating a higher risk of electric shock."
  },
  {
    id: 3,
    question: "In a TT earthing system, earth fault loop impedance is typically much higher than in a TN system because:",
    options: [
      "TT systems use smaller cables",
      "The return path for fault current includes the resistance of the mass of earth between the installation earth electrode and the supply transformer earth, which is much higher than a metallic return path",
      "TT systems operate at a lower voltage",
      "TT systems do not require earth fault protection"
    ],
    correctAnswer: 1,
    explanation: "In a TT system, the fault current return path is through the mass of earth — from the installation's earth electrode through the ground to the supply transformer's earth electrode. The resistance of this earth path is typically much higher (often 20 Ω or more) than the metallic return path in a TN system (typically less than 1 Ω). This is why TT systems almost always require RCD protection rather than relying on overcurrent devices for earth fault disconnection."
  },
  {
    id: 4,
    question: "A live earth fault loop impedance test instrument works by:",
    options: [
      "Applying a high-voltage pulse between line and earth",
      "Briefly connecting a known resistance between line and earth to draw a fault current, measuring the resulting voltage drop, and calculating the impedance from V/I",
      "Measuring the static resistance between line and earth with the circuit de-energised",
      "Injecting a signal into the earth conductor and measuring the return"
    ],
    correctAnswer: 1,
    explanation: "A live Zs test instrument briefly connects a known resistance between line and earth, causing a controlled fault current to flow around the earth fault loop. The instrument measures the voltage drop caused by this current and calculates the loop impedance using Ohm's law (Z = V/I). The test is conducted on the energised circuit and typically lasts only a few milliseconds to minimise the risk of tripping RCDs."
  },
  {
    id: 5,
    question: "Which protective device type requires the lowest earth fault loop impedance for a given rating?",
    options: [
      "Type B MCB (trips at 3-5 times rated current)",
      "Type D MCB (trips at 10-20 times rated current)",
      "BS 88-2 fuse (HRC fuse)",
      "BS 3036 fuse (rewirable fuse)"
    ],
    correctAnswer: 1,
    explanation: "Type D MCBs require the highest fault current to trip (10-20 times rated current for instantaneous operation), which means they need the lowest loop impedance to achieve that current. For example, a 32 A Type D MCB may require up to 640 A fault current, needing a Zs of 0.36 Ω or less. Type B MCBs trip at 3-5 times rated current, requiring less fault current and therefore tolerating higher loop impedance."
  },
  {
    id: 6,
    question: "If the measured Ze is 0.35 Ω and the calculated R1+R2 for a circuit is 0.42 Ω, the expected Zs at the furthest point is:",
    options: [
      "0.35 Ω",
      "0.77 Ω",
      "0.42 Ω",
      "0.07 Ω"
    ],
    correctAnswer: 1,
    explanation: "Zs = Ze + (R1+R2) = 0.35 + 0.42 = 0.77 Ω. This calculated value can be used to verify the live Zs measurement — the two should agree within reasonable tolerance. If the measured Zs is significantly different from the calculated value, this indicates a measurement error, an incorrect Ze value, or a problem with the circuit conductors."
  },
  {
    id: 7,
    question: "During a periodic inspection, the measured Zs at a socket outlet is 1.85 Ω. The circuit is protected by a 20 A Type B MCB (maximum tabulated Zs = 2.30 Ω). The result is:",
    options: [
      "Satisfactory — 1.85 Ω is below the tabulated maximum of 2.30 Ω",
      "Unsatisfactory — 1.85 Ω exceeds 80% of the tabulated maximum (0.8 × 2.30 = 1.84 Ω), indicating that under fault conditions the impedance may exceed the maximum permitted value",
      "Cannot be determined without additional information",
      "Satisfactory — only values above 3.0 Ω are a concern"
    ],
    correctAnswer: 1,
    explanation: "Applying the 80% rule: 2.30 × 0.8 = 1.84 Ω. The measured value of 1.85 Ω exceeds this limit, meaning that under fault conditions (when conductor temperatures are elevated), the actual Zs may exceed the maximum tabulated value and the MCB may not disconnect within the required time. This should be recorded as unsatisfactory and remedial action recommended."
  },
  {
    id: 8,
    question: "When testing Zs on a circuit protected by an RCD, the test instrument may cause the RCD to trip. The technician should:",
    options: [
      "Bypass the RCD during testing",
      "Use a non-trip or low-current earth loop test mode if available, or accept the trip and reset the RCD after testing",
      "Avoid testing Zs on RCD-protected circuits",
      "Replace the RCD with a higher-rated device"
    ],
    correctAnswer: 1,
    explanation: "Modern test instruments often include a non-trip or two-wire earth loop impedance test mode that reduces the test current below the RCD operating threshold. If this mode is not available, the technician should warn affected persons, conduct the test (which will trip the RCD), and reset the RCD afterwards. Bypassing the RCD is not acceptable as it removes fault protection."
  },
  {
    id: 9,
    question: "Prospective fault current (Ipf) is related to earth fault loop impedance by the formula:",
    options: [
      "Ipf = Zs × V",
      "Ipf = V / Zs (where V is the nominal voltage and Zs is the earth fault loop impedance)",
      "Ipf = Zs / V",
      "Ipf = V² / Zs"
    ],
    correctAnswer: 1,
    explanation: "The prospective earth fault current is calculated as Ipf = V / Zs, where V is the nominal supply voltage (230 V for single-phase UK supply) and Zs is the total earth fault loop impedance. For example, if Zs = 0.5 Ω, then Ipf = 230 / 0.5 = 460 A. This fault current must be sufficient to operate the protective device within the required disconnection time."
  },
  {
    id: 10,
    question: "A measured Ze of 0.8 Ω in a TN-C-S (PME) system is:",
    options: [
      "Normal and expected",
      "Higher than the typical maximum expected value of 0.35 Ω for a TN-C-S supply, indicating a possible problem with the supply neutral-earth connection that should be reported to the DNO",
      "Lower than expected",
      "Impossible to achieve in a TN-C-S system"
    ],
    correctAnswer: 1,
    explanation: "For a TN-C-S (PME) supply, the typical maximum Ze is 0.35 Ω. A reading of 0.8 Ω is significantly higher than expected and may indicate a problem with the supply neutral-earth conductor, a poor connection at the supply intake, or a high-impedance supply network. This should be reported to the distribution network operator (DNO) for investigation, as it affects the safety of the entire installation."
  },
  {
    id: 11,
    question: "Why might the measured Zs at a socket outlet differ from the calculated value (Ze + R1+R2)?",
    options: [
      "Because Zs measurements are always inaccurate",
      "Due to supply impedance variations, parallel earth paths through bonding conductors and other circuits, or inaccurate R1+R2 measurements",
      "Because the test instrument adds its own impedance to the reading",
      "Because temperature has no effect on impedance"
    ],
    correctAnswer: 1,
    explanation: "The measured Zs may differ from the calculated value for several reasons: supply impedance varies with network load conditions (measured Ze may have changed), parallel earth paths through bonding conductors and other circuits' CPCs can reduce the apparent impedance, or the R1+R2 measurement may have been taken at a different temperature. Reasonable agreement between measured and calculated values provides confidence in both measurements."
  },
  {
    id: 12,
    question: "For a distribution circuit supplying a sub-distribution board, the maximum disconnection time in a TN system is:",
    options: [
      "0.2 seconds",
      "0.4 seconds",
      "5 seconds",
      "No disconnection time is required for distribution circuits"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 permits a maximum disconnection time of 5 seconds for distribution circuits (circuits supplying distribution boards rather than final circuits supplying equipment directly). This longer time is acceptable because distribution circuits do not directly supply equipment that users are likely to touch. The Zs values for 5-second disconnection are correspondingly higher than those for 0.4-second disconnection."
  }
];

const faqs = [
  {
    question: "Can I measure Ze safely?",
    answer: "Measuring Ze requires disconnecting the main earthing conductor from the main earthing terminal, which temporarily removes the installation's earth connection. This must only be done with the installation fully isolated from the supply. The measurement is then taken between the incoming line terminal and the incoming earth terminal (or the supply neutral in a TN-C-S system). Due to the safety implications, Ze measurement is typically performed by experienced inspectors rather than during routine maintenance."
  },
  {
    question: "What is the difference between Zs and Ze?",
    answer: "Ze is the external earth fault loop impedance — the impedance of the fault loop outside the installation, including the supply transformer, distribution cables, and the return path (either metallic in TN systems or through earth in TT systems). Zs is the total earth fault loop impedance at a specific point in the installation, comprising Ze plus the impedance of the circuit's line conductor and CPC (R1+R2) from the origin to that point. Zs increases along the circuit as you move further from the origin."
  },
  {
    question: "Why do different MCB types have different maximum Zs values?",
    answer: "Different MCB types (B, C, D) have different instantaneous trip thresholds. Type B trips at 3-5 times rated current, Type C at 5-10 times, and Type D at 10-20 times. A higher trip threshold requires more fault current to achieve instantaneous disconnection, which requires lower loop impedance (since I = V/Z). This is why Type D MCBs have the lowest maximum Zs values — they need the most fault current to operate quickly."
  },
  {
    question: "What should I do if Zs exceeds the maximum permitted value?",
    answer: "If Zs exceeds the maximum permitted value (accounting for the 80% rule), the protective device cannot be relied upon to disconnect within the required time. Options include: installing supplementary RCD protection (which operates on much lower fault currents), reducing the circuit length to lower R1+R2, increasing the cable size to reduce conductor resistance, changing the protective device to one with a lower trip threshold (e.g., Type B instead of Type C), or splitting the circuit into shorter circuits."
  },
  {
    question: "Does earth fault loop impedance change over time?",
    answer: "Yes. Ze can change due to modifications to the supply network by the DNO. R1+R2 can change due to deterioration of connections (increased resistance) or modifications to the circuit (added length). Temperature affects conductor resistance and therefore Zs. Periodic testing (EICR) monitors these changes and identifies circuits where Zs has increased to a point where it may exceed the maximum permitted value."
  }
];

const MOETModule4Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5">
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
            <CircuitBoard className="h-4 w-4" />
            <span>Module 4.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earth Fault Loop Impedance Testing
          </h1>
          <p className="text-white/80">
            Ze and Zs measurements, disconnection time verification, and protective device coordination
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Verify protective devices will disconnect within required time</li>
              <li className="pl-1"><strong>Formula:</strong> Zs = Ze + (R1+R2) — total loop impedance</li>
              <li className="pl-1"><strong>80% rule:</strong> Measured Zs must not exceed 80% of tabulated maximum</li>
              <li className="pl-1"><strong>Times:</strong> 0.4 s for sockets, 5 s for fixed equipment (TN systems)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Live test:</strong> Zs tested on energised circuits — requires care and competence</li>
              <li className="pl-1"><strong>RCD interaction:</strong> Test may trip RCDs — use non-trip mode where available</li>
              <li className="pl-1"><strong>Verification:</strong> Compare measured Zs against calculated (Ze + R1+R2)</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to testing, verification, and protection coordination</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the earth fault loop and why its impedance determines protective device operating time",
              "Distinguish between Ze and Zs and describe how each is measured",
              "Apply the 80% rule to determine whether measured Zs values are satisfactory",
              "Identify the maximum disconnection times for different circuit types in TN and TT systems",
              "Use Zs values to calculate prospective earth fault current",
              "Describe the differences in earth fault protection between TN, TT, and TN-C-S systems"
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
            Understanding the Earth Fault Loop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earth fault loop is the complete circuit that fault current follows when a line conductor makes contact with an earthed part — such as the metal casing of an appliance or the armouring of a cable. Understanding this loop is fundamental to electrical safety, because it is the impedance of this loop that determines how much fault current flows and therefore how quickly the protective device operates to disconnect the supply.
            </p>
            <p>
              In a TN system (the most common in the UK), the earth fault loop comprises: the supply transformer secondary winding, the line conductor from the transformer to the point of fault, the fault itself (assumed to be a zero-impedance bolted fault for calculation purposes), the circuit protective conductor from the point of fault back to the main earthing terminal, and the return path through the supply neutral (or combined neutral/earth in TN-C-S systems) back to the transformer. The total impedance of this complete loop determines the fault current: I = V/Zs.
            </p>
            <p>
              For the protective device to operate within the required disconnection time, the fault current must exceed the device's instantaneous trip threshold. For a 32 A Type B MCB, this threshold is 5 times the rated current (160 A), requiring a maximum Zs of 230/160 = 1.44 Ω (the tabulated value in BS 7671 is 1.37 Ω, accounting for a slightly reduced voltage during the fault). If the loop impedance is too high, the fault current will be too low, and the MCB will not trip instantly — it may trip on its thermal element after several seconds, or it may not trip at all.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Ze Values for UK Earthing Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Earthing System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Maximum Ze</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Earth Fault Return Path</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-C-S (PME)</td>
                      <td className="border border-white/10 px-3 py-2">0.35 Ω</td>
                      <td className="border border-white/10 px-3 py-2">Combined neutral/earth (PEN) conductor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-S</td>
                      <td className="border border-white/10 px-3 py-2">0.80 Ω</td>
                      <td className="border border-white/10 px-3 py-2">Separate metallic earth conductor (cable sheath)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TT</td>
                      <td className="border border-white/10 px-3 py-2">21 Ω (variable)</td>
                      <td className="border border-white/10 px-3 py-2">Mass of earth between electrodes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Why This Test Is Safety-Critical</p>
              <p className="text-sm text-white">
                If the earth fault loop impedance is too high, a line-to-earth fault will not generate enough current to trip the protective device quickly. This means that any exposed metalwork connected to the faulty circuit remains at a dangerous voltage for an extended period — potentially indefinitely if the fault current is below the device's minimum operating current. During this time, anyone touching the metalwork and earth simultaneously will receive an electric shock.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Measuring Ze — External Earth Fault Loop Impedance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The external earth fault loop impedance (Ze) represents the impedance of the earth fault loop outside the installation — from the supply transformer, through the distribution network, to the point of supply at the installation. This value is determined by the electricity supply and is largely outside the control of the installation designer or maintainer. However, it must be measured and verified because it directly affects the maximum circuit lengths that can be achieved while maintaining adequate disconnection times.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ze Measurement Procedure</h3>
                <p className="text-sm text-white mb-2">
                  Measuring Ze requires care because the main earthing conductor must be temporarily disconnected:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Isolate the complete installation from the supply</li>
                  <li className="pl-1">Disconnect the main earthing conductor from the main earthing terminal</li>
                  <li className="pl-1">Re-energise the supply (with the installation still isolated internally)</li>
                  <li className="pl-1">Measure between the incoming line terminal and the incoming earth terminal using the earth loop impedance test function</li>
                  <li className="pl-1">Record the Ze value</li>
                  <li className="pl-1">De-energise the supply, reconnect the main earthing conductor, and restore the installation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Alternative: Calculating Ze from Zs and R1+R2</h3>
                <p className="text-sm text-white">
                  If Ze cannot be measured directly (for example, in a domestic property where the supply cannot be readily accessed), it can be calculated by measuring Zs at the origin of the installation (at the main switch or consumer unit) and subtracting the R1+R2 of the meter tails: Ze = Zs(origin) - R1+R2(tails). Alternatively, the enquiry Ze value provided by the distribution network operator (DNO) can be used for design purposes, though measured values are preferred for verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Measuring Zs — Total Earth Fault Loop Impedance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Zs is measured at each point where disconnection time verification is required — typically at the furthest point of each circuit. Unlike Ze, Zs is measured on the energised (live) circuit, which requires particular care and competence. The test instrument briefly creates a controlled fault condition to measure the loop impedance, and the technician must be aware of the implications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Zs Test Procedure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energise the circuit:</strong> The circuit must be live for a Zs measurement — this is a live test</li>
                <li className="pl-1"><strong>Connect the instrument:</strong> At the furthest point of the circuit (furthest socket outlet or furthest fixed equipment point), connect the test instrument between line and earth</li>
                <li className="pl-1"><strong>Take the reading:</strong> The instrument creates a brief controlled fault and displays the Zs value</li>
                <li className="pl-1"><strong>Apply the 80% rule:</strong> Compare the measured value against 80% of the maximum tabulated value for the protective device type and rating</li>
                <li className="pl-1"><strong>Cross-check:</strong> Verify the measured Zs against the calculated value (Ze + R1+R2) — they should be in reasonable agreement</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Interaction</h3>
              <p className="text-sm text-white">
                Standard earth loop impedance test instruments draw a significant test current (typically 10-25 A for a fraction of a second). On circuits protected by 30 mA RCDs, this test current will almost certainly trip the RCD. Options include: using the instrument's non-trip earth loop test mode (which uses a lower test current and a different measurement technique), testing from the line side of the RCD, or accepting that the RCD will trip and resetting it after the test. Some modern instruments can measure Zs without tripping a 30 mA RCD, but the result may be less accurate.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Live Working Precautions</p>
              <p className="text-sm text-white">
                Zs testing is one of the few tests that requires the circuit to be energised. The technician must use GS 38-compliant test leads (with fused probes, finger guards, and limited exposed tip length), ensure they are competent to work on or near live equipment, and have appropriate personal protective equipment available. The test should be planned and the risks assessed before proceeding.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Disconnection Times and Protective Device Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The maximum disconnection time is the longest acceptable period between the occurrence of an earth fault and the operation of the protective device to disconnect the supply. BS 7671 specifies different disconnection times depending on the type of circuit and the earthing system, reflecting the different levels of risk associated with each.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Disconnection Times — TN Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlet circuits (32 A and below)</td>
                      <td className="border border-white/10 px-3 py-2">0.4 s</td>
                      <td className="border border-white/10 px-3 py-2">Users in direct contact with equipment via plug and cord</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fixed equipment circuits</td>
                      <td className="border border-white/10 px-3 py-2">5 s</td>
                      <td className="border border-white/10 px-3 py-2">Lower risk — equipment permanently connected, less direct contact</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution circuits</td>
                      <td className="border border-white/10 px-3 py-2">5 s</td>
                      <td className="border border-white/10 px-3 py-2">Supplying sub-distribution boards, not final equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">TT Systems — RCD Protection</h3>
              <p className="text-sm text-white">
                In TT systems, the earth fault loop impedance is typically too high for overcurrent devices to provide disconnection within the required times. RCD protection is therefore essential. The maximum Zs for a 30 mA RCD to disconnect within 0.2 seconds (as required by BS 7671 for TT systems) is 1667 Ω — vastly higher than could be achieved by an MCB. This is because the RCD detects the imbalance between line and neutral currents (caused by the fault current flowing through earth) and does not rely on the magnitude of the fault current to operate.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The earth fault loop impedance test is the ultimate verification that the protective device will do its job when called upon. All the other tests — continuity, insulation resistance, polarity — contribute to the overall safety of the installation, but it is the earth fault loop impedance that directly determines whether the protective device can disconnect a fault within the time necessary to prevent electric shock.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Prospective Fault Current and Recording Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Closely related to earth fault loop impedance is the prospective fault current (Ipf) — the maximum current that would flow during a fault at a given point in the installation. BS 7671 requires Ipf to be determined at the origin of the installation and at other relevant points. The protective device must be capable of safely interrupting this current without sustaining damage — its breaking capacity must equal or exceed the Ipf.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating Prospective Fault Current</p>
              <p className="text-sm text-white mb-2">
                For an earth fault: Ipf = Uo / Zs (where Uo is the nominal line-to-earth voltage, 230 V in the UK)
              </p>
              <p className="text-sm text-white mb-2">
                For a short-circuit fault (line-to-neutral): Ipf = Uo / (R1+Rn), where Rn is the neutral conductor resistance
              </p>
              <p className="text-sm text-white">
                Modern multifunction test instruments can measure both Ipf values directly. The highest Ipf is typically at the origin of the installation where the loop impedance is lowest. This value is compared against the breaking capacity of the protective devices to ensure they can safely interrupt the maximum possible fault current.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Results</h3>
              <p className="text-sm text-white">
                Earth fault loop impedance results are recorded on the Schedule of Test Results — one entry for each circuit tested. The Zs value at the furthest point is recorded, along with the protective device type and rating. For EICRs, the results are compared against the maximum permitted values, and any circuits where Zs exceeds the limit are coded accordingly (typically C2 for potentially dangerous). The Ze value is recorded in the general section of the certificate, as it applies to the entire installation.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 link:</strong> Understanding earth fault loop impedance and its relationship to protective device operation is a fundamental competency for maintenance technicians. The ability to measure Zs, compare it against tabulated values, apply the 80% rule, and identify circuits that do not meet the required standard is directly assessed in the end-point assessment.
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
                <p className="font-medium text-white mb-1">Key Formulae</p>
                <ul className="space-y-0.5">
                  <li>Zs = Ze + (R1+R2)</li>
                  <li>Ipf = Uo / Zs (earth fault current)</li>
                  <li>Max measured Zs = 0.8 x tabulated Zs</li>
                  <li>TN-C-S typical Ze: 0.35 Ω max</li>
                  <li>TN-S typical Ze: 0.80 Ω max</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Disconnection Times (TN)</p>
                <ul className="space-y-0.5">
                  <li>Socket outlets: 0.4 s maximum</li>
                  <li>Fixed equipment: 5 s maximum</li>
                  <li>Distribution circuits: 5 s maximum</li>
                  <li>TT systems: RCD required (0.2 s typical)</li>
                  <li>Always apply the 80% rule to measurements</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Continuity Testing
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-4">
              Next: Functional Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section5_3;