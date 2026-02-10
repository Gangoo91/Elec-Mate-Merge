import { ArrowLeft, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ptw-definition",
    question:
      "A permit-to-work is best described as which of the following?",
    options: [
      "A formal documented procedure that forms part of the safe system of work",
      "A simple tick-box form that allows entry into any space",
      "A verbal agreement between the entrant and the site manager",
      "A generic risk assessment that covers all tasks on site",
    ],
    correctIndex: 0,
    explanation:
      "A permit-to-work is a formal documented procedure — not just a form. It is a critical component of the safe system of work for confined space entry. It ensures that hazards have been identified, precautions are in place, and authorisation has been given before work begins.",
  },
  {
    id: "permit-issuer-role",
    question:
      "What is the primary responsibility of the permit issuer (authorising authority)?",
    options: [
      "Carrying out the physical work inside the confined space",
      "Assessing hazards, confirming precautions are in place, and authorising the permit",
      "Standing outside the confined space as the safety attendant",
      "Completing the emergency rescue plan after entry has commenced",
    ],
    correctIndex: 1,
    explanation:
      "The permit issuer (authorising authority) is responsible for assessing the hazards, confirming that all required precautions are in place, and formally authorising the permit before entry is allowed. They must visit the site and satisfy themselves that conditions are safe before signing.",
  },
  {
    id: "permit-cross-reference",
    question:
      "Why must a confined space permit-to-work be cross-referenced with other active permits?",
    options: [
      "To reduce the number of forms that need to be completed",
      "To ensure that conflicting activities (such as hot work or electrical isolation) are identified and controlled",
      "Because cross-referencing is a legal requirement under BS 7671",
      "To allow multiple teams to share the same permit document",
    ],
    correctIndex: 1,
    explanation:
      "Cross-referencing ensures that conflicting activities are identified and controlled. For example, if hot work is being carried out near a confined space, additional fire risks must be managed. If electrical isolation is in place, the confined space permit must reference the isolation certificate to prevent inadvertent re-energisation.",
  },
];

