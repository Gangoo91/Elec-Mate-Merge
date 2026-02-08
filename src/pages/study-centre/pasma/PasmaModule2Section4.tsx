import { ArrowLeft, ClipboardList, CheckCircle, AlertTriangle, Wind, Ruler, MapPin, Weight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "indoor-vs-outdoor-height",
    question: "Why can a tower typically be built to a greater height indoors than outdoors?",
    options: [
      "Indoor floors are always stronger than outdoor ground",
      "Indoor environments have no wind loading on the tower",
      "Indoor towers do not need guardrails",
      "Indoor towers use different components"
    ],
    correctIndex: 1,
    explanation: "Indoor environments eliminate wind loading — the primary lateral force acting on a tower. Without wind, the tower has greater resistance to overturning, allowing a higher freestanding height. Outdoor towers must account for wind forces, which significantly reduce the permissible height."
  },
  {
    id: "working-height-calculation",
    question: "A task requires reaching a ceiling at 7 metres. Assuming a 2m operative reach, what platform height is needed?",
    options: [
      "3 metres",
      "5 metres",
      "7 metres",
      "9 metres"
    ],
    correctIndex: 1,
    explanation: "Working height = platform height + 2m reach. Therefore platform height = working height - 2m reach = 7m - 2m = 5m. Always calculate the required platform height by subtracting the 2m reach allowance from the target working height."
  },
  {
    id: "wind-cease-work",
    question: "At what Beaufort scale number should work on an outdoor tower cease due to wind?",
    options: [
      "Beaufort 2 (light breeze, 4-7 mph)",
      "Beaufort 3 (gentle breeze, 8-12 mph)",
      "Beaufort 4 (moderate breeze, 13-18 mph)",
      "Beaufort 6 (strong breeze, 25-31 mph)"
    ],
    correctIndex: 2,
    explanation: "Work should cease when wind reaches Beaufort 4 (moderate breeze, approximately 13-18 mph / 17 kph). At this wind speed, loose materials can be blown from the platform and the tower experiences significant lateral loading. The tower itself is typically rated to withstand up to Beaufort 6, but working conditions become unsafe at Beaufort 4."
  }
];

