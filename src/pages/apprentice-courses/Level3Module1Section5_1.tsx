import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Under RIDDOR, within what timeframe must a fatal or specified injury be reported to the HSE?",
    options: [
      "Within 24 hours",
      "Without delay (immediately)",
      "Within 7 days",
      "Within 10 days"
    ],
    correctIndex: 1,
    explanation: "Fatal accidents and specified injuries must be reported without delay - immediately by phone to the HSE. A written report must follow within 10 days."
  },
  {
    id: "check-2",
    question: "Which of the following is classified as a 'specified injury' under RIDDOR?",
    options: [
      "A minor cut requiring first aid",
      "A fracture other than to fingers, thumbs or toes",
      "Any injury requiring hospital treatment",
      "A bruise from a minor fall"
    ],
    correctIndex: 1,
    explanation: "Specified injuries include fractures (other than fingers, thumbs, or toes), amputations, serious burns, loss of consciousness, and injuries requiring hospital admission for more than 24 hours."
  },
  {
    id: "check-3",
    question: "What is the purpose of maintaining an accident book under the Social Security (Claims and Payments) Regulations 1979?",
    options: [
      "To provide evidence for disciplinary action",
      "To record incidents for potential personal injury claims and benefit applications",
      "To satisfy insurance company requirements only",
      "To calculate bonus payments"
    ],
    correctIndex: 1,
    explanation: "The accident book provides a legal record that can support personal injury claims and industrial injuries benefit applications. It protects both employers and employees."
  },
  {
    id: "check-4",
    question: "Who is responsible for reporting a RIDDOR incident involving a contractor's employee on site?",
    options: [
      "The injured person themselves",
      "The contractor who employs the injured person",
      "The principal contractor or site controller",
      "The Health and Safety Executive"
    ],
    correctIndex: 1,
    explanation: "The employer of the injured person is responsible for RIDDOR reporting. If you are employed by an electrical contractor and injured on site, your employer must report it."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does RIDDOR stand for?",
    options: [
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "Recording of Industrial Dangers and Daily Occurrence Reports",
      "Regulation of Industrial Disease Detection and Occupational Risks",
      "Rules for Investigating Dangerous and Deadly Occupational Risks"
    ],
    correctAnswer: 0,
    explanation: "RIDDOR stands for Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. These regulations require employers to report certain workplace incidents to the HSE."
  },
  {
    id: 2,
    question: "An electrician receives an electric shock that causes them to lose consciousness briefly. Under RIDDOR, this is classified as:",
    options: [
      "A minor incident - no reporting required",
      "A specified injury - must be reported immediately",
      "An over-7-day injury - report within 15 days",
      "A dangerous occurrence only"
    ],
    correctAnswer: 1,
    explanation: "Loss of consciousness is a specified injury under RIDDOR and must be reported without delay. Electric shock causing loss of consciousness is also reportable as a dangerous occurrence."
  },
  {
    id: 3,
    question: "If a worker is incapacitated for over 7 days (not counting the day of accident), when must this be reported to HSE?",
    options: [
      "Immediately",
      "Within 7 days",
      "Within 15 days",
      "Within 30 days"
    ],
    correctAnswer: 2,
    explanation: "Over-7-day incapacitation injuries must be reported within 15 days of the incident. The 7 days does not include the day of the accident but includes non-working days."
  },
  {
    id: 4,
    question: "Which of the following electrical incidents must be reported as a dangerous occurrence under RIDDOR?",
    options: [
      "A minor electric shock with no injury",
      "An electrical short circuit causing a small fire that was extinguished",
      "Electrical short circuit or overload causing fire or explosion",
      "Finding a faulty socket outlet"
    ],
    correctAnswer: 2,
    explanation: "Electrical short circuit or overload causing fire or explosion is a reportable dangerous occurrence under RIDDOR, even if no one was injured. This applies to incidents that could have caused specified injuries."
  },
  {
    id: 5,
    question: "What information must be included in an accident book entry?",
    options: [
      "Name and signature of the injured person only",
      "Date, time, location, nature of injury, and circumstances of incident",
      "Only the date and a brief description",
      "The cost of treatment and time off work"
    ],
    correctAnswer: 1,
    explanation: "Accident book entries must include: date and time, location, name and occupation of injured person, nature of injury, brief circumstances, and signature. This creates a comprehensive record."
  },
  {
    id: 6,
    question: "Under GDPR, how must accident book records be handled?",
    options: [
      "They can be openly displayed for all to see",
      "Individual entries must be removable to protect personal data",
      "They must be destroyed after one week",
      "They can only be kept electronically"
    ],
    correctAnswer: 1,
    explanation: "The Data Protection Act 2018 (GDPR) requires that personal data in accident books be protected. Modern accident books have tear-out pages or individual forms so records can be stored securely."
  },
  {
    id: 7,
    question: "What is the purpose of an accident investigation?",
    options: [
      "To find someone to blame",
      "To identify root causes and prevent recurrence",
      "To prepare for legal action",
      "To reduce insurance premiums"
    ],
    correctAnswer: 1,
    explanation: "The primary purpose of accident investigation is to identify root causes and implement measures to prevent similar incidents. It is about learning and improvement, not blame."
  },
  {
    id: 8,
    question: "How long must employers keep records of RIDDOR reportable incidents?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 1,
    explanation: "Employers must keep records of RIDDOR reportable incidents for at least 3 years from the date of the incident. This can be the RIDDOR report itself or equivalent records."
  },
  {
    id: 9,
    question: "Which occupational disease must be reported under RIDDOR if diagnosed in an electrician?",
    options: [
      "Common cold",
      "Carpal tunnel syndrome from vibrating tool use",
      "Hay fever",
      "Back pain from sitting"
    ],
    correctAnswer: 1,
    explanation: "Carpal tunnel syndrome caused by work involving hand-held vibrating tools is a reportable occupational disease under RIDDOR. The diagnosis must be made by a doctor."
  },
  {
    id: 10,
    question: "What does the term 'near miss' mean in safety reporting?",
    options: [
      "An accident that happened nearby",
      "An incident that could have caused injury but did not",
      "When two workers almost collide",
      "A minor injury that almost needed first aid"
    ],
    correctAnswer: 1,
    explanation: "A near miss is an unplanned event that did not result in injury or damage but had the potential to do so. Reporting near misses helps identify hazards before accidents occur."
  },
  {
    id: 11,
    question: "Who can access information in the accident book about your workplace injury?",
    options: [
      "Anyone who works at the company",
      "Only the injured person, their employer, and relevant authorities",
      "All visitors to the site",
      "Insurance companies without permission"
    ],
    correctAnswer: 1,
    explanation: "Access to accident records is restricted under GDPR. Only the injured person, their employer (for legitimate purposes), safety representatives, and relevant enforcement authorities should have access."
  },
  {
    id: 12,
    question: "An apprentice suffers a burn from a faulty piece of equipment. Who should record this in the accident book?",
    options: [
      "The apprentice themselves if able",
      "The site manager only",
      "The first aider only",
      "The equipment manufacturer"
    ],
    correctAnswer: 0,
    explanation: "Ideally, the injured person should complete the accident book entry themselves. If they cannot (due to injury severity), their supervisor or another witness should complete it on their behalf."
  }
];

