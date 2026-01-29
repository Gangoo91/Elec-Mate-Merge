import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Discrimination and Coordination - HNC Module 4 Section 3.4";
const DESCRIPTION = "Master protection discrimination and coordination for building services: time discrimination, current discrimination, energy let-through, cascade coordination, and selectivity tables.";

const quickCheckQuestions = [
  {
    id: "discrimination-purpose",
    question: "What is the primary purpose of discrimination (selectivity) between protective devices?",
    options: ["To reduce installation costs", "To ensure only the device nearest the fault operates", "To increase fault current levels", "To allow higher cable ratings"],
    correctIndex: 1,
    explanation: "Discrimination ensures only the protective device immediately upstream of a fault operates, leaving the rest of the installation energised. This minimises disruption and aids fault location."
  },
  {
    id: "time-discrimination",
    question: "For time discrimination to work, the upstream device must have:",
    options: ["Lower current rating", "Shorter operating time", "Longer operating time", "Same characteristics"],
    correctIndex: 2,
    explanation: "Time discrimination requires the upstream (supply-side) device to have a longer operating time than the downstream device, allowing the downstream device to clear the fault first."
  },
  {
    id: "current-discrimination",
    question: "Current discrimination relies on the fact that:",
    options: ["All devices have the same rating", "Fault current is higher at the origin than downstream", "Cables limit current equally throughout", "RCDs provide current limiting"],
    correctIndex: 1,
    explanation: "Current discrimination uses the natural reduction in fault current along cable runs. The upstream device sees lower fault current and doesn't reach its instantaneous trip threshold."
  },
  {
    id: "cascade-backup",
    question: "What is cascade (back-up) protection?",
    options: ["Devices operate in sequence", "Upstream device assists downstream device in fault clearance", "Multiple RCDs in series", "Time-delayed tripping"],
    correctIndex: 1,
    explanation: "Cascade protection allows an upstream device with higher breaking capacity to assist a downstream device in clearing faults that exceed the downstream device's breaking capacity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical time discrimination ratio required between MCBs in series?",
    options: [
      "No discrimination possible",
      "1.5:1",
      "2:1",
      "3:1"
    ],
    correctAnswer: 0,
    explanation: "Standard MCBs typically cannot achieve reliable discrimination in the magnetic (instantaneous) region due to similar operating times. This is why fuse-MCB or MCCB-MCB combinations are preferred."
  },
  {
    id: 2,
    question: "When using BS 88 fuses for discrimination, what current ratio is typically required?",
    options: [
      "1.2:1",
      "1.6:1",
      "2:1",
      "3:1"
    ],
    correctAnswer: 2,
    explanation: "BS 88 fuses typically achieve discrimination at a 2:1 current ratio across most of their operating range. This makes them excellent for distribution system discrimination."
  },
  {
    id: 3,
    question: "What does I²t represent in protective device coordination?",
    options: [
      "Device rating squared",
      "Energy let-through during fault clearance",
      "Installation test current",
      "Inrush current multiplier"
    ],
    correctAnswer: 1,
    explanation: "I²t (I-squared-t) represents the energy let-through during fault clearance. For discrimination, the downstream device must clear the fault with lower I²t than the upstream device's withstand capability."
  },
  {
    id: 4,
    question: "Partial discrimination means:",
    options: [
      "Discrimination only works at low currents",
      "Only some devices discriminate",
      "Discrimination is achieved up to a specific fault level only",
      "Half the devices trip on any fault"
    ],
    correctAnswer: 2,
    explanation: "Partial discrimination occurs when devices discriminate up to a specific current level. Above this limit, both devices may operate. Full discrimination means discrimination at all fault levels."
  },
  {
    id: 5,
    question: "Which device combination typically provides the best discrimination?",
    options: [
      "MCB - MCB",
      "MCCB - MCCB",
      "HRC fuse - MCB",
      "RCD - RCD"
    ],
    correctAnswer: 2,
    explanation: "HRC fuse upstream with MCB downstream provides excellent discrimination. The fuse's different time-current characteristic and current-limiting ability allows reliable selectivity."
  },
  {
    id: 6,
    question: "In a distribution system, where is discrimination most critical?",
    options: [
      "At final circuits only",
      "Between the incomer and first distribution tier",
      "At socket outlets",
      "At lighting circuits"
    ],
    correctAnswer: 1,
    explanation: "Discrimination is most critical at the main incomer level, where a fault causing the main device to trip would affect the entire installation. Loss of discrimination here has maximum impact."
  },
  {
    id: 7,
    question: "What information do manufacturers' selectivity tables provide?",
    options: [
      "Cable sizing data",
      "Combinations of devices that achieve discrimination and to what fault level",
      "RCD test intervals",
      "Voltage drop calculations"
    ],
    correctAnswer: 1,
    explanation: "Selectivity (coordination) tables show which device combinations achieve discrimination and specify the maximum fault current for which discrimination is guaranteed."
  },
  {
    id: 8,
    question: "An MCCB with short-time delay (STD) setting achieves discrimination by:",
    options: [
      "Reducing its breaking capacity",
      "Increasing its current rating",
      "Intentionally delaying operation to allow downstream devices to clear first",
      "Operating faster than downstream devices"
    ],
    correctAnswer: 2,
    explanation: "Short-time delay deliberately delays the MCCB's operation (typically 100-500ms) allowing downstream devices time to clear faults within their zones before the MCCB operates."
  },
  {
    id: 9,
    question: "Zone selective interlocking (ZSI) improves discrimination by:",
    options: [
      "Reducing fault current",
      "Using communication between devices to identify fault location",
      "Increasing cable sizes",
      "Adding more protective devices"
    ],
    correctAnswer: 1,
    explanation: "ZSI uses communication (typically hardwired) between devices. If a downstream device detects a fault, it signals the upstream device to delay. If no signal is received, the upstream device trips instantly."
  },
  {
    id: 10,
    question: "For cascade protection to be valid, what must be verified?",
    options: [
      "Cable lengths are equal",
      "Both devices have same manufacturer",
      "Combined let-through energy doesn't exceed downstream cable withstand",
      "Devices have matching current ratings"
    ],
    correctAnswer: 2,
    explanation: "Cascade protection is only valid if the combined let-through energy (I²t) of both devices operating together doesn't exceed the thermal withstand (k²S²) of the downstream cable."
  }
];

