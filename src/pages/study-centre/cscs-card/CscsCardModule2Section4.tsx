import { ArrowLeft, CheckCircle, AlertTriangle, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "riddor-time-limit",
    question: "Within how many days must most reportable injuries be reported under RIDDOR?",
    options: [
      "7 days",
      "10 days",
      "14 days",
      "28 days"
    ],
    correctIndex: 1,
    explanation: "Most reportable injuries under RIDDOR must be reported within 10 days. Deaths and specified injuries must be reported immediately by the quickest practicable means (usually telephone), then followed up with a written report within 10 days. Over-7-day incapacitation injuries have a 15-day reporting window."
  },
  {
    id: "reportable-injury-type",
    question: "Which of the following is classified as a 'specified injury' under RIDDOR?",
    options: [
      "A broken finger",
      "An amputation",
      "A minor burn requiring first aid only",
      "A bruised knee"
    ],
    correctIndex: 1,
    explanation: "An amputation is a specified injury under RIDDOR. Specified injuries include fractures (other than fingers, toes, or nose), amputations, loss of sight, crush injuries to the head or torso, burns covering more than 10% of the body, and scalping. A broken finger is specifically excluded from the specified injuries list."
  },
  {
    id: "near-miss-importance",
    question: "According to Heinrich's triangle, for every major injury how many near-misses typically occur?",
    options: [
      "10",
      "29",
      "100",
      "300"
    ],
    correctIndex: 3,
    explanation: "Heinrich's triangle (also known as the safety triangle or accident pyramid) proposes that for every 1 major/fatal injury, there are approximately 29 minor injuries and 300 near-misses or unsafe acts. This is why near-miss reporting is so important — addressing near-misses helps prevent the more serious incidents higher up the triangle."
  }
];

