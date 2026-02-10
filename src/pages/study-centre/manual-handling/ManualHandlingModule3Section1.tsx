import {
  ArrowLeft,
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  User,
  Package,
  MapPin,
  Cog,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "tile-task-factors",
    question:
      "Which of the following is a Task factor in the TILE framework?",
    options: [
      "The weight of the load being carried",
      "Whether the handler has a pre-existing back injury",
      "The need to twist the trunk while lifting",
      "Poor lighting in the workspace",
    ],
    correctIndex: 2,
    explanation:
      "Twisting the trunk while lifting is a Task factor because it relates to how the task itself is performed. The weight of the load is a Load factor, a pre-existing injury is an Individual factor, and poor lighting is an Environment factor.",
  },
  {
    id: "tile-guideline-weights",
    question:
      "According to HSE guidelines, what is the maximum recommended weight for a man lifting close to the body at waist height?",
    options: ["10 kg", "16 kg", "20 kg", "25 kg"],
    correctIndex: 3,
    explanation:
      "The HSE guideline figure for men lifting close to the body at waist height is 25 kg. For women in the same position, the guideline figure is 16 kg. These are not absolute limits but trigger points for requiring a more detailed risk assessment.",
  },
  {
    id: "tile-individual-pregnancy",
    question:
      "Why is pregnancy specifically listed as an Individual factor in manual handling risk assessment?",
    options: [
      "Pregnant workers are not allowed to lift anything at all",
      "Pregnancy affects balance, reach, grip strength, and the body's ligaments become looser",
      "It is only relevant during the final trimester",
      "Pregnancy only affects the ability to push and pull, not lifting",
    ],
    correctIndex: 1,
    explanation:
      "Pregnancy is an Individual factor because it affects multiple physical capabilities: the changing centre of gravity affects balance, the growing bump reduces reach, hormonal changes loosen ligaments (increasing injury risk), and grip strength may reduce. These effects begin early in pregnancy, not just the final trimester.",
  },
];

