import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Working at Height Safely While Installing Systems - Module 4.4.7 | Level 2 Electrical Course";
const DESCRIPTION = "Learn safe working practices for height work during electrical installations. Covers equipment selection, fall protection, and Work at Height Regulations 2005 compliance.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the minimum height at which the Work at Height Regulations 2005 apply?",
    options: ["1 metre", "2 metres", "Any height where a person could fall and be injured"],
    correctIndex: 2,
    explanation: "The Work at Height Regulations apply at any height where a person could fall and be injured, not just specific heights."
  },
  {
    id: 2,
    question: "Which type of ladder provides the most stability for electrical work?",
    options: ["Step ladder", "Extension ladder", "Platform ladder with handrails"],
    correctIndex: 2,
    explanation: "Platform ladders with handrails provide the most stability and allow for hands-free working while maintaining three points of contact."
  },
  {
    id: 3,
    question: "What is the recommended angle for leaning ladders?",
    options: ["60 degrees", "75 degrees", "1:4 ratio (75 degrees)"],
    correctIndex: 2,
    explanation: "The safe angle for leaning ladders is 1:4 ratio, which equals approximately 75 degrees from horizontal."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which regulation covers working at height in the UK?",
    options: [
      "BS 7671",
      "Work at Height Regulations 2005",
      "PUWER",
      "CDM Regulations"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 specifically govern all work at height activities in the UK construction industry."
  },
  {
    id: 2,
    question: "True or False: Extension ladders are suitable for prolonged installation work.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 1,
    explanation: "False. Extension ladders are only for access, not prolonged work. They don't provide a stable working platform for extended tasks."
  },
  {
    id: 3,
    question: "What is the correct ladder positioning ratio?",
    options: [
      "3:1 ratio",
      "4:1 ratio",
      "5:1 ratio",
      "2:1 ratio"
    ],
    correctAnswer: 1,
    explanation: "The 4:1 ratio means for every 4 metres of height, the base should be 1 metre away from the wall."
  },
  {
    id: 4,
    question: "Name two common hazards when working at height.",
    options: [
      "Falls and dropped tools",
      "Noise and vibration",
      "Heat and cold",
      "Dust and fumes"
    ],
    correctAnswer: 0,
    explanation: "Falls from height and dropped tools striking people below are the most common and serious hazards when working at height."
  },
  {
    id: 5,
    question: "What is one key safety feature of scaffolding platforms?",
    options: [
      "Mobility",
      "Guard rails and toe boards",
      "Lightweight construction",
      "Quick assembly"
    ],
    correctAnswer: 1,
    explanation: "Guard rails and toe boards are essential safety features that prevent falls and dropped materials from scaffolding platforms."
  },
  {
    id: 6,
    question: "When should fall arrest equipment be used?",
    options: [
      "Always when working at height",
      "Only on ladders",
      "When there's a risk of falling and no physical barrier",
      "Never required"
    ],
    correctAnswer: 2,
    explanation: "Fall arrest equipment is required when there's a risk of falling and no physical barriers (like guard rails) are in place."
  },
  {
    id: 7,
    question: "Why should you avoid overreaching on a ladder?",
    options: [
      "It's uncomfortable",
      "It can cause loss of balance and falls",
      "It's inefficient",
      "It damages the ladder"
    ],
    correctAnswer: 1,
    explanation: "Overreaching shifts your centre of gravity outside the ladder's base, causing loss of balance and potential falls."
  },
  {
    id: 8,
    question: "What is the benefit of using tool lanyards?",
    options: [
      "Easier tool access",
      "Prevents tools from dropping and injuring people below",
      "Reduces tool weight",
      "Improves tool performance"
    ],
    correctAnswer: 1,
    explanation: "Tool lanyards prevent dropped tools from falling and potentially injuring people working below."
  }
];

