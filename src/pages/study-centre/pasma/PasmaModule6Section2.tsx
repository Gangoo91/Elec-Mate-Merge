import { ArrowLeft, ClipboardCheck, CheckCircle, AlertTriangle, FileText, BarChart3, Shield, RefreshCw, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "risk-assessment-5-steps",
    question: "How many steps are there in the HSE recommended risk assessment process?",
    options: [
      "3 steps",
      "5 steps",
      "7 steps",
      "10 steps"
    ],
    correctIndex: 1,
    explanation: "The HSE recommends a 5-step risk assessment process: (1) Identify hazards, (2) Decide who might be harmed and how, (3) Evaluate the risks and decide on controls, (4) Record your findings, and (5) Review and update the assessment. This structured approach ensures no aspect of risk management is overlooked."
  },
  {
    id: "risk-assessment-matrix-score",
    question: "In a likelihood × severity risk matrix, a hazard rated 4 (likelihood) × 4 (severity) gives a risk score of 16. What action level does this fall into?",
    options: [
      "Green — acceptable risk, no action needed",
      "Amber — moderate risk, reduce if reasonably practicable",
      "Red — high risk, work must not proceed until risk is reduced",
      "White — not applicable to tower work"
    ],
    correctIndex: 2,
    explanation: "A risk score of 16 falls into the red zone (13–25), which means the risk is unacceptable and work must not proceed until the risk has been reduced to an acceptable level through additional control measures. Only when the residual risk score drops to amber or green can work be considered."
  },
  {
    id: "risk-assessment-dynamic",
    question: "What should you do if wind speed increases significantly while you are working on a mobile tower?",
    options: [
      "Continue working but hold on tighter",
      "Stop work, carry out a dynamic risk assessment, and descend if conditions are unsafe",
      "Ask a colleague whether they think it is windy",
      "Wait for the site manager to notice and tell you to stop"
    ],
    correctIndex: 1,
    explanation: "A dynamic risk assessment must be carried out whenever conditions change. If wind speed increases, you should stop work, assess whether it is safe to continue, and descend if conditions are approaching or have reached the cease-work threshold (Beaufort Force 4 / 17 mph). Every operative has the authority to stop work without waiting for instruction."
  }
];

