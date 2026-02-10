import { ArrowLeft, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "collective-vs-personal",
    question: "Under the Work at Height Regulations 2005, which type of fall protection should always be considered first?",
    options: [
      "Personal fall protection such as harnesses",
      "Collective fall protection such as guard rails and safety nets",
      "Soft landing systems such as airbags",
      "Administrative controls such as warning signs"
    ],
    correctIndex: 1,
    explanation: "The hierarchy of controls requires that collective measures (guard rails, edge protection, safety nets) are always considered before personal measures (harnesses, lanyards). Collective protection safeguards everyone in the area without relying on individual action or training, making it inherently more reliable."
  },
  {
    id: "harness-clearance",
    question: "A worker is wearing a full body harness with a 2m lanyard and shock absorber. The shock absorber can extend by 1.75m. Allowing 1m for the worker's height below the D-ring and 1m safety margin, what is the minimum clearance distance required below the anchor point?",
    options: [
      "3.75 metres",
      "4.75 metres",
      "5.75 metres",
      "6.75 metres"
    ],
    correctIndex: 2,
    explanation: "The total clearance distance is: lanyard length (2m) + shock absorber extension (1.75m) + height below D-ring (1m) + safety margin (1m) = 5.75m. If there is insufficient clearance below the anchor point, the worker could strike the ground or a lower obstruction during a fall. Clearance distance is one of the most commonly miscalculated factors in fall arrest planning."
  },
  {
    id: "rescue-plan",
    question: "Why must a rescue plan be in place before any work at height involving personal fall protection equipment begins?",
    options: [
      "Because the HSE requires it for insurance purposes only",
      "Because suspension trauma can become life-threatening within 15 to 30 minutes, so prompt rescue is critical",
      "Because it is only needed on sites over 10 metres high",
      "Because rescue equipment is expensive and must be pre-ordered"
    ],
    correctIndex: 1,
    explanation: "A person suspended in a harness after a fall can develop suspension trauma (also known as orthostatic intolerance), where blood pools in the legs and the harness straps restrict circulation. This can become life-threatening within 15 to 30 minutes. A rescue plan ensures that a prompt, practised rescue can take place before this critical window is exceeded. The plan must be in place before work starts — not written after an incident."
  }
];

