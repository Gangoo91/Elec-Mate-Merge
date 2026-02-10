import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle,
  AlertTriangle,
  Users,
  ShieldCheck,
  ClipboardList,
  Wind,
  Clock,
  LifeBuoy,
  Radio,
  Wrench,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wah-m4s1-competent-person",
    question:
      "What four attributes make a person 'competent' under the Work at Height Regulations 2005?",
    options: [
      "Age, fitness, willingness, and availability",
      "Training, experience, knowledge, and ability to recognise hazards",
      "Qualifications, CSCS card, first aid certificate, and IOSH membership",
      "Height tolerance, physical strength, site induction, and PPE ownership",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 4 of the WAH Regs 2005 requires that planning and supervision are carried out by a person with sufficient training, experience, knowledge, and the ability to recognise limitations and hazards. It is not about age or physical attributes — it is about demonstrated competence in the specific work being planned.",
  },
  {
    id: "wah-m4s1-weather-wind",
    question:
      "At what wind speed should most scaffold and ladder work at height be stopped?",
    options: [
      "Force 3 — gentle breeze (8-12 mph)",
      "Force 5 — fresh breeze (19-24 mph)",
      "Force 7 — near gale (32-38 mph)",
      "Force 9 — strong gale (47-54 mph)",
    ],
    correctIndex: 1,
    explanation:
      "Beaufort Force 5 (fresh breeze, 19-24 mph) is the threshold at which most scaffold and ladder work at height must be stopped. At this wind speed, small trees sway and handling lightweight materials or equipment at height becomes dangerous. Some operations with large sheeting or panels may need to stop even earlier at Force 4.",
  },
  {
    id: "wah-m4s1-rescue-plan",
    question: "When must a rescue plan be in place for work at height?",
    options: [
      "Only if the work exceeds 4 metres in height",
      "Only when harnesses or fall arrest systems are used",
      "Before work at height starts — it must not be improvised after an incident",
      "Within 24 hours of the work commencing",
    ],
    correctIndex: 2,
    explanation:
      "Regulation 4(1) of the WAH Regs 2005 requires that emergency procedures, including rescue, are planned before any work at height begins. A rescue plan that is created after someone has already fallen is not a plan — it is a reaction. The plan must be tested, communicated, and have the necessary equipment available on site before work starts.",
  },
];

