import {
  ArrowLeft,
  DoorOpen,
  CheckCircle,
  AlertTriangle,
  Home,
  ArrowUpDown,
  Eye,
  Wrench,
  Users,
  ShieldAlert,
  Ruler,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-m4s3-loft-work",
    question:
      "When working in a loft space with restricted headroom, what is the primary manual handling risk?",
    options: [
      "The temperature is always comfortable in loft spaces",
      "Inability to stand upright forces kneeling, crawling, and crouching postures that severely limit lifting capacity and increase spinal loading",
      "Loft spaces have strong floors that make handling easier",
      "Loft hatches are always large enough for any load",
    ],
    correctIndex: 1,
    explanation:
      "Restricted headroom in loft spaces forces workers into kneeling, crouching, or crawling positions. In these postures, the spine cannot maintain its natural alignment, and the muscles are in a mechanically disadvantaged position. Lifting capacity is drastically reduced — a person who can safely lift 25 kg while standing may only be able to safely manage 5-10 kg while kneeling. The risk of back injury is significantly higher because the spinal discs are under greater pressure in flexed postures.",
  },
  {
    id: "mh-m4s3-ceiling-void",
    question:
      "Why is handling materials above a suspended ceiling particularly hazardous?",
    options: [
      "Because suspended ceiling tiles are always white and hard to see",
      "Because the worker is reaching above their head with limited visibility, working on a platform or ladder, with no solid footing in the void itself",
      "Because suspended ceilings are always at exactly 2.4 metres height",
      "Because materials above ceilings are always lighter than materials below",
    ],
    correctIndex: 1,
    explanation:
      "Working above a suspended ceiling combines multiple hazards: the worker is typically on a step ladder or scaffold with limited platform area; they are reaching above head height (the weakest lifting zone); visibility in the void is poor; there is no solid surface to rest materials on in the void (only the ceiling grid, which is not load-bearing); and there is a risk of stepping onto ceiling tiles which will not support body weight. Every item passed into the void must be lifted above head height and manoeuvred blind.",
  },
  {
    id: "mh-m4s3-riser-shaft",
    question:
      "What equipment should be used to move materials vertically through a riser or service shaft?",
    options: [
      "Materials should be thrown up or dropped down the shaft",
      "A rope and pulley system, small hoist, or dedicated shaft lift, with the shaft secured to prevent items from falling",
      "Materials should be carried up internal ladders with one hand",
      "No special equipment is needed — risers are always wide enough for normal carrying",
    ],
    correctIndex: 1,
    explanation:
      "Riser and service shafts require vertical movement of materials through a confined space. A rope and pulley system (or small electric hoist) allows materials to be raised or lowered in a controlled manner. The shaft opening must be secured with a gate or barrier to prevent items (or people) from falling when the hoist is not in use. Materials must never be thrown or dropped through shafts — this is uncontrolled and risks striking anyone below or damaging the materials and existing services.",
  },
];

