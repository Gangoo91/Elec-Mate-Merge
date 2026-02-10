import {
  ArrowLeft,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Zap,
  TruckIcon,
  Warehouse,
  Monitor,
  PackageOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-design-elimination",
    question:
      "What is the most effective way to reduce manual handling risk according to the hierarchy?",
    options: [
      "Providing training on correct lifting technique",
      "Using mechanical aids such as trolleys",
      "Eliminating the manual handling task entirely",
      "Reducing the weight of each load",
    ],
    correctIndex: 2,
    explanation:
      "Elimination is always the most effective control because if the manual handling task no longer exists, the risk is completely removed. Training and mechanical aids are lower in the hierarchy because they reduce risk but do not remove it entirely. The hierarchy is: eliminate, automate, mechanise, improve the task.",
  },
  {
    id: "mh-design-storage",
    question:
      "At what height should the heaviest items be stored to minimise manual handling risk?",
    options: [
      "At floor level, as low as possible",
      "Between waist and shoulder height",
      "Above shoulder height for easy visibility",
      "It does not matter as long as they are accessible",
    ],
    correctIndex: 1,
    explanation:
      "The heaviest items should be stored between waist and shoulder height because this is the zone where the body can generate the most lifting force with the least spinal stress. Storing heavy items at floor level forces stooping, and above shoulder height forces overhead reaching -- both high-risk postures that significantly reduce safe lifting capacity.",
  },
  {
    id: "mh-design-packaging",
    question:
      "How does providing handles or grip points on packaging reduce manual handling risk?",
    options: [
      "It makes the package look more professional",
      "It allows the handler to keep the load close to the body with a secure grip, reducing spinal loading and the risk of dropping",
      "It only helps with loads over 25 kg",
      "It eliminates the need for a risk assessment",
    ],
    correctIndex: 1,
    explanation:
      "Handles and grip points allow the handler to maintain a secure grip and keep the load close to the body. Holding a load close reduces the lever arm and therefore the compressive force on the spine (potentially by a factor of five compared to holding at arm's length). A secure grip also reduces the risk of the load being dropped unexpectedly.",
  },
];

