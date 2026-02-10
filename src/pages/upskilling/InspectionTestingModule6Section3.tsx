import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "RCD Ramp Testing - Module 6 Section 3";
const DESCRIPTION = "Master RCD ramp testing techniques to determine actual trip current sensitivity and verify RCD performance meets BS 7671 requirements.";

const quickCheckQuestions = [
  {
    id: "ramp-range",
    question: "A 30mA RCD trips at 22mA during ramp testing. Is this acceptable?",
    options: [
      "No - too sensitive",
      "Yes - within 15-30mA range (50-100%)",
      "No - should be exactly 30mA",
      "Cannot determine"
    ],
    correctIndex: 1,
    explanation: "Yes, this is acceptable. 22mA falls within the required range of 15mA (50%) to 30mA (100%) of the rated 30mA IΔn."
  },
  {
    id: "ramp-discrimination",
    question: "Why is ramp testing particularly useful when multiple RCDs are installed in series?",
    options: [
      "It's faster than other tests",
      "It reveals actual trip sensitivity for discrimination verification",
      "It's required by regulations",
      "It tests MCB function too"
    ],
    correctIndex: 1,
    explanation: "Ramp testing reveals the actual trip sensitivity of each RCD, allowing verification that upstream RCDs have higher trip thresholds than downstream ones for correct discrimination."
  },
  {
    id: "ramp-baseline",
    question: "What advantage does recording actual ramp test values provide over recording just pass/fail?",
    options: [
      "It's faster to record",
      "Creates baseline for detecting degradation over time",
      "Required by BS 7671",
      "No advantage"
    ],
    correctIndex: 1,
    explanation: "Recording actual values creates a baseline for comparison during future inspections, allowing detection of sensitivity changes or degradation that might not yet cause a fail but indicate developing problems."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does RCD ramp testing determine?",
    options: [
      "The disconnection time at rated residual current",
      "The actual residual current at which the RCD trips",
      "The maximum earth fault loop impedance",
      "The insulation resistance of the circuit"
    ],
    correctAnswer: 1,
    explanation: "Ramp testing gradually increases the residual current until the RCD trips, determining the actual trip current rather than just whether it trips within time at rated current."
  },
  {
    id: 2,
    question: "For a 30mA RCD, what is the acceptable ramp test trip current range?",
    options: [
      "0 to 15mA",
      "15mA to 30mA",
      "30mA to 45mA",
      "30mA to 60mA"
    ],
    correctAnswer: 1,
    explanation: "A 30mA RCD must trip between 50% and 100% of its rated residual current (IΔn), so between 15mA and 30mA. This range confirms proper sensitivity."
  },
  {
    id: 3,
    question: "What starting current is typically used for a ramp test?",
    options: [
      "100% of IΔn",
      "50% of IΔn",
      "Zero or very low current",
      "5 times IΔn"
    ],
    correctAnswer: 2,
    explanation: "Ramp testing starts from zero or very low current and gradually increases until the RCD trips. This determines the actual trip threshold."
  },
  {
    id: 4,
    question: "Why might an RCD trip at a lower current than its rated IΔn?",
    options: [
      "The RCD is faulty and should be replaced",
      "This is normal - RCDs can trip from 50% to 100% of IΔn",
      "The test equipment is not calibrated correctly",
      "There is excessive standing leakage on the circuit"
    ],
    correctAnswer: 1,
    explanation: "BS EN 61008 and 61009 require RCDs to trip at any current between 50% and 100% of rated IΔn. Tripping at lower values within this range is normal and expected."
  },
  {
    id: 5,
    question: "What does ramp testing reveal that standard trip time testing does not?",
    options: [
      "Whether the RCD will trip at 5xIΔn",
      "The actual sensitivity/trip threshold of the RCD",
      "The disconnection time at rated current",
      "The test button functionality"
    ],
    correctAnswer: 1,
    explanation: "Standard testing only confirms the RCD trips within time at rated current. Ramp testing reveals the actual trip threshold, showing how sensitive the RCD actually is."
  },
  {
    id: 6,
    question: "If a 100mA RCD trips at 40mA during a ramp test, what is the conclusion?",
    options: [
      "The RCD is faulty - sensitivity too high",
      "The RCD passes - 40mA is between 50% and 100% of 100mA",
      "The RCD fails - should trip closer to 100mA",
      "Retest required - result is inconclusive"
    ],
    correctAnswer: 0,
    explanation: "40mA is below 50mA (50% of 100mA). This RCD is operating outside its acceptable range and is either faulty or there is standing leakage affecting the result."
  },
  {
    id: 7,
    question: "When is ramp testing particularly important?",
    options: [
      "On every circuit during EICR testing",
      "When assessing discrimination between series RCDs",
      "Only on new installations",
      "When the RCD test button doesn't work"
    ],
    correctAnswer: 1,
    explanation: "Ramp testing is particularly valuable when assessing discrimination (selectivity) between upstream and downstream RCDs to ensure correct sequential tripping."
  },
  {
    id: 8,
    question: "What rate should the test current increase during a ramp test?",
    options: [
      "Instantaneously to rated current",
      "Very slowly - typically over 2 seconds or more",
      "Within 40ms",
      "As fast as possible"
    ],
    correctAnswer: 1,
    explanation: "Ramp testing uses a gradually increasing current, typically rising over 2 seconds or more, to accurately determine the actual trip threshold."
  },
  {
    id: 9,
    question: "A 300mA RCD trips at 280mA during ramp testing. Is this acceptable?",
    options: [
      "No - should trip between 150mA and 200mA",
      "Yes - 280mA is between 150mA (50%) and 300mA (100%)",
      "No - should trip closer to 150mA for safety",
      "Yes - but only if trip time is under 40ms"
    ],
    correctAnswer: 1,
    explanation: "280mA is within the acceptable range of 150mA to 300mA (50% to 100% of rated 300mA IΔn), so the RCD passes the ramp test."
  },
  {
    id: 10,
    question: "What should be recorded from a ramp test?",
    options: [
      "Only pass or fail",
      "The actual trip current in milliamps",
      "The time taken to reach trip current",
      "The number of test attempts"
    ],
    correctAnswer: 1,
    explanation: "The actual trip current (in mA) should be recorded from ramp testing. This provides valuable information about the RCD's actual sensitivity for future comparison."
  }
];

