import { ArrowLeft, TriangleAlert, Skull, CheckCircle, AlertTriangle, BookOpen, Zap, ShieldAlert, Wind, HardHat } from "lucide-react";
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
    question: "What is the number one cause of fatalities involving mobile access towers?",
    options: [
      "Electrocution from overhead power lines",
      "Falls from unguarded or partially guarded platforms",
      "Tower collapse due to overloading",
      "Being struck by falling tools"
    ],
    correctAnswer: 1,
    explanation: "Falls from unguarded or partially guarded platforms remain the leading cause of tower-related deaths. Ensuring full guardrails, toeboards, and a properly secured platform before use is critical."
  },
  {
    question: "What is the minimum safe clearance distance from overhead power lines when positioning a tower near low-voltage lines?",
    options: [
      "3 metres",
      "6 metres",
      "9 metres",
      "15 metres"
    ],
    correctAnswer: 3,
    explanation: "A minimum clearance of 15 metres from overhead power lines is recommended. If work must take place closer, you must seek specific guidance from the Distribution Network Operator (DNO) before proceeding."
  },
  {
    question: "Why is climbing on the outside of a mobile access tower strictly prohibited?",
    options: [
      "It takes longer than using internal ladders",
      "It places the climber outside the fall protection zone and creates overturning forces",
      "It damages the tower frame finish",
      "It is only prohibited above 4 metres"
    ],
    correctAnswer: 1,
    explanation: "Climbing externally places the user outside any fall protection, creates lateral forces that can cause overturning, and is NEVER permitted regardless of tower height. Always climb internally using built-in ladders or stairs."
  },
  {
    question: "What should be used to prevent tools and materials falling from the platform?",
    options: [
      "Larger platform area",
      "Tool lanyards and toeboards",
      "A second worker watching from below",
      "Wrapping tools in cloth"
    ],
    correctAnswer: 1,
    explanation: "Tool lanyards secure tools to the user or tower, and toeboards (minimum 150mm high) prevent materials sliding off the platform edge. Both are required controls for preventing struck-by injuries at ground level."
  },
  {
    question: "What typically causes a mobile access tower to overturn?",
    options: [
      "Using the correct stabilisers",
      "Working in calm conditions on level ground",
      "Wind loading, overloading, uneven ground, or over-reaching",
      "Having too few people on the platform"
    ],
    correctAnswer: 2,
    explanation: "Overturning is caused by forces acting to tip the tower — wind loading, excessive weight on one side, uneven ground, or an operative leaning too far from the platform centre. All shift the centre of gravity beyond the base footprint."
  },
  {
    question: "What is a key consequence of not locking castors before climbing a tower?",
    options: [
      "The platform height changes",
      "The tower can roll unexpectedly, causing falls and collapse",
      "The castors wear out faster",
      "It makes the tower harder to move later"
    ],
    correctAnswer: 1,
    explanation: "Unlocked castors allow the tower to move when climbed or when lateral force is applied. This can cause the user to fall and, on uneven ground, can lead to sudden tower collapse."
  },
  {
    question: "According to HSE statistics, approximately what percentage of tower scaffold accidents involve incorrect assembly?",
    options: [
      "Around 10%",
      "Around 25%",
      "Around 50%",
      "Around 75%"
    ],
    correctAnswer: 1,
    explanation: "HSE data shows that approximately a quarter of mobile tower scaffold accidents are linked to incorrect assembly — missing braces, wrong build sequence, or components not fully locked. This underlines the need for trained, competent assemblers."
  },
  {
    question: "How does fatigue increase the risk of accidents when working on towers?",
    options: [
      "It makes the tower less stable",
      "It reduces concentration, reaction time, and grip strength",
      "It increases wind loading on the tower",
      "It only affects work above 10 metres"
    ],
    correctAnswer: 1,
    explanation: "Fatigue impairs cognitive function, slows reaction times, and weakens physical grip — all critical when working at height. Operatives should take regular breaks, stay hydrated, and avoid working at height when excessively tired."
  }
];

