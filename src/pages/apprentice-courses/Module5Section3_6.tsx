import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Health and Safety Considerations During Planning - Module 5.3.6 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to integrate comprehensive health and safety planning into electrical installations, ensuring compliance with UK legislation and protecting all site personnel.";

// Inline check questions
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.3.6
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Health and Safety Considerations During Planning
          </h1>
          <p className="text-white">
            Learn to integrate comprehensive health and safety planning into electrical installations, ensuring compliance with UK legislation and protecting all site personnel.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Introduction</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Plan safety from the start — not as an afterthought.</li>
                <li>Always complete RAMS before starting work.</li>
                <li>Isolate circuits and use lock-off procedures.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Unsafe practices, missing PPE, live working.</li>
                <li><strong>Use:</strong> Risk assessments, method statements, isolation procedures.</li>
                <li><strong>Check:</strong> Legislation compliance, training records, safety equipment.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Health and safety must be built into planning from the very start of an electrical installation. Many risks can be avoided through proper preparation, safe systems of work, and compliance with legislation. Planning with safety in mind not only protects workers but also prevents costly delays and ensures legal compliance.
          </p>
          
          <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-elec-yellow text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 text-elec-yellow mb-2">Critical Safety Statistics</p>
                <p className="text-xs sm:text-sm text-white">
                  HSE data shows that electrical incidents cause 25% of all workplace fatalities, with 85% being preventable through proper planning and safe systems of work.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-white">
              <strong>Legal Requirements:</strong> Employers have absolute duties under HASAWA 1974 to ensure worker safety, with unlimited fines and potential imprisonment for serious breaches.
            </p>
            
            <div className="bg-elec-yellow/5 bg-elec-yellow/10 p-3 rounded border border-elec-yellow/30 border-elec-yellow/20">
              <p className="text-xs sm:text-sm text-white">
                <strong>Best Practice:</strong> Leading contractors achieve zero accidents through systematic safety planning, reducing project costs by 15% compared to reactive safety approaches.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain the importance of integrating health and safety into planning.</li>
            <li>Identify key legislation affecting site safety.</li>
            <li>Recognise common hazards in electrical installation.</li>
            <li>Apply risk assessments and method statements (RAMS).</li>
            <li>Plan work to ensure safety for yourself, your team, and others on site.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Why Safety Planning Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Why Safety Planning Matters - Comprehensive Analysis</h3>
            <p className="text-base text-white mb-4">
              Integrating safety into planning is not just a legal requirement but a fundamental business practice that affects every aspect of project delivery:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Human and Moral Imperatives</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Preventing Accidents and Injuries:</strong></p>
                        <p className="text-xs sm:text-sm text-white mb-3">Every worker has the right to return home safely each day. Electrical work involves high-risk activities including:</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-base text-white mb-2"><strong>Fatal Risks:</strong></p>
                            <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                              <li>Electric shock and electrocution</li>
                              <li>Falls from height</li>
                              <li>Burns from arc flash incidents</li>
                              <li>Fire and explosion hazards</li>
                              <li>Crushing from heavy equipment</li>
                            </ul>
                          </div>
                          <div>
                            <p className="text-base text-white mb-2"><strong>Injury Risks:</strong></p>
                            <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                              <li>Cuts from tools and sharp edges</li>
                              <li>Musculoskeletal injuries from manual handling</li>
                              <li>Eye injuries from debris and sparks</li>
                              <li>Respiratory issues from dust and fumes</li>
                              <li>Slips, trips and falls</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 text-elec-yellow mb-2">Real Consequences</p>
                        <p className="text-xs sm:text-sm text-white">
                          In 2023, electrical incidents caused 67 workplace fatalities in the UK, with construction accounting for 45% of these deaths. Average compensation claims exceed £500,000.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Business and Economic Benefits */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1.1 Business and Economic Benefits of Safety Planning</h3>
            <p className="text-base text-white mb-4">
              Comprehensive safety planning delivers measurable business benefits that extend far beyond compliance:
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Financial Benefits</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Reduced insurance premiums</li>
                    <li>Lower accident costs</li>
                    <li>Avoided HSE fines</li>
                    <li>Reduced project delays</li>
                    <li>Lower staff turnover</li>
                  </ul>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-2">ROI: £4-6 for every £1 invested</p>
                </div>

                <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Operational Benefits</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Improved productivity</li>
                    <li>Better quality work</li>
                    <li>Enhanced team morale</li>
                    <li>Smoother project delivery</li>
                    <li>Reduced rework</li>
                  </ul>
                  <p className="text-xs text-blue-700 text-elec-yellow mt-2">Productivity: 15-25% improvement</p>
                </div>

                <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Strategic Benefits</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Enhanced reputation</li>
                    <li>Competitive advantage</li>
                    <li>Client confidence</li>
                    <li>Tender success</li>
                    <li>Market positioning</li>
                  </ul>
                  <p className="text-xs text-purple-700 text-elec-yellow mt-2">Contracts: 30% higher success rate</p>
                </div>
              </div>
            </div>
          </section>

          {/* UK Legislation and Standards */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. UK Legislation and Standards - Detailed Framework</h3>
            <p className="text-base text-white mb-4">
              Understanding the legal framework is essential for compliance and establishing robust safety management systems:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3">Health and Safety at Work etc. Act 1974 (HASAWA)</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Fundamental Principles:</strong></p>
                        <p className="text-xs sm:text-sm text-white mb-3">The overarching legislation that establishes the framework for workplace health and safety in the UK.</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-base text-white mb-2"><strong>Employer Duties (Section 2):</strong></p>
                            <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                              <li>Provide safe systems of work</li>
                              <li>Ensure safe plant and equipment</li>
                              <li>Provide information, instruction, training</li>
                              <li>Maintain safe working environment</li>
                              <li>Consult with employees on safety matters</li>
                            </ul>
                          </div>
                          <div>
                            <p className="text-base text-white mb-2"><strong>Employee Duties (Section 7):</strong></p>
                            <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                              <li>Take reasonable care for own safety</li>
                              <li>Protect others who may be affected</li>
                              <li>Cooperate with employers</li>
                              <li>Use safety equipment properly</li>
                              <li>Report hazards and incidents</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Penalties and Enforcement:</strong></p>
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                          <ul className="text-xs sm:text-sm text-white list-disc pl-6 space-y-1">
                            <li><strong>Unlimited fines</strong> for serious breaches</li>
                            <li><strong>Up to 2 years imprisonment</strong> for individuals</li>
                            <li><strong>Corporate manslaughter charges</strong> for fatal incidents</li>
                            <li><strong>Prohibition notices</strong> stopping dangerous work</li>
                            <li><strong>Improvement notices</strong> requiring corrective action</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Electricity at Work Regulations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2.1 Electricity at Work Regulations 1989 (EAWR)</h3>
            <p className="text-base text-white mb-4">
              Specific regulations governing electrical safety that apply to all electrical work and equipment:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">⚡</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Key Requirements for Electrical Installation</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-white mb-2"><strong>Design and Construction (Reg 4):</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Prevent danger so far as reasonably practicable</li>
                            <li>Suitable for intended use and conditions</li>
                            <li>Proper selection of equipment</li>
                            <li>Adequate earthing and bonding</li>
                            <li>Appropriate protective devices</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-white mb-2"><strong>Work on Equipment (Reg 14):</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Work on dead equipment whenever possible</li>
                            <li>Proper isolation procedures</li>
                            <li>Proving dead before work</li>
                            <li>Competent persons only</li>
                            <li>Appropriate precautions if live work essential</li>
                          </ul>
                        </div>
                      </div>

                      <InlineCheck 
                        id="reg-eawr"
                        question={quickCheckQuestions[0].question}
                        options={quickCheckQuestions[0].options}
                        correctIndex={quickCheckQuestions[0].correctIndex}
                        explanation={quickCheckQuestions[0].explanation}
                      />

                      <div>
                        <p className="text-base text-white mb-2"><strong>Live Working Restrictions (Reg 14):</strong></p>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                          <p className="text-xs sm:text-sm text-white mb-2">Live working is only permitted when:</p>
                          <ul className="text-xs sm:text-sm text-white list-disc pl-6 space-y-1">
                            <li>It's unreasonable for equipment to be dead</li>
                            <li>Suitable precautions are taken to prevent injury</li>
                            <li>Workers are competent for live working</li>
                            <li>Appropriate protective equipment is used</li>
                            <li>Safe systems of work are implemented</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Work at Height Regulations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2.2 Work at Height Regulations 2005 (WAHR)</h3>
            <p className="text-base text-white mb-4">
              Critical for electrical work which frequently involves working above ground level:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">↑</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Hierarchy of Controls for Height Work</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>1. Avoid Working at Height:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Pre-fabricate assemblies at ground level</li>
                          <li>Use longer tools to reach from ground</li>
                          <li>Install equipment before building height increases</li>
                          <li>Design installations to minimise height work</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>2. Prevent Falls (if height work necessary):</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Use proper scaffolding with guardrails</li>
                          <li>Mobile Elevated Work Platforms (MEWPs)</li>
                          <li>Tower scaffolds with guardrails</li>
                          <li>Working platforms with edge protection</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>3. Minimise Distance/Consequences of Falls:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Safety harnesses and fall arrest systems</li>
                          <li>Safety nets beneath work area</li>
                          <li>Airbags or soft landing systems</li>
                          <li>Proper rescue procedures in place</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Ladder/Stepladder Use</p>
                        <p className="text-xs sm:text-sm text-white">
                          Only for short duration work (max 30 minutes) or when other methods aren't reasonably practicable. Must be suitable, stable, and used correctly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BS 7671 Safety Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2.3 BS 7671 Wiring Regulations - Safety in Design</h3>
            <p className="text-base text-white mb-4">
              The national standard for electrical installations that ensures safety through proper design and installation:
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Protection Principles</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Protection against electric shock</li>
                    <li>Protection against thermal effects</li>
                    <li>Protection against overcurrent</li>
                    <li>Protection against overvoltage</li>
                    <li>Electromagnetic compatibility</li>
                  </ul>
                </div>

                <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Safety Measures</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
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

          {/* Common Hazards Comprehensive Analysis */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Common Hazards in Electrical Installation - Comprehensive Analysis</h3>
            <p className="text-base text-white mb-4">
              Understanding and recognising hazards is the first step in effective risk management:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">⚠</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-3">Electrical Hazards - High Risk Categories</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Electric Shock and Electrocution:</strong></p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs sm:text-sm text-white mb-2"><strong>Primary Causes:</strong></p>
                            <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                              <li>Contact with live conductors</li>
                              <li>Faulty equipment or tools</li>
                              <li>Inadequate isolation procedures</li>
                              <li>Damaged cables or insulation</li>
                              <li>Working in wet conditions</li>
                              <li>Inadequate earthing/bonding</li>
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-white mb-2"><strong>Prevention Measures:</strong></p>
                            <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                              <li>Proper isolation and lock-off</li>
                              <li>Proving dead before work</li>
                              <li>Use of insulated tools</li>
                              <li>Regular PAT testing</li>
                              <li>RCD protection</li>
                              <li>Dry working conditions</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800 mt-3">
                          <p className="text-xs sm:text-sm text-white">
                            <strong>Critical:</strong> Currents as low as 50mA can be fatal. 230V domestic supply can kill in seconds.
                          </p>
                        </div>
                      </div>

          <InlineCheck 
            id="method-statement"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

                      <div>
                        <p className="text-base text-white mb-2"><strong>Arc Flash and Burns:</strong></p>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                          <p className="text-xs sm:text-sm text-white mb-2">Arc flash incidents can cause:</p>
                          <ul className="text-xs sm:text-sm text-white list-disc pl-6 space-y-1">
                            <li>Temperatures exceeding 19,000°C (hotter than the sun's surface)</li>
                            <li>Severe burns to exposed skin</li>
                            <li>Permanent eye damage or blindness</li>
                            <li>Lung damage from inhaling vaporised metal</li>
                            <li>Hearing loss from pressure wave</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Working at Height Hazards */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3.1 Working at Height Hazards - Detailed Risk Assessment</h3>
            <p className="text-base text-white mb-4">
              Falls from height remain the leading cause of workplace fatalities in construction:
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">High Risk Activities</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Ladder work</li>
                    <li>Roof installations</li>
                    <li>Scaffold erection</li>
                    <li>MEWP operations</li>
                    <li>Opening work near edges</li>
                    <li>Fragile surface work</li>
                  </ul>
                  <p className="text-xs text-red-700 text-elec-yellow mt-2">47% of construction fatalities</p>
                </div>

                <div className="rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Contributing Factors</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Poor planning</li>
                    <li>Unsuitable equipment</li>
                    <li>Lack of edge protection</li>
                    <li>Weather conditions</li>
                    <li>Inadequate training</li>
                    <li>Time pressure</li>
                  </ul>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">Falls from 2m+ can be fatal</p>
                </div>

                <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Control Measures</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Collective protection first</li>
                    <li>Proper access equipment</li>
                    <li>Fall arrest systems</li>
                    <li>Regular inspections</li>
                    <li>Weather monitoring</li>
                    <li>Competent supervision</li>
                  </ul>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-2">95% reduction in incidents</p>
                </div>
              </div>
            </div>
          </section>

          {/* Manual Handling and Other Hazards */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3.2 Manual Handling and Environmental Hazards</h3>
            <p className="text-base text-white mb-4">
              Electrical installation involves handling heavy equipment and working in challenging environments:
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col h-full">
                  <h4 className="font-medium text-white mb-3">Manual Handling Risks</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white mb-3 flex-grow">
                    <li>Cable drums and reels (up to 500kg)</li>
                    <li>Distribution boards and panels</li>
                    <li>Conduit and trunking lengths</li>
                    <li>Transformer and switchgear</li>
                    <li>Repetitive lifting and carrying</li>
                  </ul>
                  
                  <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800 mt-auto">
                    <p className="text-xs sm:text-sm text-white">
                      <strong>TILE Assessment:</strong> Task, Individual, Load, Environment - comprehensive evaluation required for all manual handling operations.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col h-full">
                  <h4 className="font-medium text-white mb-3">Environmental Hazards</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white mb-3 flex-grow">
                    <li>Wet conditions increasing shock risk</li>
                    <li>Confined spaces with poor ventilation</li>
                    <li>Dust from drilling and cutting</li>
                    <li>Noise from power tools</li>
                    <li>Poor lighting conditions</li>
                    <li>Extreme temperatures</li>
                  </ul>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800 mt-auto">
                    <p className="text-xs sm:text-sm text-white">
                      <strong>Special Locations:</strong> Bathrooms, swimming pools, agricultural premises require enhanced safety measures per BS 7671.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Assessment and Method Statements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Risk Assessments and Method Statements (RAMS) - Systematic Approach</h3>
            <p className="text-base text-white mb-4">
              RAMS form the foundation of safe working practices, providing structured approaches to hazard management:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">📋</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-3">Risk Assessment Process - 5 Steps to Safety</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-white mb-2"><strong>Step 1: Identify Hazards</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Site walkthrough and inspection</li>
                            <li>Review drawings and specifications</li>
                            <li>Consider all phases of work</li>
                            <li>Include interaction with other trades</li>
                            <li>Account for weather and site conditions</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-white mb-2"><strong>Step 2: Identify Who Might Be Harmed</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Electrical installation team</li>
                            <li>Other trades and contractors</li>
                            <li>Site visitors and inspectors</li>
                            <li>Building occupants</li>
                            <li>Members of the public</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Step 3: Evaluate Risks and Control Measures</strong></p>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                          <p className="text-xs sm:text-sm text-white mb-2">Risk Assessment Matrix:</p>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            <div className="bg-green-200 dark:bg-green-800 p-2 text-center rounded">Low Risk<br/>1-2</div>
                            <div className="bg-yellow-200 dark:bg-yellow-800 p-2 text-center rounded">Medium Risk<br/>3-4</div>
                            <div className="bg-orange-200 dark:bg-orange-800 p-2 text-center rounded">High Risk<br/>5-8</div>
                            <div className="bg-red-200 dark:bg-red-800 p-2 text-center rounded">Very High<br/>9-15</div>
                          </div>
                          <p className="text-xs text-purple-700 text-elec-yellow mt-2">
                            Risk = Likelihood × Severity (Scale 1-5 each)
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-white mb-2"><strong>Step 4: Record Findings</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Document all significant hazards</li>
                            <li>Record control measures implemented</li>
                            <li>Assign responsibility for actions</li>
                            <li>Set review dates</li>
                            <li>Ensure all team members understand</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-white mb-2"><strong>Step 5: Review and Update</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Regular review during project</li>
                            <li>Update when conditions change</li>
                            <li>Learn from incidents and near misses</li>
                            <li>Incorporate new information</li>
                            <li>Annual review as minimum</li>
                          </ul>
                        </div>
                      </div>
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
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4.1 Method Statements - Safe Systems of Work</h3>
            <p className="text-base text-white mb-4">
              Method statements translate risk assessments into practical, step-by-step safe working procedures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Essential Components of Method Statements</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Work Description:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Detailed scope of work</li>
                      <li>Location and access routes</li>
                      <li>Duration and timing</li>
                      <li>Resources required</li>
                      <li>Competency requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Safety Procedures:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
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
        </Card>

        {/* Quick Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Knowledge Check</h2>
          <div className="space-y-6">
            {quickCheckQuestions.map((question) => (
              <InlineCheck
                key={question.id}
                id={`check-${question.id}`}
                question={question.question}
                options={question.options}
                correctIndex={question.correctIndex}
                explanation={question.explanation}
              />
            ))}
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-medium text-white mb-3">Essential Safety Practices</h3>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                  <li>Always carry out a risk assessment before starting work</li>
                  <li>Confirm isolation procedures before working on circuits</li>
                  <li>Use lock-off kits and warning tags</li>
                  <li>Keep walkways clear and materials stored safely</li>
                  <li>Ensure PPE (gloves, goggles, helmets, hi-vis) is worn correctly</li>
                  <li>Plan toolbox talks before starting risky activities</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-3">Daily Safety Checks</h3>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                  <li>Inspect tools and equipment before use</li>
                  <li>Check weather conditions for outdoor work</li>
                  <li>Verify access equipment is safe and suitable</li>
                  <li>Confirm emergency procedures are understood</li>
                  <li>Ensure first aid provisions are available</li>
                  <li>Check communication systems are working</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <h2 className="text-lg sm:text-xl font-semibold text-amber-800 dark:text-amber-200 mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <p className="text-base text-white">
              <strong>Scenario:</strong> On a commercial site, electricians began work on a distribution board without isolating it first, as planning documents hadn't highlighted the risk. A worker received an electric shock, and the HSE issued a fine.
            </p>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">
              <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">What Went Wrong:</h3>
              <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                <li>Inadequate risk assessment failed to identify live working hazard</li>
                <li>No isolation procedure in place</li>
                <li>Workers not trained in safe isolation techniques</li>
                <li>No proving unit available to confirm dead</li>
                <li>Pressure to complete work quickly</li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
              <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Correct Approach:</h3>
              <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                <li>Comprehensive risk assessment identifying electrical hazards</li>
                <li>Method statement detailing safe isolation procedure</li>
                <li>Training for all workers on electrical safety</li>
                <li>Proper isolation equipment and proving units</li>
                <li>Lock-off procedures with warning notices</li>
              </ul>
            </div>
            
            <p className="text-xs sm:text-sm text-white">
              <strong>Outcome:</strong> If proper RAMS had been in place, the work would have been carried out safely under isolation, preventing injury and legal consequences.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <h2 className="text-lg sm:text-xl font-semibold text-green-800 dark:text-green-200 mb-4">Pocket Guide</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Plan safety from the start — not as an afterthought
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Follow legislation: HSWA 1974, EAWR 1989, WAHR 2005, BS 7671
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Always complete RAMS before starting
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Isolate circuits before working
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  PPE is mandatory — every job, every time
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white">
            In this subsection, you learned the importance of planning health and safety into every stage of electrical installation. You explored key laws and regulations, identified common hazards, and reviewed how RAMS and safe systems of work prevent accidents. Good safety planning protects workers, avoids legal consequences, and ensures projects run smoothly.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="../3-5" className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous: Dealing with Variations</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          </Button>
          
          <Button asChild className="w-full sm:w-auto">
            <Link to=".." className="flex items-center justify-center gap-2">
              <span className="hidden sm:inline">Back to Section 3</span>
              <span className="sm:hidden">Back</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section3_6;