const faqs = [
  {
    question:
      "What is the maximum weight I should handle while kneeling in a restricted space?",
    answer:
      "There is no single regulatory figure, but HSE guidance indicates that lifting capacity is drastically reduced when kneeling compared to standing. A reasonable guideline is to reduce the maximum load by at least 50-60% compared to the standing guideline of 25 kg. This means a maximum of approximately 10-12 kg when kneeling, and less if the space forces twisting, reaching, or one-handed handling. In practice, many restricted-space tasks require loads to be broken down into very small components (individual cable lengths, single fittings, small bags of clips) rather than carrying pre-assembled items into the space.",
  },
  {
    question:
      "Should I work alone in a loft, ceiling void, or under-floor space?",
    answer:
      "Working alone in any confined or restricted space increases risk because there is no one to assist if you are injured, trapped, or become unwell. Best practice is to have a second person present — either in the restricted space or, more commonly, stationed at the access point to pass materials, provide communication, and raise the alarm if needed. The Confined Spaces Regulations 1997 may also apply depending on the nature of the space. Even if the space does not meet the legal definition of a confined space, the general duty under the Health and Safety at Work etc. Act 1974 requires the employer to ensure safe working, which includes avoiding lone working in hazardous environments.",
  },
  {
    question:
      "How should I pass materials through a loft hatch?",
    answer:
      "The loft hatch is typically the bottleneck for material handling. First, check the maximum size that will fit through the hatch opening — do not force oversized items through as this risks damage to the hatch surround and creates an awkward, uncontrolled lift. A two-person method works best: one person on the ladder or landing below passes items up to the person in the loft, who receives them while kneeling at the hatch edge. Keep individual items light (under 10 kg) because the person in the loft is receiving the load from an awkward position. For heavier items, consider whether the work can be redesigned to avoid taking heavy items into the loft at all.",
  },
  {
    question:
      "Is it safe to use a ladder while handling materials in a restricted space?",
    answer:
      "Ladders should be avoided wherever possible in restricted spaces because the combination of a ladder (which requires three-point contact and limits to light, brief tasks) with a restricted space (which limits posture and movement) creates a compounding risk. If access equipment is needed in a restricted space, podium steps or a low-level platform are preferable because they provide a stable standing area and free both hands. Where a ladder is the only option, no loads should be carried on the ladder — all materials should be passed up or lowered by a second person or a simple pulley.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the typical headroom clearance in a domestic loft space?",
    options: [
      "2.4 metres — standard room height",
      "1.8-2.0 metres — standing height with clearance",
      "0.6-1.5 metres at the eaves, rising to 1.8-2.2 metres at the ridge in a pitched roof",
      "3.0 metres — building regulations minimum for lofts",
    ],
    correctAnswer: 2,
    explanation:
      "A typical domestic loft space under a pitched roof has a headroom that varies from as little as 0.6 metres at the eaves (where the roof meets the wall plate) to approximately 1.8-2.2 metres at the ridge. This means that a large proportion of the loft space does not permit standing upright, forcing workers to kneel, crouch, or crawl. The working area with adequate headroom is often a narrow strip along the ridge.",
  },
  {
    id: 2,
    question:
      "Why does crawling with materials in a loft space increase the risk of knee injury?",
    options: [
      "Because loft joists are soft and cushion the knees",
      "Because the body weight plus the load weight is concentrated on the knees against hard timber joists, and the crawling motion adds repetitive impact",
      "Because loft insulation protects the knees from any harm",
      "Because crawling is the recommended ergonomic posture for all work",
    ],
    correctAnswer: 1,
    explanation:
      "When crawling in a loft, the full body weight (plus any carried load) is distributed between the knees and hands on hard timber joists. The joists are narrow (typically 38-50 mm wide), concentrating the pressure on a small area of the kneecap. Repetitive crawling compounds this with repeated impact. Over time, this causes bruising, bursitis (inflammation of the fluid sacs around the knee), and cartilage damage. Knee pads are essential for any loft work involving kneeling or crawling.",
  },
  {
    id: 3,
    question:
      "What is the maximum load-bearing capacity of a standard suspended ceiling grid?",
    options: [
      "The grid can support the weight of a person standing on it",
      "The grid can support heavy cable trays and equipment",
      "The grid is designed only to support the weight of ceiling tiles (approximately 4-8 kg per tile) and light fixtures — it is NOT a working platform or material support",
      "The grid can support up to 100 kg per square metre",
    ],
    correctAnswer: 2,
    explanation:
      "Suspended ceiling grids are designed to support ceiling tiles and lightweight light fittings only. They are not structural and will collapse under the weight of a person or heavy materials. Materials placed in the ceiling void must be supported by the building structure (beams, walls, independent brackets), never by the ceiling grid itself. If an electrician steps on a ceiling tile, it will give way and the person will fall through.",
  },
  {
    id: 4,
    question:
      "When passing materials through a loft hatch to a person in the loft, what is the recommended maximum weight per item?",
    options: [
      "25 kg — the standard standing guideline",
      "Under 10 kg, because the receiver is in a kneeling position reaching down through the hatch",
      "50 kg with a two-person lift",
      "No limit as long as you use correct technique",
    ],
    correctAnswer: 1,
    explanation:
      "The person receiving materials in the loft is typically kneeling at the hatch edge, reaching downward to take the item, and then manoeuvring it in a restricted space. This posture dramatically reduces safe lifting capacity. Keeping individual items under 10 kg ensures the receiver can control the load safely. Heavier items should be broken down into components before being passed through the hatch.",
  },
  {
    id: 5,
    question:
      "What is the primary risk of handling materials in an under-floor crawl space?",
    options: [
      "The materials may get dusty",
      "Extremely restricted movement forces lying, crawling, and reaching postures that eliminate normal lifting technique entirely",
      "Under-floor spaces are always well-lit and spacious",
      "The floor above provides protection from all hazards",
    ],
    correctAnswer: 1,
    explanation:
      "Under-floor crawl spaces (typically 300-600 mm clearance) are among the most restrictive working environments. The worker may be lying on their front or back, with no ability to use normal lifting posture. Materials must be dragged, pushed, or slid rather than lifted. The spine is in a flexed or extended position with no support. This makes it essential to minimise the weight and size of any materials taken into the space and to limit the time spent in these postures.",
  },
  {
    id: 6,
    question:
      "Why should materials never be thrown or dropped through a riser shaft?",
    options: [
      "Because it creates too much noise for other workers",
      "Because it is an uncontrolled action that risks striking anyone below, damaging the materials and existing services in the shaft, and creating debris that blocks the shaft",
      "Because riser shafts are always sealed and cannot have anything dropped through them",
      "Because gravity does not work inside riser shafts",
    ],
    correctAnswer: 1,
    explanation:
      "Throwing or dropping items through a riser shaft is uncontrolled handling. A falling object gains kinetic energy and can cause serious injury if it strikes someone below. It can damage existing cables, pipework, and services in the shaft. Materials can break on impact, creating waste and sharp debris. The shaft may also have fire-stopping at floor levels that can be damaged. Controlled lowering using a rope and pulley, or a small hoist, is the safe method.",
  },
  {
    id: 7,
    question:
      "In a plant room with heavy equipment and limited space, what is the priority control measure?",
    options: [
      "Remove all the equipment from the plant room first",
      "Plan the handling operation in detail before starting, including the exact route, lifting method, and positioning point, because there is no room for improvisation",
      "Only allow one person in the plant room at any time",
      "Use only manual handling because mechanical aids do not fit in plant rooms",
    ],
    correctAnswer: 1,
    explanation:
      "Plant rooms contain heavy, often immovable equipment with narrow aisles between them. There is typically no room to manoeuvre around an obstacle once a heavy item is being moved. Detailed pre-planning — including measuring routes, confirming clearances, identifying the exact lifting and positioning method, and ensuring the right equipment and people are available — is essential. In a plant room, you cannot easily change your approach mid-task.",
  },
  {
    id: 8,
    question:
      "When is a one-person solution acceptable in a restricted space, and when should a team approach be used?",
    options: [
      "One person is always sufficient in restricted spaces because team lifts take up too much room",
      "One person is acceptable for very light loads (under 5-10 kg) in short-duration tasks; team approaches should be used for heavier loads, longer tasks, or where a buddy system is needed for safety",
      "Teams should never enter restricted spaces",
      "The number of people is irrelevant — the same rules apply everywhere",
    ],
    correctAnswer: 1,
    explanation:
      "In restricted spaces, a single worker may be appropriate for very light loads and brief tasks — for example, pulling a single cable through a ceiling void. However, for heavier items, longer duration work, or tasks where the restricted space itself poses a risk (such as entrapment or limited oxygen), a team approach is required. The second person may be in the space to assist with handling, or stationed at the access point to pass materials and maintain communication. The decision depends on the specific risk assessment for the space and the task.",
  },
];

