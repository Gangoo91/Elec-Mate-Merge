import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Communication and Reporting Skills - MOET Module 7 Section 4.2";
const DESCRIPTION = "Effective communication techniques for electrical maintenance technicians: verbal and written reporting, technical communication, handover procedures and professional reporting for EPA assessment under ST1426.";

const quickCheckQuestions = [
  {
    id: "verbal-comm-importance",
    question: "Why is clear verbal communication particularly important during electrical maintenance?",
    options: [
      "It helps pass the time during long jobs",
      "It ensures safety-critical information is accurately shared, preventing errors that could cause injury or equipment damage",
      "It is only important during formal meetings",
      "It replaces the need for written documentation"
    ],
    correctIndex: 1,
    explanation: "In electrical maintenance, verbal communication carries safety-critical information — isolation status, hazard warnings, task progress and handover details. Unclear or incomplete verbal communication has been directly linked to fatal incidents. Every message must be clear, concise and confirmed as understood."
  },
  {
    id: "report-writing-key",
    question: "What is the most important characteristic of a maintenance report?",
    options: [
      "It should be as long as possible to show thoroughness",
      "It should use complex technical jargon to impress the reader",
      "It should be clear, accurate, factual and structured so that any competent reader can understand it",
      "It should only include information that makes the technician look good"
    ],
    correctIndex: 2,
    explanation: "A maintenance report must be clear, accurate, factual and well-structured. It may be read by people with varying technical knowledge — from engineers to managers to auditors. The report should present facts objectively, in a logical structure, so that any competent reader can understand what was found, what was done and what further action is needed."
  },
  {
    id: "active-listening",
    question: "Which of the following best describes 'active listening'?",
    options: [
      "Hearing what someone says while doing something else",
      "Fully concentrating on the speaker, understanding their message, responding thoughtfully and remembering the information",
      "Waiting for your turn to speak",
      "Taking written notes of every word spoken"
    ],
    correctIndex: 1,
    explanation: "Active listening means fully focusing on the speaker, understanding their message, asking clarifying questions and providing feedback to confirm understanding. In maintenance, this is critical during briefings, handovers and fault reporting where missing a detail can have serious safety or operational consequences."
  },
  {
    id: "email-professional",
    question: "When writing a professional email to report a maintenance issue, which approach is correct?",
    options: [
      "Use text message abbreviations to save time",
      "Write a clear subject line, state the issue, provide relevant details and specify any action required",
      "Send a one-word email saying 'Fault' and wait for someone to call you",
      "Copy everyone in the organisation to cover yourself"
    ],
    correctIndex: 1,
    explanation: "Professional emails should have a clear subject line (e.g., 'Urgent: Earth fault on DB7 — Block C'), a concise description of the issue, relevant technical details (readings, observations, location) and a clear statement of any action required or expected. This ensures the recipient has all the information needed to respond appropriately."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The 'three Cs' of effective communication are:",
    options: [
      "Complex, comprehensive and creative",
      "Clear, concise and confirmed",
      "Casual, comfortable and calm",
      "Correct, copied and controlled"
    ],
    correctAnswer: 1,
    explanation: "Effective communication should be clear (easy to understand), concise (no unnecessary words) and confirmed (the recipient acknowledges understanding). In safety-critical maintenance environments, confirmation is particularly important — never assume your message has been understood without checking."
  },
  {
    id: 2,
    question: "During a shift handover, the outgoing technician should:",
    options: [
      "Leave a brief note and go home",
      "Provide a thorough verbal briefing backed up by written documentation covering work completed, outstanding issues and safety status",
      "Only mention problems if asked",
      "Send a text message after leaving site"
    ],
    correctAnswer: 1,
    explanation: "A thorough shift handover is a safety-critical communication. It must cover: work completed, work outstanding, current isolation status, any equipment left in an abnormal state, safety concerns, permit status and any other information the incoming team needs to work safely. Both verbal and written elements are essential."
  },
  {
    id: 3,
    question: "When reporting a fault to a supervisor, which information should you include?",
    options: [
      "Just the location of the fault",
      "The location, symptoms, test results, your diagnosis, any immediate actions taken and recommended next steps",
      "Only what you think the supervisor wants to hear",
      "Technical details only, with no mention of safety implications"
    ],
    correctAnswer: 1,
    explanation: "A complete fault report includes: precise location (building, floor, equipment ID), symptoms observed, test results and readings, your diagnosis and reasoning, any immediate actions taken (isolation, barriers), and recommended next steps. This gives the supervisor all the information needed to make decisions and allocate resources."
  },
  {
    id: 4,
    question: "Non-verbal communication in a maintenance team includes:",
    options: [
      "Only hand signals used on noisy sites",
      "Body language, facial expressions, tone of voice, eye contact and physical gestures",
      "Written reports and emails",
      "Radio communications"
    ],
    correctAnswer: 1,
    explanation: "Non-verbal communication includes body language, facial expressions, tone of voice, eye contact and gestures. Research suggests that over 70% of interpersonal communication is non-verbal. In maintenance, awareness of non-verbal cues helps you assess whether a colleague has genuinely understood a briefing, is feeling unsure about a task, or is under stress."
  },
  {
    id: 5,
    question: "A well-structured maintenance report should follow which order?",
    options: [
      "Conclusions first, then background, then data",
      "Background/context, findings/observations, analysis/diagnosis, recommendations/actions",
      "Personal opinions followed by some facts",
      "Random order — the reader can sort it out themselves"
    ],
    correctAnswer: 1,
    explanation: "A well-structured report follows a logical sequence: background/context (why the work was done), findings/observations (what you found), analysis/diagnosis (what it means) and recommendations/actions (what should be done). This structure helps the reader follow your reasoning and makes the report useful as a permanent record."
  },
  {
    id: 6,
    question: "When communicating technical information to a non-technical audience (e.g., a building manager), you should:",
    options: [
      "Use the same technical language as you would with a fellow electrician",
      "Refuse to explain technical matters to non-technical people",
      "Adapt your language to the audience's level of understanding while maintaining accuracy",
      "Oversimplify to the point where the information becomes inaccurate"
    ],
    correctAnswer: 2,
    explanation: "Tailoring your communication to the audience is a key professional skill. When speaking to non-technical audiences, use plain language, explain technical terms where necessary, use analogies and focus on the practical implications (cost, safety, disruption) rather than technical detail. Maintain accuracy — simplify, but do not mislead."
  },
  {
    id: 7,
    question: "What is the purpose of the phonetic alphabet in maintenance communications?",
    options: [
      "To make radio communications sound more professional",
      "To prevent misidentification of letters and numbers in noisy or radio environments, ensuring critical information like circuit references is communicated accurately",
      "It is only used by the military and has no place in maintenance",
      "To slow down communication for documentation purposes"
    ],
    correctAnswer: 1,
    explanation: "The phonetic alphabet (Alpha, Bravo, Charlie...) prevents misidentification of letters in noisy environments or over radio. In maintenance, misidentifying a circuit reference (e.g., 'B' misheard as 'D') could mean working on the wrong circuit. Using 'Bravo' instead of 'B' removes ambiguity and is standard practice in many industrial settings."
  },
  {
    id: 8,
    question: "COSHH data sheets, job cards and technical reports are examples of:",
    options: [
      "Unnecessary paperwork that slows maintenance work down",
      "Written communication that provides essential safety, technical and operational information",
      "Documents that only managers need to read",
      "Historical records with no practical value"
    ],
    correctAnswer: 1,
    explanation: "These documents are vital forms of written communication in maintenance. COSHH sheets communicate chemical hazards, job cards communicate task requirements and technical reports communicate findings and recommendations. Reading, understanding and producing written documentation is a core competence for maintenance technicians under ST1426."
  },
  {
    id: 9,
    question: "When recording test results in a maintenance log, which practice is correct?",
    options: [
      "Round all readings to the nearest whole number for simplicity",
      "Record actual readings accurately, include units, date, time, instrument used and your name",
      "Only record readings that fall within acceptable limits",
      "Record readings from memory at the end of the shift"
    ],
    correctAnswer: 1,
    explanation: "Test results must be recorded accurately at the time of measurement. Include the actual reading (not rounded), the unit of measurement, the date and time, the instrument used (including serial number and calibration status if applicable), and your name. This creates a reliable record for trending, compliance and audit purposes."
  },
  {
    id: 10,
    question: "Which communication barrier is most common in maintenance environments?",
    options: [
      "Language differences between countries",
      "Noise, time pressure, technical jargon, assumptions and hierarchical reluctance to challenge",
      "The inability to write in English",
      "Lack of mobile phone signal"
    ],
    correctAnswer: 1,
    explanation: "Maintenance environments present multiple communication barriers: high noise levels in plant areas, time pressure during breakdowns, excessive technical jargon, assumptions that others already know, and a reluctance to challenge more senior colleagues. Awareness of these barriers is the first step to overcoming them."
  },
  {
    id: 11,
    question: "The 'closed-loop' communication technique involves:",
    options: [
      "Keeping all communication within a closed group",
      "The sender giving a message, the receiver repeating it back, and the sender confirming the repeat is correct",
      "Using only written communication",
      "Ending every conversation by closing the door"
    ],
    correctAnswer: 1,
    explanation: "Closed-loop communication is a safety-critical technique: the sender delivers the message, the receiver repeats it back in their own words, and the sender confirms the repeat is correct. This three-step process eliminates misunderstandings. It is standard practice in HV switching operations and should be used for any safety-critical information exchange."
  },
  {
    id: 12,
    question: "Under ST1426, communication skills are assessed through:",
    options: [
      "A written English exam only",
      "The professional discussion, portfolio evidence and how you communicate throughout the EPA process",
      "A formal presentation to a panel",
      "Communication is not assessed in the EPA"
    ],
    correctAnswer: 1,
    explanation: "Communication is assessed throughout the EPA: in the professional discussion (how clearly and confidently you explain your experience), through portfolio evidence (quality of written reports and documentation), and in how you communicate during the practical observation. The assessor evaluates both your technical communication and your professional manner."
  }
];

