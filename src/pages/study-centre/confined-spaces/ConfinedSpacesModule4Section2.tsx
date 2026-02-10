import { ArrowLeft, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "rpe-vs-ba-selection",
    question:
      "The atmosphere inside a confined space has been tested and shows an oxygen level of 18.5%. Which type of respiratory protection is required?",
    options: [
      "An FFP3 filtering facepiece — it provides the highest level of filter protection",
      "A half-mask respirator with combination filters (A2P3)",
      "Breathing apparatus (BA) — either SCBA or airline BA with escape set",
      "A powered air-purifying respirator (PAPR) with P3 filters",
    ],
    correctIndex: 2,
    explanation:
      "At 18.5%, the oxygen level is below the safe threshold of 19.5%. All filtering devices (FFP3, half-mask, full-face, and PAPR) rely on there being enough oxygen in the ambient air to breathe. They only filter out contaminants — they do NOT supply oxygen. When oxygen is below 19.5%, or the atmosphere is or may become IDLH, breathing apparatus that supplies clean air from an independent source is mandatory.",
  },
  {
    id: "harness-standard",
    question:
      "A worker is about to enter a vertical confined space via a manhole. Which standard must their full body harness comply with, and why is it critical?",
    options: [
      "EN 358 — it is designed specifically for work positioning in confined spaces",
      "EN 361 — it is a full body harness rated for fall arrest and rescue retrieval",
      "EN 795 — it is the standard for personal fall protection anchor devices",
      "EN 353 — it covers guided-type fall arresters on a rigid anchor line",
    ],
    correctIndex: 1,
    explanation:
      "EN 361 is the European standard for full body harnesses designed for fall arrest and rescue. For confined space entry, the harness must have a dorsal (back) attachment point for fall arrest AND a sternal (front/chest) or shoulder attachment point for rescue retrieval by winch or lifeline. EN 358 covers work positioning belts, not full body harnesses. The harness must be inspected before each use and formally examined by a competent person at least every 6 months.",
  },
  {
    id: "escape-set-purpose",
    question:
      "An entrant is using airline breathing apparatus connected to a compressor outside the confined space. Why must they also carry an escape set?",
    options: [
      "It provides additional comfort during long-duration entries",
      "It is required by the manufacturer for warranty purposes",
      "It provides emergency breathing air if the airline supply fails, allowing self-rescue",
      "It acts as a backup filter in case the airline air becomes contaminated",
    ],
    correctIndex: 2,
    explanation:
      "An escape set is a small, self-contained compressed air cylinder (typically providing 10 to 15 minutes of breathing air) carried by the entrant as an emergency backup. If the airline supply is cut, kinked, disconnected, or the compressor fails, the entrant must be able to breathe while making their way out of the confined space. Without an escape set, a failure of the airline supply could be immediately fatal. Escape sets must be checked before each entry and the entrant must be trained in their use.",
  },
];

