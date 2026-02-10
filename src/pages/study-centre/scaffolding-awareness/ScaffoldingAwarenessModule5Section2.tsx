import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Zap,
  HardHat,
  BarChart3,
  Eye,
  BookOpen,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ─── Quick Check Questions ─────────────────────────────────────── */
const quickCheckQuestions = [
  {
    id: "scaffolding-awareness-m5s2-erection-phase",
    question:
      "During which phase of scaffolding work are operatives statistically most at risk of a fatal fall?",
    options: [
      "Routine platform work at full height",
      "Erection and dismantling",
      "Loading materials onto completed platforms",
      "Carrying out inspections",
    ],
    correctIndex: 1,
    explanation:
      "Erection and dismantling are the most dangerous phases because guard rails, platforms, and edge protection are incomplete or being removed. HSE data consistently shows that a disproportionate number of scaffold-related fatalities occur during these transitional phases, not during normal working from a completed scaffold.",
  },
  {
    id: "scaffolding-awareness-m5s2-collapse-cause",
    question:
      "Which of the following is the most common underlying cause of scaffold collapse in the United Kingdom?",
    options: [
      "Use of aluminium instead of steel components",
      "Premature or unauthorised removal of ties",
      "Rain making the standards slippery",
      "The scaffold being painted a dark colour",
    ],
    correctIndex: 1,
    explanation:
      "Premature or unauthorised removal of ties is the single most common underlying cause of scaffold collapse. Ties restrain the scaffold against the building and prevent it from buckling or toppling. When trades remove ties to gain access for cladding, window installation, or other facade work without consulting the scaffolder, the structure can become critically unstable.",
  },
  {
    id: "scaffolding-awareness-m5s2-electrocution-distance",
    question:
      "What is the minimum safe exclusion zone distance from overhead power lines when erecting scaffolding near 33 kV lines?",
    options: [
      "3 metres",
      "6 metres",
      "9 metres",
      "15 metres",
    ],
    correctIndex: 2,
    explanation:
      "For lines operating at 33 kV, the HSE guidance document GS6 specifies a minimum exclusion zone of 9 metres. This distance accounts for the potential for electrical arcing through air and the risk of scaffold components swinging into proximity during erection. For lines at 132 kV and above, even greater distances apply. The electricity distributor must always be consulted.",
  },
];

/* ─── FAQs ──────────────────────────────────────────────────────── */
const faqs = [
  {
    question:
      "What is the most common type of scaffold accident in the UK construction industry?",
    answer:
      "Falls from scaffold platforms are the most common type of scaffold accident, accounting for a significant proportion of all work-at-height injuries. The HSE reports that falls from scaffolds contribute to roughly 40% of all construction fall-from-height incidents. The primary causes are missing or incomplete guard rails, gaps between boards, and operatives climbing on incomplete or partially erected scaffolds. Proper edge protection, fully boarded platforms, and strict adherence to the 'no incomplete platform access' rule would prevent the vast majority of these incidents.",
  },
  {
    question:
      "How can falling objects be prevented when working on scaffolding?",
    answer:
      "Falling objects from scaffolding are prevented through a combination of physical controls and safe working practices. Toeboards at a minimum of 150mm height must be fitted to all working platforms to prevent tools and materials from rolling off the edge. Brick guards or scaffold netting should be fitted where the public or other workers pass below. Tool lanyards should be used to tether hand tools. Materials must be stored safely on platforms, never left balanced on guard rails or stacked near edges. Debris netting catches smaller items that may pass through gaps. Exclusion zones at ground level beneath active scaffolding provide an additional layer of protection.",
  },
  {
    question:
      "What should you do if you notice an unauthorised modification to a scaffold?",
    answer:
      "If you notice any unauthorised modification to a scaffold, you must stop work on the scaffold immediately and prevent others from using it. Report the modification to your site supervisor and the scaffolding contractor without delay. Do not attempt to reverse the modification yourself, as you may not understand the structural implications and could make the situation worse. The scaffold must be formally re-inspected by a competent scaffolder before it is used again. Common unauthorised modifications include removing ties, removing boards, altering guard rail heights, removing bracing, and adding extra lifts without proper design.",
  },
  {
    question:
      "Why is scaffold collapse more likely in windy conditions even when the scaffold appears to be correctly erected?",
    answer:
      "Wind load on scaffolding increases dramatically when sheeting, netting, or debris wrapping is present. A sheeted scaffold can experience wind forces many times greater than an open scaffold because the sheeting acts like a sail, catching the wind and transmitting enormous lateral forces to the structure. If the ties are insufficient to resist these increased forces, the scaffold can buckle or overturn. Additionally, wind speed increases with height above ground, so upper lifts experience disproportionately higher loads. Design calculations must account for the actual cladding configuration, not just the bare scaffold structure.",
  },
];