const faqs = [
  {
    question: "How do I calculate the required tower height for my task?",
    answer: "Use the formula: platform height = working height minus 2 metres. The 2m accounts for the operative's reach above the platform. For example, if you need to reach a cable tray at 8m, you need a platform height of 6m. Then select a tower configuration that can achieve this height for the intended location (indoor or outdoor) and check the manufacturer's maximum height data."
  },
  {
    question: "Can I use a tower on a suspended floor or raised access floor?",
    answer: "Only if the floor has been confirmed as capable of supporting the tower's total load — including the weight of the tower, operatives, tools, and materials. Suspended floors and raised access floors have load ratings (typically expressed in kN/m2). Calculate the point loads the tower castors or base plates will impose and compare with the floor rating. Consult the building manager or structural engineer if unsure."
  },
  {
    question: "What should I do if the ground slopes slightly at the tower location?",
    answer: "Use adjustable legs to level the tower — each leg can be independently extended to compensate for a gentle slope. The maximum permissible slope and maximum leg extension are specified in the manufacturer's manual. If the slope exceeds the adjustable range, you must either level the ground first (e.g., with sole boards and packing) or select an alternative location. Never build a tower on an unlevel base."
  },
  {
    question: "Do I need a permit to work for using a mobile access tower?",
    answer: "A permit to work is not always legally required, but many sites use them as a management control. Permits are commonly required when: working near live electrical equipment, working in confined spaces accessed by tower, working over or near water, working adjacent to fragile surfaces (e.g., roof lights), or when required by the principal contractor's site rules. Always check the site-specific requirements before starting work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical maximum freestanding height for a double-width tower used indoors?",
    options: [
      "Up to 4 metres",
      "Up to 8 metres",
      "Up to 12 metres",
      "Up to 18 metres"
    ],
    correctAnswer: 2,
    explanation: "Double-width towers used indoors can typically reach up to approximately 12m platform height (varies by manufacturer). Indoor use eliminates wind loading, allowing greater freestanding heights. Always verify the specific limit in the manufacturer's instruction manual."
  },
  {
    id: 2,
    question: "What is the typical maximum freestanding height for a tower used outdoors?",
    options: [
      "Up to 4 metres",
      "Up to 8 metres",
      "Up to 12 metres",
      "Up to 15 metres"
    ],
    correctAnswer: 1,
    explanation: "Outdoor towers are typically limited to approximately 8m freestanding platform height for double-width configurations. Wind loading is the primary limiting factor. Single-width towers have even lower outdoor height limits due to their narrower base."
  },
  {
    id: 3,
    question: "When calculating the required platform height, you subtract 2 metres from the working height. This 2m allowance represents:",
    options: [
      "The height of the guardrails",
      "The height of the castors and base frame",
      "The operative's reach above the platform",
      "A safety margin required by regulations"
    ],
    correctAnswer: 2,
    explanation: "The 2m allowance represents the operative's reach above the platform when standing. A person standing on a platform can typically work at a height of about 2m above the platform surface. Therefore, working height = platform height + 2m."
  },
  {
    id: 4,
    question: "At what wind speed should you cease working on an outdoor mobile access tower?",
    options: [
      "Beaufort 2 (4-7 mph)",
      "Beaufort 4 (13-18 mph)",
      "Beaufort 6 (25-31 mph)",
      "Beaufort 8 (39-46 mph)"
    ],
    correctAnswer: 1,
    explanation: "Work should cease at Beaufort 4 (moderate breeze, approximately 13-18 mph / 17 kph). At this wind speed, tools and materials can be blown from the platform and the tower experiences significant lateral loading. The tower structure is rated to withstand higher winds, but working conditions become unsafe."
  },
  {
    id: 5,
    question: "What does BS EN 1004 specify load classes for?",
    options: [
      "The maximum wind speed a tower can withstand",
      "The maximum height a tower can be built to",
      "The safe working load on the platform (operatives, tools, and materials)",
      "The maximum number of operatives allowed on the tower"
    ],
    correctAnswer: 2,
    explanation: "BS EN 1004 defines load classes (1, 2, and 3) that specify the maximum distributed load on the working platform. This includes the weight of operatives, tools, and materials. Class 3 has the highest load rating. The load class must be checked against the planned use before work begins."
  },
  {
    id: 6,
    question: "Which of these is the correct approach to dealing with soft ground conditions?",
    options: [
      "Increase the number of castors on each leg",
      "Use sole boards under the castors or base plates to spread the load",
      "Reduce the tower height to compensate",
      "Add extra diagonal braces at the base"
    ],
    correctAnswer: 1,
    explanation: "Sole boards (also called spreader plates) are placed under the castors or base plates to distribute the tower's load over a larger ground area, preventing the supports from sinking into soft ground. Sole boards must be large enough to provide adequate bearing area and must be level."
  },
  {
    id: 7,
    question: "A method statement for tower use should include all of the following EXCEPT:",
    options: [
      "The tower configuration and maximum height",
      "The names of all trained and competent persons who will erect the tower",
      "The personal financial details of the operative",
      "Emergency procedures and rescue plan"
    ],
    correctAnswer: 2,
    explanation: "A method statement should include tower specification, assembly sequence, competent persons, risk controls, emergency procedures, and inspection arrangements. Personal financial details have no relevance to safe working and should never be included in a method statement."
  },
  {
    id: 8,
    question: "When selecting between a single-width and double-width tower, the deciding factor is:",
    options: [
      "Always choose double-width as it is safer",
      "A practical assessment of space, task, height, and number of operatives",
      "Always choose single-width as it is lighter",
      "The personal preference of the operative"
    ],
    correctAnswer: 1,
    explanation: "The choice should be based on a practical assessment of: available space (can the tower physically fit?), the nature of the task (workspace needed?), the required height (single-width has lower max heights), and the number of operatives. Double-width is preferred where space allows, but single-width is necessary in confined areas."
  }
];

