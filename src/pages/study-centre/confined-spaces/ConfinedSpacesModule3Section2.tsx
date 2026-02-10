import { ArrowLeft, CheckCircle, AlertTriangle, ShieldAlert, Zap, Thermometer, Bug, Volume2, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "engulfment-solids",
    question: "What is the primary danger when working with free-flowing solids such as grain or sand in a confined space?",
    options: [
      "The material may catch fire spontaneously",
      "Engulfment — the worker can be buried and suffocated within seconds",
      "The material produces toxic fumes when disturbed",
      "Free-flowing solids are only dangerous in wet conditions"
    ],
    correctIndex: 1,
    explanation: "Free-flowing solids such as grain, sand, cement powder, and coal can behave like quicksand when disturbed. A worker standing on or near the surface can sink rapidly and become engulfed in seconds. Once buried to chest depth, the pressure on the torso prevents breathing and rescue becomes extremely difficult. Engulfment is one of the leading causes of fatality in confined spaces involving stored materials."
  },
  {
    id: "loto-importance",
    question: "What does LOTO stand for, and why is it critical in confined spaces with mechanical hazards?",
    options: [
      "Lock Out / Tag Out — it ensures all energy sources are isolated before entry",
      "Look Out / Turn Off — it means visually checking equipment is off",
      "Log On / Track Output — it records machinery operating hours",
      "Lift Out / Take Over — it describes the handover procedure for equipment"
    ],
    correctIndex: 0,
    explanation: "LOTO stands for Lock Out / Tag Out. It is a formal procedure to ensure that all energy sources (electrical, mechanical, hydraulic, pneumatic, thermal) are physically isolated and locked in the off position before anyone enters a confined space. A personal lock and tag are applied by each worker, ensuring the equipment cannot be restarted accidentally. In confined spaces, accidental start-up of agitators, pumps, or conveyors can cause fatal crushing or entrapment injuries."
  },
  {
    id: "weils-disease",
    question: "How is Weil's disease (leptospirosis) typically contracted in confined spaces?",
    options: [
      "By inhaling dust from old brickwork",
      "Through contact with water or surfaces contaminated by rat urine",
      "By touching corroded metal pipework",
      "Through skin contact with sewage gases"
    ],
    correctIndex: 1,
    explanation: "Weil's disease (severe leptospirosis) is caused by the bacterium Leptospira, which is present in the urine of infected rats and other rodents. Workers can contract it through contact with contaminated water or damp surfaces — the bacteria enter through cuts, abrasions, or mucous membranes (eyes, nose, mouth). Sewers, drains, culverts, and waterways are high-risk locations. Weil's disease can cause organ failure and death if untreated, making it a serious biological hazard in confined space work."
  }
];

