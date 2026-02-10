import { ArrowLeft, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "asbestos-ban-year",
    question:
      "In what year was asbestos fully banned in the United Kingdom?",
    options: [
      "1985 — after the first wave of asbestos-related deaths were reported",
      "1992 — when the first Control of Asbestos Regulations were introduced",
      "1999 — when all forms of asbestos were prohibited in the UK",
      "2006 — when the Health and Safety Executive updated its guidance",
    ],
    correctIndex: 2,
    explanation:
      "Asbestos was fully banned in the UK in 1999. Blue (crocidolite) and brown (amosite) asbestos were banned in 1985, but white (chrysotile) asbestos continued to be used until 1999. Any building constructed or refurbished before 2000 may contain asbestos-containing materials (ACMs).",
  },
  {
    id: "duty-to-manage-regulation",
    question:
      "Under the Control of Asbestos Regulations 2012, which regulation places a 'duty to manage' asbestos in non-domestic premises?",
    options: [
      "Regulation 2 — interpretation and definitions of asbestos types",
      "Regulation 4 — the duty to manage asbestos in non-domestic premises",
      "Regulation 10 — information, instruction, and training for employees",
      "Regulation 17 — arrangements for dealing with accidents and emergencies",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 4 of the Control of Asbestos Regulations 2012 places a duty on the person responsible for maintaining or repairing non-domestic premises (the 'duty holder') to manage the risk from asbestos. This includes finding ACMs, assessing their condition, creating a management plan, maintaining an asbestos register, and informing anyone who might work on or disturb ACMs.",
  },
  {
    id: "find-suspected-acm",
    question:
      "You are running cables in a ceiling void and discover a material you suspect may contain asbestos. What should you do FIRST?",
    options: [
      "Put on an FFP3 mask and continue the cable run, avoiding the suspect material",
      "Take a small sample and send it for laboratory analysis so you know for certain",
      "STOP work immediately, do NOT disturb the material, and leave the area",
      "Spray the material with water to suppress dust and finish the task quickly",
    ],
    correctIndex: 2,
    explanation:
      "If you discover suspected asbestos-containing material, you must STOP work immediately. Do NOT attempt to disturb, sample, or remove the material yourself. Leave the area, restrict access, and report to your supervisor or the duty holder. The material must be assumed to contain asbestos until proven otherwise by a competent analyst.",
  },
];