const faqs = [
  {
    question: "What is the difference between ramp testing and standard RCD testing?",
    answer: "Standard RCD testing applies the full rated residual current (IΔn) and measures disconnection time. Ramp testing gradually increases current from zero until the RCD trips, revealing the actual trip threshold. Both tests serve different purposes - standard testing confirms trip time compliance, while ramp testing reveals actual sensitivity."
  },
  {
    question: "Is ramp testing mandatory for every RCD?",
    answer: "Ramp testing is not mandatory for every RCD test. However, it's valuable when assessing discrimination between series RCDs, investigating nuisance tripping, or when detailed knowledge of RCD sensitivity is required. Standard trip time testing is the primary requirement."
  },
  {
    question: "Why do RCDs have a 50% to 100% trip range?",
    answer: "This tolerance range accounts for manufacturing variations and ensures safety while preventing nuisance tripping. RCDs must trip before reaching rated current (100%) but are permitted to trip at any current from 50% upward. This ensures protection while allowing reasonable manufacturing tolerance."
  },
  {
    question: "Can ramp testing damage an RCD?",
    answer: "No, ramp testing does not damage RCDs when performed correctly with appropriate test equipment. The test uses the same fault currents the RCD is designed to detect and interrupt. However, excessive repeated testing over a short period should be avoided."
  },
  {
    question: "How does standing leakage affect ramp test results?",
    answer: "Standing earth leakage current on the circuit adds to the test current, potentially causing the RCD to trip at a lower applied test current than expected. For accurate results, either account for measured standing leakage or disconnect loads that contribute to leakage current."
  },
  {
    question: "What if the ramp test result is outside the 50-100% range?",
    answer: "If an RCD trips below 50% of IΔn, check for excessive standing leakage or consider if the RCD is oversensitive. If it doesn't trip until above 100% of IΔn, the RCD is faulty and must be replaced as it doesn't provide adequate protection."
  }
];

