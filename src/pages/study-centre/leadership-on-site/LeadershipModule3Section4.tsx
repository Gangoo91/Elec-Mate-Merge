import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, FileText, Mail, Shield, ClipboardList, ListChecks, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wc-report-language",
    question: "When writing a site report about a disagreement with a subcontractor, which of the following is the most professional and appropriate way to record the event?",
    options: [
      "'The plumber was being difficult and refused to cooperate with the programme.'",
      "'Plumber raised concerns about programme sequence at progress meeting 12 March. Action: PM to review and confirm revised sequence by 15 March.'",
      "'Had a massive argument with the plumber who was out of order about the programme.'",
      "'Plumber was wrong about the programme and I told him so at the meeting.'"
    ],
    correctIndex: 1,
    explanation: "Site reports must be factual and objective. Stating what was said, by whom, when, and what action was agreed is professional and defensible. Subjective language ('difficult', 'out of order', 'massive argument') is opinion, not fact, and would undermine the credibility of the report if it were ever used in a dispute or legal proceeding."
  },
  {
    id: "wc-email-structure",
    question: "Which of the following is the BEST practice when writing a professional email about a site issue?",
    options: [
      "Write a long, detailed email covering multiple topics so the recipient has all the information in one place",
      "Use capital letters for the most important points so they stand out clearly",
      "State the purpose in the first sentence, cover one topic, include a clear action, and keep it short",
      "Copy in as many people as possible so everyone is aware of the issue"
    ],
    correctIndex: 2,
    explanation: "Professional emails should state the purpose in the first sentence, cover one topic per email, include a clear action or request, and be as concise as possible. Long, multi-topic emails get half-read. Capital letters read as shouting. Copying in everyone creates noise and dilutes responsibility for action."
  },
  {
    id: "wc-riddor",
    question: "Under RIDDOR, which of the following is a legal requirement for employers when a reportable incident occurs on site?",
    options: [
      "Report the incident to the HSE and keep a written record of the details",
      "Report the incident verbally to the site manager and leave it at that",
      "Only report the incident if someone was hospitalised for more than 24 hours",
      "Complete a report only if the injured person requests one"
    ],
    correctIndex: 0,
    explanation: "RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) requires employers to report specified workplace incidents to the HSE and to keep a written record. This is a legal obligation, not optional. The record must include date, time, location, people involved, description of what happened, and actions taken. Failure to report is a criminal offence."
  }
];

