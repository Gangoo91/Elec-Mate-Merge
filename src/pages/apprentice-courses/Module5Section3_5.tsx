import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dealing with Variations and Unforeseen Issues - Module 5.3.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to manage project variations and unexpected issues effectively while maintaining safety, quality, and compliance standards.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is a variation in electrical work?",
    options: ["A mistake in installation", "A change to the agreed design, scope, or programme", "A safety issue", "A tool malfunction"],
    correctIndex: 1,
    explanation: "A variation is any change to the agreed design, scope, or programme, such as adding sockets or moving lighting positions."
  },
  {
    id: 2,
    question: "Give one example of an unforeseen issue.",
    options: ["Client satisfaction", "Hidden beams blocking cable routes", "Good weather", "Early material delivery"],
    correctIndex: 1,
    explanation: "Unforeseen issues include hidden site conditions like structural beams blocking planned cable routes."
  },
  {
    id: 3,
    question: "Why must all changes be recorded formally?",
    options: ["To create more work", "To avoid disputes and ensure compliance", "To slow down progress", "To charge more money"],
    correctIndex: 1,
    explanation: "Formal recording prevents disputes, ensures regulatory compliance, and maintains clear project documentation."
  }
];

const Module5Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is a variation in project work?",
      options: ["A safety issue", "A change to the agreed design, scope, or programme", "A tool inspection", "A material delivery"],
      correctAnswer: 1,
      explanation: "A variation is any change to the agreed design, scope, or programme that differs from the original plan."
    },
    {
      id: 2,
      question: "Give one example of a variation.",
      options: ["Weather delays", "Adding sockets", "Equipment failure", "Staff training"],
      correctAnswer: 1,
      explanation: "Examples of variations include adding sockets, moving light fittings, or upgrading cable sizes."
    },
    {
      id: 3,
      question: "What is one example of an unforeseen issue?",
      options: ["Planned maintenance", "Hidden beams", "Scheduled meetings", "Regular inspections"],
      correctAnswer: 1,
      explanation: "Unforeseen issues include hidden beams, material shortages, weather delays, or other trades' delays."
    },
    {
      id: 4,
      question: "True or False: Small changes that save time can be made without approval.",
      options: ["False", "True"],
      correctAnswer: 0,
      explanation: "False. All changes, regardless of size, must be authorised to ensure compliance and avoid disputes."
    },
    {
      id: 5,
      question: "Why must all variations be recorded in writing?",
      options: ["To slow down work", "To avoid disputes and ensure compliance", "To create paperwork", "To confuse workers"],
      correctAnswer: 1,
      explanation: "Written records prevent disputes, ensure compliance, and provide clear documentation for all changes."
    },
    {
      id: 6,
      question: "Who should approve variations before work proceeds?",
      options: ["Any electrician", "Supervisor or project manager", "The client directly", "Material suppliers"],
      correctAnswer: 1,
      explanation: "Variations must be approved by the supervisor or project manager before any work proceeds."
    },
    {
      id: 7,
      question: "What is the safest response if an unforeseen issue creates a hazard?",
      options: ["Continue working carefully", "Stop work and report immediately", "Work around the problem", "Speed up to finish quickly"],
      correctAnswer: 1,
      explanation: "If safety is affected, work must stop immediately and the issue reported to supervisors."
    },
    {
      id: 8,
      question: "Name one risk of poorly managing variations.",
      options: ["Better quality work", "Safety compromise", "Lower costs", "Faster completion"],
      correctAnswer: 1,
      explanation: "Poor variation management can lead to safety compromises, disputes, delays, and non-compliance."
    },
    {
      id: 9,
      question: "What document is used to formally record changes?",
      options: ["Timesheet", "Variation order or site instruction", "Delivery note", "Tool list"],
      correctAnswer: 1,
      explanation: "Variation orders or site instructions formally document all approved changes to the project."
    },
    {
      id: 10,
      question: "What is one way to reduce disruption while waiting for an issue to be resolved?",
      options: ["Stop all work", "Switch to another planned task", "Go home early", "Change the design yourself"],
      correctAnswer: 1,
      explanation: "Switching to alternative planned tasks maintains productivity while issues are being resolved."
    }
  ];

  const faqs = [
    {
      question: "Can I make small changes without approval if they save time?",
      answer: "No — all changes must be authorised to ensure compliance and avoid disputes. Even small changes can have significant implications for safety, cost, and compliance."
    },
    {
      question: "What if the client requests extra work directly to me?",
      answer: "Refer it to the supervisor/project manager. Never accept instructions without approval. All client communications should go through proper channels to maintain clear accountability."
    },
    {
      question: "How do I minimise disruption when issues arise?",
      answer: "Switch to alternative tasks until the problem is resolved. Maintain productivity by having flexible work sequences that allow continued progress in other areas."
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
              <Settings className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.3.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Dealing with Variations and Unforeseen Issues
          </h1>
          <p className="text-white">
            Learn to manage project changes and unexpected challenges effectively while maintaining safety, quality, and compliance standards.
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
                <li>Record all changes formally with written approval.</li>
                <li>Stop work if safety is compromised by unforeseen issues.</li>
                <li>Communicate changes to all affected parties immediately.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Unauthorised changes, hidden conditions, safety hazards.</li>
                <li><strong>Use:</strong> Variation orders, site instructions, change logs.</li>
                <li><strong>Check:</strong> Approvals obtained, documentation updated, compliance maintained.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            No matter how well a project is planned, variations and unforeseen issues will always arise. These may include design changes, unexpected site conditions, or delays caused by other trades. The key is not to avoid them — which is impossible — but to manage them effectively so that safety, quality, and deadlines are not compromised.
          </p>
          
          <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-elec-yellow text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 text-elec-yellow mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-white">
                  Studies show that 75% of construction projects experience significant variations, with poorly managed changes causing 40% of project delays and 35% of cost overruns.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-white">
              <strong>Real Impact:</strong> Professional variation management can reduce project disputes by 60% and maintain schedule adherence even when significant changes occur.
            </p>
            
            <div className="bg-elec-yellow/5 bg-elec-yellow/10 p-3 rounded border border-elec-yellow/30 border-elec-yellow/20">
              <p className="text-xs sm:text-sm text-white">
                <strong>Industry Standard:</strong> JCT contracts and NEC frameworks require systematic variation management to maintain legal compliance and project governance.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Recognise common causes of variations and unforeseen issues on site.</li>
            <li>Apply methods to manage and record changes.</li>
            <li>Communicate effectively when issues arise.</li>
            <li>Understand how variations affect timescales and costs.</li>
            <li>Work flexibly while maintaining compliance with BS 7671 and safety standards.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* What Are Variations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. What Are Variations? - Comprehensive Understanding</h3>
            <p className="text-base text-white mb-4">
              Variations are fundamental changes that deviate from the original project scope and require systematic management:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Definition and Types of Variations</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Core Definition:</strong></p>
                        <p className="text-xs sm:text-sm text-white mb-3">Any change to the agreed design, scope, or programme that differs from the original contract or specification.</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-base text-white mb-2"><strong>Design Variations:</strong></p>
                            <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                              <li>Client requests additional sockets or switches</li>
                              <li>Moving lighting positions for aesthetic reasons</li>
                              <li>Upgrading cable sizes for increased loads</li>
                              <li>Changing containment routes for architectural reasons</li>
                              <li>Adding emergency lighting requirements</li>
                            </ul>
                          </div>
                          <div>
                            <p className="text-base text-white mb-2"><strong>Scope Variations:</strong></p>
                            <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                              <li>Additional floors or areas to be serviced</li>
                              <li>Increased power requirements for equipment</li>
                              <li>Extra data and communication installations</li>
                              <li>Fire alarm system extensions</li>
                              <li>Temporary power supply requirements</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Programme Variations:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Accelerated completion requirements</li>
                          <li>Phased handover changes</li>
                          <li>Working hour restrictions due to occupation</li>
                          <li>Seasonal constraints for external work</li>
                          <li>Integration with other project phases</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Financial Impact</p>
                        <p className="text-xs sm:text-sm text-white">
                          Well-managed variations can actually improve project profitability, while poorly managed ones can result in losses of 10-20% of contract value.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Variation Classification System */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1.1 Variation Classification and Impact Assessment</h3>
            <p className="text-base text-white mb-4">
              Understanding variation categories helps determine appropriate response and management strategies:
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-800 dark:text-white mb-3">Minor Variations</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Single socket additions</li>
                    <li>Switch position adjustments</li>
                    <li>Cable colour changes</li>
                    <li>Minor route modifications</li>
                  </ul>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-2">Impact: &lt; 2% project value</p>
                </div>

                <div className="rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Moderate Variations</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Room layout changes</li>
                    <li>Panel board relocations</li>
                    <li>Additional circuits</li>
                    <li>Lighting scheme changes</li>
                  </ul>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">Impact: 2-10% project value</p>
                </div>

                <div className="rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <h4 className="font-medium text-red-800 dark:text-white mb-3">Major Variations</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Complete system redesign</li>
                    <li>Additional building areas</li>
                    <li>Load increase requiring infrastructure changes</li>
                    <li>Specification upgrades</li>
                  </ul>
                  <p className="text-xs text-red-700 text-elec-yellow mt-2">Impact: &gt; 10% project value</p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="variations-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Unforeseen Issues */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Unforeseen Issues - Identification and Response</h3>
            <p className="text-base text-white mb-4">
              Unforeseen issues are circumstances that could not have been reasonably anticipated during planning:
            </p>
            
            <div className="space-y-6">
              {/* Site Conditions */}
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">A</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Hidden Site Conditions</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-white mb-2"><strong>Structural Discoveries:</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Steel beams blocking planned cable routes</li>
                            <li>Concrete thickness preventing core drilling</li>
                            <li>Asbestos-containing materials in ceiling voids</li>
                            <li>Load-bearing walls affecting panel locations</li>
                            <li>Underground services in excavation areas</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-white mb-2"><strong>Environmental Factors:</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Waterlogged ground conditions</li>
                            <li>Rock formations requiring specialist equipment</li>
                            <li>Contaminated soil requiring special handling</li>
                            <li>Protected wildlife areas affecting access</li>
                            <li>Archaeological findings requiring investigation</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Response Protocol</p>
                        <p className="text-xs sm:text-sm text-white">
                          Immediately stop work, secure the area, document conditions with photos, and report to site management for specialist assessment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supply Chain Issues */}
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">B</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Supply Chain and Material Issues</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-white mb-2"><strong>Material Challenges:</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Material shortages due to global supply issues</li>
                            <li>Late deliveries affecting critical path activities</li>
                            <li>Quality defects requiring replacement materials</li>
                            <li>Discontinued products requiring design changes</li>
                            <li>Shipping delays from international suppliers</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-white mb-2"><strong>Mitigation Strategies:</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Identify alternative suppliers and products</li>
                            <li>Maintain buffer stock for critical items</li>
                            <li>Develop substitute material specifications</li>
                            <li>Communicate lead time issues early</li>
                            <li>Adjust work sequences to accommodate delays</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 text-elec-yellow mb-2">Proactive Monitoring</p>
                        <p className="text-xs sm:text-sm text-white">
                          Regularly monitor delivery schedules and maintain relationships with multiple suppliers to anticipate and manage supply chain disruptions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* External Dependencies */}
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">C</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-3">External Dependencies and Delays</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-white mb-2"><strong>Weather-Related Delays:</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Extreme weather preventing external work</li>
                            <li>Flooding affecting site access</li>
                            <li>High winds restricting crane operations</li>
                            <li>Temperature extremes affecting materials</li>
                            <li>Seasonal restrictions on certain activities</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-white mb-2"><strong>Third Party Dependencies:</strong></p>
                          <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                            <li>Other trades not completing work on time</li>
                            <li>Utility company connection delays</li>
                            <li>Planning permission modifications</li>
                            <li>Building control inspection delays</li>
                            <li>Client decision-making bottlenecks</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 text-elec-yellow mb-2">Contingency Planning</p>
                        <p className="text-xs sm:text-sm text-white">
                          Develop contingency plans for weather-sensitive work and maintain regular communication with all stakeholders to anticipate delays.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="unforeseen-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Risks of Poor Management */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Risks of Poor Variation Management - Consequence Analysis</h3>
            <p className="text-base text-white mb-4">
              Understanding the full impact of poor variation management emphasises the importance of systematic approaches:
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <h4 className="font-medium text-red-700 text-elec-yellow mb-3">Safety and Compliance Risks</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li><strong>Safety Compromises:</strong> Rushed changes bypassing risk assessments</li>
                    <li><strong>Regulation Breaches:</strong> Non-compliance with BS 7671 or building regulations</li>
                    <li><strong>Certification Issues:</strong> Invalid test certificates for modified installations</li>
                    <li><strong>Insurance Implications:</strong> Coverage invalidated by unauthorised changes</li>
                  </ul>
                </div>

                <div className="rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <h4 className="font-medium text-orange-700 text-elec-yellow mb-3">Commercial and Legal Risks</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li><strong>Cost Disputes:</strong> Disagreements over variation pricing</li>
                    <li><strong>Legal Claims:</strong> Breach of contract allegations</li>
                    <li><strong>Payment Delays:</strong> Disputes holding up progress payments</li>
                    <li><strong>Reputation Damage:</strong> Poor relationships affecting future work</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-gray-50 dark:bg-card/50 border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-white mb-3">Project Impact Assessment</h4>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <p className="font-medium text-white mb-2">Time Impact:</p>
                    <ul className="list-disc pl-5 text-xs sm:text-sm text-white">
                      <li>Project delays up to 30%</li>
                      <li>Extended site overheads</li>
                      <li>Cascade effects on other projects</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Cost Impact:</p>
                    <ul className="list-disc pl-5 text-xs sm:text-sm text-white">
                      <li>Rework costs 5-20% of value</li>
                      <li>Acceleration costs</li>
                      <li>Disruption claims</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Quality Impact:</p>
                    <ul className="list-disc pl-5 text-xs sm:text-sm text-white">
                      <li>Defect rates increase</li>
                      <li>System performance issues</li>
                      <li>Maintenance problems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Managing Variations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Managing Variations - Systematic Approach</h3>
            <p className="text-base text-white mb-4">
              Effective variation management requires structured processes and clear accountability:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">Formal Recording and Approval Process</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Documentation Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Record all changes formally using variation orders or site instructions</li>
                          <li>Include detailed descriptions of work affected</li>
                          <li>Specify time and cost implications</li>
                          <li>Attach supporting drawings and specifications</li>
                          <li>Obtain required signatures and approvals</li>
                          <li>Distribute to all affected parties</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Approval Hierarchy:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <ol className="list-decimal ml-4 space-y-1 text-xs sm:text-sm text-white">
                            <li><strong>Site Level:</strong> Supervisor approval for minor variations (under £500)</li>
                            <li><strong>Project Level:</strong> Project manager approval for moderate variations (£500-£5000)</li>
                            <li><strong>Commercial Level:</strong> Commercial manager approval for major variations (over £5000)</li>
                            <li><strong>Client Level:</strong> Client approval required for significant scope changes</li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Process Implementation:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Ensure supervisor or project manager approval before proceeding</li>
                          <li>Update all relevant drawings and documentation</li>
                          <li>Communicate changes to design team and other trades</li>
                          <li>Modify risk assessments and method statements as required</li>
                          <li>Update programme and resource requirements</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 text-elec-yellow mb-2">Digital Management Systems</p>
                        <p className="text-xs sm:text-sm text-white">
                          Modern project management software can automate variation tracking, approval workflows, and document distribution, reducing errors and improving efficiency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="recording-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Communication Strategies */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Communication and Stakeholder Management</h3>
            <p className="text-base text-white mb-4">
              Effective communication is critical for successful variation management:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
                <h4 className="font-medium text-cyan-700 dark:text-cyan-400 mb-3">Communication Framework</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-cyan-700 dark:text-cyan-400 mb-2">Internal Communication:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                      <li>Inform all affected parties early and completely</li>
                      <li>Use standardised communication templates</li>
                      <li>Establish clear escalation procedures</li>
                      <li>Regular progress updates on variation implementation</li>
                      <li>Document all verbal communications in writing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-cyan-700 dark:text-cyan-400 mb-2">External Communication:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                      <li>Keep the client updated on time and cost implications</li>
                      <li>Coordinate with other contractors and consultants</li>
                      <li>Maintain records of all client instructions</li>
                      <li>Provide regular variation status reports</li>
                      <li>Ensure transparency in pricing and scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-3">Dispute Prevention and Resolution</h4>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                  <li><strong>Clear Documentation:</strong> Document discussions in writing to avoid disputes</li>
                  <li><strong>Prompt Notification:</strong> Notify potential variations as soon as identified</li>
                  <li><strong>Cost Transparency:</strong> Provide detailed cost breakdowns for variations</li>
                  <li><strong>Alternative Solutions:</strong> Suggest safe, cost-effective alternatives where possible</li>
                  <li><strong>Mediation Readiness:</strong> Be prepared to use formal dispute resolution procedures</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Advanced Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Advanced Practical Guidance</h2>
          <div className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-4 bg-slate-50 dark:bg-card/50 border border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-white mb-3">Daily Management Practices</h3>
                <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
                  <li>Always carry a variation log and update it daily</li>
                  <li>Never make design changes without written approval</li>
                  <li>Keep flexible with sequencing — switch tasks while waiting on issue resolution</li>
                  <li>Proactively flag potential problems (e.g., long lead-time items)</li>
                  <li>Photograph and document site conditions before and after changes</li>
                  <li>Maintain clear communication logs with timestamps</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-slate-50 dark:bg-card/50 border border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-white mb-3">Quality Assurance Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
                  <li>Verify compliance with BS 7671 for all variations</li>
                  <li>Update test schedules to reflect design changes</li>
                  <li>Ensure certification covers all varied work</li>
                  <li>Maintain as-built drawing accuracy throughout changes</li>
                  <li>Conduct additional inspections for significant variations</li>
                  <li>Document any deviations from standard procedures</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-elec-yellow/5 bg-elec-yellow/10 border border-elec-yellow/30 border-elec-yellow/20">
              <h3 className="font-medium text-elec-yellow dark:text-elec-yellow mb-3">Technology and Digital Tools</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-elec-yellow dark:text-elec-yellow">Mobile Documentation:</p>
                  <p className="text-xs sm:text-sm text-white">Use smartphones and tablets for real-time variation recording, photo documentation, and instant communication with project teams.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow dark:text-elec-yellow">Cloud-Based Systems:</p>
                  <p className="text-xs sm:text-sm text-white">Implement cloud-based project management systems for real-time variation tracking, approval workflows, and document sharing.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow dark:text-elec-yellow">BIM Integration:</p>
                  <p className="text-xs sm:text-sm text-white">Use Building Information Modeling (BIM) to visualise variation impacts and coordinate changes with other building systems.</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <h3 className="font-medium text-purple-800 dark:text-white mb-3">Risk Management Strategies</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-purple-800 dark:text-white mb-2">Proactive Risk Identification:</p>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Regular site condition assessments</li>
                    <li>Early supplier communication for long-lead items</li>
                    <li>Weather monitoring and contingency planning</li>
                    <li>Stakeholder expectation management</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-purple-800 dark:text-white mb-2">Reactive Response Planning:</p>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                    <li>Pre-agreed alternative suppliers and materials</li>
                    <li>Flexible resource allocation strategies</li>
                    <li>Emergency communication protocols</li>
                    <li>Rapid decision-making procedures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Multiple Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Case Studies</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-800 dark:text-white mb-3">Case Study 1: Unauthorised Structural Modification</h3>
              <p className="text-red-700 text-elec-yellow mb-3">
                On a commercial project, electricians discovered steel beams obstructing the planned cable route. Instead of stopping and reporting, they improvised by drilling through the beam, creating a serious safety risk. The work had to be removed and redone, and the contractor faced penalties. Correct action would have been to report the issue, seek design approval, and reroute safely.
              </p>
              <div className="bg-red-100 dark:bg-red-900/40 p-3 rounded">
                <p className="font-medium text-red-800 dark:text-white mb-1">Lessons Learned:</p>
                <ul className="list-disc pl-5 text-sm text-red-700 text-elec-yellow">
                  <li>Never make structural modifications without engineering approval</li>
                  <li>Stop work immediately when unexpected conditions are encountered</li>
                  <li>Cost of proper procedures far less than cost of remedial work</li>
                  <li>Safety must never be compromised for schedule pressures</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-800 dark:text-white mb-3">Case Study 2: Proactive Material Shortage Management</h3>
              <p className="text-green-700 dark:text-green-300 mb-3">
                During a hospital project, the electrical contractor identified potential delays in specialist fire-rated cable delivery. They immediately raised a variation to use alternative approved products, maintaining the project schedule while ensuring full compliance with fire safety requirements.
              </p>
              <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded">
                <p className="font-medium text-green-800 dark:text-white mb-1">Success Factors:</p>
                <ul className="list-disc pl-5 text-sm text-green-700 dark:text-green-300">
                  <li>Early identification of potential supply chain issues</li>
                  <li>Proactive communication with design team and client</li>
                  <li>Technical expertise in identifying suitable alternatives</li>
                  <li>Formal variation process prevented compliance issues</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-white mb-3">Case Study 3: Client-Driven Variation Management</h3>
              <p className="text-blue-700 text-elec-yellow mb-3">
                A retail fit-out project experienced multiple client-requested changes to lighting layouts. The electrical contractor implemented a systematic variation management process, with regular client meetings and clear cost implications for each change. The project completed successfully with full client satisfaction and profitable variation recovery.
              </p>
              <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded">
                <p className="font-medium text-blue-800 dark:text-white mb-1">Key Strategies:</p>
                <ul className="list-disc pl-5 text-sm text-blue-700 text-elec-yellow">
                  <li>Structured variation approval process with clear pricing</li>
                  <li>Regular client communication to manage expectations</li>
                  <li>Detailed documentation of all changes and approvals</li>
                  <li>Flexible programming to accommodate reasonable changes</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-elec-yellow pl-4">
                <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                <p className="text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-elec-yellow/5 bg-elec-yellow/10 border border-elec-yellow/30 border-elec-yellow/20">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow dark:text-elec-yellow mb-4">Pocket Guide</h2>
          <div className="space-y-2 text-elec-yellow text-elec-yellow">
            <p>✅ Record all changes in writing.</p>
            <p>✅ Never proceed with design changes without approval.</p>
            <p>✅ Report unforeseen issues immediately.</p>
            <p>✅ Suggest safe, practical solutions.</p>
            <p>✅ Stay flexible with sequencing.</p>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-base text-white">
            In this subsection, you learned how to deal with variations and unforeseen issues by recording them properly, getting approval, and maintaining clear communication. You saw how ignoring or mishandling changes can lead to disputes, delays, and safety risks. A professional approach ensures problems are solved efficiently while keeping projects safe, compliant, and on track.
          </p>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Knowledge Check</h2>
          </div>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="../3-4" className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous: Minimising Disruption</span>
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

export default Module5Section3_5;