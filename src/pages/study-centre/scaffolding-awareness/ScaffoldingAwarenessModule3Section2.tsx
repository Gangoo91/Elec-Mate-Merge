import { ArrowLeft, CheckCircle, AlertTriangle, Layers, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "base-plate-minimum-size",
    question:
      "What is the minimum base plate size required for a standard tube-and-fitting scaffold?",
    options: [
      "100mm square",
      "150mm square",
      "200mm square",
      "250mm square",
    ],
    correctIndex: 1,
    explanation:
      "The minimum base plate size for a standard tube-and-fitting scaffold is 150mm square. This dimension ensures that the load from the standard is adequately distributed across a sufficient area of the sole board or bearing surface. Smaller base plates would concentrate loads too heavily and increase the risk of punching through timber sole boards or causing localised ground failure.",
  },
  {
    id: "sole-board-length-single",
    question:
      "What is the minimum sole board length for a single standard (one base plate)?",
    options: [
      "600mm",
      "800mm",
      "1000mm",
      "1500mm",
    ],
    correctIndex: 2,
    explanation:
      "The minimum sole board length for a single standard is 1000mm. This length is necessary to distribute the load over a sufficient area of ground beneath and around the base plate. Using shorter sole boards concentrates the load too much and increases the risk of the board sinking into soft ground, tipping, or failing to spread loads adequately.",
  },
  {
    id: "differential-settlement",
    question:
      "What is differential settlement and why is it dangerous for scaffolding?",
    options: [
      "When all standards settle evenly into the ground over time",
      "When the scaffold moves horizontally due to wind loads",
      "When some standards settle more than others, causing uneven loading and instability",
      "When the base plates rust and lose structural integrity",
    ],
    correctIndex: 2,
    explanation:
      "Differential settlement occurs when some standards settle into the ground more than others, creating uneven loading across the scaffold structure. This is extremely dangerous because it introduces eccentric loads into standards, distorts the frame geometry, can cause couplers to fail, and may lead to partial or total collapse. It is most commonly caused by variable ground conditions beneath the scaffold or inadequate sole boards on soft ground.",
  },
];

