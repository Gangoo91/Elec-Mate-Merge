import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Reporting Faults to Supervisors or Duty Holders - Level 2 Module 7 Section 6.2";
const DESCRIPTION = "How to report faults promptly and professionally to supervisors or duty holders";

const quizQuestions = [
  {
    id: 1,
    question: "Why must faults be reported as soon as they are identified?",
    options: [
      "Because it looks more professional to report quickly",
      "Because minor defects can escalate into danger; prompt reporting prevents harm and demonstrates due diligence",
      "Because supervisors prefer immediate calls",
      "Because it's a legal requirement to report within 1 hour"
    ],
    correctAnswer: 1,
    explanation: "Minor defects can escalate into serious safety hazards. Prompt reporting prevents accidents and demonstrates professional responsibility."
  },
  {
    id: 2,
    question: "Who is responsible for receiving fault reports on most work sites?",
    options: [
      "Any qualified electrician",
      "The site supervisor or appointed responsible person",
      "The client directly",
      "The most senior apprentice"
    ],
    correctAnswer: 1,
    explanation: "The site supervisor or appointed responsible person has the authority and responsibility to act on fault reports."
  },
  {
    id: 3,
    question: "Who might act as the duty holder in a rental property?",
    options: [
      "The tenant",
      "Any electrician on site",
      "The landlord or appointed agent/responsible person",
      "The local electrical contractor"
    ],
    correctAnswer: 2,
    explanation: "In rental properties, the landlord or their appointed agent typically holds responsibility for electrical safety."
  },
  {
    id: 4,
    question: "Why is casual language unhelpful when reporting faults?",
    options: [
      "It sounds too friendly",
      "It's vague and may cause misunderstandings or incorrect action",
      "It takes too long to explain",
      "It's against company policy"
    ],
    correctAnswer: 1,
    explanation: "Casual language lacks specificity and can lead to misunderstandings about the nature, location, or urgency of faults."
  },
  {
    id: 5,
    question: "Which is an example of a clear, professional fault report?",
    options: [
      "The socket's dodgy",
      "Something's wrong in the living room",
      "Circuit 2 (ring final) — socket in living room shows signs of overheating at the neutral terminal. Circuit isolated and labelled. Requires further investigation before energising",
      "There's a problem with the electricity"
    ],
    correctAnswer: 2,
    explanation: "Professional reports include specific circuit references, exact locations, observed conditions, actions taken, and next steps required."
  },
  {
    id: 6,
    question: "What is the difference between verbal and written reporting?",
    options: [
      "Verbal is more important than written",
      "Written is more important than verbal",
      "Verbal provides immediate communication; written forms a permanent, traceable record",
      "There is no difference between them"
    ],
    correctAnswer: 2,
    explanation: "Verbal reporting ensures immediate action can be taken, while written reports provide permanent documentation for legal and safety purposes."
  },
  {
    id: 7,
    question: "What details must always be included in written fault documentation?",
    options: [
      "Only the date and your name",
      "Fault details, exact location, circuit/board IDs, action taken, further work required, date/time, who it was reported to",
      "Just a brief description of the problem",
      "Only the circuit number"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation must include all relevant details to enable proper action and provide legal protection."
  },
  {
    id: 8,
    question: "True or False: Apprentices can delay reporting minor faults until later in the day.",
    options: [
      "True - minor faults are not urgent",
      "False - all faults must be reported immediately",
      "True - if they're busy with other work",
      "True - if the fault seems insignificant"
    ],
    correctAnswer: 1,
    explanation: "All faults, regardless of apparent severity, must be reported immediately as they can escalate and create serious hazards."
  },
  {
    id: 9,
    question: "In the refurbishment project example, why did the fault escalate to a fire?",
    options: [
      "The fault was too severe to prevent",
      "The wrong tools were used",
      "The fault was only mentioned casually and not formally reported, so no action was taken",
      "The circuit was overloaded"
    ],
    correctAnswer: 2,
    explanation: "The fault was observed but not formally reported, meaning no remedial action was taken, allowing it to escalate."
  },
  {
    id: 10,
    question: "How did correct reporting in the school installation example prevent danger?",
    options: [
      "By using expensive test equipment",
      "By working faster than normal",
      "By immediate escalation, isolation, documentation, and rectification before energising",
      "By ignoring the problem until later"
    ],
    correctAnswer: 2,
    explanation: "Following proper reporting procedures ensured the dangerous circuit was isolated and repaired before it could cause harm."
  }
];

const faqs = [
  {
    question: "Why is prompt reporting important?",
    answer: "Because even minor defects can escalate into dangerous conditions if ignored."
  },
  {
    question: "Who should faults be reported to?",
    answer: "Supervisors or duty holders such as landlords, site managers, or clients."
  },
  {
    question: "Why must reports be clear and factual?",
    answer: "To avoid misunderstanding and ensure the fault is dealt with correctly."
  },
  {
    question: "Why is written documentation essential?",
    answer: "It provides a permanent record of what was found and transfers responsibility."
  },
  {
    question: "Should I isolate a circuit before reporting if it's unsafe?",
    answer: "Yes. Make safe or isolate if there's a risk. Then report immediately and document the action taken."
  }
];

export default function Module7Section6_2() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 p-2 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Section 7.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <BookOpen className="w-4 h-4" />
            <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
            <span>Section 6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Reporting Faults to Supervisors or Duty Holders
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Prompt, factual reporting to the correct person — with clear documentation and escalation
          </p>
        </header>

        {/* In 30 Seconds Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <h2 className="font-semibold text-white mb-2">In 30 Seconds</h2>
          <ul className="text-white/80 space-y-1 text-sm">
            <li>• Identify the duty holder/supervisor for this site/job</li>
            <li>• Make safe or isolate if needed; never leave a hazard energised</li>
            <li>• Capture circuit ref, board ID, exact location and brief facts</li>
            <li>• Prepare to report verbally first; then write it up immediately</li>
          </ul>
        </div>

        {/* Section 1 — The Importance of Prompt Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Importance of Prompt Reporting
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Faults must always be reported as soon as they are identified. Even something that appears minor — such as a socket faceplate showing slight discolouration — could indicate overheating and become a fire risk if ignored. Prompt reporting ensures that faults are addressed before they escalate.</p>
            <p>Delay not only increases risk but can also place legal responsibility on the electrician who noticed the problem but failed to act. Under the Electricity at Work Regulations 1989, all persons have a duty to prevent danger. If you observe a fault and fail to report it, you could be held liable for any resulting injury or damage.</p>
            <p><strong>Examples of faults requiring immediate reporting:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Damaged cables or conductors exposing live parts</li>
              <li>Socket outlets showing signs of overheating (scorching, discolouration)</li>
              <li>Loose connections causing arcing or sparking</li>
              <li>RCD tripping repeatedly without obvious cause</li>
              <li>Insulation resistance readings below acceptable limits</li>
              <li>Earth fault loop impedance values exceeding maximum permitted</li>
              <li>Missing or damaged protective barriers</li>
            </ul>
            <p>Remember: what appears minor today could become a major incident tomorrow. Professional electricians report everything, no matter how insignificant it may seem.</p>
          </div>
        </section>

        <InlineCheck
          id="reporting-delay"
          question="Why is it dangerous to delay reporting even a minor-looking fault?"
          options={["It's often fine to wait if you're busy", "Minor defects never escalate", "Small defects can indicate serious risks and may escalate, creating safety and legal issues", "Reporting is optional for apprentices"]}
          correctIndex={2}
          explanation="Even minor signs (e.g., discoloration) can signal overheating; delay increases risk and liability."
        />

        {/* Section 2 — Identifying the Correct Person to Report To */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Identifying the Correct Person to Report To
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>It is not enough to notice a fault; the electrician must know who to report it to. The reporting structure depends on the type of installation and work environment. Clear understanding of the chain of responsibility prevents delays and ensures accountability.</p>
            <p><strong>Common reporting structures:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Construction sites:</strong> Site supervisor, site manager, or electrical contractor</li>
              <li><strong>Commercial premises:</strong> Facilities manager, building services manager, or appointed duty holder</li>
              <li><strong>Rental properties:</strong> Landlord, letting agent, or property management company</li>
              <li><strong>Industrial facilities:</strong> Maintenance manager, plant engineer, or safety officer</li>
              <li><strong>Public buildings:</strong> Estates manager, technical services, or designated responsible person</li>
            </ul>
            <p>If unsure who to report to, ask your immediate supervisor. Never assume someone else will handle it. The duty holder is the person with legal responsibility for electrical safety in that particular premises or installation.</p>
            <p><strong>Key principle:</strong> Report upwards in the hierarchy. An apprentice reports to their supervisor, who may then escalate to the duty holder or client as appropriate.</p>
          </div>
        </section>

        <InlineCheck
          id="duty-holder"
          question="Who is considered the duty holder in an industrial site with a facilities management team?"
          options={["The newest apprentice", "The facilities manager or appointed responsible person", "Any employee on site", "The equipment manufacturer"]}
          correctIndex={1}
          explanation="Duty holders are appointed persons (often FM/estates manager) responsible for electrical safety."
        />

        {/* Section 3 — Communicating Clearly and Professionally */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Communicating Clearly and Professionally
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Reports must be factual, specific, and free from vague or casual language. Professional communication ensures the fault is understood correctly and action can be taken promptly.</p>
            <p><strong>Avoid vague language:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>"The socket's dodgy" ❌</li>
              <li>"Something's not right" ❌</li>
              <li>"It looks a bit iffy" ❌</li>
              <li>"There's a problem somewhere" ❌</li>
            </ul>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 my-4">
              <p className="text-white font-medium mb-2">Example professional report:</p>
              <p className="text-white/80 text-sm">"Circuit 2 (ring final) — socket in living room shows signs of overheating at the neutral terminal. Circuit isolated and labelled 'DO NOT USE'. Requires investigation and repair by competent electrician before re-energising."</p>
            </div>
            <p><strong>Essential elements of clear reporting:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Circuit identification (number, type, board reference)</li>
              <li>Exact location (room, floor, building section)</li>
              <li>Specific observation (what you saw, measured, or detected)</li>
              <li>Action taken (isolated, labelled, made safe)</li>
              <li>Recommendation (further investigation, immediate repair, replacement)</li>
            </ul>
            <p>Both verbal and written reporting are important: verbal provides immediate communication, written creates a permanent record for legal compliance and future reference.</p>
          </div>
        </section>

        <InlineCheck
          id="unprofessional-language"
          question={`Why is "circuit's a bit dodgy" an unprofessional way to report a fault?`}
          options={["It's too short but perfectly clear", "It's informal, vague, and lacks specifics (location, circuit, condition, action)", "It includes too much technical detail", "It always implies the wrong circuit"]}
          correctIndex={1}
          explanation="Reports must be factual, specific, and actionable."
        />

        {/* Section 4 — Documenting and Transferring Responsibility */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documenting and Transferring Responsibility
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Accurate documentation ensures that responsibility for the fault is formally passed to the supervisor or duty holder. This protects the apprentice legally and ensures no fault goes unaddressed.</p>
            <p><strong>Essential documentation requirements:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Date and time:</strong> When the fault was discovered</li>
              <li><strong>Location:</strong> Precise details (building, floor, room, specific equipment)</li>
              <li><strong>Circuit reference:</strong> Board designation and circuit number</li>
              <li><strong>Fault description:</strong> What was observed or measured</li>
              <li><strong>Action taken:</strong> Isolation, labelling, making safe</li>
              <li><strong>Who reported to:</strong> Name and position of person notified</li>
              <li><strong>Signature:</strong> Your name and signature</li>
              <li><strong>Recommendation:</strong> Required follow-up action</li>
            </ul>
            <p><strong>Documentation methods:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Formal fault report forms</li>
              <li>Site diary entries</li>
              <li>Test sheet annotations</li>
              <li>Digital reporting systems</li>
              <li>Email notifications with read receipts</li>
            </ul>
            <p><strong>Legal protection:</strong> Proper documentation demonstrates that you fulfilled your duty of care under the Electricity at Work Regulations 1989. It transfers responsibility to the appropriate person while protecting you from potential liability.</p>
            <p><strong>Important:</strong> Once reported, apprentices must not attempt to rectify faults unless specifically authorised and competent to do so. Follow your supervisor's instructions and company procedures.</p>
          </div>
        </section>

        <InlineCheck
          id="documentation-requirements"
          question="What information should always be included when documenting a reported fault?"
          options={["Only a brief 'fault exists'", "Fault details, exact location, circuit/board IDs, action taken, further work required, date/time, who it was reported to", "Just the client's name and your initials", "A photo instead of written notes"]}
          correctIndex={1}
          explanation="Comprehensive, traceable records formally transfer responsibility and protect all parties."
        />

        {/* Step-by-Step Reporting Process */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Step-by-Step Reporting Process
          </h2>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <ol className="space-y-2 text-white/80 text-sm">
              <li><strong>1. Make Safe:</strong> Isolate circuits if dangerous, apply locks/labels, prevent access to live parts</li>
              <li><strong>2. Assess Urgency:</strong> Determine if immediate evacuation or emergency services are needed</li>
              <li><strong>3. Gather Information:</strong> Note circuit references, exact location, what you observed</li>
              <li><strong>4. Report Verbally:</strong> Contact supervisor/duty holder immediately by phone or in person</li>
              <li><strong>5. Document in Writing:</strong> Complete formal report using company procedures</li>
              <li><strong>6. Follow Up:</strong> Ensure your report was received and action is being taken</li>
            </ol>
          </div>
        </section>

        {/* Real-World Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real-World Applications
          </h2>
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <h4 className="font-semibold text-red-400 mb-3">Poor Practice</h4>
              <p className="text-white/80 text-sm mb-3">
                On a commercial refurbishment project, an apprentice noticed scorching on a socket but only mentioned it casually to another colleague. Because it was not formally reported, no action was taken. Weeks later, the socket overheated and caused a small fire. Investigators found the defect had been observed earlier but not reported, leading to reputational and financial damage for the contractor.
              </p>
              <p className="text-white/60 text-xs"><strong>Key Issues:</strong> No formal reporting, no documentation, no responsibility transfer</p>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
              <h4 className="font-semibold text-green-400 mb-3">Good Practice</h4>
              <p className="text-white/80 text-sm mb-3">
                An apprentice testing a school installation recorded an insulation resistance reading below the required 1 MΩ. He immediately informed his supervisor, who isolated the circuit, documented the fault, and arranged for it to be rectified before handover. This prevented the energisation of a dangerous circuit and demonstrated the value of prompt, professional reporting.
              </p>
              <p className="text-white/60 text-xs"><strong>Key Strengths:</strong> Prompt escalation, immediate isolation, clear documentation, safe outcome</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                <p className="text-sm text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-10">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h2 className="font-semibold text-white mb-3">Key Takeaways</h2>
            <ul className="text-white/80 space-y-2 text-sm">
              <li>• Report faults immediately — small signs can indicate serious risk</li>
              <li>• Always report to the correct person (supervisor/duty holder) and transfer responsibility</li>
              <li>• Use clear, factual language with circuit/board IDs, location, and action taken</li>
              <li>• Document both verbal and written reporting for traceability and compliance (BS 7671, EAWR 1989)</li>
              <li>• Do not attempt repairs beyond your competence or without authorisation</li>
            </ul>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} title="Reporting Faults to Supervisors or Duty Holders" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 min-h-[48px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Recording Observations
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../6-3">
              Next: Temporary Isolation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
