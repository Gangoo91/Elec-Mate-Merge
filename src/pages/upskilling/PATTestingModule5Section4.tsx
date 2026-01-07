import { ArrowLeft, Calendar, CheckCircle, Clock, AlertTriangle, Target, RefreshCw, Shield, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Re-Test Period Planning - PAT Testing Course";
const DESCRIPTION = "Learn how to plan and schedule PAT testing intervals using risk assessment, IET Code of Practice guidance, and practical scheduling strategies.";

const quickCheckQuestions = [
  {
    id: "m5s4-qc1",
    question: "What is the recommended maximum initial interval for office IT equipment?",
    options: ["3 months", "6 months", "48 months", "No testing needed"],
    correctIndex: 2,
    explanation: "The IET Code of Practice suggests up to 48 months for office IT equipment in low-risk environments, though formal visual inspection may be needed more frequently."
  },
  {
    id: "m5s4-qc2",
    question: "What should be used to determine appropriate test intervals?",
    options: ["Fixed annual schedule for all", "Risk assessment based on equipment and environment", "Manufacturer recommendation only", "Random selection"],
    correctIndex: 1,
    explanation: "Risk assessment considering equipment type, environment, usage, and user competence should determine test intervals, not a blanket approach."
  },
  {
    id: "m5s4-qc3",
    question: "When should test intervals be shortened?",
    options: ["Never", "When high failure rates are found", "When equipment is new", "Every other year"],
    correctIndex: 1,
    explanation: "If testing reveals high failure rates, it indicates the interval may be too long and should be reduced to catch faults earlier."
  }
];

const quizQuestions = [
  {
    question: "According to the IET Code of Practice, test intervals should be based on:",
    options: ["Annual fixed schedule", "Risk assessment and review", "Equipment colour", "User preference"],
    correctAnswer: 1
  },
  {
    question: "What is the suggested initial test interval for Class I construction site equipment?",
    options: ["48 months", "24 months", "3 months", "Weekly"],
    correctAnswer: 2
  },
  {
    question: "User checks of equipment should typically be conducted:",
    options: ["Never", "Before each use", "Monthly", "Only when faulty"],
    correctAnswer: 1
  },
  {
    question: "What factor would justify extending test intervals?",
    options: ["Cost savings required", "Consistently low failure rates over time", "New tester appointed", "Equipment getting older"],
    correctAnswer: 1
  },
  {
    question: "In a hotel environment, portable appliances in guest rooms typically require:",
    options: ["Annual combined inspection and test", "Testing every 5 years", "No testing needed", "Weekly visual inspection"],
    correctAnswer: 0
  },
  {
    question: "What is the purpose of the IET Code of Practice tables?",
    options: ["Legal requirements", "Suggested initial intervals requiring review", "Absolute fixed intervals", "Insurance requirements"],
    correctAnswer: 1
  },
  {
    question: "Double-insulated (Class II) equipment generally requires:",
    options: ["More frequent testing than Class I", "Same intervals as Class I", "Less frequent testing than Class I", "No testing at all"],
    correctAnswer: 2
  },
  {
    question: "Test scheduling should include provision for:",
    options: ["Testing all equipment on one day", "Equipment not available on scheduled date", "Only testing during holidays", "Random testing times"],
    correctAnswer: 1
  },
  {
    question: "High-risk equipment like electric kettles in commercial kitchens might need:",
    options: ["Annual testing", "Monthly formal visual inspection", "Testing every 5 years", "User checks only"],
    correctAnswer: 1
  },
  {
    question: "When implementing a new PAT testing programme, initial intervals should be:",
    options: ["Very long to save money", "Conservative until failure data is gathered", "Based on guesswork", "The same for all equipment"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Is annual PAT testing required by law?",
    answer: "No. There is no legal requirement for annual testing. The law requires equipment to be maintained to prevent danger. Test intervals should be based on risk assessment. Some equipment may need more frequent testing, others less."
  },
  {
    question: "Can I test all equipment on the same schedule?",
    answer: "This is not recommended. Different equipment types, environments, and usage patterns require different intervals. A risk-based approach is more effective and often more economical than a blanket schedule."
  },
  {
    question: "What if a client insists on annual testing regardless of risk?",
    answer: "You can explain the risk-based approach but ultimately follow the client's requirements. Document that more frequent testing was requested. Over-testing isn't harmful, just potentially unnecessary."
  },
  {
    question: "How do I handle equipment that's rarely used?",
    answer: "Consider condition-based testing - test before each use if equipment sits idle for extended periods. Include in regular schedules but note low usage. Faults may develop during storage."
  },
  {
    question: "Should new equipment be tested immediately?",
    answer: "New equipment should be inspected and may need testing before first use, especially if there's any doubt about condition. This establishes a baseline and verifies equipment arrived undamaged."
  },
  {
    question: "How do I manage multiple test intervals efficiently?",
    answer: "Group equipment with similar intervals and test in batches. Use PAT management software for scheduling. Consider aligning similar equipment to common test dates during reviews to simplify logistics."
  }
];

const PATTestingModule5Section4 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 items-center px-4">
          <Link
            to="/electrical-upskilling/pat-testing/module5"
            className="flex items-center gap-2 text-gray-400 hover:text-elec-yellow transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Module 5</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 md:py-8 max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-4">
            <Calendar className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="text-sm text-elec-yellow font-medium mb-2">Module 5 • Section 4</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Re-Test Period Planning</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Planning effective test schedules based on risk assessment and the IET Code of Practice guidance.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              In 30 Seconds
            </h3>
            <p className="text-sm text-gray-300">
              Test intervals should be risk-based, not fixed. The IET Code of Practice provides suggested initial intervals
              ranging from weekly checks to 48 months. Review and adjust based on failure rates. User checks, formal visual
              inspections, and combined testing serve different purposes.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Key Principle
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• No fixed legal intervals exist</li>
              <li>• Risk assessment determines frequency</li>
              <li>• Review based on failure data</li>
              <li>• Different inspection types for different needs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Apply risk assessment to determine test intervals",
              "Interpret IET Code of Practice interval tables",
              "Distinguish between inspection types",
              "Create efficient testing schedules",
              "Review and adjust intervals based on data",
              "Handle scheduling challenges practically"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 01: The Risk-Based Approach */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">01</span>
            </div>
            <h2 className="text-xl font-semibold">The Risk-Based Approach</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The IET Code of Practice advocates a risk-based approach to determining test intervals. This means
              considering multiple factors rather than applying a blanket schedule to all equipment.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Important Clarification
              </h4>
              <p className="text-sm">
                There is <strong>no legal requirement</strong> for annual PAT testing. The law requires equipment to be
                maintained safely - how often you test depends on risk assessment, not arbitrary schedules.
                Annual testing is a common misconception, not a legal mandate.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Risk Assessment Factors</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <h5 className="text-elec-yellow font-medium">Equipment Type</h5>
                    <ul className="mt-1 space-y-1">
                      <li>• Class I vs Class II construction</li>
                      <li>• Heating elements increase risk</li>
                      <li>• Moving parts and flexing cables</li>
                      <li>• Power consumption/current draw</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">User Competence</h5>
                    <ul className="mt-1 space-y-1">
                      <li>• Trained vs untrained users</li>
                      <li>• Awareness of visual checks</li>
                      <li>• Ability to report defects</li>
                      <li>• Supervision level</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-elec-yellow font-medium">Environment</h5>
                    <ul className="mt-1 space-y-1">
                      <li>• Office vs construction site</li>
                      <li>• Exposure to moisture/dust</li>
                      <li>• Temperature extremes</li>
                      <li>• Risk of mechanical damage</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">Usage Patterns</h5>
                    <ul className="mt-1 space-y-1">
                      <li>• Frequency of use</li>
                      <li>• Moved frequently or static</li>
                      <li>• Multiple users</li>
                      <li>• Operating hours per day</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Risk Equation</h4>
              <p className="text-sm mb-2">
                Risk = Probability of harm × Severity of harm
              </p>
              <p className="text-sm">
                Higher risk equipment (high probability or severity) requires more frequent inspection.
                Lower risk equipment can have extended intervals. The goal is to catch faults before they cause harm.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Types of Inspection */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">02</span>
            </div>
            <h2 className="text-xl font-semibold">Types of Inspection</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The IET Code of Practice identifies three levels of inspection, each with different purposes and intervals.
              Understanding these helps create a layered approach to equipment safety.
            </p>

            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">User Checks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">What it is:</p>
                    <p>Simple visual check by the user before each use. No record usually required.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">What to look for:</p>
                    <ul className="space-y-1">
                      <li>• Obvious damage to case or cable</li>
                      <li>• Signs of overheating or burning</li>
                      <li>• Exposed wiring</li>
                      <li>• PAT label present and in date</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Frequency: Before each use / daily</p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Formal Visual Inspection</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">What it is:</p>
                    <p>Detailed visual inspection by a competent person. Recorded. No electrical tests.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">What to check:</p>
                    <ul className="space-y-1">
                      <li>• Cable condition and terminations</li>
                      <li>• Plug condition and correct fuse</li>
                      <li>• Case integrity and ventilation</li>
                      <li>• Suitability for environment</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Frequency: Weekly to 12 months depending on risk</p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Combined Inspection and Test</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">What it is:</p>
                    <p>Full formal visual inspection plus electrical tests using PAT tester. Fully recorded.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Tests include:</p>
                    <ul className="space-y-1">
                      <li>• Earth continuity (Class I)</li>
                      <li>• Insulation resistance</li>
                      <li>• Polarity check</li>
                      <li>• Touch current/leakage (if appropriate)</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Frequency: 3 months to 48 months depending on risk</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: IET Suggested Intervals */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">03</span>
            </div>
            <h2 className="text-xl font-semibold">IET Suggested Intervals</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The IET Code of Practice provides tables of suggested initial intervals. These are starting points
              for review, not absolute requirements. Always apply professional judgement.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <h4 className="font-semibold text-white mb-3">Construction Sites (High Risk)</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-elec-yellow">Equipment</th>
                    <th className="text-center py-2 text-elec-yellow">User Check</th>
                    <th className="text-center py-2 text-elec-yellow">Formal Visual</th>
                    <th className="text-center py-2 text-elec-yellow">Combined Test</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">110V portable tools</td>
                    <td className="text-center">Daily</td>
                    <td className="text-center">Weekly</td>
                    <td className="text-center">1 month</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">230V portable tools</td>
                    <td className="text-center">Daily</td>
                    <td className="text-center">Weekly</td>
                    <td className="text-center">1 month</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Site lighting</td>
                    <td className="text-center">Daily</td>
                    <td className="text-center">Weekly</td>
                    <td className="text-center">1 month</td>
                  </tr>
                  <tr>
                    <td className="py-2">Extension leads</td>
                    <td className="text-center">Daily</td>
                    <td className="text-center">Weekly</td>
                    <td className="text-center">1 month</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <h4 className="font-semibold text-white mb-3">Industrial/Commercial (Medium Risk)</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-elec-yellow">Equipment</th>
                    <th className="text-center py-2 text-elec-yellow">User Check</th>
                    <th className="text-center py-2 text-elec-yellow">Formal Visual</th>
                    <th className="text-center py-2 text-elec-yellow">Combined Test</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Portable tools (Class I)</td>
                    <td className="text-center">Daily</td>
                    <td className="text-center">Weekly</td>
                    <td className="text-center">6-12 months</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Portable tools (Class II)</td>
                    <td className="text-center">Daily</td>
                    <td className="text-center">Weekly</td>
                    <td className="text-center">6-12 months</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Moveable equipment</td>
                    <td className="text-center">Weekly</td>
                    <td className="text-center">Monthly</td>
                    <td className="text-center">12 months</td>
                  </tr>
                  <tr>
                    <td className="py-2">Stationary equipment</td>
                    <td className="text-center">Monthly</td>
                    <td className="text-center">6 months</td>
                    <td className="text-center">24 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <h4 className="font-semibold text-white mb-3">Office/Low Risk Environments</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-elec-yellow">Equipment</th>
                    <th className="text-center py-2 text-elec-yellow">User Check</th>
                    <th className="text-center py-2 text-elec-yellow">Formal Visual</th>
                    <th className="text-center py-2 text-elec-yellow">Combined Test</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">IT equipment (Class I)</td>
                    <td className="text-center">No</td>
                    <td className="text-center">24 months</td>
                    <td className="text-center">48 months</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">IT equipment (Class II)</td>
                    <td className="text-center">No</td>
                    <td className="text-center">24 months</td>
                    <td className="text-center">None</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Photocopiers/printers</td>
                    <td className="text-center">No</td>
                    <td className="text-center">24 months</td>
                    <td className="text-center">48 months</td>
                  </tr>
                  <tr>
                    <td className="py-2">Kettles/microwaves</td>
                    <td className="text-center">Weekly</td>
                    <td className="text-center">6 months</td>
                    <td className="text-center">12-24 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Important Notes
              </h4>
              <ul className="text-sm space-y-1">
                <li>• These are <strong>suggested initial intervals</strong>, not requirements</li>
                <li>• Review and adjust based on actual failure rates</li>
                <li>• Some Class II equipment may not need electrical testing</li>
                <li>• Higher risk items (heating, water proximity) need more frequent attention</li>
                <li>• New equipment may need shorter initial intervals until reliability is established</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04: Review and Adjustment */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">04</span>
            </div>
            <h2 className="text-xl font-semibold">Review and Adjustment</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Test intervals should not be fixed forever. Regular review of failure data allows you to optimise
              intervals - extending them where safe and shortening them where problems emerge.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                Using Failure Data
              </h4>
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-green-500 pl-3">
                  <h5 className="font-medium text-green-400">Low Failure Rates (&lt;2%)</h5>
                  <p className="mt-1">Consider extending intervals. Equipment and environment are well-matched.
                  Extend gradually (e.g., 12 months → 18 months) and monitor results.</p>
                </div>
                <div className="border-l-2 border-orange-500 pl-3">
                  <h5 className="font-medium text-orange-400">Moderate Failure Rates (2-5%)</h5>
                  <p className="mt-1">Current intervals may be appropriate. Investigate specific failure types.
                  Consider if certain equipment types or locations have higher rates.</p>
                </div>
                <div className="border-l-2 border-red-500 pl-3">
                  <h5 className="font-medium text-red-400">High Failure Rates (&gt;5%)</h5>
                  <p className="mt-1">Shorten intervals or increase formal visual inspections. Equipment may be
                  unsuitable for environment. Consider replacement of high-failure items.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">When to Extend Intervals</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Consistently low failure rates over 2+ years</li>
                  <li>✓ Equipment is low-risk type</li>
                  <li>✓ Environment is benign (office, etc.)</li>
                  <li>✓ Users conduct effective visual checks</li>
                  <li>✓ No accidents or near-misses</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">When to Shorten Intervals</h4>
                <ul className="text-sm space-y-1">
                  <li>• High or increasing failure rates</li>
                  <li>• Changes in environment or usage</li>
                  <li>• Incidents or near-misses occur</li>
                  <li>• Equipment nearing end of life</li>
                  <li>• User checks are ineffective</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Annual Review Process</h4>
              <ol className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                  <span>Analyse failure data by equipment type, location, and environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                  <span>Review any incidents, accidents, or near-misses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                  <span>Consider changes in operations, environment, or equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                  <span>Propose interval adjustments with justification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">5</span>
                  <span>Document decisions and implement changes</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 05: Practical Scheduling */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">05</span>
            </div>
            <h2 className="text-xl font-semibold">Practical Scheduling Strategies</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Efficient scheduling minimises disruption while ensuring all equipment is tested on time.
              Several strategies can help manage the logistics of a PAT testing programme.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-elec-yellow" />
                Scheduling Approaches
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium">Rolling Programme</h5>
                  <p className="text-gray-300 mt-1">Test a portion of equipment each month. Spreads workload evenly.
                  Good for large portfolios. Equipment tested at their individual due dates.</p>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium">Annual Block Testing</h5>
                  <p className="text-gray-300 mt-1">Test all equipment during a defined period. Efficient for small portfolios.
                  May align with quiet business periods. Higher short-term workload.</p>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium">Area/Department Rotation</h5>
                  <p className="text-gray-300 mt-1">Test entire departments at once. Reduces site visits. Easier coordination.
                  May mean some equipment tested early within interval.</p>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium">Hybrid Approach</h5>
                  <p className="text-gray-300 mt-1">Combine methods - e.g., rolling programme for most equipment but
                  departmental visits for practical efficiency. Flexible to business needs.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Scheduling Tips</h4>
                <ul className="text-sm space-y-1">
                  <li>• Build in buffer time for missed equipment</li>
                  <li>• Coordinate with department managers</li>
                  <li>• Avoid critical business periods</li>
                  <li>• Group similar intervals where practical</li>
                  <li>• Allow for equipment not available on day</li>
                  <li>• Plan catch-up sessions for missed items</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Handling Challenges</h4>
                <ul className="text-sm space-y-1">
                  <li>• Equipment in use: Return later or test out of hours</li>
                  <li>• Locked rooms: Coordinate keys/access</li>
                  <li>• Staff on leave: Test their equipment anyway</li>
                  <li>• Equipment missing: Note, investigate, reschedule</li>
                  <li>• New equipment: Add to next available slot</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Implementing New Intervals</h4>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">1</span>
                  <span>Start with IET suggested intervals for your environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">2</span>
                  <span>Consider your specific risk factors and adjust</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">3</span>
                  <span>Document your interval decisions and reasoning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">4</span>
                  <span>Implement and collect failure data for first cycle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">5</span>
                  <span>Review after first cycle and adjust based on data</span>
                </li>
              </ol>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Common Mistakes</h4>
              <ul className="text-sm space-y-1">
                <li>• Applying annual testing to everything regardless of risk</li>
                <li>• Never reviewing or adjusting intervals</li>
                <li>• Ignoring formal visual inspections</li>
                <li>• Not encouraging user checks</li>
                <li>• Treating IET tables as legal requirements</li>
                <li>• Not documenting interval decisions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-800 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="font-medium text-sm pr-4">{faq.question}</span>
                  <span className="text-elec-yellow transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference: Interval Planning</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Risk Assessment Factors</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Equipment type and class</li>
                  <li>• Environment (office/construction)</li>
                  <li>• Usage frequency and pattern</li>
                  <li>• User competence</li>
                  <li>• Previous failure history</li>
                  <li>• Consequences of failure</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Interval Review Triggers</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Annual data review</li>
                  <li>• High/low failure rates</li>
                  <li>• Incidents or accidents</li>
                  <li>• Environment changes</li>
                  <li>• New equipment types</li>
                  <li>• Regulatory updates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8">
          <Quiz
            title="Section 4 Quiz: Re-Test Period Planning"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
          <Link to="/electrical-upskilling/pat-testing/module5/section3">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 touch-manipulation min-h-[44px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Asset Register
            </Button>
          </Link>
          <Link to="/electrical-upskilling/pat-testing/module5/section5">
            <Button className="w-full sm:w-auto bg-elec-yellow text-gray-900 hover:bg-elec-yellow/90 touch-manipulation min-h-[44px]">
              Next: Certification & Reporting
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PATTestingModule5Section4;
