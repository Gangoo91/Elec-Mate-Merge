import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Search,
  Shield,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ──────────────────────────────────────────────────────────
   Quick-check questions (placed after sections 02, 05, 07)
   ────────────────────────────────────────────────────────── */
const quickCheckQuestions = [
  {
    id: "hierarchy-first-priority",
    question:
      "What is the FIRST priority in the three-tier hierarchy for managing confined space risk?",
    options: [
      "Avoid entry to the confined space entirely — find an alternative way to do the work",
      "Put a safe system of work in place so the entry can go ahead",
      "Ensure emergency rescue arrangements are ready before anyone enters",
      "Carry out atmospheric monitoring inside the space",
    ],
    correctIndex: 0,
    explanation:
      "The first and most important tier of the hierarchy is to AVOID entry altogether. If the work can be done from outside — using CCTV, remote monitoring, long-reach tools, or redesigning the task — then no one needs to enter the confined space and the risk is eliminated. Only if avoidance is genuinely not reasonably practicable should you move to tier 2 (safe system of work) and tier 3 (emergency arrangements).",
  },
  {
    id: "dynamic-risk-assessment",
    question:
      "Why is a dynamic risk assessment important during confined space entry?",
    options: [
      "Because conditions inside a confined space can change rapidly and without warning during the work",
      "Because the initial risk assessment is only valid for one calendar year",
      "Because dynamic assessments are cheaper than written assessments",
      "Because the HSE requires a new paper form to be completed every 30 minutes",
    ],
    correctIndex: 0,
    explanation:
      "Conditions inside a confined space can change rapidly — for example, an oxygen-depleting process may accelerate, a toxic gas may seep in from surrounding ground, or work activities (such as using adhesives or solvents) may introduce new hazards. A dynamic risk assessment means the entrants and the top person continuously monitor conditions, reassess the risks, and are prepared to evacuate immediately if anything changes.",
  },
  {
    id: "review-triggers",
    question:
      "Which of the following should trigger a review of a confined space risk assessment?",
    options: [
      "All of the following: a change in conditions, a near miss, new information about the space, or before each new entry",
      "Only a fatality or serious injury",
      "Only when the HSE issues new regulations",
      "Only at the annual health and safety audit",
    ],
    correctIndex: 0,
    explanation:
      "A confined space risk assessment must be reviewed whenever there is a change in conditions (e.g. weather, water ingress, process changes), after any near miss or incident, when new information about the space becomes available (e.g. updated survey data), and before each new entry — because the space may have changed since the last entry. Waiting for a fatality, a regulatory change, or an annual audit is far too late.",
  },
];

/* ──────────────────────────────────────────────────
   FAQs
   ────────────────────────────────────────────────── */
const faqs = [
  {
    question:
      "Can a generic risk assessment be used for confined space work?",
    answer:
      "No. A generic or template risk assessment is not sufficient for confined space work. The Confined Spaces Regulations 1997 and ACoP L101 require a risk assessment that is specific to the particular confined space, the particular task, and the particular conditions at the time of entry. A generic assessment may be used as a starting point or checklist, but it must be tailored to the individual space — taking into account its unique hazards, atmospheric conditions, access arrangements, and the specific work to be carried out. Using a generic assessment without adaptation is a common enforcement finding by the HSE.",
  },
  {
    question:
      "Who should carry out the confined space risk assessment?",
    answer:
      "The risk assessment must be carried out by a competent person — someone with sufficient training, experience, knowledge, and understanding of the hazards involved. In practice this is often a site supervisor, safety officer, or specialist confined space consultant. The person carrying out the assessment must understand the specific hazards of the confined space (atmospheric, physical, environmental), the work to be done, the equipment required, and the emergency arrangements. If the competent person is not sure about a hazard (for example, atmospheric contamination from adjacent processes), they must seek specialist advice.",
  },
  {
    question:
      "How do individual factors like claustrophobia affect the risk assessment?",
    answer:
      "Individual factors must be considered as part of the risk assessment process. Claustrophobia can cause panic, which may lead to accidents, inability to follow emergency procedures, or attempts to remove breathing apparatus. Other individual factors include physical fitness (confined spaces often require climbing, crawling, or working in awkward positions), medication (some drugs cause drowsiness or affect balance), and training (only trained and competent persons should enter). Workers must be asked about these factors before entry, and anyone who is not fit or suitable must not be required to enter.",
  },
  {
    question:
      "What is the difference between a static and a dynamic risk assessment?",
    answer:
      "A static (or formal) risk assessment is the written, pre-entry assessment carried out before work begins. It identifies the hazards, evaluates the risks, and sets out the precautions. A dynamic risk assessment is the continuous, real-time reassessment carried out during the entry. It involves the entrants and the top person constantly monitoring conditions, watching for changes, and being prepared to stop work and evacuate if anything changes. Both are essential — the static assessment plans the work, and the dynamic assessment ensures the plan remains valid throughout the entry. If the dynamic assessment reveals a new hazard or a change in conditions, work must stop and the formal assessment must be reviewed.",
  },
];

