import { ArrowLeft, ClipboardList, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Recording and Reporting RCA Outcomes - MOET Module 4 Section 6.5";
const DESCRIPTION = "Documenting root cause analysis outcomes, writing effective RCA reports, communicating findings to stakeholders, tracking corrective actions and using RCA data for continuous improvement in electrical maintenance.";

const quickCheckQuestions = [
  {
    id: "rca-report-audience",
    question: "An RCA report should be written for:",
    options: [
      "Only the technician who carried out the investigation",
      "Multiple audiences — management (for decisions), technicians (for knowledge sharing), auditors (for compliance) and the CMMS (for data analysis)",
      "Only the equipment manufacturer",
      "Only the health and safety department"
    ],
    correctIndex: 1,
    explanation: "An effective RCA report serves multiple audiences simultaneously. Management needs the summary, cost impact and recommendations. Technicians need the technical details and diagnostic steps. Auditors need evidence of systematic investigation. The CMMS needs structured data for trend analysis. Writing with all these audiences in mind ensures the report delivers maximum value."
  },
  {
    id: "rca-report-structure",
    question: "The most important section of an RCA report for driving improvement is:",
    options: [
      "The header information",
      "The recommendations and corrective/preventive actions section — because this translates the investigation findings into specific actions that prevent recurrence",
      "The list of people involved",
      "The equipment serial number"
    ],
    correctIndex: 1,
    explanation: "While every section of the report is important, the recommendations and actions section is where the investigation's value is realised. This section translates the root cause findings into specific, actionable, measurable and time-bound corrective and preventive actions. Without clear recommendations, the investigation is an academic exercise that does not improve reliability."
  },
  {
    id: "rca-data-trends",
    question: "Analysing RCA data across multiple investigations can reveal:",
    options: [
      "Nothing useful — each fault is unique",
      "Common root cause patterns, systemic weaknesses in maintenance strategy, equipment design issues, and training gaps that would not be visible from individual investigations",
      "Only the total cost of maintenance",
      "Only which shift has the most breakdowns"
    ],
    correctIndex: 1,
    explanation: "Aggregate analysis of RCA data reveals patterns invisible in individual reports. If 40% of motor failures share the root cause of inadequate lubrication, this indicates a systemic PM strategy issue, not a series of individual failures. Identifying these patterns enables targeted, high-impact improvements that address the most significant causes of unreliability."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "An RCA report should be completed:",
    options: [
      "Only if the fault caused more than eight hours of downtime",
      "For every significant fault investigation, with the level of detail proportionate to the severity and complexity of the fault",
      "Only when requested by an auditor",
      "Only for new equipment under warranty"
    ],
    correctAnswer: 1,
    explanation: "RCA reports should be completed for all significant faults — those involving safety implications, significant downtime, high repair costs, or recurring patterns. The level of detail should be proportionate: a simple recurring fault may need a brief 5 Whys analysis, while a major failure may warrant a full fishbone investigation with detailed documentation. The threshold for formal RCA should be defined in the organisation's maintenance procedures."
  },
  {
    id: 2,
    question: "The executive summary of an RCA report should include:",
    options: [
      "Every technical measurement taken during the investigation",
      "A concise overview of the problem, root cause, key findings and recommended actions — typically no more than one page",
      "Only the cost of the repair",
      "Only the name of the equipment manufacturer"
    ],
    correctAnswer: 1,
    explanation: "The executive summary enables busy managers and decision-makers to quickly understand the key findings without reading the full report. It should state what happened, why it happened (root cause), what the impact was, and what actions are recommended. One page is typically sufficient. The detailed technical analysis follows in the body of the report for those who need it."
  },
  {
    id: 3,
    question: "When presenting RCA findings to management, you should focus on:",
    options: [
      "Technical jargon to demonstrate your expertise",
      "The business impact (safety risk, downtime cost, production loss), the root cause in clear language, and the recommended actions with their costs and benefits",
      "Blaming individuals for the failure",
      "Only the parts list for the repair"
    ],
    correctAnswer: 1,
    explanation: "Management decisions are driven by business impact. Present the findings in terms of safety risk, downtime hours, production loss and repair costs. Explain the root cause in clear, non-technical language where possible. Present recommendations with estimated costs and expected benefits (reduced failure rate, avoided downtime, risk reduction). This approach helps management understand the value of investing in preventive actions."
  },
  {
    id: 4,
    question: "RCA findings should be shared with the wider maintenance team because:",
    options: [
      "It creates more meetings",
      "It builds collective knowledge — other technicians can learn from the investigation, apply the findings to similar equipment, and diagnose similar faults more quickly in future",
      "It is only required by ISO standards",
      "It is only useful if the same technician will always work on the same equipment"
    ],
    correctAnswer: 1,
    explanation: "Knowledge sharing is one of the most valuable outcomes of RCA. When findings are shared — through team briefings, toolbox talks, CMMS notes or a lessons learned database — the entire team benefits. A technician who has read about a similar failure on another site can diagnose the same fault in minutes rather than hours. This collective knowledge is a competitive advantage for the maintenance organisation."
  },
  {
    id: 5,
    question: "A lessons learned database is valuable because it:",
    options: [
      "Replaces the need for individual fault reports",
      "Creates a searchable knowledge repository that enables technicians to find relevant diagnostic information, solutions and preventive measures from past investigations",
      "Is only useful for training purposes",
      "Only records positive outcomes"
    ],
    correctAnswer: 1,
    explanation: "A lessons learned database captures the practical knowledge from fault investigations in a searchable format. When a technician encounters a fault on a particular type of equipment, they can search the database for previous investigations on similar equipment. This dramatically reduces diagnostic time and ensures that proven solutions are applied consistently."
  },
  {
    id: 6,
    question: "Action tracking following an RCA should include:",
    options: [
      "Only the action description",
      "The action description, responsible person, deadline, current status, evidence of completion and verification of effectiveness",
      "Only whether the action has been started",
      "Only the cost of the action"
    ],
    correctAnswer: 1,
    explanation: "Effective action tracking requires full visibility of each action's lifecycle: what needs to be done, who is responsible, when it is due, what progress has been made, evidence that it was completed correctly, and verification that it achieved the intended result. Without this level of tracking, actions are easily forgotten, delayed or ineffectively implemented."
  },
  {
    id: 7,
    question: "When documenting an RCA that identifies human error as a contributing factor, you should:",
    options: [
      "Name the individual responsible in the report",
      "Focus on the systemic factors that allowed or contributed to the error — inadequate procedures, unclear instructions, insufficient training, poor ergonomics or time pressure — rather than individual blame",
      "Delete this section to avoid conflict",
      "Only mention it verbally and not in writing"
    ],
    correctAnswer: 1,
    explanation: "A blame-focused RCA culture discourages honest reporting and prevents learning. Effective RCA examines why the error was possible: Was the procedure clear? Was training adequate? Was the task designed to minimise error? Was there time pressure? Were there distractions? Addressing these systemic factors prevents the error from recurring, regardless of which individual performs the task."
  },
  {
    id: 8,
    question: "Key performance indicators (KPIs) derived from RCA data include:",
    options: [
      "Only the number of reports produced",
      "Number of RCAs completed, percentage of actions completed on time, repeat failure rate, MTBF improvement after corrective action, and cost of failure versus cost of prevention",
      "Only the total maintenance budget",
      "Only the number of technicians employed"
    ],
    correctAnswer: 1,
    explanation: "RCA KPIs measure both the process (are investigations being conducted and actions completed?) and the outcomes (are failures reducing, is MTBF improving, is the investment in prevention generating returns?). Tracking these KPIs demonstrates the value of the RCA programme and identifies areas where the process itself can be improved."
  },
  {
    id: 9,
    question: "Photographic evidence in an RCA report should:",
    options: [
      "Be used only if the report is being published externally",
      "Be labelled with captions explaining what the image shows, the date, location and asset reference, and placed in context within the report near the relevant text",
      "Be placed in a separate folder and not referenced in the report",
      "Only show the equipment after repair"
    ],
    correctAnswer: 1,
    explanation: "Photographs are valuable evidence but only if properly labelled and contextualised. Each image should have a caption explaining what it shows and why it is relevant to the investigation. Images should be placed near the related text in the report. Including 'before' and 'after' photographs demonstrates the condition found and the corrective action taken. Unlabelled photographs in a separate folder add little value."
  },
  {
    id: 10,
    question: "An RCA report should be reviewed and approved by:",
    options: [
      "Only the technician who wrote it",
      "A suitably qualified person who can verify the technical accuracy of the findings, the appropriateness of the recommendations, and that the report meets organisational standards",
      "Only an external auditor",
      "No one — the first draft is the final version"
    ],
    correctAnswer: 1,
    explanation: "Peer review or supervisory review improves report quality. A reviewer can identify gaps in the investigation, challenge assumptions, verify that recommendations are practical and proportionate, and ensure the report meets the organisation's documentation standards. This review process is particularly important for reports that will inform significant capital expenditure or procedure changes."
  },
  {
    id: 11,
    question: "The legal significance of RCA reports in the UK includes:",
    options: [
      "They have no legal significance",
      "They can be used as evidence of due diligence, demonstrate compliance with maintenance obligations, and may be disclosed in the event of regulatory investigation, legal proceedings or insurance claims",
      "They are only relevant to the employer's liability insurance",
      "They are protected by legal privilege and cannot be disclosed"
    ],
    correctAnswer: 1,
    explanation: "RCA reports are not privileged documents and may be disclosed in legal proceedings, HSE investigations or insurance claims. This means they must be factual, accurate and professional. They demonstrate that the organisation takes maintenance seriously and investigates failures systematically. Conversely, the absence of RCA records following a significant failure would be difficult to defend in any investigation."
  },
  {
    id: 12,
    question: "Continuous improvement through RCA requires:",
    options: [
      "Occasional investigations when convenient",
      "A systematic, ongoing commitment to investigating significant failures, implementing and verifying corrective actions, sharing lessons learned, and using aggregate data to improve maintenance strategy",
      "Only investigating faults that cause injury",
      "Producing the maximum number of reports regardless of quality"
    ],
    correctAnswer: 1,
    explanation: "Continuous improvement is not a one-off activity — it is an ongoing cycle of investigation, action, verification and learning. Each RCA contributes to a growing body of knowledge that progressively improves equipment reliability. The organisations that achieve the highest levels of reliability are those that maintain this discipline over years, using their accumulated RCA data to drive strategic maintenance decisions."
  }
];

const faqs = [
  {
    question: "How long should an RCA report be?",
    answer: "The length should be proportionate to the complexity of the investigation. A simple fault with a clear root cause may need only one or two pages. A complex investigation involving multiple contributing factors, extensive testing and significant recommendations may require 10-15 pages. The key is completeness and clarity, not length. Every page should add value. Use appendices for detailed test data, photographs and supporting documentation rather than putting everything in the main body."
  },
  {
    question: "What format should I use for an RCA report?",
    answer: "Follow your organisation's standard format if one exists. If not, a recommended structure is: executive summary (one page), problem description, investigation methodology, findings (test results, observations, evidence), root cause analysis (5 Whys, fishbone, or other technique), corrective and preventive actions, lessons learned, and appendices. Use clear headings, numbered sections and bullet points for readability. Include the fishbone diagram or 5 Whys chain as a visual summary."
  },
  {
    question: "Who should receive a copy of the RCA report?",
    answer: "Distribution depends on the significance of the findings and the actions required. At minimum: the maintenance manager (for action approval), the CMMS (as a permanent record), and the maintenance team (for knowledge sharing). For significant findings: the operations manager, the site safety adviser, the engineering department (if design changes are recommended), and the asset owner. The distribution list should be recorded in the report."
  },
  {
    question: "How do I present RCA findings if the root cause is an organisational or management issue?",
    answer: "Present the findings factually and constructively. Focus on the system, not individuals: 'The preventive maintenance schedule for this equipment class has not been reviewed since 2018 and does not reflect current operating conditions' is factual and actionable. Avoid emotive language or accusations. Frame recommendations as opportunities for improvement. If you are uncomfortable raising the finding directly, discuss it with your supervisor or mentor for guidance on how to escalate appropriately."
  },
  {
    question: "Should RCA reports be included in the CMMS?",
    answer: "Yes. The RCA report should be attached to or referenced from the relevant CMMS work order. This links the investigation to the specific asset and fault record, making it searchable and accessible to future technicians. Key findings, the root cause and the corrective actions should also be entered as structured data in the CMMS fault coding system to support aggregate analysis. The full report provides the detail; the CMMS codes provide the data."
  }
];

const MOETModule4Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <ClipboardList className="h-4 w-4" />
            <span>Module 4.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Recording and Reporting RCA Outcomes
          </h1>
          <p className="text-white/80">
            Documenting and communicating root cause analysis findings for continuous improvement
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>RCA report:</strong> Executive summary, findings, root cause, actions, lessons</li>
              <li className="pl-1"><strong>Multiple audiences:</strong> Management, technicians, auditors, CMMS</li>
              <li className="pl-1"><strong>Action tracking:</strong> Owner, deadline, status, verification</li>
              <li className="pl-1"><strong>Knowledge sharing:</strong> Lessons learned benefit the entire team</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Professional writing:</strong> Factual, evidence-based, no blame</li>
              <li className="pl-1"><strong>Aggregate analysis:</strong> Patterns across multiple RCAs drive strategy</li>
              <li className="pl-1"><strong>Legal significance:</strong> Reports may be disclosed in investigations</li>
              <li className="pl-1"><strong>ST1426:</strong> Communication and reporting assessed at EPA</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Structure an RCA report with executive summary, findings, root cause and recommendations",
              "Write clear, factual findings that avoid blame and focus on systemic causes",
              "Present RCA outcomes to different audiences using appropriate language and focus",
              "Track corrective and preventive actions through to verified completion",
              "Use aggregate RCA data to identify patterns and drive maintenance strategy improvement",
              "Understand the legal and regulatory significance of RCA documentation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Structuring the RCA Report
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The RCA report is the formal output of the root cause investigation. It transforms the analytical work of the 5 Whys, fishbone diagram or other technique into a documented record that informs decisions, drives actions and preserves knowledge. A well-structured report is easy to read, clearly presents the evidence and findings, and makes actionable recommendations that are specific, measurable and time-bound.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Executive Summary</h3>
                <p className="text-sm text-white">One page maximum. States the problem, the root cause, the impact (safety, downtime, cost) and the key recommendations. Written for decision-makers who may not read the full report.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Problem Description</h3>
                <p className="text-sm text-white">Detailed description of the fault: what equipment, when, what symptoms, what impact. Include the timeline of events from first occurrence to the start of investigation.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Investigation Methodology and Findings</h3>
                <p className="text-sm text-white">The diagnostic steps taken, test results, observations, maintenance history reviewed and evidence collected. Include the 5 Whys chain, fishbone diagram or other analysis tool used. Present all evidence — including normal findings that helped eliminate possible causes.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Root Cause Statement</h3>
                <p className="text-sm text-white">A clear, concise statement of the confirmed root cause, supported by the evidence presented. Distinguish between the immediate cause (what failed), the root cause (why it failed) and any contributing factors.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recommendations and Actions</h3>
                <p className="text-sm text-white">Specific corrective and preventive actions with responsible persons, deadlines and expected outcomes. Each action should be clearly linked to the root cause findings. Include cost estimates and resource requirements where relevant.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Writing principle:</strong> Be factual, not emotional. Be specific, not vague. Be constructive, not accusatory. The report should read as an objective technical document that any competent person could understand and act upon.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Communicating Findings to Stakeholders
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different stakeholders need different information from the RCA. The maintenance team needs technical detail. Management needs business impact and cost-benefit analysis of recommendations. Safety advisers need risk assessment. The CMMS needs structured, coded data. Effective communication means tailoring the message to the audience while maintaining the accuracy and integrity of the findings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communicating to Different Audiences</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Audience</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Focus</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Senior management</td>
                      <td className="border border-white/10 px-3 py-2">Business impact, cost, risk, recommendations</td>
                      <td className="border border-white/10 px-3 py-2">Executive summary, presentation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance team</td>
                      <td className="border border-white/10 px-3 py-2">Technical findings, diagnostic approach, lessons</td>
                      <td className="border border-white/10 px-3 py-2">Full report, toolbox talk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operations</td>
                      <td className="border border-white/10 px-3 py-2">What happened, what changed, any limitations</td>
                      <td className="border border-white/10 px-3 py-2">Briefing, handover note</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety adviser</td>
                      <td className="border border-white/10 px-3 py-2">Risk assessment, safety implications</td>
                      <td className="border border-white/10 px-3 py-2">Full report with risk context</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Auditors</td>
                      <td className="border border-white/10 px-3 py-2">Compliance evidence, systematic process</td>
                      <td className="border border-white/10 px-3 py-2">Full report with action tracking</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The ability to communicate technical findings clearly to non-technical stakeholders is a valuable professional skill. Practice translating technical language into business language: instead of "the IR reading dropped below 1 megohm", say "the insulation had degraded to a level that could cause equipment failure and presents a safety risk".
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Action Tracking and Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The RCA report is only as valuable as the actions it generates. Without a robust tracking system, recommendations are forgotten, deadlines pass without action, and the same faults recur. Action tracking bridges the gap between investigation and improvement, ensuring that every recommendation is followed through to verified completion.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Action Tracking Elements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Action description:</strong> Specific, clear and unambiguous — what exactly needs to be done</li>
                <li className="pl-1"><strong>Responsible person:</strong> Named individual (not a department or team) who owns the action</li>
                <li className="pl-1"><strong>Deadline:</strong> Realistic but firm completion date based on risk priority</li>
                <li className="pl-1"><strong>Status:</strong> Open, in progress, completed, overdue — updated regularly</li>
                <li className="pl-1"><strong>Completion evidence:</strong> What evidence confirms the action was done correctly</li>
                <li className="pl-1"><strong>Effectiveness verification:</strong> Has the action achieved its intended result</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Action Tracking Failures</p>
              <p className="text-sm text-white">
                The most common failures in action tracking are: actions assigned to departments rather than named individuals (no one takes ownership), unrealistic deadlines that are immediately abandoned, no regular review of open actions (out of sight, out of mind), completion based on self-declaration without evidence, and no verification of effectiveness (assuming it worked). Address these failure modes by insisting on named owners, realistic deadlines, regular review meetings, documented evidence of completion, and post-implementation monitoring.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Review open RCA actions at every maintenance team meeting. A visible action tracker (physical board or CMMS dashboard) keeps actions in focus and creates peer accountability. Celebrate completed actions to reinforce the value of the process.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Aggregate Analysis and Continuous Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Individual RCA reports are valuable. Aggregate analysis of multiple RCA reports is transformative. By looking across all investigations over a period, patterns emerge that reveal the true drivers of unreliability in your installation. These patterns inform strategic decisions about maintenance approach, capital investment, training priorities and design improvements that deliver the greatest return on investment.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">What Aggregate Analysis Reveals</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Most common root cause categories</li>
                  <li className="pl-1">Equipment types with highest failure rates</li>
                  <li className="pl-1">Environmental factors most frequently involved</li>
                  <li className="pl-1">Effectiveness of PM programmes</li>
                  <li className="pl-1">Training and competence gaps</li>
                  <li className="pl-1">Cost of failure vs cost of prevention</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RCA Programme KPIs</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Number of RCAs completed vs qualifying events</li>
                  <li className="pl-1">Average time from event to RCA completion</li>
                  <li className="pl-1">Percentage of actions completed on time</li>
                  <li className="pl-1">Repeat failure rate (same root cause)</li>
                  <li className="pl-1">MTBF improvement trend</li>
                  <li className="pl-1">Maintenance cost per unit of output</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> The ultimate measure of an RCA programme's success is not the number of reports produced but the reduction in failure rate and maintenance cost over time. If the same root causes keep appearing in your RCA reports, the programme is identifying problems but the organisation is not addressing them. The data is there — it needs to be acted upon.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">RCA Report Structure</p>
                <ul className="space-y-0.5">
                  <li>1. Executive summary (one page)</li>
                  <li>2. Problem description and timeline</li>
                  <li>3. Investigation method and findings</li>
                  <li>4. Root cause statement with evidence</li>
                  <li>5. Recommendations and actions</li>
                  <li>6. Lessons learned and appendices</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Action Tracking Essentials</p>
                <ul className="space-y-0.5">
                  <li>Named owner (not a department)</li>
                  <li>Realistic deadline (risk-based priority)</li>
                  <li>Regular status review</li>
                  <li>Evidence of completion</li>
                  <li>Effectiveness verification</li>
                  <li>ST1426 — reporting and communication KSBs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Corrective vs Preventive Actions
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6">
              Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section6_5;
