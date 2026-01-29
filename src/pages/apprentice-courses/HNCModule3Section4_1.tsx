import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Star and Delta Configurations - HNC Module 3 Section 4.1";
const DESCRIPTION = "Master star (Y) and delta (D) three-phase configurations for building services: winding connections, voltage relationships, motor starting methods and transformer applications.";

const quickCheckQuestions = [
  {
    id: "star-neutral",
    question: "In a star-connected system, where is the neutral point located?",
    options: ["At each load terminal", "At the junction of all three phase windings", "Between any two phases", "At the supply transformer only"],
    correctIndex: 1,
    explanation: "In star connection, all three phase windings connect at a common junction point - this is the star point or neutral point. It provides the reference for phase voltages and allows the 4-wire distribution system."
  },
  {
    id: "delta-wires",
    question: "How many conductors are used in a delta-connected three-phase system?",
    options: ["2 wires", "3 wires", "4 wires", "5 wires"],
    correctIndex: 1,
    explanation: "Delta connection has no neutral point, so only 3 line conductors are required. This makes delta suitable for balanced three-phase loads like motors, but not for single-phase loads."
  },
  {
    id: "line-phase-voltage",
    question: "In a star-connected system with 400V line voltage, what is the phase voltage?",
    options: ["400V", "230V", "692V", "133V"],
    correctIndex: 1,
    explanation: "In star connection, VL = VP x root3, so VP = VL / root3 = 400 / 1.732 = 230V. This is why UK three-phase supplies give both 400V (line) and 230V (phase) from the same source."
  },
  {
    id: "star-delta-starting",
    question: "Why is star-delta starting used for large motors?",
    options: ["It increases motor speed", "It reduces starting current to one-third", "It eliminates the need for a neutral", "It reverses motor direction"],
    correctIndex: 1,
    explanation: "Star-delta starting reduces the starting current to approximately one-third (1/root3 squared = 1/3) of direct-on-line current. This reduces voltage dip and stress on the supply system."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main advantage of star connection in distribution systems?",
    options: [
      "Higher line voltage available",
      "No neutral conductor required",
      "Provides both line and phase voltages for different loads",
      "Lower cable costs"
    ],
    correctAnswer: 2,
    explanation: "Star connection provides access to both 400V (line-to-line) for three-phase equipment and 230V (phase-to-neutral) for single-phase loads, making it ideal for mixed building loads."
  },
  {
    id: 2,
    question: "In a delta-connected motor, what is the relationship between line and phase current?",
    options: ["IL = IP", "IL = IP x root3", "IL = IP / root3", "IL = 3 x IP"],
    correctAnswer: 1,
    explanation: "In delta connection, IL = IP x root3 (approximately 1.732). The line current is higher than the phase current because it combines currents from two phase windings."
  },
  {
    id: 3,
    question: "A three-phase transformer has 400V applied to its delta-connected primary. What voltage appears across each primary winding?",
    options: ["230V", "400V", "692V", "133V"],
    correctAnswer: 1,
    explanation: "In delta connection, VP = VL. Each winding is connected directly across two line conductors, so the full 400V line voltage appears across each winding."
  },
  {
    id: 4,
    question: "Why must the neutral in a star system be properly earthed?",
    options: [
      "To increase power factor",
      "To provide fault current path and stabilise phase voltages",
      "To reduce cable sizes",
      "To enable delta connection"
    ],
    correctAnswer: 1,
    explanation: "Earthing the neutral provides a low-impedance path for earth fault currents (enabling protection to operate) and stabilises phase voltages under unbalanced load conditions."
  },
  {
    id: 5,
    question: "What happens to motor starting torque when using star-delta starting compared to direct-on-line?",
    options: [
      "Torque increases by a factor of 3",
      "Torque remains the same",
      "Torque reduces to approximately one-third",
      "Torque reduces to approximately half"
    ],
    correctAnswer: 2,
    explanation: "Starting torque is proportional to voltage squared. In star, voltage is reduced by root3, so torque = (1/root3)squared = 1/3 of DOL torque. This may be insufficient for high-inertia loads."
  },
  {
    id: 6,
    question: "Which transformer connection provides a neutral on the secondary side?",
    options: ["Delta-delta", "Delta-star", "Star-delta", "Both delta-delta and star-delta"],
    correctAnswer: 1,
    explanation: "Delta-star (Dy) connection is commonly used for distribution transformers. The delta primary eliminates third harmonic issues while the star secondary provides a neutral for single-phase loads."
  },
  {
    id: 7,
    question: "A 30kW motor runs at 400V in delta. What is the phase current in each winding?",
    options: ["25A", "43.3A", "75A", "129.9A"],
    correctAnswer: 1,
    explanation: "Line current IL = P / (root3 x VL x pf) = 30000 / (1.732 x 400 x 1) = 43.3A. In delta, IP = IL / root3 = 43.3 / 1.732 = 25A per winding (assuming pf = 1)."
  },
  {
    id: 8,
    question: "What is the vector group designation Dyn11 indicating?",
    options: [
      "Delta primary, star secondary with neutral, 30 degrees lag",
      "Delta primary, star secondary with neutral, 330 degrees (11 o'clock) phase shift",
      "Star primary, delta secondary, 11kV rating",
      "Delta connection with 11 windings"
    ],
    correctAnswer: 1,
    explanation: "Dyn11 means: D = delta primary, y = star secondary, n = neutral brought out, 11 = secondary leads primary by 330 degrees (11 x 30 degrees, like 11 o'clock position)."
  },
  {
    id: 9,
    question: "In building services, which configuration is typically used for the main distribution transformer?",
    options: [
      "Delta-delta (Dd)",
      "Star-star (Yy)",
      "Delta-star (Dyn11)",
      "Zig-zag (Zn)"
    ],
    correctAnswer: 2,
    explanation: "Dyn11 is standard for UK distribution transformers. It provides: delta primary (blocks third harmonics), star secondary with neutral (enables single-phase loads), and 30 degree phase shift."
  },
  {
    id: 10,
    question: "What is the minimum star-delta changeover time for a typical motor starter?",
    options: [
      "Instantaneous (no delay)",
      "0.5-1 second (closed transition)",
      "5-10 seconds (after motor reaches speed)",
      "30 seconds minimum"
    ],
    correctAnswer: 2,
    explanation: "The motor must accelerate in star to approximately 75-80% of full speed (typically 5-10 seconds depending on load inertia) before switching to delta. Premature switching causes high current surge."
  }
];

