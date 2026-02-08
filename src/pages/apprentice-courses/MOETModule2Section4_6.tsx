import { ArrowLeft, Bolt, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Surge Protection Devices - MOET Module 2 Section 4.6";
const DESCRIPTION = "Comprehensive guide to surge protection devices for electrical maintenance technicians: SPD types, transient overvoltages, risk assessment, BS 7671 Amendment 2 requirements and installation practices.";

const quickCheckQuestions = [
  {
    id: "spd-purpose",
    question: "What is the primary function of a surge protection device (SPD)?",
    options: [
      "To protect against sustained overvoltage conditions",
      "To divert transient overvoltage energy safely to earth, limiting the voltage across connected equipment",
      "To provide overcurrent protection for the installation",
      "To improve the power factor of the electrical supply"
    ],
    correctIndex: 1,
    explanation: "An SPD diverts transient overvoltage energy safely to earth (or between line and neutral), clamping the voltage across connected equipment to a safe level. Transient overvoltages are very short duration (microseconds to milliseconds) but very high voltage events — typically caused by lightning or switching operations — that can damage sensitive electronic equipment."
  },
  {
    id: "spd-type2",
    question: "A Type 2 SPD is designed to protect against:",
    options: [
      "Direct lightning strikes to the building",
      "Indirect lightning effects and switching surges at the distribution board",
      "Sustained undervoltage conditions",
      "Harmonic distortion on the supply"
    ],
    correctIndex: 1,
    explanation: "Type 2 SPDs (also called Class II or Category C) are designed to protect against indirect lightning effects (surges induced in the supply cable by nearby lightning strikes) and switching transients from the supply network or within the installation. They are typically installed at the main distribution board and are the most common type required in domestic and commercial installations."
  },
  {
    id: "bs7671-spd-requirement",
    question: "Under BS 7671:2018 Amendment 2, SPD protection is required unless:",
    options: [
      "The installation is in an urban area",
      "A risk assessment determines that the consequences of overvoltage are not serious",
      "The installation has RCD protection",
      "The supply voltage is below 230 V"
    ],
    correctIndex: 1,
    explanation: "Amendment 2 to BS 7671:2018 introduced Regulation 443.4, which requires SPD protection unless a risk assessment (per BS EN 62305) determines that the overvoltage is unlikely to cause serious consequences. For most installations containing electronic equipment (which is virtually all modern installations), SPD protection will be required."
  },
  {
    id: "spd-sccr",
    question: "Why must an SPD have a dedicated overcurrent protective device (backup fuse or MCB)?",
    options: [
      "To protect the SPD from normal load current",
      "To disconnect the SPD if it fails short-circuit under sustained overvoltage or at end of life, preventing fire",
      "To provide earth fault protection for the SPD",
      "To improve the clamping voltage of the SPD"
    ],
    correctIndex: 1,
    explanation: "SPDs contain metal oxide varistors (MOVs) or gas discharge tubes that can fail short-circuit if subjected to sustained overvoltage or at end of life due to degradation. The backup protective device (typically a fuse or MCB rated per the manufacturer's instructions) disconnects the SPD from the supply before it overheats and causes a fire. Some SPDs have integrated backup protection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Transient overvoltages in a supply system are most commonly caused by:",
    options: [
      "Excessive load current",
      "Lightning (direct and indirect) and switching operations on the power network",
      "Incorrect cable sizing",
      "Low power factor"
    ],
    correctAnswer: 1,
    explanation: "Transient overvoltages arise from two main sources: lightning (both direct strikes and induced surges from nearby strikes) and switching operations (utility network switching, large motor starting/stopping, capacitor bank switching). These events create very short-duration but extremely high-voltage spikes that can travel along conductors and damage equipment."
  },
  {
    id: 2,
    question: "The three SPD types (1, 2 and 3) correspond to different positions in the installation and different surge levels. Type 1 is installed:",
    options: [
      "At individual socket outlets",
      "At the origin of the installation, between the supply and the main distribution board",
      "Inside individual items of equipment",
      "At the final circuit level only"
    ],
    correctAnswer: 1,
    explanation: "Type 1 SPDs are installed at the origin of the installation (typically at or before the main switchboard) to handle the highest energy surges — including direct lightning current. They are required where the building has a lightning protection system (LPS). Type 2 SPDs are installed at the distribution board for general protection, and Type 3 SPDs are installed at the point of use for fine protection of sensitive equipment."
  },
  {
    id: 3,
    question: "The voltage protection level (Up) of an SPD indicates:",
    options: [
      "The maximum supply voltage the SPD can handle",
      "The maximum voltage the SPD allows to pass through to the protected equipment during a surge",
      "The voltage at which the SPD's backup fuse operates",
      "The supply frequency the SPD is designed for"
    ],
    correctAnswer: 1,
    explanation: "The voltage protection level (Up) is the maximum voltage the SPD allows across its terminals during a surge event. It represents the 'clamping voltage' — the level to which the SPD limits the transient overvoltage. A lower Up provides better protection. For 230 V installations, a typical Up for Type 2 SPDs is 1.5 kV or less."
  },
  {
    id: 4,
    question: "BS 7671 Regulation 534.2.1 requires that SPD conductors be kept as short as possible because:",
    options: [
      "Long conductors cost more",
      "Long conductors add inductance which increases the effective voltage protection level during fast transients",
      "Long conductors are more likely to be mechanically damaged",
      "Short conductors look neater in the distribution board"
    ],
    correctAnswer: 1,
    explanation: "During a fast transient surge, the rate of current change (di/dt) through the SPD conductors can be very high. The voltage drop across the conductor inductance (V = L × di/dt) adds to the SPD's clamping voltage, effectively increasing the voltage seen by the protected equipment. Keeping connections as short as possible (ideally less than 500 mm total for both line and earth connections) minimises this effect."
  },
  {
    id: 5,
    question: "A Type 2 SPD installed at a domestic consumer unit would typically be rated for a maximum discharge current (Imax) of:",
    options: [
      "1 kA",
      "10 to 40 kA (8/20 microsecond wave)",
      "100 kA (10/350 microsecond wave)",
      "500 kA"
    ],
    correctAnswer: 1,
    explanation: "Type 2 SPDs for domestic and commercial use are typically rated for maximum discharge currents (Imax) of 10 kA to 40 kA using the 8/20 microsecond test waveform. This represents the energy level of indirect lightning effects and switching surges. Type 1 SPDs handle higher energy (10/350 microsecond wave) for direct or near-direct lightning."
  },
  {
    id: 6,
    question: "An SPD status indicator showing 'red' or 'fault' typically means:",
    options: [
      "The SPD is operating normally",
      "The SPD has reached end of life and needs replacement — it is no longer providing protection",
      "There is a surge occurring right now",
      "The backup fuse needs testing"
    ],
    correctAnswer: 1,
    explanation: "Most SPDs include a status indicator (LED, mechanical flag, or window) that changes from green (healthy) to red (fault) when the internal protective elements have degraded or failed. This indicates the SPD is no longer providing protection and must be replaced. Degradation occurs naturally over time as the MOV absorbs successive surge events, and the device should be checked during periodic inspection."
  },
  {
    id: 7,
    question: "When installing an SPD at a consumer unit, the earth connection should be made to:",
    options: [
      "A separate earth electrode dedicated to the SPD",
      "The main earthing terminal of the installation (via the shortest practical route)",
      "The neutral bar of the consumer unit",
      "The metallic water pipe"
    ],
    correctAnswer: 1,
    explanation: "The SPD earth connection must be made to the main earthing terminal (MET) of the installation via the shortest possible route to minimise inductance. A separate earth electrode is not used because it could create a potential difference between the SPD earth and the installation earth during a surge event. All earths must be bonded together at a single reference point."
  },
  {
    id: 8,
    question: "In a TT earthing system, SPDs should be connected in which configuration?",
    options: [
      "Line to earth only (L-PE)",
      "Line to neutral and neutral to earth (L-N + N-PE) — the '3+1' or 'CT2' configuration",
      "Line to line only",
      "No SPD is needed in TT systems"
    ],
    correctAnswer: 1,
    explanation: "In TT systems, surges can appear between line and neutral as well as between neutral and earth (because the neutral and earth are not closely coupled as in TN systems). The recommended configuration is L-N + N-PE (Type 2 CT2 or '3+1' for three-phase). This protects against both modes. The N-PE SPD must be a spark-gap type to avoid affecting RCD operation."
  },
  {
    id: 9,
    question: "The risk assessment for SPD installation (per BS EN 62305 / BS 7671 Reg 443) considers:",
    options: [
      "Only the cost of the SPD",
      "The likelihood of transient overvoltages and the consequences of equipment damage (type of wiring, value of equipment, nature of occupancy)",
      "The colour of the distribution board",
      "The number of socket outlets in the installation"
    ],
    correctAnswer: 1,
    explanation: "The risk assessment considers factors including: the supply type (overhead vs underground), local lightning density (keraunic level), the type and value of equipment to be protected, the consequences of equipment failure (e.g., medical equipment, fire alarm systems), and the type of wiring system (overhead supplies are more exposed). If the consequences of overvoltage damage are serious, SPD protection must be provided."
  },
  {
    id: 10,
    question: "SPDs must be inspected during periodic inspection. What should be checked?",
    options: [
      "Only that the SPD is physically present",
      "Status indicator (healthy/fault), backup protection intact, connections tight, and SPD rating appropriate for the installation",
      "Only the manufacturer's label",
      "Only the colour of the indicator light"
    ],
    correctAnswer: 1,
    explanation: "During periodic inspection, SPDs should be checked for: status indicator condition (green = healthy, red = needs replacement), integrity of the backup protective device (fuse not blown, MCB not tripped), security of all connections, physical condition (no signs of burning or damage), and confirmation that the SPD type and rating are appropriate for the installation's earthing system and risk assessment."
  },
  {
    id: 11,
    question: "Where a building has a lightning protection system (LPS), which type of SPD is required at the origin?",
    options: [
      "Type 3 only",
      "Type 1 (to handle direct lightning current energy)",
      "No SPD is needed if an LPS is installed",
      "Type 2 is always sufficient"
    ],
    correctAnswer: 1,
    explanation: "Where a building has a lightning protection system, a direct lightning strike is conducted to earth via the LPS. However, a portion of the lightning energy can enter the electrical installation via the earthing system (conducted through bonding between the LPS earth and the installation MET). A Type 1 SPD is required to handle this high-energy current (10/350 microsecond impulse)."
  }
];

const faqs = [
  {
    question: "Do all new installations now require SPDs?",
    answer: "BS 7671:2018 Amendment 2 requires SPD protection unless a risk assessment determines that the consequences of transient overvoltages are not serious. In practice, because virtually all modern installations contain sensitive electronic equipment (smart meters, heating controls, alarms, IT equipment), most new installations will require SPD protection. The risk assessment should be documented on the electrical installation certificate."
  },
  {
    question: "Can I retrofit an SPD to an existing consumer unit?",
    answer: "Many SPD manufacturers produce modules designed to retrofit into existing consumer units, connecting to a spare way or via a dedicated connection kit. The key requirements are: the SPD must be appropriate for the earthing system type (TN or TT configuration), connections must be kept as short as possible, and a suitable backup protective device must be installed. Some consumer units may not have space, in which case an external SPD enclosure may be needed."
  },
  {
    question: "What is the difference between Type 1, Type 2 and Type 3 SPDs?",
    answer: "Type 1 SPDs are installed at the origin and handle the highest energy surges (including direct lightning — 10/350 microsecond wave). Type 2 SPDs are installed at distribution boards for general protection against indirect lightning and switching surges (8/20 microsecond wave). Type 3 SPDs are installed at the point of use (e.g., at socket outlets near sensitive equipment) for fine protection. In larger installations, all three types may be used in cascade for coordinated protection."
  },
  {
    question: "Will an SPD protect against a sustained overvoltage (e.g., a broken neutral)?",
    answer: "No. SPDs are designed to handle transient overvoltages lasting microseconds to milliseconds. A sustained overvoltage (such as 400 V appearing on a 230 V circuit due to a broken neutral on a three-phase supply) will cause the SPD to operate continuously and overheat, which is why a backup fuse is required to disconnect it. For protection against sustained overvoltage, a dedicated overvoltage relay or similar device is needed."
  }
];

const MOETModule2Section4_6 = () => {
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

      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Bolt className="h-4 w-4" />
            <span>Module 2.4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Surge Protection Devices
          </h1>
          <p className="text-white/80">
            Lightning and switching surge protection for electrical installations
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>SPDs:</strong> Clamp transient overvoltages to safe levels</li>
              <li className="pl-1"><strong>Types:</strong> 1 (origin/lightning), 2 (DB/general), 3 (point of use)</li>
              <li className="pl-1"><strong>BS 7671:</strong> Amendment 2 requires SPDs unless risk assessment says otherwise</li>
              <li className="pl-1"><strong>Backup:</strong> Dedicated fuse/MCB to disconnect failed SPD</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Inspection:</strong> Check status indicator, backup device, connections</li>
              <li className="pl-1"><strong>Replacement:</strong> Red indicator means SPD needs replacing</li>
              <li className="pl-1"><strong>Configuration:</strong> Must match earthing system (TN vs TT)</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to protection and installation knowledge KSBs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the causes of transient overvoltages and their effects on electrical installations",
              "Describe the three types of SPD (Type 1, 2 and 3) and their positions in the installation",
              "Understand voltage protection level (Up) and maximum discharge current (Imax) ratings",
              "Apply BS 7671 Amendment 2 requirements for SPD risk assessment and installation",
              "Select correct SPD configuration for TN and TT earthing systems",
              "Inspect SPDs during periodic inspection and identify when replacement is needed"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Transient Overvoltages — Causes and Effects
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A transient overvoltage is a very short-duration voltage spike superimposed on the normal supply
              waveform. These events can reach several thousand volts but last only microseconds to a few
              milliseconds. Despite their brief duration, transient overvoltages carry enough energy to damage
              or destroy sensitive electronic components, degrade insulation, and cause data loss in digital
              systems.
            </p>
            <p>
              The two main sources of transient overvoltages are lightning and switching operations. A direct
              lightning strike on or near a building can inject impulse currents of up to 200 kA into the
              earthing system and induce voltages of tens of thousands of volts on supply conductors. Even
              indirect strikes — lightning to ground within a few hundred metres — can induce surges of
              several kilovolts through electromagnetic coupling. Switching transients from the utility
              network (transformer switching, capacitor bank switching) or from within the installation
              (motor starting, contactor operation) produce lower but still potentially damaging surges.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Surge Sources</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Direct lightning strike:</strong> To building, LPS or incoming services — highest energy, requires Type 1 SPD</li>
                <li className="pl-1"><strong>Indirect lightning:</strong> Strike nearby induces surges on supply cables — requires Type 2 SPD</li>
                <li className="pl-1"><strong>Switching operations:</strong> Utility switching, large motor starting, capacitor switching — Type 2 SPD</li>
                <li className="pl-1"><strong>Internal sources:</strong> Contactor operation, VFD switching, arc welding — Type 2 or 3 SPD</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Consequences of Unprotected Surges</p>
              <p className="text-sm text-white">
                Electronic equipment — fire and security alarm panels, boiler controls, LED drivers, smart
                home systems, industrial PLCs, variable speed drives — is particularly vulnerable to transient
                overvoltages. Damage may be immediate (catastrophic failure) or cumulative (progressive insulation
                degradation leading to premature failure). The cost of replacing damaged equipment and the
                consequential losses (downtime, data loss, safety system failure) far exceed the cost of SPD
                installation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            SPD Types and Operating Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Surge protection devices work by providing a low-impedance path to divert surge energy away from
              the protected equipment. Under normal voltage conditions, the SPD presents a very high impedance
              and draws negligible current. When a transient overvoltage exceeds the SPD's clamping threshold,
              its impedance drops dramatically, diverting the surge current to earth and clamping the voltage
              across the protected equipment to a safe level.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Type 1 SPD (Class I / Category B)</h3>
                <p className="text-sm text-white mb-2">
                  Installed at the origin of the installation, typically upstream of the main distribution board.
                  Designed to handle direct lightning current energy using the 10/350 microsecond test impulse
                  waveform. Usually uses spark gap technology which can handle very high energy but has a higher
                  voltage protection level. Required where a lightning protection system is installed.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Impulse current (Iimp): typically 12.5 to 25 kA per pole (10/350 wave)</li>
                  <li className="pl-1">Technology: spark gap, combined spark gap + MOV</li>
                  <li className="pl-1">Location: origin, before main switch or integral with main switch</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Type 2 SPD (Class II / Category C)</h3>
                <p className="text-sm text-white mb-2">
                  The most commonly installed type in domestic and commercial installations. Installed at
                  distribution boards to protect against indirect lightning effects and switching surges using
                  the 8/20 microsecond test impulse. Typically uses metal oxide varistor (MOV) technology which
                  provides good clamping voltage and moderate energy handling.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Maximum discharge current (Imax): typically 10 to 40 kA per pole (8/20 wave)</li>
                  <li className="pl-1">Voltage protection level (Up): typically 1.0 to 1.5 kV</li>
                  <li className="pl-1">Technology: metal oxide varistor (MOV)</li>
                  <li className="pl-1">Location: consumer unit, distribution board</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Type 3 SPD (Class III / Category D)</h3>
                <p className="text-sm text-white mb-2">
                  Fine protection devices installed at the point of use, close to sensitive equipment. They
                  handle the residual surge energy that passes through Type 1 and Type 2 devices and provide
                  the lowest clamping voltage. Often built into plug-in adaptors or power strips.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Must be installed downstream of Type 2 SPD</li>
                  <li className="pl-1">Low energy handling — for residual surges only</li>
                  <li className="pl-1">Lowest voltage protection level (Up): below 1.0 kV</li>
                  <li className="pl-1">Location: at socket outlets, equipment terminals</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> In larger installations, a coordinated cascade of Type 1, 2 and 3 SPDs
              provides the best protection. Each successive device handles lower energy surges and provides
              tighter clamping. The manufacturer must confirm coordination between devices.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            BS 7671 Requirements and Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671:2018 Amendment 2 introduced significant changes to SPD requirements through revised
              Chapter 44 and Section 534. Regulation 443.4 now effectively requires SPD protection for most
              installations unless a documented risk assessment demonstrates that the consequences of
              transient overvoltages would not be serious.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When SPDs Are Required (Reg 443.4)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Where overvoltage could result in serious injury or loss of life</li>
                <li className="pl-1">Where overvoltage could result in interruption of public services or cultural heritage</li>
                <li className="pl-1">Where the installation includes commercial or industrial activities where failure could cause disruption</li>
                <li className="pl-1">Where significant numbers of individuals could be affected</li>
                <li className="pl-1">In practice: most installations with electronic equipment, alarms, IT, or safety systems</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements (Section 534)</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Connection length:</strong> Total conductor length (L + PE connections) should not exceed 500 mm where practical</li>
                <li className="pl-1"><strong>Backup protection:</strong> Each SPD requires a dedicated backup protective device as specified by the manufacturer</li>
                <li className="pl-1"><strong>Earthing configuration:</strong> Must match the installation's earthing system (TN: L-PE; TT: L-N + N-PE)</li>
                <li className="pl-1"><strong>Status indication:</strong> SPDs should have a visible status indicator for periodic inspection</li>
                <li className="pl-1"><strong>Coordination with RCDs:</strong> SPDs must not cause unwanted RCD tripping during surge events</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance relevance:</strong> During periodic inspection, you must check whether SPD
              protection is present where required. If an installation was built before Amendment 2 and has
              no SPD, this should be noted as a recommendation (C3) unless a risk assessment has been
              documented.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Installation, Inspection and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct installation of SPDs is critical for their effectiveness. Poor installation —
              particularly excessively long connection leads — can significantly reduce the protection
              provided. During periodic inspection, SPDs must be assessed for condition and functionality.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practices</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Keep connections short:</strong> The combined length of line and earth connections should not exceed 500 mm. Excess length adds inductance, increasing the effective clamping voltage.</li>
                <li className="pl-1"><strong>Install backup protection:</strong> Use the backup fuse or MCB rating specified by the SPD manufacturer. Incorrect backup can either fail to protect the SPD (too high) or cause nuisance tripping (too low).</li>
                <li className="pl-1"><strong>Match earthing system:</strong> TN systems use L-PE (or L-N + N-PE) connection. TT systems must use L-N + N-PE with a gas discharge tube on the N-PE path to avoid RCD interference.</li>
                <li className="pl-1"><strong>Position:</strong> Install as close to the origin as possible for Type 2. Downstream of the main switch to allow isolation for maintenance.</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Periodic Inspection Checks</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Status indicator: green (healthy) or red (replace)</li>
                  <li className="pl-1">Backup device: intact and not tripped/blown</li>
                  <li className="pl-1">Connections: secure, no signs of overheating</li>
                  <li className="pl-1">Physical condition: no burning, cracking, discolouration</li>
                  <li className="pl-1">Rating: appropriate for earthing system and risk level</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SPD End of Life</h3>
                <p className="text-sm text-white">
                  MOV-based SPDs degrade with each surge event. Over time, the MOV material gradually loses
                  its ability to clamp voltage effectively. When the SPD reaches end of life, the status
                  indicator changes to fault, and the device must be replaced. Some SPDs also incorporate a
                  thermal disconnector that isolates the MOV if it overheats, providing an additional layer
                  of safety.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> SPD technology is increasingly important in modern electrical
              maintenance. Understanding SPD selection, installation verification and periodic inspection
              requirements is part of the electrical engineering maintenance technician's skillset, as
              specified in the ST1426 standard.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">SPD Types</p>
                <ul className="space-y-0.5">
                  <li>Type 1 — Origin, direct lightning (10/350 wave)</li>
                  <li>Type 2 — DB, indirect lightning/switching (8/20 wave)</li>
                  <li>Type 3 — Point of use, fine protection</li>
                  <li>Connection length: &le; 500 mm total</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Reg 443.4 — SPD requirement and risk assessment</li>
                  <li>Section 534 — SPD selection and installation</li>
                  <li>Reg 534.2.1 — Connection requirements</li>
                  <li>BS EN 62305 — Lightning protection risk assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Bonding Requirements
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section4_6;
