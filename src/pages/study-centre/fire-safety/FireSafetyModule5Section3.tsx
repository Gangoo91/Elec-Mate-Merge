import { ArrowLeft, ArrowRight, FileWarning, ClipboardList, Phone, BookOpen, Search, HelpCircle, Scale, ShieldCheck, FolderOpen, GitBranch, AlertTriangle, CheckCircle, Users, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "riddor-fatal-fire-timeframe",
    question: "What is the timeframe for reporting a fatal fire incident to RIDDOR?",
    options: [
      "Within 24 hours",
      "Within 10 working days",
      "Immediately (by the quickest practicable means)",
      "Within 15 working days"
    ],
    correctIndex: 2,
    explanation:
      "Fatal fire incidents must be reported to RIDDOR immediately by the quickest practicable means, which in practice means by telephone to the HSE Incident Contact Centre on 0345 300 9923. This is because fatalities represent the most serious category of incident and require urgent investigation. A follow-up written report (F2508) must then be submitted online within 10 days. The 'immediately' requirement applies to all fatalities and specified injuries, not just fire-related ones. Delay in reporting can constitute a criminal offence and may also compromise the investigation by allowing evidence to degrade or be disturbed."
  },
  {
    id: "immediate-vs-root-cause",
    question: "What is the difference between an immediate cause and a root cause of a fire?",
    options: [
      "They are the same thing described in different ways",
      "The immediate cause is the ignition source; the root cause is the underlying systemic failure that allowed the fire to occur",
      "The root cause is always arson; the immediate cause is accidental",
      "The immediate cause is identified by the fire service; the root cause is identified by the police"
    ],
    correctIndex: 1,
    explanation:
      "The immediate cause is the direct physical mechanism that started the fire — for example, an overheated cable, a discarded cigarette, or a fault in electrical equipment. The root cause is the underlying systemic failure that allowed the conditions for the fire to exist — for example, a failure to maintain electrical installations, inadequate hot-work procedures, or a lack of fire risk assessment review. Identifying the root cause is essential because addressing only the immediate cause will not prevent recurrence. For instance, replacing a faulty cable (immediate cause) without addressing why the maintenance programme failed to detect the fault (root cause) means the problem will likely happen again with different equipment."
  },
  {
    id: "fire-scene-preservation-duration",
    question: "How long should a fire scene be preserved following an incident?",
    options: [
      "24 hours after the fire is extinguished",
      "Until the fire risk assessment is updated",
      "Until the scene is formally released by the investigating authorities",
      "7 working days as required by RIDDOR"
    ],
    correctIndex: 2,
    explanation:
      "A fire scene must be preserved until it is formally released by the investigating authorities. This may include the fire and rescue service, the police (if arson is suspected), and/or the Health and Safety Executive (if it is a workplace incident). The duration of scene preservation varies depending on the severity and complexity of the incident — it could be hours for a minor fire or weeks for a serious or fatal incident. Premature disturbance of a fire scene can destroy critical evidence, compromise the investigation, and potentially constitute a criminal offence of obstructing the investigation. The responsible person should cordon off the area, prevent any access or clean-up, and appoint a person to maintain the cordon until the scene is released in writing."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Do all workplace fires need to be reported to RIDDOR?",
    answer:
      "No, not all workplace fires require RIDDOR reporting. A fire must be reported under RIDDOR only if it results in a fatality, a specified injury, an over-7-day injury (where a worker is incapacitated for more than 7 consecutive days), or if the fire itself constitutes a dangerous occurrence. A fire is classified as a dangerous occurrence under RIDDOR Schedule 2 if it causes the suspension of normal work for more than 24 hours, or if it affects or is liable to affect any occupied area of the premises or any escape route. Minor fires that are quickly extinguished and do not cause injury or significant disruption are not RIDDOR-reportable, but they should still be recorded in the internal fire log book and investigated as near-misses to prevent more serious incidents in the future."
  },
  {
    question: "Who is responsible for investigating workplace fires?",
    answer:
      "Multiple parties may be involved in investigating a workplace fire, depending on its severity and circumstances. The fire and rescue service has the primary power to investigate the cause and origin of fires under the Fire and Rescue Services Act 2004. If arson is suspected, the police will conduct a criminal investigation, often jointly with fire investigation officers. If the fire occurred in a workplace and involved injury or death, the Health and Safety Executive (HSE) or the local authority may also investigate under the Health and Safety at Work etc. Act 1974 and RIDDOR. Additionally, the employer or responsible person has a duty under the Regulatory Reform (Fire Safety) Order 2005 to investigate the incident internally, update the fire risk assessment, and implement corrective actions. Insurers may also conduct their own investigation to assess the validity of any claim."
  },
  {
    question: "Why is near-miss reporting so important for fire safety?",
    answer:
      "Near-miss reporting is critically important because near-misses are precursors to actual incidents. Research consistently shows that for every serious fire, there are many more near-misses — situations where a fire almost started, or where a small fire was caught early before it could develop. Reporting and investigating these near-misses provides invaluable learning opportunities without the cost of an actual fire. Near-miss data reveals patterns and trends: if multiple near-misses involve the same type of equipment, process, or location, this indicates a systemic problem that needs addressing before a serious fire occurs. A culture of near-miss reporting also demonstrates a mature safety culture where employees feel comfortable reporting without fear of blame. The responsible person should establish a simple, accessible near-miss reporting system and ensure all reports are acknowledged, investigated, and acted upon."
  },
  {
    question: "Can employees or trade union representatives access fire investigation records?",
    answer:
      "Yes, there are several routes through which employees and their representatives can access fire investigation records. Under the Safety Representatives and Safety Committees Regulations 1977, trade union-appointed safety representatives have a statutory right to inspect and take copies of documents that the employer is required to keep under health and safety legislation, including fire safety records. Under the Health and Safety (Consultation with Employees) Regulations 1996, elected representatives of employee safety also have consultation rights. The RRFSO requires the responsible person to record the significant findings of the fire risk assessment and make this available to employees. Fire authority enforcement officers can also require the production of fire safety records during an inspection or audit. Additionally, under the Data Protection Act 2018 and UK GDPR, individuals have the right to access personal data held about them, which could include records of fire incidents they were involved in. Employers should be transparent about fire investigation findings (while respecting the confidentiality of individuals) to promote learning and a positive safety culture."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Under RIDDOR 2013, which of the following fire-related scenarios must be reported as a dangerous occurrence?",
    options: [
      "A small fire in a waste bin that is immediately extinguished with no injuries",
      "A fire that causes suspension of normal work for more than 24 hours",
      "A fire alarm activation caused by burnt toast with no actual fire",
      "A near-miss where a portable heater was left unattended overnight"
    ],
    correctAnswer: 1,
    explanation:
      "Under RIDDOR 2013 Schedule 2, a fire is reportable as a dangerous occurrence if it causes the suspension of normal work for more than 24 hours, or if it affects or is liable to affect any occupied area or escape route. A small bin fire that is immediately dealt with would not typically meet these thresholds. A false alarm is not a fire and is not reportable under RIDDOR (though it should be recorded internally). A near-miss, while important to record internally, does not meet the RIDDOR reporting criteria unless it falls within one of the specified categories."
  },
  {
    id: 2,
    question:
      "What is the correct timeframe for submitting an online RIDDOR report for a non-fatal over-7-day injury caused by a workplace fire?",
    options: [
      "Immediately by telephone",
      "Within 5 working days of the incident",
      "Within 15 days of the incident",
      "Within 10 days of the incident"
    ],
    correctAnswer: 3,
    explanation:
      "Non-fatal over-7-day injuries must be reported to RIDDOR within 15 days of the incident occurring. However, note the distinction: the over-7-day counting period begins from the day after the incident, but the 15-day reporting window starts from the date of the incident itself. The report is submitted online via the HSE RIDDOR website. Only fatalities and specified injuries require immediate telephone notification. This timeframe also applies to dangerous occurrences — they must be reported within 10 days. Employers should establish internal reporting procedures that ensure RIDDOR-reportable incidents are escalated quickly so that the statutory deadlines are met."
  },
  {
    id: 3,
    question:
      "What is the primary purpose of preserving a fire scene after an incident?",
    options: [
      "To allow the insurance company to assess the damage for a claim",
      "To prevent employees from returning to work too quickly",
      "To protect physical evidence and allow investigators to determine the cause and origin of the fire",
      "To demonstrate compliance with the fire risk assessment"
    ],
    correctAnswer: 2,
    explanation:
      "The primary purpose of fire scene preservation is to protect physical evidence so that investigators can accurately determine the cause, origin, and development of the fire. Physical evidence at a fire scene is extremely fragile — it can be destroyed by clean-up activities, weather, foot traffic, or well-intentioned attempts to salvage property. Key evidence includes burn patterns (V-patterns, pour patterns), electrical evidence (arc mapping, fused conductors), debris positioning, witness marks on doors and windows, and the location and condition of fire detection and suppression equipment. While insurance assessment is important, it is secondary to the safety investigation. Scene preservation also supports any criminal investigation if arson is suspected."
  },
  {
    id: 4,
    question:
      "In root cause analysis, what does the '5 Whys' technique involve?",
    options: [
      "Asking five different departments to provide their version of events",
      "Conducting five separate investigations over five consecutive days",
      "Repeatedly asking 'why' a failure occurred to drill down from the immediate cause to the underlying root cause",
      "Identifying five possible causes and selecting the most likely one"
    ],
    correctAnswer: 2,
    explanation:
      "The 5 Whys technique is a simple but effective root cause analysis method developed by Sakichi Toyoda and used within the Toyota Production System. It involves repeatedly asking 'why' each successive answer occurred, typically around five times (though the actual number may vary), to drill down from the surface-level immediate cause to the deeper root cause. For example: Why did the fire start? (Overheated cable.) Why did the cable overheat? (It was overloaded.) Why was it overloaded? (Too many appliances on one circuit.) Why were too many appliances on one circuit? (No additional circuits were installed when the office was expanded.) Why were no circuits added? (There was no electrical review when the layout changed.) The root cause is the absence of a process to review electrical capacity when office layouts change."
  },
  {
    id: 5,
    question:
      "Which root cause analysis technique uses a diagram resembling a fish skeleton to categorise potential causes?",
    options: [
      "Fault tree analysis",
      "5 Whys technique",
      "Fishbone (Ishikawa) diagram",
      "Bow-tie analysis"
    ],
    correctAnswer: 2,
    explanation:
      "The fishbone diagram, also known as the Ishikawa diagram (after its creator, Kaoru Ishikawa) or cause-and-effect diagram, uses a visual structure resembling a fish skeleton. The 'head' of the fish represents the problem (the fire), and the 'bones' represent categories of potential causes branching off from a central spine. Common categories used in fire investigation include: People (human error, training gaps), Procedures (inadequate or missing procedures), Equipment (faulty or poorly maintained), Environment (building conditions, weather), Materials (combustible materials, storage), and Management (supervision, culture, resources). Each category is then explored for specific contributing factors. The technique is particularly useful for complex incidents where multiple factors may have contributed."
  },
  {
    id: 6,
    question:
      "What should happen with the lessons learned from a fire investigation?",
    options: [
      "They should be filed confidentially and only shared with senior management",
      "They should be used to update the fire risk assessment, revise procedures, and be communicated to all relevant staff",
      "They should only be shared with the fire and rescue service",
      "They should be published on the company website for public transparency"
    ],
    correctAnswer: 1,
    explanation:
      "Lessons learned from a fire investigation should be actively used to improve fire safety across the organisation. This includes: updating the fire risk assessment to reflect the new understanding of risks; revising fire safety procedures, policies, and training to address the identified gaps; communicating findings to all relevant staff so they understand what happened, why, and what has changed as a result; sharing anonymised lessons with industry bodies or trade associations where appropriate; and tracking the implementation of corrective actions to ensure they are completed effectively. Simply filing the report without acting on it defeats the purpose of the investigation. A blame-free approach to sharing lessons encourages a positive safety culture."
  },
  {
    id: 7,
    question:
      "Under the Fire and Rescue Services Act 2004, what powers do fire investigation officers have?",
    options: [
      "They can only enter premises with the owner's written consent",
      "They can enter premises, examine the scene, take samples, seize evidence, and require the production of documents",
      "They can arrest suspects and charge them with arson",
      "They can only observe the scene and must request police assistance for any evidence collection"
    ],
    correctAnswer: 1,
    explanation:
      "Under the Fire and Rescue Services Act 2004 (Sections 44-45), fire investigation officers have extensive powers to investigate the cause and origin of fires. These include: the power to enter premises where a fire has occurred or is suspected; the power to examine, search, and investigate the fire scene; the power to take measurements, photographs, and recordings; the power to take samples of any materials or substances found; the power to seize and detain any article or substance for examination or use as evidence; and the power to require the production of documents and records relevant to the investigation. They can also require persons to provide information and may be accompanied by any person they consider necessary, including scientific advisers. Obstruction of a fire investigation officer is a criminal offence."
  },
  {
    id: 8,
    question:
      "Which of the following records must be maintained as part of fire safety record keeping?",
    options: [
      "Only fire alarm activations and fire drill records",
      "Only incident reports and investigation findings",
      "Fire alarm activations, false alarms, fire drills, equipment maintenance, training records, incidents, and investigation reports",
      "Only records that the fire and rescue service specifically requests"
    ],
    correctAnswer: 2,
    explanation:
      "Comprehensive fire safety record keeping requires maintaining all of the following: fire alarm activations (including date, time, zone, and cause); false alarms (to identify patterns and reduce unwanted alarms); fire drill records (date, time, evacuation time achieved, observations, corrective actions); fire safety equipment maintenance records (extinguishers, alarm systems, emergency lighting, sprinklers, fire doors); fire safety training records (who was trained, when, and on what topics); fire incident reports (including near-misses); and fire investigation reports with findings and corrective actions. These records must be retained for a reasonable period — typically a minimum of 3 years for most records, though some organisations retain them for longer. The records must be available for inspection by fire authority enforcement officers during routine inspections or following an incident."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function FireSafetyModule5Section3() {
  useSEO({
    title: "Incident Reporting & Investigation | Fire Safety Module 5.3",
    description:
      "Learn about RIDDOR fire incident reporting, internal reporting procedures, fire investigation processes, root cause analysis techniques, lessons learned, fire service powers, and fire safety record keeping.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <FileWarning className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Incident Reporting &amp; Investigation
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding RIDDOR reporting requirements, internal fire incident procedures, investigation techniques, root cause analysis, and the importance of comprehensive record keeping &mdash; turning every incident into a learning opportunity
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>RIDDOR</strong> requires reporting of serious fire incidents</li>
              <li><strong>Scene preservation</strong> is critical for investigation</li>
              <li><strong>Root cause analysis</strong> prevents recurrence</li>
              <li><strong>Record keeping</strong> demonstrates compliance and aids learning</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Legislation</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>RIDDOR 2013:</strong> Reporting of Injuries, Diseases and Dangerous Occurrences</li>
              <li><strong>RRFSO 2005:</strong> Responsible person&rsquo;s duties</li>
              <li><strong>Fire and Rescue Services Act 2004:</strong> Investigation powers</li>
              <li><strong>HSWA 1974:</strong> General duties for workplace safety</li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  LEARNING OUTCOMES                                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain when a fire must be reported under RIDDOR 2013 and the required timeframes",
              "Describe the methods and procedures for submitting RIDDOR reports",
              "Outline internal fire incident reporting and near-miss procedures",
              "Explain the fire investigation process including scene preservation and evidence gathering",
              "Apply root cause analysis techniques including the 5 Whys and fishbone diagrams",
              "Describe the powers of fire investigation officers under the Fire and Rescue Services Act 2004"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: RIDDOR & Fire Incidents                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">01</span>
              RIDDOR &amp; Fire Incidents
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013</strong> (RIDDOR) impose a legal duty on employers, the self-employed, and persons in control of premises to report certain workplace incidents to the Health and Safety Executive (HSE). While RIDDOR covers all types of workplace incident, fires have specific reporting triggers that every responsible person and fire marshal must understand.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">When a Fire Must Be Reported to RIDDOR</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Fatalities</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Any death of a person arising out of or in connection with a workplace fire must be reported. This includes the death of any person &mdash; not just employees &mdash; including members of the public, contractors, and visitors. Deaths occurring within one year and one day of the incident must also be reported if the fire is believed to have contributed to the death.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Specified Injuries</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Specified injuries resulting from a fire must be reported. These include: fractures (other than to fingers, thumbs, and toes), amputations, serious burns requiring hospital treatment, any injury requiring hospitalisation for more than 24 hours, loss of consciousness caused by head injury or asphyxia, and any injury likely to result in permanent loss of sight. Burns and smoke inhalation are particularly common fire-related specified injuries.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Over-7-Day Injuries</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      If a worker (employee or self-employed person working on the premises) suffers an injury from a fire that results in their incapacitation for more than 7 consecutive days (not counting the day of the incident), this must be reported. Incapacitation means the worker is unable to carry out their normal duties. This category applies only to workers, not to members of the public.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Dangerous Occurrences</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A fire is reportable as a <strong>dangerous occurrence</strong> under RIDDOR Schedule 2 if it causes the <strong>suspension of normal work for more than 24 hours</strong>, or if the fire <strong>affects or is liable to affect any occupied area of the premises</strong> or <strong>any escape route</strong>. This is a particularly important category because it captures serious fires even where no injuries occur &mdash; the potential for harm is sufficient to trigger the reporting duty.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Important Distinction</p>
                <p className="text-sm text-white/80">
                  RIDDOR applies to <strong>workplace</strong> fires &mdash; that is, fires occurring at or in connection with work activities. It does not apply to domestic fires in private dwellings (unless work is being carried out there). The responsible person under RIDDOR is typically the employer or, for non-employees, the person in control of the premises. Failure to report a RIDDOR-notifiable incident is a criminal offence that can result in prosecution and an unlimited fine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: How to Report                                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">02</span>
              How to Report
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                RIDDOR reports can be submitted through two channels, depending on the severity of the incident. Understanding which method to use and the associated timeframes is essential for compliance.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Reporting Methods &amp; Timeframes</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Fatalities &amp; Specified Injuries</p>
                      <p className="text-sm font-bold text-rose-400">Immediately</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Report by <strong>telephone</strong> to the HSE Incident Contact Centre on 0345 300 9923. The report must be made by the quickest practicable means, and a follow-up written report (Form F2508) must be submitted online within <strong>10 days</strong>. The telephone line operates Monday to Friday 08:30&ndash;17:00; outside these hours, report the next working day.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Over-7-Day Injuries</p>
                      <p className="text-sm font-bold text-rose-400">Within 15 Days</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Report <strong>online</strong> via the HSE RIDDOR website (www.hse.gov.uk/riddor). The report must be submitted within <strong>15 days</strong> of the incident. The counting of the 7 days of incapacitation starts from the day after the incident, but the 15-day reporting window starts from the date of the incident itself.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Dangerous Occurrences</p>
                      <p className="text-sm font-bold text-rose-400">Within 10 Days</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Report <strong>online</strong> via the HSE RIDDOR website within <strong>10 days</strong> of the incident. This includes fires that cause suspension of work for more than 24 hours or that affect escape routes or occupied areas. If the dangerous occurrence also involves a fatality or specified injury, it must be reported by telephone immediately.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The <strong>responsible person</strong> for making the RIDDOR report is typically the employer or, if the affected person is not an employee, the person in control of the premises where the incident occurred. In practice, this duty is often delegated to a health and safety manager, but the legal responsibility remains with the employer.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Information Required for a RIDDOR Report</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Date, time, and location", desc: "Exact details of when and where the incident occurred" },
                    { label: "Details of the injured person", desc: "Name, occupation, employer, nature of injury" },
                    { label: "Description of the incident", desc: "What happened, how the fire started, how it developed" },
                    { label: "Immediate actions taken", desc: "Evacuation, fire-fighting attempts, first aid administered" },
                    { label: "Notifier details", desc: "Name, position, and contact details of the person making the report" },
                    { label: "Premises details", desc: "Nature of the premises, activities carried on, fire safety measures in place" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Record Retention</p>
                <p className="text-sm text-white/80">
                  A copy of every RIDDOR report must be retained for a minimum of <strong>3 years</strong> from the date of the incident. This is a legal requirement under RIDDOR Regulation 12. The HSE online reporting system automatically generates a reference number and stores the report, but the responsible person should also retain their own copy as part of the premises fire safety records.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Internal Reporting Procedures                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">03</span>
              Internal Reporting Procedures
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond the statutory RIDDOR requirements, every organisation needs robust <strong>internal fire incident reporting procedures</strong>. These procedures capture incidents that may not reach the RIDDOR threshold but are still vital for fire safety management, learning, and continuous improvement.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Internal Reporting Framework</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Near-Miss Reporting</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Near-misses are events that could have resulted in a fire but did not &mdash; for example, a faulty socket that sparked, an unattended cooking appliance, or combustible materials stored near a heat source. Every near-miss should be reported using a simple, accessible reporting form (paper or digital). A no-blame culture is essential: employees must feel safe reporting near-misses without fear of disciplinary action. Near-miss data is one of the most valuable tools for preventing actual fires.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Fire Log Book</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The internal fire log book is the central record of all fire-related events on the premises. It should record: all fire alarm activations (genuine and false), all fire incidents (regardless of size), near-miss reports, fire drill dates and results, fire safety equipment testing and maintenance, fire safety training delivered, and any fire safety inspections or audits. The log book may be physical or electronic but must be readily accessible and kept up to date.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Escalation Procedures</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Clear escalation procedures define who should be notified and in what order following a fire incident. A typical escalation chain might be: fire marshals &rarr; facility/building manager &rarr; health and safety manager &rarr; senior management &rarr; HR (if injuries) &rarr; legal/compliance (if RIDDOR-reportable). Each level should have defined response timeframes and responsibilities. Out-of-hours contacts must be established.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Several external parties may also need to be notified following a fire incident, depending on the circumstances:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Insurance company</strong> &mdash; notify the insurer as soon as practicable after any fire, regardless of the apparent severity. Failure to notify promptly may invalidate the insurance policy or prejudice a claim. The insurer may wish to appoint their own loss adjuster or fire investigator</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Landlord or managing agent</strong> &mdash; if the premises are leased or part of a multi-occupied building, the landlord or managing agent must be informed. They have responsibilities for common parts, shared fire safety systems, and the building&rsquo;s overall fire risk assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Staff and occupants</strong> &mdash; communicate factual information to all staff about what happened, any temporary arrangements (relocated assembly points, alternative exits), and any interim fire safety measures in place. Avoid speculation about the cause until the investigation is complete</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Utility providers</strong> &mdash; if the fire has affected gas, electricity, or water supplies, the relevant utility companies should be contacted to make the supplies safe and arrange reinstatement</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Communicating with Staff After a Fire</p>
                <p className="text-sm text-white/80">
                  Effective communication with staff following a fire incident is crucial. Staff will be anxious about safety, the cause of the fire, and any impact on their work. The responsible person should provide timely, factual updates; avoid assigning blame or speculating on the cause before the investigation is complete; explain any temporary fire safety arrangements; reassure staff that a thorough investigation is under way; and invite staff to contribute any information they may have about the incident. A formal staff briefing, followed by a written communication, is good practice for any significant fire incident.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Fire Investigation Process                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">04</span>
              Fire Investigation Process
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A systematic fire investigation is essential to determine the <strong>cause</strong>, <strong>origin</strong>, and <strong>development</strong> of the fire. Understanding why a fire occurred is the foundation for preventing recurrence. The investigation process follows a structured methodology, beginning with scene preservation and ending with a formal report.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Scene Preservation</p>
                </div>
                <p className="text-xs text-white/70 mb-3">
                  Scene preservation is the single most important step in any fire investigation. Once evidence is lost or contaminated, it cannot be recovered.
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Cordon Off the Scene</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Immediately establish a physical cordon around the fire-affected area using barrier tape, fencing, or other means. The cordon should extend well beyond the visible fire damage to protect potential evidence on the periphery. Only authorised personnel should be allowed within the cordon. Appoint a person to maintain the cordon log, recording anyone who enters or leaves the scene.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Prevent Disturbance</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Do not allow any clean-up, salvage, or repair activities until the scene is formally released by investigators. Do not move debris, discard damaged items, or alter the position of any objects. Even well-intentioned actions &mdash; such as covering a damaged roof or boarding up windows &mdash; can disturb critical evidence. The scene should remain in the condition the fire service left it after extinguishing the fire.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Evidence Gathering</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Witness Statements</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Collect statements from all witnesses as soon as practicable after the incident, while memories are fresh. Witnesses include: the person who discovered the fire, anyone who attempted to extinguish it, fire marshals, emergency services personnel, and anyone in the building at the time. Statements should cover what the witness saw, heard, and smelt; the sequence of events; the behaviour of the fire alarm; and any actions they took.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">CCTV Footage</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Secure all CCTV footage immediately. Many systems overwrite footage on a rolling cycle (often 14&ndash;30 days), so early preservation is essential. Footage from both internal and external cameras should be secured, as it may show the origin, development, and spread of the fire, as well as the movements of persons before, during, and after the incident.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Fire Alarm &amp; System Logs</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Download and preserve the fire alarm system log, which records the sequence and timing of detector activations, call point activations, and system faults. This data provides an invaluable timeline of how the fire developed and spread through the building. Also preserve any logs from sprinkler systems, smoke control systems, access control systems, and building management systems.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Maintenance Records</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Gather all relevant maintenance records, including: electrical installation condition reports (EICRs), portable appliance testing (PAT) records, fire alarm and detection system maintenance logs, gas safety certificates, fire extinguisher service records, and any recent repair or installation work. These records may reveal whether equipment failure or inadequate maintenance contributed to the fire.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Photographs &amp; Physical Evidence</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Comprehensive photographic records of the fire scene are essential. Photographs should be taken systematically: overall views from multiple angles, mid-range views showing the relationship between different areas, and close-up views of specific items of interest. Physical evidence &mdash; such as damaged electrical equipment, remnants of ignition sources, or samples of materials involved in the fire &mdash; should be collected, labelled, and stored securely for later examination.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Timeline reconstruction</strong> is a critical part of the investigation. Using the evidence gathered &mdash; witness statements, CCTV footage, alarm logs, and physical evidence &mdash; the investigator builds a detailed timeline from the earliest indication of a problem through to the fire being extinguished. This timeline helps identify the point of origin, the cause of ignition, and the factors that contributed to fire growth and spread.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Root Cause Analysis                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">05</span>
              Root Cause Analysis
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Identifying the <strong>immediate cause</strong> of a fire &mdash; the physical ignition mechanism &mdash; is only the first step. A thorough investigation must also identify the <strong>root cause</strong> (the underlying systemic failure) and any <strong>contributing factors</strong> that allowed the fire to occur, develop, or cause harm. Without addressing the root cause, the conditions for another fire remain in place.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Three Levels of Cause</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Immediate Cause</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The direct physical mechanism that started the fire. Examples: an overheated electrical cable, a discarded cigarette, an unattended cooking appliance, a spark from hot-work igniting combustible material. This is the &ldquo;what happened&rdquo; of the incident.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Root Cause</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The underlying systemic failure that allowed the conditions for the fire to exist. Examples: a failure to maintain electrical installations to schedule, absence of a hot-work permit system, inadequate fire risk assessment that failed to identify the hazard. This is the &ldquo;why it was allowed to happen&rdquo; of the incident.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Contributing Factors</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Additional factors that did not directly cause the fire but contributed to its occurrence, severity, or impact. Examples: poor housekeeping that increased the fuel load, a propped-open fire door that allowed smoke spread, a faulty fire alarm that delayed detection, inadequate training that resulted in incorrect use of a fire extinguisher. Addressing contributing factors is essential for a comprehensive prevention strategy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-4 text-center">The 5 Whys Technique &mdash; Example Fire Investigation</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm font-medium text-white">Why did the fire start?</p>
                      <p className="text-xs text-white/70">An electrical cable overheated and ignited nearby combustible materials.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm font-medium text-white">Why did the cable overheat?</p>
                      <p className="text-xs text-white/70">The cable was overloaded &mdash; it was carrying more current than its rated capacity.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="text-sm font-medium text-white">Why was the cable overloaded?</p>
                      <p className="text-xs text-white/70">Additional equipment was connected to the circuit when the office was expanded six months ago.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <p className="text-sm font-medium text-white">Why were no additional circuits installed?</p>
                      <p className="text-xs text-white/70">No electrical review was conducted when the office layout was changed.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">5</div>
                    <div>
                      <p className="text-sm font-medium text-white">Why was there no electrical review?</p>
                      <p className="text-xs text-white/70"><strong className="text-rose-400">Root Cause:</strong> There is no organisational process requiring an electrical capacity review when office layouts or equipment loads change.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Other root cause analysis techniques commonly used in fire investigation include:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Fishbone (Ishikawa) diagram</strong> &mdash; a visual tool that categorises potential causes into groups such as People, Procedures, Equipment, Environment, Materials, and Management. The &ldquo;head&rdquo; of the fish represents the fire, and the &ldquo;bones&rdquo; branch out into contributing factors. This technique is particularly useful for complex incidents with multiple potential causes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Fault tree analysis</strong> &mdash; a top-down, deductive analysis that starts with the fire (the &ldquo;top event&rdquo;) and works backwards through a logical tree of events and conditions that could have caused it. Each branch represents a different causal pathway, connected by logical AND/OR gates. Fault tree analysis is more formal and is often used for complex industrial incidents</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Bow-tie analysis</strong> &mdash; combines a fault tree (showing causes) with an event tree (showing consequences) around a central &ldquo;top event&rdquo; (the fire). The left side shows preventive barriers that failed, and the right side shows mitigating barriers that either worked or failed. This provides a comprehensive view of both prevention and mitigation</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Lessons Learned                                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">06</span>
              Lessons Learned
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The ultimate purpose of any fire investigation is not merely to determine what happened, but to <strong>prevent it from happening again</strong>. The lessons learned process translates investigation findings into practical improvements that strengthen fire safety across the organisation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Turning Findings into Action</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Recommendations from Investigation</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The investigation report should include specific, measurable, achievable, and time-bound recommendations. Each recommendation should identify who is responsible for implementation and by when. Recommendations should address the root cause and contributing factors, not just the immediate cause. For example: &ldquo;Implement a mandatory electrical capacity review process for all office layout changes, to be completed before any equipment is relocated. Responsible: Facilities Manager. Deadline: 30 days.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Updating the Fire Risk Assessment</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Every fire incident &mdash; and every significant near-miss &mdash; should trigger a review of the fire risk assessment. The review must consider whether the existing risk assessment adequately identified the hazard that caused the fire, whether the control measures were adequate, whether new hazards have been created (damaged fire protection, compromised escape routes), and what additional control measures are needed to prevent recurrence. The updated assessment must be recorded and communicated to all relevant persons.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Revising Procedures</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Fire safety procedures, policies, and training materials should be reviewed and updated to reflect the lessons learned. This may include: updating the fire action plan, revising evacuation procedures, adding new permit-to-work requirements, introducing additional fire safety checks, and incorporating the incident as a case study in fire safety training. Changed procedures must be communicated to all affected staff and, where appropriate, practised through fire drills.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Communicating findings</strong> is essential for organisational learning. The lessons learned should be shared through:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Staff briefings</strong> &mdash; present the key findings and new procedures to all staff in a clear, accessible format. Focus on what has changed and why, not on blame</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Safety bulletins</strong> &mdash; circulate written safety alerts or bulletins summarising the incident and the lessons learned, particularly if the organisation has multiple sites</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Training updates</strong> &mdash; incorporate the incident as a case study in fire safety training programmes so that the learning reaches all new starters as well as existing staff</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Industry sharing</strong> &mdash; consider sharing anonymised lessons with industry bodies, trade associations, and fire authority publications. The fire and rescue service publishes investigation summaries; trade bodies circulate safety alerts; and organisations such as the Institution of Fire Engineers share learning through their professional networks</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Tracking Corrective Actions</p>
                <p className="text-sm text-white/80">
                  Recommendations are worthless if they are not implemented. Establish a formal corrective action tracking system (this may be part of a broader health and safety management system) that records each recommendation, assigns responsibility and deadlines, tracks progress, and provides evidence of completion. The responsible person should review the tracker regularly and escalate any overdue actions. Completion of corrective actions should be verified through inspection or audit, not simply accepted as done.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: Fire Service Investigation                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">07</span>
              Fire Service Investigation
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Fire and Rescue Services Act 2004</strong> gives fire and rescue authorities extensive powers to investigate the cause and origin of fires. Understanding these powers and the cooperation requirements placed on the responsible person is essential for fire marshals and building managers.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Fire Investigation Officers&rsquo; Powers</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Entry and Examination</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Fire investigation officers have the power to enter any premises where a fire has occurred or is suspected of having occurred. They may examine and investigate the scene, take measurements, photographs, and recordings, and carry out any examination or investigation necessary to determine the cause and origin of the fire. They do not require the permission of the occupier or owner to enter, although they must produce identification if requested.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Evidence Collection</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Fire investigation officers may take samples of any materials or substances found at the scene. They have the power to seize and detain any article or substance for the purpose of examination or use as evidence. They can require the production of any documents, records, or other items relevant to the investigation. Obstruction of a fire investigation officer exercising these powers is a criminal offence.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Information Gathering</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Fire investigation officers can require any person to provide information and answer questions relevant to the investigation. They may be accompanied by any other person they consider necessary, including scientific advisers, forensic specialists, or representatives of other agencies. The information gathered may be shared with other investigating bodies (police, HSE) where appropriate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Joint Investigations</p>
                </div>
                <p className="text-xs text-white/70 mb-3">
                  Depending on the circumstances, multiple agencies may investigate a fire simultaneously.
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Fire Service &amp; Police (Arson Suspected)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      If the fire investigation reveals evidence of arson (deliberate fire-setting), the police will become involved in a <strong>criminal investigation</strong>. The fire investigation officer and the police will typically conduct a joint investigation, with the fire investigator focusing on the technical cause and origin, and the police focusing on identifying suspects, motives, and gathering evidence for prosecution. The scene becomes a crime scene and is subject to the more stringent rules of criminal evidence handling.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Fire Service &amp; HSE (Workplace Incidents)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      If the fire occurred in a workplace and resulted in injury or death, the <strong>Health and Safety Executive</strong> (HSE) or the local authority environmental health department may also investigate under the Health and Safety at Work etc. Act 1974. The HSE&rsquo;s focus is on whether the employer complied with their duties under health and safety legislation and the RRFSO. The fire service and HSE will coordinate their investigations to avoid duplication and ensure comprehensive coverage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Cooperation Requirements</p>
                <p className="text-sm text-white/80">
                  The responsible person and all employees have a duty to cooperate fully with fire investigation officers and any other investigating agencies. This includes: providing access to all areas of the premises; producing all requested documents and records; making relevant staff available for interview; not interfering with or concealing evidence; and facilitating the investigation in every reasonable way. Failure to cooperate can constitute a criminal offence and may also result in adverse inferences being drawn during any subsequent enforcement or prosecution proceedings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Record Keeping                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">08</span>
              Record Keeping
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Comprehensive fire safety record keeping is not merely good practice &mdash; it is a <strong>legal requirement</strong> under the RRFSO and a critical element of demonstrating compliance. Records provide the evidence base for the fire risk assessment, document the effectiveness of fire safety measures, and create an audit trail that is invaluable during inspections, investigations, and enforcement proceedings.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <FolderOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Essential Fire Safety Records</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Fire alarm activations", desc: "Every activation: date, time, zone, cause (genuine alarm, false alarm, testing)" },
                    { label: "False alarms", desc: "Recorded separately to identify patterns and reduce unwanted alarms — a high false alarm rate can lead to complacency" },
                    { label: "Fire drills", desc: "Date, time, evacuation time, number of occupants, observations, fire marshal performance, corrective actions" },
                    { label: "Equipment maintenance", desc: "Extinguisher servicing, alarm system maintenance, emergency lighting testing, sprinkler inspections, fire door checks" },
                    { label: "Training records", desc: "Who was trained, when, by whom, on what topics, assessment results, refresher dates" },
                    { label: "Fire incidents", desc: "All incidents regardless of severity, including near-misses: date, time, location, description, persons involved, actions taken" },
                    { label: "Investigation reports", desc: "Formal investigation findings, root cause analysis, recommendations, corrective actions, and evidence of implementation" },
                    { label: "Fire risk assessment", desc: "The current assessment plus all previous versions, showing the review history and how risks have been managed over time" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Retention Periods</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">RIDDOR Reports</p>
                      <p className="text-sm font-bold text-rose-400">Minimum 3 Years</p>
                    </div>
                    <p className="text-xs text-white/70">As required by RIDDOR Regulation 12. Many organisations retain these for longer as a matter of good practice.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Fire Risk Assessment</p>
                      <p className="text-sm font-bold text-rose-400">Permanently</p>
                    </div>
                    <p className="text-xs text-white/70">The current assessment must be available at all times. Previous versions should be retained to demonstrate the history of risk management.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Maintenance &amp; Testing Records</p>
                      <p className="text-sm font-bold text-rose-400">Minimum 3 Years</p>
                    </div>
                    <p className="text-xs text-white/70">Equipment servicing, alarm testing, emergency lighting tests, fire door inspections. Retain for at least the life of the equipment plus 3 years.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Training Records</p>
                      <p className="text-sm font-bold text-rose-400">Duration of Employment + 3 Years</p>
                    </div>
                    <p className="text-xs text-white/70">Retain for the duration of the person&rsquo;s employment plus at least 3 years after they leave. This provides evidence of training in case of a later claim.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Fire Drill Records</p>
                      <p className="text-sm font-bold text-rose-400">Minimum 3 Years</p>
                    </div>
                    <p className="text-xs text-white/70">Date, time, evacuation time, observations, and corrective actions. Longer retention is advisable to demonstrate a consistent programme of drills.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Availability for Inspection</p>
                <p className="text-sm text-white/80">
                  All fire safety records must be readily available for inspection by <strong>fire authority enforcement officers</strong> during routine inspections, audits, or following an incident. Under Article 27 of the RRFSO, inspectors have the power to require the production of any documents or records kept under the Order. Failure to produce records when requested can result in enforcement action. Records should be well-organised, clearly indexed, and stored in a known and accessible location. If electronic, ensure they are backed up and can be produced in a printable format. A fire safety records management system &mdash; whether a simple filing cabinet or a digital platform &mdash; should be established and maintained by a designated person.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  INCIDENT INVESTIGATION FLOWCHART DIAGRAM                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-rose-500/20">
            <h3 className="text-sm font-semibold text-rose-400 mb-4 flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              Incident Investigation Flowchart
            </h3>
            <div className="space-y-3">
              {/* Stage 1: Discovery */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">FIRE DISCOVERED / EXTINGUISHED</p>
                <p className="text-[10px] text-white/50 mt-1">Immediate response complete, scene made safe by fire service</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>

              {/* Stage 2: Scene Preservation */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-white">SCENE PRESERVATION</p>
                <p className="text-[10px] text-white/50">Cordon area, prevent access, appoint scene custodian, secure CCTV</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>

              {/* Stage 3: Reporting */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2 text-center">
                  <AlertTriangle className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-rose-400">EXTERNAL REPORTING</p>
                  <p className="text-[10px] text-white/50">RIDDOR (if applicable), fire authority, insurer, landlord</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2 text-center">
                  <ClipboardList className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-rose-400">INTERNAL REPORTING</p>
                  <p className="text-[10px] text-white/50">Fire log book, escalation chain, staff communication</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>

              {/* Stage 4: Investigation */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-white">EVIDENCE GATHERING</p>
                <p className="text-[10px] text-white/50">Witness statements, CCTV, alarm logs, maintenance records, photographs, physical evidence</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>

              {/* Stage 5: Analysis */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-white">ROOT CAUSE ANALYSIS</p>
                <p className="text-[10px] text-white/50">5 Whys, fishbone diagram, fault tree &mdash; identify immediate cause, root cause, contributing factors</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-rose-500/30" />
              </div>

              {/* Stage 6: Actions */}
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-rose-400">CORRECTIVE ACTIONS</p>
                <p className="text-[10px] text-white/50 mt-1">Update fire risk assessment, revise procedures, communicate findings, track implementation</p>
              </div>
              <p className="text-xs text-white/50 text-center mt-4">
                The investigation process is iterative &mdash; new evidence may require revisiting earlier stages. Formal reports should be produced at each stage and retained as part of fire safety records.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  END-OF-SECTION QUIZ                                          */}
        {/* ============================================================ */}
        <Quiz
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fire Blankets &amp; Hose Reels
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-5-section-4">
              Post-Incident Procedures
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