/* ─── Quiz Questions ────────────────────────────────────────────── */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is the leading cause of fatal injuries on scaffolding in the UK?",
    options: [
      "Electrocution from overhead power lines",
      "Falls from scaffold platforms",
      "Being struck by falling scaffold tubes",
      "Scaffold collapse due to overloading",
    ],
    correctAnswer: 1,
    explanation:
      "Falls from scaffold platforms are the leading cause of fatal injuries on scaffolding. HSE statistics show that falls from height account for the majority of scaffold-related deaths. Missing guard rails, gaps in boards, and access to incomplete platforms are the primary contributing factors.",
  },
  {
    id: 2,
    question:
      "During which activity are scaffold operatives at the greatest risk of a fall?",
    options: [
      "Painting whilst working from a completed scaffold",
      "Carrying out a formal inspection",
      "Erection and dismantling of the scaffold",
      "Loading materials onto the platform using a gin wheel",
    ],
    correctAnswer: 2,
    explanation:
      "Erection and dismantling present the greatest fall risk because guard rails, toeboards, and fully boarded platforms are either not yet in place or are being progressively removed. Scaffolders must use advance guard rail systems or other fall prevention measures during these phases.",
  },
  {
    id: 3,
    question:
      "A scaffold collapses on a construction site. Investigation reveals that three ties had been removed by a cladding subcontractor. Who bears primary legal responsibility?",
    options: [
      "Only the cladding subcontractor who removed the ties",
      "Only the scaffolding contractor who erected the scaffold",
      "The principal contractor for failing to manage and coordinate",
      "All parties may share responsibility depending on the circumstances",
    ],
    correctAnswer: 3,
    explanation:
      "Under CDM 2015 and the Health and Safety at Work etc. Act 1974, responsibility can be shared. The cladding subcontractor created the immediate hazard, the scaffolding contractor may have failed to communicate restrictions, and the principal contractor has a duty to coordinate and manage site safety. Courts typically apportion blame based on each party's level of control and culpability.",
  },
  {
    id: 4,
    question:
      "What is the minimum toeboard height required on scaffold working platforms to prevent objects falling from the edge?",
    options: [
      "100 mm",
      "150 mm",
      "200 mm",
      "250 mm",
    ],
    correctAnswer: 1,
    explanation:
      "The minimum toeboard height is 150 mm, as specified in the Work at Height Regulations 2005 Schedule 3. Toeboards prevent tools, materials, and debris from sliding or rolling off the edge of the platform. Where materials are stacked higher than the toeboard, additional measures such as brick guards must be used.",
  },
  {
    id: 5,
    question:
      "When erecting scaffolding near overhead power lines, which document provides the primary HSE guidance on safe distances?",
    options: [
      "HSG33 — Health and Safety in Roof Work",
      "GS6 — Avoidance of Danger from Overhead Electric Power Lines",
      "L5 — The Control of Substances Hazardous to Health",
      "INDG401 — Protecting the Public",
    ],
    correctAnswer: 1,
    explanation:
      "HSE guidance document GS6 'Avoidance of Danger from Overhead Electric Power Lines' sets out the safe distances and precautions required when working near overhead lines. It specifies exclusion zones based on the voltage of the line and requires consultation with the electricity distributor before work commences.",
  },
  {
    id: 6,
    question:
      "Which of the following is classified as an unauthorised modification to a scaffold?",
    options: [
      "A competent scaffolder adding an additional lift to the design",
      "A bricklayer removing a single guard rail to pass materials through",
      "The scaffold inspector attaching a green tag after inspection",
      "A banksman directing a crane load onto the scaffold platform",
    ],
    correctAnswer: 1,
    explanation:
      "Removing a guard rail, even temporarily, is an unauthorised modification unless it has been approved by the scaffolding contractor and a suitable risk assessment is in place with alternative fall prevention. Any person who modifies a scaffold without authorisation commits a criminal offence under the Work at Height Regulations 2005.",
  },
  {
    id: 7,
    question:
      "Overloading a scaffold platform beyond its rated capacity is most likely to cause which type of failure?",
    options: [
      "Guard rails bending outward",
      "Toeboard cracking",
      "Platform boards snapping or the scaffold structure buckling",
      "Castor wheels locking",
    ],
    correctAnswer: 2,
    explanation:
      "Overloading most commonly causes platform boards to deflect excessively, crack, or snap, and can cause ledger and transom members to buckle. In extreme cases the entire scaffold can progressively collapse. The rated bay load must never be exceeded, and materials must be evenly distributed across the platform.",
  },
  {
    id: 8,
    question:
      "What is the most effective control measure to prevent crushing injuries during scaffold erection?",
    options: [
      "Providing hard hats to all operatives",
      "Establishing an exclusion zone at ground level beneath the erection area",
      "Playing music to keep workers alert",
      "Painting scaffold tubes in bright colours",
    ],
    correctAnswer: 1,
    explanation:
      "An exclusion zone beneath the erection area prevents ground-level workers from being struck by dropped tubes, fittings, or boards. Hard hats provide a final layer of protection but do not prevent crushing from heavy scaffold components falling from height. The hierarchy of control requires elimination or engineering controls (exclusion zones, catch fans) before reliance on PPE.",
  },
];

