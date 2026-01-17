import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Prospective Fault Current - Module 5 Section 5";
const DESCRIPTION = "Understanding and calculating prospective fault current (PSCC/PFC) for protective device selection.";

const quickCheckQuestions = [
  {
    id: "pscc-calculation",
    question: "If Zs = 0.5Ω, the PSCC is:",
    options: ["115A", "230A", "460A", "920A"],
    correctIndex: 2,
    explanation: "Ipf = Uo / Zs = 230V / 0.5Ω = 460A"
  },
  {
    id: "breaking-capacity",
    question: "Protective device breaking capacity must be:",
    options: [
      "Equal to PSCC",
      "Less than PSCC",
      "Greater than PSCC",
      "Double the PSCC"
    ],
    correctIndex: 2,
    explanation: "Breaking capacity must exceed PSCC to safely interrupt maximum possible fault current."
  },
  {
    id: "pscc-location",
    question: "PSCC is highest at:",
    options: [
      "The furthest point from supply",
      "The origin of the installation",
      "All points are equal",
      "Only socket outlets"
    ],
    correctIndex: 1,
    explanation: "PSCC is highest at the origin where impedance is lowest. It decreases along circuits as impedance increases."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Prospective fault current is:",
    options: [
      "Normal load current",
      "Maximum current during a short circuit",
      "Current during insulation test",
      "Leakage current"
    ],
    correctAnswer: 1,
    explanation: "PSCC is the maximum fault current that could flow during a short circuit at a given point."
  },
  {
    id: 2,
    question: "The formula for calculating PSCC is:",
    options: ["Ipf = Uo × Zs", "Ipf = Uo / Zs", "Ipf = Zs / Uo", "Ipf = Uo - Zs"],
    correctAnswer: 1,
    explanation: "Ipf = Uo / Zs (Ohm's Law). Where Uo is nominal voltage (230V) and Zs is earth fault loop impedance."
  },
  {
    id: 3,
    question: "If Zs = 0.5Ω, the PSCC is:",
    options: ["115A", "230A", "460A", "920A"],
    correctAnswer: 2,
    explanation: "Ipf = 230V / 0.5Ω = 460A"
  },
  {
    id: 4,
    question: "Protective device breaking capacity must be:",
    options: [
      "Equal to PSCC",
      "Less than PSCC",
      "Greater than PSCC",
      "Double the PSCC"
    ],
    correctAnswer: 2,
    explanation: "Breaking capacity must exceed PSCC to safely interrupt the maximum possible fault current without damage."
  },
  {
    id: 5,
    question: "Typical domestic PSCC is:",
    options: ["<500A", "1-3kA", "10-20kA", ">50kA"],
    correctAnswer: 1,
    explanation: "Domestic supplies typically have PSCC of 1-3kA, well within standard 6kA MCB breaking capacity."
  },
  {
    id: 6,
    question: "PSCC is highest at:",
    options: [
      "The furthest point from supply",
      "The origin of the installation",
      "All points are equal",
      "Only socket outlets"
    ],
    correctAnswer: 1,
    explanation: "PSCC is highest at the origin where impedance is lowest. It decreases along circuits as impedance increases."
  },
  {
    id: 7,
    question: "Standard domestic MCBs have breaking capacity of:",
    options: ["1kA", "3kA", "6kA", "10kA"],
    correctAnswer: 2,
    explanation: "Standard domestic MCBs (Type B/C) typically have 6kA (6000A) breaking capacity."
  },
  {
    id: 8,
    question: "If PSCC exceeds device breaking capacity:",
    options: [
      "It's acceptable",
      "The device may fail catastrophically during a fault",
      "The circuit will work normally",
      "Only labelling is needed"
    ],
    correctAnswer: 1,
    explanation: "If PSCC exceeds breaking capacity, the device may explode, burn, or fail to clear the fault - creating serious hazards."
  },
  {
    id: 9,
    question: "PSCC should be recorded on:",
    options: [
      "Only new installations",
      "Only industrial sites",
      "All electrical certificates at the origin",
      "Only TT systems"
    ],
    correctAnswer: 2,
    explanation: "PSCC at the origin must be recorded on Electrical Installation Certificates and Periodic Inspection Reports."
  },
  {
    id: 10,
    question: "Lower Zs means:",
    options: [
      "Lower PSCC",
      "Higher PSCC",
      "No effect on PSCC",
      "Zero PSCC"
    ],
    correctAnswer: 1,
    explanation: "Lower Zs allows more current to flow (Ipf = V/Z). Lower impedance = higher prospective fault current."
  }
];

