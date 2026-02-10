import { ArrowLeft, ArrowUpFromLine, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "platform-min-width",
    question:
      "What is the minimum platform width for general construction work where materials are stored on the platform?",
    options: [
      "430 mm (three boards wide)",
      "600 mm (four boards wide)",
      "800 mm (five or six boards wide)",
      "1050 mm (seven boards wide)",
    ],
    correctIndex: 2,
    explanation:
      "For general construction work where materials need to be stored on the platform, the minimum width is 800 mm. This provides enough room for the operative to move safely while materials are placed alongside. Narrower platforms (600 mm) are acceptable only for inspection or light duties with no material storage.",
  },
  {
    id: "guard-rail-height",
    question:
      "What is the minimum height for a top guard rail on a working platform under the Work at Height Regulations?",
    options: [
      "750 mm above the platform surface",
      "850 mm above the platform surface",
      "950 mm above the platform surface",
      "1100 mm above the platform surface",
    ],
    correctIndex: 2,
    explanation:
      "The Work at Height Regulations 2005, Schedule 3, require the top guard rail to be at least 950 mm above the platform surface. The gap between the top rail and any intermediate rail, or between the intermediate rail and the toe board, must not exceed 470 mm.",
  },
  {
    id: "board-overhang-limit",
    question:
      "What is the maximum permissible overhang for a 38 mm scaffold board beyond its end support?",
    options: [
      "50 mm (approximately 2 inches)",
      "100 mm (approximately 4 inches)",
      "150 mm (4 times the board thickness)",
      "200 mm (approximately 8 inches)",
    ],
    correctIndex: 2,
    explanation:
      "The maximum overhang for a scaffold board is 4 times the board thickness, with an absolute maximum of 150 mm. For a standard 38 mm board, 4 x 38 mm = 152 mm, so the 150 mm cap applies. Excessive overhang creates a trip hazard and a tipping risk if someone steps on the unsupported end.",
  },
];

