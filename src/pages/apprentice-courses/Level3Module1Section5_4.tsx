import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the main difference between a safety inspection and a safety audit?",
    options: [
      "Inspections are more thorough than audits",
      "Audits only check paperwork",
      "Inspections check conditions; audits examine the whole safety management system",
      "There is no difference"
    ],
    correctIndex: 2,
    explanation: "Safety inspections focus on physical workplace conditions and immediate hazards. Safety audits are more comprehensive, examining the entire safety management system including policies, procedures, training, and culture - not just current conditions."
  },
  {
    id: "check-2",
    question: "How often should general workplace safety inspections typically be conducted on a construction site?",
    options: [
      "Once a year",
      "Daily or weekly, depending on risk level",
      "Only after accidents",
      "Every six months"
    ],
    correctIndex: 1,
    explanation: "Construction sites are dynamic environments with changing hazards. General inspections should be conducted daily or weekly. Higher-risk areas or activities may need more frequent inspection. The frequency should match the risk level."
  },
  {
    id: "check-3",
    question: "What should happen when a hazard is identified during an inspection?",
    options: [
      "Record it and review at the next meeting",
      "Immediately address serious hazards; record all findings with actions and deadlines",
      "Only report it if someone could be injured immediately",
      "Leave it for management to decide"
    ],
    correctIndex: 1,
    explanation: "Serious hazards must be addressed immediately - this may mean stopping work. All findings should be recorded with assigned actions, responsible persons, and deadlines. The purpose of inspection is to drive action, not just documentation."
  },
  {
    id: "check-4",
    question: "Who should be involved in workplace safety inspections?",
    options: [
      "Only qualified health and safety professionals",
      "Only senior management",
      "Workers, supervisors, safety representatives, and management",
      "Only the person appointed by the HSE"
    ],
    correctIndex: 2,
    explanation: "Effective inspections involve multiple perspectives: workers understand day-to-day hazards, supervisors know operations, safety representatives provide worker input, and management ensure resources. Collaborative inspection produces better results."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a safety audit?",
    options: [
      "A quick walk around the site",
      "A systematic examination of a safety management system against defined criteria",
      "A list of safety equipment",
      "An insurance requirement only"
    ],
    correctAnswer: 1,
    explanation: "A safety audit is a systematic, independent examination of a safety management system against defined criteria (such as legal requirements, company standards, or standards like ISO 45001). It assesses whether what is supposed to happen actually happens."
  },
  {
    id: 2,
    question: "Which of the following would typically be checked during a workplace safety inspection?",
    options: [
      "Employee birthdays",
      "PPE condition, housekeeping, guarding, access/egress, and emergency equipment",
      "Project profit margins",
      "Staff holiday requests"
    ],
    correctAnswer: 1,
    explanation: "Safety inspections check physical conditions: PPE availability and condition, housekeeping and tidiness, machinery guarding, clear access and egress routes, fire extinguisher checks, first aid provisions, and general hazard identification."
  },
  {
    id: 3,
    question: "What is the purpose of using a checklist during safety inspections?",
    options: [
      "To make the inspection take longer",
      "To ensure consistency and that nothing important is missed",
      "Only for legal compliance",
      "To blame workers for non-compliance"
    ],
    correctAnswer: 1,
    explanation: "Checklists ensure consistency across inspections, help inspectors cover all relevant areas, provide documentation of what was checked, and ensure nothing important is overlooked. They also make it easier to track trends over time."
  },
  {
    id: 4,
    question: "Under the Management of Health and Safety at Work Regulations 1999, employers must:",
    options: [
      "Only conduct inspections when the HSE visits",
      "Monitor and review their preventive and protective measures",
      "Leave safety monitoring to insurance companies",
      "Only inspect after accidents"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5 requires employers to have arrangements for effective planning, organisation, control, monitoring, and review of preventive and protective measures. This includes regular inspections to check that controls remain effective."
  },
  {
    id: 5,
    question: "What is a 'formal' safety inspection?",
    options: [
      "One done while wearing formal clothes",
      "A scheduled, documented inspection following a systematic approach",
      "An inspection by police",
      "An inspection without a checklist"
    ],
    correctAnswer: 1,
    explanation: "A formal safety inspection is pre-planned, follows a systematic methodology, uses checklists or protocols, is documented with findings and actions, and is typically scheduled at regular intervals. This contrasts with informal 'walk-around' observations."
  },
  {
    id: 6,
    question: "What should be the outcome of a safety audit?",
    options: [
      "A certificate of compliance",
      "A report with findings, recommendations, and improvement opportunities",
      "Prosecution of non-compliant workers",
      "An automatic pass/fail result"
    ],
    correctAnswer: 1,
    explanation: "Safety audit outcomes include a formal report detailing findings (both positive and negative), recommendations for improvement, identified non-conformances, and opportunities for enhancement. The report drives improvement actions."
  },
  {
    id: 7,
    question: "Who has the right to conduct inspections in the workplace under SRSC Regulations 1977?",
    options: [
      "Only HSE inspectors",
      "Only managers",
      "Appointed safety representatives",
      "Only external consultants"
    ],
    correctIndex: 2,
    explanation: "Under the Safety Representatives and Safety Committees Regulations 1977, trade union appointed safety representatives have the legal right to inspect the workplace at least once every three months, or more frequently if circumstances warrant."
  },
  {
    id: 8,
    question: "An electrician notices damaged insulation on cables during routine work. What type of safety activity is this?",
    options: [
      "A formal audit",
      "An informal observation / continuous monitoring",
      "A scheduled inspection",
      "An accident investigation"
    ],
    correctAnswer: 1,
    explanation: "This is informal observation or continuous monitoring - workers noticing hazards as part of their normal work. This is valuable safety activity and such findings should be reported even though it's not a formal inspection."
  },
  {
    id: 9,
    question: "What does 'close-out' mean in relation to safety audit findings?",
    options: [
      "Ending the audit early",
      "Closing the workplace",
      "Verifying that corrective actions have been implemented effectively",
      "Keeping findings confidential"
    ],
    correctAnswer: 2,
    explanation: "Close-out is the process of verifying that recommended corrective actions have been properly implemented and are effective. This ensures the audit leads to actual improvement, not just paperwork."
  },
  {
    id: 10,
    question: "What should happen if an inspection reveals a serious and imminent danger?",
    options: [
      "Record it and discuss at the next safety meeting",
      "Stop the activity immediately and make the area safe",
      "Continue work while reporting to management",
      "Wait for HSE guidance"
    ],
    correctAnswer: 1,
    explanation: "Serious and imminent dangers require immediate action - stop the dangerous activity, evacuate workers from the hazard, and make the area safe. Documentation is important but secondary to preventing harm."
  },
  {
    id: 11,
    question: "What is 'reactive' safety monitoring?",
    options: [
      "Monitoring before accidents happen",
      "Monitoring that responds to failures, accidents, or ill health",
      "Real-time monitoring with sensors",
      "Monthly scheduled inspections"
    ],
    correctAnswer: 1,
    explanation: "Reactive monitoring measures failures - accidents, incidents, near misses, ill health. It's important for learning but should be balanced with proactive monitoring (inspections, audits, observations) that identifies hazards before harm occurs."
  },
  {
    id: 12,
    question: "Which of the following is a benefit of worker involvement in safety inspections?",
    options: [
      "Reduces management workload only",
      "Workers can identify hazards that others might miss",
      "Allows blame to be shifted to workers",
      "Makes inspections faster"
    ],
    correctAnswer: 1,
    explanation: "Workers have direct experience of workplace hazards and may identify issues that managers or external auditors miss. Their involvement also increases buy-in to safety improvements and demonstrates that their safety concerns are valued."
  }
];