const PasmaModule2Section4 = () => {
  useSEO({
    title: "Tower Selection & Planning | PASMA Module 2.4",
    description: "Learn how to select the right tower for the task: indoor vs outdoor, single vs double width, height calculations, environmental factors, ground conditions, and load planning.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 mb-4">
            <ClipboardList className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-block bg-elec-yellow/10 border border-elec-yellow/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-elec-yellow">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Tower Selection & Planning
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Selecting the right tower for the task — considering location, dimensions, environment, ground conditions, and load requirements
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Indoor:</strong> higher heights (up to 12m), no wind, check floor loading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Outdoor:</strong> lower heights (up to 8m), wind limits Beaufort 4</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Height:</strong> platform height = working height minus 2m reach</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Ground:</strong> must be firm, level, and load-bearing</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Plan:</strong> calculate height, check space, assess environment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Select:</strong> tower type, width, material based on assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Document:</strong> method statement, risk assessment, inspection records</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Communicate:</strong> brief team, liaise with site management</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white/70 mb-4">By the end of this section, you will be able to:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Explain the key differences between indoor and outdoor tower use",
              "Apply the correct formula to calculate the required platform height",
              "State the wind speed limits for working on an outdoor tower",
              "Assess ground conditions and identify when sole boards are required",
              "Describe the BS EN 1004 load classes and how to calculate platform loading",
              "Compile a pre-use planning checklist covering all selection and safety factors"
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Indoor vs Outdoor Considerations */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Indoor vs Outdoor Considerations
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The distinction between indoor and outdoor tower use is one of the most important factors in tower
                selection. It directly affects the maximum permissible height, the need for stabilisers, and the
                ongoing risk assessment during use.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-medium mb-2">Indoor Use</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">Higher freestanding heights:</strong> up to 12m (no wind loading)</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">No wind assessment:</strong> but check for draughts from open doors/loading bays</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">Floor loading:</strong> check the floor can support the concentrated loads</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">Ceiling height:</strong> ensure sufficient clearance above the platform</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">Surface:</strong> concrete, tile, raised floor — check condition and rating</div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-medium mb-2">Outdoor Use</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">Lower freestanding heights:</strong> up to 8m (wind loading applies)</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">Wind assessment:</strong> continuous monitoring, cease work at Beaufort 4</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">Ground conditions:</strong> soil, gravel, tarmac — may need sole boards</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">Weather:</strong> rain, ice, temperature extremes all affect safety</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                      <div><strong className="text-white">Stabilisers:</strong> typically required at lower heights than indoor use</div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Semi-Outdoor Environments</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Be cautious with buildings that are partially open — loading bays with open shutters, buildings
                  under construction with missing cladding, or car parks with open sides. These environments can
                  experience significant wind effects and should generally be treated as outdoor for tower selection
                  purposes. When in doubt, apply outdoor height limits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Single vs Double Width Selection */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Single vs Double Width Selection
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The choice between single-width (0.74m) and double-width (1.35m) towers should be based on a
                systematic assessment of the workspace, the task, and the safety requirements — not personal
                preference or convenience.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">Decision Criteria</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Ruler className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Available Space</p>
                      <p className="text-white/60">Measure the working area. If the space is less than 1.0m wide, single-width is the only option. If greater than 1.5m, double-width is generally preferred.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ClipboardList className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Task Requirements</p>
                      <p className="text-white/60">Consider workspace needed. Will you need to lay out tools? Is the task stationary or will you move along the platform? Two operatives? Double-width provides significantly more room.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Height Required</p>
                      <p className="text-white/60">Single-width towers have lower maximum freestanding heights due to their narrower base. If you need to reach higher, double-width may be required regardless of space.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Practical Comparison</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Single-Width (0.74m)</p>
                    <ul className="text-white/60 mt-1 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Corridors, narrow aisles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Fits through standard doorways</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Lighter — easier to transport</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Lower max freestanding height</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Less stable — narrower base</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Double-Width (1.35m)</p>
                    <ul className="text-white/60 mt-1 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Open areas, workshops, externally</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>More workspace on platform</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Accommodates two operatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Higher max freestanding height</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>More stable — wider base</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                As a general rule: if both widths would physically fit and the double-width is available, choose
                double-width. The increased stability and working area make it the safer and more productive option
                in most situations.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Height Requirements & Calculations */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Height Requirements & Calculations
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Correctly calculating the required tower height is essential for safe and efficient work. The key
                distinction is between <strong className="text-white">working height</strong> (the height you need
                to reach) and <strong className="text-white">platform height</strong> (the height of the tower platform).
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Formula</h3>
                <div className="text-center py-3">
                  <p className="text-white text-lg font-mono font-bold">Platform Height = Working Height - 2m</p>
                  <p className="text-white/60 text-sm mt-1">The 2m accounts for the operative's reach above the platform</p>
                </div>
              </div>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">Worked Examples</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Example 1: Office Ceiling</p>
                    <p className="text-white/60">Ceiling height: 3.5m. Platform height needed: 3.5m - 2m = <strong className="text-teal-300">1.5m</strong></p>
                    <p className="text-white/50 italic">A folding tower or low-level platform would suffice.</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Example 2: Warehouse Cable Tray</p>
                    <p className="text-white/60">Cable tray at 7m. Platform height needed: 7m - 2m = <strong className="text-teal-300">5m</strong></p>
                    <p className="text-white/50 italic">A standard double-width tower at 5m platform height.</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Example 3: High-Bay Lighting</p>
                    <p className="text-white/60">Lights at 10m. Platform height needed: 10m - 2m = <strong className="text-teal-300">8m</strong></p>
                    <p className="text-white/50 italic">A double-width tower at 8m — near the outdoor limit. Stabilisers may be required.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Maximum Heights per Configuration</h3>
                <p className="text-white/70 text-sm mb-3">
                  Typical maximum freestanding platform heights (check manufacturer's data for exact figures):
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-white/60 pb-2 pr-4 font-medium">Configuration</th>
                        <th className="text-white/60 pb-2 pr-4 font-medium">Indoor</th>
                        <th className="text-white/60 pb-2 font-medium">Outdoor</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">Single-width (0.74m)</td>
                        <td className="py-2 pr-4">~6.2m</td>
                        <td className="py-2">~3.9m</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">Double-width (1.35m)</td>
                        <td className="py-2 pr-4">~12.2m</td>
                        <td className="py-2">~8.2m</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">With stabilisers/outriggers</td>
                        <td className="py-2 pr-4" colSpan={2}>Heights may be extended — see manufacturer's data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/50 text-xs mt-2 italic">
                  These are indicative figures based on common tower systems. Always consult the specific manufacturer's instruction manual.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Environmental Factors */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Environmental Factors
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Environmental conditions have a direct impact on both tower stability and operative safety. Wind is
                the primary concern for outdoor towers, but temperature, rain, ice, lighting, and noise all affect
                the risk assessment.
              </p>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3 flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  Wind Speed Limits
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                    <p className="text-amber-300 font-medium">Cease Work: Beaufort 4 (Moderate Breeze)</p>
                    <p className="text-white/60">13–18 mph / 20–28 kph. Loose papers blow, small branches move. Stop work, descend, and secure the tower. Do not leave tools or materials on the platform.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <p className="text-red-300 font-medium">Tower Maximum: Beaufort 6 (Strong Breeze)</p>
                    <p className="text-white/60">25–31 mph / 39–49 kph. The tower structure is typically rated to withstand this wind speed when unoccupied. Above Beaufort 6, the tower itself may be at risk and should be dismantled or tied in.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Other Environmental Factors</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Temperature</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Extreme cold: reduced grip, numbed hands, ice on rungs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Extreme heat: fatigue, dehydration, metal components hot to touch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Gloves may be needed in both extremes</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Rain and Ice</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Wet platforms become slippery — non-slip decks preferred</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ice on rungs and platforms is extremely hazardous</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Cease work and descend if conditions become unsafe</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Lighting</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Adequate lighting for assembly and work is essential</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Task lighting on the platform for detail work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ensure stairway/ladder access is well lit</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Noise</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Hearing protection if noise exceeds 85 dB(A)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Noise affects communication — critical for assembly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Consider radio communication for tall towers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Ground Conditions Assessment */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Ground Conditions Assessment
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The ground beneath a tower must be <strong className="text-white">firm</strong>,
                <strong className="text-white"> level</strong>, and capable of
                <strong className="text-white"> bearing the load</strong> of the tower and everything on it. Poor ground
                conditions are a leading cause of tower instability and collapse.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Three Ground Requirements</h3>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <p className="text-elec-yellow text-xl font-bold mb-1">Firm</p>
                    <p className="text-white/60">Will not compress, deform, or sink under the tower's concentrated loads</p>
                  </div>
                  <div className="text-center">
                    <p className="text-elec-yellow text-xl font-bold mb-1">Level</p>
                    <p className="text-white/60">Slope within the adjustable leg range — typically max 1:50 gradient</p>
                  </div>
                  <div className="text-center">
                    <p className="text-elec-yellow text-xl font-bold mb-1">Load-Bearing</p>
                    <p className="text-white/60">Can support the point loads at each castor or base plate</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-2">Soft Ground Solutions</h3>
                <p className="text-white/70 text-sm mb-2">
                  If the ground is soft (grass, gravel, recently backfilled), sole boards must be used:
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Sole boards</strong> (spreader plates) distribute the load over a wider area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Must be positioned centrally under each castor or base plate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Must be level — use packing beneath the sole board if needed, not under the castor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Timber sole boards should be at least 225mm x 225mm x 40mm for each support point</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ensure sole boards cannot slide or be displaced</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Indoor Floor Types</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Solid concrete:</strong> Generally suitable — check for cracks, holes, or degradation</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Raised access floor:</strong> Check tile and pedestal ratings against tower point loads — may need spreader plates</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Suspended timber floor:</strong> Check joist capacity — the tower concentrates load at the castor points</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Fragile surfaces:</strong> Never set up a tower on glass roofs, skylights, ceiling tiles, or other fragile materials</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Load Planning & Safe Working Loads */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Load Planning & Safe Working Loads
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Every tower platform has a maximum safe working load (SWL) that must not be exceeded. The SWL
                includes the combined weight of operatives, tools, materials, and any equipment on the platform.
                Overloading a platform can cause structural failure, platform collapse, or tower overturning.
              </p>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                  <Weight className="h-4 w-4" />
                  BS EN 1004 Load Classes
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 rounded p-3 flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">Class 1 — Light Duty</p>
                      <p className="text-white/60">Inspection, light maintenance</p>
                    </div>
                    <p className="text-elec-yellow font-bold">150 kg/m&sup2;</p>
                  </div>
                  <div className="bg-white/5 rounded p-3 flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">Class 2 — Medium Duty</p>
                      <p className="text-white/60">General construction, electrical installation</p>
                    </div>
                    <p className="text-elec-yellow font-bold">200 kg/m&sup2;</p>
                  </div>
                  <div className="bg-white/5 rounded p-3 flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">Class 3 — Heavy Duty</p>
                      <p className="text-white/60">Heavy materials, masonry, plastering</p>
                    </div>
                    <p className="text-elec-yellow font-bold">275 kg/m&sup2;</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Calculating Platform Loading</h3>
                <p className="text-white/70 text-sm mb-3">
                  To check you are within the SWL, add up the total load on the platform:
                </p>
                <div className="bg-white/5 rounded p-3 text-sm">
                  <p className="text-white font-mono">Total Load = Operative(s) weight + Tools + Materials + Equipment</p>
                  <p className="text-white/50 mt-2">Example: 1 operative (85kg) + tool bag (15kg) + cable drum (20kg) + drill (5kg) = 125kg</p>
                  <p className="text-white/50">A Class 2 platform of 2.5m x 1.35m = 3.375m&sup2; has SWL of 200 x 3.375 = 675kg</p>
                  <p className="text-green-400/70 mt-1">125kg is well within the 675kg SWL &#10003;</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Dynamic vs Static Loads</h3>
                <p className="text-white/70 text-sm">
                  The SWL accounts for <strong className="text-white">static loads</strong> (stationary weight). However,
                  <strong className="text-white"> dynamic loads</strong> — caused by movement, lifting, pulling, or
                  pushing while on the platform — can momentarily exceed the static load. When drilling into a wall,
                  for example, the reaction force pushes the operative backward and transfers a lateral force through
                  the platform. Always plan for dynamic loading by keeping the static load well below the SWL maximum.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Pre-Use Planning Checklist */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              Pre-Use Planning Checklist
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Before any tower is erected on site, a systematic planning process must be followed. This ensures
                the correct tower is selected, the location is suitable, risks are controlled, and all necessary
                documentation is in place.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">Comprehensive Planning Checklist</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">1. Task Assessment</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>What is the working height required? (Calculate platform height)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>How long will the task take? (Hours, days, weeks)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>How many operatives on the platform simultaneously?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>What tools and materials will be taken to the platform?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Is the task stationary or will the tower need to be moved?</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">2. Location Assessment</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Indoor or outdoor? (Determines max heights and wind considerations)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ground conditions? (Firm, level, load-bearing)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Available space for tower base and stabilisers?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Overhead obstructions? (Pipes, beams, ceiling, power lines)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Adjacent hazards? (Open edges, traffic routes, live electrical equipment)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">3. Tower Selection</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Width: single or double? (Based on space and task)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Material: aluminium or GRP? (Based on electrical hazards)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Configuration: standard, stairway, linked, bridge? (Based on access needs)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Access method: ladder or stairway? (Based on frequency and duration)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Tower system: BS EN 1004 compliant? Manufacturer's manual available?</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">4. Documentation</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Risk assessment completed and communicated?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Method statement prepared and approved?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Competent person(s) identified (PASMA trained)?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Manufacturer's instruction manual available on site?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Permit to work obtained (if required)?</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">5. Communication</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Site management informed of the tower erection plan?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Exclusion zone agreed around the base during assembly?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Other trades informed of tower location and duration?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Emergency plan in place (rescue from height)?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Inspection schedule agreed (pre-use, weekly, post-event)?</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Method Statement Requirements</h3>
                <p className="text-white/70 text-sm mb-2">
                  A method statement for tower work should cover, as a minimum:
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Tower specification (manufacturer, model, configuration, max height)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Assembly sequence (step-by-step, per manufacturer's instructions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Names and PASMA card numbers of competent assemblers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Risk control measures (PPE, exclusion zones, weather monitoring)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Inspection arrangements (pre-use, periodic, who inspects, how recorded)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Emergency and rescue procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Disassembly sequence and storage/transport arrangements</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Permit to Work Situations</h3>
                <p className="text-white/70 text-sm mb-2">
                  A permit to work may be required when the tower work involves additional hazards:
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div className="text-white/60 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Working near live electrical equipment</span>
                  </div>
                  <div className="text-white/60 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Working in confined spaces accessed by tower</span>
                  </div>
                  <div className="text-white/60 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Working near fragile surfaces (roof lights)</span>
                  </div>
                  <div className="text-white/60 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Working over or near water</span>
                  </div>
                  <div className="text-white/60 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Hot work from the platform (welding, cutting)</span>
                  </div>
                  <div className="text-white/60 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Principal contractor site rules requiring permits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Section 4 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safety Components
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-3">
              Next: Module 3 &rarr;
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PasmaModule2Section4;