const faqs = [
  {
    question:
      "Who is responsible for planning work at height — the employer or the worker?",
    answer:
      "The duty to plan work at height rests with the employer (or the person controlling the work). Under Regulation 4 of the Work at Height Regulations 2005, the employer must ensure that all work at height is properly planned, appropriately supervised, and carried out in a safe manner by competent persons. The worker has a duty to cooperate with the plan and to report any hazards they identify, but the legal responsibility for planning sits with the employer or duty holder.",
  },
  {
    question:
      "Can a competent person be someone without formal qualifications?",
    answer:
      "Yes. Competence under the regulations is based on training, experience, knowledge, and the ability to recognise hazards — not solely on formal qualifications. A person with many years of practical experience in a specific type of work at height and a strong understanding of the risks may be competent for that particular task, even without a formal certificate. However, for complex or high-risk tasks, employers typically require evidence of recognised training (such as PASMA, IPAF, or scaffold inspection courses) to demonstrate competence.",
  },
  {
    question:
      "How detailed does a rescue plan need to be for simple ladder work?",
    answer:
      "Even for simple ladder work, a rescue plan must exist. For low-risk, short-duration tasks on a ladder, the rescue plan may be straightforward — for example, confirming that a colleague is present who can call the emergency services, that a mobile phone is available, and that access for an ambulance has been considered. The plan does not need to be a lengthy document for simple tasks, but it must be communicated to the people doing the work and it must be in place before work starts.",
  },
  {
    question:
      "What should happen if weather conditions deteriorate during work at height?",
    answer:
      "If weather conditions deteriorate (increasing wind, onset of rain, ice, lightning, or fog), work at height must be stopped until conditions are reassessed. Workers must descend safely and the equipment must be secured. The competent person should monitor weather forecasts throughout the working day and have pre-agreed trigger points (such as wind speed thresholds) that require an automatic stop. Work should not resume until the competent person confirms conditions are safe.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under which regulation is the planning of work at height a legal requirement?",
    options: [
      "Health and Safety at Work etc. Act 1974 Section 2",
      "Work at Height Regulations 2005 Regulation 4",
      "Construction (Design and Management) Regulations 2015 Regulation 8",
      "Management of Health and Safety at Work Regulations 1999 Regulation 3",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 4 of the Work at Height Regulations 2005 specifically requires that every employer shall ensure that work at height is properly planned, appropriately supervised, and carried out in a manner that is, so far as is reasonably practicable, safe.",
  },
  {
    id: 2,
    question:
      "What is the maximum recommended duration for using a ladder as a working platform?",
    options: [
      "15 minutes",
      "30 minutes",
      "1 hour",
      "No time limit applies to ladders",
    ],
    correctAnswer: 1,
    explanation:
      "HSE guidance recommends that a ladder should only be used as a work platform for tasks lasting up to 30 minutes in one position. Longer tasks require more suitable access equipment such as scaffold, MEWP, or podium steps that provide a stable working platform.",
  },
  {
    id: 3,
    question:
      "Which of the following is NOT one of the four attributes of a competent person?",
    options: [
      "Sufficient training for the task",
      "Practical experience in the work",
      "Possession of a valid CSCS card",
      "Ability to recognise their own limitations",
    ],
    correctAnswer: 2,
    explanation:
      "Competence under the WAH Regs is defined by training, experience, knowledge, and the ability to recognise hazards and limitations. Whilst a CSCS card may be a site access requirement, it is not one of the four legal attributes of competence under the regulations.",
  },
  {
    id: 4,
    question:
      "What is the primary purpose of a toolbox talk before commencing work at height?",
    options: [
      "To satisfy the site safety audit requirements",
      "To communicate the plan, hazards, and controls to the workforce",
      "To record attendance for payroll purposes",
      "To distribute personal protective equipment",
    ],
    correctAnswer: 1,
    explanation:
      "A toolbox talk communicates the specific hazards, control measures, emergency procedures, and individual responsibilities for the planned work at height. It ensures every worker understands the plan before work begins. Attendance records and PPE distribution may happen at the same time, but they are not the primary purpose.",
  },
  {
    id: 5,
    question:
      "At what Beaufort Force should work with large panels or sheeting at height be treated with extra caution?",
    options: [
      "Force 2 — light breeze (4-7 mph)",
      "Force 4 — moderate breeze (13-18 mph)",
      "Force 6 — strong breeze (25-31 mph)",
      "Force 8 — gale (39-46 mph)",
    ],
    correctAnswer: 1,
    explanation:
      "At Beaufort Force 4 (moderate breeze, 13-18 mph), large flat surfaces such as panels, boards, and sheeting can act as sails and catch the wind. Extra caution must be exercised when handling these materials at height, and consideration should be given to stopping this type of work before the general WAH wind threshold of Force 5.",
  },
  {
    id: 6,
    question: "What must a rescue plan include as a minimum?",
    options: [
      "Only the phone number for the emergency services",
      "The type of rescue (self, assisted, or technical), equipment needed, trained personnel, and communication method",
      "A written document signed by the HSE inspector",
      "Insurance details and next-of-kin contact information",
    ],
    correctAnswer: 1,
    explanation:
      "A rescue plan must identify the type of rescue appropriate to the work (self-rescue, assisted rescue, or technical rescue), the equipment that will be used, the personnel who are trained to carry it out, and how the alarm will be raised and communicated. It must be proportionate to the risk but must always exist before work at height begins.",
  },
  {
    id: 7,
    question:
      "Why is the level of supervision proportional to the level of risk?",
    options: [
      "Because higher-risk tasks cost more money and need a manager present",
      "Because the regulations require a fixed supervisor-to-worker ratio",
      "Because inexperienced workers, complex tasks, and higher hazards require closer oversight to prevent incidents",
      "Because insurance companies set the supervision requirements",
    ],
    correctAnswer: 2,
    explanation:
      "The WAH Regs require that work is appropriately supervised. This means the level of supervision must match the level of risk. A competent, experienced worker doing a simple task at low height may need minimal supervision. An inexperienced worker, a complex task, or work near a leading edge with fall risks requires close, direct supervision by a competent person.",
  },
  {
    id: 8,
    question:
      "Which of the following should be verified about equipment BEFORE work at height begins?",
    options: [
      "That the equipment was purchased from an approved supplier",
      "That the equipment is the correct type for the task, is in good condition, and has been inspected within the required period",
      "That the equipment matches the colour scheme of the site PPE",
      "That the equipment is less than 12 months old",
    ],
    correctAnswer: 1,
    explanation:
      "Before work at height begins, the competent person must verify that the selected equipment is suitable for the specific task, is in good condition with no visible defects, and has been inspected and recorded within the required inspection period. Age alone does not determine suitability — condition and correct selection are what matter.",
  },
];

export default function WorkingAtHeightModule4Section1() {
  useSEO({
    title: "Planning & Organising | Working at Height Module 4.1",
    description:
      "Legal requirements for planning work at height under WAH Regs 2005 Regulation 4, competent person definition, weather limitations, rescue planning, supervision, and equipment verification.",
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
            <Link to="../working-at-height-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-500/30 mb-4">
            <CalendarCheck className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Planning &amp; Organising
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Legal requirements for planning work at height, appointing competent
            persons, weather limitations, rescue planning, supervision, and
            equipment selection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Legal duty:</strong> planning WAH is a requirement
                  under Reg 4
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Competent person:</strong> trained, experienced,
                  knowledgeable
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Rescue plan:</strong> must exist before work starts
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Before:</strong> check weather, verify equipment,
                  brief team
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>During:</strong> supervise proportionally, monitor
                  conditions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>After:</strong> review, record, and close out safely
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
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why planning is a legal requirement under WAH Regs 2005",
              "Define what makes a person 'competent' for planning and supervising WAH",
              "Identify weather conditions that require work to be stopped or modified",
              "Describe the role of task duration in equipment selection",
              "Explain why a rescue plan must be in place before work starts",
              "List the key elements of a pre-work communication briefing",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-amber-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Planning Is a Legal Requirement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">01</span>
            Planning Is a Legal Requirement
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under <strong>Regulation 4 of the Work at Height Regulations 2005</strong>,
                every employer must ensure that work at height is{" "}
                <strong>properly planned</strong>, <strong>appropriately supervised</strong>,
                and carried out in a manner that is, so far as is reasonably practicable,
                safe. This is not guidance &mdash; it is a legal duty enforced by the
                Health and Safety Executive.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> Planning
                  is not optional. Every single instance of work at height &mdash;
                  from using a stepladder to change a light fitting to erecting a
                  scaffold on a high-rise construction site &mdash; must be planned.
                  The depth and detail of the plan must be proportionate to the risk.
                </p>
              </div>

              <p>
                The regulations apply to all work at height where there is a risk of
                a fall liable to cause personal injury. This includes work above ground
                level, work at ground level adjacent to an excavation or opening, and
                work where a person could fall from an edge, through a fragile surface,
                or through an opening. It applies in all industries, not just construction.
              </p>

              <p>
                A proper plan for work at height must address the following elements as
                a minimum:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What Planning Must Cover
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      The <strong>nature of the work</strong> — what is being done,
                      where, for how long, and by whom
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      The <strong>hazards identified</strong> — what could go wrong
                      and what could cause someone to fall
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      The <strong>control measures</strong> — what equipment, barriers,
                      procedures, and precautions will be used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      The <strong>equipment selected</strong> — and why it is the most
                      suitable for the task
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      The <strong>emergency arrangements</strong> — how a person will
                      be rescued if they fall
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      The <strong>weather conditions</strong> — current and forecasted,
                      with trigger points for stopping work
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Failing to plan work at height is one of the most commonly cited
                regulatory breaches following falls from height. In HSE enforcement
                actions, the absence of a plan is treated as a fundamental failing
                of the duty holder, not a minor oversight.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Appointing a Competent Person */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">02</span>
            Appointing a Competent Person
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 4 requires that work at height is planned by a{" "}
                <strong>competent person</strong>. It also requires that the work is
                supervised by a competent person and that the people carrying out the
                work are competent (or are being supervised by someone who is). The
                regulations do not define competence by a specific qualification &mdash;
                instead, they define it by four attributes.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    The Four Attributes of Competence
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p>
                    <strong className="text-white">1. Sufficient Training:</strong>{" "}
                    The person has received training relevant to the specific type of
                    work at height being planned. This could be formal training (such
                    as PASMA, IPAF, or harness training) or structured on-the-job
                    training. The training must be current and regularly refreshed.
                  </p>
                  <p>
                    <strong className="text-white">2. Practical Experience:</strong>{" "}
                    The person has hands-on experience of the type of work being
                    planned. A newly qualified person may have the training but lack
                    the experience to deal with unexpected situations. Experience
                    builds the judgement needed to plan for real-world conditions.
                  </p>
                  <p>
                    <strong className="text-white">3. Relevant Knowledge:</strong>{" "}
                    The person understands the regulations, the equipment, the hazards,
                    and the control measures applicable to the work. This includes
                    knowledge of the specific site conditions and the limitations of
                    the equipment being used.
                  </p>
                  <p>
                    <strong className="text-white">
                      4. Ability to Recognise Hazards and Limitations:
                    </strong>{" "}
                    Perhaps the most critical attribute. The person must be able to
                    identify hazards that are not immediately obvious, recognise when
                    a situation is outside their competence, and know when to seek
                    specialist advice. A truly competent person knows what they{" "}
                    <em>do not</em> know.
                  </p>
                </div>
              </div>

              <p>
                A competent person for planning work at height is not necessarily the
                most senior person on site. They are the person best qualified by
                training and experience to understand the specific hazards and to
                select the appropriate controls. For example, a scaffold supervisor
                may be competent to plan scaffold work but not competent to plan rope
                access operations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Competent Person Responsibilities
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Assess the risks of the proposed work at height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Select the most appropriate access equipment for the task
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Prepare or approve the method statement and rescue plan
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Brief the workforce on the plan, hazards, and emergency procedures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Monitor conditions and stop work if circumstances change
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Ensure equipment is inspected and maintained in safe condition
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  &ldquo;We&rsquo;ve always done it this way&rdquo; is not evidence
                  of competence. A competent person must be able to justify their
                  decisions by reference to current regulations, manufacturer
                  guidance, and site-specific conditions. Past practice that does not
                  meet current standards must be challenged and changed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Weather Limitations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">03</span>
            Weather Limitations
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 4(3) of the WAH Regs 2005 requires that work at height
                does not take place when <strong>weather conditions could jeopardise
                the health or safety</strong> of the workers. This is not a vague
                suggestion &mdash; it is a specific legal requirement. The competent
                person must assess weather conditions before work begins and monitor
                them continuously throughout the working day.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wind className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Weather Thresholds for WAH
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="font-medium text-white mb-1">
                      Wind &mdash; Beaufort Force 5 (19&ndash;24 mph)
                    </p>
                    <p>
                      Stop most scaffold and ladder work. At this speed, small trees
                      sway, handling materials becomes dangerous, and worker stability
                      is compromised. Large sheeting and panel work should stop even
                      earlier at Force 4 (13&ndash;18 mph).
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="font-medium text-white mb-1">
                      Ice &amp; Frost
                    </p>
                    <p>
                      Do not use ladders, scaffold, or any working platform until
                      surfaces have been de-iced and inspected. Ice on rungs, boards,
                      or platform surfaces creates an extreme slip hazard. Early
                      morning starts in winter are particularly dangerous &mdash;
                      surfaces that appear dry may have a thin layer of black ice.
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="font-medium text-white mb-1">Lightning</p>
                    <p>
                      Stop <strong>all</strong> outdoor work at height during
                      thunderstorms. Workers on scaffold, MEWP platforms, ladders,
                      and any elevated metallic structure are at extreme risk of
                      lightning strike. Apply the 30/30 rule: if the time between
                      seeing lightning and hearing thunder is less than 30 seconds,
                      stop all work and take shelter. Wait at least 30 minutes after
                      the last observed flash before resuming work.
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="font-medium text-white mb-1">
                      Heavy Rain
                    </p>
                    <p>
                      Assess grip and visibility. Heavy rain reduces grip on ladders,
                      scaffold boards, and hand tools. It impairs visibility through
                      safety glasses and face shields. Water pooling on platforms
                      creates a slip hazard. Persistent rain soaks into clothing,
                      causing cold stress and fatigue. Electrical work at height in
                      rain creates additional electrocution risks.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The competent person should check the weather forecast at the start
                of each working day and have pre-agreed trigger points for stopping
                work. An anemometer (wind speed meter) should be available on site for
                any work where wind is a critical factor. Many MEWP operators carry
                a handheld anemometer as standard practice.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Practical Weather Indicators (No Instruments)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Force 4:</strong> Dust and loose paper raised; small
                      branches moving
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Force 5:</strong> Small trees in leaf begin to sway;
                      crested wavelets on inland waters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Force 6:</strong> Large branches moving; difficulty
                      using an umbrella; whistling in overhead wires
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Force 7:</strong> Whole trees in motion; difficulty
                      walking against the wind
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Task Duration Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">04</span>
            Task Duration Assessment
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The expected duration of the task is a critical factor in selecting
                the correct access equipment. HSE guidance is clear that{" "}
                <strong>a ladder should only be used as a working platform for tasks
                lasting up to 30 minutes</strong> in one position. This is not an
                arbitrary limit &mdash; it reflects the physical demands of
                maintaining balance and grip on a ladder for extended periods.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Duration and Equipment Selection
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Up to 15 minutes:</strong>{" "}
                    Simple stepladder or platform step may be appropriate for light,
                    low-risk tasks within reach. Must still be planned and risk assessed.
                  </p>
                  <p>
                    <strong className="text-white">Up to 30 minutes:</strong>{" "}
                    A leaning ladder may be suitable if the task is light and does not
                    require both hands. A podium step is preferable as it provides a
                    platform to stand on.
                  </p>
                  <p>
                    <strong className="text-white">30 minutes to 2 hours:</strong>{" "}
                    Scaffold, MEWP, or podium steps with guardrails should be used.
                    Ladders are not suitable as working platforms for this duration.
                  </p>
                  <p>
                    <strong className="text-white">Over 2 hours:</strong>{" "}
                    Full scaffold or MEWP is required. The platform must provide
                    adequate space for tools, materials, and comfortable working
                    posture. Welfare facilities (particularly access to drinking water
                    and toilet facilities) become a consideration for extended work at
                    height.
                  </p>
                </div>
              </div>

              <p>
                When assessing duration, the competent person must consider the
                realistic time for the task &mdash; not the optimistic estimate. Tasks
                routinely overrun due to unforeseen problems, material shortages, or
                changes in scope. If there is any doubt, select the more robust
                equipment option. Using a scaffold for a task that &ldquo;might only
                take 20 minutes&rdquo; is far safer than using a ladder for a task
                that ends up taking an hour.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Factors That Extend Task Duration
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Unexpected condition of surfaces, fixings, or existing installations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Waiting for materials, tools, or additional personnel
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Poor weather causing delays and repeated start/stop cycles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Changes to the scope of work once the task area is accessed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Fatigue &mdash; the same task takes longer when the worker is tired
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Rescue Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">05</span>
            Rescue Plan
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation 4(1) of the WAH Regs 2005</strong> requires that
                the plan for work at height includes{" "}
                <strong>emergency procedures, including rescue</strong>. This is not
                an afterthought &mdash; the rescue plan is part of the planning
                process and must be in place before any person goes to height.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <LifeBuoy className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Requirement
                  </p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  A rescue plan must <strong>never</strong> be improvised after an
                  incident has occurred. If someone falls and is suspended in a
                  harness, suspension trauma can cause unconsciousness within 15&ndash;30
                  minutes and death can follow rapidly. There is no time to create a
                  plan after the event. The plan, the equipment, and the trained
                  personnel must all be in place beforehand.
                </p>
              </div>

              <p>
                The rescue plan must be proportionate to the risk. For simple, low-level
                work, the plan may involve ensuring a colleague is nearby who can
                assist and that the emergency services can access the location. For
                complex or high-level work, the plan may require dedicated rescue
                equipment on site, specifically trained rescue personnel, and a
                rehearsed rescue procedure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What a Rescue Plan Must Address
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Type of rescue:</strong> self-rescue, assisted rescue,
                      or emergency services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Rescue equipment:</strong> what is available and where
                      it is located on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Trained personnel:</strong> who on site is trained in
                      rescue procedures and where they are located
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Communication:</strong> how the alarm is raised and
                      who is contacted
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Access for emergency services:</strong> route, gate
                      codes, escort arrangements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>First aid:</strong> first aider location, first aid kit
                      location, nearest A&amp;E department
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The rescue plan must be communicated to every person involved in the
                work at height. Every worker must know what to do if they or a
                colleague falls. They must know where the rescue equipment is, how to
                raise the alarm, and who to contact. A plan that exists only on paper
                in the site office is not an effective plan.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Supervision Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">06</span>
            Supervision Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations require that work is{" "}
                <strong>appropriately supervised</strong>. The word
                &ldquo;appropriately&rdquo; is deliberate &mdash; the level of
                supervision must be proportional to the level of risk. Low-risk tasks
                carried out by experienced, competent workers may require only periodic
                checks. High-risk tasks, inexperienced workers, or complex operations
                require close, continuous supervision.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Supervision Levels
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">
                      Direct/continuous supervision:
                    </strong>{" "}
                    The supervisor is present at all times, watching the work and able
                    to intervene immediately. Required for trainee workers, high-risk
                    tasks (leading edge work, fragile surfaces), and first-time
                    operations.
                  </p>
                  <p>
                    <strong className="text-white">Periodic supervision:</strong>{" "}
                    The supervisor visits regularly (e.g. every 30&ndash;60 minutes),
                    checks that the plan is being followed, and is available to
                    provide guidance. Suitable for competent workers on routine,
                    lower-risk tasks.
                  </p>
                  <p>
                    <strong className="text-white">Remote oversight:</strong>{" "}
                    The competent person is available by phone or radio but is not
                    physically present. Only appropriate for highly experienced workers
                    doing very low-risk, routine tasks. The worker must know how to
                    contact the supervisor and must stop work if conditions change.
                  </p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  An unsupervised worker who takes a shortcut or deviates from the
                  plan is a foreseeable risk. If the employer has not provided
                  appropriate supervision, the employer bears legal liability for
                  the consequences. &ldquo;We told them what to do&rdquo; is not a
                  defence if supervision was inadequate for the level of risk.
                </p>
              </div>

              <p>
                The supervisor must have the authority to stop work. A supervisor who
                identifies an unsafe practice but lacks the authority to halt
                operations is not an effective supervisor. The supervisor must also be
                competent for the type of work being overseen &mdash; a general site
                supervisor may not be competent to supervise specialist rope access
                operations.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Equipment Selection and Condition Verification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">07</span>
            Equipment Selection &amp; Condition Verification
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The planning process must include the selection of the most suitable
                equipment for the task and verification that the equipment is in safe,
                working condition. Under the hierarchy established by Schedule 1 of the
                WAH Regs, the first consideration is always whether work at height can
                be avoided entirely. If it cannot, the regulations require the use of
                collective protection (guard rails, barriers) before personal protection
                (harnesses, fall arrest).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">
                    Equipment Selection Factors
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Height of the working position</strong> &mdash; ladders
                      are limited in height, scaffolds and MEWPs offer greater reach
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Duration of the task</strong> &mdash; as covered in
                      Section 04 above
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Nature of the work</strong> &mdash; does it require both
                      hands, heavy tools, or materials at height?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Ground conditions</strong> &mdash; is the ground level,
                      firm, and capable of supporting the equipment?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Access restrictions</strong> &mdash; can the equipment
                      be delivered and positioned at the work location?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Environmental hazards</strong> &mdash; overhead power
                      lines, adjacent traffic, public proximity
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Once equipment is selected, it must be inspected before use.{" "}
                <strong>Regulation 12</strong> requires that all equipment used for
                work at height is inspected at the place it is to be used, before being
                put into use on each occasion. The inspection must verify that the
                equipment is the correct type, that it is in good condition with no
                visible defects, and that it has been maintained and tested within the
                required period.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> A visual
                  inspection before each use is the absolute minimum. Scaffolds
                  require a formal inspection recorded in a register every 7 days and
                  after any event that could affect stability. MEWPs require pre-use
                  checks and periodic thorough examinations (every 6 months for hired
                  equipment, 12 months for owned equipment under LOLER). Ladders must
                  be inspected before each use for defects to stiles, rungs, feet,
                  and locking mechanisms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Communication — Briefings and Toolbox Talks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">08</span>
            Communication &mdash; Briefings &amp; Toolbox Talks
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A plan that is not communicated to the workforce is not an effective
                plan. The competent person must ensure that every person involved in
                the work at height has been briefed on the plan, the hazards, the
                control measures, and the emergency procedures before work begins.
                This is typically done through a combination of site inductions,
                method statement briefings, and toolbox talks.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Pre-Work Briefing Content
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>What</strong> work is being done and <strong>where</strong> on
                      site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Hazards</strong> identified and the <strong>controls</strong> in
                      place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Equipment</strong> being used and any limitations or restrictions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Individual roles</strong> &mdash; who is doing what
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Emergency procedures</strong> including the rescue plan
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Weather triggers</strong> &mdash; when work must stop
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Stop authority</strong> &mdash; every worker has the
                      right to stop if they feel unsafe
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The briefing should be documented. At a minimum, record the date,
                time, topic, content covered, and the names of all attendees.
                Attendance records serve as evidence that workers were informed of the
                plan and the hazards. If an incident occurs, the briefing record will
                be one of the first documents the HSE asks to see.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> A toolbox
                  talk is not a one-way lecture. Workers must be encouraged to ask
                  questions, raise concerns, and share their own observations about
                  the conditions. A briefing where nobody speaks up may indicate that
                  workers do not feel safe to raise concerns &mdash; this is itself a
                  safety culture issue that must be addressed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Planning Checklist Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">09</span>
            Planning Checklist
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following checklist summarises the key areas that must be addressed
                when planning any work at height. Use this as a cross-check before
                work begins to ensure nothing has been missed.
              </p>

              {/* Planning Checklist Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <ClipboardList className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">
                      WAH Planning Checklist
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Personnel */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-blue-400" />
                      <p className="text-sm font-semibold text-blue-400">
                        Personnel
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-400/70 mt-0.5 flex-shrink-0" />
                        <span>Competent person appointed to plan/supervise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-400/70 mt-0.5 flex-shrink-0" />
                        <span>Workers trained for the specific equipment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-400/70 mt-0.5 flex-shrink-0" />
                        <span>Rescue-trained personnel identified</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-400/70 mt-0.5 flex-shrink-0" />
                        <span>First aider location confirmed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-400/70 mt-0.5 flex-shrink-0" />
                        <span>Supervision level set to match risk</span>
                      </li>
                    </ul>
                  </div>

                  {/* Equipment */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="h-5 w-5 text-green-400" />
                      <p className="text-sm font-semibold text-green-400">
                        Equipment
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400/70 mt-0.5 flex-shrink-0" />
                        <span>Correct equipment selected for the task</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400/70 mt-0.5 flex-shrink-0" />
                        <span>Pre-use inspection completed and recorded</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400/70 mt-0.5 flex-shrink-0" />
                        <span>Thorough examination in date (LOLER/PUWER)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400/70 mt-0.5 flex-shrink-0" />
                        <span>Rescue equipment available and in position</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400/70 mt-0.5 flex-shrink-0" />
                        <span>PPE issued, fitted, and in good condition</span>
                      </li>
                    </ul>
                  </div>

                  {/* Environment */}
                  <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wind className="h-5 w-5 text-teal-400" />
                      <p className="text-sm font-semibold text-teal-400">
                        Environment
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-teal-400/70 mt-0.5 flex-shrink-0" />
                        <span>Weather forecast checked (wind, rain, ice)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-teal-400/70 mt-0.5 flex-shrink-0" />
                        <span>Ground conditions assessed (firm, level)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-teal-400/70 mt-0.5 flex-shrink-0" />
                        <span>Overhead hazards identified (power lines, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-teal-400/70 mt-0.5 flex-shrink-0" />
                        <span>Exclusion zones established where needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-teal-400/70 mt-0.5 flex-shrink-0" />
                        <span>Lighting adequate for the task</span>
                      </li>
                    </ul>
                  </div>

                  {/* Emergency */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <LifeBuoy className="h-5 w-5 text-red-400" />
                      <p className="text-sm font-semibold text-red-400">
                        Emergency
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-red-400/70 mt-0.5 flex-shrink-0" />
                        <span>Rescue plan written and communicated</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-red-400/70 mt-0.5 flex-shrink-0" />
                        <span>Rescue equipment on site and tested</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-red-400/70 mt-0.5 flex-shrink-0" />
                        <span>Emergency services access route confirmed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-red-400/70 mt-0.5 flex-shrink-0" />
                        <span>Mobile phone/radio available for comms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-red-400/70 mt-0.5 flex-shrink-0" />
                        <span>Nearest A&amp;E location known</span>
                      </li>
                    </ul>
                  </div>
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
            <Link to="../working-at-height-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-amber-500 text-[#1a1a1a] hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-4-section-2">
              Next: Permit-to-Work Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
