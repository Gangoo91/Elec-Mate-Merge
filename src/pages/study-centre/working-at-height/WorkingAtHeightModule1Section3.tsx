import { ArrowLeft, Search, CheckCircle, AlertTriangle, CloudRain, Users, ClipboardList, RefreshCw, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wah-ra-step1",
    question: "What is the first step in the five-step risk assessment process?",
    options: [
      "Record your findings",
      "Evaluate the risks and decide on precautions",
      "Identify the hazards",
      "Decide who might be harmed and how"
    ],
    correctIndex: 2,
    explanation: "The first step is to identify the hazards — walk the site, examine the task, and identify anything that could cause harm. For work at height, this means identifying fall hazards, fragile surfaces, overhead services, unprotected edges, and anything that could contribute to a fall."
  },
  {
    id: "wah-dynamic-ra",
    question: "What is a dynamic risk assessment?",
    options: [
      "A risk assessment carried out by a specialist consultant",
      "An ongoing, real-time assessment of changing conditions on site",
      "A risk assessment carried out after an accident has occurred",
      "A risk assessment valid for 12 months"
    ],
    correctIndex: 1,
    explanation: "A dynamic risk assessment is an ongoing, real-time process of assessing changing conditions as they arise. If the weather changes, an unexpected hazard is discovered, or conditions on site are different from what was planned, workers must reassess the risks and adapt their controls accordingly. It supplements — but does not replace — the formal written risk assessment."
  },
  {
    id: "wah-weather-factor",
    question: "At what wind speed should most work at height be stopped?",
    options: [
      "Above 10 mph",
      "Above 17 mph (Force 4)",
      "Above 23 mph (Force 5 / strong breeze)",
      "Above 40 mph"
    ],
    correctIndex: 2,
    explanation: "As a general guideline, most work at height should be stopped when sustained wind speeds exceed approximately 23 mph (Force 5 on the Beaufort scale — a fresh/strong breeze). However, some equipment manufacturers specify lower wind speed limits (e.g. many MEWPs must not be used above 28 mph / 12.5 m/s). Always check the manufacturer's operating instructions and apply the lowest applicable limit."
  }
];

