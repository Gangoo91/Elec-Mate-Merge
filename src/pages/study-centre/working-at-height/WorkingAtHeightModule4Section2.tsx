import {
  ArrowLeft,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  FileText,
  UserCheck,
  ClipboardCheck,
  ArrowRight,
  Lock,
  XCircle,
  Clock,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wah-m4s2-ptw-purpose",
    question:
      "What is the primary purpose of a permit-to-work system for work at height?",
    options: [
      "To generate paperwork for the site safety file",
      "To provide a formal, documented system that ensures all hazards are identified and controls are in place before high-risk work begins",
      "To transfer legal responsibility from the employer to the worker",
      "To satisfy insurance requirements for contractors",
    ],
    correctIndex: 1,
    explanation:
      "A permit-to-work is a formal, documented safety management system. Its purpose is to ensure that all hazards have been identified, all necessary precautions are in place, and all relevant parties have agreed that it is safe to proceed before high-risk work begins. It is not about paperwork or transferring responsibility — it is about controlling risk.",
  },
  {
    id: "wah-m4s2-permit-roles",
    question:
      "Who has ultimate responsibility for ensuring the conditions of a permit-to-work are maintained throughout the work?",
    options: [
      "The site security guard",
      "The client's insurance company",
      "The permit holder (the person carrying out the work)",
      "The HSE inspector assigned to the site",
    ],
    correctIndex: 2,
    explanation:
      "The permit holder is the person physically carrying out the work or directly supervising those who are. They are responsible for ensuring the conditions stated on the permit are maintained throughout the duration of the work. If conditions change or are no longer met, the permit holder must stop work and contact the permit issuer.",
  },
  {
    id: "wah-m4s2-expired-permit",
    question:
      "What should a worker do if they discover the permit-to-work for their task has expired but the work is not yet complete?",
    options: [
      "Continue working — the permit covers the entire task regardless of time",
      "Stop work immediately and contact the permit issuer for revalidation or a new permit",
      "Cross out the expiry time and write in a new one",
      "Ask a colleague to sign the permit to extend it",
    ],
    correctIndex: 1,
    explanation:
      "An expired permit means the authorised time period has ended and the permit is no longer valid. Work must stop immediately. The worker must contact the permit issuer, who will assess whether conditions remain safe and either revalidate the existing permit or issue a new one. Altering a permit document or continuing beyond its validity is a serious safety breach.",
  },
];