const faqs = [
  {
    question:
      "Are the HSE guideline weights (25 kg men, 16 kg women) legal limits?",
    answer:
      "No, these are not legal limits. They are guideline figures published by HSE in their document L23 (Manual Handling: Guidance on Regulations). They represent the weight at which a more detailed risk assessment is triggered. Loads below these weights can still cause injury depending on other factors (frequency, posture, distance, individual capability). Loads above these weights are not automatically prohibited but require a thorough risk assessment demonstrating that the risk has been reduced so far as is reasonably practicable. The legal duty under the Manual Handling Operations Regulations 1992 is to assess and reduce risk, not to comply with specific weight limits.",
  },
  {
    question:
      "How do the four TILE factors interact with each other?",
    answer:
      "The TILE factors are not independent -- they interact and compound each other. For example, a 20 kg load (Load factor) might be acceptable when lifted at waist height in a well-lit, spacious room (good Environment) by a fit, trained worker (favourable Individual factors) performing the lift once (simple Task). However, the same 20 kg load becomes much higher risk if it must be lifted from floor level (poor Task posture), on a slippery, sloped surface (poor Environment), by a worker with a previous back injury (Individual vulnerability), repeatedly over a shift. The risk assessment must consider all four factors together, not in isolation.",
  },
  {
    question:
      "What clothing and PPE issues should be considered under Individual factors?",
    answer:
      "Clothing and PPE can significantly affect manual handling capability. Heavy or bulky PPE (such as chemical suits or breathing apparatus) restricts movement, reduces visibility, and adds weight the worker must carry. Gloves can reduce grip strength and dexterity, making loads harder to hold securely. High-visibility vests or harnesses can restrict trunk movement. Steel-capped boots, while protecting feet from dropped loads, can be heavy and reduce ankle flexibility. Restrictive clothing may prevent the handler from adopting a good posture. All of these factors must be considered in the TILE assessment.",
  },
  {
    question:
      "How does the Environment factor apply to outdoor electrical work?",
    answer:
      "Outdoor electrical work introduces numerous environmental factors that increase manual handling risk. Wind can make loads unpredictable and hard to control (especially large flat items like cable trays or distribution boards). Rain makes surfaces slippery and can reduce grip on loads. Cold temperatures reduce manual dexterity and grip strength. Uneven terrain (trenches, excavations, grass, gravel) affects balance and footing. Working at height on scaffolding or platforms limits space and movement. Mud and debris underfoot create trip hazards. UV exposure and heat can cause fatigue, reducing concentration. All of these must be assessed and controlled as part of the TILE framework.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does TILE stand for in the context of manual handling risk assessment?",
    options: [
      "Time, Instruction, Load, Equipment",
      "Task, Individual, Load, Environment",
      "Training, Inspection, Lifting, Ergonomics",
      "Task, Injury, Legislation, Enforcement",
    ],
    correctAnswer: 1,
    explanation:
      "TILE stands for Task, Individual, Load, and Environment. These are the four categories of risk factors that must be assessed in any manual handling operation under the Manual Handling Operations Regulations 1992.",
  },
  {
    id: 2,
    question:
      "Which of the following is an example of a Task factor?",
    options: [
      "The load has no handles and is difficult to grip",
      "The handler must reach upward above shoulder height",
      "The floor surface is wet and slippery",
      "The handler is returning to work after a back injury",
    ],
    correctAnswer: 1,
    explanation:
      "Reaching upward above shoulder height is a Task factor because it relates to the physical demands of the task and the postures required. Poor grip is a Load factor, wet floors are an Environment factor, and returning from injury is an Individual factor.",
  },
  {
    id: 3,
    question:
      "What is the HSE guideline weight for a woman lifting close to the body at waist height?",
    options: ["10 kg", "16 kg", "20 kg", "25 kg"],
    correctAnswer: 1,
    explanation:
      "The HSE guideline figure for women lifting close to the body at waist height is 16 kg. For men in the same position, the figure is 25 kg. These are not absolute limits but trigger points for requiring a more detailed risk assessment.",
  },
  {
    id: 4,
    question:
      "Holding a load away from the body increases the stress on the spine. By approximately how much does extending the arms increase spinal loading compared to holding the load close?",
    options: [
      "It has no significant effect",
      "It roughly doubles the spinal loading",
      "It can increase spinal loading by up to five times",
      "It reduces spinal loading because the arms share the weight",
    ],
    correctAnswer: 2,
    explanation:
      "Holding a load at arm's length can increase the compressive force on the lower spine by up to five times compared to holding the same load close to the body. This is because the load acts as a lever arm, and the further it is from the spine, the greater the moment (turning force) the back muscles must counteract.",
  },
  {
    id: 5,
    question:
      "Which Individual factor relates to the loosening of ligaments during pregnancy?",
    options: [
      "Physical capability",
      "Hormonal changes",
      "Disability",
      "Knowledge and training",
    ],
    correctAnswer: 1,
    explanation:
      "During pregnancy, the hormone relaxin causes ligaments throughout the body to loosen in preparation for childbirth. This affects all joints, not just the pelvis, making the pregnant worker more susceptible to sprains and strains during manual handling.",
  },
  {
    id: 6,
    question:
      "A load with its centre of gravity offset to one side is more hazardous because:",
    options: [
      "It weighs more on one side than the other",
      "It creates an uneven force distribution, causing the handler to compensate with asymmetric posture",
      "It is always heavier than a balanced load",
      "It can only be carried by two people",
    ],
    correctAnswer: 1,
    explanation:
      "An offset centre of gravity creates an uneven force distribution that causes the handler to lean or twist to compensate, adopting asymmetric postures. These postures place uneven stress on the spine, muscles, and joints, significantly increasing injury risk even when the overall weight is within acceptable limits.",
  },
  {
    id: 7,
    question:
      "Which of the following Environment factors is most relevant to electricians working in plant rooms?",
    options: [
      "Wind speed",
      "UV exposure",
      "Space constraints and elevated temperatures",
      "Snow and ice on the ground",
    ],
    correctAnswer: 2,
    explanation:
      "Plant rooms typically present space constraints (limited room to move, obstacles, low headroom) and elevated temperatures (heat from boilers, pumps, and equipment). Both of these Environment factors increase manual handling risk by restricting posture options and accelerating fatigue.",
  },
  {
    id: 8,
    question:
      "According to the TILE framework, what effect does repetitive lifting have on risk?",
    options: [
      "Repetition has no effect if the load is light",
      "Repetition is only a concern if the frequency exceeds 100 lifts per hour",
      "Repetitive lifting increases the cumulative load on the body, leading to fatigue and increased injury risk even with lighter loads",
      "Repetition only matters for loads above the HSE guideline weights",
    ],
    correctAnswer: 2,
    explanation:
      "Repetitive lifting is a Task factor that increases cumulative musculoskeletal loading. Even light loads, when lifted repeatedly over a shift, cause progressive fatigue in muscles, tendons, and ligaments. The HSE guideline weights are significantly reduced when the lifting frequency increases. For example, a load that might be acceptable for a single lift may need to be halved or more for frequent repetitive lifting.",
  },
];

