import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Substation Layout and Design - MOET Module 3 Section 1.6";
const DESCRIPTION = "Comprehensive guide to protection coordination and substation layout for electrical maintenance technicians: discrimination, selectivity, time grading, current grading, cascading, back-up protection, fault level considerations and BS 7671 compliance.";

const quickCheckQuestions = [
  {
    id: "discrimination-purpose",
    question: "What is the purpose of discrimination between protective devices?",
    options: [
      "To increase the fault current",
      "To ensure only the device nearest the fault operates, minimising supply disruption",
      "To reduce the cost of installation",
      "To increase cable ratings"
    ],
    correctIndex: 1,
    explanation: "Discrimination ensures that only the protective device nearest to the fault operates, while upstream devices remain closed. This limits the outage to the smallest possible section of the installation, maintaining supply to unaffected circuits."
  },
  {
    id: "time-grading-interval",
    question: "What is the typical time grading interval between successive protective devices?",
    options: [
      "0.01 to 0.05 seconds",
      "0.1 to 0.3 seconds",
      "1 to 2 seconds",
      "5 to 10 seconds"
    ],
    correctIndex: 1,
    explanation: "The typical time grading interval is 0.1 to 0.3 seconds. This accounts for the breaker operating time, relay operating time and a safety margin to ensure the downstream device clears the fault before the upstream device operates."
  },
  {
    id: "cascading-effect",
    question: "What happens during cascading when a fault exceeds the breaking capacity of the downstream device?",
    options: [
      "The downstream device handles it alone",
      "The upstream device assists in breaking the fault current",
      "The fault is ignored",
      "The cable acts as a fuse"
    ],
    correctIndex: 1,
    explanation: "In cascading, the upstream device assists the downstream device by contributing to fault current interruption. This allows downstream devices with lower breaking capacities to be used, but both devices may trip for high-level faults, causing a wider outage."
  },
  {
    id: "device-replacement",
    question: "Why should a protective device never be replaced with a different type or make without engineering approval?",
    options: [
      "It may be a different colour",
      "The replacement may invalidate the protection coordination scheme",
      "Different brands are always inferior",
      "It will void the building insurance"
    ],
    correctIndex: 1,
    explanation: "Protection coordination is a designed system where devices are selected as a set to work together. Changing one device can invalidate the discrimination and cascading arrangements, potentially causing wider outages or safety hazards during fault conditions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is discrimination (selectivity) in protection coordination?",
    options: [
      "All devices trip simultaneously",
      "Only the device nearest the fault operates while upstream devices remain closed",
      "The largest device always trips first",
      "Devices trip in reverse order"
    ],
    correctAnswer: 1,
    explanation: "Discrimination ensures only the protective device nearest the fault operates, while all upstream devices remain closed, limiting the outage to the smallest possible section."
  },
  {
    id: 2,
    question: "What is the difference between full and partial discrimination?",
    options: [
      "Full uses fuses; partial uses MCBs",
      "Full works for all fault levels; partial works up to a discrimination limit",
      "Full is more expensive; partial is free",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Full discrimination works for all fault levels up to the maximum Ipf. Partial discrimination works up to a certain fault level (discrimination limit), above which both devices may trip."
  },
  {
    id: 3,
    question: "What is the typical time grading interval between successive protection devices?",
    options: ["0.01 s", "0.1 to 0.3 s", "1 to 2 s", "5 s"],
    correctAnswer: 1,
    explanation: "The typical time grading interval is 0.1 to 0.3 seconds, accounting for device operating times and safety margins."
  },
  {
    id: 4,
    question: "What does cascading (back-up protection) allow?",
    options: [
      "Faster tripping",
      "Use of downstream devices with lower breaking capacity, assisted by upstream device",
      "Elimination of all upstream devices",
      "Parallel operation of transformers"
    ],
    correctAnswer: 1,
    explanation: "Cascading allows downstream devices to have a breaking capacity lower than the prospective fault current, with the upstream device assisting in fault interruption for high-level faults."
  },
  {
    id: 5,
    question: "What happens if time-current curves of two series devices cross?",
    options: [
      "Perfect discrimination is achieved",
      "Both devices may operate simultaneously in the crossover region",
      "Neither device operates",
      "The installation is safe"
    ],
    correctAnswer: 1,
    explanation: "If curves cross, both devices may operate simultaneously for faults in the crossover region, resulting in a wider outage than intended."
  },
  {
    id: 6,
    question: "What is the minimum breaking capacity requirement under Regulation 434.5.1?",
    options: [
      "6 kA for all devices",
      "Not less than the prospective fault current at the point of installation",
      "10 kA for commercial installations",
      "Equal to the supply transformer rating"
    ],
    correctAnswer: 1,
    explanation: "Every protective device must have a rated breaking capacity not less than the prospective fault current at its point of installation, unless back-up protection (cascading) is provided."
  },
  {
    id: 7,
    question: "What ratio of current ratings is generally needed for reliable current grading?",
    options: ["1.1:1", "1.5:1", "2:1 or greater", "10:1"],
    correctAnswer: 2,
    explanation: "A ratio of at least 2:1 between upstream and downstream device ratings is generally needed for reliable current grading, though exact requirements depend on specific device characteristics."
  },
  {
    id: 8,
    question: "What can cause fault levels to increase in an existing installation?",
    options: [
      "Adding more final circuits",
      "Transformer upgrade, parallel operation or on-site generation",
      "Installing more lighting",
      "Replacing MCBs with RCBOs"
    ],
    correctAnswer: 1,
    explanation: "Transformer upgrades, parallel transformer operation, on-site generation and DNO network changes can all increase prospective fault current levels."
  },
  {
    id: 9,
    question: "Which BS 7671 Regulation requires discrimination where it is necessary for safety?",
    options: ["Regulation 411.3", "Regulation 434.5", "Regulation 536.4", "Regulation 612.1"],
    correctAnswer: 2,
    explanation: "Regulation 536.4 requires that where discrimination between protective devices is necessary for safety, the characteristics shall be chosen accordingly."
  },
  {
    id: 10,
    question: "What should a maintenance technician do before replacing a protective device with a different type?",
    options: [
      "Just fit whatever is available",
      "Obtain engineering approval to verify coordination is maintained",
      "Only check the current rating matches",
      "Check the colour matches"
    ],
    correctAnswer: 1,
    explanation: "Engineering approval must be obtained because changing one device can invalidate the entire protection coordination scheme, including discrimination and cascading arrangements."
  },
  {
    id: 11,
    question: "What tool is primarily used to verify discrimination between protective devices?",
    options: [
      "A multimeter",
      "Time-current characteristic curves",
      "An insulation resistance tester",
      "A thermal imaging camera"
    ],
    correctAnswer: 1,
    explanation: "Time-current characteristic curves are plotted for each device and compared to verify that they do not cross within the expected fault current range."
  },
  {
    id: 12,
    question: "What is a typical breaking capacity range for MCCBs?",
    options: ["6 to 10 kA", "10 to 15 kA", "25 to 70 kA", "100 to 150 kA"],
    correctAnswer: 2,
    explanation: "MCCBs typically have breaking capacities ranging from 25 kA to 70 kA, making them suitable for main distribution where fault levels are higher than at final circuit level."
  }
];

const faqs = [
  {
    question: "What is the difference between discrimination and cascading?",
    answer: "Discrimination ensures only the device nearest the fault operates — upstream devices remain closed, maximising availability. Cascading allows both upstream and downstream devices to operate for high-level faults, using the upstream device as back-up protection. Discrimination maximises availability; cascading reduces cost by allowing smaller downstream devices."
  },
  {
    question: "How do I know if discrimination is achieved between two devices?",
    answer: "Check the manufacturer's discrimination tables for tested combinations. Alternatively, compare the time-current characteristic curves — if the curves do not cross within the expected fault current range, discrimination is achieved. Software tools are also available for analysing complex systems with multiple protection levels."
  },
  {
    question: "What happens if a device's breaking capacity is lower than the prospective fault current?",
    answer: "The device may fail to interrupt the fault, resulting in a sustained arc, fire, explosion or destruction of the device. This is a serious safety hazard. Every device must have a breaking capacity equal to or greater than the Ipf at its point of installation, unless a cascading arrangement provides back-up."
  },
  {
    question: "Can fault levels increase over time?",
    answer: "Yes. Transformer upgrades, changes to supply arrangements, addition of on-site generation and DNO network changes can all increase fault levels. If fault levels increase, existing protective devices may become inadequate and the protection coordination may be affected. A fault level study should be conducted whenever supply arrangements change."
  },
  {
    question: "Why is protection coordination particularly important in hospitals and data centres?",
    answer: "In life safety and critical installations, an unnecessarily wide power outage can have severe consequences — affecting operating theatres, intensive care, server rooms or communication systems. Full discrimination ensures that a fault on one circuit does not disrupt supply to other critical circuits, maintaining safety and operational continuity."
  }
];

const MOETModule3Section1_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1">
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
            <span>Module 3.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Substation Layout and Design
          </h1>
          <p className="text-white/80">
            Protection coordination, discrimination, selectivity, cascading and fault level considerations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Discrimination:</strong> Only nearest device trips on fault</li>
              <li className="pl-1"><strong>Time grading:</strong> 0.1-0.3 s intervals between devices</li>
              <li className="pl-1"><strong>Cascading:</strong> Upstream device assists downstream for high faults</li>
              <li className="pl-1"><strong>Breaking capacity:</strong> Must exceed Ipf at point of installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault diagnosis:</strong> Understanding why multiple devices trip</li>
              <li className="pl-1"><strong>Device replacement:</strong> Never change type without approval</li>
              <li className="pl-1"><strong>Fault levels:</strong> Can change with supply modifications</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to fault diagnosis and system awareness KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define discrimination (selectivity) and explain its importance in electrical systems",
              "Describe time grading and current grading techniques for achieving discrimination",
              "Explain the concepts of cascading and back-up protection",
              "Interpret time-current characteristic curves for protective devices",
              "Understand fault level considerations and their effect on protection coordination",
              "Recognise the maintenance implications of protection coordination"
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
            What Is Discrimination (Selectivity)?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Discrimination (also called selectivity) is the coordination of protective devices so that, in the event of a fault, only the device nearest to the fault operates, while all upstream devices remain closed. This limits the extent of supply disruption to the smallest possible section of the installation.
            </p>
            <p>
              Consider a multi-level distribution system: main switchboard, sub-distribution board, then final circuit MCB. If a fault occurs on a final circuit, the final circuit MCB should trip, leaving the sub-distribution board and main switchboard energised. If discrimination fails, the sub-distribution board incomer or even the main switch might trip, causing a much larger outage affecting many circuits and potentially endangering life safety systems.
            </p>
            <p>
              BS 7671 Regulation 536.4 requires that where discrimination between protective devices is necessary for safety, the characteristics of the devices shall be chosen accordingly. In practice, discrimination is desirable for all installations but is essential for safety-critical systems such as hospitals, data centres and life safety circuits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Full vs Partial Discrimination</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Full Discrimination:</strong> The downstream device operates for ALL fault levels up to the maximum prospective fault current (Ipf). The upstream device never trips before the downstream device, regardless of fault current magnitude</li>
                <li className="pl-1"><strong>Partial Discrimination:</strong> The downstream device operates correctly up to a certain fault level (the discrimination limit), above which both devices may trip simultaneously. Partial discrimination is common and often acceptable, provided the discrimination limit exceeds the likely fault current at that point</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> During fault investigation, if multiple devices have tripped, it may indicate a discrimination failure rather than a fault on multiple circuits. Understanding protection coordination helps you diagnose the root cause and identify the actual faulted circuit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Methods of Achieving Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              There are two primary methods of achieving discrimination between protective devices: time grading and current grading. In practice, most protection schemes use a combination of both methods to achieve the best coordination across the full range of fault currents.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Time Grading</h3>
              <p className="text-sm text-white mb-3">
                Time grading achieves discrimination by introducing intentional time delays in upstream devices. The device nearest the fault has the shortest operating time, while each successive upstream device has a progressively longer time delay. The time grading interval is typically 0.1 to 0.3 seconds.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Final circuit MCB trips instantaneously (within 10 ms)</li>
                <li className="pl-1">Sub-distribution MCCB has a 0.2 second short-time delay</li>
                <li className="pl-1">Main ACB has a 0.5 second short-time delay</li>
                <li className="pl-1">Each level has progressively longer delay to ensure downstream clears first</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Current Grading</h3>
              <p className="text-sm text-white mb-3">
                Current grading uses the difference in current ratings between upstream and downstream devices. A fault on a final circuit produces a current within the tripping range of the downstream MCB but below the instantaneous trip threshold of the larger upstream MCCB.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Requires a significant ratio between successive device ratings (minimum 2:1)</li>
                <li className="pl-1">Works best at lower fault levels where current is within the overload region</li>
                <li className="pl-1">At very high fault currents, both devices may enter instantaneous trip region</li>
                <li className="pl-1">Often combined with time grading for comprehensive coordination</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Using Time-Current Curves</h3>
              <p className="text-sm text-white">
                Time-current characteristic curves are the primary tool for verifying discrimination. Each protective device has a characteristic curve showing the relationship between fault current and operating time. For discrimination, the curves of upstream and downstream devices must not cross within the expected fault current range. Manufacturers publish discrimination tables showing tested combinations that achieve full or partial discrimination — these should be used in preference to manual curve comparison where available.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Manufacturers' discrimination tables are the most reliable way to verify coordination between devices from the same manufacturer. When mixing manufacturers, more detailed analysis using time-current curves is required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cascading (Back-Up Protection)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cascading (also called back-up protection) is a technique where a downstream device with a lower breaking capacity is used in conjunction with a higher-rated upstream device. If a fault occurs that exceeds the breaking capacity of the downstream device, the upstream device assists by interrupting the fault current. This allows the use of smaller, less expensive downstream devices.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cascading vs Discrimination Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Discrimination</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cascading</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Which devices trip</td>
                      <td className="border border-white/10 px-3 py-2">Only downstream</td>
                      <td className="border border-white/10 px-3 py-2">Both may trip for high faults</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">System availability</td>
                      <td className="border border-white/10 px-3 py-2">Maximised</td>
                      <td className="border border-white/10 px-3 py-2">Reduced for high-level faults</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Higher (larger downstream devices)</td>
                      <td className="border border-white/10 px-3 py-2">Lower (smaller downstream devices)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Best for</td>
                      <td className="border border-white/10 px-3 py-2">Critical installations</td>
                      <td className="border border-white/10 px-3 py-2">Cost-sensitive installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Maintenance Implications of Cascading</p>
              <p className="text-sm text-white">
                When maintaining an installation with cascading protection, never replace a device with one from a different manufacturer or with different characteristics without verifying the cascading compatibility. The tested cascading combination may only be valid for specific device models and ratings. Changing one device can invalidate the entire protection coordination scheme and create a serious safety hazard.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> In practice, many installations use a combination of discrimination (for lower fault levels) and cascading (for the highest fault levels). Manufacturers provide cascading tables showing tested combinations and the enhanced breaking capacity achieved.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fault Level Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The prospective fault current (Ipf) at any point in an installation depends on the supply impedance (transformer rating and impedance), the cable impedance between the source and the fault point, and the fault type (three-phase, phase-to-neutral, phase-to-earth). Understanding fault levels is essential for ensuring that protective devices are correctly rated.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Breaking Capacity Requirements</h3>
              <p className="text-sm text-white mb-3">
                Every protective device has a rated breaking capacity (Icn for MCBs, Icu or Ics for MCCBs). This is the maximum fault current the device can safely interrupt. If the prospective fault current exceeds the device's rated breaking capacity, the device may fail to interrupt the fault, resulting in an arc, fire or explosion.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Breaking Capacity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Domestic MCBs</td>
                      <td className="border border-white/10 px-3 py-2">6 kA or 10 kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commercial MCBs</td>
                      <td className="border border-white/10 px-3 py-2">10 kA or 15 kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCBs</td>
                      <td className="border border-white/10 px-3 py-2">25 kA to 70 kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ACBs</td>
                      <td className="border border-white/10 px-3 py-2">50 kA to 100 kA or more</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Fault Level Changes</p>
              <p className="text-sm text-white">
                Fault levels are not fixed. They can change due to transformer upgrades (a larger transformer has lower source impedance, increasing fault levels), changes in supply arrangements (parallel transformer operation), addition of on-site generation, and network changes by the DNO. During maintenance, if you become aware of changes to the supply arrangements, the protection coordination should be reviewed by a competent engineer.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Regulation 434.5.1:</strong> BS 7671 requires that every protective device shall have a rated short-circuit breaking capacity not less than the prospective fault current at its point of installation. The only exception is where a back-up device (cascading arrangement) with adequate breaking capacity is installed upstream.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Coordination Studies and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A protection coordination study is a detailed analysis of the entire protection system to verify that discrimination is achieved throughout the installation. It involves plotting the time-current characteristics of all protective devices on a common graph and checking that the curves do not cross at any expected fault level.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When a Coordination Study is Needed</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">New installations or major extensions</li>
                <li className="pl-1">Changes to supply arrangements (transformer upgrades, paralleling)</li>
                <li className="pl-1">Addition of on-site generation or energy storage</li>
                <li className="pl-1">After a major fault event where unexplained tripping occurred</li>
                <li className="pl-1">When protective devices are replaced with different types or makes</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Maintenance Technician Responsibilities</h3>
              <p className="text-sm text-white mb-3">
                As a maintenance technician, your role in protection coordination includes:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Never replace a protective device with one of a different type, rating or make without engineering approval</li>
                <li className="pl-1">Report any unexplained tripping that may indicate discrimination failure</li>
                <li className="pl-1">Record the details of any fault events including which devices operated</li>
                <li className="pl-1">Ensure trip settings on adjustable devices (MCCBs, ACBs) are not altered without authorisation</li>
                <li className="pl-1">Be aware that the protection coordination scheme is a designed system — changing one component affects the entire scheme</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to understand protection principles and recognise when coordination may have been compromised. If you observe unexplained multiple device tripping or are asked to replace a device with a different type, always consult with a design engineer before proceeding.
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
                <p className="font-medium text-white mb-1">Protection Coordination Principles</p>
                <ul className="space-y-0.5">
                  <li>Discrimination — only nearest device trips</li>
                  <li>Time grading — 0.1-0.3 s between levels</li>
                  <li>Current grading — minimum 2:1 ratio</li>
                  <li>Cascading — back-up for high fault levels</li>
                  <li>Breaking capacity must exceed Ipf</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 Reg 434.5.1 — Breaking capacity</li>
                  <li>BS 7671 Reg 536.4 — Discrimination</li>
                  <li>IEC 61439 — Switchgear assemblies</li>
                  <li>Manufacturer discrimination tables</li>
                  <li>ST1426 — Fault diagnosis KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Cable Management
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1">
              Back to Section Hub
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section1_6;