export default function Module4Section4_7() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 4.7</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Working at Height Safely While Installing Systems
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn safe working practices for height work during electrical installations. Covers equipment selection, fall protection, and Work at Height Regulations 2005 compliance.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2 text-sm">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Working at height is high-risk but necessary for electrical installations</li>
                  <li>Work at Height Regulations 2005 provide legal framework</li>
                  <li>Correct equipment selection prevents most accidents</li>
                  <li>Falls remain leading cause of construction injuries</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2 text-sm">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Risk assess before starting work</li>
                  <li>Inspect all equipment before use</li>
                  <li>Three points of contact on ladders</li>
                  <li>Use tool lanyards and secure materials</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-2 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Identify hazards associated with working at height</li>
                <li>Select the correct access equipment for different installation tasks</li>
                <li>Apply safe working practices on ladders, scaffolding, and MEWPs</li>
                <li>Use fall protection systems effectively</li>
                <li>Follow legal requirements and site safety rules for working at height</li>
              </ul>
            </div>
          </section>

          {/* Legal and Safety Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Legal and Safety Requirements
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Work at height is regulated under the <strong>Work at Height Regulations 2005</strong>, which place specific duties on employers and workers.
            </p>

            <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50 mb-4">
              <p className="font-medium text-white mb-2">Key Legal Requirements</p>
              <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                <li><strong>Avoid</strong> working at height where reasonably practicable</li>
                <li>If unavoidable, ensure work is carried out <strong>safely</strong></li>
                <li>Use appropriate <strong>work equipment</strong> that is suitable</li>
                <li>Ensure workers are <strong>competent and trained</strong></li>
                <li>Plan work to ensure it can be carried out <strong>safely</strong></li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
              <p className="font-medium text-white mb-2">Critical Requirement</p>
              <p className="text-white/70 text-sm">Height work must be planned, supervised, and carried out by competent persons. Training records must be maintained and refreshed regularly.</p>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="check-1"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Common Hazards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Common Hazards
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Understanding hazards is the first step in preventing accidents during electrical installation work at height.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Primary Hazards</p>
                <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                  <li>Falls from ladders, scaffolds, or platforms</li>
                  <li>Dropped tools or materials striking people below</li>
                  <li>Overreaching or leaning too far from working platform</li>
                  <li>Slippery or unstable working surfaces</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Environmental Hazards</p>
                <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                  <li>Contact with overhead power lines</li>
                  <li>Poor weather conditions (wind, rain, ice)</li>
                  <li>Inadequate lighting for height work</li>
                  <li>Unstable ground conditions for equipment</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
              <p className="font-medium text-white mb-2">Statistics Alert</p>
              <p className="text-white/70 text-sm">Falls from height account for approximately 40% of workplace fatalities in construction. Most are preventable through proper planning and equipment use.</p>
            </div>
          </section>

          {/* Access Equipment */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Access Equipment
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Selecting the right access equipment for the task is crucial for both safety and efficiency.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Step Ladders</p>
                <p className="text-white/70 text-sm mb-1"><strong>Use for:</strong> Short-duration, light tasks up to 2.5m working height</p>
                <p className="text-white/70 text-sm mb-1"><strong>Requirements:</strong> Must be stable, positioned correctly, and not overloaded</p>
                <p className="text-white/70 text-sm"><strong>Limitations:</strong> Not suitable for prolonged work or heavy tool use</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Extension Ladders</p>
                <p className="text-white/70 text-sm mb-1"><strong>Use for:</strong> Access only, not prolonged work</p>
                <p className="text-white/70 text-sm mb-1"><strong>Requirements:</strong> Secure at top and bottom, 4:1 angle ratio</p>
                <p className="text-white/70 text-sm"><strong>Limitations:</strong> No working platform, limited tool carrying capacity</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Towers/Scaffolds</p>
                <p className="text-white/70 text-sm mb-1"><strong>Use for:</strong> Prolonged work requiring large, stable platform</p>
                <p className="text-white/70 text-sm mb-1"><strong>Requirements:</strong> Must be erected by competent persons, guard rails fitted</p>
                <p className="text-white/70 text-sm"><strong>Benefits:</strong> Large working area, tool storage, multiple workers</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">MEWPs (Mobile Elevating Work Platforms)</p>
                <p className="text-white/70 text-sm mb-1"><strong>Types:</strong> Scissor lifts, boom lifts, cherry pickers</p>
                <p className="text-white/70 text-sm mb-1"><strong>Requirements:</strong> IPAF-trained operators, ground condition checks</p>
                <p className="text-white/70 text-sm"><strong>Benefits:</strong> Quick positioning, precise height control, mobility</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="check-2"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Safe Working Practices */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Safe Working Practices
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Following established safe working practices reduces risk and ensures legal compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Pre-Work Checks</p>
                <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                  <li>Inspect all access equipment before use</li>
                  <li>Check weather conditions and visibility</li>
                  <li>Verify ground conditions for stability</li>
                  <li>Ensure competency of all personnel</li>
                  <li>Confirm rescue arrangements in place</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">During Work</p>
                <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                  <li>Maintain three points of contact on ladders</li>
                  <li>Never overreach — reposition equipment instead</li>
                  <li>Use tool lanyards to prevent dropping equipment</li>
                  <li>Keep work areas tidy to prevent trip hazards</li>
                  <li>Monitor weather conditions continuously</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
              <p className="font-medium text-white mb-2">Professional Tip</p>
              <p className="text-white/70 text-sm">The "belt buckle rule" helps prevent overreaching: keep your belt buckle between the ladder rails at all times. If you need to reach beyond this, reposition the ladder.</p>
            </div>
          </section>

          {/* Fall Protection */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Fall Protection
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              When edge protection cannot be provided, personal fall protection systems become essential.
            </p>

            <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50 mb-4">
              <p className="font-medium text-white mb-2">Fall Protection Systems</p>
              <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                <li><strong>Work Restraint:</strong> Prevents reaching the fall edge (preferred method)</li>
                <li><strong>Fall Arrest:</strong> Stops a fall after it occurs (requires rescue plan)</li>
                <li><strong>Work Positioning:</strong> Supports worker in position (e.g., rope access)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-2">Equipment Requirements</p>
                <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                  <li>Full body harness (not belt)</li>
                  <li>Energy-absorbing lanyard</li>
                  <li>Certified anchor point (15kN minimum)</li>
                  <li>Regular inspection and maintenance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-2">Critical Factors</p>
                <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                  <li>Fall clearance calculations</li>
                  <li>Rescue plan and equipment</li>
                  <li>Training in system use</li>
                  <li>Regular competency assessment</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
              <p className="font-medium text-white mb-2">Critical Requirement</p>
              <p className="text-white/70 text-sm">Fall arrest systems require sufficient clearance below the worker to prevent ground impact during arrest. Calculate fall distance including lanyard extension and harness stretch.</p>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="check-3"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Common Mistakes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Common Mistakes
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Learning from common mistakes helps prevent accidents and ensures professional standards.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-1">Using ladders for tasks that require a platform</p>
                <p className="text-white/60 text-sm">Prolonged work, heavy tools, or two-handed tasks need a stable platform, not ladder access.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-1">Standing on the top step or rung of a ladder</p>
                <p className="text-white/60 text-sm">This eliminates handholds and creates an unstable working position with high fall risk.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-1">Failing to secure tools and materials at height</p>
                <p className="text-white/60 text-sm">Dropped tools can cause serious injuries and expensive damage to equipment below.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-1">Ignoring weather conditions for outdoor height work</p>
                <p className="text-white/60 text-sm">Wind, rain, or poor visibility significantly increase risks and should halt height work.</p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-2">Planning and Preparation</p>
                <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                  <li>Always carry out a risk assessment before starting work at height</li>
                  <li>Select the shortest and most stable access method possible for the task</li>
                  <li>Position ladders at a 4:1 ratio (for every 4 m up, base is 1 m out)</li>
                  <li>On scaffolding, ensure toe boards, guard rails, and safe access points are in place</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-2">During Installation</p>
                <ul className="text-white/70 text-sm list-disc pl-6 space-y-1">
                  <li>For MEWPs, check ground conditions before positioning the platform</li>
                  <li>Use chutes or hoists to raise materials — avoid carrying heavy items up ladders</li>
                  <li>Schedule height work for good weather and daylight where possible</li>
                  <li>Always have a second person present when working at height for safety monitoring</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
              <p className="font-medium text-white mb-2">Warehouse Lighting Installation Incident</p>
              <p className="text-white/70 text-sm mb-3">
                During a warehouse lighting installation, a worker used a ladder for a task that required both hands and heavy tools. Overreaching caused the ladder to slip, resulting in a fall and injury.
              </p>
              <p className="font-medium text-orange-400 text-sm">
                <strong>Solution:</strong> A mobile scaffold tower would have been safer, providing both stability and a platform for tools. Cost: £150/day vs. £15,000 injury claim + project delays.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 text-white/80">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Do I always need a harness when working at height?</p>
                <p className="text-sm">A: Not always — harnesses are required where there's a risk of falling and no physical barriers are in place.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Can I use a ladder on uneven ground?</p>
                <p className="text-sm">A: Only with suitable stabilisers or levelling devices to ensure stability.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: What training is required for MEWP use?</p>
                <p className="text-sm">A: IPAF (International Powered Access Federation) or equivalent certification is required.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 text-sm leading-relaxed">
                Working at height safely requires planning, the correct equipment, and adherence to regulations. The right access method, combined with good practices like securing tools and avoiding overreaching, prevents accidents and ensures productivity. Remember: most height-related accidents are preventable through proper planning and equipment selection.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Working at Height Safety Quiz" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Earthing Metallic Containment
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Complete Section 4
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
}