const faqs = [
  {
    question: "Do I have to report every small cut or bruise?",
    answer: "No. Minor injuries that only require first aid (plasters, minor burns treatment, etc.) do not need to be reported to the HSE under RIDDOR. However, they SHOULD be recorded in your company's accident book as this creates a record if complications develop later and may reveal patterns indicating hazards."
  },
  {
    question: "What happens if my employer fails to report a RIDDOR incident?",
    answer: "Failure to report RIDDOR incidents is a criminal offence. The HSE can prosecute employers who fail to report, with unlimited fines possible. If you believe an incident should have been reported and wasn't, you can contact the HSE directly or speak to a safety representative."
  },
  {
    question: "Can I be disciplined for reporting an accident?",
    answer: "No. It is illegal for employers to penalise workers for reporting accidents or raising safety concerns. This protection extends to making RIDDOR reports. If you face disciplinary action for legitimate safety reporting, seek advice from your union or ACAS."
  },
  {
    question: "How do I report a RIDDOR incident?",
    answer: "RIDDOR incidents are reported online via the HSE website (www.hse.gov.uk/riddor). Fatal and specified injuries must first be reported by phone to the HSE Incident Contact Centre. Your employer is responsible for making the report, not you as an individual worker."
  },
  {
    question: "What if I'm injured working on someone else's site?",
    answer: "Your employer (the electrical contractor) is responsible for RIDDOR reporting, not the site owner or principal contractor. However, the site controller should be informed, and they may need to report if the incident relates to their premises or operations."
  }
];

