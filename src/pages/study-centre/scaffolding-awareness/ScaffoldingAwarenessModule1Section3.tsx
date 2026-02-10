import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle,
  AlertTriangle,
  Wrench,
  Ruler,
  ShieldCheck,
  CircleDot,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "scaffolding-awareness-standards-function",
    question:
      "What is the primary function of standards (uprights) in a tube-and-fitting scaffold?",
    options: [
      "To provide horizontal bracing across the width of the scaffold",
      "To carry the scaffold's load vertically down to the ground through base plates and sole boards",
      "To support guard rails and toe boards only",
      "To connect the scaffold to the building facade",
    ],
    correctIndex: 1,
    explanation:
      "Standards (also called uprights) are the vertical tubes that carry the full load of the scaffold — including the self-weight of the structure, the working platforms, materials stored on the platforms, and the workers themselves — down to the ground. They must be plumb (vertical), properly spaced at regular intervals (typically 2.1 m to 2.7 m apart along the length), and each standard must rest on a base plate which in turn sits on a sole board to distribute the load over the ground surface. Inner standards run along the building face and outer standards run along the outside of the scaffold.",
  },
  {
    id: "scaffolding-awareness-braces-purpose",
    question:
      "Why are diagonal braces essential to the structural integrity of a scaffold?",
    options: [
      "They provide additional platforms for workers to stand on",
      "They act as ladders for access between scaffold lifts",
      "They provide rigidity and prevent the scaffold from racking (parallelogram distortion), without which the scaffold would collapse",
      "They are only decorative and help identify the scaffold owner",
    ],
    correctIndex: 2,
    explanation:
      "Diagonal braces are absolutely critical to scaffold stability. Without braces, a scaffold is essentially a series of rectangles formed by standards and ledgers — and rectangles can easily distort into parallelograms under lateral load (this distortion is called racking). Braces triangulate the structure, converting the rectangles into triangles which are inherently rigid. Ledger braces run diagonally in the plane of the scaffold face, while plan braces run diagonally in the horizontal plane. A scaffold without braces will collapse under relatively small lateral forces such as wind loading or workers moving materials.",
  },
  {
    id: "scaffolding-awareness-guard-rail-height",
    question:
      "What is the minimum height for a guard rail above the working platform on a scaffold?",
    options: [
      "750 mm",
      "850 mm",
      "950 mm",
      "1100 mm",
    ],
    correctIndex: 2,
    explanation:
      "The minimum height for a guard rail above the working platform is 950 mm, as specified in the Work at Height Regulations 2005 (Schedule 3). The guard rail must be positioned so that there is no unprotected gap of more than 470 mm between it and the platform surface, the toe board, or any intermediate guard rail. This is why a mid rail is required — to fill the gap between the guard rail at 950 mm and the toe board at 150 mm. Together, the guard rail, mid rail, and toe board form a collective fall prevention system that protects workers from falling from the platform edge.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between a transom and a putlog?",
    answer:
      "Both transoms and putlogs are horizontal tubes that run across the width of the scaffold (from the inner standards to the outer standards), and both support the working platform boards. The difference lies in how they connect to the scaffold. A transom connects to both the inner and outer ledgers using right-angle couplers — it spans the full width of the scaffold and is supported at both ends. This is the arrangement used in independent scaffolds. A putlog, by contrast, has a flattened end (called a blade) that is inserted into the horizontal mortar joint of the brickwork at the building face, while its other end is connected to the outer ledger with a putlog coupler. The putlog scaffold therefore relies on the building wall for support on one side. Putlog scaffolds are only suitable for new brickwork construction where the mortar joints are available, and they must not be used on buildings with cavity wall construction where the inner leaf might not support the load.",
  },
  {
    question:
      "Why do scaffold boards have a maximum span of 3.9 metres and what happens if they are overspanned?",
    answer:
      "Scaffold boards (38 mm thick, 225 mm wide) have a maximum unsupported span of 3.9 metres (as specified in BS EN 12811-1 and TG20 guidance). This maximum span is calculated based on the board's ability to support the required load (a uniformly distributed load of at least 1.5 kN/m² for a general purpose scaffold, or higher for heavier duty classifications) without excessive deflection or risk of failure. If a board spans beyond 3.9 metres, it will deflect (sag) excessively under load, creating a tripping hazard and an uncomfortable, bouncy working surface. More critically, the bending stress in the board may exceed its strength, leading to a sudden brittle fracture — the board snaps without warning, dropping the worker and any materials through the scaffold. Boards must also not overhang their supports by more than four times their thickness (4 × 38 mm = 152 mm) or 150 mm (whichever is less), otherwise the overhanging end can tip up like a see-saw when a worker steps on the supported end.",
  },
  {
    question:
      "What is the difference between a right-angle coupler and a swivel coupler, and when would you use each?",
    answer:
      "A right-angle coupler (also called a fixed coupler or double coupler) connects two scaffold tubes at exactly 90 degrees. It is used wherever tubes meet at right angles — for example, connecting ledgers to standards, transoms to ledgers, and standards to ledgers. The right-angle coupler is the primary structural coupler in tube-and-fitting scaffolding and is designed to resist both slip (vertical load) and rotation. A swivel coupler, by contrast, connects two tubes at any angle other than 90 degrees. It has two halves connected by a central bolt that allows rotation. The most common use of swivel couplers is for connecting diagonal braces to standards or ledgers, because braces run at an angle (typically 35° to 55° from horizontal). Swivel couplers are also used in raking shores, fans, and any other arrangement where tubes do not meet at 90°. It is important to note that swivel couplers have a lower safe working load than right-angle couplers, so they must not be substituted where a right-angle coupler is specified.",
  },
  {
    question:
      "What are sole boards and why are they so important for scaffold foundations?",
    answer:
      "Sole boards are timber planks or scaffold boards placed on the ground beneath the base plates of the scaffold standards. Their purpose is to spread the concentrated point load from each standard over a larger area of ground, reducing the bearing pressure to a level the ground can support without settlement. Without sole boards, the base plates would press directly into the ground, and on anything other than solid concrete or rock, the ground would compress unevenly, causing the scaffold to settle differentially — one standard sinks more than another. This differential settlement can cause the scaffold to lean, distort, or even collapse. Sole boards must be of adequate size to reduce the bearing pressure below the ground's safe bearing capacity. On soft or waterlogged ground, larger sole boards or even concrete pads may be needed. Sole boards must be placed level and must not be stacked to compensate for uneven ground — instead, adjustable base plates (screw jacks) should be used to level the scaffold.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What are the vertical tubes in a scaffold that carry the load to the ground called?",
    options: ["Ledgers", "Transoms", "Standards (uprights)", "Braces"],
    correctAnswer: 2,
    explanation:
      "Standards (also known as uprights) are the vertical tubes that carry the entire scaffold load — self-weight, platform loads, materials, and workers — vertically down to the ground through base plates and sole boards. Inner standards are positioned along the building face and outer standards run along the outside of the scaffold. Standards must be plumb (vertical), properly spaced, and each must rest on a base plate.",
  },
  {
    id: 2,
    question:
      "Ledgers run in which direction on a scaffold?",
    options: [
      "Vertically, connecting base plates to the top lift",
      "Diagonally, providing rigidity to the structure",
      "Horizontally along the length of the scaffold, connecting standards",
      "Horizontally across the width of the scaffold, connecting inner and outer standards",
    ],
    correctAnswer: 2,
    explanation:
      "Ledgers are horizontal tubes that run along the length (longitudinal direction) of the scaffold, connecting standards together. There are inner ledgers (along the building face) and outer ledgers (along the outside of the scaffold) at each lift height. Ledgers tie the scaffold together longitudinally and provide support points for transoms. They are connected to the standards using right-angle couplers.",
  },
  {
    id: 3,
    question:
      "What do transoms support on a scaffold?",
    options: [
      "The diagonal bracing system",
      "The scaffold's connection to the building",
      "The working platforms (scaffold boards)",
      "The guard rails and toe boards only",
    ],
    correctAnswer: 2,
    explanation:
      "Transoms are horizontal tubes that run across the width of the scaffold, connecting the inner and outer standards (or more precisely, the inner and outer ledgers). Their primary function is to support the working platform boards. Transoms must be level and properly coupled at both ends. In an independent scaffold, transoms span between the inner and outer ledgers using right-angle couplers. In a putlog scaffold, putlogs (a type of transom) have a flattened blade end that is inserted into the mortar joints of the brickwork.",
  },
  {
    id: 4,
    question:
      "What is the minimum height for a toe board on a scaffold working platform?",
    options: ["50 mm", "100 mm", "150 mm", "200 mm"],
    correctAnswer: 2,
    explanation:
      "Toe boards must be a minimum of 150 mm high. They are fitted at the edge of the working platform at deck level to prevent materials, tools, and debris from being kicked or rolling off the platform edge and falling onto people below. Together with guard rails (minimum 950 mm high) and mid rails, toe boards form part of the collective fall prevention system required by the Work at Height Regulations 2005. Brick guards may be fitted above the toe boards for additional protection where there is a risk of materials falling through the gap between the toe board and the guard rail.",
  },
  {
    id: 5,
    question:
      "What would happen to a scaffold if all diagonal braces were removed?",
    options: [
      "Nothing — braces are only required for scaffolds over 10 metres high",
      "The scaffold would lose some aesthetic appearance but remain structurally sound",
      "The scaffold would collapse because it would have no rigidity and could not resist lateral loads (racking)",
      "The scaffold would only be unsafe in high winds",
    ],
    correctAnswer: 2,
    explanation:
      "Without diagonal braces, a scaffold has no triangulation and therefore no resistance to lateral forces. The rectangular frames formed by standards and ledgers can easily distort into parallelograms — a phenomenon known as racking. Even relatively small lateral forces (such as wind, workers moving materials, or the impact of materials being loaded onto the platform) would cause the scaffold to rack and collapse. Braces are essential at every stage of erection, not just on the completed scaffold. Both ledger braces (in the vertical plane of the scaffold face) and plan braces (in the horizontal plane) are required.",
  },
  {
    id: 6,
    question:
      "What is the purpose of base plates in a scaffold system?",
    options: [
      "To connect the scaffold to the building wall",
      "To spread the standard's load over the sole board and provide a stable footing",
      "To join two scaffold tubes end to end",
      "To secure the guard rails in position",
    ],
    correctAnswer: 1,
    explanation:
      "Base plates are flat steel plates that sit beneath each standard (upright) at ground level. They spread the concentrated point load from the bottom of the standard over a larger area, distributing it onto the sole board beneath. Base plates also provide a stable, level footing for the standard and help prevent it from sliding. On uneven ground, adjustable base plates (screw jacks) can be used to level the scaffold. Base plates must always be used — placing a standard directly on the ground without a base plate concentrates the load and leads to settlement.",
  },
  {
    id: 7,
    question:
      "Which type of coupler is used to connect diagonal braces to standards?",
    options: [
      "Right-angle coupler",
      "Putlog coupler",
      "Sleeve coupler",
      "Swivel coupler",
    ],
    correctAnswer: 3,
    explanation:
      "Swivel couplers are used to connect diagonal braces to standards because braces run at an angle (not at 90°). A swivel coupler has two rotating halves connected by a central bolt, allowing the two tubes to be connected at any angle. Right-angle couplers can only connect tubes at exactly 90° and are used for standard-to-ledger and ledger-to-transom connections. Putlog couplers connect putlogs to ledgers. Sleeve couplers join two tubes end-to-end in a straight line.",
  },
  {
    id: 8,
    question:
      "What is the maximum permitted overhang of a scaffold board beyond its end support?",
    options: [
      "No overhang is permitted",
      "50 mm or the board thickness, whichever is less",
      "Four times the board thickness (152 mm) or 150 mm, whichever is less",
      "300 mm regardless of board thickness",
    ],
    correctAnswer: 2,
    explanation:
      "Scaffold boards must not overhang their end supports by more than four times the board's thickness or 150 mm, whichever is the lesser distance. For a standard 38 mm thick board, four times the thickness is 152 mm, so the limit is 150 mm. If the board overhangs too far, a worker stepping on the overhanging end could cause the opposite end to tip up like a see-saw, creating a serious fall hazard. Board clips should be used to secure boards in position and prevent displacement by wind or accidental impact.",
  },
];

