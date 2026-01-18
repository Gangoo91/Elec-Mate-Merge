import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "operator-training-importance",
    question: "Why is it important to train building operators during handover?",
    options: [
      "To reduce the contractor's liability",
      "To ensure operators can use the system safely and effectively",
      "To satisfy insurance requirements",
      "To demonstrate technical expertise"
    ],
    correctIndex: 1,
    explanation: "Proper training ensures operators can use the system safely and effectively, preventing misuse that could damage equipment, waste energy, or create uncomfortable conditions. It also reduces call-backs and builds client confidence."
  },
  {
    id: "io-lists-update",
    question: "Why must IO lists and addressing registers be updated before handover?",
    options: [
      "To satisfy warranty requirements",
      "To increase the project value",
      "To enable future troubleshooting and safe modifications",
      "To demonstrate project completion"
    ],
    correctIndex: 2,
    explanation: "Accurate IO lists and addressing registers are essential for future troubleshooting, modifications, and maintenance. Without them, technicians cannot identify which physical device corresponds to a system alarm or modify the system safely."
  },
  {
    id: "as-built-drawings-consequences",
    question: "What happens if as-built drawings are not updated before handover?",
    options: [
      "The warranty becomes void immediately",
      "Future maintenance becomes dangerous and expensive",
      "The system stops working after a few months",
      "Insurance coverage is invalidated"
    ],
    correctIndex: 1,
    explanation: "Without accurate as-built drawings, future maintenance becomes dangerous and expensive. Technicians cannot safely modify the system, troubleshooting takes much longer, and there's increased risk of electrical accidents."
  }
];

const faqs = [
  {
    question: "How long should I allow for client handover and training?",
    answer: "Allow minimum 2-4 hours for basic operator training, plus additional time for documentation review. Complex systems may require full-day training sessions. Don't rush this critical phase - inadequate training leads to expensive call-backs."
  },
  {
    question: "What's the best format for providing documentation to clients?",
    answer: "Provide both digital and physical copies. Digital formats (PDF) are easily searchable and shareable, while physical copies serve as emergency backup. Use clear folder structures and consistent naming conventions."
  },
  {
    question: "Should I provide ongoing support after handover?",
    answer: "Yes, offer structured aftercare - perhaps 30-day phone support and a follow-up visit. This builds client confidence, identifies any issues early, and often leads to additional business opportunities."
  },
  {
    question: "What if the client seems overwhelmed during training?",
    answer: "Simplify the training focus to absolutely essential daily tasks only. Provide written quick-reference guides and offer follow-up training sessions. Don't try to cover everything in one session."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "In the real-world example, why couldn't the school diagnose a fault after installation?",
  options: [
    "The BMS system was programmed incorrectly",
    "The facilities staff were not qualified electricians",
    "No updated IO list or software backups were provided",
    "The sensors were installed in the wrong locations"
  ],
  correctAnswer: 2,
  explanation: "The school couldn't diagnose the fault because they had no documentation (IO lists, software backups, or as-built drawings) to identify which sensor was malfunctioning or how to access system parameters."
  }
];

