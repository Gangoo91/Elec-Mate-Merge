import { ArrowLeft, ShieldCheck, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Bracing, Ties & Stability – Scaffold Components & Assembly (Scaffolding Awareness Module 3 Section 4)";
const DESCRIPTION =
  "Why bracing matters, ledger bracing, plan bracing, facade bracing, tie types (box, lip, through, reveal), tie patterns and spacing, anchor testing, sheeting and netting effects on wind loading, and buttressing.";

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the primary purpose of bracing in a scaffold structure?",
    options: [
      "To provide somewhere to hang tools",
      "To prevent racking (parallelogram distortion) and maintain the scaffold's geometry",
      "To create additional working platforms",
      "To reduce the number of ties required",
    ],
    correctAnswer: 1,
    explanation:
      "Bracing prevents racking — the tendency of the scaffold to distort into a parallelogram shape under lateral forces. Without adequate bracing the scaffold cannot maintain its square geometry and may collapse sideways.",
  },
  {
    id: 2,
    question:
      "In a tube and fitting scaffold, ledger bracing (face bracing) is positioned:",
    options: [
      "Horizontally between adjacent standards in the same lift",
      "Diagonally across the face of the scaffold, connecting a standard at one lift to the next standard at the lift above",
      "Across the width of the scaffold between inner and outer standards",
      "Only at the base of the scaffold",
    ],
    correctAnswer: 1,
    explanation:
      "Ledger bracing (also called face bracing or facade bracing) runs diagonally across the face of the scaffold. It connects a standard at one lift level to the adjacent standard at the next lift level, forming a triangulated pattern that resists lateral movement in the plane of the scaffold face.",
  },
  {
    id: 3,
    question: "What is the general rule for tie spacing on a standard independent scaffold?",
    options: [
      "Every standard at every lift",
      "Every other standard at every other lift (a staggered diamond pattern)",
      "Ties are only needed at the top lift",
      "One tie per bay is sufficient regardless of height",
    ],
    correctAnswer: 1,
    explanation:
      "The general rule is that ties are required at every other standard at every other lift, creating a staggered diamond pattern across the face of the scaffold. This provides adequate restraint under normal conditions. Closer spacing is required for loaded scaffolds, sheeted scaffolds, or those exposed to higher wind loads.",
  },
  {
    id: 4,
    question: "A box tie secures the scaffold to the building by:",
    options: [
      "Bolting a plate directly to the facade",
      "Wrapping a tube around a structural member inside the opening (e.g. a window reveal) and connecting back to the scaffold with a tie tube",
      "Drilling a through-bolt all the way through the wall",
      "Using adhesive pads on the external surface",
    ],
    correctAnswer: 1,
    explanation:
      "A box tie uses a short tube (the cross tube or box tube) placed inside a window or door opening, bearing against the reveals. A tie tube then connects this cross tube back to the scaffold ledger or standard. The arrangement 'boxes' around the structural opening, providing both push and pull restraint.",
  },
  {
    id: 5,
    question:
      "What is the minimum proof-load test requirement for a scaffold tie in a tube and fitting scaffold?",
    options: [
      "2.5 kN",
      "4.0 kN",
      "6.25 kN",
      "10.0 kN",
    ],
    correctAnswer: 2,
    explanation:
      "For tube and fitting scaffolds, each tie must be capable of withstanding a proof-load test of at least 6.25 kN (approximately 625 kg). This is the minimum standard set by TG20 guidance. Ties should be tested at installation and re-tested if there is any doubt about their integrity.",
  },
  {
    id: 6,
    question:
      "What effect does adding sheeting or netting to a scaffold have on wind loading?",
    options: [
      "No effect — sheeting is purely cosmetic",
      "It significantly increases the wind load on the scaffold because the sheeting acts as a sail, requiring closer tie spacing and additional bracing",
      "It reduces wind loading by deflecting the wind away from the scaffold",
      "It only affects the scaffold if wind speed exceeds 50 mph",
    ],
    correctAnswer: 1,
    explanation:
      "Sheeting and netting dramatically increase the wind load acting on the scaffold. Sheeting can increase wind forces by three to five times compared to an open scaffold. This increased load must be accounted for by increasing the number of ties, reducing tie spacing, adding extra bracing, and ensuring the foundation can handle the additional overturning forces.",
  },
  {
    id: 7,
    question: "Plan bracing in a scaffold is positioned:",
    options: [
      "Vertically up the face of the scaffold",
      "Horizontally in the plane of the ledgers, running diagonally between inner and outer standards",
      "Only at the top of the scaffold",
      "Between the scaffold and the building facade",
    ],
    correctAnswer: 1,
    explanation:
      "Plan bracing is installed horizontally in the plane of the ledgers. It runs diagonally between the inner and outer rows of standards, triangulating the scaffold in the horizontal plane to resist twisting and lateral forces acting across the width of the scaffold.",
  },
  {
    id: 8,
    question: "A buttress (raker) is typically used when:",
    options: [
      "The scaffold is less than 4 metres tall",
      "The building facade cannot accept ties, so the scaffold must be stabilised by angled tubes braced back to ground level",
      "The scaffold is sheeted and the wind speed is low",
      "Only on system scaffolds, never on tube and fitting",
    ],
    correctAnswer: 1,
    explanation:
      "Buttresses (rakers) are used when the building facade cannot accept ties — for example, on a new-build steel frame before cladding is fitted, or on a heritage building where drilling is prohibited. Rakers are angled tubes running from the scaffold down to ground level, effectively replacing the restraint that ties would normally provide.",
  },
];

