import {
  ArrowLeft,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Shield,
  Radio,
  Clock,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "top-person-enter",
    question:
      "The entrant inside a confined space calls for help over the radio. As the top person (safety attendant), what is the ONE thing you must NEVER do?",
    options: [
      "Summon the rescue team immediately",
      "Enter the confined space yourself to assist",
      "Maintain communication with the entrant",
      "Activate the site emergency alarm",
    ],
    correctIndex: 1,
    explanation:
      "The top person must NEVER enter the confined space under any circumstances. History shows that a large proportion of confined-space fatalities are would-be rescuers who entered without the correct equipment and training. The top person's role is to remain at the entry point, maintain communication, and summon the pre-arranged rescue team. Entering the space creates a second casualty and removes the only person coordinating the emergency response from outside.",
  },
  {
    id: "communication-loss",
    question:
      "During a confined-space entry, the top person loses all communication with the entrant. What should happen next?",
    options: [
      "Wait five minutes to see if communication is restored",
      "Send another worker in to check on the entrant",
      "Treat the loss of communication as an emergency and initiate the rescue plan",
      "Shout into the entry point and listen for a response",
    ],
    correctIndex: 2,
    explanation:
      "Loss of communication with a confined-space entrant must always be treated as an emergency. There is no safe waiting period. The top person must immediately initiate the emergency rescue plan, summon the rescue team, and alert emergency services. The entrant may have been overcome by a sudden change in atmosphere, suffered an injury, or collapsed. Delay in these situations costs lives. The agreed protocol must be clear before entry begins: loss of communication equals emergency.",
  },
  {
    id: "gas-monitor-alarm",
    question:
      "A personal gas monitor worn by an entrant inside a confined space triggers a low-oxygen alarm. What is the correct immediate action?",
    options: [
      "Investigate the source of the low oxygen reading",
      "Increase the ventilation fan speed and continue working",
      "Evacuate the space immediately without delay",
      "Switch to a backup gas monitor and verify the reading",
    ],
    correctIndex: 2,
    explanation:
      "When a personal gas monitor alarms inside a confined space, the correct action is immediate evacuation. There is no investigation, no verification, and no attempt to resolve the situation from inside the space. The alarm means the atmosphere has become (or is becoming) dangerous. Oxygen depletion can cause unconsciousness in seconds. The entrant must exit via the pre-planned route immediately, and the top person must be informed. Only after evacuation should the cause be investigated from a safe position outside the space.",
  },
];

