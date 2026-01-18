import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Risk-Based Test Intervals - PAT Testing Course";
const DESCRIPTION = "Learn how to apply risk assessment principles to determine appropriate PAT testing frequencies.";

const quickCheckQuestions = [
  {
    id: "m3s5-check1",
    question: "A construction site uses 110V power tools daily in dusty, wet conditions. How would you classify the testing frequency requirement?",
    options: ["Annual testing is sufficient", "Monthly visual + 3-monthly formal testing recommended", "Only test when equipment appears damaged", "Six-monthly testing regardless of conditions"],
    correctIndex: 1,
    explanation: "Construction sites with harsh conditions are high-risk environments. IET guidance recommends monthly user checks plus formal testing every 3 months."
  },
  {
    id: "m3s5-check2",
    question: "An office printer used by trained staff in a clean environment was last tested 18 months ago. What is the appropriate action?",
    options: ["Immediate formal testing required", "Testing is overdue - schedule within 1 month", "The risk level may justify extended intervals up to 48 months", "No testing needed for IT equipment"],
    correctIndex: 2,
    explanation: "Low-risk environments with IT equipment may have extended intervals. IET guidance suggests up to 48 months for such scenarios."
  },
  {
    id: "m3s5-check3",
    question: "What is the PRIMARY factor that should influence PAT testing intervals?",
    options: ["The manufacturer warranty period", "The equipment purchase price", "Risk assessment considering use, environment, and user competency", "A fixed 12-month schedule"],
    correctIndex: 2,
    explanation: "Risk-based testing uses assessment of multiple factors rather than arbitrary fixed intervals."
  }
];

const quizQuestions = [
  { id: 1, question: "What does the IET Code of Practice recommend for PAT testing intervals?", options: ["Annual testing for all", "Manufacturer intervals", "Risk assessment considering equipment, environment, usage", "Insurance requirements only"], correctAnswer: 2, explanation: "The IET Code of Practice recommends a risk-based approach that considers equipment type, environment, and usage patterns." },
  { id: 2, question: "Which factor requires shorter testing intervals?", options: ["Clean office environment", "Trained users", "Secure storage", "Construction sites with cable trailing"], correctAnswer: 3, explanation: "Construction sites with trailing cables are high-risk environments requiring more frequent testing." },
  { id: 3, question: "For Class I industrial equipment, what interval does IET suggest?", options: ["Weekly visual, 6-12 monthly formal", "Monthly visual, 6-12 monthly formal", "Annual visual and formal combined", "No specific guidance"], correctAnswer: 1, explanation: "IET suggests monthly visual checks and 6-12 monthly formal testing for Class I industrial equipment." },
  { id: 4, question: "Why document risk assessments for testing intervals?", options: ["To save money", "To provide evidence of due diligence", "To avoid inspections", "Not required"], correctAnswer: 1, explanation: "Documentation provides evidence of due diligence and demonstrates compliance with safety requirements." },
  { id: 5, question: "If equipment consistently passes tests, what action is appropriate?", options: ["Stop testing", "Remove from register", "Consider extending the interval", "Continue same interval"], correctAnswer: 2, explanation: "Consistently passing equipment may justify extended intervals, subject to risk assessment." },
  { id: 6, question: "Which environment allows LONGEST intervals?", options: ["Hotel kitchen", "Office with IT and trained users", "School workshop", "Outdoor event"], correctAnswer: 1, explanation: "Offices with IT equipment and trained users are low-risk environments allowing longer intervals." },
  { id: 7, question: "What if risk assessment for an area changes?", options: ["Continue existing intervals", "Reassess and adjust accordingly", "Only change after incident", "Wait for annual review"], correctAnswer: 1, explanation: "Testing intervals should be reassessed and adjusted when circumstances change." },
  { id: 8, question: "Primary purpose of user checks?", options: ["Replace formal testing", "Identify obvious damage before use", "Record measurements", "Satisfy insurance"], correctAnswer: 1, explanation: "User checks identify obvious damage before use, supplementing formal testing." },
  { id: 9, question: "Which indicates need for MORE frequent testing?", options: ["New with warranty", "Portable and moved frequently", "Fixed in position", "Used occasionally"], correctAnswer: 1, explanation: "Portable equipment moved frequently is more likely to sustain damage and needs more frequent testing." },
  { id: 10, question: "IET suggests reviewing intervals:", options: ["When legislation changes", "Every 5 years", "Periodically based on test results", "Never"], correctAnswer: 2, explanation: "Intervals should be reviewed periodically based on test results and pass/fail rates." }
];

