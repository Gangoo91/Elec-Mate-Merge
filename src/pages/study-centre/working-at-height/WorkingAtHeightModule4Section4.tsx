import {
  ArrowLeft,
  Cloud,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  Wind,
  Droplets,
  Snowflake,
  Zap,
  Thermometer,
  Mountain,
  Users,
  Eye,
  TriangleAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wah-m4s4-beaufort-force5",
    question:
      "At Beaufort Force 5 (fresh breeze, 19-24 mph), what action should be taken regarding scaffold and ladder work at height?",
    options: [
      "Continue working with extra PPE",
      "Stop most scaffold and ladder work at height",
      "Only stop if workers complain about the wind",
      "Double the number of tie points on the scaffold",
    ],
    correctIndex: 1,
    explanation:
      "Beaufort Force 5 (fresh breeze, 19-24 mph) is the threshold at which most scaffold and ladder work at height must be stopped. At this wind speed, small trees in leaf begin to sway and handling materials or maintaining balance at height becomes dangerous. Work with large panels or sheeting should actually stop even earlier at Force 4.",
  },
  {
    id: "wah-m4s4-lightning-rule",
    question:
      "What is the 30/30 rule for lightning safety during work at height?",
    options: [
      "Work for 30 minutes, then take a 30-minute break",
      "If less than 30 seconds between lightning flash and thunder, stop work. Wait 30 minutes after the last flash before resuming",
      "Stay at least 30 metres from any metallic structure for 30 minutes during a storm",
      "Lightning is only dangerous within 30 metres of the strike point for 30 seconds",
    ],
    correctIndex: 1,
    explanation:
      "The 30/30 rule states: if the time between seeing a lightning flash and hearing the thunder is less than 30 seconds, you are within strike range and must stop all outdoor work at height and take shelter immediately. Wait at least 30 minutes after the last observed flash or thunder before resuming work.",
  },
  {
    id: "wah-m4s4-overhead-lines",
    question:
      "What is the minimum recommended exclusion zone for work near overhead power lines at voltages up to 33kV?",
    options: [
      "1 metre",
      "3 metres (or as defined by HSE GS6 guidance)",
      "10 metres",
      "No exclusion zone is needed if the operator is wearing rubber gloves",
    ],
    correctIndex: 1,
    explanation:
      "HSE guidance GS6 'Avoiding danger from overhead power lines' recommends minimum clearance distances. For voltages up to 33kV, a minimum clearance of 3 metres from the nearest conductor is typically required, though this varies with voltage and specific circumstances. The distribution network operator (DNO) should be consulted for site-specific guidance. Rubber gloves provide NO protection against overhead line voltages.",
  },
];

