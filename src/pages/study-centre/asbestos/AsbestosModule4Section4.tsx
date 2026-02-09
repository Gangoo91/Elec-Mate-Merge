import { ArrowLeft, Wrench, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wet-working-methods",
    question:
      "Why must RPE still be worn even when wet working methods are used?",
    options: [
      "Because wetting reduces but does not eliminate airborne fibre release",
      "Because RPE is only required for dry working methods",
      "Because wet working only applies to licensed work",
      "Because wetting makes the material more dangerous",
    ],
    correctIndex: 0,
    explanation:
      "Wet working methods are the single most effective technique for reducing airborne fibre release, but they do NOT eliminate the hazard entirely. Some fibres will still become airborne, particularly during physical disturbance of the material. RPE must always be worn regardless of whether wet methods are being used.",
  },
  {
    id: "shadow-vacuuming",
    question:
      "What type of vacuum cleaner MUST be used for shadow vacuuming during asbestos work?",
    options: [
      "A Type H (HEPA) vacuum cleaner that captures particles down to 0.3 microns",
      "Any industrial vacuum cleaner with a dust bag",
      "A standard domestic vacuum with a HEPA filter attachment",
      "A wet-and-dry vacuum cleaner rated for construction use",
    ],
    correctIndex: 0,
    explanation:
      "Only Type H (HEPA) vacuum cleaners classified to BS EN 60335-2-69 may be used for asbestos work. They capture 99.995% of particles down to 0.3 microns. Ordinary vacuum cleaners — including industrial models without HEPA filtration — exhaust fibres back into the air and MUST NOT be used for any asbestos-related cleaning.",
  },
  {
    id: "prohibited-tools",
    question:
      "Which of the following tools is specifically PROHIBITED for use on asbestos-containing materials?",
    options: [
      "High-speed abrasive cutting tools such as angle grinders",
      "Hand spray bottles for wetting",
      "Type H HEPA-filtered vacuum cleaners",
      "Airless spray units for water injection",
    ],
    correctIndex: 0,
    explanation:
      "High-speed abrasive cutting tools (angle grinders, circular saws) are specifically prohibited under CAR 2012 for use on asbestos-containing materials because they generate massive fibre clouds. Hand spray bottles, airless spray units, and Type H vacuums are all approved controlled-work tools used to minimise fibre release.",
  },
];

