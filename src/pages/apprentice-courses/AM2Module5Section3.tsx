import { Activity, Shield, Settings, Zap, Eye, Lightbulb, BookOpen, Target, CheckCircle, AlertTriangle } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section3 = () => {
  useSEO(
    "Using Test Equipment Efficiently | AM2 Module 5 Section 3",
    "Master efficient test equipment use in AM2 assessments. Learn GS38 compliance, instrument selection, and safe testing procedures for accurate fault diagnosis."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "safe-isolation",
      question: "Which tester is used to prove safe isolation?",
      options: [
        "Multifunction tester (MFT)",
        "Continuity tester",
        "A two-pole voltage indicator",
        "Insulation resistance tester"
      ],
      correctIndex: 2,
      explanation: "A two-pole voltage indicator is required for safe isolation procedures, not an MFT. This ensures proper Test-Prove-Test sequence."
    },
    {
      id: "zero-leads",
      question: "Why must leads be zeroed before continuity testing?",
      options: [
        "To check the battery level",
        "To remove the resistance of the leads from the measurement",
        "To calibrate the tester",
        "To comply with regulations"
      ],
      correctIndex: 1,
      explanation: "Zeroing (nulling) the test leads removes their resistance from the measurement, ensuring accurate continuity readings."
    },
    {
      id: "lamp-disconnection",
      question: "Why must you disconnect lamps before insulation resistance testing?",
      options: [
        "To save energy",
        "To prevent damage to equipment and get accurate results",
        "It's required by law",
        "To make testing easier"
      ],
      correctIndex: 1,
      explanation: "Sensitive equipment like lamps can be damaged by high test voltages and will give false low readings during insulation resistance testing."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Which tester is used for safe isolation?",
      options: ["Multifunction tester", "Two-pole voltage indicator", "Continuity tester", "Insulation resistance tester"],
      correctAnswer: 1,
      explanation: "A two-pole voltage indicator is specifically required for safe isolation procedures to prove circuits are dead."
    },
    {
      id: 2,
      question: "How much probe tip should be exposed under GS38?",
      options: ["1-2 mm", "2-4 mm", "5-10 mm", "No limit specified"],
      correctAnswer: 1,
      explanation: "GS38 requires probe tips to be shrouded with only 2-4 mm of metal exposed for safety."
    },
    {
      id: 3,
      question: "Why must continuity leads be zeroed?",
      options: ["To check battery", "To remove lead resistance from measurement", "To calibrate tester", "To save time"],
      correctAnswer: 1,
      explanation: "Zeroing removes the resistance of the test leads themselves from the measurement for accurate results."
    },
    {
      id: 4,
      question: "What test would you use to prove a short circuit?",
      options: ["Continuity test", "Polarity test", "Insulation resistance test", "RCD test"],
      correctAnswer: 2,
      explanation: "Insulation resistance testing at 500V DC will reveal short circuits as very low or zero resistance readings."
    },
    {
      id: 5,
      question: "What unit is insulation resistance measured in?",
      options: ["Ohms", "Megohms (M)", "Volts (V)", "Amperes (A)"],
      correctAnswer: 1,
      explanation: "Insulation resistance is measured in Megohms (M), with minimum 1M required for most circuits."
    },
    {
      id: 6,
      question: "What test would you use to identify high resistance joints?",
      options: ["Insulation resistance", "Polarity test", "Zs (earth fault loop impedance)", "RCD test"],
      correctAnswer: 2,
      explanation: "Zs testing or continuity testing will reveal high resistance connections as elevated readings."
    },
    {
      id: 7,
      question: "What's the maximum trip time for a 30 mA RCD at x1 In?",
      options: ["40ms", "150ms", "300ms", "500ms"],
      correctAnswer: 2,
      explanation: "At 1x rated current (30mA), RCDs must trip within 300ms according to BS7671."
    },
    {
      id: 8,
      question: "True or false: Taping up damaged test leads is acceptable in AM2.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Damaged test leads must be replaced, never repaired with tape. This is a serious safety violation."
    },
    {
      id: 9,
      question: "Why must you disconnect lamps before insulation resistance testing?",
      options: ["To save power", "To prevent damage and get accurate results", "It's not necessary", "To save time"],
      correctAnswer: 1,
      explanation: "High test voltages can damage sensitive equipment and connected loads will give false low readings."
    },
    {
      id: 10,
      question: "What do assessors expect you to do if you get an unrealistic reading?",
      options: ["Ignore it", "Make up a better number", "Re-check instrument settings and connections", "Ask for help"],
      correctAnswer: 2,
      explanation: "Always re-check your instrument settings and connections rather than recording false values."
    }
  ];

  const faqs = [
    {
      question: "Can I bring my own test equipment?",
      answer: "Yes, but it must be GS38 compliant and in good condition. All equipment will be checked before use."
    },
    {
      question: "Do I always use the MFT?",
      answer: "Mostly, but safe isolation requires a separate two-pole voltage tester. Each tool has specific applications."
    },
    {
      question: "What if my readings seem unrealistic?",
      answer: "Re-check instrument settings and connections - never fake values. Assessors can spot unrealistic numbers."
    },
    {
      question: "How strict are assessors about GS38?",
      answer: "Very strict - unsafe equipment use equals instant fail. Safety is non-negotiable in electrical work."
    },
    {
      question: "Do I lose marks for being slow with instruments?",
      answer: "No, but poor efficiency risks running out of time. Practice until instrument operation becomes second nature."
    }
  ];

  const learningOutcomes = [
    "Select the correct test instrument for different types of faults",
    "Apply GS38 safety requirements when using test probes and leads",
    "Carry out continuity, insulation resistance, polarity, Zs, PSC, and RCD tests safely",
    "Use test results to identify fault types without guesswork",
    "Demonstrate safe, confident handling of instruments to an assessor"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module5"
      breadcrumbs={[
        { label: "AM2", href: "/study-centre/apprentice/am2" },
        { label: "Module 5", href: "/study-centre/apprentice/am2/module5" },
        { label: "Section 3" }
      ]}
    >
      <AM2HeroSection
        icon={Activity}
        title="Using Test Equipment Efficiently"
        description="In AM2 fault diagnosis, test equipment is your main tool. You will rely on instruments like a multifunction tester (MFT), a continuity tester, an insulation resistance tester, and a voltage indicator to identify faults safely and accurately."
        badge="Module 5 - Section 3"
      />

      <div className="space-y-6">
        {/* Introduction */}
        <AM2ContentCard>
          <p className="text-ios-body text-white/80 leading-relaxed">
            Efficient use of test equipment means choosing the right tool for the fault, setting it up correctly, applying it safely, and recording results without wasting time or guessing.
          </p>
        </AM2ContentCard>

        {/* Critical Warning */}
        <AM2CriticalWarning title="CRITICAL: GS38 Safety Compliance">
          <p className="text-ios-callout text-white/80 mb-3 leading-relaxed">
            The assessor is watching closely to see if you can handle test equipment in line with GS38 safety requirements. Unsafe equipment use equals instant fail.
          </p>
          <p className="text-ios-callout text-white/80 font-medium leading-relaxed">
            Never tape up damaged leads - replace them. Use only shrouded probes with 2-4mm exposed tips.
          </p>
        </AM2CriticalWarning>

        {/* Learning Outcomes */}
        <AM2LearningOutcomes outcomes={learningOutcomes} />

        {/* Core Test Instruments */}
        <AM2ContentCard
          title="1. Core Test Instruments in AM2 Fault Finding"
          icon={Settings}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Primary Instruments:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Multifunction Tester (MFT):</strong> Combines continuity, insulation resistance, Zs, PSC/PSCC, and RCD functions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Continuity tester:</strong> Proves open circuits and checks rings/CPCs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Insulation resistance tester:</strong> Detects short circuits or earth faults</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Safety Equipment:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Voltage indicator (two-pole):</strong> Used for safe isolation and proving circuits live/dead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Proving unit:</strong> Confirms voltage indicator is working before/after use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">GS38 test leads:</strong> Fused and shrouded for safety</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* GS38 Safety Compliance */}
        <AM2ContentCard
          title="2. Safe Use - GS38 Compliance"
          icon={Shield}
          accent
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Essential GS38 Requirements:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Shrouded probes:</strong> Only 2-4 mm exposed metal tip</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Fused leads:</strong> Test leads must be fused and undamaged</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Finger barriers:</strong> Keep fingers behind probe barriers at all times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Lead condition:</strong> Never tape up damaged leads - replace them immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Proving sequence:</strong> Always prove tester on a live source before and after use</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Safe Working Practices:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Before Testing:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Visually inspect all test equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Check probe shrouds and lead condition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Verify tester calibration dates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Test proving unit operation</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">During Testing:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Maintain Test-Prove-Test sequence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Keep leads tidy and untangled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Never bypass safety features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Report any equipment faults immediately</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Efficient Application of Tests */}
        <AM2ContentCard
          title="3. Efficient Application of Tests"
          icon={Zap}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Continuity Testing:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Best for:</strong> Open circuits, broken rings, CPC faults</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Setup:</strong> Always zero leads first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Current:</strong> Use 200mA test current</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Record:</strong> Actual resistance values in Ohms</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Insulation Resistance:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Best for:</strong> Shorts or earth faults</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Setup:</strong> Disconnect sensitive equipment first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Voltage:</strong> 500V DC for most circuits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Minimum:</strong> 1MOhms required (investigate if below 2MOhms)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Polarity & Zs Testing:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Polarity:</strong> Confirm correct connections at sockets, switches, lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Zs testing:</strong> Identify high resistance faults</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Compare:</strong> Against BS 7671 maximum values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Safety:</strong> Ensure RCD not bypassed during Zs tests</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">RCD Testing:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">x1 test:</strong> Must trip within 300ms at rated current</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">x5 test:</strong> Must trip within 40ms (30mA RCDs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">x0.5 test:</strong> Should NOT trip (checks over-sensitivity)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Functional:</strong> Test button operation</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Common Errors and Assessor Expectations */}
        <AM2ContentCard
          title="4. Common Errors and Assessor Expectations"
          icon={Eye}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Common Candidate Errors (NET Guidance):</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Wrong instrument:</strong> Using wrong instrument for fault type (e.g. trying to find open circuit with insulation tester)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Forgot zeroing:</strong> Not zeroing continuity leads = false readings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Equipment connected:</strong> Carrying out insulation resistance with lamps/equipment connected = damage or wrong results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">False numbers:</strong> Recording "perfect" numbers instead of measured values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Unsafe probes:</strong> Using non-GS38 probes (long tips, unsafe)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Assessors Want to See You:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Technical Competence:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Choose correct instrument for the fault</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Set the range correctly (e.g. 500V for IR, not 250V)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Record values realistically, not "book answers"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Work efficiently without repeated setting changes</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Safety Compliance:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Use safe probe techniques with barriers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Follow Test-Prove-Test sequence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Handle equipment professionally</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Report any safety concerns immediately</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Advanced Equipment Mastery */}
        <AM2ContentCard
          title="5. Advanced Equipment Mastery"
          icon={Zap}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Equipment Calibration and Maintenance:</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Before Every AM2 Assessment:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Check calibration certificates are current (typically annual)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Verify battery condition and charge level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Test all functions on known good circuit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Inspect leads for damage, kinks, or wear</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Ensure probe shrouds are secure and undamaged</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Professional Equipment Standards:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">CAT III or CAT IV rated test equipment preferred</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Fused test leads with HRC fuses (typically 500mA)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Digital display with clear readings in all lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Auto-ranging capability for efficient operation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Data logging capability for record keeping</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Advanced Testing Techniques:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Temperature Compensation:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Account for conductor temperature effects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Use correction factors for accurate readings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Consider ambient temperature variations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Allow cables to stabilise before testing</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Measurement Uncertainty:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Understand instrument accuracy specifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Account for +/-5% typical measurement error</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Use multiple readings for critical measurements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Document measurement conditions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Troubleshooting Equipment Issues:</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Common Equipment Problems in AM2:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Erratic readings:</strong> Usually poor connections or battery issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Display problems:</strong> Check LCD contrast settings and lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Probe contact issues:</strong> Clean probe tips and check spring pressure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Auto-ranging delays:</strong> Switch to manual range for faster operation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Memory errors:</strong> Clear stored data and restart instrument</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Emergency Procedures:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Report equipment faults to assessor immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Have backup equipment ready if permitted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Know how to switch between different test methods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Understand manual calculation methods as backup</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Industry Standards and Compliance */}
        <AM2ContentCard
          title="6. Industry Standards and Compliance"
          icon={Shield}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Legal and Insurance Requirements:</h4>
              <p className="text-ios-callout text-white/80 mb-3"><strong className="text-white">Why proper testing matters beyond AM2:</strong></p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Legal liability:</strong> Duty of care under Health & Safety at Work Act</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Insurance validity:</strong> Claims may be rejected for non-compliant testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Professional standards:</strong> IET Code of Practice requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Competency evidence:</strong> Proper records prove professional competence</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Test Equipment Regulations:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">BS EN 61010 (Test Equipment Safety):</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Equipment must be CAT rated for application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Overvoltage protection essential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Double insulation or earthing required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Clear marking and warnings mandatory</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">GS38 Key Requirements:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Probe tips: 2-4mm exposed maximum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Lead protection: HRC fused at source</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Finger barriers: Prevent accidental contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Voltage rating: Adequate for system voltage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Professional Development Through Testing:</h4>
              <p className="text-ios-callout text-white/80 mb-3">
                Mastering test equipment use in AM2 builds skills essential for career progression:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Technical Skills:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Systematic diagnostic thinking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Precision in measurement techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Understanding of electrical principles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Quality assurance mindset</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-ios-callout font-semibold text-white mb-2">Professional Skills:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Clear communication with clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Accurate record keeping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Safety-first mentality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span className="text-ios-footnote text-white/70">Continuous improvement approach</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Practical Tips */}
        <AM2ContentCard
          title="7. Practical Tips for Success"
          icon={Target}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
                <h4 className="text-ios-headline font-semibold text-white">Preparation Tips</h4>
              </div>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Familiarise with MFT controls before assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Practice until settings are second nature</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Think before you test - which fault type suspected?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Handle equipment neatly - keep leads tidy</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-elec-yellow" />
                <h4 className="text-ios-headline font-semibold text-white">During Assessment</h4>
              </div>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Work circuit by circuit - don't jump around</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Explain what you're doing clearly to assessor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Record results immediately - don't repeat tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Stay calm and methodical under pressure</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-elec-yellow" />
                <h4 className="text-ios-headline font-semibold text-white">Professional Communication</h4>
              </div>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">"I'm carrying out an insulation resistance test between line and neutral"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">"Reading shows 0.02MOhms indicating a short circuit"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">"Zeroing test leads to remove lead resistance"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">"Proving voltage indicator before isolation"</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-elec-yellow" />
                <h4 className="text-ios-headline font-semibold text-white">Avoid Time Wasters</h4>
              </div>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Swapping settings repeatedly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Using wrong test for suspected fault</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Forgetting to disconnect equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Not recording results immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2ContentCard>

        {/* Real-World Examples */}
        <AM2ContentCard
          title="8. Real-World Examples"
          icon={BookOpen}
        >
          <div className="space-y-4">
            <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-red-200 mb-3">Example 1: Lead Zeroing Error</h4>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Scenario:</strong> Candidate forgot to zero continuity leads before testing.
              </p>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Result:</strong> Reading showed 0.7Ohms on CPC loop instead of actual 0.05Ohms.
              </p>
              <p className="text-ios-callout text-white/80 font-medium">
                <strong className="text-white">Outcome:</strong> Assessor flagged as incorrect - marks lost for basic error.
              </p>
            </div>

            <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-red-200 mb-3">Example 2: Equipment Not Disconnected</h4>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Scenario:</strong> Candidate performed insulation resistance without disconnecting lamps.
              </p>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Result:</strong> Low reading due to lamp circuits, potential equipment damage.
              </p>
              <p className="text-ios-callout text-white/80 font-medium">
                <strong className="text-white">Outcome:</strong> Assessor marked down for procedure error and false reading.
              </p>
            </div>

            <div className="bg-green-950/20 border border-green-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-green-200 mb-3">Example 3: Professional Practice</h4>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Scenario:</strong> Candidate used correct GS38 leads, proved tester before/after use.
              </p>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Process:</strong> Explained results clearly and demonstrated systematic approach.
              </p>
              <p className="text-ios-callout text-white/80 font-medium">
                <strong className="text-white">Outcome:</strong> Full marks for safety compliance and professional method.
              </p>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-amber-200 mb-3">Example 4: Industry Safety Lesson</h4>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Scenario:</strong> In industry, an electrician used damaged probes with exposed tips.
              </p>
              <p className="text-ios-callout text-white/80 mb-2">
                <strong className="text-white">Result:</strong> Arc flash occurred causing serious burns and equipment damage.
              </p>
              <p className="text-ios-callout text-white/80 font-medium">
                <strong className="text-white">Lesson:</strong> Same unsafe practice in AM2 equals instant fail - safety is non-negotiable.
              </p>
            </div>
          </div>
        </AM2ContentCard>

        {/* FAQ Section */}
        <AM2ContentCard
          title="9. Frequently Asked Questions"
          icon={Lightbulb}
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-ios-headline font-semibold text-white mb-2">
                  Q{index + 1}: {faq.question}
                </h4>
                <p className="text-ios-callout text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </AM2ContentCard>

        {/* Summary */}
        <AM2ContentCard
          title="10. Section Summary"
          icon={BookOpen}
          accent
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Efficient Test Equipment Use Means:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Selecting</strong> the right instrument for the fault</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Using</strong> GS38-compliant probes and safe handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Setting up</strong> instruments correctly before testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Recording</strong> real results, not guesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Working</strong> confidently and neatly under time pressure</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-amber-200 mb-3">Remember:</h4>
              <p className="text-ios-callout text-white/80">
                Unsafe or sloppy tester use can lose you marks - or fail you outright. The assessor is evaluating not just your technical knowledge, but your professional competence and safety awareness.
              </p>
            </div>
          </div>
        </AM2ContentCard>

        {/* Quiz Section */}
        <div className="border-t border-white/10 pt-8">
          <Quiz
            title="Test Your Knowledge: Using Test Equipment Efficiently"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <AM2NavigationFooter
          previousHref="../section2"
          previousLabel="Logical Process"
          nextHref="../section4"
          nextLabel="Proving Rectification"
          currentSection={3}
          totalSections={6}
        />
      </div>
    </AM2SectionLayout>
  );
};

export default AM2Module5Section3;