const faqs = [
  {
    question: "How can I improve my report writing before the EPA?",
    answer: "Practice by writing up maintenance tasks you complete at work. Structure each report with clear sections: background, findings, actions and recommendations. Ask your supervisor or mentor to review your reports and give feedback. Read examples of well-written reports in your workplace. The more you practice, the more natural it becomes. Also, review your spelling and grammar — accuracy matters in professional documentation."
  },
  {
    question: "What if English is not my first language?",
    answer: "Many excellent maintenance technicians work in English as a second language. Focus on being clear and accurate rather than using complex language. Use simple sentence structures, avoid slang, and learn the standard technical vocabulary for your trade. Ask colleagues to help you practice, and use spell-check tools for written work. Your EPAO will make reasonable adjustments if needed — discuss this with your training provider well before the EPA."
  },
  {
    question: "How do I communicate effectively in a noisy plant environment?",
    answer: "Use a combination of techniques: face the person when speaking, use clear hand signals where established, use radio communications with the phonetic alphabet for critical references, use closed-loop communication for safety-critical messages, and move to a quieter area for detailed briefings. Never shout safety-critical information across a noisy plant floor — ensure direct communication."
  },
  {
    question: "What should I include in my EPA portfolio to demonstrate communication skills?",
    answer: "Include: maintenance reports you have written, completed job cards showing clear documentation, emails demonstrating professional communication, meeting notes where you contributed, toolbox talk records (especially any you delivered), handover logs, and witness testimonies commenting on your communication ability. Quality matters more than quantity — choose examples that show clear, professional and effective communication."
  },
  {
    question: "How formal should I be in the EPA professional discussion?",
    answer: "Be professional but natural. You do not need to be overly formal, but you should speak clearly, avoid slang, structure your answers logically and use appropriate technical terminology. Think of it as a conversation with a respected senior colleague — knowledgeable, respectful and confident. Practice explaining your work to someone who was not there, as this is essentially what the professional discussion requires."
  }
];

