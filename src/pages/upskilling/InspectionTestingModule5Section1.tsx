import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earth Fault Path Principles - Module 5 Section 1";
const DESCRIPTION = "Understand the earth fault loop, its components, and why low impedance is essential for safety.";

const quickCheckQuestions = [
  {
    id: "efli-purpose",
    question: "Why must earth fault loop impedance be low?",
    options: [
      "To reduce cable heating",
      "To allow high fault current for fast device operation",
      "To save energy",
      "To reduce cable costs"
    ],
    correctIndex: 1,
    explanation: "Low impedance allows high fault current (I=V/Z). High current operates protective devices quickly, limiting shock duration."
  },
  {
    id: "zs-formula",
    question: "The formula for total earth fault loop impedance is:",
    options: ["Zs = Ze × R1+R2", "Zs = Ze - R1+R2", "Zs = Ze + R1+R2", "Zs = Ze ÷ R1+R2"],
    correctIndex: 2,
    explanation: "Zs = Ze + R1+R2. Total impedance equals external impedance plus the circuit's phase and CPC resistance."
  },
  {
    id: "ze-meaning",
    question: "Ze represents:",
    options: [
      "Total circuit impedance",
      "External impedance (outside the installation)",
      "Earth electrode resistance only",
      "CPC resistance"
    ],
    correctIndex: 1,
    explanation: "Ze is the external earth fault loop impedance - everything outside your installation including the supply network."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The earth fault loop includes:",
    options: [
      "Only the circuit protective conductor",
      "The complete path from source, through fault, back to source",
      "Only the earthing conductor",
      "Only the supply cable"
    ],
    correctAnswer: 1,
    explanation: "The loop is the complete path: source to phase conductor to fault to CPC to earthing to means of earthing back to source."
  },
  {
    id: 2,
    question: "Low earth fault loop impedance ensures:",
    options: [
      "Low fault current",
      "High fault current for fast device operation",
      "No RCD is needed",
      "Higher cable ratings"
    ],
    correctAnswer: 1,
    explanation: "Low impedance allows high fault current (I=V/Z). High current makes protective devices operate faster, limiting shock duration."
  },
  {
    id: 3,
    question: "The formula for total earth fault loop impedance is:",
    options: ["Zs = Ze × R1+R2", "Zs = Ze - R1+R2", "Zs = Ze + R1+R2", "Zs = Ze ÷ R1+R2"],
    correctAnswer: 2,
    explanation: "Zs = Ze + R1+R2. Total impedance is external impedance plus circuit impedance."
  },
  {
    id: 4,
    question: "Ze represents:",
    options: [
      "Total circuit impedance",
      "External impedance (outside the installation)",
      "Earth electrode resistance only",
      "CPC resistance"
    ],
    correctAnswer: 1,
    explanation: "Ze is external earth fault loop impedance - everything outside your installation including supply transformer and cables."
  },
  {
    id: 5,
    question: "R1+R2 in the Zs formula represents:",
    options: [
      "External supply impedance",
      "Earth electrode resistance",
      "Phase and CPC resistance of the circuit",
      "Protective device rating"
    ],
    correctAnswer: 2,
    explanation: "R1+R2 is the combined resistance of the phase conductor (R1) and circuit protective conductor (R2) for the circuit."
  },
  {
    id: 6,
    question: "If Zs is too high, the protective device:",
    options: [
      "Will trip instantly",
      "May not trip quickly enough",
      "Will trip before the fault",
      "Is not affected"
    ],
    correctAnswer: 1,
    explanation: "High Zs means low fault current. The device may not reach its operating current quickly enough, delaying protection."
  },
  {
    id: 7,
    question: "Maximum Zs values are determined by:",
    options: [
      "Cable manufacturer",
      "Customer preference",
      "Protective device characteristics and disconnection time requirements",
      "Length of circuit only"
    ],
    correctAnswer: 2,
    explanation: "Maximum Zs ensures fault current is high enough to operate the device within required disconnection times (0.4s or 5s typically)."
  },
  {
    id: 8,
    question: "In TT earthing systems, Ze is typically:",
    options: [
      "Very low (<0.5Ω)",
      "Higher due to earth electrode resistance",
      "Zero",
      "Not measurable"
    ],
    correctAnswer: 1,
    explanation: "TT systems rely on earth electrodes (typically 20-200Ω) rather than a metallic return, giving higher Ze than TN systems."
  },
  {
    id: 9,
    question: "The purpose of EFLI testing is to verify:",
    options: [
      "Insulation quality",
      "The fault loop allows sufficient current for device operation",
      "Polarity only",
      "Cable colours"
    ],
    correctAnswer: 1,
    explanation: "EFLI testing confirms the earth fault path has low enough impedance to allow protective device operation within required times."
  },
  {
    id: 10,
    question: "What happens during an earth fault?",
    options: [
      "Current flows through the CPC back to source",
      "The circuit continues normally",
      "Nothing - earth faults are harmless",
      "Only the neutral is affected"
    ],
    correctAnswer: 0,
    explanation: "During an earth fault, current flows from phase through the fault into the CPC, then back to the source via the earthing system."
  }
];

