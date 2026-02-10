import {
  ArrowLeft,
  Cable,
  CheckCircle,
  AlertTriangle,
  Weight,
  Wrench,
  Package,
  Zap,
  Box,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-m4s1-cable-drum",
    question:
      "A 100-metre drum of 6mm twin and earth cable weighs approximately 45 kg. What is the correct manual handling approach?",
    options: [
      "One person should lift it using a deep squat technique",
      "Two people should carry it by gripping the cable ends",
      "Roll the drum along the ground using controlled pushing, never lift it solo",
      "Drag the drum by the cable tail to the installation point",
    ],
    correctIndex: 2,
    explanation:
      "A 45 kg cable drum exceeds the recommended single-person lift limit of 25 kg. Rolling is the safest manual technique for cable drums on flat ground. You should never lift a drum alone at this weight, never grip by the cable itself, and never drag by the cable tail as this damages both the cable and risks back injury from an uncontrolled load.",
  },
  {
    id: "mh-m4s1-db-mounting",
    question:
      "When wall-mounting a distribution board at height, what is the primary manual handling risk?",
    options: [
      "The weight of the screws used for fixing",
      "Holding a static load at arm's length and above shoulder height while fixing",
      "The risk of electric shock from the board",
      "The colour of the board making it hard to see",
    ],
    correctIndex: 1,
    explanation:
      "Holding a distribution board (typically 5-15 kg) at arm's length and above shoulder height creates extreme loading on the shoulders, arms, and lower back. The static hold while simultaneously trying to fix the board in position is a high-risk posture. The solution is to use a temporary support bracket or have a second person hold the board whilst the first person makes the fixings.",
  },
  {
    id: "mh-m4s1-tool-bags",
    question:
      "Why is the cumulative weight of tool bags a significant manual handling concern for electricians?",
    options: [
      "Because tool bags are always bright yellow and attract attention",
      "Because carrying heavy tool bags repeatedly throughout the day causes cumulative spinal loading and fatigue",
      "Because tool bags are waterproof and therefore slippery",
      "Because regulations ban all tool bags over 5 kg",
    ],
    correctIndex: 1,
    explanation:
      "An electrician's tool bag typically weighs 10-20 kg. Carrying this repeatedly up stairs, across sites, and in and out of vehicles throughout the day creates cumulative loading on the spine and shoulders. Over time this leads to chronic musculoskeletal problems. The control measures include using wheeled tool cases, splitting loads into smaller bags, and only carrying tools needed for the immediate task.",
  },
];

