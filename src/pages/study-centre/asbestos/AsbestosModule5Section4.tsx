import { ArrowLeft, Users, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "employer-duty-risk-assessment",
    question:
      "Under which regulation must employers carry out a risk assessment before any work that may expose workers to asbestos?",
    options: [
      "Regulation 6 of the Control of Asbestos Regulations 2012",
      "Regulation 14 — provision of RPE",
      "Regulation 4 — duty to manage",
      "Regulation 22 — health surveillance only",
    ],
    correctIndex: 0,
    explanation:
      "Regulation 6 of CAR 2012 requires employers to carry out a suitable and sufficient risk assessment before any work that may expose employees to asbestos. This risk assessment must identify the type and condition of ACMs, the likely level and duration of exposure, and the control measures needed. Without a proper risk assessment, the employer cannot demonstrate that the work is being carried out safely and lawfully.",
  },
  {
    id: "employee-right-refuse",
    question:
      "What right does an employee have if they believe they are being asked to work unsafely with asbestos?",
    options: [
      "The right to stop work and refuse to continue until the situation is resolved",
      "No right — they must follow the employer's instructions at all times",
      "They can only raise a concern after the work is completed",
      "They must continue working but can complain to the HSE afterwards",
    ],
    correctIndex: 0,
    explanation:
      "Employees have the right to refuse unsafe work. If you believe you are being asked to work in a way that puts you or others at serious risk of asbestos exposure, you have the legal right to stop work. You should report your concerns to your supervisor, safety representative, or the HSE. Under the Employment Rights Act 1996, you are protected from dismissal or detriment for raising genuine health and safety concerns.",
  },
  {
    id: "hse-prohibition-notice",
    question:
      "What enforcement action can the HSE take to immediately stop work where there is a risk of serious injury from asbestos exposure?",
    options: [
      "Issue a prohibition notice, which stops work immediately",
      "Issue an improvement notice, giving 21 days to fix the problem",
      "Send an advisory letter recommending improvements",
      "The HSE cannot stop work — only a court can do that",
    ],
    correctIndex: 0,
    explanation:
      "A prohibition notice is the HSE's most powerful enforcement tool short of prosecution. It stops work immediately where an inspector believes there is a risk of serious personal injury. Unlike an improvement notice, which allows time to make changes, a prohibition notice takes effect straight away. Ignoring a prohibition notice is a criminal offence that can result in prosecution and imprisonment.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Can I be personally fined for an asbestos offence, even if I'm not the employer?",
    answer:
      "Yes. Under the Health and Safety at Work etc. Act 1974, individuals — including directors, managers, and employees — can be prosecuted for health and safety offences. If an offence was committed with the consent, connivance, or neglect of a director or manager, that individual can be personally fined or even imprisoned. Employees can also be prosecuted if they fail to cooperate with health and safety requirements, misuse safety equipment, or carry out asbestos work for which they are not trained or competent.",
  },
  {
    question:
      "What should I do if I discover that the asbestos register has not been made available before work starts?",
    answer:
      "You should stop work and not proceed until the asbestos register (or a confirmation that one does not exist) has been provided. Ask your supervisor or the dutyholder for the register. If you cannot obtain this information, do not start work in the area — especially in any building constructed before the year 2000. Report the situation to your employer and, if necessary, to the HSE. Working without checking the register is one of the most common causes of accidental asbestos disturbance.",
  },
  {
    question:
      "How often should asbestos awareness training be refreshed?",
    answer:
      "The HSE recommends that asbestos awareness training is refreshed annually. For workers carrying out asbestos work (not just awareness), a full refresher of their detailed asbestos training is required every 3 years as a minimum. Licensed workers must maintain their training as a condition of their licence. Training records must be kept and made available for inspection. Refresher training should cover changes in legislation, new guidance, lessons from recent incidents, and any site-specific issues.",
  },
  {
    question:
      "Am I protected if I report my employer to the HSE for poor asbestos management?",
    answer:
      "Yes. The Public Interest Disclosure Act 1998 (PIDA) protects whistleblowers from retaliation when they raise genuine health and safety concerns. You can report concerns to your employer, your safety representative, your trade union, or directly to the HSE. Reports to the HSE can be made anonymously. You cannot be lawfully dismissed, disciplined, or treated unfairly for raising a genuine concern about asbestos safety. If you are treated unfairly as a result, you can bring a claim to an employment tribunal.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under CAR 2012, which regulation requires employers to provide adequate information, instruction, and training on asbestos?",
    options: [
      "Regulation 4",
      "Regulation 10",
      "Regulation 14",
      "Regulation 22",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 10 of the Control of Asbestos Regulations 2012 requires employers to ensure that adequate information, instruction, and training is given to employees who are, or may be, exposed to asbestos. This includes asbestos awareness training for all workers who may come into contact with ACMs, and more detailed training for those carrying out asbestos work.",
  },
  {
    id: 2,
    question:
      "Who has the primary duty to manage asbestos in a building under Regulation 4 of CAR 2012?",
    options: [
      "The employer of the workers in the building",
      "The dutyholder — the person who controls the building",
      "The HSE inspector responsible for the area",
      "The contractor carrying out maintenance work",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 4 places the duty to manage asbestos on the dutyholder — the person who has responsibility for the maintenance or repair of non-domestic premises, or who controls access to them. The dutyholder is NOT necessarily the employer of the workers. In multi-occupied buildings, there may be multiple dutyholders. The dutyholder must find ACMs, assess their condition, create a register, write a management plan, and inform anyone who might disturb the asbestos.",
  },
  {
    id: 3,
    question:
      "A client commissioning refurbishment work on a pre-1990 building has specific duties under which regulations?",
    options: [
      "The Management of Health and Safety at Work Regulations 1999 only",
      "The Construction (Design and Management) Regulations 2015 (CDM 2015)",
      "RIDDOR 2013 only",
      "No specific duties — these fall to the contractor alone",
    ],
    correctAnswer: 1,
    explanation:
      "Under CDM 2015, the client (the person commissioning the work) has specific duties including providing pre-construction information such as asbestos survey reports, ensuring a Refurbishment & Demolition survey is carried out before work that disturbs the building fabric, and not allowing work to start until satisfied that asbestos risks have been addressed. These duties apply to commercial and domestic clients, although domestic client duties transfer to the contractor.",
  },
  {
    id: 4,
    question:
      "Which of the following is NOT an employee duty in relation to asbestos?",
    options: [
      "Wearing RPE and PPE as directed",
      "Reporting suspected ACMs or accidental disturbances immediately",
      "Carrying out risk assessments for asbestos work",
      "Checking the asbestos register before starting work in pre-2000 buildings",
    ],
    correctAnswer: 2,
    explanation:
      "Carrying out risk assessments is an employer duty under Regulation 6, not an employee duty. Employees are required to cooperate with the employer's risk assessment process and follow the control measures identified, but the responsibility for conducting the risk assessment lies with the employer. Employees must wear RPE/PPE as directed, report suspected ACMs, and check the asbestos register before work.",
  },
  {
    id: 5,
    question:
      "What is the maximum penalty for the most serious asbestos offences prosecuted by the HSE?",
    options: [
      "A fixed penalty of £10,000",
      "Unlimited fines for organisations, plus imprisonment for up to 2 years for individuals",
      "A maximum fine of £50,000 and a written warning",
      "Community service only — imprisonment is not possible for health and safety offences",
    ],
    correctAnswer: 1,
    explanation:
      "For the most serious asbestos offences, organisations face unlimited fines. Individual directors, managers, and other persons can face personal fines and imprisonment for up to 2 years. The courts also consider the adverse publicity and reputational damage suffered by the offender. Sentencing guidelines introduced in 2016 significantly increased the level of fines for health and safety offences, with some organisations receiving fines in the millions of pounds.",
  },
  {
    id: 6,
    question:
      "What does Fee for Intervention (FFI) mean in the context of HSE enforcement?",
    options: [
      "A fee charged to workers who request asbestos training",
      "A fee the dutyholder/employer must pay if the HSE finds a material breach during an inspection",
      "A fee charged to the HSE by licensed asbestos contractors",
      "A voluntary contribution to the HSE's enforcement budget",
    ],
    correctAnswer: 1,
    explanation:
      "Fee for Intervention (FFI) means that if an HSE inspector identifies a material breach of health and safety law, the dutyholder or employer must pay for the time the HSE spends investigating the breach and taking enforcement action. The current rate is set by the HSE and is charged per hour. FFI applies from the point the material breach is identified. This means that poor asbestos management can cost money even before any formal enforcement action is taken.",
  },
  {
    id: 7,
    question:
      "Under the Public Interest Disclosure Act 1998, which of the following protections does a whistleblower have?",
    options: [
      "Protection only if the report is made to a trade union",
      "Protection from dismissal or unfair treatment for raising genuine health and safety concerns",
      "Protection only if the whistleblower's identity is revealed to their employer",
      "No legal protection — whistleblowing is a voluntary act with no legal safeguards",
    ],
    correctAnswer: 1,
    explanation:
      "The Public Interest Disclosure Act 1998 (PIDA) protects employees who raise genuine concerns about health and safety matters, including poor asbestos management. Whistleblowers cannot be lawfully dismissed, disciplined, or treated unfairly for making a protected disclosure. Reports can be made to the employer, a safety representative, a trade union, or directly to the HSE. Reports to the HSE can be made anonymously if preferred.",
  },
  {
    id: 8,
    question:
      "How often must detailed asbestos training (for workers who carry out asbestos work) be refreshed as a minimum?",
    options: [
      "Every year",
      "Every 2 years",
      "Every 3 years",
      "Every 5 years",
    ],
    correctAnswer: 2,
    explanation:
      "Workers who carry out asbestos work (beyond basic awareness) must receive a full refresher of their detailed asbestos training every 3 years as a minimum. Asbestos awareness training (for those who may encounter but not work with ACMs) should be refreshed annually. Licensed workers must maintain their training as a condition of their licence. These refresher requirements are not optional — they are a legal requirement under Regulation 10 of CAR 2012.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const AsbestosModule5Section4 = () => {
  useSEO({
    title:
      "Roles, Responsibilities & Your Legal Duties | Asbestos Awareness Module 5 Section 4",
    description:
      "Understand the roles and responsibilities of employers, employees, dutyholders, clients, and the HSE in asbestos management. Learn your personal legal duties, whistleblowing rights, and refresher training requirements.",
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
            <Link to="../asbestos-awareness-module-5">
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
          <Users className="h-10 w-10 text-orange-500 mx-auto mb-4" />
          <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 5 &middot; SECTION 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Roles, Responsibilities &amp; Your Legal Duties
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding who is responsible for what in asbestos management &mdash;
            from employer obligations and employee duties to HSE enforcement powers
            and your personal right to raise concerns
          </p>
        </div>

        {/* ─── 01 Employer Duties ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            Employer Duties
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Employers have extensive legal duties under the Control of Asbestos
              Regulations 2012, the Health and Safety at Work etc. Act 1974, and other
              supporting legislation. Failure to meet these duties can result in
              prosecution, unlimited fines, and imprisonment.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-orange-400 font-medium mb-3">
                Key Employer Obligations
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Provide adequate information, instruction, and training</strong>{" "}
                    on asbestos (Regulation 10) &mdash; this includes initial training and
                    ongoing refreshers
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Ensure workers are not exposed above the control limit</strong>{" "}
                    (Regulation 11) &mdash; 0.1 fibres per cm&sup3; averaged over 4 hours
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Carry out risk assessments</strong> for work that may expose
                    workers to asbestos (Regulation 6) &mdash; before any work begins
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Provide suitable RPE and PPE</strong> (Regulations 14, 15)
                    &mdash; properly fitted, maintained, and replaced as needed
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Arrange health surveillance</strong> where required
                    (Regulation 22) &mdash; including medical examinations for licensed and
                    NNLW workers
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Ensure work is carried out by competent, trained workers</strong>{" "}
                    &mdash; no one should carry out asbestos work beyond their training level
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Provide adequate supervision</strong> &mdash; especially for
                    higher-risk work categories
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Maintain records</strong> &mdash; training, health surveillance,
                    exposure, and air monitoring records must be kept for at least 40 years
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Report incidents and dangerous occurrences</strong> under
                    RIDDOR &mdash; including accidental releases of asbestos fibres
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Ensure waste is disposed of safely and legally</strong> &mdash;
                    double-bagged, labelled, and transported to a licensed waste facility
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-orange-300">
                  Employer Accountability
                </h3>
              </div>
              <p className="text-white/80 text-sm">
                Employer duties are <strong className="text-white">non-delegable</strong>.
                This means the employer cannot avoid liability by delegating the task to
                someone else. Even if a competent contractor is engaged, the employer
                retains responsibility for ensuring the work is done safely. Directors and
                senior managers can be held <strong className="text-white">personally
                liable</strong> if an offence was committed with their consent, connivance,
                or neglect.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 02 Employee Duties ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">02</span>
              Employee Duties
            </h2>
            <div className="space-y-4 text-white">
              <p>
                As an employee, you have your own set of legal duties under the Health
                and Safety at Work etc. Act 1974 and the Control of Asbestos Regulations
                2012. These are <strong>personal responsibilities</strong> &mdash; you
                cannot pass them to someone else.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Your Duties as an Employee
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Follow safe systems of work and method statements</strong>{" "}
                      &mdash; these exist to protect you and others
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Wear RPE and PPE as directed</strong> &mdash; correctly fitted,
                      properly maintained, and worn for the full duration of the task
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Report any suspected ACMs or accidental disturbances
                      IMMEDIATELY</strong> &mdash; do not attempt to clean up or manage the
                      situation yourself
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Do not interfere with or misuse safety equipment or
                      controls</strong> &mdash; this is a criminal offence under Section 8
                      of HSWA 1974
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Attend and engage with training provided</strong> &mdash;
                      including refresher training at the required intervals
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Cooperate with the employer on health and safety matters</strong>{" "}
                      &mdash; this includes participating in risk assessments and health
                      surveillance
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Report any health concerns</strong> that might affect your
                      fitness for asbestos work &mdash; including respiratory symptoms
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Not undertake asbestos work for which you are not
                      trained</strong> &mdash; if asked to do work beyond your training, refuse
                      and report it
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Check the asbestos register before starting work</strong> in
                      pre-2000 buildings &mdash; this should become an automatic habit
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    Your Right to Refuse Unsafe Work
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  If you believe you are being asked to work unsafely with asbestos, you
                  have the <strong className="text-white">right to stop work</strong>.
                  Under the Employment Rights Act 1996, you are protected from dismissal
                  or detriment for raising genuine health and safety concerns. Report the
                  situation to your supervisor, safety representative, or the HSE. Your
                  safety &mdash; and the safety of those around you &mdash; must always
                  come first.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── RACI Responsibility Matrix ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-400" />
            RACI Responsibility Matrix
          </h2>
          <p className="text-white/80 mb-4 text-sm">
            The matrix below shows who is Responsible, Accountable, Consulted, or
            Informed for each key asbestos management activity. Use it as a quick
            reference to understand your role and the roles of others.
          </p>

          {/* ─── Key ─── */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 font-medium">
              R &mdash; Responsible (does the work)
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-medium">
              A &mdash; Accountable (must ensure it&rsquo;s done)
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-medium">
              C &mdash; Consulted
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 font-medium">
              I &mdash; Informed
            </span>
          </div>

          {/* ─── Table Grid ─── */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[560px]">
              {/* Header Row */}
              <div className="grid grid-cols-5 gap-px bg-white/5 rounded-t-lg overflow-hidden">
                <div className="bg-orange-500/20 border-b border-orange-500/30 px-3 py-2.5">
                  <p className="text-orange-300 font-semibold text-xs sm:text-sm">Activity</p>
                </div>
                <div className="bg-orange-500/20 border-b border-orange-500/30 px-3 py-2.5 text-center">
                  <p className="text-orange-300 font-semibold text-xs sm:text-sm">Employer</p>
                </div>
                <div className="bg-orange-500/20 border-b border-orange-500/30 px-3 py-2.5 text-center">
                  <p className="text-orange-300 font-semibold text-xs sm:text-sm">Employee</p>
                </div>
                <div className="bg-orange-500/20 border-b border-orange-500/30 px-3 py-2.5 text-center">
                  <p className="text-orange-300 font-semibold text-xs sm:text-sm">Dutyholder</p>
                </div>
                <div className="bg-orange-500/20 border-b border-orange-500/30 px-3 py-2.5 text-center">
                  <p className="text-orange-300 font-semibold text-xs sm:text-sm">HSE</p>
                </div>
              </div>

              {/* Row 1 — Asbestos Register */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/5 px-3 py-2.5 border-b border-white/5">
                  <p className="text-white text-xs sm:text-sm font-medium">Asbestos Register</p>
                </div>
                <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                  <span className="mx-0.5"></span>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300">A</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
              </div>

              {/* Row 2 — Risk Assessment */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/[0.03] px-3 py-2.5 border-b border-white/5">
                  <p className="text-white text-xs sm:text-sm font-medium">Risk Assessment</p>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                </div>
                <div className="bg-purple-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-300">C</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
              </div>

              {/* Row 3 — Training */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/5 px-3 py-2.5 border-b border-white/5">
                  <p className="text-white text-xs sm:text-sm font-medium">Training</p>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                </div>
                <div className="bg-blue-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300">A</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
              </div>

              {/* Row 4 — RPE/PPE Provision */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/[0.03] px-3 py-2.5 border-b border-white/5">
                  <p className="text-white text-xs sm:text-sm font-medium">RPE/PPE Provision</p>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                </div>
                <div className="bg-white/[0.03] px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-white/[0.03] px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
              </div>

              {/* Row 5 — RPE/PPE Use */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/5 px-3 py-2.5 border-b border-white/5">
                  <p className="text-white text-xs sm:text-sm font-medium">RPE/PPE Use</p>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                </div>
                <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
              </div>

              {/* Row 6 — Health Surveillance */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/[0.03] px-3 py-2.5 border-b border-white/5">
                  <p className="text-white text-xs sm:text-sm font-medium">Health Surveillance</p>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                </div>
                <div className="bg-blue-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300">A</span>
                </div>
                <div className="bg-white/[0.03] px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
              </div>

              {/* Row 7 — Incident Reporting */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/5 px-3 py-2.5 border-b border-white/5">
                  <p className="text-white text-xs sm:text-sm font-medium">Incident Reporting</p>
                </div>
                <div className="bg-blue-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300">A</span>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
              </div>

              {/* Row 8 — Waste Disposal */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/[0.03] px-3 py-2.5 border-b border-white/5">
                  <p className="text-white text-xs sm:text-sm font-medium">Waste Disposal</p>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                </div>
                <div className="bg-purple-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-300">C</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
              </div>

              {/* Row 9 — Enforcement */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/5 px-3 py-2.5 border-b border-white/5">
                  <p className="text-white text-xs sm:text-sm font-medium">Enforcement</p>
                </div>
                <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center border-b border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                </div>
              </div>

              {/* Row 10 — Building Maintenance */}
              <div className="grid grid-cols-5 gap-px">
                <div className="bg-white/[0.03] px-3 py-2.5 rounded-bl-lg">
                  <p className="text-white text-xs sm:text-sm font-medium">Building Maintenance</p>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
                <div className="bg-white/[0.03] px-3 py-2.5 text-center">
                  <span className="text-white/40 text-xs">&mdash;</span>
                </div>
                <div className="bg-orange-500/10 px-3 py-2.5 text-center">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-500/20 text-orange-300">R</span>
                </div>
                <div className="bg-green-500/5 px-3 py-2.5 text-center rounded-br-lg">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-300">I</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/50 text-xs text-center mt-3 italic">
            On mobile, scroll horizontally to view all columns
          </p>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 03 Dutyholder Responsibilities (Recap) ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">03</span>
              Dutyholder Responsibilities (Recap)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The dutyholder&rsquo;s obligations under Regulation 4 &mdash; the{" "}
                <strong>duty to manage asbestos</strong> &mdash; were covered in detail in
                Module 2. Here is a recap of the key points, with emphasis on how the
                dutyholder&rsquo;s role relates to employers and employees.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Key Dutyholder Obligations
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Find ACMs</strong> &mdash; through surveys and inspection of
                      the premises
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Assess condition</strong> &mdash; determine the risk posed by
                      each ACM found
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Create and maintain the asbestos register</strong> &mdash;
                      recording location, type, condition, and extent of all ACMs
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Write a management plan</strong> &mdash; setting out how ACMs
                      will be managed, monitored, and reviewed
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Inform contractors and workers</strong> &mdash; anyone who might
                      disturb ACMs must be told of their location and condition
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Monitor and review</strong> &mdash; the condition of ACMs must
                      be checked regularly and the management plan updated
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Dutyholder &ne; Employer
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  The dutyholder is <strong className="text-white">NOT necessarily the
                  employer</strong> of the workers in the building. The dutyholder is
                  whoever has responsibility for the maintenance or repair of non-domestic
                  premises, or who controls access to them. In a multi-occupied building,
                  there may be <strong className="text-white">multiple
                  dutyholders</strong> &mdash; for example, a landlord for common areas and
                  individual tenants for their own spaces. All dutyholders must cooperate
                  with employers and contractors working in the building.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Client Duties Under CDM 2015 ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">04</span>
              Client Duties Under CDM 2015
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Construction (Design and Management) Regulations 2015 place specific
                duties on the <strong>client</strong> &mdash; the person or organisation
                commissioning construction work. These duties are particularly relevant
                when refurbishment or demolition work is planned in buildings that may
                contain asbestos.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Client Duties in Relation to Asbestos
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Provide pre-construction information</strong> including
                      asbestos survey reports, the asbestos register, and details of any
                      known or suspected ACMs
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Ensure a Refurbishment &amp; Demolition survey</strong> is
                      carried out before work that will disturb the building fabric &mdash;
                      this is more intrusive than a management survey and is designed to find
                      all ACMs in the area of work
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Not allow construction work to start</strong> until satisfied
                      that asbestos risks have been properly identified and addressed
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Appoint competent contractors</strong> who understand asbestos
                      risks and have the appropriate training, equipment, and licences
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-medium text-orange-300">Domestic Clients</h3>
                </div>
                <p className="text-white/80 text-sm">
                  CDM 2015 duties apply whether the client is a commercial organisation or
                  a domestic client (e.g. a homeowner commissioning building work). However,
                  for domestic clients, the duties <strong className="text-white">transfer
                  automatically to the contractor</strong> (or the principal contractor if
                  there are multiple contractors). This means the contractor takes on
                  responsibility for ensuring asbestos risks are managed on domestic
                  projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 05 HSE Enforcement ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">05</span>
              HSE Enforcement
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Health and Safety Executive (HSE) is the primary enforcing authority
                for asbestos legislation in the United Kingdom. The HSE has a range of
                enforcement tools at its disposal, from informal advice through to
                criminal prosecution.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Enforcement Tools
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Advice and guidance</strong> &mdash; an informal approach used
                      for minor issues where the inspector believes education will resolve
                      the problem
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Improvement notice</strong> &mdash; requires specific action to
                      be taken within a specified timeframe (typically 21 days). The
                      dutyholder must comply or face prosecution
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Prohibition notice</strong> &mdash; STOPS work immediately
                      where the inspector believes there is a risk of serious personal
                      injury. Takes effect straight away and cannot be appealed before
                      complying
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Prosecution</strong> &mdash; for serious breaches, repeat
                      offenders, or situations where someone has been harmed or placed at
                      serious risk
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Penalties</h3>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Unlimited fines</strong> for
                      organisations convicted of asbestos offences
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Personal fines</strong> for directors,
                      managers, and individuals
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Imprisonment for up to 2 years</strong>{" "}
                      for the most serious offences
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Adverse publicity</strong> and
                      reputational damage &mdash; convictions are published by the HSE
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-lg p-3 sm:p-4 bg-orange-500/10 border-l-2 border-l-orange-500/50 border border-orange-500/30">
                  <p className="font-semibold text-base text-orange-400 mb-2">
                    Unannounced Inspections
                  </p>
                  <p className="text-sm text-white/80">
                    The HSE can visit <strong className="text-white">any workplace
                    without notice</strong> and inspect asbestos management arrangements.
                    Inspectors have the legal power to enter premises, examine documents
                    (including the asbestos register, risk assessments, training records, and
                    health surveillance records), take samples, and interview employees.
                  </p>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-orange-500/10 border-l-2 border-l-orange-500/50 border border-orange-500/30">
                  <p className="font-semibold text-base text-orange-400 mb-2">
                    Fee for Intervention (FFI)
                  </p>
                  <p className="text-sm text-white/80">
                    If an HSE inspector identifies a <strong className="text-white">material
                    breach</strong> of health and safety law, the dutyholder or employer must
                    pay for the time the HSE spends investigating. This charge applies from
                    the point the breach is identified and is in addition to any fines or
                    enforcement action that follows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 06 Whistleblowing Rights ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">06</span>
              Whistleblowing Rights
            </h2>
            <div className="space-y-4 text-white">
              <p>
                If you believe your employer or a dutyholder is not managing asbestos
                properly, you have the <strong>right and the duty</strong> to raise your
                concerns. Staying silent when you know asbestos is being mismanaged puts
                lives at risk &mdash; including your own.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Who You Can Report Concerns To
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Your employer</strong> &mdash; through your line manager,
                      supervisor, or health and safety department
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Your safety representative</strong> &mdash; if one has been
                      appointed for your workplace
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The HSE</strong> &mdash; reports can be made anonymously via
                      the HSE website or by telephone
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Your trade union</strong> &mdash; union representatives can
                      raise concerns on your behalf
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    Legal Protection for Whistleblowers
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    The <strong className="text-white">Public Interest Disclosure Act 1998
                    (PIDA)</strong> protects employees who make protected disclosures about
                    health and safety concerns:
                  </p>
                  <ul className="space-y-2 ml-1">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span>
                        You <strong className="text-white">cannot be dismissed</strong> or
                        treated unfairly for raising genuine health and safety concerns
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span>
                        Reports to the HSE can be made{" "}
                        <strong className="text-white">anonymously</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span>
                        If you are treated unfairly as a result of whistleblowing, you can
                        bring a claim to an{" "}
                        <strong className="text-white">employment tribunal</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 Refresher Training Requirements ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">07</span>
              Refresher Training Requirements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Asbestos training is not a one-off event. The law requires ongoing
                refresher training to ensure workers remain competent and up to date with
                current guidance and legislation. Failure to provide refresher training is
                a breach of Regulation 10.
              </p>

              <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
                {/* Awareness */}
                <div className="rounded-xl border-2 border-green-500/50 bg-green-500/5 overflow-hidden">
                  <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-3 text-center">
                    <p className="text-green-400 font-bold text-base">Awareness Training</p>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <p className="text-white/80">
                      For workers who may encounter ACMs but do not carry out asbestos work
                    </p>
                    <p className="text-green-300 font-semibold text-lg text-center py-2">
                      Annual Refresher
                    </p>
                    <p className="text-white/60 text-xs text-center">
                      Recommended by the HSE
                    </p>
                  </div>
                </div>

                {/* Detailed */}
                <div className="rounded-xl border-2 border-amber-500/50 bg-amber-500/5 overflow-hidden">
                  <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-3 text-center">
                    <p className="text-amber-400 font-bold text-base">Detailed Training</p>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <p className="text-white/80">
                      For workers who carry out asbestos work (NNLW or non-licensed)
                    </p>
                    <p className="text-amber-300 font-semibold text-lg text-center py-2">
                      Every 3 Years
                    </p>
                    <p className="text-white/60 text-xs text-center">
                      Full refresher as a minimum
                    </p>
                  </div>
                </div>

                {/* Licensed */}
                <div className="rounded-xl border-2 border-red-500/50 bg-red-500/5 overflow-hidden">
                  <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-3 text-center">
                    <p className="text-red-400 font-bold text-base">Licensed Workers</p>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <p className="text-white/80">
                      For workers carrying out licensed asbestos removal work
                    </p>
                    <p className="text-red-300 font-semibold text-lg text-center py-2">
                      As Condition of Licence
                    </p>
                    <p className="text-white/60 text-xs text-center">
                      Renewal requires evidence of training
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  What Refresher Training Should Cover
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Changes in legislation</strong> &mdash; any updates to
                      regulations, approved codes of practice, or HSE guidance
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>New guidance</strong> &mdash; including updated task sheets,
                      best practice notes, and industry standards
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Lessons from incidents</strong> &mdash; real-world examples of
                      what went wrong and how to prevent similar incidents
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Site-specific issues</strong> &mdash; any changes to the
                      asbestos register, new ACMs found, or changes to the management plan
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Refresher Training Is a Legal Requirement
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Refresher training is <strong className="text-white">not
                  optional</strong>. It is a legal requirement under Regulation 10 of CAR
                  2012. Training records must be kept and made available for inspection by
                  the HSE. If an employer cannot demonstrate that workers have received
                  up-to-date training, they are in breach of the regulations and face
                  enforcement action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Key Takeaways — Your Responsibilities ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">08</span>
              Key Takeaways &mdash; Your Responsibilities
            </h2>
            <div className="space-y-4 text-white">
              <p>
                This is the final content section of the asbestos awareness course. Before
                you move on to the mock exam, take a moment to reflect on your{" "}
                <strong>personal responsibility</strong> to protect yourself and others
                from asbestos exposure. The knowledge you have gained in this course could
                save your life.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      You have a <strong>personal responsibility</strong> to protect yourself
                      and others from asbestos exposure &mdash; this is not just your
                      employer&rsquo;s job
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Always check the asbestos register</strong> before working in
                      buildings constructed before 2000 &mdash; make this an automatic habit
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      If you suspect asbestos &mdash;{" "}
                      <strong>STOP, do not disturb, and report</strong> immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Wear RPE/PPE as directed</strong> and follow safe systems of
                      work without exception
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Report any accidental disturbance immediately</strong> &mdash;
                      do not try to clean up or contain the situation yourself
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Record any exposure</strong> for your health records &mdash;
                      this information may be critical decades from now
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Inform your GP</strong> of any past asbestos exposure &mdash;
                      they can arrange appropriate monitoring
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Keep your training up to date</strong> &mdash; attend refresher
                      training at the required intervals
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-red-300 text-base">
                    Never Take Shortcuts With Asbestos
                  </h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Asbestos-related diseases kill over 5,000 people in the UK every year.
                  Mesothelioma has no cure. Asbestosis is progressive and irreversible. The
                  diseases caused by asbestos exposure can take 15 to 60 years to develop,
                  meaning the consequences of a shortcut taken today may not become apparent
                  for decades. By then, it is too late. <strong>The controls,
                  procedures, and regulations exist because people have died.</strong> Every
                  rule you follow, every check you make, and every piece of PPE you wear is
                  protecting a life &mdash; yours, your colleagues&rsquo;, and your
                  family&rsquo;s.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">09</span>
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
            title="Roles, Responsibilities & Legal Duties Quiz"
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
            <Link to="../asbestos-awareness-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Health Surveillance &amp; Medical Monitoring
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-6">
              Next: Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default AsbestosModule5Section4;