/* ─── Component ─────────────────────────────────────────────────── */
export default function ScaffoldingAwarenessModule5Section2() {
  useSEO({
    title: "Common Scaffold Hazards | Scaffolding Awareness Module 5.2",
    description:
      "Identify and understand the most common scaffold hazards: falls from platforms, falls during erection and dismantling, falling objects, scaffold collapse, electrocution, slips and trips, crushing, and unauthorised modifications.",
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
            <Link to="../scaffolding-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <AlertTriangle className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Scaffold Hazards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Identifying and understanding the eight most common hazards
            associated with scaffolding &mdash; from falls and falling objects
            to scaffold collapse, electrocution, and unauthorised modifications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Leading cause:</strong> Falls from scaffold platforms
                &mdash; missing guard rails and board gaps
              </li>
              <li>
                <strong>Most dangerous phase:</strong> Erection and dismantling
                &mdash; incomplete edge protection
              </li>
              <li>
                <strong>Hidden killer:</strong> Scaffold collapse from
                unauthorised tie removal
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Before access:</strong> Check scaffold tag, guard rails,
                boards, and toeboards
              </li>
              <li>
                <strong>During work:</strong> Never modify, overload, or remove
                any scaffold component
              </li>
              <li>
                <strong>Report immediately:</strong> Any damage, missing parts,
                or unauthorised changes
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
              "Identify the eight most common scaffold hazards on UK construction sites",
              "Explain why erection and dismantling are the most dangerous scaffold activities",
              "Describe the causes of scaffold collapse and how they are prevented",
              "State the safe exclusion zone distances for overhead power lines",
              "List the control measures for preventing falling objects from scaffolds",
              "Recognise the signs of unauthorised scaffold modifications",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ── Diagram 1: Top Scaffold Hazards with Statistics ────── */}
        <section className="mb-12">
          <div className="bg-white/5 border border-white/10 rounded-lg p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="h-5 w-5 text-slate-400" />
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Top Scaffold Hazards &mdash; UK Industry Statistics
              </h2>
            </div>
            <p className="text-sm text-white/60 mb-5">
              Based on HSE RIDDOR data and industry incident analysis. Percentages
              represent approximate share of all scaffold-related injuries and
              fatalities in the UK construction sector.
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "Falls from platforms",
                  percent: 38,
                  colour: "bg-red-500",
                },
                {
                  label: "Falls during erection / dismantling",
                  percent: 22,
                  colour: "bg-orange-500",
                },
                {
                  label: "Struck by falling objects",
                  percent: 15,
                  colour: "bg-amber-500",
                },
                {
                  label: "Scaffold collapse",
                  percent: 10,
                  colour: "bg-yellow-500",
                },
                {
                  label: "Electrocution",
                  percent: 5,
                  colour: "bg-blue-500",
                },
                {
                  label: "Slips and trips on platforms",
                  percent: 5,
                  colour: "bg-cyan-500",
                },
                {
                  label: "Crushing during erection",
                  percent: 3,
                  colour: "bg-purple-500",
                },
                {
                  label: "Unauthorised modifications",
                  percent: 2,
                  colour: "bg-slate-400",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-white">{item.label}</span>
                    <span className="text-sm font-semibold text-white/80">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.colour}`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-4">
              Source: HSE RIDDOR reports, scaffold industry analysis. Figures
              are indicative and may vary year to year. &ldquo;Unauthorised
              modifications&rdquo; often contributes as an underlying factor
              in other categories, particularly collapse and falls.
            </p>
          </div>
        </section>

        {/* ── Section 01: Falls from Scaffold Platforms ─────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Falls from Scaffold Platforms
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Falls from scaffold platforms are the single largest category
                of scaffold-related injuries and fatalities in the United
                Kingdom. They account for approximately 38% of all reportable
                scaffold incidents and are responsible for more deaths than any
                other scaffold hazard. The tragedy is that virtually every one
                of these falls is preventable through correct scaffold design,
                proper erection, and disciplined use.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Primary Causes of Falls from Platforms
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Missing or incomplete guard rails:
                      </strong>{" "}
                      Guard rails must be fitted on all open sides of every
                      working platform at a height of at least 950mm. A top
                      rail alone is insufficient &mdash; an intermediate rail
                      (or equivalent) and a toeboard are also required to
                      prevent a person falling through the gap
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gaps in platform boards:
                      </strong>{" "}
                      Platform boards must be close-butted with no gap exceeding
                      25mm. Gaps wider than this allow feet to pass through,
                      causing trips, twisted ankles, and in the worst cases,
                      falls to the level below. Boards must also be properly
                      supported and secured against displacement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Incomplete platforms:
                      </strong>{" "}
                      Platforms that are not fully boarded across their entire
                      width leave open voids through which operatives can fall.
                      A platform must be at least 600mm wide (three boards) for
                      a working platform and must extend to within 150mm of the
                      building face where practicable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Unsecured or damaged boards:
                      </strong>{" "}
                      Boards that are not clipped, wired, or otherwise secured
                      can tilt when stepped on at the edge, catapulting the
                      operative off the platform. Boards with splits, knots,
                      rot, or excessive deflection must be replaced immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Access to unfinished lifts:
                      </strong>{" "}
                      Operatives climbing to lifts that are not yet fully boarded
                      or protected is a major cause of falls. &ldquo;Advance
                      guard rail&rdquo; systems exist precisely to prevent this
                      by providing edge protection before the operative reaches
                      the unprotected level
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Warning
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Never access a scaffold platform that does not have full edge
                  protection (top rail, intermediate rail or equivalent, and
                  toeboard) on all open sides. If any guard rail, board, or
                  toeboard is missing, the scaffold is not safe to use. Do not
                  attempt to &ldquo;work carefully&rdquo; on an unprotected
                  platform &mdash; report it, stop work, and wait for the
                  scaffolder to make it safe.
                </p>
              </div>

              <p>
                The Work at Height Regulations 2005, Schedule 3, Part 1 sets
                out the minimum requirements for guard rails on scaffolding.
                The top guard rail must be at least 950mm above the platform
                surface. Toeboards must be at least 150mm high. The gap between
                the top rail and any intermediate guard rail (or the toeboard
                and the intermediate guard rail) must not exceed 470mm. These
                are legal minimums, not guidelines, and failure to comply is
                a criminal offence.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 02: Falls During Erection and Dismantling ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Falls During Erection &amp; Dismantling
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Erection and dismantling are universally recognised as the most
                dangerous phases of scaffold work. During erection, guard rails,
                platforms, and toeboards are progressively added as the scaffold
                grows &mdash; meaning that the scaffolder is working at height
                on an incomplete structure for the entirety of the build. During
                dismantling, the process is reversed and edge protection is
                systematically removed, exposing the scaffolder to unprotected
                edges.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">
                  Why Erection &amp; Dismantling Are So Dangerous
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Incomplete Edge Protection
                      </p>
                      <p className="text-sm text-white/80">
                        Guard rails cannot be installed until the standards and
                        ledgers at that level are in place. During erection, the
                        scaffolder must work at the leading edge without the
                        benefit of full guard rails. During dismantling, guard
                        rails are removed before the platform can be cleared.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Heavy Manual Handling at Height
                      </p>
                      <p className="text-sm text-white/80">
                        Scaffold tubes, fittings, and boards are heavy and
                        unwieldy. Lifting and positioning these components at
                        height requires physical effort that can cause loss of
                        balance, especially on narrow, partially boarded
                        platforms.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Transitional Instability
                      </p>
                      <p className="text-sm text-white/80">
                        During erection the scaffold is not yet fully braced or
                        tied, meaning its structural stability is lower than the
                        finished product. During dismantling, ties and bracing
                        are removed in sequence, and any error in the sequence
                        can cause sudden instability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Time Pressure
                      </p>
                      <p className="text-sm text-white/80">
                        Commercial pressure to erect or strike scaffolding
                        quickly is a known factor in scaffold accidents. Rushing
                        leads to shortcuts, omissions, and failure to follow the
                        safe method of work. Competent supervision is essential.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">
                    Control Measures During Erection &amp; Dismantling
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Advance guard rail systems:
                      </strong>{" "}
                      These allow guard rails to be installed from the level
                      below, providing edge protection before the scaffolder
                      steps onto the unprotected platform. NASC guidance SG4
                      details the approved methods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Personal fall protection:
                      </strong>{" "}
                      Where advance guard rails are not practicable, harnesses
                      with suitable anchorage points must be used. The anchorage
                      must be capable of supporting the arrest forces without
                      the scaffold itself failing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Exclusion zones at ground level:
                      </strong>{" "}
                      The area directly below the erection or dismantling zone
                      must be barriered off to prevent ground-level workers
                      from being struck by dropped components
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Competent supervision:
                      </strong>{" "}
                      A competent scaffold supervisor must be present throughout
                      the erection and dismantling process to ensure the correct
                      sequence of operations is followed and no shortcuts are
                      taken
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                NASC guidance note SG4 sets out the industry-agreed safe methods
                for erection and dismantling of tube and fitting, system, and
                proprietary scaffolds. Following SG4 is considered best practice
                and is frequently referenced by the HSE during investigations.
                Any departure from SG4 methods must be justified by a specific
                risk assessment and method statement.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ── Section 03: Falling Objects ──────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">03</span>
            Falling Objects
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Objects falling from scaffolding pose a serious risk to
                workers at lower levels, pedestrians, and members of the public.
                The kinetic energy of even a small object falling from scaffold
                height is sufficient to cause fatal injuries. A standard
                scaffold fitting weighing just 1.5 kg falling from 30 metres
                will strike the ground at approximately 88 km/h, generating
                an impact force equivalent to hundreds of kilogrammes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Types of Falling Objects
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Tools and hand equipment:
                      </strong>{" "}
                      Hammers, spanners, spirit levels, drills, and other hand
                      tools dropped or knocked from the platform edge. Tool
                      lanyards are the primary control measure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Construction materials:
                      </strong>{" "}
                      Bricks, blocks, mortar, fixings, offcuts, and packaging.
                      Must be stored away from the edge and secured against
                      wind displacement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Scaffold boards and components:
                      </strong>{" "}
                      Boards dislodged by wind, impact, or careless handling.
                      Loose fittings left on ledgers or transoms after
                      alterations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Waste and debris:
                      </strong>{" "}
                      Rubble, broken materials, food waste, and packaging blown
                      or kicked off the edge. Good housekeeping is essential
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Control Measures for Falling Objects
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Toeboards:</strong> Minimum
                      150mm high on all working platforms to prevent objects
                      rolling or sliding off the edge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Brick guards:</strong>{" "}
                      Wire mesh panels fitted between the guard rail and
                      toeboard to contain materials stacked higher than the
                      toeboard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Debris netting and sheeting:
                      </strong>{" "}
                      Fitted to the outside face of the scaffold to catch small
                      items. Essential on scaffolds adjacent to public areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Fans and catch platforms:
                      </strong>{" "}
                      Projecting scaffold platforms or purpose-built catch fans
                      installed at lower levels to intercept falling objects
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tool lanyards:</strong>{" "}
                      All hand tools must be tethered to the operative or to
                      the scaffold structure using suitable lanyards rated for
                      the tool weight
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ground-level exclusion zones:
                      </strong>{" "}
                      Where falling objects cannot be fully contained, the area
                      beneath the scaffold must be barriered off with suitable
                      signage
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Public Protection
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Where scaffolding is adjacent to a public footpath, road, or
                  area where members of the public may pass, additional
                  protection is mandatory. This typically includes a covered
                  walkway (gantry) at ground level with a solid roof and debris
                  netting on the scaffold face. Failure to protect the public
                  is treated with particular severity by the HSE and can result
                  in immediate prohibition notices and prosecution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 04: Scaffold Collapse ────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">04</span>
            Scaffold Collapse
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scaffold collapse is one of the most catastrophic events that
                can occur on a construction site. When a scaffold fails, the
                consequences are almost always severe &mdash; multiple
                casualties, fatalities, extensive property damage, and
                prosecution of those responsible. Understanding the causes of
                scaffold collapse is essential for every person who works on
                or around scaffolding.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Primary Causes of Scaffold Collapse
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Premature or unauthorised tie removal:
                      </strong>{" "}
                      This is the most common cause of scaffold collapse in the
                      UK. Ties connect the scaffold to the building and resist
                      lateral forces. When trades remove ties to gain access
                      for their work without consulting the scaffolder, the
                      scaffold can become critically unstable and collapse
                      without warning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Overloading:</strong>{" "}
                      Exceeding the rated bay load causes excessive deflection
                      in ledgers and transoms, which transmits abnormal forces
                      to the standards and couplers. Progressive overloading
                      can cause a cascading failure where one component fails
                      and transfers its load to adjacent components, which in
                      turn fail
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Inadequate foundations:
                      </strong>{" "}
                      Scaffold standards must bear on a surface capable of
                      supporting the total applied load without settlement or
                      failure. Placing standards on soft ground, uncompacted
                      fill, drains, cellars, or sloping surfaces without
                      adequate sole boards and base plates is a common cause
                      of foundation failure leading to collapse
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Wind loading:
                      </strong>{" "}
                      Wind applies lateral forces to the scaffold that increase
                      dramatically when sheeting, netting, or banners are
                      fitted. If the tie pattern and scaffold design do not
                      account for the additional wind loading from cladding, the
                      scaffold can be blown over or pulled away from the
                      building
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Incorrect erection:
                      </strong>{" "}
                      Using the wrong components, omitting bracing, incorrect
                      tie spacing, mixing incompatible system components, or
                      departing from the design without authorisation can all
                      compromise structural integrity
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Remove Ties
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The removal of even a single tie can be catastrophic. Ties
                  work as a system &mdash; each tie shares the load with its
                  neighbours. When one is removed, the adjacent ties must carry
                  the additional load, and if they are already near their
                  capacity, they can fail in sequence. Only a competent
                  scaffolder, following a specific method statement, may
                  temporarily remove and replace ties. No other trade should
                  ever interfere with scaffold ties under any circumstances.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">
                    Real-World Example
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  In a widely reported UK incident, a scaffold wrapping an
                  entire building facade collapsed during high winds after
                  several ties had been removed by a cladding subcontractor
                  over the preceding days. The scaffold fell into a busy
                  street. Multiple workers were injured and one pedestrian
                  was killed. The investigation found that no permit-to-alter
                  system was in place, the tie removal was not communicated to
                  the scaffolding contractor, and the principal contractor had
                  no system for monitoring scaffold integrity. Multiple
                  parties were prosecuted, with combined fines exceeding
                  &pound;1 million.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ── Section 05: Electrocution ────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">05</span>
            Electrocution
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrocution is one of the most immediately lethal scaffold
                hazards. Contact between a scaffold and live overhead power
                lines, or between scaffold components and concealed cables
                within the building fabric, can cause instant death. Electricity
                can also arc across an air gap &mdash; direct contact is not
                always necessary for a fatal outcome.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Electrocution Risk Sources
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Overhead power lines:
                      </strong>{" "}
                      Scaffold tubes, gin wheels, and materials being lifted can
                      contact or approach overhead lines. Steel scaffolding is
                      an excellent conductor, and the entire scaffold can become
                      live instantaneously
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Underground cables:
                      </strong>{" "}
                      Driving scaffold stakes, pins, or adjustable base plates
                      into the ground can penetrate buried cables. A cable
                      survey and cable avoidance tool (CAT) scan must be carried
                      out before any ground penetration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Live cables in the building fabric:
                      </strong>{" "}
                      When scaffolding is tied to a building, the tie fixings
                      may drill into walls that contain live electrical cables.
                      Cable detection equipment must be used before drilling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Temporary site electrics:
                      </strong>{" "}
                      Cables draped over or run through scaffolding that become
                      damaged by scaffold components, foot traffic, or abrasion
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Safe Exclusion Zone Distances (HSE GS6)
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { voltage: "Up to 33 kV", distance: "9 metres" },
                    { voltage: "66 kV", distance: "12 metres" },
                    { voltage: "132 kV", distance: "12 metres" },
                    { voltage: "275 kV", distance: "15 metres" },
                    { voltage: "400 kV", distance: "15 metres" },
                    { voltage: "Unknown voltage", distance: "15 metres" },
                  ].map((item) => (
                    <div
                      key={item.voltage}
                      className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg p-2"
                    >
                      <Zap className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-blue-400">
                          {item.voltage}
                        </p>
                        <p className="text-sm text-white">{item.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/40 mt-3">
                  Distances measured from the nearest line conductor. If the
                  voltage is unknown, treat as the highest voltage. Always
                  consult the electricity distributor before commencing work.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Safety Rule
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Never assume overhead lines are dead or insulated. Even
                  &ldquo;insulated&rdquo; lines may have damaged or
                  deteriorated insulation that is not visible from the ground.
                  The only safe approach is to maintain the full exclusion zone
                  distance or arrange with the electricity distributor for the
                  line to be diverted, made dead, or protected with insulating
                  sleeves fitted by their authorised operatives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 06: Slips and Trips on Platforms ─────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">06</span>
            Slips and Trips on Platforms
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Slips and trips on scaffold platforms may appear to be a
                relatively minor hazard compared with falls from height or
                scaffold collapse, but in practice they are a significant
                source of injuries including fractures, sprains, head injuries,
                and back injuries. On a scaffold platform, a slip or trip that
                would cause only a stumble at ground level can propel the
                operative into the guard rail, over the guard rail, or through
                a gap in the boards.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Causes of Slips and Trips on Scaffolding
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Wet or icy platforms:
                      </strong>{" "}
                      Rain, frost, ice, and morning dew make timber and steel
                      platforms extremely slippery. Anti-slip coatings, grit
                      application, and waiting for conditions to improve are
                      essential measures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Debris and waste on platforms:
                      </strong>{" "}
                      Off-cuts, packaging, mortar droppings, cables, and tools
                      left on platforms create trip hazards. Platforms must be
                      kept clear at all times through regular housekeeping
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Uneven or damaged boards:
                      </strong>{" "}
                      Warped, split, or protruding boards catch feet and cause
                      stumbles. Board ends that are not flush or that project
                      above adjacent boards are a frequent trip hazard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cables and hoses:
                      </strong>{" "}
                      Power cables, air hoses, and water pipes run across
                      platforms create trip hazards. They should be routed
                      along the scaffold structure or through dedicated cable
                      runs, never left trailing across walkways
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Poor lighting:
                      </strong>{" "}
                      Inadequate lighting on scaffold platforms, especially
                      during winter months, early morning, and late afternoon
                      working, means hazards are not seen until it is too late
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Inappropriate footwear:
                      </strong>{" "}
                      Safety boots with worn tread or inappropriate sole
                      patterns provide insufficient grip on scaffold platforms.
                      Footwear should have deep-tread, oil-resistant soles
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Key Point:</strong> Good
                  housekeeping is the single most effective control measure for
                  slips and trips on scaffold platforms. Every operative who
                  works on the scaffold has a personal responsibility to keep
                  their working area clean, tidy, and free of obstructions. The
                  &ldquo;clean as you go&rdquo; principle should be enforced
                  rigorously at all times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Diagram 2: Hazard Identification Visual ─────────── */}
        <section className="mb-12">
          <div className="bg-white/5 border border-white/10 rounded-lg p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5">
              <Eye className="h-5 w-5 text-slate-400" />
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Scaffold Hazard Identification &mdash; Visual Guide
              </h2>
            </div>
            <p className="text-sm text-white/60 mb-5">
              Use this reference to quickly identify the eight primary hazard
              categories when approaching, inspecting, or working on any
              scaffold structure.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  icon: "Falls — Platform",
                  check: "Guard rails, boards, gaps",
                  severity: "bg-red-500",
                  label: "CRITICAL",
                },
                {
                  icon: "Falls — Erection",
                  check: "Advance rails, harnesses",
                  severity: "bg-red-500",
                  label: "CRITICAL",
                },
                {
                  icon: "Falling Objects",
                  check: "Toeboards, netting, lanyards",
                  severity: "bg-orange-500",
                  label: "HIGH",
                },
                {
                  icon: "Collapse",
                  check: "Ties, bracing, foundations",
                  severity: "bg-red-500",
                  label: "CRITICAL",
                },
                {
                  icon: "Electrocution",
                  check: "OHL distance, cable routes",
                  severity: "bg-red-500",
                  label: "CRITICAL",
                },
                {
                  icon: "Slips & Trips",
                  check: "Housekeeping, wet surfaces",
                  severity: "bg-amber-500",
                  label: "MEDIUM",
                },
                {
                  icon: "Crushing",
                  check: "Exclusion zones, comms",
                  severity: "bg-orange-500",
                  label: "HIGH",
                },
                {
                  icon: "Unauthorised Mods",
                  check: "Scaffold tags, permits",
                  severity: "bg-orange-500",
                  label: "HIGH",
                },
              ].map((item) => (
                <div
                  key={item.icon}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 text-centre"
                >
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${item.severity}/20 mb-2`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${item.severity}`}
                    />
                    <span className="text-[10px] font-bold text-white/70">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white mb-1">
                    {item.icon}
                  </p>
                  <p className="text-[11px] text-white/50">{item.check}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-4">
              Severity ratings based on potential consequence. CRITICAL = potential
              for fatality or life-changing injury. HIGH = potential for serious
              injury. MEDIUM = potential for moderate injury. All hazards require
              active management and appropriate control measures.
            </p>
          </div>
        </section>

        {/* ── Section 07: Crushing and Trapping During Erection ── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">07</span>
            Crushing &amp; Trapping During Erection
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Crushing and trapping injuries occur when scaffold components
                fall onto or trap operatives during erection, alteration, or
                dismantling. These injuries predominantly affect ground-level
                workers and those immediately below the working level. A single
                scaffold tube weighing approximately 20 kg falling from even a
                modest height can cause devastating injuries including skull
                fractures, spinal injuries, and crush injuries to limbs.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Crushing Hazard Scenarios
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Dropped Tubes and Fittings
                      </p>
                      <p className="text-sm text-white/80">
                        During erection, scaffolders pass tubes and fittings up
                        to the working level. A tube that slips from a wet or
                        gloved hand, or a fitting that is not properly secured,
                        can fall onto workers below. The exclusion zone beneath
                        the erection area is the primary defence.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Uncontrolled Board Movement
                      </p>
                      <p className="text-sm text-white/80">
                        Scaffold boards are long, heavy, and flexible. When
                        being lifted, swung into position, or stacked, they can
                        strike workers at the same level or swing downward and
                        hit those below. Boards must be handled with care and
                        lifted by at least two operatives.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Scaffold Section Collapse During Erection
                      </p>
                      <p className="text-sm text-white/80">
                        If bracing or ties are not installed in the correct
                        sequence, a partially erected scaffold can become
                        unstable and collapse onto the erection gang. Following
                        the manufacturer&rsquo;s erection sequence precisely is
                        essential to prevent this scenario.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Trapping Between Components
                      </p>
                      <p className="text-sm text-white/80">
                        Fingers, hands, and limbs can be trapped between scaffold
                        tubes, between tubes and the building, or in the jaws of
                        scaffold fittings. Proper gloves, good communication
                        between team members, and careful positioning reduce
                        this risk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">
                    Control Measures for Crushing Hazards
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Exclusion zones:
                      </strong>{" "}
                      Barrier off the area directly beneath the erection or
                      dismantling zone. No one except the erection gang should
                      enter this zone during operations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Communication systems:
                      </strong>{" "}
                      Clear verbal communication or radio contact between the
                      scaffolders at the working level and ground-level
                      operatives. No component should be passed or lowered until
                      the receiver has confirmed they are ready
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Mechanical lifting:
                      </strong>{" "}
                      Where practicable, use mechanical means (hoists, gin
                      wheels with proper guards, or crane assistance) to lift
                      scaffold components rather than manual handling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        PPE:
                      </strong>{" "}
                      Hard hats (EN 397), safety boots with metatarsal
                      protection where appropriate, and scaffold-specific gloves.
                      PPE is the last line of defence and must not be relied upon
                      as the primary control
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The hierarchy of control applies to crushing hazards just as it
                does to every other workplace risk. Elimination (can the task be
                done differently?), engineering controls (exclusion zones, catch
                fans), administrative controls (safe systems of work, permits),
                and finally PPE. Too often on construction sites, PPE is treated
                as the primary control, when in fact it should be the last
                resort.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ── Section 08: Unauthorised Modifications ──────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Unauthorised Modifications
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An unauthorised modification is any change to a scaffold
                structure that is made without the knowledge and approval of
                the scaffolding contractor or the competent person responsible
                for the scaffold design. Unauthorised modifications are one of
                the most persistent and dangerous problems on construction
                sites, and they are frequently the underlying cause of scaffold
                collapse, falls, and other serious incidents.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Examples of Unauthorised Modifications
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Removing guard rails:
                      </strong>{" "}
                      Trades remove guard rails to pass materials through, to
                      gain access to the building face, or simply because they
                      are &ldquo;in the way.&rdquo; This is the most common
                      unauthorised modification and one of the most dangerous
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Removing ties:
                      </strong>{" "}
                      Cladding contractors, window installers, and other facade
                      trades remove ties to access the building. As discussed
                      in Section 04, this can cause catastrophic scaffold
                      collapse
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Removing or repositioning boards:
                      </strong>{" "}
                      Operatives remove boards to create openings for material
                      hoisting, to access the level below, or to use the boards
                      elsewhere. This creates fall-through hazards and reduces
                      the platform&rsquo;s structural capacity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Removing bracing:
                      </strong>{" "}
                      Diagonal and ledger bracing is removed to create access
                      openings or because it obstructs the work. Bracing
                      provides structural stability, and its removal can cause
                      the scaffold to buckle
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Adding extra lifts or loading bays:
                      </strong>{" "}
                      Operatives or site managers ask for additional lifts,
                      cantilevers, or loading bays to be added by unskilled
                      persons rather than the scaffolding contractor. The
                      structural design of the scaffold may not accommodate these
                      additions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Attaching banners, sheeting, or signage:
                      </strong>{" "}
                      Fitting sheeting, advertising banners, or large signs to
                      a scaffold without redesigning the tie pattern and bracing
                      to account for the increased wind load is an unauthorised
                      modification that significantly increases the risk of
                      collapse
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Legal Position
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Under the Work at Height Regulations 2005, Regulation 8, no
                  person shall alter a scaffold in such a way that it could
                  become unsafe unless the alteration is carried out under the
                  direction of a competent person. Any person who makes an
                  unauthorised modification commits a criminal offence. The
                  individual who made the modification, the trade contractor
                  who instructed them to do it, and the principal contractor
                  who failed to prevent it can all be prosecuted.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Preventing Unauthorised Modifications
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Scaffold tagging systems:
                      </strong>{" "}
                      Use a green/amber/red tag system to show the scaffold
                      status. Green = safe to use. Red = do not use. Tags must
                      be checked before every access
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Permit-to-alter systems:
                      </strong>{" "}
                      No modification, however minor, may be made without a
                      written permit signed by the scaffolding contractor and
                      the site manager. The permit must specify what is being
                      altered, why, and what alternative protection is in place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Site induction:
                      </strong>{" "}
                      Every person who enters the site must be told during
                      induction that interfering with scaffolding is prohibited
                      and is a criminal offence. The consequence of
                      non-compliance (removal from site, disciplinary action)
                      must be made clear
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Regular scaffold inspections:
                      </strong>{" "}
                      Frequent inspections by the scaffolding contractor will
                      identify unauthorised modifications early, before they
                      lead to an incident. Spot checks at random times are
                      more effective than scheduled inspections alone
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Clear reporting culture:
                      </strong>{" "}
                      Operatives must feel confident reporting unauthorised
                      modifications without fear of reprisal. A just culture
                      that encourages reporting and addresses the root cause
                      (rather than blaming individuals) is far more effective
                      than a punitive approach
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The most effective way to prevent unauthorised modifications is
                to ensure that every person on site understands why the
                scaffold is designed the way it is. When trades understand that
                removing a tie could collapse the entire structure, they are
                far less likely to do it. Education, communication, and a
                genuine safety culture are more powerful than rules and
                regulations alone.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ──────────────────────────────────────── */}
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

        {/* ── Quiz ─────────────────────────────────────────────── */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* ── Bottom Navigation ────────────────────────────────── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-5-section-3">
              Next: Weather &amp; Environmental Conditions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