const faqs = [
  {
    question: "Is a permit-to-work legally required for every confined space entry?",
    answer:
      "The Confined Spaces Regulations 1997 require a safe system of work for all confined space activities. A permit-to-work is the recognised method of documenting and controlling that safe system for higher-risk entries. In practice, a PTW should be used for all confined space entries unless the risk is very low and can be adequately controlled by other documented means. HSE guidance (L101 — Safe Work in Confined Spaces) strongly recommends permits for all entries. Many employers and principal contractors require them as a blanket policy, and most industry codes of practice treat them as mandatory.",
  },
  {
    question: "Who can act as a permit issuer?",
    answer:
      "The permit issuer must be a competent person with sufficient knowledge, training, and authority to assess the hazards of the confined space, determine the precautions required, and authorise the entry. This is typically a senior supervisor, safety officer, or engineer who has been formally trained and appointed by the organisation. The permit issuer must not be the same person as the permit holder (the entrant or team leader) — there must be an independent check. The issuer must visit the site before signing the permit and must not authorise entry unless they are satisfied that all precautions are in place.",
  },
  {
    question: "What happens if conditions change while a permit is live?",
    answer:
      "If conditions change while a permit is live — for example, a change in weather, an unexpected alarm, detection of a new hazard, or equipment failure — work must stop immediately and all personnel must leave the confined space. The permit must be suspended or cancelled. A new assessment must be carried out, and a new permit issued if the work is to resume. Under no circumstances should work continue under the original permit if the conditions on which it was based have changed. This is one of the most common causes of permit-related incidents: people continuing to work after conditions have changed because the permit is still technically 'open'.",
  },
  {
    question: "How long should permits and associated records be kept?",
    answer:
      "There is no single statutory retention period that applies to all permit-to-work records. However, best practice and most industry standards recommend retaining completed permits and associated records (gas test results, isolation certificates, risk assessments) for a minimum of three years. Some organisations retain them for longer — particularly in industries subject to major accident hazard regulations (COMAH) or where long-latency health risks (such as exposure to hazardous substances) may arise. The records should be stored securely, be readily retrievable for audit purposes, and form part of the organisation's overall health and safety record-keeping system.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT typically recorded on a confined space permit-to-work?",
    options: [
      "Description of the work and location of the confined space",
      "Hazards identified and precautions required",
      "The entrant's National Insurance number",
      "Time limits and communication requirements",
    ],
    correctAnswer: 2,
    explanation:
      "A confined space PTW records the description of work, location, hazards, precautions (isolation, ventilation, monitoring, PPE), emergency arrangements, time limits, communication requirements, and signatures. Personal identification details such as National Insurance numbers are not part of the permit document.",
  },
  {
    id: 2,
    question: "What is the correct sequence of the permit lifecycle?",
    options: [
      "Issue → Request → Work → Closure → Assessment",
      "Request → Assessment → Issue → Work under permit → Extension (if needed) → Closure → Cancellation",
      "Assessment → Issue → Work → Request → Closure",
      "Work → Request → Issue → Closure → Assessment",
    ],
    correctAnswer: 1,
    explanation:
      "The correct permit lifecycle is: request (the work team requests a permit) → assessment (hazards and precautions are assessed) → issue (the permit is formally authorised and signed) → work under permit (the work is carried out within the permit conditions) → extension if needed (time or scope changes are formally authorised) → closure (the permit is signed off on completion) → cancellation (the permit is formally closed and filed).",
  },
  {
    id: 3,
    question:
      "The permit holder (entrant/team leader) is responsible for which of the following?",
    options: [
      "Authorising the permit and assessing all hazards",
      "Ensuring the work is carried out in accordance with the permit conditions and that all team members understand the requirements",
      "Designing the confined space ventilation system",
      "Carrying out the annual audit of the permit-to-work system",
    ],
    correctAnswer: 1,
    explanation:
      "The permit holder is the person in charge of the work — usually the entrant or team leader. They are responsible for ensuring that the work is carried out in accordance with the permit conditions, that all team members have been briefed, that precautions are maintained throughout the work, and that the permit is returned for closure when the work is complete.",
  },
  {
    id: 4,
    question:
      "Which of the following is a common cause of permit-to-work failures?",
    options: [
      "Issuing the permit after a thorough site visit",
      "Updating the permit when conditions change",
      "Permits issued without a site visit, or permits treated as mere paperwork",
      "Closing the permit promptly when the work is finished",
    ],
    correctAnswer: 2,
    explanation:
      "Common permit failures include: permits issued without a site visit (the issuer signs without checking conditions), permits treated as mere paperwork (a tick-box exercise rather than a genuine safety process), permits not closed when work is finished, and permits not updated when conditions change. Each of these failures undermines the purpose of the permit system and can lead to serious incidents.",
  },
  {
    id: 5,
    question:
      "When hot work is carried out inside a confined space, which additional requirements apply?",
    options: [
      "No additional requirements — the standard confined space permit covers hot work",
      "A separate hot work permit, gas-free certification, fire watch, and removal or protection of flammable materials",
      "Only a verbal agreement with the site manager",
      "Hot work is never permitted inside a confined space under any circumstances",
    ],
    correctAnswer: 1,
    explanation:
      "Hot work inside a confined space requires a separate hot work permit cross-referenced with the confined space permit, gas-free certification confirming the atmosphere is below the lower explosive limit, a fire watch during and after the work, removal or protection of all flammable materials within the space, and appropriate fire-fighting equipment immediately available at the entry point.",
  },
  {
    id: 6,
    question:
      "How does an electrical isolation permit relate to BS 7671 and the safe isolation procedure?",
    options: [
      "BS 7671 does not apply to confined spaces",
      "The electrical isolation permit documents that the safe isolation procedure (lock off, prove dead, secure) has been completed in accordance with BS 7671 requirements",
      "The electrical isolation permit replaces the need for a safe isolation procedure",
      "BS 7671 only applies to domestic installations",
    ],
    correctAnswer: 1,
    explanation:
      "The electrical isolation permit confirms that the safe isolation procedure — as required by BS 7671 (the IET Wiring Regulations) and GS 38 guidance — has been properly carried out. This includes switching off, locking off, proving dead with an approved voltage indicator, and securing against re-energisation. The permit documents who carried out the isolation, what was isolated, and ensures it is not re-energised until the confined space work is complete.",
  },
  {
    id: 7,
    question:
      "Where should the permit-to-work document be displayed during the work?",
    options: [
      "In the site office filing cabinet",
      "At the point of entry to the confined space, clearly visible to all personnel",
      "On the company intranet only",
      "In the entrant's pocket, out of sight",
    ],
    correctAnswer: 1,
    explanation:
      "The permit must be displayed at the point of entry to the confined space so that it is clearly visible to all personnel involved in the work — entrants, the top person/safety attendant, and any other workers in the area. This ensures everyone can verify that a valid permit is in force and can check the conditions, time limits, and emergency arrangements at any time during the work.",
  },
  {
    id: 8,
    question:
      "During a permit-to-work audit, which of the following would be considered a serious finding?",
    options: [
      "Permits filed in date order with all sections completed",
      "Gas test records attached to each permit",
      "Multiple permits found without closure signatures, indicating work was completed but permits were never formally closed",
      "Emergency arrangements clearly documented on every permit",
    ],
    correctAnswer: 2,
    explanation:
      "Permits without closure signatures indicate that the permit system is not being followed properly. If permits are not formally closed, the organisation has no confirmation that the confined space has been made safe, that all personnel have exited, that temporary equipment has been removed, and that the space has been handed back. This is a serious audit finding because it represents a breakdown in the control system.",
  },
];