const faqs = [
  {
    question:
      "Can I use an FFP3 disposable mask instead of breathing apparatus to save time?",
    answer:
      "Only if ALL of the following conditions are met: the atmosphere has been tested and confirmed to contain at least 19.5% oxygen, the contaminant has been identified and is within the filter's capability, the concentration is below the filter's rated capacity, and the atmosphere is NOT and cannot become immediately dangerous to life or health (IDLH). If there is ANY doubt about the atmosphere — particularly in spaces that have not been thoroughly tested, or spaces where conditions could change rapidly (such as sewers, tanks, or vessels) — breathing apparatus must be used. An FFP3 mask does not supply oxygen; it only filters particles from air that already contains enough oxygen to sustain life. Using an FFP3 in an oxygen-deficient atmosphere will not protect you — you will lose consciousness and die.",
  },
  {
    question:
      "How long does a typical SCBA cylinder last, and what affects the duration?",
    answer:
      "A standard open-circuit SCBA cylinder lasts between 20 and 45 minutes, depending on the cylinder size (typically 6 or 9 litres at 200 or 300 bar) and the wearer's breathing rate. Physical exertion, stress, heat, and the individual's fitness level all significantly affect air consumption. A worker performing heavy physical tasks in a hot, stressful environment may consume air two to three times faster than someone at rest. This is why SCBA duration must be planned conservatively — you must allow sufficient air for the work, plus a safety margin for unexpected delays or emergency egress. The cylinder pressure gauge must be monitored throughout the entry, and a pre-agreed 'whistle' or alarm pressure (typically when the cylinder reaches 55 bar) signals the wearer to begin exiting immediately.",
  },
  {
    question:
      "What is the difference between ATEX-rated and non-ATEX equipment?",
    answer:
      "ATEX-rated equipment is certified for use in potentially explosive atmospheres under the ATEX Directive (2014/34/EU). It is designed and manufactured to prevent it from becoming a source of ignition — for example, ATEX-rated torches are sealed to prevent sparks, and ATEX-rated radios have limited electrical energy to prevent arcing. Non-ATEX equipment may produce sparks, arcs, or hot surfaces capable of igniting flammable gases, vapours, or dusts. In any confined space where a flammable or explosive atmosphere exists or could develop — such as tanks that have held fuels, sewers where methane may be present, or vessels in chemical plants — ALL equipment taken inside must be ATEX-rated. Using non-ATEX equipment in an explosive atmosphere can cause an explosion that kills everyone in and around the space.",
  },
  {
    question:
      "How often must fall protection equipment be inspected, and by whom?",
    answer:
      "Fall protection equipment (harnesses, lanyards, lifelines, tripods, and winches) requires two levels of inspection. First, the user must carry out a visual and tactile pre-use check before every single use — examining webbing for cuts, abrasion, chemical damage, and UV degradation; checking stitching for pulled or broken threads; inspecting buckles, D-rings, and connectors for distortion, corrosion, or cracks; and confirming that the winch mechanism operates smoothly. Second, a formal detailed examination must be carried out by a competent person (someone trained and experienced in inspecting that specific type of equipment) at intervals not exceeding 6 months for equipment in regular use, or 12 months for equipment in storage. Any equipment that fails either inspection must be immediately withdrawn from service and either repaired by the manufacturer or destroyed. Equipment that has arrested a fall must be withdrawn from service and returned to the manufacturer for inspection before reuse.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "When is respiratory protective equipment (RPE) with filters suitable for use in a confined space?",
    options: [
      "Whenever the space has been ventilated with a fan for at least 10 minutes",
      "Only when the atmosphere is confirmed breathable (O₂ ≥19.5%) and the contaminant is within filter capability",
      "Whenever the entrant has been face-fit tested for the specific mask",
      "Only when the space is classified as low risk on the entry permit",
    ],
    correctAnswer: 1,
    explanation:
      "Filtering RPE (FFP3, half-mask, full-face, PAPR) is ONLY suitable when the atmosphere contains sufficient oxygen (at least 19.5%) and the contaminant has been identified and is within the filter's rated capability. Filters do not supply oxygen — they remove contaminants from air that is already breathable. If oxygen is below 19.5%, or the atmosphere is or may become IDLH, breathing apparatus must be used regardless of other factors.",
  },
  {
    id: 2,
    question:
      "What is the primary advantage of airline breathing apparatus over self-contained breathing apparatus (SCBA)?",
    options: [
      "It does not require any training to use",
      "It provides unlimited air supply with no duration limit",
      "It provides a much longer working duration because the air supply is not carried by the wearer",
      "It is lighter and therefore always more comfortable than SCBA",
    ],
    correctAnswer: 2,
    explanation:
      "The primary advantage of airline BA is duration — the air supply comes from a compressor or cylinder bank outside the confined space via a hose, so the wearer is not limited by the volume of a cylinder on their back. This allows much longer working durations compared to SCBA (which typically lasts 20-45 minutes). However, airline BA has its own limitations: the hose length restricts how far the wearer can travel, the hose can become kinked or snagged, and the wearer must carry an escape set in case the supply fails.",
  },
  {
    id: 3,
    question:
      "A full body harness for confined space entry must comply with which European standard?",
    options: [
      "EN 352 — hearing protectors",
      "EN 358 — work positioning belts",
      "EN 361 — full body harnesses for fall arrest",
      "EN 397 — industrial safety helmets",
    ],
    correctAnswer: 2,
    explanation:
      "EN 361 is the European standard for full body harnesses. For confined space work, the harness must have both a dorsal (back) D-ring for fall arrest connection and a sternal (front) or shoulder attachment point for rescue retrieval via winch or lifeline. EN 358 covers work positioning belts which are not suitable as the primary fall arrest device for vertical entry into confined spaces.",
  },
  {
    id: 4,
    question:
      "Why must ALL electrical equipment be ATEX-rated when working in a confined space with a potentially explosive atmosphere?",
    options: [
      "ATEX-rated equipment is waterproof and confined spaces are often damp",
      "ATEX-rated equipment is designed not to become an ignition source in explosive atmospheres",
      "ATEX-rated equipment is required by the Electricity at Work Regulations regardless of atmosphere",
      "ATEX-rated equipment has longer battery life for extended confined space entries",
    ],
    correctAnswer: 1,
    explanation:
      "ATEX-rated (or 'intrinsically safe') equipment is certified under the ATEX Directive (2014/34/EU) to prevent it from becoming a source of ignition. This means it is designed so that any sparks, arcs, or hot surfaces it produces cannot ignite flammable gases, vapours, mists, or dusts. In a confined space where an explosive atmosphere exists or could develop, even a tiny spark from a non-ATEX torch or radio could cause a catastrophic explosion.",
  },
  {
    id: 5,
    question:
      "An escape set carried by an airline BA user typically provides how many minutes of emergency breathing air?",
    options: [
      "2 to 5 minutes",
      "10 to 15 minutes",
      "30 to 45 minutes",
      "60 minutes or more",
    ],
    correctAnswer: 1,
    explanation:
      "Escape sets typically provide 10 to 15 minutes of emergency breathing air. This is intended to give the wearer enough time to exit the confined space in the event of an airline failure — it is not designed for working. The entrant must be trained in activating and using the escape set, and the set must be checked before every entry to ensure the cylinder is fully charged and the regulator functions correctly.",
  },
  {
    id: 6,
    question:
      "Which of the following is the correct purpose of a tripod and winch system at a confined space entry point?",
    options: [
      "To provide a stable platform for the atmospheric monitoring equipment",
      "To act as a barrier preventing unauthorised persons from entering the space",
      "To provide a mechanical advantage for raising and lowering entrants, and for emergency rescue retrieval",
      "To support the airline hose and prevent it from being kinked during entry",
    ],
    correctAnswer: 2,
    explanation:
      "A tripod and winch system is positioned over the entry point (typically a manhole or hatch) to provide a mechanical advantage for lowering the entrant into the space and, critically, for emergency rescue retrieval — pulling an incapacitated entrant out without requiring another person to enter. The winch connects to the entrant's harness via the rescue attachment point. The system must be rated for the expected load (entrant's weight plus equipment) and must be inspected before each use.",
  },
  {
    id: 7,
    question:
      "Before each use, what must the user check on a full body harness?",
    options: [
      "Only that the harness is the correct size and the buckles click shut",
      "Webbing for cuts, abrasion, and chemical damage; stitching for broken threads; buckles and D-rings for distortion or corrosion; and that all adjustment straps are present",
      "Only the expiry date printed on the label — if it has not expired, no further check is needed",
      "Only the dorsal D-ring, as this is the main attachment point",
    ],
    correctAnswer: 1,
    explanation:
      "The pre-use inspection must cover ALL components: webbing (check for cuts, fraying, abrasion, chemical damage, UV degradation, and stiffness), stitching (check for pulled, broken, or missing threads), buckles and D-rings (check for distortion, corrosion, cracks, and smooth operation), labels (check the harness is within its service life), and all adjustment straps (check they are present and functioning). Any defect means the harness must be withdrawn from service immediately.",
  },
  {
    id: 8,
    question:
      "Which communication method is most reliable in a confined space where radio signals may be blocked by the structure?",
    options: [
      "Mobile phone with a hands-free headset",
      "Shouting through the entry point opening",
      "A hardwired (cabled) communication system between entrant and top person",
      "Hand signals observed through a CCTV camera",
    ],
    correctAnswer: 2,
    explanation:
      "Hardwired communication systems use a physical cable to connect headsets worn by the entrant and the top person, providing reliable two-way voice communication that is not affected by the metal or concrete structure of the confined space. Radio signals (including mobile phone signals) can be severely attenuated or completely blocked by metal tanks, underground chambers, and thick concrete structures. Shouting is unreliable, especially when the entrant is wearing BA. CCTV may supplement communication but cannot replace two-way voice contact.",
  },
];