const faqs = [
  {
    question:
      "Should I refuse to handle a cable drum that weighs more than 25 kg on my own?",
    answer:
      "Yes. The HSE guideline figure of 25 kg is the maximum recommended load for a single person lifting under ideal conditions (load close to the body, between knuckle and elbow height, torso not twisted). Cable drums are awkward, bulky loads that cannot be held close to the body, so in practice the safe solo weight is much lower. For drums over 25 kg, use a drum jack, drum roller, or get a colleague to assist with rolling. You have the right to refuse an unsafe manual handling task under the Manual Handling Operations Regulations 1992.",
  },
  {
    question:
      "What is the best way to carry long lengths of cable tray through a building?",
    answer:
      "Cable tray lengths (typically 3 metres) should be carried by two people, one at each end, communicating clearly about direction changes. When passing through doorways, stop and plan the manoeuvre — do not try to pivot a 3-metre length through a standard door opening without pausing. Consider whether the tray can be cut to shorter lengths before carrying. Use a shoulder carry for long straight corridors, distributing the weight along the forearm and shoulder rather than gripping with the hands alone. Always check the route for overhead obstructions and other workers before setting off.",
  },
  {
    question:
      "Are capstan winches mandatory for cable pulling, or can we pull by hand?",
    answer:
      "Capstan winches are not legally mandatory for every cable pull, but the Manual Handling Operations Regulations require employers to avoid manual handling where reasonably practicable. For short runs of lightweight cable in straight conduit, hand pulling may be acceptable if the force required is low and the task is brief. For long runs, heavy cables, or pulls with multiple bends, a capstan winch or cable puller should always be used. The key test is whether the pulling force and repetition create a risk of musculoskeletal injury — if so, mechanical assistance is required.",
  },
  {
    question:
      "How should I handle heavy transformers that need to be positioned in plant rooms?",
    answer:
      "Transformers can weigh from 50 kg to several tonnes and must never be manually lifted. Small transformers (50-100 kg) should be moved using a sack truck, pallet truck, or trolley on firm, level ground. Larger transformers require crane or forklift positioning, with a detailed lift plan. In plant rooms with restricted access, a combination of skates (roller platforms), jacks, and pull-along equipment may be needed. Always check floor loading capacity before moving heavy transformers, and ensure the route is clear, level, and wide enough for the equipment being used.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the approximate weight range of a 100-metre drum of 10mm twin and earth cable?",
    options: [
      "10-15 kg",
      "25-35 kg",
      "55-75 kg",
      "120-150 kg",
    ],
    correctAnswer: 2,
    explanation:
      "A 100-metre drum of 10mm twin and earth cable typically weighs between 55 and 75 kg depending on the manufacturer and drum type. This significantly exceeds the 25 kg single-person guideline and requires either mechanical handling or a minimum of two people using a controlled rolling technique.",
  },
  {
    id: 2,
    question:
      "When using drum jacks to elevate a cable drum for paying out cable, what must you check first?",
    options: [
      "That the drum is the correct colour for the circuit",
      "That the drum jacks are rated for the weight of the drum and that the ground is firm and level",
      "That the cable has been tested for continuity",
      "That the drum has a label showing the manufacturer's logo",
    ],
    correctAnswer: 1,
    explanation:
      "Drum jacks must be rated for the weight of the loaded drum. If the jacks are underrated, they can collapse under load, causing the drum to fall. The ground must be firm and level so the jacks do not sink or tilt. Always check the safe working load (SWL) marked on the jack and compare it with the drum weight before use.",
  },
  {
    id: 3,
    question:
      "Why should you never lift a cable drum by gripping the cable itself?",
    options: [
      "Because the cable is always too short to provide a good grip",
      "Because the cable can unravel, slip, or snap under the load, and gripping cable creates a cutting/crush hazard to the hands",
      "Because cable is an electrical conductor and may be live",
      "Because regulations require all cables to be lifted by forklift",
    ],
    correctAnswer: 1,
    explanation:
      "Gripping cable to lift a drum is dangerous for multiple reasons: the cable can unravel or slip through the hands under load, the weight of the drum can cause the cable to cut into the skin or crush fingers, and the sudden release of a slipped grip causes the drum to fall unpredictably. Always use the drum's spindle hole with a bar, or use drum jacks and stands.",
  },
  {
    id: 4,
    question:
      "What is the recommended approach for mounting a distribution board at chest height or above?",
    options: [
      "Hold the board in one hand and fix with the other",
      "Use a temporary support bracket or a second person to hold the board whilst making fixings",
      "Rest the board on your head to free both hands",
      "Glue the board to the wall first, then add fixings later",
    ],
    correctAnswer: 1,
    explanation:
      "Holding a distribution board (typically 5-15 kg) at arm's length while simultaneously trying to drill and fix creates extreme static loading on the shoulders and back. A temporary support bracket screwed to the wall below the board position, or a second person holding the board, eliminates the static hold and allows the fixer to work with both hands safely.",
  },
  {
    id: 5,
    question:
      "When pulling cable through conduit, what is the purpose of cable lubricant?",
    options: [
      "To make the cable look shiny and professional",
      "To reduce the pulling force required, thereby reducing manual handling risk",
      "To waterproof the cable after installation",
      "To colour-code different circuits",
    ],
    correctAnswer: 1,
    explanation:
      "Cable lubricant (pulling compound) reduces friction between the cable sheath and the conduit wall. This directly reduces the pulling force required, which in turn reduces the manual handling risk to the person pulling the cable. On long runs or runs with multiple bends, the difference can be substantial — from an unsafe manual pull to a manageable one.",
  },
  {
    id: 6,
    question:
      "What is the main risk when carrying cable tray lengths through doorways?",
    options: [
      "The tray may be the wrong size for the installation",
      "The long, rigid load can strike door frames, walls, or other workers during turning manoeuvres",
      "Doorways are always locked on construction sites",
      "Cable tray is magnetic and attracts metal door handles",
    ],
    correctAnswer: 1,
    explanation:
      "Cable tray is typically supplied in 3-metre lengths. Manoeuvring a 3-metre rigid load through a standard 800 mm doorway requires careful planning and coordination. The leading end can strike the door frame or a person on the other side. The trailing end swings outward during the turn, creating a sweep hazard. Two-person carrying with clear communication and a planned stop before each doorway is essential.",
  },
  {
    id: 7,
    question:
      "How heavy can a fully loaded electrician's tool bag typically weigh?",
    options: [
      "1-3 kg",
      "5-8 kg",
      "10-20 kg",
      "40-50 kg",
    ],
    correctAnswer: 2,
    explanation:
      "A fully loaded electrician's tool bag commonly weighs between 10 and 20 kg, depending on the tools carried. This includes hand tools, a multimeter, cable cutters, crimping tools, fixings, and consumables. Carrying this weight repeatedly throughout the day is a cumulative manual handling risk. Best practice is to carry only the tools needed for the immediate task and use a wheeled case for site-to-vehicle transport.",
  },
  {
    id: 8,
    question:
      "What mechanical aid is specifically designed for paying cable off a drum in a controlled manner?",
    options: [
      "A spirit level",
      "A cable drum jack and stand (or a cable drum rotator)",
      "A pipe bender",
      "An SDS drill",
    ],
    correctAnswer: 1,
    explanation:
      "Cable drum jacks and stands (also called drum rotators or drum dispensers) are specifically designed to lift the drum off the ground on a spindle bar, allowing it to rotate freely. This lets cable be paid out smoothly and in a controlled manner without the drum rolling away. The person pulling the cable can maintain a steady, low-force pull rather than fighting a drum that jams and lurches.",
  },
];

