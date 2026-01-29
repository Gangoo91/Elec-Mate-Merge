import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Protective Device Selection - HNC Module 4 Section 3.2";
const DESCRIPTION = "Master protective device selection for building services: MCBs (Type B/C/D), MCCBs, HRC fuses (BS 88), time-current characteristics, and selection criteria for commercial installations.";

const quickCheckQuestions = [
  {
    id: "mcb-type-b",
    question: "What is the magnetic trip range for a Type B MCB?",
    options: ["2-3 × In", "3-5 × In", "5-10 × In", "10-20 × In"],
    correctIndex: 1,
    explanation: "Type B MCBs trip magnetically (instantaneously) between 3-5 times their rated current (In). This makes them suitable for resistive loads and domestic circuits where inrush currents are low."
  },
  {
    id: "type-c-application",
    question: "Which application is most suitable for a Type C MCB?",
    options: ["Domestic lighting", "Socket outlets", "Motor circuits", "IT equipment"],
    correctIndex: 2,
    explanation: "Type C MCBs (5-10 × In magnetic trip) are suitable for motor circuits, fluorescent lighting with inductive ballasts, and other loads with moderate inrush currents."
  },
  {
    id: "hrc-fuse-advantage",
    question: "What is the main advantage of HRC fuses over MCBs for high fault levels?",
    options: ["Lower cost", "Easier replacement", "Current-limiting capability", "Adjustable settings"],
    correctIndex: 2,
    explanation: "HRC (High Rupturing Capacity) fuses are excellent current-limiting devices. They limit let-through energy (I²t) during faults, protecting downstream equipment and cables better than MCBs."
  },
  {
    id: "mccb-feature",
    question: "What feature distinguishes MCCBs from MCBs?",
    options: ["Thermal operation only", "Adjustable trip settings", "Plug-in design", "Single-pole only"],
    correctIndex: 1,
    explanation: "MCCBs (Moulded Case Circuit Breakers) typically have adjustable thermal (overload) and magnetic (short-circuit) trip settings, allowing configuration for specific applications."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the magnetic trip range for a Type D MCB?",
    options: [
      "3-5 × In",
      "5-10 × In",
      "10-20 × In",
      "20-50 × In"
    ],
    correctAnswer: 2,
    explanation: "Type D MCBs have the highest magnetic trip range of 10-20 × In. They're designed for loads with very high inrush currents such as welding equipment, transformers, and X-ray machines."
  },
  {
    id: 2,
    question: "Which BS standard covers industrial MCBs with higher breaking capacities?",
    options: [
      "BS EN 60898",
      "BS EN 60947-2",
      "BS 88",
      "BS 3036"
    ],
    correctAnswer: 1,
    explanation: "BS EN 60947-2 covers industrial circuit-breakers with breaking capacities typically 10-25kA, compared to BS EN 60898 domestic MCBs at 6-10kA."
  },
  {
    id: 3,
    question: "What does the 'gG' classification mean for HRC fuses?",
    options: [
      "Generator protection",
      "General purpose, full-range breaking capacity",
      "Ground fault protection",
      "Gradual thermal operation"
    ],
    correctAnswer: 1,
    explanation: "gG (general purpose, full-range) fuses provide overload and short-circuit protection across their entire operating range. They're the most common type for general circuit protection."
  },
  {
    id: 4,
    question: "A Type B MCB rated 20A will trip magnetically at currents above:",
    options: [
      "40A (2 × In)",
      "60A (3 × In)",
      "100A (5 × In)",
      "200A (10 × In)"
    ],
    correctAnswer: 2,
    explanation: "Type B MCBs trip magnetically between 3-5 × In. The upper threshold of 5 × 20A = 100A guarantees instantaneous magnetic tripping for fault currents above this value."
  },
  {
    id: 5,
    question: "What is the typical fusing factor for BS EN 60898 MCBs?",
    options: [
      "1.13",
      "1.25",
      "1.45",
      "1.60"
    ],
    correctAnswer: 2,
    explanation: "MCBs to BS EN 60898 have a conventional tripping current of 1.45 × In (fusing factor 1.45). This means they will definitely trip at 1.45 times their rated current within the conventional time."
  },
  {
    id: 6,
    question: "Which fuse type is specifically designed for motor protection?",
    options: [
      "gG fuse",
      "gM fuse",
      "aM fuse",
      "BS 3036 fuse"
    ],
    correctAnswer: 2,
    explanation: "aM (motor, partial-range) fuses are designed specifically for motor circuits. They provide short-circuit protection whilst allowing motor starting currents to pass without operation."
  },
  {
    id: 7,
    question: "What characteristic makes BS 88 HRC fuses 'current-limiting'?",
    options: [
      "They reduce the supply voltage during faults",
      "They clear faults before the current reaches its prospective peak",
      "They limit the number of operations",
      "They restrict current flow during normal operation"
    ],
    correctAnswer: 1,
    explanation: "Current-limiting fuses operate so quickly that they clear the fault in the first half-cycle, before the prospective fault current reaches its peak. This significantly reduces equipment stress and I²t let-through."
  },
  {
    id: 8,
    question: "For discrimination between two MCBs, what is the general current ratio requirement?",
    options: [
      "1.5:1",
      "2:1",
      "3:1",
      "They cannot discriminate reliably"
    ],
    correctAnswer: 1,
    explanation: "MCBs require approximately 2:1 current ratio for reliable discrimination at overload currents. However, for fault currents in the magnetic region, discrimination is often not achievable."
  },
  {
    id: 9,
    question: "What is the primary selection criterion when choosing between Type B and Type C MCBs?",
    options: [
      "Cable size",
      "Breaking capacity required",
      "Expected inrush current of load",
      "Ambient temperature"
    ],
    correctAnswer: 2,
    explanation: "The key selection criterion is the load's inrush current. Type B (3-5 × In) suits resistive loads; Type C (5-10 × In) suits loads with higher inrush like motors and fluorescent lighting."
  },
  {
    id: 10,
    question: "An MCCB is set with Ir = 0.8 and Im = 10. If In = 100A, at what current will magnetic tripping occur?",
    options: [
      "80A",
      "100A",
      "800A",
      "1000A"
    ],
    correctAnswer: 2,
    explanation: "Ir (thermal setting) = 0.8 × 100A = 80A continuous rating. Im (magnetic setting) = 10 × Ir = 10 × 80A = 800A magnetic trip threshold."
  }
];

