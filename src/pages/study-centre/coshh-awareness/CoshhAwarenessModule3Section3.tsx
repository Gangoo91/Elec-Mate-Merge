import { ArrowLeft, Wind, CheckCircle, AlertTriangle, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "lev-capture-velocity",
    question:
      "What is the primary purpose of capture velocity in a Local Exhaust Ventilation (LEV) system?",
    options: [
      "To cool the air inside the ductwork",
      "To draw contaminated air into the hood before it reaches the worker's breathing zone",
      "To push clean air out of the building",
      "To increase the air pressure inside the workplace",
    ],
    correctIndex: 1,
    explanation:
      "Capture velocity is the air speed at the hood opening that is sufficient to draw contaminated air (dust, fumes, vapour) into the hood and away from the worker's breathing zone. If the capture velocity is too low, the contaminant escapes into the general atmosphere instead of being captured.",
  },
  {
    id: "h-class-vs-m-class",
    question:
      "When MUST an H-class dust extractor be used instead of an M-class extractor?",
    options: [
      "Whenever working outdoors on a windy day",
      "Only when cutting metal with an angle grinder",
      "When the dust is classified as carcinogenic, contains silica, or may include asbestos fibres",
      "Only when the employer specifically requests it in writing",
    ],
    correctIndex: 2,
    explanation:
      "H-class extractors (99.995% filtration at 0.3\u03bcm) are required for hazardous dust classified as carcinogenic (e.g. hardwood dust), respirable crystalline silica (RCS), and any dust that may contain asbestos fibres. M-class (99.9% at 0.3\u03bcm) is only suitable for medium-hazard dusts with a WEL above 0.1 mg/m\u00b3.",
  },
  {
    id: "housekeeping-compressed-air",
    question:
      "Why should compressed air NEVER be used to blow dust off clothing or work surfaces?",
    options: [
      "It is too expensive to use compressed air for cleaning",
      "It creates a fire risk from static electricity",
      "It disperses settled dust back into the air, creating a respirable hazard that can be inhaled",
      "It damages the compressor seals over time",
    ],
    correctIndex: 2,
    explanation:
      "Using compressed air to blow dust off surfaces or clothing re-disperses settled particles into the air as a fine, respirable cloud. This turns dust that was relatively safe (settled on surfaces) into an acute inhalation hazard. The correct methods are vacuuming with an appropriate class of extractor or damp wiping.",
  },
];

