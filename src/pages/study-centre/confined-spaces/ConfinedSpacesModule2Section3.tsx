import { ArrowLeft, ShieldCheck, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ssow-supervisor-role",
    question: "What is the primary role of the appointed supervisor in a confined space safe system of work?",
    options: [
      "To enter the confined space and carry out the work themselves",
      "To ensure the SSoW is properly implemented and that all control measures are in place before and during entry",
      "To write the risk assessment after the work is completed",
      "To provide atmospheric testing equipment to the entrants"
    ],
    correctIndex: 1,
    explanation: "The appointed supervisor is responsible for ensuring the safe system of work is properly implemented, that all control measures are in place before entry is permitted, and that the work is monitored throughout. They do not necessarily enter the space themselves — their role is oversight and enforcement of the plan."
  },
  {
    id: "ssow-loto-purpose",
    question: "What is the primary purpose of lockout/tagout (LOTO) procedures before confined space entry?",
    options: [
      "To prevent unauthorised personnel from entering the space",
      "To ensure all energy sources, mechanical equipment, and piped services are positively isolated so they cannot be accidentally re-energised or reconnected",
      "To label the confined space with the names of all entrants",
      "To test the atmosphere inside the confined space"
    ],
    correctIndex: 1,
    explanation: "LOTO procedures ensure that all energy sources — electrical, mechanical, hydraulic, pneumatic — and all piped services (chemicals, steam, gases) are positively isolated and locked in the safe position. This prevents accidental re-energisation or reconnection that could endanger anyone inside the space."
  },
  {
    id: "ssow-atmos-testing",
    question: "When should atmospheric testing of a confined space first be carried out?",
    options: [
      "After the first entrant has entered and reported back",
      "From outside the space before anyone enters, using remote probes or sampling lines",
      "Only if workers report feeling unwell during the entry",
      "At the end of the working period to check exposure levels"
    ],
    correctIndex: 1,
    explanation: "Atmospheric testing must ALWAYS be carried out from outside the confined space before anyone enters. Testing equipment with remote probes or sampling lines should be used so that the atmosphere can be assessed without exposing anyone to potential hazards. Testing must then continue throughout the entry."
  }
];