const faqs = [
  {
    question: "What's the difference between discrimination and cascade protection?",
    answer: "Discrimination (selectivity) ensures only the device nearest the fault operates - the upstream device should not operate at all. Cascade (back-up) protection deliberately uses the upstream device to assist fault clearance when the downstream device's breaking capacity is insufficient. With cascade, both devices may operate together but safely clear the fault."
  },
  {
    question: "Why can't two MCBs in series achieve reliable discrimination?",
    answer: "Standard MCBs have very similar magnetic trip characteristics (operating within milliseconds at high fault currents). Both devices 'see' the same fault current and operate almost simultaneously. The small manufacturing tolerance differences mean neither consistently operates first. For reliable discrimination, different device types (e.g., HRC fuse upstream) or MCCB with time delay are needed."
  },
  {
    question: "How do I use manufacturer selectivity tables?",
    answer: "Selectivity tables show the maximum fault current (in kA) for which discrimination is achieved between specific device combinations. Find the upstream device in rows and downstream device in columns. The table value indicates the discrimination limit. Values marked 'T' indicate total (full) discrimination at all fault levels. Values below the installation's prospective fault current confirm adequate discrimination."
  },
  {
    question: "When is partial discrimination acceptable?",
    answer: "Partial discrimination may be acceptable for non-critical circuits where occasional wider tripping is tolerable. However, for critical systems (hospitals, data centres, continuous processes), full discrimination at the maximum prospective fault current is required. Building services engineers should assess the consequences of discrimination failure for each application."
  },
  {
    question: "What is the benefit of HRC fuses for discrimination?",
    answer: "HRC fuses have excellent discrimination properties: they follow a consistent inverse-time characteristic across their range; they achieve reliable 2:1 ratio discrimination; their current-limiting action reduces let-through energy; they have very high breaking capacity (80kA+); and they discriminate well with downstream MCBs. However, they require replacement after operation and don't indicate trip cause."
  },
  {
    question: "How does energy let-through (I²t) relate to discrimination?",
    answer: "For the upstream device not to operate, the downstream device must clear the fault with less energy (I²t) than would cause the upstream device to operate. Manufacturers provide I²t values for comparison. Additionally, the let-through I²t must not exceed the cable's thermal withstand (k²S²). Current-limiting devices like HRC fuses have very low let-through I²t, aiding discrimination."
  }
];

