import { ArrowLeft, Layers, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "aib-asbestos-content",
    question:
      "What is the typical asbestos content of Asbestos Insulating Board (AIB)?",
    options: ["5-10%", "10-15%", "25-40%", "50-70%"],
    correctIndex: 2,
    explanation:
      "Asbestos Insulating Board (AIB) typically contains 25-40% asbestos, usually amosite and sometimes chrysotile or crocidolite. This high fibre content, combined with its friable nature, makes AIB one of the most hazardous commonly encountered ACMs. It requires licensed removal.",
  },
  {
    id: "ac-friability",
    question:
      "When does asbestos cement (AC) become friable and release fibres?",
    options: [
      "Only when heated above 500\u00b0C",
      "When weathered, broken, drilled, cut, or machined",
      "It never becomes friable under any circumstances",
      "Only when submerged in water for extended periods",
    ],
    correctIndex: 1,
    explanation:
      "Asbestos cement is non-friable when intact because the fibres are locked in the cement matrix. However, it becomes friable and releases dangerous fibres when it is weathered, broken, drilled, cut, or machined. Power tool work on AC is classified as NNLW (notifiable non-licensed work).",
  },
  {
    id: "suspect-acm-action",
    question:
      "What should you do FIRST if you encounter a suspected board or sheet ACM on site?",
    options: [
      "Stop work immediately and do not disturb the material",
      "Take a sample for laboratory analysis",
      "Cover it with plastic sheeting and continue working",
      "Scrape the surface to check if it crumbles",
    ],
    correctIndex: 0,
    explanation:
      "If you encounter a suspected ACM, you must STOP work immediately and not disturb the material. Never attempt to sample, scrape, or cover it yourself. Inform your supervisor and the dutyholder, check the asbestos register, and do not resume work until the material has been assessed by a competent person.",
  },
];