const faqs = [
  {
    question:
      "Can an anemometer reading alone determine whether to stop work at height?",
    answer:
      "An anemometer provides an objective wind speed measurement, which is valuable. However, it should not be the sole factor. Anemometer readings can vary depending on where on site the measurement is taken — wind speed at ground level may be significantly lower than at the working height. Additionally, factors such as wind gusts (which may be much higher than the average reading), wind direction relative to the work face, and the type of work being done (handling large panels is more wind-sensitive than general work) must all be considered. Use the anemometer as one input alongside visual indicators, weather forecasts, and the judgement of the competent person.",
  },
  {
    question:
      "What should be done if ground conditions are found to be unsuitable after equipment has been set up?",
    answer:
      "If ground conditions are found to be unsuitable (soft, waterlogged, sloping, or undermined) after equipment such as scaffold or MEWP has been set up, the equipment must not be used until the ground conditions are corrected. This may involve installing proper ground mats or sole plates, compacting the ground, or relocating the equipment to a suitable position. Workers must not access the equipment while the ground is unsuitable. An inspection must be carried out after any remedial work before the equipment is used.",
  },
  {
    question:
      "Are there specific regulations about working at height in hot weather?",
    answer:
      "There is no specific UK regulation that sets a maximum temperature for work at height. However, the employer has a general duty under the Management of Health and Safety at Work Regulations 1999 to assess risks, which includes the risk of heat stress. HSE guidance recommends providing shade where possible, ensuring access to drinking water, scheduling heavy work for cooler parts of the day, and monitoring workers for signs of heat stress (confusion, dizziness, nausea, headache). For work at height, heat-related impairment can increase fall risk significantly.",
  },
  {
    question:
      "What are goal posts and when are they used near overhead power lines?",
    answer:
      "Goal posts are physical barriers — usually made of timber or non-conductive material — erected on either side of a route that passes beneath overhead power lines. They are set at a height that provides adequate clearance below the power lines and act as a physical 'height gauge' to prevent tall vehicles or raised equipment from encroaching on the safe clearance distance. They are used on construction sites where vehicles, MEWPs, or cranes must operate near overhead lines. Their position and height are determined by the distribution network operator (DNO) based on the line voltage and sag. A banksman should also be present to guide operations in the area.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "At what Beaufort Force should ALL work at height be stopped regardless of task type?",
    options: [
      "Force 4 — moderate breeze (13-18 mph)",
      "Force 5 — fresh breeze (19-24 mph)",
      "Force 6 — strong breeze (25-31 mph)",
      "Force 8 — gale (39-46 mph)",
    ],
    correctAnswer: 2,
    explanation:
      "At Beaufort Force 6 (strong breeze, 25-31 mph), ALL work at height must stop. At this wind speed, large branches are in motion, umbrellas are difficult to use, and maintaining balance or controlling equipment at height is extremely dangerous. Some operations (crane work, large panel handling) should stop at even lower wind speeds.",
  },
  {
    id: 2,
    question:
      "Why is ice on scaffold boards particularly dangerous even when temperatures are above freezing?",
    options: [
      "Ice damages the scaffold boards permanently",
      "Black ice can form from overnight temperatures and remain even as air temperature rises above freezing, creating an invisible slip hazard",
      "Ice makes the scaffold too heavy to support workers",
      "Ice only forms below -5 degrees Celsius",
    ],
    correctAnswer: 1,
    explanation:
      "Black ice forms overnight when temperatures drop below freezing and can persist for hours even after air temperature rises above 0 degrees. It is nearly invisible on metal scaffold boards and creates an extreme slip hazard. This is why scaffold boards must be inspected and de-iced before use on any morning following a cold night, regardless of the current air temperature.",
  },
  {
    id: 3,
    question:
      "What effect does heavy rain have on ladder use?",
    options: [
      "No effect — ladders are designed to be used in all weather",
      "Rain reduces grip on rungs, impairs visibility, and makes hand tools slippery",
      "Rain only affects wooden ladders, not aluminium ones",
      "Rain improves grip because it cleans the rungs",
    ],
    correctAnswer: 1,
    explanation:
      "Heavy rain reduces grip on ladder rungs (both hands and feet), impairs visibility through safety glasses, and makes hand tools slippery. Water on aluminium rungs creates a significant slip hazard. Additionally, rain soaking into clothing causes cold stress and fatigue, further increasing fall risk. Electrical work on ladders in rain creates additional electrocution risks.",
  },
  {
    id: 4,
    question:
      "What is the primary risk when MEWP outriggers are deployed on soft or waterlogged ground?",
    options: [
      "The outriggers may rust",
      "The ground may not support the load, causing the outrigger to sink and the MEWP to become unstable or overturn",
      "The MEWP battery may get wet",
      "The outrigger pads may get muddy",
    ],
    correctAnswer: 1,
    explanation:
      "If the ground is soft, waterlogged, or has been disturbed (such as recently backfilled trenches), the outrigger pads may sink under the load of the MEWP. This causes the machine to become unstable and can lead to overturning — one of the most dangerous MEWP incidents. Ground conditions must be assessed and, if necessary, timber mats, steel plates, or engineered spreader pads must be used to distribute the load.",
  },
  {
    id: 5,
    question:
      "Under the 30/30 rule, how long must you wait after the last lightning flash before resuming work at height?",
    options: [
      "5 minutes",
      "15 minutes",
      "30 minutes",
      "1 hour",
    ],
    correctAnswer: 2,
    explanation:
      "The 30/30 rule requires waiting at least 30 minutes after the last observed lightning flash or thunder before resuming any outdoor work at height. Lightning can strike from a clear sky up to 10 miles from the centre of a thunderstorm, so the storm does not need to be directly overhead to be dangerous.",
  },
  {
    id: 6,
    question:
      "What document provides HSE guidance on avoiding danger from overhead power lines?",
    options: [
      "Approved Code of Practice L74",
      "HSE GS6",
      "BS EN 131 Part 1",
      "INDG401",
    ],
    correctAnswer: 1,
    explanation:
      "HSE Guidance Note GS6 'Avoiding danger from overhead power lines' is the primary guidance document for managing the risks of working near overhead power lines. It covers safe clearance distances, the use of goal posts, banksmen, and the requirements for consultation with the distribution network operator.",
  },
  {
    id: 7,
    question:
      "Which of the following is a key concern when working at height in cold conditions?",
    options: [
      "Workers may complain about the temperature",
      "Cold reduces hand dexterity and grip strength, increases fatigue, and numbs the ability to detect grip loss on ladders and handrails",
      "Cold weather only affects outdoor work above 10 metres",
      "Cold weather makes falls less dangerous because the ground is harder",
    ],
    correctAnswer: 1,
    explanation:
      "Cold conditions reduce hand dexterity and grip strength, which directly increases the risk of losing grip on ladder rungs, handrails, and tools. Cold also increases fatigue, slows reaction times, and reduces mental alertness. Numbness in fingers and toes means the worker may not realise their grip is failing until it is too late. Appropriate clothing, regular warm-up breaks, and reduced shift durations should be considered.",
  },
  {
    id: 8,
    question:
      "What is the purpose of an exclusion zone around work at height?",
    options: [
      "To keep the work area tidy",
      "To prevent members of the public and other workers from being struck by falling materials, tools, or persons",
      "To give the workers more space for their equipment",
      "To mark the area for future construction work",
    ],
    correctAnswer: 1,
    explanation:
      "Exclusion zones prevent people at ground level from being struck by falling materials, tools, debris, or — in the worst case — a falling person. The size of the exclusion zone depends on the height of the work, the type of work being done, and the potential for materials to bounce or roll after landing. Barriers, signage, and banksmen should be used to enforce the exclusion zone.",
  },
];

