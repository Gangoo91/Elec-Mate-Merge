import { ArrowLeft, ClipboardCheck, CheckCircle, AlertTriangle, BookOpen, Zap, Search, Users, ShieldCheck, FileText, HardHat, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quizQuestions = [
  {
    question: "How many steps are in the HSE's recommended risk assessment process?",
    options: [
      "3 steps",
      "4 steps",
      "5 steps",
      "7 steps"
    ],
    correctAnswer: 2,
    explanation: "The HSE recommends a 5-step risk assessment process: (1) Identify the hazards, (2) Decide who might be harmed and how, (3) Evaluate the risks and decide on controls, (4) Record your findings, and (5) Review and update the assessment."
  },
  {
    question: "When identifying hazards for tower work, which of the following is a site-specific factor that must be assessed?",
    options: [
      "The colour of the tower",
      "Ground conditions, overhead services, and proximity to traffic",
      "The brand of hard hat being worn",
      "The time the site was originally built"
    ],
    correctAnswer: 1,
    explanation: "Site-specific hazard identification must cover ground conditions (soft ground, slopes, voids), overhead services (power lines, pipe bridges), proximity to vehicle traffic and the public, weather exposure, and any adjacent structures that could affect tower stability."
  },
  {
    question: "In the hierarchy of control, what should be considered FIRST when controlling a risk?",
    options: [
      "Provide personal protective equipment (PPE)",
      "Use warning signs",
      "Eliminate the hazard entirely",
      "Provide training to workers"
    ],
    correctAnswer: 2,
    explanation: "The hierarchy of control prioritises: (1) Eliminate — remove the hazard entirely; (2) Substitute — use a less hazardous alternative; (3) Engineering controls — isolate people from the hazard; (4) Administrative controls — change working procedures; (5) PPE — as a last resort. Elimination is always the first consideration."
  },
  {
    question: "Who might be harmed by tower scaffold work?",
    options: [
      "Only the person working on the platform",
      "Tower users, ground-level workers, and members of the public",
      "Only trained PASMA card holders",
      "Only employees of the main contractor"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments must consider everyone who could be affected: operatives on the tower, ground-level workers in the vicinity, delivery drivers, visitors, and members of the public passing nearby. Falling objects, tower collapse, and exclusion zone breaches can affect all of these groups."
  },
  {
    question: "When must a risk assessment for tower work be reviewed?",
    options: [
      "Only at the start of the project",
      "Every Monday morning",
      "When conditions change — weather, ground, scope, or personnel",
      "Only when an accident occurs"
    ],
    correctAnswer: 2,
    explanation: "Risk assessments must be reviewed whenever conditions change — this includes weather changes, ground conditions deteriorating after rain, new overhead hazards being discovered, changes to the work scope, or new personnel arriving on site. A 'review regularly' mindset is Step 5 of the HSE process."
  },
  {
    question: "What is a method statement in relation to tower scaffold work?",
    options: [
      "A marketing document for the tower manufacturer",
      "A step-by-step safe system of work describing how the task will be carried out",
      "A warranty certificate for the tower components",
      "A financial quotation for the project"
    ],
    correctAnswer: 1,
    explanation: "A method statement (also called a safe system of work or SSOW) details the step-by-step procedure for carrying out the work safely. For tower work, it covers assembly sequence, inspection requirements, access rules, emergency procedures, and dismantling — all linked to the risk assessment."
  },
  {
    question: "What is a dynamic risk assessment?",
    options: [
      "A risk assessment written in advance by the office team",
      "An ongoing, real-time assessment of changing conditions on site",
      "A risk assessment that only applies to moving towers",
      "A formal document signed by the client"
    ],
    correctAnswer: 1,
    explanation: "A dynamic risk assessment is an ongoing, real-time evaluation performed by competent workers as conditions change during the work. It complements the formal written risk assessment by allowing operatives to identify and respond to new hazards as they arise — for example, unexpected weather changes or ground disturbance from nearby excavation."
  },
  {
    question: "A tower is being used in a shared workspace where other trades are working nearby. What additional control is required?",
    options: [
      "No additional controls — other trades should look after themselves",
      "Exclusion zones, communication with other trades, and coordination through the site supervisor",
      "A larger tower",
      "Double the number of guardrails"
    ],
    correctAnswer: 1,
    explanation: "Shared workspaces require coordination: exclusion zones to protect ground-level workers from falling objects, communication between trades about tower movements and overhead work, and coordination through the principal contractor or site supervisor to manage conflicting activities."
  }
];

const quickCheckQuestions = [
  {
    question: "You are writing a risk assessment for tower work on a retail car park. It rained heavily overnight and there is standing water near the planned tower location. What should your assessment address?",
    options: [
      "Only the rain — if it stops, the risk is gone",
      "Ground bearing capacity may be compromised by waterlogged soil; drainage, alternative locations, and ground protection must be assessed",
      "Ignore it — car parks have good drainage",
      "Just put more stabilisers on the tower"
    ],
    correctIndex: 1,
    explanation: "Standing water indicates potentially waterlogged ground that may not support the tower's point loads. The risk assessment must evaluate ground bearing capacity, consider ground protection (spreader plates, boards), identify alternative locations on harder standing, and plan for ongoing monitoring if conditions could worsen."
  },
  {
    question: "Step 4 of the HSE process says 'record your findings.' Who needs to see the risk assessment?",
    options: [
      "Only the person who wrote it",
      "The site manager's filing cabinet — it just needs to exist",
      "Everyone involved in the work, including operatives, supervisors, and the client if requested",
      "Only the HSE inspector if they visit"
    ],
    correctIndex: 2,
    explanation: "A risk assessment is only effective if it is communicated to everyone involved. Operatives need to understand the hazards and controls, supervisors need to enforce them, and the client may need sight of it under CDM 2015. A risk assessment locked in a filing cabinet protects no one."
  },
  {
    question: "The wind has increased since the morning briefing. The formal risk assessment says 'stop work at Beaufort Force 4.' The operative on the tower thinks it is close to Force 4 but is not sure. What should happen?",
    options: [
      "Continue — if they are not sure, it is probably fine",
      "Check a weather app and continue if the forecast says below Force 4",
      "Apply dynamic risk assessment: if in doubt, stop work, descend, and reassess",
      "Ignore it — the written risk assessment covers this"
    ],
    correctIndex: 2,
    explanation: "Dynamic risk assessment means acting on real-time conditions. 'If in doubt, get down' is the correct principle. Wind gusts can be significantly stronger than average readings, and the operative's in-situ judgement is a valid trigger for stopping work. They should descend safely and reassess with their supervisor."
  }
];

const faqs = [
  {
    question: "Do I need a separate risk assessment for every tower location?",
    answer: "You need a risk assessment that covers the specific hazards of each location. A generic tower risk assessment can serve as a starting point, but it must be supplemented with a site-specific assessment covering ground conditions, overhead services, proximity to traffic/public, weather exposure, and any unique features of that location. If you move a tower to a new position on the same site, the site-specific factors must be reassessed."
  },
  {
    question: "What is the difference between a risk assessment and a method statement?",
    answer: "A risk assessment identifies hazards, evaluates who could be harmed and how, and determines the controls needed to reduce risk to an acceptable level. A method statement describes the step-by-step safe system of work for carrying out the task, incorporating the controls identified in the risk assessment. Together they form the RAMS (Risk Assessment and Method Statement) package. The risk assessment answers 'what could go wrong and how do we prevent it' whilst the method statement answers 'how do we do the job safely, step by step.'"
  },
  {
    question: "Who is responsible for carrying out the risk assessment?",
    answer: "Under the Management of Health and Safety at Work Regulations 1999, the employer is responsible for ensuring risk assessments are carried out by a competent person. For tower scaffold work, this means someone with practical knowledge of tower assembly, use, and the specific hazards involved. On CDM 2015 projects, the principal contractor coordinates risk management between all contractors. However, every operative has a duty to report new hazards they observe."
  },
  {
    question: "Can a risk assessment be done verbally or must it be written?",
    answer: "If you employ five or more people, the significant findings of the risk assessment must be recorded in writing. Even for smaller organisations, a written record is strongly recommended as evidence of compliance and as a communication tool. Under CDM 2015, written RAMS are expected for virtually all construction work. A verbal 'we talked about it' approach does not demonstrate adequate planning or allow effective communication to all workers."
  }
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function IpafModule5Section2() {
  useSEO({
    title: "Risk Assessment for Tower Use | Module 5 | IPAF Mobile Scaffold",
    description: "HSE 5-step risk assessment process for mobile access towers — identifying hazards, evaluating risks, hierarchy of control, method statements, and dynamic risk assessment.",
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
            <Link to="../ipaf-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">Module 5 {"\u2022"} Section 2</p>
            <h1 className="text-sm font-semibold text-white truncate">Risk Assessment for Tower Use</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-4">
            <ClipboardCheck className="h-8 w-8 text-blue-400" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
              Module 5 {"\u2022"} Section 2
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Risk Assessment for Tower Use</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Applying the HSE 5-step risk assessment process to mobile access tower work — from hazard identification to ongoing review
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-elec-yellow mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Every tower operation requires a risk assessment. The HSE 5-step process takes you from identifying hazards through to implementing controls and reviewing them as conditions change. Site-specific factors — ground conditions, overhead services, weather, traffic — must always be assessed. The written assessment must be communicated to everyone involved, and a dynamic risk assessment continues throughout the work.
          </p>
        </div>

        {/* On Site Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-blue-400 mb-2 flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            On Site
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Before erecting a tower, walk the planned location. Look up for power lines and overhead obstructions. Look down at the ground — is it firm, level, and capable of supporting the point loads? Look around — are there vehicles, public footpaths, other trades? Check the weather forecast. Then write it down, brief your team, and keep reassessing throughout the day.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Apply the HSE 5-step risk assessment process to mobile access tower work",
              "Identify site-specific hazards including ground conditions, overhead services, and proximity to traffic",
              "Determine who might be harmed and how — tower users, ground workers, and the public",
              "Apply the hierarchy of control to select appropriate risk reduction measures",
              "Understand the purpose and content of method statements for tower operations",
              "Explain the concept of dynamic risk assessment and when it applies"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  STEP 1 — Identify Hazards                                    */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">01</span>
            <h3 className="text-xl font-semibold text-white">Step 1: Identify the Hazards</h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The first step is to systematically identify everything that could cause harm during tower assembly, use, and dismantling. Walk the planned work area before any equipment arrives on site.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-red-400" />
                Site-Specific Hazards to Identify
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2 text-sm text-white/70">
                  <p className="text-white font-medium">Ground Conditions</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Soft or waterlogged ground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Slopes and cambers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Underground voids, drains, or services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Uncompacted backfill</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Surface type (tarmac, grass, gravel, tiles)</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <p className="text-white font-medium">Overhead Hazards</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Power lines (all voltages)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Overhead pipe bridges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tree branches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Crane operating zones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Building soffits and overhangs</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <p className="text-white font-medium">Proximity Hazards</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Vehicle traffic routes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Public footpaths and access ways</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Other trades working nearby</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Open excavations or edges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fragile surfaces (rooflight, asbestos)</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <p className="text-white font-medium">Environmental Factors</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Weather — wind, rain, ice, lightning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Temperature extremes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lighting conditions (early/late work)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Confined or restricted spaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Adjacent structures that channel wind</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  STEP 2 — Who Might Be Harmed                                */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-sm">02</span>
            <h3 className="text-xl font-semibold text-white">Step 2: Who Might Be Harmed</h3>
          </div>
          <div className="border-l-2 border-orange-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Consider all persons who could be affected by tower scaffold work — not just the people on the platform. The assessment must account for different groups and how each might be exposed to harm.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-orange-400" />
                Groups at Risk
              </h4>
              <div className="space-y-3 text-sm text-white/70">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-orange-400 font-medium">Tower Users</p>
                  <p>Falls from height, contact with overhead hazards, platform collapse, over-reaching injuries, fatigue-related errors, manual handling injuries during assembly</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-orange-400 font-medium">Ground-Level Workers</p>
                  <p>Struck by falling tools/materials from platform, struck by collapsing tower, tripping hazards from tower base components, vehicle-tower collision while working near traffic</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-orange-400 font-medium">Members of the Public</p>
                  <p>Struck by falling objects, walking into exclusion zones, children climbing unattended towers (out of hours), vehicle impact with towers near roads</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-orange-400 font-medium">Vulnerable Groups</p>
                  <p>New or inexperienced workers, lone workers, agency staff unfamiliar with the site, operatives with pre-existing health conditions, young workers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="A tower is being assembled next to a public footpath outside a shop. The risk assessment identifies 'members of the public' as a group at risk. What specific controls should be implemented?"
          options={[
            "A small 'danger' sign on the tower",
            "Barriers and signage to redirect pedestrians, a banksman during assembly, exclusion zone with Heras fencing, hard hat zone enforced",
            "Tell the shop to close for the day",
            "No controls needed — the public should use common sense"
          ]}
          correctIndex={1}
          explanation="Public protection requires physical barriers (not just signs), clear diversion routes, a dedicated banksman during assembly/dismantling when components are being moved, and an exclusion zone around the tower base. The public cannot be expected to understand construction hazards — the controls must physically prevent exposure."
        />

        {/* ------------------------------------------------------------ */}
        {/*  STEP 3 — Evaluate Risks & Controls                          */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">03</span>
            <h3 className="text-xl font-semibold text-white">Step 3: Evaluate Risks & Decide on Controls</h3>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              For each identified hazard, evaluate how likely it is to cause harm and how severe that harm could be. Then apply the hierarchy of control to select proportionate measures, starting with the most effective controls.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                Hierarchy of Control (Most Effective First)
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="text-green-400 font-medium">Eliminate</p>
                    <p className="text-white/70">Can the work be done from ground level? Can the item be pre-fabricated at low level? Can a different method avoid working at height entirely?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="text-blue-400 font-medium">Substitute</p>
                    <p className="text-white/70">Can a lower-risk access method be used? Would a podium step or scaffold be more appropriate than a tower for this specific task?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-purple-500/20 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="text-purple-400 font-medium">Engineering Controls</p>
                    <p className="text-white/70">Guardrails, toeboards, stabilisers, outriggers, exclusion zone barriers — physical measures that isolate people from the hazard</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-amber-500/20 text-amber-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="text-amber-400 font-medium">Administrative Controls</p>
                    <p className="text-white/70">Permit-to-work systems, training requirements, inspection regimes, safe systems of work, toolbox talks, wind speed monitoring procedures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                  <div>
                    <p className="text-red-400 font-medium">PPE (Last Resort)</p>
                    <p className="text-white/70">Hard hats for ground workers, high-visibility clothing near traffic, harnesses only where specified by the manufacturer for that tower configuration</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Exclusion Zones</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                An exclusion zone around the tower base prevents ground-level workers and members of the public from being struck by falling objects. The zone should extend at least as far from the base as the tower is tall, adjusted for the nature of the work being performed. Physical barriers (Heras fencing, crash barriers, cones and tape as a minimum) must be used — verbal warnings alone are not sufficient.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  STEP 4 — Record Findings                                     */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-400 font-bold text-sm">04</span>
            <h3 className="text-xl font-semibold text-white">Step 4: Record Your Findings</h3>
          </div>
          <div className="border-l-2 border-green-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The significant findings of the risk assessment must be recorded in writing. This serves three purposes: it demonstrates compliance with legal duties, it provides a communication tool for briefing workers, and it creates a baseline for review when conditions change.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-400" />
                What the Written Assessment Must Include
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Description of the work activity and location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Hazards identified (site-specific, not just generic)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Who might be harmed and how</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Risk ratings (likelihood x severity)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Control measures selected (referencing hierarchy)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Person responsible for implementing each control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Date of assessment and planned review date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Assessor's name and signature</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Communication Is Essential</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The written assessment must be communicated to all workers involved in the task. This is typically done through toolbox talks at the start of each shift, with workers signing to confirm they have been briefed. Simply having a risk assessment on file is not compliance — it must actively inform the people doing the work.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="A site manager tells you the risk assessment was done last year for 'tower work' and covers all locations on this site. The tower is now being erected in a new area with overhead cables. Is the existing assessment sufficient?"
          options={[
            "Yes — 'tower work' covers everything",
            "Yes — as long as overhead cables are mentioned somewhere in the document",
            "No — a site-specific assessment is needed for the new location, addressing the overhead cables, clearance distances, and DNO consultation",
            "No — risk assessments expire after 6 months"
          ]}
          correctIndex={2}
          explanation="A generic 'tower work' assessment cannot cover site-specific hazards like overhead cables in a new location. The overhead cables require specific clearance calculations, possible DNO consultation, and location-specific controls. The assessment must be reviewed and updated for the new conditions — this is the purpose of Step 5 (review regularly)."
        />

        {/* ------------------------------------------------------------ */}
        {/*  STEP 5 — Review & Update                                     */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">05</span>
            <h3 className="text-xl font-semibold text-white">Step 5: Review Regularly</h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A risk assessment is a living document. It must be reviewed and updated whenever conditions change — not just filed away and forgotten. On a dynamic construction site, conditions can change daily or even hourly.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-purple-400" />
                Review Triggers
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Weather conditions change (wind increases, rain, ice)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Ground conditions deteriorate (rain softening, nearby excavation, frost heave)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>New overhead hazards discovered (cables, structures, crane operations)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Work scope changes (tower needs to be taller, wider, or relocated)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>New personnel arrive who have not been briefed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>An incident, near-miss, or observation is reported</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Other trades begin work in the tower's vicinity</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 — Method Statements                               */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">06</span>
            <h3 className="text-xl font-semibold text-white">Method Statement Requirements</h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A method statement (safe system of work) translates the risk assessment into a step-by-step procedure. For tower scaffold work, it should cover the entire lifecycle: delivery, assembly, use, modification, moving, and dismantling.
            </p>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Typical Method Statement Contents</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Scope of work and tower specification (type, height, load class)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Competence requirements (PASMA card, supervisor qualifications)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Assembly sequence (referencing manufacturer's instruction manual)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Inspection requirements and schedule (pre-use, formal, after adverse events)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Access rules (who may use the tower, maximum occupancy)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Emergency and rescue procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Tower moving procedure (if applicable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Dismantling sequence and component storage</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 07 — Dynamic Risk Assessment                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm">07</span>
            <h3 className="text-xl font-semibold text-white">Dynamic Risk Assessment</h3>
          </div>
          <div className="border-l-2 border-emerald-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A dynamic risk assessment is the ongoing, real-time evaluation of changing conditions that every competent worker should perform continuously. It complements the formal written assessment — it does not replace it.
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">The SLAM Technique</h4>
              <p className="text-white/70 text-sm mb-3">A simple mental checklist for ongoing hazard awareness:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-emerald-400 font-bold">S — Stop</p>
                  <p className="text-white/70 text-xs">Pause and consider what you are about to do</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-emerald-400 font-bold">L — Look</p>
                  <p className="text-white/70 text-xs">Observe the environment for hazards and changes</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-emerald-400 font-bold">A — Assess</p>
                  <p className="text-white/70 text-xs">Evaluate whether conditions are safe to proceed</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-emerald-400 font-bold">M — Manage</p>
                  <p className="text-white/70 text-xs">Take action — proceed safely or stop and report</p>
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Dynamic risk assessment is especially important for tower work because conditions change throughout the day — wind picks up, rain starts, other trades begin work nearby, ground conditions change, or the operative becomes fatigued. The principle is simple: <strong className="text-white">if in doubt, stop, descend safely, and reassess with your supervisor</strong>.
            </p>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="A formal written risk assessment is in place for tower work on a construction site. An operative notices that an excavation has been dug overnight within 2 metres of the tower base, which was not there yesterday. What should they do?"
          options={[
            "Continue working — the formal risk assessment is still valid",
            "Move the tower away from the excavation themselves",
            "Stop work, report the change to their supervisor, and request a review of the risk assessment before anyone uses the tower",
            "Fill in the excavation"
          ]}
          correctIndex={2}
          explanation="The excavation is a significant change in conditions that the original risk assessment did not account for. It could undermine the ground supporting the tower. The operative should stop work, report to their supervisor, and the risk assessment must be reviewed before work resumes. This is dynamic risk assessment in practice — recognising change, stopping, and escalating."
        />

        {/* ------------------------------------------------------------ */}
        {/*  Site-Specific Factors                                        */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-sm">08</span>
            <h3 className="text-xl font-semibold text-white">Site-Specific Risk Factors</h3>
          </div>
          <div className="border-l-2 border-sky-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Every site presents unique challenges that a generic risk assessment cannot address. These site-specific factors must be assessed on location before any tower work begins.
            </p>
            <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Common Site-Specific Challenges</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-sky-400 font-semibold text-xs">Soft Ground</p>
                  <p className="text-white/70 text-xs mt-1">Grass, recently dug ground, waterlogged areas — castors and base plates can sink under the point load of a tower. Use sole boards or spreader plates to distribute the load. Monitor throughout the day as conditions can change.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-sky-400 font-semibold text-xs">Slopes & Cambers</p>
                  <p className="text-white/70 text-xs mt-1">Car parks have drainage cambers, pavements have cross-falls, and industrial yards may have gradients. Adjustable base legs can compensate for minor slopes, but steep gradients may make the location unsuitable.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-sky-400 font-semibold text-xs">Confined Areas</p>
                  <p className="text-white/70 text-xs mt-1">Narrow corridors, stairwells, and rooms with limited clearance restrict tower size, assembly method, and rescue options. Confined spaces may also have restricted ventilation and emergency exit routes.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-sky-400 font-semibold text-xs">Shared Workspaces</p>
                  <p className="text-white/70 text-xs mt-1">Where other trades are working nearby, the risk assessment must address coordination: exclusion zones, communication protocols, timing of noisy or disruptive work, and shared access routes.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">The Importance of the Site Walk</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                A risk assessment written in the office without visiting the site is fundamentally flawed. The assessor must physically walk the intended tower location and movement routes, look up for overhead hazards, look down at the ground surface, and talk to other trades about their planned activities. This site walk often reveals hazards that no desk-based assessment could identify.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Risk Assessment vs Method Statement — Summary Table          */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Risk Assessment vs Method Statement — Quick Reference</h3>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Risk Assessment</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Identifies what could go wrong</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Evaluates who could be harmed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Determines controls needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Rates likelihood and severity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Answers: "What are the risks?"</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-cyan-400 mb-2">Method Statement</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Step-by-step work procedure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Implements the controls from the RA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Specifies competence requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Details emergency procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Answers: "How do we do it safely?"</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-3 bg-black/20 rounded-lg p-3">
              <p className="text-white/70 text-xs text-center">Together they form the <strong className="text-white">RAMS</strong> (Risk Assessment and Method Statement) — the foundation of safe tower scaffold operations.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Practical Guidance                                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HardHat className="h-5 w-5 text-green-400" />
            Practical Guidance
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">Risk Assessment Checklist</h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10003; Walk the site before writing the assessment</li>
                  <li>&#10003; Check overhead services and clearance distances</li>
                  <li>&#10003; Assess ground conditions and bearing capacity</li>
                  <li>&#10003; Identify all persons who could be affected</li>
                  <li>&#10003; Apply the hierarchy of control to each hazard</li>
                  <li>&#10003; Record findings in writing with dates and names</li>
                  <li>&#10003; Brief all workers before work begins</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">Common Mistakes to Avoid</h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10007; Using a generic assessment without site-specific detail</li>
                  <li>&#10007; Writing the assessment after the work has started</li>
                  <li>&#10007; Failing to brief operatives on the assessment findings</li>
                  <li>&#10007; Not reviewing when conditions change</li>
                  <li>&#10007; Relying on PPE without considering higher-order controls</li>
                  <li>&#10007; Ignoring the public and other trades as affected groups</li>
                  <li>&#10007; Treating it as a paperwork exercise rather than a planning tool</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Legal Framework Summary                                      */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Legal Framework for Risk Assessment
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="space-y-3 text-sm">
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-elec-yellow font-semibold text-xs mb-1">Management of Health and Safety at Work Regulations 1999</p>
                <p className="text-white/70 text-xs">Regulation 3 — requires every employer to carry out a suitable and sufficient risk assessment. This is the primary legal duty driving the 5-step process.</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-elec-yellow font-semibold text-xs mb-1">Work at Height Regulations 2005</p>
                <p className="text-white/70 text-xs">Regulation 4 — work at height must be properly planned, appropriately supervised, and carried out in a manner that is safe. Planning includes emergency and rescue procedures.</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-elec-yellow font-semibold text-xs mb-1">CDM Regulations 2015</p>
                <p className="text-white/70 text-xs">On construction projects, the principal contractor must coordinate risk management between all contractors. Pre-construction information and the construction phase plan must address tower scaffold risks.</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-elec-yellow font-semibold text-xs mb-1">HSWA 1974 — Section 2 & 3</p>
                <p className="text-white/70 text-xs">General duties to employees (s2) and non-employees (s3) underpin all specific regulations. Failure to risk-assess tower work can result in prosecution under HSWA as well as the specific regulations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-white mb-2 text-sm">{faq.question}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 2 — Risk Assessment for Tower Use"
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
            <Link to="../ipaf-module-5-section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Common Hazards
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-5-section-3">
              Next: Rescue Procedures
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
