import { ArrowLeft, CheckCircle, AlertTriangle, BookOpen, Zap, FileText, Search, GitBranch, MessageSquare, Shield, Scale, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quizQuestions = [
  {
    question: "Under RIDDOR 2013, which of the following confined space events is classified as a 'dangerous occurrence' that must be reported to the HSE?",
    options: [
      "A worker feeling slightly dizzy after entering a confined space",
      "A near miss where no one was affected",
      "Loss of consciousness due to lack of oxygen in a confined space",
      "A minor cut sustained while climbing through an access point"
    ],
    correctAnswer: 2,
    explanation: "Under RIDDOR 2013, loss of consciousness caused by lack of oxygen in a confined space is classified as a dangerous occurrence and must be reported to the HSE. This applies even if the person recovers quickly. Other dangerous occurrences include exposure to a hazardous substance requiring medical treatment. Minor injuries and general feelings of discomfort are not RIDDOR-reportable unless they meet specific thresholds."
  },
  {
    question: "Within what timeframe must a fatal injury in a confined space be reported to the HSE under RIDDOR 2013?",
    options: [
      "Within 24 hours by online form only",
      "Immediately by telephone, followed by a written report within 10 days",
      "Within 7 days by online form",
      "Within 15 days by post"
    ],
    correctAnswer: 1,
    explanation: "Fatal injuries must be reported to the HSE immediately by telephone via the HSE Incident Contact Centre. This must be followed by a written report (Form F2508) submitted online within 10 days of the incident. The immediate phone report ensures the HSE can respond rapidly, potentially investigating the scene while evidence is still intact."
  },
  {
    question: "In the '5 Whys' root cause analysis technique, what is the primary purpose of asking 'Why?' repeatedly?",
    options: [
      "To assign blame to the person who made the first mistake",
      "To create a paper trail for legal proceedings",
      "To move beyond the immediate cause and identify the underlying systemic failure",
      "To satisfy the HSE that an investigation has been conducted"
    ],
    correctAnswer: 2,
    explanation: "The 5 Whys technique is designed to drill past surface-level causes (e.g. 'the worker didn't test the atmosphere') to find the underlying systemic failures (e.g. 'there was no procedure requiring atmospheric testing before entry'). The goal is never to assign blame to an individual but to identify the organisational, procedural, or cultural failures that allowed the incident to occur. Fixing root causes prevents recurrence."
  },
  {
    question: "Which of the following is the MOST common root cause of confined space fatalities in the UK?",
    options: [
      "Equipment failure",
      "Inadequate risk assessment and failure to follow safe systems of work",
      "Structural collapse of the confined space",
      "Electrical faults within the confined space"
    ],
    correctAnswer: 1,
    explanation: "HSE data consistently shows that the most common root causes of confined space fatalities are inadequate risk assessment and failure to follow safe systems of work. This includes failing to identify the hazards (particularly atmospheric hazards), not testing the atmosphere before entry, not using the correct RPE, and not having adequate rescue arrangements in place. Many confined space deaths are entirely preventable through proper planning and adherence to procedures."
  },
  {
    question: "In the near-miss iceberg model, what does the base of the iceberg represent?",
    options: [
      "Fatal incidents",
      "Major injuries requiring hospitalisation",
      "Near misses and unsafe behaviours that vastly outnumber actual injuries",
      "RIDDOR-reportable dangerous occurrences"
    ],
    correctAnswer: 2,
    explanation: "The iceberg model illustrates that for every serious incident, there are many more near misses and unsafe behaviours below the surface. Heinrich's ratio suggests approximately 300 near misses for every serious injury. The base of the iceberg represents these unreported near misses and unsafe conditions. Reporting and investigating near misses provides the greatest opportunity to prevent serious incidents because there are far more data points to learn from."
  },
  {
    question: "After a confined space incident, which type of corrective action addresses systemic failures to prevent recurrence across the entire organisation?",
    options: [
      "Immediate actions (stopping the job)",
      "Short-term actions (modifying the specific procedure)",
      "Long-term actions (systemic changes such as revised training programmes, updated management systems, and cultural change initiatives)",
      "Administrative actions (completing paperwork)"
    ],
    correctAnswer: 2,
    explanation: "Long-term corrective actions address the systemic root causes that allowed the incident to occur. While immediate actions (stopping the job) and short-term actions (modifying the specific procedure) are essential, they only address the symptoms. Long-term actions target the underlying failures in the management system, training programmes, supervision arrangements, and organisational culture. These systemic changes prevent similar incidents occurring in different locations or under different circumstances."
  },
  {
    question: "Who is the 'responsible person' required to report a RIDDOR-reportable confined space incident to the HSE?",
    options: [
      "The person who was injured",
      "Any witness to the incident",
      "The employer, self-employed person, or person in control of the premises where the work was being carried out",
      "The local authority environmental health officer"
    ],
    correctAnswer: 2,
    explanation: "Under RIDDOR 2013, the 'responsible person' who must make the report is the employer of the injured person, the self-employed person (if they are the one injured), or the person in control of the premises where the work activity was being carried out. This is typically the employer or the principal contractor on a construction site. The duty to report cannot be delegated to the injured person or a bystander."
  },
  {
    question: "Following a serious confined space incident, what is the potential legal consequence under the Corporate Manslaughter and Corporate Homicide Act 2007?",
    options: [
      "A maximum fine of 10,000 pounds",
      "A community service order for the company director",
      "An unlimited fine, a publicity order, and a remedial order against the organisation",
      "The incident is only dealt with under civil law"
    ],
    correctAnswer: 2,
    explanation: "Under the Corporate Manslaughter and Corporate Homicide Act 2007, an organisation can be convicted of corporate manslaughter if a gross breach of a duty of care by senior management causes a person's death. Penalties include an unlimited fine (typically millions of pounds), a publicity order requiring the organisation to publicise its conviction, and a remedial order requiring it to address the management failure. Individual directors and managers can also face prosecution under the Health and Safety at Work etc. Act 1974, with penalties including imprisonment for up to 2 years."
  }
];

const quickCheckQuestions = [
  {
    question: "A worker loses consciousness due to oxygen depletion inside a sewage chamber but is rescued and recovers. The site manager says 'He's fine now, no need to report it.' Is the site manager correct?",
    options: [
      "Yes -- the worker recovered, so no report is needed",
      "No -- loss of consciousness due to lack of oxygen in a confined space is a RIDDOR-reportable dangerous occurrence regardless of whether the person recovers",
      "Only if the worker was off work for more than 7 days",
      "It only needs to be recorded in the site accident book"
    ],
    correctIndex: 1,
    explanation: "Loss of consciousness caused by lack of oxygen in a confined space is a dangerous occurrence under RIDDOR 2013 Schedule 2. It MUST be reported to the HSE regardless of whether the person recovers, how quickly they recover, or whether they return to work. The site manager is wrong. Failure to report is a criminal offence. The report must be made without delay using the HSE online form or by telephone."
  },
  {
    question: "During an incident investigation, you identify the immediate cause as 'the worker did not test the atmosphere before entry.' Using root cause analysis, what types of underlying causes should you look for?",
    options: [
      "Only the worker's personal failings and lack of care",
      "Systemic failures: Was there a procedure requiring testing? Was the worker trained? Was the equipment available? Was there adequate supervision? Was there time pressure?",
      "Whether the worker had a criminal record",
      "Only equipment defects"
    ],
    correctIndex: 1,
    explanation: "Root cause analysis looks beyond the individual's action to find the systemic failures that made the error possible. Key questions include: Was there a written procedure requiring atmospheric testing? Had the worker been trained in that procedure? Was calibrated testing equipment readily available? Was there adequate supervision? Was the worker under time pressure? Were there cultural factors discouraging 'slowing down' for safety checks? Blaming the individual rarely prevents recurrence -- fixing the system does."
  },
  {
    question: "A colleague tells you about a near miss where they entered a tank and felt dizzy but left before losing consciousness. They say 'No harm done -- no point reporting it.' Why is this attitude dangerous?",
    options: [
      "It is not dangerous -- near misses do not matter",
      "Because near misses are free lessons: they reveal the same hazards and failures that cause fatalities, and reporting them allows corrective action before someone is killed",
      "Only because the HSE requires all near misses to be reported under RIDDOR",
      "It is only dangerous if the colleague is a supervisor"
    ],
    correctIndex: 1,
    explanation: "Near misses are critical learning opportunities because they reveal the same hazards, failures, and unsafe conditions that cause serious injuries and fatalities -- the only difference is luck. For every fatality, there are hundreds of near misses. Each unreported near miss is a missed opportunity to fix a problem before it kills someone. A blame-free reporting culture encourages workers to report near misses without fear of punishment, giving the organisation the data it needs to prevent serious incidents."
  }
];

const faqs = [
  {
    question: "Who should I contact to report a RIDDOR incident to the HSE?",
    answer: "Report online via the HSE's RIDDOR reporting website (www.hse.gov.uk/riddor) using the appropriate form. For fatal and specified injuries, you must also report immediately by telephone to the HSE Incident Contact Centre on 0345 300 9923. The telephone line is open Monday to Friday 08:30-17:00. Out-of-hours, the duty officer can be contacted on 0151 922 9235. Keep a record of the date, time, and reference number of your report. The responsible person (typically the employer or person in control of the premises) must make the report."
  },
  {
    question: "What is the difference between an immediate cause and a root cause?",
    answer: "The immediate cause is the event or action that directly triggered the incident -- for example, 'the worker entered without testing the atmosphere.' The root cause is the underlying systemic failure that allowed the immediate cause to occur -- for example, 'there was no procedure requiring atmospheric testing, the risk assessment was inadequate, and the supervisor was not present.' Immediate causes explain WHAT happened; root causes explain WHY it happened. Fixing only the immediate cause (e.g. disciplining the worker) rarely prevents recurrence. Fixing the root cause (e.g. implementing a mandatory atmospheric testing procedure with supervision) addresses the systemic failure."
  },
  {
    question: "Can an individual worker be prosecuted after a confined space incident?",
    answer: "Yes. Under Section 7 of the Health and Safety at Work etc. Act 1974, employees have a duty to take reasonable care for their own health and safety and that of others. Under Section 8, it is an offence to intentionally or recklessly interfere with or misuse anything provided for safety purposes. If a worker deliberately bypasses safety controls, ignores training, or removes safety equipment, they can be personally prosecuted. Penalties include unlimited fines and, for the most serious offences, imprisonment for up to 2 years. However, prosecution of individuals typically focuses on deliberate acts or gross negligence, not honest mistakes made in good faith."
  },
  {
    question: "How long should incident investigation records be kept?",
    answer: "RIDDOR reports must be kept for at least 3 years from the date of the incident. However, best practice is to keep all incident investigation records indefinitely, particularly for confined space incidents where health effects (such as those from toxic substance exposure) may not become apparent for many years. Records should include: the original RIDDOR report, investigation findings, witness statements, atmospheric readings, copies of permits and risk assessments, photographs, corrective action plans, and evidence of corrective action implementation. These records may be required for HSE investigations, insurance claims, civil litigation, or coroner's inquests."
  }
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ConfinedSpacesModule5Section4() {
  useSEO({
    title: "Incident Reporting & Lessons Learned | Confined Spaces Module 5 Section 4",
    description: "RIDDOR 2013 reporting requirements for confined space incidents, incident investigation, root cause analysis techniques, near-miss reporting, corrective actions, and legal implications of confined space incidents.",
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] text-white/70 hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">MODULE 5 {"\u2022"} SECTION 4</p>
            <h1 className="text-sm font-semibold text-white truncate">Incident Reporting & Lessons Learned</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <FileText className="h-8 w-8 text-cyan-400" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              MODULE 5 {"\u2022"} SECTION 4
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Incident Reporting & Lessons Learned</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            How to report confined space incidents under RIDDOR 2013, investigate root causes, learn from near misses, and implement corrective actions to prevent recurrence
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-cyan-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Confined space incidents involving fatalities, specified injuries, over-7-day injuries, and dangerous occurrences (including loss of consciousness due to lack of oxygen) must be reported to the HSE under RIDDOR 2013. Investigation must go beyond the immediate cause to find root causes using techniques such as the 5 Whys and fishbone diagrams. Near misses are critical learning opportunities that vastly outnumber actual injuries. Corrective actions must address immediate, short-term, and long-term systemic failures. Lessons must be shared across the organisation.
          </p>
        </div>

        {/* On Site Box */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            On Site -- Critical Reminder
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            <strong className="text-red-400">If a confined space incident occurs, secure the scene immediately.</strong> Do not allow anyone to enter the space to investigate until it has been made safe. The atmosphere that caused the first casualty will cause a second. Many confined space fatalities are rescuers who entered without adequate precautions. Preserve evidence for the investigation -- do not disturb equipment, permits, or atmospheric monitors.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Identify which confined space incidents must be reported under RIDDOR 2013 and to whom",
              "Describe the correct timeframes and methods for reporting different categories of incident",
              "Explain the incident investigation process from scene preservation through to root cause analysis",
              "Apply root cause analysis techniques including the 5 Whys, fishbone diagrams, and fault tree analysis",
              "Recognise common root causes of confined space incidents and how to address them",
              "Explain the importance of near-miss reporting and a blame-free reporting culture",
              "Describe corrective action categories: immediate, short-term, and long-term systemic changes",
              "Outline the legal implications of confined space incidents including criminal prosecution and corporate manslaughter"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 -- RIDDOR 2013 Reporting Requirements             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">01</span>
            <h3 className="text-xl font-semibold text-white">RIDDOR 2013 Reporting Requirements</h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) requires the responsible person to report certain categories of workplace incident to the Health and Safety Executive (HSE). Several categories are directly relevant to confined space work.
            </p>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                Reportable Incident Categories
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-red-500/30 rounded-full p-1.5 flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold text-sm">Fatal Injuries</p>
                    <p className="text-white/70 text-xs">Report immediately by telephone to the HSE Incident Contact Centre. Follow up with a written report (Form F2508) within 10 days. The scene must be preserved for HSE investigation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-orange-500/30 rounded-full p-1.5 flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-orange-400 font-semibold text-sm">Specified Injuries</p>
                    <p className="text-white/70 text-xs">Fractures (other than fingers, thumbs, and toes), amputations, crush injuries, loss of sight, burns causing hospitalisation, scalping, loss of consciousness from head injury or asphyxia. Report without delay using the online form.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-amber-500/30 rounded-full p-1.5 flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-400 font-semibold text-sm">Over-7-Day Injuries</p>
                    <p className="text-white/70 text-xs">Injuries that result in the worker being incapacitated for more than 7 consecutive days (not counting the day of the incident). Must be reported within 15 days of the incident.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-purple-500/30 rounded-full p-1.5 flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-purple-400 font-semibold text-sm">Dangerous Occurrences (Confined Spaces)</p>
                    <p className="text-white/70 text-xs">
                      <strong className="text-white">Loss of consciousness</strong> due to lack of oxygen in a confined space. <strong className="text-white">Exposure to a hazardous substance</strong> requiring medical treatment, or causing loss of consciousness. Report without delay using the online form -- even if the person recovers fully.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-blue-500/30 rounded-full p-1.5 flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold text-sm">Occupational Diseases</p>
                    <p className="text-white/70 text-xs">Certain occupational diseases linked to confined space exposures (e.g. occupational asthma from sensitising agents, chemical poisoning) must be reported when a doctor notifies the employer in writing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Who Reports and to Whom?</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The <strong className="text-white">responsible person</strong> must make the RIDDOR report. This is typically the employer of the injured person, or the person in control of the premises where the work was being carried out. On construction sites, this is usually the principal contractor. Reports are made to the HSE via:
              </p>
              <ul className="space-y-2 mt-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Online form</strong> -- www.hse.gov.uk/riddor (the preferred method for most reports)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Telephone</strong> -- 0345 300 9923 (mandatory for fatal and specified injuries; also used when online reporting is not possible)</span>
                </li>
              </ul>
            </div>

            {/* Reporting Timeframes Summary */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Reporting Timeframes Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2 bg-black/20 rounded-lg p-3">
                  <p className="text-red-400 font-semibold">Fatal injuries</p>
                  <p className="text-white/70">Immediate phone + written within 10 days</p>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-black/20 rounded-lg p-3">
                  <p className="text-orange-400 font-semibold">Specified injuries</p>
                  <p className="text-white/70">Without delay (online or phone)</p>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-black/20 rounded-lg p-3">
                  <p className="text-amber-400 font-semibold">Over-7-day injuries</p>
                  <p className="text-white/70">Within 15 days of the incident</p>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold">Dangerous occurrences</p>
                  <p className="text-white/70">Without delay (online or phone)</p>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-black/20 rounded-lg p-3">
                  <p className="text-blue-400 font-semibold">Occupational diseases</p>
                  <p className="text-white/70">Without delay after written diagnosis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 -- Incident Investigation Process                 */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">02</span>
            <h3 className="text-xl font-semibold text-white">Incident Investigation Process</h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A thorough investigation is essential after any confined space incident or near miss. The purpose is not to assign blame but to understand what happened, why it happened, and how to prevent it happening again. The investigation process follows a structured sequence.
            </p>

            {/* Incident Investigation Flowchart Diagram */}
            <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-cyan-400 text-sm mb-4 flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Incident Investigation Flowchart
              </h4>
              <div className="space-y-2">
                {/* Step 1 */}
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 border border-red-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-red-400 font-semibold text-xs">STEP 1</p>
                    <p className="text-white text-sm font-medium">Secure the Scene</p>
                    <p className="text-white/60 text-xs">Prevent further entry, preserve evidence, ensure no one else is at risk</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-cyan-500/40" />
                </div>
                {/* Step 2 */}
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-orange-400 font-semibold text-xs">STEP 2</p>
                    <p className="text-white text-sm font-medium">Gather Evidence</p>
                    <p className="text-white/60 text-xs">Atmospheric readings, permits, risk assessments, witness statements, equipment condition, photographs</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-cyan-500/40" />
                </div>
                {/* Step 3 */}
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-amber-400 font-semibold text-xs">STEP 3</p>
                    <p className="text-white text-sm font-medium">Establish the Facts</p>
                    <p className="text-white/60 text-xs">Timeline of events, who was involved, what conditions existed, what controls were in place</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-cyan-500/40" />
                </div>
                {/* Step 4 */}
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-500/20 border border-cyan-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-cyan-400 font-semibold text-xs">STEP 4</p>
                    <p className="text-white text-sm font-medium">Identify Immediate Causes</p>
                    <p className="text-white/60 text-xs">The direct actions, conditions, or failures that triggered the incident</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-cyan-500/40" />
                </div>
                {/* Step 5 */}
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-purple-400 font-semibold text-xs">STEP 5</p>
                    <p className="text-white text-sm font-medium">Root Cause Analysis</p>
                    <p className="text-white/60 text-xs">Underlying systemic failures -- why did the immediate causes occur? Use 5 Whys, fishbone, fault tree</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-cyan-500/40" />
                </div>
                {/* Step 6 */}
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 border border-green-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-green-400 font-semibold text-xs">STEP 6</p>
                    <p className="text-white text-sm font-medium">Recommend Corrective Actions</p>
                    <p className="text-white/60 text-xs">Immediate, short-term, and long-term actions to prevent recurrence</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-cyan-500/40" />
                </div>
                {/* Step 7 */}
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-blue-400 font-semibold text-xs">STEP 7</p>
                    <p className="text-white text-sm font-medium">Share Lessons & Follow Up</p>
                    <p className="text-white/60 text-xs">Safety alerts, toolbox talks, updated procedures, training review, verify actions completed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Evidence to Gather</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-xs mb-2">Documentation</p>
                  <ul className="text-white/70 space-y-1 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Confined space risk assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Permit to work (and any previous permits)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Safe system of work / method statement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Training records for all personnel involved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Equipment inspection and calibration records</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-xs mb-2">Physical Evidence</p>
                  <ul className="text-white/70 space-y-1 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Atmospheric monitoring readings (before, during, after)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Condition of ventilation equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>RPE condition and fit-test records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Witness statements from all personnel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Photographs and video of the scene</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-white">Immediate vs underlying causes:</strong> The immediate cause is the action or condition that directly triggered the incident (e.g. "the worker entered without testing the atmosphere"). The underlying cause is the systemic failure that made the immediate cause possible (e.g. "there was no procedure requiring atmospheric testing before entry, and the supervisor was managing three other jobs simultaneously"). Effective investigations always look beyond the immediate cause.
            </p>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 03 -- Root Cause Analysis Techniques                 */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">03</span>
            <h3 className="text-xl font-semibold text-white">Root Cause Analysis Techniques</h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Root cause analysis (RCA) is a systematic approach to identifying the fundamental reasons why an incident occurred. Several proven techniques can be applied to confined space incidents. The choice of technique depends on the complexity of the incident, but they can also be used in combination.
            </p>

            {/* 5 Whys */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-cyan-400" />
                The 5 Whys Technique
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Start with the immediate cause and ask "Why?" repeatedly until you reach the systemic root cause. Typically 5 iterations are needed, but it may take fewer or more. The key is to keep asking until you reach a cause that, if fixed, would prevent recurrence.
              </p>
              <div className="space-y-2 text-sm">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-xs">WHY 1</p>
                  <p className="text-white/80">"Why did the worker lose consciousness?" <span className="text-white/50">-- The oxygen level in the tank was 14%.</span></p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-xs">WHY 2</p>
                  <p className="text-white/80">"Why was the oxygen level low?" <span className="text-white/50">-- Rusting steel had consumed the oxygen overnight.</span></p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-xs">WHY 3</p>
                  <p className="text-white/80">"Why wasn't the atmosphere tested before entry?" <span className="text-white/50">-- The worker assumed it was safe because the tank had been ventilated the previous day.</span></p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-xs">WHY 4</p>
                  <p className="text-white/80">"Why did the worker assume it was safe?" <span className="text-white/50">-- There was no procedure requiring atmospheric testing immediately before every entry.</span></p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border border-green-500/30">
                  <p className="text-green-400 font-semibold text-xs">WHY 5 -- ROOT CAUSE</p>
                  <p className="text-white/80">"Why was there no procedure?" <span className="text-white/50">-- The risk assessment did not identify atmospheric change after ventilation as a hazard, and the safe system of work was not reviewed after a similar near miss 6 months ago.</span></p>
                </div>
              </div>
              <p className="text-white/60 text-xs mt-3 italic">
                The root cause is a systemic failure (inadequate risk assessment and failure to learn from a previous near miss), not an individual's mistake.
              </p>
            </div>

            {/* Fishbone / Ishikawa */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Fishbone (Ishikawa) Diagram</h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                The fishbone diagram organises potential causes into categories. For confined space incidents, the typical categories are:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-xs mb-1">People</p>
                  <p className="text-white/60 text-xs">Training, competence, experience, fatigue, complacency, communication</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-xs mb-1">Procedures</p>
                  <p className="text-white/60 text-xs">Risk assessment adequacy, SSoW, permits, rescue plan, method statements</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-amber-400 font-semibold text-xs mb-1">Equipment</p>
                  <p className="text-white/60 text-xs">Gas monitors, ventilation, RPE, rescue equipment, calibration status</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-green-400 font-semibold text-xs mb-1">Environment</p>
                  <p className="text-white/60 text-xs">Atmospheric conditions, temperature, access/egress, space configuration</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-blue-400 font-semibold text-xs mb-1">Management</p>
                  <p className="text-white/60 text-xs">Supervision, resourcing, time pressure, safety culture, management commitment</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-red-400 font-semibold text-xs mb-1">Communication</p>
                  <p className="text-white/60 text-xs">Briefings, handovers, emergency comms, language barriers, shift changes</p>
                </div>
              </div>
            </div>

            {/* Fault Tree Analysis */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Fault Tree Analysis (FTA)</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Fault tree analysis works backwards from the incident (the "top event") to map all possible combinations of failures that could have caused it. Each branch represents a contributing factor connected by AND/OR logic gates. AND gates mean all contributing factors must be present simultaneously; OR gates mean any single factor is sufficient. FTA is particularly useful for complex incidents with multiple contributing factors and is often used by the HSE in major incident investigations.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 -- Common Root Causes                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">04</span>
            <h3 className="text-xl font-semibold text-white">Common Root Causes of Confined Space Incidents</h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              HSE investigations into confined space fatalities and serious injuries reveal recurring patterns. The same root causes appear repeatedly across different industries and different types of confined space. Understanding these patterns is essential for prevention.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-3">Recurring Root Causes</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="text-white font-medium text-sm">Inadequate risk assessment</p>
                    <p className="text-white/70 text-xs">Failing to identify the space as a confined space, underestimating atmospheric hazards, not considering how conditions can change during the work, or using a generic risk assessment instead of a task-specific one.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="text-white font-medium text-sm">No atmospheric testing</p>
                    <p className="text-white/70 text-xs">Entering without testing, testing with uncalibrated equipment, testing once but not continuously, or not understanding the readings. This is a factor in the majority of confined space fatalities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="text-white font-medium text-sm">Failure to follow safe systems of work</p>
                    <p className="text-white/70 text-xs">Shortcuts, deviating from the permit conditions, bypassing controls "to save time," or not following the method statement. Often driven by production pressure or complacency.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="text-white font-medium text-sm">Inadequate rescue planning</p>
                    <p className="text-white/70 text-xs">No rescue plan, rescue equipment not available, rescue team not trained, or rescuers entering without adequate precautions. A significant proportion of confined space fatalities are would-be rescuers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                  <div>
                    <p className="text-white font-medium text-sm">Complacency</p>
                    <p className="text-white/70 text-xs">"We've always done it this way," "Nothing has ever happened before," or familiarity breeding contempt for the hazards. Experienced workers can be more at risk than novices because they underestimate the danger.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">6</span>
                  <div>
                    <p className="text-white font-medium text-sm">Time pressure</p>
                    <p className="text-white/70 text-xs">Rushing to meet deadlines, pressure from clients or managers to "just get on with it," or prioritising production over safety. Time pressure is the enemy of safe confined space work.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">7</span>
                  <div>
                    <p className="text-white font-medium text-sm">Poor communication</p>
                    <p className="text-white/70 text-xs">Inadequate briefings, poor handovers between shifts, language barriers, failure to communicate changes in conditions, or breakdown in communication between the entrant, attendant, and supervisor.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">8</span>
                  <div>
                    <p className="text-white font-medium text-sm">Inadequate training</p>
                    <p className="text-white/70 text-xs">Workers not trained in confined space hazards, training not refreshed, training that does not cover the specific type of confined space, or training that is classroom-based only without practical elements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 -- Near-Miss Reporting & the Iceberg Model       */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">05</span>
            <h3 className="text-xl font-semibold text-white">Near-Miss Reporting & the Iceberg Model</h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A near miss is an event that did not result in injury, illness, or damage but had the potential to do so. Near misses are the most valuable source of safety data available to any organisation because they vastly outnumber actual incidents and reveal the same hazards and systemic failures.
            </p>

            {/* Near-Miss Iceberg Model Diagram */}
            <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-cyan-400 text-sm mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Near-Miss Iceberg Model (Heinrich's Triangle)
              </h4>
              <div className="space-y-1 max-w-md mx-auto">
                {/* Tip of iceberg -- fatality */}
                <div className="flex justify-center">
                  <div className="bg-red-500/30 border border-red-500/50 rounded-t-lg px-4 py-2 text-center" style={{ width: "30%" }}>
                    <p className="text-red-400 font-bold text-xs">1</p>
                    <p className="text-white text-[10px]">Fatality</p>
                  </div>
                </div>
                {/* Major injuries */}
                <div className="flex justify-center">
                  <div className="bg-orange-500/20 border-x border-b border-orange-500/40 px-4 py-2 text-center" style={{ width: "45%" }}>
                    <p className="text-orange-400 font-bold text-xs">10</p>
                    <p className="text-white text-[10px]">Serious Injuries</p>
                  </div>
                </div>
                {/* Minor injuries */}
                <div className="flex justify-center">
                  <div className="bg-amber-500/15 border-x border-b border-amber-500/30 px-4 py-2 text-center" style={{ width: "60%" }}>
                    <p className="text-amber-400 font-bold text-xs">30</p>
                    <p className="text-white text-[10px]">Minor Injuries</p>
                  </div>
                </div>
                {/* Waterline */}
                <div className="flex justify-center my-1">
                  <div className="border-t-2 border-dashed border-cyan-400/60 text-center" style={{ width: "75%" }}>
                    <p className="text-cyan-400 text-[10px] font-semibold mt-1">WATERLINE -- what you see above vs below</p>
                  </div>
                </div>
                {/* Near misses */}
                <div className="flex justify-center">
                  <div className="bg-blue-500/10 border-x border-b border-blue-500/25 px-4 py-2 text-center" style={{ width: "80%" }}>
                    <p className="text-blue-400 font-bold text-xs">300</p>
                    <p className="text-white text-[10px]">Near Misses</p>
                  </div>
                </div>
                {/* Unsafe behaviours */}
                <div className="flex justify-center">
                  <div className="bg-white/5 border-x border-b border-white/15 rounded-b-lg px-4 py-3 text-center" style={{ width: "100%" }}>
                    <p className="text-white/60 font-bold text-xs">3,000+</p>
                    <p className="text-white/50 text-[10px]">Unsafe Acts & Conditions</p>
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-xs text-center mt-3 italic">
                Based on Heinrich's safety triangle -- for every serious injury, there are approximately 300 near misses that reveal the same underlying failures
              </p>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Why Near Misses Are Critical Learning Opportunities</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Volume:</strong> There are far more near misses than actual injuries, providing vastly more data points to learn from</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Same root causes:</strong> Near misses reveal the same hazards, failures, and unsafe conditions that cause serious incidents -- the only difference is luck</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">No harm:</strong> They provide learning without the cost of injury, legal consequences, or human suffering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Predictive:</strong> A rising trend in near misses is a leading indicator that a serious incident is likely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Prevention:</strong> Acting on near-miss data prevents incidents before they occur, rather than reacting after someone is hurt</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 text-sm mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Blame-Free Reporting Culture
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Workers will only report near misses if they trust they will not be punished for doing so. A blame-free (or "just") reporting culture means: reports are welcomed and acknowledged, there is no punishment for honest reporting, feedback is given on actions taken as a result of reports, management visibly supports and encourages reporting, and workers see tangible improvements resulting from their reports. Without this culture, near misses go unreported and the organisation loses its most valuable safety data.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 -- Corrective Actions                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">06</span>
            <h3 className="text-xl font-semibold text-white">Corrective Actions & Debriefing</h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The purpose of incident investigation is to prevent recurrence. Corrective actions are the practical changes implemented as a result of the investigation. They fall into three categories, each addressing a different timescale and depth of change.
            </p>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Three Levels of Corrective Action</h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3 border-l-4 border-red-500">
                  <p className="text-red-400 font-semibold text-sm">Immediate Actions</p>
                  <p className="text-white/70 text-xs mt-1">Stop the job. Secure the confined space. Prevent further entry. Provide first aid and emergency services. Preserve the scene. Notify the responsible person and the HSE (if RIDDOR-reportable). These actions are taken within minutes to hours.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border-l-4 border-amber-500">
                  <p className="text-amber-400 font-semibold text-sm">Short-Term Actions</p>
                  <p className="text-white/70 text-xs mt-1">Modify the specific procedure that failed. Retrain the specific team involved. Repair or replace defective equipment. Review and update the risk assessment for this particular confined space. Issue a safety alert to other teams doing similar work. These actions are taken within days to weeks.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border-l-4 border-green-500">
                  <p className="text-green-400 font-semibold text-sm">Long-Term Systemic Actions</p>
                  <p className="text-white/70 text-xs mt-1">Revise the overall confined space management system. Implement organisation-wide training programme changes. Review supervision arrangements across all confined space activities. Address cultural issues (e.g. production pressure overriding safety). Update procurement standards for equipment. Implement audit programmes to verify compliance. These actions are taken over weeks to months and address the systemic root causes.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Debriefing After Incidents and Near Misses</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                A structured debrief should be conducted after every confined space incident and near miss, as well as after every confined space entry where things did not go entirely as planned. The debrief should involve all personnel who were involved and should cover:
              </p>
              <ul className="space-y-2 mt-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>What was planned vs what actually happened</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>What went well and should be continued</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>What did not go well and should be changed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>Were there any unexpected hazards or conditions?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>Were the risk assessment, SSoW, and rescue plan adequate?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>Specific actions to improve for next time, with owners and deadlines</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 07 -- Sharing Lessons Learned                       */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">07</span>
            <h3 className="text-xl font-semibold text-white">Sharing Lessons Learned</h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              An investigation that identifies root causes and corrective actions is only effective if the lessons are shared with everyone who needs to learn from them. Keeping lessons confined to the investigation team wastes the most valuable output of the process.
            </p>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Methods for Sharing Lessons</h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-sm">Safety Alerts</p>
                  <p className="text-white/70 text-xs mt-1">A concise document (typically one page) summarising what happened, what went wrong, and what actions must be taken. Distributed to all relevant personnel immediately. Should include photographs where appropriate and specific actions rather than vague recommendations.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-sm">Toolbox Talks</p>
                  <p className="text-white/70 text-xs mt-1">Short, focused safety briefings (typically 10-15 minutes) delivered at the start of a shift or before a specific task. Ideal for discussing recent incidents and near misses, allowing workers to ask questions and discuss how the lessons apply to their own work.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-sm">Industry Bulletins</p>
                  <p className="text-white/70 text-xs mt-1">Industry bodies (such as the HSE, trade associations, and safety organisations) publish bulletins and safety alerts based on significant incidents. These share lessons across the entire industry, not just the organisation where the incident occurred.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-cyan-400 font-semibold text-sm">Updated Documentation</p>
                  <p className="text-white/70 text-xs mt-1">Risk assessments, safe systems of work, permits to work, rescue plans, and training materials must be updated to reflect the lessons learned. Documentation that does not evolve after incidents becomes dangerously outdated.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Updating Risk Assessments and Procedures</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                After every confined space incident or significant near miss, the following must be reviewed and updated as necessary:
              </p>
              <ul className="space-y-2 mt-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Risk assessments</strong> -- Do they adequately identify the hazards that contributed to the incident? Were there hazards not previously recognised?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Safe systems of work</strong> -- Were the controls sufficient? Were there gaps in the procedure that the incident exposed?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Rescue plans</strong> -- Was the rescue plan adequate? Could the rescue have been faster or more effective?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Training programmes</strong> -- Does the training adequately cover the hazards and controls that were relevant to this incident? Is refresher training needed?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span><strong className="text-white">Equipment standards</strong> -- Was the equipment adequate, properly maintained, and correctly used? Are specification changes needed?</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 08 -- Legal Implications                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">08</span>
            <h3 className="text-xl font-semibold text-white">Legal Implications of Confined Space Incidents</h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Confined space incidents can trigger multiple legal processes simultaneously. Understanding the potential legal consequences reinforces why prevention, proper procedures, and thorough record-keeping are so critically important.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Scale className="h-4 w-4 text-red-400" />
                Legal Consequences
              </h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-red-400 font-semibold text-sm">HSE Investigation & Prosecution</p>
                  <p className="text-white/70 text-xs mt-1">The HSE will investigate all fatal confined space incidents and most serious injuries and dangerous occurrences. If they find breaches of the Confined Spaces Regulations 1997, the Health and Safety at Work etc. Act 1974, or other relevant legislation, prosecution can follow. Organisations face unlimited fines. Individual directors and managers can face personal fines and imprisonment for up to 2 years.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-red-400 font-semibold text-sm">Corporate Manslaughter</p>
                  <p className="text-white/70 text-xs mt-1">Under the Corporate Manslaughter and Corporate Homicide Act 2007, an organisation can be convicted of corporate manslaughter if a gross breach of a duty of care by senior management causes a death. Penalties include unlimited fines (typically millions of pounds), a publicity order, and a remedial order. This applies where the way the organisation's activities were managed or organised amounted to a gross breach of the duty of care owed to the deceased.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-red-400 font-semibold text-sm">Individual Criminal Liability</p>
                  <p className="text-white/70 text-xs mt-1">Directors, managers, and other individuals can be personally prosecuted under Sections 7, 8, 36, and 37 of HSWA 1974. Section 37 applies where an offence by a body corporate was committed with the consent, connivance, or neglect of a director, manager, or similar officer. Workers who deliberately bypass safety controls can also face personal prosecution.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-amber-400 font-semibold text-sm">Civil Claims</p>
                  <p className="text-white/70 text-xs mt-1">Injured workers (or the families of deceased workers) can bring civil claims for compensation. These are separate from criminal proceedings and can result in substantial damages awards. Employer's liability insurance covers most claims, but persistent safety failures can affect insurance terms and premiums. Civil claims can be brought years after the incident.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-amber-400 font-semibold text-sm">Insurance Implications</p>
                  <p className="text-white/70 text-xs mt-1">Repeated incidents, poor safety records, or HSE enforcement actions can lead to increased insurance premiums, restricted coverage, or difficulty obtaining insurance at all. Some insurers now require evidence of active safety management systems as a condition of coverage.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">Coroner's Inquest</p>
                  <p className="text-white/70 text-xs mt-1">All workplace fatalities are subject to a coroner's inquest, which is a public hearing to establish the cause of death. Evidence from the inquest can be used in subsequent criminal and civil proceedings. The coroner can also issue a Prevention of Future Deaths report requiring the organisation to take specific actions.</p>
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-400" />
                The Defence: Demonstrating "So Far As Is Reasonably Practicable"
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The primary defence available to employers in health and safety prosecutions is to demonstrate that they did everything "so far as is reasonably practicable" (SFAIRP) to prevent the incident. This requires evidence of:
              </p>
              <ul className="space-y-2 mt-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>A suitable and sufficient risk assessment that identified the hazards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>A safe system of work with appropriate controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>Adequate training for all personnel involved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>Adequate supervision and monitoring of compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>Proper equipment, maintained and calibrated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>A documented rescue plan with trained rescue personnel and tested equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>Evidence that lessons from previous incidents and near misses were acted upon</span>
                </li>
              </ul>
              <p className="text-white/60 text-xs mt-3 italic">
                The burden of proof is on the defendant -- the employer must prove they did enough, not the prosecution proving they did not.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Key Rules Summary                                            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-400" />
            Key Rules -- Quick Reference
          </h3>
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-400/10 border border-cyan-500/20 rounded-xl p-5">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-red-400 font-bold text-lg flex-shrink-0">1</span>
                <p className="text-white/80"><strong className="text-red-400">Fatal injuries</strong> must be reported to the HSE <strong className="text-white">immediately by telephone</strong>, with a written report within 10 days</p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-orange-400 font-bold text-lg flex-shrink-0">2</span>
                <p className="text-white/80"><strong className="text-orange-400">Loss of consciousness</strong> due to lack of O&#8322; in a confined space is a <strong className="text-white">RIDDOR dangerous occurrence</strong> -- report even if the person recovers</p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold text-lg flex-shrink-0">3</span>
                <p className="text-white/80"><strong className="text-amber-400">Root cause analysis</strong> must go beyond the immediate cause to find <strong className="text-white">systemic failures</strong></p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-green-400 font-bold text-lg flex-shrink-0">4</span>
                <p className="text-white/80"><strong className="text-green-400">Near misses</strong> are free lessons -- report every one in a <strong className="text-white">blame-free culture</strong></p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-blue-400 font-bold text-lg flex-shrink-0">5</span>
                <p className="text-white/80"><strong className="text-blue-400">Corrective actions</strong> must address <strong className="text-white">immediate, short-term, and long-term systemic</strong> failures</p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-purple-400 font-bold text-lg flex-shrink-0">6</span>
                <p className="text-white/80"><strong className="text-purple-400">Share lessons</strong> through safety alerts, toolbox talks, updated procedures, and industry bulletins</p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-cyan-400 font-bold text-lg flex-shrink-0">7</span>
                <p className="text-white/80"><strong className="text-cyan-400">Legal consequences</strong> include unlimited fines, imprisonment, corporate manslaughter charges, and civil claims</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-white mb-2 text-sm">{faq.question}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 4 -- Incident Reporting & Lessons Learned"
          questions={quizQuestions}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Completion Message                                           */}
        {/* ------------------------------------------------------------ */}
        <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6 mt-10 text-center">
          <CheckCircle className="h-10 w-10 text-green-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">
            You've completed all modules! Ready for the mock exam?
          </h3>
          <p className="text-white/70 text-sm mb-4">
            You have worked through all five modules of the Confined Spaces course. The mock exam will test your knowledge across all modules with timed questions in exam conditions.
          </p>
          <Button
            className="min-h-[44px] bg-cyan-500 hover:bg-cyan-500/90 text-white font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-6">
              Start the Mock Exam
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  Navigation Footer                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-5-section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Section 3
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-cyan-500 hover:bg-cyan-500/90 text-white font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-6">
              Next: Mock Exam
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