/* ──────────────────────────────────────────────────
   End-of-section quiz (8 questions)
   ────────────────────────────────────────────────── */
const quizQuestions = [
  {
    id: 1,
    question:
      "Why is a generic risk assessment insufficient for confined space work?",
    options: [
      "Because generic assessments are not recognised by the HSE",
      "Because every confined space has unique hazards, conditions, and access requirements that must be individually assessed",
      "Because generic assessments are too expensive to produce",
      "Because generic assessments can only be used for office environments",
    ],
    correctAnswer: 1,
    explanation:
      "Every confined space is different — it has its own atmospheric hazards, physical layout, access restrictions, and environmental conditions. A generic assessment cannot capture these unique factors. The Confined Spaces Regulations 1997 require a risk assessment specific to the particular space, task, and conditions at the time of entry.",
  },
  {
    id: 2,
    question:
      "What is the purpose of a confined space register?",
    options: [
      "To record the names of all workers who have entered confined spaces",
      "To provide a documented inventory of all confined spaces on site, their locations, hazards, and access requirements",
      "To log the results of atmospheric monitoring during each entry",
      "To track the expiry dates of gas detection equipment",
    ],
    correctAnswer: 1,
    explanation:
      "A confined space register is a site-level document that identifies and records all confined spaces on the premises. For each space it typically records the location, a description, the known or anticipated hazards, access and egress arrangements, and any special requirements. It is the starting point for planning any confined space work and ensures no space is overlooked.",
  },
  {
    id: 3,
    question:
      "In the three-tier hierarchy, what should you do if entry to a confined space cannot be avoided?",
    options: [
      "Cancel the work entirely",
      "Enter without precautions to complete the job quickly",
      "Implement a safe system of work, with emergency arrangements in place before entry",
      "Ask an apprentice to carry out the entry instead",
    ],
    correctAnswer: 2,
    explanation:
      "If entry cannot be avoided (tier 1), you move to tier 2: implement a safe system of work that controls the identified risks. Tier 3 must also be in place — emergency arrangements must be established BEFORE entry begins. You never enter a confined space without both a safe system of work and emergency procedures ready.",
  },
  {
    id: 4,
    question:
      "Which of the following is an atmospheric hazard in a confined space?",
    options: [
      "Risk of engulfment by loose materials",
      "Excessive noise from mechanical equipment",
      "Oxygen depletion, toxic gas accumulation, or a flammable atmosphere",
      "Risk of entrapment by moving machinery parts",
    ],
    correctAnswer: 2,
    explanation:
      "Atmospheric hazards include oxygen depletion (below 19.5%), oxygen enrichment (above 23.5%), toxic gases (such as hydrogen sulphide, carbon monoxide, or methane), and flammable atmospheres. Engulfment and entrapment are physical hazards; noise is an environmental hazard.",
  },
  {
    id: 5,
    question:
      "What is meant by 'dynamic risk assessment' during confined space entry?",
    options: [
      "A risk assessment completed on a moving vehicle",
      "An assessment that is only valid for one shift",
      "Continuous real-time monitoring and reassessment of conditions during the entry",
      "A risk assessment carried out by a team rather than an individual",
    ],
    correctAnswer: 2,
    explanation:
      "Dynamic risk assessment is the continuous, real-time process of monitoring conditions, watching for changes, and reassessing risks throughout the confined space entry. If conditions change (e.g. gas readings rise, ventilation fails, weather deteriorates), the dynamic assessment should trigger an immediate response — which may include evacuating the space.",
  },
  {
    id: 6,
    question:
      "Which of the following is an example of avoiding confined space entry (tier 1)?",
    options: [
      "Sending two workers into the space instead of one",
      "Using CCTV cameras to inspect the inside of a tank instead of sending a person in",
      "Wearing a self-contained breathing apparatus during entry",
      "Posting a top person at the entrance while the entrant works inside",
    ],
    correctAnswer: 1,
    explanation:
      "Using CCTV cameras to inspect a tank from outside eliminates the need for anyone to enter the confined space — this is tier 1: avoid entry entirely. The other options (extra workers, SCBA, top person) are all measures used when entry is unavoidable, falling under tiers 2 and 3.",
  },
  {
    id: 7,
    question:
      "Which individual factor could make a worker unsuitable for confined space entry?",
    options: [
      "Being left-handed",
      "Having more than 10 years of electrical experience",
      "Taking medication that causes drowsiness or impaired balance",
      "Preferring to work in the morning rather than the afternoon",
    ],
    correctAnswer: 2,
    explanation:
      "Medication that causes drowsiness or impaired balance is a significant individual risk factor. In a confined space, impaired alertness or balance could prevent a worker from responding to an emergency, following escape procedures, or safely using breathing apparatus. Other relevant individual factors include claustrophobia, physical fitness, and level of training.",
  },
  {
    id: 8,
    question:
      "At what point in the risk assessment process should emergency arrangements be decided?",
    options: [
      "After the first entry has been completed",
      "Before any person enters the confined space — as part of the pre-entry planning",
      "Only after an incident has occurred",
      "When the work is 50% complete",
    ],
    correctAnswer: 1,
    explanation:
      "Emergency arrangements must be decided and put in place BEFORE any person enters the confined space. This is a fundamental requirement of the Confined Spaces Regulations 1997 (Regulation 5) and the third tier of the hierarchy. No entry should ever take place without emergency rescue arrangements being ready, tested, and understood by all involved.",
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ConfinedSpacesModule2Section2() {
  useSEO({
    title:
      "Risk Assessment for Confined Spaces | Confined Spaces Module 2.2",
    description:
      "Learn why specific confined space risk assessments are required, the three-tier hierarchy (avoid, safe system, emergency), hazard categories, dynamic risk assessment, and review triggers.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ─── Header ─── */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-cyan-400" />
          </div>
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-cyan-400">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Risk Assessment for Confined Spaces
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding why every confined space needs its own specific risk
            assessment, how to apply the three-tier hierarchy, and how to keep
            the assessment live throughout the entry
          </p>
        </div>

        {/* ─── Summary Boxes ─── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="font-semibold text-cyan-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Generic assessments fail:</strong>{" "}
                  every confined space has unique hazards requiring a specific assessment
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">3-tier hierarchy:</strong> (1)
                  avoid entry, (2) safe system of work, (3) emergency
                  arrangements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Six hazard categories:</strong>{" "}
                  atmospheric, physical, environmental, biological, mechanical,
                  electrical
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Dynamic assessment:</strong>{" "}
                  conditions can change at any moment &mdash; continuous
                  reassessment is essential
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="font-semibold text-cyan-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Always ask:</strong> can this
                  work be done without entering the space?
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Check the register:</strong>{" "}
                  is this space on the site confined space register?
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Never rely on yesterday&rsquo;s
                  assessment:</strong> conditions may have changed overnight
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">If in doubt, stay out:</strong>{" "}
                  evacuate and reassess if anything changes during entry
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Learning Outcomes ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Explain why a specific risk assessment is required for every confined space entry and why generic assessments are insufficient",
              "Describe how to identify confined spaces on site using a site survey and confined space register",
              "Apply the three-tier hierarchy: avoid entry, safe system of work, emergency arrangements",
              "List the seven steps of the confined space risk assessment process from identification through to review",
              "Categorise confined space hazards into six groups: atmospheric, physical, environmental, biological, mechanical, and electrical",
              "Explain the purpose of dynamic risk assessment and how it differs from the pre-entry (static) assessment",
              "Identify task-specific and individual factors that must be considered before and during entry",
              "State the triggers that require a risk assessment to be reviewed or repeated",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ═══════════════════════════════════════════
            SECTION 01 — Why Specific Risk Assessment?
            ═══════════════════════════════════════════ */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">01</span>
              Why a Specific Risk Assessment Is Required
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Regulation 3 of the{" "}
                <strong className="text-white">
                  Confined Spaces Regulations 1997
                </strong>{" "}
                requires employers to carry out a{" "}
                <strong className="text-white">suitable and sufficient</strong>{" "}
                risk assessment before any work is carried out in a confined
                space. This assessment must be{" "}
                <strong className="text-white">specific</strong> to the
                particular space, the particular task, and the particular
                conditions at the time of entry.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-cyan-400">
                  Key Principle: No Two Confined Spaces Are the Same
                </h3>
                <p className="text-white/80 text-sm">
                  A manhole on a busy road has different hazards to a storage
                  tank in a chemical plant or a ceiling void in an office
                  building. Even two seemingly identical manholes on the same
                  street may have different atmospheric conditions, water levels,
                  and access restrictions. A{" "}
                  <strong className="text-white">generic</strong> or{" "}
                  <strong className="text-white">template</strong> risk
                  assessment cannot capture these differences &mdash; and using
                  one without adaptation is a common finding in HSE enforcement
                  actions.
                </p>
              </div>

              <p>
                A specific risk assessment takes account of:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-medium mb-2">
                  What Makes a Confined Space Assessment &ldquo;Specific&rdquo;
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">The space itself:</strong>{" "}
                      dimensions, layout, access/egress points, construction
                      materials, previous contents, adjacent processes
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">The task:</strong>{" "}
                      what work is to be done, what tools and materials will be
                      taken in, estimated duration, number of entrants
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Current conditions:
                      </strong>{" "}
                      atmospheric readings taken on the day, weather, water
                      levels, recent process activity, adjacent work
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">The people:</strong>{" "}
                      competence, fitness, training, individual factors such as
                      claustrophobia or medication
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-cyan-300">
                    Common Mistake: Reusing Last Year&rsquo;s Assessment
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  A risk assessment that was valid six months ago may no longer
                  be adequate. Conditions change &mdash; pipes corrode, processes
                  are altered, water tables rise, and adjacent works introduce
                  new hazards. Every entry requires the assessment to be reviewed
                  and, if necessary, rewritten. Never treat a confined space risk
                  assessment as a &ldquo;tick-and-file&rdquo; document.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 02 — Identifying Confined Spaces on Site
            ═══════════════════════════════════════════ */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">02</span>
              Identifying Confined Spaces on Site
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Before any confined space work can be planned, you must first{" "}
                <strong className="text-white">identify</strong> every confined
                space on site. This is done through a{" "}
                <strong className="text-white">site survey</strong> and recorded
                in a{" "}
                <strong className="text-white">confined space register</strong>.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  The Site Survey Process
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Walk the Entire Site
                      </p>
                      <p className="text-white/60">
                        A competent person physically inspects all areas of the
                        site, including basements, roofs, plant rooms, service
                        risers, external compounds, and underground chambers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Review Drawings and Records
                      </p>
                      <p className="text-white/60">
                        Check building plans, drainage layouts, service drawings,
                        and previous survey records. Some confined spaces (such
                        as buried tanks or disused ducts) may not be visible
                        during a walkover.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Consult Site Personnel
                      </p>
                      <p className="text-white/60">
                        Talk to maintenance staff, facility managers, and
                        long-serving workers who may know about spaces that are
                        not shown on drawings &mdash; such as old inspection pits,
                        sealed chambers, or modified ducts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Apply the Legal Definition
                      </p>
                      <p className="text-white/60">
                        For each space identified, determine whether it meets the
                        legal definition of a confined space: substantially (but
                        not always entirely) enclosed, not designed or intended
                        for continuous occupancy, and with a foreseeable risk of
                        serious injury from a specified hazard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-cyan-400">
                  The Confined Space Register
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Every identified confined space should be recorded in a{" "}
                  <strong className="text-white">
                    confined space register
                  </strong>{" "}
                  &mdash; a documented inventory maintained by the site
                  controller or employer. For each space, the register typically
                  records:
                </p>
                <ul className="text-white/70 text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Location (with plan reference or GPS coordinates)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Description (type, dimensions, construction, access
                      points)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Known or anticipated hazards (atmospheric, physical, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Classification (e.g. low risk / medium risk / high risk)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Date of last survey and next review date
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The register must be{" "}
                <strong className="text-white">kept up to date</strong> &mdash;
                new spaces must be added as they are discovered, and spaces that
                have been permanently sealed or removed should be updated. The
                register is a living document, not a one-off exercise.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Inline Check 1 (after section 02) ─── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ═══════════════════════════════════════════
            SECTION 03 — The Three-Tier Hierarchy
            ═══════════════════════════════════════════ */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">03</span>
              The Three-Tier Hierarchy
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The Confined Spaces Regulations 1997 establish a clear{" "}
                <strong className="text-white">hierarchy of control</strong>{" "}
                that must be followed in order. You must not skip to a lower
                tier until you have genuinely exhausted the tier above.
              </p>

              {/* ─── 3-Tier Hierarchy Diagram ─── */}
              <div className="my-6">
                <h3 className="text-cyan-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  3-Tier Hierarchy Diagram
                </h3>

                {/* Tier 1 */}
                <div className="flex justify-center mb-3">
                  <div className="bg-green-500/15 border-2 border-green-500/40 rounded-xl px-5 py-4 text-center max-w-md w-full">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-green-500/30 border border-green-400/50 flex items-center justify-center">
                        <span className="text-green-300 text-xs font-bold">1</span>
                      </div>
                      <p className="text-green-300 font-bold text-sm">
                        AVOID ENTRY ENTIRELY
                      </p>
                    </div>
                    <p className="text-white/70 text-xs">
                      Can the work be done without anyone entering? Use CCTV,
                      remote monitoring, long-reach tools, or redesign the task.
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center mb-3">
                  <div className="w-0.5 h-4 bg-white/20"></div>
                  <p className="text-white/40 text-[10px] my-1">
                    Only if avoidance is not reasonably practicable
                  </p>
                  <div className="w-0.5 h-4 bg-white/20"></div>
                </div>

                {/* Tier 2 */}
                <div className="flex justify-center mb-3">
                  <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl px-5 py-4 text-center max-w-md w-full">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-amber-500/30 border border-amber-400/50 flex items-center justify-center">
                        <span className="text-amber-300 text-xs font-bold">2</span>
                      </div>
                      <p className="text-amber-300 font-bold text-sm">
                        SAFE SYSTEM OF WORK
                      </p>
                    </div>
                    <p className="text-white/70 text-xs">
                      If entry is unavoidable, implement a written safe system of
                      work &mdash; including permits, supervision, atmospheric
                      monitoring, ventilation, PPE, and communication.
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center mb-3">
                  <div className="w-0.5 h-4 bg-white/20"></div>
                  <p className="text-white/40 text-[10px] my-1">
                    MUST be in place before entry — not an afterthought
                  </p>
                  <div className="w-0.5 h-4 bg-white/20"></div>
                </div>

                {/* Tier 3 */}
                <div className="flex justify-center">
                  <div className="bg-red-500/15 border-2 border-red-500/40 rounded-xl px-5 py-4 text-center max-w-md w-full">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-red-500/30 border border-red-400/50 flex items-center justify-center">
                        <span className="text-red-300 text-xs font-bold">3</span>
                      </div>
                      <p className="text-red-300 font-bold text-sm">
                        EMERGENCY ARRANGEMENTS
                      </p>
                    </div>
                    <p className="text-white/70 text-xs">
                      Emergency rescue procedures, trained rescue team, rescue
                      equipment, communication with emergency services &mdash;
                      all in place and tested BEFORE entry begins.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Tier 1: Alternatives to Entry
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Before accepting that entry is necessary, the employer must
                  genuinely explore alternatives. Common alternatives include:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">CCTV inspection:</strong>{" "}
                      cameras on flexible rods or drones can inspect tanks,
                      vessels, and ducts without anyone entering
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Remote monitoring:
                      </strong>{" "}
                      sensors for level, temperature, pressure, and gas
                      concentration can be installed from outside
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Long-reach tools:
                      </strong>{" "}
                      cleaning, sampling, and minor repairs can sometimes be
                      carried out using extended tools from outside the space
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        External work:
                      </strong>{" "}
                      can pipework be modified, valves replaced, or connections
                      made from outside the confined space?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Redesign the task:
                      </strong>{" "}
                      can the process or system be modified so that routine
                      entry is no longer needed?
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-cyan-400">
                  Key Point: Tiers 2 and 3 Work Together
                </h3>
                <p className="text-white/80 text-sm">
                  If entry cannot be avoided, tier 2 (safe system of work) and
                  tier 3 (emergency arrangements) are not alternatives &mdash;
                  they <strong className="text-white">both</strong> must be in
                  place. You cannot have a safe system of work without emergency
                  arrangements, and emergency arrangements alone do not make an
                  entry safe. Both must be planned, documented, communicated, and
                  ready before the first person enters the space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 04 — The Risk Assessment Process
            ═══════════════════════════════════════════ */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">04</span>
              The Risk Assessment Process
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The confined space risk assessment follows a structured,
                seven-step process. Each step must be completed thoroughly before
                moving to the next.
              </p>

              {/* ─── Risk Assessment Flowchart ─── */}
              <div className="my-6">
                <h3 className="text-purple-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Risk Assessment Flowchart
                </h3>

                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="flex justify-center">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-4 py-3 max-w-lg w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-300 text-xs font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-semibold text-sm">
                            Identify the Confined Space
                          </p>
                          <p className="text-white/60 text-xs">
                            Confirm it meets the legal definition. Record it in
                            the register if not already listed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-purple-400/30"></div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex justify-center">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-4 py-3 max-w-lg w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-300 text-xs font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-semibold text-sm">
                            Identify the Hazards
                          </p>
                          <p className="text-white/60 text-xs">
                            Atmospheric, physical, environmental, biological,
                            mechanical, electrical &mdash; consider all six
                            categories.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-purple-400/30"></div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex justify-center">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-4 py-3 max-w-lg w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-300 text-xs font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-semibold text-sm">
                            Assess Who Might Be Harmed
                          </p>
                          <p className="text-white/60 text-xs">
                            Entrants, top person, rescue team, nearby workers,
                            members of the public, emergency services.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-purple-400/30"></div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex justify-center">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-4 py-3 max-w-lg w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-300 text-xs font-bold">4</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-semibold text-sm">
                            Evaluate the Risks
                          </p>
                          <p className="text-white/60 text-xs">
                            Consider likelihood and severity. Can the risk be
                            eliminated? If not, how can it be reduced to as low
                            as reasonably practicable (ALARP)?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-purple-400/30"></div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex justify-center">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-4 py-3 max-w-lg w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-300 text-xs font-bold">5</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-semibold text-sm">
                            Decide on Precautions
                          </p>
                          <p className="text-white/60 text-xs">
                            Specify the control measures: ventilation, gas
                            monitoring, PPE, permits, isolation, rescue
                            equipment, communication systems.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-purple-400/30"></div>
                  </div>

                  {/* Step 6 */}
                  <div className="flex justify-center">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-4 py-3 max-w-lg w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-300 text-xs font-bold">6</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-semibold text-sm">
                            Record the Findings
                          </p>
                          <p className="text-white/60 text-xs">
                            Write it down. If you employ five or more people, a
                            written record is a legal requirement &mdash; but
                            best practice is to record every assessment
                            regardless of organisation size.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-purple-400/30"></div>
                  </div>

                  {/* Step 7 */}
                  <div className="flex justify-center">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-4 py-3 max-w-lg w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-300 text-xs font-bold">7</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-semibold text-sm">
                            Review and Update
                          </p>
                          <p className="text-white/60 text-xs">
                            Review before each entry, after any incident or near
                            miss, when conditions change, and at regular
                            intervals. Update the assessment and communicate
                            changes to all involved.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The assessment must be carried out by a{" "}
                <strong className="text-white">competent person</strong> &mdash;
                someone with sufficient training, knowledge, and experience of
                confined space hazards. If specialist knowledge is needed (e.g.
                for atmospheric testing or structural assessment), external
                expertise must be obtained.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 05 — Hazard Categories
            ═══════════════════════════════════════════ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">05</span>
              Hazard Categories
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Confined space hazards are grouped into{" "}
                <strong className="text-white">six categories</strong>. The risk
                assessment must consider all six &mdash; not just the obvious
                atmospheric hazards.
              </p>

              {/* Atmospheric */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Activity className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    1. Atmospheric Hazards
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  The most common cause of confined space fatalities. Atmospheric
                  hazards include:
                </p>
                <ul className="text-white/70 text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Oxygen depletion (O₂ &lt; 19.5%):
                      </strong>{" "}
                      caused by rusting, biological decay, displacement by other
                      gases, absorption by the ground, or reaction with
                      chemicals
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Oxygen enrichment (O₂ &gt; 23.5%):
                      </strong>{" "}
                      increases the risk of fire and explosion &mdash; materials
                      ignite more easily and burn more fiercely
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Toxic gases:</strong>{" "}
                      hydrogen sulphide (H₂S), carbon monoxide (CO), carbon
                      dioxide (CO₂), nitrogen dioxide (NO₂), chlorine, ammonia
                      &mdash; can accumulate from processes, decomposition, or
                      ingress from adjacent spaces
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Flammable atmosphere:
                      </strong>{" "}
                      methane, petrol vapour, solvent fumes, hydrogen &mdash; an
                      ignition source (spark, flame, hot surface) could cause an
                      explosion
                    </div>
                  </li>
                </ul>
              </div>

              {/* Physical */}
              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-2">
                  2. Physical Hazards
                </h3>
                <ul className="text-white/70 text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Engulfment:</strong>{" "}
                      being buried or submerged by loose materials such as grain,
                      sand, coal, or sewage solids
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Entrapment:</strong>{" "}
                      getting stuck due to the shape or narrowing of the space,
                      or becoming trapped by equipment
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Drowning:</strong>{" "}
                      sudden flooding from rain, pipe bursts, rising water
                      tables, or release of stored liquids
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Falls from height:</strong>{" "}
                      entry via ladders, vertical shafts, or elevated platforms
                      within the space
                    </div>
                  </li>
                </ul>
              </div>

              {/* Environmental */}
              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-2">
                  3. Environmental Hazards
                </h3>
                <ul className="text-white/70 text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Extreme temperature:
                      </strong>{" "}
                      heat stress from hot processes, solar gain on metal
                      structures, or cold exposure in underground spaces
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Noise:</strong>{" "}
                      amplified by enclosed spaces &mdash; even relatively quiet
                      tools can produce harmful noise levels when reflected off
                      walls
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Poor lighting:</strong>{" "}
                      many confined spaces have no natural light, making hazard
                      identification and movement difficult
                    </div>
                  </li>
                </ul>
              </div>

              {/* Biological, Mechanical, Electrical */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                  <h3 className="text-green-300 font-medium mb-2 text-sm">
                    4. Biological
                  </h3>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                      <span>
                        Leptospirosis (Weil&rsquo;s disease) from rat urine in
                        sewers
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                      <span>
                        Fungal spores in poorly ventilated spaces
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                      <span>
                        Bacterial contamination in water tanks or drains
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-orange-400/30 p-4 rounded-lg">
                  <h3 className="text-orange-300 font-medium mb-2 text-sm">
                    5. Mechanical
                  </h3>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0"></div>
                      <span>
                        Unguarded machinery that could start unexpectedly
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0"></div>
                      <span>
                        Agitators, mixers, or augers inside vessels
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0"></div>
                      <span>
                        Pressurised systems (valves, pipes, relief devices)
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-yellow-400/30 p-4 rounded-lg">
                  <h3 className="text-yellow-300 font-medium mb-2 text-sm">
                    6. Electrical
                  </h3>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0"></div>
                      <span>
                        Live conductors, cables, or equipment within the space
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0"></div>
                      <span>
                        Increased shock risk in damp or wet conditions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0"></div>
                      <span>
                        Reduced-voltage tools (110V or battery) may be required
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-cyan-400">
                  Remember: Multiple Hazards Are the Norm
                </h3>
                <p className="text-white/80 text-sm">
                  Most confined spaces present hazards from{" "}
                  <strong className="text-white">
                    more than one category at the same time
                  </strong>
                  . For example, a cable tunnel may have atmospheric hazards
                  (oxygen depletion), physical hazards (restricted movement),
                  environmental hazards (extreme heat from cable runs),
                  electrical hazards (live circuits), and biological hazards
                  (rodent contamination). The risk assessment must consider every
                  applicable category &mdash; not just the most obvious one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Inline Check 2 (after section 05) ─── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ═══════════════════════════════════════════
            SECTION 06 — Dynamic Risk Assessment
            ═══════════════════════════════════════════ */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">06</span>
              Dynamic Risk Assessment
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The pre-entry (static) risk assessment is essential, but it
                represents conditions at a{" "}
                <strong className="text-white">single point in time</strong>.
                Inside a confined space, conditions can change{" "}
                <strong className="text-white">
                  rapidly and without warning
                </strong>
                :
              </p>

              <ul className="text-white/70 space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                  <span>
                    A chemical reaction accelerates, depleting oxygen faster than
                    predicted
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                  <span>
                    An upstream valve is opened, releasing toxic gas or liquid
                    into the space
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                  <span>
                    Heavy rain causes sudden flooding in an underground chamber
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                  <span>
                    The use of adhesives, solvents, or paints introduces
                    flammable vapours
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                  <span>
                    Ventilation equipment fails, and the atmosphere deteriorates
                    within minutes
                  </span>
                </li>
              </ul>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    What Dynamic Risk Assessment Means in Practice
                  </h3>
                </div>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>
                    <strong className="text-white">
                      Continuous gas monitoring:
                    </strong>{" "}
                    personal multi-gas detectors worn by every entrant, with
                    audible and vibrating alarms set to action levels.
                  </p>
                  <p>
                    <strong className="text-white">
                      Top person observation:
                    </strong>{" "}
                    the person stationed at the entry point watches for signs of
                    distress, changes in the entrant&rsquo;s behaviour, and
                    external factors (weather, nearby activities).
                  </p>
                  <p>
                    <strong className="text-white">
                      Regular communication checks:
                    </strong>{" "}
                    verbal or radio contact at agreed intervals (e.g. every 5
                    minutes). If contact is lost, the emergency procedure is
                    activated immediately.
                  </p>
                  <p>
                    <strong className="text-white">
                      Willingness to stop:
                    </strong>{" "}
                    everyone involved must understand that if{" "}
                    <strong className="text-white">anything</strong> changes
                    &mdash; a gas alarm sounds, the entrant feels unwell,
                    conditions feel wrong &mdash; work stops and the space is
                    evacuated. There is no &ldquo;just five more minutes&rdquo;
                    in a confined space.
                  </p>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-cyan-400">
                  Static + Dynamic = Complete Protection
                </h3>
                <p className="text-white/80 text-sm">
                  The static assessment <strong className="text-white">plans</strong>{" "}
                  the work. The dynamic assessment{" "}
                  <strong className="text-white">protects</strong> the workers
                  during the work. Both are essential. If the dynamic assessment
                  reveals a new hazard or a change in conditions, work must stop
                  and the formal (static) assessment must be reviewed and updated
                  before entry can resume.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 07 — Task-Specific and Individual Factors
            ═══════════════════════════════════════════ */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">07</span>
              Task-Specific and Individual Factors
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Beyond the hazards of the space itself, the risk assessment must
                also consider the{" "}
                <strong className="text-white">specific task</strong> to be
                carried out and the{" "}
                <strong className="text-white">individual workers</strong> who
                will be involved.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Search className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-teal-300 font-medium">
                    Task-Specific Factors
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Duration of entry:</strong>{" "}
                      longer entries increase exposure time and fatigue.
                      Maximum entry times may need to be set, with mandatory
                      rest breaks outside the space.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Number of entrants:
                      </strong>{" "}
                      more people consume more oxygen. The risk assessment must
                      consider the combined oxygen demand and ensure ventilation
                      is adequate for all entrants.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Tools and equipment:
                      </strong>{" "}
                      power tools generate heat, sparks, fumes, and noise. Hand
                      tools may be safer but slower. Equipment must be suitable
                      for the atmosphere (e.g. intrinsically safe in flammable
                      atmospheres).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Substances introduced:
                      </strong>{" "}
                      paints, adhesives, solvents, cleaning chemicals, welding
                      gases &mdash; all can change the atmosphere inside the
                      space. The risk assessment must account for every substance
                      taken in.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Hot work:</strong>{" "}
                      welding, cutting, grinding, or brazing introduces ignition
                      sources, toxic fumes, UV radiation, and extreme heat. Hot
                      work in a confined space is one of the highest-risk
                      activities and typically requires a separate hot work
                      permit in addition to the confined space permit.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Shield className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-cyan-300 font-medium">
                    Individual Factors
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Claustrophobia:</strong>{" "}
                      can cause panic, hyperventilation, inability to follow
                      procedures, and attempts to remove breathing apparatus.
                      Workers must be asked about this before assignment to
                      confined space work.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Physical fitness:</strong>{" "}
                      confined spaces often require climbing, crawling, working
                      in awkward positions, and wearing heavy PPE. Workers must
                      be physically capable of the task and of self-rescue if
                      necessary.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Medication:</strong>{" "}
                      some prescription and over-the-counter drugs cause
                      drowsiness, dizziness, or impaired coordination. Workers
                      on such medication should not enter confined spaces.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Training and competence:
                      </strong>{" "}
                      only workers who have received adequate confined space
                      training and who are competent in the use of the required
                      equipment (gas detectors, breathing apparatus, harnesses,
                      communication systems) should be permitted to enter.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-cyan-300">
                    Never Force Entry
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  No worker should ever be forced, pressured, or shamed into
                  entering a confined space if they are unwilling, unwell, or
                  believe conditions are unsafe. A worker who refuses entry on
                  safety grounds is exercising their legal right under{" "}
                  <strong className="text-white">
                    Section 7 of the Health and Safety at Work Act 1974
                  </strong>{" "}
                  and must not be disciplined or disadvantaged for doing so.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Inline Check 3 (after section 07) ─── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ═══════════════════════════════════════════
            SECTION 08 — Review Triggers
            ═══════════════════════════════════════════ */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              Review Triggers
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                A confined space risk assessment is{" "}
                <strong className="text-white">never &ldquo;done&rdquo;</strong>
                . It must be reviewed and, if necessary, updated whenever
                circumstances change. The following are recognised triggers for
                review:
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  When Must the Assessment Be Reviewed?
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Before Each New Entry
                      </p>
                      <p className="text-white/60">
                        Even if the same space was entered yesterday, conditions
                        may have changed overnight. The assessment must be
                        reviewed and confirmed as still valid before each entry.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Change in Conditions
                      </p>
                      <p className="text-white/60">
                        Weather changes (heavy rain, temperature swings),
                        process changes (upstream work, valve operations), or
                        physical changes (structural movement, water ingress,
                        new equipment installed).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        After a Near Miss or Incident
                      </p>
                      <p className="text-white/60">
                        Any near miss, dangerous occurrence, or actual incident
                        must trigger an immediate review. The investigation
                        findings must be fed back into the risk assessment to
                        prevent recurrence.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        New Information
                      </p>
                      <p className="text-white/60">
                        Discovery of previously unknown hazards (e.g. a
                        contaminated soil report), updated survey data, or new
                        guidance from the HSE or industry bodies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Change of Task or Personnel
                      </p>
                      <p className="text-white/60">
                        If the planned work changes (e.g. additional hot work is
                        needed) or different workers are assigned (with different
                        competence levels or individual factors), the assessment
                        must be revisited.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Scheduled Review Period
                      </p>
                      <p className="text-white/60">
                        Even without specific triggers, risk assessments should
                        be reviewed at agreed intervals (e.g. annually) to ensure
                        they reflect current knowledge, regulations, and best
                        practice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-cyan-400">
                  The Golden Rule
                </h3>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">
                    If in doubt, treat the assessment as out of date.
                  </strong>{" "}
                  It is always better to take 30 minutes to review and confirm
                  the assessment than to proceed on the basis of assumptions. In
                  confined space work, assumptions kill. Review the assessment,
                  confirm conditions, check equipment, brief the team &mdash;
                  then and only then should entry be authorised.
                </p>
              </div>

              <div className="bg-white/5 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-cyan-300">
                    Documentation Is Non-Negotiable
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Every review must be{" "}
                  <strong className="text-white">documented</strong> &mdash;
                  even if the review concludes that the existing assessment is
                  still valid. Record the date of review, who carried it out,
                  what was checked, and the conclusion. This provides an audit
                  trail and demonstrates that the duty to review was fulfilled.
                  In the event of an HSE investigation, the absence of review
                  records is treated as evidence that no review took place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
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

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="Section 2 Knowledge Check"
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
            <Link to="../confined-spaces-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Confined Spaces Regulations 1997
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-2-section-3">
              Next: Safe Systems of Work
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
