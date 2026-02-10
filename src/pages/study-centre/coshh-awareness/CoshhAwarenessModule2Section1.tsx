import {
  ArrowLeft,
  Scale,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Shield,
  Users,
  Gavel,
  FileText,
  HardHat,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "coshh-reg6-purpose",
    question:
      "What is the primary purpose of Regulation 6 of the COSHH Regulations 2002?",
    options: [
      "To require employers to carry out a suitable and sufficient assessment of risks from hazardous substances",
      "To establish workplace exposure limits for all chemicals",
      "To require employees to wear respiratory protective equipment at all times",
      "To ban the use of all carcinogenic substances in the workplace",
    ],
    correctIndex: 0,
    explanation:
      "Regulation 6 requires every employer to carry out a suitable and sufficient assessment of the risks to health arising from work involving substances hazardous to health. This assessment must be reviewed regularly and whenever there is reason to believe it may no longer be valid. It forms the foundation of the entire COSHH framework — without a proper assessment, you cannot determine the correct control measures.",
  },
  {
    id: "acop-legal-status",
    question:
      "What is the legal status of an Approved Code of Practice (ACoP) such as L5?",
    options: [
      "It is advisory guidance with no legal standing",
      "Following it is not compulsory, but if prosecuted you must show you complied in an equally effective way",
      "It has the same legal force as the regulations themselves",
      "It only applies to self-employed persons",
    ],
    correctIndex: 1,
    explanation:
      "An Approved Code of Practice (ACoP) has a special legal status. Following its guidance is not compulsory, but if you are prosecuted for a breach of the regulations and it is proved that you did not follow the relevant ACoP, you will need to show the court that you complied with the law in some other equally effective way — or risk being found at fault. This gives ACoPs a quasi-legal standing between regulations (which are mandatory) and pure guidance (which is advisory).",
  },
  {
    id: "employee-duties",
    question:
      "Under the COSHH Regulations, which of the following is an employee duty?",
    options: [
      "Carrying out risk assessments for hazardous substances",
      "Providing health surveillance to fellow workers",
      "Making proper use of control measures provided by the employer and reporting defects",
      "Setting workplace exposure limits for substances used on site",
    ],
    correctIndex: 2,
    explanation:
      "Regulation 8(2) requires every employee to make full and proper use of any control measure, PPE, or facility provided by the employer under the COSHH Regulations. Employees must also report any defects in control measures to the employer without delay. Risk assessments, health surveillance, and setting exposure limits are employer duties — but employees must cooperate fully and use the controls provided.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Do the COSHH Regulations apply to asbestos and lead?",
    answer:
      "Not directly. Asbestos and lead have their own dedicated regulations — the Control of Asbestos Regulations 2012 and the Control of Lead at Work Regulations 2002. However, the COSHH Regulations do apply to any substance hazardous to health that is not specifically covered by its own legislation. In practice, the COSHH assessment process and hierarchy of control still provide useful frameworks that complement asbestos and lead-specific duties. Where a substance is covered by both COSHH and another set of regulations, the more specific regulation takes precedence.",
  },
  {
    question:
      "What is the difference between an ACoP and HSE guidance?",
    answer:
      "An Approved Code of Practice (ACoP) has special legal status under the Health and Safety at Work etc. Act 1974. If you follow the advice in an ACoP, you will be doing enough to comply with the law on that specific point. If you do not follow it, you must be able to show a court that you complied in some other equally effective way. HSE guidance, on the other hand, is purely advisory. It describes good practice and explains the law, but it does not have the same legal weight as an ACoP. Both are published by the HSE, but only ACoPs carry the quasi-legal presumption of compliance.",
  },
  {
    question:
      "How often must a COSHH risk assessment be reviewed?",
    answer:
      "There is no fixed statutory review period — the regulations require that an assessment is reviewed 'regularly' and whenever there is reason to believe it is no longer valid or where there has been a significant change in the work to which the assessment relates. In practice, the HSE expects assessments to be reviewed at least annually, or sooner if there is a change in the substances used, the process, the control measures, the findings of monitoring or health surveillance, or if an incident or near miss occurs. Many organisations set a 12-month review cycle as a minimum.",
  },
  {
    question:
      "Are self-employed persons covered by the COSHH Regulations?",
    answer:
      "Yes. The COSHH Regulations apply to self-employed persons in broadly the same way as they apply to employers. A self-employed person must carry out a suitable and sufficient assessment of the risks to their own health (and to the health of others who may be affected by their work) from hazardous substances. They must also implement appropriate control measures, maintain those controls, and ensure they have sufficient information about the substances they use. The only practical difference is that a self-employed person with no employees does not have to provide health surveillance or training to others — but they must still protect themselves and anyone nearby.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "The COSHH Regulations 2002 were made under which parent Act?",
    options: [
      "The Environmental Protection Act 1990",
      "The Health and Safety at Work etc. Act 1974",
      "The Factories Act 1961",
      "The Management of Health and Safety at Work Act 1999",
    ],
    correctAnswer: 1,
    explanation:
      "The COSHH Regulations 2002 (SI 2002/2677) are made under the Health and Safety at Work etc. Act 1974 (HASAWA). This is the parent or 'enabling' Act that gives the Secretary of State the power to make health and safety regulations. HASAWA provides the overarching framework of general duties, and COSHH sits beneath it as a set of specific regulations dealing with hazardous substances.",
  },
  {
    id: 2,
    question:
      "How many regulations and schedules make up the COSHH Regulations 2002?",
    options: [
      "18 regulations and 4 schedules",
      "24 regulations and 6 schedules",
      "30 regulations and 8 schedules",
      "12 regulations and 3 schedules",
    ],
    correctAnswer: 1,
    explanation:
      "The COSHH Regulations 2002 consist of 24 regulations and 6 schedules. The regulations set out the substantive legal duties (assessment, control, monitoring, surveillance, training, etc.), while the schedules provide supplementary detail — including the list of occupational exposure limits, the definition of carcinogens and mutagens, and the requirements for health surveillance procedures.",
  },
  {
    id: 3,
    question:
      "Which COSHH regulation specifically requires employers to prevent or, where that is not reasonably practicable, adequately control exposure to hazardous substances?",
    options: [
      "Regulation 6",
      "Regulation 7",
      "Regulation 9",
      "Regulation 12",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 7 deals with the prevention and control of exposure. It requires employers to prevent exposure to substances hazardous to health, or where prevention is not reasonably practicable, to adequately control exposure. The regulation establishes the hierarchy of control measures, with prevention at the top and PPE as a last resort.",
  },
  {
    id: 4,
    question:
      "What does the defence of 'so far as is reasonably practicable' (SFAIRP) require a duty holder to demonstrate?",
    options: [
      "That they followed every piece of HSE guidance to the letter",
      "That the cost and effort of further risk reduction would be grossly disproportionate to the benefit gained",
      "That they had unlimited budget for health and safety measures",
      "That no employees were ever exposed to any hazardous substance",
    ],
    correctAnswer: 1,
    explanation:
      "The SFAIRP defence requires the duty holder to show that the cost, time, and trouble of taking further measures to reduce risk would be grossly disproportionate to the risk itself. The burden of proof rests on the duty holder — they must demonstrate that they weighed the risk against the sacrifice (in money, time, or trouble) needed to avert it, and that the sacrifice would have been unreasonable given the level of risk. This does not mean 'as cheap as possible' — it means a genuine balancing exercise.",
  },
  {
    id: 5,
    question:
      "Regulation 11 of the COSHH Regulations deals with which duty?",
    options: [
      "Risk assessment",
      "Health surveillance",
      "Maintenance of control measures",
      "Information, instruction, and training",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 11 requires employers to provide appropriate health surveillance for employees who are exposed to substances hazardous to health where there is an identifiable disease or adverse health effect related to the exposure, where there is a reasonable likelihood that the disease or effect may occur, and where valid techniques exist to detect it. Health surveillance helps to detect early signs of ill health caused by workplace exposure.",
  },
  {
    id: 6,
    question:
      "Which Approved Code of Practice provides practical guidance on complying with the COSHH Regulations 2002?",
    options: [
      "L8 — Legionnaires' disease",
      "L143 — Managing and working with asbestos",
      "L5 — Control of substances hazardous to health",
      "L21 — Management of health and safety at work",
    ],
    correctAnswer: 2,
    explanation:
      "L5 is the HSE's Approved Code of Practice for the COSHH Regulations 2002. Its full title is 'Workplace exposure limits: Containing the list of workplace exposure limits for use with the Control of Substances Hazardous to Health Regulations 2002 (as amended)'. In practice, L5 is used alongside EH40 (the table of workplace exposure limits). Together they provide the practical framework for compliance with COSHH.",
  },
  {
    id: 7,
    question:
      "Schedule 1 of the COSHH Regulations imposes additional requirements for which category of substances?",
    options: [
      "Corrosive substances",
      "Flammable liquids",
      "Carcinogens and mutagens",
      "Biological agents",
    ],
    correctAnswer: 2,
    explanation:
      "Schedule 1 of the COSHH Regulations sets out additional requirements that apply specifically to work involving carcinogens and mutagens. These include stricter duties on substitution (replacing the carcinogen with a less hazardous alternative), total enclosure of processes where reasonably practicable, keeping the number of exposed workers to a minimum, and maintaining exposure records for at least 40 years.",
  },
  {
    id: 8,
    question:
      "Under COSHH Regulation 9, how often must local exhaust ventilation (LEV) systems be thoroughly examined and tested?",
    options: [
      "Every 6 months",
      "At least every 14 months",
      "Every 2 years",
      "Only when a defect is reported",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 9 requires that local exhaust ventilation (LEV) used as a control measure under COSHH must be thoroughly examined and tested at least every 14 months. For certain processes involving specific hazardous substances, more frequent testing may be required. Records of examinations and tests must be kept for at least 5 years and made available on request.",
  },
];

/* ────────────────── Regulation structure data (diagram 1) ──────────────── */

const keyRegulations = [
  {
    reg: "Reg 6",
    title: "Assessment of risk",
    description: "Suitable and sufficient assessment before work with hazardous substances begins",
    colour: "violet",
  },
  {
    reg: "Reg 7",
    title: "Prevention or control of exposure",
    description: "Prevent exposure or, where not reasonably practicable, adequately control it",
    colour: "violet",
  },
  {
    reg: "Reg 8",
    title: "Use of control measures",
    description: "Employers ensure proper use; employees cooperate and report defects",
    colour: "violet",
  },
  {
    reg: "Reg 9",
    title: "Maintenance, examination, and testing",
    description: "Control measures maintained in efficient working order; LEV tested every 14 months",
    colour: "violet",
  },
  {
    reg: "Reg 10",
    title: "Monitoring exposure",
    description: "Monitor exposure at the workplace where necessary to protect health",
    colour: "violet",
  },
  {
    reg: "Reg 11",
    title: "Health surveillance",
    description: "Appropriate health surveillance where identifiable disease/effect is linked to exposure",
    colour: "violet",
  },
  {
    reg: "Reg 12",
    title: "Information, instruction, and training",
    description: "Workers must know what they are exposed to, the risks, and the control measures",
    colour: "violet",
  },
];

/* ──────────────────── Related legislation data (diagram 2) ─────────────── */

const relatedLegislation = [
  {
    name: "HASAWA 1974",
    sections: "s.2, s.3, s.7",
    relationship: "Parent Act — general duties of employers, duties to others, employee duties",
  },
  {
    name: "Management Regs 1999",
    sections: "SI 1999/3242",
    relationship: "General risk assessment framework — COSHH builds on this for chemical hazards",
  },
  {
    name: "CLP Regulation",
    sections: "EC 1272/2008 (retained)",
    relationship: "Classification, labelling, and packaging of substances — provides hazard classifications used in COSHH assessments",
  },
  {
    name: "DSEAR 2002",
    sections: "SI 2002/2776",
    relationship: "Dangerous Substances and Explosive Atmospheres — overlaps where hazardous substances are also flammable/explosive",
  },
  {
    name: "REACH",
    sections: "EC 1907/2006 (retained)",
    relationship: "Registration, Evaluation, Authorisation, and Restriction of Chemicals — upstream duties on manufacturers/importers feed into COSHH assessments",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function CoshhAwarenessModule2Section1() {
  useSEO({
    title:
      "The COSHH Regulations 2002 | COSHH Awareness Module 2 Section 1",
    description:
      "Understand the COSHH Regulations 2002, the legal framework of 24 regulations and 6 schedules, employer and employee duties, Approved Codes of Practice, enforcement powers, and the defence of SFAIRP.",
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
            <Link to="../coshh-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <Scale className="h-10 w-10 text-violet-500 mx-auto mb-4" />
          <span className="inline-block bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The COSHH Regulations 2002
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            The complete legal framework for controlling exposure to substances hazardous to health in the workplace &mdash; duties, structure, enforcement, and practical application for electricians
          </p>
        </div>

        {/* ─── 01 Overview & Summary Boxes ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            Overview of the COSHH Regulations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
              <p className="font-semibold text-base text-violet-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>COSHH 2002 (SI 2002/2677)</strong> is the primary UK legislation controlling workplace exposure to hazardous substances.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Amended in <strong>2004</strong> to align with European chemical agents directives.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Comprises <strong>24 regulations</strong> and <strong>6 schedules</strong> covering assessment, control, monitoring, surveillance, and training.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Made under the <strong>Health and Safety at Work etc. Act 1974</strong> (HASAWA).
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
              <p className="font-semibold text-base text-violet-400 mb-2">Scope &amp; Application</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Applies to <strong>all workplaces</strong> in Great Britain where hazardous substances are used or produced.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Covers <strong>chemicals, dusts, fumes, vapours, gases, biological agents, and substances produced by work processes</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Does <strong>not</strong> apply to asbestos or lead (which have their own regulations), but does cover all other hazardous substances.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Approved Code of Practice: <strong>L5</strong> (COSHH ACoP), used alongside <strong>EH40</strong> (workplace exposure limits).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 02 Learning Outcomes ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-violet-400/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
              <span>
                Explain the purpose, scope, and legal basis of the COSHH Regulations 2002
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
              <span>
                Describe the structure of the regulations (24 regulations and 6 schedules) and identify the key regulations (6, 7, 8, 9, 10, 11, 12)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
              <span>
                Outline the duties placed on employers, employees, and self-employed persons
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
              <span>
                Explain the legal status of Approved Codes of Practice (ACoPs) and the role of L5
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
              <span>
                Describe the enforcement powers available to the HSE, including improvement notices, prohibition notices, and prosecution
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
              <span>
                Explain the defence of &ldquo;so far as is reasonably practicable&rdquo; (SFAIRP) and its practical meaning
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
              <span>
                Identify how the COSHH Regulations relate to HASAWA 1974, the Management Regulations 1999, CLP, DSEAR, and REACH
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
              <span>
                Apply the COSHH framework to common electrical and construction work scenarios
              </span>
            </li>
          </ul>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Structure of the Regulations ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">03</span>
              Structure of the Regulations
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The COSHH Regulations 2002 are structured as a single Statutory Instrument (SI 2002/2677) containing <strong>24 regulations</strong> and <strong>6 schedules</strong>. The regulations set out the substantive legal duties, while the schedules provide supplementary detail including lists of workplace exposure limits, definitions, and procedural requirements.
              </p>

              {/* Diagram 1: Key Regulations */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-violet-400" />
                  <h3 className="text-violet-400 font-medium">Key Regulations at a Glance</h3>
                </div>
                <div className="space-y-3">
                  {keyRegulations.map((item) => (
                    <div key={item.reg} className="flex items-start gap-3">
                      <div className="flex-shrink-0 bg-violet-500/20 border border-violet-500/40 rounded-lg px-2.5 py-1 min-w-[60px] text-center">
                        <span className="text-violet-400 font-bold text-xs">{item.reg}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-white">{item.title}</p>
                        <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">The 6 Schedules</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Schedule 1:</strong> Additional provisions relating to work with carcinogens and mutagens &mdash; stricter duties on substitution, enclosure, and record-keeping.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Schedule 2:</strong> Additional provisions relating to biological agents &mdash; classification into hazard groups, containment levels, and special measures.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Schedule 3:</strong> Special provisions relating to fumigations &mdash; notification requirements and safety precautions.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Schedule 4:</strong> Frequency of thorough examination and testing &mdash; e.g. LEV systems at least every 14 months.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Schedule 5:</strong> Specific substances and processes requiring health surveillance &mdash; including isocyanates, vinyl chloride monomer, and certain chromium compounds.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Schedule 6:</strong> Medical surveillance requirements &mdash; details of the medical examination process and record-keeping obligations.
                    </div>
                  </div>
                </div>
              </div>

              <p className="leading-relaxed">
                Together, the regulations and schedules form a comprehensive framework that takes a substance from identification through assessment, control, monitoring, and surveillance. Each regulation builds logically on the previous one &mdash; you cannot control what you have not assessed (Reg 6 before Reg 7), and you cannot monitor effectively without proper controls in place (Reg 7 before Reg 10).
              </p>
            </div>
          </div>
        </section>

        {/* ─── 04 Employer Duties ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">04</span>
              Employer Duties Under COSHH
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The COSHH Regulations place the primary duty of compliance on the <strong>employer</strong>. This reflects the fundamental principle of UK health and safety law: those who create or control the risk must manage it. The employer&rsquo;s duties under COSHH are extensive and form a logical chain from assessment through to training.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-violet-400 flex-shrink-0" />
                  <h3 className="text-violet-400 font-medium">Core Employer Duties</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Assess risks (Reg 6):</strong> Carry out a suitable and sufficient assessment of the risks to health from hazardous substances before any work begins. The assessment must identify what substances are present or produced, who may be exposed and how, the nature and degree of exposure, and the control measures required.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Prevent or control exposure (Reg 7):</strong> The employer must prevent exposure to substances hazardous to health. Where prevention is not reasonably practicable, exposure must be adequately controlled. Regulation 7 establishes the hierarchy of control: elimination, substitution, engineering controls, administrative controls, and PPE as a last resort.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Ensure proper use of controls (Reg 8):</strong> Employers must take all reasonable steps to ensure that control measures, PPE, and other facilities are properly used or applied. They must also ensure employees are aware of the importance of using controls correctly.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Maintain, examine, and test controls (Reg 9):</strong> All control measures must be maintained in efficient working order and good repair. Engineering controls such as LEV must be thoroughly examined and tested at intervals not exceeding 14 months (or more frequently for certain processes). Records of examinations must be kept for at least 5 years.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Monitor exposure (Reg 10):</strong> Where it is necessary to ensure the maintenance of adequate control or to protect health, the employer must carry out workplace exposure monitoring. Records of monitoring must be kept for at least 5 years (or 40 years for personal exposure records where required).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Provide health surveillance (Reg 11):</strong> Where employees are exposed to substances listed in Schedule 5 (or where there is an identifiable disease linked to the exposure and valid detection techniques exist), the employer must provide appropriate health surveillance.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Provide information, instruction, and training (Reg 12):</strong> Workers must be given suitable and sufficient information about the substances they may be exposed to, the risks, the control measures, the results of monitoring and surveillance, and emergency procedures. Training must be provided before work begins and must be updated regularly.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">The Chain of Compliance</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  The employer duties under COSHH form a logical chain. You must <strong className="text-white">assess</strong> before you can <strong className="text-white">control</strong>, <strong className="text-white">maintain</strong> before you can rely on controls, <strong className="text-white">monitor</strong> to verify effectiveness, carry out <strong className="text-white">surveillance</strong> to detect early harm, and <strong className="text-white">train</strong> so workers understand and cooperate. Breaking any link in this chain undermines the entire framework. An assessment that gathers dust in a filing cabinet is worthless; a control measure that is not maintained will eventually fail; training that is never refreshed becomes out of date.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 05 Employee & Self-Employed Duties ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">05</span>
              Employee &amp; Self-Employed Duties
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                While the primary duties fall on the employer, the COSHH Regulations also impose important duties on employees and self-employed persons. Health and safety is a shared responsibility &mdash; the best control measures in the world are useless if workers do not use them.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-violet-400 flex-shrink-0" />
                    <h3 className="text-violet-400 font-semibold">Employee Duties</h3>
                  </div>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Use controls properly:</strong> Make full and proper use of any control measure, PPE, or other facility provided by the employer (Reg 8(2))
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Report defects:</strong> Inform the employer immediately of any defect in control measures or PPE that they become aware of
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Cooperate:</strong> Cooperate with the employer to enable compliance with COSHH duties
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Return items:</strong> Return PPE and other equipment to the proper storage location after use
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Attend training:</strong> Take part in training and health surveillance as required by the employer
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <HardHat className="h-5 w-5 text-violet-400 flex-shrink-0" />
                    <h3 className="text-violet-400 font-semibold">Self-Employed Duties</h3>
                  </div>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Same as employer duties:</strong> A self-employed person must comply with COSHH in the same way as an employer, with respect to their own health and the health of others
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Assess risks:</strong> Carry out a suitable and sufficient risk assessment for their own work activities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Implement controls:</strong> Use appropriate control measures, maintain them, and ensure their work does not put others at risk
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Know the substances:</strong> Obtain and understand safety data sheets for all hazardous substances used
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Sole trader note:</strong> Many electricians are self-employed &mdash; COSHH duties apply in full to sole traders
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">HASAWA Reinforcement</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Employee duties under COSHH are reinforced by <strong className="text-white">Section 7 of HASAWA 1974</strong>, which requires every employee to take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions. An employee who deliberately removes a guard from an LEV system, or who refuses to wear provided RPE, could face personal prosecution under HASAWA s.7, as well as being in breach of COSHH Regulation 8(2).
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 06 Approved Codes of Practice & Related Legislation ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">06</span>
              ACoPs &amp; Related Legislation
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The COSHH Regulations do not exist in isolation. They are supported by Approved Codes of Practice (ACoPs) that carry special legal status, and they interact with a web of related health and safety legislation. Understanding these relationships is important for compliance.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-violet-400 flex-shrink-0" />
                  <h3 className="text-violet-400 font-medium">Approved Code of Practice: L5</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="leading-relaxed">
                    <strong>L5</strong> is the HSE&rsquo;s Approved Code of Practice for the COSHH Regulations 2002. It provides practical guidance on how to comply with each regulation and has a <strong>special legal status</strong> under Section 17 of HASAWA 1974:
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
                    <p className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>If you <strong>follow</strong> the ACoP, you will be doing enough to comply with the law on that specific point.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>If you do <strong>not</strong> follow it, you must show a court that you complied in some other equally effective way.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>The ACoP is <strong>not</strong> law itself, but it creates a rebuttable presumption of compliance or non-compliance.</span>
                    </p>
                  </div>
                  <p className="leading-relaxed">
                    <strong>EH40</strong> (Workplace exposure limits) is the companion document that lists all current UK workplace exposure limits (WELs). It is updated periodically as new scientific evidence becomes available. Together, L5 and EH40 form the practical backbone of COSHH compliance.
                  </p>
                </div>
              </div>

              {/* Diagram 2: Related Legislation */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="h-5 w-5 text-violet-400" />
                  <h3 className="text-violet-400 font-medium">Relationship to Other Legislation</h3>
                </div>
                <div className="space-y-3">
                  {relatedLegislation.map((item) => (
                    <div
                      key={item.name}
                      className="bg-violet-500/5 border border-violet-500/20 rounded-lg p-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <span className="font-bold text-violet-400 text-sm">{item.name}</span>
                        <span className="text-white/40 text-xs">{item.sections}</span>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{item.relationship}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">HASAWA 1974 &mdash; The Parent Act</h3>
                <div className="space-y-3 text-sm">
                  <p className="leading-relaxed">
                    The Health and Safety at Work etc. Act 1974 is the &ldquo;parent&rdquo; or enabling Act under which COSHH and many other regulations are made. Three sections are particularly relevant:
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Section 2:</strong> General duty of employers to their employees &mdash; to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees. This includes the provision and maintenance of safe systems of work, safe use and handling of substances, and adequate information, instruction, training, and supervision.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Section 3:</strong> General duty to persons other than employees &mdash; employers and self-employed persons must conduct their undertaking so that others (e.g. members of the public, contractors, visitors) are not exposed to risks to their health or safety.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Section 7:</strong> General duty of employees &mdash; to take reasonable care for the health and safety of themselves and of others who may be affected by their acts or omissions at work, and to cooperate with the employer.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 Enforcement & SFAIRP ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">07</span>
              Enforcement &amp; the SFAIRP Defence
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The Health and Safety Executive (HSE) is the primary enforcing authority for the COSHH Regulations. Local authorities also have enforcement powers in certain premises such as shops, offices, and leisure facilities. The enforcement powers available are significant and should not be underestimated.
              </p>

              <div className="space-y-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <h3 className="text-amber-400 font-semibold">Improvement Notice</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    An HSE inspector can serve an improvement notice where they believe a provision of health and safety law is being contravened, or has been contravened in circumstances that make it likely to be repeated. The notice <strong className="text-white">requires the duty holder to take specific corrective action within a stated timeframe</strong> (typically 21 days minimum). Failure to comply with an improvement notice is itself a criminal offence punishable by up to 2 years&rsquo; imprisonment.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <h3 className="text-red-400 font-semibold">Prohibition Notice</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    A prohibition notice <strong className="text-white">stops work immediately</strong> where the inspector believes there is, or is likely to be, a risk of serious personal injury. The notice takes effect immediately (or at the end of a specified period) and work cannot resume until the matters giving rise to the risk have been remedied. Prohibition notices can be served without prior warning and are commonly used where hazardous substances are being used without adequate controls.
                  </p>
                </div>

                <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-lg">
                  <h3 className="text-red-300 font-semibold mb-2">Prosecution &amp; Penalties</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    For serious breaches of the COSHH Regulations (or HASAWA 1974), the HSE can prosecute in the criminal courts. The penalties are substantial:
                  </p>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Organisations:</strong> Unlimited fines &mdash; in recent years, fines for health and safety offences have increased dramatically, with some running into millions of pounds for large organisations.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Individuals:</strong> Up to 2 years&rsquo; imprisonment and/or unlimited fines. Directors, managers, and other senior officers can be personally prosecuted if a breach is attributable to their consent, connivance, or neglect.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Corporate manslaughter:</strong> Where a gross breach of a duty of care by an organisation causes death, prosecution may also be brought under the Corporate Manslaughter and Corporate Homicide Act 2007.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">Other Enforcement Powers</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Right of entry:</strong> HSE inspectors may enter any workplace at any reasonable time (or at any time if they believe a dangerous situation exists) without giving advance notice.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Examination and investigation:</strong> Inspectors may carry out examinations, take measurements, photographs, and samples, and require documents to be produced for inspection.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Interview under caution:</strong> Inspectors may require any person to answer questions and sign a declaration of truth of their answers.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Seizure and detention:</strong> Inspectors may seize and render harmless any article or substance that they believe is a cause of imminent danger of serious personal injury.
                    </div>
                  </li>
                </ul>
              </div>

              {/* SFAIRP */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-violet-400 flex-shrink-0" />
                  <h3 className="text-violet-400 font-medium">
                    &ldquo;So Far As Is Reasonably Practicable&rdquo; (SFAIRP)
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="leading-relaxed">
                    Many duties under the COSHH Regulations (and HASAWA) are qualified by the phrase &ldquo;so far as is reasonably practicable&rdquo;. This is a legal concept that means the duty holder must weigh the risk against the sacrifice (in money, time, or trouble) needed to avert or reduce it. The key principles are:
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Burden of proof on the duty holder:</strong> If prosecuted, it is for the accused to prove that it was not reasonably practicable to do more than they did &mdash; the prosecution does not have to prove it was practicable.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Gross disproportion test:</strong> The duty holder must show that the cost of further measures would have been <em>grossly disproportionate</em> to the benefit gained. A slight disproportion is not enough &mdash; the imbalance must be clear and obvious.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Not &ldquo;as cheap as possible&rdquo;:</strong> SFAIRP does not mean cutting corners. It means that where the risk is high, more must be spent on controls &mdash; even if the cost is substantial. Cost is only a valid excuse when the risk is already low and the cost of further reduction would be grossly disproportionate.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Industry standards matter:</strong> What is reasonably practicable is judged against current knowledge and good practice. If an effective control measure is widely known and used in your industry, you will find it very difficult to argue that it was not reasonably practicable for you to adopt it.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 08 Practical Application for Electricians ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">08</span>
              Practical Application for Electricians
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The COSHH Regulations may seem like an abstract legal framework, but they have very real implications for electricians and construction workers. Every day, electricians encounter substances that fall within the scope of COSHH &mdash; from solvents and adhesives to dust and fumes generated by their work.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-violet-400 flex-shrink-0" />
                  <h3 className="text-violet-400 font-semibold">Common COSHH Substances in Electrical Work</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Solvent-based cleaners:</strong> Contact cleaner, degreaser sprays, PCB cleaning agents</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Cable jointing compounds:</strong> Resin-based compounds, silicone sealants, PU foam</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Flux and solder fumes:</strong> Rosin-based flux core solder produces irritant fumes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Construction dusts:</strong> Silica dust from drilling brick/concrete, wood dust from notching joists</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Adhesives:</strong> PVC solvent cement, cable tray adhesives, tile adhesive containing isocyanates</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Insulating foams:</strong> Expanding foam sealants (isocyanate-based) for fire stopping</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Battery acid:</strong> Sulphuric acid from lead-acid batteries in UPS systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>SF6 gas:</strong> Sulphur hexafluoride in HV switchgear &mdash; decomposition products are toxic</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">What COSHH Means on Site</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Before you start:</strong> Check the COSHH assessment for the substances you will use. On larger sites, this should be included in the construction phase plan or issued at site induction. If you are self-employed, you must carry out your own assessment.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Read the SDS:</strong> Every hazardous substance should have a Safety Data Sheet (SDS). Read Section 2 (hazards identification), Section 7 (handling and storage), and Section 8 (exposure controls/personal protection) before use.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Use the controls:</strong> Wear the specified PPE, use LEV where provided, work in well-ventilated areas, and follow the safe system of work set out in the assessment.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Report problems:</strong> If a control measure is not working (e.g. LEV is not extracting properly, or your RPE does not seal), report it immediately. Do not carry on regardless.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Store properly:</strong> Return substances to their designated storage after use. Do not leave open containers in work areas. Dispose of waste and contaminated materials as instructed.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Zap className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">Schedule 1: Carcinogens &amp; Mutagens</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  Schedule 1 imposes <strong className="text-white">additional requirements</strong> where work involves carcinogens or mutagens. For electricians, the most relevant examples include:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Respirable crystalline silica (RCS):</strong> Classified as a carcinogen. Generated when drilling into concrete, brick, or stone. Common in electrical installation &mdash; every core drill, SDS drill, or chase cut in masonry produces silica dust.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Hardwood dust:</strong> Classified as a carcinogen. Generated when notching or drilling timber joists in older buildings. The WEL for hardwood dust is 3 mg/m&sup3; (8-hr TWA).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Additional duties:</strong> Where carcinogens or mutagens are involved, the employer must consider substitution first, use total enclosure of the process where reasonably practicable, keep the number of exposed workers to a minimum, prohibit eating, drinking, and smoking in contaminated areas, and keep exposure records for at least 40 years.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">Real-World Scenario</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  You are chasing a cable route into a concrete wall using an SDS drill and chisel. This generates respirable crystalline silica dust &mdash; a COSHH substance and a Schedule 1 carcinogen. Your employer&rsquo;s COSHH assessment should specify: use of a dust-suppressed drill or on-tool extraction, RPE rated for fine particulates (minimum FFP3), damping down with water where practicable, restricting access to the immediate work area, and ensuring you are trained on the risks and controls. If you are self-employed, you must carry out this assessment yourself. Failure to control silica dust exposure is one of the most common COSHH enforcement actions in the construction sector.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">09</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>COSHH Regulations 2002</strong> (SI 2002/2677, amended 2004) are the primary UK legislation controlling workplace exposure to hazardous substances, made under HASAWA 1974.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The regulations comprise <strong>24 regulations and 6 schedules</strong> forming a logical chain: assess (Reg 6) &rarr; prevent/control (Reg 7) &rarr; use controls (Reg 8) &rarr; maintain (Reg 9) &rarr; monitor (Reg 10) &rarr; surveil (Reg 11) &rarr; train (Reg 12).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Employers</strong> bear the primary duty: assess risks, prevent/control exposure, maintain controls, monitor, provide health surveillance, and train workers.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Employees</strong> must use controls properly, report defects, and cooperate. <strong>Self-employed persons</strong> must comply with COSHH in the same way as employers.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>L5</strong> (the ACoP) has special legal status &mdash; following it creates a presumption of compliance; departing from it requires proof of an equally effective alternative.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Enforcement</strong> is by the HSE: improvement notices, prohibition notices, prosecution, unlimited fines for organisations, and up to 2 years&rsquo; imprisonment for individuals.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>SFAIRP</strong> defence requires the duty holder to show that further risk reduction would be grossly disproportionate to the benefit &mdash; the burden of proof rests on the accused.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Schedule 1</strong> imposes additional requirements for carcinogens and mutagens (including silica dust and hardwood dust) &mdash; substances electricians routinely encounter.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-violet-400/80 text-sm font-normal">10</span>
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
            title="The COSHH Regulations 2002 Quiz"
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
            <Link to="../coshh-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-2-section-2">
              Next: COSHH Risk Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
