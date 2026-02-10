import {
  ArrowLeft,
  HeartPulse,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  Radio,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "rescue-preference-order",
    question:
      "What is the correct order of preference for rescue from a confined space?",
    options: [
      "Self-rescue, then non-entry rescue, then entry rescue as an absolute last resort",
      "Entry rescue first because it is the most thorough, then non-entry, then self-rescue",
      "Non-entry rescue first, then self-rescue, then entry rescue",
      "Call 999 first, then attempt self-rescue, then non-entry rescue",
    ],
    correctIndex: 0,
    explanation:
      "The order of preference is always: (1) self-rescue — the entrant exits under their own power; (2) non-entry rescue — retrieval from outside the space using a winch and lifeline without anyone entering; (3) entry rescue — a trained rescue team physically enters the space. Entry rescue is the LAST resort because it places additional people at risk inside the hazardous environment. This hierarchy exists to minimise the number of people exposed to danger.",
  },
  {
    id: "cascade-effect",
    question:
      "What is the 'cascade effect' in confined space rescue, and why is it so dangerous?",
    options: [
      "A situation where untrained rescuers enter a confined space one after another and become casualties themselves — it kills more people than the original incident",
      "A type of ventilation failure that causes gas levels to rise gradually",
      "The effect of water flooding a confined space during a rescue attempt",
      "A chemical reaction triggered by the use of breathing apparatus inside a confined space",
    ],
    correctIndex: 0,
    explanation:
      "The cascade effect occurs when an untrained or unplanned rescuer enters a confined space to help a casualty, becomes overcome by the same hazard (e.g. toxic atmosphere, oxygen depletion), and then a second person enters to rescue both, who also becomes a casualty — and so on. Statistics consistently show that the cascade effect kills more people than the original confined space incident. This is precisely why UNPLANNED entry rescue must NEVER be attempted.",
  },
  {
    id: "suspension-trauma",
    question:
      "After extracting a casualty who has been suspended in a harness for a prolonged period, what position should they be placed in?",
    options: [
      "Semi-recumbent (partially upright) position — do NOT lay them flat immediately",
      "Flat on their back with legs elevated to restore blood pressure",
      "Standing upright with support to encourage circulation",
      "Prone (face down) position to aid breathing",
    ],
    correctIndex: 0,
    explanation:
      "A casualty who has been suspended in a harness for a prolonged period may be suffering from suspension trauma (orthostatic intolerance). Blood pools in the legs during suspension, and if the casualty is laid flat immediately, this pooled blood can rush back to the heart and cause cardiac arrest. The correct initial position is semi-recumbent (partially upright at approximately 30-40 degrees) while awaiting medical assistance. This is a medical emergency requiring urgent hospital treatment.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "What should I do if I see someone collapse inside a confined space and there is no rescue plan in place?",
    answer:
      "Do NOT enter the space. This is the single most important rule. Raise the alarm immediately, call 999, and attempt to communicate with the casualty from outside the space. If a lifeline is attached, attempt to retrieve the casualty using the lifeline from outside. If no lifeline is attached, provide as much information as possible to the emergency services — the location, the nature of the space, known hazards, how many people are inside, and what happened. The emergency services have specialist confined space rescue teams trained and equipped for exactly this situation. Entering without proper equipment, training, and a plan will almost certainly create additional casualties — the cascade effect.",
  },
  {
    question:
      "How often should confined space rescue plans be rehearsed?",
    answer:
      "There is no single legal frequency mandated by the Confined Spaces Regulations 1997, but the Approved Code of Practice (ACoP L101) makes clear that rescue plans must be rehearsed at sufficient intervals to ensure competence. In practice, most organisations conduct rescue rehearsals at least every 6 to 12 months, with additional rehearsals whenever there is a change to the space, the work activity, the equipment, or the rescue team members. Rehearsals should be realistic and timed, and any issues identified must be corrected before the next entry is permitted. A rescue plan that has never been rehearsed is not a rescue plan — it is a piece of paper.",
  },
  {
    question:
      "What is the difference between breathing apparatus (BA) and respiratory protective equipment (RPE)?",
    answer:
      "RPE is the broad term for any equipment designed to protect the wearer from inhaling hazardous substances. It includes filtering devices (masks with filters that clean ambient air) and breathing apparatus. Breathing apparatus (BA) is a specific type of RPE that provides clean air from an independent source — either a compressed air cylinder (self-contained BA, or SCBA) or an airline connected to a remote supply. In confined space entry rescue, BA is always required because the atmosphere inside the space cannot be relied upon — filtering devices are not suitable when the atmosphere may be oxygen-deficient or contain unknown contaminants at unknown concentrations.",
  },
  {
    question:
      "What is suspension trauma and why is it relevant to confined space rescue?",
    answer:
      "Suspension trauma (also called orthostatic intolerance or harness hang syndrome) is a life-threatening condition that occurs when a person is suspended motionless in a harness for a prolonged period. Blood pools in the legs due to gravity and the constriction of the harness straps, reducing blood return to the heart. When the casualty is rescued and laid flat, the sudden return of this pooled, oxygen-depleted blood to the heart can cause cardiac arrest. It is relevant to confined space rescue because many retrieval systems use harnesses, and a casualty may be suspended during winch extraction. After rescue, the casualty must be placed in a semi-recumbent position — never flat — and treated as a medical emergency requiring immediate hospital attention.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which method of rescue is the FIRST preference when a confined space entrant is in difficulty?",
    options: [
      "Entry rescue by a trained team",
      "Self-rescue — the entrant exits under their own power",
      "Non-entry rescue using a winch and lifeline",
      "Waiting for the emergency services to arrive",
    ],
    correctAnswer: 1,
    explanation:
      "Self-rescue is always the first preference. The entrant exits the space under their own power, triggered by an alarm, a change in conditions, or an instruction from the top person. It is the fastest method and exposes no additional people to danger. It requires a clear egress route and prior training on the exit procedure.",
  },
  {
    id: 2,
    question:
      "What is the KEY advantage of non-entry rescue over entry rescue?",
    options: [
      "Non-entry rescue is cheaper because it requires less equipment",
      "No rescuer enters the space, significantly reducing the risk to rescue personnel",
      "Non-entry rescue can be performed without any prior planning",
      "Non-entry rescue does not require the casualty to be wearing a harness",
    ],
    correctAnswer: 1,
    explanation:
      "The key advantage of non-entry rescue is that no rescuer enters the confined space. The casualty is retrieved from outside using a pre-rigged lifeline and winch system. This significantly reduces the risk to rescuers because they are never exposed to the hazardous atmosphere or other dangers inside the space. It does, however, require the entrant to be wearing a harness connected to a lifeline that was rigged before entry.",
  },
  {
    id: 3,
    question:
      "Why must entry rescue NEVER be attempted as an unplanned response?",
    options: [
      "Because entry rescue equipment is too expensive to use without authorisation",
      "Because the 'cascade effect' means unplanned rescuers become casualties themselves, often killing more people than the original incident",
      "Because entry rescue is illegal under the Confined Spaces Regulations 1997",
      "Because entry rescue always takes longer than non-entry rescue",
    ],
    correctAnswer: 1,
    explanation:
      "Unplanned entry rescue leads to the 'cascade effect' — an untrained rescuer enters the space, is overcome by the same hazard, then another person enters to help, and they too become a casualty. This chain reaction has historically killed more people than the original confined space incident. Entry rescue must only be carried out by trained teams with BA, atmospheric monitoring, their own communication system, and their own lifeline — all planned and rehearsed in advance.",
  },
  {
    id: 4,
    question:
      "What is the FIRST action if communication is lost with an entrant inside a confined space?",
    options: [
      "Wait 10 minutes to see if communication is restored",
      "Send another person into the space to check on the entrant",
      "Assume an emergency, initiate non-entry rescue attempt, and call emergency services",
      "Shut down all equipment and ventilation to reduce noise",
    ],
    correctAnswer: 2,
    explanation:
      "If communication is lost with a confined space entrant, you must assume an emergency. The communication failure protocol is: assume emergency, initiate non-entry rescue attempt (use the winch/lifeline to raise the casualty), and call emergency services. You must NEVER enter the space to check — this is exactly the scenario that leads to the cascade effect. Communication loss is treated as a potential life-threatening event until proven otherwise.",
  },
  {
    id: 5,
    question:
      "During entry rescue, which of the following does the rescue team NOT require?",
    options: [
      "Breathing apparatus (BA) or RPE",
      "Their own atmospheric monitoring equipment",
      "Permission from the original entrant before entering",
      "Their own lifeline and communication system",
    ],
    correctAnswer: 2,
    explanation:
      "An entry rescue team requires: breathing apparatus (BA) or appropriate RPE, their own atmospheric monitoring equipment, their own communication system, and their own lifeline. They do NOT need permission from the original entrant — the entrant may be unconscious, incapacitated, or unable to communicate. The rescue is authorised by the rescue plan and the emergency situation, not by the casualty.",
  },
  {
    id: 6,
    question:
      "What is the correct sequence for non-entry rescue?",
    options: [
      "Call 999 → enter the space → attach the casualty to a stretcher → extract",
      "Raise alarm → confirm emergency → attempt verbal contact → activate winch to raise casualty → extract to fresh air → commence first aid → call 999 if not already done",
      "Activate winch → call 999 → commence first aid inside the space → extract casualty",
      "Attempt verbal contact → wait 5 minutes → call 999 → attempt entry rescue",
    ],
    correctAnswer: 1,
    explanation:
      "The correct non-entry rescue sequence is: raise the alarm, confirm the emergency, attempt verbal contact with the casualty, activate the winch to raise the casualty via the pre-rigged lifeline, extract the casualty to fresh air, commence first aid, and call 999 if not already done. At no point does anyone enter the space during non-entry rescue — the entire retrieval is performed from outside using the winch and lifeline system.",
  },
  {
    id: 7,
    question:
      "After extracting a casualty from a confined space, what are the first aid priorities?",
    options: [
      "Immediately move the casualty to hospital by private vehicle",
      "ABC (airway, breathing, circulation), CPR if needed, recovery position if breathing, supplemental oxygen if available",
      "Remove all clothing and begin decontamination before any first aid",
      "Wait for the paramedics to arrive before touching the casualty",
    ],
    correctAnswer: 1,
    explanation:
      "After extraction, the immediate first aid priorities follow the ABC approach: check and clear the Airway, assess Breathing, and check Circulation. If the casualty is not breathing, begin CPR immediately. If breathing, place in the recovery position. Provide supplemental oxygen if available. If the casualty has been suspended in a harness, place in a semi-recumbent position due to the risk of suspension trauma. Call 999 if not already done.",
  },
  {
    id: 8,
    question:
      "What post-rescue action is essential if the casualty was exposed to chemicals inside the confined space?",
    options: [
      "No special action is needed once the casualty is out of the space",
      "Decontamination of the casualty, and notification to the hospital of the specific hazards involved",
      "The casualty should shower with cold water only",
      "Chemical exposure does not require hospital notification",
    ],
    correctAnswer: 1,
    explanation:
      "If the casualty was exposed to chemicals inside the confined space, decontamination must be carried out as soon as safely possible after extraction. The receiving hospital must be notified of the specific chemicals or hazards involved so they can prepare appropriate treatment. The scene should also be preserved for investigation. Failure to notify the hospital of the specific hazard can delay or misdirect treatment, potentially worsening the casualty's outcome.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const ConfinedSpacesModule5Section3 = () => {
  useSEO({
    title:
      "Casualty Retrieval | Confined Spaces Module 5 Section 3",
    description:
      "Learn the rescue preference hierarchy for confined spaces — self-rescue, non-entry rescue, and entry rescue — including the cascade effect, communication failure protocols, first aid priorities, and suspension trauma management.",
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
            <Link to="../confined-spaces-module-5">
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
          <HeartPulse className="h-10 w-10 text-cyan-500 mx-auto mb-4" />
          <span className="inline-block bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 5 &middot; SECTION 3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Casualty Retrieval
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding the rescue preference hierarchy, non-entry and entry
            rescue procedures, communication failure protocols, first aid
            priorities after extraction, and the dangers of unplanned rescue
          </p>
        </div>

        {/* ─── Learning Outcomes ─── */}
        <section className="mb-10">
          <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 sm:p-5 rounded-lg">
            <h2 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Learning Outcomes
            </h2>
            <p className="text-white/70 text-sm mb-3">
              By the end of this section you should be able to:
            </p>
            <ul className="text-white space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>
                  Explain the three types of confined space rescue in the
                  correct order of preference
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>
                  Describe the cascade effect and explain why unplanned entry
                  rescue must never be attempted
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>
                  Outline the communication failure protocol and immediate
                  response actions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>
                  State the correct rescue sequences for both non-entry and
                  entry rescue
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>
                  Describe the first aid priorities after casualty extraction,
                  including suspension trauma management
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>
                  Identify the post-rescue actions required, including
                  decontamination and scene preservation
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── 01 Types of Rescue — The Preference Hierarchy ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Types of Rescue &mdash; The Preference Hierarchy
          </h2>
          <div className="space-y-4 text-white">
            <p>
              When an emergency occurs inside a confined space, there are three
              types of rescue that can be attempted. They must{" "}
              <strong>always be considered in a strict order of preference</strong>,
              from lowest risk to highest risk. The overriding principle is to
              minimise the number of people exposed to the hazard.
            </p>

            {/* Rescue Priority Hierarchy Diagram */}
            <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-lg">
              <h3 className="text-cyan-400 font-medium mb-2 text-center text-sm uppercase tracking-wider">
                Rescue Priority Hierarchy
              </h3>
              <p className="text-white/50 text-xs text-center mb-5">
                Always work from top to bottom &mdash; only move to the next
                level if the previous option is not possible
              </p>

              <div className="space-y-0">
                {/* Priority 1 — Self-Rescue */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-green-500/20 border-2 border-green-500/60 flex items-center justify-center text-green-400 text-sm font-bold flex-shrink-0">
                      1st
                    </div>
                    <div className="w-0.5 h-10 bg-gradient-to-b from-green-500/50 to-amber-500/50"></div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4 flex-1 mb-2">
                    <p className="font-semibold text-base text-green-400 mb-1">
                      Self-Rescue
                    </p>
                    <p className="text-white/80 text-sm">
                      Entrant exits under their own power. <strong>Fastest method</strong>,
                      lowest risk. Triggered by alarm, change in conditions, or
                      instruction from the top person. Requires a clear egress
                      route and prior training.
                    </p>
                    <div className="mt-2 text-xs text-green-300/80 bg-green-500/10 rounded px-2 py-1 inline-block">
                      Risk to rescuers: NONE
                    </div>
                  </div>
                </div>

                {/* Priority 2 — Non-Entry Rescue */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-amber-500/20 border-2 border-amber-500/60 flex items-center justify-center text-amber-400 text-sm font-bold flex-shrink-0">
                      2nd
                    </div>
                    <div className="w-0.5 h-10 bg-gradient-to-b from-amber-500/50 to-red-500/50"></div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 sm:p-4 flex-1 mb-2">
                    <p className="font-semibold text-base text-amber-400 mb-1">
                      Non-Entry Rescue
                    </p>
                    <p className="text-white/80 text-sm">
                      Retrieval from outside using a winch and lifeline. <strong>No
                      rescuer enters the space</strong>. Significantly reduces risk to
                      rescuers. Requires a pre-rigged lifeline and harness
                      attached before entry.
                    </p>
                    <div className="mt-2 text-xs text-amber-300/80 bg-amber-500/10 rounded px-2 py-1 inline-block">
                      Risk to rescuers: LOW
                    </div>
                  </div>
                </div>

                {/* Priority 3 — Entry Rescue */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-red-500/20 border-2 border-red-500/60 flex items-center justify-center text-red-400 text-sm font-bold flex-shrink-0">
                      3rd
                    </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4 flex-1">
                    <p className="font-semibold text-base text-red-400 mb-1">
                      Entry Rescue &mdash; LAST RESORT
                    </p>
                    <p className="text-white/80 text-sm">
                      A trained rescue team physically enters the space. <strong>Highest
                      risk</strong>. Requires BA/RPE, own atmospheric monitoring,
                      own communication system, and own lifeline. Must be planned and
                      rehearsed in advance.
                    </p>
                    <div className="mt-2 text-xs text-red-300/80 bg-red-500/10 rounded px-2 py-1 inline-block">
                      Risk to rescuers: HIGH
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <ShieldAlert className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-red-300">
                  Critical Rule: NEVER Attempt Unplanned Entry Rescue
                </h3>
              </div>
              <p className="text-white/80 text-sm">
                The <strong className="text-white">&ldquo;cascade effect&rdquo;</strong>{" "}
                occurs when an untrained person enters a confined space to rescue
                a casualty, becomes overcome by the same hazard, and then another
                person enters to rescue both &mdash; creating a chain of
                casualties. <strong className="text-white">The cascade effect
                kills more people than the original incident.</strong> This is
                why unplanned entry rescue must NEVER be attempted under any
                circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 02 Self-Rescue ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">02</span>
              Self-Rescue
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Self-rescue is the <strong>preferred method</strong> because it
                is the fastest and does not expose any additional personnel to
                the hazards inside the space. The entrant recognises a problem
                and exits the space under their own power before the situation
                deteriorates further.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  When Self-Rescue Is Triggered
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Atmospheric alarm:</strong> the gas monitor alarm
                      sounds, indicating oxygen depletion, toxic gas, or
                      flammable gas above safe limits
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Instruction from the top person:</strong> the
                      attendant outside the space orders the entrant to exit
                      immediately due to a change in conditions
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Entrant feels unwell:</strong> dizziness,
                      headache, nausea, breathlessness, or any unusual symptoms
                      &mdash; the entrant must exit immediately and report
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Equipment failure:</strong> ventilation failure,
                      lighting failure, BA malfunction, or communication
                      breakdown
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-cyan-300">
                    Requirements for Effective Self-Rescue
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Self-rescue is only effective if the entrant has a{" "}
                  <strong className="text-white">clear egress route</strong>{" "}
                  that has been confirmed before entry, has received{" "}
                  <strong className="text-white">training on the exit
                  procedure</strong> specific to that space, is{" "}
                  <strong className="text-white">physically capable</strong> of
                  exiting (e.g. can climb a ladder while wearing PPE), and the{" "}
                  <strong className="text-white">exit is not blocked</strong> by
                  equipment, materials, or other personnel. If any of these
                  conditions are not met, the rescue plan must default to
                  non-entry rescue.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Non-Entry Rescue ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">03</span>
              Non-Entry Rescue
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Non-entry rescue is the <strong>second preference</strong> and
                the primary planned rescue method for most vertical confined
                spaces. The casualty is retrieved from outside the space using a
                pre-rigged lifeline and winch system, meaning{" "}
                <strong>no rescuer enters the space at any point</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  Non-Entry Rescue Sequence
                </h3>
                <div className="space-y-0">
                  {[
                    { step: "1", label: "Raise the alarm", detail: "Alert all personnel and activate the emergency response" },
                    { step: "2", label: "Confirm the emergency", detail: "Verify that a genuine emergency exists — do not assume a false alarm" },
                    { step: "3", label: "Attempt verbal contact", detail: "Call to the casualty by name, ask them to respond — assess level of consciousness" },
                    { step: "4", label: "Activate the winch", detail: "Begin raising the casualty via the pre-rigged lifeline — operate smoothly and steadily" },
                    { step: "5", label: "Extract to fresh air", detail: "Bring the casualty completely clear of the confined space into fresh air" },
                    { step: "6", label: "Commence first aid", detail: "Follow ABC priorities — airway, breathing, circulation — begin CPR if required" },
                    { step: "7", label: "Call 999 if not already done", detail: "Request ambulance and provide full details of the incident and hazards involved" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 sm:gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 text-xs font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        {idx < 6 && (
                          <div className="w-0.5 h-6 bg-cyan-500/30"></div>
                        )}
                      </div>
                      <div className="flex-1 mb-2">
                        <p className="text-cyan-300 font-medium text-sm">
                          {item.label}
                        </p>
                        <p className="text-white/60 text-xs mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">
                    Pre-Rigging Is Essential
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Non-entry rescue is only possible if the entrant was{" "}
                  <strong className="text-white">wearing a harness connected
                  to a lifeline</strong> before they entered the space, and the
                  lifeline is attached to a winch or manual hauling device at
                  the entry point. If this was not done before entry, non-entry
                  rescue cannot be performed, and the situation may require
                  entry rescue &mdash; a far more dangerous option. This is
                  why the Confined Spaces Regulations require rescue
                  arrangements to be in place <strong className="text-white">
                  before any entry</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Entry Rescue — Last Resort ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">04</span>
              Entry Rescue &mdash; Last Resort
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Entry rescue means a trained rescue team{" "}
                <strong>physically enters the confined space</strong> to reach
                the casualty. It carries the{" "}
                <strong>highest risk of any rescue method</strong> because it
                places additional people inside the hazardous environment. It
                must only be used when self-rescue and non-entry rescue are
                impossible.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-lg p-3 sm:p-4 bg-red-500/10 border-l-2 border-l-red-500/50 border border-red-500/30">
                  <p className="font-semibold text-base text-red-400 mb-2">
                    What the Rescue Team Must Have
                  </p>
                  <ul className="text-base text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Breathing apparatus (BA) or RPE</strong> &mdash;
                        the atmosphere inside the space cannot be relied upon
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Own atmospheric monitoring</strong> &mdash; the
                        rescuer needs real-time data on the conditions they are
                        entering
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Own communication system</strong> &mdash;
                        two-way contact with personnel outside the space at all
                        times
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Own lifeline</strong> &mdash; so the rescuer can
                        also be retrieved if they become incapacitated
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-cyan-500/10 border-l-2 border-l-cyan-500/50 border border-cyan-500/30">
                  <p className="font-semibold text-base text-cyan-400 mb-2">
                    Entry Rescue Sequence
                  </p>
                  <ul className="text-base text-white space-y-1.5 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-xs mt-0.5 flex-shrink-0">1.</span>
                      <span>Raise alarm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-xs mt-0.5 flex-shrink-0">2.</span>
                      <span>Call 999</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-xs mt-0.5 flex-shrink-0">3.</span>
                      <span>Don BA and harness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-xs mt-0.5 flex-shrink-0">4.</span>
                      <span>Enter with lifeline and monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-xs mt-0.5 flex-shrink-0">5.</span>
                      <span>Assess casualty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-xs mt-0.5 flex-shrink-0">6.</span>
                      <span>Secure to stretcher or harness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-xs mt-0.5 flex-shrink-0">7.</span>
                      <span>Signal for extraction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-xs mt-0.5 flex-shrink-0">8.</span>
                      <span>Extract casualty, then extract rescuer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-xs mt-0.5 flex-shrink-0">9.</span>
                      <span>Commence/continue first aid</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Entry Rescue Must Be Planned and Rehearsed
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Entry rescue must <strong className="text-white">never</strong>{" "}
                  be improvised. It must be part of the pre-entry rescue plan,
                  the rescue team must be trained and competent, and the
                  procedure must have been rehearsed. An unplanned entry rescue
                  is the single most dangerous action that can be taken during
                  a confined space emergency &mdash; it is the direct cause of
                  the cascade effect.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── Non-Entry vs Entry Rescue Comparison Diagram ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Radio className="h-5 w-5 text-cyan-400" />
            Non-Entry vs Entry Rescue Comparison
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            The diagram below compares non-entry and entry rescue across key
            factors. Non-entry rescue is almost always preferable where it is
            feasible.
          </p>

          <div className="overflow-x-auto">
            <div className="min-w-[320px]">
              {/* Header Row */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                    Factor
                  </p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    Non-Entry Rescue
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider">
                    Entry Rescue
                  </p>
                </div>
              </div>

              {/* Data Rows */}
              {[
                {
                  factor: "Risk to rescuers",
                  nonEntry: "Low — no one enters the space",
                  entry: "High — rescuers enter the hazardous environment",
                },
                {
                  factor: "Speed",
                  nonEntry: "Fast — immediate winch activation",
                  entry: "Slow — donning BA, entering, assessing, extracting",
                },
                {
                  factor: "Equipment needed",
                  nonEntry: "Pre-rigged lifeline, harness, winch/tripod",
                  entry: "BA, monitoring, comms, lifeline, stretcher",
                },
                {
                  factor: "Training required",
                  nonEntry: "Winch operation, first aid",
                  entry: "BA use, confined space entry, casualty handling",
                },
                {
                  factor: "Pre-conditions",
                  nonEntry: "Harness and lifeline rigged before entry",
                  entry: "Full rescue plan rehearsed, team on standby",
                },
                {
                  factor: "When used",
                  nonEntry: "When entrant cannot self-rescue but lifeline is attached",
                  entry: "LAST RESORT — when self-rescue and non-entry are impossible",
                },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 mb-1.5">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                    <p className="text-white font-medium text-xs">
                      {row.factor}
                    </p>
                  </div>
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-2.5">
                    <p className="text-white/80 text-xs">{row.nonEntry}</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-2.5">
                    <p className="text-white/80 text-xs">{row.entry}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/50 text-xs text-center mt-4 italic">
            Non-entry rescue compared with entry rescue across key operational
            factors
          </p>
        </section>

        {/* ─── 05 Communication Failure Protocol ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Communication Failure Protocol
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Continuous communication between the entrant and the attendant
                outside the space is a critical safety control. If that
                communication is lost, it must be treated as a{" "}
                <strong>potential life-threatening emergency</strong> until
                proven otherwise.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    If Contact Is Lost &mdash; Assume Emergency
                  </h3>
                </div>
                <div className="space-y-3 text-sm mt-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <strong>Assume an emergency</strong> &mdash; do not wait
                      to see if contact is restored. The entrant may be
                      unconscious, injured, or in a toxic atmosphere.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <strong>Initiate non-entry rescue attempt</strong>{" "}
                      &mdash; if a lifeline is attached, activate the winch to
                      begin raising the casualty.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <strong>Call emergency services (999)</strong> &mdash;
                      provide full details of the space, hazards, number of
                      personnel, and what has happened.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-cyan-300">
                    Never Enter to &ldquo;Check&rdquo;
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Do <strong className="text-white">NOT</strong> enter the
                  space to check on the entrant. This is the exact scenario
                  that triggers the cascade effect. The communication loss may
                  be caused by the same hazard that has incapacitated the
                  entrant &mdash; entering without BA, monitoring, and a plan
                  will result in a second casualty. Use the lifeline and winch
                  from outside.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 First Aid After Extraction ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">06</span>
              First Aid After Extraction
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Once the casualty has been extracted from the confined space
                and is in fresh air, immediate first aid must be commenced. The
                priorities follow the <strong>ABC approach</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  ABC First Aid Priorities
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 text-sm font-bold flex-shrink-0">
                      A
                    </div>
                    <div>
                      <strong>Airway:</strong> check the airway is clear.
                      Remove any obstructions. Tilt the head back and lift the
                      chin to open the airway.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 text-sm font-bold flex-shrink-0">
                      B
                    </div>
                    <div>
                      <strong>Breathing:</strong> look, listen, and feel for
                      breathing. If not breathing, begin CPR immediately
                      (30 compressions to 2 rescue breaths).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 text-sm font-bold flex-shrink-0">
                      C
                    </div>
                    <div>
                      <strong>Circulation:</strong> check for signs of
                      circulation. Control any bleeding. Treat for shock if
                      necessary.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  Additional First Aid Actions
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <div>
                      If the casualty is <strong>breathing but
                      unconscious</strong>, place them in the{" "}
                      <strong>recovery position</strong> to keep the airway open
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <div>
                      Provide <strong>supplemental oxygen</strong> if available
                      and trained to do so &mdash; particularly important after
                      oxygen-deficient atmosphere exposure
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Continue CPR</strong> without stopping until the
                      casualty begins breathing, emergency services arrive, or
                      you are physically unable to continue
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Call 999</strong> if not already done &mdash;
                      inform the ambulance service of the specific hazards
                      involved (toxic gas, oxygen depletion, chemical exposure)
                    </div>
                  </div>
                </div>
              </div>

              {/* Suspension Trauma */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Suspension Trauma &mdash; Critical Warning
                  </h3>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  If the casualty has been <strong className="text-white">
                  suspended in a harness for a prolonged period</strong>, they
                  may be suffering from <strong className="text-white">
                  suspension trauma</strong> (orthostatic intolerance). Blood
                  pools in the legs during suspension. If the casualty is laid
                  flat immediately after rescue, this pooled blood can rush
                  back to the heart and cause <strong className="text-white">
                  cardiac arrest</strong>.
                </p>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-2">
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong>Do NOT lay the casualty flat
                        immediately</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Place in a <strong>semi-recumbent position</strong>{" "}
                        (partially upright, approximately 30&ndash;40 degrees)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        This is a <strong>medical emergency</strong> &mdash;
                        call 999 immediately and inform paramedics of the
                        duration of suspension
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        The casualty requires <strong>urgent hospital
                        treatment</strong> even if they appear alert
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 07 Post-Rescue Actions ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">07</span>
              Post-Rescue Actions
            </h2>
            <div className="space-y-4 text-white">
              <p>
                After the casualty has been extracted and first aid is underway,
                several important actions must be taken to protect the
                casualty&apos;s ongoing medical care and support any subsequent
                investigation.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-cyan-400 font-semibold mb-1">
                        Decontamination
                      </h3>
                      <p className="text-white/80 text-sm">
                        If the casualty was exposed to <strong>chemicals,
                        biological agents, or other contaminants</strong> inside
                        the confined space, decontamination must be carried out
                        as soon as safely possible after extraction. Remove
                        contaminated clothing and flush affected skin with clean
                        water. Decontamination procedures should have been
                        specified in the rescue plan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-cyan-400 font-semibold mb-1">
                        Hospital Notification
                      </h3>
                      <p className="text-white/80 text-sm">
                        The receiving hospital must be{" "}
                        <strong>notified of the specific hazards</strong>{" "}
                        involved. This includes the type of gas, chemical, or
                        substance the casualty was exposed to, the duration of
                        exposure, whether oxygen depletion was a factor, and
                        whether the casualty was suspended in a harness. This
                        information is critical for the hospital to prepare the
                        correct treatment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-cyan-400 font-semibold mb-1">
                        Scene Preservation
                      </h3>
                      <p className="text-white/80 text-sm">
                        The confined space and the surrounding area must be{" "}
                        <strong>preserved for investigation</strong>. Do not
                        enter the space to &ldquo;tidy up&rdquo; or retrieve
                        equipment. Cordon off the area and prevent access until
                        the investigation team (which may include the HSE) has
                        completed their work. Atmospheric monitoring data, permit
                        to work documentation, and communication logs should all
                        be secured as evidence.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-cyan-400 font-semibold mb-1">
                        Welfare of Rescue Personnel
                      </h3>
                      <p className="text-white/80 text-sm">
                        Rescuers and witnesses may be{" "}
                        <strong>psychologically affected</strong> by the
                        incident. Ensure that all personnel involved are offered
                        support, debriefing, and access to occupational health
                        or counselling services. Do not overlook the wellbeing
                        of those who performed the rescue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The rescue preference order is always:{" "}
                      <strong>self-rescue first</strong>, then non-entry rescue,
                      then entry rescue as an absolute last resort. This
                      hierarchy minimises the number of people exposed to
                      danger.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>NEVER attempt unplanned entry rescue.</strong> The
                      cascade effect &mdash; where untrained rescuers become
                      casualties &mdash; kills more people than the original
                      incident.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Non-entry rescue requires a{" "}
                      <strong>pre-rigged lifeline and harness</strong> attached
                      before entry. If this is not in place, non-entry rescue
                      is not possible.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Entry rescue teams need{" "}
                      <strong>BA, atmospheric monitoring, communication,
                      and their own lifeline</strong>. The rescue must be
                      planned and rehearsed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      If communication is lost, <strong>assume an
                      emergency</strong>, initiate non-entry rescue, and call
                      999. Never enter to &ldquo;check&rdquo;.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      First aid follows <strong>ABC priorities</strong>. For
                      harness-suspended casualties, use a{" "}
                      <strong>semi-recumbent position</strong> to avoid
                      suspension trauma.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Post-rescue: <strong>decontaminate</strong> if chemicals
                      were involved, <strong>notify the hospital</strong> of
                      specific hazards, and{" "}
                      <strong>preserve the scene</strong> for investigation.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-cyan-400/80 text-sm font-normal">09</span>
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
            title="Casualty Retrieval Quiz"
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
            <Link to="../confined-spaces-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Rescue Equipment &amp; Techniques
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-5-section-4">
              Next: Incident Reporting &amp; Lessons Learned
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default ConfinedSpacesModule5Section3;
