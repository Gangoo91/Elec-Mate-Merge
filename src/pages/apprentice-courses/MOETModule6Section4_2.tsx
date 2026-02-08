import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Communicating with Supervisors and Engineers - MOET Module 6 Section 4.2";
const DESCRIPTION = "Professional communication with supervisors and engineers, technical reporting, escalation procedures, and effective verbal and written communication for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "escalation-when",
    question: "When should a maintenance technician escalate an issue to a supervisor?",
    options: [
      "Only when specifically asked to do so",
      "When the issue exceeds their competence, authority, or involves safety risk that requires higher-level decision-making",
      "Never — technicians should always solve problems independently",
      "Only at the end of the shift"
    ],
    correctIndex: 1,
    explanation: "Escalation is a professional responsibility, not a failure. You should escalate when: the fault is beyond your competence or authorisation, safety risk requires senior decision-making, permit conditions may need to change, costs or timescales exceed your authority, or the situation involves regulatory implications."
  },
  {
    id: "technical-reporting",
    question: "When reporting a fault to a supervising engineer, what information should you provide?",
    options: [
      "Just say 'it is broken'",
      "A clear, structured account: what you found, what you measured, what you have done so far, and what you recommend as the next step",
      "Only the equipment asset number",
      "A guess at what might be wrong"
    ],
    correctIndex: 1,
    explanation: "Engineers and supervisors need structured information to make decisions. Provide: the equipment identity and location, symptoms observed, measurements taken and their values, what you have done so far, what the current status is, and your recommendation for next steps. This enables efficient decision-making without the supervisor needing to revisit the fault."
  },
  {
    id: "written-vs-verbal",
    question: "Why is it important to follow up a verbal report with a written record?",
    options: [
      "To create extra paperwork",
      "Because verbal communication alone lacks an audit trail — written records ensure traceability, prevent misunderstandings, and satisfy compliance requirements",
      "To fill in time during quiet periods",
      "It is not important — verbal reports are sufficient"
    ],
    correctIndex: 1,
    explanation: "Written records provide: an audit trail for investigations, evidence of compliance with regulations (EAWR 1989, PUWER), protection for you as the technician if decisions are later questioned, a reference for future work on the same equipment, and traceability required by quality management systems (ISO 9001)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A technician discovers a fault that requires parts costing more than their authorised spending limit. The correct action is to:",
    options: [
      "Order the parts anyway and explain later",
      "Report the fault to their supervisor with full diagnostic findings and a recommendation, then await authorisation before ordering",
      "Ignore the fault until the budget is available",
      "Ask a colleague to order the parts under their account"
    ],
    correctAnswer: 1,
    explanation: "Financial authorisation limits exist for good reason. Report your findings clearly, explain what parts are needed and why, provide cost estimates, and let the supervisor make the spending decision. This is professional behaviour, not weakness."
  },
  {
    id: 2,
    question: "When communicating with a design engineer about a recurring fault, you should:",
    options: [
      "Just tell them the equipment keeps breaking",
      "Provide detailed fault history including dates, frequencies, measurements, conditions, and your analysis of potential root causes",
      "Ask them to figure it out themselves",
      "Send a one-line email saying 'please investigate'"
    ],
    correctAnswer: 1,
    explanation: "Design engineers need data to identify design-related issues. Your maintenance records, measurements, and on-site observations are invaluable. The more structured and detailed your information, the faster the engineer can identify and resolve the root cause."
  },
  {
    id: 3,
    question: "During a verbal briefing to your supervisor about a safety concern, you should:",
    options: [
      "Speak as quickly as possible to save their time",
      "Use clear, concise language: state the concern, the evidence, the risk, and your recommended action",
      "Use as many technical abbreviations as possible",
      "Downplay the concern so they do not worry"
    ],
    correctAnswer: 1,
    explanation: "Safety communication must be clear and unambiguous. State the concern factually, present the evidence, explain the risk, and offer a recommendation. Never downplay safety concerns — this can have serious consequences."
  },
  {
    id: 4,
    question: "A supervisor asks you to carry out a task you believe is unsafe. The correct response is to:",
    options: [
      "Do it anyway because they are the supervisor",
      "Politely but firmly explain your safety concern, referencing the specific risk or regulation, and request the task be reviewed before proceeding",
      "Refuse without explanation and walk away",
      "Do it but complain afterwards"
    ],
    correctAnswer: 1,
    explanation: "Under HASAWA 1974, every worker has the right and duty to refuse unsafe work. However, this must be communicated professionally: explain what concerns you, reference the specific risk or regulation, and ask for the task to be reviewed. This is assertive communication, not insubordination."
  },
  {
    id: 5,
    question: "When writing a technical email to an engineer about a complex fault, best practice is to:",
    options: [
      "Write a stream-of-consciousness account",
      "Use a structured format: subject line with equipment ID, opening summary, chronological findings, measurements in a table, and clear next-steps request",
      "Keep it to one sentence regardless of complexity",
      "Include personal opinions about equipment quality"
    ],
    correctAnswer: 1,
    explanation: "Structured written communication saves time and reduces misunderstanding. A clear subject line helps the recipient prioritise; a summary enables a quick assessment; detailed findings support decision-making; and a clear request ensures action is taken."
  },
  {
    id: 6,
    question: "The purpose of a toolbox talk is to:",
    options: [
      "Discuss what tools to buy",
      "Brief the team on specific safety topics, method statements, or risk assessments before starting work, ensuring everyone understands the hazards and controls",
      "Show off new tools",
      "Waste time before work starts"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks are short, focused safety briefings delivered before work begins. They cover specific hazards, control measures, method statements, and emergency procedures. They ensure the whole team shares the same understanding of the work and its risks."
  },
  {
    id: 7,
    question: "When a supervising engineer gives you technical instructions you do not fully understand, you should:",
    options: [
      "Nod and hope you can work it out",
      "Ask for clarification immediately, repeating back your understanding to confirm it matches the engineer's intent",
      "Ask a colleague to explain it later",
      "Carry out what you think they meant"
    ],
    correctAnswer: 1,
    explanation: "Asking for clarification is a sign of professionalism, not ignorance. The 'read-back' technique — repeating your understanding in your own words — is used in safety-critical industries to confirm that the message received matches the message intended."
  },
  {
    id: 8,
    question: "Progress reports to supervisors should include:",
    options: [
      "Only good news",
      "Current status, percentage complete, any delays or obstacles, revised completion estimate, and any decisions required from the supervisor",
      "Only problems and complaints",
      "A single word: 'fine'"
    ],
    correctAnswer: 1,
    explanation: "Supervisors need accurate progress information to manage resources, schedules, and priorities. Report factually: what is done, what is outstanding, what obstacles exist, when you expect to finish, and what decisions or resources you need from them."
  },
  {
    id: 9,
    question: "Under ST1426, effective upward communication demonstrates:",
    options: [
      "The ability to talk loudly",
      "Professional responsibility, technical competence, and the ability to communicate complex technical information to support decision-making",
      "The ability to write long reports",
      "The ability to avoid responsibility"
    ],
    correctAnswer: 1,
    explanation: "ST1426 values communication as a core competency. Effective upward communication shows that you understand the technical situation, can present it clearly, and take professional responsibility for the accuracy of the information you provide."
  },
  {
    id: 10,
    question: "When documenting a disagreement with a supervisor's decision, the correct approach is to:",
    options: [
      "Do not document it — just do as you are told",
      "Record the facts objectively: what was discussed, what concerns were raised, what decision was made, and by whom — without emotional language",
      "Write an angry email to HR",
      "Post about it on social media"
    ],
    correctAnswer: 1,
    explanation: "Professional documentation of disagreements protects everyone. Record the facts without emotion: what was discussed, what options were considered, what concerns were raised, what decision was reached, and who made it. This is especially important for safety-related decisions."
  },
  {
    id: 11,
    question: "A CMMS work order should be updated:",
    options: [
      "Only when the job is fully complete",
      "At each significant stage: on arrival, during diagnosis, when parts are ordered, when work is completed, and at sign-off — providing a real-time audit trail",
      "Only if the supervisor asks",
      "Once a week in a batch"
    ],
    correctAnswer: 1,
    explanation: "Real-time CMMS updates enable supervisors and planners to track progress, allocate resources, and identify delays. A work order that is only updated at completion provides no visibility during the job — which can last hours or days."
  },
  {
    id: 12,
    question: "When requesting additional resources from a supervisor, you should:",
    options: [
      "Just say you need help",
      "Explain what resource is needed, why it is needed, the consequence of not having it, and the expected benefit — enabling the supervisor to make an informed decision",
      "Demand immediate assistance",
      "Wait until the supervisor notices you are struggling"
    ],
    correctAnswer: 1,
    explanation: "Supervisors manage competing priorities. A well-structured resource request explains the need, the impact of not acting, and the benefit of acting. This enables the supervisor to weigh your request against other demands and make an informed decision."
  }
];

