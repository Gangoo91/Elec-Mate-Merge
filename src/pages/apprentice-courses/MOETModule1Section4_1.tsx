import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Health and Safety at Work Act 1974 - MOET Module 1 Section 4.1";
const DESCRIPTION = "Comprehensive guide to the Health and Safety at Work Act 1974 (HSWA) for electrical maintenance technicians: structure, enabling act principles, Sections 2-8 duties, SFARP, safety policies, HSE enforcement and penalties.";

const quickCheckQuestions = [
  {
    id: "hswa-enabling-act",
    question: "What does it mean that the HSWA 1974 is an 'enabling act'?",
    options: [
      "It allows employers to set their own safety standards without restriction",
      "It provides the framework under which more specific regulations can be made",
      "It enables employees to refuse any work they consider dangerous",
      "It enables the HSE to close any business immediately"
    ],
    correctIndex: 1,
    explanation: "The HSWA 1974 is an enabling act because it establishes the broad legal framework and grants powers to the Secretary of State to make more specific regulations (such as the Electricity at Work Regulations 1989) without needing a new Act of Parliament for each set of rules."
  },
  {
    id: "section2-duty",
    question: "Under Section 2 of the HSWA 1974, who has the primary duty to ensure the health, safety and welfare of employees at work?",
    options: [
      "The Health and Safety Executive",
      "The employee themselves",
      "The employer",
      "The local authority"
    ],
    correctIndex: 2,
    explanation: "Section 2 places the primary duty on the employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees. This includes providing safe systems of work, safe plant and equipment, and adequate information, instruction, training and supervision."
  },
  {
    id: "sfarp-meaning",
    question: "What does 'so far as is reasonably practicable' (SFARP) require duty holders to consider?",
    options: [
      "Only the cost of safety measures",
      "Only the severity of the hazard",
      "The degree of risk weighed against the time, trouble, cost and difficulty of reducing it",
      "Whether competitors have implemented the same measures"
    ],
    correctIndex: 2,
    explanation: "SFARP requires a balancing exercise: the degree of risk on one side, weighed against the sacrifice (time, trouble, cost and physical difficulty) of the measures needed to avert it. If the risk is significant, only grossly disproportionate costs would justify not taking action. This was established in the Edwards v. National Coal Board (1949) case."
  },
  {
    id: "hse-enforcement",
    question: "Which enforcement notice requires immediate cessation of an activity that the inspector considers involves a risk of serious personal injury?",
    options: [
      "Improvement notice",
      "Prohibition notice",
      "Compliance notice",
      "Warning notice"
    ],
    correctIndex: 1,
    explanation: "A prohibition notice is issued when an inspector considers there is a risk of serious personal injury. It can take immediate effect (a deferred prohibition notice sets a date) and requires the activity to cease until the matter is remedied. An improvement notice, by contrast, gives a specified time period to rectify a contravention."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Health and Safety at Work Act 1974 is best described as:",
    options: [
      "A set of prescriptive rules specifying exact safety measures for every industry",
      "An enabling act that sets out broad duties and allows specific regulations to be made under it",
      "A voluntary code of practice for large employers only",
      "A European directive transposed into UK law"
    ],
    correctAnswer: 1,
    explanation: "The HSWA 1974 is an enabling act — it establishes the overarching framework of duties and grants powers to create more detailed, specific regulations (such as EAWR 1989, PUWER, LOLER) through statutory instruments, without requiring a new Act of Parliament each time."
  },
  {
    id: 2,
    question: "Section 2 of the HSWA 1974 requires employers to provide all of the following EXCEPT:",
    options: [
      "Safe plant and safe systems of work",
      "Free personal protective equipment for all visitors",
      "Information, instruction, training and supervision",
      "A safe working environment with adequate welfare facilities"
    ],
    correctAnswer: 1,
    explanation: "Section 2 requires employers to provide safe plant, safe systems of work, safe handling/storage/transport of substances, information/instruction/training/supervision, and a safe workplace with adequate welfare. There is no blanket requirement to provide free PPE to all visitors — though the PPE at Work Regulations may require it in specific circumstances."
  },
  {
    id: 3,
    question: "Under Section 3 of the HSWA 1974, employers must ensure the health and safety of:",
    options: [
      "Only their direct employees",
      "Non-employees who may be affected by the employer's undertaking",
      "Only visitors who have signed in at reception",
      "Only contractors with a valid permit to work"
    ],
    correctAnswer: 1,
    explanation: "Section 3 extends the employer's duty beyond their own employees to include any person who is not their employee but who may be affected by the employer's undertaking. This covers contractors, visitors, members of the public, and anyone else who could be impacted by the work activity."
  },
  {
    id: 4,
    question: "An electrical maintenance technician's duty under Section 7 of the HSWA 1974 includes:",
    options: [
      "Writing the company health and safety policy",
      "Appointing safety representatives",
      "Taking reasonable care for their own health and safety and that of others affected by their acts or omissions",
      "Carrying out annual audits of the PTW system"
    ],
    correctAnswer: 2,
    explanation: "Section 7 places a duty on every employee to take reasonable care for their own health and safety and that of other persons who may be affected by their acts or omissions at work. For a maintenance technician, this means following safe isolation procedures, using PPE correctly, and not taking shortcuts that could endanger colleagues."
  },
  {
    id: 5,
    question: "Section 8 of the HSWA 1974 makes it an offence to:",
    options: [
      "Refuse to work overtime",
      "Intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare",
      "Report a safety concern to the HSE",
      "Request additional PPE from the employer"
    ],
    correctAnswer: 1,
    explanation: "Section 8 makes it a criminal offence for any person to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare. Examples include removing safety guards from machinery, disabling RCDs, or misusing lock-off devices."
  },
  {
    id: 6,
    question: "A written health and safety policy is required under Section 2(3) of the HSWA 1974 when an employer has:",
    options: [
      "Any number of employees",
      "5 or more employees",
      "10 or more employees",
      "50 or more employees"
    ],
    correctAnswer: 1,
    explanation: "Section 2(3) requires every employer with five or more employees to prepare and keep up to date a written statement of their general health and safety policy, the organisation for carrying it out, and the arrangements in force. This must be brought to the attention of all employees."
  },
  {
    id: 7,
    question: "The SFARP (so far as is reasonably practicable) principle means that:",
    options: [
      "Employers must eliminate all risks regardless of cost",
      "The risk must be weighed against the sacrifice needed to reduce it — if grossly disproportionate, the duty is discharged",
      "Only risks that have previously caused injury need to be addressed",
      "The employer need only comply when instructed by an HSE inspector"
    ],
    correctAnswer: 1,
    explanation: "SFARP requires duty holders to reduce risk unless the cost (in time, trouble, money and physical difficulty) is grossly disproportionate to the reduction in risk achieved. The burden of proof lies with the duty holder to demonstrate that it was not reasonably practicable to do more."
  },
  {
    id: 8,
    question: "An HSE inspector issues an improvement notice. The recipient must:",
    options: [
      "Stop all work immediately",
      "Remedy the contravention within the time period specified in the notice",
      "Pay an on-the-spot fine",
      "Dismiss the employee responsible"
    ],
    correctAnswer: 1,
    explanation: "An improvement notice specifies the contravention and gives a time period (not less than 21 days) within which the duty holder must remedy it. Work can continue during this period unless a separate prohibition notice is also issued. The recipient has a right of appeal to an employment tribunal within 21 days."
  },
  {
    id: 9,
    question: "Under the HSWA 1974, the maximum penalty for certain offences tried on indictment (in the Crown Court) is:",
    options: [
      "A fine of £20,000",
      "6 months' imprisonment",
      "An unlimited fine and/or up to 2 years' imprisonment",
      "A written warning from the HSE"
    ],
    correctAnswer: 2,
    explanation: "For the most serious offences under the HSWA 1974 tried on indictment in the Crown Court, the maximum penalty is an unlimited fine and/or imprisonment for up to 2 years. Additionally, the Sentencing Council guidelines (2016) have led to significantly higher fines, particularly for larger organisations."
  },
  {
    id: 10,
    question: "How does the HSWA 1974 apply specifically to electrical maintenance work?",
    options: [
      "It does not — electrical work is covered solely by BS 7671",
      "It provides the overarching legal framework under which the Electricity at Work Regulations 1989 were made",
      "It only applies to electrical contractors, not maintenance technicians",
      "It applies only to high voltage work above 1000 V"
    ],
    correctAnswer: 1,
    explanation: "The HSWA 1974 is the parent legislation under which the Electricity at Work Regulations 1989 were made using powers in Section 15. All electrical maintenance work falls under the general duties of the HSWA and the specific requirements of the EAWR. BS 7671 is a non-statutory standard, not legislation."
  },
  {
    id: 11,
    question: "Safety representatives appointed by recognised trade unions have the right to:",
    options: [
      "Veto any management decision on health and safety",
      "Inspect the workplace, investigate complaints and attend safety committee meetings",
      "Issue improvement notices to the employer",
      "Dismiss employees who breach safety rules"
    ],
    correctAnswer: 1,
    explanation: "Under the Safety Representatives and Safety Committees Regulations 1977 (made under the HSWA), trade union-appointed safety representatives have the right to inspect the workplace, investigate potential hazards and complaints, attend safety committee meetings, and be consulted by the employer on health and safety matters. They cannot issue enforcement notices — only HSE inspectors can do that."
  },
  {
    id: 12,
    question: "Under ST1426, knowledge of the HSWA 1974 maps to which area of the apprenticeship standard?",
    options: [
      "Electrical principles and theory",
      "Statutory and regulatory compliance within health and safety",
      "Technical drawing interpretation",
      "Quality management systems"
    ],
    correctAnswer: 1,
    explanation: "ST1426 (Maintenance and Operations Engineering Technician) requires knowledge of statutory and regulatory requirements relating to health and safety. The HSWA 1974 is the foundational legislation that underpins all workplace health and safety duties, making it a core knowledge requirement for the standard."
  }
];