const faqs = [
  {
    question: "When should I use HRC fuses instead of MCBs?",
    answer: "Use HRC fuses when: the prospective fault current exceeds MCB breaking capacity (>10kA typically); superior current-limiting is needed to protect sensitive equipment; high discrimination ratios are required with downstream MCBs; the installation is close to transformers with very high fault levels. HRC fuses to BS 88 typically have 80kA+ breaking capacity and excellent I²t limitation."
  },
  {
    question: "How do I select between Type B, C, and D MCBs?",
    answer: "Type B (3-5 × In): Resistive loads, domestic lighting, socket circuits - low inrush. Type C (5-10 × In): Small motors, fluorescent lighting with magnetic ballasts, IT equipment - moderate inrush. Type D (10-20 × In): Transformers, welding equipment, X-ray machines, motor starting - high inrush. Always check the actual inrush current of the load doesn't exceed the magnetic threshold."
  },
  {
    question: "What's the difference between Icu and Ics for MCCBs?",
    answer: "Icu (ultimate breaking capacity) is the maximum fault current the MCCB can interrupt, but it may be damaged afterwards. Ics (service breaking capacity) is the fault current level at which the MCCB can interrupt repeatedly without damage, expressed as a percentage of Icu (typically 50%, 75%, or 100%). For critical applications, specify based on Ics to ensure the MCCB remains serviceable after a fault."
  },
  {
    question: "Why are BS 3036 rewirable fuses no longer recommended?",
    answer: "BS 3036 semi-enclosed fuses have several limitations: fusing factor of 2.0 (much higher than 1.45 for MCBs) requiring oversized cables; no current-limiting capability; low breaking capacity (typically 1-4kA); risk of incorrect fuse wire replacement; no trip indication. They're permitted in existing installations but not recommended for new work."
  },
  {
    question: "How do I verify an MCB is suitable for a specific location?",
    answer: "Check: 1) In ≥ Ib (design current); 2) In ≤ Iz (cable capacity after derating); 3) Icn ≥ Ipf (breaking capacity exceeds prospective fault current); 4) Type suits load characteristics (inrush); 5) Zs meets disconnection time requirements from manufacturer's data; 6) Discrimination with upstream device if required."
  },
  {
    question: "What are the advantages of MCCBs over MCBs in commercial installations?",
    answer: "MCCBs offer: higher breaking capacities (25-150kA); adjustable thermal and magnetic settings for precise coordination; draw-out versions for easy maintenance; electronic trip units with comprehensive protection functions (ground fault, phase imbalance); communication capabilities for building management systems; better discrimination with downstream devices. They're essential for main switchboards and sub-distribution."
  }
];