const faqs = [
  {
    question: "I am better at talking than writing. Do I really need to improve my written communication?",
    answer: "Yes. As a supervisor or site leader, a significant proportion of your communication is written — emails, reports, method statements, toolbox talk records, incident reports, daily diaries. Verbal instructions are forgotten, misremembered, or denied. Written records are permanent, searchable, and legally admissible. In construction disputes, the party with the better written records almost always has the stronger position. You do not need to write like a novelist — you need to write clearly, factually, and concisely. That is a skill anyone can learn with practice."
  },
  {
    question: "How detailed should my site diary or daily report be?",
    answer: "Detailed enough that someone who was not on site could understand what happened that day. Record: weather conditions, workforce numbers by trade, key activities completed, any delays and reasons, verbal instructions received or given, deliveries, visitors, safety observations, and any issues or concerns. Keep entries factual and contemporaneous — write them on the day, not from memory a week later. A good rule of thumb: if this record were read by a stranger in five years during an adjudication, would it make sense? If yes, it is detailed enough."
  },
  {
    question: "What is the difference between an incident report and a near-miss report?",
    answer: "An incident report records an event where harm actually occurred — someone was injured, property was damaged, or there was a dangerous occurrence. A near-miss report records an event where harm could have occurred but did not — for example, a tool falling from height but not hitting anyone, or an operative almost stepping into an unguarded excavation. Both require the same level of factual recording. Near-miss reporting is arguably more important for prevention because it identifies hazards before someone is hurt. Many organisations have a near-miss reporting target because high near-miss reporting correlates with lower incident rates."
  },
  {
    question: "Can I amend a report after I have submitted it?",
    answer: "You should never alter the original content of a submitted report. If additional information comes to light or a correction is needed, add a clearly dated addendum or supplementary note that explains what has changed and why. The original record must remain intact. Altering an original report — especially an incident or safety report — can be seen as tampering with evidence, which has serious legal consequences. This applies to both paper and electronic records. If you make a mistake in a handwritten report, draw a single line through the error, write the correction alongside, date it, and initial it. Never use correction fluid or scribble over text."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When you become a supervisor, the amount of written communication you are responsible for:",
    options: [
      "Stays roughly the same as when you were a skilled operative",
      "Decreases because you spend more time talking to people face to face",
      "Increases dramatically — method statements, reports, emails, records all become your responsibility",
      "Only increases if you work for a large company"
    ],
    correctAnswer: 2,
    explanation: "Becoming a supervisor brings a dramatic increase in written communication. You are now responsible for method statements, risk assessments, site reports, progress updates, emails to project managers, daily diaries, toolbox talk records, incident reports, and much more. Your written word becomes a permanent record that can be used in disputes, investigations, and legal proceedings."
  },
  {
    id: 2,
    question: "A well-structured site report should include:",
    options: [
      "Your personal opinions about the quality of work and the competence of the workforce",
      "What happened, where, when, who was involved, what action was taken, and what follow-up is needed",
      "As much technical jargon as possible to demonstrate your expertise",
      "Only positive observations to maintain good relationships with the client"
    ],
    correctAnswer: 1,
    explanation: "A well-structured site report answers the key questions: what happened, where, when, who was involved, what action was taken, and what follow-up is required. It should be factual, objective, and written in plain language. Personal opinions, excessive jargon, and selective reporting all undermine the credibility and usefulness of the document."
  },
  {
    id: 3,
    question: "The 'angry email rule' advises that when you are frustrated or upset, you should:",
    options: [
      "Send the email immediately while the details are fresh in your mind",
      "Use capital letters to emphasise how serious the issue is",
      "Write the email, save it as a draft, and re-read it the next day before deciding whether to send",
      "Copy in senior management to make sure the recipient takes it seriously"
    ],
    correctAnswer: 2,
    explanation: "The angry email rule states: write the email if you need to get your thoughts out, save it as a draft, then re-read it the next day with fresh eyes before deciding whether to send it. Emails written in anger or frustration often contain language you will regret. Once sent, an email cannot be unsent, and it becomes a permanent record that can be forwarded, printed, and used against you."
  },
  {
    id: 4,
    question: "The phrase 'If it is not written down, it did not happen' refers to the principle that:",
    options: [
      "Events that are not witnessed by multiple people cannot be proved",
      "Verbal instructions and conversations carry the same weight as written records in disputes",
      "In construction disputes and investigations, written contemporaneous records carry far more weight than verbal recollections",
      "You should never rely on verbal communication for anything on site"
    ],
    correctAnswer: 2,
    explanation: "In construction disputes, adjudications, and legal proceedings, written contemporaneous records are given far more weight than verbal recollections. Memories fade, people disagree about what was said, and verbal instructions can be denied. A written record made at the time of the event is the strongest form of evidence. This is why keeping detailed, factual, contemporaneous records is essential for any site leader."
  },
  {
    id: 5,
    question: "RIDDOR stands for:",
    options: [
      "Reporting of Industrial Diseases, Dangers and Operational Risks",
      "Regulations for Investigating Dangerous and Destructive Occurrences at Work",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "Recording and Investigating Dangerous Events and Risks Regulations"
    ],
    correctAnswer: 2,
    explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. These regulations require employers to report and keep records of specified workplace incidents, including deaths, specified injuries, over-seven-day incapacitation, occupational diseases, and dangerous occurrences."
  },
  {
    id: 6,
    question: "A contemporaneous note is:",
    options: [
      "A note written from memory several weeks after the event",
      "A note written at or very close to the time of the event it records",
      "A note that has been agreed by all parties involved in the event",
      "A note written by a solicitor summarising the facts of a case"
    ],
    correctAnswer: 1,
    explanation: "A contemporaneous note is one made at the time of the event or as soon as reasonably practicable afterwards. These notes carry significant weight in legal and contractual proceedings because they are considered more reliable than notes written from memory days, weeks, or months later. The closer the record is to the actual event, the more credible it is."
  },
  {
    id: 7,
    question: "When recording an incident report, you should NEVER:",
    options: [
      "Include the names of witnesses who saw what happened",
      "Describe the immediate actions you took after the incident",
      "Alter the original report after it has been submitted",
      "Record the exact date, time, and location of the incident"
    ],
    correctAnswer: 2,
    explanation: "You must never alter the original content of a submitted incident report. If corrections or additional information are needed, add a clearly dated addendum or supplementary note. Altering an original report — especially a safety or incident report — can be treated as tampering with evidence, which has serious legal consequences."
  },
  {
    id: 8,
    question: "Which of the 7 Cs of Communication states that your writing should use specific facts, figures, and real examples rather than vague or abstract language?",
    options: [
      "Clear — the reader must understand what you mean",
      "Concrete — use specific facts and measurable details",
      "Concise — say what needs saying in as few words as possible",
      "Coherent — ideas must flow logically from one to the next"
    ],
    correctAnswer: 1,
    explanation: "The 'Concrete' principle requires that your writing uses specific, definite, and measurable information rather than vague, abstract, or general statements. For example, 'the work area was untidy' is vague, whereas 'offcuts, packaging, and loose fixings were observed on the floor throughout the Zone B corridor at 14:30 on 12 March' is concrete. Concrete writing is harder to dispute and more useful as a record."
  }
];