const faqs = [
  {
    question: "Can I use a standard vacuum cleaner if it has a HEPA filter?",
    answer:
      "No. Even if a domestic or commercial vacuum cleaner has an aftermarket HEPA filter, it does not meet the Type H classification (BS EN 60335-2-69) required for asbestos work. Type H vacuums are specifically designed and tested to prevent fibre leakage from the entire unit — not just the filter. The motor housing, seals, hose connections, and exhaust are all designed to contain asbestos fibres. A standard vacuum with a HEPA filter may still leak fibres through other parts of the unit. Only Type H vacuums must be used for any asbestos-related work.",
  },
  {
    question: "What is the purpose of adding PVA to water when wetting ACMs?",
    answer:
      "PVA (polyvinyl acetate) solution is sometimes added to wetting water to improve fibre binding. The PVA creates a thin adhesive film that helps bind loose asbestos fibres together more effectively than water alone. As the PVA dries, it forms a flexible seal over the material surface, reducing the risk of subsequent fibre release during handling and bagging. This technique is particularly useful when working with friable materials such as sprayed coatings or lagging, where maximum fibre suppression is critical.",
  },
  {
    question: "What is the 4-stage clearance process for enclosures?",
    answer:
      "The 4-stage clearance process is required before a full enclosure can be dismantled after licensed asbestos removal. Stage 1: A preliminary check of the work area by the licensed contractor's supervisor to ensure all visible asbestos has been removed. Stage 2: A thorough visual inspection by an independent analyst to confirm no visible asbestos debris, dust, or contamination remains. Stage 3: Air monitoring (reassurance air test) — the enclosure is disturbed to simulate normal use, and air samples are taken to confirm fibre levels are below the clearance indicator of 0.01 fibres/ml. Stage 4: A final visual inspection after the site has been returned to normal use to confirm it remains clean. Only after all four stages are satisfactorily completed can the enclosure be dismantled and the area handed back.",
  },
  {
    question: "What happens if an enclosure fails a smoke test?",
    answer:
      "A smoke test is performed before any work begins inside a full enclosure to check the integrity of the polythene sheeting and all sealed joints. Smoke is generated inside the enclosure and the analyst checks the exterior for any visible smoke leakage. If smoke is detected escaping from the enclosure, work CANNOT begin. The leak must be identified and sealed, and the smoke test must be repeated until no leakage is found. This is essential because the enclosure must maintain negative pressure throughout the work — any gaps would allow contaminated air to escape into surrounding areas. Work must not commence until the enclosure passes the smoke test.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the single most effective technique for reducing airborne fibre release during asbestos work?",
    options: [
      "Wet working methods",
      "Shadow vacuuming alone",
      "Using RPE without other controls",
      "Working quickly to minimise exposure time",
    ],
    correctAnswer: 0,
    explanation:
      "Wet working methods are the single most effective technique for reducing airborne fibre release. Water suppresses fibre release by binding fibres together. Materials should be thoroughly wetted BEFORE work begins and kept wet throughout — they must not be allowed to dry out. However, wetting alone does not eliminate the hazard; it must be combined with RPE and other controls.",
  },
  {
    id: 2,
    question:
      "During shadow vacuuming, where should the vacuum nozzle be positioned?",
    options: [
      "At the far side of the room to create airflow",
      "Close to the point of work, shadowing the hand tool",
      "Outside the enclosure to draw air through",
      "Pointed at the ceiling to capture rising fibres",
    ],
    correctAnswer: 1,
    explanation:
      "During shadow vacuuming, the vacuum nozzle is held close to the point of work — 'shadowing' the hand tool being used. This captures fibres at source before they become airborne and disperse into the work area. Shadow vacuuming is most effective when combined with wet working methods.",
  },
  {
    id: 3,
    question: "What is a glove bag used for in asbestos removal?",
    options: [
      "Storing contaminated PPE after use",
      "Removing asbestos lagging from pipes in small sections",
      "Collecting air samples during monitoring",
      "Transporting asbestos waste to the skip",
    ],
    correctAnswer: 1,
    explanation:
      "A glove bag is a sealed, transparent plastic bag fitted around a pipe or small item to contain fibre release during removal of asbestos lagging. The worker reaches into the bag through integral gloves to carry out the work. After removal, the bag is sealed with the waste inside and disposed of as asbestos waste. Glove bags are suitable for licensed work on small sections — large areas require full enclosures.",
  },
  {
    id: 4,
    question:
      "What is the minimum polythene sheeting thickness required for constructing a full enclosure?",
    options: [
      "50 micron",
      "75 micron",
      "125 micron (preferably 250 micron)",
      "500 micron",
    ],
    correctAnswer: 2,
    explanation:
      "Full enclosures must be constructed from polythene sheeting of minimum 125 micron thickness, with 250 micron preferred. All surfaces within the enclosure — walls, floor, and ceiling — must be sheeted. The enclosure must be airtight, with a 3-stage airlock for personnel and a separate waste airlock for removing bagged waste.",
  },
  {
    id: 5,
    question:
      "What must be done before work begins inside a full enclosure?",
    options: [
      "The enclosure must be painted white for visibility",
      "The enclosure must be smoke-tested to check for leaks",
      "The enclosure must be left sealed for 24 hours to settle",
      "The enclosure must be heated to prevent condensation",
    ],
    correctAnswer: 1,
    explanation:
      "Before any asbestos removal work begins inside a full enclosure, it must be smoke-tested to check for leaks. Smoke is generated inside the enclosure while an analyst checks the exterior for visible smoke escaping. If any leaks are found, they must be sealed and the test repeated. Work cannot commence until the enclosure passes the smoke test. This ensures the enclosure will maintain negative pressure and prevent contaminated air from escaping.",
  },
  {
    id: 6,
    question: "Why are high-speed abrasive cutting tools prohibited for use on ACMs?",
    options: [
      "They are too noisy for indoor use",
      "They generate massive fibre clouds that cannot be controlled",
      "They damage the material being cut",
      "They are too expensive for asbestos work",
    ],
    correctAnswer: 1,
    explanation:
      "High-speed abrasive cutting tools such as angle grinders and circular saws are specifically prohibited under CAR 2012 for use on asbestos-containing materials because they generate massive, uncontrollable fibre clouds. The high-speed rotating action breaks the material apart at a rate that overwhelms all control measures. Similarly prohibited are dry drilling without extraction, compressed air cleaning, standard vacuum cleaners, dry sweeping, and power sanding.",
  },
  {
    id: 7,
    question:
      "What is the role of the Negative Pressure Unit (NPU) in a full enclosure?",
    options: [
      "It heats the enclosure to prevent condensation",
      "It maintains negative pressure so air flows INTO the enclosure, preventing fibre escape",
      "It provides fresh air for workers inside the enclosure",
      "It dries the asbestos material before removal",
    ],
    correctAnswer: 1,
    explanation:
      "The Negative Pressure Unit (NPU) is fitted with a HEPA filter and maintains negative pressure inside the enclosure at all times. This means air always flows INTO the enclosure through any small gaps or openings, rather than contaminated air flowing out. The NPU exhausts filtered air to the outside. This is a critical engineering control that prevents asbestos fibres from escaping the work area into surrounding occupied spaces.",
  },
  {
    id: 8,
    question:
      "Which of the following is a required step in work area preparation before asbestos work begins?",
    options: [
      "Open all windows to increase ventilation",
      "Turn on the air conditioning to keep workers cool",
      "Turn off air conditioning and seal all openings, vents, and service penetrations",
      "Remove only valuable items from the work area",
    ],
    correctAnswer: 2,
    explanation:
      "Before asbestos work begins, air conditioning and mechanical ventilation serving the area must be turned OFF — not on. All openings, vents, and service penetrations must be sealed with tape and polythene to prevent fibre spread to other areas of the building. Opening windows or running air conditioning would spread fibres. Additionally, all items that cannot be decontaminated must be removed or protected, and polythene sheeting (minimum 500 gauge) must be laid on floors.",
  },
];