const Level3Module1Section5_1 = () => {
  useSEO(
    "5.1 Accident & Incident Reporting - Level 3 Health & Safety",
    "RIDDOR requirements, accident book procedures, and formal reporting of workplace accidents in the UK electrical industry"
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
          <span className="font-bold text-black text-lg">5.1 Accident & Incident Reporting</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-gray-200">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Accident & Incident Reporting
          </h1>
          <p className="text-lg text-gray-300">
            Understanding your legal obligations for reporting workplace accidents, incidents, and dangerous occurrences.
          </p>
        </header>

        {/* Quick Summary Box */}
        <div className="bg-[#222] border-l-4 border-elec-yellow rounded p-5 mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2 text-elec-yellow mb-2">
            <Zap className="h-5 w-5" /> Quick Summary
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>RIDDOR 2013 requires reporting of serious injuries, diseases, and dangerous occurrences to HSE</li>
            <li>Fatal and specified injuries must be reported without delay (immediately)</li>
            <li>Over-7-day injuries must be reported within 15 days</li>
            <li>All workplace accidents should be recorded in the accident book</li>
            <li>Accident records must be kept for at least 3 years</li>
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
              <span>Explain the requirements of RIDDOR 2013 for accident reporting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">2.</span>
              <span>Identify which incidents require immediate reporting vs delayed reporting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">3.</span>
              <span>Complete accident book entries correctly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">4.</span>
              <span>Understand the purpose and process of accident investigation</span>
            </li>
          </ul>
        </div>

        {/* Section 01: RIDDOR Requirements */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">1</span>
            RIDDOR 2013 Requirements
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              The <strong className="text-white">Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR)</strong> places legal duties on employers, the self-employed, and people in control of work premises to report certain serious workplace incidents to the Health and Safety Executive (HSE).
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Why RIDDOR Exists:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Enables the HSE to identify patterns and trends in workplace injuries</li>
                <li>Allows investigation of serious incidents to prevent recurrence</li>
                <li>Provides data for developing safety legislation and guidance</li>
                <li>Creates accountability for workplace safety</li>
              </ul>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Who Must Report?</h4>
            <p>The 'responsible person' for RIDDOR reporting is:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Employers:</strong> For incidents involving their employees</li>
              <li><strong>Self-employed people:</strong> For incidents arising from their work</li>
              <li><strong>People in control of premises:</strong> For incidents to others (including members of public)</li>
            </ul>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Electrical Industry Note</p>
              <p className="text-sm">As an electrician, your employer is responsible for RIDDOR reporting if you are injured at work. However, you must ensure they are informed of any reportable incident. If self-employed, you are responsible for your own reporting.</p>
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

        {/* Section 02: Reportable Incidents */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">2</span>
            Reportable Incidents Under RIDDOR
          </h2>

          <div className="space-y-4 text-gray-300">
            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">1. Deaths and Specified Injuries (Report Immediately)</h4>
              <p className="text-sm mb-3">Must be reported by telephone without delay, followed by online report within 10 days.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-elec-yellow">Specified Injuries Include:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Fractures (except fingers, thumbs, toes)</li>
                    <li>Amputations</li>
                    <li>Permanent loss of sight or reduction in sight</li>
                    <li>Crush injuries to head or torso</li>
                    <li>Serious burns covering more than 10% of body</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Also Includes:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Scalping requiring hospital treatment</li>
                    <li>Loss of consciousness from head injury or asphyxia</li>
                    <li>Hypothermia or heat-induced illness requiring resuscitation</li>
                    <li>Any injury requiring hospital admission for 24+ hours</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">2. Over-7-Day Incapacitation (Report Within 15 Days)</h4>
              <p className="text-sm">Any injury (not a specified injury) that causes incapacitation for more than 7 consecutive days. The day of the accident does not count, but weekends and rest days do count toward the 7 days.</p>
            </div>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">3. Dangerous Occurrences (Report Immediately)</h4>
              <p className="text-sm mb-3">Near-miss events with potential to cause death or serious injury. Electrical examples:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Electrical short circuit or overload causing fire or explosion</li>
                <li>Accidental release of electrical energy causing fire</li>
                <li>Unintentional explosion or fire</li>
                <li>Collapse or partial collapse of any structure</li>
                <li>Equipment coming into contact with overhead power lines</li>
              </ul>
            </div>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">4. Occupational Diseases (Report When Diagnosed)</h4>
              <p className="text-sm mb-3">Reportable when a doctor diagnoses and the worker's job involves specific activities:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Carpal tunnel syndrome - from vibrating tool use</li>
                <li>Hand-arm vibration syndrome (HAVS) - from vibrating tools</li>
                <li>Occupational dermatitis - from skin contact with harmful substances</li>
                <li>Occupational asthma - from certain dust or fume exposure</li>
                <li>Tendonitis/tenosynovitis - from frequent repetitive movements</li>
              </ul>
            </div>

            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-red-400 mb-2">Electric Shock Reporting</p>
              <p className="text-sm">Electric shocks that cause loss of consciousness must be reported as specified injuries. Electric shock causing burn injury requiring medical treatment or incapacitation for over 7 days must also be reported. Any electrical short circuit causing fire or explosion is a dangerous occurrence.</p>
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

        {/* Section 03: The Accident Book */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">3</span>
            The Accident Book
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Under the <strong className="text-white">Social Security (Claims and Payments) Regulations 1979</strong>, employers with 10 or more employees must maintain an accident book. However, good practice dictates that ALL employers should keep accident records.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Information Required in Accident Book Entry:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Date and time of incident</li>
                    <li>Location where accident occurred</li>
                    <li>Name of injured person</li>
                    <li>Occupation/job title</li>
                    <li>Nature of injury/illness</li>
                  </ul>
                </div>
                <div>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Brief description of circumstances</li>
                    <li>First aid treatment given</li>
                    <li>Signature of person making entry</li>
                    <li>Witness details (if applicable)</li>
                    <li>Actions taken</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Why Record ALL Incidents?</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Legal evidence:</strong> Creates record for personal injury claims</li>
              <li><strong>Benefits claims:</strong> Supports industrial injuries benefit applications</li>
              <li><strong>Pattern identification:</strong> Reveals trends that indicate hazards</li>
              <li><strong>Delayed effects:</strong> Some injuries develop complications later</li>
              <li><strong>Insurance:</strong> Provides evidence for employer liability insurance</li>
            </ul>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-blue-400 mb-2">Data Protection (GDPR) Requirements</p>
              <p className="text-sm">Accident books must comply with GDPR. Modern books use detachable pages that can be removed and stored securely. Personal information must not be visible to others. Electronic records must have appropriate access controls.</p>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Record Retention:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>RIDDOR records: Minimum 3 years</li>
              <li>Accident book entries: Recommended 3 years minimum, 6+ years for claims purposes</li>
              <li>Records involving minors: Keep until they reach age 21 + 3 years</li>
            </ul>
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

        {/* Section 04: Accident Investigation */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">4</span>
            Accident Investigation
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Accident investigation is about <strong className="text-white">learning and prevention</strong>, not blame. Understanding why incidents occur helps prevent recurrence and protects future workers.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Steps in Accident Investigation:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Secure the scene</strong> - Prevent further injury, preserve evidence</li>
                <li><strong>Gather information</strong> - Take photographs, measurements, witness statements</li>
                <li><strong>Interview witnesses</strong> - Separately, as soon as practical after incident</li>
                <li><strong>Examine equipment</strong> - Check for defects, damage, or improper use</li>
                <li><strong>Identify root causes</strong> - Look beyond immediate causes to underlying factors</li>
                <li><strong>Develop recommendations</strong> - Practical measures to prevent recurrence</li>
                <li><strong>Implement and monitor</strong> - Action recommendations and check effectiveness</li>
              </ol>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Root Cause Analysis:</h4>
            <p>Accidents rarely have a single cause. Investigation should identify:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Immediate causes:</strong> The direct reason (e.g., touched live conductor)</li>
              <li><strong>Underlying causes:</strong> Why immediate cause occurred (e.g., isolation failure)</li>
              <li><strong>Root causes:</strong> System failures allowing hazard (e.g., inadequate training, no permit system)</li>
            </ul>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Example: Electric Shock Investigation</p>
              <p className="text-sm">
                <strong>Immediate cause:</strong> Apprentice touched live busbar<br />
                <strong>Underlying cause:</strong> Panel not isolated before work started<br />
                <strong>Root causes:</strong> No lock-out/tag-out procedure, inadequate supervision, training did not cover isolation requirements
              </p>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Your Role in Investigation:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Cooperate fully with investigators</li>
              <li>Provide honest, accurate accounts of what happened</li>
              <li>Do not disturb evidence unless safety requires it</li>
              <li>Report any additional information you remember later</li>
              <li>Participate constructively in developing improvements</li>
            </ul>
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
            <h4 className="font-semibold text-white mb-3">What To Do After an Accident:</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                <span><strong>Get treatment:</strong> First aid or medical attention as needed</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                <span><strong>Report immediately:</strong> Inform your supervisor/employer</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                <span><strong>Complete accident book:</strong> Record details while fresh in memory</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">4.</span>
                <span><strong>Preserve evidence:</strong> Don't clear up until authorised</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">5.</span>
                <span><strong>Get witness details:</strong> Names and contact information</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">6.</span>
                <span><strong>Take photographs:</strong> If safe to do so</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">7.</span>
                <span><strong>Check RIDDOR:</strong> Ensure employer reports if required</span>
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
                <p className="font-semibold text-white mb-2">RIDDOR Reporting Timeframes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Deaths/specified injuries: Immediate (phone)</li>
                  <li>Written follow-up: Within 10 days</li>
                  <li>Over-7-day injuries: Within 15 days</li>
                  <li>Dangerous occurrences: Immediate</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Key Contacts:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>HSE Incident Centre: 0345 300 9923</li>
                  <li>Online reporting: www.hse.gov.uk/riddor</li>
                  <li>Record retention: 3 years minimum</li>
                  <li>Accident book: BI 510 (HSE format)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Section 5.1 Knowledge Check"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 bg-[#333] border-gray-700 hover:bg-gray-700 text-white">
              <ArrowLeft className="h-4 w-4" /> Back to Section 5
            </Button>
          </Link>
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-2">
            <Button className="w-full sm:w-auto flex items-center gap-2 bg-elec-yellow hover:bg-elec-yellow text-black font-semibold">
              Next: 5.2 Near-Miss Reporting <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Level3Module1Section5_1;