const faqs = [
  {
    question: "Who is responsible for carrying out the risk assessment for tower work?",
    answer: "The employer (or self-employed person) has the legal duty to carry out a suitable and sufficient risk assessment under the Management of Health and Safety at Work Regulations 1999. In practice, this is often delegated to a competent person — someone with the training, experience, and knowledge to identify hazards and evaluate risks specific to mobile tower work. This may be the site supervisor, the appointed tower supervisor, or a health and safety professional. Whoever carries it out must have practical knowledge of tower assembly and use."
  },
  {
    question: "How often should a risk assessment for tower work be reviewed?",
    answer: "A risk assessment must be reviewed whenever there is a significant change in the work activity, the work location, the equipment used, or the personnel involved. It should also be reviewed after any incident, near-miss, or change in legislation or industry guidance. As a minimum, risk assessments for ongoing or repetitive work should be reviewed at regular intervals — typically annually or more frequently on dynamic construction sites. A risk assessment that is never reviewed becomes a historic document, not a safety management tool."
  },
  {
    question: "What is the difference between a risk assessment and a method statement?",
    answer: "A risk assessment identifies hazards, evaluates the level of risk, and determines what control measures are needed to manage those risks. A method statement describes, step by step, how the work will be carried out safely — incorporating the control measures identified in the risk assessment. The risk assessment answers 'what could go wrong and what are we doing about it?' while the method statement answers 'how exactly are we going to do this work safely?' Together, they form the RAMS (Risk Assessment and Method Statement) package."
  },
  {
    question: "Can I use a generic risk assessment for all tower work?",
    answer: "No. While a generic risk assessment template can be used as a starting point, it must be tailored to the specific site, task, and conditions. Every location has different ground conditions, overhead hazards, access routes, nearby activities, and environmental factors. A risk assessment that does not reflect the actual conditions is worthless — and may give a false sense of security. The assessment must be site-specific, task-specific, and current."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the FIRST step in the HSE 5-step risk assessment process?",
    options: [
      "Record your findings and share them with the team",
      "Identify the hazards present in the workplace",
      "Decide on the control measures to implement",
      "Review the previous risk assessment from last year"
    ],
    correctAnswer: 1,
    explanation: "Step 1 is to identify the hazards — look at the work activity, the workplace, and the equipment to determine what could cause harm. You cannot evaluate risk or decide on controls until you have identified what the hazards actually are."
  },
  {
    id: 2,
    question: "When assessing tower-specific hazards, which of the following should be included in the assessment?",
    options: [
      "Only the height of the tower and the platform load",
      "Ground conditions, overhead services, weather exposure, nearby traffic, public access, manual handling, emergency access, and lighting",
      "Only whether the operatives have PASMA cards",
      "Only the colour and brand of the tower"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive tower risk assessment must consider all site-specific hazards including ground conditions, overhead services, weather, traffic, public access, manual handling, working alone, emergency access, lighting, and noise. Focusing on only one or two factors leaves significant risks unmanaged."
  },
  {
    id: 3,
    question: "In a 5×5 risk matrix, a risk score of 8 (likelihood 2 × severity 4) falls into which category?",
    options: [
      "Green — low risk, acceptable",
      "Amber — medium risk, reduce if reasonably practicable",
      "Red — high risk, do not proceed",
      "Risk matrices do not apply to tower work"
    ],
    correctAnswer: 1,
    explanation: "A risk score of 8 falls into the amber zone (5–12), meaning the risk is medium. Work can proceed, but additional control measures should be implemented where reasonably practicable to reduce the risk further. The assessment should be monitored and reviewed during the work."
  },
  {
    id: 4,
    question: "Which hierarchy should be followed when selecting control measures for tower work hazards?",
    options: [
      "PPE first, then engineering controls, then elimination",
      "Administrative controls only — everything else is too expensive",
      "Eliminate, substitute, engineering controls, administrative controls, PPE",
      "There is no specific order — choose whatever is cheapest"
    ],
    correctAnswer: 2,
    explanation: "The hierarchy of control must be followed in order: (1) Eliminate the hazard entirely, (2) Substitute with something less hazardous, (3) Engineering controls to isolate people from the hazard, (4) Administrative controls such as procedures and training, (5) PPE as a last resort. Higher-level controls are always more effective because they do not depend on human behaviour."
  },
  {
    id: 5,
    question: "A method statement for mobile tower work should include which of the following?",
    options: [
      "Only the tower height and the names of operatives",
      "The assembly sequence, team roles, equipment list, emergency procedures, and specific risk controls",
      "Only the date the work is scheduled",
      "A photograph of the finished tower"
    ],
    correctAnswer: 1,
    explanation: "A method statement must be comprehensive: it covers the step-by-step assembly sequence, defined roles for each team member, a full equipment and component list, emergency and rescue procedures, and the specific control measures identified in the risk assessment. It translates the risk assessment into practical, actionable instructions."
  },
  {
    id: 6,
    question: "What is a dynamic risk assessment?",
    options: [
      "A risk assessment carried out by a dynamic personality",
      "A continuous, real-time assessment of changing conditions during work, with authority to stop if conditions become unsafe",
      "A risk assessment that is only completed after the work is finished",
      "A risk assessment written on a digital tablet instead of paper"
    ],
    correctAnswer: 1,
    explanation: "A dynamic risk assessment is the ongoing process of identifying and assessing new or changed hazards in real time as work progresses. Conditions on site can change — wind may increase, rain may start, new activities may begin nearby. Every operative must continuously assess conditions and has the authority to stop work if the situation becomes unsafe."
  },
  {
    id: 7,
    question: "Who needs to see the risk assessment for tower work?",
    options: [
      "Only the health and safety manager",
      "Only the person who wrote it",
      "All workers involved in the task, plus affected parties and supervisors",
      "No one — it is a confidential document"
    ],
    correctAnswer: 2,
    explanation: "The risk assessment must be communicated to everyone involved in or affected by the work. This includes all assembly team members, the tower users, site supervisors, other trades working nearby, and anyone responsible for managing the work area. A risk assessment that sits in a filing cabinet protects nobody."
  },
  {
    id: 8,
    question: "Which of the following should trigger a review of the risk assessment during tower work?",
    options: [
      "Only a formal instruction from the HSE",
      "A near-miss incident, a change in weather conditions, new work activity starting nearby, or a change in ground conditions",
      "Nothing — once completed, a risk assessment is valid indefinitely",
      "Only a fatal accident"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments must be reviewed whenever conditions change. Triggers include: near-miss incidents, changes in weather, new activities starting nearby, changes in ground conditions, different personnel, changes to the scope of work, and any incident or injury. Waiting for a serious event before reviewing means the review comes too late."
  }
];

export default function PasmaModule6Section2() {
  useSEO({
    title: "Risk Assessment | PASMA Module 6.2",
    description: "HSE 5-step risk assessment process, likelihood × severity matrix, control hierarchy, method statements, dynamic risk assessment, and documentation requirements for mobile tower work.",
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
            <Link to="../pasma-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <ClipboardCheck className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 6 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Risk Assessment
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The systematic process of identifying hazards, evaluating risks, and implementing controls &mdash; from the HSE 5-step method to dynamic on-site reassessment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>5 Steps:</strong> Identify, assess who, evaluate, record, review</li>
              <li><strong>Score:</strong> Likelihood &times; Severity = Risk rating</li>
              <li><strong>Controls:</strong> Eliminate &rarr; Substitute &rarr; Engineer &rarr; Admin &rarr; PPE</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Site-specific risk assessment &amp; method statement</li>
              <li><strong>During:</strong> Dynamic risk assessment &mdash; stop if conditions change</li>
              <li><strong>After:</strong> Record near-misses, review, update for next time</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the HSE 5-step risk assessment process to tower work",
              "Identify tower-specific hazards requiring assessment",
              "Use a likelihood × severity matrix to score and prioritise risks",
              "Select appropriate control measures using the hierarchy of control",
              "Prepare a method statement linked to the risk assessment",
              "Carry out dynamic risk assessment when conditions change on site"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: HSE 5-Step Risk Assessment Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            HSE 5-Step Risk Assessment Process
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety Executive (HSE) recommends a straightforward 5-step approach to risk assessment. This is not paperwork for its own sake &mdash; it is a structured method for thinking through what could go wrong, who could be hurt, and what you are going to do about it before the work starts.
              </p>

              <div className="space-y-3">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/30 text-green-300 text-sm font-bold flex-shrink-0">1</span>
                    <p className="text-sm font-medium text-green-300">Identify the Hazards</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Walk the work area and look for anything that could cause harm. For tower work, this includes: ground conditions, overhead obstructions and power lines, weather exposure, nearby traffic and pedestrians, manual handling demands, access routes, and the physical environment (lighting, noise, temperature). Consult the manufacturer&rsquo;s instructions, industry guidance, and accident records. Speak to people who do the work &mdash; they know where the real risks are.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/30 text-blue-300 text-sm font-bold flex-shrink-0">2</span>
                    <p className="text-sm font-medium text-blue-300">Decide Who Might Be Harmed and How</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Consider everyone who could be affected: the assembly team, the tower users, other trades working nearby, members of the public, site visitors, and maintenance staff. Think about how each group could be harmed &mdash; a falling object hazard affects people at ground level, while a fall from height hazard affects the platform operatives. Some people may be at higher risk: new starters, lone workers, or those with medical conditions.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/30 text-amber-300 text-sm font-bold flex-shrink-0">3</span>
                    <p className="text-sm font-medium text-amber-300">Evaluate the Risks and Decide on Controls</p>
                  </div>
                  <p className="text-sm text-white/80">
                    For each hazard, assess how likely it is to cause harm and how severe the consequences could be. Use the hierarchy of control to select the most effective measures: eliminate, substitute, engineer, administrate, PPE. Record the existing controls and any additional controls needed. The goal is to reduce risk to the lowest level that is reasonably practicable.
                  </p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/30 text-purple-300 text-sm font-bold flex-shrink-0">4</span>
                    <p className="text-sm font-medium text-purple-300">Record Your Findings</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Write down the significant hazards, who is at risk, and the control measures in place or planned. The record must be specific enough to be useful &mdash; &ldquo;risk of falls&rdquo; is not enough; &ldquo;risk of falls from platform at 4.2m due to missing guardrails — control: full guardrail system installed and checked before use&rdquo; is meaningful. If you employ five or more people, recording findings is a legal requirement under the Management of Health and Safety at Work Regulations 1999.
                  </p>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-500/30 text-teal-300 text-sm font-bold flex-shrink-0">5</span>
                    <p className="text-sm font-medium text-teal-300">Review and Update</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Risk assessment is not a one-off exercise. Review the assessment whenever the work changes, the location changes, new hazards are identified, after any incident or near-miss, or at regular intervals for ongoing work. An outdated risk assessment is a dangerous document &mdash; it may give false confidence that risks are being managed when they are not.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Tower-Specific Hazards to Assess */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Tower-Specific Hazards to Assess
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While the 5-step process applies to any work activity, mobile tower work has specific hazards that must always be considered. The following list is not exhaustive but covers the key areas that should appear in every tower risk assessment.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Comprehensive Tower Hazard Checklist</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Ground conditions:</strong> Firmness, levelness, drainage, load-bearing capacity, underground services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Overhead services:</strong> Power lines (15m exclusion), building services, cranes, tree branches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Weather exposure:</strong> Wind speed, rain, ice, temperature extremes, lightning risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Nearby traffic:</strong> Vehicles, forklifts, delivery lorries, site plant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Public access:</strong> Pedestrians, site visitors, building occupants, children</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Manual handling:</strong> Component weights, carry distances, stair access, repetitive lifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Working alone:</strong> Lone working risks, communication, emergency response capability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Emergency access:</strong> Routes for emergency services, first-aid provision, rescue plan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Lighting:</strong> Natural light availability, artificial lighting for early/late work, task lighting on platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Noise:</strong> Proximity to noisy operations affecting communication between team members</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Do Not Forget the Human Factors</p>
                </div>
                <p className="text-sm text-white/80">
                  The risk assessment must also consider human factors: competence and training levels of the team, fitness for work, fatigue from long shifts or travel, familiarity with the specific tower system being used, and language barriers in multi-national teams. Human factors are involved in the majority of workplace accidents.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Seasonal Hazard Variations</p>
                <p className="text-sm text-white/80">
                  The hazard profile of a tower work location changes with the seasons. Summer brings heat stress, UV exposure, dehydration, and thunderstorms. Autumn brings early darkness, wet leaves on ground surfaces, and increasing wind. Winter introduces ice, frost, reduced daylight, cold-related injuries, and ground that alternates between frozen and waterlogged. Spring brings unpredictable weather, nesting birds in certain locations, and pollen that can cause sudden sneezing fits at height. A risk assessment written in July may not be adequate in January &mdash; seasonal variation must be considered.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Concurrent Activities on Site</p>
                <p className="text-sm text-white/80">
                  Construction sites are dynamic environments with multiple trades working simultaneously. A risk assessment for tower work must consider what else is happening nearby: crane operations that may swing loads over the tower, excavation work that affects ground stability, welding or cutting that creates fire and fume hazards, concrete pours that generate dust, and delivery vehicles manoeuvring near the tower base. Coordination with the principal contractor and other trades is essential to manage these interacting risks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Likelihood × Severity Matrix */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Likelihood &times; Severity Matrix
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A risk matrix is a simple but powerful tool for prioritising hazards. By rating both the likelihood of a hazard causing harm and the severity of the potential outcome, you get a numerical risk score that helps determine what level of action is required.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Likelihood Scale (1&ndash;5)</p>
                </div>
                <div className="space-y-1 text-sm text-white/80">
                  <p><strong className="text-white">1 &mdash; Very unlikely:</strong> Could happen but only in exceptional circumstances</p>
                  <p><strong className="text-white">2 &mdash; Unlikely:</strong> Not expected but possible in certain conditions</p>
                  <p><strong className="text-white">3 &mdash; Possible:</strong> Could occur during the life of the project</p>
                  <p><strong className="text-white">4 &mdash; Likely:</strong> Will probably occur at some point</p>
                  <p><strong className="text-white">5 &mdash; Very likely:</strong> Expected to occur frequently or almost certainly</p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Severity Scale (1&ndash;5)</p>
                <div className="space-y-1 text-sm text-white/80">
                  <p><strong className="text-white">1 &mdash; Negligible:</strong> Minor injury requiring first aid only (small cut, bruise)</p>
                  <p><strong className="text-white">2 &mdash; Minor:</strong> Injury requiring medical treatment, short absence from work</p>
                  <p><strong className="text-white">3 &mdash; Moderate:</strong> Injury causing significant time off work (fracture, sprain)</p>
                  <p><strong className="text-white">4 &mdash; Major:</strong> Serious injury with long-term effects (amputation, spinal injury)</p>
                  <p><strong className="text-white">5 &mdash; Catastrophic:</strong> Fatal injury or multiple serious injuries</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Risk Score = Likelihood &times; Severity</p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-green-500/15 border border-green-500/30 p-3 rounded-lg text-center">
                    <p className="font-bold text-green-300 mb-1">1&ndash;4</p>
                    <p className="text-green-300 text-xs font-medium">LOW RISK</p>
                    <p className="text-white/70 text-xs mt-1">Acceptable &mdash; monitor and maintain existing controls</p>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/30 p-3 rounded-lg text-center">
                    <p className="font-bold text-amber-300 mb-1">5&ndash;12</p>
                    <p className="text-amber-300 text-xs font-medium">MEDIUM RISK</p>
                    <p className="text-white/70 text-xs mt-1">Reduce if reasonably practicable &mdash; implement additional controls</p>
                  </div>
                  <div className="bg-red-500/15 border border-red-500/30 p-3 rounded-lg text-center">
                    <p className="font-bold text-red-300 mb-1">13&ndash;25</p>
                    <p className="text-red-300 text-xs font-medium">HIGH RISK</p>
                    <p className="text-white/70 text-xs mt-1">Do not proceed until risk is reduced to an acceptable level</p>
                  </div>
                </div>
              </div>

              <p>
                After applying control measures, re-score the residual risk. The difference between the original score and the residual score demonstrates the effectiveness of your controls. If the residual risk remains in the red zone, additional or alternative controls must be found before work can begin.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Worked Example &mdash; Falls from Platform</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Hazard:</strong> Fall from working platform at 6 metres</p>
                  <p><strong className="text-white">Before controls:</strong> Likelihood 4 (likely during extended work) &times; Severity 5 (fatal or life-changing) = <span className="text-red-300 font-semibold">Risk Score 20 (RED)</span></p>
                  <p><strong className="text-white">Controls applied:</strong> Full guardrail system, locked castors, toeboards, internal ladder access only, hoisting line for materials, trained operatives, pre-use inspection</p>
                  <p><strong className="text-white">After controls:</strong> Likelihood 1 (very unlikely with all controls in place) &times; Severity 5 (fatal consequence unchanged) = <span className="text-amber-300 font-semibold">Risk Score 5 (AMBER)</span></p>
                  <p>Note that the severity does not change &mdash; a fall from 6 metres is still potentially fatal. The controls reduce the likelihood, not the consequences. This is why the residual risk remains amber, requiring ongoing monitoring and maintenance of controls.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Control Measures for Tower Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Control Measures for Tower Work
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Control measures must follow the hierarchy of control, working from the most effective (elimination) to the least effective (PPE). Higher-level controls are always preferable because they do not depend on individuals remembering to follow procedures or wear equipment.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Hierarchy of Control &mdash; Tower Examples</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">1. Eliminate:</strong> Can the work at height be avoided entirely? Can the task be done from ground level instead? Can prefabricated components be lifted into position mechanically?</p>
                  <p><strong className="text-white">2. Substitute:</strong> Can a lower platform be used? Can an aluminium tower be replaced with a GRP tower near electrical hazards? Can a different access method reduce the risk?</p>
                  <p><strong className="text-white">3. Engineering controls:</strong> Guardrails and toeboards on the platform, stabilisers and outriggers to prevent overturning, barriers to protect from vehicle impact, sole boards to distribute loads on soft ground.</p>
                  <p><strong className="text-white">4. Administrative controls:</strong> PASMA training, method statements, team briefings, permit-to-work systems, exclusion zones, inspection regimes, supervision, and competence verification.</p>
                  <p><strong className="text-white">5. PPE:</strong> Hard hats during assembly and dismantling, safety footwear, gloves, high-visibility clothing near traffic. PPE is always the last line of defence, never the first.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Cost-Benefit of Controls</p>
                <p className="text-sm text-white/80">
                  The cost of implementing controls must be weighed against the risk. Under UK law, the principle of &ldquo;so far as is reasonably practicable&rdquo; (SFAIRP) applies: a risk must be reduced unless the cost of doing so is grossly disproportionate to the benefit. In practice, for high-severity hazards like falls from height, very few control measures would be considered disproportionate. The cost of a guardrail system is trivial compared to the cost of a fatal fall.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Tower-Specific Elimination Examples</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use telescopic tools from ground level instead of climbing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Prefabricate components at ground level and crane into position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use a camera on a pole for inspection work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Specify building services at accessible heights during design</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Tower-Specific Engineering Controls</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Guardrails and toeboards on all open platform edges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Stabilisers and outriggers to prevent overturning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Vehicle barriers to protect the tower base</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Sole boards to distribute loads on soft ground</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Method Statements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Method Statements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A method statement &mdash; often called a &ldquo;safe system of work&rdquo; &mdash; is a written document that describes step by step how the tower assembly, use, and dismantling will be carried out safely. It takes the control measures identified in the risk assessment and turns them into practical, sequenced instructions that every member of the team can follow.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Tower Method Statement Contents</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Assembly sequence:</strong> The exact order in which components are installed, from base setup through to completion. This must follow the manufacturer&rsquo;s instructions and the chosen method (3T or AGR).</p>
                  <p><strong className="text-white">Defined roles:</strong> Named individuals and their specific responsibilities during assembly, use, and dismantling.</p>
                  <p><strong className="text-white">Equipment list:</strong> A full inventory of tower components, PPE, tools, sole boards, barriers, signage, and any other ancillary equipment.</p>
                  <p><strong className="text-white">Emergency procedures:</strong> What to do if someone is injured, falls ill, or becomes stranded at height. The rescue plan, first-aid arrangements, and emergency contacts.</p>
                  <p><strong className="text-white">Inspection requirements:</strong> What must be inspected before the tower is used, how often inspections take place during use, and how they are recorded.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Relationship Between Risk Assessment and Method Statement</p>
                <p className="text-sm text-white/80">
                  The risk assessment identifies the hazards and determines what controls are needed. The method statement describes exactly how the work will be done, incorporating those controls into the work procedure. Together, they form the RAMS (Risk Assessment and Method Statement) package. Neither document is complete without the other &mdash; a risk assessment without a method statement identifies problems without solutions, while a method statement without a risk assessment prescribes actions without understanding the risks they address.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">The Method Statement Must Be Site-Specific</p>
                </div>
                <p className="text-sm text-white/80">
                  A generic method statement that has been copied from a template without being tailored to the actual site conditions is worthless. It may even be dangerous if it leads people to believe risks have been assessed when they have not. The method statement must reference specific site hazards, specific control measures, specific team members, and specific emergency arrangements for that location.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Method Statement Template Structure</p>
                <p className="text-sm text-white/80">
                  While each method statement must be site-specific, using a consistent template ensures nothing is forgotten. A good template includes sections for: project details, tower specification, site conditions, task description, step-by-step procedure, team roles, equipment checklist, risk controls cross-referenced to the risk assessment, inspection requirements, emergency and rescue procedures, sign-off by a competent person, and space for dynamic amendments during the work. This structure provides both consistency and site-specific adaptability.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Reviewing the Method Statement on Site</p>
                <p className="text-sm text-white/80">
                  The method statement is a living document. Before assembly begins, the assembly lead should walk the team through each step at the actual assembly location. This &ldquo;toolbox talk&rdquo; confirms that the method statement matches the conditions on the ground. If anything has changed since the method statement was written &mdash; a new obstruction, different ground conditions, a change in team personnel &mdash; the method statement must be updated before work begins. Proceeding with an outdated method statement is proceeding without a method statement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Dynamic Risk Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Dynamic Risk Assessment
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                No matter how thorough the pre-work risk assessment, conditions on site can change while work is in progress. Wind may increase, rain may start, new activities may begin nearby, or the ground may become waterlogged. Dynamic risk assessment is the process of continuously evaluating these changing conditions and taking action &mdash; including stopping work &mdash; when necessary.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">When to Carry Out Dynamic Risk Assessment</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Weather changes:</strong> Wind increasing, rain starting, temperature dropping, lightning approaching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Ground changes:</strong> Ground becoming waterlogged, new excavation nearby, vehicle creating ruts near the tower base</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">New activities:</strong> Crane operation starting, hot work beginning nearby, traffic management changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">New hazards:</strong> Overhead obstruction not previously identified, chemical spill, structural movement in the building</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Personnel changes:</strong> New team member arriving unfamiliar with the method statement, someone feeling unwell</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Authority to Stop Work</p>
                  <p className="text-sm text-white/80">
                    Every person on site has the authority and the duty to stop work if they believe conditions have become unsafe. This is not limited to supervisors or managers. An apprentice, a labourer, or a visiting subcontractor all have the same authority. Work must stop until the new hazard has been assessed and either controlled or the work method changed.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Re-Assessment Process</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Stop the current activity safely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Identify the new or changed hazard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Assess the risk using the same L &times; S approach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Determine if existing controls are sufficient</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Implement additional controls if needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Resume work only when all risks are controlled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Record the change for the formal risk assessment update</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The &ldquo;What If?&rdquo; Mindset</p>
                <p className="text-sm text-white/80">
                  Dynamic risk assessment is most effective when operatives develop a &ldquo;what if?&rdquo; mindset — continuously asking: what if the wind picks up? What if that vehicle reverses towards the tower? What if the ground becomes waterlogged from that burst pipe? What if my colleague becomes unwell at the top of the tower? This proactive thinking identifies hazards before they become incidents. It is not paranoia — it is professional awareness. The best tower operatives are always thinking one step ahead, not just reacting to what has already happened.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">No Repercussions for Stopping Work</p>
                </div>
                <p className="text-sm text-white/80">
                  A culture where people are criticised for stopping work creates a culture where people continue working in dangerous conditions. Any organisation that penalises an operative for exercising their stop-work authority is creating the conditions for a serious accident. If you are ever made to feel that stopping work for safety reasons was wrong, that is a significant problem with the organisation&rsquo;s safety culture, not with your judgement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Documenting & Communicating Risk */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Documenting &amp; Communicating Risk
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A risk assessment that exists only in someone&rsquo;s head protects nobody. The findings must be documented clearly and communicated to everyone who needs to act on them. Communication is not a one-way process &mdash; workers must have the opportunity to raise concerns and contribute their own knowledge of the risks.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Who Needs to See the Risk Assessment?</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Assembly team:</strong> Every person involved in assembling, using, or dismantling the tower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Tower users:</strong> Anyone who will work from the platform after assembly, even if they were not part of the assembly team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Site supervisor:</strong> The person responsible for managing work activities in the area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Other trades:</strong> Anyone working nearby who may be affected by the tower work (falling objects, exclusion zones)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Client/principal contractor:</strong> May need copies for site records and audit purposes</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Briefing Workers</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Briefing must be face-to-face, not just a document</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Walk through each significant hazard and its controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Confirm understanding &mdash; ask questions, do not assume</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide the briefing in a language all workers understand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Record attendance at the briefing with signatures</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Recording Near-Misses &amp; Incidents</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Every near-miss is a warning &mdash; record it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use near-misses to update the risk assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Investigate incidents to find root causes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Share lessons learned across the team and organisation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>RIDDOR reporting for specified injuries and dangerous occurrences</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Review Triggers</p>
                <p className="text-sm text-white/80">
                  The risk assessment must be reviewed and updated: after any incident or near-miss, when the work activity or location changes, when new information about a hazard becomes available (such as updated HSE guidance), when there is a significant change in personnel or equipment, and at regular intervals for ongoing work. Each review should be documented with the date, the reviewer, and the changes made. Old versions should be retained for audit purposes.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">RIDDOR Reporting</p>
                <p className="text-sm text-white/80">
                  Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR), certain events must be reported to the HSE. For tower work, this includes: any fatality, any specified injury (fracture other than fingers/thumbs/toes, amputation, loss of sight, crush injuries to head or torso), any over-7-day incapacitation, and dangerous occurrences such as tower collapse or contact with overhead power lines. Reports must be made without delay for fatalities and within 15 days for other reportable events. Failure to report is a criminal offence.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Risk Assessment as a Legal Document</p>
                <p className="text-sm text-white/80">
                  A risk assessment is not just a safety management tool &mdash; it is a legal document. In the event of an accident, the risk assessment will be examined by the HSE, by insurance investigators, and potentially by the courts. It needs to demonstrate that the employer identified the hazards, evaluated the risks, and implemented reasonable controls. A risk assessment that is vague, generic, or clearly not site-specific will not withstand scrutiny. Conversely, a thorough, specific, and well-communicated risk assessment demonstrates due diligence and professional competence.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Lessons Learned</p>
                <p className="text-sm text-white/80">
                  Every incident, near-miss, and completed risk assessment review is an opportunity to learn. Share findings across the team and the wider organisation. What went wrong? What nearly went wrong? What can be improved? A learning culture treats incidents as system failures to be understood, not individual failures to be punished. When people are punished for reporting problems, they stop reporting &mdash; and that is when real disasters occur.
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
          title="Section 2 Knowledge Check"
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
            <Link to="../pasma-module-6-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Common Hazards
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-6-section-3">
              Next: Rescue Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}