import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Coordination Studies - HNC Module 7 Section 6.4";
const DESCRIPTION = "Master coordination studies for electrical power systems: short-circuit calculations per IEC 60909, fault current contribution analysis, protective device coordination, time-current curves, and coordination software tools including ETAP, SKM, and Amtech.";

const quickCheckQuestions = [
  {
    id: "short-circuit-standard",
    question: "Which international standard provides the methodology for short-circuit current calculations in AC systems?",
    options: ["BS 7671", "IEC 60909", "IEEE 141", "BS EN 61439"],
    correctIndex: 1,
    explanation: "IEC 60909 (Short-circuit currents in three-phase a.c. systems) provides the internationally recognised methodology for calculating short-circuit currents, including calculation of initial symmetrical short-circuit current, peak short-circuit current, and breaking current."
  },
  {
    id: "coordination-purpose",
    question: "What is the primary purpose of protective device coordination?",
    options: ["To reduce cable costs", "To ensure only the device nearest the fault operates, isolating the minimum portion of the system", "To maximise equipment utilisation", "To simplify maintenance procedures"],
    correctIndex: 1,
    explanation: "Protective device coordination ensures selectivity - the device immediately upstream of the fault operates to clear it whilst all other protective devices remain closed, thereby isolating only the faulted section and maintaining supply to healthy circuits."
  },
  {
    id: "tcc-curve",
    question: "What does a time-current characteristic (TCC) curve display?",
    options: ["Voltage drop versus distance", "Operating time versus fault current magnitude", "Power factor versus load", "Temperature rise versus current"],
    correctIndex: 1,
    explanation: "A TCC curve plots the operating time of a protective device against fault current magnitude on logarithmic scales. This enables comparison of multiple devices to verify coordination - curves must not overlap within the range of prospective fault currents."
  },
  {
    id: "software-tools",
    question: "Which software packages are commonly used for coordination studies?",
    options: ["AutoCAD and Revit only", "Microsoft Excel exclusively", "ETAP, SKM PowerTools, and Amtech ProDesign", "BIM 360 and Navisworks"],
    correctIndex: 2,
    explanation: "ETAP, SKM PowerTools, and Amtech ProDesign are industry-standard electrical power system analysis software packages that include modules for short-circuit analysis, protective device coordination, and automatic TCC curve generation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In IEC 60909, what does the voltage factor 'c' account for?",
    options: [
      "Cable capacitance",
      "Variation of system voltage and equipment impedance from nominal values",
      "Power factor correction",
      "Harmonic distortion"
    ],
    correctAnswer: 1,
    explanation: "The voltage factor 'c' in IEC 60909 accounts for voltage variations (including tap changer positions), subtransient behaviour of generators and motors, and the differences between actual and nominal equipment impedances. Values of 1.0 for minimum and 1.05-1.1 for maximum fault current are typically used."
  },
  {
    id: 2,
    question: "What is the initial symmetrical short-circuit current (I\"k)?",
    options: ["The steady-state fault current after transients decay", "The RMS value of the AC symmetrical component at the instant of fault", "The peak instantaneous current", "The current at the moment of circuit breaker operation"],
    correctAnswer: 1,
    explanation: "I\"k is the RMS value of the AC symmetrical component of the prospective short-circuit current at the instant of short circuit, assuming the short-circuit impedance retains its value at time zero. It is the fundamental value used to determine breaking capacity requirements."
  },
  {
    id: 3,
    question: "What is the peak short-circuit current (ip) used to determine?",
    options: [
      "Cable thermal withstand",
      "Equipment dynamic withstand capability (making capacity)",
      "Discrimination time margins",
      "Earth fault loop impedance"
    ],
    correctAnswer: 1,
    explanation: "The peak short-circuit current (ip) determines the dynamic forces and mechanical stresses on equipment during the first cycle of fault current. Equipment must have adequate making capacity (dynamic withstand) to handle these electromechanical forces without damage."
  },
  {
    id: 4,
    question: "For a three-phase short-circuit at an LV busbar fed via a 1000 kVA transformer (Uk = 6%), what is the approximate fault level?",
    options: [
      "6 kA",
      "16.7 kA",
      "24 kA",
      "36 kA"
    ],
    correctAnswer: 2,
    explanation: "Fault level ≈ kVA / (Uk × √3 × V). For 1000 kVA at 400V with 6% impedance: I\"k = 1000000 / (0.06 × √3 × 400) = 1000000 / 41.6 ≈ 24 kA (ignoring upstream impedance). This demonstrates why transformer impedance significantly limits fault current."
  },
  {
    id: 5,
    question: "What is meant by 'selectivity' in protective device coordination?",
    options: [
      "Selecting the cheapest protective devices",
      "The ability to isolate only the faulted circuit whilst maintaining supply to healthy circuits",
      "Choosing devices from a single manufacturer",
      "The process of selecting cable sizes"
    ],
    correctAnswer: 1,
    explanation: "Selectivity (or discrimination) is the ability of a protection system to isolate only the faulted section whilst all upstream protective devices remain closed. This maintains supply continuity to healthy circuits and is the fundamental objective of coordination studies."
  },
  {
    id: 6,
    question: "What time margin is typically required between protective devices for coordination?",
    options: [
      "0.1 seconds",
      "0.3-0.4 seconds minimum",
      "1.0 second",
      "No margin required"
    ],
    correctAnswer: 1,
    explanation: "A minimum time margin of 0.3-0.4 seconds is typically required between the total clearing time of the downstream device and the minimum operating time of the upstream device. This accounts for tolerance in device characteristics and relay/breaker operating times."
  },
  {
    id: 7,
    question: "What contribution do induction motors make to fault current?",
    options: [
      "None - they only consume power",
      "Initial contribution of 4-6 times full load current, decaying rapidly",
      "Sustained contribution equal to full load current",
      "Contribution only for earth faults"
    ],
    correctAnswer: 1,
    explanation: "Induction motors act as generators during the initial cycles of a fault, contributing 4-6 times their full load current. This contribution decays rapidly (within 3-5 cycles) as the motor flux collapses. Large motor loads significantly increase initial fault currents."
  },
  {
    id: 8,
    question: "In a coordination study, what does the term 'let-through energy' (I²t) represent?",
    options: [
      "Energy consumed by the load",
      "Thermal energy passed through the protective device during fault clearance",
      "Standing losses in the cable",
      "Energy stored in capacitors"
    ],
    correctAnswer: 1,
    explanation: "Let-through energy (I²t) represents the thermal energy that passes through a protective device during fault clearance. Downstream devices and cables must withstand this energy. Coordination requires the downstream device I²t to be less than the upstream device let-through."
  },
  {
    id: 9,
    question: "What is zone selective interlocking (ZSI)?",
    options: [
      "Physical barriers between protection zones",
      "A communication scheme between protective devices to enhance selectivity",
      "Manual isolation switching",
      "Geographical separation of substations"
    ],
    correctAnswer: 1,
    explanation: "Zone selective interlocking (ZSI) uses communication between protective devices - when a downstream device detects a fault, it signals upstream devices to delay operation. If no signal is received, the device operates without intentional delay, providing faster clearance for upstream faults whilst maintaining coordination."
  },
  {
    id: 10,
    question: "What type of coordination exists when devices coordinate only up to a certain fault level?",
    options: [
      "Total selectivity",
      "Partial selectivity",
      "Time-graded selectivity",
      "Current-limited selectivity"
    ],
    correctAnswer: 1,
    explanation: "Partial selectivity exists when coordination is achieved only up to a defined fault current level (the selectivity limit). Above this level, both devices may operate simultaneously. Total selectivity means coordination is maintained up to the maximum prospective fault current."
  },
  {
    id: 11,
    question: "Why is the X/R ratio important in short-circuit calculations?",
    options: [
      "It determines cable colour coding",
      "It affects the DC component and peak asymmetrical current",
      "It sets the protection relay settings",
      "It determines the power factor"
    ],
    correctAnswer: 1,
    explanation: "The X/R ratio of the fault circuit determines the magnitude and decay rate of the DC component in the asymmetrical fault current. Higher X/R ratios result in greater DC offset and higher peak currents, affecting equipment dynamic rating requirements and the calculation factor κ for peak current."
  },
  {
    id: 12,
    question: "In coordination study documentation, what should be included in the protective device schedule?",
    options: [
      "Only device part numbers",
      "Device ratings, settings, clearing times, and coordination margins",
      "Manufacturer contact details only",
      "Installation dates"
    ],
    correctAnswer: 1,
    explanation: "A protective device schedule should include: device type and rating, trip unit type, instantaneous and time-delay settings, let-through characteristics, coordination margins with adjacent devices, and selectivity limits. This enables verification of settings and future modifications."
  }
];