const faqs = [
  {
    question: "Who is responsible for reporting under RIDDOR?",
    answer: "The 'responsible person' under RIDDOR is the employer, the self-employed person, or the person in control of the premises where work is carried out. On construction sites, this is usually the principal contractor. If you are an employee and you suffer an injury, it is your employer's duty to make the RIDDOR report — not yours. However, you must ensure that your employer is informed of any reportable injury, disease, or dangerous occurrence so that the report can be made within the required time limits. If you are self-employed, you must make the report yourself."
  },
  {
    question: "What happens if a RIDDOR report is not made?",
    answer: "Failure to report under RIDDOR is a criminal offence. The HSE can prosecute employers who fail to report, and fines can be significant — particularly if the failure is discovered during an investigation into a subsequent incident. Beyond the legal consequences, failure to report means that the HSE does not have accurate data on workplace injuries and dangerous occurrences, which undermines the ability to identify trends and target enforcement activity. It also means that lessons are not learned and similar incidents may recur."
  },
  {
    question: "Do I need to report a near-miss under RIDDOR?",
    answer: "Not all near-misses are reportable under RIDDOR. RIDDOR only requires the reporting of specific 'dangerous occurrences' — defined categories of events that had the potential to cause serious harm, such as scaffold collapse, crane overturning, excavation collapse, or incidents involving overhead power lines. Everyday near-misses (such as a tool falling from height but not striking anyone) are not RIDDOR-reportable, but they should still be recorded in your company's internal near-miss reporting system. Internal near-miss reporting is a vital part of creating a proactive safety culture."
  },
  {
    question: "What information should be included in an accident book entry?",
    answer: "An accident book entry (BI 510 format) should include: the date, time, and location of the incident; the name and occupation of the injured person; details of the injury or condition; a brief description of how the incident happened; the name of the person making the entry; and any first aid or medical treatment given. Under GDPR, completed pages must be stored securely and access must be restricted to authorised personnel. Entries should be factual and objective — describe what happened, not who you think was to blame. The accident book must be kept for at least three years from the date of the last entry."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of accident reporting on construction sites?",
    options: [
      "To assign blame to the person responsible",
      "To learn from incidents and prevent recurrence",
      "To reduce the employer's insurance premiums",
      "To satisfy union requirements"
    ],
    correctAnswer: 1,
    explanation: "The primary purpose of accident reporting is to learn from incidents and prevent recurrence. While accident data may affect insurance and is a legal requirement, the fundamental reason for reporting is to identify what went wrong, why it went wrong, and what changes are needed to prevent similar incidents in the future. Reporting should never be about assigning blame."
  },
  {
    id: 2,
    question: "What does RIDDOR stand for?",
    options: [
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "Recording of Industrial Damages, Diseases and Operational Risks",
      "Regulation of Injuries, Deaths and Dangerous Occupational Risks",
      "Reporting of Industrial Diseases and Dangerous Outcomes Regulations"
    ],
    correctAnswer: 0,
    explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations. The current version is RIDDOR 2013. These regulations require employers, the self-employed, and people in control of work premises to report certain workplace injuries, occupational diseases, and specified dangerous occurrences to the HSE."
  },
  {
    id: 3,
    question: "Which of the following must be reported to the HSE immediately by telephone?",
    options: [
      "An over-7-day incapacitation injury",
      "A case of occupational dermatitis",
      "A death resulting from a work-related accident",
      "A near-miss where no one was hurt"
    ],
    correctAnswer: 2,
    explanation: "Deaths resulting from work-related accidents must be reported to the HSE immediately by the quickest practicable means — usually by telephone to the HSE's Incident Contact Centre. This must be followed up with a written report within 10 days. Over-7-day incapacitation injuries must be reported within 15 days but do not require an immediate telephone call."
  },
  {
    id: 4,
    question: "An electrician breaks their ankle falling from a stepladder on site and cannot work for 10 days. How should this be reported under RIDDOR?",
    options: [
      "It does not need to be reported",
      "It must be reported as a specified injury (fracture) within 10 days",
      "It must be reported as an over-7-day incapacitation within 15 days",
      "It only needs to be recorded in the accident book"
    ],
    correctAnswer: 1,
    explanation: "A broken ankle is a fracture other than to fingers, toes, or nose, which makes it a specified injury under RIDDOR. Specified injuries must be reported within 10 days of the incident. The fact that the worker was incapacitated for more than 7 days is also relevant, but the specified injury classification takes precedence because it requires reporting regardless of the incapacitation period."
  },
  {
    id: 5,
    question: "Which of the following is a RIDDOR-reportable dangerous occurrence on a construction site?",
    options: [
      "A worker tripping over a cable but not being injured",
      "The collapse of a scaffold",
      "A minor disagreement between workers about safe methods",
      "A delivery truck arriving late to site"
    ],
    correctAnswer: 1,
    explanation: "The collapse, overturning, or failure of load-bearing parts of a scaffold is a RIDDOR-reportable dangerous occurrence. Dangerous occurrences are specific categories of events defined in Schedule 2 of RIDDOR that had the potential to cause death or serious injury, regardless of whether anyone was actually hurt. A worker tripping over a cable is a near-miss but not a dangerous occurrence under RIDDOR."
  },
  {
    id: 6,
    question: "What is the significance of Heinrich's triangle (the 1:29:300 ratio)?",
    options: [
      "It shows that 300 workers are needed for every safety officer",
      "It demonstrates the relationship between near-misses, minor injuries, and major incidents",
      "It sets the legal limit for the number of accidents per year",
      "It determines how many first aiders are required on site"
    ],
    correctAnswer: 1,
    explanation: "Heinrich's triangle demonstrates the statistical relationship between near-misses (300), minor injuries (29), and major/fatal injuries (1). The key insight is that near-misses and minor injuries are leading indicators of major incidents — by investigating and addressing near-misses, organisations can prevent the more serious incidents that sit at the top of the triangle."
  },
  {
    id: 7,
    question: "During an accident investigation, what is the purpose of the '5 Whys' technique?",
    options: [
      "To interview exactly five witnesses",
      "To identify the root cause by asking 'why' repeatedly until the underlying cause is found",
      "To complete five separate investigation reports",
      "To ensure the investigation takes no more than five days"
    ],
    correctAnswer: 1,
    explanation: "The '5 Whys' technique is a root cause analysis method. You start with the incident and ask 'why did this happen?' — then take the answer and ask 'why?' again, repeating the process (typically around five times, though it may be more or fewer) until you reach the underlying root cause. This prevents investigators from stopping at the immediate cause and ensures that systemic issues are identified and addressed."
  },
  {
    id: 8,
    question: "After a serious accident on a construction site, what is the FIRST thing that should happen?",
    options: [
      "Complete a RIDDOR report online",
      "Make the area safe and provide first aid to the injured person",
      "Take photographs of the scene for social media",
      "Interview all witnesses immediately"
    ],
    correctAnswer: 1,
    explanation: "The immediate priority after any serious accident is to make the area safe (to prevent further injuries) and provide first aid to the injured person. Life-saving actions and preventing further harm always come first. Once the immediate emergency is dealt with, the scene should be preserved for investigation, the employer notified, and RIDDOR reporting initiated as required. Witness statements and detailed investigation follow after the immediate response."
  }
];