const quickCheckQuestions = [
  {
    question: "A tower is being set up near an 11kV overhead power line. The site manager says 10 metres clearance is enough. Is this correct?",
    options: [
      "Yes — 10 metres exceeds the 6-metre minimum",
      "No — minimum 15 metres clearance is required, or seek DNO guidance",
      "Yes — the tower is earthed so clearance does not matter",
      "No — you cannot use a tower within 50 metres of power lines"
    ],
    correctIndex: 1,
    explanation: "The minimum recommended clearance from overhead power lines is 15 metres. At 10 metres there is still serious risk of flashover, especially with 11kV high-voltage lines. Contact the DNO before proceeding."
  },
  {
    question: "Two operatives are on a single-width tower platform. The platform's safe working load is 275 kg. Together they weigh 170 kg and their tools weigh 60 kg. A third person asks to come up to pass materials. Should they allow it?",
    options: [
      "Yes — they have 45 kg to spare",
      "No — the load calculation must include dynamic forces, and three people on a single-width platform is unsafe",
      "Yes — the 275 kg limit is only a guideline",
      "No — only one person is ever allowed on a tower"
    ],
    correctIndex: 1,
    explanation: "Although the static weight totals 230 kg (170 + 60), dynamic forces from movement, and the physical space constraints of a single-width platform, mean a third person creates unacceptable risk. Always account for dynamic loading and safe movement space."
  },
  {
    question: "An operative is over-reaching from the platform to paint a wall section just out of comfortable arm's reach. What is the correct action?",
    options: [
      "Allow it — a small amount of over-reaching is acceptable",
      "Ask them to lean further and hold the guardrail",
      "Stop work, reposition the tower so the work is within safe reach, then continue",
      "Get a colleague to hold the tower base"
    ],
    correctIndex: 2,
    explanation: "Over-reaching shifts the operative's centre of gravity towards the platform edge, creating lateral forces that can overturn the tower. The correct response is always to reposition the tower so the work area is comfortably within reach."
  }
];