export default function ConfinedSpacesModule2Section4() {
  useSEO({
    title:
      "Permit-to-Work Systems | Confined Spaces Module 2.4",
    description:
      "Permit-to-work systems for confined spaces — the permit document, roles and responsibilities, permit lifecycle, cross-referencing, common failures, hot work permits, electrical isolation permits, display, and audit.",
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
            <Link to="../confined-spaces-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <FileText className="h-7 w-7 text-cyan-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-500 text-xs font-semibold">
              MODULE 2 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Permit-to-Work Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The formal documented procedure that controls entry into confined
            spaces &mdash; from the permit document and defined roles to the
            full lifecycle, cross-referencing, and audit
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>PTW:</strong> Formal documented procedure, not just a
                form
              </li>
              <li>
                <strong>When:</strong> All confined space entries unless very low
                risk
              </li>
              <li>
                <strong>Lifecycle:</strong> Request &rarr; Assess &rarr; Issue
                &rarr; Work &rarr; Close
              </li>
              <li>
                <strong>Failures:</strong> Permits not closed, conditions changed
                but not updated
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Always:</strong> Check the permit is valid before entry
              </li>
              <li>
                <strong>Display:</strong> Permit must be visible at the entry
                point
              </li>
              <li>
                <strong>Stop:</strong> If conditions change, leave and get a new
                permit
              </li>
              <li>
                <strong>Close:</strong> Return the permit when the work is
                finished
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
              "Explain what a permit-to-work is and why it is more than just a form",
              "List the information that must be recorded on a confined space permit",
              "Describe the roles involved in the permit-to-work system and their responsibilities",
              "Outline the full permit lifecycle from request to cancellation",
              "Explain how confined space permits are cross-referenced with hot work and electrical isolation permits",
              "Identify common permit-to-work failures and describe the audit and record-keeping requirements",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a Permit-to-Work? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">01</span>
            What Is a Permit-to-Work?
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A permit-to-work (PTW) is a{" "}
                <strong>
                  formal documented procedure that forms part of the safe system
                  of work
                </strong>{" "}
                for activities involving significant risk &mdash; including entry
                into confined spaces. It is not simply a form to be filled in. It
                is a structured process that ensures hazards have been identified,
                precautions are in place, responsibilities are assigned, and
                authorisation has been given before any person enters a confined
                space.
              </p>

              <p>
                The purpose of a PTW system is to provide a{" "}
                <strong>clear, auditable record</strong> that all the necessary
                checks and controls have been completed. It creates a chain of
                responsibility &mdash; from the person who requests the work,
                through the person who assesses and authorises it, to the person
                who carries it out, and finally to the person who confirms the
                space is safe after the work is complete.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-500 mb-3">
                  A PTW Is NOT
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Just a form</strong> &mdash;
                      completing a form without following the process is
                      meaningless paperwork that provides no protection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        A substitute for risk assessment
                      </strong>{" "}
                      &mdash; the permit documents the outcomes of the risk
                      assessment; it does not replace it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        A blanket authorisation
                      </strong>{" "}
                      &mdash; each permit is specific to a particular task, in a
                      particular location, during a particular time period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        A guarantee of safety
                      </strong>{" "}
                      &mdash; the permit records precautions, but conditions can
                      change; continuous monitoring is still essential
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Under the Confined Spaces Regulations 1997 and HSE guidance
                document L101 (<em>Safe Work in Confined Spaces</em>), a
                permit-to-work should be used for{" "}
                <strong>all confined space entries</strong> unless the risk is
                very low and can be adequately controlled by other documented
                means. In practice, most employers and principal contractors
                require permits for every entry as a matter of policy, because the
                consequences of getting it wrong are so severe.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Rule
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Never enter a confined space without a valid permit-to-work.
                  </strong>{" "}
                  If no permit has been issued, if the permit has expired, or if
                  the conditions on which the permit was based have changed, you
                  must not enter the space. No deadline, no instruction from a
                  colleague, and no amount of pressure justifies entry without a
                  valid permit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Permit Document */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">02</span>
            The Permit Document
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The permit document is the{" "}
                <strong>written record of the permit-to-work</strong>. It must
                capture all the essential information needed to ensure that the
                entry is properly planned, controlled, and authorised. While
                formats vary between organisations, a confined space
                permit-to-work should include the following eight elements:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Eight Elements of the Permit Document
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Description of Work
                      </p>
                      <p>
                        A clear, specific description of the task to be carried
                        out &mdash; what work, using what methods, with what
                        equipment. Vague descriptions such as &ldquo;maintenance
                        work&rdquo; are not acceptable; the description must be
                        detailed enough for anyone reading the permit to
                        understand exactly what is being done.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Location &amp; Identification of Confined Space
                      </p>
                      <p>
                        The exact location and identification of the confined
                        space &mdash; building, floor, room, equipment reference
                        number, manhole number, or other unique identifier. There
                        must be no ambiguity about which space the permit relates
                        to.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Hazards Identified
                      </p>
                      <p>
                        All hazards identified through the risk assessment &mdash;
                        atmospheric hazards (toxic gases, oxygen depletion,
                        flammable vapours), physical hazards (engulfment, flooding,
                        moving machinery, electrical), biological hazards, and any
                        other specific risks associated with the space or the
                        work.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Precautions Required
                      </p>
                      <p>
                        The specific precautions that must be in place before
                        entry &mdash; including{" "}
                        <strong className="text-white">isolation</strong>{" "}
                        (mechanical, electrical, process),{" "}
                        <strong className="text-white">ventilation</strong>{" "}
                        (forced or natural),{" "}
                        <strong className="text-white">
                          atmospheric monitoring
                        </strong>{" "}
                        (continuous or periodic, with specified alarm levels),{" "}
                        <strong className="text-white">PPE</strong> (harness,
                        breathing apparatus, protective clothing), and any other
                        controls specific to the task.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Emergency Arrangements
                      </p>
                      <p>
                        The emergency and rescue plan &mdash; who will carry out
                        rescue, what equipment is available (rescue winch, SCBA,
                        stretcher), how the alarm will be raised, who will be
                        contacted, and the nearest point of access for emergency
                        services. The permit must confirm that emergency
                        arrangements are in place <em>before</em> entry, not
                        improvised afterwards.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-white font-medium">Time Limits</p>
                      <p>
                        The start time and expiry time of the permit. The permit
                        is only valid during the specified period. If the work
                        overruns, a formal extension must be authorised &mdash;
                        the team cannot simply continue working beyond the
                        permitted time. Time limits ensure that conditions are
                        reassessed at regular intervals.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      7
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Communication Requirements
                      </p>
                      <p>
                        How communication will be maintained between the
                        entrant(s) inside the space and the top person/safety
                        attendant outside &mdash; verbal, radio, hardwired
                        intercom, visual signals, or tethered lifeline signals.
                        The permit must specify the communication method and the
                        frequency of check-in.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      8
                    </span>
                    <div>
                      <p className="text-white font-medium">Signatures</p>
                      <p>
                        Signatures of the permit issuer (authorising the entry),
                        the permit holder (accepting the conditions), and the
                        person closing the permit (confirming work is complete and
                        the space is safe). Signatures create a chain of
                        accountability and confirm that each stage of the process
                        has been followed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Key Point:</strong> Every
                  section of the permit must be completed. A permit with blank
                  sections is not a valid permit. If a section does not apply to
                  the particular entry, it should be marked &ldquo;N/A&rdquo;
                  with a brief reason &mdash; not simply left blank. Blank
                  sections are a common audit finding and indicate that the permit
                  process is not being followed properly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Roles and Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">03</span>
            Roles &amp; Responsibilities
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The permit-to-work system defines{" "}
                <strong>clear roles with distinct responsibilities</strong>. No
                single person should hold more than one role on the same permit,
                because the system relies on independent checks at each stage.
                The four key roles are:
              </p>

              {/* Diagram: Permit Roles & Responsibilities */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-cyan-400">
                    Permit Roles &amp; Responsibilities
                  </p>
                </div>

                <div className="p-4 space-y-4">
                  {/* Role 1 — Permit Issuer */}
                  <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                    <p className="text-sm font-medium text-cyan-400 mb-2">
                      Permit Issuer (Authorising Authority)
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Assesses the hazards and determines the precautions
                          required
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Must visit the site
                          </strong>{" "}
                          before signing the permit &mdash; desk-based
                          authorisation is not acceptable
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Confirms that all precautions are in place before
                          authorising entry
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Signs to authorise the permit &mdash; takes personal
                          responsibility for the assessment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Must be a <strong className="text-white">competent
                          person</strong> with sufficient training, knowledge,
                          and authority
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Role 2 — Permit Holder */}
                  <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                    <p className="text-sm font-medium text-cyan-400 mb-2">
                      Permit Holder (Entrant / Team Leader)
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Receives the permit from the issuer and accepts
                          responsibility for the work
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Ensures all team members understand the permit
                          conditions and have been briefed
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Maintains precautions throughout the work &mdash;
                          monitoring, PPE, ventilation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Returns the permit for closure when the work is
                          complete
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Stops work and evacuates if conditions change or the
                          permit expires
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Role 3 — Top Person / Safety Attendant */}
                  <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                    <p className="text-sm font-medium text-cyan-400 mb-2">
                      Top Person / Safety Attendant
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Remains at the entry point for the{" "}
                          <strong className="text-white">
                            entire duration
                          </strong>{" "}
                          of the entry &mdash; must never leave the post
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Maintains continuous communication with the entrant(s)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Monitors conditions outside the space (weather, nearby
                          activities, alarms)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Raises the alarm and initiates the emergency procedure
                          if anything goes wrong
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Keeps a log of who is in the space and for how long
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Role 4 — Performing Authority */}
                  <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                    <p className="text-sm font-medium text-cyan-400 mb-2">
                      Performing Authority
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          The organisation or department responsible for carrying
                          out the work
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Ensures that the work team is competent, trained, and
                          properly equipped
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Nominates the permit holder (team leader) and confirms
                          their competence
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>
                          Takes overall responsibility for the quality and safety
                          of the work carried out
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Separation of Roles
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    The permit issuer must not be the same person as the permit
                    holder.
                  </strong>{" "}
                  The entire point of the system is that an independent,
                  competent person assesses the conditions and authorises the
                  entry. If the person doing the work also authorises the permit,
                  the independent check is lost. Similarly, the top
                  person/safety attendant must not also be an entrant &mdash;
                  they must remain outside the space at all times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Permit Lifecycle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">04</span>
            The Permit Lifecycle
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every permit-to-work follows a{" "}
                <strong>defined lifecycle</strong> from request through to
                cancellation. Each stage must be completed before the next can
                begin. Skipping stages is one of the most common causes of
                permit-related incidents.
              </p>

              {/* Diagram: Permit Lifecycle Flowchart */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-cyan-400">
                    Permit Lifecycle Flowchart
                  </p>
                </div>
                <div className="p-4">
                  <div className="flex flex-col items-center space-y-2">
                    {/* Stage 1 — Request */}
                    <div className="w-full max-w-md bg-cyan-500/15 border border-cyan-500/30 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-cyan-400">
                        1. Request
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        The performing authority / team leader requests a permit
                        for the planned work
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-cyan-500/40" />

                    {/* Stage 2 — Assessment */}
                    <div className="w-full max-w-md bg-cyan-500/15 border border-cyan-500/30 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-cyan-400">
                        2. Assessment
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        The permit issuer visits the site, assesses the hazards,
                        and determines the precautions required
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-cyan-500/40" />

                    {/* Stage 3 — Issue */}
                    <div className="w-full max-w-md bg-cyan-500/15 border border-cyan-500/30 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-cyan-400">
                        3. Issue
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        The permit issuer signs the permit, confirming
                        precautions are in place. The permit holder accepts and
                        co-signs.
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-cyan-500/40" />

                    {/* Stage 4 — Work Under Permit */}
                    <div className="w-full max-w-md bg-green-500/15 border border-green-500/30 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-green-400">
                        4. Work Under Permit
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        The work is carried out strictly within the permit
                        conditions &mdash; scope, time, precautions
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-cyan-500/40" />

                    {/* Stage 5 — Extension (conditional) */}
                    <div className="w-full max-w-md bg-yellow-500/15 border border-yellow-500/30 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-yellow-400">
                        5. Extension (If Needed)
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        If the work overruns, a formal extension is requested and
                        authorised &mdash; conditions are reassessed
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-cyan-500/40" />

                    {/* Stage 6 — Closure */}
                    <div className="w-full max-w-md bg-cyan-500/15 border border-cyan-500/30 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-cyan-400">
                        6. Closure
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Work is complete. The permit holder returns the permit.
                        All personnel have exited. The space is made safe.
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-cyan-500/40" />

                    {/* Stage 7 — Cancellation */}
                    <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-white/80">
                        7. Cancellation
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        The permit is formally cancelled, signed off, and filed
                        for audit and record-keeping purposes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Rules of the Lifecycle
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        No work without a live permit
                      </strong>{" "}
                      &mdash; work must not begin until the permit has been
                      formally issued and signed by both the issuer and the
                      holder
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Extensions must be formally authorised
                      </strong>{" "}
                      &mdash; the permit issuer must reassess conditions and
                      sign the extension; the team cannot simply continue
                      working
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Closure is mandatory
                      </strong>{" "}
                      &mdash; when the work is finished, the permit must be
                      returned and formally closed; leaving permits &ldquo;open&rdquo;
                      is a serious failure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cancellation preserves the record
                      </strong>{" "}
                      &mdash; cancelled permits are not destroyed; they are
                      filed and retained for audit purposes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Shift Handover:</strong> If
                  the work spans more than one shift, the permit must be
                  formally{" "}
                  <strong>handed over</strong> at the shift change. The outgoing
                  permit holder must brief the incoming permit holder on the
                  current status of the work, the conditions in the space, and
                  any issues encountered. The handover must be recorded on the
                  permit. Under no circumstances should a permit simply be
                  &ldquo;left on the board&rdquo; for the next shift to pick up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Cross-Referencing with Other Permits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">05</span>
            Cross-Referencing with Other Permits
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confined space work often takes place alongside other
                high-risk activities that have their own permit-to-work
                requirements. The confined space permit must be{" "}
                <strong>cross-referenced</strong> with any other active permits
                that affect the same area or the same systems. This prevents
                conflicting activities from creating additional hazards that
                neither permit anticipated.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Cross-Referenced Permits
                </p>
                <div className="space-y-4 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      HW
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Hot Work Permits
                      </p>
                      <p>
                        Welding, cutting, grinding, or any work producing
                        sparks, flame, or heat inside or near a confined space.
                        The confined space permit must reference the hot work
                        permit number and confirm that gas-free certification
                        has been obtained, fire watch arrangements are in place,
                        and flammable materials have been removed or protected.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold flex-shrink-0">
                      EI
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Electrical Isolation Permits
                      </p>
                      <p>
                        Where electrical equipment within or adjacent to the
                        confined space must be isolated before entry. The
                        confined space permit must reference the electrical
                        isolation certificate and confirm that the safe
                        isolation procedure has been completed in accordance
                        with BS 7671 and GS 38 guidance.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                      BC
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Breaking Containment Permits
                      </p>
                      <p>
                        Where pipework, vessels, or systems containing hazardous
                        substances must be opened. The confined space permit
                        must reference the breaking containment permit and
                        confirm that the system has been drained, purged, and
                        isolated before the confined space is entered.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">
                    Simultaneous Operations (SIMOPS):
                  </strong>{" "}
                  When multiple permit-controlled activities take place in the
                  same area at the same time, this is known as simultaneous
                  operations. SIMOPS require careful coordination to ensure
                  that the precautions for one activity do not conflict with
                  the precautions for another. For example, ventilation
                  requirements for the confined space entry may conflict with
                  the atmospheric controls required for hot work. A SIMOPS
                  assessment should be carried out and documented.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Cross-Reference Failures Kill
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Failure to cross-reference permits has been identified as a
                  contributing factor in numerous fatal incidents. In one
                  well-documented case, an electrical isolation was removed while
                  workers were still inside a confined space because the
                  electrical isolation permit was closed independently of the
                  confined space permit. The two permits were not cross-referenced,
                  so the person closing the isolation permit did not know that
                  people were still in the space.{" "}
                  <strong className="text-white">
                    Always check that all related permits are linked and that
                    none can be closed or cancelled independently while the
                    confined space permit is still live.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Common Permit Failures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">06</span>
            Common Permit Failures
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Permit-to-work systems fail not because the system itself is
                flawed, but because{" "}
                <strong>people do not follow the process</strong>. Investigations
                into confined space incidents repeatedly identify the same
                failures. Understanding these common pitfalls is essential for
                anyone who works under or manages a PTW system.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Most Common Permit Failures
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Permits Not Closed
                      </p>
                      <p>
                        Work is finished, but the permit is not returned or
                        formally closed. This means there is no confirmation
                        that all personnel have left the space, that temporary
                        equipment has been removed, or that the space has been
                        made safe. Open permits also make it impossible to know
                        how many active entries are taking place at any time.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Conditions Changed but Permit Not Updated
                      </p>
                      <p>
                        Conditions in or around the confined space change
                        (weather, nearby activities, atmospheric readings, equipment
                        failure) but the work continues under the original permit.
                        The permit was issued based on a specific set of
                        conditions; if those conditions no longer exist, the
                        permit is invalid.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Permits Issued Without a Site Visit
                      </p>
                      <p>
                        The permit issuer signs the permit from the office or
                        control room without visiting the confined space. They
                        have not seen the conditions, not verified that
                        precautions are in place, and not confirmed that the
                        space matches the description on the permit. This
                        defeats the purpose of the independent check.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Permits Treated as Mere Paperwork
                      </p>
                      <p>
                        The permit is treated as a tick-box exercise &mdash;
                        forms are filled in to satisfy the system, but nobody
                        genuinely engages with the process. Hazards are
                        copy-pasted from previous permits without a fresh
                        assessment. Precautions are listed but not actually
                        implemented. The permit exists on paper, but the safe
                        system of work does not exist in reality.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Inadequate Briefing of the Work Team
                      </p>
                      <p>
                        The permit holder signs the permit but does not brief
                        the rest of the team. Entrants go into the space without
                        knowing the hazards, the precautions, the time limits,
                        or the emergency procedure. If the team does not
                        understand the permit, the permit cannot protect them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Culture Matters:</strong>{" "}
                  Most permit failures are not caused by a lack of knowledge
                  &mdash; they are caused by a poor safety culture. When people
                  see permits as a bureaucratic obstacle rather than a life-saving
                  process, corners get cut. A strong permit culture means
                  everyone &mdash; from the site manager to the newest apprentice
                  &mdash; understands that the permit is there to prevent people
                  from being killed, and treats it accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Hot Work & Electrical Isolation Permits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">07</span>
            Hot Work &amp; Electrical Isolation Permits
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Two types of permit frequently interact with confined space
                permits and deserve detailed attention: hot work permits and
                electrical isolation permits. Both introduce additional hazards
                that must be carefully controlled when combined with confined
                space entry.
              </p>

              {/* Hot Work in Confined Spaces */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Hot Work in Confined Spaces &mdash; Additional Requirements
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Hot work (welding, cutting, brazing, grinding, or any
                  operation producing flame, sparks, or significant heat) inside
                  a confined space presents extreme risks. The enclosed
                  environment means that heat, fumes, and sparks have nowhere to
                  dissipate, and any flammable atmosphere can ignite
                  catastrophically. The following additional controls are
                  required:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Separate hot work permit
                      </strong>{" "}
                      cross-referenced with the confined space permit &mdash;
                      both permits must be live simultaneously
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gas-free certification
                      </strong>{" "}
                      confirming the atmosphere is below the lower explosive
                      limit (LEL) &mdash; typically less than 1% of LEL for hot
                      work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Continuous atmospheric monitoring
                      </strong>{" "}
                      throughout the hot work &mdash; conditions can change
                      rapidly when heat is applied to residues or coatings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fire watch</strong> &mdash;
                      a designated person with fire-fighting equipment stationed
                      at the entry point during and for a specified period after
                      the hot work (typically 30&ndash;60 minutes)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Removal or protection of flammable materials
                      </strong>{" "}
                      within the space and in adjacent areas where sparks could
                      travel
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Forced ventilation
                      </strong>{" "}
                      sufficient to remove welding fumes and maintain a safe
                      atmosphere &mdash; natural ventilation alone is rarely
                      adequate for hot work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Fire-fighting equipment
                      </strong>{" "}
                      immediately available at the entry point &mdash; typically
                      a CO<sub>2</sub> or dry powder extinguisher, not water
                      (which can conduct electricity or react with certain
                      substances)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Electrical Isolation Permits */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Electrical Isolation Permits &mdash; Relationship to BS 7671
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Many confined spaces contain or are adjacent to electrical
                  equipment that must be isolated before entry to prevent
                  electric shock, arc flash, or inadvertent start-up of
                  machinery. The electrical isolation permit documents that the{" "}
                  <strong className="text-white">
                    safe isolation procedure
                  </strong>{" "}
                  has been carried out in accordance with BS 7671 (the IET
                  Wiring Regulations) and HSE guidance note GS 38.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Switch off</strong> &mdash;
                      disconnect the supply at the appropriate point of
                      isolation (circuit breaker, isolator, fused switch)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lock off</strong> &mdash;
                      apply a personal safety lock to the isolation point to
                      prevent re-energisation; apply a &ldquo;Danger &mdash; Do
                      Not Switch On&rdquo; tag
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Prove dead</strong> &mdash;
                      test at the point of work using an approved voltage
                      indicator (tested before and after use with a proving
                      unit, as per GS 38)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Secure</strong> &mdash;
                      ensure the isolation cannot be defeated for the duration
                      of the work; the lock must only be removed by the person
                      who applied it (or via a formal override procedure)
                    </span>
                  </li>
                </ul>
                <div className="mt-3 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <p className="text-xs text-white/80">
                    <strong className="text-cyan-400">Cross-reference:</strong>{" "}
                    The electrical isolation permit must reference the confined
                    space permit number. The confined space permit must reference
                    the electrical isolation permit number. Neither permit can be
                    closed or cancelled independently while the other is still
                    live. This prevents the isolation from being removed while
                    people are still in the confined space.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Stored Energy
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Electrical isolation alone is not sufficient if the system
                  contains stored energy. Capacitors, batteries, UPS systems,
                  solar PV arrays (which generate voltage whenever exposed to
                  light), and back-fed supplies can all remain energised even
                  after the main supply is isolated. The electrical isolation
                  permit must address{" "}
                  <strong className="text-white">all sources of energy</strong>,
                  not just the mains supply. This is particularly critical in
                  confined spaces where the enclosed environment increases the
                  severity of any electrical incident.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Display, Accessibility, Audit & Record Keeping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">08</span>
            Display, Accessibility, Audit &amp; Record Keeping
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A permit-to-work is only effective if it is{" "}
                <strong>visible, accessible, and subject to regular audit</strong>.
                The best-written permit in the world provides no protection if
                it is hidden in a filing cabinet while the work is in progress.
              </p>

              {/* Display */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Display of the Permit
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      The permit must be{" "}
                      <strong className="text-white">
                        displayed at the point of entry
                      </strong>{" "}
                      to the confined space throughout the duration of the work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      It should be{" "}
                      <strong className="text-white">clearly visible</strong> to
                      the safety attendant, all entrants, and anyone else in the
                      area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      A weatherproof permit holder or display board should be
                      used in outdoor locations to protect the document from rain
                      and wind
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Where digital permit systems are used, the electronic
                      permit must be accessible on a tablet or display at the
                      entry point &mdash; not only on a computer in the site
                      office
                    </span>
                  </li>
                </ul>
              </div>

              {/* Accessibility */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Accessibility
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Any person involved in the work, or any person whose
                      activities could be affected by the work, must be able to
                      view the permit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      The site control room or permit office should maintain a
                      live register of all active permits, showing the location,
                      the permit holder, the time limits, and the status (live,
                      suspended, closed)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Emergency services should be able to identify active
                      confined space entries quickly in the event of a site-wide
                      emergency or evacuation
                    </span>
                  </li>
                </ul>
              </div>

              {/* Audit */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Audit of the Permit-to-Work System
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The permit-to-work system should be{" "}
                  <strong className="text-white">audited regularly</strong> to
                  confirm that it is being followed in practice, not just on
                  paper. An effective audit programme should include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Field audits (live checks)
                      </strong>{" "}
                      &mdash; visiting work sites while permits are live to
                      check that the conditions match the permit, that
                      precautions are actually in place, and that the permit is
                      displayed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Desk-based audits (record review)
                      </strong>{" "}
                      &mdash; reviewing completed permits to check that all
                      sections are filled in, closure signatures are present,
                      time limits were respected, and cross-references are
                      correct
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Trend analysis</strong>{" "}
                      &mdash; tracking common findings (e.g., permits without
                      closure signatures, late extensions, missing
                      cross-references) to identify systemic weaknesses in the
                      system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Competency checks
                      </strong>{" "}
                      &mdash; verifying that permit issuers, holders, and safety
                      attendants are trained, competent, and up to date with
                      refresher training
                    </span>
                  </li>
                </ul>
              </div>

              {/* Record Keeping */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Record Keeping
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      All completed, closed, and cancelled permits must be{" "}
                      <strong className="text-white">retained</strong> &mdash;
                      not destroyed. Best practice is a minimum of three years,
                      but many organisations retain them for longer.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Associated records &mdash; gas test results, isolation
                      certificates, risk assessments, method statements, and
                      emergency drill records &mdash; should be stored with or
                      linked to the permit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Records must be{" "}
                      <strong className="text-white">
                        readily retrievable
                      </strong>{" "}
                      for audit, investigation, or regulatory inspection. Filing
                      permits in unmarked boxes in a storage room does not
                      constitute adequate record keeping.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Digital permit systems should include{" "}
                      <strong className="text-white">
                        tamper-proof audit trails
                      </strong>{" "}
                      that record who created, modified, signed, and closed each
                      permit, with timestamps
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">
                    Why Records Matter:
                  </strong>{" "}
                  Permit records provide evidence that the organisation&rsquo;s
                  safe system of work was followed. In the event of an incident,
                  investigation, or prosecution, the permit records will be among
                  the first documents examined. Complete, accurate records
                  demonstrate due diligence. Missing or incomplete records
                  suggest that the system was not properly managed &mdash; and
                  may constitute evidence of a failure in the duty of care.
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
            <Link to="../confined-spaces-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Atmospheric Monitoring
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-3">
              Next Module: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