const faqs = [
  {
    question: "What's the difference between an internal and external audit?",
    answer: "Internal audits are conducted by your own organisation's staff (though ideally someone independent of the area being audited). External audits are conducted by outside parties - this could be a client, certification body, regulatory body (HSE), or independent consultant. External audits provide greater independence but internal audits are valuable for ongoing self-assessment."
  },
  {
    question: "Do I need to be trained to conduct safety inspections?",
    answer: "Basic workplace inspections can be conducted by anyone with appropriate knowledge of the work area and hazards. More formal inspections and audits benefit from training in inspection techniques, use of checklists, and reporting. Some specialist inspections (e.g., scaffolding, lifting equipment) require specific competencies."
  },
  {
    question: "How do I know what to look for during an inspection?",
    answer: "Use a checklist specific to your work area. Common areas include: PPE (available, suitable, worn, maintained), housekeeping (clean, tidy, clear walkways), fire safety (extinguishers, exits, storage), electrical safety (leads, connections, isolations), work at height (scaffolds, ladders, edge protection), and welfare (facilities, drinking water)."
  },
  {
    question: "What happens if I find a problem but can't fix it myself?",
    answer: "Record the finding, make the area safe if there's immediate danger (barriers, signs, stop work if necessary), and report to someone who can authorise the fix. Don't ignore problems because you can't personally resolve them - your role is to identify and report, ensuring action is taken."
  },
  {
    question: "Can workers refuse to work in an area that fails inspection?",
    answer: "Workers have a legal right to refuse work they reasonably believe poses serious and imminent danger to themselves or others. If an inspection reveals serious hazards, work should not proceed until controls are in place. The Employment Rights Act 1996 protects workers who raise legitimate safety concerns."
  },
  {
    question: "How should inspection records be stored?",
    answer: "Inspection records should be kept in a systematic way that allows retrieval for reference, trend analysis, and legal purposes. Electronic systems allow easier analysis but paper records are acceptable. Records should typically be kept for at least 3 years, longer if they relate to health surveillance or specific regulatory requirements."
  }
];

