import { ArrowLeft, Settings, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "lev-testing-interval",
    question:
      "Under COSHH Regulation 9, how often must local exhaust ventilation (LEV) systems undergo thorough examination and testing?",
    options: [
      "Every 6 months for all processes without exception",
      "At least every 14 months (or every 6 months for certain specified processes)",
      "Only when a fault is reported by the operator",
      "Every 24 months as part of the general workplace inspection",
    ],
    correctIndex: 1,
    explanation:
      "COSHH Regulation 9 requires LEV systems to be thoroughly examined and tested at least every 14 months. For certain higher-risk processes — such as those involving lead, asbestos, or substances with very high toxicity — the interval is reduced to every 6 months. The employer must keep records of all examinations for at least 5 years.",
  },
  {
    id: "general-vs-lev",
    question:
      "When is general (dilution) ventilation appropriate as a control measure for hazardous substances?",
    options: [
      "When the substance has a very low workplace exposure limit (WEL) and is highly toxic",
      "For low-toxicity substances released at low, uniform rates in well-mixed airflow",
      "Whenever LEV is too expensive to install on site",
      "Only in outdoor work environments where natural wind provides dilution",
    ],
    correctIndex: 1,
    explanation:
      "General ventilation works by diluting contaminated air with fresh air. It is only appropriate for low-toxicity substances released at low and relatively uniform rates, where the airflow pattern ensures adequate mixing. It is NOT suitable for highly toxic substances, substances with low WELs, dust-generating processes, or situations where workers are close to the source of release.",
  },
  {
    id: "maintenance-reg-8",
    question:
      "Under COSHH Regulation 8, what is the employer's duty regarding engineering controls?",
    options: [
      "Install engineering controls only if employees request them in writing",
      "Ensure all control measures are maintained in an efficient state, in efficient working order, and in good repair",
      "Replace engineering controls with PPE if maintenance costs become excessive",
      "Carry out a visual inspection of controls once per calendar year",
    ],
    correctIndex: 1,
    explanation:
      "COSHH Regulation 8 places a clear duty on employers to ensure that all control measures provided under Regulation 7 — including engineering controls — are maintained in an efficient state, in efficient working order, and in good repair. This requires a planned programme of maintenance, not just reactive repairs when something breaks down.",
  },
];