const faqs = [
  {
    question: "Does the HSWA 1974 apply to self-employed electricians?",
    answer: "Yes. Section 3(2) places duties on self-employed persons to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that they and other persons who may be affected are not exposed to risks to their health or safety. A sole trader electrical maintenance engineer has the same duties as a large employer in terms of not creating risks for others."
  },
  {
    question: "What is the difference between 'absolute' duties and 'SFARP' duties in the HSWA?",
    answer: "Absolute duties use the word 'shall' with no qualification — they must be complied with regardless of cost (e.g., Section 8). SFARP duties include the phrase 'so far as is reasonably practicable', allowing a cost-benefit analysis. Most duties under the HSWA are SFARP duties. However, under the EAWR 1989, many regulations impose absolute duties for electrical safety specifically."
  },
  {
    question: "Can an employee be prosecuted under the HSWA 1974?",
    answer: "Yes. Sections 7 and 8 place duties directly on employees. An employee who recklessly interferes with safety equipment (Section 8) or who fails to take reasonable care (Section 7) can be prosecuted personally. In practice, prosecutions of employees are less common than those of employers, but they do occur — particularly where the employee's actions were clearly reckless or negligent."
  },
  {
    question: "How does the HSWA interact with the Corporate Manslaughter Act 2007?",
    answer: "The Corporate Manslaughter and Corporate Homicide Act 2007 creates a separate offence for organisations whose gross failures in managing health and safety cause death. A prosecution under this Act does not prevent a parallel prosecution under the HSWA 1974. Individual directors and managers can be prosecuted under HSWA Section 37 if the offence was committed with their consent, connivance, or neglect."
  },
  {
    question: "What happened to the 'six-pack' regulations made under the HSWA?",
    answer: "The 'six-pack' refers to the 1992 regulations implementing EU directives: Management of H&S at Work, Workplace Regulations, Manual Handling, Display Screen Equipment, PPE, and PUWER. All remain in force (with amendments) post-Brexit as retained UK law. They sit beneath the HSWA 1974 in the legislative hierarchy, providing more specific requirements within the overarching framework."
  }
];