const faqs = [
  {
    question: "What are the most common causes of fatal tower scaffold accidents in the UK?",
    answer: "HSE data consistently shows falls from height as the primary cause, often from towers with missing or incomplete guardrails. Tower collapse from incorrect assembly is the second most common cause. Electrocution from overhead power lines, though less frequent, has a very high fatality rate when it does occur. Most fatalities involve towers that were not assembled by a trained, competent person."
  },
  {
    question: "Can an operative work on a tower in windy conditions?",
    answer: "Work should stop when wind speeds reach Beaufort Force 4 (20-28 km/h or 13-18 mph). At this level, loose paper blows around and small branches move. However, gusts can be significantly stronger than average wind speed, so judgement is required. If the tower is sheeted (wrapped in netting or sheeting), wind loads increase dramatically and lower thresholds apply. Always check the manufacturer's wind speed limits for the specific tower configuration."
  },
  {
    question: "Is it acceptable to modify a tower to suit the job?",
    answer: "No. Unauthorised modifications — such as removing braces to fit around obstacles, adding homemade outriggers, or mixing components from different manufacturers — are strictly prohibited. Any modification invalidates the design integrity and load calculations. If the standard tower does not suit the task, a different type of access equipment must be selected or the manufacturer consulted for an approved solution."
  },
  {
    question: "How often should hazard awareness be refreshed for regular tower users?",
    answer: "PASMA recommends refresher training at least every 5 years, but good practice includes toolbox talks at the start of each project, daily briefings on site-specific hazards, and immediate re-briefing whenever conditions change (weather, ground conditions, new overhead services discovered). Many employers require annual refresher sessions as part of their safety management systems."
  }
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function IpafModule5Section1() {
  useSEO({
    title: "Common Hazards & Accident Causes | Module 5 | IPAF Mobile Scaffold",
    description: "Falls from height, tower collapse, overturning, electrocution, falling objects, over-reaching, and fatigue — the common hazards and accident causes when using mobile access towers.",
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
            <Link to="../ipaf-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">Module 5 {"\u2022"} Section 1</p>
            <h1 className="text-sm font-semibold text-white truncate">Common Hazards & Accident Causes</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 mb-4">
            <TriangleAlert className="h-8 w-8 text-red-400" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
              Module 5 {"\u2022"} Section 1
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Common Hazards & Accident Causes</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Understanding the most frequent causes of tower scaffold accidents and how to recognise hazards before they cause harm
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-elec-yellow mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Falls from unguarded platforms are the number one killer in tower scaffold work. Tower collapse from incorrect assembly, overturning from wind or overloading, electrocution from overhead power lines, and being struck by falling objects make up the remaining major hazard categories. Every one of these is preventable with proper training, inspection, and planning.
          </p>
        </div>

        {/* On Site Box */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-red-400 mb-2 flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            On Site
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Before anyone climbs a tower, ask yourself: Are all guardrails in place? Are castors locked? Is the ground firm and level? Are there overhead power lines within 15 metres? Is the wind below Force 4? Has the tower been inspected today? If any answer is "no" or "I'm not sure," do not use the tower until the issue is resolved.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Identify the most common hazards associated with mobile access tower use",
              "Explain why falls from height are the leading cause of tower scaffold fatalities",
              "Describe how incorrect assembly leads to tower collapse",
              "Recognise the dangers of overhead power lines, falling objects, and over-reaching",
              "Understand the role of fatigue, unauthorised modifications, and overloading in accidents",
              "Relate HSE accident statistics to real-world site hazards"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 — Falls from Height                               */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">01</span>
            <h3 className="text-xl font-semibold text-white">Falls from Unguarded Platforms</h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Falls from unguarded or partially guarded platforms are the <strong className="text-red-400">number one cause of deaths</strong> involving mobile access towers in the UK. HSE investigation reports consistently highlight the same failure pattern: guardrails not installed, trapdoors left open, or platforms used before assembly was complete.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Why Falls Happen</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Guardrails not installed at every working platform level</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Trapdoors in platforms left open after climbing through</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Workers standing on incomplete platforms during assembly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Toeboards missing, allowing feet to slide under guardrails</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Operatives leaning over guardrails to reach work</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Prevention</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Every working platform must have full double guardrails (main guardrail at 950mm minimum, intermediate guardrail at approximately 470mm) and toeboards at least 150mm high on all open sides. The platform trapdoor must be closed whenever operatives are working on that level. These requirements apply regardless of the platform height — there is no "safe" height to fall from.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 — Tower Collapse                                  */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-sm">02</span>
            <h3 className="text-xl font-semibold text-white">Tower Collapse from Incorrect Assembly</h3>
          </div>
          <div className="border-l-2 border-orange-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A mobile access tower is an engineered structure. Every brace, frame, and platform works together to distribute loads safely. When components are missing, in the wrong position, or from the wrong manufacturer, the entire structure can fail catastrophically and without warning.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Common Assembly Failures</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Missing diagonal braces</strong> — braces transfer lateral loads; without them, the tower racks sideways under even light forces</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Wrong assembly sequence</strong> — following the wrong build order can leave structural gaps at critical load points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Components not fully locked</strong> — spigot pins, brace hooks, and platform catches must all be fully engaged and checked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Mixed manufacturer components</strong> — components from different systems may appear similar but have different load ratings and connection tolerances</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Damaged components used</strong> — bent frames, cracked welds, and corroded tubes significantly reduce structural capacity</span>
                </li>
              </ul>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              HSE data indicates that approximately <strong className="text-white">25% of tower scaffold accidents</strong> are linked to incorrect assembly. Towers must only be assembled, altered, and dismantled by persons who have received appropriate training — such as the PASMA Towers for Users course.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 03 — Overturning                                     */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">03</span>
            <h3 className="text-xl font-semibold text-white">Overturning</h3>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Overturning occurs when external forces or weight distribution shifts the tower's centre of gravity beyond its base footprint. Once tipping begins, the tower accelerates and there is no practical way to stop it.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <Wind className="h-5 w-5 text-amber-400 mb-2" />
                <h4 className="font-semibold text-white text-sm mb-1">Wind Loading</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  Wind creates lateral force on the tower structure, sheeting, and operatives. Force increases with the square of wind speed — doubling the wind speed quadruples the force. Sheeted towers are especially vulnerable.
                </p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <AlertTriangle className="h-5 w-5 text-amber-400 mb-2" />
                <h4 className="font-semibold text-white text-sm mb-1">Overloading</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  Exceeding the safe working load (typically 275 kg per platform) or concentrating weight on one side of the platform shifts the centre of gravity. Multiple users must be aware of combined weight including tools and materials.
                </p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <ShieldAlert className="h-5 w-5 text-amber-400 mb-2" />
                <h4 className="font-semibold text-white text-sm mb-1">Uneven Ground</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  Setting up on slopes, soft ground, drains, or uncompacted fill means the tower's base is not uniformly supported. One leg can sink, instantly creating a tipping moment. Always use base plates on firm, level ground.
                </p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <Skull className="h-5 w-5 text-amber-400 mb-2" />
                <h4 className="font-semibold text-white text-sm mb-1">Over-reaching</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  Leaning beyond the platform edge moves the operative's weight outside the base footprint. The correct response is always to reposition the tower, never to lean further.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="A tower has been assembled on a slight slope in a car park. The operative says it 'feels fine' and wants to start work. What should you do?"
          options={[
            "Allow work — if it feels stable it probably is",
            "Add extra weight to the low side to balance it",
            "Do not allow use — the tower must be on firm, level ground; use adjustable legs or relocate",
            "Continue but limit work to below 4 metres"
          ]}
          correctIndex={2}
          explanation="A tower must always be erected on firm, level ground. 'Feels fine' is not an acceptable assessment. Use adjustable base legs to level the tower on minor slopes, or relocate to level ground. If the slope exceeds the manufacturer's specified limit, the tower cannot be used at that location."
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 — Electrocution                                   */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 font-bold text-sm">04</span>
            <h3 className="text-xl font-semibold text-white">Electrocution from Overhead Power Lines</h3>
          </div>
          <div className="border-l-2 border-yellow-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Contact with or proximity to overhead power lines causes some of the most severe tower scaffold accidents. Electricity can arc (flashover) across an air gap — direct physical contact is not required. Aluminium towers are excellent conductors, meaning current will pass through the entire structure to anyone touching it at ground level.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Clearance Requirements</h4>
              <div className="space-y-2 text-sm text-white/70">
                <p><strong className="text-yellow-400">Minimum 15 metres</strong> clearance from overhead power lines before any tower work begins</p>
                <p>If work must take place within 15 metres, <strong className="text-white">you must contact the Distribution Network Operator (DNO)</strong> for specific guidance — they may isolate the line, install barriers, or specify exact safe distances</p>
                <p>Remember to account for the <strong className="text-white">full tower height plus any tools or materials</strong> that could be raised above the platform (e.g., scaffold poles, paint rollers on extension handles)</p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-2">Critical Warning</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Overhead power lines can carry voltages from 230V (single-phase domestic) to 400kV (National Grid). At higher voltages, flashover can occur at distances of several metres. Never assume a line is "low voltage" based on appearance — always treat every overhead line as potentially lethal and maintain the 15-metre minimum clearance.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 — Falling Objects                                 */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">05</span>
            <h3 className="text-xl font-semibold text-white">Struck by Falling Objects</h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Tools, materials, and debris falling from the platform can cause serious injury or death to anyone below. Even a small spanner dropped from 6 metres generates enough force to cause a fatal head injury.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Prevention Controls</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Tool lanyards</strong> — attach all hand tools to a wrist strap or tower anchor point</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Toeboards</strong> — minimum 150mm high on all open sides, preventing items sliding off</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Brick guards / mesh panels</strong> — used when materials on the platform could fall through gaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Exclusion zones</strong> — barrier off the area below and around the tower base</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Hard hats</strong> — required PPE for anyone within the exclusion zone at ground level</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="An operative on a tower at 7 metres is using a hand drill without a tool lanyard. They say 'I'll be careful.' Is this acceptable?"
          options={[
            "Yes — being careful is a valid control measure",
            "Yes — tool lanyards are only required above 10 metres",
            "No — tool lanyards must be used for all tools at height regardless of the operative's confidence",
            "No — the drill should be left on the ground"
          ]}
          correctIndex={2}
          explanation="Tool lanyards are required whenever tools are used at height. 'Being careful' is not an engineering control and does not prevent the consequences of a momentary lapse. A 2 kg drill dropped from 7 metres reaches approximately 42 km/h at ground level."
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 — Unlocked Castors & External Climbing            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">06</span>
            <h3 className="text-xl font-semibold text-white">Unlocked Castors & Climbing Externally</h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2">Unlocked Castors</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Every castor must be locked before anyone climbs the tower. Even gentle movement can cause the tower to roll into an obstacle, off level ground, or into a gap. Castor locks must be checked as part of every pre-use inspection — they can work loose during the day through vibration.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2">Climbing Outside the Tower</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Climbing on the outside of a tower is <strong className="text-red-400">NEVER permitted</strong> — regardless of height, urgency, or how quick the task seems. External climbing places the user outside all fall protection and applies lateral forces that can overturn the tower. Always use the internal ladder or stairway access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 07 — Unauthorised Modifications & Overloading        */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm">07</span>
            <h3 className="text-xl font-semibold text-white">Unauthorised Modifications & Overloading</h3>
          </div>
          <div className="border-l-2 border-emerald-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Towers are engineered systems designed and tested as complete assemblies. Any modification that was not specified by the manufacturer invalidates the structural design. This includes:
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Removing braces or guardrails to fit around obstacles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Adding homemade outriggers, ties, or extensions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Mixing components from different manufacturers or product ranges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Using boards, boxes, or steps on the platform to gain extra height</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Tying the tower to an adjacent structure without manufacturer guidance</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Overloading & Multiple Users</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The safe working load (SWL) of a tower platform is typically 275 kg for Class 3 (BS EN 1004-1:2020). This must include the combined weight of all persons, tools, materials, and equipment on the platform. Multiple users must coordinate to ensure the SWL is never exceeded and that their combined movement does not create excessive dynamic forces. Always check the manufacturer's data plate for the specific tower's SWL.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 08 — Fatigue                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-sm">08</span>
            <h3 className="text-xl font-semibold text-white">Fatigue-Related Errors</h3>
          </div>
          <div className="border-l-2 border-sky-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Working at height demands sustained concentration, physical coordination, and good grip strength. Fatigue degrades all three, making accidents more likely as the day progresses or when operatives have not rested adequately.
            </p>
            <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Fatigue Risk Factors</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Long shifts without adequate breaks (especially in hot weather)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Physically demanding assembly and dismantling work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Repeated climbing up and down the tower</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Dehydration and inadequate nutrition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Insufficient rest between shifts or working excessive overtime</span>
                </li>
              </ul>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Employers have a duty under the Working Time Regulations 1998 and the Management of Health and Safety at Work Regulations 1999 to manage fatigue. Operatives working at height should take regular breaks, stay hydrated, and report to their supervisor if they feel too tired to work safely. It is never acceptable to continue working at height when fatigued.
            </p>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="HSE statistics show that around 25% of tower scaffold accidents involve incorrect assembly. Who should assemble a mobile access tower?"
          options={[
            "Any competent labourer with construction experience",
            "A person who has received specific training such as the PASMA Towers for Users course",
            "The site manager, regardless of training",
            "Anyone, as long as they follow the pictures on the box"
          ]}
          correctIndex={1}
          explanation="Towers must be assembled by persons who have received appropriate training from a recognised provider. The PASMA Towers for Users course is the industry-standard qualification. General construction experience alone is not sufficient — tower assembly requires specific knowledge of sequences, component identification, and structural principles."
        />

        {/* ------------------------------------------------------------ */}
        {/*  HSE Statistics Summary                                       */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            HSE Accident Statistics — Key Facts
          </h3>
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-red-400 font-semibold mb-1">Falls from Height</p>
                <p className="text-white/70">Account for the majority of fatal and major injuries from tower scaffolds — almost all involving missing or incomplete guardrails</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-orange-400 font-semibold mb-1">Incorrect Assembly</p>
                <p className="text-white/70">Linked to approximately 25% of all tower scaffold accidents, including many fatalities from collapse</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-yellow-400 font-semibold mb-1">Electrocution</p>
                <p className="text-white/70">Less frequent but with an extremely high fatality rate — most incidents involve overhead power lines that were not identified during planning</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold mb-1">Falling Objects</p>
                <p className="text-white/70">Significant cause of injury to ground-level workers and members of the public near tower operations</p>
              </div>
            </div>
            <div className="mt-4 bg-black/20 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Why These Numbers Matter</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                HSE enforcement data shows that mobile tower scaffold incidents are one of the most frequently investigated categories of work-at-height accidents. Prosecution rates are high when investigations reveal a lack of training, missing risk assessments, or ignored manufacturer instructions. Beyond the legal consequences, each statistic represents a real person — someone who did not go home that day. The purpose of hazard awareness training is to ensure you never become one of these statistics.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Hazard Interaction Effects                                   */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            Hazard Interactions — Compound Risk
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              In practice, tower scaffold accidents rarely involve a single hazard in isolation. Most serious incidents result from two or more hazards combining to create a situation worse than either alone. Understanding these interactions is key to effective hazard awareness.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <h4 className="font-semibold text-orange-400 text-xs mb-1">Wind + Overloading</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  A tower at its safe working load is more susceptible to overturning because its centre of gravity is higher. If wind then applies a lateral force, the combined effect can exceed the tower's stability margin. Either factor alone might be acceptable — together they are not.
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <h4 className="font-semibold text-orange-400 text-xs mb-1">Fatigue + Incorrect Assembly</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  A fatigued assembler is more likely to miss a brace, fail to engage a lock, or follow the wrong sequence. The resulting structural weakness may not be obvious until the tower is loaded, at which point it can collapse without warning.
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <h4 className="font-semibold text-orange-400 text-xs mb-1">Soft Ground + Unlocked Castors</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  On soft ground, an unlocked castor can roll into a depression or soft patch, causing the tower to lean suddenly. On a firm surface, the same unlocked castor might only cause a slow roll — on soft ground, the failure mode is sudden and catastrophic.
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <h4 className="font-semibold text-orange-400 text-xs mb-1">Over-reaching + Missing Toeboard</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  Over-reaching shifts the user's weight to the platform edge. If toeboards are missing, there is nothing to prevent their feet sliding under the guardrail. The combination turns a recoverable over-reach into a fall from height.
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              The key lesson: never assume a single small shortcoming is "not that bad." On site, hazards rarely occur alone — they interact, amplify each other, and create conditions where accidents become almost inevitable. Effective hazard management means addressing every hazard, not just the obvious ones.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Key Terminology Reference                                    */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Key Terminology</h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-elec-yellow font-bold min-w-[100px] flex-shrink-0">SWL</span>
                <span className="text-white/70">Safe Working Load — the maximum load a platform can safely support, including persons, tools, and materials (typically 275 kg for Class 3)</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-elec-yellow font-bold min-w-[100px] flex-shrink-0">DNO</span>
                <span className="text-white/70">Distribution Network Operator — the company responsible for the local electricity distribution network; must be contacted for guidance on working near their overhead lines</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-elec-yellow font-bold min-w-[100px] flex-shrink-0">Beaufort F4</span>
                <span className="text-white/70">Moderate breeze (20-28 km/h) — the wind speed threshold above which tower work should stop and towers should not be moved</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-elec-yellow font-bold min-w-[100px] flex-shrink-0">Flashover</span>
                <span className="text-white/70">Electrical discharge through the air from a high-voltage conductor to a nearby object — can occur without physical contact with overhead power lines</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-elec-yellow font-bold min-w-[100px] flex-shrink-0">Dynamic Load</span>
                <span className="text-white/70">Forces generated by movement on the platform — walking, lifting, or moving materials creates loads greater than the static weight of the items</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-elec-yellow font-bold min-w-[100px] flex-shrink-0">Racking</span>
                <span className="text-white/70">Sideways distortion of the tower frame caused by lateral forces — prevented by properly installed diagonal braces</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Real-World Scenario                                          */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            Real-World Scenario
          </h3>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-3">
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-amber-400">Scenario:</strong> A maintenance contractor erects a mobile tower in a car park to access a first-floor guttering repair. The car park slopes slightly for drainage. It is a breezy morning, and the contractor decides to get the job done quickly before the wind picks up. They assemble the tower without stabilisers ("it's only 3 metres high"), leave the trapdoor open for quick access, and climb up carrying tools in both hands.
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-white">How many hazards can you identify?</strong>
            </p>
            <div className="bg-black/20 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Sloping ground — not level, tower could lean or roll</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>No stabilisers — reduced stability, especially on a slope</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Breezy conditions — approaching or at Force 4, may worsen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Trapdoor left open — fall hazard through the platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Carrying tools in both hands while climbing — no three-point contact, tools could fall</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Working alone — no buddy system, no rescue plan in evidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Rushing to beat the weather — time pressure compromises safety decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Car park — public access, vehicles may approach the tower</span>
                </li>
              </ul>
            </div>
            <p className="text-white/60 text-xs italic">
              This scenario combines multiple hazards that individually might seem minor but together create conditions for a serious accident. Recognising hazard interactions is a key skill from this section.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Practical Guidance                                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HardHat className="h-5 w-5 text-green-400" />
            Practical Guidance
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">Daily Hazard Checklist</h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10003; Check weather forecast — wind, rain, ice</li>
                  <li>&#10003; Inspect ground conditions beneath and around tower</li>
                  <li>&#10003; Confirm overhead clearance from power lines and structures</li>
                  <li>&#10003; Verify all guardrails, toeboards, and platforms are secure</li>
                  <li>&#10003; Check all castors are locked and adjustable legs are tight</li>
                  <li>&#10003; Ensure exclusion zone is maintained at base</li>
                  <li>&#10003; Confirm tool lanyards are available and in use</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">Stop Work Triggers</h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10003; Wind reaches Beaufort Force 4 or above</li>
                  <li>&#10003; Any guardrail or toeboard missing or damaged</li>
                  <li>&#10003; Ground conditions change (rain softening, excavation nearby)</li>
                  <li>&#10003; Overhead hazard identified that was not in the plan</li>
                  <li>&#10003; Tower has been struck by a vehicle or load</li>
                  <li>&#10003; Operative feels unwell, dizzy, or fatigued</li>
                  <li>&#10003; SWL exceeded or at risk of being exceeded</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Hierarchy of Most to Least Common                            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Hazard Frequency — Most to Least Common</h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-full bg-red-500/20 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-red-500/30 rounded-l-lg" style={{ width: '95%' }}></div>
                  <p className="relative text-white/90 font-medium text-xs">Falls from unguarded platforms</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-full bg-orange-500/20 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-orange-500/30 rounded-l-lg" style={{ width: '65%' }}></div>
                  <p className="relative text-white/90 font-medium text-xs">Tower collapse (incorrect assembly)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-full bg-amber-500/20 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-amber-500/30 rounded-l-lg" style={{ width: '50%' }}></div>
                  <p className="relative text-white/90 font-medium text-xs">Overturning (wind, overload, uneven ground)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-full bg-blue-500/20 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-blue-500/30 rounded-l-lg" style={{ width: '40%' }}></div>
                  <p className="relative text-white/90 font-medium text-xs">Struck by falling objects</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-full bg-yellow-500/20 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-yellow-500/30 rounded-l-lg" style={{ width: '20%' }}></div>
                  <p className="relative text-white/90 font-medium text-xs">Electrocution (overhead power lines)</p>
                </div>
              </div>
            </div>
            <p className="text-white/50 text-xs mt-3 italic">
              Note: Electrocution is least frequent but has the highest fatality rate per incident. Frequency of occurrence does not correlate with severity of outcome.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-white mb-2 text-sm">{faq.question}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 1 — Common Hazards & Accident Causes"
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
            <Link to="../ipaf-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-5-section-2">
              Next: Risk Assessment for Tower Use
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
