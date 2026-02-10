import {
  ArrowLeft,
  Wind,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  HardHat,
  Snowflake,
  CloudRain,
  Thermometer,
  Eye,
  ShieldCheck,
  CloudLightning,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quizQuestions = [
  {
    question:
      "At what Beaufort scale force should scaffold erection and dismantling generally stop?",
    options: [
      "Force 4 — moderate breeze",
      "Force 6 — strong breeze (wind speed exceeding approximately 23 mph / 37 km/h)",
      "Force 8 — gale",
      "Force 10 — storm",
    ],
    correctAnswer: 1,
    explanation:
      "Industry guidance (NASC TG20 and SG4) recommends that scaffold erection and dismantling should stop at around Beaufort force 6 (approximately 23 mph / 37 km/h mean wind speed). At this level, large branches move, umbrellas are difficult to control, and scaffolders handling large, lightweight components are at significant risk of being caught by gusts.",
  },
  {
    question:
      "Why do sheeted or netted scaffolds require work to stop at lower wind speeds than open scaffolds?",
    options: [
      "Sheeting makes the scaffold look untidy in strong wind",
      "Sheeting and netting dramatically increase the wind load (sail area) on the scaffold, creating much higher forces on the structure and its ties",
      "Sheeted scaffolds are always weaker than open scaffolds",
      "Netting causes vibration that loosens fittings",
    ],
    correctAnswer: 1,
    explanation:
      "Sheeting and debris netting act as sails, catching wind and transmitting enormous additional forces into the scaffold structure and its ties to the building. A fully sheeted scaffold can experience wind loads several times greater than an open scaffold. The scaffold design must account for this, and work may need to stop at lower wind speeds to prevent overloading or collapse.",
  },
  {
    question:
      "What is the FIRST action a scaffold user should take when arriving at a scaffold on a frosty morning?",
    options: [
      "Start work immediately — frost will melt quickly",
      "Visually inspect platforms, ladders, and access ways for ice; do NOT use the scaffold until ice has been cleared and surfaces are safe",
      "Pour hot water on the platforms to melt the ice",
      "Wear trainers for better grip on icy surfaces",
    ],
    correctAnswer: 1,
    explanation:
      "Ice on scaffold platforms, ladder rungs, and access ways is extremely dangerous and has caused fatal falls. Before anyone climbs the scaffold, a visual inspection must confirm surfaces are clear of ice. If ice is present, it must be cleared and surfaces treated (e.g., with grit) before use. Pouring hot water can refreeze and make conditions worse.",
  },
  {
    question:
      "Why must all work on scaffolding stop immediately during a lightning storm?",
    options: [
      "Rain makes the scaffold slippery",
      "Scaffolding is a metal structure at height — it acts as a conductor and attracts lightning strikes, putting workers at extreme risk of electrocution",
      "Lightning is too bright to see properly",
      "Thunder is too loud to communicate",
    ],
    correctAnswer: 1,
    explanation:
      "Scaffolding is a large metal structure elevated above the surrounding area, making it an extremely effective lightning conductor. A lightning strike on or near a scaffold would deliver a lethal electrical discharge to anyone in contact with the structure. Workers must descend immediately when lightning is observed or thunder is heard, and not return until the storm has passed and the scaffold has been inspected.",
  },
  {
    question:
      "After a heavy overnight snowfall, the site manager asks you to inspect a scaffold before use. What are you specifically looking for?",
    options: [
      "Only whether the snow looks nice",
      "Snow loading on platforms (additional weight), ice beneath the snow, obscured trip hazards, integrity of ties and bracing under the additional load, and safe access",
      "Whether the scaffold colour has changed",
      "Only the height of the snowdrift at the base",
    ],
    correctAnswer: 1,
    explanation:
      "Snow adds significant weight to scaffold platforms and can overload them, especially if it has drifted or become compacted. Ice beneath the snow creates hidden slip hazards. Snow can conceal damaged boards, missing guardrails, or debris. The additional weight may have strained ties and bracing. All of these must be checked before the scaffold is cleared for use.",
  },
  {
    question:
      "What inspection requirement applies after any significant weather event?",
    options: [
      "No inspection is needed — scaffolds are designed for all weather",
      "A competent person must inspect the scaffold before it is used again, checking for structural damage, loosened ties, displaced boards, and accumulated water or debris",
      "Only the scaffold owner needs to inspect it",
      "An inspection is only needed if the scaffold has visibly collapsed",
    ],
    correctAnswer: 1,
    explanation:
      "The Work at Height Regulations 2005 (Schedule 7) require that scaffolds are inspected after any event likely to have affected their stability — this includes high winds, heavy rain, snow, ice, flooding, and any other significant weather event. A competent person must carry out the inspection and the scaffold must not be used until it has been confirmed safe.",
  },
  {
    question:
      "During prolonged heavy rain, what structural concern should a scaffold user report immediately?",
    options: [
      "The scaffold looks wet",
      "Water pooling on platforms (indicating blocked drainage or sagging boards), waterlogged ground at the base potentially undermining sole plates, and any signs of the scaffold shifting or settling",
      "The scaffold colour is darker when wet",
      "Rain is making noise on the sheeting",
    ],
    correctAnswer: 1,
    explanation:
      "Heavy rain creates multiple structural risks: water pooling adds weight and indicates platform issues; waterlogged ground can cause subsidence under sole plates and base plates, leading to scaffold settlement or collapse; persistent rain can wash away backfill around foundations. Any signs of movement, settlement, or instability must be reported immediately and the scaffold evacuated.",
  },
  {
    question:
      "At what Beaufort force does wind become 'a fresh gale' where all scaffold work must typically cease and the scaffold should be evacuated?",
    options: [
      "Force 5 — fresh breeze",
      "Force 6 — strong breeze",
      "Force 8 — fresh gale (approximately 39-46 mph / 62-74 km/h)",
      "Force 12 — hurricane",
    ],
    correctAnswer: 2,
    explanation:
      "At Beaufort force 8 (fresh gale, approximately 39-46 mph), all work on scaffolds should cease and the scaffold should be evacuated. At this wind speed, twigs break from trees, progress on foot is seriously impeded, and the forces on a scaffold structure — particularly one that is sheeted or netted — can be extreme. Evacuation should happen well before this point if conditions are deteriorating.",
  },
];

const quickCheckQuestions = [
  {
    question:
      "Wind speed on site is currently 20 mph with gusts to 28 mph. Scaffolders are erecting a new scaffold. The site supervisor says the mean wind speed is below 23 mph so work can continue. Is the supervisor correct?",
    options: [
      "Yes — the mean wind speed is below the limit so work is safe",
      "No — gust speeds are more dangerous than mean speeds for scaffold erection; gusts of 28 mph exceed safe limits and create sudden, unpredictable forces on components being handled",
      "Yes — gusts do not matter, only average wind speed",
      "No — all scaffold work must stop at 15 mph",
    ],
    correctIndex: 1,
    explanation:
      "While the 23 mph guideline refers to mean wind speed, gust speeds are critically important during erection and dismantling because scaffolders are handling loose components that act as sails. A sudden gust can wrench a tube or board from a worker's grip or throw them off balance. When gusts significantly exceed the mean, work should be reassessed and likely stopped. Professional judgement and dynamic risk assessment are essential.",
  },
  {
    question:
      "It rained heavily overnight but has now stopped. Scaffold platforms are wet and there are puddles on some boards. A worker says the scaffold is fine because it is not raining any more. Is this correct?",
    options: [
      "Yes — once rain stops the scaffold is safe to use",
      "No — wet platforms are slip hazards; puddles indicate drainage issues or sagging boards that need investigation; the scaffold must be inspected before use and any standing water removed",
      "Yes — scaffold boards are non-slip by design",
      "No — scaffolds cannot be used for 24 hours after rain",
    ],
    correctIndex: 1,
    explanation:
      "Wet scaffold boards are significantly more slippery than dry ones, especially if contaminated with algae, moss, or construction dust. Standing water on platforms adds weight, indicates potential board sagging or blockages, and creates slip hazards. A competent person should inspect the scaffold, remove standing water, check for underlying issues, and confirm conditions are safe before allowing access.",
  },
  {
    question:
      "The temperature has been below freezing for three days. A scaffold has been out of use over this period. Before allowing workers back on it, what specific weather-related checks must a competent person carry out?",
    options: [
      "No checks needed — the cold does not affect scaffolding",
      "Check for ice on all platforms, ladders, and access points; check for frost heave or ground movement at the base; check that ties and fittings have not been displaced by thermal contraction; check that boards are not warped or split from freeze-thaw cycles",
      "Only check if the scaffold looks different",
      "Check that the scaffold is still standing — nothing else is needed",
    ],
    correctIndex: 1,
    explanation:
      "Prolonged freezing affects scaffolds in multiple ways: ice forms on all surfaces creating extreme slip hazards; ground can heave or shift beneath sole plates causing settlement; metal fittings contract and may loosen; timber boards can warp, split, or become brittle from freeze-thaw cycles. A thorough inspection by a competent person is essential before re-use after a prolonged freeze.",
  },
];

const faqs = [
  {
    question:
      "Is there a specific wind speed at which all scaffold work must legally stop?",
    answer:
      "There is no single legal wind speed limit written into the Work at Height Regulations. However, industry guidance — particularly NASC TG20 and SG4 — recommends stopping scaffold erection and dismantling at approximately force 6 on the Beaufort scale (around 23 mph / 37 km/h mean wind speed). For general work on scaffolds, a dynamic risk assessment must be carried out considering the specific conditions: scaffold height, whether it is sheeted or netted, the nature of the work, gust speeds versus mean speeds, and the experience of the workers. All scaffold work should cease and the scaffold evacuated at force 8 (fresh gale). The duty holder must make a professional judgement based on the risk assessment — and the answer will vary from site to site.",
  },
  {
    question:
      "Who is responsible for deciding whether weather conditions are too severe for scaffold work?",
    answer:
      "Responsibility sits at multiple levels. The principal contractor (or sole contractor) must ensure that weather risks are addressed in the construction phase plan. The scaffold contractor or appointed person decides when erection, alteration, or dismantling should stop. For general scaffold users, the site supervisor or person in control of the work must carry out a dynamic risk assessment based on current and forecast conditions. However, every individual worker also has a duty under the Health and Safety at Work Act 1974 to refuse to work in conditions they believe are unsafe. If in doubt, stop and report — no one should feel pressured to work on a scaffold in dangerous weather.",
  },
  {
    question:
      "How does the scaffold design affect the wind speed at which work must stop?",
    answer:
      "The scaffold's wind exposure varies enormously based on its design and configuration. An open scaffold (no sheeting or netting) allows wind to pass through and experiences relatively low wind loads. A scaffold with debris netting experiences significantly higher wind loads due to the net's sail area. A fully sheeted scaffold (e.g., with monoflex or tarpaulin) creates the highest wind loads — potentially several times greater than an open scaffold. The scaffold designer must calculate wind loads for the specific configuration (including sheeting) and the design must include sufficient ties and bracing. On sheeted or netted scaffolds, stop-work wind speeds will be lower than the general 23 mph guideline, and may be specified in the design documentation.",
  },
  {
    question:
      "What records should be kept regarding weather-related scaffold decisions?",
    answer:
      "All weather-related decisions should be recorded. This includes: the scaffold inspection register (noting weather conditions at each inspection), records of any weather-triggered inspections (after storms, high winds, heavy snow), records of stop-work decisions and the conditions that triggered them, the time and conditions when work resumed, and any remedial actions taken (e.g., clearing ice, removing accumulated snow, re-tightening fittings). These records demonstrate compliance with the Work at Height Regulations and provide valuable evidence in the event of an incident investigation. They also build a site-specific dataset that helps improve future weather-related decision-making.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ScaffoldingAwarenessModule5Section3() {
  useSEO({
    title:
      "Weather & Environmental Conditions | Module 5 | Scaffolding Awareness",
    description:
      "Wind effects on scaffolds, Beaufort scale limits, sheeted and netted scaffolds, ice, frost, rain, lightning, temperature extremes, snow loading, and post-weather inspections.",
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
            <Link to="../scaffolding-awareness-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">
              Module 5 {"\u2022"} Section 3
            </p>
            <h1 className="text-sm font-semibold text-white truncate">
              Weather & Environmental Conditions
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <Wind className="h-8 w-8 text-slate-400" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="bg-slate-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              MODULE 5 {"\u2022"} SECTION 3
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Weather & Environmental Conditions
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Understanding when weather makes scaffold work unsafe — wind limits,
            ice, rain, lightning, temperature extremes, and the inspections
            required after weather events
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-slate-500/10 border border-slate-500/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-slate-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Weather is one of the biggest variables in scaffold safety. Wind is
            the primary concern — scaffold erection and dismantling should
            generally stop at Beaufort force 6 (approximately 23 mph), with
            sheeted or netted scaffolds potentially requiring earlier
            intervention. Ice, frost, rain, lightning, extreme temperatures, and
            snow all create additional hazards. A competent person must inspect
            the scaffold after any significant weather event before it is used
            again.
          </p>
        </div>

        {/* On Site Box */}
        <div className="bg-slate-400/10 border border-slate-400/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-slate-400 mb-2 flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            On Site
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Before starting work on a scaffold each day, check the weather
            forecast and current conditions. Look at the scaffold: is there ice
            on the platforms? Is water pooling? Are sheeting or netting panels
            intact or torn? Is the ground soft or waterlogged at the base? Are
            ties secure? If conditions have changed since the last inspection, a
            competent person must re-inspect before anyone climbs.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Describe how wind affects scaffolds and identify the Beaufort scale thresholds for stopping work",
              "Explain why sheeted and netted scaffolds experience much higher wind loads and may require lower stop-work wind speeds",
              "Identify the hazards of ice, frost, and freezing conditions on scaffold platforms and access ways",
              "Understand the effects of rain on scaffold safety, including slip hazards and structural concerns",
              "Explain why all work must stop immediately during lightning and why scaffolding is a conductor",
              "Describe the effects of temperature extremes and snow loading on scaffold structures",
              "State the inspection requirements following significant weather events",
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 — Wind Effects on Scaffolds                       */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/20 text-slate-400 font-bold text-sm">
              01
            </span>
            <h3 className="text-xl font-semibold text-white">
              Wind Effects on Scaffolds
            </h3>
          </div>
          <div className="border-l-2 border-slate-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Wind is the single most significant weather hazard for scaffold
              structures. It creates lateral forces that push against the
              scaffold, its components, and any sheeting or netting attached to
              it. Wind forces increase with the square of the wind speed — so
              doubling the wind speed quadruples the force.
            </p>
            <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Wind className="h-4 w-4 text-slate-400" />
                How Wind Affects Scaffold Structures
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Lateral loading on the structure
                    </strong>{" "}
                    — wind pushes the scaffold sideways, transferring force
                    through the ties into the building. If ties are inadequate
                    or the building connection is weak, the scaffold can pull
                    away or collapse
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Uplift on platforms and boards
                    </strong>{" "}
                    — wind passing over and under platforms creates lift forces
                    that can dislodge boards, especially if they are not
                    properly secured with board clips or wedges
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Gust effects versus mean wind speed
                    </strong>{" "}
                    — gusts can be 50% or more above the mean wind speed and
                    create sudden, violent forces. A mean speed of 20 mph may
                    produce gusts of 30+ mph
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Funnelling and turbulence
                    </strong>{" "}
                    — gaps between buildings, corners, and elevated locations
                    can accelerate wind speeds significantly above the general
                    wind speed. A scaffold in a gap between two tall buildings
                    may experience much higher wind than one in an open field
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Effect on workers
                    </strong>{" "}
                    — wind buffeting reduces stability and balance, making falls
                    more likely. Workers handling loose materials or scaffold
                    components become vulnerable as the wind catches flat
                    surfaces
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Point — Wind Force Increases Exponentially
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Wind force is proportional to the square of the wind speed. This
                means a wind speed of 40 mph produces{" "}
                <strong className="text-white">four times</strong> the force of
                a 20 mph wind, not twice. This is why conditions can deteriorate
                from manageable to dangerous very quickly as wind speed
                increases.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 — Beaufort Scale Reference for Scaffold Work      */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              02
            </span>
            <h3 className="text-xl font-semibold text-white">
              Beaufort Scale Reference for Scaffold Work
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The Beaufort scale provides a standardised way to describe wind
              conditions. For scaffold work, the key thresholds are force 6
              (stop erection and dismantling) and force 8 (stop all scaffold
              work and evacuate). However, these are general guidelines — a
              dynamic risk assessment must be carried out for each situation.
            </p>

            {/* Beaufort Scale Diagram */}
            <div className="bg-gradient-to-br from-slate-500/10 to-blue-500/10 border border-slate-500/20 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <Eye className="h-4 w-4 text-slate-400" />
                Beaufort Scale — Scaffold Work Reference
              </h4>
              <div className="space-y-2">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 text-green-400 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        0-3
                      </span>
                      <span className="text-green-400 font-semibold text-sm">
                        Calm to Gentle Breeze
                      </span>
                    </div>
                    <span className="text-white/50 text-xs">0-12 mph</span>
                  </div>
                  <p className="text-white/70 text-xs mt-2">
                    Generally safe for all scaffold work. Leaves rustle, light
                    flags extend. Normal working conditions — standard
                    precautions apply.
                  </p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 text-green-400 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        4
                      </span>
                      <span className="text-green-400 font-semibold text-sm">
                        Moderate Breeze
                      </span>
                    </div>
                    <span className="text-white/50 text-xs">13-18 mph</span>
                  </div>
                  <p className="text-white/70 text-xs mt-2">
                    Small branches move, dust and loose paper raised. Scaffold
                    work can generally continue but be alert to gusts. Secure
                    loose materials. Begin monitoring conditions.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-500/20 text-amber-400 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        5
                      </span>
                      <span className="text-amber-400 font-semibold text-sm">
                        Fresh Breeze
                      </span>
                    </div>
                    <span className="text-white/50 text-xs">19-24 mph</span>
                  </div>
                  <p className="text-white/70 text-xs mt-2">
                    Small trees sway, whitecaps on inland waters. Increased risk
                    for scaffold erection and dismantling. Dynamic risk
                    assessment essential. Consider stopping erection/dismantling
                    if gust speeds are high.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/20 text-red-400 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        6
                      </span>
                      <span className="text-red-400 font-semibold text-sm">
                        Strong Breeze
                      </span>
                    </div>
                    <span className="text-white/50 text-xs">25-31 mph</span>
                  </div>
                  <p className="text-white/70 text-xs mt-2">
                    Large branches move, umbrellas difficult to use.{" "}
                    <strong className="text-red-400">
                      STOP scaffold erection and dismantling.
                    </strong>{" "}
                    General scaffold work may continue with caution subject to
                    dynamic risk assessment. Sheeted/netted scaffolds may need
                    to stop earlier.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/20 text-red-400 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        7
                      </span>
                      <span className="text-red-400 font-semibold text-sm">
                        Near Gale
                      </span>
                    </div>
                    <span className="text-white/50 text-xs">32-38 mph</span>
                  </div>
                  <p className="text-white/70 text-xs mt-2">
                    Whole trees in motion, difficulty walking against wind.{" "}
                    <strong className="text-red-400">
                      STOP all scaffold erection, dismantling, and alteration.
                    </strong>{" "}
                    General scaffold use should be reviewed — strongly consider
                    evacuation.
                  </p>
                </div>

                <div className="bg-red-500/15 border border-red-500/30 rounded-lg p-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/30 text-red-300 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        8+
                      </span>
                      <span className="text-red-300 font-semibold text-sm">
                        Fresh Gale and Above
                      </span>
                    </div>
                    <span className="text-white/50 text-xs">39+ mph</span>
                  </div>
                  <p className="text-white/70 text-xs mt-2">
                    Twigs break from trees, progress on foot impeded.{" "}
                    <strong className="text-red-300">
                      EVACUATE ALL SCAFFOLDS IMMEDIATELY.
                    </strong>{" "}
                    No scaffold work of any kind. Inspect scaffold after wind
                    subsides before re-use. Check ties, bracing, boards, and
                    sheeting.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                How to Estimate Wind Speed on Site
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Where an anemometer (wind speed measuring device) is not
                available, the Beaufort scale provides observable indicators. At
                force 6, large branches are moving and umbrellas are difficult
                to use. At force 8, twigs are breaking from trees and walking
                against the wind is difficult. Site-specific factors such as
                building funnelling, elevation, and open exposure can
                significantly increase local wind speed above the general
                forecast. Weather forecasts from the Met Office provide both
                mean wind speeds and gust speeds — always check both.
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
        {/*  SECTION 03 — Sheeted & Netted Scaffolds                      */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">
              03
            </span>
            <h3 className="text-xl font-semibold text-white">
              Sheeted & Netted Scaffolds — Increased Wind Loads
            </h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Scaffolds fitted with sheeting (monoflex, tarpaulin, or building
              wraps) or debris netting experience dramatically higher wind
              loads. The sheeting or netting acts as a sail, catching wind and
              transmitting large forces into the scaffold structure and its
              ties.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-purple-400" />
                Key Facts About Sheeted and Netted Scaffolds
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Fully sheeted scaffolds
                    </strong>{" "}
                    can experience wind loads{" "}
                    <strong className="text-white">
                      three to five times greater
                    </strong>{" "}
                    than an equivalent open scaffold, depending on the material
                    and attachment method
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Debris netting</strong>{" "}
                    typically has around 50% porosity (allowing some air
                    through) but still significantly increases wind loading
                    compared to an open scaffold
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Additional ties and bracing
                    </strong>{" "}
                    are required to resist the increased wind forces. The
                    scaffold designer must specify these in the design
                    calculations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Stop-work wind speeds may be lower
                    </strong>{" "}
                    than the general 23 mph guideline for erection/dismantling.
                    The scaffold design documentation may specify a lower
                    threshold
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Torn or damaged sheeting/netting
                    </strong>{" "}
                    creates unpredictable aerodynamic effects and must be
                    repaired or removed before wind conditions worsen
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Scaffold Collapses Caused by Wind on Sheeted Scaffolds
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Multiple fatal scaffold collapses in the UK have been directly
                caused by wind acting on sheeted or netted scaffolds where the
                design did not adequately account for the increased wind loads,
                or where the specified number of ties was not installed. In some
                cases, sheeting was added after the scaffold was erected without
                recalculating the tie and bracing requirements. This is
                extremely dangerous — sheeting must never be added to a scaffold
                unless the design specifically allows for it.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 — Ice and Frost                                   */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">
              04
            </span>
            <h3 className="text-xl font-semibold text-white">
              Ice and Frost Hazards
            </h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Ice and frost on scaffold platforms, ladder rungs, and access ways
              are extremely dangerous slip hazards. Black ice — a thin,
              transparent layer of ice — is particularly treacherous because it
              is almost invisible. Falls from scaffolds due to ice have resulted
              in fatalities.
            </p>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-cyan-400" />
                Ice and Frost — Required Actions
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Inspect before use every morning
                    </strong>{" "}
                    — during cold weather, visually check all platforms, ladder
                    rungs, toe boards, and access routes for ice before anyone
                    climbs the scaffold
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Clear ice before allowing access
                    </strong>{" "}
                    — use scrapers, brushes, or grit/salt to remove ice and
                    treat surfaces. Do not use hot water — it can refreeze and
                    create a worse hazard
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Check throughout the day
                    </strong>{" "}
                    — shaded areas of the scaffold may retain ice long after
                    sunny areas have thawed. Frost can form during the afternoon
                    if temperatures drop
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Metal components are especially dangerous
                    </strong>{" "}
                    — steel tubes, couplers, and ladder rungs become extremely
                    slippery when frozen. Guardrails may also be too cold to
                    grip effectively
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Consider postponing work
                    </strong>{" "}
                    — if ice cannot be adequately cleared, or if conditions are
                    so severe that ice reforms rapidly, scaffold work should be
                    postponed until conditions improve
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Frost Heave at Ground Level
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Prolonged freezing can cause frost heave — the ground expands as
                water in the soil freezes, pushing sole plates and base plates
                upward or sideways. When the ground thaws, settlement can
                occur. This can misalign standards, loosen ties, and compromise
                the scaffold's structural integrity. After any prolonged freeze,
                check ground conditions at the base of the scaffold as part of
                the inspection.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 — Rain Effects                                    */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              05
            </span>
            <h3 className="text-xl font-semibold text-white">
              Rain — Slippery Surfaces, Visibility & Structural Effects
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Rain creates multiple hazards on scaffolds. While light rain may
              not require work to stop, heavy or prolonged rain significantly
              increases risk and may make scaffold use unsafe.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <CloudRain className="h-4 w-4 text-blue-400" />
                Rain Hazards on Scaffolds
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Slippery surfaces</strong> —
                    wet scaffold boards, metal tubes, and ladder rungs become
                    significantly more slippery. Boards contaminated with algae,
                    moss, cement dust, or paint are especially dangerous when
                    wet
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Reduced visibility</strong> —
                    heavy rain impairs visibility, making it harder to see
                    hazards, other workers, and overhead obstructions. Driving
                    rain into the face is disorienting and distracting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Water pooling on platforms
                    </strong>{" "}
                    — standing water adds weight and indicates blocked drainage,
                    sagging boards, or structural deflection. A 1-metre square
                    platform with 50mm of standing water holds 50 litres — that
                    is 50 kg of additional load
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Ground softening and erosion
                    </strong>{" "}
                    — prolonged rain softens the ground beneath sole plates,
                    potentially causing the scaffold to settle or lean. Surface
                    water can wash away backfill around foundations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Electrical hazards
                    </strong>{" "}
                    — rain combined with scaffold metalwork increases the risk
                    of electrical hazards if power cables or equipment are in
                    proximity. Wet conditions reduce electrical resistance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Worker welfare</strong> —
                    prolonged exposure to rain in cold conditions increases the
                    risk of hypothermia, reduces dexterity, and affects
                    concentration — all of which increase the likelihood of
                    accidents
                  </span>
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
        {/*  SECTION 06 — Lightning                                       */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">
              06
            </span>
            <h3 className="text-xl font-semibold text-white">
              Lightning — Immediate Stop Work
            </h3>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Scaffolding is a large metal structure elevated above the
              surrounding environment. It is an extremely effective lightning
              conductor. A lightning strike on or near a scaffold delivers a
              massive electrical discharge that is almost certainly fatal to
              anyone in contact with the structure.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-3 flex items-center gap-2">
                <CloudLightning className="h-4 w-4" />
                Lightning — Mandatory Actions
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Stop all scaffold work immediately
                    </strong>{" "}
                    when lightning is observed or thunder is heard — do not wait
                    for the storm to arrive overhead
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Evacuate the scaffold immediately
                    </strong>{" "}
                    — all workers must descend and move away from the scaffold
                    structure. Do not shelter under or beside the scaffold
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Seek shelter in a substantial building or vehicle
                    </strong>{" "}
                    — not in site cabins with metal roofs or near other tall
                    metal structures
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      The 30/30 rule
                    </strong>{" "}
                    — if the time between seeing lightning and hearing thunder is
                    30 seconds or less, seek shelter. Do not return to the
                    scaffold until 30 minutes after the last thunder is heard
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Inspect after the storm
                    </strong>{" "}
                    — a lightning strike can damage scaffold components, weaken
                    joints, and cause electrical damage to connected equipment.
                    A competent person must inspect the scaffold before it is
                    used again
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Why Scaffolding Attracts Lightning
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Lightning seeks the shortest path to the ground through the most
                conductive material available. A scaffold is typically the
                tallest metal structure in its immediate area, making it the
                preferred strike point. The steel tubes provide an excellent
                conduction path, and the electrical energy travels through every
                metal component — tubes, fittings, boards clips, and ties.
                Anyone touching any part of the scaffold structure is at extreme
                risk of electrocution. Even a nearby lightning strike can induce
                dangerous voltages in the scaffold through electromagnetic
                induction.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 07 — Temperature Extremes & Snow Loading             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-sm">
              07
            </span>
            <h3 className="text-xl font-semibold text-white">
              Temperature Extremes & Snow Loading
            </h3>
          </div>
          <div className="border-l-2 border-orange-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Both extreme cold and extreme heat affect scaffold structures and
              the people working on them. Snow adds significant weight to
              platforms and can mask hazards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 text-sm mb-2 flex items-center gap-2">
                  <Snowflake className="h-4 w-4" />
                  Extreme Cold
                </h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Metal components contract in cold — fittings may loosen,
                      joints may lose clamping force
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Timber boards become brittle — more prone to cracking or
                      splitting, especially in freeze-thaw cycles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Reduced worker dexterity — cold hands cannot grip
                      effectively, making falls more likely during climbing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Hypothermia risk — especially for workers exposed to wind
                      chill at height for prolonged periods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Ground freezing — frost heave can shift sole plates and
                      base plates, compromising scaffold stability
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 text-sm mb-2 flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Extreme Heat
                </h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Metal components expand — this can create internal
                      stresses in long runs of scaffold, particularly where
                      movement is restrained
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Hot metal surfaces — steel tubes in direct sunlight can
                      cause burns on contact. Guardrails, couplers, and ladder
                      rungs become painfully hot
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Heat exhaustion and heat stroke — workers at height are
                      fully exposed to sun with limited shade, increasing the
                      risk of heat-related illness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Dehydration — reduces concentration and reaction time,
                      increasing accident risk. Ensure drinking water is
                      accessible at platform level
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      UV exposure — workers on scaffolds are exposed to
                      significant ultraviolet radiation, especially at height
                      where there is less atmospheric filtering
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-cyan-400" />
                Snow Loading on Scaffolds
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Snow is heavy
                    </strong>{" "}
                    — fresh snow weighs approximately 50-100 kg per cubic metre;
                    compacted or wet snow can weigh 200-500 kg per cubic metre.
                    Even a modest layer of snow across multiple platform levels
                    adds substantial weight
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Drifting increases loading
                    </strong>{" "}
                    — wind can cause snow to drift and accumulate unevenly,
                    creating concentrated loads on some areas of the scaffold
                    while leaving others clear
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Concealed hazards
                    </strong>{" "}
                    — snow hides damaged boards, missing toe boards, gaps in
                    platforms, debris, and trip hazards. It can also conceal
                    missing guardrails at platform edges
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Falling snow and ice
                    </strong>{" "}
                    — snow and ice sliding off higher scaffold levels or the
                    building itself can strike workers below. Establish
                    exclusion zones when snow is present at height
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Clear before use
                    </strong>{" "}
                    — snow must be cleared from scaffold platforms before use,
                    starting from the top and working down to prevent
                    overloading lower levels. Check for ice beneath the snow
                  </span>
                </li>
              </ul>
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
        {/*  SECTION 08 — Inspection After Weather Events                  */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/20 text-slate-400 font-bold text-sm">
              08
            </span>
            <h3 className="text-xl font-semibold text-white">
              Inspection After Weather Events
            </h3>
          </div>
          <div className="border-l-2 border-slate-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The Work at Height Regulations 2005, Schedule 7, require that
              scaffolds are inspected after any event likely to have affected
              their stability. This explicitly includes adverse weather
              conditions. The scaffold must not be used until a competent person
              has carried out the inspection and confirmed it is safe.
            </p>

            {/* Weather Action Guide Diagram */}
            <div className="bg-gradient-to-br from-slate-500/10 to-slate-400/10 border border-slate-500/20 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                Weather Action Guide — Post-Event Inspection Checklist
              </h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-slate-400 font-semibold text-sm mb-2">
                    After High Winds (Force 6+)
                  </p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check all ties are secure and have not pulled out from
                        the building
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check bracing is intact and fittings are tight
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check scaffold is plumb and level — look for any lean or
                        twist
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check boards are in place and secured — wind can
                        displace or lift unsecured boards
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check sheeting/netting for tears, detachment, or
                        ballooning
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check for debris blown onto or into the scaffold
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-slate-400 font-semibold text-sm mb-2">
                    After Heavy Rain or Flooding
                  </p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check ground conditions at the base — soft ground,
                        erosion around sole plates, standing water
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check for scaffold settlement — are standards still
                        plumb and level?
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Remove standing water from platforms and investigate the
                        cause of pooling
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check that sole plates have not been undermined or moved
                        by water flow
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-slate-400 font-semibold text-sm mb-2">
                    After Snow, Ice, or Prolonged Freezing
                  </p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Clear all snow from platforms before allowing access
                        (start from the top)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check for ice on all surfaces — platforms, ladder rungs,
                        toe boards, guardrails
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check ground conditions for frost heave or thaw
                        settlement
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check fittings for looseness caused by thermal
                        contraction and expansion cycles
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Inspect timber boards for splitting, warping, or damage
                        from freeze-thaw
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-slate-400 font-semibold text-sm mb-2">
                    After Lightning Strike (on or near the scaffold)
                  </p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Inspect the full scaffold for heat damage, fused
                        fittings, or burnt components
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check ties into the building — the strike force may
                        have loosened fixings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Check all electrical equipment connected to or near the
                        scaffold
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        A scaffold engineer may need to carry out a full
                        structural assessment
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Recording Weather Inspections
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Every post-weather inspection must be recorded in the scaffold
                inspection register. Record the date, time, weather conditions
                that triggered the inspection, what was checked, any defects
                found, any remedial actions taken, and the name of the competent
                person who carried out the inspection. The scaffold tag or
                status notice should be updated accordingly — if the scaffold
                fails inspection, it must be tagged as unsafe and access
                prevented until remedial work is complete.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Legal Requirement
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Failure to inspect a scaffold after adverse weather before
                allowing it to be used is a breach of the Work at Height
                Regulations 2005. If an accident occurs on a scaffold that was
                not inspected after a weather event, the duty holder faces
                serious criminal prosecution. The HSE specifically checks for
                post-weather inspection records during investigations.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Practical Summary — Weather Decision Matrix                   */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HardHat className="h-5 w-5 text-slate-400" />
            Practical Weather Decision Guide
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">
                  Before Starting Work Each Day
                </h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10003; Check Met Office forecast — wind, rain, temperature, lightning risk</li>
                  <li>&#10003; Visual inspection of scaffold for overnight weather damage</li>
                  <li>&#10003; Check platforms for ice, frost, standing water, or snow</li>
                  <li>&#10003; Check ground conditions at scaffold base</li>
                  <li>&#10003; Confirm all ties and fittings are secure</li>
                  <li>&#10003; Check sheeting/netting for damage if applicable</li>
                  <li>&#10003; Confirm scaffold tag shows current inspection status</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">
                  During the Working Day
                </h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10003; Monitor wind conditions continuously — watch for increasing gusts</li>
                  <li>&#10003; Watch for approaching storm clouds or sudden temperature drops</li>
                  <li>&#10003; If conditions deteriorate, carry out a dynamic risk assessment</li>
                  <li>&#10003; Stop work and evacuate if lightning is seen or thunder heard</li>
                  <li>&#10003; Stop erection/dismantling at force 6 (approximately 23 mph)</li>
                  <li>&#10003; Evacuate all scaffolds at force 8 (approximately 39 mph)</li>
                  <li>&#10003; Record any weather-related stop-work decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Legal Framework Summary                                      */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-400" />
            Legal Framework — Weather and Scaffolds
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="space-y-3 text-sm">
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-slate-400 font-semibold text-xs mb-1">
                  Work at Height Regulations 2005 — Schedule 7
                </p>
                <p className="text-white/70 text-xs">
                  Scaffolds must be inspected after any event likely to have
                  affected their stability, including adverse weather. The
                  scaffold must not be used until the inspection is complete and
                  recorded.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-slate-400 font-semibold text-xs mb-1">
                  NASC TG20:21 Guidance
                </p>
                <p className="text-white/70 text-xs">
                  Provides detailed wind loading calculations and guidance for
                  scaffold designers. Specifies how wind loads should be
                  calculated for open, netted, and sheeted scaffolds and the
                  corresponding tie and bracing requirements.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-slate-400 font-semibold text-xs mb-1">
                  NASC SG4:22 — Preventing Falls in Scaffolding Operations
                </p>
                <p className="text-white/70 text-xs">
                  Recommends that scaffold erection and dismantling should stop
                  when wind conditions reach approximately Beaufort force 6
                  (mean wind speed of approximately 23 mph / 37 km/h) and that
                  all scaffold work should cease at force 8.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-slate-400 font-semibold text-xs mb-1">
                  Health and Safety at Work Act 1974 — Section 2
                </p>
                <p className="text-white/70 text-xs">
                  General duty of employers to ensure the health, safety, and
                  welfare of employees. This includes providing a safe system
                  of work that accounts for foreseeable weather hazards.
                </p>
              </div>
            </div>
            <p className="text-white/60 text-xs mt-3 italic">
              Weather conditions are foreseeable — they are never a valid excuse
              for failing to take precautions. The duty holder is expected to
              check weather forecasts, establish wind speed limits for the
              specific scaffold, and plan for adverse conditions before they
              occur.
            </p>
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
          title="Section 3 — Weather & Environmental Conditions"
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
            <Link to="../scaffolding-awareness-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-slate-500 hover:bg-slate-500/90 text-white font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-5-section-4">
              Next: Loading, Storage & Prohibited Actions
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