const Level3Module1Section5_4 = () => {
  useSEO(
    "5.4 Safety Audits and Inspections - Level 3 Health & Safety",
    "Conducting systematic safety audits and inspections, monitoring safety performance, and driving continual improvement in UK workplaces"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Section Header */}
      <div className="sticky top-0 z-30 w-full bg-elec-yellow shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3 px-4 sm:px-6 py-3">
          <Link
            to="/apprentice-courses/level-3-health-safety/module-1/section-5"
            className="text-black hover:underline font-semibold text-sm flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </Link>
          <span className="text-black/50">/</span>
          <span className="font-bold text-black text-lg">5.4 Safety Audits & Inspections</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-gray-200">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Safety Audits and Inspections
          </h1>
          <p className="text-lg text-gray-300">
            Systematic methods for checking that safety controls are in place and working effectively.
          </p>
        </header>

        {/* Quick Summary Box */}
        <div className="bg-[#222] border-l-4 border-elec-yellow rounded p-5 mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2 text-elec-yellow mb-2">
            <Zap className="h-5 w-5" /> Quick Summary
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Inspections check physical conditions; audits examine the whole management system</li>
            <li>Regular monitoring is required under MHSWR 1999</li>
            <li>Inspections should be scheduled, documented, and lead to action</li>
            <li>Workers and safety representatives have important roles in inspection</li>
            <li>Findings must be acted upon - documentation without action is pointless</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-[#282828] rounded-lg p-5 mb-8">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" /> Learning Outcomes
          </h2>
          <p className="text-gray-300 mb-3">By the end of this section, you will be able to:</p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">1.</span>
              <span>Distinguish between safety inspections and safety audits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">2.</span>
              <span>Explain the legal requirements for safety monitoring</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">3.</span>
              <span>Describe how to conduct effective workplace inspections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">4.</span>
              <span>Understand how audit and inspection findings drive improvement</span>
            </li>
          </ul>
        </div>

        {/* Section 01: Understanding Audits and Inspections */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">1</span>
            Understanding Audits and Inspections
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Safety audits and inspections are both monitoring tools, but they serve different purposes and operate at different levels. Understanding the difference helps you use each effectively.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="bg-[#282828] border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Safety Inspection</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Examines physical conditions</li>
                  <li>Identifies immediate hazards</li>
                  <li>Checks specific areas or equipment</li>
                  <li>Usually frequent (daily/weekly)</li>
                  <li>Often conducted by supervisors/workers</li>
                  <li>Quick, focused activity</li>
                  <li>Example: Checking scaffold condition</li>
                </ul>
              </div>
              <div className="bg-[#282828] border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Safety Audit</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Examines management system</li>
                  <li>Assesses policies, procedures, culture</li>
                  <li>Reviews the whole organisation</li>
                  <li>Less frequent (annually/quarterly)</li>
                  <li>Often by auditors or specialists</li>
                  <li>Comprehensive, in-depth review</li>
                  <li>Example: ISO 45001 certification audit</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Types of Monitoring:</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-elec-yellow">Proactive (Active) Monitoring</p>
                  <p className="text-sm">Checking before things go wrong - inspections, audits, observations, safety tours, compliance checks. Measures what IS happening.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Reactive Monitoring</p>
                  <p className="text-sm">Learning from failures - accident investigations, near-miss analysis, ill-health reports, complaints. Measures what HAS gone wrong.</p>
                </div>
              </div>
              <p className="text-sm mt-3 italic">Both types are needed - proactive monitoring prevents harm; reactive monitoring ensures we learn from failures.</p>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Legal Requirement</p>
              <p className="text-sm">The Management of Health and Safety at Work Regulations 1999 (Regulation 5) requires employers to make and give effect to arrangements for effective monitoring and review of preventive and protective measures. This isn't optional - it's law.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 02: Conducting Safety Inspections */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">2</span>
            Conducting Safety Inspections
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Effective safety inspections follow a systematic approach. Whether formal or informal, the process should identify hazards, check controls, and lead to action where needed.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Types of Inspection:</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-elec-yellow">General Workplace Inspection</p>
                  <p className="text-sm">Broad review of the whole work area - housekeeping, PPE, emergency equipment, welfare facilities, general conditions.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Statutory Inspection</p>
                  <p className="text-sm">Legally required inspections by competent persons - lifting equipment (LOLER), pressure systems (PSSR), electrical installations (EICR).</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Pre-Use Checks</p>
                  <p className="text-sm">Daily/pre-use inspection of equipment - scaffolds, MEWPs, vehicles, power tools, PPE.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Task-Specific Inspection</p>
                  <p className="text-sm">Focused on a particular activity or hazard - permit-to-work checks, hot work areas, confined space entry.</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Inspection Process:</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Prepare:</strong> Review checklist, previous findings, risk assessments, recent incidents</li>
              <li><strong>Inform:</strong> Let people know you're inspecting (unless unannounced for good reason)</li>
              <li><strong>Observe:</strong> Walk through systematically, looking for hazards and checking controls</li>
              <li><strong>Record:</strong> Document findings - both positive and negative</li>
              <li><strong>Act:</strong> Address immediate hazards; assign actions for other findings</li>
              <li><strong>Report:</strong> Communicate findings to relevant parties</li>
              <li><strong>Follow up:</strong> Check that actions have been completed</li>
            </ol>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">What to Inspect - Electrical Work Areas:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Distribution boards - covers in place, labelling</li>
                  <li>Extension leads - condition, routing, joints</li>
                  <li>Portable equipment - PAT test in date</li>
                  <li>Test equipment - leads, condition, calibration</li>
                  <li>Isolation arrangements - lock-off in use</li>
                  <li>Warning signs - appropriate, visible</li>
                </ul>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access equipment - ladders, platforms</li>
                  <li>PPE - available, suitable, worn</li>
                  <li>Fire extinguishers - in date, accessible</li>
                  <li>Housekeeping - clear work areas</li>
                  <li>Lighting - adequate for work</li>
                  <li>Welfare - facilities accessible</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 03: Safety Auditing */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">3</span>
            Safety Auditing
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Safety audits take a wider view, examining whether the organisation's safety management system is fit for purpose and being implemented effectively. They answer the question: "Is what should be happening actually happening?"
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">What Audits Examine:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-elec-yellow">Documentation</p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Health and safety policy</li>
                    <li>Risk assessments</li>
                    <li>Method statements</li>
                    <li>Training records</li>
                    <li>Inspection records</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Implementation</p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Are procedures followed?</li>
                    <li>Is training being delivered?</li>
                    <li>Are controls in place?</li>
                    <li>Do workers know procedures?</li>
                    <li>Is there management commitment?</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">The Audit Process:</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Planning:</strong> Define scope, criteria, team, schedule</li>
              <li><strong>Preparation:</strong> Review documents, prepare checklists, notify auditees</li>
              <li><strong>Opening meeting:</strong> Explain purpose, process, and expectations</li>
              <li><strong>Audit execution:</strong> Document review, interviews, observations</li>
              <li><strong>Analysis:</strong> Evaluate findings against criteria</li>
              <li><strong>Closing meeting:</strong> Present preliminary findings</li>
              <li><strong>Reporting:</strong> Formal report with findings and recommendations</li>
              <li><strong>Follow-up:</strong> Verify corrective actions (close-out)</li>
            </ol>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Audit Findings Categories:</h4>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium text-red-400">Major Non-Conformance</p>
                  <p className="text-sm">Total absence of or significant failure to implement a required element. Presents serious risk. Requires immediate action.</p>
                </div>
                <div className="border-l-4 border-elec-yellow pl-4">
                  <p className="font-medium text-elec-yellow">Minor Non-Conformance</p>
                  <p className="text-sm">Partial implementation or isolated failure. Does not affect overall system effectiveness but needs correction.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium text-blue-400">Observation / Opportunity for Improvement</p>
                  <p className="text-sm">Not a failure but an area where improvement could be made. Recommendation for enhancement.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-green-400">Good Practice</p>
                  <p className="text-sm">Noteworthy positive finding that could be shared or replicated elsewhere.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-blue-400 mb-2">ISO 45001:2018</p>
              <p className="text-sm">ISO 45001 is the international standard for occupational health and safety management systems. Many organisations are certified to this standard, which requires regular internal and external auditing. Understanding audit principles helps you participate effectively in such audits.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 04: Acting on Findings */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">4</span>
            Acting on Findings
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              The value of inspections and audits lies entirely in what happens afterward. Documentation without action is wasted effort. Findings must drive improvement.
            </p>

            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-red-400 mb-2">Critical Point</p>
              <p className="text-sm">An inspection that identifies hazards but leads to no action may be worse than no inspection at all. Once you know about a hazard and don't act, you have demonstrated knowledge of the risk - this has serious legal implications if someone is then injured.</p>
            </div>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Effective Action Management:</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-elec-yellow">Prioritisation</p>
                  <p className="text-sm">Address high-risk findings first. Immediate action for serious hazards. Use risk-based approach for others.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Assignment</p>
                  <p className="text-sm">Every action needs an owner - someone responsible for completion. Be specific: "Fix" is not an action; "Replace damaged cable in Panel 3 - J Smith" is.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Deadlines</p>
                  <p className="text-sm">Set realistic but firm deadlines. Immediate hazards need immediate action. Others need dates, not "as soon as possible."</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Tracking</p>
                  <p className="text-sm">Maintain a log of all actions. Review regularly. Chase overdue actions. Report on completion rates.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Verification</p>
                  <p className="text-sm">Check that actions have actually been completed and are effective. Don't just accept "done" - verify it.</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Using Findings for Improvement:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Trend analysis:</strong> Look for patterns - recurring issues indicate systemic problems</li>
              <li><strong>Root cause:</strong> Why did this happen? Address underlying causes, not just symptoms</li>
              <li><strong>Sharing learning:</strong> If one area has issues, others might too - share findings</li>
              <li><strong>Policy review:</strong> Do findings indicate policies need updating?</li>
              <li><strong>Training needs:</strong> Do findings reveal knowledge gaps requiring training?</li>
            </ul>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Your Role</p>
              <p className="text-sm">Even as an apprentice, you can contribute significantly to safety monitoring. Report hazards you observe, participate actively in inspections, suggest improvements based on your direct experience, and help ensure actions are completed. Safety monitoring is everyone's responsibility.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 4 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[3].id}
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Practical Guidance for Electricians</h2>
          <div className="bg-[#282828] border border-gray-700 rounded-lg p-5">
            <h4 className="font-semibold text-white mb-3">Simple Pre-Work Inspection Checklist:</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                <span><strong>Work area:</strong> Clear access, adequate lighting, housekeeping acceptable?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                <span><strong>Tools and equipment:</strong> In good condition, tested, suitable for task?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                <span><strong>PPE:</strong> Available, correct type, in good condition?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">4.</span>
                <span><strong>Isolation:</strong> Correct isolation in place, lock-off applied, tested dead?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">5.</span>
                <span><strong>Emergency:</strong> Know location of extinguisher, first aid, assembly point?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">6.</span>
                <span><strong>Others:</strong> Are other workers/trades creating hazards affecting you?</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#282828] border border-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-white mb-2">Q: {faq.question}</h4>
                <p className="text-gray-300 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Quick Reference</h2>
          <div className="bg-[#282828] border border-gray-700 rounded-lg p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-2">Inspection Frequency Guide:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Pre-use checks: Before each use</li>
                  <li>Construction site: Daily/weekly</li>
                  <li>Lower-risk workplace: Monthly</li>
                  <li>Scaffolds: Every 7 days min.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Key Legal Requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>MHSWR 1999 Reg 5: Monitoring</li>
                  <li>SRSC Regs 1977: Safety rep inspections</li>
                  <li>CDM 2015: Construction inspections</li>
                  <li>PUWER 1998: Equipment inspection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Section 5.4 Knowledge Check"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-3">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 bg-[#333] border-gray-700 hover:bg-gray-700 text-white">
              <ArrowLeft className="h-4 w-4" /> Previous: 5.3 Toolbox Talks
            </Button>
          </Link>
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-5">
            <Button className="w-full sm:w-auto flex items-center gap-2 bg-elec-yellow hover:bg-elec-yellow text-black font-semibold">
              Next: 5.5 Monitoring & Improvement <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Level3Module1Section5_4;
