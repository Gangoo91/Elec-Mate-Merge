import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Frequency of Inspection and Testing - PAT Testing Module 1";
const DESCRIPTION = "Learn how to determine appropriate PAT testing frequencies based on risk assessment, equipment type, environment, and usage patterns for optimal safety and efficiency.";

const quickCheckQuestions = [
  {
    id: "frequency-factors",
    question: "What factors influence PAT testing frequency?",
    options: [
      "Only the equipment age",
      "Usage, environment, equipment class, and previous fault history",
      "Just the manufacturer's recommendations",
      "Only legal requirements"
    ],
    correctIndex: 1,
    explanation: "PAT frequency depends on multiple factors including how often equipment is used, the environment it's used in, the equipment class, and any history of faults."
  },
  {
    id: "drill-vs-pc",
    question: "Would a drill used daily need more or less frequent testing than a PC?",
    options: [
      "Less frequent - it's more robust",
      "Same frequency - they're both electrical",
      "More frequent - higher usage and risk",
      "No testing needed for tools"
    ],
    correctIndex: 2,
    explanation: "A drill used daily would need more frequent testing than a PC due to higher usage, more physical stress, and typically harsher working environments."
  },
  {
    id: "guidance-provider",
    question: "Who provides testing frequency guidance in the UK?",
    options: [
      "Only equipment manufacturers",
      "HSE and IET Code of Practice",
      "Local councils",
      "Insurance companies only"
    ],
    correctIndex: 1,
    explanation: "The HSE (Health and Safety Executive) and IET (Institution of Engineering and Technology) Code of Practice provide official guidance on PAT testing frequencies."
  },
  {
    id: "annual-review",
    question: "Why should records be reviewed annually?",
    options: [
      "It's a legal requirement",
      "To adjust testing intervals based on performance and fault trends",
      "To satisfy insurance companies",
      "Only for audit purposes"
    ],
    correctIndex: 1,
    explanation: "Annual review of PAT records allows you to adjust testing intervals based on actual performance, fault trends, and changing usage patterns to optimise your testing programme."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What factors influence PAT testing frequency?",
    options: [
      "Only the equipment age",
      "Usage, environment, equipment class, and previous fault history",
      "Just the manufacturer's recommendations",
      "Only legal requirements"
    ],
    correctAnswer: 1,
    explanation: "PAT frequency depends on multiple factors including how often equipment is used, the environment it's used in, the equipment class, and any history of faults."
  },
  {
    id: 2,
    question: "Would a drill used daily need more or less frequent testing than a PC?",
    options: [
      "Less frequent - it's more robust",
      "Same frequency - they're both electrical",
      "More frequent - higher usage and risk",
      "No testing needed for tools"
    ],
    correctAnswer: 2,
    explanation: "A drill used daily would need more frequent testing than a PC due to higher usage, more physical stress, and typically harsher working environments."
  },
  {
    id: 3,
    question: "Who provides testing frequency guidance in the UK?",
    options: [
      "Only equipment manufacturers",
      "HSE and IET Code of Practice",
      "Local councils",
      "Insurance companies only"
    ],
    correctAnswer: 1,
    explanation: "The HSE (Health and Safety Executive) and IET (Institution of Engineering and Technology) Code of Practice provide official guidance on PAT testing frequencies."
  },
  {
    id: 4,
    question: "Why should records be reviewed annually?",
    options: [
      "It's a legal requirement",
      "To adjust testing intervals based on performance and fault trends",
      "To satisfy insurance companies",
      "Only for audit purposes"
    ],
    correctAnswer: 1,
    explanation: "Annual review of PAT records allows you to adjust testing intervals based on actual performance, fault trends, and changing usage patterns to optimise your testing programme."
  },
  {
    id: 5,
    question: "Can testing intervals be reduced over time?",
    options: [
      "No, they must always increase",
      "Only with manufacturer approval",
      "Yes, if equipment proves reliable and usage decreases",
      "Never, intervals are fixed"
    ],
    correctAnswer: 2,
    explanation: "Testing intervals can be adjusted based on performance data. If equipment proves reliable and usage patterns change, intervals may be extended with proper risk assessment."
  },
  {
    id: 6,
    question: "What is the typical testing interval for handheld tools on construction sites?",
    options: [
      "Annually",
      "Every 6 months",
      "Every 3 months",
      "Every 2 years"
    ],
    correctAnswer: 2,
    explanation: "Construction site equipment typically requires testing every 3 months due to harsh conditions, frequent movement, and high risk of damage."
  },
  {
    id: 7,
    question: "Which environment typically requires the LEAST frequent testing?",
    options: [
      "Commercial kitchen",
      "Construction site",
      "Office environment",
      "School workshop"
    ],
    correctAnswer: 2,
    explanation: "Office environments are typically low risk with controlled conditions, allowing longer testing intervals (up to 4 years for some IT equipment)."
  },
  {
    id: 8,
    question: "What should trigger an increase in testing frequency?",
    options: [
      "Equipment passing all tests consistently",
      "Equipment failures or damage being reported",
      "Reduction in staff numbers",
      "Budget increases"
    ],
    correctAnswer: 1,
    explanation: "Equipment failures, damage reports, or changes to harsher conditions should trigger more frequent testing to prevent safety incidents."
  },
  {
    id: 9,
    question: "How does equipment class affect testing frequency?",
    options: [
      "Class II equipment always needs more frequent testing",
      "Class I equipment may need more frequent testing due to earthing requirements",
      "Equipment class doesn't affect frequency",
      "Only Class III equipment needs regular testing"
    ],
    correctAnswer: 1,
    explanation: "Class I equipment relies on earthing for protection and may need more frequent testing to ensure earth continuity is maintained, especially in harsh environments."
  },
  {
    id: 10,
    question: "What is the recommended approach to setting initial testing frequencies?",
    options: [
      "Always use the longest intervals allowed",
      "Start conservative and adjust based on results",
      "Copy what other organisations do",
      "Only test when equipment appears damaged"
    ],
    correctAnswer: 1,
    explanation: "Best practice is to start with conservative (shorter) intervals and gradually extend them for equipment that consistently passes tests, based on documented evidence."
  }
];