const faqs = [
  {
    question:
      "Do I need LEV every time I chase a wall for cables?",
    answer:
      "Yes, chasing walls generates significant quantities of silica dust (from brick, block, and morite) and potentially other hazardous dusts depending on the wall construction. The HSE expects on-tool extraction (a dust-extracting disc cutter or SDS drill with integrated extraction) as the primary control, supplemented by RPE. A standard SDS drill without extraction, even with an RPE mask, is not an adequate control for prolonged chasing work. The COSHH assessment for the task must specify the controls required. Many modern wall chasers have built-in LEV connections — always use them.",
  },
  {
    question:
      "What is the difference between on-tool extraction and a standalone LEV unit?",
    answer:
      "On-tool extraction is built into or attached directly to the power tool itself — for example, a shroud on an angle grinder connected to an M-class or H-class vacuum, or a core drill with an integrated dust collection system. It captures dust at the exact point of generation. A standalone LEV unit is a separate system positioned near the work — such as a portable fume extractor placed next to a soldering station. On-tool extraction is generally more effective because the capture point is right at the source, but standalone units are necessary when the tool cannot be fitted with extraction (for example, hand soldering with a fine tip).",
  },
  {
    question:
      "How do I know if my LEV system is working properly?",
    answer:
      "There are three levels of checking. First, daily user checks: before each use, verify that the system starts, the airflow feels correct at the hood/capture point, there are no obvious blockages, damaged ducting, or unusual noises, and the filter indicator (if fitted) is in the normal range. Second, regular supervisor checks (weekly or monthly): more detailed visual inspection, checking capture velocity with smoke tubes, verifying filter condition, and checking for duct leaks. Third, the statutory thorough examination and test (TExT) under COSHH Regulation 9: carried out by a competent person at least every 14 months (or 6 months for specified processes), which includes airflow measurements, capture velocity testing, system pressure checks, and a written report with recommendations.",
  },
  {
    question:
      "Can I use natural ventilation instead of mechanical ventilation in an electrical plant room?",
    answer:
      "It depends on the hazards present and the room design. Natural ventilation (windows, louvres, passive stack vents) may be adequate in well-designed rooms where the only concern is general air quality and heat dissipation. However, if hazardous substances are present — for example, SF6 gas from switchgear, battery gases (hydrogen from lead-acid cells), solvent vapours from cleaning products, or fumes from cable jointing — then a risk assessment must determine whether natural ventilation provides sufficient dilution and air change rates. For many electrical plant rooms, mechanical ventilation with a specified air change rate is required by design standards (such as BS 7671 for battery rooms). Never assume natural ventilation is adequate without a proper assessment.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the PRIMARY purpose of engineering controls in COSHH?",
    options: [
      "To provide workers with comfortable working conditions and reduce noise levels",
      "To control exposure to hazardous substances at or near the source before they reach the worker's breathing zone",
      "To replace the need for risk assessments and COSHH data sheets",
      "To ensure compliance with building regulations for workplace ventilation",
    ],
    correctAnswer: 1,
    explanation:
      "Engineering controls are physical or mechanical measures designed to control exposure to hazardous substances at or near the source — preventing contaminants from reaching the worker's breathing zone. They sit third in the hierarchy of control (after elimination and substitution) and are preferred over administrative controls and PPE because they do not rely on human behaviour to be effective.",
  },
  {
    id: 2,
    question:
      "Which component of an LEV system is responsible for drawing contaminated air through the system?",
    options: [
      "The hood or enclosure at the capture point",
      "The air cleaner or filter unit",
      "The fan (also called the air mover)",
      "The discharge stack at the exhaust point",
    ],
    correctAnswer: 2,
    explanation:
      "The fan (air mover) is the component that creates the negative pressure which draws contaminated air into the hood, through the ducting, through the air cleaner, and out through the discharge point. Without the fan, there is no airflow. The fan must be correctly sized for the system — too small and capture velocity will be insufficient; too large and energy is wasted and noise increases.",
  },
  {
    id: 3,
    question:
      "A captor hood is positioned away from the source of contamination and must actively pull contaminants towards it. What is the MAIN limitation of captor hoods?",
    options: [
      "They are too expensive for most construction site applications",
      "Capture velocity drops rapidly with distance — doubling the distance reduces capture to about one-quarter",
      "They can only be used for gases and vapours, not for dusts or fumes",
      "They require a separate air cleaning system that total enclosures do not need",
    ],
    correctAnswer: 1,
    explanation:
      "The capture velocity of a captor hood falls off very rapidly with distance from the hood face. As a rule of thumb, doubling the distance from the hood reduces the capture velocity to approximately one-quarter. This means captor hoods must be positioned as close to the source as physically possible. Even a small increase in distance dramatically reduces their effectiveness. Cross-draughts can also deflect the contaminated air away from the hood.",
  },
  {
    id: 4,
    question:
      "Under COSHH Regulation 9, how long must records of LEV thorough examinations be kept?",
    options: [
      "1 year from the date of the examination",
      "3 years from the date of the examination",
      "At least 5 years from the date of the examination",
      "Indefinitely — records must never be destroyed",
    ],
    correctAnswer: 2,
    explanation:
      "COSHH Regulation 9(5) requires that records of every thorough examination and test of LEV equipment must be kept for at least 5 years from the date on which they were made. These records must be readily available for inspection by the HSE or local authority enforcement officers. The records should include the date of the test, the condition of the equipment, any repairs required, and the results of all performance measurements.",
  },
  {
    id: 5,
    question:
      "When using an angle grinder to cut a cable tray in an area with poor ventilation, what is the MOST effective engineering control?",
    options: [
      "Opening a window to increase natural ventilation in the room",
      "Fitting a dust/fume extraction shroud connected to an M-class or H-class vacuum",
      "Wearing an FFP3 disposable mask and safety goggles",
      "Limiting the cutting time to 15 minutes and taking a break",
    ],
    correctAnswer: 1,
    explanation:
      "On-tool extraction — fitting a shroud to the angle grinder connected to a suitable vacuum extractor — captures grinding dust and fumes at the point of generation. This is an engineering control and sits higher in the hierarchy than PPE (the FFP3 mask) or administrative controls (time limits). Opening a window provides some dilution but does not capture contaminants at source. The RPE and time limits may still be needed as additional measures, but the on-tool extraction should be the primary control.",
  },
  {
    id: 6,
    question:
      "What is the purpose of a process enclosure such as a glove box?",
    options: [
      "To store hazardous chemicals securely when not in use",
      "To completely contain the hazardous process so that no contaminant escapes into the workplace atmosphere",
      "To provide a clean area for workers to eat and drink during breaks",
      "To protect the product from contamination by airborne particles",
    ],
    correctAnswer: 1,
    explanation:
      "A process enclosure such as a glove box provides total containment of the hazardous process. The operator works through sealed glove ports, and the interior is typically maintained at negative pressure so that any leakage is inward (clean air into the enclosure) rather than outward (contaminated air into the workplace). Total enclosure is the most effective form of engineering control after elimination and substitution, because it physically separates the worker from the substance.",
  },
  {
    id: 7,
    question:
      "Which of the following is an example of process modification as an engineering control?",
    options: [
      "Providing workers with chemical-resistant gloves and safety goggles",
      "Replacing a manual powder-dispensing process with an automated closed-transfer system",
      "Displaying COSHH data sheets on a notice board near the work area",
      "Rotating workers every two hours to limit individual exposure time",
    ],
    correctAnswer: 1,
    explanation:
      "Replacing manual powder dispensing with an automated closed-transfer system is a process modification — it changes the physical process to reduce or eliminate the release of hazardous substances. Gloves and goggles are PPE (last resort). Displaying data sheets is an administrative control. Job rotation is also an administrative control. Process modification aims to change the way the work is done so that exposure is reduced at source.",
  },
  {
    id: 8,
    question:
      "An electrician is soldering joints on a cable tray in a plant room. What engineering control should be used to manage solder fumes?",
    options: [
      "A general-purpose desk fan to blow fumes away from the worker",
      "A portable fume extraction unit with a flexible arm positioned close to the soldering point",
      "An open door to allow fumes to disperse naturally into the corridor",
      "A carbon-activated air freshener placed on the work bench",
    ],
    correctAnswer: 1,
    explanation:
      "A portable fume extraction unit with a flexible arm (tip extraction) is the correct engineering control for soldering. The arm is positioned 50-100 mm from the soldering point to capture rosin flux fumes at source before they reach the worker's breathing zone. A desk fan simply moves contaminated air around (and may blow it into other workers' faces). An open door does not provide controlled extraction and would spread fumes into other areas. Fume extraction for soldering is a specific requirement under COSHH wherever soldering is carried out regularly.",
  },
];