export default function ScaffoldingAwarenessModule1Section3() {
  useSEO({
    title: "Scaffold Terminology | Scaffolding Awareness Module 1.3",
    description:
      "Learn the key scaffold terminology: standards, ledgers, transoms, braces, guard rails, toe boards, base plates, sole boards, couplers, and scaffold boards — with labelled diagrams.",
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
            <Link to="../scaffolding-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <Building2 className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Scaffold Terminology
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The essential vocabulary of scaffolding &mdash; standards, ledgers, transoms, braces,
            guard rails, toe boards, base plates, sole boards, couplers, and boards &mdash; every
            component explained in detail
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Standards:</strong> Vertical tubes carrying load to ground</li>
              <li><strong>Ledgers &amp; transoms:</strong> Horizontal tubes &mdash; length &amp; width</li>
              <li><strong>Braces:</strong> Diagonal tubes preventing collapse</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Guard rails:</strong> Min 950 mm &mdash; collective fall prevention</li>
              <li><strong>Toe boards:</strong> Min 150 mm &mdash; prevent falling objects</li>
              <li><strong>Couplers:</strong> Right-angle, swivel, putlog, sleeve &amp; more</li>
            </ul>
          </div>
        </div>

        {/* Section 01: Standards (Uprights) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Standards (Uprights)
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Standards &mdash; also known as <strong>uprights</strong> &mdash; are the
                <strong> vertical tubes</strong> that form the backbone of every tube-and-fitting scaffold.
                They carry the scaffold&rsquo;s entire load vertically downward to the ground: the
                self-weight of the scaffold structure, the weight of the working platforms (boards), all
                stored materials, and every worker standing on the scaffold at any given time. Without
                standards, there is no scaffold.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Facts &mdash; Standards</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong>Inner standards</strong> run along the building face (the side nearest the
                      structure being worked on). <strong>Outer standards</strong> run along the outside
                      edge of the scaffold, furthest from the building.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Standards must be <strong>plumb</strong> (truly vertical). A standard that leans
                      introduces an eccentric load that increases bending stress in the tube and can
                      cause buckling under load. Plumbness is checked during erection using a spirit
                      level or plumb line.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Standards are typically spaced at regular intervals along the length of the
                      scaffold &mdash; commonly <strong>2.1 m (7 bays) or 2.7 m</strong> centre-to-centre,
                      depending on the scaffold&rsquo;s duty classification and design loading. Closer
                      spacing increases load capacity; wider spacing reduces it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Every standard must rest on a <strong>base plate</strong>, which in turn sits on a
                      <strong> sole board</strong> (on soft or unfinished ground). This distributes the
                      concentrated point load from the bottom of the standard over a larger area so the
                      ground can support it without settlement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Standards are joined together vertically using <strong>sleeve couplers</strong> (also
                      called joint pins or spigots) when the scaffold height exceeds the length of a
                      single tube. These joints must be staggered &mdash; adjacent standards must not have
                      their joints at the same level &mdash; to maintain structural integrity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Standard scaffold tube is <strong>48.3 mm outside diameter</strong> (nominal bore:
                      1.5 inches), made from steel (Grade S235 or S355 to BS EN 39) or aluminium alloy
                      (to BS EN 74). Steel tubes have a wall thickness of approximately 3.2 mm or 4.0 mm.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Critical Safety Point</p>
                </div>
                <p className="text-sm text-white/80">
                  Standards must <strong>never</strong> be founded directly on loose fill, rubble,
                  frozen ground, or waterlogged soil without adequate preparation. The foundation must
                  support the total scaffold load including all live loads (workers, materials) plus
                  environmental loads (wind, snow). Differential settlement &mdash; where one standard
                  sinks more than its neighbours &mdash; is one of the most common causes of scaffold
                  collapse and is almost always due to inadequate ground preparation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Ledgers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Ledgers
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Ledgers are <strong>horizontal tubes</strong> that run along the <strong>length</strong> of
                the scaffold (the longitudinal direction), connecting one standard to the next along each
                row. They are one of the three primary structural members of a scaffold, alongside
                standards and transoms.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Facts &mdash; Ledgers</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Ledgers <strong>tie the scaffold together longitudinally</strong> &mdash; they prevent
                      the standards from spreading apart or moving independently along the length of the
                      scaffold. Without ledgers, the standards would be free-standing vertical tubes with
                      no connection to one another.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      There are <strong>inner ledgers</strong> (running along the building face, connecting
                      the inner standards) and <strong>outer ledgers</strong> (running along the outside
                      edge, connecting the outer standards). Both must be present at each lift height.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Ledgers are connected to the standards using <strong>right-angle couplers</strong>
                      (because they meet the standards at 90°). The coupler must be fully tightened to the
                      correct torque to ensure a secure connection that can resist both vertical slip loads
                      and horizontal forces.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      The vertical spacing between ledgers defines the <strong>lift height</strong> &mdash;
                      the distance between successive working platform levels. Typical lift heights are
                      <strong> 2.0 m</strong> (the most common) or <strong>2.7 m</strong>, depending on the
                      scaffold design and the clearance required for the type of work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Ledgers also serve as <strong>support points for transoms</strong>. The transoms sit
                      on top of the inner and outer ledgers (connected by right-angle couplers) and in turn
                      support the scaffold boards that form the working platform.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Where a ledger needs to be longer than a single tube length, two tubes can be joined
                      using a <strong>sleeve coupler</strong>. The joint should be positioned near a
                      standard (not in the middle of a bay) and joints in adjacent ledgers must be
                      staggered to maintain structural integrity.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Inspection Tip</p>
                </div>
                <p className="text-sm text-white/80">
                  When inspecting a scaffold, check that <strong>all ledgers are level</strong> and that
                  every ledger-to-standard connection has a properly tightened right-angle coupler.
                  Missing or loose couplers compromise the entire scaffold&rsquo;s structural integrity.
                  Also check that ledger joints are staggered and not aligned at the same standard on
                  adjacent lifts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Transoms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">03</span>
            Transoms
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Transoms are <strong>horizontal tubes</strong> that run across the <strong>width</strong> of
                the scaffold, connecting the inner and outer standards (or more precisely, the inner and
                outer ledgers). Their primary function is to <strong>support the working platforms</strong>
                (the scaffold boards that workers stand on).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Facts &mdash; Transoms</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Transoms must be <strong>level</strong> (horizontal) to provide a flat, even surface
                      for the scaffold boards. A sloping transom creates a sloping platform, which is both
                      a tripping hazard and a risk of materials sliding off the edge.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      In an <strong>independent scaffold</strong>, transoms are connected to both the
                      inner and outer ledgers using <strong>right-angle couplers</strong>. They span the
                      full width of the scaffold and are supported at both ends, making them structurally
                      independent of the building.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Transoms are positioned at each pair of standards (these are called <strong>main
                      transoms</strong> or <strong>ledger transoms</strong>) and may also be placed at
                      intermediate positions between standards (called <strong>intermediate
                      transoms</strong>) to provide additional support for the scaffold boards and prevent
                      excessive board deflection.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      The spacing of transoms determines the <strong>span of the scaffold boards</strong>.
                      If transoms are too far apart, the boards will deflect excessively under load,
                      creating a bouncy, uncomfortable working surface and potentially exceeding the
                      board&rsquo;s safe bending capacity.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Putlogs &mdash; A Special Type of Transom</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      A <strong>putlog</strong> is a type of transom used specifically in
                      <strong> putlog scaffolding</strong> (also known as bricklayer&rsquo;s scaffolding).
                      Instead of connecting to an inner ledger, the putlog has a <strong>flattened
                      end</strong> (called a blade) that slots into the horizontal mortar joint of the
                      brickwork at the building face.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      The other end of the putlog is connected to the outer ledger using a
                      <strong> putlog coupler</strong>. This means the scaffold relies on the building
                      wall for support on one side &mdash; it is not independent.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Putlog scaffolds are only suitable for <strong>new brickwork construction</strong>
                      where mortar joints are available to receive the putlog blade. They must not be
                      used on buildings with cavity wall construction where the inner leaf might not
                      be strong enough to support the putlog load.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Putlog scaffolds have <strong>only a single row of standards</strong> (the outer
                      row), making them quicker and cheaper to erect than independent scaffolds, but
                      they are limited to lighter duties and are dependent on the building&rsquo;s
                      structural integrity.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Braces */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">04</span>
            Braces
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Braces are <strong>diagonal tubes</strong> that provide <strong>rigidity</strong> to the
                scaffold structure and prevent it from <strong>racking</strong> (distorting from a
                rectangle into a parallelogram under lateral force). Without braces, a scaffold is
                nothing more than a collection of vertical and horizontal tubes that can fold flat
                under the slightest lateral load &mdash; <strong>a scaffold without braces will
                collapse</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Bracing</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-400 mb-2">Ledger Braces (Facade Braces)</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Run diagonally <strong>in the plane of the scaffold face</strong> (the vertical plane)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Connect a standard at one lift level to a standard at the next lift level, crossing diagonally across one or more bays</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Prevent the scaffold face from racking sideways</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Usually arranged in a zigzag pattern up the face of the scaffold</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Connected to standards using <strong>swivel couplers</strong> (because they meet at an angle, not 90°)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-400 mb-2">Plan Braces (Horizontal Braces)</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Run diagonally <strong>in the horizontal plane</strong>, at platform level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Connect the inner ledger to the outer ledger at an angle, typically across one or more bays</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Prevent the scaffold from <strong>twisting</strong> or distorting in plan view</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Particularly important for <strong>freestanding scaffolds</strong> and scaffolds with returns (corners)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Also connected using <strong>swivel couplers</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Why Braces Are Non-Negotiable</p>
                </div>
                <p className="text-sm text-white/80">
                  The importance of bracing cannot be overstated. A scaffold without braces has
                  <strong> zero resistance to lateral forces</strong>. Even small forces &mdash; such as
                  wind load, the impact of materials being lifted onto the platform, or workers pushing
                  and pulling during their work &mdash; will cause the unbraced scaffold to rack and
                  collapse. Braces must be installed <strong>during erection</strong> as the scaffold
                  goes up, not left until the scaffold is complete. The scaffold designer specifies the
                  bracing pattern, and the scaffolder must follow this exactly. Removing braces to
                  create access openings without the designer&rsquo;s approval is extremely dangerous
                  and has caused fatalities.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How Braces Work &mdash; Triangulation</p>
                <p className="text-sm text-white/80 mb-3">
                  The principle behind bracing is <strong>triangulation</strong>. A rectangle (formed by
                  two standards and two ledgers) can easily distort into a parallelogram &mdash; push the
                  top to the left while the bottom stays fixed, and the rectangle leans over. But a
                  triangle cannot be distorted without changing the length of one of its sides, which
                  the rigid steel tube prevents. By adding a diagonal brace across the rectangle, you
                  create two triangles within it, making the entire frame rigid.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-400 mb-1">Without Braces</p>
                    <p className="text-xs text-white/70">
                      Rectangles distort freely under lateral load. The scaffold racks (leans) progressively
                      until it collapses. No lateral stability whatsoever.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-400 mb-1">With Braces</p>
                    <p className="text-xs text-white/70">
                      Diagonal braces triangulate the structure. Triangles are inherently rigid. The scaffold
                      resists lateral loads and maintains its rectangular geometry under all conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Guard Rails, Mid Rails & Toe Boards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">05</span>
            Guard Rails, Mid Rails &amp; Toe Boards
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Guard rails, mid rails, and toe boards together form the <strong>collective fall
                prevention system</strong> on a scaffold working platform. They protect workers from
                falling from the platform edge and prevent materials, tools, and debris from falling
                onto people below. These are <strong>not optional extras</strong> &mdash; they are
                legally required by the Work at Height Regulations 2005 (Schedule 3).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Guard Rail Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Guard rails must be positioned at a <strong>minimum height of 950 mm</strong> above
                      the working platform surface. This is the absolute minimum &mdash; a height of
                      1,000 mm or more is preferred where practicable.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      The guard rail must be a scaffold tube (or equivalent rigid barrier) capable of
                      withstanding the forces specified in BS EN 12811-1 &mdash; typically a horizontal
                      point load of at least 0.3 kN applied at any point along its length.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Guard rails are required on <strong>all open edges</strong> of the working platform
                      where a person could fall 2 metres or more. In practice, this means the outer edge
                      and both ends of every working platform, plus any internal openings (such as ladder
                      access points) that are not fitted with trap doors.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Mid Rail Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Mid rails are required to fill the gap between the top guard rail and the
                      toe board. The Work at Height Regulations specify that there must be
                      <strong> no unprotected gap exceeding 470 mm</strong> through which a person
                      could fall.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      With a guard rail at 950 mm and a toe board of 150 mm, the gap between the top
                      of the toe board and the bottom of the guard rail is 800 mm. A single mid rail
                      positioned approximately halfway (at about 470&ndash;500 mm above the platform)
                      ensures no gap exceeds the 470 mm maximum.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Without a mid rail, a worker who trips, stumbles, or is struck by an object could
                      fall <strong>through the 800 mm gap</strong> between the guard rail and the toe
                      board &mdash; particularly if they are bending down or in a crouching position.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Toe Board Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Toe boards must be a <strong>minimum of 150 mm high</strong>, measured from the
                      surface of the working platform. They are positioned at the outer edge of the
                      platform, tight against the scaffold boards.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Their primary purpose is to prevent <strong>materials, tools, and debris</strong>
                      from being kicked, knocked, or rolling off the platform edge and falling onto
                      people below. A falling brick or hammer can cause fatal injuries to a person at
                      ground level, even from a modest height.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Toe boards are typically made from scaffold boards stood on edge, proprietary
                      metal toe board clips, or purpose-made steel or aluminium toe board sections.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Brick Guards</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong>Brick guards</strong> (also called scaffold fans or debris netting panels)
                      are additional protection fitted above the toe boards, extending upward to the
                      guard rail height. They are required where there is a risk of materials falling
                      through the gap between the toe board and the guard rail &mdash; for example, on
                      scaffolds used for brickwork, where loose bricks, mortar, and tools are present
                      at platform level.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Brick guards are typically wire mesh panels or proprietary expanding metal panels
                      that clip to the inside of the standards between the toe board and the guard rail.
                      They allow air flow and visibility while preventing objects from passing through.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Collective Protection Hierarchy</p>
                </div>
                <p className="text-sm text-white/80">
                  Guard rails, mid rails, and toe boards are <strong>collective fall prevention
                  measures</strong>. This means they protect <strong>everyone</strong> on the platform
                  automatically, without requiring any action from the individual worker. They are higher
                  in the hierarchy of control than personal fall protection (harnesses and lanyards)
                  because they do not depend on the worker remembering to clip on, wearing equipment
                  correctly, or maintaining their PPE. Collective measures are always preferred over
                  personal measures under the Work at Height Regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Base Plates & Sole Boards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">06</span>
            Base Plates &amp; Sole Boards
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The foundation of any scaffold is only as good as what sits beneath the bottom of
                each standard. <strong>Base plates</strong> and <strong>sole boards</strong> are the
                critical components that transfer the scaffold&rsquo;s load safely into the ground.
                Inadequate foundations are one of the most common causes of scaffold failure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Base Plates</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Base plates are flat <strong>steel plates</strong> (typically 150 mm &times; 150 mm
                      or larger) with a central spigot that the bottom of the standard tube sits over.
                      They spread the concentrated point load from the standard over a larger area.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Every standard must have a base plate &mdash; <strong>no exceptions</strong>. Placing
                      a standard directly on the ground without a base plate concentrates the load on the
                      small cross-sectional area of the tube end (approximately 580 mm&sup2; for a 48.3 mm
                      tube with 4 mm wall), which would punch into almost any ground surface.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong>Adjustable base plates</strong> (screw jacks) incorporate a threaded stem
                      that allows the height to be adjusted. These are essential on <strong>uneven
                      ground</strong> where the ground surface is not level. The screw jack allows each
                      standard to be set to the correct height so that the first lift of ledgers is level,
                      without packing materials or shims (which can shift or crush under load).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Adjustable bases must not be extended beyond the manufacturer&rsquo;s maximum
                      extension &mdash; typically <strong>300 mm to 600 mm</strong>. Over-extension reduces
                      the effective load capacity and creates a buckling risk in the threaded stem.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Sole Boards</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Sole boards are <strong>timber planks</strong> (scaffold boards or purpose-cut
                      timber) placed on the ground beneath the base plates to distribute the load over
                      a still larger area of ground. They are essential on <strong>soft, unfinished,
                      or unpaved ground</strong> where the base plate alone would not spread the load
                      sufficiently.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      The sole board must be large enough to reduce the <strong>bearing pressure</strong>
                      (load per unit area) to a level the ground can safely support. On firm, compacted
                      ground, a single scaffold board beneath the base plate may suffice. On soft, wet,
                      or recently backfilled ground, much larger sole boards (or even concrete pads)
                      may be required.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Sole boards must be placed <strong>level</strong>. They must <strong>not be
                      stacked</strong> (one on top of another) to make up height differences &mdash;
                      stacked boards can slide apart under load. If the ground is uneven, the ground
                      should be levelled first, or adjustable base plates should be used.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      On some sites, a continuous sole board runs beneath two or more adjacent standards.
                      This provides additional stability and prevents differential settlement between
                      neighbouring standards.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Foundation Loading</p>
                </div>
                <p className="text-sm text-white/80">
                  The foundation beneath each standard must support the <strong>total scaffold
                  load</strong> at that point, including: the self-weight of the scaffold structure
                  above; the weight of all working platforms (boards); all stored materials on the
                  platforms; all workers (live load); wind loads transmitted through the scaffold; and
                  any dynamic loads from hoisting or materials handling. For a heavily loaded scaffold,
                  the load at the base of a single standard can be <strong>several tonnes</strong>.
                  This is why ground conditions must be assessed before erection begins, and the
                  foundation design must be adequate for the specific ground conditions encountered.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Couplers & Fittings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">07</span>
            Couplers &amp; Fittings
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Couplers and fittings are the <strong>connectors</strong> that hold scaffold tubes
                together. Every joint in a tube-and-fitting scaffold is made using a coupler, and the
                type of coupler used at each connection is critical to the scaffold&rsquo;s structural
                performance. Using the wrong coupler, or failing to tighten a coupler correctly,
                can lead to joint failure and scaffold collapse.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Coupler Types</p>
                <div className="space-y-3">
                  {[
                    {
                      name: "Right-Angle Coupler (Double Coupler)",
                      detail:
                        "Connects two scaffold tubes at exactly 90°. This is the primary structural coupler, used for ledger-to-standard connections, transom-to-ledger connections, and guard rail-to-standard connections. It has the highest safe working load (SWL) of any coupler — typically 6.25 kN in slip and 12.5 kN in shear for a steel coupler to BS EN 74. The two halves grip the tubes firmly and resist both vertical slip and horizontal rotation.",
                      colour: "text-slate-400",
                    },
                    {
                      name: "Swivel Coupler",
                      detail:
                        "Connects two scaffold tubes at any angle (not just 90°). It has two half-couplers connected by a central bolt that allows rotation. Used primarily for connecting diagonal braces to standards or ledgers, and for any other connection where tubes do not meet at right angles. The SWL is lower than a right-angle coupler — typically 6.25 kN in slip — because the swivel joint allows some rotation under load. Swivel couplers must never be substituted for right-angle couplers.",
                      colour: "text-slate-400",
                    },
                    {
                      name: "Putlog Coupler",
                      detail:
                        "A single half-coupler used to connect a putlog or transom to a ledger. One end of the putlog passes through the coupler, which then clamps it to the ledger tube. Putlog couplers have a lower SWL (typically 0.625 kN in slip) because they grip the tube on one side only. They are suitable for supporting working platform boards on putlog scaffolds but must not be relied upon for structural connections that experience significant loads.",
                      colour: "text-slate-400",
                    },
                    {
                      name: "Sleeve Coupler (Joint Pin / Spigot)",
                      detail:
                        "Joins two scaffold tubes end-to-end in a straight line, extending the effective length of a standard or ledger beyond a single tube length. The sleeve coupler fits inside both tube ends and is secured by a bolt. Joints in adjacent standards must be staggered (not at the same level) to maintain structural integrity. Sleeve joints should be positioned near a node point (close to a ledger level) and not in the middle of a span.",
                      colour: "text-slate-400",
                    },
                    {
                      name: "Band-and-Plate Fitting (Reveal Tie)",
                      detail:
                        "Used to tie the scaffold to the building structure. The band clamps around a scaffold tube, and the plate is fixed to the building wall using anchor bolts, wedges in window reveals, or other fixings. Band-and-plate fittings are critical for scaffold stability because they prevent the scaffold from pulling away from or moving towards the building under wind or other lateral loads. The spacing and pattern of ties must follow the scaffold designer's specification.",
                      colour: "text-slate-400",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className={`text-xs font-medium ${item.colour} mb-1`}>{item.name}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupler Types Reference Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">
                  Coupler Types Reference &mdash; Visual Guide
                </p>

                <div className="relative mx-auto max-w-2xl">
                  <div className="relative border-2 border-slate-500/40 rounded-lg bg-gradient-to-b from-slate-500/5 to-transparent">

                    {/* Right-Angle Coupler */}
                    <div className="border-b border-dashed border-slate-500/20 p-3 sm:p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Right-Angle Coupler</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center text-[10px] font-bold text-slate-400">1</span>
                          <span className="text-xs text-white/80">Two half-couplers bolted at exactly 90&deg;</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center text-[10px] font-bold text-slate-400">2</span>
                          <span className="text-xs text-white/80">Highest SWL: 6.25 kN slip / 12.5 kN shear</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center text-[10px] font-bold text-slate-400">3</span>
                          <span className="text-xs text-white/80">Used at: standard-ledger, ledger-transom joints</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center text-[10px] font-bold text-slate-400">4</span>
                          <span className="text-xs text-white/80">Primary structural coupler in all scaffolds</span>
                        </div>
                      </div>
                    </div>

                    {/* Swivel Coupler */}
                    <div className="border-b border-dashed border-slate-500/20 p-3 sm:p-4">
                      <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">Swivel Coupler</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">1</span>
                          <span className="text-xs text-white/80">Two half-couplers on a central pivot bolt</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">2</span>
                          <span className="text-xs text-white/80">Connects tubes at any angle (not just 90&deg;)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">3</span>
                          <span className="text-xs text-white/80">Used for: diagonal braces, raking shores, fans</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">4</span>
                          <span className="text-xs text-white/80">Lower SWL than right-angle &mdash; not interchangeable</span>
                        </div>
                      </div>
                    </div>

                    {/* Putlog Coupler */}
                    <div className="border-b border-dashed border-slate-500/20 p-3 sm:p-4">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">Putlog Coupler</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-400">1</span>
                          <span className="text-xs text-white/80">Single half-coupler gripping one tube</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-400">2</span>
                          <span className="text-xs text-white/80">Lowest SWL: 0.625 kN in slip</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-400">3</span>
                          <span className="text-xs text-white/80">Used for: connecting putlogs to ledgers</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-400">4</span>
                          <span className="text-xs text-white/80">Not for structural connections under high loads</span>
                        </div>
                      </div>
                    </div>

                    {/* Sleeve Coupler */}
                    <div className="border-b border-dashed border-slate-500/20 p-3 sm:p-4">
                      <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-3">Sleeve Coupler</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400">1</span>
                          <span className="text-xs text-white/80">Internal spigot joining two tube ends</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400">2</span>
                          <span className="text-xs text-white/80">Extends tubes in a straight line (end-to-end)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400">3</span>
                          <span className="text-xs text-white/80">Joints in adjacent standards must be staggered</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400">4</span>
                          <span className="text-xs text-white/80">Position near a node point, not mid-span</span>
                        </div>
                      </div>
                    </div>

                    {/* Band-and-Plate */}
                    <div className="p-3 sm:p-4">
                      <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-3">Band-and-Plate Fitting (Tie)</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[10px] font-bold text-rose-400">1</span>
                          <span className="text-xs text-white/80">Band clamps to scaffold tube, plate to wall</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[10px] font-bold text-rose-400">2</span>
                          <span className="text-xs text-white/80">Ties scaffold to the building for lateral stability</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[10px] font-bold text-rose-400">3</span>
                          <span className="text-xs text-white/80">Critical for wind resistance and pull-out loads</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[10px] font-bold text-rose-400">4</span>
                          <span className="text-xs text-white/80">Spacing and pattern per scaffold designer&rsquo;s spec</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-4 mt-4 justify-center">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-slate-500/30 border border-slate-500/50" />
                      <span className="text-[10px] text-white/50">Right-angle</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
                      <span className="text-[10px] text-white/50">Swivel</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-blue-500/30 border border-blue-500/50" />
                      <span className="text-[10px] text-white/50">Putlog</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
                      <span className="text-[10px] text-white/50">Sleeve</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500/30 border border-rose-500/50" />
                      <span className="text-[10px] text-white/50">Band-and-plate</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Tightening Torque</p>
                </div>
                <p className="text-sm text-white/80">
                  All scaffold couplers must be tightened to the correct <strong>torque</strong>.
                  Under-tightened couplers can slip under load, causing joints to fail. Over-tightened
                  couplers can damage the tube surface (creating stress concentrations) or strip the bolt
                  threads. The standard tightening torque for scaffold couplers is typically
                  <strong> 40&ndash;50 Nm</strong>. Site operatives should use a torque wrench or at the
                  very least a scaffold spanner of the correct length (which limits the applied torque by
                  the leverage available). A simple test is that the coupler should be tight enough that
                  it cannot be turned by hand, but should not require excessive force with the spanner.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Boards, Hop-ups & Access */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Boards, Hop-ups &amp; Access
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The working platform is what the scaffold ultimately exists to provide. It must be
                safe, stable, and adequate for the work being carried out. The platform is formed
                from <strong>scaffold boards</strong> supported on transoms or putlogs, with
                appropriate access arrangements for workers to reach it safely.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Scaffold Board Specifications</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-400 mb-2">Dimensions &amp; Material</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Standard thickness: <strong>38 mm</strong> (nominal)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Standard width: <strong>225 mm</strong> (nominal)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Available lengths: 2.4 m, 3.0 m, 3.9 m (most common)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Material: graded softwood to BS 2482 or metal decking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Metal end bands prevent splitting at the board ends</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-400 mb-2">Loading &amp; Span Rules</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Maximum unsupported span: <strong>3.9 m</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Boards must rest on at least <strong>3 supports</strong> if spanning more than 1.2 m</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Minimum overlap on supports: <strong>50 mm</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Maximum gap between boards: <strong>25 mm</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Reject: split, warped, knotted, or painted boards</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Overhang Rule</p>
                <p className="text-sm text-white/80 mb-3">
                  Scaffold boards must <strong>not overhang their end supports</strong> by more than
                  <strong> four times their thickness</strong> or <strong>150 mm</strong>, whichever is
                  the lesser distance. For a standard 38 mm board, four times the thickness equals 152 mm,
                  so the governing limit is <strong>150 mm</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-400 mb-1">Excessive Overhang &mdash; Danger</p>
                    <p className="text-xs text-white/70">
                      If a board overhangs too far beyond the last transom, a worker stepping on the
                      overhanging end acts as the effort on a lever. The support transom becomes the
                      fulcrum, and the other end of the board tips upward &mdash; potentially throwing
                      the worker off or creating a trip hazard for others. This see-saw effect has
                      caused serious falls.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-400 mb-1">Board Clips &mdash; Prevention</p>
                    <p className="text-xs text-white/70">
                      <strong>Board clips</strong> (also called board retaining clips or board clamps)
                      are fitted at each end of the scaffold board to prevent displacement by wind uplift,
                      accidental impact, or the see-saw effect. They clip over the transom and hold the
                      board down securely. Board clips are essential on all working platforms, particularly
                      at exposed and elevated positions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Access Arrangements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong>Internal ladders</strong> are the most common form of access between scaffold
                      lifts. They must extend at least <strong>1 metre above the platform level</strong>
                      they serve (to provide a handhold when stepping off), be set at the correct angle
                      (approximately 75° or 4:1 ratio), and be securely tied or clipped to prevent
                      slipping.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong>Trap doors</strong> (also called access hatches) are openings in the working
                      platform through which ladders pass. The trap door is a hinged section of the
                      platform that can be opened to climb through and then closed to complete the
                      platform and prevent falls through the opening. Self-closing trap doors are
                      preferred because they close automatically when released.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong>Internal stairways</strong> (scaffold staircases) provide a safer and more
                      ergonomic alternative to ladders, particularly for scaffolds that will be in use
                      for extended periods or where workers need to carry materials up to the working
                      platform. Stairways are wider, have handrails on both sides, and allow workers
                      to maintain three points of contact while ascending and descending.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong>Ladder beams</strong> are proprietary aluminium beams with integral rungs
                      that serve as both a structural beam (replacing a transom) and a means of access.
                      They are commonly used in system scaffolding where the ladder beam spans between
                      two standards and provides both platform support and a built-in ladder.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Hop-ups</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      A <strong>hop-up</strong> is a small, portable working platform used to provide
                      additional height within a scaffold bay &mdash; typically when the worker needs to
                      reach slightly higher than the main working platform allows without raising the
                      entire platform to the next lift level.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Hop-ups must be stable, level, and have a platform area large enough for the worker
                      to stand on safely. They must not be improvised from stacked materials (bricks,
                      blocks, buckets) &mdash; only purpose-designed hop-up brackets or platforms should
                      be used.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      The height of the hop-up above the main platform is typically limited to
                      approximately <strong>600 mm</strong>. If the required working height is greater
                      than this, the scaffold design should be adjusted (e.g. by adding an intermediate
                      lift) rather than using increasingly tall hop-ups.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Board Inspection</p>
                </div>
                <p className="text-sm text-white/80">
                  Scaffold boards must be inspected before each use. Reject any board that is
                  <strong> split, cracked, warped, twisted, excessively knotted, rotted, or has been
                  painted</strong> (paint conceals defects). Check that the metal end bands are intact
                  and securely fixed &mdash; a board without end bands is liable to split lengthways
                  under load. Boards must be stored flat and off the ground to prevent warping and
                  moisture damage. Damaged boards must be removed from service immediately and marked
                  for disposal or repair.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scaffold Component Diagram */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-6 text-center">
              Scaffold Component Diagram &mdash; Labelled Elevation
            </p>

            <div className="relative mx-auto max-w-3xl">
              <div className="relative border-2 border-slate-500/40 rounded-lg bg-gradient-to-b from-slate-500/5 to-transparent">

                {/* Top Lift — Guard Rails & Platform */}
                <div className="border-b border-dashed border-slate-500/20 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Top Lift &mdash; Edge Protection &amp; Working Platform</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">G</span>
                      <span className="text-xs text-white/80"><strong>Guard rail</strong> &mdash; min 950 mm above platform</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">M</span>
                      <span className="text-xs text-white/80"><strong>Mid rail</strong> &mdash; no gap &gt; 470 mm</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-400">T</span>
                      <span className="text-xs text-white/80"><strong>Toe board</strong> &mdash; min 150 mm high</span>
                    </div>
                  </div>
                </div>

                {/* Main Structure */}
                <div className="border-b border-dashed border-slate-500/20 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Main Structure &mdash; Primary Members</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center text-[10px] font-bold text-slate-400">S</span>
                      <span className="text-xs text-white/80"><strong>Standards</strong> &mdash; vertical tubes carrying load to ground</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400">L</span>
                      <span className="text-xs text-white/80"><strong>Ledgers</strong> &mdash; horizontal tubes running along length</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-400">X</span>
                      <span className="text-xs text-white/80"><strong>Transoms</strong> &mdash; horizontal tubes running across width</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[10px] font-bold text-rose-400">B</span>
                      <span className="text-xs text-white/80"><strong>Braces</strong> &mdash; diagonal tubes preventing racking</span>
                    </div>
                  </div>
                </div>

                {/* Working Platform */}
                <div className="border-b border-dashed border-slate-500/20 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Working Platform Level</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[10px] font-bold text-yellow-400">P</span>
                      <span className="text-xs text-white/80"><strong>Scaffold boards</strong> &mdash; 38 mm thick, 225 mm wide, max 3.9 m span</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-[10px] font-bold text-cyan-400">C</span>
                      <span className="text-xs text-white/80"><strong>Board clips</strong> &mdash; prevent displacement by wind or impact</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[10px] font-bold text-orange-400">A</span>
                      <span className="text-xs text-white/80"><strong>Trap door</strong> &mdash; access hatch for ladders at platform level</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-[10px] font-bold text-teal-400">D</span>
                      <span className="text-xs text-white/80"><strong>Ladder</strong> &mdash; extends 1 m above platform, tied securely</span>
                    </div>
                  </div>
                </div>

                {/* Foundation */}
                <div className="p-3 sm:p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Foundation Level</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] font-bold text-emerald-400">F</span>
                      <span className="text-xs text-white/80"><strong>Base plates</strong> &mdash; spread standard load</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-lime-500/20 border border-lime-500/40 flex items-center justify-center text-[10px] font-bold text-lime-400">W</span>
                      <span className="text-xs text-white/80"><strong>Sole boards</strong> &mdash; distribute load on ground</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-[10px] font-bold text-pink-400">J</span>
                      <span className="text-xs text-white/80"><strong>Adjustable base</strong> &mdash; screw jack for levelling</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 mt-4 justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-500/30 border border-slate-500/50" />
                  <span className="text-[10px] text-white/50">Structure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                  <span className="text-[10px] text-white/50">Edge protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                  <span className="text-[10px] text-white/50">Platform</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
                  <span className="text-[10px] text-white/50">Foundation</span>
                </div>
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
          title="Section 3 Knowledge Check"
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
            <Link to="../scaffolding-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-1-section-4">
              Next: Who Does What?
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
