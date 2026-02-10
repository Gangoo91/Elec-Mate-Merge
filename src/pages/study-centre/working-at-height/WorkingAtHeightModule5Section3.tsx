import {
  ArrowLeft,
  Users,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  HardHat,
  Shield,
  GraduationCap,
  Building2,
  UserCheck,
  Briefcase,
  ClipboardCheck,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quickCheckQuestions = [
  {
    question:
      "A self-employed electrician is working at height on a domestic property. They argue that health and safety regulations only apply to employers with employees. Are they correct?",
    options: [
      "Yes — self-employed people do not have duties under health and safety law",
      "No — the self-employed have the same duty to work safely as employers, for their own safety and that of others affected by their work",
      "Yes — but only if they are working alone on site",
      "No — but they only need to comply with regulations if the job is worth more than £10,000",
    ],
    correctIndex: 1,
    explanation:
      "Under the Health and Safety at Work etc. Act 1974, self-employed persons have a duty to conduct their work in such a way that they and other persons who may be affected are not exposed to risks to health and safety. The Work at Height Regulations 2005 apply equally to self-employed persons.",
  },
  {
    question:
      "A worker notices that a guardrail on a scaffold is loose but decides not to report it because 'it's not my job — I'm just the electrician.' Is this acceptable?",
    options: [
      "Yes — scaffold defects are only the scaffolder's responsibility",
      "Yes — electricians are not responsible for scaffold maintenance",
      "No — all employees have a duty to report defects and hazards they become aware of",
      "No — but only if they are PASMA-trained",
    ],
    correctIndex: 2,
    explanation:
      "Under Section 7 of the Health and Safety at Work etc. Act 1974 and Regulation 14 of the Management of Health and Safety at Work Regulations 1999, all employees must report hazards and defects they become aware of to their employer or supervisor. The fact that they are an electrician and not a scaffolder does not remove this duty.",
  },
  {
    question:
      "What makes a person 'competent' for the purposes of working at height regulations?",
    options: [
      "They have at least 10 years of construction experience",
      "They have a university degree in engineering",
      "They have sufficient training, experience, knowledge, and personal qualities to perform the task safely",
      "They hold a CSCS card of any colour",
    ],
    correctIndex: 2,
    explanation:
      "Competence is defined as a combination of sufficient training, experience, knowledge, and other qualities that enable a person to perform the task safely. It is task-specific — a person may be competent to use a ladder but not competent to erect a scaffold. There is no single card or certificate that proves competence for all tasks.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between a principal contractor and a contractor under CDM 2015?",
    answer:
      "The principal contractor is appointed by the client on projects with more than one contractor. They are responsible for planning, managing, and coordinating the construction phase, including safety. A contractor is any organisation or individual carrying out construction work. Contractors must plan and manage their own work safely and cooperate with the principal contractor. On projects with only one contractor, there is no principal contractor — the single contractor takes on those responsibilities.",
  },
  {
    question:
      "How often should PASMA training be refreshed?",
    answer:
      "PASMA recommends that the Towers for Users qualification is refreshed at least every 5 years. However, many employers and clients require more frequent refresher training, sometimes annually or every 3 years. Training should also be refreshed whenever there are significant changes to regulations, equipment, or working practices.",
  },
  {
    question:
      "Can an employer delegate their health and safety duties to someone else?",
    answer:
      "An employer can delegate the day-to-day management of health and safety to a competent person (such as a safety manager), but the legal responsibility remains with the employer. The employer must ensure that the person they delegate to is competent, has the authority and resources to do the job, and is monitored to ensure the system is working. An employer cannot escape liability by delegating if they fail to ensure the delegated person is competent and resourced.",
  },
  {
    question:
      "What are toolbox talks and are they a legal requirement?",
    answer:
      "Toolbox talks are short, focused safety briefings — typically 10-15 minutes — covering specific topics relevant to the current work. They are not a specific legal requirement, but they are a highly effective way of meeting the general duty to provide information, instruction, and training under Section 2 of the Health and Safety at Work etc. Act 1974. Most well-managed construction sites conduct toolbox talks regularly, and many clients require them as a condition of working on their projects.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under the Health and Safety at Work etc. Act 1974, which of the following is an employer's duty?",
    options: [
      "To provide all workers with safety boots at no cost",
      "To ensure, so far as is reasonably practicable, the health, safety, and welfare of all employees",
      "To guarantee that no accidents will ever occur",
      "To provide free car parking within 50 metres of the work area",
    ],
    correctAnswer: 1,
    explanation:
      "Section 2 of the HASAWA 1974 states that employers must ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees. This includes providing safe systems of work, suitable equipment, training, supervision, and a safe working environment.",
  },
  {
    id: 2,
    question:
      "An employee deliberately removes a guardrail to make their job easier, despite knowing it is a safety requirement. What is the employee's legal position?",
    options: [
      "They have no legal liability — only the employer is responsible",
      "They could be prosecuted under Section 7 and Section 8 of the HASAWA 1974 for not cooperating and for interfering with safety provisions",
      "They can only be disciplined internally, not prosecuted",
      "They are only liable if someone is actually injured as a result",
    ],
    correctAnswer: 1,
    explanation:
      "Section 7 requires employees to take reasonable care for their own safety and that of others, and to cooperate with their employer. Section 8 makes it an offence to intentionally or recklessly interfere with or misuse anything provided in the interests of safety. Deliberately removing a guardrail violates both sections.",
  },
  {
    id: 3,
    question:
      "Under CDM 2015, who is responsible for appointing a principal designer and principal contractor?",
    options: [
      "The Health and Safety Executive",
      "The local authority building control department",
      "The client",
      "The main contractor",
    ],
    correctAnswer: 2,
    explanation:
      "The Construction (Design and Management) Regulations 2015 place the duty to appoint a principal designer and a principal contractor on the client, for projects involving more than one contractor. The client must ensure these appointments are made as early as practicable and that the appointees are competent for their roles.",
  },
  {
    id: 4,
    question:
      "Which qualification is the industry standard for competence in assembling mobile access towers?",
    options: [
      "CSCS Gold Card",
      "IPAF Operator Licence",
      "PASMA Towers for Users",
      "NEBOSH General Certificate",
    ],
    correctAnswer: 2,
    explanation:
      "The PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) Towers for Users course is the industry-standard qualification for the safe assembly, use, and dismantling of mobile access towers. IPAF covers MEWPs, CSCS is a site competence card scheme, and NEBOSH is a health and safety management qualification.",
  },
  {
    id: 5,
    question:
      "A contractor on a multi-contractor construction site discovers a hazard that affects other workers. What must they do?",
    options: [
      "Nothing — it is only the principal contractor's problem",
      "Fix it themselves regardless of whether it is their work area",
      "Report it to the principal contractor and cooperate to resolve it",
      "Only deal with it if it directly affects their own workers",
    ],
    correctAnswer: 2,
    explanation:
      "Under CDM 2015, all contractors must cooperate with the principal contractor and other contractors on site. If a hazard is identified that affects others, it must be reported so that coordinated action can be taken. The principal contractor is responsible for coordinating safety across all contractors.",
  },
  {
    id: 6,
    question:
      "How often must harness training typically be refreshed?",
    options: [
      "Every year",
      "Every 3-5 years, or when equipment or regulations change",
      "Every 10 years",
      "Never — once trained, always competent",
    ],
    correctAnswer: 1,
    explanation:
      "Most harness manufacturers and training providers recommend refresher training every 3-5 years. However, training should also be refreshed whenever new equipment is introduced, regulations change, or an incident indicates a knowledge gap. Competence degrades over time without practice.",
  },
  {
    id: 7,
    question:
      "What is the purpose of a toolbox talk?",
    options: [
      "To replace formal training requirements",
      "To provide short, focused safety briefings on specific topics relevant to current work",
      "To allow workers to complain about management",
      "To satisfy insurance requirements only",
    ],
    correctAnswer: 1,
    explanation:
      "Toolbox talks are short (10-15 minute) safety briefings that cover specific topics relevant to the work being carried out. They supplement — but do not replace — formal training. They are an effective way to reinforce key safety messages, share lessons from recent incidents, and address site-specific hazards.",
  },
  {
    id: 8,
    question:
      "A competent person for scaffold inspection must have which combination of attributes?",
    options: [
      "A CSCS card and at least 5 years on site",
      "A degree in structural engineering",
      "Sufficient training, experience, and knowledge specifically in scaffold inspection",
      "Any health and safety qualification",
    ],
    correctAnswer: 2,
    explanation:
      "Competence for scaffold inspection requires specific training (such as CISRS Scaffold Inspection Training Scheme), relevant experience in scaffold work, and sufficient knowledge of the regulations, standards, and structural principles that apply. A general health and safety qualification alone does not make someone competent to inspect scaffolds.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function WorkingAtHeightModule5Section3() {
  useSEO({
    title:
      "Roles, Responsibilities & Competence | Module 5 | Working at Height",
    description:
      "Employer, employee, contractor, and client duties under CDM 2015, competent person definition, training requirements, and toolbox talks for working at height.",
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
            <Link to="../working-at-height-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">Module 5 {"\u2022"} Section 3</p>
            <h1 className="text-sm font-semibold text-white truncate">
              Roles, Responsibilities & Competence
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-blue-500/20 border border-amber-500/30 mb-4">
            <Users className="h-8 w-8 text-amber-500" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-500 text-xs font-semibold">
                MODULE 5 &middot; SECTION 3
              </span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Roles, Responsibilities & Competence
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding who is responsible for what — employer, employee,
            contractor, and client duties, the competent person definition, and
            training requirements for safe work at height
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-amber-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Everyone on site has responsibilities for safety. Employers must
            provide safe systems, equipment, and training. Employees must
            cooperate, use equipment properly, and report defects. Contractors
            must manage their own work safely. Clients under CDM 2015 must
            appoint a principal designer and principal contractor. A competent
            person has the right combination of training, experience, and
            knowledge for the specific task. Key qualifications include PASMA,
            IPAF, CISRS, and harness training — all requiring regular refreshers.
          </p>
        </div>

        {/* Legal Framework Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-blue-400 mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Legal Framework
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Responsibilities for work at height flow from several key pieces of
            legislation: the Health and Safety at Work etc. Act 1974 (general
            duties), the Management of Health and Safety at Work Regulations 1999
            (risk assessment and management), the Work at Height Regulations 2005
            (specific work-at-height requirements), and the Construction (Design
            and Management) Regulations 2015 (construction-specific duties for
            clients, designers, and contractors).
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Describe the key duties of employers under the HASAWA 1974 and Work at Height Regulations 2005",
              "Explain employee duties — to cooperate, use equipment properly, and report defects",
              "Outline contractor duties under CDM 2015 — to plan, manage, and coordinate their own work safely",
              "Explain client duties under CDM 2015 — appointing a principal designer and principal contractor",
              "Define what makes a person 'competent' for work at height tasks",
              "List the key training qualifications: PASMA, IPAF, CISRS, harness training",
              "Describe the purpose and value of toolbox talks",
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 — Employer Duties                                 */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">
              01
            </span>
            <h3 className="text-xl font-semibold text-white">
              Employer Duties
            </h3>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Employers carry the primary responsibility for ensuring the health
              and safety of their employees. Under the Health and Safety at Work
              etc. Act 1974, Section 2, they must ensure, so far as is
              reasonably practicable, the health, safety, and welfare of all
              employees while at work.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-amber-400" />
                Specific Employer Duties for Work at Height
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Avoid work at height</strong>{" "}
                    where reasonably practicable — can the task be done from the
                    ground instead?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Provide a safe system of work</strong>{" "}
                    — risk assessments, method statements, permits to work where
                    required
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Select suitable equipment</strong>{" "}
                    — the right type of access equipment for the task,
                    environment, and duration
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Provide training</strong>{" "}
                    — appropriate to the equipment and tasks, including
                    emergency procedures
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Ensure adequate supervision</strong>{" "}
                    — proportionate to the risk, competence of workers, and
                    complexity of the task
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Maintain equipment</strong>{" "}
                    — ensure inspection, maintenance, and thorough examination
                    schedules are followed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Plan for emergencies</strong>{" "}
                    — rescue plans, trained rescuers, and rescue equipment must
                    be in place before work begins
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Enforcement Consequences
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Employers who fail in their duties can face HSE enforcement
                action including improvement notices, prohibition notices (which
                can stop work immediately), prosecution, and unlimited fines. In
                cases of gross negligence leading to death, individual managers
                and directors can be personally prosecuted under the Corporate
                Manslaughter and Corporate Homicide Act 2007 or gross negligence
                manslaughter.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 — Employee Duties                                 */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              02
            </span>
            <h3 className="text-xl font-semibold text-white">
              Employee Duties
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Employees are not passive recipients of safety — they have active
              legal duties. Under Sections 7 and 8 of the HASAWA 1974, every
              employee at work must:
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Take reasonable care</strong>{" "}
                    for their own health and safety and that of other persons
                    who may be affected by their acts or omissions at work
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Cooperate with the employer</strong>{" "}
                    to enable them to comply with health and safety duties —
                    attend training, follow procedures, wear PPE as instructed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Not misuse or interfere</strong>{" "}
                    with anything provided for health and safety purposes —
                    this includes guardrails, harnesses, warning signs, and
                    safety equipment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Report defects and hazards</strong>{" "}
                    to their employer or supervisor — including damaged
                    equipment, missing guardrails, and unsafe conditions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Use equipment properly</strong>{" "}
                    in accordance with their training and the manufacturer's
                    instructions
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Employee Liability
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Employees can be personally prosecuted for breaches of Sections
                7 and 8. Fines are typically lower than those for employers, but
                the principle is clear: safety is everyone's responsibility.
                Deliberately removing a guardrail, refusing to wear a harness,
                or misusing access equipment are all prosecutable offences.
              </p>
            </div>
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
        {/*  SECTION 03 — Contractor Duties                               */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-sm">
              03
            </span>
            <h3 className="text-xl font-semibold text-white">
              Contractor Duties
            </h3>
          </div>
          <div className="border-l-2 border-orange-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Under CDM 2015, contractors are responsible for planning and
              managing their own work safely. On multi-contractor sites, they
              must also cooperate with the principal contractor and other
              contractors to ensure safety across the whole project.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3">
                Key Contractor Duties Under CDM 2015
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Plan, manage, and monitor their own work to ensure it is carried out safely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Provide information, instruction, and training to their workers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Cooperate with the principal contractor and comply with site rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Report hazards that may affect other workers on site</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Not start work unless satisfied that adequate welfare facilities are available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Ensure workers under their control are competent for the tasks assigned</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 — Client Duties Under CDM 2015                    */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">
              04
            </span>
            <h3 className="text-xl font-semibold text-white">
              Client Duties Under CDM 2015
            </h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The <strong className="text-amber-400">client</strong> is the
              person or organisation for whom the construction work is being
              carried out. Under CDM 2015, clients have significant duties —
              they cannot simply hire a contractor and walk away.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-purple-400" />
                Client Duties
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Appoint a principal designer</strong>{" "}
                    (for projects with more than one contractor) — responsible
                    for planning, managing, and coordinating health and safety
                    during the pre-construction phase
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Appoint a principal contractor</strong>{" "}
                    (for projects with more than one contractor) — responsible
                    for planning, managing, and coordinating health and safety
                    during the construction phase
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Ensure adequate arrangements</strong>{" "}
                    are made for managing the project — including welfare,
                    time, and resources
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Provide pre-construction information</strong>{" "}
                    — information about the site, existing structures, hazards,
                    and previous surveys
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Allow adequate time</strong>{" "}
                    — not set unrealistic deadlines that compromise safety
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Domestic Clients
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                A domestic client is someone who has construction work done on
                their own home (or a family member's home) that is not related
                to a business. CDM 2015 duties for domestic clients are normally
                transferred to the contractor (single contractor) or the
                principal contractor (multiple contractors). However, domestic
                clients can still be held responsible if they make specific
                arrangements that compromise safety.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 — Self-Employed Duties                            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 font-bold text-sm">
              05
            </span>
            <h3 className="text-xl font-semibold text-white">
              Self-Employed Duties
            </h3>
          </div>
          <div className="border-l-2 border-teal-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Self-employed persons have essentially the same responsibilities
              as employers — for their own safety and the safety of anyone
              affected by their work. This is a common misconception: many
              self-employed tradespeople believe health and safety regulations
              do not apply to them.
            </p>
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Key Self-Employed Duties
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Conduct work so as not to put themselves or others at risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Carry out risk assessments for their work activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Use suitable equipment and maintain it properly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Hold appropriate training and qualifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Cooperate with others on multi-contractor sites</span>
                </li>
              </ul>
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
        {/*  SECTION 06 — The Competent Person                            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-400 font-bold text-sm">
              06
            </span>
            <h3 className="text-xl font-semibold text-white">
              The Competent Person
            </h3>
          </div>
          <div className="border-l-2 border-green-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The term "competent person" appears throughout health and safety
              legislation. It is not defined by a single qualification or card —
              instead, it is a combination of attributes specific to the task
              being performed.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-green-400" />
                Definition of Competence
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                A competent person has a combination of:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <h5 className="text-green-400 font-semibold text-xs mb-1">
                    Training
                  </h5>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Formal training appropriate to the task — certified courses
                    from recognised bodies (PASMA, IPAF, CISRS)
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <h5 className="text-green-400 font-semibold text-xs mb-1">
                    Experience
                  </h5>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Practical, hands-on experience of performing the task under
                    supervision before working independently
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <h5 className="text-green-400 font-semibold text-xs mb-1">
                    Knowledge
                  </h5>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Understanding of the relevant regulations, standards,
                    manufacturer instructions, and hazards
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <h5 className="text-green-400 font-semibold text-xs mb-1">
                    Personal Qualities
                  </h5>
                  <p className="text-white/60 text-xs leading-relaxed">
                    The ability to recognise their own limitations, stop work
                    when unsure, and seek guidance when needed
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2">
                Competence Is Task-Specific
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                A person may be competent to use a ladder but not competent to
                erect scaffolding. A person trained in PASMA towers may not be
                competent to operate a MEWP. Competence must be assessed for
                each specific task, and the level of competence required
                increases with the complexity and risk of the task.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 07 — Training Requirements                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-sm">
              07
            </span>
            <h3 className="text-xl font-semibold text-white">
              Training Requirements
            </h3>
          </div>
          <div className="border-l-2 border-indigo-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The following are the key industry-recognised training
              qualifications for work at height. While holding a card does not
              automatically make someone competent, these qualifications are
              widely accepted as evidence of appropriate training.
            </p>

            <div className="space-y-3">
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-400" />
                  PASMA — Tower Scaffolds
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Prefabricated Access Suppliers' and Manufacturers' Association</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Towers for Users — the standard course for assembling and using mobile access towers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Refresher recommended every 5 years (many clients require more frequent)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-400" />
                  IPAF — MEWPs
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>International Powered Access Federation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Operator licence for specific MEWP categories (3a, 3b, 1b, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>PAL Card valid for 5 years; refresher training before expiry</span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-400" />
                  Harness Training
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Provided by harness manufacturers or approved training providers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Covers correct fitting, inspection, use, connection, and rescue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Refresher typically every 3 years or when equipment changes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-400" />
                  CISRS — Scaffold Inspection
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Construction Industry Scaffolders Record Scheme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Scaffold Inspection Training Scheme (SITS) for competent inspectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Advanced scaffolder and basic scaffolder cards for erectors</span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-400" />
                  First Aid
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>First Aid at Work (FAW) — 3-day course, valid for 3 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Emergency First Aid at Work (EFAW) — 1-day course, valid for 3 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Should include suspension trauma awareness for work-at-height sites</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Refresher Summary */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Refresher Training Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-amber-400 font-bold min-w-[100px] text-xs flex-shrink-0">PASMA</span>
                  <span className="text-white/70 text-xs">Every 5 years (some clients require 3 years)</span>
                </div>
                <div className="flex items-center gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-amber-400 font-bold min-w-[100px] text-xs flex-shrink-0">IPAF</span>
                  <span className="text-white/70 text-xs">Every 5 years (PAL Card expiry)</span>
                </div>
                <div className="flex items-center gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-amber-400 font-bold min-w-[100px] text-xs flex-shrink-0">Harness</span>
                  <span className="text-white/70 text-xs">Every 3 years, or when equipment changes</span>
                </div>
                <div className="flex items-center gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-amber-400 font-bold min-w-[100px] text-xs flex-shrink-0">First Aid</span>
                  <span className="text-white/70 text-xs">Every 3 years (FAW and EFAW)</span>
                </div>
                <div className="flex items-center gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-amber-400 font-bold min-w-[100px] text-xs flex-shrink-0">CISRS</span>
                  <span className="text-white/70 text-xs">Card renewal varies by grade; typically 3-5 years</span>
                </div>
              </div>
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
        {/*  SECTION 08 — Toolbox Talks                                   */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">
              08
            </span>
            <h3 className="text-xl font-semibold text-white">
              Toolbox Talks
            </h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Toolbox talks are short, focused safety briefings — typically
              10-15 minutes — delivered to workers on a specific topic relevant
              to the work being carried out. They are one of the most effective
              and practical ways to communicate safety information on site.
            </p>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-cyan-400" />
                Effective Toolbox Talks
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Keep them short</strong> —
                    10-15 minutes maximum; longer and attention drops
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Make them relevant</strong>{" "}
                    — cover topics directly related to today's work (not a
                    generic presentation)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Be interactive</strong> —
                    ask questions, invite feedback, discuss recent near misses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Record attendance</strong>{" "}
                    — sign-in sheets provide evidence of information delivery
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Vary the topics</strong> —
                    rotate through different hazards, procedures, and lessons
                    learned
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  RACI Responsibility Matrix Diagram                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-amber-400" />
            RACI Responsibility Matrix
          </h3>
          <div className="bg-gradient-to-br from-amber-500/5 to-purple-500/5 border border-amber-500/20 rounded-xl p-5">
            <p className="text-white/60 text-xs mb-4">
              <strong className="text-amber-400">R</strong> = Responsible
              (does the work) &middot;{" "}
              <strong className="text-blue-400">A</strong> = Accountable
              (ultimately answerable) &middot;{" "}
              <strong className="text-green-400">C</strong> = Consulted
              (provides input) &middot;{" "}
              <strong className="text-purple-400">I</strong> = Informed
              (kept up to date)
            </p>

            {/* Mobile-optimised matrix */}
            <div className="overflow-x-auto -mx-2 px-2">
              <div className="min-w-[500px]">
                {/* Header Row */}
                <div className="grid grid-cols-5 gap-1 mb-1">
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <span className="text-white/40 text-[10px] font-semibold">TASK</span>
                  </div>
                  <div className="bg-amber-500/10 rounded-lg p-2 text-center">
                    <span className="text-amber-400 text-[10px] font-semibold">EMPLOYER</span>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-2 text-center">
                    <span className="text-blue-400 text-[10px] font-semibold">EMPLOYEE</span>
                  </div>
                  <div className="bg-orange-500/10 rounded-lg p-2 text-center">
                    <span className="text-orange-400 text-[10px] font-semibold">CONTRACTOR</span>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-2 text-center">
                    <span className="text-purple-400 text-[10px] font-semibold">CLIENT</span>
                  </div>
                </div>

                {/* Data Rows */}
                {[
                  { task: "Plan work at height", e: "A, R", w: "C", c: "R", cl: "A" },
                  { task: "Provide equipment", e: "A, R", w: "I", c: "R", cl: "C" },
                  { task: "Inspect equipment", e: "A", w: "R", c: "R", cl: "I" },
                  { task: "Use equipment safely", e: "C", w: "R", c: "C", cl: "I" },
                  { task: "Report defects", e: "I", w: "R", c: "R", cl: "I" },
                  { task: "Rescue & emergency", e: "A, R", w: "R", c: "R", cl: "I" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-5 gap-1 mb-1 ${
                      i % 2 === 0 ? "" : ""
                    }`}
                  >
                    <div className="bg-white/5 rounded-lg p-2">
                      <span className="text-white text-[10px] font-medium">
                        {row.task}
                      </span>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2 text-center">
                      <span className="text-amber-400 text-[10px] font-bold">{row.e}</span>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2 text-center">
                      <span className="text-blue-400 text-[10px] font-bold">{row.w}</span>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2 text-center">
                      <span className="text-orange-400 text-[10px] font-bold">{row.c}</span>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2 text-center">
                      <span className="text-purple-400 text-[10px] font-bold">{row.cl}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-white/50 text-xs italic mt-3">
              This matrix provides a general guide. Specific responsibilities
              may vary depending on the project structure, contractual
              arrangements, and whether CDM 2015 applies.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Key Terminology                                              */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Key Terminology
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">CDM 2015</span>
                <span className="text-white/70">Construction (Design and Management) Regulations 2015 — the primary regulations for managing health and safety on construction projects</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">Competent Person</span>
                <span className="text-white/70">Someone with sufficient training, experience, knowledge, and personal qualities to perform a specific task safely</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">Principal Contractor</span>
                <span className="text-white/70">Appointed by the client on multi-contractor projects to plan, manage, and coordinate health and safety during the construction phase</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">HASAWA 1974</span>
                <span className="text-white/70">Health and Safety at Work etc. Act 1974 — the primary piece of UK health and safety legislation, establishing general duties for employers and employees</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">PASMA</span>
                <span className="text-white/70">Prefabricated Access Suppliers' and Manufacturers' Association — industry body providing training for mobile access tower users</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">CISRS</span>
                <span className="text-white/70">Construction Industry Scaffolders Record Scheme — the scaffolding industry's card scheme for trained and competent scaffolders and inspectors</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <h4 className="font-medium text-white mb-2 text-sm">
                  {faq.question}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 3 — Roles, Responsibilities & Competence"
          questions={quizQuestions}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Navigation Footer                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-amber-500 hover:bg-amber-500/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5-section-4">
              Next: Inspection Regimes & Record Keeping
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