const faqs = [
  {
    question:
      "I'm an electrician — why do I need to know about asbestos?",
    answer:
      "Electricians are one of the groups most at risk of accidental asbestos exposure. You regularly work in ceiling voids, risers, plant rooms, switch rooms, and behind panels — all common locations for asbestos-containing materials. You may encounter asbestos in fuse box backings, consumer unit enclosures, cable routes through asbestos insulating board, textured coatings (Artex) on ceilings and walls, floor tiles you need to lift, and pipe lagging adjacent to cable runs. If you disturb these materials without knowing what they are, you could inhale asbestos fibres. Even a single episode of significant exposure can lead to fatal disease decades later. Asbestos awareness training helps you recognise suspect materials, avoid disturbing them, and take the correct action.",
  },
  {
    question:
      "Can I tell whether a material contains asbestos just by looking at it?",
    answer:
      "No. You cannot reliably identify asbestos by visual inspection alone. Asbestos was mixed into hundreds of different products and its fibres are microscopic — invisible to the naked eye. Some materials, like sprayed coatings on structural steelwork or pipe lagging, are commonly associated with asbestos, but even experienced professionals cannot confirm the presence of asbestos without laboratory analysis. The only way to confirm whether a material contains asbestos is to have a sample taken by a competent person and analysed by a UKAS-accredited laboratory. Until analysis confirms otherwise, you must always assume a suspect material contains asbestos.",
  },
  {
    question:
      "What is the difference between a management survey and a refurbishment/demolition survey?",
    answer:
      "A management survey is the standard survey carried out to locate ACMs that could be disturbed during normal occupancy, including routine maintenance and simple repair work. It involves sampling materials that are reasonably accessible without destructive inspection. A refurbishment and demolition (R&D) survey is required before any refurbishment, upgrade, or demolition work. It is more intrusive — the surveyor may need to access areas behind walls, above ceilings, beneath floors, and inside ducts. The purpose is to find ALL asbestos in the area where work will take place, even if it is hidden. As an electrician, if you are rewiring or carrying out significant work in an older building, a refurbishment survey should have been done for your work area before you start. Always check which type of survey has been carried out and confirm that it covers your specific work locations.",
  },
  {
    question:
      "Is it true that asbestos is only dangerous if it's disturbed?",
    answer:
      "Asbestos-containing materials that are in good condition and left undisturbed generally present a very low risk. The danger arises when ACMs are damaged, deteriorating, or disturbed — because this releases microscopic fibres into the air that can be inhaled. However, 'good condition' can change over time due to weathering, vibration, water damage, or accidental impact. This is why the duty to manage under Regulation 4 requires ongoing monitoring and reassessment. For trades workers like electricians, the critical point is that your work can easily disturb ACMs even if you do not intend to — drilling through an asbestos insulating board, pulling cables past lagged pipes, or lifting asbestos-containing floor tiles all release fibres. The material does not need to be visibly damaged to be a hazard during your work.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT one of the three main types of asbestos?",
    options: [
      "Chrysotile (white asbestos)",
      "Amosite (brown asbestos)",
      "Vermiculite (grey asbestos)",
      "Crocidolite (blue asbestos)",
    ],
    correctAnswer: 2,
    explanation:
      "The three main types of asbestos are chrysotile (white), amosite (brown), and crocidolite (blue). Vermiculite is a different mineral altogether, although some vermiculite deposits were contaminated with asbestos. There is no such thing as 'grey asbestos' as a recognised type.",
  },
  {
    id: 2,
    question:
      "Approximately how many asbestos-related deaths occur per year in the United Kingdom?",
    options: [
      "Around 500",
      "Around 2,000",
      "Around 5,000",
      "Around 10,000",
    ],
    correctAnswer: 2,
    explanation:
      "There are approximately 5,000 asbestos-related deaths per year in the UK. This includes around 2,500 deaths from mesothelioma and a similar number from asbestos-related lung cancer and asbestosis. Asbestos remains the single greatest cause of work-related deaths in the UK.",
  },
  {
    id: 3,
    question:
      "Which of the following diseases is ONLY caused by asbestos exposure?",
    options: [
      "Lung cancer",
      "Chronic obstructive pulmonary disease (COPD)",
      "Mesothelioma",
      "Pneumonia",
    ],
    correctAnswer: 2,
    explanation:
      "Mesothelioma is a cancer of the lining of the lungs (pleura) or abdomen (peritoneum) that is almost exclusively caused by asbestos exposure. Lung cancer can be caused by asbestos but also by smoking and other factors. COPD and pneumonia are not caused by asbestos exposure.",
  },
  {
    id: 4,
    question:
      "As an electrician, which of the following locations is LEAST likely to contain asbestos in a pre-2000 building?",
    options: [
      "Fuse box and consumer unit backings",
      "Textured ceiling coatings (Artex)",
      "Modern PVC trunking installed in 2020",
      "Floor tiles beneath a cable route",
    ],
    correctAnswer: 2,
    explanation:
      "Modern PVC trunking installed in 2020 would not contain asbestos because asbestos has been banned in the UK since 1999. Fuse box backings, textured coatings (Artex), and floor tiles in pre-2000 buildings could all contain asbestos and must be treated with caution.",
  },
  {
    id: 5,
    question:
      "Under Regulation 4 of the Control of Asbestos Regulations 2012, the duty holder must do all of the following EXCEPT:",
    options: [
      "Find or presume the location of asbestos-containing materials",
      "Assess the condition of any ACMs found and record them in a register",
      "Personally remove all ACMs from the premises within 12 months",
      "Inform anyone who might work on or disturb ACMs about their location and condition",
    ],
    correctAnswer: 2,
    explanation:
      "The duty to manage does NOT require the duty holder to remove all ACMs. In many cases, asbestos in good condition is safer left in place and managed rather than disturbed through removal. The duty holder must find ACMs, assess their condition, create a management plan, maintain a register, and inform workers — but removal is only required when ACMs are damaged, deteriorating, or likely to be disturbed by planned work.",
  },
  {
    id: 6,
    question:
      "What is the typical latency period between asbestos exposure and the development of asbestos-related disease?",
    options: [
      "1 to 5 years",
      "5 to 10 years",
      "15 to 60 years",
      "Over 100 years",
    ],
    correctAnswer: 2,
    explanation:
      "Asbestos-related diseases have a very long latency period — typically between 15 and 60 years from the time of exposure. This means that a worker exposed to asbestos today may not develop symptoms until decades later. Mesothelioma, for example, is typically diagnosed 30 to 40 years after initial exposure. This long latency period is one of the reasons why asbestos-related deaths continue to be so high despite the 1999 ban.",
  },
  {
    id: 7,
    question:
      "Which category of asbestos work requires an HSE-licensed contractor?",
    options: [
      "Removing a single asbestos cement roof sheet in good condition",
      "Removing asbestos insulation (lagging) from pipework",
      "Painting over asbestos insulating board in good condition",
      "Cleaning up small amounts of loose asbestos-containing debris",
    ],
    correctAnswer: 1,
    explanation:
      "Removing asbestos insulation (lagging) from pipework is licensed work that must be carried out by an HSE-licensed contractor. Asbestos insulation, sprayed coatings, and lagging are the highest-risk ACMs and their removal always requires a licence. Removing a single asbestos cement sheet in good condition is typically non-licensed work. Painting over AIB in good condition may be non-licensed, and cleaning up small amounts of debris may be NNLW depending on the circumstances.",
  },
  {
    id: 8,
    question:
      "Before starting electrical work in a pre-2000 building, what should you ALWAYS check first?",
    options: [
      "Whether the building has a valid Electrical Installation Condition Report",
      "Whether the building's asbestos register has been checked for your work area",
      "Whether the building has a current fire risk assessment on display",
      "Whether the building's energy performance certificate is up to date",
    ],
    correctAnswer: 1,
    explanation:
      "Before starting any work in a building that may contain asbestos — particularly pre-2000 buildings — you must always check the asbestos register for your specific work area. The register will tell you the known locations and condition of ACMs. If the register does not cover your work area, or if no register exists, you must raise this with the duty holder before starting work. Never assume an area is free of asbestos just because it looks modern or has been recently decorated.",
  },
];