const faqs = [
  {
    question:
      "Can scaffold be erected directly on tarmac or concrete without sole boards?",
    answer:
      "It depends on the condition and thickness of the surface. A sound, well-constructed concrete slab or thick tarmac surface may support scaffold base plates directly, provided the bearing capacity is adequate for the loads involved. However, thin tarmac over soft sub-base, cracked or deteriorated concrete, or surfaces over voids or services should always have sole boards fitted. In practice, many scaffolding companies require sole boards on all surfaces as standard procedure. Always follow the scaffold design or TG20 compliance sheet and check with the scaffold designer if there is any doubt about ground conditions.",
  },
  {
    question:
      "What happens if a scaffold is erected near an excavation?",
    answer:
      "Scaffolding near excavations presents significant risks because the excavation removes the lateral support that the ground normally provides. The weight of the scaffold and its loads can cause the ground at the edge of the excavation to collapse, undermining the scaffold foundations. As a general rule, scaffold foundations should be kept outside the zone of influence of any excavation. The zone of influence extends at roughly 45 degrees from the bottom of the excavation. If the scaffold must be within this zone, the excavation must be properly shored or sheet-piled, and the scaffold design must account for the reduced ground bearing capacity. A structural engineer or scaffold designer should be consulted.",
  },
  {
    question:
      "How do you use adjustable base plates on sloping ground?",
    answer:
      "Adjustable base plates (also called screw jacks) allow the scaffold standard to be set to the correct vertical position on sloping ground. The base plate is screwed up or down on a threaded stem to compensate for the slope. However, there are strict limits on how far adjustable bases can be extended. Typically, the maximum extension should not exceed 300mm (or as specified by the manufacturer), and the exposed thread must not be the sole means of taking the load. The sole board beneath the adjustable base must be set level if possible, or firmly bedded against the slope. On steep slopes, purpose-built raking foundations or stepped sole boards may be required, and the scaffold design must account for the slope.",
  },
  {
    question:
      "What is the difference between bearing capacity and bearing pressure?",
    answer:
      "Bearing pressure is the actual load per unit area being applied to the ground by the scaffold through its base plates and sole boards. It is calculated by dividing the total load at a standard by the contact area of the sole board or base plate. Bearing capacity is the maximum load per unit area that the ground can safely support without failure or excessive settlement. For a scaffold to be safe, the bearing pressure must always be less than the bearing capacity of the ground. If the bearing pressure exceeds the bearing capacity, the ground will fail, the scaffold will settle, and structural collapse may follow. Increasing the size of sole boards reduces the bearing pressure by spreading the load over a larger area.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the primary purpose of a sole board beneath a scaffold base plate?",
    options: [
      "To prevent the base plate from rusting",
      "To spread the load from the standard over a larger area of ground",
      "To provide a level surface for the scaffold user to stand on",
      "To anchor the scaffold to the ground and prevent movement",
    ],
    correctAnswer: 1,
    explanation:
      "The primary purpose of a sole board is to spread the load from the scaffold standard and base plate over a larger area of ground. This reduces the bearing pressure on the ground surface and prevents the scaffold from sinking, settling, or punching through soft ground. Sole boards are a critical foundation component and must always be of adequate size and thickness for the ground conditions and scaffold loads.",
  },
  {
    id: 2,
    question:
      "Which of the following ground types typically has the LOWEST bearing capacity?",
    options: [
      "Sound rock",
      "Dense gravel",
      "Stiff clay",
      "Soft alluvial clay or peat",
    ],
    correctAnswer: 3,
    explanation:
      "Soft alluvial clay, peat, recently filled ground, and waterlogged soils have the lowest bearing capacities. Peat and very soft clays may have bearing capacities as low as 25 kN/m2, which is often insufficient for scaffold loads without significant load-spreading measures. Sound rock can support 1000 kN/m2 or more, dense gravel typically 200-600 kN/m2, and stiff clay around 150-300 kN/m2.",
  },
  {
    id: 3,
    question:
      "What is the minimum base plate size for a standard tube-and-fitting scaffold?",
    options: [
      "100mm square",
      "125mm square",
      "150mm square",
      "200mm square",
    ],
    correctAnswer: 2,
    explanation:
      "The minimum base plate size for standard tube-and-fitting scaffolding is 150mm square (150mm x 150mm). This is a minimum requirement and larger base plates may be needed on softer ground or where higher loads are anticipated. The base plate must sit centrally on the sole board and make full contact with the bearing surface.",
  },
  {
    id: 4,
    question:
      "A sole board for a single standard must be at least how long?",
    options: [
      "600mm",
      "800mm",
      "1000mm",
      "1200mm",
    ],
    correctAnswer: 2,
    explanation:
      "The minimum sole board length for a single standard is 1000mm. This length ensures that the load is distributed over a sufficient area of ground beneath and around the base plate. Sole boards should be a minimum of 35mm thick scaffold board or equivalent timber. For two standards sharing a sole board, a longer board is required to support both base plates with adequate bearing area.",
  },
  {
    id: 5,
    question:
      "What is the zone of influence near an excavation, and why does it matter for scaffold foundations?",
    options: [
      "A 1-metre exclusion zone where no materials may be stored",
      "The area extending at roughly 45 degrees from the base of the excavation, where ground bearing capacity is reduced",
      "A 3-metre radius around the excavation that must be fenced off",
      "The area directly above the excavation that is at risk of collapse",
    ],
    correctAnswer: 1,
    explanation:
      "The zone of influence extends at approximately 45 degrees from the bottom edge of the excavation outward. Within this zone, the ground has reduced bearing capacity because the excavation has removed the lateral support that the soil normally provides. Placing scaffold foundations within the zone of influence can overload the weakened ground, causing it to collapse into the excavation and undermining the scaffold. Scaffold foundations should ideally be located outside this zone unless the excavation is properly supported.",
  },
  {
    id: 6,
    question:
      "What is the maximum typical extension for an adjustable base plate (screw jack)?",
    options: [
      "100mm",
      "200mm",
      "300mm",
      "500mm",
    ],
    correctAnswer: 2,
    explanation:
      "Adjustable base plates (screw jacks) should typically not be extended more than 300mm, or as specified by the manufacturer. Excessive extension creates a long lever arm on the exposed thread, increases the risk of bending or buckling, and can introduce eccentric loads. On steep slopes where more adjustment is needed, purpose-built raking foundations, stepped sole boards, or custom foundation arrangements designed by a scaffold designer should be used instead.",
  },
  {
    id: 7,
    question:
      "Which of the following is a sign of differential settlement in a scaffold?",
    options: [
      "All standards have settled evenly into the ground by the same amount",
      "Ledgers and transoms remain perfectly horizontal throughout the scaffold",
      "Some standards have sunk further than others, causing visible leaning, distorted frames, or uneven platforms",
      "The base plates are all at the same height above the sole boards",
    ],
    correctAnswer: 2,
    explanation:
      "Differential settlement is identified by standards that have settled unevenly, resulting in some parts of the scaffold being lower than others. Visible signs include leaning or tilting of the scaffold structure, distorted or racked frames, ledgers and transoms that are no longer horizontal, gaps appearing between boards on working platforms, and couplers under unusual stress. Any of these signs should trigger an immediate scaffold inspection and the scaffold should be taken out of use until the issue is resolved.",
  },
  {
    id: 8,
    question:
      "On soft ground, which approach is most effective for preventing scaffold settlement?",
    options: [
      "Using the smallest possible base plates to concentrate the load and push through to firmer ground",
      "Erecting the scaffold as quickly as possible before the ground can deform",
      "Using adequately sized sole boards to spread the load, combined with larger base plates and checking ground bearing capacity",
      "Watering the ground before erection to compact it naturally",
    ],
    correctAnswer: 2,
    explanation:
      "On soft ground, the most effective approach is to spread the load over as large an area as possible using adequately sized sole boards (longer and wider than the minimum), combined with larger base plates. The ground bearing capacity must be assessed before erection and the sole board dimensions chosen so that the bearing pressure from the scaffold does not exceed the ground's bearing capacity. On very soft ground, concrete pads, grillage foundations, or ground improvement may be necessary. The scaffold design should always account for the actual ground conditions.",
  },
];