const MOETModule1Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4">
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
            <span>Module 1.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Health and Safety at Work Act 1974
          </h1>
          <p className="text-white/80">
            The cornerstone of UK health and safety legislation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>HSWA:</strong> The primary UK health and safety legislation — an enabling act</li>
              <li className="pl-1"><strong>Sections 2–8:</strong> Core duties on employers, employees and others</li>
              <li className="pl-1"><strong>SFARP:</strong> So far as is reasonably practicable — the key legal test</li>
              <li className="pl-1"><strong>Enforcement:</strong> HSE inspectors, improvement and prohibition notices</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Parent act:</strong> EAWR 1989 made under HSWA Section 15 powers</li>
              <li className="pl-1"><strong>Section 2:</strong> Safe plant, systems of work, training for technicians</li>
              <li className="pl-1"><strong>Section 7:</strong> Your personal duty as an employee</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to statutory and regulatory compliance KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the structure and purpose of the HSWA 1974 as an enabling act",
              "Describe the duties imposed by Sections 2 to 8 on employers and employees",
              "Define and apply the SFARP principle to electrical maintenance scenarios",
              "Outline the requirements for a written safety policy under Section 2(3)",
              "Explain HSE enforcement powers including improvement and prohibition notices",
              "Identify penalties for breaches and the relevance of the Act to ST1426"
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

        {/* Section 01: Structure and Purpose */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Structure and Purpose of the HSWA 1974
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety at Work etc. Act 1974 (commonly abbreviated to HSWA or HASAWA) is the primary
              piece of legislation governing workplace health and safety in Great Britain. It was introduced following
              the Robens Report (1972), which identified that the existing patchwork of prescriptive industry-specific
              regulations was ineffective and recommended a single, overarching statutory framework.
            </p>
            <p>
              The Act is an <strong>enabling act</strong>, which means it does not attempt to prescribe specific
              safety measures for every conceivable workplace situation. Instead, it establishes broad, goal-setting
              duties and grants the Secretary of State powers (under Section 15) to make more detailed regulations
              through statutory instruments. This is how the Electricity at Work Regulations 1989, PUWER 1998,
              LOLER 1998, and many other sets of regulations came into existence — they were all made under the
              powers of the HSWA 1974.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structure of the Act</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Part I (Sections 1–54):</strong> Health, safety and welfare in connection with work — the core duties, enforcement powers, and administration</li>
                <li className="pl-1"><strong>Part II (Sections 55–60):</strong> The Employment Medical Advisory Service (EMAS)</li>
                <li className="pl-1"><strong>Part III (Sections 61–76):</strong> Building regulations (now largely replaced by the Building Act 1984)</li>
                <li className="pl-1"><strong>Part IV (Sections 77–85):</strong> Miscellaneous and general provisions</li>
                <li className="pl-1"><strong>Schedules 1–10:</strong> Supplementary provisions including the constitution of the HSE and transitional arrangements</li>
              </ul>
            </div>

            <p>
              For electrical maintenance technicians, Part I is the critical section. It contains the general duties
              (Sections 2–9), the role of the Health and Safety Commission and Executive (Section 10–14, now merged
              into a single body — the HSE), and the powers to make regulations (Section 15) and approve codes of
              practice (Section 16).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why the HSWA Matters for Electrical Maintenance</p>
              <p className="text-sm text-white mb-3">
                Every piece of electrical safety legislation, every approved code of practice, and every guidance
                note traces its authority back to the HSWA 1974. Understanding the Act is not academic — it is the
                foundation upon which your entire legal framework rests.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">The Electricity at Work Regulations 1989 — made under HSWA Section 15</li>
                <li className="pl-1">HSE Guidance Notes (GS38, HSG85) — published under HSWA Section 11</li>
                <li className="pl-1">Approved Codes of Practice — approved under HSWA Section 16</li>
                <li className="pl-1">HSE enforcement powers — granted under HSWA Sections 20–25</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Before the HSWA 1974</p>
              <p className="text-sm text-white">
                Prior to 1974, workplace safety was governed by a patchwork of industry-specific statutes (Factories
                Act 1961, Offices, Shops and Railway Premises Act 1963, Mines and Quarries Act 1954). Approximately
                8 million workers had no statutory safety protection at all. The Robens Report found that this
                fragmented approach was failing, with around 1,000 workers killed and 500,000 injured each year.
                The HSWA brought all workers under a single framework for the first time.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Sections 2-8 Duties */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            General Duties: Sections 2 to 8
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sections 2 to 8 form the core of the HSWA 1974. They impose duties on employers, employees,
              self-employed persons, designers, manufacturers, importers, suppliers, and anyone in control of
              premises. These are <strong>criminal law duties</strong> — breach is a criminal offence, not merely
              a civil liability.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 2 — Duties of Employers to Employees</h3>
                <p className="text-sm text-white mb-2">
                  Section 2(1) states: "It shall be the duty of every employer to ensure, so far as is reasonably
                  practicable, the health, safety and welfare at work of all his employees."
                </p>
                <p className="text-sm text-white mb-2">Section 2(2) specifies this includes:</p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>(a)</strong> Provision and maintenance of plant and systems of work that are, SFARP, safe and without risks to health</li>
                  <li className="pl-1"><strong>(b)</strong> Arrangements for ensuring, SFARP, safety and absence of risks in the use, handling, storage and transport of articles and substances</li>
                  <li className="pl-1"><strong>(c)</strong> Provision of such information, instruction, training and supervision as necessary to ensure, SFARP, the health and safety at work of employees</li>
                  <li className="pl-1"><strong>(d)</strong> Maintenance of any place of work under the employer's control in a safe condition, SFARP, and provision and maintenance of safe means of access and egress</li>
                  <li className="pl-1"><strong>(e)</strong> Provision and maintenance of a working environment that is, SFARP, safe, without risks to health, and adequate as regards facilities and arrangements for welfare</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-3">
                  <strong>For maintenance technicians:</strong> Section 2(2)(a) means your employer must provide safe
                  test instruments, properly maintained power tools, and safe isolation procedures. Section 2(2)(c)
                  means they must train you adequately in safe working practices.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 2(3) — Written Safety Policy</h3>
                <p className="text-sm text-white">
                  Every employer with five or more employees must prepare (and keep up to date) a written statement of
                  their general health and safety policy, together with the organisation and arrangements for carrying
                  it out. This policy must be brought to the attention of all employees. For electrical contractors,
                  this typically includes safe isolation procedures, permit to work arrangements, PPE requirements,
                  and emergency procedures.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 3 — Duties to Non-Employees</h3>
                <p className="text-sm text-white">
                  Employers and self-employed persons must conduct their undertaking so that persons not in their
                  employment are not exposed to risks to their health or safety. For electrical maintenance, this
                  means your work must not create risks for building occupants, other contractors, visitors, or
                  members of the public. Isolation of circuits must consider the impact on fire alarms, emergency
                  lighting, and life safety systems.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 4 — Duties of Persons in Control of Premises</h3>
                <p className="text-sm text-white">
                  Persons in control of non-domestic premises must ensure, SFARP, that the premises, means of access
                  and egress, and any plant or substance in the premises are safe and without risks to health. This
                  is particularly relevant to building owners and facilities managers who control the premises where
                  maintenance technicians work.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 6 — Duties of Designers, Manufacturers, Importers and Suppliers</h3>
                <p className="text-sm text-white">
                  Those who design, manufacture, import or supply articles for use at work must ensure they are safe
                  when properly used. This applies to manufacturers of electrical equipment, switchgear, test instruments
                  and protective devices. They must carry out testing, provide adequate information, and undertake
                  research to eliminate or minimise risks.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 7 — Duties of Employees</h3>
                <p className="text-sm text-white mb-2">
                  Every employee has a duty to:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>(a)</strong> Take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work</li>
                  <li className="pl-1"><strong>(b)</strong> Co-operate with their employer so far as is necessary to enable the employer to comply with any duty or requirement imposed on them</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-3">
                  <strong>For maintenance technicians:</strong> This means following safe isolation procedures, wearing
                  required PPE, reporting defective equipment, and not taking shortcuts. If you bypass a lock-off or
                  fail to prove dead, you are breaching Section 7.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 8 — Duty Not to Interfere</h3>
                <p className="text-sm text-white">
                  No person shall intentionally or recklessly interfere with or misuse anything provided in the
                  interests of health, safety or welfare. This is an <strong>absolute duty</strong> — there is no
                  SFARP qualification. Removing a safety guard, disabling an RCD, bypassing a lock-off, or removing
                  warning signs are all offences under Section 8.
                </p>
              </div>
            </div>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duty Holder</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Duty</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Qualified?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Employer</td>
                      <td className="border border-white/10 px-3 py-2">H&S of employees</td>
                      <td className="border border-white/10 px-3 py-2">SFARP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Employer / self-employed</td>
                      <td className="border border-white/10 px-3 py-2">H&S of non-employees</td>
                      <td className="border border-white/10 px-3 py-2">SFARP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Person in control of premises</td>
                      <td className="border border-white/10 px-3 py-2">Safe premises</td>
                      <td className="border border-white/10 px-3 py-2">SFARP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">Designer / manufacturer / supplier</td>
                      <td className="border border-white/10 px-3 py-2">Safe articles and substances</td>
                      <td className="border border-white/10 px-3 py-2">SFARP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7</td>
                      <td className="border border-white/10 px-3 py-2">Employee</td>
                      <td className="border border-white/10 px-3 py-2">Reasonable care; co-operation</td>
                      <td className="border border-white/10 px-3 py-2">Reasonable care</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">Any person</td>
                      <td className="border border-white/10 px-3 py-2">Do not interfere / misuse</td>
                      <td className="border border-white/10 px-3 py-2">Absolute</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: SFARP Principle */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The SFARP Principle and Safety Policies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The phrase "so far as is reasonably practicable" (SFARP) appears throughout the HSWA 1974 and is
              the legal standard against which most duties are measured. Understanding SFARP is essential for
              every maintenance technician because it determines what your employer must provide and what you
              must do.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Edwards v. National Coal Board Test (1949)</p>
              <p className="text-sm text-white mb-3">
                The leading case on SFARP is Edwards v. National Coal Board [1949]. The Court of Appeal held that
                "reasonably practicable" is narrower than "physically possible". It involves a balancing exercise:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>On one side:</strong> The degree of risk — the likelihood and severity of potential harm</li>
                <li className="pl-1"><strong>On the other:</strong> The sacrifice — the cost, time, trouble and physical difficulty of the measures needed to avert the risk</li>
              </ul>
              <p className="text-sm text-white mt-3">
                If the risk is significant, it can only be left unaddressed if the cost of remedial measures would be
                <strong> grossly disproportionate</strong> to the risk. Note: the test is not about proportionate cost —
                the cost must be <em>grossly</em> disproportionate, placing the burden firmly on the duty holder.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SFARP in Practice — Electrical Examples</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Providing GS38-compliant voltage indicators — cost is low, risk of electrocution without them is fatal: clearly reasonably practicable</li>
                  <li className="pl-1">Replacing an entire 30-year-old switchboard because one minor component has corroded — cost may be grossly disproportionate to the risk if the component can be repaired</li>
                  <li className="pl-1">Providing arc flash PPE for work on energised 400 V switchgear — cost is modest compared to the risk of severe arc flash burns: clearly reasonably practicable</li>
                  <li className="pl-1">Installing lock-off facilities on every miniature circuit breaker in a domestic consumer unit — cost may be disproportionate, but providing a lock-off kit for the main switch is reasonably practicable</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Burden of Proof</h3>
                <p className="text-sm text-white">
                  Under Section 40 of the HSWA 1974, the burden of proof lies with the accused to demonstrate that
                  it was not reasonably practicable to do more than was in fact done. This is a reverse burden — the
                  prosecution does not need to prove that more should have been done; the employer must prove it was
                  not reasonably practicable. This is particularly significant in prosecution cases following
                  electrical fatalities.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Policy Requirements — Section 2(3)</p>
              <p className="text-sm text-white mb-3">
                Employers with five or more employees must have a written health and safety policy containing three parts:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>General statement of intent:</strong> A declaration of the employer's commitment to health and safety, signed by the most senior person in the organisation</li>
                <li className="pl-1"><strong>Organisation:</strong> Who is responsible for what — the chain of command for health and safety, named individuals, reporting lines, and competent persons</li>
                <li className="pl-1"><strong>Arrangements:</strong> The practical systems in place — risk assessment procedures, safe isolation policies, PTW systems, PPE provision, training programmes, emergency procedures, monitoring and review</li>
              </ul>
              <p className="text-sm text-white mt-3">
                The policy must be kept up to date and brought to the attention of all employees. For electrical
                maintenance contractors, the arrangements section should include specific reference to safe isolation
                procedures, live working policies, test instrument management, and work at height procedures.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Representatives and Consultation</p>
              <p className="text-sm text-white mb-3">
                The HSWA 1974 provides for employee involvement in health and safety through two mechanisms:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safety Representatives and Safety Committees Regulations 1977:</strong> Where a trade union is recognised, it can appoint safety representatives who have the right to inspect the workplace, investigate potential hazards, represent employees in consultations with the employer, attend safety committee meetings, and receive paid time off for training</li>
                <li className="pl-1"><strong>Health and Safety (Consultation with Employees) Regulations 1996:</strong> Where there is no recognised trade union, employers must consult employees directly or through elected representatives of employee safety (ROES)</li>
              </ul>
              <p className="text-sm text-white mt-3">
                As a maintenance technician, you have the right to be consulted on health and safety matters
                affecting your work and to raise concerns without fear of detriment.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: HSE Enforcement Powers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            HSE Enforcement Powers and Penalties
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The HSWA 1974 established the Health and Safety Executive (HSE) as the primary enforcement body.
              HSE inspectors have extensive powers under Sections 20–25 of the Act, and understanding these powers
              is important for maintenance technicians who may encounter inspectors during site visits or following
              incidents.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspector Powers (Section 20)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Enter premises at any reasonable time (or at any time if there is a dangerous situation)</li>
                <li className="pl-1">Take a police officer if obstruction is anticipated</li>
                <li className="pl-1">Examine and investigate as necessary</li>
                <li className="pl-1">Direct that premises or anything in them be left undisturbed for investigation</li>
                <li className="pl-1">Take measurements, photographs and recordings</li>
                <li className="pl-1">Take samples of articles and substances</li>
                <li className="pl-1">Require any person to answer questions and sign a declaration of truth</li>
                <li className="pl-1">Require the production of books, documents and records</li>
                <li className="pl-1">Seize and render harmless any article or substance that is a cause of imminent danger</li>
              </ul>
            </div>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <h3 className="text-sm font-medium text-orange-400 mb-2">Improvement Notices (Section 21)</h3>
                <p className="text-sm text-white mb-2">
                  Issued when an inspector is of the opinion that a person is contravening a statutory provision or
                  has contravened it in circumstances that make it likely the contravention will continue or be repeated.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">States the contravention and the provision breached</li>
                  <li className="pl-1">Specifies the period within which the contravention must be remedied (not less than 21 days)</li>
                  <li className="pl-1">May direct the manner in which the contravention should be remedied</li>
                  <li className="pl-1">Work can continue during the compliance period unless separately prohibited</li>
                  <li className="pl-1">Right of appeal to an employment tribunal within 21 days (appeal suspends the notice)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="text-sm font-medium text-red-400 mb-2">Prohibition Notices (Section 22)</h3>
                <p className="text-sm text-white mb-2">
                  Issued when an inspector is of the opinion that an activity involves, or will involve, a risk of
                  serious personal injury.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Can take immediate effect or be deferred to a specified date</li>
                  <li className="pl-1">Directs that the activity shall not be carried on until the matter is remedied</li>
                  <li className="pl-1">Does not need to involve a contravention — the risk alone is sufficient</li>
                  <li className="pl-1">Right of appeal, but the appeal does NOT suspend a prohibition notice</li>
                  <li className="pl-1">Contravention of a prohibition notice is a criminal offence</li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Example:</strong> An HSE inspector visiting a commercial premises observes a maintenance
                  technician working in a live 400 V distribution board without arc flash PPE, barriers, or a
                  documented risk assessment. The inspector could issue an immediate prohibition notice stopping all
                  live work until adequate precautions are in place.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Penalties and Sentencing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Offence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Magistrates' Court</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Crown Court</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breach of Sections 2–6</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or up to 2 years' imprisonment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breach of Section 7 or 8</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or up to 2 years' imprisonment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breach of improvement notice</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or up to 2 years' imprisonment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breach of prohibition notice</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or up to 2 years' imprisonment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 37 (director/manager consent)</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or up to 2 years' imprisonment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-white mt-3">
                The Sentencing Council Health and Safety Offences Guidelines (2016) have led to dramatically higher
                fines. Large organisations convicted of offences causing death have received fines in the millions
                of pounds. The guidelines consider the culpability of the offender, the seriousness of harm risked,
                the likelihood of harm, and the organisation's turnover.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Section 37 allows individual directors and managers to be prosecuted
              personally if an offence was committed with their consent, connivance, or was attributable to their
              neglect. This means senior managers who fail to resource electrical safety properly can face personal
              criminal liability.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Application to Electrical Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Application to Electrical Maintenance and ST1426
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The HSWA 1974 is not merely theoretical legislation — it has direct, daily implications for your work
              as an electrical maintenance technician. Understanding how the Act applies in practice will help you
              recognise your rights, fulfil your duties, and work safely and lawfully.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Your Employer's Duties to You</p>
              <p className="text-sm text-white mb-3">Under Section 2, your employer must provide:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safe plant:</strong> GS38-compliant test instruments, properly maintained power tools, calibrated equipment, lock-off devices, and appropriate PPE</li>
                <li className="pl-1"><strong>Safe systems of work:</strong> Documented safe isolation procedures, permit to work systems, risk assessments, and method statements</li>
                <li className="pl-1"><strong>Information and training:</strong> Initial induction training, ongoing CPD, specific training for new equipment or procedures, access to BS 7671 and relevant guidance</li>
                <li className="pl-1"><strong>Supervision:</strong> Appropriate level of supervision based on your experience and the risk of the work — more supervision for apprentices, less for experienced technicians</li>
                <li className="pl-1"><strong>Safe workplace:</strong> Adequate lighting, ventilation, and access in switchrooms; safe means of access to equipment at height; welfare facilities on site</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Your Duties as an Employee</p>
              <p className="text-sm text-white mb-3">Under Sections 7 and 8, you must:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Follow safe isolation procedures every time — no shortcuts</li>
                <li className="pl-1">Use the PPE provided — arc flash protection, insulated gloves, safety boots</li>
                <li className="pl-1">Report defective equipment immediately — do not use a faulty voltage indicator</li>
                <li className="pl-1">Co-operate with safety training and assessments</li>
                <li className="pl-1">Not interfere with safety equipment — never bypass an RCD, remove a lock-off, or disable a safety guard</li>
                <li className="pl-1">Report hazards and near-misses through your employer's reporting system</li>
                <li className="pl-1">Refuse to carry out work that you reasonably believe puts you or others at serious risk</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ST1426 Mapping</h3>
                <p className="text-sm text-white">
                  The Maintenance and Operations Engineering Technician standard (ST1426) requires knowledge of
                  statutory and regulatory requirements for health and safety. The HSWA 1974 is the foundational
                  legislation. In your End Point Assessment, you may be asked about the general duties, SFARP,
                  enforcement mechanisms, and how the Act relates to more specific regulations such as the EAWR 1989.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Interaction with Other Legislation</h3>
                <p className="text-sm text-white">
                  The HSWA sits at the top of the regulatory hierarchy. Below it sit specific regulations (EAWR,
                  PUWER, LOLER, COSHH, CDM), approved codes of practice (which have a special legal status —
                  compliance is not compulsory, but failure to comply can be used as evidence of contravention),
                  and HSE guidance notes (advisory, not legally binding, but representing good practice).
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Practical Scenario</h3>
              <p className="text-sm text-white">
                You arrive on site to carry out planned maintenance on a distribution board. The client says there
                is no means of isolating the board and asks you to work live. Your employer's safety policy states
                that all work must be carried out dead unless a documented justification for live working exists.
                Under Section 7, you have a duty to take reasonable care — which means refusing to carry out work
                that is contrary to your employer's safe system of work. Under Section 2, your employer has a duty
                to provide safe systems of work — the safe isolation procedure. You should inform the client that
                you cannot work live without proper authorisation, inform your employer, and not proceed until a
                safe method of working is agreed.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> The Employment Rights Act 1996 (Section 44) protects employees from detriment
              for refusing to work in circumstances they reasonably believe to be dangerous. You cannot lawfully
              be disciplined or dismissed for refusing unsafe work — provided your belief is reasonable and you
              follow your employer's reporting procedures.
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
                <p className="font-medium text-white mb-1">Key Sections</p>
                <ul className="space-y-0.5">
                  <li>S.2 — Employer duties to employees (SFARP)</li>
                  <li>S.3 — Duties to non-employees (SFARP)</li>
                  <li>S.4 — Duties of persons controlling premises</li>
                  <li>S.6 — Duties of designers/manufacturers/suppliers</li>
                  <li>S.7 — Employee duties (reasonable care)</li>
                  <li>S.8 — Do not interfere or misuse (absolute)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Enforcement</p>
                <ul className="space-y-0.5">
                  <li>Improvement notice — remedy within specified period</li>
                  <li>Prohibition notice — cease activity immediately</li>
                  <li>Prosecution — unlimited fines, up to 2 years' prison</li>
                  <li>Section 37 — personal liability for directors/managers</li>
                  <li>Sentencing Council guidelines (2016) — significantly higher fines</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section4-2">
              Next: Electricity at Work Regulations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section4_1;