const faqs = [
  {
    question: "Who is responsible for carrying out the risk assessment for work at height?",
    answer: "The employer (or the person who controls the work) is responsible for ensuring that a suitable and sufficient risk assessment is carried out. The assessment itself must be completed by a competent person — someone who has the knowledge, training, and experience to identify the hazards and evaluate the risks. For a self-employed electrician, they are responsible for their own risk assessments. On construction sites, the principal contractor coordinates risk management, but each contractor remains responsible for assessing the risks of their own work activities."
  },
  {
    question: "Does every work at height task need its own written risk assessment?",
    answer: "Not necessarily a separate document for each individual task, but the risk assessment must be specific enough to cover the actual hazards and conditions of each task. A generic risk assessment that covers 'working from ladders' in broad terms is unlikely to be suitable and sufficient for every ladder task on every site. The assessment must address site-specific factors (ground conditions, weather, nearby hazards), task-specific factors (duration, complexity, equipment needed), and the competence of the workers involved. In practice, many employers use a combination of a generic risk assessment and a site-specific supplement or method statement."
  },
  {
    question: "What should I do if conditions change during work at height?",
    answer: "If conditions change — for example, the weather deteriorates, an unexpected hazard is discovered, or the work turns out to be more complex than planned — you must stop work and carry out a dynamic risk assessment. Reassess the hazards and the adequacy of your current controls. If the existing controls are no longer sufficient, you must either implement additional controls or stop the work until it is safe to proceed. Never continue working at height if you believe it is unsafe, even if it means delaying the job."
  },
  {
    question: "How often should a risk assessment be reviewed?",
    answer: "Risk assessments should be reviewed whenever there is reason to suspect that the assessment is no longer valid — for example, if there has been an accident or near miss, if the work activity changes, if new equipment is introduced, or if there are changes to the workplace. As a minimum, risk assessments should be reviewed at regular intervals (many organisations review them annually). For work at height on construction sites, the risk assessment is typically reviewed before each new phase of work or whenever site conditions change significantly."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "How many steps are there in the HSE's recommended risk assessment process?",
    options: [
      "Three",
      "Four",
      "Five",
      "Six"
    ],
    correctAnswer: 2,
    explanation: "The HSE recommends a five-step risk assessment process: (1) Identify the hazards, (2) Decide who might be harmed and how, (3) Evaluate the risks and decide on precautions, (4) Record your significant findings, (5) Review your assessment and update if necessary."
  },
  {
    id: 2,
    question: "Which of the following is a site-specific factor that must be considered in a work at height risk assessment?",
    options: [
      "The colour of the electrician's overalls",
      "The brand of ladder being used",
      "The presence of overhead power lines near the work area",
      "The electrician's star sign"
    ],
    correctAnswer: 2,
    explanation: "The presence of overhead power lines is a critical site-specific factor. Overhead power lines present an electrocution hazard when using ladders, scaffolds, MEWPs, or any equipment that could come into contact with or close to live conductors. This must be identified and controlled in the risk assessment."
  },
  {
    id: 3,
    question: "What does 'suitable and sufficient' mean in the context of risk assessment?",
    options: [
      "The risk assessment must be perfect and cover every conceivable scenario",
      "The assessment must identify the significant risks and the steps needed to manage them",
      "The assessment must be at least 10 pages long",
      "The assessment must be approved by the HSE before work begins"
    ],
    correctAnswer: 1,
    explanation: "A 'suitable and sufficient' risk assessment is one that identifies the significant risks and the steps needed to manage them. It does not need to cover every trivial risk or be excessively detailed, but it must be thorough enough to address the real hazards and ensure that effective controls are in place."
  },
  {
    id: 4,
    question: "A dynamic risk assessment is best described as:",
    options: [
      "A risk assessment carried out by a consultant",
      "A formal written assessment carried out in the office before work starts",
      "A continuous, real-time assessment of changing conditions on site",
      "A risk assessment carried out after an incident"
    ],
    correctAnswer: 2,
    explanation: "A dynamic risk assessment is a continuous, real-time process of identifying and responding to hazards as they arise or change during the course of work. It supplements the formal written risk assessment and is essential when working at height because conditions (weather, ground, access, etc.) can change rapidly."
  },
  {
    id: 5,
    question: "Which of the following weather conditions is MOST likely to cause a work at height task to be stopped?",
    options: [
      "Light cloud cover",
      "Temperatures below 15°C",
      "High winds exceeding 23 mph with rain",
      "A sunny day with high UV levels"
    ],
    correctAnswer: 2,
    explanation: "High winds combined with rain are extremely dangerous for work at height. Wind can destabilise access equipment and catch materials like sheet metal, while rain makes surfaces slippery and reduces grip. Most work at height should be suspended when sustained wind speeds exceed approximately 23 mph (Force 5)."
  },
  {
    id: 6,
    question: "When recording the findings of a risk assessment, which of the following must be included?",
    options: [
      "Only the hazards — the control measures are optional",
      "The significant hazards identified, who is at risk, and the control measures in place",
      "Only a list of the equipment being used",
      "The names and addresses of all workers on site"
    ],
    correctAnswer: 1,
    explanation: "The recorded findings must include the significant hazards identified, who might be harmed and how, the existing control measures, any additional controls needed, and who is responsible for implementing them. Where an employer has five or more employees, the significant findings must be recorded in writing."
  },
  {
    id: 7,
    question: "Which of the following is NOT a typical task-specific factor in a work at height risk assessment?",
    options: [
      "The duration of the task",
      "The complexity of the electrical work",
      "The worker's favourite football team",
      "The type of access equipment required"
    ],
    correctAnswer: 2,
    explanation: "Task-specific factors include the duration of the task, its complexity, the equipment needed, the competence required, the tools and materials that must be taken to height, and the physical demands of the work. Personal preferences unrelated to the task are not relevant factors."
  },
  {
    id: 8,
    question: "For employers with 5 or more employees, risk assessment findings must be:",
    options: [
      "Memorised by the site supervisor",
      "Communicated verbally only",
      "Recorded in writing and made available to those affected",
      "Submitted to the HSE within 24 hours"
    ],
    correctAnswer: 2,
    explanation: "Under the Management of Health and Safety at Work Regulations 1999, employers with 5 or more employees must record the significant findings of their risk assessments in writing. These records must be accessible and communicated to those affected by the risks. Even for employers with fewer than 5 employees, recording findings is considered best practice."
  }
];