export default function CoshhAwarenessModule4Section2() {
  useSEO({
    title: "Engineering Controls | COSHH Awareness Module 4.2",
    description:
      "Learn about engineering controls for hazardous substances: LEV systems, general ventilation, process enclosure, segregation, on-tool extraction, water suppression, and maintenance requirements under COSHH.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 border border-violet-500/30 mb-4">
            <Settings className="h-7 w-7 text-violet-400" />
          </div>
          <div className="inline-block bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-violet-400">MODULE 4</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Engineering Controls
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Physical and mechanical measures that control exposure to hazardous
            substances at or near the source — including LEV, ventilation,
            enclosure, segregation, and on-tool extraction
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="font-semibold text-violet-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Engineering controls:</strong>{" "}
                  physical measures that prevent hazardous substances reaching
                  workers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">LEV:</strong> captures
                  contaminants at the source — hood, ducting, filter, fan,
                  discharge
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Reg 9:</strong> LEV must be
                  examined and tested every 14 months (6 months for certain
                  processes)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Maintenance:</strong> Reg 8
                  requires all controls kept in efficient working order and good
                  repair
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="font-semibold text-violet-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Chasing walls:</strong> always
                  use on-tool extraction with an M-class or H-class vacuum
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Soldering:</strong> use tip
                  extraction or portable fume extractor — never solder without
                  extraction
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Plant rooms:</strong> check
                  ventilation is adequate before working — verify air change
                  rates
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Daily checks:</strong> inspect
                  LEV systems before use — airflow, filters, ducting, capture
                  velocity
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Define engineering controls and explain their position in the hierarchy of control for hazardous substances",
              "Identify the five main components of an LEV system and describe the function of each",
              "Distinguish between hood types (total enclosure, partial enclosure, receptor, captor) and select the appropriate type for a given task",
              "State the COSHH Regulation 9 requirements for thorough examination and testing of LEV systems",
              "Explain when general (dilution) ventilation is and is not appropriate as a control measure",
              "Describe process enclosure, process modification, and segregation as engineering control strategies",
              "Identify the correct on-tool extraction and water suppression methods for common electrical trade tasks",
              "Explain the COSHH Regulation 8 duty to maintain engineering controls and the records required",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-violet-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ======================================================
            Section 01: What Are Engineering Controls?
            ====================================================== */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">01</span>
              What Are Engineering Controls?
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Engineering controls</strong> are
                physical or mechanical measures that control exposure to
                hazardous substances at or near the source of generation —{" "}
                <strong className="text-white">before</strong> the contaminant
                reaches the worker&rsquo;s breathing zone. They sit third in the
                hierarchy of control, after elimination and substitution, and are
                preferred over administrative controls and PPE because they do
                not rely on human behaviour to be effective.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-violet-400">
                  Key Definition: Engineering Controls
                </h3>
                <p className="text-white/80 text-sm">
                  Engineering controls are{" "}
                  <strong className="text-white">
                    physical changes to the workplace, process, or equipment
                  </strong>{" "}
                  that reduce or eliminate worker exposure to hazardous
                  substances. Unlike PPE (which protects only the individual
                  wearing it) or administrative controls (which depend on people
                  following procedures), engineering controls provide protection
                  to{" "}
                  <strong className="text-white">
                    everyone in the work area
                  </strong>{" "}
                  and work continuously without relying on worker compliance.
                </p>
              </div>

              <p>
                Under{" "}
                <strong className="text-white">
                  COSHH Regulation 7
                </strong>
                , employers must ensure that exposure to hazardous substances is
                either prevented or, where that is not reasonably practicable,
                adequately controlled. Engineering controls are a primary means
                of achieving adequate control. The regulation explicitly states
                that PPE should only be used as a{" "}
                <strong className="text-white">last resort</strong> — after all
                other reasonably practicable measures have been applied.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-2">
                  Types of Engineering Controls
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Local exhaust ventilation (LEV):</strong>{" "}
                      captures contaminants at or near the point of release
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">General ventilation:</strong>{" "}
                      dilutes contaminants by supplying and exhausting air across
                      the whole workspace
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Process enclosure:</strong>{" "}
                      completely contains the hazardous process within a sealed
                      structure
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Process modification:</strong>{" "}
                      changes the process itself to reduce or eliminate
                      contaminant release
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Segregation:</strong>{" "}
                      physically separates the hazardous process from the general
                      work area
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">On-tool extraction:</strong>{" "}
                      extraction systems built into or attached to power tools
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Water suppression:</strong>{" "}
                      uses water to prevent dust becoming airborne during cutting
                      or drilling
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    Why Engineering Controls Come Before PPE
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Engineering controls are inherently more reliable than PPE
                  because they work{" "}
                  <strong className="text-white">independently of the worker</strong>.
                  An LEV system extracts fumes whether or not the worker
                  remembers to switch it on (if interlocked with the process). A
                  face mask only works if the worker puts it on correctly, has
                  been face-fit tested, does not have facial hair preventing the
                  seal, and wears it for the entire duration of exposure. In
                  practice, PPE compliance on construction sites is far from
                  perfect — which is precisely why engineering controls must
                  always be the first choice after elimination and substitution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Section 02: Local Exhaust Ventilation (LEV)
            ====================================================== */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Local Exhaust Ventilation (LEV)
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">
                  Local exhaust ventilation (LEV)
                </strong>{" "}
                is the most widely used engineering control for hazardous
                substances. It works by capturing contaminated air at or near the
                point where the substance is released and removing it from the
                workplace before it can be inhaled. A well-designed, properly
                maintained LEV system is highly effective — but a poorly
                designed or neglected system can give a false sense of security.
              </p>

              {/* LEV System Components Diagram */}
              <div className="my-6">
                <h3 className="text-violet-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  LEV System Components Diagram
                </h3>

                <div className="bg-white/5 border border-violet-400/30 rounded-lg p-4 sm:p-6">
                  <div className="space-y-0">
                    {/* Component flow */}
                    <div className="flex flex-col items-center gap-0">
                      {/* 1. Hood */}
                      <div className="w-full max-w-md rounded-lg bg-violet-500/15 border border-violet-400/30 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-violet-500/30 border border-violet-400/40 flex items-center justify-center flex-shrink-0">
                            <span className="text-violet-300 text-xs font-bold">1</span>
                          </div>
                          <div>
                            <p className="text-violet-300 font-bold text-sm">HOOD / ENCLOSURE</p>
                            <p className="text-white/60 text-xs">
                              Capture point — positioned at or around the source of contamination
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="w-0.5 h-4 bg-violet-400/40"></div>
                      <div className="text-violet-400/60 text-xs font-medium">Contaminated air flows in</div>
                      <div className="w-0.5 h-4 bg-violet-400/40"></div>

                      {/* 2. Ducting */}
                      <div className="w-full max-w-md rounded-lg bg-purple-500/15 border border-purple-400/30 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500/30 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                            <span className="text-purple-300 text-xs font-bold">2</span>
                          </div>
                          <div>
                            <p className="text-purple-300 font-bold text-sm">DUCTING</p>
                            <p className="text-white/60 text-xs">
                              Transports contaminated air from hood to air cleaner — must be airtight with smooth internal surfaces
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="w-0.5 h-4 bg-purple-400/40"></div>
                      <div className="text-purple-400/60 text-xs font-medium">Air transported through system</div>
                      <div className="w-0.5 h-4 bg-purple-400/40"></div>

                      {/* 3. Air cleaner */}
                      <div className="w-full max-w-md rounded-lg bg-fuchsia-500/15 border border-fuchsia-400/30 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-fuchsia-500/30 border border-fuchsia-400/40 flex items-center justify-center flex-shrink-0">
                            <span className="text-fuchsia-300 text-xs font-bold">3</span>
                          </div>
                          <div>
                            <p className="text-fuchsia-300 font-bold text-sm">AIR CLEANER / FILTER</p>
                            <p className="text-white/60 text-xs">
                              Removes contaminants from the airstream — HEPA filter, activated carbon, wet scrubber, or cyclone
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="w-0.5 h-4 bg-fuchsia-400/40"></div>
                      <div className="text-fuchsia-400/60 text-xs font-medium">Cleaned air continues</div>
                      <div className="w-0.5 h-4 bg-fuchsia-400/40"></div>

                      {/* 4. Fan */}
                      <div className="w-full max-w-md rounded-lg bg-pink-500/15 border border-pink-400/30 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-pink-500/30 border border-pink-400/40 flex items-center justify-center flex-shrink-0">
                            <span className="text-pink-300 text-xs font-bold">4</span>
                          </div>
                          <div>
                            <p className="text-pink-300 font-bold text-sm">FAN (AIR MOVER)</p>
                            <p className="text-white/60 text-xs">
                              Creates negative pressure that draws air through the entire system — positioned after the filter to protect fan blades
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="w-0.5 h-4 bg-pink-400/40"></div>
                      <div className="text-pink-400/60 text-xs font-medium">Clean air expelled</div>
                      <div className="w-0.5 h-4 bg-pink-400/40"></div>

                      {/* 5. Discharge */}
                      <div className="w-full max-w-md rounded-lg bg-rose-500/15 border border-rose-400/30 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-rose-500/30 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                            <span className="text-rose-300 text-xs font-bold">5</span>
                          </div>
                          <div>
                            <p className="text-rose-300 font-bold text-sm">DISCHARGE POINT</p>
                            <p className="text-white/60 text-xs">
                              Exhausts cleaned air safely — positioned away from air intakes, windows, and occupied areas
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-white/5 border border-violet-500/30 rounded-lg p-3">
                    <p className="text-violet-300 text-xs sm:text-sm font-medium">
                      All five components must work together. A failure in{" "}
                      <strong className="text-white">any single component</strong>{" "}
                      compromises the entire system. The most common failures are
                      blocked filters, leaking ducting, and hoods positioned too
                      far from the source.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hood Types Comparison Diagram */}
              <div className="my-6">
                <h3 className="text-violet-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Hood Types Comparison
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Total Enclosure */}
                  <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 text-[10px] font-bold">1</span>
                      </div>
                      <p className="text-green-300 font-bold text-sm">TOTAL ENCLOSURE</p>
                    </div>
                    <p className="text-white/70 text-xs mb-2">
                      Completely surrounds the source. Highest level of containment.
                    </p>
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-green-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Effectiveness</p>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400/60 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    <p className="text-white/50 text-[11px] mt-2">
                      Examples: glove boxes, fume cupboards, enclosed spray booths
                    </p>
                  </div>

                  {/* Partial Enclosure */}
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-300 text-[10px] font-bold">2</span>
                      </div>
                      <p className="text-blue-300 font-bold text-sm">PARTIAL ENCLOSURE</p>
                    </div>
                    <p className="text-white/70 text-xs mb-2">
                      Surrounds most of the source but has openings for access. Very effective when well designed.
                    </p>
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-blue-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Effectiveness</p>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400/60 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <p className="text-white/50 text-[11px] mt-2">
                      Examples: paint spray booths with open front, welding extraction booths
                    </p>
                  </div>

                  {/* Receptor Hood */}
                  <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-300 text-[10px] font-bold">3</span>
                      </div>
                      <p className="text-yellow-300 font-bold text-sm">RECEPTOR HOOD</p>
                    </div>
                    <p className="text-white/70 text-xs mb-2">
                      Positioned to receive contaminants that move naturally towards it (e.g. hot fumes rising).
                    </p>
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-yellow-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Effectiveness</p>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400/60 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <p className="text-white/50 text-[11px] mt-2">
                      Examples: canopy hoods over hot processes, slot hoods on welding benches
                    </p>
                  </div>

                  {/* Captor Hood */}
                  <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-300 text-[10px] font-bold">4</span>
                      </div>
                      <p className="text-orange-300 font-bold text-sm">CAPTOR HOOD</p>
                    </div>
                    <p className="text-white/70 text-xs mb-2">
                      Positioned away from the source — must actively pull contaminants towards it. Least effective type.
                    </p>
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-orange-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Effectiveness</p>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400/60 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                    <p className="text-white/50 text-[11px] mt-2">
                      Examples: flexible arm extractors, on-tool extraction nozzles
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-violet-500/30 rounded-lg p-3">
                  <p className="text-violet-300 text-xs sm:text-sm font-medium">
                    Always use the{" "}
                    <strong className="text-white">highest level of enclosure</strong>{" "}
                    that is reasonably practicable. Total enclosure is the most
                    effective. Captor hoods are the least effective because capture
                    velocity drops rapidly with distance — doubling the distance
                    reduces capture to about{" "}
                    <strong className="text-white">one-quarter</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Capture Velocity Requirements
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  The airspeed at the point of capture must be sufficient to
                  overcome the natural movement of the contaminant and any
                  competing air currents. Required capture velocities vary by
                  hazard:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Vapours/gases released at low velocity (e.g. evaporation
                        from open tank):
                      </strong>{" "}
                      <span className="text-purple-300">0.25 — 0.5 m/s</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Dusts/fumes released at moderate velocity (e.g.
                        grinding, soldering):
                      </strong>{" "}
                      <span className="text-purple-300">0.5 — 1.0 m/s</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Dusts released at high velocity (e.g. disc cutting,
                        chasing walls):
                      </strong>{" "}
                      <span className="text-purple-300">1.0 — 2.5 m/s</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Very high velocity release (e.g. abrasive blasting,
                        high-speed machining):
                      </strong>{" "}
                      <span className="text-purple-300">2.5 — 10+ m/s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    COSHH Regulation 9: Examination and Testing
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  Under COSHH Regulation 9, every LEV system must be{" "}
                  <strong className="text-white">
                    thoroughly examined and tested (TExT)
                  </strong>{" "}
                  by a competent person:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Standard interval:</strong>{" "}
                      at least every{" "}
                      <strong className="text-white">14 months</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">
                        Shortened interval (6 months):
                      </strong>{" "}
                      for processes involving certain blasting operations, work
                      in substantial enclosed spaces, or fumigation — as
                      specified in Schedule 4 of COSHH
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Records:</strong> must be
                      kept for at least{" "}
                      <strong className="text-white">5 years</strong> from the
                      date of examination
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">
                        Commissioning test:
                      </strong>{" "}
                      every LEV system must be performance-tested when first
                      installed to confirm it achieves the design capture
                      velocity and airflow
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Common LEV Failures and Prevention
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Hood too far from source
                      </p>
                      <p className="text-white/60">
                        Capture velocity drops rapidly with distance. Always
                        position the hood as close to the source as physically
                        possible. Even an extra 100 mm can significantly reduce
                        effectiveness.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Blocked or clogged filters
                      </p>
                      <p className="text-white/60">
                        Restricts airflow through the entire system. Check
                        filter indicators daily and replace filters on schedule
                        — not just when they appear visibly dirty.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Leaking or damaged ducting
                      </p>
                      <p className="text-white/60">
                        Gaps, cracks, or loose joints in ducting allow
                        contaminated air to escape into the workplace and reduce
                        suction at the hood. Inspect ducting regularly for
                        damage, particularly at joints and bends.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Cross-draughts deflecting capture
                      </p>
                      <p className="text-white/60">
                        Open doors, windows, fans, and passing traffic can
                        create cross-draughts that push contaminated air away
                        from the hood. Identify and control competing air
                        movements in the work area.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Fan worn or undersized
                      </p>
                      <p className="text-white/60">
                        A worn fan delivers less airflow than when new. Ensure
                        the fan is correctly sized for the system at the design
                        stage, and monitor performance over time. Fan belts,
                        bearings, and impellers all degrade with use.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ======================================================
            Section 03: General Ventilation
            ====================================================== */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              General Ventilation
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">General ventilation</strong>{" "}
                (also called dilution ventilation) works by supplying fresh air
                to a workspace and exhausting contaminated air, thereby reducing
                the overall concentration of airborne contaminants. Unlike LEV,
                which captures contaminants at source, general ventilation
                dilutes the contaminant across the whole room volume.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  Mechanical vs Natural Ventilation
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">M</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Mechanical Ventilation
                      </p>
                      <p className="text-white/60">
                        Uses fans, ductwork, and air handling units to supply and
                        extract air at a controlled rate. The air change rate can
                        be specified, measured, and adjusted. Mechanical
                        ventilation is <strong className="text-white">predictable and
                        controllable</strong> — it works regardless of weather
                        conditions, wind direction, or whether someone remembers
                        to open a window.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">N</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Natural Ventilation
                      </p>
                      <p className="text-white/60">
                        Relies on wind pressure and thermal buoyancy (the stack
                        effect) to move air through openings such as windows,
                        doors, louvres, and passive vents. Natural ventilation is{" "}
                        <strong className="text-white">
                          unpredictable and variable
                        </strong>{" "}
                        — it depends on external weather, wind speed and
                        direction, temperature differences, and the size and
                        position of openings. It cannot be relied upon as the
                        sole control measure for hazardous substances unless a
                        specific assessment confirms it is adequate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-teal-400 font-medium mb-2">
                  Air Change Rates
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  The{" "}
                  <strong className="text-white">air change rate</strong> is the
                  number of times the entire volume of air in a room is replaced
                  per hour. Different environments require different rates:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">General offices:</strong>{" "}
                      4&ndash;6 air changes per hour
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Workshops:</strong>{" "}
                      6&ndash;10 air changes per hour
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Battery charging rooms:</strong>{" "}
                      10&ndash;15 air changes per hour (to manage hydrogen gas)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">Transformer/switchgear rooms:</strong>{" "}
                      as per design specification — must account for SF6 release
                      risk and heat dissipation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Limitations of Dilution Ventilation
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  General ventilation is{" "}
                  <strong className="text-white">NOT suitable</strong> when:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>
                      The substance is highly toxic or has a very low workplace
                      exposure limit (WEL)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Large quantities of contaminant are released (the dilution
                      air volumes needed would be impractical)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Workers are positioned close to the source of release
                      (they would be exposed before dilution takes effect)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>
                      The contaminant is a dust or particulate (dilution does
                      not effectively control airborne particulates)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <span>
                      The release rate is variable or unpredictable (dilution
                      calculations assume a steady emission rate)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-violet-400">
                  When Is General Ventilation Appropriate?
                </h3>
                <p className="text-white/80 text-sm">
                  General ventilation can be effective for{" "}
                  <strong className="text-white">
                    low-toxicity substances released at low, uniform rates
                  </strong>{" "}
                  in a well-mixed workspace — for example, managing solvent
                  vapours from small cleaning operations, or maintaining air
                  quality in a large workshop where multiple low-level emission
                  sources are widely distributed. It is often used as a{" "}
                  <strong className="text-white">supplement</strong> to LEV
                  rather than a replacement — providing background air quality
                  while LEV handles the primary source of exposure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Section 04: Process Enclosure
            ====================================================== */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">04</span>
              Process Enclosure
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Process enclosure</strong>{" "}
                involves completely containing the hazardous process within a
                sealed or partially sealed structure so that no contaminant
                escapes into the workplace atmosphere. It is the{" "}
                <strong className="text-white">
                  most effective form of engineering control
                </strong>{" "}
                after elimination and substitution, because it physically
                separates the worker from the substance.
              </p>

              <div className="bg-white/5 border border-emerald-400/30 p-4 rounded-lg">
                <h3 className="text-emerald-300 font-medium mb-3">
                  Types of Enclosure
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Glove Boxes</p>
                      <p className="text-white/60">
                        Totally enclosed chambers with built-in glove ports. The
                        operator works through the gloves without direct contact
                        with the substance. Maintained at negative pressure so
                        any leakage is inward. Used for handling highly toxic
                        powders, carcinogens, and sensitisers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Total Enclosure Systems
                      </p>
                      <p className="text-white/60">
                        The entire process is contained within a sealed system
                        — for example, a closed reaction vessel, a sealed
                        conveyor, or an enclosed blending system. The operator
                        monitors and controls the process from outside. All
                        transfers of material into and out of the enclosure are
                        through sealed ports or closed-transfer couplings.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Interlocked Systems
                      </p>
                      <p className="text-white/60">
                        Enclosures fitted with{" "}
                        <strong className="text-white">interlock switches</strong>{" "}
                        that prevent the process from operating unless all access
                        panels are closed and sealed. If any panel is opened
                        during operation, the process shuts down automatically.
                        This prevents accidental exposure during maintenance or
                        adjustment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-violet-400">
                  Electrician Context: Enclosed Electrical Processes
                </h3>
                <p className="text-white/80 text-sm">
                  While you may not work with glove boxes directly, the
                  principle of enclosure applies to electrical work. For example,
                  SF6 (sulphur hexafluoride) switchgear is a sealed, enclosed
                  system specifically designed to prevent the gas escaping into
                  the workspace. Battery rooms in substations are effectively
                  enclosed and ventilated spaces designed to contain and extract
                  hydrogen gas generated during charging. Understanding enclosure
                  principles helps you recognise when a sealed system has been
                  compromised and exposure may have occurred.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Section 05: Process Modification & Segregation
            ====================================================== */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Process Modification & Segregation
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Process modification</strong>{" "}
                means changing the way a task is carried out so that less
                hazardous substance is released.{" "}
                <strong className="text-white">Segregation</strong> means
                physically separating the hazardous process from other workers
                and the general work area. Both are powerful engineering
                strategies that reduce exposure without relying on PPE or worker
                behaviour.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Process Modification Methods
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Closed Transfer Systems
                      </p>
                      <p className="text-white/60">
                        Transferring hazardous liquids or powders through sealed
                        pipework, pumps, or coupling systems instead of pouring
                        from open containers. Eliminates vapour release during
                        transfer and prevents spills. Common in chemical dosing
                        for water treatment — directly relevant to electricians
                        working in water treatment plants.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Vacuum Conveying
                      </p>
                      <p className="text-white/60">
                        Moving dry powders or granular materials through enclosed
                        pipework using vacuum pressure rather than open conveyor
                        belts or manual scooping. Prevents dust becoming
                        airborne during transfer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Wet Methods</p>
                      <p className="text-white/60">
                        Adding water to a process to prevent dust becoming
                        airborne. Wet cutting, wet drilling, wet sweeping, and
                        damping down surfaces before disturbing them. Water
                        binds dust particles so they cannot become respirable.
                        Critical for silica dust control when cutting brick,
                        block, or concrete.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Automated Dispensing
                      </p>
                      <p className="text-white/60">
                        Using automated or semi-automated systems to weigh,
                        measure, and dispense hazardous substances instead of
                        manual handling. Reduces worker proximity to the
                        substance and eliminates variability in dispensing
                        quantities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-3">
                  Segregation Methods
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Physical barriers:
                      </strong>{" "}
                      walls, partitions, screens, or enclosures that separate
                      the hazardous process from the rest of the workplace.
                      These can be permanent structures or temporary barriers
                      such as polythene sheeting with framed supports.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Distance separation:
                      </strong>{" "}
                      locating hazardous processes as far as possible from
                      occupied areas. In a workshop, this might mean placing the
                      soldering station in a dedicated, ventilated corner rather
                      than in the centre of the room.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Time separation:
                      </strong>{" "}
                      scheduling hazardous tasks when fewer people are present
                      — for example, carrying out floor coating or solvent
                      cleaning at the end of the working day or during
                      weekends when the building is unoccupied. This reduces
                      the number of people potentially exposed.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Zoning and access control:
                      </strong>{" "}
                      designating areas where hazardous substances are used as
                      restricted zones with controlled access — only authorised,
                      trained personnel with appropriate PPE may enter.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-violet-400">
                  Practical Tip: Segregation on Site
                </h3>
                <p className="text-white/80 text-sm">
                  On a typical construction site, if one trade is carrying out
                  dusty work (chasing walls, cutting concrete, grinding welds),
                  other trades should not be working immediately alongside. Use
                  temporary barriers, coordinate scheduling, and communicate with
                  the site manager. Electricians often work near dusty trades —
                  protect yourself by staying upwind or using physical barriers
                  when possible, and always wear appropriate RPE when exposure
                  cannot be avoided.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ======================================================
            Section 06: On-Tool Extraction for Power Tools
            ====================================================== */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">06</span>
              On-Tool Extraction for Power Tools
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">On-tool extraction</strong> is
                an engineering control built into or attached directly to the
                power tool. It captures dust and fumes at the exact point of
                generation — the cutting edge, drilling tip, or grinding face
                — before they can become airborne. For electricians, on-tool
                extraction is one of the most important day-to-day engineering
                controls because so much electrical installation work involves
                cutting, drilling, and chasing masonry.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">
                  Tool-Specific Extraction Requirements
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Angle Grinders (Cutting & Grinding Discs)
                      </p>
                      <p className="text-white/60">
                        Fit a dust/fume extraction shroud that encloses the disc
                        and connects to an M-class (for general dusts) or
                        H-class (for silica and other high-hazard dusts) vacuum
                        extractor. The shroud must be matched to the disc size.
                        Never use an angle grinder for cutting masonry without
                        extraction — the silica dust exposure can exceed the WEL
                        within seconds.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Wall Chasers
                      </p>
                      <p className="text-white/60">
                        Modern wall chasers have built-in extraction ports
                        designed to connect directly to a compatible vacuum
                        extractor. The dual-blade design with an enclosing
                        shroud captures the vast majority of dust at the
                        cutting point. Always use the extraction port —
                        chasing without extraction generates extremely high
                        levels of respirable dust.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        SDS Drills with Dust Extraction
                      </p>
                      <p className="text-white/60">
                        Hollow-drill-bit extraction systems draw dust through
                        the centre of the drill bit and into an attached vacuum.
                        Alternatively, a dust extraction nozzle can be fitted
                        around the drill point. Overhead drilling is
                        particularly hazardous — dust falls directly into the
                        worker&rsquo;s breathing zone. Always use extraction for
                        overhead work in masonry.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Core Drills
                      </p>
                      <p className="text-white/60">
                        Core drilling through concrete and masonry generates
                        large quantities of dust if done dry. Water suppression
                        (wet coring) is the primary control — a water feed
                        through the core bit cools the bit and binds the dust
                        into a slurry. If wet coring is not possible (e.g. near
                        live electrical equipment), dry coring with an H-class
                        vacuum extractor is required.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Circular Saws (for Cable Trunking, Metal Cutting)
                      </p>
                      <p className="text-white/60">
                        Extraction ports on circular saws connect to a vacuum
                        to capture metal filings and dust. When cutting
                        fibre-cement cable trunking or similar materials,
                        extraction is essential due to the potential for
                        respirable fibre release.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    Vacuum Extractor Classification
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  The vacuum extractor must be matched to the hazard:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">L-class:</strong> low
                      hazard dusts only — NOT suitable for silica, hardwood, or
                      other high-hazard dusts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">M-class:</strong> medium
                      hazard dusts including concrete, brick, tile, and softwood
                      (OEL &ge; 0.1 mg/m&sup3;)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong className="text-white">H-class:</strong> high
                      hazard dusts including silica, hardwood, lead, and
                      carcinogens — the minimum standard for masonry work
                      generating silica dust
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Section 07: Water Suppression
            ====================================================== */}
        <section className="mb-10">
          <div className="border-l-2 border-sky-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-sky-400/80 text-sm font-normal">07</span>
              Water Suppression
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Water suppression</strong> is an
                engineering control that uses water to prevent dust from becoming
                airborne during cutting, drilling, or grinding operations. Water
                binds to dust particles at the point of generation, causing them
                to form a slurry rather than becoming respirable airborne dust.
                It is one of the most effective controls for silica dust from
                masonry work.
              </p>

              <div className="bg-white/5 border border-sky-400/30 p-4 rounded-lg">
                <h3 className="text-sky-300 font-medium mb-3">
                  Water Suppression Methods
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Wet cutting:</strong>{" "}
                      feeding water directly onto the cutting blade or disc
                      during cutting. The water cools the blade, extends blade
                      life, and suppresses dust at the point of cut. Used with
                      masonry saws, tile cutters, and core drills.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Spray bars:</strong>{" "}
                      fixed or adjustable nozzles that deliver a fine mist of
                      water over the work area during dust-generating
                      activities. Common on bench-mounted masonry saws and
                      large floor saws.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Suppression rings:
                      </strong>{" "}
                      circular nozzle assemblies that fit around a core drill
                      barrel or cutting wheel, delivering water in a ring
                      pattern around the cutting point. Ensures water reaches
                      the exact location where dust is generated.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Pressurised water bottles:
                      </strong>{" "}
                      portable water supply systems that attach to power tools
                      for wet cutting in locations without a mains water supply.
                      Essential for site work where plumbed water is not
                      available.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-sky-400 font-medium mb-2">
                  Slurry Management
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Water suppression creates a{" "}
                  <strong className="text-white">slurry</strong> — a wet mixture
                  of water and dust. This slurry must be managed properly:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Do not allow slurry to dry out — once dry, the dust
                      becomes airborne again and the suppression benefit is lost
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Clean up slurry while still wet using a wet vacuum or by
                      mopping — never sweep dry slurry
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Manage slip hazards — wet slurry on floors is a slip
                      risk that must be controlled with barriers, signage, and
                      prompt clean-up
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Consider electrical safety — water and electrical
                      equipment do not mix. When wet cutting near live circuits
                      or electrical panels, additional precautions are essential
                      including isolation of nearby circuits
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Water Suppression Near Electrical Equipment
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  As an electrician, you must be particularly careful when using
                  water suppression near electrical installations. Water and
                  electricity create a{" "}
                  <strong className="text-white">
                    potentially fatal combination
                  </strong>
                  . Before using wet cutting or wet drilling methods, ensure all
                  nearby circuits are isolated and locked off. If isolation is
                  not possible, use dry cutting with extraction (H-class vacuum)
                  instead. Always carry out a risk assessment that considers
                  both the dust exposure risk AND the electrical safety risk
                  — and select the control method that manages both hazards
                  safely.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ======================================================
            Section 08: Maintenance of Engineering Controls
            ====================================================== */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">08</span>
              Maintenance of Engineering Controls
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                An engineering control is only effective if it is{" "}
                <strong className="text-white">
                  properly maintained and in good working order
                </strong>
                . A neglected LEV system, a blocked filter, or a worn fan belt
                can reduce the effectiveness of the control to the point where
                it provides no meaningful protection — while giving workers a
                false sense of security.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-violet-300">
                    COSHH Regulation 8: Duty to Maintain
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  <strong className="text-white">
                    COSHH Regulation 8
                  </strong>{" "}
                  places a clear legal duty on employers:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      All control measures must be maintained in an{" "}
                      <strong className="text-white">efficient state</strong>,
                      in{" "}
                      <strong className="text-white">
                        efficient working order
                      </strong>
                      , and in{" "}
                      <strong className="text-white">good repair</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      This applies to engineering controls, LEV systems,
                      process enclosures, ventilation systems, and all other
                      control measures provided under Regulation 7
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Where engineering controls are provided, the employer
                      must ensure there is a{" "}
                      <strong className="text-white">
                        planned programme of maintenance
                      </strong>
                      , not just reactive repairs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Any defect that could result in worker exposure must be{" "}
                      <strong className="text-white">
                        rectified immediately
                      </strong>{" "}
                      — the control must not be used until the defect is
                      repaired
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">
                  Three Levels of Checking
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Daily User Checks (Before Each Use)
                      </p>
                      <p className="text-white/60">
                        The operator checks: does the system start? Is there
                        airflow at the hood? Are there any visible blockages,
                        damaged ducting, unusual noises, or warning indicators?
                        Is the filter gauge in the normal range? These are
                        quick, simple checks that take a few minutes and should
                        become routine.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Scheduled Maintenance (Weekly/Monthly)
                      </p>
                      <p className="text-white/60">
                        A more detailed inspection by a supervisor or
                        maintenance technician: checking capture velocity with
                        smoke tubes, verifying filter condition, inspecting duct
                        joints for leaks, checking fan belt tension, and
                        cleaning or replacing filters as needed. Results should
                        be recorded in a maintenance log.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Thorough Examination and Test — TExT (COSHH Reg 9)
                      </p>
                      <p className="text-white/60">
                        Carried out by a{" "}
                        <strong className="text-white">competent person</strong>{" "}
                        at least every 14 months (or 6 months for specified
                        processes). Includes airflow measurements at every hood
                        and branch, capture velocity testing, system pressure
                        drop measurements, filter integrity checks, and a
                        written report with recommendations. The report must be
                        kept for at least 5 years.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-2">
                  Record Keeping
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Employers must keep records of:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      All thorough examination and test (TExT) reports —
                      retained for at least{" "}
                      <strong className="text-white">5 years</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Maintenance logs — dates of inspection, faults found,
                      repairs carried out, parts replaced
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Commissioning test results — the baseline performance
                      data from when the system was first installed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Any modifications — changes to ducting, hoods, filters,
                      or fan settings, with the reason for the change and the
                      effect on system performance
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-violet-400">
                  Practical Examples for Electricians
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  As an electrician, engineering controls are directly relevant
                  to your daily work:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Fume extraction when soldering:
                      </strong>{" "}
                      rosin flux fumes from soldering are a respiratory
                      sensitiser. Use a portable fume extractor with a flexible
                      arm positioned 50&ndash;100 mm from the soldering point,
                      or a bench-mounted unit with an activated carbon filter.
                      This is a COSHH requirement wherever soldering is carried
                      out regularly.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Dust extraction when chasing walls:
                      </strong>{" "}
                      use a wall chaser with built-in extraction connected to an
                      H-class vacuum, or an SDS drill with a dust extraction
                      nozzle. The silica content of brick, block, and mortar
                      makes this a high-hazard dust exposure. On-tool extraction
                      is the primary control; RPE (FFP3) should be worn as a
                      secondary measure.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Ventilation in confined electrical rooms:
                      </strong>{" "}
                      before entering electrical plant rooms, switchgear rooms,
                      or battery rooms, verify that the ventilation system is
                      operating and providing the designed air change rate.
                      Check for warning signs indicating the presence of
                      hazardous gases (SF6, hydrogen, battery acid fumes). If
                      ventilation has failed, do not enter until the system is
                      restored and the atmosphere has been tested and confirmed
                      safe.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Hierarchy of Control
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-4-section-3">
              Next: RPE & PPE Selection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