const CscsCardModule4Section2 = () => {
  useSEO({
    title: "Asbestos Awareness | CSCS Card Module 4.2",
    description:
      "Learn about asbestos types, health effects, where asbestos is found, the duty to manage, what to do if you find suspected ACMs, licensed vs non-licensed work, and training requirements for the CSCS HS&E test.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 mb-4">
            <ShieldAlert className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-block bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-green-400">MODULE 4</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Asbestos Awareness
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding asbestos types, health risks, where it is found on
            construction sites, the legal duty to manage, and the correct actions
            to take when you encounter suspected asbestos-containing materials
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-green-500/5 border-l-2 border-green-500/50">
            <p className="font-semibold text-green-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Three types:</strong> chrysotile
                  (white), amosite (brown), crocidolite (blue)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Banned:</strong> fully
                  prohibited in the UK since 1999 — still present in older
                  buildings
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Fatal diseases:</strong>{" "}
                  mesothelioma, asbestosis, lung cancer — no safe exposure level
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">~5,000 deaths/year:</strong>{" "}
                  asbestos is the biggest cause of work-related death in the UK
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-green-500/5 border-l-2 border-green-500/50">
            <p className="font-semibold text-green-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Check the register:</strong>{" "}
                  always check the asbestos register before starting work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">If in doubt:</strong> STOP
                  work, do NOT disturb, leave the area, report immediately
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Assume the worst:</strong>{" "}
                  treat suspect material as asbestos until confirmed otherwise
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Never remove:</strong> only
                  licensed or trained contractors may remove ACMs
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Identify the three main types of asbestos and explain why asbestos was used so widely in construction",
              "Describe the serious health effects of asbestos exposure, including mesothelioma, asbestosis, and lung cancer",
              "Recognise common locations where asbestos-containing materials may be found, particularly in electrical installations",
              "Explain the duty to manage asbestos under Regulation 4 of the Control of Asbestos Regulations 2012",
              "State the correct actions to take if you discover suspected asbestos-containing materials during work",
              "Distinguish between licensed, non-licensed, and notifiable non-licensed asbestos work",
              "Describe the risk assessment and safe working practices required before work near ACMs",
              "Identify the training requirements for workers who may encounter or disturb asbestos",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is Asbestos? */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">01</span>
              What Is Asbestos?
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Asbestos</strong> is a naturally
                occurring mineral fibre that was extensively used in the
                construction industry from the 1950s through to 1999. Valued for
                its exceptional resistance to heat, fire, chemicals, and
                electrical current, asbestos was incorporated into thousands of
                building products. It was cheap, readily available, and
                extraordinarily versatile — which made it one of the most widely
                used construction materials of the twentieth century.
              </p>

              <p>
                Asbestos was used in roofing, insulation, flooring, wall
                coatings, pipe lagging, gaskets, electrical components, and many
                other applications. It is estimated that asbestos can be found in
                approximately{" "}
                <strong className="text-white">
                  500,000 non-domestic buildings
                </strong>{" "}
                and millions of domestic properties across the UK. Any building
                constructed or refurbished before{" "}
                <strong className="text-white">2000</strong> may contain
                asbestos-containing materials (ACMs).
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  Key Dates
                </h3>
                <ul className="text-white/80 text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">1985:</strong> Blue
                      (crocidolite) and brown (amosite) asbestos banned in the
                      UK
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">1999:</strong> White
                      (chrysotile) asbestos banned — completing the full ban on
                      all forms of asbestos in the UK
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">2012:</strong> Current
                      legislation — the Control of Asbestos Regulations 2012
                      (CAR 2012) came into force
                    </span>
                  </li>
                </ul>
              </div>

              {/* Asbestos Fibre Types Diagram */}
              <div className="my-6">
                <h3 className="text-green-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Asbestos Fibre Types
                </h3>
                <div className="space-y-3">
                  {/* Chrysotile */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-200/10 border border-gray-300/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-300 text-xs font-bold">
                          WHITE
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-1">
                          Chrysotile (White Asbestos)
                        </p>
                        <ul className="text-white/60 text-sm space-y-1">
                          <li className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                            <span>
                              Most commonly used type — accounts for approximately
                              90% of asbestos used worldwide
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                            <span>
                              Curly, serpentine fibres — found in cement products,
                              textured coatings, floor tiles, roofing materials
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                            <span>
                              Banned in the UK in 1999 — the last type to be
                              prohibited
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Amosite */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-amber-800/20 border border-amber-600/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-400 text-xs font-bold">
                          BROWN
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-1">
                          Amosite (Brown Asbestos)
                        </p>
                        <ul className="text-white/60 text-sm space-y-1">
                          <li className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                            <span>
                              Second most commonly used type — straight, needle-like
                              fibres
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                            <span>
                              Commonly found in insulation boards (AIB), ceiling
                              tiles, thermal insulation, and pipe lagging
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                            <span>
                              More hazardous than chrysotile — banned in the UK
                              in 1985
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Crocidolite */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-800/20 border border-blue-600/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 text-xs font-bold">
                          BLUE
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-1">
                          Crocidolite (Blue Asbestos)
                        </p>
                        <ul className="text-white/60 text-sm space-y-1">
                          <li className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                            <span>
                              The most hazardous type — very fine, sharp,
                              needle-like fibres that penetrate deep into lung
                              tissue
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                            <span>
                              Found in sprayed coatings, pipe insulation, and
                              some cement products
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                            <span>
                              Banned in the UK in 1985 alongside amosite —
                              particularly associated with mesothelioma
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-300 text-xs sm:text-sm font-medium">
                    All three types of asbestos are{" "}
                    <strong className="text-white">equally dangerous</strong>{" "}
                    in practice. There is no safe type of asbestos and no safe
                    level of exposure. Never assume that white asbestos is
                    &ldquo;less harmful&rdquo; — any asbestos fibre inhaled into
                    the lungs can cause fatal disease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Health Effects */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">02</span>
              Health Effects
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Asbestos exposure causes a range of serious and often fatal
                diseases. There is{" "}
                <strong className="text-white">no safe level of exposure</strong>{" "}
                — even brief, low-level exposure can lead to disease. The health
                effects of asbestos are made particularly devastating by the
                extremely long{" "}
                <strong className="text-white">latency period</strong> — the
                time between exposure and the appearance of symptoms. This period
                is typically{" "}
                <strong className="text-white">15 to 60 years</strong>, meaning
                that workers exposed today may not become ill until decades
                later.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Approximately 5,000 Asbestos-Related Deaths Per Year in the
                    UK
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Asbestos is the{" "}
                  <strong className="text-white">
                    single greatest cause of work-related death
                  </strong>{" "}
                  in the United Kingdom. Around 2,500 people die from
                  mesothelioma each year, with a similar number dying from
                  asbestos-related lung cancer and asbestosis. More people die
                  from asbestos-related diseases each year than in road traffic
                  accidents.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">
                  Asbestos-Related Diseases
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Mesothelioma</p>
                      <p className="text-white/60">
                        A cancer of the lining of the lungs (pleura) or abdomen
                        (peritoneum). Almost exclusively caused by asbestos
                        exposure. Always fatal — there is no cure. Median
                        survival time from diagnosis is 12 to 18 months. Can
                        result from relatively low levels of exposure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Asbestosis</p>
                      <p className="text-white/60">
                        A chronic, progressive fibrosis (scarring) of the lung
                        tissue caused by prolonged inhalation of asbestos fibres.
                        Causes increasing breathlessness, coughing, and chest
                        pain. Eventually leads to severe disability and can be
                        fatal. Usually the result of heavy, prolonged exposure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Asbestos-Related Lung Cancer
                      </p>
                      <p className="text-white/60">
                        Asbestos exposure significantly increases the risk of
                        developing lung cancer. The risk is multiplied if the
                        worker also smokes — a smoker exposed to asbestos has a
                        dramatically higher risk than either factor alone.
                        Asbestos-related lung cancer is indistinguishable from
                        lung cancer caused by other factors.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-300 text-xs font-bold">
                        4
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Pleural Thickening
                      </p>
                      <p className="text-white/60">
                        Scarring and thickening of the membrane that surrounds
                        the lungs (pleura). Causes the lungs to become
                        restricted, leading to breathlessness and chest
                        discomfort. Can be debilitating but is not usually fatal
                        on its own.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-300 text-xs font-bold">
                        5
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Pleural Plaques</p>
                      <p className="text-white/60">
                        Localised areas of scarring on the pleura. Generally
                        symptom-free and not life-threatening, but they are
                        evidence that asbestos exposure has occurred and indicate
                        that more serious disease could develop in the future.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    Long Latency Period
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  The latency period for asbestos-related diseases is typically{" "}
                  <strong className="text-white">15 to 60 years</strong>.
                  Mesothelioma is usually diagnosed 30 to 40 years after initial
                  exposure. This means that many of the people dying from
                  asbestos-related diseases today were exposed in the 1970s and
                  1980s — and that anyone exposed now may not develop symptoms
                  until the 2050s or beyond. There are no early warning signs
                  and no screening test that can detect asbestos-related disease
                  before symptoms appear.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Where Asbestos Is Found */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">03</span>
              Where Asbestos Is Found
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Asbestos was used in an enormous range of building products. In a
                pre-2000 building, ACMs can be found almost anywhere — from the
                roof to the floor and everywhere in between. As an electrician,
                you are particularly at risk because your work takes you into
                ceiling voids, behind panels, under floors, and inside switch
                rooms where ACMs are commonly present.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">
                  Common Locations of ACMs in Buildings
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Textured coatings (Artex):
                      </strong>{" "}
                      widely applied to ceilings and walls — very common in
                      residential and commercial properties built before 2000.
                      Contains chrysotile (white asbestos)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Floor tiles:</strong>{" "}
                      thermoplastic floor tiles (especially 9-inch/228mm square
                      tiles) and the bitumen adhesive used to fix them frequently
                      contain asbestos
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Asbestos cement roof sheets:
                      </strong>{" "}
                      corrugated and flat sheets used on roofs, walls, and
                      outbuildings. Very common in industrial, agricultural, and
                      garage buildings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Asbestos insulating board (AIB):
                      </strong>{" "}
                      used for fire protection in ceiling tiles, partition walls,
                      column casings, soffits, and around structural steelwork.
                      Higher risk than cement products
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Pipe lagging:</strong>{" "}
                      thermal insulation on heating pipes, boilers, and ductwork.
                      Often contains amosite or crocidolite — high risk if
                      damaged or disturbed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Gaskets and rope seals:
                      </strong>{" "}
                      found in boilers, flue pipes, and heating equipment.
                      Braided asbestos rope was used as a seal in many
                      appliances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Flue pipes:</strong>{" "}
                      asbestos cement was commonly used for flue pipes serving
                      boilers and heating systems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Water tanks and cisterns:
                      </strong>{" "}
                      asbestos cement was used to manufacture cold water storage
                      tanks, particularly in domestic loft spaces
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Soffits and fascia boards:
                      </strong>{" "}
                      asbestos cement boards were widely used as soffits under
                      roof eaves and as fascia boards on the exterior of
                      buildings
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  Specific Risks for Electricians
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  As an electrician, you should be aware that asbestos was used
                  in many electrical components and in the areas where electrical
                  work is typically carried out:
                </p>
                <ul className="text-white/70 text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Fuse boxes and consumer units:
                      </strong>{" "}
                      older fuse boxes often have asbestos flash guards or
                      asbestos backing boards. Consumer units manufactured before
                      the mid-1980s may contain asbestos components
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Ceiling voids and risers:
                      </strong>{" "}
                      cable routes frequently pass through areas where ACMs are
                      present — including AIB panels, pipe lagging, and sprayed
                      coatings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Heater storage cupboards:
                      </strong>{" "}
                      asbestos insulating board was commonly used to line storage
                      heater cupboards and immersion heater enclosures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Behind electrical accessories:
                      </strong>{" "}
                      asbestos-containing boards may be present behind sockets,
                      switches, and distribution boards mounted on walls
                      containing AIB
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Duty to Manage */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">04</span>
              The Duty to Manage
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Regulation 4</strong> of the
                Control of Asbestos Regulations 2012 places a{" "}
                <strong className="text-white">duty to manage</strong> asbestos
                in non-domestic premises. This regulation applies to the person
                who has responsibility for the maintenance or repair of the
                building — known as the{" "}
                <strong className="text-white">duty holder</strong>. In
                practice, this is usually the building owner, landlord, managing
                agent, or facilities manager.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  What the Duty Holder Must Do
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Find or presume ACMs
                      </p>
                      <p className="text-white/60">
                        Take reasonable steps to find out whether the building
                        contains asbestos-containing materials. This usually
                        means commissioning an asbestos management survey. If
                        materials cannot be accessed for sampling, they must be
                        presumed to contain asbestos.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Assess the condition of ACMs
                      </p>
                      <p className="text-white/60">
                        Determine the condition of each ACM — is it in good
                        condition, slightly damaged, or significantly damaged?
                        Assess the likelihood that it will be disturbed by normal
                        building activities or planned work.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Manage the risk
                      </p>
                      <p className="text-white/60">
                        Prepare a written management plan setting out how the
                        ACMs will be managed. This may involve leaving ACMs in
                        place and monitoring them, encapsulating or sealing them,
                        or arranging for removal by a competent contractor.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        4
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Maintain a register
                      </p>
                      <p className="text-white/60">
                        Create and maintain an asbestos register that records the
                        location, type, condition, and management action for
                        every ACM in the building. The register must be kept up
                        to date and readily available.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">
                        5
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Inform workers</p>
                      <p className="text-white/60">
                        Anyone who is likely to work on or disturb ACMs must be
                        informed of the location and condition of asbestos in
                        their work area. This includes maintenance workers,
                        contractors, electricians, plumbers, and any other trade
                        that may come into contact with ACMs.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    Your Right to Information
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  As a worker, you have the{" "}
                  <strong className="text-white">right to be informed</strong>{" "}
                  about the presence and location of asbestos in any building
                  where you are working. Before you start work, ask to see the
                  asbestos register and check whether there are any ACMs in or
                  near your work area. If no register exists, or if the register
                  does not cover your work area, raise this with the duty holder
                  or your supervisor before starting work.{" "}
                  <strong className="text-white">
                    Never start work without checking.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: What To Do If You Find Suspected ACMs */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">05</span>
              What To Do If You Find Suspected ACMs
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                If you discover a material during work that you suspect may
                contain asbestos, you must follow a strict sequence of actions.
                The overriding principle is simple:{" "}
                <strong className="text-white">
                  STOP, do not disturb, and report
                </strong>
                . Never attempt to remove, sample, or test suspected ACMs
                yourself. Always assume a suspect material contains asbestos
                until it has been confirmed safe by a competent analyst.
              </p>

              {/* What To Do If You Find Asbestos — Emergency Action Flowchart */}
              <div className="my-6">
                <h3 className="text-red-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  What To Do If You Find Asbestos
                </h3>

                <div className="space-y-2">
                  {/* Step 1: STOP */}
                  <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-500/30 border-2 border-red-400/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-red-300 text-sm font-bold">
                          1
                        </span>
                      </div>
                      <div>
                        <p className="text-red-300 font-bold text-sm sm:text-base">
                          STOP
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          Stop all work immediately. Put down your tools. Do not
                          continue with any task that could disturb the suspect
                          material.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-red-400/30"></div>
                  </div>

                  {/* Step 2: Don't Touch */}
                  <div className="bg-orange-500/15 border border-orange-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/30 border-2 border-orange-400/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-300 text-sm font-bold">
                          2
                        </span>
                      </div>
                      <div>
                        <p className="text-orange-300 font-bold text-sm sm:text-base">
                          DON'T TOUCH
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          Do NOT disturb, move, break, drill, cut, scrape, or
                          sample the material. Do not attempt to clean up any
                          dust or debris. Leave everything exactly as it is.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-orange-400/30"></div>
                  </div>

                  {/* Step 3: Leave Area */}
                  <div className="bg-yellow-500/15 border border-yellow-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/30 border-2 border-yellow-400/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-300 text-sm font-bold">
                          3
                        </span>
                      </div>
                      <div>
                        <p className="text-yellow-300 font-bold text-sm sm:text-base">
                          LEAVE THE AREA
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          Move away from the suspect material. Restrict access to
                          the area — prevent other workers and building occupants
                          from entering. Close doors if possible.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-yellow-400/30"></div>
                  </div>

                  {/* Step 4: Report */}
                  <div className="bg-blue-500/15 border border-blue-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/30 border-2 border-blue-400/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-300 text-sm font-bold">
                          4
                        </span>
                      </div>
                      <div>
                        <p className="text-blue-300 font-bold text-sm sm:text-base">
                          REPORT
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          Report immediately to your supervisor, site manager, or
                          the building's duty holder. Provide the location and
                          describe the material. Record what you found and when.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-blue-400/30"></div>
                  </div>

                  {/* Step 5: Wait */}
                  <div className="bg-green-500/15 border border-green-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/30 border-2 border-green-400/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 text-sm font-bold">
                          5
                        </span>
                      </div>
                      <div>
                        <p className="text-green-300 font-bold text-sm sm:text-base">
                          WAIT
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          Do NOT resume work until the material has been
                          identified by a competent person and, if it contains
                          asbestos, appropriate controls have been put in place.
                          The material is asbestos until proven otherwise.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 text-xs sm:text-sm font-medium">
                    This sequence applies{" "}
                    <strong className="text-white">every single time</strong>{" "}
                    you encounter a suspect material — whether it is the first
                    time or the hundredth. Never become complacent. The
                    consequences of getting it wrong are irreversible.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-2">
                  What NOT To Do
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Never try to remove ACMs yourself
                      </strong>{" "}
                      — even small amounts. Removal must be carried out by
                      trained or licensed contractors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Never take a sample yourself
                      </strong>{" "}
                      — sampling must be carried out by a competent person using
                      proper equipment and precautions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Never sweep or vacuum suspected asbestos debris
                      </strong>{" "}
                      — a standard vacuum cleaner will spread fibres into the
                      air. Only HEPA-filtered vacuums are suitable for asbestos
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Never ignore it and carry on
                      </strong>{" "}
                      — the fact that you cannot see the fibres does not mean
                      they are not being released into the air
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Licensed vs Non-Licensed Work */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">06</span>
              Licensed vs Non-Licensed Work
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Asbestos work is divided into three categories under the Control
                of Asbestos Regulations 2012. The category determines the level
                of training, equipment, notification, and supervision required.
                Understanding these categories is essential for identifying who
                is permitted to carry out different types of asbestos work.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  The Three Categories
                </h3>
                <div className="space-y-4 text-sm">
                  {/* Licensed Work */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-300 font-bold mb-1">
                      Licensed Work (Highest Risk)
                    </p>
                    <ul className="text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Must be carried out by an{" "}
                          <strong className="text-white">
                            HSE-licensed contractor
                          </strong>{" "}
                          — a company holding a current licence from the Health
                          and Safety Executive
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          The HSE must be{" "}
                          <strong className="text-white">notified</strong> at
                          least 14 days before the work starts
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Includes removal of asbestos insulation, asbestos
                          lagging, sprayed asbestos coatings, and asbestos
                          insulating board (AIB) where the risk assessment
                          indicates significant fibre release
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Requires full enclosure, negative pressure, air
                          monitoring, medical surveillance, and decontamination
                          units
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Notifiable Non-Licensed Work (NNLW) */}
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <p className="text-orange-300 font-bold mb-1">
                      Notifiable Non-Licensed Work (NNLW)
                    </p>
                    <ul className="text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          The <strong className="text-white">middle ground</strong>{" "}
                          — work that does not require a licence but has
                          additional requirements beyond standard non-licensed
                          work
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Must be{" "}
                          <strong className="text-white">
                            notified to the HSE
                          </strong>{" "}
                          before the work starts, and workers must be under
                          medical surveillance
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Examples include removal of AIB in certain
                          circumstances, and some maintenance work involving ACMs
                          where sporadic and low-intensity exposure thresholds
                          are exceeded
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Workers must hold appropriate{" "}
                          <strong className="text-white">
                            non-licensed asbestos training
                          </strong>{" "}
                          (Category B)
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Non-Licensed Work */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="text-green-300 font-bold mb-1">
                      Non-Licensed Work (Lower Risk)
                    </p>
                    <ul className="text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Work involving lower-risk ACMs where the exposure is{" "}
                          <strong className="text-white">
                            sporadic and of low intensity
                          </strong>{" "}
                          and the control limit is not expected to be exceeded
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Examples include removing asbestos cement sheets,
                          removing floor tiles, removing textured coatings in
                          small areas, and minor maintenance that may briefly
                          disturb ACMs
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Does not need an HSE licence or notification, but
                          workers must be{" "}
                          <strong className="text-white">
                            trained and competent
                          </strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          HSE Asbestos Essentials (HSG210) provides task sheets
                          for common non-licensed asbestos tasks
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  Important for Electricians
                </h3>
                <p className="text-white/80 text-sm">
                  As an electrician, you should{" "}
                  <strong className="text-white">never</strong> carry out any
                  asbestos removal work unless you have received specific
                  training for that category of work. Your role when you discover
                  or encounter ACMs is to{" "}
                  <strong className="text-white">
                    stop, report, and wait
                  </strong>
                  . The duty holder is responsible for arranging the appropriate
                  level of asbestos management or removal. Your Asbestos
                  Awareness training (Category A) qualifies you to recognise
                  suspect materials and take the correct action — it does{" "}
                  <strong className="text-white">not</strong> qualify you to
                  work with or remove ACMs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Risk Assessment & Safe Working */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">07</span>
              Risk Assessment & Safe Working
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Before starting any work that could disturb or come into contact
                with asbestos-containing materials, a thorough{" "}
                <strong className="text-white">risk assessment</strong> must be
                carried out. For electricians, this begins with the most
                fundamental step:{" "}
                <strong className="text-white">
                  checking the asbestos register
                </strong>{" "}
                before you start work.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Before You Start Work
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Check the asbestos register:
                      </strong>{" "}
                      review the building's asbestos register for your specific
                      work area. Identify any ACMs that are located in, near, or
                      along the route of your planned work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Check the survey type:
                      </strong>{" "}
                      confirm whether a management survey or a refurbishment and
                      demolition (R&D) survey has been carried out. For
                      significant electrical work (rewiring, new circuits, major
                      alterations), an R&D survey should cover your work area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Carry out a risk assessment:
                      </strong>{" "}
                      assess whether your planned work could disturb any ACMs.
                      Consider cable routes, drilling locations, fixings, and
                      access points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Prepare a method statement:
                      </strong>{" "}
                      if your work will take place near ACMs, prepare a method
                      statement that describes how you will avoid disturbing them
                      — including alternative cable routes, methods of fixing
                      that avoid drilling into ACMs, and safe access procedures
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Encapsulation vs Removal
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">E</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Encapsulation</p>
                      <p className="text-white/60">
                        Sealing ACMs with a specialist coating or enclosure to
                        prevent fibre release without removing the material. Used
                        when ACMs are in reasonable condition and can be safely
                        managed in place. Avoids the risk associated with
                        removing the material.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">R</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Removal</p>
                      <p className="text-white/60">
                        Physically removing ACMs from the building. Required when
                        ACMs are damaged, deteriorating, or will be disturbed by
                        planned work that cannot be avoided. Must be carried out
                        by trained (non-licensed work) or licensed (licensed
                        work) contractors with appropriate equipment and
                        controls.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    Safe Working Near ACMs
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  Even when you are not directly working with ACMs, your
                  electrical work may take place near them. Follow these
                  principles:
                </p>
                <ul className="text-white/70 text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Plan cable routes to{" "}
                      <strong className="text-white">avoid ACMs</strong> wherever
                      possible — use alternative routes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Do not drill, cut, or fix into materials identified as
                      containing asbestos or suspected of containing asbestos
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Use surface-mounted trunking instead of chasing into walls
                      that may contain ACMs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      If you must work near lagged pipes, do not lean on, push
                      against, or pull cables across the lagging
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Report any damaged or deteriorating ACMs you encounter,
                      even if they are not in your immediate work area
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Training Requirements */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">
                08
              </span>
              Training Requirements
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The Control of Asbestos Regulations 2012 require that all
                workers who may encounter asbestos during their work receive
                appropriate training. The level of training depends on the nature
                of the work and the likelihood of disturbing ACMs. Training must
                be{" "}
                <strong className="text-white">refreshed annually</strong>.
              </p>

              <div className="bg-white/5 border border-emerald-400/30 p-4 rounded-lg">
                <h3 className="text-emerald-300 font-medium mb-3">
                  Training Categories
                </h3>
                <div className="space-y-4 text-sm">
                  {/* Category A */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="text-green-300 font-bold mb-1">
                      Category A — Asbestos Awareness
                    </p>
                    <ul className="text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Required for{" "}
                          <strong className="text-white">
                            ALL workers
                          </strong>{" "}
                          who work in buildings that may contain asbestos —
                          including electricians, plumbers, joiners, painters,
                          and general maintenance workers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Covers: what asbestos is, where it is found, health
                          effects, how to avoid disturbing ACMs, what to do if
                          you find suspect materials
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Does{" "}
                          <strong className="text-white">NOT</strong> qualify
                          you to work with or remove ACMs — only to recognise and
                          avoid them
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Must be refreshed{" "}
                          <strong className="text-white">annually</strong>
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Category B */}
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <p className="text-orange-300 font-bold mb-1">
                      Category B — Non-Licensed Asbestos Work Training
                    </p>
                    <ul className="text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Required for workers who may{" "}
                          <strong className="text-white">
                            disturb ACMs
                          </strong>{" "}
                          as part of their work — for example, removing asbestos
                          cement sheets, removing floor tiles, or carrying out
                          maintenance that involves contact with ACMs
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Covers everything in Category A plus: safe working
                          procedures, equipment selection, RPE/PPE use,
                          decontamination, waste handling, and emergency
                          procedures
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Qualifies workers to carry out non-licensed and NNLW
                          asbestos tasks (but NOT licensed work)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Must be refreshed{" "}
                          <strong className="text-white">annually</strong>
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Licensed Training */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-300 font-bold mb-1">
                      Licensed Asbestos Removal Training
                    </p>
                    <ul className="text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Required for workers employed by{" "}
                          <strong className="text-white">
                            HSE-licensed contractors
                          </strong>{" "}
                          who carry out licensed asbestos removal work
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Comprehensive training covering all aspects of licensed
                          work: enclosures, negative pressure, air monitoring,
                          decontamination units, medical surveillance, and
                          regulatory compliance
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Workers must also be under regular{" "}
                          <strong className="text-white">
                            medical surveillance
                          </strong>{" "}
                          including lung function tests
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Must be refreshed{" "}
                          <strong className="text-white">annually</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  Annual Refresher Requirement
                </h3>
                <p className="text-white/80 text-sm">
                  All categories of asbestos training must be refreshed{" "}
                  <strong className="text-white">at least annually</strong>.
                  This is a legal requirement under Regulation 10 of CAR 2012.
                  The purpose of annual refresher training is to ensure that
                  workers maintain their knowledge and awareness, particularly as
                  guidance and legislation may be updated. If your training has
                  lapsed, you are not legally permitted to carry out work that
                  could expose you to asbestos until you have completed a
                  refresher course.
                </p>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    CSCS Card Requirement
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Asbestos Awareness training is a requirement for obtaining and
                  maintaining a{" "}
                  <strong className="text-white">CSCS card</strong>. The CSCS
                  Health, Safety and Environment (HS&E) test includes questions
                  on asbestos awareness. You are expected to know the types of
                  asbestos, the health effects, where ACMs are found, the duty
                  to manage, and the correct actions to take when you encounter
                  suspect materials. This section covers all of those topics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-4-section-3">
              Next: Noise & Vibration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default CscsCardModule4Section2;