const faqs = [
  {
    question: "What is the difference between IEC 60909 and IEEE 141 (Red Book) for short-circuit calculations?",
    answer: "IEC 60909 uses an equivalent voltage source at the fault point and applies voltage factors (c factors) to account for system variations, whilst IEEE 141 uses actual pre-fault system conditions. IEC 60909 is the European/UK standard providing conservative results with simpler calculations. IEEE 141 may give more accurate results for specific operating conditions but requires detailed pre-fault load flow data. In the UK, IEC 60909 is the accepted methodology."
  },
  {
    question: "How do I determine if coordination software is necessary versus manual calculations?",
    answer: "Manual calculations are adequate for simple radial systems with few protective devices (typically fewer than 10). Coordination software becomes essential for: systems with multiple fault current sources, complex network configurations with parallel paths, large numbers of protective devices requiring coordination, systems requiring arc flash analysis, and projects where coordination curves must be documented and maintained. Software also enables rapid 'what-if' analysis and automatic curve plotting."
  },
  {
    question: "What are the consequences of poor protective device coordination?",
    answer: "Poor coordination can result in: unnecessary outages affecting healthy circuits (nuisance tripping), failure to clear faults leading to equipment damage, cascading failures where multiple devices operate simultaneously, extended downtime whilst systems are restored, safety hazards from delayed fault clearance, and potential arc flash incidents with increased energy release. Proper coordination is essential for system reliability and safety."
  },
  {
    question: "How often should coordination studies be updated?",
    answer: "Coordination studies should be updated whenever: the system is modified (new loads, cables, or switchgear), utility fault levels change (notified by DNO), protective devices are replaced or settings changed, new fault current sources are added (generators, large motors), or every 5 years as good practice. Changes to upstream systems can significantly affect coordination, particularly if fault levels increase."
  },
  {
    question: "What is the relationship between coordination studies and arc flash analysis?",
    answer: "Coordination studies and arc flash analysis are closely linked - both use the same system model and fault current data. Protective device settings that achieve good coordination also affect incident energy levels. Faster clearing times generally reduce arc flash energy but may compromise coordination. Modern studies optimise both objectives, and coordination software typically includes arc flash modules that calculate incident energy based on the protective device settings determined in the coordination study."
  }
];