const faqs = [
  {
    question: "Does the law specify exact testing frequencies?",
    answer: "No, UK legislation doesn't specify exact frequencies. The IET Code of Practice provides guidance, but frequencies should be determined by risk assessment considering equipment type, usage, environment, and fault history."
  },
  {
    question: "Can I test all equipment at the same frequency?",
    answer: "While simpler administratively, this approach isn't recommended. Different equipment types and environments carry different risks. A risk-based approach is more effective - test high-risk items more frequently and low-risk items less often."
  },
  {
    question: "What if equipment consistently passes tests?",
    answer: "If equipment consistently passes over several testing cycles with no signs of deterioration, you may consider extending the testing interval. Document your reasoning and maintain records to support any frequency changes."
  },
  {
    question: "How do I handle equipment that moves between environments?",
    answer: "Equipment should be tested based on its highest-risk usage. If a drill is used both in offices and on construction sites, apply the construction site frequency (typically 3 months)."
  },
  {
    question: "Should new equipment be tested before first use?",
    answer: "Yes, new equipment should undergo visual inspection and, ideally, electrical testing before being put into service. This establishes a baseline and verifies the equipment was not damaged in transit."
  },
  {
    question: "What records should I keep for frequency decisions?",
    answer: "Document your risk assessment, the factors considered, frequencies assigned to each equipment type, and any adjustments made over time. Include the rationale for any changes and review dates."
  }
];