export default function LeadershipModule3Section4() {
  useSEO({
    title: "Written Communication — Emails, Reports, Records | Leadership Module 3.4",
    description: "Writing clear site reports, professional emails, keeping records that protect you, and incident reporting under RIDDOR — essential written communication skills for construction leaders.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Written Communication &mdash; Emails, Reports, Records
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to write clearly, keep records that protect you, and produce reports that stand up to scrutiny years after the event
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Reality:</strong> Becoming a supervisor = dramatic increase in writing</li>
              <li><strong>Permanent:</strong> Your written word is a permanent record</li>
              <li><strong>Legal:</strong> Poor writing = disputes, liability, lost claims</li>
              <li><strong>Golden rule:</strong> If it is not written down, it did not happen</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Reports:</strong> What, where, when, who, action, follow-up</li>
              <li><strong>Emails:</strong> One topic, purpose first, clear action</li>
              <li><strong>Records:</strong> Contemporaneous notes protect you in disputes</li>
              <li><strong>RIDDOR:</strong> Legal requirement to report and record incidents</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why written communication becomes critical when you move into a leadership role",
              "Structure a clear, factual site report using the what/where/when/who/action/follow-up framework",
              "Write professional emails that are concise, purposeful, and lead to clear action",
              "Maintain contemporaneous records that protect you in construction disputes and investigations",
              "Complete accurate incident and near-miss reports in accordance with RIDDOR requirements",
              "Apply the 7 Cs of Communication and the five-year test to all written records"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/80 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ================================================================== */}
        {/* Section 01: Why Written Communication Matters for Leaders          */}
        {/* ================================================================== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Written Communication Matters for Leaders
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The day you step up from skilled operative to supervisor, the amount of writing you are
                responsible for increases <strong>dramatically</strong>. As an electrician, your written
                output was mostly limited to test certificates and the occasional snagging list. As a
                leader, you are suddenly responsible for method statements, risk assessments, site reports,
                daily diaries, progress updates, emails to project managers and clients, toolbox talk
                records, performance notes, and incident reports.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Permanent Record</p>
                </div>
                <p className="text-base text-white leading-relaxed">
                  Every email you send, every report you write, every record you create becomes a
                  <strong> permanent document</strong> that can be read, forwarded, printed, disclosed
                  in legal proceedings, and scrutinised by people you have never met. Unlike a verbal
                  conversation, which fades from memory and can be denied, your written word endures.
                </p>
              </div>

              <p>
                This is both an opportunity and a risk. Good written communication builds your professional
                reputation, protects your position in disputes, and ensures your instructions are followed
                correctly. Poor written communication does the opposite &mdash; it creates
                <strong> miscommunication, contractual disputes, and legal liability</strong>.
              </p>

              <p>
                In the UK construction industry, written records serve three critical purposes. First,
                <strong> legal protection</strong>: your records may be the only evidence available if a
                dispute goes to adjudication, arbitration, or court. Second, <strong>audit trail</strong>:
                regulators, clients, and insurers expect clear documentation of decisions, instructions,
                and events. Third, <strong>professionalism</strong>: the quality of your writing reflects
                on you, your team, and your company. A supervisor who writes clearly and keeps thorough
                records is taken more seriously than one who does not.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Written Communication on Site</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Planning &amp; Compliance</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Method statements and risk assessments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Toolbox talk records and attendance sheets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Permit-to-work documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Requests for information (RFIs)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Reporting &amp; Records</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Daily site diaries and progress reports</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Incident and near-miss reports</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Variation orders and delay notifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Accident/incident reports (RIDDOR)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Correspondence</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Emails to project managers and clients</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Instructions to subcontractors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Progress updates and programme submissions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Letters of confirmation following verbal instructions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">People Management</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Performance conversation records</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Safety briefing sign-off sheets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Training records and competence assessments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Induction records for new starters</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Cost of Poor Writing</p>
                </div>
                <p className="text-sm text-white">
                  A poorly worded email can escalate a minor issue into a major dispute. An incomplete
                  site report can leave you exposed when a claim is made months later. A vague method
                  statement can fail to protect your team. In construction, <strong>your
                  writing has consequences</strong>. The good news is that clear, professional writing
                  is a learnable skill &mdash; you do not need to write like a novelist, you need to
                  write like a professional who values accuracy, clarity, and brevity.
                </p>
              </div>

              <p>
                The CITB (Construction Industry Training Board) identifies written communication as
                a core competency for anyone moving into a supervisory role. The ILM Level 2 Award
                in Leadership and Team Skills similarly requires learners to demonstrate the ability
                to communicate clearly in writing. This is not academic theory &mdash; it is a
                practical skill that directly affects your effectiveness on site every single day.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* Section 02: Writing Clear Site Reports                             */}
        {/* ================================================================== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Writing Clear Site Reports
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Site reports are the backbone of construction record-keeping. Whether it is a daily diary,
                a progress report, or a record of an event, the same principles apply: <strong>be factual,
                be objective, be structured, and be complete</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Six-Point Report Structure</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">1. What &mdash; What happened?</p>
                    <p className="text-white">Describe the event, activity, or observation in factual terms. What exactly occurred? What was observed? Be specific, not vague.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">2. Where &mdash; Where did it happen?</p>
                    <p className="text-white">Specify the location precisely. Not &ldquo;on site&rdquo; but &ldquo;Level 2, Block C, corridor adjacent to riser R7.&rdquo; The more specific, the more useful the record.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">3. When &mdash; When did it happen?</p>
                    <p className="text-white">Date and time. Always. &ldquo;Last week&rdquo; is useless in a record that might be read two years later. &ldquo;14 March 2025, approximately 10:30&rdquo; is useful.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">4. Who &mdash; Who was involved?</p>
                    <p className="text-white">Name the people involved or present. Their roles, their companies, their actions. &ldquo;Someone from the mechanical contractor&rdquo; is weak. &ldquo;John Smith, Site Foreman, ABC Mechanical Ltd&rdquo; is strong.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">5. Action &mdash; What action was taken?</p>
                    <p className="text-white">Record the immediate response. What did you do? What was agreed? What instructions were given? Who was notified?</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold mb-1">6. Follow-up &mdash; What happens next?</p>
                    <p className="text-white">Who is responsible for the next step? By when? What is the expected outcome? This creates a clear action trail that can be tracked.</p>
                  </div>
                </div>
              </div>

              <p>
                The most important principle is <strong>objectivity</strong>. A site report is not the
                place for opinions, emotions, or subjective judgements. Consider the difference:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Poor (Subjective)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>&ldquo;The plumber was being difficult and refused to cooperate.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>&ldquo;The labourer was lazy and didn&rsquo;t do what he was told.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>&ldquo;The work area was a complete mess.&rdquo;</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Good (Objective)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>&ldquo;Plumber raised concerns about programme sequence at progress meeting 12 March.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>&ldquo;Labourer J. Brown did not complete assigned task (cable tray delivery to L3). Discussed at 15:00.&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>&ldquo;Offcuts, packaging, and loose fixings observed on floor throughout Zone B corridor.&rdquo;</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Use <strong>short sentences</strong>. Avoid jargon when the reader may be a non-technical
                audience such as a client, contract administrator, or solicitor. A report that cannot be
                understood by its intended reader has failed in its purpose, regardless of how accurate
                the technical content might be.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Site Diaries &mdash; What to Record Every Day</p>
                <p className="text-sm text-white mb-3">
                  A site diary is your daily factual record of what happened on site. It should be completed
                  on the day, not retrospectively. A well-maintained site diary is worth its weight in gold
                  if a dispute arises months or years later.
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Weather conditions</strong> &mdash; temperature, rainfall, wind (these affect working conditions and can explain delays)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Workforce numbers</strong> &mdash; how many operatives were on site, broken down by trade and company</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Key activities completed</strong> &mdash; what work was carried out, which areas, what stage reached</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Delays and reasons</strong> &mdash; what caused any delay, who was affected, what the impact was</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Verbal instructions</strong> &mdash; any instructions received or given, confirmed in writing where possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Deliveries and visitors</strong> &mdash; what was delivered, who visited, what was discussed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Safety observations</strong> &mdash; any hazards noted, near-misses, safety actions taken</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Issues and concerns</strong> &mdash; anything that could affect the programme, quality, or safety</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">Write for the Reader</p>
                <p className="text-sm text-white">
                  Before you write, ask yourself: <strong>who will read this?</strong> A
                  report for your project manager can include technical detail. A report for a client
                  representative should use plain language. An incident report that may be read by a
                  solicitor, an HSE inspector, or a coroner must be factual, precise, and free of
                  ambiguity. Tailor your language to your audience while keeping the facts identical.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ================================================================== */}
        {/* Section 03: Professional Emails                                    */}
        {/* ================================================================== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Professional Emails
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Email is the primary form of written communication in construction. It is fast, trackable,
                and creates an automatic record. But most people write emails badly &mdash; too long, too
                vague, too many topics, unclear on what action is needed. A professional email gets read,
                understood, and acted upon. A poor email gets half-read and ignored.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Professional Email Structure</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Clear subject line</strong> &mdash; Summarise the content in a few words. &ldquo;Delay to L2 electrical first fix &mdash; action required by 18 March&rdquo; is far better than &ldquo;Update&rdquo; or &ldquo;Quick question.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Professional greeting</strong> &mdash; &ldquo;Hi Sarah&rdquo; or &ldquo;Good morning, David&rdquo; sets the right tone. Skip the greeting only if you are in a rapid back-and-forth exchange.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Purpose in the first sentence</strong> &mdash; State why you are writing immediately. &ldquo;I am writing to notify you of a two-day delay to the Level 2 electrical first fix programme.&rdquo; Do not bury the key point in the third paragraph.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Supporting detail</strong> &mdash; Provide the necessary context in short paragraphs. What happened, why, what the impact is. Keep it brief and relevant.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Clear action</strong> &mdash; State explicitly what you need from the recipient. &ldquo;Please confirm the revised access date by close of business Friday.&rdquo; Not &ldquo;Let me know your thoughts.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Professional sign-off</strong> &mdash; &ldquo;Kind regards&rdquo; or &ldquo;Best regards&rdquo; followed by your name, title, and contact details.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Email Rules for Site Leaders</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>One topic per email.</strong> If you have three issues, send three emails. Multi-topic emails lead to partial responses where the recipient addresses one point and ignores the rest.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Keep it short.</strong> If your email is longer than a phone screen, it is probably too long. Say what needs saying and stop. Long emails get skimmed, not read.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Never use all capitals.</strong> WRITING IN CAPITALS READS AS SHOUTING. It is aggressive, unprofessional, and undermines your message. Use bold if you need emphasis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Be careful with &ldquo;Reply All.&rdquo;</strong> Only include people who need to see your response. Unnecessary &ldquo;reply all&rdquo; emails clog inboxes and create noise.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Proofread before sending.</strong> Spelling mistakes and grammatical errors undermine your credibility. Read your email once before hitting send. It takes ten seconds and can prevent embarrassment or misunderstanding.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>CC and BCC with purpose.</strong> Only CC people who genuinely need visibility. Use BCC very sparingly &mdash; if it feels like you are hiding something, you probably are.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <PenLine className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">When to Pick Up the Phone Instead</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Email is not always the right tool. Some situations require a phone call or a
                  face-to-face conversation. Use the phone or meet in person when:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>The issue is sensitive or personal</strong> &mdash; performance concerns, personal difficulties, or anything that could embarrass someone should never be addressed by email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>You have gone back and forth more than twice</strong> &mdash; if an email chain is growing, a five-minute call will resolve it faster than another five emails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>The tone might be misread</strong> &mdash; email has no tone of voice, facial expression, or body language. Sarcasm, humour, and nuance are easily misinterpreted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong>Urgent action is needed</strong> &mdash; if someone needs to act immediately, do not rely on an email they might not read for hours. Call them, then follow up with an email to confirm</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>The golden rule:</strong> pick up the phone when you need to, but always follow
                  up important verbal conversations with a written confirmation email. That way you get the
                  speed of a call and the protection of a written record.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Angry Email Rule</p>
                </div>
                <p className="text-sm text-white">
                  If you are frustrated, angry, or upset, <strong>do not send the
                  email</strong>. Write it if you need to get your thoughts out. Save it as a draft. Close
                  your email. Come back and re-read it the next day with fresh eyes. Nine times out of ten,
                  you will rewrite it in a calmer, more professional tone. Once an email is sent, it cannot
                  be unsent. It can be forwarded to people you never intended to read it. It can be printed
                  and included in contractual correspondence. <strong>An email written
                  in anger will outlive the anger by years.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ================================================================== */}
        {/* Section 04: Keeping Records That Protect You                       */}
        {/* ================================================================== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Keeping Records That Protect You
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction disputes are one of the most common forms of commercial disagreement in the
                UK. Delays, variations, defects, payment disputes, and liability claims are an everyday
                reality of the industry. When these disputes go to adjudication, arbitration, or court,
                <strong> the outcome almost always comes down to the quality of the written records</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Golden Rule</p>
                </div>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;If it is not written down, it did not happen.&rdquo;</strong>
                </p>
                <p className="text-sm text-white mt-2">
                  This principle is repeated by every construction lawyer, adjudicator, and contract
                  specialist. Verbal conversations are forgotten, denied, or remembered differently by
                  each party. A written record made at the time of the event &mdash; a
                  <strong> contemporaneous note</strong> &mdash; is the strongest
                  form of evidence available to you.
                </p>
              </div>

              <p>
                As a site leader, you must keep written records of every significant event, instruction,
                conversation, and decision. This is not bureaucracy &mdash; it is professional
                self-protection. The records you keep today may be the only thing standing between you
                and liability months or years from now.
              </p>

              <p>
                This principle is not just best practice &mdash; it is a legal reality. In the
                Technology and Construction Court (TCC), which handles many construction disputes in
                England and Wales, judges have consistently stated that contemporaneous documentary
                evidence is preferred over witness recollection. Your daily diary, your confirmation
                emails, and your site reports may be the most important documents in a dispute that
                involves hundreds of thousands of pounds.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What You Must Record in Writing</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Verbal instructions</strong> &mdash; if a project manager or client gives you a verbal instruction, follow it up with an email: &ldquo;Following our conversation at 14:00 today, I confirm your instruction to proceed with [X]. Please confirm this is correct.&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Toolbox talks and safety briefings</strong> &mdash; record the date, topic, who delivered it, and get all attendees to sign. This proves you gave the briefing if there is a later incident.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Performance conversations</strong> &mdash; when you speak to a team member about their performance, attendance, or conduct, write a brief note afterwards: date, what was discussed, what was agreed, what the expected improvement is.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Variations and changes</strong> &mdash; any change to the scope, specification, programme, or method of working must be recorded in writing. Never rely on a verbal agreement for a variation &mdash; confirm it in writing immediately.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Delays and disruption</strong> &mdash; record what caused the delay, when it started, who was affected, and what the impact was. Delay claims fail when the records are poor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Access issues</strong> &mdash; if you cannot access a work area because another trade has not finished, record it. Date, time, area, reason, who you notified. Every day of delay costs money.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>RFIs (Requests for Information)</strong> &mdash; when you need clarification on drawings, specifications, or scope, submit a formal RFI. Record the date you raised it and chase if no response comes within the agreed timeframe.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Makes a Good Contemporaneous Note?</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Written at the time</strong> &mdash; or as soon as reasonably practicable afterwards. A note made on the day is worth ten times more than one written from memory a week later.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Dated and timed</strong> &mdash; always include the date and, where relevant, the time. This establishes the chronology of events.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Factual and specific</strong> &mdash; record what happened, not what you think about what happened. Facts are defensible; opinions are not.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Stored securely</strong> &mdash; keep copies. Emails are automatically stored. Handwritten notes should be photographed or scanned. Never rely on a single copy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Never backdated</strong> &mdash; writing a record today and dating it last Tuesday is dishonest and potentially fraudulent. If you missed recording something, write it now, date it now, and note that it relates to events on [earlier date].</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Using Templates and Standard Formats</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Templates save time and improve consistency. You do not need to start from scratch every
                  time you write a report or email. Most organisations have standard templates for:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Daily site diaries with pre-set fields for weather, workforce, activities, delays, and safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Incident and near-miss report forms with mandatory fields</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Toolbox talk record sheets with attendance sign-off</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>RFI forms with tracking numbers and response deadlines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Variation order notifications with contractual references</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  If your organisation does not have templates, create your own. A consistent format means
                  nothing gets missed, and it is faster than writing from a blank page every time. The
                  CITB publishes template guidance documents for many of these. Use them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ================================================================== */}
        {/* Section 05: The 7 Cs, Common Mistakes, and Incident Reporting      */}
        {/* ================================================================== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The 7 Cs of Communication and Common Mistakes
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>7 Cs of Communication</strong> is a widely used framework for ensuring that
                written communication is effective. Originally developed for business communication, it
                applies directly to construction writing. Every email, report, and record you produce
                should satisfy all seven principles.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The 7 Cs of Effective Written Communication</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">1. Clear</p>
                    <p className="text-white">The reader must understand exactly what you mean. Use simple, direct language. Avoid ambiguity. If a sentence could be interpreted in two ways, rewrite it until it can only be read one way. Construction disputes frequently hinge on ambiguous wording in emails and reports.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">2. Concise</p>
                    <p className="text-white">Say what needs saying in as few words as possible. Remove filler words, unnecessary qualifiers, and waffle. &ldquo;I am writing to inform you that the delay which has been caused by the access issue that I mentioned previously is now expected to result in a programme impact&rdquo; should be &ldquo;The access delay I reported on 12 March will push our completion back by two days.&rdquo;</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">3. Concrete</p>
                    <p className="text-white">Use specific facts, figures, dates, names, and measurable details. Not &ldquo;the work area was untidy&rdquo; but &ldquo;offcuts, packaging, and loose fixings were observed on the floor throughout the Zone B corridor at 14:30 on 12 March.&rdquo; Concrete writing is harder to dispute.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">4. Correct</p>
                    <p className="text-white">Check your facts, your spelling, your grammar, and your numbers. A report that states &ldquo;Level 3&rdquo; when you meant &ldquo;Level 2&rdquo; can cause real problems. Incorrect information in a formal record undermines its credibility entirely.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">5. Coherent</p>
                    <p className="text-white">Your writing must flow logically from one point to the next. Each paragraph should build on the previous one. If you jump randomly between topics, the reader will struggle to follow your argument. Use headings, numbering, and bullet points to create structure.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">6. Complete</p>
                    <p className="text-white">Include all the information the reader needs to understand the situation and take the required action. An incomplete report creates more questions than it answers. Always check: have I covered what, where, when, who, action, and follow-up?</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">7. Courteous</p>
                    <p className="text-white">Professional does not mean cold. Even when reporting a problem or addressing a complaint, maintain a respectful tone. Aggressive, sarcastic, or accusatory language weakens your position and damages working relationships. You can be firm and factual while remaining courteous.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Written Communication Mistakes in Construction</p>
                <p className="text-sm text-white mb-3">
                  These are the mistakes that construction professionals make most often. Being aware of them
                  is the first step to avoiding them.
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong>Vague language</strong> &mdash; &ldquo;A few operatives&rdquo; instead of &ldquo;four electricians.&rdquo; &ldquo;The other day&rdquo; instead of &ldquo;Tuesday 14 March.&rdquo; Vague language is useless as a record and impossible to defend in a dispute.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong>Subjective opinions instead of facts</strong> &mdash; &ldquo;The work was poor quality&rdquo; is an opinion. &ldquo;Three containment brackets on Level 2 east corridor were fixed at 450mm centres instead of the specified 300mm centres&rdquo; is a fact.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong>Emotional language in formal records</strong> &mdash; &ldquo;Disgusted by the state of the work area&rdquo; has no place in a site report. &ldquo;Work area in Zone B corridor was not maintained to the required standard; see photographs attached&rdquo; is factual and professional.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong>Not recording verbal instructions</strong> &mdash; The single most common regret in construction disputes. &ldquo;The PM told me to do it&rdquo; is worthless without a confirmation email or diary note.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong>Multi-topic emails</strong> &mdash; Covering three issues in one email guarantees that at least one will be ignored. One topic per email, with a subject line that describes the content.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong>No clear action or deadline</strong> &mdash; &ldquo;Please could you look into this when you get a chance&rdquo; creates no urgency and no accountability. &ldquo;Please confirm the revised access date by 17:00 Friday 21 March&rdquo; is specific and trackable.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong>Writing retrospective records from memory</strong> &mdash; A diary written three days after the event is significantly less credible than one written on the day. Make it a daily habit, not a weekly catch-up.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong>Assuming the reader knows the context</strong> &mdash; Write as if the reader has no background knowledge of the project. This is especially important for records that may be read by someone unfamiliar with the site years later during a dispute.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Five-Year Test</p>
                </div>
                <p className="text-sm text-white">
                  Before submitting any report, email, or record, apply this test: <strong>could a
                  stranger understand this document in five years, with no background knowledge of
                  the project?</strong> If the answer is no, add the missing context, dates, names,
                  and detail. Construction disputes routinely surface years after the events. Your
                  records need to stand on their own without you being there to explain them.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-white pt-4">Incident and Near-Miss Reporting</h3>

              <p>
                When a workplace incident occurs, accurate reporting is not just good practice &mdash; it
                is a <strong>legal requirement</strong>. The <strong>Reporting of Injuries, Diseases and
                Dangerous Occurrences Regulations 2013 (RIDDOR)</strong> require employers to report and
                keep records of specified workplace incidents. Failure to comply is a criminal offence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What RIDDOR Requires Reporting</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Deaths</strong> &mdash; all work-related deaths must be reported immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Specified injuries</strong> &mdash; fractures (other than fingers, thumbs, and toes), amputations, loss of sight, crush injuries, scalping, burns, loss of consciousness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Over-seven-day incapacitation</strong> &mdash; injuries that prevent the worker from doing their normal work for more than seven consecutive days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Occupational diseases</strong> &mdash; certain diagnosed conditions including carpal tunnel syndrome, hand-arm vibration syndrome, and occupational dermatitis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Dangerous occurrences</strong> &mdash; specified near-miss events including the collapse of scaffolding, electrical incidents causing fire or explosion, and the unintended collapse of a building</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Writing an Incident Report &mdash; What to Record</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">The Basics</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Date, time, and exact location of the incident</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Names and roles of all people involved</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Names and contact details of witnesses</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">The Detail</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Factual description of what happened (no assumptions)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Immediate actions taken (first aid, area secured, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Root cause (if identifiable at the time)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg sm:col-span-2">
                    <p className="text-white font-medium mb-1">The Follow-Up</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Preventive measures put in place to stop it happening again</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Who was notified (site manager, H&amp;S adviser, client, HSE)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Photographs or sketches of the scene (taken before anything is moved if possible)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Incident vs Near-Miss Reports</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Incident Report</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Records an event where <strong>harm actually occurred</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Injury to a person, damage to property, or a dangerous occurrence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>May trigger RIDDOR reporting to the HSE</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Example: operative cuts hand on exposed cable end</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-amber-400 font-semibold text-sm mb-2">Near-Miss Report</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Records an event where <strong>harm could have occurred but did not</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>No actual injury or damage, but the potential was clear</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Critical for prevention &mdash; identifies hazards before someone is hurt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Example: tool falls from scaffold but misses everyone below</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Never Alter a Submitted Report</p>
                </div>
                <p className="text-sm text-white">
                  Once an incident report has been submitted, <strong>the original
                  content must never be altered</strong>. If additional information becomes available or a
                  correction is needed, add a clearly dated addendum or supplementary note. Altering an
                  original incident report can constitute <strong>tampering with
                  evidence</strong>, which has serious legal consequences including criminal prosecution.
                  For handwritten reports, draw a single line through any error, write the correction next
                  to it, date it, and initial it. Never use correction fluid or scribble over text.
                </p>
              </div>

              <p>
                Near-miss reporting is arguably <strong>more important than incident reporting</strong> for
                prevention. Research consistently shows that organisations with high near-miss reporting
                rates have lower incident rates. Every near-miss is a warning &mdash; a preview of an
                incident that has not happened yet. Encouraging your team to report near-misses without
                fear of blame is one of the most effective things a leader can do to improve site safety.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* Section 06: Section Summary                                        */}
        {/* ================================================================== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Written communication is not a secondary skill &mdash; it is a core leadership competency
                that directly affects your professional reputation, your legal protection, and the safety
                of your team. The single most important principle to take from this section is this:
                <strong> write as if a stranger will read it in five years</strong> &mdash; because they might.
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Leadership = more writing:</strong> Becoming a supervisor brings a dramatic increase in written communication responsibilities &mdash; reports, emails, records, method statements, incident reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Site reports:</strong> Use the six-point structure &mdash; what, where, when, who, action taken, follow-up. Be factual and objective, never subjective</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Professional emails:</strong> Clear subject, purpose first, one topic, clear action, short. Apply the angry email rule when frustrated. Know when to pick up the phone instead</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Records protect you:</strong> &ldquo;If it is not written down, it did not happen.&rdquo; Keep contemporaneous records of verbal instructions, variations, delays, briefings, and conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The 7 Cs:</strong> Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous &mdash; apply these to every piece of written communication you produce</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>RIDDOR compliance:</strong> Incident and near-miss reporting is a legal requirement. Record all facts, never alter submitted reports, and encourage near-miss reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Templates and consistency:</strong> Use standard templates for site diaries, incident reports, RFIs, and toolbox talks. Consistency saves time and prevents missed information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The five-year test:</strong> Write every record as if a stranger &mdash; a solicitor, an adjudicator, an HSE inspector &mdash; will read it in five years, because they might</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> Module 4 takes you into
                  <strong> Decision-Making &amp; Problem-Solving</strong> &mdash; the structured thinking
                  frameworks, root cause analysis tools, and decision-making models that separate
                  reactive supervisors from proactive leaders. You will learn how to make better
                  decisions under pressure and solve problems at their source rather than treating symptoms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-4">
              Next: Decision-Making &amp; Problem-Solving
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