export default function ScaffoldingAwarenessModule3Section2() {
  useSEO({
    title:
      "Base Plates, Sole Boards & Foundations | Scaffolding Awareness Module 3.2",
    description:
      "Ground conditions assessment, bearing capacity, base plate sizes, sole boards, adjustable bases, load spreading, preventing settlement and differential settlement, foundations near excavations.",
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
            <Link to="../scaffolding-awareness-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <Layers className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Base Plates, Sole Boards &amp; Foundations
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Ground conditions assessment, bearing capacity, base plate
            dimensions, sole board requirements, adjustable bases for slopes,
            load distribution, preventing settlement, and scaffold foundations
            near excavations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Base plates:</strong> Minimum 150mm square &mdash;
                distributes standard load onto sole board
              </li>
              <li>
                <strong>Sole boards:</strong> Minimum 1000mm long for a single
                standard &mdash; spreads load onto ground
              </li>
              <li>
                <strong>Ground check:</strong> Always assess bearing capacity
                before erection begins
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Settlement:</strong> Prevent by spreading loads with
                adequate sole boards
              </li>
              <li>
                <strong>Excavations:</strong> Keep foundations outside the 45&deg;
                zone of influence
              </li>
              <li>
                <strong>Slopes:</strong> Use adjustable bases &mdash; max 300mm
                extension typical
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
              "Describe how to assess ground conditions before scaffold erection",
              "Explain bearing capacity and bearing pressure and how they relate to scaffold foundations",
              "State the minimum base plate and sole board dimensions for tube-and-fitting scaffolding",
              "Understand how loads travel through standards into the ground and how to spread them",
              "Explain the risks of settlement and differential settlement and how to prevent them",
              "Identify the hazards of erecting scaffolding near excavations and the zone of influence rule",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Ground Conditions Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Ground Conditions Assessment
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before any scaffold is erected, the <strong>ground conditions at the base
                must be assessed</strong> to determine whether they can safely support the loads
                that the scaffold will impose. This is one of the most critical steps in scaffold
                erection and is frequently the point at which problems originate. A scaffold that
                is perfectly designed and correctly assembled will still fail if the ground beneath
                it cannot take the load.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Key Principle:</strong> The ground is the
                  ultimate foundation of every scaffold. Every load &mdash; from self-weight, working
                  platforms, materials, operatives, wind, and any other imposed load &mdash; must
                  eventually pass through the standards, base plates, and sole boards into the ground.
                  If the ground cannot support these loads, the scaffold will settle, tilt, or collapse.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What to Check During a Ground Assessment
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Soil type:</strong> Is it rock, gravel,
                      compacted hardcore, clay, silt, peat, or recently filled ground? Each has very
                      different bearing capacities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Surface type:</strong> Concrete slab, tarmac,
                      paving slabs, grass, bare earth, or artificial surface? Assess the thickness and
                      condition of any hard surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Water and drainage:</strong> Is the ground
                      waterlogged, prone to flooding, or near a watercourse? Standing water
                      significantly reduces bearing capacity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Previous use:</strong> Has the ground been
                      previously excavated and backfilled? Recently filled ground has far lower
                      bearing capacity than undisturbed natural ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Underground services:</strong> Are there drains,
                      culverts, inspection chambers, cellars, vaults, or other voids beneath the
                      surface that could collapse under scaffold loads?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Slope and level:</strong> Is the ground level,
                      gently sloping, or steeply sloping? Slopes require adjustable bases and
                      potentially specialist foundation design
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Nearby excavations:</strong> Is there a trench,
                      basement dig, or other excavation nearby that reduces the bearing capacity of
                      adjacent ground?
                    </span>
                  </li>
                </ul>
              </div>

              {/* Ground Condition Assessment Diagram */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl p-6 sm:p-8">
                <p className="text-sm font-medium text-slate-400 mb-6 text-center">
                  Ground Condition Assessment &mdash; Key Checks
                </p>
                <div className="max-w-md mx-auto space-y-3">
                  {/* Ground layers diagram */}
                  <div className="relative">
                    {/* Surface layer */}
                    <div className="h-10 bg-gray-500/30 border border-gray-400/40 rounded-t-lg flex items-center px-4">
                      <span className="text-[10px] sm:text-xs font-semibold text-gray-300">
                        SURFACE &mdash; Concrete / Tarmac / Paving / Grass
                      </span>
                    </div>
                    {/* Sub-base */}
                    <div className="h-10 bg-amber-800/20 border-x border-amber-700/30 flex items-center px-4">
                      <span className="text-[10px] sm:text-xs font-semibold text-amber-400/80">
                        SUB-BASE &mdash; Hardcore / Compacted fill
                      </span>
                    </div>
                    {/* Natural ground */}
                    <div className="h-12 bg-amber-900/25 border-x border-amber-800/30 flex items-center px-4">
                      <span className="text-[10px] sm:text-xs font-semibold text-amber-500/70">
                        NATURAL GROUND &mdash; Clay / Gravel / Sand / Rock
                      </span>
                    </div>
                    {/* Water table indicator */}
                    <div className="h-8 bg-blue-900/20 border-x border-b border-blue-700/30 rounded-b-lg flex items-center px-4">
                      <span className="text-[10px] sm:text-xs font-semibold text-blue-400/70">
                        WATER TABLE (seasonal variation)
                      </span>
                    </div>

                    {/* Right-side annotation arrows */}
                    <div className="absolute -right-2 top-0 translate-x-full space-y-1 hidden sm:block">
                      <div className="flex items-center gap-1 h-10">
                        <div className="w-3 h-[1px] bg-gray-400/50" />
                        <span className="text-[9px] text-gray-400 whitespace-nowrap">
                          Check thickness &amp; condition
                        </span>
                      </div>
                      <div className="flex items-center gap-1 h-10">
                        <div className="w-3 h-[1px] bg-amber-500/50" />
                        <span className="text-[9px] text-amber-400/70 whitespace-nowrap">
                          Compacted or loose fill?
                        </span>
                      </div>
                      <div className="flex items-center gap-1 h-12">
                        <div className="w-3 h-[1px] bg-amber-600/50" />
                        <span className="text-[9px] text-amber-500/60 whitespace-nowrap">
                          Bearing capacity varies
                        </span>
                      </div>
                      <div className="flex items-center gap-1 h-8">
                        <div className="w-3 h-[1px] bg-blue-500/50" />
                        <span className="text-[9px] text-blue-400/60 whitespace-nowrap">
                          Reduces capacity when high
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Check icons below */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-center">
                      <AlertTriangle className="h-4 w-4 text-red-400 mx-auto mb-1" />
                      <span className="text-[9px] sm:text-[10px] text-red-300 leading-tight block">
                        Voids &amp; services below?
                      </span>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 text-center">
                      <Info className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                      <span className="text-[9px] sm:text-[10px] text-amber-300 leading-tight block">
                        Previously excavated?
                      </span>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-center">
                      <Info className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                      <span className="text-[9px] sm:text-[10px] text-blue-300 leading-tight block">
                        Drainage &amp; flooding risk?
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Assume &mdash; Always Assess
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Ground that looks firm on the surface can hide voids, soft spots, or recently
                  filled trenches beneath. A tarmac car park may look solid but could be a thin
                  layer over soft clay or backfilled ground. <strong className="text-white">
                  Always carry out a ground assessment before erection</strong> and raise concerns
                  with the scaffold supervisor or designer if conditions appear unsuitable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Bearing Capacity and Bearing Pressure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Bearing Capacity and Bearing Pressure
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the relationship between <strong>bearing capacity</strong> and
                <strong> bearing pressure</strong> is fundamental to getting scaffold foundations
                right. These two concepts explain why some scaffolds settle and others do not,
                and why sole board size matters so much.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Bearing Capacity (What the Ground Can Take)
                  </p>
                  <p className="text-sm text-white/80 mb-3">
                    Bearing capacity is the <strong className="text-white">maximum load per unit
                    area</strong> (measured in kN/m&sup2;) that the ground can safely support without
                    failure or excessive settlement. It depends on the soil type, moisture content,
                    depth, and whether the ground is disturbed or undisturbed.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Sound rock:</strong> 1000+ kN/m&sup2;
                        &mdash; excellent support
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Dense gravel:</strong> 200&ndash;600
                        kN/m&sup2; &mdash; very good support
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Compact sand:</strong> 100&ndash;300
                        kN/m&sup2; &mdash; good, depends on compaction
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Stiff clay:</strong> 150&ndash;300
                        kN/m&sup2; &mdash; good when dry, weakens when wet
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Soft clay:</strong> 50&ndash;100
                        kN/m&sup2; &mdash; marginal, requires larger sole boards
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Peat / very soft alluvial clay:</strong>{" "}
                        25&ndash;50 kN/m&sup2; &mdash; often inadequate for scaffolding without
                        specialist foundations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Recently filled / made ground:</strong>{" "}
                        Highly variable &mdash; treat with extreme caution, may need engineer assessment
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Bearing Pressure (What the Scaffold Applies)
                  </p>
                  <p className="text-sm text-white/80 mb-3">
                    Bearing pressure is the <strong className="text-white">actual load per unit
                    area</strong> being applied to the ground by the scaffold. It is calculated by
                    dividing the total load at a standard by the contact area of the sole board or
                    base plate in contact with the ground.
                  </p>
                  <div className="bg-slate-500/10 border border-slate-500/30 p-3 rounded-lg">
                    <p className="text-sm font-mono text-slate-300 text-center">
                      Bearing Pressure = Load at Standard &divide; Contact Area of Sole Board
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">The Rule:</strong> For a scaffold to be safe,
                  the <strong>bearing pressure must always be less than the bearing capacity</strong>{" "}
                  of the ground. If the bearing pressure exceeds the ground&rsquo;s bearing capacity,
                  the ground will fail beneath the scaffold, causing settlement, tilting, or collapse.
                  The simplest way to reduce bearing pressure is to <strong>increase the contact area</strong>{" "}
                  by using larger sole boards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Base Plates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">03</span>
            Base Plates
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>base plate</strong> is a flat steel plate that sits at the bottom of a
                scaffold standard. Its primary purpose is to distribute the concentrated point load
                from the standard tube over a wider area of the sole board or bearing surface. Without
                a base plate, the tube would bear on a very small area (the cross-section of the tube
                itself &mdash; approximately 48.3mm diameter), which would punch through timber sole
                boards and create extreme point loads on any surface.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Base Plate Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minimum size:</strong> 150mm x 150mm square
                      for standard tube-and-fitting scaffolding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Material:</strong> Steel plate, typically
                      5&ndash;6mm thick, with a central spigot or pin to locate the standard tube
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Positioning:</strong> Must be set centrally on
                      the sole board and make full, flat contact with the bearing surface &mdash; no
                      rocking, tilting, or partial contact
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Condition:</strong> Must be free from
                      significant corrosion, bending, cracking, or damage &mdash; reject damaged
                      base plates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Larger plates:</strong> On softer ground or
                      where higher loads are expected, larger base plates (200mm or more) may be
                      specified in the scaffold design
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Types of Base Plate
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fixed base plate:</strong> A flat steel plate
                      with a central spigot &mdash; the simplest and most common type. The standard
                      tube sits on the spigot. Used on level ground where no height adjustment is
                      needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Adjustable base plate (screw jack):</strong> A
                      base plate with a threaded stem that allows vertical adjustment. Used on
                      sloping ground or where precise levelling is needed. The standard tube slides
                      over the threaded stem and is secured at the required height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Swivel base plate:</strong> A base plate that
                      can pivot to sit flat on sloping surfaces while keeping the standard vertical.
                      Used on moderately sloping ground where a flat sole board cannot be achieved
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Defects to Reject
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Bent, bowed, or warped plates that do not sit flat
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Severely corroded plates with reduced thickness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Missing, bent, or damaged spigots or locating pins
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Cracked welds on adjustable base plate stems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Stripped or damaged threads on adjustable (screw jack) bases
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Sole Boards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">04</span>
            Sole Boards
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>sole board</strong> sits beneath the base plate and distributes the
                scaffold load over a larger area of ground. It is the primary means of
                <strong> spreading the load</strong> from a standard onto the ground surface.
                Without adequate sole boards, even large base plates will concentrate loads
                too heavily and the scaffold will sink into all but the hardest surfaces.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Sole Board Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minimum length for a single standard:</strong>{" "}
                      1000mm (one metre)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Material:</strong> Scaffold boards (typically
                      225mm wide x 38mm thick) or sawn softwood timber of equivalent strength and
                      thickness (minimum 35mm thick)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Width:</strong> At least the full width of
                      a scaffold board (225mm minimum) &mdash; wider sole boards may be needed on
                      soft ground (two boards side-by-side or purpose-made timber pads)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Base plate position:</strong> The base plate
                      must sit centrally on the sole board so the load is distributed evenly in all
                      directions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Condition:</strong> Sole boards must be sound,
                      undamaged timber &mdash; reject boards that are split, cracked, rotten,
                      excessively bowed, or significantly reduced in thickness
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Sole Board Sizing for Multiple Standards
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Single standard:</strong> Minimum 1000mm long
                      sole board with the base plate centred
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Two standards (e.g. inner and outer row):</strong>{" "}
                      A single continuous sole board may support both base plates, provided it is
                      long enough to extend at least 150mm beyond each base plate at both ends
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Soft ground:</strong> The scaffold designer
                      may specify larger sole boards, double-thickness boards, or purpose-made
                      timber grillage pads to achieve the required load-spreading area
                    </span>
                  </li>
                </ul>
              </div>

              {/* Base Plate and Sole Board Arrangement Diagram */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl p-6 sm:p-8">
                <p className="text-sm font-medium text-slate-400 mb-6 text-center">
                  Base Plate &amp; Sole Board Arrangement &mdash; Single Standard
                </p>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[320px] sm:max-w-[400px]">
                    {/* Standard tube */}
                    <div className="mx-auto w-3 h-24 bg-gray-400/60 border border-gray-400/80 rounded-t-sm" />

                    {/* Base plate */}
                    <div className="mx-auto w-16 sm:w-20 h-3 bg-gray-500/80 border border-gray-400 rounded-sm relative">
                      {/* Label: Base plate */}
                      <div className="absolute top-1/2 -translate-y-1/2 -right-2 translate-x-full">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-[1px] bg-gray-400/60" />
                          <div className="bg-gray-500/20 border border-gray-400/40 rounded px-2 py-1">
                            <span className="text-[9px] sm:text-[10px] font-semibold text-gray-300 whitespace-nowrap">
                              Base plate (min 150mm sq.)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sole board */}
                    <div className="mx-auto w-full max-w-[280px] sm:max-w-[340px] h-4 bg-amber-800/40 border border-amber-700/50 rounded-sm relative mt-[1px]">
                      {/* Label: Sole board */}
                      <div className="absolute top-1/2 -translate-y-1/2 -left-2 -translate-x-full hidden sm:block">
                        <div className="flex items-center gap-1">
                          <div className="bg-amber-700/20 border border-amber-600/40 rounded px-2 py-1">
                            <span className="text-[9px] sm:text-[10px] font-semibold text-amber-300 whitespace-nowrap">
                              Sole board (min 1000mm)
                            </span>
                          </div>
                          <div className="w-4 h-[1px] bg-amber-500/60" />
                        </div>
                      </div>
                      {/* Mobile label */}
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 sm:hidden">
                        <span className="text-[9px] text-amber-300 whitespace-nowrap">
                          Sole board (min 1000mm long)
                        </span>
                      </div>
                    </div>

                    {/* Ground surface */}
                    <div className="w-full h-10 bg-amber-900/20 border-t-2 border-amber-700/40 rounded-b-lg mt-[1px] flex items-center justify-center">
                      <span className="text-[9px] sm:text-[10px] font-semibold text-amber-500/60">
                        GROUND SURFACE
                      </span>
                    </div>

                    {/* Dimension indicators */}
                    <div className="mt-4 flex justify-between items-center max-w-[280px] sm:max-w-[340px] mx-auto">
                      <div className="w-2 h-[1px] bg-slate-400/60" />
                      <div className="flex-1 h-[1px] bg-slate-400/40 relative">
                        <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] text-slate-400 whitespace-nowrap">
                          Sole board extends min 425mm each side of base plate centre
                        </span>
                      </div>
                      <div className="w-2 h-[1px] bg-slate-400/60" />
                    </div>

                    {/* Standard tube label */}
                    <div className="absolute top-4 -left-2 -translate-x-full hidden sm:block">
                      <div className="flex items-center gap-1">
                        <div className="bg-gray-500/20 border border-gray-400/40 rounded px-2 py-1">
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-300 whitespace-nowrap">
                            Standard (48.3mm OD tube)
                          </span>
                        </div>
                        <div className="w-4 h-[1px] bg-gray-400/60" />
                      </div>
                    </div>

                    {/* Load arrow */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 mb-1">
                        LOAD
                      </span>
                      <div className="w-[1px] h-3 bg-slate-400" />
                      <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-transparent border-t-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 bg-slate-500/10 border border-slate-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs sm:text-sm text-slate-300">
                    Load passes from standard &rarr; through base plate &rarr; spread across sole board &rarr; into ground
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Adjustable Bases for Slopes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">05</span>
            Adjustable Bases for Slopes
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scaffolding frequently needs to be erected on <strong>sloping ground</strong> &mdash;
                building facades on hillsides, sites with gradient changes, driveways, and car parks
                with falls. Adjustable base plates (screw jacks) allow the scaffolders to set each
                standard to the correct vertical position while the base sits on sloping or uneven
                ground.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How Adjustable Bases Work
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The base plate has a <strong className="text-white">threaded stem</strong>{" "}
                      (typically 38mm diameter) welded to its centre
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The standard tube slides over the threaded stem and is positioned at the
                      required height by <strong className="text-white">rotating the adjustment
                      nut</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      This allows the <strong className="text-white">bottom lift to be set level</strong>{" "}
                      even though the ground slopes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The first ledger level is then horizontal, and the entire scaffold above is plumb
                      and level
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Maximum Extension Limits
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Typical maximum extension:</strong> 300mm
                      of exposed thread (or as specified by the manufacturer)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Excessive extension creates a <strong className="text-white">long unsupported
                      length</strong> of thread that can bend, buckle, or introduce eccentric loading
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      If the slope requires more than 300mm adjustment, <strong className="text-white">
                      stepped sole boards, raking foundations, or a purpose-designed foundation</strong>{" "}
                      must be used instead
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Always ensure the <strong className="text-white">sole board beneath is firmly
                      bedded</strong> against the slope and cannot slide downhill
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">On Site:</strong> On steep slopes, it is
                  common to see <strong>stepped foundations</strong> where timber sole boards are
                  cut into the slope at different levels, each one level and firmly bedded. Each
                  standard then sits on its own level platform with minimal screw jack extension.
                  This approach is far safer than trying to compensate for a large slope entirely
                  through screw jack adjustment. On very steep sites, the scaffold designer may
                  specify concrete pads, driven posts, or other engineered foundation solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Scaffold on Concrete/Tarmac vs Soft Ground */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">06</span>
            Scaffold on Concrete/Tarmac vs Soft Ground
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The surface type beneath the scaffold has a major impact on foundation requirements.
                A scaffold on a thick, sound concrete slab has very different needs from one on soft
                clay or garden turf. Understanding these differences is critical for selecting the
                right foundation approach.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Hard Surfaces &mdash; Concrete and Tarmac
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Sound, thick concrete slabs</strong> (e.g.
                        ground-floor structural slabs, reinforced bases) can typically support
                        scaffold base plates directly, with or without sole boards depending on the
                        scaffold design
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Thick tarmac</strong> (e.g. highways,
                        properly constructed car parks) can also support scaffold bases, but check
                        for soft spots, patches, and thin areas
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Caution:</strong> Thin tarmac over soft
                        sub-base (e.g. footpaths, garden paths, temporary surfaces) may not have
                        adequate bearing capacity &mdash; the tarmac can crack under scaffold loads
                        and the base plate will punch through into the soft material beneath
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Cracked or deteriorated concrete</strong>{" "}
                        should be treated with caution &mdash; the surface may look adequate but
                        could have voids, delamination, or poor sub-base beneath
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Paving slabs:</strong> Individual paving
                        slabs on a sand bed are NOT a reliable bearing surface &mdash; they can tip,
                        crack, or settle unevenly. Sole boards should be used across multiple slabs
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Soft Ground &mdash; Clay, Turf, Bare Earth, and Fill
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Sole boards are always required</strong>{" "}
                        on soft ground &mdash; no exceptions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Sole boards must be <strong className="text-white">large enough to reduce
                        the bearing pressure below the ground&rsquo;s bearing capacity</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        On very soft ground (peat, waterlogged clay, recent fill),{" "}
                        <strong className="text-white">standard sole boards may not be sufficient</strong>{" "}
                        &mdash; larger timber pads, concrete pads, or grillage foundations may be
                        needed
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Garden ground, flower beds, and turf</strong>{" "}
                        are deceptively soft &mdash; topsoil has very low bearing capacity and will
                        compress significantly under load
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Weather changes conditions:</strong> Ground
                        that was firm when the scaffold was erected can become waterlogged after
                        rain, significantly reducing bearing capacity. This is a common cause of
                        scaffold settlement on clay and silt soils
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Best Practice:</strong> Many scaffolding
                  companies require sole boards on <strong>all surfaces</strong> as standard
                  procedure, regardless of whether the ground appears firm. This eliminates
                  judgment errors and provides a consistent, safe foundation for every scaffold.
                  If in doubt about whether sole boards are needed, always fit them &mdash; it is
                  far better to have sole boards that were not strictly necessary than to omit
                  them and have the scaffold settle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Load Transfer, Spreading, and Preventing Settlement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">07</span>
            Load Transfer, Spreading, and Preventing Settlement
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every load on a scaffold &mdash; the self-weight of the structure, the weight of
                working platforms and boards, the weight of operatives and materials, wind loads,
                and any other imposed loads &mdash; must eventually pass down through the standards
                into the ground. Understanding <strong>how loads travel through the scaffold</strong>{" "}
                and how to <strong>spread them at the base</strong> is essential for preventing
                settlement.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How Loads Travel Through the Scaffold
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Imposed loads</strong> (operatives, materials,
                      equipment) act on the <strong className="text-white">working platforms</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Platform boards transfer loads to the <strong className="text-white">transoms
                      or putlogs</strong> that support them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Transoms transfer loads to the <strong className="text-white">ledgers</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Ledgers transfer loads (via couplers) to the{" "}
                      <strong className="text-white">standards</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Standards carry the accumulated load downward to the{" "}
                      <strong className="text-white">base plates</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Base plates spread the load onto{" "}
                      <strong className="text-white">sole boards</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Sole boards spread the load over a larger area of{" "}
                      <strong className="text-white">ground</strong>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Settlement vs Differential Settlement
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-white mb-1">
                      <strong>Uniform settlement</strong>
                    </p>
                    <p className="text-sm text-white/80">
                      If all standards settle by the <strong className="text-white">same
                      amount</strong>, the scaffold drops evenly. While this is undesirable, it
                      does not immediately cause structural instability &mdash; the scaffold
                      remains plumb and level relative to itself. However, it changes the
                      relationship with the building (e.g. ties may become overstressed) and must
                      be corrected.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">
                      <strong>Differential settlement</strong>
                    </p>
                    <p className="text-sm text-white/80">
                      If some standards settle <strong className="text-white">more than
                      others</strong>, the scaffold tilts and distorts. This is{" "}
                      <strong className="text-white">extremely dangerous</strong> because it
                      introduces eccentric loads into standards, distorts the frame geometry, puts
                      abnormal stress on couplers, and can lead to progressive collapse. Differential
                      settlement is the more common and more dangerous form of settlement on site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Signs of Settlement &mdash; Act Immediately
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Base plates or sole boards sinking into the ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Scaffold leaning or tilting away from the building
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Ledgers no longer horizontal &mdash; visible slope along the scaffold run
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Gaps appearing between platform boards or between boards and the building
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Ties becoming tight, loose, or pulling out of the building
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Couplers showing unusual stress &mdash; bending, slipping, or rotating
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Standing water pooling around the base of the scaffold
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Preventing Settlement
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Assess ground conditions</strong> before
                      erection &mdash; identify weak spots, variable ground, voids, and drainage
                      issues
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Use adequately sized sole boards</strong>{" "}
                      to spread loads so that bearing pressure stays below the ground&rsquo;s
                      bearing capacity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ensure consistent ground conditions</strong>{" "}
                      beneath all standards &mdash; if the ground varies (e.g. half on concrete,
                      half on soft earth), use larger sole boards on the softer areas to equalise
                      settlement risk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Manage drainage</strong> &mdash; divert
                      water away from the scaffold base, do not allow puddles to form around sole
                      boards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Monitor regularly</strong> &mdash; check for
                      signs of settlement during every scaffold inspection, particularly after
                      heavy rain or load changes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Foundations Near Excavations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Foundations Near Excavations
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Erecting scaffolding near <strong>trenches, foundation digs, basement
                excavations, or other open ground</strong> requires careful consideration of the
                effect that the excavation has on the bearing capacity of the adjacent ground.
                This is a common scenario on construction sites and is a frequent cause of scaffold
                incidents when not properly managed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Zone of Influence
                </p>
                <p className="text-sm text-white/80 mb-3">
                  When ground is excavated, the <strong className="text-white">lateral support</strong>{" "}
                  that the removed soil was providing to the adjacent ground is lost. This creates a
                  weakened zone around the excavation where the ground has significantly reduced
                  bearing capacity and is at risk of collapse. This weakened area is called the{" "}
                  <strong className="text-white">zone of influence</strong>.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      As a general rule, the zone of influence extends at approximately{" "}
                      <strong className="text-white">45 degrees from the bottom of the
                      excavation</strong> outward to the ground surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      For a 2-metre deep trench, the zone of influence extends approximately
                      2 metres back from the edge of the trench at ground level
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Scaffold loads within the zone of influence
                      can cause the ground to collapse</strong> into the excavation, undermining
                      the scaffold foundations
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Safety Rules
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Never place scaffold foundations within the
                      zone of influence</strong> of an unsupported excavation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      If the scaffold <strong className="text-white">must</strong> be within the
                      zone, the excavation must be properly <strong className="text-white">shored,
                      sheet-piled, or otherwise supported</strong> before the scaffold is erected
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      A <strong className="text-white">structural engineer or scaffold designer</strong>{" "}
                      must assess the situation and design the foundations accordingly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Consider the <strong className="text-white">combined effect</strong> of
                      scaffold loads and any materials stored near the edge of the excavation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Other Hazards Near Excavations
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Vibration from plant:</strong> Excavators,
                      compactors, and piling rigs working nearby can cause additional ground
                      movement and reduce the stability of excavation sides
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Water ingress:</strong> Water entering the
                      excavation (from rain, burst services, or rising groundwater) weakens the
                      surrounding ground and increases the risk of collapse
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Changing conditions:</strong> An excavation
                      that was stable when the scaffold was erected may deteriorate over time due
                      to weather, dewatering, additional excavation, or removal of temporary
                      supports &mdash; regular monitoring is essential
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Backfilled trenches:</strong> Recently
                      backfilled trenches have very low bearing capacity compared to undisturbed
                      ground &mdash; never treat a backfilled trench as equivalent to natural ground
                      without adequate time for consolidation and compaction
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Remember:</strong> Excavation work on a
                  construction site is dynamic &mdash; trenches are opened, backfilled, and
                  reopened as work progresses. A scaffold that was safely positioned one day may
                  find itself within the zone of influence of a new excavation the next. Always{" "}
                  <strong>communicate with the site team</strong> about planned excavation work
                  near scaffold positions and <strong>reassess scaffold foundations</strong>{" "}
                  whenever the ground conditions around the base change.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-3-section-3">
              Next: Platforms, Guard Rails &amp; Toe Boards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
