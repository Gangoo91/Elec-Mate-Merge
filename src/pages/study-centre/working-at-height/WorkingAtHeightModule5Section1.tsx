import {
  ArrowLeft,
  Siren,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  HardHat,
  Heart,
  Clock,
  ShieldAlert,
  Phone,
  Activity,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quickCheckQuestions = [
  {
    question:
      "A worker has been suspended in a harness for approximately 20 minutes after a fall. They are now semi-conscious. Rescue has just been completed. What position should you place them in?",
    options: [
      "Flat on their back to aid breathing",
      "W-position (knees raised to chest) or seated, and maintain for at least 30 minutes",
      "Standing upright to restore circulation",
      "Recovery position on their side immediately",
    ],
    correctIndex: 1,
    explanation:
      "A suspension trauma casualty must NEVER be laid flat immediately. The pooled blood in the legs can rush back to the heart causing cardiac arrest (rescue death). Keep them in the W-position with knees raised or seated for at least 30 minutes while monitoring their condition.",
  },
  {
    question:
      "Your colleague falls from a ladder and lands on their back. They are conscious but complaining of severe neck pain. What is the correct first-aid response?",
    options: [
      "Help them to their feet slowly and walk them to a warm area",
      "Roll them into the recovery position immediately",
      "Keep them still, stabilise the head and neck, do not move them, and call 999",
      "Give them painkillers and wait to see if the pain subsides",
    ],
    correctIndex: 2,
    explanation:
      "Severe neck or back pain after a fall strongly suggests potential spinal injury. The casualty must NOT be moved unless there is immediate danger to life (fire, structural collapse). Stabilise the head and neck in the position found, call 999, and wait for paramedics with spinal immobilisation equipment.",
  },
  {
    question:
      "When should workers be briefed on the site emergency action plan for working at height?",
    options: [
      "After the first incident occurs",
      "Only if they will be working above 10 metres",
      "Before any work at height begins — during the site induction",
      "It is optional — only the supervisor needs to know the plan",
    ],
    correctIndex: 2,
    explanation:
      "The Work at Height Regulations 2005 require that emergency procedures are planned before work begins. ALL workers involved in or near work at height must be briefed on the emergency action plan during their site induction, before they start any tasks.",
  },
];

const faqs = [
  {
    question:
      "What is suspension trauma and why is it so dangerous?",
    answer:
      "Suspension trauma (orthostatic intolerance) occurs when a person is suspended upright in a harness with limited leg movement. Blood pools in the legs due to gravity, reducing the volume returning to the heart. This causes a progressive drop in blood pressure, leading to unconsciousness within 15-30 minutes and potentially death within 30 minutes. The danger is compounded after rescue: if the casualty is laid flat, the pooled blood suddenly floods back to the heart, which can cause fatal cardiac arrest — known as rescue death.",
  },
  {
    question:
      "How quickly must rescue begin after a fall where the person is left suspended?",
    answer:
      "Rescue must begin immediately — within minutes, not after waiting for the emergency services to arrive. HSE guidance and industry best practice state that a rescue plan must be in place before any work at height begins, and the means of rescue (trained rescuers, equipment, access) must be available on site. The 999 call should be made simultaneously, but site-based rescue should not wait for the ambulance.",
  },
  {
    question:
      "What is the W-position and why is it used for suspension trauma casualties?",
    answer:
      "The W-position involves sitting the casualty with their knees raised towards their chest — the legs form a W shape when viewed from the front. This position slows the return of pooled blood from the legs to the heart, preventing the sudden cardiac overload that causes rescue death. The casualty should be maintained in this position for at least 30 minutes while being monitored. Do NOT lay them flat, even if they appear to recover quickly.",
  },
  {
    question:
      "Does every site need a written emergency action plan for work at height?",
    answer:
      "Yes. Regulation 4 of the Work at Height Regulations 2005 requires that work at height is properly planned, including emergency procedures. The plan must cover how a fallen or suspended worker will be rescued, who raises the alarm, what first aid is available, how 999 is called, and how the scene is preserved for investigation. The plan must be communicated to all workers before work begins and be reviewed whenever conditions change.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Suspension trauma can cause death within approximately how many minutes if the casualty is not rescued?",
    options: ["5 minutes", "15 minutes", "30 minutes", "60 minutes"],
    correctAnswer: 2,
    explanation:
      "Suspension trauma can progress to unconsciousness within 15-30 minutes and death within approximately 30 minutes. This is why rescue must begin immediately and cannot wait for emergency services.",
  },
  {
    id: 2,
    question:
      "What causes blood to pool in the legs during harness suspension?",
    options: [
      "The harness cuts off blood supply to the legs",
      "Gravity pulls blood downward and the leg straps restrict venous return",
      "The casualty's heart stops beating",
      "Cold temperatures cause blood vessels to constrict",
    ],
    correctAnswer: 1,
    explanation:
      "When suspended upright with limited leg movement, gravity causes blood to pool in the lower extremities. The harness leg straps can compress veins, further restricting the return of blood to the heart. This progressive reduction in cardiac output leads to orthostatic intolerance.",
  },
  {
    id: 3,
    question:
      "After rescuing a suspension trauma casualty, why must you NOT lay them flat immediately?",
    options: [
      "It could cause them to vomit",
      "It makes it harder for them to breathe",
      "The sudden rush of pooled blood to the heart can cause fatal cardiac arrest (rescue death)",
      "It puts pressure on their spine",
    ],
    correctAnswer: 2,
    explanation:
      "Laying a suspension trauma casualty flat allows the pooled blood in the legs to rush back to the heart in a sudden surge. The heart, already weakened by reduced blood flow, cannot cope with this sudden volume overload, potentially causing fatal cardiac arrest — known as rescue death.",
  },
  {
    id: 4,
    question:
      "What is the correct post-rescue position for a suspension trauma casualty?",
    options: [
      "Flat on their back with legs straight",
      "Standing upright supported by colleagues",
      "W-position (knees raised) or seated for at least 30 minutes",
      "Recovery position on their left side",
    ],
    correctAnswer: 2,
    explanation:
      "The W-position (knees raised towards the chest) or a seated position slows the return of pooled blood to the heart. This position must be maintained for at least 30 minutes while monitoring the casualty's condition and awaiting advanced medical care.",
  },
  {
    id: 5,
    question:
      "In the emergency action plan sequence, what is the FIRST step after a fall from height occurs?",
    options: [
      "Call 999 immediately",
      "Begin first aid on the casualty",
      "Raise the alarm and assess scene safety",
      "Preserve the scene for investigation",
    ],
    correctAnswer: 2,
    explanation:
      "The first step is always to raise the alarm and assess scene safety. Rushing to help a casualty without checking for ongoing hazards (unstable structures, electrical dangers, further fall risks) could result in additional casualties. Once the scene is safe, rescue and first aid can proceed.",
  },
  {
    id: 6,
    question:
      "What does ABC stand for in first-aid assessment?",
    options: [
      "Assess, Bandage, Call for help",
      "Airway, Breathing, Circulation",
      "Alert, Bones, Consciousness",
      "Approach, Balance, Check",
    ],
    correctAnswer: 1,
    explanation:
      "ABC stands for Airway, Breathing, Circulation — the primary survey sequence used in first aid. Check the airway is clear, check the casualty is breathing, and check for signs of circulation (pulse, skin colour). Life-threatening conditions in this order take priority over all other injuries.",
  },
  {
    id: 7,
    question:
      "If a spinal injury is suspected after a fall, when is it acceptable to move the casualty?",
    options: [
      "When they ask to be moved",
      "After 10 minutes of immobilisation",
      "Only if there is immediate danger to life (fire, structural collapse, drowning)",
      "It is never acceptable to move them under any circumstances",
    ],
    correctAnswer: 2,
    explanation:
      "A suspected spinal injury casualty should only be moved if remaining in position poses an immediate threat to life — such as fire, structural collapse, flooding, or exposure to hazardous substances. Otherwise, keep them still and wait for paramedics with proper spinal immobilisation equipment.",
  },
  {
    id: 8,
    question:
      "What equipment for rescue must be available on site before work at height begins?",
    options: [
      "Only a first-aid kit",
      "A mobile phone to call 999",
      "Trained rescuers, rescue equipment, and a practised rescue plan",
      "Nothing specific — the fire brigade handles all rescues",
    ],
    correctAnswer: 2,
    explanation:
      "The Work at Height Regulations 2005 require that rescue arrangements are in place before work begins. This includes trained personnel who can perform the rescue, appropriate equipment (rescue kits, lowering devices, stretchers), and a plan that has been communicated and ideally practised. Relying solely on emergency services is not acceptable due to response times.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function WorkingAtHeightModule5Section1() {
  useSEO({
    title: "Emergency Procedures & Rescue | Module 5 | Working at Height",
    description:
      "Suspension trauma, immediate rescue priority, first aid for falls, spinal protocol, post-rescue positioning, and emergency action plans for working at height.",
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] text-white/70 hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">Module 5 {"\u2022"} Section 1</p>
            <h1 className="text-sm font-semibold text-white truncate">
              Emergency Procedures & Rescue
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-red-500/20 border border-amber-500/30 mb-4">
            <Siren className="h-8 w-8 text-amber-500" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-500 text-xs font-semibold">
                MODULE 5 &middot; SECTION 1
              </span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Procedures & Rescue
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding suspension trauma, immediate rescue priorities, first-aid
            protocols, and the emergency action plan that must be in place before
            any work at height begins
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-amber-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            When a worker falls and is left suspended in a harness, suspension
            trauma can cause death within 30 minutes. Rescue must begin
            immediately using on-site personnel and equipment — you cannot wait
            for the ambulance. After rescue, NEVER lay the casualty flat; use the
            W-position (knees raised) for at least 30 minutes to prevent rescue
            death. Every site must have a written emergency action plan, practised
            rescue procedures, and trained rescuers before work at height begins.
          </p>
        </div>

        {/* Critical Warning Box */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Critical Warning
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            More workers have died AFTER being rescued from harness suspension
            than during the suspension itself. This phenomenon — called "rescue
            death" — occurs when a well-meaning rescuer lays the casualty flat,
            causing pooled blood to flood back to the weakened heart. Knowing the
            correct post-rescue position is as important as the rescue itself.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Explain what suspension trauma is and why it is life-threatening",
              "Describe the timeline of symptoms from initial suspension to unconsciousness",
              "State why immediate on-site rescue is essential and cannot wait for emergency services",
              "Demonstrate knowledge of first-aid priorities after a fall from height (ABC, spinal protocol)",
              "Explain why a suspension trauma casualty must NOT be laid flat and describe the W-position",
              "Outline the six steps of an emergency action plan for work at height",
              "State the training requirements for emergency procedures under the Work at Height Regulations 2005",
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 — What Is Suspension Trauma?                      */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">
              01
            </span>
            <h3 className="text-xl font-semibold text-white">
              What Is Suspension Trauma?
            </h3>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Suspension trauma — also known as <strong className="text-amber-400">orthostatic intolerance</strong> or
              harness-induced pathology — is a potentially fatal condition that
              occurs when a person is suspended upright in a harness with limited
              or no ability to move their legs. It is one of the most
              misunderstood and underestimated hazards in working at height.
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              When we stand or walk normally, the muscles in our legs act as a
              "second heart," contracting rhythmically to squeeze blood in the
              veins back up towards the heart. This is called the{" "}
              <strong className="text-white">skeletal muscle pump</strong>. When
              a person is suspended motionless in a harness, this pump stops
              working. Gravity causes blood to accumulate in the lower
              extremities, and the harness leg straps can further restrict venous
              return by compressing the femoral veins.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-amber-400" />
                The Physiological Cascade
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Blood pools in the legs</strong> — up to 600ml of blood can
                    accumulate in the lower extremities within minutes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Reduced venous return</strong> — less blood reaches the heart,
                    reducing cardiac output
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Blood pressure drops</strong> — the brain and vital organs
                    receive less oxygenated blood
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Heart rate increases</strong> — the body attempts to compensate
                    but cannot sustain this
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Unconsciousness</strong> — reduced blood flow to the brain
                    causes loss of consciousness
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Renal failure and death</strong> — without rescue, the
                    progressive circulatory collapse is fatal
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Contributing Factors That Accelerate Suspension Trauma
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/70">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Unconsciousness from the initial fall (unable to move legs at all)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Injuries that prevent leg movement (fractures, pain)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Dehydration — reduces total blood volume available</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Cold temperatures — cause peripheral vasoconstriction</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Poor harness fit — tighter leg straps increase venous compression</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Pre-existing cardiovascular conditions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SUSPENSION TRAUMA TIMELINE DIAGRAM                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">
              02
            </span>
            <h3 className="text-xl font-semibold text-white">
              Suspension Trauma Timeline
            </h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The following timeline shows the typical progression of suspension
              trauma in an unconscious or immobile casualty. Times are
              approximate and can be significantly shorter if contributing factors
              are present.
            </p>

            {/* Timeline Diagram */}
            <div className="bg-gradient-to-b from-red-500/5 to-red-500/15 border border-red-500/20 rounded-xl p-5 space-y-0">
              <h4 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Suspension Trauma Progression — Minutes 0 to 30
              </h4>

              {/* 0-5 minutes */}
              <div className="relative pl-8 pb-6 border-l-2 border-amber-400/40">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-400 border-2 border-[#1a1a1a]" />
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-amber-400 font-bold text-sm">0 – 5 minutes</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">
                      DISCOMFORT
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Discomfort from harness straps — particularly in the groin and thighs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Tingling sensation in the lower legs and feet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Blood begins to pool — the casualty may still be fully alert</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>If conscious, the casualty should pump their legs to activate the muscle pump</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 5-15 minutes */}
              <div className="relative pl-8 pb-6 border-l-2 border-orange-400/40">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-400 border-2 border-[#1a1a1a]" />
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-orange-400 font-bold text-sm">5 – 15 minutes</span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold">
                      PAIN & NUMBNESS
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Increasing pain in the legs, groin, and lower abdomen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Numbness spreading from feet upwards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Nausea and dizziness as blood pressure drops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Heart rate increases as the body tries to compensate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Sweating and pale skin colour (signs of shock developing)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 15-25 minutes */}
              <div className="relative pl-8 pb-6 border-l-2 border-red-400/40">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-400 border-2 border-[#1a1a1a]" />
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400 font-bold text-sm">15 – 25 minutes</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold">
                      SEMI-CONSCIOUSNESS
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Confusion and disorientation — reduced brain perfusion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Intermittent loss of consciousness — may drift in and out</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Vision disturbances — tunnel vision, greying out</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Unable to assist in own rescue at this stage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Rescue becomes significantly more difficult with a limp casualty</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 25-30 minutes */}
              <div className="relative pl-8 pb-2">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-600 border-2 border-[#1a1a1a]" />
                <div className="bg-red-600/15 border border-red-600/40 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400 font-bold text-sm">25 – 30 minutes</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 text-xs font-semibold">
                      UNCONSCIOUSNESS / DEATH RISK
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Full loss of consciousness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Severe hypotension — dangerously low blood pressure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Renal failure begins as kidneys are starved of blood</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Cardiac arrest — the heart cannot sustain output</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span className="font-semibold text-red-300">Death is imminent without rescue</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-white/50 text-xs italic pt-4">
                Note: These times are approximate for an immobile, unconscious
                casualty. A conscious casualty who can pump their legs may extend
                these times significantly, but rescue must still begin immediately.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 03 — Immediate Rescue Priority                       */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-sm">
              03
            </span>
            <h3 className="text-xl font-semibold text-white">
              Immediate Rescue Priority
            </h3>
          </div>
          <div className="border-l-2 border-orange-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The critical message of this section is simple:{" "}
              <strong className="text-orange-400">
                rescue must begin within minutes, not after waiting for emergency services
              </strong>
              . Average ambulance response times in the UK are 7-15 minutes for
              life-threatening calls. For suspension trauma, this delay can be
              the difference between life and death.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Why On-Site Rescue Is Essential
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Suspension trauma progresses rapidly — symptoms can become
                    life-threatening within 15 minutes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Emergency services may not have the specialist equipment to
                    access the casualty at height (rope access, MEWP)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    The fire brigade has the highest capability for rescue at
                    height, but their response time is typically 10-20 minutes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    A conscious casualty may become unconscious during the wait,
                    making rescue significantly harder
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                What Must Be in Place Before Work Begins
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Trained rescuers</strong> —
                    at least one person on site who has been trained in the
                    specific rescue method for the equipment in use
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Rescue equipment</strong> —
                    rescue kits (lowering devices, rescue harnesses, cutting
                    tools if needed) readily accessible, not locked in a van
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Practised rescue plan</strong>{" "}
                    — the plan must have been walked through or drilled, not
                    just written on paper
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Communication</strong> —
                    reliable means to raise the alarm and call 999 from the
                    work location (mobile signal, radios)
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              The Work at Height Regulations 2005, Regulation 4(1)(c), explicitly
              require that planning for work at height includes{" "}
              <strong className="text-white">
                planning for emergencies and rescue
              </strong>
              . A risk assessment that identifies the need for harness use but
              does not include a rescue plan is incomplete and non-compliant.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 — First Aid for Falls                              */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-400 font-bold text-sm">
              04
            </span>
            <h3 className="text-xl font-semibold text-white">
              First Aid for Falls from Height
            </h3>
          </div>
          <div className="border-l-2 border-green-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Falls from height can result in a wide range of injuries, from
              minor bruising to fatal trauma. The first-aid response must be
              systematic, prioritising life-threatening conditions first.
            </p>

            {/* ABC Assessment */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4 text-green-400" />
                ABC Primary Survey
              </h4>
              <div className="space-y-4">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400 font-bold text-lg">A</span>
                    <span className="text-white font-semibold text-sm">Airway</span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Is the airway clear? Look for obstructions (blood, vomit, broken teeth, foreign objects)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>If spinal injury is NOT suspected, use the head-tilt chin-lift to open the airway</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>If spinal injury IS suspected, use the jaw-thrust manoeuvre without tilting the head</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400 font-bold text-lg">B</span>
                    <span className="text-white font-semibold text-sm">Breathing</span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Look for chest movement, listen for breath sounds, feel for air on your cheek</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>If not breathing, begin rescue breaths (if trained) or CPR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Note the rate and quality of breathing — rapid shallow breaths indicate shock</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400 font-bold text-lg">C</span>
                    <span className="text-white font-semibold text-sm">Circulation</span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Check for severe bleeding — apply direct pressure with a clean dressing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Check skin colour and temperature — pale, cold, clammy skin indicates shock</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>If no pulse is detected and not breathing, begin CPR and use AED if available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Spinal Protocol */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                Spinal Injury Protocol
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Any fall from height should be treated as a potential spinal
                injury until proven otherwise. The spinal cord, once damaged,
                cannot be repaired. Incorrect handling can convert a survivable
                injury into permanent paralysis or death.
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Do NOT move the casualty</strong> unless there is
                    immediate danger to life
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Manually stabilise the head and neck in the position found —
                    do not attempt to straighten or align
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Tell the casualty to stay still — reassure them that help is
                    on the way
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Keep the casualty warm with blankets or coats, placed over
                    them without moving them
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Wait for paramedics with spinal immobilisation equipment
                    (scoop stretcher, cervical collar, vacuum mattress)
                  </span>
                </li>
              </ul>
            </div>

            {/* Treating for Shock */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-amber-400" />
                Treating for Shock
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Shock (hypovolaemic or neurogenic) is common after falls from
                height due to blood loss, pain, or spinal damage. Signs include
                pale/grey skin, rapid weak pulse, rapid shallow breathing, cold
                clammy skin, nausea, and thirst.
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Treat the cause if possible (control bleeding)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Lay the casualty down and raise their legs (if no spinal injury suspected)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Keep warm — cover with blankets, coats, or foil blankets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Do NOT give food or drink (the casualty may need surgery)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Monitor and reassure constantly until help arrives</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 — Post-Rescue Positioning                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">
              05
            </span>
            <h3 className="text-xl font-semibold text-white">
              Post-Rescue Positioning — Preventing Rescue Death
            </h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              This is arguably the most important single piece of knowledge in
              this entire section.{" "}
              <strong className="text-red-400">
                After rescuing a suspension trauma casualty, do NOT lay them flat.
              </strong>{" "}
              This applies even if they appear to have recovered, are talking, or
              insist they feel fine.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3">
                Why Laying Flat Is Dangerous
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                During suspension, a significant volume of blood pools in the
                legs. This blood becomes deoxygenated and accumulates metabolic
                waste products (lactic acid, potassium). If the casualty is laid
                flat, this toxic, deoxygenated blood rushes back to the heart in
                a sudden surge. The heart, already weakened from reduced blood
                flow during suspension, cannot cope with:
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>The sudden increase in blood volume returning to the right atrium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>The high levels of potassium in the returning blood (hyperkalaemia), which can cause cardiac arrhythmia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>The acidic pH of the deoxygenated blood, which further disrupts cardiac rhythm</span>
                </li>
              </ul>
              <p className="text-red-300 text-sm font-semibold mt-3">
                The result can be fatal cardiac arrest — even in a casualty who
                appeared to be recovering. This is "rescue death."
              </p>
            </div>

            {/* W-Position Diagram */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4 text-green-400" />
                The W-Position (Correct Post-Rescue Position)
              </h4>
              <div className="bg-black/20 rounded-lg p-4 mb-3">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="text-4xl">&#x1F9CE;</div>
                  <p className="text-white text-sm font-medium">
                    Seated or semi-reclined with knees raised towards chest
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full text-xs">
                    <div className="bg-green-500/20 rounded-lg p-2 text-green-300">
                      Knees raised above hip level
                    </div>
                    <div className="bg-green-500/20 rounded-lg p-2 text-green-300">
                      Back supported at 30-45 degrees
                    </div>
                    <div className="bg-green-500/20 rounded-lg p-2 text-green-300">
                      Maintain for 30+ minutes minimum
                    </div>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Position the casualty seated with their back against a wall
                    or supported, and their knees drawn up
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    This slows the return of pooled blood, allowing the heart to
                    gradually readjust
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Maintain this position for at least 30 minutes, even if the
                    casualty feels better
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Monitor continuously — check breathing, pulse, and level of
                    consciousness
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    If the casualty loses consciousness and stops breathing,
                    begin CPR — at this point, laying flat is necessary for chest
                    compressions
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2">
                Exception: When CPR Is Needed
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                If the casualty is not breathing and has no pulse, CPR must take
                priority. CPR requires the casualty to be on a firm, flat
                surface. In this situation, the risk of rescue death is
                outweighed by the immediate need for cardiac resuscitation. An
                AED (automated external defibrillator) should be used as soon as
                available.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 — Emergency Action Plan                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              06
            </span>
            <h3 className="text-xl font-semibold text-white">
              Emergency Action Plan — The Six Steps
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Every site where work at height takes place must have a clear,
              communicated emergency action plan. The following six steps provide
              the framework:
            </p>

            {/* Step-by-Step */}
            <div className="space-y-3">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs">
                    1
                  </span>
                  <h5 className="text-white font-semibold text-sm">Raise the Alarm</h5>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-10">
                  Shout for help, use a radio, or activate the site alarm system.
                  Ensure at least one other person is aware of the emergency.
                  Designate someone to call 999 while you assess the scene.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs">
                    2
                  </span>
                  <h5 className="text-white font-semibold text-sm">Assess Scene Safety</h5>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-10">
                  Before approaching the casualty, check for ongoing hazards:
                  unstable structures, electrical dangers, falling objects, or
                  environmental hazards. Do not become a second casualty.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs">
                    3
                  </span>
                  <h5 className="text-white font-semibold text-sm">Rescue or Assist</h5>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-10">
                  If the casualty is suspended, begin the rescue immediately
                  using the on-site rescue plan and equipment. If they have
                  fallen to the ground, approach safely and begin first-aid
                  assessment. If the casualty is conscious and suspended, talk to
                  them and encourage them to pump their legs.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs">
                    4
                  </span>
                  <h5 className="text-white font-semibold text-sm">Administer First Aid</h5>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-10">
                  Follow the ABC protocol. For suspension trauma casualties, use
                  the W-position. For suspected spinal injuries, immobilise and
                  do not move. Treat for shock. Control any bleeding.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs">
                    5
                  </span>
                  <h5 className="text-white font-semibold text-sm flex items-center gap-2">
                    Call 999
                    <Phone className="h-3.5 w-3.5 text-blue-400" />
                  </h5>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-10">
                  If not already done, call 999 for an ambulance. Provide: the
                  exact location (including postcode and any access
                  instructions), the nature of the incident, the number of
                  casualties, the injuries sustained, and any first aid already
                  given. Keep the line open if possible.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs">
                    6
                  </span>
                  <h5 className="text-white font-semibold text-sm">Preserve the Scene</h5>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-10">
                  Once the casualty is being treated and emergency services are
                  on the way, preserve the scene for investigation. Do not move
                  equipment, do not tidy up, and do not allow others into the
                  area. This evidence is critical for the RIDDOR report and any
                  subsequent HSE investigation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 07 — Training Requirements                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">
              07
            </span>
            <h3 className="text-xl font-semibold text-white">
              Training Requirements for Emergency Procedures
            </h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The Work at Height Regulations 2005 require that all persons
              involved in work at height are given appropriate training,
              including training in emergency procedures. This is not optional
              and must be completed before work begins.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Who Needs Emergency Training?
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">All workers at height</strong>{" "}
                    — must know the emergency plan, how to raise the alarm, and
                    basic first-aid actions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Designated rescuers</strong>{" "}
                    — must be trained in the specific rescue method for the
                    equipment in use (e.g., harness rescue, MEWP recovery)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">First aiders</strong> — must
                    hold a current first-aid qualification and understand
                    suspension trauma and the W-position
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Supervisors</strong> — must
                    understand the plan, ensure it is communicated, and verify
                    that rescue equipment is available and maintained
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Key Points for Effective Emergency Training
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Training must be specific to the site and the equipment being used</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Rescue drills should be practised — not just discussed in a classroom</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Training must cover suspension trauma awareness, including the W-position</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Records of training must be kept and available for inspection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Refresher training should be provided at least annually or when equipment changes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Real-World Scenario                                          */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HardHat className="h-5 w-5 text-amber-400" />
            Real-World Scenario
          </h3>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-3">
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-amber-400">Scenario:</strong> An
              electrician is working from a cherry picker (MEWP) at 8 metres,
              wearing a full-body harness attached to the basket anchor point.
              The MEWP develops a hydraulic fault and the boom drops suddenly by
              about 1 metre. The electrician is thrown from the basket but the
              harness arrests the fall. He is now suspended 7 metres above
              ground, conscious but winded, and his legs are dangling with no
              foothold.
            </p>
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                What should happen next?
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Immediate:</strong> Raise the
                    alarm — shout, radio, phone. Someone must call 999.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Talk to the casualty:</strong>{" "}
                    Tell him to pump his legs (flex and extend) to keep blood
                    circulating. Reassure him rescue is coming.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Activate rescue plan:</strong>{" "}
                    Use the on-site rescue equipment (second MEWP, rescue
                    descent device, or ground-based lowering system) to bring
                    him to the ground. Do NOT wait for the fire brigade.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">On the ground:</strong> Place
                    him in the W-position. Do NOT lay him flat. Monitor ABC.
                    Keep warm. Wait for paramedics.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Preserve the scene:</strong>{" "}
                    The faulty MEWP must not be moved or repaired until
                    investigated. Take photographs. Get witness statements.
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-white/60 text-xs italic">
              This scenario demonstrates why a rescue plan, trained rescuers, and
              rescue equipment must all be in place before the MEWP is used — not
              arranged after an incident occurs.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Key Terminology                                              */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Key Terminology
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">
                  Suspension Trauma
                </span>
                <span className="text-white/70">
                  Life-threatening condition caused by motionless upright suspension in a harness; blood pools in the legs, reducing cardiac output
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">
                  Rescue Death
                </span>
                <span className="text-white/70">
                  Fatal cardiac arrest occurring after rescue, caused by laying the casualty flat and allowing pooled blood to surge back to the heart
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">
                  W-Position
                </span>
                <span className="text-white/70">
                  Post-rescue position with knees raised towards the chest, used to slow venous return and prevent rescue death; maintained for 30+ minutes
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">
                  Orthostatic Intolerance
                </span>
                <span className="text-white/70">
                  Medical term for suspension trauma — the body's inability to maintain adequate blood pressure when upright and immobile
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">
                  Skeletal Muscle Pump
                </span>
                <span className="text-white/70">
                  The mechanism by which leg muscle contractions squeeze venous blood back towards the heart — inactive when a person is suspended motionless
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">
                  ABC
                </span>
                <span className="text-white/70">
                  Airway, Breathing, Circulation — the primary survey sequence for first-aid assessment of a casualty
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <h4 className="font-medium text-white mb-2 text-sm">
                  {faq.question}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 1 — Emergency Procedures & Rescue"
          questions={quizQuestions}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Navigation Footer                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-amber-500 hover:bg-amber-500/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5-section-2">
              Next: Incident Reporting & Investigation
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