const faqs = [
  {
    question: "How do I raise a safety concern without seeming difficult?",
    answer: "Focus on the facts, not opinions. Use objective language: 'I have measured X and it exceeds the limit specified in BS 7671 Regulation Y. I recommend Z before we proceed.' This is professional communication, not being difficult. Under HASAWA 1974, you have a legal duty to raise safety concerns. Any reasonable supervisor will respect a factual, well-presented concern."
  },
  {
    question: "What if my supervisor disagrees with my technical assessment?",
    answer: "Present your evidence calmly and clearly. If they still disagree, ask them to explain their reasoning — you may learn something. If you remain concerned about safety, you are entitled to request that the issue be reviewed by a more senior engineer or safety officer. Document the discussion objectively."
  },
  {
    question: "How much detail should I put in a verbal progress report?",
    answer: "Match the level of detail to the situation. For routine progress updates, a brief summary is sufficient: 'PPM on AHU-3 complete, no issues found, moving to AHU-4.' For complex faults or safety issues, provide more detail using the SBAR framework: Situation, Background, Assessment, Recommendation."
  },
  {
    question: "Should I copy my supervisor into every email?",
    answer: "No — information overload reduces effectiveness. Copy your supervisor when: a decision requires their authority, a safety issue needs their awareness, a cost or schedule impact exists, a client or third party is involved, or when they have specifically asked to be kept informed on a particular matter."
  },
  {
    question: "What is the difference between reporting and escalating?",
    answer: "Reporting is providing information — you are keeping your supervisor informed. Escalating is requesting action or a decision — the issue requires their authority, expertise, or involvement to resolve. Both are normal and expected parts of professional communication. Knowing when to escalate is a key competency under ST1426."
  }
];

