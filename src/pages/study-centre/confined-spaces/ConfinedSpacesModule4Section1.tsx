import {
  ArrowLeft,
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  Lock,
  Zap,
  Wind,
  Radio,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "isolation-types",
    question:
      "What are the three main types of isolation that must be completed before entering a confined space?",
    options: [
      "Mechanical isolation, electrical isolation, and piping isolation",
      "Electrical isolation, chemical isolation, and physical barriers",
      "Lockout, tagout, and signage only",
      "Ventilation, purging, and atmospheric testing only",
    ],
    correctIndex: 0,
    explanation:
      "All three types of isolation must be verified before entry: mechanical isolation (blanking, disconnecting, locking valves), electrical isolation (lockout/tagout per BS 7671, proving dead, personal lock-off), and piping isolation (double block and bleed, slip plates or spectacle blinds). Each addresses a different energy source that could endanger the entrant. Omitting any one type leaves a potentially fatal hazard uncontrolled.",
  },
  {
    id: "atmos-test-sequence",
    question:
      "In what order should atmospheric testing be carried out before confined space entry?",
    options: [
      "Test from outside with sample draw, test at multiple levels, confirm O\u2082 19.5\u201323.5%, confirm flammables <10% LEL, confirm toxics below WEL",
      "Enter the space first, then test at the bottom level only",
      "Test for flammables first, then oxygen, then toxics",
      "A single test at the entry point is sufficient if the reading is normal",
    ],
    correctIndex: 0,
    explanation:
      "The correct sequence is critical: (1) test from outside the space using a sample draw tube \u2014 never enter to take the first reading; (2) test at multiple levels (top, middle, bottom) because gases stratify by density; (3) confirm oxygen is within 19.5\u201323.5%; (4) confirm flammable gases are below 10% of the lower explosive limit (LEL); (5) confirm toxic substances are below their workplace exposure limits (WEL). All readings must be recorded on the permit-to-work.",
  },
  {
    id: "rescue-equipment",
    question:
      "What rescue equipment must be in position at the entry point before anyone enters a confined space?",
    options: [
      "A tripod or davit with winch, a confirmed rescue plan, and a rescue team on standby",
      "A first-aid kit inside the space is sufficient",
      "Rescue equipment is only needed for spaces deeper than 3 metres",
      "The entrant's mobile phone is an acceptable substitute for rescue provisions",
    ],
    correctIndex: 0,
    explanation:
      "Before any entry, rescue equipment must be physically set up at the entry point. This includes a tripod, davit arm, or other mechanical retrieval device with a winch attached to the entrant's harness and lifeline. The rescue plan must be confirmed and understood by all personnel, and a trained rescue team must be on standby \u2014 not called only when needed. Attempting rescue without pre-positioned equipment is a leading cause of multiple fatalities in confined space incidents.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Can atmospheric testing be carried out once and then entry permitted for the rest of the day?",
    answer:
      "No. Atmospheric conditions inside a confined space can change rapidly due to chemical reactions, work processes, temperature fluctuations, or disturbance of residues. Initial pre-entry testing establishes safe conditions at that moment, but continuous monitoring must be maintained throughout the entry. If monitoring is interrupted for any reason \u2014 equipment failure, break periods, or a change in work activity \u2014 the space must be re-tested before re-entry. The permit-to-work should specify testing intervals and the conditions under which re-testing is mandatory.",
  },
  {
    question:
      "Who is responsible for signing the permit-to-work before a confined space entry?",
    answer:
      "The permit-to-work must be signed by an authorised person (the permit issuer) who has the competence and authority to verify that all precautions are in place. This is typically a senior supervisor or manager who has been specifically trained and appointed as a permit issuer. The entrant and the top person (safety attendant) must also sign the permit to confirm they have read it, understand the hazards, and agree to follow the stated procedures. The permit must never be signed in advance \u2014 it is only valid from the moment all preconditions have been physically verified.",
  },
  {
    question:
      "What should happen if the atmospheric test shows oxygen at 18% \u2014 slightly below the safe range?",
    answer:
      "Entry must not proceed. An oxygen reading of 18% is below the minimum safe level of 19.5% and indicates that either oxygen is being consumed by a chemical process or displaced by another gas. The space must be ventilated further and re-tested. If oxygen cannot be brought within the 19.5\u201323.5% range through ventilation, entry may only proceed with self-contained breathing apparatus (SCBA) and under a revised risk assessment that accounts for the oxygen-deficient atmosphere. The reduced oxygen level must be recorded on the permit and all entrants briefed on the specific hazard.",
  },
  {
    question:
      "Is it acceptable for the top person (safety attendant) to briefly enter the space to assist the entrant?",
    answer:
      "No. The top person must never enter the confined space under any circumstances. Their role is to remain at the entry point, maintain communication with the entrant, monitor atmospheric conditions, control access, and initiate emergency rescue if needed. If the top person enters the space, there is no one remaining to raise the alarm, operate rescue equipment, or prevent others from entering. A significant proportion of confined space fatalities involve would-be rescuers entering without proper equipment \u2014 often the top person acting on instinct rather than following the rescue plan.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the primary purpose of a permit-to-work system for confined space entry?",
    options: [
      "To ensure a written record exists of work completed for invoicing purposes",
      "To provide a formal, systematic check that all safety precautions have been taken before entry is authorised",
      "To satisfy insurance requirements for documentation",
      "To assign blame if an incident occurs",
    ],
    correctAnswer: 1,
    explanation:
      "The permit-to-work is a formal, documented system that ensures every required safety precaution has been verified before entry is authorised. It acts as a final checkpoint \u2014 covering isolation, atmospheric testing, ventilation, PPE, rescue provisions, and briefing. It is not merely administrative paperwork; it is a life-critical control measure that prevents entry until all conditions are confirmed safe.",
  },
  {
    id: 2,
    question:
      "Which of the following correctly describes 'double block and bleed' piping isolation?",
    options: [
      "Closing a single valve and fitting a blank flange downstream",
      "Closing two valves in series and opening a vent or drain between them to confirm isolation",
      "Disconnecting the pipe entirely and capping both ends",
      "Wrapping the pipe with insulation to prevent leaks",
    ],
    correctAnswer: 1,
    explanation:
      "Double block and bleed involves closing two valves in series on a pipeline and opening a vent or drain valve between them. If either block valve leaks, the substance drains harmlessly through the bleed valve rather than reaching the confined space. The bleed valve also provides visible confirmation that the isolation is holding. This method is essential where complete disconnection of pipework is not practicable.",
  },
  {
    id: 3,
    question:
      "During electrical isolation for confined space entry, what must be done after the supply is switched off?",
    options: [
      "A warning sign is placed on the isolator and no further action is needed",
      "The circuit must be proved dead using an approved voltage indicator, then locked off with a personal lock",
      "The fuse is removed and placed in the supervisor's pocket",
      "The circuit breaker is taped in the off position",
    ],
    correctAnswer: 1,
    explanation:
      "After switching off, the circuit must be proved dead at the point of work using an approved voltage indicator (GS38 compliant) that has been tested immediately before and after use on a known live source (proving unit). A personal padlock with a unique key must then be applied to the isolator to prevent re-energisation. This follows BS 7671 safe isolation procedures. Warning signs, tape, and removing fuses alone are not adequate \u2014 they can be bypassed or overridden by others.",
  },
  {
    id: 4,
    question:
      "Why must atmospheric testing be carried out at multiple levels inside a confined space?",
    options: [
      "To calibrate the gas detector at different temperatures",
      "Because gases stratify by density \u2014 heavier gases sink to the bottom and lighter gases rise to the top",
      "Regulations require at least three readings for statistical accuracy",
      "To check whether the ventilation fan is working at all heights",
    ],
    correctAnswer: 1,
    explanation:
      "Gases stratify by density within a confined space. Heavier-than-air gases (such as carbon dioxide, hydrogen sulphide, and many solvent vapours) sink to the bottom, whilst lighter-than-air gases (such as methane and hydrogen) rise to the top. Oxygen depletion may occur at one level but not another. Testing at top, middle, and bottom ensures hazards are detected regardless of where they accumulate. A single reading at the entry point could miss a lethal concentration at the bottom of the space.",
  },
  {
    id: 5,
    question:
      "What is the acceptable oxygen range for entry into a confined space without breathing apparatus?",
    options: [
      "20.9% exactly \u2014 any deviation requires breathing apparatus",
      "19.5% to 23.5%",
      "16% to 25%",
      "18% to 21%",
    ],
    correctAnswer: 1,
    explanation:
      "The acceptable oxygen range is 19.5% to 23.5%. Normal atmospheric oxygen is 20.9%. Below 19.5% indicates oxygen depletion (a gas may be displacing oxygen or a chemical reaction consuming it) and presents a risk of impaired judgement, unconsciousness, and death. Above 23.5% indicates oxygen enrichment, which creates a severe fire and explosion risk \u2014 materials that would not normally burn can ignite spontaneously in an oxygen-enriched atmosphere.",
  },
  {
    id: 6,
    question:
      "What should the pre-entry briefing cover?",
    options: [
      "Only the names of the people entering the space",
      "The hazards identified, safe working procedures, emergency actions, and communication signals",
      "A brief reminder to wear hard hats",
      "The estimated duration of the job and lunch break times",
    ],
    correctAnswer: 1,
    explanation:
      "The pre-entry briefing must cover all identified hazards specific to the space, the safe working procedures to be followed, the emergency actions and rescue plan, communication signals between entrant and top person, time limits for the entry, PPE requirements, and what to do if conditions change. Every person involved \u2014 entrants, top person, and standby rescue team \u2014 must attend. The briefing must be specific to this entry, not a generic toolbox talk.",
  },
  {
    id: 7,
    question:
      "After purging a confined space with inert gas, what critical step must be completed before entry?",
    options: [
      "Entry can proceed immediately because the inert gas has removed all hazards",
      "The space must be ventilated with fresh air to restore a breathable atmosphere before entry",
      "The inert gas concentration must be increased to 100%",
      "Workers should wear standard dust masks to filter the inert gas",
    ],
    correctAnswer: 1,
    explanation:
      "Inert gas purging (typically using nitrogen) displaces flammable or toxic gases, but it also displaces oxygen. An atmosphere of nitrogen is immediately fatal \u2014 a person will lose consciousness within seconds and die within minutes. After purging, the space must be thoroughly ventilated with fresh air until atmospheric testing confirms oxygen is within 19.5\u201323.5% and all other readings are safe. Never enter a space that has been inert-gas purged without completing this ventilation step.",
  },
  {
    id: 8,
    question:
      "Which of the following is NOT a required pre-entry check for access and egress?",
    options: [
      "Confirming that ladders are secured and platforms are stable",
      "Assessing whether the entry point is large enough for rescue with a stretcher",
      "Painting the entry point a bright colour for visibility",
      "Ensuring the entry and exit routes are clear and unobstructed",
    ],
    correctAnswer: 2,
    explanation:
      "Pre-entry access and egress checks include confirming that entry and exit routes are clear and unobstructed, ladders are secured, platforms are stable, and the entry point size has been assessed for both normal access and emergency rescue (including stretcher extraction if needed). Painting the entry point a bright colour is not a regulatory requirement. The focus is on physical safety and the ability to enter, work, and be rescued through the available openings.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function ConfinedSpacesModule4Section1() {
  useSEO({
    title:
      "Pre-Entry Procedures | Confined Spaces Module 4 Section 1",
    description:
      "Learn the systematic pre-entry procedures for confined spaces including isolation, atmospheric testing, ventilation, PPE checks, rescue equipment positioning, and the pre-entry briefing.",
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
            <Link to="../confined-spaces-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <ClipboardCheck className="h-10 w-10 text-cyan-500 mx-auto mb-4" />
          <span className="inline-block bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 4 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Pre-Entry Procedures
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            A systematic walkthrough of every step that must be completed before anyone
            enters a confined space &mdash; from issuing the permit-to-work through
            isolation, atmospheric testing, and rescue readiness
          </p>
        </div>

        {/* ─── Learning Outcomes ─── */}
        <section className="mb-10">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 sm:p-5">
            <h2 className="text-cyan-400 font-semibold text-base sm:text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Learning Outcomes
            </h2>
            <p className="text-white/70 text-sm mb-3">
              By the end of this section you will be able to:
            </p>
            <ul className="text-white space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Describe the purpose and content of a confined-space permit-to-work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Explain mechanical, electrical, and piping isolation techniques and how to verify each</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Outline the cleaning, purging, and ventilation sequence for a contaminated space</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>State the correct atmospheric testing sequence and acceptable limits for O&#8322;, flammables, and toxics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Identify the access, egress, communication, PPE, and rescue checks required before entry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Explain the role and responsibilities of the top person (safety attendant)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── 01 The Permit-to-Work System ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            The Permit-to-Work System
          </h2>
          <div className="space-y-4 text-white">
            <p>
              No one may enter a confined space until a <strong>permit-to-work</strong> has
              been formally issued and signed. The permit is not merely paperwork &mdash; it
              is a structured, life-critical checklist that ensures every precaution has been
              physically verified before entry is authorised.
            </p>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-3 sm:p-4 bg-cyan-500/10 border-l-2 border-l-cyan-500/50 border border-cyan-500/30">
                <p className="font-semibold text-base text-cyan-400 mb-2">What the Permit Contains</p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Description of the confined space and the work to be carried out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Identified hazards and the risk assessment findings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Isolation details &mdash; mechanical, electrical, and piping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Atmospheric test results recorded with time, location, and readings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ventilation arrangements and PPE/RPE requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Communication method and emergency/rescue procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Time limits, personnel names, and signatures of all parties</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-cyan-500/10 border-l-2 border-l-cyan-500/50 border border-cyan-500/30">
                <p className="font-semibold text-base text-cyan-400 mb-2">Permit Discipline</p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The permit is issued by an <strong>authorised, competent person</strong> &mdash;
                      never by the entrant themselves
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      It has a <strong>defined validity period</strong> &mdash; typically one shift
                      or a specified number of hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      It must be <strong>physically present at the entry point</strong> for the
                      duration of the work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      It must be <strong>formally cancelled</strong> when work is complete, with
                      confirmation that all personnel have exited and the space is secured
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If conditions change (e.g. gas alarm, equipment failure), the permit is
                      <strong> suspended immediately</strong> and work stops
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-red-300">Never Enter Without a Valid Permit</h3>
              </div>
              <p className="text-white/80 text-sm">
                Entry without a valid, signed permit-to-work is <strong className="text-white">prohibited</strong>.
                Even &ldquo;just having a quick look&rdquo; or &ldquo;popping in for a second&rdquo; constitutes
                an entry. If the permit has expired, been suspended, or has not yet been issued,
                no one may cross the entry point regardless of perceived urgency. Many confined-space
                fatalities occur during unauthorised or informal entries.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 02 Isolation Procedures ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">02</span>
              <Lock className="h-5 w-5 text-cyan-400" />
              Isolation Procedures
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Isolation prevents the uncontrolled introduction of energy, substances, or
                atmosphere into the confined space whilst people are inside. Three types of
                isolation must be addressed: <strong>mechanical</strong>,{" "}
                <strong>electrical</strong>, and <strong>piping</strong>. Each must be
                independently verified.
              </p>

              {/* Mechanical Isolation */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  Mechanical Isolation
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Mechanical isolation prevents moving parts (agitators, mixers, conveyors,
                  augers) from operating whilst personnel are inside.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Blanking:</strong> Fitting solid blank flanges or plates across
                      connections to physically block movement or flow
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Disconnecting:</strong> Physically removing drive belts, chains,
                      shafts, or couplings so that machinery cannot be driven even if power is
                      restored
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Locking valves:</strong> Closing isolation valves and securing them
                      with padlocks and chains to prevent inadvertent opening
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Verification:</strong> After isolation, attempt to operate the
                      equipment to confirm it cannot start. This &ldquo;try to operate&rdquo; step
                      is essential &mdash; never assume isolation is effective without testing it
                    </div>
                  </div>
                </div>
              </div>

              {/* Electrical Isolation */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Electrical Isolation (BS 7671 Safe Isolation)
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Electrical isolation follows the safe isolation procedure defined in
                  BS 7671 and HSE Guidance Note GS38. Every step must be completed in order.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <strong>Identify the circuit(s)</strong> supplying equipment within or
                      associated with the confined space using up-to-date drawings and labelling
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <strong>Switch off</strong> at the isolator or distribution board
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <strong>Lock off</strong> with a personal padlock (unique key held by the
                      person at risk). Each entrant and the top person should apply their own lock
                      where multi-lock hasps are used
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <strong>Prove dead</strong> using an approved voltage indicator (GS38
                      compliant). The tester must be checked on a known live source or proving unit
                      immediately <em>before</em> and <em>after</em> testing the isolated circuit
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      5
                    </div>
                    <div>
                      <strong>Post warning notices</strong> at the isolator: &ldquo;DANGER &mdash;
                      Do Not Switch On &mdash; Personnel Working in Confined Space&rdquo;
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-cyan-500/10 border border-cyan-500/20 p-3 rounded">
                  <p className="text-xs text-white/70">
                    <strong className="text-cyan-400">Key principle:</strong> The person at risk
                    holds the lock and key. No one else may remove another person&rsquo;s lock.
                    Locks are only removed by their owner when they have personally confirmed it
                    is safe to do so.
                  </p>
                </div>
              </div>

              {/* Piping Isolation */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  Piping Isolation
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Piping isolation prevents the ingress of liquids, gases, steam, or other
                  process substances through connected pipework.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Double block and bleed:</strong> Two isolation valves are closed in
                      series, and a vent or drain valve between them is opened. If either block
                      valve leaks, the substance drains through the bleed rather than reaching the
                      space. The bleed also provides visible confirmation of isolation integrity
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Slip plates (spade plates):</strong> Solid metal plates inserted
                      between pipe flanges to provide a positive, physical barrier. Particularly
                      useful where valves cannot be guaranteed leak-free
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Spectacle blinds:</strong> A figure-of-eight plate that can be
                      rotated between &ldquo;open&rdquo; (ring) and &ldquo;closed&rdquo; (solid
                      disc) positions. The closed position provides a positive seal visible from
                      outside the pipework
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Physical disconnection:</strong> Where practicable, pipework may be
                      completely disconnected and both open ends capped or blanked
                    </div>
                  </div>
                </div>
              </div>

              {/* Process Isolation Verification */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-semibold mb-2">
                  Process Isolation Verification
                </h3>
                <p className="text-white/80 text-sm">
                  After all isolation is in place, a <strong className="text-white">try-to-operate
                  test</strong> must be performed. Attempt to start motors, open valves, and
                  operate controls to confirm that the isolation is effective. If anything
                  responds, the isolation has failed and must be investigated before proceeding.
                  This step catches errors such as wrong circuits isolated, valves not fully
                  closed, or locks not properly engaged. Record the verification on the permit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Diagram 1: Isolation Sequence ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-cyan-400" />
            Isolation Sequence Overview
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            The diagram below shows the required isolation sequence. All three branches
            must be completed and verified before proceeding to cleaning and purging.
          </p>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {/* Mechanical */}
            <div className="rounded-xl border-2 border-cyan-500/50 bg-cyan-500/5 overflow-hidden">
              <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-4 py-3 text-center">
                <p className="text-cyan-400 font-bold text-lg">Mechanical</p>
                <p className="text-cyan-300/70 text-xs uppercase tracking-wider mt-0.5">
                  Moving Parts
                </p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Step 1
                  </p>
                  <p className="text-white/80">Identify all mechanical energy sources</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Step 2
                  </p>
                  <p className="text-white/80">Blank, disconnect, or lock valves/drives</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Step 3
                  </p>
                  <p className="text-white/80">Apply personal padlocks and tags</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Verify
                  </p>
                  <p className="text-white/80">Try to operate &mdash; confirm no movement</p>
                </div>
              </div>
            </div>

            {/* Electrical */}
            <div className="rounded-xl border-2 border-cyan-500/50 bg-cyan-500/5 overflow-hidden">
              <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-4 py-3 text-center">
                <p className="text-cyan-400 font-bold text-lg">Electrical</p>
                <p className="text-cyan-300/70 text-xs uppercase tracking-wider mt-0.5">
                  BS 7671 / GS38
                </p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Step 1
                  </p>
                  <p className="text-white/80">Identify circuits from drawings</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Step 2
                  </p>
                  <p className="text-white/80">Switch off at isolator</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Step 3
                  </p>
                  <p className="text-white/80">Lock off with personal padlock</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Verify
                  </p>
                  <p className="text-white/80">Prove dead (test &rarr; check &rarr; test)</p>
                </div>
              </div>
            </div>

            {/* Piping */}
            <div className="rounded-xl border-2 border-cyan-500/50 bg-cyan-500/5 overflow-hidden">
              <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-4 py-3 text-center">
                <p className="text-cyan-400 font-bold text-lg">Piping</p>
                <p className="text-cyan-300/70 text-xs uppercase tracking-wider mt-0.5">
                  Fluids &amp; Gases
                </p>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Step 1
                  </p>
                  <p className="text-white/80">Identify all connected pipework</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Step 2
                  </p>
                  <p className="text-white/80">Double block &amp; bleed or insert slip plates</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Step 3
                  </p>
                  <p className="text-white/80">Lock valves and tag spectacle blinds</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Verify
                  </p>
                  <p className="text-white/80">Check bleed valves &mdash; no flow confirmed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2">
              <CheckCircle className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">
                All three verified &rarr; proceed to cleaning &amp; purging
              </span>
            </div>
          </div>

          <p className="text-white/50 text-xs text-center mt-3 italic">
            On mobile, scroll down to view all three isolation branches
          </p>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Cleaning and Purging ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">03</span>
              Cleaning and Purging
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Once all energy sources are isolated, the interior of the confined space must
                be cleaned and purged to remove hazardous residues and establish a safe
                atmosphere. This is a multi-step process that must be completed in the correct
                order.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">Step-by-Step Process</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <strong>Remove residues:</strong> Drain liquids, shovel out solids, and
                      remove sludge or scale from walls, floors, and internal structures. Residues
                      can continue to emit toxic or flammable gases long after a vessel is emptied
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <strong>Wash down:</strong> Use water or appropriate cleaning agents to wash
                      internal surfaces. Steam cleaning may be used for stubborn deposits. Ensure
                      wash water is drained and does not accumulate
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <strong>Purge with inert gas:</strong> If the space contained flammable
                      substances, it may be purged with nitrogen or another inert gas to displace
                      the flammable atmosphere below the lower explosive limit (LEL). This step
                      creates an atmosphere that is <strong>immediately dangerous to life</strong>{" "}
                      &mdash; no one may enter during inert gas purging
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <strong>Ventilate to breathable atmosphere:</strong> After purging, the
                      inert gas must be displaced with fresh air using mechanical ventilation.
                      Continue ventilating until atmospheric testing confirms safe levels of
                      oxygen, flammables, and toxics at all levels within the space
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Nitrogen Kills Without Warning</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Nitrogen is colourless, odourless, and tasteless. A single breath of a
                  nitrogen-rich atmosphere can cause immediate unconsciousness. Death follows
                  within minutes. There have been multiple fatalities in the UK where workers
                  entered spaces that had been purged with nitrogen but not subsequently
                  ventilated with fresh air. <strong className="text-white">Never enter a space
                  during or immediately after inert-gas purging without first restoring a
                  breathable atmosphere and confirming it by testing.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Atmospheric Testing Sequence ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">04</span>
              Atmospheric Testing Sequence
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Atmospheric testing is the single most critical pre-entry check. It must be
                carried out in a specific sequence using calibrated instruments, and the results
                must be recorded on the permit before entry is authorised.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">The Five-Step Testing Sequence</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/30 text-cyan-300 text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <strong>Test from outside the space</strong> using a sample draw pump and
                      extension tube. The person testing must remain outside and draw a sample from
                      within the space. Never enter a confined space to take the first atmospheric
                      reading &mdash; the atmosphere may be immediately dangerous to life and health
                      (IDLH)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/30 text-cyan-300 text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <strong>Test at multiple levels:</strong> top, middle, and bottom of the
                      space. Gases stratify by density &mdash; heavier-than-air gases (CO&#8322;,
                      H&#8322;S, solvent vapours) sink to the bottom, whilst lighter gases
                      (methane, hydrogen) rise to the top. A reading at one level tells you nothing
                      about conditions at another
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/30 text-cyan-300 text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <strong>Confirm oxygen 19.5&ndash;23.5%.</strong> Below 19.5% =
                      oxygen-deficient (risk of impaired judgement, unconsciousness, death). Above
                      23.5% = oxygen-enriched (severe fire/explosion risk &mdash; materials
                      ignite more easily). Normal air is 20.9% O&#8322;
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/30 text-cyan-300 text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <strong>Confirm flammable gases &lt;10% LEL.</strong> The lower explosive
                      limit (LEL) is the minimum concentration at which a gas can ignite. Readings
                      must be well below the LEL &mdash; the 10% threshold provides a safety
                      margin. If readings approach or exceed 10% LEL, entry is prohibited until
                      further ventilation and re-testing achieve a safe level
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/30 text-cyan-300 text-sm font-bold flex-shrink-0">
                      5
                    </div>
                    <div>
                      <strong>Confirm toxic substances below their workplace exposure limit
                      (WEL).</strong> Test for all toxic substances identified in the risk
                      assessment (e.g. carbon monoxide, hydrogen sulphide, ammonia, solvent
                      vapours). Each substance has a specific WEL published in HSE document
                      EH40. Readings must be below these limits at every test point
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">Recording Results</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>All readings</strong> must be recorded on the permit-to-work with
                      the time, date, test location (top/middle/bottom), instrument serial number,
                      and the name of the person who took the reading
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The gas detector must be <strong>in current calibration</strong> and{" "}
                      <strong>bump-tested</strong> before use on the day of the entry
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      If <strong>any reading is outside acceptable limits</strong>, entry is
                      prohibited. The space must be further ventilated and re-tested. Do not
                      average readings or ignore a single high result
                    </div>
                  </div>
                </div>
              </div>

              {/* Acceptable Limits Summary */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg border-2 border-green-500/40 bg-green-500/5 p-3 text-center">
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Oxygen (O&#8322;)
                  </p>
                  <p className="text-white font-bold text-lg">19.5&ndash;23.5%</p>
                  <p className="text-white/60 text-xs mt-1">Normal = 20.9%</p>
                </div>
                <div className="rounded-lg border-2 border-amber-500/40 bg-amber-500/5 p-3 text-center">
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Flammables
                  </p>
                  <p className="text-white font-bold text-lg">&lt;10% LEL</p>
                  <p className="text-white/60 text-xs mt-1">Well below ignition point</p>
                </div>
                <div className="rounded-lg border-2 border-red-500/40 bg-red-500/5 p-3 text-center">
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Toxics
                  </p>
                  <p className="text-white font-bold text-lg">Below WEL</p>
                  <p className="text-white/60 text-xs mt-1">Per EH40 for each substance</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 05 Ventilation Setup ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              <Wind className="h-5 w-5 text-cyan-400" />
              Ventilation Setup
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Mechanical ventilation is essential to maintain a safe atmosphere during the
                entry. Natural ventilation alone is almost never sufficient for confined
                spaces. The ventilation system must be set up, tested, and confirmed effective
                before entry and maintained continuously throughout.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">Ventilation Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Position fans correctly:</strong> Fresh air should be blown into the
                      space (forced ventilation) or extracted from the space (exhaust ventilation)
                      depending on the hazard. For flammable atmospheres, fans must be intrinsically
                      safe or air-driven
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Route ducting effectively:</strong> Flexible ducting should extend to
                      the furthest point from the entry, ensuring air reaches all areas of the
                      space. Avoid kinks, sharp bends, and excessive duct length that reduces
                      airflow
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Verify airflow:</strong> Use smoke tubes, anemometers, or other
                      methods to confirm that air is actually reaching all parts of the space.
                      Stagnant areas (&ldquo;dead spots&rdquo;) can harbour dangerous concentrations
                      even when ventilation appears adequate
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Fresh air intake:</strong> Ensure the fan intake draws clean air, not
                      exhaust fumes, engine emissions, or air contaminated by nearby processes. The
                      intake must be positioned upwind and away from any source of contamination
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Continuous operation:</strong> Ventilation must run continuously during
                      the entry. If the ventilation system fails, all personnel must evacuate
                      immediately and the space must be re-tested before re-entry
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 Access, Egress, and Communication ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">06</span>
              Access, Egress, and Communication
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">Access &amp; Egress Checks</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Clear entry and exit routes:</strong> Remove obstructions, tools, and
                      materials from the access path. The entrant must be able to exit quickly in an
                      emergency without climbing over obstacles
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Ladders secured:</strong> All ladders must be tied, footed, or
                      otherwise secured to prevent displacement. They must extend at least 1 metre
                      above the landing point
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Platforms stable:</strong> Any internal platforms, scaffolding, or
                      staging must be inspected and confirmed stable before use
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Restricted entry size assessment:</strong> Determine whether the entry
                      point is large enough for an entrant wearing full PPE and harness, and
                      critically, whether an unconscious casualty on a stretcher or in a rescue
                      harness can be extracted through it. If the opening is too small for
                      conventional rescue, the rescue plan must address alternative methods
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3 flex items-center gap-2">
                  <Radio className="h-4 w-4" />
                  Communication System
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      A reliable communication system must be established between the{" "}
                      <strong>entrant</strong> and the <strong>top person</strong> (safety attendant)
                      before entry. This may be voice, radio, hard-wired intercom, or a signal
                      system using a tug rope
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Test the system before entry:</strong> Confirm that both parties can
                      communicate clearly. If using radios, check for signal dead spots within the
                      space. If using a tug-line, agree the signal code (e.g. one tug = OK, two
                      tugs = pull me out, continuous tugs = emergency)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Regular check-ins:</strong> Agree a check-in interval (e.g. every 5
                      minutes). If the entrant fails to respond to a scheduled check-in, the top
                      person must initiate the emergency procedure immediately
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 PPE/RPE and Rescue Equipment ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">07</span>
              <Shield className="h-5 w-5 text-cyan-400" />
              PPE/RPE and Rescue Equipment
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">PPE/RPE Checks</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Harness fitted correctly:</strong> The full-body harness must be
                      properly fitted with all straps adjusted. The dorsal attachment point (D-ring)
                      must be positioned correctly between the shoulder blades for vertical
                      extraction
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Lifeline connected:</strong> The lifeline must be connected from the
                      harness D-ring to the retrieval device (winch on tripod/davit). The lifeline
                      length must be appropriate for the space depth, with no excess that could
                      tangle or snag
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>RPE functional:</strong> Where respiratory protective equipment is
                      required, it must be the correct type for the identified hazard (e.g.
                      self-contained breathing apparatus for oxygen-deficient atmospheres, or
                      appropriate filter masks for specific contaminants). Check the seal, air
                      supply, cylinder pressure (for SCBA), and carry out a fit check before entry
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Additional PPE:</strong> As identified by the risk assessment &mdash;
                      hard hat, gloves, eye protection, hearing protection, chemical-resistant
                      clothing, non-sparking footwear. All items checked for condition and correct
                      fit
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">Rescue Equipment</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Tripod, davit arm, or winch at the entry point:</strong> The
                      mechanical retrieval device must be set up over or adjacent to the entry
                      point before anyone enters. It must be rated for the load (entrant weight
                      plus equipment) and have been inspected within its statutory examination
                      period
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Rescue plan confirmed:</strong> The written rescue plan must be
                      reviewed and confirmed for this specific entry. It must detail how a
                      casualty will be retrieved, what equipment will be used, who will perform the
                      rescue, and the route to medical assistance. Generic rescue plans are
                      unacceptable &mdash; the plan must reflect the actual space geometry, entry
                      size, depth, and hazards
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Rescue team on standby:</strong> Trained rescue personnel must be
                      immediately available for the duration of the entry. &ldquo;On standby&rdquo;
                      means physically present at or near the entry point, not on call from a
                      distant location. Emergency services have been contacted with the site
                      location and access details
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>First aid equipment:</strong> A first aid kit appropriate for the
                      identified hazards must be available at the entry point, including an
                      automated external defibrillator (AED) if reasonably practicable
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Rescue Equipment Must Be Set Up BEFORE Entry
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Rescue equipment that is &ldquo;in the van&rdquo; or &ldquo;available if
                  needed&rdquo; is <strong className="text-white">not acceptable</strong>.
                  Equipment must be physically erected, connected, and tested at the entry point
                  before any person enters the space. In an emergency, there is no time to
                  assemble and rig a tripod. Confined space incidents escalate from consciousness
                  to death in minutes. The rescue system must be ready to operate immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── Diagram 2: Pre-Entry Checklist ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-cyan-400" />
            Pre-Entry Checklist at a Glance
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            Every item on this checklist must be confirmed before the permit is signed and
            entry is authorised. A single outstanding item means entry is prohibited.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Column 1 — Isolation */}
            <div className="rounded-xl border-2 border-cyan-500/50 bg-cyan-500/5 overflow-hidden">
              <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-4 py-3 text-center">
                <Lock className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                <p className="text-cyan-400 font-bold">Isolation</p>
              </div>
              <div className="p-3 space-y-2 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Mechanical isolation verified</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Electrical isolation &amp; proved dead</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Piping isolation confirmed</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Personal locks applied</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Try-to-operate test passed</span>
                </div>
              </div>
            </div>

            {/* Column 2 — Atmosphere */}
            <div className="rounded-xl border-2 border-cyan-500/50 bg-cyan-500/5 overflow-hidden">
              <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-4 py-3 text-center">
                <Wind className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                <p className="text-cyan-400 font-bold">Atmosphere</p>
              </div>
              <div className="p-3 space-y-2 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Residues removed &amp; washed</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Purged &amp; ventilated</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>O&#8322; 19.5&ndash;23.5% at all levels</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Flammables &lt;10% LEL</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Toxics below WEL</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Readings recorded on permit</span>
                </div>
              </div>
            </div>

            {/* Column 3 — Access & Comms */}
            <div className="rounded-xl border-2 border-cyan-500/50 bg-cyan-500/5 overflow-hidden">
              <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-4 py-3 text-center">
                <Radio className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                <p className="text-cyan-400 font-bold">Access &amp; Comms</p>
              </div>
              <div className="p-3 space-y-2 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Entry/exit routes clear</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Ladders secured</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Entry size assessed for rescue</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Comms system tested</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Ventilation running &amp; verified</span>
                </div>
              </div>
            </div>

            {/* Column 4 — PPE & Rescue */}
            <div className="rounded-xl border-2 border-cyan-500/50 bg-cyan-500/5 overflow-hidden">
              <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-4 py-3 text-center">
                <Shield className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                <p className="text-cyan-400 font-bold">PPE &amp; Rescue</p>
              </div>
              <div className="p-3 space-y-2 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Harness fitted &amp; lifeline attached</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>RPE checked &amp; functional</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Tripod/davit at entry point</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Rescue plan confirmed</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Rescue team on standby</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>First aid &amp; AED available</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/50 text-xs text-center mt-4 italic">
            On mobile, scroll down to view all four checklist columns
          </p>
        </section>

        {/* ─── 08 Pre-Entry Briefing and Top Person ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              <Users className="h-5 w-5 text-cyan-400" />
              Pre-Entry Briefing &amp; Top Person
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The final step before authorising entry is the pre-entry briefing. This
                ensures every person involved understands exactly what they are doing, what
                hazards exist, and what to do if something goes wrong. It is not a
                formality &mdash; it is a safety-critical event.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">Pre-Entry Briefing Content</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Hazards specific to this space:</strong> What has been identified in
                      the risk assessment &mdash; atmospheric hazards, physical hazards (restricted
                      access, slippery surfaces, falling objects), engulfment risks, temperature
                      extremes
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Safe working procedures:</strong> The scope of work, the method, the
                      tools permitted, and any restrictions (e.g. no hot work, no power tools, time
                      limit for the entry)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Emergency actions:</strong> What to do if the gas alarm sounds, if
                      the ventilation fails, if the entrant becomes unwell, or if any other
                      unexpected event occurs. The evacuation route and assembly point
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Communication signals:</strong> Confirm the agreed signals between
                      entrant and top person, including the check-in interval and the signal for
                      &ldquo;evacuate immediately&rdquo;
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Rescue procedure:</strong> Walk through the rescue plan so every
                      person knows their role. Confirm the rescue team is in position and the
                      emergency services have been notified of the activity
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>All personnel attend:</strong> Entrants, top person, rescue team
                      members, and anyone else involved. No one may enter the space unless they
                      have attended the briefing for this specific entry
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  Top Person (Safety Attendant) &mdash; Role &amp; Responsibilities
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  The top person is positioned at the entry point for the entire duration of
                  the entry. Their role is non-negotiable and they must not be assigned any
                  other task that could distract them.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Trained and competent</strong> in confined space procedures, rescue
                      equipment operation, and emergency response
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Maintains continuous communication</strong> with the entrant(s) using
                      the agreed system and at the agreed intervals
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Monitors atmospheric readings</strong> from the continuous gas
                      monitor (if displayed at the entry point) and watches for changes in the
                      entrant&rsquo;s behaviour or speech patterns that could indicate impairment
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Controls access</strong> to the confined space &mdash; no
                      unauthorised person may approach or enter
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Initiates emergency rescue</strong> if the entrant becomes
                      unresponsive, the gas alarm activates, ventilation fails, or any other
                      emergency condition arises
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Keeps a log</strong> of entry and exit times, communication
                      check-ins, and any incidents or observations
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    The Top Person Must NEVER Enter the Space
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Under <strong className="text-white">no circumstances</strong> should the
                  top person enter the confined space. If the entrant is in distress, the top
                  person must activate the rescue plan and use the mechanical retrieval system
                  from outside. Entering the space to &ldquo;help&rdquo; turns one casualty
                  into two. A disproportionate number of confined-space fatalities are
                  would-be rescuers who entered without breathing apparatus. The top
                  person&rsquo;s value is in staying outside and coordinating the rescue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways / Summary ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>No entry without a valid, signed permit-to-work</strong> that has
                      been issued by a competent, authorised person after all preconditions are
                      physically verified.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Three types of isolation</strong> must be completed and verified:
                      mechanical (blanking, disconnecting, locking), electrical (lockout/tagout per
                      BS 7671, prove dead, personal lock), and piping (double block and bleed, slip
                      plates, spectacle blinds).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Always try to operate after isolation</strong> to confirm it is
                      effective. Never assume &mdash; test.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cleaning, purging, and ventilation</strong> must restore a breathable
                      atmosphere before testing. Inert gas purging creates an IDLH environment that
                      must be ventilated away.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Atmospheric testing</strong> follows a strict sequence: test from
                      outside, test at multiple levels, confirm O&#8322; 19.5&ndash;23.5%,
                      flammables &lt;10% LEL, and toxics below WEL. Record everything on the
                      permit.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Ventilation must run continuously</strong> throughout the entry, with
                      airflow verified at all areas of the space.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Rescue equipment must be set up at the entry point</strong> before
                      anyone enters &mdash; tripod/davit rigged, rescue plan confirmed, rescue team
                      on standby.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The pre-entry briefing</strong> covers hazards, procedures, emergency
                      actions, and communication signals. All personnel must attend.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The top person (safety attendant)</strong> must be trained, positioned
                      at the entry point, and must never enter the space under any circumstances.
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
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="Pre-Entry Procedures Quiz"
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
            <Link to="../confined-spaces-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-4-section-2">
              Next: Personal Protective Equipment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