const faqs = [
  {
    question:
      "Can I use scaffold boards that have been cut to a shorter length?",
    answer:
      "You should avoid using cut boards wherever possible. A board that has been shortened may no longer span the required distance between supports, and the cut end may not be square, leading to poor bearing on the transom. If a shorter board is genuinely needed, it must still meet the minimum span and overhang requirements, be of the correct thickness (38 mm for standard work), and be secured with board clips. Never use a cut board simply because a full-length board is not available — obtain the correct board for the job.",
  },
  {
    question:
      "Is it acceptable to have a small gap between scaffold boards on a working platform?",
    answer:
      "Yes, but the gap must not exceed 25 mm. Gaps wider than 25 mm create a risk of tools, materials, or debris falling through onto people below, and a potential trip hazard for operatives on the platform. In practice, boards should be laid as close together as possible. Where gaps are unavoidable due to the scaffold configuration, they must be minimised and must never exceed the 25 mm limit. If gaps cannot be closed, additional protection such as plywood sheeting may be required.",
  },
  {
    question:
      "When are brick guards or mesh panels required instead of just guard rails and toe boards?",
    answer:
      "Brick guards and mesh panels are required whenever there is a risk of materials or objects falling from the platform edge and injuring people below. This is common on scaffolds erected on public footpaths, adjacent to occupied buildings, or where brickwork, blockwork, or other materials are being handled at height. Standard guard rails and toe boards alone are not sufficient to prevent small items falling through the gap between the top rail and the toe board. Mesh panels or brick guards fill this gap and provide a physical barrier to falling objects. SG4 guidance and site-specific risk assessments determine when they are needed.",
  },
  {
    question:
      "What should I do if I arrive on site and the working platform on a scaffold looks incomplete?",
    answer:
      "Do not use the scaffold. An incomplete platform — one with missing boards, missing guard rails, missing toe boards, or missing mid rails — is not safe for use and does not comply with the Work at Height Regulations. Report the issue immediately to your supervisor or the site manager. The scaffold should have a scaffold tag or inspection record at the access point. If the tag indicates the scaffold is not complete, or if there is no tag at all, do not access the platform. Only a competent scaffolder should complete or modify the platform, and a fresh inspection must be carried out before the scaffold is returned to use.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under Schedule 3 of the Work at Height Regulations 2005, what is the maximum gap permitted between scaffold boards on a working platform?",
    options: ["10 mm", "15 mm", "25 mm", "50 mm"],
    correctAnswer: 2,
    explanation:
      "Schedule 3 of the Work at Height Regulations 2005 specifies that the maximum gap between boards on a working platform must not exceed 25 mm. Wider gaps create a risk of tools, debris, and small materials falling through onto people below, and present a trip hazard on the platform surface.",
  },
  {
    id: 2,
    question:
      "What are the standard dimensions of a scaffold board used in the UK?",
    options: [
      "25 mm thick x 200 mm wide",
      "38 mm thick x 225 mm wide",
      "50 mm thick x 300 mm wide",
      "32 mm thick x 250 mm wide",
    ],
    correctAnswer: 1,
    explanation:
      "The standard UK scaffold board is 38 mm thick x 225 mm wide. These dimensions are specified in BS 2482. The 38 mm thickness provides the necessary strength for the typical 1.2 m to 1.5 m span between transoms, and the 225 mm width allows platforms to be built up in predictable increments.",
  },
  {
    id: 3,
    question:
      "What is the maximum unsupported span for a 38 mm thick scaffold board?",
    options: ["2.4 m", "3.0 m", "3.9 m", "4.5 m"],
    correctAnswer: 2,
    explanation:
      "The maximum unsupported span for a standard 38 mm scaffold board is 3.9 m. Beyond this distance, the board will deflect excessively under load, creating a bouncy and unsafe platform. If a greater span is needed, either additional transoms must be introduced or thicker boards (50 mm, which can span up to 2.6 m between supports without excessive deflection for heavier loads) must be used.",
  },
  {
    id: 4,
    question:
      "What is the minimum height for the top guard rail above the working platform surface?",
    options: ["750 mm", "850 mm", "950 mm", "1100 mm"],
    correctAnswer: 2,
    explanation:
      "The Work at Height Regulations 2005 (Schedule 3) require the top guard rail to be at a minimum height of 950 mm above the working platform surface. This height provides an effective barrier against falls from the platform edge. Any lower and the rail would be below the centre of gravity for most adults, significantly reducing its effectiveness.",
  },
  {
    id: 5,
    question:
      "What is the maximum gap permitted between the top guard rail and the mid rail (or between the mid rail and the toe board)?",
    options: ["300 mm", "400 mm", "470 mm", "500 mm"],
    correctAnswer: 2,
    explanation:
      "The maximum gap between the top rail and the mid rail, or between the mid rail and the top of the toe board, must not exceed 470 mm. This dimension ensures that a person cannot easily slip through or fall between the rails. If a single mid rail cannot achieve this, additional intermediate rails or mesh infill panels must be fitted.",
  },
  {
    id: 6,
    question: "What is the minimum height requirement for a toe board?",
    options: ["50 mm", "100 mm", "150 mm", "200 mm"],
    correctAnswer: 2,
    explanation:
      "Toe boards must be at least 150 mm high above the platform surface. Their purpose is to prevent tools, materials, and debris from being kicked or rolling off the platform edge. A 150 mm toe board also helps prevent a person's foot from slipping under the guard rail. In areas where materials are stacked, brick guards or mesh panels may be needed in addition to the toe board.",
  },
  {
    id: 7,
    question: "Why are board clips (or board retaining devices) essential on scaffold platforms?",
    options: [
      "They improve the appearance of the scaffold",
      "They prevent boards from lifting in wind or being displaced by foot traffic and equipment",
      "They are only required on mobile scaffolds, not fixed scaffolds",
      "They reduce the number of boards required on the platform",
    ],
    correctAnswer: 1,
    explanation:
      "Board clips prevent scaffold boards from lifting in windy conditions, being displaced by foot traffic, or being knocked out of position by equipment and materials. An unsecured board can tilt, slide, or flip when stepped on near its edge, potentially causing a fall from height. Board clips are required on all scaffold platforms — not just mobile towers.",
  },
  {
    id: 8,
    question:
      "When must a working platform be fully completed before it can be used?",
    options: [
      "Only when the scaffold is above 4 metres in height",
      "Only when the scaffold is on a public highway",
      "Always — platforms must be fully boarded, with guard rails, mid rails, and toe boards in place before any person uses them",
      "Only when the client specifically requests it in writing",
    ],
    correctAnswer: 2,
    explanation:
      "A working platform must always be fully completed before it is used. This means all boards in place with no gaps exceeding 25 mm, guard rails at minimum 950 mm, mid rails fitted so no gap exceeds 470 mm, toe boards at minimum 150 mm, and board clips securing all boards. An incomplete platform is an unsafe platform, regardless of height, location, or perceived urgency. The Work at Height Regulations make no exceptions for partially completed platforms.",
  },
];