const faqs = [
  {
    question: "Why is star connection preferred for distribution systems?",
    answer: "Star connection provides a neutral point, enabling both three-phase (400V) and single-phase (230V) supplies from the same system. This is essential for buildings with mixed loads - motors and large equipment use three-phase, while lighting and socket outlets use single-phase. The neutral also provides a reference for protective devices."
  },
  {
    question: "Can I connect single-phase loads to a delta system?",
    answer: "Not directly to the main supply. Delta has no neutral, so single-phase loads cannot be connected phase-to-neutral. You would need to use a transformer with a star secondary to derive a neutral, or use the delta supply for three-phase loads only. This is why delta distribution is rare in buildings."
  },
  {
    question: "What causes neutral current in a star system?",
    answer: "In a perfectly balanced system, the three phase currents sum to zero and no neutral current flows. In practice, single-phase loads cause imbalance - the neutral carries the vector sum of the unbalanced currents. High neutral currents indicate poor load balancing and waste energy."
  },
  {
    question: "Why do some motors have six terminals?",
    answer: "Six terminals allow the motor to be connected in either star or delta. Each winding has two ends brought out. For star, connect one end of each winding together; for delta, connect each winding end-to-end in a ring. This enables star-delta starting and voltage matching (e.g., 230V delta or 400V star give same winding voltage)."
  },
  {
    question: "What is open-delta (V-connection)?",
    answer: "Open-delta uses only two transformers instead of three to supply three-phase power. It provides only 57.7% of the capacity of a full delta bank but can be useful as an emergency measure if one transformer fails, or where loads are light and may grow later."
  },
  {
    question: "How do I size the neutral conductor in a three-phase system?",
    answer: "For linear loads, neutral can be reduced to 50% of phase conductor CSA if loads are well-balanced. However, with non-linear loads (computers, LED drivers, VFDs), third harmonic currents add in the neutral and can exceed phase current. BS 7671 requires full-size neutral for these installations."
  }
];