export default function ManualHandlingModule4Section1() {
  useSEO({
    title: "Electrical Materials & Cable Drums | Manual Handling Module 4.1",
    description:
      "Handling cable drums, cable trays, distribution boards, transformers, switchgear, tool bags, and cable pulling techniques for electricians.",
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
            <Link to="../manual-handling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Cable className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Materials &amp; Cable Drums
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Safe handling of cable drums, cable trays, distribution boards,
            transformers, switchgear, tool bags, and cable pulling operations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Cable drums:</strong> 20 kg to 500 kg+ &mdash; roll,
                  never solo-lift
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Long loads:</strong> cable tray needs two-person team
                  carry
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Transformers:</strong> always use mechanical aids
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Before:</strong> check weights, plan route, gather
                  aids
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>During:</strong> use drum jacks, team lifts, capstan
                  winches
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>After:</strong> secure drums, tidy cable offcuts,
                  store safely
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Identify the weight ranges of common electrical materials and components",
              "Explain safe rolling and positioning techniques for cable drums",
              "Describe the correct use of drum jacks, stands, and rotators",
              "Apply team handling methods for long and awkward loads such as cable tray",
              "Recognise the risks of static loading when wall-mounting boards at height",
              "Select appropriate mechanical aids for cable pulling operations",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Cable Drums */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            Cable Drums
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cable drums are one of the most commonly handled heavy items on
                an electrical installation. They range from small drums of data
                cable weighing around <strong>20 kg</strong> to large drums of
                armoured power cable that can exceed <strong>500 kg</strong>.
                The weight depends on the cable type, cross-sectional area, and
                the length on the drum. Even &ldquo;small&rdquo; drums of
                domestic twin and earth cable can weigh 40&ndash;70 kg for a
                100-metre length in 6 mm&sup2; or 10 mm&sup2; sizes.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong> The
                  single most important rule with cable drums is{" "}
                  <strong>never attempt to lift a loaded drum manually</strong>.
                  Even drums that appear manageable are deceptively heavy because
                  the weight is concentrated and the shape makes it impossible to
                  hold the load close to the body. Rolling, drum jacks, and
                  mechanical lifting are the safe options.
                </p>
              </div>

              <p>
                <strong>Manual vs mechanical handling thresholds:</strong> For
                drums under approximately 25 kg (typically small data cable or
                short lengths of flex), a single person may be able to lift and
                position the drum onto a stand. For anything above 25 kg, the
                drum should be rolled into position on the ground, or lifted
                onto a stand using a drum jack or two-person team lift. For
                drums above 50 kg, mechanical handling (forklift, pallet truck,
                or crane) should be used for any vertical lifting.
              </p>

              <p>
                <strong>Drum jacks and stands:</strong> A drum jack is a
                purpose-built frame that supports a horizontal bar (spindle)
                through the centre of the drum. The drum sits on the bar and can
                rotate freely, allowing cable to be paid off in a smooth,
                controlled manner. Before using a drum jack, you must check
                that the jack is rated for the weight of the loaded drum, that
                the spindle bar is the correct diameter for the drum&rsquo;s
                centre hole, and that the ground beneath the jack is firm, level,
                and stable.
              </p>

              <p>
                <strong>Rolling techniques:</strong> When rolling a cable drum
                along the ground, push rather than pull wherever possible. Keep
                your hands on the drum flanges (the flat circular sides), not on
                the cable. Roll on firm, level ground only &mdash; rolling on
                soft ground, gravel, or slopes requires additional control
                measures such as chocks, ropes, or a second person. On a slope,
                always position yourself uphill of the drum so it cannot roll
                towards you. Use chocks (wedges) to prevent the drum rolling
                when it is stationary.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  <strong>Never lift a cable drum by gripping the cable.</strong>{" "}
                  The cable can unravel, slip through your hands, or snap under
                  load. Gripping cable under tension creates a severe cutting
                  and crush hazard to the hands and fingers. If the cable slips,
                  the drum drops unpredictably. Always use the drum&rsquo;s
                  spindle hole with a proper bar, or use the drum flanges for
                  rolling only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Cable Trays and Trunking */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Cable Trays &amp; Trunking
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cable tray and trunking are supplied in standard lengths of{" "}
                <strong>3 metres</strong>. While individual lengths are not
                excessively heavy (typically 3&ndash;12 kg depending on width
                and material), their <strong>length and rigidity</strong> make
                them awkward to handle. The primary risks are striking other
                workers, hitting door frames and walls during manoeuvring, and
                the leverage effect of a 3-metre length being held at one end.
              </p>

              <p>
                <strong>Team handling:</strong> Two people should carry each
                length, one at each end. This distributes the weight, controls
                the direction of travel, and allows the leading person to check
                for obstructions ahead. Communicate clearly and continuously
                &mdash; the person at the rear cannot see what is ahead.
              </p>

              <p>
                <strong>Carrying through doorways:</strong> A 3-metre length
                cannot pass straight through a standard 800 mm door opening
                without angling. Stop before the doorway, plan the pivot, and
                ensure nobody is on the other side. The trailing end swings
                outward during the turn, creating a sweep zone that can strike
                bystanders. One person should go through first, then guide the
                load through with the second person feeding it from behind.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Cable Tray Handling Best Practice
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Consider cutting to shorter lengths before carrying if the
                      route is complex
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use a shoulder carry for long straight corridors to
                      distribute weight along the forearm
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Wear gloves &mdash; cut edges on metal tray are sharp
                      enough to cause lacerations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Check overhead clearance &mdash; the leading end can catch
                      on ceiling fixtures, sprinkler heads, or low beams
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Stack tray neatly at the work area &mdash; loose lengths
                      leaning against walls are a trip and fall hazard
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Distribution Boards and Consumer Units */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Distribution Boards &amp; Consumer Units
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Distribution boards and consumer units range from small domestic
                units weighing <strong>2&ndash;5 kg</strong> to large
                three-phase distribution boards weighing{" "}
                <strong>15&ndash;40 kg</strong> or more when populated with
                MCBs, RCBOs, and busbars. The weight itself may not be extreme,
                but the <strong>installation posture</strong> creates the
                primary manual handling risk.
              </p>

              <p>
                Wall mounting a distribution board typically requires holding
                the board in position at chest height or above while
                simultaneously marking, drilling, and fixing. This creates a{" "}
                <strong>static hold at arm&rsquo;s length</strong> &mdash; one
                of the most demanding manual handling postures. Holding even
                5 kg at arm&rsquo;s length generates forces equivalent to
                15&ndash;20 kg at the shoulder joint due to the lever effect.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong> Use a
                  temporary support bracket. Screw a short length of timber or
                  metal angle to the wall at the bottom edge of the planned board
                  position. Rest the board on this bracket while making the
                  fixings. Alternatively, have a second person hold the board in
                  position while the first person drills and fixes. Never attempt
                  to hold a board with one hand and drill with the other.
                </p>
              </div>

              <p>
                For large three-phase boards, the weight may require the board
                to be lifted into position using a small hoist, a scaffold lift,
                or a purpose-made mounting rig. Plan the mounting method before
                the board arrives on site &mdash; discovering that a 35 kg
                board needs to be mounted at 1.8 metres with no plan for
                getting it there safely is a foreseeable failure.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Transformers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Transformers
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Transformers are among the heaviest items an electrician will
                encounter. Even a small single-phase site transformer (110V)
                typically weighs <strong>25&ndash;50 kg</strong>. Three-phase
                distribution transformers range from{" "}
                <strong>200 kg to several tonnes</strong>. Oil-filled
                transformers are particularly heavy due to the combined weight
                of the copper windings, iron core, and insulating oil.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Rule
                  </p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  <strong>Always use mechanical aids for transformers.</strong>{" "}
                  No transformer should be manually lifted by a person or team.
                  Even small site transformers should be moved using a sack
                  truck, trolley, or pallet truck. Larger transformers require
                  cranes, forklifts, or specialist rigging equipment with a
                  detailed lift plan prepared by a competent person.
                </p>
              </div>

              <p>
                When positioning transformers in plant rooms, check the floor
                loading capacity, ensure the route is clear and wide enough for
                the transport equipment, and verify that any ramps or thresholds
                can support the combined weight of the transformer and the
                handling equipment. For oil-filled transformers, also consider
                spill containment &mdash; a bund tray must be in position before
                the transformer is placed.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Switchgear and Panels */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Switchgear &amp; Panels
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical switchgear panels, motor control centres (MCCs), and
                main switch panels are large, heavy items that are typically
                delivered to site as assembled units. A standard floor-standing
                switchboard panel can weigh from{" "}
                <strong>100 kg to over 500 kg</strong> depending on its size
                and the equipment fitted within it. These items are{" "}
                <strong>never</strong> suitable for manual handling.
              </p>

              <p>
                Switchgear is typically moved using a combination of forklifts,
                pallet trucks, skates (roller platforms), and jacks. The
                delivery plan should include the route from the delivery vehicle
                to the final position, including any doorways, corridors, ramps,
                or lifts the panel must pass through. Verify that all openings
                are wide enough and that floor loading is adequate along the
                entire route.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Switchgear Positioning Checklist
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Confirm weight from manufacturer&rsquo;s data sheet before
                      delivery
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Survey the route from delivery point to final position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Check floor loading capacity at the final position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Arrange mechanical handling equipment rated for the load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Ensure the panel is secured and cannot topple once
                      positioned
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Tools and Test Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Tools &amp; Test Equipment
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>cumulative weight of tool bags</strong> is one of
                the most overlooked manual handling risks for electricians. A
                fully loaded tool bag commonly weighs between{" "}
                <strong>10 and 20 kg</strong>. Carrying this repeatedly
                &mdash; from the van to the work area, up and down stairs,
                across construction sites, and back again &mdash; creates
                significant cumulative spinal loading over the course of a day,
                a week, and a career.
              </p>

              <p>
                In addition to the main tool bag, electricians frequently carry
                a test instrument case (multifunction tester: approximately
                3&ndash;5 kg), a drill case (approximately 3&ndash;6 kg), and
                consumables such as fixings, cable ties, and tape. The combined
                weight of all items carried in a single trip can easily exceed
                30 kg &mdash; well above the safe single-person limit.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong> Only
                  carry the tools you need for the immediate task. Leave the
                  rest in the vehicle or in a secure storage point on site. Use
                  a wheeled tool case or trolley for van-to-site transport. A
                  tool belt distributes weight across the hips rather than
                  loading one shoulder, but should be limited to lightweight
                  items (screwdrivers, pliers, tape) rather than heavy tools.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Reducing Tool Bag Weight
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Audit your tool bag regularly &mdash; remove tools you
                      rarely use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Split into task-specific kits (first fix kit, second fix
                      kit, testing kit)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use two smaller bags rather than one heavy bag to balance
                      the load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use a rucksack-style tool bag to distribute weight across
                      both shoulders
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Cable Pulling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            Cable Pulling
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cable pulling &mdash; drawing cable through conduit, trunking,
                or underground ducts &mdash; is one of the most physically
                demanding manual handling tasks in electrical installation. The
                pulling force depends on the cable weight, the length of the
                run, the number of bends, and the friction between the cable
                sheath and the containment.
              </p>

              <p>
                <strong>Capstan winches:</strong> A capstan winch is a motorised
                drum that pulls a rope attached to the cable via a pulling eye
                or pulling grip. Capstan winches should be used for any pull
                where the required force exceeds what a person can safely and
                sustainably exert. As a practical guide, if the cable cannot be
                pulled with one hand using a smooth, steady motion, a capstan
                winch should be used.
              </p>

              <p>
                <strong>Cable lubricant:</strong> Applying cable-pulling
                lubricant (pulling compound) to the cable before and during the
                pull reduces friction between the cable sheath and the conduit
                or duct wall. This can reduce the pulling force by{" "}
                <strong>40&ndash;60%</strong> on long runs with bends. Lubricant
                is cheap, readily available, and one of the simplest controls
                for reducing manual handling risk during cable pulling.
              </p>

              <p>
                <strong>Pulling eyes and grips:</strong> A pulling eye is a
                fitting attached to the end of the cable that allows a pulling
                rope to be connected securely. Never pull cable by gripping the
                conductor or sheath directly &mdash; this damages the cable
                insulation and creates a grip-failure hazard where the cable
                can suddenly slip from the hands under tension.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Cable Pulling Safety Points
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Calculate the expected pulling force before starting
                      &mdash; cable manufacturers provide friction coefficients
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Position the drum on jacks at the feed end so cable pays
                      off smoothly without snagging
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use intermediate rollers at bends and edges to guide the
                      cable and reduce friction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Communicate between the pulling end and the feeding end
                      &mdash; use radios on long runs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Never stand in the line of a taut pulling rope &mdash; if
                      it snaps, it whips back with severe force
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Common Electrical Material Weights */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Reference: Common Electrical Material Weights
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following table provides typical weight ranges for common
                electrical materials. Use this as a planning reference when
                assessing manual handling requirements for upcoming tasks.
              </p>

              {/* Styled-div diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <Package className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                      Common Electrical Material Weights
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Cable Drums */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Cable className="h-5 w-5 text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">
                        Cable Drums
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Data cable (100 m): <strong>8&ndash;15 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          2.5 mm&sup2; T&amp;E (100 m):{" "}
                          <strong>25&ndash;35 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          6 mm&sup2; T&amp;E (100 m):{" "}
                          <strong>40&ndash;55 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          10 mm&sup2; T&amp;E (100 m):{" "}
                          <strong>55&ndash;75 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          4-core SWA 25 mm&sup2; (100 m):{" "}
                          <strong>180&ndash;250 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Large armoured power cable:{" "}
                          <strong>300&ndash;500+ kg</strong>
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Containment */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Box className="h-5 w-5 text-blue-400" />
                      <p className="text-sm font-semibold text-blue-400">
                        Containment (per 3 m length)
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Mini trunking: <strong>0.3&ndash;0.8 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          150 mm trunking: <strong>3&ndash;6 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          300 mm cable tray (steel):{" "}
                          <strong>5&ndash;9 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          450 mm cable tray (steel):{" "}
                          <strong>7&ndash;12 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Cable ladder (steel): <strong>8&ndash;15 kg</strong>
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Distribution & Switchgear */}
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-purple-400" />
                      <p className="text-sm font-semibold text-purple-400">
                        Boards &amp; Switchgear
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Domestic consumer unit: <strong>2&ndash;5 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          3-phase DB (populated):{" "}
                          <strong>15&ndash;40 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Floor-standing panel:{" "}
                          <strong>100&ndash;500+ kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Motor control centre: <strong>200&ndash;800+ kg</strong>
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Transformers & Tools */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="h-5 w-5 text-amber-400" />
                      <p className="text-sm font-semibold text-amber-400">
                        Transformers &amp; Tools
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          110 V site transformer: <strong>25&ndash;50 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          3-phase distribution TX:{" "}
                          <strong>200&ndash;2,000+ kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Full tool bag: <strong>10&ndash;20 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          MFT instrument case: <strong>3&ndash;5 kg</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          SDS drill in case: <strong>4&ndash;7 kg</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-xs text-white/60 leading-relaxed">
                    <strong className="text-emerald-400">Note:</strong> Weights
                    shown are approximate and vary by manufacturer. Always check
                    the actual weight on the packaging or manufacturer&rsquo;s
                    data sheet before planning a handling operation. If in doubt,
                    treat the item as heavier than expected and use mechanical
                    aids.
                  </p>
                </div>
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
            <Link to="../manual-handling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-[#1a1a1a] hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-4-section-2">
              Next: Construction Environments
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
