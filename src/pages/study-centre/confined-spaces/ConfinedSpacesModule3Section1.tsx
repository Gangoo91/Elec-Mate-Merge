import { ArrowLeft, Wind, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cs-o2-first-alarm",
    question:
      "At what oxygen level does the first alarm typically trigger on a gas monitor?",
    options: ["20.9%", "19.5%", "18%", "16%"],
    correctIndex: 1,
    explanation:
      "The first low-oxygen alarm on a four-gas monitor is normally set at 19.5% O\u2082. This is the minimum safe working level defined by UK standards. Normal atmospheric oxygen is 20.9%, so a drop of just 1.4% should already trigger the alarm and prompt immediate evacuation.",
  },
  {
    id: "cs-h2s-olfactory",
    question:
      "Why is it dangerous to rely on smell to detect hydrogen sulphide (H\u2082S)?",
    options: [
      "H\u2082S has no smell at all",
      "Olfactory fatigue occurs above roughly 100 ppm \u2014 you can no longer smell it",
      "H\u2082S smells pleasant at high concentrations",
      "The rotten-egg odour only develops after several hours of exposure",
    ],
    correctIndex: 1,
    explanation:
      "Hydrogen sulphide has a strong rotten-egg smell at low concentrations, but above approximately 100 ppm it causes olfactory fatigue \u2014 the nerve endings in the nose become overwhelmed and the victim can no longer detect the gas. This makes smell an unreliable and potentially fatal method of detection. Instrument monitoring is essential.",
  },
  {
    id: "cs-lel-uel",
    question:
      "A gas reading of 25% LEL means the atmosphere contains what fraction of the gas needed to reach the Lower Explosive Limit?",
    options: [
      "25% of the total atmosphere is the flammable gas",
      "A quarter of the concentration needed to ignite",
      "The gas is at 25% of its Upper Explosive Limit",
      "The space is already above the explosive range",
    ],
    correctIndex: 1,
    explanation:
      "A reading of 25% LEL means the flammable gas is at one quarter of the concentration required to form an explosive mixture. For methane (LEL 5%), 25% LEL equates to 1.25% methane in air. Action levels are typically set at 10% LEL (evacuate) and 20% LEL (immediate withdrawal), so 25% LEL is already a serious emergency.",
  },
];

