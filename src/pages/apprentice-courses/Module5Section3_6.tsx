import { ArrowLeft, ArrowRight, Shield, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Health and Safety Considerations During Planning - Module 5.3.6 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to integrate comprehensive health and safety planning into electrical installations, ensuring compliance with UK legislation and protecting all site personnel.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What regulation governs electrical safety at work?",
    options: ["HASAWA 1974", "Electricity at Work Regulations 1989", "WAHR 2005", "BS 7671"],
    correctIndex: 1,
    explanation: "The Electricity at Work Regulations 1989 specifically govern electrical safety at work in the UK."
  },
  {
    id: 2,
    question: "What does a method statement describe?",
    options: ["Material requirements", "The safe way of carrying out a task", "Project costs", "Time schedules"],
    correctIndex: 1,
    explanation: "A method statement describes the safe way of carrying out a specific task or activity."
  },
  {
    id: 3,
    question: "Give one consequence of poor safety planning.",
    options: ["Better efficiency", "Accidents and injuries", "Lower costs", "Faster completion"],
    correctIndex: 1,
    explanation: "Poor safety planning can lead to accidents, injuries, HSE investigations, fines, and project delays."
  }
];

const Module5Section3_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What law sets out the general duties for health and safety at work in the UK?",
      options: ["EAWR 1989", "Health and Safety at Work etc. Act 1974", "WAHR 2005", "BS 7671"],
      correctAnswer: 1,
      explanation: "The Health and Safety at Work etc. Act 1974 establishes the fundamental framework for health and safety law in the UK."
    },
    {
      id: 2,
      question: "Which regulation covers electrical safety at work?",
      options: ["Electricity at Work Regulations 1989", "HASAWA 1974", "WAHR 2005", "CDM Regulations"],
      correctAnswer: 0,
      explanation: "The Electricity at Work Regulations 1989 specifically address electrical safety in the workplace."
    },
    {
      id: 3,
      question: "What does WAHR 2005 stand for?",
      options: ["Work and Health Regulations", "Work at Height Regulations 2005", "Workplace Access and Health Requirements", "Working Area Health Rules"],
      correctAnswer: 1,
      explanation: "WAHR 2005 stands for Work at Height Regulations 2005, covering safe working practices when working above ground level."
    },
    {
      id: 4,
      question: "True or False: BS 7671 is only about performance, not safety.",
      options: ["False", "True"],
      correctAnswer: 0,
      explanation: "False. BS 7671 includes comprehensive safety requirements alongside performance standards for electrical installations."
    },
    {
      id: 5,
      question: "What does a method statement describe?",
      options: ["Project timeline", "The safe way of carrying out a task", "Material specifications", "Cost breakdown"],
      correctAnswer: 1,
      explanation: "A method statement provides detailed instructions on how to carry out a specific task safely."
    },
    {
      id: 6,
      question: "Name one common hazard in electrical installation.",
      options: ["Good lighting", "Working at height", "Proper tools", "Clear documentation"],
      correctAnswer: 1,
      explanation: "Working at height is a major hazard in electrical installation, along with manual handling, live working, and fire risks."
    },
    {
      id: 7,
      question: "What should always be done before working on circuits?",
      options: ["Check the weather", "Isolate and lock off the supply", "Order materials", "Schedule inspections"],
      correctAnswer: 1,
      explanation: "Circuits must always be isolated and locked off before work begins to prevent accidental energisation."
    },
    {
      id: 8,
      question: "What is the role of PPE?",
      options: ["To look professional", "To protect workers from residual risks", "To identify trades", "To carry tools"],
      correctAnswer: 1,
      explanation: "Personal Protective Equipment (PPE) protects workers from residual risks that cannot be eliminated through other means."
    },
    {
      id: 9,
      question: "What could happen if poor safety planning leads to an accident?",
      options: ["Nothing serious", "HSE investigation, fines, or legal action", "Just paperwork", "Minor delays"],
      correctAnswer: 1,
      explanation: "Serious accidents can result in HSE investigations, substantial fines, legal action, and potential site closure."
    },
    {
      id: 10,
      question: "Who is responsible for health and safety on site?",
      options: ["Only the safety officer", "Everyone, with site manager leading enforcement", "Just supervisors", "Only the client"],
      correctAnswer: 1,
      explanation: "Health and safety is everyone's responsibility, though site managers lead the enforcement of safety policies."
    }
  ];

  const faqs = [
    {
      question: "Can I work live if it's quicker?",
      answer: "No — live work is only permitted under exceptional circumstances and with strict controls. The time saved is never worth the risk of injury or death. All circuits must be isolated before work begins."
    },
    {
      question: "Who is responsible for health and safety on site?",
      answer: "Everyone has responsibility for health and safety, but the site manager leads enforcement. Each worker must follow safe systems of work and report hazards immediately."
    },
    {
      question: "Are PPE and safe systems optional if the job is small?",
      answer: "No — all jobs require appropriate safety measures, regardless of size. Small jobs can still result in serious injuries if proper precautions aren't taken."
    }
  ];

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
              <span className="text-white/60">Section 5.3.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Health and Safety Considerations During Planning
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Learn to integrate comprehensive health and safety planning into electrical installations, ensuring compliance with UK legislation and protecting all site personnel.
            </p>
          </header>

          {/* In 30 Seconds */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              In 30 Seconds
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Plan safety from the start — not as an afterthought.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Always complete RAMS before starting work.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Isolate circuits and use lock-off procedures.</span>
                </li>
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
                Health and safety must be built into planning from the very start of an electrical installation. Many risks can be avoided through proper preparation, safe systems of work, and compliance with legislation. Planning with safety in mind not only protects workers but also prevents costly delays and ensures legal compliance.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Critical Safety Statistics</p>
                    <p className="text-sm text-white/80">
                      HSE data shows that electrical incidents cause 25% of all workplace fatalities, with 85% being preventable through proper planning and safe systems of work.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/70">
                <strong className="text-white">Best Practice:</strong> Leading contractors achieve zero accidents through systematic safety planning, reducing project costs by 15% compared to reactive safety approaches.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <p>By the end of this subsection, you will be able to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Explain the importance of integrating health and safety into planning.</li>
                <li>Identify key legislation affecting site safety.</li>
                <li>Recognise common hazards in electrical installation.</li>
                <li>Apply risk assessments and method statements (RAMS).</li>
                <li>Plan work to ensure safety for yourself, your team, and others on site.</li>
              </ul>
            </div>
          </section>

          {/* Why Safety Planning Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Why Safety Planning Matters
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Integrating safety into planning is not just a legal requirement but a fundamental business practice that affects every aspect of project delivery.
              </p>

              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <p className="font-medium text-elec-yellow mb-3">Preventing Accidents and Injuries</p>
                <p className="text-sm text-white/80 mb-3">Every worker has the right to return home safely each day. Electrical work involves high-risk activities including:</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-white mb-2">Fatal Risks:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Electric shock and electrocution</li>
                      <li>Falls from height</li>
                      <li>Burns from arc flash incidents</li>
                      <li>Fire and explosion hazards</li>
                      <li>Crushing from heavy equipment</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Injury Risks:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Cuts from tools and sharp edges</li>
                      <li>Musculoskeletal injuries from manual handling</li>
                      <li>Eye injuries from debris and sparks</li>
                      <li>Respiratory issues from dust and fumes</li>
                      <li>Slips, trips and falls</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Real Consequences</p>
                <p className="text-sm text-white/80">
                  In 2023, electrical incidents caused 67 workplace fatalities in the UK, with construction accounting for 45% of these deaths. Average compensation claims exceed £500,000.
                </p>
              </div>
            </div>
          </section>

          {/* Business Benefits */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Business and Economic Benefits
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Comprehensive safety planning delivers measurable business benefits that extend far beyond compliance:
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h3 className="font-medium text-green-400 mb-2">Financial Benefits</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Reduced insurance premiums</li>
                    <li>Lower accident costs</li>
                    <li>Avoided HSE fines</li>
                    <li>Reduced project delays</li>
                    <li>Lower staff turnover</li>
                  </ul>
                  <p className="text-xs text-green-400 mt-2">ROI: £4-6 for every £1 invested</p>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h3 className="font-medium text-blue-400 mb-2">Operational Benefits</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Improved productivity</li>
                    <li>Better quality work</li>
                    <li>Enhanced team morale</li>
                    <li>Smoother project delivery</li>
                    <li>Reduced rework</li>
                  </ul>
                  <p className="text-xs text-blue-400 mt-2">Productivity: 15-25% improvement</p>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <h3 className="font-medium text-purple-400 mb-2">Strategic Benefits</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Enhanced reputation</li>
                    <li>Competitive advantage</li>
                    <li>Client confidence</li>
                    <li>Tender success</li>
                    <li>Market positioning</li>
                  </ul>
                  <p className="text-xs text-purple-400 mt-2">Contracts: 30% higher success rate</p>
                </div>
              </div>
            </div>
          </section>

          {/* UK Legislation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              UK Legislation and Standards
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding the legal framework is essential for compliance and establishing robust safety management systems:
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-red-400 mb-3">Health and Safety at Work etc. Act 1974 (HASAWA)</p>
                <p className="text-sm text-white/80 mb-3">The overarching legislation that establishes the framework for workplace health and safety in the UK.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-white mb-2">Employer Duties (Section 2):</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Provide safe systems of work</li>
                      <li>Ensure safe plant and equipment</li>
                      <li>Provide information, instruction, training</li>
                      <li>Maintain safe working environment</li>
                      <li>Consult with employees on safety matters</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Employee Duties (Section 7):</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Take reasonable care for own safety</li>
                      <li>Protect others who may be affected</li>
                      <li>Cooperate with employers</li>
                      <li>Use safety equipment properly</li>
                      <li>Report hazards and incidents</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded bg-red-500/20">
                  <p className="font-medium text-red-400 mb-1">Penalties and Enforcement:</p>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li><strong>Unlimited fines</strong> for serious breaches</li>
                    <li><strong>Up to 2 years imprisonment</strong> for individuals</li>
                    <li><strong>Corporate manslaughter charges</strong> for fatal incidents</li>
                    <li><strong>Prohibition notices</strong> stopping dangerous work</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Electricity at Work Regulations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Electricity at Work Regulations 1989 (EAWR)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Specific regulations governing electrical safety that apply to all electrical work and equipment:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <p className="font-medium text-elec-yellow mb-3">Key Requirements for Electrical Installation</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-white mb-2">Design and Construction (Reg 4):</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Prevent danger so far as reasonably practicable</li>
                      <li>Suitable for intended use and conditions</li>
                      <li>Proper selection of equipment</li>
                      <li>Adequate earthing and bonding</li>
                      <li>Appropriate protective devices</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Work on Equipment (Reg 14):</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Work on dead equipment whenever possible</li>
                      <li>Proper isolation procedures</li>
                      <li>Proving dead before work</li>
                      <li>Competent persons only</li>
                      <li>Appropriate precautions if live work essential</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded bg-orange-500/10 border-l-2 border-orange-500/50">
                  <p className="font-medium text-orange-400 mb-1">Live Working Restrictions (Reg 14)</p>
                  <p className="text-sm text-white/80 mb-2">Live working is only permitted when:</p>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>It's unreasonable for equipment to be dead</li>
                    <li>Suitable precautions are taken to prevent injury</li>
                    <li>Workers are competent for live working</li>
                    <li>Appropriate protective equipment is used</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="reg-eawr"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Work at Height Regulations */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Work at Height Regulations 2005 (WAHR)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Critical for electrical work which frequently involves working above ground level:
              </p>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-3">Hierarchy of Controls for Height Work</p>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-white mb-2">1. Avoid Working at Height:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Pre-fabricate assemblies at ground level</li>
                      <li>Use longer tools to reach from ground</li>
                      <li>Install equipment before building height increases</li>
                      <li>Design installations to minimise height work</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-white mb-2">2. Prevent Falls (if height work necessary):</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Use proper scaffolding with guardrails</li>
                      <li>Mobile Elevated Work Platforms (MEWPs)</li>
                      <li>Tower scaffolds with guardrails</li>
                      <li>Working platforms with edge protection</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-white mb-2">3. Minimise Distance/Consequences of Falls:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Safety harnesses and fall arrest systems</li>
                      <li>Safety nets beneath work area</li>
                      <li>Airbags or soft landing systems</li>
                      <li>Proper rescue procedures in place</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded bg-green-500/20">
                    <p className="font-medium text-green-400 mb-1">Ladder/Stepladder Use</p>
                    <p className="text-sm text-white/80">
                      Only for short duration work (max 30 minutes) or when other methods aren't reasonably practicable. Must be suitable, stable, and used correctly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BS 7671 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              BS 7671 Wiring Regulations - Safety in Design
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The national standard for electrical installations that ensures safety through proper design and installation:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h3 className="font-medium text-blue-400 mb-2">Protection Principles</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Protection against electric shock</li>
                    <li>Protection against thermal effects</li>
                    <li>Protection against overcurrent</li>
                    <li>Protection against overvoltage</li>
                    <li>Electromagnetic compatibility</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <h3 className="font-medium text-purple-400 mb-2">Safety Measures</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Proper earthing and bonding</li>
                    <li>RCD protection requirements</li>
                    <li>Isolation and switching</li>
                    <li>Cable protection and routing</li>
                    <li>Special location requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Common Hazards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Common Hazards in Electrical Installation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding and recognising hazards is the first step in effective risk management:
              </p>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="font-medium text-orange-400 mb-3">Electrical Hazards - High Risk Categories</p>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-white mb-2">Electric Shock and Electrocution:</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-2">Primary Causes:</p>
                        <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                          <li>Contact with live conductors</li>
                          <li>Faulty equipment or tools</li>
                          <li>Inadequate isolation procedures</li>
                          <li>Damaged cables or insulation</li>
                          <li>Working in wet conditions</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-2">Prevention Measures:</p>
                        <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                          <li>Proper isolation and lock-off</li>
                          <li>Proving dead before work</li>
                          <li>Use of insulated tools</li>
                          <li>Regular PAT testing</li>
                          <li>RCD protection</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-3 p-3 rounded bg-red-500/20">
                      <p className="text-sm text-white/80">
                        <strong className="text-red-400">Critical:</strong> Currents as low as 50mA can be fatal. 230V domestic supply can kill in seconds.
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-white mb-2">Arc Flash and Burns:</p>
                    <div className="p-3 rounded bg-orange-500/20">
                      <p className="text-sm text-white/80 mb-2">Arc flash incidents can cause:</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Temperatures exceeding 19,000°C (hotter than the sun's surface)</li>
                        <li>Severe burns to exposed skin</li>
                        <li>Permanent eye damage or blindness</li>
                        <li>Lung damage from inhaling vaporised metal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="method-statement"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Working at Height Hazards */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Working at Height Hazards
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Falls from height remain the leading cause of workplace fatalities in construction:
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h3 className="font-medium text-red-400 mb-2">High Risk Activities</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Ladder work</li>
                    <li>Roof installations</li>
                    <li>Scaffold erection</li>
                    <li>MEWP operations</li>
                    <li>Opening work near edges</li>
                  </ul>
                  <p className="text-xs text-red-400 mt-2">47% of construction fatalities</p>
                </div>

                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <h3 className="font-medium text-yellow-400 mb-2">Contributing Factors</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Poor planning</li>
                    <li>Unsuitable equipment</li>
                    <li>Lack of edge protection</li>
                    <li>Weather conditions</li>
                    <li>Time pressure</li>
                  </ul>
                  <p className="text-xs text-yellow-400 mt-2">Falls from 2m+ can be fatal</p>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h3 className="font-medium text-green-400 mb-2">Control Measures</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Collective protection first</li>
                    <li>Proper access equipment</li>
                    <li>Fall arrest systems</li>
                    <li>Regular inspections</li>
                    <li>Competent supervision</li>
                  </ul>
                  <p className="text-xs text-green-400 mt-2">95% reduction in incidents</p>
                </div>
              </div>
            </div>
          </section>

          {/* Manual Handling */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Manual Handling and Environmental Hazards
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical installation involves handling heavy equipment and working in challenging environments:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <h3 className="font-medium text-white mb-3">Manual Handling Risks</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Cable drums and reels (up to 500kg)</li>
                    <li>Distribution boards and panels</li>
                    <li>Conduit and trunking lengths</li>
                    <li>Transformer and switchgear</li>
                    <li>Repetitive lifting and carrying</li>
                  </ul>

                  <div className="mt-3 p-3 rounded bg-blue-500/10 border-l-2 border-blue-500/50">
                    <p className="text-sm text-white/80">
                      <strong className="text-blue-400">TILE Assessment:</strong> Task, Individual, Load, Environment - comprehensive evaluation required for all manual handling operations.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <h3 className="font-medium text-white mb-3">Environmental Hazards</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Wet conditions increasing shock risk</li>
                    <li>Confined spaces with poor ventilation</li>
                    <li>Dust from drilling and cutting</li>
                    <li>Noise from power tools</li>
                    <li>Poor lighting conditions</li>
                    <li>Extreme temperatures</li>
                  </ul>

                  <div className="mt-3 p-3 rounded bg-purple-500/10 border-l-2 border-purple-500/50">
                    <p className="text-sm text-white/80">
                      <strong className="text-purple-400">Special Locations:</strong> Bathrooms, swimming pools, agricultural premises require enhanced safety measures per BS 7671.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RAMS */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Risk Assessments and Method Statements (RAMS)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                RAMS form the foundation of safe working practices, providing structured approaches to hazard management:
              </p>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="font-medium text-purple-400 mb-3">Risk Assessment Process - 5 Steps to Safety</p>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-white mb-2">Step 1: Identify Hazards</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Site walkthrough and inspection</li>
                        <li>Review drawings and specifications</li>
                        <li>Consider all phases of work</li>
                        <li>Include interaction with other trades</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">Step 2: Who Might Be Harmed</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Electrical installation team</li>
                        <li>Other trades and contractors</li>
                        <li>Site visitors and inspectors</li>
                        <li>Building occupants</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-white mb-2">Step 3: Evaluate Risks and Control Measures</p>
                    <div className="p-3 rounded bg-purple-500/20">
                      <p className="text-sm text-white/80 mb-2">Risk Assessment Matrix:</p>
                      <div className="grid grid-cols-4 gap-2 text-xs text-center">
                        <div className="bg-green-500/30 p-2 rounded">Low Risk<br/>1-2</div>
                        <div className="bg-yellow-500/30 p-2 rounded">Medium Risk<br/>3-4</div>
                        <div className="bg-orange-500/30 p-2 rounded">High Risk<br/>5-8</div>
                        <div className="bg-red-500/30 p-2 rounded">Very High<br/>9-15</div>
                      </div>
                      <p className="text-xs text-purple-400 mt-2">
                        Risk = Likelihood × Severity (Scale 1-5 each)
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-white mb-2">Step 4: Record Findings</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Document all significant hazards</li>
                        <li>Record control measures implemented</li>
                        <li>Assign responsibility for actions</li>
                        <li>Set review dates</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">Step 5: Review and Update</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Regular review during project</li>
                        <li>Update when conditions change</li>
                        <li>Learn from incidents and near misses</li>
                        <li>Annual review as minimum</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="poor-safety"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Method Statements */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">13</span>
              Method Statements - Safe Systems of Work
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Method statements translate risk assessments into practical, step-by-step safe working procedures:
              </p>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h3 className="font-medium text-blue-400 mb-3">Essential Components of Method Statements</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-white mb-2">Work Description:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Detailed scope of work</li>
                      <li>Location and access routes</li>
                      <li>Duration and timing</li>
                      <li>Resources required</li>
                      <li>Competency requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Safety Procedures:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Step-by-step safe working</li>
                      <li>PPE requirements</li>
                      <li>Equipment checks and testing</li>
                      <li>Emergency procedures</li>
                      <li>Communication protocols</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">14</span>
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <h3 className="font-medium text-white mb-3">Essential Safety Practices</h3>
                <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                  <li>Always carry out a risk assessment before starting work</li>
                  <li>Confirm isolation procedures before working on circuits</li>
                  <li>Use lock-off kits and warning tags</li>
                  <li>Keep walkways clear and materials stored safely</li>
                  <li>Ensure PPE (gloves, goggles, helmets, hi-vis) is worn correctly</li>
                  <li>Plan toolbox talks before starting risky activities</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <h3 className="font-medium text-white mb-3">Daily Safety Checks</h3>
                <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                  <li>Inspect tools and equipment before use</li>
                  <li>Check weather conditions for outdoor work</li>
                  <li>Verify access equipment is safe and suitable</li>
                  <li>Confirm emergency procedures are understood</li>
                  <li>Ensure first aid provisions are available</li>
                  <li>Check communication systems are working</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">15</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-white/90 mb-4">
                <strong className="text-amber-400">Scenario:</strong> On a commercial site, electricians began work on a distribution board without isolating it first, as planning documents hadn't highlighted the risk. A worker received an electric shock, and the HSE issued a fine.
              </p>

              <div className="space-y-4">
                <div className="p-3 rounded bg-red-500/20">
                  <p className="font-medium text-red-400 mb-2">What Went Wrong:</p>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Inadequate risk assessment failed to identify live working hazard</li>
                    <li>No isolation procedure in place</li>
                    <li>Workers not trained in safe isolation techniques</li>
                    <li>No proving unit available to confirm dead</li>
                    <li>Pressure to complete work quickly</li>
                  </ul>
                </div>

                <div className="p-3 rounded bg-green-500/20">
                  <p className="font-medium text-green-400 mb-2">Correct Approach:</p>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Comprehensive risk assessment identifying electrical hazards</li>
                    <li>Method statement detailing safe isolation procedure</li>
                    <li>Training for all workers on electrical safety</li>
                    <li>Proper isolation equipment and proving units</li>
                    <li>Lock-off procedures with warning notices</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-white/80 mt-4">
                <strong className="text-amber-400">Outcome:</strong> If proper RAMS had been in place, the work would have been carried out safely under isolation, preventing injury and legal consequences.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">16</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-card/50 border-l-2 border-elec-yellow/50">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/80">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">17</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="space-y-2 text-white">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Plan safety from the start — not as an afterthought
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Follow legislation: HSWA 1974, EAWR 1989, WAHR 2005, BS 7671
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Always complete RAMS before starting
                  </li>
                </ul>
                <ul className="space-y-2 text-white">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Isolate circuits before working
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    PPE is mandatory — every job, every time
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">18</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/90">
                In this subsection, you learned the importance of planning health and safety into every stage of electrical installation. You explored key laws and regulations, identified common hazards, and reviewed how RAMS and safe systems of work prevent accidents. Good safety planning protects workers, avoids legal consequences, and ensures projects run smoothly.
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
              <Link to="../3-5" className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous: Dealing with Variations</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            </Button>

            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to=".." className="flex items-center justify-center gap-2">
                <span className="hidden sm:inline">Back to Section 5.3</span>
                <span className="sm:hidden">Back to Section</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section3_6;
