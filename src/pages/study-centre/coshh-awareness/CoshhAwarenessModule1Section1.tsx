import { ArrowLeft, ShieldAlert, CheckCircle, AlertTriangle, Beaker, Scale, ClipboardList, BookOpen } from "lucide-react";
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
    id: "coshh-stands-for",
    question: "What does COSHH stand for?",
    options: [
      "Control of Substances Harmful to Humans",
      "Control of Substances Hazardous to Health",
      "Conditions of Safety and Health Hazards",
      "Code of Standards for Hazardous Health"
    ],
    correctIndex: 1,
    explanation:
      "COSHH stands for the Control of Substances Hazardous to Health. The COSHH Regulations 2002 (SI 2002/2677) place duties on employers to assess and control exposure to hazardous substances in the workplace."
  },
  {
    id: "coshh-not-covered",
    question: "Which of the following substances is NOT covered by COSHH?",
    options: [
      "PVC cement solvent",
      "Silica dust from chasing walls",
      "Asbestos fibres",
      "Isocyanate-based expanding foam"
    ],
    correctIndex: 2,
    explanation:
      "Asbestos is excluded from COSHH because it has its own dedicated legislation \u2014 the Control of Asbestos Regulations 2012 (CAR 2012). Lead and radioactive substances are also excluded from COSHH for the same reason."
  },
  {
    id: "coshh-lung-deaths",
    question: "Approximately how many people die each year in the UK from occupational lung disease?",
    options: [
      "Around 1,500",
      "Around 5,000",
      "Around 13,000",
      "Around 25,000"
    ],
    correctIndex: 2,
    explanation:
      "The HSE estimates that around 13,000 people die each year in the UK from occupational lung disease, including conditions such as chronic obstructive pulmonary disease (COPD), occupational asthma, silicosis, and lung cancer linked to workplace exposures."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Do the COSHH Regulations apply to self-employed electricians?",
    answer:
      "Yes. Self-employed persons have a duty under COSHH Regulation 3 to protect themselves and anyone else who may be affected by the work. If you are a sole trader working with solvents, PVC cement, cleaning agents, or any other hazardous substance, you must carry out a suitable assessment and implement adequate controls \u2014 even if you are the only person at risk. Under the Health and Safety at Work etc. Act 1974, self-employed persons owe the same general duties as employers when their work activity may affect the health of others."
  },
  {
    question: "Is a COSHH assessment the same as a risk assessment?",
    answer:
      "Not exactly. A COSHH assessment is a specific, substance-focused assessment required under Regulation 6 of the COSHH Regulations 2002. It concentrates on identifying what hazardous substances are present, who might be exposed, how exposure could occur, and what control measures are needed. A general risk assessment under the Management of Health and Safety at Work Regulations 1999 covers all workplace hazards \u2014 not just substances. In practice, COSHH assessments often form part of a wider risk assessment process, but they must address the specific requirements of the COSHH Regulations, including workplace exposure limits (WELs), health surveillance, and monitoring."
  },
  {
    question: "What are workplace exposure limits (WELs)?",
    answer:
      "Workplace exposure limits are the maximum concentrations of airborne hazardous substances to which workers may be exposed over a specified reference period, as listed in EH40/2005 (as amended). WELs are set by the HSE and are legally binding under COSHH. There are two types: the 8-hour time-weighted average (TWA), which is the average concentration over a normal working day, and the 15-minute short-term exposure limit (STEL), which controls peak exposures. Employers must ensure that WELs are not exceeded and, where reasonably practicable, reduce exposure well below the limit."
  },
  {
    question: "What should I do if I think I am being exposed to a hazardous substance at work?",
    answer:
      "You should raise the concern with your supervisor, site manager, or health and safety representative immediately. Under COSHH Regulation 8(2)(c), you have a duty to report any situation that you believe may represent a serious or imminent danger, or any shortcoming in control measures. Your employer is legally required to investigate and take action. You can also contact the HSE directly if you believe your employer is not meeting their duties. Never continue working in conditions where you believe your health is at risk \u2014 the law protects you from being penalised for raising legitimate health and safety concerns."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What is the full title of the primary COSHH legislation?",
    options: [
      "Control of Substances Hazardous to Health Regulations 2002 (as amended)",
      "Control of Substances Harmful to Health Act 2002",
      "COSHH (Safety at Work) Regulations 2005",
      "Hazardous Substances Control Act 1999"
    ],
    correctAnswer: 0,
    explanation:
      "The full title is the Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), as amended. These are regulations made under the Health and Safety at Work etc. Act 1974 and the European Communities Act 1972, not an Act of Parliament in their own right."
  },
  {
    id: 2,
    question:
      "Which of the following is NOT excluded from the scope of COSHH?",
    options: [
      "Asbestos",
      "Lead",
      "Solvents used for cable jointing",
      "Radioactive substances"
    ],
    correctAnswer: 2,
    explanation:
      "Solvents (including those used for cable jointing, PVC cement, and degreasing) are fully covered by COSHH. Asbestos, lead, and radioactive substances are excluded because they have their own specific regulations \u2014 CAR 2012, CLAW 2002, and the Ionising Radiations Regulations 2017 respectively."
  },
  {
    id: 3,
    question:
      "How many new cases of work-related skin disease are estimated to occur in the UK each year?",
    options: [
      "Around 2,000",
      "Around 7,000",
      "Around 12,000",
      "Around 20,000"
    ],
    correctAnswer: 2,
    explanation:
      "The HSE estimates that around 12,000 new cases of work-related skin disease occur annually in the UK, including contact dermatitis, which is the most common occupational skin condition. Many of these cases are caused by exposure to hazardous substances covered by COSHH."
  },
  {
    id: 4,
    question:
      "Which piece of legislation is considered the 'parent Act' under which COSHH was made?",
    options: [
      "Factories Act 1961",
      "Environmental Protection Act 1990",
      "Health and Safety at Work etc. Act 1974",
      "Management of Health and Safety at Work Regulations 1999"
    ],
    correctAnswer: 2,
    explanation:
      "The COSHH Regulations 2002 are secondary legislation (statutory instruments) made under the Health and Safety at Work etc. Act 1974 (HASAWA). HASAWA is the primary enabling Act that provides the Secretary of State with powers to make health and safety regulations."
  },
  {
    id: 5,
    question:
      "What is the FIRST step in the COSHH 8 essentials approach?",
    options: [
      "Provide personal protective equipment",
      "Carry out health surveillance",
      "Assess the risks from hazardous substances",
      "Prevent exposure or substitute with safer alternatives"
    ],
    correctAnswer: 2,
    explanation:
      "The first of the 8 COSHH essentials steps is to assess the risks. You must identify what hazardous substances are present, who might be exposed, and how, before you can decide on the appropriate control measures. Assessment always comes first."
  },
  {
    id: 6,
    question:
      "When an electrician cuts PVC trunking with a hot wire cutter, what type of hazardous substance may be released?",
    options: [
      "Silica dust",
      "Hydrogen chloride fumes",
      "Carbon monoxide only",
      "Lead vapour"
    ],
    correctAnswer: 1,
    explanation:
      "When PVC (polyvinyl chloride) is heated or burned, it can release hydrogen chloride (HCl) gas and other toxic fumes including dioxins and furans. This is why adequate ventilation and, where necessary, respiratory protective equipment (RPE) are essential when cutting or working with heated PVC."
  },
  {
    id: 7,
    question:
      "Under COSHH, what is an employer\u2019s primary duty regarding hazardous substances?",
    options: [
      "To eliminate all chemicals from the workplace",
      "To provide PPE to all workers regardless of risk",
      "To prevent or adequately control exposure to hazardous substances",
      "To label all substances with COSHH stickers"
    ],
    correctAnswer: 2,
    explanation:
      "Under COSHH Regulation 7, the employer\u2019s primary duty is to prevent exposure to hazardous substances or, where prevention is not reasonably practicable, to adequately control exposure. PPE is the last resort in the hierarchy of controls \u2014 not the first response."
  },
  {
    id: 8,
    question:
      "Which regulation works alongside COSHH to control risks from dangerous substances that can cause fires and explosions?",
    options: [
      "The Regulatory Reform (Fire Safety) Order 2005",
      "The Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR)",
      "The Building Regulations 2010 Part B",
      "The Control of Major Accident Hazards Regulations 2015 (COMAH)"
    ],
    correctAnswer: 1,
    explanation:
      "DSEAR 2002 works alongside COSHH to control risks from dangerous substances that can cause fires, explosions, or similar energetic events. Where a substance is both hazardous to health and a fire/explosion risk (e.g., solvents, flammable gases), both COSHH and DSEAR apply."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function CoshhAwarenessModule1Section1() {
  useSEO({
    title: "What Is COSHH? | COSHH Awareness Module 1.1",
    description:
      "Understand the COSHH Regulations 2002, what they cover, why they matter to electricians, employer and employee duties, and the 8 COSHH essentials steps.",
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
            <Link to="../coshh-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-400/20 border border-violet-500/30 mb-4">
            <ShieldAlert className="h-7 w-7 text-violet-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is COSHH?
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the Control of Substances Hazardous to Health Regulations &mdash; what they require, what they cover, and why every electrician needs to know them
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>What:</strong> COSHH Regulations 2002 &mdash; controlling hazardous substances at work</li>
              <li><strong>Scope:</strong> Chemicals, dusts, fumes, vapours, gases, mists, biological agents</li>
              <li><strong>Not covered:</strong> Asbestos, lead, radioactive substances</li>
              <li><strong>Deaths:</strong> ~13,000 per year from occupational lung disease alone</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Check:</strong> Safety data sheets before using any chemical product</li>
              <li><strong>Read:</strong> The COSHH assessment before starting work with hazardous substances</li>
              <li><strong>Use:</strong> All control measures and PPE as instructed</li>
              <li><strong>Report:</strong> Any symptoms, spills, or failures in controls immediately</li>
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
              "State the full title and purpose of the COSHH Regulations 2002",
              "Define what constitutes a \u2018substance hazardous to health\u2019 under COSHH",
              "Identify what COSHH covers and what is specifically excluded",
              "Explain why COSHH is particularly relevant to the electrical trade",
              "Outline the 8 COSHH essentials steps for managing hazardous substances",
              "Describe the main duties of both employers and employees under COSHH"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: Introduction to COSHH                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">01</span>
            Introduction to COSHH
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every day in the United Kingdom, thousands of workers are exposed to substances that can
                damage their health. These range from everyday cleaning products and adhesives to highly
                toxic industrial chemicals, respirable dusts, and biological hazards. The consequences of
                uncontrolled exposure can be severe and, in many cases, irreversible &mdash; chronic lung
                disease, occupational asthma, dermatitis, cancer, and death.
              </p>

              <p>
                To address this, the UK Government introduced the <strong>Control of Substances Hazardous
                to Health Regulations 2002</strong>, commonly known as <strong>COSHH</strong>. The full
                statutory reference is <strong>SI 2002/2677</strong>, and the regulations have been
                amended several times since their original enactment to keep pace with evolving scientific
                understanding and European requirements. COSHH is secondary legislation made under the
                enabling powers of the <strong>Health and Safety at Work etc. Act 1974 (HASAWA)</strong>.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Key Definition:</strong> COSHH stands for the
                  <strong> Control of Substances Hazardous to Health</strong>. The regulations require
                  employers to assess the risks from hazardous substances in the workplace and to prevent
                  or adequately control exposure to protect workers&rsquo; health.
                </p>
              </div>

              <p>
                The purpose of COSHH is straightforward: to protect people at work (and others who may
                be affected by the work activity) from illness caused by hazardous substances. The
                regulations set out a clear framework of duties for employers, which can be summarised
                as follows:
              </p>

              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Assess</strong> the risks to health from hazardous substances used in or created by the workplace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Prevent</strong> exposure where reasonably practicable, or <strong>control</strong> it adequately where prevention is not possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Maintain</strong> control measures and keep them in efficient working order</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Monitor</strong> exposure and carry out health surveillance where appropriate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Inform, instruct, and train</strong> employees about the risks and the measures in place to protect them</span>
                </li>
              </ul>

              <p>
                COSHH applies to virtually every workplace in the UK where hazardous substances are
                used, handled, stored, or produced as part of the work process. This includes offices,
                factories, construction sites, hospitals, laboratories, farms, and domestic premises
                where work is being carried out. It is not limited to &ldquo;heavy industry&rdquo;
                &mdash; even a small electrical contracting firm using PVC solvent cement, cleaning
                sprays, or flux is subject to COSHH.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Why &ldquo;As Amended&rdquo; Matters</p>
                <p className="text-sm text-white/80">
                  You will often see the COSHH Regulations referred to as &ldquo;the Control of
                  Substances Hazardous to Health Regulations 2002 (as amended)&rdquo;. This is because
                  the original 2002 regulations have been amended multiple times &mdash; notably in
                  2003, 2004, and 2005 &mdash; to incorporate updated workplace exposure limits,
                  align with European directives on chemical agents, and strengthen provisions around
                  carcinogens and mutagens. When citing COSHH in assessments or toolbox talks, always
                  use the &ldquo;as amended&rdquo; form to indicate you are referring to the current,
                  up-to-date version.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: The Legal Definition & Scope                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">02</span>
            The Legal Definition &amp; Scope
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 2 of COSHH provides the legal definition of a <strong>&ldquo;substance
                hazardous to health&rdquo;</strong>. Understanding this definition is important because
                it determines exactly which substances fall within the scope of COSHH and which do not.
              </p>

              <p>
                Under COSHH, a substance hazardous to health means any substance (including preparations,
                i.e. mixtures) that falls into one or more of the following categories:
              </p>

              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    <strong>Substances classified as hazardous</strong> under the CLP Regulation
                    (Regulation (EC) No 1272/2008, as retained in UK law). This includes substances
                    classified as toxic, harmful, corrosive, irritant, sensitising, carcinogenic,
                    mutagenic, or toxic to reproduction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    <strong>Substances with a workplace exposure limit (WEL)</strong> as listed in
                    Table 1 of EH40/2005 (as amended), the HSE&rsquo;s guidance document on workplace
                    exposure limits.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    <strong>Biological agents</strong> &mdash; any micro-organism, cell culture, or
                    human endoparasite, including any that have been genetically modified, which may
                    cause infection, allergy, toxicity, or otherwise create a hazard to human health.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    <strong>Dust of any kind</strong> when present in substantial concentrations in
                    the air. The COSHH Regulations set a WEL of 10 mg/m&sup3; for inhalable dust
                    and 4 mg/m&sup3; for respirable dust (the finer fraction that reaches deep into
                    the lungs).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    <strong>Any other substance</strong> that creates a comparable hazard to health
                    but is not covered by the categories above. This is a &ldquo;catch-all&rdquo;
                    provision that ensures COSHH can adapt to newly identified hazards.
                  </span>
                </li>
              </ul>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Routes of Exposure</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  COSHH is concerned with all routes by which a hazardous substance can enter the body
                  and cause harm. There are four main routes of exposure:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Inhalation</p>
                    <p className="text-xs text-white/70">
                      Breathing in dusts, fumes, vapours, gases, and mists. The most common route of
                      entry in the workplace and the one most associated with serious occupational
                      lung disease.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Skin Absorption</p>
                    <p className="text-xs text-white/70">
                      Direct contact with the skin, causing localised damage (e.g., dermatitis, chemical
                      burns) or systemic poisoning through absorption into the bloodstream.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Ingestion</p>
                    <p className="text-xs text-white/70">
                      Swallowing hazardous substances &mdash; often through contaminated hands, food, or
                      drink. Poor hygiene practices are a common cause.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Injection</p>
                    <p className="text-xs text-white/70">
                      Entry through puncture wounds, cuts, or needlestick injuries. Less common but
                      relevant in some environments, particularly healthcare and waste handling.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                It is vital to understand that COSHH is not limited to &ldquo;chemicals in bottles&rdquo;.
                It also covers substances that are <strong>generated</strong> by the work process itself.
                For electricians, this is critically important. When you chase a wall, you generate
                respirable dust. When you solder a joint, you create solder fumes. When you cut PVC
                trunking with a hot-wire cutter, you release hydrogen chloride gas. When you strip old
                cable insulation, you may release toxic particles. All of these are substances hazardous
                to health within the meaning of COSHH, even though you never opened a container.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Term: &ldquo;Substance&rdquo;</p>
                <p className="text-sm text-white/80">
                  Under COSHH, &ldquo;substance&rdquo; is defined very broadly. It includes any natural
                  or artificial substance in any physical form &mdash; solid, liquid, gas, vapour, dust,
                  fume, fibre, or mist. It includes raw materials, products, by-products, waste, and
                  anything produced, used, or given off during work activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: What COSHH Covers (and What It Doesn't)          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">03</span>
            What COSHH Covers (and What It Doesn&rsquo;t)
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                COSHH has a very wide scope, but it is not universal. Certain specific substances are
                excluded because they are covered by their own dedicated regulations, which impose
                controls that are tailored to their particular hazards. Understanding what falls inside
                and outside the scope of COSHH is essential for compliance.
              </p>

              {/* COSHH Scope Diagram */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-4 text-center">COSHH Scope Diagram</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Covered */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <p className="text-sm font-semibold text-green-400">Covered by COSHH</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Chemicals &mdash; solvents, adhesives, paints, cleaning agents, oils, resins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Dusts &mdash; wood dust, cement dust, silica dust, plaster dust, general construction dust</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Fumes &mdash; welding fumes, solder fumes, PVC fumes, diesel exhaust</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Vapours &mdash; solvent vapours, fuel vapours, paint vapours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Gases &mdash; carbon monoxide, hydrogen sulphide, chlorine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Mists &mdash; oil mists, spray paint mists, cutting fluid mists</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Biological agents &mdash; bacteria, viruses, fungi, moulds (e.g., Legionella, leptospirosis)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Nanotechnology &mdash; engineered nanoparticles and nano-materials</span>
                      </li>
                    </ul>
                  </div>

                  {/* Not Covered */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <p className="text-sm font-semibold text-red-400">NOT Covered by COSHH</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Asbestos</strong> &mdash; controlled by the
                          Control of Asbestos Regulations 2012 (CAR 2012)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Lead</strong> &mdash; controlled by the
                          Control of Lead at Work Regulations 2002 (CLAW 2002)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Radioactive substances</strong> &mdash; controlled
                          by the Ionising Radiations Regulations 2017 (IRR 2017)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Substances below the hazard threshold that present no appreciable risk to health
                          under the conditions of use
                        </span>
                      </li>
                    </ul>
                    <div className="mt-3 p-2 bg-white/5 rounded-lg">
                      <p className="text-xs text-white/60">
                        These substances are excluded because they have their own, more specific
                        regulatory frameworks. The exclusion does not mean they are less dangerous
                        &mdash; in most cases, the opposite is true.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The distinction is important in practice. If you encounter asbestos on a construction
                site, you must follow the procedures set out in CAR 2012, not COSHH. If you are working
                with lead-based solder or lead-sheathed cable, the Control of Lead at Work Regulations
                2002 apply. However, if you are using a chemical solvent to strip cable, that solvent
                is covered by COSHH &mdash; even if the cable itself contains lead.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Practical Tip</p>
                <p className="text-sm text-white/80">
                  On many construction sites, you will encounter substances covered by COSHH
                  <em> alongside</em> substances that are excluded (e.g., working near asbestos
                  removal while using chemical cleaning agents). In these situations, multiple sets
                  of regulations apply simultaneously. The key is to know which regulations govern
                  which substances and to ensure compliance with all relevant requirements.
                </p>
              </div>

              <p>
                COSHH also does <strong>not</strong> cover hazards that are purely physical in nature.
                Noise, vibration, radiation (non-ionising), heat, and cold are not &ldquo;substances&rdquo;
                and are addressed by other regulations. Similarly, COSHH does not apply to substances
                that are hazardous only because of their physical properties (e.g., explosiveness or
                flammability) &mdash; those risks fall under the Dangerous Substances and Explosive
                Atmospheres Regulations 2002 (DSEAR). However, many substances are both hazardous to
                health <em>and</em> flammable, in which case both COSHH and DSEAR apply.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Key Statistics & Why It Matters                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">04</span>
            Key Statistics &amp; Why It Matters
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The statistics around occupational ill health caused by hazardous substances are
                staggering. Despite decades of regulation and enforcement, substance exposure at work
                remains one of the biggest causes of work-related death and disease in the United
                Kingdom. The numbers below, drawn from HSE published data, underline why COSHH
                compliance is not optional &mdash; it is a matter of life and death.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">UK Occupational Health Statistics</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~13,000</p>
                    <p className="text-white/70 text-xs">deaths per year from occupational lung disease (COPD, occupational asthma, silicosis, lung cancer)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~12,000</p>
                    <p className="text-white/70 text-xs">new cases of work-related skin disease per year (contact dermatitis, chemical burns, occupational eczema)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~19,000</p>
                    <p className="text-white/70 text-xs">new cases of self-reported breathing or lung problems caused or made worse by work each year</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~8,000</p>
                    <p className="text-white/70 text-xs">estimated cancer registrations linked to past occupational exposures each year</p>
                  </div>
                </div>
              </div>

              <p>
                These are not historical figures &mdash; they represent the current, ongoing scale of
                harm caused by hazardous substances in UK workplaces. The HSE estimates that around
                <strong> 13,000 people die each year</strong> as a result of occupational lung disease,
                making it one of the largest causes of work-related mortality. Occupational cancer,
                much of which is linked to substance exposure (including dusts, fumes, and chemical
                agents), accounts for an estimated 8,000 new cancer registrations annually.
              </p>

              <p>
                Skin disease is the <strong>second most common</strong> form of occupational ill health
                after musculoskeletal disorders. Around <strong>12,000 new cases</strong> of work-related
                skin disease are reported each year, with contact dermatitis being by far the most
                prevalent condition. Dermatitis caused by workplace substances can end careers &mdash;
                once sensitised to a substance, a worker may never be able to work with it again, and
                the condition may persist for life.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Construction &amp; Electrical Trades: Heightened Risk</p>
                </div>
                <p className="text-sm text-white/80">
                  The construction industry, which includes electrical installation and maintenance work,
                  is one of the sectors most heavily affected by occupational ill health from hazardous
                  substances. Construction workers are exposed to silica dust, cement dust, wood dust,
                  solvents, diesel exhaust, welding fumes, epoxy resins, and numerous other hazardous
                  substances on a daily basis. Electricians face specific risks from PVC fumes, cable
                  dust, flux, solder fumes, solvent-based adhesives, and the respirable dust created
                  by chasing walls and drilling through concrete and brick.
                </p>
              </div>

              <p>
                The long latency period of many occupational diseases is a critical factor. Occupational
                lung cancer may take 20 to 40 years to develop after initial exposure. Silicosis can
                develop over 10 to 20 years of cumulative dust exposure. Even occupational asthma, which
                can develop more rapidly, may not present until months or years after first contact with
                a sensitising agent. This means that the harm caused by today&rsquo;s poor practices may
                not become apparent for decades &mdash; by which time it is too late to reverse.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Hidden Cost</p>
                <p className="text-sm text-white/80">
                  Beyond the human tragedy, occupational ill health from hazardous substances costs the
                  UK economy an estimated <strong>&pound;1.6 billion per year</strong> in lost working
                  days, medical treatment, and compensation. For individual businesses, a single case
                  of occupational disease can result in HSE enforcement action, unlimited fines, personal
                  liability for directors, and reputational damage. For the individual worker, it can
                  mean a lifetime of chronic illness, loss of livelihood, and premature death.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Hazardous Substances in the Electrical Trade      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">05</span>
            Hazardous Substances in the Electrical Trade
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many electricians are surprised to learn just how many hazardous substances they come
                into contact with during routine work. COSHH is not just for chemical factories and
                laboratories &mdash; it applies directly to the day-to-day activities of every
                electrical contractor, whether working on a large commercial installation or a simple
                domestic rewire.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Beaker className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Common Hazardous Substances in Electrical Work</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">PVC Solvent Cement &amp; Adhesives</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Used to join PVC conduit and trunking. Contains volatile organic compounds (VOCs)
                      such as tetrahydrofuran (THF) and methyl ethyl ketone (MEK). Inhalation of vapours
                      can cause dizziness, headaches, nausea, and irritation to the respiratory tract.
                      Prolonged exposure may damage the liver and kidneys. These substances are also highly
                      flammable.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Solder &amp; Flux Fumes</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Soldering produces a complex mixture of fumes, including colophony (rosin) fume from
                      flux-cored solder. Colophony fume is a well-known respiratory sensitiser and one of
                      the most common causes of occupational asthma in the UK. Once sensitised, even tiny
                      exposures can trigger severe asthma attacks. Lead-free solders still produce
                      hazardous flux fumes.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Respirable Silica Dust (RCS)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Generated when chasing walls, drilling into concrete, brick, or block, or cutting
                      paving slabs. Respirable crystalline silica (RCS) is classified as a carcinogen
                      and causes silicosis, a serious and irreversible lung disease. The WEL for RCS
                      is 0.1 mg/m&sup3; &mdash; an extremely low level that is easily exceeded during
                      uncontrolled chasing or cutting.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">PVC Fumes (from Cutting &amp; Burning)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      When PVC cable insulation, trunking, or conduit is cut with hot-wire cutters or
                      exposed to fire, it releases hydrogen chloride (HCl) gas, dioxins, and furans.
                      Hydrogen chloride is a severe respiratory irritant. Even low concentrations can
                      cause coughing, choking, and inflammation of the airways. Cable burning to recover
                      copper is illegal and extremely hazardous.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Cement &amp; Concrete Dust</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Cement dust is alkaline and irritant. Wet cement can cause serious chemical burns
                      to the skin (cement burns) due to its high pH. Inhaling cement dust causes
                      irritation to the nose, throat, and lungs. Chromium VI compounds in cement are
                      also skin sensitisers and carcinogens.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Cleaning Agents &amp; Degreasers</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Contact cleaner sprays, switch cleaners, degreasers, and general cleaning chemicals
                      often contain solvents, surfactants, and other hazardous substances. Prolonged or
                      repeated skin contact can cause dermatitis. Inhalation of aerosol sprays in
                      confined spaces can be particularly hazardous.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Expanding Foam (Isocyanates)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Polyurethane expanding foam, commonly used to seal cable entries, contains
                      isocyanates &mdash; powerful respiratory sensitisers. Even brief inhalation can
                      trigger occupational asthma in susceptible individuals. Isocyanates are one of the
                      leading causes of occupational asthma in the UK.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Mineral Insulation Material (Loft Work)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Glass fibre and mineral wool used for loft insulation cause skin irritation, eye
                      irritation, and upper respiratory tract irritation. While not as dangerous as
                      asbestos, repeated exposure to fibrous insulation materials without adequate PPE
                      can cause significant discomfort and occupational dermatitis.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The key message is that hazardous substances are an <strong>everyday part of electrical
                work</strong>. They are not limited to unusual or specialist tasks. Routine activities
                &mdash; chasing a wall, soldering a joint, using PVC cement, spraying contact cleaner,
                or drilling through concrete &mdash; all generate or involve substances that fall within
                the scope of COSHH. Every electrician, from first-year apprentice to experienced
                supervisor, needs to understand what these substances are, how they can harm you, and
                what controls are required.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">On-Site Reality:</strong> A 2019 HSE inspection
                  initiative targeting construction dust found that more than <strong>40% of sites
                  visited</strong> were failing to adequately control dust exposure. Common failings
                  included no water suppression on cutting tools, no local exhaust ventilation, workers
                  not wearing RPE (respiratory protective equipment), and poor housekeeping allowing
                  dust to accumulate and become re-airborne. Electrical contractors were among those
                  cited for poor compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 06: The 8 COSHH Essentials Steps                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">06</span>
            The 8 COSHH Essentials Steps
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HSE has developed a practical, step-by-step framework known as the
                <strong> &ldquo;8 essentials&rdquo;</strong> for managing hazardous substances under
                COSHH. These eight steps provide a structured approach that any employer, from a
                sole-trader electrician to a large contracting company, can follow to achieve
                compliance with the regulations. Each step will be explored in detail in later
                sections of this course &mdash; this is an introductory overview.
              </p>

              {/* 8 Steps Overview Diagram */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400 text-center flex-1">The 8 COSHH Essentials Steps</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-white">Assess the Risks</p>
                      <p className="text-xs text-white/70">Identify hazardous substances, who is at risk, and how exposure could occur.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-white">Decide What Precautions Are Needed</p>
                      <p className="text-xs text-white/70">Determine the appropriate control measures based on the assessment.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-white">Prevent or Adequately Control Exposure</p>
                      <p className="text-xs text-white/70">Implement controls following the hierarchy: elimination, substitution, engineering, admin, PPE.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-white">Ensure Controls Are Used &amp; Maintained</p>
                      <p className="text-xs text-white/70">Check controls are working properly and are being used correctly by all workers.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-sm font-medium text-white">Monitor Exposure</p>
                      <p className="text-xs text-white/70">Where required, carry out workplace monitoring to check exposure levels are within WELs.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-sm font-medium text-white">Carry Out Health Surveillance</p>
                      <p className="text-xs text-white/70">Where risk assessment identifies a need, provide appropriate health monitoring for workers.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex-shrink-0">7</span>
                    <div>
                      <p className="text-sm font-medium text-white">Prepare for Accidents &amp; Emergencies</p>
                      <p className="text-xs text-white/70">Have plans and procedures in place for spills, leaks, accidental releases, and overexposures.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold flex-shrink-0">8</span>
                    <div>
                      <p className="text-sm font-medium text-white">Ensure Employees Are Informed &amp; Trained</p>
                      <p className="text-xs text-white/70">Provide suitable information, instruction, and training about substances and controls.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The eight steps are sequential and logical. You must <strong>assess the risks</strong>
                (step 1) before you can decide on precautions (step 2). You must decide on precautions
                before you can implement and maintain controls (steps 3 and 4). Monitoring and health
                surveillance (steps 5 and 6) verify that your controls are working. Emergency
                preparedness (step 7) ensures you can respond if something goes wrong. And training
                (step 8) ensures that everyone understands what they need to do and why.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Hierarchy of Control</p>
                <p className="text-sm text-white/80 mb-3">
                  Central to COSHH compliance is the <strong>hierarchy of control measures</strong>,
                  which applies at step 3. The hierarchy requires employers to consider controls in
                  the following order of preference:
                </p>
                <ol className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">1</span>
                    <span><strong className="text-white">Elimination</strong> &mdash; remove the hazardous substance from the process entirely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">2</span>
                    <span><strong className="text-white">Substitution</strong> &mdash; replace with a less hazardous substance or process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">3</span>
                    <span><strong className="text-white">Engineering controls</strong> &mdash; enclose the process, use local exhaust ventilation (LEV), or use water suppression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">4</span>
                    <span><strong className="text-white">Administrative controls</strong> &mdash; safe systems of work, training, signage, restricted access, job rotation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">5</span>
                    <span><strong className="text-white">Personal protective equipment (PPE)</strong> &mdash; the last resort, used when other controls cannot reduce exposure to an adequate level</span>
                  </li>
                </ol>
              </div>

              <p>
                PPE (such as gloves, goggles, and respiratory protective equipment) should always be
                considered the <strong>last line of defence</strong>, not the first. Too many
                workplaces hand out dust masks and consider the job done &mdash; this is not COSHH
                compliance. The regulations specifically require employers to explore higher-order
                controls (elimination, substitution, engineering) before resorting to PPE. PPE only
                protects the individual wearing it, only for as long as it is worn correctly, and
                only if it is the right type and properly fitted.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 07: Related Legislation                              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">07</span>
            Related Legislation
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                COSHH does not operate in isolation. It is part of a wider framework of health and
                safety legislation in the UK, and several other pieces of law work alongside COSHH
                to create a comprehensive system for protecting workers from hazardous substances.
                Understanding how these fit together is important for full compliance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Key Related Legislation</p>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">Health and Safety at Work etc. Act 1974 (HASAWA)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      The <strong>&ldquo;parent Act&rdquo;</strong> of UK health and safety law. HASAWA
                      provides the overarching framework under which COSHH and most other health and
                      safety regulations are made. Section 2 places a general duty on employers to ensure,
                      so far as is reasonably practicable, the health, safety, and welfare of their
                      employees. Section 3 extends this duty to non-employees who may be affected by the
                      employer&rsquo;s undertaking. Section 7 places duties on employees to take reasonable
                      care and co-operate with their employer. HASAWA is criminal law &mdash; breaches
                      can result in unlimited fines and imprisonment.
                    </p>
                  </div>
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">Management of Health and Safety at Work Regulations 1999</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      These regulations require employers to carry out <strong>suitable and sufficient
                      risk assessments</strong> covering all workplace hazards (not just substances).
                      They also require employers to appoint competent persons, establish procedures for
                      serious and imminent danger, provide health surveillance, and co-operate with other
                      employers sharing a workplace. COSHH assessments are a specific, detailed part of
                      the broader risk assessment duty under these regulations.
                    </p>
                  </div>
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      DSEAR deals with the <strong>fire and explosion risks</strong> posed by dangerous
                      substances, rather than the health risks. Many substances are covered by both COSHH
                      (for health risks) and DSEAR (for fire/explosion risks). For example, a solvent used
                      for cable jointing is a health hazard (toxic vapours) under COSHH and a fire hazard
                      (flammable) under DSEAR. Both sets of regulations must be complied with simultaneously.
                    </p>
                  </div>
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">CLP Regulation (Classification, Labelling and Packaging)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Originally EU Regulation (EC) No 1272/2008, now retained in UK law. The CLP
                      Regulation governs how hazardous substances and mixtures are <strong>classified
                      and labelled</strong>. It introduced the Globally Harmonised System (GHS) hazard
                      pictograms (the red-bordered diamond symbols you see on chemical containers). COSHH
                      references CLP classifications to determine which substances are &ldquo;hazardous
                      to health&rdquo;. Understanding CLP labels and safety data sheets (SDS) is essential
                      for carrying out COSHH assessments.
                    </p>
                  </div>
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">Control of Asbestos Regulations 2012 (CAR 2012)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      CAR 2012 provides the specific regulatory framework for managing asbestos in
                      workplaces. Although asbestos is a substance hazardous to health, it is
                      <strong> excluded from COSHH</strong> because its extreme danger warrants dedicated,
                      more stringent regulations. CAR 2012 includes the duty to manage asbestos in
                      non-domestic premises (Regulation 4), requirements for licensed removal work,
                      and mandatory training for all workers who may encounter asbestos.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Control of Lead at Work Regulations 2002 (CLAW 2002)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      CLAW 2002 provides specific requirements for protecting workers from exposure to
                      lead. Like asbestos, lead is <strong>excluded from COSHH</strong> because it has
                      its own dedicated regulations. Electricians may encounter lead in older
                      lead-sheathed cables, lead-based solder (still found in older installations), and
                      lead paint in pre-1980s buildings. CLAW 2002 sets action levels and suspension
                      levels for blood-lead concentrations and requires biological monitoring for workers
                      exposed above certain thresholds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">In Practice:</strong> On a typical construction
                  site, multiple pieces of legislation will apply simultaneously. An electrician chasing
                  a cable route through a concrete wall is subject to COSHH (silica dust exposure), the
                  Management Regulations 1999 (general risk assessment), the Construction (Design and
                  Management) Regulations 2015 (construction-specific duties), the Provision and Use of
                  Work Equipment Regulations 1998 (the chasing tool), and the Personal Protective
                  Equipment at Work Regulations 1992 (RPE and other PPE). Effective health and safety
                  management requires awareness of all applicable legislation, not just COSHH in isolation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Employer & Employee Duties                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">08</span>
            Employer &amp; Employee Duties
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                COSHH places specific legal duties on both employers and employees. Understanding
                these duties is essential because non-compliance can result in enforcement action
                by the HSE, including improvement notices, prohibition notices, unlimited fines,
                and (for serious breaches) criminal prosecution and imprisonment.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-4">Employer Duties Under COSHH</p>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Regulation 6 &mdash; Assessment</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Carry out a suitable and sufficient assessment of the risks to health from
                      hazardous substances. The assessment must identify what substances are present,
                      how workers may be exposed, the nature of that exposure (route, duration, frequency,
                      level), and the control measures needed. Assessments must be recorded (where 5+
                      employees) and reviewed regularly or when circumstances change.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Regulation 7 &mdash; Prevention or Control of Exposure</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The primary duty. Employers must <strong>prevent exposure</strong> to substances
                      hazardous to health or, where prevention is not reasonably practicable,
                      <strong> adequately control</strong> exposure. Where a substance is a carcinogen
                      or mutagen, or causes occupational asthma, the duty is stronger &mdash; exposure
                      must be reduced to as low a level as is reasonably practicable. Control measures
                      must follow the hierarchy of controls.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Regulation 8 &mdash; Use of Control Measures</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Employers must take all reasonable steps to ensure that control measures,
                      including PPE, are properly used. They must also provide suitable information,
                      instruction, and training so that workers understand how to use controls correctly.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Regulation 9 &mdash; Maintenance of Controls</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      All control measures must be maintained in efficient working order, in good repair,
                      and in a clean condition. Local exhaust ventilation (LEV) must be thoroughly examined
                      and tested at least every 14 months (or more frequently for certain processes).
                      RPE must be examined, tested, and maintained in accordance with the manufacturer&rsquo;s
                      instructions.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Regulation 10 &mdash; Monitoring Exposure</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Where the risk assessment identifies a need, employers must monitor exposure at the
                      workplace to ensure that WELs are not exceeded and that controls are effective.
                      Monitoring records must be kept for at least 5 years (or 40 years for identifiable
                      personal exposure records).
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Regulation 11 &mdash; Health Surveillance</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Where workers are exposed to substances that have identifiable diseases or adverse
                      health effects linked to exposure, and there is a valid technique for detecting
                      those effects, employers must provide health surveillance. Examples include lung
                      function testing for workers exposed to respiratory sensitisers and skin checks
                      for workers exposed to skin sensitisers.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Regulation 12 &mdash; Information, Instruction &amp; Training</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Employers must provide employees with suitable and sufficient information,
                      instruction, and training about the hazardous substances they may be exposed to,
                      the risks to health, the control measures in place, and the results of monitoring
                      and health surveillance. Training must be provided before first exposure and
                      repeated at appropriate intervals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg mt-4">
                <p className="text-sm font-medium text-white mb-4">Employee Duties Under COSHH</p>
                <p className="text-sm text-white/80 mb-3">
                  COSHH Regulation 8(2) places specific duties on employees. These complement the
                  general employee duties under HASAWA Section 7 and the Management Regulations.
                  As an employee, you must:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Use control measures properly</strong> &mdash;
                      this includes using LEV, following safe systems of work, and applying all
                      engineering and administrative controls as instructed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Wear and use PPE correctly</strong> &mdash;
                      including gloves, goggles, RPE, and any other protective equipment provided.
                      PPE must be returned to the storage area provided after use and not taken away
                      from the workplace without authorisation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Report defects</strong> &mdash; if you discover any
                      defect in control measures, PPE, or any equipment provided for COSHH compliance,
                      you must report it to your employer immediately.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Report health concerns</strong> &mdash; if you
                      develop symptoms that may be related to substance exposure (e.g., skin rashes,
                      breathing difficulties, persistent cough), report them to your supervisor and
                      occupational health provider.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Attend health surveillance</strong> &mdash; where
                      your employer has arranged health surveillance, you must attend appointments as
                      required.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Co-operate with your employer</strong> &mdash;
                      this is a general duty under HASAWA Section 7 and the Management Regulations.
                      You must co-operate with your employer so far as is necessary to enable them to
                      comply with COSHH and other health and safety legislation.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Consequences of Non-Compliance</p>
                </div>
                <p className="text-sm text-white/80">
                  COSHH is criminal law. Breaches are prosecuted by the HSE or local authorities.
                  Under the Sentencing Council guidelines (in force since February 2016), fines for
                  health and safety offences are linked to the offender&rsquo;s turnover and the
                  seriousness of the offence. Large organisations have been fined millions of pounds
                  for COSHH failures. Individual directors and managers can face personal prosecution,
                  fines, and imprisonment of up to two years for offences committed with their
                  consent, connivance, or neglect. Employees who deliberately breach COSHH can also
                  be prosecuted under HASAWA Section 7 or Section 8.
                </p>
              </div>

              <p>
                The fundamental principle is one of <strong>shared responsibility</strong>. Employers
                have the primary duty to assess risks, implement controls, provide information and
                training, and monitor the effectiveness of those controls. Employees have a duty to
                use those controls properly, report problems, attend health surveillance, and
                co-operate with their employer. When both parties fulfil their duties, the system
                works. When either side fails, workers&rsquo; health is put at risk.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Key Takeaway:</strong> COSHH is not just your
                  employer&rsquo;s problem. As an electrician, you have a personal legal duty to use
                  the controls provided, wear your PPE properly, report defects and health concerns,
                  and attend health surveillance. Ignoring these duties does not just put your own
                  health at risk &mdash; it can also expose you to personal criminal liability.
                </p>
              </div>
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
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-1-section-2">
              Next: Identifying Hazardous Substances
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
