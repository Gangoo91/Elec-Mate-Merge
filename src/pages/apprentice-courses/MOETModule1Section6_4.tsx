import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Reporting Incidents, Accidents and Near Misses - MOET Module 1 Section 6.4";
const DESCRIPTION = "Comprehensive guide to incident reporting for electrical maintenance technicians: RIDDOR 2013, reportable injuries, dangerous occurrences, near-miss reporting, accident investigation, accident book requirements and data protection.";

const quickCheckQuestions = [
  {
    id: "riddor-reporting",
    question: "Under RIDDOR 2013, which of the following must be reported to the HSE?",
    options: [
      "A minor cut that is treated with a plaster from the first aid kit",
      "A worker receiving an electric shock that results in them being taken to hospital for treatment",
      "A worker who feels dizzy but recovers after sitting down for 10 minutes",
      "A bruised knee from bumping into a desk"
    ],
    correctIndex: 1,
    explanation: "Under RIDDOR 2013, injuries that result in a worker being taken to hospital for treatment (not just examination) are reportable as 'over-7-day incapacitation' or 'specified injuries' depending on the nature. Electric shock causing hospital attendance is a reportable injury. Minor first-aid-only injuries do not need to be reported to the HSE but must be recorded in the accident book."
  },
  {
    id: "near-miss-importance",
    question: "Why is it important to report near misses, even though no injury occurred?",
    options: [
      "Because the HSE requires all near misses to be reported externally",
      "Because near misses indicate hazards that could cause serious injury next time — they are warnings",
      "Because insurance companies offer discounts for near-miss reporting",
      "Because near misses are the same as accidents legally"
    ],
    correctIndex: 1,
    explanation: "Near misses are valuable warning signs — they identify hazards and unsafe conditions before anyone is hurt. For every serious accident, there are typically many near misses. Reporting and investigating near misses allows organisations to identify root causes and implement corrective actions before a serious incident occurs. This is the foundation of proactive safety management."
  },
  {
    id: "accident-investigation",
    question: "The primary purpose of an accident investigation is to:",
    options: [
      "Identify which individual was to blame and take disciplinary action",
      "Identify the root causes and implement corrective actions to prevent recurrence",
      "Complete the paperwork required by the insurance company",
      "Prepare a legal defence in case of prosecution"
    ],
    correctIndex: 1,
    explanation: "The primary purpose of accident investigation is to identify root causes (the underlying failures in systems, procedures or management that allowed the accident to happen) and implement corrective actions to prevent recurrence. It is NOT about blame — a blame culture discourages reporting and prevents organisations from learning. The focus must be on why, not who."
  },
  {
    id: "reporting-timeframe",
    question: "Under RIDDOR 2013, a death or specified injury must be reported to the HSE:",
    options: [
      "Within 15 days, by online form only",
      "Without delay, by the quickest practicable means (telephone for fatal/specified, followed by online form within 10 days)",
      "Within 30 days, by written letter",
      "Within 24 hours, by email to the local HSE office"
    ],
    correctIndex: 1,
    explanation: "Deaths and specified injuries must be reported without delay by the quickest practicable means — in practice, this means telephoning the HSE Incident Contact Centre on 0345 300 9923 immediately. A written report (Form F2508 online) must then be submitted within 10 days. Over-7-day incapacitation injuries must be reported within 15 days."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "RIDDOR 2013 stands for:",
    options: [
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013",
      "Recording of Incidents, Diseases and Dangerous Operations Regulations 2013",
      "Regulation of Industrial Diseases, Disorders and Occupational Risks 2013",
      "Reporting of Industrial Damage and Dangerous Operational Risks 2013"
    ],
    correctAnswer: 0,
    explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. These regulations require employers, the self-employed and those in control of premises to report certain work-related injuries, diseases and dangerous occurrences to the HSE."
  },
  {
    id: 2,
    question: "Which of the following is a 'specified injury' under RIDDOR 2013?",
    options: [
      "A minor burn treated with cold water and a dressing",
      "A fracture other than to fingers, thumbs and toes",
      "A headache caused by working near a noisy generator",
      "A strain from lifting a heavy cable drum"
    ],
    correctAnswer: 1,
    explanation: "Specified injuries under RIDDOR include: fractures (other than to fingers, thumbs and toes), amputations, permanent loss of sight, crush injuries, scalping, burns covering more than 10% of the body, loss of consciousness caused by head injury or asphyxia, and any injury requiring admittance to hospital for more than 24 hours."
  },
  {
    id: 3,
    question: "An electrical short circuit that causes a fire in a distribution board is reportable under RIDDOR as:",
    options: [
      "A minor incident — no report needed",
      "A dangerous occurrence",
      "An occupational disease",
      "A specified injury"
    ],
    correctAnswer: 1,
    explanation: "An electrical short circuit or overload accompanied by fire or explosion is classified as a dangerous occurrence under RIDDOR 2013 and must be reported to the HSE. This applies even if no one was injured — dangerous occurrences are events with the potential to cause serious harm."
  },
  {
    id: 4,
    question: "Over-7-day incapacitation injuries must be reported to the HSE within:",
    options: [
      "24 hours",
      "10 days",
      "15 days of the accident",
      "30 days"
    ],
    correctAnswer: 2,
    explanation: "If a worker is incapacitated for more than 7 consecutive days (not counting the day of the accident) as a result of a work-related injury, the employer must report this to the HSE within 15 days of the accident. The report is submitted online using Form F2508."
  },
  {
    id: 5,
    question: "The accident book (BI 510) must include which of the following?",
    options: [
      "Only serious accidents that result in hospital treatment",
      "All work-related accidents, injuries, diseases and dangerous occurrences, however minor",
      "Only accidents reported to the HSE under RIDDOR",
      "Only accidents involving electrical hazards"
    ],
    correctAnswer: 1,
    explanation: "The accident book must record ALL work-related accidents, injuries, diseases and dangerous occurrences, no matter how minor. This provides a complete record for trend analysis, legal evidence, insurance purposes and RIDDOR compliance. Even minor first-aid-only incidents should be recorded."
  },
  {
    id: 6,
    question: "Under GDPR and the Data Protection Act 2018, accident book entries must:",
    options: [
      "Be displayed on the staff noticeboard for everyone to see",
      "Be individually removable so other employees cannot access personal data",
      "Be written in code to protect identity",
      "Only record the date and time, not personal details"
    ],
    correctAnswer: 1,
    explanation: "Modern accident books (BI 510) use individually removable pages or sealed pockets so that each entry can be separated — preventing other employees from seeing personal details of previous entries. This complies with GDPR and the Data Protection Act 2018. Electronic reporting systems must also restrict access appropriately."
  },
  {
    id: 7,
    question: "The 'safety triangle' (Heinrich's Triangle) suggests that for every serious accident, there are approximately:",
    options: [
      "10 minor injuries and 100 near misses",
      "29 minor injuries and 300 near misses/unsafe acts",
      "5 minor injuries and 50 near misses",
      "100 minor injuries and 1000 near misses"
    ],
    correctAnswer: 1,
    explanation: "Heinrich's Triangle (also known as the safety triangle or accident pyramid) suggests a ratio of 1 serious injury : 29 minor injuries : 300 near misses/unsafe acts. This illustrates why near-miss reporting is so important — by addressing the large number of near misses at the base of the triangle, you can prevent the serious incidents at the top."
  },
  {
    id: 8,
    question: "During an accident investigation, the first step should be to:",
    options: [
      "Interview the injured person before they forget what happened",
      "Make the area safe and preserve the scene as evidence",
      "Write the RIDDOR report and submit it to the HSE",
      "Identify who was responsible and suspend them"
    ],
    correctAnswer: 1,
    explanation: "The first priority is always to make the area safe (prevent further injuries) and preserve the scene as evidence. Do not disturb equipment, move tools or clean up until the investigation team has documented the scene. Take photographs, make sketches, and secure any physical evidence. Then proceed to interview witnesses while memories are fresh."
  },
  {
    id: 9,
    question: "Root cause analysis in accident investigation aims to identify:",
    options: [
      "The person who made the final error that caused the accident",
      "The underlying systemic failures (management, procedures, training, design) that allowed the accident chain to develop",
      "The cost of the damage caused by the accident",
      "The insurance liability for the incident"
    ],
    correctAnswer: 1,
    explanation: "Root cause analysis looks beyond the immediate cause (the final action or event) to identify the underlying systemic failures — inadequate procedures, insufficient training, poor design, management failures, inadequate supervision, or organisational culture issues. Addressing root causes prevents recurrence; addressing only the immediate cause often just moves the problem."
  },
  {
    id: 10,
    question: "A near miss during electrical maintenance work (e.g., touching a conductor that turned out to be dead, but could have been live) should be:",
    options: [
      "Ignored — nothing happened, so there is nothing to report",
      "Mentioned casually to colleagues at break time but not formally recorded",
      "Reported through the company's near-miss reporting system and investigated to identify the failure",
      "Reported directly to the HSE under RIDDOR"
    ],
    correctAnswer: 2,
    explanation: "All near misses should be reported through the company's internal near-miss reporting system. This near miss indicates a failure in the isolation or proving dead procedure that could result in a fatal electric shock next time. Investigation should identify why the conductor was not properly verified and implement corrective actions. Near misses are not reportable to the HSE under RIDDOR unless they fall under the 'dangerous occurrence' categories."
  },
  {
    id: 11,
    question: "Which of the following is an occupational disease reportable under RIDDOR?",
    options: [
      "The common cold caught from a colleague",
      "Carpal tunnel syndrome caused by repetitive use of vibrating tools",
      "A headache from working in a warm room",
      "Tiredness from working overtime"
    ],
    correctAnswer: 1,
    explanation: "Carpal tunnel syndrome is a reportable occupational disease under RIDDOR when it is caused by work involving the use of vibrating tools. Other reportable occupational diseases include occupational dermatitis, occupational asthma, hand-arm vibration syndrome (HAVS), and diseases associated with exposure to biological agents. The employer must report when they receive a diagnosis from a doctor."
  },
  {
    id: 12,
    question: "Who is responsible for reporting a RIDDOR-reportable incident to the HSE?",
    options: [
      "The injured person",
      "The employer (or self-employed person, or person in control of the premises)",
      "Any witness to the incident",
      "The first aider who treated the injury"
    ],
    correctAnswer: 1,
    explanation: "The duty to report under RIDDOR falls on the employer, the self-employed person (if they are injured), or the person in control of the premises where the incident occurred. In practice, this is usually the employer's health and safety manager or a designated responsible person. The injured person should report the accident internally but is not responsible for the RIDDOR notification."
  }
];