const faqs = [
  {
    question:
      "Does every work at height task require a permit-to-work?",
    answer:
      "No. A permit-to-work system is required for higher-risk work at height tasks, not for every instance of work at height. Routine, lower-risk tasks (such as using a stepladder for a brief task) are typically managed through risk assessments and method statements without a formal permit. However, tasks such as roof work, work near leading edges, work above fragile surfaces, complex scaffold operations, and MEWP operations near overhead power lines generally require a permit. The employer's safety management system should define which tasks require a permit.",
  },
  {
    question:
      "Can the same person be both the permit issuer and the permit holder?",
    answer:
      "No. The permit issuer and the permit holder must be different people. This separation of roles is a fundamental principle of the permit-to-work system. The issuer provides an independent check that conditions are safe before authorising the work. If the same person issued and held the permit, this independent verification would be lost. In some systems, there is also a 'performing authority' — the person who physically does the work — who may be different from the permit holder.",
  },
  {
    question:
      "What happens if a permit is issued but conditions change after work starts?",
    answer:
      "If conditions change (for example, weather deteriorates, a new hazard is discovered, or adjacent work introduces a conflict), the permit holder must stop work and inform the permit issuer. The permit issuer will reassess the situation and determine whether the work can continue with additional controls, whether the permit needs to be amended, or whether the permit should be suspended or cancelled. Work must not continue under the original permit if the conditions it was issued for no longer apply.",
  },
  {
    question:
      "How long should completed permits-to-work be retained?",
    answer:
      "Completed permits should be retained as part of the project safety records. There is no single legal requirement for a specific retention period, but best practice is to retain them for at least the duration of the project plus a reasonable period afterwards (typically 3-6 years). If an incident occurs, the HSE may request sight of permits issued for the relevant work. Many organisations retain permits for 6 years in line with the Limitation Act 1980 for civil claims. Electronic records should be backed up.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "A permit-to-work is best described as which of the following?",
    options: [
      "A form that allows any worker to carry out any task on site",
      "A formal documented safety system ensuring hazards are identified and controls are in place before high-risk work begins",
      "An insurance document required by the client",
      "A planning permission document issued by the local authority",
    ],
    correctAnswer: 1,
    explanation:
      "A permit-to-work is a formal documented safety management system, not just a form. It ensures all hazards are identified, precautions are in place, and authorised parties agree it is safe before high-risk work starts.",
  },
  {
    id: 2,
    question:
      "Which of the following WAH tasks would typically require a permit-to-work?",
    options: [
      "Using a stepladder to change a light bulb in an office",
      "Roof work near a leading edge on a commercial building",
      "Standing on a kick stool to access a shelf",
      "Walking up a fixed staircase to the first floor",
    ],
    correctAnswer: 1,
    explanation:
      "Roof work near a leading edge is a high-risk work at height task that typically requires a permit-to-work. The other options are either not work at height or are low-risk routine tasks that would be managed through standard risk assessments.",
  },
  {
    id: 3,
    question:
      "What is the role of the 'permit issuer' (authorising authority)?",
    options: [
      "To carry out the physical work at height",
      "To assess whether conditions are safe and authorise the work to proceed",
      "To provide the tools and materials for the job",
      "To notify the HSE that work at height is taking place",
    ],
    correctAnswer: 1,
    explanation:
      "The permit issuer (authorising authority) is the person who assesses whether all conditions are met and authorises the work to begin. They verify that hazards have been identified, controls are in place, and the permit holder is competent. They do not carry out the physical work themselves.",
  },
  {
    id: 4,
    question:
      "A permit-to-work has been issued for scaffold work from 08:00 to 16:00. At 14:00, heavy rain begins and the scaffold boards become slippery. What should happen?",
    options: [
      "Work continues because the permit is valid until 16:00",
      "The permit holder stops work, informs the permit issuer, and conditions are reassessed before work can resume",
      "The workers put on waterproof clothing and continue",
      "The permit is automatically extended to allow for the rain delay",
    ],
    correctAnswer: 1,
    explanation:
      "A permit is only valid while the conditions under which it was issued remain in place. If conditions change materially (such as rain making surfaces slippery), the permit holder must stop work and the permit issuer must reassess. Work can only resume when conditions are confirmed as safe.",
  },
  {
    id: 5,
    question:
      "What information must be included on a permit-to-work for work at height?",
    options: [
      "Only the names of the workers and the date",
      "Description of work, location, hazards, precautions, equipment, duration, emergency arrangements, and signatures",
      "Only the equipment serial numbers",
      "The weather forecast for the next 7 days",
    ],
    correctAnswer: 1,
    explanation:
      "A permit must include a comprehensive description of the work, the precise location, identified hazards, required precautions, equipment needed, the duration/validity period, emergency arrangements, and signatures of the issuer and holder. It is a detailed safety document, not a simple sign-off.",
  },
  {
    id: 6,
    question:
      "Which step comes immediately after 'Work Proceeds' in the permit lifecycle?",
    options: [
      "Permit Request",
      "Hazard Assessment",
      "Completion and Return/Cancellation",
      "Equipment Procurement",
    ],
    correctAnswer: 2,
    explanation:
      "The permit lifecycle is: Request, Assessment, Issue, Work Proceeds, Completion/Return/Cancel. After work proceeds and is completed, the permit must be formally returned (closed out) or cancelled. This confirms the work is finished and the area is safe for normal operations.",
  },
  {
    id: 7,
    question:
      "Why must permits-to-work be cross-referenced with other active permits on site?",
    options: [
      "To reduce the amount of paperwork",
      "To ensure there are no conflicting activities (e.g. hot work below WAH, electrical isolation affecting lighting)",
      "To check that all permits have the same expiry time",
      "To verify that the same person has not been issued two permits",
    ],
    correctAnswer: 1,
    explanation:
      "Cross-referencing permits prevents dangerous conflicts. For example, hot work directly below a WAH task creates a fire risk to workers above. Electrical isolation could remove lighting needed for safe WAH. Confined space work in the area might affect ventilation or escape routes. All active permits must be checked for potential interactions.",
  },
  {
    id: 8,
    question:
      "Which of the following is a common failure in permit-to-work systems?",
    options: [
      "Conducting a thorough hazard assessment before issuing the permit",
      "Requiring signatures from both the permit issuer and holder",
      "Permits being issued but not followed, treated as a formality rather than a live safety document",
      "Recording the completion time when the work is finished",
    ],
    correctAnswer: 2,
    explanation:
      "One of the most common and dangerous failures is 'permit fatigue' — where permits are issued as a routine formality but the actual precautions are not followed or verified on site. This defeats the entire purpose of the system. A permit that is signed but not actively managed is worse than useless because it creates a false sense of security.",
  },
];