const HNCModule4Section3_2 = () => {
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
            <span>Module 4.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Protective Device Selection
          </h1>
          <p className="text-white/80">
            MCBs, MCCBs, HRC fuses - characteristics, selection criteria, and application guidelines
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Type B MCB:</strong> 3-5 × In - resistive loads, domestic</li>
              <li className="pl-1"><strong>Type C MCB:</strong> 5-10 × In - motors, fluorescent</li>
              <li className="pl-1"><strong>Type D MCB:</strong> 10-20 × In - high inrush loads</li>
              <li className="pl-1"><strong>HRC fuses:</strong> Current-limiting, 80kA+ breaking</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Distribution boards:</strong> MCBs for final circuits</li>
              <li className="pl-1"><strong>Main switchboards:</strong> MCCBs and HRC fuses</li>
              <li className="pl-1"><strong>Motor starters:</strong> aM fuses or Type D MCBs</li>
              <li className="pl-1"><strong>HVAC systems:</strong> Type C for fan motors</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Differentiate between MCB types B, C, and D and their applications",
              "Interpret time-current characteristic curves for protective devices",
              "Select appropriate HRC fuses for high fault level applications",
              "Understand MCCB adjustable settings and their purposes",
              "Apply selection criteria for protective devices in building services",
              "Compare fusing factors and their impact on cable sizing"
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

        {/* Section 1: MCB Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Miniature Circuit Breakers (MCBs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MCBs combine thermal overload protection with magnetic short-circuit protection in a
              compact device. The type designation indicates the magnetic trip characteristic.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB Type Characteristics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Magnetic Trip</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type B</td>
                      <td className="border border-white/10 px-3 py-2">3-5 × In</td>
                      <td className="border border-white/10 px-3 py-2">Resistive loads, lighting, socket outlets, domestic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type C</td>
                      <td className="border border-white/10 px-3 py-2">5-10 × In</td>
                      <td className="border border-white/10 px-3 py-2">Motors, fluorescent lighting, IT equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type D</td>
                      <td className="border border-white/10 px-3 py-2">10-20 × In</td>
                      <td className="border border-white/10 px-3 py-2">Transformers, welding, X-ray, high inrush</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB Operation Principles</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Thermal Element</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Bimetallic strip responds to heating</li>
                    <li className="pl-1">Provides time-delayed overload protection</li>
                    <li className="pl-1">Trips at 1.45 × In (conventional current)</li>
                    <li className="pl-1">Temperature compensated designs available</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Magnetic Element</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Solenoid responds to high currents</li>
                    <li className="pl-1">Provides instantaneous fault protection</li>
                    <li className="pl-1">Trip point depends on MCB type</li>
                    <li className="pl-1">Operates typically within 10ms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB Standards Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Icn</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS EN 60898</td>
                      <td className="border border-white/10 px-3 py-2">6kA, 10kA</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, light commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS EN 60947-2</td>
                      <td className="border border-white/10 px-3 py-2">10kA - 25kA</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, commercial</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> Always verify the MCB breaking capacity exceeds the prospective fault current at the installation point.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: MCCBs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Moulded Case Circuit Breakers (MCCBs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MCCBs are used for higher current ratings and fault levels than MCBs. They offer
              adjustable settings and are essential for main distribution and sub-distribution boards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCCB Adjustable Settings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Setting</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal (overload)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Ir</td>
                      <td className="border border-white/10 px-3 py-2">0.4-1.0 × In</td>
                      <td className="border border-white/10 px-3 py-2">Sets continuous current rating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Magnetic (short-circuit)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Im</td>
                      <td className="border border-white/10 px-3 py-2">5-10 × Ir</td>
                      <td className="border border-white/10 px-3 py-2">Sets instantaneous trip level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Short-time delay</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Isd</td>
                      <td className="border border-white/10 px-3 py-2">2-10 × Ir</td>
                      <td className="border border-white/10 px-3 py-2">Allows downstream discrimination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ground fault</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Ig</td>
                      <td className="border border-white/10 px-3 py-2">0.2-1.0 × In</td>
                      <td className="border border-white/10 px-3 py-2">Earth fault protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCCB Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher breaking capacities (25-150kA)</li>
                  <li className="pl-1">Adjustable trip settings</li>
                  <li className="pl-1">Draw-out versions for maintenance</li>
                  <li className="pl-1">Electronic trip units available</li>
                  <li className="pl-1">Remote communication capability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Applications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Main incoming devices (100-3200A)</li>
                  <li className="pl-1">Sub-main distribution</li>
                  <li className="pl-1">Motor control centres</li>
                  <li className="pl-1">Generator connections</li>
                  <li className="pl-1">Busbar trunking feeds</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Breaking Capacity Ratings</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Icu:</strong> Ultimate breaking capacity - maximum fault current, may damage MCCB</li>
                <li className="pl-1"><strong>Ics:</strong> Service breaking capacity - fault current allowing continued service</li>
                <li className="pl-1"><strong>Icw:</strong> Short-time withstand - current that can be carried for a specified time</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> For critical applications, base selection on Ics not Icu to ensure the MCCB remains serviceable after clearing a fault.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 3: HRC Fuses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            HRC Fuses (BS 88)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              High Rupturing Capacity fuses to BS 88 are the preferred protection for high fault level
              locations. They provide excellent current-limiting capability and very high breaking capacities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HRC Fuse Classifications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">gG</td>
                      <td className="border border-white/10 px-3 py-2">General purpose, full-range</td>
                      <td className="border border-white/10 px-3 py-2">Cable protection, general circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">gM</td>
                      <td className="border border-white/10 px-3 py-2">Motor circuit, full-range</td>
                      <td className="border border-white/10 px-3 py-2">Motor circuits with overload relay</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">aM</td>
                      <td className="border border-white/10 px-3 py-2">Motor circuit, partial-range</td>
                      <td className="border border-white/10 px-3 py-2">Motor short-circuit only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">gR</td>
                      <td className="border border-white/10 px-3 py-2">Semiconductor protection</td>
                      <td className="border border-white/10 px-3 py-2">Rectifiers, VSDs, UPS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current-Limiting Operation</p>
              <p className="text-sm text-white/90 mb-3">
                HRC fuses are excellent current-limiting devices. During a fault, the fuse element melts
                and an arc forms within the silica sand filling. This arc rapidly increases resistance,
                limiting the fault current before it reaches its prospective peak.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cut-off current:</strong> Peak let-through current during fault</li>
                <li className="pl-1"><strong>I²t value:</strong> Energy let-through (pre-arcing + arcing)</li>
                <li className="pl-1"><strong>Sub-cycle clearance:</strong> Typically &lt;5ms for high faults</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 88 Fuse Sizes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Breaking Capacity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">000 (Tag)</td>
                      <td className="border border-white/10 px-3 py-2">2A - 100A</td>
                      <td className="border border-white/10 px-3 py-2">80kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">00</td>
                      <td className="border border-white/10 px-3 py-2">6A - 160A</td>
                      <td className="border border-white/10 px-3 py-2">80kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">63A - 250A</td>
                      <td className="border border-white/10 px-3 py-2">80kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">125A - 400A</td>
                      <td className="border border-white/10 px-3 py-2">80kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">315A - 630A</td>
                      <td className="border border-white/10 px-3 py-2">80kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">500A - 1250A</td>
                      <td className="border border-white/10 px-3 py-2">80kA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key advantage:</strong> HRC fuses provide excellent discrimination with downstream MCBs due to their different time-current characteristics.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Selection Criteria */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Selection Criteria and Time-Current Curves
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Protective device selection requires consideration of multiple factors. Time-current
              characteristic curves are essential tools for verifying protection and discrimination.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Checklist</p>
              <div className="p-4 rounded-lg bg-white/5">
                <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                  <li className="pl-1"><strong>Current rating:</strong> In ≥ Ib and In ≤ Iz (after derating factors)</li>
                  <li className="pl-1"><strong>Breaking capacity:</strong> Icn ≥ Ipf at installation point</li>
                  <li className="pl-1"><strong>Type/characteristics:</strong> Appropriate for load inrush current</li>
                  <li className="pl-1"><strong>Disconnection time:</strong> Zs meets requirements for device type</li>
                  <li className="pl-1"><strong>Discrimination:</strong> Coordinates with upstream/downstream devices</li>
                  <li className="pl-1"><strong>Number of poles:</strong> Appropriate for circuit configuration</li>
                </ol>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reading Time-Current Curves</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>X-axis:</strong> Current (usually as multiple of In or absolute amps)</li>
                <li className="pl-1"><strong>Y-axis:</strong> Operating time (logarithmic scale, seconds)</li>
                <li className="pl-1"><strong>Thermal region:</strong> Sloping curve showing inverse-time characteristic</li>
                <li className="pl-1"><strong>Magnetic region:</strong> Vertical drop showing instantaneous operation</li>
                <li className="pl-1"><strong>Tolerance bands:</strong> Upper and lower limits of operation</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fusing Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>MCB (BS EN 60898):</strong> 1.45</li>
                  <li className="pl-1"><strong>HRC fuse (BS 88):</strong> 1.6</li>
                  <li className="pl-1"><strong>BS 3036 rewirable:</strong> 2.0</li>
                </ul>
                <p className="text-xs text-white/70 mt-2">
                  Higher fusing factor = larger cable required for same device rating
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Impact on Cable Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">MCB: Iz ≥ In (factor 1.45 built in)</li>
                  <li className="pl-1">BS 88: Iz ≥ In × 1.1 typically</li>
                  <li className="pl-1">BS 3036: Iz ≥ In × 1.38</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Applications Summary</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting (LED/resistive)</td>
                      <td className="border border-white/10 px-3 py-2">Type B MCB</td>
                      <td className="border border-white/10 px-3 py-2">Low inrush, good Zs sensitivity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlets</td>
                      <td className="border border-white/10 px-3 py-2">Type B MCB + RCD</td>
                      <td className="border border-white/10 px-3 py-2">Mixed loads, additional protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small AC motors</td>
                      <td className="border border-white/10 px-3 py-2">Type C MCB</td>
                      <td className="border border-white/10 px-3 py-2">6-8× starting current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large motors</td>
                      <td className="border border-white/10 px-3 py-2">aM fuse + contactor + OL</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated motor protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main switchboard</td>
                      <td className="border border-white/10 px-3 py-2">MCCB or HRC fuse</td>
                      <td className="border border-white/10 px-3 py-2">High fault level, adjustability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer secondary</td>
                      <td className="border border-white/10 px-3 py-2">HRC fuse</td>
                      <td className="border border-white/10 px-3 py-2">Highest fault level point</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Best practice:</strong> Always obtain manufacturer's time-current data and verify discrimination using overlaid curves or manufacturer's selectivity tables.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: MCB Type Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 3kW three-phase motor (400V, 0.85 pf) has a starting current of 6× FLC. Select the appropriate MCB type.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Full load current: I = P/(√3 × V × pf)</p>
                <p>I = 3000/(1.732 × 400 × 0.85) = <strong>5.1A</strong></p>
                <p className="mt-2">Starting current = 6 × 5.1A = <strong>30.6A</strong></p>
                <p className="mt-2">MCB rating: select 6A (next standard above 5.1A)</p>
                <p className="mt-2">Type B (3-5×In): trips at 18-30A</p>
                <p className="text-red-400">✗ May trip on start (30.6A)</p>
                <p className="mt-2">Type C (5-10×In): trips at 30-60A</p>
                <p className="text-green-400">✓ Will allow 30.6A start current</p>
                <p className="mt-2 text-white/60">→ Select 6A Type C MCB</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: MCCB Settings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An MCCB with In = 250A protects a busbar feeding several final circuits. The cable Iz is 270A and normal load is 180A. Calculate appropriate settings.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Frame size: In = 250A</p>
                <p className="mt-2">Thermal setting (Ir):</p>
                <p>Must be ≥ design current (180A)</p>
                <p>Must be ≤ cable Iz (270A)</p>
                <p>Set Ir = 0.8 × 250A = <strong>200A</strong></p>
                <p className="mt-2">Magnetic setting (Im):</p>
                <p>Typical range: 5-10 × Ir</p>
                <p>Set Im = 8 × Ir = 8 × 200A = <strong>1600A</strong></p>
                <p className="mt-2 text-green-400">✓ 180A ≤ 200A ≤ 270A - valid coordination</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: HRC Fuse vs MCB Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A sub-distribution board is located 5m from a 500kVA transformer. Ipf = 25kA. Which device is appropriate?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Prospective fault current: Ipf = <strong>25kA</strong></p>
                <p className="mt-2">MCB options:</p>
                <p>BS EN 60898: Max 10kA <span className="text-red-400">✗ Inadequate</span></p>
                <p>BS EN 60947-2: Max 25kA <span className="text-yellow-400">⚠ Marginal</span></p>
                <p className="mt-2">HRC fuse (BS 88): 80kA <span className="text-green-400">✓ Adequate</span></p>
                <p className="mt-2 text-white/60">→ HRC fuse-switch recommended for incomer</p>
                <p className="text-white/60">→ MCB outgoing circuits OK (reduced Ipf)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Device Selection Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Type B MCB:</strong> Default for domestic/resistive - 3-5 × In</li>
                <li className="pl-1"><strong>Type C MCB:</strong> Motors, fluorescent, IT - 5-10 × In</li>
                <li className="pl-1"><strong>Type D MCB:</strong> Transformers, welding - 10-20 × In</li>
                <li className="pl-1"><strong>MCCB:</strong> Main distribution, adjustable settings</li>
                <li className="pl-1"><strong>HRC fuse:</strong> High fault levels, current-limiting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">MCB fusing factor: <strong>1.45</strong></li>
                <li className="pl-1">HRC fusing factor: <strong>1.6</strong></li>
                <li className="pl-1">BS 3036 fusing factor: <strong>2.0</strong></li>
                <li className="pl-1">BS EN 60898 MCB breaking: <strong>6-10kA</strong></li>
                <li className="pl-1">BS 88 HRC breaking: <strong>80kA+</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong MCB type for load</strong> — Type B may nuisance trip on motor start</li>
                <li className="pl-1"><strong>Ignoring fault level</strong> — Always verify breaking capacity</li>
                <li className="pl-1"><strong>Forgetting fusing factors</strong> — Affects cable sizing calculation</li>
                <li className="pl-1"><strong>Not checking discrimination</strong> — May cause unnecessary outages</li>
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
                <p className="font-medium text-white mb-1">MCB Types</p>
                <ul className="space-y-0.5">
                  <li>Type B: 3-5 × In - resistive loads</li>
                  <li>Type C: 5-10 × In - motors, IT</li>
                  <li>Type D: 10-20 × In - high inrush</li>
                  <li>All: 1.45 × In conventional trip</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">HRC Fuses (BS 88)</p>
                <ul className="space-y-0.5">
                  <li>gG: General purpose, full-range</li>
                  <li>aM: Motor, partial-range (SC only)</li>
                  <li>Breaking capacity: 80kA+</li>
                  <li>Current-limiting operation</li>
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
            <Link to="../h-n-c-module4-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Circuit Protection Principles
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section3-3">
              Next: Fault Current Calculations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section3_2;