const MOETModule7Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Communication and Reporting Skills
          </h1>
          <p className="text-white/80">
            Effective communication techniques and professional reporting for maintenance technicians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Three Cs:</strong> Clear, concise, confirmed</li>
              <li className="pl-1"><strong>Written:</strong> Reports, job cards, logs, emails</li>
              <li className="pl-1"><strong>Verbal:</strong> Handovers, briefings, closed-loop checks</li>
              <li className="pl-1"><strong>Audience:</strong> Adapt language to technical/non-technical readers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Safety-critical:</strong> Isolation status, hazard warnings, PTW comms</li>
              <li className="pl-1"><strong>Technical:</strong> Fault reports, test results, CMMS entries</li>
              <li className="pl-1"><strong>Cross-trade:</strong> Multi-discipline coordination on site</li>
              <li className="pl-1"><strong>ST1426:</strong> Professional discussion and portfolio evidence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the principles of clear, concise and confirmed communication in maintenance",
              "Write professional maintenance reports, fault reports and technical documentation",
              "Conduct effective verbal briefings, handovers and closed-loop communications",
              "Adapt communication style and language to different audiences and contexts",
              "Use the phonetic alphabet and standard communication protocols for safety-critical messages",
              "Prepare communication evidence for your EPA portfolio and professional discussion"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Principles of Effective Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Communication is the foundation of safe, efficient maintenance work. Every time you report a fault,
              hand over to a colleague, brief a team before a task, or document test results, you are communicating
              information that others will use to make decisions. If that communication is unclear, incomplete or
              inaccurate, the consequences can range from wasted time and repeated work to serious safety incidents.
            </p>
            <p>
              The ST1426 standard recognises communication as a core professional behaviour. The EPA assesses not
              just what you know and what you can do, but how effectively you can communicate that knowledge and
              skill to others — colleagues, supervisors, clients and assessors.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Three Cs of Maintenance Communication</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Clear:</strong> Use plain language. Avoid unnecessary jargon. Structure information logically. Ensure the message can be understood by its intended audience</li>
                <li className="pl-1"><strong>Concise:</strong> Include all necessary information but no more. Eliminate waffle, repetition and irrelevant detail. Respect the reader's or listener's time</li>
                <li className="pl-1"><strong>Confirmed:</strong> Check that the message has been received and understood. For verbal communication, use closed-loop techniques. For written communication, request acknowledgement where appropriate</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Barriers in Maintenance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Barrier</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Environmental noise</td>
                      <td className="border border-white/10 px-3 py-2">Machinery, generators, fans in plant rooms</td>
                      <td className="border border-white/10 px-3 py-2">Move to quieter area; use radio; face the listener</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Time pressure</td>
                      <td className="border border-white/10 px-3 py-2">Rushed briefing during a breakdown</td>
                      <td className="border border-white/10 px-3 py-2">Prioritise safety information; use closed-loop</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technical jargon</td>
                      <td className="border border-white/10 px-3 py-2">Using terms the listener does not understand</td>
                      <td className="border border-white/10 px-3 py-2">Adapt language to the audience; explain terms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Assumptions</td>
                      <td className="border border-white/10 px-3 py-2">Assuming a colleague knows the isolation status</td>
                      <td className="border border-white/10 px-3 py-2">Always state explicitly; never assume knowledge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hierarchy</td>
                      <td className="border border-white/10 px-3 py-2">Reluctance to challenge a senior colleague</td>
                      <td className="border border-white/10 px-3 py-2">Promote a safety culture where challenge is valued</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The most dangerous communication failure is silence — not speaking up when
              something is wrong, unclear or unsafe. A professional technician communicates concerns immediately,
              regardless of who might be affected.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Verbal Communication and Handovers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Verbal communication is the most immediate and frequently used form of communication in maintenance.
              From toolbox talks and job briefings to radio calls and shift handovers, the ability to convey
              information clearly and listen actively is essential for safe, efficient operations. Unlike written
              communication, verbal messages leave no permanent record — making accuracy and confirmation even
              more critical.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Closed-Loop Communication</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Sender delivers the message:</strong> "Isolate MCB 7 in DB3, Building C, Ground Floor"</li>
                <li className="pl-1"><strong>Receiver repeats back:</strong> "Confirmed — isolating MCB 7 in DB3, Building C, Ground Floor"</li>
                <li className="pl-1"><strong>Sender confirms:</strong> "That is correct — proceed"</li>
              </ol>
              <p className="text-sm text-white/70 mt-3">
                This three-step process eliminates the risk of the receiver misunderstanding the instruction.
                It is mandatory in HV switching operations and should be used for all safety-critical verbal communications.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Shift Handover Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Work completed:</strong> What tasks have been finished and signed off</li>
                <li className="pl-1"><strong>Work in progress:</strong> Current status, what has been done, what remains</li>
                <li className="pl-1"><strong>Safety status:</strong> Current isolations, permits in force, lock-out/tag-out positions</li>
                <li className="pl-1"><strong>Equipment status:</strong> Any equipment in abnormal state, bypasses, temporary repairs</li>
                <li className="pl-1"><strong>Outstanding issues:</strong> Faults awaiting parts, deferred tasks, pending decisions</li>
                <li className="pl-1"><strong>Upcoming work:</strong> Planned tasks for the next shift, scheduled deliveries, contractor visits</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Handover Failure Example</p>
              <p className="text-sm text-white">
                In a reported industrial incident, a night-shift technician partially isolated a motor control
                centre for investigation of an intermittent earth fault. The verbal handover to the day shift
                was interrupted by an unrelated call, and the incoming technician only heard that "the MCC had
                been looked at." Assuming the investigation was complete, the day-shift team re-energised the
                supply without checking isolation status. The earth fault recurred, causing a flashover that
                damaged equipment and could have caused serious injury. A structured handover process with
                written backup would have prevented this.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never rely on memory alone for shift handovers. Use a structured
              written handover form to back up the verbal briefing. Both elements are needed — the verbal
              for emphasis and questions, the written for completeness and permanence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Written Reporting and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Written documentation is the permanent record of your work as a maintenance technician. Job cards,
              fault reports, test certificates, CMMS entries, maintenance logs and technical reports all form
              part of the documentary evidence trail that organisations rely on for compliance, audit, trending
              and continuous improvement. Your ability to produce clear, accurate written documentation is a
              professional competence assessed in the EPA.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structure of a Maintenance Report</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Background/context:</strong> Why the work was carried out — planned maintenance, fault response, modification</li>
                <li className="pl-1"><strong>Scope:</strong> What was examined, tested or repaired — specific equipment, circuit references, locations</li>
                <li className="pl-1"><strong>Findings/observations:</strong> Factual account of what you found — readings, condition, anomalies</li>
                <li className="pl-1"><strong>Analysis/diagnosis:</strong> Your professional interpretation of the findings — root cause, contributing factors</li>
                <li className="pl-1"><strong>Actions taken:</strong> What you did — repairs, replacements, temporary measures</li>
                <li className="pl-1"><strong>Recommendations:</strong> Further work needed, monitoring requirements, improvement suggestions</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Good Practice</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Write at the time of the work, not hours later from memory</li>
                  <li className="pl-1">Use factual, objective language — not opinions or assumptions</li>
                  <li className="pl-1">Include specific details: readings, dates, times, equipment IDs</li>
                  <li className="pl-1">Use correct technical terminology consistently</li>
                  <li className="pl-1">Check spelling and grammar before submitting</li>
                  <li className="pl-1">Sign and date all documents</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Mistakes</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Vague descriptions: "checked the board" rather than specific findings</li>
                  <li className="pl-1">Missing readings: "insulation resistance was fine" without the value</li>
                  <li className="pl-1">Opinions stated as facts without evidence</li>
                  <li className="pl-1">Incomplete entries: no date, no signature, no equipment reference</li>
                  <li className="pl-1">Illegible handwriting on paper records</li>
                  <li className="pl-1">Copy-pasting previous reports without updating details</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Your written work may be read by engineers, managers, HSE inspectors,
              insurance assessors or legal professionals long after you wrote it. Write every report as though it
              may need to stand up in court — because occasionally it does.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Adapting Communication to Your Audience
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As a maintenance technician, you communicate with a wide range of people: fellow electricians,
              mechanical fitters, production operators, building managers, health and safety officers, clients
              and — during your EPA — an independent assessor. Each audience has a different level of technical
              knowledge and different information needs. The ability to adapt your communication style while
              maintaining accuracy is a hallmark of professionalism.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Audience Adaptation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Audience</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What They Need</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How to Communicate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fellow electrician</td>
                      <td className="border border-white/10 px-3 py-2">Technical detail, readings, circuit refs</td>
                      <td className="border border-white/10 px-3 py-2">Full technical language; specific data</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Production manager</td>
                      <td className="border border-white/10 px-3 py-2">Impact on production, downtime, timeline</td>
                      <td className="border border-white/10 px-3 py-2">Plain language; focus on operational impact</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building occupant</td>
                      <td className="border border-white/10 px-3 py-2">What is happening, when, disruption expected</td>
                      <td className="border border-white/10 px-3 py-2">Simple, reassuring language; practical focus</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">H&amp;S officer</td>
                      <td className="border border-white/10 px-3 py-2">Safety measures, compliance, risk controls</td>
                      <td className="border border-white/10 px-3 py-2">Reference regulations; detail precautions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EPA assessor</td>
                      <td className="border border-white/10 px-3 py-2">Evidence of knowledge, skill and behaviour</td>
                      <td className="border border-white/10 px-3 py-2">Structured, confident, technical with context</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">The Professional Discussion</p>
              <p className="text-sm text-white">
                The EPA professional discussion is the ultimate test of your communication skills. You will need to
                articulate your knowledge, describe your work experience, explain your reasoning and demonstrate
                professional awareness — all through effective verbal communication. Practice explaining your work
                to someone who was not there. If they can understand your explanation, you are communicating well.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Simplifying your language for a non-technical audience is not "dumbing down"
              — it is a sophisticated professional skill. The best communicators make complex information accessible
              without sacrificing accuracy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Digital Communication and CMMS
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern maintenance increasingly relies on digital communication tools. Computerised Maintenance
              Management Systems (CMMS) are now standard in most industrial and commercial organisations,
              and the quality of data entered by technicians directly affects maintenance planning, performance
              reporting and asset management decisions. Your ability to use digital tools professionally is
              an increasingly important competence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CMMS Data Entry Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Complete the work order fully:</strong> Do not leave fields blank. Every field exists for a reason — incomplete data degrades system usefulness</li>
                <li className="pl-1"><strong>Use correct asset references:</strong> Select the right equipment from the asset register. Entering work against the wrong asset corrupts maintenance history</li>
                <li className="pl-1"><strong>Describe work accurately:</strong> Write clear descriptions of what was found and what was done, not just "fixed fault"</li>
                <li className="pl-1"><strong>Record time accurately:</strong> Actual hours worked provide data for future planning and costing</li>
                <li className="pl-1"><strong>Close out promptly:</strong> Complete the work order as soon as the task is finished, not days later</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Communication Tools</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">CMMS work order management</li>
                  <li className="pl-1">Professional email communication</li>
                  <li className="pl-1">Mobile maintenance apps on tablets</li>
                  <li className="pl-1">Digital photography for fault documentation</li>
                  <li className="pl-1">Building Management System (BMS) interfaces</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Email Standards</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Clear, specific subject line</li>
                  <li className="pl-1">Professional greeting and sign-off</li>
                  <li className="pl-1">Concise body text with relevant detail</li>
                  <li className="pl-1">Correct spelling and grammar</li>
                  <li className="pl-1">Appropriate recipients — not excessive cc</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The standard requires technicians to "use appropriate digital and information
              technology and techniques." Your ability to use CMMS systems, write professional emails and produce
              digital reports demonstrates this competence. Include examples in your EPA portfolio.
            </p>
          </div>
        </section>

        {/* Divider */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Communication and Reporting"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Teamwork and Collaboration
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4-3">
              Next: Time Management and Organisation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section4_2;
