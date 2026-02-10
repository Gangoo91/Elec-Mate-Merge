import { ArrowLeft, CheckCircle, AlertTriangle, BookOpen, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Tubes, Couplers & Fittings – Scaffolding Awareness Module 3 Section 1";
const DESCRIPTION =
  "Steel tube to EN 39, aluminium tube, coupler types (right-angle, swivel, putlog, sleeve, band-and-plate, girder, beam), BS EN 74 requirements, safe working loads, torque, inspection, and rejection of defective fittings.";

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the outside diameter (OD) of standard steel scaffold tube to EN 39?",
    options: ["42.4 mm", "48.3 mm", "50.8 mm", "60.3 mm"],
    correctAnswer: 1,
    explanation:
      "Standard steel scaffold tube manufactured to BS EN 39 has an outside diameter of 48.3 mm with a 4 mm wall thickness, giving an internal bore of approximately 40.3 mm. This dimension is universal across the UK scaffolding industry.",
  },
  {
    id: 2,
    question:
      "Which coupler is used to join two tubes at exactly 90 degrees and carries the highest safe working load?",
    options: [
      "Swivel coupler",
      "Right-angle coupler",
      "Putlog coupler",
      "Sleeve coupler",
    ],
    correctAnswer: 1,
    explanation:
      "The right-angle coupler (also called a double coupler) joins two tubes at a fixed 90-degree angle and has the highest safe working load of all couplers at 6.25 kN (approximately 635 kg) in the slip direction when tested to BS EN 74.",
  },
  {
    id: 3,
    question:
      "What torque must be applied to a coupler bolt to achieve its rated safe working load?",
    options: [
      "30 Nm (22 lbf·ft)",
      "40 Nm (30 lbf·ft)",
      "50 Nm (37 lbf·ft)",
      "60 Nm (44 lbf·ft)",
    ],
    correctAnswer: 2,
    explanation:
      "Coupler bolts must be tightened to a torque of 50 Nm (approximately 37 lbf·ft). Under-tightening reduces the safe working load, whilst over-tightening can strip threads, crack castings, or distort the tube. A calibrated torque spanner should be used.",
  },
  {
    id: 4,
    question:
      "A swivel coupler differs from a right-angle coupler in that it:",
    options: [
      "Has a higher safe working load",
      "Allows the two tubes to be connected at any angle",
      "Does not require a bolt",
      "Is only used on aluminium tube",
    ],
    correctAnswer: 1,
    explanation:
      "A swivel coupler has a centre pivot that allows the two tubes to be connected at any angle relative to one another. Its safe working load in the slip direction is 6.25 kN, the same as a right-angle coupler, but it is used where a 90-degree connection is not required — typically for raking braces.",
  },
  {
    id: 5,
    question: "What is the primary purpose of a putlog coupler?",
    options: [
      "Joining two standards together end to end",
      "Connecting a transom or putlog blade to a ledger",
      "Securing a scaffold to the building face",
      "Attaching toe boards to guardrails",
    ],
    correctAnswer: 1,
    explanation:
      "A putlog coupler connects a single tube (the transom or putlog) to another tube (the ledger). It has only one fitting half that grips a tube, with the other side being a blade or flat plate that sits in or on the brickwork. Its safe working load is lower than a right-angle or swivel coupler at 0.56 kN.",
  },
  {
    id: 6,
    question:
      "Which British Standard covers the requirements for couplers, loose spigots, and base plates used in scaffolding?",
    options: ["BS EN 39", "BS EN 74", "BS EN 12811", "BS EN 1004"],
    correctAnswer: 1,
    explanation:
      "BS EN 74 covers couplers, loose spigots, and base plates used in working scaffolds and falsework made of circular tubes. It specifies requirements for materials, design, testing, and marking. BS EN 39 covers the tubes themselves.",
  },
  {
    id: 7,
    question:
      "A scaffold tube is found to have a visible bend. At what deflection should the tube be rejected?",
    options: [
      "Any visible bend — reject immediately",
      "More than 5 mm over any 1 metre length",
      "More than 10 mm over any 3 metre length",
      "More than 25 mm over the full tube length",
    ],
    correctAnswer: 0,
    explanation:
      "Any scaffold tube with a visible bend, bow, or kink should be rejected and removed from service immediately. Bent tubes cannot carry their rated load, may not fit correctly into couplers, and create eccentric loading that can lead to structural failure. TG20 guidance is clear: if you can see it, reject it.",
  },
  {
    id: 8,
    question:
      "What is the safe working load of a sleeve coupler when used to join two tubes end to end?",
    options: ["0.56 kN", "3.13 kN", "6.25 kN", "9.10 kN"],
    correctAnswer: 2,
    explanation:
      "A sleeve coupler (also called a joint pin or expanding spigot when internal, or an external sleeve coupler when external) has a safe working load of 6.25 kN. Sleeve joints must be positioned close to a node point — never at mid-span — and staggered so that adjacent tubes are not jointed at the same bay.",
  },
];