const MOETModule6Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" /><span>Module 6.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Communicating with Supervisors and Engineers
          </h1>
          <p className="text-white/80">
            Professional upward communication, technical reporting, and escalation procedures
          </p>
        </header>

        {/* Summary boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Accurate transfer of technical information upward</li>
              <li className="pl-1"><strong>Reporting:</strong> Structured, factual, evidence-based communication</li>
              <li className="pl-1"><strong>Escalation:</strong> Knowing when an issue exceeds your authority or competence</li>
              <li className="pl-1"><strong>Documentation:</strong> Written records to support verbal communication</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault reporting:</strong> Clear symptoms, measurements, actions taken</li>
              <li className="pl-1"><strong>Progress updates:</strong> Status, delays, decisions needed</li>
              <li className="pl-1"><strong>Safety concerns:</strong> Factual, referenced to regulations</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to professional communication KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Communicate technical findings to supervisors in a structured, professional manner",
              "Apply the escalation framework to determine when issues require higher-level involvement",
              "Write effective technical reports, emails, and CMMS entries for engineering audiences",
              "Deliver clear verbal briefings using the SBAR communication structure",
              "Document disagreements and decisions objectively for audit trail purposes",
              "Recognise the legal and professional importance of accurate upward communication"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Role of Upward Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As a maintenance technician, you are the eyes and ears on the ground. Supervisors and engineers depend on your observations, measurements, and professional judgement to make decisions about equipment, safety, and resource allocation. The quality of their decisions is directly linked to the quality of information you provide.
            </p>
            <p>
              Effective upward communication is not about telling supervisors what they want to hear — it is about providing accurate, complete, and timely information that enables good decision-making. This includes both good news and bad: completed work, successful repairs, but also faults you cannot resolve, safety concerns, resource shortages, and honest assessments of equipment condition.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Upward Communication</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Routine reporting:</strong> PPM completion, work order updates, daily logs</li>
                <li className="pl-1"><strong>Fault reporting:</strong> What you found, measured, and recommend</li>
                <li className="pl-1"><strong>Progress updates:</strong> Status of ongoing work, revised timescales</li>
                <li className="pl-1"><strong>Escalation:</strong> Issues requiring supervisor authority or expertise</li>
                <li className="pl-1"><strong>Safety reporting:</strong> Hazards, near misses, unsafe conditions</li>
                <li className="pl-1"><strong>Resource requests:</strong> Parts, tools, additional labour, specialist support</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Professional Standard</p>
              <p className="text-sm text-white">Under ST1426, communication is assessed as both a skill and a behaviour. The ability to report technical information clearly, raise concerns professionally, and support decision-making through accurate data is a core requirement for the end-point assessment.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Reporting Technical Findings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When reporting a fault or technical finding to a supervisor or engineer, the goal is to transfer enough information for them to make a decision without needing to revisit the fault themselves. A well-structured report saves time, reduces misunderstanding, and demonstrates your professional competence.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Structured Fault Report Framework</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-elec-yellow/80 font-medium">Element</th>
                      <th className="py-2 text-elec-yellow/80 font-medium">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Equipment identity</td>
                      <td className="py-2">&quot;AHU-3, Plant Room Level 2, Asset No. AHU-003&quot;</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Symptoms observed</td>
                      <td className="py-2">&quot;Excessive vibration on supply fan, audible bearing noise&quot;</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Measurements taken</td>
                      <td className="py-2">&quot;Motor current 18.5 A (rated 15 A), vibration 7.2 mm/s (limit 4.5)&quot;</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Actions completed</td>
                      <td className="py-2">&quot;Isolated AHU-3 under PTW-2901. Inspected bearings — wear visible&quot;</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Current status</td>
                      <td className="py-2">&quot;AHU-3 isolated and locked off. Area served by AHU-4 backup&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Recommendation</td>
                      <td className="py-2">&quot;Replace fan bearings (SKF 6310-2RS). Estimated 4-hour repair&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p>
              Notice how each element adds value. The equipment identity removes ambiguity. The symptoms describe what you observed. The measurements provide objective data. The actions show what you have already done. The status confirms the current situation. The recommendation gives the supervisor a clear action to authorise.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Writing Effective CMMS Entries</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use the <strong>past tense</strong> for actions completed: &quot;Replaced bearings&quot; not &quot;Replacing bearings&quot;</li>
                <li className="pl-1">Include <strong>measurements and values</strong>: &quot;IR test: 150 M&Omega;&quot; not &quot;Insulation OK&quot;</li>
                <li className="pl-1">Reference <strong>standards and limits</strong>: &quot;Exceeds BS 7671 Table 41.3 limit of 0.4 s&quot;</li>
                <li className="pl-1">State <strong>next actions clearly</strong>: &quot;Requires replacement contactor — awaiting parts&quot;</li>
                <li className="pl-1">Avoid <strong>vague language</strong>: do not write &quot;checked and OK&quot; — state what you checked and what values you found</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Escalation Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Escalation is the process of raising an issue to a higher level of authority or expertise when it exceeds your own. Far from being a sign of weakness, appropriate escalation is a hallmark of professional competence. Knowing the limits of your authority and competence — and acting on that knowledge — is a critical safety behaviour.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Escalate</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safety risk:</strong> Any hazard that requires a decision beyond your authority — e.g., whether to shut down a system serving a critical area</li>
                <li className="pl-1"><strong>Technical complexity:</strong> A fault you cannot diagnose or repair within your competence level</li>
                <li className="pl-1"><strong>Financial authority:</strong> Repair costs exceeding your authorised spending limit</li>
                <li className="pl-1"><strong>Permit conditions:</strong> Work that may require the permit scope to be changed or extended</li>
                <li className="pl-1"><strong>Regulatory implications:</strong> Findings that may affect compliance with BS 7671, EAWR 1989, or other regulations</li>
                <li className="pl-1"><strong>Client impact:</strong> Work that will affect building occupants, tenants, or production</li>
                <li className="pl-1"><strong>Schedule impact:</strong> Delays that will affect other planned work or project milestones</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Never Delay Safety Escalation</p>
              <p className="text-sm text-white">If you identify an immediate danger to life — such as exposed live conductors, a gas leak, or structural damage — escalate immediately by any means available. Do not wait for a formal report. Make the area safe first, then report.</p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Escalation Communication Structure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>State the issue:</strong> &quot;I have found a C1 (danger present) observation on DB-7&quot;</li>
                <li className="pl-1"><strong>Explain the risk:</strong> &quot;The main switch has arc damage and could fail under load&quot;</li>
                <li className="pl-1"><strong>Describe current status:</strong> &quot;I have isolated DB-7 and informed the building manager&quot;</li>
                <li className="pl-1"><strong>State what you need:</strong> &quot;I need authorisation to order a replacement board and schedule the changeover&quot;</li>
                <li className="pl-1"><strong>Give your assessment:</strong> &quot;I estimate 2 days for parts and 1 day for the changeover, requiring a planned shutdown&quot;</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Verbal and Written Communication Skills
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance technicians must be able to communicate effectively in both verbal and written formats. Each has its place, and knowing when to use which — and how to make each effective — is a key professional skill.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Verbal Communication Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Be structured:</strong> Use SBAR or a similar framework rather than a stream of consciousness</li>
                <li className="pl-1"><strong>State facts first:</strong> &quot;The motor is drawing 18 A on a 15 A rated circuit&quot; not &quot;I think the motor might be overloaded&quot;</li>
                <li className="pl-1"><strong>Use the read-back technique:</strong> After receiving instructions, repeat them back: &quot;So you want me to replace the contactor on DB-3, circuit 7, and retest before re-energising?&quot;</li>
                <li className="pl-1"><strong>Confirm understanding:</strong> &quot;Is there anything else I should be aware of before I start?&quot;</li>
                <li className="pl-1"><strong>Speak at an appropriate pace:</strong> Especially when conveying safety-critical information</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Written Communication Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Subject lines:</strong> Include equipment ID and issue type — &quot;AHU-3: Fan bearing failure — requires replacement&quot;</li>
                <li className="pl-1"><strong>Opening summary:</strong> First sentence should state the key message — do not bury it</li>
                <li className="pl-1"><strong>Use bullet points:</strong> For findings, measurements, and action items</li>
                <li className="pl-1"><strong>Include data:</strong> Measurements, photos, screenshots of CMMS records where relevant</li>
                <li className="pl-1"><strong>Clear call to action:</strong> State exactly what you need from the reader: &quot;Please authorise the part order by Friday&quot;</li>
                <li className="pl-1"><strong>Professional tone:</strong> Factual, objective, free of emotion or blame</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Toolbox Talks and Team Briefings</h3>
              <p className="text-sm text-white mb-2">As you progress in your career, you may be asked to deliver toolbox talks or brief colleagues. Key principles include:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Keep it focused — one topic per talk, 5-15 minutes maximum</li>
                <li className="pl-1">Make it relevant — relate it to current work or recent incidents</li>
                <li className="pl-1">Encourage questions — two-way communication is more effective</li>
                <li className="pl-1">Record attendance — document who was briefed and when</li>
                <li className="pl-1">Follow up — check understanding through observation on-site</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Assertive Communication and Conflict Resolution
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Assertive communication means expressing your views clearly and confidently while respecting others. In maintenance, this is particularly important when raising safety concerns, disagreeing with a proposed course of action, or requesting resources. Assertive communication is not aggressive — it is professional, factual, and respectful.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The CUS Model for Safety Communication</h3>
              <p className="text-sm text-white mb-2">When raising safety concerns, escalate through three levels:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>C — Concerned:</strong> &quot;I am concerned that the isolation may not be adequate for this work scope.&quot;</li>
                <li className="pl-1"><strong>U — Uncomfortable:</strong> &quot;I am uncomfortable proceeding without verifying the isolation on the upstream side.&quot;</li>
                <li className="pl-1"><strong>S — Stop:</strong> &quot;I need to stop this work. I believe there is a safety risk that must be resolved before we continue.&quot;</li>
              </ul>
            </div>
            <p>
              Each level carries more weight. Starting at &quot;concerned&quot; gives the other person an opportunity to address your concern. If they do not, escalating to &quot;uncomfortable&quot; signals that you are serious. &quot;Stop&quot; is the final level — it means the work must halt until the concern is resolved. Under HASAWA 1974 Section 7, you have a legal right to stop work you believe is unsafe.
            </p>
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Documenting Decisions</p>
              <p className="text-sm text-white">When a supervisor makes a decision you disagree with — particularly on safety matters — document the discussion factually. Record: what was discussed, what concerns were raised, what decision was made, and by whom. This protects both parties and provides an audit trail if the decision is later questioned.</p>
            </div>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />Previous: Shift Handover
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4-3">
              Next: Liaising with Non-Technical Staff<ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section4_2;