const quickCheckQuestions = [
  {
    id: "bracing-types",
    question:
      "A scaffold has diagonal tubes running across its face connecting standards at different lift levels. It also has diagonal tubes running horizontally between the inner and outer rows of standards. Name the two types of bracing described.",
    options: [
      "Box bracing and reveal bracing",
      "Ledger bracing (face bracing) and plan bracing",
      "Through bracing and lip bracing",
      "Facade bracing and buttress bracing",
    ],
    correctIndex: 1,
    explanation:
      "The diagonal tubes across the face of the scaffold are ledger bracing (face bracing). The diagonal tubes running horizontally between the inner and outer standard rows are plan bracing. Together they triangulate the scaffold in both planes — preventing racking along the face and twisting across the width.",
  },
  {
    id: "tie-pattern",
    question:
      "On an independent tied scaffold, ties are fitted at lifts 2, 4, and 6 on standards 1, 3, and 5, and at lifts 3 and 5 on standards 2 and 4. What pattern does this describe?",
    options: [
      "Every standard at every lift",
      "A staggered (diamond) pattern — every other standard at every other lift",
      "A random pattern chosen by the scaffolder",
      "A single row of ties at mid-height",
    ],
    correctIndex: 1,
    explanation:
      "This describes the standard staggered diamond tie pattern — ties at every other standard on every other lift, with adjacent rows offset. This is the general rule for standard independent scaffolds under normal loading conditions.",
  },
  {
    id: "sheeting-effect",
    question:
      "A scaffold is to be fully sheeted with debris netting. Compared to an open scaffold, what must be done to the tie pattern?",
    options: [
      "No change is needed",
      "Ties can be reduced because netting holds the scaffold in place",
      "Tie spacing must be reduced (more ties fitted) because sheeting increases wind loading significantly",
      "Only the top row of ties needs to be doubled",
    ],
    correctIndex: 2,
    explanation:
      "Sheeting and netting dramatically increase the wind load on a scaffold. The tie pattern must be made much closer — often every standard at every lift — to resist the increased overturning forces. The scaffold design must be recalculated by a competent person to account for the additional wind loading.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between a box tie and a through tie?",
    answer:
      "A box tie uses a cross tube placed inside a window or door opening, bearing against the internal reveals, with a tie tube connecting back to the scaffold. It provides push and pull restraint without penetrating the building fabric. A through tie passes a bolt or tube completely through the wall (typically through a pre-drilled hole or an existing opening) and is secured on the inside face with a plate or washer. Through ties provide the strongest restraint but require holes in the building fabric, which may not be acceptable on heritage or finished buildings.",
  },
  {
    question:
      "How are scaffold ties tested and what is the minimum load?",
    answer:
      "Scaffold ties in tube and fitting scaffolds must be capable of withstanding a proof-load of at least 6.25 kN. Testing is carried out using a calibrated pull-test device (scaffold tie tester) attached to the tie tube. A controlled force is applied and gradually increased to confirm the tie can resist the required load without movement or failure. Ties should be tested at installation and re-tested periodically, or if there is any doubt about their integrity — for example after a storm or if building work near the tie has disturbed the fixing.",
  },
  {
    question:
      "Why is bracing so important if the scaffold already has ties?",
    answer:
      "Ties and bracing serve different but complementary functions. Ties anchor the scaffold to the building to prevent it pulling away or being pushed inward. Bracing triangulates the scaffold structure itself to prevent racking (parallelogram distortion). A scaffold with ties but no bracing could still collapse sideways as the rectangular bays distort. A scaffold with bracing but no ties could pull away from the building. Both are essential — ties restrain movement relative to the building, while bracing maintains the scaffold's own internal geometry.",
  },
  {
    question:
      "Can I use reveal ties instead of box ties?",
    answer:
      "Reveal ties (also called lip ties) can be used where the window or door reveal provides a suitable bearing surface and the reveal depth is adequate. However, they provide restraint in one direction only (typically pull restraint). A reveal tie alone does not resist pushing forces away from the building. For this reason, reveal ties must often be used in combination with a return tube or other arrangement to provide both push and pull restraint. The TG20 guidance should be consulted to confirm the tie arrangement is adequate for the specific scaffold configuration.",
  },
];