const faqs = [
  {
    question: "Who is responsible for developing the safe system of work for confined space entry?",
    answer: "The employer has the overall legal duty under the Confined Spaces Regulations 1997 and the Management of Health and Safety at Work Regulations 1999 to ensure a suitable and sufficient safe system of work is in place. In practice, the SSoW is developed by a competent person — someone with the necessary training, knowledge, and experience of confined space work. This may be a safety professional, an experienced supervisor, or a specialist confined space consultant, depending on the complexity of the work. The SSoW should be developed in consultation with those who will carry out the work and must be based on a thorough risk assessment specific to the confined space and the task."
  },
  {
    question: "Can a generic safe system of work be used for all confined space entries?",
    answer: "No. Whilst an organisation may have standard procedures and templates that form the basis of their confined space management, each entry must have a safe system of work that is specific to that particular confined space and the work being carried out. Different spaces present different hazards — a sewer presents very different risks from a chemical storage vessel or an underground electrical chamber. The SSoW must be based on a site-specific risk assessment that considers the particular hazards, the nature of the work, the equipment needed, the competence of the team, and the emergency arrangements required. A generic 'one size fits all' approach is not acceptable."
  },
  {
    question: "What should happen if conditions inside the confined space change during work?",
    answer: "If conditions change — for example, if atmospheric monitoring detects a deterioration in air quality, if an unexpected substance is encountered, or if the weather changes and affects the space — all work must stop immediately and all entrants must evacuate the space. The supervisor must be informed, and no re-entry is permitted until the changed conditions have been assessed, the risk assessment has been reviewed, and the SSoW has been updated to address the new situation. The pre-entry briefing must be repeated for all personnel before any re-entry. Never assume that conditions will return to normal on their own."
  },
  {
    question: "How long should entrants be permitted to remain inside a confined space?",
    answer: "Time limits for confined space entry should be determined as part of the risk assessment and specified in the SSoW. The appropriate duration depends on several factors: the type and level of hazards present, the type of RPE being worn (self-contained breathing apparatus has finite air supply), the physical demands of the work, temperature and humidity inside the space, and the fitness of the entrants. In hot or physically demanding conditions, time limits may be as short as 15–20 minutes. Even in relatively benign conditions, regular breaks should be enforced. The top person must monitor entry times and ensure that time limits are strictly observed — they must recall entrants before the limit is reached, not after."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is the FIRST step in developing a safe system of work for confined space entry?",
    options: [
      "Selecting the correct PPE for the entrants",
      "Carrying out a thorough risk assessment specific to the space and the task",
      "Briefing the entrants on the emergency procedures",
      "Testing the atmosphere inside the confined space"
    ],
    correctAnswer: 1,
    explanation: "The risk assessment is always the first step. Without understanding the specific hazards of the confined space and the work to be carried out, it is impossible to determine the correct control measures, PPE, monitoring requirements, or emergency procedures. Everything in the SSoW flows from the risk assessment."
  },
  {
    id: 2,
    question: "What does the term 'positive isolation' mean in the context of LOTO procedures?",
    options: [
      "Placing a warning sign on the equipment",
      "Asking someone to watch the isolation switch",
      "Physically disconnecting or locking energy sources so they cannot be accidentally re-energised",
      "Turning off equipment using the normal operating controls"
    ],
    correctAnswer: 2,
    explanation: "Positive isolation means physically disconnecting or locking energy sources in the safe (off/de-energised) position using devices such as lockout hasps, padlocks, blanking flanges, or removal of fuses. Simply turning off a switch or closing a valve is NOT positive isolation — these can be accidentally or deliberately reversed. Positive isolation ensures that re-energisation requires a deliberate, physical action to remove the lock."
  },
  {
    id: 3,
    question: "What three gases must be tested for as a MINIMUM before entry into any confined space?",
    options: [
      "Carbon monoxide, hydrogen, and nitrogen",
      "Oxygen, flammable gases/vapours, and toxic gases",
      "Methane, propane, and butane",
      "Oxygen, carbon dioxide, and argon"
    ],
    correctAnswer: 1,
    explanation: "As a minimum, the atmosphere must be tested for oxygen level (normal range 19.5%–20.9%), flammable gases/vapours (must be below 10% of the lower explosive limit), and toxic gases (such as carbon monoxide or hydrogen sulphide, depending on the space). Additional gases may need to be tested depending on the specific hazards identified in the risk assessment."
  },
  {
    id: 4,
    question: "Why must atmospheric testing be carried out at different levels within the confined space?",
    options: [
      "Because testing equipment only works at certain heights",
      "Because different gases have different densities — some accumulate at low level, others at high level",
      "Because the regulations require a minimum of three test readings",
      "Because the space may have different temperatures at different levels"
    ],
    correctAnswer: 1,
    explanation: "Different gases have different densities relative to air. Heavier-than-air gases (such as carbon dioxide, hydrogen sulphide, and many solvent vapours) tend to accumulate at low levels, whilst lighter-than-air gases (such as methane and hydrogen) rise to the top. Testing at multiple levels — top, middle, and bottom — ensures that pockets of hazardous gas are detected regardless of where they have accumulated."
  },
  {
    id: 5,
    question: "What is the role of the 'top person' during a confined space entry?",
    options: [
      "To carry out the work inside the confined space",
      "To remain at the entry point at all times, maintain communication with the entrant, and raise the alarm if anything goes wrong",
      "To supervise all other work taking place on the site",
      "To supply tools and materials to the entrants as needed"
    ],
    correctAnswer: 1,
    explanation: "The top person (also called the standby person or attendant) must remain at the entry point at ALL times during the entry. Their duties include maintaining continuous communication with the entrant(s), monitoring the condition of entrants, keeping a log of who is in the space, preventing unauthorised entry, and raising the alarm and initiating the emergency procedure if anything goes wrong. They must NEVER enter the confined space themselves — doing so has led to multiple fatalities."
  },
  {
    id: 6,
    question: "Why might forced (mechanical) ventilation be required before and during confined space entry?",
    options: [
      "To keep the entrants cool and comfortable",
      "To maintain a safe atmosphere by introducing fresh air and diluting or displacing hazardous gases",
      "To dry out the confined space before entry",
      "To reduce the noise level inside the space"
    ],
    correctAnswer: 1,
    explanation: "Forced ventilation is used to introduce fresh air into the confined space and to dilute or displace any hazardous gases or vapours. Natural ventilation is often inadequate in confined spaces due to limited openings and poor air circulation. Forced ventilation must be positioned so that fresh air reaches the working area, and the inlet must draw from a clean air source — not from near vehicle exhausts, generators, or other contamination sources."
  },
  {
    id: 7,
    question: "What type of electrical equipment must be used in a confined space with a potentially flammable atmosphere?",
    options: [
      "Standard 230V equipment with an RCD",
      "Battery-powered equipment only",
      "Intrinsically safe (ATEX-rated) equipment that cannot produce sparks or sufficient heat to ignite the atmosphere",
      "Any equipment is acceptable if the atmosphere has been tested"
    ],
    correctAnswer: 2,
    explanation: "In a confined space where a flammable atmosphere may be present, all electrical equipment must be intrinsically safe (ATEX-rated). Intrinsically safe equipment is designed so that it cannot produce electrical sparks or sufficient heat to ignite a flammable gas or vapour, even under fault conditions. Standard equipment — even at reduced voltage — could produce sparks that ignite a flammable atmosphere with catastrophic consequences."
  },
  {
    id: 8,
    question: "What must take place immediately before entrants enter a confined space, even if all preparations are complete?",
    options: [
      "A tea break so that all workers are refreshed",
      "A pre-entry briefing covering the SSoW, hazards, control measures, communications, and emergency procedures",
      "A test entry by the supervisor to check conditions",
      "A phone call to the HSE to notify them of the entry"
    ],
    correctAnswer: 1,
    explanation: "A pre-entry briefing must be conducted immediately before every confined space entry. This briefing must cover the specific hazards identified, the control measures in place, the SSoW, the communication methods, time limits, the emergency procedure, and the roles of each team member. Even experienced workers who have entered the same space before must receive a briefing — conditions can change, and complacency is a major cause of confined space incidents."
  }
];