export default function WorkingAtHeightModule1Section3() {
  useSEO({
    title: "Risk Assessment for Working at Height | Working at Height Module 1.3",
    description: "The five-step risk assessment process, site-specific and task-specific factors, dynamic risk assessment, weather considerations, and recording findings for work at height.",
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
            <Link to="../working-at-height-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-500/30 mb-4">
            <Search className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Risk Assessment for Working at Height
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The five-step process for identifying hazards, evaluating risks, and implementing controls before any work at height begins
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Required by:</strong> Management Regs 1999 &amp; WAH Regs 2005</li>
              <li><strong>Process:</strong> 5 steps &mdash; identify, assess, evaluate, record, review</li>
              <li><strong>Must cover:</strong> Site-specific and task-specific factors</li>
              <li><strong>Dynamic RA:</strong> Ongoing reassessment when conditions change</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400 text-base font-medium mb-2">Key Factors</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Weather:</strong> Wind, rain, ice, lightning, visibility</li>
              <li><strong>Ground:</strong> Soft, uneven, sloping, contaminated</li>
              <li><strong>Overhead:</strong> Power lines, pipes, structural elements</li>
              <li><strong>People:</strong> Competence, experience, supervision needed</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the five-step risk assessment process recommended by the HSE",
              "Identify site-specific factors that affect work at height safety",
              "Identify task-specific factors that must be considered",
              "Explain the purpose and process of dynamic risk assessment",
              "Describe how weather conditions affect work at height decisions",
              "Explain the requirements for recording and communicating risk assessment findings"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-amber-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* 5-Step Risk Assessment Flowchart */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">&mdash;</span>
            Five-Step Risk Assessment Flowchart
          </h2>
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <p className="text-sm text-white/60 mb-6 text-center">The HSE&rsquo;s recommended approach to workplace risk assessment</p>

            <div className="max-w-sm mx-auto space-y-2">
              {/* Step 1 */}
              <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/30 text-amber-400 font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <p className="text-white font-semibold text-sm">Identify the Hazards</p>
                    <p className="text-white/60 text-xs">Walk the site, examine the task, identify what could cause harm</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-5 bg-amber-500/30" />
              </div>

              {/* Step 2 */}
              <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/30 text-blue-400 font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <p className="text-white font-semibold text-sm">Decide Who Might Be Harmed</p>
                    <p className="text-white/60 text-xs">Workers, apprentices, other trades, visitors, public</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-5 bg-blue-500/30" />
              </div>

              {/* Step 3 */}
              <div className="bg-purple-500/15 border-2 border-purple-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/30 text-purple-400 font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <p className="text-white font-semibold text-sm">Evaluate Risks &amp; Decide Precautions</p>
                    <p className="text-white/60 text-xs">Apply the hierarchy: avoid, prevent, mitigate. Select controls.</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-5 bg-purple-500/30" />
              </div>

              {/* Step 4 */}
              <div className="bg-green-500/15 border-2 border-green-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/30 text-green-400 font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <p className="text-white font-semibold text-sm">Record Your Findings</p>
                    <p className="text-white/60 text-xs">Document hazards, who is at risk, controls, and responsibilities</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-5 bg-green-500/30" />
              </div>

              {/* Step 5 */}
              <div className="bg-red-500/15 border-2 border-red-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/30 text-red-400 font-bold text-sm flex-shrink-0">5</div>
                  <div>
                    <p className="text-white font-semibold text-sm">Review &amp; Update</p>
                    <p className="text-white/60 text-xs">Revisit after incidents, changes, or at regular intervals</p>
                  </div>
                </div>
              </div>

              {/* Loop arrow back to Step 1 */}
              <div className="flex justify-center pt-2">
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <RefreshCw className="h-3 w-3" />
                  <span>Continuous cycle &mdash; review triggers return to Step 1</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: Step 1 — Identify the Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">01</span>
            Step 1 &mdash; Identify the Hazards
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The first and most important step is to identify every hazard associated with the
                work at height task. A <strong>hazard</strong> is anything that has the potential to
                cause harm. For work at height, the primary hazard is always the risk of a person
                falling, but there are many secondary hazards that must also be considered.
              </p>

              <p>
                To identify hazards effectively, you need to <strong>physically visit the work
                area</strong> (or carry out a thorough desk-top assessment using plans, photographs,
                and existing surveys where a site visit is not yet possible). Walk the route to and
                from the work position, examine the working area itself, look above, below, and
                around the work area, and speak to people who know the site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Common Hazards for Electricians Working at Height</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div>
                    <p className="text-white font-medium text-xs mb-1.5">Fall Hazards</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Unprotected edges (open floor hatches, stairwells, roof edges)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Fragile surfaces (roof lights, fibre cement, suspended ceilings)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Unstable access equipment (damaged ladders, poorly erected scaffolds)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Slippery surfaces (wet, oily, or contaminated floors and roof surfaces)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium text-xs mb-1.5">Secondary Hazards</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Overhead power lines and electrical services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Falling objects (tools, materials, debris from above)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Adverse weather (wind, rain, ice, lightning, extreme heat)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Public access to work area (pedestrians, vehicles)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Don&rsquo;t Forget Access and Egress</p>
                </div>
                <p className="text-sm text-white/80">
                  Many risk assessments focus on the work itself but fail to assess the route
                  <strong className="text-white"> to and from</strong> the work position. How will
                  the electrician get to the roof? How will they carry tools and materials to height?
                  Is the access route itself at height (e.g. external ladders, scaffold stairways,
                  temporary access hatches)? Every part of the journey &mdash; from ground level to
                  the work position and back &mdash; must be assessed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Steps 2 & 3 — Who Is at Risk and Evaluate */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">02</span>
            Steps 2 &amp; 3 &mdash; Who Is at Risk &amp; Evaluate
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Step 2</strong> requires you to think about who might be harmed by each
                hazard you have identified, and how. Do not limit this to the person carrying out
                the work — consider everyone who could be affected.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">People Who Might Be Harmed</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">The worker at height</strong> &mdash; the electrician or operative carrying out the task (fall risk, struck by falling object)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Other workers on site</strong> &mdash; other trades working below, on adjacent scaffolds, or in the same area (struck by falling tools, materials, or persons)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Apprentices and trainees</strong> &mdash; may be less experienced, require additional supervision, and may not yet be competent to assess risks independently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Members of the public</strong> &mdash; pedestrians, building occupants, visitors, or residents who may pass below or near the work area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Vulnerable groups</strong> &mdash; workers with health conditions that may be affected by working at height (vertigo, balance disorders, medication effects)</span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Step 3</strong> is where you evaluate the level of risk and decide on the
                precautions needed. For each hazard, ask: <em>Is the existing control adequate, or
                do I need to do more?</em> Apply the hierarchy of control from the Work at Height
                Regulations: <strong>avoid &rarr; prevent &rarr; mitigate</strong>.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-500 mb-3">Risk Evaluation Matrix</p>
                <p className="text-xs text-white/60 mb-3">Risk = Likelihood x Severity. Use this to prioritise which hazards need the most attention.</p>
                <div className="overflow-x-auto">
                  <div className="min-w-[300px]">
                    <div className="grid grid-cols-4 gap-1 text-center text-xs">
                      <div className="p-2 bg-white/5 rounded" />
                      <div className="p-2 bg-white/5 rounded text-white/60 font-medium">Low Severity</div>
                      <div className="p-2 bg-white/5 rounded text-white/60 font-medium">Medium Severity</div>
                      <div className="p-2 bg-white/5 rounded text-white/60 font-medium">High Severity</div>

                      <div className="p-2 bg-white/5 rounded text-white/60 font-medium">Unlikely</div>
                      <div className="p-2 bg-green-500/20 border border-green-500/30 rounded text-green-400 font-medium">LOW</div>
                      <div className="p-2 bg-green-500/20 border border-green-500/30 rounded text-green-400 font-medium">LOW</div>
                      <div className="p-2 bg-amber-500/20 border border-amber-500/30 rounded text-amber-400 font-medium">MEDIUM</div>

                      <div className="p-2 bg-white/5 rounded text-white/60 font-medium">Possible</div>
                      <div className="p-2 bg-green-500/20 border border-green-500/30 rounded text-green-400 font-medium">LOW</div>
                      <div className="p-2 bg-amber-500/20 border border-amber-500/30 rounded text-amber-400 font-medium">MEDIUM</div>
                      <div className="p-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 font-medium">HIGH</div>

                      <div className="p-2 bg-white/5 rounded text-white/60 font-medium">Likely</div>
                      <div className="p-2 bg-amber-500/20 border border-amber-500/30 rounded text-amber-400 font-medium">MEDIUM</div>
                      <div className="p-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 font-medium">HIGH</div>
                      <div className="p-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 font-bold">CRITICAL</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-2">High and critical risks must be addressed before work commences</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Site-Specific and Task-Specific Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">03</span>
            Site-Specific &amp; Task-Specific Factors
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A work at height risk assessment must be specific to the <strong>site</strong> and
                the <strong>task</strong>. Generic risk assessments that do not address the actual
                conditions are not suitable and sufficient. The following factors must always be
                considered:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Site-Specific Factors</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Ground conditions</strong> &mdash; is the ground firm, level, and stable enough to support access equipment? Soft ground, slopes, uneven surfaces, and waterlogged areas can destabilise ladders, scaffolds, and MEWPs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Weather and exposure</strong> &mdash; is the work area exposed to wind, rain, ice, or direct sunlight? What are the forecast conditions for the duration of the task? At what point will work be stopped?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Overhead services</strong> &mdash; are there overhead power lines, pipes, or structural elements that could be struck by access equipment or that pose an electrocution hazard?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Fragile surfaces</strong> &mdash; does the work area include or adjoin any fragile surfaces (roof lights, fibre cement, asbestos cement, liner panels, suspended ceilings)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Public access</strong> &mdash; can members of the public walk below or near the work area? Is the work near a road, footpath, school, hospital, or shop entrance?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Other site activities</strong> &mdash; is there other construction work happening in the area? Are cranes, vehicles, or heavy plant operating nearby?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Lighting</strong> &mdash; is the work area adequately lit? Will the task extend into dusk or darkness? Is temporary lighting needed?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">Task-Specific Factors</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Duration</strong> &mdash; how long will the worker be at height? A 2-minute lamp change has very different requirements from a full day installing cable tray. Longer tasks require more stable, comfortable platforms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Complexity</strong> &mdash; does the task require both hands free? Does it involve heavy or bulky materials? Is precision work required (e.g. terminating cables)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Equipment needed</strong> &mdash; what type of access equipment is appropriate? Ladder, tower scaffold, podium step, MEWP, or full scaffold? The choice depends on all the other factors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Competence required</strong> &mdash; is the worker trained and experienced in the equipment being used? Do they hold PASMA, IPAF, or scaffold inspection qualifications where required?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Tools and materials</strong> &mdash; what tools and materials need to be taken to height? How will they be transported safely? Are tool lanyards or material hoists needed?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Emergency and rescue</strong> &mdash; if a worker falls or is suspended in a harness, how will they be rescued? What is the plan for medical emergencies at height?</span>
                  </li>
                </ul>
              </div>

              {/* Weather considerations */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CloudRain className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Weather Considerations</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Weather is one of the most critical factors in work at height risk assessment.
                  The Work at Height Regulations 2005 specifically require that work at height
                  is not carried out when weather conditions could jeopardise safety.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-red-400 text-xs font-semibold mb-1">Wind</p>
                    <p className="text-white/80 text-xs">Stop most work at height above 23 mph (Force 5). MEWP limits vary by manufacturer (typically 28 mph / 12.5 m/s). Wind is unpredictable at height and on exposed sites. Gusts can be significantly stronger than sustained wind speed.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-red-400 text-xs font-semibold mb-1">Rain &amp; Ice</p>
                    <p className="text-white/80 text-xs">Wet surfaces become slippery. Metal scaffolds, ladder rungs, and roof surfaces are hazardous when wet. Ice is extremely dangerous &mdash; if ice is present on any surface, work at height should not proceed until it has been cleared and surfaces are safe.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-red-400 text-xs font-semibold mb-1">Lightning</p>
                    <p className="text-white/80 text-xs">If lightning is forecast or observed, all work at height must stop immediately. Workers on scaffolds, MEWPs, and rooftops are at extreme risk of being struck. Do not resume until the storm has passed and the area is safe.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 text-xs font-semibold mb-1">Poor Visibility</p>
                    <p className="text-white/80 text-xs">Fog, heavy rain, and fading light reduce visibility and increase the risk of tripping, stepping onto fragile surfaces, or misjudging distances. Ensure adequate lighting and consider postponing work if visibility is poor.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Dynamic Risk Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">04</span>
            Dynamic Risk Assessment
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A formal, written risk assessment is carried out before the work begins. But
                conditions on site can change &mdash; sometimes rapidly and unexpectedly. This is
                where <strong>dynamic risk assessment</strong> comes in.
              </p>

              <p>
                Dynamic risk assessment is a <strong>continuous, real-time process</strong> of
                identifying new or changing hazards as they arise and adjusting controls
                accordingly. It is not a replacement for the formal written risk assessment &mdash;
                it supplements it by dealing with the unexpected.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">When Dynamic Risk Assessment Is Triggered</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Weather conditions deteriorate (wind picks up, rain starts, temperature drops)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>An unexpected hazard is discovered (fragile surface, overhead cable, contamination)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Site conditions are different from what was planned (ground is softer, access route is blocked)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Equipment develops a defect or becomes unsuitable for the conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Other work activities nearby create new risks (crane movements, concrete pours, excavation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>A worker feels unwell, fatigued, or otherwise unable to work safely at height</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-500 mb-3">The STAR Process for Dynamic Risk Assessment</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-amber-400 font-bold text-lg mb-1">S</p>
                    <p className="text-white font-medium text-xs">STOP</p>
                    <p className="text-white/60 text-xs">Pause and take a moment to assess the situation</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-amber-400 font-bold text-lg mb-1">T</p>
                    <p className="text-white font-medium text-xs">THINK</p>
                    <p className="text-white/60 text-xs">What has changed? What are the new risks?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-amber-400 font-bold text-lg mb-1">A</p>
                    <p className="text-white font-medium text-xs">ACT</p>
                    <p className="text-white/60 text-xs">Implement additional controls or stop work</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-amber-400 font-bold text-lg mb-1">R</p>
                    <p className="text-white font-medium text-xs">REVIEW</p>
                    <p className="text-white/60 text-xs">Check that the new controls are effective before continuing</p>
                  </div>
                </div>
              </div>

              <p>
                Every worker has the right and the responsibility to carry out a dynamic risk
                assessment. If you arrive at a work area and the conditions are not as described
                in the risk assessment, or if conditions change during the work, you must stop
                and reassess. <strong>Never continue working at height if you believe it is
                unsafe</strong>, even if it means delaying the job or asking for additional
                resources.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Recording and Communicating Findings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">05</span>
            Recording &amp; Communicating Findings
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Step 4</strong> of the risk assessment process requires you to record
                your significant findings. Under the Management of Health and Safety at Work
                Regulations 1999, employers with <strong>5 or more employees</strong> must
                record the significant findings of their risk assessments in writing.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">What to Record</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">The significant hazards identified</strong> &mdash; each hazard relating to the work at height task</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Who is at risk</strong> &mdash; the groups of people who could be harmed (workers, public, other trades)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Existing control measures</strong> &mdash; what is already in place to manage the risks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Additional controls needed</strong> &mdash; any further measures required to reduce risk to an acceptable level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Who is responsible</strong> &mdash; the named person responsible for implementing each control measure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Completion date</strong> &mdash; when additional controls will be in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Review date</strong> &mdash; when the assessment will next be reviewed</span>
                  </li>
                </ul>
              </div>

              <p>
                The recorded risk assessment must be <strong>communicated</strong> to all those
                affected by the risks. This includes all workers who will carry out the task,
                their supervisors, and anyone else who may be in the work area. Communication
                can take many forms: toolbox talks, method statement briefings, site inductions,
                or one-to-one briefings. The key point is that every worker must understand the
                risks they face and the controls that are in place.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-500 mb-2">Method Statements</p>
                <p className="text-sm text-white/80">
                  For significant work at height tasks, a <strong className="text-white">method
                  statement</strong> (or safe system of work) is often produced alongside the
                  risk assessment. The method statement describes the step-by-step procedure for
                  carrying out the work safely, including the sequence of operations, the
                  equipment to be used, the competences required, and the emergency procedures.
                  Together, the risk assessment and method statement are commonly referred to as
                  <strong className="text-white"> RAMS</strong> (Risk Assessment and Method
                  Statement).
                </p>
              </div>

              <p>
                <strong>Step 5</strong> requires you to review your risk assessment and update it
                when necessary. Risk assessments are not &ldquo;write once and forget&rdquo;
                documents. They must be reviewed whenever there is a change in the work, the
                workplace, or the workforce, after an accident or near miss, and at regular
                intervals as part of ongoing safety management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Review Triggers</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>An accident, incident, or near miss occurs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>The work activity or method changes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>New equipment or materials are introduced</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>The workforce changes (new workers, apprentices)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>New legislation or guidance is issued</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>At regular scheduled intervals (e.g. annually)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Five steps:</strong> Identify hazards &rarr; decide who is at risk &rarr; evaluate and control &rarr; record findings &rarr; review and update</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Site factors:</strong> Ground conditions, weather, overhead services, fragile surfaces, public access, other site activities, lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Task factors:</strong> Duration, complexity, equipment needed, competence, tools and materials, emergency/rescue plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Dynamic RA:</strong> Continuous reassessment when conditions change &mdash; STAR: Stop, Think, Act, Review</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Weather:</strong> Wind above 23 mph, rain, ice, and lightning all require work at height to be stopped or suspended</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Recording:</strong> Must document hazards, people at risk, controls, responsibilities, and review dates. Communicate to all affected workers.</span>
                </li>
              </ul>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-500">Next:</strong> In Section 4, we will examine
                  the hierarchy of controls in detail &mdash; how to avoid, prevent, and mitigate
                  falls using the range of equipment and measures available to electricians.
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
            <Link to="../working-at-height-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: The Legal Framework
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-amber-500 text-white hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-1-section-4">
              Next: Hierarchy of Controls
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