const faqs = [
  {
    question: "What is the difference between fall arrest and fall restraint?",
    answer: "Fall restraint prevents the worker from reaching an edge or opening — the lanyard is short enough that they physically cannot get to the fall hazard. Fall arrest allows the worker to reach the edge but catches them if they fall, using a shock-absorbing lanyard or self-retracting lifeline. Fall restraint is preferred where practicable because it prevents the fall entirely, whereas fall arrest only limits the consequences of a fall. With fall arrest, the worker still experiences a fall and the associated forces, and a rescue plan is essential because the worker will be left suspended."
  },
  {
    question: "How often must lifting equipment and accessories be thoroughly examined under LOLER 1998?",
    answer: "Under the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER), lifting equipment used to lift persons must be thoroughly examined at least every 6 months. All other lifting equipment must be examined at least every 12 months. Lifting accessories such as slings, shackles, and chains must be examined at least every 6 months. These are maximum intervals — the risk assessment or manufacturer's recommendations may require more frequent examinations. Additionally, equipment must be examined after any exceptional circumstances such as damage, modification, or prolonged non-use."
  },
  {
    question: "Can I use a safety harness without formal training?",
    answer: "No. The Work at Height Regulations 2005 require that anyone using personal fall protection equipment must be trained and competent. This means receiving formal training in selecting the correct equipment, inspecting it before use, fitting and adjusting the harness correctly, understanding clearance distances, connecting to suitable anchor points, and knowing the rescue plan. Incorrect use of a harness can be fatal — an improperly fitted harness can cause the wearer to slip out during a fall, or an inadequate anchor point can fail. Training must be refreshed regularly and records maintained."
  },
  {
    question: "What colour coding system applies to lifting slings, and why is it important?",
    answer: "Lifting slings follow a colour coding system based on their Safe Working Load (SWL) and material type. For webbing slings: purple (1 tonne), green (2 tonnes), yellow (3 tonnes), grey (4 tonnes), red (5 tonnes), brown (6 tonnes), blue (8 tonnes), and orange (10 tonnes). This colour coding, based on BS EN 1492-1, allows quick visual identification of a sling's capacity on site without needing to read labels in poor light or at a distance. Using a sling beyond its SWL is extremely dangerous and can result in catastrophic failure. Always check the sling's label as well as the colour — damage, age, and environmental factors can reduce the actual capacity below the rated SWL."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS EN 13374, what is the minimum height for the top rail of a guard rail system?",
    options: [
      "750mm above the working platform",
      "900mm above the working platform",
      "950mm above the working platform",
      "1100mm above the working platform"
    ],
    correctAnswer: 2,
    explanation: "BS EN 13374 specifies a minimum top rail height of 950mm. The system must also include an intermediate (mid) rail and a toe board of at least 150mm height to prevent tools and materials falling from the edge. Guard rails are a collective fall prevention measure and are preferred over personal protection because they protect everyone in the area without requiring individual training or equipment."
  },
  {
    id: 2,
    question: "What is the minimum anchor point strength for a single-person fall arrest system, unless the anchor is specifically designed and tested for the purpose?",
    options: [
      "6kN",
      "10kN",
      "12kN",
      "15kN"
    ],
    correctAnswer: 2,
    explanation: "The minimum anchor point strength for a single-person fall arrest system is 12kN (approximately 1.2 tonnes), unless the anchor has been specifically designed, tested, and certified for use as a fall arrest anchor by a competent engineer. This high strength requirement accounts for the dynamic forces generated during a fall arrest — a falling person can generate peak forces of 6kN even with a shock absorber, and the 12kN requirement provides a safety factor of 2."
  },
  {
    id: 3,
    question: "A shock absorber indicator on a lanyard shows that it has been partially deployed. What action should you take?",
    options: [
      "Continue using it — partial deployment means it still has capacity remaining",
      "Reset the indicator by pushing it back in and continue working",
      "Remove the lanyard from service immediately — it has arrested a fall and must be inspected by a competent person",
      "Shorten the lanyard to compensate for the extension"
    ],
    correctAnswer: 2,
    explanation: "Any deployment of the shock absorber — whether partial or full — indicates that the equipment has arrested a fall or been subjected to significant force. The lanyard must be removed from service immediately and inspected by a competent person before any decision is made about its future use. In most cases, shock absorbers that have deployed must be replaced entirely. Never attempt to reset, repair, or continue using fall arrest equipment that shows signs of activation."
  },
  {
    id: 4,
    question: "How frequently must personal fall protection equipment (harnesses, lanyards, SRLs) undergo a thorough examination by a competent person?",
    options: [
      "Annually (every 12 months)",
      "At least every 6 months",
      "Only when visible damage is found",
      "Every 3 years"
    ],
    correctAnswer: 1,
    explanation: "Personal fall protection equipment must undergo a thorough examination by a competent person at least every 6 months. This is in addition to the pre-use visual check that must be carried out by the user before every use. The thorough examination involves a detailed inspection of all components including webbing, stitching, buckles, D-rings, connectors, and shock absorber indicators. Records of all examinations must be maintained."
  },
  {
    id: 5,
    question: "What is suspension trauma, and why does it make rescue planning critical for work involving fall arrest equipment?",
    options: [
      "It is a psychological condition caused by fear of heights that resolves after rescue",
      "It is muscle soreness from wearing a harness all day that requires physiotherapy",
      "It is a life-threatening condition where blood pools in the legs during harness suspension, potentially fatal within 15 to 30 minutes",
      "It is a minor bruising injury caused by the harness straps during a fall"
    ],
    correctAnswer: 2,
    explanation: "Suspension trauma (orthostatic intolerance) occurs when a person is suspended in a harness after a fall. The harness leg straps compress the femoral veins, blood pools in the legs, and the heart is deprived of adequate blood return. This can lead to unconsciousness and death within 15 to 30 minutes. This is why a rescue plan must be in place before work begins — the plan must enable rescue well within this critical window."
  },
  {
    id: 6,
    question: "Under LOLER 1998, a mobile crane on a construction site must have a thorough examination at what maximum interval?",
    options: [
      "Every 6 months",
      "Every 12 months",
      "Every 24 months",
      "Only before first use on a new site"
    ],
    correctAnswer: 1,
    explanation: "Under LOLER 1998, lifting equipment (including mobile cranes) must have a thorough examination at least every 12 months. However, if the equipment is used to lift persons, the interval reduces to 6 months. The examination must be carried out by a competent person, and a written report must be produced. The equipment must not be used if a defect is identified until it has been rectified."
  },
  {
    id: 7,
    question: "A banksman is giving crane signals on site. What does a clenched fist held at head height mean?",
    options: [
      "Hoist the load",
      "Lower the load",
      "Emergency stop — all operations cease",
      "Slew (rotate) to the right"
    ],
    correctAnswer: 2,
    explanation: "A clenched fist held at head height is the standard signal for emergency stop — all crane operations must cease immediately. Banksman signals follow BS 7121 and must be clearly understood by both the banksman and the crane operator before lifting operations begin. The banksman must be a trained, competent person wearing high-visibility clothing and positioned where they can see both the load and the crane operator."
  },
  {
    id: 8,
    question: "A green webbing sling is rated to lift what maximum Safe Working Load (SWL)?",
    options: [
      "1 tonne",
      "2 tonnes",
      "3 tonnes",
      "5 tonnes"
    ],
    correctAnswer: 1,
    explanation: "Under the colour coding system based on BS EN 1492-1, a green webbing sling has a Safe Working Load of 2 tonnes. The full colour code is: purple (1t), green (2t), yellow (3t), grey (4t), red (5t), brown (6t), blue (8t), orange (10t). Always verify the SWL from the sling's label — damage, wear, or environmental degradation can reduce the actual capacity. Never exceed the rated SWL, and always use the correct sling configuration for the load."
  }
];