export default function ConfinedSpacesModule2Section3() {
  useSEO({
    title: "Safe Systems of Work | Confined Spaces Module 2.3",
    description: "Comprehensive pre-entry planning for confined spaces — the 12 key elements of a safe system of work including isolation, LOTO, atmospheric testing, ventilation, PPE, communication, and supervision.",
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
            <ShieldCheck className="h-7 w-7 text-cyan-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-500 text-xs font-semibold">MODULE 2 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Systems of Work
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The 12 key elements of pre-entry planning that keep people alive in confined spaces &mdash; from isolation and atmospheric testing to communication and supervision
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>What:</strong> A documented plan covering every aspect of a confined space entry</li>
              <li><strong>12 elements:</strong> Supervision, competence, isolation, cleaning, testing, ventilation, access, lighting, comms, PPE, equipment, time limits</li>
              <li><strong>Legal basis:</strong> Confined Spaces Regulations 1997, Regulation 4</li>
              <li><strong>Key document:</strong> Method statement with pre-entry briefing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before entry:</strong> Complete all 12 elements of the SSoW</li>
              <li><strong>LOTO:</strong> Positive isolation of ALL energy and substance sources</li>
              <li><strong>Test first:</strong> Atmosphere tested from outside before anyone enters</li>
              <li><strong>Never alone:</strong> Top person stationed at entry point at all times</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what constitutes a safe system of work (SSoW) for confined space entry",
              "Identify and describe the 12 key elements of a confined space SSoW",
              "Explain the purpose and procedure of lockout/tagout (LOTO) isolation",
              "Describe atmospheric testing requirements — when, how, and what to test for",
              "Understand the roles and competence requirements for supervisor, entrant, and top person",
              "Explain the purpose and content of method statements and pre-entry briefings"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ────────────────── SECTION 01 ────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">01</span>
            What Is a Safe System of Work?
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>safe system of work (SSoW)</strong> for confined space entry is a formal,
                documented procedure that sets out exactly how the work will be carried out safely.
                It is not a general intention to &ldquo;be careful&rdquo; &mdash; it is a detailed,
                step-by-step plan that addresses every foreseeable hazard and specifies the control
                measures that must be in place before, during, and after entry.
              </p>

              <p>
                The legal requirement comes from <strong>Regulation 4 of the Confined Spaces
                Regulations 1997</strong>, which states that no person at work shall enter or carry
                out work in a confined space unless there is a suitable and sufficient safe system
                of work in place. This must be based on a <strong>thorough risk assessment</strong> specific
                to the confined space and the task being performed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Why a SSoW Is Essential</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Confined space hazards can be immediately fatal</strong> &mdash;
                      unlike many workplace risks where exposure builds over time, a confined space
                      can kill in seconds (oxygen depletion) or minutes (toxic gas exposure). There
                      is no margin for error.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards are often invisible</strong> &mdash;
                      you cannot see, smell, or taste many of the gases that accumulate in confined
                      spaces. Without systematic testing and control, workers may enter a space that
                      looks perfectly safe but is in fact lethal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rescue is extremely difficult</strong> &mdash;
                      if something goes wrong inside a confined space, getting the person out quickly
                      and safely is one of the hardest challenges in workplace rescue. Prevention
                      through proper planning is far more effective than relying on rescue.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Multiple fatalities are common</strong> &mdash;
                      when confined space incidents occur, it is common for rescuers to become
                      additional casualties. A proper SSoW with trained personnel and emergency
                      arrangements prevents this cascade effect.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">HSE Guidance:</strong> The Approved Code of
                  Practice (ACoP) L101 &ldquo;Safe work in confined spaces&rdquo; provides
                  detailed guidance on what a safe system of work should contain. The ACoP has
                  special legal status &mdash; if an employer is prosecuted for a breach of the
                  Confined Spaces Regulations and has not followed the ACoP, a court will find
                  them at fault unless they can demonstrate they complied with the Regulations in
                  an equivalent or better way.
                </p>
              </div>

              <p>
                The SSoW must be <strong>specific to each entry</strong>. Even if the same space
                is entered regularly, conditions can change between entries. A SSoW that was
                adequate last week may not be adequate today if something has changed &mdash; a
                new substance has been introduced, the weather has affected conditions, or
                different work is being carried out. The SSoW must be reviewed and, if necessary,
                revised before every entry.
              </p>
            </div>
          </div>
        </section>

        {/* ────────────────── SECTION 02 ────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">02</span>
            Supervision, Competence &amp; Roles
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every confined space entry requires clearly defined roles with personnel who
                are <strong>competent</strong> to fulfil them. The three critical roles are the
                <strong> supervisor</strong>, the <strong>entrant(s)</strong>, and the
                <strong> top person</strong> (standby person/attendant).
              </p>

              {/* Supervisor */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">1. The Appointed Supervisor</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Must be <strong className="text-white">formally appointed</strong> by the
                      employer and have the authority to stop work immediately if conditions become
                      unsafe.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Must have <strong className="text-white">adequate training and experience</strong> in
                      confined space work, including knowledge of the specific hazards present, the
                      control measures required, and the emergency procedures.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Responsible for ensuring all elements of the SSoW are in place before
                      authorising entry, monitoring work throughout, and ensuring the space is left
                      safe after completion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Must be present on site (not necessarily at the entry point at all times,
                      but available and in charge). May supervise more than one activity only if
                      doing so does not compromise safety.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Entrants */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">2. The Entrant(s)</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Must be <strong className="text-white">trained in confined space entry</strong>,
                      including the specific hazards they may encounter, the correct use of all
                      equipment and PPE, communication protocols, and what to do in an emergency.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Must be <strong className="text-white">medically fit</strong> for confined
                      space work. This includes physical fitness to climb, work in awkward
                      positions, and wear RPE, as well as an assessment of claustrophobia and any
                      medical conditions that could be affected by the confined space environment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Must understand the SSoW, attend the pre-entry briefing, and follow the plan
                      precisely. If they encounter anything unexpected, they must stop work and
                      communicate with the top person immediately.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Top Person */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">3. The Top Person (Standby Person / Attendant)</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Must <strong className="text-white">remain at the entry point at ALL
                      times</strong> during the entry. They must never leave their post and must
                      never enter the confined space under any circumstances.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Maintains <strong className="text-white">continuous communication</strong> with
                      the entrant(s) and monitors their condition. Keeps a log of who is inside the
                      space and the time of entry.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Prevents <strong className="text-white">unauthorised entry</strong> to the
                      confined space.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Raises the alarm</strong> and initiates the
                      emergency procedure if the entrant becomes unresponsive, shows signs of
                      distress, or if atmospheric monitoring alarms activate.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  The top person must <strong>NEVER enter the confined space</strong>, even if the
                  entrant appears to be in trouble. Untrained or unequipped would-be rescuers
                  entering a hazardous atmosphere account for <strong>over 60% of confined space
                  fatalities</strong>. The top person&rsquo;s job is to summon the trained rescue
                  team &mdash; not to become the next casualty.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ────────────────── SECTION 03 ────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">03</span>
            Isolation &amp; Lockout/Tagout (LOTO)
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before anyone enters a confined space, all sources of energy, substances, and
                materials that could endanger the entrants must be <strong>positively
                isolated</strong>. This means physically disconnecting or locking them in a safe
                state so they cannot be accidentally re-energised or reconnected. Simply turning
                off a switch or closing a valve is <strong>not</strong> positive isolation &mdash;
                these can be reversed by someone who does not know that people are inside the space.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Types of Isolation Required</p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Electrical isolation</strong> &mdash; disconnect
                      and lock off all electrical supplies to equipment within or connected to the
                      confined space. This includes motors, pumps, agitators, heating elements, and
                      lighting circuits (which will be replaced with temporary safe lighting). Use
                      lockout devices, remove fuses, or physically disconnect cables. Prove dead
                      before entry.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mechanical isolation</strong> &mdash; isolate
                      all mechanical equipment such as mixers, agitators, conveyors, augers, and
                      rotating machinery. Use physical locks, removal of drive belts, or insertion
                      of physical blocks to prevent movement. Stored energy (springs, counterweights,
                      hydraulic pressure) must be released or restrained.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Piping and process isolation</strong> &mdash;
                      isolate all pipes that carry substances into or through the confined space.
                      This includes chemicals, steam, compressed air, water, and gases.
                      <strong> Double block and bleed</strong> is the preferred method &mdash; two
                      isolation valves are closed with a vent (bleed) valve opened between them. For
                      higher-risk situations, <strong>blank flanges</strong> (spade plates) should be
                      inserted to provide absolute physical disconnection.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pneumatic and hydraulic isolation</strong> &mdash;
                      depressurise all pneumatic and hydraulic systems connected to the space.
                      Residual pressure in accumulators and lines must be safely vented before
                      entry.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The <strong>lockout/tagout (LOTO)</strong> procedure ensures that each isolation
                point is secured with a physical lock that can only be removed by the person who
                applied it (or through a controlled management override procedure). Each person
                who will enter the confined space should apply their own personal padlock to the
                isolation point. The locks are only removed after everyone has exited and the
                space has been declared clear.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">LOTO Procedure &mdash; Key Steps</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Identify All Energy Sources</p>
                      <p>Review drawings, process diagrams, and carry out a physical walk-down to identify every energy source, pipe connection, and substance that could affect the confined space.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Notify All Affected Personnel</p>
                      <p>Inform everyone who may be affected that isolation is taking place and that the equipment/system must not be operated until the locks are removed.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Shut Down &amp; Isolate</p>
                      <p>Follow the correct shutdown sequence. Operate isolation devices (switches, valves, disconnectors) to the safe (off) position. Release any stored energy.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Apply Locks &amp; Tags</p>
                      <p>Attach personal padlocks and warning tags to each isolation point. Tags must state: who applied them, the date and time, the reason for isolation, and a contact number.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-white font-medium">Verify Isolation (Prove Dead)</p>
                      <p>Test that the isolation is effective. For electrical systems, use a voltage tester (proved before and after use). For mechanical systems, try to start the equipment. For piping, check the bleed valve for leakage. Never assume isolation is effective without testing.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-white font-medium">Controlled Removal After Completion</p>
                      <p>After all entrants have exited and the space is declared clear, each person removes their own personal lock. The supervisor confirms all personnel are accounted for before any lock is removed.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Fatal Consequence</p>
                </div>
                <p className="text-sm text-white/80">
                  Failure to properly isolate has caused numerous fatalities. Workers have been
                  killed by: agitators starting up whilst they were inside vessels, toxic chemicals
                  flowing into spaces through unisolated pipework, and electrical equipment being
                  re-energised whilst maintenance was in progress. <strong>Positive isolation with
                  personal locks is the only acceptable standard.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Diagram 1: Isolation/LOTO Sequence ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">&mdash;</span>
            Isolation / LOTO Sequence
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <div className="flex flex-col items-center gap-2">
              {[
                { step: "1", label: "Identify all energy sources & substance connections", colour: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40" },
                { step: "2", label: "Notify all affected personnel", colour: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40" },
                { step: "3", label: "Shut down equipment using normal controls", colour: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40" },
                { step: "4", label: "Operate isolation devices to safe position", colour: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40" },
                { step: "5", label: "Release / restrain stored energy", colour: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40" },
                { step: "6", label: "Apply personal padlocks & warning tags", colour: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" },
                { step: "7", label: "Verify isolation — prove dead / test bleed", colour: "bg-red-500/20 text-red-400 border-red-500/40" },
                { step: "8", label: "Entry authorised — work proceeds under SSoW", colour: "bg-green-500/20 text-green-400 border-green-500/40" },
              ].map((item, i) => (
                <div key={i} className="w-full max-w-md">
                  <div className={`flex items-center gap-3 p-3 rounded-lg border ${item.colour}`}>
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-white/10 text-xs font-bold flex-shrink-0">
                      {item.step}
                    </span>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                  {i < 7 && (
                    <div className="flex justify-center">
                      <div className="w-0.5 h-4 bg-white/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-white/40 text-xs mt-4">
              After work: each person removes own lock &rarr; supervisor confirms all clear &rarr; reinstatement
            </p>
          </div>
        </section>

        {/* ────────────────── SECTION 04 ────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">04</span>
            Cleaning, Purging &amp; Ventilation
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before entry, the confined space must be made as safe as reasonably practicable.
                This often requires <strong>cleaning out residues</strong>, <strong>purging the
                atmosphere</strong>, and <strong>providing adequate ventilation</strong>.
              </p>

              {/* Cleaning */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Cleaning &amp; Purging Before Entry</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Remove residues</strong> &mdash; tanks, vessels,
                      and chambers may contain residual chemicals, sludge, scale, or biological
                      matter that can release hazardous gases or present contact hazards. These
                      residues must be removed before entry where practicable, using methods such
                      as draining, washing out, steam cleaning, or vacuum extraction.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Purge the atmosphere</strong> &mdash; if the
                      space has contained flammable or toxic gases, it must be purged with fresh air
                      (or an inert gas followed by fresh air) to displace the hazardous atmosphere.
                      Purging must continue until atmospheric testing confirms the atmosphere is safe
                      for entry.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Beware of disturbance</strong> &mdash; some
                      residues release hazardous gases when disturbed. Sludge on the bottom of
                      tanks, for example, can release hydrogen sulphide or methane when it is
                      walked on or shovelled. The cleaning process itself may create new hazards
                      that must be controlled.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Ventilation */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Ventilation</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Natural ventilation</strong> is rarely adequate
                      for confined spaces. The very nature of a confined space &mdash; limited
                      openings, poor air circulation &mdash; means that natural airflow cannot be
                      relied upon to maintain a safe atmosphere.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Forced (mechanical) ventilation</strong> is
                      required in most cases. A fan or blower is used to push or pull fresh air
                      through the space. The ventilation must be arranged so that fresh air reaches
                      the area where people are working, not just the entry point.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Air supply source</strong> &mdash; the fresh
                      air inlet must draw from a location that is free from contamination. It must
                      not be positioned near vehicle exhausts, generator outlets, chemical stores,
                      or any other source of contaminated air.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Continuous operation</strong> &mdash;
                      ventilation must run continuously throughout the entry, not just before it.
                      Work activities (welding, painting, use of chemicals, cutting) can generate
                      fumes and deplete oxygen, so continuous fresh air supply is essential.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Important:</strong> Ventilation is a control
                  measure, not a substitute for atmospheric testing. Even with forced ventilation
                  running, the atmosphere must still be tested before entry and monitored
                  continuously during the work. Ventilation can fail (equipment breakdown, blocked
                  ducts) and the atmosphere can deteriorate faster than ventilation can correct it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────── SECTION 05 ────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">05</span>
            Atmospheric Testing &amp; Continuous Monitoring
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Atmospheric testing is one of the most critical elements of the SSoW. The
                atmosphere inside a confined space can be <strong>immediately dangerous to life
                or health (IDLH)</strong>, and because many hazardous gases are invisible and
                odourless, testing with calibrated instruments is the only reliable method of
                assessment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Pre-Entry Testing Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Test from OUTSIDE first</strong> &mdash; never
                      enter a confined space to take the first reading. Use equipment with remote
                      sampling probes, sampling lines, or diffusion tubes that can be lowered into
                      the space from outside the entry point.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Test at multiple levels</strong> &mdash;
                      different gases have different densities. Heavier gases (CO₂, H₂S, solvent
                      vapours) sink to the bottom; lighter gases (methane, hydrogen) rise to the
                      top. Test at top, middle, and bottom of the space as a minimum.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Allow adequate purge time</strong> &mdash;
                      after ventilation has been running, allow sufficient time for the atmosphere
                      to stabilise before testing. Testing immediately after purging may give a
                      falsely reassuring reading.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">What to Test For (Minimum)</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-1">Oxygen (O₂)</p>
                    <p className="text-white text-sm font-medium">19.5% &ndash; 20.9%</p>
                    <p className="text-white/60 text-xs mt-1">Below 19.5% = oxygen deficient. Above 23.5% = oxygen enriched (fire/explosion risk).</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-1">Flammable Gases</p>
                    <p className="text-white text-sm font-medium">&lt; 10% LEL</p>
                    <p className="text-white/60 text-xs mt-1">LEL = Lower Explosive Limit. Must be below 10% of LEL. At 100% LEL the atmosphere is explosive.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-1">Toxic Gases</p>
                    <p className="text-white text-sm font-medium">Below WEL</p>
                    <p className="text-white/60 text-xs mt-1">Common: CO (&lt;30 ppm), H₂S (&lt;5 ppm). Must be below workplace exposure limits.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Continuous Monitoring During Entry</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Personal gas monitors</strong> &mdash; each
                      entrant should wear a personal multi-gas detector that provides continuous
                      real-time readings and audible/visual alarms if safe limits are exceeded.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fixed monitors</strong> &mdash; in addition to
                      personal monitors, fixed monitoring heads may be placed at critical locations
                      within the space (e.g. near the work area, at low points where heavy gases
                      accumulate).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Calibration</strong> &mdash; all gas detection
                      equipment must be properly calibrated and maintained in accordance with the
                      manufacturer&rsquo;s instructions. Equipment should be bump-tested before
                      each use and formally calibrated at the required intervals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Alarm response</strong> &mdash; if any monitor
                      alarms, all personnel must evacuate immediately. No one re-enters until the
                      cause has been identified, the atmosphere has been made safe, and the
                      supervisor has authorised re-entry.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Never Trust Your Senses</p>
                </div>
                <p className="text-sm text-white/80">
                  Many of the most dangerous confined space gases &mdash; including carbon
                  monoxide, nitrogen, and argon &mdash; are <strong>completely odourless and
                  invisible</strong>. Hydrogen sulphide has a distinctive &ldquo;rotten egg&rdquo;
                  smell at low concentrations, but at higher (lethal) concentrations it
                  <strong> paralyses the sense of smell</strong>, giving a false impression that
                  the gas has cleared. Only calibrated instruments can reliably assess the
                  atmosphere.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ────────────────── SECTION 06 ────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">06</span>
            Access, Egress, Lighting &amp; Communication
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The physical arrangements for getting into, working inside, and getting out of
                a confined space must be carefully planned. In an emergency, these arrangements
                may mean the difference between life and death.
              </p>

              {/* Access & Egress */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Access &amp; Egress</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Entry openings</strong> &mdash; assess whether
                      the entry point is large enough for personnel wearing full PPE and RPE to
                      enter and exit comfortably. Some confined spaces have very small manholes
                      (e.g. 450mm diameter) that restrict the type of equipment that can be used
                      and significantly complicate rescue.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ladders and platforms</strong> &mdash; provide
                      suitable means of climbing into and out of the space. Fixed ladders must be
                      inspected before use. Temporary ladders must be secured. Platforms may be
                      needed if the work is at height within the space.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Clear escape routes</strong> &mdash; the route
                      from the working area to the exit must be kept clear at all times. Tools,
                      equipment, hoses, and cables must be routed so they do not obstruct the escape
                      path. In an emergency, the entrant must be able to reach the exit without
                      having to navigate obstacles.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rescue considerations</strong> &mdash; access
                      and egress must also be planned from the perspective of rescue. Can an
                      unconscious person be extracted through the entry point? Is a tripod and
                      winch needed? The rescue plan must account for the physical constraints of
                      the space.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Lighting */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Lighting</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Adequate illumination</strong> &mdash; the
                      entrant must be able to see clearly to carry out the work safely, to read
                      instruments and monitors, and to navigate the escape route. Temporary
                      lighting must be provided if the space has no natural light.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reduced voltage</strong> &mdash; in damp or
                      conductive confined spaces, portable lighting should be reduced voltage
                      (typically 25V from a centre-tapped transformer, or 50V from a safety
                      isolating transformer) to minimise the risk of electric shock.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">ATEX-rated lighting</strong> &mdash; if there
                      is any possibility of a flammable atmosphere, all lighting and electrical
                      equipment must be <strong>ATEX-rated</strong> (intrinsically safe). Standard
                      torches, head lamps, and portable lights are NOT suitable in potentially
                      explosive atmospheres &mdash; a single spark could cause an explosion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency lighting</strong> &mdash; consider
                      providing a backup light source in case the primary lighting fails. In total
                      darkness inside a confined space, evacuation becomes extremely difficult and
                      dangerous.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Communication */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Communication</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Visual and verbal contact</strong> &mdash; in
                      simple spaces where the entrant is close to the entry point, direct voice
                      communication and visual contact may be sufficient. The top person must be
                      able to see or clearly hear the entrant at all times.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Electronic communication</strong> &mdash; in
                      larger, more complex, or noisy spaces, electronic communication systems are
                      essential. Intrinsically safe two-way radios, hardwired intercom systems, or
                      tethered communication cables may be used depending on the environment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pre-agreed signals</strong> &mdash; where voice
                      communication is difficult (e.g. when wearing full-face RPE), pre-agreed hand
                      signals or rope signals (tug codes) should be established. Everyone involved
                      must know and understand the signals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Regular check-ins</strong> &mdash; the top
                      person must communicate with the entrant at agreed intervals (e.g. every 5
                      minutes) and treat any failure to respond as an emergency requiring immediate
                      activation of the rescue procedure.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────── SECTION 07 ────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">07</span>
            PPE, RPE, Equipment &amp; Time Limits
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The selection of personal protective equipment (PPE), respiratory protective
                equipment (RPE), and work equipment for confined space entry must be based on the
                risk assessment. The wrong equipment &mdash; or equipment that is not properly
                fitted, maintained, or used &mdash; provides a false sense of security and can
                contribute to incidents.
              </p>

              {/* PPE & RPE */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">PPE &amp; RPE Selection</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">RPE type depends on the hazard</strong> &mdash;
                      filtering RPE (half-mask or full-face with appropriate filters) is only
                      suitable where the atmosphere contains sufficient oxygen (above 19.5%) and
                      the contaminant type and concentration are known. In oxygen-deficient
                      atmospheres, atmospheres with unknown contaminants, or IDLH conditions,
                      <strong> self-contained breathing apparatus (SCBA)</strong> or
                      <strong> airline breathing apparatus</strong> must be used.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Face-fit testing</strong> &mdash; all tight-fitting
                      RPE must be face-fit tested to the individual wearer. A face mask that does
                      not seal properly to the wearer&rsquo;s face provides little or no protection.
                      This is a legal requirement under the Control of Substances Hazardous to
                      Health Regulations 2002 (COSHH).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Protective clothing</strong> &mdash; the type
                      of clothing depends on the hazards present: chemical-resistant suits for
                      chemical splash risks, disposable coveralls for contamination, flame-retardant
                      overalls where hot work is carried out, and waterproof clothing in wet
                      environments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fall protection</strong> &mdash; if there is a
                      risk of falling within the space (vertical entry, deep chambers, internal
                      structures), a full-body harness with a retrieval line connected to a tripod
                      and winch at the entry point must be worn. This also enables non-entry rescue
                      if the entrant becomes incapacitated.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Tools & Equipment */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Tools &amp; Equipment</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Intrinsically safe equipment</strong> &mdash;
                      in spaces where a flammable atmosphere may be present, all electrical and
                      electronic equipment must be intrinsically safe (ATEX-rated). This includes
                      torches, radios, cameras, gas monitors, and any power tools.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reduced voltage</strong> &mdash; portable
                      electrical equipment in confined spaces should operate at reduced voltage.
                      The specific voltage depends on conditions: 110V centre-tapped to earth (55V
                      to earth) is standard for construction in the UK; 25V or even battery power
                      may be required in particularly wet or conductive spaces.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Non-sparking tools</strong> &mdash; in
                      flammable atmospheres, hand tools should be non-sparking (brass, bronze, or
                      beryllium copper alloy) to prevent ignition from impact or friction sparks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rescue equipment</strong> &mdash; appropriate
                      rescue equipment must be available at the entry point before any entry takes
                      place. This typically includes: tripod and winch, retrieval lines, SCBA for
                      rescue team, first aid equipment, and stretcher suitable for extraction
                      through the entry opening.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Time Limits */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Time Limits for Entry</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Set before entry</strong> &mdash; the maximum
                      duration of each entry must be determined as part of the risk assessment and
                      stated in the SSoW. The time limit must account for the air supply duration
                      (if SCBA is worn), physical exertion, temperature conditions, and the
                      complexity of the work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Strictly enforced</strong> &mdash; the top
                      person must track entry times and recall entrants before the time limit is
                      reached. The limit is absolute &mdash; it must not be extended during the
                      entry, even if the work is nearly complete. If more time is needed, the
                      entrant must exit, rest, and a new entry can be planned.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Typical limits</strong> &mdash; in hot, humid,
                      or physically demanding conditions, entry may be limited to <strong>15&ndash;20
                      minutes</strong>. With SCBA, the limit is determined by the air cylinder
                      capacity (typically 20&ndash;40 minutes depending on the set). In cooler
                      conditions with forced ventilation and a safe atmosphere, longer periods may
                      be acceptable, but regular breaks must still be enforced.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ── Diagram 2: 12-Element Safe System of Work ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">&mdash;</span>
            The 12-Element Safe System of Work
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <p className="text-white/60 text-xs text-center mb-4">
              Every confined space entry must address all 12 elements below
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { num: "01", title: "Competent Supervisor", desc: "Formally appointed, trained, authority to stop work" },
                { num: "02", title: "Competent Personnel", desc: "Trained entrants and top person, medically fit" },
                { num: "03", title: "Isolation (LOTO)", desc: "Positive isolation of all energy, substances, and mechanical hazards" },
                { num: "04", title: "Cleaning & Purging", desc: "Remove residues, purge atmosphere before entry" },
                { num: "05", title: "Atmospheric Testing", desc: "Test O₂, flammables, toxics from outside first" },
                { num: "06", title: "Ventilation", desc: "Forced mechanical ventilation, clean air source, continuous" },
                { num: "07", title: "Access & Egress", desc: "Suitable openings, ladders, clear escape routes" },
                { num: "08", title: "Lighting", desc: "Adequate illumination, reduced voltage, ATEX-rated if required" },
                { num: "09", title: "Communication", desc: "Visual/verbal/electronic, regular check-ins, pre-agreed signals" },
                { num: "10", title: "PPE & RPE", desc: "Correct selection based on assessment, face-fit tested" },
                { num: "11", title: "Tools & Equipment", desc: "Intrinsically safe, reduced voltage, non-sparking" },
                { num: "12", title: "Time Limits", desc: "Set before entry, strictly enforced by top person" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="flex items-center justify-center min-w-[32px] h-8 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <p className="text-sm text-center text-white">
                <strong className="text-cyan-400">Plus:</strong> Method statement, pre-entry briefing, emergency &amp; rescue plan, and permit to work
              </p>
            </div>
          </div>
        </section>

        {/* ────────────────── SECTION 08 ────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">08</span>
            Method Statements, Pre-Entry Briefing &amp; Supervision During Work
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The SSoW must be documented in a <strong>method statement</strong> &mdash; a
                written document that describes, in clear and specific terms, how the confined
                space entry will be carried out safely. This is not optional paperwork; it is the
                reference document that all personnel follow and that provides evidence of
                planning in the event of an incident or inspection.
              </p>

              {/* Method Statement */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Method Statement &mdash; Key Contents</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Description of the confined space and the work to be carried out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Summary of the risk assessment findings and identified hazards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>The control measures for each hazard (all 12 elements addressed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Names and roles of all personnel (supervisor, entrants, top person, rescue team)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Sequence of operations &mdash; step-by-step procedure from preparation to completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>PPE, RPE, and equipment requirements (specific items, not generic lists)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Communication methods and check-in intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Time limits and break schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Emergency and rescue procedures (covered in detail in Section 4)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Atmospheric monitoring requirements and action levels</span>
                  </li>
                </ul>
              </div>

              {/* Pre-Entry Briefing */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Pre-Entry Briefing</p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Immediately before every confined space entry, the supervisor must conduct a
                    <strong className="text-white"> pre-entry briefing</strong> (sometimes called a
                    toolbox talk) with all personnel involved. This briefing must cover:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>The specific hazards of this confined space and this task</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>The control measures in place and how they work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>Each person&rsquo;s role and responsibilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>Communication methods and check-in intervals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>The emergency procedure &mdash; what to do if something goes wrong</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>Time limits and break arrangements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>An opportunity for anyone to ask questions or raise concerns</span>
                    </li>
                  </ul>
                  <p>
                    The briefing must be conducted for <strong className="text-white">every
                    entry</strong>, not just the first one. Conditions can change, personnel may
                    rotate, and complacency must be actively countered. If any team member is unsure
                    about any aspect of the plan, entry must not proceed until they are fully
                    satisfied.
                  </p>
                </div>
              </div>

              {/* Supervision During Work */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Supervision &amp; Monitoring During Work</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">The supervisor must remain available</strong> throughout
                      the entry to make decisions and respond to changes. They must be informed
                      immediately of any abnormalities or deviations from the plan.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Atmospheric monitoring must be continuous</strong> &mdash;
                      not just pre-entry. The supervisor or top person must monitor the readings
                      from outside the space if remote monitoring is in use.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stop work authority</strong> &mdash; any
                      member of the team has the right and obligation to stop work if they believe
                      conditions have become unsafe. This must be established during the pre-entry
                      briefing and reinforced by the supervisor. No one should feel pressured to
                      continue working if they have safety concerns.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dynamic risk assessment</strong> &mdash;
                      conditions in confined spaces can change rapidly. The supervisor and entrant
                      must continually reassess the situation and be prepared to evacuate
                      immediately if conditions deteriorate. Weather changes, unexpected
                      substances, equipment failures, and work-generated hazards (fumes from
                      welding, dust from grinding) must all be assessed in real time.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">After Work Completion:</strong> When the work
                  is finished, all personnel must exit the space, all equipment and materials must
                  be removed, the space must be inspected to ensure nothing has been left behind,
                  and the entry log must be closed out. LOTO devices are removed in the controlled
                  sequence, and the supervisor formally closes the permit to work. Any ongoing
                  hazards or incomplete work must be communicated to the next shift or the asset
                  owner.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The Human Factor</p>
                </div>
                <p className="text-sm text-white/80">
                  Many confined space fatalities occur not because the SSoW was inadequate on paper,
                  but because it was not <strong>followed in practice</strong>. Common failures
                  include: skipping the pre-entry briefing because &ldquo;we&rsquo;ve done this
                  space before&rdquo;, not testing the atmosphere because &ldquo;it was fine
                  yesterday&rdquo;, removing LOTO locks early because &ldquo;the job is nearly
                  done&rdquo;, and the top person leaving their post to help with other tasks.
                  <strong> Complacency kills.</strong> The SSoW must be followed in full, every
                  time, without exception.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Permit to Work Systems
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-2-section-4">
              Next: Emergency &amp; Rescue Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