const HNCModule7Section6_4 = () => {
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
            <span>Module 7.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Coordination Studies
          </h1>
          <p className="text-white/80">
            Short-circuit calculations, protective device coordination, software tools, and study documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>IEC 60909:</strong> Standard for short-circuit calculations</li>
              <li className="pl-1"><strong>Selectivity:</strong> Isolate only the faulted section</li>
              <li className="pl-1"><strong>TCC curves:</strong> Plot operating time vs fault current</li>
              <li className="pl-1"><strong>Software:</strong> ETAP, SKM, Amtech for analysis</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Fault levels:</strong> Typically 10-50 kA at LV switchboards</li>
              <li className="pl-1"><strong>Time margins:</strong> 0.3-0.4 seconds minimum</li>
              <li className="pl-1"><strong>Motor contribution:</strong> 4-6 × FLC initial</li>
              <li className="pl-1"><strong>Documentation:</strong> Essential for O&M</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply IEC 60909 methodology for short-circuit current calculations",
              "Analyse fault current contributions from transformers, generators, and motors",
              "Interpret and construct time-current characteristic curves",
              "Use coordination software tools (ETAP, SKM, Amtech) for protection studies",
              "Achieve selectivity between series-connected protective devices",
              "Document coordination studies for engineering records and O&M manuals"
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

        {/* Section 1: Short-Circuit Calculations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Short-Circuit Calculations (IEC 60909)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IEC 60909 provides the internationally accepted methodology for calculating short-circuit
              currents in three-phase AC systems. Understanding these calculations is fundamental to
              protective device selection and coordination.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key short-circuit current parameters:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>I"k (initial symmetrical):</strong> RMS value at instant of fault - determines breaking capacity</li>
                <li className="pl-1"><strong>ip (peak):</strong> Maximum instantaneous value - determines making capacity and dynamic forces</li>
                <li className="pl-1"><strong>Ib (breaking):</strong> RMS value at circuit breaker contact separation</li>
                <li className="pl-1"><strong>Ik (steady-state):</strong> RMS value after transients decay - relevant for generator faults</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEC 60909 Calculation Methodology</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Process</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Define system topology</td>
                      <td className="border border-white/10 px-3 py-2">Single-line diagram, voltage levels, network configuration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Determine equipment impedances</td>
                      <td className="border border-white/10 px-3 py-2">Transformers (Uk%), cables (R, X), motors, utility source</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Convert to common base</td>
                      <td className="border border-white/10 px-3 py-2">Typically 100 MVA base, per-unit system</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Calculate equivalent impedance</td>
                      <td className="border border-white/10 px-3 py-2">Series/parallel combinations to fault point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Apply voltage factor (c)</td>
                      <td className="border border-white/10 px-3 py-2">cmax = 1.05-1.1 for maximum, cmin = 0.95-1.0 for minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">Calculate I"k, ip, Ib</td>
                      <td className="border border-white/10 px-3 py-2">Different fault types: 3-phase, phase-earth, phase-phase</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Calculation Formula - Initial Symmetrical Short-Circuit Current</p>
              <div className="font-mono text-sm space-y-2">
                <p className="text-white">I"k = (c × Un) / (√3 × Zk)</p>
                <p className="text-white/70 text-xs mt-2">Where:</p>
                <p className="text-white/70 text-xs">c = voltage factor (typically 1.1 for maximum)</p>
                <p className="text-white/70 text-xs">Un = nominal voltage</p>
                <p className="text-white/70 text-xs">Zk = total impedance to fault point</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Always calculate both maximum (for equipment ratings) and minimum (for protection sensitivity) short-circuit currents at each location.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fault Current Contribution */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fault Current Contribution Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multiple sources contribute to fault current in electrical systems. Understanding each
              source's contribution characteristics is essential for accurate fault level calculations
              and proper protective device selection.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Utility (Grid) Contribution</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Sustained at I"k level</li>
                  <li className="pl-1">Obtain from DNO (fault level notice)</li>
                  <li className="pl-1">Typically dominates at MV/LV</li>
                  <li className="pl-1">Check for future increases</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Contribution</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Limited by Uk% (impedance)</li>
                  <li className="pl-1">I"k ≈ kVA / (Uk% × √3 × V)</li>
                  <li className="pl-1">Typical Uk%: 4-6% distribution</li>
                  <li className="pl-1">Parallel transformers increase fault level</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Contribution</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Induction: 4-6 × FLC, decays in 3-5 cycles</li>
                  <li className="pl-1">Synchronous: higher, longer decay</li>
                  <li className="pl-1">Significant for large motor loads</li>
                  <li className="pl-1">Often modelled as single equivalent</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Contribution</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Subtransient (X"d): initial 1-2 cycles</li>
                  <li className="pl-1">Transient (X'd): 0.5-2 seconds</li>
                  <li className="pl-1">Synchronous (Xd): steady-state</li>
                  <li className="pl-1">Standby generators significant</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">X/R Ratio and DC Component</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">X/R Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Peak Factor (κ)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DC Decay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt; 5</td>
                      <td className="border border-white/10 px-3 py-2">LV final circuits, small transformers</td>
                      <td className="border border-white/10 px-3 py-2">1.3 - 1.5</td>
                      <td className="border border-white/10 px-3 py-2">Rapid (&lt; 1 cycle)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5 - 15</td>
                      <td className="border border-white/10 px-3 py-2">LV distribution, medium transformers</td>
                      <td className="border border-white/10 px-3 py-2">1.5 - 1.8</td>
                      <td className="border border-white/10 px-3 py-2">Moderate (2-5 cycles)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15 - 50</td>
                      <td className="border border-white/10 px-3 py-2">MV systems, large transformers</td>
                      <td className="border border-white/10 px-3 py-2">1.8 - 2.0</td>
                      <td className="border border-white/10 px-3 py-2">Slow (5-10 cycles)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt; 50</td>
                      <td className="border border-white/10 px-3 py-2">Generator busbars, HV systems</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 2.0</td>
                      <td className="border border-white/10 px-3 py-2">Very slow (&gt; 10 cycles)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> The peak short-circuit current ip = κ × √2 × I"k, where κ depends on X/R ratio. Higher X/R ratios significantly increase dynamic stresses on equipment.
            </p>
          </div>
        </section>

        {/* Section 3: Protective Device Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Protective Device Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Coordination ensures that only the protective device immediately upstream of a fault
              operates, isolating the minimum portion of the system. This maintains supply to healthy
              circuits and is achieved through careful analysis of device characteristics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Principle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Time grading</td>
                      <td className="border border-white/10 px-3 py-2">Upstream device has longer time delay</td>
                      <td className="border border-white/10 px-3 py-2">Overcurrent relays, adjustable trip units</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current grading</td>
                      <td className="border border-white/10 px-3 py-2">Upstream device has higher pickup setting</td>
                      <td className="border border-white/10 px-3 py-2">Different fault levels at each location</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy (I²t)</td>
                      <td className="border border-white/10 px-3 py-2">Downstream device limits energy to below upstream trip</td>
                      <td className="border border-white/10 px-3 py-2">MCB/fuse coordination, current-limiting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zone selective interlocking</td>
                      <td className="border border-white/10 px-3 py-2">Communication restrains upstream devices</td>
                      <td className="border border-white/10 px-3 py-2">Modern electronic trip units, relays</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Time-Current Characteristic (TCC) Curves</p>
              <div className="text-sm space-y-2">
                <p className="text-white">TCC curves plot operating time versus fault current on log-log scales:</p>
                <ul className="text-sm text-white/90 space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>X-axis:</strong> Current (typically in multiples of rated current)</li>
                  <li className="pl-1"><strong>Y-axis:</strong> Operating time (0.01 to 1000 seconds)</li>
                  <li className="pl-1"><strong>Curve band:</strong> Tolerance between minimum and maximum operating times</li>
                  <li className="pl-1"><strong>Coordination requirement:</strong> Downstream device curve must sit entirely below and left of upstream curve within fault range</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Coordination time margins:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electromechanical relays:</strong> 0.4 seconds minimum</li>
                <li className="pl-1"><strong>Static/digital relays:</strong> 0.3 seconds minimum</li>
                <li className="pl-1"><strong>Circuit breakers:</strong> 0.3-0.4 seconds (accounts for relay + breaker time)</li>
                <li className="pl-1"><strong>Fuses:</strong> Must account for pre-arcing and arcing time tolerances</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Selectivity limit:</strong> The maximum fault current at which coordination is maintained. Above this level, both devices may operate simultaneously (partial selectivity).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Software Tools and Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Software Tools and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern coordination studies rely on specialised software for accurate analysis and
              documentation. These tools model complex systems, calculate fault currents at multiple
              locations, and automatically generate TCC curves.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industry-Standard Software Packages</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Software</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Developer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ETAP</td>
                      <td className="border border-white/10 px-3 py-2">ETAP/Schneider</td>
                      <td className="border border-white/10 px-3 py-2">Comprehensive analysis suite, real-time monitoring, arc flash</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SKM PowerTools</td>
                      <td className="border border-white/10 px-3 py-2">SKM Systems Analysis</td>
                      <td className="border border-white/10 px-3 py-2">DAPPER for coordination, extensive device libraries</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Amtech ProDesign</td>
                      <td className="border border-white/10 px-3 py-2">Trimble</td>
                      <td className="border border-white/10 px-3 py-2">UK-focused, BS 7671 compliance, protection coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CYMTCC</td>
                      <td className="border border-white/10 px-3 py-2">Eaton</td>
                      <td className="border border-white/10 px-3 py-2">TCC curve plotting, coordination analysis</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EasyPower</td>
                      <td className="border border-white/10 px-3 py-2">ESA Inc</td>
                      <td className="border border-white/10 px-3 py-2">Short-circuit, coordination, arc flash integrated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Software Analysis Capabilities</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">IEC 60909 / IEEE fault calculations</li>
                  <li className="pl-1">Automatic TCC curve generation</li>
                  <li className="pl-1">Device library with manufacturer data</li>
                  <li className="pl-1">Selectivity verification</li>
                  <li className="pl-1">Arc flash incident energy</li>
                  <li className="pl-1">Report generation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Study Documentation Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Single-line diagram with fault levels</li>
                  <li className="pl-1">Protective device schedule</li>
                  <li className="pl-1">TCC coordination plots</li>
                  <li className="pl-1">Relay/trip unit settings</li>
                  <li className="pl-1">Selectivity matrices</li>
                  <li className="pl-1">Calculation assumptions</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Study Report Contents</p>
              <div className="text-sm space-y-2">
                <p><strong>1. Introduction:</strong> Project scope, system description, design criteria</p>
                <p><strong>2. System Data:</strong> Single-line diagram, equipment ratings, cable data, utility fault level</p>
                <p><strong>3. Short-Circuit Analysis:</strong> Fault currents at each bus, calculation method (IEC 60909)</p>
                <p><strong>4. Protective Device Schedule:</strong> All devices with ratings, types, settings, and I²t characteristics</p>
                <p><strong>5. TCC Curves:</strong> Coordination plots for each series path, showing selectivity margins</p>
                <p><strong>6. Selectivity Matrix:</strong> Table showing coordination status between device pairs</p>
                <p><strong>7. Recommendations:</strong> Any coordination issues identified and proposed solutions</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Documentation tip:</strong> Include all input data assumptions so studies can be updated when system changes occur. Coordination studies should be living documents, revised whenever the system is modified.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Transformer Fault Level Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate the maximum prospective fault current at the LV terminals of an 800 kVA, 11/0.4 kV transformer with 5% impedance. Assume utility fault level is infinite.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given:</p>
                <p>Transformer rating S = 800 kVA</p>
                <p>Secondary voltage Un = 400 V</p>
                <p>Impedance Uk = 5%</p>
                <p>Voltage factor c = 1.1 (maximum)</p>
                <p className="mt-2 text-white/60">Calculation:</p>
                <p>Rated secondary current In = S / (√3 × Un)</p>
                <p>In = 800,000 / (1.732 × 400) = 1155 A</p>
                <p className="mt-2">Initial symmetrical fault current:</p>
                <p>I"k = (c × In) / Uk = (1.1 × 1155) / 0.05</p>
                <p className="text-green-400">I"k = 25.4 kA</p>
                <p className="mt-2 text-white/60">Peak current (assuming X/R = 10, κ = 1.8):</p>
                <p>ip = κ × √2 × I"k = 1.8 × 1.414 × 25.4</p>
                <p className="text-green-400">ip = 64.6 kA (peak)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Time Grading Coordination</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine the time settings for three series-connected overcurrent relays to achieve coordination with 0.4 second margins.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">System configuration:</p>
                <p>Relay A (upstream) → Relay B (midstream) → Relay C (downstream)</p>
                <p>Fault current at Relay C location = 10 kA</p>
                <p className="mt-2 text-white/60">Setting calculation (working upstream from fault):</p>
                <p>Relay C operating time at 10 kA: 0.3 seconds (fastest clearance)</p>
                <p className="mt-2">Relay B time setting:</p>
                <p>Minimum = Relay C time + margin = 0.3 + 0.4 = 0.7 seconds</p>
                <p className="text-green-400">Set Relay B time multiplier for 0.7s at 10 kA</p>
                <p className="mt-2">Relay A time setting:</p>
                <p>Minimum = Relay B time + margin = 0.7 + 0.4 = 1.1 seconds</p>
                <p className="text-green-400">Set Relay A time multiplier for 1.1s at 10 kA</p>
                <p className="mt-2 text-white/60">Total fault clearance time at Relay C:</p>
                <p>Relay C operates in 0.3s (+ breaker time ~0.05s) = 0.35s total</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Motor Fault Contribution</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate the fault current contribution from a 200 kW induction motor group during the initial cycles of a nearby fault.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given:</p>
                <p>Motor group rating = 200 kW</p>
                <p>Supply voltage = 400 V</p>
                <p>Power factor = 0.85</p>
                <p>Efficiency = 0.92</p>
                <p>Motor contribution factor = 5 × FLC (typical induction)</p>
                <p className="mt-2 text-white/60">Calculation:</p>
                <p>Motor input power = 200 / 0.92 = 217.4 kVA</p>
                <p>Motor FLC = 217,400 / (√3 × 400) = 314 A</p>
                <p className="mt-2">Initial fault contribution:</p>
                <p>Imotor = 5 × 314 = 1570 A</p>
                <p className="text-green-400">Motor contribution ≈ 1.6 kA (initial cycles)</p>
                <p className="mt-2 text-white/60">Note: This decays to zero within 3-5 cycles</p>
                <p>Must be added to utility contribution for total I"k</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Study Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Obtain utility fault level data from DNO (request maximum and minimum values)</li>
                <li className="pl-1">Collect accurate equipment impedance data (transformers, cables, motors)</li>
                <li className="pl-1">Calculate fault currents at all significant locations using IEC 60909</li>
                <li className="pl-1">Select protective devices with appropriate interrupting ratings</li>
                <li className="pl-1">Plot TCC curves for all series-connected devices</li>
                <li className="pl-1">Verify coordination margins (minimum 0.3-0.4 seconds)</li>
                <li className="pl-1">Document all settings and selectivity limits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Voltage factor c: <strong>1.1 maximum, 0.95 minimum</strong> (LV systems)</li>
                <li className="pl-1">Coordination margin: <strong>0.3-0.4 seconds</strong> minimum</li>
                <li className="pl-1">Motor contribution: <strong>4-6 × FLC</strong> initial, decays in 3-5 cycles</li>
                <li className="pl-1">Peak factor κ: <strong>1.3-2.0</strong> depending on X/R ratio</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring motor contribution</strong> - can significantly increase fault levels</li>
                <li className="pl-1"><strong>Using outdated DNO fault levels</strong> - system changes may increase prospective fault current</li>
                <li className="pl-1"><strong>Insufficient coordination margins</strong> - device tolerances cause overlap</li>
                <li className="pl-1"><strong>Not documenting assumptions</strong> - studies cannot be verified or updated</li>
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
                <p className="font-medium text-white mb-1">IEC 60909 Parameters</p>
                <ul className="space-y-0.5">
                  <li>I"k - Initial symmetrical current</li>
                  <li>ip - Peak short-circuit current</li>
                  <li>Ib - Breaking current</li>
                  <li>c - Voltage factor (1.0-1.1)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Coordination Software</p>
                <ul className="space-y-0.5">
                  <li>ETAP - Comprehensive analysis</li>
                  <li>SKM PowerTools - DAPPER module</li>
                  <li>Amtech ProDesign - UK focused</li>
                  <li>EasyPower - Integrated suite</li>
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
            <Link to="../h-n-c-module7-section6-5">
              Next: Protection Scheme Design
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section6_4;