const HNCModule4Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Discrimination and Coordination
          </h1>
          <p className="text-white/80">
            Achieving selective protection to minimise disruption and maintain supply continuity
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Discrimination:</strong> Only device nearest fault operates</li>
              <li className="pl-1"><strong>Time-based:</strong> Upstream delays longer than downstream</li>
              <li className="pl-1"><strong>Current-based:</strong> Uses fault current reduction along cables</li>
              <li className="pl-1"><strong>Cascade:</strong> Upstream assists downstream in clearing faults</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Main switchboard:</strong> Critical discrimination point</li>
              <li className="pl-1"><strong>Sub-distribution:</strong> Partial discrimination may suffice</li>
              <li className="pl-1"><strong>Critical loads:</strong> Full discrimination required</li>
              <li className="pl-1"><strong>HRC fuse/MCB:</strong> Preferred combination</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the importance of discrimination in building services",
              "Apply time and current discrimination principles",
              "Use manufacturers' selectivity tables for device coordination",
              "Understand cascade (back-up) protection and its applications",
              "Calculate energy let-through for cable protection verification",
              "Specify devices for full or partial discrimination"
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

        {/* Section 1: Discrimination Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Discrimination Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Discrimination (or selectivity) ensures that when a fault occurs, only the protective
              device immediately upstream of the fault operates. This maintains supply to unaffected
              circuits and minimises disruption.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Good Discrimination</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Minimises extent of supply interruption during faults</li>
                <li className="pl-1">Aids rapid fault location (affected circuit is obvious)</li>
                <li className="pl-1">Maintains supply to critical loads during downstream faults</li>
                <li className="pl-1">Reduces system restoration time after faults</li>
                <li className="pl-1">Required for essential services (hospitals, data centres)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Discrimination</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Full (Total) Discrimination</p>
                  <p className="text-sm text-white/90">
                    The downstream device always operates before the upstream device, regardless of fault current level up to the system maximum.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Partial Discrimination</p>
                  <p className="text-sm text-white/90">
                    Discrimination achieved up to a specific fault current level. Above this, both devices may operate together.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Study Hierarchy</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Devices</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Discrimination Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Utility incomer</td>
                      <td className="border border-white/10 px-3 py-2">DNO fuse/ACB</td>
                      <td className="border border-white/10 px-3 py-2">Critical - affects entire supply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main switchboard</td>
                      <td className="border border-white/10 px-3 py-2">MCCB/ACB</td>
                      <td className="border border-white/10 px-3 py-2">High - affects building section</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sub-distribution</td>
                      <td className="border border-white/10 px-3 py-2">MCCB/HRC</td>
                      <td className="border border-white/10 px-3 py-2">Medium - affects floor/zone</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final circuits</td>
                      <td className="border border-white/10 px-3 py-2">MCB/RCBO</td>
                      <td className="border border-white/10 px-3 py-2">Lower - single circuit only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Invest most discrimination effort at higher levels where fault impact is greatest.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Time Discrimination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Time Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Time discrimination relies on the upstream device having a longer operating time than
              the downstream device at the same fault current. The downstream device clears the fault
              before the upstream device has time to operate.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Time Discrimination Requirement</p>
              <p className="font-mono text-center text-lg mb-2">t<sub>upstream</sub> &gt; t<sub>downstream</sub> + Δt</p>
              <p className="text-xs text-white/70 text-center">Where Δt is a margin for tolerance (typically 50-100ms)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Achieving Time Discrimination</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Device Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inherent time grading</td>
                      <td className="border border-white/10 px-3 py-2">HRC fuses (2:1 ratio)</td>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Short-time delay (STD)</td>
                      <td className="border border-white/10 px-3 py-2">MCCBs, ACBs</td>
                      <td className="border border-white/10 px-3 py-2">Main switchboards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zone selective interlock</td>
                      <td className="border border-white/10 px-3 py-2">Electronic trip MCCBs</td>
                      <td className="border border-white/10 px-3 py-2">Critical systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Different characteristics</td>
                      <td className="border border-white/10 px-3 py-2">Fuse + MCB combination</td>
                      <td className="border border-white/10 px-3 py-2">Sub-distribution to finals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCCB Time Settings</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Instantaneous (I):</strong> No intentional delay</li>
                  <li className="pl-1"><strong>Short-time (S):</strong> 50-500ms delay</li>
                  <li className="pl-1"><strong>Long-time (L):</strong> Overload timing</li>
                  <li className="pl-1"><strong>Ground (G):</strong> Earth fault timing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Time Steps</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Final circuit MCB: instantaneous</li>
                  <li className="pl-1">Sub-board MCCB: 100ms</li>
                  <li className="pl-1">Main board MCCB: 200ms</li>
                  <li className="pl-1">Incomer: 300-500ms</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Caution:</strong> Time delays allow fault current to flow longer, requiring equipment to withstand the thermal stress. Verify Icw (short-time withstand) rating of MCCBs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Current Discrimination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Current Discrimination and Energy Let-Through
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current discrimination exploits the natural reduction in fault current along cable runs.
              The upstream device is set to operate at a current higher than the maximum fault current
              downstream.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Discrimination Principle</p>
              <div className="p-4 rounded-lg bg-white/5">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fault current is highest at the supply source</li>
                  <li className="pl-1">Cable impedance reduces fault current along the run</li>
                  <li className="pl-1">Downstream fault current may be below upstream instantaneous setting</li>
                  <li className="pl-1">Upstream device operates on thermal characteristic (slower)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: Current Discrimination</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Main board MCCB: 100A, Im = 10 × Ir = 800A</p>
                <p>Sub-board after 30m 35mm² cable:</p>
                <p className="mt-2">Ipf at sub-board = 5kA</p>
                <p>Sub-board MCB: 32A Type C (Im at 320A)</p>
                <p className="mt-2">Final circuit fault at end: 400A</p>
                <p className="mt-2">MCB operates magnetically at 400A (instant)</p>
                <p>MCCB sees 400A - below 800A threshold</p>
                <p className="text-green-400">✓ MCCB stays closed - discrimination achieved</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Let-Through (I²t)</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  I²t represents the energy passing through a device during fault clearance. For discrimination,
                  the downstream device must clear with lower I²t than the upstream device's let-through threshold.
                </p>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                        <th className="border border-white/10 px-3 py-2 text-left">I²t (A²s)</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">32A MCB Type B</td>
                        <td className="border border-white/10 px-3 py-2">15,000</td>
                        <td className="border border-white/10 px-3 py-2">Let-through at 6kA fault</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">63A BS 88 fuse</td>
                        <td className="border border-white/10 px-3 py-2">35,000</td>
                        <td className="border border-white/10 px-3 py-2">Prearcing at 6kA fault</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">100A MCCB</td>
                        <td className="border border-white/10 px-3 py-2">80,000</td>
                        <td className="border border-white/10 px-3 py-2">Withstand capability</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> For cable protection, the device I²t let-through must not exceed the cable's thermal withstand: I²t ≤ k²S².
            </p>
          </div>
        </section>

        {/* Section 4: Cascade Protection and Selectivity Tables */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cascade Protection and Selectivity Tables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cascade (back-up) protection allows a downstream device with lower breaking capacity
              to be used where the prospective fault current exceeds its rating, provided an upstream
              device with adequate capacity assists in fault clearance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cascade Protection Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Upstream device must have adequate breaking capacity for maximum Ipf</li>
                <li className="pl-1">Combined let-through I²t must not exceed downstream cable k²S²</li>
                <li className="pl-1">Manufacturer must confirm the cascade combination is valid</li>
                <li className="pl-1">Both devices may operate - coordination, not discrimination</li>
                <li className="pl-1">Devices should be from same manufacturer for validated combinations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reading Selectivity Tables</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Table Entry</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">T</td>
                      <td className="border border-white/10 px-3 py-2">Total discrimination at all fault levels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">15</td>
                      <td className="border border-white/10 px-3 py-2">Discrimination up to 15kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">—</td>
                      <td className="border border-white/10 px-3 py-2">No discrimination / not tested</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">P</td>
                      <td className="border border-white/10 px-3 py-2">Partial discrimination (see notes)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Selectivity Table (Simplified)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Upstream</th>
                      <th className="border border-white/10 px-3 py-2 text-center">16A Type B</th>
                      <th className="border border-white/10 px-3 py-2 text-center">32A Type B</th>
                      <th className="border border-white/10 px-3 py-2 text-center">32A Type C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100A HRC</td>
                      <td className="border border-white/10 px-3 py-2 text-center">T</td>
                      <td className="border border-white/10 px-3 py-2 text-center">T</td>
                      <td className="border border-white/10 px-3 py-2 text-center">T</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">63A HRC</td>
                      <td className="border border-white/10 px-3 py-2 text-center">T</td>
                      <td className="border border-white/10 px-3 py-2 text-center">15kA</td>
                      <td className="border border-white/10 px-3 py-2 text-center">10kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">40A MCB</td>
                      <td className="border border-white/10 px-3 py-2 text-center">3kA</td>
                      <td className="border border-white/10 px-3 py-2 text-center">—</td>
                      <td className="border border-white/10 px-3 py-2 text-center">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/70 mt-2">Example only - always use actual manufacturer data</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Device Combinations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>HRC fuse → MCB:</strong> Excellent discrimination, 2:1 ratio typically sufficient</li>
                <li className="pl-1"><strong>MCCB (STD) → MCB:</strong> Good discrimination with time delay setting</li>
                <li className="pl-1"><strong>ACB → MCCB → MCB:</strong> Multi-tier with progressive time settings</li>
                <li className="pl-1"><strong>MCB → MCB:</strong> Poor discrimination in magnetic region, avoid</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design note:</strong> Always verify discrimination using manufacturer's specific tables for the actual devices specified. Generic guidance may not apply to all combinations.
            </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Discrimination Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 100A BS 88 fuse protects a sub-board with 32A Type B MCBs. Ipf at sub-board is 8kA. Verify discrimination.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>From manufacturer selectivity table:</p>
                <p>100A HRC vs 32A Type B = <strong>"T" (Total)</strong></p>
                <p className="mt-2">This means full discrimination at all fault levels</p>
                <p className="mt-2">Verify Ipf (8kA) is within device ratings:</p>
                <p>- 100A HRC: 80kA breaking <span className="text-green-400">✓</span></p>
                <p>- 32A MCB: 6kA (with cascade from fuse) <span className="text-green-400">✓</span></p>
                <p className="mt-2 text-green-400">✓ Full discrimination achieved</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Time Discrimination Setting</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Set time discrimination between main MCCB (400A) and sub-board MCCB (100A). Sub-board MCBs operate instantaneously.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Final circuit MCBs: Instantaneous (~10ms)</p>
                <p className="mt-2">Sub-board 100A MCCB settings:</p>
                <p>- STD = 100ms (allows MCBs to clear first)</p>
                <p>- Im = 10 × Ir (magnetic threshold)</p>
                <p className="mt-2">Main 400A MCCB settings:</p>
                <p>- STD = 250ms (allows sub-board to clear)</p>
                <p>- Im = 8 × Ir</p>
                <p className="mt-2">Time margin: 250 - 100 = 150ms</p>
                <p className="text-green-400">✓ Adequate margin for tolerance</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Cascade Back-up Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 6kA MCB is used where Ipf = 10kA. Verify cascade protection with 80A HRC fuse upstream. Cable is 4mm² PVC/copper.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Check cascade table: 80A HRC + 32A MCB at 10kA</p>
                <p>Combined I²t let-through = <strong>25,000 A²s</strong></p>
                <p className="mt-2">Cable thermal withstand:</p>
                <p>k²S² = 115² × 4² = 13225 × 16 = <strong>211,600 A²s</strong></p>
                <p className="mt-2">25,000 &lt; 211,600 <span className="text-green-400">✓</span></p>
                <p className="mt-2 text-green-400">✓ Cascade protection valid</p>
                <p className="text-white/60">Cable protected from thermal damage</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Design Steps</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Calculate Ipf at all distribution levels</li>
                <li className="pl-1"><strong>Step 2:</strong> Select device types (fuse, MCB, MCCB)</li>
                <li className="pl-1"><strong>Step 3:</strong> Check manufacturer selectivity tables</li>
                <li className="pl-1"><strong>Step 4:</strong> Verify discrimination limit exceeds Ipf</li>
                <li className="pl-1"><strong>Step 5:</strong> Confirm cable thermal withstand if using cascade</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">HRC fuse ratio: <strong>2:1</strong> for discrimination</li>
                <li className="pl-1">Time margin: <strong>≥50ms</strong> between levels</li>
                <li className="pl-1">MCB-MCB: <strong>No reliable discrimination</strong> (magnetic region)</li>
                <li className="pl-1">MCCB STD typical: <strong>100-500ms</strong></li>
                <li className="pl-1">Cable thermal: <strong>I²t ≤ k²S²</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assuming MCBs discriminate</strong> — They don't in magnetic region</li>
                <li className="pl-1"><strong>Ignoring fault level changes</strong> — Check at each board location</li>
                <li className="pl-1"><strong>Using generic tables</strong> — Use specific manufacturer data</li>
                <li className="pl-1"><strong>Forgetting Icw</strong> — MCCB must withstand fault during STD</li>
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
                <p className="font-medium text-white mb-1">Discrimination Methods</p>
                <ul className="space-y-0.5">
                  <li>Time: upstream delays longer</li>
                  <li>Current: fault drops along cables</li>
                  <li>Energy: downstream I²t lower</li>
                  <li>ZSI: communication between devices</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Best Combinations</p>
                <ul className="space-y-0.5">
                  <li>HRC → MCB: excellent (2:1 ratio)</li>
                  <li>MCCB (STD) → MCB: good</li>
                  <li>MCB → MCB: poor (avoid)</li>
                  <li>ACB → MCCB → MCB: tiered</li>
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
            <Link to="../h-n-c-module4-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fault Current Calculations
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section3-5">
              Next: Earth Fault Protection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section3_4;