const faqs = [
  {
    question: "What is the earth fault loop?",
    answer: "The complete path fault current takes: from the source transformer, through the phase conductor, through the fault, through the CPC back to the consumer unit, then via the earthing conductor and means of earthing back to the transformer neutral/earth point."
  },
  {
    question: "Why must impedance be low?",
    answer: "Using Ohm's law (I=V/Z), lower impedance means higher fault current. Higher fault current causes the protective device (MCB, fuse) to operate faster. Fast operation limits the duration someone could receive an electric shock."
  },
  {
    question: "What's the difference between Ze and Zs?",
    answer: "Ze is the external earth fault loop impedance - everything outside your installation (transformer, supply cables, DNO earthing). Zs is the total, including your circuit wiring (R1+R2). Zs = Ze + (R1+R2)."
  },
  {
    question: "What happens if Zs is too high?",
    answer: "High Zs means low fault current. The protective device may not trip quickly enough (or at all for minor faults). This leaves dangerous voltage on exposed metalwork for longer, increasing shock risk."
  },
  {
    question: "How do maximum Zs values relate to protective devices?",
    answer: "Each protective device has a characteristic showing how quickly it operates at different currents. Maximum Zs values are calculated to ensure fault current is high enough to trip the device within required disconnection times (0.4s or 5s)."
  },
  {
    question: "Why does TT earthing have higher external impedance?",
    answer: "TT systems use a local earth electrode rather than the supply neutral. Earth electrode resistance (typically 20-200Ω) is much higher than the metallic return path in TN systems, resulting in higher Ze and Zs."
  }
];

