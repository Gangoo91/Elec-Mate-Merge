import { ArrowLeft, ShieldAlert, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "4s-procedure",
    question:
      "What is the correct order of the 4-S emergency procedure for accidental asbestos disturbance?",
    options: [
      "Stop, Seal, Sign, Summon",
      "Summon, Stop, Seal, Sign",
      "Seal, Sign, Stop, Summon",
      "Sign, Summon, Seal, Stop",
    ],
    correctIndex: 0,
    explanation:
      "The 4-S procedure follows a strict order: STOP work immediately to prevent further fibre release; SEAL the area by closing doors, windows, and ventilation; SIGN all entry points with danger warnings and barrier tape; SUMMON your supervisor, the dutyholder, and specialist help. Each step builds on the previous one to contain the contamination and protect people.",
  },
  {
    id: "rushing-disturbance",
    question:
      "Why should you NOT rush out of an area where asbestos has been accidentally disturbed?",
    options: [
      "Rushing creates air currents that spread fibres further",
      "You might slip and injure yourself",
      "It causes panic among other workers",
      "The HSE requires you to walk at all times on site",
    ],
    correctIndex: 0,
    explanation:
      "Rushing out of a contaminated area creates air currents and turbulence that can spread asbestos fibres much further than they would otherwise travel. You should leave the area calmly and close the door behind you. The priority is to contain the fibres within the smallest possible area.",
  },
  {
    id: "riddor-reporting",
    question:
      "Under which regulations might an accidental asbestos disturbance need to be reported?",
    options: [
      "RIDDOR — Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "COSHH — Control of Substances Hazardous to Health",
      "CDM — Construction (Design and Management) Regulations",
      "The Building Regulations Part P",
    ],
    correctIndex: 0,
    explanation:
      "An accidental disturbance of asbestos may need to be reported under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations) if it constitutes a dangerous occurrence — specifically, the accidental release of a biological agent or substance that could cause harm to health. COSHH and CAR 2012 are also relevant regulations, but the reporting duty for incidents falls under RIDDOR.",
  },
];