const quickCheckQuestions = [
  {
    id: "tube-dimensions",
    question:
      "You pick up a scaffold tube and notice it feels lighter than usual. The markings show it is aluminium rather than steel. Can you use it in the same scaffold as the steel tubes?",
    options: [
      "Yes — aluminium and steel are interchangeable",
      "No — you must never mix steel and aluminium tubes in the same scaffold",
      "Yes, but only for ledgers",
      "Only if the scaffold designer approves in writing",
    ],
    correctIndex: 1,
    explanation:
      "Steel and aluminium tubes must never be mixed in the same scaffold. They have different strengths, stiffnesses (Young's modulus), and thermal expansion rates. Mixing them creates unpredictable load paths and can cause galvanic corrosion at contact points. If aluminium tubes are required, the entire scaffold must be designed for aluminium.",
  },
  {
    id: "coupler-torque",
    question:
      "A colleague is tightening coupler bolts by hand without a torque spanner, saying they are 'tight enough'. Is this acceptable?",
    options: [
      "Yes — hand-tight is sufficient for scaffold couplers",
      "Yes, if the scaffold is below 4 metres",
      "No — coupler bolts must be tightened to 50 Nm using a calibrated torque spanner",
      "No — they should use a standard ratchet instead",
    ],
    correctIndex: 2,
    explanation:
      "All coupler bolts must be tightened to 50 Nm (37 lbf·ft). Hand-tightening produces inconsistent torque and typically falls well below the required value, reducing the coupler's safe working load. A calibrated torque spanner is the correct tool. This applies to every coupler on every scaffold.",
  },
  {
    id: "reject-defective",
    question:
      "During a scaffold inspection you find a right-angle coupler with a cracked casting around the bolt hole. What should you do?",
    options: [
      "Tighten the bolt harder to compensate",
      "Wrap it with insulating tape and monitor it",
      "Remove it from service immediately, tag it as defective, and replace it",
      "Leave it if the scaffold is only being used for light work",
    ],
    correctIndex: 2,
    explanation:
      "A cracked casting is a critical defect. The coupler must be removed from service immediately, clearly tagged or marked as defective to prevent re-use, and replaced with a serviceable coupler. Cracked castings can fail suddenly under load with no warning. Never attempt to repair a defective coupler on site.",
  },
];

