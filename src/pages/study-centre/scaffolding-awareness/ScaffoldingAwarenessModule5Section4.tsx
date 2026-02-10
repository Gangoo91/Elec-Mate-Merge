import {
  ArrowLeft,
  HardHat,
  CheckCircle,
  AlertTriangle,
  Ban,
  ShieldCheck,
  Package,
  Weight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "scaffold-load-class",
    question:
      "Under BS EN 12811, a Class 3 scaffold has a maximum uniformly distributed load of 200 kg/m\u00B2. What type of work is this class typically used for?",
    options: [
      "Inspection and very light duties only",
      "General construction work such as bricklaying and rendering",
      "Heavy-duty masonry work with significant material storage",
      "Special heavy-duty applications like stone cladding",
    ],
    correctIndex: 1,
    explanation:
      "Class 3 (200 kg/m\u00B2) is the most commonly used scaffold load class on UK construction sites. It is suitable for general construction work including bricklaying, rendering, painting, and light material storage. Classes 1 and 2 are for inspection and light duties, whilst Classes 4, 5, and 6 cover progressively heavier applications such as masonry with heavy materials and special heavy-duty work like stone cladding.",
  },
  {
    id: "prohibited-scaffold-action",
    question:
      "A scaffold user notices that a toe board is missing from a working platform. What should they do?",
    options: [
      "Remove a toe board from a lower level and use it to fill the gap",
      "Continue working carefully and report it at the end of the shift",
      "Stop work on that platform, report the defect immediately, and do not use it until it is repaired by a competent person",
      "Fix the toe board themselves using materials found on site",
    ],
    correctIndex: 2,
    explanation:
      "You must NEVER modify a scaffold yourself, and you must NEVER work on a defective scaffold. Missing components \u2014 whether toe boards, guard rails, boards, or braces \u2014 mean the scaffold is incomplete and potentially unsafe. Stop work immediately, report the defect to your supervisor or the scaffold coordinator, and do not use the platform until a competent scaffolder has inspected and repaired it. Removing components from other parts of the scaffold would create a new hazard elsewhere.",
  },
  {
    id: "material-storage-rules",
    question:
      "When storing materials on a scaffold platform, which of the following rules must ALWAYS be followed?",
    options: [
      "Materials can be stacked as high as needed, provided they are tied to the scaffold frame",
      "Materials must be evenly distributed, must not block access or egress, and must not exceed the bay load limit",
      "Materials should be concentrated in the centre of the platform for stability",
      "Storage is only permitted on ground-level bays, never on upper working platforms",
    ],
    correctIndex: 1,
    explanation:
      "Materials stored on scaffold platforms must be evenly distributed across the bay to prevent point loading, must never block access routes, ladders, or emergency egress points, and must never exceed the maximum bay load stated on the scaffold load notice. Concentrating materials in one area creates dangerous point loads that can overload individual boards and ledgers. Storage is permitted on upper platforms provided these rules are observed and the scaffold has been designed to accommodate the load.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "How do I find out the maximum load for the scaffold I am working on?",
    answer:
      "Every scaffold should have a load notice displayed at the point of access. This notice states the scaffold\u2019s load class, the maximum bay load in kilograms, and any restrictions on use. If there is no load notice, do not use the scaffold until one has been provided. You can also ask the scaffold supervisor or check the scaffold design drawings. The load notice is a legal requirement under the Work at Height Regulations 2005 and TG20 guidance.",
  },
  {
    question:
      "What should I do if I see someone climbing the outside face of a scaffold?",
    answer:
      "Stop them immediately if it is safe to do so, and report the incident to your supervisor or site manager. Climbing the face of a scaffold is one of the most dangerous prohibited actions and has caused numerous fatalities. The scaffold face is not designed for climbing \u2014 it lacks proper hand and foot holds, guard rails, and fall protection. All access must be through the designated access points (internal ladders, stair towers, or hoists). Anyone climbing the scaffold face is putting themselves and others at serious risk.",
  },
  {
    question:
      "Can I temporarily remove a guard rail to get a large item onto the scaffold?",
    answer:
      "No. You must NEVER remove guard rails, mid-rails, toe boards, or any other scaffold component yourself. Only a competent scaffolder can modify a scaffold, and any modification must be designed and documented. If you need to move large materials onto a scaffold, use a loading bay with a proper gate, a gin wheel, or a mechanical hoist. If none of these are available, speak to the scaffold contractor about providing a loading bay. Removing guard rails, even temporarily, creates an immediate fall hazard and has been the direct cause of fatal falls on construction sites.",
  },
  {
    question:
      "What is the difference between a distributed load and a point load, and why does it matter?",
    answer:
      "A distributed load is spread evenly across the full area of the scaffold platform \u2014 for example, a layer of bricks stored across the entire bay. A point load is concentrated in one small area \u2014 for example, a pallet of bricks placed in the centre of a bay or a heavy piece of equipment sitting on a single board. Point loads are far more dangerous because they create high stress on individual scaffold boards and the ledgers supporting them, potentially causing localised failure even if the total weight is within the bay\u2019s rated capacity. Always spread materials evenly and never stack them in concentrated piles.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under BS EN 12811, what is the maximum uniformly distributed load for a Class 3 scaffold?",
    options: [
      "75 kg/m\u00B2",
      "150 kg/m\u00B2",
      "200 kg/m\u00B2",
      "300 kg/m\u00B2",
    ],
    correctAnswer: 2,
    explanation:
      "A Class 3 scaffold under BS EN 12811 has a maximum uniformly distributed load of 200 kg/m\u00B2. This is the most common load class for general construction scaffolding in the UK, covering work such as bricklaying, rendering, painting, and light material storage. It is essential to know your scaffold\u2019s load class and never exceed it.",
  },
  {
    id: 2,
    question:
      "Materials stored on a scaffold platform must follow which of the following rules?",
    options: [
      "Stored in one central pile for easy access",
      "Evenly distributed, not blocking access, and within the bay load limit",
      "Stacked as high as possible to save platform space",
      "Placed against the guard rails for security",
    ],
    correctAnswer: 1,
    explanation:
      "Materials on scaffold platforms must be evenly distributed to avoid point loading, must never block access routes or ladders, and must not exceed the maximum bay load stated on the scaffold\u2019s load notice. Concentrating materials in one area creates dangerous point loads. Stacking against guard rails can cause them to fail outward. Always check the load notice before storing materials.",
  },
  {
    id: 3,
    question:
      "Which of the following is a loading bay used for?",
    options: [
      "Storing surplus scaffold components",
      "Providing a designated area for hoisting materials onto the scaffold safely",
      "Creating additional working space for operatives",
      "Allowing vehicles to park beneath the scaffold",
    ],
    correctAnswer: 1,
    explanation:
      "A loading bay is a specially designed section of scaffolding with a hinged gate that provides a safe area for hoisting materials up to the working platform. It prevents materials being lifted over guard rails (which risks dropping them and requires removal of protection). Loading bays must be designed into the scaffold, have adequate load capacity, and be fitted with self-closing gates. They are not storage areas or working platforms.",
  },
  {
    id: 4,
    question:
      "A scaffold user notices that two boards have been removed from a working platform. What is the correct action?",
    options: [
      "Step over the gap carefully and continue working",
      "Place a plank across the gap as a temporary fix",
      "Stop work, report the defect, and do not use the platform until a competent scaffolder has repaired it",
      "Move to a different bay and report the issue at the end of the day",
    ],
    correctAnswer: 2,
    explanation:
      "Missing scaffold boards create an immediate fall hazard and indicate that the scaffold has been tampered with or not completed. You must stop work on that platform immediately and report the defect to your supervisor or scaffold coordinator. Do not attempt to repair the scaffold yourself \u2014 only a competent scaffolder may replace boards and must check why they were removed. Never work on or near an incomplete scaffold.",
  },
  {
    id: 5,
    question:
      "Why is climbing the outside face of a scaffold strictly prohibited?",
    options: [
      "It is only prohibited above 4 metres",
      "The scaffold face is not designed for climbing \u2014 it lacks hand holds, proper foot holds, and fall protection",
      "It is permitted if you maintain three points of contact",
      "It is only prohibited in wet weather conditions",
    ],
    correctAnswer: 1,
    explanation:
      "Climbing the outside face of a scaffold is ALWAYS prohibited, regardless of height, weather, or circumstances. The scaffold frame is not designed to be used as a ladder. It does not have proper hand holds or foot holds, there is no fall protection on the outside face, and ledger and transom spacings are not designed for safe climbing. Falls from the scaffold face are a leading cause of scaffold-related fatalities. All access must be through designated internal ladders, stair towers, or hoists.",
  },
  {
    id: 6,
    question:
      "What information must be displayed on a scaffold load notice?",
    options: [
      "Only the name of the scaffold contractor",
      "The scaffold\u2019s load class, maximum bay load, and any use restrictions",
      "The date of the last inspection only",
      "The names of all operatives authorised to use the scaffold",
    ],
    correctAnswer: 1,
    explanation:
      "A scaffold load notice must display the scaffold\u2019s load class (e.g. Class 3 \u2014 200 kg/m\u00B2), the maximum distributed bay load, and any restrictions on use or areas that are not yet complete. Additional information such as the scaffold contractor\u2019s name, date of erection, and inspection status may also be included. The load notice is a legal requirement and must be visible at the point of access. If there is no load notice, do not use the scaffold.",
  },
  {
    id: 7,
    question:
      "Which of the following actions is the scaffold user\u2019s responsibility?",
    options: [
      "Erecting and dismantling scaffold structures",
      "Checking the scaffold visually before each use, reporting defects, and not overloading the platform",
      "Modifying the scaffold to suit their specific work requirements",
      "Tightening scaffold fittings and replacing damaged components",
    ],
    correctAnswer: 1,
    explanation:
      "Scaffold users are responsible for carrying out a visual check before each use (looking for missing boards, guard rails, toe boards, damage, or instability), reporting any defects immediately, not exceeding the bay load limit, keeping the platform clear of debris, and using the correct access points. Erecting, dismantling, modifying, and repairing scaffolds are the responsibility of competent scaffolders \u2014 never the user.",
  },
  {
    id: 8,
    question:
      "What is the most likely consequence of placing a concentrated point load in the centre of a scaffold bay?",
    options: [
      "The scaffold will sway but remain stable",
      "Individual scaffold boards or ledgers may fail, even if the total weight is within the bay\u2019s rated load",
      "Nothing \u2014 scaffold boards are designed to handle point loads",
      "The scaffold ties will loosen",
    ],
    correctAnswer: 1,
    explanation:
      "A concentrated point load places all the stress on a small number of boards and the ledgers directly beneath them. Even if the total weight is within the bay\u2019s maximum distributed load rating, the localised stress can exceed the capacity of individual boards, causing them to deflect, crack, or break. This can lead to materials falling through, or a person falling through the platform. Always spread loads evenly across the full bay area.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const ScaffoldingAwarenessModule5Section4 = () => {
  useSEO({
    title:
      "Loading, Storage & Prohibited Actions | Scaffolding Awareness Module 5 Section 4",
    description:
      "Understand scaffold load classes under BS EN 12811, maximum bay loads, material storage rules, loading bays, prohibited actions, and scaffold user responsibilities.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <HardHat className="h-10 w-10 text-slate-400 mx-auto mb-4" />
          <span className="inline-block bg-slate-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 5 &middot; SECTION 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Loading, Storage &amp; Prohibited Actions
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding scaffold load classes, maximum bay loads, material
            storage rules, loading bays, and the prohibited actions that must
            never be carried out on or around scaffolding
          </p>
        </div>

        {/* ─── 01 Scaffold Load Classes (BS EN 12811) ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Scaffold Load Classes (BS EN 12811)
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Every scaffold is designed and erected to carry a specific maximum
              load. The European standard <strong>BS EN 12811-1</strong> defines
              six load classes for service scaffolds. Each class specifies the
              maximum uniformly distributed load (in kg/m&sup2;) that the
              scaffold platform can safely support. Knowing your scaffold&rsquo;s
              load class is essential &mdash; exceeding it can cause catastrophic
              failure.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-slate-400 font-medium mb-3 flex items-center gap-2">
                <Weight className="h-4 w-4" />
                Load Class Reference Table (BS EN 12811-1)
              </h3>
              <p className="text-white/60 text-xs mb-4">
                UDL = Uniformly Distributed Load across the full bay area
              </p>

              {/* ─── Load Class Table ─── */}
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="min-w-[480px]">
                  {/* Header Row */}
                  <div className="grid grid-cols-4 gap-px bg-white/5 rounded-t-lg overflow-hidden">
                    <div className="bg-slate-500/20 border-b border-slate-500/30 px-3 py-2.5">
                      <p className="text-slate-300 font-semibold text-xs sm:text-sm">
                        Load Class
                      </p>
                    </div>
                    <div className="bg-slate-500/20 border-b border-slate-500/30 px-3 py-2.5 text-center">
                      <p className="text-slate-300 font-semibold text-xs sm:text-sm">
                        Max UDL (kg/m&sup2;)
                      </p>
                    </div>
                    <div className="bg-slate-500/20 border-b border-slate-500/30 px-3 py-2.5 text-center">
                      <p className="text-slate-300 font-semibold text-xs sm:text-sm">
                        Concentrated Load
                      </p>
                    </div>
                    <div className="bg-slate-500/20 border-b border-slate-500/30 px-3 py-2.5">
                      <p className="text-slate-300 font-semibold text-xs sm:text-sm">
                        Typical Use
                      </p>
                    </div>
                  </div>

                  {/* Row 1 — Class 1 */}
                  <div className="grid grid-cols-4 gap-px">
                    <div className="bg-white/5 px-3 py-2.5 border-b border-white/5">
                      <p className="text-white text-xs sm:text-sm font-medium">
                        Class 1
                      </p>
                    </div>
                    <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-white text-xs sm:text-sm">
                        75 kg/m&sup2;
                      </span>
                    </div>
                    <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-white/60 text-xs sm:text-sm">
                        1.0 kN
                      </span>
                    </div>
                    <div className="bg-white/5 px-3 py-2.5 border-b border-white/5">
                      <span className="text-white/80 text-xs sm:text-sm">
                        Inspection only
                      </span>
                    </div>
                  </div>

                  {/* Row 2 — Class 2 */}
                  <div className="grid grid-cols-4 gap-px">
                    <div className="bg-white/[0.03] px-3 py-2.5 border-b border-white/5">
                      <p className="text-white text-xs sm:text-sm font-medium">
                        Class 2
                      </p>
                    </div>
                    <div className="bg-white/[0.03] px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-white text-xs sm:text-sm">
                        150 kg/m&sup2;
                      </span>
                    </div>
                    <div className="bg-white/[0.03] px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-white/60 text-xs sm:text-sm">
                        1.5 kN
                      </span>
                    </div>
                    <div className="bg-white/[0.03] px-3 py-2.5 border-b border-white/5">
                      <span className="text-white/80 text-xs sm:text-sm">
                        Light-duty work, painting
                      </span>
                    </div>
                  </div>

                  {/* Row 3 — Class 3 (highlighted) */}
                  <div className="grid grid-cols-4 gap-px">
                    <div className="bg-slate-500/15 px-3 py-2.5 border-b border-white/5 border-l-2 border-l-slate-400">
                      <p className="text-slate-300 text-xs sm:text-sm font-bold">
                        Class 3
                      </p>
                    </div>
                    <div className="bg-slate-500/15 px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-slate-300 text-xs sm:text-sm font-bold">
                        200 kg/m&sup2;
                      </span>
                    </div>
                    <div className="bg-slate-500/15 px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-slate-300 text-xs sm:text-sm">
                        1.5 kN
                      </span>
                    </div>
                    <div className="bg-slate-500/15 px-3 py-2.5 border-b border-white/5">
                      <span className="text-slate-300 text-xs sm:text-sm font-medium">
                        General construction (most common)
                      </span>
                    </div>
                  </div>

                  {/* Row 4 — Class 4 */}
                  <div className="grid grid-cols-4 gap-px">
                    <div className="bg-white/[0.03] px-3 py-2.5 border-b border-white/5">
                      <p className="text-white text-xs sm:text-sm font-medium">
                        Class 4
                      </p>
                    </div>
                    <div className="bg-white/[0.03] px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-white text-xs sm:text-sm">
                        300 kg/m&sup2;
                      </span>
                    </div>
                    <div className="bg-white/[0.03] px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-white/60 text-xs sm:text-sm">
                        3.0 kN
                      </span>
                    </div>
                    <div className="bg-white/[0.03] px-3 py-2.5 border-b border-white/5">
                      <span className="text-white/80 text-xs sm:text-sm">
                        Heavy-duty masonry work
                      </span>
                    </div>
                  </div>

                  {/* Row 5 — Class 5 */}
                  <div className="grid grid-cols-4 gap-px">
                    <div className="bg-white/5 px-3 py-2.5 border-b border-white/5">
                      <p className="text-white text-xs sm:text-sm font-medium">
                        Class 5
                      </p>
                    </div>
                    <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-white text-xs sm:text-sm">
                        450 kg/m&sup2;
                      </span>
                    </div>
                    <div className="bg-white/5 px-3 py-2.5 text-center border-b border-white/5">
                      <span className="text-white/60 text-xs sm:text-sm">
                        3.0 kN
                      </span>
                    </div>
                    <div className="bg-white/5 px-3 py-2.5 border-b border-white/5">
                      <span className="text-white/80 text-xs sm:text-sm">
                        Heavy-duty with storage
                      </span>
                    </div>
                  </div>

                  {/* Row 6 — Class 6 */}
                  <div className="grid grid-cols-4 gap-px">
                    <div className="bg-white/[0.03] px-3 py-2.5 rounded-bl-lg">
                      <p className="text-white text-xs sm:text-sm font-medium">
                        Class 6
                      </p>
                    </div>
                    <div className="bg-white/[0.03] px-3 py-2.5 text-center">
                      <span className="text-white text-xs sm:text-sm">
                        600 kg/m&sup2;
                      </span>
                    </div>
                    <div className="bg-white/[0.03] px-3 py-2.5 text-center">
                      <span className="text-white/60 text-xs sm:text-sm">
                        3.0 kN
                      </span>
                    </div>
                    <div className="bg-white/[0.03] px-3 py-2.5 rounded-br-lg">
                      <span className="text-white/80 text-xs sm:text-sm">
                        Special heavy-duty (stone cladding)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-xs text-center mt-3 italic">
                On mobile, scroll horizontally to view all columns
              </p>
            </div>

            <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-slate-300">
                  Class 3 Is the UK Default
                </h3>
              </div>
              <p className="text-white/80 text-sm">
                On most UK construction sites, scaffolds are erected to{" "}
                <strong className="text-white">Class 3 (200 kg/m&sup2;)</strong>
                . This covers general construction tasks such as bricklaying,
                rendering, painting, and light material storage. If your work
                requires heavier loads &mdash; for example, masonry with heavy
                stone or large quantities of stored materials &mdash; a
                higher-class scaffold must be specifically designed and erected.
                Never assume a scaffold can take more than its rated class
                allows.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 02 Maximum Bay Loads ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">02</span>
              Maximum Bay Loads
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The maximum bay load is the total weight that can be safely
                supported by one bay (one lift) of scaffolding. It depends on
                the scaffold&rsquo;s load class, the bay length, the board
                width, and the design of the supporting structure. This
                information <strong>must</strong> be displayed on the scaffold
                load notice at the point of access.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">
                  Calculating Maximum Bay Load
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Bay load = UDL (kg/m&sup2;) &times; bay area (m&sup2;)</strong>{" "}
                      &mdash; for a typical 2.4 m &times; 1.3 m bay at Class 3:
                      200 &times; 3.12 = 624 kg maximum
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>This includes people AND materials</strong>{" "}
                      &mdash; the combined weight of all operatives, tools,
                      equipment, and stored materials on that bay must not
                      exceed the limit
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Each lift is independent</strong> &mdash; the
                      load on one lift does not compensate for a lighter load
                      on another; each bay at each lift must be within its own
                      limit
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The load notice is a legal requirement</strong>{" "}
                      &mdash; if there is no load notice displayed, do not use
                      the scaffold until one is provided
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-lg p-3 sm:p-4 bg-slate-500/10 border-l-2 border-l-slate-500/50 border border-slate-500/30">
                  <p className="font-semibold text-base text-slate-400 mb-2">
                    Cumulative Loading
                  </p>
                  <p className="text-sm text-white/80">
                    Remember that the bay load includes{" "}
                    <strong className="text-white">everything</strong> on that
                    bay: operatives (assume 80&ndash;100 kg per person),
                    their tools, any materials being used, and any materials
                    being stored. It is easy to exceed the limit without
                    realising, especially when multiple trades are working on
                    the same bay simultaneously.
                  </p>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-slate-500/10 border-l-2 border-l-slate-500/50 border border-slate-500/30">
                  <p className="font-semibold text-base text-slate-400 mb-2">
                    Signs of Overloading
                  </p>
                  <p className="text-sm text-white/80">
                    Watch for visible deflection (bowing) in scaffold boards,
                    creaking or cracking sounds, standards leaning or bowing
                    outward, and any movement in the scaffold frame that was
                    not present before. If you notice any of these signs,{" "}
                    <strong className="text-white">
                      evacuate the scaffold immediately
                    </strong>{" "}
                    and report the situation to your supervisor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Distributed vs Point Loads ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">03</span>
              Distributed vs Point Loads
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The way a load is placed on a scaffold platform is just as
                important as the total weight. A load spread evenly across the
                full bay area is far safer than the same weight concentrated in
                one spot. Understanding the difference between distributed loads
                and point loads is critical to preventing scaffold platform
                failure.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Distributed Load */}
                <div className="rounded-xl border-2 border-green-500/50 bg-green-500/5 overflow-hidden">
                  <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-3 text-center">
                    <p className="text-green-400 font-bold text-base">
                      Distributed Load (Safe)
                    </p>
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80">
                        Weight spread <strong className="text-white">
                          evenly
                        </strong>{" "}
                        across the full bay area
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80">
                        All boards and ledgers share the load equally
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80">
                        Stress is within design limits for each component
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80">
                        Example: a single layer of bricks stored across the
                        full bay width and length
                      </span>
                    </div>
                  </div>
                </div>

                {/* Point Load */}
                <div className="rounded-xl border-2 border-red-500/50 bg-red-500/5 overflow-hidden">
                  <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-3 text-center">
                    <p className="text-red-400 font-bold text-base">
                      Point Load (Dangerous)
                    </p>
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80">
                        Weight <strong className="text-white">
                          concentrated
                        </strong>{" "}
                        in a small area of the bay
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80">
                        Only a few boards and one or two ledgers carry all the
                        weight
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80">
                        Individual components may fail even if total weight is
                        within the bay limit
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80">
                        Example: a pallet of bricks placed in the centre of a
                        bay, or a heavy generator on a single board
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Point Loads Can Cause Localised Collapse
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  A scaffold board can typically support 1.5&ndash;3.0 kN as a
                  concentrated load (depending on the board type and span), but
                  this is far less than the total bay load might suggest. If you
                  place 400 kg of materials in a pile on two boards in the
                  middle of a 624 kg bay, those two boards are carrying nearly
                  the entire load. They will deflect, may crack, and could fail
                  completely &mdash; even though the total weight is within the
                  bay&rsquo;s rated capacity. Always{" "}
                  <strong className="text-white">spread the load</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Material Storage on Scaffolds ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">04</span>
              Material Storage on Scaffolds
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Scaffolds are working platforms, not warehouses. Materials may be
                stored on scaffold platforms, but only in accordance with strict
                rules designed to prevent overloading, maintain safe access, and
                reduce the risk of materials falling from height.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Material Storage Rules
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Distribute materials evenly</strong> across the
                      full bay area &mdash; never pile or concentrate materials
                      in one spot
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Never exceed the maximum bay load</strong> &mdash;
                      check the load notice and calculate the combined weight of
                      people, tools, and stored materials
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Never block access or egress routes</strong>{" "}
                      &mdash; ladders, stair towers, trap doors, and walkways
                      must remain clear at all times
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Materials must not project beyond the
                      platform edge</strong> &mdash; anything overhanging the
                      edge can fall and injure people below
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Secure loose materials</strong> against wind
                      &mdash; sheeting, lightweight panels, and packaging can
                      blow off the scaffold in even moderate wind
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Do not lean materials against guard rails</strong>{" "}
                      &mdash; guard rails are designed to resist a person
                      leaning on them, not to support stacked materials which
                      could push them outward
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Only store what you need for the immediate
                      task</strong> &mdash; do not use the scaffold as
                      long-term storage; keep surplus materials at ground level
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Remove all materials at the end of each
                      shift</strong> where practicable &mdash; this prevents
                      overnight wind damage and keeps the scaffold within its
                      load limit
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-slate-300">
                    Housekeeping Is a Safety Measure
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Keeping scaffold platforms clean and tidy is not just about
                  appearance &mdash; it is a{" "}
                  <strong className="text-white">critical safety measure</strong>
                  . Debris, offcuts, packaging, and discarded materials create
                  trip hazards, increase the risk of items falling from height,
                  and add unnecessary weight to the platform. A clean scaffold
                  is a safe scaffold. Every user is responsible for maintaining
                  good housekeeping on the platforms they use.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 05 Loading Bays for Material Hoisting ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">05</span>
              Loading Bays for Material Hoisting
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A loading bay is a specially designed section of the scaffold
                that provides a safe, designated area for hoisting materials up
                to the working platform. It is the{" "}
                <strong>correct method</strong> for getting heavy or bulky
                materials onto a scaffold &mdash; never lift materials over
                guard rails or through gaps in the platform.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">
                  Loading Bay Requirements
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Must be designed into the scaffold</strong>{" "}
                      &mdash; loading bays cannot be improvised; they must be
                      included in the scaffold design and erected by competent
                      scaffolders
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Fitted with self-closing gates</strong> &mdash;
                      the gate must close automatically after materials have
                      been loaded, preventing falls from the open edge
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Adequate load capacity</strong> &mdash; the
                      loading bay must be designed to support the weight of the
                      materials being hoisted, including dynamic loads from the
                      hoisting process
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Not used as a storage area</strong> &mdash;
                      loading bays are for receiving materials only; once
                      unloaded, materials must be moved to the working platform
                      and the bay kept clear
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Gin wheels, hoists, or cranes</strong> may be
                      used to lift materials to the loading bay &mdash; the
                      lifting equipment must be properly rated and inspected
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Never Lift Materials Over Guard Rails
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Lifting or passing materials over the guard rails requires
                  someone to lean over or through the edge protection, creating
                  a serious fall hazard. It also risks dropping materials onto
                  people below. If there is no loading bay and you need to get
                  materials to the platform, speak to your supervisor or the
                  scaffold contractor about providing one.{" "}
                  <strong className="text-white">
                    Never improvise your own solution.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 NEVER Modify a Scaffold ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">06</span>
              NEVER Modify a Scaffold
            </h2>
            <div className="space-y-4 text-white">
              <p>
                One of the most important rules for any scaffold user:{" "}
                <strong>
                  you must NEVER modify, alter, or remove any part of a scaffold
                </strong>
                . Only a competent scaffolder is authorised to make changes to a
                scaffold structure. Unauthorised modifications are a leading
                cause of scaffold-related fatalities in the United Kingdom.
              </p>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Ban className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-red-300 text-base">
                    Prohibited Actions on Scaffolds
                  </h3>
                </div>

                {/* ─── Prohibited Actions Diagram ─── */}
                <div className="space-y-3 text-sm">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                    <Ban className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-300">
                        Do NOT remove scaffold boards
                      </strong>
                      <p className="text-white/70 mt-1">
                        Missing boards create fall-through hazards. Even
                        removing one board compromises the platform&rsquo;s
                        integrity and can lead to a fatal fall.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                    <Ban className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-300">
                        Do NOT remove guard rails or mid-rails
                      </strong>
                      <p className="text-white/70 mt-1">
                        Guard rails are the primary fall protection. Removing
                        them &mdash; even temporarily, even to move materials
                        &mdash; creates an immediate and lethal fall hazard.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                    <Ban className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-300">
                        Do NOT remove toe boards
                      </strong>
                      <p className="text-white/70 mt-1">
                        Toe boards prevent tools, materials, and debris from
                        falling off the platform edge onto people below. Removing
                        them is a falling objects hazard.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                    <Ban className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-300">
                        Do NOT remove or loosen ties
                      </strong>
                      <p className="text-white/70 mt-1">
                        Scaffold ties anchor the scaffold to the building and
                        prevent it from collapsing outward. Removing even one
                        tie can destabilise the entire scaffold.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                    <Ban className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-300">
                        Do NOT remove braces or ledgers
                      </strong>
                      <p className="text-white/70 mt-1">
                        Braces and ledgers provide structural rigidity. Without
                        them, the scaffold frame can rack (twist sideways) and
                        collapse without warning.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                    <Ban className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-300">
                        Do NOT climb the scaffold face
                      </strong>
                      <p className="text-white/70 mt-1">
                        The scaffold frame is not a ladder. It has no proper
                        hand or foot holds and no fall protection on the outside
                        face. Use internal ladders, stair towers, or hoists.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                    <Ban className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-300">
                        Do NOT use the scaffold as support for other structures
                      </strong>
                      <p className="text-white/70 mt-1">
                        Attaching hoists, loading platforms, signage, lighting
                        rigs, or other structures to a scaffold without specific
                        design approval adds unplanned loads and forces that the
                        scaffold was not designed to resist.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                    <Ban className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-300">
                        Do NOT sheet or net the scaffold without design approval
                      </strong>
                      <p className="text-white/70 mt-1">
                        Sheeting and debris netting dramatically increase wind
                        loading on the scaffold. Adding them without the
                        scaffold being designed for the additional wind load can
                        cause catastrophic collapse in high winds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-slate-300">
                    Only Competent Scaffolders May Modify Scaffolds
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  If you need any change to a scaffold &mdash; no matter how
                  small &mdash; you must request it through your supervisor or
                  the scaffold coordinator. The change must be carried out by a
                  competent scaffolder (holding CISRS or equivalent
                  qualification), and the scaffold must be{" "}
                  <strong className="text-white">
                    re-inspected and the scaffold tag updated
                  </strong>{" "}
                  before anyone uses it again. Unauthorised modification of a
                  scaffold can result in criminal prosecution under the Work at
                  Height Regulations 2005.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 07 Reporting Overloading ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">07</span>
              Reporting Overloading
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Overloading is one of the most common and most dangerous
                scaffold-related hazards. It can lead to individual board
                failure, structural collapse of the scaffold frame, and fatal
                falls or crushing injuries. Every scaffold user has a
                responsibility to monitor loading and report any concerns
                immediately.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">
                  What to Do if You Suspect Overloading
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Stop work immediately</strong> and move to a safe
                      location &mdash; do not wait to finish the current task
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Warn other operatives</strong> on or near the
                      scaffold to evacuate the affected area
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Report to your supervisor or scaffold
                      coordinator</strong> immediately &mdash; describe what you
                      have observed (deflection, sounds, visible damage)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Prevent access</strong> to the overloaded area
                      until a competent person has inspected the scaffold and
                      confirmed it is safe to use
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Do not attempt to remove materials
                      yourself</strong> if the scaffold is showing signs of
                      distress &mdash; the act of walking onto the platform or
                      redistributing weight could trigger a failure
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-lg p-3 sm:p-4 bg-red-500/10 border-l-2 border-l-red-500/50 border border-red-500/30">
                  <p className="font-semibold text-base text-red-400 mb-2">
                    Visual Warning Signs
                  </p>
                  <div className="space-y-2 text-sm text-white/80">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Boards bowing or deflecting visibly</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Creaking, cracking, or popping sounds</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Standards leaning or bowing outward</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>
                        Fittings slipping, loosening, or failing
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-slate-500/10 border-l-2 border-l-slate-500/50 border border-slate-500/30">
                  <p className="font-semibold text-base text-slate-400 mb-2">
                    Common Causes of Overloading
                  </p>
                  <div className="space-y-2 text-sm text-white/80">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                      <span>
                        Multiple trades storing materials on the same bay
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                      <span>
                        Not checking the load notice before adding materials
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                      <span>
                        Using a Class 3 scaffold for Class 4/5 work
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                      <span>
                        Placing concentrated point loads instead of distributing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Scaffold User Responsibilities ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">08</span>
              Scaffold User Responsibilities
            </h2>
            <div className="space-y-4 text-white">
              <p>
                As a scaffold user &mdash; whether you are an electrician,
                plumber, painter, bricklayer, or any other trade &mdash; you
                have specific responsibilities every time you step onto a
                scaffold. These responsibilities exist to protect you, your
                colleagues, and anyone working below or near the scaffold.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Your Responsibilities as a Scaffold User
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Check the scaffold tag before use</strong> &mdash;
                      the tag should confirm the scaffold has been inspected and
                      is safe to use; a red or &ldquo;do not use&rdquo; tag
                      means the scaffold is incomplete or unsafe
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Carry out a visual inspection before each
                      use</strong> &mdash; look for missing boards, guard
                      rails, toe boards, damaged or corroded components, and
                      any signs of instability
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Check the load notice</strong> &mdash; know the
                      maximum bay load and ensure your work will not exceed it
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Use the correct access and egress
                      points</strong> &mdash; internal ladders, stair towers,
                      or hoists only; never climb the scaffold face
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Maintain three points of contact</strong> when
                      climbing ladders &mdash; two hands and one foot, or two
                      feet and one hand at all times
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Keep platforms clean and tidy</strong> &mdash;
                      remove debris, offcuts, packaging, and spilt materials
                      promptly
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Report defects immediately</strong> &mdash; any
                      missing, damaged, or modified components must be reported
                      to your supervisor or scaffold coordinator without delay
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Never modify the scaffold</strong> &mdash; do
                      not remove, move, or alter any scaffold component for any
                      reason
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Do not overload the platform</strong> &mdash;
                      distribute materials evenly and keep within the rated bay
                      load at all times
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Wear appropriate PPE</strong> &mdash; hard hat,
                      hi-vis vest, safety boots with ankle support, and any
                      additional PPE specified for your task
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border-2 border-slate-500/40 p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-6 w-6 text-slate-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-slate-300 text-base">
                    Remember: You Are Responsible for Your Own Safety
                  </h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  The scaffold contractor is responsible for providing a safe
                  scaffold. Your employer is responsible for ensuring you are
                  trained and competent to use it. But once you step onto the
                  scaffold,{" "}
                  <strong>
                    you are responsible for using it safely
                  </strong>
                  . If something does not look right, does not feel right, or
                  does not match what you were told in your briefing &mdash;{" "}
                  <strong>stop, get off the scaffold, and report it</strong>.
                  No task is so urgent that it justifies working on an unsafe
                  scaffold. Every fatality investigation starts with someone
                  who noticed something wrong but carried on regardless.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
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

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="Loading, Storage & Prohibited Actions Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-6">
              Next: Module 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default ScaffoldingAwarenessModule5Section4;