export default function ManualHandlingModule3Section1() {
  useSEO({
    title:
      "The TILE Framework in Depth | Manual Handling Module 3.1",
    description:
      "Detailed analysis of Task, Individual, Load, and Environment factors in manual handling risk assessment, including HSE guideline weights and practical application for electricians.",
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
            <ClipboardCheck className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The TILE Framework in Depth
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            A comprehensive look at the four categories of manual handling risk
            factors &mdash; Task, Individual, Load, and Environment &mdash; and
            how they interact to determine overall risk
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
                  <strong>TILE:</strong> Task, Individual, Load, Environment
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>All four</strong> must be assessed together, not in isolation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>HSE guidelines:</strong> 25 kg (men) / 16 kg (women) at
                  waist height close to body
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Factors interact:</strong> poor posture + heavy load +
                  slippery floor = compounding risk
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Assess:</strong> every manual handling task using TILE before
                  starting
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Reduce:</strong> risk in whichever factor(s) present the
                  greatest concern
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Record:</strong> your assessment &mdash; it is a legal
                  requirement
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Review:</strong> whenever the task, people, loads, or
                  conditions change
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
              "Identify the four categories of the TILE framework and explain their purpose",
              "List the key risk factors within each TILE category",
              "State the HSE guideline weights for men and women at waist height",
              "Explain how TILE factors interact to increase or decrease overall risk",
              "Apply the TILE framework to common electrical installation scenarios",
              "Recognise when a more detailed risk assessment is required",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Introduction to TILE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            Introduction to TILE
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The TILE framework is the standard method used in the UK for
                assessing manual handling risks. It is based on the requirements
                of the{" "}
                <strong>
                  Manual Handling Operations Regulations 1992 (as amended)
                </strong>{" "}
                and the accompanying HSE guidance document L23. TILE provides a
                structured way to consider all of the factors that contribute to
                the risk of musculoskeletal injury during manual handling
                operations.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Key Principle:</strong>{" "}
                  A TILE assessment considers the whole picture. A load that is
                  safe to lift in one set of circumstances may be dangerous in
                  another. The <strong>combination</strong> of Task, Individual,
                  Load, and Environment determines the overall level of risk.
                </p>
              </div>

              <p>
                Every employer has a legal duty under Regulation 4 of the Manual
                Handling Operations Regulations to: (1) avoid hazardous manual
                handling operations so far as is reasonably practicable; (2)
                assess the risk of injury from any hazardous manual handling that
                cannot be avoided; and (3) reduce the risk of injury so far as
                is reasonably practicable. The TILE framework is the tool used to
                fulfil duty (2) &mdash; the assessment.
              </p>

              <p>
                For electricians, manual handling is a daily occurrence. Lifting
                cable drums, carrying distribution boards, positioning trunking
                and containment, pulling cables through conduit, and moving tools
                and test equipment all involve manual handling. A thorough
                understanding of the TILE framework enables you to assess these
                tasks quickly and effectively, identifying where risk can be
                reduced before injury occurs.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Task Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            <Cog className="h-5 w-5 text-emerald-400" />
            Task Factors
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Task factors relate to <strong>how the work is done</strong>{" "}
                &mdash; the physical demands of the operation itself, the
                postures required, the movements involved, and the frequency and
                duration of the activity. Poor task design is one of the most
                common causes of manual handling injuries.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Task Risk Factors
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Holding load away from body:
                      </strong>{" "}
                      Increases spinal loading by up to five times. The further
                      the load from the trunk, the greater the lever arm and the
                      more force the back muscles must generate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Twisting:</strong> Rotating
                      the trunk while lifting or carrying places asymmetric loads
                      on the spinal discs and muscles, significantly increasing
                      injury risk. Common when passing loads sideways or placing
                      items on shelves.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stooping:</strong> Bending
                      forward increases the compressive force on the lower spine.
                      Lifting from floor level with a bent back is one of the
                      highest-risk postures in manual handling.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reaching upward:
                      </strong>{" "}
                      Lifting above shoulder height reduces the strength
                      available and forces the handler into an unstable posture.
                      The guideline weight is significantly reduced for overhead
                      lifts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Repetition and frequency:
                      </strong>{" "}
                      Repeated lifts cause cumulative fatigue in muscles,
                      tendons, and ligaments. HSE guideline weights are
                      significantly reduced when lifting frequency increases
                      &mdash; a load acceptable for a single lift may need to be
                      halved or more for continuous repetitive work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Distance carried:
                      </strong>{" "}
                      Longer carrying distances increase the duration of loading
                      on the body and the cumulative effect on muscles. Carrying
                      over 10 metres warrants additional consideration.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Pushing and pulling:
                      </strong>{" "}
                      Starting force (to get a load moving) is typically much
                      higher than the sustained force needed to keep it moving.
                      Pushing is generally safer than pulling because it allows
                      the handler to use body weight.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Unpredictable movement:
                      </strong>{" "}
                      Loads that can shift, swing, or move unexpectedly (such as
                      liquids in containers, live animals, or long flexible
                      items) require additional muscle effort to control and
                      increase injury risk.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Electrician Example:
                  </strong>{" "}
                  Pulling cable through conduit involves sustained pulling force,
                  often while in a stooped or twisted posture. The cable may move
                  unpredictably if it snags and then releases suddenly. If this
                  is done repeatedly over a shift, the cumulative Task risk is
                  substantial, even though the force for each individual pull may
                  seem modest.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Individual Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            <User className="h-5 w-5 text-emerald-400" />
            Individual Factors
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Individual factors relate to the{" "}
                <strong>person performing the task</strong>. Not everyone has the
                same physical capabilities, and what is safe for one person may
                be hazardous for another. The assessment must consider the
                specific individuals who will actually be carrying out the
                manual handling operation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Individual Risk Factors
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Physical capability:
                      </strong>{" "}
                      Strength, fitness, and physical build vary significantly
                      between individuals. A task that is comfortable for a
                      strong, fit worker may be hazardous for a smaller or less
                      physically capable colleague.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Age:</strong> Both younger
                      and older workers have specific considerations. Younger
                      workers (apprentices) may lack experience and technique.
                      Older workers may have reduced strength, flexibility, and
                      recovery rates, and a higher prevalence of existing
                      musculoskeletal conditions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pregnancy:</strong> Affects
                      balance (changing centre of gravity), reach (growing bump
                      increases distance to loads), grip strength (may be
                      reduced), and ligament stability (the hormone relaxin
                      loosens ligaments throughout the body, not just the pelvis,
                      increasing susceptibility to sprains and strains).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Disability:</strong> A wide
                      range of physical and sensory disabilities may affect
                      manual handling capability. Reasonable adjustments must be
                      made under the Equality Act 2010 to enable workers with
                      disabilities to work safely.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Existing injuries:
                      </strong>{" "}
                      Previous or current musculoskeletal injuries (particularly
                      back, shoulder, knee, and wrist injuries) significantly
                      increase the risk of re-injury. Workers returning from
                      injury may need modified duties during recovery.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Knowledge and training:
                      </strong>{" "}
                      Workers who have received proper manual handling training
                      are better able to assess risk, adopt good postures, and
                      use mechanical aids appropriately. Untrained workers are at
                      significantly higher risk.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Clothing and PPE:
                      </strong>{" "}
                      Bulky PPE restricts movement, reduces visibility, and adds
                      weight. Gloves can reduce grip. Steel-capped boots are
                      heavier and reduce ankle flexibility. All PPE effects on
                      manual handling must be considered.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Legal Note
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Under the Equality Act 2010, employers must not discriminate
                  against workers based on age, disability, pregnancy, or other
                  protected characteristics. However, they{" "}
                  <strong className="text-white">must</strong> take these
                  Individual factors into account in risk assessments and make
                  reasonable adjustments to ensure all workers can carry out
                  manual handling tasks safely. Ignoring Individual factors is
                  both a health and safety failing and a potential discrimination
                  issue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Load Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            <Package className="h-5 w-5 text-emerald-400" />
            Load Factors
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Load factors relate to the{" "}
                <strong>characteristics of the object being handled</strong>.
                Weight is the most obvious factor, but many other load
                properties significantly affect the risk of injury.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Load Risk Factors
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Weight:</strong> The most
                      fundamental load factor. Heavier loads require more muscle
                      force and place greater stress on the spine, joints, and
                      soft tissues. HSE guideline weights apply at specific
                      heights and distances.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Size:</strong> Large,
                      bulky loads force the handler to hold the load further from
                      the body, increasing the lever arm and spinal loading. They
                      also obscure vision and restrict movement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shape:</strong> Irregular
                      or awkward shapes make it difficult to get a secure grip
                      and maintain a balanced hold. Round, cylindrical, or
                      irregular objects are harder to control than rectangular
                      boxes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Grip difficulty:
                      </strong>{" "}
                      Smooth, slippery, wet, oily, or contaminated surfaces make
                      it hard to maintain a secure grip. Loads without handles or
                      grip points are harder to hold. A lost grip can cause
                      sudden loading on the spine.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Centre of gravity:
                      </strong>{" "}
                      If the centre of gravity is not in the middle of the load,
                      the weight distribution is uneven. This forces the handler
                      to adopt asymmetric postures to compensate, increasing
                      injury risk. Contents that shift (liquids, loose items)
                      create a moving centre of gravity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stability:</strong> Loads
                      that are unstable, floppy, or liable to shift during
                      handling require constant muscular adjustment. Cable drums
                      that can roll, long flexible cable trays, and stacked items
                      that may topple are all examples.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Hot, cold, or sharp:
                      </strong>{" "}
                      Loads that are hot, cold, sharp, or have rough edges pose
                      additional hazards. The handler may reflexively release the
                      load if they receive a burn, cut, or cold burn, causing
                      the load to fall. Gloves that protect against these
                      hazards may reduce grip.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Electrician Example:
                  </strong>{" "}
                  A 100-metre drum of 6 mm twin and earth cable weighs
                  approximately 15 kg. However, its shape (cylindrical), tendency
                  to roll (stability), size (forces arms wide), and the need to
                  lift it from floor level (Task interaction) make it
                  significantly more hazardous than a 15 kg rectangular box with
                  handles at waist height.
                </p>
              </div>

              {/* HSE Guideline Weights */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  HSE Guideline Weights (Close to Body)
                </p>
                <p className="text-xs text-white/60 mb-3">
                  These figures from HSE L23 are NOT legal limits. They are the
                  weights at which a more detailed assessment is required.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-emerald-400">
                      25 kg
                    </p>
                    <p className="text-white/70 text-xs">
                      Men &mdash; waist height, close to body
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-emerald-400">
                      16 kg
                    </p>
                    <p className="text-white/70 text-xs">
                      Women &mdash; waist height, close to body
                    </p>
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-3">
                  Guideline weights reduce significantly when lifting above
                  shoulder height, below knee height, at arm&rsquo;s length, or
                  with increased frequency. For example, at arm&rsquo;s length
                  the guideline drops to 5 kg for men and 3 kg for women.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Environment Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            <MapPin className="h-5 w-5 text-emerald-400" />
            Environment Factors
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Environment factors relate to{" "}
                <strong>where the work is being carried out</strong>. The
                physical conditions of the workplace can either support safe
                manual handling or make it significantly more hazardous.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Environment Risk Factors
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Space constraints:
                      </strong>{" "}
                      Cramped spaces prevent the handler from adopting good
                      posture. Low ceilings force stooping, narrow corridors
                      prevent team lifts, and cluttered areas obstruct movement.
                      Plant rooms, riser cupboards, and ceiling voids are common
                      examples for electricians.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Floor surface:</strong>{" "}
                      Wet, oily, dusty, uneven, or damaged floors increase slip
                      and trip risk during manual handling. Carrying a heavy load
                      on an uneven surface is significantly more hazardous than
                      on a smooth, level floor.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Slopes and stairs:
                      </strong>{" "}
                      Slopes alter balance and increase the effort required.
                      Stairs add the complexity of stepping while loaded and
                      significantly increase cardiovascular demand. Handrails may
                      not be available when hands are occupied by loads.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Temperature:</strong>{" "}
                      Cold environments reduce muscle flexibility, grip strength,
                      and manual dexterity. Hot environments cause fatigue,
                      sweating (reducing grip), and dehydration. Both extremes
                      increase injury risk.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Humidity:</strong> High
                      humidity combined with heat accelerates fatigue. It also
                      makes surfaces and loads more slippery due to condensation
                      and perspiration.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lighting:</strong> Poor
                      lighting makes it harder to see trip hazards, judge
                      distances, and identify potential problems with the load or
                      route. Glare can be equally problematic.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Wind:</strong> Outdoor work
                      introduces wind as a significant factor, especially with
                      large flat items (cable trays, trunking, sheet materials)
                      that act as sails. Gusts can make loads unpredictable and
                      uncontrollable.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Trap
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Many manual handling injuries occur because the initial
                  assessment was done in good conditions (dry, well-lit, spacious
                  warehouse) but the actual handling takes place in poorer
                  conditions (wet site, cramped riser, poorly lit ceiling void).
                  Always assess the Environment as it{" "}
                  <strong className="text-white">actually is</strong> at the
                  time of the task, not as it was during planning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TILE Quadrant Grid Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">
              &mdash;
            </span>
            TILE Quadrant Grid
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Task Quadrant */}
            <div className="bg-white/5 border border-emerald-500/30 rounded-xl overflow-hidden">
              <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-4 py-3 text-center">
                <Cog className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-emerald-400">
                  T &mdash; Task
                </p>
                <p className="text-xs text-white/60">How the work is done</p>
              </div>
              <div className="px-4 py-3 space-y-1.5 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Holding load away from body</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Twisting, stooping, reaching</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Repetition and frequency</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Distance carried</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Pushing and pulling</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Unpredictable movement</span>
                </div>
              </div>
            </div>

            {/* Individual Quadrant */}
            <div className="bg-white/5 border border-emerald-500/30 rounded-xl overflow-hidden">
              <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-4 py-3 text-center">
                <User className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-emerald-400">
                  I &mdash; Individual
                </p>
                <p className="text-xs text-white/60">Who is doing the work</p>
              </div>
              <div className="px-4 py-3 space-y-1.5 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Physical capability and fitness</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Age (young and older workers)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Pregnancy</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Disability</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Existing injuries</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Knowledge, training, clothing/PPE</span>
                </div>
              </div>
            </div>

            {/* Load Quadrant */}
            <div className="bg-white/5 border border-emerald-500/30 rounded-xl overflow-hidden">
              <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-4 py-3 text-center">
                <Package className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-emerald-400">
                  L &mdash; Load
                </p>
                <p className="text-xs text-white/60">What is being handled</p>
              </div>
              <div className="px-4 py-3 space-y-1.5 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Weight</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Size and shape</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Grip difficulty (smooth, wet, no handles)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Centre of gravity and stability</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Hot, cold, sharp, or rough surfaces</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Contents that can shift or spill</span>
                </div>
              </div>
            </div>

            {/* Environment Quadrant */}
            <div className="bg-white/5 border border-emerald-500/30 rounded-xl overflow-hidden">
              <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-4 py-3 text-center">
                <MapPin className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-emerald-400">
                  E &mdash; Environment
                </p>
                <p className="text-xs text-white/60">Where the work happens</p>
              </div>
              <div className="px-4 py-3 space-y-1.5 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Space constraints</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Floor surface condition</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Slopes and stairs</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Temperature and humidity</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Lighting quality</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Wind (outdoor work)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg text-center">
            <p className="text-sm text-white">
              <strong className="text-emerald-400">
                All four factors interact.
              </strong>{" "}
              A high-risk score in any single category may be acceptable if the
              other three are favourable. A moderate risk in all four categories
              simultaneously creates a{" "}
              <strong className="text-white">compounding effect</strong> that
              may be more dangerous than a single high-risk factor alone.
            </p>
          </div>
        </section>

        {/* Section 06: Putting TILE Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Putting TILE Together
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The real value of the TILE framework comes from considering all
                four categories together. Each factor modifies the others, and
                the overall risk is determined by their combined effect. A
                systematic approach ensures nothing is missed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Step-by-Step TILE Assessment Process
                </p>
                <ol className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-emerald-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">
                        Describe the task
                      </strong>{" "}
                      &mdash; what is being moved, from where, to where, how
                      often, and by whom?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-emerald-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Assess each TILE factor
                      </strong>{" "}
                      &mdash; work through Task, Individual, Load, and
                      Environment systematically, noting all relevant risk
                      factors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-emerald-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Consider interactions
                      </strong>{" "}
                      &mdash; how do the factors combine? A moderate load becomes
                      high-risk on a slippery slope with a tired worker.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-emerald-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Identify controls
                      </strong>{" "}
                      &mdash; for each risk factor, determine what can be done to
                      reduce it. Target the highest-risk factors first.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-emerald-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">
                        Record and communicate
                      </strong>{" "}
                      &mdash; document the assessment and ensure all workers
                      involved understand the risks and controls.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-emerald-400">
                      6
                    </span>
                    <span>
                      <strong className="text-white">Review regularly</strong>{" "}
                      &mdash; reassess whenever the task, people, loads, or
                      environment change. A change in any one factor can alter
                      the overall risk level.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Worked Example:
                  </strong>{" "}
                  Moving a 20 kg consumer unit from a delivery van to a first-floor
                  flat. <strong>Task:</strong> carrying up stairs, team lift possible.{" "}
                  <strong>Individual:</strong> two fit, trained electricians.{" "}
                  <strong>Load:</strong> 20 kg, rectangular, handles on packaging,
                  stable contents. <strong>Environment:</strong> narrow stairwell,
                  carpet in good condition, adequate lighting. Controls: two-person
                  carry, one leads walking backwards (has clear view), rest on
                  landing if needed, cleared route before starting.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-3-section-2">
              Next: Identifying MH Hazards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