const HNCModule3Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4">
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
            <span>Module 3.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Star and Delta Configurations
          </h1>
          <p className="text-white/80">
            The two fundamental three-phase winding arrangements that underpin power distribution and motor control
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Star (Y):</strong> Common neutral point, 4-wire system, VL = VP x root3</li>
              <li className="pl-1"><strong>Delta (D):</strong> No neutral, 3-wire system, VL = VP</li>
              <li className="pl-1"><strong>Star-delta starting:</strong> Reduces motor starting current to 1/3</li>
              <li className="pl-1"><strong>Transformer Dyn11:</strong> Standard UK distribution connection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Distribution:</strong> Star for mixed single/three-phase loads</li>
              <li className="pl-1"><strong>Motors:</strong> Delta running, star-delta starting for large units</li>
              <li className="pl-1"><strong>Transformers:</strong> Dyn11 for building supplies</li>
              <li className="pl-1"><strong>Neutral:</strong> Essential for single-phase circuits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain star connection with neutral point and 4-wire system",
              "Describe delta connection and its 3-wire application",
              "Calculate line and phase voltages and currents for both configurations",
              "Justify star versus delta selection for different applications",
              "Apply star-delta starting principles to large motors",
              "Interpret transformer vector group designations (Dyn11)"
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

        {/* Section 1: Star (Y) Connection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Star (Y) Connection - The 4-Wire System
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In star (or wye) connection, one end of each of the three phase windings is connected
              together at a common point called the <strong>star point</strong> or <strong>neutral point</strong>.
              The other ends form the three line terminals.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Star Connection Diagram</p>
              <div className="font-mono text-sm text-white/90 leading-relaxed">
                <pre className="overflow-x-auto">
{`        L1 ───────┬────── Phase A winding
                  │
        L2 ───────┼────── Phase B winding ───┐
                  │                          │
        L3 ───────┴────── Phase C winding ───┼─── N (Neutral)
                                             │
                     Star Point (common) ────┘`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Characteristics of Star Connection:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>4-wire system:</strong> Three lines (L1, L2, L3) plus neutral (N)</li>
                <li className="pl-1"><strong>Neutral point:</strong> Common junction of all three windings</li>
                <li className="pl-1"><strong>Line voltage:</strong> VL = VP x root3 = VP x 1.732</li>
                <li className="pl-1"><strong>Line current:</strong> IL = IP (same current in line and winding)</li>
                <li className="pl-1"><strong>Two voltage levels:</strong> 400V line-to-line, 230V line-to-neutral</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Star Connection Voltage Relationships</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">UK Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relationship</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line voltage (VL)</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">Between any two lines</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase voltage (VP)</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">VP = VL / root3 = 400 / 1.732</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line current (IL)</td>
                      <td className="border border-white/10 px-3 py-2">Varies</td>
                      <td className="border border-white/10 px-3 py-2">IL = IP (equal)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Neutral current</td>
                      <td className="border border-white/10 px-3 py-2">0 if balanced</td>
                      <td className="border border-white/10 px-3 py-2">Vector sum of phase currents</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key formula:</strong> VL = VP x root3, therefore VP = VL / root3 = 400 / 1.732 = 230.9V (nominally 230V)
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Delta Connection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Delta (D) Connection - The 3-Wire System
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In delta (or mesh) connection, the three phase windings are connected end-to-end
              in a closed loop, forming a triangle. Each corner of the triangle connects to a line conductor.
              There is no neutral point.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Delta Connection Diagram</p>
              <div className="font-mono text-sm text-white/90 leading-relaxed">
                <pre className="overflow-x-auto">
{`                    L1
                    │
              ┌─────┴─────┐
              │           │
         Phase A     Phase C
              │           │
        L2 ───┴─── Phase B ───┴─── L3

        (Windings form closed triangle)`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Characteristics of Delta Connection:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>3-wire system:</strong> Only three line conductors (L1, L2, L3)</li>
                <li className="pl-1"><strong>No neutral:</strong> Cannot supply single-phase loads directly</li>
                <li className="pl-1"><strong>Line voltage:</strong> VL = VP (winding sees full line voltage)</li>
                <li className="pl-1"><strong>Line current:</strong> IL = IP x root3 (line current is higher)</li>
                <li className="pl-1"><strong>Single voltage level:</strong> Only 400V available</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Delta Connection Current Relationships</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relationship</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line voltage (VL)</td>
                      <td className="border border-white/10 px-3 py-2">VL = VP</td>
                      <td className="border border-white/10 px-3 py-2">Winding connected across lines</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase voltage (VP)</td>
                      <td className="border border-white/10 px-3 py-2">VP = VL = 400V</td>
                      <td className="border border-white/10 px-3 py-2">Full line voltage on winding</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line current (IL)</td>
                      <td className="border border-white/10 px-3 py-2">IL = IP x root3</td>
                      <td className="border border-white/10 px-3 py-2">Line carries currents from two phases</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase current (IP)</td>
                      <td className="border border-white/10 px-3 py-2">IP = IL / root3</td>
                      <td className="border border-white/10 px-3 py-2">Current through each winding</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key formula:</strong> IL = IP x root3. Each line conductor carries the vector sum of currents from two adjacent windings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Line vs Phase Quantities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Line vs Phase - Understanding the Difference
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The distinction between <strong>line</strong> and <strong>phase</strong> quantities
              is fundamental to three-phase circuit analysis. The relationship differs depending
              on whether the system is star or delta connected.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Definitions</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Line Quantities</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Voltage between any two line conductors</li>
                    <li>Current flowing in the line conductor</li>
                    <li>What you measure at the supply terminals</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Phase Quantities</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Voltage across one winding</li>
                    <li>Current flowing through one winding</li>
                    <li>What the load or source winding experiences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Comparison of Star and Delta Relationships</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Star (Y)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Delta (D)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage</td>
                      <td className="border border-white/10 px-3 py-2">VL = VP x root3</td>
                      <td className="border border-white/10 px-3 py-2">VL = VP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current</td>
                      <td className="border border-white/10 px-3 py-2">IL = IP</td>
                      <td className="border border-white/10 px-3 py-2">IL = IP x root3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UK example (400V line)</td>
                      <td className="border border-white/10 px-3 py-2">VP = 230V across winding</td>
                      <td className="border border-white/10 px-3 py-2">VP = 400V across winding</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Number of wires</td>
                      <td className="border border-white/10 px-3 py-2">4 (3 lines + neutral)</td>
                      <td className="border border-white/10 px-3 py-2">3 (lines only)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-300 mb-2">Critical Point for Motor Nameplates</p>
              <p className="text-sm text-white/90">
                A motor rated <strong>230V/400V</strong> (D/Y) means: 230V delta OR 400V star. In both cases,
                each winding sees 230V (phase voltage). The rating tells you which connection to use
                depending on your supply voltage.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Choosing Star or Delta */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            When to Use Star vs Delta
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between star and delta connection depends on the application, the voltage
              levels required, and whether a neutral is needed.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Use Star (Y) When:</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Mixed loads:</strong> Single-phase and three-phase loads in buildings</li>
                  <li className="pl-1"><strong>Distribution:</strong> Main LV supply to premises (TN-S, TN-C-S)</li>
                  <li className="pl-1"><strong>Neutral required:</strong> For single-phase circuits (lighting, sockets)</li>
                  <li className="pl-1"><strong>Lower winding voltage:</strong> Thinner insulation acceptable</li>
                  <li className="pl-1"><strong>Reduced starting current:</strong> Star connection during motor starting</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Use Delta (D) When:</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Balanced loads only:</strong> Three-phase motors, heaters</li>
                  <li className="pl-1"><strong>Higher power:</strong> Motor running connection (full torque)</li>
                  <li className="pl-1"><strong>No neutral needed:</strong> Pure three-phase loads</li>
                  <li className="pl-1"><strong>Transformer primary:</strong> Blocks third harmonics</li>
                  <li className="pl-1"><strong>Higher fault tolerance:</strong> Can operate with one phase lost (open delta)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main distribution board</td>
                      <td className="border border-white/10 px-3 py-2">Star (4-wire)</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase circuits need neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AHU motor running</td>
                      <td className="border border-white/10 px-3 py-2">Delta</td>
                      <td className="border border-white/10 px-3 py-2">Full torque, balanced 3-phase load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large motor starting</td>
                      <td className="border border-white/10 px-3 py-2">Star then delta</td>
                      <td className="border border-white/10 px-3 py-2">Reduce starting current to 1/3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution transformer</td>
                      <td className="border border-white/10 px-3 py-2">Dyn11</td>
                      <td className="border border-white/10 px-3 py-2">Delta blocks harmonics, star gives neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase heater bank</td>
                      <td className="border border-white/10 px-3 py-2">Delta</td>
                      <td className="border border-white/10 px-3 py-2">Balanced load, no neutral needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Star-Delta Motor Starting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Star-Delta Motor Starting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Star-delta (Y-D) starting is a reduced voltage starting method for three-phase
              induction motors. It temporarily connects the motor in star during starting,
              then switches to delta for normal running.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Star-Delta Starting Sequence</p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-2">1. Star (Start)</p>
                  <p className="text-sm text-white/90">Motor connected in star</p>
                  <p className="text-xs text-white/60 mt-1">Winding voltage = 230V</p>
                  <p className="text-xs text-white/60">Current = 1/3 of DOL</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-2">2. Transition</p>
                  <p className="text-sm text-white/90">Timer (5-10 seconds)</p>
                  <p className="text-xs text-white/60 mt-1">Motor accelerates to ~80% speed</p>
                  <p className="text-xs text-white/60">Contactors changeover</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-2">3. Delta (Run)</p>
                  <p className="text-sm text-white/90">Motor reconnected in delta</p>
                  <p className="text-xs text-white/60 mt-1">Winding voltage = 400V</p>
                  <p className="text-xs text-white/60">Full torque available</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Star-Delta Starting Analysis</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Star (Starting)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Delta (Running)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Winding voltage</td>
                      <td className="border border-white/10 px-3 py-2">VL / root3 = 230V</td>
                      <td className="border border-white/10 px-3 py-2">VL = 400V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line current</td>
                      <td className="border border-white/10 px-3 py-2">1/3 of delta current</td>
                      <td className="border border-white/10 px-3 py-2">Full load current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Starting torque</td>
                      <td className="border border-white/10 px-3 py-2">1/3 of DOL torque</td>
                      <td className="border border-white/10 px-3 py-2">Full rated torque</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power consumption</td>
                      <td className="border border-white/10 px-3 py-2">Reduced (acceleration)</td>
                      <td className="border border-white/10 px-3 py-2">Rated (running)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Advantages and Limitations:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-green-400 mb-1">Advantages</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Starting current reduced to 1/3</li>
                    <li>Reduces voltage dip on supply</li>
                    <li>Simple, reliable, low cost</li>
                    <li>No external resistors or autotransformers</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-red-400 mb-1">Limitations</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Starting torque also reduced to 1/3</li>
                    <li>Motor must have 6 terminals accessible</li>
                    <li>Transient current surge at changeover</li>
                    <li>Not suitable for high-inertia loads</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services note:</strong> Star-delta starting is commonly used for large AHU fans,
              chiller compressors, and pump motors above 7.5kW where direct-on-line starting would cause
              unacceptable voltage disturbance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Transformer Winding Connections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Transformer Winding Connections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase transformers can have their primary and secondary windings connected
              in either star or delta configuration. The choice affects voltage transformation,
              neutral availability, and harmonic behaviour.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Transformer Connections</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Designation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Secondary</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Dyn11</td>
                      <td className="border border-white/10 px-3 py-2">Delta</td>
                      <td className="border border-white/10 px-3 py-2">Star + neutral</td>
                      <td className="border border-white/10 px-3 py-2">UK distribution (standard)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Yyn0</td>
                      <td className="border border-white/10 px-3 py-2">Star</td>
                      <td className="border border-white/10 px-3 py-2">Star + neutral</td>
                      <td className="border border-white/10 px-3 py-2">Transmission step-down</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dd0</td>
                      <td className="border border-white/10 px-3 py-2">Delta</td>
                      <td className="border border-white/10 px-3 py-2">Delta</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, no neutral needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Yd11</td>
                      <td className="border border-white/10 px-3 py-2">Star</td>
                      <td className="border border-white/10 px-3 py-2">Delta</td>
                      <td className="border border-white/10 px-3 py-2">Generator step-up</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Understanding Vector Groups</p>
              <p className="text-sm text-white/90 mb-3">
                The designation <strong>Dyn11</strong> tells you everything about the transformer connection:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>D:</strong> Primary is Delta connected</li>
                <li className="pl-1"><strong>y:</strong> Secondary is star (wye) connected</li>
                <li className="pl-1"><strong>n:</strong> Neutral is brought out (available for connection)</li>
                <li className="pl-1"><strong>11:</strong> Secondary voltage leads primary by 330 degrees (11 x 30 degrees = 11 o'clock position)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Dyn11 is Standard for UK Distribution:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Delta primary:</strong> Blocks third harmonic currents from circulating in the supply</li>
                <li className="pl-1"><strong>Star secondary:</strong> Provides neutral for single-phase loads (230V)</li>
                <li className="pl-1"><strong>Neutral earthed:</strong> Creates TN-S or TN-C-S earthing arrangement</li>
                <li className="pl-1"><strong>30 degree shift:</strong> Helps with parallel operation and fault limiting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Neutral Earthing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Neutral Earthing in Star Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In star-connected systems, the neutral point is typically earthed (grounded). This
              provides a reference for phase voltages, a path for earth fault currents, and enables
              protection systems to operate.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functions of Neutral Earthing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage stabilisation:</strong> Maintains consistent phase-to-neutral voltages under unbalanced loads</li>
                <li className="pl-1"><strong>Fault current path:</strong> Provides low-impedance return for earth fault currents</li>
                <li className="pl-1"><strong>Protection operation:</strong> Enables RCDs, earth fault relays, and overcurrent devices to detect and clear faults</li>
                <li className="pl-1"><strong>Safety:</strong> Limits touch voltages on exposed metalwork during faults</li>
                <li className="pl-1"><strong>Lightning/surge protection:</strong> Provides path to earth for transient overvoltages</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earthing Systems in UK Installations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Neutral Earthing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-S</td>
                      <td className="border border-white/10 px-3 py-2">Earthed at source, separate N and PE</td>
                      <td className="border border-white/10 px-3 py-2">Older installations, dedicated earth</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-C-S (PME)</td>
                      <td className="border border-white/10 px-3 py-2">Combined PEN in supply, split at origin</td>
                      <td className="border border-white/10 px-3 py-2">Most UK buildings (standard)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TT</td>
                      <td className="border border-white/10 px-3 py-2">Source earthed, local earth electrode</td>
                      <td className="border border-white/10 px-3 py-2">Rural, overhead supplies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IT</td>
                      <td className="border border-white/10 px-3 py-2">Unearthed or impedance earthed</td>
                      <td className="border border-white/10 px-3 py-2">Hospitals, critical systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-300 mb-2">PME and Neutral-Earth Faults</p>
              <p className="text-sm text-white/90">
                In TN-C-S (PME) systems, loss of the combined neutral-earth (PEN) conductor can cause
                dangerous voltages on exposed metalwork. BS 7671 requires additional protective measures
                including main bonding and restrictions on PME connections to certain locations
                (swimming pools, petrol stations, caravans).
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding star and delta configurations is essential for designing and maintaining
              electrical systems in buildings. Different equipment and distribution systems require
              specific connection arrangements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution System Design</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  A typical commercial building electrical distribution uses:
                </p>
                <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>Incoming supply transformer (Dyn11):</strong> 11kV/400V, delta primary, star secondary with neutral
                  </li>
                  <li className="pl-1">
                    <strong>Main LV switchboard:</strong> 4-wire (L1, L2, L3, N) + PE, TN-C-S earthing
                  </li>
                  <li className="pl-1">
                    <strong>Sub-distribution boards:</strong> 4-wire for mixed loads, 3-wire for motor-only boards
                  </li>
                  <li className="pl-1">
                    <strong>Final circuits:</strong> Single-phase from each phase to neutral (balanced loading)
                  </li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Connections in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extract fans (small)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 3kW</td>
                      <td className="border border-white/10 px-3 py-2">DOL</td>
                      <td className="border border-white/10 px-3 py-2">Delta (400V)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AHU supply fans</td>
                      <td className="border border-white/10 px-3 py-2">7.5-30kW</td>
                      <td className="border border-white/10 px-3 py-2">Star-delta or VSD</td>
                      <td className="border border-white/10 px-3 py-2">Delta running</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chiller compressors</td>
                      <td className="border border-white/10 px-3 py-2">30-100kW+</td>
                      <td className="border border-white/10 px-3 py-2">Star-delta or soft start</td>
                      <td className="border border-white/10 px-3 py-2">Delta running</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LPHW pumps</td>
                      <td className="border border-white/10 px-3 py-2">1.5-15kW</td>
                      <td className="border border-white/10 px-3 py-2">DOL or VSD</td>
                      <td className="border border-white/10 px-3 py-2">Delta (400V)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lift motors</td>
                      <td className="border border-white/10 px-3 py-2">5-50kW</td>
                      <td className="border border-white/10 px-3 py-2">VSD (regenerative)</td>
                      <td className="border border-white/10 px-3 py-2">Delta via VSD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Balancing in Star Systems</p>
              <p className="text-sm text-white/90 mb-3">
                Single-phase loads should be distributed evenly across the three phases to:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Minimise neutral current (reduces I squared R losses)</li>
                <li className="pl-1">Maintain stable phase voltages</li>
                <li className="pl-1">Optimise transformer loading</li>
                <li className="pl-1">Reduce cable heating</li>
              </ul>
              <p className="text-sm text-white/70 mt-3">
                <strong>BS 7671 guidance:</strong> Where practicable, single-phase loads should be distributed to achieve balance within 10-15% across phases.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Neutral Sizing for Non-Linear Loads</p>
              <p className="text-sm text-white/90">
                Modern buildings with IT equipment, LED lighting, and VFDs generate significant third
                harmonic currents. These add arithmetically in the neutral rather than cancelling,
                potentially causing neutral current to exceed phase current. BS 7671 requires:
              </p>
              <ul className="text-sm text-white space-y-1 mt-2 list-disc list-outside ml-5">
                <li className="pl-1">Full-size neutral where third harmonic content exceeds 15%</li>
                <li className="pl-1">Oversize neutral (up to 1.45 x phase) for very high harmonic loads</li>
                <li className="pl-1">Consideration of harmonic filters or active front-end drives</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Star Connection Calculations</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A balanced three-phase load draws 45A per phase from a 400V star-connected supply. Calculate the line voltage, phase voltage, and total power (assuming unity power factor).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Line voltage VL = 400V (given)</p>
                <p>Phase voltage VP = VL / root3 = 400 / 1.732 = <strong>230.9V</strong></p>
                <p className="mt-2">In star: IL = IP = 45A</p>
                <p className="mt-2">Total power P = root3 x VL x IL x pf</p>
                <p>P = 1.732 x 400 x 45 x 1 = <strong>31.2kW</strong></p>
                <p className="mt-2 text-white/60">Or per phase: P = 3 x VP x IP = 3 x 230.9 x 45 = 31.2kW</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Delta Connection Calculations</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A three-phase heater is delta-connected to a 400V supply and draws 30A line current. Calculate the phase current and total power.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>In delta: VL = VP = 400V</p>
                <p>Line current IL = 30A</p>
                <p className="mt-2">Phase current IP = IL / root3 = 30 / 1.732 = <strong>17.3A</strong></p>
                <p className="mt-2">Power P = root3 x VL x IL x pf</p>
                <p>P = 1.732 x 400 x 30 x 1 = <strong>20.8kW</strong></p>
                <p className="mt-2 text-white/60">(For resistive heater, pf = 1)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Star-Delta Starting Current Reduction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A motor draws 180A starting current when started direct-on-line in delta. What starting current will it draw using star-delta starting?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>DOL starting current (delta) = 180A</p>
                <p className="mt-2">Star-delta reduction factor = 1/3</p>
                <p>(Because voltage is 1/root3 and current is proportional to voltage)</p>
                <p className="mt-2">Star starting current = 180 / 3 = <strong>60A</strong></p>
                <p className="mt-2 text-green-400">Current reduction = 180 - 60 = 120A (67% reduction)</p>
                <p className="mt-2 text-white/60">Note: Torque also reduces to 1/3, so motor must be lightly loaded during start</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Motor Dual Voltage Rating</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A motor nameplate shows 230V/400V (D/Y). Explain what this means and how to connect it to a UK 400V supply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>The rating 230V/400V (D/Y) means:</p>
                <p className="mt-2">- Connect in Delta for 230V line supply (winding sees 230V)</p>
                <p>- Connect in Star for 400V line supply (winding sees 400/root3 = 230V)</p>
                <p className="mt-2">For UK 400V supply: <strong>Connect in Star (Y)</strong></p>
                <p className="mt-2">Each winding will receive: 400V / 1.732 = 230V</p>
                <p className="text-green-400 mt-2">This matches the winding's rated voltage</p>
                <p className="mt-2 text-white/60">Star-delta starting: Start in Star, run in Delta would give</p>
                <p className="text-white/60">winding 133V during start - too low. Use correct rating motor.</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Star: VL = VP x root3</strong> - Line voltage is root3 times phase voltage</li>
                <li className="pl-1"><strong>Star: IL = IP</strong> - Line and phase currents are equal</li>
                <li className="pl-1"><strong>Delta: VL = VP</strong> - Line and phase voltages are equal</li>
                <li className="pl-1"><strong>Delta: IL = IP x root3</strong> - Line current is root3 times phase current</li>
                <li className="pl-1"><strong>Power: P = root3 x VL x IL x pf</strong> - Three-phase power formula</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">root3 = <strong>1.732</strong></li>
                <li className="pl-1">UK line voltage: <strong>400V</strong></li>
                <li className="pl-1">UK phase voltage: <strong>230V</strong> (400 / 1.732)</li>
                <li className="pl-1">Star-delta starting current reduction: <strong>1/3</strong></li>
                <li className="pl-1">Star-delta starting torque reduction: <strong>1/3</strong></li>
                <li className="pl-1">Dyn11 phase shift: <strong>330 degrees</strong> (11 x 30)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong connection:</strong> Connecting 230V rated windings in delta on 400V supply (overvoltage)</li>
                <li className="pl-1"><strong>Missing neutral:</strong> Attempting single-phase loads from delta without transformer</li>
                <li className="pl-1"><strong>Premature changeover:</strong> Switching to delta before motor reaches speed (current surge)</li>
                <li className="pl-1"><strong>Unbalanced loading:</strong> Overloading one phase, causing neutral current and voltage imbalance</li>
                <li className="pl-1"><strong>Ignoring harmonics:</strong> Under-sizing neutral for non-linear loads</li>
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
                <p className="font-medium text-white mb-1">Star (Y) Connection</p>
                <ul className="space-y-0.5">
                  <li>VL = VP x root3 (400V = 230V x 1.732)</li>
                  <li>IL = IP (currents equal)</li>
                  <li>4-wire system with neutral</li>
                  <li>Used for distribution, mixed loads</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Delta (D) Connection</p>
                <ul className="space-y-0.5">
                  <li>VL = VP (voltages equal)</li>
                  <li>IL = IP x root3 (line higher)</li>
                  <li>3-wire system, no neutral</li>
                  <li>Used for motors, balanced loads</li>
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
            <Link to="../h-n-c-module3-section3-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 3.7
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4-2">
              Next: Section 4.2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section4_1;