const faqs = [
  {
    question:
      "Can I enter a confined space briefly without testing the atmosphere?",
    answer:
      "No. Under no circumstances should anyone enter a confined space without first testing the atmosphere using a properly calibrated multi-gas detector. Atmospheric hazards are invisible and can render a person unconscious in seconds. Even a quick look inside is potentially fatal \u2014 many confined-space fatalities have occurred during brief, unplanned entries. Pre-entry atmospheric testing is a legal requirement under the Confined Spaces Regulations 1997.",
  },
  {
    question:
      "What is the difference between a toxic gas and an asphyxiant gas?",
    answer:
      "A toxic gas actively poisons the body even at low concentrations \u2014 it damages cells, disrupts biochemical processes, or prevents oxygen uptake. Carbon monoxide and hydrogen sulphide are common toxic gases. An asphyxiant gas (sometimes called a simple asphyxiant) is not inherently toxic but is dangerous because it displaces oxygen. Nitrogen and carbon dioxide are examples. In a confined space, an asphyxiant can reduce oxygen levels below the point needed to sustain consciousness and life, with no warning symptoms before collapse.",
  },
  {
    question: "Why does DSEAR matter for confined-space work?",
    answer:
      "The Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR) require employers to assess and control risks from flammable or explosive atmospheres. In confined spaces, flammable gases, vapours, or dusts may accumulate to form explosive mixtures. DSEAR, together with the ATEX Workplace Directive, requires hazardous-area classification, elimination of ignition sources, use of intrinsically safe (Ex-rated) equipment, and adequate ventilation. Any hot work in or near a confined space must follow a formal hot-work permit system.",
  },
  {
    question:
      "How quickly can a confined-space atmosphere become dangerous?",
    answer:
      "Extremely quickly. In a poorly ventilated confined space, oxygen can be depleted to lethal levels within minutes by processes such as rusting steel, microbial decomposition, or displacement by an inert gas. Toxic gases can build up to immediately dangerous concentrations (IDLH) in seconds if a source is active. This is why continuous atmospheric monitoring \u2014 not just pre-entry testing \u2014 is essential for the entire duration of entry. The atmosphere can change at any time due to work activities, disturbance of sediment, temperature changes, or the introduction of materials.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the normal percentage of oxygen in the atmosphere at sea level?",
    options: ["16%", "19.5%", "20.9%", "23.5%"],
    correctAnswer: 2,
    explanation:
      "Normal atmospheric oxygen at sea level is 20.9%. The remainder is approximately 78.1% nitrogen, 0.04% carbon dioxide, and trace amounts of argon and other gases. Any deviation from 20.9% in a confined space indicates atmospheric contamination and must be investigated.",
  },
  {
    id: 2,
    question:
      "Which of the following is a cause of oxygen depletion in a confined space?",
    options: [
      "Oxygen-enriched supply lines",
      "Electrolysis of water",
      "Rusting of steel walls and fittings",
      "Use of intrinsically safe equipment",
    ],
    correctAnswer: 2,
    explanation:
      "Rusting (oxidation) consumes oxygen. In a sealed or poorly ventilated confined space, the oxidation of steel walls, fittings, bolts, and other metalwork can steadily deplete oxygen to dangerous levels. Other causes include biological activity (bacteria, decomposition), combustion, and displacement by other gases such as nitrogen or carbon dioxide.",
  },
  {
    id: 3,
    question:
      "What is the UK Workplace Exposure Limit (WEL) for carbon monoxide as an 8-hour TWA?",
    options: ["5 ppm", "20 ppm", "50 ppm", "100 ppm"],
    correctAnswer: 1,
    explanation:
      "The UK WEL for carbon monoxide is 20 ppm as an 8-hour time-weighted average (TWA), with a 15-minute short-term exposure limit (STEL) of 100 ppm. Carbon monoxide is colourless and odourless, making it impossible to detect without instruments. It binds to haemoglobin approximately 200 times more readily than oxygen.",
  },
  {
    id: 4,
    question:
      "Above what oxygen concentration does the risk of fire and explosion become significantly elevated?",
    options: ["19.5%", "20.9%", "21.5%", "23.5%"],
    correctAnswer: 3,
    explanation:
      "Above 23.5% oxygen, the atmosphere is considered oxygen-enriched. In an enriched atmosphere, materials that would not normally burn can ignite easily, flames spread faster, and extinguishing fires becomes much more difficult. Causes include leaking oxygen supply lines and electrolysis processes. Oxygen-enriched atmospheres are extremely dangerous in confined spaces.",
  },
  {
    id: 5,
    question:
      "Hydrogen sulphide (H\u2082S) has a WEL of 5 ppm (TWA). At what approximate concentration does olfactory fatigue occur?",
    options: ["5 ppm", "20 ppm", "100 ppm", "500 ppm"],
    correctAnswer: 2,
    explanation:
      "Olfactory fatigue \u2014 the inability to smell hydrogen sulphide \u2014 occurs at approximately 100 ppm. Below this level, H\u2082S has a characteristic rotten-egg smell, but at 100 ppm and above the olfactory nerve is overwhelmed and the victim loses the ability to detect the gas. This makes H\u2082S particularly treacherous: the absence of smell does NOT mean the absence of gas.",
  },
  {
    id: 6,
    question: "What is the Lower Explosive Limit (LEL) of methane?",
    options: ["1%", "2.1%", "5%", "15%"],
    correctAnswer: 2,
    explanation:
      "The Lower Explosive Limit (LEL) of methane is 5% by volume in air. Below 5%, the mixture is too lean to ignite. Above the Upper Explosive Limit (UEL) of 15%, the mixture is too rich. Between 5% and 15%, the methane-air mixture can be ignited by a source of ignition. Gas monitors typically alarm at 10% and 20% of the LEL (i.e. 0.5% and 1% methane).",
  },
  {
    id: 7,
    question:
      "Which regulation specifically addresses the control of flammable and explosive atmospheres in UK workplaces?",
    options: [
      "Control of Substances Hazardous to Health Regulations 2002",
      "Confined Spaces Regulations 1997",
      "Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR)",
      "Electricity at Work Regulations 1989",
    ],
    correctAnswer: 2,
    explanation:
      "The Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR) implement the ATEX Workplace Directive in the UK. DSEAR requires employers to assess and control risks from flammable or explosive atmospheres, classify hazardous areas into zones, eliminate ignition sources, and use appropriately rated (Ex) equipment. DSEAR applies to all workplaces, but is especially relevant to confined-space work where flammable gases may accumulate.",
  },
  {
    id: 8,
    question:
      "Nitrogen (N\u2082) is dangerous in confined spaces primarily because it:",
    options: [
      "Is toxic to the lungs at any concentration",
      "Displaces oxygen without any warning smell or symptoms before collapse",
      "Is heavier than air and forms a visible layer at floor level",
      "Reacts with carbon dioxide to form a toxic compound",
    ],
    correctAnswer: 1,
    explanation:
      "Nitrogen is a simple asphyxiant: it is not toxic itself, but it displaces oxygen. Because nitrogen is odourless, colourless, and tasteless, there are no warning signs before a person becomes unconscious due to oxygen displacement. A person entering a nitrogen-purged space can collapse within seconds without ever sensing danger. This is why atmospheric testing before entry is critical.",
  },
];