export default function AsbestosModule4Section4() {
  useSEO({
    title:
      "Controlled Work Techniques | Asbestos Awareness Module 4.4",
    description:
      "Wet working methods, shadow vacuuming, glove bags, full enclosures, Class H vacuums, prohibited tools and methods, and work area preparation for asbestos work.",
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
            <Link to="../asbestos-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-400/20 border border-orange-500/30 mb-4">
            <Wrench className="h-7 w-7 text-orange-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Controlled Work Techniques
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Wet working methods, shadow vacuuming, glove bags, full enclosures,
            Class&nbsp;H vacuums, prohibited tools, and work area preparation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Wet working:</strong> Single most effective fibre
                suppression technique
              </li>
              <li>
                <strong>Shadow vacuuming:</strong> Type&nbsp;H HEPA vacuum held
                at point of work
              </li>
              <li>
                <strong>Enclosures:</strong> Full sealed area with negative
                pressure for licensed work
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Type H vacuums:</strong> 99.995% capture at 0.3 microns
              </li>
              <li>
                <strong>Prohibited:</strong> Angle grinders, dry drilling,
                compressed air
              </li>
              <li>
                <strong>4-stage clearance:</strong> Required before enclosure
                dismantling
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
              "Explain wet working methods and why they are the most effective fibre suppression technique",
              "Describe the shadow vacuuming technique and the requirement for Type H HEPA vacuums",
              "Understand the glove bag technique and its application for small-section lagging removal",
              "Describe the construction and operation of full enclosures for licensed asbestos removal",
              "Identify Class H vacuum cleaner requirements and proper maintenance",
              "List the tools and methods specifically prohibited for use on ACMs under CAR 2012",
              "Explain the key steps in work area preparation before asbestos work begins",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Wet Working Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            Wet Working Methods
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Wet working is the <strong>single most effective technique</strong>{" "}
                for reducing airborne fibre release during asbestos work. Water
                suppresses fibre release by <strong>binding fibres together</strong>,
                preventing them from becoming airborne when the material is disturbed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Wetting Methods
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hand spray bottle:</strong>{" "}
                      Simple, portable method for small areas and light wetting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Airless spray unit:</strong>{" "}
                      Low-pressure spray that wets material without blasting it
                      apart
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Water injection:</strong>{" "}
                      Injected directly into the material to wet it from the
                      inside out &mdash; used for thick insulation and lagging
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Key Principles
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Materials must be{" "}
                      <strong className="text-white">
                        thoroughly wetted BEFORE
                      </strong>{" "}
                      any work begins &mdash; do not start work on dry material
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Continue wetting{" "}
                      <strong className="text-white">
                        throughout the work
                      </strong>{" "}
                      &mdash; do not allow the material to dry out at any stage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Some materials (e.g., sprayed coatings, lagging) absorb{" "}
                      <strong className="text-white">
                        large quantities of water
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Excess water must be contained and may need to be treated
                      as{" "}
                      <strong className="text-white">contaminated waste</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">PVA solution</strong> can
                      be added to water for better fibre binding &mdash; it
                      forms a thin adhesive film that seals loose fibres
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    RPE Must Still Be Worn
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Wetting{" "}
                  <strong className="text-white">
                    does not eliminate the hazard
                  </strong>
                  . It significantly reduces airborne fibre levels, but some
                  fibres will still become airborne during physical disturbance.{" "}
                  <strong className="text-white">
                    RPE must always be worn
                  </strong>{" "}
                  when working with asbestos-containing materials, regardless of
                  whether wet working methods are being used.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Shadow Vacuuming */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">02</span>
            Shadow Vacuuming
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Shadow vacuuming involves using a{" "}
                <strong>Class&nbsp;H HEPA-filtered vacuum</strong> simultaneously
                with hand tools during asbestos work. The vacuum nozzle is held{" "}
                <strong>close to the point of work</strong> &mdash;
                &ldquo;shadowing&rdquo; the tool &mdash; to capture fibres at
                source before they become airborne.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How It Works
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The vacuum nozzle is held{" "}
                      <strong className="text-white">
                        as close as possible
                      </strong>{" "}
                      to the point where fibres are being released
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Captures fibres{" "}
                      <strong className="text-white">at source</strong> before
                      they disperse into the wider work area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Used{" "}
                      <strong className="text-white">
                        in combination with wet working
                      </strong>{" "}
                      for maximum effectiveness
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Type&nbsp;H Only
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The vacuum{" "}
                  <strong className="text-white">
                    MUST be a Type&nbsp;H (HEPA)
                  </strong>{" "}
                  vacuum cleaner. Ordinary vacuum cleaners &mdash; including
                  industrial models without HEPA filtration &mdash;{" "}
                  <strong className="text-white">MUST NOT be used</strong>.
                  They exhaust fibres back into the air through their exhaust
                  port. Type&nbsp;H vacuums have HEPA filtration that captures
                  particles down to 0.3&nbsp;microns. Vacuum bags are disposed
                  of as asbestos waste.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Glove Bag Technique */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">03</span>
            Glove Bag Technique
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A glove bag is a{" "}
                <strong>
                  sealed, transparent plastic bag fitted around a pipe or small
                  item
                </strong>{" "}
                to contain fibre release during removal of asbestos lagging. It
                allows removal work to be carried out in a contained environment
                without the need for a full enclosure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How the Glove Bag Works
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The bag is{" "}
                      <strong className="text-white">
                        sealed around the pipe
                      </strong>{" "}
                      with tape, creating an airtight enclosure around the
                      section to be removed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The worker reaches into the bag through{" "}
                      <strong className="text-white">integral gloves</strong>{" "}
                      &mdash; hands never touch the material directly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      All work is{" "}
                      <strong className="text-white">
                        contained within the sealed bag
                      </strong>{" "}
                      &mdash; fibres cannot escape into the surrounding air
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      After removal, the bag is{" "}
                      <strong className="text-white">
                        sealed with the waste inside
                      </strong>{" "}
                      and disposed of as asbestos waste
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The transparent material provides{" "}
                      <strong className="text-white">
                        visual confirmation
                      </strong>{" "}
                      of work progress throughout the process
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">Limitations:</strong> Glove
                  bags are suitable for{" "}
                  <strong>
                    licensed work on small sections of lagging only
                  </strong>
                  . They are not suitable for large areas of asbestos removal
                  &mdash; a <strong>full enclosure</strong> is required instead.
                  The technique is most effective on straight pipe runs where the
                  bag can form a good seal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Styled-div diagram: Enclosure Setup (Plan View) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">&nbsp;</span>
            Enclosure Setup &mdash; Plan View
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="bg-[#111] border-2 border-orange-500/40 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <p className="text-xs text-orange-400 font-semibold mb-4 text-center tracking-widest uppercase">
                Schematic &mdash; Not to Scale
              </p>

              {/* Outer boundary */}
              <div className="relative border-2 border-orange-400/60 rounded-lg p-4 sm:p-6 min-h-[460px] sm:min-h-[420px] min-w-[320px]">
                {/* Perimeter label */}
                <div className="absolute -top-3 left-4 sm:left-6 bg-[#111] px-2">
                  <span className="text-[10px] sm:text-xs text-orange-400 font-semibold">
                    Work Area Boundary / Controlled Area
                  </span>
                </div>

                {/* Danger signage at perimeter */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#111] px-2">
                  <span className="text-[9px] sm:text-[10px] text-red-400 font-bold tracking-wide">
                    DANGER &mdash; Asbestos removal in progress
                  </span>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5">
                  {/* 3-Stage Airlock */}
                  <div>
                    <p className="text-[10px] text-white/50 mb-2 font-medium">
                      Personnel Entry / Exit
                    </p>
                    <div className="flex items-stretch gap-0">
                      <div className="flex-1 border-2 border-green-400/50 bg-green-500/10 rounded-l-lg p-2 sm:p-3 text-center min-h-[56px] flex flex-col items-center justify-center">
                        <span className="text-[10px] sm:text-xs font-bold text-green-400 block">
                          Clean End
                        </span>
                        <span className="text-[9px] text-white/50 block mt-0.5">
                          Stage 3
                        </span>
                      </div>
                      <div className="w-[2px] bg-white/20" />
                      <div className="flex-1 border-y-2 border-blue-400/50 bg-blue-500/10 p-2 sm:p-3 text-center min-h-[56px] flex flex-col items-center justify-center">
                        <span className="text-[10px] sm:text-xs font-bold text-blue-400 block">
                          Shower
                        </span>
                        <span className="text-[9px] text-white/50 block mt-0.5">
                          Stage 2
                        </span>
                      </div>
                      <div className="w-[2px] bg-white/20" />
                      <div className="flex-1 border-2 border-red-400/50 bg-red-500/10 rounded-r-lg p-2 sm:p-3 text-center min-h-[56px] flex flex-col items-center justify-center">
                        <span className="text-[10px] sm:text-xs font-bold text-red-400 block">
                          Dirty End
                        </span>
                        <span className="text-[9px] text-white/50 block mt-0.5">
                          Stage 1
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="text-[9px] text-green-400">&larr; Clean</span>
                      <span className="text-[9px] text-white/30">|</span>
                      <span className="text-[9px] text-red-400">Dirty &rarr;</span>
                    </div>
                  </div>

                  {/* Main Work Area */}
                  <div className="relative border-2 border-dashed border-orange-400/40 bg-orange-500/5 rounded-lg p-4 sm:p-5 min-h-[140px]">
                    <div className="absolute -top-3 left-3 bg-[#111] px-2">
                      <span className="text-[10px] sm:text-xs text-orange-300 font-semibold">
                        Main Work Area
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/50 text-center mt-2">
                      Full polythene sheeting on walls, floor &amp; ceiling
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/40 text-center mt-1">
                      (min 125&nbsp;&mu;m, preferably 250&nbsp;&mu;m)
                    </p>

                    {/* Air monitoring positions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[9px] text-cyan-400">
                          Air monitor
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[9px] text-cyan-400">
                          Air monitor
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: NPU + Waste Route */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Negative Pressure Unit */}
                    <div className="flex-1 border-2 border-purple-400/50 bg-purple-500/10 rounded-lg p-3 text-center">
                      <span className="text-[10px] sm:text-xs font-bold text-purple-400 block">
                        NPU
                      </span>
                      <span className="text-[9px] text-white/50 block">
                        Negative Pressure Unit
                      </span>
                      <span className="text-[9px] text-white/40 block">
                        (HEPA filtered)
                      </span>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <span className="text-[10px] text-purple-300">
                          Air flow OUT &rarr;
                        </span>
                      </div>
                    </div>

                    {/* Waste Route */}
                    <div className="flex-1 flex items-stretch gap-0">
                      <div className="flex-1 border-2 border-amber-400/50 bg-amber-500/10 rounded-l-lg p-2 sm:p-3 text-center flex flex-col items-center justify-center">
                        <span className="text-[10px] sm:text-xs font-bold text-amber-400 block">
                          Waste Airlock
                        </span>
                        <span className="text-[9px] text-white/50 block mt-0.5">
                          Double-bagged waste
                        </span>
                      </div>
                      <div className="flex items-center px-1">
                        <span className="text-amber-400 text-sm">&rarr;</span>
                      </div>
                      <div className="flex-1 border-2 border-amber-400/50 bg-amber-500/10 rounded-r-lg p-2 sm:p-3 text-center flex flex-col items-center justify-center">
                        <span className="text-[10px] sm:text-xs font-bold text-amber-400 block">
                          Skip / Collection
                        </span>
                        <span className="text-[9px] text-white/50 block mt-0.5">
                          Licensed disposal
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Air monitoring (external) */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                    <span className="text-[9px] text-cyan-400">
                      External air monitoring position (outside enclosure)
                    </span>
                  </div>
                </div>
              </div>

              {/* Key note */}
              <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] sm:text-xs text-purple-300 font-medium">
                  Negative pressure maintained at all times &mdash; air flows
                  INTO the enclosure
                </p>
              </div>

              {/* Legend */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-[9px] text-white/50">Air monitoring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-[2px] border-t-2 border-dashed border-orange-400/40" />
                  <span className="text-[9px] text-white/50">Polythene sheeting</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-[2px] bg-orange-400/60" />
                  <span className="text-[9px] text-white/50">Controlled area boundary</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Full Enclosures for Licensed Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">04</span>
            Full Enclosures for Licensed Work
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Full enclosures are required for{" "}
                <strong>most licensed asbestos removal work</strong>. They
                provide a <strong>complete sealed environment</strong> around the
                work area, preventing asbestos fibres from escaping into
                surrounding occupied spaces.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Enclosure Construction
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Constructed from{" "}
                      <strong className="text-white">
                        polythene sheeting
                      </strong>{" "}
                      &mdash; minimum 125&nbsp;&mu;m, preferably
                      250&nbsp;&mu;m thickness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        All surfaces sheeted
                      </strong>{" "}
                      &mdash; walls, floor, and ceiling within the enclosure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        3-stage airlock
                      </strong>{" "}
                      for personnel entry/exit: clean room &rarr; shower &rarr;
                      dirty room
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Separate waste airlock
                      </strong>{" "}
                      for removing double-bagged asbestos waste
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Engineering Controls
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Negative Pressure Unit (NPU)
                      </strong>{" "}
                      fitted with HEPA filter &mdash; maintains negative
                      pressure inside the enclosure at all times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Air monitoring</strong>{" "}
                      inside and outside the enclosure throughout the work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Enclosure must be{" "}
                      <strong className="text-white">smoke-tested</strong>{" "}
                      before work begins to check for leaks
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">
                    4-Stage Clearance:
                  </strong>{" "}
                  Before the enclosure can be dismantled, a{" "}
                  <strong>4-stage clearance process</strong> must be completed:
                  (1)&nbsp;preliminary check by the contractor&rsquo;s
                  supervisor, (2)&nbsp;thorough visual inspection by an
                  independent analyst, (3)&nbsp;air monitoring (reassurance air
                  test &mdash; clearance indicator 0.01&nbsp;fibres/ml), and
                  (4)&nbsp;final visual inspection after the site is returned to
                  normal use. Only after all four stages are satisfactorily
                  completed can the enclosure be dismantled and the area handed
                  back.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Class H Vacuum Cleaners */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">05</span>
            Class&nbsp;H Vacuum Cleaners
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Class&nbsp;H (Type&nbsp;H) vacuum cleaners are{" "}
                <strong>HEPA-filtered vacuum cleaners</strong> specifically rated
                to capture asbestos fibres. They are classified to{" "}
                <strong>BS&nbsp;EN&nbsp;60335-2-69</strong> &mdash; the highest
                level of vacuum filtration available.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Specifications
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Filters capture{" "}
                      <strong className="text-white">
                        99.995% of particles
                      </strong>{" "}
                      down to 0.3&nbsp;microns
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Type&nbsp;H classification
                      </strong>{" "}
                      (BS&nbsp;EN&nbsp;60335-2-69) &mdash; highest level of
                      filtration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Entire unit designed to{" "}
                      <strong className="text-white">
                        prevent fibre leakage
                      </strong>{" "}
                      &mdash; seals, hoses, motor housing, and exhaust
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Uses</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Shadow vacuuming during asbestos work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Cleaning surfaces and equipment after work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Decontamination of personnel and the work area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Final clearance cleaning before the 4-stage clearance
                      process
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Maintenance &amp; Disposal
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Regular filter changes and maintenance required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Bags and filters disposed of as{" "}
                      <strong className="text-white">asbestos waste</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Must be PAT tested and inspected regularly</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Use Ordinary Vacuums
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Ordinary vacuum cleaners MUST NOT be used
                  </strong>{" "}
                  for any asbestos-related cleaning. Standard vacuums &mdash;
                  even those marketed as &ldquo;industrial&rdquo; &mdash; lack
                  the sealed construction and HEPA filtration required to contain
                  asbestos fibres. They{" "}
                  <strong className="text-white">
                    exhaust fibres back into the air
                  </strong>{" "}
                  through their exhaust port, making contamination worse. Only
                  Type&nbsp;H vacuum cleaners may be used.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Prohibited Tools and Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">06</span>
            Prohibited Tools and Methods
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following tools and methods are{" "}
                <strong>
                  specifically prohibited under the Control of Asbestos
                  Regulations 2012
                </strong>{" "}
                for use on asbestos-containing materials. They generate
                uncontrolled dust and fibre release that overwhelms all other
                control measures.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    PROHIBITED &mdash; Do NOT Use on ACMs
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        High-speed abrasive cutting tools
                      </strong>{" "}
                      (angle grinders, circular saws) &mdash; generate massive
                      fibre clouds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Dry drilling without extraction
                      </strong>{" "}
                      &mdash; releases fibres directly into the air
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Compressed air for cleaning
                      </strong>{" "}
                      &mdash; disperses fibres over wide areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Standard vacuum cleaners
                      </strong>{" "}
                      &mdash; exhaust fibres back into the air (no HEPA
                      filtration)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Dry sweeping with brooms
                      </strong>{" "}
                      &mdash; lifts settled fibres from surfaces back into the
                      air
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">Power sanding</strong>{" "}
                      &mdash; generates fine dust containing asbestos fibres
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-red-400">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        ANY method that generates uncontrolled dust
                      </strong>{" "}
                      from asbestos-containing materials
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">Remember:</strong> These
                  prohibitions apply under{" "}
                  <strong>CAR 2012 Regulation 11</strong>. Using any of these
                  methods on ACMs is not just bad practice &mdash; it is a{" "}
                  <strong>criminal offence</strong>. If you see anyone using
                  these tools or methods on suspected or known ACMs, you must
                  stop work immediately and report it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Work Area Preparation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">07</span>
            Work Area Preparation
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Proper preparation of the work area is{" "}
                <strong>essential before any asbestos work begins</strong>. The
                goal is to prevent fibre spread beyond the immediate work area
                and to ensure that decontamination and emergency procedures are
                in place.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Preparation Steps
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-orange-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">
                        Remove or protect all items
                      </strong>{" "}
                      that cannot be decontaminated &mdash; furniture,
                      equipment, and stored materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-orange-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Lay polythene sheeting on floors
                      </strong>{" "}
                      &mdash; minimum 500 gauge to contain debris and
                      contaminated material
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-orange-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Seal all openings, vents, and service penetrations
                      </strong>{" "}
                      with tape and polythene to prevent fibre spread
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-orange-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Turn off air conditioning and mechanical ventilation
                      </strong>{" "}
                      serving the area &mdash; these would spread fibres
                      throughout the building
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-orange-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">
                        Erect barriers and warning signs
                      </strong>{" "}
                      around the work area to prevent unauthorised entry
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-orange-400">
                      6
                    </span>
                    <span>
                      <strong className="text-white">
                        Restrict access
                      </strong>{" "}
                      to authorised personnel only &mdash; maintain a sign-in
                      log
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-orange-400">
                      7
                    </span>
                    <span>
                      <strong className="text-white">
                        Ensure decontamination facilities
                      </strong>{" "}
                      are set up and operational before work starts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-orange-400">
                      8
                    </span>
                    <span>
                      <strong className="text-white">
                        Brief all workers
                      </strong>{" "}
                      on the method statement, risk assessment, and emergency
                      procedures
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Do NOT Start Work Until Preparation Is Complete
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  All preparation steps must be{" "}
                  <strong className="text-white">
                    completed and verified before any asbestos work begins
                  </strong>
                  . Starting work in an unprepared area risks fibre spread to
                  surrounding occupied spaces, contamination of items that
                  cannot be cleaned, and exposure of other workers and building
                  occupants. The work area must be fully prepared, signed off,
                  and the method statement reviewed by all workers before
                  commencement.
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
            <Link to="../asbestos-awareness-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: RPE &amp; PPE Selection
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-5-section-1">
              Next: Accidental Disturbance Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