export default function WorkingAtHeightModule4Section4() {
  useSEO({
    title:
      "Weather, Environment & Site Conditions | Working at Height Module 4.4",
    description:
      "Beaufort scale thresholds for work at height, rain, ice, lightning, temperature extremes, ground conditions, overhead power lines, and public protection measures.",
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
            <Link to="../working-at-height-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-500/30 mb-4">
            <Cloud className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Weather, Environment &amp; Site Conditions
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Beaufort scale wind thresholds, rain, ice, lightning, temperature
            extremes, ground conditions, overhead power lines, and protecting the
            public during work at height
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Force 5:</strong> stop most scaffold/ladder work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Force 6+:</strong> stop ALL work at height
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Lightning:</strong> 30/30 rule &mdash; stop and shelter
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Before:</strong> check forecast, inspect ground, look up
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>During:</strong> monitor wind, watch for weather changes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Public:</strong> exclusion zones, barriers, signage
                </span>
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
              "State the Beaufort scale thresholds for stopping different types of WAH",
              "Explain the hazards of rain, ice, and frost for work at height",
              "Describe the 30/30 rule for lightning safety",
              "Identify ground condition hazards and their effects on equipment stability",
              "Explain minimum clearance distances for overhead power lines (HSE GS6)",
              "Describe public protection measures including exclusion zones and barriers",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-amber-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Beaufort Scale Thresholds for WAH */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">01</span>
            Beaufort Scale Thresholds for WAH
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Wind is the most common weather hazard affecting work at height. The{" "}
                <strong>Beaufort scale</strong> provides a standard way of classifying
                wind speed and its effects. For work at height, specific Beaufort Force
                levels act as trigger points for restricting or stopping different
                types of work.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> Wind speed
                  increases with height. A Force 4 breeze at ground level may be Force
                  5 or higher at the top of a scaffold. The competent person must
                  consider the wind speed at the working height, not just at ground
                  level. If in doubt, use an anemometer at the working position.
                </p>
              </div>

              {/* Beaufort Scale Reference Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <Wind className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">
                      Beaufort Scale &mdash; WAH Reference
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Force 0-1 */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <span className="text-xs font-bold text-green-400 w-14">
                          Force 0-1
                        </span>
                        <span className="text-xs text-white/60">0-3 mph</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white/70">
                          Calm to light air. Smoke rises vertically or drifts slightly.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-green-400 whitespace-nowrap">
                        All WAH OK
                      </span>
                    </div>
                  </div>

                  {/* Force 2-3 */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <span className="text-xs font-bold text-green-400 w-14">
                          Force 2-3
                        </span>
                        <span className="text-xs text-white/60">4-12 mph</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white/70">
                          Light to gentle breeze. Leaves rustle, small twigs move.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-green-400 whitespace-nowrap">
                        All WAH OK
                      </span>
                    </div>
                  </div>

                  {/* Force 4 */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <span className="text-xs font-bold text-amber-400 w-14">
                          Force 4
                        </span>
                        <span className="text-xs text-white/60">13-18 mph</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white/70">
                          Moderate breeze. Dust and paper raised, small branches move.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-amber-400 whitespace-nowrap">
                        Caution &mdash; panels/sheeting
                      </span>
                    </div>
                  </div>

                  {/* Force 5 */}
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <span className="text-xs font-bold text-orange-400 w-14">
                          Force 5
                        </span>
                        <span className="text-xs text-white/60">19-24 mph</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white/70">
                          Fresh breeze. Small trees in leaf sway, crested wavelets on
                          water.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-orange-400 whitespace-nowrap">
                        Stop scaffold/ladder WAH
                      </span>
                    </div>
                  </div>

                  {/* Force 6 */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <span className="text-xs font-bold text-red-400 w-14">
                          Force 6
                        </span>
                        <span className="text-xs text-white/60">25-31 mph</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white/70">
                          Strong breeze. Large branches move, whistling in wires,
                          difficult to use umbrella.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-red-400 whitespace-nowrap">
                        Stop ALL WAH
                      </span>
                    </div>
                  </div>

                  {/* Force 7 */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <span className="text-xs font-bold text-red-400 w-14">
                          Force 7
                        </span>
                        <span className="text-xs text-white/60">32-38 mph</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white/70">
                          Near gale. Whole trees sway, difficulty walking against wind.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-red-400 whitespace-nowrap">
                        Stop ALL WAH + secure
                      </span>
                    </div>
                  </div>

                  {/* Force 8+ */}
                  <div className="bg-red-500/15 border border-red-500/30 rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <span className="text-xs font-bold text-red-400 w-14">
                          Force 8+
                        </span>
                        <span className="text-xs text-white/60">39+ mph</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white/70">
                          Gale to storm. Twigs broken, structural damage possible.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-red-400 whitespace-nowrap">
                        Evacuate &amp; shelter
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                  <p className="text-xs text-white/60">
                    <strong className="text-amber-400">Note:</strong> Crane
                    operations typically cease at lower wind speeds than general WAH
                    (often Force 4 or as specified by the crane manufacturer). Tower
                    crane operators monitor wind speed continuously using on-board
                    anemometers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Rain and Wet Conditions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">02</span>
            Rain &amp; Wet Conditions
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Rain affects work at height in multiple ways. It is not simply a matter
                of comfort &mdash; wet conditions create genuine hazards that
                significantly increase the risk of falls and other injuries.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    How Rain Affects WAH
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Slippery surfaces:</strong> Wet
                    scaffold boards, ladder rungs, MEWP platforms, and roof surfaces
                    all become significantly more slippery when wet. Aluminium
                    ladder rungs are particularly hazardous in rain. Anti-slip
                    surfaces help but do not eliminate the risk.
                  </p>
                  <p>
                    <strong className="text-white">Reduced grip:</strong> Wet hands
                    have reduced grip strength. This affects the ability to hold tools,
                    materials, and handrails. Wet gloves can also reduce grip rather
                    than improve it, depending on the glove type and material being
                    handled.
                  </p>
                  <p>
                    <strong className="text-white">Impaired visibility:</strong> Rain
                    on safety glasses or face shields obscures vision. Persistent rain
                    reduces visibility of the work area and of other site activities.
                    This is particularly dangerous when working near edges or openings.
                  </p>
                  <p>
                    <strong className="text-white">Tool handling:</strong> Wet tools
                    are more difficult to handle and more likely to be dropped.
                    Dropped tools from height can cause serious injuries to people
                    below. Tool lanyards become even more important in wet conditions.
                  </p>
                  <p>
                    <strong className="text-white">Cold stress and fatigue:</strong>{" "}
                    Persistent rain soaking through clothing causes body temperature
                    to drop, leading to shivering, loss of concentration, reduced
                    dexterity, and increased fatigue. All of these increase fall risk.
                  </p>
                  <p>
                    <strong className="text-white">Electrical risk:</strong> For
                    electrical work at height, wet conditions create additional
                    electrocution risks. Water is a conductor. Electrical testing or
                    live work should not be carried out in rain without specific
                    controls and waterproof equipment.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> There is no
                  specific wind speed equivalent for rain &mdash; it is a judgement
                  call by the competent person based on the intensity of the rain, the
                  type of work, and the condition of the working surfaces. Light
                  drizzle may be acceptable for some tasks; heavy, persistent rain may
                  require all WAH to stop until conditions improve.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Ice and Frost */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">03</span>
            Ice &amp; Frost
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Ice and frost on working surfaces create an{" "}
                <strong>extreme slip hazard</strong>. Ladders, scaffold boards, MEWP
                platforms, and roof surfaces all become extremely dangerous when
                covered in ice or frost. Falls due to icy surfaces are a particular
                risk during early morning starts in winter months.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Snowflake className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Ice and Frost Hazards
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Black ice:</strong> Thin, nearly
                    invisible ice that forms on metal and other smooth surfaces
                    overnight. It can persist for hours after air temperature rises
                    above freezing, particularly on shaded surfaces or metal scaffold
                    boards. Workers may not see it until they slip.
                  </p>
                  <p>
                    <strong className="text-white">Frost on boards:</strong> Frost
                    on scaffold boards or ladder rungs dramatically reduces friction.
                    A worker stepping onto a frosty board can lose their footing
                    instantly, particularly if they are carrying tools or materials.
                  </p>
                  <p>
                    <strong className="text-white">Frozen mechanisms:</strong> Ice
                    can freeze scaffold fittings, MEWP controls, harness buckles, and
                    ladder locking mechanisms. These may appear functional but fail
                    under load. All equipment must be inspected and tested after
                    freezing conditions.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Managing Ice and Frost on Site
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Inspect before use:</strong> every morning following a
                      cold night, inspect all scaffold boards, ladder rungs, and
                      platforms for ice or frost before anyone accesses the equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>De-ice:</strong> use salt, grit, or warm water to remove
                      ice. Allow time for surfaces to dry before use. Check that
                      de-icing does not create a slip hazard from residual water
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Delay start:</strong> consider delaying the start of
                      WAH until the temperature has risen sufficiently for ice to
                      melt and surfaces to dry
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Anti-slip measures:</strong> use non-slip mat overlays
                      on scaffold boards or specify boards with enhanced grip surfaces
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Lightning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">04</span>
            Lightning
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Lightning is one of the most dangerous weather hazards for work at
                height. Workers on scaffolding, MEWPs, ladders, roofs, and any
                elevated metallic structure are at extreme risk of being struck.
                Lightning kills between 1 and 3 people per year in the UK and injures
                many more.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    The 30/30 Rule
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">First 30:</strong> If the time
                    between seeing a lightning flash and hearing the thunder is{" "}
                    <strong>less than 30 seconds</strong>, you are within strike range.
                    Stop all outdoor work at height immediately and take shelter in a
                    substantial building or fully enclosed vehicle.
                  </p>
                  <p>
                    <strong className="text-white">Second 30:</strong> Wait at least{" "}
                    <strong>30 minutes</strong> after the last observed lightning flash
                    or thunder before resuming any outdoor work at height. Lightning
                    can strike from clear sky up to 10 miles from the storm centre.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Lightning Safety Actions
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Cease all outdoor WAH and scaffold work during thunderstorms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Descend from all elevated positions immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Do not shelter under isolated trees, scaffold towers, or
                      temporary structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Seek shelter in a substantial building or a fully enclosed
                      hard-topped vehicle
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Do not touch metallic structures, scaffold, or fencing during a
                      storm
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Monitor weather forecasts for thunderstorm warnings throughout
                      the day
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Lightning does not need to strike the worker directly to be fatal.
                  A strike to scaffold, a crane, or any metallic structure can travel
                  through the structure and electrocute anyone in contact with it.
                  Ground current from a nearby strike can also be lethal to anyone
                  standing on wet ground near the strike point.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Temperature Extremes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">05</span>
            Temperature Extremes
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Both cold and hot conditions affect the safety of work at height. While
                UK regulations do not specify maximum or minimum working temperatures,
                the employer has a duty to assess the risks from temperature extremes
                and implement appropriate controls.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Snowflake className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-semibold text-blue-400">
                      Cold Conditions
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Reduced hand dexterity and grip strength &mdash; increased
                        risk of losing grip on rungs and handrails
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Numbness in fingers and toes &mdash; may not detect grip
                        failure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Increased fatigue and slower reaction times
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Ice formation on surfaces (see Section 03)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong>Controls:</strong> warm clothing, regular breaks in
                        heated shelter, hot drinks, shorter shift rotations
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Thermometer className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-semibold text-orange-400">
                      Hot Conditions
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Dehydration &mdash; reduces concentration and increases
                        dizziness, a critical risk at height
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Heat stress &mdash; confusion, nausea, and potential collapse
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Sunburn and UV exposure &mdash; particularly on scaffold
                        platforms with no shade
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Sweaty hands reducing grip on tools and handrails
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong>Controls:</strong> water, shade breaks, sunscreen,
                        schedule heavy work for cooler hours, monitor for heat stress
                        symptoms
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Ground Conditions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">06</span>
            Ground Conditions
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The stability of work at height equipment depends entirely on the
                stability of the ground it stands on. Scaffold, ladders, MEWPs, and
                mobile towers all transmit their load (including the weight of workers
                and materials) through their base to the ground. If the ground cannot
                support this load, the equipment can sink, tilt, or overturn.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Mountain className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">
                    Ground Condition Hazards
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Soft ground:</strong> Clay,
                    topsoil, sand, or waterlogged ground may not support the
                    concentrated point loads from scaffold base plates, ladder feet,
                    or MEWP outriggers. The equipment can sink gradually during use,
                    which may not be noticed until it has tilted significantly.
                  </p>
                  <p>
                    <strong className="text-white">Slopes:</strong> Setting up
                    scaffold, ladders, or MEWPs on sloping ground creates an inherent
                    instability. The equipment may slide, tip, or overturn. Adjustable
                    base plates, leg extensions, or levelling jacks may be needed, but
                    only within the manufacturer&rsquo;s specified limits.
                  </p>
                  <p>
                    <strong className="text-white">Uneven surfaces:</strong> Potholes,
                    rubble, uncompacted fill, and broken paving can prevent equipment
                    from being set up level. An unlevel scaffold or MEWP is an unstable
                    scaffold or MEWP.
                  </p>
                  <p>
                    <strong className="text-white">
                      Proximity to excavations:
                    </strong>{" "}
                    Setting up equipment near the edge of an excavation (trench, pit,
                    or foundation) creates a risk of the ground collapsing under the
                    load. The edge of an excavation is inherently weakened ground. A
                    safe distance (typically at least equal to the depth of the
                    excavation) must be maintained.
                  </p>
                  <p>
                    <strong className="text-white">
                      Recently backfilled ground:
                    </strong>{" "}
                    Trenches that have been recently backfilled may appear solid but
                    have not consolidated. They can collapse under point loads from
                    outriggers or base plates.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> Ground
                  conditions must be assessed before equipment is positioned.
                  Remedial measures include ground mats, sole plates (timber or steel),
                  compaction, or relocating to a suitable area. The competent person
                  must verify that the ground can support the total load of the
                  equipment, workers, and materials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Overhead Power Lines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">07</span>
            Overhead Power Lines
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Overhead power lines represent one of the most lethal hazards for work
                at height. Contact with or close approach to an overhead power line
                is almost always fatal. The voltages carried by overhead lines range
                from 230V (domestic supply) to 400,000V (National Grid transmission
                lines). At higher voltages, a fatal electric arc can jump across an
                air gap without physical contact.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Lethal Hazard
                  </p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Contact with overhead power lines is the third most common cause of
                  electrical death on UK construction sites. A MEWP boom, scaffold tube,
                  ladder, or even a long piece of conduit raised at height can bridge the
                  gap to an overhead line. The current flows through the equipment and
                  through the worker to ground, causing electrocution and often fatal
                  burns.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    HSE GS6 &mdash; Key Requirements
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">
                      Minimum clearance distances:
                    </strong>{" "}
                    HSE Guidance Note GS6 specifies minimum safe distances from
                    overhead power lines. For lines up to 33kV, a minimum of 3 metres
                    clearance from the nearest conductor. For lines above 33kV
                    (including 132kV and 400kV transmission lines), greater clearances
                    are required. The distribution network operator (DNO) must be
                    consulted.
                  </p>
                  <p>
                    <strong className="text-white">Goal posts:</strong> Physical
                    barrier structures erected on either side of access routes passing
                    beneath overhead lines. They act as height limiters to prevent tall
                    vehicles or raised equipment from encroaching on the safe clearance.
                    Made from non-conductive materials.
                  </p>
                  <p>
                    <strong className="text-white">Banksman:</strong> A designated
                    person stationed near the overhead lines to guide vehicles, MEWPs,
                    and cranes, ensuring they do not approach within the exclusion
                    zone. The banksman must have clear line of sight to both the
                    equipment and the power lines.
                  </p>
                  <p>
                    <strong className="text-white">
                      Consult the DNO:
                    </strong>{" "}
                    Before any work at height near overhead power lines, contact the
                    distribution network operator. They can advise on the voltage, the
                    required clearances, and whether the line can be diverted, insulated,
                    or temporarily de-energised.
                  </p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Never assume an overhead line is dead or low voltage. Even
                  apparently small, low cables can carry lethal voltages. Never
                  approach an overhead line to check &mdash; treat every line as live
                  until the DNO confirms otherwise. Rubber gloves, rubber boots, and
                  insulated tools provide <strong>NO</strong> protection against
                  overhead line voltages.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Public Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">08</span>
            Public Protection
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When work at height takes place in or near areas where members of the
                public are present (high streets, residential areas, schools, hospitals),
                additional measures must be implemented to protect the public from
                falling materials, tools, debris, and the work equipment itself.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Public Protection Measures
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Exclusion zones:</strong>{" "}
                    Physical barriers (heras fencing, pedestrian barriers, traffic
                    cones with tape) preventing the public from entering the area
                    directly below or adjacent to the work at height. The size of the
                    zone depends on the height, the type of work, and the potential
                    for materials to bounce or roll after landing.
                  </p>
                  <p>
                    <strong className="text-white">Barriers and hoarding:</strong>{" "}
                    Solid hoarding or scaffolding fans/birdcages that physically
                    prevent materials from falling onto public areas. Scaffold fans
                    (projecting platforms covered with boarding) are commonly used
                    over public footpaths adjacent to scaffolded buildings.
                  </p>
                  <p>
                    <strong className="text-white">Signage:</strong> Clear warning
                    signs informing the public that work at height is in progress and
                    that there is a risk of falling objects. Signs should be in plain
                    language and visible from all approach directions.
                  </p>
                  <p>
                    <strong className="text-white">
                      Falling materials protection:
                    </strong>{" "}
                    Debris netting on scaffold, brick guards at working levels, toe
                    boards to prevent materials sliding off platforms, and tool lanyards
                    to prevent dropped tools.
                  </p>
                  <p>
                    <strong className="text-white">Banksmen/marshals:</strong>{" "}
                    Designated personnel stationed at ground level to manage public
                    movement, redirect pedestrians, and prevent people from entering
                    exclusion zones. Essential during critical operations such as
                    lifting, scaffold erection/dismantling, and material handling.
                  </p>
                  <p>
                    <strong className="text-white">
                      Pedestrian management:
                    </strong>{" "}
                    Temporary footpath diversions, covered walkways (pedestrian
                    tunnels), and managed crossing points to maintain safe public
                    access while work is in progress.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> The duty to
                  protect the public applies even when the work is on private property.
                  If materials, tools, or debris could fall onto a public highway,
                  footpath, or adjacent property, appropriate protection must be
                  provided. Failure to do so can result in prosecution under the Health
                  and Safety at Work etc. Act 1974 Section 3 (duty to persons not in
                  employment) and potential civil liability for injury.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Coordination with Local Authorities
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      A scaffold licence may be required from the local highway
                      authority if scaffold is erected on a public footpath or road
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Road closures or traffic management may be needed if work
                      overhangs a carriageway
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Schools, hospitals, and care homes in the vicinity must be
                      notified if there is any risk to vulnerable people
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Residents of adjacent properties should be informed of the
                      duration and nature of the work
                    </span>
                  </li>
                </ul>
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Method Statements &amp; Rescue Plans
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-amber-500 text-[#1a1a1a] hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