const faqs = [
  {
    question: "Why is PSCC important?",
    answer: "If a short circuit occurs, the fault current must be interrupted by the protective device. If fault current exceeds the device's breaking capacity, the device may fail catastrophically - potentially causing fire, explosion, or continuing the fault."
  },
  {
    question: "What's the difference between PSCC and PEFC?",
    answer: "PSCC (Prospective Short Circuit Current) is the fault current for a line-neutral fault. PEFC (Prospective Earth Fault Current) is for a line-earth fault. PSCC is usually higher because neutral impedance is typically lower than earth path impedance."
  },
  {
    question: "Where is PSCC measured?",
    answer: "PSCC should be measured or calculated at the origin of the installation (highest value) and at each distribution board. The value decreases along circuit lengths as impedance increases."
  },
  {
    question: "What breaking capacity do domestic MCBs have?",
    answer: "Standard domestic MCBs typically have 6kA breaking capacity (Icn). Most domestic supplies have PSCC well under 6kA (typically 1-3kA). Industrial MCBs may have 10kA or higher ratings."
  },
  {
    question: "Can I calculate PSCC from Zs?",
    answer: "Yes: Ipf = Uo / Zs where Uo = 230V. For example, if Zs = 0.5Ω: Ipf = 230 / 0.5 = 460A. Modern testers often display PSCC directly as well as impedance."
  },
  {
    question: "What if PSCC exceeds device rating?",
    answer: "The protective device is inadequate. Options: use a device with higher breaking capacity, add upstream back-up protection (e.g., fuse), or introduce impedance to limit fault current. This is critical for safety."
  }
];