export default function WorkingAtHeightModule4Section2() {
  useSEO({
    title: "Permit-to-Work Systems | Working at Height Module 4.2",
    description:
      "Permit-to-work systems for work at height including when PTW is required, permit content, issuer and holder roles, permit lifecycle, cross-referencing, training, and common failures.",
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
            <FileCheck className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Permit-to-Work Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Formal documented safety systems for high-risk work at height
            including permit content, roles, lifecycle, cross-referencing, and
            common failures
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
                  <strong>Not just a form:</strong> a live safety management
                  system
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Issuer &ne; Holder:</strong> separation of roles is
                  essential
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Valid only</strong> while stated conditions remain true
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
                  <strong>Request:</strong> identify why a permit is needed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Issue:</strong> verify hazards, controls, and
                  competence
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Close out:</strong> return the permit on completion
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
              "Explain what a permit-to-work system is and its purpose",
              "Identify when a PTW is required for work at height",
              "List the essential content of a permit-to-work document",
              "Describe the roles of permit issuer, permit holder, and performing authority",
              "Outline the permit lifecycle from request to closure",
              "Recognise common failures in permit-to-work systems",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-amber-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a Permit-to-Work? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">01</span>
            What Is a Permit-to-Work?
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A permit-to-work (PTW) is a <strong>formal, documented safety
                management system</strong>. It is not simply a form to be filled in
                and filed. It is a live process that ensures high-risk work does not
                begin until all hazards have been identified, all necessary precautions
                are in place, all relevant parties have been informed, and a competent
                person has authorised the work to proceed.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> A
                  permit-to-work is a safety system, not a piece of paper. The document
                  is the physical record of the system in operation. If the document
                  exists but the checks, verifications, and communications do not
                  actually take place, the system has failed — regardless of what is
                  written on the form.
                </p>
              </div>

              <p>
                The concept originates from high-hazard industries such as oil and gas,
                chemical processing, and nuclear power, where the consequences of
                uncontrolled work are catastrophic. It has been adopted across
                construction and maintenance work for any task where the risk is
                sufficiently high that a standard risk assessment and method statement
                alone are not considered adequate control.
              </p>

              <p>
                A PTW provides a structured framework for communication between the
                people who authorise the work (the permit issuer) and the people who
                carry it out (the permit holder). It creates a clear, signed agreement
                that specific conditions have been met and specific precautions are in
                place. When the work is completed, the permit is formally returned and
                closed, confirming that the area is safe.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What a PTW System Provides
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      A <strong>structured assessment</strong> of hazards specific to
                      the task and location
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      An <strong>independent check</strong> by a competent authorising
                      person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      A <strong>signed agreement</strong> that conditions have been met
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Time-limited authority</strong> — the permit has a
                      defined validity period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      A <strong>formal close-out</strong> process confirming work is
                      complete and the area is safe
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: When Is a PTW Required for WAH? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">02</span>
            When Is a PTW Required for Work at Height?
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not every work at height task requires a permit-to-work. Permits are
                reserved for <strong>higher-risk activities</strong> where the standard
                risk assessment and method statement process alone is not considered
                sufficient to control the risk. The employer&rsquo;s safety management
                system should define which tasks trigger the permit requirement.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-400 mb-3">
                  WAH Tasks That Typically Require a PTW
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Roof work:</strong> Any work on
                    or adjacent to a roof, including flat roofs, pitched roofs, and
                    roof edges. Falls from roofs are the single largest cause of fatal
                    falls from height in the UK construction industry.
                  </p>
                  <p>
                    <strong className="text-white">Work near leading edges:</strong>{" "}
                    Any work within 2 metres of an unprotected edge from which a person
                    could fall. This includes floor openings, stairwell voids, and
                    lift shaft openings during construction.
                  </p>
                  <p>
                    <strong className="text-white">Work above fragile surfaces:</strong>{" "}
                    Fragile roof materials (such as fibre cement sheets, roof lights,
                    or corroded metal decking) that would not support a person&rsquo;s
                    weight. Falls through fragile surfaces account for a significant
                    proportion of fatal falls.
                  </p>
                  <p>
                    <strong className="text-white">Complex scaffold operations:</strong>{" "}
                    Erection, modification, or dismantling of complex scaffold
                    configurations, including scaffold handover inspections and
                    scaffold modifications after handover.
                  </p>
                  <p>
                    <strong className="text-white">
                      MEWP work near overhead power lines:
                    </strong>{" "}
                    Operating a mobile elevating work platform within the approach
                    distance of overhead power lines, where contact could cause
                    electrocution.
                  </p>
                  <p>
                    <strong className="text-white">
                      Steel erection and structural work:
                    </strong>{" "}
                    Erecting structural steelwork at height where workers are exposed
                    to fall risks during connection and bolting operations.
                  </p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  The absence of a specific regulatory requirement to use a permit
                  does not mean one is unnecessary. If the risk assessment identifies
                  that a task is high-risk and that a permit system would provide an
                  additional layer of control, a permit should be used regardless of
                  whether it is technically &ldquo;required&rdquo;. The duty is to
                  reduce risk so far as is reasonably practicable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Permit Content */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">03</span>
            Permit Content
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A permit-to-work document for work at height must contain sufficient
                information to clearly define what work is authorised, where it is
                taking place, what the hazards are, what precautions are required, and
                who is responsible. Incomplete or vague permits undermine the entire
                system.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Essential Permit Content
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Description of work:</strong>{" "}
                    A clear, specific description of the work to be carried out. Not
                    &ldquo;roof work&rdquo; but &ldquo;replacement of three damaged
                    ridge tiles on the north elevation of Building C, requiring access
                    to the roof slope via a scaffold&rdquo;.
                  </p>
                  <p>
                    <strong className="text-white">Location:</strong> The precise
                    location where the work will take place. Include the building,
                    elevation, floor level, grid references if applicable, and any
                    adjacent areas that may be affected.
                  </p>
                  <p>
                    <strong className="text-white">Hazards identified:</strong> All
                    hazards specific to the task and location — fall from edge, fall
                    through fragile surface, falling materials, weather, overhead
                    power lines, other trades working below, public access.
                  </p>
                  <p>
                    <strong className="text-white">Precautions required:</strong>{" "}
                    The specific control measures that must be in place — edge
                    protection, harness system, exclusion zones, netting, tool
                    lanyards, weather monitoring, banksman.
                  </p>
                  <p>
                    <strong className="text-white">Equipment needed:</strong> All
                    access equipment and PPE required for the task, including rescue
                    equipment.
                  </p>
                  <p>
                    <strong className="text-white">Duration/validity:</strong> The
                    start time, end time, and maximum duration of the permit. Permits
                    are typically issued for a single shift or a defined period (e.g.
                    08:00 to 17:00 on a specific date). The permit is invalid outside
                    this period.
                  </p>
                  <p>
                    <strong className="text-white">Emergency arrangements:</strong>{" "}
                    The rescue plan, first aid provision, emergency contact numbers,
                    and evacuation procedures.
                  </p>
                  <p>
                    <strong className="text-white">Signatures:</strong> Signatures
                    of the permit issuer and the permit holder, confirming they have
                    read, understood, and agreed to the conditions. Additional
                    signatures may be required from the performing authority and from
                    any cross-referenced permit holders.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> The permit
                  must be displayed at or near the work location so that it is visible
                  to all persons involved. It should not be locked in the site office.
                  Anyone approaching the work area should be able to see that a permit
                  is in force and read the conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Roles and Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">04</span>
            Roles &amp; Responsibilities
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A permit-to-work system involves clearly defined roles with specific
                responsibilities. The separation of these roles is fundamental to the
                integrity of the system &mdash; the person authorising the work must
                not be the same person carrying it out.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-semibold text-blue-400">
                      Permit Issuer
                    </p>
                  </div>
                  <p className="text-xs text-white/60 mb-2">
                    (Authorising Authority)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Competent person trained in the PTW system and the type of
                        work being authorised
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Assesses that all preconditions are met before issuing
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Visits the work location to verify conditions in person
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Signs the permit to confirm authorisation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Has authority to suspend or cancel the permit at any time
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardCheck className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-semibold text-green-400">
                      Permit Holder
                    </p>
                  </div>
                  <p className="text-xs text-white/60 mb-2">
                    (Person in charge of the work)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Responsible for ensuring all conditions on the permit are
                        maintained throughout the work
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Briefs the workforce on the permit conditions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Stops work if conditions change or are no longer met
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Returns the permit to the issuer on completion
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Must remain at or near the work location while the permit is
                        active
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Performing Authority
                  </p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  In some systems, a third role exists: the <strong>performing
                  authority</strong>. This is the person or team who physically carry
                  out the work. They may be different from the permit holder, who is
                  the supervisory figure in charge. The performing authority must be
                  briefed on the permit conditions, must comply with all stated
                  precautions, and must report any problems to the permit holder.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Permit Lifecycle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">05</span>
            Permit Lifecycle
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A permit-to-work follows a defined lifecycle from initial request
                through to formal closure. Each stage must be completed in sequence.
                Skipping stages or rushing through the process undermines the safety
                controls the system is designed to provide.
              </p>

              {/* Permit Lifecycle Flowchart */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <ClipboardCheck className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">
                      Permit Lifecycle Flowchart
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Stage 1 */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-400">
                          Request
                        </p>
                        <p className="text-xs text-white/70">
                          Permit holder identifies need for permit and submits
                          request to issuer with task details
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                  </div>

                  {/* Stage 2 */}
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-400">
                          Assessment
                        </p>
                        <p className="text-xs text-white/70">
                          Issuer visits the location, verifies hazards, checks controls
                          are in place, reviews cross-permits
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                  </div>

                  {/* Stage 3 */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-400">
                          Issue
                        </p>
                        <p className="text-xs text-white/70">
                          Issuer signs and issues the permit; holder counter-signs
                          accepting the conditions; validity period begins
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                  </div>

                  {/* Stage 4 */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-400 text-xs font-bold">4</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-amber-400">
                          Work Proceeds
                        </p>
                        <p className="text-xs text-white/70">
                          Work carried out under permit conditions; holder monitors
                          compliance; conditions checked continuously
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                  </div>

                  {/* Stage 5 */}
                  <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-teal-400 text-xs font-bold">5</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-teal-400">
                          Completion
                        </p>
                        <p className="text-xs text-white/70">
                          Work is finished; holder confirms area is left safe;
                          equipment and materials removed from the work location
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                  </div>

                  {/* Stage 6 */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-red-400 text-xs font-bold">6</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-400">
                          Return / Cancel
                        </p>
                        <p className="text-xs text-white/70">
                          Permit returned to issuer who signs it off; filed as a
                          permanent record; area released for normal operations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                If work is not completed within the permit validity period, the permit
                expires and a new permit must be issued. The existing permit cannot
                simply be extended by altering the time. The issuer must revisit the
                location, reassess conditions, and issue a fresh permit if it is safe
                to continue.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Cross-Referencing with Other Permits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">06</span>
            Cross-Referencing with Other Permits
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On busy construction sites, multiple permit-to-work activities may be
                taking place simultaneously. A critical element of the permit system is
                ensuring that <strong>no conflicts exist between active permits</strong>.
                The permit issuer must check all other active permits before issuing a
                new one.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Dangerous Conflicts to Check For
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Hot work below WAH:</strong> If
                    hot work (welding, cutting, grinding) is being carried out directly
                    below work at height, sparks and hot metal can reach the workers
                    above. Molten materials can also damage ropes, harnesses, and nets.
                  </p>
                  <p>
                    <strong className="text-white">Electrical isolation:</strong> If
                    an electrical isolation permit has been issued that affects lighting
                    or power in the area where WAH is taking place, workers at height
                    may lose lighting or power to their equipment.
                  </p>
                  <p>
                    <strong className="text-white">Confined space entry:</strong> If
                    confined space work is taking place below or adjacent to the WAH
                    area, there may be ventilation, gas monitoring, or emergency access
                    conflicts.
                  </p>
                  <p>
                    <strong className="text-white">Crane operations:</strong> If a
                    crane is operating in the vicinity, loads may swing over the WAH
                    area, creating struck-by hazards. Crane slew radius must be checked
                    against the WAH location.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> A
                  permit-to-work register (physical board or electronic system) must
                  be maintained showing all active permits. The register should display
                  the permit number, location, type of work, validity period, and
                  holder. Before issuing a new permit, the issuer must review the
                  register for potential conflicts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Training Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">07</span>
            Training Requirements
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Both permit issuers and permit holders must be trained in the
                organisation&rsquo;s permit-to-work system. This is not a generic
                safety induction &mdash; it is specific training on how the PTW system
                operates, what the roles and responsibilities are, and how to deal
                with changes and emergencies.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-400 mb-2">
                    Permit Issuer Training
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Understanding of the PTW system structure and purpose
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Hazard identification skills for the work being authorised
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Knowledge of the hierarchy of controls for WAH
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        How to cross-reference with other active permits
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Suspension and cancellation procedures
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-400 mb-2">
                    Permit Holder Training
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        How to read and understand a permit document
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Responsibilities during the work period
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        What to do if conditions change or a hazard arises
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        How to properly return/close the permit
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Emergency and escalation procedures
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                Training should be refreshed regularly (typically annually) and
                whenever the PTW system is changed. Records of who has been trained
                and when must be maintained. A person who has not received the
                organisation&rsquo;s PTW training must not issue or hold a permit.
              </p>
            </div>
          </div>
        </section>

        {/* Section 08: Common Failures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">08</span>
            Common Failures
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Investigations into incidents where a permit-to-work system was in
                place but failed to prevent harm consistently identify the same
                underlying problems. Understanding these failures helps you recognise
                when a system is being undermined.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common PTW System Failures
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Permit fatigue:</strong> Permits
                    are issued routinely without genuine assessment. The issuer
                    signs without visiting the location, the holder signs without
                    reading the conditions, and the permit becomes a meaningless piece
                    of paper that creates a false sense of security.
                  </p>
                  <p>
                    <strong className="text-white">Expired permits:</strong> Work
                    continues beyond the validity period. Workers assume the permit
                    covers the task, not a time period. Supervisors fail to check
                    expiry times. The result is uncontrolled work that is no longer
                    being managed by the permit system.
                  </p>
                  <p>
                    <strong className="text-white">
                      Work outside permitted scope:
                    </strong>{" "}
                    The permit authorises specific work in a specific location.
                    Workers extend the scope (&ldquo;while we&rsquo;re up here, let&rsquo;s
                    do that too&rdquo;) without requesting an amendment or new permit.
                    The additional work has not been assessed and the controls may not
                    be adequate.
                  </p>
                  <p>
                    <strong className="text-white">
                      No formal close-out:
                    </strong>{" "}
                    The permit is issued and work proceeds, but the permit is never
                    formally returned and closed. This means the issuer does not know
                    whether the work is complete, whether the area is safe, or whether
                    the permit is still active.
                  </p>
                  <p>
                    <strong className="text-white">
                      Inadequate cross-referencing:
                    </strong>{" "}
                    Multiple permits are active in the same area but the issuers have
                    not checked for conflicts. Hot work below work at height, crane
                    operations overlapping with scaffold work, or electrical isolation
                    affecting lighting for WAH.
                  </p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  If you are asked to work under a permit that you have not read,
                  that has expired, or that does not match the work you are being
                  asked to do &mdash; <strong>stop and challenge</strong>. You have
                  the right and the duty to refuse to work if the permit conditions
                  are not being met. Report the issue to your supervisor and, if
                  necessary, to the site safety team.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Planning &amp; Organising
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-amber-500 text-[#1a1a1a] hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-4-section-3">
              Next: Method Statements &amp; Rescue Plans
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
