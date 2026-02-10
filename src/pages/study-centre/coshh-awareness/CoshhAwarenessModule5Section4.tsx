import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  FileText,
  RefreshCw,
  Shield,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "coshh-training-reg12",
    question:
      "Under COSHH Regulation 12, when must an employer provide information, instruction, and training to employees?",
    options: [
      "Only when a new substance is introduced to the workplace",
      "Before employees are first exposed, and regularly thereafter — including induction, new substances, job changes, and refresher training",
      "Only after an incident has occurred involving a hazardous substance",
      "Once every five years as a minimum legal requirement",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 12 of the COSHH Regulations 2002 requires employers to provide suitable and sufficient information, instruction, and training before employees are first exposed to hazardous substances. Training must be repeated when new substances are introduced, when an employee changes role or process, and at regular refresher intervals. The HSE recommends annual refresher training as good practice. A one-off training session is never sufficient.",
  },
  {
    id: "health-surveillance-retention",
    question:
      "How long must health surveillance records be retained under COSHH?",
    options: [
      "3 years from the date of the last entry",
      "5 years from the date of the last entry",
      "40 years from the date of the last entry",
      "For the duration of the employee's employment only",
    ],
    correctIndex: 2,
    explanation:
      "Health surveillance records must be kept for at least 40 years from the date of the last entry. This extended retention period reflects the fact that many occupational diseases caused by hazardous substances — such as occupational asthma, dermatitis, and cancers — can take years or even decades to develop. Having long-term records allows patterns of ill health to be identified and supports claims for industrial injuries benefit or civil compensation.",
  },
  {
    id: "assessment-review-trigger",
    question:
      "Which of the following would NOT typically trigger a review of a COSHH assessment?",
    options: [
      "An employee's birthday",
      "A change in the substances used in a work process",
      "An incident or near miss involving a hazardous substance",
      "New information published by the manufacturer about a substance's hazards",
    ],
    correctIndex: 0,
    explanation:
      "COSHH Regulation 6(3) requires assessments to be reviewed when there is reason to believe the assessment is no longer valid — for example, when work practices change, new substances are introduced, incidents occur, or new hazard information becomes available. An employee's birthday has no bearing on the validity of a COSHH assessment. Routine annual reviews are also recommended as good practice, regardless of whether a specific trigger has occurred.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Do I need to keep COSHH records even if I have fewer than five employees?",
    answer:
      "While the COSHH Regulations only require a written record of the assessment if you employ five or more people, the HSE strongly recommends recording all assessments regardless of workforce size. A written record provides evidence that the assessment was carried out, helps communicate risks to workers, and is invaluable during HSE inspections or after an incident. In practice, the effort of not recording is greater than the effort of recording — if your assessment is thorough enough to be 'suitable and sufficient', writing it down is a small additional step that provides significant legal protection.",
  },
  {
    question:
      "What is the difference between competence and awareness in COSHH training?",
    answer:
      "Awareness means the worker knows that hazardous substances exist and understands the general principles of COSHH. Competence goes much further — it means the worker can identify specific hazards in their own work environment, select and use appropriate control measures, correctly use PPE, follow emergency procedures, and apply their knowledge in practice. An HSE inspector will not accept a COSHH training record that shows only a PowerPoint presentation was delivered. They want evidence that workers can demonstrate competence through practical application, toolbox talk participation, and scenario-based assessment. The goal is not to pass a test — it is to keep people safe.",
  },
  {
    question:
      "Can COSHH training records be kept electronically?",
    answer:
      "Yes, electronic records are fully acceptable and in many cases preferable to paper records. Electronic systems offer advantages including easier backup, faster retrieval during inspections, automated reminders for refresher training, and the ability to track completion across multiple sites. However, you must ensure electronic records are backed up regularly, protected from unauthorised access, and can be retrieved and presented to an HSE inspector on request. Many organisations use a combination of electronic databases for record management and signed paper copies as evidence of attendance at training sessions.",
  },
  {
    question:
      "What happens if the HSE finds our COSHH records are incomplete during an inspection?",
    answer:
      "Incomplete COSHH records are one of the most common findings during HSE inspections. The consequences depend on the severity of the gap. Minor gaps — such as a missing signature on a training record — may result in advice and guidance. More significant gaps — such as missing assessments for hazardous substances in active use, or no evidence of training — are likely to result in an improvement notice requiring action within a specified timeframe. If the HSE identifies a material breach, Fee for Intervention (FFI) charges will apply from that point, meaning you will pay for the inspector's time. In serious cases, a prohibition notice may stop work immediately, and prosecution may follow.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under COSHH Regulation 12, which of the following must training cover?",
    options: [
      "The financial cost of hazardous substances to the business",
      "The nature of hazards, precautions, correct use of control measures and PPE, and emergency procedures",
      "The history of COSHH legislation from 1988 to the present day",
      "The names and addresses of all substance manufacturers",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 12 requires training to cover the nature of the hazards posed by substances, the precautions to be taken, the correct use of control measures and PPE, emergency procedures, and the results of any exposure monitoring or health surveillance. Training must be practical and relevant to the employee's actual work activities, not a theoretical overview of legislative history.",
  },
  {
    id: 2,
    question:
      "How long must personal exposure monitoring records be retained?",
    options: [
      "5 years",
      "10 years",
      "20 years",
      "40 years",
    ],
    correctAnswer: 3,
    explanation:
      "Personal exposure monitoring records must be kept for at least 40 years. This lengthy retention period reflects the long latency of many occupational diseases. General workplace monitoring records (not linked to identifiable individuals) need only be kept for 5 years. The distinction is important — personal records relate to a named individual's exposure history and may be needed decades later for diagnosis, compensation, or epidemiological research.",
  },
  {
    id: 3,
    question:
      "How long must LEV examination and test records be retained under COSHH Regulation 9?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "40 years",
    ],
    correctAnswer: 2,
    explanation:
      "Records of LEV thorough examination and testing must be kept for at least 5 years from the date of the examination. These records must include the date of the test, the condition of the equipment, any repairs required, and confirmation that the LEV is working effectively. The 5-year retention period allows inspectors to review the maintenance history of LEV systems and identify any patterns of deterioration or neglect.",
  },
  {
    id: 4,
    question:
      "Under COSHH Regulation 6(3), which of the following is a valid reason to review a COSHH assessment?",
    options: [
      "The assessment is more than 12 months old (routine review)",
      "A competitor has changed their COSHH procedures",
      "The company has changed its logo and branding",
      "An employee has been promoted to a different department with no substance exposure",
    ],
    correctAnswer: 0,
    explanation:
      "A routine annual review is recommended good practice and is a valid trigger for reviewing a COSHH assessment. Other valid triggers include changes in work processes or substances used, new hazard information from suppliers or research, incidents or near misses, and monitoring results showing control measures are inadequate. A competitor's procedures or a branding change have no bearing on the validity of your own COSHH assessment.",
  },
  {
    id: 5,
    question:
      "What is the key difference between an improvement notice and a prohibition notice?",
    options: [
      "An improvement notice stops work immediately; a prohibition notice gives time to comply",
      "An improvement notice gives a specified time to comply; a prohibition notice stops work immediately",
      "Both notices give 21 days to comply",
      "Prohibition notices can only be issued by a court, not an HSE inspector",
    ],
    correctAnswer: 1,
    explanation:
      "An improvement notice requires specific improvements within a set timeframe (typically 21 days), during which work may continue. A prohibition notice stops work immediately where the inspector believes there is a risk of serious personal injury. Prohibition notices take effect straight away and work must not resume until the risk has been eliminated or adequately controlled. Both notices can be issued by HSE inspectors without court involvement.",
  },
  {
    id: 6,
    question:
      "What does Fee for Intervention (FFI) mean in the context of HSE enforcement?",
    options: [
      "A fee charged to workers who request additional COSHH training",
      "A fee the employer must pay if the HSE finds a material breach during an inspection",
      "A fee charged by substance manufacturers for providing safety data sheets",
      "A voluntary contribution to the HSE's research budget",
    ],
    correctAnswer: 1,
    explanation:
      "Fee for Intervention (FFI) means that if an HSE inspector identifies a material breach of health and safety law — including COSHH failures — the employer or dutyholder must pay for the time the HSE spends investigating and taking enforcement action. The charge is per hour and applies from the point the material breach is identified. This means poor COSHH management can have a direct financial cost even before any formal enforcement action, fine, or prosecution.",
  },
  {
    id: 7,
    question:
      "In the Plan-Do-Check-Act cycle for COSHH management, what does the 'Check' stage involve?",
    options: [
      "Writing the initial COSHH assessment before work begins",
      "Purchasing new PPE for the workforce",
      "Monitoring performance, reviewing assessments, investigating incidents, and auditing compliance",
      "Communicating changes to employees through toolbox talks",
    ],
    correctAnswer: 2,
    explanation:
      "The 'Check' stage of the PDCA cycle involves measuring and monitoring whether COSHH controls are working as intended. This includes workplace monitoring, reviewing assessment effectiveness, investigating incidents and near misses, auditing compliance with procedures, and analysing health surveillance results. The Check stage is what turns COSHH management from a static paperwork exercise into a dynamic, continuously improving system.",
  },
  {
    id: 8,
    question:
      "As an electrician working on a commercial site, which of the following is the BEST practice before starting work in a plant room?",
    options: [
      "Ask a colleague if they know what chemicals are stored there",
      "Check the COSHH assessment for the area, review relevant SDSs, confirm control measures are in place, and ensure you have appropriate PPE",
      "Assume the main contractor has already dealt with all chemical hazards",
      "Only check for chemical hazards if you can smell something unusual",
    ],
    correctAnswer: 1,
    explanation:
      "Best practice requires you to check the COSHH assessment for the area, review safety data sheets for any substances present, confirm that control measures (such as ventilation) are in place and working, and ensure you have the appropriate PPE before entering. Relying on colleagues, assumptions, or your sense of smell is not adequate — many hazardous substances are odourless, and some can cause harm at concentrations too low to detect by smell.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function CoshhAwarenessModule5Section4() {
  useSEO({
    title:
      "Training, Record Keeping & Review | COSHH Awareness Module 5 Section 4",
    description:
      "Learn about COSHH training requirements under Regulation 12, record-keeping obligations, assessment review triggers, HSE enforcement powers, and the continuous improvement cycle for COSHH management.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <BookOpen className="h-10 w-10 text-violet-500 mx-auto mb-4" />
          <span className="inline-block bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 5 &middot; SECTION 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Training, Record Keeping &amp; Review
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            COSHH training obligations under Regulation 12, what records you must
            keep and for how long, when to review assessments, and how the HSE
            enforces compliance &mdash; plus continuous improvement through
            Plan-Do-Check-Act
          </p>
        </div>

        {/* ─── Learning Outcomes ─── */}
        <section className="mb-10">
          <div className="bg-violet-500/10 border border-violet-500/30 p-5 rounded-lg">
            <div className="flex items-start gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <h2 className="font-semibold text-violet-300 text-base">
                Learning Outcomes
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                <span>
                  Explain what COSHH training must cover under Regulation 12 and
                  when it is required
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                <span>
                  Distinguish between awareness and competence in COSHH training
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                <span>
                  Identify the retention periods for different types of COSHH records
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                <span>
                  Describe when and why a COSHH assessment must be reviewed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                <span>
                  Outline HSE enforcement powers and the consequences of
                  non-compliance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                <span>
                  Apply the Plan-Do-Check-Act cycle to COSHH management in an
                  electrical work context
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── 01 COSHH Training — Regulation 12 ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            COSHH Training &mdash; Regulation 12
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Regulation 12 of the Control of Substances Hazardous to Health
              Regulations 2002 (COSHH) requires every employer to ensure that
              employees who may be exposed to hazardous substances receive{" "}
              <strong>suitable and sufficient information, instruction, and
              training</strong>. This is not optional &mdash; it is a legal
              obligation that applies to all workplaces where hazardous
              substances are used, stored, or may be encountered.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-violet-400 font-medium mb-3">
                What Training Must Cover
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Nature of the hazards</strong> &mdash; the health
                    effects of each substance, the routes of entry into the body,
                    and why the substance is classified as hazardous
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Precautions to be taken</strong> &mdash; safe handling
                    procedures, storage requirements, hygiene measures, and the
                    importance of following safe systems of work
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Control measures in place</strong> &mdash; what
                    engineering controls are provided (LEV, enclosures, ventilation),
                    how they work, and the employee&rsquo;s responsibility to use
                    them correctly and report defects
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Correct use of PPE</strong> &mdash; how to select, fit,
                    wear, maintain, store, and dispose of personal protective
                    equipment including RPE, gloves, eye protection, and overalls
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Emergency procedures</strong> &mdash; what to do in the
                    event of a spill, leak, accidental exposure, fire involving
                    chemicals, or any other COSHH emergency
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Health surveillance requirements</strong> &mdash; why
                    health surveillance is carried out, what it involves, and the
                    employee&rsquo;s duty to attend and cooperate
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Results of monitoring</strong> &mdash; employees have
                    the right to be informed of the results of any workplace
                    exposure monitoring and what those results mean for their health
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-violet-400 font-medium mb-3">
                When Training Is Needed
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Induction</strong> &mdash; before an employee is first
                    exposed to any hazardous substance, including when starting a
                    new job, joining a new site, or beginning a new contract
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>New substance introduced</strong> &mdash; whenever a new
                    hazardous substance is brought into the workplace or an existing
                    substance is used in a different way
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Change of job or process</strong> &mdash; when an
                    employee moves to a different role, task, or work area where the
                    substance hazards differ from their previous assignment
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Refresher training</strong> &mdash; at regular intervals
                    to maintain competence. The HSE recommends annual refresher
                    training as a minimum, though higher-risk environments may
                    require more frequent updates
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-violet-400 font-medium mb-3">
                Who Needs Training
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>All exposed workers</strong> &mdash; anyone who uses,
                    handles, stores, transports, or may be accidentally exposed to
                    hazardous substances during their work
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Supervisors and managers</strong> &mdash; those
                    responsible for overseeing work involving hazardous substances
                    need additional training to ensure they can identify risks and
                    enforce controls
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Emergency responders</strong> &mdash; first aiders, fire
                    marshals, spill response teams, and anyone with a designated
                    role in the COSHH emergency plan
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Visitors and contractors</strong> &mdash; must be
                    informed of relevant hazards during site induction, even if
                    their exposure is incidental rather than direct
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 02 Training Methods and Competence ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">02</span>
              Training Methods &amp; Competence
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The COSHH Regulations do not prescribe a single training method.
                Employers must choose methods that are appropriate to the workforce,
                the hazards involved, and the complexity of the control measures.
                In practice, the most effective COSHH training uses a combination of
                methods.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                  <p className="font-semibold text-base text-violet-400 mb-2">
                    Toolbox Talks
                  </p>
                  <p className="text-sm text-white/80">
                    Short, focused talks delivered at the worksite &mdash; typically
                    10&ndash;15 minutes. Ideal for site-specific hazards, reinforcing
                    key messages, and sharing lessons from incidents. Can be
                    delivered by supervisors or competent colleagues. Should be
                    recorded with date, topic, attendees, and delivery method.
                  </p>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                  <p className="font-semibold text-base text-violet-400 mb-2">
                    Formal Training Sessions
                  </p>
                  <p className="text-sm text-white/80">
                    Classroom-based or structured sessions covering COSHH
                    principles, hazard identification, risk assessment, and control
                    hierarchy in detail. Suitable for induction training and annual
                    refreshers. Should include assessment of understanding &mdash;
                    not just attendance.
                  </p>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                  <p className="font-semibold text-base text-violet-400 mb-2">
                    E-Learning
                  </p>
                  <p className="text-sm text-white/80">
                    Online training modules that workers can complete at their own
                    pace. Useful for foundational knowledge and standardised
                    content. Must include assessment to verify understanding.
                    E-learning alone is rarely sufficient &mdash; it should be
                    supplemented with practical, workplace-specific training.
                  </p>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                  <p className="font-semibold text-base text-violet-400 mb-2">
                    Practical Demonstrations
                  </p>
                  <p className="text-sm text-white/80">
                    Hands-on training in the correct use of PPE (donning and
                    doffing gloves, fitting RPE), spill response procedures, and
                    the operation of control equipment such as LEV systems. Workers
                    must demonstrate competence, not merely observe the
                    demonstration.
                  </p>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    Competence vs Mere Awareness
                  </h3>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  An HSE inspector drawing a distinction between{" "}
                  <strong className="text-white">awareness</strong> and{" "}
                  <strong className="text-white">competence</strong> is one of
                  the most common findings during COSHH enforcement visits:
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Awareness</strong> = knowing
                      hazardous substances exist and that COSHH applies
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Competence</strong> = being
                      able to identify specific hazards, select correct controls,
                      use PPE properly, follow emergency procedures, and apply
                      knowledge in real work situations
                    </span>
                  </div>
                </div>
                <p className="text-white/80 text-sm mt-3">
                  A worker who has watched a video is <em>aware</em>. A worker who
                  can correctly don RPE, interpret an SDS, and respond to a spill
                  is <em>competent</em>. The law requires competence, not just
                  awareness.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Training Records &mdash; What to Record
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Date and duration</strong> of the training session
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Topics covered</strong> &mdash; specific substances,
                      hazards, controls, and procedures discussed
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Names of attendees</strong> with signatures or
                      electronic confirmation of attendance
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Name and qualifications of trainer</strong>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Method of delivery</strong> &mdash; toolbox talk,
                      classroom, e-learning, practical demonstration
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Assessment results</strong> &mdash; how competence
                      was verified (quiz, practical test, observation)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Refresher date</strong> &mdash; when the next
                      refresher is due
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Record-Keeping Requirements ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-violet-400/80 text-sm font-normal">03</span>
            Record-Keeping Requirements
          </h2>
          <div className="space-y-4 text-white">
            <p>
              COSHH requires employers to create, maintain, and retain a range of
              records. These records serve multiple purposes: they demonstrate
              compliance with the law, provide evidence during HSE inspections,
              support health surveillance programmes, and protect both employers
              and employees in the event of a future claim or investigation.
            </p>

            {/* ─── Record Retention Periods Diagram ─── */}
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="bg-violet-500/20 border-b border-violet-500/30 px-4 py-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-violet-400" />
                  <h3 className="text-violet-300 font-semibold text-sm sm:text-base">
                    Record Retention Periods
                  </h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {/* 40 years */}
                <div className="flex items-center gap-3">
                  <div className="w-24 sm:w-28 flex-shrink-0 text-right">
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                      40 years
                    </span>
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-red-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/60 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div className="ml-[calc(6rem+0.75rem)] sm:ml-[calc(7rem+0.75rem)] text-xs text-white/70 -mt-1 space-y-1">
                  <p>Health surveillance records</p>
                  <p>Personal exposure monitoring records</p>
                </div>

                {/* 5 years */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-24 sm:w-28 flex-shrink-0 text-right">
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      5 years
                    </span>
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-amber-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-amber-500/60 rounded-full" style={{ width: "12.5%" }}></div>
                  </div>
                </div>
                <div className="ml-[calc(6rem+0.75rem)] sm:ml-[calc(7rem+0.75rem)] text-xs text-white/70 -mt-1 space-y-1">
                  <p>General workplace monitoring records</p>
                  <p>LEV thorough examination and test records</p>
                </div>

                {/* 3 years */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-24 sm:w-28 flex-shrink-0 text-right">
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      3 years
                    </span>
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-blue-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/60 rounded-full" style={{ width: "7.5%" }}></div>
                  </div>
                </div>
                <div className="ml-[calc(6rem+0.75rem)] sm:ml-[calc(7rem+0.75rem)] text-xs text-white/70 -mt-1 space-y-1">
                  <p>Accident and incident records (RIDDOR minimum)</p>
                </div>

                {/* Employment + */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-24 sm:w-28 flex-shrink-0 text-right">
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      Employment+
                    </span>
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-violet-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-violet-500/60 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <div className="ml-[calc(6rem+0.75rem)] sm:ml-[calc(7rem+0.75rem)] text-xs text-white/70 -mt-1 space-y-1">
                  <p>Training records (duration of employment + reasonable period)</p>
                  <p>RPE face-fit test records</p>
                </div>

                {/* Current */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-24 sm:w-28 flex-shrink-0 text-right">
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30">
                      Current
                    </span>
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-green-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500/60 rounded-full" style={{ width: "5%" }}></div>
                  </div>
                </div>
                <div className="ml-[calc(6rem+0.75rem)] sm:ml-[calc(7rem+0.75rem)] text-xs text-white/70 -mt-1 space-y-1">
                  <p>COSHH assessments (current version, plus superseded versions for reference)</p>
                  <p>SDS library (current versions must be accessible to all workers)</p>
                </div>
              </div>
              <div className="bg-white/5 border-t border-white/10 px-4 py-2.5">
                <p className="text-white/50 text-xs italic text-center">
                  Retention periods are statutory minimums &mdash; many organisations
                  retain records for longer as a precaution
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-violet-400 font-medium mb-3">
                Detailed Record Requirements
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>COSHH assessments</strong> &mdash; must be recorded in
                    writing if the employer has 5 or more employees (good practice
                    always). Must include date, assessor, substances, hazards,
                    exposed persons, controls, and review date
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Health surveillance records</strong> &mdash; 40 years
                    retention. Must include the employee&rsquo;s name, date of
                    surveillance, the outcome, and any restrictions or referrals.
                    Individual records are confidential and must not be disclosed
                    without consent
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Exposure monitoring records</strong> &mdash; personal
                    records (linked to a named individual) must be kept for 40
                    years. General workplace monitoring records (not linked to an
                    identifiable individual) must be kept for 5 years
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>LEV examination records</strong> &mdash; 5 years
                    retention. Must include the date, condition, any defects found,
                    repairs carried out, and confirmation of adequate performance
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Training records</strong> &mdash; retain for duration of
                    employment plus a reasonable period after leaving (many
                    organisations retain for 6 years after departure to cover the
                    limitation period for civil claims)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>RPE face-fit test records</strong> &mdash; retain for
                    duration of employment. Must include the make and model of RPE,
                    the fit test method used, the test result, and the date of the
                    test. Retest when the wearer&rsquo;s face shape changes
                    significantly (e.g. weight change, dental work)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>SDS library</strong> &mdash; current versions of all
                    safety data sheets must be accessible to workers who may be
                    exposed. SDSs must be updated when new versions are issued by
                    the manufacturer. Superseded versions should be retained for
                    reference
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Accident and incident records</strong> &mdash; 3 years
                    minimum under RIDDOR. Include any spills, leaks, accidental
                    exposures, near misses, and first aid treatment given
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                <p className="font-semibold text-base text-violet-400 mb-2">
                  Electronic vs Paper Records
                </p>
                <p className="text-sm text-white/80">
                  Both electronic and paper records are legally acceptable. Electronic
                  records offer advantages: easier backup, faster retrieval, automated
                  reminders for refresher training, and better accessibility across
                  multiple sites. Paper records must be stored securely and protected
                  from damage. Many organisations use a hybrid approach &mdash;
                  electronic databases for management and signed paper copies as
                  evidence of attendance.
                </p>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                <p className="font-semibold text-base text-violet-400 mb-2">
                  Backup Requirements
                </p>
                <p className="text-sm text-white/80">
                  Whatever format is used, records must be backed up and protected
                  against loss. For electronic records, this means regular backups to
                  a separate location or cloud storage. For paper records, consider
                  scanning critical documents. The HSE expects records to be
                  retrievable on demand &mdash; telling an inspector &ldquo;we had
                  the records but lost them&rdquo; is not an acceptable defence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Induction Training for New Starters and Visitors ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">04</span>
              Induction Training for New Starters &amp; Visitors
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Every new starter and every visitor to a workplace where hazardous
                substances are present must receive COSHH induction training before
                they enter areas where exposure could occur. This applies equally to
                permanent employees, agency workers, apprentices, and visiting
                contractors such as electricians working on a client&rsquo;s site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  COSHH Induction Must Cover
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      What hazardous substances are used or stored on site and where
                      they are located
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The main health hazards &mdash; what could happen if exposed
                      without controls
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The control measures in place and what the worker must do to
                      protect themselves
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Where SDSs are stored and how to access them
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Emergency procedures &mdash; spill response, evacuation
                      routes, first aid arrangements, and who to contact
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      PPE requirements &mdash; what is needed, where it is
                      available, and how to use it
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      How to report concerns, incidents, or suspected ill health
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    Electrician&rsquo;s Perspective
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  As an electrician, you will regularly arrive at client sites where
                  chemicals are used in processes you are not directly involved in
                  &mdash; manufacturing plants, laboratories, commercial kitchens,
                  and plant rooms. You have the <strong className="text-white">right
                  to receive a COSHH induction</strong> before entering any area
                  where hazardous substances are present. If one is not offered,
                  request it. Never assume that because you are &ldquo;just doing
                  the electrics&rdquo; the chemical hazards do not apply to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 05 Assessment Review — COSHH Reg 6(3) ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">05</span>
              Assessment Review &mdash; COSHH Reg 6(3)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A COSHH assessment is not a static document. Regulation 6(3)
                requires employers to review their assessments whenever there is
                reason to suspect the assessment is no longer valid, or when there
                has been a significant change in the work to which it relates. In
                practice, the HSE recommends routine reviews at least annually, even
                if no specific trigger has occurred.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-5 w-5 text-violet-400" />
                  <h3 className="text-violet-400 font-medium">
                    Review Triggers Checklist
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded border border-violet-500/50 bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-400 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <strong>Change in work activity or process</strong> &mdash;
                      new tasks, different methods, changes to the sequence of work
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded border border-violet-500/50 bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-400 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <strong>Change in substance</strong> &mdash; new substance
                      introduced, supplier changed, reformulated product,
                      reclassified hazard
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded border border-violet-500/50 bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-400 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <strong>New information available</strong> &mdash; updated SDS
                      from manufacturer, new WEL published, new HSE guidance or
                      research
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded border border-violet-500/50 bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-400 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <strong>Incident or near miss</strong> &mdash; spill, leak,
                      accidental exposure, adverse health effect reported by a
                      worker
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded border border-violet-500/50 bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-400 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <strong>Monitoring shows inadequacy</strong> &mdash; exposure
                      levels approaching or exceeding WELs, control measures not
                      performing as expected
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded border border-violet-500/50 bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-400 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <strong>Health surveillance findings</strong> &mdash; adverse
                      health effects detected in exposed workers
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded border border-violet-500/50 bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-400 text-xs font-bold">7</span>
                    </div>
                    <div>
                      <strong>Routine annual review</strong> &mdash; even if no
                      specific trigger has occurred, a systematic review is good
                      practice
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                  <p className="font-semibold text-base text-violet-400 mb-2">
                    Documenting Changes
                  </p>
                  <p className="text-sm text-white/80">
                    When a review results in changes to the COSHH assessment, the
                    updated assessment must be recorded with the revision date,
                    the reason for the change, and the name of the person who
                    carried out the review. Superseded versions should be retained
                    &mdash; they demonstrate that the assessment has been actively
                    managed over time and can be valuable evidence in any future
                    investigation.
                  </p>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                  <p className="font-semibold text-base text-violet-400 mb-2">
                    Communicating Changes
                  </p>
                  <p className="text-sm text-white/80">
                    Updated COSHH assessments are worthless if the changes are not
                    communicated to the workers who are affected. Changes must be
                    shared through toolbox talks, briefings, updated signage, and
                    revised safe systems of work. Workers must confirm they have
                    understood the changes. Simply emailing an updated document is
                    not sufficient communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 06 Inspection and Enforcement ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">06</span>
              Inspection &amp; Enforcement
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Health and Safety Executive (HSE) is the primary enforcing
                authority for COSHH in the United Kingdom. Local authority
                environmental health officers also enforce COSHH in certain
                sectors, including retail, hospitality, and leisure. Both have the
                power to enter premises, take samples, examine records, and take
                enforcement action.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-violet-400" />
                  <h3 className="text-violet-400 font-medium">
                    HSE Inspectors&rsquo; Powers
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Enter any premises</strong> at any reasonable time
                      (or at any time if they believe a dangerous situation exists)
                      &mdash; no appointment is required
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Take samples</strong> of any substances, articles, or
                      the atmosphere in the workplace for analysis
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Examine and copy records</strong> &mdash; COSHH
                      assessments, training records, health surveillance records,
                      monitoring data, LEV examination records, and SDSs
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Interview employees</strong> &mdash; inspectors can
                      ask workers about their training, understanding of hazards,
                      and use of control measures
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Take photographs and measurements</strong> as evidence
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Serve enforcement notices</strong> &mdash;
                      improvement notices and prohibition notices
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Initiate prosecution</strong> for serious breaches
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Enforcement Tools
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Advice and guidance</strong> &mdash; informal
                      approach for minor issues. The inspector provides verbal or
                      written advice on how to improve compliance
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Improvement notice</strong> &mdash; requires specific
                      action within a set timeframe (typically 21 days). Work may
                      continue while improvements are made. An appeal suspends the
                      notice until the appeal is heard
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Prohibition notice</strong> &mdash; STOPS work
                      immediately where the inspector believes there is a risk of
                      serious personal injury. Takes effect straight away. Work must
                      not resume until the risk has been eliminated or adequately
                      controlled. An appeal does NOT suspend a prohibition notice
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Prosecution</strong> &mdash; for serious breaches,
                      repeated non-compliance, or situations where someone has been
                      harmed or placed at serious risk of harm
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                  <p className="font-semibold text-base text-violet-400 mb-2">
                    Fee for Intervention (FFI)
                  </p>
                  <p className="text-sm text-white/80">
                    If an HSE inspector identifies a{" "}
                    <strong className="text-white">material breach</strong> of
                    health and safety law, the employer must pay for the time the
                    HSE spends investigating and taking enforcement action. The
                    current rate is charged per hour. FFI applies from the point
                    the breach is identified and is in addition to any fines or
                    prosecution. Poor COSHH management can therefore have an
                    immediate financial cost before any formal penalty.
                  </p>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-red-500/10 border-l-2 border-l-red-500/50 border border-red-500/30">
                  <p className="font-semibold text-base text-red-400 mb-2">
                    Prosecution &amp; Penalties
                  </p>
                  <div className="text-sm text-white/80 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong className="text-white">Unlimited fines</strong>{" "}
                        for organisations convicted of COSHH offences
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong className="text-white">Personal fines</strong>{" "}
                        for directors, managers, and individuals
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong className="text-white">Imprisonment up to 2
                        years</strong> for the most serious offences
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong className="text-white">Adverse publicity</strong>{" "}
                        &mdash; convictions are published by the HSE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 Continuous Improvement — PDCA Cycle ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">07</span>
              Continuous Improvement &mdash; PDCA Cycle
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Effective COSHH management is not a one-off exercise. The HSE
                promotes a <strong>Plan-Do-Check-Act (PDCA)</strong> approach to
                health and safety management, including COSHH. This cycle ensures
                that controls are continuously reviewed and improved, rather than
                becoming outdated or neglected.
              </p>

              {/* ─── PDCA Cycle Diagram ─── */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-violet-500/20 border-b border-violet-500/30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-violet-400" />
                    <h3 className="text-violet-300 font-semibold text-sm sm:text-base">
                      PDCA Cycle for COSHH Management
                    </h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Plan */}
                    <div className="rounded-xl border-2 border-blue-500/50 bg-blue-500/5 overflow-hidden">
                      <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-2.5 text-center">
                        <p className="text-blue-400 font-bold text-base">PLAN</p>
                      </div>
                      <div className="p-3 sm:p-4 space-y-2 text-sm text-white/80">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                          <span>Identify hazardous substances in use</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                          <span>Carry out COSHH risk assessments</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                          <span>Determine control measures needed</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                          <span>Plan training and health surveillance</span>
                        </div>
                      </div>
                    </div>

                    {/* Do */}
                    <div className="rounded-xl border-2 border-green-500/50 bg-green-500/5 overflow-hidden">
                      <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-2.5 text-center">
                        <p className="text-green-400 font-bold text-base">DO</p>
                      </div>
                      <div className="p-3 sm:p-4 space-y-2 text-sm text-white/80">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                          <span>Implement control measures</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                          <span>Deliver training to all exposed workers</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                          <span>Provide and maintain PPE</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                          <span>Start health surveillance programmes</span>
                        </div>
                      </div>
                    </div>

                    {/* Check */}
                    <div className="rounded-xl border-2 border-amber-500/50 bg-amber-500/5 overflow-hidden">
                      <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2.5 text-center">
                        <p className="text-amber-400 font-bold text-base">CHECK</p>
                      </div>
                      <div className="p-3 sm:p-4 space-y-2 text-sm text-white/80">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                          <span>Monitor workplace exposure levels</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                          <span>Review health surveillance results</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                          <span>Investigate incidents and near misses</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                          <span>Audit compliance with procedures</span>
                        </div>
                      </div>
                    </div>

                    {/* Act */}
                    <div className="rounded-xl border-2 border-violet-500/50 bg-violet-500/5 overflow-hidden">
                      <div className="bg-violet-500/20 border-b border-violet-500/30 px-4 py-2.5 text-center">
                        <p className="text-violet-400 font-bold text-base">ACT</p>
                      </div>
                      <div className="p-3 sm:p-4 space-y-2 text-sm text-white/80">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                          <span>Update assessments based on findings</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                          <span>Improve controls where gaps are found</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                          <span>Retrain workers on updated procedures</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                          <span>Feed lessons back into the Plan stage</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-white/50 text-xs italic">
                      The cycle repeats continuously &mdash; COSHH management is
                      never &ldquo;complete&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    Why Continuous Improvement Matters
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  A COSHH assessment written three years ago and never reviewed is
                  almost certainly out of date. Substances change, suppliers change,
                  WELs are updated, new research identifies previously unknown risks,
                  and work practices evolve. An HSE inspector will look for evidence
                  that your COSHH management is{" "}
                  <strong className="text-white">dynamic</strong> &mdash; that
                  assessments are reviewed, training is refreshed, monitoring is
                  ongoing, and the results feed back into improved controls. A
                  folder of dusty assessments that have never been touched is a
                  red flag.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 08 Practical Summary — Putting It All Together ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">08</span>
              Practical Summary &mdash; Putting It All Together
            </h2>
            <div className="space-y-4 text-white">
              <p>
                This final section brings together everything covered in this
                module &mdash; and indeed the entire COSHH Awareness course &mdash;
                into a practical summary for electricians working on site. These
                are the actions you should take before, during, and after every
                job where hazardous substances may be present.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-violet-400" />
                  <h3 className="text-violet-400 font-medium">
                    Your COSHH Checklist as an Electrician
                  </h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-violet-300 font-semibold mb-2">Before the Job</p>
                    <div className="space-y-2 ml-1">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Ask for a COSHH induction &mdash; what substances are on
                          site, where they are, and what controls are in place?
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Review the COSHH assessment for your work area
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Check the SDSs for any substances you may encounter
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Ensure you have the correct PPE and that it fits properly
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Confirm your COSHH training is up to date
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-violet-300 font-semibold mb-2">During the Job</p>
                    <div className="space-y-2 ml-1">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Follow the safe system of work &mdash; no shortcuts
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Use control measures and PPE as required
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Report any unexpected chemical hazards, spills, or unusual
                          smells immediately
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          If you feel unwell (headache, dizziness, irritation),
                          leave the area and seek fresh air
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-violet-300 font-semibold mb-2">After the Job</p>
                    <div className="space-y-2 ml-1">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Clean and store PPE correctly &mdash; contaminated PPE
                          must not be taken home
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Wash hands and exposed skin before eating, drinking, or
                          smoking
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Report any concerns, near misses, or symptoms to your
                          supervisor
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">
                          Attend health surveillance if required for your exposure
                          history
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Summary Box ─── */}
              <div className="bg-violet-500/10 border-2 border-violet-500/40 p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <CheckCircle className="h-6 w-6 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-violet-300 text-base">
                    Section Summary
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Regulation 12</strong>{" "}
                      requires employers to provide information, instruction, and
                      training before workers are first exposed, when substances or
                      processes change, and at regular refresher intervals
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Competence &ne; awareness</strong>{" "}
                      &mdash; workers must be able to apply their knowledge in
                      practice, not merely recognise that COSHH exists
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Record retention</strong>{" "}
                      varies from 3 years (accident records) to 40 years (health
                      surveillance and personal exposure monitoring)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Assessments must be reviewed</strong>{" "}
                      whenever work, substances, or information changes, after
                      incidents, and routinely at least once per year
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">HSE inspectors</strong> can
                      enter premises without notice, examine all records, interview
                      workers, and issue improvement or prohibition notices
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Penalties</strong> include
                      unlimited fines, personal liability for directors and
                      managers, and imprisonment for up to 2 years
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Plan-Do-Check-Act</strong>{" "}
                      ensures COSHH management is a continuous, improving process
                      rather than a static paperwork exercise
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border-2 border-green-500/40 p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-green-300 text-base">
                    Course Complete
                  </h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  You have now covered all the content in the COSHH Awareness
                  course. You understand what COSHH is, how hazardous substances
                  affect the body, how to read safety data sheets, the hierarchy
                  of control measures, the role of PPE, workplace monitoring,
                  health surveillance, emergency procedures, training
                  requirements, record keeping, and HSE enforcement. The knowledge
                  you have gained will help you identify chemical hazards, protect
                  yourself and others, and comply with the law on every job you
                  work. When you are ready, proceed to the mock exam to test your
                  understanding across all five modules.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="Training, Record Keeping & Review Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Emergency Procedures
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-6">
              You&rsquo;ve completed all modules! Ready for the mock exam?
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