export default function ConfinedSpacesModule4Section2() {
  useSEO({
    title: "Personal Protective Equipment | Confined Spaces Module 4.2",
    description:
      "Selecting RPE vs breathing apparatus, SCBA and airline BA, fall protection harnesses and tripod rescue systems, ATEX-rated communication and lighting equipment for confined space entry.",
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
            <Link to="../confined-spaces-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <Shield className="h-7 w-7 text-cyan-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-400 text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Personal Protective Equipment
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Selecting the right RPE and breathing apparatus based on risk assessment, fall protection
            for vertical entry, communication systems, ATEX-rated lighting, and the critical
            importance of equipment inspection before every entry
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>RPE vs BA:</strong> RPE filters air; BA supplies clean air from an
                independent source
              </li>
              <li>
                <strong>O&#8322; &lt;19.5%:</strong> Filtering RPE is NOT suitable &mdash; breathing
                apparatus is mandatory
              </li>
              <li>
                <strong>Harness:</strong> EN 361 full body harness with rescue attachment point for
                every vertical entry
              </li>
              <li>
                <strong>Inspect:</strong> Every item of PPE must be checked before each use &mdash;
                no exceptions
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400/90 text-base font-medium mb-2">Critical Rule</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Risk assessment first:</strong> PPE selection is driven by the risk assessment
                &mdash; never one-size-fits-all
              </li>
              <li>
                <strong>ATEX zones:</strong> All equipment must be ATEX-rated in flammable or
                explosive atmospheres
              </li>
              <li>
                <strong>Escape set:</strong> Always carried with airline BA in case the supply fails
              </li>
              <li>
                <strong>Training:</strong> All PPE requires training &mdash; BA requires intensive,
                specialist training
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white/70 mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why PPE selection in confined spaces must be based on the specific risk assessment, not a generic approach",
              "Distinguish between respiratory protective equipment (RPE) and breathing apparatus (BA), and state when each is appropriate",
              "Describe the types of filtering RPE (FFP3, half-mask, full-face, PAPR) and their limitations in confined spaces",
              "Explain the operation and duration limitations of self-contained breathing apparatus (SCBA)",
              "Describe airline breathing apparatus, its advantages and limitations, and why an escape set is mandatory",
              "Identify the fall protection requirements for vertical entry including EN 361 harnesses, lifelines, tripods, and davit arms",
              "List the communication equipment options and explain why ATEX-rated equipment is required in explosive atmospheres",
              "Describe the pre-use inspection process for all confined space PPE and the formal examination intervals",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: PPE Selection Based on Risk Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            PPE Selection Based on Risk Assessment
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is no standard &ldquo;confined space PPE kit&rdquo; that can be issued to every
                worker for every entry. The PPE required for a specific confined space entry is{" "}
                <strong>determined by the risk assessment</strong> for that particular space,
                that particular task, and the hazards identified during the assessment process. Getting
                this wrong can be fatal &mdash; selecting the wrong respiratory protection, for
                example, is one of the leading causes of death in confined spaces.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Fundamental Principle:</strong> PPE is always
                  the <strong>last line of defence</strong>, not the first. Before selecting PPE,
                  the risk assessment must first consider elimination, substitution, engineering
                  controls, and administrative controls. PPE protects the individual worker only if
                  it is correctly selected, properly fitted, in good condition, and the worker is
                  trained in its use. If any one of these factors fails, the PPE fails.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Risk Assessment Must Determine:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Atmospheric hazards:</strong> Is the oxygen
                      level safe? Are toxic gases present? Are flammable gases or vapours present?
                      Could the atmosphere change during the work?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fall hazards:</strong> Is this a vertical
                      entry? What is the depth? Is the internal surface slippery, unstable, or
                      irregular?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Physical hazards:</strong> Temperature
                      extremes, noise levels, sharp edges, confined movement, contact with hazardous
                      substances?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rescue requirements:</strong> How will an
                      incapacitated person be extracted? What PPE does the rescue team need?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Duration:</strong> How long will the entry
                      last? Does the PPE provide adequate protection for the entire duration?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-400">
                    One-Size-Fits-All Kills
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Issuing the same PPE kit for every confined space entry is a dangerous shortcut.
                  A worker entering a clean water tank with verified normal atmosphere needs very
                  different PPE from a worker entering a sewer where hydrogen sulphide and methane
                  may be present, or a chemical tank where the atmosphere is oxygen-deficient. The
                  risk assessment &mdash; not convenience, not habit, not what was used last time
                  &mdash; must drive PPE selection every single time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Respiratory Protection — RPE vs BA */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Respiratory Protection &mdash; RPE vs BA
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>most critical PPE decision</strong> for any confined space entry is the
                choice of respiratory protection. There are two fundamentally different types, and
                selecting the wrong one is a life-or-death error. You must understand the distinction
                between <strong>respiratory protective equipment (RPE)</strong> and{" "}
                <strong>breathing apparatus (BA)</strong>.
              </p>

              {/* RPE vs BA Decision Tree Diagram */}
              <div className="my-6">
                <h3 className="text-cyan-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  RPE vs BA Decision Tree
                </h3>

                <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                  <div className="flex flex-col items-center gap-0">
                    {/* Question 1: Oxygen Level */}
                    <div className="w-full max-w-md bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 border border-cyan-500/40 rounded-xl p-4 text-center">
                      <p className="text-sm font-bold text-cyan-400">START HERE</p>
                      <p className="text-sm text-white mt-1">
                        Is the oxygen level confirmed at <strong>19.5% or above?</strong>
                      </p>
                    </div>

                    {/* Branch */}
                    <div className="flex w-full max-w-md justify-between px-8 sm:px-16">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-green-400/50" />
                        <span className="text-[10px] sm:text-xs text-green-400 font-bold">YES</span>
                        <div className="w-0.5 h-4 bg-green-400/50" />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-red-400/50" />
                        <span className="text-[10px] sm:text-xs text-red-400 font-bold">NO</span>
                        <div className="w-0.5 h-4 bg-red-400/50" />
                      </div>
                    </div>

                    <div className="flex w-full max-w-md gap-3">
                      {/* YES path */}
                      <div className="flex-1 flex flex-col items-center gap-0">
                        <div className="w-full bg-gradient-to-r from-amber-500/20 to-amber-400/20 border border-amber-500/40 rounded-xl p-3 text-center">
                          <p className="text-xs font-bold text-amber-400">QUESTION 2</p>
                          <p className="text-[11px] sm:text-xs text-white/80 mt-1">
                            Is the atmosphere IDLH or could it become IDLH?
                          </p>
                        </div>
                        <div className="flex w-full justify-between px-4 sm:px-8">
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-3 bg-red-400/50" />
                            <span className="text-[9px] sm:text-[10px] text-red-400 font-bold">YES</span>
                            <div className="w-0.5 h-3 bg-red-400/50" />
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-3 bg-green-400/50" />
                            <span className="text-[9px] sm:text-[10px] text-green-400 font-bold">NO</span>
                            <div className="w-0.5 h-3 bg-green-400/50" />
                          </div>
                        </div>
                        <div className="flex w-full gap-2">
                          <div className="flex-1 bg-red-500/20 border border-red-400/30 rounded-lg p-2 text-center">
                            <p className="text-[10px] sm:text-xs font-bold text-red-400">BA</p>
                            <p className="text-[9px] sm:text-[10px] text-white/60">Required</p>
                          </div>
                          <div className="flex-1 bg-green-500/20 border border-green-400/30 rounded-lg p-2 text-center">
                            <p className="text-[10px] sm:text-xs font-bold text-green-400">RPE</p>
                            <p className="text-[9px] sm:text-[10px] text-white/60">May be suitable</p>
                          </div>
                        </div>
                      </div>

                      {/* NO path */}
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-red-500/20 border border-red-400/30 rounded-xl p-3 text-center h-full flex flex-col justify-center">
                          <p className="text-xs font-bold text-red-400">BA REQUIRED</p>
                          <p className="text-[11px] sm:text-xs text-white/70 mt-1">
                            Filtering RPE cannot supply oxygen. SCBA or airline BA mandatory.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-white/5 border border-cyan-500/30 rounded-lg p-3">
                    <p className="text-cyan-300 text-xs sm:text-sm font-medium">
                      If in doubt, always default to <strong className="text-white">breathing apparatus</strong>.
                      An incorrect decision to use filtering RPE in an atmosphere that is oxygen-deficient,
                      toxic at IDLH levels, or unknown composition will result in loss of consciousness
                      and death within minutes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  RPE (Filtering Devices) &mdash; When Atmosphere Is Breathable but Contaminated
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Filtering RPE draws in ambient air and removes contaminants through a filter.{" "}
                  <strong className="text-white">It does NOT supply oxygen.</strong> It is only
                  suitable when the atmosphere contains at least 19.5% oxygen AND the contaminant is
                  identified and within the filter&rsquo;s rated capability AND the atmosphere is NOT
                  and cannot become IDLH.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">FFP3 Filtering Facepiece</p>
                      <p className="text-white/60">
                        Disposable half-mask with integrated filter. Assigned Protection Factor (APF)
                        of 20. Suitable for particles only (dust, mist, fume). Not suitable for gases
                        or vapours. Single use. Must be face-fit tested.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Half-Mask with Replaceable Filters</p>
                      <p className="text-white/60">
                        Reusable facepiece covering nose and mouth. APF of 10 (with P3 filter, APF 20).
                        Can accept particle filters, gas/vapour filters, or combination filters depending
                        on the hazard. Must be face-fit tested to the individual wearer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Full-Face Mask with Filters</p>
                      <p className="text-white/60">
                        Covers the entire face including eyes. APF of 40. Provides both respiratory and
                        eye protection. Uses the same replaceable filter cartridges as half-masks. Better
                        seal than half-masks. Must be face-fit tested.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Powered Air-Purifying Respirator (PAPR)
                      </p>
                      <p className="text-white/60">
                        Battery-powered fan draws air through filters and delivers it to the facepiece
                        or hood under positive pressure. APF varies (typically 20&ndash;40 for tight-fitting,
                        up to 40 for loose-fitting hoods). Reduces breathing effort compared to
                        non-powered masks. More comfortable for extended wear. Does NOT supply oxygen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-400">
                    When Filtering RPE Must NOT Be Used
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Oxygen below 19.5%</strong> &mdash; filters
                      cannot add oxygen to air that does not contain enough
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">IDLH atmosphere</strong> &mdash; immediately
                      dangerous to life or health concentrations overwhelm filter capacity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Unknown atmosphere</strong> &mdash; if you
                      do not know what is in the air, you cannot select the correct filter
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Atmosphere may change rapidly</strong> &mdash;
                      conditions inside confined spaces can deteriorate without warning
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Breathing Apparatus (BA) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Breathing Apparatus (BA)
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Breathing apparatus</strong> supplies clean, breathable air from an
                independent source &mdash; completely independent of the ambient atmosphere inside
                the confined space. BA is required whenever the atmosphere is or may become oxygen-deficient,
                toxic at IDLH levels, or of unknown composition. There are two main types used in
                confined space work: self-contained breathing apparatus (SCBA) and airline breathing
                apparatus.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Self-Contained Breathing Apparatus (SCBA)
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  SCBA consists of a compressed air cylinder carried on the wearer&rsquo;s back,
                  connected to a full facepiece via a demand valve and regulator. The most common
                  type is <strong className="text-white">open-circuit SCBA</strong>, where exhaled
                  air is vented to atmosphere (not recycled).
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cylinder sizes:</strong> Typically 6-litre or
                      9-litre cylinders charged to 200 or 300 bar
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Duration:</strong> Typically 20 to 45 minutes
                      depending on cylinder size and the wearer&rsquo;s breathing rate. Physical
                      exertion, heat, and stress dramatically increase air consumption
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pressure gauge:</strong> Must be monitored
                      throughout the entry. A low-pressure warning whistle activates at approximately
                      55 bar, signalling the wearer to begin exiting immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Weight:</strong> A fully charged SCBA set weighs
                      approximately 12&ndash;16 kg, which restricts mobility in tight spaces
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Training:</strong> SCBA requires intensive,
                      specialist training including donning and doffing under simulated emergency
                      conditions, confined space exercises, and regular refresher training
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Airline Breathing Apparatus
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Airline BA supplies compressed air to the wearer via a flexible hose from a clean
                  source outside the confined space &mdash; either a compressor with appropriate
                  filtration or a cylinder bank.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Duration:</strong> Much longer than SCBA because
                      the air supply is not carried by the wearer. Working duration is limited by
                      fatigue, not air supply
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hose length limitation:</strong> The wearer is
                      tethered to the airline hose, restricting how far they can move inside the space.
                      Maximum hose lengths are specified by the manufacturer (typically up to 30&ndash;50
                      metres)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hose management:</strong> The airline hose must
                      be routed to avoid kinking, snagging, crushing, or damage from sharp edges. A
                      dedicated person may be needed to manage the hose
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Air quality:</strong> The compressor intake must
                      be positioned in clean air, away from engine exhausts, chemical vents, or
                      contaminated areas. Air filtration must remove oil, moisture, and contaminants
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-400">
                    Escape Sets &mdash; Mandatory with Airline BA
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Every person using airline breathing apparatus <strong className="text-white">must
                  carry an escape set</strong>. An escape set is a small self-contained compressed
                  air cylinder, typically providing <strong className="text-white">10 to 15 minutes</strong>{" "}
                  of emergency breathing air.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      If the airline supply fails (hose cut, kinked, disconnected, or compressor
                      failure), the escape set provides breathing air while the wearer exits the space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The escape set is for <strong className="text-white">egress only</strong> &mdash;
                      it is not designed for continued working. The entrant must begin exiting immediately
                      upon activating the escape set
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The escape set must be checked before every entry to confirm the cylinder is fully
                      charged and the activation mechanism works
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The entrant must be trained in activating the escape set quickly, including under
                      stress and in reduced visibility
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Fall Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Fall Protection
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many confined spaces are accessed via <strong>vertical entry</strong> &mdash;
                manholes, hatches, and openings in the top of tanks or vessels. Fall protection is{" "}
                <strong>mandatory</strong> for vertical entry. The fall protection system also serves
                a dual purpose: it provides the connection point for{" "}
                <strong>emergency rescue retrieval</strong>, allowing the standby person to extract
                an incapacitated entrant without entering the space.
              </p>

              {/* Fall Protection Setup Diagram */}
              <div className="my-6">
                <h3 className="text-cyan-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Fall Protection Setup at Entry Point
                </h3>

                <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                  {/* Schematic Layout */}
                  <div className="flex flex-col items-center gap-1">
                    {/* Tripod / Top Structure */}
                    <div className="w-full max-w-sm bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 border border-cyan-500/40 rounded-xl p-3 text-center">
                      <p className="text-sm font-bold text-cyan-400">TRIPOD / DAVIT ARM</p>
                      <p className="text-[11px] sm:text-xs text-white/70">
                        Positioned over entry point. Supports winch. Rated for entrant weight + equipment.
                        Must be stable and level on firm ground.
                      </p>
                    </div>

                    <div className="flex flex-col items-center py-0.5">
                      <div className="w-0.5 h-3 bg-cyan-400/40" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-cyan-400/40" />
                    </div>

                    {/* Winch */}
                    <div className="w-full max-w-xs bg-gradient-to-r from-amber-500/20 to-amber-400/20 border border-amber-500/40 rounded-xl p-3 text-center">
                      <p className="text-sm font-bold text-amber-400">RESCUE WINCH</p>
                      <p className="text-[11px] sm:text-xs text-white/70">
                        Mounted on tripod head. Operated by top person. Cable connects to entrant&rsquo;s
                        harness. Can lower, hold, and raise the entrant.
                      </p>
                    </div>

                    <div className="flex flex-col items-center py-0.5">
                      <div className="w-0.5 h-3 bg-amber-400/40" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-amber-400/40" />
                    </div>

                    {/* Lifeline / Cable */}
                    <div className="w-full max-w-xs bg-white/5 border border-white/20 rounded-xl p-3 text-center">
                      <p className="text-sm font-bold text-white/90">LIFELINE / CABLE</p>
                      <p className="text-[11px] sm:text-xs text-white/60">
                        Wire rope or webbing connects winch to harness. Passes through entry point opening.
                        Must not snag on obstructions inside the space.
                      </p>
                    </div>

                    <div className="flex flex-col items-center py-0.5">
                      <div className="w-0.5 h-3 bg-white/30" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/30" />
                    </div>

                    {/* Harness */}
                    <div className="w-full max-w-xs bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/40 rounded-xl p-3 text-center">
                      <p className="text-sm font-bold text-green-400">EN 361 FULL BODY HARNESS</p>
                      <p className="text-[11px] sm:text-xs text-white/70">
                        Worn by entrant. Dorsal D-ring for fall arrest. Sternal/shoulder attachment
                        for rescue retrieval. Leg loops and chest strap distribute load.
                      </p>
                    </div>

                    <div className="flex flex-col items-center py-0.5">
                      <div className="w-0.5 h-3 bg-green-400/40" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-green-400/40" />
                    </div>

                    {/* Entrant */}
                    <div className="w-full max-w-xs bg-gradient-to-r from-purple-500/20 to-purple-400/20 border border-purple-500/40 rounded-xl p-3 text-center">
                      <p className="text-sm font-bold text-purple-400">ENTRANT</p>
                      <p className="text-[11px] sm:text-xs text-white/70">
                        Inside confined space. Wearing full body harness, BA or RPE, hard hat, overalls,
                        and all other required PPE. In constant communication with top person.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-white/5 border border-cyan-500/30 rounded-lg p-3">
                    <p className="text-cyan-300 text-xs sm:text-sm font-medium">
                      The top person must be able to initiate rescue retrieval{" "}
                      <strong className="text-white">without entering the space</strong>. If the
                      entrant becomes incapacitated, the winch is used to raise them to the entry
                      point. This is why the harness must have a rescue attachment point &mdash;
                      not just a fall arrest point.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Full Body Harness (EN 361)
                </h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mandatory for vertical entry:</strong> A full
                      body harness distributes arrest and retrieval forces across the shoulders, chest,
                      and thighs, preventing spinal injury
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dorsal attachment (back):</strong> Used for fall
                      arrest. Keeps the wearer upright if a fall occurs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sternal/shoulder attachment (front):</strong>{" "}
                      Used for rescue retrieval. Keeps the casualty in a position that allows
                      extraction through narrow openings such as manholes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Correct fit:</strong> All straps must be
                      adjusted to fit snugly over the work clothing and any other equipment (such as
                      BA). Loose straps can cause the wearer to slip through the harness during rescue
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Tripods, Davit Arms &amp; Permanent Anchor Points
                </h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tripod:</strong> A portable three-legged frame
                      placed over the entry point. Supports the rescue winch at its apex. Legs must
                      be on firm, level ground. The tripod must be rated for the maximum expected load
                      (entrant + equipment). Tripods are the most common rescue system for manhole
                      entries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Davit arm:</strong> A fixed or semi-permanent
                      arm mounted adjacent to the entry point, typically bolted to a base socket set
                      into the ground or structure. Provides a fixed overhead anchor point for the
                      winch. Used where frequent entries are made to the same location
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Permanent anchor points:</strong> Structural
                      fixings (eyebolts, anchor plates) certified to support the required load. Must
                      be installed by a competent person, load-tested, and periodically inspected.
                      Common on industrial tanks, vessels, and silos
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Communication Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">05</span>
            Communication Equipment
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Continuous communication</strong> between the entrant and the top person
                (standby person) is a fundamental requirement of safe confined space working.
                Communication must be maintained at all times &mdash; if communication is lost, the
                entrant must exit the space immediately and the entry must not resume until
                communication is restored.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Communication Methods
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Two-Way Radios</p>
                      <p className="text-white/60">
                        Portable radio sets that allow voice communication without physical connection.
                        Must be <strong className="text-white">ATEX-rated</strong> if used in flammable
                        or explosive atmospheres. Signal may be weak or lost inside metal tanks, deep
                        chambers, or concrete structures. Test signal strength before entry.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Hardwired (Cabled) Systems</p>
                      <p className="text-white/60">
                        Headsets connected by a physical cable between the entrant and the top person.
                        The most reliable method because the signal is not affected by the structure.
                        Ideal for metal tanks, underground chambers, and deep vessels where radio
                        signals fail. Cable must be routed to avoid snagging or damage.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Visual Signals</p>
                      <p className="text-white/60">
                        Pre-agreed hand signals or torch signals used as a secondary or backup
                        method. Only effective when the top person has a clear line of sight to the
                        entrant. Not suitable as the primary communication method for deep or complex
                        spaces.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Tug-Line Communication</p>
                      <p className="text-white/60">
                        A simple rope system using pre-agreed tug signals between the entrant and the
                        top person. For example: 1 tug = &ldquo;are you OK?&rdquo; / 1 tug response
                        = &ldquo;yes, I am OK&rdquo;; 2 tugs = &ldquo;I am coming out&rdquo;;
                        3 tugs = &ldquo;take up slack&rdquo;; 4 tugs = &ldquo;emergency &mdash;
                        help needed&rdquo;. Used as a backup when voice communication is not available
                        or has failed. All parties must be briefed on the agreed signals before entry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Best Practice:</strong> Use{" "}
                  <strong>at least two communication methods</strong> &mdash; a primary method
                  (hardwired or radio) and a backup method (tug-line or visual signals). If the
                  primary method fails, the backup allows the entrant to signal for extraction.
                  Communication equipment must be tested immediately before entry, not assumed
                  to be working from a previous occasion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Lighting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">06</span>
            Lighting
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Most confined spaces have little or no natural light. Adequate lighting is essential
                for safe working, hazard identification, and reading instruments (such as atmospheric
                monitors and pressure gauges). The type of lighting selected must be appropriate for
                the environment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Lighting Requirements
                </h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Head torches:</strong> Hands-free lighting
                      is essential in confined spaces where both hands may be needed for climbing,
                      holding tools, or operating equipment. A head-mounted torch with adjustable
                      beam angle is the standard choice for entrants
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">ATEX-rated lighting:</strong> In any confined
                      space where a flammable or explosive atmosphere exists or could develop, ALL
                      lighting must be ATEX-rated (intrinsically safe). Standard torches can produce
                      sparks when switched on/off or if the lens is broken, which could ignite an
                      explosive atmosphere
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Adequate illumination levels:</strong> The
                      lighting must provide sufficient illumination for the specific task being carried
                      out. Moving through the space safely requires different illumination from detailed
                      inspection or electrical work. Additional task lighting may be required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Battery condition:</strong> Check that batteries
                      are fully charged and that the torch has sufficient capacity for the planned
                      entry duration plus a safety margin. Carry a spare torch as a backup
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-400">
                    ATEX Compliance Is Not Optional
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Using a non-ATEX torch in an explosive atmosphere is equivalent to taking an open
                  flame into the space. ATEX-rated torches are sealed to prevent internal sparking
                  and have limited surface temperatures to prevent ignition of flammable gases or
                  vapours. If the risk assessment identifies any possibility of a flammable atmosphere,
                  all lighting and electrical equipment must be ATEX-rated. There are no exceptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Protective Clothing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">07</span>
            Protective Clothing &amp; Other PPE
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond respiratory protection, fall protection, communications, and lighting, the
                risk assessment may require additional protective clothing and equipment. The
                specific items depend on the hazards identified &mdash; there is no single
                &ldquo;standard&rdquo; clothing set for all confined space entries.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Clothing &amp; Body Protection
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1.5">Coveralls</p>
                    <p className="text-white/60 text-xs">
                      Standard or disposable coveralls protect against dirt, dust, and minor
                      contamination. Chemical-resistant suits (e.g. Type 3/4/5/6) are required when
                      the risk assessment identifies contact with hazardous substances.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1.5">Chemical-Resistant Suits</p>
                    <p className="text-white/60 text-xs">
                      Required when there is a risk of contact with corrosive liquids, solvents, or
                      hazardous chemicals. The suit type must match the specific chemical hazard
                      identified. Fully encapsulated gas-tight suits (Type 1) may be needed for the
                      most hazardous environments.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1.5">Anti-Static Clothing</p>
                    <p className="text-white/60 text-xs">
                      Required in ATEX zones where a static discharge could ignite flammable gases,
                      vapours, or dusts. Anti-static clothing prevents the build-up of static
                      electricity on the wearer. Standard synthetic fabrics can generate dangerous
                      static charges.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1.5">Gloves &amp; Footwear</p>
                    <p className="text-white/60 text-xs">
                      Gloves matched to the hazard: chemical-resistant, cut-resistant, heat-resistant,
                      or general purpose. Safety boots with steel or composite toe caps. Anti-static
                      or ESD-rated footwear in ATEX zones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Head, Eye, Hearing &amp; Knee Protection
                </h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Head protection:</strong> Industrial safety
                      helmet (EN 397) to protect against head injury from low ceilings, projections,
                      and falling objects. In confined spaces with very restricted headroom, a bump
                      cap may be appropriate instead. The helmet must be compatible with other PPE
                      (head torch, hearing protection, respiratory protection)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Eye protection:</strong> Safety goggles or
                      glasses to protect against splashes, dust, or debris. A full-face respirator
                      provides integral eye protection. If chemical splashes are a risk and a half-mask
                      or FFP3 is being used, separate chemical splash goggles are needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hearing protection:</strong> Required where
                      noise levels inside the space exceed 80 dB(A) &mdash; for example, from
                      ventilation fans, power tools, or resonance within metal tanks. Earplugs or
                      earmuffs as identified by the noise assessment. Must be compatible with
                      communication equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Knee pads:</strong> Recommended for any entry
                      where the entrant will be crawling or kneeling on hard, rough, or contaminated
                      surfaces. Reduce fatigue and prevent knee injury in restricted spaces
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Equipment Inspection Before Each Use */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">08</span>
            Equipment Inspection Before Each Use
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Every single item of PPE</strong> must be inspected before each use. This is
                not a suggestion &mdash; it is a requirement. Equipment that was working yesterday
                may have been damaged in transit, storage, or during a previous use. A pre-use
                inspection takes minutes; the consequences of using defective equipment in a confined
                space can be fatal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Pre-Use Inspection Checklist
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Breathing Apparatus (SCBA / Airline)</p>
                      <p className="text-white/60">
                        Check cylinder pressure is at the required level. Test the demand valve and
                        regulator for correct operation. Inspect the facepiece for cracks, tears, and
                        damage to the visor. Check all hose connections are secure and undamaged. For
                        airline BA: check the hose for cuts, kinks, and connector integrity. Test the
                        escape set cylinder pressure and activation mechanism.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">RPE (Masks and Filters)</p>
                      <p className="text-white/60">
                        Check facepiece for cracks, deformation, and damage. Inspect head straps for
                        elasticity and condition. Verify filters are the correct type for the identified
                        hazard and are within their service life. Perform a positive and negative
                        pressure face seal check. Confirm the user has a current face-fit test
                        certificate for this specific make and model.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Full Body Harness</p>
                      <p className="text-white/60">
                        Inspect all webbing for cuts, fraying, abrasion, chemical damage, and UV
                        degradation. Check stitching for pulled or broken threads. Examine buckles
                        and D-rings for distortion, corrosion, or cracks. Verify the harness is
                        within its formal examination date (maximum 6 months for equipment in regular
                        use). Check all labels are legible.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Tripod, Winch &amp; Lifeline</p>
                      <p className="text-white/60">
                        Check tripod legs for damage, correct locking, and stability. Inspect the
                        winch mechanism for smooth operation in both raise and lower directions. Check
                        the wire rope or webbing for fraying, kinks, and damage. Verify the braking
                        mechanism holds securely. Confirm the system is within its formal examination
                        date.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Communication Equipment</p>
                      <p className="text-white/60">
                        Test all communication equipment before entry. For radios: check battery
                        charge, confirm signal clarity at the planned working distance, verify ATEX
                        certification if required. For hardwired systems: check cable for damage,
                        test audio clarity. For tug-lines: confirm both parties understand the agreed
                        signal code.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Lighting &amp; Other Equipment</p>
                      <p className="text-white/60">
                        Check torch operation and battery charge. Verify ATEX rating if required.
                        Inspect all other PPE items: helmet for cracks, goggles for scratches or
                        damage, gloves for holes or degradation. Any defective item must be
                        immediately withdrawn and replaced &mdash; never enter a confined space
                        with defective PPE.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Formal Examination Intervals
                </h3>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-2 gap-px bg-white/10 rounded-lg overflow-hidden min-w-[300px]">
                    <div className="bg-cyan-500/10 p-3">
                      <p className="text-xs font-semibold text-cyan-400">Equipment</p>
                    </div>
                    <div className="bg-cyan-500/10 p-3">
                      <p className="text-xs font-semibold text-cyan-400">Maximum Interval</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-3">
                      <p className="text-xs text-white/80">Fall protection (harnesses, lanyards, lifelines)</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-3">
                      <p className="text-xs text-white/80">6 months (regular use) / 12 months (storage)</p>
                    </div>
                    <div className="bg-[#1e1e1e] p-3">
                      <p className="text-xs text-white/80">Tripods and winches</p>
                    </div>
                    <div className="bg-[#1e1e1e] p-3">
                      <p className="text-xs text-white/80">6 months (regular use) / 12 months (storage)</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-3">
                      <p className="text-xs text-white/80">Breathing apparatus sets</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-3">
                      <p className="text-xs text-white/80">Per manufacturer&rsquo;s schedule (typically annually)</p>
                    </div>
                    <div className="bg-[#1e1e1e] p-3">
                      <p className="text-xs text-white/80">Gas detection equipment</p>
                    </div>
                    <div className="bg-[#1e1e1e] p-3">
                      <p className="text-xs text-white/80">Calibrated per manufacturer (typically 6 months)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-400">
                    Defective Equipment = No Entry
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If any item of PPE fails the pre-use inspection, it must be{" "}
                  <strong className="text-white">immediately withdrawn from service</strong> and
                  either returned to the manufacturer for repair or destroyed. The entry must NOT
                  proceed until replacement equipment is available and has passed inspection.
                  Equipment that has been involved in a fall arrest event must be withdrawn
                  from service and returned to the manufacturer for detailed examination before
                  reuse &mdash; even if it appears undamaged, internal components may have been
                  stressed beyond their safe limits.
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Record Keeping:</strong> All pre-use inspections
                  and formal examinations must be recorded. Records should include the date of
                  inspection, the equipment serial number, the name of the inspector, the result
                  (pass/fail), and any actions taken. These records provide evidence of compliance
                  and traceability in the event of an incident or HSE investigation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-4-section-3">
              Next: Working Inside Confined Spaces
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