const faqs = [
  {
    question:
      "Can the top person perform other tasks while monitoring the confined space?",
    answer:
      "No. The top person must have no other duties while acting as the safety attendant. Their sole responsibility is to monitor the entrant, maintain communication, control access to the space, and be ready to summon help instantly. If they are distracted by other tasks, they may miss a communication check, fail to notice an alarm, or be away from the entry point when an emergency occurs. If staffing is limited, the work must be rescheduled until a dedicated top person is available. This is a non-negotiable requirement under the Confined Spaces Regulations 1997.",
  },
  {
    question:
      "How are time limits for confined-space work determined?",
    answer:
      "Time limits are set during the risk assessment and depend on several factors: the duration of the breathing apparatus air supply (if BA is being used), the potential for heat stress (confined spaces can become extremely hot, especially with mechanical work), the physical demands of the task and the resulting fatigue, any chemical exposure limits, and the overall complexity of the work. Time limits must be agreed before entry and recorded on the permit to work. The top person is responsible for enforcing the time limit. When the agreed time expires, the entrant must exit regardless of whether the task is complete. Exceeding time limits is a serious breach of the safe system of work.",
  },
  {
    question:
      "What happens if conditions change inside the space during work?",
    answer:
      "Any change in conditions inside a confined space is grounds for immediate evacuation. This includes unexpected noises or vibrations (which may indicate nearby plant starting up or structural movement), water ingress or flooding, a sudden change in temperature, visible fumes or mist, an unusual smell, or any change detected by the atmospheric monitor. The entrant must not attempt to investigate the change from inside the space. After evacuation, the situation must be assessed from outside, the risk assessment must be reviewed, and re-entry is only permitted once the cause has been identified and addressed.",
  },
  {
    question:
      "Is a fire watch always required for hot work in a confined space?",
    answer:
      "Yes. Hot work in a confined space always requires a dedicated fire watch in addition to all other confined-space precautions. The fire watch must remain in position during the hot work and for a period after it has finished (typically 30 to 60 minutes) to detect any smouldering or delayed ignition. A suitable fire extinguisher must be immediately available at the entry point. The confined space must have a gas-free certificate confirming the atmosphere is free from flammable gases and vapours before any hot work begins, and continuous atmospheric monitoring must be maintained throughout. Hot work inside a confined space requires its own specific permit in addition to the confined-space entry permit.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the PRIMARY role of the top person (safety attendant) during a confined-space entry?",
    options: [
      "To pass tools and materials to the entrant",
      "To remain at the entry point, maintain communication, and summon help if needed",
      "To monitor atmospheric conditions using a handheld detector from inside the space",
      "To supervise other workers on site while keeping an eye on the entry point",
    ],
    correctAnswer: 1,
    explanation:
      "The top person's primary role is to remain at the entry point at all times, maintain continuous communication with the entrant, control access to the space, and be ready to summon help immediately if an emergency arises. They must not enter the space, perform other tasks, or leave the entry point for any reason while the entrant is inside.",
  },
  {
    id: 2,
    question:
      "What is the MINIMUM frequency for communication check-ins between the top person and the entrant?",
    options: [
      "Every 2 minutes",
      "Every 5 minutes",
      "Every 10 minutes",
      "Every 15 minutes",
    ],
    correctAnswer: 1,
    explanation:
      "Communication check-ins between the top person and the entrant must occur at least every 5 minutes. More frequent check-ins may be required depending on the risk assessment, the nature of the work, and the conditions inside the space. The interval must be agreed before entry and recorded on the permit. If a check-in is missed, it must be treated as a loss of communication and the emergency procedure initiated.",
  },
  {
    id: 3,
    question:
      "Which of the following is the correct response when a personal gas monitor alarms inside a confined space?",
    options: [
      "Increase ventilation and continue working",
      "Evacuate the space immediately",
      "Reset the monitor and check the reading again",
      "Move to a different area within the space",
    ],
    correctAnswer: 1,
    explanation:
      "The only correct response to a gas monitor alarm inside a confined space is immediate evacuation. There is no safe option to investigate, reset, or relocate within the space. Atmospheric conditions can deteriorate within seconds, and the alarm exists specifically to give the entrant time to exit before the atmosphere becomes immediately dangerous to life. Once outside, the cause can be investigated safely.",
  },
  {
    id: 4,
    question:
      "What additional permit is required BEFORE performing hot work inside a confined space?",
    options: [
      "A COSHH assessment only",
      "A hot work permit with a gas-free certificate",
      "A general work permit signed by the site manager",
      "No additional permit is needed if the entry permit is in place",
    ],
    correctAnswer: 1,
    explanation:
      "Hot work in a confined space requires a specific hot work permit AND a gas-free certificate in addition to the confined-space entry permit. The gas-free certificate confirms that the atmosphere has been tested and is free from flammable gases and vapours. Additional precautions include a dedicated fire watch, a fire extinguisher at the entry point, additional ventilation, and continuous atmospheric monitoring throughout the hot work.",
  },
  {
    id: 5,
    question:
      "Why is work rotation used during confined-space operations?",
    options: [
      "To give all team members experience of working inside the space",
      "To manage exposure, fatigue, and heat stress by swapping entrants at regular intervals",
      "To reduce the number of permits required",
      "To allow the top person to enter the space on a rotating basis",
    ],
    correctAnswer: 1,
    explanation:
      "Work rotation is used to manage the physical demands of working in confined spaces. Entrants are swapped at regular intervals to prevent excessive fatigue, heat stress, and prolonged exposure to any residual hazards. A fresh, alert entrant is safer and more productive than one who has been working in a restricted, potentially hot environment for an extended period. The rotation schedule must be agreed before entry and recorded.",
  },
  {
    id: 6,
    question:
      "During a shift handover on a confined-space operation, which of the following is ESSENTIAL?",
    options: [
      "The incoming shift can rely on the original atmospheric test from the start of the job",
      "Fresh atmospheric testing must be carried out and a full briefing given to the incoming team",
      "Only the top person needs to be briefed; the entrants can continue as before",
      "The handover can be done verbally without updating any records",
    ],
    correctAnswer: 1,
    explanation:
      "A shift handover on a confined-space operation requires fresh atmospheric testing (conditions may have changed), a full briefing for the incoming team covering all current conditions, hazards, and progress, and updated records including the personnel log. The incoming team must not rely on earlier atmospheric tests. The permit to work should be reviewed and revalidated. Every person on the incoming team must understand the emergency plan.",
  },
  {
    id: 7,
    question:
      "Which of the following is NOT a condition for immediate evacuation from a confined space?",
    options: [
      "The personal gas monitor triggers an alarm",
      "The entrant has completed half of the planned task",
      "Communication with the top person is lost",
      "The top person instructs the entrant to evacuate",
    ],
    correctAnswer: 1,
    explanation:
      "Completing half of the planned task is not a reason for evacuation. Conditions for immediate evacuation include: gas monitor alarm, loss of communication, any change in conditions (noise, vibration, flooding, temperature change), illness or injury to the entrant, and instruction from the top person. The entrant must evacuate without question when any of these conditions occur.",
  },
  {
    id: 8,
    question:
      "What record-keeping must be maintained DURING a confined-space entry?",
    options: [
      "Only the initial permit to work needs to be on record",
      "Atmospheric monitoring readings and a personnel log recording who is in the space and when",
      "Only the names of the workers on site that day",
      "Records are only required after the work is completed",
    ],
    correctAnswer: 1,
    explanation:
      "During a confined-space entry, two critical records must be maintained in real time: continuous atmospheric monitoring readings (showing oxygen, flammable gas, and toxic gas levels throughout the entry) and a personnel log recording the name of every person who enters and exits the space, along with the exact times. These records provide an audit trail, support the emergency response (you must know who is inside), and demonstrate compliance with the safe system of work.",
  },
];