const faqs = [
  {
    question:
      "Can I tell the difference between AIB and AC just by looking at them?",
    answer:
      "Visual clues can help distinguish between AIB and AC \u2014 AIB tends to be lighter in weight, smoother, and can be indented with a thumbnail, while AC is heavy, hard, and cement-like. However, visual identification is NEVER definitive. Many boards have been painted, coated, or weathered, making visual assessment unreliable. The only way to confirm whether a material is AIB or AC (or whether it contains asbestos at all) is through laboratory analysis by a UKAS-accredited laboratory. On site, if you cannot confirm the material, you must presume it is the higher-risk type (AIB) until proven otherwise.",
  },
  {
    question:
      "Is it safe to handle intact asbestos cement sheets without any precautions?",
    answer:
      "No. While intact asbestos cement is lower risk than friable materials like AIB, it is not \u2018safe\u2019 to handle without precautions. Even intact AC can have surface weathering that releases fibres. If you need to handle intact AC sheets (for example, during careful removal), you must follow appropriate controls including RPE (respiratory protective equipment), disposable coveralls, dampening the material, and careful handling to avoid breakage. The work may fall under non-licensed work or NNLW depending on the circumstances. Always follow the risk assessment and method statement for the specific task.",
  },
  {
    question: "What does NNLW mean in relation to asbestos cement work?",
    answer:
      "NNLW stands for Notifiable Non-Licensed Work. This is a category of asbestos work that does not require an HSE licence but does require notification to the HSE before work begins. Work on asbestos cement using power tools (drilling, cutting, grinding) typically falls into this category. NNLW also requires medical surveillance for workers, the keeping of a register of work, and compliance with all other requirements of CAR 2012. The dutyholder must notify the HSE using the online notification form before the work starts.",
  },
  {
    question:
      "Where am I most likely to encounter asbestos boards and sheets as an electrician?",
    answer:
      "As an electrician, you are particularly likely to encounter AIB in ceiling tiles (behind which cables may run), partition walls (through which you may need to route cables), fire doors (the core may be AIB), heater cupboard linings, soffits (behind which external cables may be installed), and fuse board backings in older installations. Asbestos cement is commonly found in garage and outbuilding roofs, external wall cladding, gutters, downpipes, and flue pipes. Before drilling, cutting, or disturbing any material in a pre-2000 building, always check the asbestos register and carry out an assessment.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical asbestos content of asbestos cement (AC)?",
    options: ["1-5%", "10-15%", "25-40%", "50-60%"],
    correctAnswer: 1,
    explanation:
      "Asbestos cement typically contains 10-15% chrysotile asbestos bound in Portland cement. This is significantly lower than AIB (25-40%), and the cement matrix locks the fibres in place, making AC non-friable when intact.",
  },
  {
    id: 2,
    question:
      "Which type of asbestos is most commonly found in Asbestos Insulating Board (AIB)?",
    options: [
      "Chrysotile only",
      "Crocidolite only",
      "Amosite (sometimes with chrysotile or crocidolite)",
      "Tremolite",
    ],
    correctAnswer: 2,
    explanation:
      "AIB typically contains amosite (brown asbestos), sometimes mixed with chrysotile or crocidolite. Amosite was preferred for insulating board because of its thermal properties and was the second most commonly used asbestos type in the UK.",
  },
  {
    id: 3,
    question: "What removal method is required for AIB?",
    options: [
      "It can be removed by any competent person",
      "Non-licensed removal only",
      "Licensed removal by an HSE-licensed contractor",
      "No special removal method is needed",
    ],
    correctAnswer: 2,
    explanation:
      "AIB requires licensed removal by an HSE-licensed asbestos removal contractor. This is because AIB is friable and releases fibres easily when disturbed. Licensed work requires a full plan of work, DCU (decontamination unit), air monitoring, and trained operatives.",
  },
  {
    id: 4,
    question:
      "Which of the following is a characteristic of asbestos cement that distinguishes it from AIB?",
    options: [
      "AC is soft and can be indented with a thumbnail",
      "AC is lightweight and sounds hollow when tapped",
      "AC is hard, heavy, and cannot be indented with a fingernail",
      "AC is always blue in colour",
    ],
    correctAnswer: 2,
    explanation:
      "Asbestos cement is hard, heavy (density ~1500-2000 kg/m\u00b3), and cannot be indented with a fingernail. It sounds solid when tapped. In contrast, AIB is relatively soft, lighter, and can be indented with a thumbnail or screwdriver.",
  },
  {
    id: 5,
    question:
      "When does work on asbestos cement become classified as NNLW (notifiable non-licensed work)?",
    options: [
      "Any time you touch it",
      "Only when removing entire roof sheets",
      "When using power tools to drill, cut, or grind AC",
      "Only when the AC is damaged",
    ],
    correctAnswer: 2,
    explanation:
      "Work on asbestos cement using power tools (drilling, cutting, grinding) is classified as NNLW because the power tools break up the cement matrix and release asbestos fibres. NNLW requires notification to the HSE, medical surveillance, and a register of work.",
  },
  {
    id: 6,
    question:
      "In which of these locations would you be MOST likely to find AIB rather than AC?",
    options: [
      "Corrugated roof sheets on a garage",
      "Gutters and downpipes",
      "Ceiling tiles and partition walls inside a building",
      "External wall cladding on an industrial unit",
    ],
    correctAnswer: 2,
    explanation:
      "Ceiling tiles and partition walls inside buildings are common locations for AIB. It was widely used for fire protection, thermal insulation, and sound insulation in internal applications. Corrugated roof sheets, gutters, downpipes, and external wall cladding are much more likely to be asbestos cement.",
  },
  {
    id: 7,
    question:
      "If you cannot confirm whether a board material is AIB or AC, what should you do under CAR 2012?",
    options: [
      "Assume it is AC because it is more common",
      "Presume it is the higher-risk material (AIB) until proven otherwise",
      "Remove a small sample yourself for testing",
      "Continue working carefully and report it later",
    ],
    correctAnswer: 1,
    explanation:
      "Under CAR 2012 Regulation 5 (the presumption approach), if you cannot confirm the type of material, you must presume the worst case. This means treating it as AIB (the higher-risk material) until laboratory analysis confirms otherwise. Never attempt to sample material yourself.",
  },
  {
    id: 8,
    question:
      "What is the approximate density of Asbestos Insulating Board (AIB)?",
    options: [
      "200-400 kg/m\u00b3",
      "700-1,000 kg/m\u00b3",
      "1,500-2,000 kg/m\u00b3",
      "2,500-3,000 kg/m\u00b3",
    ],
    correctAnswer: 1,
    explanation:
      "AIB has a relatively low density of approximately 700-1,000 kg/m\u00b3, which is one reason it feels lightweight for its size. Asbestos cement, by contrast, has a much higher density of approximately 1,500-2,000 kg/m\u00b3, making it noticeably heavier.",
  },
];