const faqs = [
  {
    question:
      "How often must LEV systems be thoroughly examined and tested under COSHH?",
    answer:
      "COSHH Regulation 9 requires LEV systems to be thoroughly examined and tested at least every 14 months. This must be carried out by a competent person, and a written report must be kept for at least 5 years. Some industries or specific processes may require more frequent testing. The employer must also ensure the LEV is maintained in an efficient state and kept in good working order through regular visual checks and routine maintenance between thorough examinations.",
  },
  {
    question:
      "What is the difference between an FFP2 and an FFP3 disposable mask?",
    answer:
      "FFP2 masks have an assigned protection factor (APF) of 10, meaning they reduce exposure by a factor of 10 (to one-tenth of the ambient concentration). FFP3 masks have an APF of 20, reducing exposure by a factor of 20. FFP3 masks are required for higher-hazard dusts including hardwood dust, silica dust, and any situation where the concentration is high enough that FFP2 protection would be insufficient. Both must be face-fit tested to ensure an adequate seal. An ill-fitting FFP3 provides less protection than a properly fitted FFP2.",
  },
  {
    question:
      "Can I use a standard domestic vacuum cleaner to clean up construction dust?",
    answer:
      "No. Standard domestic vacuum cleaners do not have adequate filtration and will pass fine respirable dust straight through the filter and back into the air, making the situation worse. For construction dust you need at minimum an M-class extractor (99.9% filtration at 0.3\u03bcm). For hazardous dusts such as silica, hardwood dust, or any dust that may contain asbestos, you must use an H-class extractor (99.995% filtration at 0.3\u03bcm HEPA). The extractor must also be properly maintained with filters replaced according to the manufacturer's schedule.",
  },
  {
    question:
      "Is wet cutting always sufficient to control dust from concrete and masonry?",
    answer:
      "Wet cutting significantly reduces airborne dust but is not always sufficient on its own. In enclosed spaces with poor ventilation, wet cutting may still produce respirable dust concentrations above the Workplace Exposure Limit (WEL). Best practice is to combine wet suppression with on-tool extraction and, where necessary, RPE. You must also manage the slurry created by wet cutting \u2014 it contains the same hazardous material (e.g. silica) and must not be allowed to dry out and become airborne again. Slurry should be cleaned up while still wet and disposed of appropriately.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does LEV stand for, and what is its primary function under COSHH?",
    options: [
      "Low Energy Ventilation \u2014 reduces energy consumption in workshops",
      "Local Exhaust Ventilation \u2014 captures airborne contaminants at or near the source before they reach the worker's breathing zone",
      "Large Exhaust Vent \u2014 a roof-mounted fan that extracts all air from a building",
      "Localised Emergency Ventilation \u2014 only activated during spillage incidents",
    ],
    correctAnswer: 1,
    explanation:
      "LEV stands for Local Exhaust Ventilation. Its primary function under COSHH is to capture dust, fumes, vapour, or mist at or near the point of generation, preventing the contaminant from reaching the worker's breathing zone. It is a key engineering control required by COSHH Regulation 7.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT a type of LEV hood?",
    options: [
      "Enclosing hood (e.g. fume cupboard, glove box)",
      "Receiving hood (e.g. canopy hood above a welding bench)",
      "Capturing hood (e.g. flexible arm extraction)",
      "Dispersing hood (e.g. a fan that blows dust away from the worker)",
    ],
    correctAnswer: 3,
    explanation:
      "There is no such thing as a 'dispersing hood' in LEV terminology. The three main types of LEV hood are: enclosing hoods (which surround the source), receiving hoods (which capture contaminants carried by a natural airflow such as hot air rising), and capturing hoods (which generate airflow to pull contaminants toward the hood). A device that blows dust away would spread contamination, not control it.",
  },
  {
    id: 3,
    question:
      "What filtration efficiency defines an H-class dust extractor?",
    options: [
      "99.0% at 1.0\u03bcm particle size",
      "99.9% at 0.3\u03bcm particle size (HEPA equivalent)",
      "99.995% at 0.3\u03bcm particle size (HEPA H13 or better)",
      "95.0% at 5.0\u03bcm particle size",
    ],
    correctAnswer: 2,
    explanation:
      "H-class dust extractors must achieve a minimum filtration efficiency of 99.995% at 0.3\u03bcm particle size, equivalent to HEPA H13 or better filtration. This level is required for carcinogenic dusts, asbestos, silica, and other highly hazardous particulates. M-class extractors achieve 99.9% at 0.3\u03bcm, which is suitable for medium-hazard dusts only.",
  },
  {
    id: 4,
    question:
      "How should used filter bags from an H-class extractor be disposed of?",
    options: [
      "Emptied into a standard bin and reused",
      "Shaken out on site and replaced when torn",
      "Sealed in a labelled bag and disposed of as hazardous waste through an authorised waste carrier",
      "Washed with water and dried for reuse",
    ],
    correctAnswer: 2,
    explanation:
      "Used filter bags from H-class extractors contain concentrated hazardous dust (potentially carcinogenic, silica, or asbestos-containing). They must be sealed without releasing dust, placed in a labelled hazardous waste bag, and disposed of through an authorised hazardous waste carrier. They must never be emptied, shaken, or reused.",
  },
  {
    id: 5,
    question:
      "What is the Assigned Protection Factor (APF) of an FFP3 disposable mask?",
    options: [
      "APF 4 \u2014 reduces exposure by a factor of 4",
      "APF 10 \u2014 reduces exposure by a factor of 10",
      "APF 20 \u2014 reduces exposure by a factor of 20",
      "APF 40 \u2014 reduces exposure by a factor of 40",
    ],
    correctAnswer: 2,
    explanation:
      "An FFP3 disposable mask has an Assigned Protection Factor (APF) of 20, meaning it reduces the wearer's exposure to one-twentieth of the ambient concentration, provided it is correctly face-fit tested and worn. FFP2 has an APF of 10, and FFP1 has an APF of 4.",
  },
  {
    id: 6,
    question:
      "Under COSHH, what is the required interval for thorough examination and testing of LEV systems?",
    options: [
      "Every 6 months",
      "Every 12 months",
      "Every 14 months",
      "Every 24 months",
    ],
    correctAnswer: 2,
    explanation:
      "COSHH Regulation 9 requires LEV systems to undergo thorough examination and testing at least every 14 months. This ensures the system continues to perform as designed and captures contaminants effectively. Records must be kept for at least 5 years. Some specific regulations (e.g. for certain processes) may require more frequent testing.",
  },
  {
    id: 7,
    question:
      "Why is sweeping construction dust with a broom considered bad practice?",
    options: [
      "It takes too long compared to other methods",
      "Brooms are not allowed on construction sites under CDM regulations",
      "Sweeping re-suspends fine respirable dust particles into the air, creating an inhalation hazard",
      "Sweeping damages floor surfaces and coatings",
    ],
    correctAnswer: 2,
    explanation:
      "Sweeping with a broom disturbs settled dust and re-suspends fine respirable particles back into the air. These particles are too small to see but can penetrate deep into the lungs. The correct approach is to use a suitable vacuum (M-class or H-class depending on the dust type) or damp wiping to capture the dust without making it airborne again.",
  },
  {
    id: 8,
    question:
      "When using wet suppression for cutting concrete, what additional hazard does the process create that must be managed?",
    options: [
      "Electrical sparks from the wet blade",
      "Toxic gas emissions from water reacting with cement",
      "Silica-laden slurry that must be cleaned up while still wet to prevent it drying and becoming airborne",
      "Noise levels increase significantly with wet cutting",
    ],
    correctAnswer: 2,
    explanation:
      "Wet cutting concrete creates a slurry containing respirable crystalline silica. If this slurry is allowed to dry, the silica particles become airborne again, recreating the original hazard. The slurry must be cleaned up while still wet using appropriate methods and disposed of correctly. Wet suppression is a control measure, not a complete solution on its own.",
  },
];