export default function ConfinedSpacesModule4Section3() {
  useSEO({
    title:
      "Working Inside Confined Spaces | Confined Spaces Module 4.3",
    description:
      "Top person duties, communication protocols, continuous atmospheric monitoring, time limits, work rotation, hot work, material transfer, record keeping, shift handover, and conditions for immediate evacuation.",
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
            <Link to="../confined-spaces-module-4">
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
            <Wrench className="h-7 w-7 text-cyan-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Working Inside Confined Spaces
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The top person&rsquo;s critical role, communication protocols,
            continuous atmospheric monitoring, time limits, work rotation, hot
            work requirements, and conditions for immediate evacuation
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
                <strong>Top person:</strong> Must remain at the entry point at
                all times &mdash; no other duties
              </li>
              <li>
                <strong>Communication:</strong> Check-ins at least every 5
                minutes using agreed signals
              </li>
              <li>
                <strong>Gas monitor alarm:</strong> Evacuate immediately
                &mdash; no investigation inside the space
              </li>
              <li>
                <strong>Time limits:</strong> Agreed before entry, enforced by
                the top person
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Never:</strong> Enter the space as the top person
                &mdash; summon rescue instead
              </li>
              <li>
                <strong>Always:</strong> Treat loss of communication as an
                emergency
              </li>
              <li>
                <strong>Never:</strong> Exceed the agreed time limit, even if
                the task is unfinished
              </li>
              <li>
                <strong>Always:</strong> Record who is in the space and when
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the critical role and duties of the top person (safety attendant)",
              "Explain communication protocols including check-in frequency and agreed signals",
              "State the correct response to a gas monitor alarm and loss of communication",
              "Explain how time limits and work rotation protect entrants",
              "Describe the additional requirements for hot work inside confined spaces",
              "List the conditions that require immediate evacuation from a confined space",
              "Explain the record-keeping requirements during confined-space entry",
              "Describe the handover procedure between shifts on a confined-space operation",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-cyan-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/* Section 01: The Top Person (Safety Attendant) */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">01</span>
            The Top Person (Safety Attendant)
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The top person &mdash; also called the safety attendant, standby
                person, or banksman &mdash; is arguably the{" "}
                <strong>most critical role</strong> in any confined-space
                operation. While the entrant performs the work inside the space,
                the top person is the entrant&rsquo;s lifeline to the outside
                world. If something goes wrong, the top person is the person who
                detects it first and summons help.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Number-One Rule
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The top person must{" "}
                  <strong className="text-white">
                    NEVER enter the confined space
                  </strong>
                  . This rule exists because a significant proportion of
                  confined-space fatalities are would-be rescuers who entered
                  without proper equipment. If the top person enters the space
                  and is also overcome, there is no one left to raise the alarm.
                  The result is multiple fatalities instead of a coordinated
                  rescue.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <Shield className="h-4 w-4 inline-block mr-2 -mt-0.5 text-cyan-400" />
                  Top Person Duties
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Remain at the entry point at all times:
                      </strong>{" "}
                      The top person must not leave the entry point for any
                      reason while someone is inside the space. If they need to
                      leave, the entrant must exit first.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Maintain continuous communication:
                      </strong>{" "}
                      Regular check-ins with the entrant at the agreed interval
                      (minimum every 5 minutes). This confirms the entrant is
                      conscious, alert, and not in distress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Monitor the atmosphere from outside:
                      </strong>{" "}
                      The top person monitors readings relayed from the
                      entrant&rsquo;s personal gas monitor (via display unit or
                      radio reports) and records them at the required intervals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Control access to the space:
                      </strong>{" "}
                      Only authorised personnel listed on the permit may enter.
                      The top person maintains the personnel log, recording who
                      enters and exits and at what time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Summon help immediately:
                      </strong>{" "}
                      If an emergency is detected &mdash; gas monitor alarm,
                      loss of communication, change in conditions, or the
                      entrant reports a problem &mdash; the top person activates
                      the emergency rescue plan without delay.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        No other duties:
                      </strong>{" "}
                      The top person must have no other responsibilities. They
                      cannot perform maintenance, answer phone calls, supervise
                      other work, or be distracted in any way. Their sole focus
                      is the safety of the entrant.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Training and Competence
                </p>
                <p className="text-sm text-white/80">
                  The top person must be{" "}
                  <strong className="text-white">trained and competent</strong>{" "}
                  in confined-space entry procedures, the specific risks of the
                  space being entered, the communication system in use, the
                  emergency rescue plan, and the operation of any rescue
                  equipment at the entry point (such as a tripod and winch). A
                  top person who does not understand the hazards or the
                  emergency procedures is not a top person &mdash; they are a
                  bystander. Training must be refreshed regularly and must cover
                  the specific site and space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 02: Communication Protocols */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">02</span>
            Communication Protocols
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Reliable communication between the entrant and the top person is
                a{" "}
                <strong>
                  non-negotiable requirement
                </strong>{" "}
                of every confined-space entry. Without communication, the top
                person cannot confirm the entrant&rsquo;s condition, and the
                entrant cannot report changes or call for help. Communication
                failure must be treated as an emergency.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <Radio className="h-4 w-4 inline-block mr-2 -mt-0.5 text-cyan-400" />
                  Communication Methods
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Verbal (voice):</strong>{" "}
                      Direct voice communication or two-way radios. In short,
                      simple spaces where the entrant is within earshot, direct
                      voice may be sufficient. In longer or noisier spaces,
                      intrinsically safe two-way radios are required.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Visual signals:</strong>{" "}
                      Hand signals or torch signals where line of sight is
                      maintained. Limited to simple spaces where the top person
                      can see the entrant throughout.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Tug-line (signal line):
                      </strong>{" "}
                      A rope attached to the entrant&rsquo;s harness. Agreed
                      signals are communicated by a series of tugs (e.g., one
                      tug = &ldquo;are you OK?&rdquo;, two tugs = &ldquo;yes,
                      I&rsquo;m OK&rdquo;, three tugs = &ldquo;I need to come
                      out&rdquo;, continuous tugging = &ldquo;emergency, pull me
                      out&rdquo;). Used as a backup or primary method in spaces
                      where electronic communication is unreliable.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Communication Protocol Diagram */}
              <div className="bg-white/5 border border-cyan-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Communication Check-In Protocol
                </h3>

                <div className="flex flex-col items-center">
                  {/* Step 1 */}
                  <div className="bg-cyan-500/20 border-2 border-cyan-400/60 rounded-lg px-6 py-3 text-center mb-2 w-full max-w-md">
                    <p className="text-cyan-300 font-bold text-sm">
                      TOP PERSON INITIATES CHECK
                    </p>
                    <p className="text-white/80 text-xs mt-1">
                      Every 5 minutes (or more frequently as agreed)
                    </p>
                  </div>
                  <div className="h-4 w-0.5 bg-cyan-400/40" />

                  {/* Step 2 */}
                  <div className="bg-white/5 border border-cyan-400/20 rounded-lg px-6 py-3 text-center mb-2 w-full max-w-md">
                    <p className="text-white font-medium text-sm">
                      Entrant responds with agreed signal
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Voice, radio, visual, or tug-line confirmation
                    </p>
                  </div>
                  <div className="h-4 w-0.5 bg-cyan-400/40" />

                  {/* Decision */}
                  <div className="flex items-start justify-center gap-4 sm:gap-8 w-full max-w-2xl">
                    {/* Response received */}
                    <div className="flex flex-col items-center w-1/2">
                      <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3 w-full text-center mb-2">
                        <p className="text-green-300 font-bold text-xs sm:text-sm">
                          RESPONSE RECEIVED
                        </p>
                      </div>
                      <div className="h-3 w-0.5 bg-green-400/40" />
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2 w-full text-center">
                        <p className="text-white/80 text-[10px] sm:text-xs">
                          Log the check. Continue work. Repeat at next
                          interval.
                        </p>
                      </div>
                    </div>
                    {/* No response */}
                    <div className="flex flex-col items-center w-1/2">
                      <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 w-full text-center mb-2">
                        <p className="text-red-300 font-bold text-xs sm:text-sm">
                          NO RESPONSE
                        </p>
                      </div>
                      <div className="h-3 w-0.5 bg-red-400/40" />
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-2 w-full text-center mb-2">
                        <p className="text-white/80 text-[10px] sm:text-xs">
                          <strong className="text-red-300">
                            TREAT AS EMERGENCY
                          </strong>
                        </p>
                      </div>
                      <div className="h-3 w-0.5 bg-red-400/40" />
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-2 w-full text-center">
                        <p className="text-white/80 text-[10px] sm:text-xs">
                          Initiate rescue plan. Call emergency services. Do
                          NOT enter.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Loss of Communication = Emergency
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If communication is lost at any point &mdash; the entrant does
                  not respond to a check-in, the radio goes silent, or the
                  tug-line signals stop &mdash; it must be{" "}
                  <strong className="text-white">
                    treated as an emergency immediately
                  </strong>
                  . There is no &ldquo;wait and see&rdquo; period. The entrant
                  may have been overcome by toxic gas, suffered an oxygen
                  deprivation event, or been injured. The emergency rescue plan
                  must be activated without delay.
                </p>
              </div>

              <p>
                All communication signals must be{" "}
                <strong>agreed before entry</strong> and understood by every
                member of the team. Signals must be practised during the
                pre-entry briefing. Ambiguous or misunderstood signals can delay
                an emergency response and cost lives.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/* Section 03: Continuous Atmospheric Monitoring */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">03</span>
            Continuous Atmospheric Monitoring
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Pre-entry atmospheric testing confirms the atmosphere is safe{" "}
                <em>before</em> anyone enters the space. But conditions inside
                a confined space can change rapidly during work &mdash; a
                coating may off-gas when disturbed, residual materials in
                pipework may release fumes, or ventilation may fail. For this
                reason,{" "}
                <strong>
                  continuous atmospheric monitoring during the entire entry
                </strong>{" "}
                is essential.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Personal Gas Monitor Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Worn by the entrant:
                      </strong>{" "}
                      A personal multi-gas monitor is worn on the
                      entrant&rsquo;s person, typically clipped to the chest or
                      collar to sample the air in the breathing zone.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Four-gas minimum:
                      </strong>{" "}
                      The monitor must detect at least oxygen (O<sub>2</sub>),
                      flammable gases (LEL), carbon monoxide (CO), and hydrogen
                      sulphide (H<sub>2</sub>S). Additional sensors may be
                      required depending on the risk assessment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Audible and visual alarms:
                      </strong>{" "}
                      The monitor must have alarms that are loud enough and
                      bright enough to alert the entrant even in noisy or
                      visually distracting environments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Calibrated and bump-tested:
                      </strong>{" "}
                      The monitor must be in calibration and must have passed a
                      bump test (exposure to known gas concentration) before each
                      use to confirm the sensors are responding correctly.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Alarm Actions
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If the personal gas monitor triggers{" "}
                  <strong className="text-white">any alarm</strong> &mdash;
                  low oxygen, high flammable gas, high toxic gas, or any
                  combination &mdash; the correct action is{" "}
                  <strong className="text-white">
                    immediate evacuation
                  </strong>
                  . The entrant must leave the space via the pre-planned egress
                  route without delay. There is{" "}
                  <strong className="text-white">
                    no investigation inside the space
                  </strong>
                  . Do not attempt to identify the source of the gas, do not
                  attempt to increase ventilation, and do not wait to see if
                  the reading stabilises. Evacuate first, investigate later
                  from outside.
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">
                    Recording Readings:
                  </strong>{" "}
                  Atmospheric monitoring readings must be recorded at regular
                  intervals throughout the entry (typically every 5 to 15
                  minutes, as specified in the risk assessment). The top person
                  logs the readings reported by the entrant or displayed on a
                  remote monitoring unit. These records form part of the entry
                  documentation and provide evidence that the atmosphere
                  remained safe throughout the work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 04: Time Limits */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">04</span>
            Time Limits
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every confined-space entry must have a{" "}
                <strong>defined time limit</strong> that is agreed before entry
                and recorded on the permit to work. Time limits protect the
                entrant from fatigue, heat stress, air supply depletion, and
                prolonged exposure to residual hazards. They are not advisory
                &mdash; they are a firm boundary that must be enforced.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <Clock className="h-4 w-4 inline-block mr-2 -mt-0.5 text-cyan-400" />
                  Factors That Determine Time Limits
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Air supply duration:
                      </strong>{" "}
                      If the entrant is using breathing apparatus (BA), the
                      time limit must allow for the work to be completed and the
                      entrant to exit <em>before</em> the air supply runs low.
                      A safety margin must be built in to account for increased
                      breathing rate under physical exertion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Heat stress:</strong>{" "}
                      Confined spaces can become extremely hot, especially when
                      mechanical work, hot work, or powered equipment is
                      involved. Heat stress can lead to confusion,
                      disorientation, collapse, and death. Time limits must
                      account for the thermal environment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fatigue:</strong>{" "}
                      Working in a restricted space with limited movement,
                      awkward postures, and heavy PPE is physically demanding. A
                      fatigued entrant makes more errors, moves more slowly, and
                      may not react quickly enough to an emergency.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Chemical exposure limits:
                      </strong>{" "}
                      If there is any residual contamination or the work itself
                      produces fumes, the time limit must ensure the
                      entrant&rsquo;s exposure remains within the workplace
                      exposure limit (WEL).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Task complexity:
                      </strong>{" "}
                      The nature of the work and the physical effort required
                      affect how long an entrant can work safely before needing
                      a break.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    No Extensions Inside the Space
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  When the agreed time limit expires, the entrant{" "}
                  <strong className="text-white">must exit the space</strong>,
                  regardless of whether the task is complete. The top person is
                  responsible for enforcing this. &ldquo;Just five more
                  minutes&rdquo; is not acceptable. If more time is needed, a
                  new risk assessment must be conducted, a fresh time limit
                  agreed, and the entrant must rest before re-entering.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/* Section 05: Work Rotation */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">05</span>
            Work Rotation
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For tasks that take longer than a single entry period, work
                rotation is used to maintain a{" "}
                <strong>fresh, alert workforce</strong>. Rather than pushing one
                entrant to their limits, teams rotate so that each entrant
                works a manageable period inside the space and then rests while
                a colleague takes over.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <Users className="h-4 w-4 inline-block mr-2 -mt-0.5 text-cyan-400" />
                  Work Rotation Principles
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Manages exposure:
                      </strong>{" "}
                      Even with continuous ventilation and monitoring, limiting
                      individual exposure time reduces cumulative risk from heat,
                      fumes, and physical strain.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduces fatigue:
                      </strong>{" "}
                      A rested entrant is more alert, makes fewer errors, and
                      can respond more quickly to changing conditions or
                      emergencies.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        All team members must be competent:
                      </strong>{" "}
                      Every entrant in the rotation must be trained, competent,
                      and briefed on the specific confined space, its hazards,
                      and the task in progress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Handover between entrants:
                      </strong>{" "}
                      When entrants swap, the outgoing entrant must brief the
                      incoming entrant on the current status of the work, any
                      issues encountered, and the current atmospheric conditions
                      inside the space.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Personnel log updated:
                      </strong>{" "}
                      Every swap must be recorded on the personnel log
                      &mdash; who came out, when, who went in, when.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The rotation schedule must be agreed before work begins and
                recorded on the permit. The top person monitors the schedule
                and ensures swaps happen on time. Rotation applies to the top
                person role as well &mdash; a top person who has been standing
                watch for hours may lose alertness, so relief must be planned.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 06: Tool, Equipment & Material Management */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">06</span>
            Tool, Equipment &amp; Material Management
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Everything taken into a confined space must be carefully
                controlled. Unnecessary items increase the risk of dropped
                objects, block the egress route, and may introduce ignition
                sources or other hazards into an enclosed environment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Tool and Equipment Rules
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Only take in what is needed:
                      </strong>{" "}
                      Every tool and piece of equipment must be justified.
                      Excess items clutter the space, obstruct movement, and
                      increase the risk of tripping or entanglement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Secure tools against falling:
                      </strong>{" "}
                      In vertical entries (manholes, vessels, shafts), tools
                      must be lowered on lines, not carried on ladders. Tool
                      lanyards prevent dropped objects that could injure the
                      entrant below.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        No unnecessary combustion sources:
                      </strong>{" "}
                      Petrol/diesel engines, naked flames, and any equipment
                      that produces heat or sparks must not be taken into the
                      space unless specifically authorised by a hot work permit.
                      Even cigarette lighters must be excluded.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Intrinsically safe equipment:
                      </strong>{" "}
                      In spaces where flammable atmospheres may occur, all
                      electrical and electronic equipment (torches, radios,
                      monitors, cameras) must be intrinsically safe (IS) rated
                      to prevent ignition.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Material Transfer In and Out
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Controlled transfer:</strong>{" "}
                      Materials must be transferred in and out of the space in a
                      controlled manner, using lines, baskets, or buckets
                      lowered from the entry point.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Never block the egress route:
                      </strong>{" "}
                      Materials must not be placed in or near the exit path.
                      The entrant must be able to leave the space quickly at
                      any time without climbing over obstacles.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Waste removal:
                      </strong>{" "}
                      Debris and waste must be removed regularly to prevent
                      accumulation. Do not allow waste to block access routes
                      or bury the entrant&rsquo;s escape path.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Working Posture and Ergonomics */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Working Posture and Ergonomics
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Confined spaces impose severe restrictions on working posture.
                  Entrants may need to work in kneeling, crouching, lying, or
                  overhead positions for extended periods. This creates
                  specific risks:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Manual handling difficulties:
                      </strong>{" "}
                      Lifting, carrying, and manoeuvring materials in a
                      restricted space increases the risk of musculoskeletal
                      injury. Standard lifting techniques may be impossible.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Accelerated fatigue:
                      </strong>{" "}
                      Awkward postures and restricted movement accelerate
                      physical fatigue, which directly affects the time limit
                      calculation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ergonomic planning:
                      </strong>{" "}
                      Task planning must consider posture requirements. Where
                      possible, pre-fabrication outside the space reduces the
                      amount of work that must be done in awkward positions
                      inside.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 07: Hot Work in Confined Spaces */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">07</span>
            Hot Work in Confined Spaces
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Hot work &mdash; welding, cutting, brazing, grinding, or any
                process that produces flames, sparks, or significant heat
                &mdash; inside a confined space is one of the{" "}
                <strong>highest-risk activities</strong> in any workplace. The
                combination of an enclosed atmosphere, potential flammable
                residues, and ignition sources demands the strictest controls.
              </p>

              {/* Hot Work Requirements Diagram */}
              <div className="bg-white/5 border border-red-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-red-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Hot Work in Confined Spaces &mdash; Required Controls
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <p className="text-sm font-medium text-red-300">
                          Specific Hot Work Permit
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          A separate hot work permit is required in addition
                          to the confined-space entry permit.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <p className="text-sm font-medium text-red-300">
                          Gas-Free Certificate
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          Confirms the atmosphere is free from flammable
                          gases and vapours before ignition sources are
                          introduced.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <div>
                        <p className="text-sm font-medium text-red-300">
                          Dedicated Fire Watch
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          A fire watch must remain in position during hot
                          work and for 30&ndash;60 minutes afterwards to
                          detect smouldering or delayed ignition.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                        4
                      </span>
                      <div>
                        <p className="text-sm font-medium text-red-300">
                          Additional Ventilation
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          Increased mechanical ventilation to remove welding
                          fumes, heat, and any combustion products from the
                          space.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                        5
                      </span>
                      <div>
                        <p className="text-sm font-medium text-red-300">
                          Fire Extinguisher Available
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          A suitable fire extinguisher must be immediately
                          available at the entry point, and the entrant must
                          know where it is.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                        6
                      </span>
                      <div>
                        <p className="text-sm font-medium text-red-300">
                          Continuous Atmospheric Monitoring
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          Monitoring must continue throughout the hot work
                          to detect any flammable gases released by heating
                          residual materials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Hidden Flammable Residues
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Even after thorough cleaning and a satisfactory gas-free test,
                  residual flammable materials can be trapped in crevices,
                  behind linings, in rust scale, or absorbed into coatings
                  inside the space. When heat is applied during hot work, these
                  residues can off-gas and create a{" "}
                  <strong className="text-white">flammable atmosphere</strong>{" "}
                  that was not present during the initial test. This is why
                  continuous atmospheric monitoring during hot work is
                  absolutely essential, and why the gas-free certificate covers
                  conditions <em>at the time of testing</em>, not permanently.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/* Section 08: Record Keeping, Shift Handover & Evacuation */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">08</span>
            Record Keeping, Shift Handover &amp; Conditions for Immediate
            Evacuation
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Accurate, real-time record keeping is essential during every
                confined-space entry. Records protect lives (by ensuring the
                team knows who is inside the space at all times), demonstrate
                compliance, and provide evidence for any subsequent
                investigation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Records Maintained During Entry
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Atmospheric monitoring log:
                      </strong>{" "}
                      Continuous record of O<sub>2</sub>, LEL, CO, and H
                      <sub>2</sub>S readings at defined intervals. Any
                      abnormal readings are highlighted and actioned.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Personnel log:
                      </strong>{" "}
                      Names of every person who enters and exits the space,
                      with exact times. This is critical for emergency
                      response &mdash; if an evacuation is required, you must
                      know exactly who is still inside.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Communication log:
                      </strong>{" "}
                      Record of each communication check-in, confirming that
                      the entrant responded and reported conditions satisfactory.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Permit to work:
                      </strong>{" "}
                      The active permit must be displayed at the entry point
                      for the duration of the entry.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Shift Handover Procedure
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Full briefing:</strong>{" "}
                      The outgoing team must brief the incoming team on all
                      current conditions, hazards encountered, work completed,
                      work remaining, and any issues or near-misses.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Fresh atmospheric testing:
                      </strong>{" "}
                      The incoming team must not rely on earlier test results.
                      Conditions may have changed since the last test, and a
                      fresh atmospheric test must be conducted before the new
                      entrant enters the space.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Permit review:
                      </strong>{" "}
                      The permit to work must be reviewed and revalidated for
                      the incoming team. All conditions on the permit must
                      still be met.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Emergency plan confirmation:
                      </strong>{" "}
                      Every member of the incoming team must understand the
                      emergency rescue plan, know the alarm signals, and know
                      the location of rescue equipment.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Conditions for Immediate Evacuation */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Conditions for Immediate Evacuation
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The entrant must evacuate the confined space{" "}
                  <strong className="text-white">immediately</strong> if any of
                  the following occur. There is no discussion, no investigation,
                  and no delay &mdash; leave first, assess from outside.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Gas monitor alarm:
                      </strong>{" "}
                      Any alarm on the personal gas monitor (low O<sub>2</sub>,
                      high LEL, high CO, high H<sub>2</sub>S, or any other
                      configured alert).
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Loss of communication:
                      </strong>{" "}
                      If the entrant cannot contact the top person, or the top
                      person cannot contact the entrant, by any method.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Change in conditions:
                      </strong>{" "}
                      Unexpected noise, vibration (indicating plant start-up or
                      structural movement), flooding or water ingress, sudden
                      temperature change, visible fumes, or any unusual smell.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Illness or injury:
                      </strong>{" "}
                      If the entrant feels unwell, dizzy, disorientated,
                      nauseous, or suffers any injury, they must exit
                      immediately. Do not attempt to &ldquo;push
                      through&rdquo;.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      5
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Top person instruction:
                      </strong>{" "}
                      If the top person instructs the entrant to evacuate for
                      any reason (they may have detected a hazard from outside
                      that the entrant is unaware of), the entrant must comply
                      without question.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      6
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Time limit reached:
                      </strong>{" "}
                      When the agreed time limit expires, the entrant must exit.
                      This is not a discretionary decision &mdash; it is a
                      mandatory requirement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Key Principle:</strong>{" "}
                  In confined-space work, the default response to anything
                  unexpected is{" "}
                  <strong className="text-white">evacuate and reassess</strong>.
                  The space will still be there when conditions are confirmed
                  safe. The entrant may not be if they stay to investigate.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Personal Protective Equipment
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-4-section-4">
              Next: Electrical Work in Confined Spaces
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