const faqs = [
  {
    question: "What is the difference between an accident, an incident and a near miss?",
    answer: "An accident is an unplanned event that results in injury, ill health or damage. An incident is a broader term covering accidents, near misses and dangerous occurrences — essentially any unplanned event that could have or did cause harm. A near miss is an event that could have caused injury or damage but did not — for example, a dropped tool that narrowly missed someone. All three should be reported and recorded internally; RIDDOR only applies to specific categories of accidents and dangerous occurrences."
  },
  {
    question: "Do I have to report a minor electric shock that did not result in hospital treatment?",
    answer: "A minor electric shock that is treated on site with first aid only does not need to be reported to the HSE under RIDDOR. However, it MUST be recorded in the company accident book, reported to your supervisor, and investigated internally to identify the cause and prevent recurrence. If the shock results in the worker being taken to hospital for treatment (not just precautionary examination), or if it causes incapacitation for more than 7 days, it becomes RIDDOR-reportable."
  },
  {
    question: "How do I report an incident to the HSE under RIDDOR?",
    answer: "RIDDOR reports are submitted online at www.hse.gov.uk/riddor using the appropriate form (F2508 for injuries and dangerous occurrences, F2508A for diseases). For fatal or specified injuries, the HSE must also be notified by telephone immediately on 0345 300 9923. The online form must then be submitted within 10 days. Records of RIDDOR reports must be kept for at least 3 years."
  },
  {
    question: "What happens if my employer fails to report a RIDDOR incident?",
    answer: "Failure to report a RIDDOR-reportable incident is a criminal offence under the Health and Safety at Work etc. Act 1974. The HSE can prosecute employers who fail to report, with penalties including unlimited fines. If you believe your employer has failed to report an incident, you can contact the HSE directly or report through your trade union safety representative. Employees are protected from dismissal or detriment for raising health and safety concerns."
  },
  {
    question: "Should I preserve the scene after an electrical accident?",
    answer: "Yes — after making the area safe and treating any casualties, the accident scene should be preserved as far as possible. Do not disturb equipment, remove tools, clean up debris or reset circuit breakers until the investigation team has documented the scene. Take photographs from multiple angles, note the position of switches and isolators, record any readings on instruments, and secure any physical evidence (failed components, damaged cables). This evidence is critical for the investigation and may be needed if the HSE conducts its own enquiry."
  }
];

