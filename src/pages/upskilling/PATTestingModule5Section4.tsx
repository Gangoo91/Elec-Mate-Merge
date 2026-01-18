import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Re-Test Period Planning - PAT Testing Module 5 Section 4";
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
    id: 1,
    question: "According to the IET Code of Practice, test intervals should be based on:",
    options: ["Annual fixed schedule", "Risk assessment and review", "Equipment colour", "User preference"],
    correctAnswer: 1,
    explanation: "The IET Code of Practice advocates a risk-based approach, not arbitrary fixed schedules."
  },
  {
    id: 2,
    question: "What is the suggested initial test interval for Class I construction site equipment?",
    options: ["48 months", "24 months", "3 months", "Weekly"],
    correctAnswer: 2,
    explanation: "Construction site equipment is high-risk and typically requires testing every 1-3 months."
  },
  {
    id: 3,
    question: "User checks of equipment should typically be conducted:",
    options: ["Never", "Before each use", "Monthly", "Only when faulty"],
    correctAnswer: 1,
    explanation: "Users should conduct simple visual checks before each use to spot obvious damage."
  },
  {
    id: 4,
    question: "What factor would justify extending test intervals?",
    options: ["Cost savings required", "Consistently low failure rates over time", "New tester appointed", "Equipment getting older"],
    correctAnswer: 1,
    explanation: "Consistently low failure rates over multiple test cycles indicate intervals may be safely extended."
  },
  {
    id: 5,
    question: "In a hotel environment, portable appliances in guest rooms typically require:",
    options: ["Annual combined inspection and test", "Testing every 5 years", "No testing needed", "Weekly visual inspection"],
    correctAnswer: 0,
    explanation: "Hotel environments with public access typically require annual combined inspection and testing."
  },
  {
    id: 6,
    question: "What is the purpose of the IET Code of Practice tables?",
    options: ["Legal requirements", "Suggested initial intervals requiring review", "Absolute fixed intervals", "Insurance requirements"],
    correctAnswer: 1,
    explanation: "The IET tables provide suggested initial intervals as starting points for review and adjustment."
  },
  {
    id: 7,
    question: "Double-insulated (Class II) equipment generally requires:",
    options: ["More frequent testing than Class I", "Same intervals as Class I", "Less frequent testing than Class I", "No testing at all"],
    correctAnswer: 2,
    explanation: "Class II equipment has additional insulation protection and typically requires less frequent testing."
  },
  {
    id: 8,
    question: "Test scheduling should include provision for:",
    options: ["Testing all equipment on one day", "Equipment not available on scheduled date", "Only testing during holidays", "Random testing times"],
    correctAnswer: 1,
    explanation: "Schedules must accommodate equipment that may be unavailable, with catch-up sessions planned."
  },
  {
    id: 9,
    question: "High-risk equipment like electric kettles in commercial kitchens might need:",
    options: ["Annual testing", "Monthly formal visual inspection", "Testing every 5 years", "User checks only"],
    correctAnswer: 1,
    explanation: "High-risk equipment in demanding environments may need monthly formal visual inspections."
  },
  {
    id: 10,
    question: "When implementing a new PAT testing programme, initial intervals should be:",
    options: ["Very long to save money", "Conservative until failure data is gathered", "Based on guesswork", "The same for all equipment"],
    correctAnswer: 1,
    explanation: "Start with conservative intervals and adjust based on actual failure data collected."
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
    answer: "You can explain the risk-based approach but ultimately follow the client's requirements. Document that more frequent testing was requested. Over-testing is not harmful, just potentially unnecessary."
  },
  {
    question: "How do I handle equipment that is rarely used?",
    answer: "Consider condition-based testing - test before each use if equipment sits idle for extended periods. Include in regular schedules but note low usage. Faults may develop during storage."
  },
  {
    question: "Should new equipment be tested immediately?",
    answer: "New equipment should be inspected and may need testing before first use, especially if there is any doubt about condition. This establishes a baseline and verifies equipment arrived undamaged."
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
            <span>Module 5 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Re-Test Period Planning
          </h1>
          <p className="text-white/80">
            Planning effective test schedules based on risk assessment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Key Principle:</strong> Risk-based intervals, not fixed schedules</li>
              <li><strong>IET Guidance:</strong> Weekly checks to 48 months testing</li>
              <li><strong>Review:</strong> Adjust based on failure rates</li>
              <li><strong>Layers:</strong> User checks, visual, combined testing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High-risk equipment needing shorter intervals</li>
              <li><strong>Use:</strong> IET tables as starting points for review</li>
              <li><strong>Apply:</strong> Failure data to optimise schedules</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply risk assessment to determine test intervals",
              "Interpret IET Code of Practice interval tables",
              "Distinguish between inspection types",
              "Create efficient testing schedules",
              "Review and adjust intervals based on data",
              "Handle scheduling challenges practically"
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

        {/* Section 1: The Risk-Based Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Risk-Based Approach
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IET Code of Practice advocates a risk-based approach to determining test intervals. This means
              considering multiple factors rather than applying a blanket schedule to all equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Important clarification:</p>
              <p className="text-sm text-white">
                There is no legal requirement for annual PAT testing. The law requires equipment to be
                maintained safely - how often you test depends on risk assessment, not arbitrary schedules.
                Annual testing is a common misconception, not a legal mandate.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Risk assessment factors:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Type</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Class I vs Class II construction</li>
                    <li>Heating elements increase risk</li>
                    <li>Moving parts and flexing cables</li>
                    <li>Power consumption/current draw</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environment</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Office vs construction site</li>
                    <li>Exposure to moisture/dust</li>
                    <li>Temperature extremes</li>
                    <li>Risk of mechanical damage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Risk equation:</p>
              <p className="text-sm text-white">
                Risk = Probability of harm x Severity of harm. Higher risk equipment (high probability or severity)
                requires more frequent inspection. Lower risk equipment can have extended intervals.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Types of Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IET Code of Practice identifies three levels of inspection, each with different purposes and intervals.
              Understanding these helps create a layered approach to equipment safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">User Checks (Daily/Before Use)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Simple visual check by the user before each use</li>
                <li>Look for obvious damage to case or cable</li>
                <li>Check for signs of overheating or burning</li>
                <li>Check PAT label is present and in date</li>
                <li>No record usually required</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formal Visual Inspection (Weekly to 12 months)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Detailed visual inspection by a competent person</li>
                <li>Check cable condition and terminations</li>
                <li>Check plug condition and correct fuse</li>
                <li>Verify case integrity and ventilation</li>
                <li>Results must be recorded</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Combined Inspection and Test (3 to 48 months)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Full formal visual inspection plus electrical tests</li>
                <li>Earth continuity test (Class I equipment)</li>
                <li>Insulation resistance test</li>
                <li>Polarity check and leakage tests if appropriate</li>
                <li>Results fully recorded with test values</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: IET Suggested Intervals */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            IET Suggested Intervals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IET Code of Practice provides tables of suggested initial intervals. These are starting points
              for review, not absolute requirements. Always apply professional judgement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Sites (High Risk)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>110V/230V portable tools: Daily user check, weekly visual, monthly combined test</li>
                <li>Site lighting: Daily user check, weekly visual, monthly combined test</li>
                <li>Extension leads: Daily user check, weekly visual, monthly combined test</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial/Commercial (Medium Risk)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Portable tools (Class I): Daily check, weekly visual, 6-12 month combined test</li>
                <li>Moveable equipment: Weekly check, monthly visual, 12 month combined test</li>
                <li>Stationary equipment: Monthly check, 6 month visual, 24 month combined test</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Office/Low Risk Environments</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>IT equipment (Class I): No user check, 24 month visual, 48 month combined test</li>
                <li>IT equipment (Class II): No user check, 24 month visual, no combined test needed</li>
                <li>Kettles/microwaves: Weekly user check, 6 month visual, 12-24 month combined test</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> These are suggested initial intervals, not requirements. Review and adjust
              based on actual failure rates. Higher risk items need more frequent attention.
            </p>
          </div>
        </section>

        {/* Section 4: Review and Adjustment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Review and Adjustment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test intervals should not be fixed forever. Regular review of failure data allows you to optimise
              intervals - extending them where safe and shortening them where problems emerge.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Using failure data:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Low failure rates (&lt;2%):</strong> Consider extending intervals gradually</li>
                <li><strong>Moderate rates (2-5%):</strong> Current intervals may be appropriate</li>
                <li><strong>High failure rates (&gt;5%):</strong> Shorten intervals or increase visual inspections</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Extend Intervals</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Consistently low failure rates over 2+ years</li>
                  <li>Equipment is low-risk type</li>
                  <li>Environment is benign (office, etc.)</li>
                  <li>Users conduct effective visual checks</li>
                  <li>No accidents or near-misses</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Shorten Intervals</p>
                <ul className="text-sm text-white space-y-1">
                  <li>High or increasing failure rates</li>
                  <li>Changes in environment or usage</li>
                  <li>Incidents or near-misses occur</li>
                  <li>Equipment nearing end of life</li>
                  <li>User checks are ineffective</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Practical Scheduling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practical Scheduling Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Efficient scheduling minimises disruption while ensuring all equipment is tested on time.
              Several strategies can help manage the logistics of a PAT testing programme.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Scheduling approaches:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rolling programme:</strong> Test a portion each month, spreads workload evenly</li>
                <li><strong>Annual block testing:</strong> Test all during defined period, efficient for small portfolios</li>
                <li><strong>Area/department rotation:</strong> Test entire departments at once, reduces site visits</li>
                <li><strong>Hybrid approach:</strong> Combine methods for practical efficiency</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scheduling Tips</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Build in buffer time for missed equipment</li>
                  <li>Coordinate with department managers</li>
                  <li>Avoid critical business periods</li>
                  <li>Group similar intervals where practical</li>
                  <li>Plan catch-up sessions for missed items</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handling Challenges</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Equipment in use: Return later or test out of hours</li>
                  <li>Locked rooms: Coordinate keys/access</li>
                  <li>Staff on leave: Test their equipment anyway</li>
                  <li>Equipment missing: Note, investigate, reschedule</li>
                  <li>New equipment: Add to next available slot</li>
                </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Implementing New Intervals</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with IET suggested intervals for your environment</li>
                <li>Consider your specific risk factors and adjust</li>
                <li>Document your interval decisions and reasoning</li>
                <li>Implement and collect failure data for first cycle</li>
                <li>Review after first cycle and adjust based on data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Advising Clients</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Explain the risk-based approach clearly</li>
                <li>Show IET guidance supports your recommendations</li>
                <li>Document the rationale for chosen intervals</li>
                <li>Offer to review after first test cycle</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Applying annual testing to everything</strong> — use risk assessment instead</li>
                <li><strong>Never reviewing intervals</strong> — data should drive adjustments</li>
                <li><strong>Ignoring formal visual inspections</strong> — they catch many faults</li>
                <li><strong>Not encouraging user checks</strong> — first line of defence</li>
                <li><strong>Treating IET tables as legal requirements</strong> — they are guidance only</li>
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
                <p className="font-medium text-white mb-1">Risk Assessment Factors</p>
                <ul className="space-y-0.5">
                  <li>Equipment type and class</li>
                  <li>Environment (office/construction)</li>
                  <li>Usage frequency and pattern</li>
                  <li>User competence</li>
                  <li>Previous failure history</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Interval Review Triggers</p>
                <ul className="space-y-0.5">
                  <li>Annual data review</li>
                  <li>High/low failure rates</li>
                  <li>Incidents or accidents</li>
                  <li>Environment changes</li>
                  <li>New equipment types</li>
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

export default PATTestingModule5Section4;
