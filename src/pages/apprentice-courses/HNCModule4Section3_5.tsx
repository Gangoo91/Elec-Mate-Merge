import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earth Fault Protection - HNC Module 4 Section 3.5";
const DESCRIPTION = "Master earth fault protection for building services: RCDs (Type AC/A/F/B), time-delayed RCDs, TN/TT system requirements, Zs verification, and additional protection requirements.";

const quickCheckQuestions = [
  {
    id: "rcd-types",
    question: "Which RCD type is required for circuits supplying variable speed drives?",
    options: ["Type AC", "Type A", "Type F", "Type B"],
    correctIndex: 2,
    explanation: "Type F RCDs are designed for circuits with variable speed drives (VSDs). They detect composite waveforms that include high-frequency components, which Type AC and Type A may not sense correctly."
  },
  {
    id: "additional-protection",
    question: "According to BS 7671, what is the maximum RCD rating for additional protection?",
    options: ["10mA", "30mA", "100mA", "300mA"],
    correctIndex: 1,
    explanation: "Regulation 415.1 requires RCDs with IΔn ≤ 30mA for additional protection against electric shock. This applies to socket outlets ≤32A, mobile equipment outdoors, and cables in walls without protection."
  },
  {
    id: "tt-system-rcd",
    question: "In a TT system, why are RCDs essential for earth fault protection?",
    options: ["Lower installation cost", "Higher fault currents", "High earth electrode resistance limits fault current", "They are not essential"],
    correctIndex: 2,
    explanation: "TT systems have high earth fault loop impedance due to earth electrode resistance. Fault currents may be too low to operate overcurrent devices quickly enough. RCDs detect the imbalance and trip regardless of fault current magnitude."
  },
  {
    id: "time-delayed-rcd",
    question: "What is the purpose of a time-delayed (Type S) RCD?",
    options: ["Faster operation", "To allow discrimination with downstream RCDs", "Higher sensitivity", "To reduce nuisance tripping from surges"],
    correctIndex: 1,
    explanation: "Time-delayed (selective) RCDs have an intentional delay (typically 150-500ms) to allow downstream instantaneous RCDs to operate first, achieving discrimination in the earth fault protection system."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a Type AC RCD detect?",
    options: [
      "AC residual currents only (sinusoidal)",
      "AC and pulsating DC residual currents",
      "Smooth DC residual currents",
      "High-frequency residual currents"
    ],
    correctAnswer: 0,
    explanation: "Type AC RCDs only detect sinusoidal AC residual currents. They may not operate correctly with DC components, making them unsuitable for circuits with electronic equipment that can produce pulsating DC faults."
  },
  {
    id: 2,
    question: "According to BS 7671, RCDs for socket outlets rated up to 20A in domestic premises must have:",
    options: [
      "IΔn ≤ 100mA",
      "IΔn ≤ 30mA",
      "IΔn ≤ 10mA",
      "No RCD requirement"
    ],
    correctAnswer: 1,
    explanation: "Regulation 411.3.3 requires additional protection by RCDs with IΔn ≤ 30mA for socket-outlets with rated current ≤ 32A intended for general use. This provides protection against direct contact in case of basic protection failure."
  },
  {
    id: 3,
    question: "In a TN-S system, what is the maximum Zs for a 32A Type B MCB with 0.4s disconnection?",
    options: [
      "0.72Ω",
      "1.15Ω",
      "1.44Ω",
      "2.30Ω"
    ],
    correctAnswer: 2,
    explanation: "From BS 7671 Table 41.3, a 32A Type B MCB requires maximum Zs of 1.44Ω for 0.4s disconnection at 230V. This ensures sufficient fault current (160A minimum) flows for guaranteed magnetic operation."
  },
  {
    id: 4,
    question: "For TT systems, the product RA × IΔn must not exceed:",
    options: [
      "25V",
      "50V",
      "120V",
      "230V"
    ],
    correctAnswer: 1,
    explanation: "Regulation 411.5.3 requires RA × IΔn ≤ 50V in TT systems, where RA is the sum of earth electrode and protective conductor resistances. This limits touch voltage during an earth fault."
  },
  {
    id: 5,
    question: "A 30mA RCD must trip within 40ms at what test current?",
    options: [
      "15mA",
      "30mA",
      "150mA (5 × IΔn)",
      "300mA"
    ],
    correctAnswer: 2,
    explanation: "At 5 × IΔn (150mA for a 30mA RCD), the maximum operating time is 40ms. This fast response at higher fault currents provides enhanced shock protection."
  },
  {
    id: 6,
    question: "Type A RCDs detect:",
    options: [
      "AC only",
      "AC and pulsating DC",
      "Smooth DC only",
      "High-frequency only"
    ],
    correctAnswer: 1,
    explanation: "Type A RCDs detect sinusoidal AC and pulsating DC residual currents. They're suitable for most modern electronic equipment which may produce pulsating DC earth faults through rectifier circuits."
  },
  {
    id: 7,
    question: "What is the minimum operating time for a time-delayed (Type S) RCD at IΔn?",
    options: [
      "40ms",
      "130ms",
      "300ms",
      "500ms"
    ],
    correctAnswer: 1,
    explanation: "Type S (selective) RCDs have a minimum non-operating time of 130ms at IΔn, ensuring they don't operate before downstream instantaneous RCDs. Maximum operating time is typically 500ms at IΔn."
  },
  {
    id: 8,
    question: "When is a 300mA RCD typically used instead of 30mA?",
    options: [
      "Socket outlet protection",
      "Fire protection for fixed equipment",
      "Bathroom circuits",
      "Outdoor equipment"
    ],
    correctAnswer: 1,
    explanation: "300mA RCDs provide fire protection by detecting earth fault currents before they generate enough heat to cause a fire. They're used for fixed equipment where 30mA additional protection isn't required."
  },
  {
    id: 9,
    question: "What is the Zs limit for a circuit protected by a 30mA RCD in a TT system?",
    options: [
      "Zs doesn't apply with RCDs",
      "RA ≤ 1667Ω (50V ÷ 30mA)",
      "Same as TN system",
      "RA ≤ 200Ω"
    ],
    correctAnswer: 1,
    explanation: "For TT systems with 30mA RCD: RA × IΔn ≤ 50V, so RA ≤ 50V ÷ 0.03A = 1667Ω maximum. This high limit is achievable with modest earth electrodes, which is why RCDs are essential for TT systems."
  },
  {
    id: 10,
    question: "Which RCD type is required for EV charging circuits according to BS 7671?",
    options: [
      "Type AC",
      "Type A",
      "Type B or Type A with additional DC protection",
      "Any type is acceptable"
    ],
    correctAnswer: 2,
    explanation: "EV chargers can produce smooth DC fault currents that Type AC and Type A cannot detect. BS 7671 requires Type B RCD or Type A with additional DC protection (6mA DC detection) for EV charging points."
  }
];