const MOETModule1Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6">
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
            <span>Module 1.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Reporting Incidents, Accidents and Near Misses
          </h1>
          <p className="text-white/80">
            RIDDOR requirements, internal reporting, accident investigation and learning from near misses
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>RIDDOR:</strong> Report deaths, specified injuries, 7-day incapacitation, dangerous occurrences</li>
              <li className="pl-1"><strong>Timeframes:</strong> Immediate (fatal/specified), 15 days (7-day), 10 days (online form)</li>
              <li className="pl-1"><strong>Near misses:</strong> Report internally — they are early warnings</li>
              <li className="pl-1"><strong>Investigation:</strong> Find root causes, not blame</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Electrical fires:</strong> Short circuit causing fire = dangerous occurrence</li>
              <li className="pl-1"><strong>Electric shock:</strong> Hospital treatment = reportable injury</li>
              <li className="pl-1"><strong>Near misses:</strong> Failed isolation, wrong circuit = must report internally</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to reporting and compliance KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify which injuries, diseases and occurrences are reportable under RIDDOR 2013",
              "Explain the reporting timeframes and methods for different categories of incident",
              "Describe the purpose and process of internal near-miss reporting",
              "Carry out a structured accident investigation using root cause analysis",
              "Record incidents correctly in the accident book with GDPR compliance",
              "Recognise electrical-specific dangerous occurrences and their reporting requirements"
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

        {/* Section 01: RIDDOR 2013 — What Must Be Reported */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            RIDDOR 2013 — What Must Be Reported
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) require employers,
              the self-employed and persons in control of premises to report certain work-related incidents to the Health
              and Safety Executive (HSE). RIDDOR reporting enables the HSE to identify trends, investigate serious
              incidents, and target enforcement action where it is most needed. Failure to report is a criminal offence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Categories of Reportable Incident</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Deaths:</strong> Any death arising from a work-related accident, including deaths of non-workers (members of the public) as a result of a work activity</li>
                <li className="pl-1"><strong>Specified injuries:</strong> Fractures (except fingers/thumbs/toes), amputations, permanent loss of sight or reduction in sight, crush injuries to the head or torso, scalping, burns covering more than 10% of the body, loss of consciousness from head injury or asphyxia, hypothermia or heat-induced illness requiring hospital admission for more than 24 hours</li>
                <li className="pl-1"><strong>Over-7-day incapacitation:</strong> Where a worker is incapacitated for more than 7 consecutive days (not counting the day of the accident) as a result of a work-related injury</li>
                <li className="pl-1"><strong>Non-fatal injuries to non-workers:</strong> Where a member of the public is injured as a result of a work activity and is taken to hospital for treatment</li>
                <li className="pl-1"><strong>Occupational diseases:</strong> Carpal tunnel syndrome, hand-arm vibration syndrome, occupational dermatitis, occupational asthma, and other specified diseases when linked to the work activity</li>
                <li className="pl-1"><strong>Dangerous occurrences:</strong> Specified near-miss events with high potential for serious harm (see below)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Dangerous Occurrences Relevant to Electrical Work</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electrical short circuit or overload causing fire or explosion:</strong> Even if no one is injured, an electrical fault that results in fire or explosion is a reportable dangerous occurrence</li>
                <li className="pl-1"><strong>Electrical incidents causing stoppage of plant for more than 24 hours:</strong> Where an electrical fault causes a cessation of work for more than 24 hours</li>
                <li className="pl-1"><strong>Explosion or fire causing suspension of normal work for over 24 hours:</strong> Any fire or explosion that prevents normal working for more than 24 hours</li>
                <li className="pl-1"><strong>Collapse of building or structure:</strong> Where an electrical fault causes structural damage</li>
                <li className="pl-1"><strong>Incidents involving overhead electric lines:</strong> Contact with or close approach to overhead power lines</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reporting Timeframes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Initial Report</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Written Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Death or specified injury</td>
                      <td className="border border-white/10 px-3 py-2">Immediately by telephone (0345 300 9923)</td>
                      <td className="border border-white/10 px-3 py-2">Online form within 10 days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Over-7-day incapacitation</td>
                      <td className="border border-white/10 px-3 py-2">Not required by telephone</td>
                      <td className="border border-white/10 px-3 py-2">Online form within 15 days of the accident</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Dangerous occurrence</td>
                      <td className="border border-white/10 px-3 py-2">Immediately by telephone</td>
                      <td className="border border-white/10 px-3 py-2">Online form within 10 days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Occupational disease</td>
                      <td className="border border-white/10 px-3 py-2">Not required by telephone</td>
                      <td className="border border-white/10 px-3 py-2">Online form as soon as a doctor confirms diagnosis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> RIDDOR records must be kept for at least 3 years from the date the incident
              was reported. These records may be needed for HSE investigations, civil claims, insurance purposes and
              organisational learning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Internal Reporting and the Accident Book */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Internal Reporting and the Accident Book
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all incidents meet the RIDDOR threshold for external reporting, but ALL incidents — no matter how
              minor — should be recorded internally. The accident book (BI 510) is the primary record, supplemented
              by the organisation's internal reporting systems. Comprehensive internal reporting creates a complete
              picture of safety performance and enables trend analysis.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Accident Book (BI 510)</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Legal requirement:</strong> The Social Security (Claims and Payments) Regulations 1979 require employers to keep an accident book or equivalent system</li>
                <li className="pl-1"><strong>What to record:</strong> Date and time, location, name and occupation of the injured person, details of the injury or condition, description of what happened, treatment given, name of the person making the entry</li>
                <li className="pl-1"><strong>Who records:</strong> The injured person should make the entry if possible, or a colleague on their behalf</li>
                <li className="pl-1"><strong>Timeliness:</strong> Entries should be made as soon as practicable after the incident, while details are fresh</li>
                <li className="pl-1"><strong>GDPR compliance:</strong> Modern accident books use individually removable pages so previous entries cannot be seen by others. Electronic systems must restrict access to authorised personnel</li>
                <li className="pl-1"><strong>Retention:</strong> Records must be kept for at least 3 years</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Internal Reporting Systems</h3>
                <p className="text-sm text-white mb-2">
                  In addition to the accident book, most organisations have internal reporting systems that capture
                  more detail for investigation and trend analysis:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Incident report forms (paper or electronic)</li>
                  <li className="pl-1">Near-miss reporting cards or apps</li>
                  <li className="pl-1">Safety observation systems</li>
                  <li className="pl-1">Toolbox talk feedback and records</li>
                  <li className="pl-1">Supervisor daily safety reports</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Data Protection Considerations</h3>
                <p className="text-sm text-white mb-2">
                  Accident and incident records contain personal data and must be handled in accordance with GDPR:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Only collect data that is necessary and proportionate</li>
                  <li className="pl-1">Store records securely with restricted access</li>
                  <li className="pl-1">Do not retain records longer than necessary (minimum 3 years for RIDDOR)</li>
                  <li className="pl-1">Individuals have the right to access their own records</li>
                  <li className="pl-1">Consider anonymising data for trend analysis and reporting</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Contractor Reporting</p>
              <p className="text-sm text-white">
                As a maintenance electrician working as a contractor, you have dual reporting responsibilities. You must
                report incidents to the building/client's management (using their systems) AND to your own employer.
                The duty to report to the HSE under RIDDOR falls on the person in control of the premises for dangerous
                occurrences affecting the building, and on your employer for injuries to their employees. Ensure you
                understand both reporting channels before starting work on any site.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If in doubt about whether an incident is reportable, report it. It is far better
              to report an incident that turns out not to be RIDDOR-reportable than to fail to report one that is.
              Your supervisor or health and safety manager can help determine the correct reporting category.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03: Near-Miss Reporting and the Safety Triangle */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Near-Miss Reporting and the Safety Triangle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Near misses are events that could have caused injury or damage but, by chance or good fortune, did not.
              They are the most valuable source of safety intelligence available to any organisation because they
              reveal hazards and system failures before anyone is hurt. For electrical maintenance work — where the
              consequences of a genuine incident can be fatal — near-miss reporting is especially critical.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Heinrich's Safety Triangle</h3>
              <p className="text-sm text-white mb-3">
                Herbert Heinrich's research (later updated by Frank Bird) identified a statistical relationship
                between the severity levels of workplace incidents:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1</strong> serious or major injury</li>
                <li className="pl-1"><strong>29</strong> minor injuries</li>
                <li className="pl-1"><strong>300</strong> near misses / no-injury incidents / unsafe acts</li>
              </ul>
              <p className="text-sm text-white mt-3">
                The principle is clear: by addressing the large number of near misses at the base of the triangle,
                you reduce the likelihood of the minor injuries in the middle and the serious injuries at the top.
                Near-miss reporting is the foundation of proactive (rather than reactive) safety management.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Examples of Near Misses in Electrical Maintenance</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Isolation failure:</strong> You isolated what you believed was the correct circuit, but when proving dead, discovered the circuit was still live — you had isolated the wrong circuit. No shock because you followed safe isolation procedure, but the labelling was incorrect</li>
                <li className="pl-1"><strong>Live working near miss:</strong> While removing a consumer unit cover, you noticed exposed live busbars that were not adequately shrouded. You did not touch them, but a less experienced person might have</li>
                <li className="pl-1"><strong>Arc flash risk:</strong> You opened a distribution board panel and noticed significant evidence of previous arcing and overheating — black deposits, melted connections — indicating an imminent failure that could have caused an arc flash</li>
                <li className="pl-1"><strong>Falling equipment:</strong> A cable tray bracket failed and the tray dropped, narrowly missing a colleague working below. No injury, but the same failure at a different moment could have been fatal</li>
                <li className="pl-1"><strong>Incorrect labelling:</strong> Circuit labels on a distribution board were wrong — circuits were not where the schedule said they were. Discovered during testing, not during live work, but the potential for working on the wrong live circuit was real</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Creating a Positive Reporting Culture</h3>
              <p className="text-sm text-white mb-3">
                Many near misses go unreported because workers fear blame, embarrassment or disciplinary action. A
                positive reporting culture requires:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>No blame:</strong> The focus is on system failures, not individual errors. Punishing reporters guarantees under-reporting</li>
                <li className="pl-1"><strong>Easy reporting:</strong> Simple, quick reporting methods — cards, apps, verbal reports to supervisors</li>
                <li className="pl-1"><strong>Feedback:</strong> Reporters must see that their reports lead to action. If nothing changes, people stop reporting</li>
                <li className="pl-1"><strong>Recognition:</strong> Acknowledge and thank people who report near misses — they are contributing to safety</li>
                <li className="pl-1"><strong>Leadership:</strong> Managers must actively encourage reporting and report their own near misses</li>
                <li className="pl-1"><strong>Learning:</strong> Share anonymised near-miss lessons in toolbox talks and safety briefings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> If you experience a near miss, report it immediately — do not wait until the end
              of the day or think "it doesn't matter because nothing happened." The same conditions that caused your
              near miss still exist and could cause a serious injury to the next person. Reporting near misses is one
              of the most important things you can do as a safety-conscious maintenance technician.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Accident Investigation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Accident Investigation Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When an accident or serious near miss occurs, a thorough investigation is essential to understand what
              happened, why it happened, and how to prevent it from happening again. The investigation should be
              carried out by a competent person (or team) as soon as practicable after the incident, while evidence
              is fresh and the scene is intact.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1 — Secure the Scene</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ensure the area is safe — no continuing danger to investigators or others</li>
                  <li className="pl-1">Preserve the scene — do not move equipment, tools or materials</li>
                  <li className="pl-1">Take photographs and video from multiple angles</li>
                  <li className="pl-1">Make sketches showing positions of people, equipment and materials</li>
                  <li className="pl-1">Note the position of switches, isolators, lockout devices and test instruments</li>
                  <li className="pl-1">Secure any physical evidence (failed components, damaged cables, PPE)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2 — Gather Evidence</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Witness statements:</strong> Interview witnesses individually as soon as possible. Ask open questions ("What did you see?") not leading questions ("Did he forget to isolate?")</li>
                  <li className="pl-1"><strong>Documentation:</strong> Collect risk assessments, method statements, permits to work, training records, maintenance records, calibration certificates for test instruments</li>
                  <li className="pl-1"><strong>Environmental data:</strong> Note lighting levels, temperature, noise, time of day, weather (for outdoor work), shift patterns</li>
                  <li className="pl-1"><strong>Equipment examination:</strong> Inspect and test equipment involved (by a competent person). Record serial numbers, calibration dates, condition</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3 — Analyse and Identify Root Causes</h3>
                <p className="text-sm text-white mb-2">
                  Root cause analysis goes beyond the immediate cause (e.g., "he touched a live conductor") to identify
                  the underlying systemic failures. Common root cause analysis techniques include:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>5 Whys:</strong> Ask "why?" repeatedly until you reach the fundamental cause. Example: Why did he touch the live conductor? Because it was not isolated. Why was it not isolated? Because the wrong circuit was identified. Why was the wrong circuit identified? Because the labelling was out of date. Why was the labelling out of date? Because there is no system for updating labels after modifications</li>
                  <li className="pl-1"><strong>Fishbone diagram (Ishikawa):</strong> Categorise causes under headings: People, Procedures, Plant, Place, Policies</li>
                  <li className="pl-1"><strong>Timeline analysis:</strong> Map out the sequence of events to identify where the chain could have been broken</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 4 — Implement Corrective Actions</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Immediate actions:</strong> Address any continuing hazards straight away</li>
                  <li className="pl-1"><strong>Short-term actions:</strong> Implement temporary controls while permanent solutions are developed</li>
                  <li className="pl-1"><strong>Long-term actions:</strong> Address root causes through procedure changes, training, design modifications, management systems</li>
                  <li className="pl-1"><strong>Follow the hierarchy of control:</strong> Eliminate, substitute, engineer, administrate, PPE</li>
                  <li className="pl-1"><strong>Assign responsibility:</strong> Each corrective action must have a named owner and a target completion date</li>
                  <li className="pl-1"><strong>Verify effectiveness:</strong> Check that corrective actions have been implemented and are working</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Case Study: Investigation of an Electrical Near Miss</h3>
              <p className="text-sm text-white">
                A maintenance technician was tasked with replacing a contactor in a motor control centre (MCC). They
                isolated the supply at the local isolator, locked off and proved dead. However, when they removed the
                contactor, they discovered that the isolator only disconnected two of the three phases — the third
                phase remained live due to a faulty isolator mechanism. The technician was not injured because they
                were wearing insulated gloves and noticed the live indicator before touching the busbars. Investigation
                using the 5 Whys revealed: (1) the isolator was faulty, (2) the fault had not been detected during
                the last periodic inspection, (3) the inspection did not include functional testing of isolators,
                (4) the inspection checklist was incomplete. Corrective actions included adding isolator functional
                testing to the inspection procedure, replacing all isolators of the same age and type, and retraining
                inspection staff.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to be able to participate
              in incident investigations and contribute to corrective actions. You should be able to provide accurate
              witness statements, assist with evidence gathering, and implement corrective actions relevant to your
              work. You are also expected to report hazards and near misses proactively.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Lessons Learned and Continuous Improvement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Lessons Learned and Continuous Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The true value of incident reporting and investigation lies not in the paperwork itself but in the
              lessons learned and the improvements that follow. A proactive safety culture uses data from accidents,
              near misses and investigations to drive continuous improvement — identifying patterns, strengthening
              systems and preventing future harm. For electrical maintenance technicians, this means being an active
              participant in the feedback loop, not just a data source.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Trend Analysis and Pattern Recognition</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Accident data review:</strong> Regularly analyse accident book entries, RIDDOR reports and near-miss records to identify trends — are certain types of incident recurring? Are there common locations, times, tasks or equipment involved?</li>
                <li className="pl-1"><strong>Leading indicators:</strong> Track proactive measures such as the number of near misses reported, safety observations completed, toolbox talks delivered and training hours. A drop in near-miss reporting may indicate under-reporting, not improved safety</li>
                <li className="pl-1"><strong>Lagging indicators:</strong> Track reactive measures such as injury rates, lost-time incidents, RIDDOR reports and enforcement actions. These tell you what has happened, not what will happen</li>
                <li className="pl-1"><strong>Benchmarking:</strong> Compare your organisation's incident rates with industry averages to identify areas for improvement</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Communicating Lessons Learned</h3>
              <p className="text-sm text-white mb-3">
                Lessons from investigations are only valuable if they reach the people who need to know. Effective
                communication methods include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safety alerts:</strong> Immediate notifications of serious incidents with key lessons — distributed by email, noticeboard, or safety app</li>
                <li className="pl-1"><strong>Toolbox talks:</strong> Short, focused discussions at the start of shifts or work activities, using real incident case studies to reinforce safe practices</li>
                <li className="pl-1"><strong>Safety briefings:</strong> Formal briefings for larger teams, covering investigation findings, root causes and corrective actions</li>
                <li className="pl-1"><strong>Notice boards:</strong> Display anonymised incident summaries and safety statistics in common areas</li>
                <li className="pl-1"><strong>Industry sharing:</strong> Organisations such as the HSE, ECA, JIB and NICEIC publish safety bulletins and incident alerts that provide lessons from across the industry</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Closing the Loop</h3>
                <p className="text-sm text-white">
                  Every corrective action identified in an investigation must be tracked to completion. This means
                  assigning a named owner, setting a deadline, providing the resources needed, verifying that the
                  action has been completed, and then checking that it is effective in preventing recurrence. An
                  investigation that identifies corrective actions but never implements them is worse than no
                  investigation — it creates a false sense of security.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Your Role in Continuous Improvement</h3>
                <p className="text-sm text-white">
                  As a maintenance technician, you contribute to continuous improvement by: reporting all incidents
                  and near misses honestly, participating in investigations when asked, attending safety briefings
                  and toolbox talks, implementing corrective actions in your work, sharing safety knowledge with
                  colleagues, and challenging unsafe practices when you see them. Safety is not a one-person job —
                  it requires everyone's participation.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">HSE Enforcement and the Consequences of Failure</h3>
              <p className="text-sm text-white">
                The HSE has the power to investigate workplace incidents, issue improvement notices and prohibition
                notices, and prosecute employers and individuals who fail to comply with health and safety law.
                Penalties for RIDDOR offences and health and safety breaches include unlimited fines for organisations,
                imprisonment for individuals (up to 2 years under the Health and Safety at Work etc. Act 1974), and
                corporate manslaughter charges in the most serious cases. Beyond the legal consequences, a failure to
                report and learn from incidents is a moral failure — every accident that could have been prevented
                represents a failure of the safety management system.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard includes behaviours relating to continuous
              improvement and taking responsibility for safety. Demonstrating that you actively participate in reporting,
              investigation and corrective action implementation is a key part of your end-point assessment evidence.
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">RIDDOR Reporting</p>
                <ul className="space-y-0.5">
                  <li>Deaths/specified injuries — phone immediately + online within 10 days</li>
                  <li>Over-7-day incapacitation — online within 15 days</li>
                  <li>Dangerous occurrences — phone immediately + online within 10 days</li>
                  <li>Occupational diseases — online when doctor confirms</li>
                  <li>HSE telephone: 0345 300 9923</li>
                  <li>Online: www.hse.gov.uk/riddor</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>RIDDOR 2013 — Reporting regulations</li>
                  <li>HSWA 1974 — General duties</li>
                  <li>BI 510 — Accident book</li>
                  <li>GDPR / DPA 2018 — Data protection</li>
                  <li>HSG245 — Investigating accidents</li>
                  <li>ST1426 — Reporting and compliance KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Evacuation Procedures
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6-5">
              Next: Role of First Responders
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section6_4;