const faqs = [
  {
    question: "Can you survive engulfment by grain or sand?",
    answer: "Survival is possible if rescue occurs within minutes, but the odds decrease rapidly. Once a person is buried to waist depth, the force required to extract them can exceed 400 kg — far beyond what rescuers can achieve by pulling alone. At chest depth, breathing becomes impossible due to the compressive force on the torso. Prevention is the only reliable strategy: never enter a space containing free-flowing solids without proper controls, never walk on stored grain or powder surfaces, and always use appropriate retrieval systems. In the UK, engulfment in grain silos and hoppers continues to cause fatalities despite these being well-understood hazards."
  },
  {
    question: "Why is noise more dangerous inside a confined space than in open air?",
    answer: "Sound waves reflect off the hard, close walls of a confined space rather than dissipating into open air. This reverberation amplifies noise levels significantly — a tool that produces 85 dB(A) in open air may exceed 100 dB(A) inside a steel tank. Higher noise levels cause faster hearing damage, but the secondary danger is equally serious: workers cannot communicate effectively, which means warnings, instructions, and emergency signals may not be heard. Wearing hearing protection reduces noise exposure but further impairs communication, creating a trade-off that must be managed through alternative signalling methods (visual signals, vibrating alarms, radio headsets with noise cancellation)."
  },
  {
    question: "What voltage should be used for portable equipment in confined spaces?",
    answer: "In wet or conductive confined spaces, reduced voltage equipment should be used. BS 7671 and HSE guidance recommend 110V centre-tapped to earth (CTE) supply from a portable transformer for power tools, giving a maximum of 55V to earth. For portable hand lamps in particularly wet or conductive environments, 25V or even 12V may be required. Battery-powered tools are an excellent alternative as they eliminate mains supply risks entirely. The increased danger arises because wet skin, conductive clothing, and metallic surroundings dramatically reduce body resistance, meaning a voltage that might cause only a tingle in dry conditions can deliver a fatal shock in a confined space."
  },
  {
    question: "How do you manage heat stress in an unventilated confined space?",
    answer: "Heat stress in confined spaces is managed through a combination of engineering controls, work scheduling, and monitoring. Forced ventilation with cooled air can reduce ambient temperature. Work/rest cycles should be implemented — for example, 20 minutes working followed by 10 minutes rest in a cool area, with cycles shortened as temperature increases. Workers should be acclimatised where possible, be well-hydrated before and during work, and wear appropriate lightweight clothing. Core body temperature monitoring (using ingestible sensors or ear thermometers) provides objective data. Warning signs of heat stress include excessive sweating, confusion, nausea, headache, and rapid pulse. If any worker shows signs of heat exhaustion or heat stroke, work must stop immediately and emergency procedures must be followed."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is an example of engulfment by a free-flowing solid?",
    options: [
      "A worker trapped by a jammed door in a storage room",
      "A worker buried in grain after the surface collapses in a silo",
      "A worker overcome by carbon monoxide in a boiler room",
      "A worker falling from a ladder inside a water tank"
    ],
    correctAnswer: 1,
    explanation: "Engulfment by free-flowing solids occurs when materials such as grain, sand, cement powder, or coal collapse or flow around a worker, burying them. A worker sinking into grain after the surface collapses in a silo is a classic engulfment scenario. The other options describe entrapment, atmospheric hazard, and falls from height respectively — all confined space hazards, but not engulfment by solids."
  },
  {
    id: 2,
    question: "What is the primary risk of complex internal structures (baffles, agitators) in confined spaces?",
    options: [
      "They generate toxic fumes when heated",
      "They create entrapment hazards — workers can become stuck or caught",
      "They always contain asbestos insulation",
      "They increase the risk of flooding"
    ],
    correctAnswer: 1,
    explanation: "Complex internal structures such as baffles, agitators, mixing blades, and cross-bracing create entrapment hazards. Workers can become wedged in narrow gaps, caught on protruding components, or trapped in areas that are difficult to access for rescue. These structures also complicate rescue operations because standard stretchers and retrieval equipment may not fit through the obstructions."
  },
  {
    id: 3,
    question: "At what core body temperature does heat stroke become a medical emergency?",
    options: [
      "36.5\u00b0C",
      "37.5\u00b0C",
      "39\u00b0C",
      "40\u00b0C or above"
    ],
    correctAnswer: 3,
    explanation: "Heat stroke occurs when the body's thermoregulation fails and core temperature rises to 40\u00b0C or above. It is a life-threatening medical emergency requiring immediate cooling and emergency medical treatment. In confined spaces, heat stroke can develop rapidly due to high ambient temperatures, physical exertion, lack of ventilation, and the insulating effect of PPE. Workers may collapse suddenly, become confused, or lose consciousness."
  },
  {
    id: 4,
    question: "Why is Weil's disease a particular concern in sewer work?",
    options: [
      "Sewage contains high levels of methane that react with skin",
      "Sewer bacteria cause immediate skin burns",
      "Rat urine in sewers contains Leptospira bacteria that enter through cuts and mucous membranes",
      "Sewer gases dissolve Leptospira and it is inhaled"
    ],
    correctAnswer: 2,
    explanation: "Weil's disease (severe leptospirosis) is caused by Leptospira bacteria found in rat urine. Sewers are a primary habitat for rats, and surfaces and water in sewers are frequently contaminated with their urine. The bacteria enter the human body through cuts, abrasions, or mucous membranes (eyes, nose, mouth) when workers come into contact with contaminated water or surfaces. This makes sewer workers, drain engineers, and anyone entering underground watercourses particularly vulnerable."
  },
  {
    id: 5,
    question: "What is the recommended maximum voltage for portable hand lamps in wet confined spaces?",
    options: [
      "230V",
      "110V",
      "55V",
      "25V or 12V"
    ],
    correctAnswer: 3,
    explanation: "In wet or highly conductive confined spaces, portable hand lamps should operate at 25V or even 12V to minimise electrical shock risk. While 110V CTE (centre-tapped to earth) is the standard for portable power tools on construction sites, giving a maximum of 55V to earth, hand lamps in particularly hazardous wet environments require further voltage reduction. Battery-powered lighting is an excellent alternative that eliminates mains supply risks entirely."
  },
  {
    id: 6,
    question: "Which of the following best describes the LOTO procedure?",
    options: [
      "Logging all occupants and timing their entry and exit",
      "Physically isolating and locking all energy sources before entry, with personal locks and tags",
      "Switching off equipment and placing a warning sign on the door",
      "Testing the atmosphere and locking the gas monitor to the entry point"
    ],
    correctAnswer: 1,
    explanation: "Lock Out / Tag Out (LOTO) is the formal procedure of physically isolating all energy sources (electrical, mechanical, hydraulic, pneumatic, thermal) and applying personal padlocks and identification tags to prevent accidental re-energisation. Each worker entering the space applies their own lock, and the equipment cannot be restarted until every lock is removed. Simply switching off equipment and placing a sign is NOT adequate — switches can be accidentally operated, and signs can be ignored or removed."
  },
  {
    id: 7,
    question: "What makes noise particularly hazardous inside a confined space compared to open air?",
    options: [
      "Confined spaces amplify sound due to reverberation off hard walls, and communication is impaired",
      "Noise causes confined space atmospheres to become oxygen-depleted",
      "Sound waves travel slower in confined spaces, causing a delayed hearing effect",
      "Noise is not actually more dangerous in confined spaces"
    ],
    correctAnswer: 0,
    explanation: "Hard, close surfaces in confined spaces reflect sound waves instead of allowing them to dissipate, causing significant reverberation and amplification. A tool producing 85 dB(A) in open air may exceed 100 dB(A) inside a steel tank. This accelerates hearing damage and, critically, impairs verbal communication — meaning warnings and emergency instructions may not be heard. Hearing protection helps but further reduces the ability to communicate, requiring alternative signalling systems."
  },
  {
    id: 8,
    question: "Which of the following is NOT a non-atmospheric hazard in confined spaces?",
    options: [
      "Engulfment by free-flowing grain",
      "Oxygen depletion from rusting steelwork",
      "Entrapment in narrowing passages",
      "Structural collapse of deteriorated access shafts"
    ],
    correctAnswer: 1,
    explanation: "Oxygen depletion from rusting steelwork is an ATMOSPHERIC hazard (the rusting process consumes oxygen, reducing the concentration below safe levels). Engulfment by grain, entrapment in narrowing passages, and structural collapse are all non-atmospheric hazards — physical dangers that exist regardless of the air quality. This section focuses specifically on non-atmospheric hazards, though in practice both categories must be assessed together."
  }
];

