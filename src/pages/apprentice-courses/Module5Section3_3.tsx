import { ArrowLeft, ArrowRight, Hammer, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Planning Access and Working Platforms - Module 5.3.3 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to plan safe access routes and select appropriate working platforms for electrical installations while maintaining health and safety compliance.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Name two types of working platforms used in electrical installations.",
    options: ["Ladders and boxes", "Step ladders and podium steps", "Chairs and tables", "Ropes and planks"],
    correctIndex: 1,
    explanation: "Step ladders and podium steps are proper working platforms. Podium steps provide greater stability for longer-duration tasks."
  },
  {
    id: 2,
    question: "What regulation covers working at height?",
    options: ["Health and Safety at Work Act", "Work at Height Regulations 2005", "Electricity at Work Regulations", "COSHH Regulations"],
    correctIndex: 1,
    explanation: "The Work at Height Regulations 2005 specifically governs safe work at height and requires the use of appropriate access equipment."
  },
  {
    id: 3,
    question: "Why should access routes be kept clear?",
    options: ["To prevent trips and accidents", "To look tidy", "To save space", "To impress clients"],
    correctIndex: 0,
    explanation: "Clear access routes prevent trips and accidents, ensuring safe movement around the work area for all personnel."
  }
];

const Module5Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of planning access routes?",
      options: ["To save time", "To ensure work is completed safely and efficiently", "To impress supervisors", "To use fewer materials"],
      correctAnswer: 1,
      explanation: "Planning access routes ensures work is completed safely and efficiently while preventing accidents and delays."
    },
    {
      id: 2,
      question: "True or False: Ladders are suitable for long-duration high-level tasks.",
      options: ["False", "True"],
      correctAnswer: 0,
      explanation: "False. Ladders should only be used for short-duration, low-risk work. Longer tasks require more stable platforms."
    },
    {
      id: 3,
      question: "Which regulation governs safe work at height?",
      options: ["Health and Safety at Work Act", "Work at Height Regulations 2005", "Electricity at Work Regulations", "COSHH Regulations"],
      correctAnswer: 1,
      explanation: "The Work at Height Regulations 2005 specifically covers requirements for safe work at height."
    },
    {
      id: 4,
      question: "Name one type of working platform that provides greater stability than ladders.",
      options: ["Boxes", "Podium steps", "Chairs", "Loose boards"],
      correctAnswer: 1,
      explanation: "Podium steps provide greater stability than ladders and are suitable for repetitive or longer-duration tasks."
    },
    {
      id: 5,
      question: "Who is responsible for inspecting scaffolds?",
      options: ["Anyone on site", "A competent person", "The client", "Only electricians"],
      correctAnswer: 1,
      explanation: "A competent person must inspect scaffolds regularly and after any changes to ensure safety."
    },
    {
      id: 6,
      question: "Why should walkways be kept clear of trailing cables?",
      options: ["To prevent trips and accidents", "To save space", "To look professional", "To use fewer cables"],
      correctAnswer: 0,
      explanation: "Clear walkways prevent trips and accidents from trailing cables and other obstacles."
    },
    {
      id: 7,
      question: "Give one example of a Mobile Elevating Work Platform (MEWP).",
      options: ["Step ladder", "Scissor lift", "Podium steps", "Scaffold tower"],
      correctAnswer: 1,
      explanation: "Scissor lifts and cherry pickers are examples of MEWPs used for high-level or difficult-to-reach areas."
    },
    {
      id: 8,
      question: "What should you do if access equipment is damaged?",
      options: ["Use it carefully", "Report it and do not use until repaired/replaced", "Fix it yourself", "Ignore the damage"],
      correctAnswer: 1,
      explanation: "Damaged equipment must be reported immediately and not used until properly repaired or replaced."
    },
    {
      id: 9,
      question: "Why is coordination with other trades important when planning access?",
      options: ["To make friends", "To avoid conflicts and ensure smooth site operations", "To share equipment", "To work faster"],
      correctAnswer: 1,
      explanation: "Coordination prevents conflicts, ensures efficient use of access routes, and maintains smooth site operations."
    },
    {
      id: 10,
      question: "What is the safest principle when considering working at height?",
      options: ["Use the highest platform available", "Avoid it where possible — complete work from ground level if feasible", "Always use a harness", "Work quickly to minimize time at height"],
      correctAnswer: 1,
      explanation: "The safest approach is to avoid working at height where possible and complete work from ground level when feasible."
    }
  ];

  const faqs = [
    {
      question: "Can I use a ladder for any job at height?",
      answer: "No. Ladders should only be used for short-duration, low-risk work. For extended or repetitive tasks, use more stable platforms like podium steps or scaffolds."
    },
    {
      question: "Who checks scaffolding before use?",
      answer: "A competent person must inspect scaffolds regularly and after any changes. This ensures the scaffold is safe and properly erected."
    },
    {
      question: "What if access equipment is damaged?",
      answer: "Report it immediately and do not use until repaired or replaced. Using damaged equipment puts you and others at serious risk."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 5.3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.3.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Planning Access and Working Platforms
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to plan safe access routes and select appropriate working platforms for electrical installations while maintaining compliance.
            </p>
          </header>

          {/* In 30 Seconds */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              In 30 Seconds
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="text-white/80 space-y-2 list-disc pl-4">
                <li>Plan safe access routes before starting work.</li>
                <li>Choose appropriate platforms: ladders, podiums, scaffolds, MEWPs.</li>
                <li>Follow Work at Height Regulations 2005.</li>
              </ul>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Safe and efficient access to work areas is critical in electrical installation. Poor planning of access can cause delays, create unsafe working conditions, and lead to accidents. By organising access and selecting the right working platforms, electricians can complete tasks more effectively while maintaining compliance with health and safety regulations.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Hammer className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Why This Matters</p>
                    <p className="text-white/70 text-sm">
                      Poor access planning is responsible for approximately 25% of construction site accidents, making proper planning essential for safe electrical installations.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                <strong className="text-white">Real Impact:</strong> Well-planned access routes and platforms can reduce installation time by 15% and significantly decrease the risk of accidents and injuries.
              </p>
              <p className="text-sm p-3 rounded bg-white/5 border border-white/10">
                <strong className="text-white">Industry Standard:</strong> The Work at Height Regulations 2005 require that access planning prioritises the lowest-risk methods available for each task.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-2 leading-relaxed">
              <p className="mb-3">By the end of this subsection, you will be able to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Explain why access planning is important on site.</li>
                <li>Identify common types of working platforms and their uses.</li>
                <li>Plan safe access routes and platforms for different tasks.</li>
                <li>Recognise safety requirements for working at height.</li>
                <li>Apply safe systems of work to prevent accidents.</li>
              </ul>
            </div>
          </section>

          {/* Why Access Planning Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Why Access Planning Matters
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Proper access planning is fundamental to safe and efficient electrical installations:</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-3">Critical Safety Benefits</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-medium mb-1">Safety and Efficiency:</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Ensures tasks can be completed safely and on time</li>
                        <li>Prevents accidents from poor access arrangements</li>
                        <li>Helps coordinate with other trades on site</li>
                        <li>Reduces fatigue and strain on workers</li>
                        <li>Minimises disruption to site operations</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Legal Compliance:</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Meets Work at Height Regulations 2005 requirements</li>
                        <li>Satisfies CDM 2015 planning obligations</li>
                        <li>Ensures HSE compliance for site safety</li>
                        <li>Demonstrates duty of care to employees</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-1">Industry Impact</p>
                  <p className="text-sm text-white/70">
                    Sites with comprehensive access planning show 60% fewer accidents and 25% faster completion times compared to those with poor planning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Working Platforms */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Types of Working Platforms
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Selecting the appropriate platform depends on task duration, height, stability requirements, and site conditions:</p>

              <div className="space-y-4">
                {/* Step Ladders */}
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                  <p className="font-medium text-green-400 mb-3">A. Step Ladders</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-1">Best Used For:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Short-duration tasks (under 30 minutes)</li>
                        <li>Light work requiring minimal tools</li>
                        <li>Quick access for inspection or adjustment</li>
                        <li>Work up to 3 metres height</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Limitations:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Limited working area</li>
                        <li>Requires three points of contact</li>
                        <li>Not suitable for heavy materials</li>
                        <li>Weather dependent for outdoor use</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Podium Steps */}
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-elec-yellow mb-3">B. Podium Steps</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-1">Advantages:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Large, stable working platform</li>
                        <li>Guardrails provide fall protection</li>
                        <li>Tool tray for equipment storage</li>
                        <li>Suitable for repetitive tasks</li>
                        <li>Can work with both hands free</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Typical Applications:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Cable pulling and routing</li>
                        <li>Lighting installation</li>
                        <li>Containment fixing</li>
                        <li>Longer duration tasks (1-4 hours)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Scaffold Towers */}
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                  <p className="font-medium text-purple-400 mb-3">C. Scaffold Towers</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-1">When to Use:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Extended work periods (days/weeks)</li>
                        <li>Multiple workers on same platform</li>
                        <li>Heavy equipment and materials</li>
                        <li>Heights above 6 metres</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Inspection Requirements:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Competent person inspection before first use</li>
                        <li>Weekly inspections during use</li>
                        <li>Inspection after substantial alteration</li>
                        <li>Written records must be maintained</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* MEWPs */}
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                  <p className="font-medium text-orange-400 mb-3">D. Mobile Elevating Work Platforms (MEWPs)</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-1">Types and Applications:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Scissor Lifts:</strong> Large platforms, up to 18m height</li>
                        <li><strong>Boom Lifts:</strong> Reach over obstacles, up to 40m+</li>
                        <li><strong>Cherry Pickers:</strong> Precise positioning, compact access</li>
                        <li><strong>Spider Lifts:</strong> Narrow access, outdoor/indoor use</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Operator Requirements:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>IPAF certification required</li>
                        <li>Category-specific training (3a, 3b, 1a, 1b)</li>
                        <li>Pre-use inspection competency</li>
                        <li>Understanding of ground conditions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="platforms-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Planning Safe Access Routes */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Planning Safe Access Routes
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Effective access route planning requires systematic consideration of multiple factors:</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-amber-400 mb-3">Route Planning Methodology</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Site Survey Requirements:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Measure available space for equipment and movement</li>
                      <li>Identify structural constraints and obstacles</li>
                      <li>Assess floor loading capacities</li>
                      <li>Check ceiling heights and overhead restrictions</li>
                      <li>Note existing services and utilities</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Traffic Management:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Separate pedestrian and vehicle routes where possible</li>
                      <li>Implement one-way systems in narrow areas</li>
                      <li>Provide passing places on longer routes</li>
                      <li>Install appropriate signage and barriers</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Emergency Considerations:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Maintain clear emergency evacuation routes</li>
                      <li>Ensure access for emergency services</li>
                      <li>Provide alternative routes if main route blocked</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="routes-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Working at Height Requirements */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Working at Height Requirements
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>The Work at Height Regulations 2005 establish a comprehensive legal framework for safe working at height:</p>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-3">Hierarchy of Controls</p>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="font-medium text-red-400">Avoid Work at Height</p>
                      <p className="text-white/70">Where reasonably practicable, complete work from ground level</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="font-medium text-red-400">Prevent Falls</p>
                      <p className="text-white/70">Use guardrails, barriers, and working platforms</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="font-medium text-red-400">Mitigate Fall Distance</p>
                      <p className="text-white/70">Fall arrest systems, safety nets, air bags</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="regulations-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Practical Guidance */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Daily Inspection Checklist</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                  <li>Visual inspection for damage, wear, or deformation</li>
                  <li>Check all locking mechanisms and safety systems</li>
                  <li>Verify stability and levelness of platforms</li>
                  <li>Ensure guardrails and toe boards are secure</li>
                  <li>Test access and egress routes</li>
                  <li>Check ground conditions and weather suitability</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Setup Best Practices</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                  <li>Establish exclusion zones around working areas</li>
                  <li>Position platforms to minimise reaching and stretching</li>
                  <li>Ensure adequate lighting for all work areas</li>
                  <li>Provide tool restraint systems to prevent drops</li>
                  <li>Install warning signs and barriers as required</li>
                  <li>Maintain clear emergency evacuation routes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-amber-300 mb-3">
                On a warehouse project, electricians used step ladders for extended cable installation at high level. The ladders were unstable, and one worker fell, injuring his arm. After review, podium steps and a scaffold tower were introduced, improving safety and efficiency.
              </p>
              <div className="p-3 rounded bg-amber-500/20 border border-amber-500/30">
                <p className="font-medium text-amber-300 mb-1">Lessons Learned:</p>
                <ul className="list-disc pl-5 text-sm text-amber-200">
                  <li>Risk assessment identified inappropriate equipment selection</li>
                  <li>Proper platform selection improved both safety and productivity</li>
                  <li>Worker training emphasized equipment limitations</li>
                  <li>Site procedures updated to prevent similar incidents</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                  <p className="text-white/70 text-sm">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <div className="space-y-2 text-elec-yellow">
                <p>• Plan safe access routes before starting work.</p>
                <p>• Choose the right platform: step ladder, podium, scaffold, or MEWP.</p>
                <p>• Follow Work at Height Regulations 2005.</p>
                <p>• Never use makeshift access equipment.</p>
                <p>• Keep walkways clear and coordinate with other trades.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Summary
            </h2>
            <div className="text-white/80 leading-relaxed">
              <p>
                In this subsection, you learned how to plan safe access and working platforms. You now know the types of platforms available, the importance of clear access routes, and the legal requirements for working at height. Proper planning ensures tasks are completed safely, efficiently, and without unnecessary risk.
              </p>
            </div>
          </section>

          {/* Knowledge Check */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-elec-yellow" />
              <h2 className="text-xl font-semibold text-white">Knowledge Check</h2>
            </div>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-4">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section3_3;