export default function CscsCardModule3Section4() {
  useSEO({
    title: "Fall Protection & Safe Lifting | CSCS Card Module 3.4",
    description: "Guard rails, personal fall protection systems, harness selection and inspection, rescue planning, mechanical lifting under LOLER 1998, crane signals, and lifting accessories including sling colour coding.",
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
            <Link to="../cscs-card-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <Shield className="h-7 w-7 text-green-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fall Protection &amp; Safe Lifting
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Guard rails, personal fall protection, harness selection and inspection, rescue planning, mechanical lifting operations, and lifting accessories
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Collective first:</strong> Guard rails and nets before harnesses</li>
              <li><strong>Harness standard:</strong> EN 361 full body harness for fall arrest</li>
              <li><strong>Anchor strength:</strong> Minimum 12kN for fall arrest</li>
              <li><strong>LOLER 1998:</strong> Thorough examination every 6 or 12 months</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Always check:</strong> Inspect harness and lanyards before every use</li>
              <li><strong>Rescue plan:</strong> Must exist before work at height begins</li>
              <li><strong>Sling colour:</strong> Know the colour code for Safe Working Load</li>
              <li><strong>Banksman:</strong> Signals must be agreed before lifting starts</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why collective fall protection is preferred over personal protection",
              "Distinguish between fall arrest, fall restraint, and work positioning systems",
              "Describe harness selection criteria and the importance of clearance distance calculations",
              "Carry out a pre-use visual inspection of fall protection equipment",
              "Explain why rescue planning is a legal requirement and the risk of suspension trauma",
              "State the key requirements of LOLER 1998 for lifting equipment and accessories",
              "Identify sling types by colour coding and explain Safe Working Load limitations",
              "Describe the role of a banksman and the standard crane signals"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Collective Fall Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">01</span>
            Collective Fall Prevention
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Work at Height Regulations 2005</strong> require that collective fall prevention
                measures are always considered <strong>before personal protection</strong>. Collective measures
                protect everyone in the area without relying on individual action, training, or equipment &mdash;
                making them inherently more reliable than personal systems.
              </p>

              <p>
                Collective fall prevention includes <strong>guard rails, edge protection systems, safety
                decking, and catch platforms</strong>. These systems are designed to either prevent a person
                from reaching a fall hazard or to catch them close to the working level if they do fall.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Guard Rail Systems (BS EN 13374)</p>
                <p className="text-sm text-white/80 mb-3">
                  Guard rails are the most common form of collective fall prevention on construction sites.
                  Under <strong className="text-white">BS EN 13374</strong>, a compliant guard rail system must include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Top rail:</strong> Minimum 950mm above the working platform &mdash; this is the primary barrier preventing a person from falling over the edge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Intermediate (mid) rail:</strong> Positioned between the top rail and the toe board to prevent a person from falling through the gap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Toe board:</strong> Minimum 150mm height at the working platform level &mdash; prevents tools, materials, and debris from being kicked or rolling off the edge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Posts:</strong> Must be securely fixed at regular intervals and capable of withstanding the required loads without deflection</span>
                  </li>
                </ul>
              </div>

              {/* Guard Rail Specification Diagram */}
              <div className="bg-white/5 border border-green-500/30 rounded-xl p-4 sm:p-6">
                <p className="text-sm font-medium text-green-400 mb-4 text-center">Guard Rail Specification &mdash; Cross-Section</p>
                <div className="max-w-md mx-auto space-y-1">
                  {/* Top Rail */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-right text-xs text-green-400 font-mono">950mm min</div>
                    <div className="flex-1 relative">
                      <div className="h-3 bg-green-500/40 border border-green-500/60 rounded-sm" />
                      <span className="absolute left-2 top-0 text-[10px] text-white font-medium leading-3">TOP RAIL</span>
                    </div>
                  </div>
                  {/* Arrow indicating height */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-right">
                      <div className="inline-flex flex-col items-center">
                        <div className="w-px h-8 bg-green-400/40" />
                      </div>
                    </div>
                    <div className="flex-1 border-l-2 border-dashed border-white/10 h-8" />
                  </div>
                  {/* Mid Rail */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-right text-xs text-white/50 font-mono">~475mm</div>
                    <div className="flex-1 relative">
                      <div className="h-3 bg-green-500/25 border border-green-500/40 rounded-sm" />
                      <span className="absolute left-2 top-0 text-[10px] text-white/80 font-medium leading-3">MID RAIL</span>
                    </div>
                  </div>
                  {/* Arrow indicating height */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-right">
                      <div className="inline-flex flex-col items-center">
                        <div className="w-px h-8 bg-green-400/40" />
                      </div>
                    </div>
                    <div className="flex-1 border-l-2 border-dashed border-white/10 h-8" />
                  </div>
                  {/* Toe Board */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-right text-xs text-green-400 font-mono">150mm min</div>
                    <div className="flex-1 relative">
                      <div className="h-4 bg-green-500/30 border border-green-500/50 rounded-sm" />
                      <span className="absolute left-2 top-0.5 text-[10px] text-white font-medium leading-3">TOE BOARD</span>
                    </div>
                  </div>
                  {/* Platform */}
                  <div className="flex items-center gap-3">
                    <div className="w-20" />
                    <div className="flex-1 relative">
                      <div className="h-2 bg-white/20 border border-white/30 rounded-sm" />
                      <span className="absolute -bottom-4 left-2 text-[10px] text-white/50 font-medium">WORKING PLATFORM</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/40 text-center mt-8">
                  Dimensions per BS EN 13374 &mdash; all measurements are minimums
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Other Collective Measures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Edge protection systems:</strong> Temporary or permanent barriers installed at leading edges, roof perimeters, floor openings, and stairwells to prevent falls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Safety decking:</strong> Interlocking panels installed below a working area to catch falling persons or objects &mdash; commonly used in steel erection work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Catch platforms:</strong> Platforms installed below the working level (typically within 2 metres) to catch anyone who falls from the edge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Covers for openings:</strong> Secured, marked covers over floor openings, voids, and fragile surfaces to prevent falls through</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-500">Key Principle:</strong> Collective protection is
                  <strong> always preferred over personal protection</strong> because it does not depend on
                  individual behaviour, training, or equipment selection. A guard rail protects everyone
                  automatically &mdash; a harness only protects the wearer, and only if it is correctly
                  fitted, inspected, connected, and used with a suitable rescue plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Personal Fall Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">02</span>
            Personal Fall Protection
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When collective measures are not reasonably practicable, <strong>personal fall protection
                equipment (PFPE)</strong> must be provided. This includes full body harnesses, lanyards,
                shock absorbers, inertia reels (self-retracting lifelines), and suitable anchor points.
                Personal protection requires training, correct selection, proper fitting, and a rescue plan.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Equipment Standards</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Full body harness (EN 361):</strong> The only type of harness approved for fall arrest. Distributes arrest forces across the thighs, pelvis, chest, and shoulders. Must have a dorsal (back) attachment point for fall arrest.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Lanyards (EN 354):</strong> Connecting element between the harness and the anchor point. Fixed length, typically 1.5m or 2m. Must always be used with a shock absorber for fall arrest.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Shock absorbers (EN 355):</strong> Energy-absorbing element that reduces the arrest force on the body to a maximum of 6kN. Extends during deployment (typically up to 1.75m). Essential for fall arrest &mdash; without one, the sudden stop could cause fatal internal injuries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Self-retracting lifelines / inertia reels (EN 360):</strong> Automatically take up slack as the worker moves, and lock instantly in the event of a fall (like a car seatbelt). Limit the fall distance to centimetres rather than metres.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Anchor points (EN 795):</strong> The point to which the lanyard or lifeline is connected. Must be capable of withstanding at least 12kN or be specifically designed and tested for the purpose.</span>
                  </li>
                </ul>
              </div>

              {/* Fall Protection System Types Diagram */}
              <div className="bg-white/5 border border-green-500/30 rounded-xl p-4 sm:p-6">
                <p className="text-sm font-medium text-green-400 mb-4 text-center">Fall Protection System Types &mdash; Comparison</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Fall Arrest */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20 border border-red-500/40 mb-2">
                        <span className="text-red-400 text-lg font-bold">A</span>
                      </div>
                      <p className="text-red-400 font-semibold text-sm">FALL ARREST</p>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Catches the worker <strong className="text-white">after</strong> a fall</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Requires shock absorber to limit force to 6kN</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Sufficient clearance distance below is <strong className="text-white">critical</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Rescue plan is <strong className="text-white">mandatory</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Worker experiences the fall and arrest forces</span>
                      </li>
                    </ul>
                  </div>

                  {/* Fall Restraint */}
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/40 mb-2">
                        <span className="text-yellow-400 text-lg font-bold">R</span>
                      </div>
                      <p className="text-yellow-400 font-semibold text-sm">FALL RESTRAINT</p>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span><strong className="text-white">Prevents</strong> the worker from reaching the edge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>Lanyard too short to allow a fall to develop</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>No shock absorber needed (no fall occurs)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>Preferred over arrest where practicable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>Worker cannot physically reach the hazard</span>
                      </li>
                    </ul>
                  </div>

                  {/* Work Positioning */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 mb-2">
                        <span className="text-blue-400 text-lg font-bold">P</span>
                      </div>
                      <p className="text-blue-400 font-semibold text-sm">WORK POSITIONING</p>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                        <span><strong className="text-white">Supports</strong> the worker at the work location</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                        <span>Allows hands-free working (e.g., pole work, steelwork)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                        <span>Must always have a <strong className="text-white">back-up fall arrest</strong> system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                        <span>Uses side D-rings on the harness (EN 358)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                        <span>Specialist training required</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Distinction</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>Never use a sit harness or chest harness for fall arrest.</strong> Only a
                  <strong> full body harness to EN 361</strong> is approved for fall arrest. A sit harness
                  or chest-only harness can cause the wearer to be inverted during a fall arrest, leading
                  to the person slipping out of the harness or sustaining spinal injuries from the arrest forces.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Harness Selection & Use */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">03</span>
            Harness Selection &amp; Use
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Selecting the right harness for the task is critical. A harness that is the wrong type,
                poorly fitted, or connected to an inadequate anchor point provides a <strong>false sense
                of security</strong> &mdash; the worker believes they are protected when they may not be.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Choosing the Right Harness</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Fall arrest:</strong> Full body harness (EN 361) with dorsal (back) D-ring attachment point. Connect the lanyard to the dorsal D-ring only.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Fall restraint:</strong> Full body harness or belt system. The lanyard must be short enough that the worker cannot reach the fall hazard.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Work positioning:</strong> Full body harness (EN 361) with side D-rings (EN 358) for the positioning element, plus a separate fall arrest connection on the dorsal D-ring as a back-up.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Size and fit:</strong> The harness must be the correct size for the wearer. It must be adjusted so that all straps are snug but not restrictive, with no more than a fist&rsquo;s gap between the body and the straps.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Clearance Distance Calculation</p>
                <p className="text-sm text-white/80 mb-3">
                  The <strong className="text-white">clearance distance</strong> is the minimum free space
                  required below the anchor point to ensure the worker does not strike the ground or any
                  lower obstruction during a fall. Getting this calculation wrong is one of the most common
                  and most dangerous mistakes in fall arrest planning.
                </p>
                <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-4 font-mono text-sm">
                  <p className="text-green-400 mb-2">Clearance Distance =</p>
                  <div className="pl-4 space-y-1 text-white/80">
                    <p>Lanyard length <span className="text-white/40">(e.g., 2.0m)</span></p>
                    <p>+ Shock absorber extension <span className="text-white/40">(up to 1.75m)</span></p>
                    <p>+ Height below D-ring <span className="text-white/40">(approx 1.0m)</span></p>
                    <p>+ Safety margin <span className="text-white/40">(min 1.0m)</span></p>
                    <hr className="border-white/20 my-1" />
                    <p className="text-green-400 font-bold">= Total: 5.75m minimum</p>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-3">
                  If the available clearance is less than the calculated distance, a shorter lanyard or a
                  self-retracting lifeline (SRL) must be used instead. An SRL limits the fall distance to
                  centimetres, dramatically reducing the clearance distance required.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Anchor Point Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Minimum 12kN:</strong> The anchor must withstand at least 12kN (approximately 1.2 tonnes) unless it has been specifically designed, tested, and certified for the purpose by a competent engineer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Above the D-ring:</strong> The anchor should ideally be above the worker&rsquo;s dorsal D-ring to minimise the fall distance. Connecting at foot level dramatically increases the fall distance and arrest forces.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Structural steel, dedicated anchor points:</strong> Suitable anchors include certified anchor devices, structural steelwork verified by an engineer, and purpose-installed anchor bolts. Never connect to scaffolding tubes, handrails, cable trays, or services.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Number of users:</strong> Unless the anchor is specifically rated for multiple users, only one person should be connected to each anchor point.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Inspection & Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">04</span>
            Inspection &amp; Maintenance
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fall protection equipment must be <strong>inspected before every use</strong> by the wearer
                and undergo a <strong>thorough examination by a competent person at least every 6 months</strong>.
                Defective equipment must be immediately removed from service &mdash; a failed harness or
                lanyard during a fall is almost certainly fatal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Pre-Use Visual Checks (Every Use)</p>
                <p className="text-sm text-white/80 mb-3">
                  Before every use, the wearer must carry out a visual and tactile inspection of all
                  components. Look for and feel for the following:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Webbing:</strong> Cuts, fraying, abrasion, burns, chemical damage, UV degradation (fading, stiffness), pulled or broken stitching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Stitching:</strong> Loose, broken, or missing stitches &mdash; particularly at connection points and D-ring attachment areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Buckles and adjusters:</strong> Corrosion, distortion, sharp edges, difficulty in operation, incomplete closure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">D-rings and connectors:</strong> Cracks, corrosion, distortion, worn gate mechanisms, springs that do not close automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Shock absorber indicators:</strong> Check whether the indicator shows any deployment &mdash; even partial deployment means the equipment has arrested a fall and must be removed from service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Labels and markings:</strong> Ensure the CE/UKCA marking, EN standard number, serial number, and date of manufacture are all present and legible</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">6-Monthly Thorough Examination</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Who:</strong> Must be carried out by a competent person &mdash; typically the manufacturer, an approved service centre, or a qualified inspector</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">What:</strong> A detailed physical inspection of every component, including internal examination of shock absorbers and SRLs where applicable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Records:</strong> A written record or certificate must be produced for each item, noting the date, findings, and whether the item is fit for continued use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Interval:</strong> At least every 6 months, or more frequently if the manufacturer recommends it or the equipment is used in harsh conditions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">When to Retire Equipment</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Any visible damage, defect, or degradation found during pre-use check or thorough examination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Any deployment of the shock absorber (even partial)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Equipment has been subjected to a fall arrest event</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Manufacturer&rsquo;s maximum service life has been exceeded (typically 5&ndash;10 years from first use, depending on the manufacturer)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Labels or markings are missing or illegible and the equipment cannot be positively identified</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Storage Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Store in a clean, dry, well-ventilated area away from direct sunlight (UV degrades webbing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Keep away from heat sources, chemicals, sharp edges, and abrasive surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Hang harnesses on wide-shouldered hangers &mdash; do not fold, compress, or store in a pile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>If equipment becomes wet, allow it to dry naturally at room temperature &mdash; never use direct heat</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Safety Nets & Soft Landing Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">05</span>
            Safety Nets &amp; Soft Landing Systems
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Safety nets and soft landing systems are <strong>collective fall protection measures</strong>
                that catch a person who has fallen, limiting the fall distance and reducing the impact forces.
                They are widely used in structural steelwork erection, roofing, and bridge construction where
                guard rails at the working edge are not practicable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Types of Safety Nets</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Personnel safety nets (BS EN 1263-1):</strong> Designed to catch falling persons. Must be installed as close as possible to the working level &mdash; ideally within 2 metres below. The net must have sufficient clearance below it to prevent the person from striking anything during the deceleration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Debris nets:</strong> Designed to catch falling tools, materials, and debris &mdash; not persons. Used at the perimeter of buildings and scaffolds to protect people below from falling objects. Must not be confused with personnel nets.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Installation &amp; Inspection</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Trained riggers only:</strong> Safety nets must be installed, altered, and removed by persons who have received specific training in net rigging. This is specialist work &mdash; incorrect installation can render the net ineffective.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Weekly inspection:</strong> Nets must be inspected at least weekly by a competent person and after any event that could have caused damage (e.g., a person or heavy object falling into the net).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Gaps and overlaps:</strong> There must be no gaps between the net and the structure. Overlaps between net panels must be securely tied. A gap large enough for a person to fall through defeats the purpose of the net.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Clearance below:</strong> Sufficient clearance must exist below the net to allow for the deflection when it catches a falling person. The net will sag significantly under load.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Soft Landing Systems</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Airbags / soft landing bags:</strong> Inflatable bags placed below the working area to cushion a fall. Used in situations where safety nets are impracticable, such as inside roof structures during re-roofing work.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Limitations:</strong> Must be positioned correctly with no gaps. Cannot be used where there is a risk of the worker falling onto hard objects within the bag area. Maximum fall height is typically limited to 2.5m.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Inflation:</strong> Must be kept inflated throughout the working period. Check inflation pressure regularly. A deflated or under-inflated bag will not provide adequate protection.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Rescue Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">06</span>
            Rescue Planning
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 require that a <strong>rescue plan must be in place
                before any work at height begins</strong> where personal fall protection equipment is used.
                The rescue plan addresses the critical question: <em>&ldquo;If someone falls and is left
                suspended in their harness, how will we get them down safely and quickly?&rdquo;</em>
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Suspension Trauma &mdash; The 15-30 Minute Window</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  <strong>Suspension trauma</strong> (also known as orthostatic intolerance or harness-induced
                  pathology) is a <strong>life-threatening condition</strong> that occurs when a person is
                  suspended motionless in a harness after a fall. The harness leg straps compress the femoral
                  veins, blood pools in the legs, and the heart is progressively deprived of adequate blood return.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span><strong className="text-white">5&ndash;10 minutes:</strong> Symptoms begin &mdash; numbness, tingling, light-headedness, nausea</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span><strong className="text-white">15&ndash;20 minutes:</strong> Loss of consciousness is likely &mdash; the situation is now critical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span><strong className="text-white">20&ndash;30 minutes:</strong> Risk of death from renal failure or cardiac arrest &mdash; rescue must be completed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Types of Rescue</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Self-rescue:</strong> The worker is trained and equipped to rescue themselves after a fall &mdash; for example, climbing back up to the working level using a rescue device or descending using a controlled descent system. Only possible if the worker is conscious and not injured.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Assisted rescue:</strong> A co-worker uses pre-positioned rescue equipment to lower the suspended person to the ground. This requires the rescuer to be trained and the equipment to be immediately available &mdash; not stored in a distant toolbox.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Technical rescue:</strong> A specialist rescue team is called to perform the rescue using advanced techniques and equipment. This is the slowest option and should only be relied upon as a last resort &mdash; the response time may exceed the suspension trauma window.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Rescue Plan Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Written before work starts:</strong> The plan must be developed, documented, and communicated before any work at height begins &mdash; not after an incident</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Specific to the task:</strong> A generic &ldquo;call the fire brigade&rdquo; plan is not acceptable. The plan must address the specific working location, heights, anchor points, and available rescue methods.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Equipment available:</strong> All rescue equipment specified in the plan must be available at the work location before work starts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Trained rescuers:</strong> The persons nominated to carry out the rescue must have been trained and must have practised the procedure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Practice drills:</strong> Rescue procedures should be practised regularly so that the rescue team can perform effectively under pressure</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-500">CSCS Test Point:</strong> You may be asked why a rescue
                  plan is required or what suspension trauma is. Remember: suspension trauma can become
                  life-threatening within <strong>15 to 30 minutes</strong>. This is why relying solely on
                  the emergency services for rescue is not acceptable &mdash; their response time may
                  exceed this critical window. The rescue plan must enable rescue to be carried out
                  <strong> within minutes, not hours</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Mechanical Lifting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">07</span>
            Mechanical Lifting
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mechanical lifting operations on construction sites are governed by the
                <strong> Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)</strong> and the
                <strong> Provision and Use of Work Equipment Regulations 1998 (PUWER)</strong>. Every lifting
                operation must be properly planned, appropriately supervised, and carried out in a safe manner.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">LOLER 1998 &mdash; Key Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Lifting plan:</strong> Every lifting operation must be planned by a competent person. The plan must identify the load weight, the lifting equipment to be used, the lift path, the ground conditions, exclusion zones, and communication methods.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Competent supervision:</strong> The lifting operation must be supervised by a competent person &mdash; typically the crane supervisor or appointed person for the lift.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Safe Working Load (SWL):</strong> The load must not exceed the Safe Working Load of the lifting equipment or any of the lifting accessories used. The SWL varies depending on the radius, angle, and configuration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Marking:</strong> All lifting equipment must be clearly marked with its SWL. If the SWL depends on the configuration, a table or chart must be provided.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Thorough Examination Schedules</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-400 mb-1">Every 6 Months</p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Equipment used to lift <strong className="text-white">persons</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>All <strong className="text-white">lifting accessories</strong> (slings, shackles, chains)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Every 12 Months</p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>All other <strong className="text-white">lifting equipment</strong> (cranes, hoists, lifts)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-3">
                  These are maximum intervals. The risk assessment, scheme of examination, or manufacturer&rsquo;s
                  recommendations may require more frequent examinations. Equipment must also be examined after
                  exceptional circumstances (damage, modification, prolonged non-use).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Crane Signals (Banksman)</p>
                <p className="text-sm text-white/80 mb-3">
                  A <strong className="text-white">banksman</strong> (slinger/signaller) is the person who
                  directs the crane operator using standard hand signals. The banksman must be trained,
                  competent, and clearly visible to the crane operator. Signals follow <strong className="text-white">BS 7121</strong>.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Hoist (raise):</strong> Right arm raised, palm forward, making small circular motions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Lower:</strong> Right arm extended downward, palm inward, making small circular motions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Slew (rotate) left:</strong> Left arm extended horizontally, right arm makes sweeping motion in direction of travel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Slew (rotate) right:</strong> Right arm extended horizontally, left arm makes sweeping motion in direction of travel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Emergency stop:</strong> Both arms extended, palms down, moving arms back and forth horizontally &mdash; or clenched fist held at head height. ALL operations cease immediately.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Pre-Use Checks for Lifting Equipment</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Check that the thorough examination is in date (valid certificate available)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Verify the SWL is adequate for the intended load</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Visual inspection for damage, corrosion, distortion, or wear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Check safety devices are functioning (limit switches, overload protection)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Ensure the ground conditions can support the equipment and load</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Never Stand Under a Suspended Load</p>
                </div>
                <p className="text-sm text-white/80">
                  One of the most fundamental rules on any construction site: <strong>never stand, walk,
                  or work under a suspended load</strong>. If a sling fails, a connection slips, or the
                  crane malfunctions, the load will fall directly downward. The exclusion zone below a
                  lifting operation must be maintained at all times, and the banksman is responsible for
                  ensuring no one enters it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Lifting Accessories & Slings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-500/80 text-sm font-normal">08</span>
            Lifting Accessories &amp; Slings
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Lifting accessories (also called lifting tackle) include <strong>slings, shackles, eyebolts,
                swivels, and hooks</strong> &mdash; the components that connect the load to the crane hook.
                Selecting the correct accessory, understanding its Safe Working Load, and inspecting it before
                use are all essential to prevent catastrophic failure during a lift.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Types of Slings</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Chain slings:</strong> Highly durable, resistant to heat, abrasion, and chemical exposure. Ideal for heavy loads and harsh environments. Must be inspected for stretched, worn, or damaged links. Grade 80 or Grade 100 chains are standard for lifting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Wire rope slings:</strong> Flexible and strong. Used for general lifting where chain slings are too rigid. Must be inspected for broken wires (bird-caging), kinks, corrosion, and crushed sections. The number of broken wires in a given length determines whether the sling must be retired.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Webbing slings (BS EN 1492-1):</strong> Lightweight, soft, and will not scratch or damage the load surface. Commonly used for general construction lifting. Colour coded by SWL. Vulnerable to cuts, abrasion, UV degradation, and chemical damage.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Round slings (BS EN 1492-2):</strong> Endless loop construction with a soft outer sleeve protecting the internal load-bearing fibres. Very flexible, will not mark the load. Colour coded by SWL (same system as webbing slings).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Webbing Sling Colour Coding (BS EN 1492-1)</p>
                <p className="text-sm text-white/80 mb-3">
                  Webbing and round slings are colour coded to allow quick identification of their Safe Working
                  Load on site. This is based on the straight pull (choke/basket configurations reduce the SWL):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-2 text-center">
                    <div className="w-6 h-3 bg-purple-500 rounded mx-auto mb-1" />
                    <p className="text-xs text-purple-300 font-semibold">Purple</p>
                    <p className="text-sm text-white font-bold">1 tonne</p>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-2 text-center">
                    <div className="w-6 h-3 bg-green-500 rounded mx-auto mb-1" />
                    <p className="text-xs text-green-300 font-semibold">Green</p>
                    <p className="text-sm text-white font-bold">2 tonnes</p>
                  </div>
                  <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-2 text-center">
                    <div className="w-6 h-3 bg-yellow-500 rounded mx-auto mb-1" />
                    <p className="text-xs text-yellow-300 font-semibold">Yellow</p>
                    <p className="text-sm text-white font-bold">3 tonnes</p>
                  </div>
                  <div className="bg-gray-500/20 border border-gray-500/40 rounded-lg p-2 text-center">
                    <div className="w-6 h-3 bg-gray-400 rounded mx-auto mb-1" />
                    <p className="text-xs text-gray-300 font-semibold">Grey</p>
                    <p className="text-sm text-white font-bold">4 tonnes</p>
                  </div>
                  <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-2 text-center">
                    <div className="w-6 h-3 bg-red-500 rounded mx-auto mb-1" />
                    <p className="text-xs text-red-300 font-semibold">Red</p>
                    <p className="text-sm text-white font-bold">5 tonnes</p>
                  </div>
                  <div className="bg-amber-800/30 border border-amber-700/40 rounded-lg p-2 text-center">
                    <div className="w-6 h-3 bg-amber-700 rounded mx-auto mb-1" />
                    <p className="text-xs text-amber-400 font-semibold">Brown</p>
                    <p className="text-sm text-white font-bold">6 tonnes</p>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-2 text-center">
                    <div className="w-6 h-3 bg-blue-500 rounded mx-auto mb-1" />
                    <p className="text-xs text-blue-300 font-semibold">Blue</p>
                    <p className="text-sm text-white font-bold">8 tonnes</p>
                  </div>
                  <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg p-2 text-center">
                    <div className="w-6 h-3 bg-orange-500 rounded mx-auto mb-1" />
                    <p className="text-xs text-orange-300 font-semibold">Orange</p>
                    <p className="text-sm text-white font-bold">10 tonnes</p>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-3 text-center">
                  Colour codes per BS EN 1492-1 (webbing) and BS EN 1492-2 (round slings) &mdash; straight pull SWL shown
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Sling Selection &amp; Safe Working Load</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Know the load weight:</strong> The weight of the load must be known or accurately estimated before selecting slings. If the weight is unknown, it must be determined &mdash; never guess.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Sling angle effect:</strong> As the angle between the sling legs decreases (legs spread wider), the load on each leg increases dramatically. At a 60&deg; included angle, each leg carries approximately 58% of the load. At a 120&deg; included angle, each leg carries 100% of the load. Never use slings at an included angle greater than 120&deg;.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Choke hitch reduces SWL:</strong> Using a sling in a choke hitch configuration typically reduces its SWL to 80% of the straight pull rating.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Edge protection:</strong> If the sling passes over a sharp edge, edge protectors must be used to prevent cutting or abrasion damage to the sling.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Sling Inspection &amp; Damage Indicators</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Webbing slings:</strong> Cuts, tears, abrasion, chemical burns, UV fading, pulled stitching, damaged or illegible labels, knots (which reduce capacity by up to 50%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Chain slings:</strong> Stretched links (elongation exceeding 5%), worn links (reduction in cross-section exceeding 10%), nicks, gouges, cracks, distorted or twisted links, corrosion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Wire rope slings:</strong> Broken wires (bird-caging), kinks, crushing, corrosion, reduction in diameter, distortion, heat damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Round slings:</strong> Damage to the outer sleeve exposing the internal fibres, cuts, abrasion, chemical damage, distortion of the body</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Proper Storage of Lifting Accessories</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Store in a clean, dry, covered area &mdash; never left on the ground exposed to moisture and contamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Hang slings on purpose-made racks or pegs &mdash; coiling or kinking wire rope slings causes permanent damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Keep webbing and round slings away from UV light, heat sources, chemicals (particularly acids and alkalis), and sharp edges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Lubricate chain slings as per manufacturer&rsquo;s instructions to prevent corrosion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Segregate defective items immediately &mdash; tag with &ldquo;DO NOT USE&rdquo; and quarantine until inspected or disposed of</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-500">CSCS Test Point:</strong> You are very likely to be
                  asked about sling colour coding in the CSCS HS&amp;E test. The most commonly tested colours
                  are: <strong>purple (1t), green (2t), yellow (3t), red (5t), and blue (8t)</strong>.
                  Remember that the SWL shown on the sling is for the straight pull configuration &mdash;
                  choke and basket hitches have different (usually lower) capacities, and the included
                  angle between sling legs must never exceed 120&deg;.
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
        <Quiz
          title="Section 4 Knowledge Check"
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
            <Link to="../cscs-card-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              &larr; Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-4">
              Next: Module 4 &rarr;
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}