const faqs = [
  {
    question:
      "What should I do if I accidentally drill into something I think might be asbestos?",
    answer:
      "Stop drilling immediately. Do not try to remove the drill bit or continue working. Put down your tools carefully. If you have RPE (respiratory protective equipment), keep it on. If not, cover your nose and mouth with a handkerchief or your clothing and leave the area calmly — do not rush. Close the door behind you. Seal the area as best you can (tape, polythene, or simply keeping the door closed). Place warning signs if available. Report immediately to your supervisor and the building dutyholder. Do not re-enter the area until a competent person has assessed it and given clearance. Record the incident in writing, including the date, time, location, what material was disturbed, and who was present.",
  },
  {
    question:
      "Can I clean up asbestos debris myself if only a small amount was disturbed?",
    answer:
      "Absolutely not. Even a very small disturbance of asbestos-containing material can release thousands of microscopic fibres into the air. These fibres are invisible to the naked eye and remain airborne for hours. Only a competent, specialist contractor should clean up asbestos debris. They will use HEPA-filtered vacuums, wet wiping techniques, and appropriate PPE. Using a standard vacuum cleaner, broom, or cloth will spread the fibres further and contaminate a larger area. Never attempt to clean up asbestos debris yourself, regardless of how small the amount appears to be.",
  },
  {
    question:
      "Do I need to tell my GP if I was exposed to asbestos during an accidental disturbance?",
    answer:
      "Yes, it is advisable to inform your GP about any potential asbestos exposure, even a single incident. Your GP can add the exposure to your medical records, which is important for long-term health monitoring. Asbestos-related diseases can take 15 to 60 years to develop, so having an accurate exposure history is valuable. If the exposure was significant (prolonged or involving high-risk materials such as pipe lagging or sprayed coatings), you should also be placed on health surveillance. Your employer has a duty to arrange this under the Control of Asbestos Regulations 2012.",
  },
  {
    question:
      "What happens if the asbestos register was not checked before work started?",
    answer:
      "Failure to check the asbestos register before starting work in a non-domestic building is a breach of the Control of Asbestos Regulations 2012. The dutyholder has a legal obligation to make the register available to anyone who may disturb ACMs, and anyone carrying out work has a responsibility to check it. If the register was not checked and an accidental disturbance occurs, this will be investigated as part of the incident review. It may result in enforcement action by the HSE, and the dutyholder and/or employer could face prosecution. The lessons-learned review should identify why the register was not checked and put measures in place to prevent recurrence.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the FIRST thing you should do if you accidentally disturb asbestos-containing material?",
    options: [
      "Call the HSE immediately",
      "Stop work immediately and do not continue to disturb the material",
      "Try to clean up the debris quickly to limit exposure",
      "Put on RPE and continue working carefully",
    ],
    correctAnswer: 1,
    explanation:
      "The very first action is to STOP work immediately. Do not continue to disturb the material, do not try to clean up the debris, and do not continue working even with RPE. Stopping immediately limits the amount of fibre released into the air. The 4-S procedure begins with STOP.",
  },
  {
    id: 2,
    question:
      'What does the "SEAL" step of the 4-S procedure involve?',
    options: [
      "Sealing the asbestos material in a plastic bag",
      "Applying sealant paint to the damaged ACM",
      "Closing doors, windows, and turning off ventilation to contain the area",
      "Sealing your clothing in a bag for disposal",
    ],
    correctAnswer: 2,
    explanation:
      "The SEAL step involves containing the contaminated area by closing all doors and windows, sealing the area with tape or polythene if available, and turning off any ventilation, fans, or air conditioning that could spread fibres to other areas. The goal is to prevent fibres from migrating beyond the immediate area of disturbance.",
  },
  {
    id: 3,
    question:
      "If you do NOT have RPE on when an accidental disturbance occurs, what should you do?",
    options: [
      "Hold your breath and run out of the area as fast as possible",
      "Cover your nose and mouth and leave the area calmly",
      "Stay in the area and wait for someone to bring you RPE",
      "Continue working — a single exposure is not dangerous",
    ],
    correctAnswer: 1,
    explanation:
      "If you do not have RPE, cover your nose and mouth with a handkerchief, cloth, or your clothing and leave the area calmly. Do not rush — rushing creates air currents that spread fibres further. Close the door behind you as you leave. Once out of the area, remove any outer clothing that may be contaminated and wash your hands and face.",
  },
  {
    id: 4,
    question:
      "Who should be the FIRST person you report an accidental asbestos disturbance to?",
    options: [
      "The HSE enforcement officer",
      "An asbestos removal contractor",
      "Your immediate supervisor or site manager",
      "Your GP",
    ],
    correctAnswer: 2,
    explanation:
      "Your immediate supervisor or site manager should be the first person you contact. They will then take responsibility for contacting the building dutyholder, arranging for a competent person to assess the situation, and escalating to the HSE if necessary. The chain of communication starts with your direct line management.",
  },
  {
    id: 5,
    question:
      "A plumber breaks a section of pipe lagging while accessing a valve. What makes this scenario particularly high-risk?",
    options: [
      "Pipe lagging is very expensive to replace",
      "Pipe lagging typically contains amosite/crocidolite and is highly friable — the highest-risk ACM",
      "The valve may have been damaged",
      "Pipe lagging is always blue in colour, which indicates crocidolite",
    ],
    correctAnswer: 1,
    explanation:
      "Pipe lagging is one of the highest-risk ACMs because it typically contains amosite (brown asbestos) and/or crocidolite (blue asbestos) and is highly friable — meaning it crumbles easily and releases large quantities of dangerous fibres when disturbed. Breaking even a small section can create a significant fibre release requiring specialist clean-up.",
  },
  {
    id: 6,
    question:
      "What information should be recorded after an accidental asbestos disturbance?",
    options: [
      "Only the names of people present — everything else is confidential",
      "Date, time, location, what happened, what material was disturbed, who was present, actions taken, and who was notified",
      "Only the cost of the clean-up for insurance purposes",
      "A photograph of the material is sufficient — no written record is needed",
    ],
    correctAnswer: 1,
    explanation:
      "A comprehensive written record must be made, including: date, time, and location; what happened and what material was disturbed; who was present and potentially exposed; what actions were taken; who was notified; and what the outcome was. This record is essential for health surveillance (exposure history), legal compliance, insurance claims, and lessons learned.",
  },
  {
    id: 7,
    question:
      "After an accidental disturbance, when is it safe to re-enter the affected area?",
    options: [
      "After 24 hours — the fibres will have settled by then",
      "Once you have put on a dust mask",
      "Only after a competent person has assessed the area and given clearance",
      "As soon as warning signs have been put up",
    ],
    correctAnswer: 2,
    explanation:
      "You must NOT re-enter the area until a competent person (asbestos surveyor or analyst) has assessed the damage, carried out air monitoring if needed, and confirmed that the area is safe. Simply waiting or wearing a basic dust mask is not sufficient. If asbestos is confirmed, professional clean-up must be completed and clearance given before anyone can re-enter.",
  },
  {
    id: 8,
    question:
      "What is the single most effective way to PREVENT accidental asbestos disturbance?",
    options: [
      "Wearing RPE at all times in every building",
      "Only working in buildings built after 2010",
      "Always checking the asbestos register before starting any work in a pre-2000 building",
      "Using hand tools instead of power tools",
    ],
    correctAnswer: 2,
    explanation:
      "The single most effective prevention measure is always checking the asbestos register BEFORE starting any work in a pre-2000 building. The register identifies the location, type, and condition of known ACMs, allowing you to plan your work to avoid disturbing them. A few minutes checking the register can prevent an accidental disturbance and a lifetime of worry about asbestos exposure.",
  },
];