export default function ScaffoldingAwarenessModule3Section3() {
  useSEO({
    title:
      "Platforms, Guard Rails & Toe Boards | Scaffolding Awareness Module 3.3",
    description:
      "Working platform requirements, minimum widths, scaffold board specifications, guard rail heights, mid rails, toe boards, board clips, brick guards, and platform completion standards.",
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
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <ArrowUpFromLine className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Platforms, Guard Rails &amp; Toe Boards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Working platform specifications, board dimensions, guard rail
            heights, toe board requirements, and why every component matters for
            fall prevention
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
                <strong>Boards:</strong> 38 mm x 225 mm, max 3.9 m span
              </li>
              <li>
                <strong>Guard rails:</strong> Min 950 mm high, max 470 mm gap
              </li>
              <li>
                <strong>Toe boards:</strong> Min 150 mm high
              </li>
              <li>
                <strong>Platform gaps:</strong> Max 25 mm between boards
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Before:</strong> Check platform is fully complete before
                use
              </li>
              <li>
                <strong>Boards:</strong> Secured with clips, overhang max 150 mm
              </li>
              <li>
                <strong>Width:</strong> Minimum 600 mm for light work, 800 mm
                with materials
              </li>
              <li>
                <strong>Never:</strong> Use an incomplete platform for any reason
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
              "Explain the working platform requirements in Schedule 3 of the Work at Height Regulations 2005",
              "State the minimum platform widths for different types of work",
              "Describe scaffold board dimensions, maximum spans, and overhang limits",
              "Identify the purpose and fitting requirements for board clips",
              "State the minimum guard rail height and maximum gap requirements",
              "Explain the function of mid rails, toe boards, brick guards, and mesh panels",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Working Platform Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">01</span>
            Working Platform Requirements
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Work at Height Regulations 2005</strong>, specifically{" "}
                <strong>Schedule 3</strong>, set out the requirements for working
                platforms used on scaffolding and other temporary structures. These
                requirements exist because falls from working platforms remain one of
                the most common causes of serious injury and death in construction.
                Every element of a working platform &mdash; its width, its boards,
                its edge protection &mdash; is specified to prevent falls and protect
                people both on and below the scaffold.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Schedule 3 &mdash; Key Platform Requirements
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Every working platform must be{" "}
                      <strong className="text-white">
                        suitable and sufficient
                      </strong>{" "}
                      for the work to be carried out and the loads to be imposed
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Platforms must be{" "}
                      <strong className="text-white">
                        stable, of sufficient strength and rigidity
                      </strong>{" "}
                      for the purpose for which they are intended
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Platforms must have{" "}
                      <strong className="text-white">
                        suitable and sufficient guard rails, toe boards, and
                        barriers
                      </strong>{" "}
                      or other means to prevent falls
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The surface of the platform must be such that it is{" "}
                      <strong className="text-white">
                        not liable to give way or buckle
                      </strong>{" "}
                      when any person or equipment is on it
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      No platform shall be loaded so as to give rise to a risk of{" "}
                      <strong className="text-white">
                        collapse or deformation
                      </strong>{" "}
                      that could affect safety
                    </span>
                  </div>
                </div>
              </div>

              <p>
                In plain terms, a scaffold working platform must be wide enough for
                the task, strong enough for the loads, fully boarded with no
                dangerous gaps, and fitted with edge protection on all open sides.
                These are not best-practice suggestions &mdash; they are{" "}
                <strong>legal requirements</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Who Is Responsible?
                </p>
                <p className="text-sm text-white/80">
                  Under the Work at Height Regulations, every{" "}
                  <strong className="text-white">employer</strong> and every{" "}
                  <strong className="text-white">person who controls</strong> the
                  way work at height is carried out must ensure that working
                  platforms comply with Schedule 3. This includes the scaffolding
                  contractor who erects the platform, the principal contractor who
                  manages the site, and any employer whose workers use the scaffold.
                  If you are an operative using a scaffold platform, you have a duty
                  to report any defects immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Minimum Platform Widths */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">02</span>
            Minimum Platform Widths
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The width of a working platform depends on the type of work being
                carried out. Wider platforms are needed when materials must be stored
                or when operatives need room to move freely. The widths below are{" "}
                <strong>minimums</strong> &mdash; platforms should always be as wide
                as reasonably practicable for the task.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Platform Width Categories (BS EN 12811-1)
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-base font-bold text-slate-400">W06</p>
                      <p className="text-xs text-white/50">Min 600 mm</p>
                    </div>
                    <p className="text-white/70 text-xs">
                      Inspection, painting, and light work with no material storage
                      on the platform. Typically three boards wide.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-base font-bold text-slate-400">W09</p>
                      <p className="text-xs text-white/50">Min 900 mm</p>
                    </div>
                    <p className="text-white/70 text-xs">
                      General construction work including bricklaying and blockwork,
                      where materials are stored on the platform alongside the
                      operative.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-base font-bold text-slate-400">W12</p>
                      <p className="text-xs text-white/50">Min 1200 mm</p>
                    </div>
                    <p className="text-white/70 text-xs">
                      Heavier construction activities with significant material
                      storage, or where operatives need to pass each other safely on
                      the platform.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-base font-bold text-slate-400">W24+</p>
                      <p className="text-xs text-white/50">Min 2400 mm</p>
                    </div>
                    <p className="text-white/70 text-xs">
                      Loading bays and wide platforms used for hoisting materials or
                      where plant and equipment is operated on the platform.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                In practice, a domestic scaffold for painters might be three or four
                boards wide (approximately 600&ndash;800 mm), while a bricklayer's
                scaffold carrying materials will typically be five boards wide
                (approximately 1050&ndash;1200 mm) or more. The key principle is
                that the platform must always be wide enough for the operative to
                work safely <strong>without</strong> having to lean over or reach
                beyond the edge protection.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Common Mistake &mdash; Narrow Platforms
                </p>
                <p className="text-sm text-white/80">
                  One of the most common scaffold defects found on site is a platform
                  that is too narrow for the work being done. A bricklayer cannot
                  safely work from a three-board platform with blocks stacked beside
                  them. An electrician installing external cabling cannot safely work
                  from a single-board platform. If the platform is not wide enough
                  for the task,{" "}
                  <strong className="text-white">
                    stop work and request a wider platform
                  </strong>{" "}
                  before continuing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Scaffold Board Specifications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">03</span>
            Scaffold Board Specifications
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scaffold boards are the structural elements that form the walking
                and working surface of a scaffold platform. They are manufactured to{" "}
                <strong>BS 2482</strong> and must meet specific requirements for
                dimensions, strength, and condition. Using boards that are damaged,
                undersized, or incorrectly supported is a direct cause of platform
                collapses and falls.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Standard Scaffold Board &mdash; Key Dimensions
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">Thickness</p>
                    <p className="text-white/70 text-xs">
                      38 mm standard. Boards are also available in 50 mm and 63 mm
                      for heavier-duty applications.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">Width</p>
                    <p className="text-white/70 text-xs">
                      225 mm (approximately 9 inches). This is the standard width
                      used to calculate platform widths in &ldquo;number of
                      boards.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">Length</p>
                    <p className="text-white/70 text-xs">
                      Available in standard lengths of 2.4 m, 3.0 m, and 3.9 m.
                      Lengths up to 4.8 m exist but are less common.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">Material</p>
                    <p className="text-white/70 text-xs">
                      Typically whitewood (spruce) or redwood (pine). Must be
                      straight-grained with no significant defects.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Maximum Span &amp; Overhang Rules
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">38 mm boards:</strong> Maximum
                      unsupported span of{" "}
                      <strong className="text-white">3.9 m</strong> (this is for
                      light-duty use; for general-purpose scaffolds the practical
                      span is typically 1.2 m to 1.5 m between transoms)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">50 mm boards:</strong> Used
                      where heavier loads are expected or where longer spans are
                      required; maximum span depends on the load class
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Maximum overhang:</strong> The
                      board must not project more than{" "}
                      <strong className="text-white">
                        4 times the board thickness
                      </strong>{" "}
                      beyond the supporting transom, with an absolute maximum of{" "}
                      <strong className="text-white">150 mm</strong>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minimum bearing:</strong> Each
                      board must rest on its supporting transom by at least{" "}
                      <strong className="text-white">50 mm</strong> at each end
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Board Condition &mdash; Reject Defective Boards
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Scaffold boards must be inspected before use. Reject any board
                  that is{" "}
                  <strong className="text-white">
                    split, warped, twisted, excessively knotted, rotten, or has
                    been weakened by nail or bolt holes
                  </strong>
                  . A defective board can snap under load without warning. Boards
                  that have been used as formwork and have concrete residue stuck
                  to them should also be rejected &mdash; the concrete can mask
                  underlying damage and affect the grip surface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Board Clips & Platform Gaps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">04</span>
            Board Clips &amp; Platform Gaps
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Board clips</strong> (also called board retaining clips or
                scaffold board clips) are metal fittings that secure scaffold boards
                to the supporting transoms. They prevent boards from lifting in
                wind, sliding under foot traffic, or being displaced by impacts from
                materials and equipment. Every board on a working platform should be
                secured with board clips.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Board Clip Key Facts
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Clips are fitted at{" "}
                      <strong className="text-white">each end</strong> of every
                      board, securing the board to the transom beneath
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      They prevent{" "}
                      <strong className="text-white">
                        wind uplift, lateral sliding, and tipping
                      </strong>{" "}
                      when a board is loaded near its edge
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Board clips are{" "}
                      <strong className="text-white">not optional</strong> &mdash;
                      they are a required component of a compliant working platform
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Missing or damaged board clips should be reported as a{" "}
                      <strong className="text-white">scaffold defect</strong> and
                      rectified before the platform is used
                    </span>
                  </div>
                </div>
              </div>

              <p>
                <strong>Platform gaps</strong> are the spaces between adjacent
                scaffold boards. The{" "}
                <strong>maximum permissible gap is 25 mm</strong>. Gaps wider than
                this create a risk of tools, fixings, and debris falling through
                onto people below, and a trip hazard on the platform surface. Boards
                should be laid as close together as possible, with gaps minimised by
                careful placement.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The 25 mm Rule
                </p>
                <p className="text-sm text-white/80">
                  The 25 mm maximum gap applies to{" "}
                  <strong className="text-white">all gaps</strong> on the platform
                  &mdash; between adjacent boards, between the last board and the
                  scaffold standard, and between the end of a board and any
                  structure or facade. Where gaps cannot be reduced below 25 mm due
                  to the scaffold configuration, additional measures such as{" "}
                  <strong className="text-white">
                    plywood sheeting or infill boards
                  </strong>{" "}
                  must be used to close the gap.
                </p>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">
                    Common On-Site Issue
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Boards are sometimes removed from platforms by other trades to
                  pass materials through, or they are displaced by heavy use and
                  not repositioned. If you arrive at a scaffold and find boards
                  missing, displaced, or with gaps wider than 25 mm,{" "}
                  <strong className="text-white">
                    do not use the scaffold
                  </strong>
                  . Report the defect immediately so it can be rectified by a
                  competent scaffolder.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Guard Rails */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">05</span>
            Guard Rails
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Guard rails are the primary means of preventing falls from the open
                edges of scaffold platforms. Under the{" "}
                <strong>Work at Height Regulations 2005 (Schedule 3)</strong>, guard
                rails must be fitted to{" "}
                <strong>every open side of a working platform</strong> from which a
                person could fall. This includes the outer edge (facing away from
                the building), the ends of the scaffold, and any inner edge where
                there is a gap between the platform and the building facade.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Guard Rail Requirements &mdash; The Numbers
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">
                      Minimum Height
                    </p>
                    <p className="text-white/70 text-xs">
                      The top guard rail must be at least{" "}
                      <strong className="text-white">950 mm</strong> above the
                      platform surface. This height places the rail above the centre
                      of gravity for most adults.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">
                      Maximum Gap
                    </p>
                    <p className="text-white/70 text-xs">
                      The gap between the top rail and any intermediate rail, or
                      between any intermediate rail and the toe board, must not
                      exceed <strong className="text-white">470 mm</strong>.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">Material</p>
                    <p className="text-white/70 text-xs">
                      Guard rails are typically formed from standard scaffold tubes
                      (48.3 mm OD steel tube) secured with right-angle couplers to
                      the scaffold standards.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">Strength</p>
                    <p className="text-white/70 text-xs">
                      Must be capable of withstanding the force of a person leaning
                      against or falling into the rail. Must not deform to the point
                      where the person could fall over or under it.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The 950 mm minimum height is a critical dimension. Below this
                height, the rail is at or below the centre of gravity for most
                adults, meaning a person could topple over the rail rather than being
                stopped by it. The guard rail must be a{" "}
                <strong>rigid horizontal tube</strong> &mdash; it must not be formed
                from warning tape, bunting, rope, or any material that would deform
                when a person falls against it.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Remove Guard Rails
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Guard rails must{" "}
                  <strong className="text-white">never be removed</strong> to
                  accommodate work tasks, pass materials, or gain access. If a
                  guard rail needs to be temporarily removed (for example, to load
                  materials at a specific point), this must be carried out by a
                  competent scaffolder under a controlled system, and the rail must
                  be replaced immediately after. Operatives must never remove guard
                  rails themselves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Mid Rails, Toe Boards & Brick Guards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">06</span>
            Mid Rails, Toe Boards &amp; Brick Guards
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A top guard rail alone is not sufficient edge protection. The gap
                between the top rail and the platform surface would be large enough
                for a person to slide or roll under the rail, or for materials to
                fall from the platform. This is why{" "}
                <strong>mid rails and toe boards</strong> are essential components of
                every scaffold platform.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Mid Rails
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Purpose:</strong> Fill the gap
                      between the top guard rail and the toe board so that no
                      opening exceeds 470 mm
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Position:</strong> Typically
                      fitted at approximately mid-height between the top rail and
                      the platform. The exact height is determined by the 470 mm
                      maximum gap rule
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Material:</strong> Standard
                      scaffold tube (48.3 mm OD) fixed with right-angle couplers to
                      the standards, matching the top guard rail
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Multiple mid rails:</strong> If
                      a single mid rail cannot reduce all gaps to 470 mm or less
                      (for instance, on a very tall guard rail system), additional
                      intermediate rails must be added
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Toe Boards
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minimum height:</strong>{" "}
                      <strong className="text-white">150 mm</strong> above the
                      platform surface
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Purpose:</strong> Prevent
                      tools, materials, and debris from being kicked, rolling, or
                      sliding off the platform edge onto people below
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Secondary purpose:</strong>{" "}
                      Prevent a person&rsquo;s foot from slipping under the guard
                      rail and off the platform edge
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Material:</strong> Typically
                      timber toe boards or metal toe board clips with boards. Must
                      be securely fixed so they cannot be knocked out of position
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fitted on:</strong> Every open
                      side of the platform where guard rails are required, including
                      the inner edge if there is a gap to the building facade
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Brick Guards &amp; Mesh Panels
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Purpose:</strong> Provide a
                      physical barrier across the full height of the edge protection
                      to prevent materials and objects falling from the platform
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">When required:</strong>{" "}
                      Scaffolds over public footpaths, adjacent to occupied
                      buildings, where brickwork or blockwork is being laid at
                      height, and wherever the risk assessment identifies a risk of
                      falling objects
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Specification:</strong> Mesh
                      panels must be fine enough to prevent small items passing
                      through. Brick guards are typically steel mesh panels attached
                      to the guard rails, filling the gap from the toe board to the
                      top rail
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">SG4 guidance:</strong> The NASC
                      SG4 guidance note covers the use of brick guards and debris
                      netting on scaffolds, including when they are required and how
                      they should be fitted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Diagram: Platform Specification Cross-Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">&mdash;</span>
            Platform Specification Cross-Section
          </h2>
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
              <p className="text-sm font-medium text-slate-400 mb-4 text-center">
                Working Platform &mdash; Cross-Section with Dimensions
              </p>
              <div className="relative mx-auto max-w-lg">
                {/* Main platform cross-section */}
                <div className="border-2 border-white/30 rounded-lg bg-[#1a1a1a] p-3 sm:p-4">
                  {/* Guard rail system */}
                  <div className="relative min-h-[280px] sm:min-h-[340px]">
                    {/* Left standard (vertical tube) */}
                    <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-2 bg-white/20 rounded-full" />

                    {/* Right standard (vertical tube) */}
                    <div className="absolute right-2 sm:right-4 top-0 bottom-0 w-2 bg-white/20 rounded-full" />

                    {/* Top guard rail - highlighted */}
                    <div className="absolute left-0 sm:left-2 right-0 sm:right-2 top-0">
                      <div className="h-2 bg-slate-400/60 rounded-full mx-2 sm:mx-4" />
                      <div className="flex justify-between items-start mt-1 px-0 sm:px-2">
                        <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
                          Top guard rail
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold">
                          min 950 mm
                        </span>
                      </div>
                    </div>

                    {/* Height dimension line (left side) */}
                    <div className="absolute left-10 sm:left-14 top-2 bottom-[56px] sm:bottom-[68px] border-l border-dashed border-slate-400/40 flex items-center">
                      <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 border-t border-l border-slate-400/60 rotate-45" />
                      <div className="absolute -left-[3px] bottom-0 w-1.5 h-1.5 border-b border-r border-slate-400/60 rotate-45" />
                    </div>

                    {/* Gap dimension between top rail and mid rail */}
                    <div className="absolute right-10 sm:right-14 top-4 flex flex-col items-center" style={{ height: "calc(45% - 8px)" }}>
                      <div className="h-full border-r border-dashed border-red-400/40" />
                      <span className="text-[8px] sm:text-[9px] text-red-400 font-medium whitespace-nowrap mt-0.5">
                        max 470 mm
                      </span>
                    </div>

                    {/* Mid rail - highlighted */}
                    <div className="absolute left-0 sm:left-2 right-0 sm:right-2" style={{ top: "45%" }}>
                      <div className="h-2 bg-slate-400/40 rounded-full mx-2 sm:mx-4" />
                      <div className="flex justify-between items-start mt-1 px-0 sm:px-2">
                        <span className="text-[9px] sm:text-[10px] text-white/60 font-medium">
                          Mid rail
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-red-400 font-medium">
                          max 470 mm gap
                        </span>
                      </div>
                    </div>

                    {/* Toe board */}
                    <div className="absolute left-2 sm:left-4 right-2 sm:right-4 bottom-[40px] sm:bottom-[48px]">
                      <div className="flex items-end gap-1 sm:gap-2">
                        <div className="flex-1 h-5 sm:h-6 bg-amber-700/40 border border-amber-600/50 rounded-sm flex items-center justify-center">
                          <span className="text-[8px] sm:text-[9px] text-amber-400 font-medium">
                            Toe board &mdash; min 150 mm
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Platform boards */}
                    <div className="absolute left-2 sm:left-4 right-2 sm:right-4 bottom-[16px] sm:bottom-[20px]">
                      <div className="flex gap-[2px]">
                        <div className="flex-1 h-3 sm:h-4 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                        <div className="flex-1 h-3 sm:h-4 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                        <div className="flex-1 h-3 sm:h-4 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                        <div className="flex-1 h-3 sm:h-4 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                        <div className="flex-1 h-3 sm:h-4 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                      </div>
                      <div className="flex justify-between mt-0.5">
                        <span className="text-[8px] sm:text-[9px] text-white/50">
                          38 mm x 225 mm boards
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-white/50">
                          max 25 mm gap
                        </span>
                      </div>
                    </div>

                    {/* Transoms */}
                    <div className="absolute left-2 sm:left-4 right-2 sm:right-4 bottom-[4px] sm:bottom-[6px]">
                      <div className="flex justify-between px-4 sm:px-8">
                        <div className="w-2 h-2 bg-white/30 rounded-full" />
                        <div className="w-2 h-2 bg-white/30 rounded-full" />
                        <div className="w-2 h-2 bg-white/30 rounded-full" />
                      </div>
                      <div className="h-[1px] bg-white/20 mx-4 sm:mx-8 mt-0.5" />
                      <span className="text-[8px] text-white/40 block text-center mt-0.5">
                        Transoms (supporting tubes)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-3 justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-slate-400/60 rounded-sm" />
                    <span className="text-[10px] text-white/60">Guard rail / mid rail</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                    <span className="text-[10px] text-white/60">Scaffold boards</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-amber-700/40 border border-amber-600/50 rounded-sm" />
                    <span className="text-[10px] text-white/60">Toe board</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-white/20 rounded-full" />
                    <span className="text-[10px] text-white/60">Standard / transom</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guard Rail Height Requirements Diagram */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
              <p className="text-sm font-medium text-slate-400 mb-4 text-center">
                Guard Rail Height Requirements &mdash; Elevation View
              </p>
              <div className="relative mx-auto max-w-lg">
                <div className="border-2 border-white/30 rounded-lg bg-[#1a1a1a] p-3 sm:p-4">
                  <div className="relative min-h-[260px] sm:min-h-[300px]">
                    {/* Left standard */}
                    <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-2 bg-white/20 rounded-full" />

                    {/* Right standard */}
                    <div className="absolute right-4 sm:right-8 top-0 bottom-0 w-2 bg-white/20 rounded-full" />

                    {/* Top guard rail with dimension */}
                    <div className="absolute left-3 sm:left-6 right-3 sm:right-6 top-[10px]">
                      <div className="h-2.5 bg-slate-400 rounded-full mx-2" />
                      <p className="text-center text-[9px] sm:text-[10px] text-slate-400 font-bold mt-1">
                        TOP RAIL &mdash; min 950 mm above platform
                      </p>
                    </div>

                    {/* Dimension: top rail to mid rail */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[30px] flex flex-col items-center" style={{ height: "70px" }}>
                      <div className="w-0 flex-1 border-l border-dashed border-red-400/60" />
                      <div className="bg-red-500/20 border border-red-500/40 rounded px-2 py-0.5 my-1">
                        <span className="text-[9px] sm:text-[10px] text-red-400 font-bold whitespace-nowrap">
                          &le; 470 mm
                        </span>
                      </div>
                    </div>

                    {/* Mid rail with dimension */}
                    <div className="absolute left-3 sm:left-6 right-3 sm:right-6 top-[110px]">
                      <div className="h-2 bg-slate-400/60 rounded-full mx-2" />
                      <p className="text-center text-[9px] sm:text-[10px] text-white/60 font-medium mt-1">
                        MID RAIL
                      </p>
                    </div>

                    {/* Dimension: mid rail to toe board */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[130px] flex flex-col items-center" style={{ height: "60px" }}>
                      <div className="w-0 flex-1 border-l border-dashed border-red-400/60" />
                      <div className="bg-red-500/20 border border-red-500/40 rounded px-2 py-0.5 my-1">
                        <span className="text-[9px] sm:text-[10px] text-red-400 font-bold whitespace-nowrap">
                          &le; 470 mm
                        </span>
                      </div>
                    </div>

                    {/* Toe board */}
                    <div className="absolute left-4 sm:left-8 right-4 sm:right-8 top-[200px]">
                      <div className="h-5 bg-amber-700/40 border border-amber-600/50 rounded-sm flex items-center justify-center">
                        <span className="text-[8px] sm:text-[9px] text-amber-400 font-medium">
                          TOE BOARD &mdash; min 150 mm
                        </span>
                      </div>
                    </div>

                    {/* Platform surface */}
                    <div className="absolute left-2 sm:left-4 right-2 sm:right-4 top-[230px]">
                      <div className="flex gap-[2px]">
                        <div className="flex-1 h-3 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                        <div className="flex-1 h-3 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                        <div className="flex-1 h-3 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                        <div className="flex-1 h-3 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                        <div className="flex-1 h-3 bg-amber-800/50 border border-amber-700/40 rounded-sm" />
                      </div>
                      <p className="text-center text-[8px] sm:text-[9px] text-white/40 mt-1">
                        PLATFORM SURFACE
                      </p>
                    </div>

                    {/* Person silhouette hint */}
                    <div className="absolute right-12 sm:right-16 top-[40px] bottom-[50px] flex flex-col items-center justify-end opacity-20">
                      <div className="w-4 h-4 rounded-full border border-white/40" />
                      <div className="w-[1px] h-8 bg-white/40" />
                      <div className="flex">
                        <div className="w-4 h-[1px] bg-white/40 -rotate-12 origin-right" />
                        <div className="w-4 h-[1px] bg-white/40 rotate-12 origin-left" />
                      </div>
                      <div className="flex mt-1">
                        <div className="w-3 h-[1px] bg-white/40 rotate-6 origin-top" />
                        <div className="w-[2px]" />
                        <div className="w-3 h-[1px] bg-white/40 -rotate-6 origin-top" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key dimensions summary */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="bg-slate-500/10 border border-slate-500/20 rounded p-2 text-center">
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold">950 mm</p>
                    <p className="text-[8px] sm:text-[9px] text-white/50">min top rail height</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-2 text-center">
                    <p className="text-[10px] sm:text-xs text-red-400 font-bold">470 mm</p>
                    <p className="text-[8px] sm:text-[9px] text-white/50">max gap between rails</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded p-2 text-center">
                    <p className="text-[10px] sm:text-xs text-amber-400 font-bold">150 mm</p>
                    <p className="text-[8px] sm:text-[9px] text-white/50">min toe board height</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Mesh Panels & Additional Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">07</span>
            Mesh Panels &amp; Additional Protection
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In many situations, guard rails, mid rails, and toe boards alone are
                not sufficient to prevent all falling-object risks. Where there is a
                risk of <strong>materials, tools, or debris falling</strong> from a
                scaffold platform, additional protection in the form of{" "}
                <strong>mesh panels, brick guards, debris netting, or sheeting</strong>{" "}
                must be provided.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Types of Additional Protection
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">
                      Brick Guards (Steel Mesh Panels)
                    </p>
                    <p className="text-white/70 text-xs">
                      Rigid steel mesh panels attached to the guard rail system,
                      filling the gap from the toe board to the top rail. Used where
                      brickwork, blockwork, or loose materials are handled on the
                      platform. The mesh aperture must be small enough to prevent the
                      smallest item on the platform from falling through.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">
                      Debris Netting
                    </p>
                    <p className="text-white/70 text-xs">
                      Fine mesh netting draped over the scaffold face. Commonly used
                      on scaffolds over public areas to catch small items of debris.
                      Debris netting is{" "}
                      <strong className="text-white">not a substitute</strong> for
                      guard rails &mdash; it is an additional measure to protect
                      people below the scaffold.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">
                      Scaffold Sheeting (Monarflex)
                    </p>
                    <p className="text-white/70 text-xs">
                      Solid or semi-solid sheeting attached to the scaffold face.
                      Provides weather protection and containment. Sheeting
                      significantly increases the wind load on the scaffold and must
                      be accounted for in the scaffold design. Additional ties and
                      bracing are typically required.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-slate-400">
                      Fan Protection
                    </p>
                    <p className="text-white/70 text-xs">
                      A horizontal platform projecting outward from the scaffold face
                      to catch falling objects. Used where scaffolds are erected over
                      public highways or pedestrian routes. Fan protection is
                      specified in the scaffold design and must be installed by a
                      competent scaffolder.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Wind Loading Considerations
                </p>
                <p className="text-sm text-white/80">
                  Mesh panels, netting, and sheeting all increase the{" "}
                  <strong className="text-white">
                    wind load acting on the scaffold
                  </strong>
                  . A scaffold designed for open guard rails will experience
                  significantly greater wind forces once sheeting or netting is
                  attached. This must be accounted for in the scaffold design, and
                  additional ties and bracing may be needed. Never attach sheeting
                  or netting to a scaffold unless it has been designed to accept the
                  additional load.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Platform Completion Before Use */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">08</span>
            Platform Completion Before Use
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Fundamental Rule
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  A working platform must be{" "}
                  <strong className="text-white">
                    fully completed before any person uses it
                  </strong>
                  . There are no exceptions. An incomplete platform is an unsafe
                  platform &mdash; regardless of height, perceived urgency, or any
                  other factor. The Work at Height Regulations 2005 are clear: no
                  person shall use a working platform unless it has been
                  constructed, inspected, and certified as safe for use.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Platform Completion Checklist
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">All boards in place</strong>{" "}
                      &mdash; no missing boards, no gaps exceeding 25 mm, no
                      damaged or defective boards
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Board clips fitted
                      </strong>{" "}
                      &mdash; every board secured to the transoms at both ends
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Top guard rails at min 950 mm
                      </strong>{" "}
                      &mdash; on all open sides of the platform
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mid rails fitted</strong>{" "}
                      &mdash; no gap between any two horizontal elements exceeds
                      470 mm
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Toe boards at min 150 mm
                      </strong>{" "}
                      &mdash; on all open sides, securely fixed
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Brick guards or mesh panels
                      </strong>{" "}
                      &mdash; fitted where required by the risk assessment
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Scaffold tag displayed
                      </strong>{" "}
                      &mdash; a scaffold tag or inspection record at the access
                      point confirming the scaffold has been inspected and is safe
                      for use
                    </span>
                  </div>
                </div>
              </div>

              <p>
                The scaffold must be <strong>inspected by a competent person</strong>{" "}
                before first use, after any alteration, after any event likely to
                have affected its stability (such as high winds or impact damage),
                and at intervals not exceeding <strong>7 days</strong>. The results
                of each inspection must be recorded in writing and kept available on
                site.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Scaffold Tags &mdash; What They Tell You
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">Green tag:</strong>{" "}
                      Scaffold has been inspected and is safe for use. Check the
                      date &mdash; it must have been inspected within the last 7
                      days
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">Amber tag:</strong>{" "}
                      Scaffold is incomplete or has restrictions on use. Read the
                      tag carefully to understand what limitations apply
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-red-400">Red tag:</strong> Scaffold is
                      not safe for use. Do not access under any circumstances.
                      Report to the site manager
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">No tag:</strong> Treat as
                      unsafe. Do not use. Report to your supervisor immediately
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Your Responsibility as an Operative
                </p>
                <p className="text-sm text-white/80">
                  Even though you are not the scaffolder who erected the platform,
                  you have a legal duty under the Work at Height Regulations to{" "}
                  <strong className="text-white">
                    check the scaffold before you use it
                  </strong>
                  . Before stepping onto any scaffold platform, look for the
                  scaffold tag, check that all boards are in place and clipped,
                  confirm that guard rails, mid rails, and toe boards are present
                  and secure, and report any defects you find. If something does not
                  look right,{" "}
                  <strong className="text-white">
                    do not use the scaffold
                  </strong>{" "}
                  until the issue has been resolved.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
            <Link to="../scaffolding-awareness-module-3-section-4">
              Next: Bracing, Ties &amp; Stability
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