const faqs = [
  { question: "Is annual PAT testing legally required?", answer: "No. There is no legal requirement for annual testing. The law requires equipment to be maintained safely. IET recommends risk-based intervals." },
  { question: "Can I extend intervals if equipment consistently passes?", answer: "Yes, if your risk assessment supports it. Document your reasoning - consistent passes, low-risk environment, trained users all justify extended intervals." },
  { question: "Difference between user checks and formal testing?", answer: "User checks are visual inspections before use. Formal testing involves electrical measurements by a competent person." },
  { question: "How to determine interval for new equipment?", answer: "Start with IET suggested intervals. After initial testing cycles, review pass/fail rates and adjust." },
  { question: "Should hire equipment be tested differently?", answer: "Yes. Hire equipment experiences varied conditions. Test before each hire period or more frequently." },
  { question: "What if insurance requires specific intervals?", answer: "Follow insurance requirements if shorter. Document this is for insurance compliance." }
];

const PATTestingModule3Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Risk-Based Test Intervals
          </h1>
          <p className="text-white/80">
            Determine appropriate testing frequencies using risk assessment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Risk-based:</strong> Not all equipment needs annual testing</li>
              <li><strong>Factors:</strong> Environment, usage, equipment type, users</li>
              <li><strong>IET guidance:</strong> Suggests intervals from 3 months to 48 months</li>
              <li><strong>Review:</strong> Adjust based on pass/fail rates</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>High risk:</strong> Construction, industrial - 3-6 months</li>
              <li><strong>Medium risk:</strong> Retail, schools - 6-12 months</li>
              <li><strong>Low risk:</strong> Offices, IT equipment - 24-48 months</li>
              <li><strong>Document:</strong> Always record your reasoning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain principles of risk-based testing intervals",
              "Identify factors affecting testing frequency",
              "Apply IET guidance to determine intervals",
              "Assess environmental and usage risk factors",
              "Document and justify interval decisions",
              "Review and adjust intervals based on data"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Risk-Based vs Fixed-Interval Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Risk-Based vs Fixed-Interval Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The traditional approach of testing all equipment annually regardless of type or use is increasingly recognised as inefficient. The IET Code of Practice advocates a <strong>risk-based approach</strong> that tailors testing intervals to actual risk levels.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Risk-based testing recognises that:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Different hazards:</strong> A power tool on a construction site faces different hazards than an office desk lamp</li>
                <li><strong>User competency:</strong> Equipment used by trained professionals may need less frequent testing</li>
                <li><strong>Environment matters:</strong> Environmental conditions significantly affect deterioration rates</li>
                <li><strong>Efficiency:</strong> Fixed intervals may over-test low-risk items while under-testing high-risk equipment</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Key Principle:</strong> The goal is not to test as often as possible, but as often as necessary to maintain safety.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Equipment Type and Class Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Equipment Type and Class Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different equipment types present different risk profiles. The IET provides suggested intervals based on equipment mobility and environment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IET Suggested Intervals (Office Environment):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Stationary equipment:</strong> Formal visual 24-48 months, combined test 48 months</li>
                <li><strong>IT equipment:</strong> Formal visual 24-48 months, combined test 48 months</li>
                <li><strong>Moveable equipment:</strong> Formal visual 12-24 months, combined test 24 months</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IET Suggested Intervals (Industrial Environment):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Portable equipment:</strong> User check weekly, formal visual monthly, combined test 6-12 months</li>
                <li><strong>Hand-held equipment:</strong> User check daily, formal visual weekly, combined test 6 months</li>
                <li><strong>Cables and leads:</strong> User check daily, formal visual weekly, combined test 6-12 months</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Equipment Class Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Class I equipment:</strong> Relies on earth connection for safety - typically needs more frequent testing</li>
                <li><strong>Class II equipment:</strong> Double insulated, no earth required - may allow slightly longer intervals</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03: Environmental Risk Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Environmental Risk Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Environment significantly affects equipment deterioration rates and testing frequency requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">High Risk Environments (3-6 month intervals):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Construction sites</li>
                <li>Industrial workshops</li>
                <li>Outdoor events</li>
                <li>Commercial kitchens</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Medium-High Risk (6-12 month intervals):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Schools</li>
                <li>Hotels</li>
                <li>Retail environments</li>
                <li>Warehouses</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Medium Risk (12-24 month intervals):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Light industrial</li>
                <li>Laboratories</li>
                <li>Healthcare (non-clinical)</li>
                <li>Gyms</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Low Risk (24-48 month intervals):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Offices</li>
                <li>Reception areas</li>
                <li>Server rooms</li>
                <li>Libraries</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Usage Patterns and User Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Usage Patterns and User Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              How equipment is used and who uses it significantly impacts risk assessment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Usage Frequency Impact:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Continuous use:</strong> More frequent testing required</li>
                <li><strong>Daily use:</strong> Regular inspection plus periodic testing</li>
                <li><strong>Occasional use:</strong> May allow extended intervals</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">User Competency Impact:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Trained staff:</strong> Better care, can perform user checks</li>
                <li><strong>Varied users:</strong> Less predictable treatment of equipment</li>
                <li><strong>Public access:</strong> No control over handling</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Additional Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Is equipment regularly moved?</li>
                <li>Are cables subjected to repeated flexing?</li>
                <li>Is equipment used as intended?</li>
                <li>Are storage conditions appropriate?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: Developing and Reviewing Test Schedules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Developing and Reviewing Test Schedules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Creating an effective testing schedule requires initial assessment followed by ongoing review.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step 1 - Initial Assessment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Categorise equipment by type and class</li>
                <li>Assess each area for environmental risks</li>
                <li>Use IET suggested intervals as a starting point</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step 2 - Document Your Reasoning:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record risk factors considered</li>
                <li>Explain how they influenced interval decisions</li>
                <li>This demonstrates due diligence</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step 3 - Implement User Checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Train users to perform visual checks before use</li>
                <li>Provide simple checklists</li>
                <li>Establish reporting procedures</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step 4 - Review and Adjust:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Analyse test results periodically</li>
                <li>High failure rates indicate intervals are too long</li>
                <li>Consistent passes may justify extension</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Documentation Requirements:</strong> Risk assessment methodology, interval decisions with justification, test results and pass/fail rates, incidents or near-misses, review dates and changes.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with IET suggested intervals, then adjust based on experience</li>
                <li>Group similar equipment for efficient scheduling</li>
                <li>Implement user check programmes to extend formal test intervals</li>
                <li>Review intervals annually using test data and incident reports</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Applying same interval to all equipment</strong> - regardless of risk</li>
                <li><strong>Extending intervals without documentation</strong> - no risk assessment</li>
                <li><strong>Ignoring environmental changes</strong> - that affect equipment</li>
                <li><strong>Failing to review intervals</strong> - when failure rates change</li>
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: IET Suggested Intervals</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">HIGH RISK / INDUSTRIAL</p>
                <ul className="space-y-0.5">
                  <li>User checks: Daily/Weekly</li>
                  <li>Formal visual: Weekly/Monthly</li>
                  <li>Combined test: 3-6 months</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">MEDIUM RISK / COMMERCIAL</p>
                <ul className="space-y-0.5">
                  <li>User checks: Weekly/Monthly</li>
                  <li>Formal visual: Monthly/Quarterly</li>
                  <li>Combined test: 6-12 months</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">LOW RISK / OFFICE IT</p>
                <ul className="space-y-0.5">
                  <li>User checks: Not required</li>
                  <li>Formal visual: 24-48 months</li>
                  <li>Combined test: 48 months</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-4">
              Next: Module 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule3Section5;