const BMSModule7Section6 = () => {
  useSEO({
    title: "Client Handover and Documentation | BMS Module 7.6",
    description: "Learn professional client handover processes, documentation requirements, and training best practices for BMS installations."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Client Handover and Documentation
          </h1>
          <p className="text-white">
            Professional project completion and handover requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Handover:</strong> Structured training and documentation for clients</li>
              <li><strong>Documentation:</strong> As-built drawings, IO lists, software backups</li>
              <li><strong>Training:</strong> Daily operations, alarms, reports, emergency procedures</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Project completion phase, client meetings</li>
              <li><strong>Use:</strong> Document everything, train operators thoroughly, build relationships</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of a structured client handover",
              "Identify the documentation required at handover",
              "Recognise the electrician's responsibilities in preparing as-built records",
              "Apply best practices for client training and support",
              "Understand warranty obligations and aftercare procedures",
              "Create comprehensive handover documentation packages"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Handover Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Building Management System installation is not complete until the client understands
              how to operate it and has all the documentation required for safe and efficient use. A rushed
              or incomplete handover often leads to confusion, system misuse, and expensive call-backs.
            </p>
            <p>
              This phase is crucial for the electrician's reputation and project success. Poor handover practices
              lead to call-backs, disputes, and dissatisfied clients, while thorough handover builds trust and
              leads to future business opportunities.
            </p>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm text-white">
                <strong className="text-elec-yellow">Professional Success:</strong> A thorough handover is the difference between a one-time job and a long-term client relationship. Professional documentation and training demonstrate quality workmanship and build trust.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Client Handover Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Client Handover Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The handover ensures the client can safely and effectively operate the BMS. This structured
              process prevents misunderstandings and reduces the likelihood of system misuse.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Demonstration</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Navigate dashboards and graphics</li>
                  <li>Acknowledge and clear alarms</li>
                  <li>Adjust setpoints safely</li>
                  <li>Access historical trends and reports</li>
                  <li>Override controls when necessary</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operator Training</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Daily operational procedures</li>
                  <li>Logging in and system navigation</li>
                  <li>Checking and responding to alarms</li>
                  <li>Generating and exporting reports</li>
                  <li>Basic troubleshooting techniques</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Overview</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Escalation procedures for faults</li>
                  <li>Remote monitoring and alerts</li>
                  <li>Preventive maintenance schedules</li>
                  <li>Emergency procedures and contacts</li>
                  <li>Manual override procedures</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Warranty Briefing</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Coverage periods and limitations</li>
                  <li>Service response times</li>
                  <li>Warranty claim procedures</li>
                  <li>Maintenance requirements</li>
                  <li>Support contact information</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Documentation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Documentation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The following documents must be provided to the client to ensure proper operation,
              maintenance, and future modifications of the BMS:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">As-Built Schematics</p>
                <p className="text-sm text-white/80 mb-2">Accurate wiring diagrams reflecting the final installation</p>
                <ul className="text-xs text-white/70 space-y-1 ml-3">
                  <li>Updated cable routes and terminations</li>
                  <li>Corrected device locations</li>
                  <li>Final power supply arrangements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">IO Lists</p>
                <p className="text-sm text-white/80 mb-2">Final verified point list with device addresses</p>
                <ul className="text-xs text-white/70 space-y-1 ml-3">
                  <li>Complete input/output inventory</li>
                  <li>Device descriptions and locations</li>
                  <li>Scaling and engineering units</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Addressing Registers</p>
                <p className="text-sm text-white/80 mb-2">BACnet IDs, Modbus addresses, KNX addresses</p>
                <ul className="text-xs text-white/70 space-y-1 ml-3">
                  <li>Network topology diagrams</li>
                  <li>Device addressing schemes</li>
                  <li>Communication protocol settings</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Software Backups</p>
                <p className="text-sm text-white/80 mb-2">Copies of controller programs and server databases</p>
                <ul className="text-xs text-white/70 space-y-1 ml-3">
                  <li>Controller application software</li>
                  <li>Database configurations</li>
                  <li>Graphics and user interfaces</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Commissioning Records</p>
                <p className="text-sm text-white/80 mb-2">Test sheets showing all I/O and sequences were verified</p>
                <ul className="text-xs text-white/70 space-y-1 ml-3">
                  <li>Pre-functional test results</li>
                  <li>Functional commissioning reports</li>
                  <li>Calibration certificates</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">O&M Manuals</p>
                <p className="text-sm text-white/80 mb-2">Instructions for equipment, controls, and BMS user guides</p>
                <ul className="text-xs text-white/70 space-y-1 ml-3">
                  <li>Equipment operation procedures</li>
                  <li>Maintenance schedules</li>
                  <li>Troubleshooting guides</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Electrician's Role */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrician's Role in Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricians play a crucial supporting role in ensuring successful handover by providing
              accurate documentation and technical assistance during client training.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Field Device Labelling</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Ensure all devices have clear, durable labels</li>
                  <li>Match label references to IO lists exactly</li>
                  <li>Include device addresses where applicable</li>
                  <li>Use consistent labelling conventions</li>
                  <li>Label all junction boxes and cable routes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accurate Redline Drawings</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Mark all changes from original design</li>
                  <li>Include cable route modifications</li>
                  <li>Note any additional junction boxes</li>
                  <li>Document emergency circuit additions</li>
                  <li>Provide clear, legible annotations</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Records</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Insulation resistance test results</li>
                  <li>Continuity verification reports</li>
                  <li>I/O verification test sheets</li>
                  <li>Earth fault loop impedance readings</li>
                  <li>RCD test results where applicable</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demonstration Support</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Assist during operator demonstrations</li>
                  <li>Explain physical override functions</li>
                  <li>Show local control access points</li>
                  <li>Demonstrate emergency procedures</li>
                  <li>Answer technical wiring questions</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Consequences of Missing Documentation</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Future modifications become dangerous and time-consuming</li>
                <li>Troubleshooting becomes nearly impossible</li>
                <li>Warranty claims may be rejected</li>
                <li>Client loses confidence in the installation</li>
                <li>Legal liability increases significantly</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Practical Guidance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Start documentation early</strong> - don't leave IO list updates until the last day</li>
                <li><strong>Interactive demonstrations</strong> - walk through the system with the client, trigger alarms, change setpoints</li>
                <li><strong>Dual format documentation</strong> - provide both digital and hard copies</li>
                <li><strong>Keep training simple</strong> - focus on daily tasks like checking alarms and generating reports</li>
                <li><strong>Hands-on practice</strong> - let operators practice common tasks during training</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <h3 className="text-sm font-medium text-white mb-4">Handover Checklist</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <ul className="space-y-1">
                    <li>All field devices correctly labelled</li>
                    <li>As-built drawings completed and accurate</li>
                    <li>IO lists updated with final addressing</li>
                    <li>Software backups created and tested</li>
                    <li>Commissioning records organised</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1">
                    <li>O&M manuals collated and indexed</li>
                    <li>Operator training completed</li>
                    <li>Warranty terms explained</li>
                    <li>Support contacts provided</li>
                    <li>Client sign-off obtained</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Example: School Project
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-3">Incomplete Handover Consequences</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">The Situation</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>BMS installed and tested successfully</li>
                    <li>System was functioning correctly</li>
                    <li>Client was eager to take control</li>
                    <li>Pressure to complete project quickly</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Missing Documentation</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>No updated IO list provided</li>
                    <li>Software backups not created</li>
                    <li>As-built drawings incomplete</li>
                    <li>Minimal operator training given</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded bg-red-500/10 mb-4">
                <p className="text-sm text-white">
                  <strong>One month later:</strong> A fault occurred in the ventilation system. The facilities team couldn't diagnose
                  the problem because they had no documentation to identify which sensor was
                  malfunctioning or how to access the relevant control parameters.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Immediate Consequences</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>System remained faulty for days</li>
                    <li>Poor indoor air quality in classrooms</li>
                    <li>Client lost confidence in the installation</li>
                    <li>Emergency contractor call-out required</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Financial Impact</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Costly emergency site visit</li>
                    <li>Time spent recreating documentation</li>
                    <li>Damaged professional reputation</li>
                    <li>Potential warranty claim issues</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-400 mb-2">Lessons Learned: New Company Policy</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Mandatory Requirements</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Complete as-built documentation before handover</li>
                    <li>Tested software backups on separate media</li>
                    <li>Verified IO lists with physical device checks</li>
                    <li>Minimum 2-hour operator training session</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Quality Assurance</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Project manager sign-off on all documentation</li>
                    <li>Client acknowledgment of training received</li>
                    <li>30-day follow-up support included</li>
                    <li>No final payment until handover complete</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm text-white">
                <strong className="text-elec-yellow">Key Takeaway:</strong> The short-term pressure to complete quickly cost far more than the time needed for proper handover. Professional standards protect both the contractor's reputation and the client's interests.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Essential Documentation</p>
              <ul className="space-y-0.5 text-white/80">
                <li>As-built schematics</li>
                <li>IO lists with addresses</li>
                <li>Addressing registers</li>
                <li>Software backups</li>
                <li>Commissioning records</li>
                <li>O&M manuals</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Training Focus Areas</p>
              <ul className="space-y-0.5 text-white/80">
                <li>Dashboard navigation</li>
                <li>Alarm acknowledgment</li>
                <li>Setpoint adjustment</li>
                <li>Report generation</li>
                <li>Emergency procedures</li>
                <li>Support escalation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-7-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-course">
              Complete Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule7Section6;