export default function AsbestosModule3Section1() {
  useSEO({
    title:
      "Common ACMs \u2014 Boards & Sheets | Asbestos Awareness Module 3.1",
    description:
      "Asbestos Insulating Board (AIB) and Asbestos Cement (AC): identification, properties, common locations, risk levels, and what to do if you find suspected board or sheet ACMs on site.",
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
            <Link to="../asbestos-awareness-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-400/20 border border-orange-500/30 mb-4">
            <Layers className="h-7 w-7 text-orange-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common ACMs &mdash; Boards &amp; Sheets
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding Asbestos Insulating Board (AIB) and Asbestos Cement
            (AC) &mdash; the two most common board and sheet ACMs found in UK
            buildings, how to tell them apart, and what to do when you encounter
            them
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Two main types:</strong> AIB (high risk, friable) and AC
                (lower risk when intact)
              </li>
              <li>
                <strong>AIB:</strong> 25&ndash;40% asbestos &mdash; licensed
                removal required
              </li>
              <li>
                <strong>AC:</strong> 10&ndash;15% asbestos &mdash; non-friable
                when intact
              </li>
              <li>
                <strong>Both:</strong> Extremely common in pre-2000 UK buildings
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Never:</strong> Drill, cut, sand, or disturb suspect
                boards/sheets
              </li>
              <li>
                <strong>Check:</strong> The asbestos register before any work
              </li>
              <li>
                <strong>Presume:</strong> AIB (higher risk) if type is unknown
              </li>
              <li>
                <strong>Report:</strong> Stop work and inform your supervisor
                immediately
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between Asbestos Insulating Board (AIB) and Asbestos Cement (AC)",
              "Describe the asbestos content, friability, and risk level of each type",
              "Identify common locations where AIB and AC are found in UK buildings",
              "Explain the key physical differences used to tell AIB and AC apart on site",
              "List other asbestos board and sheet products including millboard and asbestos paper",
              "State the correct emergency procedure if you encounter suspected board or sheet ACMs",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Two Main Board/Sheet Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">01</span>
            Two Main Board/Sheet Types
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When electricians, plumbers, joiners, and other tradespeople
                encounter asbestos-containing materials (ACMs) in board or sheet
                form, the material will almost always fall into one of two
                categories:{" "}
                <strong>Asbestos Insulating Board (AIB)</strong> or{" "}
                <strong>Asbestos Cement (AC)</strong>. Understanding the
                difference between these two is critical for determining the
                correct work procedures, the level of risk, and the type of
                controls required.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Key Distinction:</strong>{" "}
                  AIB has a <strong>high asbestos content</strong> (25&ndash;40%)
                  and is <strong>friable</strong> &mdash; it releases fibres
                  easily when damaged or disturbed, making it{" "}
                  <strong>higher risk</strong>. AC has a{" "}
                  <strong>lower asbestos content</strong> (10&ndash;15%) and is{" "}
                  <strong>non-friable when intact</strong> because the fibres are
                  locked in a cement matrix, making it{" "}
                  <strong>lower risk</strong> &mdash; but only while it remains
                  undamaged.
                </p>
              </div>

              <p>
                Both materials were{" "}
                <strong>
                  extremely common in UK buildings from the 1950s to the 1990s
                </strong>
                . They were used in a vast range of applications across
                domestic, commercial, industrial, and public buildings. Any
                building constructed or refurbished before the year 2000 may
                contain one or both of these materials, and tradespeople
                routinely encounter them during maintenance, refurbishment, and
                installation work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  At a Glance
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-orange-400">AIB</p>
                    <p className="text-white/70 text-xs">
                      High asbestos content &middot; Friable &middot; High risk
                      &middot; Licensed removal
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-orange-400">AC</p>
                    <p className="text-white/70 text-xs">
                      Lower asbestos content &middot; Non-friable when intact
                      &middot; Medium risk &middot; Lower-level controls
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Reminder
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  You <strong className="text-white">cannot</strong> confirm
                  whether a material is AIB, AC, or non-asbestos by visual
                  inspection alone. The only definitive method is{" "}
                  <strong className="text-white">laboratory analysis</strong>.
                  When in doubt, always presume the higher-risk material (AIB)
                  and stop work until the material has been assessed by a
                  competent person.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Asbestos Insulating Board (AIB) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">02</span>
            Asbestos Insulating Board (AIB)
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos Insulating Board (AIB) is one of the most commonly
                encountered <strong>high-risk</strong> ACMs in UK buildings. It
                was manufactured from the 1950s through to the mid-1980s and was
                used extensively in commercial, public, and domestic buildings
                for fire protection, thermal insulation, and sound insulation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Physical Properties
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Asbestos content:
                      </strong>{" "}
                      25&ndash;40% asbestos, typically amosite (brown), sometimes
                      chrysotile (white) or crocidolite (blue)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Composition:</strong> Asbestos
                      fibres mixed with calcium silicate or calcium compounds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Texture:</strong> Relatively
                      soft &mdash; can be indented with a thumbnail or
                      screwdriver
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Colour:</strong> Light to
                      mid-grey, though can be painted any colour
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Friability:</strong>{" "}
                      <strong className="text-red-400">HIGH</strong> &mdash;
                      releases fibres easily when damaged, drilled, cut, or
                      disturbed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Density:</strong> Relatively
                      low (~700&ndash;1,000 kg/m&sup3;)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Locations
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ceiling tiles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Partition walls</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Fire doors (core material)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Soffit boards</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Column casings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Heater cupboard linings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Window boards</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Bath panels</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Licensed Removal Required
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Due to its high asbestos content and friable nature, AIB
                  requires{" "}
                  <strong className="text-white">
                    licensed removal by an HSE-licensed asbestos removal
                    contractor
                  </strong>
                  . It is illegal to remove AIB without a licence. Licensed
                  removal involves a full plan of work, a decontamination unit
                  (DCU), continuous air monitoring, and operatives trained and
                  equipped for work with high-risk ACMs. As a tradesperson, you
                  must <strong className="text-white">never</strong> attempt to
                  remove, cut, drill, or disturb AIB yourself.
                </p>
              </div>

              <p>
                AIB is one of the materials that electricians are most likely to
                encounter, particularly when working behind ceiling tiles,
                routing cables through partition walls, or working on
                installations behind heater cupboard linings. Even small
                disturbances &mdash; such as pushing a cable through an AIB
                ceiling tile &mdash; can release dangerous quantities of asbestos
                fibres.
              </p>
            </div>
          </div>
        </section>

        {/* ACM Identification Cards Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">
              &mdash;
            </span>
            ACM Identification Cards
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1 - AIB */}
            <div className="bg-white/5 border border-orange-500/30 rounded-xl overflow-hidden">
              <div className="bg-orange-500/10 border-b border-orange-500/30 px-4 py-3 text-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-gray-400/40 mx-auto mb-2" />
                <p className="text-sm font-bold text-orange-400">
                  Asbestos Insulating Board (AIB)
                </p>
                <p className="text-xs text-white/60">
                  High-Risk Board Product
                </p>
              </div>
              <div className="px-4 py-3 space-y-2 text-xs text-white/80">
                <div className="flex justify-between">
                  <span className="text-white/50">Colour indicator</span>
                  <span className="text-white font-medium">Light grey</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Asbestos content</span>
                  <span className="text-white font-medium">25&ndash;40%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Common asbestos type</span>
                  <span className="text-white font-medium">
                    Amosite, chrysotile
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Texture</span>
                  <span className="text-white font-medium">
                    Soft, can be indented
                  </span>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between">
                  <span className="text-white/50">Friability</span>
                  <span className="text-red-400 font-bold">
                    HIGH &mdash; crumbles easily
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Density</span>
                  <span className="text-white font-medium">
                    Low (~700&ndash;1,000 kg/m&sup3;)
                  </span>
                </div>
                <hr className="border-white/10" />
                <div>
                  <span className="text-white/50">Typical locations</span>
                  <p className="text-white mt-1">
                    Ceiling tiles, partitions, fire doors, soffits, column
                    casings, heater cupboard linings
                  </p>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Risk level</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-400 font-bold text-[11px]">
                    HIGH
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Removal</span>
                  <span className="text-red-300 font-medium">
                    LICENSED contractor required
                  </span>
                </div>
                <hr className="border-white/10" />
                <div>
                  <span className="text-white/50">Visual clue</span>
                  <p className="text-white mt-1">
                    Smooth or slightly textured surface, lightweight for its
                    size
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - AC */}
            <div className="bg-white/5 border border-orange-500/30 rounded-xl overflow-hidden">
              <div className="bg-orange-500/10 border-b border-orange-500/30 px-4 py-3 text-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-gray-500/40 mx-auto mb-2" />
                <p className="text-sm font-bold text-orange-400">
                  Asbestos Cement (AC)
                </p>
                <p className="text-xs text-white/60">
                  Medium-Risk Cement Product
                </p>
              </div>
              <div className="px-4 py-3 space-y-2 text-xs text-white/80">
                <div className="flex justify-between">
                  <span className="text-white/50">Colour indicator</span>
                  <span className="text-white font-medium">Dark grey</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Asbestos content</span>
                  <span className="text-white font-medium">10&ndash;15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Common asbestos type</span>
                  <span className="text-white font-medium">Chrysotile</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Texture</span>
                  <span className="text-white font-medium">
                    Hard, cannot be indented
                  </span>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between">
                  <span className="text-white/50">Friability</span>
                  <span className="text-amber-400 font-bold">
                    LOW when intact
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Density</span>
                  <span className="text-white font-medium">
                    High (~1,500&ndash;2,000 kg/m&sup3;)
                  </span>
                </div>
                <hr className="border-white/10" />
                <div>
                  <span className="text-white/50">Typical locations</span>
                  <p className="text-white mt-1">
                    Roof sheets, wall cladding, gutters, downpipes, flue pipes,
                    water tanks
                  </p>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Risk level</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-400 font-bold text-[11px]">
                    MEDIUM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Removal</span>
                  <span className="text-amber-300 font-medium">
                    Non-licensed if intact, NNLW if power tools
                  </span>
                </div>
                <hr className="border-white/10" />
                <div>
                  <span className="text-white/50">Visual clue</span>
                  <p className="text-white mt-1">
                    Hard, heavy, cement-like appearance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Asbestos Cement (AC) in Detail */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">03</span>
            Asbestos Cement (AC) in Detail
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos cement is by far the most common asbestos-containing
                material in the UK by volume. Massive quantities were installed
                across the country &mdash; millions of square metres of cement
                roofing alone &mdash; making it the ACM that tradespeople are
                most likely to encounter during their working lives.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Physical Properties
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Asbestos content:
                      </strong>{" "}
                      10&ndash;15% chrysotile asbestos bound in Portland cement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Texture:</strong> Very hard
                      and dense &mdash; cannot be indented with a fingernail
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Colour:</strong> Grey,
                      similar to ordinary concrete or cement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Friability:</strong>{" "}
                      Non-friable when intact (fibres locked in cement matrix).
                      <strong className="text-amber-400">
                        {" "}
                        BECOMES friable
                      </strong>{" "}
                      when weathered, broken, drilled, cut, or machined
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Density:</strong> High
                      (~1,500&ndash;2,000 kg/m&sup3;)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Locations
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Corrugated roof sheets (garages, outbuildings, industrial
                      units, farm buildings)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Flat sheets (wall cladding, ceiling panels)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Gutters and downpipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Water tanks and cisterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Flue pipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Underground drainage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Wall cladding on industrial and commercial buildings</span>
                  </li>
                </ul>
              </div>

              <p>
                Although asbestos cement is classified as lower risk than AIB
                when intact, it can be handled with lower-level controls{" "}
                <strong>only</strong> if the material is in good condition and is
                not being cut, drilled, or machined. The moment power tools are
                used on asbestos cement, the cement matrix is broken up and
                asbestos fibres are released into the air.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Power Tools = NNLW
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Power tool work on asbestos cement (drilling, cutting,
                  grinding) is classified as{" "}
                  <strong className="text-white">
                    NNLW (notifiable non-licensed work)
                  </strong>
                  . This requires notification to the HSE before work begins,
                  medical surveillance for workers, and the keeping of a work
                  register. Even though it does not require a full HSE licence,
                  NNLW is still regulated work with strict legal requirements.
                </p>
              </div>

              <p>
                The sheer volume of asbestos cement installed across the UK
                means it remains a significant concern. Millions of corrugated
                roof sheets on garages, agricultural buildings, and industrial
                units are reaching the end of their service life and becoming
                weathered and damaged. As these materials deteriorate, the risk
                of fibre release increases. Any work on or near weathered
                asbestos cement must be approached with appropriate caution and
                controls.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Identifying AIB vs AC on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">04</span>
            Identifying AIB vs AC on Site
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While laboratory analysis is the only definitive way to confirm
                whether a material contains asbestos and what type it is, there
                are physical characteristics that can help distinguish between
                AIB and AC on site. However, these are{" "}
                <strong>indicative only</strong> and must never be relied upon as
                a substitute for proper analysis.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Physical Comparison
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      Touch
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Thumbnail Test
                      </p>
                      <p>
                        AIB can be indented with a thumbnail; AC cannot. However,{" "}
                        <strong className="text-red-300">
                          DO NOT perform this test without RPE and appropriate
                          training
                        </strong>
                        , as pressing into the material can release fibres.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      Weight
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Relative Heaviness
                      </p>
                      <p>
                        AC is significantly heavier than AIB due to its higher
                        density (~1,500&ndash;2,000 kg/m&sup3; vs
                        ~700&ndash;1,000 kg/m&sup3;). A sheet of AC will feel
                        noticeably heavy for its size.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      Sound
                    </span>
                    <div>
                      <p className="text-white font-medium">Tap Test</p>
                      <p>
                        AC sounds solid and dense when tapped. AIB sounds more
                        hollow and produces a duller, lighter sound.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      Surface
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Surface Texture
                      </p>
                      <p>
                        AIB tends to be smoother with a more uniform surface. AC
                        has a cement-like grainy texture, similar to concrete.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      Location
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Location Clues
                      </p>
                      <p>
                        Ceiling tiles and internal partition walls are more
                        likely AIB. Roof sheets, gutters, and external cladding
                        are more likely AC. However, exceptions exist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Visual Identification Is NOT Definitive
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">CRITICAL:</strong> Visual and
                  physical identification is indicative only. It is{" "}
                  <strong className="text-white">not</strong> a substitute for
                  laboratory analysis. Materials may be painted, coated,
                  weathered, or mixed in ways that make physical assessment
                  misleading. The only reliable confirmation is analysis by a
                  UKAS-accredited laboratory. When in doubt,{" "}
                  <strong className="text-white">
                    ALWAYS presume the higher-risk material (AIB) until proven
                    otherwise
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Other Board Products */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">05</span>
            Other Board Products
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond AIB and AC, several other asbestos-containing board and
                sheet products were used in UK buildings and industrial settings.
                While less common than the main two types, these materials can
                still be encountered during refurbishment, demolition, or
                maintenance work, and all require proper assessment and
                management.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Millboard
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Thin asbestos board, typically 1&ndash;6 mm thick
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Used for insulation, gaskets, and protective lining
                        behind heat sources
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        High asbestos content &mdash; can be very friable
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Asbestos Paper
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Very thin sheets of asbestos, sometimes backed with foil
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Used for insulation wrapping around pipes, ducts, and
                        electrical components
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Highly friable when disturbed or damaged</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Packing &amp; Jointing Materials
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Gaskets, washers, and packing materials used in flanges
                        and pipework
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Often found in boiler rooms, heating systems, and
                        industrial plant
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Varying asbestos content and friability</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Rope &amp; String
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Braided chrysotile rope used for sealing, packing
                        glands, and gasket purposes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Found around boiler doors, flue pipe joints, and valve
                        stems
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Can be very friable, especially when old and dried out
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Key Point:</strong> All of
                  these materials have varying asbestos content and friability.
                  They all require proper assessment and appropriate management
                  under CAR 2012. If you encounter any material that you suspect
                  may contain asbestos, regardless of its form or thickness, the
                  same rules apply: stop work, do not disturb it, and report it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: What to Do If You Find Suspected Board/Sheet ACMs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">06</span>
            What to Do If You Find Suspected Board/Sheet ACMs
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you encounter a material during your work that you suspect may
                be an asbestos-containing board or sheet, the following procedure
                must be followed without exception. The actions you take in the
                first few moments are critical for protecting yourself and
                everyone around you.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Emergency Procedure
                </p>
                <ol className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">
                        STOP work immediately
                      </strong>{" "}
                      &mdash; cease all activities that are disturbing or may
                      disturb the material. Put down tools.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Do NOT drill, cut, sand, break, or disturb the material
                      </strong>{" "}
                      &mdash; any further disturbance will release more fibres
                      into the air.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Inform your supervisor and the dutyholder
                      </strong>{" "}
                      &mdash; they are responsible for managing asbestos in the
                      building and arranging assessment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Check the asbestos register
                      </strong>{" "}
                      for the building &mdash; the register should identify known
                      ACMs and their locations. If the material is already
                      recorded, follow the management plan.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">
                        If the material is not on the register
                      </strong>
                      , presume it is asbestos and treat it accordingly. Do not
                      attempt to sample or assess it yourself.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400">
                      6
                    </span>
                    <span>
                      <strong className="text-white">
                        Do not resume work
                      </strong>{" "}
                      until the material has been assessed or sampled by a
                      competent person and you have been given the all-clear.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    If You Have Already Disturbed the Material
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If you have already drilled into, cut, broken, or otherwise
                  disturbed a suspected ACM before realising what it might be,
                  follow the{" "}
                  <strong className="text-white">
                    4-S emergency procedure
                  </strong>{" "}
                  (covered in detail in Module 5). In brief: <strong>Stop</strong>{" "}
                  what you are doing, <strong>Seal</strong> off the area,{" "}
                  <strong>Supervise</strong> (prevent others from entering), and{" "}
                  <strong>Seek</strong> professional help immediately. Do not
                  attempt to clean up asbestos debris yourself.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Remember:</strong> The
                  decision to stop work is always the right decision. No job is
                  worth risking your health or the health of those around you. If
                  you are ever pressured to continue working in the presence of
                  suspected asbestos, you have the legal right to refuse and to
                  report the situation. Your employer has a legal duty to protect
                  you from asbestos exposure under the Control of Asbestos
                  Regulations 2012 and the Health and Safety at Work etc. Act
                  1974.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-2-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: The Asbestos Register
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-3-section-2">
              Next: ACMs &mdash; Insulation &amp; Coatings
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
