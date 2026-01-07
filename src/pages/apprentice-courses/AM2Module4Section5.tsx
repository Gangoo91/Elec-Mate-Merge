import { Search, CheckCircle, AlertTriangle, Target, BookOpen, Eye, FileText, Lightbulb, Award, Shield } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section5 = () => {
  useSEO(
    "Identifying and Reporting Non-Compliances | AM2 Module 4 Section 5",
    "Master fault identification and compliance reporting for AM2 electrical assessment success"
  );

  const learningOutcomes = [
    "Define what a non-compliance is in the context of BS 7671",
    "Identify common installation faults and unsafe practices",
    "Interpret test results that fall outside permitted values",
    "Record non-compliances clearly and accurately on certification",
    "Explain to an assessor why something is non-compliant"
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "rcd-non-compliance",
      question: "If an RCD fails to trip within limits at x5 IΔn, is that a non-compliance?",
      options: [
        "No, as long as x1 test passes",
        "Yes - it must be recorded as failing BS 7671 requirements",
        "Only if it fails by more than 50%",
        "It depends on the installation type"
      ],
      correctIndex: 1,
      explanation: "Any RCD that fails to trip within BS 7671 specified times at either x1 or x5 IΔn is non-compliant and must be recorded as such."
    },
    {
      id: "minimum-insulation",
      question: "What's the minimum acceptable insulation resistance value in AM2?",
      options: [
        "0.5 MΩ",
        "1 MΩ",
        "2 MΩ",
        "200 MΩ"
      ],
      correctIndex: 1,
      explanation: "The minimum acceptable insulation resistance for most circuits is 1 MΩ as specified in BS 7671. Values below this indicate insulation failure."
    },
    {
      id: "assessment-failure",
      question: "True or false: You fail AM2 if you find a non-compliance.",
      options: [
        "True",
        "False"
      ],
      correctIndex: 1,
      explanation: "False. You're expected to find and report non-compliances. You fail if you miss obvious defects or fail to record them correctly."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Define a non-compliance in electrical installation terms.",
      options: [
        "Any electrical fault",
        "Any part that doesn't meet BS 7671, manufacturer's instructions, or specification",
        "Only safety-critical faults",
        "Minor workmanship issues only"
      ],
      correctAnswer: 1,
      explanation: "A non-compliance is any part of an installation that does not meet the requirements of BS 7671, manufacturer's instructions, or the installation specification."
    },
    {
      id: 2,
      question: "Give one example of a visual non-compliance.",
      options: [
        "High Zs reading",
        "RCD trip time too slow",
        "Exposed copper or unsleeved CPC",
        "Low insulation resistance"
      ],
      correctAnswer: 2,
      explanation: "Visual non-compliances include exposed copper, unsleeved CPCs, damaged insulation, poor workmanship, or incorrect polarity that can be seen during inspection."
    },
    {
      id: 3,
      question: "What's the minimum acceptable insulation resistance in AM2?",
      options: ["0.5 MΩ", "1 MΩ", "2 MΩ", "10 MΩ"],
      correctAnswer: 1,
      explanation: "BS 7671 specifies a minimum insulation resistance of 1 MΩ for most electrical circuits. Values below this indicate insulation failure."
    },
    {
      id: 4,
      question: "What does it mean if socket polarity is reversed?",
      options: [
        "Socket won't work",
        "Live and neutral conductors are connected incorrectly",
        "Earth is missing",
        "Voltage is too low"
      ],
      correctAnswer: 1,
      explanation: "Reversed polarity means the live and neutral conductors are swapped, which can create safety hazards as switches may not isolate the live conductor."
    },
    {
      id: 5,
      question: "What's the maximum trip time at x1 for a 30 mA RCD?",
      options: ["40 ms", "300 ms", "1000 ms", "No limit"],
      correctAnswer: 1,
      explanation: "At x1 rated current (30mA), an RCD should trip but may take up to 300ms according to BS 7671."
    },
    {
      id: 6,
      question: "What's the maximum trip time at x5 for a 30 mA RCD?",
      options: ["40 ms", "300 ms", "150 ms", "200 ms"],
      correctAnswer: 0,
      explanation: "At x5 rated current (150mA), a 30mA RCD must trip within 40ms according to BS 7671 requirements."
    },
    {
      id: 7,
      question: "If a Zs result is higher than BS 7671 maximum, what must you do?",
      options: [
        "Ignore it if close",
        "Record it as non-compliant",
        "Test again and hope for better result",
        "Adjust the reading"
      ],
      correctAnswer: 1,
      explanation: "Any Zs reading that exceeds BS 7671 maximum values for the protective device must be recorded as non-compliant."
    },
    {
      id: 8,
      question: "True or false: You fail AM2 if you find a non-compliance.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Finding and correctly reporting non-compliances demonstrates professional competence. You fail if you miss obvious defects."
    },
    {
      id: 9,
      question: "What's the correct way to report a missing CPC?",
      options: [
        "Write 'earth missing'",
        "Write 'CPC not connected at socket outlet'",
        "Don't record minor issues",
        "Just mark as 'fault'"
      ],
      correctAnswer: 1,
      explanation: "Use specific, technical language like 'CPC not connected at socket outlet' rather than vague terms like 'earth missing'."
    },
    {
      id: 10,
      question: "What happens if you ignore an obvious defect in AM2?",
      options: [
        "Nothing if tests pass",
        "Minor mark deduction",
        "Fail the assessment section",
        "Get a second chance"
      ],
      correctAnswer: 2,
      explanation: "Ignoring obvious defects shows lack of professional competence and will result in failing the assessment section."
    }
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={["AM2", "Module 4", "Section 5"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Search}
        title="Identifying and Reporting Non-Compliances"
        description="It's not enough to complete an installation and test it - you must also be able to identify when something does not comply with BS 7671 or the specification."
        badge="Module 4 • Section 5"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning title="CRITICAL: Missing Defects = Assessment Failure">
        <p className="text-ios-callout text-white/80 mb-2">
          Assessors are looking for your ability to spot faults, interpret test results, and apply regulation-based judgement. Candidates who ignore obvious defects or record incorrect results will fail this section.
        </p>
        <p className="text-ios-callout text-white/90 font-medium">
          Professional competence includes identifying problems, not just completing tasks. This demonstrates real-world electrical safety awareness.
        </p>
      </AM2CriticalWarning>

      {/* Learning Outcomes */}
      <AM2ContentCard accent>
        <AM2LearningOutcomes outcomes={learningOutcomes} />
      </AM2ContentCard>

      {/* What is a Non-Compliance */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          1. What is a Non-Compliance?
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-white font-semibold mb-2">Definition:</h4>
          <p className="text-ios-callout text-white/80 mb-3">
            Any part of an installation that does not meet the requirements of BS 7671, manufacturer's instructions, or the installation specification.
          </p>
          <p className="text-ios-callout text-elec-yellow">
            <strong>Key Principle:</strong> Non-compliances can range from safety-critical issues to workmanship standards that affect professional quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Safety-Critical Non-Compliances:</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Missing or disconnected CPC</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Exposed copper or damaged insulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Incorrect polarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Zs values exceeding BS 7671 maximums</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>RCDs failing to trip within required times</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Design Non-Compliances:</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Incorrect cable size for load</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Inadequate circuit protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Missing RCD protection where required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Insufficient IP rating for location</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Workmanship Non-Compliances:</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Poor workmanship (crooked accessories)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Overfilled trunking or conduit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Inadequate cable support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Missing labels or identification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Testing Non-Compliances:</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Insulation resistance below 1 MΩ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Continuity readings too high</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>RCD trip times outside limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Functional testing failures</span>
                </li>
              </ul>
            </div>
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

      {/* How to Identify Non-Compliances */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          2. How to Identify Non-Compliances
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4 text-elec-yellow" />
              Visual Inspection:
            </h4>
            <p className="text-ios-footnote text-white/60 mb-2">Before energising - systematic visual checks</p>
            <ul className="text-ios-callout text-white/80 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Damage to cables or accessories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Missing or incorrect sleeving</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Poor alignment and workmanship</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2 flex items-center gap-2">
              <Search className="h-4 w-4 text-emerald-400" />
              Test Results:
            </h4>
            <p className="text-ios-footnote text-white/60 mb-2">Compare readings with BS 7671 limits</p>
            <ul className="text-ios-callout text-white/80 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Zs values vs maximum permitted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Insulation resistance &lt; 1 MΩ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>RCD trip times outside limits</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-400" />
              Functional Checks:
            </h4>
            <p className="text-ios-footnote text-white/60 mb-2">Circuits not operating as intended</p>
            <ul className="text-ios-callout text-white/80 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Switches not controlling correct loads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>RCDs not tripping when tested</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Incorrect socket polarity</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-3">Systematic Identification Process:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-ios-callout text-white font-semibold mb-2">Step-by-Step Approach:</p>
              <ol className="text-ios-callout text-white/80 space-y-1 list-decimal list-inside">
                <li>Pre-energisation visual inspection</li>
                <li>Dead testing and measurement comparison</li>
                <li>Live testing against BS 7671 limits</li>
                <li>Functional testing verification</li>
                <li>Final compliance review</li>
              </ol>
            </div>
            <div>
              <p className="text-ios-callout text-white font-semibold mb-2">Critical Reference Points:</p>
              <ul className="text-ios-callout text-white/80 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>BS 7671 maximum Zs tables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>RCD trip time requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Minimum insulation resistance values</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Non-Compliances in AM2 */}
      <AM2CriticalWarning title="3. Common Non-Compliances in AM2 (NET Guidance)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-2">Most Common Faults Found:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>CPC unsleeved or disconnected</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Socket polarity reversed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Broken ring final circuit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Circuits not labelled at distribution board</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-2">Test Result Failures:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Zs above permitted value for protective device</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Insulation resistance below 1 MΩ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>RCD trip times out of range</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Continuity values indicating breaks</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2CriticalWarning>

      <InlineCheck
        id={quickCheckQuestions[1].id}
        question={quickCheckQuestions[1].question}
        options={quickCheckQuestions[1].options}
        correctIndex={quickCheckQuestions[1].correctIndex}
        explanation={quickCheckQuestions[1].explanation}
      />

      {/* How to Report Non-Compliances */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          4. How to Report Non-Compliances
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Professional Reporting Principles:</h4>
            <ul className="text-ios-callout text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Record clearly on certificate or defect report</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Use correct technical terminology</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Don't guess results - state measured values</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>State the non-compliance, not the correction</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">What to Include in Reports:</h4>
            <ul className="text-ios-callout text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Specific location of non-compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Actual measured values where applicable</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>BS 7671 requirement that is not met</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Clear description of the defect</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Good vs Poor Reporting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Poor Reporting Examples:</h4>
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg p-2">
                <span className="text-ios-callout text-red-400">"Earth missing"</span>
                <p className="text-ios-footnote text-white/60 mt-1">Too vague, no location specified</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <span className="text-ios-callout text-red-400">"Ring fault"</span>
                <p className="text-ios-footnote text-white/60 mt-1">No detail about nature of fault</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <span className="text-ios-callout text-red-400">"RCD broken"</span>
                <p className="text-ios-footnote text-white/60 mt-1">No test data or specific failure</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Good Reporting Examples:</h4>
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg p-2">
                <span className="text-ios-callout text-emerald-400">"CPC not connected at socket outlet in kitchen"</span>
                <p className="text-ios-footnote text-white/60 mt-1">Specific, clear, located</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <span className="text-ios-callout text-emerald-400">"Ring final broken at consumer unit - L conductor"</span>
                <p className="text-ios-footnote text-white/60 mt-1">Specific conductor and location</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <span className="text-ios-callout text-emerald-400">"RCD trip time 380ms at x1 IΔn - exceeds 300ms limit"</span>
                <p className="text-ios-footnote text-white/60 mt-1">Measured value and standard referenced</p>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Assessor Expectations */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Target className="h-5 w-5" />
          5. Assessor Expectations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              Professional Competence:
            </h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Candidate spots and records obvious faults</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Explains why result is non-compliant with BS 7671</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Records test results realistically, not "perfect" numbers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Demonstrates understanding of safety implications</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              Safety Awareness:
            </h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Leaves installation safe, even if faults identified</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Prioritises safety-critical non-compliances</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Shows understanding of consequences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Demonstrates regulatory knowledge</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Practical Guidance */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          6. Comprehensive Practical Guidance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Know the Limits:</h4>
              <ul className="text-ios-callout text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Memorise maximum Zs values for common MCBs (B32=1.44Ω, B20=2.30Ω)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>RCD trip limits: 300ms at x1, 40ms at x5 for 30mA devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Minimum insulation resistance: 1MΩ for most circuits</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Visual Inspection Tips:</h4>
              <ul className="text-ios-callout text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Check CPCs visually - assessors always look for sleeving</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Look for obvious damage, poor workmanship, missing labels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Check accessibility and IP ratings for locations</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Test Result Analysis:</h4>
              <ul className="text-ios-callout text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Work logically - if reading looks wrong, re-test</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Record as non-compliant if still outside limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Compare all readings with BS 7671 requirements</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Professional Approach:</h4>
              <ul className="text-ios-callout text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Don't cover up - never hide or ignore defects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Recording them shows competence, not failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Explain findings clearly to assessor</span>
                </li>
              </ul>
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

      {/* Real-World Examples */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Real-World Examples
        </h2>

        <div className="space-y-3">
          <div className="border-l-4 border-l-red-500 bg-red-500/10 rounded-r-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Example 1: Missed High Zs Reading</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Candidate measured Zs of 2.5 Ω on a B32 breaker (limit 1.44Ω exceeded). Failed to report - <strong className="text-red-400">lost marks</strong>
            </p>
            <p className="text-ios-footnote text-elec-yellow">
              Lesson: Always compare measured values with BS 7671 limits. High Zs values indicate potentially dangerous earth fault loop impedance.
            </p>
          </div>

          <div className="border-l-4 border-l-red-500 bg-red-500/10 rounded-r-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Example 2: Ignored Polarity Error</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Candidate found socket polarity reversed, but didn't note it. Assessor flagged - <strong className="text-red-400">fail</strong>
            </p>
            <p className="text-ios-footnote text-elec-yellow">
              Lesson: Even seemingly minor defects must be recorded. Reversed polarity creates serious safety hazards.
            </p>
          </div>

          <div className="border-l-4 border-l-emerald-500 bg-emerald-500/10 rounded-r-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Example 3: Correct RCD Documentation</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Candidate recorded RCD 1x test at 280ms, 5x at 36ms. Correctly recorded as pass - <strong className="text-emerald-400">full marks</strong>
            </p>
            <p className="text-ios-footnote text-emerald-400">
              Lesson: Accurate recording of actual measured values, even when within limits, demonstrates professional competence.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Section Summary */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Award className="h-5 w-5" />
          Section Summary
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-white font-semibold mb-3">Key Takeaways:</h4>
          <ul className="text-ios-callout text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Identifying and reporting non-compliances proves professional competence</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Visual checks, test results, and functional tests must be interpreted correctly</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Record non-compliances accurately using clear, technical language</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Note realistic values, not hidden or "book answers"</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Leave installation safe, even with faults recorded</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Failing to report faults is a common reason candidates don't pass</span>
            </li>
          </ul>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Next Steps:</h4>
          <p className="text-ios-callout text-white/80">
            You're now ready to move on to Section 6, where we'll cover time management during testing - a critical skill for AM2 success.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz questions={quizQuestions} title="Identifying and Reporting Non-Compliances" />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section4"
        prevLabel="Functional Testing"
        nextHref="../section6"
        nextLabel="Time Management"
        currentSection={5}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module4Section5;