export default function AsbestosModule5Section1() {
  useSEO({
    title:
      "Accidental Disturbance Procedures | Asbestos Awareness Module 5.1",
    description:
      "The 4-S emergency procedure (Stop, Seal, Sign, Summon), immediate actions, who to call, incident recording, example scenarios, and prevention of accidental asbestos disturbance.",
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
            <Link to="../asbestos-awareness-module-5">
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
            <ShieldAlert className="h-7 w-7 text-orange-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Accidental Disturbance Procedures
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The 4-S emergency procedure, immediate actions, who to call,
            incident recording, example scenarios, and how to prevent accidental
            disturbance of asbestos-containing materials
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
                <strong>4-S procedure:</strong> Stop, Seal, Sign, Summon
              </li>
              <li>
                <strong>Never clean up:</strong> Only specialist contractors
                handle asbestos debris
              </li>
              <li>
                <strong>Prevention:</strong> Always check the asbestos register
                before work
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Report to:</strong> Supervisor first, then dutyholder
              </li>
              <li>
                <strong>Record:</strong> Every incident must be documented in
                writing
              </li>
              <li>
                <strong>Do not re-enter:</strong> Until cleared by a competent
                person
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
              "Explain what constitutes an accidental disturbance of ACMs",
              "Describe the 4-S emergency procedure: Stop, Seal, Sign, Summon",
              "Identify the correct immediate actions to protect yourself and others",
              "Know who to contact and in what order after an accidental disturbance",
              "Understand the importance of incident recording and RIDDOR reporting",
              "Apply prevention measures to avoid accidental disturbances in the first place",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Constitutes Accidental Disturbance? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            What Constitutes Accidental Disturbance?
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An accidental disturbance is any{" "}
                <strong>unplanned disturbance of asbestos-containing materials</strong>
                . It can happen to anyone working in or on a building that
                contains ACMs &mdash; and it happens more often than most people
                think.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Common Examples
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Drilling into AIB
                      </strong>{" "}
                      without realising the panel contains asbestos
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Breaking an asbestos cement sheet
                      </strong>{" "}
                      during access or maintenance work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Scraping textured coatings
                      </strong>{" "}
                      (Artex) from a ceiling or wall
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Knocking pipe lagging
                      </strong>{" "}
                      while working near pipes in a plant room or ceiling void
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Falling through an AIB ceiling
                      </strong>{" "}
                      tile while working in a roof void
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cutting into an AIB fire door
                      </strong>{" "}
                      to install hardware or access cabling
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Accidental disturbances can happen during{" "}
                <strong>routine maintenance, refurbishment, emergency repairs</strong>
                , or even seemingly harmless activities like moving furniture
                against an AIB panel. The key issue is that{" "}
                <strong>
                  fibres may have been released into the air
                </strong>
                .
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Invisible Danger
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Even a <strong className="text-white">small disturbance</strong>{" "}
                  can release <strong className="text-white">thousands of
                  microscopic fibres</strong> into the air. Asbestos fibres are
                  invisible to the naked eye and can remain airborne for hours.
                  You cannot see, smell, or taste them. This is why every
                  accidental disturbance must be treated seriously, regardless
                  of how minor it appears.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4-S Emergency Flowchart */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-orange-400" />
            The 4-S Emergency Procedure
          </h2>

          <div className="space-y-2">
            {/* Step 1 — STOP */}
            <div className="bg-red-500/15 border-2 border-red-500/40 rounded-xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg sm:text-xl font-black">1</span>
                </div>
                <div>
                  <p className="text-red-400 text-2xl sm:text-3xl font-black tracking-wide">
                    STOP
                  </p>
                </div>
              </div>
              <ul className="text-sm sm:text-base text-white/90 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    Stop work <strong className="text-white">IMMEDIATELY</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    Do <strong className="text-white">NOT</strong> continue to
                    disturb the material
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    Do <strong className="text-white">NOT</strong> try to clean
                    up the debris
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    Do <strong className="text-white">NOT</strong> panic &mdash;
                    controlled, calm response
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>Put down tools carefully</span>
                </li>
              </ul>
            </div>

            {/* Arrow connector */}
            <div className="flex justify-center py-1">
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-4 bg-white/20" />
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
              </div>
            </div>

            {/* Step 2 — SEAL */}
            <div className="bg-orange-500/15 border-2 border-orange-500/40 rounded-xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg sm:text-xl font-black">2</span>
                </div>
                <div>
                  <p className="text-orange-400 text-2xl sm:text-3xl font-black tracking-wide">
                    SEAL
                  </p>
                </div>
              </div>
              <ul className="text-sm sm:text-base text-white/90 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    Close all <strong className="text-white">doors and windows</strong>{" "}
                    in the affected area
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    Seal the area with{" "}
                    <strong className="text-white">tape or polythene</strong> if
                    available
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    Turn off any{" "}
                    <strong className="text-white">
                      ventilation, fans, or air conditioning
                    </strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    Prevent anyone from{" "}
                    <strong className="text-white">entering the area</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    If you have RPE,{" "}
                    <strong className="text-white">keep it on</strong>
                  </span>
                </li>
              </ul>
            </div>

            {/* Arrow connector */}
            <div className="flex justify-center py-1">
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-4 bg-white/20" />
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
              </div>
            </div>

            {/* Step 3 — SIGN */}
            <div className="bg-yellow-500/15 border-2 border-yellow-500/40 rounded-xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg sm:text-xl font-black">3</span>
                </div>
                <div>
                  <p className="text-yellow-400 text-2xl sm:text-3xl font-black tracking-wide">
                    SIGN
                  </p>
                </div>
              </div>
              <ul className="text-sm sm:text-base text-white/90 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span>
                    Place <strong className="text-white">warning signs</strong>{" "}
                    at all entry points to the area
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span>
                    &ldquo;<strong className="text-white">DANGER &mdash; Possible
                    asbestos contamination &mdash; DO NOT ENTER</strong>&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span>
                    Use <strong className="text-white">barrier tape</strong> if
                    available
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span>
                    Ensure signs are{" "}
                    <strong className="text-white">
                      visible from all approaches
                    </strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span>
                    Keep <strong className="text-white">people away</strong> from
                    the area
                  </span>
                </li>
              </ul>
            </div>

            {/* Arrow connector */}
            <div className="flex justify-center py-1">
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-4 bg-white/20" />
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
              </div>
            </div>

            {/* Step 4 — SUMMON */}
            <div className="bg-green-500/15 border-2 border-green-500/40 rounded-xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg sm:text-xl font-black">4</span>
                </div>
                <div>
                  <p className="text-green-400 text-2xl sm:text-3xl font-black tracking-wide">
                    SUMMON
                  </p>
                </div>
              </div>
              <ul className="text-sm sm:text-base text-white/90 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    Report immediately to your{" "}
                    <strong className="text-white">
                      supervisor/site manager
                    </strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    Contact the{" "}
                    <strong className="text-white">building dutyholder</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    The dutyholder must arrange for:{" "}
                    <strong className="text-white">
                      assessment by a competent person
                    </strong>
                    , air monitoring if needed, professional clean-up if
                    confirmed asbestos
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Record the incident
                    </strong>{" "}
                    in writing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    Do <strong className="text-white">NOT</strong> re-enter the
                    area until cleared by a competent person
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Immediate Actions in Detail */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">02</span>
            Immediate Actions in Detail
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your <strong>personal safety is the priority</strong>. The
                actions you take in the first few minutes after an accidental
                disturbance can significantly reduce your exposure and prevent
                fibres from spreading to other areas.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  If You Have RPE On
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Keep it on</strong> &mdash;
                      your RPE is protecting you from inhaling fibres
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Proceed with the SEAL step calmly while your RPE is still
                      in place
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  If You Do NOT Have RPE
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cover your nose and mouth
                      </strong>{" "}
                      with a handkerchief, cloth, or your clothing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Leave the area calmly
                      </strong>{" "}
                      &mdash; do not rush
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Do NOT Rush
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Rushing creates air currents that spread fibres
                  </strong>{" "}
                  much further than they would otherwise travel. Walk calmly and
                  deliberately. Close the door behind you as you leave to
                  contain the fibres within the smallest possible area.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Once You Have Left the Area
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Remove any outer clothing
                      </strong>{" "}
                      that may be contaminated and bag it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Wash your hands and face
                      </strong>{" "}
                      thoroughly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Do <strong className="text-white">not eat, drink, or smoke</strong>{" "}
                      until you have washed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Who to Call */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">03</span>
            Who to Call
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Knowing who to contact &mdash; and in what order &mdash; is
                critical. The following list shows the{" "}
                <strong>priority order of communication</strong> after an
                accidental disturbance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Contact Priority Order
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-red-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Your immediate supervisor or site manager
                      </p>
                      <p className="text-xs text-white/60">
                        FIRST call &mdash; they will coordinate the response
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-orange-400">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        The building dutyholder
                      </p>
                      <p className="text-xs text-white/60">
                        Owner, managing agent, or facilities manager
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-yellow-400">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Your employer&rsquo;s health and safety department
                      </p>
                      <p className="text-xs text-white/60">
                        They may need to carry out an internal investigation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-400">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        HSE (if the incident is serious)
                      </p>
                      <p className="text-xs text-white/60">
                        Potential significant exposure may require RIDDOR
                        reporting
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-purple-400">
                        5
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        An asbestos consultant/analyst
                      </p>
                      <p className="text-xs text-white/60">
                        For assessment and air monitoring
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-teal-400">6</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        An asbestos removal contractor
                      </p>
                      <p className="text-xs text-white/60">
                        If professional clean-up is needed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Non-Specialist Cleaners
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Do <strong className="text-white">NOT</strong> call
                  non-specialist cleaners. Standard cleaning companies must{" "}
                  <strong className="text-white">NOT</strong> clean up asbestos
                  debris. Using a standard vacuum cleaner, broom, or mop will
                  spread fibres further and contaminate a much larger area. Only
                  specialist asbestos contractors with appropriate equipment
                  (HEPA-filtered vacuums, wet wiping techniques) should handle
                  asbestos debris.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Incident Recording */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">04</span>
            Incident Recording
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every accidental disturbance{" "}
                <strong>must be recorded in writing</strong>. This is not
                optional &mdash; it is a legal requirement and essential for
                protecting the health of everyone involved.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What to Record
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Date, time, and location
                      </strong>{" "}
                      of the incident
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">What happened</strong>{" "}
                      &mdash; how the disturbance occurred
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        What material was disturbed
                      </strong>{" "}
                      &mdash; type, location, extent of damage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Who was present</strong>{" "}
                      &mdash; all persons potentially exposed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Actions taken</strong>{" "}
                      &mdash; how the area was sealed, who was warned
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Who was notified</strong>{" "}
                      &mdash; supervisor, dutyholder, HSE
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Outcome</strong> &mdash;
                      assessment results, clean-up details, clearance
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Why Recording Matters
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Health surveillance:
                      </strong>{" "}
                      creates an exposure history for affected workers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Legal compliance:
                      </strong>{" "}
                      required under the Control of Asbestos Regulations 2012
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Insurance claims:</strong>{" "}
                      documented evidence supports any future claims
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lessons learned:</strong>{" "}
                      helps prevent future incidents
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">Personal Records:</strong>{" "}
                  Workers who were present during the disturbance should record
                  their potential exposure for their{" "}
                  <strong>personal health records</strong>. This information may
                  be important decades later if any health issues develop. Keep a
                  note of the date, duration of exposure, and the type of
                  material involved.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    RIDDOR Reporting
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The incident may need to be reported under{" "}
                  <strong className="text-white">RIDDOR</strong> (Reporting of
                  Injuries, Diseases and Dangerous Occurrences Regulations) if
                  it constitutes a dangerous occurrence &mdash; specifically, the
                  accidental release of a substance that could cause harm to
                  health. Your employer or the dutyholder is responsible for
                  determining whether RIDDOR reporting is required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Example Scenarios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">05</span>
            Example Scenarios
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following scenarios illustrate how accidental disturbances
                can happen in real-world situations and what the{" "}
                <strong>correct response</strong> should be.
              </p>

              <div className="space-y-4">
                {/* Scenario 1 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-orange-400">
                        1
                      </span>
                    </div>
                    <p className="text-sm font-medium text-orange-400">
                      Electrician Drills Through AIB
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    An electrician drills through an AIB panel while installing a
                    cable clip. Dust is released from the hole.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-green-400 mb-1">
                      Correct Response:
                    </p>
                    <p className="text-xs text-white/80">
                      STOP drilling immediately. Seal the room &mdash; close
                      doors and windows. Put up warning signs at every entrance.
                      Call your supervisor and report the incident.
                    </p>
                  </div>
                </div>

                {/* Scenario 2 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-orange-400">
                        2
                      </span>
                    </div>
                    <p className="text-sm font-medium text-orange-400">
                      Plumber Breaks Pipe Lagging
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    A plumber breaks a section of pipe lagging while accessing a
                    valve in a plant room. Friable material crumbles and falls to
                    the floor.
                  </p>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-400 mb-1">
                      Highest Risk &mdash; Correct Response:
                    </p>
                    <p className="text-xs text-white/80">
                      STOP work immediately. Leave the area carefully &mdash; do
                      not rush. Seal the door behind you. Warn colleagues not to
                      enter. Call your supervisor{" "}
                      <strong className="text-white">immediately</strong>{" "}
                      &mdash; pipe lagging is the highest-risk ACM, typically
                      containing amosite/crocidolite.
                    </p>
                  </div>
                </div>

                {/* Scenario 3 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-orange-400">
                        3
                      </span>
                    </div>
                    <p className="text-sm font-medium text-orange-400">
                      Painter Scrapes Textured Coating
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    A painter scrapes textured coating from a ceiling and notices
                    fibrous material in the scrapings.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-green-400 mb-1">
                      Correct Response:
                    </p>
                    <p className="text-xs text-white/80">
                      STOP scraping immediately. Seal the room. Do{" "}
                      <strong className="text-white">not</strong> clean up the
                      scrapings &mdash; leave them where they are. Report to
                      your supervisor. The scrapings and remaining coating will
                      need to be tested.
                    </p>
                  </div>
                </div>

                {/* Scenario 4 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-orange-400">
                        4
                      </span>
                    </div>
                    <p className="text-sm font-medium text-orange-400">
                      Worker Falls Through AIB Ceiling
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    A maintenance worker steps through an AIB ceiling tile while
                    working in a roof void. The tile breaks and debris falls into
                    the room below.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-green-400 mb-1">
                      Correct Response:
                    </p>
                    <p className="text-xs text-white/80">
                      Get to safety first. Seal the room below &mdash; both the
                      void and the room below may be contaminated. Report the
                      incident. Both areas will need assessment and potential
                      clean-up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: After the Incident */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">06</span>
            After the Incident
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once the area has been sealed and the appropriate people
                notified, a structured process follows to assess the situation
                and protect everyone involved.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Assessment and Clean-Up
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      A <strong className="text-white">competent person</strong>{" "}
                      (asbestos surveyor/analyst) assesses the damage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Air monitoring</strong> may
                      be carried out to determine if fibres are airborne
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If asbestos is confirmed:{" "}
                      <strong className="text-white">
                        professional clean-up
                      </strong>{" "}
                      by a licensed or competent contractor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The area{" "}
                      <strong className="text-white">remains sealed</strong>{" "}
                      until clearance is given
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  For Workers Who Were Potentially Exposed
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Record the exposure
                      </strong>{" "}
                      &mdash; date, duration, material type
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Inform your GP</strong>{" "}
                      &mdash; add the exposure to your medical records
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Be placed on{" "}
                      <strong className="text-white">health surveillance</strong>{" "}
                      if the exposure was significant
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">
                    Lessons Learned Review:
                  </strong>{" "}
                  After every accidental disturbance, a review should be
                  conducted to understand why the incident happened. Key
                  questions include: Was the asbestos register checked before
                  work started? Was the worker&rsquo;s training adequate? Were
                  risk assessments completed? What can be done to prevent
                  recurrence? The answers to these questions drive improvements
                  that protect everyone in the future.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">07</span>
            Prevention
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The best response to an accidental disturbance is to{" "}
                <strong>prevent it from happening in the first place</strong>.
                Most accidental disturbances are preventable with simple,
                straightforward precautions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Prevention Checklist
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Always check the asbestos register
                      </strong>{" "}
                      BEFORE starting any work in a pre-2000 building
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ask the dutyholder
                      </strong>{" "}
                      about ACM locations &mdash; do not assume
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Complete a{" "}
                      <strong className="text-white">
                        pre-work risk assessment
                      </strong>{" "}
                      for every task
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      If in any doubt &mdash;{" "}
                      <strong className="text-white">presume asbestos</strong>{" "}
                      and do not proceed until confirmed safe
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Ensure you have{" "}
                      <strong className="text-white">
                        adequate asbestos awareness training
                      </strong>{" "}
                      &mdash; this prevents most accidental disturbances
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Remember:</strong> A few
                  minutes checking the asbestos register can prevent a{" "}
                  <strong>lifetime of worry</strong>. Asbestos-related diseases
                  take 15 to 60 years to develop. The exposure you prevent today
                  could save your health decades from now. Prevention is always
                  better than cure &mdash; and with asbestos, there is no cure.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-4-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Controlled Work Techniques
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-5-section-2">
              Next: Decontamination &amp; Waste Disposal
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