export default function ConfinedSpacesModule3Section1() {
  useSEO({
    title:
      "Atmospheric Hazards | Confined Spaces Module 3.1",
    description:
      "Oxygen depletion and enrichment, toxic gases (H\u2082S, CO, CO\u2082, N\u2082, SO\u2082), flammable atmospheres, LEL/UEL concepts, ignition sources, and ATEX/DSEAR requirements for confined-space entry.",
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
            <Link to="../confined-spaces-module-3">
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
            <Wind className="h-7 w-7 text-cyan-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Atmospheric Hazards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the invisible dangers that make confined spaces
            lethal &mdash; oxygen depletion, oxygen enrichment, toxic gases,
            flammable atmospheres, and the regulations that control them
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Normal air:</strong> 20.9% O&sub2;, 78.1% N&sub2;,
                0.04% CO&sub2;, trace gases
              </li>
              <li>
                <strong>Oxygen:</strong> &lt;19.5% depletion alarm, &gt;23.5%
                enrichment danger
              </li>
              <li>
                <strong>Toxic:</strong> H&sub2;S, CO, CO&sub2;, SO&sub2; &mdash;
                all potentially lethal in confined spaces
              </li>
              <li>
                <strong>Flammable:</strong> LEL/UEL range &mdash; methane, LPG,
                solvents, dust
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Always:</strong> Test atmosphere before AND during entry
              </li>
              <li>
                <strong>Never:</strong> Rely on smell to detect toxic gases
              </li>
              <li>
                <strong>Monitor:</strong> O&sub2;, LEL, CO, and H&sub2;S
                continuously
              </li>
              <li>
                <strong>Evacuate:</strong> Immediately if any alarm triggers
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
              "Describe the composition of a normal, safe atmosphere (O\u2082, N\u2082, CO\u2082, trace gases)",
              "Explain the causes and physiological effects of oxygen depletion at different concentration levels",
              "Identify the risks associated with oxygen-enriched atmospheres above 23.5%",
              "List the key toxic gases encountered in confined spaces and their Workplace Exposure Limits",
              "Define LEL and UEL and explain the flammable-range concept for common gases",
              "Describe ignition sources and the ATEX/DSEAR requirements for controlling explosive atmospheres",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Normal Atmosphere */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">01</span>
            Normal Atmosphere
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before you can understand what makes a confined-space atmosphere
                dangerous, you need to know what a <strong>normal, safe
                atmosphere</strong> looks like. The air we breathe every day has
                a remarkably consistent composition at sea level:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Composition of Normal Air
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span>Nitrogen (N&sub2;)</span>
                    <span className="font-bold text-white">78.1%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-slate-500 to-slate-400 h-3 rounded-full"
                      style={{ width: "78.1%" }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span>Oxygen (O&sub2;)</span>
                    <span className="font-bold text-cyan-400">20.9%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-3 rounded-full"
                      style={{ width: "20.9%" }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span>Argon (Ar)</span>
                    <span className="font-bold text-white">0.93%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-400 h-3 rounded-full"
                      style={{ width: "4.65%" }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span>Carbon Dioxide (CO&sub2;)</span>
                    <span className="font-bold text-white">0.04%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-400 h-3 rounded-full"
                      style={{ width: "1%" }}
                    />
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Plus trace amounts of neon, helium, methane, krypton, and
                    other gases
                  </p>
                </div>
              </div>

              <p>
                The critical figure for confined-space work is{" "}
                <strong className="text-cyan-400">20.9% oxygen</strong>. This
                is the benchmark against which all oxygen measurements are
                compared. Even a small reduction in oxygen percentage &mdash;
                just 1 or 2 percentage points &mdash; can impair judgement,
                coordination, and consciousness. In a confined space, where
                dilution by fresh air is limited or absent, these small
                changes happen quickly and without warning.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Key Point:</strong>{" "}
                  Atmospheric hazards are the <strong>leading cause of
                  death</strong> in confined spaces. More than 60% of
                  confined-space fatalities are caused by atmospheric conditions,
                  and a significant proportion of those are would-be rescuers who
                  entered without testing. The atmosphere must{" "}
                  <strong>always</strong> be tested before entry and monitored
                  continuously throughout the work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Oxygen Depletion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">02</span>
            Oxygen Depletion
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Oxygen depletion occurs when the oxygen concentration drops
                below the normal 20.9%. In open air, natural convection and
                wind replace consumed or displaced oxygen almost immediately.
                Inside a confined space, this replacement mechanism is absent
                or severely limited, allowing oxygen levels to fall rapidly to
                life-threatening concentrations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Causes of Oxygen Depletion
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rusting (oxidation):</strong>{" "}
                      Steel walls, fittings, and pipework consume oxygen as they
                      corrode. A rusty tank or vessel can reduce O&sub2; to
                      lethal levels within hours of being sealed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Biological activity:</strong>{" "}
                      Bacteria, fungi, and decomposing organic matter consume
                      oxygen. Common in sewers, drains, grain silos, and tanks
                      that have held organic materials.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Displacement by other gases:
                      </strong>{" "}
                      Gases such as nitrogen, argon, carbon dioxide, or methane
                      can displace oxygen. A leak from a nitrogen purge line, for
                      instance, can render a space immediately lethal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Combustion:</strong>{" "}
                      Burning, welding, cutting, and the use of petrol or diesel
                      engines inside or near a confined space consume oxygen and
                      produce toxic by-products.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Absorption by materials:
                      </strong>{" "}
                      Freshly poured concrete, certain soils, chemical reactions
                      in coatings, and some granular materials can absorb oxygen
                      from the surrounding air.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Oxygen Level Effects Scale Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">
                  Oxygen Level Effects Scale
                </p>
                <div className="space-y-2">
                  <div className="flex items-stretch gap-3">
                    <div className="w-20 sm:w-24 flex-shrink-0 flex items-center justify-end">
                      <span className="text-sm font-bold text-cyan-400">
                        20.9%
                      </span>
                    </div>
                    <div className="flex-1 bg-cyan-500/20 border border-cyan-500/40 rounded-lg p-2.5">
                      <p className="text-xs font-medium text-cyan-400">
                        NORMAL
                      </p>
                      <p className="text-xs text-white/70">
                        Standard atmospheric oxygen. Safe breathing conditions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-stretch gap-3">
                    <div className="w-20 sm:w-24 flex-shrink-0 flex items-center justify-end">
                      <span className="text-sm font-bold text-green-400">
                        19.5%
                      </span>
                    </div>
                    <div className="flex-1 bg-green-500/20 border border-green-500/40 rounded-lg p-2.5">
                      <p className="text-xs font-medium text-green-400">
                        FIRST ALARM
                      </p>
                      <p className="text-xs text-white/70">
                        Minimum safe level. First alarm set point on gas
                        monitors. Investigate cause immediately.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-stretch gap-3">
                    <div className="w-20 sm:w-24 flex-shrink-0 flex items-center justify-end">
                      <span className="text-sm font-bold text-amber-400">
                        18%
                      </span>
                    </div>
                    <div className="flex-1 bg-amber-500/20 border border-amber-500/40 rounded-lg p-2.5">
                      <p className="text-xs font-medium text-amber-400">
                        IMPAIRED
                      </p>
                      <p className="text-xs text-white/70">
                        Judgement, coordination, and breathing impaired.
                        Difficulty performing tasks. Evacuate immediately.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-stretch gap-3">
                    <div className="w-20 sm:w-24 flex-shrink-0 flex items-center justify-end">
                      <span className="text-sm font-bold text-orange-400">
                        16%
                      </span>
                    </div>
                    <div className="flex-1 bg-orange-500/20 border border-orange-500/40 rounded-lg p-2.5">
                      <p className="text-xs font-medium text-orange-400">
                        POOR COORDINATION
                      </p>
                      <p className="text-xs text-white/70">
                        Rapid breathing, increased heart rate, poor muscular
                        coordination, emotional upset, abnormal fatigue.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-stretch gap-3">
                    <div className="w-20 sm:w-24 flex-shrink-0 flex items-center justify-end">
                      <span className="text-sm font-bold text-red-400">
                        &lt;12%
                      </span>
                    </div>
                    <div className="flex-1 bg-red-500/20 border border-red-500/40 rounded-lg p-2.5">
                      <p className="text-xs font-medium text-red-400">
                        UNCONSCIOUS IN SECONDS
                      </p>
                      <p className="text-xs text-white/70">
                        Immediate loss of consciousness without warning. Cannot
                        self-rescue. Brain damage begins within minutes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-stretch gap-3">
                    <div className="w-20 sm:w-24 flex-shrink-0 flex items-center justify-end">
                      <span className="text-sm font-bold text-red-600">
                        &lt;6%
                      </span>
                    </div>
                    <div className="flex-1 bg-red-900/40 border border-red-600/50 rounded-lg p-2.5">
                      <p className="text-xs font-bold text-red-400">
                        FATAL
                      </p>
                      <p className="text-xs text-white/70">
                        Death within minutes. Convulsions, cardiac arrest,
                        respiratory failure. Irreversible brain damage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    No Warning Before Collapse
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  One of the most dangerous aspects of oxygen depletion is
                  that there are <strong className="text-white">no reliable
                  warning symptoms</strong> at low concentrations. A person
                  walking into a space with &lt;10% oxygen will lose
                  consciousness in one or two breaths, with no sensation of
                  suffocation, no gasping, and no chance to call for help or
                  escape. The body simply shuts down. This is why instrument
                  monitoring is the <strong className="text-white">only</strong>{" "}
                  defence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Oxygen Enrichment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">03</span>
            Oxygen Enrichment
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While oxygen depletion is the more common hazard, oxygen
                enrichment &mdash; where the O&sub2; concentration exceeds
                23.5% &mdash; is equally dangerous, though for different
                reasons. In an enriched atmosphere, the risk of fire and
                explosion is <strong>dramatically increased</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Effects of Oxygen Enrichment
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Materials that do not normally burn (such as clothing,
                      hair, and grease) can <strong className="text-white">
                      ignite and burn fiercely</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Flames spread <strong className="text-white">faster and
                      burn hotter</strong> than in normal air
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lower ignition
                      energies</strong> &mdash; smaller sparks or lower
                      temperatures can start a fire
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Fires are <strong className="text-white">much harder to
                      extinguish</strong> because the excess oxygen feeds the
                      combustion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      The flammable range of gases and vapours{" "}
                      <strong className="text-white">widens
                      significantly</strong>, increasing the chance of explosion
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Causes
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Leaking oxygen supply
                      lines:</strong> Oxy-acetylene cutting/welding equipment,
                      medical oxygen supplies, or industrial O&sub2; lines that
                      leak into a confined space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Electrolysis:</strong>{" "}
                      The electrolysis of water produces oxygen gas, which can
                      accumulate in enclosed spaces near electrolysis equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Improper use of
                      oxygen:</strong> Oxygen must <strong>never</strong> be
                      used to ventilate a confined space or to &ldquo;freshen
                      the air&rdquo; &mdash; this creates an enrichment hazard
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Use Oxygen for Ventilation
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  It is a <strong className="text-white">common and dangerous
                  misconception</strong> that pumping oxygen into a confined
                  space will make it safer. Pure or enriched oxygen makes a
                  space <strong className="text-white">far more
                  dangerous</strong> by creating severe fire and explosion risk.
                  Always ventilate with{" "}
                  <strong className="text-white">normal air</strong> only,
                  using mechanical ventilation equipment. If oxygen levels are
                  low, the solution is forced ventilation with fresh air, not
                  the addition of oxygen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Toxic Gases */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">04</span>
            Toxic Gases
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confined spaces can contain a range of toxic gases that are
                harmful or fatal even at relatively low concentrations. Each
                gas has specific properties, sources, and physiological effects.
                Understanding these is essential for selecting the correct gas
                detection equipment and interpreting its readings.
              </p>

              {/* H2S */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
                    H&sub2;S
                  </span>
                  <p className="text-sm font-medium text-white">
                    Hydrogen Sulphide
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/50">WEL (8-hr TWA)</p>
                      <p className="text-white font-bold">5 ppm</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/50">STEL (15 min)</p>
                      <p className="text-white font-bold">10 ppm</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Properties
                    </p>
                    <p>
                      Rotten-egg smell at low concentrations, but{" "}
                      <strong className="text-red-400">olfactory fatigue
                      above ~100 ppm</strong> means you can no longer smell it.
                      Heavier than air (relative density 1.19). Colourless.
                      Both toxic and flammable (LEL 4.3%).
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Sources
                    </p>
                    <p>
                      Decomposing organic matter, sewers, drains, manholes,
                      septic tanks, slurry pits, landfill sites, oil and gas
                      operations, geothermal activity, and disturbed
                      sediment in waterways.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Effects
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                        <span>
                          10&ndash;20 ppm: eye and respiratory irritation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          50&ndash;100 ppm: severe eye damage, coughing,
                          difficulty breathing
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>
                          100&ndash;200 ppm: olfactory fatigue (smell lost),
                          serious respiratory distress
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          &gt;300 ppm: rapid unconsciousness, pulmonary oedema,
                          death
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CO */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">
                    CO
                  </span>
                  <p className="text-sm font-medium text-white">
                    Carbon Monoxide
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/50">WEL (8-hr TWA)</p>
                      <p className="text-white font-bold">20 ppm</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/50">STEL (15 min)</p>
                      <p className="text-white font-bold">100 ppm</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Properties
                    </p>
                    <p>
                      <strong className="text-red-400">Completely
                      odourless, colourless, and tasteless</strong> &mdash;
                      impossible to detect without instruments. Slightly lighter
                      than air (relative density 0.97). Binds to haemoglobin
                      approximately 200&times; more readily than oxygen, forming
                      carboxyhaemoglobin and preventing oxygen transport.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Sources
                    </p>
                    <p>
                      Incomplete combustion (petrol/diesel engines, generators,
                      compressors), welding and cutting operations, fires,
                      furnaces, boilers, and any burning of carbonaceous
                      materials in low-oxygen environments.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Effects
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                        <span>
                          50 ppm: headache after several hours of exposure
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          200 ppm: headache within 2&ndash;3 hours, dizziness,
                          nausea
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>
                          400 ppm: life-threatening within 3 hours; headache
                          within 1&ndash;2 hours
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          &gt;800 ppm: unconsciousness within 2 hours, death
                          within 2&ndash;3 hours
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-600 flex-shrink-0" />
                        <span>
                          &gt;6,400 ppm: death within 10&ndash;15 minutes
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CO2 */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold">
                    CO&sub2;
                  </span>
                  <p className="text-sm font-medium text-white">
                    Carbon Dioxide
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/50">WEL (8-hr TWA)</p>
                      <p className="text-white font-bold">5,000 ppm</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/50">STEL (15 min)</p>
                      <p className="text-white font-bold">15,000 ppm</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Properties
                    </p>
                    <p>
                      Colourless, odourless at low concentrations (sharp/acidic
                      taste at high levels).{" "}
                      <strong className="text-amber-400">Heavier than
                      air</strong> (relative density 1.52) &mdash; sinks and
                      accumulates at floor level in pits, cellars, and
                      low-lying spaces. Acts both as an asphyxiant (displaces
                      O&sub2;) and as a direct toxic agent at high
                      concentrations.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Sources
                    </p>
                    <p>
                      Fermentation (breweries, wine vats, grain stores),
                      decomposition of organic matter, combustion, dry ice
                      (solid CO&sub2;) sublimation, carbonated beverage
                      systems, natural geological sources, and human
                      respiration in poorly ventilated spaces.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Effects
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                        <span>
                          5,000 ppm (0.5%): headache, drowsiness after
                          prolonged exposure
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          30,000 ppm (3%): rapid breathing, headache,
                          dizziness, increased heart rate
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>
                          50,000 ppm (5%): serious symptoms &mdash; confusion,
                          loss of judgement
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          &gt;100,000 ppm (10%): unconsciousness within
                          minutes, death
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* N2 */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-500/20 border border-slate-500/30 text-slate-400 text-xs font-bold">
                    N&sub2;
                  </span>
                  <p className="text-sm font-medium text-white">
                    Nitrogen (Simple Asphyxiant)
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                    <p className="text-xs text-red-300 font-medium">
                      No WEL &mdash; nitrogen is not toxic. It kills by
                      displacing oxygen. No warning smell, taste, or sensation.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Properties
                    </p>
                    <p>
                      Completely <strong className="text-white">odourless,
                      colourless, and tasteless</strong>. Similar density to air
                      (relative density 0.97). The victim has{" "}
                      <strong className="text-red-400">absolutely no warning
                      </strong> before losing consciousness. A single breath of
                      a near-pure nitrogen atmosphere can cause immediate
                      collapse.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Sources
                    </p>
                    <p>
                      Purging of tanks and vessels with nitrogen to create an
                      inert atmosphere, blanketing of flammable liquids,
                      cryogenic nitrogen spills, and leaking nitrogen supply
                      lines. Nitrogen purging is extremely common in the
                      process and manufacturing industries.
                    </p>
                  </div>
                </div>
              </div>

              {/* SO2 */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold">
                    SO&sub2;
                  </span>
                  <p className="text-sm font-medium text-white">
                    Sulphur Dioxide
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/50">WEL (8-hr TWA)</p>
                      <p className="text-white font-bold">2 ppm</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/50">STEL (15 min)</p>
                      <p className="text-white font-bold">5 ppm</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Properties
                    </p>
                    <p>
                      Pungent, suffocating odour. Colourless. Heavier than air
                      (relative density 2.26). Highly irritating to the eyes,
                      nose, throat, and lungs. Reacts with moisture to form
                      sulphuric acid.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1">
                      Sources
                    </p>
                    <p>
                      Combustion of sulphur-containing fuels, smelting
                      operations, chemical processes, volcanic/geothermal
                      activity, and the breakdown of sulphur-containing
                      materials in industrial confined spaces.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Flammable Atmospheres */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">05</span>
            Flammable Atmospheres
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A flammable atmosphere exists when a gas, vapour, mist, or
                dust is present at a concentration that could ignite or explode
                if a source of ignition is introduced. In the open air,
                flammable gases disperse rapidly. In a confined space, they
                accumulate and can reach explosive concentrations quickly.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Key Concept &mdash;
                  LEL &amp; UEL:</strong> Every flammable gas has a{" "}
                  <strong>Lower Explosive Limit (LEL)</strong> and an{" "}
                  <strong>Upper Explosive Limit (UEL)</strong>. Below the LEL,
                  the mixture is too lean (not enough fuel) to ignite. Above
                  the UEL, the mixture is too rich (not enough oxygen) to
                  ignite. <strong>Between the LEL and UEL</strong>, the mixture
                  is in the <strong>flammable range</strong> and can be ignited
                  by a suitable source of energy.
                </p>
              </div>

              {/* LEL/UEL Flammability Range Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">
                  LEL/UEL Flammability Range
                </p>
                <div className="space-y-4">
                  {/* Scale legend */}
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                    <span className="inline-block w-3 h-3 rounded bg-green-500/30 border border-green-500/50" />
                    <span>Too lean (safe from ignition)</span>
                    <span className="inline-block w-3 h-3 rounded bg-red-500/30 border border-red-500/50 ml-2" />
                    <span>Flammable range</span>
                    <span className="inline-block w-3 h-3 rounded bg-blue-500/30 border border-blue-500/50 ml-2" />
                    <span>Too rich</span>
                  </div>
                  {/* Methane */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white">
                        Methane (CH&sub4;)
                      </span>
                      <span className="text-xs text-white/50">
                        LEL 5% &mdash; UEL 15%
                      </span>
                    </div>
                    <div className="w-full h-6 bg-white/5 rounded-lg overflow-hidden flex">
                      <div
                        className="bg-green-500/20 border-r border-green-500/40 flex items-center justify-center"
                        style={{ width: "20%" }}
                      >
                        <span className="text-[9px] text-green-400 font-medium">
                          0&ndash;5%
                        </span>
                      </div>
                      <div
                        className="bg-red-500/30 border-r border-red-500/50 flex items-center justify-center"
                        style={{ width: "40%" }}
                      >
                        <span className="text-[9px] text-red-400 font-bold">
                          FLAMMABLE
                        </span>
                      </div>
                      <div
                        className="bg-blue-500/20 flex items-center justify-center"
                        style={{ width: "40%" }}
                      >
                        <span className="text-[9px] text-blue-400 font-medium">
                          15%+
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* LPG */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white">
                        LPG (Propane)
                      </span>
                      <span className="text-xs text-white/50">
                        LEL 2.1% &mdash; UEL 9.5%
                      </span>
                    </div>
                    <div className="w-full h-6 bg-white/5 rounded-lg overflow-hidden flex">
                      <div
                        className="bg-green-500/20 border-r border-green-500/40 flex items-center justify-center"
                        style={{ width: "10%" }}
                      >
                        <span className="text-[9px] text-green-400 font-medium">
                          0&ndash;2%
                        </span>
                      </div>
                      <div
                        className="bg-red-500/30 border-r border-red-500/50 flex items-center justify-center"
                        style={{ width: "30%" }}
                      >
                        <span className="text-[9px] text-red-400 font-bold">
                          FLAMMABLE
                        </span>
                      </div>
                      <div
                        className="bg-blue-500/20 flex items-center justify-center"
                        style={{ width: "60%" }}
                      >
                        <span className="text-[9px] text-blue-400 font-medium">
                          9.5%+
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Hydrogen */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white">
                        Hydrogen (H&sub2;)
                      </span>
                      <span className="text-xs text-white/50">
                        LEL 4% &mdash; UEL 75%
                      </span>
                    </div>
                    <div className="w-full h-6 bg-white/5 rounded-lg overflow-hidden flex">
                      <div
                        className="bg-green-500/20 border-r border-green-500/40 flex items-center justify-center"
                        style={{ width: "8%" }}
                      >
                        <span className="text-[9px] text-green-400 font-medium">
                          0&ndash;4%
                        </span>
                      </div>
                      <div
                        className="bg-red-500/30 border-r border-red-500/50 flex items-center justify-center"
                        style={{ width: "72%" }}
                      >
                        <span className="text-[9px] text-red-400 font-bold">
                          WIDE FLAMMABLE RANGE
                        </span>
                      </div>
                      <div
                        className="bg-blue-500/20 flex items-center justify-center"
                        style={{ width: "20%" }}
                      >
                        <span className="text-[9px] text-blue-400 font-medium">
                          75%+
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Petrol Vapour */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white">
                        Petrol Vapour
                      </span>
                      <span className="text-xs text-white/50">
                        LEL 1.4% &mdash; UEL 7.6%
                      </span>
                    </div>
                    <div className="w-full h-6 bg-white/5 rounded-lg overflow-hidden flex">
                      <div
                        className="bg-green-500/20 border-r border-green-500/40 flex items-center justify-center"
                        style={{ width: "7%" }}
                      >
                        <span className="text-[9px] text-green-400 font-medium">
                          &lt;1.4%
                        </span>
                      </div>
                      <div
                        className="bg-red-500/30 border-r border-red-500/50 flex items-center justify-center"
                        style={{ width: "25%" }}
                      >
                        <span className="text-[9px] text-red-400 font-bold">
                          FLAMMABLE
                        </span>
                      </div>
                      <div
                        className="bg-blue-500/20 flex items-center justify-center"
                        style={{ width: "68%" }}
                      >
                        <span className="text-[9px] text-blue-400 font-medium">
                          7.6%+
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-3">
                  Note: Gas monitors typically alarm at 10% LEL and 20% LEL,
                  NOT at the actual LEL percentage. For methane, 10% LEL
                  = 0.5% methane in air.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Flammable Gas Sources in Confined Spaces
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Methane:</strong> Sewers,
                      drains, landfill sites, coal mines, and decomposing
                      organic matter in enclosed spaces
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">LPG (Propane/Butane):</strong>{" "}
                      Leaking gas supplies, storage cylinders, catering
                      equipment. Heavier than air &mdash; accumulates in pits
                      and low-lying areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Petrol vapour:</strong>{" "}
                      Vehicle fuel tanks, fuel storage areas, spills. Heavier
                      than air. Extremely volatile.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hydrogen:</strong> Battery
                      charging areas, electrolysis, chemical reactions involving
                      metals and acids. Very wide flammable range (4&ndash;75%).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Solvent vapours:</strong>{" "}
                      Paints, adhesives, cleaning agents, degreasers, resins.
                      Many solvents are heavier than air and accumulate at low
                      levels.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Combustible
                      dust:</strong> Grain, flour, coal, wood, metal powders,
                      and other finely divided materials can form explosive
                      dust clouds when disturbed inside a confined space
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Dust Explosions
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Combustible dust is an often-overlooked explosive hazard. When
                  fine particles of organic or metallic material are suspended in
                  air within a confined space, the resulting dust cloud can
                  explode violently if an ignition source is present. The five
                  elements needed for a dust explosion are: combustible dust,
                  an ignition source, oxygen, dispersion (dust suspended in air),
                  and confinement. Removing any one element prevents the
                  explosion. Grain silos, flour mills, and woodworking dust
                  extraction systems are common locations for this hazard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Sources of Ignition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">06</span>
            Sources of Ignition
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In a flammable or explosive atmosphere, even a tiny source of
                ignition energy can trigger a devastating explosion. In a
                confined space, the consequences of an explosion are amplified
                by the enclosure &mdash; pressure waves are reflected and
                concentrated, causing catastrophic injury or death.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Ignition Sources
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hot work:</strong> Welding,
                      cutting, brazing, grinding, soldering &mdash; open flames
                      and extreme temperatures
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Electrical sparks:</strong>{" "}
                      Switching electrical equipment on or off, loose
                      connections, damaged cables, circuit breakers operating
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Static
                      electricity:</strong> Generated by flowing liquids,
                      powders, or gases; synthetic clothing; and movement of
                      people or equipment in dry conditions
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hot surfaces:</strong>{" "}
                      Exhaust systems, overheated bearings, steam pipes,
                      friction from mechanical equipment
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Non-intrinsically-safe
                      equipment:</strong> Standard torches, mobile phones,
                      power tools, cameras, and test instruments that are not
                      ATEX/Ex rated
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Impact sparks:</strong>{" "}
                      Metal tools striking metal surfaces. Non-sparking tools
                      (brass, bronze, or beryllium-copper alloy) must be used
                      in potentially explosive atmospheres
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Intrinsically Safe
                  Equipment:</strong> Equipment rated as &ldquo;intrinsically
                  safe&rdquo; (marked with the Ex symbol) is designed so that
                  its electrical circuits cannot produce sparks or heat
                  sufficient to ignite a flammable atmosphere. In any
                  confined space where a flammable or explosive atmosphere
                  may be present, <strong>only</strong> intrinsically safe (Ex)
                  equipment may be used. This includes gas monitors, torches,
                  cameras, radios, and any other electrical or electronic
                  device taken into the space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: ATEX & DSEAR Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">07</span>
            ATEX &amp; DSEAR Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a confined space may contain a flammable or explosive
                atmosphere, the{" "}
                <strong>Dangerous Substances and Explosive Atmospheres
                Regulations 2002 (DSEAR)</strong> and the{" "}
                <strong>ATEX Workplace Directive (1999/92/EC)</strong> impose
                specific requirements on employers. These regulations work
                alongside the Confined Spaces Regulations 1997 to ensure
                explosive atmospheres are assessed, classified, and controlled.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key DSEAR/ATEX Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Risk assessment:</strong>{" "}
                      The employer must carry out a specific DSEAR risk
                      assessment identifying all dangerous substances present or
                      likely to be present, and evaluating the risk of fire or
                      explosion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazardous area
                      classification:</strong> Areas where explosive atmospheres
                      may occur must be classified into zones (Zone 0, 1, or 2
                      for gases; Zone 20, 21, or 22 for dusts) based on the
                      likelihood and duration of the explosive atmosphere
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Elimination and
                      control:</strong> The first priority is to eliminate the
                      risk entirely (e.g. remove the dangerous substance or
                      prevent the explosive atmosphere forming). Where
                      elimination is not possible, control measures must be
                      applied in the following hierarchy: prevent ignition
                      sources, use ventilation to keep concentrations below
                      the LEL, and mitigate the effects of any explosion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Equipment
                      selection:</strong> Only equipment certified for the
                      relevant ATEX zone may be used. Equipment must carry
                      the appropriate Ex marking and be suitable for the gas
                      group and temperature class of the hazardous area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Warning signs:</strong>{" "}
                      The entrance to any classified hazardous area must display
                      the EX warning triangle sign (yellow triangle with EX
                      marking)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hot-work permits:</strong>{" "}
                      Any hot work in or near a potentially explosive atmosphere
                      requires a formal hot-work permit. The permit must specify
                      atmospheric monitoring requirements, fire precautions, and
                      the duration of the work
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  ATEX Zone Classification (Gases)
                </p>
                <div className="space-y-2">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-xs font-bold text-red-400">Zone 0</p>
                    <p className="text-xs text-white/70">
                      Explosive atmosphere is present continuously or for long
                      periods. Most restrictive equipment requirements.
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-xs font-bold text-amber-400">Zone 1</p>
                    <p className="text-xs text-white/70">
                      Explosive atmosphere is likely to occur during normal
                      operations. Intermediate equipment requirements.
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <p className="text-xs font-bold text-yellow-400">Zone 2</p>
                    <p className="text-xs text-white/70">
                      Explosive atmosphere is not likely during normal
                      operations, but may occur briefly. Least restrictive
                      (but still regulated) equipment requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">For Electricians:</strong>{" "}
                  As an electrician, you may be asked to install, inspect, or
                  maintain electrical equipment in or near confined spaces
                  classified under ATEX. You must ensure that any equipment you
                  install, repair, or work on is{" "}
                  <strong>appropriate for the zone classification</strong> of
                  the area. Installing non-Ex-rated equipment in a classified
                  zone is a serious offence that could result in prosecution and,
                  more importantly, could cause a fatal explosion. Always check
                  the zone classification and the Explosion Protection Document
                  (EPD) before beginning any electrical work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">08</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Atmospheric hazards are the primary killer in confined spaces.
                Every confined-space entry must be preceded by thorough
                atmospheric testing, and the atmosphere must be continuously
                monitored throughout the work. The key categories are:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-cyan-400 mb-2">
                    Oxygen Depletion
                  </p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>Normal: 20.9% O&sub2;</li>
                    <li>First alarm: 19.5% O&sub2;</li>
                    <li>&lt;12%: unconscious in seconds</li>
                    <li>Causes: rusting, biological, displacement, combustion</li>
                  </ul>
                </div>
                <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-orange-400 mb-2">
                    Oxygen Enrichment
                  </p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>&gt;23.5% O&sub2; is enriched</li>
                    <li>Fire risk multiplied dramatically</li>
                    <li>Never use O&sub2; to ventilate</li>
                    <li>Causes: leaking O&sub2; lines, electrolysis</li>
                  </ul>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-red-400 mb-2">
                    Toxic Gases
                  </p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>H&sub2;S: WEL 5 ppm, olfactory fatigue &gt;100 ppm</li>
                    <li>CO: WEL 20 ppm, odourless &amp; colourless</li>
                    <li>CO&sub2;: WEL 5,000 ppm, heavier than air</li>
                    <li>N&sub2;: asphyxiant, no warning at all</li>
                    <li>SO&sub2;: WEL 2 ppm, pungent odour</li>
                  </ul>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-amber-400 mb-2">
                    Flammable Atmospheres
                  </p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>LEL/UEL defines the flammable range</li>
                    <li>Methane: LEL 5%, UEL 15%</li>
                    <li>Alarm at 10% LEL and 20% LEL</li>
                    <li>ATEX/DSEAR for zone classification &amp; Ex equipment</li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Golden Rule:</strong> Never
                  enter a confined space without confirming the atmosphere is
                  safe using a properly calibrated, bump-tested multi-gas
                  detector. Never rely on your senses &mdash; many lethal
                  atmospheric hazards are completely{" "}
                  <strong>invisible, odourless, and tasteless</strong>. If any
                  alarm triggers on your monitor, evacuate immediately using the
                  pre-planned escape route and do not re-enter until the
                  atmosphere has been made safe and re-tested.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-2-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Legislation &amp; Standards
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-3-section-2">
              Next: Non-Atmospheric Hazards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