const faqs = [
  {
    question:
      "Is it always possible to eliminate manual handling entirely?",
    answer:
      "No, it is not always possible or reasonably practicable to eliminate manual handling entirely. Some tasks will always require an element of manual handling, even when mechanical aids are used (for example, loading items onto a trolley, positioning a component before using a hoist, or making fine adjustments to equipment). The hierarchy of control recognises this by providing multiple levels below elimination. The legal duty under the Manual Handling Operations Regulations 1992 is to avoid hazardous manual handling 'so far as is reasonably practicable' -- this means considering what is technically possible, the cost of prevention relative to the risk, and the practicality of the control measure. Where elimination is not reasonably practicable, you must move down the hierarchy to automation, mechanisation, or task improvement.",
  },
  {
    question:
      "What is the difference between automation and mechanisation?",
    answer:
      "Automation means the task is performed entirely by machines without human physical involvement in the handling -- for example, a conveyor belt that transports cable reels from a loading bay to a storage area automatically. Mechanisation means using powered equipment to assist the human handler, who still participates in the task -- for example, using a powered pallet truck (the human steers and controls it, but the machine provides the lifting and driving force). In practice, full automation is usually only cost-effective for high-volume, repetitive operations. Mechanisation is much more common and practical for the varied, non-repetitive tasks typical of electrical installation work.",
  },
  {
    question:
      "How can delivery planning reduce manual handling risk?",
    answer:
      "Delivery planning is one of the most powerful and often overlooked methods of reducing manual handling risk. By specifying where deliveries should be placed (direct to the point of use rather than to a central stores area), you eliminate the secondary handling of carrying materials from stores to the work location. Ensuring appropriate vehicle access (so delivery vehicles can get close to the work area) reduces carrying distances. Scheduling deliveries to match the work programme means materials arrive when needed, avoiding double-handling into and out of temporary storage. Specifying how materials should be packaged and palletised (for example, requesting that heavy items are delivered on pallets suitable for pallet truck access) ensures mechanical aids can be used effectively.",
  },
  {
    question:
      "What does 'reasonably practicable' mean in the context of designing out manual handling?",
    answer:
      "The term 'reasonably practicable' is a legal standard used throughout UK health and safety law. It means you must take action to reduce risk unless the cost of doing so (in terms of time, money, and effort) is grossly disproportionate to the risk. In practice, if a manual handling task poses a significant risk of injury and a control measure exists that would effectively reduce that risk at reasonable cost, it must be implemented. The cost of prevention does not need to be zero -- it is balanced against the severity and likelihood of injury. For serious risks (such as heavy manual handling causing back injuries), the threshold for 'reasonably practicable' is high -- significant investment in controls is expected. For trivial risks, less is required. The judgement is objective and would be assessed by a court or tribunal if challenged.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which level of the hierarchy of manual handling risk reduction is the MOST effective?",
    options: [
      "Improving the task through better posture and technique",
      "Mechanising the task with powered equipment",
      "Eliminating the manual handling task entirely",
      "Providing personal protective equipment",
    ],
    correctAnswer: 2,
    explanation:
      "Elimination is the most effective level because it completely removes the risk. If the task no longer involves manual handling, no injury can occur from manual handling. All other levels (automation, mechanisation, task improvement) reduce risk but do not eliminate it.",
  },
  {
    id: 2,
    question:
      "An electrical contractor changes from using 100-metre cable drums to having cable delivered pre-cut to the exact lengths needed for each circuit. This is an example of:",
    options: [
      "Elimination -- the handling task is removed",
      "Substitution -- lighter/smaller loads replace heavier ones",
      "Mechanisation -- powered equipment is used",
      "Task improvement -- better technique is applied",
    ],
    correctAnswer: 1,
    explanation:
      "Using pre-cut cable lengths is substitution because the heavy 100-metre drums are replaced with lighter, smaller, and more manageable pre-cut lengths. The handling task still exists (the pre-cut lengths must still be moved) but the load characteristics have been improved. True elimination would mean no cable handling at all.",
  },
  {
    id: 3,
    question:
      "A company installs a conveyor system to move cable drums from the delivery bay to the cable store, replacing the previous method of manually rolling drums. This is an example of:",
    options: [
      "Elimination",
      "Substitution",
      "Automation",
      "Task improvement",
    ],
    correctAnswer: 2,
    explanation:
      "Installing a conveyor system to move cable drums without human physical involvement is automation. The task (moving drums from bay to store) still needs to happen, but it is now performed by a machine rather than by people. This is different from mechanisation, where the human still participates in the handling.",
  },
  {
    id: 4,
    question:
      "Storing the heaviest cable drums between waist and shoulder height rather than at floor level is an example of:",
    options: [
      "Elimination of manual handling",
      "Automation of the storage process",
      "Storage design to reduce manual handling risk",
      "Substitution with lighter materials",
    ],
    correctAnswer: 2,
    explanation:
      "Positioning heavy items in the 'power zone' between waist and shoulder height is storage design. It reduces the risk associated with the manual handling that remains by ensuring handlers do not need to stoop to floor level or reach above their shoulders -- both high-risk postures.",
  },
  {
    id: 5,
    question:
      "Why should heavy items NOT be stored at floor level?",
    options: [
      "Because they look untidy at floor level",
      "Because lifting from floor level requires stooping, which significantly increases compressive force on the lower spine",
      "Because items at floor level are more likely to be stolen",
      "Because regulations specifically prohibit floor-level storage",
    ],
    correctAnswer: 1,
    explanation:
      "Lifting from floor level requires the handler to stoop (bend forward), which greatly increases the compressive force on the lumbar spine. Combined with the weight of a heavy load, this creates one of the highest-risk manual handling scenarios. Storing heavy items at waist height allows lifting with a more upright posture.",
  },
  {
    id: 6,
    question:
      "Adjustable-height workstations reduce manual handling risk because they:",
    options: [
      "Are more expensive and therefore perceived as higher quality",
      "Allow each worker to set the work surface at their optimal height, reducing bending, stooping, and reaching",
      "Eliminate all manual handling from the workstation",
      "Are required by law in every workplace",
    ],
    correctAnswer: 1,
    explanation:
      "Adjustable-height workstations allow the working surface to be set at the optimal height for each individual worker and each task. This reduces bending, stooping, and overhead reaching -- all high-risk postures. It is a workstation design measure that addresses the Task and Individual factors of the TILE framework.",
  },
  {
    id: 7,
    question:
      "Breaking a large delivery into smaller, more manageable packages is an example of which level of the hierarchy?",
    options: [
      "Elimination",
      "Automation",
      "Substitution (smaller packages replace larger ones)",
      "Mechanisation",
    ],
    correctAnswer: 2,
    explanation:
      "Breaking deliveries into smaller packages is substitution -- replacing a large, heavy, difficult-to-handle load with smaller, lighter, easier-to-handle units. The handling still occurs, but the load characteristics have been improved to reduce risk.",
  },
  {
    id: 8,
    question:
      "Requesting that cable and containment be delivered directly to the floor and area where they will be installed, rather than to a central stores area, is an example of:",
    options: [
      "Elimination through delivery planning",
      "Substitution with lighter materials",
      "Automation of the delivery process",
      "Delivery planning to reduce secondary handling",
    ],
    correctAnswer: 3,
    explanation:
      "Delivering materials directly to the point of use is delivery planning. It eliminates the secondary handling (carrying materials from central stores to the work area) that would otherwise be required. While it does not eliminate the initial unloading, it removes an entire additional handling operation.",
  },
];