const faqs = [
  {
    question: "What's the difference between additional protection and fault protection?",
    answer: "Fault protection (automatic disconnection) operates when insulation fails and an earth fault occurs - it's the safety net when basic protection fails. Additional protection (30mA RCD) provides an extra layer that operates quickly enough to prevent fibrillation if someone touches a live part directly - it compensates for carelessness or damage to basic protection. Both are required for most final circuits."
  },
  {
    question: "When can RCDs be omitted for socket outlets?",
    answer: "BS 7671 Regulation 411.3.3 Exception allows omission of 30mA RCD protection for socket outlets in commercial/industrial premises where: the socket is for a specific item of equipment under supervision; risk assessment shows the RCD creates a greater hazard (e.g., freezers); or the outlet is labelled to indicate it's for a specific purpose only. Socket outlets in domestic premises require RCD protection without exception."
  },
  {
    question: "Why do some circuits experience nuisance RCD tripping?",
    answer: "Common causes include: cumulative earth leakage from multiple electronic devices exceeding 30mA threshold; transient surge currents during switching or lightning; faulty equipment with degraded insulation; incorrect RCD type for load (e.g., Type AC with VSD producing DC components); neutral-earth faults downstream. Solutions include distributing loads across multiple RCDs, using Type A or F devices, or investigating and fixing the underlying leakage."
  },
  {
    question: "How do I test RCDs on site?",
    answer: "Use a calibrated RCD tester that applies test current between line and earth. Test at IΔn and 5 × IΔn, recording operating time. For 30mA RCDs: at 30mA, maximum 300ms; at 150mA, maximum 40ms. Also test the integral test button (verifies mechanical operation) and no-trip test at 50% IΔn. For time-delayed RCDs, verify both minimum and maximum operating times."
  },
  {
    question: "What is RCD discrimination and how is it achieved?",
    answer: "RCD discrimination ensures only the RCD nearest the fault operates. Achieved by: 1) Current discrimination - upstream RCD has higher IΔn (e.g., 100mA upstream, 30mA downstream); 2) Time discrimination - upstream RCD is time-delayed (Type S); 3) Both together for best selectivity. A 100mA Type S upstream will discriminate with 30mA instantaneous downstream at most fault levels."
  },
  {
    question: "Do three-phase circuits need different RCD considerations?",
    answer: "Yes. Three-phase RCDs must be 4-pole (3 phases + neutral all through the device). Unbalanced loads can cause standing leakage current. Earth faults on one phase affect all three phases when the RCD trips. Consider using individual single-phase RCBOs for better discrimination. Type B RCDs for three-phase motor circuits detect all fault types including DC components from VSD rectifiers."
  }
];