const faqs = [
  {
    question:
      "Why is galvanised finish used on scaffold tubes and couplers?",
    answer:
      "Galvanising applies a protective zinc coating to the steel surface. This prevents rust and corrosion, which would weaken the tube and reduce its safe working load over time. Scaffolding is constantly exposed to rain, condensation, and damp site conditions. Without galvanising, tubes would deteriorate rapidly. The zinc coating also acts as a sacrificial anode — if scratched, the zinc corrodes preferentially, protecting the underlying steel. Tubes and couplers should be inspected for areas where the galvanising has worn through, as these spots are vulnerable to accelerated corrosion.",
  },
  {
    question:
      "Can I use a swivel coupler where a right-angle coupler is specified on the scaffold design?",
    answer:
      "No. If the scaffold design specifies a right-angle coupler, you must use a right-angle coupler. Although a swivel coupler has the same safe working load in the slip test, a right-angle coupler provides a rigid 90-degree connection that contributes to the structural integrity of the scaffold frame. A swivel coupler allows rotation and would introduce unwanted movement at a node that the designer intended to be fixed. Substituting coupler types without the designer's approval is not permitted under TG20 or the scaffold design specification.",
  },
  {
    question: "How often should couplers be inspected on an erected scaffold?",
    answer:
      "Couplers must be inspected as part of every scaffold inspection. Under the Work at Height Regulations 2005, scaffolds must be inspected before first use, at intervals not exceeding 7 days, after any event likely to have affected stability (such as high winds or impact), and before use after any substantial alteration. During each inspection, couplers should be checked for tightness (50 Nm torque), cracked or deformed castings, corrosion, and correct type in the correct position. Any coupler that fails inspection must be replaced immediately.",
  },
  {
    question:
      "What is the difference between a girder coupler and a beam coupler?",
    answer:
      "A girder coupler (also called a girder clamp) is designed to connect a scaffold tube to a steel I-beam or H-section (typically the flange). It has a deep jaw or channel that wraps around the beam flange and is tightened with bolts. A beam coupler performs a similar function but may be designed for different beam profiles or loading directions. Both are used when a scaffold must be tied to or supported by structural steelwork. The correct coupler must match the beam flange thickness and profile — using the wrong size can result in the coupler slipping off the beam under load.",
  },
];