export default function ManualHandlingModule4Section3() {
  useSEO({
    title:
      "Handling in Confined & Restricted Spaces | Manual Handling Module 4.3",
    description:
      "Manual handling in loft spaces, ceiling voids, under-floor crawl spaces, riser shafts, plant rooms, and restricted working environments for electricians.",
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
            <DoorOpen className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Handling in Confined &amp; Restricted Spaces
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Safe handling in loft spaces, ceiling voids, under-floor access,
            riser shafts, plant rooms, and restricted working environments
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
                  <strong>Posture:</strong> restricted space = reduced lifting
                  capacity (50%+)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Weight:</strong> keep loads under 10 kg for kneeling
                  work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Vertical:</strong> use rope/pulley for riser shafts,
                  never throw
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
                  <strong>Before:</strong> measure the space, plan material
                  sizes, buddy system
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>During:</strong> small loads, frequent breaks, knee
                  pads, lighting
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>After:</strong> stretch, report any discomfort, limit
                  repeat exposure
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
              "Explain how restricted headroom reduces manual handling capacity",
              "Identify the hazards specific to loft, void, and under-floor work",
              "Describe safe methods for vertical material handling in riser shafts",
              "Apply the correct approach for handling above suspended ceilings",
              "Recognise when one-person solutions are appropriate vs team approaches",
              "Select appropriate access equipment for handling in restricted spaces",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Loft and Roof Space Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            Loft &amp; Roof Space Work
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Loft spaces under pitched roofs are among the most common
                restricted environments where electricians work. Typical
                domestic lofts have headroom ranging from{" "}
                <strong>0.6 metres at the eaves to approximately 1.8&ndash;2.2
                metres at the ridge</strong>. This means that a large
                proportion of the space does not allow the worker to stand
                upright. The worker is forced to <strong>kneel, crouch,
                crawl, or shuffle</strong> while handling cables, junction
                boxes, lighting components, and insulation.
              </p>

              <p>
                When the body cannot stand upright, the normal lifting technique
                is impossible. The spine is held in a flexed (bent forward)
                position, which places significantly more stress on the lumbar
                discs than a neutral standing posture. A person who can safely
                lift 25 kg while standing upright with correct technique may
                only be able to safely manage <strong>5&ndash;10 kg</strong>{" "}
                while kneeling in a loft space. This dramatic reduction in
                capacity must be reflected in the planning of what materials
                are taken into the loft and how they are handled.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong>{" "}
                  <strong>Crawling with materials</strong> is a high-risk
                  activity. The body weight plus any carried load is
                  concentrated on the knees against hard timber joists. The
                  joists are narrow (38&ndash;50 mm), creating intense point
                  pressure on the kneecaps. Knee pads are essential, but they
                  only reduce &mdash; they do not eliminate &mdash; the risk.
                  Loft boarding across the joists provides a wider, more
                  comfortable surface to kneel on and prevents the risk of
                  stepping between joists and going through the ceiling below.
                </p>
              </div>

              <p>
                <strong>Insulation handling:</strong> Loft insulation rolls
                are lightweight but bulky. Mineral wool insulation is also an
                irritant &mdash; fibres can irritate the skin, eyes, and
                respiratory system. Handling insulation in a confined loft
                space with poor ventilation and restricted movement compounds
                these risks. Wear long sleeves, gloves, eye protection, and an
                FFP2 dust mask when handling mineral wool insulation. Take
                regular breaks outside the loft space to clear the lungs and
                cool down, as loft temperatures can be extremely high in summer
                and extremely cold in winter.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Loft Work Handling Controls
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Install loft boarding before starting work &mdash;
                      provides a stable kneeling surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use a head torch to keep both hands free for handling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Pass items through the hatch in small quantities &mdash;
                      under 10 kg per item
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Wear knee pads &mdash; essential for any work requiring
                      kneeling on joists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Take breaks every 20&ndash;30 minutes &mdash; restricted
                      postures cause fatigue faster
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Ceiling Voids */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Ceiling Voids
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Working above suspended ceilings &mdash; in the void between
                the ceiling grid and the structural soffit above &mdash; is a
                daily task for many electricians installing or maintaining
                lighting, data cabling, and fire alarm systems. The void
                typically ranges from <strong>300 mm to 800 mm</strong> in
                depth, and the worker accesses it by removing ceiling tiles
                and reaching up from a step ladder, podium, or scaffold
                platform below.
              </p>

              <p>
                The primary manual handling challenge is that{" "}
                <strong>all work is above head height</strong>. The worker is
                reaching upward with arms extended, handling materials in the
                weakest part of the lifting zone (above shoulder and above head).
                Visibility is poor because the head is often below the ceiling
                line while the hands are in the void. The worker cannot see
                what they are handling, leading to &ldquo;blind&rdquo;
                positioning of cables, containment, and fixings.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Warning
                  </p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  <strong>Never stand on, kneel on, or apply body weight
                  to a suspended ceiling grid or tile.</strong> Suspended
                  ceiling grids are designed to support only the weight of
                  the tiles and lightweight fixtures. They will collapse under
                  the weight of a person, causing a fall that can result in
                  serious injury or death. All body weight must remain on the
                  access equipment (ladder, podium, scaffold) at all times.
                </p>
              </div>

              <p>
                Materials placed in the ceiling void must be supported by the
                building structure &mdash; independent brackets fixed to the
                structural soffit, threaded rod hangers, or structural beams.
                The ceiling grid itself must never be used to support cable
                tray, heavy cables, or equipment. Even a relatively small
                concentrated load on a ceiling grid runner can cause the grid
                to deflect, sag, or collapse.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Ceiling Void Handling Best Practice
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use a podium or scaffold rather than a step ladder for
                      extended ceiling void work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Keep items small and light &mdash; pass individual
                      components, not assembled units
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use a task light or head torch to improve visibility in
                      the void
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Take frequent breaks from overhead work &mdash; sustained
                      above-head posture causes rapid shoulder fatigue
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Under-Floor Access */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Under-Floor Access
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under-floor crawl spaces are among the most restrictive
                environments an electrician encounters. Typical clearances
                range from <strong>300 mm to 600 mm</strong> between the ground
                and the underside of the floor above. In some older properties,
                the clearance may be even less. The worker must lie flat, crawl
                on their front or back, and push or pull materials alongside
                them.
              </p>

              <p>
                In this environment, <strong>normal lifting technique is
                impossible</strong>. There is no room to squat, bend, or use
                any standard posture. Materials must be slid, dragged, or
                pushed along the ground. The spine is either flexed (lying on
                the front) or extended (lying on the back looking up), neither
                of which is a safe position for handling weight. The maximum
                load is effectively whatever can be pushed along the ground
                with one hand while lying down &mdash; typically just a few
                kilograms.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong> Break
                  materials down into the smallest practical sizes before
                  entering the crawl space. Carry cable in short pre-cut lengths,
                  not on a drum. Take individual junction boxes, not a bag of
                  ten. Use a small tray or bucket that can slide alongside you
                  for fixings and small components. The goal is to minimise the
                  number of trips in and out of the space by preparing
                  everything in advance, while keeping each individual load
                  very light.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Under-Floor Access Controls
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Check for hazards before entering: standing water, vermin,
                      asbestos, sharp objects
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use a ground sheet or crawler board to protect clothing
                      and provide a smoother surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Buddy system &mdash; a second person at the access point
                      to pass materials and maintain communication
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Limit time in the crawl space &mdash; come out every
                      15&ndash;20 minutes to stretch and recover
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Risers and Service Shafts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Risers &amp; Service Shafts
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical risers and service shafts are vertical spaces within
                buildings that house cables, busbars, and containment running
                between floors. They are typically narrow (often less than
                1 metre wide), congested with existing services, and require
                materials to be moved <strong>vertically</strong> &mdash;
                either up from a lower floor or down from above.
              </p>

              <p>
                Vertical handling in a riser requires a fundamentally different
                approach from horizontal carrying. Materials must be raised or
                lowered in a controlled manner using a{" "}
                <strong>rope and pulley system, small electric hoist,
                or dedicated shaft lift</strong>. The shaft opening at each
                floor level must be secured with a gate, barrier, or temporary
                cover when not in active use, to prevent materials (or people)
                from falling through.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  <strong>Never throw or drop materials through a riser
                  shaft.</strong> A falling object gains significant kinetic
                  energy even over a single floor height. A 5 kg item dropped
                  from 3 metres strikes with a force equivalent to many times
                  its static weight. It can seriously injure anyone below,
                  damage existing services, and create debris that blocks the
                  shaft. All vertical material movement must be controlled.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Riser Shaft Handling Methods
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Rope and pulley:</strong> simple, portable, suited
                      for loads up to approximately 25 kg
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Small electric hoist:</strong> reduces manual
                      effort, suited for heavier or repetitive lifts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Shaft lift/platform:</strong> purpose-built for
                      multi-floor material movement in larger risers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Communication:</strong> person at each floor level
                      communicating by radio or shouting &ldquo;clear
                      below&rdquo; before any movement
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Plant Rooms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Plant Rooms
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Plant rooms house heavy mechanical and electrical equipment
                &mdash; boilers, chillers, pumps, switchgear, transformers,
                and UPS systems &mdash; in spaces that are often{" "}
                <strong>tightly packed with narrow aisles</strong> between
                equipment. Installing, maintaining, or replacing electrical
                components in plant rooms requires handling materials in spaces
                where there is very little room to manoeuvre.
              </p>

              <p>
                The primary challenge is that <strong>the route from the
                door to the work position may be narrow and tortuous</strong>,
                with 90-degree turns around equipment, low overhead pipes, and
                raised cable runs to step over. A load that is easy to carry
                in a straight line down a corridor becomes extremely difficult
                to navigate around these obstacles. The handler must often turn
                their body sideways, lift the load over obstructions, and make
                precise positioning movements &mdash; all in a space that
                provides no margin for error.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong> Plan
                  the handling operation in detail before starting. Walk the
                  route from the door to the positioning point. Measure the
                  narrowest gap, the lowest overhead obstruction, and the
                  tightest turn. Confirm that the item will physically fit
                  through every point on the route. If it does not, the item
                  may need to be partially disassembled, or temporary removal
                  of obstructions may be required (with isolation and
                  reinstatement).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Plant Room Handling Controls
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Survey the route and measure clearances before the item
                      arrives
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use skates (roller platforms), jacks, and small trolleys
                      designed for tight spaces
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Ensure adequate lighting &mdash; plant rooms are often
                      poorly lit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Check for hot surfaces (pipes, equipment) that could
                      cause burns during handling
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Working from Access Equipment While Handling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Access Equipment &amp; Handling
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Handling materials while standing on access equipment (ladders,
                podiums, scaffold, MEWPs) adds a layer of risk because the
                handler is on an elevated, limited platform. Any fumble,
                imbalance, or unexpected load shift that would be harmless at
                ground level can cause a fall from height when on access
                equipment.
              </p>

              <p>
                <strong>Ladders should be avoided</strong> for material handling
                wherever possible. A ladder requires three-point contact,
                leaving only one hand available for work. Handling any load of
                significant weight on a ladder means the worker has only one
                hand on the ladder and one on the load &mdash; a fall is one
                fumble away. Podium steps, low-level scaffold, or MEWPs are
                strongly preferred because they provide a stable platform,
                free both hands, and include guard rails.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Access Equipment Selection for Handling Tasks
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Ladder:</strong> avoid for handling &mdash; only
                      acceptable for very light items (under 3 kg) for under
                      5 minutes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Podium steps:</strong> good for ceiling void work
                      &mdash; stable platform, both hands free
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Low-level scaffold:</strong> best for sustained
                      work above head height with materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>MEWP:</strong> excellent for heavy items at height
                      &mdash; items can be placed on the platform floor
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: One-Person vs Team Solutions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            One-Person vs Team Solutions
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Restricted spaces often appear to be &ldquo;one-person&rdquo;
                environments because there is physically only room for one
                worker inside. However, this does not mean the handling task
                should be a solo operation. A{" "}
                <strong>buddy system</strong> &mdash; with one person in the
                restricted space and a second person at the access point
                &mdash; is the recommended approach for most restricted-space
                handling tasks.
              </p>

              <p>
                The person at the access point serves multiple functions: they
                pass materials into the space in manageable quantities, they
                receive materials being passed out, they maintain communication
                with the person inside, and they are ready to raise the alarm
                if the person inside becomes injured or unwell. This division
                of labour also means the person inside the restricted space
                does not need to repeatedly enter and exit to collect materials,
                which reduces their exposure to the awkward postures.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  When to Use Each Approach
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">
                      One person (brief, light tasks):
                    </strong>{" "}
                    Quick tasks under 15 minutes with very light loads (under
                    5 kg). For example, pulling a single cable through a
                    ceiling void or checking a junction box in a loft. The
                    worker should inform a colleague of their location and
                    expected return time.
                  </p>
                  <p>
                    <strong className="text-white">
                      Buddy system (standard approach):
                    </strong>{" "}
                    One person in the space, one at the access point. Used for
                    any task over 15 minutes, any task involving multiple
                    items, or any space where the risk of injury or entrapment
                    exists. This is the recommended default approach.
                  </p>
                  <p>
                    <strong className="text-white">
                      Full team (complex or high-risk):
                    </strong>{" "}
                    Multiple people at various positions (inside, access point,
                    material supply, supervision). Used for riser installations,
                    plant room equipment moves, or any task requiring multiple
                    handling operations in sequence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Restricted Space Handling Solutions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Restricted Space Handling Solutions
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following comparison grid summarises the handling solutions
                for each type of restricted space commonly encountered by
                electricians.
              </p>

              {/* Styled-div diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <Ruler className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                      Restricted Space Handling Solutions
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Loft Spaces */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Home className="h-5 w-5 text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">
                        Loft Spaces
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Clearance: 0.6&ndash;2.2 m (varies)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Max load: ~10 kg (kneeling)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Access: loft hatch + ladder</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Aids: boarding, knee pads, head torch</span>
                      </li>
                    </ul>
                  </div>

                  {/* Ceiling Voids */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-5 w-5 text-blue-400" />
                      <p className="text-sm font-semibold text-blue-400">
                        Ceiling Voids
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Clearance: 0.3&ndash;0.8 m (void depth)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Max load: ~5 kg (above head)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Access: tile removal + podium/scaffold</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Aids: podium steps, task light, buddy</span>
                      </li>
                    </ul>
                  </div>

                  {/* Under-Floor */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="h-5 w-5 text-amber-400" />
                      <p className="text-sm font-semibold text-amber-400">
                        Under-Floor Crawl Spaces
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Clearance: 0.3&ndash;0.6 m (crawling)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Max load: ~3&ndash;5 kg (sliding/pushing)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Access: floor hatch or removed boards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Aids: crawler board, sliding tray, buddy</span>
                      </li>
                    </ul>
                  </div>

                  {/* Riser Shafts */}
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ArrowUpDown className="h-5 w-5 text-purple-400" />
                      <p className="text-sm font-semibold text-purple-400">
                        Riser &amp; Service Shafts
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Direction: vertical between floors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Max load: per hoist SWL rating</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Access: door/hatch at each floor level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Aids: rope/pulley, hoist, shaft gate, radios</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-xs text-white/60 leading-relaxed">
                    <strong className="text-emerald-400">Remember:</strong>{" "}
                    Restricted space = restricted capacity. The maximum
                    recommended load in any restricted space is significantly
                    lower than the standard standing guideline. Always assess
                    the specific space and posture before determining safe
                    load limits.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../manual-handling-module-4-section-4">
              Next: Repetitive Handling &amp; Cumulative Risk
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