export default function ConfinedSpacesModule3Section2() {
  useSEO({
    title: "Non-Atmospheric Hazards | Confined Spaces Module 3.2",
    description: "Engulfment, entrapment, temperature extremes, noise, manual handling, biological hazards, mechanical and electrical hazards, falls, radiation, and structural collapse in confined spaces.",
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
            <ShieldAlert className="h-7 w-7 text-cyan-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Non-Atmospheric Hazards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Engulfment, entrapment, temperature extremes, noise, manual handling, biological hazards, mechanical and electrical dangers, falls from height, radiation, and structural collapse
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Non-atmospheric hazards</strong> kill and injure in confined spaces independently of air quality</li>
              <li><strong>Engulfment</strong> by liquids or solids can cause death within minutes</li>
              <li><strong>Mechanical/electrical</strong> risks are amplified by restricted escape routes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>LOTO:</strong> All energy sources must be isolated before entry</li>
              <li><strong>Reduced voltage:</strong> 110V CTE or lower in wet/conductive spaces</li>
              <li><strong>Biological:</strong> Weil's disease is life-threatening &mdash; cover all cuts</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the dangers of engulfment by liquids and free-flowing solids in confined spaces",
              "Identify entrapment hazards created by internal structures and narrowing passages",
              "Describe the risks of heat stress and cold stress in unventilated or refrigerated spaces",
              "Understand how noise is amplified in enclosed environments and the impact on communication",
              "Recognise biological hazards including Weil's disease, legionella, and sewage-borne pathogens",
              "Explain the importance of LOTO procedures for mechanical isolation in confined spaces",
              "State the reduced voltage requirements for electrical equipment in wet or conductive confined spaces",
              "Identify fall hazards, radiation risks, and structural collapse dangers within confined spaces"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Non-Atmospheric Hazard Categories Diagram */}
        <section className="mb-10">
          <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-6 sm:p-8">
            <p className="text-sm font-medium text-cyan-400 mb-6 text-center">
              Non-Atmospheric Hazard Categories
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { label: "Engulfment", sub: "Liquids & solids", colour: "bg-red-500/20 border-red-500/40 text-red-300" },
                { label: "Entrapment", sub: "Structures & passages", colour: "bg-orange-500/20 border-orange-500/40 text-orange-300" },
                { label: "Temperature", sub: "Heat & cold stress", colour: "bg-amber-500/20 border-amber-500/40 text-amber-300" },
                { label: "Noise", sub: "Amplified sound", colour: "bg-yellow-500/20 border-yellow-500/40 text-yellow-300" },
                { label: "Manual Handling", sub: "Restricted movement", colour: "bg-lime-500/20 border-lime-500/40 text-lime-300" },
                { label: "Biological", sub: "Pathogens & disease", colour: "bg-green-500/20 border-green-500/40 text-green-300" },
                { label: "Mechanical", sub: "Moving machinery", colour: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" },
                { label: "Electrical", sub: "Wet/conductive risk", colour: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
                { label: "Falls", sub: "Heights & slippery surfaces", colour: "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" },
                { label: "Radiation", sub: "UV, ionising sources", colour: "bg-violet-500/20 border-violet-500/40 text-violet-300" },
                { label: "Structural Collapse", sub: "Deterioration & corrosion", colour: "bg-pink-500/20 border-pink-500/40 text-pink-300" },
              ].map((item, i) => (
                <div key={i} className={`rounded-lg border p-3 text-center ${item.colour}`}>
                  <p className="text-xs sm:text-sm font-semibold">{item.label}</p>
                  <p className="text-[10px] sm:text-xs opacity-80 mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
              <span className="text-xs sm:text-sm text-cyan-300">
                All categories must be assessed <strong>in addition to</strong> atmospheric hazards &mdash; a space may present multiple non-atmospheric hazards simultaneously
              </span>
            </div>
          </div>
        </section>

        {/* Section 01: Engulfment by Liquids */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Engulfment by Liquids
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Engulfment by liquid is one of the most immediately life-threatening hazards in confined
                spaces. Unlike open environments where escape routes are numerous and visible, confined
                spaces offer <strong>limited egress</strong> &mdash; a rising water level that would be a
                minor inconvenience in an open area can become fatal when the only exit is a vertical
                ladder or narrow hatch above.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Fatal Hazard &mdash; Rapid Onset</p>
                </div>
                <p className="text-sm text-white/80">
                  Drowning in confined spaces can occur in as little as <strong className="text-white">60
                  seconds</strong>. Water can enter from burst pipes, rising water tables, tidal ingress,
                  storm surges, or the sudden release of stored liquids. The cold shock response in
                  unheated water further reduces a worker's ability to self-rescue.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common Sources of Liquid Engulfment</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Flooding from external sources:</strong> Heavy rainfall overwhelming drainage, rivers or watercourses overtopping into manholes, chambers, or excavations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Rising water tables:</strong> Groundwater seeping into below-ground chambers, basements, and deep excavations &mdash; rate of ingress can increase suddenly after rainfall</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Burst pipes and valve failures:</strong> Pressurised water mains, fire suppression systems, or process pipework can flood a space in seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Tidal ingress:</strong> Coastal and estuarine locations &mdash; sewers, outfalls, dock structures, and coastal chambers can flood rapidly as tides rise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Process liquids:</strong> Tanks, vessels, and sumps may contain residual liquids or be inadvertently filled during maintenance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Control Measures:</strong> Isolate all liquid supply
                  pipework and confirm isolation before entry. Check weather forecasts and tide tables.
                  Install pumps with alarms to manage water ingress. Ensure emergency egress routes
                  remain clear and accessible. Never enter a space with standing liquid without a
                  specific rescue plan for water rescue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Engulfment by Free-Flowing Solids */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Engulfment by Free-Flowing Solids
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Free-flowing solids &mdash; materials such as <strong>grain, sand, cement powder,
                coal, wood pellets, and animal feed</strong> &mdash; can behave like liquids when
                disturbed. Workers entering silos, hoppers, bunkers, and storage vessels containing
                these materials face a serious risk of engulfment and suffocation.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Engulfment Kills in Seconds</p>
                </div>
                <p className="text-sm text-white/80">
                  A worker can be engulfed to waist depth in <strong className="text-white">under 5
                  seconds</strong> when grain or similar material collapses. At waist depth, the force
                  required to extract the person can exceed <strong className="text-white">400 kg</strong>.
                  At chest depth, breathing becomes impossible due to compressive force on the thorax.
                  Most engulfment victims who are fully submerged do not survive.
                </p>
              </div>

              {/* Engulfment Dangers Diagram */}
              <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-6 sm:p-8">
                <p className="text-sm font-medium text-cyan-400 mb-6 text-center">
                  Engulfment Dangers &mdash; How It Happens
                </p>
                <div className="space-y-4">
                  {/* Stage 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-green-400">1</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Surface Appears Stable</p>
                      <p className="text-xs text-white/60 mt-1">
                        Material in a silo or hopper may have formed a crust or bridge over a void beneath.
                        The surface looks solid and walkable, but is structurally unsupported.
                      </p>
                    </div>
                  </div>
                  {/* Stage 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-amber-400">2</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Surface Collapse / Flow Initiated</p>
                      <p className="text-xs text-white/60 mt-1">
                        Worker's weight breaks the bridge, or discharge equipment starts below, drawing material
                        downward. The worker begins to sink rapidly as the material flows around them like quicksand.
                      </p>
                    </div>
                  </div>
                  {/* Stage 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-orange-400">3</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Waist-Deep Engulfment (Under 5 Seconds)</p>
                      <p className="text-xs text-white/60 mt-1">
                        Extraction force now exceeds 400 kg. The worker cannot free themselves. Rescue teams
                        cannot simply pull the person out without causing serious injury.
                      </p>
                    </div>
                  </div>
                  {/* Stage 4 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-red-400">4</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-300">Chest-Deep / Full Burial &mdash; Fatal</p>
                      <p className="text-xs text-white/60 mt-1">
                        Compressive force on the thorax prevents breathing. Full burial causes suffocation.
                        Without immediate rescue (within 4&ndash;6 minutes), survival is extremely unlikely.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-red-400">
                      NEVER walk on stored grain, sand, or powder surfaces &mdash; NEVER enter during discharge
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Materials That Cause Engulfment</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Grain and cereals:</strong> Wheat, barley, maize &mdash; the most common cause of UK agricultural engulfment deaths</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Sand and aggregates:</strong> Construction sites, quarries, and materials storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Cement powder and calcium compounds:</strong> Industrial storage silos and hoppers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Coal and biomass fuels:</strong> Power stations, heating plants, and fuel storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Wood pellets and animal feed:</strong> Agricultural and processing facilities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Control Measures:</strong> Never enter a silo, hopper,
                  or vessel containing free-flowing solids without a permit to work and specific risk
                  assessment. Ensure all discharge equipment is isolated (LOTO). Never walk on the surface
                  of stored material. Use fall arrest harnesses connected to anchor points above. Provide
                  a trained standby person with rescue equipment. If bridging or rat-holing is suspected,
                  break it from outside the vessel using approved mechanical methods.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Entrapment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Entrapment
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Entrapment occurs when a worker becomes physically stuck or unable to escape from within
                a confined space. Unlike engulfment (where the person is buried by material), entrapment
                involves the <strong>physical geometry of the space itself</strong> or its internal
                structures preventing movement or egress.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Complex Internal Structures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Baffles and dividers:</strong> Internal plates that divide tanks and vessels into compartments &mdash; workers can become wedged between baffles, or trapped in a compartment with no direct exit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Agitators and mixing blades:</strong> Protruding shafts, paddles, and helical screws create snag points where clothing, harnesses, or body parts can become caught</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Cross-bracing and supports:</strong> Internal structural members that restrict movement and complicate rescue stretcher access</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Narrowing Passages</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Tapering vessels:</strong> Cone-bottomed hoppers and vessels that narrow towards the discharge point &mdash; a worker who enters from above may become wedged at a narrower section below</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Pipe runs and culverts:</strong> Sewers and drainage systems may narrow at junctions, bends, or where sections of different diameter connect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Access restrictions:</strong> Manholes, hatches, and openings that are too small to pass through wearing full rescue equipment or while carrying a casualty</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Collapse of Excavation Sides</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Trench collapse:</strong> Unsupported trench walls can collapse without warning, burying workers under tonnes of soil &mdash; one cubic metre of soil weighs approximately 1.5 tonnes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Contributing factors:</strong> Vibration from nearby traffic or plant, water saturation, surcharge loads (spoil heaps, materials, vehicles parked near the edge), and previously disturbed ground</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Shoring and battering:</strong> Excavations deeper than 1.2 metres must be assessed for collapse risk &mdash; trench sheets, hydraulic shoring, or sloped sides (battering) are required</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Rescue Implications:</strong> Entrapment hazards
                  must be considered in the rescue plan <strong>before</strong> anyone enters the space.
                  If the geometry of the space means a standard stretcher will not fit, or if internal
                  structures prevent a casualty being lifted vertically, specialist rescue equipment
                  (flexible stretchers, confined space rescue teams) must be available at the site
                  before work begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Temperature Extremes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Temperature Extremes
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confined spaces are particularly susceptible to temperature extremes because of their
                <strong> limited ventilation</strong> and the <strong>thermal properties of their
                construction</strong>. Both heat stress and cold stress can develop far more rapidly
                inside a confined space than in an open environment, and the consequences can be
                life-threatening.
              </p>

              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Heat Stress</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Heat stress occurs when the body cannot shed heat fast enough to maintain a safe core
                    temperature. In confined spaces, this is caused by:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Unventilated spaces:</strong> Boilers, ovens, kilns, and furnaces retain residual heat long after shutdown</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Sun-heated metal:</strong> Steel tanks, containers, and roof spaces can reach 60&deg;C+ in summer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">PPE burden:</strong> Protective clothing, respiratory equipment, and harnesses reduce the body's ability to cool through sweat evaporation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Physical exertion:</strong> Manual work in restricted postures generates significant body heat</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Heat Stress Progression</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-amber-400 w-20 flex-shrink-0 mt-0.5">37&ndash;38&deg;C</span>
                      <span className="text-sm text-white/80">Normal range with light exertion &mdash; sweating, mild fatigue</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-orange-400 w-20 flex-shrink-0 mt-0.5">38&ndash;39&deg;C</span>
                      <span className="text-sm text-white/80">Heat exhaustion &mdash; heavy sweating, weakness, nausea, headache, rapid pulse</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-red-400 w-20 flex-shrink-0 mt-0.5">39&ndash;40&deg;C</span>
                      <span className="text-sm text-white/80">Severe heat exhaustion &mdash; confusion, coordination loss, vomiting, potential collapse</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-red-300 w-20 flex-shrink-0 mt-0.5">40&deg;C+</span>
                      <span className="text-sm text-red-300 font-semibold">HEAT STROKE &mdash; medical emergency, organ damage, potential death</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Cold Stress</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Cold stress occurs when the body loses heat faster than it can produce it, causing
                    core temperature to fall. In confined spaces, this can occur in:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Refrigeration chambers and cold stores:</strong> Temperatures may be as low as &minus;30&deg;C</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Cryogenic systems:</strong> Liquid nitrogen and similar substances at &minus;196&deg;C can cause instant frostbite on contact and create dangerously cold environments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Underground chambers:</strong> Deep underground spaces that maintain consistently low temperatures year-round</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Wet environments:</strong> Water dramatically increases heat loss &mdash; wet clothing in a cool confined space can cause hypothermia</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Control Measures:</strong> For heat &mdash; forced
                  ventilation with cooled air, work/rest cycles (e.g. 20 minutes on / 10 minutes off),
                  pre-hydration, lightweight clothing, and core temperature monitoring. For cold &mdash;
                  thermal protective clothing, limited exposure times, warm rest areas, and buddy
                  monitoring for signs of hypothermia. In both cases, workers must be trained to
                  recognise the symptoms and empowered to stop work if they feel unwell.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Noise and Manual Handling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">05</span>
            Noise and Manual Handling
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-5 w-5 text-cyan-400" />
                    <p className="text-sm font-medium text-white">Noise in Enclosed Spaces</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Sound behaves differently in confined spaces compared to open air. Hard, close
                    surfaces <strong className="text-white">reflect sound waves instead of allowing them
                    to dissipate</strong>, creating significant reverberation and amplification.
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Amplification effect:</strong> A power tool producing 85 dB(A) in open air may exceed 100 dB(A) inside a steel tank &mdash; this is a <strong className="text-white">30-fold increase</strong> in perceived loudness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Accelerated hearing damage:</strong> At 100 dB(A), the maximum safe exposure time without hearing protection is only <strong className="text-white">15 minutes</strong> (compared to 8 hours at 85 dB(A))</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Communication breakdown:</strong> Verbal warnings, instructions, and emergency signals cannot be heard over amplified noise &mdash; this is a <strong className="text-white">critical safety issue</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Hearing protection trade-off:</strong> Ear defenders reduce noise exposure but further impair verbal communication &mdash; alternative signalling methods are essential (visual signals, radio headsets, vibrating alarms)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Manual Handling in Restricted Spaces</p>
                  <p className="text-sm text-white/80 mb-3">
                    Manual handling inside confined spaces is significantly more hazardous than in open
                    environments because of physical restrictions:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Restricted movement:</strong> Workers may be unable to adopt safe lifting postures &mdash; forced to twist, bend, or reach awkwardly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Awkward postures:</strong> Kneeling, crouching, or lying flat significantly reduces lifting capacity and increases musculoskeletal injury risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Limited lifting aids:</strong> Standard mechanical handling equipment (pallet trucks, trolleys, hoists) often cannot be used inside confined spaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Fatigue interaction:</strong> Heat, PPE burden, and poor ventilation accelerate physical fatigue, reducing strength and coordination for manual tasks</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Control Measures:</strong> For noise &mdash; use
                  quieter tools where possible, limit exposure time, provide appropriate hearing
                  protection, and establish non-verbal communication systems before entry. For manual
                  handling &mdash; minimise loads carried into confined spaces, use lightweight tools
                  and equipment, plan tasks to reduce awkward postures, and consider whether portable
                  lifting aids (tirfor winches, rollers) can be deployed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Biological Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">06</span>
            Biological Hazards
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confined spaces, particularly those associated with sewerage, drainage, water treatment,
                and agricultural storage, can harbour a range of <strong>biological hazards</strong>
                including bacteria, viruses, fungi, and animal-borne risks that can cause serious
                illness or death.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Weil's Disease (Leptospirosis)</p>
                </div>
                <p className="text-sm text-white/80">
                  Weil's disease is caused by <strong className="text-white">Leptospira</strong> bacteria
                  found in <strong className="text-white">rat urine</strong>. It enters the body through
                  cuts, abrasions, or mucous membranes (eyes, nose, mouth) when workers contact
                  contaminated water or surfaces. <strong className="text-white">Sewers, drains,
                  culverts, waterways, and canal structures</strong> are high-risk locations. Symptoms
                  include fever, headache, muscle pain, and jaundice. Severe cases cause organ failure
                  and can be <strong className="text-white">fatal</strong> if untreated. All workers in
                  sewer environments must carry a <strong className="text-white">Weil's disease warning
                  card</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Legionella</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Legionnaires' disease</strong> is caused by inhaling water droplets contaminated with Legionella bacteria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Bacteria thrive in <strong className="text-white">stagnant water at 20&ndash;45&deg;C</strong> &mdash; cooling towers, hot water systems, and water storage tanks are high-risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Confined spaces that contain or are adjacent to warm water systems pose particular risk when aerosols are generated</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Sewage-Borne Pathogens</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Hepatitis A:</strong> Transmitted through contact with contaminated sewage or faecal matter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Gastroenteritis:</strong> Various bacteria (E. coli, Salmonella, Campylobacter) in sewage cause severe gastrointestinal illness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Tetanus:</strong> Clostridium tetani in soil and sewage can enter through cuts &mdash; ensure immunisation is up to date</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Mould, Fungi, and Animal Hazards</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Mould and fungal spores:</strong> Damp, unventilated spaces provide ideal growing conditions &mdash; inhalation can cause respiratory sensitisation, allergic reactions, and aspergillosis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Insect hazards:</strong> Wasps, bees, and hornets may nest in undisturbed spaces &mdash; stings in a confined space can cause anaphylaxis with no rapid escape route</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Rats, mice, and other animals:</strong> Rodents carry disease and can behave aggressively when cornered &mdash; disturbed nesting birds (particularly pigeons) generate airborne droppings that carry Chlamydia psittaci</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Control Measures:</strong> Ensure immunisations are
                  current (tetanus, hepatitis A/B for sewer workers). Cover all cuts and abrasions with
                  waterproof dressings. Wear appropriate PPE including waterproof gloves and eye
                  protection. Practise strict hygiene &mdash; no eating, drinking, or smoking until
                  hands and face are thoroughly washed. Carry a Weil's disease card when working in
                  sewer environments. Report any post-work illness to occupational health immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Mechanical and Electrical Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">07</span>
            Mechanical and Electrical Hazards
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Mechanical Hazards &mdash; Moving Machinery</p>
                  <p className="text-sm text-white/80 mb-3">
                    Many confined spaces contain <strong className="text-white">mechanical equipment</strong>
                    that can cause fatal crushing, entanglement, or cutting injuries if operated while a
                    person is inside:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Agitators and mixers:</strong> Rotating shafts with paddles or blades inside tanks and vessels &mdash; accidental start-up is fatal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Pumps and impellers:</strong> Submersible pumps in sumps and wet wells can start automatically on float switch activation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Conveyors and screw augers:</strong> Material transport equipment that can trap, drag, and crush anyone within reach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Automatic systems:</strong> Equipment controlled by timers, level sensors, or remote SCADA systems can start without local warning</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Lock Out / Tag Out (LOTO) is Mandatory</p>
                  </div>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">ALL</strong> energy sources (electrical, mechanical,
                    hydraulic, pneumatic, thermal) must be physically isolated and locked in the off
                    position before anyone enters a confined space containing machinery. Each worker
                    applies their own personal padlock and identification tag. The equipment
                    <strong className="text-white"> cannot be restarted until every lock is removed</strong>.
                    Simply switching off is <strong className="text-white">NOT adequate</strong> &mdash;
                    switches can be operated accidentally, and automatic systems can override manual
                    off positions.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-cyan-400" />
                    <p className="text-sm font-medium text-white">Electrical Hazards</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Electrical risk is <strong className="text-white">significantly increased</strong>
                    in confined spaces due to environmental factors that reduce the body's electrical
                    resistance:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Wet conditions:</strong> Standing water, condensation, and damp surfaces reduce skin resistance from ~100,000 ohms (dry) to as low as 1,000 ohms (wet)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Conductive surroundings:</strong> Metal walls, floors, and structures provide multiple earth paths &mdash; contact with a live conductor creates an unavoidable circuit through the body</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Limited escape:</strong> Muscle contraction from electric shock can prevent a worker from releasing the conductor, and there is no room for bystanders to safely intervene</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Reduced Voltage Requirements</p>
                  <div className="overflow-x-auto -mx-4 px-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-white/60 py-2 pr-3 font-medium">Application</th>
                          <th className="text-left text-white/60 py-2 pr-3 font-medium">Voltage</th>
                          <th className="text-left text-white/60 py-2 font-medium">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80">
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-3">General site tools</td>
                          <td className="py-2 pr-3"><span className="text-cyan-400 font-semibold">110V CTE</span></td>
                          <td className="py-2">55V max to earth &mdash; standard for UK construction</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-3">Hand lamps (damp spaces)</td>
                          <td className="py-2 pr-3"><span className="text-cyan-400 font-semibold">25V</span></td>
                          <td className="py-2">Required in wet or conductive confined spaces</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 pr-3">Hand lamps (very wet)</td>
                          <td className="py-2 pr-3"><span className="text-cyan-400 font-semibold">12V</span></td>
                          <td className="py-2">Submerged or extremely wet conditions</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-3">Battery-powered tools</td>
                          <td className="py-2 pr-3"><span className="text-green-400 font-semibold">Preferred</span></td>
                          <td className="py-2">Eliminates mains supply risk entirely</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Key Point for Electricians:</strong> When installing
                  temporary supplies for confined space work, always use a <strong>110V CTE transformer</strong>
                  as the minimum standard. For wet or conductive environments, specify 25V or 12V supplies
                  for hand lamps. RCDs (30mA, 40ms trip) must protect all circuits. Battery-powered tools
                  and lighting are the safest option and should be recommended wherever the task allows.
                  Ensure all equipment is inspected (PAT tested) before use in the confined space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Falls, Radiation, and Structural Collapse */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">08</span>
            Falls, Radiation, and Structural Collapse
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Waves className="h-5 w-5 text-cyan-400" />
                    <p className="text-sm font-medium text-white">Falls from Height</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Falls inside confined spaces are particularly dangerous because rescue access is
                    restricted and injuries are compounded by the confined environment:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Vertical access:</strong> Ladders in manholes, shafts, and silos &mdash; a fall from even a modest height onto a hard surface in a restricted space can cause fatal injuries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Internal platforms and walkways:</strong> Platforms within large vessels, tanks, and reactor chambers may be corroded, poorly maintained, or inadequately guarded</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Wet and slippery surfaces:</strong> Condensation, process residues, algae, and oil on metal surfaces create extremely slippery conditions &mdash; standard footwear may provide no grip</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">PPE complications:</strong> Harnesses, breathing apparatus, and bulky clothing can affect balance and restrict movement on ladders and narrow walkways</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Radiation Hazards</p>
                  <p className="text-sm text-white/80 mb-3">
                    Radiation hazards in confined spaces fall into two categories:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Non-ionising radiation (UV):</strong> Welding operations inside confined spaces produce intense UV radiation. In an enclosed environment, UV reflects off metal surfaces, increasing exposure from all angles. Arc eye (photokeratitis) and severe skin burns can occur even without direct line of sight to the arc. Other workers in the space are at risk if adequate screening is not provided.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Ionising radiation:</strong> Some industrial confined spaces (nuclear facilities, petrochemical plants, certain manufacturing processes) may contain radioactive sources used for level gauging, thickness measurement, or pipe weld inspection (radiography). These sources require specific radiation protection procedures, dosimetry monitoring, and controlled access supervised by a Radiation Protection Adviser (RPA).</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Structural Collapse</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    The physical structure of the confined space itself may present a collapse hazard:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Deteriorated structures:</strong> Old brick-lined manholes, chambers, and tunnels may have degraded mortar, spalling bricks, or weakened lintels that can collapse under load or vibration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Corrosion:</strong> Metal tanks, vessels, and pipework that have been exposed to chemicals, moisture, or aggressive environments may have corroded to the point of structural failure &mdash; floors, walls, and internal supports can give way without warning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Undermining:</strong> Excavation or water flow near underground structures can remove supporting ground, causing sudden subsidence or collapse of the chamber above</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Live loads:</strong> Traffic, stored materials, or construction plant above or adjacent to a confined space can impose loads that exceed the structure's (possibly degraded) design capacity</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Control Measures:</strong> For falls &mdash; use
                  fall arrest systems (harness and inertia reel) when working above 2 metres, ensure
                  ladders are secured and in good condition, apply anti-slip treatments to surfaces,
                  and provide adequate lighting. For radiation &mdash; welding screens for all
                  personnel in the space, appropriate welding PPE, and specialist controls for
                  ionising sources. For structural collapse &mdash; visual inspection of the structure
                  before entry, engineering assessment for suspect structures, propping or shoring
                  where necessary, and monitoring for signs of movement during work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Non-Atmospheric Hazard Summary */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <p className="text-sm font-medium text-white mb-2">Non-Atmospheric Hazard Summary</p>
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/60 py-2 pr-3 font-medium">Hazard</th>
                    <th className="text-left text-white/60 py-2 pr-3 font-medium">Examples</th>
                    <th className="text-left text-white/60 py-2 font-medium">Primary Control</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Engulfment (liquid)</td>
                    <td className="py-2 pr-3">Flooding, tidal ingress, burst pipes</td>
                    <td className="py-2">Isolate supplies, pumps, weather/tide checks</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Engulfment (solid)</td>
                    <td className="py-2 pr-3">Grain, sand, cement, coal</td>
                    <td className="py-2">Never walk on surfaces, LOTO discharge equipment</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Entrapment</td>
                    <td className="py-2 pr-3">Baffles, narrow passages, trench collapse</td>
                    <td className="py-2">Pre-entry assessment, rescue plan, shoring</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Temperature</td>
                    <td className="py-2 pr-3">Heat stress, cold stress, cryogenics</td>
                    <td className="py-2">Work/rest cycles, ventilation, monitoring</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Noise</td>
                    <td className="py-2 pr-3">Amplified tool noise, communication loss</td>
                    <td className="py-2">Quieter tools, hearing protection, visual signals</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Biological</td>
                    <td className="py-2 pr-3">Weil's disease, legionella, sewage pathogens</td>
                    <td className="py-2">Immunisation, PPE, hygiene, wound cover</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Mechanical</td>
                    <td className="py-2 pr-3">Agitators, pumps, conveyors</td>
                    <td className="py-2">LOTO &mdash; all energy sources isolated</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Electrical</td>
                    <td className="py-2 pr-3">Wet/conductive environments</td>
                    <td className="py-2">110V CTE, 25V/12V lamps, battery tools</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Falls</td>
                    <td className="py-2 pr-3">Ladders, platforms, slippery surfaces</td>
                    <td className="py-2">Fall arrest, secured ladders, anti-slip</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Radiation</td>
                    <td className="py-2 pr-3">Welding UV, industrial radioactive sources</td>
                    <td className="py-2">Screens, welding PPE, RPA supervision</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-medium text-white">Structural collapse</td>
                    <td className="py-2 pr-3">Deterioration, corrosion, undermining</td>
                    <td className="py-2">Inspection, engineering assessment, propping</td>
                  </tr>
                </tbody>
              </table>
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
        <Quiz
          title="Section 2 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Atmospheric Hazards
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-3-section-3">
              Next: Risk Assessment for Confined Spaces
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
