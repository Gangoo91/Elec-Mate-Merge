import {
  ArrowLeft,
  Scale,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Users,
  Gavel,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "csr97-reg3-hierarchy",
    question:
      "Under Regulation 3 of the Confined Spaces Regulations 1997, what is the FIRST step in the hierarchy of control?",
    options: [
      "Ensure a safe system of work is in place before entry",
      "Avoid entry to the confined space altogether",
      "Provide emergency rescue equipment at the entrance",
      "Carry out atmospheric testing before entry",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 3 establishes that entry to a confined space must be avoided if it is reasonably practicable to carry out the work without entering. This is the top of the hierarchy \u2014 avoidance first, then safe system of work only when entry is unavoidable. Many tasks (such as remote inspection, mechanical cleaning, or external modifications) can be completed without entry.",
  },
  {
    id: "csr97-safe-system",
    question:
      "Which regulation of the CSR 1997 requires a safe system of work when entry to a confined space cannot be avoided?",
    options: [
      "Regulation 2 \u2014 Interpretation",
      "Regulation 3 \u2014 Avoidance of entry",
      "Regulation 4 \u2014 Safe system of work",
      "Regulation 5 \u2014 Emergency arrangements",
    ],
    correctIndex: 2,
    explanation:
      "Regulation 4 of the CSR 1997 requires that where entry to a confined space is unavoidable, a safe system of work must be established. This includes appointing competent persons, selecting suitable equipment, testing the atmosphere, providing adequate ventilation, establishing emergency arrangements, and ensuring all persons involved are properly trained.",
  },
  {
    id: "csr97-emergency-rehearsal",
    question:
      "Under Regulation 5 of the CSR 1997, emergency arrangements must include which of the following?",
    options: [
      "Annual written reports submitted to the HSE",
      "Suitable rescue and resuscitation equipment, and rehearsed procedures",
      "A full-time safety officer stationed at every confined space",
      "Insurance documentation covering confined space fatalities",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 5 requires that adequate emergency arrangements are in place before any person enters a confined space. This must include suitable rescue and resuscitation equipment, a sufficient number of trained persons to operate it, and arrangements that have been properly rehearsed. The emphasis is on practical readiness \u2014 equipment and trained people must be immediately available, not simply documented on paper.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "What is the legal difference between ACoP L101 guidance and the regulations themselves?",
    answer:
      "The Confined Spaces Regulations 1997 are the law \u2014 breach of a regulation is a criminal offence. ACoP L101 \u2018Safe Work in Confined Spaces\u2019 has a special legal status: it is not the law itself, but if you follow the guidance in L101, you will be doing enough to comply with the regulations. If you do not follow L101, you are not automatically in breach, but you must be able to demonstrate that you have complied in some other equally effective way. In practice, the courts give significant weight to ACoP guidance and departure from it requires strong justification.",
  },
  {
    question:
      "Do the CSR 1997 apply to self-employed persons?",
    answer:
      "Yes. The Confined Spaces Regulations 1997 apply to self-employed persons in the same way as they apply to employers. Self-employed workers must not enter a confined space unless they have assessed the risks, established a safe system of work, and put emergency arrangements in place. The Health and Safety at Work etc. Act 1974 Section 3(2) also requires self-employed persons to conduct their undertaking in such a way that they and other persons are not exposed to risks to their health and safety.",
  },
  {
    question:
      "How do the CSR 1997 interact with CDM 2015 on construction sites?",
    answer:
      "On construction projects, both sets of regulations apply simultaneously. CDM 2015 requires the principal contractor to plan, manage, and monitor the construction phase, which includes confined space work. The principal designer must address confined space risks in the pre-construction information, and the health and safety file must record any confined spaces that remain in the completed structure. The CSR 1997 provides the specific requirements for the confined space work itself \u2014 avoidance, safe system of work, and emergency arrangements \u2014 while CDM 2015 provides the project management framework.",
  },
  {
    question:
      "What atmospheric conditions must be tested before entering a confined space?",
    answer:
      "Before entry, the atmosphere must be tested for oxygen levels (normal is 20.9% by volume \u2014 entry is typically unsafe below 19.5% or above 23.5%), flammable gases and vapours (must be well below the Lower Explosive Limit, typically below 10% LEL), and toxic gases relevant to the space (such as hydrogen sulphide in sewers, carbon monoxide in plant rooms, or carbon dioxide in cellars). Testing must be carried out by a competent person using properly calibrated and maintained equipment. Continuous monitoring during the work is strongly recommended by ACoP L101.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the statutory instrument number of the Confined Spaces Regulations 1997?",
    options: [
      "SI 1997/1713",
      "SI 1997/2776",
      "SI 1997/1529",
      "SI 1997/3242",
    ],
    correctAnswer: 0,
    explanation:
      "The Confined Spaces Regulations 1997 were made under Statutory Instrument 1997/1713. They came into force on 28 January 1998 and apply to England, Scotland, and Wales. Separate but very similar regulations apply in Northern Ireland (SR 1999 No. 13).",
  },
  {
    id: 2,
    question:
      "How many regulations are contained within the Confined Spaces Regulations 1997?",
    options: ["3", "5", "7", "10"],
    correctAnswer: 1,
    explanation:
      "The CSR 1997 is a deliberately concise piece of legislation containing just 5 regulations: Reg 1 (Citation and commencement), Reg 2 (Interpretation), Reg 3 (Avoidance of entry), Reg 4 (Safe system of work), and Reg 5 (Emergency arrangements). The brevity is intentional \u2014 the detailed practical guidance is provided in ACoP L101.",
  },
  {
    id: 3,
    question:
      "Under HASAWA 1974 Section 2, who has the primary duty to ensure the health, safety, and welfare of employees?",
    options: [
      "The employee themselves",
      "The HSE inspector",
      "The employer",
      "The local authority",
    ],
    correctAnswer: 2,
    explanation:
      "Section 2 of the Health and Safety at Work etc. Act 1974 places the primary duty on the employer to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees. This overarching duty underpins the CSR 1997 and means the employer is responsible for safe confined space working.",
  },
  {
    id: 4,
    question:
      "Which ACoP provides practical guidance on complying with the Confined Spaces Regulations 1997?",
    options: [
      "L8 \u2014 Legionella",
      "L143 \u2014 Asbestos",
      "L101 \u2014 Safe Work in Confined Spaces",
      "L21 \u2014 Management of Health and Safety",
    ],
    correctAnswer: 2,
    explanation:
      "ACoP L101 \u2018Safe Work in Confined Spaces\u2019 (now in its 4th edition) is the HSE\u2019s Approved Code of Practice that provides detailed practical guidance on complying with the CSR 1997. It has special legal status \u2014 following it is presumed to be sufficient to comply with the law.",
  },
  {
    id: 5,
    question:
      "Under the Management of Health and Safety at Work Regulations 1999, what must an employer carry out before any work in a confined space?",
    options: [
      "A fire risk assessment under the RRO 2005",
      "A suitable and sufficient risk assessment",
      "A COSHH assessment only",
      "An environmental impact assessment",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 3 of the Management of Health and Safety at Work Regulations 1999 requires every employer to carry out a suitable and sufficient assessment of the risks to the health and safety of employees and others. This risk assessment underpins the safe system of work required under CSR 1997 Regulation 4.",
  },
  {
    id: 6,
    question:
      "Which regulation set governs the selection and maintenance of equipment used in confined space work?",
    options: [
      "LOLER 1998",
      "PUWER 1998",
      "DSEAR 2002",
      "COSHH 2002",
    ],
    correctAnswer: 1,
    explanation:
      "The Provision and Use of Work Equipment Regulations 1998 (PUWER) governs the selection, maintenance, and use of all work equipment, including gas detectors, ventilation fans, lighting, and powered tools used in confined spaces. Equipment must be suitable for the purpose, properly maintained, and used by trained persons.",
  },
  {
    id: 7,
    question:
      "Under DSEAR 2002, what specific hazard must be assessed in confined spaces where flammable substances may be present?",
    options: [
      "Noise levels exceeding 80 dB(A)",
      "Risk of explosive atmospheres",
      "Ionising radiation levels",
      "Biological hazards from vermin",
    ],
    correctAnswer: 1,
    explanation:
      "The Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR) require employers to assess the risk of fire and explosion from dangerous substances, including flammable gases and vapours that may accumulate in confined spaces. Where an explosive atmosphere could occur, the employer must classify the space into zones and ensure equipment is suitable (ATEX-rated).",
  },
  {
    id: 8,
    question:
      "What is the maximum custodial sentence for an individual convicted of a serious health and safety offence under the HASAWA 1974?",
    options: [
      "6 months",
      "12 months",
      "2 years",
      "5 years",
    ],
    correctAnswer: 2,
    explanation:
      "Under Section 33 of the Health and Safety at Work etc. Act 1974, an individual convicted on indictment of a serious offence (such as a breach leading to a death in a confined space) can face imprisonment for up to 2 years and/or an unlimited fine. Organisations face unlimited fines. The Corporate Manslaughter and Corporate Homicide Act 2007 can also apply where a gross management failure causes death.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function ConfinedSpacesModule2Section1() {
  useSEO({
    title:
      "Confined Spaces Regulations 1997 | Confined Spaces Module 2 Section 1",
    description:
      "Comprehensive coverage of the Confined Spaces Regulations 1997 (SI 1997/1713), ACoP L101, HASAWA 1974 duties, associated regulations, enforcement powers, and case law.",
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
            <Link to="../confined-spaces-module-2">
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
          <Scale className="h-10 w-10 text-cyan-500 mx-auto mb-4" />
          <span className="inline-block bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Confined Spaces Regulations 1997
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            The primary UK legislation governing work in confined spaces &mdash; understanding all
            five regulations, the Approved Code of Practice, supporting legislation, and enforcement
          </p>
        </div>

        {/* ─── 01 Overview & Summary Boxes ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Overview of the CSR 1997
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-cyan-500/10 border-l-2 border-l-cyan-500/50 border border-cyan-500/30">
              <p className="font-semibold text-base text-cyan-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>CSR 1997 (SI 1997/1713)</strong> is the primary UK legislation for
                    confined space work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Came into force <strong>28 January 1998</strong>, made under the Health and
                    Safety at Work etc. Act 1974.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Contains just <strong>5 regulations</strong> &mdash; deliberately concise, with
                    detail provided in <strong>ACoP L101</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Applies to <strong>all workplaces</strong> in England, Scotland, and Wales.
                    Separate regulations in Northern Ireland.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-cyan-500/10 border-l-2 border-l-cyan-500/50 border border-cyan-500/30">
              <p className="font-semibold text-base text-cyan-400 mb-2">Core Principle</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Hierarchy:</strong> Avoid entry &rarr; Safe system of work &rarr;
                    Emergency arrangements.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Applies to <strong>employers, self-employed persons, and anyone who
                    controls confined space work</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Enforced by the <strong>HSE and local authorities</strong> with criminal
                    sanctions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    Supported by <strong>ACoP L101</strong> &ldquo;Safe Work in Confined
                    Spaces&rdquo; (4th edition).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 02 Learning Outcomes ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span>
                Identify all five regulations within the Confined Spaces Regulations 1997 and
                explain the purpose of each
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span>
                Describe the hierarchy of control established by Regulations 3, 4, and 5 &mdash;
                avoidance, safe system of work, and emergency arrangements
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span>
                Explain the legal weight of ACoP L101 and how it supports compliance with the
                regulations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span>
                Outline the employer and employee duties under HASAWA 1974 Sections 2, 3, and 7 as
                they relate to confined space work
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span>
                Identify how the Management Regulations 1999, CDM 2015, PUWER 1998, LOLER 1998,
                COSHH 2002, and DSEAR 2002 interact with the CSR 1997
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span>
                Describe the enforcement powers of the HSE and local authorities, including
                improvement notices, prohibition notices, prosecution, and custodial sentences
              </span>
            </li>
          </ul>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Regulation 1 & 2: Citation, Commencement & Interpretation ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">03</span>
              Regulations 1 &amp; 2: Citation, Commencement &amp; Interpretation
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Confined Spaces Regulations 1997 are a concise but powerful set of five
                regulations. Understanding the opening two regulations is essential because they
                establish <em>when</em> the law applies, <em>to whom</em>, and the precise
                definitions that underpin every duty.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  <FileText className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Regulation 1 &mdash; Citation and Commencement
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Title:</strong> &ldquo;The Confined Spaces Regulations 1997&rdquo;
                      (SI 1997/1713).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Commencement date:</strong> 28 January 1998.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Geographic scope:</strong> England, Scotland, and Wales. Northern
                      Ireland has equivalent regulations (the Confined Spaces Regulations
                      (Northern Ireland) 1999, SR 1999 No. 13).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Enabling Act:</strong> Made under the Health and Safety at Work etc.
                      Act 1974 (HASAWA), specifically Sections 15(1), 15(2), 15(3)(a), 15(4)(a),
                      and 15(5)(b).
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  <FileText className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Regulation 2 &mdash; Interpretation (Key Definitions)
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-white/80">
                    Regulation 2 provides the legal definitions that determine the scope of the
                    regulations. The most critical definition is that of a &ldquo;confined
                    space&rdquo; itself:
                  </p>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                    <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      Legal Definition
                    </p>
                    <p className="text-white italic">
                      &ldquo;Confined space&rdquo; means any place, including any chamber, tank,
                      vat, silo, pit, trench, pipe, sewer, flue, well, or other similar space in
                      which, by virtue of its enclosed nature, there arises a reasonably
                      foreseeable specified risk.
                    </p>
                  </div>

                  <p className="text-white/80">
                    The definition has <strong>two limbs</strong> that must both be satisfied:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-cyan-400 font-semibold text-sm mb-1">
                        Limb 1: Enclosed Nature
                      </p>
                      <p className="text-white/80 text-xs">
                        The space must be substantially (though not necessarily entirely) enclosed.
                        A space can have openings and still be &ldquo;enclosed&rdquo; within the
                        meaning of the regulations.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-cyan-400 font-semibold text-sm mb-1">
                        Limb 2: Specified Risk
                      </p>
                      <p className="text-white/80 text-xs">
                        A reasonably foreseeable &ldquo;specified risk&rdquo; must arise by virtue
                        of the enclosed nature. The risk must be one of those listed in
                        Regulation 1(2).
                      </p>
                    </div>
                  </div>

                  <p className="text-white/80 mt-2">
                    The &ldquo;specified risks&rdquo; defined in the regulations are:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Serious injury from fire or explosion</strong>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Loss of consciousness</strong> arising from an increase in body
                        temperature
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Loss of consciousness or asphyxiation</strong> arising from gas,
                        fume, vapour, or lack of oxygen
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Drowning</strong> arising from an increase in the level of a liquid
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Asphyxiation from a free-flowing solid</strong> or being unable to
                        reach a respirable environment due to entrapment by a free-flowing solid
                      </div>
                    </li>
                  </ul>

                  <div className="bg-white/5 border border-cyan-500/30 p-3 rounded-lg mt-2">
                    <div className="flex items-start gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <p className="text-cyan-300 font-semibold text-sm">Key Point</p>
                    </div>
                    <p className="text-white/80 text-xs">
                      Both limbs must be present. A small room is not a confined space simply
                      because it is enclosed &mdash; there must also be a foreseeable specified
                      risk arising from that enclosed nature. Conversely, a hazardous open area is
                      not a confined space because it lacks the enclosed nature.
                    </p>
                  </div>

                  <p className="text-white/80 mt-3">
                    Regulation 2 also defines &ldquo;<strong>competent person</strong>&rdquo; as a
                    person with sufficient training, experience, knowledge, and other qualities to
                    enable them to properly implement the requirements of the regulations. ACoP L101
                    expands on this, noting that competence is task-specific &mdash; a person
                    competent to test an atmosphere may not be competent to carry out a rescue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Regulation 3: Avoidance of Entry ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">04</span>
              Regulation 3: Avoidance of Entry &mdash; The Hierarchy
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Regulation 3 establishes the fundamental principle that underpins the entire
                regulatory framework: <strong>do not enter a confined space if the work can be
                done from outside</strong>. This is not merely guidance &mdash; it is a legal duty.
                Entry must be avoided wherever it is reasonably practicable to do so.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Regulation 3 (Paraphrased)
                </p>
                <p className="text-white italic text-sm">
                  &ldquo;No person at work shall enter a confined space to carry out work for any
                  purpose unless it is not reasonably practicable to achieve that purpose without
                  such entry.&rdquo;
                </p>
              </div>

              <p>
                ACoP L101 provides extensive guidance on alternatives to entry. Before planning any
                confined space entry, the duty holder must consider whether the work can be done by
                other means:
              </p>

              {/* Avoidance Hierarchy Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-4 text-centre">
                  Hierarchy of Control &mdash; Avoidance First
                </h3>
                <div className="space-y-3">
                  {/* Level 1 */}
                  <div className="flex items-stretch gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div className="w-0.5 flex-1 bg-white/20 mt-1" />
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg flex-1 mb-1">
                      <p className="text-green-400 font-semibold text-sm">
                        AVOID ENTRY (Regulation 3)
                      </p>
                      <p className="text-white/80 text-xs mt-1">
                        Can the task be completed without entering? Consider remote inspection
                        (cameras, drones), mechanical cleaning (high-pressure jets), modification
                        from outside, extending tools, or redesigning the process.
                      </p>
                    </div>
                  </div>

                  {/* Level 2 */}
                  <div className="flex items-stretch gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div className="w-0.5 flex-1 bg-white/20 mt-1" />
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex-1 mb-1">
                      <p className="text-amber-400 font-semibold text-sm">
                        SAFE SYSTEM OF WORK (Regulation 4)
                      </p>
                      <p className="text-white/80 text-xs mt-1">
                        If entry is unavoidable, implement a full safe system: risk assessment,
                        competent persons, atmospheric testing, permits, isolation, ventilation,
                        PPE, communication, and supervision.
                      </p>
                    </div>
                  </div>

                  {/* Level 3 */}
                  <div className="flex items-stretch gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        3
                      </div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex-1">
                      <p className="text-red-400 font-semibold text-sm">
                        EMERGENCY ARRANGEMENTS (Regulation 5)
                      </p>
                      <p className="text-white/80 text-xs mt-1">
                        Before any entry, adequate emergency arrangements must be in place: rescue
                        equipment, trained rescue team, rehearsed procedures, communication with
                        emergency services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  Alternatives to Entry (ACoP L101 Examples)
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>Remote visual inspection using CCTV or drones</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>Cleaning by water jetting, steam, or chemical treatment from outside</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>Blockage clearance using rods, high-pressure water, or mechanical tools</div>
                    </li>
                  </ul>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>Sampling and testing atmosphere from outside the space</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>Modifying the space to eliminate the confined nature (e.g. permanent ventilation)</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                      <div>Redesigning the process so that entry is no longer necessary</div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-cyan-300">Electricians &amp; Avoidance</h3>
                </div>
                <p className="text-white/80 text-sm">
                  For electrical work, Regulation 3 means asking: can the cable be routed
                  differently to avoid the confined space? Can the equipment be relocated? Can
                  testing be done from outside using extended leads? Can a camera inspect the
                  cable duct without a person entering? Only when these alternatives are genuinely
                  not reasonably practicable should entry be planned.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 05 Regulation 4: Safe System of Work ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Regulation 4: Safe System of Work
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Where entry to a confined space cannot be avoided, Regulation 4 requires that a
                safe system of work is established. This is the most detailed of the five
                regulations, and ACoP L101 provides extensive guidance on what a safe system must
                include. The safe system of work must be <strong>documented, communicated to all
                involved, and followed rigorously</strong>.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Regulation 4 (Paraphrased)
                </p>
                <p className="text-white italic text-sm">
                  &ldquo;Where work is to be carried out in a confined space, no person at work
                  shall enter or carry out work in that space unless there is a suitable and
                  sufficient safe system of work in place.&rdquo;
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  Key Elements of a Safe System of Work
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Competent persons:</strong> Everyone involved &mdash; the supervisor,
                      the entrant, the top person (attendant), and anyone carrying out atmospheric
                      testing &mdash; must be competent for their specific role. Competence means
                      having the right combination of training, experience, and knowledge.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Risk assessment:</strong> A suitable and sufficient assessment of the
                      risks must be carried out before entry. This must identify all hazards
                      associated with the confined space and the work to be done, and specify the
                      control measures required.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Atmospheric testing:</strong> The atmosphere must be tested before
                      entry for oxygen concentration, flammable gases and vapours, and toxic gases.
                      Testing must be carried out by a competent person using calibrated equipment.
                      Where conditions may change, <strong>continuous monitoring</strong> during the
                      work is required.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Ventilation:</strong> Where reasonably practicable, the confined space
                      must be ventilated to ensure a safe atmosphere. Mechanical ventilation
                      (forced or extracted) is usually necessary. Natural ventilation alone is
                      rarely sufficient.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Isolation:</strong> All pipework, services, and mechanical/electrical
                      systems that could introduce hazards must be effectively isolated. This
                      includes physical disconnection, blanking, locking off, and tagging. Valve
                      closure alone is <em>not</em> acceptable isolation.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Suitable equipment:</strong> All equipment (gas detectors, breathing
                      apparatus, lighting, tools, communication devices) must be suitable for the
                      confined space environment, properly maintained, and used by trained
                      personnel. PUWER 1998 applies to equipment selection.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Permit to work:</strong> ACoP L101 strongly recommends a formal
                      permit-to-work system for all confined space entries. The permit documents
                      the hazards, precautions, time limits, communication arrangements, and
                      emergency procedures. It must be signed by the authorising person before
                      entry and formally closed on completion.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Communication:</strong> Reliable two-way communication must be
                      maintained between the entrant and the top person (attendant) at all times.
                      This may be visual, verbal, radio, or hard-wired intercom depending on the
                      space.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Training:</strong> All persons involved must have received adequate
                      training for their role. This includes confined space awareness, use of
                      specific equipment, emergency procedures, and first aid. Training must be
                      refreshed at appropriate intervals.
                    </div>
                  </div>
                </div>
              </div>

              {/* Permit-to-Work Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-4 text-centre">
                  Permit-to-Work Process Flow
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      step: "1",
                      title: "Risk Assessment",
                      desc: "Identify hazards, assess risks, determine controls",
                    },
                    {
                      step: "2",
                      title: "Permit Preparation",
                      desc: "Document precautions, time limits, emergency contacts",
                    },
                    {
                      step: "3",
                      title: "Atmospheric Testing",
                      desc: "Test O\u2082, LEL, toxic gases \u2014 record results on permit",
                    },
                    {
                      step: "4",
                      title: "Authorisation",
                      desc: "Competent person signs permit, briefing given to all",
                    },
                    {
                      step: "5",
                      title: "Controlled Entry",
                      desc: "Entrant and top person follow permit conditions exactly",
                    },
                    {
                      step: "6",
                      title: "Continuous Monitoring",
                      desc: "Ongoing atmospheric checks, communication maintained",
                    },
                    {
                      step: "7",
                      title: "Permit Closure",
                      desc: "Work complete, space cleared, permit formally closed and filed",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1 bg-white/5 border border-white/10 p-2.5 rounded-lg">
                        <p className="text-cyan-400 font-semibold text-sm">{item.title}</p>
                        <p className="text-white/70 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-cyan-300">
                    The &ldquo;Top Person&rdquo; (Attendant)
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  ACoP L101 requires that a competent person (the &ldquo;top person&rdquo; or
                  attendant) remains at the entrance to the confined space at all times while
                  anyone is inside. The top person must: maintain communication with the entrant,
                  monitor the entrant&rsquo;s condition, keep count of persons inside, summon
                  help if needed, and <strong>never enter the space themselves to attempt a
                  rescue</strong> unless they are a trained rescuer with appropriate equipment.
                  Approximately 60% of confined space fatalities are would-be rescuers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 06 Regulation 5: Emergency Arrangements ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">06</span>
              Regulation 5: Emergency Arrangements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Regulation 5 requires that adequate emergency arrangements are in place
                <strong> before</strong> any person enters a confined space. This regulation
                exists because the speed with which conditions can deteriorate in a confined space
                means that rescue must begin within minutes &mdash; waiting for the emergency
                services is almost always too late.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Regulation 5 (Paraphrased)
                </p>
                <p className="text-white italic text-sm">
                  &ldquo;No person at work shall enter or carry out work in a confined space
                  unless suitable and sufficient arrangements for the rescue of persons in the
                  event of an emergency have been made.&rdquo;
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  What Emergency Arrangements Must Include
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Suitable rescue equipment:</strong> This must be appropriate to the
                      specific confined space. It may include rescue harnesses and tripods for
                      vertical spaces, stretchers designed for confined space extraction,
                      self-contained breathing apparatus (SCBA) or airline breathing apparatus,
                      resuscitation equipment, and first aid supplies.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Trained rescue personnel:</strong> A sufficient number of persons
                      must be trained in the use of the rescue equipment and in the rescue
                      procedures specific to that confined space. They must be immediately
                      available &mdash; not on call elsewhere on site.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Rehearsed procedures:</strong> ACoP L101 requires that emergency
                      procedures are not only documented but <em>rehearsed</em>. Practice rescues
                      (dry runs) must be carried out at appropriate intervals to ensure that the
                      rescue team can execute the plan effectively under pressure.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Communication with emergency services:</strong> Arrangements must
                      include the ability to summon the emergency services rapidly. The nearest
                      hospital capable of treating the likely injuries (e.g. hyperbaric chamber
                      for gas poisoning) should be identified in advance.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Resuscitation equipment:</strong> Must be available at the entrance
                      to the confined space, ready for immediate use. Persons trained in its use
                      must be present. Where oxygen-depleted or toxic atmospheres are foreseeable,
                      this is critical.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Never Attempt an Unplanned Rescue
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  The single most important message from L101 on emergency arrangements is this:
                  <strong className="text-white"> never enter a confined space to attempt an
                  improvised rescue</strong>. Approximately 60% of confined space deaths in the
                  UK are rescuers who entered without proper equipment or training. The natural
                  human instinct to rush in and help a colleague in distress is understandable,
                  but without breathing apparatus and rescue training, the rescuer simply becomes
                  the next casualty. Emergency arrangements must be planned, equipped, and
                  rehearsed <em>before</em> entry, not improvised when something goes wrong.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  LOLER 1998 &mdash; Rescue Lifting Operations
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-white/80">
                    Where the emergency arrangements include lifting a casualty from a confined
                    space (e.g. using a rescue tripod and winch to extract someone from a
                    vertical shaft), the Lifting Operations and Lifting Equipment Regulations
                    1998 (LOLER) apply. This means:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <div>
                        Lifting equipment must be of adequate <strong>strength and
                        stability</strong> for the intended use
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <div>
                        A <strong>thorough examination</strong> must be carried out at prescribed
                        intervals (6 months for equipment used to lift persons)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <div>
                        The lifting operation must be properly <strong>planned, supervised, and
                        carried out safely</strong> by competent persons
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 ACoP L101 & Supporting Legislation ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">07</span>
              ACoP L101 &amp; Supporting Legislation
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The CSR 1997 does not operate in isolation. It is supported by an Approved Code of
                Practice and sits within a wider framework of health and safety legislation. A
                competent person must understand how all these pieces fit together.
              </p>

              {/* ACoP L101 */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-semibold mb-2">
                  <FileText className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  ACoP L101 &mdash; &ldquo;Safe Work in Confined Spaces&rdquo; (4th Edition)
                </h3>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    ACoP L101 is the HSE&rsquo;s Approved Code of Practice that accompanies the
                    CSR 1997. It has <strong className="text-white">special legal
                    status</strong>:
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>
                        If you follow the ACoP guidance, you will normally be doing enough to
                        comply with the law on those specific matters.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>
                        If you do not follow the ACoP, you are not automatically in breach, but
                        you must demonstrate compliance by an equally effective method.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>
                        In court, failure to follow L101 is strong evidence that the duty holder
                        has not complied with the regulations, unless they can show an alternative
                        approach was equally effective.
                      </span>
                    </li>
                  </ul>
                  <p className="mt-2">
                    The 4th edition of L101 provides updated guidance on atmospheric testing
                    equipment, rescue techniques, competence standards, and examples of confined
                    spaces across various industries.
                  </p>
                </div>
              </div>

              {/* HASAWA 1974 */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  <Gavel className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  HASAWA 1974 &mdash; The Overarching Framework
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-white/80">
                    The Health and Safety at Work etc. Act 1974 is the &ldquo;parent&rdquo;
                    legislation under which the CSR 1997 was made. Three sections are particularly
                    relevant:
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Section 2 &mdash; Employer&rsquo;s duty to employees:</strong>{" "}
                      Every employer must ensure, so far as is reasonably practicable, the
                      health, safety, and welfare at work of all employees. This includes
                      provision of safe systems of work, safe equipment, information, training,
                      and supervision.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Section 3 &mdash; Duty to non-employees:</strong> Every employer
                      and self-employed person must conduct their undertaking in such a way that
                      persons not in their employment (contractors, visitors, members of the
                      public) are not exposed to risks to their health or safety.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Section 7 &mdash; Employee&rsquo;s duty:</strong> Every employee
                      must take reasonable care for their own health and safety and that of
                      others, and cooperate with their employer to enable the employer to comply
                      with their duties. An employee who enters a confined space without following
                      the safe system of work may be personally liable.
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting Regulations Grid */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  <Scale className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Supporting Regulations
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-cyan-400 font-semibold text-sm mb-1">
                      Management of H&amp;S at Work Regs 1999
                    </p>
                    <p className="text-white/80 text-xs">
                      Reg 3: Risk assessment. Reg 7: Competent assistance. Reg 13: Training and
                      capabilities. Underpins the CSR 1997 safe system of work requirement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-cyan-400 font-semibold text-sm mb-1">
                      CDM 2015
                    </p>
                    <p className="text-white/80 text-xs">
                      Construction-specific requirements. Principal contractor must manage
                      confined space risks. Pre-construction information must address confined
                      spaces. Health and safety file must record permanent confined spaces.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-cyan-400 font-semibold text-sm mb-1">
                      PUWER 1998
                    </p>
                    <p className="text-white/80 text-xs">
                      Governs selection, suitability, and maintenance of all work equipment used
                      in confined spaces: gas detectors, ventilation fans, lighting, power tools,
                      and communication devices.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-cyan-400 font-semibold text-sm mb-1">
                      LOLER 1998
                    </p>
                    <p className="text-white/80 text-xs">
                      Applies to any lifting operation for rescue (tripods, winches, harnesses).
                      Equipment must be thoroughly examined every 6 months when used to lift
                      persons.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-cyan-400 font-semibold text-sm mb-1">
                      COSHH 2002
                    </p>
                    <p className="text-white/80 text-xs">
                      Controls exposure to hazardous substances including toxic gases, fumes, and
                      vapours encountered in confined spaces. Requires assessment, prevention or
                      control, monitoring, and health surveillance.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-cyan-400 font-semibold text-sm mb-1">
                      DSEAR 2002
                    </p>
                    <p className="text-white/80 text-xs">
                      Addresses explosive atmosphere risks. Requires hazardous area classification
                      (zoning), ATEX-rated equipment selection, and elimination or control of
                      ignition sources in confined spaces.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contractor & Self-Employed Obligations */}
              <div className="bg-white/5 border border-cyan-500/30 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  <Users className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Self-Employed &amp; Contractor Obligations
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Self-employed persons</strong> have the same duties under the CSR
                      1997 as employers. They must avoid entry where possible, establish a safe
                      system of work, and put emergency arrangements in place.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Contractors</strong> working in confined spaces on another
                      person&rsquo;s premises must cooperate with the host employer. Both parties
                      share responsibility: the host must provide information about the confined
                      space, and the contractor must provide a competent workforce and safe system
                      of work.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Multi-contractor sites</strong> (common in construction) require
                      coordination under CDM 2015. The principal contractor must ensure that
                      different contractors&rsquo; confined space activities do not conflict and
                      that emergency arrangements are compatible.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>HASAWA 1974 Section 3(2)</strong> requires self-employed persons to
                      conduct their undertaking so that they and others are not exposed to risks.
                      A self-employed electrician working alone in a cable duct must still comply
                      fully with the CSR 1997.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 08 Enforcement, Prosecution & Case Law ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              Enforcement, Prosecution &amp; Case Law
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Health and Safety Executive (HSE) is the primary enforcing authority for the
                CSR 1997. Local authorities also have enforcement powers in certain premises.
                Confined space fatalities are always investigated, and the HSE has consistently
                pursued prosecution where the regulations have been breached.
              </p>

              <div className="space-y-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <h3 className="text-amber-400 font-semibold mb-2">Improvement Notice</h3>
                  <p className="text-white/80 text-sm">
                    An improvement notice requires the duty holder to{" "}
                    <strong className="text-white">remedy a breach within a specified
                    timeframe</strong>. For example, an HSE inspector finding that a company has
                    no confined space entry procedures may issue an improvement notice requiring
                    a full safe system of work to be developed and implemented within 21 days.
                    Failure to comply is a criminal offence.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-2">Prohibition Notice</h3>
                  <p className="text-white/80 text-sm">
                    A prohibition notice <strong className="text-white">stops work
                    immediately</strong> where an inspector believes there is, or is likely to
                    be, a risk of serious personal injury. A prohibition notice may be issued when
                    workers are found entering a confined space without atmospheric testing, without
                    emergency arrangements, or without adequate training. Work cannot resume until
                    the notice is complied with.
                  </p>
                </div>

                <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-lg">
                  <h3 className="text-red-300 font-semibold mb-2">Prosecution</h3>
                  <p className="text-white/80 text-sm">
                    For serious breaches, particularly those resulting in death or serious injury,
                    the HSE will prosecute. Penalties include:
                  </p>
                  <ul className="text-white space-y-2 text-sm mt-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Organisations:</strong> Unlimited fines &mdash; recent confined
                        space cases have resulted in fines of &pound;100,000 to over &pound;1
                        million
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Individuals:</strong> Up to 2 years&rsquo; imprisonment and/or
                        unlimited fines under HASAWA 1974 Section 33
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Corporate Manslaughter:</strong> Where a gross management failure
                        causes death, the Corporate Manslaughter and Corporate Homicide Act 2007
                        may apply &mdash; with unlimited fines and mandatory publicity orders
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Case Law */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  <Gavel className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Notable Case Law
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-cyan-300 font-semibold mb-1">
                      HSE v. Squibb Group Ltd (2019)
                    </p>
                    <p className="text-white/80">
                      A worker died from hydrogen sulphide poisoning after entering a pump
                      chamber on a sewage treatment works. The company had failed to carry out a
                      risk assessment, had no safe system of work, no atmospheric monitoring, and
                      no emergency arrangements. The company was fined <strong
                      className="text-white">&pound;600,000</strong> plus costs. The court
                      emphasised that the regulations required all these measures to be in place
                      <em> before</em> entry, not developed after an incident.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-cyan-300 font-semibold mb-1">
                      R v. Meridian Water Treatment Ltd (2017)
                    </p>
                    <p className="text-white/80">
                      Two workers died after entering a water treatment tank to carry out
                      maintenance. The first worker collapsed from oxygen depletion; the second
                      entered to rescue him and also died. The company had no confined space
                      procedures, no atmospheric testing equipment, and no rescue equipment. The
                      company director received a{" "}
                      <strong className="text-white">custodial sentence</strong> and the company
                      was fined &pound;200,000. The case illustrates the devastating consequences
                      of unplanned rescue attempts.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-cyan-300 font-semibold mb-1">
                      HSE v. Perrys Recycling Ltd (2020)
                    </p>
                    <p className="text-white/80">
                      An employee entered a recycling baler to clear a blockage without the
                      machine being properly isolated. The space was a confined space due to the
                      risk of entrapment. The company was prosecuted for breaches of both the CSR
                      1997 and PUWER 1998. The case demonstrates how multiple regulatory frameworks
                      can apply simultaneously to a single confined space incident, and how failure
                      to isolate equipment is a breach of the safe system of work requirements.
                    </p>
                  </div>
                  <div>
                    <p className="text-cyan-300 font-semibold mb-1">
                      HSE v. Scottish Water (2018)
                    </p>
                    <p className="text-white/80">
                      A worker was overcome by a toxic atmosphere while carrying out maintenance in
                      a water supply chamber. Although Scottish Water had a confined space entry
                      procedure, the investigation revealed it was not being followed on site. The
                      court found that having a written procedure was insufficient &mdash; the
                      employer must ensure it is <strong className="text-white">actually
                      implemented and supervised</strong>. The fine was &pound;120,000.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">Other Enforcement Powers</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Right of entry:</strong> HSE inspectors have the power to enter any
                      workplace at any reasonable time (or at any time if they believe there is a
                      situation of serious personal danger) to carry out inspections under HASAWA
                      1974 Section 20.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Examination and investigation:</strong> Inspectors can take
                      measurements, photographs, samples, and require the production of
                      documents including risk assessments, permits to work, and training records.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Interview under caution:</strong> Under HASAWA 1974 Section 20(2)(j),
                      inspectors can require any person to answer questions and sign a declaration
                      of truth. Obstructing an inspector is itself a criminal offence under
                      Section 33(1)(e).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Fee for intervention (FFI):</strong> Since 2012, the HSE has
                      charged a fee (currently &pound;163 per hour) to duty holders found to be
                      in material breach of health and safety law. This cost-recovery scheme means
                      that even without prosecution, regulatory non-compliance has a direct
                      financial cost.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Local authority enforcement:</strong> In certain premises (shops,
                      offices, hotels, leisure facilities, places of worship), the local authority
                      is the enforcing authority rather than the HSE. They have the same powers
                      to issue improvement and prohibition notices and to prosecute.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Regulatory Interaction Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-4 text-centre">
                  Regulatory Framework &mdash; How the Legislation Connects
                </h3>
                <div className="flex flex-col items-center gap-2">
                  {/* Top Level */}
                  <div className="bg-cyan-500/20 border border-cyan-500/40 px-4 py-2 rounded-lg text-centre w-full max-w-md">
                    <p className="text-cyan-400 font-bold text-sm">HASAWA 1974</p>
                    <p className="text-white/60 text-xs">
                      Overarching framework &mdash; Sections 2, 3 &amp; 7
                    </p>
                  </div>
                  <div className="w-0.5 h-4 bg-cyan-500/30" />

                  {/* CSR Level */}
                  <div className="bg-cyan-500/15 border-2 border-cyan-500/50 px-4 py-3 rounded-lg text-centre w-full max-w-md">
                    <p className="text-cyan-400 font-bold text-sm">
                      Confined Spaces Regulations 1997
                    </p>
                    <p className="text-white/60 text-xs">
                      Regs 1&ndash;5 + ACoP L101
                    </p>
                  </div>
                  <div className="w-0.5 h-4 bg-cyan-500/30" />

                  {/* Supporting Level */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg">
                    {[
                      { name: "MHSWR 1999", desc: "Risk assessment" },
                      { name: "CDM 2015", desc: "Construction" },
                      { name: "PUWER 1998", desc: "Equipment" },
                      { name: "LOLER 1998", desc: "Rescue lifting" },
                      { name: "COSHH 2002", desc: "Toxic substances" },
                      { name: "DSEAR 2002", desc: "Explosive atmos." },
                    ].map((reg, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 border border-white/15 px-2 py-2 rounded-lg text-centre"
                      >
                        <p className="text-cyan-400 font-semibold text-xs">{reg.name}</p>
                        <p className="text-white/50 text-[10px]">{reg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">09</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>Confined Spaces Regulations 1997 (SI 1997/1713)</strong> contain
                      5 regulations establishing a clear hierarchy: avoid entry, then safe system
                      of work, then emergency arrangements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Regulation 2</strong> defines a confined space as substantially
                      enclosed with a reasonably foreseeable specified risk &mdash; both limbs
                      must be present.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>ACoP L101</strong> has special legal status &mdash; following it is
                      normally sufficient to comply with the law. Departure requires an equally
                      effective alternative.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>HASAWA 1974</strong> (Sections 2, 3 &amp; 7), MHSWR 1999, CDM 2015,
                      PUWER 1998, LOLER 1998, COSHH 2002, and DSEAR 2002 all interact with the
                      CSR 1997.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Self-employed and contractors</strong> have the same duties as
                      employers under the regulations. Cooperation between parties is essential on
                      multi-contractor sites.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>HSE</strong> enforces through improvement notices, prohibition
                      notices, and prosecution &mdash; with unlimited fines for organisations
                      and up to 2 years&rsquo; imprisonment for individuals.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Never attempt an unplanned rescue</strong> &mdash; approximately
                      60% of confined space deaths are would-be rescuers. Emergency arrangements
                      must be planned, equipped, and rehearsed before entry.
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
            <span className="text-cyan-400/80 text-sm font-normal">10</span>
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
            title="Confined Spaces Regulations 1997 Quiz"
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
            <Link to="../confined-spaces-module-1-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Confined Spaces in Electrical Work
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-2-section-2">
              Next: Risk Assessment for Confined Spaces
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