export default function ManualHandlingModule3Section4() {
  useSEO({
    title:
      "Designing Out Manual Handling | Manual Handling Module 3.4",
    description:
      "Elimination, substitution, automation, delivery planning, storage design, workstation design, and packaging improvements to reduce manual handling risk in electrical work.",
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
            <Link to="../manual-handling-module-3">
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
            <Lightbulb className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Designing Out Manual Handling
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to reduce or eliminate manual handling risk through elimination,
            substitution, automation, delivery planning, storage design,
            workstation design, and packaging improvements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Eliminate:</strong> can the task be removed entirely?
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Substitute:</strong> lighter materials, smaller
                  packages, pre-cut lengths
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Automate:</strong> powered equipment, conveyor systems
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Improve:</strong> storage, delivery, workstation,
                  packaging design
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              Key Principle
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Prevention</strong> is always better than protection
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Design</strong> the risk out before the work begins
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Training</strong> alone is never sufficient &mdash;
                  redesign the task first
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Involve</strong> workers in designing solutions
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
              "Describe the hierarchy of manual handling risk reduction from elimination to task improvement",
              "Explain the difference between elimination, substitution, automation, and mechanisation",
              "Identify practical delivery planning measures that reduce handling",
              "Describe storage design principles that minimise manual handling risk",
              "Explain how workstation design reduces harmful postures",
              "List packaging improvements that make loads easier and safer to handle",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Elimination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            <XCircle className="h-5 w-5 text-emerald-400" />
            Elimination
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Elimination is the <strong>most effective</strong> level of the
                hierarchy because it completely removes the manual handling risk.
                If the task no longer exists, no injury can occur from it. The
                question to ask is:{" "}
                <strong>
                  &ldquo;Can this manual handling task be removed entirely?&rdquo;
                </strong>
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Examples of Elimination
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Redesigning the process
                      </strong>{" "}
                      so that the load does not need to be moved at all &mdash;
                      for example, locating a distribution board adjacent to the
                      cable entry point rather than across the room, eliminating
                      the need to carry the board.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Using pipework instead of cable
                      </strong>{" "}
                      in certain applications, where the piped service eliminates
                      the need to manually pull heavy cable runs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prefabrication off site
                      </strong>{" "}
                      &mdash; assembling cable looms, distribution boards, or
                      control panels in a workshop environment (where lifting
                      aids are readily available) rather than assembling
                      components individually on site.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Remote or wireless systems
                      </strong>{" "}
                      &mdash; wireless sensors, remote monitoring, and
                      wireless lighting controls can reduce the need for
                      extensive cable installation in some applications.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Key Point:
                  </strong>{" "}
                  Elimination requires thinking about manual handling at the{" "}
                  <strong>design and planning stage</strong>, not after the
                  problem has already been created. Once materials have been
                  delivered to the wrong location or equipment has been
                  specified that requires heavy manual handling, the
                  opportunity for elimination has passed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Substitution */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            <RefreshCw className="h-5 w-5 text-emerald-400" />
            Substitution
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Where the manual handling task cannot be eliminated, the next
                step is to ask:{" "}
                <strong>
                  &ldquo;Can the load be made lighter, smaller, or easier to
                  handle?&rdquo;
                </strong>{" "}
                Substitution replaces a more hazardous handling operation with
                a less hazardous one.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Substitution Methods
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Lighter materials:
                      </strong>{" "}
                      Aluminium cable tray instead of steel, plastic conduit
                      instead of metal, lighter composite materials where
                      performance requirements allow.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Smaller packages:
                      </strong>{" "}
                      Ordering 50-metre cable drums instead of 100-metre drums
                      reduces the weight by half. Requesting that bulk materials
                      are packed in smaller boxes rather than one large container.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Pre-cut lengths:
                      </strong>{" "}
                      Ordering cable, trunking, or conduit pre-cut to the
                      required lengths eliminates the need to handle full-length
                      stock (which may be long, heavy, and unwieldy) and reduces
                      waste.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Concentrated products:
                      </strong>{" "}
                      Where chemical products are used (for cleaning, sealing,
                      or fire-stopping), concentrated versions that are diluted
                      on site reduce the weight of material that must be
                      transported.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Automation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            <Zap className="h-5 w-5 text-emerald-400" />
            Automation and Mechanisation
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Where the task cannot be eliminated or fully substituted, the
                next level is to use powered equipment to perform or assist
                with the handling.{" "}
                <strong>Automation</strong> removes the human from the handling
                entirely; <strong>mechanisation</strong> provides powered
                assistance while the human retains control.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Automation
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Conveyor systems for material transport</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Automated storage and retrieval systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Robotic palletising and depalletising</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Best for high-volume, repetitive operations</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-emerald-400 mb-2">
                    Mechanisation
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Powered pallet trucks and stackers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Electric hoists and chain blocks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Powered cable pulling equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>More practical for varied, non-repetitive work</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Important
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Automation and mechanisation introduce their own hazards
                  (moving parts, electrical energy, noise, maintenance
                  requirements). These must be assessed and controlled. The
                  overall risk should still be lower than the original manual
                  handling task &mdash; otherwise the control measure is not
                  effective.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Delivery Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            <TruckIcon className="h-5 w-5 text-emerald-400" />
            Delivery Planning
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Delivery planning is one of the most powerful and cost-effective
                methods of reducing manual handling. By controlling{" "}
                <strong>where, when, and how</strong> materials arrive on site,
                you can eliminate entire handling operations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Delivery Planning Measures
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Direct to point of use:
                      </strong>{" "}
                      Specify that materials be delivered as close as possible to
                      where they will be installed. Cable drums delivered to the
                      riser room, distribution boards delivered to the floor they
                      will serve, containment delivered to the area where it will
                      be fixed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Appropriate vehicle access:
                      </strong>{" "}
                      Ensure delivery vehicles can get close to the unloading
                      area. A lorry with a tail lift parked next to the building
                      entrance is far better than one parked 100 metres away
                      across rough ground.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Timed deliveries:
                      </strong>{" "}
                      Schedule deliveries to match the work programme so
                      materials arrive when they are needed. This avoids
                      double-handling into and out of temporary storage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Pallet-friendly delivery:
                      </strong>{" "}
                      Request that heavy items are palletised in a way that
                      allows pallet truck access. Specify pallet dimensions
                      compatible with doorway and corridor widths.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Electrician Example:
                  </strong>{" "}
                  On a multi-storey building project, arranging for cable drums
                  to be craned directly onto each floor through the building
                  facade before it is closed in eliminates the need to carry
                  100+ kg drums up stairwells. This requires planning during the
                  construction programme but saves enormous manual handling
                  effort later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Storage Design */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            <Warehouse className="h-5 w-5 text-emerald-400" />
            Storage Design
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                How and where materials are stored has a direct impact on the
                manual handling required to access them. Good storage design
                reduces bending, reaching, and carrying distances.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Storage Design Principles
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Heavy items at waist height:
                      </strong>{" "}
                      Store the heaviest and most frequently accessed items
                      between waist and shoulder height (the &ldquo;power
                      zone&rdquo;). This eliminates stooping and overhead
                      reaching for the items that pose the greatest risk.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Light items higher or lower:
                      </strong>{" "}
                      Lighter, less frequently used items can be stored at higher
                      or lower levels where the reduced lifting capacity is
                      acceptable.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        No floor storage of heavy items:
                      </strong>{" "}
                      Avoid placing heavy items directly on the floor. Use
                      racking, pallet positions, or raised platforms to keep
                      heavy items above knee height.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Clear access routes:
                      </strong>{" "}
                      Ensure aisles are wide enough for trolleys and pallet
                      trucks. Remove trip hazards. Maintain clear routes from
                      storage to work areas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Labelling and organisation:
                      </strong>{" "}
                      Clear labelling prevents workers from having to move
                      multiple items to find what they need. Good organisation
                      reduces unnecessary handling.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Power Zone
                </p>
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg text-center">
                  <div className="space-y-1 text-xs">
                    <div className="py-2 px-4 bg-white/5 rounded border border-white/10 text-white/60">
                      Above shoulder &mdash; LIGHT items only
                    </div>
                    <div className="py-3 px-4 bg-emerald-500/20 rounded border border-emerald-500/30 text-emerald-300 font-bold">
                      Waist to shoulder &mdash; HEAVY &amp; frequent items (POWER ZONE)
                    </div>
                    <div className="py-2 px-4 bg-white/5 rounded border border-white/10 text-white/60">
                      Knee to waist &mdash; Medium items
                    </div>
                    <div className="py-2 px-4 bg-red-500/10 rounded border border-red-500/20 text-red-300">
                      Floor level &mdash; AVOID for heavy items
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Workstation and Packaging Design */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            <Monitor className="h-5 w-5 text-emerald-400" />
            Workstation Design
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Workstation design focuses on organising the immediate work
                area to minimise harmful postures. For electricians, the
                &ldquo;workstation&rdquo; may be a bench in a workshop, a
                position at a distribution board, or a section of containment
                route.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Workstation Design Principles
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Adjustable height:
                      </strong>{" "}
                      Work surfaces that can be adjusted to suit each worker and
                      each task. This eliminates bending and stooping for shorter
                      workers and overhead reaching for taller workers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduce reaching:
                      </strong>{" "}
                      Position tools and materials within easy arm&rsquo;s
                      reach. Frequently used items closest, occasionally used
                      items further away. Avoid layouts that require twisting or
                      stretching to access items.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Turntables and tilting devices:
                      </strong>{" "}
                      Turntables allow the worker to rotate the workpiece rather
                      than twisting their body. Tilting stands bring the work
                      face towards the worker, reducing bending.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Anti-fatigue matting:
                      </strong>{" "}
                      For workers who stand for extended periods, anti-fatigue
                      mats reduce leg and back fatigue, improving comfort and
                      reducing the cumulative strain of standing.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Packaging */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            <PackageOpen className="h-5 w-5 text-emerald-400" />
            Packaging Improvements
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                How a load is packaged directly affects how easy and safe it is
                to handle. Improving packaging is a practical, cost-effective
                method of reducing manual handling risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Packaging Design Measures
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Handles and grip points:
                      </strong>{" "}
                      Adding handles, hand holes, or textured grip surfaces
                      allows the handler to maintain a secure grip and keep the
                      load close to the body. This alone can reduce spinal
                      loading by up to five times.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Smaller units:
                      </strong>{" "}
                      Breaking bulk supplies into smaller, lighter packages
                      reduces the weight per lift. Five boxes of 20 kg are
                      generally safer than one box of 100 kg, even though the
                      total weight is the same.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Weight marking:
                      </strong>{" "}
                      Clearly marking the weight of each package allows handlers
                      to assess the risk before lifting and decide whether
                      assistance or a mechanical aid is needed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Stable shape:
                      </strong>{" "}
                      Packaging that creates a regular, stable shape with a
                      central centre of gravity is easier and safer to handle
                      than irregular or asymmetric packaging.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Protection from hazards:
                      </strong>{" "}
                      Packaging that protects the handler from sharp edges, rough
                      surfaces, splinters, or temperature extremes allows secure
                      handling without the risk of reflexive release.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Hierarchy of MH Reduction Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">
              &mdash;
            </span>
            Hierarchy of MH Reduction
          </h2>
          <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-4 sm:p-6">
            <p className="text-xs text-white/60 text-center mb-4">
              Most effective at top, least effective at bottom
            </p>
            <div className="space-y-2 max-w-lg mx-auto">
              {/* Level 1 - Eliminate */}
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-sm font-bold text-emerald-300">
                  ELIMINATE
                </p>
                <p className="text-xs text-white/70">
                  Remove the manual handling task entirely
                </p>
              </div>

              <div className="text-center text-white/30 text-xs">&darr;</div>

              {/* Level 2 - Automate */}
              <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-lg px-4 py-3 text-center mx-4">
                <p className="text-sm font-bold text-emerald-300/90">
                  AUTOMATE
                </p>
                <p className="text-xs text-white/70">
                  Use powered systems with no human handling
                </p>
              </div>

              <div className="text-center text-white/30 text-xs">&darr;</div>

              {/* Level 3 - Mechanise */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3 text-center mx-8">
                <p className="text-sm font-bold text-emerald-400/80">
                  MECHANISE
                </p>
                <p className="text-xs text-white/70">
                  Use mechanical aids to assist the handler
                </p>
              </div>

              <div className="text-center text-white/30 text-xs">&darr;</div>

              {/* Level 4 - Improve Task */}
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center mx-12">
                <p className="text-sm font-bold text-white/70">
                  IMPROVE TASK
                </p>
                <p className="text-xs text-white/60">
                  Better storage, delivery, packaging, workstation design
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-2 text-xs text-white/60 max-w-lg mx-auto">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-white/80">Training alone</strong> is
                  at the bottom of the hierarchy. It should only be relied upon
                  after all higher-level controls have been considered and
                  applied so far as is reasonably practicable. Training
                  supplements good design &mdash; it does not replace it.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Bringing It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Bringing It All Together
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Designing out manual handling is not a one-time activity. It is
                an ongoing process that should be embedded into project
                planning, procurement, site logistics, and daily work
                practices. Every decision &mdash; from which materials to
                specify, to where storage areas are located, to how deliveries
                are scheduled &mdash; either creates or prevents manual handling
                risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Application Checklist
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>Can this manual handling task be eliminated entirely by redesigning the process?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>Can lighter materials, smaller packages, or pre-cut lengths be substituted?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>Can the task be automated or mechanised with powered equipment?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>Can deliveries be planned to go directly to the point of use?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>Are heavy items stored at waist height rather than floor level?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>Is the workstation designed to reduce reaching, bending, and twisting?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>Does the packaging have handles, weight markings, and a stable shape?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <span>Have workers been consulted on the design of solutions?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Final Reminder
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Training is not a substitute for design.
                  </strong>{" "}
                  Research consistently shows that &ldquo;correct lifting
                  technique&rdquo; training alone does not significantly reduce
                  manual handling injuries. The most effective approach is to
                  design the risk out of the task first, then train workers in
                  the correct use of the controls that have been implemented.
                  Training supplements good design &mdash; it does not replace
                  it.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Mechanical Aids
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-4">
              Next: Module 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