const ScaffoldingAwarenessModule3Section1 = () => {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <Wrench className="h-10 w-10 text-slate-400 mx-auto mb-4" />
          <span className="inline-block bg-slate-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 3 · SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Tubes, Couplers & Fittings
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Steel and aluminium scaffold tubes, coupler types and their safe
            working loads, torque requirements, inspection procedures, and
            rejecting defective fittings
          </p>
        </div>

        {/* Section 01: Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-slate-500/10 border-l-2 border-l-slate-400/50 border border-slate-500/30">
              <p className="font-semibold text-slate-400 mb-2 text-base">
                In 30 Seconds
              </p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Steel Tube:</strong> EN 39, 48.3 mm OD, 4 mm wall,
                    galvanised finish.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Aluminium Tube:</strong> Lighter, lower stiffness,
                    never mix with steel.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Couplers:</strong> Right-angle, swivel, putlog,
                    sleeve, band-and-plate, girder, beam.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Standard:</strong> BS EN 74 for couplers, BS EN 39
                    for tubes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Torque:</strong> 50 Nm on all coupler bolts —
                    calibrated spanner required.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Defects:</strong> Bent, cracked, corroded, or
                    damaged — reject immediately.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-slate-500/10 border-l-2 border-l-slate-400/50 border border-slate-500/30">
              <p className="font-semibold text-slate-400 mb-2 text-base">
                On Site
              </p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Spot:</strong> Every tube-and-fitting scaffold on
                    site — independent, putlog, birdcage, and loading bay
                    structures.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Use:</strong> Pre-erection checks, weekly
                    inspections, coupler torque verification, tube and fitting
                    stocktakes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Apply:</strong> Correct coupler selection for every
                    connection, proper torque, visual inspection before use,
                    reject-and-replace procedure for defective items.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">
            By the end of this section, you will be able to:
          </p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Describe the properties and dimensions of standard steel
                scaffold tube to BS EN 39
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain the differences between steel and aluminium scaffold
                tube and why they must not be mixed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Identify the seven main coupler types and state their correct
                applications
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                State the safe working loads of each coupler type and the
                required bolt torque
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Carry out a visual inspection of tubes and couplers and identify
                common defects
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Apply the correct procedure for rejecting defective fittings and
                removing them from service
              </span>
            </li>
          </ul>
        </section>

        {/* Section 03: Steel Scaffold Tube — EN 39 */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">03</span>
              Steel Scaffold Tube — BS EN 39
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The standard scaffold tube used across the United Kingdom is
                manufactured to BS EN 39. This standard specifies the
                dimensions, mechanical properties, and surface finish of
                circular steel tubes intended for use in tube-and-fitting
                scaffolding.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Key Dimensions & Properties
                </h3>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Outside Diameter (OD):</strong> 48.3 mm — this
                        is the universal dimension that all couplers are designed
                        to grip
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Wall Thickness:</strong> 4.0 mm nominal (minimum
                        3.2 mm for Type 4 lightweight tube)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Internal Bore:</strong> Approximately 40.3 mm
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Weight:</strong> Approximately 4.37 kg per metre
                        for 4 mm wall (3.56 kg/m for 3.2 mm wall)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Steel Grade:</strong> S235 or S355 (yield
                        strengths of 235 N/mm² and 355 N/mm² respectively)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Finish:</strong> Hot-dip galvanised to prevent
                        corrosion — zinc coating protects the underlying steel
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Standard Tube Lengths
                  </h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>6.4 m (21 ft):</strong> The most common
                          standard length
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>4.8 m (16 ft):</strong> Used for shorter spans
                          and standards
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>3.9 m (13 ft):</strong> Common for transoms
                          and short ledgers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>3.0 m (10 ft):</strong> Used for braces and
                          short tubes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>2.4 m (8 ft):</strong> For guardrails, short
                          braces, and infill
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>Cut tubes:</strong> Various shorter lengths for
                          specific applications
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Tube Markings
                  </h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2">
                      Every tube should carry permanent markings identifying:
                    </p>
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Manufacturer's name or trademark</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Standard reference (EN 39 or BS EN 39)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Steel grade (e.g. S235 or S355)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Nominal wall thickness
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Tubes without legible markings should be treated
                          with caution and verified before use
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Aluminium Scaffold Tube
                </h3>
                <div className="bg-white/5 border border-slate-400/30 p-4 rounded-lg">
                  <p className="text-white text-sm mb-3">
                    Aluminium tubes are available for lightweight applications
                    and where reduced weight is beneficial — for example, in
                    confined spaces, on fragile roofs (with spreader boards), or
                    where manual handling limits are a concern. They share the
                    same 48.3 mm OD as steel tubes and use the same couplers.
                  </p>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Weight:</strong> Approximately one-third the
                        weight of steel (about 1.68 kg/m)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Stiffness:</strong> Young's modulus is
                        approximately one-third that of steel — aluminium tubes
                        deflect more under the same load
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Strength:</strong> Lower yield strength than
                        steel — design spans and loadings must be recalculated
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Corrosion:</strong> Naturally forms a protective
                        oxide layer, but galvanic corrosion occurs at
                        steel–aluminium contact points
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-red-300 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Rule: Never Mix Steel & Aluminium
                  </h4>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Steel and aluminium tubes must never be used in the same
                        scaffold structure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Different stiffness values create unpredictable load
                        distribution between members
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Galvanic corrosion accelerates at contact points between
                        dissimilar metals
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Different thermal expansion rates cause joint loosening
                        in temperature changes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        If aluminium is specified, the entire scaffold must be
                        designed as an aluminium structure
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Bending, Damage & Defect Identification */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">04</span>
              Bending, Damage & Defect Identification
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Every tube must be visually inspected before it is incorporated
                into a scaffold. Defective tubes compromise the structural
                integrity of the entire structure. A single bent standard can
                reduce the load capacity of a scaffold bay by more than 50%.
              </p>

              {/* Diagram: Tube Inspection Checklist */}
              <div className="bg-slate-500/10 border border-slate-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-400 mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Tube Inspection Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                      Visual Checks
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center flex-shrink-0 text-red-300 text-xs font-bold">
                          1
                        </div>
                        <div className="text-sm">
                          <strong>Straightness:</strong> Sight along the tube
                          from one end — any visible bend, bow, or kink means
                          reject
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center flex-shrink-0 text-red-300 text-xs font-bold">
                          2
                        </div>
                        <div className="text-sm">
                          <strong>Corrosion:</strong> Check for rust, deep
                          pitting, or areas where galvanising has worn through
                          exposing bare steel
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center flex-shrink-0 text-red-300 text-xs font-bold">
                          3
                        </div>
                        <div className="text-sm">
                          <strong>Dents & Crushing:</strong> Run your hand along
                          the tube — feel for dents, flat spots, or crushing
                          that reduce the cross-section
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center flex-shrink-0 text-red-300 text-xs font-bold">
                          4
                        </div>
                        <div className="text-sm">
                          <strong>Cracks:</strong> Inspect tube ends and any
                          area that has been subjected to impact for visible
                          cracks
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                      Additional Checks
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center flex-shrink-0 text-red-300 text-xs font-bold">
                          5
                        </div>
                        <div className="text-sm">
                          <strong>Ends:</strong> Tube ends must not be split,
                          burred, or mushroomed from hammering — they must seat
                          properly in couplers
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center flex-shrink-0 text-red-300 text-xs font-bold">
                          6
                        </div>
                        <div className="text-sm">
                          <strong>Markings:</strong> Confirm the tube carries
                          legible EN 39 markings and the correct steel grade
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center flex-shrink-0 text-red-300 text-xs font-bold">
                          7
                        </div>
                        <div className="text-sm">
                          <strong>Foreign Matter:</strong> Check for concrete,
                          paint, or debris that could prevent the coupler from
                          seating correctly
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center flex-shrink-0 text-red-300 text-xs font-bold">
                          8
                        </div>
                        <div className="text-sm">
                          <strong>Wall Thickness:</strong> If corrosion is
                          suspected to have reduced wall thickness, the tube
                          should be ultrasonically tested or rejected
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Tube Rejection Criteria
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong>Visible bend or bow:</strong> Any tube that is not
                      straight when sighted from the end must be rejected
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong>Deep corrosion or pitting:</strong> Surface rust
                      alone may be acceptable, but any pitting that has reduced
                      the wall thickness is cause for rejection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong>Dents greater than 10% of the tube diameter:</strong>{" "}
                      Any dent that visibly deforms the circular cross-section
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong>Cracks or splits:</strong> Any visible crack,
                      particularly at tube ends or weld lines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong>Mushroomed or burred ends:</strong> Prevent proper
                      coupler seating and indicate impact damage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong>No identification markings:</strong> Tubes of
                      unknown origin or grade must not be used
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Coupler Types — Visual Guide */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">05</span>
              Coupler Types in Detail
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Couplers are the components that connect scaffold tubes to one
                another. The correct coupler must be used for every connection —
                using the wrong type compromises the structural integrity of the
                scaffold and can lead to collapse. All couplers used in the UK
                must comply with BS EN 74.
              </p>

              {/* Diagram: Coupler Types Visual Guide */}
              <div className="bg-slate-500/10 border border-slate-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-400 mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Coupler Types Visual Guide
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Right-Angle Coupler */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-500/30 border border-slate-400/40 flex items-center justify-center text-slate-400 text-xs font-bold">
                        RA
                      </div>
                      <h4 className="font-semibold text-slate-400 text-sm">
                        Right-Angle Coupler
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Joins two tubes at fixed 90°</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>SWL: 6.25 kN (slip)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Use: Ledger-to-standard, transom-to-ledger
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Most commonly used coupler on site</span>
                      </li>
                    </ul>
                  </div>

                  {/* Swivel Coupler */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-500/30 border border-slate-400/40 flex items-center justify-center text-slate-400 text-xs font-bold">
                        SW
                      </div>
                      <h4 className="font-semibold text-slate-400 text-sm">
                        Swivel Coupler
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Joins two tubes at any angle</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>SWL: 6.25 kN (slip)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Use: Raking braces, angled connections</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Centre pivot allows rotation</span>
                      </li>
                    </ul>
                  </div>

                  {/* Putlog Coupler */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-500/30 border border-slate-400/40 flex items-center justify-center text-slate-400 text-xs font-bold">
                        PL
                      </div>
                      <h4 className="font-semibold text-slate-400 text-sm">
                        Putlog Coupler
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Connects single tube (transom) to ledger
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>SWL: 0.56 kN (slip)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Use: Putlog scaffolds, board bearers
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>One grip half + one blade/flat end</span>
                      </li>
                    </ul>
                  </div>

                  {/* Sleeve Coupler */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-500/30 border border-slate-400/40 flex items-center justify-center text-slate-400 text-xs font-bold">
                        SL
                      </div>
                      <h4 className="font-semibold text-slate-400 text-sm">
                        Sleeve Coupler
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Joins two tubes end to end (in-line)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>SWL: 6.25 kN</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Use: Extending standards and ledgers
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Must be close to a node point, staggered</span>
                      </li>
                    </ul>
                  </div>

                  {/* Band-and-Plate Coupler */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-500/30 border border-slate-400/40 flex items-center justify-center text-slate-400 text-xs font-bold">
                        BP
                      </div>
                      <h4 className="font-semibold text-slate-400 text-sm">
                        Band-and-Plate Coupler
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Connects tube to flat surface or steelwork</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>SWL: Varies by manufacturer</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Use: Fixing scaffold to structural steel, sign boards
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Band grips tube, plate bolts to surface</span>
                      </li>
                    </ul>
                  </div>

                  {/* Girder Coupler */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-500/30 border border-slate-400/40 flex items-center justify-center text-slate-400 text-xs font-bold">
                        GC
                      </div>
                      <h4 className="font-semibold text-slate-400 text-sm">
                        Girder Coupler
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Attaches tube to I-beam or H-section flange
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>SWL: Depends on beam flange thickness</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Use: Tying scaffold to structural steelwork
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>Deep jaw wraps around beam flange</span>
                      </li>
                    </ul>
                  </div>

                  {/* Beam Coupler — full width */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg sm:col-span-2 lg:col-span-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-500/30 border border-slate-400/40 flex items-center justify-center text-slate-400 text-xs font-bold">
                        BC
                      </div>
                      <h4 className="font-semibold text-slate-400 text-sm">
                        Beam Coupler
                      </h4>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <ul className="text-xs space-y-1 text-white/80">
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                          <span>
                            Similar to girder coupler but designed for specific
                            beam profiles or loading directions
                          </span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                          <span>SWL: Varies — check manufacturer's data</span>
                        </li>
                      </ul>
                      <ul className="text-xs space-y-1 text-white/80">
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                          <span>
                            Use: Suspension scaffolds, loading bays supported
                            from beams, temporary works tied to steel frames
                          </span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                          <span>
                            Must match the beam flange thickness — using the
                            wrong size causes slippage
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SWL Summary Table */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-slate-400">
                  Safe Working Loads — Summary
                </h3>
                <div className="overflow-x-auto -mx-2 px-2">
                  <div className="space-y-2 text-sm min-w-0">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white font-medium">
                        Right-Angle Coupler
                      </span>
                      <span className="text-slate-400 font-semibold">
                        6.25 kN (~635 kg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white font-medium">
                        Swivel Coupler
                      </span>
                      <span className="text-slate-400 font-semibold">
                        6.25 kN (~635 kg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white font-medium">
                        Sleeve Coupler
                      </span>
                      <span className="text-slate-400 font-semibold">
                        6.25 kN (~635 kg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white font-medium">
                        Putlog Coupler
                      </span>
                      <span className="text-slate-400 font-semibold">
                        0.56 kN (~57 kg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white font-medium">
                        Band-and-Plate Coupler
                      </span>
                      <span className="text-slate-400 font-semibold">
                        Varies by design
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white font-medium">
                        Girder Coupler
                      </span>
                      <span className="text-slate-400 font-semibold">
                        Varies by flange
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white font-medium">
                        Beam Coupler
                      </span>
                      <span className="text-slate-400 font-semibold">
                        Varies by design
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  All SWL values shown are slip loads at 50 Nm bolt torque to BS
                  EN 74. Actual working loads may be lower due to factors of
                  safety applied in the scaffold design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: BS EN 74 Requirements & Torque */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">06</span>
              BS EN 74 Requirements & Torque
            </h2>
            <div className="space-y-4 text-white">
              <p>
                BS EN 74 is the European standard that specifies the
                requirements for couplers, loose spigots, and base plates used
                in working scaffolds and falsework made of circular steel tubes.
                It covers design, materials, manufacturing, testing, and
                marking. Every coupler on a UK scaffold must comply with this
                standard.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    What BS EN 74 Requires
                  </h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>Material:</strong> Couplers must be
                          manufactured from ductile iron, pressed steel, or
                          forged steel to specified grades
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>Testing:</strong> Type-tested for slip load,
                          ultimate load, and deformation under load
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>Marking:</strong> Each coupler must be
                          permanently marked with the manufacturer's name,
                          standard reference, and class
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>Finish:</strong> Must be protected against
                          corrosion — typically galvanised or painted
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>Bolt Thread:</strong> Must not strip or fail
                          before the coupler reaches its rated slip load
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Coupler Classes
                  </h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>Class A:</strong> Highest performance —
                          suitable for all scaffold designs. Minimum slip load
                          of 6.25 kN for right-angle and swivel couplers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>Class B:</strong> Lower performance — suitable
                          only where the scaffold design specifically permits
                          Class B couplers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong>TG20 Compliance:</strong> TG20 designs assume
                          Class A couplers throughout — never substitute Class B
                          unless the design explicitly states otherwise
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-400/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-slate-400">
                  Torque Requirements
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-[#1a1a1a] border border-white/10 p-3 rounded font-mono text-sm text-slate-400">
                    Required torque: 50 Nm (37 lbf·ft) — every coupler, every
                    bolt, every time
                  </div>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Under-torqued couplers</strong> have reduced
                        friction grip and lower safe working loads — the coupler
                        may slip under design load
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Over-torqued couplers</strong> risk stripped
                        threads, cracked castings, distorted tubes, and
                        premature bolt failure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Calibrated torque spanner</strong> must be used —
                        hand-tightening or using a standard ratchet does not
                        achieve consistent, measurable torque
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Torque checks during inspections:</strong> Use a
                        torque spanner set to 50 Nm and apply to a sample of
                        couplers — if any are loose, check the full scaffold
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Spanner calibration:</strong> Torque spanners
                        must be calibrated regularly (typically annually) and
                        the calibration certificate kept on record
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Checking Couplers & Rejecting Defective Fittings */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">07</span>
              Checking Couplers & Rejecting Defective Fittings
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Coupler inspection is as critical as tube inspection. A
                defective coupler can fail without warning, releasing the tube
                it holds and potentially causing a progressive collapse. Every
                coupler must be inspected before use and during every scaffold
                inspection thereafter.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Coupler Inspection Points
                </h3>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Casting Integrity:</strong> Check the body for
                        cracks, chips, or fractures — particularly around the
                        bolt hole and where the two halves meet
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Bolt & Nut:</strong> Ensure the T-bolt is
                        straight, the thread is clean and undamaged, and the nut
                        runs freely along the full thread length
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Hinge Pin:</strong> On hinged couplers (e.g.
                        right-angle), verify the pin is secure and the hinge
                        operates smoothly without excessive play
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Jaw Faces:</strong> The internal faces that grip
                        the tube must not be worn smooth — the serrations or
                        knurling pattern provides friction grip
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Corrosion:</strong> Light surface rust is
                        acceptable, but deep corrosion that has reduced wall
                        thickness or weakened the casting must be rejected
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong>Markings:</strong> Confirm the coupler carries
                        its BS EN 74 marking, class designation, and
                        manufacturer's identification
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Rejection Criteria — Couplers
                  </h3>
                  <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Cracked or fractured casting — anywhere on the body
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Bent, cross-threaded, or damaged T-bolt
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Nut does not run freely on the bolt thread
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Worn or smooth jaw faces (reduced grip)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Excessive corrosion reducing wall thickness of
                          casting
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Hinge pin loose, missing, or seized
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Missing or illegible BS EN 74 markings
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Coupler does not close fully around the tube
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Rejection Procedure
                  </h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-500/20 border border-slate-400/40 flex items-center justify-center flex-shrink-0 text-slate-400 text-xs font-bold">
                          1
                        </div>
                        <div>
                          <strong>Remove</strong> the defective fitting from the
                          scaffold immediately
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-500/20 border border-slate-400/40 flex items-center justify-center flex-shrink-0 text-slate-400 text-xs font-bold">
                          2
                        </div>
                        <div>
                          <strong>Tag</strong> or mark the fitting clearly as
                          "DEFECTIVE — DO NOT USE"
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-500/20 border border-slate-400/40 flex items-center justify-center flex-shrink-0 text-slate-400 text-xs font-bold">
                          3
                        </div>
                        <div>
                          <strong>Segregate</strong> the fitting in a designated
                          quarantine area or container — separate from
                          serviceable stock
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-500/20 border border-slate-400/40 flex items-center justify-center flex-shrink-0 text-slate-400 text-xs font-bold">
                          4
                        </div>
                        <div>
                          <strong>Replace</strong> immediately with a
                          serviceable fitting of the correct type and class
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-500/20 border border-slate-400/40 flex items-center justify-center flex-shrink-0 text-slate-400 text-xs font-bold">
                          5
                        </div>
                        <div>
                          <strong>Record</strong> the defect in the scaffold
                          inspection register, noting the type, location, and
                          nature of the defect
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-500/20 border border-slate-400/40 flex items-center justify-center flex-shrink-0 text-slate-400 text-xs font-bold">
                          6
                        </div>
                        <div>
                          <strong>Report</strong> to the scaffold supervisor or
                          site manager — multiple defective fittings may
                          indicate a batch problem or inadequate storage
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Never Repair a Defective Coupler on Site
                </h3>
                <p className="text-white text-sm mb-2">
                  Couplers are safety-critical components that have been
                  type-tested as complete units. Site repairs — such as welding
                  cracked castings, replacing bolts with non-standard fixings,
                  or bending casting halves back into shape — are strictly
                  prohibited. A repaired coupler has not been tested and cannot
                  be relied upon to carry its rated safe working load.
                </p>
                <p className="text-white/70 text-sm">
                  The cost of a replacement coupler is negligible compared to the
                  consequences of a structural failure. When in doubt, reject and
                  replace.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Practical Reference & Storage */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-400" />
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Practical Reference & Storage
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Correct storage of tubes and fittings extends their service life,
              prevents damage, and makes inspection easier. A well-organised
              scaffold yard is a safer scaffold yard.
            </p>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Tube Storage
                </h3>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Store tubes horizontally on level timber bearers —
                        never directly on the ground
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Support at regular intervals to prevent sagging and
                        permanent bowing
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Separate by length — store different lengths in
                        designated racks or bays
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Keep steel and aluminium tubes in separate areas,
                        clearly labelled
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Defective or rejected tubes must be stored in a
                        segregated quarantine area
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Stack heights should allow safe manual handling —
                        avoid climbing on tube stacks
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Coupler Storage
                </h3>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Store couplers in dedicated containers or bins,
                        separated by type
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Protect from moisture — cover bins or store under
                        shelter to minimise corrosion
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Keep bolts and nuts engaged (finger-tight) to prevent
                        loss and cross-contamination
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Apply light oil to bolt threads if couplers will be
                        stored for extended periods
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Defective couplers must be stored in a separate,
                        clearly marked quarantine container
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Never dump couplers loose — this damages castings,
                        bends bolts, and makes inspection difficult
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-slate-400">
                On-Site Quick Reference
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Tube Dimensions to Remember
                  </h4>
                  <ul className="space-y-1 text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">OD:</strong> 48.3 mm
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Wall:</strong> 4.0 mm
                        standard
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Weight:</strong> ~4.37
                        kg/m (steel)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Standard:</strong> BS EN
                        39
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Coupler Facts to Remember
                  </h4>
                  <ul className="space-y-1 text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Standard:</strong> BS EN
                        74
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Torque:</strong> 50 Nm
                        (37 lbf·ft)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">RA/SW/SL SWL:</strong>{" "}
                        6.25 kN
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Putlog SWL:</strong> 0.56
                        kN
                      </span>
                    </li>
                  </ul>
                </div>
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
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Tubes, Couplers & Fittings Quiz"
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
            <Link to="../scaffolding-awareness-module-3-section-2">
              Next: Base Plates, Sole Boards & Foundations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default ScaffoldingAwarenessModule3Section1;