const InspectionTestingModule5Section5 = () => {
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

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Prospective Fault Current
          </h1>
          <p className="text-white/80">
            Understanding PSCC calculation and protective device selection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>PSCC:</strong> Maximum current during a short circuit</li>
              <li><strong>Formula:</strong> Ipf = Uo / Zs (230V / impedance)</li>
              <li><strong>Devices:</strong> Breaking capacity must exceed PSCC</li>
              <li><strong>Critical:</strong> Device failure if capacity exceeded</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Typical Values</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Domestic:</strong> 1-3kA typical at origin</li>
              <li><strong>MCB Capacity:</strong> 6kA standard domestic</li>
              <li><strong>Industrial:</strong> 10kA+ may be needed</li>
              <li><strong>Record:</strong> On EIC/EICR at origin</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what prospective fault current is",
              "Calculate PSCC using Ipf = Uo / Zs",
              "Match protective devices to breaking capacity",
              "Know measurement methods for PSCC",
              "Record values correctly on certificates",
              "Recognise typical domestic and industrial values"
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

        {/* Section 1: What is PSCC? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is PSCC?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Prospective Short Circuit Current (PSCC)</strong> is the maximum
              current that would flow if a short circuit occurred at a specific point in the installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Why It Matters</p>
              <p className="text-sm text-white/70">
                Protective devices must be able to safely interrupt this current. If PSCC exceeds the device's
                breaking capacity, the device could explode, burn, or fail to clear the fault.
              </p>
            </div>

            <p className="text-sm text-white/60">
              PSCC is sometimes referred to as PFC (Prospective Fault Current) or If (fault current).
            </p>
          </div>
        </section>

        {/* Section 2: The Calculation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 text-center">
              <p className="text-2xl font-mono text-elec-yellow mb-2">Ipf = Uo / Zs</p>
              <p className="text-sm text-white/60">Prospective Fault Current = Voltage / Impedance</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example Calculation:</p>
              <p className="text-sm text-white/70 font-mono">
                Uo = 230V (nominal voltage)<br />
                Zs = 0.5Ω (measured impedance)<br />
                Ipf = 230 / 0.5 = <span className="text-elec-yellow">460A</span>
              </p>
            </div>

            <p className="text-sm text-white/60">
              At the origin where Zs may be 0.1Ω: Ipf = 230 / 0.1 = 2300A (2.3kA)
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Breaking Capacity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Breaking Capacity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every protective device has a maximum current it can safely interrupt:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Device Type</th>
                    <th className="text-right py-2 text-white/60">Typical Icn</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2">Domestic MCB</td>
                    <td className="text-right font-mono text-elec-yellow">6kA</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Commercial MCB</td>
                    <td className="text-right font-mono text-blue-400">10kA</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Industrial MCCB</td>
                    <td className="text-right font-mono text-purple-400">25-150kA</td>
                  </tr>
                  <tr>
                    <td className="py-2">HRC Fuse (BS 88)</td>
                    <td className="text-right font-mono text-emerald-400">80kA+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-emerald-400">
              Device breaking capacity must EXCEED measured/calculated PSCC
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Measurement vs Calculation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Measurement vs Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow mb-2">Direct Measurement</p>
                <p className="text-sm text-white/70">
                  Modern multifunction testers can measure and display PSCC directly (often labelled PFC or I fault).
                  This is the quickest method.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-400 mb-2">Calculation from Zs</p>
                <p className="text-sm text-white/70">
                  If your meter shows only impedance, calculate: Ipf = 230 / Zs.
                  Remember to use the lowest Zs (highest PSCC) point.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Typical Domestic Values */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Typical Domestic Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>For most domestic installations:</p>

            <div className="my-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">At Origin (Ze approximately 0.35Ω)</span>
                <span className="text-white font-mono">~650A</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Typical Range</span>
                <span className="text-white font-mono">1-3kA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Standard MCB Capacity</span>
                <span className="text-emerald-400 font-mono">6kA</span>
              </div>
            </div>

            <p className="text-sm text-white/70">
              Domestic PSCC rarely exceeds 3kA, so standard 6kA MCBs are adequate.
              Higher values may occur close to transformers.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Recording PSCC */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording PSCC
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>PSCC must be recorded on certificates:</p>

            <ul className="text-sm text-white space-y-2 my-6">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Electrical Installation Certificate (EIC)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Periodic Inspection Report (EICR/PIR)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Recorded at the origin of the installation
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Also record at distribution boards if significantly different
              </li>
            </ul>

            <p className="text-sm text-white/70">
              <strong className="text-elec-yellow">Format:</strong> Record as "PSCC: 2.3kA" or "PFC: 2300A" at origin.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Check at Origin</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always measure PSCC at the origin - it's the highest value</li>
                <li>Determines minimum device ratings needed throughout</li>
                <li>Record on all certification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Use Direct Measurement</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Modern testers display PSCC directly</li>
                <li>Quicker than calculating from Zs</li>
                <li>Check your meter's capabilities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Industrial Sites</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Close to transformers, PSCC can exceed 6kA</li>
                <li>Check and specify appropriate device ratings</li>
                <li>Consider backup protection requirements</li>
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
            title="PSCC Quick Reference"
            items={[
              { term: "Formula", definition: "Ipf = Uo / Zs" },
              { term: "Uo (UK)", definition: "230V nominal" },
              { term: "Domestic MCB", definition: "6kA breaking capacity" },
              { term: "Typical Domestic", definition: "1-3kA at origin" },
              { term: "Record On", definition: "EIC/EICR at origin" },
              { term: "Requirement", definition: "Icn > PSCC" }
            ]}
          />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Formula</p>
                <ul className="space-y-0.5">
                  <li>PSCC = 230V / Zs</li>
                  <li>Lower Zs = Higher PSCC</li>
                  <li>Highest at origin</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Breaking Capacity</p>
                <ul className="space-y-0.5">
                  <li>Domestic MCB: 6kA</li>
                  <li>Commercial: 10kA</li>
                  <li>Must exceed PSCC</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule5Section5;