const ScaffoldingAwarenessModule3Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <ShieldCheck className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Bracing, Ties & Stability
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How bracing prevents racking, the different bracing types, tie arrangements that anchor
            the scaffold to the building, proof-load testing, and the effects of sheeting on wind loading
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-400/50">
            <p className="text-slate-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span><strong>Bracing:</strong> Triangulates the scaffold to prevent racking (parallelogram collapse)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span><strong>Ties:</strong> Anchor the scaffold to the building — push and pull restraint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span><strong>Pattern:</strong> Every other standard at every other lift (general rule)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span><strong>Testing:</strong> Minimum 6.25 kN proof-load for tube and fitting ties</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span><strong>Sheeting:</strong> Massively increases wind load — closer ties needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span><strong>Buttresses:</strong> Used when ties to the building are not possible</span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-400/50">
            <p className="text-slate-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span><strong>Spot:</strong> Diagonal tubes across the scaffold face (ledger bracing) and between inner/outer rows (plan bracing)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span><strong>Identify:</strong> Tie tubes running from the scaffold into the building at regular intervals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span><strong>Never:</strong> Remove a tie or brace without authorisation from the scaffold supervisor</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 01: Introduction — Why Bracing Matters */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Why Bracing Matters
          </h2>
          <div className="space-y-4 text-white">
            <p>
              A scaffold without bracing is like a bookshelf without a back panel. The rectangular
              bays formed by standards and ledgers have no inherent resistance to lateral forces.
              Push the top of an un-braced scaffold sideways and every bay distorts into a
              parallelogram — this is called <strong>racking</strong>. Once racking begins, the
              distortion accelerates under the scaffold's own weight and the structure collapses
              sideways in seconds.
            </p>
            <p>
              Bracing provides <strong>triangulation</strong>. A triangle is the only polygon that
              cannot be distorted without changing the length of its sides. By adding diagonal
              members across the rectangular scaffold bays, the structure is converted from a series
              of rectangles (which can rack) into a series of triangles (which cannot). This is the
              fundamental engineering principle behind all scaffold bracing.
            </p>

            <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Racking: The Invisible Killer
              </h3>
              <ul className="text-white space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span><strong>Progressive failure:</strong> Racking starts slowly but accelerates — by the time anyone notices, collapse is imminent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span><strong>Wind is the main cause:</strong> Even moderate wind applies sustained lateral force across the full height of the scaffold</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span><strong>Loading matters:</strong> A loaded scaffold with materials on the platforms is heavier and generates greater racking force</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span><strong>Missing braces:</strong> Removing even one brace can create a weak point that allows the entire scaffold to rack</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Types of Bracing */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">02</span>
              Types of Bracing
            </h2>
            <div className="space-y-4 text-white">
              <p>
                There are three principal types of bracing used in tube and fitting scaffolds.
                Each resists forces in a different plane and all three may be needed on a given
                scaffold depending on its height, loading, and exposure.
              </p>

              {/* Ledger Bracing */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-slate-300">
                  Ledger Bracing (Face Bracing / Facade Bracing)
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Position:</strong> Runs diagonally across the face of the scaffold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Connection:</strong> Connects a standard at one lift to the next standard at the lift above (or below)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Resists:</strong> Lateral movement along the length of the scaffold (prevents the face from racking)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Pattern:</strong> Continuous zigzag across the face, typically in every other bay or as the design requires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Coupler:</strong> Fixed with swivel couplers to the standards at each end</span>
                  </li>
                </ul>
              </div>

              {/* Plan Bracing */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-slate-300">Plan Bracing</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Position:</strong> Runs diagonally in the horizontal plane (the plan view), between inner and outer standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Connection:</strong> Connects the inner standard of one bay to the outer standard of the next bay at the same lift level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Resists:</strong> Twisting and lateral forces acting across the width of the scaffold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Where needed:</strong> At the top and bottom of the scaffold as a minimum, and at intermediate levels on taller scaffolds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Note:</strong> Plan bracing is installed at ledger level and can obstruct the working platform, so its placement must be coordinated with access requirements</span>
                  </li>
                </ul>
              </div>

              {/* Facade Bracing Patterns */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-slate-300">Facade Bracing Patterns</h3>
                <p className="text-sm text-white/80 mb-3">
                  The arrangement of ledger bracing across the face of the scaffold follows established
                  patterns depending on the scaffold configuration and loading.
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Zigzag pattern:</strong> The most common — a continuous diagonal that reverses direction at each lift, creating a zigzag across the full height of each braced bay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Cross bracing (X-bracing):</strong> Two diagonals crossing in the same bay — provides the strongest resistance but uses more tube and can obstruct access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>N-bracing:</strong> A single diagonal per bay in the same direction — weaker than zigzag but used where obstructions prevent alternating diagonals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Full-face coverage:</strong> Bracing must be continuous from the base to the top of the scaffold without gaps — a missing section creates a hinge point</span>
                  </li>
                </ul>
              </div>

              {/* Diagram: Bracing Arrangement */}
              <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-slate-300 mb-4 text-center">
                  Bracing Arrangement — Three Types
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Ledger Bracing Diagram */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/10">
                    <p className="text-xs text-slate-400 font-semibold text-center mb-3 uppercase tracking-wider">
                      Ledger (Face) Bracing
                    </p>
                    <div className="relative w-full aspect-[3/4] mx-auto max-w-[160px]">
                      {/* Standards (vertical lines) */}
                      <div className="absolute left-[20%] top-0 bottom-0 w-[2px] bg-white/60" />
                      <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-white/60" />
                      <div className="absolute left-[80%] top-0 bottom-0 w-[2px] bg-white/60" />
                      {/* Ledgers (horizontal lines) */}
                      <div className="absolute left-[20%] right-[20%] top-[5%] h-[2px] bg-white/60" />
                      <div className="absolute left-[20%] right-[20%] top-[35%] h-[2px] bg-white/60" />
                      <div className="absolute left-[20%] right-[20%] top-[65%] h-[2px] bg-white/60" />
                      <div className="absolute left-[20%] right-[20%] top-[95%] h-[2px] bg-white/60" />
                      {/* Diagonal braces (zigzag) */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 133" preserveAspectRatio="none">
                        <line x1="20" y1="7" x2="50" y2="47" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="50" y1="47" x2="20" y2="87" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="50" y1="7" x2="80" y2="47" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="80" y1="47" x2="50" y2="87" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="20" y1="87" x2="50" y2="127" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="50" y1="87" x2="80" y2="127" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                      </svg>
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/50 text-center mt-2">
                      Diagonal across face (zigzag)
                    </p>
                  </div>

                  {/* Plan Bracing Diagram */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/10">
                    <p className="text-xs text-slate-400 font-semibold text-center mb-3 uppercase tracking-wider">
                      Plan Bracing
                    </p>
                    <div className="relative w-full aspect-[3/4] mx-auto max-w-[160px]">
                      {/* Outer rectangle (plan view) */}
                      <div className="absolute left-[10%] right-[10%] top-[10%] bottom-[10%] border-2 border-white/60" />
                      {/* Inner horizontal divisions (bays) */}
                      <div className="absolute left-[10%] right-[10%] top-[37%] h-[2px] bg-white/60" />
                      <div className="absolute left-[10%] right-[10%] top-[64%] h-[2px] bg-white/60" />
                      {/* Plan bracing diagonals */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 133" preserveAspectRatio="none">
                        <line x1="10" y1="13" x2="90" y2="49" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="90" y1="49" x2="10" y2="85" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="10" y1="85" x2="90" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                      </svg>
                      {/* Labels */}
                      <span className="absolute left-[12%] top-[1%] text-[8px] text-white/40">INNER</span>
                      <span className="absolute right-[12%] top-[1%] text-[8px] text-white/40">OUTER</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/50 text-center mt-2">
                      Horizontal plane (bird's eye)
                    </p>
                  </div>

                  {/* Cross Bracing Diagram */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/10">
                    <p className="text-xs text-slate-400 font-semibold text-center mb-3 uppercase tracking-wider">
                      Cross (X) Bracing
                    </p>
                    <div className="relative w-full aspect-[3/4] mx-auto max-w-[160px]">
                      {/* Standards */}
                      <div className="absolute left-[20%] top-0 bottom-0 w-[2px] bg-white/60" />
                      <div className="absolute left-[80%] top-0 bottom-0 w-[2px] bg-white/60" />
                      {/* Ledgers */}
                      <div className="absolute left-[20%] right-[20%] top-[5%] h-[2px] bg-white/60" />
                      <div className="absolute left-[20%] right-[20%] top-[35%] h-[2px] bg-white/60" />
                      <div className="absolute left-[20%] right-[20%] top-[65%] h-[2px] bg-white/60" />
                      <div className="absolute left-[20%] right-[20%] top-[95%] h-[2px] bg-white/60" />
                      {/* X braces */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 133" preserveAspectRatio="none">
                        <line x1="20" y1="7" x2="80" y2="47" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="80" y1="7" x2="20" y2="47" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="20" y1="47" x2="80" y2="87" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="80" y1="47" x2="20" y2="87" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="20" y1="87" x2="80" y2="127" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="80" y1="87" x2="20" y2="127" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                      </svg>
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/50 text-center mt-2">
                      Two diagonals per bay (strongest)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Tie Types */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">03</span>
              Tie Types
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Ties anchor the scaffold to the building. Without ties, wind and working loads would
                push the scaffold away from the facade or pull it inward. Every tied scaffold must
                provide both <strong>push restraint</strong> (preventing the scaffold from bearing
                against the building) and <strong>pull restraint</strong> (preventing it from pulling
                away). Different tie types achieve this in different ways.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Box Ties */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 text-slate-300">Box Ties</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>How it works:</strong> A short cross tube is placed inside a window or door opening, bearing against the inner faces of both reveals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Connection:</strong> A tie tube connects the cross tube back to the nearest scaffold standard or ledger using right-angle couplers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Restraint:</strong> Provides both push and pull restraint — the cross tube prevents the scaffold moving in either direction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Advantage:</strong> No penetration of the building fabric required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Limitation:</strong> Requires a suitable opening (window, door) with adequate reveals</span>
                    </li>
                  </ul>
                </div>

                {/* Lip Ties (Reveal Ties) */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 text-slate-300">Lip Ties (Reveal Ties)</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>How it works:</strong> A reveal pin or screw jack is extended between the internal faces of a window reveal, gripping by friction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Connection:</strong> A tie tube runs from the reveal pin back to the scaffold standard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Restraint:</strong> Primarily pull restraint only — a separate arrangement is often needed for push restraint</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Advantage:</strong> Quick to install, no drilling required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Limitation:</strong> Only as strong as the reveal material — can fail if mortar is weak or the reveal crumbles</span>
                    </li>
                  </ul>
                </div>

                {/* Through Ties */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 text-slate-300">Through Ties</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>How it works:</strong> A bolt, tube, or anchor passes completely through the wall and is secured on the internal face with a plate, washer, and nut</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Connection:</strong> The external end connects to the scaffold via a tie tube and right-angle coupler</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Restraint:</strong> Provides very strong push and pull restraint — the most reliable tie type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Advantage:</strong> Strongest tie type with predictable load capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Limitation:</strong> Requires drilling through the wall, which may not be acceptable on heritage or finished buildings</span>
                    </li>
                  </ul>
                </div>

                {/* Reveal Ties (alternative arrangement) */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 text-slate-300">Reveal Ties (Cast-In / Anchor Bolt)</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>How it works:</strong> A chemical or mechanical anchor bolt is drilled into the facade and a ring bolt or eye bolt is fixed flush to the wall</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Connection:</strong> A tie tube or wire connects the anchor point to the scaffold standard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Restraint:</strong> Provides pull restraint; a separate packing tube against the wall provides push restraint</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Advantage:</strong> Can be positioned exactly where needed — not dependent on openings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Limitation:</strong> Requires drilling into the facade and the anchor must be tested to confirm pull-out resistance in the specific substrate</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Tie Patterns and Spacing */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">04</span>
              Tie Patterns & Spacing
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The number and spacing of ties is determined by the scaffold designer based on the
                TG20 guidance or a specific design calculation. However, there is a well-established
                general rule for standard independent scaffolds under normal loading conditions.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-slate-300">
                  The General Rule: Every Other Standard at Every Other Lift
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  For a standard independent scaffold (not sheeted, not heavily loaded), ties are required
                  at every other standard on every other lift, arranged in a staggered (diamond) pattern.
                  This means the tie positions on adjacent tied lifts are offset so that no two ties are
                  directly above each other.
                </p>
              </div>

              {/* Tie Pattern Diagram */}
              <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-slate-300 mb-4 text-center">
                  Tie Pattern Layout — Staggered Diamond
                </h3>
                <div className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 border border-white/10 overflow-x-auto">
                  <div className="min-w-[320px] max-w-[480px] mx-auto">
                    {/* Grid labels */}
                    <div className="flex items-center mb-1">
                      <span className="w-12 text-[10px] text-white/40 text-right pr-2">Lift</span>
                      <div className="flex-1 grid grid-cols-6 gap-0">
                        {["Std 1", "Std 2", "Std 3", "Std 4", "Std 5", "Std 6"].map((label) => (
                          <span key={label} className="text-[9px] sm:text-[10px] text-white/40 text-center">{label}</span>
                        ))}
                      </div>
                    </div>

                    {/* Lift rows */}
                    {[
                      { lift: 6, ties: [true, false, true, false, true, false] },
                      { lift: 5, ties: [false, true, false, true, false, true] },
                      { lift: 4, ties: [true, false, true, false, true, false] },
                      { lift: 3, ties: [false, true, false, true, false, true] },
                      { lift: 2, ties: [true, false, true, false, true, false] },
                      { lift: 1, ties: [false, false, false, false, false, false] },
                    ].map((row) => (
                      <div key={row.lift} className="flex items-center mb-1">
                        <span className="w-12 text-[10px] text-white/40 text-right pr-2">{row.lift}</span>
                        <div className="flex-1 grid grid-cols-6 gap-0">
                          {row.ties.map((hasTie, idx) => (
                            <div key={idx} className="flex items-center justify-center h-8">
                              <div className="relative w-[2px] h-full bg-white/30">
                                {hasTie && (
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-400 border-2 border-slate-300 flex items-center justify-center">
                                    <span className="text-[7px] font-bold text-[#1a1a1a]">T</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-slate-400 border border-slate-300" />
                        <span className="text-[10px] text-white/50">Tie position</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-[2px] h-3 bg-white/30" />
                        <span className="text-[10px] text-white/50">Standard</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/50 text-center mt-3">
                  Ties staggered at every other standard on every other lift. Lift 1 is typically below the first tie level.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-300">When Closer Spacing Is Required</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Sheeted or netted scaffolds:</strong> Every standard at every lift (or as designed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Loaded scaffolds:</strong> Heavy-duty scaffolds carrying materials or masonry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Tall scaffolds:</strong> Greater height means greater wind force at the top</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Exposed locations:</strong> Coastal sites, hilltop sites, or open areas with high wind exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Cantilever scaffolds:</strong> Where the scaffold extends beyond the face of the building</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-300">Critical Tie Rules</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>First tie:</strong> Must be positioned as close to the base as practicable — typically at lift 2</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Top tie:</strong> The top lift must always have ties — the top of a scaffold experiences the greatest wind force</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Return ties:</strong> At each end of the scaffold and at any change of direction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Never remove:</strong> Ties must not be removed without authorisation and an alternative restraint being provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Marked:</strong> Tie positions should be clearly marked on the scaffold design drawing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Anchor Testing */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">05</span>
              Anchor Testing
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A tie is only as strong as its weakest point — and the weakest point is usually the
                anchor to the building. Mortar joints deteriorate, brickwork varies in strength, and
                concrete quality is inconsistent. For this reason, scaffold ties must be tested to
                confirm they can withstand the design load.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-slate-300">Proof-Load Testing Requirements</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Minimum load:</strong> 6.25 kN (approximately 625 kg) for tube and fitting scaffolds — this is the TG20 standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Testing equipment:</strong> A calibrated scaffold tie tester (pull-test device) is attached to the tie tube</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Method:</strong> A controlled pulling force is applied gradually and increased to the proof-load value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Pass criteria:</strong> The tie must resist the full proof-load without any movement, slip, or failure at the anchor point</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Fail action:</strong> If a tie fails the test, it must be repositioned or an alternative anchor method used</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-300">When to Test</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>At installation:</strong> Every tie should be tested when first fixed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>After disturbance:</strong> If building work near the tie has disturbed the anchor (e.g. pointing, rendering, demolition)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>After weather events:</strong> Storms or sustained high winds may have stressed the ties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Periodic checks:</strong> As part of the regular scaffold inspection regime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Doubt:</strong> Whenever there is any reason to question the integrity of a tie</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-300">Substrate Considerations</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Dense concrete:</strong> Generally provides the strongest anchor — chemical or expansion bolts can achieve high pull-out values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Engineering brickwork:</strong> Strong substrate — test to confirm, as mortar quality varies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Common brickwork:</strong> Variable — older lime mortar joints can be very weak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Blockwork:</strong> Hollow blocks are unreliable — anchors may pull through</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Cladding / render:</strong> Never anchor to cladding panels or render alone — always fix into the structural substrate beneath</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Untested Ties
                </h3>
                <p className="text-white text-sm">
                  An untested tie is an unknown quantity. It may hold 10 kN or it may fail at 1 kN. Many
                  scaffold collapses have been traced back to ties that looked correct but were anchored into
                  weak mortar, hollow blockwork, or deteriorated concrete. Testing is the only way to confirm
                  a tie will perform when it matters. On a sheeted scaffold in a storm, every single tie is
                  under serious load — and one failure can cascade into total collapse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Sheeting, Netting & Wind Loading */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">06</span>
              Sheeting, Netting & Wind Loading
            </h2>
            <div className="space-y-4 text-white">
              <p>
                An open scaffold allows wind to pass through the bays with relatively little
                resistance. The wind force on tubes, ledgers, and boards is modest. However, once
                sheeting, debris netting, or brick guards are added, the scaffold becomes a
                giant sail. The increase in wind loading is dramatic and must be accounted for in the
                scaffold design.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-300">Types of Cladding</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Polythene sheeting:</strong> Highest wind load — virtually solid surface, no air passes through</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Monarflex / shrink-wrap:</strong> Similar to polythene — creates a sealed face</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Debris netting (fine mesh):</strong> High wind load — most of the wind is caught by the mesh</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Debris netting (coarse mesh):</strong> Moderate wind load — some air passes through but significant force remains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Brick guards:</strong> Lower wind load individually but cumulatively significant across a large scaffold</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-300">Design Implications</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>More ties:</strong> Tie spacing is typically halved — from every other standard to every standard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Stronger ties:</strong> Higher proof-load requirements may apply</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Additional bracing:</strong> Extra ledger bracing and plan bracing to resist the increased forces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Foundation loading:</strong> The overturning force on the base increases — sole boards and base plates must be adequate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Wind action plan:</strong> A specific plan for high-wind events — who removes the sheeting and when</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-slate-300">Wind Force Multiplier</h3>
                <p className="text-sm text-white/80 mb-3">
                  The wind force on a scaffold is proportional to the area presented to the wind and the
                  solidity ratio (how much of that area is solid). An open scaffold has a solidity ratio
                  of approximately 0.1 to 0.2. A fully sheeted scaffold has a solidity ratio approaching 1.0.
                  This means the wind force on a sheeted scaffold can be <strong>three to five times</strong> greater
                  than on the same scaffold without sheeting.
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mt-3">
                  <div className="bg-[#1a1a1a] rounded-lg p-3 border border-white/10 text-center">
                    <p className="text-xs text-white/40 mb-1">Open Scaffold</p>
                    <p className="text-lg font-bold text-green-400">1x</p>
                    <p className="text-[10px] text-white/40">Base wind load</p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-3 border border-white/10 text-center">
                    <p className="text-xs text-white/40 mb-1">Debris Netting</p>
                    <p className="text-lg font-bold text-amber-400">2-3x</p>
                    <p className="text-[10px] text-white/40">Wind load multiplier</p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-3 border border-white/10 text-center">
                    <p className="text-xs text-white/40 mb-1">Full Sheeting</p>
                    <p className="text-lg font-bold text-red-400">3-5x</p>
                    <p className="text-[10px] text-white/40">Wind load multiplier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Buttressing */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">07</span>
              Buttressing (Rakers)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                In some situations, ties to the building are not possible. The building may be a
                new-build steel frame with no cladding yet, a heritage structure where drilling is
                prohibited, or an independent scaffold not adjacent to any building. In these cases,
                the scaffold must be stabilised by <strong>buttressing</strong> — angled tubes
                (rakers) bracing the scaffold back to ground level.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-slate-300">How Buttressing Works</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Raker tubes:</strong> Angled tubes running from the top of the scaffold (or high-level ledger) down to a sole board or concrete base at ground level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Angle:</strong> Typically at 45 degrees to the ground — steeper angles reduce the effectiveness of the raker</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Base fixing:</strong> The foot of the raker must be secured against a fixed point (e.g. a kentledge block, ground anchor, or substantial base plate on a sole board)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Top connection:</strong> Fixed to the scaffold standard or ledger with right-angle or swivel couplers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong>Bracing:</strong> The raker frame itself must be braced to prevent it from buckling or racking</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-300">When Buttressing Is Used</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>New-build steel frame:</strong> Before cladding is installed, there is nothing to tie to</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Heritage buildings:</strong> Drilling or fixing to the facade is prohibited</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Freestanding scaffolds:</strong> No adjacent building exists (e.g. event staging, temporary structures)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Weak facade:</strong> The building fabric is too weak to accept ties (e.g. timber cladding, curtain walling)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-slate-300">Limitations & Risks</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Space:</strong> Rakers extend outward from the scaffold, occupying ground-level space that may obstruct pedestrians or traffic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Ground conditions:</strong> The base of the raker must bear on firm ground — soft or sloping ground may require additional foundations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Height limit:</strong> Buttressing becomes impractical for very tall scaffolds as the rakers would extend too far from the base</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span><strong>Design required:</strong> A buttressed scaffold is a designed scaffold — it must be designed by a competent scaffold designer, not left to site judgement</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-slate-300">Kentledge (Counterweight)</h3>
                <p className="text-sm text-white/80">
                  Where rakers bear on the ground, the base may need to be weighted down with kentledge —
                  concrete blocks or other heavy materials placed on a platform at the foot of the raker. The
                  kentledge prevents the raker from sliding outward under load. The weight of kentledge
                  required is calculated by the scaffold designer based on the expected wind load and the
                  geometry of the raker. Kentledge must be securely restrained so it cannot be knocked off
                  or displaced, and must not be used for any other purpose while supporting the scaffold.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-400" />
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Bracing, Ties & Stability — Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Bracing Types</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Ledger (face):</strong> Diagonal across the face — prevents racking along the scaffold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Plan:</strong> Diagonal in horizontal plane — prevents twisting across the width</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Cross (X):</strong> Two diagonals per bay — strongest arrangement</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Tie Types</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Box tie:</strong> Cross tube in opening — push and pull</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Lip (reveal) tie:</strong> Pin in reveal — mainly pull only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Through tie:</strong> Bolt through wall — strongest type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Anchor bolt:</strong> Drilled into facade — flexible positioning</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Tie Testing</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Minimum:</strong> 6.25 kN proof-load (tube & fitting)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">When:</strong> At installation, after disturbance, after storms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Tool:</strong> Calibrated pull-test device</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Tie Spacing (General Rule)</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Standard:</strong> Every other standard, every other lift (staggered)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Sheeted:</strong> Closer spacing — every standard at every lift</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Top lift:</strong> Always tied</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">First tie:</strong> As low as practicable (lift 2)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Sheeting Effects</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Polythene:</strong> 3-5x wind load increase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Debris netting:</strong> 2-3x wind load increase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Action:</strong> More ties, more bracing, stronger foundations</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Buttressing</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">When:</strong> No ties possible (new-build, heritage, freestanding)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Angle:</strong> 45 degrees to the ground (ideal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Base:</strong> Kentledge or ground anchors to prevent sliding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Design:</strong> Must be designed by a competent person</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-slate-400/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Bracing, Ties & Stability Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-4">
              Next: Module 4 — Scaffold Inspection & Tagging
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default ScaffoldingAwarenessModule3Section4;
