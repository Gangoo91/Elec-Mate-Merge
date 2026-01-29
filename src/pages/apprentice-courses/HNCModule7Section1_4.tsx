import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Discrimination Studies - HNC Module 7 Section 1.4";
const DESCRIPTION = "Master protective device discrimination for electrical installations: time-current curves, discrimination margins, cascading, backup protection, and coordination software tools to BS 7671.";

const quickCheckQuestions = [
  {
    id: "discrimination-definition",
    question: "What is discrimination (selectivity) in protective device coordination?",
    options: ["Using the same size device throughout an installation", "The ability of the nearest upstream device to operate before downstream devices", "Installing the largest possible protective device", "The ability of the device nearest the fault to operate and isolate it whilst upstream devices remain closed"],
    correctIndex: 3,
    explanation: "Discrimination (selectivity) ensures that only the protective device nearest to the fault operates to clear it, whilst all upstream devices remain closed. This minimises disruption to healthy circuits."
  },
  {
    id: "total-vs-partial",
    question: "What is the difference between total and partial discrimination?",
    options: ["Total discrimination uses fuses; partial uses MCBs", "Total discrimination works up to the maximum prospective fault current; partial only works up to a defined limit", "Total discrimination is for domestic; partial is for commercial", "There is no difference - they are interchangeable terms"],
    correctIndex: 1,
    explanation: "Total discrimination means the downstream device operates for all fault levels up to the maximum prospective fault current. Partial discrimination only achieves selectivity up to a defined discrimination limit (I_s), beyond which both devices may operate."
  },
  {
    id: "time-current-curve",
    question: "On a time-current characteristic curve, what does the x-axis represent?",
    options: ["Operating time in seconds", "Prospective fault current (typically in multiples of In or Amperes)", "Cable cross-sectional area", "Circuit impedance"],
    correctIndex: 1,
    explanation: "Time-current curves plot operating time (y-axis, logarithmic scale) against prospective fault current (x-axis, logarithmic scale). Current is often shown in multiples of rated current (In) or in Amperes."
  },
  {
    id: "cascading-backup",
    question: "What is backup protection (cascading) in protective device coordination?",
    options: ["Installing two devices in parallel for redundancy", "Using the upstream device's breaking capacity to supplement the downstream device's lower breaking capacity", "Connecting protective devices to a UPS", "Installing surge protection devices"],
    correctIndex: 1,
    explanation: "Backup protection (cascading) allows a downstream device with limited breaking capacity to be protected by an upstream device with higher breaking capacity. This enables use of lower-rated devices where prospective fault current exceeds their individual breaking capacity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671, what is the minimum discrimination ratio typically required between upstream and downstream fuses for reliable discrimination?",
    options: [
      "1.5:1",
      "2:1",
      "1.6:1 for HRC fuses (gG type)",
      "3:1"
    ],
    correctAnswer: 2,
    explanation: "For gG-type HRC fuses, a discrimination ratio of 1.6:1 (upstream to downstream) typically achieves discrimination for currents up to the I2t let-through. Actual values depend on manufacturer data and should always be verified."
  },
  {
    id: 2,
    question: "When analysing time-current curves, discrimination is achieved when:",
    options: ["The curves overlap at all points", "The downstream device curve is entirely to the left of and below the upstream curve at all fault levels", "Both devices have identical curves", "The curves intersect at the rated current"],
    correctAnswer: 1,
    explanation: "Discrimination requires the downstream (nearer to fault) device to operate faster (lower on curve) at lower current (further left) than the upstream device. The curves must not cross within the range of prospective fault currents."
  },
  {
    id: 3,
    question: "The discrimination limit (I_s) on coordination tables indicates:",
    options: [
      "The maximum continuous current rating",
      "The current level up to which discrimination is guaranteed",
      "The minimum fault current for the device to operate",
      "The cable current-carrying capacity"
    ],
    correctAnswer: 1,
    explanation: "The discrimination limit (I_s) is the maximum fault current at which discrimination between upstream and downstream devices is guaranteed. Above this value, both devices may operate simultaneously (partial discrimination)."
  },
  {
    id: 4,
    question: "What is the primary advantage of using HRC fuses over MCBs for discrimination?",
    options: [
      "HRC fuses are cheaper",
      "HRC fuses have better current limitation and more predictable time-current characteristics at high fault levels",
      "HRC fuses never need replacement",
      "MCBs cannot be used for discrimination"
    ],
    correctAnswer: 1,
    explanation: "HRC fuses provide excellent current limitation at high fault levels with very predictable characteristics. Their operating curves are well-defined and manufacturer tolerances are tight, making discrimination easier to achieve."
  },
  {
    id: 5,
    question: "In a cascading (backup protection) arrangement, what must be verified?",
    options: [
      "The downstream device has higher breaking capacity than the upstream",
      "The combination has been tested by the manufacturer and the enhanced breaking capacity is stated",
      "Both devices are from different manufacturers",
      "The cable size is the same throughout"
    ],
    correctAnswer: 1,
    explanation: "Cascading combinations must be manufacturer-tested and approved. The enhanced breaking capacity only applies to that specific combination of devices and must be documented. BS EN 60947-2 covers coordination testing."
  },
  {
    id: 6,
    question: "When using coordination software tools, what input data is essential?",
    options: [
      "Only the protective device ratings",
      "Prospective fault currents at each point, device characteristics, cable data, and system configuration",
      "Only the circuit length",
      "The installation date"
    ],
    correctAnswer: 1,
    explanation: "Coordination software requires comprehensive input: prospective fault current at each point, protective device types and settings, cable impedances, transformer data, and system topology. This enables accurate time-current analysis."
  },
  {
    id: 7,
    question: "For discrimination between an upstream MCB and downstream MCB, what is the main challenge?",
    options: [
      "MCBs cannot achieve discrimination",
      "MCBs have overlapping magnetic trip regions, making discrimination at high fault currents difficult",
      "MCBs are too expensive",
      "MCBs trip too slowly"
    ],
    correctAnswer: 1,
    explanation: "MCBs have magnetic instantaneous trip regions (typically 5-10 x In for Type B, 7-15 x In for Type C). These overlapping regions at high currents make discrimination challenging without significant ratio differences or current-limiting techniques."
  },
  {
    id: 8,
    question: "What is I²t let-through energy and why is it important for discrimination?",
    options: [
      "It is the resistance of the circuit",
      "It represents the thermal energy let through during fault clearance - the upstream device must limit more energy than downstream for discrimination",
      "It is the voltage drop calculation",
      "It determines cable colour"
    ],
    correctAnswer: 1,
    explanation: "I²t (Joule integral) represents the thermal energy that passes through during fault clearance. For discrimination, the upstream device's I²t let-through must exceed the downstream device's pre-arcing I²t to ensure the downstream operates first."
  },
  {
    id: 9,
    question: "Zone Selective Interlocking (ZSI) in protective relay coordination:",
    options: [
      "Is a mechanical linkage between devices",
      "Uses communication between relays to achieve faster clearing at fault location whilst maintaining backup protection",
      "Only works with fuses",
      "Is not permitted by BS 7671"
    ],
    correctAnswer: 1,
    explanation: "ZSI enables downstream relays to signal upstream relays that they have detected a fault, allowing the upstream relay to delay operation. This achieves fast fault clearance at the fault location whilst maintaining backup protection capability."
  },
  {
    id: 10,
    question: "What does Regulation 536.4 of BS 7671 require regarding backup protection?",
    options: [
      "Backup protection is prohibited",
      "The characteristics of the devices shall be coordinated and the combination verified as suitable for the maximum prospective fault current",
      "Only fuses may be used",
      "All devices must have identical ratings"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 536.4 permits backup protection (cascading) provided that the device characteristics are coordinated and the combination's suitability for the installation conditions (particularly prospective fault current) is verified."
  },
  {
    id: 11,
    question: "When plotting time-current curves on log-log scales, a 2:1 current ratio appears as:",
    options: [
      "A very large horizontal separation",
      "Approximately 0.3 decades (30% of a decade) of horizontal separation",
      "No separation at all",
      "Curves will intersect"
    ],
    correctAnswer: 1,
    explanation: "On logarithmic scales, a 2:1 ratio represents log₁₀(2) ≈ 0.301, or roughly 30% of a decade. This appears as a modest horizontal separation, explaining why discrimination ratios need to be significant to show clear curve separation."
  },
  {
    id: 12,
    question: "An MCCB with adjustable settings (Ir, Im, Ig) provides discrimination advantages because:",
    options: [
      "It is more expensive",
      "Settings can be adjusted to achieve time and current grading with upstream and downstream devices",
      "It has a lower breaking capacity",
      "It cannot be used with fuses"
    ],
    correctAnswer: 1,
    explanation: "MCCBs with adjustable thermal (Ir), magnetic (Im), and ground fault (Ig) settings allow precise coordination. Time delays can be added to achieve grading, and pickup currents can be adjusted to create discrimination margins."
  }
];

const faqs = [
  {
    question: "Why is discrimination important in electrical installations?",
    answer: "Discrimination ensures that only the protective device nearest to a fault operates, whilst upstream devices remain closed. This minimises disruption - a fault in one circuit doesn't cause loss of supply to other healthy circuits. In critical installations (hospitals, data centres), poor discrimination could cause widespread outages. BS 7671 and good engineering practice require discrimination to be considered during design."
  },
  {
    question: "What is the difference between time grading and current grading?",
    answer: "Time grading relies on the upstream device having a longer operating time than the downstream device at the same fault current level (achieved through time delay settings). Current grading relies on the upstream device having a higher pickup current setting so it doesn't respond to fault currents that the downstream device will clear. Most effective discrimination uses a combination of both approaches."
  },
  {
    question: "How do I obtain discrimination data for protective devices?",
    answer: "Manufacturers provide time-current curves in product catalogues, technical datasheets, and coordination software. Many manufacturers offer free or subscription-based coordination software that includes their device libraries. For complex installations, coordination studies should be performed using these tools and documented as part of the design verification."
  },
  {
    question: "When is partial discrimination acceptable?",
    answer: "Partial discrimination may be acceptable where the probability of fault current exceeding the discrimination limit is low, or where limited supply interruption is tolerable. The discrimination limit (I_s) should exceed typical expected fault currents in the installation. Total discrimination is preferred for critical supplies but may not always be economically or technically achievable."
  },
  {
    question: "Can different manufacturers' devices achieve discrimination?",
    answer: "Yes, provided you have accurate time-current data for both devices. However, cascading (backup protection) arrangements typically require manufacturer-tested combinations. For critical coordination, using devices from the same manufacturer simplifies analysis and may provide tested coordination tables."
  },
  {
    question: "What software tools are available for coordination studies?",
    answer: "Major manufacturers offer coordination software: ABB DOC, Schneider Electric Ecodial, Siemens SIMARIS, Eaton XPOLE, etc. There are also independent tools like ETAP, SKM PowerTools, and EasyPower. These tools import device libraries, calculate fault currents, plot overlaid time-current curves, and verify discrimination automatically."
  }
];

const HNCModule7Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1">
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
            <span>Module 7.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Discrimination Studies
          </h1>
          <p className="text-white/80">
            Time-current curves, discrimination margins, cascading, backup protection, and coordination software for protective device selectivity
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Discrimination:</strong> Nearest device to fault operates first</li>
              <li className="pl-1"><strong>Time-current curves:</strong> Plot operating characteristics</li>
              <li className="pl-1"><strong>Total vs partial:</strong> Complete or limited selectivity range</li>
              <li className="pl-1"><strong>Cascading:</strong> Upstream enhances downstream capacity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 7671:</strong> Regulation 536 - Coordination</li>
              <li className="pl-1"><strong>BS EN 60947-2:</strong> MCCB coordination testing</li>
              <li className="pl-1"><strong>BS EN 60898:</strong> MCB characteristics</li>
              <li className="pl-1"><strong>BS 88:</strong> HRC fuse standards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Interpret and analyse time-current characteristic curves",
              "Calculate discrimination margins and verify selectivity",
              "Distinguish between total and partial discrimination",
              "Apply cascading and backup protection principles",
              "Use coordination software for protection studies",
              "Comply with BS 7671 requirements for protective coordination"
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

        {/* Section 1: Fundamentals of Discrimination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fundamentals of Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Discrimination (also called selectivity) is the coordination of protective devices to ensure
              that only the device nearest to a fault operates to clear it, whilst all upstream devices
              remain closed. This fundamental principle minimises the impact of faults on the wider
              installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key discrimination principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fault isolation:</strong> Only the device nearest to the fault should operate</li>
                <li className="pl-1"><strong>Supply continuity:</strong> Healthy circuits remain energised</li>
                <li className="pl-1"><strong>Time grading:</strong> Downstream devices operate faster than upstream</li>
                <li className="pl-1"><strong>Current grading:</strong> Different pickup settings create selectivity zones</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Discrimination</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Total Discrimination</td>
                      <td className="border border-white/10 px-3 py-2">Selectivity achieved for all fault currents up to the maximum prospective fault current</td>
                      <td className="border border-white/10 px-3 py-2">Critical installations, hospitals, data centres</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Partial Discrimination</td>
                      <td className="border border-white/10 px-3 py-2">Selectivity achieved only up to a defined discrimination limit (I_s)</td>
                      <td className="border border-white/10 px-3 py-2">General commercial and industrial where occasional simultaneous operation is acceptable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">No Discrimination</td>
                      <td className="border border-white/10 px-3 py-2">Both devices may operate for any fault - no coordination</td>
                      <td className="border border-white/10 px-3 py-2">Not recommended - indicates poor design</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">BS 7671 Requirement</p>
              <p className="text-sm text-white">
                Regulation 536.4 states that where backup protection is used, the characteristics of the
                devices shall be coordinated such that the energy let-through of the upstream device does
                not exceed that which the downstream device and protected conductors can withstand.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Discrimination should be verified at the design stage using manufacturer data and coordination studies, not assumed based on ratings alone.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Time-Current Characteristics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Time-Current Characteristic Curves
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Time-current curves are the fundamental tool for analysing protective device coordination.
              They display the relationship between prospective fault current and the operating time
              of protective devices, enabling engineers to verify discrimination visually and analytically.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Curve Components</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">X-axis: Current (A or xIn)</li>
                  <li className="pl-1">Y-axis: Time (seconds)</li>
                  <li className="pl-1">Both axes logarithmic</li>
                  <li className="pl-1">Tolerance bands shown</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB Regions</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Thermal region (overload)</li>
                  <li className="pl-1">Magnetic region (short-circuit)</li>
                  <li className="pl-1">Type B: 3-5 x In magnetic</li>
                  <li className="pl-1">Type C: 5-10 x In magnetic</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HRC Fuse Curves</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Pre-arcing time (minimum)</li>
                  <li className="pl-1">Total operating time (max)</li>
                  <li className="pl-1">Current-limiting action</li>
                  <li className="pl-1">Steep curve at high I</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reading Time-Current Curves</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Indicates</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Discrimination Implication</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Curve position (left/right)</td>
                      <td className="border border-white/10 px-3 py-2">Current at which device operates</td>
                      <td className="border border-white/10 px-3 py-2">Downstream should be left of upstream</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Curve position (up/down)</td>
                      <td className="border border-white/10 px-3 py-2">Operating time for given current</td>
                      <td className="border border-white/10 px-3 py-2">Downstream should be below upstream</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Band width (tolerance)</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturing variation range</td>
                      <td className="border border-white/10 px-3 py-2">Bands must not overlap for discrimination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Curve intersection point</td>
                      <td className="border border-white/10 px-3 py-2">Discrimination limit (I_s)</td>
                      <td className="border border-white/10 px-3 py-2">Above this current, both may operate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Vertical region (magnetic)</td>
                      <td className="border border-white/10 px-3 py-2">Instantaneous trip zone</td>
                      <td className="border border-white/10 px-3 py-2">Most difficult region for discrimination</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: MCB Discrimination Analysis</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Upstream:</span> <span className="text-white">63A Type C MCB (magnetic trip 5-10 x In = 315-630A)</span></p>
                <p><span className="text-white/60">Downstream:</span> <span className="text-white">32A Type B MCB (magnetic trip 3-5 x In = 96-160A)</span></p>
                <p className="mt-2"><span className="text-white/60">Analysis:</span></p>
                <p className="text-white">Thermal region: 32A curve is left of 63A - OK</p>
                <p className="text-white">Magnetic region: 32A trips at 96-160A; 63A trips at 315-630A</p>
                <p className="text-green-400">Result: Discrimination achieved up to ~315A (I_s)</p>
                <p className="text-orange-400">Above 315A: Potential simultaneous operation</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Always use the maximum tolerance (worst case) curves when verifying discrimination - minimum time for downstream, maximum time for upstream.
            </p>
          </div>
        </section>

        {/* Section 3: Discrimination Margins and Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Discrimination Margins and Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Achieving reliable discrimination requires adequate margins between device characteristics.
              These margins account for manufacturing tolerances, temperature variations, and the
              physics of fault current interruption.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Discrimination Ratios (Typical Guidelines)</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">HRC Fuses (gG):</span> <span className="text-white">Ratio &gt; 1.6:1 (upstream:downstream rating)</span></p>
                <p><span className="text-white/60">MCBs same type:</span> <span className="text-white">Ratio &gt; 2:1 often needed for thermal region</span></p>
                <p><span className="text-white/60">MCCB to MCB:</span> <span className="text-white">Use manufacturer coordination tables</span></p>
                <p><span className="text-white/60">Time delay relays:</span> <span className="text-white">Minimum 0.3-0.4s grading margin</span></p>
                <p className="mt-2 text-white/60 text-xs">Note: Always verify with manufacturer data - these are indicative only</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">I²t Energy Coordination</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>I²t let-through:</strong> Energy passed during fault clearance (A²s)</li>
                <li className="pl-1"><strong>Pre-arcing I²t:</strong> Energy to initiate arc in fuse element</li>
                <li className="pl-1"><strong>Total I²t:</strong> Pre-arcing plus arcing energy</li>
                <li className="pl-1"><strong>Rule:</strong> Upstream total I²t &gt; Downstream pre-arcing I²t for discrimination</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Time Grading Margins</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device Combination</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Time Margin</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electromechanical relays</td>
                      <td className="border border-white/10 px-3 py-2">0.4 - 0.5 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Accounts for overshoot and reset time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Digital/numerical relays</td>
                      <td className="border border-white/10 px-3 py-2">0.2 - 0.3 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Faster operation, less overshoot</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCBs with time delay</td>
                      <td className="border border-white/10 px-3 py-2">0.1 - 0.2 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer specific - verify data</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fuses only</td>
                      <td className="border border-white/10 px-3 py-2">Use I²t analysis</td>
                      <td className="border border-white/10 px-3 py-2">Time comparison less reliable for fuses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Example: Fuse Discrimination</p>
              <div className="font-mono text-sm space-y-1">
                <p className="text-white/60">Given:</p>
                <p><span className="text-white">Upstream: 100A gG fuse, I²t let-through = 15,000 A²s at 10kA</span></p>
                <p><span className="text-white">Downstream: 63A gG fuse, Pre-arcing I²t = 8,000 A²s at 10kA</span></p>
                <p className="mt-2 text-white/60">Verification:</p>
                <p><span className="text-white">Upstream total I²t (15,000) &gt; Downstream pre-arcing I²t (8,000)</span></p>
                <p className="text-green-400 mt-1">Result: Discrimination achieved at 10kA fault level</p>
                <p className="text-white/60 mt-2">Rating ratio: 100/63 = 1.59:1 (close to 1.6:1 guideline)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical note:</strong> I²t values vary with prospective fault current. Always check discrimination at the actual fault current levels expected in the installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Cascading and Backup Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cascading and Backup Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cascading (backup protection) is a coordination technique where an upstream device with
              high breaking capacity supplements a downstream device with lower breaking capacity. This
              allows use of smaller, more economical devices where prospective fault currents are high.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cascading principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Current limitation:</strong> Upstream device limits fault current before downstream reaches breaking capacity</li>
                <li className="pl-1"><strong>Energy limitation:</strong> I²t let-through kept within downstream device withstand</li>
                <li className="pl-1"><strong>Tested combinations:</strong> Only manufacturer-verified pairings are valid</li>
                <li className="pl-1"><strong>Enhanced rating:</strong> Combination achieves higher breaking capacity than individual devices</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cascading Requirements (BS 7671 / BS EN 60947-2)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type-tested combination</td>
                      <td className="border border-white/10 px-3 py-2">Devices must be tested together per standards</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer coordination tables</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stated enhanced Ics</td>
                      <td className="border border-white/10 px-3 py-2">Combined service breaking capacity documented</td>
                      <td className="border border-white/10 px-3 py-2">Technical datasheets, software</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Same manufacturer</td>
                      <td className="border border-white/10 px-3 py-2">Generally required for cascading validity</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer confirmation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable protection maintained</td>
                      <td className="border border-white/10 px-3 py-2">I²t let-through &lt; cable k²S²</td>
                      <td className="border border-white/10 px-3 py-2">Adiabatic calculation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages of Cascading</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lower cost downstream devices</li>
                  <li className="pl-1">Reduced panel space</li>
                  <li className="pl-1">Smaller cable requirements upstream</li>
                  <li className="pl-1">System standardisation possible</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limitations and Risks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Both devices may operate (nuisance trip)</li>
                  <li className="pl-1">Limited to specific combinations</li>
                  <li className="pl-1">Documentation essential</li>
                  <li className="pl-1">Replacement must match exactly</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important Warning</p>
              <p className="text-sm text-white">
                Cascading is NOT discrimination. In a cascading arrangement, both devices typically operate
                during a high-level fault. The purpose is breaking capacity enhancement, not selectivity.
                Discrimination and cascading are different coordination objectives that may conflict.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cascading Example</p>
              <div className="font-mono text-sm space-y-1">
                <p className="text-white/60">Installation conditions:</p>
                <p><span className="text-white">Prospective fault current at distribution board: 25kA</span></p>
                <p className="mt-2 text-white/60">Without cascading:</p>
                <p><span className="text-white">MCB required breaking capacity: ≥25kA (expensive, limited options)</span></p>
                <p className="mt-2 text-white/60">With cascading (manufacturer-verified):</p>
                <p><span className="text-white">MCCB upstream: 50kA breaking capacity (current limiting)</span></p>
                <p><span className="text-white">MCB downstream: 10kA individual rating</span></p>
                <p><span className="text-green-400">Combined enhanced rating: 25kA (from coordination tables)</span></p>
                <p className="text-white/60 mt-2">Result: Compliant and more economical solution</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design decision:</strong> When specifying cascading, consider whether discrimination
              is also required. If both upstream and downstream devices operate, supply to all downstream
              circuits is lost - this may or may not be acceptable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Coordination Software and Studies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Coordination Software and Protection Studies</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Available Coordination Software Tools</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Manufacturer-Specific</p>
                  <ul className="space-y-0.5 text-white/80">
                    <li>ABB DOC (Coordination software)</li>
                    <li>Schneider Electric Ecodial</li>
                    <li>Siemens SIMARIS design</li>
                    <li>Eaton xPole Selector</li>
                    <li>Hager Selectivity tools</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Independent/Multi-vendor</p>
                  <ul className="space-y-0.5 text-white/80">
                    <li>ETAP (Enterprise power analysis)</li>
                    <li>SKM PowerTools</li>
                    <li>EasyPower</li>
                    <li>DIgSILENT PowerFactory</li>
                    <li>CYME (Distribution analysis)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Study Process</h3>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: System modelling</p>
                <p className="ml-4">- Import single-line diagram</p>
                <p className="ml-4">- Define transformer impedances</p>
                <p className="ml-4">- Enter cable data (length, CSA, material)</p>
                <p className="ml-4">- Configure source fault level</p>
                <p className="mt-2 text-white/60">Step 2: Fault calculations</p>
                <p className="ml-4">- Calculate Ipf at each protection point</p>
                <p className="ml-4">- Determine minimum and maximum fault currents</p>
                <p className="ml-4">- Consider motor contribution where applicable</p>
                <p className="mt-2 text-white/60">Step 3: Device selection</p>
                <p className="ml-4">- Select protective devices from libraries</p>
                <p className="ml-4">- Configure settings (Ir, Im, time delays)</p>
                <p className="ml-4">- Import time-current characteristics</p>
                <p className="mt-2 text-white/60">Step 4: Coordination analysis</p>
                <p className="ml-4">- Plot overlaid time-current curves</p>
                <p className="ml-4">- Identify discrimination limits (I_s)</p>
                <p className="ml-4">- Check for curve crossings</p>
                <p className="ml-4">- Verify cascading combinations</p>
                <p className="mt-2 text-white/60">Step 5: Documentation</p>
                <p className="ml-4">- Generate coordination reports</p>
                <p className="ml-4">- Export settings schedules</p>
                <p className="ml-4">- Archive for design verification</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Required Input Data for Studies</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Data Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specific Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply authority</td>
                      <td className="border border-white/10 px-3 py-2">Fault level at intake, X/R ratio, supply voltage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">Rating, impedance (%), connection type, tap settings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cables</td>
                      <td className="border border-white/10 px-3 py-2">Length, CSA, conductor material, installation method</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protective devices</td>
                      <td className="border border-white/10 px-3 py-2">Type, rating, settings, manufacturer and model</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motors</td>
                      <td className="border border-white/10 px-3 py-2">Rating, starting current, contribution to faults</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: MCB Discrimination Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify discrimination between 100A Type C MCB (upstream) and 32A Type B MCB (downstream).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Device characteristics:</p>
                <p>Upstream: 100A Type C</p>
                <p className="ml-4">- Thermal trip: Per BS EN 60898 (inverse time)</p>
                <p className="ml-4">- Magnetic trip: 5-10 x In = 500-1000A</p>
                <p className="mt-2">Downstream: 32A Type B</p>
                <p className="ml-4">- Thermal trip: Per BS EN 60898 (inverse time)</p>
                <p className="ml-4">- Magnetic trip: 3-5 x In = 96-160A</p>
                <p className="mt-2 text-white/60">Analysis at different fault levels:</p>
                <p className="mt-1">At 96A (1 x upstream magnetic threshold minimum):</p>
                <p className="ml-4 text-green-400">Downstream trips (magnetic), upstream not activated</p>
                <p className="mt-1">At 200A:</p>
                <p className="ml-4 text-green-400">Downstream trips, upstream in thermal region only</p>
                <p className="mt-1">At 500A (upstream magnetic region begins):</p>
                <p className="ml-4 text-orange-400">Both in magnetic region - potential simultaneous trip</p>
                <p className="mt-2 text-white/60">Result:</p>
                <p className="text-green-400">Discrimination limit (I_s) ≈ 500A</p>
                <p>Partial discrimination - acceptable if Ipf &lt; 500A at downstream</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Fuse-to-Fuse Discrimination</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify discrimination between 160A and 100A gG HRC fuses at 20kA fault level.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data (from manufacturer curves at 20kA):</p>
                <p>160A fuse: Pre-arcing I²t = 65,000 A²s</p>
                <p>160A fuse: Total operating I²t = 120,000 A²s</p>
                <p>100A fuse: Pre-arcing I²t = 22,000 A²s</p>
                <p>100A fuse: Total operating I²t = 48,000 A²s</p>
                <p className="mt-2 text-white/60">Discrimination check:</p>
                <p>Upstream total I²t (160A): 120,000 A²s</p>
                <p>Downstream pre-arcing I²t (100A): 22,000 A²s</p>
                <p className="mt-1">120,000 &gt; 22,000 ✓</p>
                <p className="mt-2 text-green-400">Result: Full discrimination achieved at 20kA</p>
                <p className="text-white/60 mt-2">Rating ratio: 160/100 = 1.6:1 (meets guideline)</p>
                <p className="text-white/60">Also check at other fault current levels</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: MCCB Time Grading</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Set time delays for 400A and 250A MCCBs to achieve discrimination.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">System requirements:</p>
                <p>Maximum Ipf at downstream MCCB: 15kA</p>
                <p>Downstream 250A MCCB clearing time at 15kA: 50ms (instantaneous)</p>
                <p className="mt-2 text-white/60">Grading margin calculation:</p>
                <p>Minimum grading margin for MCCBs: 100ms (manufacturer recommendation)</p>
                <p className="mt-1">Upstream 400A MCCB time delay required:</p>
                <p>= Downstream time + Grading margin + Safety factor</p>
                <p>= 50ms + 100ms + 50ms = 200ms</p>
                <p className="mt-2 text-white/60">Settings:</p>
                <p>Downstream 250A: Instantaneous (no intentional delay)</p>
                <p>Upstream 400A: Short-time delay = 200ms at Isd</p>
                <p className="mt-2 text-green-400">Result: Time-graded discrimination achieved</p>
                <p className="text-orange-400 mt-1">Note: Increased fault duration - check cable withstand</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Study Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Obtain fault level data from supply authority (Ipf at intake)</li>
                <li className="pl-1">Calculate prospective fault current at each distribution point</li>
                <li className="pl-1">Select protective devices considering discrimination requirements</li>
                <li className="pl-1">Obtain time-current curves from manufacturers</li>
                <li className="pl-1">Plot overlaid curves and identify discrimination limits</li>
                <li className="pl-1">Verify cascading combinations if used</li>
                <li className="pl-1">Document coordination study in design records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">HRC fuse discrimination ratio: <strong>≥1.6:1</strong> (gG type)</li>
                <li className="pl-1">MCB discrimination: Often requires <strong>≥2:1</strong> ratio</li>
                <li className="pl-1">Electromechanical relay grading: <strong>0.4-0.5s</strong> margin</li>
                <li className="pl-1">Digital relay grading: <strong>0.2-0.3s</strong> margin</li>
                <li className="pl-1">Type B MCB magnetic: <strong>3-5 x In</strong></li>
                <li className="pl-1">Type C MCB magnetic: <strong>5-10 x In</strong></li>
                <li className="pl-1">Type D MCB magnetic: <strong>10-20 x In</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assuming discrimination from ratings:</strong> Always verify with curves/data</li>
                <li className="pl-1"><strong>Ignoring tolerance bands:</strong> Use worst-case manufacturer data</li>
                <li className="pl-1"><strong>Mixing cascading and discrimination:</strong> These are different objectives</li>
                <li className="pl-1"><strong>Not documenting coordination:</strong> Required for design verification</li>
                <li className="pl-1"><strong>Ignoring motor contribution:</strong> Motors add to fault current initially</li>
                <li className="pl-1"><strong>Using untested cascading combinations:</strong> Only verified pairs are valid</li>
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
                <p className="font-medium text-white mb-1">Discrimination Types</p>
                <ul className="space-y-0.5">
                  <li>Total: Selectivity at all fault levels</li>
                  <li>Partial: Selectivity up to I_s limit</li>
                  <li>Time grading: Delayed upstream operation</li>
                  <li>Current grading: Higher pickup upstream</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">BS 7671 Requirements</p>
                <ul className="space-y-0.5">
                  <li>Reg 536.4: Backup protection coordination</li>
                  <li>Characteristics must be matched</li>
                  <li>Combination verified suitable</li>
                  <li>Cable protection maintained</li>
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
            <Link to="../h-n-c-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1-5">
              Next: Section 1.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section1_4;