export default function CscsCardModule2Section4() {
  useSEO({
    title: "Accident Reporting & RIDDOR | CSCS Card Module 2.4",
    description: "Learn about accident reporting requirements, RIDDOR regulations, reportable injuries, dangerous occurrences, near-miss reporting, and investigation processes for the CSCS Card exam.",
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
            <Link to="../cscs-card-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <ClipboardList className="h-7 w-7 text-green-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-500 text-xs font-semibold">MODULE 2 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Accident Reporting &amp; RIDDOR
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding your legal duties to report accidents, the RIDDOR regulations, what makes an incident reportable, and how investigations prevent future harm
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Legal duty:</strong> Employers must report certain incidents to the HSE</li>
              <li><strong>RIDDOR 2013:</strong> Covers deaths, specified injuries, diseases, dangerous occurrences</li>
              <li><strong>Time limits:</strong> Immediate for deaths, 10 days for most, 15 days for over-7-day</li>
              <li><strong>Near-misses:</strong> Internal reporting prevents future incidents</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Always:</strong> Record every accident in the accident book</li>
              <li><strong>Report:</strong> All near-misses through your company&rsquo;s system</li>
              <li><strong>Preserve:</strong> The scene after a serious accident</li>
              <li><strong>Never:</strong> Ignore a near-miss &mdash; it could prevent a fatality</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why accident reporting is a legal duty and a safety necessity",
              "Describe the accident book requirements and GDPR considerations",
              "Outline the scope and purpose of RIDDOR 2013",
              "List the categories of reportable injuries, diseases, and dangerous occurrences",
              "Explain the value of near-miss reporting and Heinrich's triangle",
              "Describe the steps in a post-accident investigation, including root cause analysis"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Report Accidents? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">01</span>
            Why Report Accidents?
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Accident reporting is not optional &mdash; it is a <strong>legal duty</strong> under the
                Health and Safety at Work etc. Act 1974 and the Reporting of Injuries, Diseases and
                Dangerous Occurrences Regulations 2013 (RIDDOR). Every employer, self-employed person,
                and person in control of work premises has a responsibility to report certain types of
                workplace incidents to the Health and Safety Executive (HSE).
              </p>

              <p>
                But accident reporting is about far more than satisfying a legal requirement. It is the
                foundation of a <strong>learning culture</strong> in which incidents are investigated,
                root causes identified, and changes made to prevent the same thing happening again. Without
                accurate reporting, organisations are blind to the hazards in their workplaces and unable
                to protect their workers.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-500 mb-3">Why Reporting Matters</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Legal compliance</strong> &mdash; failure to report under RIDDOR is a criminal offence that can result in prosecution and significant fines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Learning from incidents</strong> &mdash; every accident and near-miss contains valuable information about what went wrong and why, enabling improvements to working methods and risk assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Preventing recurrence</strong> &mdash; investigation and corrective action break the chain of causation so the same hazard does not injure someone else</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Insurance requirements</strong> &mdash; employers&rsquo; liability insurance policies require prompt reporting of accidents, and failure to report can invalidate claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">HSE statistics</strong> &mdash; RIDDOR data feeds into national statistics that help the HSE identify high-risk industries, target inspections, and develop guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Safety culture</strong> &mdash; a workplace that reports and investigates incidents openly (without blame) builds trust and encourages workers to speak up about hazards before someone is hurt</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Construction Is High Risk</p>
                </div>
                <p className="text-sm text-white/80">
                  Construction consistently has one of the <strong className="text-white">highest rates
                  of fatal and serious injuries</strong> of any UK industry. In the most recent HSE
                  statistics, construction accounted for approximately 25% of all worker fatalities despite
                  employing only around 5% of the workforce. Falls from height, being struck by moving
                  objects, and being trapped by collapsing structures are the leading causes. Accurate
                  accident reporting is essential for targeting prevention efforts where they are most needed.
                </p>
              </div>

              <p>
                Every worker on a construction site &mdash; whether directly employed, self-employed, or
                agency &mdash; has a <strong>moral and legal responsibility</strong> to report accidents,
                near-misses, and unsafe conditions. Reporting is not &ldquo;grassing&rdquo; or
                &ldquo;making trouble&rdquo; &mdash; it is protecting yourself and your workmates from
                harm.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Accident Books & Internal Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">02</span>
            Accident Books &amp; Internal Reporting
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every employer who employs <strong>10 or more people</strong> is required by the Social
                Security (Claims and Payments) Regulations 1979 to keep an <strong>accident book</strong>.
                In practice, most construction employers maintain an accident book regardless of their
                size, because it is good practice and provides a contemporaneous record of incidents.
              </p>

              <p>
                The standard accident book in the UK is the <strong>BI 510</strong>, published by the
                HSE. The current version is designed to comply with the General Data Protection Regulation
                (GDPR) and the Data Protection Act 2018, with perforated, tear-out pages that can be
                removed and stored securely once completed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What to Record in the Accident Book</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Date, time, and location</strong> &mdash; when and where the incident occurred (be specific: &ldquo;Block C, second floor, corridor outside Room 214&rdquo;)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Name and occupation</strong> &mdash; the full name and job title of the injured person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Details of the injury</strong> &mdash; what part of the body was injured and the nature of the injury (e.g., &ldquo;laceration to left hand&rdquo;, &ldquo;bruising to right knee&rdquo;)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Description of the incident</strong> &mdash; a factual account of what happened (e.g., &ldquo;stepped on loose board, board tipped, fell approximately 0.5m onto concrete floor&rdquo;)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">First aid or treatment given</strong> &mdash; what immediate care was provided and by whom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Name of person making the entry</strong> &mdash; which may be the injured person, a witness, or a supervisor</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-500 mb-3">GDPR Considerations</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Completed accident book pages contain <strong className="text-white">personal data</strong> (names, injury details) and must be stored securely with restricted access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>The current BI 510 format uses <strong className="text-white">tear-out pages</strong> so that completed entries can be removed from the book and filed securely, preventing other workers from seeing previous entries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Accident records must be retained for at least <strong className="text-white">three years</strong> from the date of the last entry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>For incidents involving minors (under 18), additional care must be taken with data handling and parental notification</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Near-Miss Reporting Systems</p>
                <p className="text-sm text-white/80 mb-3">
                  In addition to the accident book, most construction companies operate an <strong className="text-white">internal
                  near-miss reporting system</strong>. This may be a paper-based form, a digital app, or
                  a card system. Near-miss reports capture incidents that did not result in injury but had
                  the potential to cause harm. Common methods include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Observation cards</strong> &mdash; workers carry pocket-sized cards to record unsafe conditions or behaviours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Digital reporting apps</strong> &mdash; smartphone-based systems allow workers to photograph hazards and submit reports instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Toolbox talk discussions</strong> &mdash; near-misses are raised and discussed during regular toolbox talks, with actions recorded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Safety boards</strong> &mdash; a visible board on site where near-misses are posted (anonymised) so everyone can learn from them</span>
                  </li>
                </ul>
              </div>

              <p>
                The employer has a duty to <strong>maintain records</strong> of all workplace accidents
                and near-misses. These records should be reviewed regularly to identify trends and
                recurring hazards. A pattern of similar near-misses in the same area, with the same
                equipment, or during the same task is a strong warning sign that a serious incident is
                likely unless action is taken.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: RIDDOR Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">03</span>
            RIDDOR Overview
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013</strong>
                (RIDDOR) are the regulations that set out when and how workplace incidents must be reported
                to the HSE. RIDDOR applies to all workplaces, not just construction, but given the high-risk
                nature of construction work, these regulations are particularly important for anyone
                working on a building site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Facts About RIDDOR</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Who must report:</strong> Employers, the self-employed, and people in control of work premises (on construction sites, this is usually the principal contractor)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">How to report:</strong> Online at <strong>riddor.hse.gov.uk</strong> (the preferred method) or by telephone to the HSE Incident Contact Centre for fatal and specified injuries that require immediate notification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">What must be reported:</strong> Deaths, specified injuries, over-7-day incapacitation, injuries to non-workers taken to hospital, reportable occupational diseases, and specified dangerous occurrences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Record keeping:</strong> The employer must keep a record of any RIDDOR-reportable incident for at least three years from the date it was made</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-500 mb-3">Time Limits for Reporting</p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[80px] h-7 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">IMMEDIATE</span>
                    <span><strong className="text-white">Deaths</strong> &mdash; must be reported immediately by telephone, followed by a written report within 10 days</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[80px] h-7 rounded bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">10 DAYS</span>
                    <span><strong className="text-white">Specified injuries</strong> &mdash; must be reported within 10 days of the incident</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[80px] h-7 rounded bg-yellow-500/20 text-yellow-400 text-xs font-bold flex-shrink-0">15 DAYS</span>
                    <span><strong className="text-white">Over-7-day incapacitation</strong> &mdash; must be reported within 15 days of the incident (the worker must be incapacitated for more than 7 consecutive days, not counting the day of the accident)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[80px] h-7 rounded bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">10 DAYS</span>
                    <span><strong className="text-white">Dangerous occurrences</strong> &mdash; must be reported within 10 days</span>
                  </div>
                </div>
              </div>

              {/* RIDDOR Reporting Flowchart */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-green-400">RIDDOR Reporting Flowchart</p>
                </div>
                <div className="p-4 space-y-3">
                  {/* Step 1 */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center min-w-[36px] h-9 rounded-lg bg-green-500/20 text-green-400 text-sm font-bold flex-shrink-0">1</div>
                    <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                      <p className="text-sm text-white font-medium">Incident occurs on site</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-green-500/30" />
                  </div>
                  {/* Step 2 */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center min-w-[36px] h-9 rounded-lg bg-green-500/20 text-green-400 text-sm font-bold flex-shrink-0">2</div>
                    <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                      <p className="text-sm text-white font-medium">Make safe &amp; provide first aid</p>
                      <p className="text-xs text-white/60">Life-saving actions always come first</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-green-500/30" />
                  </div>
                  {/* Step 3 */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center min-w-[36px] h-9 rounded-lg bg-green-500/20 text-green-400 text-sm font-bold flex-shrink-0">3</div>
                    <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                      <p className="text-sm text-white font-medium">Record in accident book (BI 510)</p>
                      <p className="text-xs text-white/60">All incidents, no matter how minor</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-green-500/30" />
                  </div>
                  {/* Step 4 — Decision */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center min-w-[36px] h-9 rounded-lg bg-yellow-500/20 text-yellow-400 text-sm font-bold flex-shrink-0">4</div>
                    <div className="flex-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2">
                      <p className="text-sm text-white font-medium">Is the incident RIDDOR-reportable?</p>
                      <p className="text-xs text-white/60">Death, specified injury, over-7-day, dangerous occurrence, or reportable disease?</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-8">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-red-500/30" />
                      <span className="text-xs text-red-400 font-semibold">YES</span>
                      <div className="w-0.5 h-4 bg-red-500/30" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-white/20" />
                      <span className="text-xs text-white/50 font-semibold">NO</span>
                      <div className="w-0.5 h-4 bg-white/20" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {/* YES path */}
                    <div className="space-y-2">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                        <p className="text-sm text-white font-medium">Report to HSE</p>
                        <p className="text-xs text-white/60">Deaths: immediately by phone</p>
                        <p className="text-xs text-white/60">Others: online at riddor.hse.gov.uk</p>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-0.5 h-3 bg-red-500/30" />
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                        <p className="text-sm text-white font-medium">Preserve scene</p>
                        <p className="text-xs text-white/60">Do not disturb evidence until authorised</p>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-0.5 h-3 bg-red-500/30" />
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                        <p className="text-sm text-white font-medium">Investigate &amp; take corrective action</p>
                      </div>
                    </div>
                    {/* NO path */}
                    <div className="space-y-2">
                      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                        <p className="text-sm text-white font-medium">Record internally</p>
                        <p className="text-xs text-white/60">Accident book + near-miss system</p>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-0.5 h-3 bg-white/20" />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                        <p className="text-sm text-white font-medium">Investigate as appropriate</p>
                        <p className="text-xs text-white/60">Proportionate to the severity/potential</p>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-0.5 h-3 bg-white/20" />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                        <p className="text-sm text-white font-medium">Implement corrective action &amp; monitor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-500">Key Point:</strong> Not every accident is
                  RIDDOR-reportable. A minor cut that needs a plaster is recorded in the accident book
                  but does not need to be reported to the HSE. However, if the same cut required hospital
                  treatment for a non-worker (a member of the public), it <em>would</em> be reportable.
                  Understanding the categories is essential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Reportable Injuries */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">04</span>
            Reportable Injuries
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                RIDDOR defines several categories of <strong>reportable injuries</strong>. Understanding
                these categories is essential for the CSCS test and for real-world practice on site. The
                categories are:
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">1. Deaths</p>
                <p className="text-sm text-white/80 mb-2">
                  Any death of a worker arising from a work-related accident must be reported <strong className="text-white">immediately</strong> by
                  telephone to the HSE Incident Contact Centre (0345 300 9923), and then followed up
                  with a written report within 10 days. If a worker dies within one year of a reportable
                  work-related injury, the employer must also notify the HSE, even if the original
                  injury was already reported.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">2. Specified Injuries</p>
                <p className="text-sm text-white/80 mb-3">
                  Specified injuries are serious injuries that must be reported within <strong className="text-white">10 days</strong>,
                  regardless of how long the worker is incapacitated. They include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Fractures</strong> &mdash; any fracture other than to fingers, thumbs, toes, or nose (so a broken arm, leg, rib, pelvis, or skull is reportable; a broken finger is not)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Amputations</strong> &mdash; the loss of any limb, digit, or part thereof (including traumatic amputations and surgical amputations resulting from a workplace injury)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Loss of sight</strong> &mdash; permanent loss of sight in one or both eyes, including a significant reduction in sight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Crush injuries</strong> &mdash; crush injuries to the head or torso causing damage to the brain or internal organs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Burns</strong> &mdash; burn injuries (including scalds) covering more than 10% of the body, or causing significant damage to the eyes, respiratory system, or other vital organs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Scalping</strong> &mdash; separation of the skin from the head</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Loss of consciousness</strong> &mdash; caused by head injury or asphyxia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Hypothermia or heat-induced illness</strong> &mdash; requiring resuscitation or hospital admission</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-yellow-400 mb-3">3. Over-7-Day Incapacitation</p>
                <p className="text-sm text-white/80">
                  If a worker is incapacitated (unable to perform their normal work duties) for
                  <strong className="text-white"> more than 7 consecutive days</strong> (not counting the
                  day of the accident), the incident must be reported within <strong className="text-white">15
                  days</strong> of the accident. For example, if a worker injures their back on Monday
                  and is unable to return to their normal duties until the following Wednesday (9 days
                  later, not counting Monday), this is an over-7-day incapacitation and must be reported.
                  Note that the 7 days includes weekends and rest days, not just working days.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">4. Injuries to Non-Workers</p>
                <p className="text-sm text-white/80">
                  If a member of the public, a visitor, or any other person who is <strong className="text-white">not
                  at work</strong> is injured as a result of a work activity and is taken directly to
                  hospital for treatment, this must be reported under RIDDOR. This is particularly relevant
                  on construction sites near public areas &mdash; for example, if falling debris injures
                  a pedestrian, or if a member of the public is injured by a site vehicle. The key test
                  is whether the person was taken to hospital; treatment on site by a first aider is not
                  sufficient to trigger the reporting requirement.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-500">CSCS Test Tip:</strong> Remember the exclusions
                  for specified injuries. Fractures to <strong>fingers, thumbs, toes, and the nose</strong> are
                  specifically excluded from the specified injuries list. They may still be reportable
                  as over-7-day incapacitation injuries if the worker cannot work for more than 7 days,
                  but they are not &ldquo;specified injuries&rdquo; in their own right.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Reportable Dangerous Occurrences */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">05</span>
            Reportable Dangerous Occurrences
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dangerous occurrences are specific categories of events that <strong>had the potential
                to cause death or serious injury</strong>, regardless of whether anyone was actually hurt.
                They are defined in Schedule 2 of RIDDOR and must be reported within 10 days. On
                construction sites, the most relevant dangerous occurrences include:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Dangerous Occurrences on Construction Sites</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Scaffold collapse</strong> &mdash; the collapse, overturning, or failure of load-bearing parts of scaffolding, including any scaffold where 5 metres or more of the scaffold has collapsed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Crane collapse or overturning</strong> &mdash; the collapse or overturning of any crane, mobile crane, tower crane, or hoist used in construction work, or the failure of any load-bearing part</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Electrical short circuit or overload causing fire or explosion</strong> &mdash; any electrical incident that results in a fire or explosion and causes a stoppage of the plant for more than 24 hours, or has the potential to cause death</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Unintended collapse of a building</strong> &mdash; the collapse or partial collapse of any building or structure under construction, including walls, floors, roofs, and false work (temporary support structures)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Excavation collapse</strong> &mdash; the collapse or partial collapse of any excavation (trench, pit, shaft, or tunnel) that is more than 1.5 metres deep, or any excavation adjacent to a building or road</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Gas incidents</strong> &mdash; accidental release of a substance that could cause death or serious injury, including gas leaks and chemical spillages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Incidents with overhead power lines</strong> &mdash; any plant or equipment (cranes, excavators, scaffold poles, ladders) making contact with or coming dangerously close to overhead power lines</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">No Injury Required</p>
                </div>
                <p className="text-sm text-white/80">
                  A dangerous occurrence must be reported <strong className="text-white">even if nobody
                  was hurt</strong>. The point of reporting dangerous occurrences is that they represent
                  events where serious injury or death <em>could</em> have occurred. A scaffold that
                  collapses at 3 a.m. when nobody is on site is just as reportable as one that collapses
                  while workers are on it. The purpose is to investigate <em>why</em> it happened and
                  prevent it from happening again when people are present.
                </p>
              </div>

              <p>
                Additional dangerous occurrences relevant to electricians include the <strong>explosion
                or fire caused by electrical equipment</strong>, <strong>uncontrolled release of
                substances</strong> from pipelines or storage, and incidents involving
                <strong> lifting equipment failure</strong>. If you witness any of these events on site,
                report them to your supervisor immediately so that the appropriate RIDDOR notification
                can be made.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Reportable Occupational Diseases */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">06</span>
            Reportable Occupational Diseases
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                RIDDOR also requires employers to report certain <strong>occupational diseases</strong> when
                they receive a written diagnosis from a doctor and the affected person&rsquo;s work involves
                a specific activity linked to the disease. Reporting is only required when there is a
                clear connection between the worker&rsquo;s occupation and the disease.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Reportable Occupational Diseases</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Carpal tunnel syndrome</strong> &mdash; caused by work involving regular use of percussive or vibrating tools, repeated forceful movements of the hand or wrist, or sustained pressure on the wrist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Occupational dermatitis</strong> &mdash; caused by work involving exposure to known skin sensitisers or irritants (cement, epoxy resins, solvents, cutting oils)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Hand-arm vibration syndrome (HAVS)</strong> &mdash; caused by regular use of hand-held vibrating tools such as breakers, grinders, hammer drills, and compactors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Occupational asthma</strong> &mdash; caused by work involving exposure to known respiratory sensitisers (isocyanates in paints and adhesives, wood dust, flour dust)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Tendonitis or tenosynovitis</strong> &mdash; caused by physically demanding work involving frequent or repeated movements, constrained postures, or high force</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Mesothelioma</strong> &mdash; a cancer of the lining of the lungs or abdomen, almost exclusively caused by past exposure to asbestos fibres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Occupational cancer</strong> &mdash; any cancer attributed to a specific occupational exposure (e.g., lung cancer caused by asbestos, bladder cancer caused by certain chemicals)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Lead poisoning</strong> &mdash; caused by work involving exposure to lead, such as working with lead-based paints, lead pipework, or in battery manufacturing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-500">Relevance to Electricians:</strong> Electricians
                  are particularly at risk of <strong>HAVS</strong> from regular use of vibrating tools
                  (hammer drills, SDS drills, chasing tools), <strong>occupational dermatitis</strong> from
                  contact with cable-pulling lubricants, PVC adhesives, or cleaning solvents, and
                  <strong> carpal tunnel syndrome</strong> from repetitive hand movements during cable
                  stripping, termination, and testing. If you develop symptoms of any occupational disease,
                  seek medical advice promptly and inform your employer.
                </p>
              </div>

              <p>
                It is important to note that the employer&rsquo;s reporting duty is triggered when they
                receive a <strong>written diagnosis from a doctor</strong> that links the disease to the
                worker&rsquo;s occupation. A worker&rsquo;s self-diagnosis is not sufficient &mdash; the
                diagnosis must come from a qualified medical practitioner who confirms that the disease
                is occupationally related.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Near-Miss Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">07</span>
            Near-Miss Reporting
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>near-miss</strong> (also called a &ldquo;near hit&rdquo; or &ldquo;close
                call&rdquo;) is an unplanned event that <strong>did not result in injury, illness, or
                damage but had the potential to do so</strong>. Near-misses are the most common type of
                safety incident and, crucially, they are the best early warning system for preventing
                serious accidents.
              </p>

              <p>
                The importance of near-miss reporting is best illustrated by <strong>Heinrich&rsquo;s
                triangle</strong> (also known as the safety triangle or the accident pyramid), a model
                developed by Herbert William Heinrich in 1931 that has shaped workplace safety thinking
                for nearly a century.
              </p>

              {/* Heinrich's Triangle Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-green-400">Heinrich&rsquo;s Triangle &mdash; The 1:29:300 Ratio</p>
                </div>
                <div className="p-6 flex flex-col items-center">
                  {/* Triangle visualisation */}
                  <div className="w-full max-w-sm space-y-1">
                    {/* Top — 1 Major/Fatal */}
                    <div className="flex flex-col items-center">
                      <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[16px] border-l-transparent border-r-transparent border-b-red-500/60 mb-1" />
                      <div className="bg-red-500/20 border border-red-500/30 rounded px-4 py-2 text-center w-[40%] min-w-[140px]">
                        <p className="text-2xl font-bold text-red-400">1</p>
                        <p className="text-xs text-red-300 font-medium">Major / Fatal Injury</p>
                      </div>
                    </div>
                    {/* Middle — 29 Minor */}
                    <div className="flex justify-center">
                      <div className="bg-orange-500/20 border border-orange-500/30 rounded px-4 py-2 text-center w-[65%] min-w-[200px]">
                        <p className="text-2xl font-bold text-orange-400">29</p>
                        <p className="text-xs text-orange-300 font-medium">Minor Injuries</p>
                      </div>
                    </div>
                    {/* Bottom — 300 Near-Misses */}
                    <div className="flex justify-center">
                      <div className="bg-green-500/20 border border-green-500/30 rounded px-4 py-2 text-center w-full">
                        <p className="text-2xl font-bold text-green-400">300</p>
                        <p className="text-xs text-green-300 font-medium">Near-Misses / Unsafe Acts</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center max-w-sm">
                    <p className="text-xs text-white/60">
                      For every <strong className="text-red-400">1</strong> major or fatal injury, there
                      are typically <strong className="text-orange-400">29</strong> minor injuries and
                      <strong className="text-green-400"> 300</strong> near-misses or unsafe acts.
                      Addressing the base of the triangle prevents injuries higher up.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The key insight from Heinrich&rsquo;s triangle is that <strong>near-misses and minor
                injuries are leading indicators</strong> of major incidents. If a tool falls from a scaffold
                and misses a worker by centimetres, that is a near-miss today &mdash; but if the same
                hazard (unsecured tools at height) is not addressed, it is only a matter of time before
                someone is hit. By investigating and addressing near-misses at the base of the triangle,
                organisations can prevent the fatal and serious incidents at the top.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-500 mb-3">Creating a No-Blame Reporting Culture</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Make it easy</strong> &mdash; simple reporting forms, digital apps, and visible reporting stations reduce barriers to reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">No punishment</strong> &mdash; workers who report near-misses should never be disciplined, ridiculed, or made to feel that reporting is a negative act</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Visible action</strong> &mdash; when workers see that their reports lead to real changes (a hazard fixed, a procedure updated, equipment replaced), they are far more likely to keep reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Feedback</strong> &mdash; tell the reporter what action was taken. A simple &ldquo;thanks, we&rsquo;ve fixed that&rdquo; goes a long way towards building trust</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Leadership example</strong> &mdash; when managers and supervisors actively report their own near-misses and participate in investigations, it signals that reporting is valued at every level</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Near-Misses on Construction Sites</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Tools or materials falling from height but not striking anyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Tripping on cables, hoses, or uneven surfaces without injury</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Vehicles or plant passing dangerously close to pedestrians</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Missing or damaged edge protection at height (spotted before anyone falls)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Electrical near-misses (e.g., cutting into a cable that turned out to be dead, or discovering a live circuit that was supposed to be isolated)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Unsecured loads on forklifts or cranes moving over workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Excavation sides showing signs of movement or cracking near workers</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-500">Remember:</strong> A near-miss is a <strong>free
                  lesson</strong>. Nobody was hurt, but the hazard has been revealed. The only cost is the
                  time it takes to report and investigate. If the near-miss is ignored, the next time may
                  not be a miss &mdash; it may be a fatality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Investigation Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">08</span>
            Investigation Process
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                After any accident, near-miss, or dangerous occurrence, an <strong>investigation</strong> should
                be carried out to determine what happened, why it happened, and what needs to change to
                prevent recurrence. The depth and formality of the investigation should be proportionate
                to the severity and potential severity of the incident.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Step-by-Step Investigation Process</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Immediate Response &mdash; Make Safe &amp; First Aid</p>
                      <p>The immediate priority is always to make the area safe (prevent further injuries) and provide first aid to the injured person. Call emergency services if required. Life-saving actions come before everything else &mdash; the investigation can wait.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Preserve the Scene</p>
                      <p>Once the immediate emergency is dealt with, the scene should be preserved as far as reasonably practicable. This means not moving equipment, not cleaning up debris, and not allowing anyone to interfere with the area. For serious incidents, the HSE may want to inspect the scene, and disturbing evidence can hinder their investigation.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Gather Evidence</p>
                      <p>Collect all available evidence while it is fresh. This includes photographs and video of the scene, measurements, equipment serial numbers and inspection records, risk assessments and method statements for the task, training records, weather conditions, and any CCTV footage.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Witness Statements</p>
                      <p>Interview all witnesses as soon as possible after the incident, while their memories are fresh. Ask open questions (&ldquo;Tell me what you saw&rdquo;) rather than leading questions. Record statements accurately and have each witness sign their statement. Interview the injured person too, if they are able and willing.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-white font-medium">Root Cause Analysis &mdash; The 5 Whys</p>
                      <p>The goal of the investigation is not just to find the immediate cause but the <strong className="text-white">root cause</strong> &mdash; the underlying system failure that allowed the incident to happen. The &ldquo;5 Whys&rdquo; technique is a simple but effective tool for drilling down from the immediate cause to the root cause.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-white font-medium">Corrective Actions</p>
                      <p>Based on the investigation findings, identify and implement corrective actions to prevent recurrence. Actions should address the root cause, not just the symptoms. Each action should have a named responsible person, a deadline, and a method of verification to confirm it has been completed.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">7</span>
                    <div>
                      <p className="text-white font-medium">Communication of Findings</p>
                      <p>Share the investigation findings and corrective actions with everyone who needs to know &mdash; including site workers (via toolbox talks), management, the client, and (for RIDDOR-reportable incidents) the HSE. Lessons learned should be disseminated across the organisation so that other sites and projects benefit.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Whys Example */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-500 mb-3">The 5 Whys &mdash; Worked Example</p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p><strong className="text-white">Why</strong> did the electrician fall from the ladder?</p>
                      <p className="text-white/60">Because the ladder slipped on the floor.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p><strong className="text-white">Why</strong> did the ladder slip?</p>
                      <p className="text-white/60">Because the floor was wet and the ladder feet were worn.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p><strong className="text-white">Why</strong> were the ladder feet worn?</p>
                      <p className="text-white/60">Because the ladder had not been inspected recently.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p><strong className="text-white">Why</strong> had the ladder not been inspected?</p>
                      <p className="text-white/60">Because there was no ladder inspection programme in place.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p><strong className="text-white">Why</strong> was there no inspection programme?</p>
                      <p className="text-white/60">Because the company had no system for managing and inspecting access equipment.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-green-500/20">
                  <p className="text-sm text-white">
                    <strong className="text-green-400">Root cause:</strong> Lack of an equipment
                    management and inspection system. The corrective action is not simply to replace
                    the ladder &mdash; it is to implement a formal inspection programme for all access
                    equipment, with documented pre-use checks and regular formal inspections.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What a Good Investigation Report Contains</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Description of the incident</strong> &mdash; what happened, when, where, and who was involved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Immediate cause</strong> &mdash; the direct physical cause of the injury or damage (e.g., the ladder slipped)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Root cause(s)</strong> &mdash; the underlying system failures that allowed the incident to occur (e.g., no inspection programme)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Contributing factors</strong> &mdash; other factors that played a role (e.g., time pressure, inadequate training, poor lighting)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Evidence</strong> &mdash; photographs, witness statements, documents reviewed, equipment inspection results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Corrective actions</strong> &mdash; what changes will be made, who is responsible, by when, and how completion will be verified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Lessons learned</strong> &mdash; key takeaways to be shared across the organisation to prevent similar incidents elsewhere</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Investigation Is Not About Blame</p>
                </div>
                <p className="text-sm text-white/80">
                  The purpose of an accident investigation is to <strong className="text-white">find
                  the facts, not assign fault</strong>. Investigations that focus on blaming individuals
                  discourage future reporting and fail to identify the systemic issues that caused the
                  incident. The question should always be &ldquo;what failed in our systems?&rdquo;
                  not &ldquo;who was at fault?&rdquo;. In most incidents, the root cause is a system
                  failure (inadequate training, missing procedures, faulty equipment, poor supervision)
                  rather than individual negligence.
                </p>
              </div>

              <p>
                For serious incidents, the HSE may conduct its own investigation. Employers are legally
                required to <strong>co-operate fully</strong> with HSE inspectors, provide access to the
                site, hand over relevant documents, and make witnesses available for interview. Obstructing
                an HSE investigation is a criminal offence.
              </p>
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
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
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
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-3">
              Next: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