const InspectionTestingModule5Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content - Full width, minimal padding */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earth Fault Path Principles
          </h1>
          <p className="text-white/80">
            Understanding the earth fault loop and why low impedance is essential for safety
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Loop:</strong> Complete circuit path for fault current to return to source</li>
              <li><strong>Low Z:</strong> High fault current means fast device operation</li>
              <li><strong>Formula:</strong> Zs = Ze + (R1+R2)</li>
              <li><strong>Safety:</strong> Quick disconnection limits shock duration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Values</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>TN-C-S Ze:</strong> Typically 0.35 ohm or less</li>
              <li><strong>TN-S Ze:</strong> Typically 0.8 ohm or less</li>
              <li><strong>TT Ze:</strong> 20-200 ohm (needs RCD)</li>
              <li><strong>Disconnect:</strong> 0.4s sockets, 5s distribution</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand each component of the earth fault loop (Zs)",
              "Relate low impedance to fast disconnection times",
              "Apply the key formula: Zs = Ze + (R1+R2)",
              "Explain how EFLI protects against electric shock",
              "Understand why maximum Zs limits exist",
              "Know what EFLI testing verifies"
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

        {/* Section 1: The Earth Fault Loop */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Earth Fault Loop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When a fault occurs between a live conductor and earth (exposed metalwork), current must flow
              back to the source to be detected. The <strong>earth fault loop</strong> is this complete circuit path.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Loop Path (TN-C-S):</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Source transformer winding</li>
                <li>Supply phase conductor to installation</li>
                <li>Circuit phase conductor (R1)</li>
                <li>The fault itself</li>
                <li>Circuit protective conductor CPC (R2)</li>
                <li>Main earthing terminal</li>
                <li>Earthing conductor</li>
                <li>Means of earthing (supply cable sheath/PEN)</li>
                <li>Back to transformer</li>
              </ol>
            </div>

            <p className="text-sm text-white/90">
              The total impedance of this path determines how much fault current will flow and how quickly
              the protective device will operate.
            </p>
          </div>
        </section>

        {/* Section 2: Why Low Impedance Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Why Low Impedance Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 text-center">
              <p className="text-2xl font-mono text-elec-yellow mb-2">I = V / Z</p>
              <p className="text-sm text-white/60">Fault Current = Voltage / Impedance</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent text-center">
                <p className="font-medium text-emerald-400 mb-1">Low Z = High I</p>
                <p className="text-white/70 text-xs">Low impedance allows high fault current to flow</p>
              </div>
              <div className="p-3 rounded bg-transparent text-center">
                <p className="font-medium text-blue-400 mb-1">High I = Fast Trip</p>
                <p className="text-white/70 text-xs">High current causes quick protective device operation</p>
              </div>
              <div className="p-3 rounded bg-transparent text-center">
                <p className="font-medium text-purple-400 mb-1">Fast Trip = Safety</p>
                <p className="text-white/70 text-xs">Quick disconnection limits shock duration and energy</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: The Key Formula */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The Key Formula
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 text-center">
              <p className="text-3xl font-mono text-elec-yellow mb-4">Zs = Ze + (R1+R2)</p>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-bold text-elec-yellow text-xl mb-1">Zs</p>
                <p className="text-white/60 text-xs">Total loop impedance</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-bold text-orange-400 text-xl mb-1">Ze</p>
                <p className="text-white/60 text-xs">External impedance</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-bold text-emerald-400 text-xl mb-1">R1+R2</p>
                <p className="text-white/60 text-xs">Circuit impedance</p>
              </div>
            </div>

            <p className="text-sm text-white/70">
              R1 = phase conductor resistance | R2 = CPC resistance
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: External vs Circuit Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            External vs Circuit Impedance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-orange-400 mb-2">Ze - External Impedance</p>
              <p className="text-sm text-white/80 mb-4">
                Everything outside your installation: supply transformer, DNO cables, service head, earthing arrangement.
                You cannot change this - it's provided by the supply.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-emerald-400 mb-2">R1+R2 - Circuit Impedance</p>
              <p className="text-sm text-white/80 mb-4">
                Your circuit wiring: phase conductor (R1) and CPC (R2). Determined by cable size and length.
                You control this through design choices.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Ze values:</p>
              <ul className="text-sm text-white/80 space-y-1 ml-4">
                <li>TN-C-S (PME): approximately 0.35 ohm</li>
                <li>TN-S: approximately 0.8 ohm</li>
                <li>TT: varies with electrode resistance</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Maximum Zs Values */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Maximum Zs Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 specifies maximum Zs values for each protective device to ensure disconnection within required times:
            </p>

            <div className="grid grid-cols-2 gap-4 my-6 text-center">
              <div className="p-4 rounded bg-transparent">
                <p className="text-3xl font-bold text-elec-yellow">0.4s</p>
                <p className="text-white/60 text-sm mt-1">Socket outlets & portable equipment</p>
              </div>
              <div className="p-4 rounded bg-transparent">
                <p className="text-3xl font-bold text-blue-400">5s</p>
                <p className="text-white/60 text-sm mt-1">Distribution circuits & fixed equipment</p>
              </div>
            </div>

            <p className="text-sm text-amber-300">
              Maximum Zs values are found in BS 7671 Chapter 41 tables. Values depend on device type and rating.
            </p>
          </div>
        </section>

        {/* Section 6: Earthing Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Earthing Systems Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">System</th>
                    <th className="text-center py-2 text-white/60">Typical Ze</th>
                    <th className="text-right py-2 text-white/60">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-elec-yellow">TN-C-S</td>
                    <td className="text-center">0.35 ohm or less</td>
                    <td className="text-right text-xs">PME, combined neutral/earth</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-blue-400">TN-S</td>
                    <td className="text-center">0.8 ohm or less</td>
                    <td className="text-right text-xs">Separate earth conductor</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-purple-400">TT</td>
                    <td className="text-center">Higher (20-200 ohm)</td>
                    <td className="text-right text-xs">Earth electrode, needs RCD</td>
                  </tr>
                </tbody>
              </table>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Check Ze First</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measure Ze at the origin before designing circuits</li>
                <li>High Ze limits how long circuits can be</li>
                <li>Use Ze to calculate maximum allowable R1+R2</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Correction</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Multiply measured R1+R2 by 1.2 for Zs verification</li>
                <li>This accounts for conductor heating under fault conditions</li>
                <li>Measured at operating temperature, calculated needs correction</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">TT Systems Warning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>On TT systems, EFLI alone often can't ensure fast enough disconnection</li>
                <li>RCD protection is essential for TT installations</li>
                <li>Earth electrode resistance can vary with soil conditions</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard
            title="Earth Fault Loop Reference"
            items={[
              { term: "Key Formula", definition: "Zs = Ze + (R1+R2)" },
              { term: "Ze", definition: "External impedance" },
              { term: "R1+R2", definition: "Circuit impedance" },
              { term: "Socket Disconnect", definition: "0.4 seconds or less" },
              { term: "Distribution Disconnect", definition: "5 seconds or less" },
              { term: "Temp Correction", definition: "x1.2 for max temp" }
            ]}
          />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Typical Ze Values</p>
                <ul className="space-y-0.5">
                  <li>TN-C-S: 0.35 ohm or less</li>
                  <li>TN-S: 0.8 ohm or less</li>
                  <li>TT: varies (20-200 ohm)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Low Zs = high fault current</li>
                  <li>High fault current = fast trip</li>
                  <li>Fast trip = shock protection</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule5Section1;