const HNCModule4Section3_5 = () => {
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
            <span>Module 4.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earth Fault Protection
          </h1>
          <p className="text-white/80">
            RCD types, applications, and earth fault protection requirements for different earthing systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Type AC:</strong> Sinusoidal AC only - limited use</li>
              <li className="pl-1"><strong>Type A:</strong> AC + pulsating DC - general purpose</li>
              <li className="pl-1"><strong>Type F:</strong> AC + pulsating DC + VSD frequencies</li>
              <li className="pl-1"><strong>Type B:</strong> All types including smooth DC - EV chargers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Socket outlets:</strong> 30mA additional protection</li>
              <li className="pl-1"><strong>TT systems:</strong> RCD essential - RA × IΔn ≤ 50V</li>
              <li className="pl-1"><strong>VSDs/motors:</strong> Type F or Type B required</li>
              <li className="pl-1"><strong>Fire protection:</strong> 300mA for fixed equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Differentiate between RCD types (AC, A, F, B) and their applications",
              "Apply BS 7671 requirements for additional protection",
              "Verify earth fault protection for TN and TT systems",
              "Use time-delayed RCDs for discrimination",
              "Calculate maximum Zs and RA values for compliant installations",
              "Select appropriate RCDs for different load types"
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

        {/* Section 1: RCD Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            RCD Types and Characteristics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Residual Current Devices (RCDs) detect imbalance between line and neutral currents,
              indicating current flowing to earth. Different types detect different waveforms.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Type Classification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detects</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type AC</td>
                      <td className="border border-white/10 px-3 py-2">Sinusoidal AC only</td>
                      <td className="border border-white/10 px-3 py-2">Limited - resistive loads only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type A</td>
                      <td className="border border-white/10 px-3 py-2">AC + pulsating DC</td>
                      <td className="border border-white/10 px-3 py-2">General purpose, electronics, IT</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type F</td>
                      <td className="border border-white/10 px-3 py-2">Type A + high frequencies</td>
                      <td className="border border-white/10 px-3 py-2">VSDs, inverters, motor controls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type B</td>
                      <td className="border border-white/10 px-3 py-2">All types + smooth DC</td>
                      <td className="border border-white/10 px-3 py-2">EV chargers, 3-phase rectifiers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Sensitivity Ratings (IΔn)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">High Sensitivity (≤30mA)</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">30mA - Additional protection</li>
                    <li className="pl-1">10mA - Enhanced protection (medical)</li>
                    <li className="pl-1">Provides shock protection</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Medium Sensitivity (100-500mA)</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">100mA - Fire protection</li>
                    <li className="pl-1">300mA - Fire protection</li>
                    <li className="pl-1">500mA - Sub-main protection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Operating Times</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">General (instantaneous)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type S (time-delayed)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IΔn</td>
                      <td className="border border-white/10 px-3 py-2">≤300ms</td>
                      <td className="border border-white/10 px-3 py-2">130ms - 500ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2 × IΔn</td>
                      <td className="border border-white/10 px-3 py-2">≤150ms</td>
                      <td className="border border-white/10 px-3 py-2">60ms - 200ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5 × IΔn</td>
                      <td className="border border-white/10 px-3 py-2">≤40ms</td>
                      <td className="border border-white/10 px-3 py-2">50ms - 150ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.5 × IΔn</td>
                      <td className="border border-white/10 px-3 py-2" colSpan={2}>Must NOT trip</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection guide:</strong> Type A minimum for most applications. Type F for VSD circuits. Type B for EV charging and three-phase rectifiers.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Additional Protection Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Additional Protection (Regulation 415)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Additional protection using 30mA RCDs is required as a secondary measure for certain
              circuits where there's increased risk of direct contact or where basic protection may
              be compromised.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuits Requiring 30mA RCD Protection</p>
              <div className="p-4 rounded-lg bg-white/5">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Socket outlets with rated current ≤32A</li>
                  <li className="pl-1">Mobile equipment used outdoors with current ≤32A</li>
                  <li className="pl-1">Cables installed in walls at depth &lt;50mm without mechanical protection</li>
                  <li className="pl-1">Cables in walls/partitions containing metal parts (any depth)</li>
                  <li className="pl-1">Circuits in locations with increased shock risk (bathrooms, etc.)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Regulation 411.3.3 Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Domestic sockets</td>
                      <td className="border border-white/10 px-3 py-2">30mA RCD mandatory</td>
                      <td className="border border-white/10 px-3 py-2">All socket outlets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commercial sockets ≤32A</td>
                      <td className="border border-white/10 px-3 py-2">30mA RCD mandatory</td>
                      <td className="border border-white/10 px-3 py-2">Unless specific exemption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outdoor equipment</td>
                      <td className="border border-white/10 px-3 py-2">30mA RCD mandatory</td>
                      <td className="border border-white/10 px-3 py-2">Mobile equipment ≤32A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cables in walls</td>
                      <td className="border border-white/10 px-3 py-2">30mA RCD if shallow</td>
                      <td className="border border-white/10 px-3 py-2">&lt;50mm or metal present</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Exemptions from 30mA</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Specific labelled socket (supervised use)</li>
                  <li className="pl-1">Risk assessment shows RCD creates hazard</li>
                  <li className="pl-1">FELV circuits</li>
                  <li className="pl-1">Certain industrial applications</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Exemption Examples</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Freezer circuit (labelled socket)</li>
                  <li className="pl-1">Fire alarm supply</li>
                  <li className="pl-1">Emergency lighting feed</li>
                  <li className="pl-1">Medical equipment circuits</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Additional protection is NOT a substitute for fault protection - both must be provided where required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: TN and TT System Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            TN and TT System Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earth fault protection requirements differ significantly between TN systems (where the
              supply network provides the earth return) and TT systems (where a local earth electrode
              is used).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TN System Earth Fault Protection</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  In TN systems, earth fault loop impedance is low because the return path is through
                  the supply neutral. Overcurrent devices can provide earth fault protection if Zs
                  is low enough.
                </p>
                <div className="font-mono text-center text-lg mb-2">
                  Zs ≤ U<sub>o</sub> / I<sub>a</sub>
                </div>
                <p className="text-xs text-white/70 text-center">
                  Where Ia is the current causing automatic disconnection in required time
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TN System Maximum Zs Values (230V, 0.4s)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">6A</th>
                      <th className="border border-white/10 px-3 py-2 text-left">16A</th>
                      <th className="border border-white/10 px-3 py-2 text-left">32A</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type B MCB</td>
                      <td className="border border-white/10 px-3 py-2">7.67Ω</td>
                      <td className="border border-white/10 px-3 py-2">2.87Ω</td>
                      <td className="border border-white/10 px-3 py-2">1.44Ω</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type C MCB</td>
                      <td className="border border-white/10 px-3 py-2">3.83Ω</td>
                      <td className="border border-white/10 px-3 py-2">1.44Ω</td>
                      <td className="border border-white/10 px-3 py-2">0.72Ω</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type D MCB</td>
                      <td className="border border-white/10 px-3 py-2">1.92Ω</td>
                      <td className="border border-white/10 px-3 py-2">0.72Ω</td>
                      <td className="border border-white/10 px-3 py-2">0.36Ω</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TT System Earth Fault Protection</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  In TT systems, the earth fault path includes the installation's earth electrode
                  resistance (RA), which is typically much higher than the TN metallic path.
                  RCDs are almost always required.
                </p>
                <div className="font-mono text-center text-lg mb-2">
                  R<sub>A</sub> × I<sub>Δn</sub> ≤ 50V
                </div>
                <p className="text-xs text-white/70 text-center">
                  This limits touch voltage on exposed-conductive-parts during a fault
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TT System Maximum RA Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">RCD Rating (IΔn)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maximum RA</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30mA</td>
                      <td className="border border-white/10 px-3 py-2">1667Ω</td>
                      <td className="border border-white/10 px-3 py-2">Final circuits with additional protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100mA</td>
                      <td className="border border-white/10 px-3 py-2">500Ω</td>
                      <td className="border border-white/10 px-3 py-2">Fire protection, sub-distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">300mA</td>
                      <td className="border border-white/10 px-3 py-2">166Ω</td>
                      <td className="border border-white/10 px-3 py-2">Fire protection only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">500mA</td>
                      <td className="border border-white/10 px-3 py-2">100Ω</td>
                      <td className="border border-white/10 px-3 py-2">Main incomer protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> TT systems require RCDs because fault currents are typically too low to operate overcurrent devices within required times.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Time-Delayed RCDs and Discrimination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Time-Delayed RCDs and Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Time-delayed (selective or Type S) RCDs allow discrimination in earth fault protection
              systems by deliberately delaying operation to let downstream RCDs trip first.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Discrimination Methods</p>
              <div className="p-4 rounded-lg bg-white/5">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Current discrimination:</strong> Upstream IΔn &gt; downstream IΔn (e.g., 100mA vs 30mA)</li>
                  <li className="pl-1"><strong>Time discrimination:</strong> Upstream Type S (delayed) vs downstream instantaneous</li>
                  <li className="pl-1"><strong>Combined:</strong> Both current and time - most reliable</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Discrimination Arrangement</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RCD Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">IΔn</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main incomer</td>
                      <td className="border border-white/10 px-3 py-2">Type S (delayed)</td>
                      <td className="border border-white/10 px-3 py-2">300mA</td>
                      <td className="border border-white/10 px-3 py-2">300-500ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sub-distribution</td>
                      <td className="border border-white/10 px-3 py-2">Type S (delayed)</td>
                      <td className="border border-white/10 px-3 py-2">100mA</td>
                      <td className="border border-white/10 px-3 py-2">150-200ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final circuits</td>
                      <td className="border border-white/10 px-3 py-2">Instantaneous</td>
                      <td className="border border-white/10 px-3 py-2">30mA</td>
                      <td className="border border-white/10 px-3 py-2">&lt;40ms @ 5×IΔn</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Only affected circuit trips</li>
                  <li className="pl-1">Supply maintained to other circuits</li>
                  <li className="pl-1">Easier fault location</li>
                  <li className="pl-1">Reduced disruption</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Verification</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Check time characteristics overlap</li>
                  <li className="pl-1">Allow 50ms minimum margin</li>
                  <li className="pl-1">Consider current ranges</li>
                  <li className="pl-1">Test on site with calibrated tester</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCBO vs Split-Load Boards</p>
              <p className="text-sm text-white/90">
                RCBOs (combined RCD + MCB) offer better discrimination than split-load boards because
                each circuit has independent RCD protection. A fault on one circuit doesn't affect
                others. Split-load boards with shared RCDs will disconnect all circuits on that RCD
                for any single circuit fault.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design consideration:</strong> For critical installations, use individual RCBOs or dedicated RCDs per circuit to maximise discrimination and supply availability.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: TN System Zs Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 32A Type B MCB protects a circuit with measured Zs = 0.85Ω at the furthest point. Is disconnection time adequate?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>From BS 7671 Table 41.3:</p>
                <p>32A Type B MCB max Zs = <strong>1.44Ω</strong> for 0.4s</p>
                <p className="mt-2">Apply temperature correction:</p>
                <p>Design Zs = 0.85 × 1.2 = <strong>1.02Ω</strong></p>
                <p className="mt-2">1.02Ω &lt; 1.44Ω <span className="text-green-400">✓</span></p>
                <p className="mt-2 text-green-400">✓ Disconnection time adequate</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: TT System RCD Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A TT installation has earth electrode resistance RA = 85Ω. What RCD rating is required for fault protection?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Requirement: RA × IΔn ≤ 50V</p>
                <p className="mt-2">Rearranging: IΔn ≤ 50V / RA</p>
                <p>IΔn ≤ 50 / 85 = <strong>0.588A = 588mA</strong></p>
                <p className="mt-2">Options available:</p>
                <p>- 500mA: 85 × 0.5 = 42.5V &lt; 50V <span className="text-green-400">✓</span></p>
                <p>- 300mA: 85 × 0.3 = 25.5V &lt; 50V <span className="text-green-400">✓</span></p>
                <p>- 100mA: 85 × 0.1 = 8.5V &lt; 50V <span className="text-green-400">✓</span></p>
                <p>- 30mA: 85 × 0.03 = 2.55V &lt; 50V <span className="text-green-400">✓</span></p>
                <p className="mt-2 text-white/60">→ 30mA provides best protection and additional protection</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: RCD Type Selection for VSD Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 7.5kW variable speed drive supplies an AHU fan. What RCD type is required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>VSD characteristics:</p>
                <p>- Rectifier stage produces DC components</p>
                <p>- PWM output creates high-frequency components</p>
                <p>- Earth faults may include smooth DC</p>
                <p className="mt-2">RCD type analysis:</p>
                <p>- Type AC: Detects AC only <span className="text-red-400">✗ Not suitable</span></p>
                <p>- Type A: AC + pulsating DC <span className="text-yellow-400">⚠ Marginal</span></p>
                <p>- Type F: AC + pulsating DC + HF <span className="text-green-400">✓ Suitable</span></p>
                <p>- Type B: All types including smooth DC <span className="text-green-400">✓ Best</span></p>
                <p className="mt-2 text-green-400">→ Select Type F minimum, Type B preferred</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Selection Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>General circuits:</strong> Type A, 30mA</li>
                <li className="pl-1"><strong>VSD/inverter:</strong> Type F minimum, 30mA</li>
                <li className="pl-1"><strong>EV charging:</strong> Type B, or Type A + 6mA DC</li>
                <li className="pl-1"><strong>Fire protection:</strong> Type A, 100-300mA</li>
                <li className="pl-1"><strong>Discrimination:</strong> Type S (time-delayed) upstream</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Additional protection: <strong>≤30mA</strong></li>
                <li className="pl-1">TT requirement: <strong>RA × IΔn ≤ 50V</strong></li>
                <li className="pl-1">30mA RCD max trip time at 150mA: <strong>40ms</strong></li>
                <li className="pl-1">Type S minimum delay at IΔn: <strong>130ms</strong></li>
                <li className="pl-1">No-trip test current: <strong>0.5 × IΔn</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Type AC for electronics</strong> — Use Type A minimum</li>
                <li className="pl-1"><strong>Ignoring RCD type for VSDs</strong> — Need Type F or B</li>
                <li className="pl-1"><strong>TT without RCD</strong> — Almost always required</li>
                <li className="pl-1"><strong>No discrimination planning</strong> — Multiple RCDs need coordination</li>
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
                <p className="font-medium text-white mb-1">RCD Types</p>
                <ul className="space-y-0.5">
                  <li>Type AC: Sinusoidal AC only</li>
                  <li>Type A: AC + pulsating DC</li>
                  <li>Type F: Type A + VSD frequencies</li>
                  <li>Type B: All including smooth DC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">System Requirements</p>
                <ul className="space-y-0.5">
                  <li>TN: Verify Zs ≤ maximum for device</li>
                  <li>TT: RA × IΔn ≤ 50V (RCD essential)</li>
                  <li>Additional: ≤30mA for sockets etc.</li>
                  <li>Fire protection: 100-300mA</li>
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
            <Link to="../h-n-c-module4-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Discrimination and Coordination
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section3-6">
              Next: Arc Fault Detection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section3_5;