const InspectionTestingModule6Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6">
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
            <span>Module 6 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RCD Ramp Testing
          </h1>
          <p className="text-white/80">
            Determine the actual trip current sensitivity of RCDs
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Find actual trip current, not just time</li>
              <li><strong>Range:</strong> Must trip between 50-100% of IΔn</li>
              <li><strong>30mA RCD:</strong> Acceptable range 15-30mA</li>
              <li><strong>Use:</strong> Discrimination assessment</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Values</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>30mA RCD:</strong> 15-30mA acceptable</li>
              <li><strong>100mA RCD:</strong> 50-100mA acceptable</li>
              <li><strong>300mA RCD:</strong> 150-300mA acceptable</li>
              <li><strong>Ramp Duration:</strong> ≥2 seconds typical</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and principles of ramp testing",
              "Perform ramp tests using appropriate test equipment",
              "Interpret ramp test results and sensitivity ranges",
              "Identify when ramp testing is required vs standard testing",
              "Compare ramp testing with fixed current testing",
              "Document ramp test results correctly"
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

        {/* Section 1: Understanding Ramp Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Ramp Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ramp testing is an advanced RCD test method that gradually increases the applied residual
              current from zero until the RCD trips. Unlike standard testing which applies a fixed current
              and measures time, ramp testing reveals the actual current at which the RCD operates.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Ramp Testing Reveals:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Actual trip threshold (not just pass/fail)</li>
                <li>RCD sensitivity for discrimination purposes</li>
                <li>Changes in RCD performance over time</li>
                <li>Potential nuisance tripping issues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Acceptable Trip Current Ranges */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Acceptable Trip Current Ranges
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS EN 61008 and 61009 specify that RCDs must trip at any residual current between 50%
              and 100% of their rated residual current (IΔn):
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">RCD Rating</th>
                    <th className="text-left py-2 text-white/60">Acceptable Range</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-elec-yellow">30mA</td>
                    <td className="py-2 font-mono">15mA - 30mA</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-cyan-400">100mA</td>
                    <td className="py-2 font-mono">50mA - 100mA</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-amber-400">300mA</td>
                    <td className="py-2 font-mono">150mA - 300mA</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-purple-400">500mA</td>
                    <td className="py-2 font-mono">250mA - 500mA</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-white/80">
              An RCD tripping at any current within its range is functioning correctly. The wide tolerance
              accounts for manufacturing variations whilst ensuring protection is provided.
            </p>
          </div>
        </section>

        {/* RCD Test Connection Diagram */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
          <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">Diagram</p>
          <h4 className="text-sm font-bold text-white mb-4">RCD Test Connection — Trip Time &amp; Ramp Testing</h4>
          <svg viewBox="0 0 800 360" className="w-full h-auto" role="img" aria-label="RCD test connection diagram showing tester connected between line and protective earth at a socket outlet downstream of the RCD">
            {/* Consumer Unit */}
            <rect x="40" y="40" width="160" height="200" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <text x="120" y="62" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="bold">CONSUMER UNIT</text>

            {/* RCD Device */}
            <rect x="65" y="80" width="110" height="60" rx="6" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.3)" strokeWidth="1.5" />
            <text x="120" y="100" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">RCD 30mA</text>
            <text x="120" y="116" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">Type A</text>
            {/* RCD test button */}
            <rect x="90" y="125" width="60" height="12" rx="3" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
            <text x="120" y="134" textAnchor="middle" fill="rgba(251,191,36,0.6)" fontSize="7">TEST BUTTON</text>

            {/* MCB */}
            <rect x="80" y="155" width="80" height="35" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <text x="120" y="176" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">MCB B32</text>

            {/* MET */}
            <rect x="80" y="200" width="80" height="25" rx="4" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
            <text x="120" y="217" textAnchor="middle" fill="#22C55E" fontSize="9">MET</text>

            {/* Cable run */}
            <line x1="200" y1="100" x2="420" y2="100" stroke="#EF4444" strokeWidth="2" />
            <text x="310" y="92" textAnchor="middle" fill="#EF4444" fontSize="9">Line</text>
            <line x1="200" y1="120" x2="420" y2="120" stroke="#3B82F6" strokeWidth="2" />
            <text x="310" y="135" textAnchor="middle" fill="#3B82F6" fontSize="9">Neutral</text>
            <line x1="160" y1="225" x2="300" y2="225" stroke="#22C55E" strokeWidth="2" />
            <line x1="300" y1="225" x2="300" y2="170" stroke="#22C55E" strokeWidth="2" />
            <line x1="300" y1="170" x2="420" y2="170" stroke="#22C55E" strokeWidth="2" />
            <text x="310" y="180" textAnchor="middle" fill="#22C55E" fontSize="9">CPC</text>

            {/* Socket outlet */}
            <rect x="420" y="70" width="130" height="120" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <text x="485" y="90" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="bold">SOCKET OUTLET</text>
            {/* Socket face */}
            <rect x="450" y="100" width="70" height="50" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="467" y="130" fill="#EF4444" fontSize="9" fontWeight="bold">L</text>
            <text x="503" y="130" fill="#3B82F6" fontSize="9" fontWeight="bold">N</text>
            <text x="485" y="116" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">E</text>

            {/* RCD Tester */}
            <rect x="590" y="90" width="170" height="130" rx="10" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.3)" strokeWidth="2" />
            <text x="675" y="115" textAnchor="middle" fill="#FBBF24" fontSize="12" fontWeight="bold">RCD TESTER</text>
            {/* Tester display */}
            <rect x="620" y="125" width="110" height="35" rx="4" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="675" y="147" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">22ms</text>
            {/* Tester controls */}
            <text x="635" y="180" fill="rgba(255,255,255,0.4)" fontSize="8">1×IΔn</text>
            <text x="675" y="180" fill="rgba(255,255,255,0.4)" fontSize="8">5×IΔn</text>
            <text x="715" y="180" fill="rgba(255,255,255,0.4)" fontSize="8">Ramp</text>
            <text x="675" y="195" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">0° / 180°</text>

            {/* Tester connections */}
            <line x1="550" y1="110" x2="590" y2="120" stroke="#EF4444" strokeWidth="2" />
            <line x1="550" y1="165" x2="590" y2="170" stroke="#22C55E" strokeWidth="2" />
            <text x="575" y="105" textAnchor="middle" fill="#EF4444" fontSize="8">L</text>
            <text x="575" y="178" textAnchor="middle" fill="#22C55E" fontSize="8">PE</text>

            {/* Trip time requirements */}
            <rect x="40" y="270" width="720" height="80" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="400" y="290" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="bold">Maximum Trip Times (BS EN 61008/61009)</text>
            <text x="150" y="312" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">½×IΔn</text>
            <text x="150" y="328" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">Must NOT trip</text>
            <text x="320" y="312" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">1×IΔn (non-delay)</text>
            <text x="320" y="328" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">≤ 300ms</text>
            <text x="500" y="312" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">5×IΔn (non-delay)</text>
            <text x="500" y="328" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">≤ 40ms</text>
            <text x="660" y="312" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">S-type at 5×IΔn</text>
            <text x="660" y="328" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">≤ 150ms</text>
          </svg>
          <p className="text-xs text-white/40 mt-3">RCD tester connects between Line and PE at a socket downstream of the RCD. Test at both 0° and 180° — record the longer trip time. Press the RCD test button first as a functional check.</p>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Performing Ramp Tests */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Performing Ramp Tests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern multifunction installation testers include ramp test functionality:
            </p>

            <div className="my-6 space-y-3">
              {[
                { step: 1, text: "Select ramp test mode on the tester" },
                { step: 2, text: "Set the correct RCD rating (IΔn) on the instrument" },
                { step: 3, text: "Connect test leads (L-PE for single-phase)" },
                { step: 4, text: "Initiate test - current rises gradually from zero" },
                { step: 5, text: "Instrument displays actual trip current when RCD operates" },
                { step: 6, text: "Verify result is between 50% and 100% of IΔn" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Ramp vs Standard Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ramp vs Standard Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Both test methods serve different purposes:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Trip Time Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Applies fixed current (1xIΔn or 5xIΔn)</li>
                  <li>Measures disconnection time</li>
                  <li>Required for compliance testing</li>
                  <li>Confirms RCD meets time requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ramp Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Gradually increases current from zero</li>
                  <li>Measures actual trip threshold</li>
                  <li>Valuable for discrimination</li>
                  <li>Reveals RCD sensitivity</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Effects of Standing Leakage */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Effects of Standing Leakage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standing earth leakage current from connected equipment can significantly affect ramp test results:
            </p>

            <div className="my-6 border-l-4 border-amber-500 pl-4">
              <p className="text-amber-400 font-semibold mb-2">Accounting for Standing Leakage</p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>Measure standing leakage with clamp meter before testing</li>
                <li>Add standing leakage to instrument reading for true trip current</li>
                <li>Consider disconnecting loads for accurate sensitivity measurement</li>
                <li>High leakage may cause nuisance tripping on sensitive circuits</li>
              </ul>
            </div>

            <p className="text-sm text-white/80 italic">
              <strong>Example:</strong> If standing leakage is 8mA and a 30mA RCD trips at 14mA applied
              test current, the actual trip current is 14mA + 8mA = 22mA, which is within the acceptable
              15-30mA range.
            </p>
          </div>
        </section>

        {/* Section 6: Recording Ramp Test Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording Ramp Test Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Unlike standard testing which is recorded as pass/fail with trip time, ramp test results
              should include the actual trip current measured:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li>Actual trip current (mA) - not just pass/fail</li>
                <li>RCD rating tested against (IΔn)</li>
                <li>Standing leakage if measured</li>
                <li>Location and circuit reference</li>
              </ul>
            </div>

            <p className="text-sm text-white/80">
              Recording actual values allows comparison during future periodic inspections to identify
              any degradation in RCD sensitivity over time.
            </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test Both Directions</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test on both positive and negative half-cycles</li>
                <li>Record both results for comprehensive assessment</li>
                <li>Worst-case result determines overall sensitivity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compare Multiple Tests</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Repeat tests to confirm consistency</li>
                <li>Significant variation may indicate issues</li>
                <li>Compare with previous inspection results</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Check Calibration</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure test instrument is within calibration date</li>
                <li>Accurate readings require calibrated equipment</li>
                <li>Record instrument serial number on documentation</li>
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

        {/* Reference Card */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Ramp Testing Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Trip Range</p>
                <ul className="space-y-0.5">
                  <li>50-100% of IΔn</li>
                  <li>30mA = 15-30mA</li>
                  <li>100mA = 50-100mA</li>
                  <li>300mA = 150-300mA</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Timing</p>
                <ul className="space-y-0.5">
                  <li>Ramp Duration ≥2 seconds</li>
                  <li>S-Type Delay 130-500ms</li>
                  <li>Record actual mA value</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule6Section3;