export default function CoshhAwarenessModule3Section3() {
  useSEO({
    title:
      "Dust & Fume Control | COSHH Awareness Module 3.3",
    description:
      "Local exhaust ventilation, on-tool extraction, wet suppression, H-class extractors, RPE selection, fume extraction, and housekeeping for dust and fume control under COSHH.",
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
            <Link to="../coshh-awareness-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-400/20 border border-violet-500/30 mb-4">
            <Wind className="h-7 w-7 text-violet-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Dust &amp; Fume Control
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Engineering controls, extraction systems, RPE selection, and
            housekeeping practices that protect you from invisible respirable
            hazards
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Threat:</strong> Respirable particles you cannot see are
                the most dangerous
              </li>
              <li>
                <strong>Control:</strong> LEV at source &gt; on-tool extraction
                &gt; wet methods &gt; RPE
              </li>
              <li>
                <strong>H-class:</strong> 99.995% HEPA filtration for silica,
                hardwood, asbestos dust
              </li>
              <li>
                <strong>Rule:</strong> Vacuum, never sweep &mdash; damp wipe,
                never blow
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>LEV:</strong> Thorough exam every 14 months (COSHH Reg
                9)
              </li>
              <li>
                <strong>RPE:</strong> FFP3 (APF 20) for high-hazard dusts
                &mdash; must be face-fit tested
              </li>
              <li>
                <strong>Wet cutting:</strong> Clean slurry while wet &mdash;
                dried slurry = airborne silica
              </li>
              <li>
                <strong>Never:</strong> Use compressed air for cleaning dust
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
              "Explain why respirable dust and fume particles pose a greater health risk than visible dust",
              "Describe how a Local Exhaust Ventilation system works, including hood types, ductwork, and air cleaning",
              "State the COSHH Regulation 9 requirements for LEV thorough examination and testing",
              "Distinguish between M-class and H-class dust extractors and explain when each is required",
              "Select appropriate RPE for dust and fume hazards using Assigned Protection Factors",
              "Apply correct housekeeping practices to prevent settled dust from becoming airborne",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Dust and Fume Control Is Critical */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">01</span>
            Why Dust &amp; Fume Control Is Critical
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Invisible Killer on Construction Sites
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The most dangerous dust and fume particles are the ones you{" "}
                  <strong className="text-white">cannot see</strong>. Respirable
                  particles smaller than 10 microns (&mu;m) pass through the
                  nose and throat and penetrate deep into the lungs, where they
                  can cause permanent, irreversible damage. By the time you can
                  see a dust cloud with the naked eye, the concentration of
                  invisible respirable particles is already many times above safe
                  limits.
                </p>
              </div>

              <p>
                Construction and electrical work generates dust and fumes from a
                wide range of activities:{" "}
                <strong>
                  cutting, grinding, drilling, chasing, sanding, welding,
                  soldering, and cable burning
                </strong>
                . Each of these activities produces particles that vary in size,
                composition, and toxicity. The health effects depend on{" "}
                <strong>what</strong> the particle is made of,{" "}
                <strong>how small</strong> it is, <strong>how much</strong> you
                inhale, and <strong>how often</strong> you are exposed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Particle Size &amp; Penetration
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Inhalable dust (&lt;100&mu;m)
                      </strong>{" "}
                      &mdash; enters the nose and mouth; trapped by upper
                      airways
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Thoracic dust (&lt;25&mu;m)
                      </strong>{" "}
                      &mdash; penetrates past the larynx into the bronchial
                      airways
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Respirable dust (&lt;10&mu;m)
                      </strong>{" "}
                      &mdash; reaches the alveoli (gas exchange region) deep in
                      the lungs; causes silicosis, COPD, lung cancer
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ultrafine particles (&lt;0.1&mu;m)
                      </strong>{" "}
                      &mdash; welding fume, solder fume; can pass through lung
                      walls into the bloodstream
                    </span>
                  </div>
                </div>
              </div>

              <p>
                The damage from respirable dust and fumes is{" "}
                <strong>cumulative</strong>. Each exposure adds to the total
                burden on the lungs. Unlike a cut or a broken bone, lung damage
                from dust exposure does not heal. Scar tissue replaces healthy
                lung tissue, progressively reducing lung capacity. Conditions
                such as <strong>silicosis</strong>,{" "}
                <strong>occupational asthma</strong>, <strong>COPD</strong>, and{" "}
                <strong>lung cancer</strong> may not develop symptoms until years
                or decades after exposure &mdash; by which time the damage is
                irreversible.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    The Hierarchy of Control for Dust &amp; Fumes:
                  </strong>{" "}
                  Under COSHH, the hierarchy is: (1) eliminate the dust-generating
                  process if possible; (2) substitute with a less hazardous
                  material or method; (3) enclose the process and use LEV at
                  source; (4) use general ventilation to dilute; (5) as a last
                  resort, use RPE. Controls higher in the hierarchy are always
                  preferred over RPE because they protect everyone in the area,
                  not just the individual wearing the mask.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Local Exhaust Ventilation (LEV) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">02</span>
            Local Exhaust Ventilation (LEV)
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Local Exhaust Ventilation is an{" "}
                <strong>engineering control</strong> that captures airborne
                contaminants at or near the point where they are generated,
                before they can spread into the general workplace air and reach
                the worker's breathing zone. A properly designed and maintained
                LEV system is one of the most effective ways to control dust and
                fume exposure under COSHH.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The 5 Components of an LEV System
                </p>
                <ol className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Hood</strong> &mdash; the
                      opening that captures the contaminant. Must be positioned
                      as close to the source as possible. Types include
                      enclosing, receiving, and capturing hoods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">Ductwork</strong> &mdash;
                      transports contaminated air from the hood to the air
                      cleaner. Must maintain adequate transport velocity to
                      prevent dust settling inside the ducts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">Air cleaner</strong>{" "}
                      &mdash; removes the contaminant from the airstream. May be
                      a filter, cyclone, scrubber, or electrostatic precipitator
                      depending on the contaminant type
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">Fan (air mover)</strong>{" "}
                      &mdash; provides the suction that draws air through the
                      entire system. Positioned after the air cleaner to protect
                      the fan from contaminated air
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">Discharge</strong> &mdash;
                      where cleaned air is released, either back into the
                      workplace (recirculated) or to the outside atmosphere. Air
                      containing carcinogenic substances must not be recirculated
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Hood Types Explained
                </p>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-violet-400">
                      Enclosing
                    </p>
                    <p className="text-white/70 text-xs">
                      Surrounds the source completely or partially. Most
                      effective type. Examples: fume cupboard, glove box,
                      enclosed spray booth
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-violet-400">
                      Receiving
                    </p>
                    <p className="text-white/70 text-xs">
                      Positioned to catch contaminants carried by a natural
                      airflow (e.g. hot fumes rising). Example: canopy hood
                      above a welding bench
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-violet-400">
                      Capturing
                    </p>
                    <p className="text-white/70 text-xs">
                      Generates enough airflow to pull contaminants toward the
                      hood against the natural dispersion. Example: flexible
                      extraction arm positioned near a grinder
                    </p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Capture velocity</strong> is the minimum air speed at the
                hood face (or at the furthest point of contaminant generation)
                needed to draw the contaminant into the hood. If the capture
                velocity is too low, contaminants escape past the hood and enter
                the worker's breathing zone. Capture velocity depends on how the
                contaminant is generated: dust released at low velocity (e.g.
                pouring powder) needs a lower capture velocity than dust thrown
                at high speed (e.g. from an angle grinder).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  COSHH Regulation 9 &mdash; LEV Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      LEV must be{" "}
                      <strong className="text-white">
                        thoroughly examined and tested
                      </strong>{" "}
                      at intervals not exceeding{" "}
                      <strong className="text-white">14 months</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Testing must be carried out by a{" "}
                      <strong className="text-white">competent person</strong>{" "}
                      (e.g. a BOHS P601/P602 qualified examiner)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      A <strong className="text-white">written report</strong>{" "}
                      of each examination must be kept for at least{" "}
                      <strong className="text-white">5 years</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Between thorough examinations, the employer must carry out{" "}
                      <strong className="text-white">
                        routine maintenance and visual checks
                      </strong>{" "}
                      to keep the system in efficient working order
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Workers must be{" "}
                      <strong className="text-white">
                        trained in the correct use
                      </strong>{" "}
                      of the LEV system and must report any defects immediately
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram 1: LEV System Components */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">
              &mdash;
            </span>
            LEV System Components
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
            <p className="text-sm font-medium text-violet-400 mb-4 text-center">
              Local Exhaust Ventilation &mdash; Component Flow Diagram
            </p>
            <div className="relative mx-auto max-w-lg">
              {/* Flow: Hood -> Duct -> Air Cleaner -> Fan -> Discharge */}
              <div className="flex flex-col gap-2">
                {/* Hood */}
                <div className="border-2 border-violet-500 rounded-lg bg-violet-500/10 p-3 text-center">
                  <p className="text-sm font-bold text-violet-400">
                    1. HOOD
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    Captures contaminant at source
                  </p>
                  <div className="flex justify-around mt-2 gap-1">
                    <div className="flex-1 border border-violet-400/40 rounded bg-violet-500/5 p-1.5">
                      <span className="text-[9px] text-violet-300 block">
                        Enclosing
                      </span>
                    </div>
                    <div className="flex-1 border border-violet-400/40 rounded bg-violet-500/5 p-1.5">
                      <span className="text-[9px] text-violet-300 block">
                        Receiving
                      </span>
                    </div>
                    <div className="flex-1 border border-violet-400/40 rounded bg-violet-500/5 p-1.5">
                      <span className="text-[9px] text-violet-300 block">
                        Capturing
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-violet-400/50" />
                </div>

                {/* Ductwork */}
                <div className="border border-white/20 rounded-lg bg-white/5 p-3 text-center">
                  <p className="text-sm font-bold text-white">2. DUCTWORK</p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    Transports contaminated air &mdash; must maintain transport
                    velocity
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-violet-400/50" />
                </div>

                {/* Air Cleaner */}
                <div className="border-2 border-violet-500 rounded-lg bg-violet-500/10 p-3 text-center">
                  <p className="text-sm font-bold text-violet-400">
                    3. AIR CLEANER
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    Removes contaminant from airstream
                  </p>
                  <div className="flex justify-around mt-2 gap-1">
                    <div className="flex-1 border border-violet-400/40 rounded bg-violet-500/5 p-1.5">
                      <span className="text-[9px] text-violet-300 block">
                        Filter
                      </span>
                    </div>
                    <div className="flex-1 border border-violet-400/40 rounded bg-violet-500/5 p-1.5">
                      <span className="text-[9px] text-violet-300 block">
                        Cyclone
                      </span>
                    </div>
                    <div className="flex-1 border border-violet-400/40 rounded bg-violet-500/5 p-1.5">
                      <span className="text-[9px] text-violet-300 block">
                        Scrubber
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-violet-400/50" />
                </div>

                {/* Fan */}
                <div className="border border-white/20 rounded-lg bg-white/5 p-3 text-center">
                  <p className="text-sm font-bold text-white">
                    4. FAN (AIR MOVER)
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    Provides suction &mdash; positioned after air cleaner to
                    protect fan
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-violet-400/50" />
                </div>

                {/* Discharge */}
                <div className="border border-white/20 rounded-lg bg-white/5 p-3 text-center">
                  <p className="text-sm font-bold text-white">5. DISCHARGE</p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    Clean air to outside or recirculated (never recirculate
                    carcinogenic substances)
                  </p>
                </div>
              </div>

              {/* Reg 9 callout */}
              <div className="mt-4 border-2 border-dashed border-violet-400/50 rounded bg-violet-500/10 p-2 text-center">
                <span className="text-[10px] sm:text-xs text-violet-400 font-medium">
                  COSHH Reg 9: Thorough examination &amp; test every 14 months
                  &mdash; records kept 5 years
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border-2 border-violet-500 bg-violet-500/10 rounded-sm" />
                <span className="text-[10px] text-white/60">
                  Key capture/cleaning stages
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border border-white/20 bg-white/5 rounded-sm" />
                <span className="text-[10px] text-white/60">
                  Transport/discharge stages
                </span>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: On-Tool Extraction & Wet Suppression */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">03</span>
            On-Tool Extraction &amp; Wet Suppression
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On-tool extraction and wet suppression are{" "}
                <strong>source controls</strong> &mdash; they capture or
                suppress dust at the exact point where it is generated by the
                tool. These methods are especially important for portable power
                tools used on construction sites where fixed LEV systems are not
                practical.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  On-Tool Extraction
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Built-in dust ports
                      </strong>{" "}
                      on saws, grinders, drills, and sanders connect to an
                      extraction unit via a hose. The extraction captures dust as
                      it is generated at the blade, disc, or bit
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        H-class vacuum required
                      </strong>{" "}
                      when cutting concrete, stone, brick, morite, or any
                      material containing silica or other hazardous substances.
                      M-class may be adequate for medium-hazard dusts only
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Connection must be secure
                      </strong>{" "}
                      &mdash; a loose or disconnected hose provides zero
                      protection. Check connections before each use. Use correct
                      adaptor sizes
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Automatic start
                      </strong>{" "}
                      &mdash; many H-class extractors have auto-start sockets
                      that power on the vacuum when the tool is switched on,
                      ensuring extraction runs whenever the tool is in use
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Wet Suppression Methods
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Water-fed cutting tools
                      </strong>{" "}
                      deliver a continuous stream of water to the blade or disc,
                      binding dust particles as they are created and preventing
                      them from becoming airborne
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Misting systems</strong>{" "}
                      produce a fine water mist in the cutting zone. Used where
                      direct water feed is not practical
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Slurry management
                      </strong>{" "}
                      &mdash; wet cutting creates a slurry of water and
                      hazardous material. This slurry{" "}
                      <strong className="text-white">
                        must be cleaned up while still wet
                      </strong>
                      . If allowed to dry, the hazardous particles become
                      airborne again, recreating the original hazard
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Limitations</strong>{" "}
                      &mdash; wet suppression alone may not reduce dust below
                      the WEL in enclosed spaces. In these situations, combine
                      wet methods with extraction and/or RPE
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Electrical Safety Reminder
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  When using wet suppression methods with electrical power tools,
                  ensure the tool is{" "}
                  <strong className="text-white">
                    designed for wet use
                  </strong>{" "}
                  and that appropriate{" "}
                  <strong className="text-white">
                    RCD protection (30mA)
                  </strong>{" "}
                  is in place. Never use water with tools not rated for wet
                  operation. Consider 110V CTE supply for site tools to reduce
                  electrical risk further.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: H-Class and M-Class Dust Extractors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">04</span>
            H-Class &amp; M-Class Dust Extractors
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dust extractors are classified by the level of filtration they
                provide. The class determines which types of dust the extractor
                is approved to handle. Using the wrong class of extractor for a
                hazardous dust provides inadequate protection and may result in
                dangerous exposure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  M-Class vs H-Class Comparison
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border border-violet-400/30 rounded-lg p-3 bg-violet-500/5">
                    <p className="text-base font-bold text-violet-400 mb-2">
                      M-Class
                    </p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                        <span>
                          Filtration:{" "}
                          <strong className="text-white">
                            99.9% at 0.3&mu;m
                          </strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                        <span>
                          Suitable for:{" "}
                          <strong className="text-white">
                            medium-hazard dusts
                          </strong>{" "}
                          with WEL &ge; 0.1 mg/m&sup3;
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                        <span>
                          Examples: general construction dust, softwood dust,
                          plaster, drywall
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                        <span>
                          Standard filter maintenance and bag disposal
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="border-2 border-violet-500 rounded-lg p-3 bg-violet-500/10">
                    <p className="text-base font-bold text-violet-400 mb-2">
                      H-Class
                    </p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                        <span>
                          Filtration:{" "}
                          <strong className="text-white">
                            99.995% at 0.3&mu;m (HEPA H13+)
                          </strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                        <span>
                          Required for:{" "}
                          <strong className="text-white">
                            high-hazard dusts
                          </strong>{" "}
                          &mdash; carcinogenic, silica, asbestos
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                        <span>
                          Examples: hardwood dust, RCS, lead, cadmium, asbestos
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Bags disposed as hazardous waste
                          </strong>{" "}
                          &mdash; sealed, labelled, authorised carrier
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  H-Class Extractor Requirements
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">HEPA filtration</strong>{" "}
                      &mdash; minimum H13 filter (99.995% efficiency at
                      0.3&mu;m particle size). This is what defines the
                      &ldquo;H&rdquo; classification
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dust-free disposal</strong>{" "}
                      &mdash; H-class extractors have sealed bag systems that
                      allow the collection bag to be removed and sealed without
                      exposing the operator to dust
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Airflow monitoring</strong>{" "}
                      &mdash; an indicator or alarm that warns when airflow drops
                      below the required level (e.g. blocked filter or full bag)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Anti-static hose</strong>{" "}
                      &mdash; prevents static build-up that could ignite
                      combustible dusts
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Filter maintenance</strong>{" "}
                      &mdash; HEPA filters must be replaced according to the
                      manufacturer&rsquo;s schedule. A clogged filter reduces
                      suction and allows dust to bypass the filter
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Hazardous Waste Disposal
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Used collection bags from H-class extractors contain
                  concentrated hazardous dust. They must be{" "}
                  <strong className="text-white">
                    sealed without releasing dust
                  </strong>
                  , placed in a labelled hazardous waste bag, and disposed of
                  through an{" "}
                  <strong className="text-white">
                    authorised hazardous waste carrier
                  </strong>
                  . Never empty, shake, or reuse H-class collection bags. Treat
                  the used bag as the hazardous substance it contains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: General Ventilation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">05</span>
            General Ventilation
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                General ventilation (also called{" "}
                <strong>dilution ventilation</strong>) works by introducing clean
                air into a workspace to dilute the concentration of airborne
                contaminants. Unlike LEV, it does not capture contaminants at
                source &mdash; it reduces their concentration by mixing them
                with large volumes of clean air.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  LEV vs General Ventilation
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-violet-500/5 rounded-lg p-3 border border-violet-400/20">
                    <p className="text-base font-bold text-violet-400 mb-1.5">
                      LEV (Local Exhaust)
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>Captures at source</li>
                      <li>Protects the individual worker</li>
                      <li>Effective for high-hazard substances</li>
                      <li>Required by COSHH for most dust/fume hazards</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-base font-bold text-white mb-1.5">
                      General Ventilation
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>Dilutes throughout the space</li>
                      <li>Reduces average concentration for all occupants</li>
                      <li>
                        Only appropriate for low-toxicity, low-concentration
                        contaminants
                      </li>
                      <li>Not sufficient on its own for hazardous dusts</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                General ventilation can be <strong>natural</strong> (open
                windows, doors, vents) or <strong>mechanical</strong> (fans,
                HVAC systems). The effectiveness is measured in{" "}
                <strong>air changes per hour (ACH)</strong> &mdash; the number
                of times the total volume of air in the space is replaced per
                hour. Workshops typically require 6&ndash;10 ACH; welding areas
                may need 10&ndash;20 ACH or more.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">When Is General Ventilation Appropriate?</strong>{" "}
                  General ventilation is appropriate as a supplementary measure
                  alongside LEV, or as the sole control only when the substance
                  has low toxicity, the emission rate is low and uniform, and the
                  worker is not close to the source. For most construction dust
                  and fume hazards, general ventilation alone is{" "}
                  <strong className="text-white">not sufficient</strong> &mdash;
                  LEV or other source controls must be the primary measure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: RPE for Dust and Fumes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">06</span>
            RPE for Dust &amp; Fumes
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Respiratory Protective Equipment (RPE) is the{" "}
                <strong>last line of defence</strong> in the COSHH hierarchy of
                control. It should only be relied upon when engineering controls
                (LEV, on-tool extraction, wet methods) cannot reduce exposure
                below the Workplace Exposure Limit on their own, or as an
                interim measure while engineering controls are being implemented.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  RPE Types &amp; Assigned Protection Factors (APFs)
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-xs text-white/40 font-medium border-b border-white/10 pb-2">
                    <span>RPE Type</span>
                    <span>APF</span>
                    <span>Typical Use</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-white/80">
                    <span className="text-white font-medium text-xs">
                      FFP1 disposable
                    </span>
                    <span className="text-xs">APF 4</span>
                    <span className="text-xs">
                      Low-hazard nuisance dust only
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-white/80">
                    <span className="text-white font-medium text-xs">
                      FFP2 disposable
                    </span>
                    <span className="text-xs">APF 10</span>
                    <span className="text-xs">
                      Medium-hazard dusts (e.g. softwood, plaster)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-white/80 bg-violet-500/5 -mx-2 px-2 py-1 rounded">
                    <span className="text-violet-400 font-medium text-xs">
                      FFP3 disposable
                    </span>
                    <span className="text-xs text-violet-300">APF 20</span>
                    <span className="text-xs">
                      High-hazard: silica, hardwood, welding fume
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-white/80">
                    <span className="text-white font-medium text-xs">
                      Half-mask + P3 filter
                    </span>
                    <span className="text-xs">APF 20</span>
                    <span className="text-xs">
                      Longer-duration work, reusable
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-white/80">
                    <span className="text-white font-medium text-xs">
                      Full-face mask + P3
                    </span>
                    <span className="text-xs">APF 40</span>
                    <span className="text-xs">
                      High concentration, eye protection needed
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-white/80 bg-violet-500/5 -mx-2 px-2 py-1 rounded">
                    <span className="text-violet-400 font-medium text-xs">
                      Powered Air (PAPR)
                    </span>
                    <span className="text-xs text-violet-300">APF 40</span>
                    <span className="text-xs">
                      Long-duration, comfort, bearded workers
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">
                  Critical RPE Rules
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Face-fit testing</strong>{" "}
                      is mandatory for all tight-fitting RPE (FFP1/2/3,
                      half-mask, full-face). An ill-fitting mask provides a
                      fraction of its rated protection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Facial hair prevents a seal
                      </strong>{" "}
                      &mdash; tight-fitting RPE cannot achieve its APF if the
                      wearer has a beard or stubble. Workers with facial hair
                      must use a PAPR (loose-fitting powered hood)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        CE/UKCA marked
                      </strong>{" "}
                      &mdash; RPE must carry the correct conformity marking and
                      be selected to match the specific hazard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Fit check every time
                      </strong>{" "}
                      &mdash; even a face-fit-tested mask must be checked for
                      seal each time it is put on (positive and negative pressure
                      checks)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Selecting the Right RPE
                </p>
                <p className="text-sm text-white/80">
                  To select the correct RPE, you need to know the{" "}
                  <strong className="text-white">
                    substance, its WEL, and the likely exposure concentration
                  </strong>
                  . Divide the expected concentration by the WEL to calculate the{" "}
                  <strong className="text-white">
                    required protection factor
                  </strong>
                  . Then choose RPE with an APF equal to or greater than the
                  required protection factor. For example, if the expected
                  exposure is 10 mg/m&sup3; and the WEL is 0.5 mg/m&sup3;, the
                  required protection factor is 20, so you need at least an FFP3
                  (APF 20).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram 2: RPE Selection Flowchart */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">
              &mdash;
            </span>
            RPE Selection Flowchart
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
            <p className="text-sm font-medium text-violet-400 mb-4 text-center">
              Selecting RPE for Dust &amp; Fume Hazards
            </p>
            <div className="relative mx-auto max-w-lg">
              <div className="flex flex-col gap-2">
                {/* Step 1: Identify */}
                <div className="border-2 border-violet-500 rounded-lg bg-violet-500/10 p-3 text-center">
                  <p className="text-sm font-bold text-violet-400">
                    IDENTIFY THE SUBSTANCE
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    What dust/fume? Check SDS for WEL and hazard classification
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-violet-400/50" />
                </div>

                {/* Step 2: Can you eliminate or substitute? */}
                <div className="border border-white/20 rounded-lg bg-white/5 p-3 text-center">
                  <p className="text-sm font-bold text-white">
                    CAN YOU ELIMINATE / SUBSTITUTE?
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    If yes &rarr; no RPE needed. If no &rarr; continue
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-violet-400/50" />
                </div>

                {/* Step 3: Engineering controls sufficient? */}
                <div className="border border-white/20 rounded-lg bg-white/5 p-3 text-center">
                  <p className="text-sm font-bold text-white">
                    LEV / EXTRACTION / WET METHODS SUFFICIENT?
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    If exposure is below WEL with engineering controls alone
                    &rarr; RPE not required
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-violet-400/50" />
                </div>

                {/* Step 4: Calculate required protection factor */}
                <div className="border-2 border-violet-500 rounded-lg bg-violet-500/10 p-3 text-center">
                  <p className="text-sm font-bold text-violet-400">
                    CALCULATE REQUIRED PROTECTION FACTOR
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    Expected concentration &divide; WEL = minimum APF needed
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-violet-400/50" />
                </div>

                {/* Decision branches */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="border border-white/20 rounded-lg bg-white/5 p-2 text-center">
                    <p className="text-[10px] font-bold text-white">
                      APF &le; 10
                    </p>
                    <p className="text-[9px] text-white/50 mt-1">FFP2</p>
                    <p className="text-[9px] text-white/50">
                      Half-mask + P2
                    </p>
                  </div>
                  <div className="border-2 border-violet-500 rounded-lg bg-violet-500/10 p-2 text-center">
                    <p className="text-[10px] font-bold text-violet-400">
                      APF &le; 20
                    </p>
                    <p className="text-[9px] text-violet-300 mt-1">FFP3</p>
                    <p className="text-[9px] text-violet-300">
                      Half-mask + P3
                    </p>
                  </div>
                  <div className="border border-white/20 rounded-lg bg-white/5 p-2 text-center">
                    <p className="text-[10px] font-bold text-white">
                      APF &le; 40
                    </p>
                    <p className="text-[9px] text-white/50 mt-1">
                      Full-face + P3
                    </p>
                    <p className="text-[9px] text-white/50">PAPR</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-violet-400/50" />
                </div>

                {/* Face fit */}
                <div className="border-2 border-red-500/60 rounded-lg bg-red-500/10 p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-red-400" />
                    <p className="text-sm font-bold text-red-400">
                      FACE-FIT TEST
                    </p>
                  </div>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    Mandatory for all tight-fitting RPE &mdash; bearded workers
                    must use PAPR
                  </p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border-2 border-violet-500 bg-violet-500/10 rounded-sm" />
                <span className="text-[10px] text-white/60">
                  Key decision points
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border-2 border-red-500/60 bg-red-500/10 rounded-sm" />
                <span className="text-[10px] text-white/60">
                  Mandatory requirement
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Fume Extraction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">07</span>
            Fume Extraction
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fumes differ from dust in that they are formed by{" "}
                <strong>
                  condensation of vaporised metal or other materials
                </strong>{" "}
                during processes such as welding, soldering, brazing, and cable
                burning. Fume particles are extremely small (typically
                &lt;1&mu;m, often &lt;0.1&mu;m) and remain airborne for extended
                periods. Their small size allows them to penetrate deep into the
                lungs and, in the case of ultrafine particles, pass into the
                bloodstream.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Welding Fume &mdash; Reclassified as Carcinogenic
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  In 2019, the International Agency for Research on Cancer
                  (IARC) reclassified{" "}
                  <strong className="text-white">
                    all welding fume as Group 1 carcinogenic
                  </strong>{" "}
                  (causes cancer in humans), regardless of the welding process or
                  material. HSE updated its guidance: welding fume must now be
                  controlled with{" "}
                  <strong className="text-white">
                    LEV or effective engineering controls
                  </strong>
                  , not RPE alone. General ventilation is not considered
                  sufficient for welding fume.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Fume Extraction Systems
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-violet-500/5 rounded-lg p-3 border border-violet-400/20">
                    <p className="text-base font-bold text-violet-400 mb-1.5">
                      Fixed Systems
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>
                        Permanently installed in workshops and welding bays
                      </li>
                      <li>
                        Ducted extraction with capture hoods or extraction arms
                      </li>
                      <li>
                        Central filtration unit with HEPA or activated carbon
                        filters
                      </li>
                      <li>
                        Provides consistent extraction for fixed workstations
                      </li>
                    </ul>
                  </div>
                  <div className="bg-violet-500/5 rounded-lg p-3 border border-violet-400/20">
                    <p className="text-base font-bold text-violet-400 mb-1.5">
                      Mobile Units
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>
                        Portable fume extractors with flexible arms
                      </li>
                      <li>
                        Used on construction sites and for maintenance work
                      </li>
                      <li>
                        Self-contained filtration (no ductwork needed)
                      </li>
                      <li>
                        Position arm within 150&ndash;200mm of the fume source
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Solder Fume Extraction
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Solder fumes contain <strong className="text-white">rosin (colophony)</strong>, which
                      is a potent respiratory sensitiser and can cause
                      <strong className="text-white"> occupational asthma</strong>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Bench-top fume extractors
                      </strong>{" "}
                      with activated carbon filters are the standard control for
                      soldering stations
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Position the extraction nozzle{" "}
                      <strong className="text-white">
                        as close to the soldering point as possible
                      </strong>{" "}
                      without obstructing the work
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Activated carbon filters have a{" "}
                      <strong className="text-white">limited lifespan</strong>{" "}
                      and must be replaced according to the manufacturer&rsquo;s
                      schedule to remain effective
                    </span>
                  </div>
                </div>
              </div>

              <p>
                For <strong>on-site welding and hot work</strong> where fixed
                extraction is not available, use a{" "}
                <strong>mobile fume extraction unit</strong> with a flexible arm
                positioned as close to the arc/flame as possible. Supplement
                with RPE (minimum FFP3 or, for prolonged work, a PAPR) where
                extraction alone cannot reduce exposure below the WEL. Remember
                that since the IARC reclassification, RPE alone is{" "}
                <strong>not considered adequate control</strong> for welding fume
                &mdash; engineering controls must always be the primary measure.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Housekeeping & COSHH Essentials */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">08</span>
            Housekeeping &amp; COSHH Essentials
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective housekeeping is one of the most underestimated controls
                for dust and fume exposure. Dust that has settled on surfaces,
                equipment, clothing, and flooring is not{" "}
                <strong>&ldquo;safe&rdquo;</strong> &mdash; it is a reservoir of
                hazardous particles waiting to be disturbed back into the air by
                foot traffic, moving equipment, wind, or inappropriate cleaning
                methods.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Three Rules of Dust Housekeeping
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <span>
                      <strong className="text-white">
                        Vacuum, never sweep
                      </strong>{" "}
                      &mdash; sweeping with a broom re-suspends fine respirable
                      particles into the air. Always use an appropriate class of
                      vacuum extractor (M-class minimum; H-class for hazardous
                      dusts)
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Damp wipe, never dry dust
                      </strong>{" "}
                      &mdash; dry dusting or using a dry cloth disperses
                      particles. Use a damp cloth or mop to capture dust on
                      surfaces and floors
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Never use compressed air for cleaning
                      </strong>{" "}
                      &mdash; blowing dust with compressed air creates a
                      concentrated airborne cloud of respirable particles that
                      can affect everyone in the area. This is one of the most
                      dangerous cleaning practices on site
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Good Housekeeping Practices
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Clean as you go
                      </strong>{" "}
                      &mdash; do not allow dust to accumulate. Clean up at
                      regular intervals during the working day, not just at the
                      end
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Keep work areas tidy
                      </strong>{" "}
                      &mdash; clutter creates surfaces where dust accumulates
                      and makes cleaning difficult
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Do not eat, drink, or smoke in dusty areas
                      </strong>{" "}
                      &mdash; dust on hands and surfaces can be ingested. Wash
                      hands and face before breaks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Change contaminated clothing
                      </strong>{" "}
                      &mdash; do not wear dusty work clothes home. Use
                      designated changing areas and, where provided, workplace
                      laundry facilities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Dispose of dust and waste correctly
                      </strong>{" "}
                      &mdash; use sealed bags and the appropriate waste stream.
                      Hazardous dust waste must go through authorised hazardous
                      waste disposal
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">
                  COSHH Essentials &mdash; Dust &amp; Fume Control Sheets
                </p>
                <p className="text-sm text-white/80">
                  HSE publishes <strong className="text-white">COSHH Essentials</strong> guidance sheets
                  that provide practical, task-specific control advice for common
                  dust and fume hazards. These sheets are available free from the
                  HSE website and cover activities including cutting, grinding,
                  sanding, welding, soldering, and general construction tasks.
                  Each sheet specifies the control measures required for the task
                  and the class of extraction, RPE, and housekeeping needed. Use
                  these sheets as part of your COSHH assessment to identify the
                  correct controls for each activity.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Remember
                </p>
                <p className="text-sm text-white/80">
                  Dust and fume control is not a single measure &mdash; it is a{" "}
                  <strong className="text-white">
                    combination of engineering controls, work practices,
                    housekeeping, and RPE
                  </strong>{" "}
                  applied in the correct hierarchy. The most effective approach
                  uses multiple layers: on-tool extraction at the source, LEV
                  for the immediate area, good housekeeping to prevent
                  accumulation, general ventilation as backup, and RPE as the
                  last line of defence. Each layer adds protection, and
                  together they keep exposure as far below the WEL as is
                  reasonably practicable.
                </p>
              </div>
            </div>
          </div>
        </section>

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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Electrical Trade Hazards
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-3-section-4">
              Next: Biological &amp; Environmental Hazards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