const PATTestingModule1Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 1 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Frequency of Inspection and Testing
          </h1>
          <p className="text-white/80">
            Determining appropriate testing intervals based on risk assessment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>No fixed rule:</strong> Frequency depends on risk</li>
              <li><strong>Key factors:</strong> Usage, environment, equipment type</li>
              <li><strong>Guidance:</strong> IET Code of Practice</li>
              <li><strong>Review:</strong> Adjust based on results annually</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High-risk = more frequent testing</li>
              <li><strong>Use:</strong> Risk assessment to determine intervals</li>
              <li><strong>Apply:</strong> Review and adjust based on data</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand risk-based testing frequency principles",
              "Learn typical intervals for different environments",
              "Know how to classify high, medium, and low risk equipment",
              "Explore record-keeping and review cycles",
              "Apply IET Code of Practice guidance",
              "Adjust frequencies based on performance data"
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

        {/* Section 1: Risk-Based Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Risk-Based Testing Frequency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not every appliance needs testing yearly — it depends on risk. Getting the frequency right ensures
              safety while avoiding unnecessary testing that wastes time and resources.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors that determine testing frequency:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Equipment type:</strong> Handheld tools vs stationary equipment</li>
                <li><strong>Environment:</strong> Office vs construction site vs kitchen</li>
                <li><strong>Usage intensity:</strong> Daily use vs occasional use</li>
                <li><strong>Equipment class:</strong> Class I (earthed) vs Class II (double insulated)</li>
                <li><strong>Fault history:</strong> Previous failures or damage</li>
                <li><strong>User competence:</strong> Trained operators vs general public</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Environment-Based Frequencies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Environment-Based Testing Frequencies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Office Environment (Low Risk)</p>
                <p className="text-xs text-white/80 mb-2">Controlled conditions, trained users</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Handheld: 2 years</li>
                  <li>Portable: 2 years</li>
                  <li>IT Equipment: 4 years</li>
                  <li>Stationary: 5 years</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Schools/Hotels (Medium Risk)</p>
                <p className="text-xs text-white/80 mb-2">Heavy usage, varied users</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Handheld: 12 months</li>
                  <li>Portable: 12 months</li>
                  <li>IT Equipment: 2 years</li>
                  <li>Kitchen: 6 months</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Commercial Kitchen (High Risk)</p>
                <p className="text-xs text-white/80 mb-2">Harsh conditions, heat, moisture</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Handheld: 6 months</li>
                  <li>Portable: 6 months</li>
                  <li>Fixed heating: 12 months</li>
                  <li>Refrigeration: 12 months</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Construction Site (Very High Risk)</p>
                <p className="text-xs text-white/80 mb-2">Extreme conditions, frequent movement</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Handheld: 3 months</li>
                  <li>Portable: 3 months</li>
                  <li>Extension leads: 3 months</li>
                  <li>Site lighting: 3 months</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: IET Guidance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            IET Code of Practice Guidance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IET Code of Practice for In-Service Inspection and Testing provides comprehensive guidance
              on testing frequencies. These are recommendations, not legal requirements — you can adjust based
              on your specific risk assessment.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-elec-yellow font-medium">Equipment Type</th>
                    <th className="text-left py-2 px-3 text-elec-yellow font-medium">Office</th>
                    <th className="text-left py-2 px-3 text-elec-yellow font-medium">School</th>
                    <th className="text-left py-2 px-3 text-elec-yellow font-medium">Kitchen</th>
                    <th className="text-left py-2 px-3 text-elec-yellow font-medium">Site</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 font-medium">Handheld</td>
                    <td className="py-2 px-3">2 years</td>
                    <td className="py-2 px-3">12 months</td>
                    <td className="py-2 px-3">6 months</td>
                    <td className="py-2 px-3">3 months</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 font-medium">Portable</td>
                    <td className="py-2 px-3">2 years</td>
                    <td className="py-2 px-3">12 months</td>
                    <td className="py-2 px-3">6 months</td>
                    <td className="py-2 px-3">3 months</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 font-medium">IT Equipment</td>
                    <td className="py-2 px-3">4 years</td>
                    <td className="py-2 px-3">2 years</td>
                    <td className="py-2 px-3">12 months</td>
                    <td className="py-2 px-3">6 months</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 font-medium">Extension Leads</td>
                    <td className="py-2 px-3">2 years</td>
                    <td className="py-2 px-3">12 months</td>
                    <td className="py-2 px-3">6 months</td>
                    <td className="py-2 px-3">3 months</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Stationary</td>
                    <td className="py-2 px-3">5 years</td>
                    <td className="py-2 px-3">2 years</td>
                    <td className="py-2 px-3">12 months</td>
                    <td className="py-2 px-3">6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Risk Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Risk Factors Affecting Frequency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Factors that INCREASE frequency:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Harsh environments (dust, moisture, heat)</li>
                  <li>Heavy usage or frequent movement</li>
                  <li>Previous fault history</li>
                  <li>High-risk equipment types</li>
                  <li>Equipment age and condition</li>
                  <li>Untrained or careless users</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Factors that may DECREASE frequency:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Controlled, clean environments</li>
                  <li>Infrequent use or fixed positioning</li>
                  <li>Excellent maintenance records</li>
                  <li>Double insulated equipment</li>
                  <li>Comprehensive user training</li>
                  <li>Consistent test passes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Record Keeping and Review */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Record Keeping and Review Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Records to Maintain</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Equipment register with unique identifiers</li>
                  <li>Test dates and results for each item</li>
                  <li>Fault history and repair records</li>
                  <li>User feedback and incident reports</li>
                  <li>Environmental condition changes</li>
                  <li>Tester qualifications and calibration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Review Process</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Analyse failure rates by equipment type</li>
                  <li>Review environmental risk assessments</li>
                  <li>Assess usage pattern changes</li>
                  <li>Compare costs vs safety benefits</li>
                  <li>Update testing frequencies as needed</li>
                  <li>Document decisions and rationale</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Best Practice Tip:</p>
              <p className="text-sm text-white">
                Start with conservative frequencies and gradually extend intervals for equipment that consistently passes tests.
                Always document your reasoning and ensure changes are based on solid evidence, not just cost reduction.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Real World Scenario */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Case Study: Warehouse Testing Optimisation</p>
              <div className="space-y-3 text-sm text-white">
                <p>
                  <strong>Situation:</strong> A warehouse reduced PAT frequency for fixed printers but increased checks on handheld power tools used daily.
                </p>
                <p>
                  <strong>Results:</strong> This reduced overall testing costs by 30% while improving safety focus on high-risk equipment.
                </p>
                <p>
                  <strong>The Lesson:</strong> Risk-based frequency adjustment is about smart resource allocation — testing the right equipment at the right intervals, not testing everything equally.
                </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Setting Frequencies</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with IET Code of Practice recommendations as baseline</li>
                <li>Assess specific risks for your environment and equipment</li>
                <li>Consider user competence and supervision levels</li>
                <li>Document your risk assessment and reasoning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Reviewing Frequencies</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Review annually or after significant changes</li>
                <li>Look for patterns in test results and failures</li>
                <li>Consider any changes in environment or usage</li>
                <li>Adjust intervals based on evidence, not assumptions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>One size fits all</strong> — different equipment needs different frequencies</li>
                <li><strong>Extending without evidence</strong> — only extend intervals based on consistent pass results</li>
                <li><strong>Ignoring environment changes</strong> — reassess when conditions change</li>
                <li><strong>Poor documentation</strong> — always record your frequency decisions and reasoning</li>
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
                <p className="font-medium text-white mb-1">Key Frequencies</p>
                <ul className="space-y-0.5">
                  <li>Construction site tools: 3 months</li>
                  <li>Kitchen appliances: 6 months</li>
                  <li>Office portable: 2 years</li>
                  <li>Office IT: 4 years</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Principles</p>
                <ul className="space-y-0.5">
                  <li>Higher risk = more frequent testing</li>
                  <li>Review and adjust annually</li>
                  <li>Document all decisions</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default PATTestingModule1Section4;
